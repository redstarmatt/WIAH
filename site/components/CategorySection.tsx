import CategoryCard from './CategoryCard';
import CompactTopicList from './CompactTopicList';
import { Category, getCategoryFeatured, getCategoryRemaining } from '@/lib/topics';

interface CategorySectionProps {
  category: Category;
}

export default function CategorySection({ category }: CategorySectionProps) {
  const featured = getCategoryFeatured(category);
  const remaining = getCategoryRemaining(category);

  return (
    <section id={category.slug} className="scroll-mt-20">
      {/* Category header */}
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-lg font-bold text-wiah-black">{category.name}</h2>
        <div className="flex-1 h-px bg-wiah-border" />
        <span className="font-mono text-xs text-wiah-mid flex-shrink-0">
          {category.topics.length} topics
        </span>
      </div>

      {/* Featured topic cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
        {featured.map((t) => (
          <CategoryCard
            key={t.slug}
            topic={t.topic}
            href={t.href}
            colour={t.colour}
            metrics={t.metrics}
            preposition={t.preposition}
          />
        ))}
      </div>

      {/* Remaining topics (compact) */}
      {remaining.length > 0 && (
        <CompactTopicList topics={remaining} />
      )}
    </section>
  );
}
