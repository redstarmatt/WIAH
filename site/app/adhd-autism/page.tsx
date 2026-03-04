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
            <p>Some 187,000 children in England are currently waiting for an NHS autism diagnostic assessment, with the average wait stretching to 36 months &mdash; against a 13-week standard that was quietly abandoned in 2019. ADHD waits are similarly long: most Integrated Care Boards report adult ADHD assessment waits of 3&ndash;5 years, with some areas exceeding 7 years. Referrals to NHS ADHD services hit 200,000 in 2023, up 400% since 2020, reflecting a genuine expansion in awareness rather than diagnostic fashion. Autism and ADHD are distinct conditions &mdash; autism is a lifelong neurodevelopmental difference affecting social communication and sensory processing; ADHD is a condition characterised by inattention, hyperactivity and impulsivity &mdash; but they frequently co-occur, with around 50&ndash;70% of autistic people meeting criteria for ADHD. Both remain substantially under-diagnosed. The National Autistic Society estimates 700,000 undiagnosed autistic adults in England. NHS England puts the adult ADHD population at roughly 2.5 million; approximately 120,000 currently receive treatment.</p>
            <p>The majority of adults receiving diagnoses today were not identified as children. Women and girls are diagnosed on average 4&ndash;5 years later than men, partly because the diagnostic criteria were developed almost entirely from studies of white boys, and partly because many women learn to &ldquo;mask&rdquo; their symptoms &mdash; suppressing visible signs of difference at significant psychological cost. Late diagnosis carries measurable consequences: studies consistently find that undiagnosed autistic adults have substantially elevated rates of anxiety disorder, depression and suicidal ideation. For ADHD, late diagnosis is associated with higher rates of substance misuse, unemployment and criminal justice contact; research by Young et al. found that around 25% of prison populations meet diagnostic criteria for ADHD. Black and South Asian children are diagnosed autistic at lower rates than white peers despite similar or higher referral rates, pointing to diagnostic bias rather than true prevalence differences. The estimated 700,000 undiagnosed autistic adults are concentrated in groups least likely to have been referred as children: women, ethnic minorities and people who attended mainstream schools without specialist support.</p>
            <p>The SEND (Special Educational Needs and Disabilities) system is under simultaneous pressure from rising demand and chronically underfunded provision. EHC (Education, Health and Care) plan assessments &mdash; the legal document entitling a child to specialist support &mdash; take on average 26 weeks to complete, against a 20-week statutory maximum that only 50% of local authorities met in 2023. Autistic children are 7 times more likely to be permanently excluded from school than neurotypical peers; children with ADHD are excluded at similarly elevated rates, despite exclusion being contraindicated by the evidence on behaviour management. Specialist school places have not kept pace with the 140% increase in EHC plans since 2015, pushing families toward expensive out-of-area placements &mdash; which cost local authorities on average &pound;67,000 per pupil per year compared to &pound;6,000 for mainstream. The postcode lottery is pronounced: neighbouring local authorities show 10-fold variation in EHC plan refusal rates, and appeal success rates at tribunal consistently exceed 90%, suggesting that many refusals are not justified by need but by budget.</p>
            <p>NHS neurodevelopmental pathways are structurally understaffed. Clinical psychology, specialist nursing and psychiatry vacancies across CAMHS (Child and Adolescent Mental Health Services) and adult mental health services are significant contributors to the waiting list backlog. In the absence of timely NHS assessment, a private assessment market has grown to fill the gap: an estimated 300,000 private ADHD assessments took place in 2023, at between &pound;800 and &pound;3,000 each. The NHS &ldquo;Right to Choose&rdquo; policy formally allows patients to request assessment from any qualified independent provider at NHS cost, but implementation is inconsistent &mdash; many GP practices are unaware of patients&apos; entitlement, and shared care arrangements, which enable a GP to prescribe medication initiated by an independent clinician, are contested across roughly a third of ICBs. NICE guidelines (updated 2023) recommend that ADHD be treated with a combination of medication and behavioural support; medication-only pathways are described as inadequate. A separate crisis emerged in 2023 when ADHD medication &mdash; principally methylphenidate and lisdexamfetamine &mdash; was subject to national shortages lasting several months, affecting tens of thousands of patients already in treatment.</p>
            <p>The data picture has significant gaps. Autism prevalence estimates range from 1% to 2.5% of the population depending on methodology, diagnostic criteria and year of study; the most commonly cited figure of 1 in 100 is based on a 2006 survey that did not include adults. ADHD prevalence estimates range from 3% to 4% in children and from 2.5% to 4% in adults, but these are largely derived from studies conducted in the United States using DSM criteria, which differ from the ICD criteria used in NHS clinical practice. NHS England did not collect centralised autism waiting time data until 2020, making it impossible to reconstruct the full historical picture. Private diagnosis numbers are unknown and unregulated; no central register exists. Adult ADHD diagnosis data is collected through the Mental Health Services Dataset but is known to have significant gaps in provider coverage. Under-diagnosis in ethnic minority populations and women is documented in qualitative research but not routinely tracked in national datasets, meaning the figures presented here likely understate the true scale of the unmet need.</p>
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
