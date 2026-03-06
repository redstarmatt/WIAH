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

interface OutstandingCasesPoint {
  year: number;
  casesThousands: number;
}

interface TimeToHearingPoint {
  year: number;
  avgWeeks: number;
}

interface AnnualReceiptsPoint {
  year: number;
  claimsThousands: number;
}

interface EmploymentTribunalData {
  national: {
    outstandingCases: {
      timeSeries: OutstandingCasesPoint[];
      latestYear: number;
      latestThousands: number;
      note: string;
    };
    avgTimeToHearing: {
      timeSeries: TimeToHearingPoint[];
      latestYear: number;
      latestWeeks: number;
      note: string;
    };
    annualReceipts: {
      timeSeries: AnnualReceiptsPoint[];
      latestYear: number;
      latestThousands: number;
      note: string;
    };
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

// ── Page ─────────────────────────────────────────────────────────────────────

export default function EmploymentTribunalBacklogPage() {
  const [data, setData] = useState<EmploymentTribunalData | null>(null);

  useEffect(() => {
    fetch('/data/employment-tribunal-backlog/employment_tribunals.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const backlogSeries: Series[] = data
    ? [{
        id: 'backlog',
        label: 'Outstanding ET cases (thousands)',
        colour: '#6B7280',
        data: data.national.outstandingCases.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.casesThousands,
        })),
      }]
    : [];

  const waitTimeSeries: Series[] = data
    ? [
        {
          id: 'waitTime',
          label: 'Average weeks to final hearing',
          colour: '#E63946',
          data: data.national.avgTimeToHearing.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.avgWeeks,
          })),
        },
        {
          id: 'receipts',
          label: 'New claims (thousands)',
          colour: '#264653',
          data: data.national.annualReceipts.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.claimsThousands,
          })),
        },
      ]
    : [];

  const backlogAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Pandemic court closures' },
    { date: new Date(2022, 5, 1), label: '2022: Peak backlog of 58,000 cases' },
    { date: new Date(2024, 5, 1), label: '2024: Employment Rights Bill — more claims expected' },
  ];

  const waitAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Remote hearings introduced' },
    { date: new Date(2023, 5, 1), label: '2023: 51-week average reached' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Employment Tribunal Backlog" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Employment Tribunal Backlog"
          question="How Long Do Workers Wait for Justice?"
          finding="Single employment tribunal claims now take an average of 51 weeks to reach a final hearing. The outstanding caseload reached 54,000 cases in 2024, more than double the pre-pandemic level."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              An employment tribunal claim takes an average of 51 weeks from submission to final hearing in 2024. For a worker who has been unfairly dismissed, discriminated against, or denied their statutory rights, this means living in legal limbo for nearly a year &mdash; potentially without income, with the psychological burden of ongoing litigation, and facing an employer that has every financial incentive to delay. The system was designed for resolution in weeks, not a year; it has become a de facto filter that deters all but the most determined claimants.
            </p>
            <p>
              The backlog has structural causes. The 2013 introduction of employment tribunal fees &mdash; later ruled unlawful by the Supreme Court and abolished in 2017 &mdash; suppressed claims for four years; when fees fell, receipts permanently increased as access improved. The pandemic caused a surge in furlough disputes, redundancy claims, and unfair dismissal cases while simultaneously closing tribunal hearing centres. Despite remote hearings and judicial recruitment, the system has not returned to pre-pandemic throughput. The Employment Rights Bill, which extends day-one protection against unfair dismissal and adds several new jurisdictions, is expected to increase new receipts further, potentially pushing the backlog beyond 60,000.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-backlog', label: 'Backlog' },
          { id: 'sec-waittimes', label: 'Wait Times' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Outstanding employment tribunal cases"
              value="54,000"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+135% since pre-pandemic &middot; 2022 peak of 58,000"
              sparklineData={[23, 25, 45, 52, 58, 56, 54]}
              href="#sec-backlog"
            />
            <MetricCard
              label="Average wait for final hearing"
              value="51 weeks"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 27 weeks in 2018 &middot; Nearly a year&apos;s wait for resolution"
              sparklineData={[27, 29, 36, 42, 48, 51, 51]}
              href="#sec-backlog"
            />
            <MetricCard
              label="New ET claims per year"
              value="131,000"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Record high &middot; Post-pandemic 2013 fee abolition created permanent rise"
              sparklineData={[109, 121, 143, 107, 119, 126, 131]}
              href="#sec-backlog"
            />
          </div>
        </ScrollReveal>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-backlog" className="mb-12">
            <LineChart
              title="Outstanding employment tribunal cases, Great Britain, 2018&ndash;2024"
              subtitle="Total outstanding caseload at year end. Pre-pandemic level was approximately 24,000. The pandemic more than doubled this to a peak of 58,000 in 2022; partial recovery since has left 54,000 unresolved."
              series={backlogSeries}
              annotations={backlogAnnotations}
              yLabel="Outstanding cases (thousands)"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-waittimes" className="mb-12">
            <LineChart
              title="Average time to final hearing and annual new claims, ET, 2018&ndash;2024"
              subtitle="Average weeks from claim submission to final hearing (single claims), alongside annual new claim receipts. Both metrics have risen sharply since 2019. 51 weeks average in 2024."
              series={waitTimeSeries}
              annotations={waitAnnotations}
              yLabel="Weeks / Thousands"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s improving"
            value="HMCTS digital investment"
            unit=""
            description="The Employment Rights Bill 2024 extends worker protections but may increase caseload further. HMCTS is investing in judicial recruitment and digital systems to reduce the backlog. Early conciliation through Acas resolves approximately 30% of potential claims before they reach tribunal, preventing a significant volume of cases from entering the system. The planned introduction of provisional damages awards is intended to encourage faster settlement. Online claim submission has improved access for unrepresented claimants."
            source="Source: MOJ &mdash; Tribunal statistics 2024; HMCTS &mdash; Management information 2024."
          />
        </ScrollReveal>

        {/* Sources */}
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
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
