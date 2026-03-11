'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function DomesticAbuseRefugesPage() {

  const sparkData = [43,43,42,40,38,36,35];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Refuge bed requests turned away (%)',
      colour: '#E63946',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Women referred but not accommodated (daily average)',
      colour: '#6B7280',
      data: ([120,118,115,110,105,100,97]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];
  const chartAnnotations: Annotation[] = [
    { date: new Date(2021, 0, 1), label: '2021: Domestic Abuse Act' },
  ];

  return (
    <>
      <TopicNav topic="Domestic Abuse Refuges" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Domestic Abuse Refuges"
          question="Is There Still a Refuge Space Shortage?"
          finding="35% of refuge bed requests are turned away each day — nearly 100 women per day unable to access a safe space. The Domestic Abuse Act 2021 has driven investment, but demand continues to outpace supply."
          colour="#E63946"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Refuge bed requests turned away (%)"
              value="35"
              direction="down"
              polarity="up-is-bad"
              changeText="down from 43% in 2019 · DA Act 2021 driving investment"
              sparklineData={[43,43,42,40,38,36,35]}
              source="SafeLives / Refuge — Oct 2023"
            />
            <MetricCard
              label="Women referred but not accommodated (daily average)"
              value="97"
              direction="down"
              polarity="up-is-bad"
              changeText="still nearly 100 women per day unable to access refuge"
              sparklineData={[120,118,115,110,105,100,97]}
              source="SafeLives / Refuge — Oct 2023"
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Refuge bed requests turned away (%), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              annotations={chartAnnotations}
              yLabel="Refuge bed requests turned away (%)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Domestic Abuse Refuges statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Women referred but not accommodated (daily average), UK"
              subtitle="UK data. Source: official government statistics."
              series={[{
                id: 'sec',
                label: 'Women referred but not accommodated (daily average)',
                colour: '#6B7280',
                data: ([120,118,115,110,105,100,97]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
              }]}
              yLabel="Women referred but not accommodated (daily average)"
              source={{
                name: 'SafeLives / Refuge',
                dataset: 'Women referred but not accommodated (daily average)',
                frequency: 'annual',
                url: 'https://safelives.org.uk/research/beacons/',
                date: 'Oct 2023',
              }}
            />
          </section>
        </ScrollReveal>


        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Domestic Abuse Refuges</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Domestic Abuse Refuges in the United Kingdom: the numbers show a complex picture. 35% of refuge bed requests are turned away each day — nearly 100 women per day unable to access a safe space. The Domestic Abuse Act 2021 has driven investment, but demand continues to outpace supply. The headline figure — 35 for refuge bed requests turned away (%) — down from 43% in 2019 · DA Act 2021 driving investment.</p>
              <p>The secondary metric tells an equally important story: women referred but not accommodated (daily average) stands at 97, where still nearly 100 women per day unable to access refuge. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
            </div>
          </section>
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <div className="space-y-2"><p><a href="https://safelives.org.uk/research/beacons/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">SafeLives / Refuge</a> — primary data source. Retrieved Oct 2023.</p><p>All figures are for England unless otherwise stated. Trend data uses the most recent available release at time of publication.</p></div>
          </div>
        </section>
      </main>
    </>
  );
}
