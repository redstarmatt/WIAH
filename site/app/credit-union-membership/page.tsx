'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function CreditUnionMembershipPage() {

  const sparkData = [1.4,1.5,1.6,1.7,1.8,1.9,2.1];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Credit union members (Great Britain, millions)',
      colour: '#2A9D8F',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Credit union assets (£ billions)',
      colour: '#6B7280',
      data: ([2,2.2,2.5,2.8,3.1,3.5,3.8]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];
  const chartAnnotations: Annotation[] = [
    { date: new Date(2012, 0, 1), label: '2012: Coalition growth strategy' },
  ];

  return (
    <>
      <TopicNav topic="Credit Union Membership" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Credit Union Membership"
          question="Why Does Britain Have So Few Credit Union Members?"
          finding="Only 2.1 million people — 3% of the adult population — belong to a credit union, compared to 75% in Ireland. Credit unions offer affordable loans and savings to people excluded from mainstream banking."
          colour="#2A9D8F"
          preposition="in"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Credit union members (Great Britain, millions)"
              value="2.1"
              direction="up"
              polarity="up-is-good"
              changeText="up from 1.4M in 2015 · still tiny vs Ireland (75% membership)"
              sparklineData={[1.4,1.5,1.6,1.7,1.8,1.9,2.1]}
              source="Bank of England / ABCUL — Dec 2023"
            />
            <MetricCard
              label="Credit union assets (£ billions)"
              value="3.8"
              direction="up"
              polarity="up-is-good"
              changeText="growing but still <0.1% of UK banking assets"
              sparklineData={[2,2.2,2.5,2.8,3.1,3.5,3.8]}
              source="Bank of England / ABCUL — Dec 2023"
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Credit union members (Great Britain, millions), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              annotations={chartAnnotations}
              yLabel="Credit union members (Great Britain, millions)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Credit Union Membership statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Credit union assets (£ billions), UK"
              subtitle="UK data. Source: official government statistics."
              series={[{
                id: 'sec',
                label: 'Credit union assets (£ billions)',
                colour: '#6B7280',
                data: ([2,2.2,2.5,2.8,3.1,3.5,3.8]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
              }]}
              yLabel="Credit union assets (£ billions)"
              source={{
                name: 'Bank of England / ABCUL',
                dataset: 'Credit union assets (£ billions)',
                frequency: 'annual',
                url: 'https://www.bankofengland.co.uk/prudential-regulation/credit-unions',
                date: 'Dec 2023',
              }}
            />
          </section>
        </ScrollReveal>


        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Credit Union Membership</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Credit Union Membership in the United Kingdom: the numbers show a complex picture. Only 2.1 million people — 3% of the adult population — belong to a credit union, compared to 75% in Ireland. Credit unions offer affordable loans and savings to people excluded from mainstream banking. The headline figure — 2.1 for credit union members (great britain, millions) — up from 1.4M in 2015 · still tiny vs Ireland (75% membership).</p>
              <p>The secondary metric tells an equally important story: credit union assets (£ billions) stands at 3.8, where growing but still <0.1% of UK banking assets. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
            </div>
          </section>
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <div className="space-y-2"><p><a href="https://www.bankofengland.co.uk/prudential-regulation/credit-unions" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Bank of England / ABCUL</a> — primary data source. Retrieved Dec 2023.</p><p>All figures are for England unless otherwise stated. Trend data uses the most recent available release at time of publication.</p></div>
          </div>
        </section>
      </main>
    </>
  );
}
