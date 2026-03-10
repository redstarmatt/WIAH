'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// ── Types ────────────────────────────────────────────────────────────────────

interface GLP1Point {
  year: number;
  prescriptionsThousands: number;
}

interface BariatricPoint {
  year: number;
  waitMonths: number;
}

interface ObesityPoint {
  year: number;
  percentAdults: number;
}

interface ObesityData {
  national: {
    glp1Prescriptions: {
      timeSeries: GLP1Point[];
      latestYear: number;
      latestThousands: number;
      note: string;
    };
    bariatricWaitTime: {
      timeSeries: BariatricPoint[];
      latestYear: number;
      latestMonths: number;
      note: string;
    };
    obesityPrevalence: {
      timeSeries: ObesityPoint[];
      latestYear: number;
      latestPercent: number;
      note: string;
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

export default function ObesityTreatmentPage() {
  const [data, setData] = useState<ObesityData | null>(null);

  useEffect(() => {
    fetch('/data/obesity-treatment-access/obesity_treatment.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const glp1Series: Series[] = data
    ? [{
        id: 'glp1',
        label: 'GLP-1 weight loss prescriptions (thousands)',
        colour: '#E63946',
        data: data.national.glp1Prescriptions.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.prescriptionsThousands,
        })),
      }]
    : [];

  const bariatricSeries: Series[] = data
    ? [{
        id: 'bariatric',
        label: 'Bariatric surgery wait time (months)',
        colour: '#E63946',
        data: data.national.bariatricWaitTime.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.waitMonths,
        })),
      },
      {
        id: 'obesity',
        label: 'Adult obesity prevalence (%)',
        colour: '#F4A261',
        data: data.national.obesityPrevalence.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.percentAdults,
        })),
      }]
    : [];

  const glp1Annotations: Annotation[] = [
    { date: new Date(2023, 5, 1), label: '2023: Wegovy licensed for weight loss on NHS' },
    { date: new Date(2024, 5, 1), label: '2024: Mounjaro approved — NHS rationing begins' },
  ];

  const bariatricAnnotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: COVID-19 theatre closures — surgery suspended' },
    { date: new Date(2024, 5, 1), label: '2024: GLP-1 drugs reduce surgical demand' },
  ];

  // ── Sparkline helpers ────────────────────────────────────────────────────

  const glp1Sparkline = data
    ? data.national.glp1Prescriptions.timeSeries.map(d => d.prescriptionsThousands)
    : [];
  const bariatricSparkline = data
    ? data.national.bariatricWaitTime.timeSeries.map(d => d.waitMonths)
    : [];
  const obesitySparkline = data
    ? data.national.obesityPrevalence.timeSeries.map(d => d.percentAdults)
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Obesity Treatment" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Obesity Treatment Access"
          question="Can the NHS Actually Treat Obesity?"
          finding="Weight loss drugs (GLP-1 agonists like Ozempic and Wegovy) are transforming obesity treatment but remain severely rationed. 860,000 people are eligible for Wegovy on the NHS but only 35,000 have received it. Bariatric surgery waiting times have tripled since 2018."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              GLP-1 receptor agonists — semaglutide (Wegovy, Ozempic) and tirzepatide (Mounjaro) — represent the most significant advance in obesity treatment in a generation. Clinical trials show average weight losses of 15–22%, comparable to bariatric surgery. NICE approved Wegovy for NHS use in 2023, estimating 860,000 people eligible under the criteria. By the end of 2025, approximately 35,000 had received a prescription — around 4% of those eligible. The NHS has implemented a strict tier system requiring patients to access specialist weight management services first, a bottleneck that has limited uptake to a fraction of potential beneficiaries.
            </p>
            <p>
              While GLP-1 drugs have begun reducing demand for bariatric surgery — referrals fell 18% in 2024 — those already waiting have faced dramatically longer delays. The average wait for bariatric surgery reached 30 months in 2024, up from 8 months in 2018. COVID-19 theatre closures created an initial backlog, but the structural underfunding of tier 3 and tier 4 obesity services has meant recovery has been slow. Adult obesity prevalence stands at 29.5%, the highest recorded. England has the third highest obesity rate in Europe. The economic cost to the NHS is estimated at £6.5 billion annually, rising to £9.7 billion by 2050 without intervention.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-drugs', label: 'GLP-1 Prescriptions' },
          { id: 'sec-surgery', label: 'Surgery Waits' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="NHS Wegovy prescriptions"
              value="35,000"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="vs 860,000 eligible · Strict rationing via tier system"
              sparklineData={glp1Sparkline}
              href="#sec-drugs"
            />
            <MetricCard
              label="Bariatric surgery wait time"
              value="30 months"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 8 months in 2018 · Drug success reducing surgery demand"
              sparklineData={bariatricSparkline}
              href="#sec-drugs"
            />
            <MetricCard
              label="Adult obesity prevalence"
              value="29.5%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 26.9% in 2015 · Highest rate on record"
              sparklineData={obesitySparkline}
              href="#sec-drugs"
            />
          </div>
        

        {/* Chart 1: GLP-1 prescriptions */}
        <ScrollReveal>
          <section id="sec-drugs" className="mb-12">
            <LineChart
              title="NHS GLP-1 weight loss drug prescriptions, 2022–2025"
              subtitle="Annual NHS prescriptions for GLP-1 receptor agonists (semaglutide, tirzepatide) licensed for weight management, England. Rapid growth from near-zero following 2023 NICE approval for Wegovy."
              series={glp1Series}
              annotations={glp1Annotations}
              yLabel="Prescriptions (thousands)"
            />
          </section>
        </ScrollReveal>

        {/* Chart 2: Bariatric wait + obesity prevalence */}
        <ScrollReveal>
          <section id="sec-surgery" className="mb-12">
            <LineChart
              title="Bariatric surgery wait time and adult obesity prevalence, 2015–2025"
              subtitle="Average wait from referral to bariatric surgery (months) alongside adult obesity prevalence (%), England. Surgery waits tripled as COVID-19 created a backlog in already underfunded services."
              series={bariatricSeries}
              annotations={bariatricAnnotations}
              yLabel="Months / Percent"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="2024"
            unit="Obesity Strategy"
            description="NHS England's Long Term Plan commits to expanding tier 3 specialist weight management services across all ICB areas. The government's 2024 Obesity Strategy targets reducing obesity prevalence by 2035 through a combination of GLP-1 drug access, reformulation of processed foods, and expanded physical activity programmes. NICE's 2025 technology appraisal pathway for Mounjaro will enable prescribing through primary care for the first time, removing the tier 3 bottleneck for many eligible patients."
            source="Source: NHS England Long Term Plan 2019, updated 2024 — Obesity chapter. NICE TA876 (semaglutide), TA1026 (tirzepatide)."
          />
        </ScrollReveal>

        {/* Sources */}
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
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
              <RelatedTopics />
      </main>
    </>
  );
}
