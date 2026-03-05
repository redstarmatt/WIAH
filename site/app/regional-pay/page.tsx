'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface RegionPayPoint {
  region: string;
  medianPay: number;
}

interface GapTimePoint {
  year: number;
  londonMinusNE: number;
}

interface RegionalPayData {
  medianFullTimePay2023: RegionPayPoint[];
  gapTimeSeries: GapTimePoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function RegionalPayPage() {
  const [data, setData] = useState<RegionalPayData | null>(null);

  useEffect(() => {
    fetch('/data/regional-pay/regional_pay.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const gapSeries: Series[] = data
    ? [{
        id: 'pay-gap',
        label: 'London–North East pay gap (£)',
        colour: '#E63946',
        data: data.gapTimeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.londonMinusNE,
        })),
      }]
    : [];

  const latestGap = data?.gapTimeSeries[data.gapTimeSeries.length - 1];
  const londonPay = data?.medianFullTimePay2023.find(r => r.region === 'London');
  const nePay = data?.medianFullTimePay2023.find(r => r.region === 'North East');
  const sortedRegions = data?.medianFullTimePay2023.slice().sort((a, b) => b.medianPay - a.medianPay);

  return (
    <>
      <TopicNav topic="Society & Democracy" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Regional Pay Inequality"
          question="How much does where you live affect what you earn?"
          finding="The median full-time worker in London earns £46,100 — £15,900 more than their counterpart in Wales or the North East (£30,200). The gap has nearly quadrupled since 1997, as financial services and tech concentrate in London."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The median full-time worker in London earned £46,100 in 2023. Their counterpart in the North East or Wales earned £30,200. The gap — £15,900 per year — has grown from £4,200 in 1997, nearly quadrupling in 26 years. This is not simply a reflection of different living costs or different sector mixes; it is the direct financial consequence of an economy that has concentrated high-value activity in one corner of the country while other regions have failed to generate equivalent productivity growth.</p>
            <p>The widening of the gap reflects the trajectory of the UK's most productive sectors. Financial services, professional services, and technology — which generate the highest wages — have concentrated in London and the South East to a degree that has few parallels among comparable economies. The financial sector alone accounts for roughly 7% of UK economic output but is overwhelmingly concentrated in a single city. When financial services boom, London booms; when they contract, London still pays more than everywhere else. The agglomeration of highly-paid work in London is self-reinforcing: the best-connected talent gravitates to where the best wages are, which increases the productivity of London-based firms, which in turn pay higher wages.</p>
            <p>The nominal pay gap overstates the real difference in living standards to some extent. London has substantially higher costs — housing above all, but also transport and childcare. A worker earning £46,100 in London who pays £25,000 a year in rent and commuting costs is less well-off, in material terms, than a worker earning £30,200 in Leeds with a £700/month mortgage. But adjusting for housing costs does not come close to equalising the gap; it merely reduces it. And the key point is that workers in London with high nominal pay can at least theoretically accumulate wealth through property ownership, a route that is largely foreclosed for workers in regions where wages are lower but property has also historically risen in value.</p>
            <p>The skills and education profile of the UK's regions is both cause and consequence of the pay gap. London has a much higher proportion of workers with degree-level qualifications than any other region, partly because graduates migrate to London for work, and partly because London's higher-paying jobs attract and retain them. This brain drain from northern and midland regions is not inevitable — many comparable German, French, and American cities have managed to retain graduate talent by developing productive local economies — but it is deeply embedded and has proved difficult to reverse without major changes to the economic fundamentals.</p>
            <p>The Remote Working transition following COVID offered a brief moment of optimism that the pay geography of the UK might shift. Some workers in high-paying London jobs relocated to cities with lower costs, spending London wages in northern economies. But the data on pay, productivity, and location suggest that hybrid and remote working has not fundamentally altered the structure of where high-paying work is done. The premium jobs remain premium jobs in premium locations. The regional pay gap in 2023 is as wide as it has ever been.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-gap-trend', label: 'Gap over time' },
          { id: 'sec-regions', label: 'Regional breakdown' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="London median full-time pay"
              value={londonPay ? `£${londonPay.medianPay.toLocaleString()}` : '£46,100'}
              unit="/yr"
              direction="up"
              polarity="up-is-bad"
              changeText="53% above UK average of £35,400 · gap growing"
              sparklineData={[28000, 32000, 36000, 40000, 42000, 44000, 46100]}
              source="ONS ASHE · 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="North East / Wales median pay"
              value={nePay ? `£${nePay.medianPay.toLocaleString()}` : '£30,200'}
              unit="/yr"
              direction="up"
              polarity="up-is-good"
              changeText="34% below UK average · gap to London is £15,900"
              sparklineData={[20000, 22000, 24000, 26000, 28000, 29000, 30200]}
              source="ONS ASHE · 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="London–North East pay gap since 1997"
              value={latestGap ? `£${latestGap.londonMinusNE.toLocaleString()}` : '£15,900'}
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Was £4,200 in 1997 · gap nearly quadrupled in 26 years"
              sparklineData={[4200, 7800, 10500, 12400, 14100, 15900]}
              source="ONS ASHE historical"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        {/* Chart: gap over time */}
        <ScrollReveal>
          <div id="sec-gap-trend" className="mb-12">
            <LineChart
              series={gapSeries}
              title="Median full-time pay gap: London vs North East, 1997–2023"
              subtitle="The pay gap between London and the North East has nearly quadrupled in 26 years."
              yLabel="Pay gap (£)"
              source={{
                name: 'ONS',
                dataset: 'Annual Survey of Hours and Earnings (ASHE)',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Regional breakdown */}
        <ScrollReveal>
          <div id="sec-regions" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-1">
                Median full-time annual pay by region, 2023
              </h2>
              <p className="text-sm text-wiah-mid mb-6">UK median: £35,400. Only London and the South East exceed it.</p>
              <div className="mt-4 space-y-4">
                {sortedRegions?.map((r) => {
                  const pct = (r.medianPay / 50000) * 100;
                  const isAboveAvg = r.medianPay >= 35400;
                  return (
                    <div key={r.region}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{r.region}</span>
                        <span
                          className="font-mono text-sm font-bold"
                          style={{ color: isAboveAvg ? '#2A9D8F' : '#E63946' }}
                        >
                          £{r.medianPay.toLocaleString()}
                        </span>
                      </div>
                      <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{
                            width: `${pct}%`,
                            backgroundColor: isAboveAvg ? '#2A9D8F' : '#E63946',
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">Source: ONS Annual Survey of Hours and Earnings (ASHE) · 2023</p>
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
                {' '}— median full-time gross annual pay by region, 2023 and historical series
              </li>
            </ul>
          </div>
        </ScrollReveal>
      </main>
    </>
  );
}
