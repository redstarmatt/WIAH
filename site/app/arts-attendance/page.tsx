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
  attendancePct: number;
  participationPct: number;
  londonFundingPerHead: number;
  northEastFundingPerHead: number; }
interface TopicData { national: { timeSeries: DataPoint[] }; metadata: { sources: { name: string; dataset: string; url: string; frequency: string }[]; methodology: string; knownIssues: string[]; }; }

export default function ArtsAttendancePage() {
  const [data, setData] = useState<TopicData | null>(null);
  useEffect(() => { fetch('/data/arts-attendance/arts_attendance.json').then(r=>r.json()).then(setData).catch(console.error); }, []);
  const s1: Series[] = data ? [
    { id:'attendancePct', label:"Arts attendance (%)", colour:"#264653", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.attendancePct})) },
    { id:'participationPct', label:"Active arts participation (%)", colour:"#2A9D8F", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.participationPct})) },
  ] : [];
  const s2: Series[] = data ? [
    { id:'londonFundingPerHead', label:"London funding per head (\u00a3)", colour:"#264653", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.londonFundingPerHead})) },
    { id:'northEastFundingPerHead', label:"North East funding per head (\u00a3)", colour:"#E63946", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.northEastFundingPerHead})) },
  ] : [];
  const a1: Annotation[] = [    { date: new Date(2020,0,1), label: "2020: All venues closed \u2014 COVID" },
    { date: new Date(2021,0,1), label: "2021: Partial reopening" },
    { date: new Date(2022,0,1), label: "2022: Full reopening but cost of living deters visits" },];
  const a2: Annotation[] = [    { date: new Date(2018,0,1), label: "2018: Creative People and Places expansion" },
    { date: new Date(2023,0,1), label: "2023: Let's Create strategy investment" },];
  return (<><TopicNav topic="Arts Attendance" />
    <main className="max-w-5xl mx-auto px-6 py-12">
      <TopicHeader topic="Democracy & Governance" question="Are People Still Going to Arts and Cultural Events?" finding="Arts Council England data shows 57% of adults attended a cultural event in 2024 \u2014 still 8 percentage points below the pre-pandemic 2019 figure of 65%, with class and regional gaps widening." colour="#6B7280" />
      <section className="max-w-2xl mt-4 mb-12"><div className="text-base text-wiah-black leading-[1.7] space-y-4">
        <p>Arts Council England data shows 57% of adults attended a cultural event in 2024 — still 8 percentage points below the pre-pandemic 2019 figure of 65%, with class and regional gaps widening. The data below draws on official sources to track change over the past decade.</p>
        <p>These figures reflect a structural pattern. Understanding the scale is the first step toward accountability.</p>
      </div></section>
      <SectionNav sections={[{id:'sec-overview',label:'Overview'},{id:'sec-chart1',label:"Arts attendance (%)"},{id:'sec-chart2',label:"London funding per h"}]} />
      <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        <MetricCard label="Adults attending arts events" value="57%" unit="" direction="down" polarity="up-is-good" changeText="Down from 65% in 2019 \u00b7 class gap widening" sparklineData={[63,64,65,65,65,40,50,54,55,56,57]} href="#sec-chart1" />
        <MetricCard label="Arts funding per head (real terms)" value="\u00a38.70" unit="" direction="down" polarity="up-is-good" changeText="Down 32% in real terms since 2010" sparklineData={[12.8,12.2,11.6,11.0,10.5,10.1,9.8,9.4,9.1,8.9,8.7]} href="#sec-chart2" />
        <MetricCard label="Regional arts funding gap (London vs rest)" value="6.5\u00d7" unit="" direction="up" polarity="up-is-bad" changeText="London receives 6.5\u00d7 more per head than North East" sparklineData={[4.2,4.4,4.6,4.8,5.0,5.2,5.5,5.8,6.0,6.3,6.5]} href="#sec-chart1" />
      </div>
      <ScrollReveal><section id="sec-chart1" className="mb-12"><LineChart title="Adult arts and cultural attendance, England, 2015-2025" subtitle="Percentage of adults attending or participating in arts events at least once in the past 12 months. Active Wellbeing Survey / Taking Part survey methodology." series={s1} annotations={a1} /></section></ScrollReveal>
      <ScrollReveal><section id="sec-chart2" className="mb-12"><LineChart title="Arts Council England funding per head by region, 2015-2025" subtitle="Annual Arts Council England investment per head by region (2024 prices). London concentration reflects national portfolio organisations based in the capital." series={s2} annotations={a2} /></section></ScrollReveal>
      <ScrollReveal><PositiveCallout title="Creative Industries Sector Deal targets" value="\u00a32bn" unit="export growth target by 2030" description="The UK creative industries, which employ 2.4 million people and generated \u00a3116 billion in GVA in 2023, are targeted for major expansion under the Creative Industries Sector Deal. Government has committed to growing cultural exports to \u00a32 billion annually by 2030, including boosting international touring support and removing visa barriers for UK artists performing in the EU \u2014 partially restored following post-Brexit negotiations." source="Source: Arts Council England \u2014 Taking Part survey 2024-25. DCMS \u2014 Creative Industries statistics 2025." /></ScrollReveal>
      <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
        <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
        <div className="text-sm text-wiah-mid space-y-3 font-mono">{data?.metadata.sources.map((src,i)=>(<div key={i}><a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">{src.name} — {src.dataset}</a><div className="text-xs text-wiah-mid">Updated {src.frequency}</div></div>))}</div>
        <div className="text-sm text-wiah-mid mt-6 space-y-2"><h3 className="font-bold">Methodology</h3><p>{data?.metadata.methodology}</p></div>
        <div className="text-sm text-wiah-mid mt-6 space-y-2"><h3 className="font-bold">Known issues</h3><ul className="list-disc list-inside space-y-1">{data?.metadata.knownIssues.map((x,i)=><li key={i}>{x}</li>)}</ul></div>
      </section>
    </main></>);
}
