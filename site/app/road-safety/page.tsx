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
            <p>The fall in British road deaths from 7,763 in 1972 to 1,695 in 2023 is one of the most significant public health achievements of the past half-century &mdash; a 78% reduction achieved through a combination of vehicle engineering (seat belts made compulsory in 1983, airbags and crumple zones standard in the 1990s), road design, drink-drive enforcement, and improved emergency care. Deaths fell every decade from the 1970s to the 2000s. Then progress stalled. In 2010 there were 1,857 road fatalities; by 2023 there were 1,695. Thirteen years of minimal movement suggests the interventions that produced the long decline &mdash; basic engineering and obvious regulation &mdash; have been largely exhausted. What remains is considerably harder.</p>
            <p>The risk is not evenly spread. Pedestrians and cyclists account for 31% of road deaths but travel a small fraction of total miles. A pedestrian is around 14 times more likely to die per mile travelled than a car occupant. Cyclist serious injuries have risen 31% since 2010 as cycling volumes have grown without commensurate infrastructure investment. The evidence on speed in urban areas is clear: 20mph zones reduce pedestrian casualties by around 20%. Wales became the first part of the UK to introduce a 20mph default speed limit in residential areas in September 2023. England has no equivalent national policy, and the Department for Transport has resisted calls for mandatory 20mph zones, leaving implementation to individual local authorities with inconsistent results.</p>
            <p>Young drivers aged 17&ndash;24 hold 7% of UK driving licences but are involved in 25% of fatal crashes &mdash; a risk concentration that persists because the UK has not adopted graduated driver licensing (GDL). Countries including Australia, New Zealand, and several US states use GDL systems that restrict new drivers from driving at night or with multiple young passengers during their first year. The evidence base is substantial: GDL reduces young driver fatalities by 20&ndash;40%. The UK has debated and rejected the approach repeatedly, most recently in 2023. Speed remains a contributory factor in 59% of all road deaths. Average-speed camera enforcement, shown to be more effective than fixed cameras at sustained compliance, covers only a small proportion of the road network. The political will to extend it has not materialised.</p>
            <p>Deprivation is the strongest single predictor of road death in the UK. Children in the most deprived 20% of neighbourhoods are four times more likely to be killed or seriously injured as pedestrians than those in the least deprived quintile, a gradient that has barely shifted since the Department for Transport first published the analysis in 2013. Rural roads carry 33% of traffic but account for 58% of fatalities, largely because single-carriageway A-roads combine high speeds with oncoming traffic, narrow verges and limited barriers &mdash; yet road safety investment has historically concentrated on urban junctions and motorways where political visibility is higher. Motorcyclists represent 1% of road traffic but 18% of deaths, a ratio that has worsened since 2010 as rider demographics skewed older and machines grew more powerful. Local authority road safety budgets fell by an estimated 40% in real terms between 2010 and 2020, according to the Parliamentary Advisory Council for Transport Safety, eliminating many school crossing patrols, speed awareness programmes and local enforcement teams. The UK has no binding national road safety target &mdash; the last one expired in 2020 and was not renewed &mdash; placing it behind Sweden, France, Spain and the Netherlands, all of which operate under frameworks targeting a 50% fatality reduction by 2030.</p>
            <p>The official road casualty statistics published annually by the Department for Transport rely on STATS19, a police-reported dataset that systematically undercounts injuries. Hospital Episode Statistics suggest that roughly 60% of serious road injuries treated in A&amp;E never appear in STATS19, a discrepancy the DfT itself has acknowledged since 2011 but has not resolved. In 2016 the definition of &ldquo;serious injury&rdquo; was changed from a subjective police assessment to a standardised injury-based reporting system, producing an apparent 30% spike in serious injuries that reflected reclassification rather than worsening outcomes &mdash; the DfT publishes adjusted back-series but many reports still cite the raw figures. Fatal casualty data is more reliable because every road death triggers a coroner&apos;s investigation, though the 30-day rule means late deaths are sometimes missed or misattributed. Cyclist and pedestrian casualty rates expressed per mile travelled depend on National Travel Survey estimates of walking and cycling distance, which are based on a relatively small sample of travel diaries and carry wide confidence intervals for minority transport modes. E-scooter casualties have been recorded inconsistently since rental trials began in 2020, with some forces logging them under &ldquo;other vehicle&rdquo; and others creating new categories, making national aggregation unreliable.</p>
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
            onExpand={() => {}}
          />
          <MetricCard
            label="Pedestrian deaths"
            value="413"
            direction="up"
            polarity="up-is-bad"
            changeText="24% of all road deaths"
            sparklineData={[82, 91, 104, 112, 118, 130, 145, 168, 189, 207, 413]}
            source="DfT Road Safety Statistics"
            baseline="2023 annual"
            onExpand={() => {}}
          />
          <MetricCard
            label="Cyclist serious injuries per year"
            value="4,100"
            direction="up"
            polarity="up-is-bad"
            changeText="Up 31% since 2010"
            sparklineData={[3128, 3234, 3412, 3567, 3689, 3891, 4012, 4100]}
            source="DfT Road Safety Statistics"
            baseline="2022 annual"
            onExpand={() => {}}
          />
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
