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

interface TurnedAwayPoint {
  election: string;
  year: number;
  turnedAway: number;
}

interface AwarenessPoint {
  year: number;
  percentAwareWhichIDAccepted: number;
}

interface DemographicGap {
  group: string;
  percentWithoutAcceptedID: number;
}

interface VACPoint {
  year: number;
  certificatesIssued: number;
}

interface VoterIDData {
  national: {
    turnedAway: {
      timeSeries: TurnedAwayPoint[];
      note: string;
    };
    voterAwareness: {
      timeSeries: AwarenessPoint[];
      latestYear: number;
      latestPercent: number;
      note: string;
    };
    idPossessionGaps: {
      demographics: DemographicGap[];
      note: string;
    };
    voterAuthorityCertificates: {
      timeSeries: VACPoint[];
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
  return new Date(y, 4, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function VoterIDImpactPage() {
  const [data, setData] = useState<VoterIDData | null>(null);

  useEffect(() => {
    fetch('/data/voter-id-impact/voter_id.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const turnedAwaySeries: Series[] = data
    ? [{
        id: 'turned-away',
        label: 'People turned away at polling stations',
        colour: '#E63946',
        data: data.national.turnedAway.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.turnedAway,
        })),
      }]
    : [];

  const awarenessSeries: Series[] = data
    ? [{
        id: 'awareness',
        label: '% aware which ID accepted',
        colour: '#2A9D8F',
        data: data.national.voterAwareness.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.percentAwareWhichIDAccepted,
        })),
      }]
    : [];

  const vacSeries: Series[] = data
    ? [{
        id: 'vac',
        label: 'Voter Authority Certificates issued',
        colour: '#264653',
        data: data.national.voterAuthorityCertificates.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.certificatesIssued / 1000,
        })),
      }]
    : [];

  const demographicData = data?.national.idPossessionGaps.demographics ?? [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Voter ID Impact" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Voter ID Impact"
          question="Did Voter ID Laws Suppress Turnout?"
          finding="An estimated 14,000 people were turned away at the 2023 local elections after failing to produce valid ID. Analysis shows the impact was disproportionate on younger voters, renters, and ethnic minority communities."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The UK introduced mandatory photo ID at polling stations with the Elections Act 2022, making England the only part of the United Kingdom to require photo ID to vote. The 2023 local elections &mdash; the first to use the new rules &mdash; resulted in 14,000 people being turned away. Approximately 4,000 did not return with the correct documentation and so were unable to vote. The Electoral Commission&rsquo;s post-election research found that awareness of the new rules was significantly lower among younger voters, people from ethnic minority backgrounds, social renters, and people on lower incomes.
            </p>
            <p>
              The fundamental policy question is whether the problem the legislation addressed &mdash; electoral fraud through personation at polling stations &mdash; was proportionate to the remedy. The Electoral Commission had recorded only 13 cases of personation in the previous decade across all UK elections. The counter-argument &mdash; that any fraud undermines trust in democracy &mdash; has force, but sits awkwardly against evidence that the ID requirement has created a meaningful barrier for voters who are already less likely to participate. The free Voter Authority Certificate provides a mitigating mechanism, but its uptake has been limited by awareness gaps and the administrative burden of applying.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-turned-away', label: 'Turned Away' },
          { id: 'sec-awareness', label: 'Awareness' },
          { id: 'sec-gaps', label: 'Who Lacks ID' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Turned away at 2023 elections"
              value="14,000"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="First elections with mandatory photo ID &middot; ~4,000 unable to vote &middot; Disproportionate impact on young"
              sparklineData={[14000, 8000]}
              onExpand={() => {}}
            />
            <MetricCard
              label="18\u201324s without accepted ID"
              value="14%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="vs 5% of older voters &middot; Passport and driving licence ownership lowest among young"
              sparklineData={[14, 11, 12, 9, 5]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Aware of which ID accepted"
              value="62%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Up from 48% at 2023 locals &middot; Electoral Commission communications improved"
              sparklineData={[48, 62]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-turned-away" className="mb-12">
            <LineChart
              title="People turned away at polling stations, 2023 locals and 2024 general election"
              subtitle="Number of people turned away for not producing valid photo ID. Fell from 14,000 to 8,000 partly due to increased awareness and Voter Authority Certificate uptake, but remains a measurable barrier to participation."
              series={turnedAwaySeries}
              annotations={[
                { date: new Date(2023, 4, 1), label: '2023: First elections with photo ID' },
              ]}
              yLabel="People turned away"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-awareness" className="mb-12">
            <LineChart
              title="Voter awareness of accepted photo ID, 2023&ndash;2024"
              subtitle="Percentage of registered voters who correctly identified which forms of photo ID are accepted at polling stations. Improved significantly through Electoral Commission communications campaign."
              series={awarenessSeries}
              annotations={[]}
              yLabel="Percent (%)"
            />
          </section>
        </ScrollReveal>

        {/* Demographic breakdown — static bar-style display */}
        <ScrollReveal>
          <section id="sec-gaps" className="mb-12">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-wiah-black">Voters without accepted photo ID by group (2024)</h3>
              <p className="text-sm text-wiah-mid mt-1">Percentage of registered voters in each group who do not possess any form of accepted photo ID. Source: Electoral Commission survey.</p>
            </div>
            <div className="space-y-3">
              {demographicData.map((d) => (
                <div key={d.group} className="flex items-center gap-4">
                  <div className="w-44 text-sm text-wiah-mid font-mono flex-shrink-0">{d.group}</div>
                  <div className="flex-1 bg-wiah-border rounded h-5 relative">
                    <div
                      className="h-5 rounded"
                      style={{
                        width: `${(d.percentWithoutAcceptedID / 16) * 100}%`,
                        backgroundColor: d.percentWithoutAcceptedID > 10 ? '#E63946' : d.percentWithoutAcceptedID > 7 ? '#F4A261' : '#6B7280',
                      }}
                    />
                  </div>
                  <div className="w-12 text-sm font-mono text-wiah-black text-right">{d.percentWithoutAcceptedID}%</div>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s improving"
            value="140,000"
            unit="Voter Authority Certificates issued (2024)"
            description="The Electoral Commission provided free Voter Authority Certificates to those without qualifying ID, with 140,000 issued ahead of the 2024 general election &mdash; up from 75,000 in 2023. Local councils conducted awareness campaigns. The requirement to show ID is now better known, reducing the surprise-factor that led to some 2023 turn-aways. Scotland, Wales, and Northern Ireland all operate elections without mandatory photo ID requirements and continue to have no identified personation problem."
            source="Source: Electoral Commission 2024 General Election Monitoring Report &middot; Electoral Commission 2023 Local Elections Evaluation."
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
