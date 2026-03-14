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
  { num: 1, name: 'Home Office', dataset: 'Irregular migration to the UK statistics', url: 'https://www.gov.uk/government/collections/irregular-migration-to-the-uk-statistics', date: 'Q3 2025' },
  { num: 2, name: 'Home Office', dataset: 'Immigration system statistics — asylum applications and decisions', url: 'https://www.gov.uk/government/statistical-data-sets/immigration-system-statistics-data-tables', date: 'Q3 2025' },
  { num: 3, name: 'UNHCR', dataset: 'UK asylum and refugee statistics', url: 'https://www.unhcr.org/uk/', date: '2025' },
];

interface DataPoint {
  year: number;
    crossings: number;
    cumulativeThousands: number;
    backlog: number;
    grantRate: number;
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

export default function SmallBoatsPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/small-boats/small_boats.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const series1: Series[] = data ? [
    {
      id: 'crossings',
      label: "Annual crossings detected",
      colour: "#E63946",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.crossings })),
    },
    {
      id: 'cumulativeThousands',
      label: "Cumulative total (thousands)",
      colour: "#6B7280",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.cumulativeThousands })),
    },
  ] : [];

  const series2: Series[] = data ? [
    {
      id: 'backlog',
      label: "Cases awaiting initial decision",
      colour: "#E63946",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.backlog })),
    },
    {
      id: 'grantRate',
      label: "Grant rate (%)",
      colour: "#2A9D8F",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.grantRate })),
    },
  ] : [];

  const annotations1: Annotation[] = [
    { date: new Date(2020, 0, 1), label: "2020: First large-scale crossings" },
    { date: new Date(2022, 0, 1), label: "2022: Rwanda policy announced" },
  ];

  const annotations2: Annotation[] = [
    { date: new Date(2023, 0, 1), label: "2023: Caseworker surge begins" },
    { date: new Date(2024, 0, 1), label: "2024: Rwanda policy scrapped" },
  ];

  return (
    <>
      <TopicNav topic="Small Boat Crossings" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Immigration & Population"
          question="How Many People Are Crossing the Channel in Small Boats?"
          finding="45,183 people made dangerous Channel crossings in small boats in the year to September 2025 \u2014 a 51% rise; more than 190,000 have crossed since 2018."
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              45,183 people made dangerous Channel crossings in small boats in the year to September 2025 — a 51% rise; more than 190,000 have crossed since 2018.<Cite nums={1} /> The data below draws on official sources to show how this has changed over the past decade and where the pressures are most acute.
            </p>
            <p>
              The figures reflect a structural pattern rather than a short-term fluctuation.<Cite nums={[1, 2]} /> Understanding the scale of the issue is the first step toward holding policymakers to account for the decisions that shape these outcomes.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: "Annual crossings det" },
          { id: 'sec-chart2', label: "Cases awaiting initi" },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Crossings YE Sep 2025"
            value="45,183"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="+51% year on year \u00b7 193,000+ total since 2018"
            sparklineData={[297,1843,8466,28526,45755,40885,29437,36816,45183,45183,45183]}
            href="#sec-chart1"
          />
          <MetricCard
            label="Deaths recorded in Channel"
            value="86"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Since 2018 \u00b7 many more unrecorded"
            sparklineData={[0,4,12,27,35,12,18,25,33,42,86]}
            href="#sec-chart2"
          />
          <MetricCard
            label="Awaiting asylum decision"
            value="48,700"
            unit=""
            direction="down"
            polarity="up-is-bad"
            changeText="Down from 134k peak \u00b7 still above target"
            sparklineData={[20000,24000,32000,48000,82000,134000,115000,92000,73000,60000,48700]}
            href="#sec-chart1"
          />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Small boat Channel crossings, 2018\u20132025"
              subtitle="Number of people detected crossing the English Channel in small boats. Data from Home Office irregular migration statistics."
              series={series1}
              annotations={annotations1}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Asylum backlog and decision outcomes, 2018\u20132025"
              subtitle="Pending initial decisions on asylum applications. Backlog peaked at 134,000 in mid-2023 and has since reduced through increased caseworker recruitment."
              series={series2}
              annotations={annotations2}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Asylum decision speed improving"
            value="18 months"
            unit="average wait down from 28 months"
            description="Average wait times for asylum decisions fell from a peak of 28 months in 2023 to 18 months by early 2026, following the recruitment of 2,500 additional caseworkers. The government cleared over 100,000 cases from the legacy backlog. Grant rates for Afghan and Syrian nationalities exceed 90%."
            source="Source: Home Office \u2014 Immigration system statistics, Q3 2025."
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
