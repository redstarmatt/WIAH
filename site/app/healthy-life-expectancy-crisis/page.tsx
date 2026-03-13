'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// ── Types ────────────────────────────────────────────────────────────────────

interface HleVsLePoint {
  year: number;
  hle: number;
  le: number;
}

interface HleByRegionPoint {
  year: number;
  bestRegion: number;
  englandAvg: number;
  worstRegion: number;
  bestName: string;
  worstName: string;
}

interface DeprivationGapPoint {
  year: number;
  leastDeprived: number;
  mostDeprived: number;
  gap: number;
}

interface HealthyLifeExpectancyData {
  hleVsLe: HleVsLePoint[];
  hleByRegion: HleByRegionPoint[];
  deprivationGap: DeprivationGapPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function HealthyLifeExpectancyCrisisPage() {
  const [data, setData] = useState<HealthyLifeExpectancyData | null>(null);

  useEffect(() => {
    fetch('/data/healthy-life-expectancy-crisis/healthy_life_expectancy_crisis.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const hleVsLeSeries: Series[] = data
    ? [
        {
          id: 'hle',
          label: 'Healthy life expectancy',
          colour: '#E63946',
          data: data.hleVsLe.map(d => ({
            date: yearToDate(d.year),
            value: d.hle,
          })),
        },
        {
          id: 'le',
          label: 'Life expectancy',
          colour: '#6B7280',
          data: data.hleVsLe.map(d => ({
            date: yearToDate(d.year),
            value: d.le,
          })),
        },
      ]
    : [];

  const hleByRegionSeries: Series[] = data
    ? [
        {
          id: 'best-region',
          label: 'Richmond upon Thames (best)',
          colour: '#2A9D8F',
          data: data.hleByRegion.map(d => ({
            date: yearToDate(d.year),
            value: d.bestRegion,
          })),
        },
        {
          id: 'england-avg',
          label: 'England average',
          colour: '#6B7280',
          data: data.hleByRegion.map(d => ({
            date: yearToDate(d.year),
            value: d.englandAvg,
          })),
        },
        {
          id: 'worst-region',
          label: 'Blackpool (worst)',
          colour: '#E63946',
          data: data.hleByRegion.map(d => ({
            date: yearToDate(d.year),
            value: d.worstRegion,
          })),
        },
      ]
    : [];

  const deprivationSeries: Series[] = data
    ? [
        {
          id: 'least-deprived',
          label: 'Least deprived decile',
          colour: '#2A9D8F',
          data: data.deprivationGap.map(d => ({
            date: yearToDate(d.year),
            value: d.leastDeprived,
          })),
        },
        {
          id: 'most-deprived',
          label: 'Most deprived decile',
          colour: '#E63946',
          data: data.deprivationGap.map(d => ({
            date: yearToDate(d.year),
            value: d.mostDeprived,
          })),
        },
      ]
    : [];

  const latestHle = data?.hleVsLe[data.hleVsLe.length - 1];
  const latestRegion = data?.hleByRegion[data.hleByRegion.length - 1];
  const latestDeprivation = data?.deprivationGap[data.deprivationGap.length - 1];

  const regionalGap = latestRegion
    ? (latestRegion.bestRegion - latestRegion.worstRegion).toFixed(1)
    : '14.7';

  return (
    <>
      <TopicNav topic="NHS & Healthcare" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="NHS & Healthcare"
          question="How many years of good health do you actually have?"
          finding="Healthy life expectancy in England is 64.1 years -- three years below the state pension age. The gap between the healthiest and most deprived areas has widened to nearly 21 years, meaning where you are born still determines how long you live well."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Life expectancy in England has risen steadily for decades, reaching 80.9 years by 2024. But healthy life expectancy -- the number of years a person can expect to live in good health -- tells a starkly different story. At 64.1 years, it has barely moved since 2010 and actually declined during the pandemic years. The gap between the two measures is now 16.8 years: nearly two decades of life spent in poor health, managing chronic conditions, disability, or dependence on care. This divergence is the quiet crisis buried inside the headline numbers. While medicine has become better at keeping people alive longer, it has not kept people well for longer. The implications are vast -- for the NHS, for social care, for the economy, and for the millions of people living those extra years in pain or limitation.
            </p>
            <p>
              The regional picture is where the crisis becomes most acute. A man born in Richmond upon Thames can expect 72.2 years of good health. A man born in Blackpool can expect 54.0 -- a gap of 18.2 years that has widened every decade since measurement began. Women face similar disparities. The deprivation gradient is even steeper: the gap between the least and most deprived deciles now stands at 20.9 years. This is not a postcode lottery -- it is a predictable, structural outcome of poverty, poor housing, limited access to green space, food insecurity, and decades of unequal investment in public health. The Marmot Review documented this gradient in 2010 and warned it would worsen without intervention. Fourteen years later, the data confirms exactly that prediction. Austerity-era cuts to local authority public health budgets -- averaging 24% in real terms between 2015 and 2023 -- fell hardest on the most deprived areas, compounding existing disadvantage.
            </p>
            <p>
              The state pension age is set to rise to 67, and proposals exist to push it to 68. But healthy life expectancy in the most deprived areas is 50.5 years -- seventeen years before people in those communities will be able to draw a pension. For millions of workers in physically demanding jobs, the promise of retirement is a promise of years they will spend already unwell. Obesity, physical inactivity, smoking, and alcohol all play roles, but these are themselves patterned by deprivation: rates of obesity are twice as high in the most deprived areas compared to the least. The drivers are systemic. The Marmot Review recommended a national strategy of proportionate universalism -- giving every child the best start in life, enabling all to maximise capabilities, creating fair employment and good work, ensuring a healthy standard of living, and creating healthy and sustainable communities. Some areas have adopted elements of this approach. Greater Manchester and Coventry have embedded Marmot principles into local strategy. But nationally, the response has been piecemeal, and the data shows it.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-hle-vs-le', label: 'HLE vs life expectancy' },
          { id: 'sec-regional', label: 'Regional gap' },
          { id: 'sec-deprivation', label: 'Deprivation gap' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Healthy life expectancy"
            value={latestHle ? latestHle.hle.toFixed(1) : '64.1'}
            unit="years"
            direction="down"
            polarity="up-is-good"
            changeText="Down from 68.2 in 2000 · 16.8 years below life expectancy"
            sparklineData={
              data ? sparkFrom(data.hleVsLe.map(d => d.hle)) : []
            }
            source="ONS · Health State Life Expectancies, 2024"
            href="#sec-hle-vs-le"
          />
          <MetricCard
            label="Regional gap (male HLE)"
            value={regionalGap}
            unit="years"
            direction="up"
            polarity="up-is-bad"
            changeText="Richmond upon Thames vs Blackpool · widening since 2010"
            sparklineData={
              data ? sparkFrom(data.hleByRegion.map(d => d.bestRegion - d.worstRegion)) : []
            }
            source="ONS · Health State Life Expectancies by local authority, 2024"
            href="#sec-regional"
          />
          <MetricCard
            label="Areas below pre-pandemic HLE"
            value="87"
            unit="%"
            direction="up"
            polarity="up-is-bad"
            changeText="87% of local authorities have not recovered to 2019 levels"
            sparklineData={[72, 100, 98, 95, 92, 87]}
            source="Health Foundation · Healthy Life Expectancy Analysis, 2024"
            href="#sec-deprivation"
          />
        </div>

        {/* Chart 1: HLE vs Life Expectancy */}
        <ScrollReveal>
          <div id="sec-hle-vs-le" className="mb-12">
            <LineChart
              series={hleVsLeSeries}
              title="Healthy life expectancy vs life expectancy, England, 2000–2024"
              subtitle="Life expectancy has risen steadily. Healthy life expectancy has stagnated, widening the gap of years spent in poor health."
              yLabel="Years"
              source={{
                name: 'ONS',
                dataset: 'Health State Life Expectancies, UK',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: HLE by Region */}
        <ScrollReveal>
          <div id="sec-regional" className="mb-12">
            <LineChart
              series={hleByRegionSeries}
              title="Healthy life expectancy by area, England, 2010–2024"
              subtitle="Richmond upon Thames vs Blackpool — an 18-year gap that continues to widen. England average shown in grey."
              yLabel="Years"
              source={{
                name: 'ONS',
                dataset: 'Health State Life Expectancies by local authority',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Deprivation Decile Gap */}
        <ScrollReveal>
          <div id="sec-deprivation" className="mb-12">
            <LineChart
              series={deprivationSeries}
              title="Healthy life expectancy by deprivation decile, England, 2010–2024"
              subtitle="The gap between the least and most deprived deciles has widened from 18.4 to 20.9 years."
              yLabel="Years"
              source={{
                name: 'ONS',
                dataset: 'Health State Life Expectancies by IMD decile',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Marmot principles adopted in local strategies"
            value="Proportionate universalism"
            description="Several areas have embedded the Marmot Review's recommendations into local health strategy. Greater Manchester's Marmot city-region programme and Coventry's Marmot partnership have shown that targeted investment in early years, employment quality, and community health infrastructure can narrow health inequalities. The NHS Long Term Plan's shift toward prevention -- including social prescribing, tobacco dependency treatment in hospitals, and the expansion of community diagnostic centres -- represents a structural turn toward addressing the causes of poor health before they become chronic disease. These are early-stage interventions, but they reflect a growing consensus that healthy life expectancy will only improve through action outside hospitals, not within them."
            source="Source: Institute of Health Equity — Marmot Review 10 Years On, 2020. Health Foundation — Healthy Life Expectancy Analysis, 2024."
          />
        </ScrollReveal>
        <RelatedTopics />
      </main>
    </>
  );
}