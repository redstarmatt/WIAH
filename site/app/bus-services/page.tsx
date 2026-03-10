'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

interface DataPoint {
  year: number;
    outsideLondonBn: number;
    londonBn: number;
    laSpendingM: number;
    routesCut: number;
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

export default function BusServicesPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/bus-services/bus_services.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const series1: Series[] = data ? [
    {
      id: 'outsideLondonBn',
      label: "Outside London (billion journeys)",
      colour: "#E63946",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.outsideLondonBn })),
    },
    {
      id: 'londonBn',
      label: "London (billion journeys)",
      colour: "#264653",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.londonBn })),
    },
  ] : [];

  const series2: Series[] = data ? [
    {
      id: 'laSpendingM',
      label: "LA bus subsidies (\u00a3m real terms)",
      colour: "#264653",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.laSpendingM })),
    },
    {
      id: 'routesCut',
      label: "Cumulative routes cut",
      colour: "#E63946",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.routesCut })),
    },
  ] : [];

  const annotations1: Annotation[] = [
    { date: new Date(2020, 0, 1), label: "2020: COVID-19 collapse" },
    { date: new Date(2023, 0, 1), label: "2023: Bus Back Better launched" },
  ];

  const annotations2: Annotation[] = [
    { date: new Date(2010, 0, 1), label: "2010: Spending cuts begin" },
    { date: new Date(2017, 0, 1), label: "2017: Bus Services Act" },
  ];

  return (
    <>
      <TopicNav topic="Bus Services" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Transport & Infrastructure"
          question="What Has Happened to Britain's Buses?"
          finding="Bus passenger journeys outside London have fallen 45% since 1985; 3,000 routes have been cut since 2010 as subsidies were withdrawn. Many rural areas now have no bus service at all."
          colour="#264653"
        />

        <section className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Bus passenger journeys outside London have fallen 45% since 1985; 3,000 routes have been cut since 2010 as subsidies were withdrawn. Many rural areas now have no bus service at all. The data below draws on official sources to show how this has changed over the past decade and where the pressures are most acute.
            </p>
            <p>
              The figures reflect a structural pattern rather than a short-term fluctuation. Understanding the scale of the issue is the first step toward holding policymakers to account for the decisions that shape these outcomes.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: "Outside London" },
          { id: 'sec-chart2', label: "LA bus subsidies" },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Journeys outside London vs 1985"
            value="-45%"
            unit=""
            direction="down"
            polarity="up-is-good"
            changeText="From 4.7bn to 2.6bn per year \u00b7 long collapse"
            sparklineData={[3.3,3.2,3.2,3.1,3.1,3.0,2.5,2.6,2.7,2.7,2.6]}
            href="#sec-chart1"
          />
          <MetricCard
            label="Subsidised routes cut since 2010"
            value="3,000+"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Local authority funding down 40% since 2010"
            sparklineData={[200,400,600,900,1200,1500,1800,2200,2600,2900,3000]}
            href="#sec-chart2"
          />
          <MetricCard
            label="Areas with no bus service"
            value="~40%"
            unit=" of rural areas"
            direction="up"
            polarity="up-is-bad"
            changeText="Estimated from route data \u00b7 rising"
            sparklineData={[20,22,25,27,29,31,33,35,37,39,40]}
            href="#sec-chart1"
          />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Bus passenger journeys outside London, 2015\u20132024"
              subtitle="Annual bus passenger journeys in England outside London (billions). London excluded as it is funded under a different system. The pandemic collapsed journeys; recovery has been partial."
              series={series1}
              annotations={annotations1}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Local authority bus subsidy spending, 2010\u20132024"
              subtitle="Real-terms (2024 prices) local authority spending on bus service support. Spending has fallen by 40% since 2010 as councils faced austerity cuts."
              series={series2}
              annotations={annotations2}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Bus Back Better \u2014 \u00a33bn committed"
            value="\u00a33bn"
            unit="Bus Back Better programme"
            description="The government committed \u00a33 billion over three years through the Bus Back Better programme. Combined Authorities in Greater Manchester, West Yorkshire and the West Midlands have used new franchising powers to re-regulate networks, stabilise timetables and cap fares. Manchester's Bee Network carried 160 million bus journeys in its first year \u2014 a 20% increase on pre-franchising levels."
            source="Source: DfT \u2014 Bus open data service and Bus Back Better progress, 2025."
          />
        </ScrollReveal>

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
