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

// Local authority road maintenance spending (£ billions, real terms 2023 prices), 2010/11–2023/24
const spendingValues = [4.8, 4.5, 4.2, 3.9, 3.6, 3.4, 3.2, 3.1, 3.0, 2.9, 2.7, 2.8, 2.9, 2.9];

// Roads classified as in poor condition — should have been maintained (%), 2010–2024
const poorConditionValues = [6, 7, 8, 9, 10, 11, 12, 13, 14, 14, 15, 16, 16, 17, 17];

// Maintenance backlog (£ billions), 2010–2024
const backlogValues = [8.5, 9.0, 9.5, 10.0, 10.5, 11.0, 11.5, 12.0, 12.5, 12.8, 13.0, 13.5, 14.0, 14.0, 14.0];

const series1: Series[] = [
  {
    id: 'spending',
    label: 'Road maintenance spending (£bn, real terms)',
    colour: '#F4A261',
    data: spendingValues.map((v, i) => ({ date: new Date(2010 + i, 6, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'poor-condition',
    label: 'Roads in poor condition (%)',
    colour: '#E63946',
    data: poorConditionValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
  {
    id: 'backlog',
    label: 'Maintenance backlog (£bn)',
    colour: '#F4A261',
    data: backlogValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2014, 0, 1), label: '2014: Severe winter flooding' },
  { date: new Date(2020, 0, 1), label: '2020: COVID-19 reduces traffic' },
  { date: new Date(2023, 9, 1), label: '2023: HS2 funds reallocated to roads' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'AIA', dataset: 'Annual Local Authority Road Maintenance (ALARM) Survey', url: 'https://www.asphaltuk.org/alarm-survey/', date: '2024' },
  { num: 2, name: 'RAC Foundation', dataset: 'Pothole-related breakdown statistics', url: 'https://www.racfoundation.org/research', date: '2024' },
  { num: 3, name: 'DfT', dataset: 'Road Conditions in England', url: 'https://www.gov.uk/government/statistical-data-sets/road-conditions-in-england', date: '2024' },
];

export default function PotholeCrisisPage() {
  return (
    <>
      <TopicNav topic="Pothole Crisis" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Pothole Crisis"
          question="Why Are the Roads Falling Apart?"
          finding="Local authority road maintenance budgets have been cut by 40% in real terms since 2010, leaving a £14 billion repair backlog. 17% of local roads are now classified as in poor condition, and the RAC reports record levels of pothole-related breakdowns."
          colour="#F4A261"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The deterioration of England's local road network is one of the most visible consequences of a decade of reduced local authority spending. The Annual Local Authority Road Maintenance (ALARM) survey, published by the Asphalt Industry Alliance, estimates the one-time cost of bringing all local roads back to a reasonable standard at £14 billion — a figure that has grown by 65% since 2010.<Cite nums={1} /> At current budgets, it would take more than 20 years to clear the backlog, during which time further deterioration would create new liabilities. The DfT road condition survey confirms that 17% of the local road network — covering A roads, B roads, and unclassified roads — is now classified as in poor condition, meaning it should have been repaired already.<Cite nums={3} /></p>
            <p>The consequences are felt daily by motorists, cyclists, and pedestrians. The RAC attended a record 29,377 pothole-related breakdowns in 2023 — damage to tyres, wheels, and suspension caused by road surface defects — up 39% from pre-pandemic levels.<Cite nums={2} /> Councils filled an estimated 1.7 million potholes in 2023/24, but this reactive patching addresses symptoms rather than the underlying structural deterioration. The root cause is straightforward: local authority road maintenance spending has fallen from £4.8 billion in 2010/11 to £2.9 billion in 2023/24 in real terms — a 40% reduction — while the road network itself has continued to age and endure heavier traffic loads, more extreme weather events, and utility works that weaken road surfaces.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Spending trend' },
          { id: 'sec-chart2', label: 'Road condition' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Road maintenance backlog"
              value="£14bn"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="up from £8.5bn in 2010 · 20+ years to clear at current spending"
              sparklineData={backlogValues.slice(-8)}
              source="ALARM Survey 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Local roads in poor condition"
              value="17%"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 6% in 2010 · 'should have been maintained already'"
              sparklineData={poorConditionValues.slice(-8)}
              source="DfT — Road Conditions in England 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="RAC pothole-related breakdowns"
              value="29,377"
              unit="2023"
              direction="up"
              polarity="up-is-bad"
              changeText="up 39% from pre-pandemic levels · record high"
              sparklineData={[18200, 19100, 20500, 21100, 17800, 23400, 26800, 29377]}
              source="RAC Foundation 2024"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Local authority road maintenance spending, England, 2010/11–2023/24"
              subtitle="Real-terms spending (2023 prices) on local road maintenance by councils in England. A 40% reduction over the period despite growing demand."
              series={series1}
              annotations={annotations}
              yLabel="Spending (£ billions)"
              source={{ name: 'AIA', dataset: 'ALARM Survey', url: 'https://www.asphaltuk.org/alarm-survey/', frequency: 'annual', date: 'Mar 2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Road condition and maintenance backlog, England, 2010–2024"
              subtitle="Percentage of local roads in poor condition (red) and cumulative maintenance backlog in billions (amber). Both have risen steadily as spending has fallen."
              series={series2}
              annotations={[{ date: new Date(2023, 9, 1), label: '2023: £8.3bn HS2 reallocation announced' }]}
              yLabel="% / £ billions"
              source={{ name: 'DfT / AIA', dataset: 'Road Conditions in England & ALARM Survey', url: 'https://www.gov.uk/government/statistical-data-sets/road-conditions-in-england', frequency: 'annual', date: 'Mar 2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="HS2 reallocation: £8.3 billion for road resurfacing"
            value="£8.3bn"
            unit="pledged over 11 years"
            description="In October 2023, the government announced the cancellation of the northern leg of HS2 and the reallocation of £8.3 billion to local transport, including road resurfacing. The Network North plan pledged to resurface 5,000 miles of road per year. While questions remain about the delivery timeline and whether funds will reach councils in the most affected areas, the announcement represents the largest single commitment to local road maintenance in decades. If sustained, it would make a material difference to the backlog, though it would still take many years to address the full £14 billion deficit."
            source="Source: HM Treasury — Network North. DfT road investment strategy."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.asphaltuk.org/alarm-survey/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">AIA — ALARM Survey</a> — Annual Local Authority Road Maintenance survey of all highway authorities in England and Wales. Covers budgets, backlog estimates, and pothole repair volumes. Response rate typically 70–80% of authorities.</p>
            <p><a href="https://www.racfoundation.org/research" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">RAC Foundation</a> — pothole-related breakdown data derived from RAC patrol callout records. Covers approximately 8 million members. Breakdown categories include tyre damage, wheel damage, and suspension failure attributed to road surface defects.</p>
            <p><a href="https://www.gov.uk/government/statistical-data-sets/road-conditions-in-england" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfT — Road Conditions in England</a> — annual survey of road surface condition using SCANNER machine surveys (A and B roads) and visual inspection (unclassified roads). Coverage: all classified roads and a sample of unclassified roads.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
