'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'SMMT', dataset: 'New car registrations by fuel type', url: 'https://www.smmt.co.uk/data/ev-registrations/', date: '2023' },
  { num: 2, name: 'DESNZ', dataset: 'EV charging infrastructure statistics', url: 'https://www.gov.uk/government/collections/electric-vehicle-charging-infrastructure-statistics', date: '2024' },
  { num: 3, name: 'BloombergNEF', dataset: 'Battery Price Survey', url: 'https://about.bnef.com/electric-vehicle-outlook/', date: '2024' },
];

// BEV share of new car sales (%), 2018–2025 — SMMT
const evShareValues = [0.5, 0.7, 1.6, 3.1, 7.4, 11.6, 14.8, 16.5];

// Public charge points (thousands), 2018–2025 — DESNZ
const chargePointValues = [12, 16, 22, 30, 40, 50, 55, 58];

const evShareSeries: Series[] = [
  {
    id: 'ev-share',
    label: 'BEV share of new car sales (%)',
    colour: '#2A9D8F',
    data: evShareValues.map((v, i) => ({ date: new Date(2018 + i, 6, 1), value: v })),
  },
];

const chargePointSeries: Series[] = [
  {
    id: 'charge-points',
    label: 'Public charge points (thousands)',
    colour: '#264653',
    data: chargePointValues.map((v, i) => ({ date: new Date(2018 + i, 6, 1), value: v })),
  },
];

const combinedSeries: Series[] = [
  {
    id: 'ev-share',
    label: 'EV share of new car sales (%)',
    colour: '#2A9D8F',
    data: evShareValues.map((v, i) => ({ date: new Date(2018 + i, 6, 1), value: v })),
  },
  {
    id: 'charge-points',
    label: 'Public charge points (thousands)',
    colour: '#264653',
    data: chargePointValues.map((v, i) => ({ date: new Date(2018 + i, 6, 1), value: v })),
  },
];

const shareAnnotations: Annotation[] = [
  { date: new Date(2024, 0, 1), label: '2024: ZEV mandate begins (22%)' },
];

export default function ElectricVehiclesPage() {
  return (
    <>
      <TopicNav topic="Electric Vehicles" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Electric Vehicles"
          question="Is Britain Actually Switching to Electric Cars?"
          finding="EVs took 16.5% of new car sales in 2023, up from 0.5% in 2018. But public charging infrastructure lags severely — just 1 charger per 54 EVs, against a target of 1 per 10. Range anxiety and upfront cost remain barriers for most buyers."
          colour="#2A9D8F"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK's electric vehicle transition has accelerated rapidly since 2020. Battery electric vehicles (BEVs) took just 0.5% of new car sales in 2018; by 2023 that figure had risen to 16.5%, driven by an expanding model range, falling battery costs, and the government's Zero Emission Vehicle (ZEV) mandate — which requires manufacturers to sell a rising proportion of zero-emission vehicles, starting at 22% in 2024 and rising to 80% by 2030.<Cite nums={[1]} /> Battery costs have fallen from over £1,000 per kilowatt-hour in 2010 to around £100/kWh in 2024 — a 90% reduction — and are expected to reach £60–70/kWh by 2030, the level at which EVs become cost-competitive at point of purchase without subsidy.<Cite nums={[3]} /></p>
            <p>The charging infrastructure gap is the most pressing barrier to mass adoption. The UK had around 58,000 public charge points at the start of 2024 — but with approximately 1.1 million BEVs on the road, that is one public charger per 54 EVs, well short of the government's target of one per ten.<Cite nums={[2]} /> The distribution is uneven: London has the highest density, while rural areas and deprived urban communities have fewer chargers per EV than the national average.<Cite nums={[2]} /> Reliability remains a concern: Which? mystery shopping found around 10% of charge point visits resulted in a failure to charge successfully.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'EV sales share' },
          { id: 'sec-chart2', label: 'Charging infrastructure' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="BEV share of new car sales"
              value="16.5"
              unit="%"
              direction="up"
              polarity="up-is-good"
              changeText="Up from 0.5% in 2018 · ZEV mandate requires 80% by 2030"
              sparklineData={[0.5, 0.7, 1.6, 3.1, 7.4, 11.6, 14.8, 16.5]}
              source="SMMT · New car registrations by fuel type 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Public charge points"
              value="58,000"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="1 per 54 EVs · government target: 1 per 10"
              sparklineData={[12, 16, 22, 30, 40, 50, 55, 58]}
              source="DESNZ · EV charging infrastructure statistics 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="EVs per public charger"
              value="54"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Target: 10 per charger · gap widening as EVs outpace infrastructure"
              sparklineData={[8, 12, 16, 22, 32, 45, 50, 54]}
              source="DESNZ / DVLA · calculated from fleet and infrastructure data"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Battery electric vehicle share of new car sales, UK, 2018–2025"
              subtitle="BEVs only, excluding plug-in hybrids. Rapid growth driven by model range expansion, falling costs, and ZEV mandate from 2024."
              series={evShareSeries}
              annotations={shareAnnotations}
              yLabel="% of new car sales"
              source={{ name: 'SMMT', dataset: 'New car registrations by fuel type', url: 'https://www.smmt.co.uk/data/ev-registrations/', frequency: 'monthly', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Public electric vehicle charge points, UK, 2018–2025"
              subtitle="Total publicly accessible charge points registered. Growth is rapid but not keeping pace with the EV fleet. Rural and deprived areas have worst coverage."
              series={chargePointSeries}
              annotations={[{ date: new Date(2024, 0, 1), label: '2024: New building regs require chargers' }]}
              yLabel="Charge points (thousands)"
              source={{ name: 'DESNZ', dataset: 'EV charging infrastructure statistics', url: 'https://www.gov.uk/government/collections/electric-vehicle-charging-infrastructure-statistics', frequency: 'quarterly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="90% cost reduction in batteries since 2010"
            value="£100/kWh"
            description="Battery costs have fallen from over £1,000/kWh in 2010 to around £100/kWh in 2024 — a 90% reduction. At current electricity and petrol prices, EVs are already cheaper than petrol equivalents over a full vehicle lifetime for drivers with home charging. Battery costs are expected to fall to £60–70/kWh by 2030, making EVs cost-competitive at point of purchase without subsidy. The UK ranks in the global top five for EV adoption by new car share."
            source="Source: BloombergNEF — Battery Price Survey 2024. SMMT — EV registrations data 2023."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.smmt.co.uk/data/ev-registrations/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">SMMT — New car registrations by fuel type</a> — monthly data on BEV, PHEV, and ICE vehicle registrations.</p>
            <p><a href="https://www.gov.uk/government/collections/electric-vehicle-charging-infrastructure-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DESNZ — EV charging infrastructure statistics</a> — quarterly data on public charge points by region and speed tier.</p>
            <p><a href="https://about.bnef.com/electric-vehicle-outlook/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">BloombergNEF — Battery Price Survey</a> — annual lithium-ion battery cost data.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
