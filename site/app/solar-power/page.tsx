'use client';

import { useState, useEffect } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

interface SolarData {
  national: {
    timeSeries: Array<{ date: string; capacityGW: number; generationPct: number }>;
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

function yearToDate(y: string): Date {
  return new Date(parseInt(y), 6, 1);
}

export default function SolarPowerPage() {
  const [data, setData] = useState<SolarData | null>(null);

  useEffect(() => {
    fetch('/data/solar-power/solar_power.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const capacitySeries: Series[] = data
    ? [{
        id: 'solar-capacity',
        label: 'Installed solar PV capacity',
        colour: '#F4A261',
        data: data.national.timeSeries.map(d => ({ date: yearToDate(d.date), value: d.capacityGW })),
      }]
    : [];

  const generationSeries: Series[] = data
    ? [{
        id: 'solar-generation',
        label: 'Solar share of annual electricity',
        colour: '#F4A261',
        data: data.national.timeSeries.map(d => ({ date: yearToDate(d.date), value: d.generationPct })),
      }]
    : [];

  return (
    <>
      <TopicNav topic="Solar Power" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Solar Power"
          question="How Far Has Britain&apos;s Solar Revolution Got?"
          finding="The UK now has 15.8 GW of installed solar &mdash; enough to power 5 million homes &mdash; but solar still generates only 5% of annual electricity. The technology is proven and the costs are at record lows, yet large-scale deployment faces persistent planning and grid connection barriers."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK&apos;s solar story is one of extraordinary early momentum followed by a slowdown in ambition. Between 2012 and 2016, the Feed-in Tariff scheme drove an installation boom, taking capacity from under 2 GW to over 11 GW in just four years &mdash; one of the fastest solar buildouts per capita in the world at the time. That growth was largely driven by rooftop domestic and commercial installations, with ground-mounted utility-scale farms concentrating in southern England, particularly the South West and South East. In 2016, the government sharply cut subsidies and effectively ended the Feed-in Tariff for large-scale solar, and annual capacity additions collapsed &mdash; dropping from around 3.5 GW in 2015 to under 0.5 GW in 2017 and 2018. The UK went from solar leader to solar laggard in a single policy cycle. Solar&apos;s share of annual electricity generation, averaging just 5%, understates its summer contribution: on long sunny days, solar can meet 30% or more of UK demand, and in summer 2024 solar generated more electricity than coal over the full season for the first time.</p>
            <p>Since 2019, subsidy-free solar has begun to recover, with solar farms now competitive at under &pound;40/MWh without government support &mdash; cheaper than gas peakers and comparable to onshore wind. The Contracts for Difference (CfD) auction mechanism, which replaced Feed-in Tariffs, has supported larger utility-scale farms through Allocation Rounds 4 and 5, awarding contracts for over 2 GW of new solar in 2023 alone. The government&apos;s British Energy Security Strategy (2022) set a target of 70 GW of solar by 2035, more than quadrupling current capacity. Reaching that target would require annual additions of around 5 GW per year &mdash; roughly three times the current deployment rate. The Solar Trade Association estimates that 250 to 400 km&sup2; of solar panels would be needed, equivalent to roughly 0.1% of UK land area. A key bottleneck is not land or technology but grid connection: National Grid Electricity System Operator has a queue of over 700 GW of generation projects awaiting connection, the majority of them solar, with wait times of 10 to 15 years in some areas.</p>
            <p>Planning policy has been a persistent constraint on large-scale ground-mounted solar. In England, solar farms above 50 MW require a Development Consent Order as a Nationally Significant Infrastructure Project, a process that takes on average three to four years. Below 50 MW, local planning authority decisions vary enormously, with some rural councils routinely refusing solar farms on agricultural land. In 2023, the government updated National Planning Policy Framework guidance to make clear that solar on lower-quality agricultural land should generally be approved, partially relaxing restrictions that had blocked projects on Grade 3b and Grade 4 land. Wales and Scotland have more permissive planning frameworks for solar. Rooftop solar on social housing and public buildings remains largely untapped: the National Audit Office estimated in 2023 that only 9% of suitable public sector roofs in England carry solar panels, representing a missed opportunity of around 3 GW of low-cost, non-contentious generation.</p>
            <p>The distribution of solar capacity across the UK is highly uneven. The South East and South West of England together account for over 40% of installed capacity, reflecting both better irradiation levels and historically faster deployment under the Feed-in Tariff. Scotland has around 3 GW, concentrated in central and southern Scotland where grid connections are easier. Northern Ireland has just 0.5 GW, reflecting smaller population and grid constraints. Within England, northern regions including Yorkshire, the North East, and the North West have substantially less solar per capita than the South, partly due to weather and partly due to planning and grid economics. The Solar Together group-purchasing scheme, offered by a growing number of local councils, has helped increase rooftop deployment in less affluent areas by reducing upfront costs. Community solar &mdash; where local residents invest in and share income from nearby solar farms &mdash; has grown to cover around 250 MW, providing both local economic benefit and increased public support for development.</p>
            <p>Solar statistics require careful interpretation. The &ldquo;enough to power X million homes&rdquo; framing, used widely including in official communications, is based on peak rated capacity output and does not account for the UK&apos;s average capacity factor of around 10% for solar (meaning actual output is typically a tenth of rated capacity averaged across the year). Annual electricity generation percentage &mdash; around 5% &mdash; is therefore the more accurate measure of solar&apos;s contribution to UK energy supply. The 70 GW by 2035 target is aspirational and not legally binding; the Sixth Carbon Budget pathway assumes 85 GW by 2035. Grid connection wait times are measured from application to connection offer, not to actual operation, and many projects in the queue will never be built. Embedded generation statistics &mdash; covering solar panels connected behind the meter rather than to the grid &mdash; are estimated using a modelling approach and carry significant uncertainty, particularly for commercial rooftop installations.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-capacity', label: 'Capacity' },
          { id: 'sec-generation', label: 'Generation' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Installed solar capacity"
              value="15.8"
              unit="GW"
              direction="up"
              polarity="up-is-good"
              changeText="Up from 0.07 GW in 2010 &mdash; target: 70 GW by 2035"
              sparklineData={[4.7, 6.2, 8.1, 10.4, 11.8, 13.0, 14.2, 15.8]}
              source="DESNZ &mdash; Solar photovoltaics deployment statistics"
              onExpand={() => {}}
            />
            <MetricCard
              label="Solar share of annual electricity"
              value="5"
              unit="%"
              direction="up"
              polarity="up-is-good"
              changeText="Rises to 30%+ on peak summer days; 5% annual average"
              sparklineData={[2, 2.5, 3, 3.8, 4.2, 4.6, 4.9, 5]}
              source="DESNZ &mdash; Energy Trends; National Grid ESO"
              onExpand={() => {}}
            />
            <MetricCard
              label="New solar added in 2023"
              value="1.8"
              unit="GW"
              direction="up"
              polarity="up-is-good"
              changeText="Target deployment rate: ~5 GW/yr to hit 70 GW by 2035"
              sparklineData={[3.5, 0.9, 0.5, 0.5, 0.6, 0.9, 1.2, 1.8]}
              source="DESNZ &mdash; Solar photovoltaics deployment 2024"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-capacity" className="mb-12">
            <LineChart
              title="Cumulative solar PV capacity, UK, 2010&ndash;2024"
              subtitle="Total operational installed capacity in gigawatts. DESNZ solar deployment statistics."
              series={capacitySeries}
              yLabel="GW installed"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-generation" className="mb-12">
            <LineChart
              title="Solar generation as share of UK electricity, 2010&ndash;2024"
              subtitle="Annual solar PV generation as a percentage of total UK electricity generation. DESNZ Energy Trends."
              series={generationSeries}
              yLabel="% of annual electricity"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="A Summer Milestone"
            value="First time"
            unit="solar beat coal over a full summer season"
            description="In summer 2024, solar generated more electricity than coal over the full season for the first time &mdash; a symbolic milestone for a country that powered the industrial revolution on coal. Battery costs have fallen 90% since 2010, making solar-plus-storage increasingly competitive. On peak days, solar met over a third of UK electricity demand. The Contracts for Difference scheme awarded over 2 GW of new solar contracts in 2023, signalling that subsidy-free large-scale solar is now the norm."
            source="Source: National Grid ESO &mdash; Historic generation mix data 2024; DESNZ energy statistics."
          />
        </ScrollReveal>

        <ScrollReveal>
          <section className="mt-8 pt-12 border-t border-wiah-border">
            <h2 className="font-sans text-2xl font-bold text-wiah-black mb-6">Sources &amp; Methodology</h2>
            {data && (
              <div className="font-sans text-sm space-y-6">
                <div>
                  <h3 className="font-bold text-wiah-black mb-2">Data sources</h3>
                  <ul className="space-y-2">
                    {data.metadata.sources.map((src, idx) => (
                      <li key={idx} className="text-wiah-mid">
                        <strong className="text-wiah-black">{src.name}:</strong>&nbsp;
                        <a href={src.url} target="_blank" rel="noopener noreferrer" className="underline text-wiah-blue">
                          {src.dataset}
                        </a>
                        &nbsp;({src.frequency})
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-wiah-black mb-2">Methodology</h3>
                  <p className="text-wiah-mid">{data.metadata.methodology}</p>
                </div>
                <div>
                  <h3 className="font-bold text-wiah-black mb-2">Known issues</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {data.metadata.knownIssues.map((issue, idx) => (
                      <li key={idx} className="text-wiah-mid">{issue}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </section>
        </ScrollReveal>
      </main>
    </>
  );
}
