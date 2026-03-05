'use client';

import { useState, useEffect } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

interface HeatPumpsData {
  national: {
    timeSeries: Array<{ date: string; ukInstallations: number; franceInstallations: number; germanyInstallations: number }>;
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

export default function HeatPumpsPage() {
  const [data, setData] = useState<HeatPumpsData | null>(null);

  useEffect(() => {
    fetch('/data/heat-pumps/heat_pumps.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const ukSeries: Series[] = data
    ? [{
        id: 'uk-installations',
        label: 'UK annual heat pump installations',
        colour: '#2A9D8F',
        data: data.national.timeSeries.map(d => ({ date: yearToDate(d.date), value: d.ukInstallations })),
      }]
    : [];

  const comparisonSeries: Series[] = data
    ? [
        {
          id: 'uk',
          label: 'UK',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({ date: yearToDate(d.date), value: d.ukInstallations })),
        },
        {
          id: 'france',
          label: 'France',
          colour: '#F4A261',
          data: data.national.timeSeries.map(d => ({ date: yearToDate(d.date), value: d.franceInstallations })),
        },
        {
          id: 'germany',
          label: 'Germany',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({ date: yearToDate(d.date), value: d.germanyInstallations })),
        },
      ]
    : [];

  return (
    <>
      <TopicNav topic="Heat Pumps" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Heat Pumps"
          question="Why Is Britain So Far Behind on Heat Pumps?"
          finding="The UK installed just 72,000 heat pumps in 2023 &mdash; less than a third of its 600,000&ndash;per&ndash;year target for 2028. France installed 1.6 million in the same year. The UK&apos;s legacy of gas boilers, high installation costs, and poorly insulated homes has made the heat pump transition uniquely slow."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK installed just 72,000 heat pumps in 2023 &mdash; compared to 1.6 million in France and 600,000 in Germany &mdash; at a rate that would take over 350 years to replace the country&rsquo;s 28 million gas boilers. Heating accounts for around 17&percnt; of UK greenhouse gas emissions, and the government has committed to phasing out new gas boiler sales by 2035, making the gap between current performance and required trajectory severe. The Boiler Upgrade Scheme grant of &pound;7,500 (raised from &pound;5,000 in October 2023) has helped: applications doubled within six months of the increase, demonstrating that upfront cost &mdash; typically &pound;10,000&ndash;&pound;15,000 against &pound;2,500 for a boiler replacement &mdash; is the primary barrier. The electricity-to-gas price ratio of roughly 3.5&ndash;4:1, kept high by levies funding renewable obligations, structurally disadvantages heat pumps on running costs in poorly insulated properties compared to France and Germany where the ratio is lower.</p>
            <p>The benefits of the heat pump transition are accruing to the best-off households in the best-insulated homes. Detached rural properties &mdash; off-gas-grid, with higher-income occupants &mdash; account for a disproportionate share of installations. Only around 15&percnt; of UK homes have sufficient insulation for a heat pump to be installed without additional energy efficiency work. Urban flats and terraced houses, which make up the majority of the housing stock, present the hardest retrofit challenge: unit placement, lower heat demand per square metre, and multi-tenure management create barriers that individual grant schemes cannot resolve. The installer workforce &mdash; roughly 3,500 MCS-certified heat pump engineers against 130,000 Gas Safe registered engineers &mdash; is a bottleneck that training pipelines are not yet filling fast enough to meet any plausible 2028 target.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-uk', label: 'UK Installations' },
          { id: 'sec-comparison', label: 'UK vs Europe' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Heat pumps installed (2023)"
              value="72,000"
              direction="up"
              polarity="up-is-good"
              changeText="Target: 600,000&ndash;per&ndash;year by 2028 &mdash; France installed 1.6M in 2023"
              sparklineData={[35000, 40000, 43000, 49000, 55000, 60000, 65000, 72000]}
              source="MCS &mdash; Microgeneration Certification Scheme statistics 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Government 2028 installation target"
              value="600,000"
              unit="/yr"
              direction="flat"
              polarity="up-is-good"
              changeText="Currently at 12&percnt; of target rate &mdash; requires 8&times; acceleration"
              sparklineData={[25000, 30000, 35000, 43000, 55000, 60000, 72000, 600000]}
              source="DESNZ &mdash; Heat and Buildings Strategy 2021"
              onExpand={() => {}}
            />
            <MetricCard
              label="Average UK installation cost"
              value="&pound;12,500"
              direction="down"
              polarity="up-is-bad"
              changeText="After &pound;7,500 BUS grant: ~&pound;5,000 &mdash; vs &pound;2,500 for a gas boiler"
              sparklineData={[16000, 15500, 15000, 14500, 14000, 13500, 13000, 12500]}
              source="DESNZ &mdash; Heat pump installation cost survey 2023"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-uk" className="mb-12">
            <LineChart
              title="Annual heat pump installations, UK, 2015&ndash;2023"
              subtitle="MCS-certified air and ground source heat pump installations per year. 600,000 target line for 2028. MCS / DESNZ."
              series={ukSeries}
              yLabel="Installations per year"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-comparison" className="mb-12">
            <LineChart
              title="Heat pump installations: UK vs France and Germany, 2015&ndash;2023"
              subtitle="Annual residential heat pump installations. France and Germany: EHPA national market surveys. UK: MCS data."
              series={comparisonSeries}
              yLabel="Installations per year"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Grant Doubled, Applications Doubled"
            value="&pound;7,500"
            unit="Boiler Upgrade Scheme grant &mdash; applications doubled in 6 months"
            description="When the Boiler Upgrade Scheme grant was raised to &pound;7,500 in October 2023, applications doubled within six months &mdash; demonstrating that subsidy level is the key barrier, not consumer indifference. Over 55,000 grants have been issued since the scheme launched. MCS-certified heat pump installers now number over 3,500 and training courses are filling rapidly. The Heat Pump Ready programme is testing innovative tariffs that make heat pump running costs competitive with gas."
            source="Source: DESNZ &mdash; Boiler Upgrade Scheme statistics Q1 2024; MCS installer register."
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
