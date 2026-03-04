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
            <p>England&apos;s NHS mental health waiting lists stood at 1.8 million people in early 2024 &mdash; up 38% since 2019. That figure captures those already in the system; it says nothing about the many more who sought help and were turned away at triage, or who never reached a GP in the first place. The sharpest rise has been among the young: one in five children under 18 now has a probable mental health disorder, according to NHS Digital&apos;s survey data, against one in nine in 2017. The scale of that shift in seven years has no obvious precedent in modern public health data.</p>
            <p>Parliament legislated for parity of esteem between mental and physical health in 2012, establishing that mental illness should receive equivalent urgency and resource. In practice, the 18-week referral-to-treatment standard met routinely for elective surgery is not met for most mental health pathways. The one exception is Talking Therapies &mdash; the renamed IAPT programme &mdash; which largely hits its six-week target for mild-to-moderate anxiety and depression. For eating disorders, psychosis, personality disorder, and complex trauma, waits routinely run into months or years.</p>
            <p>The NHS Mental Health Investment Standard, introduced in 2016, requires mental health spending to grow at least as fast as the overall NHS budget. Total expenditure rose from &pound;12.1bn to &pound;15.2bn between 2016 and 2023 &mdash; a real increase by any measure. But demand, driven by rising prevalence, rising referral rates, and rising complexity, has outpaced that investment. More money has bought more activity; it has not bought enough capacity to close the gap between need and provision.</p>
            <p>The Children and Young People&apos;s crisis sits at the sharpest end of this failure. CAMHS waiting lists in some trusts run beyond two years for non-emergency treatment. The eating disorders emergency target &mdash; treatment within four weeks of urgent referral for under-18s &mdash; is frequently missed, with NHS England&apos;s own data showing compliance falling well below the 95% standard in the worst-performing regions. The consequence is visible in A&amp;E attendance figures: presentations for mental health crisis among under-18s have risen sharply since 2019, with hospitals becoming the default point of intervention when community services cannot respond in time.</p>
            <p>The waiting list headline is itself an incomplete measure. It counts people who have been accepted onto a pathway &mdash; not those rejected at triage, not those whose GPs judged a referral unlikely to succeed, and not those who never sought help at all. It also says nothing about what happens to people during the wait: the deterioration, the crisis presentations, the lost employment. NHS England has begun publishing data on &ldquo;waits from referral to first contact,&rdquo; which is progress, but severity-weighted measures of unmet need remain absent from routine reporting. The numbers that exist understate the problem; the numbers that would fully describe it do not yet exist.</p>
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
