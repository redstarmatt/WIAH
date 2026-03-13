'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// CCJs issued (thousands), 2015–2024
const ccjValues = [532, 540, 555, 570, 581, 532, 400, 570, 598, 706];

// Average CCJ debt (£), 2015–2024
const ccjAvgDebtValues = [1100, 1150, 1180, 1220, 1260, 1280, 1300, 1340, 1390, 1442];

// High-cost credit borrowers (millions) and council tax enforcement (millions), 2015–2024
const highCostValues = [3.5, 3.4, 3.3, 3.2, 3.1, 2.9, 2.9, 2.9, 3.0, 3.1];
const councilTaxValues = [2.2, 2.3, 2.3, 2.4, 2.5, 2.3, 0.8, 2.4, 2.5, 2.8];

const series1: Series[] = [
  {
    id: 'ccj-count',
    label: 'CCJs issued (thousands)',
    colour: '#E63946',
    data: ccjValues.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
  {
    id: 'ccj-avg-debt',
    label: 'Average CCJ debt (£, scaled ÷2)',
    colour: '#F4A261',
    data: ccjAvgDebtValues.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v / 2 })),
  },
];

const series2: Series[] = [
  {
    id: 'high-cost',
    label: 'High-cost credit borrowers (millions)',
    colour: '#264653',
    data: highCostValues.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
  {
    id: 'council-tax',
    label: 'Council tax enforcement (millions)',
    colour: '#F4A261',
    data: councilTaxValues.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const annotations1: Annotation[] = [
  { date: new Date(2020, 5, 1), label: '2020: COVID payment holidays pause CCJs' },
  { date: new Date(2021, 5, 1), label: '2021: Moratoriums lifted — surge follows' },
];

const annotations2: Annotation[] = [
  { date: new Date(2020, 5, 1), label: '2020: COVID enforcement suspension' },
  { date: new Date(2022, 5, 1), label: '2022: Cost-of-living crisis drives arrears' },
];

export default function DebtEnforcementPage() {
  return (
    <>
      <TopicNav topic="Debt Enforcement" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Poverty & Cost of Living"
          question="What Happens When You Can't Pay Your Debts?"
          finding="706,000 County Court Judgments were issued in England and Wales in 2024 — an 18% increase since 2021. 3.1 million adults lack access to affordable credit and rely on high-cost lenders. Council tax enforcement actions reached a record 2.8 million, driven by arrears from the cost-of-living crisis."
          colour="#F4A261"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>When people fall behind on bills, the enforcement system can transform a manageable debt into an unmanageable one. County Court Judgments — issued when a creditor applies to court for repayment — affect credit ratings and can trigger bailiff action. CCJs fell during COVID-era payment holidays but have surged since 2021, reaching 706,000 in 2024 with an average debt of £1,442. Council tax remains the most aggressively enforced debt in England, with 2.8 million enforcement actions in 2024. Unlike credit card arrears, a missed council tax payment can fast-track to a bailiff visit within weeks, adding £310 in statutory fees — fees that make the debt harder, not easier, to clear.</p>
            <p>The 3.1 million adults currently using high-cost credit — payday loans, rent-to-own, doorstep lending — are predominantly those with no access to affordable alternatives. Credit unions cover only 3% of the UK adult population compared to 75% in Ireland. Without access to fair credit, a car repair, a broken boiler, or an unexpected bill can spiral into a debt enforcement cycle. The Breathing Space scheme, launched in 2021, provides 60 days of protection from enforcement while people seek debt advice — but uptake at 117,000 people in 2024 reaches only a fraction of those who could benefit.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'CCJs' },
          { id: 'sec-chart2', label: 'High-Cost Credit' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="County Court Judgments"
              value="706,000"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="up 18% since 2021 · average debt £1,442"
              sparklineData={[532, 540, 555, 570, 581, 532, 400, 570, 598, 706]}
              source="Registry Trust — CCJ Statistics 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="High-cost credit borrowers"
              value="3.1M"
              unit="2024"
              direction="flat"
              polarity="up-is-bad"
              changeText="using payday loans, rent-to-own, doorstep lending"
              sparklineData={[3.5, 3.4, 3.3, 3.2, 3.1, 2.9, 2.9, 2.9, 3.0, 3.1]}
              source="FCA — Consumer Credit Market Study 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Council tax enforcement actions"
              value="2.8M"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="up 12% since 2019 · cost-of-living crisis fuelling arrears"
              sparklineData={[2.3, 2.3, 2.4, 2.5, 2.3, 0.8, 2.4, 2.5, 2.8]}
              source="Ministry of Justice — Enforcement Statistics 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="County Court Judgments, England and Wales, 2015–2024"
              subtitle="Annual CCJs issued (thousands) and average debt (£, scaled ÷2 for comparison). CCJs fell during pandemic payment holidays but have surged since 2021 as moratoria ended and cost-of-living pressures mounted."
              series={series1}
              annotations={annotations1}
              yLabel="CCJs (thousands) / Avg debt ÷2 (£)"
              source={{ name: 'Registry Trust', dataset: 'County Court Judgment Statistics', url: 'https://www.registrytrust.org.uk', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="High-cost credit users and council tax enforcement, 2015–2024"
              subtitle="Adults using high-cost credit products (millions) and council tax enforcement actions (millions). COVID suspended enforcement in 2020; post-pandemic surge exceeded pre-pandemic levels by 2022."
              series={series2}
              annotations={annotations2}
              yLabel="Millions"
              source={{ name: 'FCA / Ministry of Justice', dataset: 'Consumer Credit Market Study; Enforcement Statistics', url: 'https://www.gov.uk/government/collections/enforcement-statistics-quarterly', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Breathing Space scheme: 117,000 using debt protection in 2024"
            value="117,000"
            unit="people used Breathing Space in 2024"
            description="The Breathing Space scheme, launched in 2021, gives people in problem debt 60 days of protection from creditor action and enforcement while they seek professional debt advice. In 2024, 117,000 people used the scheme. StepChange and National Debtline received 820,000 client enquiries in 2024, providing free debt advice that helps people avoid enforcement. The scheme demonstrates that earlier intervention — before enforcement begins — improves outcomes for both debtors and creditors. Extending referral routes and awareness could significantly increase uptake among the estimated 3 million people currently in serious problem debt."
            source="Source: Insolvency Service — Breathing Space Statistics 2024. StepChange — Debt Statistics Yearbook 2024."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.registrytrust.org.uk" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Registry Trust — CCJ Statistics</a> — County Court Judgment counts and average debt. Annual. 2024.</p>
            <p><a href="https://www.gov.uk/government/collections/enforcement-statistics-quarterly" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Ministry of Justice — Enforcement Statistics Quarterly</a> — bailiff visits and council tax enforcement actions. Quarterly. 2024.</p>
            <p><a href="https://www.fca.org.uk" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">FCA — Consumer Credit Market Study</a> — high-cost credit user estimates. Periodic. 2024.</p>
            <p>CCJ counts include all consumer and commercial judgments. COVID-19 period data reflects enforcement suspension from March to June 2020. High-cost credit estimates include payday loans, home-collected credit, rent-to-own, and buy-now-pay-later products with APR exceeding 100%.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
