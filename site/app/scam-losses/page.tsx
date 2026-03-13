'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

export default function ScamLossesPage() {
  const totalLossesData = [1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.3];
  const appFraudData = [354, 455, 479, 583, 583, 524, 459];
  const reimbursementRateData = [21, 28, 42, 46, 48, 50, 61];

  const totalLossesSeries: Series[] = [
    {
      id: 'total',
      label: 'Total fraud and scam losses (£bn)',
      colour: '#E63946',
      data: totalLossesData.map((v: number, i: number) => ({ date: new Date(2018 + i, 0, 1), value: v })),
    },
  ];

  const appFraudSeries: Series[] = [
    {
      id: 'app',
      label: 'APP fraud losses (£m)',
      colour: '#E63946',
      data: appFraudData.map((v: number, i: number) => ({ date: new Date(2018 + i, 0, 1), value: v })),
    },
    {
      id: 'reimburse',
      label: 'Reimbursement rate (%)',
      colour: '#2A9D8F',
      data: reimbursementRateData.map((v: number, i: number) => ({ date: new Date(2018 + i, 0, 1), value: v })),
    },
  ];

  const totalLossesAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: COVID-19 scam surge' },
    { date: new Date(2022, 0, 1), label: '2022: Cost of living scams proliferate' },
  ];

  const appAnnotations: Annotation[] = [
    { date: new Date(2019, 0, 1), label: '2019: Voluntary reimbursement code' },
    { date: new Date(2024, 0, 1), label: '2024: Mandatory reimbursement in force' },
  ];

  return (
    <>
      <TopicNav topic="Scam Losses" />
      <SectionNav sections={[
        { id: 'sec-metrics', label: 'Key Metrics' },
        { id: 'sec-total', label: 'Total Losses' },
        { id: 'sec-app', label: 'APP Fraud' },
        { id: 'sec-context', label: 'Context' },
        { id: 'sec-sources', label: 'Sources' },
      ]} />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Fraud and Scams"
          question="How Much Are Scams Costing UK Consumers?"
          finding="UK consumers lost £2.3 billion to scams in 2023 — authorised push payment fraud is the fastest-growing category, with banks now mandated to reimburse victims."
          colour="#E63946"
        />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 mb-12">
            <MetricCard
              label="Total scam losses (£bn/yr)"
              value="2.3"
              direction="up"
              polarity="up-is-bad"
              changeText="up from £1.2bn in 2018 · near double in 5 years"
              sparklineData={[1.4, 1.6, 1.8, 2.0, 2.2, 2.3, 2.3]}
              source="UK Finance — Annual Fraud Report 2024"
            />
            <MetricCard
              label="APP fraud losses (£m/yr)"
              value="459"
              direction="down"
              polarity="up-is-bad"
              changeText="down from £583m peak · mandatory reimbursement driving change"
              sparklineData={[479, 583, 583, 524, 485, 459, 459]}
              source="UK Finance / PSR — 2024"
            />
            <MetricCard
              label="APP fraud reimbursement rate (%)"
              value="61"
              direction="up"
              polarity="up-is-good"
              changeText="up from 21% in 2018 · mandatory regime from Oct 2024"
              sparklineData={[28, 42, 46, 48, 50, 56, 61]}
              source="PSR — APP Scams Performance Report 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-total" className="mb-12">
            <LineChart
              title="Total fraud and scam losses, UK 2018–2024 (£bn)"
              subtitle="All reported fraud losses to individuals including authorised and unauthorised payment fraud, investment fraud, and romance scams."
              series={totalLossesSeries}
              annotations={totalLossesAnnotations}
              yLabel="Total losses (£bn)"
              source={{
                name: 'UK Finance',
                dataset: 'Annual Fraud Report',
                frequency: 'annual',
                url: 'https://www.ukfinance.org.uk/data-and-research/data/fraud/fraud-the-facts',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-app" className="mb-12">
            <LineChart
              title="APP fraud losses and reimbursement rate, UK 2018–2024"
              subtitle="Authorised push payment (APP) fraud — where victims are tricked into sending money to fraudsters — and the proportion of losses returned to victims. Right axis: reimbursement rate (%)."
              series={appFraudSeries}
              annotations={appAnnotations}
              yLabel="APP losses (£m) / Reimbursement rate (%)"
              source={{
                name: 'UK Finance / Payment Systems Regulator',
                dataset: 'APP Scams Performance Report',
                frequency: 'annual',
                url: 'https://www.psr.org.uk/our-work/app-scams/',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Fraud Victims Protected"
            value="£85,000"
            description="From October 2024, the Payment Systems Regulator's mandatory reimbursement regime requires banks to return money to victims of APP fraud within five business days, up to a maximum of £85,000 per claim. Banks on both the sending and receiving end of the fraud share the cost equally — changing incentives to invest in fraud prevention."
            source="Payment Systems Regulator, APP Fraud Reimbursement"
          />
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-context" className="max-w-2xl mb-12 mt-8">
            <h2 className="text-xl font-bold text-wiah-black mb-4">Britain has become a world centre for fraud</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>The UK loses more money to fraud per capita than almost any other developed country — a consequence of sophisticated criminal networks, a digital banking infrastructure that makes instant payments easy to exploit, and an online advertising ecosystem that enables fraudsters to reach millions at low cost. Total scam losses reached £2.3 billion in 2023, but this almost certainly underestimates the true figure: the Crime Survey for England and Wales estimated 3.6 million fraud offences in the year to March 2023, most of which are never reported to banks or police.</p>
              <p>Authorised push payment fraud — where victims are manipulated into transferring money to accounts controlled by fraudsters — is the most damaging category for individuals because historically banks treated it as the victim's fault and refused to refund losses. The 2019 voluntary reimbursement code improved matters marginally, but banks reimbursed only 46% of APP losses in 2022. The mandatory reimbursement regime introduced in October 2024 changes this: banks must now return funds within five days, funded equally by the sending and receiving bank. Early evidence suggests reimbursement rates are improving.</p>
              <p>The deeper problem is that most UK fraud originates through Meta's social media platforms and Google's advertising network — through fake investment advertisements, romance profiles, and impersonation of legitimate organisations. The Online Safety Act 2023 includes provisions requiring platforms to address fraudulent advertising, but implementation is ongoing and enforcement uncertain. International money flows — frequently through East and West African mule networks and cryptocurrency exchanges — make asset recovery extremely rare even when perpetrators are identified.</p>
            </div>
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.ukfinance.org.uk/data-and-research/data/fraud/fraud-the-facts" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">UK Finance — Annual Fraud Report</a> — the primary source for bank-reported fraud losses in the UK. Covers authorised and unauthorised payment fraud, card fraud, and account takeover.</p>
            <p>APP fraud losses and reimbursement rates from PSR APP Scams Performance Report (annual). Total scam losses from UK Finance Fraud Facts publication. Crime Survey fraud estimates from ONS Crime Survey for England and Wales. All figures are for the UK unless otherwise stated. UK Finance data covers bank-reported losses only and underestimates true consumer exposure.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
