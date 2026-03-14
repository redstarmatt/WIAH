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

const editorialRefs: Reference[] = [
  { num: 1, name: 'DLUHC', dataset: 'Local Authority Revenue Outturn Statistics', url: 'https://www.gov.uk/government/collections/local-authority-revenue-expenditure-and-financing', date: '2024' },
  { num: 2, name: 'StepChange / Citizens Advice', dataset: 'Council Tax Debt Statistics', date: '2024', url: 'https://www.stepchange.org/policy-and-research/statistics.aspx' },
  { num: 3, name: 'CDER Network / Citizens Advice', dataset: 'Enforcement Statistics', date: '2024', url: 'https://www.citizensadvice.org.uk/debt-and-money/' },
  { num: 4, name: 'IFS', dataset: 'Council Tax Reform Analysis', url: 'https://ifs.org.uk', date: '2023' },
];

export default function CouncilTaxDebtPage() {

  const debtData = [3.2, 3.4, 3.6, 3.9, 4.2, 4.5, 5.0, 5.4, 5.7, 6.0];
  const bailiffData = [180, 190, 210, 225, 230, 180, 195, 215, 240, 255];

  const debtSeries: Series[] = [
    {
      id: 'council-tax-debt',
      label: 'Total council tax debt (£bn)',
      colour: '#E63946',
      data: debtData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const bailiffSeries: Series[] = [
    {
      id: 'bailiff-actions',
      label: 'Council tax bailiff actions (thousands)',
      colour: '#E63946',
      data: bailiffData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const debtAnnotations: Annotation[] = [
    { date: new Date(2013, 0, 1), label: '2013: Council Tax Benefit abolished' },
    { date: new Date(2020, 0, 1), label: '2020: Pandemic debt accumulation begins' },
  ];

  return (
    <>
      <TopicNav topic="Council Tax Debt" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Council Tax Debt"
          question="How Bad is the Council Tax Debt Crisis?"
          finding="Council tax debt has reached £6 billion — with 2.8 million households in arrears — and enforcement using bailiffs has increased 25% since 2021."
          colour="#E63946"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-debt', label: 'Debt Trend' },
          { id: 'sec-bailiffs', label: 'Bailiff Actions' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Total council tax debt"
              value="£6bn"
              direction="up"
              polarity="up-is-bad"
              changeText="+£2.8bn since 2015 · a near-doubling in a decade"
              sparklineData={debtData}
              source="DLUHC · Local Authority Revenue Outturn 2024"
            />
            <MetricCard
              label="Households in arrears"
              value="2.8m"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 1.9m in 2019 · cost-of-living driven spike"
              sparklineData={[1.9, 2.0, 2.1, 2.2, 2.3, 2.0, 2.3, 2.5, 2.7, 2.8]}
              source="StepChange / Citizens Advice 2024"
            />
            <MetricCard
              label="Bailiff actions per year"
              value="255,000"
              direction="up"
              polarity="up-is-bad"
              changeText="+25% since 2021 · adds ~£235 in fees to each debt"
              sparklineData={bailiffData}
              source="CDER Network / Citizens Advice 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-debt" className="mb-12">
            <LineChart
              title="Total council tax debt, England, 2015–2024"
              subtitle="Total council tax arrears owed to local authorities in England (£ billions)."
              series={debtSeries}
              annotations={debtAnnotations}
              yLabel="Arrears (£ billions)"
              source={{
                name: 'DLUHC',
                dataset: 'Local Authority Revenue Outturn Statistics',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/collections/local-authority-revenue-expenditure-and-financing',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-bailiffs" className="mb-12">
            <LineChart
              title="Council tax bailiff actions, England, 2015–2024"
              subtitle="Thousands of enforcement actions per year for council tax debt. Excludes other debt types."
              series={bailiffSeries}
              yLabel="Actions (thousands)"
              source={{
                name: 'CDER Network / Citizens Advice',
                dataset: 'Enforcement Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Breathing Space scheme"
            value="60 days"
            unit="protection from creditors"
            description="The Debt Respite Scheme (Breathing Space), launched in 2021, gives people in problem debt 60 days' protection from creditor enforcement while they seek advice. Approximately 75,000 people used it in its first year. Council tax debt is included, but campaigners argue the scheme is too little-known and the time limit too short."
            source="Insolvency Service · Breathing Space Statistics 2023"
          />
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on council tax debt</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Outstanding council tax debt in England reached £6 billion in 2024 — a near-doubling since 2015, driven primarily by the cost-of-living crisis and pandemic-related payment difficulties never fully cleared.<Cite nums={1} /> The abolition of Council Tax Benefit in 2013 and its replacement with inconsistent local council tax support schemes left many councils requiring working-age claimants to pay 20–30% of their bill regardless of income — generating the arrears from which the enforcement cascade follows.<Cite nums={2} /></p>
              <p>Approximately 255,000 bailiff visits were made for council tax in 2024, up 25% since 2021.<Cite nums={3} /> The standard bailiff fee structure adds approximately £235 per debt where an enforcement notice is served, creating situations where enforcement costs exceed the original arrears for small debts — trapping households in a deepening spiral.<Cite nums={3} /></p>
              <p>Council tax bands are based on 1991 property valuations, meaning that properties in areas of high house price growth pay the same band as in 1991 despite enormous value increases. The IFS has recommended replacing council tax with a proportional property tax levied as a percentage of current value, which would be both more economically rational and more progressive.<Cite nums={4} /> No government has attempted comprehensive reform since the poll tax in the early 1990s.</p>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.gov.uk/government/collections/local-authority-revenue-expenditure-and-financing" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DLUHC</a> — Local Authority Revenue Outturn (RA) returns (England only). Bailiff visit data from Civil Enforcement Association and CDER Network annual statistics.</p>
            <p>Household in debt estimates from StepChange Statistics Yearbook and Citizens Advice energy and debt case data. Council tax support statistics from DLUHC Council Tax Statistical Release.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
