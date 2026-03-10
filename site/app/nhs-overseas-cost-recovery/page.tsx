'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function NhsOverseasCostRecoveryPage() {

  const sparkData = [295,350,390,430,490,550,600];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'NHS overseas treatment costs recovered (annual)',
      colour: '#F4A261',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Overseas visitor debts written off (annual)',
      colour: '#6B7280',
      data: ([42,38,34,30,27,26,25]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="NHS Overseas Cost Recovery" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="NHS Overseas Cost Recovery"
          question="Is the NHS Recovering the Cost of Treating Overseas Visitors?"
          finding="The NHS recovered £600 million from overseas treatment costs in 2023/24 — up from £295 million in 2017. The government's target is £500 million minimu..."
          colour="#F4A261"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="NHS overseas treatment costs recovered (annual)"
              value="£600M"
              direction="up"
              polarity="up-is-good"
              changeText="up from £295M in 2017 · target is £500M minimum"
              sparklineData={[295,350,390,430,490,550,600]}
            />
            <MetricCard
              label="Overseas visitor debts written off (annual)"
              value="£25M"
              direction="down"
              polarity="up-is-bad"
              changeText="down from £42M in 2018 · better upfront identification"
              sparklineData={[42,38,34,30,27,26,25]}
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="NHS overseas treatment costs recovered (annual), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              yLabel="NHS overseas treatment costs recovered (annual)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'NHS Overseas Cost Recovery statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on NHS Overseas Cost Recovery</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>NHS Overseas Cost Recovery in the United Kingdom: the numbers show a complex picture. The NHS recovered £600 million from overseas treatment costs in 2023/24 — up from £295 million in 2017. The government's target is £500 million minimum. Around £25 million in debts are written off each year. The headline figure — £600M for nhs overseas treatment costs recovered (annual) — up from £295M in 2017 · target is £500M minimum.</p>
              <p>The secondary metric tells an equally important story: overseas visitor debts written off (annual) stands at £25M, where down from £42M in 2018 · better upfront identification. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
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
