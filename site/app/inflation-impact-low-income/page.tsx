'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'ONS', dataset: 'Household Costs Indices', url: 'https://www.ons.gov.uk/economy/inflationandpriceindices/bulletins/householdcostsindices/latest', date: '2024' },
  { num: 2, name: 'Resolution Foundation', dataset: 'Inflation and the Cost of Living by Income', url: 'https://www.resolutionfoundation.org/', date: '2024' },
  { num: 3, name: 'Joseph Rowntree Foundation', dataset: 'UK Poverty — Inflation Impact', url: 'https://www.jrf.org.uk/report/uk-poverty-2024', date: '2024' },
];

const poorestInflationValues = [3.1, 1.8, 0.4, 1.2, 3.4, 3.2, 2.8, 7.8, 13.4, 9.2, 4.2];
const richestInflationValues = [2.4, 1.2, -0.2, 0.3, 2.5, 2.2, 1.9, 5.1, 9.8, 6.8, 2.4];
const foodBudgetShareValues = [16.2, 16.4, 16.6, 16.8, 17.0, 17.2, 17.4, 17.8, 18.4, 18.1, 17.9];
const energyBudgetShareValues = [9.8, 9.9, 10.0, 9.8, 9.6, 9.4, 9.2, 14.8, 18.2, 15.1, 13.4];

