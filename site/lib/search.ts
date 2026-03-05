import {
  TOPICS,
  CATEGORIES,
  TopicEntry,
  Category,
  getMetricStatus,
  STATUS_COLOUR,
  MetricStatus,
} from './topics';

// ── Types ──────────────────────────────────────────────────────────────────────

export interface SearchableMetric {
  label: string;
  labelLower: string;
  value: string;
  unit?: string;
  context?: string;
  contextLower?: string;
  status: MetricStatus;
  statusColour: string;
}

export interface SearchableItem {
  slug: string;
  href: string;
  topicName: string;
  topicNameLower: string;
  categoryName: string;
  categoryNameLower: string;
  categorySlug: string;
  colour: string;
  metrics: SearchableMetric[];
  corpus: string; // pre-lowercased concatenation for fast substring checks
}

export interface SearchResult {
  item: SearchableItem;
  score: number;
  matchType:
    | 'topic-exact'
    | 'topic-starts'
    | 'topic-contains'
    | 'category'
    | 'metric-label'
    | 'metric-context';
  matchedMetricIndex?: number;
}

// ── Index builder ──────────────────────────────────────────────────────────────

let _index: SearchableItem[] | null = null;

function buildSlugToCategoryMap(): Record<string, Category> {
  const map: Record<string, Category> = {};
  for (const cat of CATEGORIES) {
    for (const slug of cat.topics) {
      map[slug] = cat;
    }
  }
  return map;
}

export function getSearchIndex(): SearchableItem[] {
  if (_index) return _index;

  const slugToCategory = buildSlugToCategoryMap();

  _index = Object.values(TOPICS).map((topic: TopicEntry) => {
    const cat = slugToCategory[topic.slug];
    const categoryName = cat?.name ?? 'Other';
    const categorySlug = cat?.slug ?? 'other';

    const metrics: SearchableMetric[] = topic.metrics.map((m) => {
      const status = getMetricStatus(m.direction, m.polarity);
      return {
        label: m.label,
        labelLower: m.label.toLowerCase(),
        value: m.value,
        unit: m.unit,
        context: m.context,
        contextLower: m.context?.toLowerCase(),
        status,
        statusColour: STATUS_COLOUR[status],
      };
    });

    const corpusParts = [
      topic.topic,
      categoryName,
      ...topic.metrics.map((m) => m.label),
      ...topic.metrics.map((m) => m.context ?? ''),
    ];

    return {
      slug: topic.slug,
      href: topic.href,
      topicName: topic.topic,
      topicNameLower: topic.topic.toLowerCase(),
      categoryName,
      categoryNameLower: categoryName.toLowerCase(),
      categorySlug,
      colour: topic.colour,
      metrics,
      corpus: corpusParts.join(' ').toLowerCase(),
    };
  });

  return _index;
}

// ── Search algorithm ───────────────────────────────────────────────────────────

export function search(query: string, limit = 12): SearchResult[] {
  if (!query || query.trim().length === 0) return [];

  const q = query.trim().toLowerCase();
  const index = getSearchIndex();
  const results: SearchResult[] = [];

  for (const item of index) {
    let bestScore = 0;
    let bestMatchType: SearchResult['matchType'] = 'topic-contains';
    let matchedMetricIndex: number | undefined;

    // Tier 1: exact topic name
    if (item.topicNameLower === q) {
      bestScore = 100;
      bestMatchType = 'topic-exact';
    }

    // Tier 2: topic name starts-with
    if (bestScore < 80 && item.topicNameLower.startsWith(q)) {
      bestScore = 80;
      bestMatchType = 'topic-starts';
    }

    // Tier 3: topic name contains
    if (bestScore < 60 && item.topicNameLower.includes(q)) {
      bestScore = 60;
      bestMatchType = 'topic-contains';
    }

    // Tier 4: category name contains
    if (bestScore < 50 && item.categoryNameLower.includes(q)) {
      bestScore = 50;
      bestMatchType = 'category';
    }

    // Tier 5: metric label contains
    if (bestScore < 40) {
      for (let i = 0; i < item.metrics.length; i++) {
        if (item.metrics[i].labelLower.includes(q)) {
          bestScore = 40;
          bestMatchType = 'metric-label';
          matchedMetricIndex = i;
          break;
        }
      }
    }

    // Tier 6: metric context contains
    if (bestScore < 20) {
      for (let i = 0; i < item.metrics.length; i++) {
        if (item.metrics[i].contextLower?.includes(q)) {
          bestScore = 20;
          bestMatchType = 'metric-context';
          matchedMetricIndex = i;
          break;
        }
      }
    }

    // Tier 7: all words present in corpus (multi-word queries)
    if (bestScore === 0) {
      const words = q.split(/\s+/).filter(Boolean);
      if (words.length > 0 && words.every((w) => item.corpus.includes(w))) {
        bestScore = 10;
        bestMatchType = 'topic-contains';
      }
    }

    if (bestScore > 0) {
      results.push({ item, score: bestScore, matchType: bestMatchType, matchedMetricIndex });
    }
  }

  results.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.item.topicNameLower.localeCompare(b.item.topicNameLower);
  });

  return results.slice(0, limit);
}
