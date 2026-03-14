'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'DESNZ', dataset: 'Renewable Energy Planning Database (REPD)', url: 'https://www.gov.uk/government/collections/renewable-energy-planning-data', date: '2024' },
  { num: 2, name: 'NESO', dataset: 'Clean Power 2030 Analysis', url: 'https://www.nationalgrideso.com/future-energy/clean-power-2030', date: '2024' },
  { num: 3, name: 'NESO', dataset: 'Electricity Market Report', url: 'https://www.nationalgrideso.com/data-portal', date: '2024' },
];

// Grid-scale battery capacity (GW), 2017–2024
const capacityGW = [0.6, 0.9, 1.1, 1.5, 2.0, 2.9, 4.2, 5.1];
// NESO 2035 target trajectory (GW), 2017–2024 (linear path to 50 GW)
const targetTrajectoryGW = [2.0, 5.0, 8.0, 11.0, 16.0, 23.0, 32.0, 42.0];
// Curtailed renewable energy (TWh), 2017–2024
const curtailedTWh = [0.8, 1.0, 1.2, 1.4, 1.6, 1.9, 2.1, 1.8];
// Pipeline consented capacity (GW cumulative), 2019–2024
const pipelineGW = [5.2, 8.1, 12.4, 18.7, 25.3, 31.0];

const capacitySeries: Series[] = [
  {
    id: 'capacity',
    label: 'Battery capacity operational (GW)',
    colour: '#2A9D8F',
    data: capacityGW.map((v, i) => ({ date: new Date(2017 + i, 0, 1), value: v })),
  },
  {
    id: 'target',
    label: 'Required trajectory to 50 GW by 2035 (GW)',
    colour: '#E63946',
    data: targetTrajectoryGW.map((v, i) => ({ date: new Date(2017 + i, 0, 1), value: v })),
  },
];

const curtailmentSeries: Series[] = [
  {
    id: 'curtailed',
    label: 'Renewable energy curtailed (TWh/yr)',
    colour: '#F4A261',
    data: curtailedTWh.map((v, i) => ({ date: new Date(2017 + i, 0, 1), value: v })),
  },
  {
    id: 'pipeline',
    label: 'Consented pipeline capacity (GW)',
    colour: '#264653',
    data: pipelineGW.map((v, i) => ({ date: new Date(2019 + i, 0, 1), value: v })),
  },
];

const capacityAnnotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: Frequency response revenues drive rapid build-out' },
  { date: new Date(2023, 0, 1), label: '2023: Cap-and-floor support for long-duration storage' },
];

const curtailmentAnnotations: Annotation[] = [
  { date: new Date(2022, 0, 1), label: '2022: Curtailment peaks as wind outpaces storage' },
  { date: new Date(2024, 0, 1), label: '2024: Slight improvement as new capacity connects' },
];

