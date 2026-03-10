'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import PositiveCallout from '@/components/PositiveCallout';
import RelatedTopics from '@/components/RelatedTopics';

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
          finding="University counselling services are overwhelmed — demand has risen 50% in five years while funding has not kept pace — with 1 in 4 students reporting a mental health condition and 74 student deaths from suspected suicide recorded in 2021–22."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The number of students disclosing a mental health condition to their university has tripled in a decade — from 8% in 2015 to 25% in 2023, according to HESA student record data. This extraordinary rise has multiple drivers: genuine increases in the prevalence of mental health difficulties, particularly anxiety and depression among young people; greater awareness and reduced stigma making disclosure more likely; expanded university systems for capturing wellbeing information; and the specific strains of higher education itself — financial pressure, housing insecurity, academic competition, loneliness, and the transition away from family support. Research by Student Minds found that 64% of students experience mental health difficulties at some point during their degree, with first-year students and those from disadvantaged backgrounds most vulnerable.
            </p>
            <p>
              University counselling and mental health services are operating beyond capacity. The Association of Managers of Student Services in Higher Education (AMOSSHE) reported in 2023 that demand for counselling had risen 50% since 2018, while staffing had grown by only 20% and waiting lists had extended from days to weeks at many institutions. Students with acute needs — those in crisis or at immediate risk — are triaged to the front, but those with moderate anxiety or depression may wait eight to twelve weeks for an appointment, by which point their academic performance has often been significantly affected. The tension between the university as a pastoral institution and the university as a competitive business is stark: institutions compete on metrics that do not include mental health outcomes, creating weak incentives for the sustained investment the sector needs.
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
              changeText="Up from 1 in 12 in 2015 · 64% experience difficulties at some point"
              sparklineData={[8, 10, 13, 16, 19, 21, 23, 25]}
              source="HESA / Student Minds · University Mental Health Survey 2023"
              href="#sec-disclosure"
            />
            <MetricCard
              label="University counselling demand increase (2018–2023)"
              value="+50%"
              direction="up"
              polarity="up-is-bad"
              changeText="Demand up 50% · Staffing grew only 20% · Waits now 8–12 weeks"
              sparklineData={[100, 108, 118, 130, 138, 148, 150]}
              source="AMOSSHE · University counselling demand analysis 2023"
              href="#sec-disclosure"
            />
            <MetricCard
              label="Student suspected suicides (2021–22)"
              value="74"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from ~65 in 2018–19 · Disproportionate among deprived and disabled students"
              sparklineData={[65, 67, 68, 70, 62, 72, 74]}
              source="UMHAN / Office for Students · Student suicide data 2022"
              href="#sec-disclosure"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-disclosure" className="mb-12">
            {disclosureSeries.length > 0 ? (
              <LineChart
                title="Students disclosing mental health conditions, UK universities, 2015–2024"
                subtitle="Percentage of students declaring a mental health condition to their university. Captures only disclosed cases — survey evidence suggests actual prevalence is 2–3&times; higher."
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
                title="University counselling service demand index, 2015–2024"
                subtitle="Indexed to 2015 = 100. Based on AMOSSHE survey of counselling session requests across UK universities. Demand has risen 55% since 2015 while service capacity has grown by around 20%."
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
            description="Student Minds and the University Mental Health Charter have driven significant improvements in early intervention — 130&plus; universities have now signed up to the Charter's quality standards, and several have achieved Charter Award status. The Office for Students' £15m mental health programme (2022–25) is funding collaborative approaches across higher education institutions."
            source="Student Minds · University Mental Health Charter 2024 · Office for Students · Mental health programme 2024"
          />
        </ScrollReveal>

        <section className="border-t border-wiah-border pt-8 mt-12">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; methodology</h2>
          <div className="text-sm text-wiah-mid space-y-2">
            {data?.metadata.sources.map((src, i) => (
              <p key={i}>
                <strong>{src.name}.</strong> <em>{src.dataset}</em>. {src.frequency} — 
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
              <RelatedTopics />
      </main>
    </>
  );
}
