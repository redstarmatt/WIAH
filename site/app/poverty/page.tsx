'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'DWP', dataset: 'Households Below Average Income (HBAI)', url: 'https://www.gov.uk/government/statistics/households-below-average-income-for-financial-years-ending-1995-to-2023', date: '2024', note: '68% of people in poverty live in a working family; up from 46% in 2005' },
  { num: 2, name: 'DWP', dataset: 'HBAI — Child Poverty Statistics', url: 'https://www.gov.uk/government/statistics/households-below-average-income-for-financial-years-ending-1995-to-2023', date: '2024', note: '3.4 million children in poverty; highest level in 25 years' },
  { num: 3, name: 'JRF / Trussell Trust', dataset: 'Destitution in the UK', date: '2022', note: '3.8 million people experienced destitution in 2022; more than double the 2017 figure; 1 million children', url: 'https://www.jrf.org.uk/' },
  { num: 4, name: 'Trussell Trust', dataset: 'End-of-Year Food Bank Statistics', url: 'https://www.trusselltrust.org/news-and-blog/latest-stats/end-year-stats/', date: '2024', note: 'Over 3 million parcels distributed; ninefold rise in a decade' },
];

// ── Types ─────────────────────────────────────────────────────────────────────

interface PovertyPoint { year: number; pct: number; millionsPeople: number; }
interface ChildPovertyPoint { year: number; pct: number; millions: number; }
interface FoodBankPoint { year: number; parcelsM: number; }
interface InWorkPoint { year: number; pct: number; }
interface DestitutionPoint { year: number; millions: number; }
interface BenefitsReceiptPoint { year: number; pct: number; }

