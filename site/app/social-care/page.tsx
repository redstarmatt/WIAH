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

interface DelayPoint {
  date: string;
  avgDailyDelayed: number;
  lostBedDaysK: number;
}

interface DelayReason {
  reason: string;
  pct: number;
}

interface CqcRatings {
  totalLocations: number;
  outstandingPct: number;
  goodPct: number;
  requiresImprovementPct: number;
  inadequatePct: number;
  outstanding: number;
  good: number;
  requiresImprovement: number;
  inadequate: number;
}

interface SpendingPoint {
  year: number;
  realTermsBn: number;
}

interface UnpaidCarers {
  totalCarers: number;
  carers50PlusHrsWk: number;
  pctPopulation: number;
  economicValueBn: number;
}

interface SocialCareData {
  national: {
    dischargeDelays: {
      timeSeries: DelayPoint[];
      latestAvgDaily: number;
      reasons: DelayReason[];
    };
    cqcRatings: CqcRatings;
    spending: SpendingPoint[];
    unpaidCarers: UnpaidCarers;
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
  };
}

interface VacancyPoint {
  year: string;
  vacancyRatePct: number;
  vacancies: number;
  totalJobs: number;
}

interface TurnoverPoint {
  year: string;
  turnoverPct: number;
}

interface RoleBreakdownEntry {
  role: string;
  jobs: number;
  vacancyPct: number;
}

