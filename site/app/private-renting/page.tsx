'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ──────────────────────────────────────────────────────────────────────

interface RentPoint {
  year: number;
  monthlyGBP: number;
}

interface AffordabilityPoint {
  year: number;
  rentToIncomePct: number;
}

interface RegionalRent {
  region: string;
  monthlyGBP: number;
}

interface PrivateRentingData {
  national: {
    averageRent: {
      timeSeries: RentPoint[];
      latestYear: number;
      latestMonthlyGBP: number;
      londonMonthlyGBP: number;
      outsideLondonGBP: number;
      incomeSharePct: number;
    };
    affordability: {
      timeSeries: AffordabilityPoint[];
      latestYear: number;
      latestPct: number;
    };
    rentByRegion: RegionalRent[];
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function PrivateRentingPage() {
  const [data, setData] = useState<PrivateRentingData | null>(null);

  useEffect(() => {
    fetch('/data/private-renting/private_renting.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // 1. Average rent series
  const rentSeries: Series[] = data
    ? [{
        id: 'rent',
        label: 'Average monthly rent (£)',
        colour: '#F4A261',
        data: data.national.averageRent.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.monthlyGBP,
        })),
      }]
    : [];

  const rentAnnotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: Post-COVID rent acceleration' },
  ];

  // 2. Rent-to-income series
  const affordabilitySeries: Series[] = data
    ? [{
        id: 'affordability',
        label: 'Rent as % of income',
        colour: '#E63946',
        data: data.national.affordability.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.rentToIncomePct,
        })),
      }]
    : [];

  const latestRent = data?.national.averageRent;
  const latestAffordability = data?.national.affordability;

  return (
    <>
      <TopicNav topic="Private Renting" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Private Renting"
          question="Is Private Renting in Britain Actually Affordable?"
          finding={
            latestRent && latestAffordability
              ? `Average private rents in England hit &pound;${latestRent.latestMonthlyGBP.toLocaleString()} per month in 2023 &mdash; up 10% in a single year, the fastest increase since records began. 4.6 million households rent privately. Section 21 &lsquo;no-fault&rsquo; evictions rose 24% in the year to June 2023. The median private renter now spends ${latestAffordability.latestPct}% of gross income on rent &mdash; up from 28% in 2011.`
              : 'Average rents have soared; 4.6 million households now rent privately.'
          }
          colour="#F4A261"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Average private rent in England reached &pound;1,279 per month in 2023 &mdash; up 10% in a single year, the fastest annual increase since ONS records began. Some 4.6 million households now rent privately, 19% of all households, up from 11% in 2001. Section 21 &lsquo;no-fault&rsquo; eviction notices reached 9,578 in Q1 2023, up 24% year-on-year, accounting for 25% of households owed a homelessness duty. Supply has collapsed &mdash; properties listed for rent fell 35% in two years as small landlords sold up, driven by the phased removal of mortgage interest relief and a 3% stamp duty surcharge on buy-to-let purchases. The median renter now spends 34% of gross income on rent, up from 28% in 2011, with 2.2 million households in housing cost overburden.
            </p>
            <p>
              The cost burden falls hardest on younger and lower-income households. Renters aged 25&ndash;34 spend a median 38&percnt; of income on rent; those on housing benefit face a widening gap between Local Housing Allowance rates and actual market rents. Families with children &mdash; 1.6 million households &mdash; face particular instability: 45&percnt; of Section 21 evictions involve families, and each move costs an average &pound;1,400. The Renters (Reform) Act 2024, which abolishes no-fault evictions, is the most significant change to private renting law since 1988, but the fundamental constraint remains supply: England needs 300,000 new homes per year and is building approximately 220,000 &mdash; almost none affordable private rented properties.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-rents', label: 'Rent Levels' },
          { id: 'sec-afford', label: 'Affordability' },
          { id: 'sec-regions', label: 'By Region' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Average monthly private rent (England)"
            value={latestRent ? '£' + latestRent.latestMonthlyGBP.toLocaleString() : '—'}
            unit="/month"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestRent
                ? `2023 &middot; Up 10% in one year &middot; London: &pound;2,121 &middot; Outside London: &pound;1,076 &middot; Fastest rise since records began`
                : 'Loading…'
            }
            sparklineData={[700, 730, 750, 770, 790, 810, 840, 870, 905, 940, 990, 1160, 1279]}
            source="ONS &mdash; Index of Private Housing Rental Prices"
            href="#sec-overview"/>
          <MetricCard
            label="Renters as share of households"
            value="19"
            unit="%"
            direction="up"
            polarity="up-is-bad"
            changeText={
              `2022 &middot; 4.6M households &middot; Up from 11% in 2001 &middot; Owner-occupation falling &middot; Social housing declining`
            }
            sparklineData={[11, 12, 13, 14, 15, 16, 17, 18, 18, 19, 19]}
            source="MHCLG &mdash; English Housing Survey"
            href="#sec-rents"/>
          <MetricCard
            label="Section 21 &lsquo;no-fault&rsquo; eviction notices"
            value="9,578"
            unit="notices issued"
            direction="up"
            polarity="up-is-bad"
            changeText={
              `Q1 2023 &middot; Up 24% year-on-year &middot; Primary driver of homelessness &middot; Renters (Reform) Act to abolish section 21`
            }
            sparklineData={[5000, 5200, 5800, 6500, 7200, 7800, 7000, 7500, 8500, 9578]}
            source="MoJ &mdash; Possession Statistics"
            href="#sec-afford"/>
        </div>
        </ScrollReveal>

        {/* Average rent chart */}
        <ScrollReveal>
        <div id="sec-rents" className="mb-12">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-wiah-black mb-2">Rent Levels</h2>
            <p className="text-base text-wiah-mid leading-[1.7] max-w-2xl">
              Average private rents have risen steadily, but the pace accelerated sharply from 2021 onwards.
              A single year (2022&ndash;2023) saw a 10% increase, the largest annual jump since records began.
            </p>
          </div>

          {rentSeries.length > 0 ? (
            <LineChart
              title="Average private monthly rent, England, 2011–2023"
              subtitle="Average monthly private rent across all property types and tenancy lengths, England. Accelerated sharply from 2021."
              series={rentSeries}
              annotations={rentAnnotations}
              yLabel="Monthly rent (&pound;)"
              source={{
                name: 'ONS',
                dataset: 'Index of Private Housing Rental Prices',
                frequency: 'monthly',
              }}
            />
          ) : (
            <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
          )}
        </div>
        </ScrollReveal>

        {/* Affordability chart */}
        <ScrollReveal>
        <div id="sec-afford" className="mb-12">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-wiah-black mb-2">Affordability</h2>
            <p className="text-base text-wiah-mid leading-[1.7] max-w-2xl">
              The median private renter now spends 34% of gross income on rent, up from 28% in 2011.
              The traditional affordability threshold is 30% &mdash; renters in England are now consistently above it.
            </p>
          </div>

          {affordabilitySeries.length > 0 ? (
            <LineChart
              title="Median private rent as share of gross income, England, 2011–2023"
              subtitle="Median annual rent as a percentage of median gross income for private renters, England."
              series={affordabilitySeries}
              yLabel="Rent as % of income"
              source={{
                name: 'MHCLG',
                dataset: 'English Housing Survey',
                frequency: 'annual',
              }}
            />
          ) : (
            <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
          )}
        </div>
        </ScrollReveal>

        {/* Regional breakdown */}
        <ScrollReveal>
        <div id="sec-regions" className="mb-12">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-wiah-black mb-2">By Region</h2>
            <p className="text-base text-wiah-mid leading-[1.7] max-w-2xl">
              Rent varies dramatically by region. London averages £2,121 per month, more than three times
              the North East average of £685. Outside London, the average is just £1,076.
            </p>
          </div>

          {data ? (
            <section className="mb-12">
              <h3 className="text-lg font-bold text-wiah-black mb-1">
                Average monthly rent by region, England
              </h3>
              <p className="text-sm text-wiah-mid font-mono mb-4">
                Average monthly private rent by English region, 2023.
              </p>
              <div className="space-y-2">
                {data.national.rentByRegion.map((item, i) => {
                  const maxRent = 2121;
                  const pct = (item.monthlyGBP / maxRent) * 100;
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <span className="w-40 text-right text-wiah-black text-sm truncate flex-shrink-0 font-mono">
                        {item.region}
                      </span>
                      <div className="flex-1 bg-gray-100 rounded h-6 relative">
                        <div
                          className="bg-[#F4A261] h-6 rounded"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="font-mono text-wiah-black w-20 text-right flex-shrink-0">
                        &pound;{item.monthlyGBP.toLocaleString()}
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-[11px] text-wiah-mid mt-4">
                Source: ONS &mdash; Index of Private Housing Rental Prices, 2023.
              </p>
            </section>
          ) : (
            <div className="h-32 bg-wiah-light rounded animate-pulse mb-12" />
          )}
        </div>
        </ScrollReveal>

        {/* Positive story */}
        <ScrollReveal>
        <PositiveCallout
          title="Reform in progress"
          value="2024"
          unit="Renters (Reform) Act &mdash; abolishing no-fault evictions after years of delay"
          description="The Renters (Reform) Act, receiving Royal Assent in 2024, abolishes Section 21 &lsquo;no-fault&rsquo; evictions, the most significant change to renters&apos; rights in 30 years. All tenancies will become periodic (month-to-month), and landlords can only evict for specific reasons listed in law. The Act also introduces a new Private Rented Sector Ombudsman to resolve disputes without going to court, and a new Decent Homes Standard for private rented properties &mdash; the first minimum quality requirement since the 1980s. A new digital private rented sector database will improve landlord accountability. Scotland abolished Section 21 equivalents in 2017, with no evidence of reduced supply."
          source="Source: ONS &mdash; Index of Private Housing Rental Prices 2023; MHCLG &mdash; English Housing Survey 2022/23."
        />
        </ScrollReveal>

        {/* Sources */}
        <section className="border-t border-wiah-border pt-8 mt-12">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; methodology</h2>
          <ul className="space-y-2 font-mono text-xs text-wiah-mid">
            {data?.metadata.sources.map((src, i) => (
              <li key={i}>
                <a
                  href={src.url}
                  className="underline hover:text-wiah-blue"
                  target="_blank"
                  rel="noreferrer"
                >
                  {src.name} &mdash; {src.dataset} ({src.frequency})
                </a>
              </li>
            ))}
          </ul>
          {data && (
            <>
              <h3 className="text-base font-bold text-wiah-black mt-6 mb-2">Methodology</h3>
              <p className="font-mono text-xs text-wiah-mid leading-relaxed max-w-3xl mb-4">
                {data.metadata.methodology}
              </p>
              {data.metadata.knownIssues.length > 0 && (
                <>
                  <h3 className="text-base font-bold text-wiah-black mt-6 mb-2">Known issues</h3>
                  <ul className="font-mono text-xs text-wiah-mid leading-relaxed max-w-3xl space-y-1">
                    {data.metadata.knownIssues.map((issue, i) => (
                      <li key={i}>• {issue}</li>
                    ))}
                  </ul>
                </>
              )}
            </>
          )}
        </section>
      </main>
    </>
  );
}
