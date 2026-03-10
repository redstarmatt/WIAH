'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';

  const sparkData = [1730,1710,1685,1584,1472,1695,1695];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Road deaths (UK, annual)',
      colour: '#E63946',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Serious injuries in road collisions (UK, annual)',
      colour: '#6B7280',
      data: ([34000,32000,30000,29000,28700,28700,28700]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];

export default function RoadCasualtiesPage() {
  return (
    <>
      <TopicNav topic="Road Casualties" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Road Casualties"
          question="Are Britain's Roads Becoming More Dangerous?"
          finding="1,695 people were killed on UK roads in 2023 — up from a recent low of 1,472 in 2022, reversing a long-term downward trend. The 20mph limit rollout, d..."
          colour="#E63946"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Road deaths (UK, annual)"
              value="1,695"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 1,472 in 2022 · long decline stalled"
              sparklineData=[1730,1710,1685,1584,1472,1695,1695]
            />
            <MetricCard
              label="Serious injuries in road collisions (UK, annual)"
              value="28,700"
              direction="down"
              polarity="up-is-bad"
              changeText="long-run decline but pace slowing"
              sparklineData=[34000,32000,30000,29000,28700,28700,28700]
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Road deaths (UK, annual), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              yLabel="Road deaths (UK, annual)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Road Casualties statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Road Casualties</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Road Casualties in the United Kingdom: the numbers show a complex picture. 1,695 people were killed on UK roads in 2023 — up from a recent low of 1,472 in 2022, reversing a long-term downward trend. The 20mph limit rollout, drug-driving enforcement and road investment cuts all feature in the contested explanation. The headline figure — 1,695 for road deaths (uk, annual) — up from 1,472 in 2022 · long decline stalled.</p>
              <p>The secondary metric tells an equally important story: serious injuries in road collisions (uk, annual) stands at 28,700, where long-run decline but pace slowing. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
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
