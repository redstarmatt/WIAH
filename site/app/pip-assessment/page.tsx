'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';
import RelatedTopics from '@/components/RelatedTopics';

const editorialRefs: Reference[] = [
  { num: 1, name: 'DWP', dataset: 'Personal Independence Payment Statistics', url: 'https://www.gov.uk/government/collections/personal-independence-payment-statistics', date: '2025' },
  { num: 2, name: 'HMCTS', dataset: 'Tribunal Statistics Quarterly', url: 'https://www.gov.uk/government/collections/tribunals-statistics', date: '2025' },
  { num: 3, name: 'National Audit Office', dataset: 'PIP and ESA Assessments', url: 'https://www.nao.org.uk', date: '2024' },
  { num: 4, name: 'Work and Pensions Select Committee', dataset: 'PIP Assessment Process Report', url: 'https://committees.parliament.uk/committee/164/work-and-pensions-committee/', date: '2024' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface DataPoint {
  year: number;
  totalClaimantsM: number;
  newAwardsThousands: number;
  mrSuccessPct: number;
  tribunalSuccessPct: number;
  avgWaitWeeks: number;
  clearanceTimeDays: number;
}

interface RegionData {
  region: string;
  avgWaitWeeks: number;
  tribunalSuccessPct: number;
}

interface TopicData {
  national: { timeSeries: DataPoint[] };
  byRegion: RegionData[];
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 11) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function PipAssessmentPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/pip-assessment/pip_assessment.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const caseloadSeries: Series[] = data
    ? [
        {
          id: 'totalClaimantsM',
          label: 'Total claimants (millions)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.totalClaimantsM,
          })),
        },
        {
          id: 'newAwardsThousands',
          label: 'New awards (thousands/year)',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.newAwardsThousands,
          })),
        },
      ]
    : [];

  const appealSeries: Series[] = data
    ? [
        {
          id: 'mrSuccessPct',
          label: 'Mandatory reconsideration success (%)',
          colour: '#F4A261',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.mrSuccessPct,
          })),
        },
        {
          id: 'tribunalSuccessPct',
          label: 'Tribunal success (%)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.tribunalSuccessPct,
          })),
        },
      ]
    : [];

  const waitTimeSeries: Series[] = data
    ? [
        {
          id: 'avgWaitWeeks',
          label: 'Average wait (weeks)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.avgWaitWeeks,
          })),
        },
        {
          id: 'clearanceTimeDays',
          label: 'Clearance time (days)',
          colour: '#6B7280',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.clearanceTimeDays,
          })),
        },
      ]
    : [];

  const caseloadAnnotations: Annotation[] = [
    { date: new Date(2017, 0, 1), label: '2017: DLA to PIP reassessment begins' },
    { date: new Date(2023, 0, 1), label: '2023: Managed migration from legacy benefits' },
  ];

  const appealAnnotations: Annotation[] = [
    { date: new Date(2022, 0, 1), label: '2022: Tribunal backlog hits 300,000' },
    { date: new Date(2024, 0, 1), label: '2024: PIP reform consultation' },
  ];

  const waitAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: COVID shifts to phone assessments' },
    { date: new Date(2025, 0, 1), label: '2025: Auto-renewal for some conditions' },
  ];

  // ── Derived values ────────────────────────────────────────────────────

  const latest = data?.national.timeSeries[data.national.timeSeries.length - 1];
  const earliest = data?.national.timeSeries[0];

  return (
    <>
      <TopicNav topic="PIP Assessment" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Poverty & Cost of Living"
          question="How Hard Is It to Claim Disability Benefits?"
          finding="3.7 million people claim Personal Independence Payment; 73% who appeal a rejected claim succeed at tribunal. Assessment waiting times exceed 26 weeks in some regions."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Personal Independence Payment is the main disability benefit in England and Wales,
              replacing Disability Living Allowance from 2013. It is meant to help with the extra
              costs of living with a long-term health condition or disability. The caseload has more
              than doubled in a decade, from 1.6 million in 2015 to 3.7 million in 2025.<Cite nums={1} /> This growth
              reflects both the ongoing reassessment of legacy DLA claimants and a sharp rise in new
              claims, particularly for mental health conditions among working-age adults.
            </p>
            <p>
              The assessment process itself has become a flashpoint. Claimants are assessed by
              private contractors — currently Capita and Atos — using a points-based functional
              assessment. Of those who are initially refused and pursue an appeal to the First-tier
              Tribunal, 73% have the decision overturned in their favour.<Cite nums={2} /> This overturn rate has
              risen every year since PIP was introduced. It suggests not that tribunals are too
              generous, but that initial assessments systematically underweight evidence — a finding
              echoed by the National Audit Office, the Work and Pensions Select Committee, and
              disability charities.<Cite nums={[3, 4]} /> The human cost is substantial: claimants report deteriorating
              mental health during the process, and some withdraw valid claims rather than face
              reassessment.
            </p>
            <p>
              Average waiting times have nearly tripled, from 8 weeks in 2015 to 21 weeks in 2025,
              with some regions exceeding 26 weeks.<Cite nums={1} /> The backlog is driven by rising claim volumes
              outstripping assessment capacity. In 2025, the government introduced automatic award
              renewals for certain severe conditions — a welcome change, but one that affects only a
              small fraction of the caseload.<Cite nums={1} /> For most claimants, the process remains slow, opaque,
              and adversarial.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-caseload', label: 'Caseload' },
          { id: 'sec-appeals', label: 'Appeals' },
          { id: 'sec-waits', label: 'Wait times' },
          { id: 'sec-regional', label: 'Regional' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="PIP claimants"
            value={latest ? `${latest.totalClaimantsM}m` : '3.7m'}
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText={
              earliest
                ? `Up from ${earliest.totalClaimantsM}m in ${earliest.year} \u00b7 +131% in a decade`
                : 'Up from 1.6m in 2015 \u00b7 growing fast'
            }
            sparklineData={
              data ? sparkFrom(data.national.timeSeries.map(d => d.totalClaimantsM)) : []
            }
            source="DWP \u00b7 PIP statistics quarterly, 2025"
            href="#sec-caseload"
          />
          <MetricCard
            label="Appeals won by claimant"
            value={latest ? `${latest.tribunalSuccessPct}%` : '73%'}
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Of tribunal appeals decided in claimant's favour"
            sparklineData={
              data ? sparkFrom(data.national.timeSeries.map(d => d.tribunalSuccessPct)) : []
            }
            source="HMCTS \u00b7 Tribunal statistics quarterly, 2025"
            href="#sec-appeals"
          />
          <MetricCard
            label="Average assessment wait"
            value={latest ? `${latest.avgWaitWeeks} weeks` : '21 weeks'}
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText={
              earliest
                ? `Up from ${earliest.avgWaitWeeks} weeks in ${earliest.year} \u00b7 some regions 26 weeks+`
                : 'Up from 8 weeks in 2015 \u00b7 some regions 26 weeks+'
            }
            sparklineData={
              data ? sparkFrom(data.national.timeSeries.map(d => d.avgWaitWeeks)) : []
            }
            source="DWP \u00b7 PIP management information, 2025"
            href="#sec-waits"
          />
        </div>

        {/* Chart 1: Caseload and new awards */}
        <ScrollReveal>
          <div id="sec-caseload" className="mb-12">
            <LineChart
              series={caseloadSeries}
              annotations={caseloadAnnotations}
              title="PIP caseload and new awards, England & Wales, 2015\u20132025"
              subtitle="Total PIP claimants (millions) and annual new awards (thousands). Growth driven by mental health conditions and rising applications from younger adults."
              yLabel="Count"
              source={{
                name: 'DWP',
                dataset: 'Personal Independence Payment statistics',
                frequency: 'quarterly',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Appeal outcomes */}
        <ScrollReveal>
          <div id="sec-appeals" className="mb-12">
            <LineChart
              series={appealSeries}
              annotations={appealAnnotations}
              title="PIP appeal outcomes, 2015\u20132025"
              subtitle="Percentage of PIP appeals at mandatory reconsideration and First-tier Tribunal decided in the claimant's favour. High overturn rates suggest systematic issues with initial decision-making."
              yLabel="Success rate (%)"
              source={{
                name: 'HMCTS',
                dataset: 'Tribunal statistics quarterly',
                frequency: 'quarterly',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Wait times */}
        <ScrollReveal>
          <div id="sec-waits" className="mb-12">
            <LineChart
              series={waitTimeSeries}
              annotations={waitAnnotations}
              title="PIP assessment waiting times, 2015\u20132025"
              subtitle="Average weeks from initial claim to assessment decision, and median clearance time in days. Both measures have risen sharply as claim volumes outstrip assessment capacity."
              yLabel="Time"
              source={{
                name: 'DWP',
                dataset: 'PIP management information',
                frequency: 'quarterly',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Regional variation */}
        <ScrollReveal>
          <div id="sec-regional" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                PIP assessment wait by region (weeks)
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                Average weeks from claim to assessment decision. Wide regional variation reflects differences in assessment centre capacity.
              </p>
              <div className="mt-6 space-y-4">
                {data?.byRegion.map((r) => {
                  const pct = (r.avgWaitWeeks / 30) * 100;
                  return (
                    <div key={r.region}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{r.region}</span>
                        <span className="font-mono text-sm font-bold text-wiah-black">
                          {r.avgWaitWeeks} weeks
                        </span>
                      </div>
                      <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{
                            width: `${pct}%`,
                            backgroundColor: r.avgWaitWeeks >= 24 ? '#E63946' : r.avgWaitWeeks >= 20 ? '#F4A261' : '#6B7280',
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">
                Source: DWP — PIP statistics, Stat-Xplore regional breakdowns, Q4 2025
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Removing mandatory reconsideration for some conditions"
            value="2025"
            unit="automatic awards for some long-term conditions"
            description="From 2025, DWP introduced automatic award renewals without reassessment for claimants with long-term, non-improving conditions — initially covering motor neurone disease, terminal illness and some severe progressive conditions. This removes approximately 100,000 people per year from the reassessment cycle. The government also committed to replacing paper forms with digital assessment tools and piloting recorded assessments to improve transparency and consistency."
            source="Source: DWP — PIP statistics quarterly, 2025. HMCTS — Tribunal statistics Q4 2025. NAO — PIP and ESA assessments, 2024."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        {/* Sources & Methodology */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-wiah-blue hover:underline"
                >
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
              {data?.metadata.knownIssues.map((x, i) => <li key={i}>{x}</li>)}
            </ul>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
