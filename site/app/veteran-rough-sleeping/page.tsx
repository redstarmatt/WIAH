'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function VeteranRoughSleepingPage() {

  const sparkData = [400,380,360,345,335,325,320];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Veterans sleeping rough on any given night (England)',
      colour: '#6B7280',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Veterans assessed as homeless by local authorities (annual)',
      colour: '#6B7280',
      data: ([8700,8000,7200,6800,6400,6100,5900]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];
  const chartAnnotations: Annotation[] = [
    { date: new Date(2021, 0, 1), label: '2021: Op FORTITUDE launched' },
  ];

  return (
    <>
      <TopicNav topic="Veteran Rough Sleeping" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Veteran Rough Sleeping"
          question="Are Veterans Still Sleeping Rough?"
          finding="320 veterans were found sleeping rough in England on any given night in 2023 — down from 400 in 2018. Op FORTITUDE and specialist veteran housing pathways are making progress, but hidden homelessness among veterans is thought to be much higher."
          colour="#6B7280"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Veterans sleeping rough on any given night (England)"
              value="320"
              direction="down"
              polarity="up-is-good"
              changeText="down from 400 in 2018 · Op FORTITUDE and specialist services"
              sparklineData={[400,380,360,345,335,325,320]}
              source="MHCLG / Office for Veterans Affairs — Feb 2024"
            />
            <MetricCard
              label="Veterans assessed as homeless by local authorities (annual)"
              value="5,900"
              direction="down"
              polarity="up-is-good"
              changeText="down from 8,700 in 2012 · Armed Forces Covenant housing duty"
              sparklineData={[8700,8000,7200,6800,6400,6100,5900]}
              source="MHCLG / Office for Veterans Affairs — Feb 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Veterans sleeping rough on any given night (England), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              annotations={chartAnnotations}
              yLabel="Veterans sleeping rough on any given night (England)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Veteran Rough Sleeping statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Veterans assessed as homeless by local authorities (annual), UK"
              subtitle="UK data. Source: official government statistics."
              series={[{
                id: 'sec',
                label: 'Veterans assessed as homeless by local authorities (annual)',
                colour: '#6B7280',
                data: ([8700,8000,7200,6800,6400,6100,5900]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
              }]}
              yLabel="Veterans assessed as homeless by local authorities (annual)"
              source={{
                name: 'MHCLG / Office for Veterans Affairs',
                dataset: 'Veterans assessed as homeless by local authorities (annual)',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/rough-sleeping-snapshot-in-england-autumn-2023',
                date: 'Feb 2024',
              }}
            />
          </section>
        </ScrollReveal>


        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Veteran Rough Sleeping</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Veteran Rough Sleeping in the United Kingdom: the numbers show a complex picture. 320 veterans were found sleeping rough in England on any given night in 2023 — down from 400 in 2018. Op FORTITUDE and specialist veteran housing pathways are making progress, but hidden homelessness among veterans is thought to be much higher. The headline figure — 320 for veterans sleeping rough on any given night (england) — down from 400 in 2018 · Op FORTITUDE and specialist services.</p>
              <p>The secondary metric tells an equally important story: veterans assessed as homeless by local authorities (annual) stands at 5,900, where down from 8,700 in 2012 · Armed Forces Covenant housing duty. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
            </div>
          </section>
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <div className="space-y-2"><p><a href="https://www.gov.uk/government/statistics/rough-sleeping-snapshot-in-england-autumn-2023" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">MHCLG / Office for Veterans Affairs</a> — primary data source. Retrieved Feb 2024.</p><p>All figures are for England unless otherwise stated. Trend data uses the most recent available release at time of publication.</p></div>
          </div>
        </section>
      </main>
    </>
  );
}
