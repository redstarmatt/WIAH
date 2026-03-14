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

// High street vacancy rate (%), England, 2010–2024
const vacancyRateValues = [12.0, 14.5, 14.6, 14.1, 13.0, 12.5, 11.8, 11.2, 11.5, 12.4, 14.1, 15.7, 15.5, 16.2, 17.0];

// Bank branches in the UK, 2010–2024
const bankBranchValues = [11500, 11200, 10800, 10200, 9600, 9100, 8500, 7800, 7200, 6500, 5800, 5200, 4700, 4200, 3800];

// Online retail share (% of total retail), 2010–2024
const onlineShareValues = [8.0, 9.5, 11.0, 12.5, 14.0, 15.5, 17.0, 18.5, 19.5, 21.0, 27.5, 26.0, 26.5, 27.0, 27.0];

const series1: Series[] = [
  {
    id: 'vacancy',
    label: 'Shop vacancy rate (%)',
    colour: '#E63946',
    data: vacancyRateValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'bank-branches',
    label: 'Bank branches (UK)',
    colour: '#264653',
    data: bankBranchValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const annotations1: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: COVID-19 lockdowns' },
];

const annotations2: Annotation[] = [
  { date: new Date(2015, 0, 1), label: '2015: Mobile banking adoption accelerates' },
  { date: new Date(2020, 0, 1), label: '2020: COVID-19 lockdowns' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'Local Data Company', dataset: 'Retail and leisure vacancy rate monitor', url: 'https://www.localdatacompany.com/', date: '2024' },
  { num: 2, name: 'Which?', dataset: 'Bank branch closure tracker', url: 'https://www.which.co.uk/money/banking/bank-branch-closures', date: '2024' },
  { num: 3, name: 'ONS', dataset: 'Retail sales index — internet sales share', url: 'https://www.ons.gov.uk/businessindustryandtrade/retailindustry', date: '2024' },
  { num: 4, name: 'British Retail Consortium', dataset: 'Retail monitor — footfall and vacancy', url: 'https://brc.org.uk/retail-monitor/', date: '2024' },
];

export default function HighStreetDeclinePage() {
  return (
    <>
      <TopicNav topic="High Street Decline" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="High Street Decline"
          question="Is the High Street Actually Dead?"
          finding="Roughly 17% of high street shops now stand vacant. Over 6,000 bank branches have closed since 2015. Online retail accounts for 27% of all sales. But the picture is more nuanced than a simple death — some towns are adapting, with independent businesses, hospitality, and services replacing traditional retail."
          colour="#F4A261"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The British high street is in the midst of a structural transformation that began well before COVID-19 but was dramatically accelerated by it. According to the Local Data Company, the average shop vacancy rate across Great Britain reached 17.0% in 2024 — roughly one in six units standing empty.<Cite nums={1} /> In some northern and coastal towns, vacancy rates exceed 30%. The causes are well-documented: the shift to online retail, which now accounts for 27% of all retail sales, up from 8% in 2010; business rates that penalise physical premises; out-of-town retail parks that draw footfall; and the cost-of-living pressures that have reduced discretionary spending.<Cite nums={3} /> The BRC reports that total high street footfall in 2024 remained 12% below pre-pandemic levels.<Cite nums={4} /></p>
            <p>The loss of bank branches has compounded the decline. Which? reports that over 6,000 branches have closed since 2015, with major banks citing the shift to digital banking.<Cite nums={2} /> For elderly customers, small businesses that handle cash, and communities without reliable broadband, the closures remove essential infrastructure. Sixty-two local authority areas now have no bank branch at all. The FCA&apos;s new &quot;access to cash&quot; rules, requiring banks to assess the impact of closures, have slowed but not reversed the trend.<Cite nums={2} /> Amid this, there are signs of adaptation: the share of high street units occupied by hospitality, leisure, and service businesses has risen from 32% to 44% since 2015, and independent business openings have outpaced chain store openings for three consecutive years.<Cite nums={1} /> The high street is not dead — but it is becoming something fundamentally different from what it was.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Vacancy rate' },
          { id: 'sec-chart2', label: 'Bank branches' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="High street shop vacancy rate"
              value="17.0%"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 12% in 2010 · one in six shops empty"
              sparklineData={vacancyRateValues.slice(-8)}
              source="Local Data Company — Vacancy rate monitor 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Bank branches closed since 2015"
              value="6,000+"
              unit="UK"
              direction="up"
              polarity="up-is-bad"
              changeText="from ~9,100 to ~3,800 · 62 areas with no branch"
              sparklineData={bankBranchValues.slice(-8)}
              source="Which? — Bank branch closure tracker 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Online share of retail sales"
              value="27%"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 8% in 2010 · peaked at 37% in lockdown"
              sparklineData={onlineShareValues.slice(-8)}
              source="ONS — Retail sales index 2024"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="High street shop vacancy rate, Great Britain, 2010–2024"
              subtitle="Percentage of retail units vacant. Vacancy fell from a post-recession peak in 2012 before rising again sharply during and after the pandemic."
              series={series1}
              annotations={annotations1}
              yLabel="Vacancy rate (%)"
              source={{ name: 'Local Data Company', dataset: 'Retail and leisure vacancy rate monitor', url: 'https://www.localdatacompany.com/', frequency: 'biannual', date: 'Sep 2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Number of bank branches, UK, 2010–2024"
              subtitle="Total branches operated by major UK retail banks. Closures have accelerated since 2015 as mobile banking adoption grew. Over 5,300 branches closed since 2015."
              series={series2}
              annotations={annotations2}
              yLabel="Bank branches"
              source={{ name: 'Which?', dataset: 'Bank branch closure tracker', url: 'https://www.which.co.uk/money/banking/bank-branch-closures', frequency: 'monthly', date: 'Dec 2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Independents are filling the gaps"
            value="3 years"
            unit="of independent openings outpacing chains"
            description="For three consecutive years (2022–2024), independent business openings on the high street have outpaced chain store openings. The Local Data Company found that independent coffee shops, restaurants, barbers, gyms, and service businesses are occupying former retail units. Several towns — including Altrincham, Hebden Bridge, and Margate — have become case studies in high street reinvention, with curated markets, independent retail, and experience-led businesses attracting footfall that pure retail no longer can. The high street may not return to its 2005 form, but it is not simply emptying out."
            source="Source: Local Data Company — Independent business tracker 2024. High Streets Task Force case studies."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.localdatacompany.com/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Local Data Company — Vacancy rate monitor</a> — biannual survey of retail and leisure units across Great Britain, covering approximately 5,000 town centres and retail locations.</p>
            <p><a href="https://www.which.co.uk/money/banking/bank-branch-closures" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Which? — Bank branch closure tracker</a> — comprehensive database of UK bank branch closures, updated monthly, with granular data by bank and location.</p>
            <p><a href="https://www.ons.gov.uk/businessindustryandtrade/retailindustry" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Retail sales index</a> — monthly data on retail sales volumes and values, including internet sales as a proportion of total retail.</p>
            <p><a href="https://brc.org.uk/retail-monitor/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">British Retail Consortium — Retail monitor</a> — monthly data on footfall, sales, and vacancy rates.</p>
            <p>Vacancy rate figures are for Great Britain (England, Scotland, Wales). Bank branch figures are for the UK. Online retail share is the ONS &quot;internet sales as a percentage of total retail sales&quot; measure, seasonally adjusted.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
