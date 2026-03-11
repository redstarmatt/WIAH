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
  libraryCount: number;
  visitsMillions: number;
  physicalLoansMillions: number;
  digitalLoansMillions: number; }
interface TopicData { national: { timeSeries: DataPoint[] }; metadata: { sources: { name: string; dataset: string; url: string; frequency: string }[]; methodology: string; knownIssues: string[]; }; }

export default function LibraryUsagePage() {
  const [data, setData] = useState<TopicData | null>(null);
  useEffect(() => { fetch('/data/library-usage/library_usage.json').then(r=>r.json()).then(setData).catch(console.error); }, []);
  const s1: Series[] = data ? [
    { id:'libraryCount', label:"Libraries open (count)", colour:"#264653", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.libraryCount})) },
    { id:'visitsMillions', label:"Physical visits (millions/year)", colour:"#E63946", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.visitsMillions})) },
  ] : [];
  const s2: Series[] = data ? [
    { id:'physicalLoansMillions', label:"Physical book issues (millions)", colour:"#6B7280", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.physicalLoansMillions})) },
    { id:'digitalLoansMillions', label:"Digital/eBook loans (millions)", colour:"#2A9D8F", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.digitalLoansMillions})) },
  ] : [];
  const a1: Annotation[] = [    { date: new Date(2019,0,1), label: "2019: Library closures accelerate with council cuts" },
    { date: new Date(2020,0,1), label: "2020: COVID \u2014 all libraries closed temporarily" },];
  const a2: Annotation[] = [    { date: new Date(2016,0,1), label: "2016: National eLibrary deal signed" },
    { date: new Date(2020,0,1), label: "2020: Digital spike during closures" },];
  return (<><TopicNav topic="Library Usage" />
    <main className="max-w-5xl mx-auto px-6 py-12">
      <TopicHeader topic="Democracy & Governance" question="Are Public Libraries Disappearing?" finding="England lost 773 public libraries between 2010 and 2024, a 24% reduction; visits fell from 289 million in 2010 to 191 million in 2024, though digital engagement has partially offset physical decline." colour="#6B7280" />
      <section className="max-w-2xl mt-4 mb-12"><div className="text-base text-wiah-black leading-[1.7] space-y-4">
        <p>England lost 773 public libraries between 2010 and 2024, a 24% reduction; visits fell from 289 million in 2010 to 191 million in 2024, though digital engagement has partially offset physical decline. The data below draws on official sources to track change over the past decade.</p>
        <p>These figures reflect a structural pattern. Understanding the scale is the first step toward accountability.</p>
      </div></section>
      <SectionNav sections={[{id:'sec-overview',label:'Overview'},{id:'sec-chart1',label:"Libraries open (coun"},{id:'sec-chart2',label:"Physical book issues"}]} />
      <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        <MetricCard label="Libraries closed since 2010" value="773" unit="" direction="up" polarity="up-is-bad" changeText="24% of the 2010 stock \u00b7 accelerating since 2019" sparklineData={[0,48,96,145,194,243,290,390,520,650,773]} href="#sec-chart1" />
        <MetricCard label="Library visits per year (England)" value="191m" unit="" direction="down" polarity="up-is-good" changeText="Down from 289m in 2010 \u00b7 -34%" sparklineData={[289,278,266,254,242,232,210,200,195,193,191]} href="#sec-chart2" />
        <MetricCard label="eBook loans growth since 2016" value="+380%" unit="" direction="up" polarity="up-is-good" changeText="Digital partially offsets physical decline" sparklineData={[100,130,165,210,260,200,260,310,360,390,380]} href="#sec-chart1" />
      </div>
      <ScrollReveal><section id="sec-chart1" className="mb-12"><LineChart title="Public library numbers and visits, England, 2015-2025" subtitle="Number of statutory public libraries open and annual physical visitor numbers. Libraries transferred to community groups counted if still providing statutory service." series={s1} annotations={a1} /></section></ScrollReveal>
      <ScrollReveal><section id="sec-chart2" className="mb-12"><LineChart title="Library issues and digital borrowing, England, 2015-2025" subtitle="Physical book loans versus eBook and digital loans. Digital transition reflects investment in OverDrive and similar platforms alongside reduced physical stock." series={s2} annotations={a2} /></section></ScrollReveal>
      <ScrollReveal><PositiveCallout title="Public libraries: plans for an improved service" value="2025" unit="DCMS strategy published" description="The 2025 DCMS Libraries Strategy committed to a new statutory framework, digital infrastructure investment and protected funding floors for library services. The strategy includes a requirement for all upper-tier local authorities to publish library impact assessments before closures. A \u00a33 million Libraries Improvement Fund opened in 2025 to support digital transformation in deprived areas. Libraries are also being integrated into NHS social prescribing referral pathways." source="Source: CIPFA \u2014 Public library statistics 2024-25. Arts Council England \u2014 Libraries annual report 2025." /></ScrollReveal>
      <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
        <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
        <div className="text-sm text-wiah-mid space-y-3 font-mono">{data?.metadata.sources.map((src,i)=>(<div key={i}><a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">{src.name} — {src.dataset}</a><div className="text-xs text-wiah-mid">Updated {src.frequency}</div></div>))}</div>
        <div className="text-sm text-wiah-mid mt-6 space-y-2"><h3 className="font-bold">Methodology</h3><p>{data?.metadata.methodology}</p></div>
        <div className="text-sm text-wiah-mid mt-6 space-y-2"><h3 className="font-bold">Known issues</h3><ul className="list-disc list-inside space-y-1">{data?.metadata.knownIssues.map((x,i)=><li key={i}>{x}</li>)}</ul></div>
      </section>
    </main></>);
}
