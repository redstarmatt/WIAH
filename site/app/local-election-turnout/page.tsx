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

interface DataPoint {
  year: number;
  localTurnout: number;
  mayoralTurnout: number;
  generalElectionTurnout: number;
  localTurnoutAlt: number;
}

interface TopicData {
  national: {
    timeSeries: DataPoint[];
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

export default function TopicPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/local-election-turnout/local_election_turnout.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'localTurnout',
          label: 'Local election turnout (%)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.localTurnout,
          })),
        },
        {
          id: 'mayoralTurnout',
          label: 'Mayoral election turnout (%)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.mayoralTurnout,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'generalElectionTurnout',
          label: 'General election turnout (%)',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.generalElectionTurnout,
          })),
        },
        {
          id: 'localTurnoutAlt',
          label: 'Local turnout (%)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.localTurnoutAlt,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2019, 5, 1), label: '2019: Most seats contested — higher average turnout' },
    { date: new Date(2024, 5, 1), label: '2024: General election year boosts some local turnout' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Local elections postponed — Covid' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Local Election Turnout" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Democracy & Governance"
          question="Is Anyone Still Voting in Local Elections?"
          finding="Average local election turnout has hovered at 35-40% for 20 years. Some wards see turnout below 15%, while mayoral elections average 41%."
          colour="#6B7280"
        />

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Chart 1' },
          { id: 'sec-chart2', label: 'Chart 2' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Average local election turnout"
            value="37%"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText="30pp below general election turnout · decades unchanged"
            sparklineData={[36, 37, 38, 36, 36, 37, 36, 37, 36, 37, 37]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Wards with under 20% turnout"
            value="18%"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText="Mostly urban, deprived areas · lowest wards under 10%"
            sparklineData={[17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18]}
            href="#sec-coverage"
          />
          <MetricCard
            label="GE vs local turnout gap"
            value="30pp"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText="2024 GE 60% vs avg local 37% · growing disengagement"
            sparklineData={[28, 29, 29, 30, 30, 29, 29, 30, 30, 30, 30]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Local election turnout, England, 2015-2025"
              subtitle="Average turnout in local council elections vs general election turnout."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Local vs general election turnout, England, 2015-2025"
              subtitle="Gap between general election and local council election voter turnout."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Mayoral elections drive higher engagement"
            value="41%"
            unit="average mayoral election turnout"
            description="Where directly elected mayors contest elections, turnout averages 41% — 4 points above ordinary council elections. London Mayor turnout reached 44% in 2024. The Electoral Commission's report on expanding postal voting showed pilot schemes in six areas increased turnout by 3-5 percentage points."
            source="Source: Electoral Commission — Electoral data files, 2025."
          />
        </ScrollReveal>

        {/* Sources */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
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
      </main>
    </>
  );
}
