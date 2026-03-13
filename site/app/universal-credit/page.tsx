'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'DWP', dataset: 'Universal Credit Statistics', url: 'https://www.gov.uk/government/collections/universal-credit-statistics', date: '2024', note: 'Monthly. Claimant numbers, deductions, conditionality' },
  { num: 2, name: 'National Audit Office', dataset: 'Universal Credit evaluations', url: 'https://www.nao.org.uk/reports/universal-credit/', date: '2023' },
  { num: 3, name: 'Institute for Fiscal Studies', dataset: 'Two-child limit analysis', url: 'https://ifs.org.uk', date: '2024' },
  { num: 4, name: 'Joseph Rowntree Foundation', dataset: 'Minimum Income Standard', url: 'https://www.jrf.org.uk/data/minimum-income-standard', date: '2024' },
];

export default function UniversalCreditPage() {
  const colour = '#F4A261';

  // Universal Credit claimants 2016–2024 (millions)
  const claimantsData = [0.4, 0.8, 1.3, 2.0, 2.7, 3.2, 5.8, 5.9, 6.0];
  const claimantsAnnotations: Annotation[] = [
    { date: new Date(2020, 2, 1), label: '2020: COVID surge in claims' },
    { date: new Date(2022, 0, 1), label: '2022: Legacy benefit migration begins' },
  ];

  const claimantsSeries: Series[] = [
    {
      id: 'claimants',
      label: 'Universal Credit claimants (millions)',
      colour: colour,
      data: claimantsData.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
    },
  ];

  // Deductions and advance payments 2018–2024 (% of claimants)
  const deductionsData = [38, 39, 40, 42, 44, 46, 35];
  const advanceData    = [21, 22, 23, 24, 25, 24, 20];

  const deductionsSeries: Series[] = [
    {
      id: 'deductions',
      label: 'Claimants with deductions (%)',
      colour: colour,
      data: deductionsData.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
    },
    {
      id: 'advance',
      label: 'Claimants with advance payment loan (%)',
      colour: '#E63946',
      data: advanceData.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
    },
  ];

  const deductionsAnnotations: Annotation[] = [
    { date: new Date(2021, 0, 1), label: '2021: Deduction cap raised to 25%' },
    { date: new Date(2022, 0, 1), label: '2022: Cap reduced to 25%' },
  ];

  return (
    <>
      <TopicNav topic="Universal Credit" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Universal Credit"
          question="Is Universal Credit Working?"
          finding="6 million people are on Universal Credit — but 2.1 million have deductions reducing their payments below subsistence — and the five-week wait causes debt and hardship for new claimants."
          colour={colour}
          preposition="with"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-claimants', label: 'Claimant Numbers' },
          { id: 'sec-deductions', label: 'Deductions' },
        ]} />

        <section id="sec-metrics" className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="UC claimants (millions)"
              value="6.0"
              direction="up"
              polarity="neutral"
              changeText="2024 · up from 400K in 2016 · includes in-work and out-of-work claimants"
              sparklineData={[0.4, 0.8, 1.3, 2.0, 2.7, 3.2, 5.8, 5.9, 6.0]}
              source="DWP — UC Management Information, 2024"
            />
            <MetricCard
              label="Claimants with deductions (millions)"
              value="2.1"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 · 35% of claimants · debt repayments cutting already-low payments"
              sparklineData={[0.9, 1.1, 1.3, 1.6, 1.9, 2.2, 2.4, 2.2, 2.1]}
              source="DWP — UC Management Information, 2024"
            />
            <MetricCard
              label="Average debt on first payment (£)"
              value="812"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 · accrued during 5-week wait · repaid through deductions · pushes claimants to food banks"
              sparklineData={[620, 650, 680, 710, 740, 780, 820, 815, 812]}
              source="DWP / NAO — Universal Credit evaluation, 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-claimants" className="mb-12">
            <LineChart
              title="Universal Credit claimants, Great Britain, 2016–2024 (millions)"
              subtitle="Total number of people claiming Universal Credit at any point in the month. The pandemic caused a near-doubling in six weeks as furlough scheme gaps were exposed."
              series={claimantsSeries}
              annotations={claimantsAnnotations}
              yLabel="Claimants (millions)"
              source={{
                name: 'DWP',
                dataset: 'Universal Credit Management Information',
                frequency: 'monthly',
                url: 'https://www.gov.uk/government/collections/universal-credit-statistics',
                date: 'Jan 2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-deductions" className="mb-12">
            <LineChart
              title="UC claimants with deductions and advance payment loans, 2018–2024 (%)"
              subtitle="Deductions reduce the monthly UC payment to recover debts owed to government (advance loans, tax credit overpayments, council tax). The deduction cap was 40% until 2021, now 25%."
              series={deductionsSeries}
              annotations={deductionsAnnotations}
              yLabel="% of claimants"
              source={{
                name: 'DWP',
                dataset: 'Universal Credit Management Information',
                frequency: 'quarterly',
                url: 'https://www.gov.uk/government/collections/universal-credit-statistics',
                date: 'Jan 2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What has improved"
            value="25%"
            unit="maximum deduction cap — down from 40% in 2019, reducing the depth of cuts to payments"
            description="The maximum deduction rate was reduced from 40% to 25% of the standard allowance in 2021, giving claimants more of their award to live on while repaying debts. The repayment period for advance loans was extended from 12 to 24 months in 2019, and then to 24 months as standard, reducing monthly repayment amounts. The Household Support Fund provided one-off grants to local authorities to support claimants in acute hardship. The taper rate — the rate at which UC reduces as earnings rise — was cut from 63p to 55p in every pound earned in 2021, improving work incentives. The two-child limit is under review following significant political pressure."
            source="Source: DWP — Universal Credit statistics 2024; NAO — Universal Credit: progress update 2023."
          />
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12 mt-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">What the data shows</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Universal Credit now supports 6 million people — around 1 in 8 adults of working age.<Cite nums={1} /> The system consolidated six legacy benefits into one monthly payment with the stated aim of making work pay and reducing complexity. In broad terms, work incentives have improved: the taper rate cut of 2021 means claimants keep more of every pound they earn. But the structural problems identified when the system was designed have not been resolved. The five-week wait — a deliberate design choice to shift the benefit from a weekly to a monthly cycle — continues to push new claimants into debt before they receive a penny.<Cite nums={2} /></p>
              <p>Around 2.1 million claimants — 35% of the total — have their monthly payment reduced by deductions.<Cite nums={1} /> These deductions repay advance payment loans (taken out to bridge the five-week wait), legacy benefit overpayments, tax credit debts, and in some cases rent arrears paid directly to landlords. The maximum deduction rate is now capped at 25% of the standard allowance — down from 40% — but for a single adult over 25 receiving £368.74 per month, a 25% deduction reduces their UC award to £276. After housing costs, this can leave nothing for food.</p>
              <p>The two-child limit — introduced in 2017, restricting child element payments to the first two children — affects around 1.5 million families and is estimated by the Institute for Fiscal Studies to be keeping 250,000 children in poverty.<Cite nums={3} /> The benefit cap, which limits total UC payments to £442 per week for families with children in London, affects around 130,000 families and has not been uprated in line with inflation. The Joseph Rowntree Foundation's Minimum Income Standard calculates that UC payments fall between 20% and 40% below what is required for a basic standard of living.<Cite nums={4} /></p>
            </div>
          </section>
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.gov.uk/government/collections/universal-credit-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DWP — Universal Credit Statistics</a> — monthly. Claimant numbers, deductions, conditionality.</p>
            <p><a href="https://www.nao.org.uk/reports/universal-credit/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">National Audit Office — Universal Credit evaluations</a></p>
            <p><a href="https://www.jrf.org.uk/data/minimum-income-standard" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Joseph Rowntree Foundation — Minimum Income Standard</a></p>
            <p>All figures are for Great Britain. Average debt on first payment is an estimate based on DWP and Trussell Trust evidence.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
