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

interface DataPoint {
  year: number;
    londonGVA: number;
    northEastGVA: number;
    londonPct: number;
    northEastPct: number;
}

interface TopicData {
  national: {
    timeSeries: DataPoint[];
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

const editorialRefs: Reference[] = [
  { num: 1, name: 'ONS', dataset: 'Regional Gross Value Added (balanced) per head', url: 'https://www.ons.gov.uk/economy/grossvalueaddedgva/bulletins/regionaleconomicactivitybygrossvalueaddedukbalanced/1998to2022', date: '2024' },
  { num: 2, name: 'DLUHC', dataset: 'Levelling Up White Paper', date: '2022' },
];

export default function RegionalGdpPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/regional-gdp/regional_gdp.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const series1: Series[] = data ? [
    {
      id: 'londonGVA',
      label: "London GVA per head (\u00a3)",
      colour: "#264653",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.londonGVA })),
    },
    {
      id: 'northEastGVA',
      label: "North East GVA per head (\u00a3)",
      colour: "#E63946",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.northEastGVA })),
    },
  ] : [];

  const series2: Series[] = data ? [
    {
      id: 'londonPct',
      label: "London (% of UK avg)",
      colour: "#264653",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.londonPct })),
    },
    {
      id: 'northEastPct',
      label: "North East (% of UK avg)",
      colour: "#E63946",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.northEastPct })),
    },
  ] : [];

  const annotations1: Annotation[] = [
    { date: new Date(2017, 0, 1), label: "2017: Northern Powerhouse launched" },
    { date: new Date(2022, 0, 1), label: "2022: Levelling Up White Paper" },
  ];

  const annotations2: Annotation[] = [
    { date: new Date(2020, 0, 1), label: "2020: Pandemic impacts regional economies differently" },
  ];

  return (
    <>
      <TopicNav topic="Regional GDP" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy & Work"
          question="Is the North-South Divide Getting Worse?"
          finding="London's GVA per head is 2.7\u00d7 the UK average and 2.7\u00d7 that of the North East \u2014 a gap that has widened steadily since 1998 despite decades of levelling-up commitments."
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              London's GVA per head is 2.7× the UK average and 2.7× that of the North East — a gap that has widened steadily since 1998 despite decades of levelling-up commitments.<Cite nums={1} /> The data below draws on official sources to show how this has changed over the past decade and where the pressures are most acute.
            </p>
            <p>
              The figures reflect a structural pattern rather than a short-term fluctuation.<Cite nums={[1, 2]} /> Understanding the scale of the issue is the first step toward holding policymakers to account for the decisions that shape these outcomes.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: "London GVA per head" },
          { id: 'sec-chart2', label: "London" },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="London GVA per head"
            value="\u00a358,700"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="+\u00a312,800 since 2015 \u00b7 2.7\u00d7 UK average"
            sparklineData={[45900,47200,48800,50100,51400,49800,52100,54200,56300,57500,58700]}
            href="#sec-chart1"
          />
          <MetricCard
            label="North East GVA per head"
            value="\u00a322,100"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText="+\u00a31,200 since 2015 \u00b7 49% below UK average"
            sparklineData={[20900,21100,21300,21500,21700,21400,21700,21800,21900,22000,22100]}
            href="#sec-chart2"
          />
          <MetricCard
            label="London/North East ratio"
            value="2.66\u00d7"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Was 2.2\u00d7 in 1998 \u00b7 widening gap"
            sparklineData={[2.2,2.24,2.29,2.33,2.37,2.33,2.4,2.48,2.57,2.61,2.66]}
            href="#sec-chart1"
          />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="GVA per head by region, England, 2015\u20132024"
              subtitle="Gross Value Added per head of population by English region. London's dominance has widened despite multiple levelling-up initiatives."
              series={series1}
              annotations={annotations1}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Regional GVA as % of UK average, 2015\u20132024"
              subtitle="GVA per head for each region expressed as percentage of the UK average. Values above 100 mean above-average productivity; below 100 means below."
              series={series2}
              annotations={annotations2}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Investment Zones launched"
            value="12"
            unit="Investment Zones announced 2023"
            description="The government launched 12 Investment Zones in 2023, targeting areas of England outside London and the South East with 5-year tax incentives and planning flexibilities. Early analysis shows \u00a33.4 billion in private sector commitments, concentrated in the Midlands Engine and North of England. The Manchester, West Yorkshire and South Yorkshire zones have attracted the largest pipeline."
            source="Source: DLUHC \u2014 Investment Zones progress report, 2024."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                  {src.name} — {src.dataset}
                </a>
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
              {data?.metadata.knownIssues.map((issue, i) => (
                <li key={i}>{issue}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
