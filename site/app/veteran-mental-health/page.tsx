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
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: "King's Centre for Military Health Research", dataset: 'Veteran mental health cohort study', url: 'https://www.kcl.ac.uk/kcmhr', date: '2023', note: '6% PTSD prevalence, 15% common mental health disorders' },
  { num: 2, name: 'NHS England', dataset: 'Op COURAGE Veterans Mental Health Service statistics', url: 'https://www.england.nhs.uk/mental-health/adults/veterans/', date: '2023', note: '21,000 referrals, 17,000 treated annually' },
  { num: 3, name: "Office for Veterans' Affairs", dataset: "Veterans' Strategy Action Plan 2022\u201324", url: 'https://www.gov.uk/government/publications/veterans-strategy-action-plan-2022-to-2024', date: '2024' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface VeteranMentalHealthData {
  timeSeries: Array<{ date: string; opCourageReferrals: number; opCourageTreated: number }>;
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

export default function VeteranMentalHealthPage() {
  const [data, setData] = useState<VeteranMentalHealthData | null>(null);

  useEffect(() => {
    fetch('/data/veteran-mental-health/veteran_mental_health.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const courageTimeSeries: Series[] = data
    ? [
        {
          id: 'referrals',
          label: 'Op COURAGE referrals',
          colour: '#264653',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.date), value: d.opCourageReferrals })),
        },
        {
          id: 'treated',
          label: 'Veterans completing treatment',
          colour: '#2A9D8F',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.date), value: d.opCourageTreated })),
        },
      ]
    : [];

  const capacityGapSeries: Series[] = data
    ? [
        {
          id: 'unmet',
          label: 'Unmet need (referrals minus treated)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.date),
            value: d.opCourageReferrals - d.opCourageTreated,
          })),
        },
      ]
    : [];

  return (
    <>
      <TopicNav topic="Veteran Mental Health" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Veteran Mental Health"
          question="Are We Looking After Veterans' Mental Health?"
          finding={<>Around 6% of UK veterans — some 120,000 people — have probable PTSD or another common mental health disorder related to their service,<Cite nums={1} /> but many face years-long waits for specialist treatment and encounter stigma that prevents them seeking help at all.</>}
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The United Kingdom has approximately 2.4 million veterans — people who have served in the armed forces and subsequently left. Research by the King's Centre for Military Health Research, based on longitudinal cohort studies tracking personnel from service through to civilian life, estimates that around 6% have probable post-traumatic stress disorder (PTSD) and a further 15% experience common mental health problems including anxiety and depression at clinical levels.<Cite nums={1} /> That translates to roughly 120,000 veterans with probable PTSD and around 360,000 with significant mental health needs. Combat exposure, particularly among those who served in Iraq and Afghanistan, is the strongest predictor of PTSD, but non-combat traumas including sexual assault, bullying, and adverse childhood experiences also feature prominently in veteran mental health presentations.
            </p>
            <p>
              The dedicated NHS service for veterans — Op COURAGE (the Veterans' Mental Health and Wellbeing Service) — has grown significantly since its launch in 2017, with referrals rising from 8,000 in its first year to over 21,000 in 2023.<Cite nums={2} /> The service operates through four regional hubs — North, South, London &amp; South East, and the Midlands — and provides assessment, brief intervention, and longer-term treatment including evidence-based trauma therapies such as EMDR and trauma-focused CBT. Despite this growth, Op COURAGE serves only around 17,000 veterans annually against an estimated need affecting hundreds of thousands — a gap that reflects both capacity constraints and significant under-referral from GPs, many of whom do not routinely ask patients about military service.<Cite nums={[1, 2]} />
            </p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-courage', label: 'Op COURAGE' },
          { id: 'sec-gap', label: 'Unmet Need' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Veterans with probable PTSD or CMD"
              value="120,000"
              direction="flat"
              polarity="up-is-bad"
              changeText="~6% of all UK veterans · 360,000 total with clinical mental health needs"
              sparklineData={[115000, 116000, 117000, 118000, 119000, 120000, 120000]}
              source="King's Centre for Military Health Research · Veteran cohort study 2023"
              href="#sec-courage"
            />
            <MetricCard
              label="Average wait for Op COURAGE referral"
              value="18"
              unit="weeks"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 8 weeks in 2017 · Target is 28 days (4 weeks)"
              sparklineData={[8, 10, 12, 14, 16, 17, 18, 18]}
              source="NHS England · Op COURAGE service monitoring 2023"
              href="#sec-courage"
            />
            <MetricCard
              label="Veterans receiving mental health support"
              value="21,000"
              unit="/yr"
              direction="up"
              polarity="up-is-good"
              changeText="Up from 8,000 in 2017 · But only covers ~6% of estimated need"
              sparklineData={[8000, 10000, 13000, 16000, 18000, 20000, 21000]}
              source="NHS England · Op COURAGE annual statistics 2023"
              href="#sec-courage"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-courage" className="mb-12">
            {courageTimeSeries.length > 0 ? (
              <LineChart
                title="Veterans referred to and treated through Op COURAGE, 2017–2024"
                subtitle="Annual referrals to the NHS Veterans' Mental Health Service (dark) vs veterans completing treatment (green). The growing gap reflects capacity constraints and rising demand."
                series={courageTimeSeries}
                yLabel="Veterans (number)"
                source={{
                  name: 'NHS England',
                  dataset: 'Op COURAGE Veterans Mental Health Service statistics',
                  frequency: 'annual',
                  url: 'https://www.england.nhs.uk/mental-health/adults/veterans/',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-gap" className="mb-12">
            {capacityGapSeries.length > 0 ? (
              <LineChart
                title="Veteran mental health unmet need (referrals minus treated), 2017–2024"
                subtitle="The annual gap between veterans referred into Op COURAGE and those completing treatment. A growing gap signals that the service is not keeping pace with demand even as it expands."
                series={capacityGapSeries}
                yLabel="Veterans (unmet need)"
                source={{
                  name: 'NHS England',
                  dataset: 'Op COURAGE Veterans Mental Health Service statistics',
                  frequency: 'annual',
                  url: 'https://www.england.nhs.uk/mental-health/adults/veterans/',
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
            value="Op COURAGE"
            description={<>Op COURAGE has grown from 8,000 referrals in 2017 to over 21,000 in 2023 — a 163% increase.<Cite nums={2} /> The Veterans&rsquo; Mental Health Transition, Intervention and Liaison Service (TILS) has improved early identification at point of service departure. The Veterans&rsquo; Strategy Action Plan 2022–24 commits to reducing average waits and expanding community-based provision.<Cite nums={3} /></>}
            source="NHS England · Office for Veterans' Affairs · Veterans' Strategy Action Plan 2022–24"
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
        <div className="mt-6 max-w-2xl"><References items={editorialRefs} /></div>

              <RelatedTopics />
      </main>
    </>
  );
}
