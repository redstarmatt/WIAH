'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function PrisonEducationPage() {

  const sparkData = [34,33,31,30,29,28,28];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Prisoners in education each week (%)',
      colour: '#6B7280',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Prisoners with no formal qualifications (%)',
      colour: '#6B7280',
      data: ([56,57,57,56,57,57,57]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];
  const chartAnnotations: Annotation[] = [
    { date: new Date(2010, 0, 1), label: '2010: Education budget cut 40%' },
    { date: new Date(2020, 0, 1), label: '2020: COVID · classes suspended' },
  ];

  return (
    <>
      <TopicNav topic="Prison Education" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Prison Education"
          question="Is Prison Education Working?"
          finding="Only 28% of prisoners engage in education each week — down from 34% in 2013. The education budget has been cut 40% since 2010. 57% of prisoners have no formal qualifications on entry. The evidence that education reduces reoffending is overwhelming."
          colour="#6B7280"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Prisoners in education each week (%)"
              value="28%"
              direction="down"
              polarity="up-is-good"
              changeText="down from 34% in 2013 · education budget cut 40% since 2010"
              sparklineData={[34,33,31,30,29,28,28]}
              source="HMPPS / Ofsted — Nov 2023"
            />
            <MetricCard
              label="Prisoners with no formal qualifications (%)"
              value="57%"
              direction="flat"
              polarity="up-is-bad"
              changeText="persistently high · poor literacy common on entry"
              sparklineData={[56,57,57,56,57,57,57]}
              source="HMPPS / Ofsted — Nov 2023"
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Prisoners in education each week (%), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              annotations={chartAnnotations}
              yLabel="Prisoners in education each week (%)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Prison Education statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Prisoners with no formal qualifications (%), UK"
              subtitle="UK data. Source: official government statistics."
              series={[{
                id: 'sec',
                label: 'Prisoners with no formal qualifications (%)',
                colour: '#6B7280',
                data: ([56,57,57,56,57,57,57]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
              }]}
              yLabel="Prisoners with no formal qualifications (%)"
              source={{
                name: 'HMPPS / Ofsted',
                dataset: 'Prisoners with no formal qualifications (%)',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/national-prison-education-framework-statistics',
                date: 'Nov 2023',
              }}
            />
          </section>
        </ScrollReveal>


        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">Cutting Prison Education Was One of the Most Counterproductive Austerity Decisions</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>The prison education budget has been cut 40% since 2010. Only 28% of prisoners engage in education in any given week, down from 34% in 2013. 57% of people entering prison have no formal qualifications, and functional illiteracy and numeracy are widespread. The evidence that education in prison reduces reoffending — and therefore taxpayer costs — is strong and consistent across countries.</p>
              <p>Prison education was one of the few areas where longitudinal outcome data clearly showed return on investment: RAND Corporation research and UK studies both found substantial reoffending reductions from educational participation. Cutting it was a false economy. The pattern of custody, release, rapid reoffending and recall is expensive. A prisoner costs approximately £50,000 per year to keep inside. Investment in literacy, numeracy and vocational qualifications during custody has much higher returns than additional security spending.</p>
            </div>
          </section>
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <div className="space-y-2"><p><a href="https://www.gov.uk/government/statistics/national-prison-education-framework-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">HMPPS / Ofsted</a> — primary data source. Retrieved Nov 2023.</p><p>All figures are for England unless otherwise stated. Trend data uses the most recent available release at time of publication.</p></div>
          </div>
        </section>
      </main>
    </>
  );
}
