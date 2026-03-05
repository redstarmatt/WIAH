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

interface DentistryData {
  nhsDentists: Array<{ year: number; dentists: number }>;
  coursesTreatment: Array<{ year: number; courses: number }>;
  byRegion: Array<{ region: string; pctUnableAccess: number }>;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function NhsDentistryPage() {
  const [data, setData] = useState<DentistryData | null>(null);

  useEffect(() => {
    fetch('/data/nhs-dentistry/nhs_dentistry.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  // 1. NHS dentists time series
  const dentistsSeries: Series[] = data
    ? [
        {
          id: 'dentists',
          label: 'NHS dentists',
          colour: '#F4A261',
          data: data.nhsDentists.map(d => ({
            date: yearToDate(d.year),
            value: d.dentists,
          })),
        },
      ]
    : [];

  // 2. Courses of treatment time series
  const coursesSeries: Series[] = data
    ? [
        {
          id: 'courses',
          label: 'Courses of treatment',
          colour: '#F4A261',
          data: data.coursesTreatment.map(d => ({
            date: yearToDate(d.year),
            value: d.courses,
          })),
        },
      ]
    : [];

  // ── Annotations ──────────────────────────────────────────────────────────

  const dentistsAnnotations: Annotation[] = [
    {
      date: yearToDate(2020),
      label: 'COVID-19 closures',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <TopicNav topic="Health" />
      <SectionNav sections={[
        { id: 'sec-overview', label: 'Overview' },
        { id: 'sec-context', label: 'Context' },

        { id: 'sec-charts', label: 'Charts' },
        { id: 'sec-sources', label: 'Sources' },
      ]} />

      {/* ── Hero ──────────────────────────────────────────────────────────────────── */}

      <section id="sec-overview" className="bg-white px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <TopicHeader
            topic="Health"
            question="Can you still get an NHS dentist?"
            finding="NHS dental treatment has collapsed since the pandemic, with 42% of adults unable to access an NHS dentist and children&apos;s tooth extractions becoming the most common childhood hospital procedure."
          />
        </div>
      </section>

      {/* ── Metric cards ──────────────────────────────────────────────────────────── */}

      <section className="bg-white px-4 sm:px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Adults unable to get NHS dentist"
              value="42"
              unit="%"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 25% in 2019"
              sparklineData={[25, 28, 31, 35, 39, 41, 42]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Children&apos;s tooth extractions (hospital)"
              value="35,000"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Most common childhood hospital procedure"
              sparklineData={[18, 21, 24, 28, 31, 33, 35]}
              onExpand={() => {}}
            />
            <MetricCard
              label="NHS dentists (England)"
              value="24,200"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="Down 1,100 since 2019"
              sparklineData={[25.3, 22.1, 22.8, 23.4, 24.2]}
              onExpand={() => {}}
            />
          </div>
        </div>
      </section>

      {/* ── Charts ────────────────────────────────────────────────────────────────── */}

      <section id="sec-context" className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-base text-wiah-black leading-[1.7] space-y-4">
          <p>By 2023, 42% of adults in England could not get an NHS dentist appointment when they needed one &mdash; up from 25% in 2019 &mdash; and the number of NHS dentists has fallen by 1,100 since then. The structural driver is the UDA contract introduced in 2006, which pays the same for a check-up as for complex restorative treatment; as inflation eroded UDA values, NHS work became economically unviable for many practices. Children bear the sharpest consequences: 35,000 had teeth removed under general anaesthetic in hospital in 2022&ndash;23, making tooth extraction the most common childhood hospital procedure. The 2024 Dental Recovery Plan offered &pound;20 per additional UDA for new patients and by October 2024 had generated roughly 1.5 million additional appointments, but the British Dental Association argues full contract renegotiation is the only sustainable fix.</p>
          <p>The crisis compounds existing inequality. Children in the most deprived areas are three times more likely to need hospital extractions than those in the least deprived; rural dental deserts in Skegness, Scarborough, and Mevagissey leave patients travelling 30 or more miles for NHS care, or paying private fees starting at &pound;60 for a check-up. Five-year-olds in the North West have twice the rate of visible tooth decay as those in the South East. The workforce pipeline provides no short-term relief: dental schools produce roughly 1,200 graduates a year, around 40% of whom move directly into private or mixed practice.</p>
        </div>
      </section>

      {/* ── Positive callout ──────────────────────────────────────────────────────── */}

      <PositiveCallout
        title="NHS dentistry reform announced 2023"
        value=""
        description="NHS England announced a new dental recovery plan in February 2024, offering &pound;20 per additional course of treatment to incentivise dentists to take on more NHS patients. Early results suggest modest increases in patient numbers, but critics argue the underlying contract must be fundamentally renegotiated."
        source=""
      />

      {/* ── Sources ───────────────────────────────────────────────────────────────── */}

      <section id="sec-charts" className="bg-white px-4 sm:px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {data && (
            <>
              <ScrollReveal>
                <div className="h-72">
                  <LineChart
                    title="NHS dentists providing treatment, England"
                    subtitle="Number of dentists delivering NHS dental care in the financial year."
                    series={dentistsSeries}
                    annotations={dentistsAnnotations}
                    yLabel="Dentists"
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <div className="h-72">
                  <LineChart
                    title="NHS courses of dental treatment, England"
                    subtitle="Annual courses of treatment completed. Does not include private treatment."
                    series={coursesSeries}
                    yLabel="Courses (millions)"
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <div className="bg-white">
                  <h3 className="text-lg font-bold text-wiah-black mb-6">
                    Adults unable to access NHS dentist, by region
                  </h3>
                  <div className="space-y-3">
                    {data.byRegion.map((r) => (
                      <div key={r.region} className="flex items-center gap-4">
                        <div className="w-32 text-sm text-wiah-black font-medium">
                          {r.region}
                        </div>
                        <div className="flex-1 relative h-8 bg-wiah-light rounded">
                          <div
                            className="absolute top-0 left-0 h-full bg-wiah-amber rounded flex items-center justify-end pr-3"
                            style={{ width: `${r.pctUnableAccess}%` }}
                          >
                            <span className="text-xs font-mono text-white">
                              {r.pctUnableAccess}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </>
          )}
        </div>
      </section>

      {/* ── Context ───────────────────────────────────────────────────────────────── */}

      <section id="sec-sources" className="max-w-2xl mx-auto px-4 sm:px-6 py-12 border-t border-wiah-border">
        <h2 className="text-2xl font-bold text-wiah-black mb-6">Sources</h2>
        <div className="space-y-4 text-sm text-wiah-mid font-mono">
          <p>NHS England. Dental activity statistics. Retrieved March 2026.</p>
          <p>Oral Health Foundation &amp; British Dental Association. Adult Dental Health Survey. 2024.</p>
          <p>NHS Digital. Hospital Episode Statistics. Tooth extractions (procedure code). 2023.</p>
        </div>
      </section>
    </div>
  );
}
