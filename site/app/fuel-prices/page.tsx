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
  petrolPPL: number;
  dieselPPL: number;
  dutyAndVat: number;
  wholesaleAndRetail: number; }
interface TopicData { national: { timeSeries: DataPoint[] }; metadata: { sources: { name: string; dataset: string; url: string; frequency: string }[]; methodology: string; knownIssues: string[]; }; }

export default function FuelPricesPage() {
  const [data, setData] = useState<TopicData | null>(null);
  useEffect(() => { fetch('/data/fuel-prices/fuel_prices.json').then(r=>r.json()).then(setData).catch(console.error); }, []);
  const s1: Series[] = data ? [
    { id:'petrolPPL', label:"Petrol (pence per litre)", colour:"#264653", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.petrolPPL})) },
    { id:'dieselPPL', label:"Diesel (pence per litre)", colour:"#E63946", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.dieselPPL})) },
  ] : [];
  const s2: Series[] = data ? [
    { id:'dutyAndVat', label:"Duty + VAT (pence/litre)", colour:"#6B7280", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.dutyAndVat})) },
    { id:'wholesaleAndRetail', label:"Wholesale + retail (pence/litre)", colour:"#264653", data:data.national.timeSeries.map(d=>({date:new Date(d.year,0,1),value:d.wholesaleAndRetail})) },
  ] : [];
  const a1: Annotation[] = [    { date: new Date(2020,0,1), label: "2020: COVID collapses demand" },
    { date: new Date(2022,0,1), label: "2022: Ukraine war \u2014 record pump prices" },];
  const a2: Annotation[] = [    { date: new Date(2022,0,1), label: "2022: Wholesale component surges" },
    { date: new Date(2023,0,1), label: "2023: Competition watchdog fuel market review" },];
  return (<><TopicNav topic="Fuel Prices" />
    <main className="max-w-5xl mx-auto px-6 py-12">
      <TopicHeader topic="Transport & Infrastructure" question="What Are We Paying at the Pump?" finding="Petrol averaged 146p per litre in early 2026 \u2014 down from a 2022 peak of 192p but still 30% above 2019 pre-pandemic levels, hitting low-income car-dependent households hardest." colour="#264653" />
      <section className="max-w-2xl mt-4 mb-12"><div className="text-base text-wiah-black leading-[1.7] space-y-4">
        <p>Petrol averaged 146p per litre in early 2026 — down from a 2022 peak of 192p but still 30% above 2019 pre-pandemic levels, hitting low-income car-dependent households hardest. The data below draws on official sources to track change over the past decade.</p>
        <p>These figures reflect a structural pattern. Understanding the scale is the first step toward accountability.</p>
      </div></section>
      <SectionNav sections={[{id:'sec-overview',label:'Overview'},{id:'sec-chart1',label:"Petrol (pence per li"},{id:'sec-chart2',label:"Duty + VAT (pence/li"}]} />
      <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        <MetricCard label="Petrol price (pence/litre)" value="146p" unit="" direction="down" polarity="up-is-bad" changeText="Down from 192p peak \u00b7 still 30% above 2019" sparklineData={[109,115,120,128,131,112,141,192,178,160,146]} href="#sec-chart1" />
        <MetricCard label="vs 2019 pre-pandemic level" value="+30%" unit="" direction="down" polarity="up-is-bad" changeText="2019 average was 131p" sparklineData={[0,-5,-10,-5,0,-15,8,47,36,22,30]} href="#sec-chart2" />
        <MetricCard label="Fuel duty \u2014 years since last increase" value="14 years" unit="" direction="up" polarity="up-is-good" changeText="Frozen since March 2011 \u00b7 costs exchequer \u00a34bn/year" sparklineData={[0,1,2,3,4,5,6,7,8,9,14]} href="#sec-chart1" />
      </div>
      <ScrollReveal><section id="sec-chart1" className="mb-12"><LineChart title="UK petrol and diesel pump prices, 2015\u20132025" subtitle="Average pump prices for unleaded petrol and diesel in pence per litre. Prices hit a record high in mid-2022 driven by global oil markets and the Ukraine conflict." series={s1} annotations={a1} /></section></ScrollReveal>
      <ScrollReveal><section id="sec-chart2" className="mb-12"><LineChart title="UK petrol price breakdown \u2014 duty, VAT and wholesale, 2015\u20132025" subtitle="Components of the petrol pump price. Fuel duty and VAT together account for around 42% of the price at current levels." series={s2} annotations={a2} /></section></ScrollReveal>
      <ScrollReveal><PositiveCallout title="Electric vehicle charging costs falling" value="\u00a30.34/kWh" unit="average public charger cost 2025" description="Public EV charging costs fell to an average of \u00a30.34/kWh in 2025, down from \u00a30.71/kWh at the 2023 peak. The Energy Price Guarantee applied to charging providers reduced costs, and increased competition between rapid charger networks has compressed margins. Overnight home charging averages \u00a30.07/kWh on an EV tariff \u2014 equivalent to around 2.5p per mile versus 16p for petrol." source="Source: Zap-Map / RAC \u2014 EV charging price tracker, 2025. DESNZ \u2014 Weekly road fuel prices." /></ScrollReveal>
      <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
        <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
        <div className="text-sm text-wiah-mid space-y-3 font-mono">{data?.metadata.sources.map((src,i)=>(<div key={i}><a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">{src.name} — {src.dataset}</a><div className="text-xs text-wiah-mid">Updated {src.frequency}</div></div>))}</div>
        <div className="text-sm text-wiah-mid mt-6 space-y-2"><h3 className="font-bold">Methodology</h3><p>{data?.metadata.methodology}</p></div>
        <div className="text-sm text-wiah-mid mt-6 space-y-2"><h3 className="font-bold">Known issues</h3><ul className="list-disc list-inside space-y-1">{data?.metadata.knownIssues.map((x,i)=><li key={i}>{x}</li>)}</ul></div>
      </section>
    </main></>);
}
