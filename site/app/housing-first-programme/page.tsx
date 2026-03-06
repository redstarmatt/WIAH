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

interface PlacementsPoint {
  year: number;
  cumulativePlacements: number;
}

interface RetentionPoint {
  year: number;
  retentionPercent: number;
}

interface RoughSleepersPoint {
  year: number;
  roughSleeperCount: number;
}

interface HousingFirstData {
  national: {
    placements: {
      timeSeries: PlacementsPoint[];
      latestYear: number;
      latestPlacements: number;
      note: string;
    };
    retentionRate: {
      timeSeries: RetentionPoint[];
      latestYear: number;
      latestPercent: number;
      note: string;
    };
    roughSleepers: {
      timeSeries: RoughSleepersPoint[];
      latestYear: number;
      latestCount: number;
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

export default function HousingFirstPage() {
  const [data, setData] = useState<HousingFirstData | null>(null);

  useEffect(() => {
    fetch('/data/housing-first-programme/housing_first.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const placementsSeries: Series[] = data
    ? [{
        id: 'placements',
        label: 'Housing First placements (cumulative)',
        colour: '#264653',
        data: data.national.placements.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.cumulativePlacements,
        })),
      }]
    : [];

  const roughSleepersSeries: Series[] = data
    ? [
        {
          id: 'roughSleepers',
          label: 'Rough sleepers (annual count)',
          colour: '#E63946',
          data: data.national.roughSleepers.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.roughSleeperCount,
          })),
        },
        {
          id: 'retention',
          label: 'Housing retention at 2 years (%)',
          colour: '#2A9D8F',
          data: data.national.retentionRate.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.retentionPercent,
          })),
        },
      ]
    : [];

  const placementsAnnotations: Annotation[] = [
    { date: new Date(2019, 5, 1), label: '2019: Three large-scale English pilots begin' },
    { date: new Date(2022, 5, 1), label: '2022: Pilot evaluation published — 80% retention' },
    { date: new Date(2024, 5, 1), label: '2024: Scotland national rollout fully operational' },
  ];

  const roughSleepersAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Everyone In — rough sleepers housed during COVID' },
    { date: new Date(2022, 5, 1), label: '2022: Numbers rise again as emergency funding ends' },
  ];

  // ── Sparkline helpers ────────────────────────────────────────────────────

  const placementsSparkline = data
    ? data.national.placements.timeSeries.map(d => d.cumulativePlacements)
    : [];
  const retentionSparkline = data
    ? data.national.retentionRate.timeSeries.map(d => d.retentionPercent)
    : [];
  const roughSleepersSparkline = data
    ? data.national.roughSleepers.timeSeries.map(d => d.roughSleeperCount)
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Housing First" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Housing First"
          question="What If You Just Give Homeless People a Home?"
          finding="Housing First &mdash; giving unconditional homes to the most complex homeless people &mdash; achieves 80% housing retention. England&apos;s pilot reached 1,400 people. Scotland has committed to national rollout. The evidence base is strong but funding is limited."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Housing First turns conventional homelessness policy on its head. Traditional &ldquo;staircase&rdquo; models require rough sleepers to demonstrate sobriety, mental health stability or other markers before being housed &mdash; a sequence that leaves many cycling through temporary accommodation, shelters, and rough sleeping for years. Housing First provides a permanent home unconditionally and wraps intensive support around the person once housed. The evidence from Finland, which has virtually eliminated rough sleeping using this approach, Denmark, and three large-scale English pilots is consistent: around 80% of even the most complex cases remain housed at two years.
            </p>
            <p>
              The English pilots &mdash; run in Greater Manchester, Liverpool City Region, and the West Midlands &mdash; reached 1,400 people between 2018 and 2024. MHCLG&apos;s evaluation found 81% were still housed after two years, with significant reductions in A&amp;E visits, police contact, and substance use. The cost per person is approximately &pound;12,000 per year &mdash; compared with &pound;32,000 for hostel accommodation and &pound;85,000 for emergency services usage by an unsupported rough sleeper. Despite this evidence, national rollout has not been funded. Rough sleeper numbers returned to near pre-COVID levels by 2024, reaching 4,255 in the annual snapshot count &mdash; with the real figure including hidden homeless considerably higher. Scotland, by contrast, legislated for a Housing First approach in 2018 and has been scaling implementation since 2019.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-placements', label: 'Pilot Placements' },
          { id: 'sec-context-chart', label: 'Rough Sleeping' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Housing First placements (England)"
              value="1,400"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Cumulative since 2019 &middot; Tiny vs 270,000+ rough sleepers and hidden homeless"
              sparklineData={placementsSparkline}
              onExpand={() => {}}
            />
            <MetricCard
              label="Housing retention after 2 years"
              value="80%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Most successful intervention for complex needs homelessness"
              sparklineData={retentionSparkline}
              onExpand={() => {}}
            />
            <MetricCard
              label="Cost saving vs traditional routes"
              value="£20,000/person"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="Cheaper than hostels &middot; Emergency service cost reductions are larger"
              sparklineData={[12, 14, 16, 18, 20, 20]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        {/* Chart 1: Placements */}
        <ScrollReveal>
          <section id="sec-placements" className="mb-12">
            <LineChart
              title="Housing First cumulative placements, England pilot programme, 2019&ndash;2025"
              subtitle="Cumulative Housing First placements in the three English pilots (Greater Manchester, Liverpool City Region, West Midlands). Growth slowed after 2023 as pilot funding was not renewed at scale."
              series={placementsSeries}
              annotations={placementsAnnotations}
              yLabel="People housed"
            />
          </section>
        </ScrollReveal>

        {/* Chart 2: Rough sleepers vs retention */}
        <ScrollReveal>
          <section id="sec-context-chart" className="mb-12">
            <LineChart
              title="Rough sleeper count and Housing First retention rate, England, 2019&ndash;2025"
              subtitle="Annual rough sleeper snapshot count (red) and 2-year housing retention rate from pilot programmes (green). The 2020 Everyone In programme dramatically reduced rough sleeping — numbers returned to near record levels by 2024."
              series={roughSleepersSeries}
              annotations={roughSleepersAnnotations}
              yLabel="Count / Percent"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s improving"
            value="Scotland"
            unit="National Housing First rollout"
            description="Scotland launched its national Housing First programme in 2019 and is expanding towards full implementation. The Welsh government committed to a Housing First-led approach to homelessness by 2026. London has piloted Housing First specifically for women experiencing homelessness. The government&apos;s Rough Sleeping Strategy (2022) acknowledged Housing First evidence and committed to expanding intensive support. The Homelessness Reduction Act&apos;s prevention duty, while not Housing First, shifts focus upstream &mdash; stopping homelessness before it reaches the street."
            source="Source: MHCLG &mdash; Housing First Pilots Evaluation 2022. Crisis &mdash; Housing First evidence base review 2024."
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
