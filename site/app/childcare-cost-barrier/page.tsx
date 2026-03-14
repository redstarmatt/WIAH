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
  { num: 1, name: 'Coram Family and Childcare', dataset: 'Childcare Survey', url: 'https://www.coram.org.uk/our-work/coram-family-and-childcare/childcare-survey', date: '2024' },
  { num: 2, name: 'OECD', dataset: 'Family Database — net childcare costs', url: 'https://www.oecd.org/els/family/database.htm', date: '2024' },
  { num: 3, name: 'Pregnant Then Screwed', dataset: 'Cost of Childcare Survey', date: '2024' },
  { num: 4, name: 'Ofsted', dataset: 'Childcare provider statistics', date: '2024' },
];

export default function ChildcareCostBarrierPage() {
  const annualCostData = [8200, 8600, 9000, 9500, 10000, 10500, 11000, 11500, 12000, 12800, 13400, 14000, 14300, 14600, 14800];
  const ukVsOecdData = [
    [33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
    [22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 28],
  ];

  const annualCostSeries: Series[] = [
    {
      id: 'cost',
      label: 'Average annual full-time toddler care cost (£)',
      colour: '#F4A261',
      data: annualCostData.map((v: number, i: number) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const comparisonSeries: Series[] = [
    {
      id: 'uk',
      label: 'UK childcare cost (% of average earnings)',
      colour: '#F4A261',
      data: ukVsOecdData[0].map((v: number, i: number) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
    {
      id: 'oecd',
      label: 'OECD average childcare cost (% of earnings)',
      colour: '#6B7280',
      data: ukVsOecdData[1].map((v: number, i: number) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const costAnnotations: Annotation[] = [
    { date: new Date(2017, 0, 1), label: '2017: 30-hours free childcare (3–4 yr olds)' },
    { date: new Date(2024, 0, 1), label: '2024: Extension to 9-month-olds begins' },
  ];

  return (
    <>
      <TopicNav topic="Childcare Cost" />
      <SectionNav sections={[
        { id: 'sec-metrics', label: 'Key Metrics' },
        { id: 'sec-cost', label: 'Annual Cost' },
        { id: 'sec-comparison', label: 'OECD Comparison' },
        { id: 'sec-context', label: 'Context' },
        { id: 'sec-sources', label: 'Sources' },
      ]} />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Childcare"
          question="Is Childcare Forcing Parents Out of Work?"
          finding="Average childcare costs £14,000/year for a toddler in full-time care — the UK has the second-highest childcare costs as a share of earnings in the OECD, and 1 in 4 mothers reduces hours due to cost."
          colour="#F4A261"
        />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 mb-12">
            <MetricCard
              label="Average full-time toddler care cost (£/yr)"
              value="£14,000"
              direction="up"
              polarity="up-is-bad"
              changeText="up from £8,200 in 2010 · more than average UK mortgage"
              sparklineData={[10000, 10500, 11000, 11500, 12000, 13400, 14000]}
              source="Coram Family and Childcare — 2024"
            />
            <MetricCard
              label="Childcare cost as % of average earnings"
              value="47"
              direction="up"
              polarity="up-is-bad"
              changeText="2nd highest in OECD · OECD average is 28%"
              sparklineData={[39, 40, 41, 42, 43, 45, 47]}
              source="OECD Family Database — 2024"
            />
            <MetricCard
              label="Mothers reducing hours due to childcare cost (%)"
              value="26"
              direction="up"
              polarity="up-is-bad"
              changeText="1 in 4 mothers · twice the rate for fathers"
              sparklineData={[18, 19, 20, 21, 22, 24, 26]}
              source="Pregnant Then Screwed — 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-cost" className="mb-12">
            <LineChart
              title="Average annual childcare cost for a toddler in full-time care, England 2010–2024 (£)"
              subtitle="Full-time nursery cost for a child aged 1–2 years (25 hours/week, 50 weeks/year). England average."
              series={annualCostSeries}
              annotations={costAnnotations}
              yLabel="Annual cost (£)"
              source={{
                name: 'Coram Family and Childcare',
                dataset: 'Childcare Survey — annual cost data',
                frequency: 'annual',
                url: 'https://www.coram.org.uk/our-work/coram-family-and-childcare/childcare-survey',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-comparison" className="mb-12">
            <LineChart
              title="UK childcare cost vs OECD average as % of average earnings 2010–2024"
              subtitle="Net childcare costs as a percentage of average wages for a family using full-time childcare. UK is consistently among the highest in the developed world."
              series={comparisonSeries}
              yLabel="Cost as % of average earnings"
              source={{
                name: 'OECD Family Database',
                dataset: 'Net childcare costs as a percentage of average wages',
                frequency: 'annual',
                url: 'https://www.oecd.org/els/family/database.htm',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Historic Investment"
            value="£4.1bn"
            unit="per year"
            description="The 2024 expansion of funded hours — extending 30 hours per week to children from 9 months — is the largest single investment in childcare in England's history, at an estimated £4.1 billion per year. Early evidence shows demand is high. The critical question is whether the hourly funding rate is sufficient for providers to remain financially viable."
            source="Department for Education, Childcare Expansion Programme"
          />
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-context" className="max-w-2xl mb-12 mt-8">
            <h2 className="text-xl font-bold text-wiah-black mb-4">Why is UK childcare so expensive?</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>The UK has some of the most expensive childcare in the developed world — a product of high staff-to-child ratios required by regulation, low government subsidy relative to other OECD countries historically, and rising property and operational costs.<Cite nums={2} /> For a dual-income family with two children under three, full-time childcare costs can exceed the entire net salary of the lower-paid partner, making work financially irrational. The average annual cost of full-time nursery for a toddler in England is now £14,000 — up 70% in real terms since 2010.<Cite nums={1} /></p>
              <p>The consequences fall disproportionately on women. Pregnant Then Screwed's 2024 survey found that 26% of mothers had reduced their working hours or left employment entirely because of childcare costs, compared with 13% of fathers.<Cite nums={3} /> This interruption creates compounding lifetime earnings penalties — the "motherhood penalty" — that feed into the gender pay gap, pension savings gaps, and career progression inequalities. Women in lower-paid work face the sharpest trade-offs: if childcare costs more than you earn, you stop working.</p>
              <p>Approximately 4,500 childcare providers closed between 2019 and 2023, often in the areas of greatest need.<Cite nums={4} /> The low wages paid to the early years workforce — averaging £11.40 per hour in 2024 — mean providers struggle to recruit and retain qualified staff.<Cite nums={1} /> The sector is simultaneously too expensive for families and financially precarious for providers. The 2024 expansion of funded hours is the largest policy response in a generation, but its success depends on the hourly government reimbursement rate covering providers' actual costs.</p>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.coram.org.uk/our-work/coram-family-and-childcare/childcare-survey" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Coram Family and Childcare — Childcare Survey</a> — annual survey of local authority childcare costs across England. The standard benchmark for UK childcare cost data.</p>
            <p>OECD net childcare cost comparisons from OECD Family Database. Parental employment impact from Pregnant Then Screwed Cost of Childcare Survey (2024). Provider closure data from Ofsted childcare provider statistics. All cost figures are for England; OECD comparisons use UK national data.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
