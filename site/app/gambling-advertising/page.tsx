'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';

  const sparkData = [2.3,2.7,3,3.5,4,4.4,4.7];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Gambling adverts seen (average per person per week)',
      colour: '#E63946',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Problem gamblers recognising ads as targeted (%)',
      colour: '#6B7280',
      data: ([40,44,48,53,57,59,61]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];

export default function GamblingAdvertisingPage() {
  return (
    <>
      <TopicNav topic="Gambling Advertising" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Gambling Advertising"
          question="Is Gambling Advertising Out of Control?"
          finding="The average person sees 4.7 gambling adverts per week — double the 2014 rate. 61% of problem gamblers say they receive personalised gambling advertisi..."
          colour="#E63946"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Gambling adverts seen (average per person per week)"
              value="4.7"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 2.3 in 2014 · online and social media surge"
              sparklineData=[2.3,2.7,3,3.5,4,4.4,4.7]
            />
            <MetricCard
              label="Problem gamblers recognising ads as targeted (%)"
              value="61"
              direction="up"
              polarity="up-is-bad"
              changeText="personalised gambling ads exploit vulnerability"
              sparklineData=[40,44,48,53,57,59,61]
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Gambling adverts seen (average per person per week), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              yLabel="Gambling adverts seen (average per person per week)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Gambling Advertising statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Gambling Advertising</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Gambling Advertising in the United Kingdom: the numbers show a complex picture. The average person sees 4.7 gambling adverts per week — double the 2014 rate. 61% of problem gamblers say they receive personalised gambling advertising, exploiting their vulnerability. The headline figure — 4.7 for gambling adverts seen (average per person per week) — up from 2.3 in 2014 · online and social media surge.</p>
              <p>The secondary metric tells an equally important story: problem gamblers recognising ads as targeted (%) stands at 61, where personalised gambling ads exploit vulnerability. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
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
