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

interface ADHDAutismData {
  national: {
    autismWaiting: {
      timeSeries: Array<{ year: number; waitingThousands: number }>;
      latestYear: number;
      latestThousands: number;
      avgWaitMonths: number;
    };
    adhdReferrals: {
      timeSeries: Array<{ year: number; referralsThousands: number }>;
      latestYear: number;
      latestThousands: number;
      avgWaitMonths: number;
    };
    byAgeGroup: Array<{ ageGroup: string; avgWaitMonths: number }>;
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ADHDAutismPage() {
  const [data, setData] = useState<ADHDAutismData | null>(null);

  useEffect(() => {
    fetch('/data/adhd-autism/adhd_autism.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const autismWaitingSeries: Series[] = data
    ? [{
        id: 'autism',
        label: 'Waiting (thousands)',
        colour: '#264653',
        data: data.national.autismWaiting.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.waitingThousands,
        })),
      }]
    : [];

  const autismAnnotations: Annotation[] = [
    { date: new Date(2021, 0, 1), label: '2021: Post-lockdown surge' },
  ];

  const adhdReferralsSeries: Series[] = data
    ? [{
        id: 'adhd',
        label: 'Referrals (thousands)',
        colour: '#264653',
        data: data.national.adhdReferrals.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.referralsThousands,
        })),
      }]
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="ADHD &amp; Autism" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="ADHD &amp; Autism"
          question="How Long Are People Waiting for ADHD and Autism Diagnoses?"
          finding="Adults wait an average of 5&ndash;7 years for an autism diagnosis on the NHS. ADHD assessment waits routinely exceed 3 years in most areas. 187,000 children are waiting for autism assessment. The number of adults seeking ADHD diagnosis has grown 400% since 2020, overwhelming services designed for a fraction of demand."
          colour="#264653"
          preposition="for"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Some 187,000 children in England are waiting for an autism diagnostic assessment, with the average wait now stretching to 36 months. The 13-week NHS waiting time standard for autism assessment was quietly abolished in 2019, removing even the pretence of a target. ADHD referrals to NHS services hit 200,000 in 2023 &mdash; a 400% increase since 2020 &mdash; while adult ADHD assessments average 3.5 years in most areas, with some Integrated Care Boards reporting waits of 5&ndash;7 years. The National Autistic Society estimates 1 in 100 children are autistic, but NHS England puts the total autistic population at up to 700,000, with many undiagnosed. An estimated 2.5 million adults in the UK have ADHD; only around 120,000 receive treatment.</p>
            <p>The surge in demand reflects genuine shifts in awareness, not a diagnostic fad. Social media &mdash; particularly TikTok and YouTube &mdash; has driven widespread recognition of neurodevelopmental conditions in adults who were missed as children. Post-COVID referral volumes accelerated the trend further. Women are diagnosed on average 4&ndash;5 years later than men, having masked symptoms more effectively throughout childhood, and late-diagnosed adults frequently report decades of misdiagnosis with anxiety, depression or personality disorders before receiving the correct assessment. Black and South Asian children remain under-identified in neurodevelopmental services, compounding diagnostic inequality across gender and ethnicity.</p>
            <p>An estimated 300,000 private ADHD assessments took place in 2023, at &pound;800&ndash;&pound;1,500 each, as patients bypassed collapsed NHS pathways. The Right to Choose policy allows NHS-funded access to independent providers, but shared care disputes persist &mdash; many NHS GPs refuse to prescribe ADHD medication initiated by private clinicians, leaving patients stranded between systems. The consequences of delayed diagnosis are severe: 51% of people with ADHD report their condition has severely impacted their relationships, and undiagnosed ADHD is associated with higher rates of substance misuse, unemployment and criminal justice contact. NICE updated its ADHD guidelines in 2023 for the first time since 2008, and NHS England has invested &pound;57 million in autism waiting time reduction and diagnostic workforce expansion.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-autism', label: 'Autism Waits' },
          { id: 'sec-adhd', label: 'ADHD Referrals' },
          { id: 'sec-age', label: 'By Age Group' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Children waiting for autism assessment"
              value="187K"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 &middot; Up from 65K in 2016 &middot; Average wait: 36 months &middot; 13-week standard abandoned in 2019"
              sparklineData={[65, 72, 81, 92, 98, 128, 158, 187]}
              onExpand={() => {}}
            />
            <MetricCard
              label="ADHD referrals to NHS services (annual)"
              value="200K"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 &middot; Up 400% since 2020 &middot; Average wait: 3.5 years &middot; Many turning to &pound;800&ndash;&pound;1,500 private assessments"
              sparklineData={[40, 45, 52, 85, 140, 200]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Average adult wait for ADHD diagnosis"
              value="3.5 yrs"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 &middot; Some areas: 5&ndash;7 years &middot; NHS Right to Choose: patients can request provider &middot; Shared care prescribing gaps after private diagnosis"
              sparklineData={[12, 15, 18, 24, 36, 42]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-autism" className="mb-12">
            <LineChart
              title="People waiting for NHS autism assessment, England, 2016&ndash;2023"
              subtitle="Children and adults waiting for an autism diagnostic assessment by NHS-commissioned services."
              series={autismWaitingSeries}
              annotations={autismAnnotations}
              yLabel="Waiting (thousands)"
              source={{
                name: 'NHS England',
                dataset: 'Autism Waiting Times Statistics',
                frequency: 'quarterly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-adhd" className="mb-12">
            <LineChart
              title="ADHD referrals to NHS services, England, 2018&ndash;2023"
              subtitle="Annual referrals for ADHD diagnostic assessment to NHS mental health and developmental services."
              series={adhdReferralsSeries}
              yLabel="Referrals (thousands)"
              source={{
                name: 'NHS Digital',
                dataset: 'Mental Health Services Dataset',
                frequency: 'monthly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-age" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">Average wait for neurodevelopmental assessment by age group, England, 2023</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Typical waiting times from referral to diagnosis assessment across NHS services.</p>
            {data && (
              <div className="space-y-3">
                {data.national.byAgeGroup.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-48 text-sm text-wiah-black flex-shrink-0">{item.ageGroup}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{ width: `${(item.avgWaitMonths / 60) * 100}%`, backgroundColor: '#264653' }}
                      />
                    </div>
                    <div className="w-20 text-right text-sm font-mono text-wiah-black">{item.avgWaitMonths} months</div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: NHS England &mdash; Autism Waiting Times; NHS Digital &mdash; Mental Health Services Dataset 2023</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s improving"
            value="&pound;57M"
            unit="invested in autism waiting time reduction and diagnostic workforce expansion since 2022"
            description="NHS England invested &pound;57 million in 2022/23 to reduce autism assessment waiting times, funding additional clinical psychologists, specialist nurses and diagnostic staff. The NHS Right to Choose policy allows patients to request any qualified provider for ADHD assessment, including independent sector providers, reducing waits for those who know to use it. NICE updated its ADHD guidelines in 2023 for the first time since 2008, expanding the evidence base for treatment across the life course. Shared Care Agreements &mdash; enabling GPs to continue prescribing ADHD medication initiated by specialists &mdash; are being standardised across Integrated Care Boards."
            source="Source: NHS England &mdash; Autism Waiting Times 2023; NHS Digital &mdash; Mental Health Services Dataset 2023."
          />
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                  {src.name} &mdash; {src.dataset}
                </a>
                <div className="text-xs text-wiah-mid">Updated {src.frequency}</div>
              </div>
            ))}
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Methodology</h3>
            <p>{data?.metadata.methodology}</p>
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Known issues</h3>
            <ul className="list-disc list-inside space-y-1">
              {data?.metadata.knownIssues.map((issue, i) => (
                <li key={i}>{issue}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
