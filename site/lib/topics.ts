import { Direction, Polarity } from '@/components/DirectionArrow';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface TopicMetric {
  label: string;
  value: string;
  unit?: string;
  direction: Direction;
  polarity: Polarity;
  context?: string;
  sparklineData?: number[];
}

export interface TopicEntry {
  topic: string;
  slug: string;
  href: string;
  colour: string;
  preposition?: string;
  metrics: TopicMetric[];
}

export interface Category {
  name: string;
  slug: string;
  featured: string[];
  topics: string[];
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export type MetricStatus = 'worse' | 'better' | 'stable';

export function getMetricStatus(direction: Direction, polarity: Polarity): MetricStatus {
  if (direction === 'flat') return 'stable';
  const isBad =
    (direction === 'up' && polarity === 'up-is-bad') ||
    (direction === 'down' && polarity === 'up-is-good');
  return isBad ? 'worse' : 'better';
}

export const STATUS_COLOUR: Record<MetricStatus, string> = {
  worse: '#E63946',
  better: '#2A9D8F',
  stable: '#F4A261',
};

export const STATUS_LABEL: Record<MetricStatus, string> = {
  worse: 'getting worse',
  better: 'getting better',
  stable: 'stable',
};

// ── Categories ────────────────────────────────────────────────────────────────

export const CATEGORIES: Category[] = [
  {
    name: 'NHS & Healthcare',
    slug: 'nhs-healthcare',
    featured: ['health', 'nhs-waiting-lists', 'nhs-ae'],
    topics: ['health', 'nhs-waiting-lists', 'nhs-ae', 'nhs-beds', 'nhs-cancer', 'nhs-dentistry', 'nhs-discharge', 'nhs-mental-health', 'nhs-prescriptions', 'nhs-screening', 'nhs-staffing', 'nhs-vaccination', 'nhs-waiting-times', 'nhs-workforce', 'dental', 'maternity', 'long-covid', 'healthy-life-expectancy', 'infant-mortality', 'diabetes', 'dementia', 'antibiotic-resistance'],
  },
  {
    name: 'Mental Health & Wellbeing',
    slug: 'mental-health-wellbeing',
    featured: ['mental-health', 'mental-health-waits', 'suicide-prevention'],
    topics: ['mental-health', 'mental-health-waits', 'suicide-prevention', 'adhd-autism', 'wellbeing', 'loneliness', 'gambling', 'gambling-harm', 'eating-disorders', 'drugs', 'drug-misuse', 'alcohol', 'drug-deaths', 'obesity'],
  },
  {
    name: 'Crime & Justice',
    slug: 'crime-justice',
    featured: ['justice', 'knife-crime', 'prisons'],
    topics: ['justice', 'knife-crime', 'prisons', 'prison-reoffending', 'court-backlog', 'policing', 'prison-overcrowding', 'domestic-abuse', 'domestic-violence', 'hate-crime', 'modern-slavery', 'online-harms'],
  },
  {
    name: 'Economy & Work',
    slug: 'economy-work',
    featured: ['economy', 'work', 'economic-inactivity'],
    topics: ['economy', 'work', 'economic-inactivity', 'youth-unemployment', 'productivity', 'trade', 'insecure-work', 'gender-pay-gap', 'strikes', 'high-streets', 'apprenticeships'],
  },
  {
    name: 'Housing',
    slug: 'housing',
    featured: ['housing', 'homelessness', 'housebuilding'],
    topics: ['housing', 'homelessness', 'housebuilding', 'housing-quality', 'private-renting', 'social-housing', 'rough-sleeping', 'planning'],
  },
  {
    name: 'Education & Skills',
    slug: 'education-skills',
    featured: ['education', 'universities', 'teacher-shortage'],
    topics: ['education', 'universities', 'teacher-shortage', 'university-funding', 'school-exclusions', 'childcare', 'student-debt', 'early-years'],
  },
  {
    name: 'Poverty & Cost of Living',
    slug: 'poverty-cost-of-living',
    featured: ['child-poverty', 'food-banks', 'energy-bills'],
    topics: ['child-poverty', 'food-banks', 'energy-bills', 'poverty', 'inequality', 'fuel-poverty', 'personal-debt', 'benefits', 'universal-credit', 'pensions', 'food-insecurity', 'wealth-inequality'],
  },
  {
    name: 'Environment & Climate',
    slug: 'environment-climate',
    featured: ['water', 'net-zero', 'air-quality'],
    topics: ['water', 'net-zero', 'air-quality', 'environment', 'biodiversity', 'flooding', 'waste', 'flood-risk'],
  },
  {
    name: 'Infrastructure & Services',
    slug: 'infrastructure-services',
    featured: ['energy', 'rail', 'broadband'],
    topics: ['energy', 'energy-security', 'rail', 'broadband', 'transport', 'road-safety', 'rural-services', 'libraries', 'digital-inclusion', 'digital-exclusion'],
  },
  {
    name: 'Society & Democracy',
    slug: 'society-democracy',
    featured: ['immigration', 'democracy', 'demographics'],
    topics: ['immigration', 'democracy', 'demographics', 'asylum-system', 'social-mobility', 'public-debt', 'local-gov', 'council-finances', 'voter-turnout'],
  },
  {
    name: 'Care & Support',
    slug: 'care-support',
    featured: ['social-care', 'unpaid-carers', 'disability-employment'],
    topics: ['social-care', 'unpaid-carers', 'disability-employment', 'young-carers', 'care-leavers', 'veterans', 'child-protection'],
  },
];

// ── Topics (keyed by slug) ────────────────────────────────────────────────────

export const TOPICS: Record<string, TopicEntry> = {
  'health': {
    topic: 'Health',
    slug: 'health',
    href: '/health',
    colour: '#E63946',
    metrics: [
      { label: 'Average GP wait', value: '21.3', unit: 'days', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'doubled since 2015', sparklineData: [12.1, 13.4, 14.2, 15.8, 16.3, 17.1, 18.9, 19.4, 20.1, 20.8, 21.3] },
      { label: 'Cat 2 ambulance wait', value: '34', unit: 'min', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'target: 18 min', sparklineData: [18, 20, 22, 25, 28, 32, 39, 42, 38, 35, 34] },
    ],
  },
  'housing': {
    topic: 'Housing',
    slug: 'housing',
    href: '/housing',
    colour: '#F4A261',
    preposition: 'with',
    metrics: [
      { label: 'House price to earnings', value: '7.7', unit: '×', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'was 4× in 1997', sparklineData: [7.52, 7.72, 7.91, 8.04, 7.88, 7.86, 9.06, 8.56, 8.4, 7.71] },
      { label: 'Average monthly rent', value: '£1,381', unit: '/mo', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '+34% since 2019', sparklineData: [1029, 1043, 1065, 1076, 1104, 1166, 1264, 1375, 1381] },
    ],
  },
  'water': {
    topic: 'Water',
    slug: 'water',
    href: '/water',
    colour: '#264653',
    metrics: [
      { label: 'Sewage discharge hours', value: '3.6M', unit: 'hrs', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 0.1M in 2016', sparklineData: [0.1, 0.17, 0.9, 2.5, 3.1, 2.7, 1.8, 3.6, 3.6] },
      { label: 'Rivers in good health', value: '16', unit: '%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'target: 75% by 2027', sparklineData: [26, 22, 17, 17, 16] },
    ],
  },
  'justice': {
    topic: 'Justice',
    slug: 'justice',
    href: '/justice',
    colour: '#6B7280',
    metrics: [
      { label: 'Crimes leading to charge', value: '7.3', unit: '%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'halved in 10 years', sparklineData: [15.5, 13.1, 11.2, 9.1, 7.8, 7, 7.3, 5.6, 5.7, 6.4, 7.3] },
      { label: 'Crown court backlog', value: '79.6K', unit: 'cases', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'record high', sparklineData: [38.1, 33.1, 40.9, 59.8, 58.1, 62, 68.9, 72.8, 76.6, 78.1, 79.6] },
    ],
  },
  'knife-crime': {
    topic: 'Knife Crime',
    slug: 'knife-crime',
    href: '/knife-crime',
    colour: '#E63946',
    metrics: [
      { label: 'Knife crime offences', value: '50,489', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: '2022/23, up 77% since 2014/15', sparklineData: [28588, 30741, 31987, 37443, 43516, 46265, 40526, 47835, 50489] },
      { label: 'Knife homicides (annual)', value: '272', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '40% of all homicides', sparklineData: [206, 224, 226, 235, 285, 283, 241, 265, 272] },
    ],
  },
  'maternity': {
    topic: 'Maternity Services',
    slug: 'maternity',
    href: '/maternity',
    colour: '#E63946',
    metrics: [
      { label: 'Maternal mortality rate', value: '9.7', unit: 'per 100k', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'double Norway rate', sparklineData: [8.5, 8.4, 8.2, 8.3, 9.7, 9.7, 9.8, 9.8, 9.5, 10.4, 9.7] },
      { label: 'Midwife vacancy rate', value: '12.3%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 7% in 2016', sparklineData: [7, 8.2, 8.8, 9.5, 9.8, 10.4, 11.8, 12.3] },
    ],
  },
  'mental-health-waits': {
    topic: 'Mental Health Waiting Times',
    slug: 'mental-health-waits',
    href: '/mental-health-waits',
    colour: '#264653',
    metrics: [
      { label: 'People on waiting lists', value: '1.8M', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up 38% since 2019', sparklineData: [0.88, 0.96, 1.1, 1.28, 1.45, 1.59, 1.72, 1.8] },
      { label: 'IAPT 18-week target met', value: '71%', unit: '%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'target is 75%; missed since 2020', sparklineData: [90, 88, 85, 82, 70, 67, 69, 71] },
    ],
  },
  'domestic-abuse': {
    topic: 'Domestic Abuse',
    slug: 'domestic-abuse',
    href: '/domestic-abuse',
    colour: '#E63946',
    preposition: 'with',
    metrics: [
      { label: 'Adults experiencing domestic abuse', value: '2.1M', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: '1.4M women, 700K men', sparklineData: [2.4, 2.3, 2.2, 2.1, 2.1, 2, 2, 2.1] },
      { label: 'DA crimes recorded by police', value: '906K', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 596K in 2014/15', sparklineData: [596, 663, 730, 800, 858, 880, 862, 870, 906] },
    ],
  },
  'economy': {
    topic: 'Economy',
    slug: 'economy',
    href: '/economy',
    colour: '#2A9D8F',
    metrics: [
      { label: 'CPI inflation', value: '3.0', unit: '%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'peaked at 11.1% in 2022', sparklineData: [1.8, 1.8, 0.7, 5.5, 10.1, 4, 3, 3] },
      { label: 'Real weekly pay', value: '£527', unit: '/wk', direction: 'up' as const, polarity: 'up-is-good' as const, context: '+£41 since 2019', sparklineData: [486, 494, 500, 516, 520, 508, 515, 522, 527] },
    ],
  },
  'immigration': {
    topic: 'Immigration',
    slug: 'immigration',
    href: '/immigration',
    colour: '#6B7280',
    preposition: 'with',
    metrics: [
      { label: 'Net migration', value: '204K', unit: '/yr', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down from 906K peak', sparklineData: [184, 329, 239, 226, 173, 672, 764, 906, 728, 204] },
      { label: 'Small boat crossings', value: '41K', unit: '2025', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 300 in 2019', sparklineData: [0.3, 1.8, 8.5, 28.5, 45.8, 29.4, 36.8, 41.5] },
    ],
  },
  'energy': {
    topic: 'Energy',
    slug: 'energy',
    href: '/energy',
    colour: '#E63946',
    metrics: [
      { label: 'Renewable share', value: '45', unit: '%', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up from 3% in 2010', sparklineData: [2.8, 6.9, 11.3, 14.9, 19.1, 24.6, 24.5, 29.3, 33.1, 37.1, 43.1, 41.4, 41.5, 40.8, 45.2] },
      { label: 'Electricity price index', value: '201', unit: '2015=100', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'doubled since 2015', sparklineData: [86, 90, 94, 97, 100, 103, 107, 110, 119, 122, 127, 143, 201, 186, 180, 201] },
    ],
  },
  'energy-security': {
    topic: 'Energy Security',
    slug: 'energy-security',
    href: '/energy-security',
    colour: '#264653',
    metrics: [
      { label: 'UK energy import dependency', value: '36', unit: '%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 26% in 2015', sparklineData: [28, 42, 47, 38, 35, 36, 34, 35, 36] },
      { label: 'Gas storage capacity', value: '15', unit: 'days', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'Germany has 90 days', sparklineData: [15, 15, 15] },
    ],
  },
  'flood-risk': {
    topic: 'Flood Risk',
    slug: 'flood-risk',
    href: '/flood-risk',
    colour: '#264653',
    metrics: [
      { label: 'Properties at flood risk', value: '5.2M', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 3.8M in 2012', sparklineData: [3.8, 4.1, 4.4, 4.7, 5.0, 5.2] },
      { label: 'Annual flood damage cost', value: '£1.4bn', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from £500M in 2000', sparklineData: [0.5, 0.7, 3.2, 1.0, 0.8, 1.3, 1.0, 1.4, 1.2, 1.4] },
    ],
  },
  'early-years': {
    topic: 'Early Years & Childcare',
    slug: 'early-years',
    href: '/early-years',
    colour: '#2A9D8F',
    metrics: [
      { label: 'Average nursery cost (under 2)', value: '£14,800', unit: '/yr', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up 59% since 2013', sparklineData: [9300, 10200, 11800, 13000, 13700, 14100, 14800] },
      { label: 'Registered childcare places', value: '1.0M', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down from 1.3M in 2010', sparklineData: [1280, 1250, 1210, 1195, 1170, 1090, 1050, 1010] },
    ],
  },
  'transport': {
    topic: 'Transport',
    slug: 'transport',
    href: '/transport',
    colour: '#F4A261',
    metrics: [
      { label: 'Rail punctuality', value: '86', unit: '% on time', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'target: 92%', sparklineData: [89.8, 88, 87.2, 86.9, 87.4, 85.5, 92, 87, 84.5, 85, 86.2] },
      { label: 'Bus journeys', value: '3.7', unit: 'bn/yr', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down from 4.6bn pre-Covid', sparklineData: [4.6, 4.5, 4.4, 4.4, 4.3, 1.6, 3.2, 3.5, 3.7] },
    ],
  },
  'social-care': {
    topic: 'Social Care',
    slug: 'social-care',
    href: '/social-care',
    colour: '#F4A261',
    metrics: [
      { label: 'Care requests (annual)', value: '1.9M', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '1.5M receiving funded care', sparklineData: [1.79, 1.81, 1.84, 1.87, 1.85, 1.6, 1.72, 1.83, 1.9] },
      { label: 'Vacancy rate', value: '9.9%', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: '152,000 unfilled posts', sparklineData: [6.6, 7, 8, 8, 7, 10, 10.7, 9.9] },
    ],
  },
  'education': {
    topic: 'Education',
    slug: 'education',
    href: '/education',
    colour: '#2A9D8F',
    metrics: [
      { label: 'Persistent absence', value: '20.0', unit: '%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'was 10.5% pre-Covid', sparklineData: [10.5, 10.8, 11.2, 10.9, 12.1, 22.5, 21.2, 20] },
      { label: 'Disadvantage gap index', value: '3.92', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'widening since 2017', sparklineData: [3.78, 3.7, 3.68, 3.66, 3.66, 3.79, 3.84, 3.94, 3.93, 3.92] },
    ],
  },
  'environment': {
    topic: 'Environment',
    slug: 'environment',
    href: '/environment',
    colour: '#2A9D8F',
    metrics: [
      { label: 'GHG emissions', value: '395', unit: 'MtCO₂e', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down 50% since 1990', sparklineData: [588, 554, 573, 556, 524, 504, 491, 474, 468, 452, 406, 433, 417, 395] },
      { label: 'Species abundance', value: '68', unit: '% of 1970', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'UK: worst in G7 for nature', sparklineData: [76, 74, 72, 71, 70, 71, 70, 69, 70, 69, 68, 68] },
    ],
  },
  'demographics': {
    topic: 'Demographics',
    slug: 'demographics',
    href: '/demographics',
    colour: '#6B7280',
    preposition: 'with',
    metrics: [
      { label: 'Fertility rate', value: '1.41', unit: 'TFR', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'record low, was 1.94 in 2010', sparklineData: [1.94, 1.93, 1.93, 1.83, 1.8, 1.79, 1.77, 1.71, 1.65, 1.59, 1.53, 1.55, 1.49, 1.44, 1.41] },
      { label: 'Over-65s', value: '19.2', unit: '% of population', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'was 15.9% in 2001', sparklineData: [15.9, 16, 16.6, 17.8, 18.6, 18.8, 18.9, 19, 19.2] },
    ],
  },
  'poverty': {
    topic: 'Poverty',
    slug: 'poverty',
    href: '/poverty',
    colour: '#E63946',
    preposition: 'with',
    metrics: [
      { label: 'Children in poverty', value: '3.4M', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '26% of all children', sparklineData: [2.5, 2.5, 2.5, 2.3, 2.3, 2.5, 2.7, 2.7, 2.7, 2.8, 2.9, 2.9, 2.9, 3, 3.1, 3.2, 3.4] },
      { label: 'Food bank parcels', value: '3.1M', unit: '/yr', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 350K in 2013', sparklineData: [0.35, 0.91, 1.08, 1.18, 1.33, 1.53, 1.83, 1.9, 2.5, 2.99, 3.03, 3.12] },
    ],
  },
  'child-poverty': {
    topic: 'Child Poverty',
    slug: 'child-poverty',
    href: '/child-poverty',
    colour: '#E63946',
    metrics: [
      { label: 'Children in poverty', value: '4.3M', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '31% of all children', sparklineData: [3.6, 3.5, 3.4, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4, 4.1, 4.2, 4.3] },
      { label: 'In-work poverty rate', value: '21%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 14% in 2010', sparklineData: [14, 15, 15, 17, 18, 19, 20, 21] },
    ],
  },
  'broadband': {
    topic: 'Broadband & Digital',
    slug: 'broadband',
    href: '/broadband',
    colour: '#264653',
    preposition: 'with',
    metrics: [
      { label: 'Median broadband speed', value: '126', unit: 'Mbps', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up from 15 Mbps in 2013', sparklineData: [15, 18.5, 22.8, 29, 36.2, 46.2, 64, 80.2, 88, 94, 108, 126] },
      { label: 'Full fibre coverage', value: '68', unit: '%', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up from 2% in 2017', sparklineData: [2, 4, 8, 14, 27, 42, 57, 68] },
    ],
  },
  'universities': {
    topic: 'Universities',
    slug: 'universities',
    href: '/universities',
    colour: '#264653',
    preposition: 'at',
    metrics: [
      { label: 'Avg. debt at graduation', value: '£44.9K', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from £16K in 2012', sparklineData: [16.4, 20.5, 24.2, 32.8, 37.2, 39.4, 40.3, 41.5, 42.6, 43.7, 44.9, 44.8, 44.9, 44.9] },
      { label: 'First-class degrees', value: '31', unit: '%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'was 7% in 1995', sparklineData: [7.2, 11.6, 14.4, 20, 24.5, 28.6, 29.2, 35.4, 36.4, 32.1, 31.2, 30.8] },
    ],
  },
  'waste': {
    topic: 'Waste',
    slug: 'waste',
    href: '/waste',
    colour: '#264653',
    metrics: [
      { label: 'Recycling rate', value: '44', unit: '%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'target: 65% by 2035', sparklineData: [39.7, 43, 44.1, 44.8, 44.3, 45.1, 45.5, 44.7, 45.5, 44.1, 44.6, 44, 43.8] },
      { label: 'Fly-tipping incidents', value: '964K', unit: '/yr', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down from 1.1M peak', sparklineData: [883, 800, 803, 852, 900, 936, 998, 1010, 1072, 1026, 1137, 1079, 1010, 964] },
    ],
  },
  'work': {
    topic: 'Work',
    slug: 'work',
    href: '/work',
    colour: '#264653',
    metrics: [
      { label: 'Real weekly pay', value: '£527', unit: '/wk', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'only just above 2008 level', sparklineData: [499, 480, 461, 457, 472, 481, 484, 494, 501, 481, 494, 527] },
      { label: 'On zero-hours contracts', value: '1.05M', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 252K in 2012', sparklineData: [252, 583, 697, 801, 905, 883, 786, 974, 1049, 975, 1057, 1076, 1046] },
    ],
  },
  'youth-unemployment': {
    topic: 'Youth Unemployment',
    slug: 'youth-unemployment',
    href: '/youth-unemployment',
    colour: '#F4A261',
    metrics: [
      { label: 'NEET rate (16-24)', value: '12.2', unit: '%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 10.8% in 2019', sparklineData: [17.8, 17, 16.5, 16, 14.9, 13.1, 12.4, 11.8, 11.5, 10.8, 13.1, 12.5, 11.6, 12.2] },
      { label: 'Youth unemployment rate', value: '14.1', unit: '%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '2.5x adult rate of 4.2%', sparklineData: [19.9, 21.2, 17, 14.7, 11.4, 11.2, 14.3, 13.6, 11.1, 14.1] },
    ],
  },
  'dental': {
    topic: 'Dental',
    slug: 'dental',
    href: '/dental',
    colour: '#E63946',
    metrics: [
      { label: 'Adults seen by NHS dentist', value: '49.1', unit: '%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'was 57.3% pre-pandemic', sparklineData: [57.1, 57.3, 56.6, 32.2, 46.3, 49.3, 49.1, 49.1] },
      { label: 'Courses of treatment/yr', value: '33.6M', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'was 37.3M in 2017/18', sparklineData: [37.3, 37.2, 35.6, 14.9, 29, 32.7, 33.4, 33.6] },
    ],
  },
  'mental-health': {
    topic: 'Mental Health',
    slug: 'mental-health',
    href: '/mental-health',
    colour: '#264653',
    metrics: [
      { label: 'Talking Therapies referrals/qtr', value: '580K', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up 99% since 2016', sparklineData: [291, 320, 358, 390, 285, 425, 490, 540, 572, 580] },
      { label: 'Recovery rate', value: '43.7', unit: '%', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'target 50%', sparklineData: [43.6, 43.8, 43.7, 43.6, 43.5, 43.6, 43.8, 43.7, 43.8, 43.7] },
    ],
  },
  'benefits': {
    topic: 'Benefits',
    slug: 'benefits',
    href: '/benefits',
    colour: '#F4A261',
    preposition: 'with',
    metrics: [
      { label: 'Universal Credit claimants', value: '6.78M', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'tripled since 2018', sparklineData: [0.37, 0.8, 1.35, 2.11, 3.97, 5.74, 5.83, 6.05, 6.37, 6.61, 6.78] },
      { label: 'Food bank parcels/yr', value: '3.1M', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up 65% since 2019/20', sparklineData: [1109, 1182, 1332, 1583, 1893, 2534, 2173, 3026, 3121] },
    ],
  },
  'wellbeing': {
    topic: 'Wellbeing',
    slug: 'wellbeing',
    href: '/wellbeing',
    colour: '#2A9D8F',
    metrics: [
      { label: 'Life satisfaction (0–10)', value: '7.45', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'below 2018/19 peak', sparklineData: [7.41, 7.46, 7.52, 7.56, 7.52, 7.36, 7.51, 7.48, 7.45] },
      { label: 'Often lonely', value: '7.8%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 5% in 2018', sparklineData: [5, 5, 5, 7.2, 6.3, 7.1, 7.4, 7.8] },
    ],
  },
  'democracy': {
    topic: 'Democracy',
    slug: 'democracy',
    href: '/democracy',
    colour: '#6B7280',
    metrics: [
      { label: '2024 election turnout', value: '59.9%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'second lowest since 1950', sparklineData: [77.7, 71.4, 59.4, 61.4, 65.1, 66.1, 68.8, 67.3, 59.9] },
      { label: 'Trust politicians to tell truth', value: '17%', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'lowest since 2009 scandal', sparklineData: [24, 22, 26, 13, 19, 18, 21, 24, 17, 23, 15, 16, 17] },
    ],
  },
  'homelessness': {
    topic: 'Homelessness',
    slug: 'homelessness',
    href: '/homelessness',
    colour: '#E63946',
    metrics: [
      { label: 'Households accepted as homeless', value: '117,500', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'all-time high', sparklineData: [53.5, 54.5, 59.8, 78.1, 97.2, 74.7, 74.1, 94.6, 105.4, 117.5] },
      { label: 'Children in temporary accommodation', value: '159,900', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'record high', sparklineData: [82.1, 84.5, 101.3, 124, 126.2, 134, 138.6, 131.4, 152, 159.9] },
    ],
  },
  'childcare': {
    topic: 'Childcare',
    slug: 'childcare',
    href: '/childcare',
    colour: '#F4A261',
    metrics: [
      { label: 'Full-time nursery cost', value: '£323/wk', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '29% of average wage', sparklineData: [186, 196, 204, 211, 218, 222, 232, 240, 245, 248, 261, 302, 323] },
      { label: 'Registered childcare providers', value: '67,500', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down 22% since 2015', sparklineData: [86.4, 84.1, 82, 80.6, 79.1, 75.9, 73.5, 71.2, 69.8, 67.5] },
    ],
  },
  'drugs': {
    topic: 'Drugs & Alcohol',
    slug: 'drugs',
    href: '/drugs',
    colour: '#6B7280',
    metrics: [
      { label: 'Drug poisoning deaths', value: '4,907', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'record high', sparklineData: [1843, 2182, 2147, 2955, 3674, 4359, 4393, 4561, 4859, 4907] },
      { label: 'Alcohol-specific deaths', value: '10,048', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'record high', sparklineData: [6276, 6905, 6669, 6831, 7327, 7551, 8974, 9641, 10048] },
    ],
  },
  'drug-misuse': {
    topic: 'Drug Misuse',
    slug: 'drug-misuse',
    href: '/drug-misuse',
    colour: '#6B7280',
    metrics: [
      { label: 'Drug poisoning deaths (2022)', value: '4,534', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '2nd highest ever', sparklineData: [2747, 2652, 2858, 2955, 3346, 3674, 3744, 3756, 4359, 4393, 4561, 4907, 4534] },
      { label: 'People in treatment', value: '289K', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down from 311K in 2013', sparklineData: [311, 300, 289, 277, 265, 270, 275, 289] },
    ],
  },
  'inequality': {
    topic: 'Inequality',
    slug: 'inequality',
    href: '/inequality',
    colour: '#E63946',
    metrics: [
      { label: 'Gini coefficient (income)', value: '0.342', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'highest in developed world', sparklineData: [0.338, 0.331, 0.352, 0.345, 0.357, 0.335, 0.339, 0.343, 0.329, 0.335, 0.34, 0.342] },
      { label: 'Top 10% wealth share', value: '47%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'bottom 50% hold just 8%', sparklineData: [45, 44, 44, 45, 45, 46, 47, 47] },
    ],
  },
  'nhs-staffing': {
    topic: 'NHS Staffing',
    slug: 'nhs-staffing',
    href: '/nhs-staffing',
    colour: '#E63946',
    preposition: 'in the',
    metrics: [
      { label: 'NHS vacancies', value: '104,300', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down from 133,500 peak', sparklineData: [78.8, 86.2, 107.7, 103.1, 85.3, 105.7, 133.5, 121.1, 104.3] },
      { label: 'Sickness days per staff', value: '13.8', unit: 'days/year', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '34.6% stress-related', sparklineData: [11.5, 11.8, 12, 12.3, 12.7, 17.3, 16.1, 14.2, 13.8] },
    ],
  },
  'net-zero': {
    topic: 'Net Zero',
    slug: 'net-zero',
    href: '/net-zero',
    colour: '#2A9D8F',
    preposition: 'toward',
    metrics: [
      { label: 'UK GHG emissions (MtCO2e)', value: '389', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down 52% since 1990', sparklineData: [796, 727, 696, 658, 593, 567, 526, 470, 450, 435, 390, 424, 415, 389] },
      { label: 'EV share of new cars', value: '16.5%', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up from 0.6% in 2018', sparklineData: [0.6, 1.6, 6.6, 11.6, 16.6, 16.5] },
    ],
  },
  'high-streets': {
    topic: 'High Streets',
    slug: 'high-streets',
    href: '/high-streets',
    colour: '#F4A261',
    metrics: [
      { label: 'High street vacancy rate', value: '14.0%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '1 in 7 units empty', sparklineData: [11.3, 12, 12.5, 11.8, 10.7, 10, 10.2, 11.1, 12.3, 14.5, 14.1, 13.9, 14.2, 14] },
      { label: 'Online retail share', value: '27.3%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'was 6.4% in 2010', sparklineData: [6.4, 8.1, 10, 12.9, 15.6, 18.9, 27.9, 25.6, 26.5, 27.3] },
    ],
  },
  'social-mobility': {
    topic: 'Social Mobility',
    slug: 'social-mobility',
    href: '/social-mobility',
    colour: '#264653',
    metrics: [
      { label: 'Upward occupational mobility', value: '23.5%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down from 27% in 1991', sparklineData: [27.2, 27.5, 27, 26.2, 24.9, 24.1, 23.8, 23.5] },
      { label: 'GCSE attainment gap (FSM)', value: '26pp', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'stubbornly persistent', sparklineData: [24.5, 24.5, 24.1, 23.6, 24, 25.8, 26] },
    ],
  },
  'strikes': {
    topic: 'Strikes',
    slug: 'strikes',
    href: '/strikes',
    colour: '#E63946',
    metrics: [
      { label: 'Working days lost to strikes', value: '784K', direction: 'down' as const, polarity: 'up-is-bad' as const, context: '2024, down from 3.75M peak', sparklineData: [365, 1389, 249, 788, 170, 273, 234, 178, 546, 2487, 3749, 784] },
      { label: 'Workers in industrial action', value: '248K', direction: 'down' as const, polarity: 'up-is-bad' as const, context: '2024, down from 1.04M peak', sparklineData: [122, 1452, 173, 432, 81, 145, 64, 53, 244, 843, 1042, 248] },
    ],
  },
  'local-gov': {
    topic: 'Local Government',
    slug: 'local-gov',
    href: '/local-gov',
    colour: '#6B7280',
    preposition: 'with',
    metrics: [
      { label: 'Council funding vs 2010 (real)', value: '−32%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'core funding fell 32 percentage points', sparklineData: [100, 94, 89, 84, 79, 73, 70, 69, 69, 70, 71, 69, 68] },
      { label: 'Avg Band D council tax', value: '£1,900', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '2024/25, up £704 since 2010', sparklineData: [1196, 1205, 1196, 1199, 1286, 1352, 1449, 1522, 1671, 1779, 1900] },
    ],
  },
  'pensions': {
    topic: 'Pensions',
    slug: 'pensions',
    href: '/pensions',
    colour: '#F4A261',
    metrics: [
      { label: 'State pension (full new rate)', value: '£221.20/wk', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up 127% since 2010', sparklineData: [97.65, 113.1, 129.2, 141.85, 169.5, 221.2] },
      { label: 'Pensioners in poverty', value: '19.1%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '2.1 million, rising since 2016', sparklineData: [20, 16.2, 15.4, 17, 18.7, 19.1] },
    ],
  },
  'road-safety': {
    topic: 'Road Safety',
    slug: 'road-safety',
    href: '/road-safety',
    colour: '#F4A261',
    metrics: [
      { label: 'Road fatalities', value: '1,695', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'down 78% from 1972 peak', sparklineData: [1857, 1732, 1793, 1752, 1558, 1695] },
      { label: 'KSI casualties', value: '28,294', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'rising since 2016', sparklineData: [23530, 22144, 24831, 25945, 24622, 28294] },
    ],
  },
  'energy-bills': {
    topic: 'Energy Bills',
    slug: 'energy-bills',
    href: '/energy-bills',
    colour: '#F4A261',
    metrics: [
      { label: 'Typical annual bill', value: '£1,738', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down from peak £3,549', sparklineData: [1137, 1179, 1162, 1042, 1138, 1277, 1971, 3549, 2500, 2500, 2074, 1834, 1928, 1690, 1568, 1717, 1738] },
      { label: 'Fuel poor households', value: '3.44M', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 2.5M pre-crisis', sparklineData: [2.38, 2.5, 2.55, 2.52, 2.53, 2.51, 2.55, 2.67, 3.24, 3.44] },
    ],
  },
  'rail': {
    topic: 'Rail',
    slug: 'rail',
    href: '/rail',
    colour: '#264653',
    metrics: [
      { label: 'Train punctuality', value: '72.2%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'worst since records began', sparklineData: [88.8, 88.8, 89.2, 87.8, 85.2, 84.4, 91.2, 91.3, 84.1, 71.7, 72.2] },
      { label: 'Cancellations', value: '3.1%', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'improving from 4.4% peak', sparklineData: [1.8, 1.9, 1.9, 2, 2, 2.3, 2.5, 2.8, 4.4, 3.5, 3.1] },
    ],
  },
  'policing': {
    topic: 'Policing',
    slug: 'policing',
    href: '/policing',
    colour: '#6B7280',
    metrics: [
      { label: 'Charge rate', value: '5.6%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'halved since 2014', sparklineData: [15.5, 14.1, 12.7, 10, 8, 7, 6.1, 5.6] },
      { label: 'Public confidence', value: '54.1%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down from 63.5% in 2019', sparklineData: [62.7, 63.5, 60.8, 59.4, 55.7, 54.1] },
    ],
  },
  'obesity': {
    topic: 'Obesity',
    slug: 'obesity',
    href: '/obesity',
    colour: '#E63946',
    metrics: [
      { label: 'Adults obese', value: '26%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'doubled since 1993', sparklineData: [13.2, 19.7, 24.5, 25.8, 26.9, 28, 26] },
      { label: 'Year 6 obesity', value: '22.7%', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down from 25.5% COVID peak', sparklineData: [17.3, 19.4, 20.1, 25.5, 23.4, 22.7] },
    ],
  },
  'planning': {
    topic: 'Planning',
    slug: 'planning',
    href: '/planning',
    colour: '#F4A261',
    metrics: [
      { label: 'New homes built', value: '160K', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'target 300K annually', sparklineData: [168.9, 182, 174.5, 160.4] },
      { label: 'Price/earnings ratio', value: '8.0×', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'was 6.8× in 2010', sparklineData: [6.8, 7.7, 7.9, 9.1, 8.3, 8] },
    ],
  },
  'air-quality': {
    topic: 'Air Quality',
    slug: 'air-quality',
    href: '/air-quality',
    colour: '#2A9D8F',
    metrics: [
      { label: 'PM2.5 concentration', value: '8.1 μg/m³', direction: 'down' as const, polarity: 'up-is-bad' as const, sparklineData: [11.4, 10.3, 9.5, 9.2, 8.7, 8.2, 8.5, 8.1] },
      { label: 'Premature deaths', value: '29K', direction: 'down' as const, polarity: 'up-is-bad' as const, sparklineData: [40000, 38000, 36000, 34000, 29000] },
    ],
  },
  'healthy-life-expectancy': {
    topic: 'Healthy Life Expectancy',
    slug: 'healthy-life-expectancy',
    href: '/healthy-life-expectancy',
    colour: '#2A9D8F',
    preposition: 'for',
    metrics: [
      { label: 'Male healthy LE', value: '62.9 yrs', direction: 'flat' as const, polarity: 'up-is-good' as const, sparklineData: [63.3, 63.7, 63.4, 63.1, 62.5, 62.2, 62.9] },
      { label: 'Deprivation gap', value: '19.1 yrs', direction: 'flat' as const, polarity: 'up-is-bad' as const, sparklineData: [19.1, 19.1] },
    ],
  },
  'flooding': {
    topic: 'Flooding',
    slug: 'flooding',
    href: '/flooding',
    colour: '#264653',
    preposition: 'with',
    metrics: [
      { label: 'Properties at flood risk', value: '6.3M', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '1 in 6 homes', sparklineData: [5200, 5400, 5600, 5800, 5900, 6100, 6200, 6300] },
      { label: 'Flood defence spending', value: '£1.1bn', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up from £670M in 2010/11', sparklineData: [670, 640, 700, 780, 820, 860, 900, 890, 950, 1030, 1100] },
    ],
  },
  'disability-employment': {
    topic: 'Disability Employment',
    slug: 'disability-employment',
    href: '/disability-employment',
    colour: '#6B7280',
    metrics: [
      { label: 'Disability employment gap', value: '28.4pp', direction: 'down' as const, polarity: 'up-is-bad' as const, context: '53.7% disabled in work vs 82.1% non-disabled', sparklineData: [36.4, 35.1, 33.6, 32.3, 30.8, 29.6, 28.2, 28.3, 28.7, 28.4] },
      { label: 'PIP claimants', value: '3.6M', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 1.5M in 2015', sparklineData: [1.5, 1.8, 2.2, 2.5, 2.7, 2.8, 3, 3.2, 3.6] },
    ],
  },
  'housing-quality': {
    topic: 'Housing Quality',
    slug: 'housing-quality',
    href: '/housing-quality',
    colour: '#F4A261',
    metrics: [
      { label: 'Non-decent homes', value: '4.3M', direction: 'down' as const, polarity: 'up-is-bad' as const, context: '17% of housing stock', sparklineData: [7.5, 6.5, 5.7, 5, 4.7, 4.5, 4.3] },
      { label: 'Homes with damp/mould', value: '1M', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '4.5% of all dwellings', sparklineData: [3.8, 3.7, 3.9, 4, 4.3, 4.2, 4.5] },
    ],
  },
  'apprenticeships': {
    topic: 'Apprenticeships',
    slug: 'apprenticeships',
    href: '/apprenticeships',
    colour: '#264653',
    metrics: [
      { label: 'Apprenticeship starts (2022/23)', value: '700K', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down from 509K in 2015/16 after levy', sparklineData: [4.4, 4.99, 5.09, 4.94, 3.75, 3.93, 3.22, 2.88, 3.49, 7] },
      { label: 'Under-19 apprenticeships', value: '125K', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down 47% since 2015/16', sparklineData: [0.24, 0.23, 0.236, 0.20, 0.16, 0.125] },
    ],
  },
  'social-housing': {
    topic: 'Social Housing',
    slug: 'social-housing',
    href: '/social-housing',
    colour: '#264653',
    metrics: [
      { label: 'Social homes built', value: '7,500', direction: 'down' as const, polarity: 'up-is-good' as const, sparklineData: [39.5, 31.4, 26.8, 22.8, 16.9, 10.2, 7.5] },
      { label: 'Waiting list', value: '1.29M', direction: 'up' as const, polarity: 'up-is-bad' as const, sparklineData: [1730, 1310, 1160, 1140, 1200, 1260, 1290] },
    ],
  },
  'trade': {
    topic: 'Trade &amp; Brexit',
    slug: 'trade',
    href: '/trade',
    colour: '#264653',
    preposition: 'with',
    metrics: [
      { label: 'Goods exports to EU (index)', value: '93', direction: 'flat' as const, polarity: 'up-is-good' as const, context: '2016=100', sparklineData: [100, 105, 107, 109, 85, 87, 92, 93] },
      { label: 'Services surplus', value: '£145bn', direction: 'up' as const, polarity: 'up-is-good' as const, context: '2023, largest ever', sparklineData: [87, 104, 121, 79, 95, 143, 145] },
    ],
  },
  'long-covid': {
    topic: 'Long COVID',
    slug: 'long-covid',
    href: '/long-covid',
    colour: '#E63946',
    metrics: [
      { label: 'People with long COVID', value: '1.5M', direction: 'down' as const, polarity: 'up-is-bad' as const, context: '2024, down from 2.1M', sparklineData: [1.3, 2.1, 1.8, 1.5] },
      { label: 'Economic cost', value: '£5bn/yr', direction: 'down' as const, polarity: 'up-is-bad' as const, context: '2024, down from peak', sparklineData: [1.5, 3.8, 5.7, 5] },
    ],
  },
  'nhs-dentistry': {
    topic: 'NHS Dentistry',
    slug: 'nhs-dentistry',
    href: '/nhs-dentistry',
    colour: '#2A9D8F',
    metrics: [
      { label: 'Adults seen by NHS dentist', value: '54%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down from 66% pre-COVID', sparklineData: [64, 65, 66, 66, 26, 42, 48, 54] },
      { label: 'A&amp;E dental pain attendances', value: '134K', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 93K in 2013', sparklineData: [93, 98, 105, 112, 118, 124, 80, 112, 134] },
    ],
  },
  'food-banks': {
    topic: 'Food Banks',
    slug: 'food-banks',
    href: '/food-banks',
    colour: '#E63946',
    metrics: [
      { label: 'Trussell Trust parcels', value: '3.1M', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'tripled since 2013', sparklineData: [913, 1085, 1182, 1183, 1330, 1600, 1910, 2173, 2578, 3130] },
      { label: 'Households in food insecurity', value: '7.2M', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '24% of UK households', sparklineData: [2.4, 2.6, 3.2, 4.7, 7.2] },
    ],
  },
  'libraries': {
    topic: 'Libraries',
    slug: 'libraries',
    href: '/libraries',
    colour: '#6B7280',
    metrics: [
      { label: 'Library branches (England)', value: '3,000', direction: 'down' as const, polarity: 'up-is-good' as const, context: '2022/23, down 17% since 2010', sparklineData: [3583, 3509, 3450, 3392, 3341, 3268, 3210, 3150, 3100, 3050, 3100, 3050, 3000] },
      { label: 'Library visits (millions)', value: '247M', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down from 338M in 2010, post-COVID recovery', sparklineData: [338, 312, 296, 280, 268, 253, 247, 220, 170, 190, 247] },
    ],
  },
  'veterans': {
    topic: 'Veterans',
    slug: 'veterans',
    href: '/veterans',
    colour: '#264653',
    metrics: [
      { label: 'Armed forces strength', value: '148K', direction: 'down' as const, polarity: 'up-is-good' as const, context: '2024, below 160K target', sparklineData: [178.6, 172.7, 164.1, 158.9, 152.4, 149.3, 148.5, 147.5, 145.6, 149.7, 148] },
      { label: 'Op COURAGE referrals', value: '21K', direction: 'up' as const, polarity: 'up-is-good' as const, context: '2021–24, NHS veterans mental health', sparklineData: [5000, 8000, 8000] },
    ],
  },
  'biodiversity': {
    topic: 'Biodiversity',
    slug: 'biodiversity',
    href: '/biodiversity',
    colour: '#2A9D8F',
    metrics: [
      { label: 'UK species in decline since 1970', value: '41%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '15% at risk of extinction', sparklineData: [26, 28, 30, 33, 35, 37, 38, 39, 40, 41] },
      { label: 'Farmland bird index', value: '43', unit: '1970=100', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down 57% since 1970', sparklineData: [100, 75, 60, 52, 48, 45, 44, 43, 43] },
    ],
  },
  'nhs-waiting-lists': {
    topic: 'NHS Waiting Lists',
    slug: 'nhs-waiting-lists',
    href: '/nhs-waiting-lists',
    colour: '#E63946',
    metrics: [
      { label: 'on NHS waiting list', value: '7.6M', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'peak 7.8M in Sep 2023', sparklineData: [3.2, 3.6, 3.9, 4, 4.2, 5.6, 6.1, 6.8, 7.2, 7.7, 7.8, 7.6] },
      { label: 'within 18-week target', value: '58%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'target 92%, not met since 2016', sparklineData: [93, 91, 92, 91, 92, 90, 55, 62, 68, 61, 58] },
    ],
  },
  'gambling': {
    topic: 'Gambling',
    slug: 'gambling',
    href: '/gambling',
    colour: '#6B7280',
    metrics: [
      { label: 'problem gamblers', value: '430K', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'England 2022', sparklineData: [430, 440, 420, 410, 430, 430] },
      { label: 'online gambling yield', value: '£7.1bn', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '51% of all gambling', sparklineData: [3.2, 3.8, 4.2, 4.7, 5, 5.5, 6, 7.1] },
    ],
  },
  'university-funding': {
    topic: 'University Funding',
    slug: 'university-funding',
    href: '/university-funding',
    colour: '#264653',
    metrics: [
      { label: 'Avg. student debt at graduation', value: '£45,800', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from £16K in 2012', sparklineData: [16.2, 18.5, 20.5, 23.1, 25.6, 29.4, 33.9, 36.8, 38.2, 41.3, 43.5, 45.8] },
      { label: 'International students', value: '680K', direction: 'up' as const, polarity: 'up-is-good' as const, context: '26% of all students, £25bn to economy', sparklineData: [425, 440, 460, 480, 500, 530, 580, 640, 680] },
    ],
  },
  'domestic-violence': {
    topic: 'Domestic Violence',
    slug: 'domestic-violence',
    href: '/domestic-violence',
    colour: '#E63946',
    metrics: [
      { label: 'domestic abuse victims/year', value: '2.4M', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: '1.4M women, 750K men', sparklineData: [2.3, 2.4, 2.2, 2.3, 2.5, 2.4, 2.3, 2.4] },
      { label: 'Crimes charged', value: '6%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down from 14% in 2015', sparklineData: [14, 13, 11, 10, 9, 8, 7, 6] },
    ],
  },
  'nhs-workforce': {
    topic: 'NHS Workforce',
    slug: 'nhs-workforce',
    href: '/nhs-workforce',
    colour: '#2A9D8F',
    preposition: 'in the',
    metrics: [
      { label: 'NHS vacancies', value: '107K', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down from 121K peak (2022)', sparklineData: [35, 45, 60, 75, 90, 100, 110, 121, 115, 107] },
      { label: 'Sickness absence rate', value: '5.6%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'record high, up from 4.1% in 2019', sparklineData: [3.8, 3.9, 4, 4.1, 5.8, 5.2, 5.4, 5.6] },
    ],
  },
  'prisons': {
    topic: 'Prisons',
    slug: 'prisons',
    href: '/prisons',
    colour: '#6B7280',
    metrics: [
      { label: 'Prison population', value: '88K', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'record high, above capacity', sparklineData: [84.5, 85.4, 85.6, 85, 82.8, 82.5, 78.8, 78.7, 80.7, 86.1, 88] },
      { label: 'Reoffending within 12 months', value: '26%', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'unchanged for a decade', sparklineData: [27, 27, 26, 25, 25, 26, 26, 26] },
    ],
  },
  'rough-sleeping': {
    topic: 'Rough Sleeping',
    slug: 'rough-sleeping',
    href: '/rough-sleeping',
    colour: '#6B7280',
    metrics: [
      { label: 'sleeping rough (official count)', value: '3,898', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up 27% year-on-year', sparklineData: [1768, 2181, 2309, 2414, 2744, 3569, 4134, 4677, 5247, 4266, 2688, 2440, 3069, 3898] },
      { label: 'in temporary accommodation', value: '109K', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'record high, includes 145K children', sparklineData: [48, 55, 72, 88, 95, 98, 102, 109] },
    ],
  },
  'drug-deaths': {
    topic: 'Drug Deaths',
    slug: 'drug-deaths',
    href: '/drug-deaths',
    colour: '#E63946',
    metrics: [
      { label: 'drug poisoning deaths', value: '4,907', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'record high in 2022', sparklineData: [2652, 2732, 2952, 3346, 3744, 3756, 4359, 4393, 4561, 4859, 4907] },
      { label: 'Scotland death rate per 100K', value: '22.4', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'highest in Europe', sparklineData: [6.8, 9.2, 12.3, 17.5, 21.3, 22.4] },
    ],
  },
  'nhs-ae': {
    topic: 'NHS A&E',
    slug: 'nhs-ae',
    href: '/nhs-ae',
    colour: '#E63946',
    metrics: [
      { label: 'A&E 4-hour performance', value: '70%', unit: '%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'target is 95%, last met in 2015', sparklineData: [95, 94, 93, 92, 90, 88, 83, 78, 83, 70, 70] },
      { label: '12-hour trolley waits', value: '300K+', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from near-zero in 2019', sparklineData: [500, 1000, 3000, 5000, 7000, 12000, 40000, 88000] },
    ],
  },
  'gender-pay-gap': {
    topic: 'Gender Pay Gap',
    slug: 'gender-pay-gap',
    href: '/gender-pay-gap',
    colour: '#F4A261',
    metrics: [
      { label: 'Full-time pay gap', value: '14.3%', direction: 'down' as const, polarity: 'up-is-bad' as const },
      { label: 'All workers pay gap', value: '19.7%', direction: 'down' as const, polarity: 'up-is-bad' as const },
    ],
  },
  'care-leavers': {
    topic: 'Care Leavers',
    slug: 'care-leavers',
    href: '/care-leavers',
    colour: '#264653',
    preposition: 'for',
    metrics: [
      { label: 'Children in care', value: '95,000', direction: 'up' as const, polarity: 'up-is-bad' as const },
      { label: 'Care leavers NEET', value: '37%', direction: 'flat' as const, polarity: 'up-is-bad' as const },
    ],
  },
  'nhs-cancer': {
    topic: 'NHS Cancer',
    slug: 'nhs-cancer',
    href: '/nhs-cancer',
    colour: '#E63946',
    metrics: [
      { label: '62-day cancer treatment start', value: '63%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'target: 85%', sparklineData: [88, 87, 85, 84, 82, 80, 77, 75, 72, 50, 63, 63] },
    ],
  },
  'alcohol-misuse': {
    topic: 'Alcohol Misuse',
    slug: 'alcohol-misuse',
    href: '/alcohol-misuse',
    colour: '#6B7280',
    metrics: [
      { label: 'Alcohol-specific deaths', value: '9,048', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'near record; 75% from liver disease', sparklineData: [8790, 8748, 8367, 8416, 8697, 9014, 9214, 9069, 9028, 9183, 9223, 9641, 9048] },
      { label: 'Hospital admissions', value: '900K', unit: '/yr', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '1 in 14 emergency admissions', sparklineData: [7.2, 7.6, 8, 8.2, 8.5, 8.1, 8.7, 9] },
    ],
  },
  'alcohol': {
    topic: 'Alcohol',
    slug: 'alcohol',
    href: '/alcohol',
    colour: '#F4A261',
    preposition: 'with',
    metrics: [
      { label: 'Alcohol-specific deaths', value: '8,274', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 6,669 in 2010', sparklineData: [6669, 6880, 6490, 6592, 6831, 7366, 7327, 7697, 7551, 7565, 8974, 9641, 8209, 8274] },
      { label: 'Hospital admissions', value: '980K', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up 17% since 2010', sparklineData: [839, 865, 884, 904, 916, 925, 930, 940, 950, 955, 890, 960, 975, 980] },
    ],
  },
  'digital-inclusion': {
    topic: 'Digital Inclusion',
    slug: 'digital-inclusion',
    href: '/digital-inclusion',
    colour: '#2A9D8F',
    preposition: 'with',
    metrics: [
      { label: 'Adults without basic digital skills', value: '8M', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down from 11.3M in 2020', sparklineData: [14.3, 13, 12.6, 12.1, 11.3, 10.2, 9.1, 8] },
      { label: 'Median broadband speed', value: '114 Mbps', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up from 27 Mbps in 2018', sparklineData: [27, 35, 54, 77, 90, 114] },
    ],
  },
  'hate-crime': {
    topic: 'Hate Crime',
    slug: 'hate-crime',
    href: '/hate-crime',
    colour: '#E63946',
    preposition: 'with',
    metrics: [
      { label: 'Police-recorded hate crimes', value: '145,214', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down from 155,841 peak; up 5x since 2012/13', sparklineData: [28012, 37484, 52528, 62518, 80393, 94098, 103379, 105090, 107841, 155841, 145214] },
      { label: 'Hate crime convictions', value: '11,000', direction: 'flat' as const, polarity: 'up-is-good' as const, context: '8% conviction rate; fell during COVID', sparklineData: [11583, 10609, 8892, 10848, 11000] },
    ],
  },
  'nhs-screening': {
    topic: 'NHS Screening',
    slug: 'nhs-screening',
    href: '/nhs-screening',
    colour: '#2A9D8F',
    preposition: 'in',
    metrics: [
      { label: 'Cervical screening coverage', value: '68.7%', direction: 'down' as const, polarity: 'up-is-good' as const, context: '20-year low; target 80%', sparklineData: [72.7, 72, 71.4, 71, 70.9, 71.6, 71.3, 66.3, 68.1, 68.7] },
      { label: 'Bowel screening coverage', value: '68%', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'recovering post-COVID; target 75%', sparklineData: [59, 61, 62.2, 64.3, 67.3, 61.5, 65.7, 68] },
    ],
  },
  'diabetes': {
    topic: 'Diabetes',
    slug: 'diabetes',
    href: '/diabetes',
    colour: '#F4A261',
    preposition: 'with',
    metrics: [
      { label: 'People with diagnosed diabetes', value: '4.4M', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 1.4M in 1998', sparklineData: [1.4, 1.6, 1.8, 2, 2.3, 2.6, 2.9, 3.2, 3.5, 3.7, 3.9, 4.1, 4.3, 4.4] },
      { label: 'Prevention Programme enrolments', value: '680K', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'since 2016 launch', sparklineData: [10, 60, 150, 250, 310, 420, 550, 680] },
    ],
  },
  'fuel-poverty': {
    topic: 'Fuel Poverty',
    slug: 'fuel-poverty',
    href: '/fuel-poverty',
    colour: '#F4A261',
    metrics: [
      { label: 'Households in fuel poverty', value: '3.3M', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '13.4% of households', sparklineData: [11.1, 11, 10.4, 10.6, 11.1, 10.9, 13.4, 13.2, 13.2, 13, 13.4] },
      { label: 'Energy price cap', value: '£1,928', unit: '/year', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down from £3,549 peak', sparklineData: [1254, 1162, 1277, 2500, 3000, 1928] },
    ],
  },
  'court-backlog': {
    topic: 'Court Backlog',
    slug: 'court-backlog',
    href: '/court-backlog',
    colour: '#6B7280',
    metrics: [
      { label: 'Crown Court outstanding cases', value: '67,573', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 41K pre-COVID', sparklineData: [35000, 37000, 39000, 41000, 40000, 38000, 56000, 58000, 60000, 61000, 65000, 67573] },
      { label: 'Average days to completion', value: '718', unit: 'days', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'doubled since pre-COVID', sparklineData: [350, 370, 390, 400, 410, 420, 560, 600, 650, 680, 700, 718] },
    ],
  },
  'nhs-mental-health': {
    topic: 'NHS Mental Health',
    slug: 'nhs-mental-health',
    href: '/nhs-mental-health',
    colour: '#2A9D8F',
    preposition: 'in',
    metrics: [
      { label: 'People in contact with MH services', value: '1.9M', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up from 1.4M in 2016', sparklineData: [1400, 1500, 1550, 1600, 1650, 1500, 1700, 1800, 1900] },
      { label: 'Average wait for talking therapy', value: '11', unit: 'weeks', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'target: 6 weeks', sparklineData: [5, 6, 7, 7, 8, 12, 10, 9, 11] },
    ],
  },
  'nhs-waiting-times': {
    topic: 'NHS Waiting Times',
    slug: 'nhs-waiting-times',
    href: '/nhs-waiting-times',
    colour: '#E63946',
    preposition: 'in',
    metrics: [
      { label: 'People on NHS elective waiting list', value: '7.54M', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Record high, up 70% since COVID', sparklineData: [3700, 4000, 4200, 4400, 4500, 5800, 6900, 7400, 7540] },
      { label: '% meeting 18-week standard', value: '58%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'Target: 92%, last met in 2016', sparklineData: [93, 90, 87, 84, 65, 61, 60, 59, 58] },
    ],
  },
  'economic-inactivity': {
    topic: 'Economic Inactivity',
    slug: 'economic-inactivity',
    href: '/economic-inactivity',
    colour: '#F4A261',
    preposition: 'with',
    metrics: [
      { label: 'Economically inactive (working age)', value: '9.4M', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '22% of working-age adults', sparklineData: [8.6, 8.5, 8.4, 8.4, 8.4, 8.4, 8.7, 9.2, 9.4, 9.4] },
      { label: 'Inactive due to long-term sickness', value: '2.8M', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Up from 2.0M pre-COVID', sparklineData: [2, 2, 2, 2, 2, 2, 2.1, 2.2, 2.6, 2.8] },
    ],
  },
  'private-renting': {
    topic: 'Private Renting',
    slug: 'private-renting',
    href: '/private-renting',
    colour: '#F4A261',
    preposition: 'in',
    metrics: [
      { label: 'Average monthly private rent', value: '£1,279', unit: '/mo', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Up 10% in one year', sparklineData: [700, 730, 750, 770, 790, 810, 840, 870, 905, 940, 990, 1160, 1279] },
      { label: 'Rent as % of income', value: '34', unit: '%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Up from 28% in 2011', sparklineData: [28, 29, 30, 31, 31, 32, 34] },
    ],
  },
  'productivity': {
    topic: 'Productivity',
    slug: 'productivity',
    href: '/productivity',
    colour: '#264653',
    metrics: [
      { label: 'Output per hour (UK = 100, G7 avg = 114)', value: '100', direction: 'flat' as const, polarity: 'up-is-good' as const, sparklineData: [95, 96, 96, 97, 97, 97, 97, 98, 98, 99, 97, 99, 100, 100] },
      { label: 'Business investment (% GDP)', value: '9.8%', direction: 'down' as const, polarity: 'up-is-good' as const, sparklineData: [11.2, 11, 10.8, 10.5, 10.2, 10, 9.8, 9.6, 9.5, 9.8, 9.4, 9.8, 9.8] },
    ],
  },
  'public-debt': {
    topic: 'Public Debt',
    slug: 'public-debt',
    href: '/public-debt',
    colour: '#6B7280',
    metrics: [
      { label: 'Public debt (% of GDP)', value: '97.1%', direction: 'up' as const, polarity: 'up-is-bad' as const, sparklineData: [35, 43, 52, 62, 69, 74, 79, 82, 83, 84, 86, 96, 97] },
      { label: 'Annual debt interest', value: '£111bn', direction: 'up' as const, polarity: 'up-is-bad' as const, sparklineData: [43, 45, 49, 53, 52, 51, 50, 50, 48, 47, 60, 116, 111] },
    ],
  },
  'loneliness': {
    topic: 'Loneliness',
    slug: 'loneliness',
    href: '/loneliness',
    colour: '#264653',
    metrics: [
      { label: 'Adults chronically lonely', value: '3.8M', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: '2022, 7.1M moderately lonely', sparklineData: [3.2, 3.3, 3.4, 3.5, 3.6, 3.8, 3.9, 3.8] },
      { label: 'Economic cost (annual)', value: '£32bn', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '£1,100 per lonely person', sparklineData: [25, 27, 29, 30, 32, 32] },
    ],
  },
  'unpaid-carers': {
    topic: 'Unpaid Carers',
    slug: 'unpaid-carers',
    href: '/unpaid-carers',
    colour: '#2A9D8F',
    preposition: 'for',
    metrics: [
      { label: 'Unpaid carers (UK)', value: '10.6M', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'Census 2021, worth £162bn/yr', sparklineData: [5.8, 6.5, 7.3, 8.2, 9.1, 9.8, 10.6] },
      { label: 'Carer&apos;s Allowance (weekly)', value: '£81.90', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '2023/24, 760K recipients', sparklineData: [61.35, 62.1, 64.6, 67.25, 69.7, 81.9] },
    ],
  },
  'teacher-shortage': {
    topic: 'Teacher Shortage',
    slug: 'teacher-shortage',
    href: '/teacher-shortage',
    colour: '#2A9D8F',
    metrics: [
      { label: 'Secondary vacancy rate', value: '3.1%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '2023, highest on record', sparklineData: [1.2, 1.4, 1.5, 1.6, 1.7, 1.8, 1.5, 2.1, 3.1] },
      { label: 'Recruitment vs target', value: '72%', direction: 'down' as const, polarity: 'up-is-good' as const, context: '2022/23, missed in 10 of 17 subjects', sparklineData: [98, 95, 92, 90, 88, 85, 90, 78, 72] },
    ],
  },
  'modern-slavery': {
    topic: 'Modern Slavery',
    slug: 'modern-slavery',
    href: '/modern-slavery',
    colour: '#0D1117',
    metrics: [
      { label: 'NRM referrals (potential victims)', value: '17,004', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '2023, up 33% in one year', sparklineData: [2340, 3266, 3805, 5145, 6985, 7852, 10627, 12727, 15614, 17004] },
      { label: 'Conviction rate', value: '~4%', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'of referrals, prosecution gap persisting', sparklineData: [74, 112, 188, 232, 264, 270, 295, 320, 345, 352] },
    ],
  },
  'school-exclusions': {
    topic: 'School Exclusions',
    slug: 'school-exclusions',
    href: '/school-exclusions',
    colour: '#F4A261',
    preposition: 'from',
    metrics: [
      { label: 'Permanent exclusions', value: '9,160', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '2022/23, up 77% since 2015/16', sparklineData: [5170, 6685, 7720, 8000, 6619, 5620, 9160] },
      { label: 'SEND pupils % of exclusions', value: '40%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'SEND pupils 17% of school population', sparklineData: [32, 33, 34, 35, 36, 37, 38, 40] },
    ],
  },
  'asylum-system': {
    topic: 'Asylum System',
    slug: 'asylum-system',
    href: '/asylum-system',
    colour: '#264653',
    preposition: 'in',
    metrics: [
      { label: 'Asylum applications (annual)', value: '98,519', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '2023, post-war record', sparklineData: [29268, 35566, 35099, 56040, 74751, 84425, 98519] },
      { label: 'People awaiting decision', value: '220K+', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Avg wait: 26 months', sparklineData: [64000, 100000, 130000, 166000, 195000, 220000] },
    ],
  },
  'suicide-prevention': {
    topic: 'Suicide Prevention',
    slug: 'suicide-prevention',
    href: '/suicide-prevention',
    colour: '#E63946',
    metrics: [
      { label: 'Suicide deaths (2022)', value: '5,642', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'highest since 1999', sparklineData: [4800, 4900, 5000, 5100, 5200, 5400, 5250, 5300, 4912, 5224, 5642] },
      { label: 'Rate per 100,000', value: '10.7', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'above EU average', sparklineData: [10.1, 10.1, 10, 10, 10.1, 10.1, 11.2, 11, 10, 10.4, 10.7] },
    ],
  },
  'prison-overcrowding': {
    topic: 'Prison Overcrowding',
    slug: 'prison-overcrowding',
    href: '/prison-overcrowding',
    colour: '#6B7280',
    metrics: [
      { label: 'Prison population', value: '88,225', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '110% of capacity', sparklineData: [86048, 84421, 85509, 85961, 85862, 86584, 83539, 82781, 78837, 79027, 84246, 88225] },
      { label: 'Occupancy rate', value: '110%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'built for 79,927', sparklineData: [108, 105, 106, 107, 107, 108, 104, 103, 98, 98, 105, 110] },
    ],
  },
  'adhd-autism': {
    topic: 'ADHD &amp; Autism',
    slug: 'adhd-autism',
    href: '/adhd-autism',
    colour: '#264653',
    metrics: [
      { label: 'Waiting for autism assessment', value: '187K', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 65K in 2016', sparklineData: [65, 72, 81, 92, 98, 128, 158, 187] },
      { label: 'ADHD referrals p.a.', value: '200K', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up 400% since 2020', sparklineData: [40, 45, 52, 85, 140, 200] },
    ],
  },
  'housebuilding': {
    topic: 'Housebuilding',
    slug: 'housebuilding',
    href: '/housebuilding',
    colour: '#F4A261',
    metrics: [
      { label: 'Homes completed p.a.', value: '234K', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'target: 300K/year', sparklineData: [135, 142, 155, 163, 183, 195, 213, 244, 211, 232, 234] },
      { label: 'Target gap', value: '66K', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: '/year shortfall', sparklineData: [165, 158, 145, 137, 117, 105, 87, 56, 89, 68, 66] },
    ],
  },
  'nhs-discharge': {
    topic: 'NHS Discharge',
    slug: 'nhs-discharge',
    href: '/nhs-discharge',
    colour: '#E63946',
    metrics: [
      { label: 'Daily stranded patients', value: '13,500', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'medically fit but stuck', sparklineData: [5.2, 5.8, 6.8, 7.2, 7.4, 3.8, 9.8, 12.5, 13.5] },
      { label: 'Social care delays', value: '42%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'of discharge delays', sparklineData: [35, 28, 38, 41, 42] },
    ],
  },
  'insecure-work': {
    topic: 'Insecure Work',
    slug: 'insecure-work',
    href: '/insecure-work',
    colour: '#F4A261',
    preposition: 'in',
    metrics: [
      { label: 'Zero-hours workers', value: '1.04M', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 250K in 2013', sparklineData: [250, 580, 747, 903, 883, 789, 974, 886, 920, 1022, 1040] },
      { label: 'Insecure workers (total)', value: '4.4M', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '14% pay penalty, 3x poverty risk', sparklineData: [3.8, 3.9, 4, 4.1, 3.7, 3.9, 4.2, 4.4] },
    ],
  },
  'council-finances': {
    topic: 'Council Finances',
    slug: 'council-finances',
    href: '/council-finances',
    colour: '#6B7280',
    preposition: 'in',
    metrics: [
      { label: 'Grant cut since 2010', value: '37%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'real terms, from £39bn to £25bn', sparklineData: [100, 92, 83, 76, 73, 68, 65, 63, 62, 63, 63] },
      { label: 'Section 114 notices', value: '12', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'since 2018, including Birmingham', sparklineData: [0, 0, 1, 2, 3, 4, 6, 9, 12] },
    ],
  },
  'personal-debt': {
    topic: 'Personal Debt',
    slug: 'personal-debt',
    href: '/personal-debt',
    colour: '#E63946',
    metrics: [
      { label: 'Household debt (total)', value: '£1.9tn', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '130% of household income', sparklineData: [1540, 1580, 1620, 1680, 1750, 1790, 1800, 1850, 1900] },
      { label: 'People in problem debt', value: '8.9M', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 6.3M in 2019', sparklineData: [6, 6.1, 6.2, 6.3, 5.8, 6.5, 7, 8, 8.9] },
    ],
  },
  'rural-services': {
    topic: 'Rural Services',
    slug: 'rural-services',
    href: '/rural-services',
    colour: '#264653',
    metrics: [
      { label: 'Rural bus routes cut', value: '1,000+', direction: 'down' as const, polarity: 'up-is-good' as const, context: '23% of rural routes', sparklineData: [100, 97, 94, 92, 89, 86, 83, 82, 70, 74, 76, 77] },
      { label: 'Miles to GP (rural avg)', value: '5.8mi', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'urban average: 0.8 miles', sparklineData: [3.8, 4, 4.3, 4.5, 4.7, 5, 5.2, 5.5, 5.8] },
    ],
  },
  'nhs-prescriptions': {
    topic: 'NHS Prescriptions',
    slug: 'nhs-prescriptions',
    href: '/nhs-prescriptions',
    colour: '#2A9D8F',
    metrics: [
      { label: 'Prescriptions dispensed p.a.', value: '1.1bn', direction: 'up' as const, polarity: 'up-is-good' as const, context: '90% free of charge', sparklineData: [900, 930, 953, 971, 990, 1016, 1025, 1040, 1001, 1060, 1080, 1100] },
      { label: 'Charge per item', value: '£9.90', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up 60% in real terms', sparklineData: [7.65, 7.85, 8.05, 8.2, 8.4, 8.6, 8.8, 9, 9.15, 9.35, 9.65, 9.9] },
    ],
  },
  'online-harms': {
    topic: 'Online Harms',
    slug: 'online-harms',
    href: '/online-harms',
    colour: '#0D1117',
    preposition: 'in',
    metrics: [
      { label: 'Online fraud incidents p.a.', value: '3.8M', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '41% of all crime', sparklineData: [2.5, 2.8, 3, 3.3, 3.8, 3.7, 3.8] },
      { label: 'CSAM reports', value: '1.2M', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up 140% since 2018', sparklineData: [500, 650, 780, 900, 1050, 1200] },
    ],
  },
  'nhs-beds': {
    topic: 'NHS Beds',
    slug: 'nhs-beds',
    href: '/nhs-beds',
    colour: '#E63946',
    metrics: [
      { label: 'Hospital beds (England)', value: '99K', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down from 300K in 1987', sparklineData: [135, 130, 126, 122, 115, 110, 103, 99] },
      { label: 'Bed occupancy rate', value: '94%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'above safety threshold', sparklineData: [87.5, 88, 88.5, 89.2, 89.9, 86.5, 91, 94] },
    ],
  },
  'infant-mortality': {
    topic: 'Infant Mortality',
    slug: 'infant-mortality',
    href: '/infant-mortality',
    colour: '#E63946',
    metrics: [
      { label: 'Infant mortality rate', value: '3.6', unit: 'per 1,000', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'stalled since 2014', sparklineData: [4.1, 4, 3.9, 3.9, 3.8, 3.8, 3.8, 3.7, 3.6, 3.6, 3.6] },
      { label: 'Stillbirths per year', value: '3,000', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down from 4,100 in 2012', sparklineData: [4100, 4000, 3900, 3800, 3700, 3600, 3500, 3400, 3200, 3100, 3000] },
    ],
  },
  'nhs-vaccination': {
    topic: 'NHS Vaccination',
    slug: 'nhs-vaccination',
    href: '/nhs-vaccination',
    colour: '#2A9D8F',
    metrics: [
      { label: 'MMR uptake at age 2', value: '89.3%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'below 95% herd immunity threshold', sparklineData: [92.3, 92.7, 92.3, 91.9, 91.6, 91.2, 90.3, 89.8, 89.2, 89, 89.3] },
      { label: 'MMR uptake in London', value: '84.1%', direction: 'down' as const, polarity: 'up-is-good' as const, context: '11pp below herd immunity', sparklineData: [88, 87, 86, 85, 84, 83, 82, 81, 80, 81, 84.1] },
    ],
  },
  'dementia': {
    topic: 'Dementia',
    slug: 'dementia',
    href: '/dementia',
    colour: '#264653',
    metrics: [
      { label: 'People with dementia', value: '944K', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '+280K since 2012', sparklineData: [664, 690, 710, 735, 755, 770, 790, 808, 830, 860, 900, 944] },
      { label: 'Diagnosis rate', value: '63.4%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'target: 66.7%', sparklineData: [63.3, 66.1, 69.7, 71.3, 71.1, 70.8, 69.8, 66.7, 55.7, 55.9, 58.1, 63.4] },
    ],
  },
  'student-debt': {
    topic: 'Student Debt',
    slug: 'student-debt',
    href: '/student-debt',
    colour: '#6B7280',
    metrics: [
      { label: 'Average graduate debt', value: '£45.6K', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '+£28K since 2012', sparklineData: [17, 20.5, 23.8, 27.1, 30.4, 32.9, 35.7, 38.4, 40.1, 41.3, 43.2, 45.6] },
      { label: 'Graduates to fully repay', value: '23%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'was 40% pre-2012', sparklineData: [40, 37, 34, 31, 29, 28, 26, 24, 23] },
    ],
  },
  'food-insecurity': {
    topic: 'Food Insecurity',
    slug: 'food-insecurity',
    href: '/food-insecurity',
    colour: '#E63946',
    preposition: 'with',
    metrics: [
      { label: 'Food bank parcels issued', value: '3.1M', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 129K in 2012', sparklineData: [0.129, 0.347, 0.913, 1.085, 1.109, 1.183, 1.333, 1.584, 1.9, 2.173, 2.513, 3.122] },
      { label: 'Children in food-insecure households', value: '20', unit: '%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 11% in 2018', sparklineData: [11, 12, 14, 16, 18, 20] },
    ],
  },
  'antibiotic-resistance': {
    topic: 'Antibiotic Resistance',
    slug: 'antibiotic-resistance',
    href: '/antibiotic-resistance',
    colour: '#264653',
    metrics: [
      { label: 'UK deaths from AMR', value: '7.0K', unit: '/yr', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 4.4K in 2016', sparklineData: [4.4, 4.8, 5.2, 5.7, 6.1, 6.4, 6.8, 7] },
      { label: 'E. coli resistant to standard antibiotics', value: '46', unit: '%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 38% in 2016', sparklineData: [38, 39, 40, 42, 43, 44, 45, 46] },
    ],
  },
  'voter-turnout': {
    topic: 'Voter Turnout',
    slug: 'voter-turnout',
    href: '/voter-turnout',
    colour: '#6B7280',
    preposition: 'in',
    metrics: [
      { label: '2024 general election turnout', value: '59.7', unit: '%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'lowest since 2001', sparklineData: [59.4, 61.4, 65.1, 66.1, 68.8, 67.3, 59.7] },
      { label: 'Local election turnout', value: '32', unit: '%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down from 42% in 2000', sparklineData: [42, 34, 37, 37, 35, 42, 32, 36, 33, 34, 35, 31, 32] },
    ],
  },
  'digital-exclusion': {
    topic: 'Digital Exclusion',
    slug: 'digital-exclusion',
    href: '/digital-exclusion',
    colour: '#6B7280',
    preposition: 'in',
    metrics: [
      { label: 'Adults lacking basic digital skills', value: '7.5M', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '11% of UK adults', sparklineData: [7.0, 7.2, 7.5, 7.3, 7.1, 7.0, 6.9, 6.7, 6.5] },
      { label: 'Adults who have never used internet', value: '3.9M', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: '6% of population; 90%+ over 65', sparklineData: [5.0, 5.2, 5.1, 5.0, 4.8, 4.5, 4.2, 4.0, 3.9] },
    ],
  },
  'wealth-inequality': {
    topic: 'Wealth Inequality',
    slug: 'wealth-inequality',
    href: '/wealth-inequality',
    colour: '#264653',
    preposition: 'in',
    metrics: [
      { label: 'Wealth share of top 10%', value: '43%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 38% in 2006/08', sparklineData: [38, 39, 40, 41, 42, 42, 43, 43, 43] },
      { label: 'Under-35s with no savings', value: '32%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 22% in 2015', sparklineData: [22, 24, 25, 27, 28, 30, 31, 32, 32] },
    ],
  },
  'gambling-harm': {
    topic: 'Gambling Harm',
    slug: 'gambling-harm',
    href: '/gambling-harm',
    colour: '#E63946',
    metrics: [
      { label: 'Problem gamblers', value: '300K', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Great Britain; 1.8M at risk', sparklineData: [280, 285, 290, 295, 298, 300] },
      { label: 'Online gambling gross yield', value: '&pound;6.9bn', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from &pound;1.8bn in 2012', sparklineData: [1.8, 2.3, 2.8, 3.3, 3.9, 4.5, 5.1, 5.6, 5.9, 6.5, 6.9] },
    ],
  },
  'prison-reoffending': {
    topic: 'Prison Reoffending',
    slug: 'prison-reoffending',
    href: '/prison-reoffending',
    colour: '#6B7280',
    preposition: 'and',
    metrics: [
      { label: 'Reoffending within 1 year', value: '53%', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'unchanged since 2010', sparklineData: [55, 54, 55, 54, 53, 53, 53, 53, 54, 53, 50, 52, 53] },
      { label: 'Cost of reoffending', value: '&pound;18bn', unit: 'per year', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'MOJ estimate; crime costs', sparklineData: [14, 15, 16, 17, 18] },
    ],
  },
  'eating-disorders': {
    topic: 'Eating Disorders',
    slug: 'eating-disorders',
    href: '/eating-disorders',
    colour: '#264653',
    metrics: [
      { label: 'Hospital admissions/year', value: '28K', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'doubled since 2011; 89% female', sparklineData: [14, 16, 18, 20, 23, 25, 27, 28] },
      { label: 'Average wait for treatment', value: '22 wks', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'target is 4 weeks; some areas 2+ years', sparklineData: [12, 14, 16, 20, 22, 22] },
    ],
  },
  'universal-credit': {
    topic: 'Universal Credit',
    slug: 'universal-credit',
    href: '/universal-credit',
    colour: '#F4A261',
    preposition: 'with',
    metrics: [
      { label: 'Universal Credit claimants', value: '6.4M', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'was 2.9M before COVID; full rollout by 2024', sparklineData: [0.5, 0.9, 1.6, 2.9, 5.6, 5.9, 6.1, 6.4] },
      { label: 'Households affected by benefit cap', value: '126K', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'average cap shortfall: £58/week', sparklineData: [85, 95, 105, 115, 120, 122, 125, 126] },
    ],
  },
  'young-carers': {
    topic: 'Young Carers',
    slug: 'young-carers',
    href: '/young-carers',
    colour: '#264653',
    metrics: [
      { label: 'Young carers in UK', value: '800K', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: '1 in 12 secondary school children', sparklineData: [650, 680, 720, 760, 800] },
      { label: 'Young carers experiencing mental health difficulties', value: '42', unit: '%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '3x the rate for non-carers', sparklineData: [28, 32, 36, 39, 42] },
    ],
  },
  'child-protection': {
    topic: 'Child Protection',
    slug: 'child-protection',
    href: '/child-protection',
    colour: '#E63946',
    metrics: [
      { label: 'Child protection referrals (England)', value: '714K', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up 37% since 2011/12', sparklineData: [521, 545, 570, 590, 604, 630, 640, 655, 670, 690, 714] },
      { label: 'Children in care (looked-after)', value: '83.8K', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up 24% since 2011; record high', sparklineData: [65.5, 66.5, 68.1, 69.5, 72.7, 78.2, 80.1, 82.2, 83.8] },
    ],
  },
};

// ── Derived lookups ───────────────────────────────────────────────────────────

export function getCategoryFeatured(category: Category): TopicEntry[] {
  return category.featured.map(slug => TOPICS[slug]).filter(Boolean);
}

export function getCategoryRemaining(category: Category): TopicEntry[] {
  const featuredSet = new Set(category.featured);
  return category.topics.filter(slug => !featuredSet.has(slug)).map(slug => TOPICS[slug]).filter(Boolean);
}

export function getScorecard() {
  const allMetrics = Object.values(TOPICS).flatMap(t => t.metrics);
  const worse = allMetrics.filter(m => getMetricStatus(m.direction, m.polarity) === 'worse').length;
  const better = allMetrics.filter(m => getMetricStatus(m.direction, m.polarity) === 'better').length;
  const stable = allMetrics.filter(m => getMetricStatus(m.direction, m.polarity) === 'stable').length;
  return { worse, better, stable, total: allMetrics.length, topicCount: Object.keys(TOPICS).length };
}
