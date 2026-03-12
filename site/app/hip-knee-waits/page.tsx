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

interface WaitingListPoint {
  year: number;
  total: number;
  hip: number;
  knee: number;
}

interface MedianWaitPoint {
  year: number;
  weeks: number;
}

interface RevisionRatePoint {
  year: number;
  ratePerThousand: number;
}

interface ProceduresPoint {
  year: number;
  total: number;
}

interface RegionData {
  region: string;
  medianWeeks: number;
}

interface HipKneeData {
  waitingList: WaitingListPoint[];
  medianWaitWeeks: MedianWaitPoint[];
  revisionRate: RevisionRatePoint[];
  proceduresPerformed: ProceduresPoint[];
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

export default function HipKneeWaitsPage() {
  const [data, setData] = useState<HipKneeData | null>(null);

  useEffect(() => {
    fetch('/data/hip-knee-waits/hip_knee_waits.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const waitingListSeries: Series[] = data
    ? [
        {
          id: 'total',
          label: 'Total waiting (hip + knee)',
          colour: '#E63946',
          data: data.waitingList.map(d => ({
            date: yearToDate(d.year),
            value: d.total,
          })),
        },
        {
          id: 'knee',
          label: 'Knee replacements',
          colour: '#6B7280',
          data: data.waitingList.map(d => ({
            date: yearToDate(d.year),
            value: d.knee,
          })),
        },
        {
          id: 'hip',
          label: 'Hip replacements',
          colour: '#264653',
          data: data.waitingList.map(d => ({
            date: yearToDate(d.year),
            value: d.hip,
          })),
        },
      ]
    : [];

  const medianWaitSeries: Series[] = data
    ? [{
        id: 'median-wait',
        label: 'Median wait (weeks)',
        colour: '#E63946',
        data: data.medianWaitWeeks.map(d => ({
          date: yearToDate(d.year),
          value: d.weeks,
        })),
      }]
    : [];

  const proceduresSeries: Series[] = data
    ? [{
        id: 'procedures',
        label: 'Procedures performed',
        colour: '#2A9D8F',
        data: data.proceduresPerformed.map(d => ({
          date: yearToDate(d.year),
          value: d.total,
        })),
      }]
    : [];

  // ── Derived values ────────────────────────────────────────────────────

  const latestWaiting = data?.waitingList[data.waitingList.length - 1];
  const preCovidWaiting = data?.waitingList.find(d => d.year === 2019);
  const latestMedian = data?.medianWaitWeeks[data.medianWaitWeeks.length - 1];
  const preCovidMedian = data?.medianWaitWeeks.find(d => d.year === 2019);
  const latestProcedures = data?.proceduresPerformed[data.proceduresPerformed.length - 1];
  const preCovidProcedures = data?.proceduresPerformed.find(d => d.year === 2019);

  const waitingListAnnotations: Annotation[] = [
    { date: new Date(2020, 2, 1), label: "2020: Elective surgery halted" },
    { date: new Date(2022, 1, 1), label: "2022: Elective recovery plan launched" },
  ];

  const medianWaitAnnotations: Annotation[] = [
    { date: new Date(2020, 2, 1), label: "2020: COVID cancellations" },
  ];

  const proceduresAnnotations: Annotation[] = [
    { date: new Date(2020, 2, 1), label: "2020: Theatres closed" },
    { date: new Date(2022, 1, 1), label: "2022: Recovery programme" },
  ];

  return (
    <>
      <TopicNav topic="Hip & Knee Replacement Waits" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Hip & Knee Replacement Waits"
          question="Why Are 780,000 People Waiting for a Hip or Knee Replacement?"
          finding="The combined hip and knee replacement backlog stands at 780,000 — up from 197,000 before COVID. The median wait is now over a year. Behind every number is a person in chronic pain, unable to work, walk, or sleep without discomfort."
          colour="#E63946"
          preposition="with"
        />

        {/* ── Editorial context ────────────────────────────────────────── */}
        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Hip and knee replacements are among the most common elective surgeries in England, and among the most life-changing. For the roughly 200,000 people who received one each year before the pandemic, the operation typically meant the end of years of worsening pain and the return of basic mobility — climbing stairs, walking to the shops, sleeping through the night. The NHS waiting list for these two procedures alone now stands at 780,000, a figure that has more than quadrupled since 2019. The median wait has stretched from under 15 weeks to over a year. For patients in the South West, it is closer to 14 months.
            </p>
            <p>
              The collapse began in March 2020, when all non-urgent elective surgery was suspended to free hospital capacity for COVID-19. In the first year of the pandemic, hip and knee replacements fell by 60% — from 195,000 annual procedures to just 78,000. The backlog that had been building slowly for years became an avalanche. Orthopaedic theatre capacity has still not fully recovered: infection control measures reduced the number of operations per session, staff shortages have constrained lists, and the independent sector — which now performs around a third of NHS-funded joint replacements — cannot absorb the scale of unmet demand. The 2022 Elective Recovery Plan pledged to eliminate waits over 18 months, but the 18-week standard that patients were once entitled to expect has become a distant memory.
            </p>
            <p>
              The human cost is not abstract. Research published in the BMJ found that patients who wait more than six months for joint replacement experience measurable deterioration — muscle wasting, weight gain from immobility, worsening mental health, and increased use of opioid painkillers. Around one in five patients waiting over a year report that they have had to leave work or reduce their hours. The National Joint Registry data shows that patients who wait longer have worse post-operative outcomes and higher revision rates. There is one significant positive development: procedure volumes in 2025 have exceeded pre-pandemic levels for the first time, reaching an estimated 198,000 operations. If sustained, this rate should begin to reduce the backlog — but at current volumes, clearing the accumulated list would take several years even if no new patients were added.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-backlog', label: 'Backlog' },
          { id: 'sec-wait-times', label: 'Wait times' },
          { id: 'sec-procedures', label: 'Procedures' },
          { id: 'sec-regional', label: 'Regional' },
        ]} />

        {/* ── Metric cards ─────────────────────────────────────────────── */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="People waiting for hip/knee replacement"
            value={latestWaiting ? `${Math.round(latestWaiting.total / 1000)}K` : '780K'}
            unit="England, 2025"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestWaiting && preCovidWaiting
                ? `up from ${Math.round(preCovidWaiting.total / 1000)}K in 2019 · quadrupled since pre-COVID`
                : 'up from 197K in 2019 · quadrupled since pre-COVID'
            }
            sparklineData={
              data ? sparkFrom(data.waitingList.map(d => d.total)) : [152000, 161000, 170000, 183000, 197000, 398000, 576000, 698000, 745000, 780000]
            }
            source="NHS England — Referral to Treatment, Feb 2025"
            href="#sec-backlog"
          />
          <MetricCard
            label="Median wait for joint replacement"
            value={latestMedian ? latestMedian.weeks.toFixed(0) : '52'}
            unit="weeks"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestMedian && preCovidMedian
                ? `up from ${preCovidMedian.weeks.toFixed(0)} weeks in 2019 · 18-week target abandoned`
                : 'up from 15 weeks in 2019 · 18-week target abandoned'
            }
            sparklineData={
              data ? sparkFrom(data.medianWaitWeeks.map(d => d.weeks)) : [11, 12, 13, 15, 30, 43, 48, 50, 51, 52]
            }
            source="NHS England — RTT Statistics, Feb 2025"
            href="#sec-wait-times"
          />
          <MetricCard
            label="Procedures performed annually"
            value={latestProcedures ? `${Math.round(latestProcedures.total / 1000)}K` : '198K'}
            unit="2025 est."
            direction="up"
            polarity="up-is-good"
            changeText={
              latestProcedures && preCovidProcedures
                ? `above pre-COVID level of ${Math.round(preCovidProcedures.total / 1000)}K for first time`
                : 'above pre-COVID level of 195K for first time'
            }
            sparklineData={
              data ? sparkFrom(data.proceduresPerformed.map(d => d.total)) : [182000, 186000, 190000, 192000, 195000, 78000, 112000, 155000, 170000, 198000]
            }
            source="NHS England — Hospital Episode Statistics, 2024/25"
            href="#sec-procedures"
          />
        </div>

        {/* ── Chart 1: Waiting list backlog ─────────────────────────────── */}
        <ScrollReveal>
          <div id="sec-backlog" className="mb-12">
            <LineChart
              series={waitingListSeries}
              title="People waiting for hip or knee replacement, England, 2015-2025"
              subtitle="Combined waiting list with breakdown by joint type. Elective surgery suspended March 2020."
              yLabel="Patients waiting"
              annotations={waitingListAnnotations}
              source={{
                name: 'NHS England',
                dataset: 'Referral to Treatment Waiting Times',
                frequency: 'monthly',
                url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/referral-to-treatment-waiting-times/',
                date: 'Feb 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* ── Chart 2: Median wait times ────────────────────────────────── */}
        <ScrollReveal>
          <div id="sec-wait-times" className="mb-12">
            <LineChart
              series={medianWaitSeries}
              title="Median wait for elective hip/knee replacement, 2015-2025"
              subtitle="Weeks from GP referral to surgery. The 18-week NHS standard is shown as target."
              yLabel="Weeks"
              annotations={medianWaitAnnotations}
              targetLine={{ value: 18, label: '18-week RTT standard' }}
              source={{
                name: 'NHS England',
                dataset: 'Referral to Treatment Statistics',
                frequency: 'monthly',
                url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/referral-to-treatment-waiting-times/',
                date: 'Feb 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* ── Chart 3: Procedures performed ─────────────────────────────── */}
        <ScrollReveal>
          <div id="sec-procedures" className="mb-12">
            <LineChart
              series={proceduresSeries}
              title="Hip and knee replacements performed annually, England, 2015-2025"
              subtitle="Total procedures fell 60% in 2020. Volumes have now exceeded pre-pandemic levels."
              yLabel="Procedures"
              annotations={proceduresAnnotations}
              targetLine={{ value: 195000, label: 'Pre-COVID level (195K)' }}
              source={{
                name: 'NHS England',
                dataset: 'Hospital Episode Statistics — Admitted Patient Care',
                frequency: 'annual',
                url: 'https://digital.nhs.uk/data-and-information/publications/statistical/hospital-episode-statistics-for-admitted-patient-care-outpatient-and-accident-and-emergency-data',
                date: 'Jan 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* ── Regional variation ────────────────────────────────────────── */}
        <ScrollReveal>
          <div id="sec-regional" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Median wait for joint replacement by NHS region (weeks)
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                Patients in the South West wait 30% longer than those in London. Regional variation reflects differences in theatre capacity, consultant numbers, and independent sector availability.
              </p>
              <div className="mt-6 space-y-4">
                {data?.byRegion.map((r) => {
                  const pct = (r.medianWeeks / 65) * 100;
                  const isAboveTarget = r.medianWeeks > 52;
                  return (
                    <div key={r.region}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{r.region}</span>
                        <span className="font-mono text-sm font-bold text-wiah-black">
                          {r.medianWeeks}
                        </span>
                      </div>
                      <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{
                            width: `${pct}%`,
                            backgroundColor: isAboveTarget ? '#E63946' : '#6B7280',
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">
                Source: NHS England — Referral to Treatment by Provider, Feb 2025. Red bars indicate median wait exceeding one year.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Positive callout ─────────────────────────────────────────── */}
        <ScrollReveal>
          <PositiveCallout
            title="Procedure volumes exceed pre-pandemic levels for the first time"
            value="198,000"
            unit="operations in 2024/25"
            description="Annual hip and knee replacement volumes have reached an estimated 198,000 — exceeding the pre-pandemic level of 195,000 for the first time. This recovery has been driven by expanded use of independent sector capacity, surgical hubs dedicated to high-volume joint replacement, and the adoption of day-case and short-stay pathways. The Getting It Right First Time (GIRFT) programme has helped standardise best practice across trusts. If current volumes are sustained, the backlog should begin to reduce — though clearing the accumulated list will take years of consistent above-baseline throughput."
            source="Source: NHS England — Hospital Episode Statistics, 2024/25. National Joint Registry 21st Annual Report."
          />
        </ScrollReveal>

        {/* ── Sources & methodology ────────────────────────────────────── */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p>
              <a href="https://www.england.nhs.uk/statistics/statistical-work-areas/referral-to-treatment-waiting-times/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — Referral to Treatment Waiting Times</a> — monthly RTT data by treatment function. Orthopaedic waiting list figures derived from trauma and orthopaedic specialty codes.
            </p>
            <p>
              <a href="https://digital.nhs.uk/data-and-information/publications/statistical/hospital-episode-statistics-for-admitted-patient-care-outpatient-and-accident-and-emergency-data" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS Digital — Hospital Episode Statistics</a> — admitted patient care data for hip and knee replacement procedure codes (OPCS W37-W42, W46-W48).
            </p>
            <p>
              <a href="https://reports.njrcentre.org.uk/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">National Joint Registry — 21st Annual Report</a> — procedure volumes, revision rates, and patient outcomes data.
            </p>
            <p>
              All figures are for England unless otherwise stated. Waiting list totals combine primary hip and knee replacement pathways. Median wait is calculated from clock start to admission. Regional breakdowns use NHS England commissioning regions. Trend data uses the most recent available release at time of publication.
            </p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
