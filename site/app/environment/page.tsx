'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ─────────────────────────────────────────────────────────────────────

interface GhgPoint { year: number; mtCO2e: number; }
interface SectorPoint { sector: string; mtCO2e: number; }
interface AirQualityPoint { year: number; pm25UgM3: number; }
interface BiodiversityPoint { year: number; index: number; }
interface WoodlandPoint { year: number; kHectares: number; }
interface FloodPoint { year: number; propertiesM: number; }
interface MilestonePoint { year: number; targetMtCO2e: number; }

interface EnvironmentData {
  national: {
    ghgEmissions: {
      timeSeries: GhgPoint[];
      bySector: SectorPoint[];
      netZeroMilestones: MilestonePoint[];
      latest: GhgPoint;
      baseline1990: GhgPoint;
      reductionSince1990Pct: number;
    };
    airQuality: {
      pm25TimeSeries: AirQualityPoint[];
      latest: AirQualityPoint;
      reductionSince2009Pct: number;
      whoGuideline: number;
      ukLegalLimit: number;
    };
    biodiversity: {
      speciesAbundanceIndex: BiodiversityPoint[];
      latest: BiodiversityPoint;
      declineSince1970Pct: number;
    };
    woodland: {
      creationTimeSeries: WoodlandPoint[];
      latest: WoodlandPoint;
    };
    flooding: {
      propertiesAtRisk: FloodPoint[];
      latest: FloodPoint;
    };
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

interface RecyclingPoint {
  year: number;
  recyclingRatePct: number;
}

interface LandfillPoint {
  year: number;
  landfillPct: number;
}

interface RecyclingData {
  householdRecycling: RecyclingPoint[];
  target2035: number;
  ewLandfillDiversionPct: LandfillPoint[];
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

export default function EnvironmentPage() {
  const [data, setData] = useState<EnvironmentData | null>(null);
  const [recyclingData, setRecyclingData] = useState<RecyclingData | null>(null);

  useEffect(() => {
    fetch('/data/environment/environment.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
    fetch('/data/environment/recycling.json')
      .then(r => r.json())
      .then(setRecyclingData)
      .catch(console.error);
  }, []);

  // 1. GHG emissions series + net-zero pathway
  const ghgSeries: Series[] = data
    ? [
        {
          id: 'ghg',
          label: 'UK territorial emissions (MtCO₂e)',
          colour: '#E63946',
          data: data.national.ghgEmissions.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.mtCO2e,
          })),
        },
        {
          id: 'netzero',
          label: 'Net-zero pathway',
          colour: '#2A9D8F',
          data: data.national.ghgEmissions.netZeroMilestones.map(d => ({
            date: yearToDate(d.year),
            value: d.targetMtCO2e,
          })),
        },
      ]
    : [];

  const ghgAnnotations: Annotation[] = [
    { date: new Date(2008, 0), label: '2008: Financial crisis' },
    { date: new Date(2015, 0), label: '2015: Paris Agreement' },
    { date: new Date(2020, 0), label: '2020: COVID-19' },
  ];

  // 2. PM2.5 air quality
  const pm25Series: Series[] = data
    ? [{
        id: 'pm25',
        label: 'PM2.5 mean concentration (µg/m³)',
        colour: '#6B7280',
        data: data.national.airQuality.pm25TimeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.pm25UgM3,
        })),
      }]
    : [];

  const pm25Annotations: Annotation[] = [
    { date: new Date(2020, 0), label: '2020: COVID lockdowns' },
  ];

  // 3. Biodiversity index
  const biodiversitySeries: Series[] = data
    ? [{
        id: 'biodiversity',
        label: 'UK species abundance index (1970 = 100)',
        colour: '#2A9D8F',
        data: data.national.biodiversity.speciesAbundanceIndex.map(d => ({
          date: yearToDate(d.year),
          value: d.index,
        })),
      }]
    : [];

  const biodiversityAnnotations: Annotation[] = [
    { date: new Date(1981, 0), label: '1981: Wildlife & Countryside Act' },
    { date: new Date(2000, 0), label: '2000: Countryside & Rights of Way Act' },
  ];

  // 4. Woodland creation
  const woodlandSeries: Series[] = data
    ? [{
        id: 'woodland',
        label: 'New woodland (thousand hectares/yr, England)',
        colour: '#2A9D8F',
        data: data.national.woodland.creationTimeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.kHectares,
        })),
      }]
    : [];

  // 5. Flood risk
  const floodSeries: Series[] = data
    ? [{
        id: 'flood',
        label: 'Properties at significant flood risk (millions)',
        colour: '#264653',
        data: data.national.flooding.propertiesAtRisk.map(d => ({
          date: yearToDate(d.year),
          value: d.propertiesM,
        })),
      }]
    : [];

  // 6. Recycling and landfill series
  const recyclingSeries: Series[] = recyclingData
    ? [
        {
          id: 'recycling',
          label: 'Recycling rate (%)',
          colour: '#2A9D8F',
          data: recyclingData.householdRecycling.map(d => ({
            date: yearToDate(d.year),
            value: d.recyclingRatePct,
          })),
        },
        {
          id: 'landfill',
          label: 'Landfill rate (%)',
          colour: '#E63946',
          data: recyclingData.ewLandfillDiversionPct.map(d => ({
            date: yearToDate(d.year),
            value: d.landfillPct,
          })),
        },
      ]
    : [];

  const recyclingAnnotations: Annotation[] = [
    { date: new Date(2013, 0), label: '2013: Progress stalls' },
  ];

  const latestGhg = data?.national.ghgEmissions.latest;
  const latestPm25 = data?.national.airQuality.latest;
  const latestBio = data?.national.biodiversity.latest;
  const reductionPct = data?.national.ghgEmissions.reductionSince1990Pct;

  return (
    <>
      <TopicNav topic="Environment" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment"
          question="What Are We Actually Doing to the Planet?"
          finding={
            data
              ? `UK emissions have fallen ${reductionPct}% since 1990, but wildlife abundance has dropped to ${latestBio?.index ?? 68}% of 1970 levels — one of the worst biodiversity records in Europe.`
              : 'UK emissions have halved since 1990, but wildlife abundance has dropped to 68% of 1970 levels — one of the worst biodiversity records in Europe.'
          }
          colour="#2A9D8F"
        />

        <section className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The UK&apos;s environmental record splits sharply in two. On emissions, it is a genuine
              success: greenhouse gases are down over 50% since 1990, one of the steepest falls in the
              G7, driven largely by replacing coal with renewables in electricity generation. But on
              nature, the picture is dire. The UK ranks in the bottom 10% globally on the Natural
              History Museum&apos;s Biodiversity Intactness Index. Wildlife abundance has fallen to 68%
              of 1970 levels; 56% of British species declined between 1970 and 2013, and 15% are
              threatened with extinction. Intensified agriculture, urban expansion, and pesticide use
              are the primary drivers. Britain has decarbonised its grid while continuing to deplete
              its natural systems.
            </p>
            <p>
              Air quality has improved steadily &mdash; PM2.5 concentrations are down 31% since 2009
              &mdash; but still causes an estimated 30,000 deaths per year. Average concentrations
              remain nearly double the WHO&apos;s 5 &micro;g/m&sup3; guideline, and roughly 2 million
              people live in areas exceeding the UK legal limit of 20 &micro;g/m&sup3;. On flooding,
              3.7 million properties are now at significant risk in England, a 54% increase since 2008.
              The Climate Change Committee consistently rates the UK&apos;s adaptation plans as
              inadequate. The gap between the pace of climate change and the pace of preparation
              continues to widen.
            </p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-emissions', label: 'Emissions' },
          { id: 'sec-nature', label: 'Nature' },
          { id: 'sec-air', label: 'Air Quality' },
          { id: 'sec-recycling', label: 'Waste & Recycling' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="GHG emissions"
            value={latestGhg ? latestGhg.mtCO2e.toFixed(0) : '—'}
            unit="MtCO₂e"
            direction="down"
            polarity="up-is-bad"
            changeText={
              reductionPct
                ? `Down ${reductionPct}% since 1990 · 2050 target: net zero`
                : 'Loading…'
            }
            sparklineData={
              data
                ? data.national.ghgEmissions.timeSeries.slice(-15).map(d => d.mtCO2e)
                : []
            }
            source="DESNZ · UK provisional GHG estimates 2023"
            baseline="395 MtCO₂e today — down from 792 MtCO₂e in 1990, the steepest fall in the G7"
          />
          <MetricCard
            label="Species abundance"
            value={latestBio ? latestBio.index.toFixed(0) : '—'}
            unit="% of 1970"
            direction="down"
            polarity="up-is-good"
            changeText="Down 32% since 1970 · UK one of most nature-depleted countries"
            sparklineData={
              data
                ? data.national.biodiversity.speciesAbundanceIndex.slice(-10).map(d => d.index)
                : []
            }
            source="DEFRA · Biodiversity indicators B2"
            baseline="Nearly 1 in 3 UK wildlife species in long-term decline — one of the worst records in Europe"
          />
          <MetricCard
            label="Air quality (PM2.5)"
            value={latestPm25 ? latestPm25.pm25UgM3.toFixed(1) : '—'}
            unit="µg/m³"
            direction="down"
            polarity="up-is-bad"
            changeText={
              data
                ? `Down ${data.national.airQuality.reductionSince2009Pct}% since 2009 · WHO limit: 5 µg/m³`
                : 'Loading…'
            }
            sparklineData={
              data
                ? data.national.airQuality.pm25TimeSeries.slice(-10).map(d => d.pm25UgM3)
                : []
            }
            source="DEFRA · AURN air quality monitoring network"
            baseline="8.4 µg/m³ today — still nearly double the WHO safe limit of 5 µg/m³"
          />
        </div>
        </ScrollReveal>

        {/* Chart 1: GHG with net-zero pathway */}
        <div id="sec-emissions">
        {ghgSeries.length > 0 ? (
          <LineChart
            title="UK greenhouse gas emissions vs net-zero pathway, 1990–2050"
            subtitle="Territorial emissions in CO₂ equivalent (MtCO₂e). Net-zero pathway shows CCC-recommended trajectory."
            series={ghgSeries}
            annotations={ghgAnnotations}
            yLabel="MtCO₂e"
            source={{
              name: 'DESNZ',
              dataset: 'UK Provisional Greenhouse Gas Emissions',
              frequency: 'annual',
              url: 'https://www.gov.uk/government/statistics/provisional-uk-greenhouse-gas-emissions-national-statistics',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* GHG by sector table */}
        {data && (
          <section className="mb-12">
            <h3 className="text-lg font-bold text-wiah-black mb-1">Emissions by sector, {latestGhg?.year}</h3>
            <p className="text-sm text-wiah-mid font-mono mb-4">
              Share of UK territorial greenhouse gas emissions (MtCO₂e).
            </p>
            <div className="space-y-2">
              {data.national.ghgEmissions.bySector.map(s => {
                const total = data.national.ghgEmissions.bySector.reduce((a, b) => a + b.mtCO2e, 0);
                const pct = (s.mtCO2e / total) * 100;
                return (
                  <div key={s.sector} className="flex items-center gap-3">
                    <span className="w-36 text-sm text-wiah-black font-sans shrink-0">{s.sector}</span>
                    <div className="flex-1 bg-wiah-light rounded overflow-hidden h-5">
                      <div
                        className="h-full rounded"
                        style={{ width: `${pct}%`, backgroundColor: '#2A9D8F' }}
                      />
                    </div>
                    <span className="w-24 text-right font-mono text-sm text-wiah-black">{s.mtCO2e} Mt</span>
                    <span className="w-12 text-right font-mono text-xs text-wiah-mid">{pct.toFixed(0)}%</span>
                  </div>
                );
              })}
            </div>
            <p className="font-mono text-[11px] text-wiah-mid mt-3">
              Source: DESNZ UK GHG Inventory, provisional 2023 estimates.
            </p>
          </section>
        )}

        </div>{/* end sec-emissions */}

        {/* Chart 2: Biodiversity */}
        <div id="sec-nature">
        {biodiversitySeries.length > 0 ? (
          <LineChart
            title="UK species abundance index, 1970–2023"
            subtitle="Geometric mean abundance of ~1,000 indicator species (butterflies, birds, plants, mammals) relative to 1970 baseline."
            series={biodiversitySeries}
            annotations={biodiversityAnnotations}
            targetLine={{ value: 100, label: '1970 baseline' }}
            yLabel="Index (1970=100)"
            source={{
              name: 'DEFRA',
              dataset: 'Biodiversity Indicators for the UK — B2 Species Abundance',
              frequency: 'annual',
              url: 'https://www.gov.uk/government/statistics/biodiversity-indicators-for-the-uk',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        </div>{/* end sec-nature */}

        {/* Chart 3: Air quality */}
        <div id="sec-air">
        {pm25Series.length > 0 ? (
          <LineChart
            title="Air quality — PM2.5 concentrations, 2009–2023"
            subtitle="Mean annual population-weighted PM2.5 concentration, UK. WHO guideline: 5 µg/m³. UK legal limit: 20 µg/m³."
            series={pm25Series}
            annotations={pm25Annotations}
            targetLine={{ value: 5, label: 'WHO 5 µg/m³' }}
            yLabel="µg/m³"
            source={{
              name: 'DEFRA',
              dataset: 'Air Quality in the UK — AURN Annual Statistics',
              frequency: 'annual',
              url: 'https://uk-air.defra.gov.uk/data/',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Chart 4: Woodland creation */}
        {woodlandSeries.length > 0 ? (
          <LineChart
            title="New woodland creation, England 2010–2023"
            subtitle="Hectares of new woodland planted per year in England. Govt target: 30% land for nature by 2030."
            series={woodlandSeries}
            yLabel="Thousand hectares"
            source={{
              name: 'Forestry Commission',
              dataset: 'Woodland Creation Statistics, England',
              frequency: 'annual',
              url: 'https://www.forestresearch.gov.uk/tools-and-resources/statistics/statistics-by-topic/woodland-statistics/',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Chart 5: Flood risk */}
        {floodSeries.length > 0 ? (
          <LineChart
            title="Properties at significant flood risk, England 2008–2023"
            subtitle="Number of residential and commercial properties at significant risk of flooding from rivers and sea."
            series={floodSeries}
            yLabel="Millions of properties"
            source={{
              name: 'Environment Agency',
              dataset: 'Flood Risk Assessment',
              frequency: 'annual',
              url: 'https://www.gov.uk/government/collections/flood-risk-assessment',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Positive callout */}
        <ScrollReveal>
        <PositiveCallout
          title="What's improving"
          value="-50%"
          unit="emissions"
          description="UK greenhouse gas emissions have fallen by more than half since 1990 — one of the fastest declines of any major economy. The last coal-fired power station closed in October 2024. Renewables now supply over 45% of electricity. Air quality has improved steadily for two decades: PM2.5 concentrations have fallen 31% since 2009."
          source="Source: DESNZ UK provisional GHG estimates 2023. Forestry Commission woodland statistics 2024."
        />
        </ScrollReveal>

        </div>{/* end sec-air */}

        {/* ── Waste & Recycling ──────────────────────────────────────────── */}
        <div id="sec-recycling">
        {recyclingSeries.length > 0 ? (
          <LineChart
            title="UK household recycling rate, 2000–2023"
            subtitle="Recycling rose rapidly in the 2000s but has flatlined at ~44% since 2013 — far below the government’s 65% target by 2035."
            series={recyclingSeries}
            annotations={recyclingAnnotations}
            targetLine={{ value: 65, label: '2035 target (65%)' }}
            yLabel="%"
            source={{
              name: 'DESNZ / DEFRA',
              dataset: 'UK Statistics on Waste',
              frequency: 'annual',
              url: 'https://www.gov.uk/government/statistics/uk-waste-data',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}
        </div>{/* end sec-recycling */}

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
