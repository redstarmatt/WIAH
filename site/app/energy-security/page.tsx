'use client'

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface EnergySecurityData {
  energyImportDependency: { year: number; importPct: number }[];
  gasPrice: { year: number; pencePerTherm: number }[];
  bySource: { source: string; pct: number }[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function EnergySecurityPage() {
  const [data, setData] = useState<EnergySecurityData | null>(null);

  useEffect(() => {
    fetch('/data/energy-security/energy_security.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const importDependencySeries: Series[] = data
    ? [
        {
          id: 'imports',
          label: 'Import dependency',
          colour: '#264653',
          data: data.energyImportDependency.map(d => ({
            date: yearToDate(d.year),
            value: d.importPct,
          })),
        },
      ]
    : [];

  const gasPriceSeries: Series[] = data
    ? [
        {
          id: 'gas-price',
          label: 'Gas price',
          colour: '#E63946',
          data: data.gasPrice.map(d => ({
            date: yearToDate(d.year),
            value: d.pencePerTherm,
          })),
        },
      ]
    : [];

  const priceAnnotations: Annotation[] = [
    { date: yearToDate(2022), label: '2022: Ukraine invasion' },
  ];

  // Sparklines
  const importSparkline = data
    ? data.energyImportDependency.map(d => d.importPct)
    : [];

  return (
    <main>
      <TopicNav topic="Energy Security" />
      <TopicHeader
        topic="Energy Security"
        question="Is Britain&apos;s energy supply secure?"
        finding="The 2022 energy crisis exposed Britain&apos;s dependence on imported gas: with no long-term storage and volatile global markets, household bills quadrupled and the government spent &pound;40 billion on the Energy Price Guarantee."
        colour="#264653"
      />

      <section className="px-6 py-12 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Gas storage capacity (days of supply)"
              value="15"
              unit="days"
              direction="up"
              polarity="up-is-bad"
              changeText="Germany has 90 days; EU average 65 days"
              sparklineData={[15, 15, 15]}
              source="DESNZ, Eurostat"
              onExpand={() => {}}
            />
            <MetricCard
              label="UK energy imports as % of total supply"
              value="36"
              unit="%"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 26% in 2015"
              sparklineData={importSparkline}
              source="DESNZ Energy Trends"
              onExpand={() => {}}
            />
            <MetricCard
              label="Government cost of Energy Price Guarantee"
              value="&pound;40bn"
              direction="up"
              polarity="up-is-bad"
              changeText="2022/23; largest peacetime energy subsidy"
              sparklineData={[0, 15, 40, 35]}
              source="Office for Budget Responsibility"
              onExpand={() => {}}
            />
          </div>
        </div>
      </section>

      <ScrollReveal>
        <section id="sec-trends" className="px-6 py-12 bg-white">
          <div className="max-w-5xl mx-auto">
            <LineChart
              title="UK energy import dependency"
              subtitle="Imports as a percentage of total primary energy supply. DESNZ Energy Trends."
              series={importDependencySeries}
            />
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="sec-pricing" className="px-6 py-12 bg-white">
          <div className="max-w-5xl mx-auto">
            <LineChart
              title="UK wholesale gas price, 2018&ndash;2024"
              subtitle="Pence per therm. NBP day-ahead price. The 2022 crisis drove prices 6x above 2020 levels."
              series={gasPriceSeries}
              annotations={priceAnnotations}
            />
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="sec-supply" className="px-6 py-12 bg-white">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-xl font-bold text-wiah-black mb-6">
              UK primary energy supply by source
            </h3>
            <div className="space-y-3">
              {data?.bySource.map((item) => (
                <div key={item.source} className="flex items-center gap-4">
                  <div className="w-32 text-sm text-wiah-black font-medium">
                    {item.source}
                  </div>
                  <div className="flex-1 bg-wiah-light rounded-full h-8 flex items-center overflow-hidden">
                    <div
                      className="bg-[#264653] h-full flex items-center justify-end pr-3 transition-all"
                      style={{ width: `${item.pct}%` }}
                    >
                      <span className="font-mono text-xs font-bold text-white">
                        {item.pct}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <section id="sec-context" className="px-6 py-12 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The 2022 energy crisis exposed a structural weakness policymakers had ignored for years. The Rough gas storage facility &mdash; roughly 70 days of supply &mdash; was mothballed in 2017 as uneconomic, leaving the UK with just 15 days of storage against Germany&apos;s 90 and an EU average of 65. When Russia invaded Ukraine, wholesale gas prices rose six-fold and household bills climbed from &pound;1,100 toward a projected &pound;4,279 before government intervention. The Energy Price Guarantee and Energy Bills Support Scheme together cost approximately &pound;40 billion &mdash; the largest peacetime energy subsidy in UK history. Import dependency has since fallen from a peak of 47% in 2014 to 36% in 2022, partly through offshore wind expansion, but Norway now supplies around 30% of UK gas via a single pipeline &mdash; a dependable but single-point exposure. Installed offshore wind reached 14GW by early 2024 with a target of 50GW by 2030, requiring build rates that planning timelines currently threaten.</p>
            <p>The burden of energy insecurity falls hardest on those with least capacity to absorb it. Low-income renters cannot improve insulation, switch tariffs, or reduce consumption meaningfully, and absorbed the 2022 shock in full before government support arrived &mdash; the approximately 13% of households already in fuel poverty before the crisis had no margin. The political debate over new North Sea licensing &mdash; 100 licences issued in 2023, with Labour proposing to end approvals &mdash; turns on whether additional domestic production serves near-term security or delays the transition to a renewable supply base immune to geopolitical disruption; the UK&apos;s 19 million gas boiler homes mean that question matters as much for household bills as for national energy strategy.</p>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 bg-white">
        <div className="max-w-5xl mx-auto">
          <PositiveCallout
            title="North Sea energy a strategic asset"
            value="1.3M"
            unit="bbl/day"
            description="The UK North Sea still produces 1.3 million barrels of oil equivalent per day, supplying around 35% of domestic gas needs and creating 200,000 jobs. The North Sea Transition Deal (2021) commits the industry to net zero by 2050 while maintaining domestic production. But reserves are declining, and the long-term question is whether new licensing serves energy security or prolongs fossil fuel dependency."
            source="UK North Sea Transition Deal, 2021"
          />
        </div>
      </section>

      <SectionNav
        sections={[
          { id: 'sec-trends', label: 'Trends' },
          { id: 'sec-pricing', label: 'Pricing' },
          { id: 'sec-supply', label: 'Supply' },
          { id: 'sec-context', label: 'Context' },
        ]}
      />
    </main>
  );
}
