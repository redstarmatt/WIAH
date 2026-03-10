'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function OnlineGamblingGrowthPage() {

  const sparkData = [4.4,4.9,5.5,6,6.3,6.7,7];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Online gambling gross yield (£ billions)',
      colour: '#E63946',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Online slots players at highest intensity (millions)',
      colour: '#6B7280',
      data: ([0.7,0.8,0.9,1,1.1,1.2,1.3]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="Online Gambling Growth" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Online Gambling Growth"
          question="Is Online Gambling Getting Bigger?"
          finding="Online gambling generated £7 billion in gross yield in 2023 — nearly half the total UK gambling market. 1.3 million people play online slots at high i..."
          colour="#E63946"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Online gambling gross yield (£ billions)"
              value="7.0"
              direction="up"
              polarity="up-is-bad"
              changeText="up from £4.4B in 2018 · now 46% of total gambling market"
              sparklineData={[4.4,4.9,5.5,6,6.3,6.7,7]}
            />
            <MetricCard
              label="Online slots players at highest intensity (millions)"
              value="1.3"
              direction="up"
              polarity="up-is-bad"
              changeText="daily or near-daily · 430,000 problem gamblers"
              sparklineData={[0.7,0.8,0.9,1,1.1,1.2,1.3]}
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Online gambling gross yield (£ billions), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              yLabel="Online gambling gross yield (£ billions)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Online Gambling Growth statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Online Gambling Growth</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Online Gambling Growth in the United Kingdom: the numbers show a complex picture. Online gambling generated £7 billion in gross yield in 2023 — nearly half the total UK gambling market. 1.3 million people play online slots at high intensity, and an estimated 430,000 are problem gamblers. The headline figure — 7.0 for online gambling gross yield (£ billions) — up from £4.4B in 2018 · now 46% of total gambling market.</p>
              <p>The secondary metric tells an equally important story: online slots players at highest intensity (millions) stands at 1.3, where daily or near-daily · 430,000 problem gamblers. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
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
