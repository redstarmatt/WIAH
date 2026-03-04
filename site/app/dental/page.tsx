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

interface AccessPoint {
  year: string;
  adultPct: number;
  childPct: number;
}

interface CoursesPoint {
  year: string;
  coursesMillions: number;
}

interface DentistPoint {
  year: string;
  nhsDentists: number;
}

interface DentalData {
  topic: string;
  lastUpdated: string;
  national: {
    accessSummary: {
      patientsSeenPct: number;
      patientsSeenPctPre2020: number;
      adultsSeenPast2Years: number;
      childrenSeenPast1Year: number;
      latestYear: string;
    };
    accessTimeSeries: AccessPoint[];
    coursesTreatment: {
      timeSeries: CoursesPoint[];
    };
    dentistNumbers: {
      timeSeries: DentistPoint[];
    };
    extraction: {
      childrenExtractionsUnder18: number;
      childrenExtractionsYear: string;
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

function fyToDate(fy: string): Date {
  // "2017/18" → April 2017 (financial year start)
  const start = parseInt(fy.split('/')[0]);
  return new Date(start, 3, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function DentalPage() {
  const [data, setData] = useState<DentalData | null>(null);

  useEffect(() => {
    fetch('/data/dental/dental.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  // 1. Access: adult % and child % on same chart
  const accessSeries: Series[] = data
    ? [
        {
          id: 'adult-access',
          label: 'Adults seen by NHS dentist (%)',
          colour: '#E63946',
          data: data.national.accessTimeSeries.map(d => ({
            date: fyToDate(d.year),
            value: d.adultPct,
          })),
        },
        {
          id: 'child-access',
          label: 'Children seen by NHS dentist (%)',
          colour: '#2A9D8F',
          data: data.national.accessTimeSeries.map(d => ({
            date: fyToDate(d.year),
            value: d.childPct,
          })),
        },
      ]
    : [];

  const accessAnnotations: Annotation[] = data
    ? [
        {
          date: new Date(2020, 2, 1),
          label: '2020: COVID — services suspended',
        },
      ]
    : [];

  // 2. Courses of treatment
  const coursesSeries: Series[] = data
    ? [
        {
          id: 'courses',
          label: 'Courses of treatment (millions)',
          colour: '#264653',
          data: data.national.coursesTreatment.timeSeries.map(d => ({
            date: fyToDate(d.year),
            value: d.coursesMillions,
          })),
        },
      ]
    : [];

  // 3. Dentist count
  const dentistSeries: Series[] = data
    ? [
        {
          id: 'dentists',
          label: 'NHS dentists (count)',
          colour: '#F4A261',
          data: data.national.dentistNumbers.timeSeries.map(d => ({
            date: fyToDate(d.year),
            value: d.nhsDentists / 1000, // Scale to thousands for readability
          })),
        },
      ]
    : [];

  // ── Metrics ──────────────────────────────────────────────────────────────

  const adultAccessMetric = data && {
    label: 'Adults seen by NHS dentist',
    value: data.national.accessSummary.adultsSeenPast2Years.toFixed(1),
    unit: '%',
    direction: 'down' as const,
    polarity: 'up-is-good' as const,
    changeText: `Was ${data.national.accessSummary.patientsSeenPctPre2020.toFixed(1)}% pre-pandemic · Down ${(data.national.accessSummary.patientsSeenPctPre2020 - data.national.accessSummary.adultsSeenPast2Years).toFixed(1)}pp · ~8M fewer adults`,
  };

  const coursesMetric = data && {
    label: 'Courses of treatment',
    value: '33.6',
    unit: 'M/yr',
    direction: 'down' as const,
    polarity: 'up-is-good' as const,
    changeText: 'Was 37.3M in 2017/18 · 4M fewer treatments/yr',
  };

  const dentistMetric = data && {
    label: 'NHS dentists',
    value: '22,056',
    unit: '',
    direction: 'down' as const,
    polarity: 'up-is-good' as const,
    changeText: 'Down 1,800 since 2018 · Contract makes private pay more attractive',
  };

  return (
    <main>
      <TopicNav topic="Dental" />

      <TopicHeader
        topic="Dental"
        question="Can You Actually Get an NHS Dentist?"
        finding="NHS dentistry has effectively collapsed for millions. Nearly half of adults cannot access an NHS dentist, and the workforce continues to shrink as practitioners shift to private practice."
        colour="#E63946"
      />

      {/* Metrics row */}
      <section className="max-w-5xl mx-auto px-6 py-10 border-b border-wiah-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {adultAccessMetric && <MetricCard {...adultAccessMetric} />}
          {coursesMetric && <MetricCard {...coursesMetric} />}
          {dentistMetric && <MetricCard {...dentistMetric} />}
        </div>
      </section>

      {/* Chart 1: Access */}
      <ScrollReveal>
        <section className="max-w-4xl mx-auto px-6 py-12 border-b border-wiah-border">
          {data && accessSeries.length > 0 && (
            <LineChart
              title="Adults and children seen by NHS dentist, 2017–2025"
              subtitle="Percentage of population seen in relevant period. Collapsed during pandemic; still well below pre-2020 levels."
              series={accessSeries}
              annotations={accessAnnotations}
              yLabel="Percent"
              source={{
                name: 'NHS England',
                dataset: 'NHS Dental Statistics for England',
                url: 'https://digital.nhs.uk/data-and-information/publications/statistical/nhs-dental-statistics',
                frequency: 'annual',
              }}
            />
          )}
        </section>
      </ScrollReveal>

      {/* Chart 2: Courses */}
      <ScrollReveal>
        <section className="max-w-4xl mx-auto px-6 py-12 border-b border-wiah-border">
          {data && coursesSeries.length > 0 && (
            <LineChart
              title="NHS dental courses of treatment, millions, 2017–2025"
              subtitle="Each course covers one episode of care (e.g. a check-up, fillings, or extraction). 4 million fewer treatments per year than before the pandemic."
              series={coursesSeries}
              yLabel="Millions"
              source={{
                name: 'NHS England',
                dataset: 'NHS Dental Statistics for England',
                url: 'https://digital.nhs.uk/data-and-information/publications/statistical/nhs-dental-statistics',
                frequency: 'annual',
              }}
            />
          )}
        </section>
      </ScrollReveal>

      {/* Chart 3: Dentists */}
      <ScrollReveal>
        <section className="max-w-4xl mx-auto px-6 py-12 border-b border-wiah-border">
          {data && dentistSeries.length > 0 && (
            <LineChart
              title="NHS dentists working in England, 2017–2025"
              subtitle="Headcount of dentists with NHS contracts. Falling as practitioners shift to private practice due to NHS contract terms."
              series={dentistSeries}
              yLabel="Thousands"
              source={{
                name: 'NHS England',
                dataset: 'NHS Dental Statistics for England',
                url: 'https://digital.nhs.uk/data-and-information/publications/statistical/nhs-dental-statistics',
                frequency: 'annual',
              }}
            />
          )}
        </section>
      </ScrollReveal>

      {/* Positive callout */}
      <ScrollReveal>
        <PositiveCallout
          title="What&apos;s improving"
          value="65.2%"
          unit="of children seen by NHS dentist"
          description="Children&apos;s NHS dental access has recovered faster than adults — from a pandemic low of 42% in 2020/21 to 65.2% in 2024/25. Schools and community dental services have helped rebuild routine check-up habits for younger patients."
          source="Source: NHS England — NHS Dental Statistics 2024/25."
        />
      </ScrollReveal>

      {/* Editorial context */}
      <section className="max-w-3xl mx-auto px-6 py-12 border-b border-wiah-border text-wiah-black">
        <div className="prose prose-sm max-w-none space-y-6 text-base leading-relaxed">
          <p>
            Only 49.1% of adults in England saw an NHS dentist in the two years to March 2025, down from 57.3% before the pandemic &mdash; a gap equivalent to roughly 8 million people losing access to routine care. Children&apos;s access fell even harder during COVID, bottoming at 42% in 2020/21, though it has since recovered to 65.2%. The human cost of delayed treatment is measured in hospital theatres: 35,156 children underwent tooth extractions under general anaesthetic in 2022/23. Dental decay is the leading cause of hospital admission for children aged 5&ndash;9, and it is almost entirely preventable.
          </p>

          <p>
            The structural cause is the 2006 NHS dental contract, which pays by &ldquo;units of dental activity&rdquo; &mdash; each unit worth roughly &pound;28, whether the work is a simple filling or a complex crown. The incentive is to treat simple cases fast and avoid difficult ones entirely. Combined with years of below-inflation fee uplifts, the result has been predictable: 1,800 dentists have left NHS practice since 2018, leaving 22,056. The government&apos;s dental recovery plan, announced in February 2024 with &pound;200 incentive payments for returning practitioners, has not yet reversed the decline.
          </p>

          <p>
            Geography compounds the problem. Access rates range from 36% in the worst-served areas to 61% in the best, with rural and coastal communities hit hardest. Patients who cannot find an NHS dentist face a stark choice: pay privately (&pound;50&ndash;&pound;100 for a check-up, against &pound;26.80 on the NHS), travel long distances, or go without. Many choose the last option. When half a population cannot access a basic health service &mdash; one where early intervention is cheap and neglect is expensive &mdash; the cost falls not on dentists or contracts but on emergency wards and children under anaesthetic.
          </p>
        </div>
      </section>

      {/* Sources */}
      <section className="max-w-3xl mx-auto px-6 py-12 border-b border-wiah-border">
        <h2 className="text-lg font-bold mb-6">Sources & Methodology</h2>
        {data && (
          <div className="space-y-4">
            {data.metadata.sources.map((source, idx) => (
              <div key={idx} className="text-sm text-wiah-mid font-mono">
                <p className="font-semibold text-wiah-black mb-1">{source.name}</p>
                <p>{source.dataset}</p>
                <p>
                  <a href={source.url} className="text-wiah-blue hover:underline">
                    {source.url}
                  </a>
                </p>
                <p>Updated {source.frequency}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer nav */}
      <SectionNav sections={[
        { id: 'access', label: 'Access trends' },
        { id: 'treatments', label: 'Courses of treatment' },
        { id: 'workforce', label: 'Dentist numbers' },
      ]} />
    </main>
  );
}
