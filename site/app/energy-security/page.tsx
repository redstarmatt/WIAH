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
            <p>The 2022 energy crisis laid bare a structural weakness that policymakers had ignored for years. When Russia invaded Ukraine in February 2022, global gas prices spiked and the UK had almost no buffer. The Rough storage facility&mdash;which held around 400 million cubic feet of gas, roughly 70 days of supply&mdash;had been mothballed in 2017 as uneconomic. By 2022 the UK held around 15 days of gas storage, against Germany&apos;s 90 days and an EU average of 65. Wholesale prices rose approximately six-fold between 2020 and 2022. The average annual household energy bill climbed from &pound;1,100 to a projected &pound;4,279 before government intervention.</p>
            <p>The scale of fiscal exposure was extraordinary. The government introduced the Energy Price Guarantee, capping the average bill at &pound;2,500, alongside the Energy Bills Support Scheme. Together these cost approximately &pound;40 billion&mdash;the largest peacetime energy subsidy in UK history. The burden fell hardest on households already in fuel poverty, which the Office for National Statistics estimated at around 13% of households before the crisis began. Low-income renters, who cannot improve their insulation or switch tariffs, had no means to reduce consumption and absorbed the shock in full before any government support reached them.</p>
            <p>The longer-term security picture is mixed. Import dependency peaked at 47% of primary energy supply in 2014 and had fallen to 36% by 2022, partly through expansion of offshore wind. Norway now supplies roughly 30% of UK gas via pipeline&mdash;a dependable but single-point exposure. North Sea domestic production has been declining since 1999. Hinkley Point C, due online in the early 2030s, would add around 7% of electricity supply from a domestic, geopolitics-proof source. The political debate over new North Sea licensing&mdash;100 licences issued by the previous Conservative government in 2023, with Labour proposing to end new approvals&mdash;turns on whether additional domestic fossil fuel extraction serves near-term security or delays the transition to a renewable supply base that cannot be disrupted by any foreign government.</p>
            <p>The transition to renewables is reshaping the security picture as much as the price picture. Installed offshore wind capacity reached 14GW by early 2024, making the UK the second-largest offshore wind market globally, with a government target of 50GW by 2030 requiring sustained build rates that planning approval timelines currently threaten. Solar has expanded rapidly to around 17GW installed capacity, though winter output limitations mean it contributes less to security than headline capacity figures suggest. Interconnectors to France (IFA, IFA2), Belgium (Nemo Link), Norway (NSL), and Denmark (Viking Link, operational from late 2023) provide approximately 8GW of import and export flexibility, allowing the system to balance against continental generation patterns&mdash;though this introduces reciprocal dependency on neighbours&apos; grid conditions. Battery storage has grown from near-zero to over 4GW of grid-scale capacity since 2020, providing short-duration balancing but not the seasonal storage the UK lacks. The hydrogen strategy, published in 2021 and updated in 2023, envisions both blue and green hydrogen for industrial and heating use, but commercial-scale deployment remains years away. Grid infrastructure is the immediate bottleneck: National Grid&apos;s Accelerated Strategic Transmission Investment programme aims to address the planning and connection queue that is delaying renewable projects already approved. GB Energy, Labour&apos;s publicly owned clean energy company announced in 2024, is intended to co-invest in projects rather than own generation assets directly.</p>
            <p>DESNZ Energy Trends, the primary official data source, provides strong coverage of electricity generation by fuel type but significantly weaker data on the heat sector, which accounts for approximately 37% of final UK energy consumption and is dominated by gas boilers in ways that are harder to meter and report consistently. Import dependency figures are typically expressed in primary energy terms, which overweights oil (used mainly for transport, not homes) and can obscure the distinct dynamics of gas and electricity imports. Gas storage capacity is privately operated&mdash;currently by Centrica at Rough and by independent operators at smaller sites&mdash;and commercially sensitive operational data is not fully transparent; the published storage level figures give a snapshot but not a reliable forward view of winter buffer. Projections of future renewable capacity depend heavily on planning outcomes, grid connection timelines, and supply chain availability, all of which carry substantial uncertainty; past CfD auction capacity has repeatedly underdelivered against modelled build rates. Interconnector availability is partly outside UK control&mdash;French nuclear outages in 2022 demonstrated that import capacity on paper does not always translate to available supply in a crisis. Smart meter consumption data, which could transform the granularity of demand-side statistics, remains fragmented across suppliers and has not yet been integrated into published national energy statistics in a form useful for security analysis.</p>
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
