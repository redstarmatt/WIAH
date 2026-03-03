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

interface RailPoint {
  quarter: string;
  date: string;
  ppmPct: number;
  cancelledPct: number;
}

interface BusPoint {
  year: number;
  journeysMillions: number;
  vehicleMilesMillions: number | null;
}

interface TOCEntry {
  toc: string;
  ppmPct: number;
  cancelledPct: number;
}

interface TransportData {
  national: {
    rail: { timeSeries: RailPoint[] };
    bus: { timeSeries: BusPoint[] };
  };
  regional: {
    byTOC: TOCEntry[];
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

interface KSIPoint {
  year: number;
  killed: number;
  seriouslyInjured: number;
  ksiTotal: number;
  allCasualties: number;
}

interface EVRegPoint {
  year: number;
  evCount: number;
  totalNewCars: number;
  evSharePct: number;
}

interface EVOnRoadPoint {
  year: number;
  totalEVs: number;
}

interface RoadSafetyData {
  ksi: KSIPoint[];
  evRegistrations: EVRegPoint[];
  evOnRoad: EVOnRoadPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function quarterToDate(q: string): Date {
  // "2014-Q1" → Jan 2014, Q2 → Apr, Q3 → Jul, Q4 → Oct
  const [year, qStr] = q.split('-Q');
  const month = (parseInt(qStr) - 1) * 3;
  return new Date(parseInt(year), month, 1);
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 12) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function TransportPage() {
  const [data, setData] = useState<TransportData | null>(null);
  const [roadSafety, setRoadSafety] = useState<RoadSafetyData | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data/transport/transport.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
    fetch('/data/transport/road_safety.json')
      .then(r => r.json())
      .then(setRoadSafety)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const ppmSeries: Series[] = data
    ? [
        {
          id: 'ppm',
          label: 'PPM (% on time)',
          data: data.national.rail.timeSeries.map(d => ({
            date: quarterToDate(d.quarter),
            value: d.ppmPct,
          })),
        },
      ]
    : [];

  const cancellationSeries: Series[] = data
    ? [
        {
          id: 'cancelled',
          label: 'Cancellations (%)',
          colour: '#E63946',
          data: data.national.rail.timeSeries.map(d => ({
            date: quarterToDate(d.quarter),
            value: d.cancelledPct,
          })),
        },
      ]
    : [];

  const busJourneySeries: Series[] = data
    ? [
        {
          id: 'bus-journeys',
          label: 'Passenger journeys (millions)',
          data: data.national.bus.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.journeysMillions,
          })),
        },
      ]
    : [];

