'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface RentToIncomePoint {
  city: string;
  medianRentMonthly: number;
  medianTakeHomePay: number;
  ratio: number;
}

interface LondonRatioPoint {
  year: number;
  ratio: number;
}

interface HousingCostsWorkersData {
  rentToIncomeRatio: RentToIncomePoint[];
  londonRatioTimeSeries: LondonRatioPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function HousingCostsWorkersPage() {
  const [data, setData] = useState<HousingCostsWorkersData | null>(null);

  useEffect(() => {
    fetch('/data/housing-costs-workers/housing_costs_workers.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const londonSeries: Series[] = data
    ? [{
        id: 'london-ratio',
        label: 'London rent as % of take-home pay',
        colour: '#E63946',
        data: data.londonRatioTimeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.ratio,
        })),
      }]
    : [];

  const latestLondon = data?.londonRatioTimeSeries[data.londonRatioTimeSeries.length - 1];
  const sortedCities = data?.rentToIncomeRatio.slice().sort((a, b) => b.ratio - a.ratio);

  return (
    <>
      <TopicNav topic="Housing" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Housing Costs vs Wages"
          question="What share of your salary actually goes on rent?"
          finding="In London, median rent consumes 71% of median take-home pay. Even in Manchester it's 48%. These ratios have nearly doubled in a generation — squeezing out workers who don't already own property."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>In 2023, median monthly rent in London was approximately &pound;2,100 against median monthly take-home pay of around &pound;2,960 &mdash; meaning 71&percnt; of median take-home pay is consumed by rent, more than double the 30&percnt; internationally recognised affordability threshold. The problem has spread beyond London: Oxford sits at 57&percnt;, Bristol at 55&percnt;, Cambridge at 54&percnt;, Manchester at 48&percnt;. Every major English city now exceeds the affordability threshold by a substantial margin. London&rsquo;s ratio has risen from 32&percnt; in 2000, effectively doubling in a generation, driven by structural under-building in growing cities amplified by rising mortgage rates that have pushed more households into the private rental market as home ownership becomes less accessible.</p>
            <p>The generational and geographic consequences are severe. Workers who bought property before 2010 are largely insulated; the majority of those under 45 who did not face a rental market that suppresses savings, delays family formation, and drives skilled workers away from the cities that most need them. Key worker housing &mdash; once an anachronism &mdash; is now being seriously discussed in several London boroughs for the first time since the 1940s, a measure of how dramatically conditions have deteriorated. The burden falls hardest on those whose public sector salaries are set nationally but who must rent in local markets: a nurse or teacher on a median NHS or DfE salary in London or Bristol has no realistic path to affordability in the private market without either significant subsidy or extreme housing insecurity.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-london-trend', label: 'London over time' },
          { id: 'sec-cities', label: 'City comparison' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="London rent as % of take-home pay"
              value={latestLondon ? latestLondon.ratio.toString() : '71'}
              unit="%"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 32% in 2000 · doubled in a generation"
              sparklineData={[32, 38, 45, 54, 62, 65, 68, 71]}
              source="ONS ASHE + Rightmove rental data · 2023"
              href="#sec-overview"/>
            <MetricCard
              label="Bristol rent/pay ratio"
              value="55"
              unit="%"
              direction="up"
              polarity="up-is-bad"
              changeText="Second highest city · Oxford 57%, Cambridge 54%"
              sparklineData={[28, 32, 38, 42, 48, 52, 55]}
              source="ONS/Rightmove · 2023"
              href="#sec-london-trend"/>
            <MetricCard
              label="Manchester rent/pay ratio"
              value="48"
              unit="%"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from c.25% in 2000 · northern cities now unaffordable too"
              sparklineData={[25, 27, 30, 35, 40, 44, 48]}
              source="ONS/Rightmove · 2023"
              href="#sec-cities"/>
          </div>
        </ScrollReveal>

        {/* Chart: London ratio over time */}
        <ScrollReveal>
          <div id="sec-london-trend" className="mb-12">
            <LineChart
              series={londonSeries}
              title="London: rent as % of median take-home pay, 2000–2023"
              subtitle="The 30% affordability threshold (dotted) was breached around 2010. Now at 71%."
              yLabel="% of take-home pay spent on rent"
              source={{
                name: 'ONS / Rightmove',
                dataset: 'ASHE + Rightmove Rental Market Tracker',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* City comparison bar chart */}
        <ScrollReveal>
          <div id="sec-cities" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-1">
                Rent as % of median take-home pay by city, 2023
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                30% of take-home pay is the standard affordability threshold. Every major English city exceeds it.
              </p>
              <div className="mt-4 space-y-4">
                {sortedCities?.map((c) => {
                  const pct = (c.ratio / 80) * 100;
                  const colour = c.ratio > 60 ? '#E63946' : c.ratio > 45 ? '#F4A261' : '#2A9D8F';
                  return (
                    <div key={c.city}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{c.city}</span>
                        <span className="font-mono text-sm font-bold" style={{ color: colour }}>
                          {c.ratio.toFixed(1)}%
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
              <p className="font-mono text-xs text-wiah-mid mt-4">Source: ONS ASHE · Rightmove Rental Market Tracker · Savills Residential Research · 2023</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Sources */}
        <ScrollReveal>
          <div className="border-t border-wiah-border pt-8 mt-8">
            <h2 className="text-base font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
            <ul className="space-y-2 font-mono text-xs text-wiah-mid">
              <li>
                <a href="https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/bulletins/annualsurveyofhoursandearnings/2023" className="underline hover:text-wiah-black" target="_blank" rel="noopener noreferrer">
                  ONS Annual Survey of Hours and Earnings (ASHE)
                </a>
                {' '}— median full-time earnings by region, 2023
              </li>
              <li>
                <a href="https://www.rightmove.co.uk/news/rental-market-tracker/" className="underline hover:text-wiah-black" target="_blank" rel="noopener noreferrer">
                  Rightmove Rental Market Tracker
                </a>
                {' '}— median monthly rents by city, 2023
              </li>
              <li>
                Savills Residential Research — long-run rental affordability analysis
              </li>
            </ul>
            <p className="font-mono text-xs text-wiah-mid mt-4">Methodology: rent-to-income ratio calculated as median monthly rent divided by median monthly net pay (estimated from ONS gross pay using standard income tax and NI deductions for a single person).</p>
          </div>
        </ScrollReveal>
      </main>
    </>
  );
}
