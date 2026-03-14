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

// Spending power per head £ real terms, 2010–2025
const spendingPowerValues = [3120, 3050, 2920, 2800, 2740, 2680, 2640, 2620, 2600, 2620, 2640, 2580, 2490, 2420, 2370, 2360];

// Adult social care spend £bn, 2010–2025
const adultCareValues = [14.2, 14.0, 13.8, 13.6, 13.5, 13.8, 14.2, 14.8, 15.5, 16.0, 16.8, 17.5, 18.2, 18.8, 19.4, 20.1];

// Children's social care £bn, 2010–2025
const childrenCareValues = [7.2, 7.5, 7.8, 8.0, 8.2, 8.5, 8.9, 9.4, 9.9, 10.5, 11.2, 11.8, 12.5, 13.0, 13.5, 14.0];

// S114 cumulative notices
const s114CumValues = [0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 6, 9, 12, 14];

// Council tax Band D £, 2010–2025
const councilTaxValues = [1196, 1196, 1196, 1200, 1252, 1337, 1439, 1530, 1591, 1671, 1756, 1898, 2065, 2171, 2280, 2400];

const series1: Series[] = [
  {
    id: 'spending-power',
    label: 'Spending power per head (£, real terms 2024 prices)',
    colour: '#E63946',
    data: spendingPowerValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'adult-social-care',
    label: 'Adult social care (£bn)',
    colour: '#264653',
    data: adultCareValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
  {
    id: 'childrens-social-care',
    label: "Children's social care (£bn)",
    colour: '#F4A261',
    data: childrenCareValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const annotations1: Annotation[] = [
  { date: new Date(2010, 0, 1), label: '2010: Austerity begins' },
  { date: new Date(2020, 0, 1), label: '2020: COVID grants (temporary)' },
];

const annotations2: Annotation[] = [
  { date: new Date(2014, 0, 1), label: '2014: Care Act enacted' },
  { date: new Date(2022, 0, 1), label: '2022: Residential care cost spike' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'DLUHC', dataset: 'Local Authority Revenue Expenditure and Financing', url: 'https://www.gov.uk/government/collections/local-authority-revenue-expenditure-and-financing', date: '2025' },
  { num: 2, name: 'Local Government Association', dataset: 'Local Government Funding', url: 'https://www.local.gov.uk/topics/finance/local-government-finance-and-spending', date: '2025' },
  { num: 3, name: 'National Audit Office', dataset: 'Financial Sustainability of Local Authorities', url: 'https://www.nao.org.uk', date: '2025' },
];

export default function CouncilFundingPage() {
  return (
    <>
      <TopicNav topic="Council Funding" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy & Work"
          question="Are Councils Going Broke?"
          finding="Local authority spending power has fallen 24% per head in real terms since 2010, while demand-led costs in adult and children's social care have surged. Fourteen English councils have issued Section 114 insolvency notices since 2018."
          colour="#6B7280"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>English councils have lost nearly a quarter of their spending power per head since 2010 in real terms.<Cite nums={1} /> The central government grant was cut faster and deeper than almost any other area of public spending during the austerity years, and the gap has never been restored. Councils were expected to replace lost grant income with council tax and business rates, but these revenues are capped by referendum limits and unevenly distributed.<Cite nums={2} /> The result is a system where the councils serving the most deprived populations received the deepest cuts — in some cases 40% cuts in real terms compared to 10–15% for wealthy suburban councils.<Cite nums={3} /></p>
            <p>At the same time, demand for the two largest council services has escalated relentlessly. Adult social care now absorbs over £19 billion annually, driven by an ageing population and rising provider costs.<Cite nums={1} /> Children's social care spending has risen 62% in real terms since 2010, fuelled by rising child protection referrals and a residential care market where private providers charge councils up to £10,000 per week per child.<Cite nums={1} /> Before 2018, only one council had issued a s114 notice in two decades. Since then, fourteen have done so.<Cite nums={3} /> Council tax has risen 54% since 2010 while services have contracted.<Cite nums={1} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-spending', label: 'Spending Power' },
          { id: 'sec-social-care', label: 'Social Care Costs' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Real-terms spending cut since 2010"
              value="-24%"
              unit="per head"
              direction="down"
              polarity="up-is-good"
              changeText="£3,120 → £2,360 per head (2024 prices)"
              sparklineData={[3050, 2920, 2800, 2740, 2680, 2640, 2600, 2620, 2580, 2490, 2420, 2360]}
              source="DLUHC — Local authority revenue expenditure 2025"
              href="#sec-spending"
            />
            <MetricCard
              label="Councils issuing s114 notices"
              value="14"
              unit="since 2018"
              direction="up"
              polarity="up-is-bad"
              changeText="including Birmingham (2023) · more expected by 2026"
              sparklineData={[0, 0, 1, 2, 3, 4, 6, 9, 12, 14]}
              source="DLUHC / NAO — Section 114 tracking 2025"
              href="#sec-sources"
            />
            <MetricCard
              label="Average council tax (Band D)"
              value="£2,400"
              unit="2025/26"
              direction="up"
              polarity="up-is-bad"
              changeText="+54% since 2010 · rising to fill the funding gap"
              sparklineData={[1252, 1337, 1439, 1530, 1591, 1671, 1756, 1898, 2065, 2171, 2280, 2400]}
              source="DLUHC — Council tax levels set by local authorities 2025"
              href="#sec-spending"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-spending" className="mb-12">
            <LineChart
              title="Local authority spending power per head, England, 2010–2025"
              subtitle="Real-terms spending power per head (2024 prices). Includes formula grant, council tax, business rates retention and specific grants. The 24% fall since 2010 has driven service cuts across all councils."
              series={series1}
              annotations={annotations1}
              yLabel="£ per head"
              source={{ name: 'DLUHC', dataset: 'Local Authority Revenue Expenditure and Financing', url: 'https://www.gov.uk/government/collections/local-authority-revenue-expenditure-and-financing', frequency: 'annual', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-social-care" className="mb-12">
            <LineChart
              title="Social care spending by English councils, 2010–2025"
              subtitle="Net current expenditure on adult and children's social care (£bn, real terms). Together these consume ~60% of upper-tier council budgets, crowding out parks, libraries, roads, and planning."
              series={series2}
              annotations={annotations2}
              yLabel="£ billion"
              source={{ name: 'DLUHC', dataset: 'RA/RO Returns — Social Care Expenditure', url: 'https://www.gov.uk/government/collections/local-authority-revenue-expenditure-and-financing', frequency: 'annual', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Multi-year settlement restores planning certainty"
            value="3-year"
            unit="settlement agreed from 2025/26"
            description="The 2024 Spending Review provided English councils with their first multi-year financial settlement since 2015, covering 2025/26 to 2027/28. The settlement includes a £600 million Social Care Support Grant and a one-off £500 million Recovery Fund for the most financially distressed authorities. The LGA estimates the package still leaves a £2 billion+ annual gap, but multi-year certainty allows better planning and should reduce emergency budget decisions in the near term."
            source="Source: DLUHC — Local Government Finance Settlement 2025–26. LGA — Funding gap analysis, 2025. NAO — Financial sustainability of local authorities."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/local-authority-revenue-expenditure-and-financing" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DLUHC — Local Authority Revenue Expenditure and Financing</a> — annual returns. Core spending power basis. Retrieved 2025.</p>
            <p><a href="https://www.local.gov.uk/topics/finance/local-government-finance-and-spending" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">LGA — Local Government Funding</a> — funding gap and pressure analysis. Annual. 2025.</p>
            <p><a href="https://www.nao.org.uk" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">National Audit Office — Financial sustainability of local authorities</a> — independent assessment. Updated 2025.</p>
            <p>Spending power figures are real-terms (2024 prices) using HM Treasury GDP deflator. Council tax figures are average Band D charges across all English billing authorities. Social care figures are net current expenditure from Revenue Account returns.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
