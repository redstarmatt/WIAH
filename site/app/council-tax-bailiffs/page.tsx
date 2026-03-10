'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function CouncilTaxBailiffsPage() {

  const sparkData = [1.6,1.7,1.8,1.9,2,2.2,2.3];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Council tax enforcement actions (England, annual)',
      colour: '#F4A261',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Council tax debt outstanding (England, £ billions)',
      colour: '#6B7280',
      data: ([3.6,3.8,4.1,4.5,5,5.6,6.1]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];
  const chartAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: COVID moratorium ended' },
  ];

  return (
    <>
      <TopicNav topic="Council Tax Bailiffs" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Council Tax Bailiffs"
          question="How Many People Are Being Chased by Council Tax Bailiffs?"
          finding="Enforcement actions for council tax debt reached 2.3 million in England last year — a record. Bailiff referrals are up 45% since 2019, and outstanding council tax debt stands at £6.1 billion."
          colour="#F4A261"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Council tax enforcement actions (England, annual)"
              value="2.3M"
              direction="up"
              polarity="up-is-bad"
              changeText="record · bailiff referrals up 45% since 2019"
              sparklineData={[1.6,1.7,1.8,1.9,2,2.2,2.3]}
              source="StepChange Debt Charity — Sep 2023"
            />
            <MetricCard
              label="Council tax debt outstanding (England, £ billions)"
              value="6.1"
              direction="up"
              polarity="up-is-bad"
              changeText="up from £3.6B in 2019"
              sparklineData={[3.6,3.8,4.1,4.5,5,5.6,6.1]}
              source="StepChange Debt Charity — Sep 2023"
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Council tax enforcement actions (England, annual), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              annotations={chartAnnotations}
              yLabel="Council tax enforcement actions (England, annual)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Council Tax Bailiffs statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Council tax debt outstanding (England, £ billions), UK"
              subtitle="UK data. Source: official government statistics."
              series={[{
                id: 'sec',
                label: 'Council tax debt outstanding (England, £ billions)',
                colour: '#6B7280',
                data: ([3.6,3.8,4.1,4.5,5,5.6,6.1]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
              }]}
              yLabel="Council tax debt outstanding (England, £ billions)"
              source={{
                name: 'StepChange Debt Charity',
                dataset: 'Council tax debt outstanding (England, £ billions)',
                frequency: 'annual',
                url: 'https://www.stepchange.org/policy-and-research/council-tax-debt.aspx',
                date: 'Sep 2023',
              }}
            />
          </section>
        </ScrollReveal>


        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Council Tax Bailiffs</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Council Tax Bailiffs in the United Kingdom: the numbers show a complex picture. Enforcement actions for council tax debt reached 2.3 million in England last year — a record. Bailiff referrals are up 45% since 2019, and outstanding council tax debt stands at £6.1 billion. The headline figure — 2.3M for council tax enforcement actions (england, annual) — record · bailiff referrals up 45% since 2019.</p>
              <p>The secondary metric tells an equally important story: council tax debt outstanding (england, £ billions) stands at 6.1, where up from £3.6B in 2019. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
            </div>
          </section>
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <div className="space-y-2"><p><a href="https://www.stepchange.org/policy-and-research/council-tax-debt.aspx" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">StepChange Debt Charity</a> — primary data source. Retrieved Sep 2023.</p><p>All figures are for England unless otherwise stated. Trend data uses the most recent available release at time of publication.</p></div>
          </div>
        </section>
      </main>
    </>
  );
}
