'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';

  const sparkData = [1.3,1.4,1.5,1.6,1.7,1.75,1.8];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Work-related ill health cases (annual)',
      colour: '#6B7280',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Days lost to work-related illness (millions)',
      colour: '#6B7280',
      data: ([31.8,33,34,34.5,35,35.1,35.2]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];

export default function OccupationalDiseasePage() {
  return (
    <>
      <TopicNav topic="Occupational Disease" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Occupational Disease"
          question="How Many People Get Ill Because of Their Job?"
          finding="1.8 million work-related ill health cases were recorded in 2023 — a record high. Stress, depression and anxiety account for 50% of cases. 35 million w..."
          colour="#6B7280"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Work-related ill health cases (annual)"
              value="1.8M"
              direction="up"
              polarity="up-is-bad"
              changeText="record high · stress, depression, anxiety account for 50%"
              sparklineData=[1.3,1.4,1.5,1.6,1.7,1.75,1.8]
            />
            <MetricCard
              label="Days lost to work-related illness (millions)"
              value="35.2"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 31.8M in 2019 · mental health main cause"
              sparklineData=[31.8,33,34,34.5,35,35.1,35.2]
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Work-related ill health cases (annual), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              yLabel="Work-related ill health cases (annual)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Occupational Disease statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Occupational Disease</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Occupational Disease in the United Kingdom: the numbers show a complex picture. 1.8 million work-related ill health cases were recorded in 2023 — a record high. Stress, depression and anxiety account for 50% of cases. 35 million working days were lost, costing the economy an estimated £20 billion. The headline figure — 1.8M for work-related ill health cases (annual) — record high · stress, depression, anxiety account for 50%.</p>
              <p>The secondary metric tells an equally important story: days lost to work-related illness (millions) stands at 35.2, where up from 31.8M in 2019 · mental health main cause. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
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
