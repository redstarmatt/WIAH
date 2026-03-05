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

interface DisabilityEmploymentData {
  national: {
    employmentGap: {
      timeSeries: Array<{ year: number; disabledEmploymentPct: number; nonDisabledPct: number }>;
      latestYear: number;
      latestDisabledPct: number;
      latestNonDisabledPct: number;
      latestGapPct: number;
    };
    benefitsClaimants: {
      timeSeries: Array<{ year: number; pipClaimantsMillions: number }>;
      latestYear: number;
      latestMillions: number;
    };
    byDisabilityType: Array<{ disabilityType: string; employmentPct: number }>;
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

export default function DisabilityEmploymentPage() {
  const [data, setData] = useState<DisabilityEmploymentData | null>(null);

  useEffect(() => {
    fetch('/data/disability-employment/disability_employment.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const disabledSeries: Series = {
    id: 'disabled',
    label: 'Disabled workers',
    colour: '#E63946',
    data: data ? data.national.employmentGap.timeSeries.map(d => ({
      date: yearToDate(d.year),
      value: d.disabledEmploymentPct,
    })) : [],
  };

  const nonDisabledSeries: Series = {
    id: 'non-disabled',
    label: 'Non-disabled workers',
    colour: '#2A9D8F',
    data: data ? data.national.employmentGap.timeSeries.map(d => ({
      date: yearToDate(d.year),
      value: d.nonDisabledPct,
    })) : [],
  };

  const pipSeries: Series[] = data
    ? [{
        id: 'pip',
        label: 'PIP claimants (millions)',
        colour: '#6B7280',
        data: data.national.benefitsClaimants.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.pipClaimantsMillions,
        })),
      }]
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Disability Employment" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Disability Employment"
          question="How Many Disabled People Are Being Left Out of Work?"
          finding="The disability employment gap stands at 28.4 percentage points &mdash; 53.7% of disabled people are in work, vs 82.1% of non-disabled people. 2.5 million people are out of work due to long-term sickness. PIP assessments are being overhauled as the benefits bill reaches &pound;64 billion. Disabled people are twice as likely to live in poverty."
          colour="#6B7280"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Some 14.6 million people in the UK meet the Equality Act definition of disability. Of these, 53.7% are in employment, against 82.1% of non-disabled people: a gap of 28.4 percentage points, down from 33 points in 2014 but closing slowly. Meanwhile 2.5 million people are economically inactive due to long-term sickness, up from 2.0 million before the pandemic &mdash; musculoskeletal conditions the single largest driver, followed by mental health disorders. PIP claimants have risen to 3.6 million and the annual disability benefits bill reached &pound;64 billion in 2023/24. The original government target to halve the employment gap was quietly abandoned in 2017 with no formal replacement; the WorkWell programme (2024) integrates employment and health services, and Access to Work provided &pound;221 million to 45,000 beneficiaries in 2022/23 &mdash; but the Access to Work backlog exceeds 17,000 applications awaiting assessment, and one in three managers admits reluctance to hire a disabled applicant.</p>
            <p>The 28.4 percentage point gap conceals enormous variation by condition: employment rates range from approximately 65% for people with hearing impairments to just 26% for those with learning disabilities and 32% for autism or ADHD. Disabled people in the most deprived areas have an employment rate of just 18%, against 66% in the least deprived. Disabled women face a double pay penalty. PIP recipients face a benefits cliff-edge that creates its own disincentives, and 44% of PIP appeals are overturned &mdash; 7,200 claims reversed annually &mdash; suggesting assessments are not reliably calibrated. At the current pace of gap closure, parity between disabled and non-disabled employment rates remains decades away.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-gap', label: 'Employment Gap' },
          { id: 'sec-pip', label: 'PIP Claims' },
          { id: 'sec-types', label: 'By Disability Type' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Disability employment gap (percentage points)"
              value="28.4pp"
              direction="down"
              polarity="up-is-bad"
              changeText="2023 &middot; 53.7% disabled in work vs 82.1% non-disabled &middot; Down from 33pp in 2014 &middot; But gap closing slowly"
              sparklineData={[36.4, 35.1, 33.6, 32.3, 30.8, 29.6, 28.2, 28.3, 28.7, 28.4]}
              onExpand={() => {}}
            />
            <MetricCard
              label="PIP (disability benefit) claimants"
              value="3.6M"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 &middot; Up from 1.5M in 2015 &middot; Benefits bill: &pound;64bn &middot; DWP overhauling assessments from 2025"
              sparklineData={[1.5, 1.8, 2.2, 2.5, 2.7, 2.8, 3.0, 3.2, 3.6]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Out of work due to long-term sickness"
              value="2.5M"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 &middot; Up from 2.0M pre-COVID &middot; 25% increase since 2019 &middot; Mental health &amp; musculoskeletal main causes"
              sparklineData={[2000, 2000, 2000, 2050, 2050, 2050, 2100, 2300, 2500]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-gap" className="mb-12">
            <LineChart
              title="Employment rate: disabled vs non-disabled people, UK, 2014&ndash;2023"
              subtitle="Percentage of working-age population in employment."
              series={[disabledSeries, nonDisabledSeries]}
              yLabel="Employment rate (%)"
              source={{
                name: 'ONS',
                dataset: 'Labour Force Survey &mdash; Disability and Employment',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-pip" className="mb-12">
            <LineChart
              title="Personal Independence Payment (PIP) claimants, England &amp; Wales, 2015&ndash;2023"
              subtitle="Number of people claiming PIP disability benefit."
              series={pipSeries}
              yLabel="Claimants (millions)"
              source={{
                name: 'DWP',
                dataset: 'PIP Statistics',
                frequency: 'quarterly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-types" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">Employment rate by disability type, UK, 2023</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Percentage of working-age people with each disability type in employment.</p>
            {data && (
              <div className="space-y-3">
                {data.national.byDisabilityType.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-40 text-sm text-wiah-black flex-shrink-0">{item.disabilityType}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{ width: `${(item.employmentPct / 61) * 100}%`, backgroundColor: '#6B7280' }}
                      />
                    </div>
                    <div className="w-16 text-right text-sm font-mono text-wiah-black">{item.employmentPct}%</div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: ONS &mdash; Labour Force Survey; Scope analysis of LFS microdata</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s improving"
            value="1M"
            unit="additional disabled people in employment since 2017 &mdash; the gap narrowed from 33pp to 28pp"
            description="The disability employment gap has narrowed from 33 percentage points in 2017 to 28.4 percentage points in 2023, representing approximately 1 million additional disabled people in work. The Access to Work scheme provided &pound;221 million in 2022/23 to support 45,000 disabled employees with workplace adjustments. The WorkWell programme (launched 2024) integrates employment support with health services for those at risk of long-term sickness absence. Disability Confident accreditation has been adopted by 19,000 employers, committing them to inclusive recruitment. The Supported Internship programme placed 5,500 young people with learning disabilities in paid employment in 2022/23."
            source="Source: ONS &mdash; Disability and Employment UK 2023; DWP &mdash; PIP Statistics 2023."
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
