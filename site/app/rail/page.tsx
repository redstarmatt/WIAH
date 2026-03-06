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

interface PunctualityPoint {
  year: number;
  onTimePct: number;
}

interface CancellationPoint {
  year: number;
  cancellationPct: number;
}

interface PassengerPoint {
  year: number;
  journeysBillions: number;
}

interface RailData {
  national: {
    punctuality: {
      timeSeries: PunctualityPoint[];
      latestYear: number;
      latestOnTimePct: number;
      note: string;
    };
    cancellations: {
      timeSeries: CancellationPoint[];
      latestYear: number;
      latestPct: number;
    };
    passengerJourneys: {
      timeSeries: PassengerPoint[];
      latestYear: number;
      latestBillions: number;
      preCOVIDPeak: number;
    };
    subsidyPerJourney: {
      timeSeries: Array<{ year: number; subsidyGBP: number }>;
      latestYear: number;
      latestSubsidyGBP: number;
      totalSubsidy2023BillionGBP: number;
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

export default function RailPage() {
  const [data, setData] = useState<RailData | null>(null);

  useEffect(() => {
    fetch('/data/rail/rail.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  // 1. Punctuality
  const punctualitySeries: Series[] = data
    ? [{
        id: 'punctuality',
        label: 'On-Time %',
        colour: '#264653',
        data: data.national.punctuality.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.onTimePct,
        })),
      }]
    : [];

  const punctualityAnnotations: Annotation[] = [
    { date: new Date(2018, 5, 1), label: 'May 2018: Timetable collapse' },
    { date: new Date(2020, 5, 1), label: '2020: COVID' },
  ];

  // 2. Cancellations
  const cancellationsSeries: Series[] = data
    ? [{
        id: 'cancellations',
        label: 'Cancellation %',
        colour: '#F4A261',
        data: data.national.cancellations.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.cancellationPct,
        })),
      }]
    : [];

  // 3. Passenger journeys
  const passengerSeries: Series[] = data
    ? [{
        id: 'passengers',
        label: 'Passenger journeys (billions)',
        colour: '#2A9D8F',
        data: data.national.passengerJourneys.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.journeysBillions,
        })),
      }]
    : [];

  const passengerAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: COVID — 77% drop' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Rail" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Rail"
          question="Is Britain's Railway Actually Working?"
          finding={
            data
              ? `Rail punctuality has fallen to ${data.national.punctuality.latestOnTimePct}% — the worst since records began — with 1 in 14 trains cancelled. Passenger numbers have recovered to 93% of pre-pandemic levels, but the network costs £8bn a year in public subsidy, four times the pre-pandemic level.`
              : 'Rail punctuality and reliability have deteriorated significantly.'
          }
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Britain's railways carried 1.74 billion passenger journeys in 2019 — the highest since the 1920s. COVID-19 cut that by 77%, to 390 million in 2020, and the government absorbed all revenue risk through Emergency Recovery Measures Agreements costing over £10 billion between 2020 and 2022. Demand has since recovered to 1.61 billion journeys in 2024, or 93% of the pre-pandemic peak, but the pattern has reshaped permanently: Monday and Friday off-peak volumes now run below Tuesday–Wednesday levels as hybrid working stabilises. Season ticket sales remain roughly 30% below 2019, while anytime and flexible fares have grown — a structural shift that undermines the old franchise revenue model.
            </p>
            <p>
              Service quality has worsened on almost every measure. The On-Time metric — arrival within 59 seconds for commuter trains, 3 minutes for long-distance — fell to 71.7% in 2023, the worst since the statistic was introduced in the late 1990s. Cancellations rose from 1.8% in 2014 to 4.4% in 2022, partially recovering to 3.1% in 2024. The May 2018 timetable collapse, when GTR/Thameslink and Northern launched new schedules simultaneously, was catastrophic for northern commuters and wiped out six years of punctuality gains. The Williams-Shapps Plan for Rail aims to consolidate 14 fragmented Train Operating Companies into a single public body, Great British Railways; Labour has committed to the reform, but legislation remains pending.
            </p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-punctuality', label: 'Punctuality' },
          { id: 'sec-passengers', label: 'Passengers' },
          { id: 'sec-cancellations', label: 'Cancellations' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Train punctuality (On-Time)"
            value="72.2%"
            unit=""
            direction="down"
            polarity="up-is-good"
            changeText="2024 · Worst since records began · Was 89% in 2016 · 1 in 4 trains late"
            sparklineData={[88.8, 88.8, 89.2, 87.8, 85.2, 84.4, 91.2, 91.3, 84.1, 71.7, 72.2]}
            href="#sec-punctuality"
          />
          <MetricCard
            label="Cancellation rate"
            value="3.1%"
            unit=""
            direction="down"
            polarity="up-is-bad"
            changeText="2024 · Improving from 4.4% peak (2022) · Still nearly double pre-COVID 1.8%"
            sparklineData={[1.8, 1.9, 1.9, 2.0, 2.0, 2.3, 2.5, 2.8, 4.4, 3.5, 3.1]}
            href="#sec-punctuality"
          />
          <MetricCard
            label="Passenger journeys"
            value="1.61bn"
            unit=""
            direction="up"
            polarity="up-is-good"
            changeText="2024 · 93% of pre-pandemic peak · Recovery slowing as hybrid working stabilises"
            sparklineData={[1.62, 1.65, 1.69, 1.72, 1.74, 0.39, 0.80, 1.41, 1.56, 1.61]}
            href="#sec-punctuality"
          />
        </div>
        </ScrollReveal>

        {/* Charts */}
        <ScrollReveal>
        <section id="sec-punctuality" className="mb-12">
          <LineChart
            title="Train punctuality (On-Time measure), 2014–2024"
            subtitle="Percentage of trains arriving on time (within 59 seconds for commuter, 3 minutes for long-distance). Fell to 71.7% in 2023 — the worst on record — driven by staff shortages, infrastructure failures, and strike action."
            series={punctualitySeries}
            annotations={punctualityAnnotations}
            yLabel="%"
          />
        </section>
        </ScrollReveal>

        <ScrollReveal>
        <section id="sec-passengers" className="mb-12">
          <LineChart
            title="Rail passenger journeys, Great Britain, 2014–2024"
            subtitle="Billions of passenger journeys per year. Collapsed during COVID-19 from 1.74bn (2019) to 390m (2020). Recovery to 1.61bn (93% of pre-COVID peak) but commuter patterns have permanently changed."
            series={passengerSeries}
            annotations={passengerAnnotations}
            yLabel="Billions"
          />
        </section>
        </ScrollReveal>

        <ScrollReveal>
        <section id="sec-cancellations" className="mb-12">
          <LineChart
            title="Train cancellation rate, 2014–2024"
            subtitle="Percentage of scheduled trains cancelled (full or partial). Rose from 1.8% in 2014 to a peak of 4.4% in 2022. Improving in 2023–24 but still well above pre-pandemic normal."
            series={cancellationsSeries}
            yLabel="%"
          />
        </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
        <PositiveCallout
          title="What's improving"
          value="1.61bn"
          unit="journeys in 2024 — 93% of pre-pandemic peak, fastest recovery in Europe"
          description="UK rail passenger numbers have recovered faster than most European networks. From a COVID low of 390 million journeys in 2020, demand has rebounded to 1.61 billion in 2024. The government's commitment to Great British Railways — a single public body to own track and co-ordinate services — promises to end the fragmentation between Network Rail and 14 separate Train Operating Companies. Contactless ticketing and flexible season tickets have improved for passengers who commute part-time."
          source="Source: ORR — National rail trends Q4 2023/24."
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
