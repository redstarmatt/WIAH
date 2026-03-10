'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface TalkingTherapiesTimeSeries {
  year: number;
  referralsThousands: number;
  avgWaitWeeks: number;
}

interface CamhsTimeSeries {
  year: number;
  avgWaitWeeks: number;
}

interface SpendingTimeSeries {
  year: number;
  spendingBillionGBP: number;
}

interface ConditionBreakdown {
  condition: string;
  pctOfCaseload: number;
}

interface MentalHealthData {
  national: {
    talkingTherapies: {
      timeSeries: TalkingTherapiesTimeSeries[];
      latestYear: number;
      latestReferralsThousands: number;
      latestAvgWaitWeeks: number;
      targetWaitWeeks: number;
    };
    camhs: {
      timeSeries: CamhsTimeSeries[];
      latestYear: number;
      latestAvgWaitWeeks: number;
    };
    spending: {
      timeSeries: SpendingTimeSeries[];
      latestYear: number;
      latestBillionGBP: number;
    };
    conditionBreakdown: ConditionBreakdown[];
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 12) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function MentalHealthPage() {
  const [data, setData] = useState<MentalHealthData | null>(null);
  const colour = '#2A9D8F';

  useEffect(() => {
    fetch('/data/nhs-mental-health/nhs_mental_health.json')
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <div className="p-8">Loading...</div>;

  const therapyReferralsSeries: Series = {
    id: 'therapy',
    label: 'Referrals (thousands)',
    colour,
    data: data.national.talkingTherapies.timeSeries.map(d => ({
      date: yearToDate(d.year),
      value: d.referralsThousands,
    })),
  };

  const camhsSeries: Series = {
    id: 'camhs',
    label: 'Average wait (weeks)',
    colour: '#E63946',
    data: data.national.camhs.timeSeries.map(d => ({
      date: yearToDate(d.year),
      value: d.avgWaitWeeks,
    })),
  };

  const therapyAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: COVID-19 disruption' },
  ];

  const camhsAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: COVID-19' },
  ];

  const maxConditionPct = Math.max(...data.national.conditionBreakdown.map(c => c.pctOfCaseload));

  return (
    <>
      <TopicNav topic="NHS Mental Health" />

      <main className="bg-white max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="NHS Mental Health"
          question="Can You Actually Get Mental Health Treatment on the NHS?"
          finding="1.9 million people are in contact with NHS mental health services each month. But waits for talking therapies average 11 weeks; for children's services, 18 weeks. 1 in 4 adults experience a mental health problem each year. NHS mental health spending reached £14.1 billion in 2022/23 — but demand is rising faster than capacity."
          colour={colour}
          preposition="in"
        />

        {/* Section nav */}
        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-therapy', label: 'Talking Therapy' },
          { id: 'sec-camhs', label: "Children's Services" },
          { id: 'sec-conditions', label: 'By Condition' },
        ]} />

        {/* Metric cards */}
        <section id="sec-overview" className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <ScrollReveal>
              <MetricCard
                label="People in contact with NHS mental health services"
                value="1.9M"
                direction="up"
                polarity="up-is-good"
                changeText="Monthly (2023) · Up from 1.4M in 2016 · Increased access · But waits growing faster than capacity"
                sparklineData={sparkFrom([1400, 1500, 1550, 1600, 1650, 1500, 1700, 1800, 1900])}
                href="#sec-therapy"/>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <MetricCard
                label="Average wait for IAPT talking therapy (weeks)"
                value={data.national.talkingTherapies.latestAvgWaitWeeks.toString()}
                direction="up"
                polarity="up-is-bad"
                changeText="2023 · Target: 6 weeks · Up from 7 weeks in 2019 · 1.6M referrals per year"
                sparklineData={sparkFrom([5, 6, 7, 7, 8, 12, 10, 9, 11])}
                href="#sec-camhs"/>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <MetricCard
                label="Children waiting over 18 weeks for CAMHS"
                value="38%"
                direction="up"
                polarity="up-is-bad"
                changeText="2023 · Average CAMHS wait: 18 weeks · Up from 12 weeks in 2019 · 400K children referred annually"
                sparklineData={sparkFrom([15, 18, 20, 22, 25, 45, 35, 32, 38])}
                href="#sec-conditions"/>
            </ScrollReveal>
          </div>
        </section>

        {/* Charts */}
        <section id="sec-therapy" className="py-12">
          <ScrollReveal>
            <LineChart
              title="NHS talking therapy referrals, 2016–2023"
              subtitle="Annual referrals to NHS Talking Therapies (formerly IAPT), England. Includes COVID-19 drop in 2020."
              series={[therapyReferralsSeries]}
              yLabel="Referrals (thousands)"
              annotations={therapyAnnotations}
              source={{ name: 'NHS England', dataset: 'NHS Talking Therapies Statistics', frequency: 'monthly' }}
            />
          </ScrollReveal>
        </section>

        <section id="sec-camhs" className="py-12">
          <ScrollReveal>
            <LineChart
              title="Average wait for children's mental health services (CAMHS), 2016–2023"
              subtitle="Average weeks from referral to first treatment appointment, England. Includes COVID impact and recovery."
              series={[camhsSeries]}
              yLabel="Weeks"
              annotations={camhsAnnotations}
              source={{ name: 'NHS England', dataset: 'Children and Young People MH Statistics', frequency: 'quarterly' }}
            />
          </ScrollReveal>
        </section>

