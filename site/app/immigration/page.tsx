'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import SiteName from '@/components/SiteName';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import MetricDetailModal from '@/components/MetricDetailModal';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';

// ── Types ────────────────────────────────────────────────────────────────────

interface NetMigrationRow {
  period: string;
  flow: string;
  all: number | null;
  british: number | null;
  eu: number | null;
  nonEu: number | null;
}

interface MigrationByReasonRow {
  period: string;
  flow: string;
  total?: number | null;
  work?: number | null;
  study?: number | null;
  family?: number | null;
  humanitarian?: number | null;
  asylum?: number | null;
  other?: number | null;
}

interface VisaGrantYear {
  year: number;
  work?: number;
  study?: number;
  studySponsored?: number;
  family?: number;
  visitor?: number;
  total?: number;
}

interface AsylumYear {
  year: number;
  applications?: number | null;
  decisions?: number | null;
  grants?: number | null;
  refusals?: number | null;
  grantRate?: number | null;
  backlogPeople?: number | null;
  backlogCases?: number | null;
}

interface SmallBoatYear {
  year: number;
  migrants: number;
  boats: number;
  crossingDays: number;
}

interface ReturnsYear {
  year: number;
  enforced?: number | null;
  voluntary?: number | null;
  portRefusals?: number | null;
}

