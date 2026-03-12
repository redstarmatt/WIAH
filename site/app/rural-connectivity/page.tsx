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

interface BroadbandPoint {
  year: number;
  ruralDecentPct: number;
  urbanDecentPct: number;
}

interface BusPoint {
  year: number;
  ruralIndex: number;
  urbanIndex: number;
}

interface MobilePoint {
  year: number;
  rural4GPct: number;
  urban4GPct: number;
}

interface TopicData {
  national: {
    broadband: BroadbandPoint[];
    busJourneys: BusPoint[];
    mobileCoverage: MobilePoint[];
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

export default function RuralConnectivityPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/rural-connectivity/rural_connectivity.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Chart 1: Broadband coverage rural vs urban ────────────────────────────

  const broadbandSeries: Series[] = data
    ? [
        {
          id: 'ruralBroadband',
          label: 'Rural premises (%)',
          colour: '#E63946',
          data: data.national.broadband.map(d => ({
            date: yearToDate(d.year),
            value: d.ruralDecentPct,
          })),
        },
        {
          id: 'urbanBroadband',
          label: 'Urban premises (%)',
          colour: '#264653',
          data: data.national.broadband.map(d => ({
            date: yearToDate(d.year),
            value: d.urbanDecentPct,
          })),
        },
      ]
    : [];

  const broadbandAnnotations: Annotation[] = [
    { date: new Date(2018, 5, 1), label: '2018: Broadband USO introduced' },
    { date: new Date(2021, 5, 1), label: '2021: Project Gigabit launched' },
  ];

  // ── Chart 2: Bus journeys rural vs urban indexed ──────────────────────────

  const busSeries: Series[] = data
    ? [
        {
          id: 'ruralBus',
          label: 'Rural bus journeys (index)',
          colour: '#E63946',
          data: data.national.busJourneys.map(d => ({
            date: yearToDate(d.year),
            value: d.ruralIndex,
          })),
        },
        {
          id: 'urbanBus',
          label: 'Urban bus journeys (index)',
          colour: '#264653',
          data: data.national.busJourneys.map(d => ({
            date: yearToDate(d.year),
            value: d.urbanIndex,
          })),
        },
      ]
    : [];

  const busAnnotations: Annotation[] = [
    { date: new Date(2017, 5, 1), label: '2017: Bus Services Act' },
    { date: new Date(2020, 2, 1), label: '2020: Pandemic' },
  ];

  // ── Chart 3: Mobile coverage rural vs urban ───────────────────────────────

  const mobileSeries: Series[] = data
    ? [
        {
          id: 'rural4G',
          label: 'Rural outdoor 4G (%)',
          colour: '#E63946',
          data: data.national.mobileCoverage.map(d => ({
            date: yearToDate(d.year),
            value: d.rural4GPct,
          })),
        },
        {
          id: 'urban4G',
          label: 'Urban outdoor 4G (%)',
          colour: '#264653',
          data: data.national.mobileCoverage.map(d => ({
            date: yearToDate(d.year),
            value: d.urban4GPct,
          })),
        },
      ]
    : [];

  const mobileAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Shared Rural Network signed' },
    { date: new Date(2023, 5, 1), label: '2023: First SRN masts live' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Rural Connectivity" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Transport"
          question="Can You Actually Live in the Countryside?"
          finding="Rural England is being slowly disconnected. One in ten rural premises still cannot get decent broadband, bus routes have halved since 2010, and 4G coverage lags urban areas by 20 percentage points. The infrastructure gap is driving young people out and leaving those who remain increasingly isolated."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The promise of rural life — space, community, clean air — increasingly collides with a practical reality of missing infrastructure. Ten per cent of rural premises still cannot access what Ofcom defines as decent broadband (10 Mbps download), compared to less than 1% in urban areas. Rural 4G outdoor coverage stands at 79%, against 99% in cities; 5G coverage in rural areas remains below 5%. Over 500,000 premises have no reliable 4G signal from any operator. Project Gigabit, the government's flagship broadband programme, has contracted for 680,000 rural premises to receive gigabit-capable connections, but the hardest-to-reach communities — the final 10–15% — face years of further waiting. The Shared Rural Network, a deal between the four mobile operators to share masts and eliminate total not-spots, is behind its original 2024 deadline for partial coverage targets. Meanwhile, the digital divide compounds every other disadvantage: rural patients book GP appointments online, universal credit is digital by default, and home-working requires the bandwidth that rural areas lack.</p>
            <p>Transport tells a parallel story of withdrawal. Bus routes in rural England have been cut by roughly half since 2010, with an estimated 3,780 routes reduced or withdrawn entirely. Some villages now have no scheduled bus service at all. Rural fuel poverty runs higher than urban despite larger homes, driven by off-gas-grid dependency on heating oil and LPG. Rural GP patients travel on average three times further than their urban counterparts to reach a surgery. Since 2010, around 3,000 rural post office branches have closed, over 600 rural pubs close each year, and 95% of rural bank branches have shut. Supermarket delivery services exclude many rural postcodes or charge premium fees. The cumulative effect is measurable in demographics: rural areas are losing their 18–30 population at twice the urban rate, as young people move to places where they can actually access services, employment, and connectivity. Community transport schemes — serving 12 million passenger trips annually — partially fill the gap, but they cannot replace the systematic withdrawal of commercial and public services from the countryside.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-broadband', label: 'Broadband' },
          { id: 'sec-bus', label: 'Bus Services' },
          { id: 'sec-mobile', label: 'Mobile' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Rural premises without decent broadband"
              value="10%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="vs <1% urban · 500k+ premises below 10 Mbps"
              sparklineData={[45, 39, 33, 28, 22, 19, 17, 15, 13, 11, 10]}
              href="#sec-broadband"
              source="Ofcom · Connected Nations Report 2025"
            />
            <MetricCard
              label="Rural bus routes lost since 2010"
              value="49%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="3,780 routes cut · Some villages have no bus at all"
              sparklineData={[0, 5, 10, 15, 20, 26, 31, 35, 39, 42, 49]}
              href="#sec-bus"
              source="DfT · Bus Statistics; Campaign for Better Transport 2024"
            />
            <MetricCard
              label="Rural 4G outdoor coverage"
              value="79%"
              unit=""
              direction="up"
              polarity="down-is-bad"
              changeText="vs 99% urban · 500k+ premises with no 4G from any operator"
              sparklineData={[41, 48, 55, 60, 64, 68, 72, 76, 79]}
              href="#sec-mobile"
              source="Ofcom · Connected Nations Report 2025"
            />
          </div>
        </ScrollReveal>

        {/* Chart 1: Broadband */}
        <ScrollReveal>
          <section id="sec-broadband" className="mb-12">
            <LineChart
              title="Premises with decent broadband (10 Mbps+), rural vs urban, England, 2015–2025"
              subtitle="Percentage of premises meeting Ofcom's Universal Service Obligation threshold. The gap has narrowed but remains persistent for the hardest-to-reach 10%."
              series={broadbandSeries}
              annotations={broadbandAnnotations}
              yLabel="Premises (%)"
              source={{
                name: 'Ofcom',
                dataset: 'Connected Nations Report',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        {/* Chart 2: Bus journeys */}
        <ScrollReveal>
          <section id="sec-bus" className="mb-12">
            <LineChart
              title="Bus passenger journeys, rural vs urban, England, 2010–2025 (index, 2010=100)"
              subtitle="Rural bus usage has collapsed to half its 2010 level. Urban services recovered faster from the pandemic but remain below pre-2010 levels."
              series={busSeries}
              annotations={busAnnotations}
              yLabel="Index (2010=100)"
              source={{
                name: 'Department for Transport',
                dataset: 'Bus Statistics Table BUS0110',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        {/* Chart 3: Mobile coverage */}
        <ScrollReveal>
          <section id="sec-mobile" className="mb-12">
            <LineChart
              title="Outdoor 4G geographic coverage, rural vs urban, UK, 2017–2025"
              subtitle="Rural 4G coverage has roughly doubled since 2017 but still trails urban areas by 20 percentage points. The Shared Rural Network aims to close the gap by 2026."
              series={mobileSeries}
              annotations={mobileAnnotations}
              yLabel="Coverage (%)"
              source={{
                name: 'Ofcom',
                dataset: 'Connected Nations — Mobile Coverage Data',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="680,000"
            unit="rural premises contracted for gigabit broadband"
            description="Project Gigabit has contracted for 680,000 rural premises to receive gigabit broadband. The Shared Rural Network eliminated 280 total not-spots in its first phase. Community transport schemes now serve 12 million passenger trips per year, partially filling the gap left by commercial operators."
            source="Source: DSIT — Project Gigabit Progress Report, 2025. Ofcom — Connected Nations Report, 2025. Community Transport Association, 2024."
          />
        </ScrollReveal>

        {/* Sources & Methodology */}
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
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
        <RelatedTopics />
      </main>
    </>
  );
}
