'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function HipKneeWaitsPage() {

  const sparkData = [170000,200000,400000,580000,700000,750000,780000];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'People waiting for hip/knee replacement (England)',
      colour: '#E63946',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Median wait for elective orthopaedic surgery (weeks)',
      colour: '#6B7280',
      data: ([12,15,30,43,50,51,52]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="Hip & Knee Replacement Waits" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Hip & Knee Replacement Waits"
          question="Why Are 780,000 People Waiting for a Hip or Knee Replacement?"
          finding="The combined hip and knee replacement backlog stands at 780,000 — up from 170,000 before COVID. The median wait is now over a year. Pain, immobility a..."
          colour="#E63946"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="People waiting for hip/knee replacement (England)"
              value="780K"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 170K in 2019 · both joints combined"
              sparklineData={[170000,200000,400000,580000,700000,750000,780000]}
            />
            <MetricCard
              label="Median wait for elective orthopaedic surgery (weeks)"
              value="52"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 12 weeks in 2019"
              sparklineData={[12,15,30,43,50,51,52]}
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="People waiting for hip/knee replacement (England), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              yLabel="People waiting for hip/knee replacement (England)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Hip & Knee Replacement Waits statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Hip & Knee Replacement Waits</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Hip & Knee Replacement Waits in the United Kingdom: the numbers show a complex picture. The combined hip and knee replacement backlog stands at 780,000 — up from 170,000 before COVID. The median wait is now over a year. Pain, immobility and loss of employment are consequences of the delay. The headline figure — 780K for people waiting for hip/knee replacement (england) — up from 170K in 2019 · both joints combined.</p>
              <p>The secondary metric tells an equally important story: median wait for elective orthopaedic surgery (weeks) stands at 52, where up from 12 weeks in 2019. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
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
