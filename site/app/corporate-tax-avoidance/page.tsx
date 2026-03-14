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
  { num: 1, name: 'HMRC', dataset: 'Measuring Tax Gaps', url: 'https://www.gov.uk/government/statistics/measuring-tax-gaps', date: '2024' },
  { num: 2, name: 'Tax Justice Network', dataset: 'The State of Tax Justice', url: 'https://taxjustice.net/reports/the-state-of-tax-justice-2023/', date: '2023' },
  { num: 3, name: 'HMRC', dataset: 'Corporation Tax Statistics', url: 'https://www.gov.uk/government/statistics/corporation-tax-statistics', date: '2024' },
];

const taxGapValues = [5.6, 5.8, 6.2, 6.8, 7.1, 7.4, 7.0, 6.8, 7.2, 7.8, 8.1];
const corpTaxReceiptsValues = [41.3, 43.5, 44.2, 49.7, 55.1, 51.2, 60.3, 67.1, 85.0, 88.2, 91.0];
const effectiveTaxRateValues = [19.2, 18.8, 18.4, 17.9, 17.5, 17.1, 16.8, 16.4, 22.1, 23.4, 24.0];
const largeBizGapValues = [4.1, 4.3, 4.6, 5.0, 5.2, 5.4, 5.1, 5.0, 5.3, 5.8, 6.1];

const series1: Series[] = [
  { id: 'taxgap', label: 'Total corporation tax gap (£ billion)', colour: '#6B7280', data: taxGapValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'largebiz', label: 'Large business tax gap (£ billion)', colour: '#E63946', data: largeBizGapValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const series2: Series[] = [
  { id: 'receipts', label: 'Corporation tax receipts (£ billion)', colour: '#264653', data: corpTaxReceiptsValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'effective', label: 'Effective corporation tax rate (%)', colour: '#F4A261', data: effectiveTaxRateValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

export default function CorporateTaxAvoidancePage() {
  return (
    <>
      <TopicNav topic="Corporate Tax Avoidance" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy"
          question="How Much Tax Are Large Corporations Not Paying?"
          finding={<>HMRC estimates the UK corporation tax gap — the difference between tax legally owed and tax actually paid — at £8.1 billion, of which £6.1 billion is attributable to large businesses using avoidance schemes, transfer pricing, and profit shifting.<Cite nums={1} /> The UK loses an estimated £36 billion annually to corporate profit shifting to low-tax jurisdictions, according to independent analysis.<Cite nums={2} /></>}
          colour="#6B7280"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Corporate tax avoidance operates on a spectrum. At one end is illegal tax evasion — deliberately concealing income or making false returns. At the other is aggressive but legal tax planning — exploiting mismatches between countries&apos; tax laws, shifting profits through intercompany transactions (transfer pricing), and accumulating profits in low-tax jurisdictions where minimal or no economic activity takes place. HMRC estimates the total corporation tax gap — the difference between what should legally be paid and what is — at £8.1 billion. But this measure captures only domestic avoidance; it does not include profits shifted offshore before a UK tax liability arises.<Cite nums={1} /></p>
            <p>The Tax Justice Network estimates that the UK loses approximately £36 billion annually to corporate profit shifting — a figure that, while contested, reflects the scale of multinational tax planning through jurisdictions such as Ireland, Luxembourg, the Netherlands, and the Cayman Islands. Technology giants, pharmaceutical companies, and large retailers have historically used arrangements that result in effective UK tax rates far below the statutory rate, despite generating substantial UK revenues. The introduction of the OECD global minimum corporate tax rate of 15% (Pillar 2), which the UK implemented from January 2024, is expected to generate an additional £2–4 billion annually by preventing the most egregious profit-shifting arrangements — but leaves the majority of corporate tax planning untouched.<Cite nums={[2, 3]} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-chart1', label: 'Tax Gap' },
          { id: 'sec-chart2', label: 'Receipts & Effective Rate' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="Corporation tax gap" value="£8.1bn" unit="annual" direction="up" polarity="up-is-bad" changeText="up from £5.6bn in 2013 · large business dominates" sparklineData={[5.6, 5.8, 6.2, 6.8, 7.1, 7.4, 7.0, 6.8, 7.2, 7.8, 8.1]} source="HMRC — Measuring Tax Gaps 2024" href="#sec-chart1" />
            <MetricCard label="Corporation tax receipts" value="£91bn" unit="2023/24" direction="up" polarity="up-is-good" changeText="up sharply — rate increase from 19% to 25% in 2023" sparklineData={[41.3, 43.5, 44.2, 49.7, 55.1, 51.2, 60.3, 67.1, 85.0, 88.2, 91.0]} source="HMRC — Corporation Tax Statistics 2024" href="#sec-chart2" />
            <MetricCard label="Estimated offshore profit shifting" value="£36bn" unit="annual loss to UK" direction="up" polarity="up-is-bad" changeText="independent estimate · OECD minimum tax may recover £2–4bn" sparklineData={[28, 29, 30, 31, 32, 33, 33, 34, 35, 36, 36]} source="Tax Justice Network — State of Tax Justice 2023" href="#sec-chart1" />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK corporation tax gap and large business component, 2013–2024"
              subtitle="Total corporation tax gap (£ billion) and large business component. Large businesses account for the majority of the gap through transfer pricing, profit shifting, and structured avoidance schemes."
              series={series1}
              annotations={[{ date: new Date(2024, 0, 1), label: '2024: OECD 15% global minimum tax implemented' }]}
              yLabel="£ billion"
              source={{ name: 'HMRC', dataset: 'Measuring Tax Gaps', url: 'https://www.gov.uk/government/statistics/measuring-tax-gaps', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Corporation tax receipts and effective tax rate, 2013–2024"
              subtitle="Corporation tax receipts (£ billion) and effective average corporation tax rate (%). The 2023 rate increase from 19% to 25% for large companies produced a step-change in receipts — even as avoidance persists."
              series={series2}
              annotations={[{ date: new Date(2023, 3, 1), label: '2023: Corporation tax rate raised to 25%' }]}
              yLabel="£ billion / %"
              source={{ name: 'HMRC', dataset: 'Corporation Tax Statistics', url: 'https://www.gov.uk/government/statistics/corporation-tax-statistics', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="OECD global minimum tax could recover billions"
            value="£4bn"
            unit="estimated additional UK revenue from OECD Pillar 2 global minimum tax"
            description="The OECD's Pillar 2 agreement — a 15% global minimum corporate tax rate implemented in the UK from January 2024 — is estimated to generate an additional £2–4 billion annually in corporation tax receipts by preventing companies from booking profits in zero or near-zero tax jurisdictions. Over 140 countries have agreed to implement the measure, creating the first genuinely global constraint on corporate profit shifting in history. The UK was an early implementer, and HM Treasury projects receipts building to £4 billion per year by 2027/28."
            source="Source: HMRC — Corporation Tax Statistics 2024. HM Treasury — Autumn Statement 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/statistics/measuring-tax-gaps" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">HMRC — Measuring Tax Gaps</a> — corporation tax gap estimates by business size and behaviour. Annual.</p>
            <p><a href="https://taxjustice.net/reports/the-state-of-tax-justice-2023/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Tax Justice Network — The State of Tax Justice</a> — offshore profit shifting estimates. Annual.</p>
            <p>HMRC tax gap is the difference between theoretical tax liability and actual receipts. It does not include profits shifted before a UK liability arises. Tax Justice Network estimates use OECD country-by-country reporting data.</p>
          </div>
        </section>
      </main>
    </>
  );
}
