'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// ── Types ────────────────────────────────────────────────────────────────────

interface FeeIncomePoint {
  year: number;
  incomeMillions: number;
}

interface ClaimsPoint {
  year: number;
  claimsMillions: number;
}

interface RemissionsPoint {
  year: number;
  remissionsThousands: number;
}

interface CourtFeesData {
  national: {
    feeIncome: {
      timeSeries: FeeIncomePoint[];
      latestYear: number;
      latestMillions: number;
      note: string;
    };
    claimsIssued: {
      timeSeries: ClaimsPoint[];
      latestYear: number;
      latestMillions: number;
      note: string;
    };
    feeRemissions: {
      timeSeries: RemissionsPoint[];
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

export default function CourtFeesPage() {
  const [data, setData] = useState<CourtFeesData | null>(null);

  useEffect(() => {
    fetch('/data/court-fees-access/court_fees.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const feeIncomeSeries: Series[] = data
    ? [{
        id: 'feeIncome',
        label: 'Civil court fee income (£ millions)',
        colour: '#6B7280',
        data: data.national.feeIncome.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.incomeMillions,
        })),
      }]
    : [];

  const claimsAndRemissionsSeries: Series[] = data
    ? [
        {
          id: 'claims',
          label: 'Civil claims issued (millions)',
          colour: '#6B7280',
          data: data.national.claimsIssued.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.claimsMillions,
          })),
        },
        {
          id: 'remissions',
          label: 'Fee remissions granted (thousands)',
          colour: '#2A9D8F',
          data: data.national.feeRemissions.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.remissionsThousands,
          })),
        },
      ]
    : [];

  const feeAnnotations: Annotation[] = [
    { date: new Date(2015, 5, 1), label: '2015: Employment tribunal fees ruled unlawful' },
    { date: new Date(2017, 5, 1), label: '2017: SC ruling — tribunal fees abolished' },
    { date: new Date(2022, 5, 1), label: '2022: Online civil money claims expanded' },
  ];

  const claimsAnnotations: Annotation[] = [
    { date: new Date(2013, 5, 1), label: '2013: Fee increases — civil claims begin falling' },
    { date: new Date(2020, 5, 1), label: '2020: COVID-19 court closures — sharp fall' },
  ];

  // ── Sparkline helpers ────────────────────────────────────────────────────

  const feeSparkline = data
    ? data.national.feeIncome.timeSeries.map(d => d.incomeMillions)
    : [];
  const claimsSparkline = data
    ? data.national.claimsIssued.timeSeries.map(d => d.claimsMillions)
    : [];
  const remissionsSparkline = data
    ? data.national.feeRemissions.timeSeries.map(d => d.remissionsThousands)
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Court Fee Barriers" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Court Fee Barriers"
          question="Has Justice Become Unaffordable?"
          finding="Court fee income reached £780 million in 2023/24, with some civil court fees over £10,000. The number of civil claims issued has fallen 40% since 2010 fee increases. Fee remissions protect the poorest, but middle-income earners are priced out."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              HMCTS is expected to be &ldquo;financially sustainable&rdquo; through fee recovery — a policy that has fundamentally reshaped who can access civil justice. Fees for high-value claims exceed £10,000 at issue alone, and multiple hearing fees can add substantially to that. Employment tribunal fees — introduced in 2013 and struck down by the Supreme Court in 2017 as an unlawful restriction on access to justice — caused a 70% collapse in claims during their four-year existence. That case established a precedent: fees at a level that prevents ordinary people from exercising their legal rights are unconstitutional.
            </p>
            <p>
              Civil claims issued annually have fallen from 2.2 million in 2010 to 1.3 million in 2024 — a 40% decline against a backdrop of population growth and rising disputes. Legal aid reforms under the Legal Aid, Sentencing and Punishment of Offenders Act 2012 simultaneously removed eligibility for most civil legal advice, meaning many people face court costs without representation. The Help with Fees scheme (EX160) provides remissions for those on qualifying benefits or low incomes, with 600,000 remissions granted in 2024. But the income thresholds have not been uprated with inflation, and the majority of working people who cannot afford court fees do not qualify for help. The justice gap is widest for employment, housing, family and debt disputes affecting working and middle-income households.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-income', label: 'Fee Income' },
          { id: 'sec-claims', label: 'Claims & Remissions' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Civil court fee income"
              value="£780M"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="2023/24 · Courts as revenue generators, not public service"
              sparklineData={feeSparkline}
              href="#sec-income"
            />
            <MetricCard
              label="Civil claims issued annually"
              value="1.3M"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="Down 40% from 2010 peak · Fee hikes suppressing access to justice"
              sparklineData={claimsSparkline}
              href="#sec-income"
            />
            <MetricCard
              label="Fee remissions granted"
              value="600,000"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Qualifying low-income claimants · Middle income earners excluded"
              sparklineData={remissionsSparkline}
              href="#sec-income"
            />
          </div>
        

        {/* Chart 1: Fee income */}
        <ScrollReveal>
          <section id="sec-income" className="mb-12">
            <LineChart
              title="Civil court fee income, England and Wales, 2015–2024"
              subtitle="Annual fee income collected by HM Courts &amp; Tribunals Service from civil proceedings (£ millions). Fees have increased every year except 2020, when COVID-19 court closures briefly reduced income."
              series={feeIncomeSeries}
              annotations={feeAnnotations}
              yLabel="£ millions"
            />
          </section>
        </ScrollReveal>

        {/* Chart 2: Claims and remissions */}
        <ScrollReveal>
          <section id="sec-claims" className="mb-12">
            <LineChart
              title="Civil claims issued and fee remissions granted, 2010–2024"
              subtitle="Civil claims issued per year (millions, left scale) and Help with Fees remissions granted (thousands, right scale). Claims fell steeply after 2013 fee increases. Remissions protect the very poorest but threshold has not kept pace with inflation."
              series={claimsAndRemissionsSeries}
              annotations={claimsAnnotations}
              yLabel="Claims (M) / Remissions (000s)"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="Online Courts"
            unit="Digital access expanding"
            description="The Online Civil Money Claims service has made lower-value claims accessible digitally without requiring court attendance. The Access to Justice Foundation funds civil legal aid for those falling between fee remission thresholds and legal aid eligibility. The Law Society and Bar Council have called for fee thresholds to be index-linked to prevent further erosion of access. The government's Civil Justice Council is reviewing the fee structure with a report expected in 2025."
            source="Source: HMCTS — Online civil money claims service statistics 2024. Access to Justice Foundation — Annual report 2023."
          />
        </ScrollReveal>

        {/* Sources */}
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                  {src.name} — {src.dataset}
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
              <RelatedTopics />
      </main>
    </>
  );
}
