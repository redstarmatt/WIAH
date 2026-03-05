'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface VacancyPoint {
  year: string;
  vacancyPct: number;
}

interface RecruitmentPoint {
  year: string;
  achievedPct: number;
}

interface SubjectPoint {
  subject: string;
  recruitmentPct: number;
}

interface TeacherShortageData {
  national: {
    vacancyRate: {
      timeSeries: VacancyPoint[];
      latestYear: string;
      latestPct: number;
    };
    recruitmentVsTarget: {
      timeSeries: RecruitmentPoint[];
      latestYear: string;
      latestPct: number;
    };
    shortageBySubject: SubjectPoint[];
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function fyToDate(fy: string): Date {
  const start = parseInt(fy.split('/')[0]);
  return new Date(start, 9, 1);
}

function sparkFrom(arr: number[], n = 12) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function TeacherShortagePage() {
  const [data, setData] = useState<TeacherShortageData | null>(null);

  useEffect(() => {
    fetch('/data/teacher-shortage/teacher_shortage.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const vacancySeries: Series[] = data
    ? [{
        id: 'vacancy-rate',
        label: 'Vacancy rate (%)',
        colour: '#E63946',
        data: data.national.vacancyRate.timeSeries.map(d => ({
          date: fyToDate(d.year),
          value: d.vacancyPct,
        })),
      }]
    : [];

  const vacancyAnnotations: Annotation[] = [
    { date: fyToDate('2021/22'), label: '2021/22: Post-COVID surge' },
  ];

  const recruitmentSeries: Series[] = data
    ? [{
        id: 'recruitment-target',
        label: '% of target',
        colour: '#F4A261',
        data: data.national.recruitmentVsTarget.timeSeries.map(d => ({
          date: fyToDate(d.year),
          value: d.achievedPct,
        })),
      }]
    : [];

  // ── Metric values ────────────────────────────────────────────────────────

  const latestVacancy = data?.national.vacancyRate.latestPct ?? null;
  const latestRecruitment = data?.national.recruitmentVsTarget.latestPct ?? null;

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Teacher Shortage" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Teacher Shortage"
          preposition="with"
          question="Is Britain Running Out of Teachers?"
          finding="England missed its secondary school teacher recruitment targets for 10 of 17 subjects in 2022/23. The teacher vacancy rate stands at 3.1% &mdash; the highest since records began. 40% of new teachers leave within five years. Real-terms teacher pay has fallen 11% since 2010."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England&apos;s secondary teacher vacancy rate reached 3.1% in 2022&ndash;23 &mdash; a record high, roughly three times the rate of a decade earlier, translating to around 4,600 empty posts on census day. The shortage is sharpest in maths, physics, chemistry, and computing: ITT recruitment against target ran at 60%, 39%, and 45% respectively for those subjects in 2022/23. Around 40% of newly qualified teachers leave within five years &mdash; up from 30% in 2010 &mdash; driven by average term-time working weeks exceeding 47 hours and real-terms pay falling roughly 10% since 2010. Ten consecutive years of missed recruitment targets in shortage subjects have created a structural pipeline problem that one-year bursaries cannot resolve.</p>
            <p>The consequences fall hardest on pupils in the most deprived schools. Schools managing vacancies use unqualified supply teachers, merge classes, reduce subject options, and scale back intervention programmes &mdash; effects rarely visible in aggregate data but consistently reported by headteachers and inspectors. Geographic inequality sharpens every trend: vacancies concentrate in England&apos;s most deprived local authorities, coastal and rural communities where teacher salaries are inadequate against local housing costs, and parts of London where living costs compound the pay problem despite additional allowances. Better-resourced academy trusts poach candidates from neighbouring schools, dispersing rather than solving the shortage.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-vacancies', label: 'Vacancies' },
          { id: 'sec-recruitment', label: 'Recruitment' },
          { id: 'sec-subjects', label: 'By Subject' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Secondary teacher vacancy rate"
            value={latestVacancy ? latestVacancy.toFixed(1) : '—'}
            unit="%"
            direction="up"
            polarity="up-is-bad"
            changeText="2023 &middot; Highest on record &middot; Physics: 8.2% &middot; Maths: 5.8% &middot; Languages: 5.1%"
            sparklineData={
              data
                ? sparkFrom(data.national.vacancyRate.timeSeries.map(d => d.vacancyPct), 10)
                : []
            }
            source="DfE · School Workforce Census"
            onExpand={() => {}}
          />
          <MetricCard
            label="New teacher training recruitment (% of target)"
            value={latestRecruitment ? latestRecruitment.toFixed(0) : '—'}
            unit="%"
            direction="down"
            polarity="up-is-good"
            changeText="2022/23 &middot; Missed target in 10 of 17 subjects &middot; Physics: 39% &middot; Computing: 45% &middot; Maths: 60%"
            sparklineData={
              data
                ? sparkFrom(data.national.recruitmentVsTarget.timeSeries.map(d => d.achievedPct), 10)
                : []
            }
            source="DfE · Initial Teacher Training Census"
            onExpand={() => {}}
          />
          <MetricCard
            label="Teachers leaving within 5 years (early career attrition)"
            value="40%"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="2023 &middot; Up from 30% in 2010 &middot; Workload and pay cited &middot; Inner London and coastal areas worst affected"
            sparklineData={[30, 31, 32, 32, 33, 34, 35, 36, 38, 40]}
            source="DfE · School Workforce Census"
            onExpand={() => {}}
          />
        </div>
        </ScrollReveal>

        {/* Chart 1: Vacancy rate */}
        <ScrollReveal>
        <section id="sec-vacancies" className="mb-16">
          <LineChart
            title="Secondary teacher vacancy rate, England, 2014–2023"
            subtitle="Teacher vacancies as a percentage of all secondary school teacher posts. Highest rate since records began."
            series={vacancySeries}
            annotations={vacancyAnnotations}
            yLabel="Vacancy rate (%)"
            source={{ name: 'DfE', dataset: 'School Workforce Census' }}
          />
        </section>
        </ScrollReveal>

        {/* Chart 2: Recruitment vs target */}
        <ScrollReveal>
        <section id="sec-recruitment" className="mb-16">
          <LineChart
            title="Teacher training recruitment as % of target, 2014–2023"
            subtitle="Trainees starting postgraduate initial teacher training as a percentage of the DfE recruitment target."
            series={recruitmentSeries}
            yLabel="% of target"
            source={{ name: 'DfE', dataset: 'Initial Teacher Training Census' }}
          />
        </section>
        </ScrollReveal>

        {/* Chart 3: By subject (CSS bar chart) */}
        <ScrollReveal>
        <section id="sec-subjects" className="mb-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-wiah-black mb-2">Teacher training recruitment by subject, 2022/23</h2>
            <p className="text-sm text-wiah-mid">Trainees starting as % of DfE target. Subjects below 100% are in shortage.</p>
          </div>
          <div className="space-y-4">
            {data?.national.shortageBySubject.map((item, idx) => {
              const widthPct = Math.min((item.recruitmentPct / 100) * 100, 100);
              const isDeficit = item.recruitmentPct < 100;
              return (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-32 text-sm font-medium text-wiah-black">{item.subject}</div>
                  <div className="flex-1 flex items-center gap-3">
                    <div className="h-8 bg-wiah-light rounded flex-1 relative overflow-hidden">
                      <div
                        style={{
                          width: `${widthPct}%`,
                          backgroundColor: isDeficit ? '#E63946' : '#2A9D8F',
                        }}
                        className="h-full transition-all duration-300"
                      />
                    </div>
                    <div className="w-16 text-right text-sm font-mono text-wiah-black">{item.recruitmentPct}%</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
        <PositiveCallout
          title="What&apos;s being tried"
          value="&pound;10,000"
          unit="tax-free bonus for physics, maths, and chemistry graduates who train to teach in shortage subjects"
          description="The government introduced bursaries of up to &pound;10,000 tax-free for graduates who train to teach maths, physics, chemistry, and computing in secondary schools &mdash; the highest in the developed world for teacher recruitment bonuses. The Early Career Framework (ECF), introduced in 2021, structured the first two years of teaching with mentoring, coaching, and reduced timetable; evidence shows improved two-year retention rates. The STEM Ambassador programme has engaged 38,000 volunteers to demonstrate science and technology careers in schools. Teach First &mdash; which places high-achieving graduates in schools in disadvantaged areas &mdash; has trained over 15,000 teachers since 2003, with 80% retention above the profession average."
          source="Source: DfE &mdash; School Workforce Census 2023; DfE &mdash; Initial Teacher Training Census 2022/23."
        />
        </ScrollReveal>
      </main>
    </>
  );
}
