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
  { num: 1, name: 'ONS', dataset: 'Public Sector Finances', url: 'https://www.ons.gov.uk/economy/governmentpublicsectorandtaxes/publicsectorfinance/bulletins/publicsectorfinances/latest', date: '2024' },
  { num: 2, name: 'OBR', dataset: 'Economic and Fiscal Outlook', url: 'https://obr.uk/efo/economic-and-fiscal-outlook/', date: '2024' },
  { num: 3, name: 'IMF', dataset: 'World Economic Outlook Database', url: 'https://www.imf.org/en/Publications/WEO', date: '2024' },
];

const debtGdpValues = [85.1, 87.2, 88.5, 87.6, 86.8, 86.2, 99.8, 102.4, 101.1, 100.2, 99.6];
const interestCostValues = [48.2, 49.1, 50.4, 48.2, 47.8, 48.1, 62.3, 83.4, 107.4, 98.2, 94.1];
const deficitValues = [102, 97, 74, 55, 41, 47, 295, 147, 127, 121, 115];
const gDebt = [72.0, 78.0, 82.5, 87.2, 89.8, 93.0, 97.8, 99.2, 100.1, 101.4, 102.0];

const series1: Series[] = [
  { id: 'uk', label: 'UK public sector net debt (% GDP)', colour: '#6B7280', data: debtGdpValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'g7', label: 'G7 average government debt (% GDP)', colour: '#264653', data: gDebt.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const series2: Series[] = [
  { id: 'interest', label: 'Debt interest payments (£ billion)', colour: '#E63946', data: interestCostValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'deficit', label: 'Public sector net borrowing (£ billion)', colour: '#F4A261', data: deficitValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const annotations1: Annotation[] = [
  { date: new Date(2020, 2, 1), label: '2020: COVID — borrowing surged' },
  { date: new Date(2022, 8, 1), label: '2022: Rate rises — interest costs soar' },
];

export default function GovernmentDebtGdpPage() {
  return (
    <>
      <TopicNav topic="Government Debt & GDP" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy"
          question="How Does the UK&apos;s Debt-to-GDP Ratio Compare?"
          finding={<>UK public sector net debt stands at 99.6% of GDP — the highest sustained level since the early 1960s — while debt interest payments reached £107 billion in 2022/23, the second-largest item of government expenditure after social protection.<Cite nums={[1, 2]} /> The UK&apos;s debt level is broadly in line with the G7 average but its interest burden is higher because a large share of UK debt is linked to the RPI inflation index.<Cite nums={[1, 3]} /></>}
          colour="#6B7280"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>UK government debt has risen from around 40% of GDP in 2007 to nearly 100% today — driven first by the 2008 financial crisis response, then by Brexit adjustment costs, and most dramatically by the COVID-19 pandemic, which required £295 billion of additional borrowing in 2020/21 alone for furlough, vaccine procurement, and public service support. Public sector net debt excluding Bank of England interventions now stands at approximately 89% of GDP, a more comparable international measure.<Cite nums={1} /> The OBR projects this to remain at or above 90% of GDP for at least the next five years under current policy plans.<Cite nums={2} /></p>
            <p>The more pressing fiscal concern is not the stock of debt but its cost. The UK has approximately £575 billion of index-linked gilts — bonds whose value and coupon payments rise with RPI inflation. When inflation reached 11% in 2022, debt interest payments surged from around £50 billion to over £107 billion annually — an increase that crowded out spending on public services and constrained government fiscal options more than the headline debt figure alone would suggest. Interest payments are now falling as inflation subsides, but the OBR projects they will remain at around £90–95 billion for the rest of the decade — a permanent structural increase in the cost of government borrowing relative to the pre-2022 baseline.<Cite nums={[2, 3]} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-chart1', label: 'Debt vs G7' },
          { id: 'sec-chart2', label: 'Interest & Deficit' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="Public sector net debt" value="99.6%" unit="of GDP" direction="up" polarity="up-is-bad" changeText="was 85.1% in 2013 · highest since early 1960s" sparklineData={[85.1, 87.2, 88.5, 87.6, 86.8, 86.2, 99.8, 102.4, 101.1, 100.2, 99.6]} source="ONS — Public Sector Finances 2024" href="#sec-chart1" />
            <MetricCard label="Debt interest payments" value="£94bn" unit="2023/24" direction="down" polarity="up-is-bad" changeText="peaked at £107bn in 2022/23 · 2nd largest expenditure item" sparklineData={[48.2, 49.1, 50.4, 48.2, 47.8, 48.1, 62.3, 83.4, 107.4, 98.2, 94.1]} source="ONS — Public Sector Finances 2024" href="#sec-chart2" />
            <MetricCard label="Public sector net borrowing" value="£115bn" unit="2023/24" direction="down" polarity="up-is-bad" changeText="was £295bn at COVID peak · still above pre-pandemic" sparklineData={[102, 97, 74, 55, 41, 47, 295, 147, 127, 121, 115]} source="OBR — Economic and Fiscal Outlook 2024" href="#sec-chart2" />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK public sector net debt vs G7 average, 2013–2024"
              subtitle="UK public sector net debt as % of GDP compared to the G7 country average. UK is broadly in line with the G7 average but interest costs are higher due to large index-linked gilt portfolio."
              series={series1}
              annotations={annotations1}
              yLabel="% of GDP"
              source={{ name: 'ONS', dataset: 'Public Sector Finances', url: 'https://www.ons.gov.uk/economy/governmentpublicsectorandtaxes/publicsectorfinance/bulletins/publicsectorfinances/latest', frequency: 'monthly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Debt interest payments and annual deficit, UK, 2013–2024"
              subtitle="Annual debt interest payments (£ billion) and public sector net borrowing (£ billion). Interest costs surged with inflation in 2022; borrowing remains well above pre-pandemic levels."
              series={series2}
              annotations={[]}
              yLabel="£ billion"
              source={{ name: 'OBR', dataset: 'Economic and Fiscal Outlook', url: 'https://obr.uk/efo/economic-and-fiscal-outlook/', frequency: 'biannual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Debt-to-GDP ratio has stabilised below its peak"
            value="99.6%"
            unit="of GDP — down from 102.4% peak in 2021/22"
            description="UK public sector net debt peaked at 102.4% of GDP in 2021/22 and has since declined to 99.6%, driven by a combination of economic growth, inflation (which increases nominal GDP, reducing the ratio), and some deficit reduction. The OBR projects continued very slow reduction over the next five years under current policy, though this projection is sensitive to economic assumptions. The government's fiscal rules require debt to be falling as a share of GDP by 2029/30."
            source="Source: ONS — Public Sector Finances 2024. OBR — Economic and Fiscal Outlook 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.ons.gov.uk/economy/governmentpublicsectorandtaxes/publicsectorfinance/bulletins/publicsectorfinances/latest" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Public Sector Finances</a> — debt, deficit, interest payments. Monthly.</p>
            <p><a href="https://obr.uk/efo/economic-and-fiscal-outlook/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">OBR — Economic and Fiscal Outlook</a> — forecasts, scenario analysis. Biannual.</p>
            <p>Public sector net debt includes Bank of England interventions. Excluding Bank of England, debt is approximately 89% of GDP. Financial year runs April to March. GDP is calendar year for ratio calculation.</p>
          </div>
        </section>
      </main>
    </>
  );
}
