'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function DisabilitySportGapPage() {

  const sparkData = [48,47,46,45,44,43,43];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Disabled adults inactive (% doing no activity)',
      colour: '#6B7280',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Gap between disabled and non-disabled sport participation (pp)',
      colour: '#6B7280',
      data: ([22,22,22,21,21,21,21]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="Disability Sport Gap" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Disability Sport Gap"
          question="Why Are Disabled People So Much Less Active?"
          finding="43% of disabled adults do no physical activity — a 21-percentage-point gap versus non-disabled adults that has persisted for over a decade. Accessible..."
          colour="#6B7280"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Disabled adults inactive (% doing no activity)"
              value="43"
              direction="down"
              polarity="up-is-bad"
              changeText="down from 48% in 2017 · still 15pp more than non-disabled"
              sparklineData={[48,47,46,45,44,43,43]}
            />
            <MetricCard
              label="Gap between disabled and non-disabled sport participation (pp)"
              value="21"
              direction="flat"
              polarity="up-is-bad"
              changeText="persistent 21-point gap · accessible facilities funding stalled"
              sparklineData={[22,22,22,21,21,21,21]}
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Disabled adults inactive (% doing no activity), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              yLabel="Disabled adults inactive (% doing no activity)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Disability Sport Gap statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Disability Sport Gap</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Disability Sport Gap in the United Kingdom: the numbers show a complex picture. 43% of disabled adults do no physical activity — a 21-percentage-point gap versus non-disabled adults that has persisted for over a decade. Accessible facilities funding has stalled since 2010. The headline figure — 43 for disabled adults inactive (% doing no activity) — down from 48% in 2017 · still 15pp more than non-disabled.</p>
              <p>The secondary metric tells an equally important story: gap between disabled and non-disabled sport participation (pp) stands at 21, where persistent 21-point gap · accessible facilities funding stalled. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
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
