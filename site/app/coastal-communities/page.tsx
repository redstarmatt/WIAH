'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// -- Types --

interface CoastalCommunitiesData {
  national: {
    wageGap: Array<{ year: number; coastalVsNational: number }>;
    populationChange: Array<{ year: number; netMigrationThousands: number }>;
    byIndicator: Array<{ indicator: string; coastalPct: number; nationalPct: number }>;
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

// -- Component --

export default function CoastalCommunitiesPage() {
  const [data, setData] = useState<CoastalCommunitiesData | null>(null);

  useEffect(() => {
    fetch('/data/coastal-communities/coastal_communities.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // Wage gap series
  const wageSeries: Series[] = data
    ? [
        {
          id: 'wage-gap',
          label: 'Coastal wage gap vs national median (%)',
          colour: '#264653',
          data: data.national.wageGap.map(d => ({
            date: new Date(d.year, 5, 1),
            value: d.coastalVsNational,
          })),
        },
      ]
    : [];

  // Population migration series
  const migrationSeries: Series[] = data
    ? [
        {
          id: 'migration',
          label: 'Net population migration (thousands)',
          colour: '#264653',
          data: data.national.populationChange.map(d => ({
            date: new Date(d.year, 5, 1),
            value: d.netMigrationThousands,
          })),
        },
      ]
    : [];

  return (
    <>
      <TopicNav topic="Coastal Communities" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Coastal Communities"
          question="Are Britain's Coastal Towns Being Left Behind?"
          finding="Coastal communities in England are among the most economically deprived in the country: average wages are 17% below the national median, and child poverty rates are 10 percentage points higher than inland areas. Many seaside towns that boomed as Victorian holiday resorts have seen three decades of economic decline as tourism shifted abroad. Health outcomes, school performance, and life expectancy all lag the national average."
          colour="#264653"
          preposition="in"
        />

        {/* Context section (MUST come before SectionNav) */}
        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England's coastal communities sit outside the city-deal and urban-regeneration frameworks that have shaped most post-industrial policy. Average wages are 17% below the national median — a gap that has widened from 12% in 2010 — child poverty runs at 34% against a national average of 24%, and economic inactivity is five percentage points above the national figure. In the most deprived coastal authorities — Blackpool, Thanet, Torbay, East Lindsey, Hastings — life expectancy is 8–10 years below the national average. Second homes and holiday lets have displaced working-age residents in many areas: in parts of the South West, one in five households is a second home, pushing property prices beyond the reach of local earners and accelerating the outflow of young people. Some 40% of coastal areas record GCSE attainment below the national average, and GP patient lists are above average in 67% of coastal areas.</p>
            <p>The Coastal Communities Fund (£200 million, 2012–2022) and Levelling Up Fund designations have delivered capital spending without reliably changing the structural conditions that produce persistent deprivation. A few towns — Margate, Whitstable, parts of Scarborough — have seen culture-led regeneration shift their trajectories, but these tend to involve proximity to large cities or specific local assets that are not replicable. The burden falls most heavily on older residents with complex health needs and on children in schools losing pupils and funding as working-age families relocate.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-context', label: 'Context' },
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-charts', label: 'Charts' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Overview: Metric Cards */}
        <section id="sec-overview" className="mt-8">
          <div className="grid gap-4 md:grid-cols-3 mb-12">
            <MetricCard
              label="Coastal wage gap vs national median"
              value="–17%"
              direction="down"
              polarity="up-is-good"
              changeText="2023 · Gap widened from –12% in 2010 · Average wages in coastal communities"
              source="ONS Annual Survey of Hours &amp; Earnings"
              href="#sec-charts"/>
            <MetricCard
              label="Coastal child poverty rate"
              value="34%"
              direction="up"
              polarity="up-is-bad"
              changeText="vs 24% national average · 10 percentage point gap"
              source="DLUHC English Indices of Deprivation"
              href="#sec-sources"/>
            <MetricCard
              label="Net population migration from coastal towns (2010–2019 average)"
              value="–8,000"
              unit="per year"
              direction="flat"
              polarity="up-is-good"
              changeText="Young people leaving for cities · COVID briefly reversed trend in 2020"
              source="ONS Migration Statistics"
              href="#sec-sources"/>
          </div>
        </section>

        {/* Charts section */}
        <section id="sec-charts" className="mt-12">
          <ScrollReveal>
            <div className="mb-12">
              <h3 className="text-[18px] font-bold text-wiah-black mb-2">Coastal wage gap over time</h3>
              <p className="text-sm text-wiah-mid mb-6">Coastal wages as percentage difference from national median, 2010–2023</p>
              <div className="bg-white rounded-lg border border-wiah-border p-6">
                {data ? (
                  <LineChart title="Coastal wage gap over time" series={wageSeries} />
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-wiah-mid">Loading...</div>
                )}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mb-12">
              <h3 className="text-[18px] font-bold text-wiah-black mb-2">Net population migration from coastal towns</h3>
              <p className="text-sm text-wiah-mid mb-6">Annual net migration (thousands), 2010–2023. Positive 2020 reflects COVID-era move to coast; trend reverting.</p>
              <div className="bg-white rounded-lg border border-wiah-border p-6">
                {data ? (
                  <LineChart title="Net population migration from coastal towns" series={migrationSeries} />
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-wiah-mid">Loading...</div>
                )}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mb-12">
              <h3 className="text-[18px] font-bold text-wiah-black mb-2">Coastal vs national deprivation indicators</h3>
              <p className="text-sm text-wiah-mid mb-6">Coastal areas consistently show higher deprivation across multiple measures</p>
              <div className="bg-white rounded-lg border border-wiah-border p-6">
                {data ? (
                  (() => {
                    const maxPct = Math.max(...data.national.byIndicator.flatMap(d => [d.coastalPct, d.nationalPct]));
                    return (
                      <div className="space-y-5">
                        <div className="flex gap-5 font-mono text-[11px] text-wiah-mid mb-1">
                          <span className="flex items-center gap-1.5">
                            <span className="inline-block w-3 h-2 rounded-sm" style={{ backgroundColor: '#264653' }} />
                            Coastal
                          </span>
                          <span className="flex items-center gap-1.5">
                            <span className="inline-block w-3 h-2 rounded-sm bg-wiah-mid" style={{ opacity: 0.4 }} />
                            National
                          </span>
                        </div>
                        {data.national.byIndicator.map(d => (
                          <div key={d.indicator}>
                            <div className="flex justify-between text-sm mb-1.5">
                              <span className="text-wiah-black">{d.indicator}</span>
                              <span className="font-mono text-wiah-mid">Coastal: {d.coastalPct}% · National: {d.nationalPct}%</span>
                            </div>
                            <div className="space-y-1">
                              <div className="relative h-2 bg-wiah-border rounded-full overflow-hidden">
                                <div
                                  className="h-full rounded-full"
                                  style={{ width: `${(d.coastalPct / maxPct) * 100}%`, backgroundColor: '#264653' }}
                                />
                              </div>
                              <div className="relative h-2 bg-wiah-border rounded-full overflow-hidden">
                                <div
                                  className="h-full rounded-full"
                                  style={{ width: `${(d.nationalPct / maxPct) * 100}%`, backgroundColor: '#6B7280', opacity: 0.5 }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()
                ) : (
                  <div className="text-wiah-mid">Loading...</div>
                )}
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Sources section */}
        <section id="sec-sources" className="mt-12 border-t border-wiah-border pt-8">
          <h2 className="text-[18px] font-bold text-wiah-black mb-6">Sources &amp; Methodology</h2>
          {data?.metadata.sources ? (
            <div className="space-y-4 mb-8">
              {data.metadata.sources.map((source, idx) => (
                <div key={idx} className="font-mono text-sm text-wiah-mid">
                  <strong className="text-wiah-black">{source.name}</strong>: {source.dataset} ({source.frequency})
                  <br />
                  <a href={source.url} className="text-wiah-blue hover:underline">
                    {source.url}
                  </a>
                </div>
              ))}
            </div>
          ) : null}
          {data?.metadata.methodology ? (
            <div className="mb-8">
              <h3 className="text-sm font-bold text-wiah-black mb-2">Methodology</h3>
              <p className="text-sm text-wiah-black leading-relaxed">{data.metadata.methodology}</p>
            </div>
          ) : null}
          {data?.metadata.knownIssues && data.metadata.knownIssues.length > 0 ? (
            <div>
              <h3 className="text-sm font-bold text-wiah-black mb-2">Known issues</h3>
              <ul className="text-sm text-wiah-black space-y-1 list-disc list-inside">
                {data.metadata.knownIssues.map((issue, idx) => (
                  <li key={idx}>{issue}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>
      </main>
    </>
  );
}
