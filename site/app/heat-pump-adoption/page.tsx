'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'MCS', dataset: 'Heat Pump Installations Register', url: 'https://mcscertified.com/find-an-installer/', date: '2024' },
  { num: 2, name: 'CCC', dataset: 'Progress in Reducing Emissions — Buildings', url: 'https://www.theccc.org.uk/publication/progress-in-reducing-emissions/', date: '2024' },
  { num: 3, name: 'DESNZ', dataset: 'Boiler Upgrade Scheme Statistics', url: 'https://www.gov.uk/government/collections/boiler-upgrade-scheme-statistics', date: '2024' },
];

interface DataPoint {
  year: number;
  heatPumpInstallations: number;
  boilerUpgradeSchemeGrants: number;
  avgInstallCost: number;
  gasBoilerInstallations: number;
}

interface TopicData {
  national: { timeSeries: DataPoint[] };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

export default function HeatPumpAdoptionPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/heat-pump-adoption/heat_pump_adoption.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'heatPumpInstallations', label: 'Heat pump installations (thousands/yr)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.heatPumpInstallations })) },
        { id: 'gasBoilerInstallations', label: 'New gas boiler installations (thousands/yr)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.gasBoilerInstallations })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'boilerUpgradeSchemeGrants', label: 'Boiler Upgrade Scheme grants issued (thousands)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.boilerUpgradeSchemeGrants })) },
        { id: 'avgInstallCost', label: 'Average heat pump install cost (£thousands)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.avgInstallCost })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2022, 5, 1), label: 'Boiler Upgrade Scheme launched' },
    { date: new Date(2023, 5, 1), label: '2035 gas boiler ban confirmed' },
  ];

  return (
    <>
      <TopicNav topic="Energy & Housing" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Energy & Housing"
          question="Why Aren't More Homes Getting Heat Pumps?"
          finding={<>The UK installed around 75,000 heat pumps in 2023 — compared to 1.7 million gas boilers — against a government target of 600,000 annual heat pump installations by 2028.<Cite nums={1} /> Cost, installer shortages, and poor home energy efficiency are the primary barriers to the mass adoption needed to decarbonise home heating.<Cite nums={[2, 3]} /></>}
          colour="#264653"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Decarbonising home heating is one of the UK's most significant net zero challenges: 85% of UK homes use gas for heating, accounting for around 15% of national greenhouse gas emissions. Heat pumps — which extract warmth from outside air or the ground and can achieve three to four units of heat per unit of electricity consumed — are the leading technology for replacing gas boilers.<Cite nums={2} /> The UK installed approximately 75,000 heat pumps in 2023, up from around 30,000 in 2019, but this is far below the 600,000 per year the government has set as a 2028 target, and an order of magnitude below the scale needed to replace the 1.7 million gas boilers installed annually.</p>
            <p>The Boiler Upgrade Scheme, launched in 2022, offers grants of £7,500 for air source heat pumps and £7,500 for ground source, but uptake has been slow — fewer than 20,000 grants were redeemed in the first year.<Cite nums={3} /> The Climate Change Committee's progress reports consistently identify the same barriers: high upfront installation costs (typically £8,000–£15,000 even with the grant), an insufficient number of trained installers (the UK has around 3,500 heat pump certified engineers compared to 130,000 gas engineers), and concerns about whether UK homes — particularly older stock with poor insulation — will achieve equivalent comfort and running costs.<Cite nums={2} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-installations', label: 'Installation rates' },
          { id: 'sec-scheme', label: 'Grant scheme' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Heat pump installations (2023)" value="75" unit="thousand" direction="up" polarity="up-is-good" changeText={<>Up from 30k in 2019 — but target is 600k by 2028<Cite nums={1} /></>} sparklineData={[30, 35, 40, 45, 50, 55, 62, 68, 73, 74, 75]} href="#sec-installations" />
          <MetricCard label="New gas boiler installations (2023)" value="1,700" unit="thousand" direction="down" polarity="down-is-good" changeText={<>Still 23x more than heat pumps<Cite nums={1} /></>} sparklineData={[1900, 1880, 1860, 1840, 1820, 1800, 1790, 1780, 1760, 1730, 1700]} href="#sec-installations" />
          <MetricCard label="Average heat pump install cost" value="10" unit="£thousand" direction="down" polarity="down-is-good" changeText={<>Down from £13k in 2020; grants reduce to ~£2.5k<Cite nums={3} /></>} sparklineData={[13, 12.5, 12, 11.5, 11, 10.8, 10.5, 10.3, 10.2, 10.1, 10]} href="#sec-scheme" />
        </div>

        <ScrollReveal>
          <section id="sec-installations" className="mb-12">
            <LineChart title="Heat pump vs gas boiler installations, 2019–2024" subtitle="Annual heat pump (thousands) and new gas boiler installations (thousands), England." series={chart1Series} annotations={annotations} yLabel="Thousands" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-scheme" className="mb-12">
            <LineChart title="Boiler Upgrade Scheme grants and installation costs, 2022–2024" subtitle="Cumulative BUS grants issued (thousands) and average heat pump installation cost (£thousands), UK." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="2028 target" value="600k" unit="per year" description={<>The government's target of 600,000 heat pump installations per year by 2028 would require an eightfold increase from current rates — a transformation of the installer workforce, supply chains and consumer demand that experts describe as achievable but requiring urgent action on skills and grants.<Cite nums={2} /></>} source="Source: CCC, Buildings Progress Report 2024." />
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">{src.name} — {src.dataset}</a>
                <div className="text-xs text-wiah-mid">Updated {src.frequency}</div>
              </div>
            ))}
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Methodology</h3>
            <p>{data?.metadata.methodology}</p>
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Known issues</h3>
            <ul className="list-disc list-inside space-y-1">
              {data?.metadata.knownIssues.map((issue, i) => <li key={i}>{issue}</li>)}
            </ul>
          </div>
        </section>
        <References items={editorialRefs} />
      </main>
    </>
  );
}
