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

// Cumulative S114 notices, 2018–2025
const s114Values = [1, 2, 3, 4, 6, 9, 12, 14];

// Government bailout loans £bn, 2018–2025
const bailoutValues = [0.1, 0.3, 0.6, 0.9, 1.2, 2.0, 2.8, 3.6];

// Councils at serious financial risk (est.), 2015–2025
const atRiskValues = [5, 8, 10, 12, 15, 18, 20, 22, 25, 28, 30];

// Sector funding gap £bn, 2015–2025
const fundingGapValues = [1.0, 1.5, 2.0, 2.5, 3.0, 3.0, 3.5, 3.5, 4.0, 5.0, 6.2];

const series1: Series[] = [
  {
    id: 's114Count',
    label: 'Cumulative s114 notices',
    colour: '#E63946',
    data: s114Values.map((v, i) => ({ date: new Date(2018 + i, 5, 1), value: v })),
  },
  {
    id: 'bailoutLoans',
    label: 'Government bailout loans (£bn)',
    colour: '#F4A261',
    data: bailoutValues.map((v, i) => ({ date: new Date(2018 + i, 5, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'atRisk',
    label: 'Councils at serious financial risk',
    colour: '#E63946',
    data: atRiskValues.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
  {
    id: 'fundingGap',
    label: 'Sector funding gap (£bn)',
    colour: '#264653',
    data: fundingGapValues.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const annotations1: Annotation[] = [
  { date: new Date(2018, 5, 1), label: '2018: Northamptonshire — first s114 since 1988' },
  { date: new Date(2023, 5, 1), label: '2023: Birmingham — record s114' },
];

const annotations2: Annotation[] = [
  { date: new Date(2021, 5, 1), label: '2021: Adult social care and SEND demand spikes' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'DLUHC', dataset: 'Local Government Finance Statistics — Section 114 Notices', url: 'https://www.gov.uk/government/collections/local-government-finance-statistics', date: '2025' },
  { num: 2, name: 'Local Government Association', dataset: 'Funding Gap Analysis', url: 'https://www.local.gov.uk/topics/finance/local-government-finance-and-spending', date: '2025' },
  { num: 3, name: 'CIPFA', dataset: 'Financial Resilience Index', url: 'https://www.cipfa.org/services/financial-resilience-index', date: '2025' },
  { num: 4, name: 'National Audit Office', dataset: 'Financial Sustainability of Local Authorities', url: 'https://www.nao.org.uk/reports/financial-sustainability-of-local-authorities/', date: '2024' },
];

export default function CouncilBankruptcyPage() {
  return (
    <>
      <TopicNav topic="Council Bankruptcy" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Democracy & Governance"
          question="Which Councils Are Going Bankrupt?"
          finding="14 local authorities issued Section 114 notices between 2018 and 2025 — the local government equivalent of bankruptcy. £3.6 billion in government bailout loans have been issued, with more councils expected to follow."
          colour="#6B7280"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Before 2018, only one English council had issued a Section 114 notice in two decades. Between 2018 and 2025, fourteen did so, including Northamptonshire, Croydon, Slough, Thurrock, Woking, Nottingham, and Birmingham — the largest local authority in Europe, with a £760 million deficit largely from an equal pay liability.<Cite nums={1} /> Thurrock borrowed £500 million to invest in commercial property, then watched rising interest rates collapse the strategy. Woking ran up £1.2 billion in debt financing town-centre regeneration on cheap borrowing that turned expensive.<Cite nums={1} /> Each failure required exceptional government finance — loans repaid over decades — and imposed harsh service cuts on residents.</p>
            <p>The structural cause is the collision of rising statutory demand with constrained revenues. Central government grants to English councils were cut by over 40% in real terms since 2010.<Cite nums={2} /> Adult social care now consumes 36% of council budgets, up from 29% in 2010. Children's services costs rose 20% in real terms between 2019 and 2023.<Cite nums={3} /> Council tax, the principal locally-controlled revenue, is capped at 5% annual growth without a local referendum. The LGA estimates the funding gap will reach £6.2 billion by 2026, and the National Audit Office has warned the sector's financial position is unsustainable without structural reform.<Cite nums={[2, 4]} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'S114 Notices' },
          { id: 'sec-chart2', label: 'Financial Risk' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Section 114 notices issued"
              value="14"
              unit="2018–2025"
              direction="up"
              polarity="up-is-bad"
              changeText="none in preceding decade · Birmingham, Thurrock, Woking included"
              sparklineData={[0, 0, 1, 2, 3, 4, 6, 9, 12, 14]}
              source="DLUHC — Section 114 notices tracker 2025"
              href="#sec-chart1"
            />
            <MetricCard
              label="Government bailout loans issued"
              value="£3.6bn"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="exceptional finance mechanism · repayment over decades"
              sparklineData={[0.1, 0.3, 0.6, 0.9, 1.2, 2.0, 2.8, 3.6]}
              source="DLUHC — Exceptional Financial Support 2025"
              href="#sec-chart1"
            />
            <MetricCard
              label="Councils at financial risk (estimated)"
              value="30+"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="LGA estimate 2025 · further s114 notices expected"
              sparklineData={[10, 12, 15, 18, 20, 22, 25, 28, 30]}
              source="Local Government Association — Financial stability assessment 2025"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Cumulative Section 114 notices and government bailout loans, 2018–2025"
              subtitle="Cumulative bankruptcy notices by local authorities and total exceptional finance loans issued (£bn). Before 2018, only one council had issued a s114 notice in 20 years."
              series={series1}
              annotations={annotations1}
              yLabel="Count / £bn"
              source={{ name: 'DLUHC', dataset: 'Section 114 Notices and Exceptional Financial Support', url: 'https://www.gov.uk/government/collections/local-government-finance-statistics', frequency: 'annual', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Local authorities at financial risk and sector funding gap, 2015–2025"
              subtitle="Estimated number of councils at serious financial risk (LGA surveys) alongside the estimated annual funding gap across the sector (£bn)."
              series={series2}
              annotations={annotations2}
              yLabel="Count / £bn"
              source={{ name: 'LGA / CIPFA', dataset: 'Financial Resilience Index and Funding Gap Estimates', url: 'https://www.local.gov.uk/topics/finance/local-government-finance-and-spending', frequency: 'annual', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Government action: Financial Recovery Framework and multi-year settlement"
            value="3-year"
            unit="settlement agreed from 2025/26"
            description="DLUHC introduced a Financial Recovery Framework in 2024 providing earlier intervention when councils show signs of financial distress. The 2024 Spending Review provided the first multi-year financial settlement since 2015, covering 2025/26 to 2027/28, giving councils planning certainty. The Improvement and Recovery Board model used in Birmingham provides expert governance during restructuring. The LGA estimates the package still leaves a £2 billion annual gap, but multi-year certainty reduces emergency budget decisions."
            source="Source: DLUHC — Local Government Finance Settlement 2025–26. LGA — Funding gap analysis, 2025."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/local-government-finance-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DLUHC — Local Government Finance Statistics</a> — section 114 notices and exceptional financial support. Retrieved 2025.</p>
            <p><a href="https://www.local.gov.uk/topics/finance/local-government-finance-and-spending" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Local Government Association — Funding Gap Analysis</a> — annual estimates of sector financial pressure. 2025.</p>
            <p><a href="https://www.cipfa.org/services/financial-resilience-index" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">CIPFA — Financial Resilience Index</a> — indicators of council financial stress including reserves, debt, and spending pressures.</p>
            <p>Section 114 notices tracked from council published reports and DLUHC announcements. Financial risk estimates involve editorial judgment; they are based on CIPFA assessments and LGA surveys of section 151 officers. Bailout loan figures are provisional and subject to revision as repayment schedules are agreed.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
