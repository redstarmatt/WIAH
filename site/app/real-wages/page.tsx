'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// ── Types ────────────────────────────────────────────────────────────────────

interface RealWagePoint {
  year: number;
  index: number;
}

interface DecilePoint {
  decile: string;
  growth2008_2024: number;
}

interface RealWagesData {
  realWageIndex: RealWagePoint[];
  byDecile: DecilePoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function RealWagesPage() {
  const [data, setData] = useState<RealWagesData | null>(null);

  useEffect(() => {
    fetch('/data/real-wages/real_wages.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const wageSeries: Series[] = data
    ? [{
        id: 'real-wages',
        label: 'Real wage index (2007 = 100)',
        colour: '#E63946',
        data: data.realWageIndex.map(d => ({
          date: yearToDate(d.year),
          value: d.index,
        })),
      }]
    : [];

  const latest = data?.realWageIndex[data.realWageIndex.length - 1];
  const baseline = data?.realWageIndex[0];

  return (
    <>
      <TopicNav topic="Economy & Work" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Real Wages"
          question="Are workers actually earning more than they were in 2008?"
          finding="Real wages in 2024 are still around 1% below their 2008 peak — the longest sustained pay stagnation since the Napoleonic Wars. The brief recovery before COVID was wiped out by the 2022 inflation shock."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>By 2024, the average worker's pay, adjusted for inflation, remained roughly 1% below where it was in 2008 — no comparable G7 economy has experienced such a prolonged stagnation. After a modest recovery between 2014 and 2019, the 2022 inflation shock delivered a second body blow: CPI peaked at 11.1% in October 2022, and nominal pay rises could not keep pace, with real wages falling at their sharpest rate since records began. The Resolution Foundation estimates the cumulative loss at around £10,000 per worker relative to the pre-2008 trend. CPI excludes housing costs; for workers renting privately or carrying large mortgages, the actual squeeze on living standards has been considerably worse than headline figures suggest, with younger and lower-income households most exposed to rental inflation and mortgage rate rises.</p>
            <p>The stagnation is not uniform. Workers in the bottom 20% saw real wages grow by around 5.1% between 2008 and 2024, boosted by successive National Living Wage increases — a genuine policy success — while median workers saw wages fall slightly in real terms. The UK has underperformed every other G7 economy over this period; Germany, France, Canada, and the United States have all seen meaningful real wage growth since 2008. The divergence reflects a productivity puzzle in the UK that low investment, weak management quality, and a hard-to-automate services-heavy economy only partially explain.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-wage-index', label: 'Wage index' },
          { id: 'sec-deciles', label: 'By income group' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Real wages vs 2008 peak"
              value={latest ? `${(latest.index - 100).toFixed(1)}` : '−1'}
              unit="%"
              direction="down"
              polarity="up-is-good"
              changeText="16-year stagnation · worst performance since Napoleonic era"
              sparklineData={[100, 99.2, 96.8, 93.4, 91.7, 91.2, 93.4, 95.2, 97.4, 96.3, 99.1]}
              source="ONS ASHE, adjusted for CPI · 2024"
              href="#sec-wage-index"/>
            <MetricCard
              label="Average real wage growth per year since 2008"
              value="0.06"
              unit="%/yr"
              direction="flat"
              polarity="up-is-good"
              changeText="Effectively zero real growth for 16 years · vs 2.5%/yr pre-2008"
              sparklineData={[2.5, 2.4, 2.3, 0.5, 0.1, 0.1, 0.0, 0.2, 0.4, 0.06]}
              source="ONS historical"
              href="#sec-deciles"/>
            <MetricCard
              label="Bottom 20% real wage change 2008–2024"
              value="+5.1"
              unit="%"
              direction="up"
              polarity="up-is-good"
              changeText="National Living Wage increases boosted low earners more than median"
              sparklineData={[0, 1, 2, 3, 4, 4.5, 5.1]}
              source="Resolution Foundation · 2024"
              href="#sec-deciles"/>
          </div>
        

        {/* Chart: Real wage index */}
        <ScrollReveal>
          <div id="sec-wage-index" className="mb-12">
            <LineChart
              series={wageSeries}
              title="UK real wages, 2007–2024 (2007 = 100)"
              subtitle="Average weekly earnings adjusted for CPI inflation. Below 100 means lower real pay than 2007."
              yLabel="Real wage index (2007 = 100)"
              source={{
                name: 'ONS',
                dataset: 'Annual Survey of Hours and Earnings (ASHE)',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Decile breakdown bar chart */}
        <ScrollReveal>
          <div id="sec-deciles" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-1">
                Real wage growth by income group, 2008–2024
              </h2>
              <p className="text-sm text-wiah-mid mb-6">Cumulative change in real wages. Low earners gained most from National Living Wage rises; the middle lost ground.</p>
              <div className="mt-4 space-y-4">
                {data?.byDecile.map((d) => {
                  const isPositive = d.growth2008_2024 >= 0;
                  const barWidth = Math.abs(d.growth2008_2024) * 10;
                  return (
                    <div key={d.decile}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{d.decile}</span>
                        <span
                          className="font-mono text-sm font-bold"
                          style={{ color: isPositive ? '#2A9D8F' : '#E63946' }}
                        >
                          {isPositive ? '+' : ''}{d.growth2008_2024}%
                        </span>
                      </div>
                      <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{
                            width: `${Math.min(barWidth, 100)}%`,
                            backgroundColor: isPositive ? '#2A9D8F' : '#E63946',
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">Source: Resolution Foundation Earnings Tracker · ONS ASHE · 2024</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Sources */}
        <ScrollReveal>
          <div className="border-t border-wiah-border pt-8 mt-8">
            <h2 className="text-base font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
            <ul className="space-y-2 font-mono text-xs text-wiah-mid">
              <li>
                <a href="https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/bulletins/annualsurveyofhoursandearnings/2024" className="underline hover:text-wiah-black" target="_blank" rel="noopener noreferrer">
                  ONS Annual Survey of Hours and Earnings (ASHE)
                </a>
                {' '}— earnings adjusted for CPI inflation to produce real wage index
              </li>
              <li>
                <a href="https://www.resolutionfoundation.org/data/earnings-tracker/" className="underline hover:text-wiah-black" target="_blank" rel="noopener noreferrer">
                  Resolution Foundation Earnings Tracker
                </a>
                {' '}— decile breakdown of real wage growth
              </li>
            </ul>
          </div>
        </ScrollReveal>
              <RelatedTopics />
      </main>
    </>
  );
}
