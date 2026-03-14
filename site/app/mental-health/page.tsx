'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'NHS England', dataset: 'NHS Talking Therapies Annual Report', url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/iapt-monthly-return/', date: '2023' },
  { num: 2, name: 'NHS England', dataset: 'KH03 Bed Availability and Occupancy', url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/bed-availability-and-occupancy/', date: '2023' },
  { num: 3, name: 'NHS Digital', dataset: 'Mental Health of Children and Young People in England', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/mental-health-of-children-and-young-people-in-england', date: '2023' },
  { num: 4, name: 'NHS Digital', dataset: 'Adult Psychiatric Morbidity Survey', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/adult-psychiatric-morbidity-survey', date: '2023' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface TalkingTherapiesTimeSeries {
  year: number;
  referralsMillions: number;
  completionsMillions: number;
}

interface MentalHealthBedTimeSeries {
  year: number;
  bedsPer100kPop: number;
}

interface AgeGroup {
  ageGroup: string;
  probableDisorderPct: number;
}

interface CAMHSData {
  averageWaitWeeks: number;
  someAreasWaitWeeks: number;
  referralsRejectedPct: number;
  note: string;
}

interface MentalHealthData {
  national: {
    talkingTherapies: {
      timeSeries: TalkingTherapiesTimeSeries[];
      latestYear: number;
      latestReferralsMillions: number;
      latestCompletionsMillions: number;
      recoveryRatePct: number;
      recoveryTarget: number;
      note: string;
    };
    mentalHealthBeds: {
      timeSeries: MentalHealthBedTimeSeries[];
      latestYear: number;
      latestPer100k: number;
      changePct: number;
      outOfAreaPlacementsPerYear: number;
      note: string;
    };
    byAgeGroup: AgeGroup[];
    camhs: CAMHSData;
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function MentalHealthPage() {
  const [data, setData] = useState<MentalHealthData | null>(null);

  useEffect(() => {
    fetch('/data/mental-health/mental_health.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  // 1. Talking Therapies: referrals and completions
  const therapiesSeries: Series[] = data
    ? [
        {
          id: 'referrals',
          label: 'Referrals',
          colour: '#264653',
          data: data.national.talkingTherapies.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.referralsMillions,
          })),
        },
        {
          id: 'completions',
          label: 'Completions',
          colour: '#2A9D8F',
          data: data.national.talkingTherapies.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.completionsMillions,
          })),
        },
      ]
    : [];

  // 2. Mental health beds
  const bedsSeries: Series[] = data
    ? [
        {
          id: 'beds',
          label: 'Mental health beds per 100K population',
          colour: '#E63946',
          data: data.national.mentalHealthBeds.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.bedsPer100kPop,
          })),
        },
      ]
    : [];

  // ── Metrics ──────────────────────────────────────────────────────────────

  const waitingMetric = data && {
    label: 'People waiting for mental health care',
    value: '1.9M',
    unit: '',
    direction: 'up' as const,
    polarity: 'up-is-bad' as const,
    changeText: '2023 · Up from 1.2M in 2019 · CAMHS avg. 18 weeks to first appointment · Some areas 40+ week waits',
    sparklineData: [1.1, 1.2, 1.3, 1.4, 1.5, 1.9, 1.8, 1.9],
    onExpand: () => {},
  };

  const recoveryMetric = data && {
    label: 'NHS talking therapy recovery rate',
    value: '51%',
    unit: '',
    direction: 'flat' as const,
    polarity: 'up-is-good' as const,
    changeText: '2022/23 · NHS IAPT/talking therapies · Target 50%+ · 1.24M referrals completed treatment · PTSD + depression',
    sparklineData: [43, 46, 48, 50, 51, 46, 49, 51],
    onExpand: () => {},
  };

  const bedsMetric = data && {
    label: 'Mental health beds (per 100K population)',
    value: '50',
    unit: '',
    direction: 'down' as const,
    polarity: 'up-is-good' as const,
    changeText: '2023 · Down from 67 in 2010 · 27% cut · 1,000+ patients sent out-of-area per year · £1M in OOA placements monthly',
    sparklineData: [67, 65, 63, 61, 59, 57, 55, 53, 51, 50],
    onExpand: () => {},
  };

  return (
    <main>
      <TopicNav topic="Mental Health" />

      <div className="max-w-5xl mx-auto px-6 pt-12">
        <TopicHeader
          topic="Mental Health"
          question="Can You Actually Get Mental Health Support on the NHS?"
          finding={<>1.9 million people are waiting for NHS mental health care. NHS talking therapies (IAPT) see 1.2 million people a year, but only 51% achieve recovery.<Cite nums={1} /> CAMHS waiting times average 18 weeks for a first appointment.<Cite nums={3} /> Mental health beds have fallen 27% since 2010.<Cite nums={2} /></>}
          colour="#264653"
        />
      </div>

      {/* Metrics row */}
      <section className="max-w-5xl mx-auto px-6 py-10 border-b border-wiah-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {waitingMetric && <MetricCard {...waitingMetric} />}
          {recoveryMetric && <MetricCard {...recoveryMetric} />}
          {bedsMetric && <MetricCard {...bedsMetric} />}
        </div>
      </section>

      {/* Chart 1: Talking Therapies referrals & completions */}
      <ScrollReveal>
        <section className="max-w-4xl mx-auto px-6 py-12 border-b border-wiah-border">
          {data && therapiesSeries.length > 0 && (
            <LineChart
              title="NHS talking therapy referrals and completions, 2012–2023"
              subtitle="NHS Talking Therapies (formerly IAPT) annual referral volume and treatment completions."
              series={therapiesSeries}
              yLabel="People (millions)"
              source={{
                name: 'NHS England',
                dataset: 'NHS Talking Therapies: annual report',
                url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/iapt-monthly-return/',
                frequency: 'annual',
              }}
            />
          )}
        </section>
      </ScrollReveal>

      {/* Chart 2: Mental health beds */}
      <ScrollReveal>
        <section className="max-w-4xl mx-auto px-6 py-12 border-b border-wiah-border">
          {data && bedsSeries.length > 0 && (
            <LineChart
              title="Mental health beds, England, 2010–2023"
              subtitle="NHS mental illness beds per 100,000 population. Adjusted for population using ONS mid-year estimates."
              series={bedsSeries}
              yLabel="Beds per 100K"
              source={{
                name: 'NHS England',
                dataset: 'KH03 bed availability and occupancy',
                url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/bed-availability-and-occupancy/',
                frequency: 'quarterly',
              }}
            />
          )}
        </section>
      </ScrollReveal>

      {/* Bar chart: Mental health by age group */}
      <ScrollReveal>
        <section className="max-w-4xl mx-auto px-6 py-12 border-b border-wiah-border">
          <h3 className="text-xl font-bold mb-2">Mental health by age group</h3>
          <p className="text-sm text-wiah-mid mb-6">Percentage with probable mental disorder</p>
          {data && (
            <div className="space-y-3">
              {data.national.byAgeGroup.map((group, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-24 text-sm font-mono text-wiah-black">{group.ageGroup}</div>
                  <div className="flex-1 bg-wiah-light rounded h-8 relative" style={{ width: '100%' }}>
                    <div
                      className="bg-wiah-red h-full rounded"
                      style={{ width: `${group.probableDisorderPct}%` }}
                    />
                  </div>
                  <div className="w-12 text-right text-sm font-mono text-wiah-black">{group.probableDisorderPct}%</div>
                </div>
              ))}
            </div>
          )}
          <p className="text-xs text-wiah-mid mt-6 font-mono">
            Source: Adult Psychiatric Morbidity Survey, NHS Digital
          </p>
        </section>
      </ScrollReveal>

      {/* Positive callout */}
      <ScrollReveal>
        <PositiveCallout
          title="What's improving"
          value="1.24M"
          unit="people completed NHS talking therapy in 2022/23 — the largest psychological therapy programme in the world"
          description="NHS Talking Therapies (formerly IAPT — Improving Access to Psychological Therapies) is the world's largest publicly funded psychological therapy service. In 2022/23, 1.24 million people completed a course of treatment, with 51% achieving clinical recovery. The NHS Long-Term Plan (2019) committed £2.3 billion for mental health, including expanding talking therapies to 1.9 million people per year by 2023/24. The Mental Health Investment Standard requires ICSs to grow their mental health spending faster than overall NHS funding year-on-year."
          source="Source: NHS England — NHS Talking Therapies Annual Report 2022/23."
        />
      </ScrollReveal>

      {/* Editorial context */}
      <section className="max-w-2xl mx-auto px-6 py-12 border-b border-wiah-border text-wiah-black">
        <div className="text-base leading-[1.7] space-y-4">
          <p>
            One in six adults experiences a mental health problem in any given week, yet an estimated 1.9 million people are now waiting for NHS mental health care of all kinds.<Cite nums={4} /> NHS Talking Therapies received 1.4 million referrals in 2022/23 and 51% achieved clinical recovery — but that headline masks severe strain in CAMHS, where 35% of GP referrals are rejected at triage and those accepted wait an average of 18 weeks.<Cite nums={[1, 3]} /> Among 16-24-year-olds, 27% have a probable mental disorder — nearly double the rate recorded in 2000.<Cite nums={3} />
          </p>

          <p>
            Inpatient beds have been cut 25% since 2010, forcing over 1,000 patients annually into out-of-area placements at a cost of £6 million per month.<Cite nums={2} /> The NHS Long-Term Plan (2019) committed £2.3 billion and 10,000 additional staff. The Mental Health Act — last substantively reformed in 1983 — awaits replacement: a Mental Health Bill introduced in 2024 proposes ending indefinite detention for personality disorder and curbing police use of Section 136.
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
        { id: 'therapies', label: 'Talking Therapies' },
        { id: 'beds', label: 'Mental health beds' },
        { id: 'agegroup', label: 'By age group' },
      ]} />
        <References items={editorialRefs} />

            <RelatedTopics />
      </main>
  );
}
