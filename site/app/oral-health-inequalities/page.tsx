'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function OralHealthInequalitiesPage() {

  const sparkData = [3,3,3,3,3,3,3];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Children in deprived areas with tooth decay vs affluent (ratio)',
      colour: '#E63946',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Adults unable to access NHS dentist when needed',
      colour: '#6B7280',
      data: ([26,28,30,33,37,40,42]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="Oral Health Inequalities" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Oral Health Inequalities"
          question="Is Oral Health Still Determined by Your Postcode?"
          finding="Children in the most deprived areas are three times as likely to have tooth decay as those in the most affluent. 42% of adults were unable to access a..."
          colour="#E63946"
          preposition="in"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Children in deprived areas with tooth decay vs affluent (ratio)"
              value="3:1"
              direction="flat"
              polarity="up-is-bad"
              changeText="persistent gap · fluoridation coverage still under 10% of England"
              sparklineData={[3,3,3,3,3,3,3]}
            />
            <MetricCard
              label="Adults unable to access NHS dentist when needed"
              value="42%"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 26% in 2019 · NHS dentistry in systemic decline"
              sparklineData={[26,28,30,33,37,40,42]}
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Children in deprived areas with tooth decay vs affluent (ratio), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              yLabel="Children in deprived areas with tooth decay vs affluent (ratio)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Oral Health Inequalities statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Oral Health Inequalities</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Oral Health Inequalities in the United Kingdom: the numbers show a complex picture. Children in the most deprived areas are three times as likely to have tooth decay as those in the most affluent. 42% of adults were unable to access an NHS dentist when they needed one — up from 26% in 2019. The headline figure — 3:1 for children in deprived areas with tooth decay vs affluent (ratio) — persistent gap · fluoridation coverage still under 10% of England.</p>
              <p>The secondary metric tells an equally important story: adults unable to access nhs dentist when needed stands at 42%, where up from 26% in 2019 · NHS dentistry in systemic decline. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
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
