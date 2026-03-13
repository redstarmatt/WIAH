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

// UK aviation CO2 emissions (MtCO2), 2010–2024 — DESNZ
const emissionsValues = [31.2, 32.4, 33.1, 33.8, 34.2, 34.9, 35.2, 35.8, 36.1, 36.4, 12.8, 17.2, 29.4, 33.8, 35.0];

// UK airport passengers (millions), 2010–2024 — CAA
const passengersValues = [211, 219, 225, 232, 238, 244, 252, 258, 263, 270, 82, 104, 196, 250, 266];

// Air Passenger Duty revenue (£bn), 2014–2024 — HMRC
const apdRevenueValues = [2.9, 3.0, 3.1, 3.2, 3.4, 3.5, 3.7, 1.4, 1.8, 3.4, 3.7];

const series1: Series[] = [
  {
    id: 'emissions',
    label: 'Aviation CO₂ emissions (MtCO₂)',
    colour: '#E63946',
    data: emissionsValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'passengers',
    label: 'UK airport passengers (millions)',
    colour: '#264653',
    data: passengersValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2019, 0, 1), label: '2019: Pre-COVID peak — 270M passengers' },
  { date: new Date(2020, 0, 1), label: '2020: COVID-19 — 70% traffic collapse' },
  { date: new Date(2022, 0, 1), label: '2022: Jet Zero Strategy published' },
];

export default function AviationEmissionsPage() {
  return (
    <>
      <TopicNav topic="Aviation Emissions" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment & Climate"
          question="Is flying wrecking Britain's climate goals?"
          finding="Aviation accounts for 7–8% of the UK's total climate impact — more than rail and buses combined. Passenger numbers have fully recovered to pre-pandemic levels at 266 million. Aviation benefits from an estimated £7 billion in annual tax exemptions: no fuel duty and no VAT on international flights. The Climate Change Committee has warned that unconstrained demand growth is incompatible with net zero."
          colour="#E63946"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Aviation is one of the hardest sectors to decarbonise and one of the fastest-growing sources of UK emissions. Direct CO2 from UK aviation amounts to around 35 million tonnes annually — roughly equivalent to all UK car emissions for four months. But CO2 is only part of the story: contrails, water vapour, and nitrogen oxides emitted at altitude have a warming effect estimated at 2–4 times the CO2 figure, meaning aviation's total climate impact is equivalent to perhaps 80–140 million tonnes of CO2-equivalent. Only around half the UK population flies in any given year, and the most frequent fliers — roughly 15% of adults — account for an estimated 70% of all flights. Aviation has recovered fully from COVID: 266 million passengers used UK airports in 2024, above the 2019 pre-pandemic record.</p>
            <p>Aviation enjoys extraordinary fiscal privilege. Aviation kerosene carries no fuel duty — a 1944 Chicago Convention provision never updated for the climate era. International flights are zero-rated for VAT. HMRC analysis suggests the combined value of these exemptions is around £7 billion per year. The only aviation tax, Air Passenger Duty, raised £3.7 billion in 2023/24 — well below the estimated cost of exemptions. By comparison, a litre of petrol attracts 52.95p in fuel duty plus 20% VAT. The Climate Change Committee has consistently recommended reforming APD to better reflect climate costs, and proposed a frequent flier levy and higher rates for long-haul flights. The government has instead frozen or reduced APD rates in recent years. The Jet Zero Strategy (2022) set a target of net zero aviation by 2050, primarily relying on Sustainable Aviation Fuel — but the CCC has cautioned that SAF supply is deeply uncertain and that demand management will also be necessary.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Emissions' },
          { id: 'sec-chart2', label: 'Passengers' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Aviation share of UK climate impact"
              value="7–8%"
              unit="including contrail effects"
              direction="flat"
              polarity="up-is-bad"
              changeText="CO2 alone: ~4% · contrail warming effect 2–4x CO2 · more than all rail and buses"
              sparklineData={emissionsValues.slice(-8)}
              source="DESNZ — UK GHG National Statistics 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Annual aviation tax exemption value"
              value="£7bn"
              unit="estimated"
              direction="flat"
              polarity="up-is-bad"
              changeText="No fuel duty · no VAT on international flights · APD raises £3.7bn"
              sparklineData={apdRevenueValues}
              source="HMRC — Tax Expenditures and Ready Reckoners 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="UK airport passengers"
              value="266M"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="Above 2019 pre-COVID peak · projected 370M by 2050"
              sparklineData={passengersValues.slice(-8)}
              source="CAA — UK Aviation Activity Statistics 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK aviation CO₂ emissions, 2010–2024"
              subtitle="Territorial aviation CO₂ in million tonnes. COVID caused a 70% collapse in 2020, followed by rapid recovery. Emissions returned to near pre-pandemic levels by 2024."
              series={series1}
              annotations={annotations}
              yLabel="MtCO₂"
              source={{ name: 'DESNZ', dataset: 'UK Greenhouse Gas National Statistics', url: 'https://www.gov.uk/government/collections/uk-greenhouse-gas-emissions-statistics', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Passengers at UK airports, 2010–2024"
              subtitle="Total terminal passengers (millions) across all UK airports. Fully recovered from COVID by 2024, exceeding pre-pandemic peak. Growth forecast to continue through the 2030s."
              series={series2}
              annotations={[{ date: new Date(2020, 0, 1), label: '2020: COVID-19 — 70% traffic collapse' }]}
              yLabel="Passengers (millions)"
              source={{ name: 'Civil Aviation Authority', dataset: 'UK Aviation Activity Statistics', url: 'https://www.caa.co.uk/data-and-analysis/uk-aviation-market/airports/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="SAF mandate and Jet Zero Strategy — ambition on paper"
            value="10%"
            unit="Sustainable Aviation Fuel blend required by 2030 under UK mandate"
            description="The UK Sustainable Aviation Fuel mandate requires 10% SAF blending by 2030, rising to 22% by 2040 — one of the world's most ambitious SAF timelines. SAF can reduce lifecycle emissions by over 70% compared to conventional jet fuel. Three UK SAF production plants were under development in 2024. Rolls-Royce has successfully tested hydrogen-powered jet engines, demonstrating the technical feasibility of zero-emission aviation. However, the Climate Change Committee has cautioned that SAF supply is deeply uncertain and that current global production falls far short of what the Jet Zero Strategy assumes. The CCC's advice is that demand management — including frequent flier levies and reformed aviation taxation — will also be necessary to stay within carbon budgets compatible with net zero."
            source="Source: DfT — Jet Zero Strategy 2022. Climate Change Committee — Progress Report to Parliament 2024. Rolls-Royce — Hydrogen engine test results 2023."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/uk-greenhouse-gas-emissions-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DESNZ — UK Greenhouse Gas National Statistics</a> — annual publication. Aviation CO2 figures are territorial emissions from flights departing UK airports (domestic flights counted in full; international flights counted to the midpoint). Contrail and non-CO2 warming effects are estimated separately using IPCC radiative forcing factors.</p>
            <p><a href="https://www.caa.co.uk/data-and-analysis/uk-aviation-market/airports/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Civil Aviation Authority — UK Aviation Activity Statistics</a> — annual. Total terminal passengers at all UK airports. APD revenue from HMRC Tax Receipts and National Insurance Contributions.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
