'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function CataractWaitsPage() {

  const sparkData = [120000,150000,280000,430000,560000,620000,650000];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'People waiting for cataract surgery (England)',
      colour: '#E63946',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Median wait for first cataract (weeks)',
      colour: '#6B7280',
      data: ([9,12,22,31,37,40,41]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];
  const chartAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: COVID cancellations' },
  ];
  const chartTargetLine = { value: 18.0, label: '18-week RTT standard' };

  return (
    <>
      <TopicNav topic="Cataract Waits" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Cataract Waits"
          question="Why Are 650,000 People Waiting for Cataract Surgery?"
          finding="The cataract backlog is 650,000 — up from 120,000 before the pandemic. The median wait is now 41 weeks. Cataracts are the most common elective surgery and blindness is preventable."
          colour="#E63946"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="People waiting for cataract surgery (England)"
              value="650K"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 120K in 2019 · most common elective surgery"
              sparklineData={[120000,150000,280000,430000,560000,620000,650000]}
              source="NHS England — Feb 2024"
            />
            <MetricCard
              label="Median wait for first cataract (weeks)"
              value="41"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 9 weeks in 2019"
              sparklineData={[9,12,22,31,37,40,41]}
              source="NHS England — Feb 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="People waiting for cataract surgery (England), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              targetLine={chartTargetLine}
              annotations={chartAnnotations}
              yLabel="People waiting for cataract surgery (England)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Cataract Waits statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Median wait for first cataract (weeks), UK"
              subtitle="UK data. Source: official government statistics."
              series={[{
                id: 'sec',
                label: 'Median wait for first cataract (weeks)',
                colour: '#6B7280',
                data: ([9,12,22,31,37,40,41]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
              }]}
              yLabel="Median wait for first cataract (weeks)"
              source={{
                name: 'NHS England',
                dataset: 'Median wait for first cataract (weeks)',
                frequency: 'annual',
                url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/referral-to-treatment-waiting-times/',
                date: 'Feb 2024',
              }}
            />
          </section>
        </ScrollReveal>


        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Cataract Waits</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Cataract Waits in the United Kingdom: the numbers show a complex picture. The cataract backlog is 650,000 — up from 120,000 before the pandemic. The median wait is now 41 weeks. Cataracts are the most common elective surgery and blindness is preventable. The headline figure — 650K for people waiting for cataract surgery (england) — up from 120K in 2019 · most common elective surgery.</p>
              <p>The secondary metric tells an equally important story: median wait for first cataract (weeks) stands at 41, where up from 9 weeks in 2019. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
            </div>
          </section>
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <div className="space-y-2"><p><a href="https://www.england.nhs.uk/statistics/statistical-work-areas/referral-to-treatment-waiting-times/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England</a> — primary data source. Retrieved Feb 2024.</p><p>All figures are for England unless otherwise stated. Trend data uses the most recent available release at time of publication.</p></div>
          </div>
        </section>
      </main>
    </>
  );
}
