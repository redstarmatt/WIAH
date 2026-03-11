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
  cumulativeClosures: number;
  atRiskFacilities: number;
  richestQuintilePct: number;
  poorestQuintilePct: number; }
interface TopicData { national: { timeSeries: DataPoint[] }; metadata: { sources: { name: string; dataset: string; url: string; frequency: string }[]; methodology: string; knownIssues: string[]; }; }

export default function CommunitySportFacilitiesPage() {
  const [data, setData] = useState<TopicData | null>(null);
  useEffect(() => { fetch('/data/community-sport-facilities/community_sport_facilities.json').then(r=>r.json()).then(setData).catch(console.error); }, []);
  const s1: Series[] = data ? [
    { id:'cumulativeClosures', label:"Cumulative facility closures", colour:"#E63946", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.cumulativeClosures})) },
    { id:'atRiskFacilities', label:"Facilities at risk of closure", colour:"#F4A261", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.atRiskFacilities})) },
  ] : [];
  const s2: Series[] = data ? [
    { id:'richestQuintilePct', label:"Richest quintile active (%)", colour:"#2A9D8F", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.richestQuintilePct})) },
    { id:'poorestQuintilePct', label:"Poorest quintile active (%)", colour:"#E63946", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.poorestQuintilePct})) },
  ] : [];
  const a1: Annotation[] = [    { date: new Date(2019,0,1), label: "2019: Leisure trust financial pressures mount" },
    { date: new Date(2022,0,1), label: "2022: Energy crisis forces emergency closures" },
    { date: new Date(2023,0,1), label: "2023: Government \u00a360m rescue fund" },];
  const a2: Annotation[] = [    { date: new Date(2020,0,1), label: "2020: COVID \u2014 activity patterns disrupted" },
    { date: new Date(2022,0,1), label: "2022: Cost of living reduces gym/club membership" },];
  return (<><TopicNav topic="Community Sport Facilities" />
    <main className="max-w-5xl mx-auto px-6 py-12">
      <TopicHeader topic="Democracy & Governance" question="Are Community Sports Facilities Being Lost?" finding="England lost over 1,800 public swimming pools, leisure centres and sports halls between 2010 and 2024 as council cuts bit; participation in sport has stagnated despite government targets." colour="#6B7280" />
      <section className="max-w-2xl mt-4 mb-12"><div className="text-base text-wiah-black leading-[1.7] space-y-4">
        <p>England lost over 1,800 public swimming pools, leisure centres and sports halls between 2010 and 2024 as council cuts bit; participation in sport has stagnated despite government targets. The data below draws on official sources to track change over the past decade.</p>
        <p>These figures reflect a structural pattern. Understanding the scale is the first step toward accountability.</p>
      </div></section>
      <SectionNav sections={[{id:'sec-overview',label:'Overview'},{id:'sec-chart1',label:"Cumulative facility "},{id:'sec-chart2',label:"Richest quintile act"}]} />
      <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        <MetricCard label="Public sport facility closures since 2010" value="1,800+" unit="" direction="up" polarity="up-is-bad" changeText="Pools, leisure centres, sports halls" sparklineData={[0,100,250,400,550,700,900,1100,1350,1600,1800]} href="#sec-chart1" />
        <MetricCard label="Adults active 150+ mins/week" value="63%" unit="" direction="flat" polarity="up-is-good" changeText="Government target 70% by 2030 \u00b7 stagnating" sparklineData={[57,58,59,60,61,60,61,62,63,63,63]} href="#sec-chart2" />
        <MetricCard label="Sport inequality gap (income gap)" value="24pp" unit="" direction="up" polarity="up-is-bad" changeText="Richest vs poorest quintile participation gap" sparklineData={[18,19,19,20,20,21,21,22,23,23,24]} href="#sec-chart1" />
      </div>
      <ScrollReveal><section id="sec-chart1" className="mb-12"><LineChart title="Public leisure facility closures, England, 2015-2025" subtitle="Cumulative closures of publicly accessible swimming pools, leisure centres and indoor sports halls since 2010. Source: Sport England and Swim England audits." series={s1} annotations={a1} /></section></ScrollReveal>
      <ScrollReveal><section id="sec-chart2" className="mb-12"><LineChart title="Adult sport participation by income group, England, 2015-2025" subtitle="Percentage of adults meeting CMO guidelines (150+ minutes moderate activity per week) by income quintile. Active Lives Survey methodology." series={s2} annotations={a2} /></section></ScrollReveal>
      <ScrollReveal><PositiveCallout title="Multi-Sport Grassroots Facilities Programme" value="\u00a3570m" unit="2024-2028 investment committed" description="The government committed \u00a3570 million through the Multi-Sport Grassroots Facilities Programme for 2024-28, targeting community football pitches, artificial grass pitches, cricket facilities and multi-use games areas in deprived areas. A separate \u00a360 million Leisure Recovery Fund helped stabilise swimming pools through the energy crisis. The Active Lives target of 70% of adults meeting activity guidelines by 2030 requires roughly 3 million more active adults than current levels." source="Source: Sport England \u2014 Active Lives Survey 2024-25. DCMS \u2014 Grassroots sport investment announcement, 2024." /></ScrollReveal>
      <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
        <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
        <div className="text-sm text-wiah-mid space-y-3 font-mono">{data?.metadata.sources.map((src,i)=>(<div key={i}><a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">{src.name} — {src.dataset}</a><div className="text-xs text-wiah-mid">Updated {src.frequency}</div></div>))}</div>
        <div className="text-sm text-wiah-mid mt-6 space-y-2"><h3 className="font-bold">Methodology</h3><p>{data?.metadata.methodology}</p></div>
        <div className="text-sm text-wiah-mid mt-6 space-y-2"><h3 className="font-bold">Known issues</h3><ul className="list-disc list-inside space-y-1">{data?.metadata.knownIssues.map((x,i)=><li key={i}>{x}</li>)}</ul></div>
      </section>
    </main></>);
}