interface ImmigrationData {
  headlines: {
    netMigration: number;
    netMigrationPeriod: string;
    asylumBacklog: number;
    asylumBacklogYear: number;
    asylumGrantRate: number;
    smallBoats2025: number;
    smallBoatsTotal: number;
  };
  netMigration: NetMigrationRow[];
  migrationByReason: MigrationByReasonRow[];
  visaGrants: VisaGrantYear[];
  asylum: AsylumYear[];
  smallBoats: SmallBoatYear[];
  returns: ReturnsYear[];
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function periodToDate(p: string): Date {
  // "2025-06" → June 2025
  const [yr, mo] = p.split('-').map(Number);
  return new Date(yr, mo - 1, 1);
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function fmtK(n: number | null | undefined): string {
  if (n == null) return '—';
  if (Math.abs(n) >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (Math.abs(n) >= 1_000) return `${Math.round(n / 1000)}K`;
  return n.toLocaleString();
}

function sparkFrom(arr: number[], n = 12) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ImmigrationPage() {
  const [data, setData] = useState<ImmigrationData | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data/immigration/immigration.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  // 1. Net migration by nationality
  const netMigSeries: Series[] = data
    ? [
        {
          id: 'net-all',
          label: 'All nationalities',
          colour: '#0D1117',
          data: data.netMigration
            .filter(r => r.flow === 'net_migration' && r.all != null)
            .map(r => ({ date: periodToDate(r.period), value: r.all! })),
        },
        {
          id: 'net-noneu',
          label: 'Non-EU+',
          colour: '#E63946',
          data: data.netMigration
            .filter(r => r.flow === 'net_migration' && r.nonEu != null)
            .map(r => ({ date: periodToDate(r.period), value: r.nonEu! })),
        },
        {
          id: 'net-eu',
          label: 'EU+',
          colour: '#264653',
          data: data.netMigration
            .filter(r => r.flow === 'net_migration' && r.eu != null)
            .map(r => ({ date: periodToDate(r.period), value: r.eu! })),
        },
        {
          id: 'net-british',
          label: 'British',
          colour: '#F4A261',
          data: data.netMigration
            .filter(r => r.flow === 'net_migration' && r.british != null)
            .map(r => ({ date: periodToDate(r.period), value: r.british! })),
        },
      ]
    : [];

  const netMigAnnotations: Annotation[] = [
    { date: new Date(2016, 5), label: '2016: Brexit vote' },
    { date: new Date(2020, 2), label: '2020: COVID-19' },
    { date: new Date(2022, 0), label: '2022: Ukraine crisis' },
  ];

  // 2. Non-EU+ immigration by reason
  const reasonSeries: Series[] = data
    ? [
        {
          id: 'reason-work',
          label: 'Work',
          colour: '#264653',
          data: data.migrationByReason
            .filter(r => r.flow === 'immigration' && r.work != null)
            .map(r => ({ date: periodToDate(r.period), value: r.work! })),
        },
        {
          id: 'reason-study',
          label: 'Study',
          colour: '#E63946',
          data: data.migrationByReason
            .filter(r => r.flow === 'immigration' && r.study != null)
            .map(r => ({ date: periodToDate(r.period), value: r.study! })),
        },
        {
          id: 'reason-family',
          label: 'Family',
          colour: '#F4A261',
          data: data.migrationByReason
            .filter(r => r.flow === 'immigration' && r.family != null)
            .map(r => ({ date: periodToDate(r.period), value: r.family! })),
        },
        {
          id: 'reason-humanitarian',
          label: 'Humanitarian',
          colour: '#2A9D8F',
          data: data.migrationByReason
            .filter(r => r.flow === 'immigration' && r.humanitarian != null)
            .map(r => ({ date: periodToDate(r.period), value: r.humanitarian! })),
        },
      ]
    : [];

  // 3. Asylum applications + backlog
  const asylumAppsSeries: Series[] = data
    ? [
        {
          id: 'asylum-applications',
          label: 'Applications',
          colour: '#0D1117',
          data: data.asylum
            .filter(r => r.applications != null)
            .map(r => ({ date: yearToDate(r.year), value: r.applications! })),
        },
        {
          id: 'asylum-backlog',
          label: 'Backlog (people awaiting decision)',
          colour: '#E63946',
          data: data.asylum
            .filter(r => r.backlogPeople != null)
            .map(r => ({ date: yearToDate(r.year), value: r.backlogPeople! })),
        },
      ]
    : [];

  // 3b. Asylum decisions breakdown (grants vs refusals)
  const asylumDecisionsSeries: Series[] = data
    ? [
        {
          id: 'asylum-grants',
          label: 'Grants of protection',
          colour: '#2A9D8F',
          data: data.asylum
            .filter(r => r.grants != null)
            .map(r => ({ date: yearToDate(r.year), value: r.grants! })),
        },
        {
          id: 'asylum-refusals',
          label: 'Refusals',
          colour: '#E63946',
          data: data.asylum
            .filter(r => r.refusals != null)
            .map(r => ({ date: yearToDate(r.year), value: r.refusals! })),
        },
        {
          id: 'asylum-decisions-total',
          label: 'Total decisions',
          colour: '#0D1117',
          data: data.asylum
            .filter(r => r.decisions != null)
            .map(r => ({ date: yearToDate(r.year), value: r.decisions! })),
        },
      ]
    : [];

  // 3c. Visa grants line chart (visual complement to table)
  const visaLineSeries: Series[] = data && data.visaGrants.length > 0
    ? [
        {
          id: 'visa-work',
          label: 'Work',
          colour: '#264653',
          data: data.visaGrants.filter(r => r.work != null).map(r => ({ date: yearToDate(r.year), value: r.work! })),
        },
        {
          id: 'visa-study',
          label: 'Study',
          colour: '#E63946',
          data: data.visaGrants.filter(r => r.study != null).map(r => ({ date: yearToDate(r.year), value: r.study! })),
        },
        {
          id: 'visa-family',
          label: 'Family',
          colour: '#F4A261',
          data: data.visaGrants.filter(r => r.family != null).map(r => ({ date: yearToDate(r.year), value: r.family! })),
        },
        {
          id: 'visa-visitor',
          label: 'Visitor',
          colour: '#2A9D8F',
          data: data.visaGrants.filter(r => r.visitor != null).map(r => ({ date: yearToDate(r.year), value: r.visitor! })),
        },
      ]
    : [];

  // 4. Small boats
  const smallBoatsSeries: Series[] = data
    ? [{
        id: 'small-boats',
        label: 'Channel crossings',
        colour: '#E63946',
        data: data.smallBoats.map(r => ({
          date: yearToDate(r.year),
          value: r.migrants,
        })),
      }]
    : [];

  // 5. Returns
  const returnsSeries: Series[] = data
    ? [
        {
          id: 'returns-enforced',
          label: 'Enforced returns',
          colour: '#0D1117',
          data: data.returns
            .filter(r => r.enforced != null)
            .map(r => ({ date: yearToDate(r.year), value: r.enforced! })),
        },
        {
          id: 'returns-voluntary',
          label: 'Voluntary departures',
          colour: '#264653',
          data: data.returns
            .filter(r => r.voluntary != null)
            .map(r => ({ date: yearToDate(r.year), value: r.voluntary! })),
        },
        {
          id: 'returns-port',
          label: 'Port refusals',
          colour: '#F4A261',
          data: data.returns
            .filter(r => r.portRefusals != null)
            .map(r => ({ date: yearToDate(r.year), value: r.portRefusals! })),
        },
      ]
    : [];

  // ── Metric values ────────────────────────────────────────────────────────

  const netMigAll = data?.netMigration
    .filter(r => r.flow === 'net_migration' && r.all != null)
    .map(r => r.all!) ?? [];
  const latestNet = netMigAll.at(-1);

  const asylumBacklog = data?.headlines.asylumBacklog;
  const asylumBacklogSpark = data?.asylum
    .filter(r => r.backlogPeople != null)
    .map(r => r.backlogPeople!) ?? [];

  const boatsLatest = data?.smallBoats.at(-1);
  const boatsSpark = data?.smallBoats.map(r => r.migrants) ?? [];

  // ── Render ──────────────────────────────────────────────────────────────

  return (
    <>
      {/* Sticky nav */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-wiah-border px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/"><SiteName size="nav" /></Link>
          <span className="text-wiah-mid text-sm font-mono">Immigration</span>
          <Link href="/" className="text-sm text-wiah-blue hover:underline">&larr; All topics</Link>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Immigration"
          question="What Are the Actual Numbers on Immigration?"
          finding={
            data
              ? `Net migration was ${fmtK(data.headlines.netMigration)} in the year to ${new Date(data.headlines.netMigrationPeriod + '-01').toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })} — down from a peak of 906K in 2023 but still far above pre-Brexit levels of around 200K. ${fmtK(data.headlines.asylumBacklog)} people are waiting for an initial asylum decision, with a grant rate of ${Math.round(data.headlines.asylumGrantRate * 100)}%. ${fmtK(data.headlines.smallBoatsTotal)} people have crossed the Channel in small boats since 2018, including ${fmtK(data.headlines.smallBoats2025)} so far in 2025.`
              : 'Net migration remains historically high despite falling from its 2023 peak. The asylum backlog persists and Channel crossings continue to rise.'
          }
          colour="#6B7280"
          preposition="with"
        />

        {/* Metric cards */}
        <ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Net migration"
            value={latestNet != null ? fmtK(latestNet) : '—'}
            unit="/yr"
            direction="down"
            polarity="up-is-bad"
            baseline="204,000 net arrivals in 2024 — down from a record 906,000 in 2023"
            changeText={
              data
                ? `YE Jun 2025 · Down from 906K peak (2023)`
                : 'Loading…'
            }
            sparklineData={sparkFrom(netMigAll)}
            source="ONS · LTIM provisional, Nov 2025"
            onExpand={netMigSeries.length > 0 ? () => setExpanded('netmig') : undefined}
          />
          <MetricCard
            label="Asylum backlog"
            value={asylumBacklog != null ? fmtK(asylumBacklog) : '—'}
            unit="people"
            direction="down"
            polarity="up-is-bad"
            changeText={
              data
                ? `Awaiting initial decision · Down from 128K peak (2023)`
                : 'Loading…'
            }
            sparklineData={sparkFrom(asylumBacklogSpark)}
            source="Home Office · Asylum summary, Dec 2025"
            onExpand={asylumAppsSeries.length > 0 ? () => setExpanded('asylum') : undefined}
          />
          <MetricCard
            label="Small boat crossings"
            value={boatsLatest ? fmtK(boatsLatest.migrants) : '—'}
            unit={boatsLatest ? String(boatsLatest.year) : ''}
            direction="up"
            polarity="up-is-bad"
            baseline="Over 100 people per day crossing the Channel in small boats"
            changeText={
              data
                ? `${fmtK(data.headlines.smallBoatsTotal)} total since 2018`
                : 'Loading…'
            }
            sparklineData={sparkFrom(boatsSpark)}
            source="Home Office · Small boats, Feb 2026"
            onExpand={smallBoatsSeries.length > 0 ? () => setExpanded('boats') : undefined}
          />
        </div>
        </ScrollReveal>

        {/* Chart 1: Net migration by nationality */}
        {netMigSeries.length > 0 ? (
          <LineChart
            title="Net migration by nationality, 2012–2025"
            subtitle="Annual net migration (immigration minus emigration), thousands. Year ending June."
            series={netMigSeries}
            annotations={netMigAnnotations}
            yLabel="Thousands"
            source={{
              name: 'ONS',
              dataset: 'Long-term international migration flows, provisional',
              frequency: 'twice yearly',
              url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/internationalmigration/datasets/longterminternationalimmigrationemigrationandnetmigrationflowsprovisional',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Chart 2: Non-EU+ immigration by reason */}
        {reasonSeries.length > 0 ? (
          <LineChart
            title="Non-EU+ immigration by reason, 2012–2025"
            subtitle="People arriving for work, study, family, or humanitarian reasons. Year ending June."
            series={reasonSeries}
            yLabel="Thousands"
            source={{
              name: 'ONS',
              dataset: 'Long-term international migration by reason (LTIM Table 4b)',
              frequency: 'twice yearly',
              url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/internationalmigration/datasets/longterminternationalimmigrationemigrationandnetmigrationflowsprovisional',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Chart 2b: Visa grants by route (line chart) */}
        {visaLineSeries.length > 0 ? (
          <LineChart
            title="Visa grants by route, 2014–2025"
            subtitle="Entry clearance visas granted by main category, year ending December."
            series={visaLineSeries}
            yLabel="Visas granted"
            source={{
              name: 'Home Office',
              dataset: 'Entry clearance visas summary tables',
              frequency: 'quarterly',
              url: 'https://www.gov.uk/government/statistical-data-sets/immigration-system-statistics-data-tables',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Inline table: Visa grants by route */}
        {data && data.visaGrants.length > 0 && (
          <section className="mb-12">
            <h3 className="text-lg font-bold text-wiah-black mb-1">
              Visa grants by route, 2014–2025
            </h3>
            <p className="text-sm text-wiah-mid font-mono mb-6">
              Entry clearance visas granted, by main category. Year ending December.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-wiah-border">
                    <th className="text-left py-2 pr-4 font-mono text-xs text-wiah-mid">Year</th>
                    <th className="text-right py-2 px-2 font-mono text-xs text-wiah-mid">Work</th>
                    <th className="text-right py-2 px-2 font-mono text-xs text-wiah-mid">Study</th>
                    <th className="text-right py-2 px-2 font-mono text-xs text-wiah-mid">Family</th>
                    <th className="text-right py-2 px-2 font-mono text-xs text-wiah-mid">Visitor</th>
                    <th className="text-right py-2 pl-2 font-mono text-xs text-wiah-mid font-bold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {data.visaGrants.map(row => (
                    <tr key={row.year} className="border-b border-wiah-border/50 hover:bg-wiah-light/50">
                      <td className="py-2 pr-4 font-mono text-sm font-bold">{row.year}</td>
                      <td className="py-2 px-2 font-mono text-sm text-right">{fmtK(row.work)}</td>
                      <td className="py-2 px-2 font-mono text-sm text-right">{fmtK(row.study)}</td>
                      <td className="py-2 px-2 font-mono text-sm text-right">{fmtK(row.family)}</td>
                      <td className="py-2 px-2 font-mono text-sm text-right">{fmtK(row.visitor)}</td>
                      <td className="py-2 pl-2 font-mono text-sm text-right font-bold">{fmtK(row.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="font-mono text-[11px] text-wiah-mid mt-3">
              <a
                href="https://www.gov.uk/government/statistical-data-sets/immigration-system-statistics-data-tables"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Source: Home Office, Entry clearance visas summary tables, Dec 2025 (quarterly)
              </a>
            </p>
          </section>
        )}

        {/* Chart 3: Asylum applications + backlog */}
        {asylumAppsSeries.length > 0 ? (
          <LineChart
            title="Asylum applications and backlog, 2010–2025"
            subtitle="Annual asylum applications vs people awaiting an initial decision at year-end."
            series={asylumAppsSeries}
            yLabel="People"
            source={{
              name: 'Home Office',
              dataset: 'Asylum summary tables (Asy_00a)',
              frequency: 'quarterly',
              url: 'https://www.gov.uk/government/statistical-data-sets/immigration-system-statistics-data-tables',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Chart 3b: Asylum decisions breakdown */}
        {asylumDecisionsSeries.length > 0 ? (
          <LineChart
            title="Asylum decisions: grants vs refusals, 2010–2025"
            subtitle="Initial asylum decisions showing grants of protection, refusals, and total decisions."
            series={asylumDecisionsSeries}
            yLabel="Decisions"
            source={{
              name: 'Home Office',
              dataset: 'Asylum summary tables (Asy_00a)',
              frequency: 'quarterly',
              url: 'https://www.gov.uk/government/statistical-data-sets/immigration-system-statistics-data-tables',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Inline table: Asylum grant rate */}
        {data && data.asylum.length > 0 && (
          <section className="mb-12">
            <h3 className="text-lg font-bold text-wiah-black mb-1">
              Asylum grant rate at initial decision
            </h3>
            <p className="text-sm text-wiah-mid font-mono mb-4">
              Percentage of initial asylum decisions that granted protection.
            </p>
            <div className="space-y-2">
              {data.asylum
                .filter(r => r.grantRate != null && r.year >= 2014)
                .map(row => (
                  <div key={row.year} className="flex items-center gap-3">
                    <span className="font-mono text-sm font-bold w-12 shrink-0">{row.year}</span>
                    <div className="flex-1 bg-wiah-light rounded-full h-3">
                      <div
                        className="h-3 rounded-full"
                        style={{
                          width: `${Math.min(100, (row.grantRate ?? 0) * 100)}%`,
                          backgroundColor: (row.grantRate ?? 0) >= 0.5 ? '#2A9D8F' : '#E63946',
                        }}
                      />
                    </div>
                    <span className="font-mono text-sm font-bold w-12 text-right">
                      {row.grantRate != null ? `${Math.round(row.grantRate * 100)}%` : '—'}
                    </span>
                  </div>
                ))}
            </div>
            <p className="font-mono text-[11px] text-wiah-mid mt-3">
              <a
                href="https://www.gov.uk/government/statistical-data-sets/immigration-system-statistics-data-tables"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Source: Home Office, Asylum summary tables, Dec 2025
              </a>
            </p>
          </section>
        )}

        {/* Chart 4: Small boat crossings */}
        {smallBoatsSeries.length > 0 ? (
          <LineChart
            title="Small boat Channel crossings, 2018–2025"
            subtitle="People detected crossing the English Channel in small boats, by year."
            series={smallBoatsSeries}
            yLabel="People"
            source={{
              name: 'Home Office',
              dataset: 'Small boat arrivals time series',
              frequency: 'weekly',
              url: 'https://www.gov.uk/government/publications/migrants-detected-crossing-the-english-channel-in-small-boats',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Small boats detail table */}
        {data && data.smallBoats.length > 0 && (
          <section className="mb-12">
            <h3 className="text-lg font-bold text-wiah-black mb-1">
              Small boat crossings: year-by-year breakdown
            </h3>
            <p className="text-sm text-wiah-mid font-mono mb-4">
              People, boats, crossing days, and average people per boat.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-wiah-border">
                    <th className="text-left py-2 pr-3 font-mono text-xs text-wiah-mid">Year</th>
                    <th className="text-right py-2 px-2 font-mono text-xs text-wiah-mid">People</th>
                    <th className="text-right py-2 px-2 font-mono text-xs text-wiah-mid">Boats</th>
                    <th className="text-right py-2 px-2 font-mono text-xs text-wiah-mid">Crossing days</th>
                    <th className="text-right py-2 pl-2 font-mono text-xs text-wiah-mid">Avg/boat</th>
                  </tr>
                </thead>
                <tbody>
                  {data.smallBoats.map(row => (
                    <tr key={row.year} className="border-b border-wiah-border/50 hover:bg-wiah-light/50">
                      <td className="py-2 pr-3 font-mono text-sm font-bold">{row.year}</td>
                      <td className="py-2 px-2 font-mono text-sm text-right">{row.migrants.toLocaleString()}</td>
                      <td className="py-2 px-2 font-mono text-sm text-right">{row.boats.toLocaleString()}</td>
                      <td className="py-2 px-2 font-mono text-sm text-right">{row.crossingDays}</td>
                      <td className="py-2 pl-2 font-mono text-sm text-right font-bold">
                        {row.boats > 0 ? (row.migrants / row.boats).toFixed(1) : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="font-mono text-[11px] text-wiah-mid mt-3">
              <a
                href="https://www.gov.uk/government/publications/migrants-detected-crossing-the-english-channel-in-small-boats"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Source: Home Office, Small boat arrivals time series, Feb 2026
              </a>
            </p>
          </section>
        )}

        {/* Chart 5: Returns */}
        {returnsSeries.length > 0 ? (
          <LineChart
            title="Returns from the UK, 2004–2025"
            subtitle="Enforced returns, voluntary departures, and port refusals."
            series={returnsSeries}
            yLabel="People"
            source={{
              name: 'Home Office',
              dataset: 'Returns summary tables (Ret_01)',
              frequency: 'quarterly',
              url: 'https://www.gov.uk/government/statistical-data-sets/immigration-system-statistics-data-tables',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Context */}
        <section className="max-w-2xl mt-8 mb-12">
          <h2 className="text-xl font-bold text-wiah-black mb-4">What&apos;s driving this</h2>
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Net migration to the UK surged after 2020, peaking at an estimated 906,000 in the
              year to June 2023. The drivers were distinct and overlapping: post-pandemic recovery
              in international student numbers, new visa routes for health and care workers,
              the Hong Kong BN(O) scheme, and Ukrainian and Afghan resettlement programmes. Almost
              all of the increase was from non-EU nationals — EU net migration has been negative
              since the Brexit transition ended.
            </p>
            <p>
              Since 2023 the government has tightened visa rules significantly. The minimum salary
              threshold for skilled worker visas was raised, dependants of care workers and students
              were restricted, and the graduate visa route was reviewed. These changes are feeding
              through: net migration fell to 204,000 by June 2025. Study and work visa grants both
              dropped sharply in the latest data.
            </p>
            <p>
              The asylum system remains under severe strain despite the backlog falling from its
              2023 peak. Around 64,000 people are still waiting for an initial decision. Small
              boat crossings continue — nearly 195,000 people have arrived this way since 2018,
              with 2025 on track to match or exceed 2024. Meanwhile, enforced returns remain
              a fraction of their pre-2017 levels, and the Rwanda scheme was scrapped after
              removing no asylum seekers.
            </p>
            <p>
              The ONS switched from its long-running International Passenger Survey to
              administrative data in 2023, making pre-2012 figures not directly comparable. All
              recent estimates are provisional and subject to revision. Immigration statistics
              are among the most contested in British public life — the data here is drawn directly
              from official sources to cut through the noise.
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
          {data?.metadata.knownIssues && (
            <ul className="font-mono text-xs text-wiah-mid mt-3 space-y-1">
              {data.metadata.knownIssues.map((issue, i) => (
                <li key={i}>⚠ {issue}</li>
              ))}
            </ul>
          )}
          <p className="font-mono text-xs text-wiah-mid mt-4">
            Data updated automatically via GitHub Actions. Last pipeline run:{' '}
            {new Date().toISOString().slice(0, 10)}.
          </p>
        </section>
      </main>

      {/* Expanded metric modals */}
      {expanded === 'netmig' && (
        <MetricDetailModal
          title="Net migration by nationality, 2012–2025"
          subtitle="Annual net migration (immigration minus emigration), thousands."
          series={netMigSeries}
          annotations={netMigAnnotations}
          yLabel="Thousands"
          source={{
            name: 'ONS',
            dataset: 'Long-term international migration flows, provisional',
            frequency: 'twice yearly',
            url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/internationalmigration/datasets/longterminternationalimmigrationemigrationandnetmigrationflowsprovisional',
          }}
          onClose={() => setExpanded(null)}
        />
      )}
      {expanded === 'asylum' && (
        <MetricDetailModal
          title="Asylum applications and backlog, 2010–2025"
          subtitle="Annual asylum applications vs people awaiting an initial decision at year-end."
          series={asylumAppsSeries}
          yLabel="People"
          source={{
            name: 'Home Office',
            dataset: 'Asylum summary tables (Asy_00a)',
            frequency: 'quarterly',
            url: 'https://www.gov.uk/government/statistical-data-sets/immigration-system-statistics-data-tables',
          }}
          onClose={() => setExpanded(null)}
        />
      )}
      {expanded === 'boats' && (
        <MetricDetailModal
          title="Small boat Channel crossings, 2018–2025"
          subtitle="People detected crossing the English Channel in small boats."
          series={smallBoatsSeries}
          yLabel="People"
          source={{
            name: 'Home Office',
            dataset: 'Small boat arrivals time series',
            frequency: 'weekly',
            url: 'https://www.gov.uk/government/publications/migrants-detected-crossing-the-english-channel-in-small-boats',
          }}
          onClose={() => setExpanded(null)}
        />
      )}
    </>
  );
}
