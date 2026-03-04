'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

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
  const latestRural = data?.national.ruralUrbanGap.latest;

  return (
    <>
      <TopicNav topic="Broadband & Digital" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Broadband & Digital"
          question="Are You Actually Connected?"
          finding={
            latestFibre && latestRural
              ? `Full fibre broadband has reached ${latestFibre.pct}% of UK premises — but ${latestRural.ruralNot30MbpsPct}% of rural homes still can't get the minimum 30 Mbps standard.`
              : 'Full fibre reaches 68% of UK homes — but rural Britain is still waiting.'
          }
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The United Kingdom&apos;s broadband infrastructure has been transformed since 2017. BT Openreach, Virgin Media O2 and a wave of smaller &ldquo;altnet&rdquo; operators &mdash; including CityFibre, Community Fibre and Hyperoptic &mdash; have collectively reached approximately 52% of UK premises with full fibre to the premises (FTTP) by 2023, up from 2% in 2017. On the government&apos;s own target of national FTTP coverage by 2025, the programme is running two to three years behind. The gap between the UK and comparable European neighbours is significant: Spain reached 80% FTTP coverage by 2022, France 75%, and Sweden 85%, all achieved through a mixture of publicly backed rollout and effective municipal broadband investment. An estimated 685,000 UK premises remain below the Universal Service Obligation standard of 10 Mbps download &mdash; the legal minimum, which Ofcom itself acknowledges is insufficient for a household with multiple simultaneous users. The rural&ndash;urban divide is the defining feature: full fibre reaches 73% of urban premises but only 37% of rural ones.</p>
            <p>The UK&apos;s model is primarily private-sector led, with public subsidy deployed at the margins. Openreach and Virgin Media O2 build commercially in areas where the return on capital meets their internal hurdle rate, which in practice means densely populated urban areas. The government&apos;s Project Gigabit programme &mdash; a &pound;5 billion public investment fund &mdash; is targeted at the 20% of premises that the market will not reach commercially: remote rural areas, market towns below a certain density threshold, and &ldquo;not spots&rdquo; where terrain or low population make the build economics unviable. Procurement under Project Gigabit has been slow; by mid-2023, fewer than 50,000 premises had been connected under the scheme against a target of several million. The altnet sector, which expanded rapidly between 2019 and 2022 driven by cheap debt, has faced financial difficulties as interest rates rose: several operators have been acquired or wound down, and the consolidation has slowed build in some areas.</p>
            <p>Affordability is an increasingly prominent dimension of the connectivity gap. In competitive urban markets where multiple providers overbuild the same streets, the cheapest full fibre tariffs fell to &pound;20&ndash;&pound;30 per month by 2023. In rural areas where BT Openreach remains the sole provider, equivalent packages cost &pound;45&ndash;&pound;55. All major ISPs are required under Ofcom rules to offer &ldquo;social tariffs&rdquo; &mdash; subsidised packages for households in receipt of Universal Credit or other qualifying benefits &mdash; at prices between &pound;10 and &pound;20 per month. Take-up remains low: as of 2023, only around 30% of eligible households had switched to a social tariff, despite an estimated 4.2 million households qualifying. Ofcom attributes low take-up to lack of awareness, stigma and the administrative friction of proving eligibility. An estimated 1.5 million households with school-age children lack a home broadband connection, with the deficit concentrated in the lowest income decile &mdash; a connectivity gap that the COVID-19 period made visible when home-schooling exposed children without internet access.</p>
            <p>The download speed headline obscures the upload speed problem. The UK&apos;s median download speed on fixed broadband is approximately 80 Mbps, which for most household uses is adequate. But median upload speed on FTTC (Fibre to the Cabinet, the dominant technology outside full fibre areas) is around 10&ndash;20 Mbps &mdash; a consequence of the asymmetric design of the copper last-mile connection. Video conferencing, cloud backup, remote working and content creation all require upload speeds that FTTC struggles to deliver consistently. Rural households on legacy ADSL connections face both low download speeds (often 5&ndash;10 Mbps) and upload speeds below 1 Mbps. Starlink satellite broadband, launched commercially in the UK in 2021, now serves an estimated 150,000 rural subscribers at &pound;75 per month, providing download speeds of 100&ndash;200 Mbps and latency significantly better than earlier satellite technologies, but at a cost roughly triple the urban full fibre equivalent. The 5G mobile network, which in urban areas increasingly provides a credible fixed-wireless alternative, reaches fewer than 30% of rural postcodes.</p>
            <p>Broadband data has structural limitations that the headline availability figures do not convey. Ofcom&apos;s annual Connected Nations report &mdash; the primary source for UK coverage statistics &mdash; measures premise-level availability based on ISP self-reported data, not actual connections or speeds experienced. An ISP can report a premise as &ldquo;covered&rdquo; if its network passes nearby, even if the premise itself has not been connected and the cost of doing so would fall to the occupant. Actual speeds experienced vary substantially by time of day as network contention rises during evening peak hours; a 100 Mbps headline speed may deliver 30 Mbps in practice at 8pm. Social tariff non-take-up is tracked through Ofcom surveys, but the survey methodology and question framing have varied between years, making trend analysis unreliable. Build data from Project Gigabit is self-reported by ISP suppliers under contract, and independent verification of premises passed versus premises connected has been limited. Rural coverage in particular relies heavily on modelled estimates extrapolated from nearest exchange data, and Ofcom has acknowledged that rural availability figures may be materially overstated in areas where the cabinet-to-premises copper run exceeds 500 metres.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-speeds', label: 'Speeds & Coverage' },
          { id: 'sec-digital-divide', label: 'Digital Divide' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
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
            baseline="6.5% of rural homes can't get 30 Mbps — six times worse than urban areas (1%)"
          />
        </div>
        </ScrollReveal>

        {/* Chart 1: Speeds */}
        <div id="sec-speeds">
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

        </div>{/* end sec-speeds */}

        {/* Chart 3: Rural vs urban */}
        <div id="sec-digital-divide">
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

        </div>{/* end sec-digital-divide */}

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
