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

// ── Types ────────────────────────────────────────────────────────────────────

interface SugarContentPoint {
  year: number;
  gPer100ml: number;
  note?: string;
}

interface SugarSalesPoint {
  year: number;
  tonnesThousands: number;
}

interface ChildObesityPoint {
  year: number;
  receptionPct: number;
  year6Pct: number;
  note?: string;
}

interface LevyRevenuePoint {
  year: number;
  revenueMillions: number;
  note?: string;
}

interface SourceInfo {
  name: string;
  dataset: string;
  url: string;
  retrieved: string;
  frequency: string;
}

interface SugarLevyData {
  sugarContent: {
    timeSeries: SugarContentPoint[];
    percentReduction: number;
    unit: string;
  };
  sugarSales: {
    timeSeries: SugarSalesPoint[];
    percentReduction: number;
    unit: string;
  };
  childObesity: {
    timeSeries: ChildObesityPoint[];
    unit: string;
  };
  levyRevenue: {
    timeSeries: LevyRevenuePoint[];
    unit: string;
    note: string;
  };
  reformulationBreakdown: {
    pctProductsBelowLowerBand: number;
    pctProductsInMidBand: number;
    pctProductsInUpperBand: number;
    lowerBandThreshold: string;
    upperBandThreshold: string;
  };
  metadata: {
    topic: string;
    lastUpdated: string;
    sources: SourceInfo[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function SugarLevyImpactPage() {
  const [data, setData] = useState<SugarLevyData | null>(null);

  useEffect(() => {
    fetch('/data/sugar-levy-impact/sugar_levy_impact.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const sugarContentSeries: Series[] = data
    ? [{
        id: 'sugar-content',
        label: 'Average sugar (g per 100ml)',
        colour: '#2A9D8F',
        data: data.sugarContent.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.gPer100ml,
        })),
      }]
    : [];

  const sugarContentAnnotations: Annotation[] = [
    { date: new Date(2016, 2, 1), label: '2016: Levy announced' },
    { date: new Date(2018, 3, 1), label: '2018: SDIL takes effect' },
  ];

  const childObesitySeries: Series[] = data
    ? [
        {
          id: 'reception',
          label: 'Reception age (4–5)',
          colour: '#E63946',
          data: data.childObesity.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.receptionPct,
          })),
        },
        {
          id: 'year6',
          label: 'Year 6 (10–11)',
          colour: '#6B7280',
          data: data.childObesity.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.year6Pct,
          })),
        },
      ]
    : [];

  const childObesityAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: COVID disruption' },
  ];

  const levyRevenueSeries: Series[] = data
    ? [{
        id: 'revenue',
        label: 'Levy revenue (£m)',
        colour: '#264653',
        data: data.levyRevenue.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.revenueMillions,
        })),
      }]
    : [];

  const levyRevenueAnnotations: Annotation[] = [
    { date: new Date(2018, 3, 1), label: '2018: Levy introduced' },
  ];

  // ── Derived values ────────────────────────────────────────────────────

  const latestSugar = data?.sugarContent.timeSeries[data.sugarContent.timeSeries.length - 1];
  const baselineSugar = data?.sugarContent.timeSeries[0];
  const latestObesityReception = data?.childObesity.timeSeries[data.childObesity.timeSeries.length - 1];
  const latestRevenue = data?.levyRevenue.timeSeries[data.levyRevenue.timeSeries.length - 1];
  const peakRevenue = data?.levyRevenue.timeSeries.reduce((a, b) => a.revenueMillions > b.revenueMillions ? a : b);

  const sugarReduction = baselineSugar && latestSugar
    ? Math.round(((baselineSugar.gPer100ml - latestSugar.gPer100ml) / baselineSugar.gPer100ml) * 100)
    : 47;

  return (
    <>
      <TopicNav topic="Sugar Levy Impact" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Sugar Levy Impact"
          question="Has the Sugar Tax Actually Worked?"
          finding="The Soft Drinks Industry Levy has driven a 47% reduction in sugar content across taxed drinks since 2015 — most of it through reformulation before the levy even took effect. But childhood obesity remains stubbornly high: the levy changed what goes into drinks, not what goes into children."
          colour="#2A9D8F"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The UK's Soft Drinks Industry Levy, introduced in April 2018, is widely regarded as one of the most
              effective food reformulation policies anywhere in the world. The two-tier structure — charging 18p per
              litre for drinks with 5–8g of sugar per 100ml, and 24p per litre above 8g — created a powerful
              incentive for manufacturers to reformulate below the lower threshold. The results were dramatic and
              almost immediate: the average sugar content of levy-applicable drinks fell from 4.83g per 100ml in
              2015 to 2.55g by 2025, a reduction of 47%. Crucially, most of this reformulation happened between
              the levy's announcement in March 2016 and its implementation in April 2018, proving that the threat
              of the tax was more effective than the tax itself. By the time consumers paid a penny more, the sugar
              was already gone from their drinks. Today, two-thirds of products sit below the lower levy band.
            </p>
            <p>
              The revenue story tells the same tale in reverse. HMRC collected £337 million in the levy's first full
              year, but receipts have fallen steadily since — to £248 million in 2024/25 — because the tax was
              designed to make itself obsolete. This is a feature, not a bug: a declining revenue line is the
              clearest evidence of success. Total sugar sold through soft drinks has fallen by nearly half since
              2015, removing an estimated 49 billion calories per year from the national diet. The UK levy has
              become a reference model for over 50 countries that have since introduced or strengthened their own
              sugar taxes.
            </p>
            <p>
              Yet the levy's limits are equally clear. Childhood obesity at reception age (4–5 year olds) was 9.1%
              in 2015 and stands at 9.5% in 2025 — essentially unchanged. Year 6 obesity (10–11 year olds) rose
              from 19.1% to 21.5% over the same period, with a sharp COVID-era spike in 2020/21 that has only
              partially unwound. Soft drinks account for roughly 7% of children's free sugar intake; the remaining
              93% — from confectionery, biscuits, cereals, sauces, and ultra-processed foods — remains largely
              untouched by fiscal policy. The levy succeeded precisely because it had a narrow target with a
              measurable reformulation pathway. Extending that logic to the broader food environment — where
              thousands of products from hundreds of manufacturers compete on taste, price, and convenience —
              is a fundamentally harder problem, and one the UK has not yet seriously attempted.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-sugar', label: 'Sugar reduction' },
          { id: 'sec-obesity', label: 'Child obesity' },
          { id: 'sec-revenue', label: 'Levy revenue' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Sugar in soft drinks (g/100ml)"
            value={latestSugar ? latestSugar.gPer100ml.toFixed(1) : '2.55'}
            unit="g/100ml"
            direction="down"
            polarity="up-is-bad"
            changeText={`Down ${sugarReduction}% from ${baselineSugar?.gPer100ml ?? 4.83}g baseline · most reformulation pre-2018`}
            sparklineData={
              data ? sparkFrom(data.sugarContent.timeSeries.map(d => d.gPer100ml)) : []
            }
            source="PHE / OHID — Sugar Reduction Programme, 2025"
            href="#sec-sugar"
          />
          <MetricCard
            label="Childhood obesity (reception age)"
            value={latestObesityReception ? `${latestObesityReception.receptionPct}%` : '9.5%'}
            direction="up"
            polarity="up-is-bad"
            changeText="Up from 9.1% in 2015 · levy alone insufficient to reverse trend"
            sparklineData={
              data ? data.childObesity.timeSeries.map(d => d.receptionPct) : []
            }
            source="NHS Digital — NCMP, 2024/25"
            href="#sec-obesity"
          />
          <MetricCard
            label="Levy revenue"
            value={latestRevenue ? `£${latestRevenue.revenueMillions}m` : '£248m'}
            unit="2024/25"
            direction="down"
            polarity="up-is-good"
            changeText={
              latestRevenue && peakRevenue
                ? `Down from £${peakRevenue.revenueMillions}m peak · declining = reformulation working`
                : 'Down from £337m peak · declining = reformulation working'
            }
            sparklineData={
              data ? data.levyRevenue.timeSeries.map(d => d.revenueMillions) : []
            }
            source="HMRC — SDIL Statistics, 2024/25"
            href="#sec-revenue"
          />
        </div>

        {/* Chart 1: Sugar content reduction */}
        <ScrollReveal>
          <div id="sec-sugar" className="mb-12">
            <LineChart
              series={sugarContentSeries}
              annotations={sugarContentAnnotations}
              title="Average sugar content in levy-applicable soft drinks, 2015–2025"
              subtitle="Sales-weighted average grams of sugar per 100ml. Most reformulation occurred before the levy took effect."
              yLabel="g per 100ml"
              source={{
                name: 'PHE / OHID',
                dataset: 'Sugar Reduction Programme — Progress Reports',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/collections/sugar-reduction',
                date: 'Mar 2026',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Child obesity */}
        <ScrollReveal>
          <div id="sec-obesity" className="mb-12">
            <LineChart
              series={childObesitySeries}
              annotations={childObesityAnnotations}
              title="Childhood obesity rates, England, 2015–2025"
              subtitle="Reception (age 4–5) and Year 6 (age 10–11). 2020/21 data disrupted by COVID."
              yLabel="% obese"
              source={{
                name: 'NHS Digital',
                dataset: 'National Child Measurement Programme (NCMP)',
                frequency: 'annual',
                url: 'https://digital.nhs.uk/data-and-information/publications/statistical/national-child-measurement-programme',
                date: 'Mar 2026',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Levy revenue */}
        <ScrollReveal>
          <div id="sec-revenue" className="mb-12">
            <LineChart
              series={levyRevenueSeries}
              annotations={levyRevenueAnnotations}
              title="Soft Drinks Industry Levy revenue, 2018–2025"
              subtitle="Annual HMRC receipts. Declining revenue reflects successful reformulation — the levy is designed to make itself obsolete."
              yLabel="£ millions"
              source={{
                name: 'HMRC',
                dataset: 'Soft Drinks Industry Levy Statistics',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/soft-drinks-industry-levy-statistics',
                date: 'Mar 2026',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="A global model for food reformulation"
            value="50+ countries"
            description="The UK's Soft Drinks Industry Levy has become the international benchmark for sugar taxation. Over 50 countries have introduced or strengthened their own sugar drink levies since the UK's was announced in 2016. The two-tier design — taxing sugar content, not drink volume — proved that fiscal policy can drive reformulation at scale without significantly reducing consumer choice. Two-thirds of UK soft drink products now sit below the lower levy band. Total sugar sold through soft drinks has fallen by nearly half, removing an estimated 49 billion calories per year from the national diet. The levy demonstrates that well-designed regulation can align corporate incentives with public health outcomes."
            source="Source: HMRC — SDIL Statistics, 2024/25. PHE/OHID — Sugar Reduction Programme. WHO Global Sugar Tax Tracker."
          />
        </ScrollReveal>

        {/* Sources & Methodology */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            {data?.metadata.sources.map((s, i) => (
              <p key={i}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-wiah-blue hover:underline"
                >
                  {s.name} — {s.dataset}
                </a>
                {' '}· Retrieved {s.retrieved}. Updated {s.frequency}.
              </p>
            ))}
            {!data && (
              <>
                <p><a href="https://www.gov.uk/government/statistics/soft-drinks-industry-levy-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">HMRC — Soft Drinks Industry Levy Statistics</a> · Retrieved 2026-03-01. Updated annual.</p>
                <p><a href="https://www.gov.uk/government/collections/sugar-reduction" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">PHE / OHID — Sugar Reduction Programme</a> · Retrieved 2026-03-01. Updated annual.</p>
                <p><a href="https://digital.nhs.uk/data-and-information/publications/statistical/national-child-measurement-programme" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS Digital — National Child Measurement Programme</a> · Retrieved 2026-03-01. Updated annual.</p>
              </>
            )}
            <p className="mt-4">All figures are for England unless otherwise stated. Sugar content data covers levy-applicable drinks only. 2020/21 NCMP data was severely disrupted by COVID and is not directly comparable. Trend data uses the most recent available release at time of publication.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
