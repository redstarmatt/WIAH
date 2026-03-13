'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

// ── Types ────────────────────────────────────────────────────────────────────

interface DataPoint {
  year: number;
  excellentPct: number;
  goodPct: number;
  sufficientPct: number;
  poorPct: number;
  dischargeEvents: number;
  durationHours: number;
  bathingWatersSampled: number;
}

interface RiverQualityPoint {
  year: number;
  goodEcologicalStatusPct: number;
  totalRiverBodies: number;
}

interface WaterCompany {
  company: string;
  dischargeEvents2024: number;
  durationHours2024: number;
  averagePerCSO: number;
  bathingWatersExcellentPct: number;
}

interface TopicData {
  national: { timeSeries: DataPoint[] };
  riverQuality: RiverQualityPoint[];
  byWaterCompany: WaterCompany[];
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

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

const editorialRefs: Reference[] = [
  { num: 1, name: 'Environment Agency', dataset: 'Bathing water quality classifications', url: 'https://environment.data.gov.uk/bwq/profiles/', date: '2025' },
  { num: 2, name: 'Environment Agency', dataset: 'Event Duration Monitoring data', url: 'https://environment.data.gov.uk/dataset/21e15f12-0df8-4bfc-b763-45226c16a8ac', date: '2025' },
  { num: 3, name: 'Environment Agency', dataset: 'Water Framework Directive river classifications', url: 'https://environment.data.gov.uk/catchment-planning/', date: '2024' },
  { num: 4, name: 'Defra', dataset: 'Storm Overflows Discharge Reduction Plan', url: 'https://www.gov.uk/government/publications/storm-overflows-discharge-reduction-plan', date: '2022' },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function BathingWaterQualityPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/bathing-water-quality/bathing_water_quality.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const qualitySeries: Series[] = data
    ? [
        {
          id: 'excellent',
          label: 'Excellent (%)',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.excellentPct,
          })),
        },
        {
          id: 'poor',
          label: 'Poor (%)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.poorPct,
          })),
        },
      ]
    : [];

  const dischargeSeries: Series[] = data
    ? [
        {
          id: 'events',
          label: 'Discharge events (thousands)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.dischargeEvents,
          })),
        },
        {
          id: 'hours',
          label: 'Duration hours (thousands)',
          colour: '#F4A261',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.durationHours,
          })),
        },
      ]
    : [];

  const riverSeries: Series[] = data
    ? [
        {
          id: 'rivers',
          label: 'Rivers at good ecological status (%)',
          colour: '#264653',
          data: data.riverQuality.map(d => ({
            date: yearToDate(d.year),
            value: d.goodEcologicalStatusPct,
          })),
        },
      ]
    : [];

  const latest = data?.national.timeSeries[data.national.timeSeries.length - 1];
  const earliest = data?.national.timeSeries[0];
  const latestRiver = data?.riverQuality[data.riverQuality.length - 1];
  const earliestRiver = data?.riverQuality[0];

  const excellentChange =
    latest && earliest
      ? (latest.excellentPct - earliest.excellentPct).toFixed(1)
      : '-24.4';

  const dischargeIncreasePct =
    latest && earliest
      ? Math.round(
          ((latest.dischargeEvents - earliest.dischargeEvents) /
            earliest.dischargeEvents) *
            100
        )
      : 227;

  return (
    <>
      <TopicNav topic="Bathing Water Quality" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment & Climate"
          question="Is It Safe to Swim in the UK's Seas and Rivers?"
          finding="Only 52% of designated bathing waters in England were rated 'excellent' in 2025, down from 76% in 2010. Sewage overflow events have more than tripled over the same period. Just 14% of rivers meet good ecological status."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              England&apos;s bathing waters have been declining for over a decade. In 2010,
              more than three-quarters of designated bathing sites achieved the
              Environment Agency&apos;s &apos;excellent&apos; classification; by 2025, that
              figure had fallen to just 52%. At the same time, the proportion rated
              &apos;poor&apos; -- failing to meet even minimum microbiological standards -- has
              risen from 3% to over 15%. The trend is being driven by a combination
              of ageing sewage infrastructure, population growth in coastal catchment
              areas, and increasingly intense rainfall events linked to climate change.
            </p>
            <p>
              Combined sewer overflow (CSO) discharges are central to this story.
              England&apos;s Victorian-era combined sewerage system was designed to release
              untreated sewage into rivers and the sea during heavy rainfall. Event
              Duration Monitoring data -- mandatory for all CSOs since 2023 -- shows
              that discharge events have more than tripled since 2010, reaching
              464,000 events and over 4.1 million hours of spilling in 2025. Water
              companies have faced record fines, and public anger has driven
              significant policy commitments: the Storm Overflows Discharge Reduction
              Plan requires near-elimination of harmful discharges at designated
              bathing waters by 2035, and at all sites by 2050.
            </p>
            <p>
              England&apos;s rivers tell a similar story. Only 14% of river water bodies
              currently meet &apos;good ecological status&apos; under Water Framework Directive
              criteria -- down from 27% in 2010. Agricultural run-off, sewage
              pollution, and road drainage all contribute. The data below tracks
              these trends across bathing water quality, sewage discharges, and river
              health, with a breakdown by water company.
            </p>
          </div>
        </section>

        <SectionNav
          sections={[
            { id: 'sec-overview', label: 'Overview' },
            { id: 'sec-quality', label: 'Bathing water quality' },
            { id: 'sec-discharge', label: 'Sewage discharges' },
            { id: 'sec-rivers', label: 'River health' },
            { id: 'sec-companies', label: 'By water company' },
          ]}
        />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Bathing waters rated 'excellent'"
            value={latest ? `${latest.excellentPct}%` : '51.8%'}
            unit="2025"
            direction="down"
            polarity="up-is-good"
            changeText={`${excellentChange} pp since 2010 · worst on record`}
            sparklineData={
              data
                ? sparkFrom(data.national.timeSeries.map(d => d.excellentPct))
                : [76, 74, 73, 71, 69, 65, 62, 58, 55, 52]
            }
            source="Environment Agency · Bathing water quality classifications, 2025"
            href="#sec-quality"
          />
          <MetricCard
            label="Sewage discharge events (England)"
            value={latest ? `${latest.dischargeEvents.toLocaleString()}k` : '464k'}
            unit="2025"
            direction="up"
            polarity="up-is-bad"
            changeText={`+${dischargeIncreasePct}% since 2010 · 4.1m hours total`}
            sparklineData={
              data
                ? sparkFrom(data.national.timeSeries.map(d => d.dischargeEvents))
                : [200, 210, 225, 260, 310, 372, 389, 425, 458, 464]
            }
            source="Environment Agency · Event Duration Monitoring data, 2025"
            href="#sec-discharge"
          />
          <MetricCard
            label="Rivers at good ecological status"
            value={latestRiver ? `${latestRiver.goodEcologicalStatusPct}%` : '14%'}
            unit="2024"
            direction="down"
            polarity="up-is-good"
            changeText={
              latestRiver && earliestRiver
                ? `Down from ${earliestRiver.goodEcologicalStatusPct}% in ${earliestRiver.year} · ${latestRiver.totalRiverBodies.toLocaleString()} river bodies assessed`
                : 'Down from 27% in 2010 · 4,865 river bodies assessed'
            }
            sparklineData={
              data
                ? data.riverQuality.map(d => d.goodEcologicalStatusPct)
                : [27, 24.5, 21.8, 17.2, 16, 14.6, 14]
            }
            source="Environment Agency · Water Framework Directive classifications, 2024"
            href="#sec-rivers"
          />
        </div>

        {/* Chart 1: Bathing water quality ratings */}
        <ScrollReveal>
          <div id="sec-quality" className="mb-12">
            <LineChart
              series={qualitySeries}
              title="Bathing water quality ratings, England, 2010–2025"
              subtitle="Percentage of designated bathing waters rated 'excellent' vs 'poor' under Environment Agency classification. Based on 4-year rolling geometric mean of microbiological samples."
              yLabel="Percentage"
              annotations={[
                { date: new Date(2015, 0, 1), label: '2015: Revised Bathing Water Directive applied' },
                { date: new Date(2023, 0, 1), label: '2023: Water company fines record high' },
              ]}
              source={{
                name: 'Environment Agency',
                dataset: 'Bathing water quality classifications',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Sewage discharge events */}
        <ScrollReveal>
          <div id="sec-discharge" className="mb-12">
            <LineChart
              series={dischargeSeries}
              title="Sewage overflow events and duration, England, 2010–2025"
              subtitle="Combined sewer overflow discharge events (thousands) and total discharge duration (thousands of hours). EDM monitoring became mandatory for all overflows from 2023."
              yLabel="Count (thousands)"
              annotations={[
                { date: new Date(2019, 0, 1), label: '2019: Sewage monitoring rollout begins' },
                { date: new Date(2022, 0, 1), label: '2022: Environment Act passes' },
              ]}
              source={{
                name: 'Environment Agency',
                dataset: 'Event Duration Monitoring data',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: River ecological status */}
        <ScrollReveal>
          <div id="sec-rivers" className="mb-12">
            <LineChart
              series={riverSeries}
              title="Rivers in good ecological status, England, 2010–2024"
              subtitle="Percentage of river water bodies classified as 'good' or better under Water Framework Directive criteria. Assessed against biological, chemical, and hydromorphological standards."
              yLabel="Percentage"
              annotations={[
                { date: new Date(2019, 0, 1), label: '2019: New chemical standards introduced' },
              ]}
              source={{
                name: 'Environment Agency',
                dataset: 'Water Framework Directive river classifications',
                frequency: 'triennial / annual from 2024',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Water company breakdown */}
        <ScrollReveal>
          <div id="sec-companies" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Sewage discharge events by water company, 2024
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                Total CSO discharge events recorded via Event Duration Monitoring. Companies sorted by total events.
              </p>
              <div className="mt-6 space-y-4">
                {data?.byWaterCompany
                  .sort((a, b) => b.dischargeEvents2024 - a.dischargeEvents2024)
                  .map(c => {
                    const maxEvents = 75000;
                    const pct = Math.min(
                      (c.dischargeEvents2024 / maxEvents) * 100,
                      100
                    );
                    return (
                      <div key={c.company}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-wiah-black">
                            {c.company}
                          </span>
                          <span className="font-mono text-sm font-bold text-wiah-black">
                            {c.dischargeEvents2024.toLocaleString()}
                          </span>
                        </div>
                        <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                          <div
                            className="h-full rounded-sm transition-all"
                            style={{
                              width: `${pct}%`,
                              backgroundColor:
                                c.dischargeEvents2024 > 50000
                                  ? '#E63946'
                                  : c.dischargeEvents2024 > 35000
                                    ? '#F4A261'
                                    : '#6B7280',
                            }}
                          />
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="font-mono text-xs text-wiah-mid">
                            {c.durationHours2024.toLocaleString()} hours ·{' '}
                            {c.averagePerCSO} avg per CSO
                          </span>
                          <span className="font-mono text-xs text-wiah-mid">
                            {c.bathingWatersExcellentPct}% bathing waters
                            excellent
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-6">
                Source: Environment Agency — Event Duration Monitoring data, 2024.
                Bathing water classifications from Environment Agency annual report,
                2024.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Storm Overflows Discharge Reduction Plan targets"
            value="2035"
            unit="near-elimination at bathing waters"
            description="Under the Environment Act 2021 and the Storm Overflows Discharge Reduction Plan, water companies are legally required to achieve near-total elimination of harmful sewage discharges at all designated bathing waters and high-priority ecological sites by 2035, and at all overflow points by 2050. Investment plans submitted to Ofwat for 2025-30 include an unprecedented £10.2 billion earmarked for storm overflow improvements — the largest single infrastructure commitment in the water sector's history. Ofwat's PR24 determinations also introduced automatic penalties for persistent poor performance, and the Environment Agency has committed to quadrupling its inspection regime by 2026."
            source="Source: Defra — Storm Overflows Discharge Reduction Plan, 2022. Ofwat — PR24 final determinations, 2025. Environment Agency — Annual report, 2025."
          />
        </ScrollReveal>

        <RelatedTopics />

        {/* Sources & methodology */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">
            Sources &amp; Methodology
          </h2>
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
                <div className="text-xs text-wiah-mid">
                  Updated {src.frequency}
                </div>
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
              {data?.metadata.knownIssues.map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
