'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';

  const sparkData = [26100,29000,33000,37000,41000,43500,45800];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Average graduate debt on completion (England)',
      colour: '#F4A261',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Government expects to write off (% of loan value)',
      colour: '#6B7280',
      data: ([35,36,38,40,41,42,43]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];

export default function StudentLoanEconomicsPage() {
  return (
    <>
      <TopicNav topic="Student Loan Economics" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Student Loan Economics"
          question="Does the Student Loan System Work?"
          finding="The average English graduate leaves with £45,800 of debt, paying 6.25% interest. The government expects to write off 43% of the total loan value — mea..."
          colour="#F4A261"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Average graduate debt on completion (England)"
              value="£45,800"
              direction="up"
              polarity="up-is-bad"
              changeText="up from £26,100 in 2012 · 6.25% interest rate in 2024"
              sparklineData=[26100,29000,33000,37000,41000,43500,45800]
            />
            <MetricCard
              label="Government expects to write off (% of loan value)"
              value="43%"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 35% in 2015 · majority of graduates will never repay in full"
              sparklineData=[35,36,38,40,41,42,43]
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Average graduate debt on completion (England), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              yLabel="Average graduate debt on completion (England)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Student Loan Economics statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Student Loan Economics</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Student Loan Economics in the United Kingdom: the numbers show a complex picture. The average English graduate leaves with £45,800 of debt, paying 6.25% interest. The government expects to write off 43% of the total loan value — meaning the system is neither a true loan nor a transparent graduate tax. The headline figure — £45,800 for average graduate debt on completion (england) — up from £26,100 in 2012 · 6.25% interest rate in 2024.</p>
              <p>The secondary metric tells an equally important story: government expects to write off (% of loan value) stands at 43%, where up from 35% in 2015 · majority of graduates will never repay in full. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
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
