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
  speciesIndexFarm: number;
  speciesIndexWoodland: number;
  sssiGoodPct: number;
  sssiDamagedPct: number; }
interface TopicData { national: { timeSeries: DataPoint[] }; metadata: { sources: { name: string; dataset: string; url: string; frequency: string }[]; methodology: string; knownIssues: string[]; }; }

export default function BiodiversityLossPage() {
  const [data, setData] = useState<TopicData | null>(null);
  useEffect(() => { fetch('/data/biodiversity-loss/biodiversity_loss.json').then(r=>r.json()).then(setData).catch(console.error); }, []);
  const s1: Series[] = data ? [
    { id:'speciesIndexFarm', label:"Farmland species index", colour:"#E63946", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.speciesIndexFarm})) },
    { id:'speciesIndexWoodland', label:"Woodland species index", colour:"#264653", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.speciesIndexWoodland})) },
  ] : [];
  const s2: Series[] = data ? [
    { id:'sssiGoodPct', label:"SSSIs in favourable condition (%)", colour:"#2A9D8F", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.sssiGoodPct})) },
    { id:'sssiDamagedPct', label:"SSSIs in damaged/destroyed condition (%)", colour:"#E63946", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.sssiDamagedPct})) },
  ] : [];
  const a1: Annotation[] = [    { date: new Date(1992,0,1), label: "1992: Rio Earth Summit \u2014 biodiversity commitments" },
    { date: new Date(2021,0,1), label: "2021: Kunming-Montreal target agreed" },];
  const a2: Annotation[] = [    { date: new Date(2019,0,1), label: "2019: Environment Act target of 30\u00d730 set" },
    { date: new Date(2023,0,1), label: "2023: Biodiversity Net Gain mandatory" },];
  return (<><TopicNav topic="Biodiversity Loss" />
    <main className="max-w-5xl mx-auto px-6 py-12">
      <TopicHeader topic="Environment & Climate" question="Are Britain's Species Recovering?" finding="41% of UK species have declined in abundance since 1970; the UK is ranked 12th most nature-depleted country globally, with just 7% of protected areas in favourable condition." colour="#2A9D8F" />
      <section className="max-w-2xl mt-4 mb-12"><div className="text-base text-wiah-black leading-[1.7] space-y-4">
        <p>41% of UK species have declined in abundance since 1970; the UK is ranked 12th most nature-depleted country globally, with just 7% of protected areas in favourable condition. The data below draws on official sources to track change over the past decade.</p>
        <p>These figures reflect a structural pattern. Understanding the scale is the first step toward accountability.</p>
      </div></section>
      <SectionNav sections={[{id:'sec-overview',label:'Overview'},{id:'sec-chart1',label:"Farmland species ind"},{id:'sec-chart2',label:"SSSIs in favourable "}]} />
      <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        <MetricCard label="Species declined since 1970" value="41%" unit="" direction="flat" polarity="up-is-bad" changeText="State of Nature report \u00b7 UK 12th worst globally" sparklineData={[26,28,30,32,34,36,38,39,40,41,41]} href="#sec-chart1" />
        <MetricCard label="SSSIs in favourable condition" value="7%" unit="" direction="down" polarity="up-is-good" changeText="Down from 14% in 2015 \u00b7 target was 95% by 2010" sparklineData={[14,13,12,11,10,9,9,8,7,7,7]} href="#sec-chart2" />
        <MetricCard label="UK nature depletion global rank" value="12th worst" unit="" direction="flat" polarity="up-is-bad" changeText="Of 240 countries \u00b7 2023 State of Nature" sparklineData={[14,14,13,13,13,12,12,12,12,12,12]} href="#sec-chart1" />
      </div>
      <ScrollReveal><section id="sec-chart1" className="mb-12"><LineChart title="UK species abundance index, 1970\u20132025" subtitle="Aggregated abundance index for monitored UK species (set to 100 in 1970). Persistent decline across mammals, birds, insects and plants." series={s1} annotations={a1} /></section></ScrollReveal>
      <ScrollReveal><section id="sec-chart2" className="mb-12"><LineChart title="Protected area condition, England, 2015\u20132025" subtitle="Percentage of Sites of Special Scientific Interest (SSSIs) rated as favourable or recovering by Natural England. Only 7% are in the best condition." series={s2} annotations={a2} /></section></ScrollReveal>
      <ScrollReveal><PositiveCallout title="Biodiversity Net Gain now mandatory for new developments" value="2024" unit="Biodiversity Net Gain mandatory from Feb 2024" description="Biodiversity Net Gain (BNG) became mandatory for most new developments in England from February 2024. Developers must deliver a 10% measurable improvement in biodiversity compared to the pre-development baseline, using a standardised metric. Early data shows 85% of planning applications including a BNG assessment. The government also committed \u00a35 billion through Environmental Land Management schemes to pay farmers to deliver nature recovery on farmland." source="Source: Natural England \u2014 Biodiversity Net Gain monitoring report, 2025. DEFRA \u2014 Environmental Land Management statistics, 2025." /></ScrollReveal>
      <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
        <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
        <div className="text-sm text-wiah-mid space-y-3 font-mono">{data?.metadata.sources.map((src,i)=>(<div key={i}><a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">{src.name} — {src.dataset}</a><div className="text-xs text-wiah-mid">Updated {src.frequency}</div></div>))}</div>
        <div className="text-sm text-wiah-mid mt-6 space-y-2"><h3 className="font-bold">Methodology</h3><p>{data?.metadata.methodology}</p></div>
        <div className="text-sm text-wiah-mid mt-6 space-y-2"><h3 className="font-bold">Known issues</h3><ul className="list-disc list-inside space-y-1">{data?.metadata.knownIssues.map((x,i)=><li key={i}>{x}</li>)}</ul></div>
      </section>
    </main></>);
}
