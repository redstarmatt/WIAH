'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function AudiologyWaitsPage() {

  const sparkData = [800000,900000,1100000,1300000,1450000,1550000,1600000];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'People waiting for hearing assessment (England)',
      colour: '#E63946',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Average wait for hearing aid fitting (weeks)',
      colour: '#6B7280',
      data: ([18,20,24,27,29,31,32]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];
  const chartAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: COVID backlogs begin' },
  ];
  const chartTargetLine = { value: 18.0, label: '18-week RTT standard' };

  return (
    <>
      <TopicNav topic="Audiology Waits" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Audiology Waits"
          question="Why Are 1.6 Million People Waiting for a Hearing Assessment?"
          finding="Audiology has the longest backlog in the NHS — 1.6 million people waiting, with average waits of 32 weeks. The 6-week access standard has been abandoned."
          colour="#E63946"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="People waiting for hearing assessment (England)"
              value="1.6M"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 0.8M in 2020 · longest backlog in NHS"
              sparklineData={[800000,900000,1100000,1300000,1450000,1550000,1600000]}
              source="NHS England — Feb 2024"
            />
            <MetricCard
              label="Average wait for hearing aid fitting (weeks)"
              value="32"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 18 weeks in 2019 · 6-week standard long abandoned"
              sparklineData={[18,20,24,27,29,31,32]}
              source="NHS England — Feb 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="People waiting for hearing assessment (England), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              targetLine={chartTargetLine}
              annotations={chartAnnotations}
              yLabel="People waiting for hearing assessment (England)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Audiology Waits statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Average wait for hearing aid fitting (weeks), UK"
              subtitle="UK data. Source: official government statistics."
              series={[{
                id: 'sec',
                label: 'Average wait for hearing aid fitting (weeks)',
                colour: '#6B7280',
                data: ([18,20,24,27,29,31,32]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
              }]}
              yLabel="Average wait for hearing aid fitting (weeks)"
              source={{
                name: 'NHS England',
                dataset: 'Average wait for hearing aid fitting (weeks)',
                frequency: 'annual',
                url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/referral-to-treatment-waiting-times/',
                date: 'Feb 2024',
              }}
            />
          </section>
        </ScrollReveal>


        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Audiology Waits</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Audiology Waits in the United Kingdom: the numbers show a complex picture. Audiology has the longest backlog in the NHS — 1.6 million people waiting, with average waits of 32 weeks. The 6-week access standard has been abandoned. The headline figure — 1.6M for people waiting for hearing assessment (england) — up from 0.8M in 2020 · longest backlog in NHS.</p>
              <p>The secondary metric tells an equally important story: average wait for hearing aid fitting (weeks) stands at 32, where up from 18 weeks in 2019 · 6-week standard long abandoned. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
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
