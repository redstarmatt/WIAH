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

// AI adoption by business size (%), 2016–2024 — DSIT AI Activity in UK Businesses Survey
const largeBusinessValues = [8, 12, 18, 24, 31, 38, 42, 44, 46];
const smeValues = [2, 3, 4, 6, 8, 11, 13, 14, 15];

// Firms citing AI skills gap (%), 2021–2024
const skillsGapValues = [51, 58, 65, 71, 78];

const series1: Series[] = [
  {
    id: 'large',
    label: 'Large businesses (250+ employees)',
    colour: '#F4A261',
    data: largeBusinessValues.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
  },
  {
    id: 'sme',
    label: 'SMEs (fewer than 250 employees)',
    colour: '#6B7280',
    data: smeValues.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'skills-gap',
    label: 'Firms citing AI skills gap (%)',
    colour: '#E63946',
    data: skillsGapValues.map((v, i) => ({ date: new Date(2021 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2022, 0, 1), label: '2022: ChatGPT launches — awareness surge' },
  { date: new Date(2025, 0, 1), label: '2025: AI Opportunities Action Plan' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'DSIT', dataset: 'AI Activity in UK Businesses Survey', url: 'https://www.gov.uk/government/statistics/ai-activity-in-uk-businesses', date: '2024' },
  { num: 2, name: 'OECD', dataset: 'AI Investment and Productivity Analysis', url: 'https://www.oecd.org/going-digital/ai', date: '2024' },
];

export default function AiAdoptionBusinessPage() {
  return (
    <>
      <TopicNav topic="AI Adoption in Business" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="AI Adoption in Business"
          question="Is British business actually using AI?"
          finding="Less than half of large UK businesses use AI and only 1 in 7 small firms have adopted it, leaving Britain trailing peers in productivity gains. Skills gaps are the primary barrier, cited by 78% of firms in 2024."
          colour="#F4A261"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>AI adoption in UK businesses has accelerated since 2020 but reveals a stark two-tier pattern. Large enterprises — particularly in financial services, professional services, and technology — have embedded AI into core workflows rapidly: 46% of businesses with 250 or more employees now use at least one AI application.<Cite nums={1} /> SMEs, which account for 99.9% of all UK businesses and 60% of private sector employment, have been far slower, at just 15% adoption in 2024.<Cite nums={1} /> Skills are the primary barrier: 78% of firms in the 2024 DSIT survey cited lack of AI-related skills — up from 51% in 2021.<Cite nums={1} /> UK AI investment per worker stood at £890 in 2023, well below the US at £2,100 and Germany at £1,400.<Cite nums={2} /></p>
            <p>The productivity consequences are significant and may be compounding. OECD analysis shows firms adopting AI achieve 15–40% productivity gains in affected tasks, but diffusion to the broader economy takes 5–10 years without active policy support.<Cite nums={2} /> The current adoption pattern — concentrated in sectors already productive — risks widening rather than closing the UK's existing productivity gap. The AI Opportunities Action Plan (2025) committed to sector-specific adoption programmes, and the Made Smarter manufacturing AI programme showed strong results in pilot regions — but neither has yet shifted the adoption curve for the 5.5 million SMEs that currently have no AI strategy.<Cite nums={1} /> The pipeline of AI-competent workers remains heavily concentrated in London and the South East.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'AI Adoption' },
          { id: 'sec-chart2', label: 'Skills gap' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Large businesses using AI"
              value="46%"
              unit="2024"
              direction="up"
              polarity="up-is-good"
              changeText="+38pp since 2016 · SMEs: 15% · 31pp gap"
              sparklineData={largeBusinessValues}
              source="DSIT · AI Activity in UK Businesses Survey 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="AI investment per worker"
              value="£890"
              unit="2023"
              direction="up"
              polarity="up-is-good"
              changeText="+£420 since 2021 · vs US £2,100 · vs Germany £1,400"
              sparklineData={[310, 380, 450, 520, 600, 680, 760, 840, 890]}
              source="OECD · AI Investment and Productivity 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Firms citing AI skills gap"
              value="78%"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 51% in 2021 · biggest barrier to adoption"
              sparklineData={skillsGapValues}
              source="DSIT · AI Activity in UK Businesses Survey 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="AI adoption by business size, UK, 2016–2024"
              subtitle="Percentage of businesses using AI, by employee size band. Large businesses (amber) and SMEs (grey) are diverging, not converging."
              series={series1}
              annotations={annotations}
              yLabel="%"
              source={{ name: 'DSIT', dataset: 'AI Activity in UK Businesses Survey', url: 'https://www.gov.uk/government/statistics/ai-activity-in-uk-businesses', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Firms citing AI skills gap as barrier to adoption, UK, 2021–2024"
              subtitle="Percentage of businesses reporting lack of AI-related skills as the primary barrier. Rising sharply as AI capability outpaces workforce readiness."
              series={series2}
              annotations={[]}
              yLabel="% of firms"
              source={{ name: 'DSIT', dataset: 'AI Activity in UK Businesses Survey', url: 'https://www.gov.uk/government/statistics/ai-activity-in-uk-businesses', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Made Smarter and AI Opportunities Action Plan driving adoption"
            value="£1.5bn"
            unit="AI growth fund committed in 2025"
            description="The Made Smarter manufacturing AI programme, piloted in the North West from 2019, has helped over 1,800 SME manufacturers adopt digital and AI technologies, with participating businesses reporting productivity improvements of 10–25%. The AI Opportunities Action Plan, published in January 2025, committed £1.5 billion to AI infrastructure, sector adoption programmes, and AI skills training. Skills Bootcamps in AI and data science have enrolled over 25,000 learners since 2022. While these programmes cannot close the adoption gap overnight, they represent targeted, outcomes-linked investment in the areas where the UK is furthest behind."
            source="Source: DSIT — Made Smarter evaluation 2024. AI Opportunities Action Plan 2025. ESFA — AI Skills Bootcamps outcomes data."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/statistics/ai-activity-in-uk-businesses" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DSIT — AI Activity in UK Businesses Survey 2024</a> — annual survey. gov.uk/government/statistics/ai-activity-in-uk-businesses</p>
            <p><a href="https://www.oecd.org/going-digital/ai" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">OECD — AI Investment and Productivity Analysis</a> — oecd.org/going-digital/ai</p>
            <p>Large business adoption figures are for businesses with 250 or more employees. SME figures cover businesses with fewer than 250 employees. AI adoption is defined as using at least one AI application in core business operations. Investment per worker figures are purchasing-power-parity adjusted.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