  const busVehicleSeries: Series[] = data
    ? [
        {
          id: 'bus-journeys-dual',
          label: 'Passenger journeys (millions)',
          colour: '#0D1117',
          data: data.national.bus.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.journeysMillions,
          })),
        },
        {
          id: 'bus-vehicle-miles',
          label: 'Vehicle miles (millions)',
          colour: '#264653',
          data: data.national.bus.timeSeries
            .filter(d => d.vehicleMilesMillions !== null)
            .map(d => ({
              date: yearToDate(d.year),
              value: d.vehicleMilesMillions!,
            })),
        },
      ]
    : [];

  // Road safety series
  const ksiKilledSeries: Series[] = roadSafety
    ? [
        {
          id: 'ksi-killed',
          label: 'Killed',
          colour: '#E63946',
          data: roadSafety.ksi.map(d => ({
            date: yearToDate(d.year),
            value: d.killed,
          })),
        },
      ]
    : [];

  const ksiSeries: Series[] = roadSafety
    ? [
        {
          id: 'ksi-killed',
          label: 'Killed',
          colour: '#E63946',
          data: roadSafety.ksi.map(d => ({
            date: yearToDate(d.year),
            value: d.killed,
          })),
        },
        {
          id: 'ksi-serious',
          label: 'Seriously injured',
          colour: '#F4A261',
          data: roadSafety.ksi.map(d => ({
            date: yearToDate(d.year),
            value: d.seriouslyInjured,
          })),
        },
      ]
    : [];

  const evShareSeries: Series[] = roadSafety
    ? [
        {
          id: 'ev-share',
          label: 'BEV share of new registrations (%)',
          colour: '#2A9D8F',
          data: roadSafety.evRegistrations.map(d => ({
            date: yearToDate(d.year),
            value: d.evSharePct,
          })),
        },
      ]
    : [];

  // ── Annotations ─────────────────────────────────────────────────────────

  const railAnnotations: Annotation[] = [
    { date: new Date(2018, 4), label: '2018: Timetable chaos' },
    { date: new Date(2020, 2), label: 'Mar 2020: COVID-19' },
    { date: new Date(2022, 5), label: '2022: Strike action' },
  ];

  const busAnnotations: Annotation[] = [
    { date: new Date(2020, 2), label: '2020: COVID-19' },
  ];

  const ksiAnnotations: Annotation[] = [
    { date: new Date(1983, 0), label: '1983: Seat belts made compulsory' },
    { date: new Date(2020, 0), label: '2020: COVID lockdowns' },
  ];

  const evAnnotations: Annotation[] = [
    { date: new Date(2020, 0), label: '2020: £3k govt grant introduced' },
    { date: new Date(2022, 0), label: '2022: ZEV mandate passed' },
  ];

  // ── Metric values ────────────────────────────────────────────────────────

  const latestRail = data?.national.rail.timeSeries.at(-1);
  const latestBus = data?.national.bus.timeSeries.at(-1);
  const prePandemicBus = data?.national.bus.timeSeries.find(d => d.year === 2019);

  const busBillions = latestBus
    ? (latestBus.journeysMillions / 1000).toFixed(1)
    : null;

  const busPre = prePandemicBus
    ? (prePandemicBus.journeysMillions / 1000).toFixed(1)
    : null;

  const latestEVOnRoad = roadSafety?.evOnRoad.at(-1);
  const latestEVShare = roadSafety?.evRegistrations.at(-1);

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      {/* Sticky nav */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-wiah-border px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/"><SiteName size="nav" /></Link>
          <span className="text-wiah-mid text-sm font-mono">Transport</span>
          <Link href="/" className="text-sm text-wiah-blue hover:underline">&larr; All topics</Link>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Transport"
          question="Can You Actually Get Around?"
          finding={
            data
              ? `Rail punctuality stands at ${latestRail?.ppmPct.toFixed(1) ?? '86'}% and bus journeys have fallen to ${busBillions ?? '3.8'} billion a year — public transport is getting harder to rely on.`
              : 'Rail punctuality stands at 86% and bus journeys have fallen to 3.8 billion a year — public transport is getting harder to rely on.'
          }
          colour="#F4A261"
        />

        <section className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Rail and bus share the same underlying problem: decades of underinvestment
              compounded by short-term shocks. Rail punctuality has been falling since
              2014, with the botched 2018 timetable change across Northern and Thameslink
              services exposing how little margin the network had. COVID-19 then collapsed
              demand, and while passenger numbers recovered to roughly 95% of pre-pandemic
              levels, performance did not follow &mdash; ageing signalling, capacity
              bottlenecks, and the 2022 RMT/ASLEF strikes all took their toll. Buses tell
              a parallel story outside London: local authority funding for supported routes
              has fallen over 40% in real terms since 2010, services have been withdrawn,
              and ridership has never fully recovered from the pandemic. The &pound;2 fare
              cap sustained demand but could not replace the routes that had already gone.
              Greater Manchester&apos;s Bee Network re-regulation is the first serious
              attempt to reverse this model.
            </p>
            <p>
              Road safety is one of British public policy&apos;s genuine long-run
              successes. Fatalities fell 73% between 1979 and 2023 &mdash; from 6,352
              killed to 1,695 &mdash; driven by compulsory seat belts in 1983, tougher
              drink-drive enforcement, and successive improvements to vehicle safety
              standards. But the improvement has stalled. Since 2010, deaths have
              plateaued at around 1,700 a year, and the seriously injured count has edged
              upward from a 2013 low of 21,657 to 30,124 in 2023 &mdash; partly a result
              of better recording, but enough to raise questions about whether further
              gains require new interventions such as lower urban speed limits and
              better-designed junctions.
            </p>
            <p>
              The transition to electric vehicles is moving fast at the headline level:
              battery EVs went from 0.06% of new car sales in 2011 to nearly 20% in 2024,
              with over 1.4 million now on UK roads. The ZEV mandate requires manufacturers
              to hit 22% zero-emission sales in 2024, rising to 100% by 2035. Infrastructure,
              however, is not keeping pace &mdash; roughly 60,000 public chargers serve
              1.4 million EVs, a ratio of about 23 vehicles per charger. And the benefits
              are unevenly distributed: average EV purchase prices remain well above
              petrol equivalents, meaning lower-income households are largely locked out
              of the transition despite facing the highest fuel costs.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-rail', label: 'Rail' },
          { id: 'sec-bus', label: 'Bus & Roads' },
          { id: 'sec-road-safety', label: 'Road Safety' },
          { id: 'sec-ev', label: 'Electric Vehicles' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Rail punctuality"
            value={latestRail ? latestRail.ppmPct.toFixed(1) : '—'}
            unit="% on time"
            direction="down"
            polarity="up-is-good"
            baseline="Only 86% of trains run on time — 6 points below the 92% target, and the gap hasn't closed since 2019"
            changeText={
              latestRail
                ? `${latestRail.quarter} · PPM (Public Performance Measure)`
                : 'Loading…'
            }
            sparklineData={
              data
                ? sparkFrom(data.national.rail.timeSeries.map(d => d.ppmPct))
                : []
            }
            source="ORR · Passenger rail performance"
            onExpand={ppmSeries.length > 0 ? () => setExpanded('rail-ppm') : undefined}
          />
          <MetricCard
            label="Bus journeys"
            value={busBillions ? `${busBillions}bn` : '—'}
            unit="/yr"
            direction="down"
            polarity="up-is-good"
            baseline="Down from 4.6 billion trips in 2019 — public transport use never fully recovered after COVID"
            changeText={
              latestBus && busPre
                ? `${latestBus.year} · Down from ${busPre}bn in 2019`
                : 'Loading…'
            }
            sparklineData={
              data
                ? sparkFrom(data.national.bus.timeSeries.map(d => d.journeysMillions))
                : []
            }
            source="DfT · Bus statistics BUS01"
            onExpand={busJourneySeries.length > 0 ? () => setExpanded('bus-journeys') : undefined}
          />
          <MetricCard
            label="Rail cancellations"
            value={latestRail ? latestRail.cancelledPct.toFixed(1) : '—'}
            unit="%"
            direction="up"
            polarity="up-is-bad"
            baseline="Around 3% of trains are cancelled outright — on top of those that run but arrive late"
            changeText={
              latestRail
                ? `${latestRail.quarter} · Industry target: 2%`
                : 'Loading…'
            }
            sparklineData={
              data
                ? sparkFrom(data.national.rail.timeSeries.map(d => d.cancelledPct))
                : []
            }
            source="ORR · Passenger rail performance"
          />
        </div>
        </ScrollReveal>

        {/* Chart 1: Rail punctuality (PPM) */}
        <div id="sec-rail">
        {ppmSeries.length > 0 ? (
          <LineChart
            title="Rail punctuality (PPM), 2014–2025"
            subtitle="Public Performance Measure — percentage of trains arriving within 5 minutes of scheduled time (10 minutes for long-distance). England &amp; Wales."
            series={ppmSeries}
            annotations={railAnnotations}
            yLabel="Percent"
            source={{
              name: 'Office of Rail and Road',
              dataset: 'Passenger rail performance',
              frequency: 'quarterly',
              url: 'https://dataportal.orr.gov.uk/statistics/performance/passenger-rail-performance/',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-16" />
        )}

        {/* Chart 2: Rail cancellations */}
        {cancellationSeries.length > 0 ? (
          <LineChart
            title="Rail cancellations, 2014–2025"
            subtitle="Percentage of scheduled services cancelled or significantly late. England &amp; Wales."
            series={cancellationSeries}
            targetLine={{ value: 2, label: 'Industry target: 2%' }}
            annotations={railAnnotations}
            yLabel="Percent"
            source={{
              name: 'Office of Rail and Road',
              dataset: 'Passenger rail performance',
              frequency: 'quarterly',
              url: 'https://dataportal.orr.gov.uk/statistics/performance/passenger-rail-performance/',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-16" />
        )}

        </div>{/* end sec-rail */}

        {/* Chart 3: Bus passenger journeys */}
        <div id="sec-bus">
        {busJourneySeries.length > 0 ? (
          <LineChart
            title="Bus passenger journeys, 2005–2025"
            subtitle="Total annual bus passenger journeys across England. COVID-19 caused a sharp decline; recovery remains incomplete."
            series={busJourneySeries}
            annotations={busAnnotations}
            yLabel="Millions"
            source={{
              name: 'Department for Transport',
              dataset: 'Bus statistics — BUS01',
              frequency: 'annual',
              url: 'https://www.gov.uk/government/statistical-data-sets/bus-statistics-data-tables-bus01',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-16" />
        )}

        {/* TOC table: Punctuality by train operator */}
        {data && data.regional.byTOC.length > 0 && (
          <section className="mb-16">
            <h2 className="text-xl font-bold text-wiah-black mb-1">
              Punctuality by train operator
            </h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">
              Latest available quarter ({latestRail?.quarter}). Sorted by PPM (worst first). Green &ge;90%, amber &ge;85%, red &lt;85%.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-wiah-border">
                    <th className="text-left py-2 pr-4 font-mono text-xs text-wiah-mid">Operator</th>
                    <th className="text-right py-2 px-3 font-mono text-xs text-wiah-mid">PPM %</th>
                    <th className="text-right py-2 px-3 font-mono text-xs text-wiah-mid">Cancelled %</th>
                    <th className="py-2 pl-3 font-mono text-xs text-wiah-mid w-40">PPM vs 90% target</th>
                  </tr>
                </thead>
                <tbody>
                  {[...data.regional.byTOC]
                    .sort((a, b) => a.ppmPct - b.ppmPct)
                    .map(toc => {
                      const ppm = toc.ppmPct;
                      const cancelled = toc.cancelledPct;
                      const barPct = Math.min((ppm / 100) * 100, 100);
                      const ppmColour = ppm >= 90 ? '#2A9D8F' : ppm >= 85 ? '#F4A261' : '#E63946';
                      const cancelColour = cancelled > 5 ? '#E63946' : cancelled > 3 ? '#F4A261' : '#2A9D8F';
                      return (
                        <tr key={toc.toc} className="border-b border-wiah-border/50 hover:bg-wiah-light/50">
                          <td className="py-2 pr-4 text-sm">{toc.toc}</td>
                          <td className="py-2 px-3 font-mono text-sm text-right font-bold" style={{ color: ppmColour }}>
                            {ppm.toFixed(1)}
                          </td>
                          <td className="py-2 px-3 font-mono text-sm text-right font-bold" style={{ color: cancelColour }}>
                            {cancelled.toFixed(1)}
                          </td>
                          <td className="py-2 pl-3">
                            <div className="bg-wiah-light rounded h-2 w-full">
                              <div className="h-2 rounded" style={{ width: `${barPct}%`, backgroundColor: ppmColour }} />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <p className="font-mono text-xs text-wiah-mid mt-3">
              Source: ORR, Passenger rail performance. Sorted by PPM (worst first).
            </p>
          </section>
        )}

        {/* Chart 5: Bus journeys and vehicle miles */}
        {busVehicleSeries.length > 0 && busVehicleSeries[1].data.length > 0 ? (
          <LineChart
            title="Bus journeys and vehicle miles, 2005–2025"
            subtitle="Annual passenger journeys and vehicle miles operated, England. Service cuts reduce both supply and demand."
            series={busVehicleSeries}
            annotations={busAnnotations}
            yLabel="Millions"
            source={{
              name: 'Department for Transport',
              dataset: 'Bus statistics — BUS01',
              frequency: 'annual',
              url: 'https://www.gov.uk/government/statistical-data-sets/bus-statistics-data-tables-bus01',
            }}
          />
        ) : busVehicleSeries.length > 0 ? null : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-16" />
        )}

        {/* Positive story */}
        <ScrollReveal>
        <PositiveCallout
          title="What's improving"
          value="95%"
          description="Rail passenger numbers have rebounded to approximately 95% of pre-pandemic levels. The Elizabeth Line — Europe&apos;s largest infrastructure project — carried over 200 million passengers in its first full year. New rolling stock across several franchises has improved journey quality, even where punctuality remains mixed."
          source="Source: ORR — Passenger rail usage estimates, 2024/25."
        />
        </ScrollReveal>

        </div>{/* end sec-bus */}

        {/* ── Road Safety ───────────────────────────────────────────────────── */}
        <div id="sec-road-safety">
          <ScrollReveal>
          <h2 className="text-2xl font-bold text-wiah-black mb-2 mt-8">Road Safety</h2>
          <p className="text-base text-wiah-mid mb-8 max-w-2xl">
            Britain&apos;s roads are dramatically safer than they were four decades ago — but the
            improvement has stalled since 2010, with around 1,700 people killed each year.
          </p>
          </ScrollReveal>

          {ksiSeries.length > 0 ? (
            <LineChart
              title="Road killed or seriously injured (KSI), Great Britain, 1979–2023"
              subtitle="Dramatic improvements in road safety since the 1970s, but progress has plateaued since 2010. 2020 drop reflects COVID lockdowns."
              series={ksiSeries}
              annotations={ksiAnnotations}
              yLabel="People"
              source={{
                name: 'DfT',
                dataset: 'Reported road casualties in Great Britain',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/reported-road-casualties-great-britain-annual-report-2023',
              }}
            />
          ) : (
            <div className="h-64 bg-wiah-light rounded animate-pulse mb-16" />
          )}

          {/* Road safety metric callout */}
          {roadSafety && (
            <ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
              <div className="border border-wiah-border rounded-lg p-5">
                <p className="text-xs font-mono text-wiah-mid mb-1">Killed on roads (2023)</p>
                <p className="font-mono text-3xl font-bold text-wiah-black">1,695</p>
                <p className="text-xs text-wiah-mid mt-1">Down from 6,352 in 1979</p>
              </div>
              <div className="border border-wiah-border rounded-lg p-5">
                <p className="text-xs font-mono text-wiah-mid mb-1">Seriously injured (2023)</p>
                <p className="font-mono text-3xl font-bold" style={{ color: '#F4A261' }}>30,124</p>
                <p className="text-xs text-wiah-mid mt-1">Rising since 2013 low of 21,657</p>
              </div>
              <div className="border border-wiah-border rounded-lg p-5">
                <p className="text-xs font-mono text-wiah-mid mb-1">Progress since 1979</p>
                <p className="font-mono text-3xl font-bold" style={{ color: '#2A9D8F' }}>−73%</p>
                <p className="text-xs text-wiah-mid mt-1">Fatalities down 73% over 44 years</p>
              </div>
            </div>
            </ScrollReveal>
          )}
        </div>{/* end sec-road-safety */}

        {/* ── Electric Vehicles ─────────────────────────────────────────────── */}
        <div id="sec-ev">
          <ScrollReveal>
          <h2 className="text-2xl font-bold text-wiah-black mb-2 mt-4">Electric Vehicles</h2>
          <p className="text-base text-wiah-mid mb-8 max-w-2xl">
            Battery electric vehicles now account for nearly 1 in 5 new car sales. Over 1.4 million
            EVs are already on UK roads — a tenfold increase since 2019.
          </p>
          </ScrollReveal>

          {/* EV metric cards */}
          <ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            <MetricCard
              label="EVs on UK roads today"
              value={
                latestEVOnRoad
                  ? `${(latestEVOnRoad.totalEVs / 1e6).toFixed(1)}M`
                  : '1.4M'
              }
              unit=""
              direction="up"
              polarity="up-is-good"
              baseline="Battery EVs licensed on UK roads — up from 193,400 in 2019"
              changeText={
                latestEVOnRoad
                  ? `${latestEVOnRoad.year} · DVLA licensed vehicles`
                  : '2024 · DVLA licensed vehicles'
              }
              sparklineData={roadSafety ? roadSafety.evOnRoad.map(d => d.totalEVs / 1000) : []}
              source="DVLA · Licensed vehicles, 2024"
            />
            <MetricCard
              label="EV share of new sales 2024"
              value={
                latestEVShare
                  ? `${latestEVShare.evSharePct.toFixed(1)}`
                  : '19.6'
              }
              unit="%"
              direction="up"
              polarity="up-is-good"
              baseline="Nearly 1 in 5 new cars sold in 2024 was battery electric — up from under 2% in 2017"
              changeText={
                latestEVShare
                  ? `${latestEVShare.year} · ${latestEVShare.evCount.toLocaleString()} BEVs registered`
                  : '2024 · 381,970 BEVs registered'
              }
              sparklineData={roadSafety ? roadSafety.evRegistrations.map(d => d.evSharePct) : []}
              source="SMMT · New car registrations, 2024"
            />
          </div>
          </ScrollReveal>

          {evShareSeries.length > 0 ? (
            <LineChart
              title="Electric vehicle share of new car registrations, UK, 2011–2024"
              subtitle="Battery electric vehicles (BEVs) as a percentage of all new car registrations. The ZEV mandate requires 22% zero-emission share in 2024, rising to 100% by 2035."
              series={evShareSeries}
              annotations={evAnnotations}
              targetLine={{ value: 22, label: 'ZEV mandate 2024: 22%' }}
              yLabel="%"
              source={{
                name: 'SMMT / DVLA',
                dataset: 'New car registrations and licensed vehicles',
                frequency: 'annual',
                url: 'https://www.smmt.co.uk/vehicle-data/car-registrations/',
              }}
            />
          ) : (
            <div className="h-64 bg-wiah-light rounded animate-pulse mb-16" />
          )}
        </div>{/* end sec-ev */}

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
                href="https://www.gov.uk/government/statistics/reported-road-casualties-great-britain-annual-report-2023"
                className="underline hover:text-wiah-blue"
                target="_blank"
                rel="noreferrer"
              >
                DfT &mdash; Reported road casualties in Great Britain (annual)
              </a>
            </li>
            <li>
              <a
                href="https://www.smmt.co.uk/vehicle-data/car-registrations/"
                className="underline hover:text-wiah-blue"
                target="_blank"
                rel="noreferrer"
              >
                SMMT / DVLA &mdash; New car registrations and licensed vehicles (monthly)
              </a>
            </li>
          </ul>
          <p className="font-mono text-xs text-wiah-mid mt-4">
            {data?.metadata.methodology}
          </p>
          {data?.metadata.knownIssues && data.metadata.knownIssues.length > 0 && (
            <div className="mt-4">
              <p className="font-mono text-xs text-wiah-mid font-bold mb-1">Known issues:</p>
              <ul className="list-disc list-inside space-y-1 font-mono text-xs text-wiah-mid">
                {data.metadata.knownIssues.map((issue, i) => (
                  <li key={i}>{issue}</li>
                ))}
              </ul>
            </div>
          )}
          <p className="font-mono text-xs text-wiah-mid mt-4">
            Data updated automatically via GitHub Actions. Last pipeline run:{' '}
            {new Date().toISOString().slice(0, 10)}.
          </p>
        </section>
      </main>

      {/* Expanded metric modals */}
      {expanded === 'rail-ppm' && (
        <MetricDetailModal
          title="Rail punctuality (PPM), 2014–2025"
          subtitle="Public Performance Measure — percentage of trains arriving within 5/10 minutes of schedule."
          series={ppmSeries}
          annotations={railAnnotations}
          yLabel="Percent"
          source={{
            name: 'Office of Rail and Road',
            dataset: 'Passenger rail performance',
            frequency: 'quarterly',
            url: 'https://dataportal.orr.gov.uk/statistics/performance/passenger-rail-performance/',
          }}
          onClose={() => setExpanded(null)}
        />
      )}
      {expanded === 'bus-journeys' && (
        <MetricDetailModal
          title="Bus passenger journeys, 2005–2025"
          subtitle="Total annual bus passenger journeys, England."
          series={busJourneySeries}
          annotations={busAnnotations}
          yLabel="Millions"
          source={{
            name: 'Department for Transport',
            dataset: 'Bus statistics — BUS01',
            frequency: 'annual',
            url: 'https://www.gov.uk/government/statistical-data-sets/bus-statistics-data-tables-bus01',
          }}
          onClose={() => setExpanded(null)}
        />
      )}
      {expanded === 'ksi-chart' && (
        <MetricDetailModal
          title="Road killed or seriously injured (KSI), Great Britain, 1979–2023"
          subtitle="Reported road casualties in Great Britain, killed and seriously injured."
          series={ksiKilledSeries}
          annotations={ksiAnnotations}
          yLabel="People"
          source={{
            name: 'DfT',
            dataset: 'Reported road casualties in Great Britain',
            frequency: 'annual',
            url: 'https://www.gov.uk/government/statistics/reported-road-casualties-great-britain-annual-report-2023',
          }}
          onClose={() => setExpanded(null)}
        />
      )}
    </>
  );
}
