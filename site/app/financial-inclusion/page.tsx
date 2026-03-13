'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Unbanked adults (millions), 2015–2024 — FCA Financial Lives
const unbankedValues = [1.7, 1.6, 1.5, 1.5, 1.4, 1.3, 1.2, 1.1, 1.0, 1.0];

// Adults in financial difficulty (millions), 2015–2024 — FCA Financial Lives
const financialDifficultyValues = [6.5, 6.8, 7.0, 7.5, 7.8, 8.5, 8.0, 9.0, 11.5, 10.8];

// High-cost credit users (millions), 2018–2024 — FCA
const highCostCreditValues = [3.5, 3.4, 3.1, 3.0, 3.5, 4.2, 3.8];

const bankingSeries: Series[] = [
  {
    id: 'unbanked',
    label: 'Unbanked adults (millions)',
    colour: '#264653',
    data: unbankedValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const difficultySeries: Series[] = [
  {
    id: 'financial-difficulty',
    label: 'Adults in financial difficulty (millions)',
    colour: '#E63946',
    data: financialDifficultyValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'high-cost-credit',
    label: 'High-cost credit users (millions)',
    colour: '#F4A261',
    data: highCostCreditValues.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
  },
];

const bankingAnnotations: Annotation[] = [
  { date: new Date(2021, 0, 1), label: '2021: Basic bank accounts expanded' },
];

const difficultyAnnotations: Annotation[] = [
  { date: new Date(2022, 0, 1), label: '2022: Cost-of-living crisis' },
];

export default function FinancialInclusionPage() {
  return (
    <>
      <TopicNav topic="Financial Inclusion" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Financial Inclusion"
          question="Can Everyone Actually Access Financial Services?"
          finding="Around 1 million adults in the UK are unbanked. 10.8 million are in financial difficulty. High-cost credit use spiked during the 2022 cost-of-living crisis. Being locked out of mainstream finance costs the poorest households an estimated £500 more per year than the average."
          colour="#264653"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Financial exclusion — the inability to access affordable, appropriate financial products — remains a significant problem in the UK despite years of policy focus. Around 1 million adults have no bank account at all, meaning they cannot receive wages electronically, pay bills by direct debit, or access online services. A further 6 million adults have a bank account but make limited use of other financial products. The 'poverty premium' — the additional cost paid by low-income households for insurance, energy, credit, and basic services due to exclusion from mainstream markets — is estimated at around £500 per year by Citizens Advice. Pay-as-you-go energy tariffs, door-step lending, and high-cost short-term credit each extract a premium from the most financially vulnerable.</p>
            <p>The FCA's Financial Lives survey tracks the number of adults in financial difficulty — defined as missing bills or credit commitments in the previous six months, or finding keeping up with domestic bills a heavy burden. This figure rose sharply during the 2022 cost-of-living crisis, reaching approximately 11.5 million at the peak before falling back to 10.8 million in 2024. High-cost credit use — doorstep lending, payday loans, rent-to-own, and buy-now-pay-later products without FCA oversight — spiked in 2022 as households sought credit to cover rising energy and food bills. The FCA's Consumer Duty, introduced in July 2023, requires firms to demonstrate positive customer outcomes, which is expected to improve fair treatment of vulnerable customers.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Banking access' },
          { id: 'sec-chart2', label: 'Financial difficulty' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Unbanked adults"
              value="1M"
              unit=""
              direction="down"
              polarity="down-is-bad"
              changeText="Down from 1.7M in 2015 · basic bank accounts helping"
              sparklineData={[1.7, 1.6, 1.5, 1.5, 1.4, 1.3, 1.2, 1.1, 1.0, 1.0]}
              source="FCA · Financial Lives survey 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Adults in financial difficulty"
              value="10.8M"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="Down from 11.5M peak in 2022 · still far above 2019 levels"
              sparklineData={[6.5, 6.8, 7.0, 7.5, 7.8, 8.5, 9.0, 11.5, 10.8]}
              source="FCA · Financial Lives survey 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Poverty premium cost"
              value="£500"
              unit="/year"
              direction="up"
              polarity="up-is-bad"
              changeText="Extra annual cost of being financially excluded"
              sparklineData={[380, 390, 400, 420, 440, 450, 460, 480, 490, 500]}
              source="Citizens Advice · Poverty premium analysis 2023"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Unbanked adults, UK, 2015–2024"
              subtitle="Adults with no bank account at all. Falling as basic bank account availability has improved, but 1 million adults remain without banking access."
              series={bankingSeries}
              annotations={bankingAnnotations}
              yLabel="Adults (millions)"
              source={{ name: 'FCA', dataset: 'Financial Lives survey', url: 'https://www.fca.org.uk/publications/research/financial-lives', frequency: 'biannual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Adults in financial difficulty and high-cost credit use, UK, 2015–2024"
              subtitle="Adults missing bills or heavily burdened by domestic costs (millions). High-cost credit use spiked during the 2022 cost-of-living crisis."
              series={difficultySeries}
              annotations={difficultyAnnotations}
              yLabel="Adults (millions)"
              source={{ name: 'FCA', dataset: 'Financial Lives survey', url: 'https://www.fca.org.uk/publications/research/financial-lives', frequency: 'biannual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="FCA Consumer Duty covers 50,000 financial firms"
            value="50,000"
            description="The FCA Consumer Duty, which came into force in July 2023, requires all 50,000 FCA-regulated firms to prove they deliver positive outcomes for retail customers — a significant shift from rules-based compliance to outcomes-based accountability. Firms must now demonstrate that they have assessed customer vulnerability, that pricing is fair, and that customers are not persistently in inappropriate products. Early FCA supervisory work found that firms most likely to affect financially vulnerable consumers — including mortgage lenders, consumer credit firms, and insurance companies — are improving treatment of customers in financial difficulty. The Duty is the most significant change in UK financial regulation for a decade."
            source="Source: FCA — Consumer Duty: findings from year one 2024. Citizens Advice — The poverty premium 2023."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.fca.org.uk/publications/research/financial-lives" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">FCA — Financial Lives survey</a> — biannual survey of financial resilience, product use, and vulnerability in the UK adult population.</p>
            <p><a href="https://www.citizensadvice.org.uk/about-us/our-work/policy/policy-research-topics/consumer-policy-research/consumer-policy-research/the-poverty-premium/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Citizens Advice — The poverty premium</a> — analysis of the additional costs paid by low-income households for essential services.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
