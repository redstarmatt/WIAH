import Link from 'next/link';
import SiteName from '@/components/SiteName';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Data Sources',
  description: 'Every dataset powering What is actually happening? — government open data, NHS statistics, ONS figures, and more. Every number has a dated, linked source.',
  openGraph: {
    title: 'Data Sources | What is actually happening?',
    description: 'Every dataset powering What is actually happening? — government open data, NHS statistics, ONS figures, and more.',
    url: 'https://whatisactuallyhappening.uk/sources',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/sources',
  },
};

interface Source {
  name: string;
  publisher: string;
  url: string;
  frequency: string;
  topics: string[];
}

const SOURCES: Source[] = [
  {
    name: 'Appointments in General Practice',
    publisher: 'NHS England',
    url: 'https://digital.nhs.uk/data-and-information/publications/statistical/appointments-in-general-practice',
    frequency: 'Monthly',
    topics: ['Health', 'GP access'],
  },
  {
    name: 'GP Patient Survey',
    publisher: 'NHS England',
    url: 'https://www.gp-patient.co.uk/',
    frequency: 'Annual',
    topics: ['Health', 'GP access'],
  },
  {
    name: 'Ambulance Quality Indicators',
    publisher: 'NHS England',
    url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/ambulance-quality-indicators/',
    frequency: 'Monthly',
    topics: ['Health', 'Emergency services'],
  },
  {
    name: 'NHS Referral to Treatment (RTT) Waiting Times',
    publisher: 'NHS England',
    url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/rtt-waiting-times/',
    frequency: 'Monthly',
    topics: ['Health', 'NHS waiting lists'],
  },
  {
    name: 'A&E Attendances and Emergency Admissions',
    publisher: 'NHS England',
    url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/ae-waiting-times-and-activity/',
    frequency: 'Monthly',
    topics: ['Health', 'Emergency care'],
  },
  {
    name: 'General and Personal Medical Services',
    publisher: 'NHS England',
    url: 'https://digital.nhs.uk/data-and-information/publications/statistical/general-and-personal-medical-services',
    frequency: 'Monthly',
    topics: ['Health', 'GP workforce'],
  },
  {
    name: 'House Price Index',
    publisher: 'ONS / HM Land Registry',
    url: 'https://landregistry.data.gov.uk/app/ukhpi',
    frequency: 'Monthly',
    topics: ['Housing', 'Affordability'],
  },
  {
    name: 'Price Paid Data',
    publisher: 'HM Land Registry',
    url: 'https://www.gov.uk/government/statistical-data-sets/price-paid-data-downloads',
    frequency: 'Monthly',
    topics: ['Housing', 'Property sales'],
  },
  {
    name: 'English Housing Survey',
    publisher: 'DLUHC',
    url: 'https://www.gov.uk/collection/english-housing-survey',
    frequency: 'Annual',
    topics: ['Housing', 'Conditions'],
  },
  {
    name: 'Homelessness Statistics',
    publisher: 'DLUHC',
    url: 'https://www.gov.uk/collection/homelessness-statistics',
    frequency: 'Annual',
    topics: ['Housing', 'Homelessness'],
  },
  {
    name: 'Annual Survey of Hours and Earnings (ASHE)',
    publisher: 'ONS',
    url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/bulletins/annualsurveyofhoursandearnings/previousReleases',
    frequency: 'Annual',
    topics: ['Economy', 'Wages'],
  },
  {
    name: 'Labour Force Survey',
    publisher: 'ONS',
    url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/bulletins/uklabourmarket/previousReleases',
    frequency: 'Quarterly',
    topics: ['Economy', 'Employment'],
  },
  {
    name: 'Event Duration Monitoring — Sewage Discharge',
    publisher: 'Environment Agency',
    url: 'https://www.data.gov.uk/dataset/21f5b188-3bd3-4f14-aeae-e5fadf98c3b1/event-duration-monitoring-storm-overflows-annual-returns',
    frequency: 'Annual',
    topics: ['Water', 'Sewage'],
  },
  {
    name: 'Bathing Water Quality',
    publisher: 'Environment Agency',
    url: 'https://environment.data.gov.uk/bwq/profiles/',
    frequency: 'Annual',
    topics: ['Water', 'Quality'],
  },
  {
    name: 'River Basin Management Plans',
    publisher: 'Environment Agency',
    url: 'https://www.gov.uk/government/collections/river-basin-management-plans-2021',
    frequency: 'Annual',
    topics: ['Water', 'Ecology'],
  },
  {
    name: 'Crime Survey for England and Wales',
    publisher: 'ONS',
    url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/bulletins/crimeinenglandandwales/previousReleases',
    frequency: 'Quarterly',
    topics: ['Justice', 'Crime'],
  },
  {
    name: 'Police Recorded Crime',
    publisher: 'Home Office',
    url: 'https://www.gov.uk/government/collections/police-recorded-crime-statistics',
    frequency: 'Quarterly',
    topics: ['Justice', 'Policing'],
  },
  {
    name: 'Crime Outcomes in England and Wales',
    publisher: 'Home Office',
    url: 'https://www.gov.uk/government/collections/crime-outcomes-in-england-and-wales-statistics',
    frequency: 'Annual',
    topics: ['Justice', 'Prosecution rates'],
  },
  {
    name: 'Criminal Court Statistics',
    publisher: 'Ministry of Justice',
    url: 'https://www.gov.uk/government/collections/criminal-court-statistics',
    frequency: 'Quarterly',
    topics: ['Justice', 'Courts'],
  },
  {
    name: 'Key Stage 4 Attainment',
    publisher: 'Department for Education',
    url: 'https://explore-education-statistics.service.gov.uk/find-statistics/key-stage-4-performance',
    frequency: 'Annual',
    topics: ['Education', 'GCSE results'],
  },
  {
    name: 'School Workforce Census',
    publisher: 'Department for Education',
    url: 'https://explore-education-statistics.service.gov.uk/find-statistics/school-workforce-in-england',
    frequency: 'Annual',
    topics: ['Education', 'Teachers'],
  },
  {
    name: 'Special Educational Needs in England',
    publisher: 'Department for Education',
    url: 'https://explore-education-statistics.service.gov.uk/find-statistics/special-educational-needs-in-england',
    frequency: 'Annual',
    topics: ['Education', 'SEND'],
  },
  {
    name: 'Pupil Absence in Schools in England',
    publisher: 'Department for Education',
    url: 'https://explore-education-statistics.service.gov.uk/find-statistics/pupil-absence-in-schools-in-england',
    frequency: 'Annual',
    topics: ['Education', 'Attendance'],
  },
  {
    name: 'Explore Education Statistics',
    publisher: 'Department for Education',
    url: 'https://explore-education-statistics.service.gov.uk/',
    frequency: 'Various',
    topics: ['Education'],
  },
  {
    name: 'Population Estimates',
    publisher: 'ONS',
    url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/populationestimates',
    frequency: 'Annual',
    topics: ['Demographics'],
  },
  {
    name: 'UK National Accounts (GDP)',
    publisher: 'ONS',
    url: 'https://www.ons.gov.uk/economy/grossdomesticproductgdp',
    frequency: 'Quarterly',
    topics: ['Economy', 'GDP'],
  },
  {
    name: 'Consumer Price Inflation',
    publisher: 'ONS',
    url: 'https://www.ons.gov.uk/economy/inflationandpriceindices/bulletins/consumerpriceinflation/previousReleases',
    frequency: 'Monthly',
    topics: ['Economy', 'Inflation'],
  },
  {
    name: 'Ofwat Annual Reports and Accounts',
    publisher: 'Ofwat',
    url: 'https://www.ofwat.gov.uk/publication/ofwat-annual-report-and-accounts/',
    frequency: 'Annual',
    topics: ['Water', 'Regulation'],
  },
  {
    name: 'NHS Mental Health Dashboard',
    publisher: 'NHS England',
    url: 'https://www.england.nhs.uk/mental-health/data/monthly-statistics/',
    frequency: 'Monthly',
    topics: ['Mental health'],
  },
  {
    name: 'Suicide Prevention — Registered Deaths',
    publisher: 'ONS',
    url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/deaths/bulletins/suicidesintheunitedkingdom/previousReleases',
    frequency: 'Annual',
    topics: ['Mental health', 'Public health'],
  },
  {
    name: 'Prison Population Statistics',
    publisher: 'Ministry of Justice',
    url: 'https://www.gov.uk/government/collections/prison-population-statistics',
    frequency: 'Monthly',
    topics: ['Justice', 'Prisons'],
  },
];

