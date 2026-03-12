// Public bodies tracked by What is actually happening?

export interface BodyMetric {
  label: string;
  value: string;
  unit?: string;
  trend: 'worse' | 'better' | 'stable';
  context?: string;
}

export interface PublicBody {
  slug: string;
  name: string;
  shortName?: string;
  category: string;
  description: string;
  website: string;
  regulator?: string;
  metrics: BodyMetric[];
  topicSlugs: string[];
}

export const BODIES: PublicBody[] = [
  {
    slug: 'nhs-england',
    name: 'NHS England',
    shortName: 'NHS England',
    category: 'Health',
    description: 'NHS England leads the National Health Service in England, commissioning primary care services and overseeing NHS organisations.',
    website: 'https://www.england.nhs.uk',
    regulator: 'Care Quality Commission',
    metrics: [
      { label: 'Patients waiting 18+ weeks', value: '7.6M', trend: 'worse', context: 'Referral to treatment backlog' },
      { label: 'A&E 4-hour target met', value: '72%', unit: '%', trend: 'worse', context: 'Target: 95%' },
      { label: 'Ambulance Cat 1 mean response', value: '8m 38s', trend: 'worse', context: 'Target: 7 minutes' },
    ],
    topicSlugs: ['health', 'nhs-waiting-lists', 'nhs-ae', 'ambulance-response-times'],
  },
  {
    slug: 'environment-agency',
    name: 'Environment Agency',
    shortName: 'EA',
    category: 'Environment',
    description: 'The Environment Agency regulates and monitors England\'s environment, including water quality, flood risk, and pollution.',
    website: 'https://www.gov.uk/government/organisations/environment-agency',
    regulator: 'Department for Environment, Food & Rural Affairs',
    metrics: [
      { label: 'Sewage discharge hours', value: '3.6M', unit: 'hrs', trend: 'worse', context: '2023 total, up from 2.7M in 2022' },
      { label: 'Rivers in good ecological status', value: '14%', unit: '%', trend: 'worse', context: 'England\'s rivers' },
      { label: 'Bathing waters rated Excellent', value: '57%', unit: '%', trend: 'stable', context: '2023 season' },
    ],
    topicSlugs: ['water', 'bathing-water', 'sewage'],
  },
  {
    slug: 'ofwat',
    name: 'Ofwat',
    shortName: 'Ofwat',
    category: 'Water',
    description: 'Ofwat is the economic regulator for the water and sewerage sector in England and Wales, setting price limits and enforcing licence conditions.',
    website: 'https://www.ofwat.gov.uk',
    metrics: [
      { label: 'Water companies in serious concern', value: '4', trend: 'worse', context: 'Under enhanced monitoring' },
      { label: 'Customer bills average', value: '£448', unit: '/yr', trend: 'worse', context: '2023/24' },
    ],
    topicSlugs: ['water'],
  },
  {
    slug: 'home-office',
    name: 'Home Office',
    shortName: 'Home Office',
    category: 'Crime & Justice',
    description: 'The Home Office is responsible for immigration, security, and policing policy in the United Kingdom.',
    website: 'https://www.gov.uk/government/organisations/home-office',
    metrics: [
      { label: 'Crimes leading to charge', value: '7.3%', unit: '%', trend: 'worse', context: 'Down from 15% in 2015' },
      { label: 'Police officer numbers', value: '147K', trend: 'stable', context: 'England and Wales' },
    ],
    topicSlugs: ['justice', 'policing', 'crime'],
  },
  {
    slug: 'ministry-of-justice',
    name: 'Ministry of Justice',
    shortName: 'MoJ',
    category: 'Crime & Justice',
    description: 'The Ministry of Justice oversees the courts, prisons, probation, and legal aid systems in England and Wales.',
    website: 'https://www.gov.uk/government/organisations/ministry-of-justice',
    metrics: [
      { label: 'Crown Court backlog', value: '67,500', trend: 'worse', context: 'Cases awaiting trial' },
      { label: 'Average wait to Crown Court', value: '18 months', trend: 'worse', context: 'From charge to completion' },
      { label: 'Prison population', value: '88,000', trend: 'worse', context: 'Record high — near capacity' },
    ],
    topicSlugs: ['justice', 'prisons', 'court-backlog'],
  },
  {
    slug: 'department-for-education',
    name: 'Department for Education',
    shortName: 'DfE',
    category: 'Education',
    description: 'The Department for Education oversees education and children\'s social care in England.',
    website: 'https://www.gov.uk/government/organisations/department-for-education',
    metrics: [
      { label: 'Persistent absence rate', value: '20%', unit: '%', trend: 'worse', context: 'Up from 10.5% pre-Covid' },
      { label: 'Attainment gap (FSM vs non-FSM)', value: '18.8', unit: ' pts', trend: 'worse', context: 'Grades 9-4 English & Maths' },
      { label: 'EHC plans awaiting assessment', value: '130K', trend: 'worse', context: 'SEND crisis' },
    ],
    topicSlugs: ['education', 'send-crisis', 'school-absence-trends'],
  },
  {
    slug: 'dluhc',
    name: 'Department for Levelling Up, Housing & Communities',
    shortName: 'DLUHC',
    category: 'Housing',
    description: 'DLUHC is responsible for housing policy, planning, and local government in England.',
    website: 'https://www.gov.uk/government/organisations/department-for-levelling-up-housing-and-communities',
    metrics: [
      { label: 'Households in temporary accommodation', value: '105K', trend: 'worse', context: 'Record high' },
      { label: 'New homes completed', value: '234K', unit: '/yr', trend: 'worse', context: 'Against 300K target' },
      { label: 'House price to earnings ratio', value: '8.3×', trend: 'worse', context: 'National average' },
    ],
    topicSlugs: ['housing', 'homelessness', 'housebuilding'],
  },
  {
    slug: 'ons',
    name: 'Office for National Statistics',
    shortName: 'ONS',
    category: 'Statistics',
    description: 'The ONS is the UK\'s largest independent producer of official statistics and its recognised national statistical institute.',
    website: 'https://www.ons.gov.uk',
    metrics: [
      { label: 'Datasets published', value: '30K+', trend: 'stable', context: 'Open data collections' },
    ],
    topicSlugs: [],
  },
  {
    slug: 'care-quality-commission',
    name: 'Care Quality Commission',
    shortName: 'CQC',
    category: 'Health',
    description: 'The CQC is the independent regulator of health and social care in England.',
    website: 'https://www.cqc.org.uk',
    metrics: [
      { label: 'Care homes rated Inadequate', value: '2%', unit: '%', trend: 'stable', context: 'Of registered providers' },
      { label: 'GP practices rated Good/Outstanding', value: '89%', unit: '%', trend: 'stable', context: 'Most recent inspections' },
    ],
    topicSlugs: ['care-homes', 'social-care'],
  },
  {
    slug: 'ofsted',
    name: 'Ofsted',
    shortName: 'Ofsted',
    category: 'Education',
    description: 'Ofsted inspects and regulates services that care for children and young people, and those providing education and skills in England.',
    website: 'https://www.gov.uk/government/organisations/ofsted',
    metrics: [
      { label: 'Schools rated Good/Outstanding', value: '88%', unit: '%', trend: 'stable', context: 'Most recent inspections' },
    ],
    topicSlugs: ['education'],
  },
];

export const BODY_CATEGORIES = [...new Set(BODIES.map(b => b.category))].sort();

export function getBodyBySlug(slug: string): PublicBody | undefined {
  return BODIES.find(b => b.slug === slug);
}
