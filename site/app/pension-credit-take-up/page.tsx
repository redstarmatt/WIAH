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
  { num: 1, name: 'DWP', dataset: 'Pension Credit Take-Up Statistics', url: 'https://www.gov.uk/government/statistics/pension-credit-take-up', date: '2024', note: '850,000 eligible non-claimants; £1.7bn unclaimed annually' },
  { num: 2, name: 'DWP', dataset: 'Pension Credit Statistics — quarterly bulletin', url: 'https://www.gov.uk/government/collections/pension-credit-statistics', date: '2024' },
  { num: 3, name: 'DWP', dataset: 'Households Below Average Income (HBAI)', url: 'https://www.gov.uk/government/statistics/households-below-average-income-hbai', date: '2024', note: 'Single female pensioner poverty rate 24%' },
];

export default function PensionCreditTakeUpPage() {
  const takeUpRateData = [62, 62, 63, 63, 63, 63, 63, 62, 62, 63, 63, 63, 63, 63, 63];
  const caseloadData = [1.80, 1.79, 1.78, 1.78, 1.77, 1.76, 1.76, 1.75, 1.74, 1.73, 1.73, 1.72, 1.72, 1.71, 1.70];

  const takeUpSeries: Series[] = [
    {
      id: 'takeup',
      label: 'Pension Credit take-up rate (%)',
      colour: '#F4A261',
      data: takeUpRateData.map((v: number, i: number) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const caseloadSeries: Series[] = [
    {
      id: 'caseload',
      label: 'Pension Credit caseload (millions of households)',
      colour: '#F4A261',
      data: caseloadData.map((v: number, i: number) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const takeUpAnnotations: Annotation[] = [
    { date: new Date(2015, 0, 1), label: '2015: Digital by default — paper forms harder' },
    { date: new Date(2024, 0, 1), label: '2024: Winter Fuel Payment linked to Pension Credit' },
  ];

  const caseloadAnnotations: Annotation[] = [
    { date: new Date(2016, 0, 1), label: '2016: New State Pension reduces some entitlements' },
    { date: new Date(2024, 0, 1), label: '2024: Post-Winter Fuel surge in applications' },
  ];

  return (
    <>
      <TopicNav topic="Pension Credit" />
      <SectionNav sections={[
        { id: 'sec-metrics', label: 'Key Metrics' },
        { id: 'sec-takeup', label: 'Take-Up Rate' },
        { id: 'sec-caseload', label: 'Caseload' },
        { id: 'sec-context', label: 'Context' },
        { id: 'sec-sources', label: 'Sources' },
      ]} />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Pensioner Poverty"
          question="Why Aren't the Poorest Pensioners Claiming Pension Credit?"
          finding="Around 850,000 eligible pensioners do not claim Pension Credit — leaving £1.7 billion of support unclaimed — with non-take-up concentrated among the oldest and most isolated."
          colour="#F4A261"
        />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 mb-12">
            <MetricCard
              label="Eligible non-claimants (thousands)"
              value="850"
              direction="flat"
              polarity="up-is-bad"
              changeText="~850k eligible pensioners not claiming · barely changed in 10 years"
              sparklineData={[920, 910, 890, 880, 870, 860, 850]}
              source="DWP — Pension Credit Take-Up Statistics 2024"
            />
            <MetricCard
              label="Unclaimed value (£bn/yr)"
              value="1.7"
              direction="up"
              polarity="up-is-bad"
              changeText="£1.7bn unclaimed annually · now also includes Winter Fuel gateway"
              sparklineData={[1.3, 1.4, 1.4, 1.5, 1.5, 1.6, 1.7]}
              source="DWP — Pension Credit Take-Up Statistics 2024"
            />
            <MetricCard
              label="Take-up rate (%)"
              value="63"
              direction="flat"
              polarity="up-is-good"
              changeText="stuck at 63% · one of the lowest take-up rates for any benefit"
              sparklineData={[62, 62, 63, 63, 63, 63, 63]}
              source="DWP — Pension Credit Take-Up Statistics 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-takeup" className="mb-12">
            <LineChart
              title="Pension Credit take-up rate, England 2010–2024 (%)"
              subtitle="Percentage of eligible pensioner households receiving Pension Credit. The 63% take-up rate has barely moved despite repeated government campaigns."
              series={takeUpSeries}
              annotations={takeUpAnnotations}
              yLabel="Take-up rate (%)"
              source={{
                name: 'DWP',
                dataset: 'Pension Credit Take-Up Statistics — annual publication',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/pension-credit-take-up',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-caseload" className="mb-12">
            <LineChart
              title="Pension Credit caseload, England 2010–2024 (millions of households)"
              subtitle="Number of households receiving Pension Credit. The caseload has gradually declined as the population of those with the lowest State Pension entitlements — predominantly older women — slowly reduces."
              series={caseloadSeries}
              annotations={caseloadAnnotations}
              yLabel="Caseload (millions of households)"
              source={{
                name: 'DWP',
                dataset: 'Pension Credit Statistics — quarterly bulletin',
                frequency: 'quarterly',
                url: 'https://www.gov.uk/government/collections/pension-credit-statistics',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Applications Surging"
            value="152"
            unit="%"
            description="Following the July 2024 decision to restrict Winter Fuel Payment to Pension Credit recipients, applications for Pension Credit surged. DWP reported a 152% increase in applications in August 2024 versus August 2023. Whether this translates into sustained take-up gains — or a short burst followed by reversion — will be visible in the 2025 take-up statistics."
            source="DWP, Pension Credit Statistics"
          />
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-context" className="max-w-2xl mb-12 mt-8">
            <h2 className="text-xl font-bold text-wiah-black mb-4">Why £1.7 billion goes unclaimed every year</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Pension Credit provides a minimum weekly income guarantee — £218.15 for single pensioners and £332.95 for couples in 2024/25 — and acts as a gateway benefit for Housing Benefit, Council Tax Reduction, free NHS dental treatment, and, since winter 2024/25, the Winter Fuel Payment. Yet around 850,000 eligible households — 37% of those entitled — do not claim it, leaving an estimated £1.7 billion unclaimed annually.<Cite nums={1} /> The 63% take-up rate is one of the lowest for any major means-tested benefit and has barely moved despite repeated government awareness campaigns over more than a decade.</p>
              <p>Non-take-up concentrates heavily among the hardest-to-reach groups. The very old — particularly those aged over 80 who were not accustomed to claiming benefits during their working lives — have strong stigma against means-testing. Those without internet access cannot use the online application portal; the telephone application process can take over an hour and require documents many older people struggle to locate.<Cite nums={2} /> Single female pensioners are most exposed: they face a 24% poverty rate versus 16% for all pensioners, combining income vulnerability with the least likelihood of having a partner or family member to assist with a complex application.<Cite nums={3} /></p>
              <p>Rural and coastal areas with high concentrations of older people show the weakest claim rates, compounding geographic isolation with financial deprivation. The benefit is worth on average £3,900 per year — more than enough to prevent poverty for most eligible households — but complexity, stigma, and lack of awareness together keep a third of those entitled from ever claiming it.<Cite nums={1} /> The linking of Winter Fuel Payment to Pension Credit from autumn 2024 raised the stakes: non-claimants now lose an additional £300 per year in heating support.</p>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.gov.uk/government/statistics/pension-credit-take-up" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DWP — Pension Credit Take-Up Statistics</a> — annual publication modelling eligible population versus actual claimants. Methodology uses DWP Pensioners' Incomes Series and Family Resources Survey data.</p>
            <p>Non-claiming population estimates and unclaimed value from the same publication. Caseload data from DWP Pension Credit Statistics quarterly bulletin. Poverty rate data from DWP Households Below Average Income. All figures are for Great Britain unless otherwise stated.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
