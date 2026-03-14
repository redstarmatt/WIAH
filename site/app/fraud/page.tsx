'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'ONS', dataset: 'Crime Survey for England and Wales', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice', date: '2024' },
  { num: 2, name: 'HMICFRS', dataset: 'Fraud inspection report', url: 'https://www.justiceinspectorates.gov.uk/hmicfrs/', date: '2019' },
  { num: 3, name: 'Home Office', dataset: 'Crime Outcomes in England and Wales', url: 'https://www.gov.uk/government/statistics/crime-outcomes-in-england-and-wales-statistics', date: '2024' },
  { num: 4, name: 'UK Finance', dataset: 'Annual Fraud Report 2024', url: 'https://www.ukfinance.org.uk/policy-and-guidance/reports-publications' },
];

// Estimated fraud offences (millions), 2015–2024
const fraudOffencesM = [2.5, 3.2, 3.4, 3.6, 3.8, 4.1, 4.5, 3.7, 3.5, 3.8];
// Conviction rate (%), 2015–2024
const convictionRate = [3.1, 2.8, 2.5, 2.2, 1.9, 1.5, 1.2, 1.0, 0.8, 1.0];
// APP scam losses (£m), 2019–2024
const appScamLosses = [236, 354, 355, 479, 485, 460];

const offencesSeries: Series[] = [
  {
    id: 'fraud-offences',
    label: 'Estimated fraud offences (millions)',
    colour: '#E63946',
    data: fraudOffencesM.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const convictionSeries: Series[] = [
  {
    id: 'conviction-rate',
    label: 'Conviction rate (%)',
    colour: '#6B7280',
    data: convictionRate.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
  {
    id: 'app-losses',
    label: 'APP scam losses (£m)',
    colour: '#F4A261',
    data: appScamLosses.map((v, i) => ({ date: new Date(2019 + i, 5, 1), value: v })),
  },
];

const offencesAnnotations: Annotation[] = [
  { date: new Date(2019, 5, 1), label: '2019: HMICFRS finds Action Fraud not fit for purpose' },
  { date: new Date(2023, 5, 1), label: '2023: Fraud Strategy published' },
];

const convictionAnnotations: Annotation[] = [
  { date: new Date(2023, 5, 1), label: '2023: Mandatory bank reimbursement for APP fraud' },
];

export default function FraudPage() {
  return (
    <>
      <TopicNav topic="Fraud" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Fraud"
          question="Why Does Almost No Fraud Get Prosecuted?"
          finding="Fraud accounts for 41% of all crime in England and Wales — an estimated 3.8 million offences per year — yet fewer than 1% of reported cases result in a conviction."
          colour="#E63946"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The Crime Survey for England and Wales estimates 3.8 million fraud and computer misuse offences annually — more than burglary, robbery, vehicle crime, and violent crime combined.<Cite nums={[1]} /> Yet fraud remains the least-policed crime in the country. Of the roughly 900,000 cases reported to Action Fraud each year, around 80,000 are referred to police forces for investigation. Fewer than 8,000 result in charges.<Cite nums={[3]} /> The conviction rate, measured against reported cases, hovers at approximately 1%.<Cite nums={[3]} /> For most victims, reporting fraud is an exercise in documentation rather than an entry point to justice.</p>
            <p>Action Fraud, run by the City of London Police on behalf of all 43 forces in England and Wales, was established in 2009 to centralise fraud reporting. In practice it operates as a call centre and data repository, not an investigative body. An HMICFRS inspection in 2019 found the system not fit for purpose, with victims receiving little or no follow-up.<Cite nums={[2]} /> A replacement system, originally promised for 2024, has been repeatedly delayed. The Serious Fraud Office, responsible for the most complex cases, has seen its budget cut by a third in real terms since 2012 and has faced a string of high-profile case collapses.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-offences', label: 'Offences' },
          { id: 'sec-convictions', label: 'Convictions' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Estimated fraud offences"
              value="3.8m"
              unit="/year"
              direction="up"
              polarity="up-is-bad"
              changeText="41% of all crime · CSEW 2024 estimate"
              sparklineData={fraudOffencesM.slice(-8)}
              source="ONS · Crime Survey for England and Wales 2024"
              href="#sec-offences"
            />
            <MetricCard
              label="Fraud conviction rate"
              value="~1%"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="Of reported cases · down from 3% in 2015"
              sparklineData={convictionRate.slice(-8)}
              source="Home Office · Crime Outcomes 2024"
              href="#sec-convictions"
            />
            <MetricCard
              label="APP scam losses"
              value="£485m"
              unit="/year"
              direction="up"
              polarity="up-is-bad"
              changeText="Authorised push payment fraud · 2023"
              sparklineData={appScamLosses}
              source="UK Finance · Fraud Report 2024"
              href="#sec-offences"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-offences" className="mb-12">
            <LineChart
              title="Estimated fraud offences, England & Wales, 2015–2024"
              subtitle="Crime Survey for England and Wales estimates. Includes fraud and computer misuse. Fraud accounts for more than all other property crime combined."
              series={offencesSeries}
              annotations={offencesAnnotations}
              yLabel="Offences (millions)"
              source={{ name: 'ONS', dataset: 'Crime Survey for England and Wales', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-convictions" className="mb-12">
            <LineChart
              title="Fraud conviction rate and APP scam losses, 2015–2024"
              subtitle="Convictions as a percentage of reported fraud cases (grey) alongside authorised push payment scam losses in £m (amber). Both trends show the inadequacy of current enforcement."
              series={convictionSeries}
              annotations={convictionAnnotations}
              yLabel="Rate (%) / Losses (£m)"
              source={{ name: 'Home Office / UK Finance', dataset: 'Crime Outcomes in England and Wales / Annual Fraud Report', url: 'https://www.gov.uk/government/statistics/crime-outcomes-in-england-and-wales-statistics', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Mandatory bank reimbursement introduced in 2023"
            value="£460m"
            unit="reimbursed to APP fraud victims in 2024"
            description="Mandatory reimbursement for authorised push payment fraud, introduced in October 2023, requires banks to refund victims of scams in most circumstances. In 2024, £460 million was reimbursed — a significant improvement for victims. The National Fraud Squad, launched in 2023, brings together police, the NCA, and HMRC in dedicated fraud investigation teams. Early results show improved case outcomes, though the scale of the problem means these remain drops in the ocean of total fraud losses."
            source="Source: PSR — APP scam reimbursement data 2024; Home Office — Fraud Strategy progress report 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Crime Survey for England and Wales</a> — Annual victimisation survey including fraud estimates. Retrieved 2025.</p>
            <p><a href="https://www.gov.uk/government/statistics/crime-outcomes-in-england-and-wales-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Home Office — Crime Outcomes in England and Wales</a> — Charge rates by crime type. Retrieved 2025.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
