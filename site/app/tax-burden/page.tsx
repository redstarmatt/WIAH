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
  taxGdpPct: number;
  incTaxGdpPct: number;
  personalAllowance: number;
  avgEarnings: number; }
interface TopicData { national: { timeSeries: DataPoint[] }; metadata: { sources: { name: string; dataset: string; url: string; frequency: string }[]; methodology: string; knownIssues: string[]; }; }

export default function TaxBurdenPage() {
  const [data, setData] = useState<TopicData | null>(null);
  useEffect(() => { fetch('/data/tax-burden/tax_burden.json').then(r=>r.json()).then(setData).catch(console.error); }, []);
  const s1: Series[] = data ? [
    { id:'taxGdpPct', label:"Tax/GDP (%)", colour:"#E63946", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.taxGdpPct})) },
    { id:'incTaxGdpPct', label:"Income tax/GDP (%)", colour:"#264653", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.incTaxGdpPct})) },
  ] : [];
  const s2: Series[] = data ? [
    { id:'personalAllowance', label:"Personal allowance (\u00a3)", colour:"#264653", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.personalAllowance})) },
    { id:'avgEarnings', label:"Average annual earnings (\u00a3)", colour:"#2A9D8F", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.avgEarnings})) },
  ] : [];
  const a1: Annotation[] = [    { date: new Date(2021,0,1), label: "2021: Threshold freeze begins" },
    { date: new Date(2022,0,1), label: "2022: NI rise then reversal" },];
  const a2: Annotation[] = [    { date: new Date(2021,0,1), label: "2021: Thresholds frozen until 2028" },];
  return (<><TopicNav topic="Tax Burden" />
    <main className="max-w-5xl mx-auto px-6 py-12">
      <TopicHeader topic="Economy & Work" question="Are Taxes at a 70-Year High?" finding="Tax as a share of GDP reached 37.1% in 2024-25 \u2014 the highest since 1948, driven by fiscal drag from frozen thresholds and rising National Insurance receipts." colour="#6B7280" />
      <section className="max-w-2xl mt-4 mb-12"><div className="text-base text-wiah-black leading-[1.7] space-y-4">
        <p>Tax as a share of GDP reached 37.1% in 2024-25 — the highest since 1948, driven by fiscal drag from frozen thresholds and rising National Insurance receipts. The data below draws on official sources to track change over the past decade.</p>
        <p>These figures reflect a structural pattern. Understanding the scale is the first step toward accountability.</p>
      </div></section>
      <SectionNav sections={[{id:'sec-overview',label:'Overview'},{id:'sec-chart1',label:"Tax/GDP (%)"},{id:'sec-chart2',label:"Personal allowance ("}]} />
      <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        <MetricCard label="Tax/GDP ratio" value="37.1%" unit="" direction="up" polarity="up-is-bad" changeText="Highest since 1948 \u00b7 threshold freeze biggest driver" sparklineData={[33.0,33.1,33.3,33.5,33.6,34.0,33.8,35.0,36.2,36.8,37.1]} href="#sec-chart1" />
        <MetricCard label="Extra higher-rate taxpayers (threshold freeze)" value="3.8m" unit="" direction="up" polarity="up-is-bad" changeText="By 2027-28 \u00b7 fiscal drag at scale" sparklineData={[0,0,0,0,0,0,0.5,1.5,2.5,3.2,3.8]} href="#sec-chart2" />
        <MetricCard label="Council tax real-terms rise since 2010" value="+47%" unit="" direction="up" polarity="up-is-bad" changeText="Councils allowed 5% rises annually since 2022" sparklineData={[0,5,10,16,21,26,30,35,38,43,47]} href="#sec-chart1" />
      </div>
      <ScrollReveal><section id="sec-chart1" className="mb-12"><LineChart title="UK tax as % of GDP, 2015\u20132025" subtitle="Total tax receipts as percentage of GDP. The OBR forecast a continued rise through 2027-28 as frozen thresholds pull more earners into higher bands." series={s1} annotations={a1} /></section></ScrollReveal>
      <ScrollReveal><section id="sec-chart2" className="mb-12"><LineChart title="Income tax threshold vs earnings growth, 2015\u20132025" subtitle="Personal allowance and higher-rate threshold frozen vs average earnings growth. The gap represents growing fiscal drag." series={s2} annotations={a2} /></section></ScrollReveal>
      <ScrollReveal><PositiveCallout title="Income tax threshold rising from 2028" value="2028" unit="threshold unfreeze promised" description="The Chancellor announced the income tax personal allowance and higher-rate threshold will begin rising again from 2028-29, ending the freeze. OBR modelling suggests this will remove around 1.2 million people from the higher rate over the following 3 years. The basic rate threshold had been frozen at \u00a312,570 since 2021." source="Source: HM Treasury \u2014 Autumn Budget 2024. OBR \u2014 Fiscal drag analysis, 2025." /></ScrollReveal>
      <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
        <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
        <div className="text-sm text-wiah-mid space-y-3 font-mono">{data?.metadata.sources.map((src,i)=>(<div key={i}><a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">{src.name} — {src.dataset}</a><div className="text-xs text-wiah-mid">Updated {src.frequency}</div></div>))}</div>
        <div className="text-sm text-wiah-mid mt-6 space-y-2"><h3 className="font-bold">Methodology</h3><p>{data?.metadata.methodology}</p></div>
        <div className="text-sm text-wiah-mid mt-6 space-y-2"><h3 className="font-bold">Known issues</h3><ul className="list-disc list-inside space-y-1">{data?.metadata.knownIssues.map((x,i)=><li key={i}>{x}</li>)}</ul></div>
      </section>
    </main></>);
}
