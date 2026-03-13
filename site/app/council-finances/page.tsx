'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Government grant real-terms index (2010=100), 2010–2024
const grantIndexValues = [100, 92, 83, 76, 73, 68, 65, 63, 62, 63, 63, 63, 63, 63, 63];

// Total service spending £bn current prices, 2010–2024
const spendingValues = [98, 95, 93, 91, 89, 89, 91, 93, 96, 99, 103, 107, 112, 118, 123];

// Adult social care £bn, 2010–2024
const adultCareValues = [14.2, 14.0, 13.8, 13.6, 13.5, 13.8, 14.2, 14.8, 15.5, 16.0, 16.8, 17.5, 18.2, 18.8, 19.4];

// Children's social care £bn, 2010–2024
const childrenCareValues = [7.2, 7.5, 7.8, 8.0, 8.2, 8.5, 8.9, 9.4, 9.9, 10.5, 11.2, 11.8, 12.5, 13.0, 13.5];

const series1: Series[] = [
  {
    id: 'grant',
    label: 'Government grant real-terms index (2010=100)',
    colour: '#E63946',
    data: grantIndexValues.map((v, i) => ({ date: new Date(2010 + i, 3, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'adult-care',
    label: 'Adult social care (£bn)',
    colour: '#264653',
    data: adultCareValues.map((v, i) => ({ date: new Date(2010 + i, 3, 1), value: v })),
  },
  {
    id: 'childrens-care',
    label: "Children's social care (£bn)",
    colour: '#F4A261',
    data: childrenCareValues.map((v, i) => ({ date: new Date(2010 + i, 3, 1), value: v })),
  },
];

const annotations1: Annotation[] = [
  { date: new Date(2010, 3, 1), label: '2010: Austerity begins' },
  { date: new Date(2020, 3, 1), label: '2020: COVID grants (temporary)' },
];

const annotations2: Annotation[] = [
  { date: new Date(2014, 3, 1), label: '2014: Care Act enacted' },
  { date: new Date(2022, 3, 1), label: '2022: Residential care cost spike' },
];

export default function CouncilFinancesPage() {
  return (
    <>
      <TopicNav topic="Council Finances" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Council Finances"
          question="Are Britain's Local Councils Going Bankrupt?"
          finding="12 English councils have issued Section 114 notices since 2018, including Birmingham, Thurrock, and Woking. The local government funding gap is £4 billion per year and 1 in 6 councils are at risk of financial failure."
          colour="#6B7280"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>English councils have lost £14 billion a year in government grant since 2010 — a 37% real-terms reduction from £39 billion to £25 billion. The consequences have been acute: twelve councils have issued Section 114 notices since 2018, the statutory declaration that a council cannot balance its budget. Birmingham accumulated a £760 million deficit from an equal pay liability. Thurrock borrowed £500 million to invest in commercial property, which collapsed when interest rates rose. Woking ran up £1.2 billion in debt on town-centre regeneration. CIPFA assessed one in six English councils as at risk of financial failure.</p>
            <p>The structural problem is the collision of rising demand with revenues constrained by statute and austerity. Adult social care now consumes 36% of council budgets, up from 29% in 2010, driven by an ageing population and rising provider costs. Children's services costs rose 20% in real terms between 2019 and 2023 as placement costs soared. Together, these two services consume around 60% of upper-tier council budgets, crowding out spending on parks, libraries, roads, and planning. Council tax has risen 54% since 2010 but cannot keep pace with demand.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-grants', label: 'Government Grants' },
          { id: 'sec-social-care', label: 'Social Care Costs' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Real-terms funding cut since 2010"
              value="37%"
              unit="per head"
              direction="down"
              polarity="up-is-good"
              changeText="£39bn to £25bn · poorer areas hit hardest"
              sparklineData={[92, 83, 76, 73, 68, 65, 63, 62, 63, 63, 63]}
              source="DLUHC — Local authority revenue expenditure 2024"
              href="#sec-grants"
            />
            <MetricCard
              label="Councils issuing Section 114 notices"
              value="12"
              unit="since 2018"
              direction="up"
              polarity="up-is-bad"
              changeText="Birmingham £760M deficit · Thurrock £500M · 1 in 6 at risk"
              sparklineData={[0, 0, 1, 2, 3, 4, 6, 9, 12]}
              source="DLUHC / NAO — Section 114 tracker 2024"
              href="#sec-sources"
            />
            <MetricCard
              label="Annual local government funding gap"
              value="£4bn"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="LGA estimate 2024 · adult social care main pressure"
              sparklineData={[1.0, 1.5, 2.0, 2.5, 3.0, 3.0, 3.5, 3.5, 4.0]}
              source="Local Government Association — Funding gap analysis 2024"
              href="#sec-grants"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-grants" className="mb-12">
            <LineChart
              title="Government grant to English councils, real terms (2010/11 = 100)"
              subtitle="Real-terms government grant index adjusted using GDP deflator. The 37% cut since 2010 has never been restored, forcing councils to raise council tax and cut services."
              series={series1}
              annotations={annotations1}
              yLabel="Index (2010=100)"
              source={{ name: 'DLUHC', dataset: 'Local Authority Revenue Expenditure and Financing', url: 'https://www.gov.uk/government/collections/local-authority-revenue-expenditure-and-financing', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-social-care" className="mb-12">
            <LineChart
              title="Social care spending by English councils, 2010–2024"
              subtitle="Net current expenditure on adult and children's social care (£bn). Together these consume ~60% of upper-tier council budgets, crowding out all other services."
              series={series2}
              annotations={annotations2}
              yLabel="£ billion"
              source={{ name: 'DLUHC', dataset: 'RA/RO Returns — Social Care Expenditure', url: 'https://www.gov.uk/government/collections/local-authority-revenue-expenditure-and-financing', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Multi-year settlement restores some planning certainty"
            value="3-year"
            unit="settlement agreed from 2025/26"
            description="The 2024 Spending Review provided English councils with their first multi-year financial settlement since 2015, covering 2025/26 to 2027/28. The settlement includes a £600 million Social Care Support Grant, a one-off £500 million Recovery Fund for the most financially distressed authorities, and a new Extended Producer Responsibility income stream worth an estimated £1.2 billion by 2027/28. Multi-year certainty allows better planning and reduces emergency budget decisions, even if the overall gap remains."
            source="Source: DLUHC — Local Government Finance Settlement 2025–26. LGA — Funding gap analysis, 2025."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/local-authority-revenue-expenditure-and-financing" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DLUHC — Local Authority Revenue Expenditure and Financing</a> — annual returns on spending and income. Core spending power basis.</p>
            <p><a href="https://www.local.gov.uk/topics/finance/local-government-finance-and-spending" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Local Government Association — Funding gap analysis</a> — annual assessment of the shortfall between need and resource. 2024.</p>
            <p><a href="https://www.nao.org.uk/reports/financial-sustainability-of-local-authorities-2018/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">National Audit Office — Financial sustainability of local authorities</a> — NAO analysis. Updated 2024.</p>
            <p>Real-terms figures adjusted using HM Treasury GDP deflator. Social care spending figures are net current expenditure as reported in Revenue Account (RA) returns. Section 114 notices tracked from council published reports and DLUHC announcements.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
