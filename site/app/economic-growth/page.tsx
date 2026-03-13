'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// UK annual GDP growth (%), 2010–2023 — ONS
const gdpGrowthValues = [1.9, 1.6, 2.1, 3.0, 2.4, 1.8, 1.9, 1.3, 1.6, -11.0, 8.7, 4.1, 0.1];

// G7 average growth vs UK index (2010–2023 average annualised) — for context as second series
const g7AvgLine = gdpGrowthValues.map(() => 1.3);

const gdpSeries: Series[] = [
  {
    id: 'gdp-growth',
    label: 'UK GDP growth (%)',
    colour: '#E63946',
    data: gdpGrowthValues.map((v, i) => ({ date: new Date(2010 + i, 5, 1), value: v })),
  },
  {
    id: 'g7-avg',
    label: 'G7 average growth (%)',
    colour: '#2A9D8F',
    data: g7AvgLine.map((v, i) => ({ date: new Date(2010 + i, 5, 1), value: v })),
  },
];

// UK GDP level indexed to 2010 = 100
const gdpLevelValues = [100, 102, 104, 107, 109, 111, 113, 115, 117, 105, 114, 119, 119];

const gdpLevelSeries: Series[] = [
  {
    id: 'gdp-level',
    label: 'UK GDP level (2010 = 100)',
    colour: '#264653',
    data: gdpLevelValues.map((v, i) => ({ date: new Date(2010 + i, 5, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2016, 5, 1), label: '2016: Brexit referendum' },
  { date: new Date(2020, 5, 1), label: '2020: COVID-19 pandemic' },
];

export default function EconomicGrowthPage() {
  return (
    <>
      <TopicNav topic="Economy & Work" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy & Work"
          question="Why Has the UK Economy Barely Grown Since 2008?"
          finding="UK GDP growth averaged 1.1% per year since 2010 — near the bottom of the G7. 2023 saw just 0.1% growth. Labour productivity is 20% below Germany's. The UK has underperformed its economic potential for 15 years."
          colour="#E63946"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>UK GDP grew by just 0.1% in 2023, the end of a 15-year sequence of underperformance. Averaging 2010 to 2023, the UK grew at 1.1% per year — sixth out of seven G7 nations, ahead only of Italy — compared to 2.3% for the United States and 2.1% for Canada. The 2020 contraction of 11%, the sharpest in three centuries, was followed by an incomplete rebound. The OBR estimates Brexit has reduced UK trade intensity by around 15%, compounding the structural drag from chronically low business investment. UK capital expenditure as a share of GDP has been below the OECD average for two decades, and output per worker grew more slowly through the 2010s than at almost any point since the Industrial Revolution.</p>
            <p>The costs of stagnation fall unevenly. London's GVA per head sits at 174% of the UK average; the North East manages 67% — a gap that has widened every decade since the 1990s. High-productivity growth in the capital contributes to national GDP figures without generating broad-based income gains. The UK's combination of the lowest capital investment rate in the G7 and extreme regional concentration of economic activity means growth that does occur remains structurally fragile and geographically narrow.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'GDP growth' },
          { id: 'sec-chart2', label: 'GDP level' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="UK GDP growth 2023"
              value="0.1"
              unit="%"
              direction="down"
              polarity="up-is-good"
              changeText="Near-stagnation · only avoided technical recession"
              sparklineData={[1.9, 1.6, 2.1, 3.0, 1.8, 1.3, -11.0, 8.7, 4.1, 0.1]}
              source="ONS · GDP statistical bulletin 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Average growth 2010–2023"
              value="1.1"
              unit="%/yr"
              direction="flat"
              polarity="up-is-good"
              changeText="vs G7 average 1.3% · underperformance widening post-Brexit"
              sparklineData={[1.9, 1.8, 1.5, 1.3, 1.2, 1.1, 1.1, 1.1]}
              source="ONS / IMF World Economic Outlook"
              href="#sec-chart1"
            />
            <MetricCard
              label="UK productivity vs Germany"
              value="-20"
              unit="%"
              direction="flat"
              polarity="up-is-good"
              changeText="Output per hour worked · gap barely narrowed since 2010"
              sparklineData={[82, 81, 81, 80, 80, 80, 80, 80, 80]}
              source="ONS · International Productivity Comparisons"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK annual GDP growth vs G7 average, 2010–2023"
              subtitle="Annual real GDP growth. UK has consistently underperformed the G7 average. 2020 saw the sharpest contraction in three centuries."
              series={gdpSeries}
              annotations={annotations}
              yLabel="Annual GDP growth (%)"
              source={{ name: 'ONS / IMF', dataset: 'GDP statistical bulletin / World Economic Outlook', url: 'https://www.ons.gov.uk/economy/grossdomesticproductgdp/bulletins/grossdomesticproductpreliminaryestimate/latest', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="UK GDP level indexed to 2010, 2010–2023"
              subtitle="2010 = 100. The COVID shock wiped out years of gains; the recovery left the economy on a permanently lower path than pre-pandemic trend."
              series={gdpLevelSeries}
              annotations={[{ date: new Date(2020, 5, 1), label: '2020: Largest peacetime contraction' }]}
              yLabel="GDP level (2010=100)"
              source={{ name: 'ONS', dataset: 'GDP statistical bulletin', url: 'https://www.ons.gov.uk/economy/grossdomesticproductgdp/bulletins/grossdomesticproductpreliminaryestimate/latest', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="2024 growth recovering"
            value="+1.1%"
            description="GDP grew 1.1% in 2024, the strongest performance since 2021. Services sector activity — particularly financial services and professional services — drove the recovery. The OBR's March 2025 forecast projected 1.6% growth in 2025, contingent on continued disinflation and stable global conditions. Business investment showed its first sustained upward trend in several years."
            source="Source: ONS — GDP statistical bulletin 2024. OBR — Economic and Fiscal Outlook, March 2025."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.ons.gov.uk/economy/grossdomesticproductgdp/bulletins/grossdomesticproductpreliminaryestimate/latest" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — GDP statistical bulletin</a> — UK annual GDP growth, chained volume measure.</p>
            <p><a href="https://www.imf.org/en/Publications/WEO" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">IMF — World Economic Outlook</a> — G7 GDP growth comparison and projections.</p>
            <p><a href="https://www.ons.gov.uk/economy/economicoutputandproductivity/productivitymeasures/articles/internationalcomparisonsofproductivityfinalestimates/latest" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — International comparisons of productivity</a> — output per hour worked vs Germany and other G7 nations.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
