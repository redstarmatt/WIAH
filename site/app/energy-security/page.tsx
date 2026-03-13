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

// Gas import dependency (%), 2010–2024 — DESNZ
const gasImportValues = [43, 44, 46, 48, 50, 52, 52, 51, 50, 51, 53, 56, 58, 57, 55];

// North Sea gas production (TWh), 2010–2024 — NSTA
const northSeaGasValues = [550, 520, 490, 460, 430, 400, 390, 380, 360, 340, 320, 310, 300, 290, 280];

// Interconnector capacity (GW), 2015–2024 — National Grid
const interconnectorValues = [3.5, 3.5, 4.0, 4.0, 4.0, 5.0, 5.0, 6.0, 6.0, 7.2];

const gasDependencySeries: Series[] = [
  {
    id: 'gas-imports',
    label: 'Gas import dependency (%)',
    colour: '#E63946',
    data: gasImportValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const northSeaSeries: Series[] = [
  {
    id: 'north-sea',
    label: 'North Sea gas production (TWh)',
    colour: '#264653',
    data: northSeaGasValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const combinedSeries: Series[] = [
  {
    id: 'gas-imports',
    label: 'Gas import dependency (%)',
    colour: '#E63946',
    data: gasImportValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
  {
    id: 'north-sea',
    label: 'North Sea gas production (TWh/10)',
    colour: '#264653',
    data: northSeaGasValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v / 10 })),
  },
];

const gasAnnotations: Annotation[] = [
  { date: new Date(2022, 1, 1), label: '2022: Russia invades Ukraine' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'DESNZ', dataset: 'Energy Trends: UK gas', url: 'https://www.gov.uk/government/statistics/gas-section-4-energy-trends', date: '2024' },
  { num: 2, name: 'NSTA', dataset: 'UKCS production data', url: 'https://www.nstauthority.co.uk/data-centre/nsta-open-data/', date: '2024' },
  { num: 3, name: 'National Grid ESO', dataset: 'Interconnector capacity', url: 'https://www.nationalgrideso.com/future-energy/future-energy-scenarios', date: '2024' },
];

export default function EnergySecurityPage() {
  return (
    <>
      <TopicNav topic="Energy Security" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Energy Security"
          question="How Dependent Is Britain on Imported Gas?"
          finding="The UK now imports 55% of its gas — up from 43% in 2010 as North Sea production declines. The 2022 Russian gas crisis exposed the vulnerability of this dependence, driving the biggest energy price shock in 50 years. Renewables and interconnectors are reducing long-term risk."
          colour="#264653"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK's gas import dependency has risen steadily from 43% in 2010 to around 55% in 2024<Cite nums={1} />, as North Sea production continues its long-term structural decline. The North Sea produced approximately 280 TWh of gas in 2024, down from 550 TWh in 2010 — a 49% fall in fourteen years.<Cite nums={2} /> Despite the government's controversial decision to grant new North Sea licences in 2023, production from new fields will not materially reverse this trend before the 2030s. Imports come primarily from Norway (via pipeline), liquefied natural gas (LNG) tankers from Qatar and the US, and interconnectors. The price of imported gas is set on global markets — meaning UK consumers have no insulation from geopolitical shocks.</p>
            <p>The 2022 energy crisis demonstrated the systemic risk. Following Russia's reduction of gas supplies to Europe, UK wholesale gas prices rose by over 400% in 2022<Cite nums={1} />, feeding directly into household bills and industrial energy costs. The UK's position — more exposed to LNG spot prices than continental Europe due to limited pipeline storage — made the shock sharper here than in Germany or France. The strategic response has two tracks: accelerating renewable deployment to displace gas from electricity generation, and expanding interconnector capacity (now 7.2 GW)<Cite nums={3} /> to allow greater European electricity trading. Neither fully resolves the 25 million homes still dependent on gas heating — a challenge that heat pumps and district heating must ultimately address.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Gas dependency' },
          { id: 'sec-chart2', label: 'North Sea production' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Gas import dependency"
              value="55%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 43% in 2010 · exposed to global price shocks"
              sparklineData={[43, 44, 46, 48, 50, 52, 53, 56, 58, 55]}
              source="DESNZ · Energy Trends 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="North Sea gas production"
              value="280 TWh"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="Down 49% since 2010 · structural decline accelerating"
              sparklineData={[550, 520, 490, 460, 430, 400, 360, 320, 300, 280]}
              source="NSTA · Production data 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Interconnector capacity"
              value="7.2 GW"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Up from 3.5 GW in 2015 · EU electricity trading buffer"
              sparklineData={[3.5, 3.5, 4.0, 4.0, 5.0, 5.0, 6.0, 6.0, 7.2]}
              source="National Grid · Interconnector capacity 2024"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK gas import dependency, 2010–2024"
              subtitle="Percentage of UK gas supply met by imports (pipeline and LNG). Rising as North Sea production declines."
              series={gasDependencySeries}
              annotations={gasAnnotations}
              yLabel="Import dependency (%)"
              source={{ name: 'DESNZ', dataset: 'Energy Trends: UK gas', url: 'https://www.gov.uk/government/statistics/gas-section-4-energy-trends', frequency: 'quarterly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="UK North Sea gas production, 2010–2024"
              subtitle="Annual gas production from UK Continental Shelf (UKCS) in terawatt-hours. Long-term structural decline from mature fields."
              series={northSeaSeries}
              annotations={[]}
              yLabel="Production (TWh)"
              source={{ name: 'NSTA', dataset: 'UKCS production data', url: 'https://www.nstauthority.co.uk/data-centre/nsta-open-data/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Renewables will displace gas from electricity by 2035"
            value="2035"
            description="The Climate Change Committee has confirmed the UK is on track to decarbonise electricity by 2035, eliminating gas from power generation entirely. At that point, the UK's gas exposure will be limited to heating — reducing import dependency significantly. The government's Clean Power 2030 Action Plan targets 50 GW of offshore wind and 70 GW of solar by 2030. If achieved, this would make the UK electricity system effectively immune to gas price shocks, and enable significant export of electricity to Europe through expanded interconnectors."
            source="Source: Climate Change Committee — Progress in reducing emissions 2024. DESNZ — Clean Power 2030 Action Plan."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/statistics/gas-section-4-energy-trends" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DESNZ — Energy Trends: UK gas</a> — quarterly statistics on gas production, imports, exports, and consumption.</p>
            <p><a href="https://www.nstauthority.co.uk/data-centre/nsta-open-data/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NSTA — UKCS production data</a> — North Sea Transition Authority open data on oil and gas production by field.</p>
            <p><a href="https://www.nationalgrideso.com/future-energy/future-energy-scenarios" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">National Grid ESO — Interconnector capacity</a> — current and planned electricity interconnector capacity to Europe.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
