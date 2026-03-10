'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function LoanSharksPage() {

  const sparkData = [680000,720000,780000,860000,960000,1020000,1080000];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Illegal lending victims (England, estimate)',
      colour: '#E63946',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Illegal money lending prosecutions (annual)',
      colour: '#6B7280',
      data: ([75,80,82,85,83,84,84]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];
  const chartAnnotations: Annotation[] = [
    { date: new Date(2022, 0, 1), label: '2022: Credit tightens · illegal lending rises' },
  ];

  return (
    <>
      <TopicNav topic="Loan Sharks" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Loan Sharks"
          question="How Many People Are Borrowing from Illegal Lenders?"
          finding="An estimated 1.08 million people in England are borrowing from illegal money lenders — up as credit tightens. Average debt stands at £4,500 at APRs of 1,000% or more. Only 84 prosecutions were brought last year."
          colour="#E63946"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Illegal lending victims (England, estimate)"
              value="1.08M"
              direction="up"
              polarity="up-is-bad"
              changeText="rising as credit tightens · avg debt £4,500 at 1,000%+ APR"
              sparklineData={[680000,720000,780000,860000,960000,1020000,1080000]}
              source="HMRC Illegal Money Lending Team — Dec 2023"
            />
            <MetricCard
              label="Illegal money lending prosecutions (annual)"
              value="84"
              direction="flat"
              polarity="up-is-bad"
              changeText="vastly underprosecuted vs scale of problem"
              sparklineData={[75,80,82,85,83,84,84]}
              source="HMRC Illegal Money Lending Team — Dec 2023"
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Illegal lending victims (England, estimate), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              annotations={chartAnnotations}
              yLabel="Illegal lending victims (England, estimate)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Loan Sharks statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Illegal money lending prosecutions (annual), UK"
              subtitle="UK data. Source: official government statistics."
              series={[{
                id: 'sec',
                label: 'Illegal money lending prosecutions (annual)',
                colour: '#6B7280',
                data: ([75,80,82,85,83,84,84]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
              }]}
              yLabel="Illegal money lending prosecutions (annual)"
              source={{
                name: 'HMRC Illegal Money Lending Team',
                dataset: 'Illegal money lending prosecutions (annual)',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/publications/illegal-money-lending-team-annual-report',
                date: 'Dec 2023',
              }}
            />
          </section>
        </ScrollReveal>


        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Loan Sharks</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Loan Sharks in the United Kingdom: the numbers show a complex picture. An estimated 1.08 million people in England are borrowing from illegal money lenders — up as credit tightens. Average debt stands at £4,500 at APRs of 1,000% or more. Only 84 prosecutions were brought last year. The headline figure — 1.08M for illegal lending victims (england, estimate) — rising as credit tightens · avg debt £4,500 at 1,000%+ APR.</p>
              <p>The secondary metric tells an equally important story: illegal money lending prosecutions (annual) stands at 84, where vastly underprosecuted vs scale of problem. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
            </div>
          </section>
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <div className="space-y-2"><p><a href="https://www.gov.uk/government/publications/illegal-money-lending-team-annual-report" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">HMRC Illegal Money Lending Team</a> — primary data source. Retrieved Dec 2023.</p><p>All figures are for England unless otherwise stated. Trend data uses the most recent available release at time of publication.</p></div>
          </div>
        </section>
      </main>
    </>
  );
}
