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
  { num: 1, name: 'Environment Agency', dataset: 'Remaining Landfill Capacity — England', url: 'https://www.gov.uk/government/statistical-data-sets/env23-uk-waste-data-and-management', date: '2024' },
  { num: 2, name: 'Defra', dataset: 'Resources and Waste Strategy 2024 Update', url: 'https://www.gov.uk/government/publications/resources-and-waste-strategy-for-england', date: '2024' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface DataPoint {
  year: number;
  remainingCapacity: number;
  yearsRemaining: number;
  countiesWithNoLandfill: number;
  avgWasteTransportKm: number;
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
    fetch('/data/landfill-capacity/landfill_capacity.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'remainingCapacity',
          label: 'Remaining capacity (million tonnes)',
          colour: '#F4A261',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.remainingCapacity,
          })),
        },
        {
          id: 'yearsRemaining',
          label: 'Years of capacity remaining',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.yearsRemaining,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'countiesWithNoLandfill',
          label: 'Counties with no landfill',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.countiesWithNoLandfill,
          })),
        },
        {
          id: 'avgWasteTransportKm',
          label: 'Avg waste transport distance (km)',
          colour: '#F4A261',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.avgWasteTransportKm,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2018, 5, 1), label: '2018: Last major new landfill planning permission' },
    { date: new Date(2022, 5, 1), label: '2022: EfW substituting for landfill' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Last Kent landfill closes' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Landfill Capacity" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment & Climate"
          question="Is Britain Running Out of Landfill Space?"
          finding="At current rates, England's landfill capacity could be exhausted within 10-15 years in some regions. Five counties already have no operational landfill capacity."
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
            label="Estimated remaining capacity"
            value="300m tonnes"
            unit=""
            direction="down"
            polarity="up-is-bad"
            changeText="England estimate · declining 20m tonnes/yr"
            sparklineData={[500, 480, 460, 440, 420, 400, 380, 360, 340, 320, 300]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Counties with no active landfill"
            value="5"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Up from 1 in 2015 · forcing long-distance transport"
            sparklineData={[1, 1, 2, 2, 2, 3, 3, 4, 5, 5, 5]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Years of capacity at current rates"
            value="12"
            unit=""
            direction="down"
            polarity="up-is-bad"
            changeText="England estimate · varies significantly by region"
            sparklineData={[30, 28, 26, 24, 22, 20, 18, 16, 15, 14, 12]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Estimated remaining England landfill capacity, 2015-2025"
              subtitle="Projected remaining permitted landfill capacity in England (million tonnes). Capacity is finite and declining as sites fill and new planning permissions become rare."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Counties without operational landfill, England, 2015-2025"
              subtitle="Number of English counties with no operational non-hazardous landfill site. Waste from these counties travels 100+ miles."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Landfill tax making alternatives competitive"
            value="£102.10/tonne"
            unit="landfill tax rate 2025-26"
            description="The landfill tax of £102.10 per tonne makes recycling and energy recovery economically preferable to landfill for most waste streams. The Resources and Waste Strategy commits to keeping landfill tax above gate fees for energy from waste, maintaining a clear economic signal to reduce landfill use."
            source="Source: Defra — Resources and Waste Strategy, 2024 update."
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