const PUBLISHERS = [...new Set(SOURCES.map(s => s.publisher))].sort();

export default function SourcesPage() {
  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-wiah-border px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/"><SiteName size="nav" /></Link>
          <div className="flex items-center gap-4">
            <Link href="/bodies" className="font-mono text-xs text-wiah-mid hover:text-wiah-black transition-colors">Public Bodies</Link>
            <Link href="/" className="text-sm text-wiah-blue hover:underline">← All topics</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <p className="font-mono text-xs text-wiah-mid uppercase tracking-wider mb-3">Transparency</p>
        <h1 className="text-4xl font-extrabold text-wiah-black mb-3">Data Sources</h1>
        <p className="text-base text-wiah-mid leading-[1.7] mb-2 max-w-2xl">
          Every number on this site comes from a named, dated, publicly available source.
          No estimates. No rounding. No agenda. Below is every dataset we use.
        </p>
        <p className="font-mono text-xs text-wiah-mid mb-10">
          {SOURCES.length} datasets · {PUBLISHERS.length} publishers · updated when sources update
        </p>

        {/* Publisher breakdown */}
        <div className="mb-10 p-5 bg-wiah-light rounded border border-wiah-border">
          <p className="font-mono text-xs text-wiah-mid uppercase tracking-wider mb-3">Publishers</p>
          <div className="flex flex-wrap gap-2">
            {PUBLISHERS.map(p => (
              <span key={p} className="font-mono text-xs bg-white border border-wiah-border px-2.5 py-1 rounded text-wiah-black">
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Source list */}
        <div className="space-y-0">
          {SOURCES.map((source, i) => (
            <div
              key={i}
              className="py-5 border-b border-wiah-border flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3"
            >
              <div className="flex-1 min-w-0">
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-wiah-blue hover:underline leading-snug"
                >
                  {source.name}
                </a>
                <p className="font-mono text-xs text-wiah-mid mt-1">{source.publisher}</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {source.topics.map(t => (
                    <span key={t} className="font-mono text-[10px] text-wiah-mid bg-wiah-light border border-wiah-border px-1.5 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <span className="font-mono text-xs text-wiah-mid shrink-0 sm:pt-0.5">{source.frequency}</span>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-lg font-bold text-wiah-black mb-2">Missing a source?</h2>
          <p className="text-sm text-wiah-mid leading-[1.7]">
            If you believe a dataset we use is missing from this list, or if a source link has moved,{' '}
            <Link href="/contact" className="text-wiah-blue hover:underline">let us know</Link>.
          </p>
        </div>
      </main>

      <footer className="border-t border-wiah-border py-5 px-6 mt-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-wiah-mid">
          <SiteName size="nav" />
          <nav className="flex items-center gap-4 font-mono text-xs">
            <Link href="/about" className="hover:text-wiah-black transition-colors">About</Link>
            <Link href="/sources" className="hover:text-wiah-black transition-colors">Sources</Link>
            <Link href="/bodies" className="hover:text-wiah-black transition-colors">Public Bodies</Link>
            <Link href="/privacy" className="hover:text-wiah-black transition-colors">Privacy</Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
