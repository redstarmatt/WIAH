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

interface FareIndexPoint {
  year: number;
  index: number;
}

interface CostPerMilePoint {
  year: number;
  rail: number;
  car: number;
}

interface SeasonTicketPoint {
  year: number;
  index: number;
}

interface PassengerJourneysPoint {
  year: number;
  millions: number;
}

interface OperatorData {
  operator: string;
  avgPencePerMile: number;
}

interface RailFaresData {
  fareIndex: FareIndexPoint[];
  costPerMile: CostPerMilePoint[];
  seasonTicketIndex: SeasonTicketPoint[];
  passengerJourneys: PassengerJourneysPoint[];
  byOperator: OperatorData[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function RailFaresPage() {
  const [data, setData] = useState<RailFaresData | null>(null);

  useEffect(() => {
    fetch('/data/rail-fares/rail_fares.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const fareIndexSeries: Series[] = data
    ? [{
        id: 'fare-index',
        label: 'Real-terms fare index (2010 = 100)',
        colour: '#F4A261',
        data: data.fareIndex.map(d => ({
          date: yearToDate(d.year),
          value: d.index,
        })),
      }]
    : [];

  const fareIndexAnnotations: Annotation[] = [
    { date: new Date(2013, 6, 1), label: "2013: RPI+1% cap introduced" },
    { date: new Date(2020, 2, 1), label: "2020: Covid collapse" },
    { date: new Date(2024, 0, 1), label: "2024: GBR transition announced" },
  ];

  const costPerMileSeries: Series[] = data
    ? [
        {
          id: 'rail-cost',
          label: 'Rail (pence per mile)',
          colour: '#E63946',
          data: data.costPerMile.map(d => ({
            date: yearToDate(d.year),
            value: d.rail,
          })),
        },
        {
          id: 'car-cost',
          label: 'Car (pence per mile)',
          colour: '#6B7280',
          data: data.costPerMile.map(d => ({
            date: yearToDate(d.year),
            value: d.car,
          })),
        },
      ]
    : [];

  const costPerMileAnnotations: Annotation[] = [
    { date: new Date(2015, 0, 1), label: "2015: Oil price crash" },
    { date: new Date(2022, 0, 1), label: "2022: Energy price spike" },
  ];

  const seasonTicketSeries: Series[] = data
    ? [{
        id: 'season-ticket',
        label: 'Season ticket index (2010 = 100)',
        colour: '#264653',
        data: data.seasonTicketIndex.map(d => ({
          date: yearToDate(d.year),
          value: d.index,
        })),
      }]
    : [];

  const seasonTicketAnnotations: Annotation[] = [
    { date: new Date(2016, 0, 1), label: "2016: Southern rail strikes" },
    { date: new Date(2021, 0, 1), label: "2021: Flexi-season tickets launched" },
  ];

  // ── Derived values ────────────────────────────────────────────────────────

  const latestFare = data?.fareIndex[data.fareIndex.length - 1];
  const latestCost = data?.costPerMile[data.costPerMile.length - 1];
  const latestSeason = data?.seasonTicketIndex[data.seasonTicketIndex.length - 1];
  const latestJourneys = data?.passengerJourneys[data.passengerJourneys.length - 1];
  const preCovidJourneys = data?.passengerJourneys.find(d => d.year === 2019);

  const journeyRecovery = latestJourneys && preCovidJourneys
    ? Math.round((latestJourneys.millions / preCovidJourneys.millions) * 100)
    : 92;

  return (
    <>
      <TopicNav topic="Rail Fares" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Rail Fares"
          question="Is the Train Actually Affordable?"
          finding="UK rail fares have risen 22% in real terms since 2010. A mile by train now costs 33p compared with 17p by car. Season ticket holders have been hit hardest, with commuter fares up 39% in real terms over the same period. Passenger numbers still have not recovered to pre-pandemic levels."
          colour="#F4A261"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The cost of catching a train in Britain has been rising faster than wages, inflation, and the cost of driving for over a decade. Since 2010, regulated fares have increased by 22% in real terms, driven by an annual formula that ties ticket prices to the Retail Price Index — a measure of inflation that consistently overstates actual price growth compared with CPI. Season ticket holders, overwhelmingly commuters who have no realistic alternative to rail, have seen the sharpest rises: a 39% real-terms increase since 2010, adding hundreds of pounds a year to the cost of getting to work. The result is a transport system that penalises the people who rely on it most.</p>
            <p>The comparison with driving is stark and widening. A mile by rail now costs 33 pence on average, nearly double the 17 pence per mile cost of driving. This gap has grown as fuel duty has been frozen for fourteen consecutive years while rail fares have risen annually. The price signal is clear: if you can drive, you should. This directly undermines decarbonisation targets. Countries with higher rail mode share — Germany, the Netherlands, Switzerland — all subsidise rail more heavily and price it competitively against driving. Britain has made the opposite choice, treating rail as a commercial product that should cover its costs through fares rather than subsidy.</p>
            <p>Passenger numbers collapsed during Covid to just 22% of pre-pandemic levels and have recovered to around 92% by 2025. But the pattern of travel has changed permanently. Hybrid working means fewer five-day-a-week commuters, yet the fare structure has been slow to adapt. Flexi-season tickets, introduced in 2021, offer modest savings for two-to-three-day commuters but remain poor value compared with the old five-day season ticket on a per-journey basis. The transition to Great British Railways — intended to simplify fares, unify the network, and end the fragmented franchise model — has been repeatedly delayed. Until it delivers, passengers face a system that is expensive, confusing, and designed for a pattern of work that no longer exists.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-fares', label: 'Fare index' },
          { id: 'sec-cost', label: 'Cost per mile' },
          { id: 'sec-season', label: 'Season tickets' },
          { id: 'sec-operators', label: 'By operator' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Real-terms fare index (2010 = 100)"
            value={latestFare ? latestFare.index.toFixed(1) : '121.6'}
            direction="up"
            polarity="up-is-bad"
            changeText="Up 22% in real terms since 2010 · rises linked to RPI"
            sparklineData={
              data ? sparkFrom(data.fareIndex.map(d => d.index)) : []
            }
            source="ORR National Rail Trends, 2025"
            href="#sec-fares"
          />
          <MetricCard
            label="Cost per mile: rail vs car"
            value={latestCost ? `${latestCost.rail}p vs ${latestCost.car}p` : '32.6p vs 16.9p'}
            direction="up"
            polarity="up-is-bad"
            changeText="Rail nearly twice as expensive as car per mile"
            sparklineData={
              data ? sparkFrom(data.costPerMile.map(d => d.rail)) : []
            }
            source="ORR / RAC Foundation, 2025"
            href="#sec-cost"
          />
          <MetricCard
            label="Season ticket index (2010 = 100)"
            value={latestSeason ? latestSeason.index.toFixed(1) : '138.9'}
            direction="up"
            polarity="up-is-bad"
            changeText={`Up 39% in real terms since 2010 · passengers at ${journeyRecovery}% of pre-Covid`}
            sparklineData={
              data ? sparkFrom(data.seasonTicketIndex.map(d => d.index)) : []
            }
            source="ORR Fares Index, 2025"
            href="#sec-season"
          />
        </div>

        {/* Chart 1: Real-terms fare index */}
        <ScrollReveal>
          <div id="sec-fares" className="mb-12">
            <LineChart
              series={fareIndexSeries}
              title="UK rail fares in real terms (2010 = 100), 2010-2025"
              subtitle="Regulated fares adjusted for CPI inflation. Fares have outpaced inflation by 22% over fifteen years."
              yLabel="Index (2010 = 100)"
              annotations={fareIndexAnnotations}
              source={{
                name: 'ORR',
                dataset: 'National Rail Trends — Fares Index',
                frequency: 'annual',
                url: 'https://dataportal.orr.gov.uk/statistics/finance/rail-fares/',
                date: 'January 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Cost per mile comparison */}
        <ScrollReveal>
          <div id="sec-cost" className="mb-12">
            <LineChart
              series={costPerMileSeries}
              title="Average cost per mile: rail vs car (pence), 2010-2025"
              subtitle="The gap between rail and car has widened as fuel duty froze and rail fares rose annually."
              yLabel="Pence per mile"
              annotations={costPerMileAnnotations}
              source={{
                name: 'ORR / RAC Foundation',
                dataset: 'Comparative transport costs per mile',
                frequency: 'annual',
                url: 'https://dataportal.orr.gov.uk/statistics/finance/rail-fares/',
                date: 'January 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Season ticket index */}
        <ScrollReveal>
          <div id="sec-season" className="mb-12">
            <LineChart
              series={seasonTicketSeries}
              title="Season ticket prices in real terms (2010 = 100), 2010-2025"
              subtitle="Commuter season tickets have risen 39% in real terms. Flexi-tickets have not offset the increase."
              yLabel="Index (2010 = 100)"
              annotations={seasonTicketAnnotations}
              source={{
                name: 'ORR',
                dataset: 'National Rail Trends — Season Ticket Fares Index',
                frequency: 'annual',
                url: 'https://dataportal.orr.gov.uk/statistics/finance/rail-fares/',
                date: 'January 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 4: By operator */}
        <ScrollReveal>
          <div id="sec-operators" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Average cost per mile by train operator (pence)
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                Variation across operators reflects route length, competition, and franchise terms. Long-distance operators are not always cheapest per mile.
              </p>
              <div className="mt-6 space-y-4">
                {data?.byOperator
                  .sort((a, b) => b.avgPencePerMile - a.avgPencePerMile)
                  .map((r) => {
                    const pct = (r.avgPencePerMile / 45) * 100;
                    return (
                      <div key={r.operator}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-wiah-black">{r.operator}</span>
                          <span className="font-mono text-sm font-bold text-wiah-black">{r.avgPencePerMile}p</span>
                        </div>
                        <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                          <div
                            className="h-full rounded-sm transition-all"
                            style={{ width: `${pct}%`, backgroundColor: '#F4A261' }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">Source: ORR — Fares data by operator, 2024/25</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Passenger numbers recovering steadily"
            value={`${journeyRecovery}%`}
            unit="of pre-Covid levels"
            description="Rail passenger journeys reached an estimated 1.60 billion in 2024/25, recovering to 92% of pre-pandemic levels. Leisure travel has fully recovered and in some quarters exceeded 2019 levels, driven by younger travellers choosing rail for city breaks and events. The introduction of single-leg pricing on LNER routes increased off-peak bookings by 11%. If extended network-wide under Great British Railways, simpler pricing could accelerate the recovery further and begin to close the cost gap with driving."
            source="Source: ORR — Passenger Rail Usage, 2024/25. LNER single-leg pricing evaluation, 2024."
          />
        </ScrollReveal>

        {/* Sources & Methodology */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://dataportal.orr.gov.uk/statistics/finance/rail-fares/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Office of Rail and Road (ORR)</a> — primary data source for fares indices and cost per mile. Retrieved January 2025.</p>
            <p><a href="https://www.racfoundation.org/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">RAC Foundation</a> — comparative motoring cost data. Retrieved January 2025.</p>
            <p><a href="https://dataportal.orr.gov.uk/statistics/usage/passenger-rail-usage/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ORR Passenger Rail Usage</a> — passenger journey statistics. Retrieved January 2025.</p>
            <p>Real-terms adjustments use CPI (CPIH) as the deflator. The fare index is rebased to 2010 = 100 for comparability. Cost-per-mile figures for car travel include fuel, insurance, depreciation, and maintenance averaged across all vehicle types. Season ticket index tracks regulated commuter fares on the most-used routes into London. All figures are for Great Britain unless otherwise stated.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
