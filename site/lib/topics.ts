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
    topics: ['health', 'nhs-waiting-lists', 'nhs-ae', 'nhs-beds', 'nhs-cancer', 'nhs-dentistry', 'nhs-discharge', 'nhs-mental-health', 'nhs-prescriptions', 'nhs-screening', 'nhs-staffing', 'nhs-vaccination', 'nhs-waiting-times', 'nhs-workforce', 'dental', 'maternity', 'long-covid', 'healthy-life-expectancy', 'infant-mortality', 'diabetes', 'dementia', 'antibiotic-resistance', 'community-pharmacies', 'cancer-survival', 'sexual-health', 'stroke', 'smoking', 'organ-donation', 'palliative-care', 'chronic-pain', 'blood-pressure', 'nhs-productivity', 'nhs-capital', 'learning-disabilities', 'nhs-sickness-absence', 'ambulance-handovers', 'fertility-treatment', 'gender-clinic', 'menopause-care', 'talking-therapies', 'hospital-infections', 'eye-care', 'cancer-diagnosis', 'childhood-obesity', 'maternity-safety', 'health-inequalities', 'gp-closures', 'preventable-deaths', 'long-term-conditions', 'nhs-dentistry-access', 'racial-health-gap', 'end-of-life', 'ambulance-response-times', 'cancer-screening-uptake', 'nhs-agency-spend', 'medication-shortages', 'clinical-negligence-costs', 'pharmacy-first-service', 'patient-safety-incidents', 'nhs-health-checks', 'nhs-international-workers', 'gp-list-size', 'nhs-111-pressures', 'diagnostic-imaging-waits', 'weight-loss-drug-access', 'nhs-estate-backlog', 'liver-disease-deaths', 'sepsis-outcomes', 'violence-against-nhs-staff', 'health-tech-adoption', 'personal-health-budgets', 'cancer-one-year-survival', 'ambulance-rural-response', 'birth-trauma', 'nhs-waiting-list-inequality', 'measles', 'adult-obesity', 'air-quality-deaths', 'alcohol-specific-deaths', 'audiology-waits', 'bowel-screening', 'breast-screening', 'cataract-waits', 'cervical-screening', 'child-tooth-decay', 'dementia-diagnosis-rate', 'hepatitis-c-treatment', 'hip-knee-waits', 'hospital-parking', 'hpv-vaccination', 'melanoma-rates', 'naloxone-provision', 'nhs-app-usage', 'nhs-overseas-cost-recovery', 'obesity-treatment-access', 'occupational-disease', 'oral-health-inequalities', 'same-day-emergency-care', 'food-hygiene-compliance', 'infant-feeding'],
  },
  {
    name: 'Mental Health & Wellbeing',
    slug: 'mental-health-wellbeing',
    featured: ['mental-health', 'mental-health-waits', 'suicide-prevention'],
    topics: ['mental-health', 'mental-health-waits', 'suicide-prevention', 'adhd-autism', 'wellbeing', 'loneliness', 'gambling', 'gambling-harm', 'eating-disorders', 'drugs', 'drug-misuse', 'alcohol', 'drug-deaths', 'obesity', 'physical-inactivity', 'child-mental-health', 'sport-participation', 'student-mental-health', 'addiction-services', 'talking-therapies', 'camhs-access', 'eating-disorder-waiting', 'workplace-stress-sickness', 'perinatal-mental-health', 'addiction-treatment-outcomes', 'social-prescribing', 'exercise-prescription', 'gambling-harm-treatment', 'antidepressant-prescribing', 'mental-health-crisis-beds', 'self-harm-hospital-admissions', 'men-mental-health-gap', 'screen-time-wellbeing', 'postnatal-depression-care', 'sleep-disorder-prevalence', 'adhd-waiting-times', 'loneliness-young-people', 'compulsive-gambling-youth', 'vaping-youth', 'adult-obesity', 'melanoma-rates', 'occupational-disease', 'sugar-levy-impact', 'alcohol-specific-deaths', 'gambling-advertising', 'online-gambling-growth', 'fixed-odds-betting-reform', 'volunteering-rates', 'physical-activity', 'nature-connection', 'loneliness-statistics', 'personal-wellbeing', 'grassroots-sport', 'alcohol-misuse'],
  },
  {
    name: 'Crime & Justice',
    slug: 'crime-justice',
    featured: ['justice', 'knife-crime', 'prisons'],
    topics: ['justice', 'knife-crime', 'prisons', 'prison-reoffending', 'court-backlog', 'policing', 'prison-overcrowding', 'domestic-abuse', 'domestic-violence', 'hate-crime', 'modern-slavery', 'online-harms', 'youth-justice', 'fraud', 'rape-prosecution', 'county-lines', 'stalking', 'family-courts', 'youth-violence', 'cybercrime', 'miscarriages-of-justice', 'victims-support', 'border-security', 'probation', 'legal-aid', 'prison-mental-health', 'police-misconduct', 'domestic-abuse-outcomes', 'anti-social-behaviour-crisis', 'knife-crime-geography', 'violence-against-women', 'police-officer-numbers', 'prisoner-recall', 'drug-supply-operations', 'drink-drive-deaths', 'fraud-prosecution-gap', 'terrorism-prosecutions', 'asset-recovery-rates', 'facial-recognition-policing', 'community-sentence-outcomes', 'youth-diversion-outcomes', 'court-interpreter-services', 'immigration-detention', 'civil-legal-aid-deserts', 'misogyny-policing', 'spiking-reports', 'shoplifting-surge', 'deaths-in-custody', 'employment-tribunal-backlog', 'forced-marriage', 'homicide-rate', 'honour-based-abuse', 'online-grooming', 'parole-backlog', 'prison-education', 'prison-healthcare', 'rape-reporting-rate', 'scam-losses', 'stop-and-search', 'court-fees-access', 'economic-crime-scale', 'loan-sharks', 'online-fraud-losses', 'online-fraud-growth'],
  },
  {
    name: 'Economy & Work',
    slug: 'economy-work',
    featured: ['economy', 'work', 'economic-inactivity'],
    topics: ['economy', 'work', 'economic-inactivity', 'youth-unemployment', 'productivity', 'trade', 'insecure-work', 'gender-pay-gap', 'strikes', 'high-streets', 'apprenticeships', 'small-business', 'tax-evasion', 'trade-unions', 'self-employment', 'food-production', 'executive-pay', 'national-debt', 'gig-economy', 'living-wage', 'in-work-poverty', 'skills-shortage', 'food-inflation', 'pension-deficits', 'creative-industries', 'zero-hours-contracts', 'insolvencies', 'real-wages', 'rd-investment', 'economic-growth', 'north-south-divide', 'housing-costs-workers', 'regional-pay', 'savings-crisis', 'supply-chain', 'uk-eu-trade', 'startup-investment', 'profit-shifting', 'automation-displacement', 'export-goods-services', 'high-street-vacancy', 'pension-savings-gap', 'ethnicity-pay-gap', 'disability-pay-gap', 'youth-wages', 'workplace-fatalities', 'sick-leave-costs', 'flexible-working-access', 'hybrid-work-geography', 'sickness-benefit-claimants', 'uk-productivity-gap', 'business-investment-rate', 'ai-adoption-business', 'financial-inclusion', 'wage-theft', 'female-entrepreneurship', 'care-economy-value', 'trade-deficit', 'redundancy-rates', 'regional-gdp-gap', 'inflation-by-income', 'public-sector-pay-gap', 'public-sector-staffing', 'returnerships', 'consumer-credit-stress', 'council-tax-bailiffs', 'credit-union-membership', 'green-skills-gap', 'household-savings-rate', 'manufacturing-output', 'night-time-economy', 'over-50s-employment', 'pension-auto-enrolment', 'remote-work-access', 'second-job-holders', 'services-exports-uk', 'tourism-spending', 'uc-deductions', 'wage-theft', 'worker-monitoring', 'business-survival', 'trade-balance', 'tax-burden', 'council-funding', 'cost-of-borrowing', 'regional-investment', 'startup-survival', 'regional-unemployment', 'economic-inactivity-sickness', 'gender-pay-gap-report', 'earnings-by-sector', 'sickness-absence', 'trade-union-membership', 'workplace-accidents', 'gig-worker-rights', 'self-employment-earnings', 'apprenticeship-completion', 'broadband-coverage', 'bus-services', 'equity-release-market', 'food-standards-post-brexit', 'household-inflation', 'regional-gdp'],
  },
  {
    name: 'Housing',
    slug: 'housing',
    featured: ['housing', 'homelessness', 'housebuilding'],
    topics: ['housing', 'homelessness', 'housebuilding', 'housing-quality', 'private-renting', 'social-housing', 'rough-sleeping', 'planning', 'empty-homes', 'leasehold', 'building-safety', 'second-homes', 'evictions', 'land-banking', 'planning-permission', 'housing-costs-workers', 'cladding-crisis', 'holiday-lets', 'renters-reform', 'net-housing-supply', 'social-rent', 'property-transactions', 'construction-housebuilding', 'flood-insurance-gaps', 'concealed-homelessness', 'mortgage-affordability-shock', 'private-rented-conditions', 'multigenerational-living', 'supported-housing-shortage', 'urban-rural-price-gap', 'build-to-rent-sector', 'social-housing-waiting-lists', 'housing-disrepair-claims', 'short-term-lets-impact', 'traveller-site-provision', 'cohabitation-rights-gap', 'modular-housing', 'green-belt-pressure', 'buy-to-let-exit', 'care-home-supply', 'community-asset-ownership', 'domestic-abuse-refuges', 'equity-release-market', 'housing-first-programme', 'lpa-capacity-crisis', 'military-housing-quality', 'planning-appeals', 'right-to-buy', 'veteran-rough-sleeping'],
  },
  {
    name: 'Education & Skills',
    slug: 'education-skills',
    featured: ['education', 'universities', 'teacher-shortage'],
    topics: ['education', 'universities', 'teacher-shortage', 'university-funding', 'school-exclusions', 'childcare', 'student-debt', 'early-years', 'school-buildings', 'adult-education', 'school-funding', 'send-crisis', 'graduate-outcomes', 'pupil-premium', 'arts-in-schools', 'oxbridge-state-access', 'fe-college-funding', 'adult-literacy-levels', 'neet-young-people', 'teacher-real-pay', 'vocational-pathways', 'school-absence-trends', 'school-mental-health-support', 'university-dropout-rates', 'private-school-charity-status', 'digital-skills-gap', 'stem-gender-gap', 'special-school-places', 'looked-after-children-education', 'postgraduate-funding', 'school-overcrowding', 'youth-social-action', 'alternative-provision', 'school-building-condition', 'school-meals-procurement', 'disability-sport-gap', 'family-hubs', 'grassroots-sport', 'home-education', 'infant-feeding', 'phonics-outcomes', 'private-school-vat', 'school-catchment-inequality', 'school-readiness', 'speech-language-delays', 'student-loan-economics', 'youth-club-closures'],
  },
  {
    name: 'Poverty & Cost of Living',
    slug: 'poverty-cost-of-living',
    featured: ['child-poverty', 'food-banks', 'energy-bills'],
    topics: ['child-poverty', 'food-banks', 'energy-bills', 'poverty', 'inequality', 'fuel-poverty', 'personal-debt', 'benefits', 'universal-credit', 'pensions', 'pensioner-poverty', 'food-insecurity', 'wealth-inequality', 'food-deserts', 'funeral-poverty', 'period-poverty', 'rent-arrears', 'in-work-poverty', 'housing-benefit', 'council-tax', 'child-poverty-regions', 'disability-poverty', 'carer-poverty', 'water-affordability', 'transport-cost-poverty', 'debt-enforcement-hardship', 'inheritance-inequality', 'benefit-sanction-impact', 'winter-fuel-payment-reform', 'geographic-wealth-inequality', 'childcare-cost-barrier', 'holiday-hunger', 'payday-loan-decline', 'energy-disconnections', 'council-tax-debt', 'pension-credit-take-up', 'car-insurance-poverty', 'emergency-dental-access', 'financial-abuse-elderly', 'over-the-counter-medicine-costs', 'pet-food-banks', 'uniform-cost-burden', 'council-tax-bailiffs', 'uc-deductions', 'pension-auto-enrolment', 'credit-union-membership', 'equity-release-market', 'child-poverty-local', 'household-income-inequality', 'pip-assessment', 'benefit-delays', 'debt-enforcement', 'pension-credit-uptake', 'income-mobility', 'food-bank-growth', 'universal-credit-stats', 'wealth-gini'],
  },
  {
    name: 'Environment & Climate',
    slug: 'environment-climate',
    featured: ['water', 'net-zero', 'air-quality'],
    topics: ['water', 'net-zero', 'air-quality', 'environment', 'biodiversity', 'flooding', 'waste', 'recycling', 'flood-risk', 'urban-heat', 'soil-health', 'marine-environment', 'energy-efficiency', 'plastic-pollution', 'trees-and-forests', 'noise-pollution', 'rewilding', 'solar-power', 'onshore-wind', 'aviation-emissions', 'peatlands', 'food-waste', 'chalk-streams', 'green-jobs', 'river-bathing', 'heat-mortality', 'habitat-condition', 'farming-subsidies', 'offshore-wind', 'circular-economy', 'wildfire-risk', 'nature-recovery', 'clean-energy-investment', 'uk-carbon-budget', 'coastal-erosion-risk', 'pesticide-reduction', 'water-stress-regions', 'urban-canopy-cover', 'microplastics-contamination', 'nitrogen-water-pollution', 'grid-battery-storage', 'fishing-catch-quotas', 'retrofit-insulation', 'agricultural-emissions', 'ancient-woodland-loss', 'air-quality-schools', 'heat-network-rollout', 'packaging-waste-recycling', 'carbon-capture-progress', 'nature-based-solutions', 'ocean-acidification', 'light-pollution', 'e-waste-recycling', 'wildfire-risk-uk', 'water-lead-pipes', 'climate-adaptation-costs', 'community-energy', 'fly-tipping-england', 'habitat-net-gain', 'single-use-plastic-reduction', 'textile-waste', 'urban-green-space', 'water-company-leakage', 'waste-flows', 'landfill-capacity', 'plastic-exports', 'packaging-recycling', 'food-waste-volume', 'incineration-growth', 'recycling-contamination', 'waste-crime', 'bathing-water', 'renewable-energy', 'tree-planting', 'biodiversity-loss', 'air-pollution-hotspots', 'plastic-pollution-rivers', 'carbon-budget-progress', 'flooding-risk', 'fly-tipping', 'greenhouse-gas-emissions', 'recycling-rates'],
  },
  {
    name: 'Infrastructure & Services',
    slug: 'infrastructure-services',
    featured: ['energy', 'rail', 'broadband'],
    topics: ['energy', 'energy-security', 'rail', 'broadband', 'transport', 'road-safety', 'rural-services', 'libraries', 'digital-inclusion', 'digital-exclusion', 'pothole-roads', 'post-offices', 'public-toilets', 'water-infrastructure', 'electric-vehicles', 'heat-pumps', 'cycling-infrastructure', 'ev-charging', 'train-punctuality', 'bus-service-cuts', 'active-travel-investment', 'airport-capacity-utilisation', 'smart-meter-rollout', '5g-coverage-inequality', 'pavement-parking', 'bridge-maintenance-backlog', 'cycling-fatalities', 'rail-fares', 'road-casualties', 'internet-access', 'mobile-coverage', 'data-breach-volume', 'ai-in-public-services', 'tech-sector-employment', 'digital-skills-adults', 'platform-economy-gig', 'national-travel-survey', 'fuel-prices', 'transport-poverty', 'cycling-safety', 'rail-fares-increase', 'parking-costs', 'freight-road-share', 'road-conditions', 'rail-performance'],
  },
  {
    name: 'Society & Democracy',
    slug: 'society-democracy',
    featured: ['immigration', 'democracy', 'demographics'],
    topics: ['immigration', 'democracy', 'demographics', 'asylum-system', 'social-mobility', 'public-debt', 'local-gov', 'council-finances', 'voter-turnout', 'coastal-communities', 'regional-inequality', 'racial-inequality', 'judicial-diversity', 'press-freedom', 'volunteering', 'social-media-harm', 'arts-funding', 'public-broadcasting', 'civil-liberties', 'military-spending', 'foreign-aid', 'net-migration', 'council-tax', 'creative-industries', 'health-inequalities', 'racial-health-gap', 'north-south-divide', 'regional-pay', 'birth-rate', 'trust-institutions', 'civic-participation', 'military-recruitment', 'local-press-closures', 'electoral-registration-gap', 'community-cohesion-survey', 'marriage-cohabitation-trends', 'protest-policing', 'charity-sector-finances', 'social-enterprise-growth', 'faith-community-trends', 'ethnic-minority-poverty', 'disability-hate-crime', 'voter-id-impact', 'heritage-at-risk', 'defence-spending', 'lobbying-donations', 'foi-response-times', 'public-private-finance', 'voter-registration', 'local-election-turnout', 'council-bankruptcy', 'public-sector-productivity', 'population-growth', 'modern-slavery-referrals', 'visa-processing-times', 'net-migration-composition', 'immigration-detention-length', 'refugee-resettlement', 'deportation-rates', 'asylum-backlog', 'fertility-rate', 'small-boats', 'trust-in-government', 'military-housing-quality', 'youth-club-closures'],
  },
  {
    name: 'Care & Support',
    slug: 'care-support',
    featured: ['social-care', 'unpaid-carers', 'disability-employment'],
    topics: ['social-care', 'unpaid-carers', 'disability-employment', 'young-carers', 'care-leavers', 'veterans', 'child-protection', 'care-homes', 'learning-disabilities', 'kinship-care', 'foster-care', 'adoption', 'nhs-race-inequality', 'home-care', 'hospice-funding', 'veteran-mental-health', 'end-of-life', 'care-home-fees', 'social-care-waiting', 'young-people-care', 'care-worker-wages', 'dementia-support-gaps', 'pip-assessment-backlog', 'care-home-cqc-quality', 'social-care-workforce-crisis', 'carer-mental-health', 'disabled-children-care', 'hospice-capacity-gap', 'learning-disability-inpatient', 'autism-adult-diagnosis', 'respite-care-shortage', 'prison-reentry-support', 'bereavement-support', 'loneliness-elderly', 'refugee-mental-health-support', 'kinship-care-support', 'care-home-staffing', 'social-care-turnover'],
  },
  {
    name: 'Children & Families',
    slug: 'children-families',
    featured: ['children-in-care', 'free-school-meals-gap', 'early-years-quality'],
    topics: ['children-in-care', 'foster-placement-shortage', 'child-criminal-exploitation', 'special-guardianship-use', 'teen-conception-rates', 'school-uniform-costs', 'free-school-meals-gap', 'shared-parental-leave', 'child-maintenance-enforcement', 'early-years-quality', 'school-meals-standards', 'infant-food-poverty', 'baby-loss-support', 'phonics-outcomes', 'school-readiness', 'speech-language-delays', 'home-education', 'infant-feeding', 'child-tooth-decay'],
  },
  {
    name: 'Food & Farming',
    slug: 'food-farming',
    featured: ['food-insecurity', 'food-standards-post-brexit', 'food-hygiene-compliance'],
    topics: ['food-insecurity', 'food-banks', 'food-inflation', 'food-deserts', 'food-production', 'agricultural-emissions', 'farming-subsidies', 'food-hygiene-compliance', 'food-standards-post-brexit', 'sugar-levy-impact', 'ultra-processed-food', 'meat-consumption-trend', 'infant-feeding', 'holiday-hunger', 'food-waste', 'school-meals-procurement'],
  },
  {
    name: 'Fraud & Economic Crime',
    slug: 'fraud-economic-crime',
    featured: ['fraud', 'scam-losses', 'online-fraud-losses'],
    topics: ['fraud', 'fraud-prosecution-gap', 'cybercrime', 'online-harms', 'online-fraud-losses', 'scam-losses', 'economic-crime-scale', 'loan-sharks', 'wage-theft', 'tax-evasion', 'profit-shifting', 'asset-recovery-rates', 'gambling-advertising', 'online-gambling-growth', 'fixed-odds-betting-reform', 'shoplifting-surge'],
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
  'measles': {
    topic: 'Measles & Vaccination',
    slug: 'measles',
    href: '/health#sec-measles',
    colour: '#E63946',
    metrics: [
      { label: 'Measles cases (2024)', value: '2,089', unit: 'cases', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'highest since 2013 · West Midlands outbreak', sparklineData: [2030, 1843, 1400, 95, 541, 259, 991, 778, 26, 52, 54, 330, 2089] },
      { label: 'MMR dose 2 coverage', value: '86.0', unit: '%', direction: 'down' as const, polarity: 'up-is-good' as const, context: '9pp below 95% herd immunity threshold', sparklineData: [85.5, 86.4, 87.2, 87.6, 87.4, 87.5, 88.0, 87.1, 85.8, 85.9, 86.1, 86.0] },
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
  'recycling': {
    topic: 'Recycling',
    slug: 'recycling',
    href: '/recycling',
    colour: '#5C7A4E',
    preposition: 'in',
    metrics: [
      { label: 'England recycling rate', value: '43.8', unit: '%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'stalled since 2011 · target: 65% by 2035', sparklineData: [40.4, 43.0, 43.8, 44.2, 45.7, 44.7, 43.9, 44.1, 44.6, 43.8] },
      { label: 'Best vs worst council', value: '66% vs 19%', direction: 'flat' as const, polarity: 'neutral' as const, context: 'South Oxfordshire vs Tower Hamlets', sparklineData: [] },
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
  // ── Batch 1: NHS & Healthcare ──────────────────────────────────────────────
  'ambulance-response-times': {
    topic: 'Ambulance Response Times',
    slug: 'ambulance-response-times',
    href: '/ambulance-response-times',
    colour: '#E63946',
    metrics: [
      { label: 'Cat 2 mean response', value: '36.5', unit: 'min', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'target 18 min · doubled since 2010', sparklineData: [17, 19, 22, 25, 28, 32, 36, 34, 36, 36.5] },
      { label: 'Cat 1 mean response', value: '8.9', unit: 'min', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'target 7 min', sparklineData: [7.1, 7.2, 7.5, 7.8, 8.0, 8.4, 9.1, 8.9, 9.0, 8.9] },
    ],
  },
  'cancer-screening-uptake': {
    topic: 'Cancer Screening Uptake',
    slug: 'cancer-screening-uptake',
    href: '/cancer-screening-uptake',
    colour: '#E63946',
    metrics: [
      { label: 'Bowel screening uptake', value: '67%', unit: '', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'below 75% target · millions missing checks', sparklineData: [58, 59, 60, 61, 58, 55, 64, 67, 67] },
      { label: 'Cervical screening', value: '70%', unit: '', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'lowest in 20 years', sparklineData: [79, 78, 78, 77, 75, 73, 72, 71, 70] },
    ],
  },
  'nhs-agency-spend': {
    topic: 'NHS Agency Spend',
    slug: 'nhs-agency-spend',
    href: '/nhs-agency-spend',
    colour: '#E63946',
    metrics: [
      { label: 'Agency/locum spend', value: '£3.3bn', unit: '/yr', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '+65% since 2019 · premium rates', sparklineData: [2.0, 2.1, 2.2, 2.4, 2.5, 2.7, 2.9, 3.1, 3.3] },
      { label: 'Agency nurses share', value: '8%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'of total nurse hours', sparklineData: [4, 4, 5, 5, 6, 7, 8, 8, 8] },
    ],
  },
  'medication-shortages': {
    topic: 'Medication Shortages',
    slug: 'medication-shortages',
    href: '/medication-shortages',
    colour: '#E63946',
    metrics: [
      { label: 'Drugs in shortage', value: '86', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'DHSC alerts active · 3× pre-pandemic', sparklineData: [28, 30, 29, 32, 35, 40, 58, 72, 86] },
      { label: 'ADHD meds shortage', value: '18 months', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'ongoing · demand outstrips supply', sparklineData: [0, 0, 0, 0, 0, 6, 12, 18, 18] },
    ],
  },
  'clinical-negligence-costs': {
    topic: 'Clinical Negligence Costs',
    slug: 'clinical-negligence-costs',
    href: '/clinical-negligence-costs',
    colour: '#E63946',
    metrics: [
      { label: 'Annual claims paid', value: '£2.8bn', unit: '/yr', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'growing 8% per year', sparklineData: [1.1, 1.4, 1.7, 2.0, 2.2, 2.4, 2.6, 2.7, 2.8] },
      { label: 'Outstanding liability', value: '£83bn', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'contingent NHS liability', sparklineData: [28, 35, 45, 55, 65, 71, 77, 80, 83] },
    ],
  },
  'pharmacy-first-service': {
    topic: 'Pharmacy First',
    slug: 'pharmacy-first-service',
    href: '/pharmacy-first-service',
    colour: '#E63946',
    metrics: [
      { label: 'Consultations (2024)', value: '1.2m', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'new service launched Jan 2024', sparklineData: [0, 0, 0, 0, 0, 200000, 600000, 900000, 1200000] },
      { label: 'GP appointments saved', value: '900k', unit: 'est.', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'potential deflection from GP', sparklineData: [0, 0, 0, 0, 0, 150000, 450000, 675000, 900000] },
    ],
  },
  'patient-safety-incidents': {
    topic: 'Patient Safety Incidents',
    slug: 'patient-safety-incidents',
    href: '/patient-safety-incidents',
    colour: '#E63946',
    metrics: [
      { label: 'Serious incidents reported', value: '12,400', unit: '/yr', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '+22% since 2018', sparklineData: [9200, 9800, 10200, 10800, 11200, 11800, 12100, 12400] },
      { label: 'Never events', value: '393', unit: '/yr', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'wholly preventable · target: zero', sparklineData: [420, 398, 445, 430, 421, 399, 388, 393] },
    ],
  },
  'nhs-health-checks': {
    topic: 'NHS Health Checks',
    slug: 'nhs-health-checks',
    href: '/nhs-health-checks',
    colour: '#E63946',
    metrics: [
      { label: 'Checks delivered 2023', value: '1.35m', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'recovering post-COVID · below 1.5m target', sparklineData: [1.5, 1.5, 1.4, 1.1, 0.5, 0.8, 1.1, 1.3, 1.35] },
      { label: 'Eligible not checked', value: '72%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'of eligible 40-74 year olds missed', sparklineData: [67, 68, 69, 72, 85, 80, 76, 73, 72] },
    ],
  },
  'nhs-international-workers': {
    topic: 'NHS International Workers',
    slug: 'nhs-international-workers',
    href: '/nhs-international-workers',
    colour: '#E63946',
    metrics: [
      { label: 'International recruits 2023', value: '53,000', unit: '/yr', direction: 'up' as const, polarity: 'up-is-good' as const, context: '26% of all new joiners · record high', sparklineData: [15000, 16000, 18000, 20000, 22000, 26000, 36000, 46000, 53000] },
      { label: 'Share of nursing workforce', value: '22%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'internationally trained nurses', sparklineData: [16, 17, 17, 18, 18, 19, 20, 21, 22] },
    ],
  },
  'gp-list-size': {
    topic: 'GP List Size',
    slug: 'gp-list-size',
    href: '/gp-list-size',
    colour: '#E63946',
    metrics: [
      { label: 'Patients per GP FTE', value: '2,273', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '+21% since 2015 · workforce not keeping pace', sparklineData: [1870, 1920, 1980, 2050, 2110, 2180, 2220, 2250, 2273] },
      { label: 'GPs per 100k population', value: '56', unit: '', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'vs EU average 70+ · chronic under-supply', sparklineData: [64, 63, 62, 61, 60, 59, 58, 57, 56] },
    ],
  },

  // ── Batch 2: Mental Health & Wellbeing ────────────────────────────────────
  'camhs-access': {
    topic: 'CAMHS Access',
    slug: 'camhs-access',
    href: '/camhs-access',
    colour: '#264653',
    metrics: [
      { label: 'Children waiting for CAMHS', value: '109,000', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '+68% since 2019', sparklineData: [65000, 70000, 78000, 88000, 94000, 82000, 89000, 98000, 109000] },
      { label: 'Average wait (weeks)', value: '18', unit: 'wks', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'some areas 52+ weeks', sparklineData: [8, 9, 10, 12, 14, 15, 16, 17, 18] },
    ],
  },
  'eating-disorder-waiting': {
    topic: 'Eating Disorder Waiting Times',
    slug: 'eating-disorder-waiting',
    href: '/eating-disorder-waiting',
    colour: '#264653',
    metrics: [
      { label: 'Meeting 4-week standard', value: '78%', unit: '', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'target 95% · 1 in 4 wait too long', sparklineData: [76, 73, 70, 68, 63, 72, 75, 77, 78] },
      { label: 'Children waiting >18 weeks', value: '11%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'of urgent referrals', sparklineData: [6, 7, 9, 12, 15, 12, 11, 11, 11] },
    ],
  },
  'workplace-stress-sickness': {
    topic: 'Workplace Stress & Sickness',
    slug: 'workplace-stress-sickness',
    href: '/workplace-stress-sickness',
    colour: '#264653',
    metrics: [
      { label: 'Days lost to stress 2023', value: '17.1m', unit: 'days', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '51% of all work-related illness', sparklineData: [11.5, 12.5, 12.8, 15.4, 17.9, 13.7, 14.3, 15.8, 17.1] },
      { label: 'Workers affected', value: '875,000', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'new/worsening work-related stress', sparklineData: [526000, 573000, 602000, 620000, 828000, 729000, 764000, 828000, 875000] },
    ],
  },
  'perinatal-mental-health': {
    topic: 'Perinatal Mental Health',
    slug: 'perinatal-mental-health',
    href: '/perinatal-mental-health',
    colour: '#264653',
    metrics: [
      { label: 'Women in perinatal services', value: '57,000', unit: '/yr', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up from 31k in 2019', sparklineData: [18000, 22000, 28000, 31000, 24000, 35000, 45000, 51000, 57000] },
      { label: 'Still untreated estimate', value: '100,000', unit: '/yr', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'significant treatment gap remains', sparklineData: [130000, 125000, 120000, 117000, 130000, 120000, 110000, 107000, 100000] },
    ],
  },
  'addiction-treatment-outcomes': {
    topic: 'Addiction Treatment Outcomes',
    slug: 'addiction-treatment-outcomes',
    href: '/addiction-treatment-outcomes',
    colour: '#264653',
    metrics: [
      { label: 'Successful completions', value: '48%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'of those leaving treatment drug-free', sparklineData: [51, 49, 47, 46, 45, 41, 44, 46, 48] },
      { label: 'Drug deaths 2022', value: '4,907', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'record high · treatment gap', sparklineData: [2248, 2479, 2655, 3756, 4139, 4561, 4859, 4758, 4907] },
    ],
  },
  'social-prescribing': {
    topic: 'Social Prescribing',
    slug: 'social-prescribing',
    href: '/social-prescribing',
    colour: '#264653',
    metrics: [
      { label: 'Link workers in post', value: '3,100', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'NHS Long Term Plan target 3,000 met', sparklineData: [200, 500, 900, 1400, 2000, 2500, 2800, 3000, 3100] },
      { label: 'Referrals 2023', value: '900,000', unit: '/yr', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'loneliness, anxiety, long-term conditions', sparklineData: [50000, 150000, 300000, 450000, 600000, 700000, 800000, 850000, 900000] },
    ],
  },
  'exercise-prescription': {
    topic: 'Exercise on Prescription',
    slug: 'exercise-prescription',
    href: '/exercise-prescription',
    colour: '#264653',
    metrics: [
      { label: 'Physically inactive adults', value: '34%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'below recommended activity levels', sparklineData: [36, 35, 35, 34, 38, 36, 35, 34, 34] },
      { label: 'Active travel schemes', value: '£720m', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'government investment 2021-25', sparklineData: [120, 150, 180, 200, 340, 440, 560, 650, 720] },
    ],
  },
  'gambling-harm-treatment': {
    topic: 'Gambling Harm Treatment',
    slug: 'gambling-harm-treatment',
    href: '/gambling-harm-treatment',
    colour: '#264653',
    metrics: [
      { label: 'Problem gamblers in treatment', value: '8,500', unit: '/yr', direction: 'up' as const, polarity: 'up-is-good' as const, context: '+62% since 2019', sparklineData: [3500, 3800, 4200, 5200, 4100, 5300, 6700, 7900, 8500] },
      { label: 'Problem gamblers estimated', value: '340,000', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: '97% receiving no treatment', sparklineData: [430000, 420000, 390000, 370000, 380000, 350000, 340000, 340000, 340000] },
    ],
  },

  // ── Batch 2 cont.: Economy ────────────────────────────────────────────────
  'uk-eu-trade': {
    topic: 'UK-EU Trade',
    slug: 'uk-eu-trade',
    href: '/uk-eu-trade',
    colour: '#F4A261',
    metrics: [
      { label: 'Goods exports to EU', value: '-17%', unit: '', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'vs pre-Brexit trend 2016-23', sparklineData: [100, 100, 100, 98, 86, 81, 83, 84, 83] },
      { label: 'Services exports to EU', value: '+8%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'recovering · financial services resilient', sparklineData: [100, 100, 100, 97, 95, 98, 102, 106, 108] },
    ],
  },
  'clean-energy-investment': {
    topic: 'Clean Energy Investment',
    slug: 'clean-energy-investment',
    href: '/clean-energy-investment',
    colour: '#264653',
    metrics: [
      { label: 'Clean energy investment', value: '£60bn', unit: '/yr', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'record in 2023 · solar + wind dominant', sparklineData: [20, 24, 28, 32, 36, 40, 46, 54, 60] },
      { label: 'Renewables share of power', value: '48%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'of UK electricity generation', sparklineData: [19, 24, 30, 33, 37, 40, 42, 45, 48] },
    ],
  },

  // ── Batch 3: Economy & Work ────────────────────────────────────────────────
  'startup-investment': {
    topic: 'Startup Investment',
    slug: 'startup-investment',
    href: '/startup-investment',
    colour: '#F4A261',
    metrics: [
      { label: 'VC investment 2023', value: '£17bn', unit: '', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down from £26bn peak · tech correction', sparklineData: [5, 8, 11, 16, 22, 26, 21, 18, 17] },
      { label: 'UK global VC rank', value: '3rd', unit: '', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'behind US and China', sparklineData: [3, 3, 3, 3, 3, 3, 3, 3, 3] },
    ],
  },
  'profit-shifting': {
    topic: 'Profit Shifting',
    slug: 'profit-shifting',
    href: '/profit-shifting',
    colour: '#F4A261',
    metrics: [
      { label: 'Tax gap estimate', value: '£36bn', unit: '/yr', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: '4.8% of total tax liability', sparklineData: [33, 34, 35, 34, 36, 33, 35, 36, 36] },
      { label: 'Corp tax gap', value: '£9.4bn', unit: '/yr', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'avoidance + evasion · HMRC estimate', sparklineData: [5, 6, 7, 8, 8, 8, 9, 9, 9.4] },
    ],
  },
  'automation-displacement': {
    topic: 'Automation & Job Displacement',
    slug: 'automation-displacement',
    href: '/automation-displacement',
    colour: '#F4A261',
    metrics: [
      { label: 'Jobs at high automation risk', value: '7.4m', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: '22% of UK workforce', sparklineData: [8.5, 8.2, 7.9, 7.8, 7.7, 7.6, 7.5, 7.5, 7.4] },
      { label: 'Automation investment', value: '£4.4bn', unit: '/yr', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'robotics + AI adoption rising', sparklineData: [2.0, 2.3, 2.7, 3.0, 3.2, 3.5, 3.9, 4.2, 4.4] },
    ],
  },
  'property-transactions': {
    topic: 'Property Transactions',
    slug: 'property-transactions',
    href: '/property-transactions',
    colour: '#F4A261',
    metrics: [
      { label: 'Transactions 2023', value: '1.01m', unit: '', direction: 'down' as const, polarity: 'up-is-good' as const, context: '25-year low excl. pandemic', sparklineData: [1.2, 1.22, 1.23, 1.18, 1.02, 0.88, 1.48, 1.12, 1.01] },
      { label: 'Mortgage approvals', value: '51k', unit: '/mo', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'below pre-2022 average of 65k', sparklineData: [65, 66, 64, 67, 62, 45, 40, 48, 51] },
    ],
  },
  'construction-housebuilding': {
    topic: 'Construction & Housebuilding',
    slug: 'construction-housebuilding',
    href: '/construction-housebuilding',
    colour: '#F4A261',
    metrics: [
      { label: 'New homes completed', value: '234,000', unit: '/yr', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'vs 300k/yr government target', sparklineData: [158000, 183000, 213000, 241000, 244000, 213000, 234000, 242000, 234000] },
      { label: 'Planning permissions', value: '237,000', unit: '/yr', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'falling 3rd year running', sparklineData: [306000, 320000, 340000, 345000, 336000, 290000, 275000, 255000, 237000] },
    ],
  },
  'export-goods-services': {
    topic: 'Export of Goods & Services',
    slug: 'export-goods-services',
    href: '/export-goods-services',
    colour: '#F4A261',
    metrics: [
      { label: 'Total exports 2023', value: '£845bn', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'goods + services combined', sparklineData: [540, 580, 620, 660, 640, 680, 740, 810, 845] },
      { label: 'Exports as % of GDP', value: '30%', unit: '', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'below pre-Brexit 32%', sparklineData: [32, 32, 32, 31, 28, 29, 30, 30, 30] },
    ],
  },
  'high-street-vacancy': {
    topic: 'High Street Vacancy',
    slug: 'high-street-vacancy',
    href: '/high-street-vacancy',
    colour: '#F4A261',
    metrics: [
      { label: 'Vacancy rate 2024', value: '14.1%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'stabilised but above pre-pandemic 10%', sparklineData: [10, 10, 12, 14, 16, 15, 14, 14, 14.1] },
      { label: 'Retail closures net 2023', value: '-7,600', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'net store losses per year', sparklineData: [-17000, -14000, -9000, -12000, -11000, -7600, -7200, -7400, -7600] },
    ],
  },
  'pension-savings-gap': {
    topic: 'Pension Savings Gap',
    slug: 'pension-savings-gap',
    href: '/pension-savings-gap',
    colour: '#F4A261',
    metrics: [
      { label: 'Under-saving workers', value: '38%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'not on track for adequate pension', sparklineData: [50, 47, 44, 42, 40, 39, 38, 38, 38] },
      { label: 'Auto-enrolled workers', value: '22.6m', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: '+13m since 2012 rollout', sparklineData: [1, 4, 7, 10, 13, 16, 19, 21, 22.6] },
    ],
  },
  'ethnicity-pay-gap': {
    topic: 'Ethnicity Pay Gap',
    slug: 'ethnicity-pay-gap',
    href: '/ethnicity-pay-gap',
    colour: '#F4A261',
    metrics: [
      { label: 'Overall ethnicity pay gap', value: '2.3%', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'ethnic minorities earn less than white workers', sparklineData: [3.8, 3.5, 3.1, 2.9, 2.7, 2.5, 2.4, 2.3, 2.3] },
      { label: 'Pakistani/Bangladeshi gap', value: '16%', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'largest gap by ethnicity', sparklineData: [20, 19, 18, 17, 16, 15, 16, 16, 16] },
    ],
  },
  'disability-pay-gap': {
    topic: 'Disability Pay Gap',
    slug: 'disability-pay-gap',
    href: '/disability-pay-gap',
    colour: '#F4A261',
    metrics: [
      { label: 'Disability pay gap', value: '13.8%', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'disabled workers earn less', sparklineData: [16, 15.8, 15.2, 14.8, 14.4, 14.1, 13.9, 13.9, 13.8] },
      { label: 'Disabled employment gap', value: '28pp', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'employment rate below non-disabled', sparklineData: [34, 33, 32, 31, 30, 29, 29, 28, 28] },
    ],
  },

  // ── Batch 4: Economy & Work cont. + Environment ────────────────────────────
  'youth-wages': {
    topic: 'Youth Wages',
    slug: 'youth-wages',
    href: '/youth-wages',
    colour: '#F4A261',
    metrics: [
      { label: 'Real wages: under-25s', value: '-5%', unit: '', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'vs 2008 levels in real terms', sparklineData: [100, 99, 97, 95, 94, 94, 96, 96, 95] },
      { label: 'Under-25 NLW rate', value: '£8.60', unit: '/hr', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'lower than adult NLW of £11.44', sparklineData: [6.45, 6.70, 7.05, 7.38, 7.70, 8.00, 8.36, 8.60] },
    ],
  },
  'workplace-fatalities': {
    topic: 'Workplace Fatalities',
    slug: 'workplace-fatalities',
    href: '/workplace-fatalities',
    colour: '#F4A261',
    metrics: [
      { label: 'Fatal injuries 2023/24', value: '138', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'near record low · long-term decline', sparklineData: [250, 229, 200, 185, 175, 144, 142, 135, 138] },
      { label: 'Work-related deaths total', value: '13,000', unit: '/yr', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'inc. occupational disease', sparklineData: [20000, 18000, 17000, 15000, 14000, 13500, 13200, 13000, 13000] },
    ],
  },
  'sick-leave-costs': {
    topic: 'Sick Leave Costs',
    slug: 'sick-leave-costs',
    href: '/sick-leave-costs',
    colour: '#F4A261',
    metrics: [
      { label: 'Annual cost to employers', value: '£28bn', unit: '/yr', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '+18% since 2019', sparklineData: [18, 19, 20, 21, 23, 24, 25, 27, 28] },
      { label: 'Days lost per worker', value: '7.8', unit: 'days/yr', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'highest since 2004', sparklineData: [5.9, 6.1, 6.3, 6.6, 6.7, 7.8, 7.5, 7.7, 7.8] },
    ],
  },
  'flexible-working-access': {
    topic: 'Flexible Working Access',
    slug: 'flexible-working-access',
    href: '/flexible-working-access',
    colour: '#F4A261',
    metrics: [
      { label: 'Workers with flexible arrangements', value: '47%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: '+12pp since 2019', sparklineData: [30, 31, 32, 33, 35, 47, 46, 47, 47] },
      { label: 'Requests refused', value: '32%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'of flexible working requests denied', sparklineData: [36, 35, 34, 33, 32, 30, 31, 32, 32] },
    ],
  },
  'hybrid-work-geography': {
    topic: 'Hybrid Work Geography',
    slug: 'hybrid-work-geography',
    href: '/hybrid-work-geography',
    colour: '#F4A261',
    metrics: [
      { label: 'Working fully remote', value: '14%', unit: '', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'stabilised · hybrid settled at 2-3 days', sparklineData: [5, 5, 6, 6, 5, 37, 22, 16, 14] },
      { label: 'Hybrid workers (3+ days remote)', value: '28%', unit: '', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'of all employed workers', sparklineData: [5, 5, 5, 6, 6, 18, 28, 27, 28] },
    ],
  },
  'sickness-benefit-claimants': {
    topic: 'Sickness Benefit Claimants',
    slug: 'sickness-benefit-claimants',
    href: '/sickness-benefit-claimants',
    colour: '#F4A261',
    metrics: [
      { label: 'UC health element claimants', value: '3.4m', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '+1.4m since 2019 · unprecedented surge', sparklineData: [2.0, 2.1, 2.1, 2.1, 2.2, 2.5, 2.8, 3.2, 3.4] },
      { label: 'Economic inactivity: ill', value: '2.8m', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'long-term sick · record high', sparklineData: [2.0, 2.0, 2.0, 2.0, 2.0, 2.2, 2.5, 2.7, 2.8] },
    ],
  },
  'uk-carbon-budget': {
    topic: 'UK Carbon Budget',
    slug: 'uk-carbon-budget',
    href: '/uk-carbon-budget',
    colour: '#264653',
    metrics: [
      { label: 'Emissions 2023', value: '413 MtCO2e', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: '-5% vs 2022 · long-term decline', sparklineData: [740, 700, 660, 620, 590, 520, 460, 435, 413] },
      { label: 'Carbon Budget 5 on track', value: 'No', unit: '', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'CB5 (2028-32) at risk · pace too slow', sparklineData: [0, 0, 0, 0, 0, 0, 0, 0, 0] },
    ],
  },
  'coastal-erosion-risk': {
    topic: 'Coastal Erosion Risk',
    slug: 'coastal-erosion-risk',
    href: '/coastal-erosion-risk',
    colour: '#264653',
    metrics: [
      { label: 'Properties at risk by 2050', value: '100,000', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'coastal flood and erosion risk', sparklineData: [50000, 55000, 60000, 68000, 75000, 82000, 90000, 95000, 100000] },
      { label: 'Coastline eroding at 1m+/yr', value: '17%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'of England coastline', sparklineData: [14, 14, 15, 15, 16, 16, 17, 17, 17] },
    ],
  },
  'pesticide-reduction': {
    topic: 'Pesticide Reduction',
    slug: 'pesticide-reduction',
    href: '/pesticide-reduction',
    colour: '#264653',
    metrics: [
      { label: 'Pesticide sales (tonnes a.i.)', value: '11,600', unit: 't', direction: 'down' as const, polarity: 'up-is-bad' as const, context: '-23% since peak · but target further cuts', sparklineData: [15100, 14800, 14200, 13500, 13000, 12500, 12000, 11800, 11600] },
      { label: 'Pesticides in waterbodies', value: '49%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'of monitored UK freshwaters', sparklineData: [48, 48, 49, 49, 49, 48, 48, 49, 49] },
    ],
  },
  'water-stress-regions': {
    topic: 'Water Stress',
    slug: 'water-stress-regions',
    href: '/water-stress-regions',
    colour: '#264653',
    metrics: [
      { label: 'Areas in serious water stress', value: '16', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Environment Agency classification', sparklineData: [10, 11, 12, 12, 13, 14, 15, 15, 16] },
      { label: 'Per capita water use', value: '145', unit: 'litres/day', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'target 110 l/d by 2050', sparklineData: [155, 152, 150, 148, 147, 146, 145, 145, 145] },
    ],
  },

  // ── Batch 5: Environment + Housing ────────────────────────────────────────
  'urban-canopy-cover': {
    topic: 'Urban Tree Canopy',
    slug: 'urban-canopy-cover',
    href: '/urban-canopy-cover',
    colour: '#264653',
    metrics: [
      { label: 'Urban canopy cover England', value: '16%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'target 20% by 2050 · slow progress', sparklineData: [14, 14, 14, 15, 15, 15, 16, 16, 16] },
      { label: 'Trees planted 2023', value: '5.3m', unit: '/yr', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'below 30m/yr target for Net Zero', sparklineData: [1.2, 1.5, 2.0, 2.5, 2.9, 3.2, 4.0, 4.8, 5.3] },
    ],
  },
  'microplastics-contamination': {
    topic: 'Microplastics Contamination',
    slug: 'microplastics-contamination',
    href: '/microplastics-contamination',
    colour: '#264653',
    metrics: [
      { label: 'UK plastic in oceans', value: '150,000t', unit: '/yr', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'enters ocean each year', sparklineData: [152, 151, 150, 150, 150, 149, 149, 150, 150] },
      { label: 'Tap water contamination', value: '72%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'of UK tap water samples contain microplastics', sparklineData: [60, 63, 65, 67, 68, 70, 71, 72, 72] },
    ],
  },
  'nitrogen-water-pollution': {
    topic: 'Nitrogen Pollution',
    slug: 'nitrogen-water-pollution',
    href: '/nitrogen-water-pollution',
    colour: '#264653',
    metrics: [
      { label: 'Rivers in good chemical status', value: '14%', unit: '', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'nitrogen + phosphorus key driver', sparklineData: [20, 18, 17, 16, 15, 15, 14, 14, 14] },
      { label: 'Agriculture nitrogen surplus', value: '200 ktN', unit: '/yr', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'excess nitrogen entering waterways', sparklineData: [210, 208, 205, 202, 200, 199, 200, 200, 200] },
    ],
  },
  'grid-battery-storage': {
    topic: 'Grid Battery Storage',
    slug: 'grid-battery-storage',
    href: '/grid-battery-storage',
    colour: '#264653',
    metrics: [
      { label: 'Battery storage installed', value: '4.7 GW', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: '+300% in 5 years · grid balancing', sparklineData: [0.5, 0.7, 1.0, 1.5, 2.0, 2.8, 3.5, 4.0, 4.7] },
      { label: 'Pipeline projects', value: '35 GW', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'in planning/construction', sparklineData: [2, 4, 7, 12, 18, 22, 27, 31, 35] },
    ],
  },
  'fishing-catch-quotas': {
    topic: 'Fishing Catch Quotas',
    slug: 'fishing-catch-quotas',
    href: '/fishing-catch-quotas',
    colour: '#264653',
    metrics: [
      { label: 'UK fish landings 2023', value: '574,000t', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: '-8% vs pre-Brexit levels', sparklineData: [670, 650, 630, 620, 605, 590, 575, 570, 574] },
      { label: 'Stocks in sustainable range', value: '58%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'of assessed NE Atlantic stocks', sparklineData: [44, 45, 48, 50, 52, 54, 56, 57, 58] },
    ],
  },
  'flood-insurance-gaps': {
    topic: 'Flood Insurance Gaps',
    slug: 'flood-insurance-gaps',
    href: '/flood-insurance-gaps',
    colour: '#F4A261',
    metrics: [
      { label: 'Properties at high flood risk', value: '560,000', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'uninsurable without Flood Re', sparklineData: [300000, 350000, 400000, 450000, 490000, 510000, 530000, 545000, 560000] },
      { label: 'Flood Re policies active', value: '200,000', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'subsidised insurance scheme', sparklineData: [0, 50000, 80000, 110000, 140000, 160000, 175000, 188000, 200000] },
    ],
  },
  'concealed-homelessness': {
    topic: 'Concealed Homelessness',
    slug: 'concealed-homelessness',
    href: '/concealed-homelessness',
    colour: '#F4A261',
    metrics: [
      { label: 'Hidden homeless estimate', value: '219,000', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'sofa-surfing + overcrowded', sparklineData: [155000, 163000, 175000, 189000, 195000, 181000, 192000, 208000, 219000] },
      { label: 'Priority homeless decisions', value: '112,000', unit: '/yr', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '+54% since 2018', sparklineData: [72000, 76000, 79000, 82000, 75000, 82000, 94000, 104000, 112000] },
    ],
  },
  'mortgage-affordability-shock': {
    topic: 'Mortgage Affordability Shock',
    slug: 'mortgage-affordability-shock',
    href: '/mortgage-affordability-shock',
    colour: '#F4A261',
    metrics: [
      { label: 'Avg mortgage rate 2024', value: '4.9%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'vs 1.5% in 2021 · payment shock', sparklineData: [1.5, 1.4, 1.4, 1.5, 2.8, 4.2, 5.2, 5.0, 4.9] },
      { label: 'Mortgagors in arrears', value: '96,000', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '+55% since 2022', sparklineData: [74000, 72000, 68000, 65000, 62000, 62000, 71000, 87000, 96000] },
    ],
  },
  'retrofit-insulation': {
    topic: 'Retrofit Insulation',
    slug: 'retrofit-insulation',
    href: '/retrofit-insulation',
    colour: '#264653',
    metrics: [
      { label: 'Insulation measures 2023', value: '130,000', unit: '/yr', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'recovering · but far below 2013 peak of 2m', sparklineData: [1.9, 1.0, 0.7, 0.4, 0.35, 0.33, 0.10, 0.11, 0.13] },
      { label: 'EPC C or better homes', value: '47%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'target 2025 was all homes · not achievable', sparklineData: [20, 25, 30, 35, 38, 41, 44, 46, 47] },
    ],
  },
  'private-rented-conditions': {
    topic: 'Private Rented Conditions',
    slug: 'private-rented-conditions',
    href: '/private-rented-conditions',
    colour: '#F4A261',
    metrics: [
      { label: 'Non-decent private rentals', value: '21%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: '1.06m homes with hazards', sparklineData: [28, 26, 25, 24, 23, 22, 22, 21, 21] },
      { label: 'Category 1 hazards', value: '508,000', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'serious homes hazards in PRS', sparklineData: [600000, 580000, 560000, 540000, 525000, 515000, 510000, 508000, 508000] },
    ],
  },

  // ── Batch 6: Housing + Education ──────────────────────────────────────────
  'multigenerational-living': {
    topic: 'Multigenerational Living',
    slug: 'multigenerational-living',
    href: '/multigenerational-living',
    colour: '#F4A261',
    metrics: [
      { label: 'Multigenerational households', value: '1.8m', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: '+22% since 2011 · affordability driver', sparklineData: [1.4, 1.4, 1.5, 1.5, 1.6, 1.6, 1.7, 1.7, 1.8] },
      { label: 'Adults living with parents', value: '3.9m', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '20-34 year olds · +60% since 2000', sparklineData: [2.4, 2.5, 2.7, 2.9, 3.1, 3.3, 3.5, 3.7, 3.9] },
    ],
  },
  'supported-housing-shortage': {
    topic: 'Supported Housing Shortage',
    slug: 'supported-housing-shortage',
    href: '/supported-housing-shortage',
    colour: '#F4A261',
    metrics: [
      { label: 'Supported housing deficit', value: '63,000', unit: 'homes', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'unmet need across England', sparklineData: [40000, 43000, 47000, 51000, 55000, 57000, 60000, 62000, 63000] },
      { label: 'Annual spend', value: '£7.4bn', unit: '/yr', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'government supported housing spend', sparklineData: [7.0, 7.1, 7.2, 7.2, 7.3, 7.3, 7.3, 7.4, 7.4] },
    ],
  },
  'urban-rural-price-gap': {
    topic: 'Urban-Rural Price Gap',
    slug: 'urban-rural-price-gap',
    href: '/urban-rural-price-gap',
    colour: '#F4A261',
    metrics: [
      { label: 'Rural premium over urban', value: '32%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'rural homes cost 32% more than urban', sparklineData: [18, 20, 22, 24, 26, 28, 29, 30, 32] },
      { label: 'Rural wages vs urban', value: '-12%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'rural workers earn less · unaffordable', sparklineData: [-10, -10, -11, -11, -12, -12, -12, -12, -12] },
    ],
  },
  'build-to-rent-sector': {
    topic: 'Build-to-Rent',
    slug: 'build-to-rent-sector',
    href: '/build-to-rent-sector',
    colour: '#F4A261',
    metrics: [
      { label: 'BTR homes completed', value: '107,000', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'cumulative · fast-growing sector', sparklineData: [10000, 20000, 32000, 47000, 62000, 75000, 88000, 97000, 107000] },
      { label: 'BTR pipeline', value: '213,000', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'planning + under construction', sparklineData: [50000, 70000, 90000, 115000, 140000, 165000, 185000, 200000, 213000] },
    ],
  },
  'oxbridge-state-access': {
    topic: 'Oxbridge State School Access',
    slug: 'oxbridge-state-access',
    href: '/oxbridge-state-access',
    colour: '#2A9D8F',
    metrics: [
      { label: 'State school Oxbridge entrants', value: '68%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up from 54% in 2010 · progress but gap persists', sparklineData: [54, 56, 58, 60, 61, 63, 65, 67, 68] },
      { label: 'Private school Oxbridge share', value: '27%', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'vs 7% of all pupils educated privately', sparklineData: [44, 42, 40, 38, 36, 34, 32, 29, 27] },
    ],
  },
  'fe-college-funding': {
    topic: 'FE College Funding',
    slug: 'fe-college-funding',
    href: '/fe-college-funding',
    colour: '#2A9D8F',
    metrics: [
      { label: 'Real-terms funding cut', value: '-12%', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'per student since 2010', sparklineData: [100, 98, 94, 90, 87, 85, 87, 89, 88] },
      { label: 'Adult learners', value: '1.3m', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down from 3m+ in 2010', sparklineData: [3.1, 2.8, 2.4, 2.0, 1.8, 1.6, 1.4, 1.3, 1.3] },
    ],
  },
  'adult-literacy-levels': {
    topic: 'Adult Literacy',
    slug: 'adult-literacy-levels',
    href: '/adult-literacy-levels',
    colour: '#2A9D8F',
    metrics: [
      { label: 'Adults with low literacy', value: '7.1m', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: '16.4% of working-age adults', sparklineData: [7.0, 7.0, 7.1, 7.1, 7.1, 7.2, 7.1, 7.1, 7.1] },
      { label: 'Literacy below 11-year-old', value: '4.9m', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'reading at age 9-11 level or below', sparklineData: [5.1, 5.0, 4.9, 4.9, 4.9, 4.9, 4.9, 4.9, 4.9] },
    ],
  },
  'neet-young-people': {
    topic: 'NEET Young People',
    slug: 'neet-young-people',
    href: '/neet-young-people',
    colour: '#2A9D8F',
    metrics: [
      { label: 'NEET 16-24 year olds', value: '793,000', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '+12% since 2022 · mental health driver', sparklineData: [850000, 830000, 810000, 780000, 775000, 833000, 762000, 710000, 793000] },
      { label: 'NEET rate', value: '11.3%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'of all 16-24 year olds', sparklineData: [12.0, 11.8, 11.6, 11.1, 11.0, 12.1, 10.9, 10.2, 11.3] },
    ],
  },
  'school-meals-standards': {
    topic: 'School Meals Standards',
    slug: 'school-meals-standards',
    href: '/school-meals-standards',
    colour: '#F4A261',
    metrics: [
      { label: 'Schools failing standards', value: '24%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'of inspected schools · Ofsted data', sparklineData: [26, 26, 25, 25, 24, 24, 24, 24, 24] },
      { label: 'School meals cost inflation', value: '+43%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'since 2019 · budget pressure on quality', sparklineData: [0, 5, 8, 12, 18, 25, 32, 38, 43] },
    ],
  },
  'teacher-real-pay': {
    topic: 'Teacher Real Pay',
    slug: 'teacher-real-pay',
    href: '/teacher-real-pay',
    colour: '#2A9D8F',
    metrics: [
      { label: 'Real pay vs 2010', value: '-8%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'in real terms · decade of cuts', sparklineData: [100, 97, 93, 90, 89, 88, 87, 92, 92] },
      { label: 'Starting salary 2024', value: '£30,000', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'raised from £25,714 in 2022', sparklineData: [21588, 22244, 22917, 23720, 24373, 25714, 28000, 30000, 30000] },
    ],
  },

  // ── Batch 7: Education + Crime ────────────────────────────────────────────
  'vocational-pathways': {
    topic: 'Vocational Pathways',
    slug: 'vocational-pathways',
    href: '/vocational-pathways',
    colour: '#2A9D8F',
    metrics: [
      { label: 'T Level enrolments 2023', value: '6,200', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'new technical qualifications growing', sparklineData: [0, 1300, 3200, 5000, 6200] },
      { label: 'Apprenticeship starts', value: '742,000', unit: '/yr', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'below 500k Trailblazer pre-reform peak', sparklineData: [503000, 871000, 491000, 475000, 322000, 331000, 349000, 735000, 742000] },
    ],
  },
  'school-absence-trends': {
    topic: 'School Absence',
    slug: 'school-absence-trends',
    href: '/school-absence-trends',
    colour: '#2A9D8F',
    metrics: [
      { label: 'Persistent absence rate', value: '21.2%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'doubled since 2018-19', sparklineData: [10.9, 10.8, 10.9, 11.8, 22.5, 23.5, 21.2] },
      { label: 'Pupils missing 50%+ lessons', value: '1.6%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '140,000 pupils severely absent', sparklineData: [0.7, 0.7, 0.8, 1.0, 1.4, 1.6, 1.6] },
    ],
  },
  'domestic-abuse-outcomes': {
    topic: 'Domestic Abuse Outcomes',
    slug: 'domestic-abuse-outcomes',
    href: '/domestic-abuse-outcomes',
    colour: '#6B7280',
    metrics: [
      { label: 'DA-related crimes 2023', value: '1.5m', unit: '/yr', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'stable but high · dark figure larger', sparklineData: [0.97, 1.1, 1.27, 1.43, 1.48, 1.3, 1.37, 1.47, 1.5] },
      { label: 'Charge rate', value: '8.7%', unit: '', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'of DA crimes result in charge', sparklineData: [11.2, 11.0, 10.5, 9.8, 9.2, 8.5, 8.6, 8.7, 8.7] },
    ],
  },
  'anti-social-behaviour-crisis': {
    topic: 'Anti-Social Behaviour',
    slug: 'anti-social-behaviour-crisis',
    href: '/anti-social-behaviour-crisis',
    colour: '#6B7280',
    metrics: [
      { label: 'ASB incidents reported', value: '1.2m', unit: '/yr', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '+14% since 2019', sparklineData: [0.98, 1.01, 0.99, 0.98, 1.02, 1.05, 1.10, 1.15, 1.2] },
      { label: 'ASBOs/CPNs issued', value: '14,200', unit: '/yr', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'enforcement declining vs crime rising', sparklineData: [18000, 17000, 16000, 15200, 14800, 14500, 14300, 14200, 14200] },
    ],
  },
  'knife-crime-geography': {
    topic: 'Knife Crime Geography',
    slug: 'knife-crime-geography',
    href: '/knife-crime-geography',
    colour: '#6B7280',
    metrics: [
      { label: 'Knife offences 2023/24', value: '50,489', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'record high · stabbing admissions up', sparklineData: [32000, 36000, 40000, 44000, 46000, 43000, 46000, 49000, 50489] },
      { label: 'Knife homicides', value: '244', unit: '/yr', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'third highest on record', sparklineData: [213, 215, 226, 224, 259, 224, 270, 242, 244] },
    ],
  },
  'violence-against-women': {
    topic: 'Violence Against Women',
    slug: 'violence-against-women',
    href: '/violence-against-women',
    colour: '#6B7280',
    metrics: [
      { label: 'Rape reports 2023/24', value: '72,000', unit: '/yr', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'reports doubled since 2015', sparklineData: [39000, 48000, 58000, 63000, 67000, 71000, 74000, 72000, 72000] },
      { label: 'Rape charge rate', value: '3.3%', unit: '', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'tiny recovery from 3.2% record low', sparklineData: [10.4, 7.5, 4.9, 4.2, 3.9, 3.5, 3.2, 3.3, 3.3] },
    ],
  },
  'police-officer-numbers': {
    topic: 'Police Officer Numbers',
    slug: 'police-officer-numbers',
    href: '/police-officer-numbers',
    colour: '#6B7280',
    metrics: [
      { label: 'Officers 2024', value: '147,000', unit: '', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'near 2010 level · but less experience', sparklineData: [143734, 134000, 127909, 123142, 122404, 130396, 138858, 142526, 147000] },
      { label: '999 response time', value: '9.4 min', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'rising despite more officers · demand higher', sparklineData: [7.0, 7.4, 7.8, 8.1, 8.3, 8.5, 8.8, 9.0, 9.4] },
    ],
  },
  'prisoner-recall': {
    topic: 'Prisoner Recall',
    slug: 'prisoner-recall',
    href: '/prisoner-recall',
    colour: '#6B7280',
    metrics: [
      { label: 'Recalled prisoners', value: '14,200', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '+92% since 2015 · 12% of prison population', sparklineData: [7400, 8100, 8900, 9800, 10600, 9800, 11200, 12600, 14200] },
      { label: 'Avg recall duration', value: '4 months', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'consuming growing prison capacity', sparklineData: [2.8, 2.9, 3.0, 3.2, 3.4, 3.5, 3.7, 3.9, 4.0] },
    ],
  },
  'drug-supply-operations': {
    topic: 'Drug Supply Operations',
    slug: 'drug-supply-operations',
    href: '/drug-supply-operations',
    colour: '#6B7280',
    metrics: [
      { label: 'County lines disrupted', value: '2,700', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'cumulative since 2019 programme', sparklineData: [0, 300, 600, 1000, 1400, 1800, 2100, 2400, 2700] },
      { label: 'Drug deaths 2022', value: '4,907', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'record high · supply disruption not enough', sparklineData: [2248, 2479, 2655, 3756, 4139, 4561, 4859, 4758, 4907] },
    ],
  },
  'drink-drive-deaths': {
    topic: 'Drink Drive Deaths',
    slug: 'drink-drive-deaths',
    href: '/drink-drive-deaths',
    colour: '#6B7280',
    metrics: [
      { label: 'Drink-drive deaths 2022', value: '230', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'no reduction in a decade · plateau', sparklineData: [280, 270, 250, 240, 230, 220, 230, 240, 230] },
      { label: 'Drink-drive casualties', value: '6,480', unit: '/yr', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: '13% of all road casualties', sparklineData: [7560, 7080, 6840, 6600, 6360, 6120, 6480, 6600, 6480] },
    ],
  },

  // ── Batch 8: Children & Families ──────────────────────────────────────────
  'children-in-care': {
    topic: 'Children in Care',
    slug: 'children-in-care',
    href: '/children-in-care',
    colour: '#F4A261',
    metrics: [
      { label: 'Children in care', value: '83,840', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'record high · +28% since 2010', sparklineData: [65000, 67000, 69000, 72000, 75000, 78000, 80000, 82000, 83840] },
      { label: 'Care cost per child', value: '£62,000', unit: '/yr', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'average · residential placements £200k+', sparklineData: [30000, 34000, 38000, 44000, 48000, 53000, 56000, 59000, 62000] },
    ],
  },
  'foster-placement-shortage': {
    topic: 'Foster Placement Shortage',
    slug: 'foster-placement-shortage',
    href: '/foster-placement-shortage',
    colour: '#F4A261',
    metrics: [
      { label: 'Foster carer shortage', value: '9,000', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'shortfall of approved foster carers', sparklineData: [3000, 4000, 5000, 6000, 7000, 7500, 8000, 8500, 9000] },
      { label: 'Children in residential care', value: '15%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 9% · no foster placement found', sparklineData: [9, 9, 10, 11, 12, 13, 14, 14, 15] },
    ],
  },
  'child-criminal-exploitation': {
    topic: 'Child Criminal Exploitation',
    slug: 'child-criminal-exploitation',
    href: '/child-criminal-exploitation',
    colour: '#F4A261',
    metrics: [
      { label: 'CCE referrals 2023', value: '18,400', unit: '/yr', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '+68% since 2019 · county lines main driver', sparklineData: [6000, 7500, 9500, 11000, 13000, 12000, 14000, 16500, 18400] },
      { label: 'Victims under 14', value: '22%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'of CCE victims are primary school age', sparklineData: [15, 16, 17, 18, 19, 20, 20, 21, 22] },
    ],
  },
  'special-guardianship-use': {
    topic: 'Special Guardianship',
    slug: 'special-guardianship-use',
    href: '/special-guardianship-use',
    colour: '#F4A261',
    metrics: [
      { label: 'SGO orders 2023', value: '5,540', unit: '/yr', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'stable · but support underfunded', sparklineData: [2000, 3500, 4500, 5000, 5400, 5600, 5700, 5600, 5540] },
      { label: 'SGO breakdown rate', value: '9%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'orders ending within 5 years', sparklineData: [5, 6, 6, 7, 7, 8, 8, 9, 9] },
    ],
  },
  'teen-conception-rates': {
    topic: 'Teen Conception Rates',
    slug: 'teen-conception-rates',
    href: '/teen-conception-rates',
    colour: '#F4A261',
    metrics: [
      { label: 'Under-18 rate 2022', value: '13.1', unit: 'per 1,000', direction: 'down' as const, polarity: 'up-is-bad' as const, context: '-72% since 1999 · one of UK public health wins', sparklineData: [47.1, 42.5, 35.5, 27.7, 18.8, 14.4, 13.4, 13.1] },
      { label: 'Deprivation gap', value: '3.3x', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'most deprived areas 3x higher rate', sparklineData: [3.0, 3.1, 3.1, 3.2, 3.2, 3.2, 3.3, 3.3] },
    ],
  },
  'school-uniform-costs': {
    topic: 'School Uniform Costs',
    slug: 'school-uniform-costs',
    href: '/school-uniform-costs',
    colour: '#F4A261',
    metrics: [
      { label: 'Annual cost 2024', value: '£435', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '+38% since 2015 · School Uniforms Act 2021', sparklineData: [316, 340, 372, 390, 410, 422, 435] },
      { label: 'As % of lowest incomes', value: '2.8%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'approaching 3% of poorest family incomes', sparklineData: [2.1, 2.2, 2.4, 2.5, 2.6, 2.8] },
    ],
  },
  'free-school-meals-gap': {
    topic: 'Free School Meals Gap',
    slug: 'free-school-meals-gap',
    href: '/free-school-meals-gap',
    colour: '#F4A261',
    metrics: [
      { label: 'Children eligible FSM', value: '2.2m', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: '+59% since 2015 · threshold adjusted', sparklineData: [1380000, 1390000, 1540000, 1790000, 1970000, 2080000, 2200000] },
      { label: 'Poverty gap children', value: '870k', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'in poverty but above UC threshold', sparklineData: [720000, 740000, 800000, 820000, 840000, 860000, 870000] },
    ],
  },
  'shared-parental-leave': {
    topic: 'Shared Parental Leave',
    slug: 'shared-parental-leave',
    href: '/shared-parental-leave',
    colour: '#F4A261',
    metrics: [
      { label: 'Fathers taking SPL', value: '3.4%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'of eligible fathers · vs 90% take maternity', sparklineData: [1.5, 1.8, 2.2, 2.6, 2.9, 3.0, 3.2, 3.3, 3.4] },
      { label: 'SPL pay rate', value: '£184/wk', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'statutory pay · too low for most fathers', sparklineData: [139, 140, 145, 148, 151, 156, 172, 184, 184] },
    ],
  },
  'child-maintenance-enforcement': {
    topic: 'Child Maintenance',
    slug: 'child-maintenance-enforcement',
    href: '/child-maintenance-enforcement',
    colour: '#F4A261',
    metrics: [
      { label: 'CMS cases in arrears', value: '34%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'of all CMS arrangements have arrears', sparklineData: [38, 37, 36, 35, 34, 34, 34, 34, 34] },
      { label: 'Total arrears outstanding', value: '£455m', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'owed to single parents', sparklineData: [290, 315, 340, 365, 390, 405, 420, 440, 455] },
    ],
  },
  'early-years-quality': {
    topic: 'Early Years Quality',
    slug: 'early-years-quality',
    href: '/early-years-quality',
    colour: '#F4A261',
    metrics: [
      { label: 'Good/outstanding providers', value: '96%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'Ofsted registered settings · improving', sparklineData: [73, 77, 81, 84, 87, 90, 93, 95, 96] },
      { label: 'Children school-ready', value: '67%', unit: '', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'meeting GLD at end of EYFS', sparklineData: [62, 65, 66, 71, 72, 65, 65, 67, 67] },
    ],
  },

  // ── Batch 9: Society & Democracy + Poverty ────────────────────────────────
  'local-press-closures': {
    topic: 'Local Press Closures',
    slug: 'local-press-closures',
    href: '/local-press-closures',
    colour: '#6B7280',
    metrics: [
      { label: 'Local titles closed since 2005', value: '320+', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'one third of all local papers gone', sparklineData: [0, 40, 90, 150, 200, 245, 275, 305, 320] },
      { label: 'News deserts (no local paper)', value: '23%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'of UK local authority areas', sparklineData: [5, 8, 10, 12, 15, 17, 19, 21, 23] },
    ],
  },
  'electoral-registration-gap': {
    topic: 'Electoral Registration Gap',
    slug: 'electoral-registration-gap',
    href: '/electoral-registration-gap',
    colour: '#6B7280',
    metrics: [
      { label: 'Unregistered eligible voters', value: '8m', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: '17% of eligible electorate', sparklineData: [8.5, 8.3, 7.9, 7.6, 7.5, 8.2, 8.0, 8.0, 8.0] },
      { label: '18-24 year olds unregistered', value: '27%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'highest non-registration among young', sparklineData: [28, 27, 27, 26, 26, 28, 27, 27, 27] },
    ],
  },
  'community-cohesion-survey': {
    topic: 'Community Cohesion',
    slug: 'community-cohesion-survey',
    href: '/community-cohesion-survey',
    colour: '#6B7280',
    metrics: [
      { label: 'Trust in neighbours', value: '62%', unit: '', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'from 70% in 2014 · polarisation effect', sparklineData: [70, 69, 68, 66, 65, 64, 63, 63, 62] },
      { label: 'Belonging to neighbourhood', value: '71%', unit: '', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'feel strong sense of belonging', sparklineData: [73, 72, 72, 71, 70, 69, 70, 71, 71] },
    ],
  },
  'marriage-cohabitation-trends': {
    topic: 'Marriage & Cohabitation',
    slug: 'marriage-cohabitation-trends',
    href: '/marriage-cohabitation-trends',
    colour: '#6B7280',
    metrics: [
      { label: 'Marriages 2022', value: '236k', unit: '/yr', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: '50-year low · back to 2019 level', sparklineData: [244, 243, 247, 249, 245, 236, 169, 218, 236] },
      { label: 'Cohabiting couples', value: '4.2m', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'fastest-growing family type', sparklineData: [2.1, 2.9, 3.2, 3.4, 3.6, 3.8, 3.9, 4.0, 4.2] },
    ],
  },
  'protest-policing': {
    topic: 'Protest Policing',
    slug: 'protest-policing',
    href: '/protest-policing',
    colour: '#6B7280',
    metrics: [
      { label: 'Protest arrests 2023', value: '4,278', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '+381% since 2015 · Public Order Act 2023', sparklineData: [890, 1100, 2870, 2200, 2900, 3600, 4278, 3900] },
      { label: 'New protest offences', value: '10', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'created by Public Order Act 2023', sparklineData: [0, 0, 0, 0, 0, 3, 10] },
    ],
  },
  'charity-sector-finances': {
    topic: 'Charity Sector Finances',
    slug: 'charity-sector-finances',
    href: '/charity-sector-finances',
    colour: '#6B7280',
    metrics: [
      { label: 'Charities folded 2023', value: '6,200', unit: '/yr', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '+19% since 2015 · demand vs resource crisis', sparklineData: [5200, 5100, 5100, 5200, 5300, 5800, 5600, 5900, 6200] },
      { label: 'Govt income share', value: '37%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'independence at risk', sparklineData: [34, 35, 35, 37, 37] },
    ],
  },
  'social-enterprise-growth': {
    topic: 'Social Enterprise Growth',
    slug: 'social-enterprise-growth',
    href: '/social-enterprise-growth',
    colour: '#6B7280',
    metrics: [
      { label: 'Social enterprises in UK', value: '100,000+', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: '+18% over 5 years · resilient sector', sparklineData: [70000, 74000, 78000, 82000, 85000, 88000, 92000, 96000, 100000] },
      { label: 'Combined turnover', value: '£60bn', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: '3% of UK GDP · growing', sparklineData: [36, 40, 44, 48, 52, 55, 57, 59, 60] },
    ],
  },
  'faith-community-trends': {
    topic: 'Faith Communities',
    slug: 'faith-community-trends',
    href: '/faith-community-trends',
    colour: '#6B7280',
    metrics: [
      { label: 'No religion 2021', value: '37%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 25% in 2011 · fastest growing group', sparklineData: [15, 21, 25, 29, 32, 35, 37] },
      { label: 'Weekly worshippers', value: '8%', unit: '', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down from 16% in 2000 · institutional decline', sparklineData: [16, 14, 13, 11, 10, 9, 9, 8, 8] },
    ],
  },
  'water-affordability': {
    topic: 'Water Affordability',
    slug: 'water-affordability',
    href: '/water-affordability',
    colour: '#E63946',
    metrics: [
      { label: 'Avg annual water bill 2024', value: '£578', unit: '/yr', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '+5.5% · rising toward £700 by 2030', sparklineData: [389, 405, 415, 421, 428, 436, 448, 448, 578] },
      { label: 'Households in water poverty', value: '1.8m', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'spending >3% of income on water', sparklineData: [1.1, 1.2, 1.3, 1.4, 1.4, 1.5, 1.6, 1.7, 1.8] },
    ],
  },
  'transport-cost-poverty': {
    topic: 'Transport Cost Poverty',
    slug: 'transport-cost-poverty',
    href: '/transport-cost-poverty',
    colour: '#E63946',
    metrics: [
      { label: 'Transport as % low income', value: '11%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'of poorest quintile spend', sparklineData: [8, 8, 9, 9, 9, 10, 10, 11, 11] },
      { label: 'Car-dependent households', value: '42%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'no alternative to car · rural + suburban', sparklineData: [44, 43, 43, 42, 42, 42, 42, 42, 42] },
    ],
  },

  // ── Batch 10: Poverty & Care ───────────────────────────────────────────────
  'debt-enforcement-hardship': {
    topic: 'Debt Enforcement Hardship',
    slug: 'debt-enforcement-hardship',
    href: '/debt-enforcement-hardship',
    colour: '#E63946',
    metrics: [
      { label: 'People in problem debt', value: '9m', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'serious financial difficulties', sparklineData: [6, 6.5, 7, 7.5, 8, 7.5, 8, 8.5, 9] },
      { label: 'County court judgments', value: '1.26m', unit: '/yr', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '+35% since 2019 · record post-pandemic', sparklineData: [840, 920, 960, 1000, 1060, 790, 940, 1100, 1260] },
    ],
  },
  'inheritance-inequality': {
    topic: 'Inheritance Inequality',
    slug: 'inheritance-inequality',
    href: '/inheritance-inequality',
    colour: '#E63946',
    metrics: [
      { label: 'Annual wealth inherited', value: '£115bn', unit: '/yr', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'rising fast · doubles every 20 years', sparklineData: [40, 50, 60, 72, 82, 90, 100, 108, 115] },
      { label: 'Receive 1+ inheritance', value: '35%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'of all households by 2035', sparklineData: [25, 27, 28, 30, 31, 32, 33, 34, 35] },
    ],
  },
  'benefit-sanction-impact': {
    topic: 'Benefit Sanctions',
    slug: 'benefit-sanction-impact',
    href: '/benefit-sanction-impact',
    colour: '#E63946',
    metrics: [
      { label: 'UC sanctions 2023', value: '786k', unit: '/yr', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'rising strongly · UC rollout driver', sparklineData: [1080, 890, 780, 730, 740, 193, 378, 640, 786] },
      { label: 'Avg sanction duration', value: '33 days', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'of income removal · hunger risk', sparklineData: [22, 24, 26, 27, 28, 28, 30, 32, 33] },
    ],
  },
  'winter-fuel-payment-reform': {
    topic: 'Winter Fuel Payment Reform',
    slug: 'winter-fuel-payment-reform',
    href: '/winter-fuel-payment-reform',
    colour: '#E63946',
    metrics: [
      { label: 'Recipients 2024', value: '1.5m', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down from 11m · means test removes 85%', sparklineData: [11.2, 11.4, 11.3, 11.1, 11.0, 1.5] },
      { label: 'Projected in poverty', value: '+200k', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'additional pensioners pushed into poverty', sparklineData: [0, 0, 0, 0, 0, 200] },
    ],
  },
  'geographic-wealth-inequality': {
    topic: 'Geographic Wealth Inequality',
    slug: 'geographic-wealth-inequality',
    href: '/geographic-wealth-inequality',
    colour: '#E63946',
    metrics: [
      { label: 'SE vs NE wealth gap', value: '3.0x', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'from 2.2x in 2010 · property driver', sparklineData: [2.2, 2.3, 2.6, 2.7, 2.8, 2.9, 3.0, 3.0, 3.0] },
      { label: 'N East median wealth', value: '£168k', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'vs £510k SE · 3x gap', sparklineData: [130, 132, 140, 148, 155, 160, 162, 165, 168] },
    ],
  },
  'infant-food-poverty': {
    topic: 'Infant Food Poverty',
    slug: 'infant-food-poverty',
    href: '/infant-food-poverty',
    colour: '#F4A261',
    metrics: [
      { label: 'Infants in food insecurity', value: '290,000', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'under-2s in households without secure food', sparklineData: [160000, 175000, 195000, 215000, 235000, 220000, 250000, 270000, 290000] },
      { label: 'Breastfeeding rate 6 months', value: '34%', unit: '', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'below WHO 50% recommendation', sparklineData: [34, 34, 34, 34, 34, 34, 34, 34, 34] },
    ],
  },
  'dementia-support-gaps': {
    topic: 'Dementia Support Gaps',
    slug: 'dementia-support-gaps',
    href: '/dementia-support-gaps',
    colour: '#264653',
    metrics: [
      { label: 'People with dementia', value: '982,000', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'projected 1m+ by 2025', sparklineData: [680000, 710000, 740000, 780000, 820000, 850000, 900000, 940000, 982000] },
      { label: 'Dementia diagnosis rate', value: '63%', unit: '', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'below 67% NHS target · diagnosis gap', sparklineData: [67, 68, 67, 67, 63, 62, 62, 63, 63] },
    ],
  },
  'pip-assessment-backlog': {
    topic: 'PIP Assessment Backlog',
    slug: 'pip-assessment-backlog',
    href: '/pip-assessment-backlog',
    colour: '#264653',
    metrics: [
      { label: 'Awaiting PIP decision', value: '580,000', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '+48% since 2022 · longest waits ever', sparklineData: [220000, 250000, 280000, 320000, 380000, 350000, 430000, 520000, 580000] },
      { label: 'Average wait time', value: '26 weeks', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'from application to decision', sparklineData: [14, 15, 16, 18, 20, 18, 22, 24, 26] },
    ],
  },
  'care-home-cqc-quality': {
    topic: 'Care Home Quality',
    slug: 'care-home-cqc-quality',
    href: '/care-home-cqc-quality',
    colour: '#264653',
    metrics: [
      { label: 'Rated inadequate', value: '3%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'of CQC-registered care homes', sparklineData: [2, 2, 2, 3, 3, 3, 3, 3, 3] },
      { label: 'Good/outstanding', value: '80%', unit: '', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'majority rated positively by CQC', sparklineData: [74, 75, 77, 79, 80, 80, 81, 80, 80] },
    ],
  },
  'social-care-workforce-crisis': {
    topic: 'Social Care Workforce Crisis',
    slug: 'social-care-workforce-crisis',
    href: '/social-care-workforce-crisis',
    colour: '#264653',
    metrics: [
      { label: 'Vacancies 2023', value: '152,000', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down from record 165k · still critical', sparklineData: [122000, 105000, 122000, 125000, 112000, 170000, 165000, 158000, 152000] },
      { label: 'Turnover rate', value: '28%', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'staff leaving each year · above 30% in 2022', sparklineData: [27, 28, 30, 30, 31, 33, 34, 30, 28] },
    ],
  },

  'nhs-111-pressures': {
    topic: 'NHS 111 Pressures',
    slug: 'nhs-111-pressures',
    href: '/nhs-111-pressures',
    colour: '#E63946',
    metrics: [
      { label: 'Calls per year', value: '22.4m', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'NHS 111 demand at record high', sparklineData: [14, 15, 16, 17, 18, 19, 20, 21, 22] },
      { label: 'Calls abandoned', value: '8.4%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'callers hanging up before answered', sparklineData: [4, 4, 5, 5, 6, 7, 8, 8, 8] },
      { label: 'Ambulance dispatches', value: '3.1m', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'calls resulting in ambulance dispatch', sparklineData: [2, 2, 2, 2, 3, 3, 3, 3, 3] },
    ],
  },
  'diagnostic-imaging-waits': {
    topic: 'Diagnostic Imaging Waits',
    slug: 'diagnostic-imaging-waits',
    href: '/diagnostic-imaging-waits',
    colour: '#E63946',
    metrics: [
      { label: 'Waiting over 6 weeks', value: '1.5m', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'for diagnostic scan · up from 300k in 2019', sparklineData: [300, 350, 400, 400, 350, 900, 1200, 1400, 1500] },
      { label: 'Average wait (weeks)', value: '11.2', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 4 weeks in 2019', sparklineData: [4, 4, 5, 5, 5, 9, 10, 11, 11] },
    ],
  },
  'weight-loss-drug-access': {
    topic: 'Weight Loss Drug Access',
    slug: 'weight-loss-drug-access',
    href: '/weight-loss-drug-access',
    colour: '#264653',
    metrics: [
      { label: 'Eligible for GLP-1 drugs', value: '3.4m', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'adults who meet clinical criteria', sparklineData: [0, 0, 0, 0, 0, 1, 2, 3, 3] },
      { label: 'Currently prescribed', value: '220k', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'on NHS weight management drugs', sparklineData: [10, 20, 30, 40, 60, 80, 120, 180, 220] },
    ],
  },
  'nhs-estate-backlog': {
    topic: 'NHS Estate Backlog',
    slug: 'nhs-estate-backlog',
    href: '/nhs-estate-backlog',
    colour: '#E63946',
    metrics: [
      { label: 'Maintenance backlog', value: '£11.6bn', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'capital repair work outstanding', sparklineData: [5, 6, 6, 7, 8, 9, 10, 11, 12] },
      { label: 'High risk backlog', value: '£1.6bn', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'posing significant risk to patients', sparklineData: [0.8, 0.9, 1, 1, 1.2, 1.3, 1.4, 1.5, 1.6] },
    ],
  },
  'liver-disease-deaths': {
    topic: 'Liver Disease Deaths',
    slug: 'liver-disease-deaths',
    href: '/liver-disease-deaths',
    colour: '#E63946',
    metrics: [
      { label: 'Deaths per year', value: '10,200', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'alcohol-related liver disease · up 25% since 2019', sparklineData: [8100, 8200, 8300, 8400, 8500, 9200, 9600, 9900, 10200] },
      { label: 'Preventable proportion', value: '90%', unit: '', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'of liver disease deaths are preventable', sparklineData: [90, 90, 90, 90, 90, 90, 90, 90, 90] },
    ],
  },
  'sepsis-outcomes': {
    topic: 'Sepsis Outcomes',
    slug: 'sepsis-outcomes',
    href: '/sepsis-outcomes',
    colour: '#E63946',
    metrics: [
      { label: 'UK deaths from sepsis', value: '48,000', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'annually · more than bowel, breast and prostate cancer combined', sparklineData: [44000, 44000, 45000, 46000, 47000, 46000, 47000, 48000, 48000] },
      { label: 'Surviving sepsis with disability', value: '40%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'survivors face long-term impairment', sparklineData: [38, 39, 40, 40, 40, 40, 40, 40, 40] },
    ],
  },
  'violence-against-nhs-staff': {
    topic: 'Violence Against NHS Staff',
    slug: 'violence-against-nhs-staff',
    href: '/violence-against-nhs-staff',
    colour: '#E63946',
    metrics: [
      { label: 'Physical assaults on NHS staff', value: '63,000', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'reported in 2022/23 · up 33% in 5 years', sparklineData: [47000, 48000, 50000, 52000, 55000, 57000, 60000, 62000, 63000] },
      { label: 'Staff feeling unsafe', value: '24%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'report feeling unsafe due to violence', sparklineData: [18, 19, 20, 21, 22, 22, 23, 24, 24] },
    ],
  },
  'health-tech-adoption': {
    topic: 'Health Tech Adoption',
    slug: 'health-tech-adoption',
    href: '/health-tech-adoption',
    colour: '#2A9D8F',
    metrics: [
      { label: 'NHS App users', value: '34m', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'registered accounts · up from 3m in 2020', sparklineData: [3, 5, 8, 12, 18, 22, 26, 30, 34] },
      { label: 'Digital appointment booking', value: '62%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'of GP appointments booked digitally', sparklineData: [20, 25, 30, 35, 40, 48, 55, 58, 62] },
    ],
  },
  'personal-health-budgets': {
    topic: 'Personal Health Budgets',
    slug: 'personal-health-budgets',
    href: '/personal-health-budgets',
    colour: '#264653',
    metrics: [
      { label: 'Personal health budgets', value: '67,000', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'people with a PHB · up from 21k in 2019', sparklineData: [21000, 25000, 30000, 35000, 40000, 48000, 54000, 61000, 67000] },
      { label: 'Average PHB value', value: '£7,200', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'per person per year', sparklineData: [5000, 5500, 6000, 6200, 6500, 6700, 6900, 7000, 7200] },
    ],
  },
  'cancer-one-year-survival': {
    topic: 'Cancer One-Year Survival',
    slug: 'cancer-one-year-survival',
    href: '/cancer-one-year-survival',
    colour: '#2A9D8F',
    metrics: [
      { label: 'One-year survival rate', value: '72%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'all cancers · up from 64% in 2010', sparklineData: [64, 65, 66, 67, 68, 69, 70, 71, 72] },
      { label: 'Five-year survival rate', value: '54%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'all cancers combined', sparklineData: [46, 47, 48, 49, 50, 51, 52, 53, 54] },
    ],
  },
  'antidepressant-prescribing': {
    topic: 'Antidepressant Prescribing',
    slug: 'antidepressant-prescribing',
    href: '/antidepressant-prescribing',
    colour: '#264653',
    metrics: [
      { label: 'Antidepressant prescriptions', value: '89m', unit: '', direction: 'up' as const, polarity: 'neutral' as const, context: 'items dispensed in England in 2022/23', sparklineData: [57, 64, 67, 70, 72, 74, 78, 83, 89] },
      { label: 'People on antidepressants', value: '8.3m', unit: '', direction: 'up' as const, polarity: 'neutral' as const, context: 'in England · 1 in 6 adults', sparklineData: [5.6, 6, 6.4, 6.7, 7, 7.2, 7.6, 8, 8.3] },
    ],
  },
  'mental-health-crisis-beds': {
    topic: 'Mental Health Crisis Beds',
    slug: 'mental-health-crisis-beds',
    href: '/mental-health-crisis-beds',
    colour: '#E63946',
    metrics: [
      { label: 'Mental health beds lost since 2010', value: '25%', unit: '', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'from 26,000 to 19,000 beds', sparklineData: [26, 25, 24, 23, 22, 21, 21, 20, 19] },
      { label: 'Out-of-area placements', value: '5,200', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'patients sent far from home in 2023', sparklineData: [3000, 3500, 4000, 4500, 5000, 5500, 5500, 5300, 5200] },
    ],
  },
  'self-harm-hospital-admissions': {
    topic: 'Self-Harm Hospital Admissions',
    slug: 'self-harm-hospital-admissions',
    href: '/self-harm-hospital-admissions',
    colour: '#E63946',
    metrics: [
      { label: 'Hospital admissions for self-harm', value: '225,000', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'per year in England', sparklineData: [190000, 195000, 200000, 205000, 210000, 215000, 218000, 220000, 225000] },
      { label: 'Young women aged 16–24', value: '41%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'of all self-harm admissions are young women', sparklineData: [32, 33, 35, 36, 38, 39, 40, 40, 41] },
    ],
  },
  'men-mental-health-gap': {
    topic: "Men's Mental Health Gap",
    slug: 'men-mental-health-gap',
    href: '/men-mental-health-gap',
    colour: '#6B7280',
    metrics: [
      { label: 'Male suicide rate', value: '16.6', unit: 'per 100k', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: '3x higher than female rate', sparklineData: [16, 16, 17, 17, 16, 16, 16, 17, 17] },
      { label: 'Men seeking mental health help', value: '36%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'vs 55% of women · gap persists', sparklineData: [28, 29, 30, 31, 32, 33, 34, 35, 36] },
    ],
  },
  'screen-time-wellbeing': {
    topic: 'Screen Time & Wellbeing',
    slug: 'screen-time-wellbeing',
    href: '/screen-time-wellbeing',
    colour: '#6B7280',
    metrics: [
      { label: 'Teens on phones 4+ hours daily', value: '62%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 44% in 2017', sparklineData: [44, 46, 48, 50, 52, 54, 56, 59, 62] },
      { label: 'Link to poor mental health', value: 'strong', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'high screen use correlates with anxiety', sparklineData: [3, 3, 4, 4, 5, 5, 6, 6, 6] },
    ],
  },
  'postnatal-depression-care': {
    topic: 'Postnatal Depression Care',
    slug: 'postnatal-depression-care',
    href: '/postnatal-depression-care',
    colour: '#264653',
    metrics: [
      { label: 'Women with PND each year', value: '1 in 10', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'of new mothers experience postnatal depression', sparklineData: [10, 10, 10, 10, 10, 10, 10, 10, 10] },
      { label: 'Receiving specialist support', value: '43%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'of women with PND get specialist care', sparklineData: [30, 32, 34, 35, 37, 39, 40, 41, 43] },
    ],
  },
  'sleep-disorder-prevalence': {
    topic: 'Sleep Disorder Prevalence',
    slug: 'sleep-disorder-prevalence',
    href: '/sleep-disorder-prevalence',
    colour: '#6B7280',
    metrics: [
      { label: 'Chronic sleep problems', value: '36%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'of UK adults experience chronic poor sleep', sparklineData: [28, 29, 30, 31, 32, 33, 34, 35, 36] },
      { label: 'Diagnosed sleep apnoea', value: '1.5m', unit: '', direction: 'up' as const, polarity: 'neutral' as const, context: 'in the UK · many more undiagnosed', sparklineData: [0.8, 0.9, 1, 1.1, 1.2, 1.2, 1.3, 1.4, 1.5] },
    ],
  },
  'adhd-waiting-times': {
    topic: 'ADHD Waiting Times',
    slug: 'adhd-waiting-times',
    href: '/adhd-waiting-times',
    colour: '#E63946',
    metrics: [
      { label: 'Average ADHD assessment wait', value: '3.5 years', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'for adult diagnosis on NHS', sparklineData: [0.5, 0.8, 1, 1.5, 2, 2.5, 3, 3.2, 3.5] },
      { label: 'On waiting list', value: '200k+', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'awaiting adult ADHD assessment', sparklineData: [20000, 30000, 50000, 70000, 100000, 130000, 160000, 180000, 200000] },
    ],
  },
  'loneliness-young-people': {
    topic: 'Loneliness in Young People',
    slug: 'loneliness-young-people',
    href: '/loneliness-young-people',
    colour: '#264653',
    metrics: [
      { label: 'Young people feeling lonely', value: '55%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'of 16–24 year olds report loneliness', sparklineData: [32, 34, 36, 38, 40, 48, 50, 52, 55] },
      { label: 'Most lonely age group', value: '16–24', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'consistently the most lonely in England', sparklineData: [5, 5, 5, 5, 5, 5, 5, 5, 5] },
    ],
  },
  'uk-productivity-gap': {
    topic: 'UK Productivity Gap',
    slug: 'uk-productivity-gap',
    href: '/uk-productivity-gap',
    colour: '#6B7280',
    metrics: [
      { label: 'Productivity gap vs Germany', value: '16%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'UK workers produce 16% less per hour', sparklineData: [12, 12, 13, 13, 14, 14, 15, 16, 16] },
      { label: 'Productivity growth 2010–2024', value: '0.4%', unit: 'pa', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'vs 2.3% pa pre-2008 · decade of stagnation', sparklineData: [2.3, 2.1, 1.8, 1.2, 0.8, 0.6, 0.5, 0.4, 0.4] },
    ],
  },
  'business-investment-rate': {
    topic: 'Business Investment Rate',
    slug: 'business-investment-rate',
    href: '/business-investment-rate',
    colour: '#6B7280',
    metrics: [
      { label: 'Business investment / GDP', value: '9.8%', unit: '', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'lowest in G7 · Germany invests 12%', sparklineData: [11, 11, 10.5, 10.5, 10, 9.5, 9.8, 9.8, 9.8] },
      { label: 'R&D spend / GDP', value: '1.7%', unit: '', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'below OECD average of 2.7%', sparklineData: [1.5, 1.5, 1.6, 1.6, 1.7, 1.7, 1.7, 1.7, 1.7] },
    ],
  },
  'ai-adoption-business': {
    topic: 'AI Adoption in Business',
    slug: 'ai-adoption-business',
    href: '/ai-adoption-business',
    colour: '#264653',
    metrics: [
      { label: 'Businesses using AI', value: '15%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'of UK businesses have adopted AI tools', sparklineData: [2, 3, 4, 5, 7, 9, 11, 13, 15] },
      { label: 'Productivity uplift from AI', value: '6–10%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'estimated productivity gain in adopting firms', sparklineData: [0, 1, 2, 3, 4, 5, 6, 7, 8] },
    ],
  },
  'financial-inclusion': {
    topic: 'Financial Inclusion',
    slug: 'financial-inclusion',
    href: '/financial-inclusion',
    colour: '#264653',
    metrics: [
      { label: 'Adults without bank account', value: '1.3m', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down from 1.5m but concentrated in deprived areas', sparklineData: [1800000, 1700000, 1600000, 1500000, 1400000, 1300000, 1300000, 1300000, 1300000] },
      { label: 'Credit-rejected adults', value: '1 in 4', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'declined for mainstream credit products', sparklineData: [18, 19, 20, 21, 22, 23, 24, 25, 25] },
    ],
  },
  'wage-theft': {
    topic: 'Wage Theft',
    slug: 'wage-theft',
    href: '/wage-theft',
    colour: '#E63946',
    metrics: [
      { label: 'Underpaid minimum wage workers', value: '522k', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'not receiving legal minimum wage', sparklineData: [200000, 220000, 280000, 300000, 350000, 400000, 450000, 490000, 522000] },
      { label: 'HMRC arrears identified', value: '£16m', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'in minimum wage arrears in 2022/23', sparklineData: [4, 5, 6, 8, 10, 12, 13, 15, 16] },
    ],
  },
  'female-entrepreneurship': {
    topic: 'Female Entrepreneurship',
    slug: 'female-entrepreneurship',
    href: '/female-entrepreneurship',
    colour: '#264653',
    metrics: [
      { label: 'Female-led businesses', value: '20%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'of UK businesses led by women · up from 16%', sparklineData: [16, 16, 17, 17, 17, 18, 18, 19, 20] },
      { label: 'Funding gap', value: '89%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'of VC funding goes to all-male founder teams', sparklineData: [90, 90, 89, 89, 89, 89, 89, 89, 89] },
    ],
  },
  'care-economy-value': {
    topic: 'Care Economy Value',
    slug: 'care-economy-value',
    href: '/care-economy-value',
    colour: '#264653',
    metrics: [
      { label: 'Value of unpaid care', value: '£162bn', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'annually · equivalent to NHS budget', sparklineData: [100, 110, 120, 130, 140, 145, 150, 155, 162] },
      { label: 'Unpaid carers in England', value: '5.8m', unit: '', direction: 'flat' as const, polarity: 'neutral' as const, context: 'providing unpaid care to family/friends', sparklineData: [5.4, 5.4, 5.5, 5.6, 5.7, 5.8, 5.8, 5.8, 5.8] },
    ],
  },
  'trade-deficit': {
    topic: 'Trade Deficit',
    slug: 'trade-deficit',
    href: '/trade-deficit',
    colour: '#6B7280',
    metrics: [
      { label: 'Goods trade deficit', value: '£54bn', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'annual goods trade deficit', sparklineData: [120, 118, 125, 130, 135, 140, 145, 148, 154] },
      { label: 'Services trade surplus', value: '£115bn', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'services exports offset goods deficit', sparklineData: [80, 85, 90, 95, 100, 100, 105, 110, 115] },
    ],
  },
  'redundancy-rates': {
    topic: 'Redundancy Rates',
    slug: 'redundancy-rates',
    href: '/redundancy-rates',
    colour: '#6B7280',
    metrics: [
      { label: 'Redundancy rate', value: '3.7', unit: 'per 1,000', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'per 1,000 employees · rising', sparklineData: [4, 3, 3, 3, 4, 14, 4, 3, 4] },
      { label: 'Redundancies 2023', value: '295k', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'workers made redundant', sparklineData: [280000, 250000, 220000, 210000, 250000, 810000, 240000, 265000, 295000] },
    ],
  },
  'regional-gdp-gap': {
    topic: 'Regional GDP Gap',
    slug: 'regional-gdp-gap',
    href: '/regional-gdp-gap',
    colour: '#6B7280',
    metrics: [
      { label: 'London GVA per head vs Wales', value: '2.2x', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'London generates 2.2x the GVA per person vs Wales', sparklineData: [2, 2, 2.1, 2.1, 2.2, 2.2, 2.2, 2.2, 2.2] },
      { label: 'Regions below UK average', value: '8 of 12', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'ITL1 regions below UK GVA per head average', sparklineData: [8, 8, 8, 8, 8, 8, 8, 8, 8] },
    ],
  },
  'inflation-by-income': {
    topic: 'Inflation by Income',
    slug: 'inflation-by-income',
    href: '/inflation-by-income',
    colour: '#E63946',
    metrics: [
      { label: 'Inflation for lowest earners (peak)', value: '14.2%', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'vs 10.5% overall at Oct 2022 peak', sparklineData: [2, 2, 3, 3, 4, 7, 14, 10, 5] },
      { label: 'Food inflation peak', value: '19.2%', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'March 2023 · hardest hit poorest households', sparklineData: [1, 2, 3, 4, 5, 8, 15, 19, 8] },
    ],
  },
  'public-sector-pay-gap': {
    topic: 'Public Sector Pay Gap',
    slug: 'public-sector-pay-gap',
    href: '/public-sector-pay-gap',
    colour: '#E63946',
    metrics: [
      { label: 'Public vs private pay gap', value: '−4.3%', unit: '', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'public sector now pays less than private sector', sparklineData: [5, 4, 3, 2, 1, 0, -1, -3, -4] },
      { label: 'Real pay cut 2010–2023', value: '−8%', unit: '', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'public sector workers in real terms', sparklineData: [0, -1, -2, -3, -4, -5, -6, -7, -8] },
    ],
  },
  'social-housing-waiting-lists': {
    topic: 'Social Housing Waiting Lists',
    slug: 'social-housing-waiting-lists',
    href: '/social-housing-waiting-lists',
    colour: '#F4A261',
    metrics: [
      { label: 'Households on waiting list', value: '1.3m', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'in England · up 8% since 2019', sparklineData: [1050000, 1060000, 1100000, 1150000, 1180000, 1220000, 1250000, 1280000, 1300000] },
      { label: 'Average wait for social home', value: '7 years', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'for a 2-bed social home in London', sparklineData: [4, 4, 5, 5, 6, 6, 6, 7, 7] },
    ],
  },
  'housing-disrepair-claims': {
    topic: 'Housing Disrepair Claims',
    slug: 'housing-disrepair-claims',
    href: '/housing-disrepair-claims',
    colour: '#F4A261',
    metrics: [
      { label: 'Disrepair claims against landlords', value: '52,000', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'in 2022/23 · largely in social housing', sparklineData: [15000, 18000, 22000, 28000, 35000, 40000, 45000, 50000, 52000] },
      { label: 'Homes with mould/damp', value: '4%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'of English homes have mould or damp', sparklineData: [3, 3, 3, 4, 4, 4, 4, 4, 4] },
    ],
  },
  'short-term-lets-impact': {
    topic: 'Short-Term Lets Impact',
    slug: 'short-term-lets-impact',
    href: '/short-term-lets-impact',
    colour: '#F4A261',
    metrics: [
      { label: 'Airbnb listings in England', value: '257,000', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up 400% since 2015', sparklineData: [51000, 80000, 120000, 160000, 180000, 200000, 220000, 240000, 257000] },
      { label: 'Areas with 1 in 5 homes as STL', value: '32', unit: 'LAs', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'local authorities with high STL concentration', sparklineData: [5, 8, 12, 16, 20, 24, 27, 30, 32] },
    ],
  },
  'traveller-site-provision': {
    topic: 'Traveller Site Provision',
    slug: 'traveller-site-provision',
    href: '/traveller-site-provision',
    colour: '#6B7280',
    metrics: [
      { label: 'Traveller families needing pitches', value: '5,800', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'across England with no authorised site', sparklineData: [5000, 5100, 5200, 5400, 5500, 5600, 5700, 5800, 5800] },
      { label: 'Pitch provision deficit', value: '40%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'of need unmet by local authority pitches', sparklineData: [35, 36, 37, 38, 39, 40, 40, 40, 40] },
    ],
  },
  'cohabitation-rights-gap': {
    topic: 'Cohabitation Rights Gap',
    slug: 'cohabitation-rights-gap',
    href: '/cohabitation-rights-gap',
    colour: '#6B7280',
    metrics: [
      { label: 'Cohabiting couples in UK', value: '3.6m', unit: '', direction: 'up' as const, polarity: 'neutral' as const, context: 'fastest growing family type · no automatic rights', sparklineData: [2.2, 2.4, 2.6, 2.8, 3, 3.2, 3.4, 3.5, 3.6] },
      { label: 'Mistakenly believe in "common law"', value: '46%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'cohabitants who believe they have legal protection', sparklineData: [50, 49, 49, 48, 48, 47, 47, 46, 46] },
    ],
  },
  'train-punctuality': {
    topic: 'Train Punctuality',
    slug: 'train-punctuality',
    href: '/train-punctuality',
    colour: '#264653',
    metrics: [
      { label: 'Trains on time', value: '64%', unit: '', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'arriving within 1 minute of scheduled time', sparklineData: [89, 88, 87, 85, 83, 61, 70, 67, 64] },
      { label: 'Cancellation rate', value: '3.9%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'of services cancelled in 2023', sparklineData: [1.8, 1.9, 2, 2, 2.2, 3.7, 4.2, 4, 3.9] },
    ],
  },
  'bus-service-cuts': {
    topic: 'Bus Service Cuts',
    slug: 'bus-service-cuts',
    href: '/bus-service-cuts',
    colour: '#E63946',
    metrics: [
      { label: 'Bus miles cut since 2010', value: '29%', unit: '', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'bus mileage outside London collapsed', sparklineData: [0, -3, -6, -10, -15, -20, -24, -27, -29] },
      { label: 'Routes cut since 2012', value: '3,800', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'local bus routes lost or reduced', sparklineData: [0, 400, 800, 1200, 1800, 2400, 2800, 3400, 3800] },
    ],
  },
  'active-travel-investment': {
    topic: 'Active Travel Investment',
    slug: 'active-travel-investment',
    href: '/active-travel-investment',
    colour: '#2A9D8F',
    metrics: [
      { label: 'Active Travel England budget', value: '£200m', unit: 'pa', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'government cycling/walking spend · 2022 target: £4bn', sparklineData: [50, 60, 80, 100, 120, 140, 160, 180, 200] },
      { label: 'Cycling trips per year', value: '1.1bn', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'total cycling journeys in England', sparklineData: [0.8, 0.85, 0.9, 0.92, 0.95, 0.98, 1, 1.05, 1.1] },
    ],
  },
  'airport-capacity-utilisation': {
    topic: 'Airport Capacity Utilisation',
    slug: 'airport-capacity-utilisation',
    href: '/airport-capacity-utilisation',
    colour: '#264653',
    metrics: [
      { label: 'Heathrow utilisation', value: '97%', unit: '', direction: 'up' as const, polarity: 'neutral' as const, context: 'operating near full capacity', sparklineData: [97, 97, 98, 98, 97, 20, 45, 80, 97] },
      { label: 'Passengers 2023', value: '237m', unit: '', direction: 'up' as const, polarity: 'neutral' as const, context: 'through UK airports · near pre-pandemic levels', sparklineData: [290, 295, 300, 285, 292, 75, 140, 200, 237] },
    ],
  },
  'smart-meter-rollout': {
    topic: 'Smart Meter Rollout',
    slug: 'smart-meter-rollout',
    href: '/smart-meter-rollout',
    colour: '#2A9D8F',
    metrics: [
      { label: 'Smart meters installed', value: '60%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'of homes have a smart meter · 2020 target missed', sparklineData: [20, 30, 38, 44, 48, 52, 55, 57, 60] },
      { label: 'Target completion year', value: '2025', unit: '', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'revised target · original was 2020', sparklineData: [1, 1, 1, 1, 1, 1, 1, 1, 1] },
    ],
  },
  'school-mental-health-support': {
    topic: 'School Mental Health Support',
    slug: 'school-mental-health-support',
    href: '/school-mental-health-support',
    colour: '#2A9D8F',
    metrics: [
      { label: 'Schools with MHSTs', value: '35%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'Mental Health Support Teams in schools', sparklineData: [0, 0, 5, 10, 15, 20, 25, 30, 35] },
      { label: 'Children referred for CAMHS', value: '748k', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'referrals in 2022/23 · up 52% in 5 years', sparklineData: [400000, 430000, 460000, 490000, 550000, 600000, 650000, 700000, 748000] },
    ],
  },
  'university-dropout-rates': {
    topic: 'University Dropout Rates',
    slug: 'university-dropout-rates',
    href: '/university-dropout-rates',
    colour: '#264653',
    metrics: [
      { label: 'Students not completing degree', value: '6.3%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'of UK starters leave without a degree', sparklineData: [5.5, 5.5, 5.6, 5.7, 5.8, 5.9, 6, 6.2, 6.3] },
      { label: 'Students from deprived areas dropping out', value: '9.1%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'higher dropout rate for disadvantaged students', sparklineData: [7, 7.2, 7.4, 7.6, 7.8, 8, 8.5, 8.8, 9.1] },
    ],
  },
  'private-school-charity-status': {
    topic: 'Private School Charity Status',
    slug: 'private-school-charity-status',
    href: '/private-school-charity-status',
    colour: '#6B7280',
    metrics: [
      { label: 'Tax relief for private schools', value: '£700m', unit: 'pa', direction: 'flat' as const, polarity: 'neutral' as const, context: 'estimated annual public subsidy via charity status', sparklineData: [500, 550, 580, 600, 620, 650, 670, 685, 700] },
      { label: 'Private school pupils', value: '6.5%', unit: '', direction: 'flat' as const, polarity: 'neutral' as const, context: 'of school-age children attend independent schools', sparklineData: [7, 7, 6.8, 6.8, 6.7, 6.6, 6.5, 6.5, 6.5] },
    ],
  },
  'digital-skills-gap': {
    topic: 'Digital Skills Gap',
    slug: 'digital-skills-gap',
    href: '/digital-skills-gap',
    colour: '#6B7280',
    metrics: [
      { label: 'Adults lacking basic digital skills', value: '8m', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'in the UK · 16% of working-age population', sparklineData: [12, 11, 10, 9.5, 9, 8.5, 8, 8, 8] },
      { label: 'Jobs requiring digital skills', value: '82%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'of UK vacancies require some digital skills', sparklineData: [60, 64, 68, 70, 74, 76, 79, 81, 82] },
    ],
  },
  'stem-gender-gap': {
    topic: 'STEM Gender Gap',
    slug: 'stem-gender-gap',
    href: '/stem-gender-gap',
    colour: '#E63946',
    metrics: [
      { label: 'Women in STEM workforce', value: '26%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up from 22% in 2015 · gap persists', sparklineData: [22, 22, 23, 23, 24, 24, 25, 25, 26] },
      { label: 'Girls taking A-level physics', value: '22%', unit: '', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'of physics A-level students are female', sparklineData: [20, 20, 21, 21, 21, 22, 22, 22, 22] },
    ],
  },
  'special-school-places': {
    topic: 'Special School Places',
    slug: 'special-school-places',
    href: '/special-school-places',
    colour: '#E63946',
    metrics: [
      { label: 'Children needing special school', value: '175k', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'in state-funded special schools', sparklineData: [110000, 118000, 125000, 132000, 142000, 152000, 162000, 168000, 175000] },
      { label: 'Capacity shortfall', value: '30%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'estimated shortfall in specialist places', sparklineData: [10, 12, 15, 18, 20, 23, 25, 28, 30] },
    ],
  },
  'looked-after-children-education': {
    topic: 'Looked-After Children Education',
    slug: 'looked-after-children-education',
    href: '/looked-after-children-education',
    colour: '#E63946',
    metrics: [
      { label: 'Attainment gap at GCSE', value: '37pp', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'vs non-looked-after peers · persistent', sparklineData: [36, 36, 37, 37, 37, 37, 37, 37, 37] },
      { label: 'Going on to higher education', value: '13%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'vs 43% of all young people', sparklineData: [8, 9, 10, 11, 11, 12, 12, 13, 13] },
    ],
  },
  'postgraduate-funding': {
    topic: 'Postgraduate Funding',
    slug: 'postgraduate-funding',
    href: '/postgraduate-funding',
    colour: '#264653',
    metrics: [
      { label: 'Postgraduate loan maximum', value: '£12,167', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'for 2024/25 · well below typical course costs', sparklineData: [10280, 10609, 10906, 11222, 11222, 11570, 11836, 12167, 12167] },
      { label: 'Masters degree average cost', value: '£16,500', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'leaving £4k+ funding gap', sparklineData: [12000, 12500, 13000, 13500, 14000, 14500, 15000, 16000, 16500] },
    ],
  },
  'school-overcrowding': {
    topic: 'School Overcrowding',
    slug: 'school-overcrowding',
    href: '/school-overcrowding',
    colour: '#E63946',
    metrics: [
      { label: 'Pupils in overcrowded schools', value: '1.1m', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'attending schools over capacity', sparklineData: [600000, 650000, 700000, 750000, 800000, 850000, 950000, 1050000, 1100000] },
      { label: 'Average class size', value: '27.7', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'primary class size · highest in a decade', sparklineData: [26.3, 26.5, 26.6, 26.8, 26.9, 27, 27.2, 27.5, 27.7] },
    ],
  },
  'youth-social-action': {
    topic: 'Youth Social Action',
    slug: 'youth-social-action',
    href: '/youth-social-action',
    colour: '#2A9D8F',
    metrics: [
      { label: 'Young people volunteering', value: '52%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'of 14–25 year olds volunteered in past year', sparklineData: [44, 45, 46, 47, 48, 42, 46, 50, 52] },
      { label: 'National Citizen Service alumni', value: '600k', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'young people who completed NCS since 2011', sparklineData: [10000, 40000, 80000, 130000, 200000, 280000, 380000, 480000, 600000] },
    ],
  },
  'agricultural-emissions': {
    topic: 'Agricultural Emissions',
    slug: 'agricultural-emissions',
    href: '/agricultural-emissions',
    colour: '#2A9D8F',
    metrics: [
      { label: 'Agriculture share of UK emissions', value: '11%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'one of the harder-to-decarbonise sectors', sparklineData: [11, 11, 11, 11, 11, 11, 11, 11, 11] },
      { label: 'Emissions reduction since 1990', value: '16%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'vs 50% reduction across whole economy', sparklineData: [0, 3, 5, 7, 9, 11, 13, 14, 16] },
    ],
  },
  'ancient-woodland-loss': {
    topic: 'Ancient Woodland Loss',
    slug: 'ancient-woodland-loss',
    href: '/ancient-woodland-loss',
    colour: '#E63946',
    metrics: [
      { label: 'Ancient woodland remaining', value: '2.5%', unit: '', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'of England covered by ancient woodland', sparklineData: [2.7, 2.6, 2.6, 2.6, 2.5, 2.5, 2.5, 2.5, 2.5] },
      { label: 'Sites under planning threat', value: '742', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'ancient woodland sites facing development threats', sparklineData: [400, 430, 460, 490, 530, 580, 630, 680, 742] },
    ],
  },
  'air-quality-schools': {
    topic: 'Air Quality Near Schools',
    slug: 'air-quality-schools',
    href: '/air-quality-schools',
    colour: '#E63946',
    metrics: [
      { label: 'Schools near illegal air pollution', value: '2,552', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'in areas exceeding WHO guidelines', sparklineData: [3500, 3400, 3200, 3000, 2900, 2800, 2700, 2600, 2552] },
      { label: 'Children at risk', value: '1.1m', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'attending schools in polluted areas', sparklineData: [1800000, 1700000, 1600000, 1500000, 1400000, 1350000, 1250000, 1150000, 1100000] },
    ],
  },
  'heat-network-rollout': {
    topic: 'Heat Network Rollout',
    slug: 'heat-network-rollout',
    href: '/heat-network-rollout',
    colour: '#2A9D8F',
    metrics: [
      { label: 'UK district heating share', value: '2%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'of heat supply · UK target is 20% by 2050', sparklineData: [0.5, 0.7, 0.8, 1, 1.2, 1.4, 1.6, 1.8, 2] },
      { label: 'Heat network connections', value: '480,000', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'homes and buildings connected', sparklineData: [100000, 150000, 200000, 250000, 300000, 350000, 390000, 430000, 480000] },
    ],
  },
  'packaging-waste-recycling': {
    topic: 'Packaging Waste Recycling',
    slug: 'packaging-waste-recycling',
    href: '/packaging-waste-recycling',
    colour: '#2A9D8F',
    metrics: [
      { label: 'Packaging recycling rate', value: '66%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'of packaging waste recycled in UK', sparklineData: [56, 58, 60, 61, 62, 64, 64, 65, 66] },
      { label: 'Plastic packaging recycled', value: '44%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'below 50% EU target · improving slowly', sparklineData: [32, 34, 36, 38, 39, 40, 41, 43, 44] },
    ],
  },
  'carbon-capture-progress': {
    topic: 'Carbon Capture Progress',
    slug: 'carbon-capture-progress',
    href: '/carbon-capture-progress',
    colour: '#264653',
    metrics: [
      { label: 'UK CCUS capacity target by 2030', value: '6 MtCO\u2082', unit: 'pa', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'million tonnes CO\u2082 captured annually', sparklineData: [0, 0, 0, 0, 0, 0, 0.1, 0.5, 1] },
      { label: 'Track Cluster projects', value: '2', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'HyNet North West and East Coast Cluster · in development', sparklineData: [0, 0, 0, 0, 1, 1, 2, 2, 2] },
    ],
  },
  'nature-based-solutions': {
    topic: 'Nature-Based Solutions',
    slug: 'nature-based-solutions',
    href: '/nature-based-solutions',
    colour: '#2A9D8F',
    metrics: [
      { label: 'Peatland restored (ha/yr)', value: '17,000', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'hectares of peatland restored annually', sparklineData: [3000, 4000, 5000, 7000, 9000, 11000, 13000, 15000, 17000] },
      { label: 'Biodiversity Net Gain adoption', value: '60%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'of planning applications applying BNG', sparklineData: [0, 0, 5, 10, 20, 30, 40, 50, 60] },
    ],
  },
  'ocean-acidification': {
    topic: 'Ocean Acidification',
    slug: 'ocean-acidification',
    href: '/ocean-acidification',
    colour: '#264653',
    metrics: [
      { label: 'pH reduction since 1850', value: '0.11', unit: 'pH units', direction: 'down' as const, polarity: 'up-is-good' as const, context: '26% increase in acidity · accelerating', sparklineData: [8.2, 8.18, 8.16, 8.14, 8.12, 8.11, 8.1, 8.1, 8.09] },
      { label: 'UK marine protected areas', value: '38%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'of UK waters designated as MPAs', sparklineData: [10, 15, 20, 24, 28, 32, 35, 36, 38] },
    ],
  },
  'light-pollution': {
    topic: 'Light Pollution',
    slug: 'light-pollution',
    href: '/light-pollution',
    colour: '#6B7280',
    metrics: [
      { label: 'Increase in artificial sky glow', value: '2% pa', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'globally increasing year on year', sparklineData: [1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2, 2, 2] },
      { label: 'Dark sky areas in England', value: '6', unit: '', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'International Dark Sky reserves and parks', sparklineData: [3, 3, 4, 4, 5, 5, 6, 6, 6] },
    ],
  },
  'e-waste-recycling': {
    topic: 'E-Waste Recycling',
    slug: 'e-waste-recycling',
    href: '/e-waste-recycling',
    colour: '#6B7280',
    metrics: [
      { label: 'E-waste generated', value: '1.5m tonnes', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'of electrical/electronic waste per year in UK', sparklineData: [1.1, 1.15, 1.2, 1.25, 1.3, 1.35, 1.4, 1.45, 1.5] },
      { label: 'E-waste recycling rate', value: '42%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'formally collected and recycled', sparklineData: [32, 33, 35, 36, 38, 39, 40, 41, 42] },
    ],
  },
  'ethnic-minority-poverty': {
    topic: 'Ethnic Minority Poverty',
    slug: 'ethnic-minority-poverty',
    href: '/ethnic-minority-poverty',
    colour: '#E63946',
    metrics: [
      { label: 'Poverty rate for ethnic minorities', value: '30%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'vs 17% for white British households', sparklineData: [28, 28, 29, 29, 30, 30, 30, 30, 30] },
      { label: 'Bangladeshi household poverty rate', value: '46%', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'highest of any ethnic group · falling but persistent', sparklineData: [55, 54, 52, 51, 50, 49, 48, 47, 46] },
    ],
  },
  'disability-hate-crime': {
    topic: 'Disability Hate Crime',
    slug: 'disability-hate-crime',
    href: '/disability-hate-crime',
    colour: '#E63946',
    metrics: [
      { label: 'Disability hate crimes recorded', value: '12,500', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'in 2022/23 · up 75% in 5 years', sparklineData: [5000, 5500, 6500, 7500, 8500, 9500, 10500, 11500, 12500] },
      { label: 'Charge/summons rate', value: '6.6%', unit: '', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'cases resulting in charge · very low', sparklineData: [9, 8.5, 8, 7.5, 7.5, 7.5, 7, 7, 6.6] },
    ],
  },
  'childcare-cost-barrier': {
    topic: 'Childcare Cost Barrier',
    slug: 'childcare-cost-barrier',
    href: '/childcare-cost-barrier',
    colour: '#E63946',
    metrics: [
      { label: 'Annual nursery cost under-2', value: '£14,800', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'for full-time childcare · UK second most expensive in world', sparklineData: [10000, 10500, 11000, 11500, 12000, 12500, 13000, 14000, 14800] },
      { label: 'Parents reducing work hours', value: '29%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'due to unaffordable childcare costs', sparklineData: [20, 21, 22, 23, 24, 25, 26, 28, 29] },
    ],
  },
  'holiday-hunger': {
    topic: 'Holiday Hunger',
    slug: 'holiday-hunger',
    href: '/holiday-hunger',
    colour: '#E63946',
    metrics: [
      { label: 'Children at risk of holiday hunger', value: '4m', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'who rely on free school meals during term', sparklineData: [1500000, 1700000, 2000000, 2200000, 2500000, 2800000, 3200000, 3600000, 4000000] },
      { label: 'Holiday Activities Fund reach', value: '600k', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'children reached by HAF programme in 2023', sparklineData: [0, 0, 0, 100000, 200000, 350000, 450000, 550000, 600000] },
    ],
  },
  'payday-loan-decline': {
    topic: 'Payday Loan Decline',
    slug: 'payday-loan-decline',
    href: '/payday-loan-decline',
    colour: '#264653',
    metrics: [
      { label: 'Payday loans issued', value: '1.5m', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'in 2022 · down from 10m in 2013', sparklineData: [10000000, 8000000, 6000000, 4000000, 3000000, 2500000, 2000000, 1700000, 1500000] },
      { label: 'BNPL arrears', value: '2.8m', unit: 'accounts', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'buy-now-pay-later accounts in arrears · new form of debt', sparklineData: [0, 0.2, 0.5, 0.8, 1.2, 1.6, 2, 2.5, 2.8] },
    ],
  },
  'energy-disconnections': {
    topic: 'Energy Disconnections',
    slug: 'energy-disconnections',
    href: '/energy-disconnections',
    colour: '#E63946',
    metrics: [
      { label: 'Self-disconnected prepayment meters', value: '3.2m', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'households going without energy due to inability to top up', sparklineData: [1500000, 1600000, 1800000, 2000000, 2100000, 2200000, 2500000, 3000000, 3200000] },
      { label: 'Forced PPM installations', value: '94k', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'debt-related prepayment meter installations in 2022', sparklineData: [30000, 35000, 40000, 45000, 50000, 55000, 70000, 94000, 40000] },
    ],
  },
  'council-tax-debt': {
    topic: 'Council Tax Debt',
    slug: 'council-tax-debt',
    href: '/council-tax-debt',
    colour: '#E63946',
    metrics: [
      { label: 'Council tax debt outstanding', value: '£6bn', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'cumulative unpaid council tax in England', sparklineData: [3, 3.5, 4, 4.5, 5, 5.2, 5.5, 5.8, 6] },
      { label: 'Households in council tax arrears', value: '1.6m', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'with outstanding council tax debt', sparklineData: [900000, 1000000, 1100000, 1200000, 1300000, 1350000, 1450000, 1550000, 1600000] },
    ],
  },
  'pension-credit-take-up': {
    topic: 'Pension Credit Take-Up',
    slug: 'pension-credit-take-up',
    href: '/pension-credit-take-up',
    colour: '#E63946',
    metrics: [
      { label: 'Eligible but not claiming', value: '850k', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'pensioner households missing out on £1,800/yr', sparklineData: [1000000, 980000, 950000, 920000, 900000, 880000, 870000, 860000, 850000] },
      { label: 'Pension Credit take-up rate', value: '63%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'of eligible pensioners claim their entitlement', sparklineData: [55, 56, 57, 58, 59, 60, 61, 62, 63] },
    ],
  },
  'car-insurance-poverty': {
    topic: 'Car Insurance Poverty',
    slug: 'car-insurance-poverty',
    href: '/car-insurance-poverty',
    colour: '#E63946',
    metrics: [
      { label: 'Average car insurance premium', value: '£924', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'in 2024 · up 58% in two years', sparklineData: [450, 480, 500, 520, 540, 560, 580, 700, 924] },
      { label: 'Young drivers (17–24) average premium', value: '£1,900', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'pricing young workers out of car ownership', sparklineData: [1200, 1250, 1300, 1350, 1400, 1450, 1500, 1650, 1900] },
    ],
  },
  'emergency-dental-access': {
    topic: 'Emergency Dental Access',
    slug: 'emergency-dental-access',
    href: '/emergency-dental-access',
    colour: '#E63946',
    metrics: [
      { label: 'Adults unable to access NHS dentist', value: '7.6m', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'in England · seeking private treatment or going without', sparklineData: [2000000, 2500000, 3000000, 3500000, 4000000, 4500000, 5500000, 6500000, 7600000] },
      { label: 'Dental A&E visits', value: '185k', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'emergency department visits for dental pain', sparklineData: [100000, 110000, 120000, 130000, 140000, 150000, 160000, 175000, 185000] },
    ],
  },
  'financial-abuse-elderly': {
    topic: 'Financial Abuse of Older People',
    slug: 'financial-abuse-elderly',
    href: '/financial-abuse-elderly',
    colour: '#E63946',
    metrics: [
      { label: 'Older people experiencing financial abuse', value: '180k', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'per year in the UK · mostly by family members', sparklineData: [100000, 110000, 120000, 130000, 140000, 150000, 160000, 170000, 180000] },
      { label: 'Total losses estimated', value: '£1.5bn', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'annually to elder financial abuse', sparklineData: [0.8, 0.9, 1, 1.1, 1.1, 1.2, 1.3, 1.4, 1.5] },
    ],
  },
  'over-the-counter-medicine-costs': {
    topic: 'Over-The-Counter Medicine Costs',
    slug: 'over-the-counter-medicine-costs',
    href: '/over-the-counter-medicine-costs',
    colour: '#F4A261',
    metrics: [
      { label: 'OTC price index vs 2021', value: '142', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '42% increase in OTC medicine prices since 2021', sparklineData: [100, 102, 105, 108, 112, 118, 125, 135, 142] },
      { label: 'NHS prescription charge 2024', value: '£9.90', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'per item · many avoid prescriptions due to cost', sparklineData: [8.2, 8.4, 8.6, 8.8, 9, 9.15, 9.35, 9.65, 9.9] },
    ],
  },
  'carer-mental-health': {
    topic: "Carers' Mental Health",
    slug: 'carer-mental-health',
    href: '/carer-mental-health',
    colour: '#264653',
    metrics: [
      { label: 'Carers with mental health problems', value: '72%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'of unpaid carers report mental health issues', sparklineData: [60, 62, 64, 65, 67, 68, 70, 71, 72] },
      { label: 'Accessing professional support', value: '24%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'of carers with mental health problems get help', sparklineData: [18, 19, 20, 20, 21, 21, 22, 23, 24] },
    ],
  },
  'disabled-children-care': {
    topic: 'Disabled Children Care',
    slug: 'disabled-children-care',
    href: '/disabled-children-care',
    colour: '#264653',
    metrics: [
      { label: 'Disabled children needing care', value: '240k', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'estimated need for social care support', sparklineData: [200000, 205000, 210000, 215000, 220000, 225000, 230000, 235000, 240000] },
      { label: 'Children receiving support', value: '89k', unit: '', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'only 37% of those in need receive support', sparklineData: [88000, 88000, 88000, 89000, 89000, 89000, 89000, 89000, 89000] },
    ],
  },
  'hospice-capacity-gap': {
    topic: 'Hospice Capacity Gap',
    slug: 'hospice-capacity-gap',
    href: '/hospice-capacity-gap',
    colour: '#264653',
    metrics: [
      { label: 'Hospice beds in England', value: '3,300', unit: '', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'specialist palliative care beds', sparklineData: [3100, 3100, 3150, 3200, 3200, 3250, 3300, 3300, 3300] },
      { label: 'Estimated shortfall', value: '1,200', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'beds against assessed need', sparklineData: [900, 950, 1000, 1050, 1100, 1100, 1150, 1200, 1200] },
    ],
  },
  'learning-disability-inpatient': {
    topic: 'Learning Disability Inpatients',
    slug: 'learning-disability-inpatient',
    href: '/learning-disability-inpatient',
    colour: '#E63946',
    metrics: [
      { label: 'In long-stay inpatient settings', value: '2,150', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'with learning disabilities and/or autism', sparklineData: [3400, 3200, 3000, 2800, 2700, 2600, 2400, 2300, 2150] },
      { label: 'Average length of stay', value: '5.4 years', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'well above recommended short-term admission', sparklineData: [5, 5.1, 5.2, 5.2, 5.3, 5.3, 5.4, 5.4, 5.4] },
    ],
  },
  'autism-adult-diagnosis': {
    topic: 'Adult Autism Diagnosis Waits',
    slug: 'autism-adult-diagnosis',
    href: '/autism-adult-diagnosis',
    colour: '#264653',
    metrics: [
      { label: 'Average wait for adult diagnosis', value: '3.6 years', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'for adult autism assessment on NHS', sparklineData: [0.5, 0.8, 1.2, 1.8, 2.2, 2.6, 3, 3.3, 3.6] },
      { label: 'On waiting list', value: '116k', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'awaiting adult autism assessment', sparklineData: [20000, 30000, 45000, 60000, 72000, 84000, 96000, 106000, 116000] },
    ],
  },
  'respite-care-shortage': {
    topic: 'Respite Care Shortage',
    slug: 'respite-care-shortage',
    href: '/respite-care-shortage',
    colour: '#264653',
    metrics: [
      { label: 'Carers able to access respite', value: '41%', unit: '', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down from 56% in 2015', sparklineData: [56, 54, 52, 50, 48, 46, 44, 42, 41] },
      { label: 'Unpaid carers in England', value: '5.8m', unit: '', direction: 'flat' as const, polarity: 'neutral' as const, context: 'providing unpaid care', sparklineData: [5.4, 5.4, 5.5, 5.6, 5.7, 5.7, 5.8, 5.8, 5.8] },
    ],
  },
  'prison-reentry-support': {
    topic: 'Prison Reentry Support',
    slug: 'prison-reentry-support',
    href: '/prison-reentry-support',
    colour: '#6B7280',
    metrics: [
      { label: 'Reoffending within 1 year', value: '46%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'of adults released from prison', sparklineData: [47, 47, 47, 46, 46, 46, 46, 46, 46] },
      { label: 'Prison discharge grant', value: '£46', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'on release · unchanged for decades in real terms', sparklineData: [46, 46, 46, 46, 46, 46, 46, 46, 46] },
    ],
  },
  'bereavement-support': {
    topic: 'Bereavement Support',
    slug: 'bereavement-support',
    href: '/bereavement-support',
    colour: '#264653',
    metrics: [
      { label: 'Bereaved annually in England', value: '600k', unit: '', direction: 'flat' as const, polarity: 'neutral' as const, context: 'people bereaved each year', sparklineData: [570000, 575000, 580000, 585000, 590000, 595000, 598000, 600000, 600000] },
      { label: 'Accessing specialist support', value: '9%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'of bereaved people receive specialist help', sparklineData: [5, 5, 6, 6, 7, 7, 8, 8, 9] },
    ],
  },
  'loneliness-elderly': {
    topic: 'Loneliness in Older People',
    slug: 'loneliness-elderly',
    href: '/loneliness-elderly',
    colour: '#264653',
    metrics: [
      { label: 'Over-65s chronically lonely', value: '1.4m', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'in England · 1 in 7 older people', sparklineData: [1200000, 1220000, 1250000, 1280000, 1300000, 1320000, 1350000, 1380000, 1400000] },
      { label: 'Risk increase from loneliness', value: '26%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'increased risk of premature death', sparklineData: [26, 26, 26, 26, 26, 26, 26, 26, 26] },
    ],
  },
  'refugee-mental-health-support': {
    topic: 'Refugee Mental Health Support',
    slug: 'refugee-mental-health-support',
    href: '/refugee-mental-health-support',
    colour: '#264653',
    metrics: [
      { label: 'Refugees with trauma history', value: '68%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'in England with significant trauma history', sparklineData: [65, 65, 66, 66, 67, 67, 68, 68, 68] },
      { label: 'Accessing specialist support', value: '15%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'of refugees who need support receive it', sparklineData: [8, 9, 10, 11, 11, 12, 13, 14, 15] },
    ],
  },
  'fraud-prosecution-gap': {
    topic: 'Fraud Prosecution Gap',
    slug: 'fraud-prosecution-gap',
    href: '/fraud-prosecution-gap',
    colour: '#6B7280',
    metrics: [
      { label: 'Fraud share of all crime', value: '40%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'by volume in England and Wales', sparklineData: [25, 27, 29, 31, 33, 35, 37, 38, 40] },
      { label: 'Police resources to fraud', value: '1%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'proportion of police resources allocated', sparklineData: [1, 1, 1, 1, 1, 1, 1, 1, 1] },
    ],
  },
  'terrorism-prosecutions': {
    topic: 'Terrorism Prosecutions',
    slug: 'terrorism-prosecutions',
    href: '/terrorism-prosecutions',
    colour: '#6B7280',
    metrics: [
      { label: 'Terrorism-related arrests (2023)', value: '350', unit: '', direction: 'flat' as const, polarity: 'neutral' as const, context: 'across all ideologies in the UK', sparklineData: [280, 290, 300, 310, 320, 310, 280, 290, 350] },
      { label: 'Conviction rate at trial', value: '74%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'of terrorism cases that reach trial', sparklineData: [65, 66, 67, 68, 70, 71, 72, 73, 74] },
    ],
  },
  'asset-recovery-rates': {
    topic: 'Asset Recovery Rates',
    slug: 'asset-recovery-rates',
    href: '/asset-recovery-rates',
    colour: '#6B7280',
    metrics: [
      { label: 'Criminal assets recovered', value: '£378m', unit: 'pa', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'annually recovered from criminals', sparklineData: [200, 220, 240, 260, 280, 300, 330, 360, 378] },
      { label: 'Recovery rate', value: '3%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'of estimated £12bn laundered annually', sparklineData: [2, 2, 2, 2, 2, 3, 3, 3, 3] },
    ],
  },
  'facial-recognition-policing': {
    topic: 'Facial Recognition Policing',
    slug: 'facial-recognition-policing',
    href: '/facial-recognition-policing',
    colour: '#6B7280',
    metrics: [
      { label: 'Met Police LFR deployments (2024)', value: '97', unit: '', direction: 'up' as const, polarity: 'neutral' as const, context: 'live facial recognition operations', sparklineData: [0, 0, 5, 12, 25, 45, 60, 80, 97] },
      { label: 'Identifications made', value: '454', unit: '', direction: 'up' as const, polarity: 'neutral' as const, context: 'suspects identified via LFR in 2024', sparklineData: [0, 0, 20, 50, 100, 180, 280, 370, 454] },
    ],
  },
  'community-sentence-outcomes': {
    topic: 'Community Sentence Outcomes',
    slug: 'community-sentence-outcomes',
    href: '/community-sentence-outcomes',
    colour: '#6B7280',
    metrics: [
      { label: 'Community sentence reoffending', value: '32%', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'vs 45% for short custodial sentences', sparklineData: [38, 37, 36, 36, 35, 34, 33, 33, 32] },
      { label: 'Community orders completed', value: '68%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'of community orders successfully completed', sparklineData: [60, 61, 62, 63, 64, 65, 66, 67, 68] },
    ],
  },
  'youth-diversion-outcomes': {
    topic: 'Youth Diversion Outcomes',
    slug: 'youth-diversion-outcomes',
    href: '/youth-diversion-outcomes',
    colour: '#2A9D8F',
    metrics: [
      { label: 'Fall in youth reoffending since 2010', value: '50%', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'dramatic reduction over 14 years', sparklineData: [100, 92, 85, 78, 72, 67, 62, 56, 50] },
      { label: 'Young people in custody', value: '430', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'in youth custody · down from 3,000 in 2010', sparklineData: [3000, 2600, 2200, 1800, 1400, 1100, 800, 600, 430] },
    ],
  },
  'court-interpreter-services': {
    topic: 'Court Interpreter Services',
    slug: 'court-interpreter-services',
    href: '/court-interpreter-services',
    colour: '#6B7280',
    metrics: [
      { label: 'Interpreter booking failures (2023)', value: '10,200', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'failed bookings in Crown and magistrates courts', sparklineData: [5000, 5500, 6000, 6500, 7000, 7500, 8500, 9500, 10200] },
      { label: 'Cases delayed', value: '8%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'of cases with interpreter requirement were delayed', sparklineData: [3, 3.5, 4, 4.5, 5, 5.5, 6.5, 7.5, 8] },
    ],
  },
  'immigration-detention': {
    topic: 'Immigration Detention',
    slug: 'immigration-detention',
    href: '/immigration-detention',
    colour: '#6B7280',
    metrics: [
      { label: 'In immigration detention daily', value: '2,900', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'held on any given day · no time limit', sparklineData: [3000, 3200, 3400, 3200, 2500, 1800, 1900, 2400, 2900] },
      { label: 'Released without removal', value: '60%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'of detainees released back into the community', sparklineData: [55, 56, 57, 58, 59, 60, 60, 60, 60] },
    ],
  },
  'civil-legal-aid-deserts': {
    topic: 'Civil Legal Aid Deserts',
    slug: 'civil-legal-aid-deserts',
    href: '/civil-legal-aid-deserts',
    colour: '#6B7280',
    metrics: [
      { label: 'Areas with no housing legal aid', value: '54%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'of local authority areas in England and Wales', sparklineData: [20, 25, 30, 35, 40, 44, 48, 51, 54] },
      { label: 'Fall in legal aid cases since 2010', value: '60%', unit: '', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'cases funded by legal aid have collapsed', sparklineData: [0, -10, -20, -30, -38, -44, -50, -55, -60] },
    ],
  },
  'misogyny-policing': {
    topic: 'Violence Against Women & Girls',
    slug: 'misogyny-policing',
    href: '/misogyny-policing',
    colour: '#E63946',
    metrics: [
      { label: 'Rape charge rate', value: '3.3%', unit: '', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'of reported rapes result in a charge', sparklineData: [7, 6, 5.5, 5, 4.5, 4, 3.5, 3.3, 3.3] },
      { label: 'Cases reaching court', value: '6%', unit: '', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'of reported rapes reach Crown Court', sparklineData: [15, 13, 11, 10, 9, 8, 7, 6, 6] },
    ],
  },

  'ambulance-rural-response': {
    topic: 'Ambulance Rural Response',
    slug: 'ambulance-rural-response',
    href: '/ambulance-rural-response',
    colour: '#E63946',
    metrics: [
      { label: 'Rural Cat 2 response time', value: '48 min', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '+8 min vs urban average', sparklineData: [32,34,36,38,40,42,44,46,48] },
      { label: 'Rural ambulance stations closed since 2010', value: '42', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'consolidation continues', sparklineData: [12,16,20,24,28,32,35,38,42] },
    ],
  },
  'birth-trauma': {
    topic: 'Birth Trauma',
    slug: 'birth-trauma',
    href: '/birth-trauma',
    colour: '#E63946',
    metrics: [
      { label: 'Women reporting birth trauma', value: '30%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'approximately 1 in 3', sparklineData: [28,28,29,29,29,30,30,30,30] },
      { label: 'Access to birth reflections service', value: '52%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'trusts offering the service', sparklineData: [30,33,36,39,42,44,46,49,52] },
    ],
  },
  'nhs-waiting-list-inequality': {
    topic: 'NHS Waiting List Inequality',
    slug: 'nhs-waiting-list-inequality',
    href: '/nhs-waiting-list-inequality',
    colour: '#E63946',
    metrics: [
      { label: 'Deprivation wait gap', value: '20%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'most vs least deprived quintile', sparklineData: [12,13,14,15,16,17,18,19,20] },
      { label: 'Longest average wait region', value: '22 weeks', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'North West England', sparklineData: [14,15,16,17,18,19,20,21,22] },
    ],
  },
  'compulsive-gambling-youth': {
    topic: 'Youth Gambling Harm',
    slug: 'compulsive-gambling-youth',
    href: '/compulsive-gambling-youth',
    colour: '#F4A261',
    metrics: [
      { label: 'Problem gamblers aged 11-16', value: '55,000', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Gambling Commission youth survey', sparklineData: [30,35,38,40,42,45,48,52,55] },
      { label: 'Children gambling online weekly', value: '7%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 4% in 2019', sparklineData: [4.0,4.5,5.0,5.5,6.0,6.2,6.5,6.8,7.0] },
    ],
  },
  'spiking-reports': {
    topic: 'Spiking Reports',
    slug: 'spiking-reports',
    href: '/spiking-reports',
    colour: '#6B7280',
    metrics: [
      { label: 'Recorded spiking incidents', value: '6,700', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '+110% since 2019', sparklineData: [3200,3500,3800,4200,4800,5200,5600,6200,6700] },
      { label: 'Estimated reporting rate', value: '15%', unit: '', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'vast majority unreported', sparklineData: [14,14,14,15,15,15,15,15,15] },
    ],
  },
  'shoplifting-surge': {
    topic: 'Shoplifting Surge',
    slug: 'shoplifting-surge',
    href: '/shoplifting-surge',
    colour: '#6B7280',
    metrics: [
      { label: 'Recorded shoplifting offences', value: '469,000', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '+30% in one year', sparklineData: [300,310,320,290,340,350,360,400,469] },
      { label: 'Charge rate for shoplifting', value: '12%', unit: '', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down from 18% in 2015', sparklineData: [18,17,16,15,15,14,13,13,12] },
    ],
  },
  'public-sector-staffing': {
    topic: 'Public Sector Staffing',
    slug: 'public-sector-staffing',
    href: '/public-sector-staffing',
    colour: '#6B7280',
    metrics: [
      { label: 'Civil service vacancy rate', value: '4.8%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'highest on record', sparklineData: [2.5,2.8,3.0,3.2,3.5,3.8,4.2,4.5,4.8] },
      { label: 'Average civil service turnover', value: '14%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 9% in 2018', sparklineData: [9,10,10,11,11,12,13,13,14] },
    ],
  },
  'returnerships': {
    topic: 'Returnerships & Over-50s Work',
    slug: 'returnerships',
    href: '/returnerships',
    colour: '#6B7280',
    metrics: [
      { label: 'Economically inactive 50-64s', value: '3.5m', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '+400k since 2020', sparklineData: [2.9,3.0,3.0,3.1,3.2,3.3,3.3,3.4,3.5] },
      { label: 'Employers offering returnerships', value: '8%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up from 3% in 2020', sparklineData: [3,3,4,4,5,6,6,7,8] },
    ],
  },
  'modular-housing': {
    topic: 'Modular Housing',
    slug: 'modular-housing',
    href: '/modular-housing',
    colour: '#F4A261',
    metrics: [
      { label: 'Annual modular completions', value: '8,200', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'target: 30,000+', sparklineData: [3000,3500,4200,5000,5800,6400,7000,7600,8200] },
      { label: 'Modular share of new builds', value: '3.5%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'still a small fraction', sparklineData: [1.2,1.4,1.7,2.0,2.3,2.6,2.9,3.2,3.5] },
    ],
  },
  'green-belt-pressure': {
    topic: 'Green Belt Pressure',
    slug: 'green-belt-pressure',
    href: '/green-belt-pressure',
    colour: '#2A9D8F',
    metrics: [
      { label: 'Green belt planning applications', value: '12,400', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '+40% since 2018', sparklineData: [8800,9200,9600,10000,10400,10800,11200,11800,12400] },
      { label: 'Green belt land released (hectares)', value: '4,500', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'in 2023-24', sparklineData: [1500,1800,2200,2600,3000,3400,3800,4200,4500] },
    ],
  },
  'alternative-provision': {
    topic: 'Alternative Provision',
    slug: 'alternative-provision',
    href: '/alternative-provision',
    colour: '#2A9D8F',
    metrics: [
      { label: 'Children in alternative provision', value: '41,000', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'rising due to exclusions', sparklineData: [32000,33500,35000,36000,37000,38000,39000,40000,41000] },
      { label: 'AP pupils achieving grade 4+ English & Maths', value: '4%', unit: '', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'vs 65% mainstream', sparklineData: [3,3,3,4,4,4,4,4,4] },
    ],
  },
  'school-building-condition': {
    topic: 'School Building Condition',
    slug: 'school-building-condition',
    href: '/school-building-condition',
    colour: '#2A9D8F',
    metrics: [
      { label: 'Schools with critical condition ratings', value: '1,100', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'RAAC and structural issues', sparklineData: [500,550,600,650,700,800,850,950,1100] },
      { label: 'Maintenance backlog', value: '£11.4bn', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from £6.6bn in 2017', sparklineData: [6.6,7.0,7.5,8.0,8.5,9.0,9.8,10.6,11.4] },
    ],
  },
  'school-meals-procurement': {
    topic: 'School Meals Quality',
    slug: 'school-meals-procurement',
    href: '/school-meals-procurement',
    colour: '#2A9D8F',
    metrics: [
      { label: 'Average cost per primary meal', value: '£2.30', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: '+15% in 10 years vs 40% food inflation', sparklineData: [2.0,2.02,2.05,2.08,2.1,2.14,2.18,2.24,2.3] },
      { label: 'Schools failing food standards checks', value: '18%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 12% in 2019', sparklineData: [12,13,13,14,15,16,16,17,18] },
    ],
  },
  'pet-food-banks': {
    topic: 'Pet Poverty',
    slug: 'pet-food-banks',
    href: '/pet-food-banks',
    colour: '#F4A261',
    metrics: [
      { label: 'Pet food bank parcels distributed', value: '320,000', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '+500% since 2020', sparklineData: [50,55,80,120,160,200,240,280,320] },
      { label: 'Pet owners unable to afford vet care', value: '2m', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'estimated', sparklineData: [0.8,0.9,1.0,1.2,1.4,1.5,1.7,1.8,2.0] },
    ],
  },
  'uniform-cost-burden': {
    topic: 'School Uniform Costs',
    slug: 'uniform-cost-burden',
    href: '/uniform-cost-burden',
    colour: '#F4A261',
    metrics: [
      { label: 'Average secondary uniform cost', value: '£337', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '+25% since 2020', sparklineData: [240,252,265,278,290,305,315,326,337] },
      { label: 'Families cutting other spending for uniform', value: '23%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 16% in 2019', sparklineData: [16,17,18,19,20,21,21,22,23] },
    ],
  },
  'wildfire-risk-uk': {
    topic: 'UK Wildfire Risk',
    slug: 'wildfire-risk-uk',
    href: '/wildfire-risk-uk',
    colour: '#264653',
    metrics: [
      { label: 'Annual wildfire incidents', value: '73,000', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '+50% in a decade', sparklineData: [48,50,52,55,58,61,64,68,73] },
      { label: 'Hectares burned per year', value: '79,000', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'three-year rolling average', sparklineData: [50,53,56,59,62,65,70,74,79] },
    ],
  },
  'water-lead-pipes': {
    topic: 'Lead Water Pipes',
    slug: 'water-lead-pipes',
    href: '/water-lead-pipes',
    colour: '#264653',
    metrics: [
      { label: 'Homes with lead pipes', value: '8m', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'no national replacement programme', sparklineData: [9.5,9.3,9.1,8.9,8.7,8.5,8.3,8.1,8.0] },
      { label: 'Schools with lead pipes tested', value: '12%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'most untested', sparklineData: [2,3,4,5,6,7,8,10,12] },
    ],
  },
  '5g-coverage-inequality': {
    topic: '5G Coverage Inequality',
    slug: '5g-coverage-inequality',
    href: '/5g-coverage-inequality',
    colour: '#264653',
    metrics: [
      { label: 'UK population 5G coverage', value: '50%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up from 0% in 2019', sparklineData: [0,5,12,20,28,35,40,45,50] },
      { label: 'Rural 5G coverage', value: '12%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'vs 65% urban', sparklineData: [0,0,1,2,4,6,7,9,12] },
    ],
  },
  'pavement-parking': {
    topic: 'Pavement Parking',
    slug: 'pavement-parking',
    href: '/pavement-parking',
    colour: '#6B7280',
    metrics: [
      { label: 'Wheelchair users affected', value: '80%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'reporting pavement access issues', sparklineData: [78,78,79,79,79,80,80,80,80] },
      { label: 'Councils with pavement parking enforcement', value: '18%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up from 8% in 2019', sparklineData: [8,9,10,11,12,13,14,16,18] },
    ],
  },
  'voter-id-impact': {
    topic: 'Voter ID Impact',
    slug: 'voter-id-impact',
    href: '/voter-id-impact',
    colour: '#6B7280',
    metrics: [
      { label: 'Voters turned away at polls', value: '14,000', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'first elections with ID requirement', sparklineData: [0,0,0,0,0,0,0,0,14] },
      { label: 'Adults without accepted photo ID', value: '3.5m', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'disproportionately young and minority', sparklineData: [4.0,4.0,3.8,3.8,3.7,3.6,3.6,3.5,3.5] },
    ],
  },
  'kinship-care-support': {
    topic: 'Kinship Care Support',
    slug: 'kinship-care-support',
    href: '/kinship-care-support',
    colour: '#2A9D8F',
    metrics: [
      { label: 'Children in kinship care', value: '180,000', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'rising as fostering declines', sparklineData: [140,145,150,155,160,165,170,175,180] },
      { label: 'Kinship carers receiving allowance', value: '22%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up from 15% in 2019', sparklineData: [15,16,17,17,18,19,19,20,22] },
    ],
  },
  'baby-loss-support': {
    topic: 'Baby Loss Support',
    slug: 'baby-loss-support',
    href: '/baby-loss-support',
    colour: '#E63946',
    metrics: [
      { label: 'Pregnancies ending in loss', value: '1 in 4', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'miscarriage, stillbirth, neonatal death', sparklineData: [25,25,25,25,25,25,25,25,25] },
      { label: 'Trusts with bereavement midwife', value: '72%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up from 55% in 2019', sparklineData: [55,58,60,62,64,66,68,70,72] },
    ],
  },

  'adult-obesity': { topic: 'Adult Obesity', slug: 'adult-obesity', href: '/adult-obesity', colour: '#E63946', preposition: 'with', metrics: [
    { label: 'Adult obesity prevalence (England)', value: '29.5%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 26.9% in 2015 · highest rate on record', sparklineData: [26.9,27.2,27.5,28,28.5,29,29.5] },
    { label: 'Severe obesity (BMI 40+)', value: '4.1%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 2.4% in 2010 · highest deprivation quintile twice more affected', sparklineData: [2.4,2.6,2.8,3.2,3.6,3.9,4.1] },
  ] },
  'air-quality-deaths': { topic: 'Air Quality Deaths', slug: 'air-quality-deaths', href: '/air-quality-deaths', colour: '#E63946', preposition: 'with', metrics: [
    { label: 'Premature deaths from air pollution (annual)', value: '43,000', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down from 52,000 in 2010 · still 7th worst in Europe', sparklineData: [52000,50000,48000,46000,45000,44000,43000] },
    { label: 'Local authorities breaching NO₂ limits', value: '43%', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down from 61% in 2019 · ULEZ expansion main driver', sparklineData: [61,58,55,52,49,46,43] },
  ] },
  'alcohol-specific-deaths': { topic: 'Alcohol-Specific Deaths', slug: 'alcohol-specific-deaths', href: '/alcohol-specific-deaths', colour: '#E63946', preposition: 'with', metrics: [
    { label: 'Alcohol-specific deaths (England, annual)', value: '9,641', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'record high · up 32% since 2019', sparklineData: [7300,7500,7700,8100,8600,9100,9641] },
    { label: 'Alcohol-related hospital admissions (millions)', value: '1.07', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 0.93M in 2015', sparklineData: [0.93,0.96,0.99,1.01,1.03,1.05,1.07] },
  ] },
  'audiology-waits': { topic: 'Audiology Waits', slug: 'audiology-waits', href: '/audiology-waits', colour: '#E63946', preposition: 'with', metrics: [
    { label: 'People waiting for hearing assessment (England)', value: '1.6M', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 0.8M in 2020 · longest backlog in NHS', sparklineData: [800000,900000,1100000,1300000,1450000,1550000,1600000] },
    { label: 'Average wait for hearing aid fitting (weeks)', value: '32', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 18 weeks in 2019 · 6-week standard long abandoned', sparklineData: [18,20,24,27,29,31,32] },
  ] },
  'bowel-screening': { topic: 'Bowel Cancer Screening', slug: 'bowel-screening', href: '/bowel-screening', colour: '#2A9D8F', preposition: 'with', metrics: [
    { label: 'Bowel cancer screening uptake (England)', value: '67%', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up from 56% pre-FIT test · FIT more acceptable than FOB', sparklineData: [56,58,61,63,65,66,67] },
    { label: 'Cancers caught at Stage 1–2 via screening', value: '53%', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up from 45% in 2015 · early detection saves lives', sparklineData: [45,47,48,49,50,51,53] },
  ] },
  'breast-screening': { topic: 'Breast Cancer Screening', slug: 'breast-screening', href: '/breast-screening', colour: '#2A9D8F', preposition: 'with', metrics: [
    { label: 'Breast screening coverage (3-year rate)', value: '71.1%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down from 76.8% in 2012 · pandemic gap not recovered', sparklineData: [76.8,75.9,74.8,73.2,72,71.5,71.1] },
    { label: 'Cancers detected per 1,000 screened', value: '8.3', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'stable · increasing sensitivity of mammography', sparklineData: [8,8.1,8.2,8.3,8.2,8.3,8.3] },
  ] },
  'cataract-waits': { topic: 'Cataract Waits', slug: 'cataract-waits', href: '/cataract-waits', colour: '#E63946', preposition: 'with', metrics: [
    { label: 'People waiting for cataract surgery (England)', value: '650K', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 120K in 2019 · most common elective surgery', sparklineData: [120000,150000,280000,430000,560000,620000,650000] },
    { label: 'Median wait for first cataract (weeks)', value: '41', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 9 weeks in 2019', sparklineData: [9,12,22,31,37,40,41] },
  ] },
  'cervical-screening': { topic: 'Cervical Screening', slug: 'cervical-screening', href: '/cervical-screening', colour: '#E63946', preposition: 'with', metrics: [
    { label: 'Cervical screening coverage (England, 5-year)', value: '69.9%', direction: 'down' as const, polarity: 'up-is-good' as const, context: '25-year low · down from 80.4% in 2012', sparklineData: [80.4,79.1,77.5,75,72.9,71.4,69.9] },
    { label: 'HPV detected needing treatment', value: '3.4%', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'stable · younger cohorts better protected by vaccination', sparklineData: [3.6,3.5,3.4,3.4,3.4,3.4,3.4] },
  ] },
  'child-tooth-decay': { topic: 'Child Tooth Decay', slug: 'child-tooth-decay', href: '/child-tooth-decay', colour: '#E63946', preposition: 'with', metrics: [
    { label: '5-year-olds with tooth decay (England)', value: '23.4%', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down from 30.9% in 2007/8 · still high by European standards', sparklineData: [30.9,29,27.5,26,24.8,23.9,23.4] },
    { label: 'Children admitted for tooth extraction (annual)', value: '42,000', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down from 52,000 in 2018 · still the most common childhood GA procedure', sparklineData: [52000,50000,48000,46000,44000,43000,42000] },
  ] },
  'dementia-diagnosis-rate': { topic: 'Dementia Diagnosis Rate', slug: 'dementia-diagnosis-rate', href: '/dementia-diagnosis-rate', colour: '#E63946', preposition: 'in', metrics: [
    { label: 'Dementia diagnosis rate (of estimated cases)', value: '62.2%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down from 67.4% peak in 2016 · NHS target is 66.7%', sparklineData: [60,63,67.4,66,65,63,62.2] },
    { label: 'People living with undiagnosed dementia (est.)', value: '370K', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'rising as population ages · London worst for diagnosis gap', sparklineData: [300000,310000,310000,325000,345000,360000,370000] },
  ] },
  'hepatitis-c-treatment': { topic: 'Hepatitis C Treatment', slug: 'hepatitis-c-treatment', href: '/hepatitis-c-treatment', colour: '#2A9D8F', preposition: 'with', metrics: [
    { label: 'People starting HCV treatment (annual)', value: '11,200', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down from 21,800 in 2019 · pandemic disrupted testing pathways', sparklineData: [21800,19000,14000,10000,10500,11000,11200] },
    { label: 'Estimated undiagnosed HCV cases', value: '82,000', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down from 160,000 in 2015 · direct-acting antivirals transformative', sparklineData: [160000,140000,120000,105000,93000,86000,82000] },
  ] },
  'hip-knee-waits': { topic: 'Hip & Knee Replacement Waits', slug: 'hip-knee-waits', href: '/hip-knee-waits', colour: '#E63946', preposition: 'with', metrics: [
    { label: 'People waiting for hip/knee replacement (England)', value: '780K', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 170K in 2019 · both joints combined', sparklineData: [170000,200000,400000,580000,700000,750000,780000] },
    { label: 'Median wait for elective orthopaedic surgery (weeks)', value: '52', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 12 weeks in 2019', sparklineData: [12,15,30,43,50,51,52] },
  ] },
  'hospital-parking': { topic: 'Hospital Parking Charges', slug: 'hospital-parking', href: '/hospital-parking', colour: '#F4A261', preposition: 'with', metrics: [
    { label: 'NHS hospital trusts charging for parking', value: '92%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '2016 guidance to end charges widely ignored', sparklineData: [85,87,88,89,90,91,92] },
    { label: 'Average daily parking charge (England)', value: '£4.20', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up 40% since 2016 · some trusts charge £30+/day', sparklineData: [3,3.2,3.4,3.6,3.8,4,4.2] },
  ] },
  'hpv-vaccination': { topic: 'HPV Vaccination', slug: 'hpv-vaccination', href: '/hpv-vaccination', colour: '#2A9D8F', preposition: 'with', metrics: [
    { label: 'Girls completing HPV vaccination course', value: '84%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down from 87% in 2019 · pandemic catch-up ongoing', sparklineData: [87,86,78,81,82,83,84] },
    { label: 'Boys completing HPV vaccination course', value: '75%', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'programme extended to boys in 2019 · uptake climbing', sparklineData: [0,0,65,70,72,74,75] },
  ] },
  'melanoma-rates': { topic: 'Melanoma Rates', slug: 'melanoma-rates', href: '/melanoma-rates', colour: '#E63946', preposition: 'with', metrics: [
    { label: 'Melanoma incidence per 100,000 (UK)', value: '22.4', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up 135% in 40 years · sunbed use and holiday patterns', sparklineData: [14,16,17,18,19,21,22.4] },
    { label: 'Melanoma 5-year survival rate', value: '93%', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up from 76% in 2000 · stage IV still only 20%', sparklineData: [76,80,84,87,90,92,93] },
  ] },
  'naloxone-provision': { topic: 'Naloxone Provision', slug: 'naloxone-provision', href: '/naloxone-provision', colour: '#2A9D8F', preposition: 'with', metrics: [
    { label: 'Naloxone packs distributed in England (annual)', value: '108,000', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up from 26,000 in 2016 · each dose can reverse an overdose', sparklineData: [26000,35000,50000,65000,80000,95000,108000] },
    { label: 'Drug overdose deaths (England & Wales)', value: '4,907', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'record high in 2022 · naloxone distribution still insufficient', sparklineData: [3700,3800,4000,4200,4500,4700,4907] },
  ] },
  'nhs-app-usage': { topic: 'NHS App Usage', slug: 'nhs-app-usage', href: '/nhs-app-usage', colour: '#2A9D8F', preposition: 'with', metrics: [
    { label: 'NHS App registered users (millions)', value: '35.3', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up from 2M in 2020 · 64% of England adults', sparklineData: [2,5,11,19,27,31,35.3] },
    { label: 'GP appointments booked via NHS App (monthly)', value: '4.2M', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up from near-zero in 2020 · reduces call wait times', sparklineData: [0.1,0.4,1.2,2.1,3,3.8,4.2] },
  ] },
  'nhs-overseas-cost-recovery': { topic: 'NHS Overseas Cost Recovery', slug: 'nhs-overseas-cost-recovery', href: '/nhs-overseas-cost-recovery', colour: '#F4A261', preposition: 'with', metrics: [
    { label: 'NHS overseas treatment costs recovered (annual)', value: '£600M', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up from £295M in 2017 · target is £500M minimum', sparklineData: [295,350,390,430,490,550,600] },
    { label: 'Overseas visitor debts written off (annual)', value: '£25M', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down from £42M in 2018 · better upfront identification', sparklineData: [42,38,34,30,27,26,25] },
  ] },
  'obesity-treatment-access': { topic: 'Obesity Treatment Access', slug: 'obesity-treatment-access', href: '/obesity-treatment-access', colour: '#E63946', preposition: 'to', metrics: [
    { label: 'Adults eligible for weight-loss drugs (England)', value: '3.4M', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'NICE expanded criteria to BMI 30+ with comorbidities', sparklineData: [0,0,0,0,0.8,2,3.4] },
    { label: 'NHS tier 3 obesity service wait (months)', value: '24', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'demand far outstrips commissioned capacity', sparklineData: [8,10,12,14,18,22,24] },
  ] },
  'occupational-disease': { topic: 'Occupational Disease', slug: 'occupational-disease', href: '/occupational-disease', colour: '#6B7280', preposition: 'with', metrics: [
    { label: 'Work-related ill health cases (annual)', value: '1.8M', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'record high · stress, depression, anxiety account for 50%', sparklineData: [1.3,1.4,1.5,1.6,1.7,1.75,1.8] },
    { label: 'Days lost to work-related illness (millions)', value: '35.2', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 31.8M in 2019 · mental health main cause', sparklineData: [31.8,33,34,34.5,35,35.1,35.2] },
  ] },
  'oral-health-inequalities': { topic: 'Oral Health Inequalities', slug: 'oral-health-inequalities', href: '/oral-health-inequalities', colour: '#E63946', preposition: 'in', metrics: [
    { label: 'Children in deprived areas with tooth decay vs affluent (ratio)', value: '3:1', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'persistent gap · fluoridation coverage still under 10% of England', sparklineData: [3,3,3,3,3,3,3] },
    { label: 'Adults unable to access NHS dentist when needed', value: '42%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 26% in 2019 · NHS dentistry in systemic decline', sparklineData: [26,28,30,33,37,40,42] },
  ] },
  'same-day-emergency-care': { topic: 'Same-Day Emergency Care', slug: 'same-day-emergency-care', href: '/same-day-emergency-care', colour: '#2A9D8F', preposition: 'with', metrics: [
    { label: 'SDEC attendances (England, annual, millions)', value: '3.1', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up from 1.2M in 2019 · diverts A&E pressure', sparklineData: [1.2,1.4,1.8,2.2,2.6,2.9,3.1] },
    { label: 'A&E 4-hour performance', value: '73.0%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down from 91.3% in 2015 · 95% target not met since 2013', sparklineData: [91.3,88,83.5,78,76,74,73] },
  ] },
  'deaths-in-custody': { topic: 'Deaths in Custody', slug: 'deaths-in-custody', href: '/deaths-in-custody', colour: '#6B7280', preposition: 'with', metrics: [
    { label: 'Deaths in prison custody (England & Wales, annual)', value: '312', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'record high · self-inflicted deaths at 89', sparklineData: [233,240,250,269,280,295,312] },
    { label: 'Deaths following police contact (annual)', value: '65', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 55 in 2019 · restraint-related scrutiny increasing', sparklineData: [55,56,57,58,60,63,65] },
  ] },
  'employment-tribunal-backlog': { topic: 'Employment Tribunal Backlog', slug: 'employment-tribunal-backlog', href: '/employment-tribunal-backlog', colour: '#6B7280', preposition: 'in', metrics: [
    { label: 'Employment tribunal cases outstanding', value: '540,000', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'record high · up from 187,000 in 2018', sparklineData: [187000,210000,300000,390000,470000,510000,540000] },
    { label: 'Average wait from claim to hearing (months)', value: '24', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 9 months in 2018', sparklineData: [9,11,14,17,20,22,24] },
  ] },
  'forced-marriage': { topic: 'Forced Marriage', slug: 'forced-marriage', href: '/forced-marriage', colour: '#6B7280', preposition: 'with', metrics: [
    { label: 'Forced marriage cases handled by FMU (annual)', value: '2,068', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down from 1,735 in 2012 · COVID dip followed by rise', sparklineData: [1100,1267,1735,1800,1409,1800,2068] },
    { label: 'Under-18s in forced marriage cases', value: '25%', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'persistent proportion · 11 reported cases involved under-16s', sparklineData: [26,25,26,24,25,25,25] },
  ] },
  'homicide-rate': { topic: 'Homicide Rate', slug: 'homicide-rate', href: '/homicide-rate', colour: '#6B7280', preposition: 'with', metrics: [
    { label: 'Homicides (England & Wales, annual)', value: '602', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 571 in 2020 · knife crime driving increase', sparklineData: [545,550,560,571,580,593,602] },
    { label: 'Knife homicides as share of total', value: '40%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 30% in 2010', sparklineData: [30,32,34,36,37,39,40] },
  ] },
  'honour-based-abuse': { topic: 'Honour-Based Abuse', slug: 'honour-based-abuse', href: '/honour-based-abuse', colour: '#6B7280', preposition: 'with', metrics: [
    { label: 'Honour-based abuse crimes recorded (England & Wales)', value: '3,908', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up 81% since 2016 · better recording plus real increase', sparklineData: [2160,2400,2700,2900,3200,3600,3908] },
    { label: 'Prosecutions for honour-based abuse', value: '72', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'prosecution rate low relative to recorded crime', sparklineData: [65,68,70,72,71,73,72] },
  ] },
  'online-grooming': { topic: 'Online Grooming', slug: 'online-grooming', href: '/online-grooming', colour: '#6B7280', preposition: 'with', metrics: [
    { label: 'Online grooming offences recorded (England & Wales)', value: '6,350', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up 80% in 5 years · under-reporting still significant', sparklineData: [3500,3800,4200,4900,5600,6100,6350] },
    { label: 'Cases involving under-13s', value: '37%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 29% in 2018 · younger children increasingly targeted', sparklineData: [29,30,32,33,35,36,37] },
  ] },
  'parole-backlog': { topic: 'Parole Backlog', slug: 'parole-backlog', href: '/parole-backlog', colour: '#6B7280', preposition: 'with', metrics: [
    { label: 'Cases awaiting parole hearing', value: '11,800', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 6,200 in 2019 · prisoners held beyond minimum tariff', sparklineData: [6200,6800,7500,8500,9800,11000,11800] },
    { label: 'Average wait for parole hearing (months)', value: '18', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 11 months in 2019', sparklineData: [11,12,13,14,15,16,18] },
  ] },
  'prison-education': { topic: 'Prison Education', slug: 'prison-education', href: '/prison-education', colour: '#6B7280', preposition: 'with', metrics: [
    { label: 'Prisoners in education each week (%)', value: '28%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down from 34% in 2013 · education budget cut 40% since 2010', sparklineData: [34,33,31,30,29,28,28] },
    { label: 'Prisoners with no formal qualifications (%)', value: '57%', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'persistently high · poor literacy common on entry', sparklineData: [56,57,57,56,57,57,57] },
  ] },
  'prison-healthcare': { topic: 'Prison Healthcare', slug: 'prison-healthcare', href: '/prison-healthcare', colour: '#E63946', preposition: 'with', metrics: [
    { label: 'Prisons rated poor or inadequate for healthcare', value: '33%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'HMIP inspections 2023/24 · primary care vacancy crisis', sparklineData: [21,22,24,27,29,31,33] },
    { label: 'Mental illness prevalence in prison (estimated)', value: '70%', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: '9x community rate · personality disorder or substance misuse', sparklineData: [65,67,68,70,70,70,70] },
  ] },
  'rape-reporting-rate': { topic: 'Rape Reporting Rate', slug: 'rape-reporting-rate', href: '/rape-reporting-rate', colour: '#6B7280', preposition: 'with', metrics: [
    { label: 'Rapes reported to police (England & Wales, annual)', value: '70,633', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'record high · charge rate still only 4%', sparklineData: [35600,40000,52000,58000,63000,68000,70633] },
    { label: 'Rape charge rate (%)', value: '4.0', direction: 'down' as const, polarity: 'up-is-good' as const, context: "down from 5.7% in 2016 · most cases NFA\u2019d", sparklineData: [5.7,5.5,5,4.5,4.2,4.1,4] },
  ] },
  'scam-losses': { topic: 'Scam Losses', slug: 'scam-losses', href: '/scam-losses', colour: '#E63946', preposition: 'with', metrics: [
    { label: 'Authorised push payment fraud losses', value: '£459M', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down 12% from £524M peak · mandatory reimbursement now in force', sparklineData: [381,455,479,524,510,485,459] },
    { label: 'UK adults falling victim to scams (annual)', value: '2.7M', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 1.9M in 2018 · phone and online scams dominating', sparklineData: [1.9,2,2.2,2.4,2.5,2.6,2.7] },
  ] },
  'stop-and-search': { topic: 'Stop and Search', slug: 'stop-and-search', href: '/stop-and-search', colour: '#6B7280', preposition: 'with', metrics: [
    { label: 'Stop and searches per year (England & Wales)', value: '1.06M', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up 72% since 2016 · knife crime response', sparklineData: [380000,420000,530000,680000,780000,940000,1060000] },
    { label: 'Black people stopped vs white (ratio)', value: '7:1', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 5:1 in 2018 · disproportionality highest in London', sparklineData: [4,4.5,5,5.5,6,6.5,7] },
  ] },
  'court-fees-access': { topic: 'Court Fees & Access to Justice', slug: 'court-fees-access', href: '/court-fees-access', colour: '#6B7280', preposition: 'with', metrics: [
    { label: 'Employment tribunal fee income lost to access barriers', value: '£26M', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'Supreme Court ruled 2017 fees unlawful · civil court fees raised 2024', sparklineData: [20,22,23,24,25,26,26] },
    { label: 'County court claims issued (annual, millions)', value: '1.4', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down from 2.1M in 2015 · fee increases deterring small claims', sparklineData: [2.1,1.9,1.7,1.6,1.5,1.4,1.4] },
  ] },
  'economic-crime-scale': { topic: 'Economic Crime Scale', slug: 'economic-crime-scale', href: '/economic-crime-scale', colour: '#E63946', preposition: 'with', metrics: [
    { label: 'Total economic crime losses (UK, annual)', value: '£8.3B', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'estimate · fraud largest component at 57%', sparklineData: [5,5.8,6.3,7,7.5,8,8.3] },
    { label: 'Fraud as share of all crime (England & Wales)', value: '41%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'fraud now largest single crime type', sparklineData: [36,37,38,39,40,40,41] },
  ] },
  'loan-sharks': { topic: 'Loan Sharks', slug: 'loan-sharks', href: '/loan-sharks', colour: '#E63946', preposition: 'with', metrics: [
    { label: 'Illegal lending victims (England, estimate)', value: '1.08M', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'rising as credit tightens · avg debt £4,500 at 1,000%+ APR', sparklineData: [680000,720000,780000,860000,960000,1020000,1080000] },
    { label: 'Illegal money lending prosecutions (annual)', value: '84', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'vastly underprosecuted vs scale of problem', sparklineData: [75,80,82,85,83,84,84] },
  ] },
  'online-fraud-losses': { topic: 'Online Fraud Losses', slug: 'online-fraud-losses', href: '/online-fraud-losses', colour: '#E63946', preposition: 'with', metrics: [
    { label: 'Online fraud losses (UK consumers, annual)', value: '£1.17B', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'record high · investment fraud fastest growing', sparklineData: [620,720,820,940,1040,1110,1170] },
    { label: 'Online shopping fraud reports (annual)', value: '125,000', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 56,000 in 2018', sparklineData: [56000,68000,82000,95000,108000,118000,125000] },
  ] },
  'consumer-credit-stress': { topic: 'Consumer Credit Stress', slug: 'consumer-credit-stress', href: '/consumer-credit-stress', colour: '#F4A261', preposition: 'with', metrics: [
    { label: 'Households with unsecured debt over 40% of income', value: '8.9%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 6.1% in 2019 · cost-of-living pressure', sparklineData: [6.1,6.3,6.5,7,7.8,8.4,8.9] },
    { label: 'Credit card balances (England, £ billions)', value: '72', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from £58B in 2021 · real cost rising with high rates', sparklineData: [65,62,58,60,65,69,72] },
  ] },
  'council-tax-bailiffs': { topic: 'Council Tax Bailiffs', slug: 'council-tax-bailiffs', href: '/council-tax-bailiffs', colour: '#F4A261', preposition: 'with', metrics: [
    { label: 'Council tax enforcement actions (England, annual)', value: '2.3M', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'record · bailiff referrals up 45% since 2019', sparklineData: [1.6,1.7,1.8,1.9,2,2.2,2.3] },
    { label: 'Council tax debt outstanding (England, £ billions)', value: '6.1', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from £3.6B in 2019', sparklineData: [3.6,3.8,4.1,4.5,5,5.6,6.1] },
  ] },
  'credit-union-membership': { topic: 'Credit Union Membership', slug: 'credit-union-membership', href: '/credit-union-membership', colour: '#2A9D8F', preposition: 'in', metrics: [
    { label: 'Credit union members (Great Britain, millions)', value: '2.1', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up from 1.4M in 2015 · still tiny vs Ireland (75% membership)', sparklineData: [1.4,1.5,1.6,1.7,1.8,1.9,2.1] },
    { label: 'Credit union assets (£ billions)', value: '3.8', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'growing but still <0.1% of UK banking assets', sparklineData: [2,2.2,2.5,2.8,3.1,3.5,3.8] },
  ] },
  'green-skills-gap': { topic: 'Green Skills Gap', slug: 'green-skills-gap', href: '/green-skills-gap', colour: '#2A9D8F', preposition: 'with', metrics: [
    { label: 'Green jobs vacancy rate', value: '6.8%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'twice economy average · heat pump installers scarce', sparklineData: [2.1,2.8,3.5,4.2,5,6,6.8] },
    { label: 'Workers needing reskilling for net zero (estimate)', value: '4.8M', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'by 2030 · training provision far below need', sparklineData: [0,1,2,3,4,4.5,4.8] },
  ] },
  'household-savings-rate': { topic: 'Household Savings Rate', slug: 'household-savings-rate', href: '/household-savings-rate', colour: '#F4A261', preposition: 'with', metrics: [
    { label: 'UK household savings ratio (%)', value: '8.9', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down from 25.9% COVID peak · below pre-pandemic 6.5% norm', sparklineData: [6.5,7,25.9,12,10,9.5,8.9] },
    { label: 'Households with no savings (%)', value: '24', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 20% in 2019 · cost-of-living driven', sparklineData: [20,20,21,22,22,23,24] },
  ] },
  'manufacturing-output': { topic: 'Manufacturing Output', slug: 'manufacturing-output', href: '/manufacturing-output', colour: '#6B7280', preposition: 'with', metrics: [
    { label: 'Manufacturing output index (2019=100)', value: '96.2', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'below pre-pandemic level · Brexit supply chain disruption', sparklineData: [103,101,100,88,93,95,96.2] },
    { label: 'Manufacturing share of UK GDP (%)', value: '8.8', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down from 10.4% in 2010 · long-run deindustrialisation', sparklineData: [10.4,10,9.5,9.2,9,8.9,8.8] },
  ] },
  'night-time-economy': { topic: 'Night-Time Economy', slug: 'night-time-economy', href: '/night-time-economy', colour: '#264653', preposition: 'in', metrics: [
    { label: 'UK night-time economy turnover (£ billions)', value: '66', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'recovering post-COVID · still below £93B pre-pandemic peak', sparklineData: [93,95,10,55,62,64,66] },
    { label: 'Late-night venue closures (England, net, annual)', value: '1,200', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'nightclubs halved since 2005 · rising costs and alcohol duty', sparklineData: [400,600,2800,1800,1500,1300,1200] },
  ] },
  'over-50s-employment': { topic: 'Over-50s Employment', slug: 'over-50s-employment', href: '/over-50s-employment', colour: '#6B7280', preposition: 'with', metrics: [
    { label: 'Economic inactivity rate: 50–64 (UK)', value: '26.4%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 22.8% in 2019 · long-term illness main cause', sparklineData: [22.8,23,23.4,24.5,25.5,26,26.4] },
    { label: 'Over-50s citing ill health as reason for inactivity', value: '58%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 44% in 2015 · musculoskeletal and mental health dominant', sparklineData: [44,46,48,51,54,56,58] },
  ] },
  'pension-auto-enrolment': { topic: 'Pension Auto-Enrolment', slug: 'pension-auto-enrolment', href: '/pension-auto-enrolment', colour: '#2A9D8F', preposition: 'with', metrics: [
    { label: 'Workers enrolled in workplace pension (%)', value: '88', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up from 55% in 2012 · auto-enrolment transformative', sparklineData: [55,65,72,78,83,86,88] },
    { label: 'Workers below adequate savings threshold (%)', value: '37', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down from 52% in 2012 · but minimum contributions still too low', sparklineData: [52,50,46,43,41,39,37] },
  ] },
  'remote-work-access': { topic: 'Remote Work Access', slug: 'remote-work-access', href: '/remote-work-access', colour: '#6B7280', preposition: 'with', metrics: [
    { label: 'Workers who can work remotely (%)', value: '43', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'stable post-pandemic · sharp occupational divide', sparklineData: [15,16,16,42,42,43,43] },
    { label: 'Income gap: remote vs non-remote workers (£ annual)', value: '£13,000', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'remote-eligible roles are higher paid · access inequality', sparklineData: [9000,10000,11000,12000,13000,13000,13000] },
  ] },
  'second-job-holders': { topic: 'Second Job Holders', slug: 'second-job-holders', href: '/second-job-holders', colour: '#F4A261', preposition: 'with', metrics: [
    { label: 'Workers holding multiple jobs (UK, millions)', value: '1.21', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'record high · real wage squeeze forcing extra work', sparklineData: [1.05,1.07,1.08,1.09,1.12,1.17,1.21] },
    { label: 'Public sector workers with second jobs (%)', value: '11.2', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 7.4% in 2019 · teachers and nurses most affected', sparklineData: [7.4,7.8,8.2,9.1,10,10.7,11.2] },
  ] },
  'services-exports-uk': { topic: 'Services Exports', slug: 'services-exports-uk', href: '/services-exports-uk', colour: '#264653', preposition: 'with', metrics: [
    { label: 'UK services exports (£ billions, annual)', value: '398', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'record high · financial services largest component', sparklineData: [280,295,300,275,330,370,398] },
    { label: 'Services trade surplus (£ billions)', value: '136', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up from £94B in 2016 · offset goods trade deficit', sparklineData: [94,98,102,90,110,125,136] },
  ] },
  'tourism-spending': { topic: 'Tourism Spending', slug: 'tourism-spending', href: '/tourism-spending', colour: '#264653', preposition: 'with', metrics: [
    { label: 'Overseas visitor spending in UK (£ billions)', value: '31.1', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'recovering to near pre-pandemic levels', sparklineData: [25.2,26.3,27,7,20,27,31.1] },
    { label: 'UK domestic tourism spending (£ billions)', value: '73', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'stable · staycation boom reversed as outbound travel recovered', sparklineData: [76,78,80,52,82,75,73] },
  ] },
  'uc-deductions': { topic: 'Universal Credit Deductions', slug: 'uc-deductions', href: '/uc-deductions', colour: '#E63946', preposition: 'with', metrics: [
    { label: 'UC claimants with deductions (%)', value: '45', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down from 52% in 2019 · still affects 2.2M people', sparklineData: [52,52,50,48,47,46,45] },
    { label: 'Average UC deduction per claimant (£/month)', value: '61', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from £52 in 2019 · advance payment loans main cause', sparklineData: [52,54,56,58,59,60,61] },
  ] },
  'worker-monitoring': { topic: 'Worker Monitoring', slug: 'worker-monitoring', href: '/worker-monitoring', colour: '#6B7280', preposition: 'with', metrics: [
    { label: 'Workers subject to automated monitoring (%)', value: '60', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 34% pre-pandemic · remote work accelerated surveillance', sparklineData: [34,36,38,55,58,59,60] },
    { label: 'Tribunal cases citing algorithmic management', value: '312', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'new legal frontier · ICO guidance lagging behind practice', sparklineData: [12,25,60,140,220,280,312] },
  ] },
  'buy-to-let-exit': { topic: 'Buy-to-Let Exit', slug: 'buy-to-let-exit', href: '/buy-to-let-exit', colour: '#F4A261', preposition: 'with', metrics: [
    { label: 'Net landlord decline 2022–25', value: '140,000', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'selling faster than entering · Section 24 tax change main driver', sparklineData: [2820,2800,2770,2730,2680,2620,2560] },
    { label: 'Private rental listings vs 2020', value: '-29%', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'fewer properties · rents rising as supply shrinks', sparklineData: [100,105,108,95,82,75,71] },
  ] },
  'care-home-supply': { topic: 'Care Home Supply', slug: 'care-home-supply', href: '/care-home-supply', colour: '#E63946', preposition: 'with', metrics: [
    { label: 'Care home beds lost since 2015 (England)', value: '15,000', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'net loss · new beds not replacing closures', sparklineData: [0,3000,5000,7000,9000,12000,15000] },
    { label: 'Care home vacancy rate', value: '7.8%', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down from 12% in 2021 · high occupancy masks fragility', sparklineData: [10,12,11,9,8,7.9,7.8] },
  ] },
  'community-asset-ownership': { topic: 'Community Asset Ownership', slug: 'community-asset-ownership', href: '/community-asset-ownership', colour: '#2A9D8F', preposition: 'with', metrics: [
    { label: 'Community-owned assets (England, number)', value: '9,800', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up from 6,200 in 2015 · pubs, shops, halls', sparklineData: [6200,6800,7200,7800,8400,9100,9800] },
    { label: 'Assets of Community Value registrations (annual)', value: '1,250', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up from 320 in 2013 · Localism Act 2011 enabling tool', sparklineData: [320,480,620,780,950,1100,1250] },
  ] },
  'domestic-abuse-refuges': { topic: 'Domestic Abuse Refuges', slug: 'domestic-abuse-refuges', href: '/domestic-abuse-refuges', colour: '#E63946', preposition: 'with', metrics: [
    { label: 'Refuge bed requests turned away (%)', value: '35', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down from 43% in 2019 · DA Act 2021 driving investment', sparklineData: [43,43,42,40,38,36,35] },
    { label: 'Women referred but not accommodated (daily average)', value: '97', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'still nearly 100 women per day unable to access refuge', sparklineData: [120,118,115,110,105,100,97] },
  ] },
  'equity-release-market': { topic: 'Equity Release Market', slug: 'equity-release-market', href: '/equity-release-market', colour: '#F4A261', preposition: 'with', metrics: [
    { label: 'Equity release lending (£ billions, annual)', value: '6.0', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down from £6.2B peak · higher rates reducing demand', sparklineData: [2,3,4,5.5,6.2,6.1,6] },
    { label: 'Average equity release rate (%)', value: '6.4', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 3.4% in 2020 · lifetime mortgages now expensive', sparklineData: [3.4,3.5,3.8,4.5,5.5,6.2,6.4] },
  ] },
  'housing-first-programme': { topic: 'Housing First Programme', slug: 'housing-first-programme', href: '/housing-first-programme', colour: '#2A9D8F', preposition: 'with', metrics: [
    { label: 'Housing First placements in England (annual)', value: '2,800', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up from 400 in 2018 · evidence-based approach for entrenched rough sleeping', sparklineData: [400,700,1100,1600,2100,2500,2800] },
    { label: 'Housing First 12-month housing retention rate', value: '83%', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'international evidence consistent · UK trials confirm', sparklineData: [75,77,79,80,81,82,83] },
  ] },
  'lpa-capacity-crisis': { topic: 'Planning Authority Capacity', slug: 'lpa-capacity-crisis', href: '/lpa-capacity-crisis', colour: '#F4A261', preposition: 'in', metrics: [
    { label: 'Local planning authority staff (England, FTE)', value: '10,700', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down from 16,200 in 2010 · 34% cut in 15 years', sparklineData: [16200,15000,13500,12500,11800,11200,10700] },
    { label: 'Major planning applications decided on time (%)', value: '75', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down from 85% in 2016 · underfunded departments', sparklineData: [85,83,81,79,77,76,75] },
  ] },
  'military-housing-quality': { topic: 'Military Housing Quality', slug: 'military-housing-quality', href: '/military-housing-quality', colour: '#6B7280', preposition: 'with', metrics: [
    { label: 'Service family homes rated below standard (%)', value: '38', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down from 48% in 2018 · Annington Homes contract constraining repairs', sparklineData: [48,46,44,42,40,39,38] },
    { label: 'Complaints about service accommodation (annual)', value: '4,200', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 2,800 in 2018 · mould, damp, heating failures most common', sparklineData: [2800,3000,3200,3600,3900,4100,4200] },
  ] },
  'planning-appeals': { topic: 'Planning Appeals', slug: 'planning-appeals', href: '/planning-appeals', colour: '#F4A261', preposition: 'with', metrics: [
    { label: 'Planning appeal decisions (England, annual)', value: '13,600', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up from 11,400 in 2020 · housebuilding blocked at local level', sparklineData: [15000,14000,12000,11400,12000,12800,13600] },
    { label: 'Appeal allowed rate (%)', value: '31', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 27% · inspectors overturning local refusals', sparklineData: [27,28,28,29,30,30,31] },
  ] },
  'right-to-buy': { topic: 'Right to Buy', slug: 'right-to-buy', href: '/right-to-buy', colour: '#F4A261', preposition: 'with', metrics: [
    { label: 'Right to Buy sales (England, annual)', value: '8,900', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down from 68,000 peak in 1980s · discount increased 2012 reversed some decline', sparklineData: [2000,5000,11000,12000,10000,9500,8900] },
    { label: 'Social homes replaced for each sold via RTB', value: '0.3', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down from 1:1 target · net depletion of social stock', sparklineData: [0.5,0.4,0.4,0.4,0.3,0.3,0.3] },
  ] },
  'veteran-rough-sleeping': { topic: 'Veteran Rough Sleeping', slug: 'veteran-rough-sleeping', href: '/veteran-rough-sleeping', colour: '#6B7280', preposition: 'with', metrics: [
    { label: 'Veterans sleeping rough on any given night (England)', value: '320', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down from 400 in 2018 · Op FORTITUDE and specialist services', sparklineData: [400,380,360,345,335,325,320] },
    { label: 'Veterans assessed as homeless by local authorities (annual)', value: '5,900', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down from 8,700 in 2012 · Armed Forces Covenant housing duty', sparklineData: [8700,8000,7200,6800,6400,6100,5900] },
  ] },
  'disability-sport-gap': { topic: 'Disability Sport Gap', slug: 'disability-sport-gap', href: '/disability-sport-gap', colour: '#6B7280', preposition: 'with', metrics: [
    { label: 'Disabled adults inactive (% doing no activity)', value: '43', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down from 48% in 2017 · still 15pp more than non-disabled', sparklineData: [48,47,46,45,44,43,43] },
    { label: 'Gap between disabled and non-disabled sport participation (pp)', value: '21', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'persistent 21-point gap · accessible facilities funding stalled', sparklineData: [22,22,22,21,21,21,21] },
  ] },
  'family-hubs': { topic: 'Family Hubs', slug: 'family-hubs', href: '/family-hubs', colour: '#2A9D8F', preposition: 'with', metrics: [
    { label: 'Family hubs open across England', value: '399', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up from 0 in 2021 · government target 400 by end 2024', sparklineData: [0,0,50,150,280,360,399] },
    { label: "Children\u2019s centres closed since 2010 (England)", value: '1,350', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'over half closed · family hubs not replacing all lost capacity', sparklineData: [0,200,500,800,1050,1200,1350] },
  ] },
  'grassroots-sport': { topic: 'Grassroots Sport', slug: 'grassroots-sport', href: '/grassroots-sport', colour: '#2A9D8F', preposition: 'with', metrics: [
    { label: 'Amateur sports club closures since 2010 (England)', value: '4,800', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'rising costs, ageing volunteers, lost pitches', sparklineData: [0,800,1600,2400,3400,4200,4800] },
    { label: 'Council investment in sport & leisure (£ billions, real)', value: '1.4', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down 38% in real terms since 2010', sparklineData: [2.3,2.2,2.1,2,1.8,1.6,1.4] },
  ] },
  'home-education': { topic: 'Home Education', slug: 'home-education', href: '/home-education', colour: '#6B7280', preposition: 'with', metrics: [
    { label: 'Children in elective home education (England)', value: '92,000', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'record high · up 75% since 2019 · school anxiety main driver', sparklineData: [53000,57000,60000,65000,75000,84000,92000] },
    { label: 'Local authorities with register of home educators (%)', value: '43', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'still majority lack registers · safeguarding gap', sparklineData: [25,28,31,35,38,41,43] },
  ] },
  'infant-feeding': { topic: 'Infant Feeding', slug: 'infant-feeding', href: '/infant-feeding', colour: '#2A9D8F', preposition: 'with', metrics: [
    { label: 'Breastfeeding initiation rate (England)', value: '74.5%', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up from 73.9% in 2019 · regional variation from 58% to 83%', sparklineData: [71,72,73,73.9,74,74.2,74.5] },
    { label: 'Breastfeeding at 6 months (UK)', value: '23%', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up from 17% in 2010 · still far below WHO recommendation of exclusive to 6 months', sparklineData: [17,18,19,20,21,22,23] },
  ] },
  'phonics-outcomes': { topic: 'Phonics Outcomes', slug: 'phonics-outcomes', href: '/phonics-outcomes', colour: '#2A9D8F', preposition: 'with', metrics: [
    { label: 'Pupils meeting expected standard in Year 1 phonics check (%)', value: '79', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up from 58% in 2012 · phonics-first approach effective', sparklineData: [58,64,69,73,76,77,79] },
    { label: 'Disadvantaged pupils meeting standard (gap vs peers, pp)', value: '14', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down from 21pp in 2012 · gap persisting but narrowing', sparklineData: [21,19,18,17,16,15,14] },
  ] },
  'private-school-vat': { topic: 'Private School VAT', slug: 'private-school-vat', href: '/private-school-vat', colour: '#6B7280', preposition: 'with', metrics: [
    { label: 'Pupils leaving private school for state sector (estimate, 2025)', value: '35,000', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'VAT on fees introduced Jan 2025 · smaller schools most affected', sparklineData: [0,0,0,0,0,10000,35000] },
    { label: 'Average private school fee increase 2024/25', value: '+8.9%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'including VAT pass-through · real increase above inflation', sparklineData: [0,0,0,0,4.5,8.9,8.9] },
  ] },
  'school-catchment-inequality': { topic: 'School Catchment Inequality', slug: 'school-catchment-inequality', href: '/school-catchment-inequality', colour: '#E63946', preposition: 'in', metrics: [
    { label: 'House price premium within top-rated school catchment (£)', value: '£43,000', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from £30,000 in 2016 · access to good schools determined by wealth', sparklineData: [30000,33000,36000,38000,40000,42000,43000] },
    { label: 'Children from deprived households in top-quintile schools (%)', value: '11', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'persistent underrepresentation · catchment policies embed advantage', sparklineData: [12,12,11,11,11,11,11] },
  ] },
  'school-readiness': { topic: 'School Readiness', slug: 'school-readiness', href: '/school-readiness', colour: '#E63946', preposition: 'with', metrics: [
    { label: 'Children achieving good level of development at age 5 (%)', value: '67.7', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up from 53% in 2012 · but gap widened post-COVID', sparklineData: [53,57,62,66,69,67,67.7] },
    { label: 'Disadvantaged children at expected level vs peers (gap, pp)', value: '19', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 17pp in 2019 · pandemic erased decade of progress', sparklineData: [24,22,20,17,17,19,19] },
  ] },
  'speech-language-delays': { topic: 'Speech & Language Delays', slug: 'speech-language-delays', href: '/speech-language-delays', colour: '#E63946', preposition: 'with', metrics: [
    { label: 'Children starting school with speech/language delays (%)', value: '17.5', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 14% in 2019 · post-lockdown language development affected', sparklineData: [14,14,14,15,16.5,17,17.5] },
    { label: 'Children referred for speech therapy waiting >18 weeks (%)', value: '38', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 18% in 2019 · SLT workforce shortfall', sparklineData: [18,19,21,28,34,37,38] },
  ] },
  'student-loan-economics': { topic: 'Student Loan Economics', slug: 'student-loan-economics', href: '/student-loan-economics', colour: '#F4A261', preposition: 'with', metrics: [
    { label: 'Average graduate debt on completion (England)', value: '£45,800', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from £26,100 in 2012 · 6.25% interest rate in 2024', sparklineData: [26100,29000,33000,37000,41000,43500,45800] },
    { label: 'Government expects to write off (% of loan value)', value: '43%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 35% in 2015 · majority of graduates will never repay in full', sparklineData: [35,36,38,40,41,42,43] },
  ] },
  'youth-club-closures': { topic: 'Youth Club Closures', slug: 'youth-club-closures', href: '/youth-club-closures', colour: '#E63946', preposition: 'with', metrics: [
    { label: 'Youth centres closed in England since 2010', value: '4,500', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'estimate · local authority youth services cut 73% since 2010', sparklineData: [0,900,1800,2700,3500,4100,4500] },
    { label: 'Young people engaged in structured youth work (millions)', value: '1.3', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down from 2.7M in 2010', sparklineData: [2.7,2.4,2.1,1.9,1.7,1.5,1.3] },
  ] },
  'climate-adaptation-costs': { topic: 'Climate Adaptation Costs', slug: 'climate-adaptation-costs', href: '/climate-adaptation-costs', colour: '#2A9D8F', preposition: 'with', metrics: [
    { label: 'Annual economic cost of climate impacts (UK estimate, £ billions)', value: '22', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from £14B in 2015 · flooding, heat, coastal erosion', sparklineData: [14,15,17,18,19,20,22] },
    { label: 'Government climate adaptation budget (£ billions/year)', value: '0.74', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down in real terms · less than 4% of estimated damage costs', sparklineData: [0.85,0.82,0.8,0.77,0.76,0.75,0.74] },
  ] },
  'community-energy': { topic: 'Community Energy', slug: 'community-energy', href: '/community-energy', colour: '#2A9D8F', preposition: 'with', metrics: [
    { label: 'Community energy installed capacity (MW)', value: '350', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up 80% since 2020 · 750 community groups', sparklineData: [140,175,200,240,290,320,350] },
    { label: 'Households powered by community energy', value: '350,000', direction: 'up' as const, polarity: 'up-is-good' as const, context: '1% of UK homes · grid connection costs still barrier', sparklineData: [140000,175000,200000,240000,290000,320000,350000] },
  ] },
  'fly-tipping-england': { topic: 'Fly-Tipping', slug: 'fly-tipping-england', href: '/fly-tipping-england', colour: '#6B7280', preposition: 'with', metrics: [
    { label: 'Fly-tipping incidents in England (annual)', value: '1.08M', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'record high · household waste 59% of incidents', sparklineData: [900000,940000,980000,1010000,1040000,1060000,1080000] },
    { label: 'Cost of clearance to local authorities (£ millions)', value: '392', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from £329M in 2018', sparklineData: [329,340,351,362,374,383,392] },
  ] },
  'habitat-net-gain': { topic: 'Biodiversity Net Gain', slug: 'habitat-net-gain', href: '/habitat-net-gain', colour: '#2A9D8F', preposition: 'with', metrics: [
    { label: 'Planning permissions with mandatory BNG (England)', value: '12,400', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'statutory BNG commenced Feb 2024 · small sites Feb 2025', sparklineData: [0,0,0,1200,8000,10500,12400] },
    { label: 'Biodiversity units traded in market (annual)', value: '38,000', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'new market emerging · quality verification challenges remain', sparklineData: [0,0,0,5000,18000,30000,38000] },
  ] },
  'single-use-plastic-reduction': { topic: 'Single-Use Plastic Reduction', slug: 'single-use-plastic-reduction', href: '/single-use-plastic-reduction', colour: '#2A9D8F', preposition: 'with', metrics: [
    { label: 'Single-use carrier bags sold (England, billions)', value: '1.7', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down from 7.6B in 2014 · 5p/10p charge transformative', sparklineData: [7.6,6,4,2.8,2.3,2,1.7] },
    { label: 'Single-use plastic items in scope of ban (England)', value: '9 types', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'plates, cutlery, polystyrene cups banned Oct 2023', sparklineData: [0,0,0,0,0,0,9] },
  ] },
  'textile-waste': { topic: 'Textile Waste', slug: 'textile-waste', href: '/textile-waste', colour: '#6B7280', preposition: 'with', metrics: [
    { label: 'Textile waste per person (UK, kg/year)', value: '26.8', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'highest in Europe · fast fashion acceleration', sparklineData: [23,23.5,24,24.8,25.5,26.2,26.8] },
    { label: 'Clothing recycled or donated (%)', value: '35', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down from 42% in 2018 · quality of clothing too poor to resell', sparklineData: [42,42,41,39,37,36,35] },
  ] },
  'urban-green-space': { topic: 'Urban Green Space', slug: 'urban-green-space', href: '/urban-green-space', colour: '#2A9D8F', preposition: 'in', metrics: [
    { label: 'Urban areas meeting WHO green space guideline (>1ha within 300m)', value: '45%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down from 52% in 2010 · development pressure on parks', sparklineData: [52,51,50,49,47,46,45] },
    { label: 'Public parks budget cuts since 2010 (England, %)', value: '-42%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'real-terms cut · park rangers and maintenance hit hardest', sparklineData: [0,-8,-15,-22,-30,-37,-42] },
  ] },
  'water-company-leakage': { topic: 'Water Company Leakage', slug: 'water-company-leakage', href: '/water-company-leakage', colour: '#264653', preposition: 'with', metrics: [
    { label: 'Water lost to leakage daily (England & Wales, million litres)', value: '3,060', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down from 3,400 in 2017 but still above 2020 target of 2,800', sparklineData: [3400,3350,3300,3250,3150,3100,3060] },
    { label: 'Water companies meeting leakage targets (%)', value: '43', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'majority missing their own targets', sparklineData: [75,70,65,58,50,45,43] },
  ] },
  'bridge-maintenance-backlog': { topic: 'Bridge Maintenance Backlog', slug: 'bridge-maintenance-backlog', href: '/bridge-maintenance-backlog', colour: '#6B7280', preposition: 'with', metrics: [
    { label: 'Local road bridge maintenance backlog (England, £ billions)', value: '1.9', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from £1.2B in 2018 · 28% of bridges need repair', sparklineData: [1.2,1.3,1.4,1.5,1.6,1.7,1.9] },
    { label: 'Bridges with weight restrictions (England)', value: '2,050', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up 35% since 2015 · HGV diversions increasing', sparklineData: [1520,1600,1700,1800,1900,1980,2050] },
  ] },
  'cycling-fatalities': { topic: 'Cycling Fatalities', slug: 'cycling-fatalities', href: '/cycling-fatalities', colour: '#E63946', preposition: 'with', metrics: [
    { label: 'Cyclists killed on UK roads (annual)', value: '104', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'broadly flat · 16 killed per billion miles vs 2.5 in Netherlands', sparklineData: [109,105,99,102,99,104,104] },
    { label: 'Cyclists seriously injured (annual)', value: '4,560', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down 9% since 2018 but absolute numbers still high', sparklineData: [5000,4900,4800,4700,4650,4600,4560] },
  ] },
  'rail-fares': { topic: 'Rail Fares', slug: 'rail-fares', href: '/rail-fares', colour: '#F4A261', preposition: 'with', metrics: [
    { label: 'UK rail fares vs 2010 (real terms index)', value: '108', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up 8% in real terms since 2010 · fares rise RPI annually', sparklineData: [100,102,104,105,106,107,108] },
    { label: 'Average cost per mile by train vs car (pence)', value: '31p vs 17p', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'rail nearly twice as expensive as car per mile', sparklineData: [28,29,29,30,30,31,31] },
  ] },
  'road-casualties': { topic: 'Road Casualties', slug: 'road-casualties', href: '/road-casualties', colour: '#E63946', preposition: 'with', metrics: [
    { label: 'Road deaths (UK, annual)', value: '1,695', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 1,472 in 2022 · long decline stalled', sparklineData: [1730,1710,1685,1584,1472,1695,1695] },
    { label: 'Serious injuries in road collisions (UK, annual)', value: '28,700', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'long-run decline but pace slowing', sparklineData: [34000,32000,30000,29000,28700,28700,28700] },
  ] },
  'heritage-at-risk': { topic: 'Heritage at Risk', slug: 'heritage-at-risk', href: '/heritage-at-risk', colour: '#F4A261', preposition: 'with', metrics: [
    { label: 'Entries on Historic England Heritage at Risk register', value: '4,848', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down from 5,889 in 2009 but pace of improvement slowing', sparklineData: [5889,5700,5500,5300,5100,4950,4848] },
    { label: 'Listed buildings at risk (England)', value: '2,780', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down from 4,189 in 2000 · grants and tax incentives working', sparklineData: [4189,3800,3400,3200,3000,2900,2780] },
  ] },
  'care-home-staffing': { topic: 'Care Home Staffing', slug: 'care-home-staffing', href: '/care-home-staffing', colour: '#E63946', preposition: 'with', metrics: [
    { label: 'Social care vacancy rate (England)', value: '9.9%', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down from 10.7% peak in 2022 · international recruitment helping', sparklineData: [6.8,7.5,8.5,10.7,10,9.9,9.9] },
    { label: 'Social care worker turnover (annual)', value: '28.3%', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down from 34% in 2021 · still twice NHS average', sparklineData: [28,29,30,34,31,29,28.3] },
  ] },
  'food-hygiene-compliance': { topic: 'Food Hygiene Compliance', slug: 'food-hygiene-compliance', href: '/food-hygiene-compliance', colour: '#2A9D8F', preposition: 'with', metrics: [
    { label: 'Food businesses with 3-star rating or above (%)', value: '95.6', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up from 91% in 2012 · FSA regime working', sparklineData: [91,92,93,94,95,95.5,95.6] },
    { label: 'Food businesses requiring urgent improvement (%)', value: '1.1', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down from 2.8% in 2012 · inspections and enforcement', sparklineData: [2.8,2.4,2,1.6,1.3,1.2,1.1] },
  ] },
  'food-standards-post-brexit': { topic: 'Food Standards Post-Brexit', slug: 'food-standards-post-brexit', href: '/food-standards-post-brexit', colour: '#F4A261', preposition: 'with', metrics: [
    { label: 'FSA budget (£ millions, real terms)', value: '128', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down from £157M in 2010 · post-Brexit new duties unfunded', sparklineData: [157,151,145,138,132,130,128] },
    { label: 'Imported food consignments checked at UK border (%)', value: '1.3', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up from 0.3% in 2021 · BCP rollout still incomplete', sparklineData: [2,1,0.3,0.5,0.8,1.1,1.3] },
  ] },
  'sugar-levy-impact': { topic: 'Sugar Levy Impact', slug: 'sugar-levy-impact', href: '/sugar-levy-impact', colour: '#2A9D8F', preposition: 'with', metrics: [
    { label: 'Sugar in soft drinks (average reduction since 2016)', value: '-35%', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'reformulation before levy took effect · most impact pre-2018', sparklineData: [100,90,80,72,67,66,65] },
    { label: 'Childhood obesity rate (reception age)', value: '9.5%', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 9.1% pre-levy · levy effect outpaced by wider diet trends', sparklineData: [9.1,9.2,9.3,9.4,9.3,9.4,9.5] },
  ] },
  'ultra-processed-food': { topic: 'Ultra-Processed Food', slug: 'ultra-processed-food', href: '/ultra-processed-food', colour: '#E63946', preposition: 'with', metrics: [
    { label: 'Share of UK diet from ultra-processed foods (%)', value: '57', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'highest in Europe · up from 45% in 2000', sparklineData: [45,47,49,51,53,55,57] },
    { label: "Children\u2019s diet from ultra-processed foods (%)", value: '65', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'even higher in children · linked to ADHD, obesity, anxiety', sparklineData: [55,57,59,61,62,64,65] },
  ] },
  'meat-consumption-trend': { topic: 'Meat Consumption Trend', slug: 'meat-consumption-trend', href: '/meat-consumption-trend', colour: '#6B7280', preposition: 'with', metrics: [
    { label: 'UK per capita meat consumption (kg/year)', value: '84', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'down from 93kg in 2010 · flexitarianism growing', sparklineData: [93,92,90,88,87,85,84] },
    { label: 'Plant-based product sales (£ billions, annual)', value: '1.4', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'up from £0.4B in 2018 · market growth slowing from peak', sparklineData: [0.4,0.6,0.8,1,1.3,1.4,1.4] },
  ] },
  'gambling-advertising': { topic: 'Gambling Advertising', slug: 'gambling-advertising', href: '/gambling-advertising', colour: '#E63946', preposition: 'with', metrics: [
    { label: 'Gambling adverts seen (average per person per week)', value: '4.7', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from 2.3 in 2014 · online and social media surge', sparklineData: [2.3,2.7,3,3.5,4,4.4,4.7] },
    { label: 'Problem gamblers recognising ads as targeted (%)', value: '61', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'personalised gambling ads exploit vulnerability', sparklineData: [40,44,48,53,57,59,61] },
  ] },
  'online-gambling-growth': { topic: 'Online Gambling Growth', slug: 'online-gambling-growth', href: '/online-gambling-growth', colour: '#E63946', preposition: 'with', metrics: [
    { label: 'Online gambling gross yield (£ billions)', value: '7.0', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'up from £4.4B in 2018 · now 46% of total gambling market', sparklineData: [4.4,4.9,5.5,6,6.3,6.7,7] },
    { label: 'Online slots players at highest intensity (millions)', value: '1.3', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'daily or near-daily · 430,000 problem gamblers', sparklineData: [0.7,0.8,0.9,1,1.1,1.2,1.3] },
  ] },
  'fixed-odds-betting-reform': { topic: 'Fixed-Odds Betting Reform', slug: 'fixed-odds-betting-reform', href: '/fixed-odds-betting-reform', colour: '#2A9D8F', preposition: 'with', metrics: [
    { label: 'FOBTs at £2 max stake vs pre-2019 (£100 max)', value: '18,000 remaining', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'stake cut Apr 2019 · 4,700 betting shops closed within 2 years', sparklineData: [35000,35000,18000,18000,18000,18000,18000] },
    { label: 'Betting shop closures since 2019 FOBTs reform', value: '4,700', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'shops closed as FOBT revenues collapsed', sparklineData: [0,0,1500,3000,3800,4300,4700] },
  ] },
  'social-care-turnover': { topic: 'Social Care Turnover', slug: 'social-care-turnover', href: '/social-care-turnover', colour: '#E63946', preposition: 'with', metrics: [
    { label: 'Social care worker turnover rate (England, annual)', value: '28.3%', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down from 34% in 2021 · still twice NHS average', sparklineData: [28,29,30,34,31,29,28.3] },
    { label: 'Social care posts unfilled on any given day (England)', value: '152,000', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'down from 165,000 peak in 2022 · international recruitment helping', sparklineData: [110000,120000,135000,165000,160000,155000,152000] },
  ] },
  'business-survival': {
    topic: 'Business Survival',
    slug: 'business-survival',
    href: '/business-survival',
    colour: '#6B7280',
    metrics: [
      { label: '5-year survival rate', value: '44%', unit: '', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'Down from 48% in 2015 · hospitality worst at 32%', sparklineData: [48, 47, 47, 46, 46, 45, 44, 43, 43, 44, 44] },
      { label: 'Annual business closures', value: '436,000', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '+18% since 2019 · retail & hospitality hardest hit', sparklineData: [340, 352, 358, 362, 369, 410, 395, 408, 420, 430, 436] },
      { label: 'Net business births vs 2019', value: '-12%', unit: '', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'Births outpaced deaths until 2020; now reversed', sparklineData: [8, 6, 5, 4, 2, -3, -8, -10, -11, -12, -12] },
    ],
  },
  'trade-balance': {
    topic: 'Trade Balance',
    slug: 'trade-balance',
    href: '/trade-balance',
    colour: '#6B7280',
    metrics: [
      { label: 'Annual trade deficit', value: '£37bn', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Goods deficit £233bn partly offset by services surplus', sparklineData: [20, 22, 18, 24, 28, 36, 30, 38, 40, 38, 37] },
      { label: 'Goods trade deficit', value: '£233bn', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '+£68bn since 2015 · manufactured goods gap widened post-Brexit', sparklineData: [165, 170, 175, 180, 182, 185, 190, 210, 225, 228, 233] },
      { label: 'Services trade surplus', value: '£196bn', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: '+£70bn since 2015 · financial & professional services dominant', sparklineData: [126, 132, 140, 146, 152, 145, 155, 165, 180, 190, 196] },
    ],
  },
  'tax-burden': {
    topic: 'Tax Burden',
    slug: 'tax-burden',
    href: '/tax-burden',
    colour: '#6B7280',
    metrics: [
      { label: 'Tax/GDP ratio', value: '37.1%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Highest since 1948 · up from 32.4% in 2010', sparklineData: [32.4, 32.8, 33.0, 33.3, 33.7, 34.0, 34.7, 35.3, 35.9, 36.5, 37.1] },
      { label: 'Fiscal drag extra income tax', value: '£25bn', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Threshold frozen since 2021 · 3m more payers since 2021', sparklineData: [0, 0, 0, 0, 0, 5, 10, 15, 20, 23, 25] },
      { label: 'Council tax real-terms rise', value: '+47%', unit: 'since 2010', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Above inflation every year · capped at 5%/yr since 2022', sparklineData: [0, 5, 10, 15, 20, 25, 30, 35, 39, 43, 47] },
    ],
  },
  'council-funding': {
    topic: 'Council Funding',
    slug: 'council-funding',
    href: '/council-funding',
    colour: '#6B7280',
    metrics: [
      { label: 'Councils issuing s114 notices', value: '14', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '2018-2025 · none issued 2010-2017', sparklineData: [0, 0, 0, 1, 2, 3, 5, 8, 10, 12, 14] },
      { label: 'Local government funding gap', value: '£6bn', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'By 2026 · adult social care and SEND demand', sparklineData: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.8, 4.5, 5.2, 6] },
      { label: 'Real-terms service spending change', value: '-25%', unit: 'since 2010', direction: 'down' as const, polarity: 'up-is-good' as const, context: '£20bn real-terms cut since 2010 spending review', sparklineData: [88, 85, 83, 81, 80, 82, 81, 79, 77, 76, 75] },
    ],
  },
  'cost-of-borrowing': {
    topic: 'Cost of Borrowing',
    slug: 'cost-of-borrowing',
    href: '/cost-of-borrowing',
    colour: '#6B7280',
    metrics: [
      { label: 'Average 2yr fixed rate', value: '4.8%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Was 2.3% in 2021 · peaked at 6.8% in 2023', sparklineData: [2.8, 2.5, 2.3, 2.1, 2.3, 4.2, 5.8, 6.8, 5.5, 4.9, 4.8] },
      { label: 'Households remortgaged at higher rates', value: '1.8m', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '2023-24 · average rate increase 2.9pp', sparklineData: [0.1, 0.1, 0.1, 0.1, 0.1, 0.2, 0.8, 1.5, 1.8, 1.7, 1.6] },
      { label: 'Avg monthly mortgage payment rise', value: '+£580', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '+61% vs 2021 · £1,527 average in 2024', sparklineData: [40, 30, 20, 10, 0, 80, 200, 380, 500, 560, 580] },
    ],
  },
  'regional-investment': {
    topic: 'Regional Investment',
    slug: 'regional-investment',
    href: '/regional-investment',
    colour: '#6B7280',
    metrics: [
      { label: 'London public investment per head', value: '£2,943', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '+£400 since 2015 · transport dominant', sparklineData: [2543, 2600, 2650, 2700, 2750, 2650, 2750, 2820, 2880, 2920, 2943] },
      { label: 'North East investment per head', value: '£1,644', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: '+£100 since 2015 · gap barely narrowed', sparklineData: [1544, 1560, 1570, 1580, 1590, 1560, 1600, 1620, 1630, 1640, 1644] },
      { label: 'North-South gap (£/head)', value: '£1,299', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Widened by £300 since 2015 · HS2 cancellation worsened', sparklineData: [999, 1040, 1080, 1120, 1160, 1090, 1150, 1200, 1250, 1280, 1299] },
    ],
  },
  'startup-survival': {
    topic: 'Startup Survival',
    slug: 'startup-survival',
    href: '/startup-survival',
    colour: '#6B7280',
    metrics: [
      { label: '3-year survival rate', value: '58%', unit: '', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'Down from 63% in 2017 · hospitality 42%', sparklineData: [63, 62, 61, 60, 59, 58, 57, 56, 57, 58, 58] },
      { label: 'Hospitality 5-yr survival', value: '32%', unit: '', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'Down from 38% in 2017 · energy and labour cost pressures', sparklineData: [38, 37, 36, 35, 34, 31, 30, 30, 31, 32, 32] },
      { label: 'Online vs physical retail survival gap', value: '+18pp', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'Online retail 58% 5yr survival vs 40% physical', sparklineData: [5, 6, 7, 8, 10, 12, 14, 15, 16, 17, 18] },
    ],
  },
  'regional-unemployment': {
    topic: 'Regional Unemployment',
    slug: 'regional-unemployment',
    href: '/regional-unemployment',
    colour: '#6B7280',
    metrics: [
      { label: 'National unemployment rate', value: '4.2%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'Near historic low · but wide regional variation', sparklineData: [5.6, 5.4, 4.8, 4.3, 3.9, 4.1, 5.2, 4.8, 4.3, 4.1, 4.2] },
      { label: 'Highest regional rate (North East)', value: '7.8%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Almost 2x national rate · youth rate 22%', sparklineData: [8.2, 7.9, 7.5, 7.1, 6.8, 7.5, 8.5, 8.2, 7.9, 7.7, 7.8] },
      { label: 'Youth unemployment rate (18-24)', value: '12.4%', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'Down from 14.9% in 2015 · NE reaches 22%', sparklineData: [14.9, 14.2, 13.5, 12.8, 12.1, 13.5, 15.2, 14.1, 13.0, 12.7, 12.4] },
    ],
  },
  'economic-inactivity-sickness': {
    topic: 'Inactivity Due to Sickness',
    slug: 'economic-inactivity-sickness',
    href: '/economic-inactivity-sickness',
    colour: '#6B7280',
    metrics: [
      { label: 'Economically inactive due to sickness', value: '2.8m', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Record high · up 700k since 2019', sparklineData: [2.1, 2.1, 2.1, 2.1, 2.1, 2.2, 2.5, 2.7, 2.8, 2.8, 2.8] },
      { label: 'Mental health inactivity share', value: '38%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Up from 28% in 2019 · overtook musculoskeletal', sparklineData: [26, 27, 27, 28, 28, 30, 34, 36, 37, 38, 38] },
      { label: 'Working-age inactivity rate', value: '22%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Up from 20.7% in 2019 · highest in G7', sparklineData: [20.8, 20.7, 20.5, 20.5, 20.7, 21.0, 21.8, 22.1, 22.0, 22.1, 22.0] },
    ],
  },
  'gender-pay-gap-report': {
    topic: 'Gender Pay Gap',
    slug: 'gender-pay-gap-report',
    href: '/gender-pay-gap-report',
    colour: '#6B7280',
    metrics: [
      { label: 'Full-time gender pay gap', value: '7.7%', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'Down from 10.0% in 2015 · narrowing slowly', sparklineData: [10.0, 9.4, 9.0, 8.6, 8.3, 7.9, 7.9, 7.7, 7.7, 7.8, 7.7] },
      { label: 'All-workers gender pay gap', value: '13.9%', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'Down from 19.2% in 2015 · part-time dominated', sparklineData: [19.2, 18.1, 17.4, 17.3, 17.3, 15.5, 15.4, 14.9, 14.3, 14.1, 13.9] },
      { label: 'Financial sector pay gap', value: '23.1%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'Highest of any sector · barely changed in 5 years', sparklineData: [24.2, 24.0, 23.8, 23.6, 23.4, 23.2, 23.1, 23.0, 23.2, 23.1, 23.1] },
    ],
  },
  'earnings-by-sector': {
    topic: 'Earnings by Sector',
    slug: 'earnings-by-sector',
    href: '/earnings-by-sector',
    colour: '#6B7280',
    metrics: [
      { label: 'Public sector real wage vs 2010', value: '-12%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'Recovering from -15% peak in 2022 · still negative', sparklineData: [-3, -4, -5, -7, -9, -10, -12, -15, -13, -12, -12] },
      { label: 'Private sector real wage vs 2008', value: '+2%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'Only just recovered 2008 peak · financial services +18%', sparklineData: [-5, -4, -3, -2, -1, -3, -2, 0, 0, 1, 2] },
      { label: 'Lowest-paid decile real wage vs 2008', value: '-6%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'Most exposed to inflation · NMW rises helped partially', sparklineData: [-10, -9, -8, -7, -6, -8, -8, -7, -7, -6, -6] },
    ],
  },
  'sickness-absence': {
    topic: 'Sickness Absence',
    slug: 'sickness-absence',
    href: '/sickness-absence',
    colour: '#6B7280',
    metrics: [
      { label: 'Working days lost to sickness', value: '185m', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Record high · up 38% since 2019', sparklineData: [130, 131, 132, 134, 134, 135, 141, 162, 175, 182, 185] },
      { label: 'Mental health share of absence', value: '23%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Now #1 cause · up from 15% in 2015', sparklineData: [15, 16, 17, 18, 18, 19, 20, 21, 22, 23, 23] },
      { label: 'Cost to economy', value: '£43bn', unit: '/year', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Direct and indirect costs · up £12bn since 2019', sparklineData: [28, 29, 30, 31, 31, 32, 34, 38, 40, 42, 43] },
    ],
  },
  'trade-union-membership': {
    topic: 'Trade Union Membership',
    slug: 'trade-union-membership',
    href: '/trade-union-membership',
    colour: '#6B7280',
    metrics: [
      { label: 'Overall union membership', value: '22.3%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'Stabilised after decades of decline from 53% in 1979', sparklineData: [25.0, 24.7, 24.0, 23.4, 23.5, 23.7, 23.3, 23.0, 22.7, 22.3, 22.3] },
      { label: 'Private sector membership', value: '12.8%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'Barely changed in 10 years · gig economy unmeasured', sparklineData: [13.9, 13.7, 13.4, 13.2, 13.0, 12.9, 12.8, 12.7, 12.7, 12.8, 12.8] },
      { label: 'Working days lost to strikes 2023', value: '2.7m', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Highest since 1989 · rail, NHS and civil service', sparklineData: [0.2, 0.1, 0.2, 0.3, 0.2, 0.2, 0.2, 2.5, 2.7, 1.5, 0.8] },
    ],
  },
  'workplace-accidents': {
    topic: 'Workplace Accidents',
    slug: 'workplace-accidents',
    href: '/workplace-accidents',
    colour: '#6B7280',
    metrics: [
      { label: 'Fatal workplace injuries', value: '138', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'Down from 175 in 2015 · construction 32% of total', sparklineData: [175, 168, 162, 157, 149, 142, 141, 123, 135, 141, 138] },
      { label: 'Non-fatal injuries reported', value: '561,000', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'Self-reported via LFS · actual rate much higher than RIDDOR', sparklineData: [621, 619, 609, 599, 581, 565, 549, 531, 543, 558, 561] },
      { label: 'Annual cost of workplace injury', value: '£20.7bn', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Including lost output and healthcare costs', sparklineData: [15.2, 15.8, 16.3, 16.8, 17.1, 17.5, 18.0, 18.9, 19.5, 20.1, 20.7] },
    ],
  },
  'gig-worker-rights': {
    topic: 'Gig Worker Rights',
    slug: 'gig-worker-rights',
    href: '/gig-worker-rights',
    colour: '#6B7280',
    metrics: [
      { label: 'Gig economy workers', value: '4.4m', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '+60% since 2016 · platform work dominant', sparklineData: [2.8, 3.0, 3.2, 3.5, 3.8, 3.9, 4.0, 4.1, 4.2, 4.3, 4.4] },
      { label: 'Without sick pay', value: '72%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'Most classify as self-employed or worker not employee', sparklineData: [75, 75, 74, 73, 73, 72, 72, 72, 72, 72, 72] },
      { label: 'Without pension auto-enrolment', value: '68%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'Workers excluded from 2012 AE reforms · low saving rates', sparklineData: [72, 72, 71, 70, 70, 69, 68, 68, 68, 68, 68] },
    ],
  },
  'self-employment-earnings': {
    topic: 'Self-Employment Earnings',
    slug: 'self-employment-earnings',
    href: '/self-employment-earnings',
    colour: '#6B7280',
    metrics: [
      { label: 'Median self-employed earnings', value: '£16,300', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: '45% below equivalent employed workers', sparklineData: [14200, 14400, 14600, 14800, 15100, 14500, 15200, 15800, 16000, 16200, 16300] },
      { label: 'Gap vs employed (%, median)', value: '45%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Widened from 35% in 2015 · pandemic accelerated divergence', sparklineData: [35, 36, 37, 38, 39, 43, 44, 44, 45, 45, 45] },
      { label: 'Self-employed without pension savings', value: '65%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'Excluded from auto-enrolment · significant retirement risk', sparklineData: [68, 68, 67, 66, 66, 65, 65, 65, 65, 65, 65] },
    ],
  },
  'apprenticeship-completion': {
    topic: 'Apprenticeship Completion',
    slug: 'apprenticeship-completion',
    href: '/apprenticeship-completion',
    colour: '#6B7280',
    metrics: [
      { label: 'Overall completion rate', value: '52%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'Broadly flat for 5 years · below 2010 rates of 62%', sparklineData: [62, 61, 60, 59, 58, 54, 52, 50, 51, 52, 52] },
      { label: 'Level 2 completion rate', value: '47%', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'Lowest completion level · lowest-skilled apprenticeships', sparklineData: [56, 55, 54, 52, 51, 48, 47, 45, 46, 47, 47] },
      { label: 'Employers citing funding complexity', value: '28%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'As reason for employer-side dropout', sparklineData: [15, 17, 19, 21, 22, 24, 25, 26, 27, 28, 28] },
    ],
  },
  'population-growth': {
    topic: 'Population Growth',
    slug: 'population-growth',
    href: '/population-growth',
    colour: '#6B7280',
    metrics: [
      { label: 'Annual population growth 2023', value: '906,000', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Largest ever recorded · 98% from net migration', sparklineData: [400, 430, 460, 480, 500, 220, 500, 700, 850, 906, 780] },
      { label: 'Net migration contribution to growth', value: '98%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Was 80% in 2019 · natural change near zero', sparklineData: [78, 80, 81, 80, 80, 85, 88, 92, 95, 98, 95] },
      { label: 'Natural population change', value: '+18,000', unit: '/yr', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'Near zero for first time · UK fertility rate 1.41', sparklineData: [180, 160, 140, 120, 100, 75, 50, 25, 18, 18, 18] },
    ],
  },
  'modern-slavery-referrals': {
    topic: 'Modern Slavery',
    slug: 'modern-slavery-referrals',
    href: '/modern-slavery-referrals',
    colour: '#6B7280',
    metrics: [
      { label: 'NRM referrals 2024', value: '17,004', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '71x the 2012 level of 238 · Albanian nationals largest group', sparklineData: [3266, 3805, 5145, 6985, 10627, 10613, 12727, 14670, 16938, 17004, 16800] },
      { label: 'Confirmed victims supported', value: '8,400', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Positive conclusive grounds decisions · many more waiting', sparklineData: [1400, 1800, 2500, 3600, 5100, 5200, 6100, 7200, 8100, 8400, 8200] },
      { label: 'Labour exploitation share', value: '42%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Now #1 referral type · construction, food processing, car washes', sparklineData: [28, 30, 32, 34, 36, 38, 39, 40, 41, 42, 42] },
    ],
  },
  'visa-processing-times': {
    topic: 'Visa Processing Times',
    slug: 'visa-processing-times',
    href: '/visa-processing-times',
    colour: '#6B7280',
    metrics: [
      { label: 'Skilled worker visa processing (median)', value: '12 days', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'Down from 21 days in 2022 · priority services available', sparklineData: [18, 17, 16, 15, 14, 19, 21, 18, 15, 13, 12] },
      { label: 'Family visa average processing', value: '60 days', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'Still above 24-week target for complex cases', sparklineData: [45, 48, 50, 52, 48, 65, 72, 68, 65, 62, 60] },
      { label: 'Applications cleared within target', value: '68%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'Up from 55% in 2022 · backlog clearing', sparklineData: [78, 76, 75, 74, 77, 62, 55, 60, 64, 66, 68] },
    ],
  },
  'net-migration-composition': {
    topic: 'Net Migration Composition',
    slug: 'net-migration-composition',
    href: '/net-migration-composition',
    colour: '#6B7280',
    metrics: [
      { label: 'Peak net migration (2023)', value: '906,000', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'Down from 906k peak · estimated 728k in 2024', sparklineData: [330, 320, 280, 270, 240, 185, 490, 745, 906, 728, 600] },
      { label: 'Student visa arrivals', value: '446,000', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'Including dependants · down from peak of 682k', sparklineData: [168, 185, 201, 218, 220, 162, 380, 596, 682, 446, 380] },
      { label: 'Non-EU work visa arrivals', value: '268,000', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'Down from 309k peak · health and care dominant', sparklineData: [80, 85, 90, 95, 95, 65, 145, 240, 309, 268, 230] },
    ],
  },
  'immigration-detention-length': {
    topic: 'Immigration Detention',
    slug: 'immigration-detention-length',
    href: '/immigration-detention-length',
    colour: '#6B7280',
    metrics: [
      { label: 'People entering detention 2024', value: '26,297', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'Down from 32,559 peak in 2017 · capacity constraints', sparklineData: [27993, 32559, 28919, 27849, 26773, 11356, 19374, 24426, 26009, 26297, 25000] },
      { label: 'Average detention length', value: '38 days', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Up from 29 days in 2019 · no statutory time limit', sparklineData: [25, 26, 27, 28, 29, 32, 35, 37, 38, 38, 38] },
      { label: 'Held over 28 days', value: '24%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Up from 18% in 2019 · no statutory limit in UK unlike EU', sparklineData: [16, 16, 17, 17, 18, 20, 21, 22, 23, 24, 24] },
    ],
  },
  'refugee-resettlement': {
    topic: 'Refugee Resettlement',
    slug: 'refugee-resettlement',
    href: '/refugee-resettlement',
    colour: '#6B7280',
    metrics: [
      { label: 'Resettled under formal schemes (total)', value: '39,000', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'Since 2015 · Vulnerable Persons Resettlement Scheme led', sparklineData: [1000, 3500, 6500, 11000, 16000, 18500, 21000, 26000, 31000, 36000, 39000] },
      { label: 'Ukrainian arrivals under Homes for Ukraine', value: '219,000', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'Since Feb 2022 · 70% still in UK, 30% returned', sparklineData: [0, 0, 0, 0, 0, 0, 0, 150000, 195000, 210000, 219000] },
      { label: 'Refugee homes secured within 12 months', value: '72%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'Up from 58% in 2020 · target is 80%', sparklineData: [60, 62, 65, 67, 68, 58, 62, 68, 70, 71, 72] },
    ],
  },
  'deportation-rates': {
    topic: 'Deportation Rates',
    slug: 'deportation-rates',
    href: '/deportation-rates',
    colour: '#6B7280',
    metrics: [
      { label: 'Returns/removals 2024', value: '19,212', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'Up from 14,259 in 2022 · still 70% below 2005 peak', sparklineData: [32885, 28644, 27094, 24580, 20261, 14313, 17274, 14259, 16479, 19212, 21000] },
      { label: 'Failed removals', value: '41%', unit: '', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'Down from 48% in 2020 · legal challenges main cause', sparklineData: [32, 33, 34, 36, 38, 48, 46, 44, 43, 42, 41] },
      { label: 'Returns vs estimated illegal entries', value: '2%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'Estimated 40,000+ channel crossings not removed', sparklineData: [8, 7, 7, 6, 5, 4, 3, 2, 2, 2, 2] },
    ],
  },
  'child-poverty-local': {
    topic: 'Child Poverty by Area',
    slug: 'child-poverty-local',
    href: '/child-poverty-local',
    colour: '#F4A261',
    metrics: [
      { label: 'Children in poverty', value: '4.3m', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '31% of all children · up 200k since 2019 two-child limit', sparklineData: [3.7, 3.8, 4.0, 4.1, 4.1, 4.1, 4.2, 4.2, 4.3, 4.3, 4.3] },
      { label: 'Highest LA child poverty rate', value: '45%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'Tower Hamlets, London · long-running deprivation', sparklineData: [41, 42, 43, 44, 45, 44, 44, 44, 45, 45, 45] },
      { label: 'Lowest LA child poverty rate', value: '6%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'Surrey · 7.5x lower than highest-rate area', sparklineData: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6] },
    ],
  },
  'household-income-inequality': {
    topic: 'Income Inequality',
    slug: 'household-income-inequality',
    href: '/household-income-inequality',
    colour: '#F4A261',
    metrics: [
      { label: 'Gini coefficient', value: '0.33', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'Stable for decade · higher than Germany 0.29, France 0.31', sparklineData: [0.34, 0.34, 0.33, 0.33, 0.34, 0.33, 0.33, 0.33, 0.33, 0.33, 0.33] },
      { label: 'Top 10% median income', value: '£77,000', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '9x bottom 10% · gap from financial assets', sparklineData: [65000, 67000, 69000, 70000, 71000, 70000, 72000, 74000, 75000, 76000, 77000] },
      { label: 'Top/bottom income ratio', value: '9×', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'Was 7x in 1980 · financial assets main driver', sparklineData: [8.5, 8.6, 8.7, 8.8, 8.9, 8.8, 8.9, 9.0, 9.0, 9.0, 9.0] },
    ],
  },
  'pip-assessment': {
    topic: 'PIP Assessment',
    slug: 'pip-assessment',
    href: '/pip-assessment',
    colour: '#F4A261',
    metrics: [
      { label: 'PIP claimants', value: '3.7m', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Up 1.3m since 2019 · mental health conditions largest growth', sparklineData: [1.9, 2.2, 2.5, 2.7, 2.8, 2.9, 3.0, 3.2, 3.4, 3.6, 3.7] },
      { label: 'Tribunal appeal success rate', value: '73%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Up from 62% in 2019 · DWP decision quality declining', sparklineData: [59, 60, 61, 62, 63, 63, 65, 68, 71, 72, 73] },
      { label: 'Average assessment wait', value: '21 weeks', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Up from 12 weeks in 2019 · some regions 26 weeks', sparklineData: [10, 11, 12, 13, 14, 16, 18, 20, 21, 21, 21] },
    ],
  },
  'benefit-delays': {
    topic: 'Benefit Delays',
    slug: 'benefit-delays',
    href: '/benefit-delays',
    colour: '#F4A261',
    metrics: [
      { label: 'UC paid on time', value: '82%', unit: '', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'Down from 88% in 2019 · capacity under strain', sparklineData: [90, 89, 88, 87, 87, 84, 83, 82, 82, 82, 82] },
      { label: 'Overpayment cost', value: '£9.7bn', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '3.6% of welfare spending · reclaimed from vulnerable claimants', sparklineData: [5.2, 5.5, 5.8, 6.1, 6.4, 6.8, 7.5, 8.5, 9.1, 9.4, 9.7] },
      { label: 'Underpayment cost', value: '£2.6bn', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'Poorest miss out · state pension biggest component', sparklineData: [1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.6, 2.6] },
    ],
  },
  'debt-enforcement': {
    topic: 'Debt Enforcement',
    slug: 'debt-enforcement',
    href: '/debt-enforcement',
    colour: '#F4A261',
    metrics: [
      { label: 'County Court Judgments', value: '706,000', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Up 18% since 2021 · average debt £1,442', sparklineData: [520, 540, 555, 570, 581, 532, 570, 598, 642, 680, 706] },
      { label: 'High-cost credit borrowers', value: '3.1m', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'Using payday loans, rent-to-own, doorstep lending', sparklineData: [3.5, 3.4, 3.3, 3.2, 3.1, 2.9, 2.9, 2.9, 3.0, 3.1, 3.1] },
      { label: 'Council tax enforcement actions', value: '2.8m', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Up 12% since 2019 · bailiff instructions growing', sparklineData: [2.2, 2.3, 2.3, 2.4, 2.5, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8] },
    ],
  },
  'pension-credit-uptake': {
    topic: 'Pension Credit Uptake',
    slug: 'pension-credit-uptake',
    href: '/pension-credit-uptake',
    colour: '#F4A261',
    metrics: [
      { label: 'Unclaimed Pension Credit per year', value: '£2.2bn', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'Roughly constant for a decade · DWP estimation method unchanged', sparklineData: [1.8, 1.9, 2.0, 2.1, 2.1, 2.1, 2.2, 2.2, 2.2, 2.2, 2.2] },
      { label: 'Eligible non-claimants', value: '880,000', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'Disproportionately older, private renter, single person', sparklineData: [850, 860, 870, 875, 880, 875, 875, 880, 880, 880, 880] },
      { label: 'Pension Credit take-up rate', value: '63%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'Unchanged for decade despite campaigns · stigma barrier', sparklineData: [63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63] },
    ],
  },
  'income-mobility': {
    topic: 'Income Mobility',
    slug: 'income-mobility',
    href: '/income-mobility',
    colour: '#F4A261',
    metrics: [
      { label: 'Persistence in bottom quintile', value: '38%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: '20% would be equal mobility · UK lags OECD peers', sparklineData: [39, 39, 39, 38, 38, 38, 38, 38, 38, 38, 38] },
      { label: 'Intergenerational earnings elasticity', value: '0.46', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: '0=perfect mobility, 1=no mobility · Denmark 0.15', sparklineData: [0.47, 0.47, 0.46, 0.46, 0.46, 0.46, 0.46, 0.46, 0.46, 0.46, 0.46] },
      { label: 'UK OECD mobility rank', value: '28th', unit: 'of 38', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'Lower than France (11th), Germany (16th)', sparklineData: [27, 27, 27, 28, 28, 28, 28, 28, 28, 28, 28] },
    ],
  },
  'waste-flows': {
    topic: 'Waste Flows',
    slug: 'waste-flows',
    href: '/waste-flows',
    colour: '#2A9D8F',
    metrics: [
      { label: 'Landfill share', value: '5.5%', unit: '', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'Down from 80% in 2000 · nearly eliminated in England', sparklineData: [28, 24, 20, 17, 14, 11, 8.5, 7, 6.5, 6, 5.5] },
      { label: 'Incineration/EfW share', value: '49%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Doubled since 2014 · now greater than landfill and recycling', sparklineData: [22, 24, 26, 28, 31, 34, 38, 42, 45, 47, 49] },
      { label: 'Recycling share', value: '43.8%', unit: '', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'Stagnant for a decade · target 65% by 2035', sparklineData: [40, 41, 42, 43, 43, 43, 43, 44, 44, 44, 43.8] },
    ],
  },
  'landfill-capacity': {
    topic: 'Landfill Capacity',
    slug: 'landfill-capacity',
    href: '/landfill-capacity',
    colour: '#2A9D8F',
    metrics: [
      { label: 'Estimated remaining capacity', value: '300m tonnes', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'England estimate · declining 20m tonnes/yr', sparklineData: [500, 480, 460, 440, 420, 400, 380, 360, 340, 320, 300] },
      { label: 'Counties with no active landfill', value: '5', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Up from 1 in 2015 · forcing long-distance transport', sparklineData: [1, 1, 2, 2, 2, 3, 3, 4, 5, 5, 5] },
      { label: 'Years of capacity at current rates', value: '12', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'England estimate · varies significantly by region', sparklineData: [30, 28, 26, 24, 22, 20, 18, 16, 15, 14, 12] },
    ],
  },
  'plastic-exports': {
    topic: 'Plastic Exports',
    slug: 'plastic-exports',
    href: '/plastic-exports',
    colour: '#2A9D8F',
    metrics: [
      { label: 'Plastic waste exported', value: '615,000 tonnes', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'Down from 800k peak in 2017 · Turkey now main recipient', sparklineData: [610, 700, 800, 770, 720, 580, 520, 580, 620, 615, 615] },
      { label: 'Share going to Turkey', value: '38%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'Post-China import ban 2018 · illicit dumping evidence found', sparklineData: [5, 5, 8, 12, 22, 35, 38, 40, 38, 38, 38] },
      { label: 'Unverified final destination', value: '31%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'Cannot be traced to legitimate recycling', sparklineData: [10, 12, 15, 18, 22, 28, 30, 31, 31, 31, 31] },
    ],
  },
  'packaging-recycling': {
    topic: 'Packaging Recycling',
    slug: 'packaging-recycling',
    href: '/packaging-recycling',
    colour: '#2A9D8F',
    metrics: [
      { label: 'Plastic packaging recycling rate', value: '51%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'Up from 40% in 2015 · target 70% by 2030', sparklineData: [40, 42, 44, 45, 46, 46, 47, 49, 50, 51, 51] },
      { label: 'Paper/card recycling rate', value: '82%', unit: '', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'Stable near target · high material quality', sparklineData: [75, 76, 77, 78, 79, 80, 81, 82, 82, 82, 82] },
      { label: 'Plastic packaging consumption', value: '950,000 tonnes', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'Barely changed since 2015 · single-use reductions offset', sparklineData: [990, 985, 980, 975, 970, 960, 955, 950, 950, 950, 950] },
    ],
  },
  'food-waste-volume': {
    topic: 'Food Waste',
    slug: 'food-waste-volume',
    href: '/food-waste-volume',
    colour: '#2A9D8F',
    metrics: [
      { label: 'Household food waste', value: '6.4m tonnes', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'Down from 7.3m in 2015 · progress slowing', sparklineData: [7.3, 7.2, 7.1, 7.0, 6.9, 6.8, 6.7, 6.6, 6.5, 6.4, 6.4] },
      { label: 'Financial value wasted', value: '£17bn', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: '£640/person/year · £1,000/family of four', sparklineData: [18.5, 18.2, 18.0, 17.8, 17.5, 17.2, 17.0, 17.0, 17.0, 17.0, 17.0] },
      { label: 'Avoidable food waste share', value: '73%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'Could have been eaten · not out-of-date or inedible', sparklineData: [75, 74, 74, 74, 73, 73, 73, 73, 73, 73, 73] },
    ],
  },
  'incineration-growth': {
    topic: 'Incineration Growth',
    slug: 'incineration-growth',
    href: '/incineration-growth',
    colour: '#2A9D8F',
    metrics: [
      { label: 'EfW annual capacity', value: '15.4m tonnes', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Doubled since 2014 · 54 operational plants', sparklineData: [6.5, 7.5, 8.5, 9.5, 10.5, 11.5, 12.5, 13.5, 14.2, 14.9, 15.4] },
      { label: 'EfW plants operational', value: '54', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Up from 30 in 2015 · 20 more planned or under construction', sparklineData: [30, 32, 35, 38, 41, 44, 46, 49, 51, 53, 54] },
      { label: 'CO2 from EfW', value: '11.6m tonnes CO2e', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '2% of UK total emissions · ETS inclusion 2028', sparklineData: [5.0, 5.8, 6.5, 7.2, 7.9, 8.5, 9.2, 10.0, 10.8, 11.2, 11.6] },
    ],
  },
  'recycling-contamination': {
    topic: 'Recycling Contamination',
    slug: 'recycling-contamination',
    href: '/recycling-contamination',
    colour: '#2A9D8F',
    metrics: [
      { label: 'Residents contaminating recycling', value: '82%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'Broadly unchanged for 5 years · confusion about rules', sparklineData: [82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82] },
      { label: 'Tonnes rejected as contaminated', value: '525,000', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: '2.5% of all materials collected for recycling', sparklineData: [480, 490, 500, 510, 515, 520, 520, 522, 523, 525, 525] },
      { label: 'Cost of contamination', value: '£52m/year', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Paid by councils · rising as collection volumes grow', sparklineData: [35, 37, 39, 41, 43, 45, 47, 49, 50, 51, 52] },
    ],
  },
  'waste-crime': {
    topic: 'Waste Crime',
    slug: 'waste-crime',
    href: '/waste-crime',
    colour: '#2A9D8F',
    metrics: [
      { label: 'Annual cost of waste crime', value: '£924m', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '+£150m since 2018 · fly-tipping, illegal sites, fraud', sparklineData: [770, 800, 830, 850, 880, 910, 920, 920, 920, 922, 924] },
      { label: 'Active illegal waste sites (est.)', value: '1,000', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'EA estimates · many small sites evade detection', sparklineData: [600, 650, 700, 750, 800, 850, 900, 950, 980, 1000, 1000] },
      { label: 'EA waste crime prosecutions', value: '214', unit: '', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'Down from 372 in 2015 · budget cuts', sparklineData: [372, 350, 330, 310, 290, 270, 260, 248, 230, 220, 214] },
    ],
  },
  'national-travel-survey': {
    topic: 'National Travel Survey',
    slug: 'national-travel-survey',
    href: '/national-travel-survey',
    colour: '#264653',
    metrics: [
      { label: 'Car share of trips', value: '63%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'Broadly unchanged since 2000 · slight post-pandemic rise', sparklineData: [62, 62, 62, 62, 62, 62, 55, 62, 63, 63, 63] },
      { label: 'Cycling share of trips', value: '1.5%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'Up from 1.0% in 2015 · still tiny vs Netherlands 27%', sparklineData: [1.0, 1.1, 1.1, 1.2, 1.2, 1.3, 2.0, 1.8, 1.5, 1.5, 1.5] },
      { label: 'Public transport share', value: '7%', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'Down from 10% pre-pandemic · partially recovered', sparklineData: [10, 10, 10, 10, 10, 8, 3, 6, 7, 7, 7] },
    ],
  },
  'fuel-prices': {
    topic: 'Fuel Prices',
    slug: 'fuel-prices',
    href: '/fuel-prices',
    colour: '#264653',
    metrics: [
      { label: 'Petrol pence per litre', value: '146p', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'Down from 192p peak in 2022 · still 30% above 2019', sparklineData: [109, 113, 119, 125, 128, 109, 130, 180, 183, 160, 146] },
      { label: 'vs 2019 level', value: '+30%', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: '2019 level was 128p · post-Ukraine shock persists', sparklineData: [0, 4, 8, 12, 0, -15, 2, 41, 43, 25, 30] },
      { label: 'Diesel vs petrol gap', value: '7p', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'HGV and van fleets paying more relative to petrol', sparklineData: [5, 5, 6, 6, 7, 7, 7, 9, 8, 7, 7] },
    ],
  },
  'transport-poverty': {
    topic: 'Transport Poverty',
    slug: 'transport-poverty',
    href: '/transport-poverty',
    colour: '#264653',
    metrics: [
      { label: 'Households in transport poverty', value: '2.3m', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Spending 10%+ of income on transport · 8% of all HHs', sparklineData: [1.8, 1.9, 2.0, 2.0, 2.1, 2.1, 2.1, 2.1, 2.2, 2.3, 2.3] },
      { label: 'Transport cost rise for low-income', value: '+40%', unit: 'since 2010', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Bus and rail fares rose faster than general inflation', sparklineData: [0, 4, 8, 12, 16, 20, 24, 28, 33, 37, 40] },
      { label: 'Rural transport deprivation rate', value: '23%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'Bus cuts mean 3,000 routes removed since 2010', sparklineData: [20, 20, 21, 21, 21, 22, 22, 22, 23, 23, 23] },
    ],
  },
  'cycling-safety': {
    topic: 'Cycling Safety',
    slug: 'cycling-safety',
    href: '/cycling-safety',
    colour: '#264653',
    metrics: [
      { label: 'Cyclist fatalities', value: '97', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'Broadly unchanged for decade · per-mile risk falling slowly', sparklineData: [107, 104, 101, 99, 100, 95, 93, 91, 95, 97, 97] },
      { label: 'Serious cyclist injuries', value: '4,286', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Highest since 2012 · cycling growth outpacing safety', sparklineData: [3652, 3598, 3615, 3645, 3710, 3480, 3600, 3800, 4100, 4200, 4286] },
      { label: 'Protected cycle lane coverage', value: '< 5%', unit: 'of main roads', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'Netherlands 35% · significant infrastructure deficit', sparklineData: [2, 2, 2.5, 2.5, 3, 3.5, 4, 4, 4.5, 4.8, 4.9] },
    ],
  },
  'rail-fares-increase': {
    topic: 'Rail Fares',
    slug: 'rail-fares-increase',
    href: '/rail-fares-increase',
    colour: '#264653',
    metrics: [
      { label: 'Real fares increase since 1995', value: '+94%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Real terms · wages rose 50% over same period', sparklineData: [55, 60, 64, 68, 71, 73, 76, 79, 83, 88, 94] },
      { label: 'Annual regulated fare increase 2024', value: '4.9%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Above inflation · RPI-linked formula since 1994', sparklineData: [2.6, 2.2, 3.4, 3.1, 2.8, 2.6, 2.6, 3.8, 5.9, 4.9, 4.9] },
      { label: 'UK vs EU average rail cost', value: '1.8×', unit: 'EU average', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'Per km per capita income · EU average lowest in world', sparklineData: [1.6, 1.6, 1.6, 1.7, 1.7, 1.7, 1.7, 1.8, 1.8, 1.8, 1.8] },
    ],
  },
  'parking-costs': {
    topic: 'Parking Costs',
    slug: 'parking-costs',
    href: '/parking-costs',
    colour: '#264653',
    metrics: [
      { label: 'Avg city centre day permit', value: '£24', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '+85% since 2015 · London average £45, provincial cities £18', sparklineData: [13, 14, 15, 16, 17, 18, 17, 20, 22, 23, 24] },
      { label: 'Council parking revenue', value: '£1.8bn', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Up from £1.2bn in 2015 · net surplus £860m after costs', sparklineData: [1.2, 1.25, 1.3, 1.35, 1.4, 1.2, 1.4, 1.55, 1.65, 1.75, 1.8] },
      { label: 'Towns removing free parking since 2015', value: '285', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'To balance council budgets · footfall impact debated', sparklineData: [0, 25, 55, 90, 125, 155, 190, 225, 255, 275, 285] },
    ],
  },
  'freight-road-share': {
    topic: 'Freight Road Share',
    slug: 'freight-road-share',
    href: '/freight-road-share',
    colour: '#264653',
    metrics: [
      { label: 'Road freight share', value: '78%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'vs Germany 63% · EU average 74%', sparklineData: [77, 77, 77, 77, 77, 78, 79, 78, 78, 78, 78] },
      { label: 'Rail freight share', value: '9%', unit: '', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'vs Germany 18% · some growth in intermodal', sparklineData: [10, 10, 9, 9, 9, 9, 8, 9, 9, 9, 9] },
      { label: 'Lorry VMT annual', value: '24bn', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'Vehicle miles by HGVs · broadly flat post-pandemic', sparklineData: [21, 22, 22, 23, 24, 22, 22, 23, 23, 24, 24] },
    ],
  },
  'bathing-water': {
    topic: 'Bathing Water Quality',
    slug: 'bathing-water',
    href: '/bathing-water',
    colour: '#2A9D8F',
    metrics: [
      { label: 'Bathing waters at Excellent status', value: '60%', unit: '', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'Down from 72% in 2013 · sewage the leading cause', sparklineData: [72, 70, 68, 67, 66, 65, 63, 62, 61, 60, 60] },
      { label: 'Bathing waters at Poor/Sufficient', value: '11%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Up from 5% in 2013 · failures concentrated after rainfall', sparklineData: [5, 5, 6, 6, 7, 7, 8, 9, 10, 11, 11] },
      { label: 'Sewage discharge events', value: '3.6m hours', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '2023 total · up from 0.1m hours in 2016', sparklineData: [0.1, 0.17, 0.9, 2.5, 3.1, 2.7, 1.8, 3.6, 3.6, 3.6, 3.6] },
    ],
  },
  'renewable-energy': {
    topic: 'Renewable Energy',
    slug: 'renewable-energy',
    href: '/renewable-energy',
    colour: '#2A9D8F',
    metrics: [
      { label: 'Renewable electricity share', value: '45.5%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'Record high · up from 7% in 2010', sparklineData: [24.6, 29.3, 33.1, 37.1, 43.1, 40.2, 41.5, 47.0, 45.5, 45.5, 45.5] },
      { label: 'Wind power share', value: '30%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'Offshore and onshore combined · record 32% in 2023', sparklineData: [11, 14, 17, 20, 25, 25, 25, 29, 30, 30, 30] },
      { label: 'Coal generation share', value: '0%', unit: '', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'Eliminated Sept 2024 · first G7 country to end coal', sparklineData: [22, 9, 7, 5, 3, 2, 1.5, 1, 0.5, 0.1, 0] },
    ],
  },
  'tree-planting': {
    topic: 'Tree Planting',
    slug: 'tree-planting',
    href: '/tree-planting',
    colour: '#2A9D8F',
    metrics: [
      { label: 'Trees planted 2023-24 (UK)', value: '13,700 ha', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'Up from 10,500 in 2021 · Scotland accounts for 70%', sparklineData: [8800, 9200, 9600, 10000, 10500, 10800, 10500, 12000, 13000, 13500, 13700] },
      { label: 'CCC recommended rate', value: '30,000 ha', unit: '/year', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'For net zero woodland cover · needs doubling', sparklineData: [30000, 30000, 30000, 30000, 30000, 30000, 30000, 30000, 30000, 30000, 30000] },
      { label: 'Progress vs 30,000 ha target', value: '46%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Improving but well short of target · England biggest gap', sparklineData: [29, 31, 32, 33, 35, 36, 35, 40, 43, 45, 46] },
    ],
  },
  'biodiversity-loss': {
    topic: 'Biodiversity Loss',
    slug: 'biodiversity-loss',
    href: '/biodiversity-loss',
    colour: '#2A9D8F',
    metrics: [
      { label: 'UK species in decline since 1970', value: '41%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'Of 10,000+ monitored species · farmland birds -57%', sparklineData: [37, 38, 38, 39, 39, 40, 40, 40, 41, 41, 41] },
      { label: 'UK global nature depletion rank', value: '12th worst', unit: 'globally', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'Of all countries measured · WWF Living Planet 2024', sparklineData: [10, 10, 11, 11, 12, 12, 12, 12, 12, 12, 12] },
      { label: 'Protected areas in favourable status', value: '14%', unit: '', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'Of SSSI land area · massive shortfall vs targets', sparklineData: [17, 16, 15, 15, 14, 14, 14, 14, 14, 14, 14] },
    ],
  },
  'air-pollution-hotspots': {
    topic: 'Air Pollution Hotspots',
    slug: 'air-pollution-hotspots',
    href: '/air-pollution-hotspots',
    colour: '#2A9D8F',
    metrics: [
      { label: 'Areas exceeding WHO PM2.5 limits', value: '44', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'Down from 61 in 2018 · progress slow in cities', sparklineData: [61, 58, 55, 52, 50, 46, 44, 43, 44, 44, 44] },
      { label: 'Estimated premature deaths/year', value: '40,000', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'Down from 50,000 in 2015 · second biggest public health threat', sparklineData: [50000, 48000, 46000, 44000, 42000, 40000, 39000, 39500, 40000, 40000, 40000] },
      { label: 'NO2 roadside exceedance zones', value: '89', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'Down from 103 in 2019 · legal deadline missed repeatedly', sparklineData: [102, 103, 101, 100, 103, 98, 95, 93, 91, 90, 89] },
    ],
  },
  'plastic-pollution-rivers': {
    topic: 'Plastic in Rivers',
    slug: 'plastic-pollution-rivers',
    href: '/plastic-pollution-rivers',
    colour: '#2A9D8F',
    metrics: [
      { label: 'Plastic entering rivers (est.)', value: '70,000 tonnes', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Estimate rising as single-use plastic persists', sparklineData: [55000, 58000, 61000, 63000, 65000, 64000, 66000, 68000, 69000, 70000, 70000] },
      { label: 'Rivers with good ecological status', value: '14%', unit: '', direction: 'flat' as const, polarity: 'up-is-good' as const, context: 'Target was 75% by 2027 · already missed', sparklineData: [17, 16, 16, 15, 15, 15, 14, 14, 14, 14, 14] },
      { label: 'Microplastics in tested rivers', value: '100%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'Every English river tested contains microplastics', sparklineData: [85, 88, 92, 95, 97, 99, 100, 100, 100, 100, 100] },
    ],
  },
  'carbon-budget-progress': {
    topic: 'Carbon Budget Progress',
    slug: 'carbon-budget-progress',
    href: '/carbon-budget-progress',
    colour: '#2A9D8F',
    metrics: [
      { label: '4th carbon budget miss projection', value: '12%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'CCC projects 12% overrun · was 8% in 2022', sparklineData: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 12] },
      { label: 'Heat pumps vs trajectory', value: '60% below', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: '2024 installations 60% below CCC pathway', sparklineData: [95, 90, 85, 80, 75, 70, 70, 65, 62, 60, 60] },
      { label: 'EV share of new car sales', value: '20%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: '+17pp since 2019 · on track for 2030 ban', sparklineData: [1, 2, 3, 4, 7, 8, 12, 16, 18, 19, 20] },
    ],
  },
  'defence-spending': {
    topic: 'Defence Spending',
    slug: 'defence-spending',
    href: '/defence-spending',
    colour: '#6B7280',
    metrics: [
      { label: 'Defence spending as % GDP', value: '2.3%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'Above NATO 2% target for first time since 2010', sparklineData: [2.2, 2.2, 2.1, 2.1, 2.1, 2.1, 2.2, 2.25, 2.3, 2.3, 2.3] },
      { label: 'Target: 2.5% by 2027', value: '2.5%', unit: 'commitment', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'Would add £14bn/year · NATO 3% tier also discussed', sparklineData: [2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.5] },
      { label: 'Real defence spending increase 2025-27', value: '+£10bn', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'Largest real-terms uplift since Cold War end', sparklineData: [0, 0, 0, 0, 0, 0, 2, 4, 6, 8, 10] },
    ],
  },
  'lobbying-donations': {
    topic: 'Lobbying and Donations',
    slug: 'lobbying-donations',
    href: '/lobbying-donations',
    colour: '#6B7280',
    metrics: [
      { label: 'Declared political donations (Q4 2024)', value: '£20.3m', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Highest Q4 for 10 years · property and finance dominant', sparklineData: [12, 10, 11, 13, 14, 9, 10, 14, 16, 18, 20.3] },
      { label: 'Registered lobbyists', value: '984', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'Up from 392 in 2015 · but most in-house lobbyists excluded', sparklineData: [392, 450, 510, 580, 640, 700, 750, 800, 870, 940, 984] },
      { label: 'Unregistered lobbying contacts est.', value: '6,000+', unit: '/year', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'Transparency International estimate · vast majority not disclosed', sparklineData: [5000, 5200, 5400, 5600, 5800, 5800, 5900, 6000, 6000, 6000, 6000] },
    ],
  },
  'foi-response-times': {
    topic: 'FOI Response Times',
    slug: 'foi-response-times',
    href: '/foi-response-times',
    colour: '#6B7280',
    metrics: [
      { label: 'FOI responses within 20-day deadline', value: '37%', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'Down from 73% in 2015 · biggest government failure is resourcing', sparklineData: [73, 71, 68, 65, 62, 55, 50, 45, 42, 39, 37] },
      { label: 'Cabinet Office compliance', value: '18%', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'Worst of any central department · 82% miss deadline', sparklineData: [55, 52, 48, 44, 40, 35, 30, 27, 23, 20, 18] },
      { label: 'Requests refused', value: '38%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Up from 28% in 2015 · public interest exemption overused', sparklineData: [28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38] },
    ],
  },
  'public-private-finance': {
    topic: 'Public Private Finance',
    slug: 'public-private-finance',
    href: '/public-private-finance',
    colour: '#6B7280',
    metrics: [
      { label: 'Outstanding PFI payments', value: '£42bn', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'Committed payments to 2040s · declining as contracts expire', sparklineData: [58, 55, 52, 50, 48, 46, 44, 43, 42, 42, 42] },
      { label: 'Multiplier on original capital cost', value: '3.2×', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: '£13bn of assets cost £42bn+ to procure · financing costs dominant', sparklineData: [3.5, 3.4, 3.4, 3.3, 3.3, 3.2, 3.2, 3.2, 3.2, 3.2, 3.2] },
      { label: 'NHS trusts still in PFI', value: '118', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'Down from 127 in 2018 as contracts expire', sparklineData: [127, 127, 126, 125, 124, 123, 122, 121, 120, 119, 118] },
    ],
  },
  'voter-registration': {
    topic: 'Voter Registration',
    slug: 'voter-registration',
    href: '/voter-registration',
    colour: '#6B7280',
    metrics: [
      { label: 'Eligible voters not registered', value: '8.3m', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: '17% of eligible electorate · similar to pre-IER level', sparklineData: [7.5, 7.8, 8.0, 8.1, 8.2, 8.0, 8.1, 8.2, 8.3, 8.3, 8.3] },
      { label: '18-24 year olds unregistered', value: '43%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'Double the overall rate · rental tenure barrier', sparklineData: [44, 44, 43, 43, 43, 42, 42, 43, 43, 43, 43] },
      { label: 'Electoral register completeness', value: '83%', unit: '', direction: 'flat' as const, polarity: 'up-is-good' as const, context: '83% of eligible electorate on register · IER introduced gaps', sparklineData: [85, 84, 83, 83, 83, 83, 83, 83, 83, 83, 83] },
    ],
  },
  'local-election-turnout': {
    topic: 'Local Election Turnout',
    slug: 'local-election-turnout',
    href: '/local-election-turnout',
    colour: '#6B7280',
    metrics: [
      { label: 'Average local election turnout', value: '37%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: '30pp below general election turnout · decades unchanged', sparklineData: [36, 37, 38, 36, 36, 37, 36, 37, 36, 37, 37] },
      { label: 'Wards with under 20% turnout', value: '18%', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'Mostly urban, deprived areas · lowest wards under 10%', sparklineData: [17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18] },
      { label: 'GE vs local turnout gap', value: '30pp', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: '2024 GE 60% vs avg local 37% · growing disengagement', sparklineData: [28, 29, 29, 30, 30, 29, 29, 30, 30, 30, 30] },
    ],
  },
  'council-bankruptcy': {
    topic: 'Council Bankruptcy',
    slug: 'council-bankruptcy',
    href: '/council-bankruptcy',
    colour: '#6B7280',
    metrics: [
      { label: 'S114 notices issued', value: '14', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: '2018-2025 · none in preceding decade', sparklineData: [0, 0, 0, 1, 2, 3, 5, 8, 10, 12, 14] },
      { label: 'Government bailout loans', value: '£3.6bn', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Exceptional finance mechanism · repayment over decades', sparklineData: [0, 0, 0, 0.1, 0.3, 0.6, 1.2, 2.0, 2.8, 3.2, 3.6] },
      { label: 'Councils at financial risk (est.)', value: '30+', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'LGA estimate 2024 · further s114 notices expected', sparklineData: [5, 8, 10, 12, 15, 18, 20, 22, 25, 28, 30] },
    ],
  },
  'public-sector-productivity': {
    topic: 'Public Sector Productivity',
    slug: 'public-sector-productivity',
    href: '/public-sector-productivity',
    colour: '#6B7280',
    metrics: [
      { label: 'Public sector productivity vs pre-pandemic', value: '-6%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Recovering slowly from -12% trough in 2021', sparklineData: [-2, -2, -3, -3, -3, -12, -10, -8, -7, -6, -6] },
      { label: 'NHS productivity vs 2019', value: '-10%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Recovering from -22% pandemic trough · activity high but output low', sparklineData: [0, 0, 0, 0, 0, -22, -18, -14, -12, -10, -10] },
      { label: 'Education productivity vs 2019', value: '-3%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Recovering faster than NHS · pupil absence still high', sparklineData: [0, 0, 0, 0, 0, -18, -8, -5, -4, -3, -3] },
    ],
  },
  'internet-access': {
    topic: 'Internet Access',
    slug: 'internet-access',
    href: '/internet-access',
    colour: '#264653',
    metrics: [
      { label: 'Adults without internet access', value: '5.2M', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'Down from 7.4M in 2015 · Progress stalling', sparklineData: [7.4, 7.1, 6.8, 6.5, 6.2, 6.0, 5.8, 5.6, 5.4, 5.3, 5.2] },
      { label: 'Adults never used internet', value: '3.8M', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'Older adults hardest hit · 73% are over 65', sparklineData: [6.3, 5.9, 5.5, 5.1, 4.8, 4.5, 4.3, 4.1, 4.0, 3.9, 3.8] },
      { label: 'Low-income households online', value: '78%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'Up from 62% in 2015 · Still 22% gap vs affluent', sparklineData: [62, 65, 67, 69, 71, 73, 74, 75, 76, 77, 78] },
    ],
  },
  'mobile-coverage': {
    topic: 'Mobile Coverage',
    slug: 'mobile-coverage',
    href: '/mobile-coverage',
    colour: '#264653',
    metrics: [
      { label: 'Premises with no reliable indoor voice', value: '4%', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'Down from 9% in 2015 · Progress slowing in rural areas', sparklineData: [9, 8.5, 8.0, 7.5, 7.0, 6.5, 5.8, 5.2, 4.7, 4.3, 4.0] },
      { label: 'UK landmass with 4G coverage', value: '92%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'Target: 95% by 2026 · Shared Rural Network behind schedule', sparklineData: [72, 75, 78, 80, 82, 84, 86, 88, 89, 91, 92] },
      { label: 'Rural premises: single operator only', value: '18%', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'No operator choice · Emergency calls only risk', sparklineData: [31, 29, 27, 25, 24, 23, 22, 21, 20, 19, 18] },
    ],
  },
  'data-breach-volume': {
    topic: 'Data Breaches',
    slug: 'data-breach-volume',
    href: '/data-breach-volume',
    colour: '#264653',
    metrics: [
      { label: 'Data breaches reported to ICO', value: '3,520', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Up from 2,159 in 2019 · +63% in 5 years', sparklineData: [1100, 1400, 1800, 2159, 2400, 2750, 2900, 3100, 3250, 3400, 3520] },
      { label: 'Cyber attacks as % of breaches', value: '39%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Up from 24% in 2019 · Phishing dominant vector', sparklineData: [24, 26, 28, 30, 32, 34, 35, 36, 37, 38, 39] },
      { label: 'ICO fines issued (£m)', value: '£9.2M', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'Enforcement increasing · Post-GDPR era', sparklineData: [1.2, 2.4, 4.8, 6.1, 7.2, 8.4, 9.0, 8.8, 9.1, 9.0, 9.2] },
    ],
  },
  'ai-in-public-services': {
    topic: 'AI in Public Services',
    slug: 'ai-in-public-services',
    href: '/ai-in-public-services',
    colour: '#264653',
    metrics: [
      { label: 'Government AI projects identified', value: '215', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'Up from 63 in 2019 · Transparency still limited', sparklineData: [63, 80, 100, 130, 155, 175, 188, 196, 204, 210, 215] },
      { label: 'Public trust in govt AI use', value: '31%', unit: '', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'Down from 42% in 2020 · Post-algorithm scandal', sparklineData: [38, 40, 42, 40, 38, 36, 34, 33, 32, 31, 31] },
      { label: 'AI transparency register entries', value: '67', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'Only 31% of known projects published · Register voluntary', sparklineData: [0, 0, 0, 12, 24, 35, 44, 52, 58, 63, 67] },
    ],
  },
  'tech-sector-employment': {
    topic: 'Tech Sector Employment',
    slug: 'tech-sector-employment',
    href: '/tech-sector-employment',
    colour: '#264653',
    metrics: [
      { label: 'UK tech sector employees', value: '1.84M', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'Up from 1.18M in 2015 · 3rd largest in Europe', sparklineData: [1.18, 1.24, 1.3, 1.38, 1.45, 1.52, 1.62, 1.74, 1.8, 1.82, 1.84] },
      { label: 'Tech jobs outside London & SE', value: '44%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'Up from 38% in 2015 · Regional spread improving slowly', sparklineData: [38, 38, 39, 39, 40, 41, 42, 43, 43, 44, 44] },
      { label: 'Tech redundancies (2023 peak)', value: '52K', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: '2023 downturn · Global pattern · Hiring recovering', sparklineData: [5, 6, 7, 8, 9, 10, 12, 15, 52, 28, 18] },
    ],
  },
  'digital-skills-adults': {
    topic: 'Digital Skills',
    slug: 'digital-skills-adults',
    href: '/digital-skills-adults',
    colour: '#264653',
    metrics: [
      { label: 'Adults lacking basic digital skills', value: '8.0M', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'Down from 12.6M in 2015 · Pace of improvement slowing', sparklineData: [12.6, 12.0, 11.4, 10.8, 10.2, 9.6, 9.1, 8.7, 8.4, 8.2, 8.0] },
      { label: 'Employers struggling to hire digitally skilled staff', value: '52%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Up from 39% in 2019 · AI creating new skill gaps', sparklineData: [35, 36, 37, 38, 39, 41, 43, 46, 48, 50, 52] },
      { label: 'Digital skills bootcamp completions', value: '24K', unit: '/year', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'Up from 3K in 2021 · Shortage still large relative to need', sparklineData: [0, 0, 0, 0, 0, 0, 3000, 8000, 14000, 19000, 24000] },
    ],
  },
  'platform-economy-gig': {
    topic: 'Gig Economy',
    slug: 'platform-economy-gig',
    href: '/platform-economy-gig',
    colour: '#264653',
    metrics: [
      { label: 'Gig economy workers', value: '4.4M', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Up from 1.2M in 2015 · 14% of workforce', sparklineData: [1.2, 1.5, 1.9, 2.4, 2.9, 3.5, 3.8, 4.0, 4.2, 4.3, 4.4] },
      { label: 'Gig workers with sick pay entitlement', value: '6%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'Up from 2% pre-Uber ruling · Still very low', sparklineData: [2, 2, 2, 3, 3, 3, 5, 5, 6, 6, 6] },
      { label: 'Effective hourly rate vs minimum wage', value: '-£1.20', unit: '/hr', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'After costs, most earn below NMW · Delivery worst hit', sparklineData: [-0.4, -0.5, -0.6, -0.7, -0.8, -0.9, -1.0, -1.1, -1.1, -1.2, -1.2] },
    ],
  },
  'volunteering-rates': {
    topic: 'Volunteering',
    slug: 'volunteering-rates',
    href: '/volunteering-rates',
    colour: '#2A9D8F',
    metrics: [
      { label: 'Adults volunteering regularly', value: '21%', unit: '', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'Down from 27% in 2015 · Pre-pandemic trend downward', sparklineData: [27, 26, 26, 25, 25, 18, 21, 22, 22, 21, 21] },
      { label: 'Volunteer hours per week (total)', value: '2.4bn', unit: '', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'Estimated economic value: £57bn/year · Falling', sparklineData: [3.1, 3.0, 2.9, 2.9, 2.8, 2.1, 2.3, 2.4, 2.4, 2.4, 2.4] },
      { label: 'Organisations with volunteer shortages', value: '43%', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Up from 24% in 2015 · Crisis in some sectors', sparklineData: [24, 25, 26, 27, 28, 38, 40, 41, 42, 43, 43] },
    ],
  },
  'physical-activity': {
    topic: 'Physical Activity',
    slug: 'physical-activity',
    href: '/physical-activity',
    colour: '#2A9D8F',
    metrics: [
      { label: 'Inactive adults (England)', value: '27%', unit: '', direction: 'down' as const, polarity: 'up-is-bad' as const, context: 'Down from 31% in 2015 · Fell further during COVID', sparklineData: [31, 30, 29, 29, 28, 32, 30, 29, 28, 27, 27] },
      { label: 'Meeting CMO activity guidelines', value: '67%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: '150 mins/week · Up from 59% in 2015', sparklineData: [59, 60, 61, 62, 63, 59, 62, 64, 65, 66, 67] },
      { label: 'Activity gap: deprived vs affluent', value: '18pp', unit: '', direction: 'flat' as const, polarity: 'up-is-bad' as const, context: 'Persistent inequality · Deprivation strongest predictor', sparklineData: [20, 20, 19, 19, 19, 21, 20, 19, 18, 18, 18] },
    ],
  },
  'nature-connection': {
    topic: 'Nature Connection',
    slug: 'nature-connection',
    href: '/nature-connection',
    colour: '#2A9D8F',
    metrics: [
      { label: 'Adults visiting green/blue space weekly', value: '57%', unit: '', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'Down from 63% in 2019 pre-COVID · Urban-rural gap persists', sparklineData: [58, 59, 60, 62, 63, 61, 60, 58, 57, 57, 57] },
      { label: "Children's nature connection score", value: '3.1', unit: '/5', direction: 'down' as const, polarity: 'up-is-good' as const, context: 'Down from 3.6 in 2019 · Screen time displacement', sparklineData: [3.4, 3.5, 3.5, 3.6, 3.6, 3.4, 3.3, 3.2, 3.1, 3.1, 3.1] },
      { label: 'Deprived areas: accessible green space', value: '48%', unit: '', direction: 'up' as const, polarity: 'up-is-good' as const, context: 'Up from 41% · But still well below 72% in affluent areas', sparklineData: [41, 42, 42, 43, 44, 44, 45, 46, 47, 48, 48] },
    ],
  },
  'asylum-backlog': {
    topic: 'Asylum Backlog',
    slug: 'asylum-backlog',
    href: '/asylum-backlog',
    colour: '#6B7280',
    metrics: [
      { label: 'Asylum Backlog', value: 'See data', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Tracking asylum backlog nationally', sparklineData: [10,10,11,11,12,12,13,13,14] },
    ],
  },
  'broadband-coverage': {
    topic: 'Broadband Coverage',
    slug: 'broadband-coverage',
    href: '/broadband-coverage',
    colour: '#264653',
    metrics: [
      { label: 'Broadband Coverage', value: 'See data', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Tracking broadband coverage nationally', sparklineData: [10,10,11,11,12,12,13,13,14] },
    ],
  },
  'bus-services': {
    topic: 'Bus Services',
    slug: 'bus-services',
    href: '/bus-services',
    colour: '#264653',
    metrics: [
      { label: 'Bus Services', value: 'See data', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Tracking bus services nationally', sparklineData: [10,10,11,11,12,12,13,13,14] },
    ],
  },
  'fertility-rate': {
    topic: 'Fertility Rate',
    slug: 'fertility-rate',
    href: '/fertility-rate',
    colour: '#6B7280',
    metrics: [
      { label: 'Fertility Rate', value: 'See data', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Tracking fertility rate nationally', sparklineData: [10,10,11,11,12,12,13,13,14] },
    ],
  },
  'flooding-risk': {
    topic: 'Flooding Risk',
    slug: 'flooding-risk',
    href: '/flooding-risk',
    colour: '#2A9D8F',
    metrics: [
      { label: 'Flooding Risk', value: 'See data', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Tracking flooding risk nationally', sparklineData: [10,10,11,11,12,12,13,13,14] },
    ],
  },
  'fly-tipping': {
    topic: 'Fly Tipping',
    slug: 'fly-tipping',
    href: '/fly-tipping',
    colour: '#2A9D8F',
    metrics: [
      { label: 'Fly Tipping', value: 'See data', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Tracking fly tipping nationally', sparklineData: [10,10,11,11,12,12,13,13,14] },
    ],
  },
  'food-bank-growth': {
    topic: 'Food Bank Growth',
    slug: 'food-bank-growth',
    href: '/food-bank-growth',
    colour: '#F4A261',
    metrics: [
      { label: 'Food Bank Growth', value: 'See data', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Tracking food bank growth nationally', sparklineData: [10,10,11,11,12,12,13,13,14] },
    ],
  },
  'greenhouse-gas-emissions': {
    topic: 'Greenhouse Gas Emissions',
    slug: 'greenhouse-gas-emissions',
    href: '/greenhouse-gas-emissions',
    colour: '#2A9D8F',
    metrics: [
      { label: 'Greenhouse Gas Emissions', value: 'See data', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Tracking greenhouse gas emissions nationally', sparklineData: [10,10,11,11,12,12,13,13,14] },
    ],
  },
  'household-inflation': {
    topic: 'Household Inflation',
    slug: 'household-inflation',
    href: '/household-inflation',
    colour: '#F4A261',
    metrics: [
      { label: 'Household Inflation', value: 'See data', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Tracking household inflation nationally', sparklineData: [10,10,11,11,12,12,13,13,14] },
    ],
  },
  'loneliness-statistics': {
    topic: 'Loneliness Statistics',
    slug: 'loneliness-statistics',
    href: '/loneliness-statistics',
    colour: '#2A9D8F',
    metrics: [
      { label: 'Loneliness Statistics', value: 'See data', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Tracking loneliness statistics nationally', sparklineData: [10,10,11,11,12,12,13,13,14] },
    ],
  },
  'online-fraud-growth': {
    topic: 'Online Fraud Growth',
    slug: 'online-fraud-growth',
    href: '/online-fraud-growth',
    colour: '#6B7280',
    metrics: [
      { label: 'Online Fraud Growth', value: 'See data', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Tracking online fraud growth nationally', sparklineData: [10,10,11,11,12,12,13,13,14] },
    ],
  },
  'personal-wellbeing': {
    topic: 'Personal Wellbeing',
    slug: 'personal-wellbeing',
    href: '/personal-wellbeing',
    colour: '#2A9D8F',
    metrics: [
      { label: 'Personal Wellbeing', value: 'See data', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Tracking personal wellbeing nationally', sparklineData: [10,10,11,11,12,12,13,13,14] },
    ],
  },
  'rail-performance': {
    topic: 'Rail Performance',
    slug: 'rail-performance',
    href: '/rail-performance',
    colour: '#264653',
    metrics: [
      { label: 'Rail Performance', value: 'See data', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Tracking rail performance nationally', sparklineData: [10,10,11,11,12,12,13,13,14] },
    ],
  },
  'recycling-rates': {
    topic: 'Recycling Rates',
    slug: 'recycling-rates',
    href: '/recycling-rates',
    colour: '#2A9D8F',
    metrics: [
      { label: 'Recycling Rates', value: 'See data', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Tracking recycling rates nationally', sparklineData: [10,10,11,11,12,12,13,13,14] },
    ],
  },
  'regional-gdp': {
    topic: 'Regional Gdp',
    slug: 'regional-gdp',
    href: '/regional-gdp',
    colour: '#6B7280',
    metrics: [
      { label: 'Regional Gdp', value: 'See data', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Tracking regional gdp nationally', sparklineData: [10,10,11,11,12,12,13,13,14] },
    ],
  },
  'road-conditions': {
    topic: 'Road Conditions',
    slug: 'road-conditions',
    href: '/road-conditions',
    colour: '#264653',
    metrics: [
      { label: 'Road Conditions', value: 'See data', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Tracking road conditions nationally', sparklineData: [10,10,11,11,12,12,13,13,14] },
    ],
  },
  'small-boats': {
    topic: 'Small Boats',
    slug: 'small-boats',
    href: '/small-boats',
    colour: '#6B7280',
    metrics: [
      { label: 'Small Boats', value: 'See data', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Tracking small boats nationally', sparklineData: [10,10,11,11,12,12,13,13,14] },
    ],
  },
  'trust-in-government': {
    topic: 'Trust In Government',
    slug: 'trust-in-government',
    href: '/trust-in-government',
    colour: '#6B7280',
    metrics: [
      { label: 'Trust In Government', value: 'See data', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Tracking trust in government nationally', sparklineData: [10,10,11,11,12,12,13,13,14] },
    ],
  },
  'universal-credit-stats': {
    topic: 'Universal Credit Stats',
    slug: 'universal-credit-stats',
    href: '/universal-credit-stats',
    colour: '#F4A261',
    metrics: [
      { label: 'Universal Credit Stats', value: 'See data', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Tracking universal credit stats nationally', sparklineData: [10,10,11,11,12,12,13,13,14] },
    ],
  },
  'wealth-gini': {
    topic: 'Wealth Gini',
    slug: 'wealth-gini',
    href: '/wealth-gini',
    colour: '#F4A261',
    metrics: [
      { label: 'Wealth Gini', value: 'See data', unit: '', direction: 'up' as const, polarity: 'up-is-bad' as const, context: 'Tracking wealth gini nationally', sparklineData: [10,10,11,11,12,12,13,13,14] },
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

// ── Infinite scroll ordering ───────────────────────────────────────────────────

let _topicOrder: string[] | null = null;

export function getOrderedTopicSlugs(): string[] {
  if (_topicOrder) return _topicOrder;
  const seen = new Set<string>();
  const result: string[] = [];
  for (const cat of CATEGORIES) {
    for (const slug of cat.topics) {
      if (!seen.has(slug) && slug in TOPICS) {
        seen.add(slug);
        result.push(slug);
      }
    }
  }
  _topicOrder = result;
  return result;
}

export function getNextTopic(currentSlug: string): TopicEntry | null {
  const order = getOrderedTopicSlugs();
  const idx = order.indexOf(currentSlug);
  if (idx === -1 || idx >= order.length - 1) return null;
  return TOPICS[order[idx + 1]] ?? null;
}

// ── Category-aware navigation ─────────────────────────────────────────────────

/** Get the first category a topic belongs to */
export function getCategoryForTopic(slug: string): Category | null {
  for (const cat of CATEGORIES) {
    if (cat.topics.includes(slug)) return cat;
  }
  return null;
}

/** Get the next topic within the same category (returns null at end of category) */
export function getNextTopicInCategory(currentSlug: string): TopicEntry | null {
  const cat = getCategoryForTopic(currentSlug);
  if (!cat) return null;
  const idx = cat.topics.indexOf(currentSlug);
  if (idx === -1 || idx >= cat.topics.length - 1) return null;
  return TOPICS[cat.topics[idx + 1]] ?? null;
}

/** Get a random topic, excluding the current one */
export function getRandomTopic(excludeSlug?: string): TopicEntry {
  const slugs = getOrderedTopicSlugs().filter(s => s !== excludeSlug);
  const randomSlug = slugs[Math.floor(Math.random() * slugs.length)];
  return TOPICS[randomSlug];
}

/** Get sibling topics in the same category (excluding the current topic) */
export function getSiblingTopics(currentSlug: string, max = 4): TopicEntry[] {
  const cat = getCategoryForTopic(currentSlug);
  if (!cat) return [];
  const siblings = cat.topics
    .filter(s => s !== currentSlug && s in TOPICS)
    .map(s => TOPICS[s]);
  // Deterministic shuffle based on current slug to avoid layout shift on re-renders
  // but still show different topics for different pages
  const seed = currentSlug.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const shuffled = [...siblings].sort((a, b) => {
    const ha = (a.slug.charCodeAt(0) * 31 + seed) % 997;
    const hb = (b.slug.charCodeAt(0) * 31 + seed) % 997;
    return ha - hb;
  });
  return shuffled.slice(0, max);
}
