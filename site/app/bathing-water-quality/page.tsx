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
  excellentPct: number;
  poorPct: number;
  dischargeEvents: number;
  durationHours: number; }
interface TopicData { national: { timeSeries: DataPoint[] }; metadata: { sources: { name: string; dataset: string; url: string; frequency: string }[]; methodology: string; knownIssues: string[]; }; }

export default function BathingWaterQualityPage() {
  const [data, setData] = useState<TopicData | null>(null);
  useEffect(() => { fetch('/data/bathing-water-quality/bathing_water_quality.json').then(r=>r.json()).then(setData).catch(console.error); }, []);
  const s1: Series[] = data ? [
    { id:'excellentPct', label:"Excellent (%)", colour:"#2A9D8F", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.excellentPct})) },
    { id:'poorPct', label:"Poor/Sufficient (%)", colour:"#E63946", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.poorPct})) },
  ] : [];
  const s2: Series[] = data ? [
    { id:'dischargeEvents', label:"CSO discharge events (thousands)", colour:"#E63946", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.dischargeEvents})) },
    { id:'durationHours', label:"Total discharge hours (thousands)", colour:"#F4A261", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.durationHours})) },
  ] : [];
  const a1: Annotation[] = [    { date: new Date(2019,0,1), label: "2019: Sewage monitoring rollout begins" },
    { date: new Date(2023,0,1), label: "2023: Water company fines record high" },];
  const a2: Annotation[] = [    { date: new Date(2022,0,1), label: "2022: Environment Act passes" },
    { date: new Date(2023,0,1), label: "2023: Full EDM monitoring mandatory" },];
  return (<><TopicNav topic="Bathing Water Quality" />
    <main className="max-w-5xl mx-auto px-6 py-12">
      <TopicHeader topic="Environment & Climate" question="Is It Safe to Swim in the UK's Seas and Rivers?" finding="Only 52% of designated bathing waters in England were rated 'excellent' in 2024, down from 73% in 2014, as sewage overflow events doubled over the same period." colour="#2A9D8F" />
      <section className="max-w-2xl mt-4 mb-12"><div className="text-base text-wiah-black leading-[1.7] space-y-4">
        <p>Only 52% of designated bathing waters in England were rated 'excellent' in 2024, down from 73% in 2014, as sewage overflow events doubled over the same period. The data below draws on official sources to track change over the past decade.</p>
        <p>These figures reflect a structural pattern. Understanding the scale is the first step toward accountability.</p>
      </div></section>
      <SectionNav sections={[{id:'sec-overview',label:'Overview'},{id:'sec-chart1',label:"Excellent (%)"},{id:'sec-chart2',label:"CSO discharge events"}]} />
      <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        <MetricCard label="Bathing waters rated 'excellent'" value="52%" unit="" direction="down" polarity="up-is-good" changeText="Down from 73% in 2014 \u00b7 worst in a decade" sparklineData={[73,71,69,67,65,62,60,58,56,54,52]} href="#sec-chart1" />
        <MetricCard label="Sewage discharge events (England)" value="464,056" unit="" direction="up" polarity="up-is-bad" changeText="2023 figure \u00b7 up from 200k in 2014" sparklineData={[200,210,225,240,260,280,310,370,420,450,464]} href="#sec-chart2" />
        <MetricCard label="Beaches failing minimum standards" value="14%" unit="" direction="up" polarity="up-is-bad" changeText="Rated 'poor' or 'sufficient' in 2024" sparklineData={[4,5,6,7,8,9,10,11,12,13,14]} href="#sec-chart1" />
      </div>
      <ScrollReveal><section id="sec-chart1" className="mb-12"><LineChart title="Bathing water quality ratings, England, 2015-2025" subtitle="Percentage of designated bathing waters achieving each Environment Agency classification. 'Excellent' requires meeting strictest microbiological standards." series={s1} annotations={a1} /></section></ScrollReveal>
      <ScrollReveal><section id="sec-chart2" className="mb-12"><LineChart title="Sewage discharge events, England, 2015-2025" subtitle="Total recorded combined sewer overflow discharge events per year. Event Duration Monitoring data became mandatory for all overflows from 2023." series={s2} annotations={a2} /></section></ScrollReveal>
      <ScrollReveal><PositiveCallout title="Storm Overflows Discharge Reduction Plan targets" value="2050" unit="full CSO elimination target" description="Under the Environment Act 2021 and the Storm Overflows Discharge Reduction Plan, water companies are legally required to achieve near-total elimination of harmful sewage discharges at all designated bathing waters and high-priority sites by 2035, and at all sites by 2050. Investment plans submitted to Ofwat for 2025-30 include \u00a310.2 billion earmarked for storm overflow improvements \u2014 the largest single investment commitment in water company history." source="Source: Environment Agency \u2014 Bathing water quality annual report, 2025. Ofwat \u2014 PR24 final determinations, 2025." /></ScrollReveal>
      <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
        <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
        <div className="text-sm text-wiah-mid space-y-3 font-mono">{data?.metadata.sources.map((src,i)=>(<div key={i}><a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">{src.name} — {src.dataset}</a><div className="text-xs text-wiah-mid">Updated {src.frequency}</div></div>))}</div>
        <div className="text-sm text-wiah-mid mt-6 space-y-2"><h3 className="font-bold">Methodology</h3><p>{data?.metadata.methodology}</p></div>
        <div className="text-sm text-wiah-mid mt-6 space-y-2"><h3 className="font-bold">Known issues</h3><ul className="list-disc list-inside space-y-1">{data?.metadata.knownIssues.map((x,i)=><li key={i}>{x}</li>)}</ul></div>
      </section>
    </main></>);
}
