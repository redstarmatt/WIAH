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
            <p>Some 14.6 million people in the United Kingdom meet the Equality Act 2010 definition of disability &mdash; roughly one in five of the working-age population. Of these, 53.7% are in employment, against 82.1% of non-disabled people: a gap of 28.4 percentage points. Meanwhile 2.5 million people are economically inactive due to long-term sickness, up from 2.0 million before the pandemic. Personal Independence Payment claimants have risen to 3.6 million, and the annual disability benefits bill reached &pound;64 billion in 2023/24. Musculoskeletal conditions are the single largest cause of health-related inactivity, followed by mental health disorders, with Long COVID still affecting an estimated 900,000 people unable to work at full capacity.</p>
            <p>Structural barriers keep disabled people out of work even when they want it. Around 300,000 disabled adults actively seek employment but cannot find it. Disabled workers earn 13.8% less than non-disabled colleagues on average, and employment tribunals for disability discrimination rose 26% in 2023. The benefits system creates its own disincentives: PIP recipients face an effective cliff-edge, losing support after earning just &pound;23.70 a week above the work allowance. Employment rates vary sharply by condition &mdash; 26% for people with learning disabilities, 32% for those with autism or ADHD, 46% for mental health conditions. The pandemic added roughly 400,000 people to the long-term sick count, and that number has not fallen back.</p>
            <p>Policy is in flux. The original government target to halve the disability employment gap was quietly abandoned in 2017; no formal replacement exists. The DWP&apos;s 2023 Green Paper proposed shifting PIP from cash payments to in-kind support, prompting disability rights organisations to warn of increased poverty &mdash; particularly given that 44% of PIP appeals are overturned, with 7,200 claims reversed annually. The WorkWell programme (2024) integrates employment and health services, and Access to Work provided &pound;221 million in 2022/23 to 45,000 beneficiaries. Yet intersecting disadvantage persists: disabled women face a double pay penalty, and disabled people in the most deprived areas have an employment rate of just 18%, against 66% in the least deprived. The gap is narrowing &mdash; down from 33 percentage points in 2014 &mdash; but at the current pace, parity remains decades away.</p>
            <p>The 28.4 percentage point employment gap is an aggregate that conceals enormous variation by impairment type. Employment rates range from approximately 65&percnt; for people with hearing impairments to just 24&percnt; for those with mental health conditions&mdash;a disparity that reflects both the nature of different conditions and the rigidity of most workplace structures. Age compounds the picture: disabled people in their fifties face the intersection of ageism and disability discrimination, producing the lowest employment rates of any demographic group. Among those who do work, disabled people are significantly overrepresented in part-time and self-employment&mdash;arrangements that offer flexibility but typically deliver lower income, fewer protections, and limited career progression. Individual Placement and Support, an employment model developed for people with severe mental illness, has robust randomised controlled trial evidence demonstrating sustained employment outcomes, yet NHS and DWP provision remains patchy and underfunded. The Access to Work scheme&mdash;which funds workplace adjustments&mdash;has a backlog exceeding 17,000 applications awaiting assessment, while employer attitudes remain a persistent structural barrier. One in three managers admits reluctance to hire a disabled applicant, a figure that has barely shifted in a decade of awareness campaigns. Social housing tenants have markedly lower employment rates, partly because disability is concentrated in social tenancy populations, creating a compound disadvantage that housing and employment policy address in silos rather than together.</p>
            <p>Measuring the disability employment gap requires navigating definitional complexity that affects every published figure. The ONS Labour Force Survey defines disability as a long-term physical or mental health condition that limits daily activities&mdash;a self-reported measure that differs from the Equality Act 2010&apos;s legal definition and from the functional assessments used for Personal Independence Payment and Employment and Support Allowance. The gap has been measured consistently since 2013, but earlier data used different survey questions, making long-term trend analysis unreliable before that date. The headline employment rate includes all forms of work&mdash;part-time, temporary, and zero-hours contracts&mdash;which risks overstating meaningful economic participation for disabled workers in marginal or unsuitable roles. The Access to Work scheme&apos;s persistent underspend is not fully explained in published data: it may reflect genuine low demand, bureaucratic barriers that deter applications, or lack of awareness, but the available evidence does not distinguish between these explanations. PIP and ESA administrative records categorise disability differently from the Labour Force Survey, making it difficult to link benefit caseload data to employment statistics with precision. Employer self-reporting of reasonable adjustment provision may not reflect actual workplace practice. Disabled people are systematically underrepresented in most workplace and employee engagement surveys, meaning their day-to-day employment experiences remain poorly measured by the data infrastructure that is supposed to track progress.</p>
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
