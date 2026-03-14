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

// Children in poverty (millions, total) and in working families (millions), 2015–2025
const childrenInPovertyData = [3.7, 3.8, 4.0, 4.1, 4.1, 4.1, 4.2, 4.2, 4.3, 4.3, 4.4];
const workingFamilyPovertyData = [2.5, 2.6, 2.8, 2.9, 3.0, 3.0, 3.1, 3.1, 3.2, 3.2, 3.3];

// Highest and lowest LA child poverty rates (%), 2015–2025
const worstLAData = [41, 42, 43, 44, 45, 44, 44, 44, 45, 45, 46];
const bestLAData = [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6];

const povertyTrendSeries: Series[] = [
  {
    id: 'childrenInPoverty',
    label: 'Children in poverty (millions)',
    colour: '#F4A261',
    data: childrenInPovertyData.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
  {
    id: 'workingFamilyPoverty',
    label: 'Children in working family poverty (millions)',
    colour: '#E63946',
    data: workingFamilyPovertyData.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const laGapSeries: Series[] = [
  {
    id: 'worstLA',
    label: 'Highest LA child poverty rate (%)',
    colour: '#E63946',
    data: worstLAData.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
  {
    id: 'bestLA',
    label: 'Lowest LA child poverty rate (%)',
    colour: '#2A9D8F',
    data: bestLAData.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const povertyAnnotations: Annotation[] = [
  { date: new Date(2017, 5, 1), label: '2017: Two-child benefit limit introduced' },
  { date: new Date(2021, 5, 1), label: '2021: £20 Universal Credit uplift then removed' },
];

const laAnnotations: Annotation[] = [
  { date: new Date(2021, 5, 1), label: '2021: Scottish Child Payment introduced (£26.70/wk)' },
  { date: new Date(2025, 5, 1), label: '2025: Two-child limit reform announced' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'DWP', dataset: 'Households Below Average Income', url: 'https://www.gov.uk/government/collections/households-below-average-income-hbai--2', date: '2025' },
  { num: 2, name: 'DLUHC / DWP', dataset: 'Children in Low Income Families Local Area Statistics', url: 'https://www.gov.uk/government/statistics/children-in-low-income-families-local-area-statistics', date: '2025' },
  { num: 3, name: 'Child Poverty Action Group', dataset: 'Two-child limit impact analysis', url: 'https://cpag.org.uk/', date: '2024' },
];

export default function ChildPovertyLocalPage() {
  return (
    <>
      <TopicNav topic="Child Poverty by Area" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Poverty & Cost of Living"
          question="Where Are Children Poorest?"
          finding="4.4 million children in England live in poverty — 31% of all children. Child poverty rates vary from 6% to 46% across local authorities: inner London boroughs and coastal towns show the steepest concentrations. Three in four children in poverty live in working families, as in-work poverty has grown. A child in Tower Hamlets is seven times more likely to be poor than a child in Surrey."
          colour="#F4A261"
          preposition="of"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>4.4 million children in England — 31% of all children — live in households below 60% of median income after housing costs.<Cite nums={1} /> This figure has grown by over 700,000 since 2015, driven by stagnant real wages for low-income families, rising housing costs, and a series of benefit changes that have reduced the relative income of families with children.<Cite nums={1} /> Three in four children in poverty now live in working households — a structural shift from the 1990s, when out-of-work poverty was dominant.<Cite nums={1} /> The introduction of the two-child benefit limit in 2017, which restricts child tax credit and the child element of Universal Credit to the first two children, is estimated to have pushed 360,000 additional children into poverty by 2024.<Cite nums={3} /></p>
            <p>The geography of child poverty is stark. Tower Hamlets — the highest-rate local authority at 46% — has a child poverty rate seven times higher than Surrey at 6%.<Cite nums={2} /> Inner London boroughs, coastal towns such as Blackpool and Torbay, and post-industrial areas of the Midlands and North consistently record rates above 40%.<Cite nums={2} /> In these places, poverty in childhood shapes educational attainment, health outcomes, and adult life chances across generations. The OECD has identified the UK as having one of the steepest area-based inequalities in child poverty among comparable wealthy nations. The two-child limit abolition announced in the 2024 Autumn Budget — to be phased in from 2026 — is projected to lift 540,000 children out of poverty if implemented in full.<Cite nums={3} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'National Trend' },
          { id: 'sec-chart2', label: 'Local Variation' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Children in poverty in England"
              value="4.4m"
              unit="2025"
              direction="up"
              polarity="up-is-bad"
              changeText="31% of all children · up 700k since 2015 · 3 in 4 in working families"
              sparklineData={[3.7, 3.8, 4.0, 4.1, 4.1, 4.1, 4.2, 4.2, 4.3, 4.3, 4.4]}
              source="DWP · Households Below Average Income 2025"
              href="#sec-chart1"
            />
            <MetricCard
              label="Highest LA child poverty rate"
              value="46%"
              unit="Tower Hamlets"
              direction="flat"
              polarity="up-is-bad"
              changeText="7× higher than lowest LA · longstanding concentrated deprivation"
              sparklineData={[41, 42, 43, 44, 45, 44, 44, 44, 45, 45, 46]}
              source="DLUHC / DWP · Local Area Poverty Estimates 2025"
              href="#sec-chart2"
            />
            <MetricCard
              label="Children in working family poverty"
              value="3.3m"
              unit="2025"
              direction="up"
              polarity="up-is-bad"
              changeText="75% of all child poverty · in-work poverty has doubled since 2000"
              sparklineData={[2.5, 2.6, 2.8, 2.9, 3.0, 3.0, 3.1, 3.1, 3.2, 3.2, 3.3]}
              source="DWP · Households Below Average Income 2025"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Children in poverty: total and in working families, England, 2015–2025"
              subtitle="Children in households below 60% of median income after housing costs (amber) and the subset in working families (red). The in-work poverty component has grown to represent three quarters of total child poverty."
              series={povertyTrendSeries}
              annotations={povertyAnnotations}
              yLabel="Millions of children"
              source={{ name: 'DWP', dataset: 'Households Below Average Income', url: 'https://www.gov.uk/government/collections/households-below-average-income-hbai--2', frequency: 'annual', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Child poverty rate range: highest vs lowest local authority, 2015–2025"
              subtitle="Child poverty rate in the highest-rate local authority (red) versus the lowest-rate (green). The gap between best and worst areas has not narrowed in a decade, reflecting structural rather than cyclical drivers."
              series={laGapSeries}
              annotations={laAnnotations}
              yLabel="% of children in poverty"
              source={{ name: 'DLUHC / DWP', dataset: 'Children in Low Income Families — Local Area Statistics', url: 'https://www.gov.uk/government/statistics/children-in-low-income-families-local-area-statistics', frequency: 'annual', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Two-child limit abolition: projected to lift 540,000 children out of poverty"
            value="2026"
            unit="planned abolition of the two-child benefit limit"
            description="The Labour government committed in its 2024 Autumn Budget to abolishing the two-child benefit limit — which restricts child tax credit and the Universal Credit child element to the first two children — in a phased approach from 2026. Full abolition is projected to lift 540,000 children out of poverty. The Scottish Government's Scottish Child Payment (£26.70 per week per eligible child) has already reduced child poverty rates in Scotland by an estimated 4 percentage points relative to England since 2021, demonstrating that targeted benefit increases produce measurable outcomes rapidly."
            source="Source: DWP — Households Below Average Income 2025. Child Poverty Action Group — Two-child limit impact analysis 2024. Scottish Government — Scottish Child Payment evaluation 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/households-below-average-income-hbai--2" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DWP — Households Below Average Income</a> — national child poverty rates, in-work poverty, and household composition data. Retrieved March 2026.</p>
            <p><a href="https://www.gov.uk/government/statistics/children-in-low-income-families-local-area-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DLUHC / DWP — Children in Low Income Families Local Area Statistics</a> — local authority and parliamentary constituency-level poverty rates. Retrieved March 2026.</p>
            <p><a href="https://cpag.org.uk/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Child Poverty Action Group — Research and Policy Analysis</a> — two-child limit impact modelling and policy analysis. Retrieved March 2026.</p>
            <p className="mt-2">Child poverty is measured as below 60% of median household income after housing costs (relative poverty), the primary UK measure. Local area estimates use HMRC and DWP administrative data matched to geographic areas. Working family poverty figures are families where at least one adult works but household income still falls below the threshold. All figures are for England unless stated.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
