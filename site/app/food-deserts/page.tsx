'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// -- Types --

interface FoodDesertsData {
  national: {
    accessTrend: Array<{ year: number; pctLimitedAccess: number }>;
    supermarketDensity: Array<{ year: number; perHundredThousand: number }>;
    byAreaType: Array<{ area: string; supermarketsPerHundredK: number }>;
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

// -- Component --

export default function FoodDesertsPage() {
  const [data, setData] = useState<FoodDesertsData | null>(null);

  useEffect(() => {
    fetch('/data/food-deserts/food_deserts.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // Access trend series
  const accessSeries: Series[] = data
    ? [
        {
          id: 'access-trend',
          label: '% population with limited food access',
          colour: '#E63946',
          data: data.national.accessTrend.map(d => ({
            date: new Date(d.year, 5, 1),
            value: d.pctLimitedAccess,
          })),
        },
      ]
    : [];

  // Supermarket density series
  const densitySeries: Series[] = data
    ? [
        {
          id: 'density',
          label: 'Supermarkets per 100,000 population',
          colour: '#E63946',
          data: data.national.supermarketDensity.map(d => ({
            date: new Date(d.year, 5, 1),
            value: d.perHundredThousand,
          })),
        },
      ]
    : [];

  // Sparkline data
  const accessSparkline = data?.national.accessTrend.map(d => d.pctLimitedAccess) || [];

  return (
    <>
      <TopicNav topic="Food Deserts" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Food Deserts"
          question="Do You Live in a Food Desert?"
          finding="Around 8 million people in the UK live more than a mile from a supermarket and have limited access to fresh food. Deprived areas have five times fewer supermarkets per person than affluent ones. The cost-of-living crisis has intensified food access inequality: budget supermarkets are largely absent from deprived areas, while convenience stores charge a 10&ndash;20% premium on the same goods."
          colour="#E63946"
          preposition="in"
        />

        {/* Context section (MUST come before SectionNav) */}
        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Around 8 million people in the UK live more than a mile from a supermarket without access to a car &mdash; a figure that maps almost exactly onto deprivation. Deprived areas have roughly five times fewer supermarkets per head than affluent ones, and the gap has been widening. Tesco, Sainsbury&apos;s and Asda have quietly closed stores in lower-income neighbourhoods over the past decade while opening larger formats in more prosperous suburbs. The result is that residents who most need affordable food are pushed towards convenience stores that charge a 10&ndash;20% premium on equivalent goods, with fresh fruit and vegetables running 39% more expensive than in supermarkets.</p>
            <p>The discount supermarket expansion that transformed food access for many households has largely bypassed the most deprived postcodes. Aldi and Lidl have grown fast, but their new stores have tended to follow car-owning customers into retail parks and suburban locations rather than high streets in areas with high poverty rates. Online grocery delivery &mdash; the obvious alternative &mdash; is unavailable or impractical in many deprived and rural postcodes, and where it does exist, delivery fees consume a disproportionate share of a small basket. When food inflation peaked at 19% in 2022&ndash;23, the structural penalty fell hardest on those already stretched: the poorest households spend roughly double the share of their income on food compared to the most affluent, so the same percentage rise in prices hit them with twice the force.</p>
            <p>Government policy has not kept pace with the scale of the problem. The National Food Strategy, led by Henry Dimbleby and published in 2021, set out a detailed case for reform &mdash; including a sugar and salt reformulation tax &mdash; but the government declined to implement its central recommendations. The Healthy Start voucher scheme, which supports pregnant women and parents of children under four on benefits, remains underused and covers a narrow slice of those affected. Free school meals now reach all infant school pupils in England, which is a genuine improvement in daily nutrition for younger children, but eligibility in older year groups remains tightly restricted and leaves many food-insecure families outside the scheme.</p>
            <p>There are pockets of genuine progress. The UK Shared Prosperity Fund has channelled money into community food hubs in some areas. Iceland Foods Charitable Foundation and FareShare have expanded community grocery schemes, and Scotland&apos;s Good Food Nation (Scotland) Act 2022 creates a statutory framework for food inequality that has no equivalent in England. These interventions matter to the people they reach, but they remain patchwork &mdash; dependent on charitable funding, local authority capacity, and regeneration cycles rather than structural reform of how food retail operates.</p>
            <p>What the data cannot fully capture is the daily toll of constrained choice: the time cost of travelling further for cheaper food, the nutritional compromise made when fresh produce is out of budget or out of reach, and the extent to which food insecurity shows up in health outcomes only years later. Geographic measures of access also miss the difference between a supermarket two miles away on a bus route and one two miles away with no public transport. The relationship between food environment and diet is real but not deterministic &mdash; and the data does not yet tell us which interventions, at what scale, reliably shift it.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-context', label: 'Context' },
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-charts', label: 'Charts' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Overview: Metric Cards */}
        <section id="sec-overview" className="mt-8">
          <div className="grid gap-4 md:grid-cols-3 mb-12">
            <MetricCard
              label="People with limited food access"
              value="8"
              unit="million"
              direction="flat"
              polarity="up-is-bad"
              changeText="2023 estimate &middot; Live more than 1 mile from supermarket &middot; No access to a car"
              source="Consumer Data Research Centre"
              sparklineData={accessSparkline}
              onExpand={() => {}}
            />
            <MetricCard
              label="Supermarkets per 100,000 in most deprived areas"
              value="2.8"
              direction="down"
              polarity="up-is-good"
              changeText="vs 6.1 in least deprived &middot; 5x gap between richest and poorest areas"
              source="ONS &amp; Consumer Data Research Centre"
              onExpand={() => {}}
            />
            <MetricCard
              label="Premium charged by convenience stores vs supermarkets"
              value="15%"
              direction="up"
              polarity="up-is-bad"
              changeText="Average markup on equivalent groceries &middot; Higher for fresh produce"
              source="Which? Consumer Research"
              onExpand={() => {}}
            />
          </div>
        </section>

        {/* Charts section */}
        <section id="sec-charts" className="mt-12">
          <ScrollReveal>
            <div className="mb-12">
              <h3 className="text-[18px] font-bold text-wiah-black mb-2">Population with limited food access</h3>
              <p className="text-sm text-wiah-mid mb-6">Percentage of UK population living more than 1 mile from supermarket with no car access, 2010&ndash;2023</p>
              <div className="bg-white rounded-lg border border-wiah-border p-6">
                {data ? (
                  <LineChart title="Population with limited food access" series={accessSeries} />
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-wiah-mid">Loading...</div>
                )}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mb-12">
              <h3 className="text-[18px] font-bold text-wiah-black mb-2">Supermarket density over time</h3>
              <p className="text-sm text-wiah-mid mb-6">Average number of supermarkets per 100,000 UK population, 2012&ndash;2023</p>
              <div className="bg-white rounded-lg border border-wiah-border p-6">
                {data ? (
                  <LineChart title="Supermarket density over time" series={densitySeries} />
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-wiah-mid">Loading...</div>
                )}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mb-12">
              <h3 className="text-[18px] font-bold text-wiah-black mb-2">Supermarkets per 100,000 by deprivation quintile</h3>
              <p className="text-sm text-wiah-mid mb-6">Most deprived areas have five times fewer supermarkets per capita</p>
              <div className="bg-white rounded-lg border border-wiah-border p-6">
                {data ? (
                  <div className="space-y-3">
                    {data.national.byAreaType.map(d => (
                      <div key={d.area}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-wiah-black">{d.area}</span>
                          <span className="font-mono text-wiah-mid">{d.supermarketsPerHundredK}</span>
                        </div>
                        <div className="h-2 bg-wiah-border rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${((d.supermarketsPerHundredK / 6.1) * 100).toFixed(0)}%`,
                              backgroundColor: '#E63946',
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-wiah-mid">Loading...</div>
                )}
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Sources section */}
        <section id="sec-sources" className="mt-12 border-t border-wiah-border pt-8">
          <h2 className="text-[18px] font-bold text-wiah-black mb-6">Sources &amp; Methodology</h2>
          {data?.metadata.sources ? (
            <div className="space-y-4 mb-8">
              {data.metadata.sources.map((source, idx) => (
                <div key={idx} className="font-mono text-sm text-wiah-mid">
                  <strong className="text-wiah-black">{source.name}</strong>: {source.dataset} ({source.frequency})
                  <br />
                  <a href={source.url} className="text-wiah-blue hover:underline">
                    {source.url}
                  </a>
                </div>
              ))}
            </div>
          ) : null}
          {data?.metadata.methodology ? (
            <div className="mb-8">
              <h3 className="text-sm font-bold text-wiah-black mb-2">Methodology</h3>
              <p className="text-sm text-wiah-black leading-relaxed">{data.metadata.methodology}</p>
            </div>
          ) : null}
          {data?.metadata.knownIssues && data.metadata.knownIssues.length > 0 ? (
            <div>
              <h3 className="text-sm font-bold text-wiah-black mb-2">Known issues</h3>
              <ul className="text-sm text-wiah-black space-y-1 list-disc list-inside">
                {data.metadata.knownIssues.map((issue, idx) => (
                  <li key={idx}>{issue}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>
      </main>
    </>
  );
}
