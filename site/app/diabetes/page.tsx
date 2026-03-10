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

interface DiabetesData {
  national: {
    prevalence: {
      timeSeries: Array<{ year: number; diagnosedMillions: number }>;
      latestYear: number;
      diagnosedMillions: number;
      undiagnosedMillions: number;
      atRiskMillions: number;
    };
    type1VsType2: Array<{ diabetesType: string; pct: number }>;
    complications: Array<{ complication: string; annualCases: number }>;
    preventionProgramme: {
      timeSeries: Array<{ year: number; enrolledThousands: number }>;
      latestYear: number;
      latestEnrolledThousands: number;
    };
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

// ── Component ────────────────────────────────────────────────────────────────

export default function DiabetesPage() {
  const [data, setData] = useState<DiabetesData | null>(null);

  useEffect(() => {
    fetch('/data/diabetes/diabetes.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // Derive series for prevalence chart
  const prevalenceSeries: Series[] = data
    ? [
        {
          id: 'diagnosed-diabetes',
          label: 'Diagnosed diabetes',
          colour: '#F4A261',
          data: data.national.prevalence.timeSeries.map(d => ({
            date: new Date(d.year, 0, 1),
            value: d.diagnosedMillions,
          })),
        },
      ]
    : [];

  const prevalenceAnnotations: Annotation[] = [
    {
      date: new Date(2012, 0, 1),
      label: '2012: NHS Prevention Programme planning',
    },
  ];

  // Derive series for prevention programme chart
  const preventionSeries: Series[] = data
    ? [
        {
          id: 'prevention-enrolments',
          label: 'NDPP enrolments',
          colour: '#2A9D8F',
          data: data.national.preventionProgramme.timeSeries.map(d => ({
            date: new Date(d.year, 0, 1),
            value: d.enrolledThousands,
          })),
        },
      ]
    : [];

  const preventionAnnotations: Annotation[] = [
    {
      date: new Date(2016, 0, 1),
      label: '2016: NDPP launches',
    },
  ];

  return (
    <>
      <TopicNav topic="Diabetes" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Diabetes"
          question="Is Britain's Diabetes Epidemic Under Control?"
          finding="5.6 million people in the UK have diabetes — 4.4 million diagnosed, 1.2 million undiagnosed. Type 2 diabetes has tripled since the 1990s. The NHS spends £10 billion a year on diabetes care — 10% of its total budget. But 1.2 million people are at high risk of developing Type 2 diabetes and are on the NHS Diabetes Prevention Programme."
          colour="#F4A261"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>4.3 million people in the UK have been diagnosed with diabetes, with an estimated 850,000 more undiagnosed; nine in ten cases are Type 2, driven predominantly by weight, inactivity, and metabolic risk. The NHS spends around £10 billion a year on diabetes — roughly 10% of its entire budget — including treatment of complications that adequate management could prevent: 8,000 diabetes-related amputations per year and a leading share of working-age blindness. Nationally, 68% of people with Type 2 diabetes meet their HbA1c target, but the eight annual care processes — foot examination, retinal screening, kidney function tests — are completed in full for only 39% of patients. The NHS Diabetes Prevention Programme now reaches around 200,000 high-risk people a year, with evidence that 37% of completers avoid progressing to diagnosis, though the programme reaches only a fraction of those eligible. NICE has recommended hybrid closed-loop insulin systems for all eligible Type 1 patients; the rollout is behind schedule due to supply chain and workforce constraints.</p>
            <p>Deprivation and ethnicity structure both risk and access. People in the most deprived quintile are twice as likely to develop Type 2 diabetes as those in the least deprived, while South Asian communities develop Type 2 at significantly lower BMI thresholds and a decade earlier on average — with important implications for screening thresholds that NHS policy has only partially addressed. Referral rates to prevention programmes vary widely by GP practice and region. Type 1 diabetes affects around 400,000 people and carries no lifestyle component, but access to the monitoring and insulin technology that transforms management outcomes correlates strongly with where someone lives and their ability to advocate for themselves within a system that allocates technology inconsistently.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-prevalence', label: 'Prevalence' },
          { id: 'sec-prevention', label: 'Prevention' },
          { id: 'sec-complications', label: 'Complications' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="People with diagnosed diabetes"
              value="4.4M"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 · Up from 1.4M in 1998 · 1.2M estimated undiagnosed · 5M at risk of Type 2 · NHS cost: £10bn/year"
              sparklineData={[1.4, 1.6, 1.8, 2.0, 2.3, 2.6, 2.9, 3.2, 3.5, 3.7, 3.9, 4.1, 4.3, 4.4]}
              href="#sec-prevalence"/>
            <MetricCard
              label="NHS Diabetes Prevention Programme enrolments"
              value="680K"
              direction="up"
              polarity="up-is-good"
              changeText="2023 cumulative · Programme launched 2016 · Targets high-risk prediabetes · Reduces Type 2 onset by 37%"
              sparklineData={[10, 60, 150, 250, 310, 420, 550, 680]}
              href="#sec-prevention"/>
            <MetricCard
              label="Diabetes-related amputations (annual)"
              value="8,000"
              direction="down"
              polarity="up-is-bad"
              changeText="2023 · Down from 10,000 in 2018 · Still 20% higher than European average · Preventable with good glucose control"
              sparklineData={[9800, 9500, 9200, 8800, 8500, 8200, 8000, 8000]}
              href="#sec-complications"/>
          </div>
        

        <ScrollReveal>
          <section id="sec-prevalence" className="mb-12">
            <LineChart
              title="Diagnosed diabetes prevalence, 1998–2023"
              subtitle="Registered Type 1 and Type 2 diabetes, England"
              series={prevalenceSeries}
              yLabel="Diagnosed diabetes (millions)"
              annotations={prevalenceAnnotations}
              source={{
                name: 'Diabetes UK',
                dataset: 'Diabetes Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-prevention" className="mb-12">
            <LineChart
              title="NHS Diabetes Prevention Programme enrolments, 2016–2023"
              subtitle="Cumulative people enrolled in the NDPP (England)"
              series={preventionSeries}
              yLabel="Enrolments (thousands)"
              annotations={preventionAnnotations}
              source={{
                name: 'NHS England',
                dataset: 'NHS Diabetes Prevention Programme statistics',
                frequency: 'quarterly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-complications" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">Annual diabetes-related complications, England</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Estimated annual cases of major complications attributable to diabetes.</p>
            {data && (
              <div className="space-y-3">
                {data.national.complications.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-40 text-sm text-wiah-black flex-shrink-0">{item.complication}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{ width: `${(item.annualCases / 24000) * 100}%`, backgroundColor: '#E63946' }}
                      />
                    </div>
                    <div className="w-20 text-right text-sm font-mono text-wiah-black">{item.annualCases.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: NHS England — National Diabetes Audit 2022/23</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="680K"
            unit="people enrolled in the NHS Diabetes Prevention Programme since 2016"
            description="The NHS Diabetes Prevention Programme (NDPP) — the world's largest national diabetes prevention programme — has enrolled 680,000 high-risk individuals since its 2016 launch. NICE evidence shows the programme reduces Type 2 diabetes onset by 37% over two years. An estimated 5 million people in England are living with prediabetes (blood glucose above normal but below diagnostic threshold) — the programme targets this group. Diabetes-related amputations have fallen from 10,000 to 8,000 a year. The Libre flash glucose monitoring system has been made available to all Type 1 patients on the NHS, reducing HbA1c levels and emergency admissions."
            source="Source: Diabetes UK — Diabetes Statistics 2024; NHS England — National Diabetes Audit 2022/23."
          />
        </ScrollReveal>

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
              <RelatedTopics />
      </main>
    </>
  );
}
