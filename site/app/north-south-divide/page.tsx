'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'ONS', dataset: 'Regional Gross Value Added (Balanced)', url: 'https://www.ons.gov.uk/economy/grossvalueaddedgva', date: '2022' },
  { num: 2, name: 'IPPR North', dataset: 'State of the North Report', url: 'https://www.ippr.org/research/publications/state-of-the-north', date: '2023' },
  { num: 3, name: 'HM Treasury', dataset: 'Public expenditure statistical analyses — infrastructure spending per head', url: 'https://www.gov.uk/government/collections/public-expenditure-statistical-analyses-pesa', date: '2023' },
];

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
            <p>London generates £56,378 of economic output per person each year; the North East generates £22,843 — 74% of the UK average and 40% of London&rsquo;s figure.<Cite nums={1} /> By the standard measure of regional inequality, the Gini coefficient of GVA per head, the UK is the most unequal major economy in Europe. The divergence accelerated after the 1980s as manufacturing collapsed in the North and Midlands while financial and professional services concentrated in London and the South East. By 1997 London&rsquo;s GVA per head was 151% of the UK average; by 2022 it had reached 181%, while the North East slipped from 86% to 74%.<Cite nums={1} /> The gap has grown in every economic cycle: in booms, London expands faster; in recessions, public sector cuts hit regions most dependent on government employment the hardest. The Levelling Up agenda announced in 2019 has not visibly narrowed it, and the cancellation of HS2&rsquo;s northern leg removes the only plausibly transformative infrastructure intervention of the past decade.<Cite nums={2} /></p>
            <p>Transport connectivity is both symptom and cause. Leeds to Manchester — 43 miles — takes up to 55 minutes by rail; a comparable London journey takes 20. Poor intra-northern connectivity suppresses the agglomeration effects that drive urban productivity, constraining labour markets and limiting scale. Manchester and Leeds together have roughly the same population as Greater London but generate less than a third of the economic output.<Cite nums={1} /> Infrastructure investment per head in London remains substantially higher than in any northern region.<Cite nums={3} /> By international comparison, Germany&rsquo;s federal structures and infrastructure investment have sustained productive regions across its territory; France has Paris but its regions are not as dramatically left behind; the US&rsquo;s state-level gap is substantially smaller than the UK equivalent.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-gap', label: 'Divergence since 1997' },
          { id: 'sec-regions', label: 'Regional GVA' },
        ]} />

        {/* Metric cards */}
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
              href="#sec-gap"/>
            <MetricCard
              label="North East GVA per head"
              value={minRegion ? `£${minRegion.gva.toLocaleString()}` : '£22,843'}
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="74% of UK average · gap with London at record high"
              sparklineData={[86, 84, 82, 79, 76, 74, 74]}
              source="ONS Regional GVA · 2022"
              href="#sec-regions"/>
            <MetricCard
              label="Gap widened since 1997"
              value="30"
              unit="pp"
              direction="up"
              polarity="up-is-bad"
              changeText="London 151% → 181%, North East 86% → 74% of UK avg"
              sparklineData={[65, 74, 80, 88, 96, 104, 107]}
              source="ONS · 2022"
              href="#sec-regions"/>
          </div>
        

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

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

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
              <RelatedTopics />
      </main>
    </>
  );
}
