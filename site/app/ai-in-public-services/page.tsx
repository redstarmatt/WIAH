'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Government AI projects identified, 2019–2025 — CDDO Algorithmic Transparency Recording Standard
const aiProjectsValues = [54, 72, 98, 130, 165, 192, 215];

// Public trust in government AI (%), 2020–2025 — CDEI / Ada Lovelace Institute
const publicTrustValues = [48, 45, 42, 38, 34, 31];

// Transparency register entries, 2022–2025
const transparencyValues = [12, 28, 48, 67];

const series1: Series[] = [
  {
    id: 'ai-projects',
    label: 'Government AI projects identified',
    colour: '#264653',
    data: aiProjectsValues.map((v, i) => ({ date: new Date(2019 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'public-trust',
    label: 'Public trust in government AI (%)',
    colour: '#E63946',
    data: publicTrustValues.map((v, i) => ({ date: new Date(2020 + i, 0, 1), value: v })),
  },
  {
    id: 'transparency',
    label: 'Transparency register entries',
    colour: '#2A9D8F',
    data: transparencyValues.map((v, i) => ({ date: new Date(2022 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: A-level algorithm scandal' },
  { date: new Date(2022, 0, 1), label: '2022: Algorithmic Transparency Standard launched' },
  { date: new Date(2023, 0, 1), label: '2023: AI Safety Institute established' },
];

export default function AIInPublicServicesPage() {
  return (
    <>
      <TopicNav topic="Infrastructure & Services" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Infrastructure & Services"
          question="Do we know what the algorithms are actually deciding?"
          finding="The UK government is deploying AI across 215 identified public service projects, but only 31% are listed on any transparency register. Public trust in government use of AI has fallen to 31%, its lowest recorded level, even as promising applications in NHS diagnostics demonstrate real value."
          colour="#264653"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The A-level algorithm scandal of August 2020 remains the defining cautionary tale for AI in UK public services. When Ofqual deployed a statistical model to replace cancelled exams, it systematically downgraded students from schools in disadvantaged areas while inflating grades at private schools. Five years on, the lessons have been only partially learned. The DWP's fraud and error detection system has faced sustained criticism for disproportionately targeting disabled claimants and people in low-income households, raising serious questions about whether bias in training data is being identified before systems go live. Predictive policing tools, trialled by at least fourteen forces between 2018 and 2024, have shown similar patterns of reinforcing existing over-policing in Black and minority ethnic communities.</p>
            <p>The algorithmic transparency recording standard, introduced by CDDO in 2022, was meant to address visibility concerns. It now contains 67 entries — but researchers at the Ada Lovelace Institute estimate this covers only around 31% of known government AI projects. Compliance is voluntary, and most entries lack the technical detail needed for meaningful external scrutiny. There are genuine bright spots: the AI Safety Institute, established in November 2023, has positioned the UK as a serious player in frontier AI evaluation. The NHS AI Lab has supported the approval of over 30 AI-driven diagnostic tools through NICE, including systems for detecting diabetic eye disease and breast cancer. These successes share a common feature — rigorous evaluation frameworks, clinical trial evidence, and transparent reporting. Until algorithmic impact assessments become mandatory rather than aspirational, public trust will continue to erode.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'AI projects' },
          { id: 'sec-chart2', label: 'Trust & Transparency' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Government AI projects identified"
              value="215"
              unit="2025"
              direction="up"
              polarity="up-is-good"
              changeText="Up from 54 in 2019 · 298% increase in six years"
              sparklineData={aiProjectsValues}
              source="CDDO · Algorithmic Transparency Recording Standard 2025"
              href="#sec-chart1"
            />
            <MetricCard
              label="Public trust in government AI"
              value="31%"
              unit="2025"
              direction="down"
              polarity="up-is-good"
              changeText="-3pp change · lowest recorded level · down from 48% in 2020"
              sparklineData={publicTrustValues}
              source="CDEI / Ada Lovelace Institute · Public Attitudes Survey 2025"
              href="#sec-chart2"
            />
            <MetricCard
              label="Transparency register entries"
              value="67"
              unit="2025"
              direction="up"
              polarity="up-is-good"
              changeText="Only 31% of known projects listed · compliance is voluntary"
              sparklineData={transparencyValues}
              source="CDDO · Algorithmic Transparency Recording Standard 2025"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Government AI projects identified, UK, 2019–2025"
              subtitle="Number of AI and algorithmic decision-making projects identified across central and local government. Rapid growth with limited oversight."
              series={series1}
              annotations={annotations}
              yLabel="Projects"
              source={{ name: 'CDDO', dataset: 'Algorithmic Transparency Recording Standard & Cross-Government AI Survey', url: 'https://www.gov.uk/government/collections/algorithmic-transparency-recording-standard-hub', frequency: 'annual', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Public trust and transparency in government AI, 2020–2025"
              subtitle="Trust (%) falling as projects multiply. Transparency register entries (absolute, green) growing but covering only 31% of known deployments."
              series={series2}
              annotations={[]}
              yLabel="Trust (%) / Register entries"
              source={{ name: 'CDEI / Ada Lovelace Institute / CDDO', dataset: 'Public Attitudes to Data and AI Survey; Algorithmic Transparency Recording Standard', url: 'https://www.gov.uk/government/collections/algorithmic-transparency-recording-standard-hub', frequency: 'annual', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="AI Safety Institute and NHS AI Lab delivering results"
            value="30+"
            unit="AI diagnostic tools approved through NICE"
            description="The UK AI Safety Institute, established in November 2023, has conducted pre-deployment safety evaluations of frontier AI models and positioned the UK as a global leader in AI safety research. Meanwhile, the NHS AI Lab has supported over 30 AI diagnostic tools through NICE approval and into clinical use — including systems for detecting diabetic retinopathy, stroke, and breast cancer that are demonstrably improving patient outcomes. These programmes share rigorous evaluation frameworks, transparent performance reporting, and clinical trial evidence, setting the standard that the rest of government AI deployment should meet."
            source="Source: DSIT — AI Safety Institute annual report 2024. NHS England — AI Lab programme evaluations 2024."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/algorithmic-transparency-recording-standard-hub" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">CDDO — Algorithmic Transparency Recording Standard</a> — voluntary register of government AI and algorithmic decision-making tools.</p>
            <p><a href="https://www.adalovelaceinstitute.org" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Ada Lovelace Institute — Public Attitudes to Data and AI Survey</a> — annual survey of UK public trust in government AI use.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
