'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface GvaPerHeadPoint {
  region: string;
  gva: number;
  indexUKAvg: number;
}

interface GapTimePoint {
  year: number;
  londonIndex: number;
  neIndex: number;
}

interface NorthSouthData {
  gvaPerHead: GvaPerHeadPoint[];
  gapTimeSeries: GapTimePoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function NorthSouthDividePage() {
  const [data, setData] = useState<NorthSouthData | null>(null);

  useEffect(() => {
    fetch('/data/north-south-divide/north_south_divide.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const londonSeries: Series[] = data
    ? [{
        id: 'london',
        label: 'London',
        colour: '#E63946',
        data: data.gapTimeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.londonIndex,
        })),
      }]
    : [];

  const neSeries: Series[] = data
    ? [{
        id: 'north-east',
        label: 'North East',
        colour: '#264653',
        data: data.gapTimeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.neIndex,
        })),
      }]
    : [];

  const combinedSeries: Series[] = [...londonSeries, ...neSeries];

  const maxRegion = data?.gvaPerHead.reduce((a, b) => a.gva > b.gva ? a : b);
  const minRegion = data?.gvaPerHead.reduce((a, b) => a.gva < b.gva ? a : b);

  return (
    <>
      <TopicNav topic="Society & Democracy" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="North-South Divide"
          question="Is the economic gap between London and the rest of England widening?"
          finding="London's output per head is now 181% of the UK average — the North East's is 74%. The gap has widened by 30 percentage points since 1997. No major economy has regional inequality as extreme as the UK."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>London generates £56,378 of economic output per person each year. The North East generates £22,843 — 40% of London's figure, and 74% of the UK average. These are not simply different places with different economies; they are different economic worlds operating within the same country, using the same currency, and subject to the same national policies. By the standard measure of regional inequality — the Gini coefficient of regional GVA per head — the UK is the most unequal major economy in Europe.</p>
            <p>The divergence accelerated from the 1980s onwards as manufacturing collapsed in the North and Midlands while financial and professional services concentrated in London and the South East. By 1997, London's GVA per head was already 151% of the UK average. By 2022 it had reached 181%. Over the same period, the North East slipped from 86% to 74% of the UK average. The gap has grown in every economic cycle — in booms, financial services in London expanded faster than manufacturing recovered elsewhere; in recessions, public sector cuts hit more heavily in regions most dependent on government employment.</p>
            <p>The Levelling Up agenda, announced with fanfare in 2019 and still formally government policy, has not visibly narrowed the gap. The UK Shared Prosperity Fund, which replaced EU structural funds, is smaller in real terms than its predecessor. Infrastructure investment per head in London remains substantially higher than in any northern region — the case for HS2, before its truncation, rested partly on the argument that fast connections between northern cities would help close the productivity gap by widening labour markets and enabling agglomeration. The cancellation of the northern leg removes the only plausibly transformative infrastructure intervention of the past decade.</p>
            <p>Transport connectivity is both symptom and cause. A journey from Leeds to Manchester — 43 miles — takes up to 55 minutes by rail. A comparable journey within London would take 20 minutes. Poor intra-northern connectivity suppresses the agglomeration effects that drive productivity in large city-regions. Manchester and Leeds together have roughly the same population as Greater London, but generate less than a third of the economic output, in part because the functional economic area — the catchment from which workers can realistically commute — is so much smaller.</p>
            <p>The international comparison is stark. Germany has federal structures, institutions, and infrastructure investment patterns that have sustained productive manufacturing regions across its territory. France has Paris, but its regions are not as dramatically left behind. The United States has wide regional inequality, but the gap between its highest and lowest productivity states is substantially smaller than the UK equivalent. The UK's extreme spatial concentration of economic activity is a policy choice, embedded over decades — and the data suggest it continues to intensify rather than reverse.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-gap', label: 'Divergence since 1997' },
          { id: 'sec-regions', label: 'Regional GVA' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="London GVA per head"
              value={maxRegion ? `£${maxRegion.gva.toLocaleString()}` : '£56,378'}
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="181% of UK average · up from 151% in 1997"
              sparklineData={[151, 158, 162, 167, 172, 179, 181]}
              source="ONS Regional GVA · 2022"
              onExpand={() => {}}
            />
            <MetricCard
              label="North East GVA per head"
              value={minRegion ? `£${minRegion.gva.toLocaleString()}` : '£22,843'}
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="74% of UK average · gap with London at record high"
              sparklineData={[86, 84, 82, 79, 76, 74, 74]}
              source="ONS Regional GVA · 2022"
              onExpand={() => {}}
            />
            <MetricCard
              label="Gap widened since 1997"
              value="30"
              unit="pp"
              direction="up"
              polarity="up-is-bad"
              changeText="London 151% → 181%, North East 86% → 74% of UK avg"
              sparklineData={[65, 74, 80, 88, 96, 104, 107]}
              source="ONS · 2022"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        {/* Chart: divergence over time */}
        <ScrollReveal>
          <div id="sec-gap" className="mb-12">
            <LineChart
              series={combinedSeries}
              title="Regional GVA per head as % of UK average, 1997–2022"
              subtitle="London pulling away while the North East falls further below the national average."
              yLabel="% of UK average"
              source={{
                name: 'ONS',
                dataset: 'Regional Gross Value Added (Balanced)',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Bar chart: all regions */}
        <ScrollReveal>
          <div id="sec-regions" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-1">
                GVA per head by region (UK average = 100)
              </h2>
              <p className="text-sm text-wiah-mid mb-6">London is the only English region above the UK average. Every other region falls short.</p>
              <div className="mt-4 space-y-4">
                {data?.gvaPerHead.map((r) => {
                  const pct = (r.indexUKAvg / 200) * 100;
                  const colour = r.indexUKAvg >= 100 ? '#264653' : '#E63946';
                  return (
                    <div key={r.region}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{r.region}</span>
                        <span className="font-mono text-sm font-bold text-wiah-black">
                          {r.indexUKAvg} <span className="text-wiah-mid font-normal">(UK avg = 100)</span>
                        </span>
                      </div>
                      <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{ width: `${pct}%`, backgroundColor: colour }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">Source: ONS Regional Gross Value Added (Balanced) · 2022</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Sources */}
        <ScrollReveal>
          <div className="border-t border-wiah-border pt-8 mt-8">
            <h2 className="text-base font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
            <ul className="space-y-2 font-mono text-xs text-wiah-mid">
              <li>
                <a href="https://www.ons.gov.uk/economy/grossvalueaddedgva/bulletins/regionalgrossvalueaddedbalancedukbyindustryandsublocalauthorityuknuts1/1998to2022" className="underline hover:text-wiah-black" target="_blank" rel="noopener noreferrer">
                  ONS Regional Gross Value Added (Balanced)
                </a>
                {' '}— GVA per head by NUTS1 region, 1998–2022
              </li>
            </ul>
          </div>
        </ScrollReveal>
      </main>
    </>
  );
}
