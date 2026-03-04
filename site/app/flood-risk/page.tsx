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
            <p>The government&apos;s current Flood and Coastal Erosion Risk Management investment programme committed &pound;5.2bn over 2021&ndash;2027, with the stated objective of better protecting 336,000 properties and constructing or improving more than 2,000 flood defences. That headline commitment is substantial, but critics&mdash;including the Environment Agency itself&mdash;have consistently argued that capital investment in new defences is being undermined by inadequate maintenance of existing ones. The Agency&apos;s own assessment identifies a maintenance funding gap of approximately &pound;1.1bn per year; ageing defences that are not routinely inspected and repaired offer diminishing protection over time, with failure risk increasing non-linearly as assets age. The distribution of flood risk also maps closely onto deprivation. The most exposed communities&mdash;older housing stock in floodplain towns, coastal settlements facing managed retreat, urban areas with Victorian drainage&mdash;are frequently those with the fewest financial resources to fund private adaptation measures such as flood barriers, resilient flooring, or raised electrics. Deprived households are less likely to hold flood insurance, less likely to recover quickly after an event, and less likely to have the savings buffer that makes temporary evacuation viable. The consequence is that the same flood event inflicts substantially greater long-run harm on lower-income communities than on wealthier ones, even when the water depth and duration are identical.</p>
            <p>The 5.2 million at-risk properties figure is a modelled estimate derived from the Environment Agency&apos;s National Flood Risk Assessment, not a verified property-by-property count; it represents exposure to a one-in-one-hundred-year flood event, a threshold whose meaning is itself being eroded as climate change compresses historical return periods. Projections from the UK Climate Projections (UKCP18) indicate that rainfall intensity across many catchments is increasing in ways that invalidate the statistical assumptions embedded in older risk models, making it genuinely difficult to translate &ldquo;flood risk area&rdquo; designations into reliable probability estimates for any individual property. Flood risk data is fragmented across multiple agencies and organisations&mdash;the Environment Agency holds river and coastal risk data, local authorities hold surface water modelling, water companies hold drainage records, and insurers hold claims histories&mdash;and these datasets are not fully integrated into a single accessible national picture. There is also a material gap between being &ldquo;at risk&rdquo; in a modelled sense and experiencing a flood in practice; properties at the edge of risk zones may never flood, while others outside them have flooded repeatedly due to localised drainage failures that the national model does not capture. Perhaps most significantly, there is no legal requirement for sellers to disclose flood risk history or current flood zone designation at the point of property sale in England&mdash;meaning buyers routinely acquire flood-exposed homes without understanding the insurance implications until they seek a quote.</p>
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
