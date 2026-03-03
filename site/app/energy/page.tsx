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

interface RenewableShare {
  year: number;
  pct: number;
}

interface SourceYear {
  year: number;
  windTWh: number;
  solarTWh: number;
  bioenergyTWh: number;
  hydroTWh: number;
  totalTWh: number;
}

interface PricePoint {
  date: string;
  index: number;
}

interface FuelPovertyPoint {
  year: number;
  pct: number;
}

interface EnergyData {
  national: {
    renewables: {
      sharePct: RenewableShare[];
      bySource: SourceYear[];
    };
    prices: {
      electricity: PricePoint[];
      gas: PricePoint[];
    };
    fuelPoverty: FuelPovertyPoint[];
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

interface GenerationMixPoint {
  year: number;
  gasPct: number;
  coalPct: number;
  nuclearPct: number;
  renewablesPct: number;
}

interface GenerationMixData {
  annual: GenerationMixPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function parseMonthDate(d: string): Date {
  const [year, month] = d.split('-');
  return new Date(parseInt(year), parseInt(month) - 1, 1);
}

function sparkFrom(arr: number[], n = 12) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function EnergyPage() {
  const [data, setData] = useState<EnergyData | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [generationMixData, setGenerationMixData] = useState<GenerationMixData | null>(null);

  useEffect(() => {
    fetch('/data/energy/energy.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
    fetch('/data/energy/generation_mix.json')
      .then(r => r.json())
      .then(setGenerationMixData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  // Chart 1: Renewable electricity by source (multi-line)
  const renewableSourceSeries: Series[] = data
    ? [
        {
          id: 'wind',
          label: 'Wind',
          colour: '#0D1117',
          data: data.national.renewables.bySource.map(d => ({
            date: yearToDate(d.year),
            value: d.windTWh,
          })),
        },
        {
          id: 'solar',
          label: 'Solar',
          colour: '#F4A261',
          data: data.national.renewables.bySource.map(d => ({
            date: yearToDate(d.year),
            value: d.solarTWh,
          })),
        },
        {
          id: 'bioenergy',
          label: 'Bioenergy',
          colour: '#2A9D8F',
          data: data.national.renewables.bySource.map(d => ({
            date: yearToDate(d.year),
            value: d.bioenergyTWh,
          })),
        },
        {
          id: 'hydro',
          label: 'Hydro',
          colour: '#264653',
          data: data.national.renewables.bySource.map(d => ({
            date: yearToDate(d.year),
            value: d.hydroTWh,
          })),
        },
      ]
    : [];

  // Chart 2: Renewable share (single line)
  const renewableShareSeries: Series[] = data
    ? [
        {
          id: 'renewables-share',
          label: 'Renewable share (%)',
          colour: '#2A9D8F',
          data: data.national.renewables.sharePct.map(d => ({
            date: yearToDate(d.year),
            value: d.pct,
          })),
        },
      ]
    : [];

  // Chart 3: Electricity and gas prices (filtered to 2015+)
  const priceSeries: Series[] = data
    ? [
        {
          id: 'electricity-price',
          label: 'Electricity',
          colour: '#E63946',
          data: data.national.prices.electricity
            .filter(d => d.date >= '2015-01')
            .map(d => ({
              date: parseMonthDate(d.date),
              value: d.index,
            })),
        },
        {
          id: 'gas-price',
          label: 'Gas',
          colour: '#F4A261',
          data: data.national.prices.gas
            .filter(d => d.date >= '2015-01')
            .map(d => ({
              date: parseMonthDate(d.date),
              value: d.index,
            })),
        },
      ]
    : [];

  // Chart 4: Fuel poverty
  const fuelPovertySeries: Series[] = data
    ? [
        {
          id: 'fuel-poverty',
          label: 'Fuel poverty (%)',
          data: data.national.fuelPoverty.map(d => ({
            date: yearToDate(d.year),
            value: d.pct,
          })),
        },
      ]
    : [];

  // Chart 5: Generation mix by fuel type (multi-line)
  const generationMixSeries: Series[] = generationMixData
    ? [
        {
          id: 'renewables-mix',
          label: 'Renewables',
          colour: '#2A9D8F',
          data: generationMixData.annual.map(d => ({
            date: yearToDate(d.year),
            value: d.renewablesPct,
          })),
        },
        {
          id: 'gas-mix',
          label: 'Gas',
          colour: '#F4A261',
          data: generationMixData.annual.map(d => ({
            date: yearToDate(d.year),
            value: d.gasPct,
          })),
        },
        {
          id: 'nuclear-mix',
          label: 'Nuclear',
          colour: '#264653',
          data: generationMixData.annual.map(d => ({
            date: yearToDate(d.year),
            value: d.nuclearPct,
          })),
        },
        {
          id: 'coal-mix',
          label: 'Coal',
          colour: '#E63946',
          data: generationMixData.annual.map(d => ({
            date: yearToDate(d.year),
            value: d.coalPct,
          })),
        },
      ]
    : [];

  const generationMixAnnotations: Annotation[] = [
    { date: new Date(2016, 0), label: '2016: Last major coal plant closed' },
    { date: new Date(2023, 0), label: '2023: Renewables >50%' },
  ];

  // ── Annotations ─────────────────────────────────────────────────────────

  const priceAnnotations: Annotation[] = [
    { date: new Date(2021, 8), label: '2021: Energy crisis' },
    { date: new Date(2022, 3), label: 'Apr 2022: Price cap +54%' },
  ];

  const fuelPovertyAnnotations: Annotation[] = [
    { date: new Date(2019, 0), label: '2019: LILEE metric' },
  ];

  // ── Metric values ────────────────────────────────────────────────────────

  const latestRenewable = data?.national.renewables.sharePct.at(-1);
  const latestElecPrice = data?.national.prices.electricity.at(-1);
  const latestFuelPoverty = data?.national.fuelPoverty.at(-1);
  const latestGeneration = data?.national.renewables.bySource.at(-1);

  // Determine direction for electricity price (compare to 12 months ago)
  const elecPrices2015Plus = data?.national.prices.electricity.filter(d => d.date >= '2015-01') || [];
  const elecOneYearAgo = elecPrices2015Plus.length > 12 ? elecPrices2015Plus[elecPrices2015Plus.length - 13] : null;
  const elecDirection = latestElecPrice && elecOneYearAgo
    ? (latestElecPrice.index > elecOneYearAgo.index ? 'up' as const : 'down' as const)
    : ('up' as const);

  // Dynamic finding — unused, replaced with inline prop

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      {/* Sticky nav */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-wiah-border px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/"><SiteName size="nav" /></Link>
          <span className="text-wiah-mid text-sm font-mono">Energy</span>
          <Link href="/" className="text-sm text-wiah-blue hover:underline">&larr; All topics</Link>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Energy"
          question="Can You Actually Afford to Heat Your Home?"
          finding={
            data
              ? `Renewables now generate ${latestRenewable?.pct ?? 45}% of Britain\u2019s electricity — but prices have doubled since 2015 and ${latestFuelPoverty ? `${latestFuelPoverty.pct}%` : '13%'} of households are in fuel poverty.`
              : 'Renewables now generate 45% of Britain\u2019s electricity — but prices have doubled since 2015 and 13% of households are in fuel poverty.'
          }
          colour="#E63946"
        />

        <section className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Britain&apos;s electricity grid has been transformed at a pace few predicted. Renewables
              went from under 3% of generation in 2000 to over 45% by 2024 &mdash; surpassing 50% for
              the first time in 2023. Coal, which supplied roughly 30% of electricity at the millennium,
              fell to zero when Ratcliffe-on-Soar closed in September 2024, ending 142 years of
              coal-fired power. Gas has declined from its peak but still provides a significant share.
              The generation mix chart shows one of the most dramatic energy transitions in any major
              economy, driven largely by the rapid scaling of offshore wind.
            </p>
            <p>
              A cleaner grid has not meant cheaper bills. Because gas-fired plants still set the marginal
              electricity price, the 2021&ndash;22 wholesale gas shock hit consumers directly. The Ofgem
              price cap rose 54% in April 2022 and again in October, pushing typical bills above
              &pound;2,500. The CPI electricity index more than doubled, peaking at 241 in January 2023.
              The Energy Price Guarantee and a &pound;400 bills support scheme blunted the worst of it,
              but prices have not returned to normal: the index still sits at around 201, double the
              2015 level. Until market design catches up with the generation mix, renewable growth
              alone will not deliver lower bills.
            </p>
            <p>
              The cost falls hardest on those least able to absorb it. Under the LILEE metric, 13.8% of
              English households were in fuel poverty in 2023, up from 10.3% in 2018. That is roughly
              3.3 million homes where energy costs consume a disproportionate share of income. The
              methodology changed in 2019, making longer-term comparison difficult, but the direction
              since then is unambiguous. Britain is building one of Europe&apos;s cleanest electricity
              grids while a growing share of its population cannot afford to heat their homes &mdash; a
              paradox that infrastructure investment alone will not resolve.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-prices', label: 'Energy Prices' },
          { id: 'sec-generation-mix', label: 'Generation Mix' },
          { id: 'sec-generation', label: 'Mix Table' },
          { id: 'sec-renewables', label: 'Renewables' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Renewable share"
              value={latestRenewable ? latestRenewable.pct.toFixed(1) : '\u2014'}
              unit="%"
              direction="up"
              polarity="up-is-good"
              baseline="Almost half of UK electricity now from wind, solar, and hydro — up from 3% in 2000"
              changeText={
                latestRenewable
                  ? `${latestRenewable.year} \u00b7 Up from 2.8% in 2000`
                  : 'Loading\u2026'
              }
              sparklineData={
                data
                  ? sparkFrom(data.national.renewables.sharePct.map(d => d.pct))
                  : []
              }
              source="DESNZ \u00b7 Energy Trends Section 6"
              onExpand={renewableShareSeries.length > 0 ? () => setExpanded('renewables') : undefined}
            />
            <MetricCard
              label="Electricity price"
              value={latestElecPrice ? latestElecPrice.index.toFixed(0) : '\u2014'}
              unit="(2015=100)"
              direction={elecDirection}
              polarity="up-is-bad"
              baseline="Average household electricity bills have doubled in real terms since 2015"
              changeText={
                latestElecPrice
                  ? `${latestElecPrice.date} \u00b7 Doubled since 2015`
                  : 'Loading\u2026'
              }
              sparklineData={
                data
                  ? sparkFrom(data.national.prices.electricity.filter(d => d.date >= '2015-01').map(d => d.index))
                  : []
              }
              source="ONS \u00b7 CPI electricity index (D7DT)"
              onExpand={priceSeries.length > 0 ? () => setExpanded('electricity-price') : undefined}
            />
            <MetricCard
              label="Fuel poverty"
              value={latestFuelPoverty ? latestFuelPoverty.pct.toFixed(1) : '\u2014'}
              unit="% of homes"
              direction="up"
              polarity="up-is-bad"
              baseline="1 in 8 households spends more than 10% of income on energy"
              changeText={
                latestFuelPoverty
                  ? `${latestFuelPoverty.year} \u00b7 LILEE metric, England`
                  : 'Loading\u2026'
              }
              sparklineData={
                data
                  ? sparkFrom(data.national.fuelPoverty.map(d => d.pct))
                  : []
              }
              source="DESNZ \u00b7 Fuel poverty statistics"
            />
          </div>
        </ScrollReveal>

        {/* Chart 1: Renewable electricity by source */}
        <div id="sec-renewables">
        {renewableSourceSeries.length > 0 ? (
          <LineChart
            title="Renewable electricity by source, 2010\u20132024"
            subtitle="Annual generation from wind, solar, bioenergy, and hydro. UK total."
            series={renewableSourceSeries}
            yLabel="TWh"
            source={{
              name: 'DESNZ',
              dataset: 'Energy Trends Section 6 \u2014 Renewables',
              frequency: 'annual',
              url: 'https://www.gov.uk/government/statistics/energy-trends-section-6-renewables',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-16" />
        )}

        {/* Chart 2: Renewable share of electricity */}
        {renewableShareSeries.length > 0 ? (
          <LineChart
            title="Renewable share of electricity, 2000\u20132024"
            subtitle="Percentage of total UK electricity generation from renewable sources. A dramatic transformation over two decades."
            series={renewableShareSeries}
            yLabel="Percent"
            source={{
              name: 'DESNZ',
              dataset: 'Energy Trends Section 6 \u2014 Renewables',
              frequency: 'annual',
              url: 'https://www.gov.uk/government/statistics/energy-trends-section-6-renewables',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-16" />
        )}

        </div>{/* end sec-renewables */}

        {/* Chart 3: Electricity and gas price indices */}
        <div id="sec-prices">
        {priceSeries.length > 0 ? (
          <LineChart
            title="Electricity and gas price indices, 2015\u20132026"
            subtitle="CPI price indices for electricity and gas, indexed to 2015=100. Shows the scale of the energy price shock."
            series={priceSeries}
            annotations={priceAnnotations}
            yLabel="Index (2015=100)"
            source={{
              name: 'ONS',
              dataset: 'CPI sub-indices D7DT (electricity), D7DU (gas)',
              frequency: 'monthly',
              url: 'https://www.ons.gov.uk/economy/inflationandpriceindices/timeseries/d7dt/mm23',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-16" />
        )}

        {/* Chart 4: Fuel poverty */}
        {fuelPovertySeries.length > 0 ? (
          <LineChart
            title="Fuel poverty, 2010\u20132023"
            subtitle="Percentage of English households in fuel poverty. The LILEE metric replaced the 10% threshold in 2019."
            series={fuelPovertySeries}
            annotations={fuelPovertyAnnotations}
            yLabel="% of households"
            source={{
              name: 'DESNZ / BEIS',
              dataset: 'Fuel Poverty Statistics (LILEE metric)',
              frequency: 'annual',
              url: 'https://www.gov.uk/government/collections/fuel-poverty-statistics',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-16" />
        )}

        </div>{/* end sec-prices */}

        {/* Chart 6: Generation mix by fuel type — positive story */}
        <div id="sec-generation-mix">
        {generationMixSeries.length > 0 ? (
          <LineChart
            title="UK electricity generation by fuel type, 2000–2024"
            subtitle="Renewables overtook gas in 2023, and coal has almost disappeared. The UK’s electricity grid has been transformed."
            series={generationMixSeries}
            annotations={generationMixAnnotations}
            yLabel="% of generation"
            source={{
              name: 'DESNZ',
              dataset: 'Energy Trends — Electricity: chapter 5',
              frequency: 'quarterly',
              url: 'https://www.gov.uk/government/statistics/electricity-chapter-5-digest-of-united-kingdom-energy-statistics-dukes',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}
        </div>{/* end sec-generation-mix */}

        {/* Chart 5: Generation mix bar table for latest year */}
        {latestGeneration && (
          <ScrollReveal>
            <section id="sec-generation" className="mb-16">
              <h2 className="text-xl font-bold text-wiah-black mb-1">
                Generation mix, {latestGeneration.year}
              </h2>
              <p className="text-sm text-wiah-mid font-mono mb-6">
                Renewable electricity generation by source. Total: {latestGeneration.totalTWh.toFixed(1)} TWh.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-wiah-border">
                      <th className="text-left py-2 pr-4 font-mono text-xs text-wiah-mid">Source</th>
                      <th className="text-right py-2 px-3 font-mono text-xs text-wiah-mid">TWh</th>
                      <th className="text-right py-2 px-3 font-mono text-xs text-wiah-mid">% of total</th>
                      <th className="py-2 pl-3 font-mono text-xs text-wiah-mid w-48">Share</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Wind', value: latestGeneration.windTWh, colour: '#2A9D8F' },
                      { name: 'Bioenergy', value: latestGeneration.bioenergyTWh, colour: '#F4A261' },
                      { name: 'Solar', value: latestGeneration.solarTWh, colour: '#2A9D8F' },
                      { name: 'Hydro', value: latestGeneration.hydroTWh, colour: '#264653' },
                    ]
                      .sort((a, b) => b.value - a.value)
                      .map(source => {
                        const pctOfTotal = (source.value / latestGeneration.totalTWh) * 100;
                        const barWidth = (source.value / latestGeneration.windTWh) * 100; // relative to largest (wind)
                        return (
                          <tr key={source.name} className="border-b border-wiah-border/50 hover:bg-wiah-light/50">
                            <td className="py-2 pr-4 text-sm font-medium">{source.name}</td>
                            <td className="py-2 px-3 font-mono text-sm text-right">
                              {source.value.toFixed(1)}
                            </td>
                            <td className="py-2 px-3 font-mono text-sm text-right font-bold" style={{ color: source.colour }}>
                              {pctOfTotal.toFixed(1)}%
                            </td>
                            <td className="py-2 pl-3">
                              <div className="bg-wiah-light rounded h-3 w-full">
                                <div
                                  className="h-3 rounded"
                                  style={{
                                    width: `${Math.min(barWidth, 100)}%`,
                                    backgroundColor: source.colour,
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
              <p className="font-mono text-xs text-wiah-mid mt-3">
                Source: DESNZ, Energy Trends Section 6. {latestGeneration.year} figures.
              </p>
            </section>
          </ScrollReveal>
        )}

        {/* Positive story */}
        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="45%"
            description="Renewable sources now generate over 45% of Britain&apos;s electricity, up from just 3% in 2000. Wind power alone provides nearly 90 TWh &mdash; more than the entire renewable sector generated a decade ago. Britain&apos;s last coal power station closed in 2024, ending 142 years of coal-fired electricity."
            source="Source: DESNZ &mdash; Energy Trends, 2024."
          />
        </ScrollReveal>

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
      {expanded === 'renewables' && (
        <MetricDetailModal
          title="Renewable share of electricity, 2000\u20132024"
          subtitle="Percentage of total UK electricity generation from renewable sources."
          series={renewableShareSeries}
          yLabel="Percent"
          source={{
            name: 'DESNZ',
            dataset: 'Energy Trends Section 6 \u2014 Renewables',
            frequency: 'annual',
            url: 'https://www.gov.uk/government/statistics/energy-trends-section-6-renewables',
          }}
          onClose={() => setExpanded(null)}
        />
      )}
      {expanded === 'electricity-price' && (
        <MetricDetailModal
          title="Electricity price index, 2015\u20132026"
          subtitle="CPI electricity sub-index (2015=100). Shows the scale of the energy price shock."
          series={priceSeries.length > 0 ? [priceSeries[0]] : []}
          annotations={priceAnnotations}
          yLabel="Index (2015=100)"
          source={{
            name: 'ONS',
            dataset: 'CPI Electricity price index (D7DT)',
            frequency: 'monthly',
            url: 'https://www.ons.gov.uk/economy/inflationandpriceindices/timeseries/d7dt/mm23',
          }}
          onClose={() => setExpanded(null)}
        />
      )}
    </>
  );
}
