'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function SchoolReadinessPage() {

  const sparkData = [53,57,62,66,69,67,67.7];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Children achieving good level of development at age 5 (%)',
      colour: '#E63946',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Disadvantaged children at expected level vs peers (gap, pp)',
      colour: '#6B7280',
      data: ([24,22,20,17,17,19,19]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];
  const chartAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: School closures · language gap widens' },
  ];

  return (
    <>
      <TopicNav topic="School Readiness" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="School Readiness"
          question="How Many Children Start School Not Ready to Learn?"
          finding="67.7% of five-year-olds in England achieve a good level of development — but the gap between disadvantaged children and their peers has widened to 19 percentage points since the pandemic erased a decade of progress."
          colour="#E63946"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Children achieving good level of development at age 5 (%)"
              value="67.7"
              direction="up"
              polarity="up-is-good"
              changeText="up from 53% in 2012 · but gap widened post-COVID"
              sparklineData={[53,57,62,66,69,67,67.7]}
              source="DfE — Oct 2023"
            />
            <MetricCard
              label="Disadvantaged children at expected level vs peers (gap, pp)"
              value="19"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 17pp in 2019 · pandemic erased decade of progress"
              sparklineData={[24,22,20,17,17,19,19]}
              source="DfE — Oct 2023"
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Children achieving good level of development at age 5 (%), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              annotations={chartAnnotations}
              yLabel="Children achieving good level of development at age 5 (%)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'School Readiness statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Disadvantaged children at expected level vs peers (gap, pp), UK"
              subtitle="UK data. Source: official government statistics."
              series={[{
                id: 'sec',
                label: 'Disadvantaged children at expected level vs peers (gap, pp)',
                colour: '#6B7280',
                data: ([24,22,20,17,17,19,19]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
              }]}
              yLabel="Disadvantaged children at expected level vs peers (gap, pp)"
              source={{
                name: 'DfE',
                dataset: 'Disadvantaged children at expected level vs peers (gap, pp)',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/early-years-foundation-stage-profile-results-2022-to-2023',
                date: 'Oct 2023',
              }}
            />
          </section>
        </ScrollReveal>


        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on School Readiness</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>School Readiness in the United Kingdom: the numbers show a complex picture. 67.7% of five-year-olds in England achieve a good level of development — but the gap between disadvantaged children and their peers has widened to 19 percentage points since the pandemic erased a decade of progress. The headline figure — 67.7 for children achieving good level of development at age 5 (%) — up from 53% in 2012 · but gap widened post-COVID.</p>
              <p>The secondary metric tells an equally important story: disadvantaged children at expected level vs peers (gap, pp) stands at 19, where up from 17pp in 2019 · pandemic erased decade of progress. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
            </div>
          </section>
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <div className="space-y-2"><p><a href="https://www.gov.uk/government/statistics/early-years-foundation-stage-profile-results-2022-to-2023" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfE</a> — primary data source. Retrieved Oct 2023.</p><p>All figures are for England unless otherwise stated. Trend data uses the most recent available release at time of publication.</p></div>
          </div>
        </section>
      </main>
    </>
  );
}
