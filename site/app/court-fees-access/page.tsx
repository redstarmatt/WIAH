'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

// Civil court fee income £M, 2015–2024 (HMCTS)
const feeIncomeValues = [520, 570, 610, 650, 690, 700, 640, 680, 730, 780];

// Civil claims issued (millions), 2010–2024
const claimsValues = [2.2, 2.1, 1.9, 1.8, 1.7, 1.7, 1.6, 1.6, 1.5, 1.4, 1.4, 1.3, 1.3, 1.3, 1.3];

// Fee remissions granted (thousands), 2015–2024
const remissionsValues = [480, 500, 520, 540, 560, 580, 540, 570, 590, 600];

const series1: Series[] = [
  {
    id: 'feeIncome',
    label: 'Civil court fee income (£ millions)',
    colour: '#6B7280',
    data: feeIncomeValues.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'claims',
    label: 'Civil claims issued (millions)',
    colour: '#6B7280',
    data: claimsValues.map((v, i) => ({ date: new Date(2010 + i, 5, 1), value: v })),
  },
  {
    id: 'remissions',
    label: 'Fee remissions granted (hundreds of thousands)',
    colour: '#2A9D8F',
    data: remissionsValues.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v / 100 })),
  },
];

const annotations1: Annotation[] = [
  { date: new Date(2015, 5, 1), label: '2015: Employment tribunal fees ruled unlawful' },
  { date: new Date(2017, 5, 1), label: '2017: SC ruling — tribunal fees abolished' },
  { date: new Date(2022, 5, 1), label: '2022: Online civil money claims expanded' },
];

const annotations2: Annotation[] = [
  { date: new Date(2013, 5, 1), label: '2013: Fee increases — claims begin falling' },
  { date: new Date(2020, 5, 1), label: '2020: COVID-19 court closures' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'HMCTS', dataset: 'Annual Report and Accounts', url: 'https://www.gov.uk/government/organisations/hm-courts-and-tribunals-service', date: '2024' },
  { num: 2, name: 'HMCTS', dataset: 'Court Statistics Quarterly', url: 'https://www.gov.uk/government/collections/court-statistics-quarterly', date: '2024' },
  { num: 3, name: 'Supreme Court', dataset: 'R (UNISON) v Lord Chancellor [2017] UKSC 51', date: '2017' },
];

export default function CourtFeesAccessPage() {
  return (
    <>
      <TopicNav topic="Court Fee Barriers" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Justice"
          question="Has Justice Become Unaffordable?"
          finding="Court fee income reached £780 million in 2023/24, with some civil court fees over £10,000. Civil claims issued have fallen 40% since 2010. Fee remissions protect the poorest, but middle-income earners are priced out."
          colour="#6B7280"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>HMCTS is expected to be financially sustainable through fee recovery — a policy that has fundamentally reshaped who can access civil justice.<Cite nums={1} /> Fees for high-value claims exceed £10,000 at issue alone, and multiple hearing fees can add substantially to that. Employment tribunal fees — introduced in 2013 and struck down by the Supreme Court in 2017 as an unlawful restriction on access to justice — caused a 70% collapse in claims during their four-year existence.<Cite nums={3} /> Civil claims issued annually have fallen from 2.2 million in 2010 to 1.3 million in 2024 — a 40% decline against a backdrop of population growth and rising disputes.<Cite nums={2} /></p>
            <p>Legal aid reforms under LASPO 2012 simultaneously removed eligibility for most civil legal advice, meaning many people face court costs without representation. The Help with Fees scheme (EX160) provides remissions for those on qualifying benefits or low incomes, with 600,000 remissions granted in 2024.<Cite nums={2} /> But the income thresholds have not been uprated with inflation, and the majority of working people who cannot afford court fees do not qualify for help. The justice gap is widest for employment, housing, family, and debt disputes affecting working and middle-income households — the groups who are too rich for legal aid and too poor for solicitors.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Fee Income' },
          { id: 'sec-chart2', label: 'Claims & Remissions' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Civil court fee income"
              value="£780M"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="2023/24 · courts as revenue generators not public services"
              sparklineData={[570, 610, 650, 690, 700, 640, 680, 730, 780]}
              source="HMCTS — Annual Report and Accounts 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Civil claims issued annually"
              value="1.3M"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="down 40% from 2.2M in 2010 · fee hikes suppressing access"
              sparklineData={[1.9, 1.8, 1.7, 1.7, 1.6, 1.6, 1.5, 1.4, 1.3]}
              source="HMCTS — Court Statistics Quarterly 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Fee remissions granted"
              value="600,000"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="qualifying low-income claimants · middle income excluded"
              sparklineData={[480, 500, 520, 540, 560, 580, 540, 570, 600]}
              source="HMCTS — Fee Remissions Statistics 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Civil court fee income, England and Wales, 2015–2024"
              subtitle="Annual fee income collected by HM Courts and Tribunals Service from civil proceedings (£ millions). Fees have increased every year except 2020, when COVID-19 court closures briefly reduced income."
              series={series1}
              annotations={annotations1}
              yLabel="£ millions"
              source={{ name: 'HMCTS', dataset: 'Annual Report and Accounts', url: 'https://www.gov.uk/government/organisations/hm-courts-and-tribunals-service', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Civil claims issued and fee remissions granted, 2010–2024"
              subtitle="Civil claims issued per year (millions) and Help with Fees remissions granted (hundreds of thousands). Claims fell steeply after 2013 fee increases. Remissions protect the very poorest but thresholds have not kept pace with inflation."
              series={series2}
              annotations={annotations2}
              yLabel="Claims (M) / Remissions (hundreds of thousands)"
              source={{ name: 'HMCTS', dataset: 'Court Statistics Quarterly and Fee Remissions', url: 'https://www.gov.uk/government/collections/court-statistics-quarterly', frequency: 'quarterly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Online courts expanding digital access"
            value="Online Civil Money Claims"
            unit="expanded 2022"
            description="The Online Civil Money Claims service has made lower-value claims accessible digitally without requiring court attendance. The Access to Justice Foundation funds civil legal aid for those falling between fee remission thresholds and legal aid eligibility. The Law Society and Bar Council have called for fee thresholds to be index-linked to prevent further erosion of access. The Civil Justice Council reviewed the fee structure in 2025."
            source="Source: HMCTS — Online Civil Money Claims statistics 2024. Access to Justice Foundation — Annual report 2023."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/organisations/hm-courts-and-tribunals-service" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">HMCTS — Annual Report and Accounts</a> — fee income data. Retrieved 2024.</p>
            <p><a href="https://www.gov.uk/government/collections/court-statistics-quarterly" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">HMCTS — Court Statistics Quarterly</a> — civil claims issued and fee remissions granted. Quarterly. Retrieved 2024.</p>
            <p>Fee income figures are for England and Wales. Claims data excludes claims issued online via Money Claim Online prior to 2012. Fee remissions (Help with Fees scheme, EX160) are for civil proceedings; separate provisions apply in family and criminal courts. Employment tribunal statistics are separate.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
