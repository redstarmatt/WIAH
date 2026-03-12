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

interface WaitTimePoint {
  quarter: string;
  avgWeeks: number | null;
}

interface PassRatePoint {
  quarter: string;
  passPct: number | null;
}

interface RegionData {
  region: string;
  avgWeeks: number;
}

interface DrivingTestData {
  national: {
    waitTimes: {
      timeSeries: WaitTimePoint[];
      latestWeeks: number;
      targetWeeks: number;
    };
    passRates: {
      timeSeries: PassRatePoint[];
      latestPct: number;
    };
    queueSize: {
      latest: number;
      prePandemic: number;
    };
  };
  regional: {
    byRegion: RegionData[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function quarterToDate(q: string): Date {
  const [year, qtr] = q.split('-');
  const month = (parseInt(qtr.replace('Q', '')) - 1) * 3;
  return new Date(parseInt(year), month, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function DrivingTestBacklogPage() {
  const [data, setData] = useState<DrivingTestData | null>(null);

  useEffect(() => {
    fetch('/data/driving-test-backlog/driving_test_backlog.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const waitTimeSeries: Series[] = data
    ? [{
        id: 'wait-time',
        label: 'Average wait (weeks)',
        colour: '#F4A261',
        data: data.national.waitTimes.timeSeries
          .filter(d => d.avgWeeks !== null)
          .map(d => ({
            date: quarterToDate(d.quarter),
            value: d.avgWeeks as number,
          })),
      }]
    : [];

  const targetSeries: Series[] = data
    ? [{
        id: 'target',
        label: 'DVSA target (9 weeks)',
        colour: '#2A9D8F',
        data: data.national.waitTimes.timeSeries
          .filter(d => d.avgWeeks !== null)
          .map(d => ({
            date: quarterToDate(d.quarter),
            value: data.national.waitTimes.targetWeeks,
          })),
      }]
    : [];

  const passRateSeries: Series[] = data
    ? [{
        id: 'pass-rate',
        label: 'Pass rate (%)',
        colour: '#6B7280',
        data: data.national.passRates.timeSeries
          .filter(d => d.passPct !== null)
          .map(d => ({
            date: quarterToDate(d.quarter),
            value: d.passPct as number,
          })),
      }]
    : [];

  const waitAnnotations: Annotation[] = [
    { date: new Date(2020, 2, 1), label: '2020: Testing suspended (COVID)' },
    { date: new Date(2024, 0, 1), label: '2024: 300 new examiner posts opened' },
  ];

  const passRateAnnotations: Annotation[] = [
    { date: new Date(2020, 2, 1), label: '2020: Testing suspended' },
  ];

  const latestWait = data?.national.waitTimes.latestWeeks;
  const latestPassRate = data?.national.passRates.latestPct;
  const queueSize = data?.national.queueSize.latest;
  const prePandemicQueue = data?.national.queueSize.prePandemic;

  const waitSparkline = data
    ? sparkFrom(
        data.national.waitTimes.timeSeries
          .filter(d => d.avgWeeks !== null)
          .map(d => d.avgWeeks as number)
      )
    : [];

  const passRateSparkline = data
    ? sparkFrom(
        data.national.passRates.timeSeries
          .filter(d => d.passPct !== null)
          .map(d => d.passPct as number)
      )
    : [];

  const maxRegionalWeeks = data
    ? Math.max(...data.regional.byRegion.map(r => r.avgWeeks))
    : 24;

  return (
    <>
      <TopicNav topic="Transport" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Transport"
          question="Can You Actually Learn to Drive?"
          finding="The average wait for a practical driving test is 17 weeks — nearly double the DVSA's 9-week target. Around 1.5 million people are in the queue at any time, and pass rates have fallen from 47% to 43% since 2019."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Before COVID, the average wait for a practical driving test in England was around 8 weeks. By early 2021 it had passed 22 weeks and it has never returned to normal: the current national average is 17.3 weeks, against a DVSA target of 9. In parts of Wales, the South West, and rural Scotland, waits exceed 20 weeks. Around 1.5 million people are in the testing queue at any one time, up from roughly 820,000 before the pandemic. The backlog was created when approximately 500,000 tests were cancelled during lockdowns, but it persists because DVSA has not been able to recruit and retain enough examiners to clear it. Examiner pay starts at around £27,000 — below the median full-time salary — and the role requires weekend and evening work. DVSA lost examiners during the pandemic and has struggled to replace them at that pay rate. Meanwhile, a cottage industry of test-date reselling has emerged: third-party apps and bots monitor the DVSA booking system for cancellations and charge candidates £20–50 to grab a slot, effectively creating a two-tier system where those who can afford to pay jump ahead of those who cannot.</p>
            <p>The consequences fall hardest on young people. In areas without reliable public transport — much of rural and suburban England — a driving licence is effectively a prerequisite for employment, apprenticeships, and further education. A 17-year-old who fails their test today faces a 17-week wait to retake it, and pass rates have declined from 47% in 2019 to 43.2% in early 2025, possibly reflecting reduced practice hours as driving lessons have risen in cost alongside broader cost-of-living pressures. The theory test pass rate has also fallen. Each failed attempt sends the candidate back to the end of the queue, compounding the delay. For a young person in a small town, that can mean six months or more between first attempt and eventual pass — six months of dependency on parents, missed job opportunities, or expensive provisional insurance. The problem is structural: insufficient examiner capacity meeting sustained high demand, with no mechanism to clear the accumulated backlog faster than new demand replaces it.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-wait-times', label: 'Wait times' },
          { id: 'sec-pass-rates', label: 'Pass rates' },
          { id: 'sec-regional', label: 'Regional' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Average wait for practical test"
            value={latestWait ? `${latestWait}` : '17.3'}
            unit="weeks"
            direction="up"
            polarity="up-is-bad"
            changeText={`Target: ${data?.national.waitTimes.targetWeeks ?? 9} weeks · was 8 weeks pre-pandemic`}
            sparklineData={waitSparkline}
            source="DVSA · Driving test waiting times, Q1 2025"
            href="#sec-wait-times"
          />
          <MetricCard
            label="Tests in queue"
            value={queueSize ? (queueSize / 1000000).toFixed(1) + 'm' : '1.5m'}
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText={`Up from ${prePandemicQueue ? (prePandemicQueue / 1000).toFixed(0) + 'k' : '820k'} pre-pandemic`}
            sparklineData={[]}
            source="DVSA · Driving test statistics, Q1 2025"
            href="#sec-wait-times"
          />
          <MetricCard
            label="Pass rate"
            value={latestPassRate ? `${latestPassRate}` : '43.2'}
            unit="%"
            direction="down"
            polarity="down-is-bad"
            changeText="Was 47% in 2019 · each fail means rejoining the queue"
            sparklineData={passRateSparkline}
            source="DVSA · Driving test pass rates, Q1 2025"
            href="#sec-pass-rates"
          />
        </div>

        {/* Chart 1: Wait times */}
        <ScrollReveal>
          <div id="sec-wait-times" className="mb-12">
            <LineChart
              series={[...waitTimeSeries, ...targetSeries]}
              title="Average waiting time for practical driving test, 2015–2025"
              subtitle="Weeks from booking to first available test date, Great Britain. DVSA target is 9 weeks."
              yLabel="Weeks"
              annotations={waitAnnotations}
              source={{
                name: 'DVSA',
                dataset: 'Driving test waiting times',
                frequency: 'quarterly',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Pass rates */}
        <ScrollReveal>
          <div id="sec-pass-rates" className="mb-12">
            <LineChart
              series={passRateSeries}
              title="Practical driving test pass rate, 2015–2025"
              subtitle="Percentage of tests resulting in a pass. Declined from 47% to 43% since 2019."
              yLabel="Pass rate (%)"
              annotations={passRateAnnotations}
              source={{
                name: 'DVSA',
                dataset: 'Driving test pass rates',
                frequency: 'quarterly',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Regional bar chart */}
        <ScrollReveal>
          <div id="sec-regional" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Average practical test wait time by region (weeks)
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                Rural regions and devolved nations face the longest waits. London benefits from higher test centre density.
              </p>
              <div className="mt-6 space-y-4">
                {data?.regional.byRegion.map((r) => {
                  const pct = (r.avgWeeks / maxRegionalWeeks) * 100;
                  const overTarget = r.avgWeeks > 9;
                  return (
                    <div key={r.region}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{r.region}</span>
                        <span className="font-mono text-sm font-bold text-wiah-black">{r.avgWeeks}</span>
                      </div>
                      <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{
                            width: `${pct}%`,
                            backgroundColor: overTarget ? '#F4A261' : '#2A9D8F',
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">Source: DVSA — Driving test waiting times by region, Q1 2025</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="New examiners and Saturday testing making a dent"
            value="300 posts"
            description="DVSA opened 300 additional examiner posts in 2024 and extended Saturday testing at high-demand centres. Some regions have seen waits fall from 24 weeks to 14 weeks as new examiners qualified. The recruitment drive is the largest in DVSA's history, though retention remains a challenge at current pay levels."
            source="Source: DVSA — Annual Report 2024/25. Driving test waiting times, Q1 2025."
          />
        </ScrollReveal>

        <RelatedTopics />
      </main>
    </>
  );
}
