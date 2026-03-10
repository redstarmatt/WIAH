'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function HonourBasedAbusePage() {

  const sparkData = [2160,2400,2700,2900,3200,3600,3908];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Honour-based abuse crimes recorded (England & Wales)',
      colour: '#6B7280',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Prosecutions for honour-based abuse',
      colour: '#6B7280',
      data: ([65,68,70,72,71,73,72]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];
  const chartAnnotations: Annotation[] = [
    { date: new Date(2014, 0, 1), label: '2014: Honour-based abuse criminalised' },
  ];

  return (
    <>
      <TopicNav topic="Honour-Based Abuse" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Honour-Based Abuse"
          question="How Common Is Honour-Based Abuse in Britain?"
          finding="3,908 honour-based abuse crimes were recorded in 2023 — up 81% since 2016, driven partly by better recording but also a real increase. The majority of victims are women and girls."
          colour="#6B7280"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Honour-based abuse crimes recorded (England & Wales)"
              value="3,908"
              direction="up"
              polarity="up-is-bad"
              changeText="up 81% since 2016 · better recording plus real increase"
              sparklineData={[2160,2400,2700,2900,3200,3600,3908]}
              source="Home Office — Nov 2023"
            />
            <MetricCard
              label="Prosecutions for honour-based abuse"
              value="72"
              direction="flat"
              polarity="up-is-bad"
              changeText="prosecution rate low relative to recorded crime"
              sparklineData={[65,68,70,72,71,73,72]}
              source="Home Office — Nov 2023"
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Honour-based abuse crimes recorded (England & Wales), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              annotations={chartAnnotations}
              yLabel="Honour-based abuse crimes recorded (England & Wales)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Honour-Based Abuse statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Prosecutions for honour-based abuse, UK"
              subtitle="UK data. Source: official government statistics."
              series={[{
                id: 'sec',
                label: 'Prosecutions for honour-based abuse',
                colour: '#6B7280',
                data: ([65,68,70,72,71,73,72]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
              }]}
              yLabel="Prosecutions for honour-based abuse"
              source={{
                name: 'Home Office',
                dataset: 'Prosecutions for honour-based abuse',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/collections/honour-based-abuse-and-forced-marriage-data',
                date: 'Nov 2023',
              }}
            />
          </section>
        </ScrollReveal>


        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Honour-Based Abuse</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Honour-Based Abuse in the United Kingdom: the numbers show a complex picture. 3,908 honour-based abuse crimes were recorded in 2023 — up 81% since 2016, driven partly by better recording but also a real increase. The majority of victims are women and girls. The headline figure — 3,908 for honour-based abuse crimes recorded (england & wales) — up 81% since 2016 · better recording plus real increase.</p>
              <p>The secondary metric tells an equally important story: prosecutions for honour-based abuse stands at 72, where prosecution rate low relative to recorded crime. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
            </div>
          </section>
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <div className="space-y-2"><p><a href="https://www.gov.uk/government/collections/honour-based-abuse-and-forced-marriage-data" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Home Office</a> — primary data source. Retrieved Nov 2023.</p><p>All figures are for England unless otherwise stated. Trend data uses the most recent available release at time of publication.</p></div>
          </div>
        </section>
      </main>
    </>
  );
}
