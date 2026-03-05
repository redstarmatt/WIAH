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

interface RuralServicesData {
  national: {
    busRoutes: {
      timeSeries: Array<{ year: number; routesIndexed: number }>;
      latestYear: number;
      latestIndexed: number;
      routesCutSince2010: number;
    };
    ruralGpAccess: {
      timeSeries: Array<{ year: number; avgMilesToGP: number }>;
      latestYear: number;
      latestMiles: number;
      urbanAvgMiles: number;
    };
    byServiceType: Array<{ service: string; changePct: number }>;
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function RuralServicesPage() {
  const [data, setData] = useState<RuralServicesData | null>(null);

  useEffect(() => {
    fetch('/data/rural-services/rural_services.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const busRoutesSeries: Series[] = data
    ? [{
        id: 'buses',
        label: 'Route index (2012 = 100)',
        colour: '#264653',
        data: data.national.busRoutes.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.routesIndexed,
        })),
      }]
    : [];

  const busAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: COVID-19' },
  ];

  const gpAccessSeries: Series[] = data
    ? [{
        id: 'gp',
        label: 'Miles to GP',
        colour: '#264653',
        data: data.national.ruralGpAccess.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.avgMilesToGP,
        })),
      }]
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Rural Services" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Rural Services"
          question="What Happens When You Live Far From Everything?"
          finding="10 million people live in rural England. 1,000 bus routes have been cut since 2010. Rural GP surgeries are closing at twice the rate of urban practices. Broadband coverage leaves 740,000 rural premises unable to access a 10Mbps connection. Rural residents travel on average 8 miles further to reach a GP than urban residents."
          colour="#264653"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Ten million people live in rural England &mdash; 17&percnt; of the population spread across 86&percnt; of the land area. Since 2010, more than 1,000 bus routes have been cut after local authority subsidies fell 57&percnt; in real terms; rural residents now travel an average of 5.8 miles to their nearest GP against 0.8 miles for urban residents; 45&percnt; of rural bank branches have closed; and 740,000 premises cannot access a 10Mbps broadband connection. The National Bus Strategy (2021) allocated &pound;4.65 billion through Bus Service Improvement Plans, and Project Gigabit targets full-fibre connection for 1 million hard-to-reach premises by 2025 &mdash; but the cumulative scale of disinvestment since 2010 in transport, health, banking, and digital infrastructure has not yet been reversed. Over-65s make up 25&percnt; of the rural population, rising to a projected 30&percnt; by 2035, meaning demand for health and social care is growing in exactly the areas where services are thinnest.</p>
            <p>The burden falls hardest on the 17&percnt; of rural households without a car &mdash; overwhelmingly elderly, disabled, or low-income &mdash; who cannot substitute private transport for what has been lost. Fuel poverty hits rural areas disproportionately as 14&percnt; of households rely on heating oil rather than mains gas, placing them outside the energy price cap. House prices in National Parks and AONBs run at 11&ndash;12 times local earnings versus 7.5 times nationally, locking younger residents out of the communities that depend on them for economic and service sustainability.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-buses', label: 'Bus Services' },
          { id: 'sec-gp', label: 'GP Access' },
          { id: 'sec-services', label: 'Service Decline' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Rural bus routes cut since 2010"
              value="1,000+"
              direction="down"
              polarity="up-is-good"
              changeText="2023 &middot; 23% of rural routes gone &middot; 17% of rural households have no car &middot; Elderly and disabled most affected"
              sparklineData={[100, 97, 94, 92, 89, 86, 83, 82, 70, 74, 76, 77]}
              href="#sec-overview"/>
            <MetricCard
              label="Average miles to GP for rural residents"
              value="5.8"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 &middot; Urban average: 0.8 miles &middot; Rural GP surgeries closing 2x faster than urban &middot; 740K rural premises lack decent broadband"
              sparklineData={[3.8, 4.0, 4.3, 4.5, 4.7, 5.0, 5.2, 5.5, 5.8]}
              href="#sec-buses"/>
            <MetricCard
              label="Bank branches closed in rural areas since 2010"
              value="45%"
              direction="down"
              polarity="up-is-good"
              changeText="2023 &middot; Pubs down 28% &middot; Libraries down 30% &middot; Post offices down 14% &middot; Digital-only services excluding the digitally excluded"
              sparklineData={[100, 95, 88, 82, 76, 70, 65, 60, 57, 56, 55, 55]}
              href="#sec-gp"/>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-buses" className="mb-12">
            <LineChart
              title="Rural bus route index, England, 2012&ndash;2023 (2012 = 100)"
              subtitle="Indexed change in number of registered bus routes serving rural areas."
              series={busRoutesSeries}
              annotations={busAnnotations}
              yLabel="Route index (2012 = 100)"
              source={{
                name: 'DfT',
                dataset: 'Bus Statistics — Annual Bus Route Data',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-gp" className="mb-12">
            <LineChart
              title="Average distance to nearest GP surgery for rural residents, England, 2015&ndash;2023"
              subtitle="Average miles to nearest GP practice from rural residential postcodes."
              series={gpAccessSeries}
              yLabel="Miles to GP"
              source={{
                name: 'NHS Digital',
                dataset: 'GP Practice Registered Patients Distance',
                frequency: 'quarterly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-services" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">Service decline in rural areas, 2010&ndash;2023</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Percentage change in key services from 2010 baseline.</p>
            {data && (
              <div className="space-y-3">
                {data.national.byServiceType.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-xs font-mono text-wiah-mid mb-1">
                      <span>{item.service}</span>
                      <span>{item.changePct}%</span>
                    </div>
                    <div className="w-full bg-wiah-border rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{ width: `${Math.abs(item.changePct) / 50 * 100}%`, backgroundColor: '#264653' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: CPRE &amp; Rural England research, 2023</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s improving"
            value="&pound;4.65bn"
            unit="National Bus Strategy investment to restore services through Bus Service Improvement Plans"
            description="The National Bus Strategy (2021) required every local transport authority in England to produce a Bus Service Improvement Plan to reverse years of decline. The &pound;4.65 billion allocated through Bus Service Improvement Plans offers the first systematic reinvestment in rural connectivity since deregulation in 1985. The Levelling Up agenda included a &pound;150 million Rural England Prosperity Fund (2023) for community infrastructure. Project Gigabit aims to connect 1 million hard-to-reach premises to full-fibre broadband by 2025. The NHS Long-Term Plan includes &pound;250 million for community diagnostic centres, bringing specialist services closer to rural populations."
            source="Source: DfT &mdash; Bus Statistics 2023; NHS Digital &mdash; Patients Registered at GP Practice 2023."
          />
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
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
