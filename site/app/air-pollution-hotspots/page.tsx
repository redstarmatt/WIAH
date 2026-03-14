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

// Areas exceeding WHO PM2.5 limits, 2015–2025 — DEFRA AURN
const pm25ExceedanceValues = [61, 58, 55, 52, 50, 46, 44, 43, 44, 44, 44];

// NO2 roadside exceedance zones, 2015–2025
const no2ExceedanceValues = [102, 103, 101, 100, 103, 98, 95, 93, 91, 90, 89];

// Avg PM2.5 exposure µg/m³ and premature deaths (thousands), 2015–2025
const avgPM25Values = [11.2, 10.8, 10.4, 10.0, 9.6, 9.2, 8.8, 8.5, 8.2, 7.9, 7.6];
const prematureDeathsKValues = [50, 48, 46, 44, 42, 40, 39, 39.5, 40, 40, 40];

const series1: Series[] = [
  {
    id: 'pm25Exceedances',
    label: 'Areas exceeding WHO PM2.5 limit',
    colour: '#E63946',
    data: pm25ExceedanceValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'no2Exceedances',
    label: 'NO2 roadside exceedance zones',
    colour: '#F4A261',
    data: no2ExceedanceValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'avgPM25Exposure',
    label: 'Avg PM2.5 exposure (µg/m³)',
    colour: '#E63946',
    data: avgPM25Values.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'prematureDeathsK',
    label: 'Premature deaths (thousands)',
    colour: '#264653',
    data: prematureDeathsKValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2019, 0, 1), label: '2019: Court orders UK to publish air quality plans' },
  { date: new Date(2022, 0, 1), label: '2022: Clean Air Zones operating in Birmingham, Bath' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'DEFRA', dataset: 'Air quality statistics (AURN)', url: 'https://www.gov.uk/government/collections/air-quality-statistics', date: '2025' },
  { num: 2, name: 'COMEAP', dataset: 'Long-term exposure mortality estimates', url: 'https://www.gov.uk/government/groups/committee-on-the-medical-effects-of-air-pollutants-comeap', date: '2024' },
  { num: 3, name: 'TfL', dataset: 'ULEZ impact assessment', url: 'https://tfl.gov.uk/corporate/publications-and-reports/', date: '2024' },
];

export default function AirPollutionHotspotsPage() {
  return (
    <>
      <TopicNav topic="Environment & Climate" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment & Climate"
          question="Are Britain's air quality laws actually working?"
          finding="44 UK towns and cities exceeded WHO PM2.5 limits in 2024. Road traffic is the primary source of NO2. An estimated 40,000 premature deaths per year are linked to air pollution — and progress on reducing hotspots has stalled since 2021."
          colour="#2A9D8F"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Despite decades of regulation, 44 UK towns and cities still recorded annual PM2.5 concentrations above WHO guidelines in 2024, and 89 roadside monitoring sites still exceeded legal NO2 limits.<Cite nums={1} /> The UK has repeatedly missed court-ordered deadlines for bringing all areas into compliance with EU-derived air quality limits — limits that themselves sit well above the WHO's tighter 2021 guidelines. Road traffic remains the primary source of roadside NO2, and industrial point sources remain a significant contributor to regional PM2.5.<Cite nums={1} /> The deprivation gradient is stark: the most polluted areas in England are overwhelmingly the poorest, concentrating health harm on the communities least equipped to advocate for themselves.</p>
            <p>The pandemic provided an inadvertent natural experiment: during the strictest 2020 lockdowns, NO2 concentrations in many urban centres fell by 40–60%, demonstrating that clean air is physically achievable — the barrier is political, not atmospheric.<Cite nums={1} /> Clean Air Zones in Birmingham, Bath, Bristol, Bradford, and Portsmouth have accelerated improvements, with monitoring showing 10–20% NO2 reductions within the first year of operation.<Cite nums={1} /> London's Ultra Low Emission Zone expansion to all boroughs in August 2023 has produced measurable improvements.<Cite nums={3} /> But outside major cities, monitoring coverage is sparse, enforcement of vehicle emission standards is inconsistent, and domestic wood burning — now the largest source of UK PM2.5 — remains largely unregulated.<Cite nums={1} /> Progress since 2021 has stalled: the number of areas exceeding PM2.5 limits has not fallen since 2022.<Cite nums={1} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Exceedance areas' },
          { id: 'sec-chart2', label: 'Exposure & deaths' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Areas exceeding WHO PM2.5 limits"
              value="44"
              unit="2024"
              direction="down"
              polarity="up-is-bad"
              changeText="Down from 61 in 2015 · progress stalled since 2021"
              sparklineData={pm25ExceedanceValues}
              source="DEFRA · Automatic Urban and Rural Network 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Estimated premature deaths/year"
              value="40,000"
              unit="2024"
              direction="down"
              polarity="up-is-bad"
              changeText="Down from 50,000 in 2015 · second biggest public health threat"
              sparklineData={prematureDeathsKValues.map(v => v * 1000)}
              source="COMEAP · Air pollution mortality estimates 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="NO2 roadside exceedance zones"
              value="89"
              unit="2024"
              direction="down"
              polarity="up-is-bad"
              changeText="Down from 103 in 2019 · legal deadline missed repeatedly"
              sparklineData={no2ExceedanceValues}
              source="DEFRA · Air quality statistics 2024"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK areas exceeding WHO air quality limits, 2015–2025"
              subtitle="Areas exceeding WHO PM2.5 guideline (red) and NO2 roadside exceedance zones (amber). Both falling but progress has stalled since 2021."
              series={series1}
              annotations={annotations}
              yLabel="Count"
              source={{ name: 'DEFRA', dataset: 'Automatic Urban and Rural Network (AURN) air quality statistics', url: 'https://www.gov.uk/government/collections/air-quality-statistics', frequency: 'annual', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Average PM2.5 exposure and premature deaths, UK, 2015–2025"
              subtitle="Population-weighted average PM2.5 exposure (µg/m³, red) and estimated premature deaths (thousands, blue). Both declining slowly but unevenly."
              series={series2}
              annotations={[{ date: new Date(2020, 0, 1), label: '2020: Pandemic lockdown demonstrates clean air achievable' }]}
              yLabel="µg/m³ / thousands of deaths"
              source={{ name: 'DEFRA / COMEAP', dataset: 'Air quality statistics & Long-term exposure mortality estimates', url: 'https://www.gov.uk/government/collections/air-quality-statistics', frequency: 'annual', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Clean Air Zones cutting NO2 in cities"
            value="30%"
            unit="NO2 reduction in Birmingham CAZ core zones"
            description="Birmingham's Clean Air Zone reduced NO2 concentrations by 30% in targeted areas within 18 months. Six UK cities now operate CAZs. London's ULEZ expansion to all London boroughs in August 2023 has reduced roadside NO2 by 40% in expanded zone areas and prevented an estimated 4,000 asthma attacks per year in children. These programmes demonstrate that local action can deliver rapid, measurable air quality improvements when backed by consistent enforcement and adequate charging infrastructure for vehicle owners switching to compliant vehicles."
            source="Source: DEFRA — Air quality statistics 2025. TfL — ULEZ impact assessment 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/air-quality-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DEFRA — Air quality statistics (AURN)</a> — Automatic Urban and Rural Network monitoring data. Annual and monthly publications.</p>
            <p><a href="https://www.gov.uk/government/groups/committee-on-the-medical-effects-of-air-pollutants-comeap" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">COMEAP — Long-term exposure mortality estimates</a> — expert committee estimates of premature mortality from PM2.5 and NO2.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
