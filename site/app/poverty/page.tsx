'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import SiteName from '@/components/SiteName';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ─────────────────────────────────────────────────────────────────────

interface PovertyPoint { year: number; pct: number; millionsPeople: number; }
interface ChildPovertyPoint { year: number; pct: number; millions: number; }
interface FoodBankPoint { year: number; parcelsM: number; }
interface InWorkPoint { year: number; pct: number; }
interface DestitutionPoint { year: number; millions: number; }

interface PovertyData {
  national: {
    relativePoverty: { timeSeries: PovertyPoint[]; latest: PovertyPoint };
    childPoverty: { timeSeries: ChildPovertyPoint[]; latest: ChildPovertyPoint };
    foodBanks: { timeSeries: FoodBankPoint[]; latest: FoodBankPoint };
    inWorkPoverty: { timeSeries: InWorkPoint[]; latest: InWorkPoint };
    destitution: { timeSeries: DestitutionPoint[]; latest: DestitutionPoint };
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

function yearToDate(y: number): Date { return new Date(y, 0, 1); }

export default function PovertyPage() {
  const [data, setData] = useState<PovertyData | null>(null);

  useEffect(() => {
    fetch('/data/poverty/poverty.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // 1. Relative poverty
  const relativeSeries: Series[] = data
    ? [{
        id: 'relative',
        label: 'People in relative poverty (%)',
        colour: '#E63946',
        data: data.national.relativePoverty.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.pct,
        })),
      }]
    : [];

  const povertyAnnotations: Annotation[] = [
    { date: new Date(2010, 0), label: '2010: Austerity begins' },
    { date: new Date(2013, 0), label: '2013: Universal Credit rollout' },
    { date: new Date(2020, 0), label: '2020: COVID furlough' },
    { date: new Date(2022, 0), label: '2022: Cost of living crisis' },
  ];

  // 2. Child poverty
  const childSeries: Series[] = data
    ? [{
        id: 'child',
        label: 'Children in relative poverty (%)',
        colour: '#E63946',
        data: data.national.childPoverty.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.pct,
        })),
      }]
    : [];

  // 3. Food bank parcels
  const foodBankSeries: Series[] = data
    ? [{
        id: 'foodbank',
        label: 'Food parcels distributed (millions)',
        colour: '#F4A261',
        data: data.national.foodBanks.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.parcelsM,
        })),
      }]
    : [];

  // 4. In-work poverty
  const inWorkSeries: Series[] = data
    ? [{
        id: 'inwork',
        label: '% of poor in working families',
        colour: '#6B7280',
        data: data.national.inWorkPoverty.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.pct,
        })),
      }]
    : [];

  const latestPoverty = data?.national.relativePoverty.latest;
  const latestChild = data?.national.childPoverty.latest;
  const latestFoodBank = data?.national.foodBanks.latest;

  return (
    <>
      {/* Sticky nav */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-wiah-border px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/"><SiteName size="nav" /></Link>
          <span className="text-wiah-mid text-sm font-mono">Poverty</span>
          <Link href="/" className="text-sm text-wiah-blue hover:underline">&larr; All topics</Link>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Poverty"
          question="Who Is Actually Struggling to Get By?"
          finding={
            latestPoverty && latestChild && latestFoodBank
              ? `${latestPoverty.pct}% of the UK population — ${latestPoverty.millionsPeople} million people — live in relative poverty. ${latestChild.pct}% of children, ${latestChild.millions} million, grow up poor. The Trussell Trust distributed ${latestFoodBank.parcelsM} million emergency food parcels in the last year — up from 350,000 a decade ago.`
              : '11.9 million people live in relative poverty. 3.4 million children. Food bank use has risen ninefold in a decade.'
          }
          colour="#E63946"
        />

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-poverty-rates', label: 'Poverty Rates' },
          { id: 'sec-food', label: 'Food & Destitution' },
          { id: 'sec-context', label: 'Context' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="People in relative poverty"
            value={latestPoverty ? `${latestPoverty.millionsPeople}M` : '—'}
            unit="people"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestPoverty
                ? `${latestPoverty.pct}% of population · Below 60% of median income`
                : 'Loading…'
            }
            sparklineData={
              data
                ? data.national.relativePoverty.timeSeries.slice(-10).map(d => d.millionsPeople)
                : []
            }
            source="DWP · HBAI FYE 2024"
            baseline="1 in 6 people in the UK living below 60% of median income"
          />
          <MetricCard
            label="Children in poverty"
            value={latestChild ? `${latestChild.millions}M` : '—'}
            unit="children"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestChild
                ? `${latestChild.pct}% of all children · up from 17.5% in 2014`
                : 'Loading…'
            }
            sparklineData={
              data
                ? data.national.childPoverty.timeSeries.slice(-10).map(d => d.millions)
                : []
            }
            source="DWP · HBAI FYE 2024"
            baseline="More than 1 child in 4 — the highest rate in 25 years"
          />
          <MetricCard
            label="Food bank parcels"
            value={latestFoodBank ? `${latestFoodBank.parcelsM}M` : '—'}
            unit="parcels/yr"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestFoodBank
                ? `Up from 0.35M in 2013 · Trussell Trust network only`
                : 'Loading…'
            }
            sparklineData={
              data
                ? data.national.foodBanks.timeSeries.slice(-8).map(d => d.parcelsM)
                : []
            }
            source="Trussell Trust · Annual statistics 2024"
            baseline="3.1M parcels last year — up from 350,000 in 2013, a ninefold rise in a decade"
          />
        </div>
        </ScrollReveal>

        {/* Chart 1: Relative poverty */}
        <div id="sec-poverty-rates">
        {relativeSeries.length > 0 ? (
          <LineChart
            title="People in relative poverty, 2003–2023"
            subtitle="% of UK population with household income below 60% of the contemporary median, before housing costs."
            series={relativeSeries}
            annotations={povertyAnnotations}
            yLabel="Percent"
            source={{
              name: 'DWP',
              dataset: 'Households Below Average Income (HBAI)',
              frequency: 'annual',
              url: 'https://www.gov.uk/government/statistics/households-below-average-income-for-financial-years-ending-1995-to-2023',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Chart 2: Child poverty */}
        {childSeries.length > 0 ? (
          <LineChart
            title="Child poverty, 2003–2024"
            subtitle="Children aged under 16 living in households below 60% of median income, before housing costs."
            series={childSeries}
            annotations={povertyAnnotations}
            yLabel="Percent"
            source={{
              name: 'DWP',
              dataset: 'Households Below Average Income (HBAI) — Children',
              frequency: 'annual',
              url: 'https://www.gov.uk/government/statistics/households-below-average-income-for-financial-years-ending-1995-to-2023',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        </div>{/* end sec-poverty-rates */}

        {/* Chart 3: Food banks */}
        <div id="sec-food">
        {foodBankSeries.length > 0 ? (
          <LineChart
            title="Trussell Trust food parcels, 2013–2024"
            subtitle="Emergency food parcels distributed per year across the Trussell Trust network (UK). Does not include independent food banks."
            series={foodBankSeries}
            annotations={[
              { date: new Date(2020, 0), label: '2020: COVID crisis' },
              { date: new Date(2022, 0), label: '2022: Cost of living' },
            ]}
            yLabel="Millions of parcels"
            source={{
              name: 'Trussell Trust',
              dataset: 'End-of-Year Food Bank Statistics',
              frequency: 'annual',
              url: 'https://www.trusselltrust.org/news-and-blog/latest-stats/end-year-stats/',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Chart 4: In-work poverty */}
        {inWorkSeries.length > 0 ? (
          <LineChart
            title="In-work poverty, 2005–2023"
            subtitle="% of people in poverty who live in a working family — showing poverty is increasingly not just about unemployment."
            series={inWorkSeries}
            yLabel="Percent"
            source={{
              name: 'DWP / Resolution Foundation',
              dataset: 'HBAI — working family poverty analysis',
              frequency: 'annual',
              url: 'https://www.gov.uk/government/statistics/households-below-average-income-for-financial-years-ending-1995-to-2023',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Destitution summary card */}
        {data && (
          <section className="mb-12 bg-wiah-light rounded-lg p-6">
            <h3 className="text-lg font-bold text-wiah-black mb-1">Destitution in the UK</h3>
            <p className="text-sm text-wiah-mid font-mono mb-4">
              People unable to afford two or more basic necessities (food, shelter, heating, lighting, clothing, toiletries).
            </p>
            <div className="grid grid-cols-3 gap-6">
              {data.national.destitution.timeSeries.map(d => (
                <div key={d.year} className="text-center">
                  <div className="font-mono text-3xl font-bold text-wiah-red">{d.millions}M</div>
                  <div className="font-mono text-xs text-wiah-mid mt-1">{d.year}</div>
                </div>
              ))}
            </div>
            <p className="font-mono text-[11px] text-wiah-mid mt-4">
              Source: JRF / Trussell Trust — Destitution in the UK (2017, 2019, 2022).
            </p>
          </section>
        )}

        {/* Positive callout */}
        <ScrollReveal>
        <PositiveCallout
          title="What's improving"
          value="68%"
          unit="employed"
          description="The UK employment rate remains at historically high levels — over 74% of working-age adults are in work, one of the highest rates in the OECD. The National Living Wage has risen significantly in real terms since 2016, lifting the floor for the lowest-paid workers. Pension poverty has fallen sharply: the triple lock has pushed pensioner poverty rates to their lowest in decades."
          source="Source: ONS Labour Force Survey. DWP HBAI 2024."
        />
        </ScrollReveal>

        </div>{/* end sec-food */}

        {/* Context */}
        <section id="sec-context" className="max-w-2xl mt-8 mb-12">
          <h2 className="text-xl font-bold text-wiah-black mb-4">What&apos;s driving this</h2>
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The defining feature of UK poverty today is that it is increasingly in-work poverty.
              In 2023, 68% of people in poverty lived in a working family — up from 46% in 2005.
              Rising rents, high childcare costs, and stagnant wages at the bottom of the labour
              market mean that a job is no longer sufficient to escape poverty. Zero-hours contracts
              and part-time work compound the problem.
            </p>
            <p>
              Child poverty has been rising since 2012, driven partly by the benefit cap, the two-child
              limit on child tax credit, and the erosion of local housing allowance. The UK has the
              highest child poverty rate of any large Western European country. An estimated 3.4 million
              children are growing up in poverty in 2024 — the highest level in 25 years.
            </p>
            <p>
              Food bank use has risen ninefold in a decade. This is partly supply (more food banks exist)
              but primarily demand: benefit delays, sanctions, and zero income in emergency periods push
              people to crisis point. The Trussell Trust&apos;s data covers only its own network; total
              food bank use across all providers is estimated to be 30–40% higher.
            </p>
            <p>
              Destitution — a much sharper measure, covering people unable to afford basic necessities —
              has more than doubled since 2017. The JRF and Trussell Trust estimate 3.8 million people
              experienced destitution in 2022, including 1 million children. This is a rich-country
              failure of the first order.
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
