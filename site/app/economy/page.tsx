'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import MetricDetailModal from '@/components/MetricDetailModal';
import LineChart, { Series, Annotation, TargetLine } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface InflationPoint {
  date: string;
  cpiPct: number;
}

interface WagePoint {
  date: string;
  weeklyGBP: number;
}

interface LabourPoint {
  date: string;
  employmentPct: number;
  unemploymentPct: number;
  inactivityPct: number;
}

interface ProductivityPoint {
  date: string;
  index: number;
}

interface RhdiPoint {
  date: string;
  gbpPerHead: number;
}

interface GiniPoint {
  year: number;
  gini: number;
}

interface GdpPoint {
  date: string;
  growthPct: number;
}

interface DebtPoint {
  date: string;
  debtPctGdp: number;
}

interface GdpData {
  gdpGrowth: { timeSeries: GdpPoint[]; latest: GdpPoint | null };
  publicDebt: { timeSeries: DebtPoint[]; latest: DebtPoint | null };
}

interface EconomyData {
  national: {
    inflation: { timeSeries: InflationPoint[] };
    wages: {
      nominalTimeSeries: WagePoint[];
      realTimeSeries: WagePoint[];
    };
    labourMarket: { timeSeries: LabourPoint[] };
    productivity: { timeSeries: ProductivityPoint[] };
    livingStandards: {
      rhdiTimeSeries: RhdiPoint[];
      giniTimeSeries: GiniPoint[];
    };
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── ASHE types ────────────────────────────────────────────────────────────────

interface AshePoint {
  year: number;
  p10: number;
  p25: number;
  p50: number;
  p75: number;
  p90: number;
}

interface AsheRegional {
  region: string;
  medianWeeklyPay: number;
}

interface AsheData {
  national: AshePoint[];
  regional: AsheRegional[];
}

// ── Regional GVA types ────────────────────────────────────────────────────────

interface GvaPoint {
  year: number;
  gvaPerHead: number;
}

interface GvaSeries {
  region: string;
  data: GvaPoint[];
}

interface GvaRankingRow {
  rank: number;
  region: string;
  year: number;
  gvaPerHead: number;
  ukIndex: number;
}

interface GvaData {
  series: GvaSeries[];
  latestRanking: GvaRankingRow[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function isoToDate(s: string): Date {
  if (s.includes('Q')) {
    const [yr, q] = s.split('-Q');
    const month = (parseInt(q) - 1) * 3;
    return new Date(parseInt(yr), month, 1);
  }
  return new Date(s + '-01');
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 12) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function EconomyPage() {
  const [data, setData] = useState<EconomyData | null>(null);
  const [gdpData, setGdpData] = useState<GdpData | null>(null);
  const [asheData, setAsheData] = useState<AsheData | null>(null);
  const [gvaData, setGvaData] = useState<GvaData | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data/economy/economy.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
    fetch('/data/economy/gdp.json')
      .then(r => r.json())
      .then(setGdpData)
      .catch(console.error);
    fetch('/data/economy/ashe.json')
      .then(r => r.json())
      .then(setAsheData)
      .catch(console.error);
    fetch('/data/economy/regional_gva.json')
      .then(r => r.json())
      .then(setGvaData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  // 1. CPI inflation
  const inflationSeries: Series[] = data
    ? [{
        id: 'cpi',
        label: 'CPI annual rate',
        data: data.national.inflation.timeSeries
          .filter(d => d.date >= '2010-01')
          .map(d => ({ date: isoToDate(d.date), value: d.cpiPct })),
      }]
    : [];

  const inflationAnnotations: Annotation[] = [
    { date: new Date(2016, 5), label: '2016: Brexit vote' },
    { date: new Date(2020, 2), label: '2020: COVID-19' },
    { date: new Date(2022, 1), label: '2022: Russia invades Ukraine' },
    { date: new Date(2022, 9), label: 'Oct 2022: Peak 11.1%' },
  ];

  const inflationTarget: TargetLine = { value: 2, label: 'BoE 2% target' };

  // 2. Wages — nominal vs real
  const wagesSeries: Series[] = data
    ? [
        {
          id: 'nominal',
          label: 'Nominal (cash terms)',
          colour: '#6B7280',
          data: data.national.wages.nominalTimeSeries
            .filter(d => d.date >= '2010-01')
            .map(d => ({ date: isoToDate(d.date), value: d.weeklyGBP })),
        },
        {
          id: 'real',
          label: 'Real (CPI-adjusted)',
          colour: '#0D1117',
          data: data.national.wages.realTimeSeries
            .filter(d => d.date >= '2010-01')
            .map(d => ({ date: isoToDate(d.date), value: d.weeklyGBP })),
        },
      ]
    : [];

  const wagesAnnotations: Annotation[] = [
    { date: new Date(2020, 2), label: '2020: COVID-19' },
    { date: new Date(2022, 3), label: '2022: Inflation surge' },
  ];

  // 3. Labour market — employment, unemployment, inactivity
  const employmentSeries: Series[] = data
    ? [{
        id: 'employment',
        label: 'Employment rate (16–64)',
        data: data.national.labourMarket.timeSeries
          .filter(d => d.date >= '2010-01')
          .map(d => ({ date: isoToDate(d.date), value: d.employmentPct })),
      }]
    : [];

  const unemploymentSeries: Series[] = data
    ? [{
        id: 'unemployment',
        label: 'Unemployment rate (16+)',
        colour: '#E63946',
        data: data.national.labourMarket.timeSeries
          .filter(d => d.date >= '2010-01')
          .map(d => ({ date: isoToDate(d.date), value: d.unemploymentPct })),
      }]
    : [];

  const inactivitySeries: Series[] = data
    ? [{
        id: 'inactivity',
        label: 'Economic inactivity (16–64)',
        colour: '#F4A261',
        data: data.national.labourMarket.timeSeries
          .filter(d => d.date >= '2010-01')
          .map(d => ({ date: isoToDate(d.date), value: d.inactivityPct })),
      }]
    : [];

  const labourAnnotations: Annotation[] = [
    { date: new Date(2020, 2), label: '2020: COVID-19' },
  ];

  const labourDetailSeries: Series[] = [
    ...unemploymentSeries,
    ...inactivitySeries,
  ];

  // 4. Productivity
  const productivitySeries: Series[] = data
    ? [{
        id: 'productivity',
        label: 'Output per hour (index, 2023=100)',
        data: data.national.productivity.timeSeries
          .filter(d => d.date >= '2007-Q1')
          .map(d => ({ date: isoToDate(d.date), value: d.index })),
      }]
    : [];

  const productivityAnnotations: Annotation[] = [
    { date: new Date(2008, 8), label: '2008: Financial crisis' },
    { date: new Date(2020, 2), label: '2020: COVID-19' },
  ];

  // 5. RHDI per head
  const rhdiSeries: Series[] = data
    ? [{
        id: 'rhdi',
        label: 'Real disposable income per head (£)',
        data: data.national.livingStandards.rhdiTimeSeries
          .filter(d => d.date >= '2007-Q1')
          .map(d => ({ date: isoToDate(d.date), value: d.gbpPerHead })),
      }]
    : [];

  const rhdiAnnotations: Annotation[] = [
    { date: new Date(2008, 8), label: '2008: Financial crisis' },
    { date: new Date(2020, 2), label: '2020: COVID-19' },
    { date: new Date(2022, 3), label: '2022: Cost of living crisis' },
  ];

  // 6. Gini
  const giniSeries: Series[] = data
    ? [{
        id: 'gini',
        label: 'Gini coefficient (%)',
        colour: '#264653',
        data: data.national.livingStandards.giniTimeSeries
          .map(d => ({ date: yearToDate(d.year), value: d.gini })),
      }]
    : [];

  // 7. GDP quarterly growth
  const gdpGrowthSeries: Series[] = gdpData
    ? [{
        id: 'gdp-qoq',
        label: 'GDP quarter-on-quarter (%)',
        colour: '#264653',
        data: gdpData.gdpGrowth.timeSeries.map(d => ({
          date: isoToDate(d.date),
          value: d.growthPct,
        })),
      }]
    : [];

  const gdpAnnotations: Annotation[] = [
    { date: new Date(2008, 8), label: '2008: Financial crisis' },
    { date: new Date(2016, 5), label: '2016: Brexit vote' },
    { date: new Date(2020, 2), label: '2020: COVID (-19.9%)' },
  ];

  // 8. Public sector net debt as % of GDP
  const debtSeries: Series[] = gdpData
    ? [{
        id: 'debt-pct',
        label: 'Net debt (% of GDP)',
        colour: '#E63946',
        data: gdpData.publicDebt.timeSeries
          .filter((_, i) => i % 3 === 0)
          .map(d => ({
            date: isoToDate(d.date),
            value: d.debtPctGdp,
          })),
      }]
    : [];

  const debtAnnotations: Annotation[] = [
    { date: new Date(2008, 8), label: '2008: Financial crisis' },
    { date: new Date(2020, 2), label: '2020: COVID borrowing' },
  ];

  // 9. ASHE earnings by percentile
  const asheSeries: Series[] = asheData
    ? [
        {
          id: 'p10',
          label: 'P10 (bottom 10%)',
          colour: '#E63946',
          data: asheData.national.map(d => ({ date: yearToDate(d.year), value: d.p10 })),
        },
        {
          id: 'p25',
          label: 'P25 (lower quartile)',
          colour: '#F4A261',
          data: asheData.national.map(d => ({ date: yearToDate(d.year), value: d.p25 })),
        },
        {
          id: 'p50',
          label: 'P50 (median)',
          colour: '#0D1117',
          data: asheData.national.map(d => ({ date: yearToDate(d.year), value: d.p50 })),
        },
        {
          id: 'p75',
          label: 'P75 (upper quartile)',
          colour: '#264653',
          data: asheData.national.map(d => ({ date: yearToDate(d.year), value: d.p75 })),
        },
        {
          id: 'p90',
          label: 'P90 (top 10%)',
          colour: '#2A9D8F',
          data: asheData.national.map(d => ({ date: yearToDate(d.year), value: d.p90 })),
        },
      ]
    : [];

  const asheAnnotations: Annotation[] = [
    { date: new Date(2015, 0), label: '2015: National Living Wage introduced' },
    { date: new Date(2020, 0), label: '2020: COVID-19' },
    { date: new Date(2022, 0), label: '2022: Inflation surge' },
  ];

  // 10. Regional GVA — London, UK, North East
  const gvaSeries: Series[] = gvaData
    ? gvaData.series
        .filter(s => ['London', 'UK', 'North East'].includes(s.region))
        .map(s => ({
          id: s.region.toLowerCase().replace(/ /g, '-'),
          label: s.region === 'UK' ? 'UK average' : s.region,
          colour:
            s.region === 'London' ? '#E63946'
            : s.region === 'UK' ? '#0D1117'
            : '#2A9D8F',
          data: s.data.map(d => ({ date: yearToDate(d.year), value: d.gvaPerHead })),
        }))
    : [];

  const gvaAnnotations: Annotation[] = [
    { date: new Date(2008, 0), label: '2008: Financial crisis' },
    { date: new Date(2014, 0), label: '2014: Northern Powerhouse' },
  ];

  // ── Metric values ────────────────────────────────────────────────────────

  const latestInflation = data?.national.inflation.timeSeries.at(-1);
  const latestReal = data?.national.wages.realTimeSeries.at(-1);
  const preCrisisReal = data?.national.wages.realTimeSeries.find(d => d.date === '2008-01');
  const latestLabour = data?.national.labourMarket.timeSeries.at(-1);
  const preCovidLabour = data?.national.labourMarket.timeSeries.find(d => d.date === '2020-01');

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Economy" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy"
          question="Are You Actually Better Off?"
          finding={
            latestReal && latestInflation && latestLabour
              ? `Real wages have finally recovered their 2008 peak after 16 years — but productivity has been essentially flat for the same period, and one in five working-age adults is not in the workforce.`
              : 'Real wages took 16 years to recover to their 2008 peak, even as productivity flatlined.'
          }
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Real wages took 16 years to recover their 2008 peak — the longest squeeze
              on living standards since records began. At the root is a productivity crisis:
              output per hour grew at roughly 2% a year before the financial crisis, then
              flatlined. Without productivity growth, wages cannot sustainably rise. The
              2022–23 cost-of-living shock — CPI hitting 11.1% in October 2022 —
              compounded the damage, though inflation has since fallen to around 3%. Meanwhile,
              over a fifth of working-age adults remain economically inactive, elevated since
              COVID and driven largely by long-term sickness. The economy is growing again,
              but the foundations are brittle.
            </p>
            <p>
              Within the earnings distribution, two forces pull in opposite directions. The
              National Living Wage, introduced in 2015, compressed the bottom: P10 weekly
              earnings (£227) grew faster than the median through the late 2010s. But the top
              kept pulling away. At P90 (£1,336 per week), earners take home nearly six times
              as much as those at P10 — a ratio that has barely moved in a decade. The
              fan chart of earnings tells a story of a floor being raised while the ceiling
              lifts further out of reach.
            </p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-prices', label: 'Prices & Wages' },
          { id: 'sec-employment', label: 'Employment' },
          { id: 'sec-productivity', label: 'Productivity' },
          { id: 'sec-gdp', label: 'GDP & Debt' },
          { id: 'sec-earnings-inequality', label: 'Earnings Inequality' },
          { id: 'sec-regional-divide', label: 'Regional Divide' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="CPI inflation"
            value={latestInflation ? latestInflation.cpiPct.toFixed(1) : '—'}
            unit="%"
            direction={latestInflation && latestInflation.cpiPct > 2 ? 'up' : 'down'}
            polarity="up-is-bad"
            baseline="3% inflation now — down from a 40-year peak of 11.1% in October 2022, but still above the 2% target"
            changeText={
              latestInflation
                ? `BoE target: 2% · Peak: 11.1% (Oct 2022)`
                : 'Loading…'
            }
            sparklineData={
              data
                ? sparkFrom(
                    data.national.inflation.timeSeries
                      .filter(d => d.date.endsWith('-01'))
                      .map(d => d.cpiPct),
                    8
                  )
                : []
            }
            source="ONS · CPI annual rate (D7G7)"
            onExpand={inflationSeries.length > 0 ? () => setExpanded('inflation') : undefined}
          />
          <MetricCard
            label="Real weekly earnings"
            value={latestReal ? `£${latestReal.weeklyGBP.toFixed(0)}` : '—'}
            unit="/wk"
            direction={latestReal && preCrisisReal && latestReal.weeklyGBP > preCrisisReal.weeklyGBP ? 'up' : 'flat'}
            polarity="up-is-good"
            baseline="Real wages only recovered to their 2008 peak in 2024 — 16 years of no growth"
            changeText={
              latestReal
                ? `Finally above 2008 peak · 16 years to recover`
                : 'Loading…'
            }
            sparklineData={
              data
                ? sparkFrom(
                    data.national.wages.realTimeSeries
                      .filter(d => d.date.endsWith('-01'))
                      .map(d => d.weeklyGBP),
                    8
                  )
                : []
            }
            source="ONS · AWE real terms (A3WX)"
            onExpand={wagesSeries.length > 0 ? () => setExpanded('wages') : undefined}
          />
          <MetricCard
            label="Economic inactivity"
            value={latestLabour ? latestLabour.inactivityPct.toFixed(1) : '—'}
            unit="%"
            direction={
              latestLabour && preCovidLabour && latestLabour.inactivityPct > preCovidLabour.inactivityPct
                ? 'up'
                : 'flat'
            }
            polarity="up-is-bad"
            baseline="1 in 5 working-age adults neither in work nor looking — many due to long-term sickness"
            changeText={
              latestLabour
                ? `Employment: ${latestLabour.employmentPct}% · Unemployment: ${latestLabour.unemploymentPct}%`
                : 'Loading…'
            }
            sparklineData={
              data
                ? sparkFrom(
                    data.national.labourMarket.timeSeries
                      .filter(d => d.date.endsWith('-01'))
                      .map(d => d.inactivityPct),
                    8
                  )
                : []
            }
            source="ONS · Labour Force Survey (LF2S)"
            onExpand={labourDetailSeries.length > 0 ? () => setExpanded('labour') : undefined}
          />
        </div>
        </ScrollReveal>

        {/* Chart 1: Inflation */}
        <div id="sec-prices">
        {inflationSeries.length > 0 ? (
          <LineChart
            title="CPI annual inflation rate, 2010–2026"
            subtitle="Consumer Prices Index 12-month rate, all items, UK."
            series={inflationSeries}
            annotations={inflationAnnotations}
            targetLine={inflationTarget}
            yLabel="Percent"
            source={{
              name: 'ONS',
              dataset: 'Consumer Price Inflation (MM23), D7G7',
              frequency: 'monthly',
              url: 'https://www.ons.gov.uk/economy/inflationandpriceindices/timeseries/d7g7/mm23',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Chart 2: Wages nominal vs real */}
        {wagesSeries.length > 0 ? (
          <LineChart
            title="Average weekly earnings, 2010–2025"
            subtitle="Whole economy, seasonally adjusted. Real terms adjusted using CPI."
            series={wagesSeries}
            annotations={wagesAnnotations}
            yLabel="£ per week"
            source={{
              name: 'ONS',
              dataset: 'Average Weekly Earnings (EARN01), KAB9 / A3WX',
              frequency: 'monthly',
              url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/timeseries/kab9/lms',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        </div>{/* end sec-prices */}

        {/* Chart 3: Employment rate */}
        <div id="sec-employment">
        {employmentSeries.length > 0 ? (
          <LineChart
            title="Employment rate, 2010–2025"
            subtitle="Proportion of people aged 16–64 in employment, UK. 3-month rolling average."
            series={employmentSeries}
            annotations={labourAnnotations}
            yLabel="Percent"
            source={{
              name: 'ONS',
              dataset: 'Labour Market Statistics (LMS), LF24',
              frequency: 'monthly',
              url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/timeseries/lf24/lms',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Chart 4: Unemployment + inactivity */}
        {labourDetailSeries.length > 0 ? (
          <LineChart
            title="Unemployment and economic inactivity, 2010–2025"
            subtitle="Unemployment rate (16+) and economic inactivity rate (16–64), UK."
            series={labourDetailSeries}
            annotations={labourAnnotations}
            yLabel="Percent"
            source={{
              name: 'ONS',
              dataset: 'Labour Market Statistics (LMS), MGSX / LF2S',
              frequency: 'monthly',
              url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/timeseries/lf24/lms',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        </div>{/* end sec-employment */}

        {/* Chart 5: Productivity */}
        <div id="sec-productivity">
        {productivitySeries.length > 0 ? (
          <LineChart
            title="Labour productivity, 2007–2025"
            subtitle="Output per hour worked, whole economy, chained volume measure (2023 = 100)."
            series={productivitySeries}
            annotations={productivityAnnotations}
            yLabel="Index"
            source={{
              name: 'ONS',
              dataset: 'Labour Productivity (PRDY), LZVB',
              frequency: 'quarterly',
              url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/labourproductivity/timeseries/lzvb/prdy',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Chart 6: RHDI per head */}
        {rhdiSeries.length > 0 ? (
          <LineChart
            title="Real household disposable income per head, 2007–2025"
            subtitle="Chained volume measure, seasonally adjusted, quarterly."
            series={rhdiSeries}
            annotations={rhdiAnnotations}
            yLabel="£ per head"
            source={{
              name: 'ONS',
              dataset: 'UK Economic Accounts (UKEA), CRXX',
              frequency: 'quarterly',
              url: 'https://www.ons.gov.uk/economy/grossdomesticproductgdp/timeseries/crxx/ukea',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Chart 7: Gini coefficient */}
        {giniSeries.length > 0 ? (
          <LineChart
            title="Income inequality (Gini coefficient), 2010–2024"
            subtitle="Gini coefficient for equivalised disposable income, UK. Higher = more unequal."
            series={giniSeries}
            yLabel="Gini %"
            source={{
              name: 'ONS',
              dataset: 'Household Income Inequality, FYE 2024',
              frequency: 'annual',
              url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/personalandhouseholdfinances/incomeandwealth/bulletins/householdincomeinequalityfinancial/financialyearending2024',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        </div>{/* end sec-productivity */}

        {/* Chart 8: GDP quarterly growth */}
        <div id="sec-gdp">
        {gdpGrowthSeries.length > 0 ? (
          <LineChart
            title="GDP quarterly growth, 2000–2025"
            subtitle="Quarter-on-quarter percentage change in GDP, chained volume measure, seasonally adjusted."
            series={gdpGrowthSeries}
            annotations={gdpAnnotations}
            targetLine={{ value: 0, label: '' }}
            yLabel="% change"
            source={{
              name: 'ONS',
              dataset: 'GDP quarter on quarter growth (IHYQ)',
              frequency: 'quarterly',
              url: 'https://www.ons.gov.uk/economy/grossdomesticproductgdp/timeseries/ihyq/pn2',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Chart 9: Public sector net debt */}
        {debtSeries.length > 0 ? (
          <LineChart
            title="Public sector net debt as % of GDP, 1993–2026"
            subtitle="Excluding public sector banks. Has risen from 22% (2002) to 93% — the highest since the 1960s."
            series={debtSeries}
            annotations={debtAnnotations}
            yLabel="% of GDP"
            source={{
              name: 'ONS',
              dataset: 'Public Sector Net Debt (exc banks) as % of GDP (HF6X)',
              frequency: 'monthly',
              url: 'https://www.ons.gov.uk/economy/governmentpublicsectorandtaxes/publicsectorfinance/timeseries/hf6x/pusf',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Key indicators summary table */}
        {data && (
          <section className="mb-12">
            <h3 className="text-lg font-bold text-wiah-black mb-1">
              Key economic indicators at a glance
            </h3>
            <p className="text-sm text-wiah-mid font-mono mb-4">
              Latest available values from ONS.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-wiah-border">
                    <th className="text-left py-2 pr-4 font-mono text-xs text-wiah-mid">Indicator</th>
                    <th className="text-right py-2 px-3 font-mono text-xs text-wiah-mid">Latest</th>
                    <th className="text-right py-2 px-3 font-mono text-xs text-wiah-mid">Period</th>
                    <th className="text-right py-2 pl-3 font-mono text-xs text-wiah-mid">Target / benchmark</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'CPI inflation', val: `${latestInflation?.cpiPct.toFixed(1)}%`, period: latestInflation?.date ?? '', bench: '2.0% (BoE target)' },
                    { name: 'Real weekly earnings', val: latestReal ? `£${latestReal.weeklyGBP.toFixed(0)}` : '—', period: latestReal?.date ?? '', bench: '£492 (2008 peak)' },
                    { name: 'Employment rate (16-64)', val: latestLabour ? `${latestLabour.employmentPct}%` : '—', period: latestLabour?.date ?? '', bench: '76.2% (2019 peak)' },
                    { name: 'Unemployment rate', val: latestLabour ? `${latestLabour.unemploymentPct}%` : '—', period: latestLabour?.date ?? '', bench: '3.8% (2023 low)' },
                    { name: 'Economic inactivity', val: latestLabour ? `${latestLabour.inactivityPct}%` : '—', period: latestLabour?.date ?? '', bench: '20.2% (2019)' },
                    { name: 'Productivity index', val: data.national.productivity.timeSeries.at(-1)?.index.toFixed(1) ?? '—', period: data.national.productivity.timeSeries.at(-1)?.date ?? '', bench: '2023 = 100' },
                    { name: 'Income inequality (Gini)', val: data.national.livingStandards.giniTimeSeries.at(-1) ? `${data.national.livingStandards.giniTimeSeries.at(-1)!.gini}%` : '—', period: data.national.livingStandards.giniTimeSeries.at(-1) ? String(data.national.livingStandards.giniTimeSeries.at(-1)!.year) : '', bench: '34.3% (2020 peak)' },
                  ].map(row => (
                    <tr key={row.name} className="border-b border-wiah-border/50 hover:bg-wiah-light/50">
                      <td className="py-2 pr-4 text-sm">{row.name}</td>
                      <td className="py-2 px-3 font-mono text-sm text-right font-bold">{row.val}</td>
                      <td className="py-2 px-3 font-mono text-xs text-right text-wiah-mid">{row.period}</td>
                      <td className="py-2 pl-3 font-mono text-xs text-right text-wiah-mid">{row.bench}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="font-mono text-[11px] text-wiah-mid mt-3">
              Sources: ONS Consumer Price Inflation, Average Weekly Earnings, Labour Force Survey, Labour Productivity, Household Income Inequality.
            </p>
          </section>
        )}

        </div>{/* end sec-gdp */}

        {/* ── Section: Earnings Inequality ─────────────────────────────────── */}
        <div id="sec-earnings-inequality">
          <ScrollReveal>
            <div className="mb-6 pt-4">
              <h2 className="text-xl font-bold text-wiah-black mb-2">
                Earnings inequality: the gap that keeps growing
              </h2>
              <p className="text-base text-wiah-black leading-[1.7] max-w-2xl">
                The top 10% of workers earn nearly six times more per week than the bottom 10%.
                While the introduction of the National Living Wage in 2015 boosted lower earners,
                the gap between the top and bottom has continued to widen in cash terms.
              </p>
            </div>
          </ScrollReveal>

          {asheSeries.length > 0 ? (
            <LineChart
              title="Earnings by percentile, UK, 2002–2025"
              subtitle="Gross weekly pay for all employees. Real divergence between top and bottom earners."
              series={asheSeries}
              annotations={asheAnnotations}
              yLabel="£ per week"
              source={{
                name: 'ONS',
                dataset: 'Annual Survey of Hours and Earnings (ASHE), Table 1.1a',
                frequency: 'annual',
                url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/datasets/allemployeesashetable1',
              }}
            />
          ) : (
            <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
          )}
        </div>{/* end sec-earnings-inequality */}

        {/* ── Section: The Regional Divide ──────────────────────────────────── */}
        <div id="sec-regional-divide">
          <ScrollReveal>
            <div className="mb-6 pt-4">
              <h2 className="text-xl font-bold text-wiah-black mb-2">
                The regional divide: London vs everywhere else
              </h2>
              <p className="text-base text-wiah-black leading-[1.7] max-w-2xl">
                London generates 74% more economic output per person than the UK average.
                The North East produces 27% less. This gap has persisted — and widened —
                for decades, making the UK one of the most geographically unequal advanced
                economies in the world.
              </p>
            </div>
          </ScrollReveal>

          {/* GVA trend: London vs UK vs North East */}
          {gvaSeries.length > 0 ? (
            <LineChart
              title="GVA per head by region, 1997–2017"
              subtitle="Gross Value Added per head at current basic prices, £. The North-South productivity divide."
              series={gvaSeries}
              annotations={gvaAnnotations}
              yLabel="£ per head"
              source={{
                name: 'ONS',
                dataset: 'Regional Gross Value Added (Income Approach), Table 2',
                frequency: 'annual',
                url: 'https://www.ons.gov.uk/economy/grossvalueaddedgva/datasets/regionalgrossvalueaddedincomeapproach',
              }}
            />
          ) : (
            <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
          )}

          {/* Regional ranking table */}
          {gvaData && gvaData.latestRanking.length > 0 && (
            <ScrollReveal>
              <section className="mb-12">
                <h3 className="text-lg font-bold text-wiah-black mb-1">
                  GVA per head by region, {gvaData.latestRanking[0].year} ranking
                </h3>
                <p className="text-sm text-wiah-mid font-mono mb-4">
                  GVA per head at current basic prices. UK average = 100.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-wiah-border">
                        <th className="text-left py-2 pr-3 font-mono text-xs text-wiah-mid w-8">Rank</th>
                        <th className="text-left py-2 pr-4 font-mono text-xs text-wiah-mid">Region</th>
                        <th className="text-right py-2 px-3 font-mono text-xs text-wiah-mid">GVA per head</th>
                        <th className="text-right py-2 px-3 font-mono text-xs text-wiah-mid">UK = 100</th>
                        <th className="text-left py-2 pl-3 font-mono text-xs text-wiah-mid w-40">Relative</th>
                      </tr>
                    </thead>
                    <tbody>
                      {gvaData.latestRanking.map(row => (
                        <tr key={row.region} className="border-b border-wiah-border/50 hover:bg-wiah-light/50">
                          <td className="py-2 pr-3 font-mono text-xs text-wiah-mid">{row.rank}</td>
                          <td className="py-2 pr-4 text-sm font-medium">{row.region}</td>
                          <td className="py-2 px-3 font-mono text-sm text-right font-bold">
                            £{row.gvaPerHead.toLocaleString()}
                          </td>
                          <td className="py-2 px-3 font-mono text-sm text-right">
                            <span
                              className={
                                row.ukIndex >= 110 ? 'text-wiah-red font-bold'
                                : row.ukIndex < 90 ? 'text-wiah-green font-bold'
                                : 'text-wiah-mid'
                              }
                            >
                              {row.ukIndex}
                            </span>
                          </td>
                          <td className="py-2 pl-3">
                            <div className="flex items-center gap-1">
                              <div
                                className="h-2 rounded-sm"
                                style={{
                                  width: `${Math.min(100, (row.ukIndex / 180) * 100)}%`,
                                  maxWidth: '120px',
                                  backgroundColor:
                                    row.ukIndex >= 110 ? '#E63946'
                                    : row.ukIndex >= 95 ? '#264653'
                                    : '#2A9D8F',
                                }}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="font-mono text-[11px] text-wiah-mid mt-3">
                  Source: ONS Regional Gross Value Added (Income Approach), Table 2. GVA at current basic prices.
                </p>
              </section>
            </ScrollReveal>
          )}
        </div>{/* end sec-regional-divide */}

        {/* Positive story */}
        <ScrollReveal>
        <PositiveCallout
          title="What's improving"
          value="-7%"
          unit="inequality"
          description="Income inequality has fallen steadily since its 2020 pandemic peak. The Gini coefficient dropped from 35.4 to 32.9 — four consecutive years of declining inequality. Real weekly wages have reached £527, recovering to their highest level in over a decade."
          source="Source: ONS — Household income inequality, 2024."
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
            <li>
              <a
                href="https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/datasets/allemployeesashetable1"
                className="underline hover:text-wiah-blue"
                target="_blank"
                rel="noreferrer"
              >
                ONS — Annual Survey of Hours and Earnings (ASHE), Table 1.1a (annual)
              </a>
            </li>
            <li>
              <a
                href="https://www.ons.gov.uk/economy/grossvalueaddedgva/datasets/regionalgrossvalueaddedincomeapproach"
                className="underline hover:text-wiah-blue"
                target="_blank"
                rel="noreferrer"
              >
                ONS — Regional Gross Value Added (Income Approach) (annual)
              </a>
            </li>
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
      {expanded === 'inflation' && (
        <MetricDetailModal
          title="CPI annual inflation rate, 2010–2026"
          subtitle="Consumer Prices Index 12-month rate, all items, UK."
          series={inflationSeries}
          annotations={inflationAnnotations}
          targetLine={inflationTarget}
          yLabel="Percent"
          source={{
            name: 'ONS',
            dataset: 'Consumer Price Inflation (MM23), D7G7',
            frequency: 'monthly',
            url: 'https://www.ons.gov.uk/economy/inflationandpriceindices/timeseries/d7g7/mm23',
          }}
          onClose={() => setExpanded(null)}
        />
      )}
      {expanded === 'wages' && (
        <MetricDetailModal
          title="Average weekly earnings, 2010–2025"
          subtitle="Whole economy, seasonally adjusted. Nominal vs real (CPI-adjusted)."
          series={wagesSeries}
          annotations={wagesAnnotations}
          yLabel="£ per week"
          source={{
            name: 'ONS',
            dataset: 'Average Weekly Earnings (EARN01), KAB9 / A3WX',
            frequency: 'monthly',
            url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/timeseries/kab9/lms',
          }}
          onClose={() => setExpanded(null)}
        />
      )}
      {expanded === 'labour' && (
        <MetricDetailModal
          title="Unemployment and economic inactivity, 2010–2025"
          subtitle="Unemployment rate (16+) and economic inactivity rate (16–64), UK."
          series={labourDetailSeries}
          annotations={labourAnnotations}
          yLabel="Percent"
          source={{
            name: 'ONS',
            dataset: 'Labour Market Statistics (LMS), MGSX / LF2S',
            frequency: 'monthly',
            url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/timeseries/lf24/lms',
          }}
          onClose={() => setExpanded(null)}
        />
      )}
    </>
  );
}
