'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Adult learning participation rate (%), 2010–2024 — Learning and Work Institute
const participationValues = [20.1, 19.8, 19.2, 18.7, 18.1, 17.6, 17.2, 16.8, 16.4, 16.1, 15.9, 15.7, 15.5, 15.4, 15.4];

// Adult Education Budget, real terms £bn (2024 prices), 2010–2024 — ESFA
const aebFundingValues = [4.3, 4.0, 3.7, 3.4, 3.2, 3.0, 2.8, 2.7, 2.6, 2.5, 2.4, 2.3, 2.2, 2.1, 2.1];

// FE enrolments (millions) by level: Level 2 and Level 3, 2015–2024 — DfE ILR
const level2Values = [1.15, 1.10, 1.04, 1.00, 0.95, 0.92, 0.90, 0.88, 0.86, 0.85];
const level3Values = [0.68, 0.65, 0.63, 0.61, 0.60, 0.60, 0.61, 0.63, 0.65, 0.66];

const series1: Series[] = [
  {
    id: 'participation',
    label: 'Adult learning participation (%)',
    colour: '#E63946',
    data: participationValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
  {
    id: 'aeb-funding',
    label: 'AEB funding real terms (£bn)',
    colour: '#264653',
    data: aebFundingValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'level2',
    label: 'Level 2 enrolments (millions)',
    colour: '#F4A261',
    data: level2Values.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'level3',
    label: 'Level 3 enrolments (millions)',
    colour: '#2A9D8F',
    data: level3Values.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2010, 0, 1), label: '2010: Public health grant cuts begin' },
  { date: new Date(2021, 0, 1), label: '2021: Lifetime Skills Guarantee launched' },
];

export default function AdultEducationPage() {
  return (
    <>
      <TopicNav topic="Education & Skills" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Education & Skills"
          question="Are adults actually learning?"
          finding="Adult learning participation has fallen from 20% to 15% since 2010. The Adult Education Budget has been cut by half in real terms. Nine million adults lack basic digital skills, and ESOL waiting lists stretch to two years in some areas."
          colour="#2A9D8F"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England has a quiet crisis in adult education. Since 2010, the Adult Education Budget has been cut by around 50% in real terms, falling from approximately £4.3 billion to £2.1 billion. The consequences are visible in every measure that matters: participation in adult learning has dropped from one in five adults to fewer than one in six, further education enrolments have fallen by over a quarter, and hundreds of community learning centres have closed. The people most affected are those who can least afford it — adults without Level 2 qualifications, those in insecure work, and communities in post-industrial towns where the further education college was often the only route to retraining. Employer investment in training has declined in parallel: the proportion of employers providing training fell from 66% in 2011 to 60% in 2022.</p>
            <p>The digital skills gap compounds the problem. An estimated nine million adults in England lack basic digital skills — the ability to send an email, fill in an online form, or use a search engine safely. As public services, banking, and job applications have moved online, this gap has become a barrier not just to employment but to participation in daily life. ESOL (English for Speakers of Other Languages) provision has been hit particularly hard; waiting lists in London and other major cities stretch to eighteen months or two years. The green transition alone will require an estimated 480,000 workers in insulation, heat pump installation, and renewable energy — skills that barely exist at scale in the current workforce. The gap between what the economy demands and what the adult skills system can deliver continues to widen.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Participation & Funding' },
          { id: 'sec-chart2', label: 'Enrolments' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Adult learning participation"
              value="15.4%"
              unit="2024"
              direction="down"
              polarity="up-is-good"
              changeText="Down from 20.1% in 2010 · 23% decline"
              sparklineData={participationValues.slice(-8)}
              source="Learning and Work Institute · Adult Participation in Learning Survey 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="FE enrolments (all levels)"
              value="2.3M"
              unit="2023/24"
              direction="down"
              polarity="up-is-good"
              changeText="Down from 3.1M in 2015 · 26% decline"
              sparklineData={[3.1, 3.0, 2.85, 2.75, 2.65, 2.55, 2.48, 2.40, 2.35, 2.30]}
              source="DfE · Individualised Learner Record 2023/24"
              href="#sec-chart2"
            />
            <MetricCard
              label="AEB funding (real terms)"
              value="£2.1bn"
              unit="2024"
              direction="down"
              polarity="up-is-good"
              changeText="Down 51% in real terms since 2010 · from £4.3bn"
              sparklineData={aebFundingValues.slice(-8)}
              source="ESFA · Adult Education Budget allocations 2024"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Adult learning participation and AEB funding, England, 2010–2024"
              subtitle="Participation rate (%) and Adult Education Budget in real terms (£bn). Both have fallen steadily since 2010 following repeated funding cuts."
              series={series1}
              annotations={annotations}
              yLabel="Participation (%) / Funding (£bn)"
              source={{ name: 'Learning and Work Institute / ESFA', dataset: 'Adult Participation in Learning Survey; Adult Education Budget allocations', url: 'https://learningandwork.org.uk/resources/research-and-reports/adult-participation-in-learning-survey/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Further education enrolments by level, England, 2015–2024"
              subtitle="Level 2 enrolments (amber) have fallen sharply. Level 3 (green) has seen modest growth since the Lifetime Skills Guarantee launched in 2021."
              series={series2}
              annotations={[{ date: new Date(2021, 0, 1), label: '2021: Lifetime Skills Guarantee' }]}
              yLabel="Enrolments (millions)"
              source={{ name: 'DfE', dataset: 'Individualised Learner Record (ILR)', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/further-education-and-skills', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Lifetime Skills Guarantee and Skills Bootcamps expanding access"
            value="70,000+"
            unit="bootcamp learners since 2020"
            description="The Lifetime Skills Guarantee, introduced in April 2021, funds free Level 3 qualifications for any adult who does not already hold one — covering subjects from engineering to social care. Since its launch, Level 3 enrolments have shown modest growth, reversing years of decline at that level. Skills Bootcamps — intensive 12-to-16-week courses in software development, data analytics, HGV driving, and green construction — have enrolled over 70,000 learners, with employers required to co-invest and offer interviews to completers. Completion-to-employment rates have averaged around 72%."
            source="Source: DfE — Lifetime Skills Guarantee statistics 2024. ESFA — Skills Bootcamps outcomes data 2024."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://learningandwork.org.uk/resources/research-and-reports/adult-participation-in-learning-survey/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Learning and Work Institute — Adult Participation in Learning Survey</a> — annual survey of adult learning participation rates.</p>
            <p><a href="https://explore-education-statistics.service.gov.uk/find-statistics/further-education-and-skills" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfE — Further Education and Skills Statistics (ILR)</a> — annual enrolment data by qualification level.</p>
            <p>AEB funding figures are adjusted for inflation using GDP deflators (2024 prices). They cover the core adult education budget only, not apprenticeships, traineeships, or 16–19 funding.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
