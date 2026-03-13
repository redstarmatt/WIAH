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

// National child poverty rate (%, AHC) and North East rate, 2010–2024
const nationalPovertyData = [27, 27, 28, 28, 29, 28, 29, 30, 30, 30, 31, 31, 30, 31, 31];
const northEastRateData = [29, 29, 30, 30, 31, 30, 31, 32, 32, 33, 33, 33, 32, 33, 34];

// Children in poverty in working families (%) and real earnings of low-income workers index (2010=100), 2010–2024
const workingFamilyPctData = [57, 59, 61, 62, 63, 64, 65, 66, 66, 67, 67, 68, 67, 68, 69];
const realEarningsIndexData = [100, 98, 96, 95, 95, 96, 98, 100, 102, 104, 104, 108, 106, 110, 112];

const nationalSeries: Series[] = [
  {
    id: 'nationalPoverty',
    label: 'UK child poverty rate, after housing costs (%)',
    colour: '#E63946',
    data: nationalPovertyData.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
  {
    id: 'northEastRate',
    label: 'North East child poverty rate (%)',
    colour: '#F4A261',
    data: northEastRateData.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const workingFamilySeries: Series[] = [
  {
    id: 'workingFamilyPct',
    label: 'Children in poverty in working families (%)',
    colour: '#264653',
    data: workingFamilyPctData.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
  {
    id: 'realEarningsIndex',
    label: 'Real earnings of low-income workers (index, 2010=100)',
    colour: '#2A9D8F',
    data: realEarningsIndexData.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const nationalAnnotations: Annotation[] = [
  { date: new Date(2013, 0, 1), label: '2013: Bedroom tax, benefit cap introduced' },
  { date: new Date(2017, 0, 1), label: '2017: Two-child benefit limit introduced' },
  { date: new Date(2022, 0, 1), label: '2022: Cost-of-living crisis' },
];

const workingAnnotations: Annotation[] = [
  { date: new Date(2015, 0, 1), label: '2015: National Living Wage announced' },
  { date: new Date(2021, 0, 1), label: '2021: UC £20 uplift briefly reduces working poverty' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'DWP', dataset: 'Households Below Average Income', url: 'https://www.gov.uk/government/collections/households-below-average-income-hbai--2', date: '2024' },
  { num: 2, name: 'Joseph Rowntree Foundation', dataset: 'Poverty Statistics', url: 'https://www.jrf.org.uk/poverty-statistics', date: '2024' },
  { num: 3, name: 'End Child Poverty Coalition', dataset: 'Local area child poverty data', url: 'https://www.endchildpoverty.org.uk/', date: '2024' },
  { num: 4, name: 'Child Poverty Action Group', dataset: 'Two-child limit impact analysis', url: 'https://cpag.org.uk/', date: '2024' },
];

export default function ChildPovertyRegionsPage() {
  return (
    <>
      <TopicNav topic="Child Poverty" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Poverty & Cost of Living"
          question="Where Is Child Poverty Worst — and Is It Getting Better?"
          finding="4.3 million children are in poverty in the UK — 30% of all children. The North East has a child poverty rate of 34%, against 20% in the South East. 69% of children in poverty live in working families — up from 57% in 2010 — demonstrating that low pay, not unemployment, is now the primary driver of child poverty."
          colour="#E63946"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>One in three children in the UK lives in poverty. The standard measure — households below average income after housing costs — puts the figure at around 4.3 million children, or 30–31% of all children, a rate that has remained stubbornly high for over a decade despite government spending on tax credits, child benefit, and the National Living Wage.<Cite nums={1} /> Geography matters enormously: the North East has a child poverty rate of 34%, against 20% in the South East and 22% in the South West.<Cite nums={[1, 3]} /> In Inner London, the rate reaches 37% — where high housing costs push many working families below the poverty line even on relatively high nominal incomes.<Cite nums={3} /> This 14–17 percentage point gap between regions reflects deep structural inequalities in wages, housing costs, economic opportunity, and local authority capacity to provide supplementary services.<Cite nums={2} /></p>
            <p>The most important structural shift of the past 20 years is the rise of in-work poverty. In 2010, 57% of children in poverty lived in working households; by 2024, this had risen to 69%.<Cite nums={[1, 2]} /> The National Living Wage has increased the floor for adult pay significantly — but not fast enough to prevent poverty in families with multiple children, high housing costs, and hours restricted by caring responsibilities.<Cite nums={2} /> The two-child benefit limit — which prevents families from claiming child tax credit or the child element of Universal Credit for a third or subsequent child — is estimated to have pushed 360,000 additional children into poverty since its introduction in 2017.<Cite nums={4} /> Abolition, announced in the 2024 Budget and scheduled from 2026, is projected to lift 540,000 children out of poverty.<Cite nums={4} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'National & Regional' },
          { id: 'sec-chart2', label: 'Working Families' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Children in poverty (UK)"
              value="4.3m"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="31% of all children · up from 27% in 2010 · barely moved in a decade"
              sparklineData={[27, 27, 28, 28, 29, 28, 29, 30, 30, 30, 31, 31, 30, 31, 31]}
              source="DWP · Households Below Average Income 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="North East child poverty rate"
              value="34%"
              unit="highest English region"
              direction="up"
              polarity="up-is-bad"
              changeText="vs 20% in the South East · structural inequality driving persistent gap"
              sparklineData={[29, 29, 30, 30, 31, 30, 31, 32, 32, 33, 33, 33, 32, 33, 34]}
              source="End Child Poverty / JRF · 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Child poverty in working families"
              value="69%"
              unit="of all child poverty"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 57% in 2010 · low pay and housing costs the primary drivers"
              sparklineData={[57, 59, 61, 62, 63, 64, 65, 66, 66, 67, 67, 68, 67, 68, 69]}
              source="DWP / JRF · Households Below Average Income 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK child poverty rate and North East regional rate, 2010–2024"
              subtitle="Percentage of children below 60% of median income after housing costs: national average (red) and the North East region (amber). The regional gap has widened marginally over the period."
              series={nationalSeries}
              annotations={nationalAnnotations}
              yLabel="% of children in poverty"
              source={{ name: 'DWP', dataset: 'Households Below Average Income', url: 'https://www.gov.uk/government/collections/households-below-average-income-hbai--2', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="In-work child poverty and real earnings of low-income workers, 2010–2024"
              subtitle="Children in poverty in working households as % of all children in poverty (dark) and real earnings index for lowest-income workers (green, 2010=100). Rising real earnings have not prevented in-work poverty from growing."
              series={workingFamilySeries}
              annotations={workingAnnotations}
              yLabel="% in working families / earnings index"
              source={{ name: 'DWP / JRF', dataset: 'Households Below Average Income / UK Poverty Report', url: 'https://www.jrf.org.uk/poverty-statistics', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Two-child limit abolition: 540,000 children lifted out of poverty"
            value="2026"
            unit="planned phase-in of two-child limit abolition"
            description="The Labour government committed in its 2024 Autumn Budget to abolishing the two-child benefit limit, which restricts child tax credit and the UC child element to the first two children. Full abolition is projected to lift 540,000 children out of poverty. The Scottish Government's Scottish Child Payment (£26.70 per week) has already reduced child poverty rates in Scotland by an estimated 4 percentage points relative to England, demonstrating that targeted cash transfers produce rapid, measurable reductions in child poverty. The JRF estimates the UK could reach the lowest child poverty rate in 30 years by 2030 if the limit is fully abolished alongside investment in childcare and housing support."
            source="Source: DWP — Households Below Average Income 2024. Child Poverty Action Group — Two-child limit analysis 2024. JRF — UK Poverty Report 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/households-below-average-income-hbai--2" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DWP — Households Below Average Income</a> — national and regional child poverty rates. Annual publication. Retrieved March 2026.</p>
            <p><a href="https://www.jrf.org.uk/poverty-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Joseph Rowntree Foundation — Poverty Statistics</a> — in-work poverty analysis and regional breakdowns. Retrieved March 2026.</p>
            <p><a href="https://www.endchildpoverty.org.uk/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">End Child Poverty Coalition — Local area child poverty data</a> — local authority and constituency-level estimates. Retrieved March 2026.</p>
            <p className="mt-2">Child poverty measured as below 60% of median household income after housing costs. Regional figures from DWP HBAI survey, supplemented by End Child Poverty local area estimates using HMRC administrative data. Working family poverty figures are DWP analysis of HBAI survey. Real earnings index from ONS Annual Survey of Hours and Earnings, bottom decile.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
