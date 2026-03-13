'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Total economic crime losses (£ billion), 2015–2025 — NCA
const lossValues = [3.6, 4.1, 4.5, 5.0, 5.4, 5.8, 6.2, 7.0, 7.8, 8.4, 8.7];

// Fraud as % of all crime, 2017–2025 — ONS CSEW
const fraudShareValues = [36, 38, 39, 40, 41, 42, 42, 42, 42];

// Fraud prosecution rate (%), 2015–2025 — Home Office
const prosecutionValues = [8.0, 7.2, 6.5, 5.8, 5.0, 4.5, 4.0, 3.5, 3.2, 3.0, 2.9];

const lossesSeries: Series[] = [
  {
    id: 'total-losses',
    label: 'Total economic crime losses (£ billion)',
    colour: '#E63946',
    data: lossValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const combinedSeries: Series[] = [
  {
    id: 'losses',
    label: 'Economic crime losses (£bn)',
    colour: '#E63946',
    data: lossValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'prosecution-rate',
    label: 'Prosecution rate (%)',
    colour: '#264653',
    data: prosecutionValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const lossesAnnotations: Annotation[] = [
  { date: new Date(2017, 0, 1), label: '2017: Fraud included in CSEW' },
  { date: new Date(2022, 0, 1), label: '2022: Economic Crime Act' },
];

const prosecutionAnnotations: Annotation[] = [
  { date: new Date(2019, 0, 1), label: '2019: Action Fraud reform announced' },
  { date: new Date(2023, 0, 1), label: '2023: Fraud Strategy published' },
];

export default function EconomicCrimeScalePage() {
  return (
    <>
      <TopicNav topic="Economic Crime Scale" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economic Crime Scale"
          question="How Much Does Economic Crime Cost Britain?"
          finding="Economic crime costs the UK an estimated £8.7 billion a year. Fraud accounts for 42% of all crime in England and Wales, yet fewer than 3% of fraud offences result in a prosecution."
          colour="#E63946"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The National Crime Agency estimates that economic crime costs the United Kingdom approximately £8.7 billion per year — up from £3.6 billion a decade ago. Fraud is by far the largest component, accounting for roughly 57% of total losses. When the ONS expanded the Crime Survey for England and Wales to include fraud and computer misuse in 2017, the total volume of crime effectively doubled overnight — revealing a category of offending that had been statistically invisible for decades. Fraud now constitutes 42% of all crime experienced by adults in England and Wales, making it the single most common crime type. Yet it receives a fraction of the policing resource devoted to other offence categories: fewer than 1% of police officers work in dedicated fraud teams.</p>
            <p>The prosecution gap is stark. In 2015, around 8% of recorded fraud offences resulted in a charge. By 2025, that figure had fallen to 2.9%. The decline reflects a combination of factors: the volume of fraud has grown far faster than enforcement capacity; much of it is cross-border and digitally enabled, making investigation complex; and Action Fraud — the national reporting centre — has been widely criticised for failing to refer viable cases for investigation. The government published a Fraud Strategy in 2023, pledging to replace Action Fraud and create a National Fraud Squad. Meanwhile, authorised push payment (APP) fraud — where victims are manipulated into transferring money directly to criminals — peaked at £583 million in 2021 before falling following new mandatory reimbursement rules introduced in October 2024.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Losses trend' },
          { id: 'sec-chart2', label: 'Losses vs prosecutions' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Total economic crime losses"
              value="£8.7B"
              unit="/yr"
              direction="up"
              polarity="up-is-bad"
              changeText="+142% since 2015 · fraud: 57% of total"
              sparklineData={[3.6, 4.1, 4.5, 5.0, 5.8, 6.2, 7.0, 8.4, 8.7]}
              source="NCA · National Strategic Assessment 2025"
              href="#sec-chart1"
            />
            <MetricCard
              label="Fraud as share of all crime"
              value="42%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="The most common crime type in England & Wales"
              sparklineData={[36, 38, 39, 40, 41, 42, 42, 42]}
              source="ONS · Crime Survey for England and Wales 2025"
              href="#sec-chart1"
            />
            <MetricCard
              label="Fraud prosecution rate"
              value="2.9%"
              unit=""
              direction="down"
              polarity="down-is-bad"
              changeText="Down from 8% in 2015 · fewer than 1% of police in fraud teams"
              sparklineData={[8.0, 7.2, 6.5, 5.0, 4.5, 4.0, 3.5, 3.0, 2.9]}
              source="Home Office · Crime Outcomes 2025"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Estimated total economic crime losses, UK, 2015–2025"
              subtitle="NCA modelled estimates. Includes fraud, money laundering, cyber-enabled crime, corruption, and tax evasion. Rising sharply."
              series={lossesSeries}
              annotations={lossesAnnotations}
              yLabel="£ billion"
              source={{ name: 'National Crime Agency', dataset: 'National Strategic Assessment of Serious and Organised Crime', url: 'https://www.nationalcrimeagency.gov.uk/what-we-do/crime-threats/fraud-and-economic-crime', frequency: 'annual', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Economic crime losses vs fraud prosecution rate, 2015–2025"
              subtitle="Losses rising; prosecution rate falling. The gap between the scale of the problem and the enforcement response is widening."
              series={combinedSeries}
              annotations={prosecutionAnnotations}
              yLabel="Value"
              source={{ name: 'NCA / Home Office', dataset: 'National Strategic Assessment / Crime Outcomes', url: 'https://www.gov.uk/government/statistics/crime-outcomes-in-england-and-wales', frequency: 'annual', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="APP fraud losses falling after mandatory reimbursement"
            value="£374M"
            description="Authorised push payment (APP) fraud peaked at £583 million in 2021. Following the Payment Systems Regulator's mandatory reimbursement rules in October 2024, losses fell to £374 million — a 36% decline from the peak. Banks are now required to reimburse victims within five business days unless gross negligence is proven, shifting financial incentives toward fraud prevention. The proportion of APP losses reimbursed rose from 59% in 2022 to 87% in 2025."
            source="Source: UK Finance — Annual Fraud Report 2025. Payment Systems Regulator — APP Fraud Performance Data 2025."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.nationalcrimeagency.gov.uk/what-we-do/crime-threats/fraud-and-economic-crime" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NCA — National Strategic Assessment of Serious and Organised Crime</a> — annual modelled estimates of economic crime losses.</p>
            <p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Crime Survey for England and Wales</a> — fraud and computer misuse included from 2017.</p>
            <p><a href="https://www.ukfinance.org.uk/policy-and-guidance/reports-and-publications/annual-fraud-report" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">UK Finance — Annual Fraud Report</a> — APP and card fraud losses. Covers UK Finance member institutions only.</p>
            <p>Total economic crime loss estimates carry significant uncertainty. Crime Survey methodology changed in 2016 to include fraud. Prosecution rates are not directly comparable pre/post 2017.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
