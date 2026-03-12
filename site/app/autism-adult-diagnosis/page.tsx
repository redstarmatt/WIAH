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

// ── Types ────────────────────────────────────────────────────────────────────

interface WaitingListPoint {
  year: number;
  count: number;
}

interface RegionalWaitPoint {
  year: number;
  region: string;
  waitYears: number;
}

interface ReferralPoint {
  year: number;
  referrals: number;
}

interface NationalWaitPoint {
  year: number;
  waitYears: number;
}

interface AutismDiagnosisData {
  waitingList: WaitingListPoint[];
  averageWaitByRegion: RegionalWaitPoint[];
  referralVolumes: ReferralPoint[];
  nationalAverageWait: NationalWaitPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AutismAdultDiagnosisPage() {
  const [data, setData] = useState<AutismDiagnosisData | null>(null);

  useEffect(() => {
    fetch('/data/autism-adult-diagnosis/autism_adult_diagnosis.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const waitingListSeries: Series[] = data
    ? [{
        id: 'waiting-list',
        label: 'Adults on waiting list',
        colour: '#E63946',
        data: data.waitingList.map(d => ({
          date: yearToDate(d.year),
          value: d.count,
        })),
      }]
    : [];

  const regions = ['London', 'North West', 'South East', 'Midlands', 'North East', 'South West'];
  const regionColours: Record<string, string> = {
    'London': '#264653',
    'North West': '#E63946',
    'South East': '#2A9D8F',
    'Midlands': '#F4A261',
    'North East': '#6B7280',
    'South West': '#1A1A1A',
  };

  const regionalWaitSeries: Series[] = data
    ? regions.map(region => ({
        id: `wait-${region}`,
        label: region,
        colour: regionColours[region],
        data: data.averageWaitByRegion
          .filter(d => d.region === region)
          .map(d => ({
            date: yearToDate(d.year),
            value: d.waitYears,
          })),
      }))
    : [];

  const referralSeries: Series[] = data
    ? [{
        id: 'referrals',
        label: 'Referrals for adult autism assessment',
        colour: '#264653',
        data: data.referralVolumes.map(d => ({
          date: yearToDate(d.year),
          value: d.referrals,
        })),
      }]
    : [];

  const latestWaitingList = data?.waitingList[data.waitingList.length - 1];
  const firstWaitingList = data?.waitingList[0];
  const latestWait = data?.nationalAverageWait[data.nationalAverageWait.length - 1];
  const latestReferrals = data?.referralVolumes[data.referralVolumes.length - 1];
  const firstReferrals = data?.referralVolumes[0];

  const waitingListGrowth = latestWaitingList && firstWaitingList
    ? Math.round(((latestWaitingList.count - firstWaitingList.count) / firstWaitingList.count) * 100)
    : 442;

  const referralGrowth = latestReferrals && firstReferrals
    ? Math.round(((latestReferrals.referrals - firstReferrals.referrals) / firstReferrals.referrals) * 100)
    : 411;

  return (
    <>
      <TopicNav topic="Care & Support" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Care & Support"
          question="How long do adults actually wait for an autism diagnosis?"
          finding="The average adult waits 3.6 years for an NHS autism diagnosis. Over 116,000 people are on waiting lists across England, a fivefold increase since 2016. Referral volumes have risen 411% in eight years as recognition grows but services remain static."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Something important is happening in adult autism diagnosis, and it is not the thing most commonly reported. The story is not simply that waiting lists are long — though they are, catastrophically so — but that a generation of adults is discovering they are autistic after decades of living without understanding why the world felt so consistently difficult. Referrals for adult autism assessment have risen from around 12,800 in 2016 to over 65,000 in 2024. This is not an epidemic. It is recognition. Diagnostic criteria that were written around white boys in the 1990s are finally being applied to the full population: women, people of colour, adults who learned to mask their differences so effectively that their distress was attributed to anxiety, depression, personality disorders, or simply not trying hard enough. Women and people assigned female at birth are systematically underdiagnosed. Research consistently shows that autistic women are diagnosed on average four to five years later than men, and many are not identified until their thirties or forties — often only after a child's diagnosis prompts recognition of shared traits. The concept of masking — consciously or unconsciously suppressing autistic behaviours to fit social expectations — means many women present as coping while experiencing chronic exhaustion, burnout, and mental health crises that clinicians fail to connect to underlying neurodevelopmental difference.
            </p>
            <p>
              The consequences of late or absent diagnosis are severe and measurable. Autistic adults without diagnosis are significantly more likely to experience depression, anxiety, suicidal ideation, and substance misuse. The employment gap is stark: just 22% of autistic adults are in any form of employment, the lowest rate of any disability group. This is not because autistic people cannot work. It is because workplaces overwhelmingly fail to provide reasonable adjustments — predictable routines, reduced sensory input, clear communication, flexible working — that would enable autistic employees to thrive. The Autism Act 2009 placed duties on local authorities and NHS bodies to provide diagnostic services and support, but a National Audit Office review found that most areas have no post-diagnostic support at all. You get a diagnosis letter and nothing else. For many, the only alternative to a multi-year NHS wait is private assessment, costing between £1,500 and £3,000 — a sum that effectively makes diagnosis a privilege of the financially secure, deepening existing inequalities in who gets recognised and who does not.
            </p>
            <p>
              The scale of the problem is growing faster than the response. Between 2016 and 2024, the number of adults on NHS autism assessment waiting lists rose from around 21,000 to 116,000. In some areas of England, the wait exceeds five years. NICE guidelines recommend that the period from referral to first appointment should be no longer than 13 weeks. Virtually no service in England meets this standard. The mismatch between rising demand and static capacity means the waiting list is not a queue that moves slowly — in many areas, it barely moves at all. Meanwhile, the people waiting are not waiting passively. They are struggling with employment, relationships, parenting, and mental health — and they are doing so without the understanding, adjustments, and support that a diagnosis could unlock. The system is failing a legal duty, and the human cost compounds with every year of inaction.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-waiting-list', label: 'Waiting list' },
          { id: 'sec-regional', label: 'Regional waits' },
          { id: 'sec-referrals', label: 'Referrals' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Average wait for adult diagnosis"
            value={latestWait ? `${latestWait.waitYears}` : '3.6'}
            unit="years"
            direction="up"
            polarity="up-is-bad"
            changeText="Up from 1.2 years in 2016 · NICE target: 13 weeks"
            sparklineData={
              data ? sparkFrom(data.nationalAverageWait.map(d => d.waitYears)) : []
            }
            source="NHS Digital · Autism Statistics, 2024"
            href="#sec-waiting-list"
          />
          <MetricCard
            label="Adults on waiting list"
            value={latestWaitingList ? latestWaitingList.count.toLocaleString() : '116,000'}
            unit="2024"
            direction="up"
            polarity="up-is-bad"
            changeText={`+${waitingListGrowth}% since 2016 · up from ${firstWaitingList ? firstWaitingList.count.toLocaleString() : '21,400'}`}
            sparklineData={
              data ? sparkFrom(data.waitingList.map(d => d.count)) : []
            }
            source="NHS Digital · Autism Statistics, 2024"
            href="#sec-regional"
          />
          <MetricCard
            label="Annual referrals for assessment"
            value={latestReferrals ? latestReferrals.referrals.toLocaleString() : '65,400'}
            unit="2024"
            direction="up"
            polarity="up-is-bad"
            changeText={`+${referralGrowth}% since 2016 · demand far outstrips capacity`}
            sparklineData={
              data ? sparkFrom(data.referralVolumes.map(d => d.referrals)) : []
            }
            source="NHS Digital · Mental Health Services Dataset, 2024"
            href="#sec-referrals"
          />
        </div>

        {/* Chart 1: Waiting list size */}
        <ScrollReveal>
          <div id="sec-waiting-list" className="mb-12">
            <LineChart
              series={waitingListSeries}
              title="Adults on NHS autism assessment waiting lists, England, 2016–2024"
              subtitle="Total number of adults waiting for an autism diagnostic assessment. Fivefold increase in eight years."
              yLabel="People"
              source={{
                name: 'NHS Digital',
                dataset: 'Autism Statistics — Autism Waiting List',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Average wait by region */}
        <ScrollReveal>
          <div id="sec-regional" className="mb-12">
            <LineChart
              series={regionalWaitSeries}
              title="Average wait for adult autism diagnosis by region, 2018–2024"
              subtitle="Years from referral to diagnostic assessment. North East consistently worst; no region meets NICE 13-week target."
              yLabel="Years"
              source={{
                name: 'NHS Digital',
                dataset: 'Autism Statistics — Regional Breakdowns',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Referral volumes */}
        <ScrollReveal>
          <div id="sec-referrals" className="mb-12">
            <LineChart
              series={referralSeries}
              title="Annual referrals for adult autism assessment, England, 2016–2024"
              subtitle="Referral volumes have risen over 400% as awareness and recognition of autism in adults grows. Dip in 2020 reflects pandemic disruption."
              yLabel="Referrals"
              source={{
                name: 'NHS Digital',
                dataset: 'Mental Health Services Dataset',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Legal framework and training programmes improving"
            value="3 developments"
            description="The Autism Act 2009 remains the only disability-specific legislation in England, placing legal duties on councils and NHS bodies to plan and deliver autism services — though enforcement remains weak. The Oliver McGowan Mandatory Training on Learning Disability and Autism became a legal requirement for all health and social care staff in England from 2023, ensuring that professionals understand autistic people's needs. The government's Disability Confident scheme and Access to Work programme provide funding for workplace adjustments for autistic employees, covering specialist equipment, job coaching, and support workers. While take-up remains low relative to need, these frameworks establish the principle that autistic adults are entitled to diagnosis, support, and reasonable adjustments — not as a discretionary favour, but as a legal right."
            source="Source: Autism Act 2009. Health and Care Act 2022 (Oliver McGowan training). DWP — Access to Work statistics, 2024. National Autistic Society — Employment Gap report, 2024."
          />
        </ScrollReveal>
        <RelatedTopics />
      </main>
    </>
  );
}