const series1: Series[] = [
  { id: 'poorest', label: 'Poorest decile inflation rate (%)', colour: '#E63946', data: poorestInflationValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'richest', label: 'Richest decile inflation rate (%)', colour: '#264653', data: richestInflationValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const series2: Series[] = [
  { id: 'food', label: 'Food as % of poorest quintile budget', colour: '#F4A261', data: foodBudgetShareValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'energy', label: 'Energy as % of poorest quintile budget', colour: '#E63946', data: energyBudgetShareValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const annotations1: Annotation[] = [
  { date: new Date(2022, 0, 1), label: '2022: Inflation gap between rich and poor widest on record' },
];

export default function InflationImpactLowIncomePage() {
  return (
    <>
      <TopicNav topic="Inflation Impact on Low Income" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy"
          question="Is Inflation Hitting Poorer Households Harder?"
          finding={<>During the 2022–23 inflation surge, the poorest 10% of households experienced effective inflation of 13.4% — 3.6 percentage points higher than the richest 10%, the largest inflation inequality gap since comparable records began.<Cite nums={[1, 2]} /> Food and energy — the two categories that rose fastest — account for 32% of the poorest quintile&apos;s budget but only 12% of the richest quintile&apos;s.<Cite nums={1} /></>}
          colour="#6B7280"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Inflation is not a uniform tax. The same headline CPI figure conceals dramatically different lived experiences depending on household income, because lower-income households spend a fundamentally different basket of goods and services than higher-income ones. Lower-income households spend a far higher proportion of their budgets on food, energy, and housing — all categories that rose fastest between 2021 and 2023. Higher-income households spend more on leisure, restaurant meals, international travel, and luxury goods — categories that rose more slowly. The result is that the same macroeconomic shock — an energy price spike, food price inflation — hits poorer households proportionally harder, not because of any policy choice, but because of structural differences in consumption patterns.<Cite nums={[1, 2]} /></p>
            <p>ONS Household Costs Indices — which measure experienced rather than headline inflation by income decile — confirmed this intuition with data: during the peak of the cost of living crisis in 2022, the poorest 10% of households were experiencing inflation of 13.4%, compared to 9.8% for the richest 10%. Over a sustained period, this difference compounds: even 1 or 2 percentage points of additional annual inflation year after year represents a significant erosion of real purchasing power for households with no margin to absorb cost increases. The JRF estimated that the 2022–23 cost of living crisis pushed an additional 1.3 million people into absolute poverty — with children and single-parent households disproportionately affected.<Cite nums={3} /> The means-tested benefit uprating, which links benefits to CPI, partially compensated those receiving benefits, but the indexation lag and the erosion of the five-week UC wait means the protection was imperfect and arrived after the worst cost pressure had already been borne.<Cite nums={[2, 3]} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-chart1', label: 'Inflation by Income' },
          { id: 'sec-chart2', label: 'Budget Shares' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="Peak poorest decile inflation" value="13.4%" unit="annual rate (2022)" direction="down" polarity="up-is-bad" changeText="3.6pp above richest decile · largest gap on record" sparklineData={[3.1, 1.8, 0.4, 1.2, 3.4, 3.2, 2.8, 7.8, 13.4, 9.2, 4.2]} source="ONS — Household Costs Indices 2024" href="#sec-chart1" />
            <MetricCard label="Food budget share (poorest quintile)" value="17.9%" unit="of household spending" direction="up" polarity="up-is-bad" changeText="was 16.2% in 2013 · vs ~8% for richest quintile" sparklineData={[16.2, 16.4, 16.6, 16.8, 17.0, 17.2, 17.4, 17.8, 18.4, 18.1, 17.9]} source="ONS — Household Costs Indices 2024" href="#sec-chart2" />
            <MetricCard label="Energy budget share (poorest quintile)" value="13.4%" unit="of household spending" direction="up" polarity="up-is-bad" changeText="was 9.8% in 2013 · spiked to 18.2% during energy crisis" sparklineData={[9.8, 9.9, 10.0, 9.8, 9.6, 9.4, 9.2, 14.8, 18.2, 15.1, 13.4]} source="ONS — Household Costs Indices 2024" href="#sec-chart2" />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Inflation experienced by poorest vs richest households, 2013–2024"
              subtitle="Annual inflation rate experienced by the poorest 10% and richest 10% of households, based on their actual consumption baskets. The gap widened dramatically in 2022 as food and energy prices surged."
              series={series1}
              annotations={annotations1}
              yLabel="Annual inflation rate (%)"
              source={{ name: 'ONS', dataset: 'Household Costs Indices', url: 'https://www.ons.gov.uk/economy/inflationandpriceindices/bulletins/householdcostsindices/latest', frequency: 'quarterly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Food and energy as share of poorest quintile spending, 2013–2024"
              subtitle="Food and non-alcoholic beverage spending and domestic energy spending as % of total expenditure for the poorest quintile. High essential shares amplify inflation impact of food and energy price rises."
              series={series2}
              annotations={[]}
              yLabel="% of household budget"
              source={{ name: 'ONS', dataset: 'Household Costs Indices', url: 'https://www.ons.gov.uk/economy/inflationandpriceindices/bulletins/householdcostsindices/latest', frequency: 'quarterly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Benefits uprating restored some real value in 2023"
            value="+10.1%"
            unit="increase in working-age benefits in April 2023 — linked to September 2022 CPI"
            description="In April 2023, working-age benefits including Universal Credit, Child Benefit, and housing support were increased by 10.1% — the previous September's CPI rate — representing a genuine real-terms increase that partially compensated for the 2022 cost of living impact on benefit claimants. This followed campaigning by poverty organisations who noted that previous uprating had used an earlier, lower inflation figure. The decision to uprate by the full September CPI rate was estimated to protect around 4 million households from a further real-terms cut in their living standards."
            source="Source: DWP — Benefit Uprating 2023. Joseph Rowntree Foundation 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.ons.gov.uk/economy/inflationandpriceindices/bulletins/householdcostsindices/latest" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Household Costs Indices</a> — inflation by income decile, experimental statistics. Quarterly.</p>
            <p><a href="https://www.resolutionfoundation.org/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Resolution Foundation — Inflation and the Cost of Living</a> — inflation inequality analysis. Annual.</p>
            <p>Household Costs Indices are experimental statistics that use ONS household expenditure surveys to calculate effective inflation rates for different income groups. Budget share data from Living Costs and Food Survey.</p>
          </div>
        </section>
      </main>
    </>
  );
}
