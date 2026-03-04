'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface FloodRiskPoint {
  year: number;
  millions: number;
}

interface FloodCostPoint {
  year: number;
  costBn: number;
}

interface FloodTypePoint {
  type: string;
  pctProperties: number;
}

interface FloodRiskData {
  propertiesAtRisk: FloodRiskPoint[];
  floodDamageCost: FloodCostPoint[];
  byFloodType: FloodTypePoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 12) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function FloodRiskPage() {
  const [data, setData] = useState<FloodRiskData | null>(null);

  useEffect(() => {
    fetch('/data/flood-risk/flood_risk.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const propertiesAtRiskSeries: Series[] = data
    ? [
        {
          id: 'properties-at-risk',
          label: 'Properties at significant flood risk',
          colour: '#264653',
          data: data.propertiesAtRisk.map(d => ({
            date: yearToDate(d.year),
            value: d.millions,
          })),
        },
      ]
    : [];

  const floodCostSeries: Series[] = data
    ? [
        {
          id: 'flood-cost',
          label: 'Annual flood damage cost',
          colour: '#264653',
          data: data.floodDamageCost.map(d => ({
            date: yearToDate(d.year),
            value: d.costBn,
          })),
        },
      ]
    : [];

  const floodCostAnnotations: Annotation[] = [
    { date: yearToDate(2007), label: 'Summer floods: &pound;3.2bn damage' },
  ];

  // ── Metrics ──────────────────────────────────────────────────────────────

  const propertiesSparkline = data ? sparkFrom(data.propertiesAtRisk.map(d => d.millions)) : [];
  const costSparkline = data ? sparkFrom(data.floodDamageCost.map(d => d.costBn)) : [];

  return (
    <main>
      <TopicNav topic="Flood Risk" />

      <section className="border-b border-wiah-border">
        <div className="max-w-2xl mx-auto px-6 py-12">
          <TopicHeader
            topic="Flood Risk"
            colour="#264653"
            question="Is flood risk getting worse?"
            finding="5.2 million properties in England are at risk of flooding, and the cost of flood damage has tripled since 2000 as climate change intensifies extreme weather events."
          />
        </div>
      </section>

      {/* Metrics row */}
      <section className="border-b border-wiah-border bg-wiah-light">
        <div className="max-w-2xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <MetricCard
              label="Properties at flood risk in England"
              value="5.2M"
              direction="up"
              polarity="up-is-bad"
              changeText="1 in 6 properties; up from 3.8M in 2012"
              sparklineData={propertiesSparkline}
              source="Environment Agency, 2022"
              onExpand={() => {}}
            />
            <MetricCard
              label="Annual flood damage cost"
              value="&pound;1.4bn"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from &pound;500M in 2000"
              sparklineData={costSparkline}
              source="Environment Agency, 2022"
              onExpand={() => {}}
            />
            <MetricCard
              label="Households without flood insurance"
              value="1.1M"
              direction="up"
              polarity="up-is-bad"
              changeText="Uninsurable or unaffordably priced"
              source="Insurance industry, 2023"
              onExpand={() => {}}
            />
          </div>
        </div>
      </section>

      {/* Charts */}
      <section className="border-b border-wiah-border">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {data && (
            <>
              <ScrollReveal>
                <div className="mb-12">
                  <LineChart
                    title="Properties at significant flood risk, England"
                    subtitle="Millions of properties. Environment Agency National Flood Risk Assessment."
                    series={propertiesAtRiskSeries}
                    source={{
                      name: 'Environment Agency',
                      dataset: 'National Flood Risk Assessment',
                      url: 'https://www.gov.uk/guidance/understand-flood-risk',
                      date: 'Updated 2022',
                      frequency: 'Annual',
                    }}
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <div className="mb-12">
                  <LineChart
                    title="Annual flood damage cost, England"
                    subtitle="Estimated total cost of flood damage in &pound;bn. Major events drive spikes (e.g. 2007 summer floods)."
                    series={floodCostSeries}
                    annotations={floodCostAnnotations}
                    source={{
                      name: 'Environment Agency',
                      dataset: 'Flood Damage Survey',
                      url: 'https://www.gov.uk/guidance/understand-flood-risk',
                      date: 'Updated 2022',
                      frequency: 'Annual',
                    }}
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <div className="mb-12">
                  <h3 className="text-lg font-bold text-wiah-black mb-6">Properties at risk by flood type</h3>
                  <div className="space-y-3 bg-white p-6 rounded-lg border border-wiah-border">
                    {data.byFloodType.map(item => {
                      const widthPct = (item.pctProperties / 50) * 100;
                      return (
                        <div key={item.type} className="flex items-center gap-4">
                          <div className="w-32 text-sm font-mono text-wiah-black">{item.type}</div>
                          <div className="flex-1">
                            <div className="h-6 bg-wiah-light rounded relative" style={{ position: 'relative' }}>
                              <div
                                className="h-6 rounded bg-[#264653] transition-all flex items-center justify-end pr-2"
                                style={{ width: `${widthPct}%` }}
                              >
                                {widthPct > 15 && (
                                  <span className="font-mono text-xs text-white font-bold">
                                    {item.pctProperties}%
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          {widthPct <= 15 && (
                            <div className="w-12 text-sm font-mono text-wiah-black text-right">
                              {item.pctProperties}%
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <p className="font-mono text-xs text-wiah-mid mt-4">Source: Environment Agency National Flood Risk Assessment</p>
                </div>
              </ScrollReveal>
            </>
          )}
        </div>
      </section>

      {/* Context */}
      <section id="sec-context" className="border-b border-wiah-border">
        <div className="max-w-2xl mx-auto px-6 py-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>5.2 million properties in England &mdash; roughly one in six &mdash; sit in flood risk areas, according to the Environment Agency. The threat comes from three overlapping sources: rivers, coastal inundation, and surface water from overwhelmed drainage after intense rainfall. It is the last of these that is growing fastest. Urban drainage infrastructure was largely designed to a one-in-thirty-year standard; climate projections suggest many areas will now see that level of rainfall every ten years. As a result, surface water flooding now accounts for 34% of at-risk properties and is the dominant threat in major cities. The 2007 summer floods caused &pound;3.2bn of damage; the 2015&ndash;16 winter storms (Eva and Desmond) added &pound;1.6bn more; Storm Babet in October 2023 again inundated large parts of Lincolnshire, East Anglia, and Scotland.</p>
            <p>Most at-risk homeowners can still obtain flood insurance, thanks to Flood Re &mdash; a government-backed reinsurance scheme launched in 2016 that allows insurers to offer affordable cover in high-risk areas. But the scheme has critical gaps. Properties built after 2009 are excluded, as are leasehold flats and small businesses. Flood Re is also explicitly transitional: it is due to wind down by 2039, by which point the scheme&apos;s designers hoped the insurance market would have adapted. That assumption is increasingly hard to sustain as climate risk rises. Around 1.1 million households currently have no flood insurance &mdash; either because they cannot afford premiums, have been refused cover, or simply never sought it. When insurance becomes unavailable, property values collapse and mortgage lenders withdraw, effectively creating unmortgageable zones.</p>
            <p>Planning policy sits at the heart of the long-term problem. Environment Agency guidance recommends against building in flood zones, and local planning authorities are required to apply a sequential test before approving development in at-risk areas. In practice, housebuilding pressure routinely overrides this: approximately 10,000 to 11,000 new homes are built in flood-risk areas each year. Permitted development rights &mdash; which allow certain conversions and extensions without full planning consent &mdash; can bypass flood risk assessment entirely. The result is a growing stock of newly built homes with inadequate protection, many of them sold to first-time buyers who do not understand the risk they are inheriting. Adaptation &mdash; flood-resilient construction, sustainable urban drainage, managed floodplains &mdash; receives a fraction of the investment directed at hard flood defences, despite evidence of superior long-run cost-effectiveness.</p>
          </div>
        </div>
      </section>

      {/* Positive callout */}
      <section className="bg-wiah-light border-b border-wiah-border">
        <div className="max-w-2xl mx-auto px-6 py-12">
          <PositiveCallout
            title="Flood Re scheme protecting vulnerable homes"
            value="350,000"
            unit="households"
            description="Flood Re, launched in 2016, is a government-backed reinsurance scheme that allows insurance companies to offer affordable flood cover in high-risk areas. Around 350,000 households benefit. The scheme runs until 2039, but its long-term future &mdash; and how it handles climate-driven increases in risk &mdash; remains unresolved."
            source="Flood Re, 2023"
          />
        </div>
      </section>

      {/* Section nav */}
      <SectionNav sections={[
        { id: 'sec-context', label: 'Context' },
      ]} />
    </main>
  );
}
