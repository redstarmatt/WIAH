'use client';

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

// Cases awaiting initial decision (thousands), 2015–2025 — Home Office
const pendingCasesValues = [25, 29, 33, 37, 44, 52, 72, 95, 134, 115, 82];

// Quarterly decisions made (thousands), 2015–2025 — Home Office
const quarterlyDecisionsValues = [14, 15, 15, 14, 13, 11, 10, 12, 24, 29, 26];

// Overall grant rate (%), 2015–2025
const grantRateValues = [40, 38, 37, 39, 41, 44, 62, 71, 76, 73, 70];

// Afghan/Syrian grant rate (%), 2015–2025
const afgSyrGrantRateValues = [82, 84, 85, 86, 87, 90, 96, 97, 97, 95, 94];

const series1: Series[] = [
  {
    id: 'pending-cases',
    label: 'Cases awaiting initial decision (thousands)',
    colour: '#E63946',
    data: pendingCasesValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v * 1000 })),
  },
  {
    id: 'quarterly-decisions',
    label: 'Quarterly decisions made (thousands)',
    colour: '#2A9D8F',
    data: quarterlyDecisionsValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v * 1000 })),
  },
];

const series2: Series[] = [
  {
    id: 'overall-grant-rate',
    label: 'Overall grant rate (%)',
    colour: '#264653',
    data: grantRateValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'afg-syr-grant-rate',
    label: 'Afghan/Syrian grant rate (%)',
    colour: '#2A9D8F',
    data: afgSyrGrantRateValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: COVID halts casework for months' },
  { date: new Date(2023, 0, 1), label: '2023: 2,500 new caseworkers recruited' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'Home Office', dataset: 'Immigration System Statistics', url: 'https://www.gov.uk/government/collections/immigration-statistics-quarterly-release', date: 'Q1 2025' },
  { num: 2, name: 'HMCTS', dataset: 'Tribunal Statistics Quarterly', url: 'https://www.gov.uk/government/collections/tribunals-statistics', date: 'Q4 2025' },
  { num: 3, name: 'Home Office', dataset: 'New Plan for Immigration: Progress Update', url: 'https://www.gov.uk/government/publications/new-plan-for-immigration', date: '2024' },
];

export default function AsylumBacklogPage() {
  return (
    <>
      <TopicNav topic="Asylum Backlog" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Immigration & Population"
          question="How long do asylum seekers wait for a decision?"
          finding="The UK asylum backlog peaked at 134,000 cases in early 2023 — the highest on record. A major caseworker recruitment drive has since reduced it to around 82,000, but the average wait remains 18 months against a 6-month target. The appeals backlog is growing fastest and has reached 42,000."
          colour="#6B7280"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK's asylum backlog reached a record 134,000 cases in early 2023 — the product of years of underinvestment in caseworker capacity, the disruption of COVID-19 which halted decision-making for months, and a sustained increase in applications driven by conflict and displacement in Afghanistan, Syria, Eritrea, and Iran.<Cite nums={1} /> People waiting for an asylum decision cannot work, face severe restrictions on their movement, and are housed in emergency accommodation at a cost to the taxpayer that grew to over £8 million per day at the backlog's peak.<Cite nums={1} /> The system is structured so that the longer a decision takes, the more expensive it becomes and the harder it is for applicants to rebuild their lives regardless of the outcome.</p>
            <p>The government's response — recruiting 2,500 additional caseworkers and running a 'turbo' clearance programme for legacy cases — delivered the highest annual decision output on record in 2024: over 100,000 initial decisions.<Cite nums={[1, 3]} /> This reduced the main backlog from 134,000 to around 82,000 by early 2025.<Cite nums={1} /> But the appeals backlog — cases where an initial refusal has been challenged at the First-tier Tribunal — has grown to 42,000 and is the fastest-growing component of the system.<Cite nums={2} /> Grant rates have risen significantly since 2020: roughly 70% of all asylum applicants now receive protection at initial decision or appeal, reflecting the nationality composition of arrivals.<Cite nums={1} /> For Afghan and Syrian nationals, the grant rate exceeds 94%, meaning the system is spending significant time and money adjudicating cases where the outcome is highly predictable.<Cite nums={1} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Backlog & decisions' },
          { id: 'sec-chart2', label: 'Grant rates' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Cases awaiting initial decision"
              value="82K"
              unit="early 2025"
              direction="down"
              polarity="up-is-bad"
              changeText="Down from 134k peak · still 3x the 2019 level · target: 6-month waits"
              sparklineData={pendingCasesValues}
              source="Home Office — Immigration System Statistics Q1 2025"
              href="#sec-chart1"
            />
            <MetricCard
              label="Average wait for initial decision"
              value="18 months"
              unit="2025"
              direction="down"
              polarity="up-is-bad"
              changeText="Down from 28 months at peak · target: 6 months · still 3x target"
              sparklineData={[6, 7, 9, 13, 18, 24, 28, 26, 22, 20, 18]}
              source="Home Office — Immigration System Statistics 2025"
              href="#sec-chart1"
            />
            <MetricCard
              label="Appeals backlog"
              value="42K"
              unit="2025"
              direction="up"
              polarity="up-is-bad"
              changeText="Fastest-growing component · First-tier Tribunal under pressure"
              sparklineData={[15, 16, 19, 22, 26, 30, 34, 37, 39, 41, 42]}
              source="HMCTS — Tribunal Statistics Q4 2025"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK asylum backlog and decision output, 2015–2025"
              subtitle="Cases awaiting initial decision (red, left axis) and quarterly decisions made (green). The backlog peaked at 134,000 in 2023 and has since reduced following a major caseworker recruitment drive."
              series={series1}
              annotations={annotations}
              yLabel="Cases"
              source={{ name: 'Home Office', dataset: 'Immigration System Statistics', url: 'https://www.gov.uk/government/collections/immigration-statistics-quarterly-release', frequency: 'quarterly', date: 'Q1 2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Asylum grant rates by nationality, 2015–2025"
              subtitle="Overall grant rate (blue) and Afghan/Syrian grant rate (teal). Rising grant rates reflect the nationality composition of arrivals — 70%+ of all applicants now receive protection at initial decision or appeal."
              series={series2}
              annotations={[{ date: new Date(2021, 0, 1), label: '2021: Afghan crisis — grant rates rise sharply' }]}
              yLabel="Grant rate (%)"
              source={{ name: 'Home Office', dataset: 'Immigration System Statistics', url: 'https://www.gov.uk/government/collections/immigration-statistics-quarterly-release', frequency: 'quarterly', date: 'Q1 2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Backlog more than halved — 100,000 decisions in a single year"
            value="134K → 82K"
            unit="cases cleared since 2023 peak"
            description="The recruitment of 2,500 additional asylum caseworkers and a 'turbo' clearance programme for legacy cases reduced the main backlog from a peak of 134,000 to around 82,000 between 2023 and early 2025. Over 100,000 initial decisions were made in 2024 alone — the highest annual output on record. Electronic decision systems allowed caseworkers to process straightforward cases 40% faster. For nationalities with near-universal grant rates, a fast-track process introduced in 2024 aims to reduce average decision times to under 8 weeks for applicants from countries with grant rates above 75%, providing faster certainty and reducing accommodation costs."
            source="Source: Home Office — Immigration System Statistics Q1 2025. Home Office — New Plan for Immigration: Progress Update 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/immigration-statistics-quarterly-release" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Home Office — Immigration System Statistics</a> — quarterly publication. Covers asylum applications, initial decisions, grants and refusals, appeals, and accommodation costs.</p>
            <p>Pending cases refers to cases awaiting an initial decision from the Home Office (not appeals). Average wait is the median time from application to initial decision for cases decided in each period. Grant rate is the proportion of substantive initial decisions resulting in refugee status, humanitarian protection, or leave to remain. The appeals backlog covers cases pending at the First-tier Tribunal (Immigration and Asylum Chamber).</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
