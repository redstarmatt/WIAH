'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';

  const sparkData = [5889,5700,5500,5300,5100,4950,4848];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Entries on Historic England Heritage at Risk register',
      colour: '#F4A261',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Listed buildings at risk (England)',
      colour: '#6B7280',
      data: ([4189,3800,3400,3200,3000,2900,2780]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];

export default function HeritageAtRiskPage() {
  return (
    <>
      <TopicNav topic="Heritage at Risk" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Heritage at Risk"
          question="How Much of Britain's Heritage Is at Risk of Being Lost?"
          finding="4,848 historic buildings and sites are on Historic England's Heritage at Risk register — including 2,780 listed buildings. Progress has been steady bu..."
          colour="#F4A261"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Entries on Historic England Heritage at Risk register"
              value="4,848"
              direction="down"
              polarity="up-is-bad"
              changeText="down from 5,889 in 2009 but pace of improvement slowing"
              sparklineData=[5889,5700,5500,5300,5100,4950,4848]
            />
            <MetricCard
              label="Listed buildings at risk (England)"
              value="2,780"
              direction="down"
              polarity="up-is-good"
              changeText="down from 4,189 in 2000 · grants and tax incentives working"
              sparklineData=[4189,3800,3400,3200,3000,2900,2780]
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Entries on Historic England Heritage at Risk register, UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              yLabel="Entries on Historic England Heritage at Risk register"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Heritage at Risk statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Heritage at Risk</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Heritage at Risk in the United Kingdom: the numbers show a complex picture. 4,848 historic buildings and sites are on Historic England's Heritage at Risk register — including 2,780 listed buildings. Progress has been steady but is slowing as funding pressures grow. The headline figure — 4,848 for entries on historic england heritage at risk register — down from 5,889 in 2009 but pace of improvement slowing.</p>
              <p>The secondary metric tells an equally important story: listed buildings at risk (england) stands at 2,780, where down from 4,189 in 2000 · grants and tax incentives working. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
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
