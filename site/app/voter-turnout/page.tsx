'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface VoterTurnoutData {
  generalElection: Array<{ year: number; turnout: number }>;
  byAge: Array<{ ageGroup: string; turnout2024: number }>;
  localElection: Array<{ year: number; turnout: number }>;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function VoterTurnoutPage() {
  const [data, setData] = useState<VoterTurnoutData | null>(null);

  useEffect(() => {
    fetch('/data/voter-turnout/voter_turnout.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  // 1. General election turnout series
  const generalElectionSeries: Series[] = data
    ? [
        {
          id: 'general-election',
          label: 'General election turnout',
          colour: '#6B7280',
          data: data.generalElection.map(d => ({
            date: yearToDate(d.year),
            value: d.turnout,
          })),
        },
      ]
    : [];

  // 2. Local election turnout series
  const localElectionSeries: Series[] = data
    ? [
        {
          id: 'local-election',
          label: 'Local election turnout',
          colour: '#6B7280',
          data: data.localElection.map(d => ({
            date: yearToDate(d.year),
            value: d.turnout,
          })),
        },
      ]
    : [];

  return (
    <div className="min-h-screen bg-white">
      <TopicNav topic="Democracy" />
      <SectionNav sections={[
        { id: 'sec-overview', label: 'Overview' },
        { id: 'sec-context', label: 'Context' },

        { id: 'sec-charts', label: 'Charts' },
        { id: 'sec-sources', label: 'Sources' },
      ]} />

      {/* ── Hero ──────────────────────────────────────────────────────────────────── */}

      <section id="sec-overview" className="bg-white px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <TopicHeader
            topic="Democracy"
            question="Is democracy actually working?"
            finding="General election turnout has recovered since its 2001 low but remains below the post-war average, while local election participation has collapsed to under 30% in many areas."
          />
        </div>
      </section>

      {/* ── Metric cards ──────────────────────────────────────────────────────────── */}

      <section className="bg-white px-4 sm:px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="2024 general election turnout"
              value="59.7"
              unit="%"
              direction="down"
              polarity="up-is-good"
              changeText="Lowest since 2001 (59.4%)"
              sparklineData={[59.4, 61.4, 65.1, 66.1, 68.8, 67.3, 59.7]}
              href="#sec-charts"
            />
            <MetricCard
              label="18–24 year old turnout (2024)"
              value="43"
              unit="%"
              direction="down"
              polarity="up-is-good"
              changeText="vs 71% for 65&plus; voters"
              sparklineData={[30, 34, 38, 40, 42, 43]}
              href="#sec-charts"
            />
            <MetricCard
              label="Local election turnout (England avg)"
              value="32"
              unit="%"
              direction="down"
              polarity="up-is-good"
              changeText="Down from 42% in 2000"
              sparklineData={[42, 34, 37, 37, 35, 42, 32, 36, 33, 34, 35, 31, 32]}
              href="#sec-charts"
            />
          </div>
        </div>
      </section>

      {/* ── Charts ────────────────────────────────────────────────────────────────── */}

      <section id="sec-context" className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-base text-wiah-black leading-[1.7] space-y-4">
          <p>The 2024 general election recorded 59.7% turnout — the lowest since 2001, when 59.4% voted in the shadow of the Iraq War. Despite a record 47.6 million people on the electoral roll and blanket pre-election coverage, 18.6 million registered voters did not cast a ballot. Post-war participation ran consistently between 76% and 83% through the 1950s and 1960s before a structural decline set in. The partial recovery to 65–69% between 2010 and 2019 has now been reversed. England's local elections are starker still: average turnout across English councils stands at around 32%, with some metropolitan wards in Manchester and Birmingham recording figures below 15%.</p>
          <p>Participation is not falling evenly. YouGov and British Election Study data from 2024 put turnout among 18–24 year olds at around 43%, against 71% for voters aged 65 and over — a 28-percentage-point gap that has widened over successive elections. Young people are more likely to be registered than ever before, but less likely to vote once registered. Deprivation compounds the pattern: the lowest-turnout constituencies are concentrated in post-industrial towns and urban peripheries where trust in politicians is lowest. Edelman Trust Barometer surveys consistently place UK politicians among the least trusted in Europe, a trend that accelerated after the Brexit referendum and the Partygate scandal of 2021–22.</p>
            </div>
      </section>

      {/* ── Positive callout ──────────────────────────────────────────────────────── */}

      <PositiveCallout
        title="Youth registration surged in 2024"
        value=""
        description="Over 3.6 million people registered to vote in the six weeks before the 2024 general election, the highest registration surge on record. Two–thirds were under 35. Whether this translated to votes remains contested — many experts believe registration improved but turnout among young registrants stayed below 50%."
        source=""
      />

      {/* ── Sources ───────────────────────────────────────────────────────────────── */}

      <section id="sec-charts" className="bg-white px-4 sm:px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {data && (
            <>
              <ScrollReveal>
                <LineChart
                  title="UK general election turnout, 1979–2024"
                  subtitle="Percentage of registered electorate who voted. England, Scotland, Wales and Northern Ireland."
                  series={generalElectionSeries}
                  yLabel="Turnout (%)"
                  showTitle
                />
              </ScrollReveal>

              <ScrollReveal>
                <LineChart
                  title="English local election turnout, 2000–2023"
                  subtitle="Average turnout in English local government elections."
                  series={localElectionSeries}
                  yLabel="Turnout (%)"
                  showTitle
                />
              </ScrollReveal>

              <ScrollReveal>
                <div className="bg-white">
                  <h3 className="text-lg font-bold text-wiah-black mb-6">
                    Turnout by age group, 2024 general election
                  </h3>
                  <div className="space-y-3">
                    {data.byAge.map((a) => (
                      <div key={a.ageGroup} className="flex items-center gap-4">
                        <div className="w-16 text-sm text-wiah-black font-medium">
                          {a.ageGroup}
                        </div>
                        <div className="flex-1 relative h-8 bg-wiah-light rounded">
                          <div
                            className="absolute top-0 left-0 h-full bg-wiah-mid rounded flex items-center justify-end pr-3"
                            style={{ width: `${(a.turnout2024 / 75) * 100}%` }}
                          >
                            <span className="text-xs font-mono text-white">
                              {a.turnout2024}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </>
          )}
        </div>
      </section>

      {/* ── Context ───────────────────────────────────────────────────────────────── */}

      <section id="sec-sources" className="max-w-2xl mx-auto px-4 sm:px-6 py-12 border-t border-wiah-border">
        <h2 className="text-2xl font-bold text-wiah-black mb-6">Sources</h2>
        <div className="space-y-4 text-sm text-wiah-mid font-mono">
          <p>Electoral Commission. General Election 2024 turnout data. Retrieved March 2026.</p>
          <p>Electoral Commission. Local Elections 2023 turnout analysis. 2023.</p>
          <p>House of Commons Library. Voter turnout by age group. Research Briefing CBP 7501. 2024.</p>
        </div>
      </section>
    </div>
  );
}
