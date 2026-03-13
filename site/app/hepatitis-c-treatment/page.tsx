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
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

// ── Types ────────────────────────────────────────────────────────────────────

interface TreatmentStartPoint {
  year: number;
  count: number;
}

interface UndiagnosedPoint {
  year: number;
  count: number;
}

interface CureRatePoint {
  year: number;
  percent: number;
}

interface HepCData {
  treatmentStarts: TreatmentStartPoint[];
  undiagnosedEstimate: UndiagnosedPoint[];
  cureRate: CureRatePoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

const editorialRefs: Reference[] = [
  { num: 1, name: 'NHS England / UKHSA', dataset: 'Hepatitis C Elimination Programme', url: 'https://www.england.nhs.uk/publication/hepatitis-c-elimination/', date: 'Feb 2026' },
  { num: 2, name: 'NHS England', dataset: 'HCV Clinical Audit — SVR12 outcomes', url: 'https://www.england.nhs.uk/publication/hepatitis-c-elimination/', date: 'Feb 2026' },
  { num: 3, name: 'UKHSA', dataset: 'Hepatitis C in England and the UK', url: 'https://www.gov.uk/government/publications/hepatitis-c-in-the-uk', date: 'Feb 2026' },
  { num: 4, name: 'WHO', dataset: 'Global Health Sector Strategy on Viral Hepatitis', url: 'https://www.who.int/publications/i/item/9789241210003', date: '2024' },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function HepatitisCTreatmentPage() {
  const [data, setData] = useState<HepCData | null>(null);

  useEffect(() => {
    fetch('/data/hepatitis-c-treatment/hepatitis_c_treatment.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const treatmentSeries: Series[] = data
    ? [{
        id: 'treatment-starts',
        label: 'People starting HCV treatment',
        colour: '#2A9D8F',
        data: data.treatmentStarts.map(d => ({
          date: yearToDate(d.year),
          value: d.count,
        })),
      }]
    : [];

  const undiagnosedSeries: Series[] = data
    ? [{
        id: 'undiagnosed',
        label: 'Estimated undiagnosed cases',
        colour: '#E63946',
        data: data.undiagnosedEstimate.map(d => ({
          date: yearToDate(d.year),
          value: d.count,
        })),
      }]
    : [];

  const cureRateSeries: Series[] = data
    ? [{
        id: 'cure-rate',
        label: 'SVR12 cure rate (%)',
        colour: '#2A9D8F',
        data: data.cureRate.map(d => ({
          date: yearToDate(d.year),
          value: d.percent,
        })),
      }]
    : [];

  // ── Annotations ───────────────────────────────────────────────────────

  const treatmentAnnotations: Annotation[] = [
    { date: new Date(2015, 0, 1), label: '2015: DAA drugs available on NHS' },
    { date: new Date(2017, 0, 1), label: '2017: NHS elimination programme launches' },
    { date: new Date(2020, 0, 1), label: '2020: COVID disrupts testing' },
  ];

  const undiagnosedAnnotations: Annotation[] = [
    { date: new Date(2016, 0, 1), label: '2016: WHO elimination target set' },
    { date: new Date(2020, 0, 1), label: '2020: Testing & outreach paused' },
  ];

  const cureRateAnnotations: Annotation[] = [
    { date: new Date(2015, 0, 1), label: '2015: First pan-genotypic DAAs' },
    { date: new Date(2019, 0, 1), label: '2019: Second-gen DAAs standard' },
  ];

  // ── Derived values ────────────────────────────────────────────────────

  const latestTreatment = data?.treatmentStarts[data.treatmentStarts.length - 1];
  const peakTreatment = data?.treatmentStarts.reduce((a, b) => a.count > b.count ? a : b);
  const latestUndiagnosed = data?.undiagnosedEstimate[data.undiagnosedEstimate.length - 1];
  const firstUndiagnosed = data?.undiagnosedEstimate[0];
  const latestCure = data?.cureRate[data.cureRate.length - 1];

  const undiagnosedReduction = latestUndiagnosed && firstUndiagnosed
    ? Math.round(((firstUndiagnosed.count - latestUndiagnosed.count) / firstUndiagnosed.count) * 100)
    : 51;

  return (
    <>
      <TopicNav topic="Hepatitis C Treatment" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Hepatitis C Treatment"
          question="Has the NHS Eliminated Hepatitis C?"
          finding="The UK is on track to become one of the first countries to eliminate hepatitis C as a public health threat. Undiagnosed cases have fallen 51% since 2015, and direct-acting antivirals now cure 97% of patients treated. But tens of thousands remain undiagnosed, and the hardest-to-reach populations still lack adequate testing pathways."
          colour="#2A9D8F"
          preposition="with"
        />

        {/* Editorial context */}
        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              In 2015, the arrival of direct-acting antivirals on the NHS changed hepatitis C from a chronic, often fatal liver disease into something that could be cured in eight to twelve weeks with a short course of tablets. The transformation was extraordinary. Previous interferon-based treatments lasted up to a year, carried severe side effects, and cured barely half of patients. The new drugs achieve sustained virological response in 97% of cases.<Cite nums={2} /> The NHS launched a dedicated elimination programme in 2017, setting a target to eliminate hepatitis C as a major public health threat in England by 2025 — five years ahead of the World Health Organization's global goal of 2030.<Cite nums={[1, 4]} />
            </p>
            <p>
              The programme made rapid early progress. Treatment numbers surged to 21,800 in 2017 as the backlog of known patients was worked through.<Cite nums={1} /> Prisons became a key testing and treatment site, with opt-out testing identifying thousands of cases. Community pharmacies, drug treatment services, and mobile testing vans extended reach into marginalised populations where prevalence is highest — people who inject drugs, the homeless, and migrant communities with exposure in countries of high prevalence. Then COVID-19 struck. Testing services collapsed, outreach stopped, and treatment numbers fell to 10,000 in 2020.<Cite nums={1} /> The pipeline of newly diagnosed patients dried up. Two years of momentum were lost.
            </p>
            <p>
              Recovery has been slow but steady. Treatment starts have climbed back to an estimated 12,800 in 2025, and undiagnosed cases have continued to fall — now estimated at 78,000, down from 160,000 a decade ago.<Cite nums={[1, 3]} /> But the remaining undiagnosed population is disproportionately hard to reach. They are people not engaged with health services, not in prison, not attending drug treatment. Finding them requires sustained investment in community outreach, peer-led testing, and the kind of patient, relationship-based work that does not scale easily or cheaply. The UK's elimination ambition is real and achievable, but the final stretch is the hardest. The data shows a public health success story still being written — one that depends on whether the unglamorous work of finding the last 78,000 people continues to be funded.<Cite nums={3} />
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-treatment', label: 'Treatment starts' },
          { id: 'sec-undiagnosed', label: 'Undiagnosed cases' },
          { id: 'sec-cure', label: 'Cure rate' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="People starting HCV treatment (annual)"
            value={latestTreatment ? latestTreatment.count.toLocaleString() : '12,800'}
            unit="2025"
            direction="down"
            polarity="up-is-bad"
            changeText={
              latestTreatment && peakTreatment
                ? `down from ${peakTreatment.count.toLocaleString()} peak in ${peakTreatment.year} · recovering post-COVID`
                : 'down from 21,800 peak in 2017 · recovering post-COVID'
            }
            sparklineData={
              data ? sparkFrom(data.treatmentStarts.map(d => d.count)) : []
            }
            source="NHS England / UKHSA — Hepatitis C Elimination Programme, 2025"
            href="#sec-treatment"
          />
          <MetricCard
            label="Estimated undiagnosed HCV cases"
            value={latestUndiagnosed ? latestUndiagnosed.count.toLocaleString() : '78,000'}
            unit="2025"
            direction="down"
            polarity="up-is-bad"
            changeText={`down ${undiagnosedReduction}% from ${firstUndiagnosed ? firstUndiagnosed.count.toLocaleString() : '160,000'} in 2015`}
            sparklineData={
              data ? sparkFrom(data.undiagnosedEstimate.map(d => d.count)) : []
            }
            source="UKHSA — Hepatitis C in England, 2025"
            href="#sec-undiagnosed"
          />
          <MetricCard
            label="DAA cure rate (SVR12)"
            value={latestCure ? `${latestCure.percent}%` : '97%'}
            unit="2025"
            direction="up"
            polarity="up-is-good"
            changeText="up from 85% in 2015 · pan-genotypic DAAs now standard"
            sparklineData={
              data ? sparkFrom(data.cureRate.map(d => d.percent)) : []
            }
            source="NHS England — HCV Clinical Audit, 2025"
            href="#sec-cure"
          />
        </div>

        {/* Chart 1: Treatment starts */}
        <ScrollReveal>
          <div id="sec-treatment" className="mb-12">
            <LineChart
              series={treatmentSeries}
              annotations={treatmentAnnotations}
              title="People starting hepatitis C treatment per year, England, 2015-2025"
              subtitle="Annual count of patients commencing DAA therapy. Peak in 2017 as backlog cleared, then COVID disruption."
              yLabel="Treatment starts"
              source={{
                name: 'NHS England / UKHSA',
                dataset: 'Hepatitis C Elimination Programme',
                frequency: 'annual',
                url: 'https://www.england.nhs.uk/publication/hepatitis-c-elimination/',
                date: 'Feb 2026',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Undiagnosed estimates */}
        <ScrollReveal>
          <div id="sec-undiagnosed" className="mb-12">
            <LineChart
              series={undiagnosedSeries}
              annotations={undiagnosedAnnotations}
              title="Estimated undiagnosed hepatitis C cases, England, 2015-2025"
              subtitle="Modelled estimate of people living with HCV who have not been diagnosed. Down 51% in a decade."
              yLabel="Estimated cases"
              source={{
                name: 'UKHSA',
                dataset: 'Hepatitis C in England and the UK',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/publications/hepatitis-c-in-the-uk',
                date: 'Feb 2026',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Cure rate */}
        <ScrollReveal>
          <div id="sec-cure" className="mb-12">
            <LineChart
              series={cureRateSeries}
              annotations={cureRateAnnotations}
              title="DAA cure rate (sustained virological response at 12 weeks), 2015-2025"
              subtitle="Percentage of patients achieving SVR12 — effectively cured. Now 97% with pan-genotypic regimens."
              yLabel="Cure rate (%)"
              source={{
                name: 'NHS England',
                dataset: 'HCV Clinical Audit — SVR12 outcomes',
                frequency: 'annual',
                url: 'https://www.england.nhs.uk/publication/hepatitis-c-elimination/',
                date: 'Feb 2026',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="UK on track for WHO elimination target"
            value="51%"
            unit="reduction in undiagnosed cases"
            description="The UK is one of only a handful of countries on track to eliminate hepatitis C as a public health threat ahead of the WHO's 2030 deadline. Undiagnosed cases have fallen from 160,000 in 2015 to an estimated 78,000 in 2025 — a 51% reduction. The NHS elimination programme, launched in 2017, has treated over 100,000 people with direct-acting antivirals that cure 97% of patients in 8-12 weeks. Opt-out testing in prisons, community pharmacy programmes, and mobile outreach vans have been critical to reaching marginalised populations. The remaining challenge is finding the 78,000 people still undiagnosed — disproportionately people not engaged with mainstream health services."
            source="Source: UKHSA — Hepatitis C in England, 2025. NHS England — HCV Elimination Programme, 2025. WHO — Global Hepatitis Report, 2024."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        {/* Sources & Methodology */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p>
              <a href="https://www.gov.uk/government/publications/hepatitis-c-in-the-uk" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">UKHSA — Hepatitis C in England and the UK</a> — prevalence estimates and epidemiological modelling. Retrieved Feb 2026.
            </p>
            <p>
              <a href="https://www.england.nhs.uk/publication/hepatitis-c-elimination/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — Hepatitis C Elimination Programme</a> — treatment starts, SVR12 cure rates, and programme data. Retrieved Feb 2026.
            </p>
            <p>
              <a href="https://www.who.int/publications/i/item/9789241210003" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">WHO — Global Health Sector Strategy on Viral Hepatitis</a> — international elimination targets and benchmarks.
            </p>
            <p>
              Treatment starts are counted as people commencing direct-acting antiviral therapy in a calendar year. Undiagnosed estimates are modelled by UKHSA using prevalence surveys, treatment data, and mortality adjustments; they carry approximately &plusmn;15% uncertainty. Cure rate reflects sustained virological response at 12 weeks (SVR12) from NHS clinical audits. Pre-2017 treatment data includes some interferon-based regimens with lower cure rates. All figures are for England unless otherwise stated.
            </p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