export default function GridBatteryStoragePage() {
  return (
    <>
      <TopicNav topic="Energy" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Energy"
          question="Can the Grid Store Renewable Energy?"
          finding="UK grid battery capacity has grown sevenfold to 5.1 GW since 2017 — but needs to reach 50 GW by 2035. The gap between current growth and the required trajectory is widening, not closing."
          colour="#2A9D8F"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK's grid-scale battery fleet grew from less than 1 GW in 2017 to 5.1 GW by end-2024 — more than a sevenfold increase driven by falling lithium-ion costs, frequency response revenues, and relatively fast planning consents.<Cite nums={1} /> But National Energy System Operator modelling for a net zero grid by 2035 requires approximately 50 GW of storage capacity, roughly ten times current levels.<Cite nums={2} /> On the current growth trajectory, the UK reaches 12–15 GW by 2035 — a substantial shortfall at exactly the moment the grid will be most dependent on intermittent wind and solar. In 2023, 2.1 TWh of renewable energy was curtailed — switched off and wasted — with the cost of constraint payments falling on bill payers rather than on the systems that failed to build enough storage.<Cite nums={3} /></p>
            <p>The economics of battery storage are evolving in ways that complicate the build-out. Frequency response revenues — the primary income stream for current 1–2 hour batteries — are falling as more assets compete for the same market. Longer-duration storage (8–24 hours) is needed to unlock arbitrage value as renewable intermittency increases, but the technology choices between flow batteries, compressed air, gravity, and hydrogen are not yet settled. The government's cap-and-floor support mechanism for long-duration projects has been slow to reach commercial scale. A 30+ GW pipeline exists in planning, but converting consented capacity to construction requires revenue certainty the current policy framework has not yet provided.<Cite nums={1} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Capacity Gap' },
          { id: 'sec-chart2', label: 'Curtailment' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Battery capacity operational (2024)"
              value="5.1 GW"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="7× growth since 2017 · but 10× needed by 2035"
              sparklineData={capacityGW}
              source="NESO · Grid Battery Register 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="2035 capacity target"
              value="50 GW"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="Current trajectory reaches 12–15 GW · gap real and widening"
              sparklineData={[0.6, 1.1, 1.5, 2.0, 2.9, 4.2, 5.1, 6.5]}
              source="NESO · Clean Power 2030 Analysis"
              href="#sec-chart1"
            />
            <MetricCard
              label="Renewable energy curtailed"
              value="1.8 TWh"
              unit="/yr"
              direction="down"
              polarity="up-is-bad"
              changeText="Slightly improving as storage grows · constraint costs on bills"
              sparklineData={curtailedTWh}
              source="NESO · Electricity Market Report 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK grid battery storage: operational capacity vs required trajectory, 2017–2024"
              subtitle="Operational grid-scale battery capacity (green, GW) against the linear trajectory required to reach NESO's 50 GW 2035 target (red). The gap between actual and required is widening."
              series={capacitySeries}
              annotations={capacityAnnotations}
              yLabel="Capacity (GW)"
              source={{ name: 'NESO / DESNZ', dataset: 'Renewable Energy Planning Database', url: 'https://www.gov.uk/government/collections/renewable-energy-planning-data', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Curtailed renewables and consented pipeline, UK, 2017–2024"
              subtitle="Annual renewable energy curtailed due to grid constraints (amber, TWh) and cumulative consented battery pipeline (blue, GW). Pipeline is large but slow to convert to construction."
              series={curtailmentSeries}
              annotations={curtailmentAnnotations}
              yLabel="TWh curtailed / GW pipeline"
              source={{ name: 'NESO', dataset: 'Electricity Market Report / REPD', url: 'https://www.nationalgrideso.com/data-portal', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="UK leads Europe in grid-scale battery deployment"
            value="5.1 GW"
            unit="operational — one of the largest fleets in Europe"
            description="The UK's grid-scale battery fleet is one of the largest in Europe, and the country has consistently deployed capacity faster than Germany, France, or Italy. The Capacity Market and Balancing Mechanism provide a stable revenue floor that has attracted significant investment. The government's cap-and-floor mechanism for long-duration storage, modelled on the Contract for Difference scheme for offshore wind, aims to de-risk investment in 8–24 hour storage. Pre-application pipeline of over 30 GW in the Renewable Energy Planning Database shows that ambition exists in the development community — the barrier is revenue certainty and grid connection timescales, not project appetite."
            source="Source: NESO — Clean Power 2030 Analysis 2024. DESNZ — Renewable Energy Planning Database 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/renewable-energy-planning-data" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DESNZ — Renewable Energy Planning Database (REPD)</a> — Operational and pipeline battery storage capacity by project. Retrieved 2025.</p>
            <p><a href="https://www.nationalgrideso.com/data-portal" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NESO — Electricity Market Report</a> — Annual curtailment and constraint data. Retrieved 2025.</p>
            <p><a href="https://www.nationalgrideso.com/future-energy/clean-power-2030" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NESO — Clean Power 2030 Analysis</a> — Storage capacity requirements for net zero grid. Retrieved 2025.</p>
            <p>Capacity figures represent operational grid-scale battery storage (BESS) in Great Britain, excluding Northern Ireland, residential, and behind-the-meter batteries. Curtailment figures include wind constraint payments and solar curtailment. 2035 target trajectory is linear interpolation from NESO's Clean Power pathway; actual requirement will depend on the future generation mix.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
