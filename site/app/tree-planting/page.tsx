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
  { num: 1, name: 'Forestry Commission', dataset: 'UK and England Woodland Statistics 2025', url: 'https://www.forestresearch.gov.uk/tools-and-resources/statistics/forestry-statistics/', date: '2025' },
  { num: 2, name: 'Climate Change Committee', dataset: 'Land Use Report — 30,000 ha/yr target', url: 'https://www.theccc.org.uk/publication/land-use-policies-for-a-net-zero-uk/', date: '2023' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface DataPoint {
  year: number;
  ukPlanted: number;
  englandPlanted: number;
  actualPlanted: number;
  cccTarget: number;
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

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function TopicPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/tree-planting/tree_planting.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'ukPlanted',
          label: 'UK total planted (ha)',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.ukPlanted,
          })),
        },
        {
          id: 'englandPlanted',
          label: 'England planted (ha)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.englandPlanted,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'actualPlanted',
          label: 'Actual (ha)',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.actualPlanted,
          })),
        },
        {
          id: 'cccTarget',
          label: 'CCC target (ha)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.cccTarget,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: England Trees Action Plan launched' },
    { date: new Date(2023, 5, 1), label: '2023: England England Woodland Creation Offer simplified' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2019, 5, 1), label: '2019: 25 Year Environment Plan sets 11% woodland cover target' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Tree Planting" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment & Climate"
          question="Is Britain Planting Enough Trees?"
          finding="The UK planted 13,700 hectares of trees in 2023-24 — less than half the 30,000 hectares per year the Climate Change Committee recommends to meet net zero targets."
          colour="#2A9D8F"
        />

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Chart 1' },
          { id: 'sec-chart2', label: 'Chart 2' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Trees planted 2023-24 (UK)"
            value="13,700 ha"
            unit=""
            direction="up"
            polarity="up-is-good"
            changeText="Up from 10,500 in 2021 · Scotland accounts for 70%"
            sparklineData={[8800, 9200, 9600, 10000, 10500, 10800, 10500, 12000, 13000, 13500, 13700]}
            href="#sec-coverage"
          />
          <MetricCard
            label="CCC recommended rate"
            value="30,000 ha"
            unit="/year"
            direction="flat"
            polarity="up-is-good"
            changeText="For net zero woodland cover · needs doubling"
            sparklineData={[30000, 30000, 30000, 30000, 30000, 30000, 30000, 30000, 30000, 30000, 30000]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Progress vs 30,000 ha target"
            value="46%"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Improving but well short of target · England biggest gap"
            sparklineData={[29, 31, 32, 33, 35, 36, 35, 40, 43, 45, 46]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK woodland creation (hectares planted), 2015-2025"
              subtitle="Annual woodland creation by nation vs Climate Change Committee recommended rate of 30,000 hectares per year."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Tree planting vs CCC pathway (ha), 2015-2025"
              subtitle="UK annual tree planting compared to the Climate Change Committee's recommended trajectory for net zero."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Scotland leading UK tree planting"
            value="9,600 ha"
            unit="Scotland planted in 2023-24"
            description="Scotland planted 9,600 hectares in 2023-24 — well ahead of its 18,000 ha/year target and the most of any UK nation. The Scottish Government's Woodland Creation Planning Grant and Forestry Grant Scheme provide strong support. Northern Ireland tripled planting rates since 2020."
            source="Source: Forestry Commission — UK and England woodland statistics, 2025."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        {/* Sources */}
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
