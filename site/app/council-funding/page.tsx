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
  spendingPowerRealTerms: number;
  adultSocialCareSpend: number;
  s114Cumulative: number;
  atRiskCouncils: number; }
interface TopicData { national: { timeSeries: DataPoint[] }; metadata: { sources: { name: string; dataset: string; url: string; frequency: string }[]; methodology: string; knownIssues: string[]; }; }

export default function CouncilFundingPage() {
  const [data, setData] = useState<TopicData | null>(null);
  useEffect(() => { fetch('/data/council-funding/council_funding.json').then(r=>r.json()).then(setData).catch(console.error); }, []);
  const s1: Series[] = data ? [
    { id:'spendingPowerRealTerms', label:"Spending power per head (\u00a3, real)", colour:"#E63946", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.spendingPowerRealTerms})) },
    { id:'adultSocialCareSpend', label:"Adult social care spend (\u00a3bn)", colour:"#264653", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.adultSocialCareSpend})) },
  ] : [];
  const s2: Series[] = data ? [
    { id:'s114Cumulative', label:"Cumulative s114 notices", colour:"#E63946", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.s114Cumulative})) },
    { id:'atRiskCouncils', label:"Councils assessed at financial risk", colour:"#F4A261", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.atRiskCouncils})) },
  ] : [];
  const a1: Annotation[] = [    { date: new Date(2010,0,1), label: "2010: Austerity cuts begin" },
    { date: new Date(2022,0,1), label: "2022: Cost of care spikes" },];
  const a2: Annotation[] = [    { date: new Date(2018,0,1), label: "2018: Northamptonshire \u2014 first s114 in 20 years" },
    { date: new Date(2023,0,1), label: "2023: Birmingham \u2014 largest ever council bankruptcy" },];
  return (<><TopicNav topic="Council Funding" />
    <main className="max-w-5xl mx-auto px-6 py-12">
      <TopicHeader topic="Economy & Work" question="Are Councils Going Broke?" finding="14 English councils have issued Section 114 insolvency notices since 2018; the local government funding gap is projected to reach \u00a36.2 billion by 2026." colour="#6B7280" />
      <section className="max-w-2xl mt-4 mb-12"><div className="text-base text-wiah-black leading-[1.7] space-y-4">
        <p>14 English councils have issued Section 114 insolvency notices since 2018; the local government funding gap is projected to reach £6.2 billion by 2026. The data below draws on official sources to track change over the past decade.</p>
        <p>These figures reflect a structural pattern. Understanding the scale is the first step toward accountability.</p>
      </div></section>
      <SectionNav sections={[{id:'sec-overview',label:'Overview'},{id:'sec-chart1',label:"Spending power per h"},{id:'sec-chart2',label:"Cumulative s114 noti"}]} />
      <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        <MetricCard label="Councils issuing s114 notices" value="14" unit="" direction="up" polarity="up-is-bad" changeText="Since 2018 \u00b7 more expected by 2026" sparklineData={[0,0,0,0,1,2,3,4,6,9,14]} href="#sec-chart1" />
        <MetricCard label="Local govt funding gap 2026" value="\u00a36.2bn" unit="" direction="up" polarity="up-is-bad" changeText="LGA estimate \u00b7 mainly adult social care" sparklineData={[1.1,1.4,1.8,2.2,2.6,3.0,3.5,4.1,4.8,5.5,6.2]} href="#sec-chart2" />
        <MetricCard label="Real-terms spending cut since 2010" value="-23%" unit="" direction="down" polarity="up-is-bad" changeText="Per head \u00b7 varies hugely by authority type" sparklineData={[0,-3,-6,-9,-12,-15,-17,-19,-21,-22,-23]} href="#sec-chart1" />
      </div>
      <ScrollReveal><section id="sec-chart1" className="mb-12"><LineChart title="Local authority spending power, England, 2015\u20132025" subtitle="Real-terms spending power per head (2024 prices). Includes government grants, council tax and business rates. Shire districts and counties hardest hit." series={s1} annotations={a1} /></section></ScrollReveal>
      <ScrollReveal><section id="sec-chart2" className="mb-12"><LineChart title="Section 114 notices issued by English councils, cumulative, 2018\u20132025" subtitle="Cumulative number of Section 114 notices (equivalent to insolvency) issued by English local authorities since 2018." series={s2} annotations={a2} /></section></ScrollReveal>
      <ScrollReveal><PositiveCallout title="Multi-year settlement restores some certainty" value="2024" unit="multi-year settlement agreed" description="The 2024 Spending Review provided English councils with their first multi-year financial settlement since 2015, giving greater certainty for planning. The settlement included a \u00a3600 million Social Care Support Grant and a one-off \u00a3500 million Recovery Fund for the most financially distressed authorities. However, the LGA estimates the package still leaves a \u00a32bn+ gap for 2025-26." source="Source: DLUHC \u2014 Local government finance settlement 2025-26. LGA \u2014 Funding gap analysis, 2025." /></ScrollReveal>
      <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
        <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
        <div className="text-sm text-wiah-mid space-y-3 font-mono">{data?.metadata.sources.map((src,i)=>(<div key={i}><a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">{src.name} — {src.dataset}</a><div className="text-xs text-wiah-mid">Updated {src.frequency}</div></div>))}</div>
        <div className="text-sm text-wiah-mid mt-6 space-y-2"><h3 className="font-bold">Methodology</h3><p>{data?.metadata.methodology}</p></div>
        <div className="text-sm text-wiah-mid mt-6 space-y-2"><h3 className="font-bold">Known issues</h3><ul className="list-disc list-inside space-y-1">{data?.metadata.knownIssues.map((x,i)=><li key={i}>{x}</li>)}</ul></div>
      </section>
    </main></>);
}
