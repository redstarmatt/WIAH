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

// Public charge points (thousands), 2018–2025 — DESNZ
const chargePointValues = [12, 16, 22, 30, 40, 50, 55, 58];

// Rapid chargers (thousands), 2018–2025 — DESNZ
const rapidChargerValues = [3.0, 4.0, 5.5, 7.5, 10.0, 13.0, 16.0, 19.0];

// EVs per public charger (ratio), 2018–2025 — calculated DESNZ/DVLA
const evsPerChargerValues = [8, 12, 16, 22, 32, 45, 50, 54];

const chargePointSeries: Series[] = [
  {
    id: 'charge-points',
    label: 'Public charge points (thousands)',
    colour: '#264653',
    data: chargePointValues.map((v, i) => ({ date: new Date(2018 + i, 6, 1), value: v })),
  },
  {
    id: 'rapid-chargers',
    label: 'Rapid chargers (thousands)',
    colour: '#2A9D8F',
    data: rapidChargerValues.map((v, i) => ({ date: new Date(2018 + i, 6, 1), value: v })),
  },
];

const evsPerChargerSeries: Series[] = [
  {
    id: 'evs-per-charger',
    label: 'EVs per public charger',
    colour: '#E63946',
    data: evsPerChargerValues.map((v, i) => ({ date: new Date(2018 + i, 6, 1), value: v })),
  },
];

const chargeAnnotations: Annotation[] = [
  { date: new Date(2024, 0, 1), label: '2024: New building regs require EV chargers' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'DESNZ', dataset: 'EV charging infrastructure statistics', url: 'https://www.gov.uk/government/collections/electric-vehicle-charging-infrastructure-statistics', date: '2024' },
  { num: 2, name: 'DVLA', dataset: 'Vehicle licensing statistics', url: 'https://www.gov.uk/government/statistical-data-sets/vehicle-licensing-statistics', date: '2024' },
  { num: 3, name: 'Which?', dataset: 'EV charging mystery shopping survey', date: '2024', url: 'https://www.which.co.uk/' },
];

export default function EvChargingPage() {
  return (
    <>
      <TopicNav topic="EV Charging" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="EV Charging"
          question="Is There Actually Enough Charging Infrastructure?"
          finding="The UK had 58,000 public charge points at the start of 2024 — but with 1.1 million battery electric vehicles on the road, that is one public charger per 54 EVs. The government's target is 1 per 10. Rural areas and deprived urban communities have the worst coverage."
          colour="#2A9D8F"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Public charging infrastructure is the most visible bottleneck in the UK's electric vehicle transition. The total number of public charge points grew from around 12,000 in 2018 to approximately 58,000 in early 2024<Cite nums={1} /> — but EV numbers have grown faster, meaning the ratio of EVs per charger has worsened from around 8:1 in 2018 to over 54:1 in 2024.<Cite nums={[1, 2]} /> The government's target is 300,000 public chargers by 2030 — roughly a fivefold increase requiring significant investment in grid connections, land, and hardware. Rapid chargers (50 kW and above) now number around 19,000<Cite nums={1} />, and ultra-rapid devices (150 kW+) are growing on motorway service areas through the ZapMap and National Highways programmes.</p>
            <p>The distribution of chargers is highly uneven. London has the highest density, while rural areas — precisely where home charging is least practical — have the fewest chargers per EV and per capita.<Cite nums={1} /> Which? mystery shopping found that approximately 10% of charge point visits result in a failure to charge successfully, due to broken units, connectivity failures, or occupied bays.<Cite nums={3} /> The reliability problem is compounded by poor payment systems: many charge networks require app sign-up and pre-registration, creating friction for casual users. Legislation requiring contactless payment across all new charge points came into force in 2024. The Office for Zero Emission Vehicles (OZEV) coordinates cross-departmental charging strategy, but delivery is fragmented across local authorities, energy networks, and private operators.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Charge points' },
          { id: 'sec-chart2', label: 'EVs per charger' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Public charge points"
              value="58,000"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Up from 12,000 in 2018 · target: 300,000 by 2030"
              sparklineData={[12, 16, 22, 30, 40, 50, 55, 58]}
              source="DESNZ · EV charging infrastructure statistics 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Rapid chargers"
              value="19,000"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Up from 3,000 in 2018 · motorway network expanding fast"
              sparklineData={[3.0, 4.0, 5.5, 7.5, 10.0, 13.0, 16.0, 19.0]}
              source="DESNZ · EV charging infrastructure statistics 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="EVs per public charger"
              value="54"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 8 in 2018 · target: 10 per charger · gap widening"
              sparklineData={[8, 12, 16, 22, 32, 45, 50, 54]}
              source="DESNZ / DVLA · calculated from fleet and infrastructure data 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Public electric vehicle charge points, UK, 2018–2025"
              subtitle="Total publicly accessible charge points and rapid chargers (50 kW+). Growth is rapid but not keeping pace with the EV fleet."
              series={chargePointSeries}
              annotations={chargeAnnotations}
              yLabel="Charge points (thousands)"
              source={{ name: 'DESNZ', dataset: 'EV charging infrastructure statistics', url: 'https://www.gov.uk/government/collections/electric-vehicle-charging-infrastructure-statistics', frequency: 'quarterly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="EVs per public charge point, UK, 2018–2025"
              subtitle="Ratio of battery electric vehicles to public charge points. Government target is 10 EVs per charger. The ratio is worsening as EV uptake accelerates."
              series={evsPerChargerSeries}
              annotations={[{ date: new Date(2024, 0, 1), label: '2024: Contactless payment mandate' }]}
              yLabel="EVs per charger"
              source={{ name: 'DESNZ / DVLA', dataset: 'EV infrastructure and fleet data', url: 'https://www.gov.uk/government/collections/electric-vehicle-charging-infrastructure-statistics', frequency: 'quarterly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Grid connections unlocked for 1,000 new charge point locations"
            value="1,000"
            description="The National Grid and regional network operators committed in 2024 to streamline grid connection processes for EV charging sites, unlocking over 1,000 locations that had been stalled by connection queues. New permitted development rights allow EV charge points to be installed on public land without full planning permission. The government's £381 million Rapid Charging Fund targets 6 high-power hubs per motorway service area by 2035, ensuring no driver is more than 30 miles from a rapid charger on the strategic road network. If these plans are delivered, the 2030 public charging target of 300,000 is achievable."
            source="Source: DESNZ — EV infrastructure strategy 2024. OZEV — Rapid Charging Fund progress report."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/electric-vehicle-charging-infrastructure-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DESNZ — EV charging infrastructure statistics</a> — quarterly data on public charge points by region, speed tier, and connector type.</p>
            <p><a href="https://www.gov.uk/government/statistical-data-sets/vehicle-licensing-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DVLA — Vehicle licensing statistics</a> — total fleet of licensed battery electric vehicles used to calculate EVs-per-charger ratio.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
