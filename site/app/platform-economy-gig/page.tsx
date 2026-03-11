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
  gigWorkersMillions: number;
  primaryIncomeMillions: number;
  sickPayPct: number;
  pensionPct: number;
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
    fetch('/data/platform-economy-gig/platform_economy_gig.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'gigWorkersMillions',
          label: 'Gig workers (millions)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.gigWorkersMillions,
          })),
        },
        {
          id: 'primaryIncomeMillions',
          label: 'Primary income from gig work (millions)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.primaryIncomeMillions,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'sickPayPct',
          label: 'With sick pay entitlement (%)',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.sickPayPct,
          })),
        },
        {
          id: 'pensionPct',
          label: 'With pension auto-enrolment (%)',
          colour: '#F4A261',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.pensionPct,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: COVID delivery surge' },
    { date: new Date(2021, 5, 1), label: '2021: Uber Supreme Court ruling' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: Uber worker status ruling' },
    { date: new Date(2023, 5, 1), label: '2023: Employment Rights Bill' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Gig Economy" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Digital & Connectivity"
          question="How Many People Work the Gig Economy — and What Does It Cost Them?"
          finding="Around 4.4 million UK workers are in the gig economy, up from 1.2 million in 2015. Most earn below the equivalent minimum wage when costs are factored in, and just 6% receive sick pay. The Supreme Court's Uber ruling changed employment status law but enforcement remains limited."
          colour="#264653"
        />

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Chart 1' },
          { id: 'sec-chart2', label: 'Chart 2' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Gig economy workers"
            value="4.4M"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Up from 1.2M in 2015 · 14% of workforce"
            sparklineData={[1.2, 1.5, 1.9, 2.4, 2.9, 3.5, 3.8, 4.0, 4.2, 4.3, 4.4]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Gig workers with sick pay entitlement"
            value="6%"
            unit=""
            direction="up"
            polarity="up-is-good"
            changeText="Up from 2% pre-Uber ruling · Still very low"
            sparklineData={[2, 2, 2, 3, 3, 3, 5, 5, 6, 6, 6]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Effective hourly rate vs minimum wage"
            value="-£1.20"
            unit="/hr"
            direction="down"
            polarity="up-is-good"
            changeText="After costs, most earn below NMW · Delivery worst hit"
            sparklineData={[-0.4, -0.5, -0.6, -0.7, -0.8, -0.9, -1.0, -1.1, -1.1, -1.2, -1.2]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Gig economy workforce, UK, 2015–2025"
              subtitle="Estimated number of workers earning income through platform-based gig work as a primary or secondary income. Includes ride-hailing, delivery, freelance platforms."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Gig worker employment conditions, UK, 2015–2025"
              subtitle="Percentage of gig workers with access to sick pay, holiday pay, and pension contributions. Conditions have improved marginally following court rulings."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="Worker status"
            unit="Supreme Court ruling enforced"
            description="The Supreme Court's 2021 ruling classifying Uber drivers as 'workers' rather than self-employed established a legal right to minimum wage, holiday pay and pension auto-enrolment. The Employment Rights Bill (2024) proposes extending these rights to more platform workers. HMRC enforcement of employment status has increased, with over £1 billion recovered from misclassification cases."
            source="Source: TUC — Living on the Margins, 2025. DWP — Labour market participation, 2025."
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
