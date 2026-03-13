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

interface TurnawayPoint {
  year: number;
  pct: number;
}

interface NotAccommodatedPoint {
  year: number;
  dailyAverage: number;
}

interface BedspacePoint {
  year: number;
  spaces: number;
}

interface IncidentPoint {
  year: number;
  incidents: number;
}

interface RegionData {
  region: string;
  turnawayPct: number;
  bedspaces: number;
}

interface RefugeData {
  refugeTurnawayRate: TurnawayPoint[];
  womenNotAccommodated: NotAccommodatedPoint[];
  refugeBedspaces: BedspacePoint[];
  daIncidentsReported: IncidentPoint[];
  byRegion: RegionData[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function DomesticAbuseRefugesPage() {
  const [data, setData] = useState<RefugeData | null>(null);

  useEffect(() => {
    fetch('/data/domestic-abuse-refuges/domestic_abuse_refuges.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const turnawaySeries: Series[] = data
    ? [{
        id: 'turnaway',
        label: 'Refuge turnaway rate (%)',
        colour: '#E63946',
        data: data.refugeTurnawayRate.map(d => ({
          date: yearToDate(d.year),
          value: d.pct,
        })),
      }]
    : [];

  const notAccommodatedSeries: Series[] = data
    ? [{
        id: 'not-accommodated',
        label: 'Women not accommodated (daily avg)',
        colour: '#6B7280',
        data: data.womenNotAccommodated.map(d => ({
          date: yearToDate(d.year),
          value: d.dailyAverage,
        })),
      }]
    : [];

  const bedspaceSeries: Series[] = data
    ? [{
        id: 'bedspaces',
        label: 'Total refuge bedspaces',
        colour: '#2A9D8F',
        data: data.refugeBedspaces.map(d => ({
          date: yearToDate(d.year),
          value: d.spaces,
        })),
      }]
    : [];

  const turnawayAnnotations: Annotation[] = [
    { date: new Date(2014, 0, 1), label: '2014: Austerity cuts deepen' },
    { date: new Date(2021, 0, 1), label: '2021: Domestic Abuse Act' },
  ];

  const bedspaceAnnotations: Annotation[] = [
    { date: new Date(2017, 0, 1), label: '2017: Lowest recorded level' },
    { date: new Date(2021, 0, 1), label: '2021: DA Act statutory duty' },
  ];

  const notAccommodatedAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: Pandemic lockdowns' },
    { date: new Date(2021, 0, 1), label: '2021: DA Act investment begins' },
  ];

  // ── Latest values for metric cards ────────────────────────────────────

  const latestTurnaway = data?.refugeTurnawayRate[data.refugeTurnawayRate.length - 1];
  const peakTurnaway = data?.refugeTurnawayRate.reduce((a, b) => a.pct > b.pct ? a : b);

  const latestNotAccom = data?.womenNotAccommodated[data.womenNotAccommodated.length - 1];
  const peakNotAccom = data?.womenNotAccommodated.reduce((a, b) => a.dailyAverage > b.dailyAverage ? a : b);

  const latestBedspaces = data?.refugeBedspaces[data.refugeBedspaces.length - 1];
  const lowestBedspaces = data?.refugeBedspaces.reduce((a, b) => a.spaces < b.spaces ? a : b);

  return (
    <>
      <TopicNav topic="Domestic Abuse Refuges" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Domestic Abuse Refuges"
          question="Is There Actually a Safe Place to Go?"
          finding="On any given day, 35% of women referred to a refuge are turned away because there is no space. The Domestic Abuse Act 2021 created a statutory duty on local authorities to fund safe accommodation, and bedspaces are finally rising — but demand still outpaces supply, with nearly 100 women per day unable to access a safe bed."
          colour="#E63946"
          preposition="with"
        />

        {/* Editorial context */}
        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              England has roughly 3,710 refuge bedspaces for a population of 56 million. The Council of Europe recommends one family place per 10,000 people — which would mean at least 5,600 for England alone. The shortfall is not abstract. It means a woman fleeing violence, often with children, phones a national helpline and is told there is no room. In the worst cases she returns to her abuser. In 2024, 35% of all referrals to refuge services could not be accommodated — down from a peak of 43% in 2017-2019, but still meaning that on an average day, 97 women and their children are turned away from safety.
            </p>
            <p>
              The trajectory is complex. Between 2010 and 2017, austerity-era cuts to local authority budgets led to the closure of around 17% of specialist refuge services. Many of the lost services were run by women-led, by-and-for organisations serving Black, minoritised, and disabled women — communities already underserved. The Domestic Abuse Act 2021 was a landmark: it placed a statutory duty on tier-one local authorities to assess need and fund safe accommodation. That duty has driven real investment. Bedspace numbers have risen from a low of 3,028 in 2017 to 3,710 in 2024 — a 22% increase. Turnaway rates have fallen eight percentage points in the same period. But the gap between supply and need remains vast, because demand has been rising too. Police-recorded domestic abuse incidents have grown from under one million in 2015 to over 1.57 million in 2024 — reflecting both genuine prevalence increases and, critically, improved reporting and recording by police forces.
            </p>
            <p>
              The funding picture remains fragile. Much of the post-2021 investment comes through short-term grants rather than sustained core funding, leaving refuge providers unable to plan beyond annual cycles. Women with no recourse to public funds — often those on spousal visas — remain excluded from most statutory provision, a gap campaigners describe as a form of structural abandonment. The data tells a story of genuine progress driven by legislation and advocacy, but also of a system that remains chronically undersized for the scale of need.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-turnaway', label: 'Turnaway rate' },
          { id: 'sec-not-accommodated', label: 'Women not accommodated' },
          { id: 'sec-bedspaces', label: 'Bedspaces' },
          { id: 'sec-regional', label: 'Regional' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Refuge turnaway rate"
            value={latestTurnaway ? `${latestTurnaway.pct}` : '35'}
            unit="%"
            direction="down"
            polarity="up-is-bad"
            changeText={
              latestTurnaway && peakTurnaway
                ? `Down from ${peakTurnaway.pct}% peak in ${peakTurnaway.year} · DA Act driving investment`
                : 'Down from 43% peak in 2017–2019'
            }
            sparklineData={
              data ? sparkFrom(data.refugeTurnawayRate.map(d => d.pct)) : []
            }
            source="Women's Aid · Annual Audit, 2024"
            href="#sec-turnaway"
          />
          <MetricCard
            label="Women turned away daily"
            value={latestNotAccom ? `${latestNotAccom.dailyAverage}` : '97'}
            unit="per day"
            direction="down"
            polarity="up-is-bad"
            changeText={
              latestNotAccom && peakNotAccom
                ? `Down from ${peakNotAccom.dailyAverage}/day peak in ${peakNotAccom.year} · still nearly 100/day`
                : 'Still nearly 100 women per day without a safe bed'
            }
            sparklineData={
              data ? sparkFrom(data.womenNotAccommodated.map(d => d.dailyAverage)) : []
            }
            source="Women's Aid / SafeLives · 2024"
            href="#sec-not-accommodated"
          />
          <MetricCard
            label="Total refuge bedspaces"
            value={latestBedspaces ? latestBedspaces.spaces.toLocaleString() : '3,710'}
            unit="England"
            direction="up"
            polarity="up-is-good"
            changeText={
              latestBedspaces && lowestBedspaces
                ? `Up 22% from ${lowestBedspaces.spaces.toLocaleString()} low in ${lowestBedspaces.year} · still below CoE target of 5,600`
                : 'Up 22% from 2017 low · still below Council of Europe target'
            }
            sparklineData={
              data ? sparkFrom(data.refugeBedspaces.map(d => d.spaces)) : []
            }
            source="Women's Aid · Annual Audit, 2024"
            href="#sec-bedspaces"
          />
        </div>

        {/* Chart 1: Refuge turnaway rate */}
        <ScrollReveal>
          <div id="sec-turnaway" className="mb-12">
            <LineChart
              series={turnawaySeries}
              annotations={turnawayAnnotations}
              title="Refuge turnaway rate (%), England, 2010–2024"
              subtitle="Proportion of women referred to refuge who could not be accommodated. Falling since 2019, but still at 35%."
              yLabel="Turnaway rate (%)"
              source={{
                name: 'Women\'s Aid',
                dataset: 'Annual Audit of Domestic Abuse Services',
                url: 'https://www.womensaid.org.uk/research-and-publications/the-annual-audit/',
                frequency: 'annual',
                date: '2024',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Women not accommodated */}
        <ScrollReveal>
          <div id="sec-not-accommodated" className="mb-12">
            <LineChart
              series={notAccommodatedSeries}
              annotations={notAccommodatedAnnotations}
              title="Women referred but not accommodated (daily average), England, 2010–2024"
              subtitle="Average number of women and children turned away from refuge each day. Peaked at 121 in 2019."
              yLabel="Daily average"
              source={{
                name: 'Women\'s Aid / SafeLives',
                dataset: 'Routes to Support vacancy monitoring',
                url: 'https://safelives.org.uk/research-evidence/safelives-insights/',
                frequency: 'annual',
                date: '2024',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Refuge bedspaces */}
        <ScrollReveal>
          <div id="sec-bedspaces" className="mb-12">
            <LineChart
              series={bedspaceSeries}
              annotations={bedspaceAnnotations}
              title="Total refuge bedspaces, England, 2010–2024"
              subtitle="Dedicated domestic abuse refuge bedspaces. Rising since 2017 after years of austerity-driven decline."
              yLabel="Bedspaces"
              targetLine={{ value: 5600, label: 'Council of Europe recommended minimum' }}
              source={{
                name: 'Women\'s Aid',
                dataset: 'Annual Audit of Domestic Abuse Services',
                url: 'https://www.womensaid.org.uk/research-and-publications/the-annual-audit/',
                frequency: 'annual',
                date: '2024',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Regional variation */}
        <ScrollReveal>
          <div id="sec-regional" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Refuge turnaway rate by region (%), England
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                Proportion of referrals not accommodated. London faces the highest pressure due to cost and demand.
              </p>
              <div className="mt-6 space-y-4">
                {data?.byRegion
                  .sort((a, b) => b.turnawayPct - a.turnawayPct)
                  .map((r) => {
                    const pct = (r.turnawayPct / 50) * 100;
                    return (
                      <div key={r.region}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-wiah-black">{r.region}</span>
                          <span className="font-mono text-sm font-bold text-wiah-black">{r.turnawayPct}%</span>
                        </div>
                        <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                          <div
                            className="h-full rounded-sm transition-all"
                            style={{
                              width: `${pct}%`,
                              backgroundColor: r.turnawayPct >= 36 ? '#E63946' : r.turnawayPct >= 32 ? '#F4A261' : '#6B7280',
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">
                Source: Women&apos;s Aid — Annual Audit of Domestic Abuse Services, 2024
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Domestic Abuse Act 2021 driving measurable improvement"
            value="22% more bedspaces"
            description="The Domestic Abuse Act 2021 placed a statutory duty on local authorities to assess need and fund safe accommodation for survivors. Since the duty came into force, refuge bedspaces in England have risen from 3,028 to 3,710 — a 22% increase. The turnaway rate has fallen from 43% to 35%. While provision remains well below the Council of Europe recommended minimum of one family place per 10,000 population, the legislative framework has reversed a decade of decline and created an accountability mechanism that did not previously exist. Over 300 new refuge bedspaces were commissioned in 2023/24 alone."
            source="Source: Women's Aid — Annual Audit 2024. DLUHC — Domestic Abuse Act statutory duty returns, 2024."
          />
        </ScrollReveal>

        {/* Sources & Methodology */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p>
              <a href="https://www.womensaid.org.uk/research-and-publications/the-annual-audit/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Women&apos;s Aid — Annual Audit of Domestic Abuse Services</a> — primary source for refuge capacity, turnaway rates, and regional breakdowns. Retrieved Feb 2026.
            </p>
            <p>
              <a href="https://safelives.org.uk/research-evidence/safelives-insights/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">SafeLives — Insights National Dataset</a> — additional data on referral pathways and outcomes. Retrieved Feb 2026.
            </p>
            <p>
              <a href="https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/bulletins/domesticabuseinenglandandwalesoverview/november2024" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Domestic abuse in England and Wales overview</a> — police-recorded domestic abuse incident data. Retrieved Feb 2026.
            </p>
            <p>
              <a href="https://www.gov.uk/government/publications/domestic-abuse-safe-accommodation-funding" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DLUHC — Domestic Abuse Act statutory duty funding returns</a> — local authority commissioning data. Retrieved Feb 2026.
            </p>
            <p className="mt-4">
              Turnaway rate reflects the proportion of referrals that could not be accommodated on the day of request, as reported through the Routes to Support system. Bedspace counts cover dedicated refuge provision in England only. Police-recorded incident data includes improved recording practices from 2015 onwards. All time series are for financial years ending March. Methodology for counting bedspaces changed slightly in 2019 when dispersed accommodation was included alongside traditional refuges.
            </p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
