'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function UcDeductionsPage() {

  const sparkData = [52,52,50,48,47,46,45];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'UC claimants with deductions (%)',
      colour: '#E63946',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Average UC deduction per claimant (£/month)',
      colour: '#6B7280',
      data: ([52,54,56,58,59,60,61]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];
  const chartAnnotations: Annotation[] = [
    { date: new Date(2013, 0, 1), label: '2013: UC launched' },
    { date: new Date(2021, 0, 1), label: '2021: Advance loan repayment surge' },
  ];

  return (
    <>
      <TopicNav topic="Universal Credit Deductions" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Universal Credit Deductions"
          question="Are Universal Credit Deductions Pushing People Further Into Poverty?"
          finding="45% of Universal Credit claimants — 2.2 million people — have deductions taken from their payments each month. The average deduction is £61, mainly to repay advance loans that claimants needed to survive the five-week wait."
          colour="#E63946"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="UC claimants with deductions (%)"
              value="45"
              direction="down"
              polarity="up-is-bad"
              changeText="down from 52% in 2019 · still affects 2.2M people"
              sparklineData={[52,52,50,48,47,46,45]}
              source="DWP — Jan 2024"
            />
            <MetricCard
              label="Average UC deduction per claimant (£/month)"
              value="61"
              direction="up"
              polarity="up-is-bad"
              changeText="up from £52 in 2019 · advance payment loans main cause"
              sparklineData={[52,54,56,58,59,60,61]}
              source="DWP — Jan 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="UC claimants with deductions (%), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              annotations={chartAnnotations}
              yLabel="UC claimants with deductions (%)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Universal Credit Deductions statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Average UC deduction per claimant (£/month), UK"
              subtitle="UK data. Source: official government statistics."
              series={[{
                id: 'sec',
                label: 'Average UC deduction per claimant (£/month)',
                colour: '#6B7280',
                data: ([52,54,56,58,59,60,61]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
              }]}
              yLabel="Average UC deduction per claimant (£/month)"
              source={{
                name: 'DWP',
                dataset: 'Average UC deduction per claimant (£/month)',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/universal-credit-statistics-29-april-2013-to-11-january-2024',
                date: 'Jan 2024',
              }}
            />
          </section>
        </ScrollReveal>


        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Universal Credit Deductions</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Universal Credit Deductions in the United Kingdom: the numbers show a complex picture. 45% of Universal Credit claimants — 2.2 million people — have deductions taken from their payments each month. The average deduction is £61, mainly to repay advance loans that claimants needed to survive the five-week wait. The headline figure — 45 for uc claimants with deductions (%) — down from 52% in 2019 · still affects 2.2M people.</p>
              <p>The secondary metric tells an equally important story: average uc deduction per claimant (£/month) stands at 61, where up from £52 in 2019 · advance payment loans main cause. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
            </div>
          </section>
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <div className="space-y-2"><p><a href="https://www.gov.uk/government/statistics/universal-credit-statistics-29-april-2013-to-11-january-2024" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DWP</a> — primary data source. Retrieved Jan 2024.</p><p>All figures are for England unless otherwise stated. Trend data uses the most recent available release at time of publication.</p></div>
          </div>
        </section>
      </main>
    </>
  );
}
