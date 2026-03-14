'use client';

import { useState, useEffect } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

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

const editorialRefs: Reference[] = [
  { num: 1, name: 'MCS', dataset: 'Microgeneration Certification Scheme Statistics', url: 'https://mcscertified.com/mcs-data/', date: '2024' },
  { num: 2, name: 'DESNZ', dataset: 'Heat and Buildings Strategy', url: 'https://www.gov.uk/government/publications/heat-and-buildings-strategy', date: '2021' },
  { num: 3, name: 'EHPA', dataset: 'European Heat Pump Market Statistics', url: 'https://www.ehpa.org/market-data/', date: '2024' },
  { num: 4, name: 'DESNZ', dataset: 'Boiler Upgrade Scheme Statistics', url: 'https://www.gov.uk/government/statistics/boiler-upgrade-scheme-statistics', date: 'Q1 2024' },
  { num: 5, name: 'DESNZ', dataset: 'Heat Pump Installation Cost Survey', url: 'https://www.gov.uk/government/publications/heat-pump-installation-costs', date: '2023' },
  { num: 6, name: 'MCS', dataset: 'MCS Installer Register', url: 'https://mcscertified.com/', date: '2024' },
];

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
          finding="The UK installed just 72,000 heat pumps in 2023 — less than a third of its 600,000–per–year target for 2028. France installed 1.6 million in the same year. The UK's legacy of gas boilers, high installation costs, and poorly insulated homes has made the heat pump transition uniquely slow."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK is among the worst performers in Europe on heat pump adoption — a striking failure given that heating buildings accounts for around 17% of UK greenhouse gas emissions and the government has committed to phasing out new gas boiler installations by 2035.<Cite nums={2} /> Heat pumps work like refrigerators in reverse, extracting warmth from outside air or ground and delivering it as space heating at a coefficient of performance (COP) of typically 2.5 to 3.5 — meaning they produce two to three times more heat energy than the electricity they consume. A modern air source heat pump in a well-insulated UK home can reduce heating emissions by 70% or more compared to a gas boiler. Yet in 2023, the UK installed just 72,000 heat pumps — compared to 1.6 million in France, 600,000 in Germany, and over 3 million in Italy.<Cite nums={[1, 3]} /> The European Heat Pump Association recorded a 40% growth in European market sales in 2022, largely driven by energy price anxiety following Russia's invasion of Ukraine; UK growth was far more modest.<Cite nums={3} /> With 28 million gas boilers in UK homes, replacing them all with heat pumps at current rates would take over 350 years.<Cite nums={1} /></p>
            <p>The barriers to UK heat pump adoption are multiple and interconnected. Upfront cost is the most commonly cited: a typical UK air source heat pump installation costs £10,000 to £15,000, compared to £2,000 to £3,000 for a replacement gas boiler.<Cite nums={5} /> The Boiler Upgrade Scheme (BUS), launched in April 2022, offers a £7,500 grant toward heat pump installation — raised from £5,000 in October 2023.<Cite nums={4} /> Within six months of the grant increase, BUS applications doubled, demonstrating that cost is the primary barrier rather than lack of interest.<Cite nums={4} /> But £7,500 still leaves a significant cost gap compared to boiler replacement, particularly for households with older, poorly insulated properties where heat pump performance will be suboptimal. France's MaPrimeRenov scheme offers up to 90% of installation cost for the lowest-income households, reducing effective costs to £2,000 to £4,000 — a far more powerful demand signal.<Cite nums={3} /> UK heat pump installers are also in short supply: around 3,500 MCS-certified heat pump installers were active in 2023, compared to over 130,000 Gas Safe registered engineers.<Cite nums={6} /> Training new heat pump engineers takes 6 to 12 months, and the pipeline of trainees is not yet remotely sufficient to meet 600,000 annual installations.</p>
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
              changeText="Target: 600,000–per–year by 2028 — France installed 1.6M in 2023"
              sparklineData={[35000, 40000, 43000, 49000, 55000, 60000, 65000, 72000]}
              source="MCS — Microgeneration Certification Scheme statistics 2024"
              href="#sec-uk"
            />
            <MetricCard
              label="Government 2028 installation target"
              value="600,000"
              unit="/yr"
              direction="flat"
              polarity="up-is-good"
              changeText="Currently at 12% of target rate — requires 8&times; acceleration"
              sparklineData={[25000, 30000, 35000, 43000, 55000, 60000, 72000, 600000]}
              source="DESNZ — Heat and Buildings Strategy 2021"
              href="#sec-uk"
            />
            <MetricCard
              label="Average UK installation cost"
              value="£12,500"
              direction="down"
              polarity="up-is-bad"
              changeText="After £7,500 BUS grant: ~£5,000 — vs £2,500 for a gas boiler"
              sparklineData={[16000, 15500, 15000, 14500, 14000, 13500, 13000, 12500]}
              source="DESNZ — Heat pump installation cost survey 2023"
              href="#sec-uk"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-uk" className="mb-12">
            <LineChart
              title="Annual heat pump installations, UK, 2015–2023"
              subtitle="MCS-certified air and ground source heat pump installations per year. 600,000 target line for 2028. MCS / DESNZ."
              series={ukSeries}
              yLabel="Installations per year"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-comparison" className="mb-12">
            <LineChart
              title="Heat pump installations: UK vs France and Germany, 2015–2023"
              subtitle="Annual residential heat pump installations. France and Germany: EHPA national market surveys. UK: MCS data."
              series={comparisonSeries}
              yLabel="Installations per year"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Grant Doubled, Applications Doubled"
            value="£7,500"
            unit="Boiler Upgrade Scheme grant — applications doubled in 6 months"
            description="When the Boiler Upgrade Scheme grant was raised to £7,500 in October 2023, applications doubled within six months — demonstrating that subsidy level is the key barrier, not consumer indifference. Over 55,000 grants have been issued since the scheme launched. MCS-certified heat pump installers now number over 3,500 and training courses are filling rapidly. The Heat Pump Ready programme is testing innovative tariffs that make heat pump running costs competitive with gas."
            source="Source: DESNZ — Boiler Upgrade Scheme statistics Q1 2024; MCS installer register."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

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
                        <strong className="text-wiah-black">{src.name}:</strong> 
                        <a href={src.url} target="_blank" rel="noopener noreferrer" className="underline text-wiah-blue">
                          {src.dataset}
                        </a>
                         ({src.frequency})
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
              <RelatedTopics />
      </main>
    </>
  );
}
