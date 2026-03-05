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
            <p>England&apos;s NHS mental health waiting lists stood at 1.8 million in early 2024, up 38&percnt; since 2019. One in five children under 18 now has a probable mental health disorder against one in nine in 2017 &mdash; a shift with no obvious precedent in modern public health data. Parliament legislated for parity of esteem between mental and physical health in 2012; in practice the 18-week standard applied routinely to elective surgery is met only by Talking Therapies for mild-to-moderate anxiety and depression. CAMHS waits in some trusts exceed two years. NHS mental health spending rose from &pound;12.1bn to &pound;15.2bn between 2016 and 2023, but rising prevalence, referral rates, and complexity have outpaced investment &mdash; more money has bought more activity without closing the gap between need and provision.</p>
            <p>Children and young people bear the sharpest burden. The eating disorders emergency target &mdash; treatment within four weeks of urgent referral for under-18s &mdash; is frequently missed, with compliance well below the 95&percnt; standard in the worst-performing regions. A&amp;E presentations for under-18 mental health crises have risen sharply since 2019 as hospitals become the default intervention when community services fail to respond in time. The 1.8 million figure counts only those accepted onto a pathway; it excludes those turned away at triage, those whose GPs judged referral unlikely to succeed, and the many who never sought help at all.</p>
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
            href="#sec-overview"/>
          <MetricCard
            label="Average CAMHS wait (children)"
            value="18"
            unit="months"
            direction="up"
            polarity="up-is-bad"
            changeText="Some areas 3+ years"
            sparklineData={[18, 17, 16, 15, 14, 13, 12, 13, 14, 18]}
            source="NHS England · CAMHS Waiting Times, 2023"
            href="#sec-waiting-list"/>
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
            href="#sec-iapt"/>
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
