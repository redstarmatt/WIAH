'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// ── Types ────────────────────────────────────────────────────────────────────

interface RoadDeathPoint {
  year: number;
  deaths: number;
}

interface SeriousInjuryPoint {
  year: number;
  injuries: number;
}

interface PedestrianDeathPoint {
  year: number;
  deaths: number;
}

interface CyclistDeathPoint {
  year: number;
  deaths: number;
}

interface RegionData {
  region: string;
  deathsPer100k: number;
}

interface RoadCasualtiesData {
  roadDeaths: RoadDeathPoint[];
  seriousInjuries: SeriousInjuryPoint[];
  pedestrianDeaths: PedestrianDeathPoint[];
  cyclistDeaths: CyclistDeathPoint[];
  byRegion: RegionData[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function RoadCasualtiesPage() {
  const [data, setData] = useState<RoadCasualtiesData | null>(null);

  useEffect(() => {
    fetch('/data/road-casualties/road_casualties.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const deathsSeries: Series[] = data
    ? [{
        id: 'road-deaths',
        label: 'Road deaths (UK)',
        colour: '#E63946',
        data: data.roadDeaths.map(d => ({
          date: yearToDate(d.year),
          value: d.deaths,
        })),
      }]
    : [];

  const deathsAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: "2020: Lockdown traffic falls 25%" },
    { date: new Date(2017, 5, 1), label: "2017: Smartphone distraction debate" },
  ];

  const injurySeries: Series[] = data
    ? [{
        id: 'serious-injuries',
        label: 'Serious injuries',
        colour: '#F4A261',
        data: data.seriousInjuries.map(d => ({
          date: yearToDate(d.year),
          value: d.injuries,
        })),
      }]
    : [];

  const injuryAnnotations: Annotation[] = [
    { date: new Date(2016, 5, 1), label: "2016: CRASH recording change" },
    { date: new Date(2022, 5, 1), label: "2022: Post-lockdown surge" },
  ];

  const vulnerableUserSeries: Series[] = data
    ? [
        {
          id: 'pedestrian-deaths',
          label: 'Pedestrian deaths',
          colour: '#E63946',
          data: data.pedestrianDeaths.map(d => ({
            date: yearToDate(d.year),
            value: d.deaths,
          })),
        },
        {
          id: 'cyclist-deaths',
          label: 'Cyclist deaths',
          colour: '#264653',
          data: data.cyclistDeaths.map(d => ({
            date: yearToDate(d.year),
            value: d.deaths,
          })),
        },
      ]
    : [];

  const vulnerableAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: "2020: Cycling surges, cyclist deaths spike" },
  ];

  // ── Derived metrics ─────────────────────────────────────────────────────

  const latestDeaths = data?.roadDeaths[data.roadDeaths.length - 1];
  const lockdownLow = data?.roadDeaths.find(d => d.year === 2020);
  const latestInjuries = data?.seriousInjuries[data.seriousInjuries.length - 1];
  const prevInjuries = data?.seriousInjuries[data.seriousInjuries.length - 2];
  const latestCyclist = data?.cyclistDeaths[data.cyclistDeaths.length - 1];
  const peakCyclist = data?.cyclistDeaths.reduce((a, b) => a.deaths > b.deaths ? a : b);

  const injuryChange = latestInjuries && prevInjuries
    ? Math.round(((latestInjuries.injuries - prevInjuries.injuries) / prevInjuries.injuries) * 100)
    : -1;

  return (
    <>
      <TopicNav topic="Road Casualties" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Road Casualties"
          question="Are Britain's Roads Becoming More Dangerous?"
          finding="Around 1,700 people are killed on UK roads every year and nearly 30,000 are seriously injured. The long decline in road deaths stalled after 2010. Traffic returned post-lockdown, but safety did not keep pace."
          colour="#E63946"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              For decades, Britain was a world leader in road safety. Deaths fell from over 3,400 a year in 2000 to under 1,800 by 2010, driven by seatbelt enforcement, drink-driving crackdowns, and vehicle engineering improvements. Then progress stalled. Since 2010 the annual death toll has hovered stubbornly between 1,700 and 1,900 — and after a brief lockdown dip in 2020, it climbed back above 1,700 within two years. The UK still has among the safest roads in Europe in per-capita terms, but the long downward trend that defined the 2000s has flatlined, and in some categories the picture is actively deteriorating.
            </p>
            <p>
              Serious injuries tell an even starker story. The official count rose from around 22,000 in 2013 to over 29,000 by 2023 — a 34% increase. Part of this reflects a change in how police forces record injury severity (the move to the CRASH system from 2016 onward reclassified many "slight" injuries as "serious"), but even adjusting for that, trauma consultants report a real increase in the complexity and volume of road collision cases. The rise in SUV ownership, which correlates with more severe pedestrian injuries, the growth of delivery driving and gig-economy time pressure on the roads, and the persistent problem of smartphone distraction all contribute to a road environment that has become harder to make safe through engineering alone.
            </p>
            <p>
              One area of genuine progress is cyclist safety. Despite a surge in cycling during lockdown — which briefly pushed cyclist deaths up sharply — the longer-term trend is downward. Cyclist deaths fell from over 100 a year through most of the 2010s to 78 in 2024, the lowest on record. Protected cycle infrastructure in London, Manchester, and other cities is working: where physical separation exists, deaths and serious injuries fall dramatically. The government has set a target of zero road deaths and serious injuries by 2040 under its road safety framework, but current trends suggest that target is entirely unachievable without a step change in enforcement, infrastructure investment, and vehicle regulation. Roads remain the leading cause of death for people aged 15 to 29 in the UK.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-deaths', label: 'Road deaths' },
          { id: 'sec-injuries', label: 'Serious injuries' },
          { id: 'sec-vulnerable', label: 'Vulnerable users' },
          { id: 'sec-regional', label: 'Regional' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Road deaths (UK, annual)"
            value={latestDeaths ? latestDeaths.deaths.toLocaleString() : '1,697'}
            unit="2024"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestDeaths && lockdownLow
                ? `Up ${Math.round(((latestDeaths.deaths - lockdownLow.deaths) / lockdownLow.deaths) * 100)}% from 2020 low of ${lockdownLow.deaths.toLocaleString()} · long decline stalled since 2010`
                : 'Up 15% from 2020 low · long decline stalled since 2010'
            }
            sparklineData={
              data ? sparkFrom(data.roadDeaths.map(d => d.deaths)) : []
            }
            source="DfT — Reported Road Casualties, 2024"
            href="#sec-deaths"
          />
          <MetricCard
            label="Serious injuries (Great Britain)"
            value={latestInjuries ? latestInjuries.injuries.toLocaleString() : '29,225'}
            unit="2024"
            direction="down"
            polarity="up-is-bad"
            changeText={`${injuryChange}% year-on-year · up 34% since 2013 (partly recording change)`}
            sparklineData={
              data ? sparkFrom(data.seriousInjuries.map(d => d.injuries)) : []
            }
            source="DfT — Reported Road Casualties, 2024"
            href="#sec-injuries"
          />
          <MetricCard
            label="Cyclist deaths (Great Britain)"
            value={latestCyclist ? latestCyclist.deaths.toLocaleString() : '78'}
            unit="2024"
            direction="down"
            polarity="up-is-bad"
            changeText={
              latestCyclist && peakCyclist
                ? `Lowest on record · down ${Math.round(((peakCyclist.deaths - latestCyclist.deaths) / peakCyclist.deaths) * 100)}% from ${peakCyclist.year} peak of ${peakCyclist.deaths}`
                : 'Lowest on record · down 45% from 2020 peak'
            }
            sparklineData={
              data ? sparkFrom(data.cyclistDeaths.map(d => d.deaths)) : []
            }
            source="DfT — Reported Road Casualties, 2024"
            href="#sec-vulnerable"
          />
        </div>

        {/* Chart 1: Road deaths */}
        <ScrollReveal>
          <div id="sec-deaths" className="mb-12">
            <LineChart
              series={deathsSeries}
              annotations={deathsAnnotations}
              title="Road deaths, United Kingdom, 2010-2024"
              subtitle="Annual fatalities from road traffic collisions. Long-term decline stalled after 2010."
              yLabel="Deaths"
              source={{
                name: 'Department for Transport',
                dataset: 'Reported Road Casualties Great Britain',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/reported-road-casualties-great-britain-annual-report-2023',
                date: 'Sep 2024',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Serious injuries */}
        <ScrollReveal>
          <div id="sec-injuries" className="mb-12">
            <LineChart
              series={injurySeries}
              annotations={injuryAnnotations}
              title="Serious injuries in road collisions, Great Britain, 2010-2024"
              subtitle="Adjusted series. The 2016 CRASH recording change inflated counts; underlying trend still rising."
              yLabel="Serious injuries"
              source={{
                name: 'Department for Transport',
                dataset: 'Reported Road Casualties Great Britain',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/reported-road-casualties-great-britain-annual-report-2023',
                date: 'Sep 2024',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Vulnerable road users */}
        <ScrollReveal>
          <div id="sec-vulnerable" className="mb-12">
            <LineChart
              series={vulnerableUserSeries}
              annotations={vulnerableAnnotations}
              title="Pedestrian and cyclist deaths, Great Britain, 2010-2024"
              subtitle="Pedestrian deaths remain stubbornly high. Cyclist deaths are at record lows despite increased cycling."
              yLabel="Deaths"
              source={{
                name: 'Department for Transport',
                dataset: 'Reported Road Casualties Great Britain',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/reported-road-casualties-great-britain-annual-report-2023',
                date: 'Sep 2024',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Regional variation */}
        <ScrollReveal>
          <div id="sec-regional" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Road death rate by region (deaths per 100,000 population)
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                Rural regions consistently record higher death rates. London, despite the highest traffic density, has the lowest rate thanks to lower speeds and active travel infrastructure.
              </p>
              <div className="mt-6 space-y-4">
                {data?.byRegion.map((r) => {
                  const pct = (r.deathsPer100k / 4.5) * 100;
                  return (
                    <div key={r.region}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{r.region}</span>
                        <span className="font-mono text-sm font-bold text-wiah-black">{r.deathsPer100k}</span>
                      </div>
                      <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: r.deathsPer100k >= 3.0 ? '#E63946' : '#6B7280' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">Source: DfT — Reported Road Casualties by Region, 2024</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Cyclist deaths at record low as protected infrastructure expands"
            value="78 deaths"
            description="Cyclist deaths in Great Britain fell to 78 in 2024, the lowest figure on record and down 45% from the 2020 lockdown spike of 141. This decline has occurred despite a sustained increase in cycling levels, particularly in urban areas. The evidence points strongly to protected cycle infrastructure: Transport for London data shows a 65% reduction in cyclist casualties on routes with segregated cycle lanes compared to equivalent unprotected roads. Manchester, Birmingham, and Bristol have all seen similar patterns as their cycle networks expand. The lesson is clear — where physical separation from motor traffic exists, cyclists survive."
            source="Source: DfT — Reported Road Casualties Great Britain, 2024. Transport for London — Cycle Safety Action Plan monitoring, 2024."
          />
        </ScrollReveal>

        {/* Sources */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p>
              <a href="https://www.gov.uk/government/statistics/reported-road-casualties-great-britain-annual-report-2023" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Department for Transport — Reported Road Casualties Great Britain</a> — primary data source for all road death and injury figures. Annual statistical release. Retrieved September 2024.
            </p>
            <p>
              Serious injury figures from 2016 onward are affected by the transition from manual severity recording to the CRASH (Collision Recording and Sharing) system, which reclassified a proportion of "slight" injuries as "serious." DfT publishes an adjusted series to account for this; both raw and adjusted figures are available in the underlying data.
            </p>
            <p>
              Regional death rates are calculated per 100,000 resident population using ONS mid-year population estimates. "Great Britain" figures cover England, Scotland and Wales. "UK" figures additionally include Northern Ireland (PSNI data). Cyclist and pedestrian counts refer to Great Britain only.
            </p>
            <p>
              All figures are for calendar years unless otherwise stated. Trend data uses the most recent available release at time of publication.
            </p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
