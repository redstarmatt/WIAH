'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';

  const sparkData = [56,58,61,63,65,66,67];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Bowel cancer screening uptake (England)',
      colour: '#2A9D8F',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Cancers caught at Stage 1–2 via screening',
      colour: '#6B7280',
      data: ([45,47,48,49,50,51,53]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];

export default function BowelScreeningPage() {
  return (
    <>
      <TopicNav topic="Bowel Cancer Screening" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Bowel Cancer Screening"
          question="Is Bowel Cancer Screening Finally Working?"
          finding="Uptake of bowel cancer screening has risen to 67% following the switch to the more acceptable FIT test. Over half of screen-detected cancers are now c..."
          colour="#2A9D8F"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Bowel cancer screening uptake (England)"
              value="67%"
              direction="up"
              polarity="up-is-good"
              changeText="up from 56% pre-FIT test · FIT more acceptable than FOB"
              sparklineData=[56,58,61,63,65,66,67]
            />
            <MetricCard
              label="Cancers caught at Stage 1–2 via screening"
              value="53%"
              direction="up"
              polarity="up-is-good"
              changeText="up from 45% in 2015 · early detection saves lives"
              sparklineData=[45,47,48,49,50,51,53]
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Bowel cancer screening uptake (England), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              yLabel="Bowel cancer screening uptake (England)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Bowel Cancer Screening statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Bowel Cancer Screening</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Bowel Cancer Screening in the United Kingdom: the numbers show a complex picture. Uptake of bowel cancer screening has risen to 67% following the switch to the more acceptable FIT test. Over half of screen-detected cancers are now caught at early stages. The headline figure — 67% for bowel cancer screening uptake (england) — up from 56% pre-FIT test · FIT more acceptable than FOB.</p>
              <p>The secondary metric tells an equally important story: cancers caught at stage 1–2 via screening stands at 53%, where up from 45% in 2015 · early detection saves lives. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
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
