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

interface FatalityPoint {
  year: number;
  killed: number;
}

interface InjuryPoint {
  year: number;
  injuries: number;
}

interface KSIRatePoint {
  year: number;
  rate: number;
}

interface InfraSpendPoint {
  year: number;
  spendMillions: number;
}

interface RegionData {
  region: string;
  fatalitiesPerBillionMiles: number;
}

interface CyclingFatalitiesData {
  fatalities: FatalityPoint[];
  seriousInjuries: InjuryPoint[];
  ksiPerBillionMiles: KSIRatePoint[];
  infrastructureSpend: InfraSpendPoint[];
  byRegion: RegionData[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function CyclingFatalitiesPage() {
  const [data, setData] = useState<CyclingFatalitiesData | null>(null);

  useEffect(() => {
    fetch('/data/cycling-fatalities/cycling_fatalities.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const fatalitySeries: Series[] = data
    ? [{
        id: 'fatalities',
        label: 'Cyclists killed',
        colour: '#E63946',
        data: data.fatalities.map(d => ({
          date: yearToDate(d.year),
          value: d.killed,
        })),
      }]
    : [];

  const injurySeries: Series[] = data
    ? [{
        id: 'serious-injuries',
        label: 'Seriously injured',
        colour: '#6B7280',
        data: data.seriousInjuries.map(d => ({
          date: yearToDate(d.year),
          value: d.injuries,
        })),
      }]
    : [];

  const ksiRateSeries: Series[] = data
    ? [{
        id: 'ksi-rate',
        label: 'KSI per billion miles cycled',
        colour: '#264653',
        data: data.ksiPerBillionMiles.map(d => ({
          date: yearToDate(d.year),
          value: d.rate,
        })),
      }]
    : [];

  // ── Derived metrics ─────────────────────────────────────────────────────

  const latestFatalities = data?.fatalities[data.fatalities.length - 1];
  const earliestFatalities = data?.fatalities[0];
  const peakFatalities = data?.fatalities.reduce((a, b) => a.killed > b.killed ? a : b);
  const latestInjuries = data?.seriousInjuries[data.seriousInjuries.length - 1];
  const peakInjuries = data?.seriousInjuries.reduce((a, b) => a.injuries > b.injuries ? a : b);
  const latestKSIRate = data?.ksiPerBillionMiles[data.ksiPerBillionMiles.length - 1];
  const earliestKSIRate = data?.ksiPerBillionMiles[0];

  const ksiRateChange = latestKSIRate && earliestKSIRate
    ? Math.round(((latestKSIRate.rate - earliestKSIRate.rate) / earliestKSIRate.rate) * 100)
    : -20;

  // ── Annotations ─────────────────────────────────────────────────────────

  const fatalityAnnotations: Annotation[] = [
    { date: new Date(2012, 0, 1), label: '2012: Olympic cycling boom begins' },
    { date: new Date(2017, 0, 1), label: '2017: Cycling & Walking Investment Strategy' },
    { date: new Date(2020, 0, 1), label: '2020: Pandemic cycling surge' },
  ];

  const injuryAnnotations: Annotation[] = [
    { date: new Date(2017, 0, 1), label: '2017: CRASH severity adjustment introduced' },
  ];

  const ksiAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: Miles up, rate per mile falls' },
  ];

  return (
    <>
      <TopicNav topic="Cycling Fatalities" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Cycling Fatalities"
          question="Why Are Cyclists Still Being Killed on British Roads?"
          finding="104 cyclists were killed on UK roads in 2023 — a figure that has barely moved in over a decade. The fatality rate per mile cycled is six times higher than in the Netherlands. While serious injury rates per billion miles have slowly declined, the absolute toll remains stubbornly high in a country that continues to design roads primarily for motor vehicles."
          colour="#E63946"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Britain&rsquo;s cycling fatality figures tell a story of stalled progress. Around 100 to 110 cyclists
              are killed on UK roads every year, a number that has remained essentially flat since 2010 despite
              significant increases in cycling participation. The fatality rate per billion miles cycled &mdash;
              roughly 16 deaths per billion miles &mdash; is six times higher than in the Netherlands and four
              times higher than in Denmark. The core reason is infrastructure: the Netherlands invested
              systematically in physically separated cycling lanes from the 1970s onward, while Britain has
              relied overwhelmingly on painted lanes, shared-use pavements, and advisory signage that
              offer no meaningful protection from motor traffic. Where separation does exist &mdash; parts of
              inner London, the Beeline network in Greater Manchester &mdash; casualty rates are markedly lower.
            </p>
            <p>
              Serious injuries tell a more complex story. The raw numbers rose sharply after 2016, but much
              of that rise reflects the introduction of the CRASH severity scoring system in 2017, which
              reclassified many injuries previously recorded as &ldquo;slight&rdquo; to &ldquo;serious.&rdquo;
              Adjusting for this methodological break, the underlying trend in serious injuries per mile
              cycled has been gradually declining &mdash; falling roughly 20% between 2010 and 2023. This is
              genuine progress, driven by a combination of 20mph zones in urban areas, improved junction
              design in some cities, and growing driver awareness. But the pace is far slower than comparable
              European countries, and the absolute numbers &mdash; over 4,500 seriously injured cyclists in 2023
              &mdash; remain unacceptably high for a country that claims to want more people cycling.
            </p>
            <p>
              Government cycling investment has been volatile. The 2017 Cycling and Walking Investment Strategy
              set ambitious targets, Active Travel England was created in 2022 to hold local authorities to
              higher design standards, and pandemic-era emergency funding briefly tripled spending. But
              sustained capital investment has failed to materialise at the scale needed. The Netherlands spends
              roughly &pound;30 per person per year on cycling infrastructure; England averages around &pound;4.
              Until that gap closes, the fatality plateau is unlikely to break. The evidence from London &mdash;
              where protected cycle lanes on main roads have reduced cyclist casualties by up to 50% on
              treated corridors &mdash; demonstrates what is possible when infrastructure moves beyond paint.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-fatalities', label: 'Fatalities' },
          { id: 'sec-injuries', label: 'Serious injuries' },
          { id: 'sec-ksi-rate', label: 'KSI rate' },
          { id: 'sec-regional', label: 'Regional' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Cyclists killed (annual)"
            value={latestFatalities ? latestFatalities.killed.toLocaleString() : '104'}
            unit="2023"
            direction="flat"
            polarity="up-is-bad"
            changeText={
              latestFatalities && earliestFatalities
                ? `flat since ${earliestFatalities.year} · peak ${peakFatalities?.killed} in ${peakFatalities?.year} · 16 per billion miles`
                : 'broadly flat · 16 killed per billion miles vs 2.5 in Netherlands'
            }
            sparklineData={
              data ? sparkFrom(data.fatalities.map(d => d.killed)) : [109,105,99,102,99,104,104]
            }
            source="DfT — Reported Road Casualties, 2023"
            href="#sec-fatalities"
          />
          <MetricCard
            label="Seriously injured (annual)"
            value={latestInjuries ? latestInjuries.injuries.toLocaleString() : '4,560'}
            unit="2023"
            direction="down"
            polarity="up-is-bad"
            changeText={
              latestInjuries && peakInjuries
                ? `down from peak of ${peakInjuries.injuries.toLocaleString()} in ${peakInjuries.year} · CRASH adjustment inflates post-2016`
                : 'down 9% since 2018 but absolute numbers still high'
            }
            sparklineData={
              data ? sparkFrom(data.seriousInjuries.map(d => d.injuries)) : [5000,4900,4800,4700,4650,4600,4560]
            }
            source="DfT — Reported Road Casualties, 2023"
            href="#sec-injuries"
          />
          <MetricCard
            label="KSI rate per billion miles"
            value={latestKSIRate ? latestKSIRate.rate.toLocaleString() : '850'}
            unit="2023"
            direction="down"
            polarity="up-is-bad"
            changeText={
              `${ksiRateChange}% since 2010 · gradual improvement per mile cycled`
            }
            sparklineData={
              data ? sparkFrom(data.ksiPerBillionMiles.map(d => d.rate)) : [1060,1015,1070,990,1020,945,930,980,960,920]
            }
            source="DfT — Road Traffic Estimates / STATS19, 2023"
            href="#sec-ksi-rate"
          />
        </div>

        {/* Chart 1: Fatalities */}
        <ScrollReveal>
          <div id="sec-fatalities" className="mb-12">
            <LineChart
              series={fatalitySeries}
              annotations={fatalityAnnotations}
              title="Cyclists killed on UK roads, 2010–2023"
              subtitle="Annual fatalities. The number has barely moved in over a decade despite increased cycling."
              yLabel="Cyclists killed"
              source={{
                name: 'Department for Transport',
                dataset: 'Reported road casualties Great Britain',
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
              title="Cyclists seriously injured, Great Britain, 2010–2023"
              subtitle="Note: CRASH severity adjustment from 2017 reclassified many injuries upward. Pre/post-2017 not directly comparable."
              yLabel="Seriously injured"
              source={{
                name: 'Department for Transport',
                dataset: 'Reported road casualties Great Britain',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/reported-road-casualties-great-britain-annual-report-2023',
                date: 'Sep 2024',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: KSI rate per billion miles */}
        <ScrollReveal>
          <div id="sec-ksi-rate" className="mb-12">
            <LineChart
              series={ksiRateSeries}
              annotations={ksiAnnotations}
              title="Killed or seriously injured per billion miles cycled, 2010–2023"
              subtitle="The risk per mile has gradually declined, but remains far above Dutch and Danish levels."
              yLabel="KSI per billion miles"
              source={{
                name: 'Department for Transport',
                dataset: 'Road traffic estimates / STATS19',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/road-traffic-estimates-in-great-britain-2023',
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
                Cyclist fatality rate by region (deaths per billion miles cycled)
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                Three-year rolling average, 2021–2023. London&rsquo;s lower rate reflects protected infrastructure on key corridors.
              </p>
              <div className="mt-6 space-y-4">
                {data?.byRegion
                  .sort((a, b) => b.fatalitiesPerBillionMiles - a.fatalitiesPerBillionMiles)
                  .map((r) => {
                    const pct = (r.fatalitiesPerBillionMiles / 25) * 100;
                    return (
                      <div key={r.region}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-wiah-black">{r.region}</span>
                          <span className="font-mono text-sm font-bold text-wiah-black">{r.fatalitiesPerBillionMiles}</span>
                        </div>
                        <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                          <div
                            className="h-full rounded-sm transition-all"
                            style={{
                              width: `${Math.min(pct, 100)}%`,
                              backgroundColor: r.fatalitiesPerBillionMiles <= 10 ? '#2A9D8F' : r.fatalitiesPerBillionMiles <= 17 ? '#F4A261' : '#E63946',
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">
                Source: DfT — Reported Road Casualties by Region, 2021–2023 (three-year rolling average)
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Protected lanes cut casualties by up to 50%"
            value="50%"
            unit="reduction"
            description="Transport for London data shows that protected cycle lanes on main roads — physically separated from motor traffic by kerbs, wands, or planters — have reduced cyclist casualties by up to 50% on treated corridors compared to pre-installation levels. The Cycle Superhighway network in central London has demonstrated that high-quality infrastructure does not simply move risk elsewhere: casualty reductions are sustained across the wider network. Active Travel England, established in 2022, now requires all new cycling schemes to meet minimum separation standards, marking a shift from advisory paint to genuine protection."
            source="Source: TfL — Cycling Infrastructure Safety Monitoring, 2024. Active Travel England design standards, 2023."
          />
        </ScrollReveal>

        <RelatedTopics />
      </main>
    </>
  );
}
