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
  activePct: number;
  inactivePct: number;
  leastDeprivedPct: number;
  mostDeprivedPct: number; }
interface TopicData { national: { timeSeries: DataPoint[] }; metadata: { sources: { name: string; dataset: string; url: string; frequency: string }[]; methodology: string; knownIssues: string[]; }; }

export default function PhysicalActivityPage() {
  const [data, setData] = useState<TopicData | null>(null);
  useEffect(() => { fetch('/data/physical-activity/physical_activity.json').then(r=>r.json()).then(setData).catch(console.error); }, []);
  const s1: Series[] = data ? [
    { id:'activePct', label:"Adults active (150+ mins/week) (%)", colour:"#2A9D8F", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.activePct})) },
    { id:'inactivePct', label:"Adults inactive (<30 mins/week) (%)", colour:"#E63946", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.inactivePct})) },
  ] : [];
  const s2: Series[] = data ? [
    { id:'leastDeprivedPct', label:"Least deprived \u2014 active (%)", colour:"#2A9D8F", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.leastDeprivedPct})) },
    { id:'mostDeprivedPct', label:"Most deprived \u2014 active (%)", colour:"#E63946", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.mostDeprivedPct})) },
  ] : [];
  const a1: Annotation[] = [    { date: new Date(2020,0,1), label: "2020: Pandemic \u2014 walking boom but gyms close" },
    { date: new Date(2023,0,1), label: "2023: Women's Sport strategy launched" },];
  const a2: Annotation[] = [    { date: new Date(2019,0,1), label: "2019: Sport England Uniting the Nation strategy" },
    { date: new Date(2023,0,1), label: "2023: \u00a3100m community sports investment" },];
  return (<><TopicNav topic="Physical Activity" />
    <main className="max-w-5xl mx-auto px-6 py-12">
      <TopicHeader topic="Wellbeing & Society" question="Is Britain Getting More Active?" finding="61.7% of adults met recommended physical activity guidelines in 2023-24, up from 56% pre-pandemic \u2014 but activity is sharply stratified by deprivation: 70% in wealthiest areas vs 51% in most deprived." colour="#2A9D8F" />
      <section className="max-w-2xl mt-4 mb-12"><div className="text-base text-wiah-black leading-[1.7] space-y-4">
        <p>61.7% of adults met recommended physical activity guidelines in 2023-24, up from 56% pre-pandemic — but activity is sharply stratified by deprivation: 70% in wealthiest areas vs 51% in most deprived. The data below draws on official sources to track change over the past decade.</p>
        <p>These figures reflect a structural pattern. Understanding the scale is the first step toward accountability.</p>
      </div></section>
      <SectionNav sections={[{id:'sec-overview',label:'Overview'},{id:'sec-chart1',label:"Adults active (150+ "},{id:'sec-chart2',label:"Least deprived \u2014 act"}]} />
      <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        <MetricCard label="Adults meeting activity guidelines" value="61.7%" unit="" direction="up" polarity="up-is-good" changeText="Up from 56% in 2015 \u00b7 progress uneven" sparklineData={[56,57,58,59,60,55,59,60,61,61.5,61.7]} href="#sec-chart1" />
        <MetricCard label="Deprivation activity gap" value="19pp" unit="" direction="flat" polarity="up-is-bad" changeText="70% wealthiest vs 51% most deprived" sparklineData={[17,17,18,18,18,20,20,20,19,19,19]} href="#sec-chart2" />
        <MetricCard label="Children meeting daily hour guideline" value="47%" unit="" direction="up" polarity="up-is-good" changeText="Slowly improving \u00b7 still below 2012 target" sparklineData={[21,23,25,30,35,20,35,40,43,45,47]} href="#sec-chart1" />
      </div>
      <ScrollReveal><section id="sec-chart1" className="mb-12"><LineChart title="Adults meeting physical activity guidelines, England, 2015\u20132025" subtitle="Percentage of adults achieving at least 150 minutes of moderate activity or 75 minutes of vigorous activity per week. Measured by Sport England Active Lives Survey." series={s1} annotations={a1} /></section></ScrollReveal>
      <ScrollReveal><section id="sec-chart2" className="mb-12"><LineChart title="Physical activity deprivation gap, England, 2015\u20132025" subtitle="Activity rates in least and most deprived quintiles of the Index of Multiple Deprivation. The gap between richest and poorest has not narrowed despite multiple sport strategies." series={s2} annotations={a2} /></section></ScrollReveal>
      <ScrollReveal><PositiveCallout title="Walking and cycling infrastructure investment up" value="\u00a33bn" unit="Active Travel England investment 2021-25" description="Active Travel England, the government's new agency for walking and cycling, oversaw \u00a33 billion in investment in cycling and walking infrastructure between 2021 and 2025. The number of daily cycling trips increased by 14% over the period. Cycle lane coverage in English cities doubled. School streets programmes \u2014 temporary road closures at school drop-off times \u2014 now operate at 1,200 schools." source="Source: Active Travel England \u2014 programme statistics, 2025. Sport England \u2014 Active Lives Adult Survey, 2024-25." /></ScrollReveal>
      <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
        <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
        <div className="text-sm text-wiah-mid space-y-3 font-mono">{data?.metadata.sources.map((src,i)=>(<div key={i}><a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">{src.name} — {src.dataset}</a><div className="text-xs text-wiah-mid">Updated {src.frequency}</div></div>))}</div>
        <div className="text-sm text-wiah-mid mt-6 space-y-2"><h3 className="font-bold">Methodology</h3><p>{data?.metadata.methodology}</p></div>
        <div className="text-sm text-wiah-mid mt-6 space-y-2"><h3 className="font-bold">Known issues</h3><ul className="list-disc list-inside space-y-1">{data?.metadata.knownIssues.map((x,i)=><li key={i}>{x}</li>)}</ul></div>
      </section>
    </main></>);
}
