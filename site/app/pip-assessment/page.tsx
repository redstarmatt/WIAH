'use client';
import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

interface DataPoint { year: number;
  totalClaimantsM: number;
  newAwardsThousands: number;
  mrSuccessPct: number;
  tribunalSuccessPct: number; }
interface TopicData { national: { timeSeries: DataPoint[] }; metadata: { sources: { name: string; dataset: string; url: string; frequency: string }[]; methodology: string; knownIssues: string[]; }; }

export default function PipAssessmentPage() {
  const [data, setData] = useState<TopicData | null>(null);
  useEffect(() => { fetch('/data/pip-assessment/pip_assessment.json').then(r=>r.json()).then(setData).catch(console.error); }, []);
  const s1: Series[] = data ? [
    { id:'totalClaimantsM', label:"Total claimants (millions)", colour:"#264653", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.totalClaimantsM})) },
    { id:'newAwardsThousands', label:"New awards (thousands/year)", colour:"#2A9D8F", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.newAwardsThousands})) },
  ] : [];
  const s2: Series[] = data ? [
    { id:'mrSuccessPct', label:"Mandatory reconsideration success (%)", colour:"#F4A261", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.mrSuccessPct})) },
    { id:'tribunalSuccessPct', label:"Tribunal success (%)", colour:"#E63946", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.tribunalSuccessPct})) },
  ] : [];
  const a1: Annotation[] = [    { date: new Date(2017,0,1), label: "2017: DLA to PIP reassessment begins" },
    { date: new Date(2023,0,1), label: "2023: Managed migration from legacy benefits" },];
  const a2: Annotation[] = [    { date: new Date(2022,0,1), label: "2022: Tribunal backlog hits 300,000" },
    { date: new Date(2024,0,1), label: "2024: PIP reform consultation" },];
  return (<><TopicNav topic="PIP Assessment" />
    <main className="max-w-5xl mx-auto px-6 py-12">
      <TopicHeader topic="Poverty & Cost of Living" question="How Hard Is It to Claim Disability Benefits?" finding="3.7 million people claim Personal Independence Payment; 73% who appeal a rejected claim succeed at tribunal. Assessment waiting times exceed 26 weeks in some regions." colour="#F4A261" />
      <section className="max-w-2xl mt-4 mb-12"><div className="text-base text-wiah-black leading-[1.7] space-y-4">
        <p>3.7 million people claim Personal Independence Payment; 73% who appeal a rejected claim succeed at tribunal. Assessment waiting times exceed 26 weeks in some regions. The data below draws on official sources to track change over the past decade.</p>
        <p>These figures reflect a structural pattern. Understanding the scale is the first step toward accountability.</p>
      </div></section>
      <SectionNav sections={[{id:'sec-overview',label:'Overview'},{id:'sec-chart1',label:"Total claimants (mil"},{id:'sec-chart2',label:"Mandatory reconsider"}]} />
      <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        <MetricCard label="PIP claimants" value="3.7m" unit="" direction="up" polarity="up-is-bad" changeText="Up from 1.6m in 2015 \u00b7 growing fast" sparklineData={[1.6,1.9,2.2,2.5,2.8,3.0,3.1,3.2,3.4,3.6,3.7]} href="#sec-chart1" />
        <MetricCard label="Appeals won by claimant" value="73%" unit="" direction="up" polarity="up-is-bad" changeText="Of mandatory reconsideration + tribunal appeals" sparklineData={[55,58,60,62,64,67,68,70,72,73,73]} href="#sec-chart2" />
        <MetricCard label="Average assessment wait" value="21 weeks" unit="" direction="up" polarity="up-is-bad" changeText="Up from 12 weeks in 2019 \u00b7 some regions 26 weeks+" sparklineData={[8,9,10,12,12,15,16,17,18,20,21]} href="#sec-chart1" />
      </div>
      <ScrollReveal><section id="sec-chart1" className="mb-12"><LineChart title="PIP caseload and new awards, England & Wales, 2015\u20132025" subtitle="Total PIP claimants and annual new awards. Growth has been driven by mental health conditions and rising applications from younger adults." series={s1} annotations={a1} /></section></ScrollReveal>
      <ScrollReveal><section id="sec-chart2" className="mb-12"><LineChart title="PIP appeal outcomes, 2015\u20132025" subtitle="Percentage of PIP appeals at mandatory reconsideration and First-tier Tribunal that are decided in the claimant's favour. High overturn rates suggest initial decision-making quality issues." series={s2} annotations={a2} /></section></ScrollReveal>
      <ScrollReveal><PositiveCallout title="Removing mandatory reconsideration for some conditions" value="2025" unit="automatic awards for some long-term conditions" description="From 2025, DWP introduced automatic award renewals without reassessment for claimants with long-term, non-improving conditions \u2014 initially covering motor neurone disease, terminal illness and some severe progressive conditions. This removes approximately 100,000 people per year from the reassessment cycle. The government also committed to replacing paper forms with digital assessment tools." source="Source: DWP \u2014 PIP statistics quarterly, 2025. HMCTS \u2014 Tribunal statistics Q4 2025." /></ScrollReveal>
      <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
        <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
        <div className="text-sm text-wiah-mid space-y-3 font-mono">{data?.metadata.sources.map((src,i)=>(<div key={i}><a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">{src.name} — {src.dataset}</a><div className="text-xs text-wiah-mid">Updated {src.frequency}</div></div>))}</div>
        <div className="text-sm text-wiah-mid mt-6 space-y-2"><h3 className="font-bold">Methodology</h3><p>{data?.metadata.methodology}</p></div>
        <div className="text-sm text-wiah-mid mt-6 space-y-2"><h3 className="font-bold">Known issues</h3><ul className="list-disc list-inside space-y-1">{data?.metadata.knownIssues.map((x,i)=><li key={i}>{x}</li>)}</ul></div>
      </section>
    </main></>);
}
