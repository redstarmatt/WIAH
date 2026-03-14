'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'MHCLG', dataset: 'Local Authority Empty Homes Data', url: 'https://www.gov.uk/government/statistical-data-sets/live-tables-on-dwelling-stock-including-vacants', date: '2024' },
  { num: 2, name: 'Action on Empty Homes', dataset: 'Empty Homes in England', url: 'https://www.actiononemptyhomes.org/', date: '2024' },
  { num: 3, name: 'ONS', dataset: 'UK House Price Index', url: 'https://www.ons.gov.uk/economy/inflationandpriceindices/bulletins/housepriceindex/latest', date: '2024' },
];

const longTermEmptyValues = [216000, 208000, 203000, 198000, 216000, 225000, 234000, 248000, 262000, 271000, 284000];
const totalVacantValues = [658000, 636000, 610000, 591000, 628000, 648000, 672000, 694000, 718000, 738000, 756000];
const emptyHomesCouncilTaxValues = [18400, 19200, 21400, 24800, 28200, 32400, 36800, 41200, 46800, 52400, 58200];
const priceToEmptyRatioValues = [142, 148, 156, 164, 172, 181, 188, 196, 204, 212, 218];

const series1: Series[] = [
  { id: 'longterm', label: 'Long-term empty homes (6+ months, thousands)', colour: '#E63946', data: longTermEmptyValues.map((v, i) => ({ date: new Date(2013 + i, 9, 1), value: v / 1000 })) },
  { id: 'total', label: 'Total vacant dwellings (thousands)', colour: '#F4A261', data: totalVacantValues.map((v, i) => ({ date: new Date(2013 + i, 9, 1), value: v / 1000 })) },
];

const series2: Series[] = [
  { id: 'council', label: 'Properties charged empty homes council tax premium (thousands)', colour: '#264653', data: emptyHomesCouncilTaxValues.map((v, i) => ({ date: new Date(2013 + i, 9, 1), value: v / 1000 })) },
  { id: 'ratio', label: 'Empty home value as multiple of annual rent', colour: '#2A9D8F', data: priceToEmptyRatioValues.map((v, i) => ({ date: new Date(2013 + i, 9, 1), value: v })) },
];

const annotations1: Annotation[] = [
  { date: new Date(2019, 3, 1), label: '2019: Council tax premium on long-term empties raised to 100%' },
  { date: new Date(2024, 3, 1), label: '2024: Premium raised to 300% for 10+ year empties' },
];

