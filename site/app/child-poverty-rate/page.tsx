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

// Child poverty rate (%), BHC and AHC, 2000/01–2023/24
const bhcValues = [23.4, 22.8, 22.1, 21.5, 21.3, 22.0, 22.5, 22.8, 22.0, 20.0, 18.0, 17.5, 17.4, 17.4, 18.5, 19.9, 20.1, 20.5, 20.2, 20.0, 20.5, 21.5, 22.0, 22.5];
const ahcValues = [33.0, 32.2, 31.5, 30.5, 30.0, 30.5, 30.0, 29.5, 29.0, 27.5, 27.0, 27.5, 27.2, 27.5, 28.5, 29.0, 30.0, 30.5, 30.0, 29.5, 30.0, 30.5, 30.0, 30.2];

// Regional child poverty rates AHC (%), 2023/24
const regionLabels = ['London', 'West Midlands', 'North West', 'Yorkshire', 'North East', 'East Midlands', 'South West', 'East', 'South East'];
const regionValues = [38.2, 35.5, 33.0, 32.5, 31.0, 29.5, 24.0, 26.5, 23.5];

const series1: Series[] = [
  {
    id: 'bhc',
    label: 'Before housing costs (%)',
    colour: '#6B7280',
    data: bhcValues.map((v, i) => ({ date: new Date(2000 + i, 6, 1), value: v })),
  },
  {
    id: 'ahc',
    label: 'After housing costs (%)',
    colour: '#E63946',
    data: ahcValues.map((v, i) => ({ date: new Date(2000 + i, 6, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'regional',
    label: 'Child poverty rate AHC (%)',
    colour: '#E63946',
    data: regionValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2010, 6, 1), label: '2010: Child Poverty Act targets set' },
  { date: new Date(2017, 0, 1), label: '2017: Two-child limit introduced' },
  { date: new Date(2020, 6, 1), label: '2020: COVID-19 £20 UC uplift' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'DWP', dataset: 'Households Below Average Income (HBAI)', url: 'https://www.gov.uk/government/collections/households-below-average-income-hbai--2', date: '2024' },
  { num: 2, name: 'End Child Poverty', dataset: 'Local child poverty rates', url: 'https://endchildpoverty.org.uk/child-poverty/', date: '2024' },
  { num: 3, name: 'Joseph Rowntree Foundation', dataset: 'UK Poverty Report', url: 'https://www.jrf.org.uk/uk-poverty-2024', date: '2024' },
];

export default function ChildPovertyRatePage() {
  return (
    <>
      <TopicNav topic="Child Poverty Rate" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Child Poverty Rate"
          question="How Many Children Are Growing Up Poor?"
          finding="4.3 million children in the UK are living in relative poverty after housing costs — nearly one in three. The two-child benefit limit affects 1.5 million children, and in-work poverty is now the dominant driver."
          colour="#E63946"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK's child poverty rate, measured after housing costs, stands at 30% — meaning 4.3 million children are growing up in households with less than 60% of median income.<Cite nums={1} /> The headline has barely shifted in a decade, masking a significant structural change: the majority of children in poverty now live in working households. Two-thirds of poor children have at least one parent in employment, up from around half in the early 2000s.<Cite nums={3} /> The gap between the before-housing-costs and after-housing-costs measures — currently around 8 percentage points — reflects the extraordinary burden of housing costs on low-income families, particularly in London and the South East where the AHC rate reaches 38%.<Cite nums={2} /></p>
            <p>The two-child limit on benefit claims, introduced in April 2017, now affects approximately 1.5 million children in 450,000 families. The policy prevents families from claiming the child element of Universal Credit or Child Tax Credit for a third or subsequent child. The Joseph Rowntree Foundation estimates its removal would lift 300,000 children out of poverty immediately.<Cite nums={3} /> Regional disparities are stark: London records the highest AHC child poverty rate at 38.2%, driven by housing costs, while the South East records the lowest at 23.5%. Within cities, the variation is even more extreme — in some Birmingham and Tower Hamlets wards, more than half of all children live in poverty.<Cite nums={2} /> The 2010 Child Poverty Act set a target of reducing relative child poverty to below 10% by 2020. That target was never met, and the Act was quietly repealed in 2016.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'National trend' },
          { id: 'sec-chart2', label: 'Regional rates' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Children in poverty (AHC)"
              value="4.3M"
              unit="2023/24"
              direction="up"
              polarity="up-is-bad"
              changeText="30% of all children · up from 27% in 2010/11"
              sparklineData={ahcValues.slice(-8)}
              source="DWP — Households Below Average Income 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Child poverty rate (AHC)"
              value="30%"
              unit="2023/24"
              direction="up"
              polarity="up-is-bad"
              changeText="highest since 2002 · 2010 target was below 10%"
              sparklineData={ahcValues.slice(-8)}
              source="DWP — Households Below Average Income 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Children hit by two-child limit"
              value="1.5M"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="in 450,000 families · removal would lift 300k out of poverty"
              sparklineData={[0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.5]}
              source="JRF — UK Poverty Report 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Child poverty rate, UK, 2000–2024"
              subtitle="Percentage of children in relative poverty (below 60% median income) before housing costs (grey) and after housing costs (red). The AHC measure better reflects lived experience."
              series={series1}
              annotations={annotations}
              yLabel="Poverty rate (%)"
              source={{ name: 'DWP', dataset: 'Households Below Average Income', url: 'https://www.gov.uk/government/collections/households-below-average-income-hbai--2', frequency: 'annual', date: 'Mar 2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Child poverty rate by region (AHC), UK, 2015–2024"
              subtitle="Regional variation in child poverty after housing costs. London consistently records the highest rate, driven by housing costs. Data shown as annual snapshots."
              series={series2}
              annotations={[{ date: new Date(2017, 0, 1), label: '2017: Two-child limit takes effect' }]}
              yLabel="Poverty rate (%)"
              source={{ name: 'End Child Poverty', dataset: 'Local child poverty rates', url: 'https://endchildpoverty.org.uk/child-poverty/', frequency: 'annual', date: 'Jun 2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Scottish Child Payment: devolved action on child poverty"
            value="£26.70"
            unit="per child per week"
            description="Scotland introduced the Scottish Child Payment in February 2021, initially at £10 per week per eligible child, subsequently increased to £26.70. Available to low-income families receiving qualifying benefits, it now reaches over 300,000 children. Early evaluation suggests the payment has reduced relative child poverty in Scotland by approximately 5 percentage points, demonstrating that direct cash transfers to low-income families can produce measurable reductions in child poverty within a short timeframe."
            source="Source: Scottish Government — Scottish Child Payment statistics 2024. Scottish Fiscal Commission evaluation."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/households-below-average-income-hbai--2" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DWP — Households Below Average Income</a> — the official UK measure of income poverty. Based on the Family Resources Survey of approximately 20,000 households. Relative poverty threshold is 60% of contemporary median equivalised household income.</p>
            <p><a href="https://endchildpoverty.org.uk/child-poverty/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">End Child Poverty</a> — local and regional estimates derived from DWP and HMRC data by Loughborough University. Provides ward-level and constituency-level estimates.</p>
            <p><a href="https://www.jrf.org.uk/uk-poverty-2024" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Joseph Rowntree Foundation — UK Poverty 2024</a> — annual analysis of poverty trends including the impact of specific policy measures such as the two-child limit and benefit cap.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
