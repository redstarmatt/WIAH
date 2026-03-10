'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import MetricDetailModal from '@/components/MetricDetailModal';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import RegionalMap from '@/components/charts/RegionalMap';
import AreaLookup from '@/components/AreaLookup';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import { formatDate } from '@/lib/format';
import RelatedTopics from '@/components/RelatedTopics';

// ── Types ────────────────────────────────────────────────────────────────────

interface AffordabilityPoint { year: number; ratio: number }
interface PricePoint { year: number; medianPrice: number }
interface EarningsPoint { year: number; medianEarnings: number }
interface HpiPoint { date: string; averagePrice: number }
interface FtbPoint { date: string; ftbPrice: number; fooPrice: number }
interface RentAffPoint { year: string; rentToIncomePct: number }
interface RentLevelPoint { date: string; avgMonthlyRent: number }

interface HousingData {
  national: {
    affordability: {
      timeSeries: AffordabilityPoint[];
      priceTimeSeries: PricePoint[];
      earningsTimeSeries: EarningsPoint[];
    };
    housePrices: {
      timeSeries: HpiPoint[];
      ftbTimeSeries: FtbPoint[];
    };
    rents: {
      affordability: RentAffPoint[];
      levelTimeSeries: RentLevelPoint[];
      londonTimeSeries: RentLevelPoint[];
    };
  };
  regional: {
    affordability: Record<string, AffordabilityPoint[]>;
    rentAffordability: Record<string, RentAffPoint[]>;
    byLocalAuthority: { code: string; name: string; latestRatio: number; latestYear: number }[];
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

interface StockYear {
  year: number;
  ownerOccupied: number;
  privateRented: number;
  socialRented: number;
  allDwellings: number;
}

interface CompletionYear {
  financialYear: string;
  startYear: number;
  privateCompletions: number;
  socialCompletions: number;
  allCompletions: number;
}

interface SocialHousingData {
  dwellingStock: StockYear[];
  newBuildCompletions: CompletionYear[];
  summary: {
    peakSocialYear: number;
    peakSocialStock: number;
    socialRentedStock: number;
    socialSharePct: number;
  };
}

interface IphrpDataPoint { year: number; index: number; annualChange: number | null }

interface TempAccPoint { year: number; quarter: string; households: number }

interface StatutoryHomelessnessPoint { year: string; householdsThousands: number }
interface RoughSleepingPoint { year: number; roughSleepersEngland: number }
interface TempAccommodationPoint { year: number; households: number }

interface HomelessnessData {
  national: {
    statutoryHomelessness: {
      timeSeries: StatutoryHomelessnessPoint[];
    };
    roughSleeping: {
      timeSeries: RoughSleepingPoint[];
    };
    temporaryAccommodation: {
      timeSeries: TempAccommodationPoint[];
    };
  };
}

interface HousebuildingCompletionPoint { year: string; completionsThousands: number }
interface PlanningPermissionPoint { year: string; permissionsThousands: number }

interface HousebuildingData {
  national: {
    completions: {
      timeSeries: HousebuildingCompletionPoint[];
      targetThousands: number;
    };
    planningPermissions: {
      timeSeries: PlanningPermissionPoint[];
    };
  };
}

interface EpcRatingPoint { year: number; pctAtCOrAbove: number }
interface HeatPumpPoint { year: number; installations: number }

interface EnergyEfficiencyData {
  national: {
    epcRating: EpcRatingPoint[];
    heatPumps: HeatPumpPoint[];
  };
}

interface PrivateRentsData {
  iphrp: Array<{ region: string; data: IphrpDataPoint[] }>;
  temporaryAccommodation: TempAccPoint[];
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function isoToDate(s: string): Date {
  return new Date(s + '-01');
}

function fyToDate(fy: string): Date {
  // "2023/24" → midpoint = Oct 2023
  const start = parseInt(fy.split('/')[0]);
  return new Date(start, 9, 1);
}

function sparkFrom(arr: number[], n = 12) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function HousingPage() {
  const [data, setData] = useState<HousingData | null>(null);
  const [socialData, setSocialData] = useState<SocialHousingData | null>(null);
  const [rentsData, setRentsData] = useState<PrivateRentsData | null>(null);
  const [homelessnessData, setHomelessnessData] = useState<HomelessnessData | null>(null);
  const [housebuildingData, setHousebuildingData] = useState<HousebuildingData | null>(null);
  const [energyEfficiencyData, setEnergyEfficiencyData] = useState<EnergyEfficiencyData | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data/housing/housing.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
    fetch('/data/housing/social_housing.json')
      .then(r => r.json())
      .then(setSocialData)
      .catch(console.error);
    fetch('/data/housing/private_rents.json')
      .then(r => r.json())
      .then(setRentsData)
      .catch(console.error);
    fetch('/data/homelessness/homelessness.json')
      .then(r => r.json())
      .then(setHomelessnessData)
      .catch(console.error);
    fetch('/data/housebuilding/housebuilding.json')
      .then(r => r.json())
      .then(setHousebuildingData)
      .catch(console.error);
    fetch('/data/energy-efficiency/energy_efficiency.json')
      .then(r => r.json())
      .then(setEnergyEfficiencyData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  // 1. Affordability ratio — national + London overlay
  const affordabilitySeries: Series[] = data
    ? [
        {
          id: 'england',
          label: 'England',
          colour: '#0D1117',
          data: data.national.affordability.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.ratio,
          })),
        },
        ...(data.regional.affordability['London']
          ? [{
              id: 'london',
              label: 'London',
              colour: '#E63946',
              data: data.regional.affordability['London'].map(d => ({
                date: yearToDate(d.year),
                value: d.ratio,
              })),
            }]
          : []),
        ...(data.regional.affordability['North East']
          ? [{
              id: 'northeast',
              label: 'North East',
              colour: '#2A9D8F',
              data: data.regional.affordability['North East'].map(d => ({
                date: yearToDate(d.year),
                value: d.ratio,
              })),
            }]
          : []),
      ]
    : [];

  const affordAnnotations: Annotation[] = [
    { date: new Date(2007, 6), label: '2007: Financial crisis' },
    { date: new Date(2016, 5), label: '2016: Brexit vote' },
    { date: new Date(2020, 2), label: '2020: COVID-19' },
  ];

  // 2. House prices vs earnings (indexed to 100 at 1997)
  const priceEarningsSeries: Series[] = data
    ? (() => {
        const prices = data.national.affordability.priceTimeSeries;
        const earnings = data.national.affordability.earningsTimeSeries;
        if (!prices.length || !earnings.length) return [];
        const priceBase = prices[0].medianPrice;
        const earnBase = earnings[0].medianEarnings;
        return [
          {
            id: 'prices-indexed',
            label: 'Median house price',
            colour: '#E63946',
            data: prices.map(d => ({
              date: yearToDate(d.year),
              value: Math.round((d.medianPrice / priceBase) * 100),
            })),
          },
          {
            id: 'earnings-indexed',
            label: 'Median earnings',
            colour: '#2A9D8F',
            data: earnings.map(d => ({
              date: yearToDate(d.year),
              value: Math.round((d.medianEarnings / earnBase) * 100),
            })),
          },
        ];
      })()
    : [];

  // 3. Monthly house prices
  const hpiSeries: Series[] = data
    ? [{
        id: 'hpi',
        label: 'Average price (England)',
        data: data.national.housePrices.timeSeries
          .filter(d => d.date >= '2000-01')
          .map(d => ({ date: isoToDate(d.date), value: d.averagePrice })),
      }]
    : [];

  const hpiAnnotations: Annotation[] = [
    { date: new Date(2007, 6), label: '2007: Financial crisis' },
    { date: new Date(2013, 0), label: '2013: Help to Buy' },
    { date: new Date(2020, 2), label: '2020: COVID-19' },
    { date: new Date(2022, 8), label: '2022: Mini-budget' },
  ];

  // 4. FTB vs FOO prices
  const ftbSeries: Series[] = data
    ? [
        {
          id: 'ftb',
          label: 'First-time buyer',
          colour: '#E63946',
          data: data.national.housePrices.ftbTimeSeries
            .filter(d => d.date >= '2012-01')
            .map(d => ({ date: isoToDate(d.date), value: d.ftbPrice })),
        },
        {
          id: 'foo',
          label: 'Former owner-occupier',
          colour: '#0D1117',
          data: data.national.housePrices.ftbTimeSeries
            .filter(d => d.date >= '2012-01')
            .map(d => ({ date: isoToDate(d.date), value: d.fooPrice })),
        },
      ]
    : [];

  // 5. Average monthly rents — England + London
  const rentSeries: Series[] = data
    ? [
        {
          id: 'rent-england',
          label: 'England average',
          colour: '#0D1117',
          data: data.national.rents.levelTimeSeries.map(d => ({
            date: isoToDate(d.date),
            value: d.avgMonthlyRent,
          })),
        },
        ...(data.national.rents.londonTimeSeries.length > 0
          ? [{
              id: 'rent-london',
              label: 'London',
              colour: '#E63946',
              data: data.national.rents.londonTimeSeries.map(d => ({
                date: isoToDate(d.date),
                value: d.avgMonthlyRent,
              })),
            }]
          : []),
      ]
    : [];

  // 6. Rent as % of income
  const rentAffSeries: Series[] = data
    ? [
        {
          id: 'rent-aff-england',
          label: 'England',
          colour: '#0D1117',
          data: data.national.rents.affordability.map(d => ({
            date: fyToDate(d.year),
            value: d.rentToIncomePct,
          })),
        },
        ...(data.regional.rentAffordability['London']
          ? [{
              id: 'rent-aff-london',
              label: 'London',
              colour: '#E63946',
              data: data.regional.rentAffordability['London'].map(d => ({
                date: fyToDate(d.year),
                value: d.rentToIncomePct,
              })),
            }]
          : []),
      ]
    : [];

  // Dwelling stock by tenure
  const tenureSeries: Series[] = socialData
    ? [
        {
          id: 'owner-occ',
          label: 'Owner occupied',
          colour: '#264653',
          data: socialData.dwellingStock.map(d => ({
            date: yearToDate(d.year),
            value: d.ownerOccupied / 1_000_000,
          })),
        },
        {
          id: 'private-rent',
          label: 'Private rented',
          colour: '#E63946',
          data: socialData.dwellingStock.map(d => ({
            date: yearToDate(d.year),
            value: d.privateRented / 1_000_000,
          })),
        },
        {
          id: 'social-rent',
          label: 'Social rented',
          colour: '#2A9D8F',
          data: socialData.dwellingStock.map(d => ({
            date: yearToDate(d.year),
            value: d.socialRented / 1_000_000,
          })),
        },
      ]
    : [];

  // New build completions by tenure
  const completionSeries: Series[] = socialData
    ? [
        {
          id: 'private-builds',
          label: 'Private enterprise',
          colour: '#0D1117',
          data: socialData.newBuildCompletions.map(d => ({
            date: yearToDate(d.startYear),
            value: d.privateCompletions / 1_000,
          })),
        },
        {
          id: 'social-builds',
          label: 'Social (HA + LA)',
          colour: '#2A9D8F',
          data: socialData.newBuildCompletions.map(d => ({
            date: yearToDate(d.startYear),
            value: d.socialCompletions / 1_000,
          })),
        },
      ]
    : [];

  // 7. IPHRP — UK, London, North West
  const iphrpSeries: Series[] = rentsData
    ? (() => {
        const ukRegion = rentsData.iphrp.find(r => r.region === 'UK');
        const londonRegion = rentsData.iphrp.find(r => r.region === 'London');
        const nwRegion = rentsData.iphrp.find(r => r.region === 'North West');
        const series: Series[] = [];
        if (ukRegion) {
          series.push({
            id: 'iphrp-uk',
            label: 'UK',
            colour: '#0D1117',
            data: ukRegion.data.map(d => ({ date: yearToDate(d.year), value: d.index })),
          });
        }
        if (londonRegion) {
          series.push({
            id: 'iphrp-london',
            label: 'London',
            colour: '#E63946',
            data: londonRegion.data.map(d => ({ date: yearToDate(d.year), value: d.index })),
          });
        }
        if (nwRegion) {
          series.push({
            id: 'iphrp-nw',
            label: 'North West',
            colour: '#2A9D8F',
            data: nwRegion.data.map(d => ({ date: yearToDate(d.year), value: d.index })),
          });
        }
        return series;
      })()
    : [];

  const iphrpAnnotations: Annotation[] = [
    { date: new Date(2021, 0), label: '2021: Post-pandemic surge' },
  ];

  // 8. Temporary accommodation
  const tempAccSeries: Series[] = rentsData
    ? [{
        id: 'temp-acc',
        label: 'Households in temporary accommodation',
        colour: '#E63946',
        data: rentsData.temporaryAccommodation.map(d => ({
          date: yearToDate(d.year),
          value: d.households,
        })),
      }]
    : [];

  const tempAccAnnotations: Annotation[] = [
    { date: new Date(2024, 0), label: 'Record high: 123,000' },
  ];

  // 9. Homelessness — temporary accommodation from homelessness.json
  const homelessnessTempAccSeries: Series[] = homelessnessData
    ? [{
        id: 'homelessness-temp-acc',
        label: 'Households in temporary accommodation',
        colour: '#E63946',
        data: homelessnessData.national.temporaryAccommodation.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.households / 1_000,
        })),
      }]
    : [];

  const homelessnessAnnotations: Annotation[] = [
    { date: new Date(2017, 0), label: '2017: Homelessness Reduction Act' },
  ];

  // 10. Housebuilding — completions and planning permissions
  const housebuildingCompletionsSeries: Series[] = housebuildingData
    ? [
        {
          id: 'housebuilding-completions',
          label: 'Completions',
          colour: '#0D1117',
          data: housebuildingData.national.completions.timeSeries.map(d => ({
            date: new Date(parseInt(d.year.split('/')[0]), 6, 1),
            value: d.completionsThousands,
          })),
        },
        {
          id: 'housebuilding-permissions',
          label: 'Planning permissions',
          colour: '#F4A261',
          data: housebuildingData.national.planningPermissions.timeSeries.map(d => ({
            date: new Date(parseInt(d.year.split('/')[0]), 6, 1),
            value: d.permissionsThousands,
          })),
        },
      ]
    : [];

  const housebuildingTargetLine = housebuildingData
    ? { value: housebuildingData.national.completions.targetThousands, label: '300,000 target' }
    : undefined;

  // 11. Energy efficiency — EPC Band C or above
  const epcSeries: Series[] = energyEfficiencyData
    ? [{
        id: 'epc-c-or-above',
        label: '% EPC Band C or above',
        colour: '#2A9D8F',
        data: energyEfficiencyData.national.epcRating.map(d => ({
          date: yearToDate(d.year),
          value: d.pctAtCOrAbove,
        })),
      }]
    : [];

  const epcAnnotations: Annotation[] = [
    { date: new Date(2020, 0), label: '2020: Govt target — all homes EPC C by 2035' },
  ];

  // ── Metric values ────────────────────────────────────────────────────────

  const latestAff = data?.national.affordability.timeSeries.at(-1);
  const firstAff = data?.national.affordability.timeSeries[0];

  const latestHpi = data?.national.housePrices.timeSeries.at(-1);

  const latestRent = data?.national.rents.levelTimeSeries.at(-1);
  const firstRent = data?.national.rents.levelTimeSeries[0];
  const rentGrowth = latestRent && firstRent
    ? Math.round(((latestRent.avgMonthlyRent - firstRent.avgMonthlyRent) / firstRent.avgMonthlyRent) * 100)
    : null;

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Housing" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Housing"
          preposition="with"
          question="Can You Actually Afford to Live Here?"
          finding={
            latestAff
              ? `The average home now costs ${latestAff.ratio.toFixed(1)} times the average salary — up from 3.5 times in 1997.`
              : 'The average home costs nearly 8 times the average salary — up from 3.5 times in 1997.'
          }
          colour="#F4A261"
        />

        <section className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              In 1997, the average house in England cost 3.5 times the median salary. By
              2024 the ratio had reached 7.7&times; — and in London it peaks above
              11&times;, meaning a typical home costs more than a decade's gross pay.
              The raw numbers are stark: house prices have risen roughly 390% since 1997
              while earnings have risen about 90%. In the North East the ratio sits closer
              to 5&times;, but even that would have been considered unaffordable a generation
              ago. First-time buyers now face an average entry price of £245,000, and social
              housing stock has been declining for decades, narrowing the alternatives.
            </p>
            <p>
              For the growing share of the population who rent, the squeeze has intensified
              sharply. Average monthly rent in England reached £1,380 in 2025 — up 78%
              since 2005. In London it exceeds £2,200. Private renters now spend more than
              a third of their income on rent; in London, over 40%. The ONS private rent
              index (IPHRP) shows rents rising at close to 10% a year in 2024 — the
              fastest pace since records began in 2011, with London at 11%. A post-pandemic
              surge that began in 2021 shows no sign of abating.
            </p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-prices', label: 'House Prices' },
          { id: 'sec-rent', label: 'Rents' },
          { id: 'sec-rent-index', label: 'Rent Inflation' },
          { id: 'sec-homelessness', label: 'Homelessness' },
          { id: 'sec-by-region', label: 'By Region' },
          { id: 'sec-stock', label: 'Housing Stock' },
          { id: 'sec-statutory-homelessness', label: 'Statutory Homelessness' },
          { id: 'sec-housebuilding', label: 'Housebuilding' },
          { id: 'sec-energy', label: 'Energy Efficiency' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="House price to earnings"
            value={latestAff ? latestAff.ratio.toFixed(1) : '—'}
            unit="×"
            direction={latestAff && firstAff && latestAff.ratio > firstAff.ratio ? 'up' : 'flat'}
            polarity="up-is-bad"
            changeText={
              latestAff && firstAff
                ? `Was ${firstAff.ratio}× in ${firstAff.year} · London: ${data?.regional.affordability['London']?.at(-1)?.ratio ?? '—'}×`
                : 'Loading…'
            }
            sparklineData={
              data
                ? sparkFrom(data.national.affordability.timeSeries.map(d => d.ratio), 10)
                : []
            }
            source="ONS · Housing affordability, 2024"
            baseline="A typical home costs nearly 8 years of full median salary — was 4 years in 1997"
            href="#sec-prices"/>
          <MetricCard
            label="Average house price"
            value={latestHpi ? `£${Math.round(latestHpi.averagePrice / 1000)}K` : '—'}
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestHpi
                ? `England, ${formatDate(latestHpi.date)}`
                : 'Loading…'
            }
            sparklineData={
              data
                ? sparkFrom(
                    data.national.housePrices.timeSeries
                      .filter(d => d.date.endsWith('-01'))
                      .map(d => d.averagePrice),
                    10
                  )
                : []
            }
            source="Land Registry · UK HPI"
            href="#sec-rent"/>
          <MetricCard
            label="Average monthly rent"
            value={latestRent ? `£${latestRent.avgMonthlyRent.toLocaleString()}` : '—'}
            unit="/mo"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestRent && rentGrowth !== null
                ? `+${rentGrowth}% since 2005 · London: £${data?.national.rents.londonTimeSeries.at(-1)?.avgMonthlyRent.toLocaleString() ?? '—'}`
                : 'Loading…'
            }
            sparklineData={
              data
                ? sparkFrom(
                    data.national.rents.levelTimeSeries
                      .filter(d => d.date.endsWith('-01'))
                      .map(d => d.avgMonthlyRent),
                    10
                  )
                : []
            }
            source="ONS · PIPR historical series"
            baseline="Average rent now takes up nearly half of take-home pay on a median salary"
            href="#sec-rent-index"/>
        </div>
        

        {/* Postcode lookup */}
        {data && (
          <ScrollReveal>
            <div className="mb-16 p-6 bg-wiah-light rounded-lg">
              <h2 className="text-lg font-bold text-wiah-black mb-2">How affordable is your area?</h2>
              <p className="text-sm text-wiah-mid mb-4">
                Enter your postcode to see your local authority's house price to earnings ratio and your region's rent affordability.
              </p>
              <AreaLookup
                metrics={[
                  {
                    label: 'Your local authority — house price to earnings ratio, 2024',
                    apiField: 'admin_district',
                    data: (data.regional.byLocalAuthority ?? []).map(la => ({
                      name: la.name,
                      value: la.latestRatio,
                    })),
                    nationalValue: latestAff?.ratio,
                    unit: '×',
                    thresholds: { bad: 10, warning: 7 },
                  },
                  {
                    label: 'Your region — rent as % of income',
                    apiField: 'region',
                    data: Object.entries(data.regional.rentAffordability)
                      .map(([name, ts]) => ({
                        name,
                        value: ts.at(-1)?.rentToIncomePct ?? 0,
                      }))
                      .filter(d => d.value > 0),
                    nationalValue: data.national.rents.affordability.at(-1)?.rentToIncomePct,
                    unit: '%',
                    thresholds: { bad: 35, warning: 28 },
                  },
                ]}
              />
            </div>
          </ScrollReveal>
        )}

        {/* Chart 1: Affordability ratio — England, London, North East */}
        <div id="sec-prices">
        {affordabilitySeries.length > 0 ? (
          <LineChart
            title="House price to earnings ratio, 1997–2024"
            subtitle="Median house price divided by median gross annual workplace-based earnings. Higher = less affordable."
            series={affordabilitySeries}
            annotations={affordAnnotations}
            yLabel="Ratio"
            source={{
              name: 'ONS',
              dataset: 'Housing affordability in England and Wales, 2024',
              frequency: 'annual',
              url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/housing/datasets/ratioofhousepricetoworkplacebasedearningslowerquartileandmedian',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Chart 2: House prices vs earnings (indexed to 100) */}
        {priceEarningsSeries.length > 0 ? (
          <LineChart
            title="House prices vs earnings, 1997–2024 (indexed)"
            subtitle="Both indexed to 100 at 1997. Shows how far house prices have outrun wages."
            series={priceEarningsSeries}
            yLabel="Index (1997 = 100)"
            source={{
              name: 'ONS',
              dataset: 'Housing affordability: median prices and earnings, 2024',
              frequency: 'annual',
              url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/housing/datasets/ratioofhousepricetoworkplacebasedearningslowerquartileandmedian',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Chart 3: Monthly house prices */}
        {hpiSeries.length > 0 ? (
          <LineChart
            title="Average house price, 2000–2025"
            subtitle="Mix-adjusted average price paid for residential property, England, monthly."
            series={hpiSeries}
            annotations={hpiAnnotations}
            yLabel="£"
            source={{
              name: 'HM Land Registry',
              dataset: 'UK House Price Index',
              frequency: 'monthly',
              url: 'https://www.gov.uk/government/collections/uk-house-price-index-reports',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Chart 4: FTB vs existing owners */}
        {ftbSeries.length > 0 ? (
          <LineChart
            title="First-time buyer vs existing owner prices, 2012–2025"
            subtitle="Average price paid by first-time buyers vs former owner-occupiers, England."
            series={ftbSeries}
            yLabel="£"
            source={{
              name: 'HM Land Registry',
              dataset: 'UK House Price Index (buyer status)',
              frequency: 'monthly',
              url: 'https://www.gov.uk/government/collections/uk-house-price-index-reports',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        </div>{/* end sec-prices */}

        {/* Chart 5: Monthly rents — England + London */}
        <div id="sec-rent">
        {rentSeries.length > 0 ? (
          <LineChart
            title="Average monthly private rent, 2005–2025"
            subtitle="Mean private rent, England and London, from ONS PIPR historical series."
            series={rentSeries}
            yLabel="£ per month"
            source={{
              name: 'ONS',
              dataset: 'Price Index of Private Rents, historical series',
              frequency: 'monthly',
              url: 'https://www.ons.gov.uk/economy/inflationandpriceindices/datasets/priceindexofprivaterentsukhistoricalseries',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Chart 6: Rent as % of income */}
        {rentAffSeries.length > 0 ? (
          <LineChart
            title="Private rent as share of income, 2015–2024"
            subtitle="Ratio of mean monthly rent to median monthly income for private renters."
            series={rentAffSeries}
            yLabel="% of income"
            source={{
              name: 'ONS',
              dataset: 'Private rental affordability, England, 2024',
              frequency: 'annual',
              url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/housing/datasets/privaterentalaffordabilityengland',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        </div>{/* end sec-rent */}

        {/* ── Section: Private Rent Index ───────────────────────────────────── */}
        <div id="sec-rent-index">
          {iphrpSeries.length > 0 ? (
            <LineChart
              title="Private rent index, UK and regions, 2011–2024"
              subtitle="ONS Index of Private Housing Rental Prices (2011=100). Rents accelerating since 2021."
              series={iphrpSeries}
              annotations={iphrpAnnotations}
              yLabel="Index (2011 = 100)"
              source={{
                name: 'ONS',
                dataset: 'Index of Private Housing Rental Prices (IPHRP)',
                frequency: 'monthly',
                url: 'https://www.ons.gov.uk/economy/inflationandpriceindices/bulletins/indexofprivatehousingrentalprices/latest',
              }}
            />
          ) : (
            <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
          )}
        </div>{/* end sec-rent-index */}

        {/* ── Section: Temporary Accommodation ─────────────────────────────── */}
        <div id="sec-homelessness">
          {tempAccSeries.length > 0 ? (
            <LineChart
              title="Households in temporary accommodation, England, 2000–2024"
              subtitle="Households placed in temporary accommodation by local authorities. Includes B&Bs, hostels, and nightly-let self-contained properties."
              series={tempAccSeries}
              annotations={tempAccAnnotations}
              yLabel="Households"
              source={{
                name: 'DLUHC',
                dataset: 'Homelessness live tables — Temporary accommodation (TA1)',
                frequency: 'quarterly',
                url: 'https://www.gov.uk/government/statistical-data-sets/live-tables-on-homelessness',
              }}
            />
          ) : (
            <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
          )}
        </div>{/* end sec-homelessness */}

        {/* Regional affordability table */}
        <div id="sec-by-region">
        {data && Object.keys(data.regional.affordability).length > 0 && (
          <section className="mb-12">
            <h3 className="text-lg font-bold text-wiah-black mb-1">
              Affordability by region, 2024
            </h3>
            <p className="text-sm text-wiah-mid font-mono mb-6">
              Median house price to median earnings ratio. Higher = less affordable.
            </p>
            <div className="divide-y divide-wiah-border">
              {Object.entries(data.regional.affordability)
                .filter(([name]) => name !== 'England')
                .map(([name, ts]) => {
                  const latest = ts.at(-1);
                  if (!latest) return null;
                  const barWidth = Math.min((latest.ratio / 12) * 100, 100);
                  const colour = latest.ratio > 8 ? '#E63946' : latest.ratio > 6 ? '#F4A261' : '#2A9D8F';
                  return (
                    <div key={name} className="py-3 flex items-center gap-4">
                      <span className="text-xs text-wiah-mid w-40 shrink-0">{name}</span>
                      <div className="flex-1 bg-wiah-light rounded h-2">
                        <div
                          className="h-2 rounded"
                          style={{ width: `${barWidth}%`, backgroundColor: colour }}
                        />
                      </div>
                      <span className="font-mono text-sm font-bold w-14 text-right" style={{ color: colour }}>
                        {latest.ratio}×
                      </span>
                    </div>
                  );
                })}
            </div>
            <p className="font-mono text-[11px] text-wiah-mid mt-3">
              <a
                href="https://www.ons.gov.uk/peoplepopulationandcommunity/housing/datasets/ratioofhousepricetoworkplacebasedearningslowerquartileandmedian"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Source: ONS, Housing affordability in England and Wales, 2024
              </a>
            </p>
          </section>
        )}

        {/* LA-level affordability map */}
        {data && (data.regional.byLocalAuthority ?? []).length > 0 && (
          <ScrollReveal>
            <RegionalMap
              title="Housing affordability by local authority, 2024"
              subtitle="Median house price to median earnings ratio. Higher = less affordable. Kensington & Chelsea: 27×. Blaenau Gwent: 3.75×."
              geoUrl="/geo/local-authorities.geojson"
              data={(data.regional.byLocalAuthority ?? []).map(la => ({
                name: la.name,
                value: la.latestRatio,
              }))}
              nameField="LAD23NM"
              valueLabel="× earnings"
              colourDirection="low-is-good"
              source={{
                name: 'ONS',
                dataset: 'Housing affordability in England and Wales, 2024',
                url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/housing/datasets/ratioofhousepricetoworkplacebasedearningslowerquartileandmedian',
                frequency: 'annual',
              }}
            />
          </ScrollReveal>
        )}

        {/* Regional rent affordability table */}
        {data && Object.keys(data.regional.rentAffordability).length > 0 && (
          <section className="mb-12">
            <h3 className="text-lg font-bold text-wiah-black mb-1">
              Rent as share of income by region, 2023/24
            </h3>
            <p className="text-sm text-wiah-mid font-mono mb-6">
              Average private rent as a percentage of median monthly income. Higher = less affordable.
            </p>
            <div className="divide-y divide-wiah-border">
              {Object.entries(data.regional.rentAffordability)
                .map(([name, ts]) => ({ name, latest: ts.at(-1) }))
                .filter(r => r.latest)
                .sort((a, b) => (b.latest!.rentToIncomePct) - (a.latest!.rentToIncomePct))
                .map(({ name, latest }) => {
                  const pct = latest!.rentToIncomePct;
                  const barWidth = Math.min((pct / 45) * 100, 100);
                  const colour = pct > 35 ? '#E63946' : pct > 28 ? '#F4A261' : '#2A9D8F';
                  return (
                    <div key={name} className="py-3 flex items-center gap-4">
                      <span className="text-sm text-wiah-black w-52 shrink-0">{name}</span>
                      <div className="flex-1 bg-wiah-light rounded h-2">
                        <div
                          className="h-2 rounded"
                          style={{ width: `${barWidth}%`, backgroundColor: colour }}
                        />
                      </div>
                      <span className="font-mono text-sm font-bold w-14 text-right" style={{ color: colour }}>
                        {pct}%
                      </span>
                    </div>
                  );
                })}
            </div>
            <p className="font-mono text-[11px] text-wiah-mid mt-3">
              <a
                href="https://www.ons.gov.uk/peoplepopulationandcommunity/housing/datasets/privaterentalaffordabilityengland"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Source: ONS, Private rental affordability, England, 2024
              </a>
            </p>
          </section>
        )}

        </div>{/* end sec-by-region */}

        {/* Chart: Housing stock by tenure */}
        <div id="sec-stock">
        {tenureSeries.length > 0 ? (
          <LineChart
            title="Housing stock by tenure, 1991–2024"
            subtitle="Millions of dwellings in England, by tenure type."
            series={tenureSeries}
            yLabel="Dwellings (millions)"
            annotations={[
              { date: new Date(2003, 0), label: '2003: Buy-to-let boom' },
            ]}
            source={{
              name: 'DLUHC',
              dataset: 'Live Table 104 — Dwelling stock by tenure',
              frequency: 'annual',
              url: 'https://www.gov.uk/government/statistical-data-sets/live-tables-on-dwelling-stock-including-vacants',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Chart: New build completions by tenure */}
        {completionSeries.length > 0 ? (
          <LineChart
            title="New build completions by tenure, 2000–2025"
            subtitle="Thousands of permanent dwellings completed per year in England."
            series={completionSeries}
            yLabel="Completions (thousands)"
            source={{
              name: 'DLUHC',
              dataset: 'Live Table 213 — Permanent dwellings by tenure',
              frequency: 'annual',
              url: 'https://www.gov.uk/government/statistical-data-sets/live-tables-on-house-building',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        </div>{/* end sec-stock */}

        {/* ── Section: Statutory Homelessness ───────────────────────────────── */}
        <div id="sec-statutory-homelessness">
          <ScrollReveal>
            <section className="mb-12">
              <h3 className="text-lg font-bold text-wiah-black mb-1">
                Households in temporary accommodation, 2013–2024
              </h3>
              <p className="text-sm text-[#6B7280] mb-4">
                Households in temporary accommodation placed by local authorities, England.
              </p>
              {homelessnessTempAccSeries.length > 0 ? (
                <LineChart
                  title="Households in temporary accommodation, 2013–2024"
                  subtitle="Households in temporary accommodation placed by local authorities, England."
                  series={homelessnessTempAccSeries}
                  annotations={homelessnessAnnotations}
                  yLabel="Thousands of households"
                  source={{
                    name: 'DLUHC',
                    dataset: 'Homelessness Statistics',
                    frequency: 'annual',
                    url: 'https://www.gov.uk/government/statistical-data-sets/live-tables-on-homelessness',
                  }}
                />
              ) : (
                <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
              )}
            </section>
          </ScrollReveal>
        </div>{/* end sec-statutory-homelessness */}

        {/* ── Section: Housebuilding ────────────────────────────────────────── */}
        <div id="sec-housebuilding">
          <ScrollReveal>
            <section className="mb-12">
              <h3 className="text-lg font-bold text-wiah-black mb-1">
                New homes built vs planning permissions granted, 2012–2023
              </h3>
              <p className="text-sm text-[#6B7280] mb-4">
                New dwelling completions and planning permissions, England. Government target: 300,000 per year.
              </p>
              {housebuildingCompletionsSeries.length > 0 ? (
                <LineChart
                  title="New homes built vs planning permissions granted, 2012–2023"
                  subtitle="New dwelling completions and planning permissions, England. Government target: 300,000 per year."
                  series={housebuildingCompletionsSeries}
                  targetLine={housebuildingTargetLine}
                  yLabel="Thousands"
                  source={{
                    name: 'DLUHC',
                    dataset: 'Housing Supply: Indicators of New Supply',
                    frequency: 'annual',
                    url: 'https://www.gov.uk/government/statistical-data-sets/live-tables-on-house-building',
                  }}
                />
              ) : (
                <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
              )}
            </section>
          </ScrollReveal>
        </div>{/* end sec-housebuilding */}

        {/* ── Section: Energy Efficiency ────────────────────────────────────── */}
        <div id="sec-energy">
          <ScrollReveal>
            <section className="mb-12">
              <h3 className="text-lg font-bold text-wiah-black mb-1">
                Share of homes meeting EPC Band C or above, 2012–2024
              </h3>
              <p className="text-sm text-[#6B7280] mb-4">
                % of domestic properties in England with Energy Performance Certificate rating C or better.
              </p>
              {epcSeries.length > 0 ? (
                <LineChart
                  title="Share of homes meeting EPC Band C or above, 2012–2024"
                  subtitle="% of domestic properties in England with Energy Performance Certificate rating C or better."
                  series={epcSeries}
                  annotations={epcAnnotations}
                  yLabel="% EPC C or above"
                  source={{
                    name: 'DLUHC',
                    dataset: 'Energy Performance of Buildings Register',
                    frequency: 'annual',
                    url: 'https://www.gov.uk/government/statistical-data-sets/live-tables-on-energy-performance-of-buildings-certificates',
                  }}
                />
              ) : (
                <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
              )}
            </section>
          </ScrollReveal>
        </div>{/* end sec-energy */}

        {/* Positive story */}
        <ScrollReveal>
        <PositiveCallout
          title="What's improving"
          value="7.7x"
          description="The house price to earnings ratio fell from its 2021 peak of 9.1x to 7.7x in 2024 — the biggest sustained improvement in a decade. Earnings growth has finally outpaced house prices for three consecutive years."
          source="Source: ONS — Housing affordability in England and Wales, 2024."
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
                  {src.name} — {src.dataset} ({src.frequency})
                </a>
              </li>
            ))}
            {socialData && (
              <li>
                <a
                  href="https://www.gov.uk/government/statistical-data-sets/live-tables-on-dwelling-stock-including-vacants"
                  className="underline hover:text-wiah-blue"
                  target="_blank"
                  rel="noreferrer"
                >
                  DLUHC — Live Tables 104 &amp; 213: Dwelling stock &amp; new build completions by tenure (annual)
                </a>
              </li>
            )}
            {rentsData?.metadata.sources.map((src, i) => (
              <li key={`rents-${i}`}>
                <a
                  href={src.url}
                  className="underline hover:text-wiah-blue"
                  target="_blank"
                  rel="noreferrer"
                >
                  {src.name} — {src.dataset} ({src.frequency})
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
              <RelatedTopics />
      </main>

      {/* Expanded metric modals */}
      {expanded === 'affordability' && (
        <MetricDetailModal
          title="House price to earnings ratio, 1997–2024"
          subtitle="Median house price divided by median gross annual workplace-based earnings, by region."
          series={affordabilitySeries}
          annotations={affordAnnotations}
          yLabel="Ratio"
          source={{
            name: 'ONS',
            dataset: 'Housing affordability in England and Wales, 2024',
            frequency: 'annual',
            url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/housing/datasets/ratioofhousepricetoworkplacebasedearningslowerquartileandmedian',
          }}
          onClose={() => setExpanded(null)}
        />
      )}
      {expanded === 'hpi' && (
        <MetricDetailModal
          title="Average house price, 2000–2025"
          subtitle="Mix-adjusted average price paid for residential property, England."
          series={hpiSeries}
          annotations={hpiAnnotations}
          yLabel="£"
          source={{
            name: 'HM Land Registry',
            dataset: 'UK House Price Index',
            frequency: 'monthly',
            url: 'https://www.gov.uk/government/collections/uk-house-price-index-reports',
          }}
          onClose={() => setExpanded(null)}
        />
      )}
      {expanded === 'rents' && (
        <MetricDetailModal
          title="Average monthly private rent, 2005–2025"
          subtitle="Mean private rent, England and London."
          series={rentSeries}
          yLabel="£ per month"
          source={{
            name: 'ONS',
            dataset: 'Price Index of Private Rents, historical series',
            frequency: 'monthly',
            url: 'https://www.ons.gov.uk/economy/inflationandpriceindices/datasets/priceindexofprivaterentsukhistoricalseries',
          }}
          onClose={() => setExpanded(null)}
        />
      )}
    </>
  );
}
