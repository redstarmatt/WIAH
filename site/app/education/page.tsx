'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import MetricDetailModal from '@/components/MetricDetailModal';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import RegionalMap from '@/components/charts/RegionalMap';
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

interface LaAbsencePoint {
  code: string;
  name: string;
  persistentAbsencePct: number;
  overallAbsencePct: number;
  year: string;
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
  regional: {
    byLocalAuthority: {
      absence: LaAbsencePoint[];
    };
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
  };
}

interface DemographicsData {
  population: {
    england: { year: number; population: number }[];
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

interface PerPupilFundingPoint {
  year: number;
  realTerms: number;
}

interface SendFundingDeficitPoint {
  year: number;
  deficitBn: number;
}

interface SixthFormFundingPoint {
  year: number;
  index: number;
}

interface NewSchoolFundingData {
  perPupilFunding: PerPupilFundingPoint[];
  sendFundingDeficit: SendFundingDeficitPoint[];
  sixthFormFundingIndex: SixthFormFundingPoint[];
}

interface CamhsPoint {
  year: number;
  referrals: number;
  rejected: number;
  waitOver18Weeks: number;
}

interface CamhsData {
  topic: string;
  lastUpdated: string;
  timeSeries: CamhsPoint[];
}

interface OfstedGradePoint {
  year: number;
  outstandingPct: number;
  goodPct: number;
  requiresImprovementPct: number;
  inadequatePct: number;
}

interface OfstedData {
  topic: string;
  lastUpdated: string;
  national: {
    overallGrades: {
      timeSeries: OfstedGradePoint[];
    };
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
  const [newSchoolFundingData, setNewSchoolFundingData] = useState<NewSchoolFundingData | null>(null);
  const [camhsData, setCamhsData] = useState<CamhsData | null>(null);
  const [ofstedData, setOfstedData] = useState<OfstedData | null>(null);
  const [demogData, setDemogData] = useState<DemographicsData | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data/demographics/demographics.json')
      .then(r => r.json())
      .then(setDemogData)
      .catch(console.error);
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
    fetch('/data/school-funding/school_funding.json')
      .then(r => r.json())
      .then((d: NewSchoolFundingData) => setNewSchoolFundingData(d))
      .catch(console.error);
    fetch('/data/camhs-access/camhs_access.json')
      .then(r => r.json())
      .then((d: CamhsData) => setCamhsData(d))
      .catch(console.error);
    fetch('/data/ofsted/ofsted.json')
      .then(r => r.json())
      .then((d: OfstedData) => setOfstedData(d))
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

  // 2b. EHCP rate per 10,000 population
  const ehcpRateSeries: Series[] = (data && demogData)
    ? [{
        id: 'ehcp-rate',
        label: 'EHCPs per 10,000 population',
        colour: '#E63946',
        data: data.national.send.ehcpCaseload
          .map(d => {
            const popEntry = demogData.population.england.find(p => p.year === d.year)
              ?? demogData.population.england.find(p => p.year === d.year - 1);
            if (!popEntry) return null;
            return {
              date: calendarYearToDate(d.year),
              value: Math.round((d.total / popEntry.population) * 10_000 * 10) / 10,
            };
          })
          .filter((p): p is { date: Date; value: number } => p !== null),
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

  // 11. New school funding — per pupil real terms
  const newPerPupilFundingSeries: Series[] = newSchoolFundingData
    ? [
        {
          id: 'new-per-pupil-real',
          label: 'Per-pupil funding (real terms)',
          colour: '#0D1117',
          data: newSchoolFundingData.perPupilFunding.map(d => ({
            date: new Date(d.year, 0, 1),
            value: d.realTerms,
          })),
        },
      ]
    : [];

  const sendFundingDeficitSeries: Series[] = newSchoolFundingData?.sendFundingDeficit
    ? [{
        id: 'send-deficit',
        label: 'SEND funding deficit (£bn)',
        colour: '#E63946',
        data: newSchoolFundingData.sendFundingDeficit.map(d => ({
          date: new Date(d.year, 0, 1),
          value: d.deficitBn,
        })),
      }]
    : [];

  const newSchoolFundingAnnotations: Annotation[] = [
    { date: new Date(2015, 0, 1), label: 'Austerity cuts peak' },
    { date: new Date(2021, 0, 1), label: 'Recovery begins' },
  ];

  // 12. CAMHS — referrals (in hundreds of thousands), rejections, and wait over 18 weeks %
  const camhsReferralsSeries: Series[] = camhsData
    ? [
        {
          id: 'camhs-referrals',
          label: 'Referrals (00s of thousands)',
          colour: '#0D1117',
          data: camhsData.timeSeries.map(d => ({
            date: new Date(d.year, 0, 1),
            value: d.referrals / 100000,
          })),
        },
        {
          id: 'camhs-rejected',
          label: 'Rejected referrals (00s of thousands)',
          colour: '#E63946',
          data: camhsData.timeSeries.map(d => ({
            date: new Date(d.year, 0, 1),
            value: d.rejected / 100000,
          })),
        },
      ]
    : [];

  const camhsWaitSeries: Series[] = camhsData
    ? [{
        id: 'camhs-wait',
        label: '% waiting over 18 weeks',
        colour: '#F4A261',
        data: camhsData.timeSeries.map(d => ({
          date: new Date(d.year, 0, 1),
          value: d.waitOver18Weeks,
        })),
      }]
    : [];

  const camhsAnnotations: Annotation[] = [
    { date: new Date(2021, 0, 1), label: 'Post-pandemic surge' },
  ];

  // 13. Ofsted — good or outstanding combined %
  const ofstedGoodOrOutstandingSeries: Series[] = ofstedData
    ? [
        {
          id: 'ofsted-good-outstanding',
          label: '% Good or Outstanding',
          colour: '#2A9D8F',
          data: ofstedData.national.overallGrades.timeSeries.map(d => ({
            date: new Date(d.year, 0, 1),
            value: d.outstandingPct + d.goodPct,
          })),
        },
      ]
    : [];

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
      <TopicNav topic="Education" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Education"
          question="What's Actually Happening in Schools?"
          finding={
            latestAbsence && preCovidAbsence && latestEhcp && firstEhcp && latestGap
              ? `One in five pupils is now persistently absent from school — double the rate before COVID-19 — and the attainment gap between disadvantaged children and their peers is at its widest in a decade.`
              : 'Persistent absence has doubled since the pandemic and the attainment gap is at its widest in a decade.'
          }
          colour="#2A9D8F"
        />

        <section className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              COVID-19 broke something in school attendance that has not yet mended. Before the pandemic,
              about 1 in 9 pupils were persistently absent &mdash; missing 10% or more of sessions. By
              2023-24 it was 1 in 5, and the rate has barely improved since. Anxiety, disengagement, and
              a cultural shift in attitudes to attendance all play a role, but the pattern is not evenly
              distributed: disadvantaged pupils are absent at far higher rates, and absence feeds directly
              into attainment. The disadvantage gap index has risen every year since 2020 and now stands
              at its highest in over a decade. Just 25% of disadvantaged pupils achieve grade 5 or above
              in English and maths, compared with 52% of their peers. The progress made through the 2010s
              in narrowing that gap has been erased.
            </p>
            <p>
              The SEND system has moved from strain to statutory failure. The number of children with
              Education, Health and Care Plans has nearly tripled in a decade &mdash; from around 240,000
              in 2015 to over 630,000 &mdash; driven by rising identification of autism, ADHD, and
              speech and language needs. Local authorities cannot keep pace: fewer than half of new EHCPs
              are issued within the 20-week legal deadline. Families who appeal to the SEND tribunal win
              in almost every case, which suggests that initial refusals are routinely wrong rather than
              borderline. The system is generating delay, conflict, and cost while failing the children
              it was designed to protect.
            </p>
            <p>
              Funding and international benchmarks add context to the domestic picture. Per-pupil school
              spending fell by over &pound;1,300 in real terms between 2009 and 2017 &mdash; from roughly
              &pound;8,900 to &pound;7,630. Nominal spending has since recovered to record levels, but
              the legacy of the squeeze in deferred maintenance, lost support staff, and narrowed curricula
              takes years to reverse. Internationally, the UK&apos;s PISA 2022 scores &mdash; 494 in reading,
              489 in maths, 520 in science &mdash; sit above the OECD average and roughly mid-table among
              G7 nations. England&apos;s schools are neither catastrophic nor exceptional: performing
              respectably overall while struggling to close the gaps within.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-attainment', label: 'Attainment' },
          { id: 'sec-send', label: 'SEND' },
          { id: 'sec-absence', label: 'Absence' },
          { id: 'sec-workforce', label: 'Workforce' },
          { id: 'sec-school-funding', label: 'School Funding' },
          { id: 'sec-pisa', label: 'International Comparison' },
          { id: 'sec-new-funding', label: 'Funding Trends' },
          { id: 'sec-camhs', label: 'Mental Health' },
          { id: 'sec-ofsted', label: 'Ofsted Grades' },
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
            href="#sec-overview"/>
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
            href="#sec-attainment"/>
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
            href="#sec-send"/>
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

        {/* LA persistent absence map */}
        {data && (data.regional?.byLocalAuthority?.absence ?? []).length > 0 && (
          <ScrollReveal>
            <RegionalMap
              title="Persistent absence by local authority, 2023/24"
              subtitle="Percentage of pupils missing 10% or more of sessions. Knowsley: 26.9%. City of London: 8.4%."
              geoUrl="/geo/local-authorities.geojson"
              data={(data.regional.byLocalAuthority.absence).map(la => ({
                name: la.name,
                value: la.persistentAbsencePct,
              }))}
              nameField="LAD23NM"
              valueLabel="% persistent absence"
              colourDirection="low-is-good"
              source={{
                name: 'Department for Education',
                dataset: 'Pupil absence in schools in England, 2023/24',
                url: 'https://explore-education-statistics.service.gov.uk/find-statistics/pupil-absence-in-schools-in-england',
                frequency: 'annual',
              }}
            />
          </ScrollReveal>
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

        {/* Chart 2b: EHCP rate per 10,000 population */}
        {ehcpRateSeries.length > 0 ? (
          <LineChart
            title="EHCP rate per 10,000 population, 2015–2025"
            subtitle="Total maintained EHCPs as a rate per 10,000 people in England. Controls for population growth — the rise is driven by need, not demographics."
            series={ehcpRateSeries}
            yLabel="Per 10,000 people"
            source={{
              name: 'DfE / ONS',
              dataset: 'SEN2 return; ONS Mid-Year Population Estimates',
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
                    <th className="text-center py-2 px-2 font-mono text-xs text-wiah-mid" colSpan={2}>Grade 5+ (strong pass)</th>
                    <th className="text-center py-2 px-2 font-mono text-xs text-wiah-mid" colSpan={2}>Grade 4+ (standard pass)</th>
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
        <ScrollReveal>
        <h2 className="text-2xl font-bold text-wiah-black mb-2 mt-8">Teacher Workforce</h2>
        <p className="text-base text-wiah-mid mb-8 max-w-2xl">
          Teacher vacancies have tripled since 2010. The pupil-teacher ratio has risen steadily,
          meaning fewer teachers serve more pupils. Workload and pay remain the primary barriers to recruitment.
        </p>
        </ScrollReveal>

        <ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <MetricCard
            label="Teacher vacancy rate"
            value={teacherData && teacherData.vacancies.latest ? `${teacherData.vacancies.latest.vacancyRate.toFixed(1)}` : '—'}
            unit="%"
            direction="up"
            polarity="up-is-bad"
            baseline={teacherData && teacherData.vacancies.latest ? `${teacherData.vacancies.latest.vacancies?.toLocaleString()} vacancies in ${teacherData.vacancies.latest.period} — up from 452 in 2010/11` : 'Vacancies have risen sharply since 2010'}
            changeText={teacherData && teacherData.vacancies.latest ? `${teacherData.vacancies.latest.period} · DfE School Workforce Census` : 'Loading…'}
            sparklineData={teacherData ? teacherData.vacancies.timeSeries.map(d => d.vacancyRate) : []}
            source="DfE · School Workforce in England"
          />
          <MetricCard
            label="Pupils per teacher"
            value={teacherData && teacherData.pupilTeacherRatio.latest ? `${teacherData.pupilTeacherRatio.latest.pupilTeacherRatio.toFixed(1)}` : '—'}
            unit=":1"
            direction="up"
            polarity="up-is-bad"
            baseline={teacherData && teacherData.pupilTeacherRatio.latest ? `Was 17.1:1 in 2010/11 — each teacher now serves more pupils` : 'Pupil-teacher ratio rising'}
            changeText={teacherData && teacherData.pupilTeacherRatio.latest ? `${teacherData.pupilTeacherRatio.latest.period}` : 'Loading…'}
            sparklineData={teacherData ? teacherData.pupilTeacherRatio.timeSeries.map(d => d.pupilTeacherRatio) : []}
            source="DfE · School Workforce in England"
          />
        </div>
        </ScrollReveal>

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

        {/* ── New school funding section ─────────────────────────────────── */}
        <div id="sec-new-funding">
          <ScrollReveal>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-wiah-black mb-2">School Funding per Pupil</h2>
              <p className="text-base text-wiah-mid leading-[1.7] max-w-2xl">
                Funding per pupil fell steadily through the austerity years, reaching a trough around
                2017 before partial recovery. In 2023 prices, each pupil now receives less than they
                did in 2009 — a real-terms cut that has reshaped staffing, curriculum breadth, and
                support services across English schools.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            {newPerPupilFundingSeries.length > 0 ? (
              <LineChart
                title="School funding per pupil in real terms, 2009–2023"
                subtitle="Average per-pupil funding in 2023 prices, maintained schools and academies, England."
                series={newPerPupilFundingSeries}
                annotations={newSchoolFundingAnnotations}
                yLabel="£ per pupil (2023 prices)"
                source={{
                  name: 'Institute for Fiscal Studies, UK Education Spending; DfE Schools Block Funding',
                  dataset: 'School funding per pupil, real terms',
                  frequency: 'annual',
                  url: 'https://ifs.org.uk/education-spending',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </ScrollReveal>

          <ScrollReveal>
            {sendFundingDeficitSeries.length > 0 ? (
              <LineChart
                title="SEND funding deficit, 2018–2023"
                subtitle="Cumulative deficit in local authority high-needs budgets (special educational needs), England. £bn."
                series={sendFundingDeficitSeries}
                yLabel="Deficit (£bn)"
                source={{
                  name: 'Institute for Fiscal Studies; DfE High Needs Block data',
                  dataset: 'Local authority SEND funding deficit',
                  frequency: 'annual',
                  url: 'https://ifs.org.uk/education-spending',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </ScrollReveal>
        </div>{/* end sec-new-funding */}

        {/* ── CAMHS section ──────────────────────────────────────────────── */}
        <div id="sec-camhs">
          <ScrollReveal>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-wiah-black mb-2">Children&rsquo;s Mental Health Services</h2>
              <p className="text-base text-wiah-mid leading-[1.7] max-w-2xl">
                Referrals to Child and Adolescent Mental Health Services have nearly doubled since 2016,
                driven by rising rates of anxiety, depression, and eating disorders in young people.
                The pandemic accelerated demand sharply. More than a quarter of referrals are rejected
                at the gate, and of those accepted, over half wait more than 18 weeks for treatment.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            {camhsReferralsSeries.length > 0 ? (
              <LineChart
                title="CAMHS referrals and rejections, 2016–2024"
                subtitle="Annual referrals and rejected referrals to Child and Adolescent Mental Health Services (00s of thousands), England. Over a quarter of children referred are turned away."
                series={camhsReferralsSeries}
                annotations={camhsAnnotations}
                yLabel="Referrals (00s of thousands)"
                source={{
                  name: 'NHS England',
                  dataset: 'Mental Health Services Monthly Statistics',
                  frequency: 'monthly (aggregated annually)',
                  url: 'https://www.england.nhs.uk/mental-health/resources/mental-health-dashboard/',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </ScrollReveal>

          <ScrollReveal>
            {camhsWaitSeries.length > 0 ? (
              <LineChart
                title="CAMHS: children waiting over 18 weeks, 2016–2024"
                subtitle="Percentage of accepted referrals waiting more than 18 weeks for treatment to begin, England."
                series={camhsWaitSeries}
                annotations={camhsAnnotations}
                yLabel="Percent"
                source={{
                  name: 'NHS England',
                  dataset: 'Mental Health Services Monthly Statistics',
                  frequency: 'monthly (aggregated annually)',
                  url: 'https://www.england.nhs.uk/mental-health/resources/mental-health-dashboard/',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </ScrollReveal>
        </div>{/* end sec-camhs */}

        {/* ── Ofsted grades section ───────────────────────────────────────── */}
        <div id="sec-ofsted">
          <ScrollReveal>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-wiah-black mb-2">Ofsted Inspection Grades</h2>
              <p className="text-base text-wiah-mid leading-[1.7] max-w-2xl">
                The share of schools rated Good or Outstanding by Ofsted has risen steadily from 65%
                in 2012 to around 89% in 2024. This is one of the clearest positive trends in English
                education. Caution is warranted, however: many schools held Outstanding grades from
                inspections a decade old, and a 2023 policy change finally brought them back into
                the cycle.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            {ofstedGoodOrOutstandingSeries.length > 0 ? (
              <LineChart
                title="School inspection grades, 2012–2024"
                subtitle="% of schools rated Outstanding or Good by Ofsted, England."
                series={ofstedGoodOrOutstandingSeries}
                yLabel="Percent"
                source={{
                  name: 'Ofsted',
                  dataset: 'Management Information — Schools',
                  frequency: 'monthly (aggregated annually)',
                  url: 'https://www.gov.uk/government/statistical-data-sets/monthly-management-information-ofsteds-school-inspections-outcomes',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </ScrollReveal>
        </div>{/* end sec-ofsted */}

        {/* Positive story */}
        <ScrollReveal>
        <PositiveCallout
          title="What's improving"
          value="+21%"
          description="Median graduate earnings five years after graduation have risen from £25,900 to £31,400 over seven years. More than 86% of graduates are in sustained employment or further study, a rate that has remained stable even through the pandemic."
          source="Source: DfE — LEO Graduate and Postgraduate Outcomes, tax year 2022/23."
        />
        </ScrollReveal>

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
            {newSchoolFundingData && (
              <li>
                <a
                  href="https://ifs.org.uk/education-spending"
                  className="underline hover:text-wiah-blue"
                  target="_blank"
                  rel="noreferrer"
                >
                  Institute for Fiscal Studies &mdash; UK Education Spending; DfE Schools Block Funding (annual)
                </a>
              </li>
            )}
            {camhsData && (
              <li>
                <a
                  href="https://www.england.nhs.uk/mental-health/resources/mental-health-dashboard/"
                  className="underline hover:text-wiah-blue"
                  target="_blank"
                  rel="noreferrer"
                >
                  NHS England &mdash; Mental Health Services Monthly Statistics (monthly)
                </a>
              </li>
            )}
            {ofstedData && (
              <li>
                <a
                  href="https://www.gov.uk/government/statistical-data-sets/monthly-management-information-ofsteds-school-inspections-outcomes"
                  className="underline hover:text-wiah-blue"
                  target="_blank"
                  rel="noreferrer"
                >
                  Ofsted &mdash; Management Information, School Inspections Outcomes (monthly)
                </a>
              </li>
            )}
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
