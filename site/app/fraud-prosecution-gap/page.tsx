'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Fraud as share of all crime (%), 2015–2024
const fraudShareOfCrimePct = [32, 34, 35, 36, 37, 38, 39, 40, 41, 40];
// Police resources allocated to fraud (%), 2015–2024
const policeResourcesPct = [1.2, 1.1, 1.1, 1.0, 1.0, 0.9, 0.9, 1.0, 1.0, 1.0];
// Charge rate for fraud (%), 2015–2024
const chargeRatePct = [5.1, 4.8, 4.5, 4.2, 3.9, 3.6, 3.4, 3.2, 3.0, 3.0];

const chargeRateSeries: Series[] = [
  {
    id: 'charge-rate',
    label: 'Fraud charge rate (%)',
    colour: '#6B7280',
    data: chargeRatePct.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'fraud-share',
    label: 'Fraud as share of all crime (%)',
    colour: '#E63946',
    data: fraudShareOfCrimePct.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const resourceSeries: Series[] = [
  {
    id: 'police-resources',
    label: 'Police resources allocated to fraud (%)',
    colour: '#264653',
    data: policeResourcesPct.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const chargeAnnotations: Annotation[] = [
  { date: new Date(2019, 0, 1), label: '2019: HMICFRS finds Action Fraud not fit for purpose' },
  { date: new Date(2023, 0, 1), label: '2023: Fraud Strategy published' },
];

const resourceAnnotations: Annotation[] = [
  { date: new Date(2023, 0, 1), label: '2023: National Fraud Squad launched' },
];

export default function FraudProsecutionGapPage() {
  return (
    <>
      <TopicNav topic="Fraud Prosecution Gap" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Fraud Prosecution Gap"
          question="Why Is Almost No Fraud Being Prosecuted?"
          finding="Fraud accounts for 40% of crime by volume in England and Wales, but receives just 1% of police resources. The charge rate has fallen from 5% to 3% since 2015."
          colour="#6B7280"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Fraud is the most common crime in England and Wales by volume, yet it receives a vanishingly small share of police resources. The Crime Survey estimates around 4.5 million fraud offences a year — roughly 40% of all crime — while a 2023 HMICFRS inspection found just 1% of police resources dedicated to fraud investigation. Action Fraud receives around 800,000 reports annually; most are closed without investigative action because the volume overwhelms the system and individual frauds fall below the threshold for which forces can justify allocating detective time. The charge rate for fraud was approximately 3% in 2023, against 6% for all crimes combined.</p>
            <p>The National Crime Agency estimates money laundering facilitated by fraud costs the UK economy at least £12 billion a year. The Fraud Strategy published in 2023 committed to a 10% reduction in fraud by 2025, and mandatory bank reimbursement for authorised push payment fraud was introduced in October 2023. The burden falls disproportionately on older people, who are targeted by telephone and postal fraud at significantly higher rates and lose an average of £3,800 per incident. The structural gap between offending volume and investigative capacity means fraud has become effectively decriminalised in practice for most victims.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Charge Rate' },
          { id: 'sec-chart2', label: 'Resources' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Fraud as share of all crime"
              value="40%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 32% in 2015 · more common than all property crime combined"
              sparklineData={fraudShareOfCrimePct.slice(-8)}
              source="ONS · Crime Survey for England and Wales"
              href="#sec-chart1"
            />
            <MetricCard
              label="Police resources allocated"
              value="1%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="Of total officer headcount dedicated to fraud investigation"
              sparklineData={policeResourcesPct.slice(-8)}
              source="HMICFRS · State of Policing reports"
              href="#sec-chart2"
            />
            <MetricCard
              label="Fraud cases charged"
              value="3%"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="Of reported fraud cases resulting in charge · down from 5% in 2015"
              sparklineData={chargeRatePct.slice(-8)}
              source="Home Office · Crime outcomes in England and Wales"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Fraud charges vs fraud as share of crime, 2015–2024"
              subtitle="Charge rate for fraud offences (grey) compared with fraud as a share of total crime (red). The gap between prevalence and enforcement has widened every year."
              series={chargeRateSeries}
              annotations={chargeAnnotations}
              yLabel="Percentage (%)"
              source={{ name: 'Home Office / ONS', dataset: 'Crime outcomes in England and Wales; Crime Survey', url: 'https://www.gov.uk/government/statistics/crime-outcomes-in-england-and-wales-statistics', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Police resources allocated to fraud, England & Wales, 2015–2024"
              subtitle="Percentage of total police officer headcount dedicated to fraud investigation. Flat at around 1% despite fraud accounting for 40% of crime by volume."
              series={resourceSeries}
              annotations={resourceAnnotations}
              yLabel="% of police resources"
              source={{ name: 'HMICFRS', dataset: 'State of Policing', url: 'https://www.justiceinspectorates.gov.uk/hmicfrs/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="National Fraud Squad and mandatory reimbursement improving outcomes"
            value="£460m"
            unit="reimbursed to APP fraud victims 2024"
            description="The National Fraud Squad, launched in 2023, brings together police, the NCA, and HMRC in dedicated fraud investigation teams and is already improving case outcomes for high-value fraud. Mandatory APP fraud reimbursement means victims are now protected by default rather than having to prove their case. The PSR's confirmation that banks must pay out within 5 days has already returned £460 million to victims in 2024. These structural changes represent meaningful progress, even as the underlying prosecution gap remains vast."
            source="Source: PSR — APP scam reimbursement data 2024; Home Office — Fraud Strategy progress report 2024."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Crime Survey for England and Wales</a> — Annual victimisation survey. Fraud share of crime is based on CSEW estimates. Retrieved 2025.</p>
            <p><a href="https://www.gov.uk/government/statistics/crime-outcomes-in-england-and-wales-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Home Office — Crime outcomes in England and Wales</a> — Charge rate is charges as a proportion of fraud offences referred to CPS. Retrieved 2025.</p>
            <p>Fraud is significantly under-reported. The 40% share of crime figure is based on Crime Survey estimates and reflects a much larger true volume than police recorded figures suggest.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
