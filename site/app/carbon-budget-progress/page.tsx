'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// UK greenhouse gas emissions (MtCO2e), 2015–2025
const actualEmissionsData = [490, 475, 460, 451, 435, 380, 420, 415, 408, 400, 392];

// Carbon budget ceiling (MtCO2e annual average), 2015–2025
const budgetCeilingData = [505, 505, 505, 475, 475, 475, 440, 440, 440, 440, 440];

// EV new car sales share (%), 2015–2025
const evSalesData = [0.2, 0.4, 0.8, 1.5, 2.8, 4.2, 8.0, 14.3, 16.8, 19.1, 22.0];

// Heat pump installations (thousands per year), 2015–2025
const heatPumpData = [28, 32, 38, 42, 48, 55, 65, 72, 78, 82, 90];

const emissionsSeries: Series[] = [
  {
    id: 'actualEmissions',
    label: 'Actual emissions (MtCO2e)',
    colour: '#E63946',
    data: actualEmissionsData.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
  {
    id: 'budgetCeiling',
    label: 'Carbon budget ceiling (MtCO2e)',
    colour: '#264653',
    data: budgetCeilingData.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const decarbSeries: Series[] = [
  {
    id: 'evSalesPct',
    label: 'EV new car sales share (%)',
    colour: '#2A9D8F',
    data: evSalesData.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
  {
    id: 'heatPumpInstalls',
    label: 'Heat pump installations (000s/year)',
    colour: '#F4A261',
    data: heatPumpData.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const emissionsAnnotations: Annotation[] = [
  { date: new Date(2020, 5, 1), label: '2020: Pandemic causes temporary fall' },
  { date: new Date(2022, 5, 1), label: '2022: Russia invasion temporarily increases gas use' },
];

const decarbAnnotations: Annotation[] = [
  { date: new Date(2022, 0, 1), label: '2022: Boiler Upgrade Scheme launched' },
  { date: new Date(2023, 5, 1), label: '2023: ZEV mandate: 2030 ICE ban confirmed' },
];

export default function CarbonBudgetProgressPage() {
  return (
    <>
      <TopicNav topic="Carbon Budget Progress" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment & Climate"
          question="Is Britain on Track for Net Zero?"
          finding="UK emissions have fallen 53% since 1990 — among the fastest reductions of any major economy. But the Climate Change Committee warns the UK is projected to miss its fourth carbon budget by 12%, heat pump installations are 60% below the required trajectory, and policy gaps are widening across heating, agriculture, and aviation."
          colour="#2A9D8F"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK has made genuine and substantial progress on reducing greenhouse gas emissions, cutting territorial emissions by 53% since 1990 — the fastest reduction of any major economy over that period. Decarbonisation of the electricity grid has been the primary driver: coal has been virtually eliminated from power generation, and renewables now supply over 50% of electricity. But the easy gains are largely behind us. The remaining emissions are harder to cut: heating homes accounts for 14% of UK emissions, the vast majority from gas boilers; agriculture produces 11%; and transport — despite growing EV sales — remains the largest single sector. The Climate Change Committee's 2025 progress report found the UK is on track to meet only 8 of its 50 key net zero policy milestones.</p>
            <p>Heat pump installation is the most glaring gap. The government's Boiler Upgrade Scheme offers grants of £7,500 for heat pump installation, but uptake remains at around 90,000 per year — against the CCC's pathway requiring 600,000 per year by 2028. High upfront costs, planning restrictions, and public uncertainty about operating costs are all contributing factors. EV uptake has been more encouraging: the zero-emission vehicle mandate requires 22% of new car sales to be electric in 2024, rising to 80% by 2030, and is currently tracking roughly on target. But without a parallel acceleration in grid capacity and home charging infrastructure, the transport transition risks stalling at higher penetration rates where overnight home charging becomes the bottleneck.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Emissions vs Budget' },
          { id: 'sec-chart2', label: 'Decarbonisation' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="4th carbon budget miss projection"
              value="12%"
              unit="overrun projected"
              direction="up"
              polarity="up-is-bad"
              changeText="CCC projects 12% overrun · was 8% in 2022 · gap widening"
              sparklineData={[3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
              source="Climate Change Committee · Progress Report 2025"
              href="#sec-chart1"
            />
            <MetricCard
              label="Heat pump installations"
              value="90,000"
              unit="per year (2025)"
              direction="up"
              polarity="up-is-good"
              changeText="60% below CCC trajectory of 600k/year by 2028"
              sparklineData={[28, 38, 48, 55, 65, 72, 78, 82, 90]}
              source="DESNZ · Heat Pump Statistics 2025"
              href="#sec-chart2"
            />
            <MetricCard
              label="EV share of new car sales"
              value="22%"
              unit="2025"
              direction="up"
              polarity="up-is-good"
              changeText="+21pp since 2019 · ZEV mandate target: 80% by 2030"
              sparklineData={[0.8, 1.5, 2.8, 4.2, 8.0, 14.3, 16.8, 19.1, 22.0]}
              source="SMMT · Vehicle Registration Statistics 2025"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK greenhouse gas emissions vs carbon budget ceiling, 2015–2025"
              subtitle="UK territorial emissions (MtCO2e, red) vs carbon budget ceiling (dark). Emissions are falling but projected to exceed the fourth budget period (2023–27)."
              series={emissionsSeries}
              annotations={emissionsAnnotations}
              yLabel="MtCO2e"
              source={{ name: 'DESNZ', dataset: 'UK greenhouse gas emissions statistics', url: 'https://www.gov.uk/government/collections/uk-greenhouse-gas-emissions-statistics', frequency: 'annual', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Net zero policy implementation: EVs and heat pumps, 2015–2025"
              subtitle="EV new car sales share % (green) and annual heat pump installations (thousands, amber). EV uptake broadly on track; heat pumps far below the required trajectory."
              series={decarbSeries}
              annotations={decarbAnnotations}
              yLabel="% / thousands"
              source={{ name: 'SMMT / DESNZ', dataset: 'Vehicle Registration Statistics / Heat Pump Statistics', url: 'https://www.smmt.co.uk/vehicle-data/', frequency: 'annual', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="UK emissions 53% below 1990 levels — fastest in the G7"
            value="-53%"
            unit="UK territorial emissions vs 1990"
            description="UK territorial greenhouse gas emissions fell 53% below 1990 levels by 2025, the fastest reduction of any major economy over that period. Clean power from renewables reached 50.8% of electricity generation in 2024. The Clean Energy Act 2024 legally binds the 2030 clean power target. The North Sea offshore wind pipeline, at over 45 GW in various stages of development, gives the UK the largest offshore wind capacity in Europe and a credible path to near-zero-carbon electricity by 2030."
            source="Source: DESNZ — UK greenhouse gas emissions statistics 2025. Ofgem — Energy generation statistics 2025."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/uk-greenhouse-gas-emissions-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DESNZ — UK greenhouse gas emissions statistics</a> — territorial emissions by sector. Retrieved March 2026.</p>
            <p><a href="https://www.theccc.org.uk/publication/progress-in-reducing-uk-emissions-2025-report-to-parliament/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Climate Change Committee — Progress in Reducing UK Emissions</a> — annual assessment of policy progress. Retrieved March 2026.</p>
            <p><a href="https://www.smmt.co.uk/vehicle-data/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">SMMT — Vehicle Registration Statistics</a> — EV and ZEV sales share data. Retrieved March 2026.</p>
            <p className="mt-2">Carbon budget ceilings are legally binding 5-year totals set under the Climate Change Act 2008. Territorial emissions exclude international aviation and shipping. Heat pump installation data from DESNZ MCS certified installations database. EV share covers battery electric vehicles only; plug-in hybrid vehicles are counted separately.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
