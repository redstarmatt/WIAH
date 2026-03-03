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
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data/transport/transport.json')
      .then(r => r.json())
      .then(setData)
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

  // ── Annotations ─────────────────────────────────────────────────────────

  const railAnnotations: Annotation[] = [
    { date: new Date(2018, 4), label: '2018: Timetable chaos' },
    { date: new Date(2020, 2), label: 'Mar 2020: COVID-19' },
    { date: new Date(2022, 5), label: '2022: Strike action' },
  ];

  const busAnnotations: Annotation[] = [
    { date: new Date(2020, 2), label: '2020: COVID-19' },
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
            latestRail && latestBus
              ? `Rail punctuality stands at ${latestRail.ppmPct.toFixed(1)}% — meaning roughly 1 in ${Math.round(100 / (100 - latestRail.ppmPct))} trains arrive late or are cancelled. Bus passenger journeys have fallen to ${busBillions} billion per year${busPre ? `, down from ${busPre}bn before the pandemic` : ''}. Cancellation rates remain at ${latestRail.cancelledPct.toFixed(1)}%, well above the industry target of 2%.`
              : 'Rail punctuality has declined steadily over the past decade, while bus services have been cut across much of the country. Public transport in England is getting harder to rely on.'
          }
          colour="#F4A261"
        />

        {/* Metric cards */}
        <ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Rail punctuality"
            value={latestRail ? latestRail.ppmPct.toFixed(1) : '—'}
            unit="% on time"
            direction="down"
            polarity="up-is-good"
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

        {/* Chart 3: Bus passenger journeys */}
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

        {/* Context */}
        <section className="max-w-2xl mt-8 mb-12">
          <h2 className="text-xl font-bold text-wiah-black mb-4">What&apos;s driving this</h2>
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Rail punctuality, measured by the Public Performance Measure (PPM), has been in
              long-term decline. The 2018 timetable changes caused chaos across Northern and
              Thameslink services, with cancellation rates spiking sharply. COVID-19 collapsed
              demand, and while passenger numbers have largely recovered, performance has not
              returned to pre-pandemic levels.
            </p>
            <p>
              The 2022 strike action by RMT and ASLEF members further disrupted services and
              depressed ridership. Infrastructure constraints — aging signalling, capacity
              bottlenecks at key junctions, and delayed maintenance — remain the underlying
              cause of poor performance on many routes.
            </p>
            <p>
              Bus services have been cut dramatically outside London. Since 2010, local authority
              funding for supported bus routes has fallen by over 40% in real terms. Routes have
              been withdrawn, frequencies reduced, and evening and weekend services eliminated in
              many areas. The &pound;2 bus fare cap introduced in 2023 has helped sustain ridership
              but has not reversed the long-term decline in service provision.
            </p>
            <p>
              The gap between London and the rest of England is stark. Transport for London
              operates an integrated, frequent network; outside the capital, deregulated bus
              markets and fragmented rail franchises leave many communities poorly connected.
              Greater Manchester&apos;s move to re-regulate its buses under the Bee Network is
              the first major attempt to change this model.
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
    </>
  );
}
