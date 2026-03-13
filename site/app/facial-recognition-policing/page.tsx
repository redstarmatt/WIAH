'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Live facial recognition deployments by police, UK, 2018–2024 — Big Brother Watch
const deploymentValues = [2, 5, 8, 6, 12, 25, 45];

// Alerts not confirmed as a genuine match (%), 2018–2024 — Big Brother Watch / force figures
const falseAlertValues = [92, 90, 87, 86, 84, 82, 80];

// Forces using LFR (count), 2018–2024
const forcesUsingValues = [1, 2, 2, 2, 3, 5, 8];

const deploymentSeries: Series[] = [
  {
    id: 'deployments',
    label: 'Live facial recognition deployments',
    colour: '#264653',
    data: deploymentValues.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
  },
];

const accuracySeries: Series[] = [
  {
    id: 'false-alerts',
    label: 'Alerts not confirmed as genuine match (%)',
    colour: '#E63946',
    data: falseAlertValues.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
  },
  {
    id: 'forces',
    label: 'Police forces using LFR',
    colour: '#6B7280',
    data: forcesUsingValues.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
  },
];

const deploymentAnnotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: Court challenge to South Wales Police' },
  { date: new Date(2022, 0, 1), label: '2022: Metropolitan Police expands LFR' },
];

export default function FacialRecognitionPolicingPage() {
  return (
    <>
      <TopicNav topic="Facial Recognition Policing" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Facial Recognition Policing"
          question="Is Police Facial Recognition Legal — and Does It Work?"
          finding="Police live facial recognition (LFR) deployments rose from 2 in 2018 to 45 in 2024. Around 80% of alerts are not confirmed matches. There is no primary legislation governing LFR — police rely on existing surveillance powers and internal policies. Courts have not ruled LFR unlawful."
          colour="#6B7280"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Live facial recognition technology — which scans faces in public against watchlists in real time — has been deployed by UK police forces with growing frequency since 2018. The Metropolitan Police, South Wales Police, and several other forces have conducted deployments at events, in shopping centres, and on busy streets, with no requirement to notify the public beyond generic signage. The number of deployments grew from approximately 2 in 2018 to over 45 in 2024, with 8 forces now using the technology. There is no primary legislation governing live facial recognition policing in the UK — forces operate under general surveillance and public order powers combined with internal codes of practice.</p>
            <p>The accuracy of LFR systems in operational conditions remains contested. Big Brother Watch analysis of early Metropolitan Police deployments found that approximately 92% of alerts were not confirmed as genuine matches — meaning the vast majority of people stopped for investigation were innocent. Accuracy has improved as systems and watchlists have been refined, but the 'false alert' rate remains around 80% in most reported deployments. The Court of Appeal ruled in 2020 that South Wales Police's use of LFR was unlawful due to insufficient legal basis and inadequate equality impact assessments, but the technology has continued to be used elsewhere. The UK government has indicated it does not intend to introduce primary legislation, preferring a code of practice approach through the National Police Chiefs' Council.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Deployments' },
          { id: 'sec-chart2', label: 'Accuracy' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="LFR deployments (2024)"
              value="45"
              unit=""
              direction="up"
              polarity="neutral"
              changeText="Up from 2 in 2018 · 8 forces now using technology"
              sparklineData={[2, 5, 8, 6, 12, 25, 45]}
              source="Big Brother Watch · Police facial recognition tracker 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Alerts not confirmed as match"
              value="80%"
              unit=""
              direction="down"
              polarity="neutral"
              changeText="Down from 92% in 2018 · still 4 in 5 alerts are false positives"
              sparklineData={[92, 90, 87, 86, 84, 82, 80]}
              source="Big Brother Watch / force disclosures 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Primary legislation governing LFR"
              value="None"
              unit=""
              direction="flat"
              polarity="neutral"
              changeText="No statutory framework · code of practice only"
              sparklineData={[0, 0, 0, 0, 0, 0, 0]}
              source="Home Office · Surveillance camera regulation 2024"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Police live facial recognition deployments, UK, 2018–2024"
              subtitle="Number of confirmed LFR deployments by UK police forces annually. Rapid growth since 2022 as Metropolitan Police expanded programme."
              series={deploymentSeries}
              annotations={deploymentAnnotations}
              yLabel="Deployments"
              source={{ name: 'Big Brother Watch', dataset: 'Police facial recognition tracker', url: 'https://bigbrotherwatch.org.uk/campaigns/face-off/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="LFR alert accuracy and forces using technology, UK, 2018–2024"
              subtitle="Percentage of LFR alerts not confirmed as genuine matches (false positive rate) and number of police forces using live facial recognition."
              series={accuracySeries}
              annotations={[]}
              yLabel="Value"
              source={{ name: 'Big Brother Watch', dataset: 'Police facial recognition tracker', url: 'https://bigbrotherwatch.org.uk/campaigns/face-off/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Voluntary code of practice published by NPCC in 2023"
            value="2023"
            description="The National Police Chiefs' Council published a voluntary code of practice for live facial recognition in 2023, setting out requirements for data protection impact assessments, watchlist governance, and public communication. The Biometrics and Surveillance Camera Commissioner has welcomed the code but called for a statutory basis. The Ada Lovelace Institute's report on facial recognition found that meaningful public consent is not possible without stronger legal safeguards. Scotland has taken a more cautious approach, with Police Scotland conducting a public consultation before any deployment. No deployment has yet taken place in Scotland."
            source="Source: NPCC — Live Facial Recognition Technology: Operational Requirements and Standards 2023. Ada Lovelace Institute — Countermeasures 2022."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://bigbrotherwatch.org.uk/campaigns/face-off/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Big Brother Watch — Face Off campaign</a> — tracking of police LFR deployments, accuracy data, and legal developments.</p>
            <p><a href="https://www.gov.uk/government/organisations/biometrics-and-surveillance-camera-commissioner" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Biometrics and Surveillance Camera Commissioner</a> — regulatory oversight and annual reports on surveillance camera use in England and Wales.</p>
            <p>Deployment and accuracy data is compiled from freedom of information requests, force press releases, and parliamentary answers. Some forces do not proactively publish operational statistics.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
