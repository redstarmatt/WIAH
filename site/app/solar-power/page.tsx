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
          finding="The UK now has 15.8 GW of installed solar &mdash; enough to power 5 million homes &mdash; but solar still generates only 5&percnt; of annual electricity. The technology is proven and the costs are at record lows, yet large-scale deployment faces persistent planning and grid connection barriers."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The Feed-in Tariff drove one of the fastest solar buildouts per capita in the world between 2012 and 2016, taking UK capacity from under 2 GW to over 11 GW. Then in 2016 the government sharply cut subsidies and effectively ended the tariff for large-scale solar: annual additions collapsed from 3.5 GW in 2015 to under 0.5 GW in 2017&ndash;18. Since 2019, subsidy-free solar has recovered &mdash; solar farms now compete at under &pound;40/MWh without support, cheaper than gas peakers &mdash; and the Contracts for Difference mechanism awarded over 2 GW of new solar contracts in 2023. The British Energy Security Strategy (2022) set a 70 GW target by 2035, requiring annual additions of around 5 GW per year &mdash; roughly three times the current rate. A key bottleneck is not land or technology but grid connection: National Grid ESO has a queue of over 700 GW of projects awaiting connection, the majority solar, with wait times of 10&ndash;15 years in some areas. In summer 2024, solar generated more electricity than coal over the full season for the first time.</p>
            <p>Solar capacity is distributed unevenly. The South East and South West account for over 40&percnt; of installed capacity; Scotland has around 3 GW; Northern Ireland just 0.5 GW. Only 9&percnt; of suitable public sector roofs in England carry solar panels, representing a missed opportunity of around 3 GW of low-cost, non-contentious generation according to the National Audit Office. Planning constraints add further friction: solar farms above 50 MW require a Development Consent Order averaging three to four years to secure, and some rural councils routinely refuse farms on agricultural land. The 2023 NPPF update clarified that solar on lower-quality agricultural land should generally be approved, partially easing a restriction that had blocked multiple projects.</p>
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
              changeText="Rises to 30&percnt;+ on peak summer days; 5&percnt; annual average"
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
            description="In summer 2024, solar generated more electricity than coal over the full season for the first time &mdash; a symbolic milestone for a country that powered the industrial revolution on coal. Battery costs have fallen 90&percnt; since 2010, making solar-plus-storage increasingly competitive. On peak days, solar met over a third of UK electricity demand. The Contracts for Difference scheme awarded over 2 GW of new solar contracts in 2023, signalling that subsidy-free large-scale solar is now the norm."
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
