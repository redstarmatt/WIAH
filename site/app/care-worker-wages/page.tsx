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
  { num: 1, name: 'Skills for Care', dataset: 'The State of the Adult Social Care Sector and Workforce in England', url: 'https://www.skillsforcare.org.uk/Adult-Social-Care-Workforce-Data/Workforce-intelligence/publications/national-information/The-state-of-the-adult-social-care-sector-and-workforce-in-England.aspx', date: '2023' },
  { num: 2, name: 'ADASS', dataset: 'Spring and Autumn Survey — vacancy rates and workforce pressure', url: 'https://www.adass.org.uk/adass-publications', date: '2023' },
  { num: 3, name: 'Home Office', dataset: 'Immigration Statistics — Health and Care Worker visa', url: 'https://www.gov.uk/government/collections/immigration-statistics', date: '2023' },
];

export default function CareWorkerWagesPage() {

  const wageData = [7.42, 7.91, 8.45, 9.12, 9.50, 10.08, 10.40, 10.66, 10.90];
  const nmwData  = [6.70, 7.20, 7.50, 7.83, 8.21, 8.72, 9.50, 10.18, 10.42];
  const vacancyData = [6.3, 6.4, 6.8, 7.2, 9.5, 10.6, 9.9, 8.4, 7.8];
  const turnoverData = [30.8, 28.5, 29.1, 28.9, 28.3, 30.4, 34.1, 28.7, 27.2];

  const wageSeries: Series[] = [
    {
      id: 'care-wage',
      label: 'Care worker average hourly pay (£)',
      colour: '#E63946',
      data: wageData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'nmw',
      label: 'National Minimum / Living Wage (£)',
      colour: '#6B7280',
      data: nmwData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const vacancySeries: Series[] = [
    {
      id: 'vacancy-rate',
      label: 'Social care vacancy rate (%)',
      colour: '#E63946',
      data: vacancyData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const wageAnnotations: Annotation[] = [
    { date: new Date(2022, 0, 1), label: '2022: Health & care visa expanded' },
  ];

  return (
    <>
      <TopicNav topic="Care Worker Wages" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Care Worker Wages"
          question="Why Are Care Workers Paid So Little?"
          finding="The average care worker earns £10.66/hour — just above minimum wage — and 1 in 4 care workers earns below the Real Living Wage, driving a 150,000-vacancy crisis."
          colour="#E63946"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-wages', label: 'Pay Trend' },
          { id: 'sec-vacancies', label: 'Vacancies' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Avg care worker hourly pay"
              value="£10.66"
              direction="up"
              polarity="up-is-good"
              changeText="Still below Real Living Wage (£12.00) · NHS Band 2 gets £12.45"
              sparklineData={wageData}
              source="Skills for Care · 2023"
            />
            <MetricCard
              label="Vacancies in social care"
              value="152,000"
              direction="down"
              polarity="up-is-bad"
              changeText="Down from 165,000 peak in 2022 · still far above pre-pandemic levels"
              sparklineData={vacancyData}
              source="Skills for Care · 2023"
            />
            <MetricCard
              label="Staff turnover rate"
              value="28.3%"
              direction="flat"
              polarity="up-is-bad"
              changeText="Entire workforce replaced every 3.5 years · continuity of care impossible"
              sparklineData={turnoverData}
              source="Skills for Care · 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-wages" className="mb-12">
            <LineChart
              title="Care worker hourly pay vs National Minimum/Living Wage, 2015–2023"
              subtitle="England. Average hourly pay for direct care roles in the independent sector vs the statutory wage floor."
              series={wageSeries}
              annotations={wageAnnotations}
              yLabel="£ per hour"
              source={{
                name: 'Skills for Care',
                dataset: 'Adult Social Care Workforce Data Set — annual report',
                frequency: 'annual',
                url: 'https://www.skillsforcare.org.uk/Adult-Social-Care-Workforce-Data/Workforce-intelligence/publications/national-information/The-state-of-the-adult-social-care-sector-and-workforce-in-England.aspx',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-vacancies" className="mb-12">
            <LineChart
              title="Social care vacancy rate, England, 2015–2023"
              subtitle="Unfilled posts as a proportion of all posts (filled and unfilled) in adult social care."
              series={vacancySeries}
              yLabel="Vacancy rate (%)"
              source={{
                name: 'Skills for Care',
                dataset: 'Adult Social Care Workforce Data Set',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What international recruitment has achieved"
            value="70,000"
            unit="overseas workers recruited in 2022/23"
            description="Expansion of the health and care worker visa in 2022 enabled rapid international recruitment, providing short-term relief. But it does not address the domestic pay gap that makes the sector chronically unattractive to UK workers — and workforce dependency on overseas recruitment introduces fragility when visa rules change."
            source="Home Office · Immigration Statistics 2023"
          />
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on care worker wages</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>The median hourly rate for adult social care workers in England was £10.66 in 2023 — below the Real Living Wage of £12.00 and significantly below the NHS Band 2 rate of £12.45 for comparable healthcare support roles.<Cite nums={1} /> One in four care workers earns below the Real Living Wage, and the wage gap relative to NHS equivalents is the primary structural driver of the 150,000-vacancy crisis.<Cite nums={1} /> International recruitment through the health and care worker visa has provided short-term relief but does not solve the domestic supply problem.<Cite nums={3} /></p>
              <p>The vacancy rate peaked at 10.6% in 2022 — equivalent to 165,000 unfilled posts — and has since fallen to 9.9% (152,000) as overseas recruitment ramped up.<Cite nums={[1, 3]} /> But annual staff turnover of 28.3% means the entire workforce is effectively replaced every three and a half years, which is incompatible with continuity of care — a recognised quality indicator, particularly for people with dementia.<Cite nums={1} /></p>
              <p>Homecare workers are most exposed: travelling between clients on zero-hours contracts, often without pay for travel time, with the least job security in the sector.<Cite nums={1} /> The structural cause is clear: the pay gap between independent sector social care and NHS employment means workers move to better-paid alternatives whenever they become available. Research by ADASS, the King's Fund, and Skills for Care identifies a pay floor closing the gap with NHS equivalents — estimated at £1.2 billion per year — as the single most important intervention.<Cite nums={2} /></p>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.skillsforcare.org.uk" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Skills for Care</a> — The State of the Adult Social Care Sector and Workforce in England. Annual report drawing on the Adult Social Care Workforce Data Set, covering approximately 25,000 organisations.</p>
            <p>ADASS — Spring and Autumn Survey data on vacancy rates and workforce pressure.</p>
            <p>NHS Agenda for Change Pay Scales — Band 2 covers healthcare support workers in direct care roles. The Real Living Wage is set annually by the Living Wage Foundation. Vacancy rate is calculated as unfilled posts as a proportion of all posts.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
