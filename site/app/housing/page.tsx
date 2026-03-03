'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import SiteName from '@/components/SiteName';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import MetricDetailModal from '@/components/MetricDetailModal';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import RegionalMap from '@/components/charts/RegionalMap';
import AreaLookup from '@/components/AreaLookup';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

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
      {/* Sticky nav */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-wiah-border px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/"><SiteName size="nav" /></Link>
          <span className="text-wiah-mid text-sm font-mono">Housing</span>
          <Link href="/" className="text-sm text-wiah-blue hover:underline">&larr; All topics</Link>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Housing"
          preposition="with"
          question="Can You Actually Afford to Live Here?"
          finding={
            latestAff && latestRent && latestHpi && rentGrowth !== null
              ? `The average house in England costs ${latestAff.ratio.toFixed(1)}× the median annual salary — more than double the ${firstAff?.ratio.toFixed(1)}× ratio in ${firstAff?.year}. The average property price is now £${latestHpi.averagePrice.toLocaleString('en-GB')}. Rents have risen ${rentGrowth}% since ${firstRent?.date.slice(0, 4)}, reaching £${latestRent.avgMonthlyRent.toLocaleString('en-GB')} per month — more than a third of median income for private renters.`
              : 'House prices have more than doubled relative to earnings since 1997. Rents have risen nearly 80%, consuming over a third of median income for private renters.'
          }
          colour="#F4A261"
        />

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-prices', label: 'House Prices' },
          { id: 'sec-rent', label: 'Rents' },
          { id: 'sec-rent-index', label: 'Rent Inflation' },
          { id: 'sec-homelessness', label: 'Homelessness' },
          { id: 'sec-by-region', label: 'By Region' },
          { id: 'sec-stock', label: 'Housing Stock' },
          { id: 'sec-context', label: 'Context' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
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
            onExpand={affordabilitySeries.length > 0 ? () => setExpanded('affordability') : undefined}
          />
          <MetricCard
            label="Average house price"
            value={latestHpi ? `£${Math.round(latestHpi.averagePrice / 1000)}K` : '—'}
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestHpi
                ? `England, ${latestHpi.date}`
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
            onExpand={hpiSeries.length > 0 ? () => setExpanded('hpi') : undefined}
          />
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
            onExpand={rentSeries.length > 0 ? () => setExpanded('rents') : undefined}
          />
        </div>
        </ScrollReveal>

        {/* Postcode lookup */}
        {data && (
          <ScrollReveal>
            <div className="mb-16 p-6 bg-wiah-light rounded-lg">
              <h2 className="text-lg font-bold text-wiah-black mb-2">How affordable is your area?</h2>
              <p className="text-sm text-wiah-mid mb-4">
                Enter your postcode to see your region&apos;s house price to earnings ratio and rent affordability.
              </p>
              <AreaLookup
                metrics={[
                  {
                    label: 'Your region — house price to earnings',
                    apiField: 'region',
                    data: Object.entries(data.regional.affordability)
                      .filter(([name]) => name !== 'England' && name !== 'Wales')
                      .map(([name, ts]) => ({
                        name,
                        value: ts.at(-1)?.ratio ?? 0,
                      }))
                      .filter(d => d.value > 0),
                    nationalValue: latestAff?.ratio,
                    unit: '×',
                    thresholds: { bad: 8, warning: 6 },
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

        {/* Regional affordability map */}
        {data && Object.keys(data.regional.affordability).length > 0 && (
          <ScrollReveal>
            <RegionalMap
              title="Housing affordability by region, 2024"
              subtitle="Median house price to median earnings ratio. Higher = less affordable."
              geoUrl="/geo/regions.geojson"
              data={Object.entries(data.regional.affordability)
                .filter(([name]) => name !== 'England' && name !== 'Wales')
                .map(([name, ts]) => ({
                  name,
                  value: ts.at(-1)?.ratio ?? 0,
                }))
                .filter(d => d.value > 0)}
              nameField="RGN24NM"
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

        {/* Positive story */}
        <ScrollReveal>
        <PositiveCallout
          title="What's improving"
          value="7.7x"
          description="The house price to earnings ratio fell from its 2021 peak of 9.1x to 7.7x in 2024 — the biggest sustained improvement in a decade. Earnings growth has finally outpaced house prices for three consecutive years."
          source="Source: ONS — Housing affordability in England and Wales, 2024."
        />
        </ScrollReveal>

        {/* Context */}
        <section id="sec-context" className="max-w-2xl mt-8 mb-12">
          <h2 className="text-xl font-bold text-wiah-black mb-4">What&apos;s driving this</h2>
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              In 1997, the average house in England cost 3.5 times the average salary.
              Today it costs 7.7 times. That single number explains more about the lived
              experience of a generation than almost any other statistic. House prices
              have risen 390% while earnings have risen 90%.
            </p>
            <p>
              The regional picture is stark. In London, the ratio peaks above 11× — meaning
              an average home costs eleven years&apos; average salary before tax. In the North
              East, it&apos;s closer to 5×. This gap has driven a geographic sorting: young
              professionals price themselves out of the places with the most jobs, or
              accept that homeownership is not for them.
            </p>
            <p>
              For renters, the picture is no better. Average monthly rent in England has
              risen from £775 in 2005 to over £1,380 in 2025 — a 78% increase. In London,
              the average is above £2,200. Private renters in England spend over a third of
              their income on rent, and in London it exceeds 40%. The ONS IPHRP shows
              rents rising at nearly 10% per year in 2024 — the fastest pace since records
              began in 2011, with London rising over 11%.
            </p>
            <p>
              The human cost of the housing crisis shows up starkly in the temporary
              accommodation figures. Over 123,000 households — including more than 150,000
              children — are now living in temporary accommodation placed by local
              authorities: bed and breakfasts, hostels, and nightly-let properties.
              This is a record high and has risen every year since 2012.
            </p>
            <p>
              There are some signs of easing. The affordability ratio actually fell in 2024,
              from 8.4× to 7.7×, as earnings growth outpaced house price growth for the first
              time in years. Whether this is a trend or a blip remains to be seen. For
              first-time buyers, the average purchase price is £245,000 — still a formidable
              barrier, but no longer rising as fast as it was.
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
            {socialData && (
              <li>
                <a
                  href="https://www.gov.uk/government/statistical-data-sets/live-tables-on-dwelling-stock-including-vacants"
                  className="underline hover:text-wiah-blue"
                  target="_blank"
                  rel="noreferrer"
                >
                  DLUHC &mdash; Live Tables 104 &amp; 213: Dwelling stock &amp; new build completions by tenure (annual)
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
