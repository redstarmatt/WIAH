'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';

// ── Types ─────────────────────────────────────────────────────────────────────

interface RecyclePoint { year: number; recyclePct: number; }
interface TreatmentPoint { year: number; recycledPct: number; landfillPct: number; incinerationPct: number; otherPct: number; }
interface FlyTippingPoint { year: string; incidents: number; }
interface PackagingMaterial { material: string; recyclePct: number; colour: string; }

interface WasteData {
  topic: string;
  lastUpdated: string;
  national: {
    recyclingRate: {
      timeSeries: RecyclePoint[];
      latest: RecyclePoint;
      target2035: number;
    };
    treatmentMix: {
      timeSeries: TreatmentPoint[];
    };
    flyTipping: {
      timeSeries: FlyTippingPoint[];
      latest: FlyTippingPoint;
    };
    packagingRecycling: PackagingMaterial[];
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

function yearToDate(y: number): Date { return new Date(y, 0, 1); }
function ftYearToDate(s: string): Date { return new Date(parseInt(s.split('/')[0]) + 1, 0, 1); }

export default function WastePage() {
  const [data, setData] = useState<WasteData | null>(null);

  useEffect(() => {
    fetch('/data/waste/waste.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // 1. Recycling rate with target line
  const recycleSeries: Series[] = data
    ? [{
        id: 'recycle',
        label: 'Local authority collected waste recycled (%)',
        colour: '#264653',
        data: data.national.recyclingRate.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.recyclePct,
        })),
      }]
    : [];

  const recycleAnnotations: Annotation[] = [
    { date: new Date(2010, 0), label: '2010: 40% achieved' },
    { date: new Date(2011, 0), label: '2011: Plateaued at ~44%' },
  ];

  // 2. Treatment mix (stacked conceptually)
  const treatmentSeries: Series[] = data
    ? [
        {
          id: 'recycled',
          label: 'Recycled (%)',
          colour: '#2A9D8F',
          data: data.national.treatmentMix.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.recycledPct,
          })),
        },
        {
          id: 'landfill',
          label: 'Landfill (%)',
          colour: '#E63946',
          data: data.national.treatmentMix.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.landfillPct,
          })),
        },
        {
          id: 'incineration',
          label: 'Incineration / Energy from Waste (%)',
          colour: '#F4A261',
          data: data.national.treatmentMix.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.incinerationPct,
          })),
        },
      ]
    : [];

  // 3. Fly-tipping incidents
  const flyTippingSeries: Series[] = data
    ? [{
        id: 'flytipping',
        label: 'Fly-tipping incidents reported (England)',
        colour: '#E63946',
        data: data.national.flyTipping.timeSeries.map(d => ({
          date: ftYearToDate(d.year),
          value: d.incidents / 1000, // Convert to thousands for readability
        })),
      }]
    : [];

  const latestRecycle = data?.national.recyclingRate.latest;
  const latestFlyTipping = data?.national.flyTipping.latest;
  const latestTreatment = data?.national.treatmentMix.timeSeries[data.national.treatmentMix.timeSeries.length - 1];

  return (
    <>
      <TopicNav topic="Waste" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Waste"
          question="Does Your Recycling Actually Get Recycled?"
          finding={
            data
              ? `England recycles just ${latestRecycle?.recyclePct}% of household waste — stalled for over a decade, with 65% needed by 2035. Meanwhile incineration has replaced landfill as the main destination for everything else.`
              : 'England recycles just 44% of household waste — stalled for over a decade, with 65% needed by 2035.'
          }
          colour="#264653"
        />

        <section className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              England's recycling rate stands at 43.8% — virtually unchanged since it
              stalled at roughly 44% in 2011. The government target is 65% by 2035, a gap of
              more than 20 percentage points with no credible trajectory to close it. What has
              changed, dramatically, is where the rest goes. Landfill collapsed from 81% of
              household waste in 2000 to just 5.5% today, but recycling did not fill the void.
              Incineration did. Energy-from-waste capacity more than doubled since 2014 to
              17.3 million tonnes a year, and EfW plants now handle nearly half of all collected
              household waste. Councils have swapped one end-of-pipe solution for another —
              cleaner than landfill, but neither circular nor cheap to unwind once 25-year
              burn contracts are signed.
            </p>
            <p>
              The recycling rate masks sharp material-by-material variation. Paper and card recover
              at 86%, glass and metal at around 80%, but plastic manages just 51% — and much of
              that is downcycled rather than remade. The UK is the world's second-largest
              exporter of plastic waste; after China banned imports in 2018, shipments shifted to
              Turkey, Malaysia and Vietnam, where oversight is weaker. At home, contamination
              undermines what collection achieves: 82% of households put wrong items in recycling
              bins, and 525,000 tonnes are rejected at sorting facilities each year. Public
              willingness is not the bottleneck — infrastructure and end-markets are.
            </p>
            </div>
        </section>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {latestRecycle && (
            <MetricCard
              label="Recycling rate"
              value={latestRecycle.recyclePct.toString()}
              unit="%"
              direction="down"
              polarity="up-is-good"
              changeText="Target 65% by 2035"
              source="DEFRA — WasteDataFlow, 2023. England only."
            />
          )}
          {latestTreatment && (
            <MetricCard
              label="Landfill share"
              value={latestTreatment.landfillPct.toString()}
              unit="%"
              direction="down"
              polarity="up-is-bad"
              changeText="Down from 81% in 2000"
              source="DEFRA — WasteDataFlow, 2023."
            />
          )}
          {latestFlyTipping && (
            <MetricCard
              label="Fly-tipping incidents"
              value="964"
              unit="K/yr"
              direction="down"
              polarity="up-is-bad"
              changeText="Down from 1.1M peak in 2020"
              source="DEFRA — Fly-tipping statistics, 2023/24."
            />
          )}
        </div>

        {/* ── Section: Recycling Rate Over Time ──────────────────────────────────────────── */}
        <div id="sec-recycling-rate" className="mb-16">
          {recycleSeries.length > 0 ? (
            <LineChart
              title="England recycling rate, 2000–2023"
              subtitle="Local authority collected household waste. Recycling has stalled at ~44% since 2011, far short of the 2035 target of 65%."
              series={recycleSeries}
              yLabel="Percent"
              targetLine={{ value: 65, label: 'Target: 65% by 2035' }}
              annotations={recycleAnnotations}
              source={{
                name: 'DEFRA',
                dataset: 'Local authority collected waste statistics (WasteDataFlow)',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/local-authority-collected-waste-management-annual-results',
              }}
            />
          ) : (
            <div className="h-96 bg-wiah-light rounded animate-pulse mb-12" />
          )}
        </div>

        {/* ── Section: Treatment Mix Over Time ──────────────────────────────────────────── */}
        <div id="sec-treatment-mix" className="mb-16">
          {treatmentSeries.length > 0 ? (
            <LineChart
              title="Household waste treatment mix, 2000–2023"
              subtitle="England. Landfill has collapsed from 81% to 6%. Incineration has become the primary non-recycled route, rising from 10% to 47%."
              series={treatmentSeries}
              yLabel="Percent"
              source={{
                name: 'DEFRA',
                dataset: 'Local authority collected waste statistics (WasteDataFlow)',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/local-authority-collected-waste-management-annual-results',
              }}
            />
          ) : (
            <div className="h-96 bg-wiah-light rounded animate-pulse mb-12" />
          )}
        </div>

        {/* ── Section: Fly-tipping Incidents ──────────────────────────────────────────── */}
        <div id="sec-flytipping" className="mb-16">
          {flyTippingSeries.length > 0 ? (
            <LineChart
              title="Fly-tipping incidents reported, 2007/08–2023/24"
              subtitle="England. Fly-tipping surged during COVID (1.1M in 2020/21) and remains high. Cost to local authorities: £700M+ annually to clean up."
              series={flyTippingSeries}
              yLabel="Incidents (thousands)"
              source={{
                name: 'DEFRA',
                dataset: 'Fly-tipping statistics for England',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/fly-tipping-statistics-for-england',
              }}
            />
          ) : (
            <div className="h-96 bg-wiah-light rounded animate-pulse mb-12" />
          )}
        </div>

        {/* ── Section: Packaging Recycling by Material ────────────────────────────────── */}
        <div id="sec-packaging" className="mb-16">
          <h3 className="text-lg font-bold text-wiah-black mb-1">
            Packaging recycling rates by material, 2023
          </h3>
          <p className="text-sm text-wiah-mid font-mono mb-6">
            Plastic is recycled at half the rate of paper or glass — and much is downcycled rather than remade into bottles.
          </p>

          {data ? (
            <div className="space-y-2 mb-6">
              {data.national.packagingRecycling.map(m => {
                const barPct = (m.recyclePct / 90) * 100;
                return (
                  <div key={m.material} className="flex items-center gap-3">
                    <div className="w-24 text-right text-xs font-mono text-wiah-mid shrink-0">
                      {m.material}
                    </div>
                    <div className="flex-1 bg-wiah-light rounded-sm overflow-hidden h-6">
                      <div
                        className="h-full rounded-sm flex items-center pl-2 transition-all duration-500"
                        style={{ width: `${barPct}%`, backgroundColor: m.colour }}
                      />
                    </div>
                    <div className="w-12 text-right text-xs font-mono font-bold shrink-0" style={{ color: m.colour }}>
                      {m.recyclePct}%
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="h-48 bg-wiah-light rounded animate-pulse mb-6" />
          )}

          <p className="font-mono text-[11px] text-wiah-mid">
            <a
              href="https://www.gov.uk/government/statistics/uk-waste-data"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Source: DEFRA / Environment Agency — UK statistics on waste, National Packaging Waste Database, 2023.
            </a>
          </p>
        </div>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What's changing"
            value="47"
            unit="% incinerated"
            description="Incineration (Energy from Waste) replaces landfill — better for methane emissions, but not circular. The real win is the shift to producer responsibility: from April 2024, producers bear the full cost of managing their packaging, creating incentives for lighter designs, refillable systems, and genuinely recyclable materials. Early signs show companies investing in reuse schemes (e.g. deposit returns for drinks bottles) and material innovation. If EPR works, plastic design will change first."
            source="Source: DEFRA Extended Producer Responsibility guidance, 2024."
          />
        </ScrollReveal>

        {/* Sources */}
        <section className="border-t border-wiah-border pt-8">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; methodology</h2>
          <ul className="space-y-2 font-mono text-xs text-wiah-mid">
            {data?.metadata.sources.map((src, i) => (
              <li key={i}>
                <a href={src.url} className="underline hover:text-wiah-blue" target="_blank" rel="noreferrer">
                  {src.name} — {src.dataset} ({src.frequency})
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
