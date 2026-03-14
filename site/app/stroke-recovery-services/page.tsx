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
  { num: 1, name: 'SSNAP', dataset: 'Sentinel Stroke National Audit Programme', url: 'https://www.strokeaudit.org/', date: '2024' },
  { num: 2, name: 'Stroke Association', dataset: 'State of the Nation: Stroke Statistics', url: 'https://www.stroke.org.uk/what-is-stroke/stroke-statistics', date: '2024' },
  { num: 3, name: 'NHS England', dataset: 'Stroke Prevention and Treatment Outcomes', url: 'https://www.england.nhs.uk/ourwork/clinical-policy/stroke/', date: '2024' },
];

interface DataPoint {
  year: number;
  strokeSurvivalRate: number;
  rehabAccessRate: number;
  thrombolysisRate: number;
  dischargeHomeRate: number;
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

export default function StrokeRecoveryServicesPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/stroke-recovery-services/stroke_recovery_services.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'strokeSurvivalRate', label: '30-day stroke survival rate (%)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.strokeSurvivalRate })) },
        { id: 'thrombolysisRate', label: 'Eligible patients receiving thrombolysis (%)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.thrombolysisRate })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'rehabAccessRate', label: 'Stroke patients accessing rehab within 72hrs (%)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.rehabAccessRate })) },
        { id: 'dischargeHomeRate', label: 'Discharged home after stroke (%)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.dischargeHomeRate })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2017, 5, 1), label: 'Hyper-acute stroke unit reconfiguration' },
    { date: new Date(2022, 5, 1), label: 'NHS Stroke programme review' },
  ];

  return (
    <>
      <TopicNav topic="Health" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health"
          question="Is Stroke Rehabilitation Adequate?"
          finding={<>Stroke survival rates have improved substantially over twenty years due to hyper-acute stroke units and thrombolysis, but rehabilitation services lag badly — fewer than half of stroke patients receive the six months of therapy recommended by NICE, and there are wide regional variations in access.<Cite nums={1} /> Around 1.3 million stroke survivors live in the UK, many with preventable ongoing disability.<Cite nums={[2, 3]} /></>}
          colour="#E63946"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Stroke is a leading cause of disability in the UK, with around 100,000 strokes occurring each year and 1.3 million stroke survivors living with its effects.<Cite nums={2} /> The development of hyper-acute stroke units and the expansion of thrombolysis — clot-busting treatment that must be given within hours of ischaemic stroke — has improved survival and acute outcomes significantly over the past two decades. The SSNAP national audit shows that the proportion of eligible patients receiving thrombolysis rose from around 11% in 2014 to over 20% in 2023, though the UK still lags behind several comparable European countries.</p>
            <p>The major gap in stroke care is rehabilitation. NICE recommends that stroke survivors receive a minimum of 45 minutes each of physiotherapy, occupational therapy and speech and language therapy per day during the acute phase, and should have access to community rehabilitation for up to six months.<Cite nums={1} /> The SSNAP audit consistently finds that these standards are not met: in 2022–23, fewer than a third of patients received the recommended therapy intensity during their hospital stay, and community rehabilitation services are described by the Stroke Association as chronically under-resourced.<Cite nums={3} /> Hundreds of thousands of stroke survivors live with disability that evidence suggests could be reduced with better rehabilitation.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-acute', label: 'Acute treatment' },
          { id: 'sec-rehab', label: 'Rehabilitation' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="30-day stroke survival rate" value="84" unit="%" direction="up" polarity="up-is-good" changeText={<>Up from 77% in 2004<Cite nums={1} /></>} sparklineData={[77, 78, 79, 80, 80, 81, 81, 82, 83, 84, 84]} href="#sec-acute" />
          <MetricCard label="Eligible patients receiving thrombolysis" value="20" unit="%" direction="up" polarity="up-is-good" changeText={<>Up from 11% in 2014<Cite nums={1} /></>} sparklineData={[11, 13, 14, 15, 16, 17, 18, 19, 19, 20, 20]} href="#sec-acute" />
          <MetricCard label="Patients meeting rehab intensity standard" value="30" unit="%" direction="flat" polarity="up-is-good" changeText={<>Target is 100%; consistently under-delivered<Cite nums={3} /></>} sparklineData={[25, 26, 27, 28, 29, 28, 29, 29, 30, 30, 30]} href="#sec-rehab" />
        </div>

        <ScrollReveal>
          <section id="sec-acute" className="mb-12">
            <LineChart title="Stroke survival and thrombolysis rates, 2010–2024" subtitle="30-day survival rate (%) and proportion of eligible patients receiving thrombolysis (%), England." series={chart1Series} annotations={annotations} yLabel="%" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-rehab" className="mb-12">
            <LineChart title="Rehabilitation access and discharge outcomes, 2015–2024" subtitle="Patients receiving rehab within 72 hours (%) and discharged home (%), England." series={chart2Series} annotations={[]} yLabel="%" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="SSNAP audit improvement" value="Top quartile" unit="units improved" description={<>The SSNAP audit has driven measurable improvement: the proportion of stroke units in the top two performance categories has risen from 27% to 52% over a decade, demonstrating what transparent outcome measurement can achieve in stroke care.<Cite nums={1} /></>} source="Source: SSNAP, Annual Report 2022–23." />
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
