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

const editorialRefs: Reference[] = [
  { num: 1, name: 'Defra', dataset: 'Local authority collected waste management statistics, England', url: 'https://www.gov.uk/government/statistical-data-sets/env18-local-authority-collected-waste-headline-results', date: '2024' },
  { num: 2, name: 'Eurostat', dataset: 'Municipal waste statistics', url: 'https://ec.europa.eu/eurostat/web/waste/key-waste-stream/municipal-waste', date: '2024' },
  { num: 3, name: 'Defra', dataset: 'Resources and Waste Strategy / Environment Act 2021', date: '2021' },
];

export default function RecyclingRatesPage() {
  const englandRate = [40.4, 41.1, 42.0, 43.9, 44.0, 43.9, 44.3, 43.0, 43.5, 43.8, 43.2, 43.1, 43.0, 42.8];
  const germanyRate = [62.0, 62.5, 63.0, 63.5, 64.0, 65.0, 66.0, 66.5, 66.8, 67.0, 67.2, 67.5, 67.0, 67.0];
  const nethRate    = [51.0, 51.5, 52.0, 52.5, 53.0, 53.5, 54.0, 54.5, 55.0, 55.2, 55.5, 55.0, 54.8, 55.0];
  const euAvgRate   = [42.0, 43.0, 44.0, 45.0, 46.0, 46.5, 47.0, 48.0, 48.5, 48.8, 49.0, 49.2, 49.5, 49.8];

  const chart1Series: Series[] = [
    {
      id: 'england-rate',
      label: 'England household recycling rate (%)',
      colour: '#2A9D8F',
      data: englandRate.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const chart2Series: Series[] = [
    {
      id: 'germany',
      label: 'Germany (%)',
      colour: '#2A9D8F',
      data: germanyRate.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'netherlands',
      label: 'Netherlands (%)',
      colour: '#264653',
      data: nethRate.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'eu-avg',
      label: 'EU average (%)',
      colour: '#6B7280',
      data: euAvgRate.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'england-comp',
      label: 'England (%)',
      colour: '#F4A261',
      data: englandRate.slice(5).map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2015, 0, 1), label: '2015: 50% recycling target set for 2020' },
    { date: new Date(2020, 0, 1), label: '2020: Target missed — rate still 43%' },
    { date: new Date(2021, 0, 1), label: '2021: Resources and Waste Strategy' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2021, 0, 1), label: '2021: UK leaves EU recycling framework' },
  ];

  const chart1TargetLine = { value: 65.0, label: 'UK Env Act 2021 target: 65% by 2035' };

  return (
    <>
      <TopicNav topic="Recycling Rates" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Recycling Rates"
          question="Is the UK Actually Recycling?"
          finding="England's household recycling rate has stalled at 43% — below the 50% 2020 target — and the UK falls behind Germany (67%), Netherlands (55%) and most of northern Europe."
          colour="#2A9D8F"
          preposition="in"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-chart1', label: 'England recycling rate' },
          { id: 'sec-chart2', label: 'International comparison' },
        ]} />

        <section id="sec-metrics" className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Household recycling rate England (%)"
              value="43"
              direction="flat"
              polarity="up-is-good"
              changeText="stalled since 2014 · 50% target for 2020 missed · now 65% target by 2035"
              sparklineData={[40, 42, 44, 44, 43, 43, 43]}
              source="DEFRA — Local authority collected waste 2024"
            />
            <MetricCard
              label="Target gap (percentage points)"
              value="22"
              direction="up"
              polarity="up-is-bad"
              changeText="22pp below 65% 2035 target · no improvement in 10 years"
              sparklineData={[25, 23, 21, 21, 22, 22, 22]}
              source="DEFRA — Waste statistics 2024"
            />
            <MetricCard
              label="EU average recycling rate (%)"
              value="50"
              direction="up"
              polarity="up-is-good"
              changeText="EU average now ~50% · England 7pp below EU average"
              sparklineData={[42, 43, 45, 47, 48, 49, 50]}
              source="Eurostat — Municipal waste statistics 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="England household recycling rate 2010–2024 (%)"
              subtitle="Household waste sent for recycling, composting, or reuse as a percentage of all household waste collected. Stalled since 2014 despite successive targets."
              series={chart1Series}
              annotations={chart1Annotations}
              targetLine={chart1TargetLine}
              yLabel="Recycling rate (%)"
              source={{
                name: 'DEFRA',
                dataset: 'Local authority collected waste management statistics, England',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistical-data-sets/env18-local-authority-collected-waste-headline-results',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="UK vs EU recycling rates 2015–2024 (%)"
              subtitle="Household recycling rates for England, Germany, Netherlands, and EU average. England has fallen below the EU average and lags Germany by 24 percentage points."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Recycling rate (%)"
              source={{
                name: 'Eurostat / DEFRA',
                dataset: 'Municipal waste treatment by type — EU and UK comparison',
                frequency: 'annual',
                url: 'https://ec.europa.eu/eurostat/web/waste/key-waste-stream/municipal-waste',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What is coming"
            value="Extended Producer Responsibility and DRS"
            unit="2025–2026"
            description="The Environment Act 2021 introduced extended producer responsibility (EPR) for packaging — requiring manufacturers to fund the cost of recycling the packaging they put on the market from October 2025. A Deposit Return Scheme (DRS) for plastic bottles and cans, which has transformed recycling rates in Scotland, Norway, and Germany, is planned for England from October 2027. Consistent Collections — requiring all councils to collect the same set of recycling materials — should also reduce confusion and contamination. These reforms, if implemented, represent the most significant change to England's recycling system in two decades."
            source="Source: DEFRA — Resources and Waste Strategy 2018; Environment Act 2021; Deposit Return Scheme consultation 2023."
          />
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on recycling rates</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>England's household recycling rate rose rapidly in the early 2000s and reached around 44% by 2014 — then stopped.<Cite nums={1} /> In the decade since, it has fluctuated between 42% and 44% and has made no progress. The 50% recycling target set for 2020 was missed by seven percentage points.<Cite nums={1} /> The current statutory target under the Environment Act 2021 — 65% by 2035 — would require the fastest sustained improvement England has ever achieved.<Cite nums={3} /></p>
              <p>The stagnation reflects a combination of structural and political failures. The collection system is fragmented: different councils collect different materials, meaning residents in adjacent areas face incompatible rules. Contamination rates are high — materials rejected by recyclers because they are mixed with non-recyclable waste represent a significant share of what is collected.<Cite nums={1} /> There has been no consistent national communication campaign since the early 2000s. And crucially, there has been no deposit return scheme — a mechanism that consistently delivers 85-95% return rates for bottles and cans wherever it is used.</p>
              <p>The international comparison is striking. Germany recycles 67% of household waste, using a combination of producer responsibility, deposits, and mandatory waste separation. The Netherlands achieves 55%.<Cite nums={2} /> Even the EU average now exceeds England's rate. The UK's recycling performance was broadly average within the EU before 2014; it has since fallen behind as other countries continued improving while England stalled.<Cite nums={[1, 2]} /></p>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.gov.uk/government/statistical-data-sets/env18-local-authority-collected-waste-headline-results" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DEFRA — Local authority collected waste statistics</a> — England household recycling rate. Annual. Retrieved 2024.</p>
            <p><a href="https://ec.europa.eu/eurostat/web/waste/key-waste-stream/municipal-waste" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Eurostat — Municipal waste statistics</a> — EU and member state recycling rates. Annual. Retrieved 2024.</p>
            <p>England recycling rate: household waste sent for recycling, composting, or reuse as a share of total household waste collected by local authorities. EU figures use Eurostat's municipal waste recycling definition. Germany and Netherlands figures from Eurostat. All rates are for household waste unless otherwise specified.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
