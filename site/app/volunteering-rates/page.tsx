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
  formalPct: number;
  informalPct: number;
  age25to44: number;
  age65plus: number; }
interface TopicData { national: { timeSeries: DataPoint[] }; metadata: { sources: { name: string; dataset: string; url: string; frequency: string }[]; methodology: string; knownIssues: string[]; }; }

export default function VolunteeringRatesPage() {
  const [data, setData] = useState<TopicData | null>(null);
  useEffect(() => { fetch('/data/volunteering-rates/volunteering_rates.json').then(r=>r.json()).then(setData).catch(console.error); }, []);
  const s1: Series[] = data ? [
    { id:'formalPct', label:"Formal volunteering (%)", colour:"#264653", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.formalPct})) },
    { id:'informalPct', label:"Informal volunteering (%)", colour:"#2A9D8F", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.informalPct})) },
  ] : [];
  const s2: Series[] = data ? [
    { id:'age25to44', label:"25-44 formal volunteering (%)", colour:"#E63946", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.age25to44})) },
    { id:'age65plus', label:"65+ formal volunteering (%)", colour:"#264653", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.age65plus})) },
  ] : [];
  const a1: Annotation[] = [    { date: new Date(2020,0,1), label: "2020: COVID \u2014 volunteering collapses then spikes" },
    { date: new Date(2021,0,1), label: "2021: Volunteers Week participation halves" },];
  const a2: Annotation[] = [    { date: new Date(2020,0,1), label: "2020: Shielding removes highest-volunteering age group" },];
  return (<><TopicNav topic="Volunteering" />
    <main className="max-w-5xl mx-auto px-6 py-12">
      <TopicHeader topic="Wellbeing & Society" question="Are People Still Volunteering?" finding="39% of adults volunteered formally at least once in 2023-24, down from 44% in 2013-14; informal volunteering fell more sharply from 63% to 51%." colour="#2A9D8F" />
      <section className="max-w-2xl mt-4 mb-12"><div className="text-base text-wiah-black leading-[1.7] space-y-4">
        <p>39% of adults volunteered formally at least once in 2023-24, down from 44% in 2013-14; informal volunteering fell more sharply from 63% to 51%. The data below draws on official sources to track change over the past decade.</p>
        <p>These figures reflect a structural pattern. Understanding the scale is the first step toward accountability.</p>
      </div></section>
      <SectionNav sections={[{id:'sec-overview',label:'Overview'},{id:'sec-chart1',label:"Formal volunteering "},{id:'sec-chart2',label:"25-44 formal volunte"}]} />
      <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        <MetricCard label="Formal volunteering at least once/year" value="39%" unit="" direction="down" polarity="up-is-bad" changeText="Down from 44% in 2013-14 \u00b7 steepest in working age" sparklineData={[44,44,43,42,41,40,38,38,39,39,39]} href="#sec-chart1" />
        <MetricCard label="Informal volunteering at least once/year" value="51%" unit="" direction="down" polarity="up-is-bad" changeText="Down from 63% in 2013-14" sparklineData={[63,62,61,60,59,57,52,50,51,51,51]} href="#sec-chart2" />
        <MetricCard label="Regular weekly volunteers" value="15%" unit="" direction="down" polarity="up-is-bad" changeText="Down from 18% \u00b7 biggest falls in 25-44 age group" sparklineData={[18,18,17,17,17,16,15,14,15,15,15]} href="#sec-chart1" />
      </div>
      <ScrollReveal><section id="sec-chart1" className="mb-12"><LineChart title="Volunteering rates by type, England, 2014\u20132025" subtitle="Percentage of adults volunteering formally (through an organisation) and informally (helping individuals outside their household). Both measures have declined since 2014." series={s1} annotations={a1} /></section></ScrollReveal>
      <ScrollReveal><section id="sec-chart2" className="mb-12"><LineChart title="Volunteering rates by age group, England, 2015\u20132025" subtitle="Formal volunteering rate broken down by age. The 25-44 age group has seen the steepest decline \u2014 time-poor working parents are the group lost." series={s2} annotations={a2} /></section></ScrollReveal>
      <ScrollReveal><PositiveCallout title="National Volunteer Week reaches record participation" value="7m+" unit="volunteer pledges during Volunteers Week 2025" description="Volunteers Week 2025 recorded over 7 million volunteer pledges \u2014 a record. The '#TimeToVolunteer' campaign, backed by all major volunteer-involving organisations, drove a 23% increase in new volunteer registrations on Do-it.org compared to 2024. NHS volunteer responders now number 1.6 million \u2014 the largest formal volunteer programme in UK history." source="Source: DCMS \u2014 Community Life Survey 2024-25. Volunteering Matters \u2014 State of volunteering report, 2025." /></ScrollReveal>
      <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
        <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
        <div className="text-sm text-wiah-mid space-y-3 font-mono">{data?.metadata.sources.map((src,i)=>(<div key={i}><a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">{src.name} — {src.dataset}</a><div className="text-xs text-wiah-mid">Updated {src.frequency}</div></div>))}</div>
        <div className="text-sm text-wiah-mid mt-6 space-y-2"><h3 className="font-bold">Methodology</h3><p>{data?.metadata.methodology}</p></div>
        <div className="text-sm text-wiah-mid mt-6 space-y-2"><h3 className="font-bold">Known issues</h3><ul className="list-disc list-inside space-y-1">{data?.metadata.knownIssues.map((x,i)=><li key={i}>{x}</li>)}</ul></div>
      </section>
    </main></>);
}
