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

// Regulated rail fare index vs average earnings index (2010 = 100), 2010–2024
const fareIndexValues = [100, 106, 112, 118, 122, 126, 128, 131, 135, 138, 140, 148, 155, 162, 170];
const earningsIndexValues = [100, 102, 104, 106, 107, 110, 113, 116, 120, 124, 125, 130, 136, 143, 149];

// Average annual season ticket cost (£), 2010–2024 — ORR / DfT
const seasonTicketValues = [2150, 2280, 2410, 2540, 2620, 2710, 2760, 2840, 2930, 3010, 3050, 3150, 3250, 3380, 3500];

const series1: Series[] = [
  {
    id: 'fare-index',
    label: 'Regulated fare index (2010=100)',
    colour: '#E63946',
    data: fareIndexValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
  {
    id: 'earnings-index',
    label: 'Average earnings index (2010=100)',
    colour: '#2A9D8F',
    data: earningsIndexValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'season-ticket',
    label: 'Average annual season ticket (£)',
    colour: '#F4A261',
    data: seasonTicketValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: Pandemic — ridership collapses' },
  { date: new Date(2022, 6, 1), label: '2022: Rail strikes begin' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'ORR', dataset: 'Rail Fares Statistics', url: 'https://dataportal.orr.gov.uk/statistics/usage/rail-fares/', date: '2024' },
  { num: 2, name: 'DfT', dataset: 'Rail Factsheet', url: 'https://www.gov.uk/government/statistics/rail-factsheet', date: '2024' },
  { num: 3, name: 'TUC', dataset: 'Analysis of Commuter Costs', url: 'https://www.tuc.org.uk/research-analysis', date: '2024' },
];

export default function RailwayFaresPage() {
  return (
    <>
      <TopicNav topic="Railway Fares" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Railway Fares"
          question="Why Does the Train Cost So Much?"
          finding="UK rail fares are among the highest in Europe. Regulated fares have risen 70% since 2010 while wages grew just 49%. The average commuter now spends 14% of their salary getting to work by train."
          colour="#F4A261"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Rail fares in the UK have outpaced wages for over a decade. Since 2010, regulated fares — the tickets whose annual increase is set by government formula — have risen by approximately 70%, while average earnings have grown by just 49% over the same period.<Cite nums={1} /> The average annual season ticket now costs £3,500, and on the most expensive commuter routes into London, costs can exceed £5,000 per year.<Cite nums={2} /> The TUC estimates that the average rail commuter spends 14% of their net salary on fares, compared with around 3% in France and 2% in Germany, making UK commuters among the most financially penalised in Europe.<Cite nums={3} /></p>
            <p>The post-pandemic landscape has complicated matters further. Season ticket sales have never recovered — flexible and hybrid working means fewer commuters travel five days a week — yet the fares system has been slow to adapt. Flexible season tickets, introduced in 2021, offer modest savings for part-week commuters but remain poor value for many routes.<Cite nums={1} /> Meanwhile, the government continues to subsidise the railway to the tune of approximately £10 billion per year, up from £4 billion before COVID-19. Passengers paying record fares might reasonably ask what that subsidy buys: punctuality remains poor, with only 65% of trains arriving within one minute of schedule on average, overcrowding on peak services is routine, and promised investment in northern lines has been repeatedly scaled back or cancelled.<Cite nums={2} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Fares vs wages' },
          { id: 'sec-chart2', label: 'Season ticket trend' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Average annual season ticket"
              value="£3,500"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="up from £2,150 in 2010 · London routes exceed £5,000"
              sparklineData={seasonTicketValues.slice(-8)}
              source="ORR — Rail Fares Statistics 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Fare increase since 2010 (real terms)"
              value="+14%"
              unit="above inflation"
              direction="up"
              polarity="up-is-bad"
              changeText="fares up 70% nominal vs 49% wage growth"
              sparklineData={fareIndexValues.slice(-8).map((v, i) => v - earningsIndexValues.slice(-8)[i])}
              source="ORR — Rail Fares Index 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Share of salary on rail commute"
              value="14%"
              unit="UK average"
              direction="up"
              polarity="up-is-bad"
              changeText="vs 3% France · 2% Germany · highest in Europe"
              sparklineData={[10, 11, 11.5, 12, 12.5, 13, 13.5, 14]}
              source="TUC — Commuter Cost Analysis 2024"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Regulated rail fare increases vs wage growth, 2010–2024"
              subtitle="Both indexed to 100 in 2010. Rail fares (red) have consistently outpaced average earnings (green), with the gap accelerating since 2021."
              series={series1}
              annotations={annotations}
              yLabel="Index (2010 = 100)"
              source={{ name: 'ORR / ONS', dataset: 'Rail Fares Index / Average Weekly Earnings', url: 'https://dataportal.orr.gov.uk/statistics/usage/rail-fares/', frequency: 'annual', date: 'Jan 2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Average annual season ticket cost, 2010–2024"
              subtitle="Typical annual season ticket price across regulated routes in England and Wales. Costs have risen 63% in fourteen years."
              series={series2}
              annotations={annotations}
              yLabel="Annual cost (£)"
              source={{ name: 'DfT', dataset: 'Rail Factsheet — Fares and Revenue', url: 'https://www.gov.uk/government/statistics/rail-factsheet', frequency: 'annual', date: 'Dec 2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="PAYG contactless: technology lowering the barrier"
            value="£500m"
            unit="saved by London commuters annually"
            description="The extension of pay-as-you-go contactless payment across the London rail network and beyond has eliminated the upfront cost barrier of season tickets and automatically caps daily and weekly fares. TfL estimates that contactless users save an average of 7% compared with traditional ticketing, and the system has been extended to cover journeys as far as Gatwick, Reading and Swindon. The success of PAYG demonstrates that modernising the ticketing system can deliver genuine savings — but it remains largely limited to London and the South East, with the rest of England still reliant on paper tickets and outdated fare structures."
            source="Source: Transport for London — Contactless Payment Report 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://dataportal.orr.gov.uk/statistics/usage/rail-fares/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ORR — Rail Fares Statistics</a> — primary source for fare indices and revenue data. Published annually by the Office of Rail and Road.</p>
            <p><a href="https://www.gov.uk/government/statistics/rail-factsheet" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfT — Rail Factsheet</a> — Department for Transport annual statistical summary covering fares, usage, performance and subsidy.</p>
            <p><a href="https://www.tuc.org.uk/research-analysis" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">TUC — Commuter Cost Analysis</a> — annual analysis comparing UK rail commuting costs as a percentage of salary with European comparators.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
