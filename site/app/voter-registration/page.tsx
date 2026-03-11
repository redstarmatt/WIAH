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
  under25Pct: number;
  over65Pct: number;
  youngPeopleM: number;
  bameM: number; }
interface TopicData { national: { timeSeries: DataPoint[] }; metadata: { sources: { name: string; dataset: string; url: string; frequency: string }[]; methodology: string; knownIssues: string[]; }; }

export default function VoterRegistrationPage() {
  const [data, setData] = useState<TopicData | null>(null);
  useEffect(() => { fetch('/data/voter-registration/voter_registration.json').then(r=>r.json()).then(setData).catch(console.error); }, []);
  const s1: Series[] = data ? [
    { id:'under25Pct', label:"18-24 registered (%)", colour:"#E63946", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.under25Pct})) },
    { id:'over65Pct', label:"65+ registered (%)", colour:"#264653", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.over65Pct})) },
  ] : [];
  const s2: Series[] = data ? [
    { id:'youngPeopleM', label:"Under-25s unregistered (millions)", colour:"#E63946", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.youngPeopleM})) },
    { id:'bameM', label:"Black/ethnic minority unregistered (millions)", colour:"#F4A261", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.bameM})) },
  ] : [];
  const a1: Annotation[] = [    { date: new Date(2014,0,1), label: "2014: Individual Electoral Registration introduced" },
    { date: new Date(2023,0,1), label: "2023: Photo ID required for voting" },];
  const a2: Annotation[] = [    { date: new Date(2023,0,1), label: "2023: Voter ID requirement begins" },];
  return (<><TopicNav topic="Voter Registration" />
    <main className="max-w-5xl mx-auto px-6 py-12">
      <TopicHeader topic="Democracy & Governance" question="How Many Eligible Voters Aren't Registered?" finding="An estimated 8.3 million eligible voters are not registered to vote in Great Britain \u2014 including 43% of 18-24 year olds and 23% of Black and minority ethnic adults." colour="#6B7280" />
      <section className="max-w-2xl mt-4 mb-12"><div className="text-base text-wiah-black leading-[1.7] space-y-4">
        <p>An estimated 8.3 million eligible voters are not registered to vote in Great Britain — including 43% of 18-24 year olds and 23% of Black and minority ethnic adults. The data below draws on official sources to track change over the past decade.</p>
        <p>These figures reflect a structural pattern. Understanding the scale is the first step toward accountability.</p>
      </div></section>
      <SectionNav sections={[{id:'sec-overview',label:'Overview'},{id:'sec-chart1',label:"18-24 registered (%)"},{id:'sec-chart2',label:"Under-25s unregister"}]} />
      <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        <MetricCard label="Eligible voters not registered" value="8.3m" unit="" direction="flat" polarity="up-is-bad" changeText="Unchanged for a decade \u00b7 structural problem" sparklineData={[8.1,8.1,8.2,8.3,8.5,8.4,8.3,8.3,8.3,8.3,8.3]} href="#sec-chart1" />
        <MetricCard label="18-24 year olds unregistered" value="43%" unit="" direction="flat" polarity="up-is-bad" changeText="Down from 55% in 2014 \u00b7 still very high" sparklineData={[55,53,51,48,46,44,43,43,43,43,43]} href="#sec-chart2" />
        <MetricCard label="Electoral register completeness" value="83%" unit="" direction="flat" polarity="up-is-good" changeText="Below pre-IER level of 91%" sparklineData={[91,87,84,83,82,83,83,83,83,83,83]} href="#sec-chart1" />
      </div>
      <ScrollReveal><section id="sec-chart1" className="mb-12"><LineChart title="Voter registration completeness by age, Great Britain, 2015\u20132025" subtitle="Percentage of eligible voters in each age group who are registered to vote. Young adults remain the most under-registered group." series={s1} annotations={a1} /></section></ScrollReveal>
      <ScrollReveal><section id="sec-chart2" className="mb-12"><LineChart title="Unregistered eligible voters by characteristic, 2019\u20132025" subtitle="Estimated number of eligible voters not on the electoral register, broken down by demographic group." series={s2} annotations={a2} /></section></ScrollReveal>
      <ScrollReveal><PositiveCallout title="Automatic registration pilot expanding" value="2024" unit="automatic registration pilot in 6 councils" description="Six English councils piloted automatic voter registration from 2024, using data matching between council tax, school and benefits records to automatically enrol eligible residents. Early results show registration rates rising by 12\u201318 percentage points in pilot areas among under-30s. A national rollout is under consultation, which the Electoral Commission estimates could add 4\u20135 million eligible voters to the register." source="Source: Electoral Commission \u2014 Automatic Voter Registration pilot evaluation, 2025." /></ScrollReveal>
      <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
        <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
        <div className="text-sm text-wiah-mid space-y-3 font-mono">{data?.metadata.sources.map((src,i)=>(<div key={i}><a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">{src.name} — {src.dataset}</a><div className="text-xs text-wiah-mid">Updated {src.frequency}</div></div>))}</div>
        <div className="text-sm text-wiah-mid mt-6 space-y-2"><h3 className="font-bold">Methodology</h3><p>{data?.metadata.methodology}</p></div>
        <div className="text-sm text-wiah-mid mt-6 space-y-2"><h3 className="font-bold">Known issues</h3><ul className="list-disc list-inside space-y-1">{data?.metadata.knownIssues.map((x,i)=><li key={i}>{x}</li>)}</ul></div>
      </section>
    </main></>);
}
