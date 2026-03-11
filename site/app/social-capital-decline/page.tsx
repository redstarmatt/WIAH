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
  neighbourTrustPct: number;
  belongingPct: number;
  govTrustPct: number;
  volunteeringPct: number; }
interface TopicData { national: { timeSeries: DataPoint[] }; metadata: { sources: { name: string; dataset: string; url: string; frequency: string }[]; methodology: string; knownIssues: string[]; }; }

export default function SocialCapitalDeclinePage() {
  const [data, setData] = useState<TopicData | null>(null);
  useEffect(() => { fetch('/data/social-capital-decline/social_capital_decline.json').then(r=>r.json()).then(setData).catch(console.error); }, []);
  const s1: Series[] = data ? [
    { id:'neighbourTrustPct', label:"Trust neighbours in crisis (%)", colour:"#264653", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.neighbourTrustPct})) },
    { id:'belongingPct', label:"Feel belonging to neighbourhood (%)", colour:"#2A9D8F", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.belongingPct})) },
  ] : [];
  const s2: Series[] = data ? [
    { id:'govTrustPct', label:"Trust in national government (%)", colour:"#E63946", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.govTrustPct})) },
    { id:'volunteeringPct', label:"Regular volunteering (%)", colour:"#6B7280", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.volunteeringPct})) },
  ] : [];
  const a1: Annotation[] = [    { date: new Date(2020,0,1), label: "2020: COVID \u2014 temporary community surge" },
    { date: new Date(2021,0,1), label: "2021: Community connections decline post-lockdown" },];
  const a2: Annotation[] = [    { date: new Date(2016,0,1), label: "2016: Brexit referendum \u2014 trust polarises" },
    { date: new Date(2022,0,1), label: "2022: Cost of living crisis deepens disengagement" },];
  return (<><TopicNav topic="Social Capital Decline" />
    <main className="max-w-5xl mx-auto px-6 py-12">
      <TopicHeader topic="Democracy & Governance" question="Are We Losing the Ties That Bind Communities Together?" finding="Only 34% of adults in England say they can rely on people in their neighbourhood in a crisis \u2014 down from 47% in 2011; trust in most institutions has fallen sharply since 2019." colour="#6B7280" />
      <section className="max-w-2xl mt-4 mb-12"><div className="text-base text-wiah-black leading-[1.7] space-y-4">
        <p>Only 34% of adults in England say they can rely on people in their neighbourhood in a crisis — down from 47% in 2011; trust in most institutions has fallen sharply since 2019. The data below draws on official sources to track change over the past decade.</p>
        <p>These figures reflect a structural pattern. Understanding the scale is the first step toward accountability.</p>
      </div></section>
      <SectionNav sections={[{id:'sec-overview',label:'Overview'},{id:'sec-chart1',label:"Trust neighbours in "},{id:'sec-chart2',label:"Trust in national go"}]} />
      <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        <MetricCard label="Adults who trust neighbours" value="34%" unit="" direction="down" polarity="up-is-good" changeText="Down from 47% in 2011 \u00b7 steepest fall post-pandemic" sparklineData={[47,46,44,43,41,39,36,35,34,34,34]} href="#sec-chart1" />
        <MetricCard label="Regular volunteering (monthly+)" value="22%" unit="" direction="down" polarity="up-is-good" changeText="Down from 29% in 2013 \u00b7 time poverty cited" sparklineData={[29,28,27,26,25,22,21,21,22,22,22]} href="#sec-chart2" />
        <MetricCard label="Trust in national government" value="18%" unit="" direction="down" polarity="up-is-good" changeText="Ipsos/KCL 2025 \u00b7 near all-time low" sparklineData={[32,30,28,26,24,25,22,20,19,18,18]} href="#sec-chart1" />
      </div>
      <ScrollReveal><section id="sec-chart1" className="mb-12"><LineChart title="Social trust and neighbourliness indicators, England, 2015-2025" subtitle="Community Wellbeing Survey: percentage of adults agreeing they can rely on people in their neighbourhood and that they feel a sense of belonging." series={s1} annotations={a1} /></section></ScrollReveal>
      <ScrollReveal><section id="sec-chart2" className="mb-12"><LineChart title="Institutional trust and civic participation, UK, 2015-2025" subtitle="Percentage trusting national government and percentage volunteering at least monthly. Both trend downward over the decade." series={s2} annotations={a2} /></section></ScrollReveal>
      <ScrollReveal><PositiveCallout title="Community Wealth Fund established" value="\u00a3200m" unit="10-year endowment announced 2024" description="The Community Wealth Fund, established via the Dormant Assets Act, will distribute \u00a3200 million over 10 years to the 20% most deprived communities in England to build social infrastructure \u2014 community spaces, volunteering coordination and local leadership. Pilot areas began receiving funding in 2024. Independent evaluation will track changes in social capital indicators including trust, belonging and participation." source="Source: ONS \u2014 Community Wellbeing Survey 2025. DCMS \u2014 Community Life Survey 2024-25." /></ScrollReveal>
      <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
        <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
        <div className="text-sm text-wiah-mid space-y-3 font-mono">{data?.metadata.sources.map((src,i)=>(<div key={i}><a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">{src.name} — {src.dataset}</a><div className="text-xs text-wiah-mid">Updated {src.frequency}</div></div>))}</div>
        <div className="text-sm text-wiah-mid mt-6 space-y-2"><h3 className="font-bold">Methodology</h3><p>{data?.metadata.methodology}</p></div>
        <div className="text-sm text-wiah-mid mt-6 space-y-2"><h3 className="font-bold">Known issues</h3><ul className="list-disc list-inside space-y-1">{data?.metadata.knownIssues.map((x,i)=><li key={i}>{x}</li>)}</ul></div>
      </section>
    </main></>);
}
