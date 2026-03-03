'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import SiteName from '@/components/SiteName';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import MetricDetailModal from '@/components/MetricDetailModal';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface AbsencePoint {
  year: string;
  overallAbsencePct: number;
  persistentAbsencePct: number;
}

interface GapIndexPoint {
  year: string;
  index: number;
}

interface Attainment8Point {
  year: string;
  disadvantagedAtt8: number;
  otherAtt8: number;
  disadvantagedGrade5Pct: number;
  otherGrade5Pct: number;
  disadvantagedGrade4Pct: number;
  otherGrade4Pct: number;
}

interface EhcpCaseloadPoint {
  year: number;
  total: number;
}

interface EhcpTimeliness {
  year: number;
  withinWeeks20Pct: number;
  newEhcps?: number;
}

interface VacancyPoint {
  period: string;
  vacancyRate: number;
  vacancies: number | null;
}

interface PtrPoint {
  period: string;
  pupilTeacherRatio: number;
  pupilsFte: number | null;
  teachersFte: number | null;
}

interface TeacherData {
  vacancies: { timeSeries: VacancyPoint[]; latest: VacancyPoint | null };
  pupilTeacherRatio: { timeSeries: PtrPoint[]; latest: PtrPoint | null };
}

interface GradEarningsPoint {
  taxYear: string;
  median1yr: number | null;
  median3yr: number | null;
  median5yr: number | null;
  median10yr: number | null;
}

interface GradEmploymentPoint {
  taxYear: string;
  employment1yr: number | null;
  employment5yr: number | null;
}

interface GradSubject {
  subject: string;
  medianEarnings5yr: number;
  employmentPct: number | null;
  graduates: number;
}

interface GradData {
  earnings: { timeSeries: GradEarningsPoint[] };
  employment: { timeSeries: GradEmploymentPoint[] };
  bySubject: GradSubject[];
  latestTaxYear: string;
}

interface EducationData {
  national: {
    absence: { timeSeries: AbsencePoint[] };
    send: {
      ehcpCaseload: EhcpCaseloadPoint[];
      timeliness: EhcpTimeliness[];
    };
    attainment: {
      gapIndex: GapIndexPoint[];
      attainment8: Attainment8Point[];
    };
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
  };
}

interface FundingPoint {
  year: number;
  nominal: number;
  real2024: number;
}

interface PisaCountry {
  country: string;
  reading: number;
  maths: number | null;
  science: number;
}

