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
            <p>Ten million people live in rural England &mdash; 17% of the population spread across 86% of the land area. The arithmetic of rural service provision has never been favourable: fewer residents per square mile means higher costs per user and thinner commercial viability. Since 2010, more than 1,000 bus routes have been cut. Rural residents now travel an average of 5.8 miles to their nearest GP, against 0.8 miles for urban residents. Forty-five per cent of rural bank branches have closed. Some 740,000 premises cannot access a 10Mbps broadband connection &mdash; the government&apos;s own minimum &ldquo;decent&rdquo; standard. The 17% of rural households without a car are overwhelmingly elderly, disabled, or low-income: those with the least capacity to absorb the distance.</p>
            <p>The causes are structural and long-running. Bus deregulation under the Transport Act 1985 left rural services entirely dependent on local authority subsidies; those subsidies were cut by 57% in real terms between 2010 and 2020. GP surgeries in rural areas face a compounding disadvantage: they pay on average &pound;10,000 less in annual pay than urban practices, carry smaller patient lists that reduce NHS income, and bear higher per-patient running costs. Bank branch closures accelerated as digital banking expanded &mdash; 6,000 branches closed across the UK between 2015 and 2023, with rural and ex-industrial areas absorbing a disproportionate share. Post offices, pubs, and public libraries followed identical economic logic: fixed costs that cannot be shared across a critical mass of nearby users.</p>
            <p>The consequence is a compound service desert in which the loss of any one amenity accelerates the closure of others. A pub closes, then the post office it housed, then the GP surgery whose patients relied on a shared car, then the bus route that connected them. The National Bus Strategy (2021) allocated &pound;4.65 billion through Bus Service Improvement Plans and represented the first systematic reinvestment in rural connectivity since 1985. Project Gigabit targets connection of 1 million hard-to-reach premises to full-fibre broadband by 2025. The Rural England Prosperity Fund (&pound;150 million, 2023) and the NHS&apos;s 40 community diagnostic centres offer partial remedies. But the cumulative scale of disinvestment since 2010 &mdash; in transport, health, banking, and digital infrastructure simultaneously &mdash; has not yet been reversed.</p>
            <p>The demographic profile of rural England amplifies every service withdrawal. Over-65s make up 25&percnt; of the rural population compared with 16&percnt; in major urban areas, and ONS projections show the rural proportion rising to 30&percnt; by 2035 as younger residents leave for employment and older homeowners age in place. District nursing visits in sparse rural areas cost the NHS an estimated 35&ndash;45&percnt; more per contact than urban equivalents once travel time is factored in, yet funding formulae based on weighted capitation do not fully compensate for sparsity. The agricultural workforce fell from 540,000 in 2000 to 466,000 in 2023 and faces further contraction as Environmental Land Management schemes replace area-based Basic Payment subsidies &mdash; the National Farmers&apos; Union estimates 10&ndash;15&percnt; of farms will become unviable during the transition. Fuel poverty hits rural households disproportionately because 14&percnt; rely on heating oil rather than mains gas, placing them outside the energy price cap and exposed to unregulated wholesale markets where prices spiked 150&percnt; between 2021 and 2023. Planning restrictions in National Parks and Areas of Outstanding Natural Beauty, which cover 24&percnt; of England&apos;s land area, constrain affordable housing development, pushing local house prices to 11&ndash;12 times median workplace earnings versus 7.5 times nationally.</p>
            <p>Measuring rural service provision is complicated by definitional inconsistency across government departments. The ONS Rural-Urban Classification, last updated using 2011 Census data, assigns Output Areas to six categories, but many datasets &mdash; including NHS workforce statistics and DfE school performance tables &mdash; use only a binary rural/urban split, collapsing market towns of 15,000 people into the same category as farmsteads. Broadband coverage figures from Ofcom report premises as &ldquo;served&rdquo; at 10Mbps download, a threshold set in 2015 that bears little relationship to modern household need, and do not capture actual speeds experienced, which in rural areas frequently fall 30&ndash;50&percnt; below advertised rates due to line length and contention. Bus service data relies on local authority returns to the DfT, but supported services are often reclassified as &ldquo;commercial&rdquo; when councils transfer funding under different contractual terms, making it difficult to track the true scale of publicly subsidised provision over time. GP access distances cited in Defra&apos;s Statistical Digest of Rural England use straight-line proximity to the nearest surgery, not actual travel time by available transport &mdash; a figure that can differ by a factor of three in areas with poor road connections and no bus service. These measurement gaps systematically understate rural disadvantage when translated into funding formulae and policy decisions.</p>
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
              onExpand={() => {}}
            />
            <MetricCard
              label="Average miles to GP for rural residents"
              value="5.8"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 &middot; Urban average: 0.8 miles &middot; Rural GP surgeries closing 2x faster than urban &middot; 740K rural premises lack decent broadband"
              sparklineData={[3.8, 4.0, 4.3, 4.5, 4.7, 5.0, 5.2, 5.5, 5.8]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Bank branches closed in rural areas since 2010"
              value="45%"
              direction="down"
              polarity="up-is-good"
              changeText="2023 &middot; Pubs down 28% &middot; Libraries down 30% &middot; Post offices down 14% &middot; Digital-only services excluding the digitally excluded"
              sparklineData={[100, 95, 88, 82, 76, 70, 65, 60, 57, 56, 55, 55]}
              onExpand={() => {}}
            />
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
