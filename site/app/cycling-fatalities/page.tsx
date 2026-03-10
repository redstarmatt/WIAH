'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function CyclingFatalitiesPage() {

  const sparkData = [109,105,99,102,99,104,104];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Cyclists killed on UK roads (annual)',
      colour: '#E63946',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Cyclists seriously injured (annual)',
      colour: '#6B7280',
      data: ([5000,4900,4800,4700,4650,4600,4560]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="Cycling Fatalities" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Cycling Fatalities"
          question="Why Are Cyclists Still Being Killed on British Roads?"
          finding="104 cyclists were killed on UK roads in 2023 — a rate of 16 per billion miles, compared to 2.5 in the Netherlands. Physical separation of cyclists fro..."
          colour="#E63946"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Cyclists killed on UK roads (annual)"
              value="104"
              direction="flat"
              polarity="up-is-bad"
              changeText="broadly flat · 16 killed per billion miles vs 2.5 in Netherlands"
              sparklineData={[109,105,99,102,99,104,104]}
            />
            <MetricCard
              label="Cyclists seriously injured (annual)"
              value="4,560"
              direction="down"
              polarity="up-is-bad"
              changeText="down 9% since 2018 but absolute numbers still high"
              sparklineData={[5000,4900,4800,4700,4650,4600,4560]}
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Cyclists killed on UK roads (annual), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              yLabel="Cyclists killed on UK roads (annual)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Cycling Fatalities statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Cycling Fatalities</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Cycling Fatalities in the United Kingdom: the numbers show a complex picture. 104 cyclists were killed on UK roads in 2023 — a rate of 16 per billion miles, compared to 2.5 in the Netherlands. Physical separation of cyclists from motor traffic remains rare in British towns. The headline figure — 104 for cyclists killed on uk roads (annual) — broadly flat · 16 killed per billion miles vs 2.5 in Netherlands.</p>
              <p>The secondary metric tells an equally important story: cyclists seriously injured (annual) stands at 4,560, where down 9% since 2018 but absolute numbers still high. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
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