interface PovertyData {
  national: {
    relativePoverty: { timeSeries: PovertyPoint[]; latest: PovertyPoint };
    childPoverty: { timeSeries: ChildPovertyPoint[]; latest: ChildPovertyPoint };
    foodBanks: { timeSeries: FoodBankPoint[]; latest: FoodBankPoint };
    inWorkPoverty: { timeSeries: InWorkPoint[]; latest: InWorkPoint };
    destitution: { timeSeries: DestitutionPoint[]; latest: DestitutionPoint };
    benefitsReceipt: { timeSeries: BenefitsReceiptPoint[]; latest: BenefitsReceiptPoint };
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

interface WealthDecile {
  decile: number;
  label: string;
  meanWealth: number;
  medianWealth: number;
  wealthShare: number;
}

interface WealthByAge {
  ageGroup: string;
  medianWealth: number;
}

interface WealthGiniPoint {
  wave: string;
  gini: number;
}

interface WealthData {
  wealthByDecile: WealthDecile[];
  wealthByAge: WealthByAge[];
  wealthGiniTimeSeries?: WealthGiniPoint[];
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
  };
}

function yearToDate(y: number): Date { return new Date(y, 0, 1); }

function formatWealth(v: number): string {
  if (v < 0) return `-£${Math.abs(v).toLocaleString('en-GB')}`;
  if (v >= 1_000_000) return `£${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `£${Math.round(v / 1_000)}k`;
  return `£${v.toLocaleString('en-GB')}`;
}

export default function PovertyPage() {
  const [data, setData] = useState<PovertyData | null>(null);
  const [wealthData, setWealthData] = useState<WealthData | null>(null);

  useEffect(() => {
    fetch('/data/poverty/poverty.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
    fetch('/data/poverty/wealth.json')
      .then(r => r.json())
      .then(setWealthData)
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

  // 5. Benefits receipt
  const benefitsReceiptSeries: Series[] = data
    ? [{
        id: 'benefits-receipt',
        label: 'Households receiving benefits (%)',
        colour: '#264653',
        data: data.national.benefitsReceipt.timeSeries.map(d => ({
          date: new Date(d.year, 0, 1),
          value: d.pct,
        })),
      }]
    : [];

  const latestPoverty = data?.national.relativePoverty.latest;
  const latestChild = data?.national.childPoverty.latest;
  const latestFoodBank = data?.national.foodBanks.latest;

  // 5. Wealth Gini over time
  const wealthGiniSeries: Series[] = wealthData?.wealthGiniTimeSeries
    ? [{
        id: 'wealth-gini',
        label: 'Wealth Gini coefficient',
        colour: '#E63946',
        data: wealthData.wealthGiniTimeSeries.map(d => ({
          date: new Date(parseInt(d.wave.split('-')[0]), 0, 1),
          value: d.gini,
        })),
      }]
    : [];

  // ── Wealth decile bar chart helpers ──────────────────────────────────────
  const maxWealthShare = 43.0; // richest decile share

  function decileColour(decile: number): string {
    if (decile <= 3) return '#2A9D8F';
    if (decile <= 7) return '#F4A261';
    return '#E63946';
  }

  // ── Wealth by age bar chart helpers ──────────────────────────────────────
  const maxAgeWealth = 490000; // peak at 65–74

  return (
    <>
      <TopicNav topic="Poverty" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Poverty"
          question="Who Is Actually Struggling to Get By?"
          finding={
            data
              ? `${latestPoverty?.millionsPeople ?? 11.9} million people live in relative poverty, including ${latestChild?.millions ?? 3.4} million children — and food bank use has risen ninefold in a decade.`
              : '11.9 million people live in relative poverty, including 3.4 million children — and food bank use has risen ninefold in a decade.'
          }
          colour="#E63946"
        />

        <section className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The defining feature of UK poverty is that employment no longer prevents it.
              In 2023, 68% of people in poverty lived in a working family — up from 46%
              in 2005.<Cite nums={1} /> Rising rents, high childcare costs, and insecure hours mean a job is
              necessary but no longer sufficient. Child poverty has risen since 2012, driven
              by the benefit cap, the two-child limit, and eroding housing support. An
              estimated 3.4 million children now grow up poor — the highest level in
              25 years and the highest rate among large Western European countries.<Cite nums={2} />
            </p>
            <p>
              At the sharpest end, 3.8 million people experienced destitution in 2022 —
              unable to afford two or more essentials including food, heating, and shelter —
              more than double the 2017 figure.<Cite nums={3} /> One million of them were children. Food bank
              use has risen ninefold in a decade: the Trussell Trust distributed over
              3 million parcels in the last year, and its network covers only part of the
              total.<Cite nums={4} /> Benefit delays, sanctions, and periods of zero income remain the most
              common triggers.
            </p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-poverty-rates', label: 'Poverty Rates' },
          { id: 'sec-food', label: 'Food & Destitution' },
          { id: 'sec-benefits', label: 'Benefits Receipt' },
          { id: 'sec-wealth-inequality', label: 'Wealth Inequality' },
          { id: 'sec-wealth-by-age', label: 'Wealth by Age' },
        ]} />

        {/* Metric cards */}
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

        {/* ── Section: Benefits Receipt ─────────────────────────────────────── */}
        <div id="sec-benefits" className="mb-16">
          <ScrollReveal>
            {benefitsReceiptSeries.length > 0 ? (
              <LineChart
                title="Households receiving benefits, 2010–2023"
                subtitle="Percentage of UK households receiving at least one state benefit or tax credit."
                series={benefitsReceiptSeries}
                annotations={[
                  { date: new Date(2013, 0), label: '2013: Universal Credit rollout' },
                  { date: new Date(2020, 0), label: '2020: COVID uplift (+£20/wk UC)' },
                  { date: new Date(2021, 0), label: '2021: Uplift withdrawn' },
                ]}
                yLabel="% of households"
                source={{
                  name: 'DWP',
                  dataset: 'Family Resources Survey',
                  frequency: 'annual',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse" />
            )}
          </ScrollReveal>
        </div>{/* end sec-benefits */}

        {/* ── Section: Wealth Inequality ────────────────────────────────────── */}
        <div id="sec-wealth-inequality" className="mb-16">
          {wealthGiniSeries.length > 0 && (
            <ScrollReveal>
              <LineChart
                title="Wealth inequality, 2006–2022"
                subtitle="Gini coefficient for total household wealth (property, pensions, financial, physical), Great Britain. Higher = more unequal. Wealth is far more unequal than income."
                series={wealthGiniSeries}
                yLabel="Gini coefficient"
                source={{
                  name: 'ONS',
                  dataset: 'Wealth and Assets Survey (WAS), Waves 1–7',
                  frequency: 'biennial',
                  url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/personalandhouseholdfinances/incomeandwealth/bulletins/wealthingreatbritain/wave7april2018tomarch2020',
                }}
              />
            </ScrollReveal>
          )}

          <h3 className="text-lg font-bold text-wiah-black mb-1">
            Wealth share by household decile, Great Britain, 2018–2020
          </h3>
          <p className="text-sm text-wiah-mid font-mono mb-6">
            The richest 10% of households hold 43% of all wealth. The poorest 10% have negative net wealth.
          </p>

          {wealthData ? (
            <div className="space-y-2 mb-6">
              {wealthData.wealthByDecile.map(d => {
                const barPct = Math.max(d.wealthShare, 0) / maxWealthShare * 100;
                const colour = decileColour(d.decile);
                return (
                  <div key={d.decile} className="flex items-center gap-3">
                    <div className="w-28 text-right text-xs font-mono text-wiah-mid shrink-0">
                      {d.label}
                    </div>
                    <div className="flex-1 bg-wiah-light rounded-sm overflow-hidden h-6 relative">
                      {d.wealthShare > 0 ? (
                        <div
                          className="h-full rounded-sm flex items-center pl-2 transition-all duration-500"
                          style={{ width: `${barPct}%`, backgroundColor: colour }}
                        />
                      ) : (
                        <div className="h-full flex items-center pl-2">
                          <span className="text-[10px] font-mono text-wiah-mid italic">negative net wealth</span>
                        </div>
                      )}
                    </div>
                    <div className="w-28 flex items-center gap-2 shrink-0">
                      <span
                        className="text-xs font-mono font-bold w-10 text-right"
                        style={{ color: colour }}
                      >
                        {d.wealthShare > 0 ? `${d.wealthShare}%` : `${d.wealthShare}%`}
                      </span>
                      <span className="text-[10px] font-mono text-wiah-mid">
                        {formatWealth(d.medianWealth)} median
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="h-64 bg-wiah-light rounded animate-pulse mb-6" />
          )}

          <p className="font-mono text-[11px] text-wiah-mid">
            <a
              href="https://www.ons.gov.uk/peoplepopulationandcommunity/personalandhouseholdfinances/incomeandwealth/bulletins/wealthingreatbritain/wave7april2018tomarch2020"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Source: ONS — Wealth and Assets Survey (WAS), Wave 7: 2018–2020. Great Britain.
            </a>
          </p>
        </div>{/* end sec-wealth-inequality */}

        {/* ── Section: Wealth by Age ────────────────────────────────────────── */}
        <div id="sec-wealth-by-age" className="mb-16">
          <h3 className="text-lg font-bold text-wiah-black mb-1">
            Median household wealth by age group, Great Britain, 2018–2020
          </h3>
          <p className="text-sm text-wiah-mid font-mono mb-6">
            Wealth accumulates sharply with age, with households aged 55–64 having 60× the wealth of those aged 16–24.
          </p>

          {wealthData ? (
            <div className="space-y-2 mb-6">
              {wealthData.wealthByAge.map(d => {
                const barPct = (d.medianWealth / maxAgeWealth) * 100;
                const colour = d.medianWealth >= 400_000 ? '#264653'
                  : d.medianWealth >= 200_000 ? '#2A9D8F'
                  : d.medianWealth >= 50_000 ? '#F4A261'
                  : '#E63946';
                return (
                  <div key={d.ageGroup} className="flex items-center gap-3">
                    <div className="w-16 text-right text-xs font-mono text-wiah-mid shrink-0">
                      {d.ageGroup}
                    </div>
                    <div className="flex-1 bg-wiah-light rounded-sm overflow-hidden h-6">
                      <div
                        className="h-full rounded-sm flex items-center pl-2 transition-all duration-500"
                        style={{ width: `${barPct}%`, backgroundColor: colour }}
                      />
                    </div>
                    <div className="w-20 text-right text-xs font-mono font-bold shrink-0" style={{ color: colour }}>
                      {formatWealth(d.medianWealth)}
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
              href="https://www.ons.gov.uk/peoplepopulationandcommunity/personalandhouseholdfinances/incomeandwealth/bulletins/wealthingreatbritain/wave7april2018tomarch2020"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Source: ONS — Wealth and Assets Survey (WAS), Wave 7: 2018–2020. Median total household wealth. Great Britain.
            </a>
          </p>
        </div>{/* end sec-wealth-by-age */}

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

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
            {wealthData?.metadata.sources.map((src, i) => (
              <li key={`wealth-${i}`}>
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
              <RelatedTopics />
      </main>
    </>
  );
}
