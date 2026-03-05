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
            />
            <MetricCard
              label="Annual flood damage cost"
              value="&pound;1.4bn"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from &pound;500M in 2000"
              sparklineData={costSparkline}
              source="Environment Agency, 2022"
            />
            <MetricCard
              label="Households without flood insurance"
              value="1.1M"
              direction="up"
              polarity="up-is-bad"
              changeText="Uninsurable or unaffordably priced"
              source="Insurance industry, 2023"
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
            <p>5.2 million properties in England &mdash; roughly one in six &mdash; sit in flood risk areas, according to the Environment Agency. The threat comes from rivers, coastal inundation, and surface water from overwhelmed drainage after intense rainfall; the last is growing fastest. Urban drainage was largely designed to a one-in-thirty-year standard, but climate projections suggest many areas will now see that level of rainfall every ten years. Surface water flooding now accounts for 34% of at-risk properties and is the dominant threat in major cities. The 2007 summer floods caused &pound;3.2bn of damage; Storm Babet in October 2023 again inundated large parts of Lincolnshire, East Anglia, and Scotland. Approximately 10,000 to 11,000 new homes are built in flood-risk areas each year &mdash; often over Environment Agency objections &mdash; and the government&apos;s FCERM investment plan commits &pound;5.2bn over 2021&ndash;2027, but revenue and maintenance spending was cut in real terms over the same period, leaving ageing defences underfunded.</p>
            <p>Most at-risk homeowners can still obtain flood insurance through Flood Re, the government-backed reinsurance scheme, but around 1.1 million households have none. Flood Re excludes properties built after 2009, leasehold flats, and small businesses, and is designed to wind down by 2039 &mdash; an assumption increasingly hard to sustain as climate risk rises. The distribution of flood risk maps closely onto deprivation: older housing in floodplain towns, coastal settlements facing managed retreat, and urban areas with Victorian drainage are frequently the communities with fewest resources to fund private adaptation. Deprived households are less likely to hold insurance, less likely to recover quickly after an event, and the same flood inflicts substantially greater long-run harm on lower-income communities than on wealthier ones.</p>
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
