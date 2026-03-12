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

// ── Types ──────────────────────────────────────────────────────────────────────

interface ClaimsPoint {
  quarter: string;
  claims: number;
}

interface ArrearsPoint {
  quarter: string;
  households: number;
}

interface RatePoint {
  quarter: string;
  avgPct: number;
}

interface MortgageStressData {
  national: {
    possessionClaims: { timeSeries: ClaimsPoint[] };
    arrears: { timeSeries: ArrearsPoint[] };
    mortgageRates: { timeSeries: RatePoint[] };
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function quarterToDate(q: string): Date {
  const [yearStr, qStr] = q.split('-');
  const year = parseInt(yearStr, 10);
  const month = (parseInt(qStr.replace('Q', ''), 10) - 1) * 3;
  return new Date(year, month, 1);
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function MortgageStressPage() {
  const [data, setData] = useState<MortgageStressData | null>(null);

  useEffect(() => {
    fetch('/data/mortgage-stress/mortgage_stress.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // 1. Possession claims series
  const claimsSeries: Series[] = data
    ? [{
        id: 'claims',
        label: 'Mortgage possession claims',
        colour: '#E63946',
        data: data.national.possessionClaims.timeSeries.map(d => ({
          date: quarterToDate(d.quarter),
          value: d.claims,
        })),
      }]
    : [];

  const claimsAnnotations: Annotation[] = [
    { date: new Date(2009, 0, 1), label: '2009: Financial crisis peak' },
    { date: new Date(2020, 3, 1), label: '2020: COVID court closures' },
    { date: new Date(2022, 9, 1), label: '2022-Q4: Mini-budget shock' },
  ];

  // 2. Arrears series
  const arrearsSeries: Series[] = data
    ? [{
        id: 'arrears',
        label: 'Households in significant arrears',
        colour: '#E63946',
        data: data.national.arrears.timeSeries.map(d => ({
          date: quarterToDate(d.quarter),
          value: d.households,
        })),
      }]
    : [];

  const arrearsAnnotations: Annotation[] = [
    { date: new Date(2022, 0, 1), label: '2022: Rate rises begin' },
  ];

  // 3. Mortgage rate series
  const rateSeries: Series[] = data
    ? [{
        id: 'rate',
        label: 'Average 2-year fixed rate (%)',
        colour: '#264653',
        data: data.national.mortgageRates.timeSeries.map(d => ({
          date: quarterToDate(d.quarter),
          value: d.avgPct,
        })),
      }]
    : [];

  const rateAnnotations: Annotation[] = [
    { date: new Date(2021, 9, 1), label: '2021-Q4: BoE begins rate rises' },
    { date: new Date(2022, 9, 1), label: '2022-Q4: Mini-budget spike' },
  ];

  const latestClaims = data?.national.possessionClaims.timeSeries.slice(-1)[0];
  const latestArrears = data?.national.arrears.timeSeries.slice(-1)[0];
  const latestRate = data?.national.mortgageRates.timeSeries.slice(-1)[0];

  return (
    <>
      <TopicNav topic="Mortgage Stress" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Mortgage Stress"
          question="Can You Keep Your Home?"
          finding={
            latestArrears
              ? `Over ${(latestArrears.households / 1000).toFixed(0)},000 households are in significant mortgage arrears — double the 2021 low. Possession claims have surged since rate rises began, though actual repossessions remain below 2008-09 crisis levels.`
              : 'Mortgage arrears and possession claims have surged since the Bank of England began raising rates from 0.1% to 5.25%.'
          }
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Between December 2021 and August 2023, the Bank of England raised its base rate fourteen consecutive times, from 0.1% to 5.25% — the fastest tightening cycle in a generation. The impact on mortgage holders was immediate and severe. Around 1.4 million households on variable or tracker rates saw payments rise in lockstep with the base rate, many absorbing increases of hundreds of pounds a month with no warning. A further 1.6 million households on fixed-rate deals that expired between 2023 and 2025 faced repricing from around 2% to around 5%, translating to an average monthly payment jump from roughly &pound;750 to &pound;1,200 for a typical new fix. Mortgage possession claims filed in courts doubled within 18 months of rates beginning to rise. By Q3 2024, more than 100,000 households were in significant arrears — defined as owing at least 2.5% of the outstanding mortgage balance. The stress is concentrated among first-time buyers who purchased between 2020 and 2022 at historically low rates and historically high prices, and among borrowers in Northern England and Wales where mortgage distress is higher relative to local incomes.
            </p>
            <p>
              The headline numbers, however, conceal a more complicated reality. Actual repossessions remain well below 2008-09 levels, in large part because pre-action protocols now require lenders to demonstrate forbearance before seeking possession — a regulatory reform introduced after the financial crisis. The government&rsquo;s voluntary Mortgage Charter, agreed with major lenders in 2023, allows borrowers to take payment holidays of up to six months, switch temporarily to interest-only payments, or extend their mortgage term to reduce monthly costs. These measures have kept many households out of formal arrears, but they come at a price: term extensions and interest-only concessions reduce the monthly bill while increasing the total cost of the mortgage, sometimes by tens of thousands of pounds. The true scale of financial distress is therefore partially masked by forbearance mechanisms that defer rather than resolve the underlying affordability problem. With rates now easing but unlikely to return to pre-2022 levels, the question for millions of households is not whether the worst is over, but how much permanent damage the rate shock has done to their financial position.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-claims', label: 'Possession Claims' },
          { id: 'sec-arrears', label: 'Arrears' },
          { id: 'sec-rates', label: 'Mortgage Rates' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Possession claims filed"
              value={latestClaims ? latestClaims.claims.toLocaleString() : '—'}
              unit="/quarter"
              direction="up"
              polarity="up-is-bad"
              changeText="Q3 2025 · Doubled since 2022 · Still below 2009 peak of 58,200"
              sparklineData={[4500, 4800, 5600, 6400, 9200, 11400, 12800, 12400, 11300]}
              source="MoJ — Mortgage and Landlord Possession Statistics"
              href="#sec-claims"
            />
            <MetricCard
              label="Households in arrears"
              value={latestArrears ? (latestArrears.households / 1000).toFixed(0) + ',000+' : '—'}
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Q2 2025 · Up from 47,200 in Q4 2021 · Forbearance masking further distress"
              sparklineData={[62, 58, 56, 50, 48, 54, 74, 100, 107]}
              source="UK Finance — Mortgage Arrears and Possessions"
              href="#sec-arrears"
            />
            <MetricCard
              label="Avg 2-year fixed rate"
              value={latestRate ? latestRate.avgPct.toFixed(1) + '%' : '—'}
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Q3 2025 · Down from 5.98% peak · Was 1.18% in Q2 2021"
              sparklineData={[1.8, 1.5, 1.2, 1.6, 2.9, 5.4, 4.9, 4.6, 4.4]}
              source="Bank of England — Quoted Household Interest Rates"
              href="#sec-rates"
            />
          </div>
        </ScrollReveal>

        {/* Possession claims chart */}
        <ScrollReveal>
          <section id="sec-claims" className="mb-12">
            {claimsSeries.length > 0 ? (
              <LineChart
                title="Mortgage possession claims, England & Wales, 2008–2025"
                subtitle="Quarterly claims filed in county courts for mortgage possession. The 2020 trough reflects COVID court closures, not reduced distress."
                series={claimsSeries}
                annotations={claimsAnnotations}
                yLabel="Claims per quarter"
                source={{
                  name: 'Ministry of Justice',
                  dataset: 'Mortgage and Landlord Possession Statistics',
                  frequency: 'quarterly',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse" />
            )}
          </section>
        </ScrollReveal>

        {/* Arrears chart */}
        <ScrollReveal>
          <section id="sec-arrears" className="mb-12">
            {arrearsSeries.length > 0 ? (
              <LineChart
                title="Households in significant mortgage arrears, UK, 2015–2025"
                subtitle="Residential mortgages with arrears of 2.5% or more of outstanding balance. Forbearance measures (payment holidays, term extensions) keep some distressed borrowers out of this count."
                series={arrearsSeries}
                annotations={arrearsAnnotations}
                yLabel="Households"
                source={{
                  name: 'UK Finance',
                  dataset: 'Mortgage Arrears and Possessions Data',
                  frequency: 'quarterly',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse" />
            )}
          </section>
        </ScrollReveal>

        {/* Mortgage rate chart */}
        <ScrollReveal>
          <section id="sec-rates" className="mb-12">
            {rateSeries.length > 0 ? (
              <LineChart
                title="Average 2-year fixed mortgage rate, UK, 2015–2025"
                subtitle="Bank of England quoted rate for new 2-year fixed-rate mortgages at 75% LTV. Higher LTV products carry additional premiums of 0.3–0.8 percentage points."
                series={rateSeries}
                annotations={rateAnnotations}
                yLabel="Interest rate (%)"
                source={{
                  name: 'Bank of England',
                  dataset: 'Quoted Household Interest Rates (Table IUDZLT2)',
                  frequency: 'monthly',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse" />
            )}
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Pre-action protocols are working"
            value="< 1/3"
            unit="of the 2009 repossession rate"
            description="Actual repossessions remain far below the 2008-09 financial crisis peak thanks to pre-action protocols requiring lenders to show forbearance. The rate is less than a third of its 2009 level. Post-crisis regulatory reforms mean that lenders must now exhaust all alternatives — including payment holidays, temporary switches to interest-only, and mortgage term extensions — before applying for a possession order. The voluntary Mortgage Charter agreed with the government in 2023 reinforces these protections. While these measures defer costs rather than eliminating them, they have prevented the mass repossessions that characterised previous downturns."
            source="Source: MoJ — Mortgage and Landlord Possession Statistics; UK Finance — Arrears and Possessions Data 2024."
          />
        </ScrollReveal>

        {/* Sources & methodology */}
        <section id="sec-sources" className="border-t border-wiah-border pt-8 mt-12">
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
                  {src.name} — {src.dataset} ({src.frequency})
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
        <RelatedTopics />
      </main>
    </>
  );
}
