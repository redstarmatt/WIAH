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

interface ReferralPoint {
  year: number;
  referrals: number;
  note?: string;
}

interface ICBWaitData {
  region: string;
  waitYears: number;
}

interface ADHDData {
  waitingList: WaitingListPoint[];
  referralVolumes: ReferralPoint[];
  averageWaitByICB: ICBWaitData[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ADHDWaitingTimesPage() {
  const [data, setData] = useState<ADHDData | null>(null);

  useEffect(() => {
    fetch('/data/adhd-waiting-times/adhd_waiting_times.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const waitingListSeries: Series[] = data
    ? [{
        id: 'waiting-list',
        label: 'People on waiting list',
        colour: '#E63946',
        data: data.waitingList.map(d => ({
          date: yearToDate(d.year),
          value: d.count,
        })),
      }]
    : [];

  const referralSeries: Series[] = data
    ? [{
        id: 'referrals',
        label: 'Annual referrals',
        colour: '#E63946',
        data: data.referralVolumes.map(d => ({
          date: yearToDate(d.year),
          value: d.referrals,
        })),
      }]
    : [];

  const latestWaiting = data?.waitingList[data.waitingList.length - 1];
  const earliestWaiting = data?.waitingList[0];
  const latestReferrals = data?.referralVolumes[data.referralVolumes.length - 1];
  const earliestReferrals = data?.referralVolumes[0];

  const waitingGrowth = latestWaiting && earliestWaiting
    ? Math.round(((latestWaiting.count - earliestWaiting.count) / earliestWaiting.count) * 100)
    : 746;

  const referralGrowth = latestReferrals && earliestReferrals
    ? Math.round(((latestReferrals.referrals - earliestReferrals.referrals) / earliestReferrals.referrals) * 100)
    : 339;

  return (
    <>
      <TopicNav topic="Mental Health" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Mental Health"
          question="How long do you actually wait for an ADHD diagnosis?"
          finding="The average wait for an adult ADHD assessment on the NHS is now 3.5 years. Over 200,000 people are on waiting lists across England, with referrals up more than 400% since 2018. Some areas have waits exceeding five years."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Adult ADHD has gone from a condition most GPs were trained to dismiss to one generating more referrals than the system can absorb. The recognition explosion is real and welcome: research consistently shows ADHD affects 3-4% of adults in the UK, yet until recently most were never diagnosed. A generation of women, people diagnosed late in life, and those whose symptoms were masked by coping strategies are now seeking the assessments they should have had decades ago. Referral volumes have increased by over 400% since 2018, driven by greater public awareness, social media destigmatisation, and updated NICE guidelines that explicitly recognise adult ADHD as a valid and treatable condition.
            </p>
            <p>
              The NHS has not kept pace. The average wait for an adult ADHD diagnostic assessment now stands at approximately 3.5 years nationally, with enormous regional variation. In Birmingham and Solihull, waits exceed five years. Some trusts have effectively closed their lists to new referrals entirely. The Right to Choose pathway — which allows patients to request referral to a qualified private provider at NHS expense — was meant to ease pressure, but awareness remains patchy and many GPs are unfamiliar with the process or reluctant to use it. For those who can afford it, private assessment costs between £500 and £2,000, creating a two-tier system where diagnosis speed depends on income. Even after diagnosis, medication shortages have compounded the problem: Elvanse (lisdexamfetamine), the most commonly prescribed ADHD medication in the UK, has been subject to recurring supply disruptions since 2023, leaving diagnosed patients unable to access the treatment they need.
            </p>
            <p>
              The workplace impact is substantial and largely invisible. Undiagnosed ADHD is associated with higher rates of job loss, underemployment, and workplace conflict. Adults with untreated ADHD are significantly more likely to experience anxiety, depression, and substance misuse — conditions that generate their own NHS demand. The economic case for faster diagnosis is strong: a 2024 analysis estimated that untreated adult ADHD costs the UK economy over £4 billion annually in lost productivity, higher welfare spending, and downstream mental health treatment. The NHS Long Term Plan committed to reducing mental health waiting times, but ADHD services remain chronically underfunded relative to demand. Without dedicated investment in assessment capacity — including training more ADHD specialist nurses and expanding the use of validated screening tools in primary care — the waiting list will continue to grow.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-waiting-list', label: 'Waiting list' },
          { id: 'sec-referrals', label: 'Referrals' },
          { id: 'sec-regional', label: 'Regional waits' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Average ADHD assessment wait"
            value="3.5"
            unit="years"
            direction="up"
            polarity="up-is-bad"
            changeText="Up from ~6 months in 2018 · some areas exceed 5 years"
            sparklineData={[0.5, 0.8, 1.2, 1.8, 2.4, 3.0, 3.5]}
            source="ADHD UK · FOI Waiting Times Data, 2024"
            href="#sec-waiting-list"
          />
          <MetricCard
            label="People on ADHD waiting list"
            value={latestWaiting ? (latestWaiting.count / 1000).toFixed(0) + 'k+' : '203k+'}
            unit="England"
            direction="up"
            polarity="up-is-bad"
            changeText={`Up ${waitingGrowth}% since 2018 · list growing by ~40,000/year`}
            sparklineData={
              data ? sparkFrom(data.waitingList.map(d => d.count)) : []
            }
            source="NHS Digital · MHSDS, 2024"
            href="#sec-referrals"
          />
          <MetricCard
            label="Annual ADHD referrals"
            value={latestReferrals ? (latestReferrals.referrals / 1000).toFixed(1) + 'k' : '62.3k'}
            unit="2024"
            direction="up"
            polarity="up-is-bad"
            changeText={`Up ${referralGrowth}% since 2018 · 400%+ increase in 6 years`}
            sparklineData={
              data ? sparkFrom(data.referralVolumes.map(d => d.referrals)) : []
            }
            source="NHS Digital · MHSDS, 2024"
            href="#sec-regional"
          />
        </div>

        {/* Chart 1: Waiting list size */}
        <ScrollReveal>
          <div id="sec-waiting-list" className="mb-12">
            <LineChart
              series={waitingListSeries}
              title="People waiting for adult ADHD assessment, England, 2018–2024"
              subtitle="Total number on NHS waiting lists for ADHD diagnostic assessment. List has grown more than 8x in six years."
              yLabel="People waiting"
              source={{
                name: 'NHS Digital',
                dataset: 'Mental Health Services Data Set (MHSDS)',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Referral volumes */}
        <ScrollReveal>
          <div id="sec-referrals" className="mb-12">
            <LineChart
              series={referralSeries}
              title="Annual ADHD referral volumes, England, 2018–2024"
              subtitle="New referrals for adult ADHD assessment per year. Dip in 2020 reflects COVID-19 disruption to GP services."
              yLabel="Referrals"
              source={{
                name: 'NHS Digital',
                dataset: 'Mental Health Services Data Set (MHSDS)',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Average wait by ICB region */}
        <ScrollReveal>
          <div id="sec-regional" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Average wait for adult ADHD assessment by ICB region (years)
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                Median wait from referral to diagnostic assessment. Enormous variation across England — a postcode lottery for diagnosis.
              </p>
              <div className="mt-6 space-y-4">
                {data?.averageWaitByICB.map((r) => {
                  const pct = (r.waitYears / 6) * 100;
                  return (
                    <div key={r.region}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{r.region}</span>
                        <span className="font-mono text-sm font-bold text-wiah-black">{r.waitYears} yrs</span>
                      </div>
                      <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{
                            width: `${pct}%`,
                            backgroundColor: r.waitYears >= 4 ? '#E63946' : r.waitYears >= 3 ? '#F4A261' : '#2A9D8F',
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">Source: ADHD UK — FOI Waiting Times Data, 2024. NHS Digital — MHSDS.</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Right to Choose and NHS Long Term Plan commitments"
            value="Right to Choose"
            description="The NHS Right to Choose allows patients referred for ADHD assessment to request that their GP refers them to any qualified provider — including private clinics — at NHS expense, if the NHS wait is unreasonable. While awareness and uptake remain uneven, the pathway has enabled tens of thousands of adults to access timely diagnosis who would otherwise still be waiting. The NHS Long Term Plan committed to expanding access to mental health services, including neurodevelopmental assessments. NHS England announced in 2024 that it would pilot dedicated adult ADHD assessment hubs in five ICB areas, aiming to reduce waits below 12 months. If successful, the model could be rolled out nationally. Several ICBs have also begun training mental health nurses in ADHD-specific assessment, increasing capacity without relying solely on psychiatrists."
            source="Source: NHS England — NHS Long Term Plan, 2019. NHS England — Right to Choose guidance, 2024. ADHD UK — FOI data."
          />
        </ScrollReveal>

        <RelatedTopics />
      </main>
    </>
  );
}
