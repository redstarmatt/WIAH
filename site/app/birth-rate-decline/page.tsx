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

interface TFRPoint {
  year: number;
  tfr: number;
}

interface LiveBirthsPoint {
  year: number;
  births: number;
}

interface AverageAgePoint {
  year: number;
  age: number;
}

interface BirthRateData {
  totalFertilityRate: TFRPoint[];
  liveBirths: LiveBirthsPoint[];
  averageAgeFirstMother: AverageAgePoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function BirthRateDeclinePage() {
  const [data, setData] = useState<BirthRateData | null>(null);

  useEffect(() => {
    fetch('/data/birth-rate-decline/birth_rate_decline.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const tfrSeries: Series[] = data
    ? [{
        id: 'tfr',
        label: 'Total fertility rate',
        colour: '#6B7280',
        data: data.totalFertilityRate.map(d => ({
          date: yearToDate(d.year),
          value: d.tfr,
        })),
      }]
    : [];

  const birthsSeries: Series[] = data
    ? [{
        id: 'births',
        label: 'Live births',
        colour: '#6B7280',
        data: data.liveBirths.map(d => ({
          date: yearToDate(d.year),
          value: d.births,
        })),
      }]
    : [];

  const ageSeries: Series[] = data
    ? [{
        id: 'age',
        label: 'Average age of first-time mother',
        colour: '#6B7280',
        data: data.averageAgeFirstMother.map(d => ({
          date: yearToDate(d.year),
          value: d.age,
        })),
      }]
    : [];

  const latestTFR = data?.totalFertilityRate[data.totalFertilityRate.length - 1];
  const peakTFR = data?.totalFertilityRate.reduce((a, b) => a.tfr > b.tfr ? a : b);
  const latestBirths = data?.liveBirths[data.liveBirths.length - 1];
  const peakBirths = data?.liveBirths.reduce((a, b) => a.births > b.births ? a : b);
  const latestAge = data?.averageAgeFirstMother[data.averageAgeFirstMother.length - 1];
  const earliestAge = data?.averageAgeFirstMother[0];

  return (
    <>
      <TopicNav topic="Society & Democracy" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Society & Democracy"
          question="Why is Britain having fewer babies than ever?"
          finding="England and Wales recorded an estimated 591,000 live births in 2024 — the fewest since records began. The total fertility rate has fallen to 1.41 children per woman, far below the 2.1 replacement level and down from a recent peak of 1.96 in 2008."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Britain's birth rate has been falling steadily for over a decade, but the pace of decline since 2020 has been striking. The total fertility rate (TFR) — the average number of children a woman would have over her lifetime at current rates — dropped to 1.41 in 2024, a record low for England and Wales. This is not a blip caused by the pandemic: the TFR was already sliding before Covid, falling from 1.96 in 2008 to 1.65 by 2019. What the pandemic did was accelerate an existing trend. The number of live births has fallen by over 220,000 per year compared to the 2012 peak of 813,000, a decline of 27%. Every region of England and Wales has experienced falling birth rates, though the sharpest drops have been in London and the South East, where the cost of housing and childcare is highest.</p>
            <p>The causes are structural, not simply a matter of personal preference. Housing costs are the single largest barrier: the average house price to earnings ratio in England stands at 8.3, meaning a typical home costs more than eight years of gross salary. For couples in their late twenties and early thirties — peak childbearing years — the prospect of starting a family in insecure rented accommodation with no spare bedroom is a powerful deterrent. Childcare costs compound the problem. The UK has some of the most expensive childcare in the OECD; a full-time nursery place for a child under two costs an average of 14,000 pounds per year, absorbing a third or more of a second earner's take-home pay. The average age at which women have their first child has risen from 27.1 in 2000 to 31.0 in 2024, a shift that mechanically reduces completed family size because later starts leave less biological time for second and third children. Internationally, the UK's trajectory mirrors that of other high-income nations — South Korea's TFR has fallen to 0.72, Italy's to 1.20, and Japan's to 1.20 — but the UK's decline has been steeper than France (1.68) or the Scandinavian countries, which maintain higher rates through generous parental leave and subsidised childcare.</p>
            <p>The consequences are long-term and consequential. A sustained TFR below replacement means a shrinking working-age population relative to retirees, placing increasing pressure on the state pension system, the NHS workforce, and the tax base. Net migration has partially offset the demographic shortfall — without immigration, the UK population would already be shrinking — but this creates its own political tensions. Regional variation matters too: areas with younger populations and lower housing costs, such as parts of the North East and Yorkshire, have seen smaller declines, while the sharpest falls are concentrated in London boroughs where the cost of raising a child has become prohibitive for all but the highest earners. The government's extension of free childcare entitlements in 2024 is a step in the right direction, but demographers note that reversing fertility decline requires sustained, multi-generational investment in housing, childcare infrastructure, and parental support — not a single policy intervention.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-tfr', label: 'Fertility rate' },
          { id: 'sec-births', label: 'Live births' },
          { id: 'sec-age', label: 'Maternal age' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Total fertility rate"
              value={latestTFR ? latestTFR.tfr.toFixed(2) : '1.41'}
              unit="children per woman"
              direction="down"
              polarity="up-is-good"
              changeText={
                latestTFR && peakTFR
                  ? `Down from ${peakTFR.tfr.toFixed(2)} in ${peakTFR.year} · replacement level is 2.1`
                  : 'Record low · replacement level is 2.1'
              }
              sparklineData={
                data ? sparkFrom(data.totalFertilityRate.map(d => d.tfr)) : []
              }
              source="ONS · Births in England and Wales, 2024"
              href="#sec-tfr"/>
            <MetricCard
              label="Average age of first-time mother"
              value={latestAge ? latestAge.age.toFixed(1) : '31.0'}
              unit="years"
              direction="up"
              polarity="up-is-bad"
              changeText={
                latestAge && earliestAge
                  ? `Up from ${earliestAge.age.toFixed(1)} in ${earliestAge.year} · +${(latestAge.age - earliestAge.age).toFixed(1)} years in two decades`
                  : 'Up 3.9 years since 2000'
              }
              sparklineData={
                data ? sparkFrom(data.averageAgeFirstMother.map(d => d.age)) : []
              }
              source="ONS · Births by mothers' age, 2024"
              href="#sec-age"/>
            <MetricCard
              label="Live births"
              value={latestBirths ? latestBirths.births.toLocaleString() : '591,000'}
              unit="2024"
              direction="down"
              polarity="neutral"
              changeText={
                latestBirths && peakBirths
                  ? `Down ${Math.round(((peakBirths.births - latestBirths.births) / peakBirths.births) * 100)}% from ${peakBirths.year} peak of ${peakBirths.births.toLocaleString()}`
                  : 'Fewest since records began'
              }
              sparklineData={
                data ? sparkFrom(data.liveBirths.map(d => d.births)) : []
              }
              source="ONS · Births in England and Wales, 2024"
              href="#sec-births"/>
          </div>

        {/* Chart 1: Total fertility rate */}
        <ScrollReveal>
          <div id="sec-tfr" className="mb-12">
            <LineChart
              series={tfrSeries}
              title="Total fertility rate, England &amp; Wales, 1990–2024"
              subtitle="Average children per woman at current age-specific rates. Below replacement (2.1) since 1973."
              yLabel="TFR"
              source={{
                name: 'ONS',
                dataset: 'Births in England and Wales',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Live births */}
        <ScrollReveal>
          <div id="sec-births" className="mb-12">
            <LineChart
              series={birthsSeries}
              title="Live births per year, England &amp; Wales, 2000–2024"
              subtitle="Annual live births. Peaked at 813,000 in 2012, now at lowest level on record."
              yLabel="Births"
              source={{
                name: 'ONS',
                dataset: 'Births in England and Wales',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Average age of first-time mother */}
        <ScrollReveal>
          <div id="sec-age" className="mb-12">
            <LineChart
              series={ageSeries}
              title="Average age of mother at first birth, England &amp; Wales, 2000–2024"
              subtitle="Risen nearly 4 years in two decades, reducing biological window for larger families."
              yLabel="Age (years)"
              source={{
                name: 'ONS',
                dataset: 'Births by mothers' age',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Extended free childcare entitlements from 2024"
            value="30 hours"
            description="From September 2024, working parents in England became entitled to 30 hours of free childcare per week for children from nine months old, extended from the previous threshold of three years. The policy represents the largest expansion of state-funded childcare since the introduction of free nursery places in 2004. Early evidence from countries with similar universal provision — notably France and Sweden — suggests that reducing the direct cost of childcare can stabilise or modestly increase fertility rates, though the effect typically takes five to ten years to materialise. The UK's childcare sector faces significant capacity constraints, with providers reporting recruitment difficulties, but the direction of policy is towards making parenthood more economically viable."
            source="Source: Department for Education — Childcare entitlements expansion, 2024. ONS — Births in England and Wales, 2024."
          />
        </ScrollReveal>
              <RelatedTopics />
      </main>
    </>
  );
}
