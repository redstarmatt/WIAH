'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Properties newly protected by flood defences per year (thousands), 2015–2024 — EA
const newlyProtectedValues = [28, 30, 35, 40, 42, 25, 38, 45, 50, 48];

// Flood defence condition: % in target condition, 2015–2024 — EA
const defenceConditionValues = [93, 93, 92, 92, 91, 91, 90, 90, 89, 89];

// Total properties at risk (millions), 2015–2024 — EA
const atRiskTotalValues = [5.2, 5.2, 5.3, 5.3, 5.4, 5.4, 5.5, 5.5, 5.6, 5.7];

const protectionSeries: Series[] = [
  {
    id: 'newly-protected',
    label: 'Properties newly protected per year (thousands)',
    colour: '#2A9D8F',
    data: newlyProtectedValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const conditionSeries: Series[] = [
  {
    id: 'defence-condition',
    label: 'Flood defences in target condition (%)',
    colour: '#264653',
    data: defenceConditionValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const riskSeries: Series[] = [
  {
    id: 'at-risk',
    label: 'Properties at some flood risk (millions)',
    colour: '#E63946',
    data: atRiskTotalValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const floodAnnotations: Annotation[] = [
  { date: new Date(2015, 11, 1), label: 'Dec 2015: Storm Desmond' },
  { date: new Date(2020, 1, 1), label: 'Feb 2020: Storm Dennis — record floods' },
];

export default function FloodRiskPage() {
  return (
    <>
      <TopicNav topic="Flood Risk" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Flood Risk"
          question="How Many Homes Are Actually at Risk of Flooding?"
          finding="5.7 million properties in England are at some flood risk — from rivers, sea, or surface water. Flood defence spending is protecting tens of thousands of additional homes each year, but climate change is increasing risk faster than defences are being built. Maintenance of existing defences is falling behind."
          colour="#264653"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The Environment Agency estimates that approximately 5.7 million properties in England are at some risk of flooding — from rivers, the sea, or surface water drainage failure. Of these, around 220,000 face a significant annual risk (greater than 1% per year from rivers and the sea), while surface water flooding — from blocked drains and overwhelmed sewers during intense rainfall — affects many more properties that do not appear on traditional flood maps. Climate projections indicate that flooding frequency and severity will increase significantly: winter rainfall is projected to increase 20–30% by 2050, and the number of properties at significant flood risk could more than double to half a million by the 2050s under high-emission scenarios.</p>
            <p>The government's six-year flood defence investment programme (2021–2027) has committed £5.6 billion to build and improve flood defences, with a target of protecting 336,000 additional properties. Progress has been broadly on track in terms of new protection, with around 48,000 properties newly protected in 2024. However, the condition of the existing defence stock — around 250,000 flood defence assets including walls, embankments, pumping stations, and gates — is deteriorating. The Environment Agency's own assessment found that only 89% of flood defences are in the target condition category ('functional'), against an aspiration of 95%. Deferred maintenance has created a backlog estimated at over £1 billion. Without additional investment in maintenance, the effective protection offered by existing defences will decline even as new defences are built.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'New protection' },
          { id: 'sec-chart2', label: 'Defence condition' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Properties at some flood risk"
              value="5.7M"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 5.2M in 2015 · climate change increasing risk faster than defences"
              sparklineData={[5.2, 5.2, 5.3, 5.3, 5.4, 5.4, 5.5, 5.5, 5.6, 5.7]}
              source="Environment Agency · National flood risk assessment 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Properties newly protected (2024)"
              value="48,000"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="On track for 336,000 target by 2027 · £5.6bn programme"
              sparklineData={[28, 30, 35, 40, 42, 25, 38, 45, 50, 48]}
              source="Environment Agency · Flood defence investment tracker 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Flood defences in target condition"
              value="89%"
              unit=""
              direction="down"
              polarity="down-is-bad"
              changeText="Down from 93% in 2015 · maintenance backlog £1bn+"
              sparklineData={[93, 93, 92, 92, 91, 91, 90, 90, 89, 89]}
              source="Environment Agency · Asset performance indicators 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Properties newly protected by flood defences, England, 2015–2024"
              subtitle="Annual number of properties gaining new or improved flood protection through Environment Agency capital investment schemes. COVID caused dip in 2020; since recovered."
              series={protectionSeries}
              annotations={floodAnnotations}
              yLabel="Properties (thousands)"
              source={{ name: 'Environment Agency', dataset: 'Flood defence investment tracker', url: 'https://www.gov.uk/government/publications/flood-and-coastal-defence-programme-tracker', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Flood defence condition and properties at risk, England, 2015–2024"
              subtitle="Percentage of flood defences meeting target condition (left) and total properties at some flood risk in millions (right). Defence condition declining; at-risk numbers rising."
              series={[
                { id: 'defence-condition', label: 'Defences in target condition (%)', colour: '#264653', data: defenceConditionValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })) },
                { id: 'at-risk', label: 'Properties at risk (millions)', colour: '#E63946', data: atRiskTotalValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })) },
              ]}
              annotations={[]}
              yLabel="Value"
              source={{ name: 'Environment Agency', dataset: 'National flood risk assessment and asset condition', url: 'https://www.gov.uk/government/collections/national-flood-risk-assessment', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Every £1 spent on flood defences saves £9 in flood damage"
            value="£9"
            description="Environment Agency economic analysis consistently shows that flood defence investment delivers a benefit-cost ratio of approximately 9:1 — one of the highest returns of any public infrastructure investment. The £5.6 billion programme (2021–2027) is estimated to generate around £50 billion in avoided flood damages over the scheme lifetime. Natural flood management — using natural features such as wetlands, woodland, and floodplain restoration to slow and store water — can complement engineered defences at significantly lower cost. The 25 Year Environment Plan commits to 25,000 hectares of intertidal habitat creation, which will provide both flood protection and biodiversity benefits."
            source="Source: Environment Agency — Flood and coastal erosion risk management investment 2024. HM Treasury — Green Book appraisal guidance."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/national-flood-risk-assessment" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Environment Agency — National flood risk assessment</a> — estimates of properties at risk from rivers, sea, and surface water, updated annually.</p>
            <p><a href="https://www.gov.uk/government/publications/flood-and-coastal-defence-programme-tracker" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Environment Agency — Flood defence programme tracker</a> — progress against the 2021–2027 investment programme targets.</p>
            <p>Properties at risk includes all properties with some probability of flooding from rivers, sea, or surface water. 'Significant risk' is defined as greater than 1% annual probability from rivers or sea.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
