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
  totalBreaches: number;
  cyberBreaches: number;
  healthBreaches: number;
  financeBreaches: number;
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
    fetch('/data/data-breach-volume/data_breach_volume.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'totalBreaches',
          label: 'Total breaches reported',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.totalBreaches,
          })),
        },
        {
          id: 'cyberBreaches',
          label: 'Cyber attack breaches',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.cyberBreaches,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'healthBreaches',
          label: 'Health sector breaches',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.healthBreaches,
          })),
        },
        {
          id: 'financeBreaches',
          label: 'Finance sector breaches',
          colour: '#F4A261',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.financeBreaches,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2018, 5, 1), label: '2018: GDPR mandatory reporting begins' },
    { date: new Date(2020, 5, 1), label: '2020: COVID cyber attacks spike' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2018, 5, 1), label: '2018: GDPR in force' },
    { date: new Date(2023, 5, 1), label: '2023: NHS ransomware attacks' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Data Breaches" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Digital & Connectivity"
          question="How Often Is Your Personal Data Exposed?"
          finding="The ICO received over 3,500 data breach reports in 2024, a 63% increase since 2019. Health records, financial data and personal details are the most commonly breached categories, with cyber attacks now accounting for 39% of all breaches."
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
            label="Data breaches reported to ICO"
            value="3,520"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Up from 2,159 in 2019 · +63% in 5 years"
            sparklineData={[1100, 1400, 1800, 2159, 2400, 2750, 2900, 3100, 3250, 3400, 3520]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Cyber attacks as % of breaches"
            value="39%"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Up from 24% in 2019 · Phishing dominant vector"
            sparklineData={[24, 26, 28, 30, 32, 34, 35, 36, 37, 38, 39]}
            href="#sec-coverage"
          />
          <MetricCard
            label="ICO fines issued (£m)"
            value="£9.2M"
            unit=""
            direction="up"
            polarity="up-is-good"
            changeText="Enforcement increasing · Post-GDPR era"
            sparklineData={[1.2, 2.4, 4.8, 6.1, 7.2, 8.4, 9.0, 8.8, 9.1, 9.0, 9.2]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Data breaches reported to the ICO, by sector, UK, 2015–2025"
              subtitle="Number of personal data breach notifications received by the Information Commissioner's Office. Mandatory reporting under GDPR began in 2018."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Sectors with most data breaches, UK, 2015–2025"
              subtitle="Data breach reports by sector. Health and finance consistently report the highest volumes. Figures from ICO sector breakdown."
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
            value="GDPR"
            unit="Enforcement strengthening"
            description="The UK GDPR framework requires mandatory breach reporting within 72 hours, improving transparency. The ICO's proactive enforcement has resulted in fines against major organisations including British Airways (£20m) and Marriott (£18.4m). The National Cyber Security Centre's Active Cyber Defence programme blocks millions of malicious emails and domains monthly."
            source="Source: ICO — Data Security Incident Trends, 2025. NCSC — Annual Review, 2025."
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
