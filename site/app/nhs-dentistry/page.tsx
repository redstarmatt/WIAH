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
          <p>NHS dentistry in England has been in accelerating decline since the pandemic, but the pressures pre-date COVID-19 by years. In 2023, 42% of adults reported being unable to get an NHS dentist appointment when they needed one &mdash; up from roughly 25% in 2019. The consequences are not merely inconvenient. Tooth decay, untreated without access to routine care, has become the leading cause of hospital admissions for children aged 6 to 10 in England. In 2022&ndash;23, 35,000 children had teeth removed under general anaesthetic in hospital settings &mdash; a costly, avoidable intervention that carries real clinical risk. Oral disease that elsewhere would be caught and filled has instead progressed to extraction.</p>
          <p>The structural cause is a contract that has not worked since it was introduced in 2006. NHS dentists are paid per &ldquo;unit of dental activity&rdquo; (UDA) &mdash; a system that values a single filling identically to a full course of complex restorative treatment. As inflation has eroded the real value of UDA rates, many practices have concluded that NHS work no longer covers its costs. Between 2019 and 2023, 1,100 dentists stopped providing NHS services in England and moved to private practice, which can pay several times more for equivalent clinical time. The inequality this creates is severe: children in the most deprived areas of England are three times more likely to need teeth extracted than those in the least deprived, reflecting both dietary factors and a near-complete collapse of NHS dental access in some communities.</p>
          <p>The Government&apos;s 2024 Dental Recovery Plan, launched in February of that year, offered dentists &pound;20 per additional UDA for taking on new NHS patients. By October 2024, NHS England reported approximately 1.5 million additional appointments had been delivered under the scheme &mdash; a meaningful number, though modest against a backlog of millions. Critics, including the British Dental Association, argue the plan treats a symptom without addressing the disease: until the UDA contract is fundamentally renegotiated to reflect actual treatment costs, the financial incentive to leave NHS work will persist. A separate intervention &mdash; expanding fluoridation of public water supplies &mdash; is under active consideration following powers granted to the Secretary of State in the Health and Care Act 2022. Fluoridation reduces tooth decay by up to 28% in communities where it is applied, and would be among the most cost-effective public health measures available.</p>
          <p>The access crisis is sharpest in coastal and rural communities. Towns such as Skegness, Scarborough, and Mevagissey have effectively no NHS dental provision at all &mdash; patients must travel 30 miles or more, or pay private fees that start at &pound;60 for a check-up. Within cities the picture is little better in deprived wards: in parts of Bradford, Oldham, and Tower Hamlets, the ratio of NHS dentists to population is less than half the national average. Children bear the consequences most visibly. Five-year-olds in the North West have twice the rate of visible tooth decay as those in the South East, and children eligible for free school meals are three times more likely to undergo hospital extraction. The workforce pipeline is part of the problem: dental schools produce roughly 1,200 graduates per year in England, but around 40% move directly into private or mixed practice. Overseas-qualified dentists, who fill roughly a quarter of NHS vacancies, face a registration process through the GDC that can take 12&ndash;18 months.</p>
          <p>NHS dental statistics are among the weakest in the English health system. NHS Business Services Authority publishes activity data based on claims submitted by dental practices, but this captures only NHS-funded treatment &mdash; the growing private market is invisible. There is no national register of practising NHS dentists; the commonly cited figure of 24,200 counts unique performer numbers submitting claims, not headcount or full-time equivalents. A dentist delivering one NHS course of treatment per month is counted identically to one working five NHS days per week. Patient experience data comes primarily from the GP Patient Survey, which includes a handful of dental questions but is not designed to measure dental access comprehensively. The absence of a dedicated NHS dental patient survey means regional variation is poorly quantified. Oral health data for children relies on periodic PHE epidemiological surveys conducted roughly every three years, with the most recent full survey disrupted by the pandemic. Hospital extraction figures from Hospital Episode Statistics capture the sharp end of failure but reveal nothing about the uncounted millions who simply go without routine care.</p>
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
