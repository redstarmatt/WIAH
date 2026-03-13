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

// Annual charity closures and government income share (%), 2016–2024
const charitiesClosedData = [5200, 5100, 5100, 5200, 5300, 5800, 5600, 5900, 6200];
const govtIncomeShareData = [34, 35, 35, 36, 37, 37, 37, 37, 37];

// Total voluntary sector income (£bn) and public donations (£bn), 2016–2024
const sectorIncomeData = [48, 50, 52, 53, 55, 54, 58, 61, 64];
const publicDonationsData = [10.3, 10.5, 10.2, 10.3, 10.1, 9.8, 10.6, 11.2, 11.5];

const closureSeries: Series[] = [
  {
    id: 'charitiesClosed',
    label: 'Annual charity closures',
    colour: '#E63946',
    data: charitiesClosedData.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
  },
  {
    id: 'govtIncomeShare',
    label: 'Government income share (% × 100 for scale)',
    colour: '#6B7280',
    data: govtIncomeShareData.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v * 100 })),
  },
];

const incomeSeries: Series[] = [
  {
    id: 'sectorIncome',
    label: 'Total voluntary sector income (£bn)',
    colour: '#264653',
    data: sectorIncomeData.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
  },
  {
    id: 'publicDonations',
    label: 'Public donations (£bn)',
    colour: '#F4A261',
    data: publicDonationsData.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
  },
];

const closureAnnotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: Pandemic increases demand, cuts trading income' },
  { date: new Date(2022, 0, 1), label: '2022: Energy and wage costs surge' },
];

const incomeAnnotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: Emergency government COVID grants boost income' },
  { date: new Date(2022, 0, 1), label: '2022: Inflation erodes real value of grants' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'Charity Commission', dataset: 'Register of Charities', url: 'https://register-of-charities.charitycommission.gov.uk/', date: '2023' },
  { num: 2, name: 'NCVO', dataset: 'UK Civil Society Almanac', url: 'https://www.ncvo.org.uk/facts-and-stats/uk-civil-society-almanac', date: '2024' },
];

export default function CharitySectorFinancesPage() {
  return (
    <>
      <TopicNav topic="Charity Sector Finances" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Civil Society"
          question="Are Charities Filling the Gaps Left by the State?"
          finding="6,200 charities closed in 2023 — up 19% since 2015 — as demand for services soared while costs rose and grant income stagnated. 70% of charities report unmet demand they cannot serve. Government income now accounts for 37% of sector revenue, raising questions about whether charities can advocate independently for those they serve."
          colour="#6B7280"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK voluntary sector faces a simultaneous demand crisis and resource crisis. Local authority budgets have contracted by around 30% in real terms since 2010, shifting responsibility for social care, mental health support, debt advice, and food assistance onto charities operating with smaller grants and less predictable funding. 6,200 charities ceased operations in 2023 — a 19% increase since 2015 — as energy, staff, and premises costs rose sharply while grant income remained flat or fell.<Cite nums={1} /> Government income now accounts for 37% of the sector's total revenue, but this dependency has transformed many charities into contracted public service delivery vehicles, eroding the independence to advocate or innovate beyond what commissioners will fund.<Cite nums={2} /></p>
            <p>The National Council for Voluntary Organisations estimates that 70% of charities report unmet demand — a systematic shortfall most acute in mental health, homelessness, food poverty, and domestic abuse services, precisely the areas where statutory provision has been most comprehensively reduced.<Cite nums={2} /> Smaller, specialist charities are disproportionately affected: donor concentration has shifted public giving toward large, well-known organisations, leaving community-level charities serving specific populations most vulnerable to closure. The total voluntary sector income has grown to approximately £64 billion per year, but public donations represent only £11.5 billion of this — the rest is grants, contracts, and trading income, all of which are harder to sustain through periods of economic pressure and rising costs.<Cite nums={2} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Closures & Dependency' },
          { id: 'sec-chart2', label: 'Sector Income' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Charities closed per year"
              value="6,200"
              unit="2023"
              direction="up"
              polarity="up-is-bad"
              changeText="+19% since 2015 · demand outstripping resources across the sector"
              sparklineData={[5200, 5100, 5100, 5200, 5300, 5800, 5600, 5900, 6200]}
              source="Charity Commission · Register of Charities 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Government income share"
              value="37%"
              unit="of sector income"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 34% in 2016 · threatens charitable independence and advocacy"
              sparklineData={[34, 35, 35, 36, 37, 37, 37, 37, 37]}
              source="NCVO · UK Civil Society Almanac 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Charities with unmet demand"
              value="70%"
              unit="of sector"
              direction="flat"
              polarity="up-is-bad"
              changeText="Cannot serve everyone who needs them · gap left by public sector cuts"
              sparklineData={[65, 66, 67, 68, 69, 70, 70, 70, 70]}
              source="NCVO · State of the Sector 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Charity closures and government income dependency, England & Wales, 2016–2023"
              subtitle="Annual charity closures (red) and government income share of sector revenue scaled ×100 (grey). Closures have risen as costs increased and grant income stagnated, while dependency on government contracts has grown."
              series={closureSeries}
              annotations={closureAnnotations}
              yLabel="Closures / Income share ×100"
              source={{ name: 'Charity Commission / NCVO', dataset: 'Register of Charities / UK Civil Society Almanac', url: 'https://register-of-charities.charitycommission.gov.uk/', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Voluntary sector total income and public donations, UK, 2016–2024"
              subtitle="Total voluntary sector income (£bn, dark) and public donations component (£bn, amber). Sector income has grown but is increasingly from government contracts rather than independent voluntary giving."
              series={incomeSeries}
              annotations={incomeAnnotations}
              yLabel="£ billions"
              source={{ name: 'NCVO', dataset: 'UK Civil Society Almanac', url: 'https://www.ncvo.org.uk/facts-and-stats/uk-civil-society-almanac', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Gift Aid: £1.4 billion annually boosting charitable giving"
            value="£1.4bn"
            unit="Gift Aid reclaimed by charities per year"
            description="Gift Aid — which allows charities to reclaim 25p in the pound on donations from UK taxpayers — adds approximately £1.4 billion per year to the income of charitable organisations, representing one of the most effective government interventions in civil society finance. Uptake has grown to cover 45% of eligible donations. The Dormant Assets Scheme has released £890 million in unclaimed financial assets to social and environmental causes since 2011. The Social Value Act 2012 requires public bodies to consider social, economic, and environmental wellbeing in commissioning decisions — though enforcement and impact have been inconsistent. These mechanisms provide infrastructure for civil society that operates independently of annual government grant decisions."
            source="Source: HMRC — Gift Aid Statistics 2024. Dormant Assets Commission — Annual Report 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://register-of-charities.charitycommission.gov.uk/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Charity Commission for England and Wales — Register of Charities</a> — annual registrations and removals data. Retrieved March 2026.</p>
            <p><a href="https://www.ncvo.org.uk/facts-and-stats/uk-civil-society-almanac" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NCVO — UK Civil Society Almanac</a> — annual financial analysis of the voluntary sector. Retrieved March 2026.</p>
            <p><a href="https://www.gov.uk/guidance/gift-aid-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">HMRC — Gift Aid Statistics</a> — annual Gift Aid repayments by sector. Retrieved March 2026.</p>
            <p className="mt-2">Charity closure figures reflect organisations removed from the Charity Commission register, excluding those removed for administrative reasons. Government income share is NCVO analysis of charity accounts covering grants and contracts from central and local government. Sector income covers England and Wales charities only; UK-wide data from CAF.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
