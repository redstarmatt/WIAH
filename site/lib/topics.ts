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
    topics: ['health', 'nhs-waiting-lists', 'nhs-ae', 'nhs-beds', 'nhs-cancer', 'nhs-dentistry', 'nhs-discharge', 'nhs-mental-health', 'nhs-prescriptions', 'nhs-screening', 'nhs-staffing', 'nhs-vaccination', 'nhs-waiting-times', 'nhs-workforce', 'dental', 'maternity', 'long-covid', 'healthy-life-expectancy', 'infant-mortality', 'diabetes', 'dementia', 'antibiotic-resistance', 'community-pharmacies', 'cancer-survival', 'sexual-health', 'stroke', 'smoking', 'organ-donation', 'palliative-care', 'chronic-pain', 'blood-pressure', 'nhs-productivity', 'nhs-capital', 'learning-disabilities', 'nhs-sickness-absence', 'ambulance-handovers', 'fertility-treatment', 'gender-clinic', 'menopause-care', 'talking-therapies', 'hospital-infections', 'eye-care', 'cancer-diagnosis', 'childhood-obesity', 'maternity-safety', 'health-inequalities', 'gp-closures', 'preventable-deaths', 'long-term-conditions', 'nhs-dentistry-access', 'racial-health-gap', 'end-of-life'],
  },
  {
    name: 'Mental Health & Wellbeing',
    slug: 'mental-health-wellbeing',
    featured: ['mental-health', 'mental-health-waits', 'suicide-prevention'],
    topics: ['mental-health', 'mental-health-waits', 'suicide-prevention', 'adhd-autism', 'wellbeing', 'loneliness', 'gambling', 'gambling-harm', 'eating-disorders', 'drugs', 'drug-misuse', 'alcohol', 'drug-deaths', 'obesity', 'physical-inactivity', 'child-mental-health', 'sport-participation', 'student-mental-health', 'addiction-services', 'talking-therapies'],
  },
  {
    name: 'Crime & Justice',
    slug: 'crime-justice',
    featured: ['justice', 'knife-crime', 'prisons'],
    topics: ['justice', 'knife-crime', 'prisons', 'prison-reoffending', 'court-backlog', 'policing', 'prison-overcrowding', 'domestic-abuse', 'domestic-violence', 'hate-crime', 'modern-slavery', 'online-harms', 'youth-justice', 'fraud', 'rape-prosecution', 'county-lines', 'stalking', 'family-courts', 'youth-violence', 'cybercrime', 'miscarriages-of-justice', 'victims-support', 'border-security', 'probation', 'legal-aid', 'prison-mental-health', 'police-misconduct'],
  },
  {
    name: 'Economy & Work',
    slug: 'economy-work',
    featured: ['economy', 'work', 'economic-inactivity'],
    topics: ['economy', 'work', 'economic-inactivity', 'youth-unemployment', 'productivity', 'trade', 'insecure-work', 'gender-pay-gap', 'strikes', 'high-streets', 'apprenticeships', 'small-business', 'tax-evasion', 'trade-unions', 'self-employment', 'food-production', 'executive-pay', 'national-debt', 'gig-economy', 'living-wage', 'in-work-poverty', 'skills-shortage', 'food-inflation', 'pension-deficits', 'creative-industries', 'zero-hours-contracts', 'insolvencies', 'real-wages', 'rd-investment', 'economic-growth', 'north-south-divide', 'housing-costs-workers', 'regional-pay', 'savings-crisis', 'supply-chain'],
  },
  {
    name: 'Housing',
    slug: 'housing',
    featured: ['housing', 'homelessness', 'housebuilding'],
    topics: ['housing', 'homelessness', 'housebuilding', 'housing-quality', 'private-renting', 'social-housing', 'rough-sleeping', 'planning', 'empty-homes', 'leasehold', 'building-safety', 'second-homes', 'evictions', 'land-banking', 'planning-permission', 'housing-costs-workers', 'cladding-crisis', 'holiday-lets', 'renters-reform', 'net-housing-supply', 'social-rent'],
  },
  {
    name: 'Education & Skills',
    slug: 'education-skills',
    featured: ['education', 'universities', 'teacher-shortage'],
    topics: ['education', 'universities', 'teacher-shortage', 'university-funding', 'school-exclusions', 'childcare', 'student-debt', 'early-years', 'school-buildings', 'adult-education', 'school-funding', 'send-crisis', 'graduate-outcomes', 'pupil-premium', 'arts-in-schools'],
  },
  {
    name: 'Poverty & Cost of Living',
    slug: 'poverty-cost-of-living',
    featured: ['child-poverty', 'food-banks', 'energy-bills'],
    topics: ['child-poverty', 'food-banks', 'energy-bills', 'poverty', 'inequality', 'fuel-poverty', 'personal-debt', 'benefits', 'universal-credit', 'pensions', 'pensioner-poverty', 'food-insecurity', 'wealth-inequality', 'food-deserts', 'funeral-poverty', 'period-poverty', 'rent-arrears', 'in-work-poverty', 'housing-benefit', 'council-tax', 'child-poverty-regions', 'disability-poverty', 'carer-poverty'],
  },
  {
    name: 'Environment & Climate',
    slug: 'environment-climate',
    featured: ['water', 'net-zero', 'air-quality'],
    topics: ['water', 'net-zero', 'air-quality', 'environment', 'biodiversity', 'flooding', 'waste', 'flood-risk', 'urban-heat', 'soil-health', 'marine-environment', 'energy-efficiency', 'plastic-pollution', 'trees-and-forests', 'noise-pollution', 'rewilding', 'solar-power', 'onshore-wind', 'aviation-emissions', 'peatlands', 'food-waste', 'chalk-streams', 'green-jobs', 'river-bathing', 'heat-mortality', 'habitat-condition', 'farming-subsidies', 'offshore-wind', 'circular-economy', 'wildfire-risk', 'nature-recovery'],
  },
  {
    name: 'Infrastructure & Services',
    slug: 'infrastructure-services',
    featured: ['energy', 'rail', 'broadband'],
    topics: ['energy', 'energy-security', 'rail', 'broadband', 'transport', 'road-safety', 'rural-services', 'libraries', 'digital-inclusion', 'digital-exclusion', 'pothole-roads', 'post-offices', 'public-toilets', 'water-infrastructure', 'electric-vehicles', 'heat-pumps', 'cycling-infrastructure', 'ev-charging'],
  },
  {
    name: 'Society & Democracy',
    slug: 'society-democracy',
    featured: ['immigration', 'democracy', 'demographics'],
    topics: ['immigration', 'democracy', 'demographics', 'asylum-system', 'social-mobility', 'public-debt', 'local-gov', 'council-finances', 'voter-turnout', 'coastal-communities', 'regional-inequality', 'racial-inequality', 'judicial-diversity', 'press-freedom', 'volunteering', 'social-media-harm', 'arts-funding', 'public-broadcasting', 'civil-liberties', 'military-spending', 'foreign-aid', 'net-migration', 'council-tax', 'creative-industries', 'health-inequalities', 'racial-health-gap', 'north-south-divide', 'regional-pay', 'birth-rate', 'trust-institutions', 'civic-participation', 'military-recruitment'],
  },
  {
    name: 'Care & Support',
    slug: 'care-support',
    featured: ['social-care', 'unpaid-carers', 'disability-employment'],
    topics: ['social-care', 'unpaid-carers', 'disability-employment', 'young-carers', 'care-leavers', 'veterans', 'child-protection', 'care-homes', 'learning-disabilities', 'kinship-care', 'foster-care', 'adoption', 'nhs-race-inequality', 'home-care', 'hospice-funding', 'veteran-mental-health', 'end-of-life', 'care-home-fees', 'social-care-waiting', 'young-people-care', 'care-worker-wages'],
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
      { label: 'Knife crime offences', value: '51,527', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down 5% from 2023/24 peak · youth offending falling 6 years', sparklineData: [43516, 46265, 40526, 47835, 50489, 54067, 51527] },
      { label: 'Hospital admissions (knife assault)', value: '3,494', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down 10% in 2024/25 · 6-year low', sparklineData: [4830, 4570, 3890, 4210, 4050, 3882, 3494] },
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
      { label: 'Renewable share', value: '50.8', unit: '%', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'first time >50% in 2024 · up from 7% in 2010', sparklineData: [7, 11.3, 14.9, 19.1, 24.6, 29.3, 33.1, 37.1, 43.1, 40.2, 41.5, 47.0, 50.8] },
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
  'physical-inactivity': {
    topic: 'Physical Inactivity',
    slug: 'physical-inactivity',
    href: '/physical-inactivity',
    colour: '#2A9D8F',
    preposition: 'with',
    metrics: [
      { label: 'Adults meeting activity guidelines', value: '62', unit: '%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'was 67% pre-pandemic', sparklineData: [66, 67, 67, 67, 59, 61, 62] },
      { label: 'Physically inactive adults', value: '11.5M', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '24% of population', sparklineData: [10.2, 10.5, 10.8, 11.2, 11.5] },
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
      { label: 'UK GHG emissions (MtCO2e)', value: '371', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'lowest since 1872 · down 53% since 1990', sparklineData: [792, 727, 703, 634, 527, 455, 404, 424, 406, 385, 371] },
      { label: 'Renewable electricity share', value: '50.8', unit: '%', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'first time >50% · coal closed 2024', sparklineData: [7, 9.4, 11.3, 14.9, 19.1, 24.6, 29.3, 33.1, 37.1, 43.1, 40.2, 41.5, 47.0, 50.8] },
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
      { label: 'PM2.5 concentration', value: '7.2 μg/m³', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'lowest ever recorded — 2024 DEFRA · down 37% from 2010', sparklineData: [11.4, 10.3, 9.5, 9.2, 8.7, 8.2, 8.5, 8.1, 7.2] },
      { label: 'Premature deaths (air pollution)', value: '29K', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down from 40K in 2010', sparklineData: [40000, 38000, 36000, 34000, 29000] },
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
      { label: 'UK species in decline since 1970', value: '41%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '15% at risk · but red kites: 0 → 10,000 in 30 years', sparklineData: [26, 28, 30, 33, 35, 37, 38, 39, 40, 41] },
      { label: 'Red kites in the UK', value: '10,000', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up from near-extinction in 1990 · RSPB\'s biggest species success', sparklineData: [10, 80, 250, 600, 1200, 2200, 3800, 6000, 8000, 10000] },
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
  'pensioner-poverty': {
    topic: 'Pensioner Poverty',
    slug: 'pensioner-poverty',
    href: '/pensioner-poverty',
    colour: '#6B7280',
    preposition: 'in',
    metrics: [
      { label: 'Pensioners in poverty', value: '18%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 14% in 2012; 2.1M people', sparklineData: [29, 27, 25, 22, 20, 18, 16, 14, 15, 16, 16, 17, 18, 18] },
      { label: 'State pension weekly rate', value: '£169', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up from £119 in 2016; Triple Lock', sparklineData: [119, 122, 125, 129, 134, 137, 141, 156, 169] },
    ],
  },
  'youth-justice': {
    topic: 'Youth Justice',
    slug: 'youth-justice',
    href: '/youth-justice',
    colour: '#6B7280',
    preposition: 'in',
    metrics: [
      { label: 'Children in custody', value: '430', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down 86% from 3,006 in 2008', sparklineData: [3006, 2600, 2200, 1900, 1600, 1300, 1000, 730, 620, 520, 430] },
      { label: 'Reoffending within 12 months', value: '68', unit: '%', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'broadly unchanged for a decade', sparklineData: [71, 69, 68, 67, 68, 69, 68, 68] },
    ],
  },
  'care-homes': {
    topic: 'Care Homes',
    slug: 'care-homes',
    href: '/care-homes',
    colour: '#6B7280',
    preposition: 'in',
    metrics: [
      { label: 'Social care staff vacancies', value: '131', unit: 'K', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 76K in 2013', sparklineData: [76, 82, 90, 98, 107, 112, 165, 152, 131] },
      { label: 'Care homes rated Requires Improvement or Inadequate', value: '25', unit: '%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 18% in 2017', sparklineData: [18, 20, 21, 22, 24, 25] },
    ],
  },
  'child-mental-health': {
    topic: 'Child Mental Health',
    slug: 'child-mental-health',
    href: '/child-mental-health',
    colour: '#E63946',
    preposition: 'in',
    metrics: [
      { label: 'CAMHS waiting list', value: '127', unit: 'K', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 26K in 2016', sparklineData: [26, 34, 48, 62, 88, 110, 120, 127] },
      { label: 'Children in contact with NHS mental health services', value: '1.8', unit: 'M', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up 45% since 2019', sparklineData: [1.0, 1.1, 1.2, 1.3, 1.5, 1.6, 1.7, 1.8] },
    ],
  },
  'coastal-communities': {
    topic: 'Coastal Communities',
    slug: 'coastal-communities',
    href: '/coastal-communities',
    colour: '#264653',
    preposition: 'in',
    metrics: [
      { label: 'Coastal wage gap vs national median', value: '\u221217%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'widened from \u221212% in 2010', sparklineData: [-12, -13, -13, -14, -14, -15, -15, -16, -17] },
      { label: 'Coastal child poverty rate', value: '34', unit: '%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'vs 24% national average', sparklineData: [28, 29, 30, 31, 32, 33, 34] },
    ],
  },
  'community-pharmacies': {
    topic: 'Community Pharmacies',
    slug: 'community-pharmacies',
    href: '/community-pharmacies',
    colour: '#2A9D8F',
    preposition: 'in',
    metrics: [
      { label: 'Community pharmacies in England', value: '10,575', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down from 11,748 in 2015', sparklineData: [11748, 11600, 11400, 11200, 11100, 11000, 10900, 10750, 10575] },
      { label: 'Pharmacies in financial difficulty', value: '90', unit: '%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'underfunded by \u00a3170M/year', sparklineData: [60, 65, 70, 75, 80, 85, 88, 90] },
    ],
  },
  'food-deserts': {
    topic: 'Food Deserts',
    slug: 'food-deserts',
    href: '/food-deserts',
    colour: '#E63946',
    preposition: 'in',
    metrics: [
      { label: 'People with limited food access', value: '8', unit: 'M', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'over 1 mile from supermarket, no car', sparklineData: [7.5, 7.6, 7.8, 7.9, 8.0, 8.0, 8.0] },
      { label: 'Supermarkets per 100K in most deprived areas', value: '2.8', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'vs 6.1 in least deprived; 5\u00d7 gap', sparklineData: [3.4, 3.2, 3.1, 3.0, 2.9, 2.8, 2.8] },
    ],
  },
  'funeral-poverty': {
    topic: 'Funeral Poverty',
    slug: 'funeral-poverty',
    href: '/funeral-poverty',
    colour: '#6B7280',
    preposition: 'in',
    metrics: [
      { label: 'Average UK funeral cost', value: '\u00a34,141', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up 126% since 2004', sparklineData: [1835, 2050, 2400, 2900, 3284, 3590, 3693, 3916, 4056, 4141] },
      { label: 'Families in funeral poverty', value: '110,000', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'cannot afford without financial help', sparklineData: [75000, 82000, 88000, 93000, 98000, 105000, 110000] },
    ],
  },
  'period-poverty': {
    topic: 'Period Poverty',
    slug: 'period-poverty',
    href: '/period-poverty',
    colour: '#E63946',
    preposition: 'in',
    metrics: [
      { label: 'Girls who struggled to afford period products', value: '1 in 5', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '14\u201321 year-olds; Plan International UK', sparklineData: [12, 14, 16, 18, 19, 20] },
      { label: 'Girls who missed school due to period poverty', value: '137,000', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'annually; Plan International UK', sparklineData: [70000, 85000, 100000, 115000, 128000, 137000] },
    ],
  },
  'school-buildings': {
    topic: 'School Buildings',
    slug: 'school-buildings',
    href: '/school-buildings',
    colour: '#F4A261',
    preposition: 'in',
    metrics: [
      { label: 'School capital maintenance backlog', value: '\u00a315bn', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from \u00a36.7bn in 2011', sparklineData: [6.7, 7.5, 8.2, 9.0, 10.1, 11.4, 13.0, 15.0] },
      { label: 'Schools with RAAC concrete', value: '174', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'risk of sudden structural collapse', sparklineData: [0, 0, 10, 52, 104, 156, 174] },
    ],
  },
  'urban-heat': {
    topic: 'Urban Heat',
    slug: 'urban-heat',
    href: '/urban-heat',
    colour: '#F4A261',
    preposition: 'in',
    metrics: [
      { label: 'Excess deaths attributed to 2022 heatwave', value: '2,803', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'UK record; 40.3\u00b0C reached', sparklineData: [760, 620, 900, 1080, 1200, 2803] },
      { label: 'Days above 28\u00b0C in England', value: '21', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 8 in 2010', sparklineData: [8, 10, 9, 12, 14, 11, 13, 18, 16, 15, 14, 21] },
    ],
  },

  // ── Batch A: NHS & Healthcare ────────────────────────────────────────────────
  'cancer-survival': {
    topic: 'Cancer Survival',
    slug: 'cancer-survival',
    href: '/cancer-survival',
    colour: '#2A9D8F',
    preposition: 'in',
    metrics: [
      { label: '5-year cancer survival rate', value: '55.4', unit: '%', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up +9.2pp since 2005 · one of NHS\'s biggest-ever improvements', sparklineData: [46.2, 48.1, 50.3, 52.0, 53.5, 54.8, 55.9, 56.7, 54.1, 55.4] },
      { label: 'Cancers diagnosed at stage 4', value: '26', unit: '%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Target: 75% at stage 1-2 by 2028', sparklineData: [22, 23, 23, 24, 24, 25, 25, 27, 26, 26] },
    ],
  },
  'sexual-health': {
    topic: 'Sexual Health',
    slug: 'sexual-health',
    href: '/sexual-health',
    colour: '#264653',
    preposition: 'in',
    metrics: [
      { label: 'STI diagnoses per year', value: '432K', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Returned to pre-COVID levels', sparklineData: [436, 435, 420, 423, 449, 468, 318, 389, 401, 416, 432] },
      { label: 'Sexual health clinics', value: '176', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'Down 41% from 297 in 2014', sparklineData: [297, 285, 264, 241, 228, 218, 209, 198, 189, 182, 176] },
    ],
  },
  'stroke': {
    topic: 'Stroke',
    slug: 'stroke',
    href: '/stroke',
    colour: '#E63946',
    preposition: 'in',
    metrics: [
      { label: 'Stroke mortality rate', value: '40.2', unit: 'per 100K', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'Down from 47 in 2012 · CVD deaths down 75% since 1969', sparklineData: [47.2, 45.8, 44.1, 43.5, 42.0, 40.8, 40.1, 39.4, 42.6, 41.3, 40.9, 40.2] },
      { label: 'Thrombectomy rate', value: '3.8', unit: '%', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'Target: 10% of ischaemic strokes', sparklineData: [1.2, 1.8, 2.4, 2.1, 2.9, 3.4, 3.8] },
    ],
  },
  'smoking': {
    topic: 'Smoking',
    slug: 'smoking',
    href: '/smoking',
    colour: '#2A9D8F',
    preposition: 'in',
    metrics: [
      { label: 'Adults who smoke', value: '10.6', unit: '%', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'Lowest ever — down from 20.2% in 2011', sparklineData: [20.2, 19.5, 18.7, 17.2, 15.5, 14.9, 14.4, 13.9, 12.7, 13.3, 12.7, 11.6, 10.6] },
      { label: '18–24 year olds smoking', value: '8.1', unit: '%', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'Down from 25.7% in 2011 · −17.6pp in 13 years', sparklineData: [25.7, 24.8, 23.6, 20.5, 18.4, 17.1, 15.8, 14.4, 13.1, 12.7, 11.3, 10.2, 8.1] },
    ],
  },
  'organ-donation': {
    topic: 'Organ Donation',
    slug: 'organ-donation',
    href: '/organ-donation',
    colour: '#2A9D8F',
    preposition: 'in',
    metrics: [
      { label: 'Transplant waiting list', value: '6,342', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'Down from 7,048 in 2020', sparklineData: [7026, 6943, 6744, 6434, 6174, 6147, 7048, 6866, 6728, 6527, 6342] },
      { label: 'Family consent rate', value: '72.8', unit: '%', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'Opt-out law since May 2020', sparklineData: [58.3, 60.1, 62.4, 63.8, 67.1, 67.4, 65.2, 68.1, 69.7, 71.2, 72.8] },
    ],
  },
  'palliative-care': {
    topic: 'Palliative Care',
    slug: 'palliative-care',
    href: '/palliative-care',
    colour: '#6B7280',
    preposition: 'in',
    metrics: [
      { label: 'NHS share of hospice funding', value: '27', unit: '%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'Down from 32% in 2014 — 73% funded by charity', sparklineData: [32, 31, 30, 29, 28, 28, 34, 31, 29, 28, 27] },
      { label: 'Deaths in usual place of residence', value: '47.5', unit: '%', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'Peaked at 52% during COVID', sparklineData: [45.2, 46.0, 46.8, 47.1, 47.5, 47.6, 52.4, 49.1, 48.3, 47.8, 47.5] },
    ],
  },
  'chronic-pain': {
    topic: 'Chronic Pain',
    slug: 'chronic-pain',
    href: '/chronic-pain',
    colour: '#F4A261',
    preposition: 'with',
    metrics: [
      { label: 'People with chronic pain', value: '28', unit: 'million', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Up from 18M in 2012 — leading cause of disability', sparklineData: [18.2, 20.1, 22.4, 24.6, 25.8, 27.1, 28.0] },
      { label: 'Working days lost per year', value: '36.8', unit: 'million', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'More than any other condition', sparklineData: [24.8, 26.3, 28.1, 30.4, 34.2, 36.8] },
    ],
  },
  'blood-pressure': {
    topic: 'Blood Pressure',
    slug: 'blood-pressure',
    href: '/blood-pressure',
    colour: '#E63946',
    preposition: 'with',
    metrics: [
      { label: 'Undiagnosed hypertension', value: '7.4', unit: 'million', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Nearly half of all cases undetected', sparklineData: [5.7, 5.9, 6.0, 6.3, 7.1, 7.3, 7.4] },
      { label: 'BP controlled to target', value: '60.4', unit: '%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'Among diagnosed patients — down from 64%', sparklineData: [62.3, 63.8, 64.1, 63.5, 58.2, 59.8, 60.4] },
    ],
  },
  'nhs-productivity': {
    topic: 'NHS Productivity',
    slug: 'nhs-productivity',
    href: '/nhs-productivity',
    colour: '#F4A261',
    preposition: 'in',
    metrics: [
      { label: 'Output per FTE worker', value: '90.3', unit: 'index', direction: 'down' as const, polarity: 'up-is-good' as const, context: '2014 = 100 — nearly 10% below baseline', sparklineData: [100, 100.8, 100.4, 100.1, 99.8, 99.4, 78.2, 85.1, 88.6, 89.8, 90.3] },
      { label: 'NHS FTE per 1,000 pop', value: '41.2', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'Up 17% since 2019', sparklineData: [35.2, 35.5, 35.8, 36.1, 36.4, 36.8, 38.2, 39.4, 40.1, 40.8, 41.2] },
    ],
  },
  'nhs-capital': {
    topic: 'NHS Capital',
    slug: 'nhs-capital',
    href: '/nhs-capital',
    colour: '#6B7280',
    preposition: 'in',
    metrics: [
      { label: 'Maintenance backlog', value: '\u00a313.8bn', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Tripled from \u00a34.3bn in 2014', sparklineData: [4.3, 4.7, 5.0, 5.5, 6.0, 6.5, 7.4, 8.3, 10.2, 11.6, 13.8] },
      { label: 'RAAC-affected trusts', value: '42', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Survey incomplete — true number likely higher', sparklineData: [27, 39, 42] },
    ],
  },
  'learning-disabilities': {
    topic: 'Learning Disabilities',
    slug: 'learning-disabilities',
    href: '/learning-disabilities',
    colour: '#264653',
    preposition: 'with',
    metrics: [
      { label: 'Life expectancy gap', value: '23', unit: 'years', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'Median age at death: 60 vs 83', sparklineData: [23, 23, 22, 23, 27, 25, 24, 23] },
      { label: 'People in inpatient settings', value: '1,960', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'Target was <1,500 by 2019 — missed', sparklineData: [3000, 2765, 2505, 2400, 2260, 2085, 2040, 2005, 1985, 1960] },
    ],
  },

  // ── Batch B: Crime & Justice ─────────────────────────────────────────────────
  'fraud': {
    topic: 'Fraud',
    slug: 'fraud',
    href: '/fraud',
    colour: '#E63946',
    preposition: 'with',
    metrics: [
      { label: 'Estimated fraud offences', value: '3.8M', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '41% of all crime', sparklineData: [2.5, 3.2, 3.4, 3.6, 3.8, 4.1, 4.5, 3.7, 3.5, 3.8] },
      { label: 'Fraud conviction rate', value: '~1%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'of reported cases', sparklineData: [3.1, 2.8, 2.5, 2.2, 1.9, 1.5, 1.2, 1.0, 0.8, 1.0] },
    ],
  },
  'rape-prosecution': {
    topic: 'Rape Prosecution',
    slug: 'rape-prosecution',
    href: '/rape-prosecution',
    colour: '#E63946',
    preposition: 'of',
    metrics: [
      { label: 'Rape charge rate', value: '2.9%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down from 7.5% in 2015', sparklineData: [7.5, 5.6, 4.2, 3.0, 1.6, 1.4, 1.3, 2.1, 2.5, 2.9] },
      { label: 'Reported rape offences', value: '68,400', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'doubled since 2015', sparklineData: [34292, 41186, 53977, 58657, 58856, 55130, 63136, 70633, 67125, 68400] },
    ],
  },
  'county-lines': {
    topic: 'County Lines',
    slug: 'county-lines',
    href: '/county-lines',
    colour: '#6B7280',
    preposition: 'in',
    metrics: [
      { label: 'Children exploited (NRM referrals)', value: '10,200', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 4,000 in 2017', sparklineData: [4000, 5500, 7000, 6300, 7400, 8200, 9100, 10200] },
      { label: 'Estimated active lines', value: '~700', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down from peak of 2,000', sparklineData: [2000, 1500, 1300, 800, 600, 660, 720, 700] },
    ],
  },
  'stalking': {
    topic: 'Stalking',
    slug: 'stalking',
    href: '/stalking',
    colour: '#E63946',
    preposition: 'of',
    metrics: [
      { label: 'Recorded stalking offences', value: '131,000', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '33x increase since 2015', sparklineData: [3900, 10200, 20600, 31800, 48800, 79000, 94000, 107000, 120000, 131000] },
      { label: 'Stalking charge rate', value: '2.5%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down from 8.2% in 2015', sparklineData: [8.2, 6.5, 5.1, 4.3, 3.8, 3.2, 2.9, 2.6, 2.4, 2.5] },
    ],
  },
  'family-courts': {
    topic: 'Family Courts',
    slug: 'family-courts',
    href: '/family-courts',
    colour: '#6B7280',
    preposition: 'in',
    metrics: [
      { label: 'Outstanding family court cases', value: '62,400', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up 64% from 2015', sparklineData: [38000, 37200, 36800, 37500, 39100, 48200, 54300, 56800, 60200, 62400] },
      { label: 'Average weeks to disposal', value: '50', unit: 'weeks', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'doubled since 2015', sparklineData: [24, 25, 27, 30, 32, 41, 45, 46, 48, 50] },
    ],
  },
  'youth-violence': {
    topic: 'Youth Violence',
    slug: 'youth-violence',
    href: '/youth-violence',
    colour: '#E63946',
    preposition: 'of',
    metrics: [
      { label: 'Hospital admissions for assault (under-25)', value: '7,100', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'highest since 2012', sparklineData: [5820, 5300, 5960, 6400, 6100, 4200, 5500, 6300, 6800, 7100] },
      { label: 'Serious youth violence offences', value: '28,500', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up 57% since 2015', sparklineData: [18200, 19500, 22100, 24800, 25400, 20100, 23300, 26200, 27800, 28500] },
    ],
  },
  'cybercrime': {
    topic: 'Cybercrime',
    slug: 'cybercrime',
    href: '/cybercrime',
    colour: '#6B7280',
    preposition: 'in',
    metrics: [
      { label: 'Computer misuse offences', value: '1.9M', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'CSEW estimate', sparklineData: [1.1, 1.34, 1.48, 1.58, 1.7, 2.1, 1.89, 1.62, 1.74, 1.9] },
      { label: 'Prosecutions', value: '870', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down from 1,240 in 2015', sparklineData: [1240, 1180, 1020, 960, 890, 620, 710, 780, 820, 870] },
    ],
  },
  'miscarriages-of-justice': {
    topic: 'Miscarriages of Justice',
    slug: 'miscarriages-of-justice',
    href: '/miscarriages-of-justice',
    colour: '#6B7280',
    preposition: 'of',
    metrics: [
      { label: 'CCRC applications per year', value: '1,380', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'broadly stable since 2015', sparklineData: [1472, 1512, 1415, 1438, 1402, 1214, 1337, 1410, 1356, 1380] },
      { label: 'Cases referred to Court of Appeal', value: '33', direction: 'flat' as const, polarity: 'up-is-good' as const, context: '~2% referral rate', sparklineData: [32, 28, 27, 34, 30, 22, 25, 31, 29, 33] },
    ],
  },
  'victims-support': {
    topic: "Victims' Support",
    slug: 'victims-support',
    href: '/victims-support',
    colour: '#264653',
    preposition: 'for',
    metrics: [
      { label: 'Victim satisfaction', value: '56.5%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down from 73% in 2015', sparklineData: [73.2, 71.8, 70.5, 68.1, 66.3, 64.0, 61.5, 59.2, 57.8, 56.5] },
      { label: 'Kept adequately informed', value: '44.1%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down from 62.5% in 2015', sparklineData: [62.5, 60.2, 58.8, 56.1, 54.0, 51.3, 49.5, 47.2, 45.8, 44.1] },
    ],
  },
  'border-security': {
    topic: 'Border Security',
    slug: 'border-security',
    href: '/border-security',
    colour: '#264653',
    preposition: 'in',
    metrics: [
      { label: 'Small boat arrivals', value: '36,816', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up 25% on 2023', sparklineData: [299, 1843, 8466, 28526, 45755, 29437, 36816] },
      { label: 'Asylum decision backlog', value: '98,600', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down from 175K peak', sparklineData: [38200, 42100, 52400, 76900, 132400, 175400, 118300, 98600] },
    ],
  },

  // ── Batch C: Housing & Economy ───────────────────────────────────────────────
  'empty-homes': {
    topic: 'Empty Homes',
    slug: 'empty-homes',
    href: '/empty-homes',
    colour: '#F4A261',
    preposition: 'with',
    metrics: [
      { label: 'Total empty homes in England', value: '700K', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Equivalent to housing stock of Greater Manchester', sparklineData: [590, 605, 617, 630, 648, 665, 678, 689, 700] },
      { label: 'Long-term empty (6+ months)', value: '261K', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Up 27% since 2016', sparklineData: [205, 210, 216, 225, 232, 245, 250, 258, 261] },
    ],
  },
  'leasehold': {
    topic: 'Leasehold',
    slug: 'leasehold',
    href: '/leasehold',
    colour: '#F4A261',
    preposition: 'with',
    metrics: [
      { label: 'Leasehold homes in England & Wales', value: '4.98M', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '~1 in 5 homes; 36% of London homes are leasehold', sparklineData: [4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 4.98] },
      { label: 'Ground rent & service charge complaints', value: '10,800', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Tripled since 2015', sparklineData: [3200, 3800, 5100, 6400, 7200, 8100, 9300, 10200, 10800] },
    ],
  },
  'building-safety': {
    topic: 'Building Safety',
    slug: 'building-safety',
    href: '/building-safety',
    colour: '#E63946',
    preposition: 'with',
    metrics: [
      { label: 'Buildings with unsafe cladding identified', value: '5,412', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'True total likely higher; 40% in London', sparklineData: [457, 1650, 3120, 4630, 5120, 5340, 5412] },
      { label: 'Remediation completed', value: '1,780', direction: 'up' as const, polarity: 'up-is-good' as const, context: '33% completion rate; ~300K households affected', sparklineData: [15, 128, 340, 612, 1015, 1420, 1780] },
    ],
  },
  'regional-inequality': {
    topic: 'Regional Inequality',
    slug: 'regional-inequality',
    href: '/regional-inequality',
    colour: '#6B7280',
    preposition: 'with',
    metrics: [
      { label: 'London GVA per head (UK = 100)', value: '178', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Gap widening since 2015; North East: 65', sparklineData: [170, 172, 173, 174, 175, 168, 172, 176, 178] },
      { label: 'Healthy life expectancy gap (richest vs poorest)', value: '21 yrs', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Poorest decile: 49.5 yrs; richest: 70.4 yrs', sparklineData: [18.6, 18.7, 19.0, 19.4, 19.7, 19.9, 20.3, 20.7, 20.9] },
    ],
  },
  'small-business': {
    topic: 'Small Business',
    slug: 'small-business',
    href: '/small-business',
    colour: '#F4A261',
    preposition: 'for',
    metrics: [
      { label: 'Company insolvencies (England & Wales)', value: '27,500', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Highest in 30+ years; up 88% on 2019', sparklineData: [14630, 15520, 15080, 16090, 17200, 12550, 14150, 22100, 25158, 27500] },
      { label: 'Five-year business survival rate', value: '38.2%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'Down from 44% in 2015', sparklineData: [44.1, 43.2, 42.5, 42.0, 41.6, 40.8, 39.9, 39.4, 38.7, 38.2] },
    ],
  },
  'tax-evasion': {
    topic: 'Tax Evasion',
    slug: 'tax-evasion',
    href: '/tax-evasion',
    colour: '#E63946',
    preposition: 'with',
    metrics: [
      { label: 'UK tax gap', value: '\u00a339.8bn', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '4.8% of tax liabilities; exceeds entire policing budget', sparklineData: [33, 33, 33, 35, 35, 32, 36, 36, 39.8] },
      { label: 'Criminal prosecutions for tax fraud', value: '~320', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'Down 70%+ from 1,165 in 2014/15', sparklineData: [1165, 1020, 870, 730, 620, 510, 420, 380, 320] },
    ],
  },
  'adult-education': {
    topic: 'Adult Education',
    slug: 'adult-education',
    href: '/adult-education',
    colour: '#2A9D8F',
    preposition: 'in',
    metrics: [
      { label: 'Adult learning participation rate', value: '15.4%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'Down from 20% in 2015', sparklineData: [20.1, 19.4, 18.7, 17.3, 17.0, 14.2, 15.5, 16.1, 15.8, 15.4] },
      { label: 'FE enrolments', value: '2.3M', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'Down 30% from 3.3M in 2015', sparklineData: [3.3, 3.1, 2.9, 2.8, 2.7, 2.4, 2.5, 2.5, 2.4, 2.3] },
    ],
  },
  'racial-inequality': {
    topic: 'Racial Inequality',
    slug: 'racial-inequality',
    href: '/racial-inequality',
    colour: '#E63946',
    preposition: 'with',
    metrics: [
      { label: 'Aggregate ethnic pay gap', value: '5.1%', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'Bangladeshi gap: 20%; Pakistani: 16%', sparklineData: [5.6, 5.7, 5.8, 5.7, 5.8, 5.6, 5.4, 5.3, 5.2, 5.1] },
      { label: 'Black:White unemployment ratio', value: '2.0x', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'Barely changed in 30 years', sparklineData: [2.3, 2.2, 2.1, 2.1, 2.0, 2.4, 2.2, 2.1, 2.1, 2.0] },
    ],
  },
  'trade-unions': {
    topic: 'Trade Unions',
    slug: 'trade-unions',
    href: '/trade-unions',
    colour: '#264653',
    preposition: 'with',
    metrics: [
      { label: 'Trade union members', value: '6.73M', direction: 'up' as const, polarity: 'up-is-good' as const, context: '23% of employees; peak: 13.2M in 1979', sparklineData: [6.50, 6.23, 6.23, 6.35, 6.44, 6.56, 6.55, 6.54, 6.67, 6.73] },
      { label: 'Working days lost to strikes (2023)', value: '3.87M', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Highest since 1989', sparklineData: [170, 322, 276, 273, 234, 231, 390, 2470, 3872, 1840] },
    ],
  },
  'self-employment': {
    topic: 'Self-Employment',
    slug: 'self-employment',
    href: '/self-employment',
    colour: '#F4A261',
    preposition: 'with',
    metrics: [
      { label: 'Self-employed workers', value: '4.29M', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'Down from 4.93M peak in 2019', sparklineData: [4.77, 4.80, 4.86, 4.85, 4.93, 4.31, 4.25, 4.24, 4.26, 4.29] },
      { label: 'Median weekly earnings (self-employed)', value: '\u00a3310', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'Employees: \u00a3535/wk; 42% earnings gap', sparklineData: [280, 275, 285, 290, 300, 256, 275, 290, 300, 310] },
    ],
  },

  // ── Batch D: Environment & Infrastructure ────────────────────────────────────
  'soil-health': {
    topic: 'Soil Health',
    slug: 'soil-health',
    href: '/soil-health',
    colour: '#2A9D8F',
    preposition: 'in',
    metrics: [
      { label: 'Degraded agricultural soils', value: '17%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Up from 12% in 2010', sparklineData: [12, 12.8, 13.5, 14.3, 15.1, 15.9, 16.4, 17] },
      { label: 'Arable soils with low organic carbon', value: '45%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Based on early DEFRA monitoring data', sparklineData: [38, 39, 41, 42, 43, 45] },
    ],
  },
  'marine-environment': {
    topic: 'Marine Environment',
    slug: 'marine-environment',
    href: '/marine-environment',
    colour: '#264653',
    preposition: 'in the',
    metrics: [
      { label: 'Fish stocks at sustainable levels', value: '49%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'Down from 57% in 2016', sparklineData: [48, 51, 55, 57, 54, 53, 51, 49] },
      { label: 'MPAs in favourable condition', value: '36%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'Down from 44% in 2016; bottom trawling in 90% of offshore MPAs', sparklineData: [44, 42, 40, 38, 36] },
    ],
  },
  'pothole-roads': {
    topic: 'Pothole Roads',
    slug: 'pothole-roads',
    href: '/pothole-roads',
    colour: '#F4A261',
    preposition: 'on',
    metrics: [
      { label: 'Road maintenance backlog', value: '\u00a316.3bn', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Up 63% from \u00a310bn in 2015', sparklineData: [10, 10.5, 11.2, 11.8, 12.3, 12.7, 13.2, 14, 14.8, 16.3] },
      { label: 'RAC pothole breakdowns (2023)', value: '29,377', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Highest since tracking began in 2006', sparklineData: [18200, 19100, 21300, 23400, 24800, 26100, 27900, 29377] },
    ],
  },
  'post-offices': {
    topic: 'Post Offices',
    slug: 'post-offices',
    href: '/post-offices',
    colour: '#6B7280',
    preposition: 'at',
    metrics: [
      { label: 'Post office branches remaining', value: '11,180', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'Down from 18,390 in 2000 — a 39% decline', sparklineData: [18390, 14376, 12009, 11737, 11634, 11547, 11416, 11302, 11180] },
      { label: 'Rural population more than 3 miles from branch', value: '15%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Up from 7% in 2010; Scotland and Wales worst affected', sparklineData: [7, 9, 11, 12, 14, 15] },
    ],
  },
  'energy-efficiency': {
    topic: 'Energy Efficiency',
    slug: 'energy-efficiency',
    href: '/energy-efficiency',
    colour: '#2A9D8F',
    preposition: 'in',
    metrics: [
      { label: 'Homes rated EPC C or above', value: '49%', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'Up from 14% in 2012; target: 100% by 2035', sparklineData: [14, 19, 28, 34, 40, 46, 49] },
      { label: 'Homes still rated EPC D or below', value: '12.7M', direction: 'down' as const, polarity: 'up-is-bad' as const, context: '3.2M at EPC E, F or G — the worst categories', sparklineData: [17.1, 16.2, 15.4, 14.6, 13.8, 13.2, 12.7] },
    ],
  },
  'plastic-pollution': {
    topic: 'Plastic Pollution',
    slug: 'plastic-pollution',
    href: '/plastic-pollution',
    colour: '#264653',
    preposition: 'from',
    metrics: [
      { label: 'Plastic waste generated per year', value: '5.6M tonnes', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '84kg per person — 2nd highest globally after the US', sparklineData: [4.7, 4.9, 5.1, 5.3, 5.5, 5.6] },
      { label: 'Plastic recycling rate', value: '44%', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'Stalled for a decade; 46% of "recycled" plastic is exported', sparklineData: [44, 44, 46, 43, 44, 44] },
    ],
  },
  'trees-and-forests': {
    topic: 'Trees & Forests',
    slug: 'trees-and-forests',
    href: '/trees-and-forests',
    colour: '#2A9D8F',
    preposition: 'in',
    metrics: [
      { label: 'New trees planted in England (2024/25)', value: '7,164 ha', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'highest in 20+ years · up 156% since 2021/22', sparklineData: [2800, 2100, 2400, 3200, 3600, 4200, 3800, 4540, 7164] },
      { label: 'UK woodland cover', value: '13.2%', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'European average: 38%; target: 16.5% by 2050', sparklineData: [12, 12.2, 12.4, 12.6, 12.8, 13, 13.1, 13.2] },
    ],
  },
  'public-toilets': {
    topic: 'Public Toilets',
    slug: 'public-toilets',
    href: '/public-toilets',
    colour: '#6B7280',
    preposition: 'with',
    metrics: [
      { label: 'Council-run public toilets (England)', value: '2,350', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'Down from 5,600 in 2000 — a 58% decline', sparklineData: [5600, 4800, 4200, 3900, 3570, 3290, 3010, 2780, 2610, 2480, 2350] },
      { label: 'Over-65s who limit outings due to lack of toilets', value: '36%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Age UK 2023 survey', sparklineData: [25, 28, 30, 33, 35, 36] },
    ],
  },
  'water-infrastructure': {
    topic: 'Water Infrastructure',
    slug: 'water-infrastructure',
    href: '/water-infrastructure',
    colour: '#264653',
    preposition: 'in',
    metrics: [
      { label: 'Water lost to leakage per day', value: '2,780 ML', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'Down 17% since 2010 but progress has stalled; 20% of supply', sparklineData: [3360, 3240, 3110, 3070, 3020, 2923, 2830, 2780] },
      { label: 'Annual infrastructure investment gap', value: '\u00a37.8bn', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Growing gap between actual spending and estimated need', sparklineData: [4.2, 4.8, 5.6, 6.3, 7.1, 7.8] },
    ],
  },
  'noise-pollution': {
    topic: 'Noise Pollution',
    slug: 'noise-pollution',
    href: '/noise-pollution',
    colour: '#F4A261',
    preposition: 'from',
    metrics: [
      { label: 'People exposed to harmful road noise', value: '9.7M', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Above WHO 55 dB threshold; up from 8.3M in 2012', sparklineData: [8.3, 8.5, 8.9, 9.2, 9.5, 9.7] },
      { label: 'Noise complaints (2024)', value: '395,000', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Still 20% above 2014 levels', sparklineData: [330, 345, 365, 410, 435, 420, 405, 395] },
    ],
  },

  // ── Batch E: Society & Care ──────────────────────────────────────────────────
  'kinship-care': {
    topic: 'Kinship Care',
    slug: 'kinship-care',
    href: '/kinship-care',
    colour: '#264653',
    preposition: 'in',
    metrics: [
      { label: 'Children in kinship care', value: '162K', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up 26% since 2019', sparklineData: [128, 135, 142, 150, 158, 162] },
      { label: 'Kinship carers receiving support', value: '31%', direction: 'down' as const, polarity: 'up-is-good' as const, context: '69% receive no financial support', sparklineData: [45, 42, 40, 37, 34, 31] },
    ],
  },
  'foster-care': {
    topic: 'Foster Care',
    slug: 'foster-care',
    href: '/foster-care',
    colour: '#264653',
    preposition: 'in',
    metrics: [
      { label: 'Foster carer households', value: '40,500', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down 11% since 2015', sparklineData: [45.5, 44.6, 43.9, 43.5, 42.8, 42.1, 41.3, 40.5] },
      { label: 'Children with 3+ placements per year', value: '12.4%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 9.2% in 2015', sparklineData: [9.2, 9.8, 10.5, 10.9, 11.6, 12.0, 12.4] },
    ],
  },
  'adoption': {
    topic: 'Adoption',
    slug: 'adoption',
    href: '/adoption',
    colour: '#2A9D8F',
    preposition: 'in',
    metrics: [
      { label: 'Adoption orders (England)', value: '2,950', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down 45% from 5,360 peak in 2015', sparklineData: [5360, 4690, 4350, 3570, 2870, 2960, 2950] },
      { label: 'Average wait (care to adoption)', value: '538 days', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'target: 426 days', sparklineData: [487, 498, 512, 520, 558, 574, 546, 538] },
    ],
  },
  'judicial-diversity': {
    topic: 'Judicial Diversity',
    slug: 'judicial-diversity',
    href: '/judicial-diversity',
    colour: '#6B7280',
    preposition: 'in',
    metrics: [
      { label: 'Women judges (all courts)', value: '35.4%', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up from 25% in 2015', sparklineData: [25.2, 28.4, 31.0, 33.6, 34.8, 35.4] },
      { label: 'Ethnic minority judges', value: '9.8%', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'population: 18% non-white', sparklineData: [6.1, 6.9, 7.6, 8.5, 9.1, 9.8] },
    ],
  },
  'press-freedom': {
    topic: 'Press Freedom',
    slug: 'press-freedom',
    href: '/press-freedom',
    colour: '#6B7280',
    preposition: 'in',
    metrics: [
      { label: 'UK press freedom ranking', value: '23rd', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'of 180 countries; was 40th in 2017', sparklineData: [34, 38, 40, 33, 35, 33, 24, 26, 23] },
      { label: 'Local newspapers closed since 2009', value: '320', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '58% of areas have no local reporter', sparklineData: [120, 190, 255, 300, 310, 320] },
    ],
  },
  'sport-participation': {
    topic: 'Sport Participation',
    slug: 'sport-participation',
    href: '/sport-participation',
    colour: '#2A9D8F',
    preposition: 'in',
    metrics: [
      { label: 'Adults meeting activity guidelines', value: '63.5%', direction: 'flat' as const, polarity: 'up-is-good' as const, context: '150+ min/week; barely changed since 2016', sparklineData: [61.8, 62.6, 63.3, 61.4, 60.9, 63.1, 63.7, 63.5] },
      { label: 'Inactive adults (<30 min/week)', value: '25.4%', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: '1 in 4 adults; peaked at 27.5% in 2021', sparklineData: [25.7, 25.0, 24.6, 27.1, 27.5, 25.6, 25.0, 25.4] },
    ],
  },
  'volunteering': {
    topic: 'Volunteering',
    slug: 'volunteering',
    href: '/volunteering',
    colour: '#2A9D8F',
    preposition: 'in',
    metrics: [
      { label: 'Adults volunteering monthly', value: '20%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down from 27% in 2015', sparklineData: [27.0, 24.8, 23.1, 17.2, 16.3, 19.4, 20.1] },
      { label: 'Charity sector income (real terms)', value: '\u00a354.8bn', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'stagnated while demand surges', sparklineData: [54.2, 55.8, 57.0, 51.3, 53.8, 55.2, 54.8] },
    ],
  },
  'nhs-race-inequality': {
    topic: 'NHS Race Inequality',
    slug: 'nhs-race-inequality',
    href: '/nhs-race-inequality',
    colour: '#E63946',
    preposition: 'in',
    metrics: [
      { label: 'Black maternal mortality disparity', value: '3.4\u00d7', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'relative to white women', sparklineData: [4.1, 4.3, 3.9, 3.7, 4.0, 3.7, 3.5, 3.4] },
      { label: 'Ethnic minority senior NHS leaders', value: '10.5%', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'vs 24.8% of all staff', sparklineData: [7.4, 8.1, 9.0, 9.3, 9.7, 10.1, 10.5] },
    ],
  },
  'rent-arrears': {
    topic: 'Rent Arrears',
    slug: 'rent-arrears',
    href: '/rent-arrears',
    colour: '#E63946',
    preposition: 'in',
    metrics: [
      { label: 'Renters in arrears', value: '14.1%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'highest on record; ~1.3M households', sparklineData: [8.5, 7.8, 8.6, 10.4, 11.1, 12.3, 13.2, 14.1] },
      { label: 'Possession claims', value: '164,200', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'surpassed pre-pandemic level', sparklineData: [153200, 142800, 136200, 72400, 89600, 128400, 155800, 164200] },
    ],
  },
  'food-production': {
    topic: 'Food Production',
    slug: 'food-production',
    href: '/food-production',
    colour: '#2A9D8F',
    preposition: 'in',
    metrics: [
      { label: 'UK food self-sufficiency', value: '57.8%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down from 78% in 1984', sparklineData: [61.2, 60.5, 60.7, 60.2, 59.6, 58.8, 58.2, 57.8] },
      { label: 'Farm workforce', value: '380K', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down 30% since 2000; avg age 60', sparklineData: [480, 440, 410, 400, 395, 390, 385, 380] },
    ],
  },
  'executive-pay': {
    topic: 'Executive Pay',
    slug: 'executive-pay',
    href: '/executive-pay',
    colour: '#E63946',
    preposition: 'with',
    metrics: [
      { label: 'FTSE 100 CEO average pay', value: '£3.9M', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '118× the median UK worker salary', sparklineData: [1.8, 2.1, 2.5, 2.8, 3.0, 3.2, 3.6, 3.9] },
      { label: 'CEO-to-worker pay ratio', value: '118×', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 47× in 2000', sparklineData: [47, 55, 65, 75, 85, 95, 108, 118] },
      { label: 'Companies with pay rebellion', value: '32%', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up from 8 in 2015', sparklineData: [8, 10, 12, 14, 17, 20, 26, 32] },
    ],
  },
  'national-debt': {
    topic: 'National Debt',
    slug: 'national-debt',
    href: '/national-debt',
    colour: '#6B7280',
    preposition: 'with',
    metrics: [
      { label: 'Debt as % of GDP', value: '98.8%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'highest since the 1960s', sparklineData: [42, 52, 62, 70, 76, 84, 87, 99] },
      { label: 'Annual debt interest', value: '£112bn', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'more than the defence budget', sparklineData: [42, 45, 48, 50, 52, 60, 88, 112] },
      { label: 'Interest as % of tax revenue', value: '11.6%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '£1 in every £9 of tax', sparklineData: [6.5, 7.0, 7.5, 7.8, 7.5, 7.2, 10.5, 11.6] },
    ],
  },
  'gig-economy': {
    topic: 'Gig Economy',
    slug: 'gig-economy',
    href: '/gig-economy',
    colour: '#F4A261',
    preposition: 'in the',
    metrics: [
      { label: 'Estimated gig workers', value: '4.4M', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'no sick pay, pension, or guaranteed hours', sparklineData: [2.8, 3.1, 3.4, 3.6, 3.8, 4.0, 4.2, 4.4] },
      { label: 'Earning below min wage after costs', value: '38%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'after vehicle, fuel, equipment costs', sparklineData: [28, 30, 32, 33, 35, 36, 37, 38] },
      { label: 'Gig workers with pension', value: '9%', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'vs 76% of employees', sparklineData: [7, 8, 8, 8, 9, 9, 9, 9] },
    ],
  },
  'living-wage': {
    topic: 'Living Wage',
    slug: 'living-wage',
    href: '/living-wage',
    colour: '#2A9D8F',
    preposition: 'with',
    metrics: [
      { label: 'Workers below Real Living Wage', value: '3.8M', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down from 5.8M in 2015', sparklineData: [5.8, 5.5, 5.1, 4.8, 4.4, 4.1, 3.9, 3.8] },
      { label: 'National Living Wage 2024', value: '£11.44/hr', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up from £7.20 in 2016', sparklineData: [7.20, 7.50, 7.83, 8.21, 8.72, 9.50, 10.42, 11.44] },
      { label: 'Real Living Wage employers', value: '15,000+', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'covering 460,000 workers', sparklineData: [1000, 2000, 3500, 5200, 7000, 9500, 12000, 15000] },
    ],
  },
  'in-work-poverty': {
    topic: 'In-Work Poverty',
    slug: 'in-work-poverty',
    href: '/in-work-poverty',
    colour: '#E63946',
    preposition: 'with',
    metrics: [
      { label: 'People in working poverty', value: '8.1M', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 4.5M in 2005', sparklineData: [4.5, 5.0, 5.6, 6.2, 6.7, 7.2, 7.8, 8.1] },
      { label: 'Working households in poverty', value: '60%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 45% in 1997', sparklineData: [45, 47, 50, 53, 55, 57, 59, 60] },
      { label: 'Working single parents in poverty', value: '42%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'despite employment', sparklineData: [31, 33, 35, 36, 38, 39, 41, 42] },
    ],
  },
  'skills-shortage': {
    topic: 'Skills Shortage',
    slug: 'skills-shortage',
    href: '/skills-shortage',
    colour: '#F4A261',
    preposition: 'with',
    metrics: [
      { label: 'Hard-to-fill vacancies', value: '2.4M', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 0.8M in 2015', sparklineData: [0.8, 0.9, 1.0, 1.2, 1.5, 1.8, 2.1, 2.4] },
      { label: 'Employers reporting skills gaps', value: '80%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'stubbornly elevated post-pandemic', sparklineData: [62, 65, 67, 69, 71, 73, 77, 80] },
      { label: 'Annual cost to economy', value: '£6.6bn', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'recruitment, training, temp staff costs', sparklineData: [3.8, 4.1, 4.4, 4.8, 5.2, 5.6, 6.0, 6.6] },
    ],
  },
  'food-inflation': {
    topic: 'Food Inflation',
    slug: 'food-inflation',
    href: '/food-inflation',
    colour: '#E63946',
    preposition: 'with',
    metrics: [
      { label: 'Peak food inflation (March 2023)', value: '19.2%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'highest in 45 years', sparklineData: [2.5, 2.8, 1.8, 2.2, 4.2, 11.8, 19.2, 4.0] },
      { label: 'Average household food bill rise', value: '£700', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '2022–23 vs pre-crisis', sparklineData: [0, 50, 100, 150, 250, 450, 650, 700] },
      { label: 'Adults experiencing food insecurity', value: '7.3M', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'skipping meals, reducing portions', sparklineData: [3.5, 3.8, 4.2, 4.9, 5.5, 6.2, 7.0, 7.3] },
    ],
  },
  'housing-benefit': {
    topic: 'Housing Benefit',
    slug: 'housing-benefit',
    href: '/housing-benefit',
    colour: '#6B7280',
    preposition: 'in',
    metrics: [
      { label: 'LHA-to-rent shortfall (pre-2024)', value: '£190/mo', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'inner London shortfall exceeded £500/mo', sparklineData: [0, 10, 30, 60, 90, 130, 160, 190] },
      { label: 'Housing benefit recipients (private)', value: '1.6M', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 1.2M in 2016', sparklineData: [1200, 1250, 1300, 1380, 1450, 1500, 1550, 1600] },
      { label: 'Households at eviction risk', value: '186,000', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '2023 — due to LHA shortfall', sparklineData: [20000, 40000, 65000, 90000, 120000, 150000, 170000, 186000] },
    ],
  },
  'pension-deficits': {
    topic: 'Pensions',
    slug: 'pension-deficits',
    href: '/pension-deficits',
    colour: '#F4A261',
    preposition: 'with',
    metrics: [
      { label: 'Workers without workplace pension', value: '14M', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down from 22M in 2012', sparklineData: [22, 20, 18, 16, 14, 13, 13, 14] },
      { label: 'State pension as % of earnings', value: '28%', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'OECD average is 50%', sparklineData: [26, 26, 27, 27, 28, 28, 28, 28] },
      { label: 'Pension participation (auto-enrolled)', value: '88%', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up from 47% in 2012', sparklineData: [47, 58, 68, 74, 79, 83, 86, 88] },
    ],
  },
  'rewilding': {
    topic: 'Rewilding',
    slug: 'rewilding',
    href: '/rewilding',
    colour: '#2A9D8F',
    preposition: 'in',
    metrics: [
      { label: 'Land meeting 30x30 standard', value: '3.2%', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'target 30% by 2030', sparklineData: [2.5, 2.6, 2.7, 2.8, 2.9, 3.0, 3.1, 3.2] },
      { label: 'UK species in long-term decline', value: '41%', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'since 1970 — State of Nature 2023', sparklineData: [26, 28, 30, 33, 35, 37, 39, 41] },
    ],
  },
  'solar-power': {
    topic: 'Solar Power',
    slug: 'solar-power',
    href: '/solar-power',
    colour: '#F4A261',
    preposition: 'in',
    metrics: [
      { label: 'Installed solar capacity', value: '15.8 GW', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'target 70 GW by 2035', sparklineData: [4.7, 6.2, 8.1, 10.4, 11.8, 13.0, 14.2, 15.8] },
      { label: 'Solar share of annual electricity', value: '5%', direction: 'up' as const, polarity: 'up-is-good' as const, context: '30%+ on peak summer days', sparklineData: [2, 2.5, 3, 3.8, 4.2, 4.6, 4.9, 5] },
    ],
  },
  'onshore-wind': {
    topic: 'Onshore Wind',
    slug: 'onshore-wind',
    href: '/onshore-wind',
    colour: '#2A9D8F',
    preposition: 'in',
    metrics: [
      { label: 'England onshore wind capacity', value: '2.4 GW', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'flatlined — 8-year planning ban', sparklineData: [2.1, 2.2, 2.3, 2.3, 2.3, 2.4, 2.4, 2.4] },
      { label: 'UK total onshore wind', value: '15.9 GW', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'target 35 GW by 2030', sparklineData: [8.7, 10.3, 11.8, 13.0, 14.1, 14.9, 15.4, 15.9] },
    ],
  },
  'electric-vehicles': {
    topic: 'Electric Vehicles',
    slug: 'electric-vehicles',
    href: '/electric-vehicles',
    colour: '#2A9D8F',
    preposition: 'in',
    metrics: [
      { label: 'BEV share of new car sales', value: '16.5%', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'ZEV mandate: 80% by 2030', sparklineData: [0.5, 0.7, 1.6, 3.1, 7.4, 11.6, 14.8, 16.5] },
      { label: 'EVs per public charger', value: '54', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'target: 10 per charger', sparklineData: [8, 12, 16, 22, 32, 45, 50, 54] },
    ],
  },
  'aviation-emissions': {
    topic: 'Aviation Emissions',
    slug: 'aviation-emissions',
    href: '/aviation-emissions',
    colour: '#E63946',
    preposition: 'from',
    metrics: [
      { label: 'Aviation share of UK climate impact', value: '7.5%', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'more than all buses and trains', sparklineData: [7.1, 7.2, 7.3, 7.4, 7.5, 2.9, 3.8, 6.8, 7.5] },
      { label: 'Annual aviation tax exemption', value: '£7bn', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'no fuel duty, no VAT on intl flights', sparklineData: [5.5, 5.8, 6.0, 6.3, 6.5, 6.7, 6.9, 7.0] },
    ],
  },
  'peatlands': {
    topic: 'Peatlands',
    slug: 'peatlands',
    href: '/peatlands',
    colour: '#2A9D8F',
    preposition: 'in',
    metrics: [
      { label: 'Peatlands in degraded state', value: '80%', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: '23M tonnes CO₂ emitted annually', sparklineData: [83, 83, 82, 82, 81, 81, 80, 80] },
      { label: 'Peatland restored since 2020', value: '35,000 ha', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'target 250,000 ha by 2030', sparklineData: [0, 5000, 12000, 20000, 28000, 35000] },
    ],
  },
  'food-waste': {
    topic: 'Food Waste',
    slug: 'food-waste',
    href: '/food-waste',
    colour: '#F4A261',
    preposition: 'with',
    metrics: [
      { label: 'Total food waste per year', value: '9.5M tonnes', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'worth £19bn — barely declining', sparklineData: [10.2, 10.0, 9.8, 9.6, 9.4, 9.5, 9.5, 9.5] },
      { label: 'Cost per household', value: '£700/yr', direction: 'down' as const, polarity: 'up-is-bad' as const, context: '50% of wasted food still edible', sparklineData: [760, 740, 720, 710, 700, 700, 700, 700] },
    ],
  },
  'chalk-streams': {
    topic: 'Chalk Streams',
    slug: 'chalk-streams',
    href: '/chalk-streams',
    colour: '#264653',
    preposition: 'in',
    metrics: [
      { label: 'In good ecological status', value: '5%', direction: 'flat' as const, polarity: 'up-is-good' as const, context: '95% failing — England holds 85% of world total', sparklineData: [8, 7, 6.5, 6, 5.5, 5.5, 5, 5] },
      { label: 'Sewage discharges (2022)', value: '12,000+', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'on chalk stream catchments', sparklineData: [6000, 7000, 8500, 9800, 10800, 11500, 12000, 12000] },
    ],
  },
  'heat-pumps': {
    topic: 'Heat Pumps',
    slug: 'heat-pumps',
    href: '/heat-pumps',
    colour: '#2A9D8F',
    preposition: 'in',
    metrics: [
      { label: 'Heat pumps installed (2023)', value: '72,000', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'target: 600,000/yr by 2028', sparklineData: [35000, 40000, 43000, 49000, 55000, 60000, 65000, 72000] },
      { label: 'France installations (2023)', value: '1.6M', direction: 'up' as const, polarity: 'up-is-good' as const, context: '22× more than UK per year', sparklineData: [350000, 420000, 510000, 580000, 720000, 1100000, 1100000, 1600000] },
    ],
  },
  'green-jobs': {
    topic: 'Green Jobs',
    slug: 'green-jobs',
    href: '/green-jobs',
    colour: '#2A9D8F',
    preposition: 'in',
    metrics: [
      { label: 'Low-carbon economy jobs', value: '763K', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up from 430K in 2014', sparklineData: [430, 475, 520, 570, 610, 660, 720, 763] },
      { label: 'Green jobs in deprived areas', value: '12%', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'concentrated in South East', sparklineData: [11, 11, 11, 12, 12, 12, 12, 12] },
    ],
  },

  // ── Batch F: New topics ───────────────────────────────────────────────────
  'social-media-harm': {
    topic: 'Social Media Harm',
    slug: 'social-media-harm',
    href: '/social-media-harm',
    colour: '#E63946',
    preposition: 'from',
    metrics: [
      { label: 'Girls 11\u201315 experiencing cyberbullying', value: '40%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 22% in 2012', sparklineData: [22, 25, 28, 32, 35, 37, 39, 40] },
      { label: 'Teen girls with depression vs 2012', value: '+100%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '7% to 14%; tracks smartphone adoption', sparklineData: [7, 8, 9, 10, 11, 12, 13, 14] },
    ],
  },
  'second-homes': {
    topic: 'Second Homes',
    slug: 'second-homes',
    href: '/second-homes',
    colour: '#F4A261',
    preposition: 'with',
    metrics: [
      { label: 'Second homes in England', value: '272,000', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 178,000 in 2010; +53%', sparklineData: [178, 195, 210, 225, 238, 250, 262, 272] },
      { label: 'Short-term lets (Airbnb-style)', value: '230,000', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'barely existed before 2015', sparklineData: [50, 80, 110, 140, 160, 175, 210, 230] },
    ],
  },
  'arts-funding': {
    topic: 'Arts Funding',
    slug: 'arts-funding',
    href: '/arts-funding',
    colour: '#264653',
    preposition: 'with',
    metrics: [
      { label: 'Arts Council England budget (real terms)', value: '-36%', direction: 'down' as const, polarity: 'up-is-good' as const, context: '\u00a3700m to \u00a3520m; 14 years of decline', sparklineData: [700, 680, 650, 620, 595, 570, 545, 530] },
      { label: 'Local authority arts spending (real terms)', value: '-57%', direction: 'down' as const, polarity: 'up-is-good' as const, context: '800+ libraries closed since 2010', sparklineData: [1.4, 1.3, 1.2, 1.1, 1.0, 0.9, 0.75, 0.65] },
    ],
  },
  'public-broadcasting': {
    topic: 'Public Broadcasting',
    slug: 'public-broadcasting',
    href: '/public-broadcasting',
    colour: '#264653',
    preposition: 'in',
    metrics: [
      { label: 'BBC real-terms income loss 2022\u20132027', value: '>\u00a31bn', direction: 'down' as const, polarity: 'up-is-bad' as const, context: '2-year freeze; 11% inflation peak', sparklineData: [0, 0, 150, 300, 500, 700, 900, 1000] },
      { label: 'Licence fee evasion rate', value: '9.2%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 6% in 2015; each 1% = \u00a350m lost', sparklineData: [6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0, 9.2] },
    ],
  },
  'probation': {
    topic: 'Probation',
    slug: 'probation',
    href: '/probation',
    colour: '#6B7280',
    preposition: 'in',
    metrics: [
      { label: 'Serious Further Offences per year', value: '820', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 530 in 2015; +74%', sparklineData: [530, 560, 590, 620, 680, 730, 790, 820] },
      { label: 'Probation officer vacancy rate', value: '16%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'recommended max caseload: 35; actual: 60+', sparklineData: [8, 9, 10, 12, 14, 15, 16, 16] },
    ],
  },
  'legal-aid': {
    topic: 'Legal Aid',
    slug: 'legal-aid',
    href: '/legal-aid',
    colour: '#E63946',
    preposition: 'in',
    metrics: [
      { label: 'Legal aid spend real terms vs 2010', value: '-36%', direction: 'down' as const, polarity: 'up-is-good' as const, context: '\u00a32.1bn to \u00a31.44bn; LASPO 2012 removed categories', sparklineData: [2.1, 2.0, 1.9, 1.8, 1.7, 1.6, 1.5, 1.45] },
      { label: 'Solicitor firms with legal aid contracts', value: '1,150', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down from 2,300 in 2010; 50% market collapse', sparklineData: [2300, 2100, 1900, 1700, 1600, 1500, 1350, 1200] },
    ],
  },
  'foreign-aid': {
    topic: 'Foreign Aid',
    slug: 'foreign-aid',
    href: '/foreign-aid',
    colour: '#264653',
    preposition: 'with',
    metrics: [
      { label: 'UK ODA as % of GNI', value: '0.5%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'cut from 0.7% in 2021; \u00a34bn withdrawn', sparklineData: [0.7, 0.7, 0.7, 0.7, 0.7, 0.5, 0.5, 0.5] },
      { label: 'Aid diverted to domestic asylum costs', value: '\u00a33.5bn', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '23% of total budget; up from \u00a3300m in 2015', sparklineData: [0.5, 0.8, 1.2, 1.8, 2.5, 3.0, 3.5, 3.5] },
    ],
  },
  'military-spending': {
    topic: 'Military Spending',
    slug: 'military-spending',
    href: '/military-spending',
    colour: '#6B7280',
    preposition: 'on',
    metrics: [
      { label: 'Defence spend as % of GDP', value: '2.3%', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'above NATO 2% target; \u00a355bn/yr', sparklineData: [2.2, 2.1, 2.0, 2.0, 2.1, 2.2, 2.3, 2.3] },
      { label: 'Regular army headcount', value: '73,000', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'smallest since Napoleonic Wars; down from 178K in 2010', sparklineData: [178000, 165000, 150000, 140000, 132000, 130000, 127000, 73000] },
    ],
  },
  'cycling-infrastructure': {
    topic: 'Cycling Infrastructure',
    slug: 'cycling-infrastructure',
    href: '/cycling-infrastructure',
    colour: '#2A9D8F',
    preposition: 'in',
    metrics: [
      { label: 'Cycling share of trips (England)', value: '2.2%', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'barely moved since 2015; Netherlands: 27%', sparklineData: [1.8, 1.9, 2.0, 2.1, 2.2, 2.5, 2.3, 2.2] },
      { label: 'Protected cycle lane miles (England)', value: '680', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up from 300 miles in 2015; Netherlands: 21,000 miles', sparklineData: [300, 350, 400, 460, 520, 600, 650, 680] },
    ],
  },
  'civil-liberties': {
    topic: 'Civil Liberties',
    slug: 'civil-liberties',
    href: '/civil-liberties',
    colour: '#6B7280',
    preposition: 'with',
    metrics: [
      { label: 'CCTV cameras per 1,000 population', value: '75', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '5.2M total; 1 per 13 people; highest of any democracy', sparklineData: [45, 50, 55, 58, 62, 66, 70, 75] },
      { label: 'Police stop and search per 1,000', value: '16', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Black people 7x more likely; rising since 2019', sparklineData: [25, 20, 14, 11, 9, 10, 13, 16] },
    ],
  },

  // ── Batch G: 10 new topics ────────────────────────────────────────────────
  'evictions': {
    topic: 'Evictions',
    slug: 'evictions',
    href: '/evictions',
    colour: '#E63946',
    preposition: 'with',
    metrics: [
      { label: 'Section 21 notices served (2023)', value: '25,000+', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'At highest since 2017; up from 8K in COVID moratorium', sparklineData: [18000, 20000, 19000, 17000, 8000, 16000, 22000, 25000] },
      { label: 'Households made homeless via eviction', value: '24,000', unit: '/yr', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '58% have dependent children', sparklineData: [12000, 13500, 15200, 17100, 7200, 14600, 20300, 24000] },
    ],
  },
  'land-banking': {
    topic: 'Land Banking',
    slug: 'land-banking',
    href: '/land-banking',
    colour: '#F4A261',
    preposition: 'with',
    metrics: [
      { label: 'Unbuilt homes with permission (top 10)', value: '1M+', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '4+ years of supply at current build rate', sparklineData: [650, 700, 750, 800, 850, 900, 950, 1000] },
      { label: 'Average gap: permission to build start', value: '3.4 yrs', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Up from 1.6 years in 2015', sparklineData: [1.6, 1.9, 2.1, 2.4, 2.6, 2.9, 3.1, 3.4] },
    ],
  },
  'home-care': {
    topic: 'Home Care',
    slug: 'home-care',
    href: '/home-care',
    colour: '#264653',
    preposition: 'in',
    metrics: [
      { label: 'People waiting for home care assessment', value: '500,000', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Doubled since 2016', sparklineData: [280, 310, 340, 370, 400, 430, 470, 500] },
      { label: 'Social care vacancies', value: '132,000', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Vacancy rate 9.9%; turnover 38%/yr', sparklineData: [88000, 95000, 102000, 110000, 165000, 152000, 140000, 132000] },
    ],
  },
  'hospice-funding': {
    topic: 'Hospice Funding',
    slug: 'hospice-funding',
    href: '/hospice-funding',
    colour: '#6B7280',
    preposition: 'in',
    metrics: [
      { label: 'NHS share of hospice income', value: '27%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'Down from 34% in 2014', sparklineData: [34, 33, 32, 31, 30, 29, 28, 27] },
      { label: 'Hospices in financial deficit', value: '58%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Up from 20% in 2014', sparklineData: [20, 25, 30, 35, 42, 50, 55, 58] },
    ],
  },
  'veteran-mental-health': {
    topic: 'Veteran Mental Health',
    slug: 'veteran-mental-health',
    href: '/veteran-mental-health',
    colour: '#264653',
    preposition: 'in',
    metrics: [
      { label: 'Veterans with probable PTSD/CMD', value: '120,000', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: '~6% of all UK veterans', sparklineData: [115000, 116000, 117000, 118000, 119000, 120000, 120000] },
      { label: 'Average Op COURAGE wait', value: '18 wks', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Target: 28 days; up from 8 weeks in 2017', sparklineData: [8, 10, 12, 14, 16, 17, 18, 18] },
    ],
  },
  'net-migration': {
    topic: 'Net Migration',
    slug: 'net-migration',
    href: '/net-migration',
    colour: '#6B7280',
    preposition: 'with',
    metrics: [
      { label: 'Net migration (peak, year to June 2023)', value: '906,000', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Record high; driven by students, health & care workers', sparklineData: [168, 248, 184, 260, 129, 488, 745, 906] },
      { label: 'Net migration (year to mid-2024)', value: '~350,000', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'Down after Jan 2024 visa restrictions', sparklineData: [906, 800, 650, 500, 400, 350] },
    ],
  },
  'student-mental-health': {
    topic: 'Student Mental Health',
    slug: 'student-mental-health',
    href: '/student-mental-health',
    colour: '#E63946',
    preposition: 'in',
    metrics: [
      { label: 'Students disclosing mental health condition', value: '1 in 4', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Up from 1 in 12 in 2015', sparklineData: [8, 10, 13, 16, 19, 21, 23, 25] },
      { label: 'Student suspected suicides (2021-22)', value: '74', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Up from ~65 in 2018-19', sparklineData: [65, 67, 68, 70, 62, 72, 74] },
    ],
  },
  'council-tax': {
    topic: 'Council Tax',
    slug: 'council-tax',
    href: '/council-tax',
    colour: '#F4A261',
    preposition: 'with',
    metrics: [
      { label: 'Average Band D council tax (England 2024)', value: '\u00a32,171', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Up from \u00a31,439 in 2010; +25% real terms since 2016', sparklineData: [1484, 1530, 1591, 1671, 1756, 1898, 2065, 2171] },
      { label: 'Councils at risk of s114 notice', value: '20+', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '9 issued since 2018; 20+ more at risk', sparklineData: [1, 1, 2, 3, 5, 7, 9, 15, 20] },
    ],
  },
  'creative-industries': {
    topic: 'Creative Industries',
    slug: 'creative-industries',
    href: '/creative-industries',
    colour: '#264653',
    preposition: 'in the',
    metrics: [
      { label: 'Creative industries GVA', value: '\u00a3116bn', direction: 'up' as const, polarity: 'up-is-good' as const, context: '6% of UK GDP; 2.4M jobs', sparklineData: [84, 90, 97, 105, 112, 95, 106, 116] },
      { label: 'Grassroots music venues closed since 2007', value: '35%', direction: 'down' as const, polarity: 'up-is-bad' as const, context: '~12 venues closing per month', sparklineData: [6800, 6500, 6200, 5900, 5600, 5300, 5000, 4600] },
    ],
  },
  'planning-permission': {
    topic: 'Planning Permission',
    slug: 'planning-permission',
    href: '/planning-permission',
    colour: '#F4A261',
    preposition: 'with',
    metrics: [
      { label: 'Planning permissions granted (2023)', value: '474,000', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'Only 234K homes completed; <50% conversion rate', sparklineData: [580, 560, 540, 520, 490, 480, 470, 474] },
      { label: 'Undecided applications backlog', value: '500,000', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Up from 280K in 2016; planners down 40% since 2010', sparklineData: [280, 300, 330, 360, 400, 440, 480, 500] },
    ],
  },

  // ── Batch F: NHS specifics + zero-hours ───────────────────────────────────────
  'nhs-sickness-absence': {
    topic: 'NHS Staff Absence',
    slug: 'nhs-sickness-absence',
    href: '/nhs-sickness-absence',
    colour: '#F4A261',
    preposition: 'in',
    metrics: [
      { label: 'NHS sickness absence rate', value: '5.6', unit: '%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '2022/23 \u00b7 Up from 4.2% in 2015 \u00b7 Target: 3.5%', sparklineData: [4.23, 4.16, 4.22, 4.19, 4.58, 4.86, 5.22, 5.64, 5.28] },
      { label: 'Days lost per year', value: '27.8M', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '2022/23 \u00b7 Up from 22M in 2015', sparklineData: [22.0, 21.8, 22.4, 22.9, 23.8, 25.1, 26.4, 27.8, 26.9] },
      { label: 'Annual cost to NHS', value: '\u00a33.3bn', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '2022/23 \u00b7 Direct cost to NHS England', sparklineData: [2.1, 2.2, 2.3, 2.4, 2.6, 2.8, 3.0, 3.3, 3.1] },
    ],
  },
  'ambulance-handovers': {
    topic: 'Ambulance Handovers',
    slug: 'ambulance-handovers',
    href: '/ambulance-handovers',
    colour: '#E63946',
    preposition: 'in',
    metrics: [
      { label: 'Hours lost to handover delays', value: '1.8M', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '2023/24 \u00b7 Up from 420K in 2017/18', sparklineData: [0.42, 0.51, 0.63, 1.12, 1.58, 1.82, 1.64] },
      { label: 'Handovers taking 60+ min', value: '18.4', unit: '%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '2023/24 \u00b7 Up from 2.1% in 2017/18', sparklineData: [2.1, 3.4, 5.8, 11.2, 15.9, 18.4, 14.7] },
      { label: 'Cat 2 response time', value: '40.7', unit: 'min', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '2023/24 \u00b7 Target: 18 minutes', sparklineData: [22, 24, 28, 39, 52, 41, 37] },
    ],
  },
  'zero-hours-contracts': {
    topic: 'Zero-Hours Contracts',
    slug: 'zero-hours-contracts',
    href: '/zero-hours-contracts',
    colour: '#E63946',
    preposition: 'with',
    metrics: [
      { label: 'Workers on zero-hours contracts', value: '1.1M', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '2024 \u00b7 Nearly trebled since 2013', sparklineData: [400, 624, 744, 801, 883, 780, 896, 1004, 982, 1028, 1100] },
      { label: 'Zero-hours workers in hospitality', value: '35', unit: '%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Highest sector share', sparklineData: [27, 29, 30, 31, 32, 31, 33, 34, 35] },
      { label: 'Average weekly hours', value: '25.3', direction: 'flat' as const, polarity: 'up-is-good' as const, context: '25% want more hours but cannot get them', sparklineData: [24.8, 25.1, 24.9, 25.0, 25.2, 25.4, 25.1, 25.0, 25.3] },
    ],
  },
  'fertility-treatment': {
    topic: 'Fertility Treatment',
    slug: 'fertility-treatment',
    href: '/fertility-treatment',
    colour: '#6B7280',
    preposition: 'in',
    metrics: [
      { label: 'ICSs offering full 3 NICE cycles', value: '45', unit: '%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down from 60% in 2016', sparklineData: [60, 58, 55, 52, 49, 47, 46, 45] },
      { label: 'Average NHS IVF wait', value: '18', unit: 'months', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 9 months in 2016', sparklineData: [9, 10, 12, 14, 16, 17, 18, 18] },
    ],
  },
  'gender-clinic': {
    topic: 'Gender Clinics',
    slug: 'gender-clinic',
    href: '/gender-clinic',
    colour: '#E63946',
    preposition: 'at',
    metrics: [
      { label: 'Gender clinic waiting list', value: '26,000', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 3,500 in 2016', sparklineData: [3500, 5000, 7500, 10000, 14000, 18000, 22000, 26000] },
      { label: 'Average wait for first appointment', value: '5.5', unit: 'yrs', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 1.5 years in 2016', sparklineData: [1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 5.0, 5.5] },
    ],
  },
  'menopause-care': {
    topic: 'Menopause Care',
    slug: 'menopause-care',
    href: '/menopause-care',
    colour: '#F4A261',
    preposition: 'in',
    metrics: [
      { label: 'HRT prescriptions per year', value: '7.8M', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'record high, up 37% since 2020', sparklineData: [5.0, 5.2, 5.4, 5.6, 5.7, 5.8, 7.0, 7.8] },
      { label: 'Women seeing GP 3+ times before HRT', value: '42', unit: '%', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down from 55% in 2019', sparklineData: [55, 53, 51, 50, 48, 45, 43, 42] },
    ],
  },
  'talking-therapies': {
    topic: 'NHS Talking Therapies',
    slug: 'talking-therapies',
    href: '/talking-therapies',
    colour: '#2A9D8F',
    preposition: 'in',
    metrics: [
      { label: 'People completing therapy per year', value: '1.2M', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'stable at record level', sparklineData: [0.9, 1.0, 1.1, 1.1, 0.7, 1.0, 1.1, 1.2] },
      { label: 'National recovery rate', value: '52.3', unit: '%', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'exceeds 50% target', sparklineData: [45, 47, 49, 50, 48, 50, 52, 52] },
    ],
  },
  'addiction-services': {
    topic: 'Addiction Services',
    slug: 'addiction-services',
    href: '/addiction-services',
    colour: '#E63946',
    preposition: 'in',
    metrics: [
      { label: 'Drug poisoning deaths', value: '4,907', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'highest ever recorded, 2022', sparklineData: [3346, 3674, 3756, 4359, 4359, 2996, 4561, 4907] },
      { label: 'People in drug/alcohol treatment', value: '289K', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down from 311K in 2010/11', sparklineData: [311, 309, 299, 293, 289, 279, 282, 289] },
    ],
  },
  'hospital-infections': {
    topic: 'Hospital Infections',
    slug: 'hospital-infections',
    href: '/hospital-infections',
    colour: '#F4A261',
    preposition: 'in',
    metrics: [
      { label: 'C.difficile cases per year', value: '14,200', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'rising after historic fall', sparklineData: [36000, 25000, 18000, 15000, 14000, 13000, 12500, 12800, 13500, 14200] },
      { label: 'MRSA bloodstream infections', value: '1,423', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up 45% from 2018 low', sparklineData: [1200, 1150, 1100, 1050, 1000, 980, 1100, 1200, 1350, 1423] },
    ],
  },
  'eye-care': {
    topic: 'Eye Care',
    slug: 'eye-care',
    href: '/eye-care',
    colour: '#6B7280',
    preposition: 'in',
    metrics: [
      { label: 'Ophthalmology waiting list', value: '630K', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up 57% since 2018', sparklineData: [400, 430, 460, 490, 520, 560, 600, 630] },
      { label: 'Patients at risk of sight loss', value: '22,000', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'delayed beyond safe intervals', sparklineData: [8000, 10000, 12000, 15000, 18000, 20000, 21000, 22000] },
    ],
  },
  'cancer-diagnosis': {
    topic: 'Cancer Diagnosis',
    slug: 'cancer-diagnosis',
    href: '/cancer-diagnosis',
    colour: '#E63946',
    preposition: 'in',
    metrics: [
      { label: 'Cancers at early stage (1 & 2)', value: '54', unit: '%', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'target: 75% by 2028', sparklineData: [50, 51, 52, 53, 53, 52, 53, 54] },
      { label: '62-day treatment standard met', value: '65', unit: '%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'target: 85%, not met since 2015', sparklineData: [85, 84, 82, 80, 76, 68, 65, 65] },
    ],
  },
  'childhood-obesity': {
    topic: 'Childhood Obesity',
    slug: 'childhood-obesity',
    href: '/childhood-obesity',
    colour: '#E63946',
    preposition: 'with',
    metrics: [
      { label: 'Year 6 obesity rate', value: '22.7', unit: '%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 17.3% in 2006 · 1 in 5 children', sparklineData: [17.3, 18.2, 19.1, 19.8, 20.0, 20.2, 21.0, 21.9, 23.4, 22.7] },
      { label: 'Deprivation gap', value: '3.2', unit: '×', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'most deprived 35.7% vs least 11.2%', sparklineData: [2.6, 2.7, 2.8, 2.9, 3.0, 3.1, 3.2, 3.3, 3.2] },
    ],
  },
  'maternity-safety': {
    topic: 'Maternity Safety',
    slug: 'maternity-safety',
    href: '/maternity-safety',
    colour: '#F4A261',
    preposition: 'in',
    metrics: [
      { label: 'Stillbirth rate', value: '3.53', unit: '/1,000', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'record low · down 31% from 2010', sparklineData: [5.1, 4.9, 4.7, 4.4, 4.2, 4.0, 3.8, 3.7, 3.53] },
      { label: 'Black vs white maternal mortality', value: '3.7', unit: '×', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'unchanged for 20 years', sparklineData: [3.5, 3.7, 3.8, 3.7, 3.7, 3.8, 3.7, 3.7] },
    ],
  },
  'health-inequalities': {
    topic: 'Health Inequalities',
    slug: 'health-inequalities',
    href: '/health-inequalities',
    colour: '#E63946',
    preposition: 'in',
    metrics: [
      { label: 'Healthy life expectancy gap', value: '18.4', unit: 'yrs', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'most vs least deprived · widening', sparklineData: [16.2, 17.1, 17.8, 18.1, 18.4, 18.6] },
      { label: 'Life expectancy gap', value: '10.2', unit: 'yrs', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '74.1 vs 83.5 years', sparklineData: [8.9, 9.2, 9.6, 9.9, 10.2, 10.4] },
    ],
  },
  'gp-closures': {
    topic: 'GP Closures',
    slug: 'gp-closures',
    href: '/gp-closures',
    colour: '#E63946',
    preposition: 'with',
    metrics: [
      { label: 'GP practices since 2013', value: '−1,640', direction: 'down' as const, polarity: 'up-is-good' as const, context: '8,221 → 6,581 practices · accelerating', sparklineData: [8221, 7989, 7672, 7394, 7128, 6581] },
      { label: 'Patients per practice', value: '9,600', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 6,900 in 2013', sparklineData: [6900, 7200, 7600, 8100, 8700, 9600] },
    ],
  },
  'preventable-deaths': {
    topic: 'Preventable Deaths',
    slug: 'preventable-deaths',
    href: '/preventable-deaths',
    colour: '#2A9D8F',
    preposition: 'from',
    metrics: [
      { label: 'Avoidable mortality rate', value: '218', unit: '/100k', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down 27% from 293 in 2010', sparklineData: [293, 275, 258, 242, 231, 243, 218] },
      { label: 'North East vs London gap', value: '66', unit: '%', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: '276 vs 166 per 100,000', sparklineData: [60, 62, 63, 64, 65, 66, 66] },
    ],
  },
  'long-term-conditions': {
    topic: 'Long-Term Conditions',
    slug: 'long-term-conditions',
    href: '/long-term-conditions',
    colour: '#E63946',
    preposition: 'with',
    metrics: [
      { label: 'People with 2+ LTCs', value: '15.4m', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 8.2m in 2000 · 77% of NHS spend', sparklineData: [8.2, 9.4, 11.2, 13.1, 14.3, 15.4] },
      { label: 'Projected by 2035', value: '17.9m', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '+16% in 14 years · ageing driven', sparklineData: [11.2, 13.1, 14.3, 15.4, 16.2, 17.2, 17.9] },
    ],
  },
  'nhs-dentistry-access': {
    topic: 'NHS Dental Access',
    slug: 'nhs-dentistry-access',
    href: '/nhs-dentistry-access',
    colour: '#E63946',
    preposition: 'to',
    metrics: [
      { label: 'Adults unable to access NHS dentist', value: '43m', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '77% of adults · dental deserts spreading', sparklineData: [35, 37, 38, 40, 43, 43] },
      { label: 'Treatments completed', value: '25.4m', unit: '/yr', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down from 30.1m pre-COVID · not recovered', sparklineData: [29.8, 30.2, 30.5, 30.1, 17.0, 21.3, 23.7, 25.4] },
    ],
  },
  'racial-health-gap': {
    topic: 'Racial Health Inequalities',
    slug: 'racial-health-gap',
    href: '/racial-health-gap',
    colour: '#E63946',
    preposition: 'in',
    metrics: [
      { label: 'Black maternal mortality vs white', value: '3.7', unit: '×', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'unchanged for 20 years', sparklineData: [3.5, 3.6, 3.7, 3.7, 3.8, 3.7, 3.7, 3.7] },
      { label: 'Mental Health Act: Black vs white detention', value: '4×', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Black detained at 4× rate · rising', sparklineData: [3.5, 3.7, 3.8, 3.9, 4.0, 4.0] },
    ],
  },
  'end-of-life': {
    topic: 'End of Life Care',
    slug: 'end-of-life',
    href: '/end-of-life',
    colour: '#F4A261',
    preposition: 'in',
    metrics: [
      { label: 'Dying in hospital', value: '45.8', unit: '%', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down from 53% · still too high', sparklineData: [53, 51.2, 48, 46.3, 45.8] },
      { label: 'Hospice NHS funding share', value: '34', unit: '%', direction: 'flat' as const, polarity: 'up-is-good' as const, context: '66% reliant on charity', sparklineData: [30, 31, 32, 33, 30, 34, 34] },
    ],
  },
  'insolvencies': {
    topic: 'Business Insolvencies',
    slug: 'insolvencies',
    href: '/insolvencies',
    colour: '#E63946',
    preposition: 'in',
    metrics: [
      { label: 'Company insolvencies (2023)', value: '25,158', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'highest since 1993 · up 50% vs pre-pandemic', sparklineData: [19077, 17435, 15385, 16090, 12557, 14049, 22109, 25158] },
      { label: 'Personal insolvencies (2023)', value: '99,825', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'cost-of-living crisis squeezing households', sparklineData: [135045, 99196, 90928, 122009, 80000, 119932, 106820, 99825] },
    ],
  },
  'real-wages': {
    topic: 'Real Wages',
    slug: 'real-wages',
    href: '/real-wages',
    colour: '#E63946',
    preposition: 'in',
    metrics: [
      { label: 'Real wages vs 2008 peak', value: '−1', unit: '%', direction: 'flat' as const, polarity: 'up-is-good' as const, context: '16-year stagnation · worst since Napoleonic era', sparklineData: [100, 99.2, 96.8, 93.4, 91.7, 91.2, 93.4, 95.2, 97.4, 96.3, 99.1] },
      { label: 'Bottom 20% wage growth 2008–2024', value: '+5.1', unit: '%', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'National Living Wage boosted low earners', sparklineData: [0, 1, 2, 3, 4, 4.5, 5.1] },
    ],
  },
  'north-south-divide': {
    topic: 'North-South Divide',
    slug: 'north-south-divide',
    href: '/north-south-divide',
    colour: '#E63946',
    preposition: 'in',
    metrics: [
      { label: 'London GVA per head', value: '£56,378', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '181% of UK average · up from 151% in 1997', sparklineData: [151, 158, 162, 167, 172, 179, 181] },
      { label: 'North East GVA per head', value: '£22,843', direction: 'flat' as const, polarity: 'up-is-good' as const, context: '74% of UK average · gap at record high', sparklineData: [86, 84, 82, 79, 76, 74, 74] },
    ],
  },
  'rd-investment': {
    topic: 'R&D Investment',
    slug: 'rd-investment',
    href: '/rd-investment',
    colour: '#E63946',
    preposition: 'in',
    metrics: [
      { label: 'UK R&D as % of GDP', value: '1.73', unit: '%', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'OECD target is 2.4% · 6th in G7', sparklineData: [1.62, 1.61, 1.67, 1.67, 1.71, 1.73, 1.73] },
      { label: 'Gap to OECD target', value: '−0.67', unit: 'pp', direction: 'flat' as const, polarity: 'up-is-good' as const, context: '~£18bn/yr additional investment needed', sparklineData: [0.78, 0.79, 0.73, 0.73, 0.69, 0.67, 0.67] },
    ],
  },
  'housing-costs-workers': {
    topic: 'Housing Costs vs Wages',
    slug: 'housing-costs-workers',
    href: '/housing-costs-workers',
    colour: '#E63946',
    preposition: 'in',
    metrics: [
      { label: 'London rent as % of take-home pay', value: '71', unit: '%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Up from 32% in 2000 · doubled in a generation', sparklineData: [32, 38, 45, 54, 62, 65, 68, 71] },
      { label: 'Manchester rent/pay ratio', value: '48', unit: '%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Northern cities now unaffordable too', sparklineData: [25, 27, 30, 35, 40, 44, 48] },
    ],
  },
  'regional-pay': {
    topic: 'Regional Pay Inequality',
    slug: 'regional-pay',
    href: '/regional-pay',
    colour: '#E63946',
    preposition: 'in',
    metrics: [
      { label: 'London–North East pay gap', value: '£15,900', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Was £4,200 in 1997 · nearly quadrupled', sparklineData: [4200, 7800, 10500, 12400, 14100, 15900] },
      { label: 'North East median pay', value: '£30,200', unit: '/yr', direction: 'up' as const, polarity: 'up-is-good' as const, context: '34% below UK average of £35,400', sparklineData: [20000, 22000, 24000, 26000, 28000, 29000, 30200] },
    ],
  },
  'savings-crisis': {
    topic: 'Savings Crisis',
    slug: 'savings-crisis',
    href: '/savings-crisis',
    colour: '#E63946',
    preposition: 'in',
    metrics: [
      { label: 'Adults with less than £100 saved', value: '25', unit: '%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Up from 22% in 2020', sparklineData: [22, 20, 24, 25] },
      { label: 'Household savings rate', value: '5.9', unit: '%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'Near record low · peaked at 16.3% during COVID', sparklineData: [9.1, 8.3, 6.7, 4.8, 16.3, 7.0, 4.2, 5.9] },
    ],
  },
  'economic-growth': {
    topic: 'Economic Growth',
    slug: 'economic-growth',
    href: '/economic-growth',
    colour: '#E63946',
    preposition: 'in',
    metrics: [
      { label: 'UK GDP growth 2023', value: '0.1', unit: '%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'Near-stagnation · 6th in G7 since 2010', sparklineData: [1.9, 1.6, 2.1, 3.0, 2.4, 1.8, 1.9, 1.3, 1.6, -11.0, 8.7, 4.1, 0.1] },
      { label: 'Average growth 2010–2023', value: '1.1', unit: '%/yr', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'vs G7 average 1.3% · UK near bottom', sparklineData: [1.9, 1.8, 1.5, 1.3, 1.2, 1.1, 1.1] },
    ],
  },
  'river-bathing': {
    topic: 'River Bathing Water Quality',
    slug: 'river-bathing',
    href: '/river-bathing',
    colour: '#264653',
    preposition: 'in',
    metrics: [
      { label: 'Rivers in good ecological status', value: '14', unit: '%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'Target was 60% by 2015 · every deadline missed', sparklineData: [25.5, 17.3, 15.7, 14.1, 14.0] },
      { label: 'Bathing sites rated poor', value: '24', unit: '%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Worsening in 2023 · sewage and E. coli', sparklineData: [23, 22, 22, 21, 22, 24] },
    ],
  },
  'ev-charging': {
    topic: 'EV Charging Infrastructure',
    slug: 'ev-charging',
    href: '/ev-charging',
    colour: '#2A9D8F',
    preposition: 'in',
    metrics: [
      { label: 'Public charge points installed', value: '65,000', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'Up from 8,400 in 2017 · growing at 35%/yr', sparklineData: [8400, 13700, 20000, 25400, 31000, 47000, 65000] },
      { label: 'Rural vs urban charge point gap', value: '8', unit: '×', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Urban 66 per 100k pop vs rural 8', sparklineData: [4, 5, 5, 6, 7, 8] },
    ],
  },
  'heat-mortality': {
    topic: 'Heat-Related Deaths',
    slug: 'heat-mortality',
    href: '/heat-mortality',
    colour: '#E63946',
    preposition: 'from',
    metrics: [
      { label: 'Excess deaths in 2022 heatwaves', value: '2,985', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Record 40.3°C reached July 2022', sparklineData: [2139, 680, 622, 760, 863, 892, 1062, 2985] },
      { label: 'Projected heat deaths by 2050 (2°C)', value: '7,000', unit: '/yr', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'vs ~1,000/yr baseline today', sparklineData: [800, 900, 1000, 1200, 2985, 7000] },
    ],
  },
  'habitat-condition': {
    topic: 'Habitat Condition',
    slug: 'habitat-condition',
    href: '/habitat-condition',
    colour: '#E63946',
    preposition: 'of',
    metrics: [
      { label: 'SSSIs in favourable condition', value: '53.6', unit: '%', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'target 70% · barely moved since 2010', sparklineData: [58.2, 52.4, 51.1, 52.6, 53.0, 53.2, 53.4, 53.6] },
      { label: 'Lowland meadow remaining', value: '15,000', unit: 'ha', direction: 'flat' as const, polarity: 'up-is-good' as const, context: '99.6% lost since 1940', sparklineData: [3700000, 1200000, 400000, 100000, 30000, 15000] },
    ],
  },
  'farming-subsidies': {
    topic: 'Farm Subsidies',
    slug: 'farming-subsidies',
    href: '/farming-subsidies',
    colour: '#F4A261',
    preposition: 'for',
    metrics: [
      { label: 'BPS payments (2024)', value: '£0.8bn', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down from £1.9bn · phasing out by 2028', sparklineData: [2.4, 1.9, 1.8, 1.9, 1.5, 0.8] },
      { label: 'Real farm income since 2010', value: '-29', unit: '%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'BPS cuts + input cost inflation', sparklineData: [100, 92, 81, 86, 89, 79, 71] },
    ],
  },
  'offshore-wind': {
    topic: 'Offshore Wind',
    slug: 'offshore-wind',
    href: '/offshore-wind',
    colour: '#2A9D8F',
    preposition: 'in',
    metrics: [
      { label: 'Installed offshore wind', value: '14.7', unit: 'GW', direction: 'up' as const, polarity: 'up-is-good' as const, context: '2nd largest in world · up from 1.3 GW in 2010', sparklineData: [1.3, 2.9, 4.5, 5.7, 8.2, 10.4, 13.8, 14.7] },
      { label: 'Round 5 CfD awards (2023)', value: '0', unit: 'GW', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'No offshore wind awarded · strike price too low', sparklineData: [0.8, 3.2, 5.9, 7.0, 0.0] },
    ],
  },
  'circular-economy': {
    topic: 'Recycling & Circular Economy',
    slug: 'circular-economy',
    href: '/circular-economy',
    colour: '#F4A261',
    preposition: 'in',
    metrics: [
      { label: 'England recycling rate', value: '43.5', unit: '%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'peaked 45.7% in 2016 · below EU avg of 48%', sparklineData: [40.4, 43.0, 44.8, 45.7, 44.7, 44.0, 43.5] },
      { label: 'Waste going to landfill', value: '6', unit: '%', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down from 38% in 2010 · genuine success', sparklineData: [38, 30, 23, 15, 8, 6] },
    ],
  },
  'wildfire-risk': {
    topic: 'Wildfire Risk',
    slug: 'wildfire-risk',
    href: '/wildfire-risk',
    colour: '#E63946',
    preposition: 'in',
    metrics: [
      { label: 'Area burned (2022 peak)', value: '26,000', unit: 'ha', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '570% above decade avg · fires near London', sparklineData: [1800, 2100, 3200, 4100, 5200, 3800, 26000] },
      { label: 'Fire incidents in 2022', value: '530', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'record year · 50+ simultaneous fires at peak', sparklineData: [210, 280, 195, 240, 530] },
    ],
  },
  'cladding-crisis': {
    topic: 'Cladding Crisis',
    slug: 'cladding-crisis',
    href: '/cladding-crisis',
    colour: '#E63946',
    preposition: 'in',
    metrics: [
      { label: 'Buildings with unsafe cladding', value: '4,603', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'identified since Grenfell 2017', sparklineData: [4603, 4603, 4603, 4603] },
      { label: 'Buildings fully remediated', value: '30', unit: '%', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up from 8.6% in 2021 · progress slow', sparklineData: [8.6, 16.1, 22.0, 30.0] },
    ],
  },
  'holiday-lets': {
    topic: 'Short-Term Holiday Lets',
    slug: 'holiday-lets',
    href: '/holiday-lets',
    colour: '#F4A261',
    preposition: 'in',
    metrics: [
      { label: 'Short-term let listings in England', value: '257,000', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 70,000 in 2015 · 4x growth', sparklineData: [70000, 110000, 180000, 235000, 257000] },
      { label: 'Cornwall housing as short-term lets', value: '36', unit: '%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Lake District 29%, North Devon 24%', sparklineData: [20, 24, 28, 32, 36] },
    ],
  },
  'renters-reform': {
    topic: 'Renters Reform',
    slug: 'renters-reform',
    href: '/renters-reform',
    colour: '#2A9D8F',
    preposition: 'in',
    metrics: [
      { label: 'Section 21 notices (2022/23)', value: '26,000', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'back to pre-COVID highs · now abolished', sparklineData: [20400, 22100, 23700, 24100, 7400, 13200, 24700, 26000] },
      { label: 'Average rent increase (2023)', value: '8.9', unit: '%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'largest annual increase on record', sparklineData: [2.1, 1.4, 2.3, 4.1, 8.9] },
    ],
  },
  'net-housing-supply': {
    topic: 'Housing Supply',
    slug: 'net-housing-supply',
    href: '/net-housing-supply',
    colour: '#E63946',
    preposition: 'in',
    metrics: [
      { label: 'Net dwellings added (2022/23)', value: '234,400', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'below 300,000 target · missed every year since 2010', sparklineData: [124360, 141980, 189750, 221090, 234820, 243770, 216490, 232820, 234400] },
      { label: 'Cumulative shortfall since 2010', value: '2.1m', unit: 'homes', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'homes needed that do not exist', sparklineData: [350000, 850000, 1600000, 2100000] },
    ],
  },
  'social-rent': {
    topic: 'Social Housing',
    slug: 'social-rent',
    href: '/social-rent',
    colour: '#E63946',
    preposition: 'in',
    metrics: [
      { label: 'New social rent homes built', value: '6,400', unit: '/yr', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'was 152,000/yr in 1975 — 96% collapse', sparklineData: [152000, 88000, 28000, 17000, 9800, 7600, 8200, 7400, 5900, 6400] },
      { label: 'Households on waiting list', value: '1.2m', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'average wait 2.7 years · some areas 10+ years', sparklineData: [1850000, 1260000, 1151000, 1162000, 1208000] },
    ],
  },
  'school-funding': {
    topic: 'School Funding',
    slug: 'school-funding',
    href: '/school-funding',
    colour: '#E63946',
    preposition: 'in',
    metrics: [
      { label: 'Real per-pupil funding vs 2009 peak', value: '−9%', direction: 'down' as const, polarity: 'up-is-good' as const, context: '£5,915 in 2023 vs £6,500 in 2009', sparklineData: [6500, 6200, 5900, 5700, 5600, 5800, 6100, 5915] },
      { label: 'SEND funding deficit', value: '£2.1bn', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'growing every year since 2018', sparklineData: [0.3, 0.6, 0.9, 1.3, 1.7, 2.1] },
    ],
  },
  'send-crisis': {
    topic: 'SEND Crisis',
    slug: 'send-crisis',
    href: '/send-crisis',
    colour: '#E63946',
    preposition: 'in the',
    metrics: [
      { label: 'Children with EHCPs', value: '576k', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up 143% since 2014', sparklineData: [237, 267, 316, 390, 489, 576] },
      { label: 'Average EHCP wait', value: '28', unit: 'weeks', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'legal max is 20 weeks', sparklineData: [23, 24, 25, 26, 27, 28] },
    ],
  },
  'graduate-outcomes': {
    topic: 'Graduate Outcomes',
    slug: 'graduate-outcomes',
    href: '/graduate-outcomes',
    colour: '#2A9D8F',
    preposition: 'for',
    metrics: [
      { label: 'In professional role (15 months)', value: '76.9', unit: '%', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up from 72.1% in 2018', sparklineData: [72.1, 74.3, 73.8, 75.2, 76.9] },
      { label: 'Lifetime earnings premium', value: '£140k', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'vs non-graduate · varies by subject', sparklineData: [130000, 135000, 140000, 140000, 140000] },
    ],
  },
  'pupil-premium': {
    topic: 'Pupil Premium',
    slug: 'pupil-premium',
    href: '/pupil-premium',
    colour: '#F4A261',
    preposition: 'and the',
    metrics: [
      { label: 'GCSE attainment gap (FSM vs non-FSM)', value: '18.0', unit: 'pp', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'COVID reversed pre-2019 progress', sparklineData: [19.4, 18.7, 17.9, 17.2, 17.1, 18.4, 18.0] },
      { label: 'Annual Pupil Premium spend', value: '£2.9bn', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'largest targeted education intervention', sparklineData: [0.6, 2.3, 2.5, 2.6, 2.7, 2.9] },
    ],
  },
  'arts-in-schools': {
    topic: 'Arts in Schools',
    slug: 'arts-in-schools',
    href: '/arts-in-schools',
    colour: '#E63946',
    preposition: 'with',
    metrics: [
      { label: 'Art & Design GCSE entries since 2010', value: '−41%', direction: 'down' as const, polarity: 'up-is-good' as const, context: '191,500 → 113,200 · EBacc driving cuts', sparklineData: [191500, 177300, 155600, 133200, 117800, 113200] },
      { label: 'Music GCSE entries since 2010', value: '−41%', direction: 'down' as const, polarity: 'up-is-good' as const, context: '65,200 → 38,700', sparklineData: [65200, 57800, 47900, 42700, 40100, 38700] },
    ],
  },
  'child-poverty-regions': {
    topic: 'Child Poverty by Region',
    slug: 'child-poverty-regions',
    href: '/child-poverty-regions',
    colour: '#E63946',
    metrics: [
      { label: 'Children in poverty (UK)', value: '4.3m', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '30% of all children · North East worst at 33%', sparklineData: [27, 27, 28, 28, 29, 28, 29, 30] },
      { label: 'In poverty in working families', value: '67', unit: '%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 57% in 2010 · working poor is the norm', sparklineData: [57, 61, 64, 66, 67, 67] },
    ],
  },
  'disability-poverty': {
    topic: 'Disability & Poverty',
    slug: 'disability-poverty',
    href: '/disability-poverty',
    colour: '#E63946',
    preposition: 'with',
    metrics: [
      { label: 'Disabled household poverty rate', value: '29', unit: '%', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'nearly double the non-disabled rate of 16%', sparklineData: [28, 28, 29, 29, 29, 29, 29] },
      { label: 'Extra monthly costs of disability', value: '£570', unit: '/mo', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'specialist equipment, energy, transport, care', sparklineData: [390, 420, 450, 490, 540, 570] },
    ],
  },
  'carer-poverty': {
    topic: 'Carer Poverty',
    slug: 'carer-poverty',
    href: '/carer-poverty',
    colour: '#E63946',
    preposition: 'and',
    metrics: [
      { label: 'Carers Allowance weekly rate', value: '£76.75', unit: '/wk', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'lowest carer benefit in Europe', sparklineData: [53.90, 59.75, 62.70, 66.15, 67.60, 76.75] },
      { label: 'Carers in poverty', value: '35', unit: '%', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'vs 22% national average', sparklineData: [34, 34, 35, 35, 35] },
    ],
  },
  'birth-rate': {
    topic: 'Birth Rate',
    slug: 'birth-rate',
    href: '/birth-rate',
    colour: '#F4A261',
    preposition: 'and the',
    metrics: [
      { label: 'UK total fertility rate (2023)', value: '1.44', unit: 'TFR', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'record low · replacement level is 2.1', sparklineData: [1.98, 1.94, 1.82, 1.70, 1.58, 1.49, 1.44] },
      { label: 'Scotland fertility rate', value: '1.33', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'lowest in UK', sparklineData: [1.80, 1.75, 1.65, 1.55, 1.45, 1.38, 1.33] },
    ],
  },
  'trust-institutions': {
    topic: 'Trust in Institutions',
    slug: 'trust-institutions',
    href: '/trust-institutions',
    colour: '#E63946',
    preposition: 'in',
    metrics: [
      { label: 'Trust in politicians', value: '12', unit: '%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'lowest ever in Ipsos Veracity Index', sparklineData: [21, 18, 20, 17, 19, 15, 12] },
      { label: 'Trust in NHS (institution)', value: '51', unit: '%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down from 72% in 2010', sparklineData: [72, 70, 66, 62, 68, 71, 54, 51] },
    ],
  },
  'civic-participation': {
    topic: 'Civic Participation',
    slug: 'civic-participation',
    href: '/civic-participation',
    colour: '#F4A261',
    metrics: [
      { label: 'Formal volunteering rate', value: '24', unit: '%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'Down from 28% in 2010 · secular decline', sparklineData: [28, 27, 26, 25, 23, 24, 24] },
      { label: 'Trussell food bank volunteers', value: '39,000', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'Grassroots civic energy concentrated around need', sparklineData: [22000, 28000, 36000, 39000] },
    ],
  },
  'military-recruitment': {
    topic: 'Armed Forces Recruitment',
    slug: 'military-recruitment',
    href: '/military-recruitment',
    colour: '#6B7280',
    metrics: [
      { label: 'British Army trained strength', value: '72,520', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'Below 73,000 target · half Cold War peak of 152k', sparklineData: [152000, 111000, 98000, 82000, 78000, 76000, 72520] },
      { label: 'Below establishment (all 3 services)', value: '−3,500', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'Army, Navy and RAF all under headcount target', sparklineData: [1000, 2000, 2500, 3000, 3200, 3500] },
    ],
  },
  'prison-mental-health': {
    topic: 'Prison Mental Health',
    slug: 'prison-mental-health',
    href: '/prison-mental-health',
    colour: '#E63946',
    metrics: [
      { label: 'Self-harm incidents in prison/yr', value: '74,000', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Up 208% since 2012 · 203 per day', sparklineData: [24000, 30000, 40161, 57968, 61461, 74590] },
      { label: 'Prisoners with 2+ mental health diagnoses', value: '70', unit: '%', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'Most unwell institution in England', sparklineData: [65, 67, 68, 70, 70] },
    ],
  },
  'police-misconduct': {
    topic: 'Police Misconduct',
    slug: 'police-misconduct',
    href: '/police-misconduct',
    colour: '#6B7280',
    metrics: [
      { label: 'Misconduct hearings (2022/23)', value: '1,738', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '122 officers dismissed · IOPC backlog 2,057 cases', sparklineData: [1240, 1320, 1410, 1520, 1580, 1640, 1710, 1738] },
      { label: 'Stop & search: Black to white ratio', value: '4.1', unit: '×', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'Down from 9.7× in 2018 · still 4× disproportionate', sparklineData: [9.7, 9.4, 6.3, 6.7, 5.1, 4.1] },
    ],
  },
  'nature-recovery': {
    topic: 'Nature Recovery',
    slug: 'nature-recovery',
    href: '/nature-recovery',
    colour: '#2A9D8F',
    metrics: [
      { label: 'LNRSs published (2024)', value: '46/48', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'Near-complete England coverage · legally required', sparklineData: [12, 46] },
      { label: 'Protected land in England', value: '28.8', unit: '%', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'Approaching 30×30 target · 30% by 2030', sparklineData: [26.4, 27.1, 28.2, 28.8] },
    ],
  },
  'supply-chain': {
    topic: 'Supply Chain Resilience',
    slug: 'supply-chain',
    href: '/supply-chain',
    colour: '#F4A261',
    metrics: [
      { label: 'UK food import dependency', value: '46', unit: '%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Up from 37% in 2000 · among highest in G7', sparklineData: [37, 39, 42, 44, 46, 46] },
      { label: 'Goods trade deficit (2022)', value: '£186bn', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Record high · fell to £162bn in 2023', sparklineData: [120, 141, 148, 172, 186, 162] },
    ],
  },
  'care-home-fees': {
    topic: 'Care Home Fees',
    slug: 'care-home-fees',
    href: '/care-home-fees',
    colour: '#E63946',
    metrics: [
      { label: 'Average residential care home fee', value: '£1,100', unit: '/wk', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Up from £635 in 2015 · nursing care £1,300/wk', sparklineData: [635, 680, 750, 850, 980, 1100] },
      { label: 'Self-funder premium over council rate', value: '41', unit: '%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Self-funders cross-subsidise council residents £8,600/yr', sparklineData: [41, 46, 46, 41] },
    ],
  },
  'social-care-waiting': {
    topic: 'Social Care Waiting Times',
    slug: 'social-care-waiting',
    href: '/social-care-waiting',
    colour: '#E63946',
    metrics: [
      { label: 'Waiting for social care', value: '415k', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Up from 298,000 in 2019 · compound NHS pressure', sparklineData: [298, 340, 380, 410, 415] },
      { label: 'Estimated unmet need', value: '1.5m', unit: 'people', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'People not receiving care they need', sparklineData: [1.1, 1.2, 1.3, 1.4, 1.5] },
    ],
  },
  'young-people-care': {
    topic: 'Children in Care',
    slug: 'young-people-care',
    href: '/young-people-care',
    colour: '#E63946',
    metrics: [
      { label: 'Children in local authority care', value: '83,840', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Up 38% since 2009 · poverty driving rise', sparklineData: [60900, 67050, 69540, 75420, 80080, 82170, 83840] },
      { label: 'Care leavers not in EET (age 19–21)', value: '34', unit: '%', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'vs 11% for all young people · outcomes gap', sparklineData: [35, 35, 34, 34, 34] },
    ],
  },
  'care-worker-wages': {
    topic: 'Care Worker Wages',
    slug: 'care-worker-wages',
    href: '/care-worker-wages',
    colour: '#E63946',
    metrics: [
      { label: 'Median care worker hourly pay', value: '£10.66', unit: '/hr', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'Below Real Living Wage £12.00 · NHS Band 2 gets £12.45', sparklineData: [7.42, 7.91, 9.12, 9.50, 10.08, 10.66] },
      { label: 'Adult social care vacancy rate', value: '9.9', unit: '%', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: '152,000 vacancies · 28% annual turnover', sparklineData: [6.3, 6.4, 9.5, 10.6, 9.9] },
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
