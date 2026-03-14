'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'DfE', dataset: 'Apprenticeships and Traineeships Statistics', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/apprenticeships-and-traineeships', date: '2024' },
  { num: 2, name: 'IfATE', dataset: 'Apprenticeship Outcomes Survey', url: 'https://www.instituteforapprenticeships.org/', date: '2024' },
  { num: 3, name: 'Social Mobility Commission', dataset: 'Apprenticeships and Social Mobility', url: 'https://www.gov.uk/government/publications/apprenticeships-and-social-mobility', date: '2024' },
];

const startsValues = [503, 505, 491, 498, 375, 322, 319, 340, 349, 361, 372];
const completionRateValues = [62.4, 63.1, 63.8, 64.2, 58.3, 55.4, 56.8, 57.4, 58.1, 58.8, 59.4];
const level4PlusValues = [8.2, 9.1, 10.4, 12.8, 16.1, 18.4, 21.2, 24.1, 26.8, 29.1, 31.4];
const wagePremiumValues = [4.2, 4.8, 5.1, 5.6, 6.1, 6.4, 7.2, 8.1, 9.4, 10.2, 11.0];

const series1: Series[] = [
  { id: 'starts', label: 'Apprenticeship starts (thousands)', colour: '#2A9D8F', data: startsValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'completion', label: 'Completion rate (%)', colour: '#E63946', data: completionRateValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const series2: Series[] = [
  { id: 'higher', label: 'Level 4+ (Higher/Degree) apprenticeships (%)', colour: '#264653', data: level4PlusValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'wage', label: 'Earnings premium over non-apprentices (%)', colour: '#F4A261', data: wagePremiumValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const annotations1: Annotation[] = [
  { date: new Date(2017, 3, 1), label: '2017: Apprenticeship Levy introduced' },
];

export default function ApprenticeshipQualityPage() {
  return (
    <>
      <TopicNav topic="Apprenticeship Quality" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Education"
          question="Are Apprenticeships Actually Worth Doing?"
          finding={<>Apprenticeship starts have fallen from 503,000 in 2013/14 to 372,000 in 2023/24 — down 26% — despite the introduction of the Apprenticeship Levy in 2017 which was intended to drive growth.<Cite nums={1} /> Completion rates remain at only 59%, and Level 2 apprenticeships — many offering little more than basic job training — still dominate starts despite a shift towards higher-level programmes.<Cite nums={[1, 2]} /></>}
          colour="#2A9D8F"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The apprenticeship programme has been through a decade of policy turbulence. The 2017 Apprenticeship Levy — a 0.5% payroll charge on large employers, intended to fund a doubling of apprenticeship starts — had the paradoxical effect of reducing overall starts while raising their average level. Large employers, required to spend their levy or lose it, directed funds towards higher-level and degree apprenticeships for existing staff rather than creating new entry-level opportunities for young people from disadvantaged backgrounds. SMEs, which account for the majority of traditional apprenticeship employers, saw their levy contributions become inaccessible under the initial design and reduced their recruitment accordingly.<Cite nums={[1, 3]} /></p>
            <p>The quality picture is mixed. Level 4 and above (higher and degree) apprenticeships have grown from 8% to 31% of starts — bringing apprenticeships into fields like law, accountancy, engineering, and nursing that were previously unavailable. This is genuinely positive. But the earnings premium for apprenticeship completers — 11% above comparable non-apprentices — while improving, is lower than for equivalent university graduates.<Cite nums={2} /> More concerning is the completion rate of 59%: four in ten apprentices do not complete their programme, representing both wasted public investment and, for the individuals involved, a qualification gap and often a poor experience. The Social Mobility Commission has noted that disadvantaged young people are underrepresented in higher apprenticeships and overrepresented in lower-quality, lower-paid Level 2 routes — meaning the programme does not yet deliver on its social mobility potential.<Cite nums={3} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-chart1', label: 'Starts & Completions' },
          { id: 'sec-chart2', label: 'Quality & Earnings' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="Annual apprenticeship starts" value="372K" unit="2023/24" direction="down" polarity="up-is-good" changeText="was 503K in 2013/14 · levy reduced overall starts" sparklineData={[503, 505, 491, 498, 375, 322, 319, 340, 349, 361, 372]} source="DfE — Apprenticeships Statistics 2024" href="#sec-chart1" />
            <MetricCard label="Completion rate" value="59.4%" unit="of apprenticeship starts" direction="down" polarity="up-is-good" changeText="was 62.4% in 2013 · 4 in 10 do not complete" sparklineData={[62.4, 63.1, 63.8, 64.2, 58.3, 55.4, 56.8, 57.4, 58.1, 58.8, 59.4]} source="DfE — Apprenticeships Statistics 2024" href="#sec-chart1" />
            <MetricCard label="Level 4+ apprenticeships" value="31.4%" unit="of all starts" direction="up" polarity="up-is-good" changeText="was 8.2% in 2013 · degree apps now a major route" sparklineData={[8.2, 9.1, 10.4, 12.8, 16.1, 18.4, 21.2, 24.1, 26.8, 29.1, 31.4]} source="DfE — Apprenticeships Statistics 2024" href="#sec-chart2" />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Apprenticeship starts and completion rate, England, 2013–2024"
              subtitle="Annual apprenticeship starts (thousands) and completion rate (%). Starts fell sharply with the Apprenticeship Levy introduction in 2017 and have not recovered. Completion rate also declined."
              series={series1}
              annotations={annotations1}
              yLabel="Thousands / Percentage"
              source={{ name: 'DfE', dataset: 'Apprenticeships and Traineeships Statistics', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/apprenticeships-and-traineeships', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Higher-level apprenticeships and earnings premium, 2013–2024"
              subtitle="Level 4 and above (higher/degree) apprenticeships as % of all starts, and earnings premium over non-apprentices (%). Quality rising; levy has driven demand for higher-level programmes."
              series={series2}
              annotations={[]}
              yLabel="Percentage (%)"
              source={{ name: 'IfATE', dataset: 'Apprenticeship Outcomes Survey', url: 'https://www.instituteforapprenticeships.org/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Degree apprenticeships offer debt-free professional routes"
            value="27,000"
            unit="degree apprenticeships started in 2023/24 — up from near zero in 2015"
            description="Degree apprenticeships — which combine university study with workplace training and lead to a full degree — started from near zero following their 2015 introduction and have grown to over 27,000 starts annually across fields including engineering, nursing, law, accountancy, and digital technology. Participants earn a salary throughout, accumulate no tuition debt, and have typical employment rates above 90% on completion. They are available in over 40 occupational routes and at universities across England. For disadvantaged students, they offer a genuinely transformative alternative to conventional debt-funded university study."
            source="Source: DfE — Degree Apprenticeship Statistics 2024. IfATE 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://explore-education-statistics.service.gov.uk/find-statistics/apprenticeships-and-traineeships" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfE — Apprenticeships and Traineeships Statistics</a> — starts, completions, level, sector. Annual.</p>
            <p><a href="https://www.instituteforapprenticeships.org/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">IfATE — Apprenticeship Outcomes Survey</a> — employment outcomes, earnings, satisfaction. Annual.</p>
            <p>Completion rate is the proportion of starts in a given year who complete their programme. Financial year runs August to July for education statistics. Level 2 is roughly equivalent to GCSE; Level 3 to A-level; Level 4+ to HNC/HND and above.</p>
          </div>
        </section>
      </main>
    </>
  );
}
