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

// Properties at flood risk (millions), 2015–2025
const propertiesAtRisk = [4.9, 4.9, 5.0, 5.0, 5.0, 5.1, 5.2, 5.2, 5.3, 5.3, 5.4];
// Flood defence assets in good condition (%), 2015–2025
const defenceCondition = [67, 66, 65, 63, 62, 60, 59, 58, 57, 55, 54];
// Capital investment (£m), 2015–2025
const capitalInvestment = [420, 450, 480, 510, 530, 560, 700, 720, 800, 850, 870];
// Maintenance spend (£m), 2015–2025
const maintenanceSpend = [210, 215, 218, 220, 225, 230, 240, 245, 250, 255, 260];

const series1: Series[] = [
  {
    id: 'propertiesAtRisk',
    label: 'Properties at flood risk (millions)',
    colour: '#264653',
    data: propertiesAtRisk.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'defenceCondition',
    label: 'Defences in good condition (%)',
    colour: '#2A9D8F',
    data: defenceCondition.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'capitalInvestment',
    label: 'Capital investment (£m)',
    colour: '#2A9D8F',
    data: capitalInvestment.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'maintenanceSpend',
    label: 'Maintenance spend (£m)',
    colour: '#F4A261',
    data: maintenanceSpend.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const annotations1: Annotation[] = [
  { date: new Date(2019, 0, 1), label: '2019: Winter floods — £333m damage' },
  { date: new Date(2024, 0, 1), label: '2024: Record storm frequency' },
];

const annotations2: Annotation[] = [
  { date: new Date(2021, 0, 1), label: '2021: £5.2bn 6-year programme begins' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'Environment Agency', dataset: 'National Flood Risk Assessment', url: 'https://www.gov.uk/government/organisations/environment-agency', date: '2024' },
  { num: 2, name: 'Environment Agency', dataset: 'Asset management report', date: '2024' },
  { num: 3, name: 'Environment Agency', dataset: 'Flood and coastal erosion risk management report', url: 'https://www.gov.uk/government/statistics/flood-and-coastal-risk-management-in-england-report', date: '2025' },
];

export default function FloodingRiskPage() {
  return (
    <>
      <TopicNav topic="Flooding Risk" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment & Climate"
          question="How Many Homes Are at Risk of Flooding?"
          finding="5.4 million properties in England are at risk of flooding — and only 54% of flood defence assets are currently in good condition as climate change increases flood frequency."
          colour="#2A9D8F"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>5.4 million properties in England face some risk of flooding from rivers, the sea, or surface water<Cite nums={1} />. This figure has grown steadily over the past decade, driven by housing development in flood-prone areas, aging infrastructure, and changing rainfall patterns linked to climate change. The Environment Agency's risk mapping covers both low and high probability zones, but even low-probability events cause enormous financial and psychological damage when they occur. The 2019–20 winter floods alone caused an estimated £333 million in damage<Cite nums={3} /> and displaced thousands of households for months.</p>
            <p>The condition of existing flood defences is a mounting concern. Only 54% of flood defence assets are rated in good or very good condition, down from 67% in 2015<Cite nums={2} />. A maintenance backlog — estimated at over £1 billion — has accumulated during a decade of constrained local authority and Environment Agency budgets. Capital investment in new defences has risen significantly since 2021 under the government's six-year programme, but maintenance of existing assets has not kept pace. A new defence that is poorly maintained can fail at a critical moment, meaning headline investment figures can be misleading without a parallel focus on upkeep.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Properties at Risk' },
          { id: 'sec-chart2', label: 'Investment' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Properties at flood risk (England)"
              value="5.4m"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 5.0m in 2019 · climate-driven increase"
              sparklineData={propertiesAtRisk.slice(-8)}
              source="Environment Agency · National Flood Risk Assessment 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Flood defence assets in good condition"
              value="54%"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="Down from 67% in 2015 · maintenance backlog"
              sparklineData={defenceCondition.slice(-8)}
              source="Environment Agency · Asset management report 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Annual cost of flooding"
              value="£1.1bn"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Average economic cost · rising trend"
              sparklineData={[0.6, 0.7, 0.8, 0.9, 1.0, 0.9, 1.0, 1.1]}
              source="Environment Agency · Flood risk economics 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Properties at risk of flooding, England, 2015–2025"
              subtitle="Number of residential and non-residential properties in areas at risk of flooding from rivers, sea or surface water, alongside proportion of flood defence assets rated in good condition."
              series={series1}
              annotations={annotations1}
              yLabel="Properties (m) / Condition (%)"
              source={{ name: 'Environment Agency', dataset: 'National Flood Risk Assessment', url: 'https://www.gov.uk/government/organisations/environment-agency', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Flood defence investment vs maintenance, England, 2015–2025"
              subtitle="Annual Environment Agency capital investment in new flood defences versus maintenance spending. Capital investment has risen sharply since 2021 but maintenance has lagged."
              series={series2}
              annotations={annotations2}
              yLabel="Spend (£m)"
              source={{ name: 'Environment Agency', dataset: 'Flood and coastal erosion risk management report', url: 'https://www.gov.uk/government/organisations/environment-agency', frequency: 'annual', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Record flood investment programme"
            value="£5.2bn"
            unit="2021–27 flood investment programme"
            description="The government committed £5.2 billion to better protect an additional 336,000 properties from flooding by 2027 — the largest ever investment in flood defences. Schemes completed so far have protected 73,000 properties. A further £2.4 billion was announced in 2024 for the period beyond 2027, with a greater emphasis on nature-based solutions such as catchment restoration and wetland creation."
            source="Source: Environment Agency — Flood and coastal erosion risk management report, 2025."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/organisations/environment-agency" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Environment Agency — National Flood Risk Assessment</a> — Annual assessment of properties at risk from river, coastal and surface water flooding. Retrieved 2025.</p>
            <p><a href="https://www.gov.uk/government/statistics/flood-and-coastal-risk-management-in-england-report" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Environment Agency — Flood and coastal erosion risk management report</a> — Annual investment, maintenance and outcome data. Retrieved 2025.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
