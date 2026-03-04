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
              The scale of rent arrears in England is at its highest recorded level. The English Housing Survey estimates that 14.1&percnt; of renters &mdash; private and social combined &mdash; were in arrears in 2024, up from 8.5&percnt; in 2015. In absolute terms, this represents approximately 1.3 million renting households falling behind on payments. The crisis is driven by the collision of two forces: rents have risen by an average of 30&percnt; since 2020 (with London and the South East seeing even steeper increases), while wages and benefits have not kept pace. The Local Housing Allowance (LHA), which sets the maximum Housing Benefit for private renters, was frozen from 2020 to 2024 at the 30th percentile of local rents, meaning it progressively covered a smaller share of actual rent.
            </p>
            <p>
              The court system tells the story of what happens next. Landlord possession claims &mdash; the legal step that precedes eviction &mdash; fell to 72,400 in 2020 due to the eviction ban introduced during the pandemic, then surged as courts reopened and cleared the backlog. By 2024, claims reached 164,200, exceeding the pre-pandemic level for the first time. Section 21 &ldquo;no-fault&rdquo; evictions, where landlords can evict tenants without giving a reason, account for approximately 32&percnt; of all possession claims &mdash; the Renters Reform Bill, introduced in 2023, proposed abolishing Section 21 but at the time of writing had not yet become law. Section 8 claims for rent arrears have also risen sharply, reflecting genuine affordability pressures. Citizens Advice reported a 42&percnt; increase in people seeking help with rent arrears between 2021 and 2023, with the average arrears amount rising from &pound;1,200 to &pound;2,100.
            </p>
            <p>
              Policy responses have been reactive rather than preventive. The Household Support Fund, a &pound;421 million grant programme distributed by local authorities, provided one-off payments to households in crisis but was designed as temporary. Discretionary Housing Payments (DHPs), which councils use to top up Housing Benefit for tenants facing a shortfall, have been cut in real terms since 2018. The LHA was unfrozen in April 2024 and reset to the 30th percentile, providing relief estimated at &pound;800 per year for the average affected claimant &mdash; but rents have continued rising, meaning the gap is already re-emerging. Universal Credit&apos;s direct payment of rent to tenants rather than landlords has been linked to higher arrears rates: the National Residential Landlords Association found that 61&percnt; of landlords with UC-claiming tenants experienced arrears, compared with 38&percnt; of those without. Alternative Payment Arrangements, which allow direct payment to landlords, are available but under-used.
            </p>
            <p>
              The crisis is concentrated among the most vulnerable. Single parents &mdash; 90&percnt; of whom are women &mdash; have the highest arrears rates of any household type at 22&percnt;, compared with 10&percnt; for couples without children. People from Black African and Black Caribbean backgrounds have arrears rates roughly double the national average, reflecting lower average incomes, larger household sizes, and concentration in high-rent London boroughs. Universal Credit recipients are significantly more likely to be in arrears than non-claimants: the five-week wait for the first UC payment, during which no rent is paid, creates an immediate deficit that many households never recover from. Young renters aged 18&ndash;24, who are ineligible for the Shared Accommodation Rate of LHA, face the most constrained options &mdash; the rate covers only a room in a shared house, which is increasingly unavailable as landlords convert HMOs to family lets.
            </p>
            <p>
              Measuring rent arrears comprehensively is difficult because the data comes from multiple imperfect sources. The English Housing Survey is based on a sample of approximately 13,000 households and may under-represent the most precarious renters, who are harder to contact and more likely to refuse participation. MOJ possession claims data counts claims issued, not evictions executed &mdash; around 40&percnt; of claims are settled, withdrawn, or abandoned before enforcement. Section 21 claims do not record the underlying reason, so some evictions driven by arrears appear as no-fault evictions, and vice versa. Citizens Advice data captures only those who seek help, introducing selection bias. The total amount of rent debt owed nationally is not officially tracked by any government body, meaning estimates vary widely &mdash; from &pound;2 billion to &pound;4 billion depending on the source. The English Housing Survey&apos;s definition of &ldquo;in arrears&rdquo; includes any amount owed, from one day late to several months behind, which inflates headline figures relative to the subset of renters facing serious, unmanageable debt.
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