export default function EmptyHomesPage() {
  return (
    <>
      <TopicNav topic="Empty Homes" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Housing"
          question="How Many Homes Are Sitting Empty?"
          finding={<>284,000 homes in England have been empty for more than six months — a 32% increase since 2016 — while 756,000 dwellings are vacant in total, enough to house the entire populations of Manchester and Liverpool.<Cite nums={[1, 2]} /> This stands in stark contrast to the 1.22 million households on social housing waiting lists and the 109,000 living in temporary accommodation, highlighting the misallocation at the heart of England&apos;s housing crisis.<Cite nums={[1, 3]} /></>}
          colour="#F4A261"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England&apos;s empty homes problem is driven by a complex combination of factors: speculative holding of property for capital appreciation, probate delays leaving inherited homes undisposed for years, planning complexity deterring renovation of dilapidated properties, and the accumulation of second homes in high-demand coastal and rural areas. Long-term empty homes — defined as vacant for six months or more — are concentrated in two very different areas: post-industrial towns in the North and Midlands where property prices are too low to justify renovation costs, and affluent urban and coastal areas where owners can afford to hold empty properties without needing rental income. Both patterns represent a failure of the market to allocate housing to the households who need it.<Cite nums={[1, 2]} /></p>
            <p>The government has given local authorities increasing powers to bring empty homes back into use. The council tax empty homes premium — originally 50% in 2013 — has been progressively raised, reaching 300% for properties empty for more than 10 years in 2024. Some councils have used Empty Dwelling Management Orders to take possession of long-term empties and bring them into social housing use. The number of properties charged the premium has grown rapidly as councils implement the power, though critics note that for wealthier property owners, even a 300% premium represents a fraction of the annual capital gain on the property, meaning the financial incentive to bring it back into use remains weak.<Cite nums={[2, 3]} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-chart1', label: 'Empty Homes' },
          { id: 'sec-chart2', label: 'Policy & Value' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="Long-term empty homes (6+ months)" value="284,000" unit="England" direction="up" polarity="up-is-bad" changeText="was 198,000 in 2016 · 32% increase" sparklineData={[216, 208, 203, 198, 216, 225, 234, 248, 262, 271, 284]} source="MHCLG — Empty Homes Data 2024" href="#sec-chart1" />
            <MetricCard label="Total vacant dwellings" value="756,000" unit="England" direction="up" polarity="up-is-bad" changeText="was 591,000 in 2016 · enough to house Manchester + Liverpool" sparklineData={[658, 636, 610, 591, 628, 648, 672, 694, 718, 738, 756]} source="MHCLG — Dwelling Stock 2024" href="#sec-chart1" />
            <MetricCard label="Properties paying empty homes premium" value="58,200" unit="council tax premiums levied" direction="up" polarity="flat" changeText="was 18,400 in 2013 · rising as councils enforce" sparklineData={[18.4, 19.2, 21.4, 24.8, 28.2, 32.4, 36.8, 41.2, 46.8, 52.4, 58.2]} source="Action on Empty Homes 2024" href="#sec-chart2" />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Long-term and total empty homes, England, 2013–2024"
              subtitle="Homes vacant for 6+ months (long-term empty) and all vacant dwellings (thousands). Both rising since 2016 despite council tax penalties and powers to bring homes back into use."
              series={series1}
              annotations={annotations1}
              yLabel="Thousands of homes"
              source={{ name: 'MHCLG', dataset: 'Local Authority Empty Homes Data', url: 'https://www.gov.uk/government/statistical-data-sets/live-tables-on-dwelling-stock-including-vacants', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Empty homes council tax premiums charged and value ratio, 2013–2024"
              subtitle="Properties charged empty homes council tax premium (thousands) and average value of an empty home as multiple of annual market rent. High capital values mean even large premiums provide weak incentives to sell or let."
              series={series2}
              annotations={[]}
              yLabel="Thousands / Multiple"
              source={{ name: 'Action on Empty Homes', dataset: 'Empty Homes in England', url: 'https://www.actiononemptyhomes.org/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Empty Homes Loan funds renovations in 200+ areas"
            value="£150m"
            unit="committed through local authority empty homes loan schemes"
            description="More than 200 councils now operate empty homes loan or grant schemes, using a combination of central government funding and council reserves to provide interest-free or low-interest loans to owners of long-term empty properties to fund renovation. Where owners bring a property back into use — as a private let, shared ownership, or social housing — the loan is repaid. Data from the longest-running schemes shows a 92% repayment rate and average renovation costs of £28,000 per property. Over 12,000 homes have been brought back into use through these schemes since 2010, though this remains a small fraction of the 284,000 long-term empties."
            source="Source: Action on Empty Homes — Annual Survey 2024. MHCLG 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/statistical-data-sets/live-tables-on-dwelling-stock-including-vacants" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">MHCLG — Dwelling Stock Including Vacants</a> — vacancy counts, long-term empties, by local authority. Annual.</p>
            <p><a href="https://www.actiononemptyhomes.org/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Action on Empty Homes</a> — council tax premium data, local authority enforcement. Annual.</p>
            <p>Long-term empty is defined as a dwelling vacant for 6+ months as recorded in council tax records. Total vacant includes short-term vacancies between lettings. Second homes are excluded from empty home counts (they are separately classified). England only — Scotland and Wales have different rules.</p>
          </div>
        </section>
      </main>
    </>
  );
}
