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
  weeklyVisitPct: number;
  notVisitingPct: number;
  leastDeprivedAccessPct: number;
  mostDeprivedAccessPct: number;
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
    fetch('/data/nature-connection/nature_connection.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'weeklyVisitPct',
          label: 'Weekly nature visits (%)',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.weeklyVisitPct,
          })),
        },
        {
          id: 'notVisitingPct',
          label: 'Not visiting in past month (%)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.notVisitingPct,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'leastDeprivedAccessPct',
          label: 'Least deprived: access to quality green space (%)',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.leastDeprivedAccessPct,
          })),
        },
        {
          id: 'mostDeprivedAccessPct',
          label: 'Most deprived: access to quality green space (%)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.mostDeprivedAccessPct,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: COVID nature boom' },
    { date: new Date(2023, 5, 1), label: '2023: Green Social Prescribing pilots' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2019, 5, 1), label: '2019: Parks funding cuts peak' },
    { date: new Date(2023, 5, 1), label: '2023: Urban greening funding announced' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Nature Connection" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Wellbeing & Society"
          question="Are People Losing Touch with Nature?"
          finding="Only 57% of people in England visit green and blue spaces regularly, and nature connection scores are declining among urban children. Access to nature is deeply unequal: people in the most deprived areas are twice as likely to lack access to quality green space."
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
            label="Adults visiting green/blue space weekly"
            value="57%"
            unit=""
            direction="down"
            polarity="up-is-good"
            changeText="Down from 63% in 2019 pre-COVID · Urban-rural gap persists"
            sparklineData={[58, 59, 60, 62, 63, 61, 60, 58, 57, 57, 57]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Children's nature connection score"
            value="3.1"
            unit="/5"
            direction="down"
            polarity="up-is-good"
            changeText="Down from 3.6 in 2019 · Screen time displacement"
            sparklineData={[3.4, 3.5, 3.5, 3.6, 3.6, 3.4, 3.3, 3.2, 3.1, 3.1, 3.1]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Deprived areas: accessible green space"
            value="48%"
            unit=""
            direction="up"
            polarity="up-is-good"
            changeText="Up from 41% · But still well below 72% in affluent areas"
            sparklineData={[41, 42, 42, 43, 44, 44, 45, 46, 47, 48, 48]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Adults visiting natural spaces regularly, England, 2015–2025"
              subtitle="Percentage visiting green or blue (coastal/riverside) spaces at least once a week. From Natural England's People and Nature Survey."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Green space access by deprivation, England, 2015–2025"
              subtitle="Percentage of residents within 300m of a quality green space, by deprivation quintile. Deprived areas consistently have lower access."
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
            value="Green Social Prescribing"
            unit="NHS-backed programme"
            description="Green Social Prescribing pilots across 20 areas are connecting people to nature-based activities through GP referral, with strong mental health outcomes. Natural England's Green Infrastructure Standards require local authorities to plan for accessible green space. The ELMS scheme is paying farmers to create public access paths across 500,000+ hectares."
            source="Source: Natural England — People and Nature Survey, 2025. DLUHC — Green infrastructure standards, 2025."
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
