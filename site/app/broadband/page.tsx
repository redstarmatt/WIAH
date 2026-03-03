'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import SiteName from '@/components/SiteName';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';

// ── Types ─────────────────────────────────────────────────────────────────────

interface SpeedPoint { year: number; medianMbps: number; }
interface CoveragePoint { year: number; pct: number; }
interface RuralUrbanPoint { year: number; urbanNot30MbpsPct: number; ruralNot30MbpsPct: number; }
interface FiveGPoint { year: number; premisesPct: number; landmassPct: number; }
interface UsagePoint { year: number; usedInternetPct: number; neverUsedPct: number; }
interface TechPoint { technology: string; pct: number; }

interface BroadbandData {
  national: {
    speeds: { medianTimeSeries: SpeedPoint[]; latest: SpeedPoint };
    coverage: {
      fullFibreTimeSeries: CoveragePoint[];
      gigabitTimeSeries: CoveragePoint[];
      byTechnology: TechPoint[];
      latestFullFibre: CoveragePoint;
      latestGigabit: CoveragePoint;
      governmentTarget: string;
    };
    ruralUrbanGap: { timeSeries: RuralUrbanPoint[]; latest: RuralUrbanPoint };
    fiveG: { timeSeries: FiveGPoint[]; latest: FiveGPoint };
    digitalInclusion: {
      internetUsageTimeSeries: UsagePoint[];
      latest: UsagePoint;
      neverOnlineMillions: number;
    };
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

function yearToDate(y: number): Date { return new Date(y, 0, 1); }

export default function BroadbandPage() {
  const [data, setData] = useState<BroadbandData | null>(null);

  useEffect(() => {
    fetch('/data/broadband/broadband.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // 1. Median speeds
  const speedSeries: Series[] = data
    ? [{
        id: 'speed',
        label: 'Median download speed (Mbps)',
        colour: '#264653',
        data: data.national.speeds.medianTimeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.medianMbps,
        })),
      }]
    : [];

  // 2. Full fibre + gigabit coverage
  const coverageSeries: Series[] = data
    ? [
        {
          id: 'gigabit',
          label: 'Gigabit-capable (%)',
          colour: '#264653',
          data: data.national.coverage.gigabitTimeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.pct,
          })),
        },
        {
          id: 'fullfibre',
          label: 'Full fibre / FTTP (%)',
          colour: '#2A9D8F',
          data: data.national.coverage.fullFibreTimeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.pct,
          })),
        },
      ]
    : [];

  // 3. Rural vs urban gap
  const ruralUrbanSeries: Series[] = data
    ? [
        {
          id: 'rural',
          label: 'Rural — % without decent broadband',
          colour: '#E63946',
          data: data.national.ruralUrbanGap.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.ruralNot30MbpsPct,
          })),
        },
        {
          id: 'urban',
          label: 'Urban — % without decent broadband',
          colour: '#6B7280',
          data: data.national.ruralUrbanGap.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.urbanNot30MbpsPct,
          })),
        },
      ]
    : [];

  // 4. Internet usage (never online)
  const neverOnlineSeries: Series[] = data
    ? [{
        id: 'neveronline',
        label: '% adults who have never used internet',
        colour: '#6B7280',
        data: data.national.digitalInclusion.internetUsageTimeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.neverUsedPct,
        })),
      }]
    : [];

  const latestSpeed = data?.national.speeds.latest;
  const latestFibre = data?.national.coverage.latestFullFibre;
  const latestGigabit = data?.national.coverage.latestGigabit;
  const latestUsage = data?.national.digitalInclusion.latest;
  const latestRural = data?.national.ruralUrbanGap.latest;

  return (
    <>
      {/* Sticky nav */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-wiah-border px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/"><SiteName size="nav" /></Link>
          <span className="text-wiah-mid text-sm font-mono">Broadband & Digital</span>
          <Link href="/" className="text-sm text-wiah-blue hover:underline">&larr; All topics</Link>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Broadband & Digital"
          question="Are You Actually Connected?"
          finding={
            latestSpeed && latestFibre && latestUsage
              ? `Median broadband speeds have risen eightfold since 2013 to ${latestSpeed.medianMbps} Mbps. ${latestFibre.pct}% of premises now have full fibre — up from just 2% in 2017. But ${latestRural?.ruralNot30MbpsPct}% of rural premises still can't receive 30 Mbps, and an estimated 2 million adults have never used the internet.`
              : 'Median broadband speed has risen 8× since 2013. Full fibre reaches 68% of homes. But rural Britain lags far behind and 2 million adults remain offline.'
          }
          colour="#264653"
        />

        {/* Metric cards */}
        <ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Median download speed"
            value={latestSpeed ? latestSpeed.medianMbps.toFixed(0) : '—'}
            unit="Mbps"
            direction="up"
            polarity="up-is-good"
            changeText={
              latestSpeed
                ? `Up from 15 Mbps in 2013 · 8× faster in 10 years`
                : 'Loading…'
            }
            sparklineData={
              data
                ? data.national.speeds.medianTimeSeries.slice(-8).map(d => d.medianMbps)
                : []
            }
            source="Ofcom · Home Broadband Performance tracker"
            baseline="Fast enough to stream 4K video on 25 devices at once — 8× faster than a decade ago"
          />
          <MetricCard
            label="Full fibre coverage"
            value={latestFibre ? latestFibre.pct.toFixed(0) : '—'}
            unit="% of premises"
            direction="up"
            polarity="up-is-good"
            changeText={
              latestGigabit
                ? `${latestGigabit.pct}% gigabit-capable · Govt target: 100% by 2030`
                : 'Loading…'
            }
            sparklineData={
              data
                ? data.national.coverage.fullFibreTimeSeries.slice(-8).map(d => d.pct)
                : []
            }
            source="Ofcom · Connected Nations 2024"
            baseline="2 in 3 homes now have a direct fibre connection — up from 1 in 50 in 2017"
          />
          <MetricCard
            label="Rural broadband gap"
            value={latestRural ? latestRural.ruralNot30MbpsPct.toFixed(1) : '—'}
            unit="% without 30Mbps"
            direction="down"
            polarity="up-is-bad"
            changeText={
              latestRural
                ? `Urban: ${latestRural.urbanNot30MbpsPct}% · Rural: ${latestRural.ruralNot30MbpsPct}% — 6× gap`
                : 'Loading…'
            }
            sparklineData={
              data
                ? data.national.ruralUrbanGap.timeSeries.slice(-6).map(d => d.ruralNot30MbpsPct)
                : []
            }
            source="Ofcom · Connected Nations 2024"
            baseline="6× worse than urban areas — 6.5% of rural homes still can't get decent broadband"
          />
        </div>
        </ScrollReveal>

        {/* Chart 1: Speeds */}
        {speedSeries.length > 0 ? (
          <LineChart
            title="UK median broadband download speed, 2013–2024"
            subtitle="Median residential broadband download speed (Mbps), measured via Ofcom SamKnows panel."
            series={speedSeries}
            annotations={[
              { date: new Date(2019, 0), label: '2019: Lockdown demand surge' },
            ]}
            yLabel="Mbps"
            source={{
              name: 'Ofcom',
              dataset: 'Home Broadband Performance',
              frequency: 'annual',
              url: 'https://www.ofcom.org.uk/research-and-data/telecoms-research/broadband-research/broadband-speeds',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Chart 2: Coverage */}
        {coverageSeries.length > 0 ? (
          <LineChart
            title="Gigabit and full fibre broadband coverage, 2017–2024"
            subtitle="% of UK premises that can receive gigabit-capable or full fibre broadband. Govt target: universal gigabit by 2030."
            series={coverageSeries}
            targetLine={{ value: 100, label: '2030 target' }}
            yLabel="% premises"
            source={{
              name: 'Ofcom',
              dataset: 'Connected Nations — annual broadband coverage report',
              frequency: 'annual',
              url: 'https://www.ofcom.org.uk/research-and-data/telecoms-research/connected-nations',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Coverage by technology table */}
        {data && (
          <section className="mb-12">
            <h3 className="text-lg font-bold text-wiah-black mb-1">Coverage by technology, 2024</h3>
            <p className="text-sm text-wiah-mid font-mono mb-4">% of UK premises able to receive each connection type.</p>
            <div className="space-y-2">
              {data.national.coverage.byTechnology.map(t => (
                <div key={t.technology} className="flex items-center gap-3">
                  <span className="w-48 text-sm text-wiah-black font-sans shrink-0">{t.technology}</span>
                  <div className="flex-1 bg-wiah-light rounded overflow-hidden h-5">
                    <div
                      className="h-full rounded"
                      style={{ width: `${t.pct}%`, backgroundColor: '#264653' }}
                    />
                  </div>
                  <span className="w-16 text-right font-mono text-sm font-bold text-wiah-black">{t.pct}%</span>
                </div>
              ))}
            </div>
            <p className="font-mono text-[11px] text-wiah-mid mt-3">Source: Ofcom Connected Nations 2024.</p>
          </section>
        )}

        {/* Chart 3: Rural vs urban */}
        {ruralUrbanSeries.length > 0 ? (
          <LineChart
            title="Rural vs urban broadband gap, 2019–2024"
            subtitle="% of premises unable to receive 30 Mbps (Ofcom's 'decent broadband' standard). Rural gap is narrowing but remains large."
            series={ruralUrbanSeries}
            yLabel="% without 30Mbps"
            source={{
              name: 'Ofcom',
              dataset: 'Connected Nations — rural/urban breakdown',
              frequency: 'annual',
              url: 'https://www.ofcom.org.uk/research-and-data/telecoms-research/connected-nations',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Chart 4: Digital inclusion */}
        {neverOnlineSeries.length > 0 ? (
          <LineChart
            title="Adults who have never used the internet, 2011–2024"
            subtitle="% of UK adults who have never used the internet (ONS annual survey). Concentrated among over-75s, people with disabilities, and lowest income groups."
            series={neverOnlineSeries}
            yLabel="Percent of adults"
            source={{
              name: 'ONS',
              dataset: 'Internet users, Great Britain',
              frequency: 'annual',
              url: 'https://www.ons.gov.uk/businessindustryandtrade/itandinternetindustry/bulletins/internetusers',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Positive callout */}
        <ScrollReveal>
        <PositiveCallout
          title="What's improving"
          value="8×"
          unit="faster"
          description="UK median broadband speeds have risen eightfold since 2013 — from 15 Mbps to 126 Mbps. The proportion of adults who have never used the internet has fallen from 16% to under 4% in 12 years. The government's Project Gigabit is accelerating full fibre rollout to hard-to-reach rural areas, and 5G now covers 91% of UK premises outdoors."
          source="Source: Ofcom Connected Nations 2024. ONS Internet users 2024."
        />
        </ScrollReveal>

        {/* Context */}
        <section className="max-w-2xl mt-8 mb-12">
          <h2 className="text-xl font-bold text-wiah-black mb-4">What&apos;s driving this</h2>
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              UK broadband infrastructure has transformed in the past decade. The arrival of full fibre
              — a physical optical cable to the premises, replacing the old copper telephone line —
              has driven an eightfold increase in median speeds since 2013. BT Openreach, Virgin Media O2,
              and a wave of smaller &apos;altnet&apos; providers have collectively reached 68% of premises with
              full fibre by 2024, up from just 2% in 2017.
            </p>
            <p>
              The rural gap is the persistent problem. While urban premises are almost universally connected,
              6.5% of rural homes still cannot receive 30 Mbps — the minimum Ofcom considers decent for
              modern use. In remote areas of Scotland, Wales, and Northern Ireland, the figure can exceed
              20%. The government&apos;s Project Gigabit aims to close this gap with subsidised rollout,
              but rural roll-out remains behind schedule.
            </p>
            <p>
              Digital exclusion matters because more and more services — banking, benefits claims,
              job applications, GP appointments — are moving online. An estimated 2 million adults have
              never used the internet. This group is heavily skewed towards the over-75s, people with
              disabilities, and those in the lowest income quintile. For them, digital exclusion compounds
              other disadvantages.
            </p>
            <p>
              5G is rolling out rapidly in urban areas but remains sparse across the countryside. While
              91% of premises can get some outdoor 5G signal from at least one operator, the UK&apos;s
              mountainous regions have large coverage gaps. Indoor 5G coverage — which actually matters
              for most usage — lags significantly behind the headline figures.
            </p>
          </div>
        </section>

        {/* Sources */}
        <section className="border-t border-wiah-border pt-8">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; methodology</h2>
          <ul className="space-y-2 font-mono text-xs text-wiah-mid">
            {data?.metadata.sources.map((src, i) => (
              <li key={i}>
                <a href={src.url} className="underline hover:text-wiah-blue" target="_blank" rel="noreferrer">
                  {src.name} &mdash; {src.dataset} ({src.frequency})
                </a>
              </li>
            ))}
          </ul>
          <p className="font-mono text-xs text-wiah-mid mt-4">{data?.metadata.methodology}</p>
          {data?.metadata.knownIssues && data.metadata.knownIssues.length > 0 && (
            <div className="mt-4">
              <p className="font-mono text-xs text-wiah-mid font-bold mb-1">Known issues:</p>
              <ul className="list-disc list-inside space-y-1 font-mono text-xs text-wiah-mid">
                {data.metadata.knownIssues.map((issue, i) => <li key={i}>{issue}</li>)}
              </ul>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
