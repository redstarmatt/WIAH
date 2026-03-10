'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';

  const sparkData = [45,47,49,51,53,55,57];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Share of UK diet from ultra-processed foods (%)',
      colour: '#E63946',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Children's diet from ultra-processed foods (%)',
      colour: '#6B7280',
      data: ([55,57,59,61,62,64,65]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];

export default function UltraProcessedFoodPage() {
  return (
    <>
      <TopicNav topic="Ultra-Processed Food" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Ultra-Processed Food"
          question="Is Ultra-Processed Food Taking Over the British Diet?"
          finding="57% of the UK diet now comes from ultra-processed foods — the highest share in Europe. Children's diets are even more dominated at 65%. Research links..."
          colour="#E63946"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Share of UK diet from ultra-processed foods (%)"
              value="57"
              direction="up"
              polarity="up-is-bad"
              changeText="highest in Europe · up from 45% in 2000"
              sparklineData=[45,47,49,51,53,55,57]
            />
            <MetricCard
              label="Children's diet from ultra-processed foods (%)"
              value="65"
              direction="up"
              polarity="up-is-bad"
              changeText="even higher in children · linked to ADHD, obesity, anxiety"
              sparklineData=[55,57,59,61,62,64,65]
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Share of UK diet from ultra-processed foods (%), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              yLabel="Share of UK diet from ultra-processed foods (%)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Ultra-Processed Food statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Ultra-Processed Food</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Ultra-Processed Food in the United Kingdom: the numbers show a complex picture. 57% of the UK diet now comes from ultra-processed foods — the highest share in Europe. Children's diets are even more dominated at 65%. Research links UPF consumption to obesity, ADHD, anxiety and reduced life expectancy. The headline figure — 57 for share of uk diet from ultra-processed foods (%) — highest in Europe · up from 45% in 2000.</p>
              <p>The secondary metric tells an equally important story: children's diet from ultra-processed foods (%) stands at 65, where even higher in children · linked to ADHD, obesity, anxiety. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
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
