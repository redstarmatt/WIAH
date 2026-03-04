'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface WaitingListPoint {
  year: number;
  waiting: number;
}

interface IAPTCompliancePoint {
  year: number;
  pct18wk: number;
}

interface ServiceWaitData {
  service: string;
  avgWaitWeeks: number;
}

interface MentalHealthWaitsData {
  waitingList: WaitingListPoint[];
  iaptCompliance: IAPTCompliancePoint[];
  byServiceType: ServiceWaitData[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function MentalHealthWaitsPage() {
  const [data, setData] = useState<MentalHealthWaitsData | null>(null);

  useEffect(() => {
    fetch('/data/mental-health-waits/mental_health_waits.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const waitingListSeries: Series[] = data
    ? [{
        id: 'waiting-list',
        label: 'Waiting list size',
        colour: '#264653',
        data: data.waitingList.map(d => ({
          date: yearToDate(d.year),
          value: d.waiting,
        })),
      }]
    : [];

  const iaptComplianceSeries: Series[] = data
    ? [{
        id: 'iapt-compliance',
        label: 'IAPT 18-week compliance',
        colour: '#E63946',
        data: data.iaptCompliance.map(d => ({
          date: yearToDate(d.year),
          value: d.pct18wk,
        })),
      }]
    : [];

  // Extract latest values for metric cards
  const latestWait = data?.waitingList[data.waitingList.length - 1];
  const firstWait = data?.waitingList[0];
  const latestIAPT = data?.iaptCompliance[data.iaptCompliance.length - 1];

  return (
    <>
      <TopicNav topic="Health" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health"
          question="How long do people wait for mental health treatment?"
          finding={
            data
              ? `Waiting times for talking therapies and crisis services have worsened since the pandemic, with over 1.8 million people on mental health waiting lists and children waiting an average of 18 months for CAMHS assessment.`
              : 'Waiting times for mental health treatment have worsened significantly.'
          }
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>By 2023, 1.8 million people were on NHS mental health waiting lists in England &mdash; a 38% rise since 2019. The scale of unmet need is most acute among children. The proportion of under-18s with a probable mental health disorder rose from one in eight in 2017 to one in five by 2023. Last year, 75,000 children referred to Child and Adolescent Mental Health Services were turned away as &ldquo;not meeting threshold&rdquo; &mdash; deemed not unwell enough to qualify for treatment. Those who are accepted wait an average of 18 months for assessment; in some areas, three years.</p>
            <p>The NHS has had a legal commitment to parity of esteem since 2012 &mdash; treating mental health with the same urgency as physical conditions. In practice, the gap remains wide. The 18-week access target for talking therapies (NHS Talking Therapies, formerly IAPT) has not been met since 2020; the current compliance rate is 71% against a target of 75%, with some regions reporting waits of 40 weeks or more. Crisis care fares worse: people in acute mental health emergencies should be seen within four hours, but 24/7 crisis teams are absent in many areas, and A&amp;E departments have become the default safety net.</p>
            <p>The NHS Mental Health Investment Standard, introduced in 2016, requires mental health spending to grow at least as fast as the overall NHS budget. Expenditure rose from &pound;12.1bn in 2016&ndash;17 to &pound;15.3bn in 2022&ndash;23 in real terms. More than 4,000 additional mental health practitioners have been trained since 2019. Yet there are still 26,000 vacant mental health posts, and an estimated 1.5 million people who need support cannot access NHS services. Demand &mdash; driven by rising rates of anxiety, depression, and post-pandemic trauma &mdash; has consistently outpaced investment, and the NHS Long Term Plan&apos;s ambition to expand access to 380,000 more adults and 345,000 more children annually by 2023&ndash;24 has not been fully realised.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-waiting-list', label: 'Waiting Lists' },
          { id: 'sec-iapt', label: 'IAPT Compliance' },
          { id: 'sec-by-service', label: 'By Service Type' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="People on waiting lists"
            value={latestWait ? `${(latestWait.waiting / 1000000).toFixed(1)}M` : '—'}
            unit="2023"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestWait && firstWait
                ? `Up ${Math.round(((latestWait.waiting - firstWait.waiting) / firstWait.waiting) * 100)}% since 2016`
                : 'Loading…'
            }
            sparklineData={
              data ? sparkFrom(data.waitingList.map(d => d.waiting / 1000000)) : []
            }
            source="NHS England · Mental Health Services Data, 2023"
            onExpand={() => {}}
          />
          <MetricCard
            label="Average CAMHS wait (children)"
            value="18"
            unit="months"
            direction="up"
            polarity="up-is-bad"
            changeText="Some areas 3+ years"
            sparklineData={[18, 17, 16, 15, 14, 13, 12, 13, 14, 18]}
            source="NHS England · CAMHS Waiting Times, 2023"
            onExpand={() => {}}
          />
          <MetricCard
            label="IAPT 18-week target met"
            value={latestIAPT ? latestIAPT.pct18wk.toString() : '—'}
            unit="%"
            direction="down"
            polarity="up-is-good"
            changeText="Target is 75%; missed since 2020"
            sparklineData={
              data ? sparkFrom(data.iaptCompliance.map(d => d.pct18wk)) : []
            }
            source="NHS England · IAPT Performance, 2023"
            onExpand={() => {}}
          />
        </div>
        </ScrollReveal>

        {/* Chart 1: Waiting list size */}
        <ScrollReveal>
        <div id="sec-waiting-list" className="mb-12">
          <LineChart
            series={waitingListSeries}
            title="People on mental health waiting lists, England"
            subtitle="People waiting for a first contact with NHS mental health services. NHS England data."
          />
        </div>
        </ScrollReveal>

        {/* Chart 2: IAPT compliance */}
        <ScrollReveal>
        <div id="sec-iapt" className="mb-12">
          <LineChart
            series={iaptComplianceSeries}
            title="Talking therapies: patients seen within 18 weeks, England"
            subtitle="Percentage of IAPT referrals seen within 18 weeks. NHS target: 75%."
            targetLine={{ value: 75, label: 'NHS target: 75%' }}
          />
        </div>
        </ScrollReveal>

        {/* Chart 3: Wait by service type */}
        <ScrollReveal>
        <div id="sec-by-service" className="mb-12">
          <div className="bg-white rounded-lg border border-wiah-border p-8">
            <h2 className="text-lg font-bold text-wiah-black mb-2">
              Average waiting time by mental health service (weeks)
            </h2>
            <div className="mt-6 space-y-4">
              {data?.byServiceType.map((s) => {
                const pct = (s.avgWaitWeeks / 80) * 100;
                return (
                  <div key={s.service}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-wiah-black">{s.service}</span>
                      <span className="font-mono text-sm font-bold text-wiah-black">
                        {s.avgWaitWeeks < 1 ? '&lt;1 wk' : `${s.avgWaitWeeks.toFixed(1)} wks`}
                      </span>
                    </div>
                    <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                      <div
                        className="h-full rounded-sm transition-all"
                        style={{ width: `${pct}%`, backgroundColor: '#264653' }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
        <PositiveCallout
          title="Mental Health Investment Standard introduced 2016"
          value="&pound;15.3bn"
          unit="2022/23"
          description="The NHS Mental Health Investment Standard (MHIS) requires mental health spending to grow at least as fast as the overall NHS budget. Mental health spending rose from &pound;12.1bn in 2016/17 to &pound;15.3bn in 2022/23 &mdash; a 26% increase in real terms. But demand has grown faster, and the workforce gap remains the principal constraint."
          source="Source: NHS England — Mental Health Investment Standard 2022/23."
        />
        </ScrollReveal>
      </main>
    </>
  );
}
