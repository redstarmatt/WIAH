'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

export default function FeCollegeFundingPage() {
  // Chart 1: FE funding per student in real terms 2010-2024 (indexed to 2010=100)
  const feIndexData = [100, 97, 93, 90, 88, 86, 85, 84, 83, 82, 84, 86, 88, 89, 88];
  const feIndexSeries: Series[] = [
    {
      id: 'fe-index',
      label: 'FE funding per student (2010=100, real terms)',
      colour: '#F4A261',
      data: feIndexData.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];
  const feAnnotations: Annotation[] = [
    { date: new Date(2010, 0, 1), label: '2010: Spending Review cuts begin' },
    { date: new Date(2019, 0, 1), label: '2019: FE funding uplift announced' },
  ];
  const feTarget = { value: 100, label: '2010 funding level (real terms)' };

  // Chart 2: 16-18 participation in FE vs apprenticeships 2015-2024
  const feParticipationData = [1620, 1610, 1590, 1570, 1560, 1540, 1510, 1480, 1465, 1450];
  const apprenticeData = [440, 450, 460, 470, 490, 480, 465, 455, 460, 470];
  const participationSeries: Series[] = [
    {
      id: 'fe-participation',
      label: 'FE college participation 16-18 (thousands)',
      colour: '#F4A261',
      data: feParticipationData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'apprenticeships',
      label: 'Apprenticeship starts 16-18 (thousands)',
      colour: '#2A9D8F',
      data: apprenticeData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="FE College Funding" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="FE College Funding"
          question="Are Further Education Colleges Being Starved of Funding?"
          finding="FE college funding per student fell 12% in real terms between 2010 and 2024 — England spends significantly less per FE student than comparable economies — leaving 16-18 year olds in non-A-level education worse off."
          colour="#F4A261"
          preposition="with"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key figures' },
          { id: 'sec-funding', label: 'Funding trend' },
          { id: 'sec-participation', label: 'Participation' },
          { id: 'sec-context', label: 'Context' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="FE funding per student real-terms change"
              value="-12%"
              direction="down"
              polarity="down-is-bad"
              changeText="since 2010 · partial recovery since 2019 but gap remains"
              sparklineData={[100, 97, 93, 90, 88, 86, 85, 84, 84, 86, 88, 88]}
              source="Institute for Fiscal Studies — FE Funding Analysis, 2024"
            />
            <MetricCard
              label="FE vs HE spend per student"
              value="0.4×"
              direction="down"
              polarity="down-is-bad"
              changeText="England spends 60% less per FE student than HE student"
              sparklineData={[0.55, 0.53, 0.50, 0.47, 0.45, 0.44, 0.43, 0.42, 0.41, 0.40]}
              source="IFS — Education Spending in England, 2024"
            />
            <MetricCard
              label="NEET young people (thousands)"
              value="870"
              direction="up"
              polarity="up-is-bad"
              changeText="16-24 year olds · FE decline a contributing factor"
              sparklineData={[810, 790, 780, 800, 820, 870, 860, 840, 850, 870]}
              source="ONS — NEET Statistics, Q4 2023"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-funding" className="mb-12">
            <LineChart
              title="FE funding per student in real terms, England, 2010–2024 (2010=100)"
              subtitle="16-18 funding rates in FE colleges, deflated to 2010 prices. Sustained cuts from 2010 partially reversed from 2019 but real-terms 2010 level not restored."
              series={feIndexSeries}
              annotations={feAnnotations}
              targetLine={feTarget}
              yLabel="Index (2010 = 100)"
              source={{
                name: 'Institute for Fiscal Studies',
                dataset: 'Education spending in England',
                frequency: 'annual',
                url: 'https://www.ifs.org.uk/tools_and_resources/fiscal_facts/education_spending_in_england',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-participation" className="mb-12">
            <LineChart
              title="16-18 participation in FE colleges vs apprenticeships, 2015–2024 (thousands)"
              subtitle="FE college participation has fallen as funding constraints reduced course breadth and quality. Apprenticeship starts have remained relatively stable."
              series={participationSeries}
              yLabel="Students / starts (thousands)"
              source={{
                name: 'Department for Education',
                dataset: '16-18 Education and Training Participation',
                frequency: 'annual',
                url: 'https://explore-education-statistics.service.gov.uk/find-statistics/participation-in-education-training-and-employment',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout>
            The Skills and Post-16 Education Act 2022 introduced a new Lifelong Loan Entitlement, enabling adults to access loan funding for modular courses at FE colleges for the first time from 2025. This could significantly widen access to retraining for adults who cannot commit to full-time study.
          </PositiveCallout>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-context" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on FE college funding</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Between 2009-10 and 2019-20, 16-18 education funding per student in England fell by around 16% in real terms — a cut sustained over a decade that left college buildings unmaintained, courses cut, and teacher pay lagging further behind equivalent school roles each year. England now spends roughly 40% of what it spends per university student on each FE college student — a ratio that reflects a long-standing political preference for higher education that is visible nowhere more clearly than in the funding tables.</p>
              <p>The consequences compound. Teachers paid less than school equivalents are harder to recruit and retain in vocational subjects, reducing the range and quality of provision. Buildings require investment of an estimated £2.7 billion simply to bring them to satisfactory standard. Colleges serving the most deprived communities — often those in ex-industrial towns with the highest NEET rates — face the sharpest student-to-funding squeeze because they cannot supplement income through higher-margin provision. The Association of Colleges estimates an average funding shortfall of £1,300 per student per year against what is needed to match school sixth form provision.</p>
              <p>The partial uplift from 2019 and additional workforce funding in 2022 have improved the picture, but not reversed it. Meanwhile Germany and Denmark spend 50-80% more per vocational student than England. The skills gap this creates feeds directly into labour market shortages in construction, engineering, health, and social care — the sectors England most needs to grow.</p>
            </div>
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.ifs.org.uk/tools_and_resources/fiscal_facts/education_spending_in_england" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Institute for Fiscal Studies</a> — Education Spending in England. Annual series, GDP deflator used for real-terms calculation.</p>
            <p><a href="https://explore-education-statistics.service.gov.uk/find-statistics/participation-in-education-training-and-employment" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Department for Education</a> — Participation in Education, Training and Employment. Published annually. Covers 16-18 year olds in England.</p>
            <p>Funding index uses 16-18 funding rates in the national funding formula, deflated using HM Treasury GDP deflators. FE vs HE spending ratio uses average per-student resource from IFS analysis. NEET figures from ONS Labour Market Statistics.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
