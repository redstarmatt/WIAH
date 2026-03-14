'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'STRB', dataset: 'School Teachers Pay Review Body — Annual Report', url: 'https://www.gov.uk/government/collections/school-teachers-review-body-strb-reports', date: '2024', note: 'Experienced teacher real pay down ~15% since 2010; England ranked 21st of 28 OECD countries' },
  { num: 2, name: 'DfE', dataset: 'School Workforce in England', url: 'https://www.gov.uk/government/collections/statistics-school-workforce', date: '2024', note: 'Vacancies tripled from ~600 FTE to 2,000+; unfilled posts 1,300; ~40% of new teachers leave within 5 years' },
  { num: 3, name: 'OECD', dataset: 'Education at a Glance — Teacher Pay Indicators', url: 'https://www.oecd.org/education/education-at-a-glance/', date: '2023', note: 'UK teacher pay relative to other graduates below OECD average and falling' },
];

export default function TeacherRealPayPage() {
  // Chart 1: Teacher real pay indexed to 2010=100, 2010–2024
  const experiencedPayIndex = [100, 98, 96, 94, 92, 91, 91, 90, 90, 88, 87, 87, 88, 90, 91];
  const nqtPayIndex         = [100, 98, 96, 94, 91, 91, 91, 91, 91, 91, 90, 92, 94, 96, 96];

  const payIndexSeries: Series[] = [
    {
      id: 'experienced',
      label: 'Experienced teacher real pay (2010=100)',
      colour: '#E63946',
      data: experiencedPayIndex.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
    {
      id: 'nqt',
      label: 'NQT starting salary real pay (2010=100)',
      colour: '#F4A261',
      data: nqtPayIndex.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const payAnnotations: Annotation[] = [
    { date: new Date(2010, 0, 1), label: '2010: Pay freeze begins' },
    { date: new Date(2022, 0, 1), label: '2022: Inflation surge' },
    { date: new Date(2023, 0, 1), label: '2023: Strike action' },
  ];

  const payTargetLine = { value: 100, label: '2010 real pay level' };

  // Chart 2: Teacher vacancies and unfilled posts 2015–2024
  const advertised  = [610, 720, 820, 930, 980, 820, 990, 1320, 1730, 2010];
  const unfilled    = [240, 290, 360, 420, 490, 480, 560, 790, 1100, 1300];

  const vacancySeries: Series[] = [
    {
      id: 'advertised',
      label: 'Teacher vacancies advertised (full-time equivalent)',
      colour: '#F4A261',
      data: advertised.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'unfilled',
      label: 'Unfilled teacher posts at November census (FTE)',
      colour: '#E63946',
      data: unfilled.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const vacancyAnnotations: Annotation[] = [
    { date: new Date(2022, 0, 1), label: '2022: Vacancy crisis peaks' },
  ];

  return (
    <>
      <TopicNav topic="Teacher Real Pay" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Teacher Real Pay"
          question="Have Teachers' Real Wages Fallen?"
          finding="Teachers' real pay is 15% lower than in 2010 in real terms — a newly qualified teacher earns £9,000 less in today's money — driving a recruitment and retention crisis."
          colour="#E63946"
          preposition="on"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-pay', label: 'Real pay trend' },
          { id: 'sec-vacancies', label: 'Vacancies' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Teacher real pay change since 2010 (%)"
              value="-15"
              direction="down"
              polarity="up-is-good"
              changeText="experienced teacher pay 15% below 2010 in real terms"
              sparklineData={[100, 98, 96, 94, 92, 91, 91, 90, 90, 88, 87, 87, 88, 90, 91]}
              source="STRB — School Teachers Pay Review Body 2024"
            />
            <MetricCard
              label="NQT starting salary (£)"
              value="30,000"
              direction="up"
              polarity="up-is-good"
              changeText="up from £21,588 in 2010 but £9,000 lower in real terms"
              sparklineData={[21588, 21588, 22244, 22244, 22467, 22917, 23720, 24000, 25714, 28000, 28000, 28000, 28000, 30000, 30000]}
              source="DfE — School Workforce in England 2024"
            />
            <MetricCard
              label="Teacher vacancy rate (%)"
              value="1.8"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 0.6% in 2015 · maths, physics, computing worst"
              sparklineData={[0.6, 0.7, 0.8, 0.9, 1.0, 0.9, 1.1, 1.4, 1.7, 1.8]}
              source="DfE — School Workforce in England 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-pay" className="mb-12">
            <LineChart
              title="Teacher real pay indexed to 2010, England, 2010–2024"
              subtitle="Experienced teacher pay and NQT starting salary in constant 2024 prices, indexed to 100 at 2010. Values below 100 indicate real-terms pay cuts."
              series={payIndexSeries}
              annotations={payAnnotations}
              targetLine={payTargetLine}
              yLabel="Real pay index (2010=100)"
              source={{
                name: 'STRB / DfE',
                dataset: 'School Teachers Pay Review Body — real pay analysis',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/collections/school-teachers-review-body-strb-reports',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-vacancies" className="mb-12">
            <LineChart
              title="Teacher vacancies and unfilled posts, England, 2015–2024 (FTE)"
              subtitle="Full-time equivalent teacher vacancies advertised and unfilled posts at the November school workforce census. Secondary shortage subjects most affected."
              series={vacancySeries}
              annotations={vacancyAnnotations}
              yLabel="Full-time equivalent posts"
              source={{
                name: 'DfE',
                dataset: 'School Workforce in England',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/collections/statistics-school-workforce',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on teacher pay</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Between 2010 and 2023, experienced teacher pay fell approximately 15% in real terms — while the median graduate salary across all professions rose, creating an 18% gap.<Cite nums={1} /> England ranked 21st of 28 OECD countries for teacher pay relative to other graduates in 2023, below the OECD average and falling.<Cite nums={3} /> ITT recruitment targets have been missed consistently since 2016 in maths, physics, computing, chemistry, and modern foreign languages — precisely the subjects where private sector alternatives pay most.</p>
              <p>Teacher vacancies have grown from around 600 FTE in 2015 to over 2,000 in 2024. Unfilled posts — where schools have been unable to appoint at all — have risen in parallel.<Cite nums={2} /> The consequences fall hardest on pupils in shortage subjects and deprived areas. Schools facing vacancies reach for supply teachers, merge classes, or reduce options. Roughly 40% of new teachers leave within five years, a retention rate that represents significant wasted investment in training.<Cite nums={2} /></p>
              <p>Starting salaries have improved in recent years, with NQT pay reaching £30,000 in 2023. But the compressed gap between entry and progression pay reduces the financial incentive to stay beyond the early career period. Countries consistently outperforming England in pupil attainment — Finland, South Korea, Singapore — treat teaching as a high-status, well-compensated profession.<Cite nums={3} /> The link between teacher pay, status, and pupil outcomes is well-established in comparative research.</p>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.gov.uk/government/collections/school-teachers-review-body-strb-reports" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">School Teachers Review Body (STRB)</a> — Annual Pay Report. Real pay calculated using HM Treasury GDP deflator.</p>
            <p><a href="https://www.gov.uk/government/collections/statistics-school-workforce" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfE</a> — School Workforce in England. Annual statistics from November census.</p>
            <p><a href="https://www.oecd.org/education/education-at-a-glance/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">OECD</a> — Education at a Glance. OECD ranking based on teacher pay relative to other tertiary-educated workers. Experienced teacher pay reflects the top of the main pay range / lower leadership range. NQT salary reflects minimum of the main pay range outside London.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
