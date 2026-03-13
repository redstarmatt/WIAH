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

const editorialRefs: Reference[] = [
  { num: 1, name: 'HM Inspectorate of Prisons', dataset: 'Annual Report — Healthcare Ratings', url: 'https://www.justiceinspectorates.gov.uk/hmiprisons/inspections/', date: 'Nov 2024', note: 'A third of prisons rated poor/inadequate for healthcare; proportion nearly doubled over past decade' },
  { num: 2, name: 'Ministry of Justice', dataset: 'Safety in Custody Statistics — Self-harm', url: 'https://www.gov.uk/government/statistics/safety-in-custody-quarterly-update-to-june-2024', date: 'Q2 2024', note: 'Self-harm rose from 298 to 641 per 1,000 prisoners (2015-2024); 115% increase' },
  { num: 3, name: 'HMIP / NHS England', dataset: 'Mental Health Prevalence Estimates; Health & Justice Workforce Data', url: 'https://www.justiceinspectorates.gov.uk/hmiprisons/our-work/annual-report/', date: 'Nov 2024', note: '70% of prisoners have diagnosable mental illness; primary care vacancy rate 37%' },
  { num: 4, name: 'NHS England', dataset: 'Liaison and Diversion Programme', url: 'https://www.england.nhs.uk/commissioning/health-just/', date: '2023', note: '100% national coverage achieved in 2023; screens ~130,000 people per year' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface HealthcareRatingPoint {
  year: number;
  poorOrInadequatePct: number;
}

interface SelfHarmPoint {
  year: number;
  incidentsPer1000: number;
}

interface MentalHealthPoint {
  year: number;
  estimatedPct: number;
}

interface GpVacancyPoint {
  year: number;
  vacancyPct: number;
}

interface PrisonHealthcareData {
  healthcareRatings: HealthcareRatingPoint[];
  selfHarm: SelfHarmPoint[];
  mentalHealthPrevalence: MentalHealthPoint[];
  gpVacancyRate: GpVacancyPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function PrisonHealthcarePage() {
  const [data, setData] = useState<PrisonHealthcareData | null>(null);

  useEffect(() => {
    fetch('/data/prison-healthcare/prison_healthcare.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const healthcareRatingSeries: Series[] = data
    ? [{
        id: 'healthcare-ratings',
        label: 'Prisons rated poor/inadequate for healthcare (%)',
        colour: '#E63946',
        data: data.healthcareRatings.map(d => ({
          date: yearToDate(d.year),
          value: d.poorOrInadequatePct,
        })),
      }]
    : [];

  const selfHarmSeries: Series[] = data
    ? [{
        id: 'self-harm',
        label: 'Self-harm incidents per 1,000 prisoners',
        colour: '#E63946',
        data: data.selfHarm.map(d => ({
          date: yearToDate(d.year),
          value: d.incidentsPer1000,
        })),
      }]
    : [];

  const mentalHealthAndVacancySeries: Series[] = data
    ? [
        {
          id: 'mental-health',
          label: 'Mental illness prevalence (%)',
          colour: '#6B7280',
          data: data.mentalHealthPrevalence.map(d => ({
            date: yearToDate(d.year),
            value: d.estimatedPct,
          })),
        },
        {
          id: 'gp-vacancy',
          label: 'Primary care vacancy rate (%)',
          colour: '#E63946',
          data: data.gpVacancyRate.map(d => ({
            date: yearToDate(d.year),
            value: d.vacancyPct,
          })),
        },
      ]
    : [];

  // ── Annotations ─────────────────────────────────────────────────────────

  const healthcareAnnotations: Annotation[] = [
    { date: new Date(2017, 0, 1), label: '2017: NHS England takes over commissioning' },
    { date: new Date(2020, 0, 1), label: '2020: COVID halts most inspections' },
  ];

  const selfHarmAnnotations: Annotation[] = [
    { date: new Date(2018, 0, 1), label: '2018: Record prison population' },
    { date: new Date(2020, 0, 1), label: '2020: Lockdown isolation regime' },
  ];

  const vacancyAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: Pandemic recruitment crisis' },
  ];

  // ── Derived values ──────────────────────────────────────────────────────

  const latestRating = data?.healthcareRatings[data.healthcareRatings.length - 1];
  const earliestRating = data?.healthcareRatings[0];
  const latestSelfHarm = data?.selfHarm[data.selfHarm.length - 1];
  const earliestSelfHarm = data?.selfHarm[0];
  const latestVacancy = data?.gpVacancyRate[data.gpVacancyRate.length - 1];

  const ratingChange = latestRating && earliestRating
    ? latestRating.poorOrInadequatePct - earliestRating.poorOrInadequatePct
    : 15;

  const selfHarmChange = latestSelfHarm && earliestSelfHarm
    ? Math.round(((latestSelfHarm.incidentsPer1000 - earliestSelfHarm.incidentsPer1000) / earliestSelfHarm.incidentsPer1000) * 100)
    : 115;

  return (
    <>
      <TopicNav topic="Prison Healthcare" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Prison Healthcare"
          question="Is Prison Healthcare Actually Adequate?"
          finding="A third of prisons are rated poor or inadequate for healthcare. Self-harm incidents have more than doubled since 2015. An estimated 70% of prisoners have a diagnosable mental illness — nine times the community rate — yet more than a third of primary care posts inside prisons are unfilled."
          colour="#E63946"
          preposition="with"
        />

        {/* Editorial context */}
        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Prison healthcare in England operates under a structural contradiction. Since 2006, the NHS has been responsible for commissioning health services inside prisons, yet the prison environment itself undermines almost every principle of effective healthcare delivery. Overcrowding means GPs see patients in converted cells. Lockdown regimes restrict movement to healthcare wings. Staff vacancies — now at 37% for primary care roles — leave prisons relying on expensive agency locums who lack continuity with patients.<Cite nums={3} /> The result is a system where a third of prisons are rated poor or not sufficiently good for healthcare by inspectors, and that proportion has nearly doubled over the past decade.<Cite nums={1} />
            </p>
            <p>
              The mental health crisis inside prisons is the sharpest failure. An estimated 70% of prisoners have at least one diagnosable mental health condition — including depression, anxiety, personality disorders, and psychosis — compared with roughly 8% of the general adult population. Yet access to talking therapies in prison is severely limited, and waiting times for specialist mental health assessment can exceed twelve weeks. Self-harm has become endemic: incidents rose from 298 per 1,000 prisoners in 2015 to 641 per 1,000 in 2024, a 115% increase. Much of this is concentrated among women prisoners, young adults, and those on remand — the populations least well served by the current system.
            </p>
            <p>
              The driver most amenable to policy intervention is workforce. Prisons cannot attract and retain GPs, nurses, and mental health practitioners because the working conditions are poor, the pay is no better than community roles, and the professional isolation is real. NHS England&apos;s Health and Justice commissioning framework has improved governance, but governance without staff produces paperwork, not care. Until prison healthcare posts are made genuinely attractive — through pay premiums, career progression, and manageable caseloads — the inspection data will continue to deteriorate.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-ratings', label: 'Healthcare ratings' },
          { id: 'sec-selfharm', label: 'Self-harm' },
          { id: 'sec-workforce', label: 'Workforce & mental health' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Prisons rated poor/inadequate for healthcare"
            value={latestRating ? `${latestRating.poorOrInadequatePct}%` : '33%'}
            direction="up"
            polarity="up-is-bad"
            changeText={`+${ratingChange}pp since 2015 · HMIP inspections 2023/24`}
            sparklineData={
              data ? sparkFrom(data.healthcareRatings.map(d => d.poorOrInadequatePct)) : [18,19,21,22,24,26,27,29,31,33]
            }
            source="HMIP — Annual Report, Nov 2024"
            href="#sec-ratings"
          />
          <MetricCard
            label="Self-harm incidents per 1,000 prisoners"
            value={latestSelfHarm ? latestSelfHarm.incidentsPer1000.toLocaleString() : '641'}
            direction="up"
            polarity="up-is-bad"
            changeText={`+${selfHarmChange}% since 2015 · record high`}
            sparklineData={
              data ? sparkFrom(data.selfHarm.map(d => d.incidentsPer1000)) : [298,364,418,502,538,487,521,578,612,641]
            }
            source="MOJ — Safety in Custody Statistics, Q2 2024"
            href="#sec-selfharm"
          />
          <MetricCard
            label="Primary care vacancy rate"
            value={latestVacancy ? `${latestVacancy.vacancyPct}%` : '37%'}
            direction="up"
            polarity="up-is-bad"
            changeText="Up from 12% in 2015 · agency locum reliance"
            sparklineData={
              data ? sparkFrom(data.gpVacancyRate.map(d => d.vacancyPct)) : [12,14,17,21,24,28,31,33,35,37]
            }
            source="NHS England — Health & Justice Workforce Data, 2024"
            href="#sec-workforce"
          />
        </div>

        {/* Chart 1: Healthcare ratings */}
        <ScrollReveal>
          <div id="sec-ratings" className="mb-12">
            <LineChart
              series={healthcareRatingSeries}
              annotations={healthcareAnnotations}
              title="Prisons rated poor or inadequate for healthcare, England, 2015–2024"
              subtitle="Percentage of inspected prisons receiving lowest two healthcare ratings from HMIP."
              yLabel="% of prisons"
              source={{
                name: 'HM Inspectorate of Prisons',
                dataset: 'Annual Report — Healthcare ratings',
                frequency: 'annual',
                url: 'https://www.justiceinspectorates.gov.uk/hmiprisons/inspections/',
                date: 'Nov 2024',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Self-harm */}
        <ScrollReveal>
          <div id="sec-selfharm" className="mb-12">
            <LineChart
              series={selfHarmSeries}
              annotations={selfHarmAnnotations}
              title="Self-harm incidents in prison, England & Wales, 2015–2024"
              subtitle="Incidents per 1,000 prisoners. More than doubled in a decade. Concentrated among women, young adults, and remand prisoners."
              yLabel="Incidents per 1,000"
              source={{
                name: 'Ministry of Justice',
                dataset: 'Safety in Custody Statistics — Self-harm',
                frequency: 'quarterly',
                url: 'https://www.gov.uk/government/statistics/safety-in-custody-quarterly-update-to-june-2024',
                date: 'Q2 2024',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Mental health prevalence & GP vacancies */}
        <ScrollReveal>
          <div id="sec-workforce" className="mb-12">
            <LineChart
              series={mentalHealthAndVacancySeries}
              annotations={vacancyAnnotations}
              title="Mental illness prevalence vs primary care vacancy rate, 2015–2024"
              subtitle="Demand is stable at ~70% prevalence. The vacancy rate has tripled, widening the gap between need and provision."
              yLabel="%"
              source={{
                name: 'HMIP / NHS England',
                dataset: 'Mental health prevalence estimates; Health & Justice workforce data',
                frequency: 'annual',
                url: 'https://www.justiceinspectorates.gov.uk/hmiprisons/our-work/annual-report/',
                date: 'Nov 2024',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Liaison and Diversion services now cover all courts and custody suites"
            value="100%"
            unit="coverage"
            description="NHS Liaison and Diversion (L&D) services, which identify people with mental health conditions, learning disabilities, and substance misuse at the point of arrest or court appearance, achieved 100% national coverage in England in 2023. These services screen around 130,000 people per year and divert a significant proportion away from custody and into community treatment. Early evaluation evidence shows that individuals seen by L&D services have lower reoffending rates and reduced demand on emergency mental health services. While conditions inside prisons remain poor, the expansion of L&D represents a genuine system improvement — preventing some of the most vulnerable people from entering a healthcare environment that cannot adequately serve them."
            source="Source: NHS England — Liaison and Diversion programme, 2023. University of Exeter independent evaluation, 2022."
          />
        </ScrollReveal>

        {/* Sources & Methodology */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p>
              <a href="https://www.justiceinspectorates.gov.uk/hmiprisons/inspections/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">HM Inspectorate of Prisons</a> — Healthcare ratings from annual inspection reports. Rolling inspection cycle means year-on-year comparisons reflect partially different prison subsets.
            </p>
            <p>
              <a href="https://www.gov.uk/government/statistics/safety-in-custody-quarterly-update-to-june-2024" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Ministry of Justice</a> — Safety in Custody Statistics. Self-harm incidents per 1,000 prisoners. Recording practices vary between establishments.
            </p>
            <p>
              <a href="https://www.justiceinspectorates.gov.uk/hmiprisons/our-work/annual-report/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">HMIP</a> — Mental health prevalence estimates based on inspection surveys and academic literature. No comprehensive prison-wide screening exists.
            </p>
            <p>
              <a href="https://www.england.nhs.uk/commissioning/health-just/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England</a> — Health and Justice workforce data. Primary care vacancy rates across the prison estate.
            </p>
            <p>All figures are for England unless otherwise stated. COVID-19 disrupted inspections in 2020–2021, creating data gaps in healthcare ratings. Trend data uses the most recent available release at time of publication.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
