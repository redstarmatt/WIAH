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

interface RemediationPoint {
  date: string;
  identified: number;
  started: number;
  completed: number;
  completedPct: number;
}

interface StatusPoint {
  date: string;
  fullyRemediated: number;
  inProgress: number;
  notStarted: number;
}

interface FundingPoint {
  date: string;
  allocatedBn: number;
  spentBn: number;
}

interface FireSafetyData {
  topic: string;
  lastUpdated: string;
  national: {
    remediationProgress: {
      timeSeries: RemediationPoint[];
    };
    buildingsByStatus: {
      data: StatusPoint[];
    };
    fundingAllocatedVsSpent: {
      timeSeries: FundingPoint[];
    };
    summary: {
      buildingsAwaiting: number;
      remediationCompletePct: number;
      estimatedTotalCostBn: number;
      bsfAllocatedBn: number;
      bsfSpentBn: number;
      developerPledgeBn: number;
      developersSignedContract: number;
      leaseholdersAffected: number;
      wakingWatchMonthlyCostRange: string;
    };
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function isoToDate(s: string): Date {
  return new Date(s + '-01');
}

function sparkFrom(arr: number[], n = 12) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function FireSafetyBuildingsPage() {
  const [data, setData] = useState<FireSafetyData | null>(null);

  useEffect(() => {
    fetch('/data/fire-safety-buildings/fire_safety_buildings.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  // Chart 1: Cladding remediation progress 2020-2025 (identified vs completed)
  const remediationSeries: Series[] = data
    ? [
        {
          id: 'identified',
          label: 'Buildings identified',
          colour: '#E63946',
          data: data.national.remediationProgress.timeSeries.map(d => ({
            date: isoToDate(d.date),
            value: d.identified,
          })),
        },
        {
          id: 'started',
          label: 'Remediation started',
          colour: '#F4A261',
          data: data.national.remediationProgress.timeSeries.map(d => ({
            date: isoToDate(d.date),
            value: d.started,
          })),
        },
        {
          id: 'completed',
          label: 'Remediation completed',
          colour: '#2A9D8F',
          data: data.national.remediationProgress.timeSeries.map(d => ({
            date: isoToDate(d.date),
            value: d.completed,
          })),
        },
      ]
    : [];

  const remediationAnnotations: Annotation[] = [
    { date: new Date(2022, 3, 1), label: 'Building Safety Act 2022' },
    { date: new Date(2024, 8, 1), label: 'Grenfell Inquiry final report' },
  ];

  // Chart 2: Buildings by remediation status (stacked bar shown as area/line)
  const statusCompletedSeries: Series[] = data
    ? [
        {
          id: 'status-completed',
          label: 'Fully remediated',
          colour: '#2A9D8F',
          data: data.national.buildingsByStatus.data.map(d => ({
            date: isoToDate(d.date),
            value: d.fullyRemediated,
          })),
        },
        {
          id: 'status-in-progress',
          label: 'In progress',
          colour: '#F4A261',
          data: data.national.buildingsByStatus.data.map(d => ({
            date: isoToDate(d.date),
            value: d.inProgress,
          })),
        },
        {
          id: 'status-not-started',
          label: 'Not started',
          colour: '#E63946',
          data: data.national.buildingsByStatus.data.map(d => ({
            date: isoToDate(d.date),
            value: d.notStarted,
          })),
        },
      ]
    : [];

  // Chart 3: Funding allocated vs spent
  const fundingSeries: Series[] = data
    ? [
        {
          id: 'allocated',
          label: 'Funding allocated',
          colour: '#264653',
          data: data.national.fundingAllocatedVsSpent.timeSeries.map(d => ({
            date: isoToDate(d.date),
            value: d.allocatedBn,
          })),
        },
        {
          id: 'spent',
          label: 'Funding spent',
          colour: '#2A9D8F',
          data: data.national.fundingAllocatedVsSpent.timeSeries.map(d => ({
            date: isoToDate(d.date),
            value: d.spentBn,
          })),
        },
      ]
    : [];

  // Sparkline data
  const awaitingSparkline = data
    ? sparkFrom(data.national.remediationProgress.timeSeries.map(d => d.identified - d.completed))
    : [];

  const completedPctSparkline = data
    ? sparkFrom(data.national.remediationProgress.timeSeries.map(d => d.completedPct))
    : [];

  const costSparkline = [12.2, 13.1, 14.0, 14.8, 15.4, 15.9, 16.4];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Fire Safety in Buildings" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Fire Safety in Buildings"
          question="Is Your Building Actually Safe?"
          finding="Eight years after the Grenfell Tower fire killed 72 people, more than 4,630 high-rise buildings with dangerous cladding are still awaiting remediation. Only 41% of identified buildings have been fully remediated and signed off. An estimated 300,000 leaseholders remain trapped in homes they cannot sell, remortgage, or adequately insure."
          colour="#E63946"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The Grenfell Tower fire of 14 June 2017, which killed 72 people, exposed a catastrophic failure of building safety regulation in England. Combustible cladding on the tower&apos;s exterior enabled the fire to spread with lethal speed, but subsequent investigation revealed the crisis extended far beyond one building. Eight years on, 4,630 or more high-rise residential buildings have been identified with unsafe cladding or serious fire safety defects. The government committed a Building Safety Fund of 5.1 billion pounds, but only around 30 per cent of the allocated money has been spent, and just 41 per cent of identified buildings have completed remediation. The estimated total cost of making all affected buildings safe now exceeds 16 billion pounds, a figure that continues to rise as inspections uncover non-cladding defects including compartmentation failures, missing fire stops, and defective fire doors. The Building Safety Act 2022 created a new regulatory regime and established the principle that leaseholders in buildings above 11 metres should not bear remediation costs, but implementation has been painfully slow. Many building owners have been reluctant to register for available schemes, and some are overseas entities beyond effective regulatory reach.
            </p>
            <p>
              For the hundreds of thousands of leaseholders caught in this crisis, the consequences are financial and deeply personal. Residents in buildings awaiting remediation face waking watch costs of 10,000 to 50,000 pounds per month per building, charged back to leaseholders through service charges. Many cannot sell because mortgage lenders will not advance loans against buildings with known fire safety defects, and insurance premiums have multiplied by factors of five or ten. Mid-rise buildings between 11 and 18 metres are the forgotten category: many have no access to government funding, and their residents face remediation bills of tens of thousands of pounds per flat. Forty-nine major developers have signed the government&apos;s remediation contract, committing a total of 5.5 billion pounds to fix buildings they constructed, but enforcement of the pledge is patchy and progress varies enormously between companies. Multiple academic studies have documented the severe mental health impact on affected residents, including anxiety, depression, and a persistent sense of being trapped. The Responsible Actors Scheme, which bars non-compliant developers from building control approval, represents the strongest enforcement mechanism yet deployed, but the gap between the scale of the problem and the pace of the response remains stark.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key figures' },
          { id: 'sec-remediation', label: 'Remediation progress' },
          { id: 'sec-status', label: 'Buildings by status' },
          { id: 'sec-funding', label: 'Funding gap' },
          { id: 'sec-positive', label: 'What\'s changing' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* ── Metric Cards ──────────────────────────────────────────────────── */}

        <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Buildings awaiting remediation"
            value={data ? (data.national.summary.buildingsAwaiting - Math.round(data.national.summary.buildingsAwaiting * data.national.summary.remediationCompletePct / 100)).toLocaleString() : '—'}
            direction="up"
            polarity="up-is-bad"
            changeText="Dec 2025 · 8 years after Grenfell · ~300K leaseholders affected"
            sparklineData={awaitingSparkline}
            href="#sec-remediation"
          />
          <MetricCard
            label="Remediation complete"
            value={data ? `${data.national.summary.remediationCompletePct}%` : '—'}
            direction="up"
            polarity="up-is-good"
            changeText="Of identified buildings · pace accelerating since 2024"
            sparklineData={completedPctSparkline}
            href="#sec-remediation"
          />
          <MetricCard
            label="Estimated total cost"
            value={data ? `\u00A3${data.national.summary.estimatedTotalCostBn}bn` : '—'}
            direction="up"
            polarity="up-is-bad"
            changeText="Rising as non-cladding defects discovered · BSF: \u00A35.1bn allocated, \u00A33.4bn spent"
            sparklineData={costSparkline}
            href="#sec-funding"
          />
        </div>

        {/* ── Chart 1: Remediation progress ─────────────────────────────────── */}

        <ScrollReveal>
          <section id="sec-remediation" className="mb-12">
            <LineChart
              title="Cladding remediation progress, England, 2020\u20132025"
              subtitle="Cumulative buildings identified, remediation started, and remediation completed."
              series={remediationSeries}
              annotations={remediationAnnotations}
              yLabel="Buildings"
              source={{
                name: 'DLUHC',
                dataset: 'Building Safety Remediation Monthly Data Release',
                url: 'https://www.gov.uk/government/publications/building-safety-remediation-monthly-data-release',
                frequency: 'monthly',
              }}
            />
          </section>
        </ScrollReveal>

        {/* ── Chart 2: Buildings by status ────────────────────────────────────── */}

        <ScrollReveal>
          <section id="sec-status" className="mb-12">
            <LineChart
              title="Buildings by remediation status, England, 2020\u20132025"
              subtitle="Number of buildings fully remediated, with work in progress, and where remediation has not started."
              series={statusCompletedSeries}
              yLabel="Buildings"
              source={{
                name: 'DLUHC',
                dataset: 'Building Safety Programme Monthly Data Release',
                url: 'https://www.gov.uk/government/collections/building-safety-programme',
                frequency: 'monthly',
              }}
            />
          </section>
        </ScrollReveal>

        {/* ── Chart 3: Funding allocated vs spent ────────────────────────────── */}

        <ScrollReveal>
          <section id="sec-funding" className="mb-12">
            <LineChart
              title="Building Safety Fund: allocated vs spent, 2020\u20132025"
              subtitle="Cumulative government funding allocated and actual expenditure in billions of pounds."
              series={fundingSeries}
              yLabel="\u00A3 billion"
              source={{
                name: 'DLUHC',
                dataset: 'Building Safety Remediation Monthly Data Release',
                url: 'https://www.gov.uk/government/publications/building-safety-remediation-monthly-data-release',
                frequency: 'monthly',
              }}
            />
          </section>
        </ScrollReveal>

        {/* ── Positive Callout ────────────────────────────────────────────────── */}

        <ScrollReveal>
          <section id="sec-positive">
            <PositiveCallout
              title="What's changing"
              value="49"
              unit="developers signed remediation contract"
              description="The Responsible Actors Scheme barred non-compliant developers from building control approval. 49 major developers signed the remediation contract, committing \u00A35.5bn to fix buildings they constructed. The pace of starts has accelerated \u2014 more buildings entered remediation in 2024 than in any prior year."
              source="Source: DLUHC \u2014 Building Safety Remediation Monthly Data Release 2025; Responsible Actors Scheme register."
            />
          </section>
        </ScrollReveal>

        {/* ── Sources & Methodology ──────────────────────────────────────────── */}

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

        <RelatedTopics />
      </main>
    </>
  );
}
