'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// ── Types ────────────────────────────────────────────────────────────────────

interface StaffPoint {
  year: number;
  fte: number;
}

interface OnTimePoint {
  year: number;
  pct: number;
}

interface FeeIncomePoint {
  year: number;
  millionGBP: number;
}

interface DwellingsPoint {
  year: number;
  dwellings: number;
}

interface RegionData {
  region: string;
  staffPer1000Apps: number;
  onTimePct: number;
}

interface LpaData {
  planningStaff: StaffPoint[];
  majorAppsOnTime: OnTimePoint[];
  planningFeeIncome: FeeIncomePoint[];
  netAdditionalDwellings: DwellingsPoint[];
  byRegion: RegionData[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function LpaCapacityCrisisPage() {
  const [data, setData] = useState<LpaData | null>(null);

  useEffect(() => {
    fetch('/data/lpa-capacity-crisis/lpa_capacity_crisis.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const staffSeries: Series[] = data
    ? [{
        id: 'staff',
        label: 'Planning staff (FTE)',
        colour: '#F4A261',
        data: data.planningStaff.map(d => ({
          date: yearToDate(d.year),
          value: d.fte,
        })),
      }]
    : [];

  const onTimeSeries: Series[] = data
    ? [{
        id: 'on-time',
        label: 'Major applications decided on time (%)',
        colour: '#6B7280',
        data: data.majorAppsOnTime.map(d => ({
          date: yearToDate(d.year),
          value: d.pct,
        })),
      }]
    : [];

  const feeVsDwellingsSeries: Series[] = data
    ? [
        {
          id: 'fee-income',
          label: "Planning fee income (£m)",
          colour: '#264653',
          data: data.planningFeeIncome.map(d => ({
            date: yearToDate(d.year),
            value: d.millionGBP,
          })),
        },
        {
          id: 'dwellings-scaled',
          label: "Net additional dwellings (hundreds)",
          colour: '#2A9D8F',
          data: data.netAdditionalDwellings.map(d => ({
            date: yearToDate(d.year),
            value: Math.round(d.dwellings / 100),
          })),
        },
      ]
    : [];

  // ── Derived values ────────────────────────────────────────────────────

  const latestStaff = data?.planningStaff[data.planningStaff.length - 1];
  const peakStaff = data?.planningStaff[0];
  const staffDrop = latestStaff && peakStaff
    ? Math.round(((peakStaff.fte - latestStaff.fte) / peakStaff.fte) * 100)
    : 33;

  const latestOnTime = data?.majorAppsOnTime[data.majorAppsOnTime.length - 1];
  const peakOnTime = data?.majorAppsOnTime.reduce((a, b) => a.pct > b.pct ? a : b);

  const latestDwellings = data?.netAdditionalDwellings[data.netAdditionalDwellings.length - 1];
  const peakDwellings = data?.netAdditionalDwellings.reduce((a, b) => a.dwellings > b.dwellings ? a : b);

  // ── Annotations ───────────────────────────────────────────────────────

  const staffAnnotations: Annotation[] = [
    { date: new Date(2010, 6, 1), label: "2010: Austerity cuts begin" },
    { date: new Date(2018, 0, 1), label: "2018: NPPF revised" },
    { date: new Date(2024, 0, 1), label: "2024: Planning fee uplift" },
  ];

  const onTimeAnnotations: Annotation[] = [
    { date: new Date(2013, 0, 1), label: "2013: NPPF performance thresholds" },
    { date: new Date(2020, 3, 1), label: "2020: COVID deadline extensions" },
  ];

  const dwellingsAnnotations: Annotation[] = [
    { date: new Date(2012, 0, 1), label: "2012: NPPF introduced" },
    { date: new Date(2020, 3, 1), label: "2020: COVID lockdowns" },
  ];

  return (
    <>
      <TopicNav topic="Planning Authority Capacity" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Planning Authority Capacity"
          question="Are Local Planning Departments Overwhelmed?"
          finding="England has lost a third of its local planning officers since 2010. The departments that decide where homes, schools, and infrastructure get built are running on skeletal staff — and the consequences are visible in every delayed development and unmet housing target."
          colour="#F4A261"
          preposition="in"
        />

        {/* ── Editorial context ──────────────────────────────────────────── */}
        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Local planning authorities are the gatekeepers of development in England. Every house, every commercial building, every wind farm, every school extension passes through their hands. In 2010, these departments employed roughly 16,200 full-time equivalent planning officers. By 2023, that figure had fallen to 10,700 — a reduction of 34% over thirteen years. The cuts were not the result of declining demand. Planning application volumes remained broadly stable throughout the period, and the complexity of individual applications increased as environmental assessments, biodiversity net gain requirements, and nutrient neutrality rules were layered on top of existing obligations. The same number of decisions were being asked of a workforce that had shrunk by a third.
            </p>
            <p>
              The effects are measurable. The proportion of major planning applications decided within the statutory 13-week deadline has fallen from a peak of 88% in 2018 to 75% in 2024. For smaller "non-major" applications — extensions, change of use, single dwellings — the picture is worse in many authorities, with some reporting decision times stretching beyond 20 weeks. Delays cascade: developers face holding costs, housing delivery targets are missed, and local plans fall out of date, triggering speculative applications that communities cannot resist. The government target of 300,000 new homes per year has never been met, and planning capacity is a significant — though not the only — bottleneck. In London, where pressure is most acute, there are just 3.2 planning staff per 1,000 applications, compared to 6.2 in the North East.
            </p>
            <p>
              There are early signs of a response. The 2024 planning fee increase — the first above-inflation rise in over a decade — brought an additional £65 million into the system and enabled some authorities to begin recruiting. National planning staff numbers edged up to 10,900 in 2024, the first year-on-year increase since 2010. The Royal Town Planning Institute reports a 15% rise in graduate planning course applications. These are welcome developments, but they are starting from a historically low base. Rebuilding planning capacity to a level that can support the government"s housing and infrastructure ambitions will take sustained investment over several years — not a single fee adjustment. The planning system is not broken because planners are slow; it is broken because there are not enough of them.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-staffing', label: 'Staffing' },
          { id: 'sec-performance', label: 'Performance' },
          { id: 'sec-output', label: 'Housing output' },
          { id: 'sec-regional', label: 'Regional' },
        ]} />

        {/* ── Metric cards ───────────────────────────────────────────────── */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Local planning staff (England, FTE)"
            value={latestStaff ? latestStaff.fte.toLocaleString() : '10,900'}
            unit="2024"
            direction="down"
            polarity="down-is-bad"
            changeText={`Down ${staffDrop}% from ${peakStaff ? peakStaff.fte.toLocaleString() : '16,200'} in 2010 · first uptick in 2024`}
            sparklineData={
              data ? sparkFrom(data.planningStaff.map(d => d.fte)) : []
            }
            source="MHCLG / RTPI workforce survey, 2024"
            href="#sec-staffing"
          />
          <MetricCard
            label="Major apps decided on time"
            value={latestOnTime ? `${latestOnTime.pct}%` : '75%'}
            unit="2024"
            direction="down"
            polarity="up-is-good"
            changeText={
              latestOnTime && peakOnTime
                ? `Down from ${peakOnTime.pct}% peak in ${peakOnTime.year} · target is 90%`
                : 'Down from 88% peak in 2018 · target is 90%'
            }
            sparklineData={
              data ? sparkFrom(data.majorAppsOnTime.map(d => d.pct)) : []
            }
            source="MHCLG planning statistics, Q4 2024"
            href="#sec-performance"
          />
          <MetricCard
            label="Net additional dwellings"
            value={latestDwellings ? latestDwellings.dwellings.toLocaleString() : '218,000'}
            unit="2024"
            direction="down"
            polarity="down-is-bad"
            changeText={
              latestDwellings && peakDwellings
                ? `Down from peak of ${peakDwellings.dwellings.toLocaleString()} in ${peakDwellings.year} · target: 300,000`
                : 'Down from 242,700 peak · target: 300,000'
            }
            sparklineData={
              data ? sparkFrom(data.netAdditionalDwellings.map(d => d.dwellings)) : []
            }
            source="MHCLG live tables, 2024"
            href="#sec-output"
          />
        </div>

        {/* ── Chart 1: Planning staff ────────────────────────────────────── */}
        <ScrollReveal>
          <div id="sec-staffing" className="mb-12">
            <LineChart
              series={staffSeries}
              title="Local planning authority staff, England, 2010-2024"
              subtitle="Full-time equivalent planning officers employed by local authorities. A third of the workforce lost to austerity."
              yLabel="Staff (FTE)"
              annotations={staffAnnotations}
              source={{
                name: 'MHCLG / RTPI',
                dataset: 'Local authority planning workforce',
                frequency: 'annual',
                url: 'https://www.rtpi.org.uk/research/',
                date: 'Oct 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* ── Chart 2: On-time performance ───────────────────────────────── */}
        <ScrollReveal>
          <div id="sec-performance" className="mb-12">
            <LineChart
              series={onTimeSeries}
              title="Major planning applications decided within 13 weeks, England, 2010-2024"
              subtitle="Percentage meeting the statutory deadline. Performance improved 2010-2018, then declined as staffing cuts took hold."
              yLabel="% decided on time"
              annotations={onTimeAnnotations}
              targetLine={{ value: 90, label: 'MHCLG 90% target' }}
              source={{
                name: 'MHCLG',
                dataset: 'Planning Applications in England',
                frequency: 'quarterly',
                url: 'https://www.gov.uk/government/statistics/planning-applications-in-england',
                date: 'Dec 2024',
              }}
            />
          </div>
        </ScrollReveal>

        {/* ── Chart 3: Fee income vs housing output ──────────────────────── */}
        <ScrollReveal>
          <div id="sec-output" className="mb-12">
            <LineChart
              series={feeVsDwellingsSeries}
              title="Planning fee income vs net additional dwellings, England, 2010-2024"
              subtitle="Fee income has grown while housing completions have plateaued, suggesting rising complexity per application."
              yLabel="Value"
              annotations={dwellingsAnnotations}
              source={{
                name: 'MHCLG / DLUHC',
                dataset: 'Planning fee income & net additional dwellings',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistical-data-sets/live-tables-on-net-supply-of-housing',
                date: 'Nov 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* ── Regional variation ──────────────────────────────────────────── */}
        <ScrollReveal>
          <div id="sec-regional" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Planning staff per 1,000 applications by region
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                London has the least capacity relative to demand. Authorities with fewer than 4 staff per 1,000 applications consistently miss on-time targets.
              </p>
              <div className="mt-6 space-y-4">
                {data?.byRegion.map((r) => {
                  const pct = (r.staffPer1000Apps / 7) * 100;
                  const barColour = r.staffPer1000Apps < 4.5 ? '#E63946' : r.staffPer1000Apps < 5.2 ? '#F4A261' : '#2A9D8F';
                  return (
                    <div key={r.region}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{r.region}</span>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-wiah-mid">{r.onTimePct}% on time</span>
                          <span className="font-mono text-sm font-bold text-wiah-black">{r.staffPer1000Apps}</span>
                        </div>
                      </div>
                      <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{ width: `${pct}%`, backgroundColor: barColour }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">Source: RTPI workforce survey / MHCLG application volumes, 2024</p>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Positive callout ───────────────────────────────────────────── */}
        <ScrollReveal>
          <PositiveCallout
            title="First staffing increase since 2010"
            value="+200 FTE"
            unit="in 2024"
            description="Local planning authority staffing rose from 10,700 to 10,900 FTE in 2024, the first year-on-year increase in fourteen years. The 2024 planning fee uplift — a 35% increase for major applications and 25% for others — is projected to bring an additional £65 million per year into local authority planning departments. Graduate applications for RTPI-accredited planning courses rose 15% in 2024/25. While these gains are modest relative to the scale of cuts, they represent a genuine inflection point. If sustained, planning departments could return to 2018 staffing levels within five years."
            source="Source: RTPI — Planning workforce survey, 2024. MHCLG — Planning fee schedule, effective April 2024."
          />
        </ScrollReveal>

        {/* ── Sources & Methodology ──────────────────────────────────────── */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p>
              <a href="https://www.gov.uk/government/statistics/planning-applications-in-england" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">MHCLG — Planning Applications in England</a> — quarterly statistics on application volumes and decision timescales. Retrieved Dec 2024.
            </p>
            <p>
              <a href="https://www.rtpi.org.uk/research/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">RTPI — Planning workforce survey</a> — annual survey of planning staff numbers, vacancies, and skills gaps. Retrieved Oct 2025.
            </p>
            <p>
              <a href="https://www.gov.uk/government/collections/local-authority-revenue-expenditure-and-financing" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DLUHC — Local authority revenue outturn</a> — planning fee income and expenditure data. Retrieved Nov 2025.
            </p>
            <p>
              <a href="https://www.gov.uk/government/statistical-data-sets/live-tables-on-net-supply-of-housing" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">MHCLG — Net additional dwellings</a> — annual housing completions data. Retrieved Dec 2025.
            </p>
            <p>
              All figures are for England unless otherwise stated. Planning staff FTE figures prior to 2013 use a slightly different classification which may overcount by up to 5%. The 2020 on-time percentage reflects extended statutory deadlines introduced during COVID-19. Planning fee income is shown in nominal terms and is not adjusted for inflation.
            </p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
