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

interface AppealSuccessPoint {
  year: number;
  successRatePct: number;
}

interface UnbuiltHomesPoint {
  year: number;
  homesThousands: number;
}

interface DecisionTimePoint {
  year: number;
  avgWeeks: number;
}

interface PlanningAppealsData {
  national: {
    appealSuccessRate: {
      timeSeries: AppealSuccessPoint[];
      latestYear: number;
      latestPct: number;
      note: string;
    };
    unpermittedHomes: {
      timeSeries: UnbuiltHomesPoint[];
      latestYear: number;
      latestThousands: number;
      note: string;
    };
    decisionTime: {
      timeSeries: DecisionTimePoint[];
      latestYear: number;
      latestWeeks: number;
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

export default function PlanningAppealsPage() {
  const [data, setData] = useState<PlanningAppealsData | null>(null);

  useEffect(() => {
    fetch('/data/planning-appeals/planning_appeals.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const appealSuccessSeries: Series[] = data
    ? [{
        id: 'appealSuccess',
        label: 'Housing appeal success rate',
        colour: '#F4A261',
        data: data.national.appealSuccessRate.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.successRatePct,
        })),
      }]
    : [];

  const unbuiltSeries: Series[] = data
    ? [{
        id: 'unbuiltHomes',
        label: 'Permitted homes unbuilt (thousands)',
        colour: '#E63946',
        data: data.national.unpermittedHomes.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.homesThousands,
        })),
      }]
    : [];

  const decisionTimeSeries: Series[] = data
    ? [{
        id: 'decisionTime',
        label: 'Average planning decision time (weeks)',
        colour: '#264653',
        data: data.national.decisionTime.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.avgWeeks,
        })),
      }]
    : [];

  const appealAnnotations: Annotation[] = [
    { date: new Date(2019, 5, 1), label: '2019: NPPF revised — tilted balance strengthened' },
    { date: new Date(2023, 5, 1), label: '2023: Levelling Up Act — infrastructure levy debated' },
  ];

  const unbuiltAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Pandemic halts construction activity' },
    { date: new Date(2022, 5, 1), label: '2022: Material and labour costs spike' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Planning Appeals" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Planning Appeals"
          question="Who Actually Controls Where Homes Get Built?"
          finding="Planning inspectors overturned 43% of housing planning refusals on appeal in 2024. Developers win &pound;1 billion in planning permission through appeals annually. Meanwhile, 260,000 homes with planning permission remain unbuilt."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              England&apos;s planning system operates on a presumption in favour of sustainable development &mdash; yet in practice, the planning appeal process has become a second decision-making tier dominated by developer resources and planning inspector discretion. When a local planning authority refuses a housing application, developers can appeal to the Planning Inspectorate. In 2024, 43% of housing appeals succeeded, meaning planning inspectors overruled locally elected councils in nearly half of all contested housing decisions. The financial stakes are substantial: industry estimates put the annual value of permissions won on appeal at over &pound;1 billion.
            </p>
            <p>
              The planning pipeline paradox compounds the picture. Despite 260,000 homes sitting with extant planning permission but not yet started, the homebuilding industry argues permissions are constrained by viability, infrastructure costs, and market absorption rates. Critics, including the Competition and Markets Authority in its 2024 report, point to land banking &mdash; the practice of holding permissions until conditions improve &mdash; as a structural feature of the speculative land model that underpins major housebuilders. Average planning decision times have risen to 11.8 weeks for major applications, a direct consequence of local authority planning department cuts that removed nearly a third of planning officers between 2010 and 2023.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-appeals', label: 'Appeal Rates' },
          { id: 'sec-pipeline', label: 'Unbuilt Homes' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Housing appeal success rate"
              value="43%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 33% in 2015 &middot; Developers win &pound;1bn in permissions pa"
              sparklineData={[33, 34, 35, 36, 36, 37, 38, 40, 42, 43]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Permitted homes unbuilt"
              value="260,000"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Planning permission granted but not built &middot; Land banking debate"
              sparklineData={[180, 200, 220, 240, 250, 255, 260]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Average planning decision time"
              value="11.8 weeks"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 9.2 weeks in 2018 &middot; LPA capacity shortfall"
              sparklineData={[9.2, 9.5, 10.1, 10.8, 11.2, 11.5, 11.8]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-appeals" className="mb-12">
            <LineChart
              title="Housing planning appeal success rate, England, 2015&ndash;2024"
              subtitle="Proportion of housing planning refusal appeals decided in favour of the developer by the Planning Inspectorate. A rising rate means councils are being overruled more often."
              series={appealSuccessSeries}
              annotations={appealAnnotations}
              yLabel="Appeal success (%)"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-pipeline" className="mb-12">
            <LineChart
              title="Homes with planning permission but not yet built, England, 2018&ndash;2024"
              subtitle="Dwellings with extant planning permission that have not started construction. The &lsquo;planning pipeline&rsquo; has grown steadily despite housing undersupply."
              series={unbuiltSeries}
              annotations={unbuiltAnnotations}
              yLabel="Thousands"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s improving"
            value="Planning &amp; Infrastructure Bill 2025"
            unit=""
            description="The Planning and Infrastructure Bill 2025 aims to streamline the planning system, introduce national development management policies, and speed up decision-making. New planning fee increases are funding additional planning officer capacity. The government&apos;s mandatory local housing targets and reformed NPPF seek to reduce council refusals and therefore the appeal burden. Skills England is developing a pipeline of planning professionals to address the LPA capacity crisis."
            source="Source: MHCLG &mdash; Planning and Infrastructure Bill 2025 impact assessment; Planning Inspectorate annual report 2024."
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
