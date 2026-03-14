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
  { num: 1, name: 'Defra', dataset: 'UK statistics on waste', url: 'https://www.gov.uk/government/statistics/uk-waste-data', date: '2025', note: 'Landfill share 5.5% in 2025, down from 80% in 2000' },
  { num: 2, name: 'Defra', dataset: 'Energy from Waste capacity statistics', url: 'https://www.gov.uk/government/statistics/energy-from-waste-statistics', date: '2025', note: 'EfW capacity 17.3 million tonnes/year' },
  { num: 3, name: 'Defra', dataset: 'Consistent Collection regulations', url: 'https://www.gov.uk/government/publications/consistency-in-household-and-business-recycling-in-england', date: '2025', note: 'Projected 4-6 percentage point increase in recycling rates from 2026' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface DataPoint {
  year: number;
  incinerationPct: number;
  recyclingPct: number;
  landfillPct: number;
  otherPct: number;
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
    fetch('/data/waste-flows/waste_flows.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'incinerationPct',
          label: 'Energy from waste (%)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.incinerationPct,
          })),
        },
        {
          id: 'recyclingPct',
          label: 'Recycling (%)',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.recyclingPct,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'landfillPct',
          label: 'Landfill share (%)',
          colour: '#F4A261',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.landfillPct,
          })),
        },
        {
          id: 'otherPct',
          label: 'Other treatment (%)',
          colour: '#6B7280',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.otherPct,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2017, 5, 1), label: '2017: Landfill Tax increased to £88/tonne' },
    { date: new Date(2021, 5, 1), label: '2021: Incineration overtakes recycling as main route' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2018, 5, 1), label: '2018: Landfill tax freeze removed' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Waste Flows" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment & Climate"
          question="Where Does Britain's Rubbish Actually Go?"
          finding={<>Landfill now accounts for just 5.5% of waste treatment, down from 80% in 2000.<Cite nums={1} /> Incineration handles 49%, but recycling stagnated while burning accelerated.<Cite nums={2} /></>}
          colour="#2A9D8F"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Britain has achieved one of Europe's fastest reductions in landfill, cutting the share of waste sent to tips from 80% in 2000 to just 5.5% today, driven by escalating landfill tax that now stands at over £100 per tonne.<Cite nums={1} /> But where the waste goes instead tells a more complicated story. Incineration, rebranded as energy-from-waste, now handles 49% of municipal waste, having doubled its share since 2014. The UK has built 17.3 million tonnes of annual incineration capacity, much of it locked in 25-year contracts with local authorities that guarantee minimum waste volumes.<Cite nums={2} /> These contracts create a perverse incentive: councils need to feed the incinerators, which works directly against efforts to reduce waste or increase recycling.</p>
            <p>Recycling, meanwhile, has stagnated at around 44% for a decade, well below the EU average of 48% and far short of the UK's own target of 65% by 2035. The plateau reflects inconsistent collection systems, with different councils accepting different materials, contamination rates that make some collected recyclables unprocessable, and the loss of export markets after China's 2018 ban on importing mixed recyclables. The Consistent Collection regulations taking effect from 2026 will mandate uniform kerbside collection of the same core materials across all English councils, which Defra projects will lift recycling rates by four to six percentage points. Whether that is sufficient to shift the balance back from burning to recycling remains to be seen.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Chart 1' },
          { id: 'sec-chart2', label: 'Chart 2' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Landfill share"
            value="5.5%"
            unit=""
            direction="down"
            polarity="up-is-good"
            changeText="Down from 80% in 2000 · nearly eliminated in England"
            sparklineData={[28, 24, 20, 17, 14, 11, 8.5, 7, 6.5, 6, 5.5]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Incineration/EfW share"
            value="49%"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Doubled since 2014 · now greater than landfill and recycling"
            sparklineData={[22, 24, 26, 28, 31, 34, 38, 42, 45, 47, 49]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Recycling share"
            value="43.8%"
            unit=""
            direction="flat"
            polarity="up-is-good"
            changeText="Stagnant for a decade · target 65% by 2035"
            sparklineData={[40, 41, 42, 43, 43, 43, 43, 44, 44, 44, 43.8]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="England waste treatment routes, 2015-2025"
              subtitle="Percentage of municipal waste sent to landfill, recycling and energy from waste (incineration)."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Landfill waste treated, England, 2015-2025"
              subtitle="Percentage of municipal waste sent to landfill. UK Landfill Directive targets drove the dramatic reduction from 2000 levels."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Landfill nearly eliminated"
            value="5.5%"
            unit="landfill share in 2025"
            description={<>England has reduced landfill from 80% of waste treatment in 2000 to 5.5% in 2025 — one of the fastest declines in Europe.<Cite nums={1} /> The UK will introduce a Consistent Collection service for all English councils from 2026, mandating collection of the same recyclables, which is projected to increase recycling rates by 4-6 percentage points.<Cite nums={3} /></>}
            source="Source: Defra — UK statistics on waste, 2025."
          />
        </ScrollReveal>

        <div className="mt-6"><References items={editorialRefs} /></div>

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
