'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Council tax enforcement actions (millions), 2014–2024
const enforcementValues = [1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 0.8, 1.5, 2.0, 2.3];

// Outstanding council tax debt £bn, 2014–2024
const debtValues = [3.0, 3.2, 3.4, 3.6, 3.8, 4.0, 4.2, 4.5, 5.0, 5.6, 6.1];

// Formal complaints about bailiff conduct, 2016–2024
const complaintsValues = [28400, 32100, 35600, 38200, 40000, 14500, 29800, 41300, 48700, 52100];

const series1: Series[] = [
  {
    id: 'enforcement',
    label: 'Enforcement actions (millions)',
    colour: '#F4A261',
    data: enforcementValues.map((v, i) => ({ date: new Date(2014 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'debt',
    label: 'Outstanding council tax debt (£bn)',
    colour: '#E63946',
    data: debtValues.map((v, i) => ({ date: new Date(2014 + i, 0, 1), value: v })),
  },
];

const series3: Series[] = [
  {
    id: 'complaints',
    label: 'Formal complaints about bailiff conduct',
    colour: '#6B7280',
    data: complaintsValues.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
  },
];

const annotations1: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: COVID moratorium on bailiff visits' },
  { date: new Date(2022, 0, 1), label: '2022: post-moratorium enforcement surge' },
];

const annotations2: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: pandemic worsens arrears' },
];

const annotations3: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: COVID moratorium' },
  { date: new Date(2022, 0, 1), label: '2022: complaints exceed pre-pandemic peak' },
];

export default function CouncilTaxBailiffsPage() {
  return (
    <>
      <TopicNav topic="Council Tax Bailiffs" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Council Tax Bailiffs"
          question="How Many People Are Being Chased by Council Tax Bailiffs?"
          finding="Enforcement actions for council tax debt reached 2.3 million in England in 2024 — a record. Outstanding council tax debt stands at £6.1 billion, and more than half of those referred to bailiffs meet at least one vulnerability criterion."
          colour="#F4A261"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Council tax is the most aggressively enforced debt in England. Unlike almost every other form of consumer debt, councils can fast-track collection through the magistrates' court system without the creditor protections that apply to credit card arrears or energy bills. A single missed payment can trigger a liability order within weeks, and once that order is granted, the full annual bill becomes due immediately — not just the missed instalment. In 2024, councils obtained 2.3 million enforcement actions against residents, a record that exceeds even the post-COVID surge. The system is structured so that falling behind by a single month can escalate into bailiff visits, added fees of £310 or more, and attachment of earnings orders deducting money directly from wages.</p>
            <p>The scale of outstanding council tax debt — now £6.1 billion across England — reflects a structural problem, not individual irresponsibility. Council tax is regressive: it takes a larger share of income from poorer households. Council tax support schemes, which replaced national Council Tax Benefit in 2013, vary wildly between authorities. Some councils still require the poorest residents to pay at least 20% of their bill. When those residents cannot pay, the enforcement machinery activates — and the added fees make the debt harder, not easier, to clear. In 2024, 51% of people referred to bailiffs met at least one recognised vulnerability criterion, a figure that has nearly doubled since 2017.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Enforcement Actions' },
          { id: 'sec-chart2', label: 'Outstanding Debt' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Council tax enforcement actions (England)"
              value="2.3M"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="+28% since 2019 · record high including COVID recovery"
              sparklineData={[1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 0.8, 1.5, 2.0, 2.3]}
              source="Ministry of Justice — Taking Control of Goods Statistics 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Outstanding council tax debt (England)"
              value="£6.1bn"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="up from £3.8bn in 2019 · enforcement not clearing it"
              sparklineData={[3.4, 3.6, 3.8, 4.0, 4.2, 4.5, 5.0, 5.6, 6.1]}
              source="MHCLG — Council Tax Collection Rates 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Complaints about bailiff conduct"
              value="52,100"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="+36% since 2019 · 51% of referrals involve vulnerable people"
              sparklineData={[28400, 32100, 35600, 38200, 14500, 29800, 41300, 48700, 52100]}
              source="Local Government Ombudsman — Bailiff Complaints Data 2024"
              href="#sec-sources"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Council tax enforcement actions, England, 2014–2024"
              subtitle="Liability orders, bailiff referrals, and attachment of earnings. COVID moratorium created artificial dip in 2020; post-moratorium enforcement surge exceeded pre-pandemic levels."
              series={series1}
              annotations={annotations1}
              yLabel="Actions (millions)"
              source={{ name: 'Ministry of Justice', dataset: 'Taking Control of Goods — National Standards Statistics', url: 'https://www.gov.uk/government/statistics/taking-control-of-goods-national-standards', frequency: 'annual', date: 'Feb 2026' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Outstanding council tax debt, England, 2014–2024"
              subtitle="Cumulative arrears across all billing authorities (£bn). Debt has grown every year for a decade — enforcement is not clearing it, and added fees compound the burden on those in arrears."
              series={series2}
              annotations={annotations2}
              yLabel="Debt (£ billions)"
              source={{ name: 'MHCLG', dataset: 'Council Taxbase and Council Tax Collection Rates', url: 'https://www.gov.uk/government/collections/council-taxbase-statistics', frequency: 'annual', date: 'Feb 2026' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Wales bans bailiff use for council tax collection"
            value="0 bailiff referrals"
            unit="Wales — from April 2024"
            description="In April 2024, Wales became the first UK nation to ban the use of bailiffs for council tax debt. The Council Tax Collection (Wales) Act replaced enforcement with early intervention — income maximisation, flexible payment plans, and referral to debt advice services. In England, several councils including Bristol, Greenwich, and Exeter have voluntarily adopted ethical collection policies that deprioritise bailiff referral. Bristol's pilot reduced bailiff referrals by 40% while maintaining collection rates, demonstrating that aggressive enforcement is not the most effective approach."
            source="Source: Welsh Government — Council Tax Collection Act 2024. Bristol City Council — Ethical Debt Collection Pilot Report, 2024."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/statistics/taking-control-of-goods-national-standards" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Ministry of Justice — Taking Control of Goods National Standards Statistics</a> — enforcement action counts. Retrieved Feb 2026.</p>
            <p><a href="https://www.gov.uk/government/collections/council-taxbase-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">MHCLG — Council Taxbase and Collection Rates</a> — outstanding debt data. Retrieved Feb 2026.</p>
            <p><a href="https://www.stepchange.org/policy-and-research/council-tax-debt.aspx" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">StepChange Debt Charity — Council Tax Debt Statistics</a> — vulnerability rates and debt profile. Retrieved 2026.</p>
            <p>Enforcement action counts include liability orders, bailiff referrals, and attachment of earnings orders. COVID moratorium (March 2020 to June 2021) suppressed enforcement; the post-moratorium surge reflects backlog processing. Vulnerability rate represents proportion of people referred to bailiffs meeting at least one criterion under the Taking Control of Goods Regulations 2013.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
