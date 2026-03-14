'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Sun Life', dataset: 'Cost of Dying Report', url: 'https://www.sunlife.co.uk/life-insurance/over-50s-life-insurance/cost-of-dying/', date: '2023' },
  { num: 2, name: 'DWP', dataset: 'Funeral Expenses Payment statistics', url: 'https://www.gov.uk/government/collections/funeral-expenses-payment-statistics', date: '2023' },
  { num: 3, name: 'CMA', dataset: 'Funerals Market Investigation', url: 'https://www.gov.uk/cma-cases/funerals-market-study', date: '2021' },
];

// Average funeral cost (£), selected years 2004–2023
const funeralCost = [1835, 2050, 2400, 2900, 3284, 3590, 3693, 3916, 4056, 4141];
// Funeral Expenses Payment average award (£), 2015–2023
const fepAward = [1268, 1316, 1404, 1498, 1520, 1540, 1568, 1580, 1593];
// Families in funeral poverty (thousands), 2017–2023
const funeralPovertyK = [82, 88, 93, 98, 100, 105, 110];
// Direct cremation market share (%), 2015–2023
const directCremationPct = [1, 2, 4, 7, 11, 16, 20, 22, 24];

const costSeries: Series[] = [
  {
    id: 'funeral-cost',
    label: 'Average funeral cost (£)',
    colour: '#6B7280',
    data: funeralCost.map((v, i) => ({ date: new Date(2004 + i * 2, 5, 1), value: v })),
  },
  {
    id: 'fep-award',
    label: 'Funeral Expenses Payment average award (£)',
    colour: '#2A9D8F',
    data: fepAward.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const povertyTrendSeries: Series[] = [
  {
    id: 'funeral-poverty',
    label: 'Families in funeral poverty (thousands)',
    colour: '#E63946',
    data: funeralPovertyK.map((v, i) => ({ date: new Date(2017 + i, 5, 1), value: v })),
  },
  {
    id: 'direct-cremation',
    label: 'Direct cremation market share (%)',
    colour: '#F4A261',
    data: directCremationPct.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const costAnnotations: Annotation[] = [
  { date: new Date(2019, 5, 1), label: '2019: Child Funeral Charges Act abolishes children\'s fees' },
  { date: new Date(2021, 5, 1), label: '2021: CMA investigation — price transparency rules' },
];

const povertyAnnotations: Annotation[] = [
  { date: new Date(2021, 5, 1), label: '2021: CMA mandates price display at all funeral homes' },
];

export default function FuneralPovertyPage() {
  return (
    <>
      <TopicNav topic="Poverty & Inequality" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Poverty & Inequality"
          question="Can Families Afford to Bury Their Dead?"
          finding="The average UK funeral now costs £4,141 — up 126% since 2004. Around 110,000 families a year cannot afford the cost without financial distress. The government's Funeral Expenses Payment covers less than 40% of average costs."
          colour="#6B7280"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The average cost of a funeral in the UK reached £4,141 in 2023, more than double the £1,835 it cost in 2004 — a 126% rise that substantially outpaced both inflation and wage growth.<Cite nums={[1]} /> Around 110,000 families per year are in funeral poverty: unable to pay without significant financial distress or debt.<Cite nums={[1]} /> The government's Funeral Expenses Payment covers less than 40% of average costs, with an average award of £1,593 and a maximum burial contribution of only £700.<Cite nums={[2]} /> Until 2023, funeral directors were not required to publish their prices; the CMA's 2021 review found bereaved families structurally vulnerable to poor value and hidden charges.<Cite nums={[3]} /> Public health funerals — arranged by councils when families cannot pay — have risen roughly 10% annually since 2010.<Cite nums={[1]} /></p>
            <p>Geographic and cultural variation sharpens the inequality. A burial in London can cost over £8,000 — more than twice the national average — reflecting land costs where burial space is acutely scarce.<Cite nums={[1]} /> Muslim, Jewish, and Sikh families face the full cost of burial with no lower-cost alternative as cremation is not permissible. Direct cremation — no service, ashes returned, cost around £1,500 — has grown from around 1% to over 24% of funerals in a decade, providing a genuine cheaper option that many families adopt under financial pressure rather than choice.<Cite nums={[1]} /> The Child Funeral Charges Act 2019 abolished fees for children's funerals in England and Wales, removing one particularly acute source of financial distress for bereaved parents.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Cost vs Support' },
          { id: 'sec-chart2', label: 'Poverty Trend' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Average UK funeral cost"
              value="£4,141"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up 126% since 2004 · includes fees, burial or cremation"
              sparklineData={funeralCost.slice(-8)}
              source="Sun Life · Cost of Dying Report 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Funeral Expenses Payment (avg)"
              value="£1,593"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="Covers less than 40% of average cost · max £700 for burial"
              sparklineData={fepAward.slice(-8)}
              source="DWP · Funeral Expenses Payment statistics 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Families in funeral poverty"
              value="110k"
              unit="/year"
              direction="up"
              polarity="up-is-bad"
              changeText="Cannot afford funeral without significant financial distress"
              sparklineData={funeralPovertyK.slice(-8)}
              source="Sun Life / SunLife estimate · 2023"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Average funeral cost vs Funeral Expenses Payment, UK, 2004–2023"
              subtitle="Average funeral cost (grey) and DWP Funeral Expenses Payment average award (green). The gap between the two lines is the shortfall families must find themselves."
              series={costSeries}
              annotations={costAnnotations}
              yLabel="Cost (£)"
              source={{ name: 'Sun Life / DWP', dataset: 'Cost of Dying Report / Funeral Expenses Payment statistics', url: 'https://www.gov.uk/government/collections/funeral-expenses-payment-statistics', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Families in funeral poverty and direct cremation growth, 2015–2023"
              subtitle="Estimated families in funeral poverty (red) and direct cremation as share of all funerals (amber). Direct cremation has risen sharply as families seek affordable alternatives."
              series={povertyTrendSeries}
              annotations={povertyAnnotations}
              yLabel="Families (thousands) / Share (%)"
              source={{ name: 'Sun Life / Funeral Planning Authority', dataset: 'Cost of Dying Report / Market research', url: 'https://www.sunlife.co.uk/life-insurance/over-50s-life-insurance/cost-of-dying/', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="CMA price transparency rules and children's funeral fee abolition"
            value="2021"
            unit="CMA rules require all funeral homes to display prices"
            description="The Competition and Markets Authority's 2021 funeral investigation led to mandatory price transparency requirements: all funeral directors in England and Wales must now display their prices clearly online and in branches. This ends the practice of bereaved families being unable to comparison-shop at the worst moment of their lives. The Child Funeral Charges Act 2019 abolished all fees for children's funerals, removing a particular source of financial cruelty. Together, these reforms represent meaningful consumer protection improvement, even as the underlying cost trajectory and the adequacy of the Funeral Expenses Payment remain serious problems."
            source="Source: CMA — Funerals Market Investigation 2021. DWP — Funeral Expenses Payment guidance 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.sunlife.co.uk/life-insurance/over-50s-life-insurance/cost-of-dying/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Sun Life — Cost of Dying Report</a> — Annual survey of funeral costs across the UK. Covers funeral director fees plus disbursements. Retrieved 2024.</p>
            <p><a href="https://www.gov.uk/government/collections/funeral-expenses-payment-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DWP — Funeral Expenses Payment statistics</a> — Quarterly data on claims, awards, and average payment values. Retrieved 2024.</p>
            <p>Funeral poverty estimate of 110,000 families is derived from Sun Life survey data. There is no official government measure of funeral poverty. Cost data is nominal; real-terms increases are higher when adjusted for inflation.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
