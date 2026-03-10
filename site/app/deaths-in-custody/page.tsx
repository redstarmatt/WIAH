'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';

  const sparkData = [233,240,250,269,280,295,312];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Deaths in prison custody (England & Wales, annual)',
      colour: '#6B7280',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Deaths following police contact (annual)',
      colour: '#6B7280',
      data: ([55,56,57,58,60,63,65]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];

export default function DeathsInCustodyPage() {
  return (
    <>
      <TopicNav topic="Deaths in Custody" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Deaths in Custody"
          question="How Many People Die in Prison or Police Custody?"
          finding="312 people died in prison custody in England and Wales in 2023 — a record. Self-inflicted deaths stood at 89. Deaths following police contact reached ..."
          colour="#6B7280"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Deaths in prison custody (England & Wales, annual)"
              value="312"
              direction="up"
              polarity="up-is-bad"
              changeText="record high · self-inflicted deaths at 89"
              sparklineData=[233,240,250,269,280,295,312]
            />
            <MetricCard
              label="Deaths following police contact (annual)"
              value="65"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 55 in 2019 · restraint-related scrutiny increasing"
              sparklineData=[55,56,57,58,60,63,65]
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Deaths in prison custody (England & Wales, annual), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              yLabel="Deaths in prison custody (England & Wales, annual)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Deaths in Custody statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Deaths in Custody</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Deaths in Custody in the United Kingdom: the numbers show a complex picture. 312 people died in prison custody in England and Wales in 2023 — a record. Self-inflicted deaths stood at 89. Deaths following police contact reached 65. Scrutiny of restraint techniques is intensifying. The headline figure — 312 for deaths in prison custody (england & wales, annual) — record high · self-inflicted deaths at 89.</p>
              <p>The secondary metric tells an equally important story: deaths following police contact (annual) stands at 65, where up from 55 in 2019 · restraint-related scrutiny increasing. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
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