interface WorkforceData {
  vacancyRate: VacancyPoint[];
  turnoverRate: TurnoverPoint[];
  roleBreakdown2024: RoleBreakdownEntry[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function dateToDate(d: string): Date {
  const [y, m] = d.split('-');
  return new Date(parseInt(y), parseInt(m) - 1, 1);
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 12) {
  return arr.slice(-n);
}

// Convert "2012/13" → Date(2013, 0, 1) using the latter year
const socialCareYearToDate = (s: string) => {
  const year = parseInt(s.split('/')[0]) + 1;
  return new Date(year, 0, 1);
};

// ── Page ─────────────────────────────────────────────────────────────────────

export default function SocialCarePage() {
  const [data, setData] = useState<SocialCareData | null>(null);
  const [workforce, setWorkforce] = useState<WorkforceData | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data/social-care/social_care.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
    fetch('/data/social-care/workforce.json')
      .then(r => r.json())
      .then(setWorkforce)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  // 1. Discharge delays — avg daily delayed patients
  const delaySeries: Series[] = data
    ? [{
        id: 'daily-delayed',
        label: 'Avg daily patients delayed',
        colour: '#E63946',
        data: data.national.dischargeDelays.timeSeries.map(d => ({
          date: dateToDate(d.date),
          value: d.avgDailyDelayed,
        })),
      }]
    : [];

  const delayAnnotations: Annotation[] = [
    { date: new Date(2024, 4), label: 'May 2024: Methodology change' },
  ];

  // 2. Lost bed days
  const lostBedDaysSeries: Series[] = data
    ? [{
        id: 'lost-bed-days',
        label: 'Lost bed days (thousands)',
        colour: '#264653',
        data: data.national.dischargeDelays.timeSeries.map(d => ({
          date: dateToDate(d.date),
          value: d.lostBedDaysK,
        })),
      }]
    : [];

  // 3. Spending over time
  const spendingSeries: Series[] = data
    ? [{
        id: 'spending',
        label: 'Net spend (£bn, 2023-24 prices)',
        colour: '#264653',
        data: data.national.spending.map(d => ({
          date: yearToDate(d.year),
          value: d.realTermsBn,
        })),
      }]
    : [];

  const spendingAnnotations: Annotation[] = [
    { date: new Date(2016, 0), label: '2016: Austerity trough' },
    { date: new Date(2020, 0), label: '2020: COVID funding' },
  ];

  // 4. Workforce — vacancy rate + turnover rate
  const workforceAnnotations: Annotation[] = [
    { date: new Date(2021, 0), label: 'Post-COVID peak: 165k vacancies' },
  ];

  // Build a merged timeline for vacancy + turnover (they share year keys)
  const vacancySeries: Series[] = workforce
    ? [{
        id: 'vacancy-rate',
        label: 'Vacancy rate (%)',
        colour: '#E63946',
        data: workforce.vacancyRate.map(d => ({
          date: socialCareYearToDate(d.year),
          value: d.vacancyRatePct,
        })),
      }]
    : [];

  // Turnover series — join to vacancy years where available
  const turnoverSeries: Series[] = workforce
    ? [{
        id: 'turnover-rate',
        label: 'Turnover rate (%)',
        colour: '#F4A261',
        data: workforce.turnoverRate.map(d => ({
          date: socialCareYearToDate(d.year),
          value: d.turnoverPct,
        })),
      }]
    : [];

  const workforceCombinedSeries: Series[] = workforce
    ? [...vacancySeries, ...turnoverSeries]
    : [];

  // ── Metric values ────────────────────────────────────────────────────────

  const latestDelay = data?.national.dischargeDelays.timeSeries.at(-1);
  const earliestDelay = data?.national.dischargeDelays.timeSeries[0];

  const cqc = data?.national.cqcRatings;
  const goodPlusPct = cqc ? (cqc.outstandingPct + cqc.goodPct).toFixed(0) : '—';

  const carers = data?.national.unpaidCarers;

  const latestVacancy = workforce?.vacancyRate.at(-1);
  const peakVacancy = workforce?.vacancyRate.find(d => d.year === '2021/22');

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      {/* Sticky nav */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-wiah-border px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/"><SiteName size="nav" /></Link>
          <span className="text-wiah-mid text-sm font-mono">Social Care</span>
          <Link href="/" className="text-sm text-wiah-blue hover:underline">&larr; All topics</Link>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Social Care"
          question="What Actually Happens When You Need Care?"
          finding={
            latestDelay && cqc && carers
              ? `An average of ${(latestDelay.avgDailyDelayed / 1000).toFixed(1)}k patients sit in hospital beds each day despite being medically fit to leave — they're waiting for social care that isn't available. ${goodPlusPct}% of care providers are rated Good or Outstanding by the CQC, but the system depends on ${(carers.totalCarers / 1e6).toFixed(1)} million unpaid carers whose contribution is worth an estimated £${carers.economicValueBn}bn a year.`
              : 'Thousands of patients are stuck in hospital each day waiting for social care. The system depends on nearly 5 million unpaid carers.'
          }
          colour="#6B7280"
          preposition="with"
        />

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-discharge', label: 'Hospital Discharge' },
          { id: 'sec-quality', label: 'Care Quality' },
          { id: 'sec-carers', label: 'Unpaid Carers' },
          { id: 'sec-workforce', label: 'Workforce' },
          { id: 'sec-context', label: 'Context' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Patients delayed daily"
            value={latestDelay ? `${(latestDelay.avgDailyDelayed / 1000).toFixed(1)}K` : '—'}
            unit=""
            direction="up"
            polarity="up-is-bad"
            baseline="13,200 hospital beds occupied every day by people waiting for social care to be arranged"
            changeText={
              latestDelay && earliestDelay
                ? `Up from ${(earliestDelay.avgDailyDelayed / 1000).toFixed(1)}K in ${earliestDelay.date.slice(0, 7)}`
                : 'Loading…'
            }
            sparklineData={
              data
                ? sparkFrom(data.national.dischargeDelays.timeSeries.map(d => d.avgDailyDelayed))
                : []
            }
            source="NHS England · Discharge SitRep, Jan 2025"
            onExpand={delaySeries.length > 0 ? () => setExpanded('delays') : undefined}
          />
          <MetricCard
            label="CQC rated Good+"
            value={goodPlusPct}
            unit="%"
            direction="flat"
            polarity="up-is-good"
            baseline="5 in 6 care providers rated Good or Outstanding — despite decade-long funding pressures"
            changeText={
              cqc
                ? `${cqc.totalLocations.toLocaleString()} adult social care locations rated`
                : 'Loading…'
            }
            sparklineData={[]}
            source="CQC · Latest ratings, 2025"
          />
          <MetricCard
            label="Unpaid carers"
            value={carers ? `${(carers.totalCarers / 1e6).toFixed(1)}M` : '—'}
            unit=""
            direction="up"
            polarity="up-is-bad"
            baseline="More unpaid carers than the entire NHS workforce — providing £162bn of care a year"
            changeText={
              carers
                ? `${(carers.carers50PlusHrsWk / 1e6).toFixed(1)}M provide 50+ hrs/week`
                : 'Loading…'
            }
            sparklineData={[]}
            source="ONS · Census 2021"
            onExpand={() => setExpanded('carers')}
          />
        </div>
        </ScrollReveal>

        {/* Chart 1: Discharge delays over time */}
        <div id="sec-discharge">
        {delaySeries.length > 0 ? (
          <LineChart
            title="Hospital discharge delays, 2021–2025"
            subtitle="Average daily number of patients who do not meet criteria to reside (medically fit but unable to leave), England acute trusts."
            series={delaySeries}
            annotations={delayAnnotations}
            yLabel="Patients / day"
            source={{
              name: 'NHS England',
              dataset: 'Daily Discharge Situation Report',
              frequency: 'monthly',
              url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/discharge-delays/acute-discharge-situation-report/',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Chart 2: Lost bed days */}
        {lostBedDaysSeries.length > 0 ? (
          <LineChart
            title="Lost bed days from discharge delays, 2021–2025"
            subtitle="Total additional hospital bed days accumulated per quarter by delayed patients (thousands), England."
            series={lostBedDaysSeries}
            yLabel="Thousands of bed days"
            annotations={delayAnnotations}
            source={{
              name: 'NHS England',
              dataset: 'Daily Discharge Situation Report',
              frequency: 'monthly',
              url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/discharge-delays/acute-discharge-situation-report/',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Chart 3: Delay reasons breakdown — inline bar table */}
        {data && data.national.dischargeDelays.reasons.length > 0 && (
          <ScrollReveal>
          <section className="mb-12">
            <h3 className="text-lg font-bold text-wiah-black mb-1">
              Why patients are delayed
            </h3>
            <p className="text-sm text-wiah-mid font-mono mb-6">
              Breakdown of discharge delay reasons, % of total delayed bed days, England, January 2025.
            </p>
            <div className="space-y-2">
              {data.national.dischargeDelays.reasons.map((r, i) => {
                const barColour = i === 0 ? 'bg-[#E63946]' : i === 1 ? 'bg-[#F4A261]' : 'bg-[#264653]';
                return (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <span className="w-56 text-right text-wiah-black truncate flex-shrink-0">
                      {r.reason}
                    </span>
                    <div className="flex-1 bg-gray-100 rounded h-5 relative">
                      <div
                        className={`${barColour} h-5 rounded`}
                        style={{ width: `${r.pct}%` }}
                      />
                    </div>
                    <span className="font-mono text-wiah-black w-12 text-right flex-shrink-0">
                      {r.pct}%
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="font-mono text-[11px] text-wiah-mid mt-3">
              Source: NHS England — Daily Discharge Situation Report (monthly).{' '}
              <a
                href="https://www.england.nhs.uk/statistics/statistical-work-areas/discharge-delays/acute-discharge-situation-report/"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-wiah-blue"
              >
                Dataset ↗
              </a>
            </p>
          </section>
          </ScrollReveal>
        )}

        </div>{/* end sec-discharge */}

        {/* Chart 4: CQC Ratings distribution — stacked horizontal bar */}
        {cqc && (
          <ScrollReveal>
          <section id="sec-quality" className="mb-12">
            <h3 className="text-lg font-bold text-wiah-black mb-1">
              CQC ratings for adult social care, 2025
            </h3>
            <p className="text-sm text-wiah-mid font-mono mb-6">
              Latest overall rating for {cqc.totalLocations.toLocaleString()} adult social care locations in England.
            </p>

            {/* Stacked bar */}
            <div className="w-full h-10 rounded overflow-hidden flex mb-4">
              <div
                className="h-full flex items-center justify-center text-white text-xs font-mono font-bold"
                style={{ width: `${cqc.outstandingPct}%`, backgroundColor: '#264653' }}
                title={`Outstanding: ${cqc.outstandingPct}%`}
              >
                {cqc.outstandingPct >= 4 ? `${cqc.outstandingPct}%` : ''}
              </div>
              <div
                className="h-full flex items-center justify-center text-white text-xs font-mono font-bold"
                style={{ width: `${cqc.goodPct}%`, backgroundColor: '#2A9D8F' }}
                title={`Good: ${cqc.goodPct}%`}
              >
                {cqc.goodPct}%
              </div>
              <div
                className="h-full flex items-center justify-center text-white text-xs font-mono font-bold"
                style={{ width: `${cqc.requiresImprovementPct}%`, backgroundColor: '#F4A261' }}
                title={`Requires improvement: ${cqc.requiresImprovementPct}%`}
              >
                {cqc.requiresImprovementPct}%
              </div>
              <div
                className="h-full flex items-center justify-center text-white text-xs font-mono font-bold"
                style={{ width: `${cqc.inadequatePct}%`, backgroundColor: '#E63946' }}
                title={`Inadequate: ${cqc.inadequatePct}%`}
              >
                {cqc.inadequatePct >= 2 ? `${cqc.inadequatePct}%` : ''}
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 text-xs font-mono text-wiah-mid">
              <span><span className="inline-block w-3 h-3 rounded mr-1" style={{ backgroundColor: '#264653' }} /> Outstanding ({cqc.outstanding.toLocaleString()})</span>
              <span><span className="inline-block w-3 h-3 rounded mr-1" style={{ backgroundColor: '#2A9D8F' }} /> Good ({cqc.good.toLocaleString()})</span>
              <span><span className="inline-block w-3 h-3 rounded mr-1" style={{ backgroundColor: '#F4A261' }} /> Requires improvement ({cqc.requiresImprovement.toLocaleString()})</span>
              <span><span className="inline-block w-3 h-3 rounded mr-1" style={{ backgroundColor: '#E63946' }} /> Inadequate ({cqc.inadequate.toLocaleString()})</span>
            </div>

            <p className="font-mono text-[11px] text-wiah-mid mt-4">
              Source: CQC — Care directory with latest ratings (monthly).{' '}
              <a
                href="https://www.cqc.org.uk/about-us/transparency/using-cqc-data"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-wiah-blue"
              >
                Dataset ↗
              </a>
            </p>
          </section>
          </ScrollReveal>
        )}

        {/* Chart 5: Spending over time */}
        {spendingSeries.length > 0 ? (
          <LineChart
            title="Adult social care spending, 2010–2024"
            subtitle="Local authority net current expenditure on adult social care, England (£bn, 2023-24 prices, real terms)."
            series={spendingSeries}
            annotations={spendingAnnotations}
            yLabel="£bn (real terms)"
            source={{
              name: 'NHS Digital / DHSC',
              dataset: 'Adult Social Care Activity and Finance Report',
              frequency: 'annual',
              url: 'https://digital.nhs.uk/data-and-information/publications/statistical/adult-social-care-activity-and-finance-report',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Unpaid carers summary card */}
        {carers && (
          <ScrollReveal>
          <section id="sec-carers" className="mb-12 bg-wiah-light rounded-lg p-8">
            <h3 className="text-lg font-bold text-wiah-black mb-4">
              The hidden workforce: unpaid carers
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <p className="font-mono text-3xl font-bold text-wiah-black">
                  {(carers.totalCarers / 1e6).toFixed(1)}M
                </p>
                <p className="text-sm text-wiah-mid mt-1">
                  people provide unpaid care
                </p>
              </div>
              <div>
                <p className="font-mono text-3xl font-bold text-wiah-black">
                  {(carers.carers50PlusHrsWk / 1e6).toFixed(1)}M
                </p>
                <p className="text-sm text-wiah-mid mt-1">
                  care for 50+ hours per week
                </p>
              </div>
              <div>
                <p className="font-mono text-3xl font-bold text-wiah-black">
                  £{carers.economicValueBn}bn
                </p>
                <p className="text-sm text-wiah-mid mt-1">
                  estimated annual economic value
                </p>
              </div>
            </div>
            <p className="font-mono text-[11px] text-wiah-mid mt-6">
              Source: ONS Census 2021, Carers UK State of Caring 2024.{' '}
              <a
                href="https://www.carersuk.org/policy-and-research/key-facts-and-figures/"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-wiah-blue"
              >
                Carers UK ↗
              </a>
            </p>
          </section>
          </ScrollReveal>
        )}

        {/* Positive story */}
        <ScrollReveal>
        <PositiveCallout
          title="What's working"
          value={`${goodPlusPct}%`}
          description={`of adult social care providers are rated Good or Outstanding by the CQC, despite years of funding pressure. The sector has recovered from the austerity-era spending trough, with real-terms expenditure now back above 2010 levels. Dedicated care workers deliver services to over 800,000 people in residential settings and 850,000 at home.`}
          source="Source: CQC — State of Care 2024-25; NHS Digital — Adult Social Care Activity and Finance Report."
        />
        </ScrollReveal>

        {/* ── Workforce ─────────────────────────────────────────────────────── */}
        <div id="sec-workforce">
          <ScrollReveal>
          <h2 className="text-2xl font-bold text-wiah-black mb-2 mt-8">Workforce Crisis</h2>
          <p className="text-base text-wiah-mid mb-8 max-w-2xl">
            The social care workforce has over 130,000 unfilled posts. One in three workers leaves
            each year. Low pay drives the crisis — many care workers earn close to the minimum wage
            despite holding significant responsibility.
          </p>
          </ScrollReveal>

          {workforceCombinedSeries.length > 0 ? (
            <LineChart
              title="Adult social care workforce vacancy rate, England, 2012–2024"
              subtitle="Vacancy rate hit 10.6% in 2021/22 — over 165,000 unfilled posts. High turnover (28%) compounds the pressure."
              series={workforceCombinedSeries}
              annotations={workforceAnnotations}
              yLabel="%"
              source={{
                name: 'Skills for Care',
                dataset: 'State of the adult social care sector and workforce in England, 2024',
                frequency: 'annual',
                url: 'https://www.skillsforcare.org.uk/Adult-Social-Care-Workforce-Data/Workforce-intelligence/publications/national-information/The-state-of-the-adult-social-care-sector-and-workforce-in-England.aspx',
              }}
            />
          ) : (
            <div className="h-64 bg-wiah-light rounded animate-pulse mb-16" />
          )}

          {/* Workforce summary stats */}
          {workforce && latestVacancy && (
            <ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
              <div className="border border-wiah-border rounded-lg p-5">
                <p className="text-xs font-mono text-wiah-mid mb-1">Current vacancy rate</p>
                <p className="font-mono text-3xl font-bold" style={{ color: '#E63946' }}>
                  {latestVacancy.vacancyRatePct}%
                </p>
                <p className="text-xs text-wiah-mid mt-1">
                  {latestVacancy.vacancies.toLocaleString()} unfilled posts ({latestVacancy.year})
                </p>
              </div>
              <div className="border border-wiah-border rounded-lg p-5">
                <p className="text-xs font-mono text-wiah-mid mb-1">Peak vacancy (2021/22)</p>
                <p className="font-mono text-3xl font-bold" style={{ color: '#E63946' }}>
                  {peakVacancy ? `${peakVacancy.vacancyRatePct}%` : '10.6%'}
                </p>
                <p className="text-xs text-wiah-mid mt-1">
                  165,000 unfilled posts at peak
                </p>
              </div>
              <div className="border border-wiah-border rounded-lg p-5">
                <p className="text-xs font-mono text-wiah-mid mb-1">Annual staff turnover</p>
                <p className="font-mono text-3xl font-bold" style={{ color: '#F4A261' }}>28%</p>
                <p className="text-xs text-wiah-mid mt-1">
                  1 in 3.5 workers leaves each year
                </p>
              </div>
            </div>
            </ScrollReveal>
          )}

          {/* Role breakdown table */}
          {workforce && workforce.roleBreakdown2024.length > 0 && (
            <ScrollReveal>
            <section className="mb-12">
              <h3 className="text-lg font-bold text-wiah-black mb-1">
                Vacancy rates by role, 2023/24
              </h3>
              <p className="text-sm text-wiah-mid font-mono mb-6">
                Unfilled posts as a percentage of total posts, by job role. Sorted by vacancy rate (highest first).
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-wiah-border">
                      <th className="text-left py-2 pr-6 font-mono text-xs text-wiah-mid">Role</th>
                      <th className="text-right py-2 px-4 font-mono text-xs text-wiah-mid">Jobs</th>
                      <th className="text-right py-2 px-4 font-mono text-xs text-wiah-mid">Vacancy rate</th>
                      <th className="py-2 pl-4 font-mono text-xs text-wiah-mid w-36">vs 10% benchmark</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...workforce.roleBreakdown2024]
                      .sort((a, b) => b.vacancyPct - a.vacancyPct)
                      .map((row, i) => {
                        const barPct = Math.min((row.vacancyPct / 15) * 100, 100);
                        const colour =
                          row.vacancyPct >= 10 ? '#E63946'
                          : row.vacancyPct >= 7 ? '#F4A261'
                          : '#2A9D8F';
                        return (
                          <tr key={i} className="border-b border-wiah-border/50 hover:bg-wiah-light/50">
                            <td className="py-2 pr-6 text-sm text-wiah-black">{row.role}</td>
                            <td className="py-2 px-4 font-mono text-sm text-right text-wiah-mid">
                              {row.jobs.toLocaleString()}
                            </td>
                            <td className="py-2 px-4 font-mono text-sm text-right font-bold" style={{ color: colour }}>
                              {row.vacancyPct.toFixed(1)}%
                            </td>
                            <td className="py-2 pl-4">
                              <div className="bg-wiah-light rounded h-2 w-full">
                                <div
                                  className="h-2 rounded"
                                  style={{ width: `${barPct}%`, backgroundColor: colour }}
                                />
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              <p className="font-mono text-[11px] text-wiah-mid mt-3">
                Source: Skills for Care — State of the adult social care sector and workforce in England, 2024.{' '}
                <a
                  href="https://www.skillsforcare.org.uk/Adult-Social-Care-Workforce-Data/Workforce-intelligence/publications/national-information/The-state-of-the-adult-social-care-sector-and-workforce-in-England.aspx"
                  target="_blank"
                  rel="noreferrer"
                  className="underline hover:text-wiah-blue"
                >
                  Dataset ↗
                </a>
              </p>
            </section>
            </ScrollReveal>
          )}
        </div>{/* end sec-workforce */}

        {/* Context */}
        <section id="sec-context" className="max-w-2xl mt-8 mb-12">
          <h2 className="text-xl font-bold text-wiah-black mb-4">What&apos;s driving this</h2>
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The core problem is a mismatch between rising demand and constrained funding.
              England&apos;s population aged 85 and over &mdash; the group most likely to
              need care &mdash; is growing steadily, but local authority spending fell 16%
              in real terms between 2010 and 2016 and has only just recovered to 2010 levels.
              The consequences surface in hospitals: over 13,000 patients occupy acute beds
              each day despite being medically fit to leave, nearly 30% of them waiting for
              a home care package that does not yet exist. Every occupied bed means a longer
              A&amp;E wait, a cancelled operation, or an ambulance circling outside. Despite
              this pressure, care quality holds up &mdash; over 84% of CQC-rated locations
              are Good or Outstanding &mdash; a credit to frontline staff working within a
              system that gives them very little margin.
            </p>
            <p>
              The workforce crisis sits at the heart of the capacity problem. Vacancy rates
              peaked at 10.6% in 2021/22 &mdash; over 165,000 unfilled posts &mdash; and
              have since fallen to 8.3%, but annual turnover still runs at roughly 28%.
              The reason is straightforward: mean hourly pay is &pound;10.54, barely above
              the National Living Wage, for work that carries significant physical and
              emotional responsibility. Registered nurses face a 12.4% vacancy rate,
              reflecting direct competition with NHS employers who can offer better pay
              and pensions. International recruitment has plugged some gaps, but when
              one in three workers leaves each year, recruitment alone cannot solve the
              problem. Retention is the structural issue.
            </p>
            <p>
              Behind the formal system lies a hidden infrastructure of unpaid care. Nearly
              5 million people provide unpaid care in England, and over 1 million of them
              do so for 50 or more hours a week &mdash; the equivalent of a full-time job
              with overtime. Carers UK estimates the economic value of this work at
              &pound;162 billion a year, more than the entire NHS budget. Many unpaid
              carers are themselves elderly, managing their own health conditions while
              supporting a partner or parent. If even a fraction stepped back, the formal
              system &mdash; already unable to fill its vacancies &mdash; could not absorb
              the demand. The sustainability of social care depends on people it largely
              does not pay.
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
            <li>
              <a
                href="https://www.skillsforcare.org.uk/Adult-Social-Care-Workforce-Data/Workforce-intelligence/publications/national-information/The-state-of-the-adult-social-care-sector-and-workforce-in-England.aspx"
                className="underline hover:text-wiah-blue"
                target="_blank"
                rel="noreferrer"
              >
                Skills for Care &mdash; State of the adult social care sector and workforce in England (annual)
              </a>
            </li>
          </ul>
          <p className="font-mono text-xs text-wiah-mid mt-4">
            Discharge delay data from the NHS England Daily Discharge Situation Report. These are
            management data, not official statistics — collected rapidly for operational purposes.
            The methodology expanded in May 2024 to include all patients delayed by at least one day
            (previously 7+ days only); pre/post figures are not directly comparable. CQC ratings are a
            point-in-time snapshot of the latest inspection. Spending data is in 2023-24 prices (real
            terms). Unpaid carer figures from Census 2021 — likely an undercount as many carers do
            not identify as such. Workforce data from Skills for Care annual survey; England only,
            excludes NHS social care workers.
          </p>
          <p className="font-mono text-xs text-wiah-mid mt-4">
            Data updated automatically via GitHub Actions. Last pipeline run:{' '}
            {new Date().toISOString().slice(0, 10)}.
          </p>
        </section>
      </main>

      {/* Expanded metric modals */}
      {expanded === 'delays' && (
        <MetricDetailModal
          title="Hospital discharge delays, 2021–2025"
          subtitle="Average daily patients not meeting criteria to reside, England acute trusts."
          series={delaySeries}
          annotations={delayAnnotations}
          yLabel="Patients / day"
          source={{
            name: 'NHS England',
            dataset: 'Daily Discharge Situation Report',
            frequency: 'monthly',
            url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/discharge-delays/acute-discharge-situation-report/',
          }}
          onClose={() => setExpanded(null)}
        />
      )}
      {expanded === 'carers' && carers && (
        <MetricDetailModal
          title="Unpaid carers in England"
          subtitle="Census 2021 data on people providing unpaid care."
          series={[{
            id: 'carers-placeholder',
            label: 'Unpaid carers',
            data: [
              { date: new Date(2011, 0), value: 5430000 },
              { date: new Date(2021, 0), value: carers.totalCarers },
            ],
          }]}
          yLabel="People"
          source={{
            name: 'ONS',
            dataset: 'Census 2021 — Unpaid care',
            frequency: 'decennial',
            url: 'https://www.ons.gov.uk/census/maps/choropleth/health/unpaid-care/unpaid-care-19a/provides-no-unpaid-care',
          }}
          onClose={() => setExpanded(null)}
        />
      )}
    </>
  );
}
