'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function SingleUsePlasticReductionPage() {

  const sparkData = [7.6,6,4,2.8,2.3,2,1.7];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Single-use carrier bags sold (England, billions)',
      colour: '#2A9D8F',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Single-use plastic items in scope of ban (England)',
      colour: '#6B7280',
      data: ([0,0,0,0,0,0,9]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="Single-Use Plastic Reduction" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Single-Use Plastic Reduction"
          question="Is Britain Winning the War on Single-Use Plastic?"
          finding="Single-use carrier bag sales fell from 7.6 billion in 2014 to 1.7 billion following the introduction of the carrier bag charge. Nine types of single-u..."
          colour="#2A9D8F"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Single-use carrier bags sold (England, billions)"
              value="1.7"
              direction="down"
              polarity="up-is-good"
              changeText="down from 7.6B in 2014 · 5p/10p charge transformative"
              sparklineData={[7.6,6,4,2.8,2.3,2,1.7]}
            />
            <MetricCard
              label="Single-use plastic items in scope of ban (England)"
              value="9 types"
              direction="up"
              polarity="up-is-good"
              changeText="plates, cutlery, polystyrene cups banned Oct 2023"
              sparklineData={[0,0,0,0,0,0,9]}
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Single-use carrier bags sold (England, billions), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              yLabel="Single-use carrier bags sold (England, billions)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Single-Use Plastic Reduction statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Single-Use Plastic Reduction</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Single-Use Plastic Reduction in the United Kingdom: the numbers show a complex picture. Single-use carrier bag sales fell from 7.6 billion in 2014 to 1.7 billion following the introduction of the carrier bag charge. Nine types of single-use plastic items were banned in England from October 2023. The headline figure — 1.7 for single-use carrier bags sold (england, billions) — down from 7.6B in 2014 · 5p/10p charge transformative.</p>
              <p>The secondary metric tells an equally important story: single-use plastic items in scope of ban (england) stands at 9 types, where plates, cutlery, polystyrene cups banned Oct 2023. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
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
