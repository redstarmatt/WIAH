'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function RightToBuyPage() {

  const sparkData = [2000,5000,11000,12000,10000,9500,8900];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Right to Buy sales (England, annual)',
      colour: '#F4A261',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Social homes replaced for each sold via RTB',
      colour: '#6B7280',
      data: ([0.5,0.4,0.4,0.4,0.3,0.3,0.3]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="Right to Buy" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Right to Buy"
          question="Has Right to Buy Depleted the Social Housing Stock?"
          finding="8,900 homes were sold under Right to Buy last year — but only 0.3 of a new social home is built for each one sold, against a one-for-one replacement p..."
          colour="#F4A261"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Right to Buy sales (England, annual)"
              value="8,900"
              direction="down"
              polarity="up-is-bad"
              changeText="down from 68,000 peak in 1980s · discount increased 2012 reversed some decline"
              sparklineData={[2000,5000,11000,12000,10000,9500,8900]}
            />
            <MetricCard
              label="Social homes replaced for each sold via RTB"
              value="0.3"
              direction="down"
              polarity="up-is-bad"
              changeText="down from 1:1 target · net depletion of social stock"
              sparklineData={[0.5,0.4,0.4,0.4,0.3,0.3,0.3]}
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Right to Buy sales (England, annual), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              yLabel="Right to Buy sales (England, annual)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Right to Buy statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Right to Buy</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Right to Buy in the United Kingdom: the numbers show a complex picture. 8,900 homes were sold under Right to Buy last year — but only 0.3 of a new social home is built for each one sold, against a one-for-one replacement pledge. The net depletion of social housing stock continues to drive homelessness waiting lists. The headline figure — 8,900 for right to buy sales (england, annual) — down from 68,000 peak in 1980s · discount increased 2012 reversed some decline.</p>
              <p>The secondary metric tells an equally important story: social homes replaced for each sold via rtb stands at 0.3, where down from 1:1 target · net depletion of social stock. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
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