interface SchoolFundingData {
  fundingPerPupil: FundingPoint[];
  pisaResults: PisaCountry[];
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string; notes?: string }[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function academicYearToDate(s: string): Date {
  // "2018-19" → Jan 2019 (end of academic year)
  const parts = s.split('-');
  if (parts.length === 2 && parts[1].length === 2) {
    const century = parseInt(parts[0].slice(0, 2));
    const endYear = century * 100 + parseInt(parts[1]);
    return new Date(endYear, 0, 1);
  }
  return new Date(parseInt(parts[0]), 0, 1);
}

function calendarYearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function fyToDate(fy: string): Date {
  // "2010/11" → Oct 2010 (midpoint of academic year)
  const start = parseInt(fy.split('/')[0]);
  return new Date(start, 9, 1);
}

function sparkFrom(arr: number[], n = 12) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function EducationPage() {
  const [data, setData] = useState<EducationData | null>(null);
  const [teacherData, setTeacherData] = useState<TeacherData | null>(null);
  const [gradData, setGradData] = useState<GradData | null>(null);
  const [fundingData, setFundingData] = useState<SchoolFundingData | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data/education/education.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
    fetch('/data/education/teacher_workforce.json')
      .then(r => r.json())
      .then(setTeacherData)
      .catch(console.error);
    fetch('/data/education/graduate_outcomes.json')
      .then(r => r.json())
      .then(setGradData)
      .catch(console.error);
    fetch('/data/education/school_funding.json')
      .then(r => r.json())
      .then(setFundingData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  // 1. Persistent absence + overall absence (dual series)
  const absenceSeries: Series[] = data
    ? [
        {
          id: 'persistent-absence',
          label: 'Persistent absence (10%+ sessions)',
          colour: '#E63946',
          data: data.national.absence.timeSeries.map(d => ({
            date: academicYearToDate(d.year),
            value: d.persistentAbsencePct,
          })),
        },
        {
          id: 'overall-absence',
          label: 'Overall absence rate',
          colour: '#0D1117',
          data: data.national.absence.timeSeries
            .filter(d => d.overallAbsencePct > 0)
            .map(d => ({
              date: academicYearToDate(d.year),
              value: d.overallAbsencePct,
            })),
        },
      ]
    : [];

  const absenceAnnotations: Annotation[] = [
    { date: new Date(2016, 0), label: '2015-16: 10% threshold' },
    { date: new Date(2020, 2), label: '2020: COVID-19' },
  ];

  // 2. EHCP caseload
  const ehcpCaseloadSeries: Series[] = data
    ? [{
        id: 'ehcp-caseload',
        label: 'EHCPs maintained',
        data: data.national.send.ehcpCaseload.map(d => ({
          date: calendarYearToDate(d.year),
          value: d.total,
        })),
      }]
    : [];

  // 3. EHCP timeliness
  const ehcpTimelinessSeries: Series[] = data
    ? [{
        id: 'ehcp-timeliness',
        label: '% issued within 20 weeks',
        data: data.national.send.timeliness.map(d => ({
          date: calendarYearToDate(d.year),
          value: d.withinWeeks20Pct,
        })),
      }]
    : [];

  // 3b. New EHCP applications volume
  const ehcpNewAppsSeries: Series[] = data
    ? [{
        id: 'ehcp-new',
        label: 'New EHCPs issued',
        colour: '#E63946',
        data: data.national.send.timeliness
          .filter(d => d.newEhcps != null && d.newEhcps > 0)
          .map(d => ({
            date: calendarYearToDate(d.year),
            value: d.newEhcps!,
          })),
      }]
    : [];

  // 4. Disadvantage gap index
  const gapIndexSeries: Series[] = data
    ? [{
        id: 'gap-index',
        label: 'Disadvantage gap index',
        data: data.national.attainment.gapIndex.map(d => ({
          date: academicYearToDate(d.year),
          value: d.index,
        })),
      }]
    : [];

  const gapAnnotations: Annotation[] = [
    { date: new Date(2020, 0), label: '2020: COVID-19' },
  ];

  // 5. Attainment 8 gap (dual series)
  const att8Series: Series[] = data
    ? [
        {
          id: 'att8-other',
          label: 'All other pupils',
          colour: '#0D1117',
          data: data.national.attainment.attainment8.map(d => ({
            date: academicYearToDate(d.year),
            value: d.otherAtt8,
          })),
        },
        {
          id: 'att8-disadvantaged',
          label: 'Disadvantaged pupils',
          colour: '#E63946',
          data: data.national.attainment.attainment8.map(d => ({
            date: academicYearToDate(d.year),
            value: d.disadvantagedAtt8,
          })),
        },
      ]
    : [];

  // 6. Teacher vacancy rate
  const vacancySeries: Series[] = teacherData
    ? [{
        id: 'vacancy-rate',
        label: 'Vacancy rate (%)',
        colour: '#E63946',
        data: teacherData.vacancies.timeSeries.map(d => ({
          date: fyToDate(d.period),
          value: d.vacancyRate,
        })),
      }]
    : [];

  // 7. Pupil-teacher ratio
  const ptrSeries: Series[] = teacherData
    ? [{
        id: 'ptr',
        label: 'Pupils per teacher (FTE)',
        colour: '#264653',
        data: teacherData.pupilTeacherRatio.timeSeries.map(d => ({
          date: fyToDate(d.period),
          value: d.pupilTeacherRatio,
        })),
      }]
    : [];

  // 8. Graduate median earnings (1yr, 3yr, 5yr post-graduation)
  function taxYearToDate(ty: string): Date {
    const start = parseInt(ty.split('/')[0]);
    return new Date(start, 6, 1); // July of start year
  }

  const gradEarningsSeries: Series[] = gradData
    ? [
        { id: 'earn-1yr', label: '1 year after graduation', colour: '#F4A261',
          data: gradData.earnings.timeSeries.filter(d => d.median1yr).map(d => ({ date: taxYearToDate(d.taxYear), value: d.median1yr! })) },
        { id: 'earn-3yr', label: '3 years after', colour: '#264653',
          data: gradData.earnings.timeSeries.filter(d => d.median3yr).map(d => ({ date: taxYearToDate(d.taxYear), value: d.median3yr! })) },
        { id: 'earn-5yr', label: '5 years after', colour: '#2A9D8F',
          data: gradData.earnings.timeSeries.filter(d => d.median5yr).map(d => ({ date: taxYearToDate(d.taxYear), value: d.median5yr! })) },
      ]
    : [];

  // 9. Graduate employment rate
  const gradEmploymentSeries: Series[] = gradData
    ? [
        { id: 'emp-1yr', label: '1 year after graduation', colour: '#F4A261',
          data: gradData.employment.timeSeries.filter(d => d.employment1yr).map(d => ({ date: taxYearToDate(d.taxYear), value: d.employment1yr! })) },
        { id: 'emp-5yr', label: '5 years after', colour: '#2A9D8F',
          data: gradData.employment.timeSeries.filter(d => d.employment5yr).map(d => ({ date: taxYearToDate(d.taxYear), value: d.employment5yr! })) },
      ]
    : [];

  // 10. School funding — real and nominal series
  const fundingRealSeries: Series[] = fundingData
    ? [
        {
          id: 'funding-real',
          label: 'Real terms (2024 prices)',
          colour: '#E63946',
          data: fundingData.fundingPerPupil.map(d => ({
            date: calendarYearToDate(d.year),
            value: d.real2024,
          })),
        },
        {
          id: 'funding-nominal',
          label: 'Nominal',
          colour: '#6B7280',
          data: fundingData.fundingPerPupil.map(d => ({
            date: calendarYearToDate(d.year),
            value: d.nominal,
          })),
        },
      ]
    : [];

  const fundingAnnotations: Annotation[] = [
    { date: new Date(2017, 0), label: 'Real-terms low point' },
    { date: new Date(2024, 0), label: 'Recovery but uneven' },
  ];

  // ── Metric values ────────────────────────────────────────────────────────

  const latestAbsence = data?.national.absence.timeSeries.at(-1);
  const preCovidAbsence = data?.national.absence.timeSeries.find(
    d => d.year === '2018-19'
  );

  const latestGap = data?.national.attainment.gapIndex.at(-1);
  const preCovidGap = data?.national.attainment.gapIndex.find(
    d => d.year === '2019-20'
  );

  const latestEhcp = data?.national.send.ehcpCaseload.at(-1);
  const firstEhcp = data?.national.send.ehcpCaseload[0];


  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      {/* Sticky nav */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-wiah-border px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/"><SiteName size="nav" /></Link>
          <span className="text-wiah-mid text-sm font-mono">Education</span>
          <Link href="/" className="text-sm text-wiah-blue hover:underline">&larr; All topics</Link>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Education"
          question="What's Actually Happening in Schools?"
          finding={
            latestAbsence && preCovidAbsence && latestEhcp && firstEhcp && latestGap
              ? `${latestAbsence.persistentAbsencePct.toFixed(0)}% of pupils are persistently absent — up from ${preCovidAbsence.persistentAbsencePct.toFixed(0)}% before the pandemic. The SEND system is overwhelmed: ${(latestEhcp.total / 1000).toFixed(0)}k children now have EHCPs, up from ${(firstEhcp.total / 1000).toFixed(0)}k in ${firstEhcp.year}, and fewer than half are issued within the 20-week deadline. The disadvantage gap index stands at ${latestGap.index.toFixed(2)} — progress made over the last decade was wiped out by COVID and hasn't recovered.`
              : 'Persistent absence has doubled since before the pandemic. The SEND system is overwhelmed and the attainment gap has widened.'
          }
          colour="#2A9D8F"
        />

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-attainment', label: 'Attainment' },
          { id: 'sec-send', label: 'SEND' },
          { id: 'sec-absence', label: 'Absence' },
          { id: 'sec-workforce', label: 'Workforce' },
          { id: 'sec-school-funding', label: 'School Funding' },
          { id: 'sec-pisa', label: 'International Comparison' },
          { id: 'sec-context', label: 'Context' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Persistent absence"
            value={latestAbsence ? latestAbsence.persistentAbsencePct.toFixed(1) : '—'}
            unit="%"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestAbsence && preCovidAbsence
                ? `Up from ${preCovidAbsence.persistentAbsencePct}% in 2018-19`
                : 'Loading…'
            }
            sparklineData={
              data
                ? sparkFrom(data.national.absence.timeSeries.map(d => d.persistentAbsencePct))
                : []
            }
            source="DfE · Pupil absence 2023/24"
            baseline="20% of pupils now persistently absent — double the 10.5% rate before the pandemic"
            onExpand={absenceSeries.length > 0 ? () => setExpanded('absence') : undefined}
          />
          <MetricCard
            label="EHCPs maintained"
            value={latestEhcp ? `${(latestEhcp.total / 1000).toFixed(0)}K` : '—'}
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestEhcp && firstEhcp
                ? `+${Math.round(((latestEhcp.total - firstEhcp.total) / firstEhcp.total) * 100)}% since ${firstEhcp.year}`
                : 'Loading…'
            }
            sparklineData={
              data
                ? sparkFrom(data.national.send.ehcpCaseload.map(d => d.total))
                : []
            }
            source="DfE · SEN2 return, Jan 2025"
            baseline="Families wait an average of 38 weeks — nearly 10 months — for an EHCP assessment"
            onExpand={ehcpCaseloadSeries.length > 0 ? () => setExpanded('ehcp') : undefined}
          />
          <MetricCard
            label="Disadvantage gap index"
            value={latestGap ? latestGap.index.toFixed(2) : '—'}
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestGap && preCovidGap
                ? `Up from ${preCovidGap.index} in 2019-20 · Higher = wider gap`
                : 'Higher = wider attainment gap'
            }
            sparklineData={
              data
                ? sparkFrom(data.national.attainment.gapIndex.map(d => d.index))
                : []
            }
            source="DfE · KS4 performance 2024/25"
            baseline="By age 16, children from poorer families are 18 months behind their better-off peers"
            onExpand={gapIndexSeries.length > 0 ? () => setExpanded('gap') : undefined}
          />
        </div>
        </ScrollReveal>

        {/* Chart 1: Persistent absence */}
        <div id="sec-absence">
        {absenceSeries.length > 0 ? (
          <LineChart
            title="Pupil absence rates, 2006–2024"
            subtitle="Overall absence and persistent absence (10%+ sessions missed), England."
            series={absenceSeries}
            annotations={absenceAnnotations}
            yLabel="Percent"
            source={{
              name: 'Department for Education',
              dataset: 'Pupil absence in schools in England, 2023/24',
              frequency: 'annual',
              url: 'https://explore-education-statistics.service.gov.uk/find-statistics/pupil-absence-in-schools-in-england',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        </div>{/* end sec-absence */}

        {/* Chart 2: EHCP caseload growth */}
        <div id="sec-send">
        {ehcpCaseloadSeries.length > 0 ? (
          <LineChart
            title="Education, health and care plans, 2015–2025"
            subtitle="Total EHCPs maintained by local authorities in England, January census."
            series={ehcpCaseloadSeries}
            yLabel="Plans"
            source={{
              name: 'Department for Education',
              dataset: 'Education, health and care plans, SEN2 return',
              frequency: 'annual',
              url: 'https://explore-education-statistics.service.gov.uk/find-statistics/education-health-and-care-plans',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Chart 3: EHCP timeliness */}
        {ehcpTimelinessSeries.length > 0 ? (
          <LineChart
            title="EHCP 20-week timeliness, 2014–2023"
            subtitle="Percentage of new EHCPs issued within the 20-week statutory deadline."
            series={ehcpTimelinessSeries}
            yLabel="Percent"
            source={{
              name: 'Department for Education',
              dataset: 'Education, health and care plans, 2025',
              frequency: 'annual',
              url: 'https://explore-education-statistics.service.gov.uk/find-statistics/education-health-and-care-plans',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Chart 3b: New EHCP applications volume */}
        {ehcpNewAppsSeries.length > 0 ? (
          <LineChart
            title="New EHCPs issued per year, 2014–2023"
            subtitle="Number of new Education, Health and Care Plans finalised each calendar year, England."
            series={ehcpNewAppsSeries}
            yLabel="New EHCPs"
            source={{
              name: 'Department for Education',
              dataset: 'Education, health and care plans, SEN2 return',
              frequency: 'annual',
              url: 'https://explore-education-statistics.service.gov.uk/find-statistics/education-health-and-care-plans',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        </div>{/* end sec-send */}

        {/* Chart 4: Disadvantage gap index */}
        <div id="sec-attainment">
        {gapIndexSeries.length > 0 ? (
          <LineChart
            title="Disadvantage gap index, 2010–2025"
            subtitle="Composite measure of the GCSE attainment gap between disadvantaged pupils and all others. Lower = smaller gap."
            series={gapIndexSeries}
            annotations={gapAnnotations}
            yLabel="Index"
            source={{
              name: 'Department for Education',
              dataset: 'Key stage 4 performance, 2024/25',
              frequency: 'annual',
              url: 'https://explore-education-statistics.service.gov.uk/find-statistics/key-stage-4-performance',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Chart 5: Attainment 8 gap */}
        {att8Series.length > 0 ? (
          <LineChart
            title="Attainment 8 score by disadvantage, 2018–2023"
            subtitle="Average Attainment 8 score for disadvantaged vs all other pupils, England."
            series={att8Series}
            yLabel="Score"
            source={{
              name: 'Department for Education',
              dataset: 'Key stage 4 performance: national characteristics',
              frequency: 'annual',
              url: 'https://explore-education-statistics.service.gov.uk/find-statistics/key-stage-4-performance',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Inline table: GCSE pass rates by disadvantage (Grade 5+ and Grade 4+) */}
        {data && data.national.attainment.attainment8.length > 0 && (
          <section className="mb-12">
            <h3 className="text-lg font-bold text-wiah-black mb-1">
              GCSE English and maths pass rates by disadvantage
            </h3>
            <p className="text-sm text-wiah-mid font-mono mb-6">
              Percentage achieving grade 5+ (strong pass) and grade 4+ (standard pass) in English and maths.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-wiah-border">
                    <th className="text-left py-2 pr-3 font-mono text-xs text-wiah-mid">Year</th>
                    <th className="text-right py-2 px-2 font-mono text-xs text-wiah-mid" colSpan={2}>Grade 5+ (strong pass)</th>
                    <th className="text-right py-2 px-2 font-mono text-xs text-wiah-mid" colSpan={2}>Grade 4+ (standard pass)</th>
                  </tr>
                  <tr className="border-b border-wiah-border/50">
                    <th className="py-1 pr-3"></th>
                    <th className="py-1 px-2 font-mono text-[10px] text-wiah-mid text-right">Other</th>
                    <th className="py-1 px-2 font-mono text-[10px] text-right" style={{ color: '#E63946' }}>Disadv.</th>
                    <th className="py-1 px-2 font-mono text-[10px] text-wiah-mid text-right">Other</th>
                    <th className="py-1 px-2 font-mono text-[10px] text-right" style={{ color: '#E63946' }}>Disadv.</th>
                  </tr>
                </thead>
                <tbody>
                  {data.national.attainment.attainment8.map(row => (
                    <tr key={row.year} className="border-b border-wiah-border/50 hover:bg-wiah-light/50">
                      <td className="py-2 pr-3 font-mono text-sm font-bold">{row.year}</td>
                      <td className="py-2 px-2 font-mono text-sm text-right">{row.otherGrade5Pct}%</td>
                      <td className="py-2 px-2 font-mono text-sm text-right font-bold" style={{ color: '#E63946' }}>{row.disadvantagedGrade5Pct}%</td>
                      <td className="py-2 px-2 font-mono text-sm text-right">{row.otherGrade4Pct}%</td>
                      <td className="py-2 px-2 font-mono text-sm text-right font-bold" style={{ color: '#E63946' }}>{row.disadvantagedGrade4Pct}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="font-mono text-[11px] text-wiah-mid mt-3">
              <a
                href="https://explore-education-statistics.service.gov.uk/find-statistics/key-stage-4-performance"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Source: Department for Education, Key stage 4 performance: national characteristics
              </a>
            </p>
          </section>
        )}

        </div>{/* end sec-attainment */}

        {/* Chart 6: Teacher vacancy rate */}
        <div id="sec-workforce">
        {vacancySeries.length > 0 ? (
          <LineChart
            title="Teacher vacancy rate, 2010–2025"
            subtitle="Advertised vacancies as a percentage of teachers in post, state-funded schools, England."
            series={vacancySeries}
            yLabel="Percent"
            annotations={[
              { date: new Date(2020, 2), label: '2020: COVID-19' },
            ]}
            source={{
              name: 'Department for Education',
              dataset: 'School Workforce in England — Teacher Vacancies',
              frequency: 'annual',
              url: 'https://explore-education-statistics.service.gov.uk/find-statistics/school-workforce-in-england',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Chart 7: Pupil-teacher ratio */}
        {ptrSeries.length > 0 ? (
          <LineChart
            title="Pupil-teacher ratio, 2010–2025"
            subtitle="FTE pupils per FTE teacher (qualified + unqualified), state-funded schools, England."
            series={ptrSeries}
            yLabel="Pupils per teacher"
            source={{
              name: 'Department for Education',
              dataset: 'School Workforce in England — Pupil-Teacher Ratios',
              frequency: 'annual',
              url: 'https://explore-education-statistics.service.gov.uk/find-statistics/school-workforce-in-england',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Chart 8: Median graduate earnings */}
        {gradEarningsSeries.length > 0 ? (
          <LineChart
            title="Median graduate earnings by years after graduation, 2016–2023"
            subtitle="Median annualised earnings (£, nominal) for UK-domiciled first degree graduates, England."
            series={gradEarningsSeries}
            yLabel="Median earnings (£)"
            source={{
              name: 'Department for Education',
              dataset: 'LEO Graduate and Postgraduate Outcomes',
              frequency: 'annual',
              url: 'https://explore-education-statistics.service.gov.uk/find-statistics/leo-graduate-and-postgraduate-outcomes',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Chart 9: Graduate employment rate */}
        {gradEmploymentSeries.length > 0 ? (
          <LineChart
            title="Sustained graduate employment rate, 2016–2023"
            subtitle="Share of graduates in sustained employment or further study (%), England."
            series={gradEmploymentSeries}
            yLabel="Employment rate (%)"
            source={{
              name: 'Department for Education',
              dataset: 'LEO Graduate and Postgraduate Outcomes',
              frequency: 'annual',
              url: 'https://explore-education-statistics.service.gov.uk/find-statistics/leo-graduate-and-postgraduate-outcomes',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Chart 10: Graduate earnings by subject */}
        {gradData && gradData.bySubject.length > 0 && (
          <section className="mb-12">
            <h3 className="text-lg font-bold text-wiah-black mb-1">
              Graduate earnings by subject, 5 years after graduation
            </h3>
            <p className="text-sm text-wiah-mid mb-4">
              Median annualised earnings (£, nominal) for first degree graduates, England.
              Latest cohort: tax year {gradData.bySubject[0] ? gradData.latestTaxYear : ''}.
            </p>
            <div className="space-y-1">
              {gradData.bySubject.map((s, i) => {
                const maxEarn = gradData.bySubject[0]?.medianEarnings5yr ?? 1;
                const pct = (s.medianEarnings5yr / maxEarn) * 100;
                const barColour =
                  s.medianEarnings5yr >= 40000
                    ? 'bg-[#2A9D8F]'
                    : s.medianEarnings5yr >= 28000
                    ? 'bg-[#F4A261]'
                    : 'bg-[#E63946]';
                return (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <span className="w-48 text-right text-wiah-black truncate flex-shrink-0">
                      {s.subject}
                    </span>
                    <div className="flex-1 bg-gray-100 rounded h-5 relative">
                      <div
                        className={`${barColour} h-5 rounded`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="font-mono text-wiah-black w-16 text-right flex-shrink-0">
                      £{s.medianEarnings5yr.toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="font-mono text-[11px] text-wiah-mid mt-3">
              Source: DfE — LEO Graduate and Postgraduate Outcomes (annual).{' '}
              <a
                href="https://explore-education-statistics.service.gov.uk/find-statistics/leo-graduate-and-postgraduate-outcomes"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-wiah-blue"
              >
                Dataset ↗
              </a>
            </p>
          </section>
        )}

        </div>{/* end sec-workforce */}

        {/* ── School Funding section ─────────────────────────────────────── */}
        <div id="sec-school-funding">
          <ScrollReveal>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-wiah-black mb-2">School Funding</h2>
              <p className="text-base text-wiah-mid leading-[1.7] max-w-2xl">
                Revenue funding per pupil fell 14% in real terms between 2009 and 2017 before
                recovering. In nominal terms spending looks like it has risen substantially — but
                inflation tells a different story.
              </p>
            </div>
          </ScrollReveal>

          {fundingRealSeries.length > 0 ? (
            <LineChart
              title="School funding per pupil, England, 2009–2024"
              subtitle="Revenue funding per pupil in real terms (2024 prices). Funding fell 14% in real terms between 2009 and 2017 before recovering."
              series={fundingRealSeries}
              annotations={fundingAnnotations}
              yLabel="£ per pupil"
              source={{
                name: 'DfE',
                dataset: 'Schools block funding allocations',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/publications/national-funding-formula-tables-for-schools-and-high-needs',
              }}
            />
          ) : (
            <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
          )}
        </div>{/* end sec-school-funding */}

        {/* ── PISA International Comparison section ─────────────────────── */}
        <div id="sec-pisa">
          <ScrollReveal>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-wiah-black mb-2">International Comparison</h2>
              <p className="text-base text-wiah-mid leading-[1.7] max-w-2xl">
                How does the UK compare internationally? PISA 2022 tested 15-year-olds across
                OECD member countries in reading, mathematics, and science.
              </p>
            </div>
          </ScrollReveal>

          {fundingData && fundingData.pisaResults.length > 0 ? (
            <section className="mb-12">
              <h3 className="text-lg font-bold text-wiah-black mb-1">
                PISA 2022: Reading, maths and science scores by country
              </h3>
              <p className="text-sm text-wiah-mid font-mono mb-4">
                UK scores above OECD average across all three subjects, particularly in science (ranked 11th).
              </p>

              {/* Legend */}
              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: '#264653' }} />
                  <span className="font-mono text-xs text-wiah-mid">Reading</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: '#F4A261' }} />
                  <span className="font-mono text-xs text-wiah-mid">Maths</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: '#2A9D8F' }} />
                  <span className="font-mono text-xs text-wiah-mid">Science</span>
                </div>
              </div>

              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-wiah-border">
                      <th className="text-left py-2 pr-3 font-mono text-xs text-wiah-mid">Country</th>
                      <th className="text-right py-2 px-2 font-mono text-xs text-wiah-mid" style={{ color: '#264653' }}>Reading</th>
                      <th className="text-right py-2 px-2 font-mono text-xs text-wiah-mid" style={{ color: '#F4A261' }}>Maths</th>
                      <th className="text-right py-2 pl-2 font-mono text-xs text-wiah-mid" style={{ color: '#2A9D8F' }}>Science</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fundingData.pisaResults
                      .slice()
                      .sort((a, b) => b.science - a.science)
                      .map(row => (
                        <tr
                          key={row.country}
                          className={`border-b border-wiah-border/50 ${
                            row.country === 'United Kingdom'
                              ? 'bg-wiah-light font-bold'
                              : row.country === 'OECD Average'
                              ? 'bg-wiah-border/20 italic'
                              : 'hover:bg-wiah-light/50'
                          }`}
                        >
                          <td className="py-2 pr-3 font-mono text-sm">{row.country}</td>
                          <td className="py-2 px-2 font-mono text-sm text-right">{row.reading}</td>
                          <td className="py-2 px-2 font-mono text-sm text-right">{row.maths ?? '—'}</td>
                          <td className="py-2 pl-2 font-mono text-sm text-right">{row.science}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              <p className="font-mono text-[11px] text-wiah-mid mt-2">
                <a
                  href="https://www.oecd.org/pisa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Source: OECD, Programme for International Student Assessment (PISA) 2022, triennial.
                </a>
              </p>
            </section>
          ) : (
            <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
          )}
        </div>{/* end sec-pisa */}

        {/* Positive story */}
        <ScrollReveal>
        <PositiveCallout
          title="What's improving"
          value="+21%"
          description="Median graduate earnings five years after graduation have risen from £25,900 to £31,400 over seven years. More than 86% of graduates are in sustained employment or further study, a rate that has remained stable even through the pandemic."
          source="Source: DfE — LEO Graduate and Postgraduate Outcomes, tax year 2022/23."
        />
        </ScrollReveal>

        {/* Context */}
        <section id="sec-context" className="max-w-2xl mt-8 mb-12">
          <h2 className="text-xl font-bold text-wiah-black mb-4">What&apos;s driving this</h2>
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Persistent absence has roughly doubled since before the pandemic. Before COVID-19,
              about 1 in 9 pupils missed 10% or more of school. By 2023-24, it was 1 in 5.
              The causes are complex: anxiety, long COVID, disengagement, and a shift in social
              norms around attendance. Absence is highest among disadvantaged pupils, widening
              the attainment gap further.
            </p>
            <p>
              The SEND system is under extraordinary pressure. The number of children with
              Education, Health and Care Plans has nearly tripled in a decade, from 240,000
              in 2015 to over 630,000 in 2025. Local authorities cannot keep up: fewer than
              half of new EHCPs are issued within the 20-week statutory deadline. SEND
              tribunal appeals have surged, and families win in almost every case — suggesting
              that initial decisions to refuse support are routinely wrong.
            </p>
            <p>
              The attainment gap between disadvantaged pupils and their peers narrowed
              steadily through the 2010s. COVID-19 reversed that progress. The disadvantage
              gap index has risen every year since 2020, and in 2024-25 stands at its highest
              level in over a decade. In concrete terms: just 25% of disadvantaged pupils
              achieve grade 5+ in English and maths, compared with 52% of all other pupils.
            </p>
            <p>
              School funding fell sharply in real terms between 2009 and 2017. Nominal figures
              disguise a sustained squeeze: per-pupil revenue funding lost over £1,300 in
              real value during that period. The recovery since 2017 has brought nominal
              spending to record highs, but the legacy of the squeeze — in deferred maintenance,
              reduced support staff, and narrowed curricula — takes years to unwind.
            </p>
            <p>
              These three crises are interconnected. Children who are persistently absent
              fall behind. Children with unmet SEND needs disengage from school. Disadvantaged
              children are disproportionately affected by both.
            </p>
          </div>
        </section>

        {/* Sources */}
        <section className="border-t border-wiah-border pt-8">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; methodology</h2>
          <ul className="space-y-2 font-mono text-xs text-wiah-mid">
            {data?.metadata.sources.map((src, i) => (
              <li key={i}>
                <a
                  href={src.url}
                  className="underline hover:text-wiah-blue"
                  target="_blank"
                  rel="noreferrer"
                >
                  {src.name} &mdash; {src.dataset} ({src.frequency})
                </a>
              </li>
            ))}
            {teacherData && (
              <li>
                <a
                  href="https://explore-education-statistics.service.gov.uk/find-statistics/school-workforce-in-england"
                  className="underline hover:text-wiah-blue"
                  target="_blank"
                  rel="noreferrer"
                >
                  DfE &mdash; School Workforce in England: Vacancies &amp; Pupil-Teacher Ratios (annual)
                </a>
              </li>
            )}
            {gradData && (
              <li>
                <a
                  href="https://explore-education-statistics.service.gov.uk/find-statistics/leo-graduate-and-postgraduate-outcomes"
                  className="underline hover:text-wiah-blue"
                  target="_blank"
                  rel="noreferrer"
                >
                  DfE &mdash; LEO Graduate and Postgraduate Outcomes: Earnings &amp; Employment (annual)
                </a>
              </li>
            )}
            {fundingData && fundingData.metadata.sources.map((src, i) => (
              <li key={`funding-${i}`}>
                <a
                  href={src.url}
                  className="underline hover:text-wiah-blue"
                  target="_blank"
                  rel="noreferrer"
                >
                  {src.name} &mdash; {src.dataset} ({src.frequency})
                </a>
              </li>
            ))}
          </ul>
          <p className="font-mono text-xs text-wiah-mid mt-4">
            Persistent absence defined as missing 10%+ of possible sessions (threshold changed
            from 15% in 2015/16). Disadvantage gap index is a composite KS4 measure where lower
            values indicate a smaller gap. Attainment 8 averages across 8 GCSE-level qualifications.
            2019/20 and 2020/21 results based on centre/teacher assessed grades. EHCP caseload from
            annual SEN2 returns (January census); 2023 collection changed from aggregate to person-level.
            School funding per pupil figures are revenue allocations deflated using the GDP deflator
            to 2024 prices. PISA scores are for 15-year-olds tested in 2022; the UK figure combines
            England, Scotland, Wales and Northern Ireland.
          </p>
          <p className="font-mono text-xs text-wiah-mid mt-4">
            Data updated automatically via GitHub Actions. Last pipeline run:{' '}
            {new Date().toISOString().slice(0, 10)}.
          </p>
        </section>
      </main>

      {/* Expanded metric modals */}
      {expanded === 'absence' && (
        <MetricDetailModal
          title="Persistent absence, 2006–2024"
          subtitle="Percentage of pupils missing 10% or more of possible school sessions, England."
          series={absenceSeries}
          annotations={absenceAnnotations}
          yLabel="Percent"
          source={{
            name: 'Department for Education',
            dataset: 'Pupil absence in schools in England, 2023/24',
            frequency: 'annual',
            url: 'https://explore-education-statistics.service.gov.uk/find-statistics/pupil-absence-in-schools-in-england',
          }}
          onClose={() => setExpanded(null)}
        />
      )}
      {expanded === 'ehcp' && (
        <MetricDetailModal
          title="Education, health and care plans, 2015–2025"
          subtitle="Total EHCPs maintained by local authorities in England."
          series={ehcpCaseloadSeries}
          yLabel="Plans"
          source={{
            name: 'Department for Education',
            dataset: 'Education, health and care plans, SEN2 return',
            frequency: 'annual',
            url: 'https://explore-education-statistics.service.gov.uk/find-statistics/education-health-and-care-plans',
          }}
          onClose={() => setExpanded(null)}
        />
      )}
      {expanded === 'gap' && (
        <MetricDetailModal
          title="Disadvantage gap index, 2010–2025"
          subtitle="Composite measure of the GCSE attainment gap between disadvantaged pupils and all others."
          series={gapIndexSeries}
          annotations={gapAnnotations}
          yLabel="Index"
          source={{
            name: 'Department for Education',
            dataset: 'Key stage 4 performance, 2024/25',
            frequency: 'annual',
            url: 'https://explore-education-statistics.service.gov.uk/find-statistics/key-stage-4-performance',
          }}
          onClose={() => setExpanded(null)}
        />
      )}
    </>
  );
}
