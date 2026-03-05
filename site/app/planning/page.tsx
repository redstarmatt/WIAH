'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation, TargetLine } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface HomesPoint {
  year: number;
  completionsThousands: number;
}

interface AffordabilityPoint {
  year: number;
  housepriceToEarningsRatio: number;
}

interface PlanningData {
  national: {
    newHomesBuilt: {
      timeSeries: HomesPoint[];
      latestYear: number;
      latestCompletions: number;
      governmentTarget: number;
    };
    affordability: {
      timeSeries: AffordabilityPoint[];
      latestYear: number;
      latestRatio: number;
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

export default function PlanningPage() {
  const [data, setData] = useState<PlanningData | null>(null);

  useEffect(() => {
    fetch('/data/planning/planning.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const homesSeries: Series[] = data
    ? [{
        id: 'homes',
        label: 'Net additional dwellings (thousands)',
        colour: '#F4A261',
        data: data.national.newHomesBuilt.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.completionsThousands,
        })),
      }]
    : [];

  const homesTargetLine: TargetLine = {
    value: 300,
    label: '300K annual target',
  };

  const homesAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: COVID construction halt' },
  ];

  const affordabilitySeries: Series[] = data
    ? [{
        id: 'affordability',
        label: 'House price to earnings ratio',
        colour: '#E63946',
        data: data.national.affordability.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.housepriceToEarningsRatio,
        })),
      }]
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Planning" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Planning"
          question="Why Can&apos;t Britain Build Enough Homes?"
          finding={
            data
              ? `England built ${Math.round(data.national.newHomesBuilt.latestCompletions)}K homes in ${data.national.newHomesBuilt.latestYear} &mdash; barely half the government&apos;s ${data.national.newHomesBuilt.governmentTarget}K-a-year target. Planning officer numbers have fallen 36% since 2010, house prices are ${data.national.affordability.latestRatio} times earnings, and every year the housing backlog grows by 140,000 unbuilt homes.`
              : 'England built 160K homes in 2024 — barely half the government\'s 300K-a-year target. Planning officer numbers have fallen 36% since 2010, house prices are 8 times earnings.'
          }
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              England has not built 300,000 homes in any year since at least 1970. The best recent effort &mdash; 182,000 net additional dwellings in 2022 &mdash; fell 40% short; by 2024 output had dropped to 160,400 as construction costs and mortgage rates squeezed developer viability. Household formation runs at 240,000&ndash;260,000 per year, meaning net supply has been below demand for over a decade, with the accumulated shortfall estimated at 1.4&ndash;2 million homes. Local authority planning departments lost 36% of staff between 2010 and 2024 &mdash; from 9,500 to 6,100 officers &mdash; and contested major applications now average over 30 weeks to decide against a statutory 13-week target. The house-price-to-earnings ratio rose from 6.8 in 2010 to a peak of 9.1 in 2022, easing to 8.0 in 2024; in London it exceeds 12.
            </p>
            <p>
              The housing shortfall falls hardest on the youngest and the poorest. Home ownership among under-35s halved from 51% in 2000 to 28% in 2024; private renting doubled from 10% to 20% of English households over the same period. Families in temporary accommodation have reached a record 117,000 households. Social housing stock fell from 5.5 million units in 1980 to 4.1 million by 2023, while new completions run at roughly 7,000 per year against an estimated need of 90,000. The planning system creates geographic distortion &mdash; councils in the green belt approve far fewer homes per capita than urban authorities, pushing demand into neighbouring areas &mdash; while former industrial towns face the opposite problem: derelict sites and viability gaps that make private development uneconomic without public subsidy.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-supply', label: 'Supply' },
          { id: 'sec-affordability', label: 'Affordability' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="New homes built (England)"
            value="160,400"
            unit=""
            direction="down"
            polarity="up-is-good"
            changeText="2024 · Target 300,000 · 40,000 fewer than 2022 peak · Construction cost squeeze"
            sparklineData={[102.6, 98.3, 107.0, 109.4, 117.7, 142.9, 140.6, 154.7, 165.1, 168.9, 124.3, 148.6, 182.0, 174.5, 160.4]}
            onExpand={() => {}}
          />
          <MetricCard
            label="House price to earnings ratio"
            value="8.0×"
            unit=""
            direction="down"
            polarity="up-is-bad"
            changeText="2024 · Was 6.8× in 2010 · London: 12× · Home ownership under-35s: 28%"
            sparklineData={[6.8, 6.1, 6.7, 7.7, 7.8, 7.9, 9.1, 8.3, 8.0]}
            onExpand={() => {}}
          />
          <MetricCard
            label="Planning officers in local authorities"
            value="6,100"
            unit=""
            direction="down"
            polarity="up-is-good"
            changeText="2024 · Down 36% since 2010 · Major decisions taking 30+ weeks · System overloaded"
            sparklineData={[9.5, 8.2, 7.4, 6.9, 6.4, 6.1]}
            onExpand={() => {}}
          />
        </div>
        </ScrollReveal>

        {/* Charts */}
        <ScrollReveal>
        <section id="sec-supply" className="mb-12">
          <LineChart
            title="Net additional dwellings, England, 2010–2024"
            subtitle="New homes built (net). The government target is 300,000 per year. The record was 182,000 in 2022 — still 40% below target. In 2024, completions fell further to 160,400."
            series={homesSeries}
            targetLine={homesTargetLine}
            annotations={homesAnnotations}
            yLabel="Thousands"
          />
        </section>
        </ScrollReveal>

        <ScrollReveal>
        <section id="sec-affordability" className="mb-12">
          <LineChart
            title="House price to earnings ratio, England, 2010–2024"
            subtitle="Median house price divided by median annual workplace earnings. Reached 9.1 in 2022 — the highest on record. A typical house now costs 8 times the median salary."
            series={affordabilitySeries}
            yLabel="Ratio"
          />
        </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
        <PositiveCallout
          title="What&apos;s improving"
          value="73%"
          unit="of major planning applications approved &mdash; the system does grant most permissions"
          description="Despite its problems, the planning system approves 73% of all major planning applications — higher than many comparable countries. The government&apos;s Planning and Infrastructure Bill (2025) proposes mandatory housing targets for every local authority, faster decision timelines through a &apos;zonal&apos; approach, and a new planning fee structure to fund more planning officers. Labour&apos;s manifesto commitment to 1.5 million homes over five years is the most ambitious housing target set by any government since the 1970s."
          source="Source: MHCLG &mdash; Planning applications statistics 2024."
        />
        </ScrollReveal>

        {/* Sources */}
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
