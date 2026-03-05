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
            <p>In 2023, the median monthly rent in London was approximately £2,100. The median monthly take-home pay for a full-time worker in London was around £2,960. This means that 71% of median take-home pay is consumed by rent for the median renter paying the median rent. The figure that is typically cited as the threshold of affordability — internationally recognised by housing economists — is 30%. London is more than double that threshold. A teacher, a nurse, a police officer, a firefighter on a median public sector salary in London faces a rental market that takes more than two-thirds of their pay before food, travel, or any other expense.</p>
            <p>The problem is no longer confined to London. Bristol's rent-to-income ratio is 55%, Oxford's is 57%, Cambridge's is 54%, Manchester's is 48%. The unaffordability that was once characterised as a peculiarly London problem has spread to every major English city. The mechanism is straightforward: decades of under-building have created a structural shortage of homes in growing cities, and that shortage is now being transmitted through the rental market at speed as mortgage rates have risen and home ownership has become even less accessible.</p>
            <p>The generational dimension is severe. Workers who bought property before 2010 — particularly in London and the South East — are largely insulated. Their housing costs are either fixed (those on tracker mortgages excepted) or they own outright. Workers who did not buy before 2010, the majority of those under 45, face a rental market that has transformed beyond recognition. The effect is not merely financial stress: it suppresses spending in local economies, reduces workers' ability to save, delays family formation, and drives skilled workers away from cities that nominally need them.</p>
            <p>The 30% affordability benchmark is itself a measure of the norm in other countries. In Germany, long-term tenancies with rent controls have held rental inflation in check even as incomes grew. In Vienna, social housing — comprising roughly 60% of the city's housing stock — provides a market anchor that limits private rental inflation. In the UK, Right to Buy depleted social housing stock throughout the 1980s and 1990s, and housing association building never replaced what was sold. The rental affordability crisis is the consequence of those policy decisions, compounded by planning restrictions that limited new supply in cities where demand was highest.</p>
            <p>Key worker housing — accommodation reserved for nurses, teachers, and other essential workers — is now being discussed seriously in several London boroughs for the first time since the 1940s. The fact that this represents a genuine policy proposal rather than an anachronism speaks to how dramatically the rental market has deteriorated. A city that cannot house the workers who staff its hospitals and schools has a structural problem that neither the free market nor individual households can solve. The data on rent-to-income ratios shows how far that point has already been reached.</p>
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
              onExpand={() => {}}
            />
            <MetricCard
              label="Bristol rent/pay ratio"
              value="55"
              unit="%"
              direction="up"
              polarity="up-is-bad"
              changeText="Second highest city · Oxford 57%, Cambridge 54%"
              sparklineData={[28, 32, 38, 42, 48, 52, 55]}
              source="ONS/Rightmove · 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="Manchester rent/pay ratio"
              value="48"
              unit="%"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from c.25% in 2000 · northern cities now unaffordable too"
              sparklineData={[25, 27, 30, 35, 40, 44, 48]}
              source="ONS/Rightmove · 2023"
              onExpand={() => {}}
            />
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
