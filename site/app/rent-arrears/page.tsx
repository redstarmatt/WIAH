'use client'

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface RentArrearsData {
  possessionClaims: Array<{ year: number; claims: number }>;
  arrearsRate: Array<{ year: number; pctInArrears: number }>;
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

export default function RentArrearsPage() {
  const [data, setData] = useState<RentArrearsData | null>(null);

  useEffect(() => {
    fetch('/data/rent-arrears/rent_arrears.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const claimsSeries: Series[] = data
    ? [{
        id: 'possession-claims',
        label: 'Landlord possession claims',
        colour: '#E63946',
        data: data.possessionClaims.map(d => ({
          date: yearToDate(d.year),
          value: d.claims,
        })),
      }]
    : [];

  const arrearsSeries: Series[] = data
    ? [{
        id: 'arrears-rate',
        label: 'Renters in arrears',
        colour: '#264653',
        data: data.arrearsRate.map(d => ({
          date: yearToDate(d.year),
          value: d.pctInArrears,
        })),
      }]
    : [];

  return (
    <>
      <TopicNav topic="Rent Arrears" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Rent Arrears"
          question="How Many Renters Are Falling Behind?"
          finding="One in seven renters in England is now behind on their rent, the highest rate on record. Landlord possession claims in county courts hit 164,200 in 2024 &mdash; surpassing pre-pandemic levels &mdash; and evictions are rising sharply as the cost-of-living crisis meets a housing market where rents have increased 30&percnt; in four years."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Rent arrears in England are at their highest recorded level: 14.1&percnt; of renters &mdash; approximately 1.3 million households &mdash; were behind on payments in 2024, up from 8.5&percnt; in 2015. The crisis is driven by a collision between rents rising 30&percnt; since 2020 and benefits that failed to keep pace &mdash; the Local Housing Allowance was frozen from 2020 to 2024 at the 30th percentile of local rents, progressively covering a smaller share of actual costs. Landlord possession claims reached 164,200 in 2024, surpassing the pre-pandemic level for the first time, while Citizens Advice reported a 42&percnt; increase in people seeking rent arrears help between 2021 and 2023, with the average amount owed rising from &pound;1,200 to &pound;2,100. The LHA was unfrozen in April 2024 and reset to the 30th percentile, providing relief of around &pound;800 per year per claimant &mdash; but rents have continued rising.
            </p>
            <p>
              The crisis is concentrated among the most vulnerable. Single parents &mdash; 90&percnt; of whom are women &mdash; have the highest arrears rate of any household type at 22&percnt;, compared with 10&percnt; for couples without children. People from Black African and Black Caribbean backgrounds face arrears rates roughly double the national average, reflecting lower incomes and concentration in high-rent London boroughs. Universal Credit recipients are significantly more likely to be in arrears than non-claimants: the five-week wait for the first payment creates an immediate deficit that many households never recover from, and young renters aged 18&ndash;24 face the most constrained options as the Shared Accommodation Rate covers only a room in a shared house.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-claims', label: 'Possession Claims' },
          { id: 'sec-arrears', label: 'Arrears Rate' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Renters in arrears"
              value="14.1%"
              direction="up"
              polarity="up-is-bad"
              changeText="Highest on record &middot; Up from 8.5&percnt; in 2015 &middot; ~1.3M households"
              sparklineData={[8.5, 8.1, 7.8, 8.2, 8.6, 10.4, 11.1, 12.3, 13.2, 14.1]}
              source="English Housing Survey 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Possession claims"
              value="164,200"
              direction="up"
              polarity="up-is-bad"
              changeText="Surpassed pre-pandemic level &middot; Up 127&percnt; from 2020 low"
              sparklineData={[153200, 148100, 142800, 139500, 136200, 72400, 89600, 128400, 155800, 164200]}
              source="MOJ &middot; Possession Statistics 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Average rent arrears (advice seekers)"
              value="&pound;2,100"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from &pound;1,200 in 2021 &middot; 42&percnt; rise in people seeking help"
              sparklineData={[900, 950, 1000, 1050, 1100, 1200, 1500, 1800, 2100]}
              source="Citizens Advice &middot; 2023"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-claims" className="mb-12">
            {claimsSeries.length > 0 ? (
              <LineChart
                title="Landlord possession claims, England &amp; Wales, 2015&ndash;2024"
                subtitle="Claims issued in county courts. The 2020 dip reflects the eviction moratorium; the subsequent surge reflects backlog and rising arrears."
                series={claimsSeries}
                yLabel="Claims"
                source={{
                  name: 'MOJ',
                  dataset: 'Mortgage and Landlord Possession Statistics',
                  frequency: 'quarterly',
                  url: 'https://www.gov.uk/government/statistics/mortgage-and-landlord-possession-statistics-quarterly-england-and-wales',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-arrears" className="mb-12">
            {arrearsSeries.length > 0 ? (
              <LineChart
                title="Renters in arrears, England, 2015&ndash;2024"
                subtitle="Percentage of private and social renters reporting any rent arrears. Record high as rent rises outstrip income growth."
                series={arrearsSeries}
                yLabel="Percentage (%)"
                source={{
                  name: 'DLUHC',
                  dataset: 'English Housing Survey',
                  frequency: 'annual',
                  url: 'https://www.gov.uk/government/collections/english-housing-survey',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        {/* Sources */}
        <section className="border-t border-wiah-border pt-8 mt-12">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; methodology</h2>
          <div className="text-sm text-wiah-mid space-y-2">
            {data?.metadata.sources.map((src, i) => (
              <p key={i}>
                <strong>{src.name}.</strong> <em>{src.dataset}</em>. {src.frequency} &mdash;&nbsp;
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="underline text-wiah-blue hover:no-underline">
                  {src.url}
                </a>
              </p>
            ))}
          </div>
          <p className="text-sm text-wiah-mid mt-6">{data?.metadata.methodology}</p>
          {data?.metadata.knownIssues && data.metadata.knownIssues.length > 0 && (
            <div className="mt-6 p-4 bg-wiah-light rounded">
              <p className="font-bold text-wiah-black mb-2">Known issues:</p>
              <ul className="text-sm text-wiah-mid space-y-1 list-disc list-inside">
                {data.metadata.knownIssues.map((issue, i) => (
                  <li key={i}>{issue}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
