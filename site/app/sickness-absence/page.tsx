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
  daysLostM: number;
  avgDaysPerWorker: number;
  mentalHealthPct: number;
  mskPct: number; }
interface TopicData { national: { timeSeries: DataPoint[] }; metadata: { sources: { name: string; dataset: string; url: string; frequency: string }[]; methodology: string; knownIssues: string[]; }; }

export default function SicknessAbsencePage() {
  const [data, setData] = useState<TopicData | null>(null);
  useEffect(() => { fetch('/data/sickness-absence/sickness_absence.json').then(r=>r.json()).then(setData).catch(console.error); }, []);
  const s1: Series[] = data ? [
    { id:'daysLostM', label:"Days lost (millions)", colour:"#E63946", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.daysLostM})) },
    { id:'avgDaysPerWorker', label:"Average days lost per worker", colour:"#264653", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.avgDaysPerWorker})) },
  ] : [];
  const s2: Series[] = data ? [
    { id:'mentalHealthPct', label:"Mental health share (%)", colour:"#E63946", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.mentalHealthPct})) },
    { id:'mskPct', label:"Musculoskeletal share (%)", colour:"#264653", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.mskPct})) },
  ] : [];
  const a1: Annotation[] = [    { date: new Date(2020,0,1), label: "2020: COVID \u2014 high absence but furlough distorts" },
    { date: new Date(2022,0,1), label: "2022: Post-pandemic mental health surge" },];
  const a2: Annotation[] = [    { date: new Date(2022,0,1), label: "2022: Mental health overtakes MSK" },];
  return (<><TopicNav topic="Sickness Absence" />
    <main className="max-w-5xl mx-auto px-6 py-12">
      <TopicHeader topic="Economy & Work" question="How Many Working Days Is Britain Losing to Illness?" finding="185 million working days were lost to sickness in 2023 \u2014 the highest since records began. Mental health is now the leading cause, overtaking musculoskeletal conditions." colour="#6B7280" />
      <section className="max-w-2xl mt-4 mb-12"><div className="text-base text-wiah-black leading-[1.7] space-y-4">
        <p>185 million working days were lost to sickness in 2023 — the highest since records began. Mental health is now the leading cause, overtaking musculoskeletal conditions. The data below draws on official sources to track change over the past decade.</p>
        <p>These figures reflect a structural pattern. Understanding the scale is the first step toward accountability.</p>
      </div></section>
      <SectionNav sections={[{id:'sec-overview',label:'Overview'},{id:'sec-chart1',label:"Days lost (millions)"},{id:'sec-chart2',label:"Mental health share "}]} />
      <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        <MetricCard label="Working days lost (2023)" value="185m" unit="" direction="up" polarity="up-is-bad" changeText="Record high \u00b7 up 34% since 2019" sparklineData={[137,141,145,149,148,175,168,158,172,180,185]} href="#sec-chart1" />
        <MetricCard label="Mental health share of absence" value="23%" unit="" direction="up" polarity="up-is-bad" changeText="Now top cause \u00b7 overtook back pain in 2022" sparklineData={[13,14,15,16,17,20,21,21,22,23,23]} href="#sec-chart2" />
        <MetricCard label="Cost to economy" value="\u00a343bn" unit="" direction="up" polarity="up-is-bad" changeText="CIPD estimate including reduced productivity" sparklineData={[29,30,31,33,34,38,36,37,40,42,43]} href="#sec-chart1" />
      </div>
      <ScrollReveal><section id="sec-chart1" className="mb-12"><LineChart title="Working days lost to sickness, UK, 2015\u20132025" subtitle="Estimated working days lost per year due to sickness absence. Includes self-reported short-term absence and certified long-term sick leave." series={s1} annotations={a1} /></section></ScrollReveal>
      <ScrollReveal><section id="sec-chart2" className="mb-12"><LineChart title="Sickness absence by cause, UK, 2015\u20132025" subtitle="Percentage of sickness days attributable to mental health conditions versus musculoskeletal conditions. Mental health overtook MSK as the leading cause in 2022." series={s2} annotations={a2} /></section></ScrollReveal>
      <ScrollReveal><PositiveCallout title="Fit Note reform \u2014 GPs can now recommend work adjustments" value="2022" unit="Fit Note reform introduced" description="From 2022, Fit Notes can be issued by a range of healthcare professionals, not just GPs, and can recommend specific workplace adjustments rather than just 'not fit for work'. Early evaluation shows 23% of Fit Notes in 2024 recommended a return with adjustments, up from 8% in 2021. The government also launched a Disability Action Plan targeting 1 million more disabled people in work by 2027." source="Source: ONS \u2014 Sickness absence in the labour market, 2025. DWP \u2014 Fit Note reform evaluation, 2024." /></ScrollReveal>
      <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
        <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
        <div className="text-sm text-wiah-mid space-y-3 font-mono">{data?.metadata.sources.map((src,i)=>(<div key={i}><a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">{src.name} — {src.dataset}</a><div className="text-xs text-wiah-mid">Updated {src.frequency}</div></div>))}</div>
        <div className="text-sm text-wiah-mid mt-6 space-y-2"><h3 className="font-bold">Methodology</h3><p>{data?.metadata.methodology}</p></div>
        <div className="text-sm text-wiah-mid mt-6 space-y-2"><h3 className="font-bold">Known issues</h3><ul className="list-disc list-inside space-y-1">{data?.metadata.knownIssues.map((x,i)=><li key={i}>{x}</li>)}</ul></div>
      </section>
    </main></>);
}
