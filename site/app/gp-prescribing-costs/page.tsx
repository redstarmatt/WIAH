'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'NHS England', dataset: 'Prescription Cost Analysis', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/prescription-cost-analysis', date: '2024' },
  { num: 2, name: 'NHS Business Services Authority', dataset: 'NHS Prescriptions Data', url: 'https://www.nhsbsa.nhs.uk/prescription-data', date: '2024' },
  { num: 3, name: 'NICE', dataset: 'Medicines Optimisation Evidence Reviews', url: 'https://www.nice.org.uk/about/what-we-do/our-programmes/nice-guidance/nice-guidelines/medicines-optimisation', date: '2024' },
];

const totalCostValues = [8.4, 8.6, 8.8, 9.1, 9.4, 9.6, 9.9, 10.2, 10.6, 11.0, 11.4];
const itemsDispensedValues = [1014, 1026, 1048, 1066, 1083, 1071, 1089, 1102, 1118, 1134, 1148];
const antidepressantItems = [52.9, 54.8, 57.1, 60.2, 64.7, 70.9, 76.1, 81.4, 85.2, 88.9, 92.4];
const genericPrescribingValues = [83.2, 83.8, 84.5, 85.1, 85.9, 86.4, 87.0, 87.5, 88.0, 88.3, 88.6];

const series1: Series[] = [
  { id: 'cost', label: 'Total prescription cost (£ billion)', colour: '#E63946', data: totalCostValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'items', label: 'Items dispensed (millions)', colour: '#264653', data: itemsDispensedValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const series2: Series[] = [
  { id: 'antidepressant', label: 'Antidepressant items dispensed (millions)', colour: '#F4A261', data: antidepressantItems.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'generic', label: 'Generic prescribing rate (%)', colour: '#2A9D8F', data: genericPrescribingValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

export default function GpPrescribingCostsPage() {
  return (
    <>
      <TopicNav topic="GP Prescribing Costs" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health"
          question="How Much Is the NHS Spending on Prescriptions?"
          finding={<>The NHS dispensed 1.15 billion prescription items in 2023/24 at a net cost of £11.4 billion — up from £8.4 billion a decade ago.<Cite nums={1} /> Antidepressants now account for 92 million items annually — the most dispensed drug class — reflecting both genuine mental health need and the absence of adequate non-pharmacological alternatives in primary care.<Cite nums={[1, 2]} /></>}
          colour="#E63946"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>NHS prescribing costs have risen consistently for three decades, driven by a combination of population growth, ageing, rising prevalence of long-term conditions, and the introduction of new — and expensive — treatments. The annual primary care prescribing bill now exceeds £11.4 billion, making it one of the largest single line items in NHS spending. However, the story is more nuanced than simple cost inflation: generic prescribing rates have risen from 83% to 88.6% over the past decade, delivering substantial savings by substituting branded medicines with chemically identical but far cheaper generic versions. NHS England estimates that generic prescribing saves around £1.3 billion per year compared to equivalent branded prescribing.<Cite nums={[1, 3]} /></p>
            <p>The most striking trend in prescribing is the rise of antidepressants. From 52.9 million items in 2013 to 92.4 million in 2024 — a 75% increase — antidepressants are now the most prescribed drug class in England by item volume. This reflects genuine growth in diagnosed depression and anxiety, but also the structural failure of NHS talking therapy services: waiting times for IAPT (Improving Access to Psychological Therapies) have historically been months long, and many GPs prescribe antidepressants as the only practically available intervention.<Cite nums={2} /> A longer-term concern is the growing cost of novel obesity treatments — GLP-1 agonists such as semaglutide — which are now NICE-approved for weight management. Projections suggest they could add £4–6 billion annually to the prescribing budget within five years if prescribed at the scale of eligible patients.<Cite nums={3} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-chart1', label: 'Cost & Volume' },
          { id: 'sec-chart2', label: 'Antidepressants & Generics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="Total prescribing cost" value="£11.4bn" unit="2023/24" direction="up" polarity="up-is-bad" changeText="up from £8.4bn in 2013 · 36% increase in a decade" sparklineData={[8.4, 8.6, 8.8, 9.1, 9.4, 9.6, 9.9, 10.2, 10.6, 11.0, 11.4]} source="NHS England — Prescription Cost Analysis 2024" href="#sec-chart1" />
            <MetricCard label="Items dispensed" value="1.15bn" unit="per year" direction="up" polarity="up-is-bad" changeText="up from 1.01bn in 2013 · rising long-term condition burden" sparklineData={[1014, 1026, 1048, 1066, 1083, 1071, 1089, 1102, 1118, 1134, 1148]} source="NHS England — Prescription Cost Analysis 2024" href="#sec-chart1" />
            <MetricCard label="Antidepressants dispensed" value="92.4M" unit="items per year" direction="up" polarity="up-is-bad" changeText="up from 52.9M in 2013 · 75% increase · most-dispensed class" sparklineData={[52.9, 54.8, 57.1, 60.2, 64.7, 70.9, 76.1, 81.4, 85.2, 88.9, 92.4]} source="NHS BSA — Prescriptions Data 2024" href="#sec-chart2" />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="NHS prescription cost and items dispensed, 2013–2024"
              subtitle="Net ingredient cost (£ billion) and items dispensed (millions) in primary care, England. Both rising consistently, though generic substitution has kept cost increases below volume increases."
              series={series1}
              annotations={[]}
              yLabel="£ billion / Millions"
              source={{ name: 'NHS England', dataset: 'Prescription Cost Analysis', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/prescription-cost-analysis', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Antidepressant items and generic prescribing rate, 2013–2024"
              subtitle="Antidepressant items dispensed annually (millions) and the proportion of items prescribed generically (%). Generic prescribing delivers major savings; antidepressant volume reflects mental health demand."
              series={series2}
              annotations={[]}
              yLabel="Millions / Percentage"
              source={{ name: 'NHS Business Services Authority', dataset: 'NHS Prescriptions Data', url: 'https://www.nhsbsa.nhs.uk/prescription-data', frequency: 'monthly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Generic prescribing saves £1.3 billion annually"
            value="88.6%"
            unit="of prescriptions are now generic — up from 83.2% in 2013"
            description="The NHS's commitment to generic prescribing — substituting branded medicines with chemically identical but far cheaper generic versions — saves an estimated £1.3 billion per year. The rise from 83.2% to 88.6% generic prescribing over the past decade has partially offset the cost increase from higher prescription volumes and new treatments. NHS Scotland achieves a higher generic prescribing rate of 93%, suggesting further savings are available through prescribing system improvements and formulary management."
            source="Source: NHS England — Prescription Cost Analysis 2024. NHS BSA 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://digital.nhs.uk/data-and-information/publications/statistical/prescription-cost-analysis" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — Prescription Cost Analysis</a> — total costs, items, therapeutic categories, generic rates. Annual.</p>
            <p><a href="https://www.nhsbsa.nhs.uk/prescription-data" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS Business Services Authority — Prescriptions Data</a> — detailed prescribing data by drug, practice, and therapeutic area. Monthly.</p>
            <p>Net ingredient cost excludes dispensing fees and VAT. Generic prescribing rate is items prescribed by non-proprietary name as a proportion of total items. Financial year runs April to March.</p>
          </div>
        </section>
      </main>
    </>
  );
}
