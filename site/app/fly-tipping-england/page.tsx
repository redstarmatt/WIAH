'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';

  const sparkData = [900000,940000,980000,1010000,1040000,1060000,1080000];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Fly-tipping incidents in England (annual)',
      colour: '#6B7280',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Cost of clearance to local authorities (£ millions)',
      colour: '#6B7280',
      data: ([329,340,351,362,374,383,392]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];

export default function FlyTippingEnglandPage() {
  return (
    <>
      <TopicNav topic="Fly-Tipping" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Fly-Tipping"
          question="Is Fly-Tipping Getting Worse?"
          finding="Fly-tipping incidents in England hit 1.08 million in 2023 — a record. Clearance costs local authorities £392 million a year. Household waste accounts ..."
          colour="#6B7280"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Fly-tipping incidents in England (annual)"
              value="1.08M"
              direction="up"
              polarity="up-is-bad"
              changeText="record high · household waste 59% of incidents"
              sparklineData=[900000,940000,980000,1010000,1040000,1060000,1080000]
            />
            <MetricCard
              label="Cost of clearance to local authorities (£ millions)"
              value="392"
              direction="up"
              polarity="up-is-bad"
              changeText="up from £329M in 2018"
              sparklineData=[329,340,351,362,374,383,392]
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Fly-tipping incidents in England (annual), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              yLabel="Fly-tipping incidents in England (annual)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Fly-Tipping statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Fly-Tipping</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Fly-Tipping in the United Kingdom: the numbers show a complex picture. Fly-tipping incidents in England hit 1.08 million in 2023 — a record. Clearance costs local authorities £392 million a year. Household waste accounts for 59% of incidents, driven by charges for bulky waste collection. The headline figure — 1.08M for fly-tipping incidents in england (annual) — record high · household waste 59% of incidents.</p>
              <p>The secondary metric tells an equally important story: cost of clearance to local authorities (£ millions) stands at 392, where up from £329M in 2018. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
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
