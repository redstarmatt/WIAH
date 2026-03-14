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
  { num: 1, name: 'Environment Agency', dataset: 'Water Quality Data Archive — River Classification', url: 'https://environment.data.gov.uk/water-quality/view/landing', date: '2024' },
  { num: 2, name: 'Eunomia / WWF', dataset: 'Plastic Pollution in UK Rivers', date: '2023', url: 'https://www.eunomia.co.uk/reports-tools/' },
  { num: 3, name: 'Defra', dataset: 'Storm Overflow Discharge Reduction Plan', url: 'https://www.gov.uk/government/publications/storm-overflows-discharge-reduction-plan', date: '2024' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface DataPoint {
  year: number;
  plasticTonnes: number;
  goodEcologicalStatus: number;
  goodChemicalPct: number;
  goodEcologicalPct: number;
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
    fetch('/data/plastic-pollution-rivers/plastic_pollution_rivers.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'plasticTonnes',
          label: 'Plastic entering rivers (000 tonnes)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.plasticTonnes,
          })),
        },
        {
          id: 'goodEcologicalStatus',
          label: 'Good ecological status (%)',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.goodEcologicalStatus,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'goodChemicalPct',
          label: 'Good chemical status (%)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.goodChemicalPct,
          })),
        },
        {
          id: 'goodEcologicalPct',
          label: 'Good ecological status (%)',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.goodEcologicalPct,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: Environmental Land Management: farm pollution payments' },
    { date: new Date(2023, 5, 1), label: '2023: Storm overflow duty on water companies' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2019, 5, 1), label: '2019: Water Framework Directive deadline missed for England' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Plastic in Rivers" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment & Climate"
          question="How Much Plastic Is Getting Into Britain's Rivers?"
          finding={<>An estimated 70,000 tonnes of plastic enters Britain's rivers each year.<Cite nums={2} /> Microplastics are found in every tested river, and just 14% of rivers have good ecological status.<Cite nums={1} /></>}
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
            label="Plastic entering rivers (est.)"
            value="70,000 tonnes"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Estimate rising as single-use plastic persists"
            sparklineData={[55000, 58000, 61000, 63000, 65000, 64000, 66000, 68000, 69000, 70000, 70000]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Rivers with good ecological status"
            value="14%"
            unit=""
            direction="flat"
            polarity="up-is-good"
            changeText={<>Target was 75% by 2027 · already missed<Cite nums={1} /></>}
            sparklineData={[17, 16, 16, 15, 15, 15, 14, 14, 14, 14, 14]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Microplastics in tested rivers"
            value="100%"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText={<>Every English river tested contains microplastics<Cite nums={2} /></>}
            sparklineData={[85, 88, 92, 95, 97, 99, 100, 100, 100, 100, 100]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Plastic pollution in UK rivers, 2015-2025"
              subtitle="Estimated tonnes of plastic entering UK rivers per year and percentage of rivers with good ecological status."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="River quality indicators, England, 2015-2025"
              subtitle="Chemical and ecological status of English rivers as percentage of classified water bodies."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Storm Overflow Discharge Reduction Plan agreed"
            value="2035"
            unit="target to eliminate serious harm from storm overflows"
            description={<>The Storm Overflow Discharge Reduction Plan requires water companies to eliminate all storm overflows causing serious environmental harm by 2035.<Cite nums={3} /> The Environment Act 2021 created statutory duties on water companies to reduce discharges. Ofwat fined water companies £2.3bn for pollution offences in 2023-24.</>}
            source="Source: DEFRA — Storm overflow discharge reduction plan, 2024."
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
