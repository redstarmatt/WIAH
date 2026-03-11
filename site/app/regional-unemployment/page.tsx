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
  northEastRate: number;
  londonRate: number;
  youthNational: number;
  youthNorthEast: number; }
interface TopicData { national: { timeSeries: DataPoint[] }; metadata: { sources: { name: string; dataset: string; url: string; frequency: string }[]; methodology: string; knownIssues: string[]; }; }

export default function RegionalUnemploymentPage() {
  const [data, setData] = useState<TopicData | null>(null);
  useEffect(() => { fetch('/data/regional-unemployment/regional_unemployment.json').then(r=>r.json()).then(setData).catch(console.error); }, []);
  const s1: Series[] = data ? [
    { id:'northEastRate', label:"North East unemployment (%)", colour:"#E63946", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.northEastRate})) },
    { id:'londonRate', label:"London unemployment (%)", colour:"#264653", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.londonRate})) },
  ] : [];
  const s2: Series[] = data ? [
    { id:'youthNational', label:"Youth unemployment \u2014 national (%)", colour:"#264653", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.youthNational})) },
    { id:'youthNorthEast', label:"Youth unemployment \u2014 North East (%)", colour:"#E63946", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.youthNorthEast})) },
  ] : [];
  const a1: Annotation[] = [    { date: new Date(2020,0,1), label: "2020: COVID furlough masks true unemployment" },
    { date: new Date(2022,0,1), label: "2022: Furlough ends \u2014 regional gaps re-emerge" },];
  const a2: Annotation[] = [    { date: new Date(2020,0,1), label: "2020: Youth hardest hit by pandemic job losses" },];
  return (<><TopicNav topic="Regional Unemployment" />
    <main className="max-w-5xl mx-auto px-6 py-12">
      <TopicHeader topic="Economy & Work" question="Where in Britain Is Unemployment Worst?" finding="Unemployment in parts of the North East reaches 7.8% \u2014 nearly double the national rate of 4.2%; youth unemployment (18-24) exceeds 20% in several northern cities." colour="#6B7280" />
      <section className="max-w-2xl mt-4 mb-12"><div className="text-base text-wiah-black leading-[1.7] space-y-4">
        <p>Unemployment in parts of the North East reaches 7.8% — nearly double the national rate of 4.2%; youth unemployment (18-24) exceeds 20% in several northern cities. The data below draws on official sources to track change over the past decade.</p>
        <p>These figures reflect a structural pattern. Understanding the scale is the first step toward accountability.</p>
      </div></section>
      <SectionNav sections={[{id:'sec-overview',label:'Overview'},{id:'sec-chart1',label:"North East unemploym"},{id:'sec-chart2',label:"Youth unemployment \u2014"}]} />
      <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        <MetricCard label="National unemployment rate" value="4.2%" unit="" direction="flat" polarity="up-is-bad" changeText="Near pre-pandemic low \u00b7 but hides regional gaps" sparklineData={[5.4,5.0,4.4,4.1,3.8,4.9,4.5,3.8,4.1,4.3,4.2]} href="#sec-chart1" />
        <MetricCard label="Highest regional rate (NE)" value="7.8%" unit="" direction="up" polarity="up-is-bad" changeText="Nearly 2\u00d7 national rate" sparklineData={[8.5,7.8,7.2,6.5,6.0,8.2,7.5,6.2,7.0,7.5,7.8]} href="#sec-chart2" />
        <MetricCard label="Youth unemployment (18-24)" value="12.4%" unit="" direction="down" polarity="up-is-bad" changeText="Down from pandemic peak but structural" sparklineData={[14.2,13.8,12.9,11.8,11.2,16.4,14.8,12.2,12.8,12.6,12.4]} href="#sec-chart1" />
      </div>
      <ScrollReveal><section id="sec-chart1" className="mb-12"><LineChart title="Unemployment rates by region, UK, 2015\u20132025" subtitle="Quarterly Labour Force Survey unemployment rates by region. The North-South gap in unemployment has persisted despite multiple levelling-up programmes." series={s1} annotations={a1} /></section></ScrollReveal>
      <ScrollReveal><section id="sec-chart2" className="mb-12"><LineChart title="Youth unemployment (18-24) by region, UK, 2015\u20132025" subtitle="Unemployment rate for 18-24 year olds. Youth unemployment is significantly higher than the headline rate and more volatile." series={s2} annotations={a2} /></section></ScrollReveal>
      <ScrollReveal><PositiveCallout title="Investment Zones targeting high-unemployment areas" value="12" unit="Investment Zones in high-unemployment regions" description="The government targeted all 12 Investment Zones at areas with above-average unemployment, including South Yorkshire, West Yorkshire, the North East and Tees Valley. Each zone offers 5-year tax incentives and planning flexibilities. Early data shows 18,000 new jobs created across the zones in their first year, with higher-than-expected concentration in the manufacturing and digital sectors." source="Source: DLUHC \u2014 Investment Zones progress report, 2025. ONS \u2014 Regional labour market statistics Q4 2025." /></ScrollReveal>
      <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
        <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
        <div className="text-sm text-wiah-mid space-y-3 font-mono">{data?.metadata.sources.map((src,i)=>(<div key={i}><a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">{src.name} — {src.dataset}</a><div className="text-xs text-wiah-mid">Updated {src.frequency}</div></div>))}</div>
        <div className="text-sm text-wiah-mid mt-6 space-y-2"><h3 className="font-bold">Methodology</h3><p>{data?.metadata.methodology}</p></div>
        <div className="text-sm text-wiah-mid mt-6 space-y-2"><h3 className="font-bold">Known issues</h3><ul className="list-disc list-inside space-y-1">{data?.metadata.knownIssues.map((x,i)=><li key={i}>{x}</li>)}</ul></div>
      </section>
    </main></>);
}