        <section id="sec-conditions" className="py-12">
          <ScrollReveal>
            <div className="mb-8">
              <h2 className="text-2xl font-black mb-2 text-wiah-black">NHS mental health caseload by condition type</h2>
              <p className="text-sm text-wiah-mid mb-6">Estimated percentage of NHS mental health service caseload by primary diagnosis, England 2023.</p>
              <div className="space-y-4">
                {data.national.conditionBreakdown.map((item) => {
                  const pct = (item.pctOfCaseload / maxConditionPct) * 100;
                  return (
                    <div key={item.condition} className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-40">
                        <p className="text-sm text-wiah-black font-medium">{item.condition}</p>
                      </div>
                      <div className="flex-grow">
                        <div className="h-8 rounded" style={{ width: pct + '%', backgroundColor: colour }} />
                      </div>
                      <div className="flex-shrink-0 w-16 text-right">
                        <p className="text-sm font-mono text-wiah-black">{item.pctOfCaseload}%</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Positive callout */}
        <section className="py-12">
          <ScrollReveal>
            <PositiveCallout
              title="What's improving"
              value="£2.3bn"
              unit="additional annual investment in mental health since the NHS Long-Term Plan (2019)"
              description="The NHS Long-Term Plan committed an additional £2.3 billion per year for mental health by 2023/24 — the largest ever expansion. Access to talking therapies has grown from 1.1 million referrals in 2016 to 1.6 million in 2023. Recovery rates for depression and anxiety in IAPT/Talking Therapies programmes reach 52% — comparable with international benchmarks. The Mental Health Act reform, introduced in Parliament in 2024, would end the use of police cells as mental health crisis places of safety and strengthen patient rights. Crisis resolution teams now cover all areas of England."
              source="Source: NHS England — Mental Health Services Data 2023; NHS Long-Term Plan progress report 2024."
            />
          </ScrollReveal>
        </section>

        {/* Context section */}
        <section className="py-12 bg-wiah-light">
          <div className="prose prose-sm">
            <ScrollReveal>
              <div className="mb-6">
                <h2 className="text-2xl font-black text-wiah-black mb-4">The pressure on NHS mental health</h2>
                <p className="text-base leading-relaxed text-wiah-black">
                  One in four adults in England experiences a diagnosable mental health condition in any given year, yet only one in three receives any treatment — a treatment gap of roughly 75% for common conditions such as anxiety and depression. Some 1.9 million people are now in contact with NHS mental health services each month, up from 1.4 million in 2016, but demand has outstripped supply: the NHS Confederation estimates 8.1 million people are waiting for mental health support but not yet receiving it. Mental health conditions account for 23% of the total burden of disease in England but attract just 11% of NHS spending — a disparity that has persisted for over a decade despite repeated pledges of parity.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="mb-6">
                <p className="text-base leading-relaxed text-wiah-black">
                  NHS Talking Therapies (formerly IAPT) now handles 1.6 million referrals a year, but the average wait stands at 11 weeks against a target of six — and only half of those referred complete a full course of treatment. Recovery rates of 52% are consistent with clinical benchmarks, though they mask wide regional variation. Children's services are under acute strain: 400,000 children are referred to CAMHS annually, yet the average wait has risen to 18 weeks from 12 pre-COVID, and 38% wait longer than 18 weeks for a first appointment. Below the clinical threshold, school-based emotional wellbeing services carry waiting lists of 12 months or more in some areas. Racial disparities persist in acute care — Black patients are detained under the Mental Health Act at four times the rate of white patients, with roughly 50,000 people sectioned each year.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="mb-6">
                <p className="text-base leading-relaxed text-wiah-black">
                  NHS mental health spending reached £14.1 billion in 2022/23, up 24% from £11.4 billion in 2016 — the largest sustained increase in the NHS budget. The Long-Term Plan committed an additional £2.3 billion per year by 2023/24, yet workforce gaps undercut delivery: mental health nursing vacancies stand at 9,800 (an 11% vacancy rate) and psychiatry training posts are unfilled at record levels. The Mental Health Act reform bill, introduced in Parliament in 2024, would end the use of police cells as places of safety and overhaul Community Treatment Orders. The legal duty of Parity of Esteem, in place since 2012, has not been met — the CQC consistently finds mental health services lag behind physical health provision. The suicide rate remains stable but stubbornly high at 10.7 per 100,000 in 2022, with men accounting for 75% of all cases.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Methodology */}
        <section className="py-12">
          <ScrollReveal>
            <h2 className="text-2xl font-black text-wiah-black mb-6">Sources &amp; Methodology</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-mono text-sm font-bold text-wiah-black mb-2">Methodology</h3>
                <p className="text-sm text-wiah-mid">{data.metadata.methodology}</p>
              </div>
              <div>
                <h3 className="font-mono text-sm font-bold text-wiah-black mb-3">Sources</h3>
                <ul className="space-y-2">
                  {data.metadata.sources.map((source, idx) => (
                    <li key={idx} className="text-sm text-wiah-mid">
                      <a href={source.url} className="text-wiah-blue hover:underline">
                        {source.name}
                      </a>
                      {' — '}{source.dataset} ({source.frequency})
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-mono text-sm font-bold text-wiah-black mb-2">Known issues</h3>
                <ul className="space-y-1">
                  {data.metadata.knownIssues.map((issue, idx) => (
                    <li key={idx} className="text-sm text-wiah-mid flex gap-3">
                      <span className="flex-shrink-0">•</span>
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </main>

    </>
  );
}
