'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function HeritageAtRiskPage() {

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
  const chartAnnotations: Annotation[] = [
    { date: new Date(2010, 0, 1), label: '2010: Heritage at Risk register expands' },
  ];

  return (
    <>
      <TopicNav topic="Heritage at Risk" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Heritage at Risk"
          question="How Much of Britain's Heritage Is at Risk of Being Lost?"
          finding="4,848 historic buildings and sites are on Historic England's Heritage at Risk register — including 2,780 listed buildings. Progress has been steady but is slowing as funding pressures grow."
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
              sparklineData={[5889,5700,5500,5300,5100,4950,4848]}
              source="Historic England — Oct 2023"
            />
            <MetricCard
              label="Listed buildings at risk (England)"
              value="2,780"
              direction="down"
              polarity="up-is-good"
              changeText="down from 4,189 in 2000 · grants and tax incentives working"
              sparklineData={[4189,3800,3400,3200,3000,2900,2780]}
              source="Historic England — Oct 2023"
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Entries on Historic England Heritage at Risk register, UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              annotations={chartAnnotations}
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
          <section className="mb-12">
            <LineChart
              title="Listed buildings at risk (England), UK"
              subtitle="UK data. Source: official government statistics."
              series={[{
                id: 'sec',
                label: 'Listed buildings at risk (England)',
                colour: '#6B7280',
                data: ([4189,3800,3400,3200,3000,2900,2780]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
              }]}
              yLabel="Listed buildings at risk (England)"
              source={{
                name: 'Historic England',
                dataset: 'Listed buildings at risk (England)',
                frequency: 'annual',
                url: 'https://historicengland.org.uk/advice/heritage-at-risk/search-register/',
                date: 'Oct 2023',
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
            <div className="space-y-2"><p><a href="https://historicengland.org.uk/advice/heritage-at-risk/search-register/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Historic England</a> — primary data source. Retrieved Oct 2023.</p><p>All figures are for England unless otherwise stated. Trend data uses the most recent available release at time of publication.</p></div>
          </div>
        </section>
      </main>
    </>
  );
}
