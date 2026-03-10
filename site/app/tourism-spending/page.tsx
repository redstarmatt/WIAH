'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';

  const sparkData = [25.2,26.3,27,7,20,27,31.1];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Overseas visitor spending in UK (£ billions)',
      colour: '#264653',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'UK domestic tourism spending (£ billions)',
      colour: '#6B7280',
      data: ([76,78,80,52,82,75,73]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];

export default function TourismSpendingPage() {
  return (
    <>
      <TopicNav topic="Tourism Spending" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Tourism Spending"
          question="Is Britain Good at Attracting Tourists?"
          finding="Overseas visitors spent £31.1 billion in the UK in 2023 — recovering towards pre-pandemic levels. UK domestic tourism spending is £73 billion. The sec..."
          colour="#264653"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Overseas visitor spending in UK (£ billions)"
              value="31.1"
              direction="up"
              polarity="up-is-good"
              changeText="recovering to near pre-pandemic levels"
              sparklineData=[25.2,26.3,27,7,20,27,31.1]
            />
            <MetricCard
              label="UK domestic tourism spending (£ billions)"
              value="73"
              direction="flat"
              polarity="up-is-good"
              changeText="stable · staycation boom reversed as outbound travel recovered"
              sparklineData=[76,78,80,52,82,75,73]
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Overseas visitor spending in UK (£ billions), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              yLabel="Overseas visitor spending in UK (£ billions)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Tourism Spending statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Tourism Spending</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Tourism Spending in the United Kingdom: the numbers show a complex picture. Overseas visitors spent £31.1 billion in the UK in 2023 — recovering towards pre-pandemic levels. UK domestic tourism spending is £73 billion. The sector employs 3.1 million people directly and indirectly. The headline figure — 31.1 for overseas visitor spending in uk (£ billions) — recovering to near pre-pandemic levels.</p>
              <p>The secondary metric tells an equally important story: uk domestic tourism spending (£ billions) stands at 73, where stable · staycation boom reversed as outbound travel recovered. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
            </div>
          </section>
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p>Data is sourced from official UK government statistics including ONS, NHS England, Home Office, DfE and devolved equivalents. All figures are for England unless otherwise stated. Trend data uses the most recent available release at time of publication. See individual metric sources for full methodology notes.</p>
          </div>
        </section>
      </main>
    </>
  );
}
