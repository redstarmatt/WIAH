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
  { num: 1, name: 'DWP', dataset: 'Fraud and Error in the Benefit System', url: 'https://www.gov.uk/government/collections/fraud-and-error-in-the-benefit-system', date: '2024' },
  { num: 2, name: 'National Audit Office', dataset: 'Managing Fraud and Error in the Benefits System', url: 'https://www.nao.org.uk/reports/managing-fraud-and-error-in-the-benefits-system/', date: '2024' },
  { num: 3, name: 'DWP', dataset: 'Fraud and Error Estimates', url: 'https://www.gov.uk/government/statistics/fraud-and-error-in-the-benefit-system', date: '2024' },
];

const fraudRateValues = [1.8, 1.9, 2.0, 2.1, 2.2, 7.5, 6.8, 6.2, 5.8, 5.4, 5.1];
const totalFraudValues = [1.9, 2.0, 2.1, 2.2, 2.4, 8.4, 7.6, 7.1, 6.9, 6.7, 6.5];
const recoveredValues = [0.32, 0.35, 0.38, 0.41, 0.45, 0.62, 0.78, 0.92, 1.05, 1.18, 1.28];
const officialErrorValues = [0.8, 0.8, 0.8, 0.9, 0.9, 1.2, 1.0, 0.9, 0.9, 0.8, 0.8];

const series1: Series[] = [
  { id: 'fraud', label: 'Fraud rate (% of total benefit expenditure)', colour: '#E63946', data: fraudRateValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'error', label: 'Official error rate (%)', colour: '#6B7280', data: officialErrorValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const series2: Series[] = [
  { id: 'total', label: 'Total fraud losses (£ billion)', colour: '#E63946', data: totalFraudValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'recovered', label: 'Amount recovered (£ billion)', colour: '#2A9D8F', data: recoveredValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const annotations1: Annotation[] = [
  { date: new Date(2020, 2, 1), label: '2020: UC fraud surged during COVID' },
];

export default function BenefitFraudDetectionPage() {
  return (
    <>
      <TopicNav topic="Benefit Fraud Detection" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy & Work"
          question="How Much Benefit Fraud Goes Undetected?"
          finding={<>DWP estimates that £6.5 billion was lost to fraud in the benefit system in 2023/24 — 5.1% of total expenditure — down from a pandemic peak of £8.4 billion but still three times pre-pandemic levels.<Cite nums={1} /> Only £1.28 billion was recovered, meaning around 80% of detected and estimated fraud goes unrecouped.<Cite nums={[1, 2]} /></>}
          colour="#6B7280"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Benefit fraud has become one of the most visible public finance concerns of the post-pandemic period. Universal Credit — the flagship welfare reform programme that merged six benefits into one — became a vector for industrial-scale fraud during COVID-19 when relaxed eligibility checks and the speed of emergency payments allowed systematic exploitation by organised criminal gangs, identity fraudsters, and ineligible claimants. The fraud rate in Universal Credit peaked at over 14% of total UC expenditure during 2020/21 before falling back, but the overall system fraud rate remained at 5.1% of total benefit expenditure in 2023/24 — around three times the pre-2020 baseline.<Cite nums={[1, 3]} /></p>
            <p>The Department for Work and Pensions has invested heavily in counter-fraud capability, including the Fraud and Error Reduction Incentive Payment scheme, the Single Fraud Investigation Service, and data-matching programmes with HMRC and other government departments. These efforts have increased the amount recovered — from £320 million in 2013 to £1.28 billion in 2024 — but the recovery rate remains under 20% of estimated total fraud.<Cite nums={2} /> The government's Fraud Plan includes expanded data-sharing powers to allow DWP to view claimants' bank accounts directly, raising significant civil liberties concerns. The NAO has noted that the DWP's own error rate — overpayments made by the department itself — is also substantial, at 0.8% of expenditure, and that these are less politically visible but equally costly.<Cite nums={[2, 3]} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-chart1', label: 'Fraud Rates' },
          { id: 'sec-chart2', label: 'Losses vs Recovery' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="Fraud rate (% of expenditure)" value="5.1%" unit="of total benefit spend" direction="down" polarity="up-is-bad" changeText="down from 7.5% pandemic peak · was 1.8% pre-2020" sparklineData={[1.8, 1.9, 2.0, 2.1, 2.2, 7.5, 6.8, 6.2, 5.8, 5.4, 5.1]} source="DWP — Fraud and Error in the Benefit System 2024" href="#sec-chart1" />
            <MetricCard label="Total fraud losses" value="£6.5bn" unit="2023/24" direction="down" polarity="up-is-bad" changeText="down from £8.4bn peak · still 3x pre-pandemic" sparklineData={[1.9, 2.0, 2.1, 2.2, 2.4, 8.4, 7.6, 7.1, 6.9, 6.7, 6.5]} source="DWP — Fraud and Error Estimates 2024" href="#sec-chart2" />
            <MetricCard label="Amount recovered" value="£1.28bn" unit="per year" direction="up" polarity="up-is-good" changeText="up from £320M in 2013 · but still only ~20% of losses" sparklineData={[0.32, 0.35, 0.38, 0.41, 0.45, 0.62, 0.78, 0.92, 1.05, 1.18, 1.28]} source="DWP — Fraud and Error Estimates 2024" href="#sec-chart2" />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Benefit fraud rate and official error rate, 2013–2024"
              subtitle="Fraud (% of total benefit expenditure) and DWP official error rate (%). Fraud surged during COVID due to UC payment speed and relaxed checks; official error is smaller but persistent."
              series={series1}
              annotations={annotations1}
              yLabel="Percentage (%)"
              source={{ name: 'DWP', dataset: 'Fraud and Error in the Benefit System', url: 'https://www.gov.uk/government/collections/fraud-and-error-in-the-benefit-system', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Estimated benefit fraud losses vs amount recovered, 2013–2024"
              subtitle="Total fraud losses (£ billion) and amount recovered through counter-fraud activity (£ billion). The gap between losses and recovery remains very large despite increased enforcement investment."
              series={series2}
              annotations={[]}
              yLabel="£ billion"
              source={{ name: 'DWP', dataset: 'Fraud and Error Estimates', url: 'https://www.gov.uk/government/statistics/fraud-and-error-in-the-benefit-system', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Real-time earnings data is reducing in-work fraud"
            value="£300M"
            unit="estimated annual savings from HMRC-DWP real-time earnings data matching"
            description="The integration of HMRC real-time earnings data with Universal Credit payments — allowing automatic adjustment of UC when claimants' wages change — is estimated to save around £300 million annually in overpayments that would previously have built up over months before being identified. This is one of the few structural improvements that both reduces fraud and reduces official error simultaneously, while also improving the claimant experience by removing the need to report wage changes manually."
            source="Source: DWP — Fraud and Error in the Benefit System 2024. National Audit Office 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/fraud-and-error-in-the-benefit-system" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DWP — Fraud and Error in the Benefit System</a> — annual estimates of fraud, claimant error, and official error by benefit. Annual.</p>
            <p><a href="https://www.nao.org.uk/reports/managing-fraud-and-error-in-the-benefits-system/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">National Audit Office — Managing Fraud and Error</a> — system analysis, counter-fraud effectiveness. 2024.</p>
            <p>All estimates are based on DWP statistical sampling. Fraud rates include both fraudulent claims and fraudulent changes to circumstances. Official error includes both over and underpayments caused by DWP mistakes.</p>
          </div>
        </section>
      </main>
    </>
  );
}
