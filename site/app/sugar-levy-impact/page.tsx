'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function SugarLevyImpactPage() {

  const sparkData = [100,90,80,72,67,66,65];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Sugar in soft drinks (average reduction since 2016)',
      colour: '#2A9D8F',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Childhood obesity rate (reception age)',
      colour: '#6B7280',
      data: ([9.1,9.2,9.3,9.4,9.3,9.4,9.5]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="Sugar Levy Impact" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Sugar Levy Impact"
          question="Has the Sugar Levy Cut Sugar in Soft Drinks?"
          finding="Sugar content in soft drinks has fallen 35% since the sugar levy baseline, driven largely by reformulation before the levy took effect. But childhood ..."
          colour="#2A9D8F"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Sugar in soft drinks (average reduction since 2016)"
              value="-35%"
              direction="down"
              polarity="up-is-good"
              changeText="reformulation before levy took effect · most impact pre-2018"
              sparklineData={[100,90,80,72,67,66,65]}
            />
            <MetricCard
              label="Childhood obesity rate (reception age)"
              value="9.5%"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 9.1% pre-levy · levy effect outpaced by wider diet trends"
              sparklineData={[9.1,9.2,9.3,9.4,9.3,9.4,9.5]}
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Sugar in soft drinks (average reduction since 2016), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              yLabel="Sugar in soft drinks (average reduction since 2016)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Sugar Levy Impact statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Sugar Levy Impact</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Sugar Levy Impact in the United Kingdom: the numbers show a complex picture. Sugar content in soft drinks has fallen 35% since the sugar levy baseline, driven largely by reformulation before the levy took effect. But childhood obesity at reception age has continued to rise to 9.5%, showing the levy alone cannot reverse diet trends. The headline figure — -35% for sugar in soft drinks (average reduction since 2016) — reformulation before levy took effect · most impact pre-2018.</p>
              <p>The secondary metric tells an equally important story: childhood obesity rate (reception age) stands at 9.5%, where up from 9.1% pre-levy · levy effect outpaced by wider diet trends. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
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
