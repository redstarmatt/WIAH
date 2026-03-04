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
          question="Are Britain&apos;s Coastal Towns Being Left Behind?"
          finding="Coastal communities in England are among the most economically deprived in the country: average wages are 17% below the national median, and child poverty rates are 10 percentage points higher than inland areas. Many seaside towns that boomed as Victorian holiday resorts have seen three decades of economic decline as tourism shifted abroad. Health outcomes, school performance, and life expectancy all lag the national average."
          colour="#264653"
          preposition="in"
        />

        {/* Context section (MUST come before SectionNav) */}
        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England&apos;s coastal towns contain some of the most concentrated deprivation in the country, yet they sit outside the frameworks &mdash; urban regeneration, city deals, combined authorities &mdash; that have shaped most post-industrial policy. Average wages in coastal communities are 17% below the national median, a gap that has widened from 12% in 2010. Child poverty runs at 34% against a national average of 24%. Economic inactivity among working-age adults reaches 24%, five percentage points above the national figure. In the most deprived coastal authorities &mdash; Blackpool, Thanet, Torbay, East Lindsey, Hastings &mdash; life expectancy is 8&ndash;10 years lower than the national average. These are not marginal differences.</p>
            <p>The structural driver is a combination of industrial withdrawal and demographic distortion. Fishing, manufacturing, and seaside tourism &mdash; the economic base of many coastal towns &mdash; contracted sharply over the second half of the twentieth century and were not replaced. What filled the gap, in housing terms, was second homes and holiday lets. In some parts of the South West, one in five households is a second home or holiday let; in Salcombe, the figure approaches 60%. The St Ives neighbourhood plan, backed by a 2016 referendum, attempted to restrict new-build sales to permanent residents &mdash; a rare case of democratic pushback against the displacement effect. But house prices in coastal areas have continued to rise in ways that accelerate the outflow of young working-age residents and the inflow of retired and semi-retired incomers. The resulting age profile leaves communities with high health and social care demand, limited working-age tax base, and schools losing pupils and funding.</p>
            <p>Educational and health infrastructure has not adapted well to this demographic mix. Around 40% of coastal areas record GCSE attainment below the national average. GP patient lists are above the national average in 67% of coastal areas, with recruitment particularly difficult in isolated locations. The Covid-19 period briefly complicated the picture: a temporary influx of remote workers between 2020 and 2021 pushed up property prices further while providing a short-term economic stimulus to local businesses. Much of that inflow has since reversed, but the house price effects have not.</p>
            <p>Government investment has been substantial in name if uneven in impact. The Coastal Communities Fund ran from 2012 to 2022 and invested around &pound;200 million in more than 300 projects. The Levelling Up Fund designated many coastal towns as priority areas from 2021, and there have been genuine investments in infrastructure and facilities. But the academic and policy assessment of place-based regeneration funds is consistently mixed: short-term capital spending does not reliably change the structural conditions that produce persistent deprivation. Some towns &mdash; Margate, Whitstable, parts of Scarborough &mdash; have seen arts- and culture-led regeneration that has shifted their trajectories. These cases are real, but they tend to involve proximity to large cities, existing heritage assets, or specific local leadership that is difficult to replicate.</p>
            <p>What the aggregate data cannot distinguish is the difference between a coastal community in managed long-term decline and one that is beginning to stabilise. Wages, poverty rates, and inactivity figures are measured at local authority level, which can mask sharp variation between a thriving harbour town and a struggling inland ward five miles away. The data also cannot easily separate the effects of deliberate policy from wider housing market shifts, tourism trends, or the contingent factor of which businesses happened to invest or close. Coastal disadvantage is well-documented; the conditions under which specific places turn the corner remain genuinely uncertain.</p>
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
              value="&ndash;17%"
              direction="down"
              polarity="up-is-good"
              changeText="2023 &middot; Gap widened from &ndash;12% in 2010 &middot; Average wages in coastal communities"
              source="ONS Annual Survey of Hours &amp; Earnings"
              onExpand={() => {}}
            />
            <MetricCard
              label="Coastal child poverty rate"
              value="34%"
              direction="up"
              polarity="up-is-bad"
              changeText="vs 24% national average &middot; 10 percentage point gap"
              source="DLUHC English Indices of Deprivation"
              onExpand={() => {}}
            />
            <MetricCard
              label="Net population migration from coastal towns (2010&ndash;2019 average)"
              value="&ndash;8,000"
              unit="per year"
              direction="flat"
              polarity="up-is-good"
              changeText="Young people leaving for cities &middot; COVID briefly reversed trend in 2020"
              source="ONS Migration Statistics"
              onExpand={() => {}}
            />
          </div>
        </section>

        {/* Charts section */}
        <section id="sec-charts" className="mt-12">
          <ScrollReveal>
            <div className="mb-12">
              <h3 className="text-[18px] font-bold text-wiah-black mb-2">Coastal wage gap over time</h3>
              <p className="text-sm text-wiah-mid mb-6">Coastal wages as percentage difference from national median, 2010&ndash;2023</p>
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
              <p className="text-sm text-wiah-mid mb-6">Annual net migration (thousands), 2010&ndash;2023. Positive 2020 reflects COVID-era move to coast; trend reverting.</p>
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
                  <div className="space-y-4">
                    {data.national.byIndicator.map(d => (
                      <div key={d.indicator}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-wiah-black">{d.indicator}</span>
                          <span className="font-mono text-wiah-mid">Coastal: {d.coastalPct}% / National: {d.nationalPct}%</span>
                        </div>
                        <div className="relative h-2 bg-wiah-border rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${d.coastalPct}%`,
                              backgroundColor: '#264653',
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
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
