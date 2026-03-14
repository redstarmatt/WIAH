'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Ada Lovelace Institute', dataset: 'Algorithmic accountability in the public sector', url: 'https://www.adalovelaceinstitute.org/report/algorithmic-accountability/', date: '2024' },
  { num: 2, name: 'Information Commissioner\'s Office', dataset: 'Guidance on AI and data protection', url: 'https://ico.org.uk/for-organisations/guide-to-data-protection/key-dp-themes/explaining-decisions-made-with-ai/', date: '2024' },
  { num: 3, name: 'Upturn', dataset: 'Public sector algorithmic systems', url: 'https://www.adalovelaceinstitute.org/', date: '2024' },
];

interface DataPoint {
  year: number;
  algorithmicSystemsDeployed: number;
  biasIncidentsReported: number;
  transparencyDisclosures: number;
  impactAssessmentsCompleted: number;
}

interface TopicData {
  national: { timeSeries: DataPoint[] };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

export default function AlgorithmBiasPublicSectorPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/algorithm-bias-public-sector/algorithm_bias_public_sector.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'algorithmicSystemsDeployed', label: 'Algorithmic systems in use', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.algorithmicSystemsDeployed })) },
        { id: 'biasIncidentsReported', label: 'Bias incidents reported', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.biasIncidentsReported })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'transparencyDisclosures', label: 'Transparency disclosures published', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.transparencyDisclosures })) },
        { id: 'impactAssessmentsCompleted', label: 'Data protection impact assessments', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.impactAssessmentsCompleted })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'A-Level algorithm scandal' },
    { date: new Date(2022, 5, 1), label: 'DWP fraud algorithm legal challenge' },
  ];

  return (
    <>
      <TopicNav topic="Digital & Public Services" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Digital & Public Services"
          question="How Is Algorithmic Bias Affecting Public Services?"
          finding={<>The UK government now uses hundreds of algorithmic systems to inform decisions from benefit fraud detection to school admissions, yet fewer than a quarter publish meaningful transparency information about how these systems work.<Cite nums={1} /> High-profile failures — including the 2020 A-Level grading algorithm — illustrate the risks of unvalidated automated decision-making.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Public sector algorithmic systems are increasingly embedded in consequential decisions affecting citizens: DWP uses machine learning to flag potential Universal Credit fraud; police forces use predictive analytics to allocate resources; local councils use scoring systems to prioritise social care assessments; NHS trusts use algorithms to flag patients for intervention. The Ada Lovelace Institute has documented over 180 known algorithmic systems deployed by UK public bodies — and has noted that this is likely a significant undercount, given the absence of mandatory disclosure requirements.<Cite nums={1} /></p>
            <p>The 2020 A-Level grading algorithm — which downgraded thousands of students&apos; exam results based on historical school performance, disproportionately affecting state school pupils — illustrated the risks of deploying algorithmic systems in high-stakes contexts without adequate human oversight or transparency. A legal challenge to DWP&apos;s risk-scoring system for Universal Credit claimants raised similar concerns about racial bias.<Cite nums={[2, 3]} /> The UK&apos;s approach to AI regulation — favouring existing regulators and soft guidance over new legislation — means accountability gaps remain unaddressed.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Deployment and incidents' },
          { id: 'sec-chart2', label: 'Accountability' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Known algorithmic systems (govt)" value="180+" unit="" direction="up" polarity="flat" changeText={<>Likely an undercount given disclosure gaps<Cite nums={1} /></>} sparklineData={[20, 35, 55, 80, 110, 140, 160, 170, 175, 180, 180]} href="#sec-chart1" />
          <MetricCard label="With published transparency info" value="22" unit="%" direction="up" polarity="up-is-good" changeText={<>Up from near zero in 2018<Cite nums={1} /></>} sparklineData={[2, 4, 7, 10, 13, 16, 18, 20, 21, 22, 22]} href="#sec-chart2" />
          <MetricCard label="Bias incidents reported" value="31" unit="" direction="up" polarity="up-is-bad" changeText={<>Likely significant under-reporting<Cite nums={3} /></>} sparklineData={[2, 3, 5, 8, 12, 18, 24, 27, 29, 30, 31]} href="#sec-chart1" />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart title="Public sector algorithmic systems and bias incidents, 2017–2024" subtitle="Known systems deployed and documented bias or discrimination incidents" series={chart1Series} annotations={annotations} yLabel="Count" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart title="Transparency disclosures and impact assessments, 2017–2024" subtitle="Systems with public transparency information and data protection impact assessments completed" series={chart2Series} annotations={[]} yLabel="Count" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Algorithm Register" value="38" unit="entries" description={<>The Central Digital and Data Office&apos;s Algorithmic Transparency Recording Standard has 38 entries — a first step toward systematic disclosure of government algorithmic tools, though coverage remains highly partial.<Cite nums={1} /></>} source="Source: CDDO, Algorithmic Transparency Recording Standard." />
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">{src.name} — {src.dataset}</a>
                <div className="text-xs text-wiah-mid">Updated {src.frequency}</div>
              </div>
            ))}
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Methodology</h3>
            <p>{data?.metadata.methodology}</p>
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Known issues</h3>
            <ul className="list-disc list-inside space-y-1">
              {data?.metadata.knownIssues.map((issue, i) => <li key={i}>{issue}</li>)}
            </ul>
          </div>
        </section>
        <References items={editorialRefs} />
      </main>
    </>
  );
}
