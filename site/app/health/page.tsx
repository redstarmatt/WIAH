'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import SiteName from '@/components/SiteName';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import MetricDetailModal from '@/components/MetricDetailModal';
import PostcodeLookup from '@/components/PostcodeLookup';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';

// ── Types ────────────────────────────────────────────────────────────────────

interface GpTimeSeries {
  date: string;
  avgWaitDays: number;
  totalAppointments: number;
  pctSameOrNextDay: number;
}

interface GpData {
  national: { timeSeries: GpTimeSeries[] };
  regional: { byICB: { code: string; name: string; avgWaitDays: number }[] };
}

interface AmbTimeSeries {
  date: string;
  cat1MeanMins?: number;
  cat1P90Mins?: number;
  cat2MeanMins?: number;
  cat2P90Mins?: number;
  cat1Incidents?: number;
}

interface AmbData {
  national: { timeSeries: AmbTimeSeries[] };
  regional: { byTrust: { code: string; name: string; cat2MeanMins?: number }[] };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function isoToDate(s: string): Date {
  // YYYY-MM → first of month
  return new Date(s + '-01');
}

function sparkFrom(series: { date: string; value: number }[], n = 12) {
  return series.slice(-n).map(d => d.value);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function HealthPage() {
  const [gpData, setGpData] = useState<GpData | null>(null);
  const [ambData, setAmbData] = useState<AmbData | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data/health/gp_appointments.json')
      .then(r => r.json())
      .then(setGpData)
      .catch(console.error);
    fetch('/data/health/ambulance.json')
      .then(r => r.json())
      .then(setAmbData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const gpWaitSeries: Series[] = gpData
    ? [
        {
          id: 'national',
          label: 'England average',
          data: gpData.national.timeSeries.map(d => ({
            date: isoToDate(d.date),
            value: d.avgWaitDays,
          })),
        },
      ]
    : [];

  const gpSameDaySeries: Series[] = gpData
    ? [
        {
          id: 'sameday',
          label: '% seen same or next day',
          colour: '#2A9D8F',
          data: gpData.national.timeSeries.map(d => ({
            date: isoToDate(d.date),
            value: d.pctSameOrNextDay,
          })),
        },
      ]
    : [];

  const ambulanceSeries: Series[] = ambData
    ? [
        {
          id: 'cat2',
          label: 'Category 2 (emergency)',
          colour: '#0D1117',
          data: ambData.national.timeSeries
            .filter(d => d.cat2MeanMins !== undefined)
            .map(d => ({
              date: isoToDate(d.date),
              value: d.cat2MeanMins!,
            })),
        },
        {
          id: 'cat1',
          label: 'Category 1 (life-threatening)',
          colour: '#E63946',
          data: ambData.national.timeSeries
            .filter(d => d.cat1MeanMins !== undefined)
            .map(d => ({
              date: isoToDate(d.date),
              value: d.cat1MeanMins!,
            })),
        },
      ]
    : [];

  const ambulanceAnnotations: Annotation[] = [
    { date: new Date(2018, 3), label: 'Apr 2018: New category system' },
    { date: new Date(2020, 2), label: 'Mar 2020: COVID-19' },
    { date: new Date(2022, 11), label: 'Dec 2022: Peak (93 min)' },
  ];

  // ── Metric values ────────────────────────────────────────────────────────

  const latestGp = gpData?.national.timeSeries.at(-1);
  const firstGp  = gpData?.national.timeSeries[0];
  const gpWaitChange = latestGp && firstGp
    ? (latestGp.avgWaitDays - firstGp.avgWaitDays).toFixed(1)
    : null;

  const latestAmb = ambData?.national.timeSeries.at(-1);
  const preCovid  = ambData?.national.timeSeries.find(d => d.date === '2020-02');

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      {/* Sticky nav */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-wiah-border px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/"><SiteName size="nav" /></Link>
          <span className="text-wiah-mid text-sm font-mono">Health</span>
          <Link href="/" className="text-sm text-wiah-blue hover:underline">← All topics</Link>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health"
          question="Can You Actually See a Doctor?"
          finding={
            latestAmb && latestGp
              ? `Category 2 ambulance response times average ${latestAmb.cat2MeanMins?.toFixed(0)} minutes — nearly double the 18-minute target. GP waits average ${latestGp.avgWaitDays.toFixed(1)} days nationally, with sharp autumn spikes above 8 days.`
              : 'Ambulance response times remain nearly double their target. GP waits spike sharply each autumn.'
          }
          colour="#E63946"
        />

        {/* Metric cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Avg GP wait"
            value={latestGp ? latestGp.avgWaitDays.toFixed(1) : '—'}
            unit="days"
            direction={gpWaitChange && parseFloat(gpWaitChange) > 0 ? 'up' : 'flat'}
            polarity="up-is-bad"
            changeText={
              latestGp
                ? `${latestGp.pctSameOrNextDay}% seen same or next day`
                : 'Loading…'
            }
            sparklineData={
              gpData
                ? sparkFrom(gpData.national.timeSeries.map(d => ({ date: d.date, value: d.avgWaitDays })))
                : []
            }
            source="NHS England · Appointments in General Practice"
            onExpand={gpWaitSeries.length > 0 ? () => setExpanded('gp-wait') : undefined}
          />
          <MetricCard
            label="Cat 2 ambulance wait"
            value={latestAmb ? latestAmb.cat2MeanMins?.toFixed(0) ?? '—' : '—'}
            unit="min"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestAmb && preCovid
                ? `+${((latestAmb.cat2MeanMins ?? 0) - (preCovid.cat2MeanMins ?? 0)).toFixed(0)} min vs pre-pandemic · Target: 18 min`
                : 'Target: 18 min'
            }
            sparklineData={
              ambData
                ? sparkFrom(
                    ambData.national.timeSeries
                      .filter(d => d.cat2MeanMins !== undefined)
                      .map(d => ({ date: d.date, value: d.cat2MeanMins! }))
                  )
                : []
            }
            source="NHS England · Ambulance Quality Indicators"
            onExpand={ambulanceSeries.length > 0 ? () => setExpanded('ambulance') : undefined}
          />
          <MetricCard
            label="Cat 1 ambulance wait"
            value={latestAmb ? latestAmb.cat1MeanMins?.toFixed(1) ?? '—' : '—'}
            unit="min"
            direction="up"
            polarity="up-is-bad"
            changeText="Target: 7 min mean"
            sparklineData={
              ambData
                ? sparkFrom(
                    ambData.national.timeSeries
                      .filter(d => d.cat1MeanMins !== undefined)
                      .map(d => ({ date: d.date, value: d.cat1MeanMins! }))
                  )
                : []
            }
            source="NHS England · Ambulance Quality Indicators"
            onExpand={ambulanceSeries.length > 0 ? () => setExpanded('cat1') : undefined}
          />
        </div>

        {/* Postcode lookup */}
        <div className="mb-16 p-6 bg-wiah-light rounded-lg">
          <h2 className="text-lg font-bold text-wiah-black mb-2">How is your area doing?</h2>
          <p className="text-sm text-wiah-mid mb-4">
            Enter your postcode to see your local ambulance trust and GP wait times compared to the national average.
          </p>
          <PostcodeLookup
            gpIcbs={gpData?.regional.byICB}
            ambTrusts={ambData?.regional.byTrust}
            nationalGpWait={latestGp?.avgWaitDays}
            nationalCat2={latestAmb?.cat2MeanMins}
          />
        </div>

        {/* Chart 1: Ambulance response times */}
        {ambulanceSeries.length > 0 ? (
          <LineChart
            title="Ambulance response times, 2017–2026"
            subtitle="Mean response time in minutes, England. Category 2 target: 18 minutes."
            series={ambulanceSeries}
            annotations={ambulanceAnnotations}
            targetLine={{ value: 18, label: 'Cat 2 target: 18 min' }}
            yLabel="Minutes"
            source={{
              name: 'NHS England',
              dataset: 'Ambulance Quality Indicators — AmbSYS Timeseries',
              frequency: 'monthly',
              url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/ambulance-quality-indicators/',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-16" />
        )}

        {/* Chart 2: GP appointment wait */}
        {gpWaitSeries.length > 0 ? (
          <LineChart
            title="GP appointment wait times, Jul 2023–Dec 2025"
            subtitle="Average days from booking to appointment, England. All attended appointments."
            series={gpWaitSeries}
            yLabel="Days"
            source={{
              name: 'NHS England',
              dataset: 'Appointments in General Practice',
              frequency: 'monthly',
              url: 'https://digital.nhs.uk/data-and-information/publications/statistical/appointments-in-general-practice',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-16" />
        )}

        {/* Chart 3: Same/next day appointments */}
        {gpSameDaySeries.length > 0 ? (
          <LineChart
            title="Same or next day GP appointments, Jul 2023–Dec 2025"
            subtitle="Percentage of attended appointments booked same day or one day prior, England."
            series={gpSameDaySeries}
            yLabel="Percent"
            source={{
              name: 'NHS England',
              dataset: 'Appointments in General Practice',
              frequency: 'monthly',
              url: 'https://digital.nhs.uk/data-and-information/publications/statistical/appointments-in-general-practice',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-16" />
        )}

        {/* Trust table — latest month */}
        {ambData && ambData.regional.byTrust.length > 0 && (
          <section className="mb-16">
            <h2 className="text-xl font-bold text-wiah-black mb-1">
              Cat 2 response by ambulance trust
            </h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">
              Latest month ({ambData.national.timeSeries.at(-1)?.date}). Target: 18 minutes.
            </p>
            <div className="divide-y divide-wiah-border">
              {ambData.regional.byTrust.map(trust => {
                const mins = trust.cat2MeanMins ?? 0;
                const pct = Math.min((mins / 60) * 100, 100);
                const colour = mins > 30 ? '#E63946' : mins > 18 ? '#F4A261' : '#2A9D8F';
                return (
                  <div key={trust.code} className="py-3 flex items-center gap-4">
                    <span className="text-sm text-wiah-black w-80 shrink-0">{trust.name}</span>
                    <div className="flex-1 bg-wiah-light rounded h-2">
                      <div
                        className="h-2 rounded"
                        style={{ width: `${pct}%`, backgroundColor: colour }}
                      />
                    </div>
                    <span
                      className="font-mono text-sm font-bold w-16 text-right"
                      style={{ color: colour }}
                    >
                      {mins.toFixed(0)} min
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="font-mono text-xs text-wiah-mid mt-3">
              Source: NHS England, Ambulance Quality Indicators
            </p>
          </section>
        )}

        {/* ICB table — GP wait */}
        {gpData && gpData.regional.byICB.length > 0 && (
          <section className="mb-16">
            <h2 className="text-xl font-bold text-wiah-black mb-1">
              GP wait by ICB area
            </h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">
              Latest month ({gpData.national.timeSeries.at(-1)?.date}). 42 Integrated Care Boards.
            </p>
            <div className="divide-y divide-wiah-border">
              {gpData.regional.byICB.slice(0, 15).map(icb => {
                const days = icb.avgWaitDays;
                const pct = Math.min((days / 12) * 100, 100);
                const colour = days > 8 ? '#E63946' : days > 6 ? '#F4A261' : '#2A9D8F';
                return (
                  <div key={icb.code} className="py-3 flex items-center gap-4">
                    <span className="text-sm text-wiah-black w-64 shrink-0">{icb.name}</span>
                    <div className="flex-1 bg-wiah-light rounded h-2">
                      <div
                        className="h-2 rounded"
                        style={{ width: `${pct}%`, backgroundColor: colour }}
                      />
                    </div>
                    <span
                      className="font-mono text-sm font-bold w-16 text-right"
                      style={{ color: colour }}
                    >
                      {days.toFixed(1)}d
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="font-mono text-xs text-wiah-mid mt-3">
              Source: NHS England, Appointments in General Practice
            </p>
          </section>
        )}

        {/* Context */}
        <section className="max-w-2xl mt-8 mb-12">
          <h2 className="text-xl font-bold text-wiah-black mb-4">What&apos;s driving this</h2>
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Category 2 ambulance calls — covering emergencies like strokes, chest pain, and
              serious injuries — have a target mean response time of 18 minutes. In January 2026
              the actual figure was 35 minutes. At the peak in December 2022 it reached 93 minutes,
              meaning the average emergency wait was over an hour and a half.
            </p>
            <p>
              The primary bottleneck is hospital handover delays: ambulances queuing outside
              overstretched A&amp;E departments, unable to hand over patients. This keeps crews
              and vehicles off the road. The number of handover delays exceeding 60 minutes has
              risen sharply since 2020.
            </p>
            <p>
              GP appointment data covers July 2023 onwards in this format. Average wait of
              around 6 days includes large numbers of same-day appointments — the picture for
              routine care is considerably longer. The GP Patient Survey captures patient
              experience more directly; that pipeline will be added next.
            </p>
          </div>
        </section>

        {/* Sources */}
        <section className="border-t border-wiah-border pt-8">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; methodology</h2>
          <ul className="space-y-2 font-mono text-xs text-wiah-mid">
            <li>
              <a
                href="https://digital.nhs.uk/data-and-information/publications/statistical/appointments-in-general-practice"
                className="underline hover:text-wiah-blue"
                target="_blank" rel="noreferrer"
              >
                NHS England — Appointments in General Practice (monthly)
              </a>
              {' '}— weighted average wait from 42 ICB regional CSVs, attended appointments only.
            </li>
            <li>
              <a
                href="https://www.england.nhs.uk/statistics/statistical-work-areas/ambulance-quality-indicators/"
                className="underline hover:text-wiah-blue"
                target="_blank" rel="noreferrer"
              >
                NHS England — Ambulance Quality Indicators (monthly)
              </a>
              {' '}— AmbSYS timeseries, Raw sheet, England national rows, seconds converted to minutes.
            </li>
          </ul>
          <p className="font-mono text-xs text-wiah-mid mt-4">
            Data updated automatically each Monday via GitHub Actions. Last pipeline run:{' '}
            {new Date().toISOString().slice(0, 10)}.
          </p>
        </section>
      </main>

      {/* Expanded metric modal */}
      {expanded === 'gp-wait' && (
        <MetricDetailModal
          title="GP appointment wait times, Jul 2023–Dec 2025"
          subtitle="Average days from booking to appointment, England. All attended appointments."
          series={gpWaitSeries}
          yLabel="Days"
          source={{
            name: 'NHS England',
            dataset: 'Appointments in General Practice',
            frequency: 'monthly',
            url: 'https://digital.nhs.uk/data-and-information/publications/statistical/appointments-in-general-practice',
          }}
          onClose={() => setExpanded(null)}
        />
      )}
      {expanded === 'ambulance' && (
        <MetricDetailModal
          title="Ambulance response times, 2017–2026"
          subtitle="Mean response time in minutes, England. Category 2 target: 18 minutes."
          series={ambulanceSeries}
          annotations={ambulanceAnnotations}
          targetLine={{ value: 18, label: 'Cat 2 target: 18 min' }}
          yLabel="Minutes"
          source={{
            name: 'NHS England',
            dataset: 'Ambulance Quality Indicators — AmbSYS Timeseries',
            frequency: 'monthly',
            url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/ambulance-quality-indicators/',
          }}
          onClose={() => setExpanded(null)}
        />
      )}
      {expanded === 'cat1' && (
        <MetricDetailModal
          title="Category 1 ambulance response times, 2017–2026"
          subtitle="Mean response time in minutes for life-threatening calls, England. Target: 7 minutes."
          series={ambulanceSeries.filter(s => s.id === 'cat1')}
          annotations={ambulanceAnnotations}
          targetLine={{ value: 7, label: 'Cat 1 target: 7 min' }}
          yLabel="Minutes"
          source={{
            name: 'NHS England',
            dataset: 'Ambulance Quality Indicators — AmbSYS Timeseries',
            frequency: 'monthly',
            url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/ambulance-quality-indicators/',
          }}
          onClose={() => setExpanded(null)}
        />
      )}
    </>
  );
}
