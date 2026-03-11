'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface DataPoint {
  year: number;
  overallCompliance: number;
  cabinetOfficeCompliance: number;
  refusalRate: number;
  requestsReceived: number;
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
    fetch('/data/foi-response-times/foi_response_times.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'overallCompliance',
          label: 'Overall compliance (%)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.overallCompliance,
          })),
        },
        {
          id: 'cabinetOfficeCompliance',
          label: 'Cabinet Office compliance (%)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.cabinetOfficeCompliance,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'refusalRate',
          label: 'Refusal rate (%)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.refusalRate,
          })),
        },
        {
          id: 'requestsReceived',
          label: 'Requests received (000s)',
          colour: '#6B7280',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.requestsReceived,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Pandemic reduces capacity' },
    { date: new Date(2021, 5, 1), label: '2021: ICO issues practice recommendations to Cabinet Office' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2022, 5, 1), label: '2022: Record FOI requests received' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="FOI Response Times" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Democracy & Governance"
          question="Is Government Transparency Actually Working?"
          finding="Central government responded to only 37% of FOI requests within the statutory 20-working-day deadline in 2024. The Cabinet Office had the worst compliance at 18%."
          colour="#6B7280"
        />

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Chart 1' },
          { id: 'sec-chart2', label: 'Chart 2' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="FOI responses within 20-day deadline"
            value="37%"
            unit=""
            direction="down"
            polarity="up-is-bad"
            changeText="Down from 73% in 2015 · biggest government failure is resourcing"
            sparklineData={[73, 71, 68, 65, 62, 55, 50, 45, 42, 39, 37]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Cabinet Office compliance"
            value="18%"
            unit=""
            direction="down"
            polarity="up-is-bad"
            changeText="Worst of any central department · 82% miss deadline"
            sparklineData={[55, 52, 48, 44, 40, 35, 30, 27, 23, 20, 18]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Requests refused"
            value="38%"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Up from 28% in 2015 · public interest exemption overused"
            sparklineData={[28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="FOI request compliance rates, central government, 2015-2025"
              subtitle="Percentage of FOI requests responded to within statutory 20-working-day deadline."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="FOI refusal rates, central government, 2015-2025"
              subtitle="Percentage of FOI requests fully or partially refused. Refusal rates have risen despite ICO guidance."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="ICO enforcement powers being used more actively"
            value="£1.75m"
            unit="ICO fines and enforcement 2024"
            description="The Information Commissioner's Office issued £1.75m in fines and 34 enforcement notices to public authorities in 2024, the highest ever. The ICO's new transparency audit programme reviews major departments. Scotland's FOI system, with a 5% failure rate, demonstrates best practice."
            source="Source: ICO — Annual report and accounts, 2025."
          />
        </ScrollReveal>

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
