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

interface SewageYear {
  year: number;
  totalHours: number;
  totalSpills: number;
  monitorsReporting: number;
  avgSpillsPerOverflow: number;
}

interface CompanyRow {
  name: string;
  totalSpills: number;
  totalHours: number;
  avgSpillsPerOverflow: number;
}

interface RiverYear {
  year: number;
  goodOrBetterPct: number;
}

interface BathingYear {
  year: number;
  excellentPct: number;
  goodPct: number;
  sufficientPct: number;
  poorPct: number;
  totalSites: number;
}

interface WaterData {
  national: {
    sewage: {
      timeSeries: SewageYear[];
      byCompany2024: CompanyRow[];
    };
    riverHealth: { timeSeries: RiverYear[] };
    bathingWater: { timeSeries: BathingYear[] };
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 6, 1); // mid-year for better spacing
}

function fmtK(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(0) + 'K';
  return n.toLocaleString('en-GB');
}

function fmtHours(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return Math.round(n / 1_000).toLocaleString('en-GB') + 'K';
  return n.toLocaleString('en-GB');
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function WaterPage() {
  const [data, setData] = useState<WaterData | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data/water/water.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  // 1. Sewage discharge hours
  const sewageHoursSeries: Series[] = data
    ? [{
        id: 'hours',
        label: 'Total monitored discharge hours',
        data: data.national.sewage.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.totalHours,
        })),
      }]
    : [];

  const sewageAnnotations: Annotation[] = [
    { date: new Date(2018, 6), label: '2018: Monitor rollout accelerates' },
    { date: new Date(2020, 6), label: '2020: 86% coverage reached' },
  ];

  // 2. Sewage spill events
  const sewageSpillsSeries: Series[] = data
    ? [{
        id: 'spills',
        label: 'Total monitored spill events',
        colour: '#E63946',
        data: data.national.sewage.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.totalSpills,
        })),
      }]
    : [];

  // 3. Average spills per overflow
  const avgSpillsSeries: Series[] = data
    ? [{
        id: 'avg-spills',
        label: 'Average spills per monitored overflow',
        colour: '#F4A261',
        data: data.national.sewage.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.avgSpillsPerOverflow,
        })),
      }]
    : [];

  // 4. River health
  const riverSeries: Series[] = data
    ? [{
        id: 'river',
        label: 'Surface waters at good ecological status',
        colour: '#264653',
        data: data.national.riverHealth.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.goodOrBetterPct,
        })),
      }]
    : [];

  // 5. Bathing water — excellent % and poor %
  const bathingExcellentSeries: Series[] = data
    ? [{
        id: 'excellent',
        label: 'Excellent (%)',
        colour: '#2A9D8F',
        data: data.national.bathingWater.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.excellentPct,
        })),
      }]
    : [];

  const bathingPoorSeries: Series[] = data
    ? [{
        id: 'poor',
        label: 'Poor (%)',
        colour: '#E63946',
        data: data.national.bathingWater.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.poorPct,
        })),
      }]
    : [];

  const bathingCombined: Series[] = [...bathingExcellentSeries, ...bathingPoorSeries];

  // 6. Monitor coverage growth
  const monitorSeries: Series[] = data
    ? [{
        id: 'monitors',
        label: 'Monitors reporting',
        colour: '#264653',
        data: data.national.sewage.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.monitorsReporting,
        })),
      }]
    : [];

  // Sort companies by avg spills per overflow for the spills intensity table
  const companiesBySpills = data
    ? [...data.national.sewage.byCompany2024].sort((a, b) => b.avgSpillsPerOverflow - a.avgSpillsPerOverflow)
    : [];

  const maxAvgSpills = companiesBySpills.length > 0 ? companiesBySpills[0].avgSpillsPerOverflow : 1;

  // ── Metric values ────────────────────────────────────────────────────────

  const latestSewage = data?.national.sewage.timeSeries.at(-1);
  const latestRiver = data?.national.riverHealth.timeSeries.at(-1);
  const firstRiver = data?.national.riverHealth.timeSeries[0];
  const latestBathing = data?.national.bathingWater.timeSeries.at(-1);

  // Sort companies by total hours for the bar table
  const companiesByHours = data
    ? [...data.national.sewage.byCompany2024].sort((a, b) => b.totalHours - a.totalHours)
    : [];

  const maxCompanyHours = companiesByHours.length > 0 ? companiesByHours[0].totalHours : 1;

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      {/* Sticky nav */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-wiah-border px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/"><SiteName size="nav" /></Link>
          <span className="text-wiah-mid text-sm font-mono">Water</span>
          <Link href="/" className="text-sm text-wiah-blue hover:underline">&larr; All topics</Link>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Water"
          question="Is Your Water Actually Clean?"
          finding={
            latestSewage && latestBathing
              ? `In ${latestSewage.year}, water companies discharged sewage into England's rivers and seas for ${(latestSewage.totalHours / 1_000_000).toFixed(1)} million hours across ${latestSewage.totalSpills.toLocaleString('en-GB')} monitored spill events — an average of ${latestSewage.avgSpillsPerOverflow.toFixed(0)} spills per overflow. Only ${latestRiver?.goodOrBetterPct ?? 16}% of rivers are in good ecological health — down from ${firstRiver?.goodOrBetterPct ?? 26}% in ${firstRiver?.year ?? 2009}. ${latestBathing.poorPct.toFixed(1)}% of bathing waters are now rated poor, nearly double the level a decade ago.`
              : "England's water companies discharged sewage for over 3.6 million hours in 2024. Only 16% of rivers are in good ecological health and bathing water quality is deteriorating."
          }
          colour="#264653"
        />

        {/* Metric cards */}
        <ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Sewage discharge hours"
            value={latestSewage ? fmtHours(latestSewage.totalHours) : '—'}
            unit="hrs"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestSewage
                ? `${fmtK(latestSewage.totalSpills)} spill events · ${fmtK(latestSewage.monitorsReporting)} monitors`
                : 'Loading…'
            }
            sparklineData={
              data
                ? data.national.sewage.timeSeries.map(d => d.totalHours / 1_000_000)
                : []
            }
            source="Environment Agency · EDM Annual Returns"
            onExpand={sewageHoursSeries.length > 0 ? () => setExpanded('sewage') : undefined}
          />
          <MetricCard
            label="Rivers in good health"
            value={latestRiver ? String(latestRiver.goodOrBetterPct) : '—'}
            unit="%"
            direction="down"
            polarity="up-is-good"
            changeText={
              latestRiver && firstRiver
                ? `Down from ${firstRiver.goodOrBetterPct}% in ${firstRiver.year} · Last assessed ${latestRiver.year}`
                : 'Loading…'
            }
            sparklineData={
              data
                ? data.national.riverHealth.timeSeries.map(d => d.goodOrBetterPct)
                : []
            }
            source="Defra · WFD classification (B3)"
            onExpand={riverSeries.length > 0 ? () => setExpanded('river') : undefined}
          />
          <MetricCard
            label="Bathing waters at excellent"
            value={latestBathing ? latestBathing.excellentPct.toFixed(1) : '—'}
            unit="%"
            direction="down"
            polarity="up-is-good"
            changeText={
              latestBathing
                ? `Poor quality: ${latestBathing.poorPct}% · ${latestBathing.totalSites} sites monitored`
                : 'Loading…'
            }
            sparklineData={
              data
                ? data.national.bathingWater.timeSeries.map(d => d.excellentPct)
                : []
            }
            source="Environment Agency · Bathing water quality (ENV17)"
            onExpand={bathingCombined.length > 0 ? () => setExpanded('bathing') : undefined}
          />
        </div>
        </ScrollReveal>

        {/* Chart 1: Sewage discharge hours */}
        {sewageHoursSeries.length > 0 ? (
          <LineChart
            title="Total sewage discharge hours, 2016–2024"
            subtitle="Monitored hours of sewage discharge via storm overflows, England. Coverage expanded from 862 monitors (2016) to 14,182 (2024 — 100%)."
            series={sewageHoursSeries}
            annotations={sewageAnnotations}
            yLabel="Hours"
            source={{
              name: 'Environment Agency',
              dataset: 'EDM Storm Overflow Annual Returns',
              frequency: 'annual',
              url: 'https://www.data.gov.uk/dataset/19f6064d-7356-466f-844e-d20ea10ae9fd/event-duration-monitoring-storm-overflows-annual-returns',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Chart 2: Total spill events */}
        {sewageSpillsSeries.length > 0 ? (
          <LineChart
            title="Total monitored spill events, 2016–2024"
            subtitle="Number of individual sewage spill events recorded by Event Duration Monitors."
            series={sewageSpillsSeries}
            yLabel="Spill events"
            source={{
              name: 'Environment Agency',
              dataset: 'EDM Storm Overflow Annual Returns',
              frequency: 'annual',
              url: 'https://www.data.gov.uk/dataset/19f6064d-7356-466f-844e-d20ea10ae9fd/event-duration-monitoring-storm-overflows-annual-returns',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Chart 3: Average spills per overflow */}
        {avgSpillsSeries.length > 0 ? (
          <LineChart
            title="Average spills per monitored overflow, 2016–2024"
            subtitle="Each storm overflow spills an average of 30+ times per year. This metric controls for monitor expansion."
            series={avgSpillsSeries}
            yLabel="Spills per overflow"
            source={{
              name: 'Environment Agency',
              dataset: 'EDM Storm Overflow Annual Returns',
              frequency: 'annual',
              url: 'https://www.data.gov.uk/dataset/19f6064d-7356-466f-844e-d20ea10ae9fd/event-duration-monitoring-storm-overflows-annual-returns',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Chart 4: Monitor coverage growth */}
        {monitorSeries.length > 0 ? (
          <LineChart
            title="Storm overflow monitor coverage, 2016–2024"
            subtitle="Number of storm overflows with Event Duration Monitors reporting. Full 100% coverage reached in 2024."
            series={monitorSeries}
            yLabel="Monitors"
            source={{
              name: 'Environment Agency',
              dataset: 'EDM Storm Overflow Annual Returns',
              frequency: 'annual',
              url: 'https://www.data.gov.uk/dataset/19f6064d-7356-466f-844e-d20ea10ae9fd/event-duration-monitoring-storm-overflows-annual-returns',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Water company comparison table */}
        {companiesByHours.length > 0 && (
          <div className="mb-12">
            <h3 className="text-lg font-bold text-wiah-black mb-1">Sewage discharge by water company, 2024</h3>
            <p className="text-sm text-wiah-mid mb-4">
              Total monitored discharge hours. All 10 water and sewerage companies in England and Wales.
            </p>
            <div className="border border-wiah-border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-wiah-light">
                    <th className="text-left px-4 py-2 font-mono text-xs text-wiah-mid font-normal">Company</th>
                    <th className="text-right px-4 py-2 font-mono text-xs text-wiah-mid font-normal w-24">Hours</th>
                    <th className="text-right px-4 py-2 font-mono text-xs text-wiah-mid font-normal w-24">Spills</th>
                    <th className="text-right px-4 py-2 font-mono text-xs text-wiah-mid font-normal w-20">Avg/overflow</th>
                    <th className="hidden sm:table-cell px-4 py-2 w-48"></th>
                  </tr>
                </thead>
                <tbody>
                  {companiesByHours.map((c, i) => {
                    const pct = (c.totalHours / maxCompanyHours) * 100;
                    return (
                      <tr key={c.name} className={i % 2 === 0 ? 'bg-white' : 'bg-wiah-light/50'}>
                        <td className="px-4 py-2 text-wiah-black">{c.name}</td>
                        <td className="px-4 py-2 text-right font-mono text-xs text-wiah-black">{fmtHours(c.totalHours)}</td>
                        <td className="px-4 py-2 text-right font-mono text-xs text-wiah-black">{fmtK(c.totalSpills)}</td>
                        <td className="px-4 py-2 text-right font-mono text-xs text-wiah-black">{c.avgSpillsPerOverflow.toFixed(1)}</td>
                        <td className="hidden sm:table-cell px-4 py-2">
                          <div className="w-full bg-wiah-light rounded-full h-3">
                            <div
                              className="h-3 rounded-full"
                              style={{
                                width: `${pct}%`,
                                backgroundColor: c.avgSpillsPerOverflow >= 35 ? '#E63946' : c.avgSpillsPerOverflow >= 28 ? '#F4A261' : '#2A9D8F',
                              }}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="font-mono text-[11px] text-wiah-mid mt-2">
              <a href="https://www.data.gov.uk/dataset/19f6064d-7356-466f-844e-d20ea10ae9fd/event-duration-monitoring-storm-overflows-annual-returns" target="_blank" rel="noreferrer" className="hover:underline">
                Source: Environment Agency, EDM Storm Overflow Annual Returns, 2024. Updated annually.
              </a>
            </p>
          </div>
        )}

        {/* Spills per overflow by company — sorted worst-first */}
        {companiesBySpills.length > 0 && (
          <div className="mb-12">
            <h3 className="text-lg font-bold text-wiah-black mb-1">Average spills per overflow by company, 2024</h3>
            <p className="text-sm text-wiah-mid mb-4">
              Average number of spill events per monitored storm overflow. Higher = more frequent sewage discharges. Sorted worst-first.
            </p>
            <div className="divide-y divide-wiah-border">
              {companiesBySpills.map(c => {
                const pct = (c.avgSpillsPerOverflow / maxAvgSpills) * 100;
                const colour = c.avgSpillsPerOverflow >= 35 ? '#E63946' : c.avgSpillsPerOverflow >= 28 ? '#F4A261' : '#2A9D8F';
                return (
                  <div key={c.name} className="py-3 flex items-center gap-4">
                    <span className="text-sm text-wiah-black w-48 shrink-0">{c.name}</span>
                    <div className="flex-1 bg-wiah-light rounded h-3">
                      <div
                        className="h-3 rounded"
                        style={{ width: `${pct}%`, backgroundColor: colour }}
                      />
                    </div>
                    <span className="font-mono text-sm font-bold w-16 text-right" style={{ color: colour }}>
                      {c.avgSpillsPerOverflow.toFixed(1)}
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="font-mono text-[11px] text-wiah-mid mt-2">
              <a href="https://www.data.gov.uk/dataset/19f6064d-7356-466f-844e-d20ea10ae9fd/event-duration-monitoring-storm-overflows-annual-returns" target="_blank" rel="noreferrer" className="hover:underline">
                Source: Environment Agency, EDM Storm Overflow Annual Returns, 2024. Updated annually.
              </a>
            </p>
          </div>
        )}

        {/* Chart 5: River health */}
        {riverSeries.length > 0 ? (
          <LineChart
            title="Rivers at good ecological status, 2009–2019"
            subtitle="Percentage of surface water bodies classified as good or better under the Water Framework Directive. Last full classification: 2019."
            series={riverSeries}
            yLabel="Percent"
            source={{
              name: 'Environment Agency / Defra',
              dataset: 'Water Framework Directive classification (B3 indicator)',
              frequency: 'periodic (last full classification 2019)',
              url: 'https://oifdata.defra.gov.uk/themes/water/B3/',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Chart 5: Bathing water quality */}
        {bathingCombined.length > 0 ? (
          <LineChart
            title="Bathing water quality, 2015–2025"
            subtitle="Percentage of bathing water sites rated excellent and poor. No 2020 data (COVID). rBWD classification."
            series={bathingCombined}
            yLabel="Percent"
            source={{
              name: 'Environment Agency',
              dataset: 'Bathing water quality statistics (ENV17)',
              frequency: 'annual',
              url: 'https://www.gov.uk/government/statistics/bathing-water-quality-statistics',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Bathing water breakdown table */}
        {data && data.national.bathingWater.timeSeries.length > 0 && (
          <div className="mb-12">
            <h3 className="text-lg font-bold text-wiah-black mb-1">Bathing water classifications, 2015–2025</h3>
            <p className="text-sm text-wiah-mid mb-4">
              Percentage of designated bathing waters in each classification. No data for 2020 (COVID).
            </p>
            <div className="border border-wiah-border rounded-lg overflow-hidden overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-wiah-light">
                    <th className="text-left px-3 py-2 font-mono text-xs text-wiah-mid font-normal">Year</th>
                    <th className="text-right px-3 py-2 font-mono text-xs font-normal" style={{ color: '#2A9D8F' }}>Excellent</th>
                    <th className="text-right px-3 py-2 font-mono text-xs font-normal" style={{ color: '#264653' }}>Good</th>
                    <th className="text-right px-3 py-2 font-mono text-xs font-normal" style={{ color: '#F4A261' }}>Sufficient</th>
                    <th className="text-right px-3 py-2 font-mono text-xs font-normal" style={{ color: '#E63946' }}>Poor</th>
                    <th className="text-right px-3 py-2 font-mono text-xs text-wiah-mid font-normal">Sites</th>
                  </tr>
                </thead>
                <tbody>
                  {data.national.bathingWater.timeSeries.map((d, i) => (
                    <tr key={d.year} className={i % 2 === 0 ? 'bg-white' : 'bg-wiah-light/50'}>
                      <td className="px-3 py-1.5 font-mono text-xs text-wiah-black font-bold">{d.year}</td>
                      <td className="px-3 py-1.5 text-right font-mono text-xs" style={{ color: '#2A9D8F' }}>{d.excellentPct}%</td>
                      <td className="px-3 py-1.5 text-right font-mono text-xs" style={{ color: '#264653' }}>{d.goodPct}%</td>
                      <td className="px-3 py-1.5 text-right font-mono text-xs" style={{ color: '#F4A261' }}>{d.sufficientPct}%</td>
                      <td className="px-3 py-1.5 text-right font-mono text-xs" style={{ color: '#E63946' }}>{d.poorPct}%</td>
                      <td className="px-3 py-1.5 text-right font-mono text-xs text-wiah-mid">{d.totalSites}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="font-mono text-[11px] text-wiah-mid mt-2">
              <a href="https://www.gov.uk/government/statistics/bathing-water-quality-statistics" target="_blank" rel="noreferrer" className="hover:underline">
                Source: Environment Agency, Bathing water quality statistics (ENV17). Updated annually.
              </a>
            </p>
          </div>
        )}

        {/* Positive story */}
        <ScrollReveal>
        <PositiveCallout
          title="What's improving"
          value="100%"
          unit="monitored"
          description="For the first time, all 14,182 storm overflows in England are now monitored — up from just 862 in 2016. The true scale of sewage discharge is finally visible, creating accountability that was previously impossible."
          source="Source: Environment Agency — Event Duration Monitoring data, 2024."
        />
        </ScrollReveal>

        {/* Context */}
        <section className="max-w-2xl mt-8 mb-12">
          <h2 className="text-xl font-bold text-wiah-black mb-4">What&apos;s driving this</h2>
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The headline numbers on sewage discharge are genuinely shocking &mdash; 3.6 million hours
              of raw sewage pumped into rivers and seas in 2024 &mdash; but they need careful interpretation.
              Much of the apparent increase from 2016 reflects dramatically expanded monitoring:
              only 862 storm overflows had monitors in 2016 compared to 14,182 (100%) in 2024. The
              problem was always there; we just couldn&apos;t measure it.
            </p>
            <p>
              The more telling metric is the average spills per overflow, which controls for monitor
              expansion. This peaked at 35 spills per overflow in 2019 and has since fallen somewhat
              to around 32 in 2024. Each overflow still spills, on average, once every 11 days. Storm
              overflows are designed as safety valves for exceptional rainfall, but the data shows they
              operate routinely.
            </p>
            <p>
              River health tells an even starker story. Only 16% of English surface waters meet
              &ldquo;good ecological status&rdquo; under the Water Framework Directive &mdash; down
              from 26% in 2009. This has been declining steadily, and crucially, no full reclassification
              has been done since 2019 despite the legal requirement to reach good status by 2027.
              Agricultural runoff, sewage pollution, and physical modification of waterways are the
              main drivers.
            </p>
            <p>
              Bathing water quality has been more stable but shows a worrying recent trend. The
              proportion of sites rated &ldquo;excellent&rdquo; peaked at 72% in 2022 but has since
              fallen to 66% in 2025, while &ldquo;poor&rdquo; rated sites have roughly doubled from
              3.8% in 2015 to 7.1% in 2025. Climate change is a factor &mdash; heavier rainfall
              events overwhelm sewerage systems &mdash; but so is chronic underinvestment in
              infrastructure.
            </p>
            <p>
              There are some signs of progress. Ofwat has approved record investment plans for
              2025&ndash;2030, and water companies face increasing regulatory and public pressure.
              Full monitoring coverage at 100% of storm overflows means the scale of the problem
              is now visible for the first time. Whether that translates into meaningful improvement
              remains to be seen.
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
      {expanded === 'sewage' && (
        <MetricDetailModal
          title="Total sewage discharge hours, 2016–2024"
          subtitle="Monitored hours of sewage discharge via storm overflows. Monitor coverage expanded from 862 (2016) to 14,182 (2024)."
          series={sewageHoursSeries}
          annotations={sewageAnnotations}
          yLabel="Hours"
          source={{
            name: 'Environment Agency',
            dataset: 'EDM Storm Overflow Annual Returns',
            frequency: 'annual',
            url: 'https://www.data.gov.uk/dataset/19f6064d-7356-466f-844e-d20ea10ae9fd/event-duration-monitoring-storm-overflows-annual-returns',
          }}
          onClose={() => setExpanded(null)}
        />
      )}
      {expanded === 'river' && (
        <MetricDetailModal
          title="Rivers at good ecological status, 2009–2019"
          subtitle="Percentage of surface water bodies at good or better status, Water Framework Directive."
          series={riverSeries}
          yLabel="Percent"
          source={{
            name: 'Environment Agency / Defra',
            dataset: 'WFD classification (B3 indicator)',
            frequency: 'periodic',
            url: 'https://oifdata.defra.gov.uk/themes/water/B3/',
          }}
          onClose={() => setExpanded(null)}
        />
      )}
      {expanded === 'bathing' && (
        <MetricDetailModal
          title="Bathing water quality, 2015–2025"
          subtitle="Percentage of sites rated excellent and poor under the revised Bathing Water Directive."
          series={bathingCombined}
          yLabel="Percent"
          source={{
            name: 'Environment Agency',
            dataset: 'Bathing water quality statistics (ENV17)',
            frequency: 'annual',
            url: 'https://www.gov.uk/government/statistics/bathing-water-quality-statistics',
          }}
          onClose={() => setExpanded(null)}
        />
      )}
    </>
  );
}
