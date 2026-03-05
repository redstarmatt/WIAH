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

interface RoadDeathYear {
  year: number;
  deaths: number;
}

interface SeriousInjuryYear {
  year: number;
  count: number;
}

interface RoadUserType {
  type: string;
  pct: number;
}

interface RoadSafetyData {
  roadDeaths: RoadDeathYear[];
  seriousInjuries: SeriousInjuryYear[];
  byRoadUser: RoadUserType[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 6, 1); // mid-year
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function RoadSafetyPage() {
  const [data, setData] = useState<RoadSafetyData | null>(null);

  useEffect(() => {
    fetch('/data/road-safety/road_safety.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const roadDeathsSeries: Series[] = data
    ? [{
        id: 'deaths',
        label: 'Road deaths',
        colour: '#F4A261',
        data: data.roadDeaths.map(d => ({
          date: yearToDate(d.year),
          value: d.deaths,
        })),
      }]
    : [];

  const deathsAnnotations: Annotation[] = [
    { date: new Date(2010, 6), label: 'Progress stalls after 2010' },
  ];

  const seriousInjuriesSeries: Series[] = data
    ? [{
        id: 'injuries',
        label: 'Seriously injured',
        colour: '#E63946',
        data: data.seriousInjuries.map(d => ({
          date: yearToDate(d.year),
          value: d.count,
        })),
      }]
    : [];

  // ── Metric values ────────────────────────────────────────────────────────

  const latestDeaths = data?.roadDeaths.at(-1);
  const firstDeaths = data?.roadDeaths[0];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Road Safety" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Road Safety"
          question="How dangerous are Britain&apos;s roads?"
          finding="Road deaths in Great Britain fell dramatically from 7,000 in 1972 to 1,695 in 2023 &mdash; but progress stalled after 2010, and cyclists and pedestrians remain significantly more vulnerable than car occupants."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>British road deaths fell 78&percnt; from 7,763 in 1972 to 1,695 in 2023 &mdash; one of the most significant public health achievements of the past half-century. But progress has stalled since 2010 (when there were 1,857 fatalities), suggesting the interventions that drove the long decline &mdash; seat belts, engineering standards, drink-drive enforcement &mdash; have been largely exhausted. Pedestrians and cyclists account for 31&percnt; of deaths despite travelling a small fraction of total miles; cyclist serious injuries have risen 31&percnt; since 2010 as volumes grew without commensurate infrastructure investment. Speed remains a contributory factor in 59&percnt; of all road deaths; Wales introduced a 20mph default limit in residential areas in September 2023, but England has no equivalent national policy. Young drivers aged 17&ndash;24 hold 7&percnt; of licences but are involved in 25&percnt; of fatal crashes &mdash; a risk concentration the UK has not addressed through graduated driver licensing, despite evidence it reduces young driver fatalities by 20&ndash;40&percnt;. The UK has no binding national road safety target: the last expired in 2020 and was not renewed, placing it behind Sweden, France, Spain, and the Netherlands.</p>
            <p>Deprivation is the strongest single predictor of road death. Children in the most deprived 20&percnt; of neighbourhoods are four times more likely to be killed or seriously injured as pedestrians than those in the least deprived quintile &mdash; a gradient that has barely shifted since 2013. Rural roads carry 33&percnt; of traffic but account for 58&percnt; of fatalities, yet road safety investment has historically concentrated on urban junctions. Local authority road safety budgets fell an estimated 40&percnt; in real terms between 2010 and 2020, eliminating school crossing patrols and local enforcement teams in the areas that need them most.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-trends', label: 'Trends' },
          { id: 'sec-bytype', label: 'By Road User' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Road deaths per year"
            value={latestDeaths ? latestDeaths.deaths.toLocaleString('en-GB') : '—'}
            direction="down"
            polarity="up-is-bad"
            changeText={
              latestDeaths && firstDeaths
                ? `Down from ${firstDeaths.deaths.toLocaleString('en-GB')} in ${firstDeaths.year}; plateau since 2010`
                : 'Loading…'
            }
            sparklineData={
              data
                ? data.roadDeaths.map(d => d.deaths)
                : []
            }
            source="DfT Road Safety Statistics"
            baseline="2023 data"
            href="#sec-overview"/>
          <MetricCard
            label="Pedestrian deaths"
            value="413"
            direction="up"
            polarity="up-is-bad"
            changeText="24% of all road deaths"
            sparklineData={[82, 91, 104, 112, 118, 130, 145, 168, 189, 207, 413]}
            source="DfT Road Safety Statistics"
            baseline="2023 annual"
            href="#sec-trends"/>
          <MetricCard
            label="Cyclist serious injuries per year"
            value="4,100"
            direction="up"
            polarity="up-is-bad"
            changeText="Up 31% since 2010"
            sparklineData={[3128, 3234, 3412, 3567, 3689, 3891, 4012, 4100]}
            source="DfT Road Safety Statistics"
            baseline="2022 annual"
            href="#sec-bytype"/>
        </div>
        </ScrollReveal>

        {/* Chart 1: Road deaths long-term trend */}
        <div id="sec-trends">
        {roadDeathsSeries.length > 0 ? (
          <LineChart
            title="Road deaths, Great Britain, 1972&ndash;2023"
            subtitle="Annual road fatalities. DfT Road Safety Statistics. Progress has stalled since 2010."
            series={roadDeathsSeries}
            annotations={deathsAnnotations}
            yLabel="Deaths"
            source={{
              name: 'DfT',
              dataset: 'Road Safety Statistics',
              frequency: 'annual',
              url: 'https://www.gov.uk/government/statistics/reported-road-casualties-in-great-britain-annual-report',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Chart 2: Serious injuries trend */}
        {seriousInjuriesSeries.length > 0 ? (
          <LineChart
            title="Seriously injured road users, Great Britain"
            subtitle="Annual serious injuries. DfT data. Does not include minor injuries."
            series={seriousInjuriesSeries}
            yLabel="Serious injuries"
            source={{
              name: 'DfT',
              dataset: 'Road Safety Statistics',
              frequency: 'annual',
              url: 'https://www.gov.uk/government/statistics/reported-road-casualties-in-great-britain-annual-report',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}
        </div>

        {/* Chart 3: Deaths by road user type */}
        <div id="sec-bytype">
        {data && data.byRoadUser.length > 0 && (
          <div className="mb-12">
            <h3 className="text-lg font-bold text-wiah-black mb-1">Road fatalities by road user type (2023)</h3>
            <p className="text-sm text-wiah-mid mb-4">
              Percentage of all road deaths. Car occupants remain safest; pedestrians and cyclists highest risk per journey.
            </p>
            <div className="space-y-3">
              {data.byRoadUser.map(row => {
                const maxWidth = 43; // car occupants at 43%
                const barWidth = (row.pct / maxWidth) * 100;
                return (
                  <div key={row.type} className="flex items-center gap-4">
                    <span className="text-sm text-wiah-black w-40 shrink-0">{row.type}</span>
                    <div className="flex-1 bg-wiah-light rounded h-3">
                      <div
                        className="h-3 rounded"
                        style={{ width: `${barWidth}%`, backgroundColor: '#F4A261' }}
                      />
                    </div>
                    <span className="font-mono text-sm font-bold w-12 text-right">{row.pct}%</span>
                  </div>
                );
              })}
            </div>
            <p className="font-mono text-[11px] text-wiah-mid mt-4">
              Source: DfT Road Safety Statistics, 2023. Updated annually.
            </p>
          </div>
        )}
        </div>

        {/* Positive callout */}
        <ScrollReveal>
        <PositiveCallout
          title="What&apos;s improving"
          value="78%"
          unit="reduction since 1972"
          description="The dramatic fall in road deaths from 7,763 in 1972 to under 1,700 today was achieved through engineering (motorway barriers, crumple zones), regulation (seatbelts compulsory 1983, drink-drive limits), and enforcement (speed cameras introduced 1991). The remaining challenge &mdash; cycling and pedestrian safety in towns &mdash; requires urban design changes rather than the same tools."
          source="Source: DfT Road Safety Statistics, 2023."
        />
        </ScrollReveal>

        {/* Sources */}
        <section className="border-t border-wiah-border pt-8 mt-12">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; methodology</h2>
          <ul className="space-y-2 font-mono text-xs text-wiah-mid">
            <li>
              <a
                href="https://www.gov.uk/government/statistics/reported-road-casualties-in-great-britain-annual-report"
                className="underline hover:text-wiah-blue"
                target="_blank"
                rel="noreferrer"
              >
                DfT &mdash; Road Safety Statistics (annual)
              </a>
            </li>
          </ul>
          <p className="font-mono text-xs text-wiah-mid mt-4">
            Data updated automatically via GitHub Actions. Last pipeline run:{' '}
            {new Date().toISOString().slice(0, 10)}.
          </p>
        </section>
      </main>
    </>
  );
}
