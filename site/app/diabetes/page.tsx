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
          question="Is Britain&apos;s Diabetes Epidemic Under Control?"
          finding="5.6 million people in the UK have diabetes &mdash; 4.4 million diagnosed, 1.2 million undiagnosed. Type 2 diabetes has tripled since the 1990s. The NHS spends &pound;10 billion a year on diabetes care &mdash; 10% of its total budget. But 1.2 million people are at high risk of developing Type 2 diabetes and are on the NHS Diabetes Prevention Programme."
          colour="#F4A261"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>4.3 million people in the UK have been diagnosed with diabetes, and an estimated 850,000 more have the condition but do not know it. Nine in ten cases are Type 2, driven predominantly by weight, inactivity, and metabolic risk. The NHS spends around &pound;10 billion a year on diabetes &mdash; roughly 10% of its entire budget &mdash; covering drugs, monitoring, consultations, and the treatment of complications that adequate management could have prevented. Those complications include 22,000 diabetes-related amputations every year and a leading claim on working-age blindness. The UK sits seventh in Europe for diabetes prevalence, a position that reflects both an ageing population and decades of rising obesity rates. The condition is not a background fact of modern life; it is a system under pressure that is failing to contain a preventable epidemic.</p>
            <p>Around 80% of the risk for Type 2 diabetes is attributable to being overweight or obese &mdash; but that figure does not tell the whole story. South Asian communities in the UK develop Type 2 at significantly lower BMI thresholds than the white population and on average a decade earlier, a difference with important implications for screening and prevention thresholds. Deprivation is a powerful independent predictor: people in the most deprived quintile are twice as likely to develop Type 2 diabetes as those in the least deprived. The NHS Diabetes Prevention Programme, which refers high-risk individuals to structured lifestyle interventions, now reaches around 200,000 people a year and its own evidence shows 37% of completers avoid progressing to a diagnosis. That is a substantial effect &mdash; but the programme currently reaches a fraction of those eligible, and referral rates vary widely by GP practice and region.</p>
            <p>Once diagnosed, the goal of diabetes management is keeping blood glucose within a target range to prevent complications. The standard measure is HbA1c, a marker of average blood sugar over roughly three months. Nationally, 68% of people with Type 2 diabetes meet their HbA1c target &mdash; which means nearly a third do not. But blood sugar control is only part of the picture. NHS England&apos;s &ldquo;care processes&rdquo; &mdash; eight checks including foot examination, retinal screening, and kidney function tests &mdash; are completed in full for only 39% of patients nationally, a figure that has not improved significantly in years. Diabetic ketoacidosis, a serious and potentially fatal complication, accounts for tens of thousands of emergency admissions annually, many of which are preventable with better day-to-day management and earlier intervention. Mental health comorbidity &mdash; depression and anxiety are significantly more prevalent in people with diabetes &mdash; is common and consistently under-treated.</p>
            <p>Type 1 diabetes affects around 400,000 people in the UK and is an autoimmune condition, not a lifestyle disease. It has nothing to do with weight or diet: the immune system destroys the pancreatic cells that produce insulin, and without continuous external insulin management it is fatal. Technology has transformed what good management looks like: continuous glucose monitors (CGMs) provide real-time blood sugar data, and hybrid closed-loop systems &mdash; which automatically adjust insulin delivery &mdash; are reducing HbA1c levels and time-in-hypoglycaemia in clinical trials. NICE has recommended these devices, and NHS England committed to making hybrid closed-loop systems available to all eligible Type 1 patients by 2025. Supply chain constraints, workforce capacity to train users, and variation in local commissioning mean the rollout is behind schedule. Access currently correlates with where someone lives and how assertively they can advocate for themselves.</p>
            <p>The National Diabetes Audit is one of the more comprehensive clinical audits in the NHS, but it does not cover all GP practices, and data completeness varies significantly by region &mdash; limiting confidence in local-level comparisons. Estimates of undiagnosed prevalence rely on modelling from survey data and risk-factor populations rather than direct population screening, meaning the 850,000 figure carries real uncertainty. Complications data &mdash; amputations, blindness, kidney failure attributable to diabetes &mdash; is collected inconsistently across primary and secondary care, making it difficult to track whether prevention efforts are producing measurable downstream reductions. Dietary and physical activity data, central to understanding Type 2 risk at a population level, relies on self-reported surveys that systematically underestimate food consumption and overestimate exercise, particularly in higher-weight populations. The audit is improving, but the picture it provides remains incomplete.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-prevalence', label: 'Prevalence' },
          { id: 'sec-prevention', label: 'Prevention' },
          { id: 'sec-complications', label: 'Complications' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="People with diagnosed diabetes"
              value="4.4M"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 &middot; Up from 1.4M in 1998 &middot; 1.2M estimated undiagnosed &middot; 5M at risk of Type 2 &middot; NHS cost: &pound;10bn/year"
              sparklineData={[1.4, 1.6, 1.8, 2.0, 2.3, 2.6, 2.9, 3.2, 3.5, 3.7, 3.9, 4.1, 4.3, 4.4]}
              onExpand={() => {}}
            />
            <MetricCard
              label="NHS Diabetes Prevention Programme enrolments"
              value="680K"
              direction="up"
              polarity="up-is-good"
              changeText="2023 cumulative &middot; Programme launched 2016 &middot; Targets high-risk prediabetes &middot; Reduces Type 2 onset by 37%"
              sparklineData={[10, 60, 150, 250, 310, 420, 550, 680]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Diabetes-related amputations (annual)"
              value="8,000"
              direction="down"
              polarity="up-is-bad"
              changeText="2023 &middot; Down from 10,000 in 2018 &middot; Still 20% higher than European average &middot; Preventable with good glucose control"
              sparklineData={[9800, 9500, 9200, 8800, 8500, 8200, 8000, 8000]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-prevalence" className="mb-12">
            <LineChart
              title="Diagnosed diabetes prevalence, 1998&ndash;2023"
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
              title="NHS Diabetes Prevention Programme enrolments, 2016&ndash;2023"
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
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: NHS England &mdash; National Diabetes Audit 2022/23</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s improving"
            value="680K"
            unit="people enrolled in the NHS Diabetes Prevention Programme since 2016"
            description="The NHS Diabetes Prevention Programme (NDPP) &mdash; the world&apos;s largest national diabetes prevention programme &mdash; has enrolled 680,000 high-risk individuals since its 2016 launch. NICE evidence shows the programme reduces Type 2 diabetes onset by 37% over two years. An estimated 5 million people in England are living with prediabetes (blood glucose above normal but below diagnostic threshold) &mdash; the programme targets this group. Diabetes-related amputations have fallen from 10,000 to 8,000 a year. The Libre flash glucose monitoring system has been made available to all Type 1 patients on the NHS, reducing HbA1c levels and emergency admissions."
            source="Source: Diabetes UK &mdash; Diabetes Statistics 2024; NHS England &mdash; National Diabetes Audit 2022/23."
          />
        </ScrollReveal>

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
