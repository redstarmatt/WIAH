'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

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
            <p>The UK's real wage story since 2008 is one of the most extraordinary episodes in modern economic history. By 2024, the average worker's pay, adjusted for inflation, remained roughly 1% below where it was sixteen years earlier. No comparable economy in the G7 has experienced such a prolonged stagnation. The Resolution Foundation estimates this represents a cumulative loss of around £10,000 per worker relative to the pre-2008 trend — money that was never earned, never spent, and never saved.</p>
            <p>The 2022 inflation shock was the second body blow. After a modest recovery between 2014 and 2019, real wages had nearly returned to their 2008 level. Then energy prices surged following Russia's invasion of Ukraine, CPI peaked at 11.1% in October 2022, and nominal pay rises — even at their fastest rate in decades — couldn't keep pace. By mid-2022, real wages were falling at their sharpest rate since records began.</p>
            <p>The official inflation measure, CPI, doesn't include housing costs. For the majority of workers who rent privately or carry large mortgages, the actual squeeze on living standards has been considerably worse than the headline figures suggest. The Resolution Foundation's measure of living standards, which includes housing, shows an even sharper deterioration for younger and lower-income households — those who don't own property outright and are most exposed to rental inflation and mortgage rate rises.</p>
            <p>Not all workers have fared equally. The introduction and successive increases of the National Living Wage have meant that the bottom fifth of earners have actually seen their real wages rise — in some years by more than the median. Workers in the bottom 20% saw real wages grow by around 5.1% between 2008 and 2024, compared with the median worker who saw wages fall slightly in real terms. This is a genuine policy success, but it has not been sufficient to reverse the broader stagnation that has affected the middle of the earnings distribution.</p>
            <p>The UK has underperformed every other G7 economy on real wage growth over this period. Germany, France, Canada, and the United States have all seen meaningful real wage growth since 2008. The divergence is most pronounced when compared to Germany, where output per worker has grown consistently and wage growth has tracked productivity. In the UK, the productivity puzzle — why output per worker barely grew in the 2010s — remains only partially explained. Low investment, weak management quality, and a services-heavy economy that is hard to automate are all partial answers. The consequence, for workers, has been a lost generation of pay growth.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-wage-index', label: 'Wage index' },
          { id: 'sec-deciles', label: 'By income group' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
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
              onExpand={() => {}}
            />
            <MetricCard
              label="Average real wage growth per year since 2008"
              value="0.06"
              unit="%/yr"
              direction="flat"
              polarity="up-is-good"
              changeText="Effectively zero real growth for 16 years · vs 2.5%/yr pre-2008"
              sparklineData={[2.5, 2.4, 2.3, 0.5, 0.1, 0.1, 0.0, 0.2, 0.4, 0.06]}
              source="ONS historical"
              onExpand={() => {}}
            />
            <MetricCard
              label="Bottom 20% real wage change 2008–2024"
              value="+5.1"
              unit="%"
              direction="up"
              polarity="up-is-good"
              changeText="National Living Wage increases boosted low earners more than median"
              sparklineData={[0, 1, 2, 3, 4, 4.5, 5.1]}
              source="Resolution Foundation · 2024"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

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
      </main>
    </>
  );
}
