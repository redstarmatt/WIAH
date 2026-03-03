'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import SiteName from '@/components/SiteName';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import MetricDetailModal from '@/components/MetricDetailModal';
import LineChart, { Series, Annotation, TargetLine } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';

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

// ── Helpers ──────────────────────────────────────────────────────────────────

function isoToDate(s: string): Date {
  // "2024-01" → first of month; "2024-Q1" → start of quarter
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

  // Combine unemployment + inactivity for a single chart
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
          .filter((_, i) => i % 3 === 0) // quarterly samples from monthly data for readability
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

  // ── Metric values ────────────────────────────────────────────────────────

  const latestInflation = data?.national.inflation.timeSeries.at(-1);

  const latestReal = data?.national.wages.realTimeSeries.at(-1);
  const preCrisisReal = data?.national.wages.realTimeSeries.find(d => d.date === '2008-01');

  const latestLabour = data?.national.labourMarket.timeSeries.at(-1);
  const preCovidLabour = data?.national.labourMarket.timeSeries.find(d => d.date === '2020-01');

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      {/* Sticky nav */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-wiah-border px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/"><SiteName size="nav" /></Link>
          <span className="text-wiah-mid text-sm font-mono">Economy</span>
          <Link href="/" className="text-sm text-wiah-blue hover:underline">&larr; All topics</Link>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy"
          question="Are You Actually Better Off?"
          finding={
            latestReal && latestInflation && latestLabour
              ? `Real wages have finally recovered to pre-financial crisis levels after 16 years — averaging £${latestReal.weeklyGBP} per week. Inflation at ${latestInflation.cpiPct}% is still above the Bank of England's 2% target. Economic inactivity stands at ${latestLabour.inactivityPct}% — over one in five working-age adults are neither employed nor looking for work — and productivity has been essentially flat for 15 years.`
              : 'Real wages took 16 years to recover to their 2008 peak. Productivity growth has flatlined since the financial crisis and economic inactivity remains elevated.'
          }
          colour="#264653"
        />

        {/* Metric cards */}
        <ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="CPI inflation"
            value={latestInflation ? latestInflation.cpiPct.toFixed(1) : '—'}
            unit="%"
            direction={latestInflation && latestInflation.cpiPct > 2 ? 'up' : 'down'}
            polarity="up-is-bad"
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

        {/* Chart 3: Employment rate */}
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

        {/* Chart 5: Productivity */}
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

        {/* Chart 8: GDP quarterly growth */}
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

        {/* Context */}
        <section className="max-w-2xl mt-8 mb-12">
          <h2 className="text-xl font-bold text-wiah-black mb-4">What&apos;s driving this</h2>
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The headline story is one of recovery — but a painfully slow one.
              Real wages fell sharply after the 2008 financial crisis and didn&apos;t return
              to their pre-crisis peak until 2024, a lost decade and a half for living
              standards. The cost of living crisis in 2022–23, driven by energy prices and
              food inflation, pushed CPI above 11% — the highest in over 40 years. Inflation
              has since fallen back but remains above the Bank of England&apos;s 2% target.
            </p>
            <p>
              The labour market tells a more nuanced story. Employment has been remarkably
              resilient: the UK recovered to near-record employment levels after both the
              pandemic and the cost of living squeeze. But economic inactivity — people neither
              working nor looking for work — has risen since COVID. Much of this is driven by
              long-term sickness, particularly among the over-50s. This represents a structural
              shift that simple unemployment figures miss.
            </p>
            <p>
              The productivity puzzle remains the defining economic challenge. Output per hour has
              barely grown since 2008. Before the financial crisis, productivity grew at about 2%
              a year; since then, growth has been close to zero. This matters because productivity
              is the ultimate driver of wages and living standards. Without productivity growth,
              the only way to raise incomes is to work more hours.
            </p>
            <p>
              There are genuine positives. Income inequality, measured by the Gini coefficient,
              has actually fallen since its 2020 pandemic peak and is now at its lowest level
              in over a decade. Real household disposable income per head has recovered to
              pre-crisis levels. And nominal wage growth has been outpacing inflation since
              mid-2023, meaning real pay packets are finally growing again.
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
