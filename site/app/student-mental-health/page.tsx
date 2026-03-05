'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import PositiveCallout from '@/components/PositiveCallout';

// ── Types ────────────────────────────────────────────────────────────────────

interface StudentMentalHealthData {
  timeSeries: Array<{ date: string; mentalHealthDisclosurePct: number; counsellingDemandIndex: number }>;
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: string): Date {
  return new Date(parseInt(y), 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function StudentMentalHealthPage() {
  const [data, setData] = useState<StudentMentalHealthData | null>(null);

  useEffect(() => {
    fetch('/data/student-mental-health/student_mental_health.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const disclosureSeries: Series[] = data
    ? [
        {
          id: 'disclosure',
          label: 'Students disclosing a mental health condition (%)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.date), value: d.mentalHealthDisclosurePct })),
        },
      ]
    : [];

  const counsellingSeries: Series[] = data
    ? [
        {
          id: 'demand',
          label: 'Counselling demand index (2015 = 100)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.date), value: d.counsellingDemandIndex })),
        },
      ]
    : [];

  return (
    <>
      <TopicNav topic="Student Mental Health" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Student Mental Health"
          question="Is There a Student Mental Health Crisis?"
          finding="University counselling services are overwhelmed &mdash; demand has risen 50&percnt; in five years while funding has not kept pace &mdash; with 1 in 4 students reporting a mental health condition and 74 student deaths from suspected suicide recorded in 2021&ndash;22."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The number of students disclosing a mental health condition to their university has tripled in a decade &mdash; from 8&percnt; in 2015 to 25&percnt; in 2023, according to HESA data &mdash; driven by genuine rises in anxiety and depression among young people, reduced stigma, and the specific pressures of higher education: financial strain, housing insecurity, loneliness, and distance from family support. Research by Student Minds found 64&percnt; of students experience mental health difficulties at some point during their degree. University counselling demand rose 50&percnt; between 2018 and 2023 while staffing grew only 20&percnt;, leaving students with moderate anxiety or depression waiting eight to twelve weeks for an appointment. UMHAN recorded 74 suspected student suicides in 2021&ndash;22, with those from the most deprived backgrounds and those studying medicine or dentistry at significantly higher risk.
            </p>
            <p>
              The burden falls unevenly across the student population. First-generation students are more likely to experience difficulties and less likely to access support; students from Black and Asian backgrounds report lower satisfaction with university mental health services. International students &mdash; now around 20&percnt; of the UK student population &mdash; face compounding stressors including visa insecurity and cultural isolation, with limited NHS access in their first year. The sector employs a growing cohort of mental health advisers, but institutions compete on metrics that exclude wellbeing outcomes, creating weak structural incentives for the sustained investment that overwhelmed services need.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-disclosure', label: 'Disclosure Rates' },
          { id: 'sec-demand', label: 'Counselling Demand' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Students disclosing mental health condition"
              value="1 in 4"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 1 in 12 in 2015 &middot; 64&percnt; experience difficulties at some point"
              sparklineData={[8, 10, 13, 16, 19, 21, 23, 25]}
              source="HESA / Student Minds &middot; University Mental Health Survey 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="University counselling demand increase (2018&ndash;2023)"
              value="+50%"
              direction="up"
              polarity="up-is-bad"
              changeText="Demand up 50&percnt; &middot; Staffing grew only 20&percnt; &middot; Waits now 8&ndash;12 weeks"
              sparklineData={[100, 108, 118, 130, 138, 148, 150]}
              source="AMOSSHE &middot; University counselling demand analysis 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="Student suspected suicides (2021&ndash;22)"
              value="74"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from ~65 in 2018&ndash;19 &middot; Disproportionate among deprived and disabled students"
              sparklineData={[65, 67, 68, 70, 62, 72, 74]}
              source="UMHAN / Office for Students &middot; Student suicide data 2022"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-disclosure" className="mb-12">
            {disclosureSeries.length > 0 ? (
              <LineChart
                title="Students disclosing mental health conditions, UK universities, 2015&ndash;2024"
                subtitle="Percentage of students declaring a mental health condition to their university. Captures only disclosed cases &mdash; survey evidence suggests actual prevalence is 2&ndash;3&times; higher."
                series={disclosureSeries}
                yLabel="Students disclosing (%)"
                source={{
                  name: 'HESA / Student Minds',
                  dataset: 'Student record data &amp; University Mental Health Survey',
                  frequency: 'annual',
                  url: 'https://www.studentminds.org.uk/research.html',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-demand" className="mb-12">
            {counsellingSeries.length > 0 ? (
              <LineChart
                title="University counselling service demand index, 2015&ndash;2024"
                subtitle="Indexed to 2015 = 100. Based on AMOSSHE survey of counselling session requests across UK universities. Demand has risen 55&percnt; since 2015 while service capacity has grown by around 20&percnt;."
                series={counsellingSeries}
                yLabel="Demand index (2015 = 100)"
                source={{
                  name: 'AMOSSHE',
                  dataset: 'University counselling services demand analysis',
                  frequency: 'annual',
                  url: 'https://www.amosshe.org.uk/resources',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What is improving"
            value="130+"
            unit="universities signed up"
            description="Student Minds and the University Mental Health Charter have driven significant improvements in early intervention &mdash; 130&plus; universities have now signed up to the Charter&apos;s quality standards, and several have achieved Charter Award status. The Office for Students&apos; &pound;15m mental health programme (2022&ndash;25) is funding collaborative approaches across higher education institutions."
            source="Student Minds &middot; University Mental Health Charter 2024 &middot; Office for Students &middot; Mental health programme 2024"
          />
        </ScrollReveal>

        <section className="border-t border-wiah-border pt-8 mt-12">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; methodology</h2>
          <div className="text-sm text-wiah-mid space-y-2">
            {data?.metadata.sources.map((src, i) => (
              <p key={i}>
                <strong>{src.name}.</strong> <em>{src.dataset}</em>. {src.frequency} &mdash;&nbsp;
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="underline text-wiah-blue hover:no-underline">
                  {src.url}
                </a>
              </p>
            ))}
          </div>
          <p className="text-sm text-wiah-mid mt-6">{data?.metadata.methodology}</p>
          {data?.metadata.knownIssues && data.metadata.knownIssues.length > 0 && (
            <div className="mt-6 p-4 bg-wiah-light rounded">
              <p className="font-bold text-wiah-black mb-2">Known issues:</p>
              <ul className="text-sm text-wiah-mid space-y-1 list-disc list-inside">
                {data.metadata.knownIssues.map((issue, i) => (
                  <li key={i}>{issue}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
