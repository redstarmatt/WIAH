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
  { num: 1, name: 'ONS', dataset: 'Consumer Price Inflation', url: 'https://www.ons.gov.uk/economy/inflationandpriceindices/bulletins/consumerpriceinflation/latest', date: '2024' },
  { num: 2, name: 'ONS', dataset: 'Inflation and the Cost of Living', url: 'https://www.ons.gov.uk/economy/inflationandpriceindices', date: '2024' },
  { num: 3, name: 'Resolution Foundation', dataset: 'The Cost of Living Crisis', url: 'https://www.resolutionfoundation.org/', date: '2024' },
];

const cpiValues = [2.6, 1.5, 0.0, 0.7, 2.7, 2.5, 2.1, 5.4, 10.1, 7.3, 2.8];
const foodInflationValues = [3.2, 2.1, 1.2, 0.5, 2.8, 2.1, 0.8, 8.3, 19.2, 14.1, 3.8];
const energyInflationValues = [3.8, 4.1, -5.2, -1.8, 3.4, 5.2, 1.2, 28.1, 78.2, 29.4, -8.2];
const housingCostValues = [3.1, 2.8, 2.5, 2.1, 2.4, 2.8, 2.9, 4.8, 6.2, 7.8, 5.4];

const series1: Series[] = [
  { id: 'cpi', label: 'CPI inflation (%)', colour: '#E63946', data: cpiValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'food', label: 'Food price inflation (%)', colour: '#F4A261', data: foodInflationValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const series2: Series[] = [
  { id: 'energy', label: 'Domestic energy inflation (%)', colour: '#E63946', data: energyInflationValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'housing', label: 'Housing cost inflation (%)', colour: '#264653', data: housingCostValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const annotations1: Annotation[] = [
  { date: new Date(2022, 0, 1), label: '2022: Russia invades Ukraine — energy shock' },
  { date: new Date(2022, 9, 1), label: '2022: CPI peaks at 11.1%' },
];

export default function ConsumerPriceTrendsPage() {
  return (
    <>
      <TopicNav topic="Consumer Price Trends" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy"
          question="Which Prices Have Hit Households Hardest?"
          finding={<>UK CPI inflation peaked at 11.1% in October 2022 — the highest rate in 41 years — before falling back to 2.8% in 2024. But the cumulative price level is now 25% higher than in 2021, and food prices rose 22% in two years alone, with the steepest increases falling on the staple items — bread, butter, pasta, eggs — that constitute a larger share of poorer households&apos; budgets.<Cite nums={[1, 3]} /></>}
          colour="#6B7280"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The 2021–2023 inflation episode was the most severe in four decades, driven by a combination of post-pandemic supply chain disruption, the energy price shock triggered by Russia's invasion of Ukraine, and — less acknowledged by policymakers — significant pass-through of corporate profit margins in industries with pricing power. Energy prices rose 78% year-on-year at their peak in 2022; food prices rose 19.2% in 2023, their highest rate since the 1970s. These categories are more heavily weighted in the consumption baskets of lower-income households, which spend a higher proportion of income on food and energy and have less ability to substitute to cheaper alternatives or absorb price increases through savings.<Cite nums={[1, 2]} /></p>
            <p>The Resolution Foundation's analysis of inflation by income decile confirms the intuition: during 2022–23, the poorest 10% of households experienced effective inflation of around 13–14% compared to 9–10% for the richest 10%, because of differences in consumption patterns. This &quot;inflation inequality&quot; effect compounds pre-existing income inequality. As headline CPI has fallen back to 2.8%, it is important to note that this means prices are rising more slowly — not that they have returned to 2021 levels. The cumulative price level remains approximately 25% above its pre-surge baseline, representing a permanent reduction in the real purchasing power of wages and savings for those whose incomes did not keep pace.<Cite nums={3} /> Housing costs — rents and mortgage servicing costs — remain elevated and are expected to continue rising as fixed-rate mortgages reset at higher rates through 2025–26.<Cite nums={[1, 2]} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-chart1', label: 'CPI & Food' },
          { id: 'sec-chart2', label: 'Energy & Housing' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="CPI inflation (annual)" value="2.8%" unit="2024" direction="down" polarity="up-is-bad" changeText="peaked at 11.1% Oct 2022 · cumulative +25% since 2021" sparklineData={[2.6, 1.5, 0.0, 0.7, 2.7, 2.5, 2.1, 5.4, 10.1, 7.3, 2.8]} source="ONS — Consumer Price Inflation 2024" href="#sec-chart1" />
            <MetricCard label="Peak food price inflation" value="19.2%" unit="2023 annual" direction="down" polarity="up-is-bad" changeText="highest since 1970s · bread, eggs, butter worst affected" sparklineData={[3.2, 2.1, 1.2, 0.5, 2.8, 2.1, 0.8, 8.3, 19.2, 14.1, 3.8]} source="ONS — Consumer Price Inflation 2024" href="#sec-chart1" />
            <MetricCard label="Cumulative price rise since 2021" value="~25%" unit="above pre-surge level" direction="up" polarity="up-is-bad" changeText="prices falling back to 2021 levels is not expected" sparklineData={[100, 100, 100, 100, 100, 101, 101, 108, 119, 124, 125]} source="Resolution Foundation — Cost of Living Crisis 2024" href="#sec-chart2" />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK CPI inflation and food price inflation, 2013–2024"
              subtitle="Annual CPI (Consumer Price Index) inflation rate and food and non-alcoholic beverage inflation rate. Food inflation dramatically exceeded headline CPI during 2022–23, hitting lower-income households hardest."
              series={series1}
              annotations={annotations1}
              yLabel="Annual % change"
              source={{ name: 'ONS', dataset: 'Consumer Price Inflation', url: 'https://www.ons.gov.uk/economy/inflationandpriceindices/bulletins/consumerpriceinflation/latest', frequency: 'monthly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Domestic energy inflation and housing costs, 2013–2024"
              subtitle="Annual domestic energy price inflation and housing cost inflation (rents plus mortgage costs). Energy peaked at +78% in 2022; housing costs remain elevated as mortgage resets continue."
              series={series2}
              annotations={[{ date: new Date(2022, 0, 1), label: '2022: Energy price cap raised' }]}
              yLabel="Annual % change"
              source={{ name: 'ONS', dataset: 'Consumer Price Inflation', url: 'https://www.ons.gov.uk/economy/inflationandpriceindices/bulletins/consumerpriceinflation/latest', frequency: 'monthly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Wage growth has outpaced inflation since mid-2023"
            value="+1.5%"
            unit="real wage growth in 2024 — first sustained real increase in three years"
            description="Following three years in which wages lagged inflation — producing the largest peacetime fall in real wages since records began — wage growth began outpacing CPI from mid-2023. In 2024, real wages grew by approximately 1.5% on average. The return of real wage growth is significant but does not reverse the 2021–2023 loss: the cumulative fall in real wages over those three years was approximately 4–5%, meaning households need several more years of above-inflation pay rises before purchasing power is fully restored."
            source="Source: ONS — Average Weekly Earnings 2024. Resolution Foundation 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.ons.gov.uk/economy/inflationandpriceindices/bulletins/consumerpriceinflation/latest" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Consumer Price Inflation</a> — CPI, CPIH, RPI, component indices. Monthly.</p>
            <p><a href="https://www.resolutionfoundation.org/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Resolution Foundation — Cost of Living Crisis</a> — inflation by income decile, real wage analysis. Annual.</p>
            <p>CPI is the Consumer Price Index. CPIH includes owner-occupier housing costs and is the ONS headline measure. All figures are year-on-year percentage changes of the relevant index.</p>
          </div>
        </section>
      </main>
    </>
  );
}
