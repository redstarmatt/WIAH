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
  patients: number;
}

interface AvgWaitPoint {
  year: number;
  weeks: number;
}

interface PrevalencePoint {
  year: number;
  millionsAffected: number;
}

interface ScreeningPoint {
  year: number;
  coveragePercent: number;
  referralRate: number;
}

interface RegionData {
  region: string;
  avgWaitWeeks: number;
}

interface AudiologyData {
  waitingList: WaitingListPoint[];
  averageWaitWeeks: AvgWaitPoint[];
  hearingLossPrevalence: PrevalencePoint[];
  newbornScreening: ScreeningPoint[];
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

export default function AudiologyWaitsPage() {
  const [data, setData] = useState<AudiologyData | null>(null);

  useEffect(() => {
    fetch('/data/audiology-waits/audiology_waits.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const waitingListSeries: Series[] = data
    ? [{
        id: 'waiting-list',
        label: 'Patients waiting for audiology assessment',
        colour: '#E63946',
        data: data.waitingList.map(d => ({
          date: yearToDate(d.year),
          value: d.patients,
        })),
      }]
    : [];

  const avgWaitSeries: Series[] = data
    ? [{
        id: 'avg-wait',
        label: 'Average wait (weeks)',
        colour: '#E63946',
        data: data.averageWaitWeeks.map(d => ({
          date: yearToDate(d.year),
          value: d.weeks,
        })),
      }]
    : [];

  const prevalenceSeries: Series[] = data
    ? [{
        id: 'prevalence',
        label: 'People with hearing loss (millions)',
        colour: '#264653',
        data: data.hearingLossPrevalence.map(d => ({
          date: yearToDate(d.year),
          value: d.millionsAffected,
        })),
      }]
    : [];

  const waitingListAnnotations: Annotation[] = [
    { date: new Date(2020, 2, 1), label: "2020: COVID suspends routine referrals" },
    { date: new Date(2021, 3, 1), label: "2021: RTT clock-start rules change" },
  ];

  const avgWaitAnnotations: Annotation[] = [
    { date: new Date(2018, 0, 1), label: "2018: 6-week standard effectively dropped" },
    { date: new Date(2020, 2, 1), label: "2020: COVID backlog begins" },
  ];

  const prevalenceAnnotations: Annotation[] = [
    { date: new Date(2022, 0, 1), label: "2022: WHO warns of rising hearing loss globally" },
  ];

  // ── Derived values ────────────────────────────────────────────────────

  const latestWaiting = data?.waitingList[data.waitingList.length - 1];
  const earliestWaiting = data?.waitingList[0];
  const latestAvgWait = data?.averageWaitWeeks[data.averageWaitWeeks.length - 1];
  const latestPrevalence = data?.hearingLossPrevalence[data.hearingLossPrevalence.length - 1];
  const latestScreening = data?.newbornScreening[data.newbornScreening.length - 1];

  return (
    <>
      <TopicNav topic="Audiology Waits" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Audiology Waits"
          question="Why Are 1.6 Million People Waiting for a Hearing Assessment?"
          finding="Audiology has the longest waiting list relative to capacity in the NHS. 1.6 million people are waiting, average waits have nearly quadrupled since 2015, and the old six-week access standard has been quietly abandoned."
          colour="#E63946"
          preposition="with"
        />

        {/* ── Editorial context ──────────────────────────────────────────── */}
        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Hearing is one of those things most people do not think about until it fails. But 12 million people in England now live with some degree of hearing loss, and for the 1.6 million stuck on NHS audiology waiting lists, the consequences are not abstract. Untreated hearing loss is linked to social isolation, depression, cognitive decline, and a significantly elevated risk of dementia. The Lancet Commission on Dementia identified hearing loss as the single largest modifiable risk factor for the disease, accounting for more attributable cases than smoking, physical inactivity, or hypertension. Yet audiology remains one of the most under-resourced specialties in the NHS, with waits that would be considered scandalous in almost any other clinical area.</p>
            <p>The numbers are stark. In 2015, the average wait from GP referral to first audiology appointment was 8.2 weeks. By 2025 that figure has reached 32 weeks, nearly quadrupling in a decade. The old six-week access standard, once the benchmark for diagnostic audiology, has not been formally revoked but is met by almost no trust in England. The South West has the longest waits at 42 weeks on average, while London performs best at 26 weeks, though even that figure would have been considered a crisis a decade ago. COVID accelerated an existing trajectory rather than creating it: routine referrals were suspended in early 2020, and the backlog that built up during the pandemic was layered on top of a system already struggling with chronic underinvestment in audiology workforce and equipment.</p>
            <p>There is one genuinely positive story in this data. The Newborn Hearing Screening Programme, which screens babies within weeks of birth for congenital hearing loss, has maintained coverage above 98% even through the pandemic. Early identification of hearing loss in children transforms outcomes, enabling language development to proceed on track when intervention comes early enough. The programme is a model of effective public health screening that other countries have sought to replicate. But the contrast is telling: the system that finds hearing problems early works well; the system that is supposed to treat them does not.</p>
          </div>
        </section>

        {/* ── Section navigation ─────────────────────────────────────────── */}
        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-waiting-list', label: 'Waiting list' },
          { id: 'sec-wait-times', label: 'Wait times' },
          { id: 'sec-prevalence', label: 'Hearing loss' },
          { id: 'sec-regional', label: 'Regional' },
        ]} />

        {/* ── Metric cards ───────────────────────────────────────────────── */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Patients waiting for audiology assessment"
            value={latestWaiting ? (latestWaiting.patients / 1000000).toFixed(1) + "M" : "1.6M"}
            unit="2025"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestWaiting && earliestWaiting
                ? `Up from ${(earliestWaiting.patients / 1000).toFixed(0)}k in ${earliestWaiting.year} · longest backlog in NHS`
                : "Up from 420k in 2015 · longest backlog in NHS"
            }
            sparklineData={
              data ? sparkFrom(data.waitingList.map(d => d.patients)) : []
            }
            source="NHS England — RTT Statistics, Feb 2025"
            href="#sec-waiting-list"
          />
          <MetricCard
            label="Average wait for hearing aid fitting"
            value={latestAvgWait ? latestAvgWait.weeks.toFixed(0) : "32"}
            unit="weeks"
            direction="up"
            polarity="up-is-bad"
            changeText={`Up from 8 weeks in 2015 · 6-week standard long abandoned`}
            sparklineData={
              data ? sparkFrom(data.averageWaitWeeks.map(d => d.weeks)) : []
            }
            source="NHS England — RTT Statistics, Feb 2025"
            href="#sec-wait-times"
          />
          <MetricCard
            label="People living with hearing loss"
            value={latestPrevalence ? latestPrevalence.millionsAffected.toFixed(1) + "M" : "12.0M"}
            unit="2025"
            direction="up"
            polarity="up-is-bad"
            changeText="Rising with ageing population · projected to reach 14.2M by 2035"
            sparklineData={
              data ? sparkFrom(data.hearingLossPrevalence.map(d => d.millionsAffected)) : []
            }
            source="RNID — Hearing Matters Report, 2025"
            href="#sec-prevalence"
          />
        </div>

        {/* ── Chart 1: Waiting list growth ───────────────────────────────── */}
        <ScrollReveal>
          <div id="sec-waiting-list" className="mb-12">
            <LineChart
              series={waitingListSeries}
              title="Patients waiting for NHS audiology assessment, England, 2015–2025"
              subtitle="Total patients on audiology RTT waiting list. COVID suspended referrals in 2020; the backlog has not recovered."
              yLabel="Patients"
              annotations={waitingListAnnotations}
              source={{
                name: 'NHS England',
                dataset: 'Referral to Treatment Waiting Times — Audiology',
                frequency: 'monthly',
                url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/referral-to-treatment-waiting-times/',
                date: 'Feb 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* ── Chart 2: Average wait time ─────────────────────────────────── */}
        <ScrollReveal>
          <div id="sec-wait-times" className="mb-12">
            <LineChart
              series={avgWaitSeries}
              title="Average wait from referral to audiology appointment, England, 2015–2025"
              subtitle="Mean weeks from GP referral to first audiology assessment. The 6-week standard has not been met nationally since 2017."
              yLabel="Weeks"
              annotations={avgWaitAnnotations}
              targetLine={{ value: 6, label: "6-week access standard" }}
              source={{
                name: 'NHS England',
                dataset: 'Diagnostic Waiting Times and Activity',
                frequency: 'monthly',
                url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/diagnostics-waiting-times-and-activity/',
                date: 'Feb 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* ── Chart 3: Hearing loss prevalence ───────────────────────────── */}
        <ScrollReveal>
          <div id="sec-prevalence" className="mb-12">
            <LineChart
              series={prevalenceSeries}
              title="People living with hearing loss in England, 2015–2025"
              subtitle="Estimated population with any degree of hearing loss. Rising steadily as the population ages."
              yLabel="Millions"
              annotations={prevalenceAnnotations}
              source={{
                name: 'RNID (Action on Hearing Loss)',
                dataset: 'Hearing Matters Report',
                frequency: 'biennial',
                url: 'https://rnid.org.uk/about-us/research-and-policy/hearing-loss-statistics/',
                date: '2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* ── Regional variation ──────────────────────────────────────────── */}
        <ScrollReveal>
          <div id="sec-regional" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Average audiology wait by NHS region (weeks)
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                Regional variation is stark. The South West waits nearly twice as long as London.
              </p>
              <div className="mt-6 space-y-4">
                {data?.byRegion.map((r) => {
                  const pct = (r.avgWaitWeeks / 45) * 100;
                  return (
                    <div key={r.region}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{r.region}</span>
                        <span className="font-mono text-sm font-bold text-wiah-black">{r.avgWaitWeeks} wks</span>
                      </div>
                      <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{ width: `${pct}%`, backgroundColor: r.avgWaitWeeks > 35 ? '#E63946' : r.avgWaitWeeks > 30 ? '#F4A261' : '#6B7280' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">Source: NHS England — RTT Waiting Times by Commissioner, Feb 2025</p>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Positive callout ────────────────────────────────────────────── */}
        <ScrollReveal>
          <PositiveCallout
            title="Newborn hearing screening maintains near-universal coverage"
            value="98.4%"
            description="The NHS Newborn Hearing Screening Programme screens babies within weeks of birth for congenital hearing loss. Despite the pandemic and wider NHS pressures, coverage has remained above 96% throughout and stands at 98.4% in the latest data. Early identification transforms outcomes for children born with hearing loss, enabling timely cochlear implantation or hearing aid fitting during the critical window for language development. The programme is internationally regarded as a model for population-level screening and demonstrates that, when properly resourced, hearing services can deliver excellent results."
            source="Source: NHS England — Newborn Hearing Screening Programme Annual Report, 2024/25."
          />
        </ScrollReveal>

        {/* ── Sources & Methodology ──────────────────────────────────────── */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p>
              <a href="https://www.england.nhs.uk/statistics/statistical-work-areas/referral-to-treatment-waiting-times/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — RTT Waiting Times</a> — primary waiting list and wait time data. Retrieved Feb 2025. Updated monthly.
            </p>
            <p>
              <a href="https://www.england.nhs.uk/statistics/statistical-work-areas/diagnostics-waiting-times-and-activity/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — Diagnostic Waiting Times</a> — audiology diagnostic pathway data. Retrieved Feb 2025. Updated monthly.
            </p>
            <p>
              <a href="https://www.gov.uk/government/collections/newborn-hearing-screening-programme" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS Newborn Hearing Screening Programme</a> — coverage and referral data. Retrieved Feb 2025. Updated annually.
            </p>
            <p>
              <a href="https://rnid.org.uk/about-us/research-and-policy/hearing-loss-statistics/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">RNID — Hearing Matters</a> — hearing loss prevalence estimates. Retrieved Feb 2025.
            </p>
            <p className="mt-4">All figures are for England unless otherwise stated. RTT methodology changed in April 2021 (clock-start rules adjusted post-COVID), making pre- and post-2021 figures not directly comparable. Some trusts paused routine audiology referrals during 2020-21, which artificially suppressed waiting list numbers before a surge in 2021-22. Private audiology providers are not captured in NHS waiting list data.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
