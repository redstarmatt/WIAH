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

interface ResponsePoint {
  year: number;
  urbanMeanMins: number;
  ruralMeanMins: number;
}

interface TargetPoint {
  year: number;
  targetAchievementPct: number;
}

interface AmbulanceRuralData {
  national: {
    responseByAreaType: {
      timeSeries: ResponsePoint[];
      latestYear: number;
    };
    cat1RuralTargetAchievement: {
      timeSeries: TargetPoint[];
      latestYear: number;
      latestPct: number;
      target: number;
    };
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

export default function AmbulanceRuralPage() {
  const [data, setData] = useState<AmbulanceRuralData | null>(null);

  useEffect(() => {
    fetch('/data/ambulance-rural-response/ambulance_rural.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const responseSeries: Series[] = data
    ? [
        {
          id: 'urban',
          label: 'Urban Cat 2 mean response (mins)',
          colour: '#264653',
          data: data.national.responseByAreaType.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.urbanMeanMins,
          })),
        },
        {
          id: 'rural',
          label: 'Rural Cat 2 mean response (mins)',
          colour: '#E63946',
          data: data.national.responseByAreaType.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.ruralMeanMins,
          })),
        },
      ]
    : [];

  const targetSeries: Series[] = data
    ? [
        {
          id: 'achievement',
          label: 'Rural Cat 1 target achievement (%)',
          colour: '#E63946',
          data: data.national.cat1RuralTargetAchievement.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.targetAchievementPct,
          })),
        },
      ]
    : [];

  const responseAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: COVID &mdash; reduced demand' },
    { date: new Date(2022, 5, 1), label: '2022: Winter crisis peak' },
  ];

  const targetAnnotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: Handover delays worsen' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Rural Ambulance Response" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health"
          question="Does Living in the Countryside Mean Waiting Longer for an Ambulance?"
          finding="Rural Category 2 ambulance response times average 45 minutes, more than double the 18-minute urban average. Rural patients wait up to 90 minutes in some areas."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Living in a rural area means waiting far longer for an ambulance. The Category 2 target &mdash; for emergencies like suspected stroke and heart attack &mdash; is an 18-minute mean response time. In rural areas of England, the actual mean is 45 minutes. The South Western Ambulance Service, covering Devon, Cornwall and rural Somerset, averages 48 minutes for rural Category 2 calls. A heart attack patient waiting 48 minutes has a dramatically worse prognosis than one reached in 18.
            </p>
            <p>
              The drivers are structural: sparsely distributed ambulance stations, long road distances, and a disproportionate impact from hospital handover delays at small rural hospitals. Community First Responder schemes &mdash; trained volunteers who can reach patients before an ambulance &mdash; fill some of the gap, but are not a substitute for professional paramedic response. Air ambulances carry critical patients from the most remote locations, but cover only a small fraction of Category 2 demand.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-response', label: 'Urban vs rural response' },
          { id: 'sec-target', label: 'Target achievement' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Rural Cat 2 mean response time"
              value="45 min"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="vs 22 min urban · 18-min target missed"
              sparklineData={[35, 36, 40, 45, 48, 45]}
              href="#sec-response"
            />
            <MetricCard
              label="Rural Cat 1 target achievement"
              value="63%"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="Target: 90% within 7 mins · Down from 74% in 2019"
              sparklineData={[74, 71, 65, 58, 60, 63]}
              href="#sec-response"
            />
            <MetricCard
              label="Longest rural trust Cat 2 average"
              value="48 min"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="South Western Ambulance Service · 2024"
              sparklineData={[38, 40, 43, 47, 50, 48]}
              href="#sec-response"
            />
          </div>
        </ScrollReveal>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-response" className="mb-12">
            <LineChart
              title="Category 2 ambulance mean response time by area type, England, 2019&ndash;2024"
              subtitle="Mean response time in minutes for Category 2 (serious emergency) calls. Urban patients benefit from nearby ambulance stations; rural patients face long road distances. The 18-minute national target is shown for reference."
              series={responseSeries}
              annotations={responseAnnotations}
              yLabel="Minutes"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-target" className="mb-12">
            <LineChart
              title="Rural Category 1 target achievement, England, 2019&ndash;2024"
              subtitle="Percentage of Category 1 (life-threatening) calls in rural areas reached within 7 minutes. National target is 90%. Rural achievement peaked at 74% in 2019 and has not recovered."
              series={targetSeries}
              annotations={targetAnnotations}
              yLabel="% within 7 minutes"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s improving"
            value="10,000+"
            unit="Community First Responders trained"
            description="Community First Responder schemes have trained over 10,000 volunteers to respond to cardiac arrests and life-threatening emergencies in rural areas before an ambulance arrives. Air ambulances provide critical cover for the most remote cases. The Ambulance Response Programme has introduced risk-based dispatch, improving Cat 1 outcomes even where Cat 2 response times remain long."
            source="Source: NHS England &mdash; Ambulance Quality Indicators, 2024. Association of Ambulance Chief Executives."
          />
        </ScrollReveal>

        {/* Sources */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                  {src.name} &mdash; {src.dataset}
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
