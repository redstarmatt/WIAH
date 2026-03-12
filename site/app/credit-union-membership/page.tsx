'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// ── Types ────────────────────────────────────────────────────────────────────

interface MembershipPoint {
  year: number;
  members: number;
}

interface AssetPoint {
  year: number;
  billions: number;
}

interface LoanPurposePoint {
  year: number;
  consolidation: number;
  homeImprovement: number;
  vehicle: number;
  other: number;
}

interface InternationalPoint {
  country: string;
  penetration: number;
}

interface CreditUnionData {
  membership: MembershipPoint[];
  assets: AssetPoint[];
  loansByPurpose: LoanPurposePoint[];
  internationalComparison: InternationalPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function CreditUnionMembershipPage() {
  const [data, setData] = useState<CreditUnionData | null>(null);

  useEffect(() => {
    fetch('/data/credit-union-membership/credit_union_membership.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const membershipSeries: Series[] = data
    ? [{
        id: 'membership',
        label: 'Credit union members (millions)',
        colour: '#2A9D8F',
        data: data.membership.map(d => ({
          date: yearToDate(d.year),
          value: d.members,
        })),
      }]
    : [];

  const assetSeries: Series[] = data
    ? [{
        id: 'assets',
        label: 'Total assets (£ billions)',
        colour: '#264653',
        data: data.assets.map(d => ({
          date: yearToDate(d.year),
          value: d.billions,
        })),
      }]
    : [];

  const loanPurposeSeries: Series[] = data
    ? [
        {
          id: 'consolidation',
          label: 'Debt consolidation',
          colour: '#E63946',
          data: data.loansByPurpose.map(d => ({
            date: yearToDate(d.year),
            value: d.consolidation,
          })),
        },
        {
          id: 'home-improvement',
          label: 'Home improvement',
          colour: '#F4A261',
          data: data.loansByPurpose.map(d => ({
            date: yearToDate(d.year),
            value: d.homeImprovement,
          })),
        },
        {
          id: 'vehicle',
          label: 'Vehicle purchase',
          colour: '#264653',
          data: data.loansByPurpose.map(d => ({
            date: yearToDate(d.year),
            value: d.vehicle,
          })),
        },
      ]
    : [];

  // ── Derived values ────────────────────────────────────────────────────

  const latestMembership = data?.membership[data.membership.length - 1];
  const earliestMembership = data?.membership[0];
  const latestAssets = data?.assets[data.assets.length - 1];
  const earliestAssets = data?.assets[0];
  const latestLoans = data?.loansByPurpose[data.loansByPurpose.length - 1];

  const membershipGrowth = latestMembership && earliestMembership
    ? Math.round(((latestMembership.members - earliestMembership.members) / earliestMembership.members) * 100)
    : 133;

  return (
    <>
      <TopicNav topic="Credit Union Membership" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Credit Union Membership"
          question="Why Does Britain Have So Few Credit Union Members?"
          finding="Only 2.1 million people — around 3% of the adult population — belong to a credit union in Great Britain, compared to 75% in Ireland and 37% in the United States. Credit unions offer affordable loans and savings accounts to people often excluded from mainstream banking, yet Britain remains an outlier among comparable nations."
          colour="#2A9D8F"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Britain&apos;s credit union sector has been growing steadily for over a decade. Membership has more than doubled since 2010, rising from 920,000 to 2.14 million by the end of 2024, while total assets have grown from under £1 billion to £4.2 billion over the same period. These are genuine signs of progress. But context matters: credit unions still hold less than 0.1% of UK banking assets, and the penetration rate of around 3% is dwarfed by Ireland (75%), the United States (37%), and Canada (33%). The gap is not explained by demand. Around 1.1 million adults in the UK have no bank account at all, and millions more rely on high-cost credit — precisely the people credit unions exist to serve.
            </p>
            <p>
              The roots of this gap are structural, not cultural. Britain&apos;s credit union movement was legally recognised only in 1979, decades after Ireland, the US, and Canada had built mature cooperative finance networks embedded in workplaces, parishes, and communities. Regulatory constraints limited what British credit unions could offer until reforms in 2012 and 2014 expanded their lending powers. Even now, most UK credit unions operate with volunteer boards and minimal budgets. The average British credit union has around 5,000 members; the average Irish one, 20,000. Scale matters because it drives the technology investment needed to compete with app-based banking — and because it determines whether a credit union can afford to lend to people whose circumstances make them unattractive to commercial banks.
            </p>
            <p>
              The cost-of-living crisis has sharpened both the need and the opportunity. Demand for affordable small loans surged in 2022 and 2023, with debt consolidation now accounting for 40% of credit union lending. Payroll partnerships — where employers deduct savings and loan repayments directly from wages — have driven much of the recent membership growth. The NHS, several local authorities, and a growing number of private employers now offer credit union access as a workplace benefit. If credit unions can sustain this momentum and invest in digital infrastructure, Britain&apos;s anomalously low membership rate may finally start to close the gap with peer nations.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-membership', label: 'Membership' },
          { id: 'sec-assets', label: 'Assets' },
          { id: 'sec-loans', label: 'Loan purposes' },
          { id: 'sec-international', label: 'International' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Credit union members (Great Britain)"
            value={latestMembership ? `${latestMembership.members.toFixed(1)}M` : '2.1M'}
            unit="2024"
            direction="up"
            polarity="up-is-good"
            changeText={`+${membershipGrowth}% since 2010 · still only 3% of adult population`}
            sparklineData={
              data ? sparkFrom(data.membership.map(d => d.members)) : [1.4,1.5,1.6,1.7,1.8,1.9,2.0,2.1]
            }
            source="Bank of England / ABCUL — Dec 2024"
            href="#sec-membership"
          />
          <MetricCard
            label="Total credit union assets"
            value={latestAssets ? `£${latestAssets.billions.toFixed(1)}B` : '£4.2B'}
            unit="2024"
            direction="up"
            polarity="up-is-good"
            changeText={
              latestAssets && earliestAssets
                ? `up from £${earliestAssets.billions.toFixed(1)}B in ${earliestAssets.year} · <0.1% of UK banking assets`
                : 'up from £0.9B in 2010 · <0.1% of UK banking assets'
            }
            sparklineData={
              data ? sparkFrom(data.assets.map(d => d.billions)) : [2.1,2.4,2.6,2.9,3.2,3.5,3.8,4.2]
            }
            source="Bank of England / PRA — Dec 2024"
            href="#sec-assets"
          />
          <MetricCard
            label="Loans for debt consolidation"
            value={latestLoans ? `${latestLoans.consolidation}%` : '40%'}
            unit="2024"
            direction="up"
            polarity="up-is-bad"
            changeText="up from 38% in 2015 · cost-of-living crisis driving demand"
            sparklineData={
              data ? data.loansByPurpose.map(d => d.consolidation) : [38,37,36,35,34,36,37,38,39,40]
            }
            source="ABCUL member survey — 2024"
            href="#sec-loans"
          />
        </div>

        {/* Chart 1: Membership growth */}
        <ScrollReveal>
          <div id="sec-membership" className="mb-12">
            <LineChart
              series={membershipSeries}
              title="Credit union membership, Great Britain, 2010–2024"
              subtitle="Total members in millions. Membership has more than doubled in 14 years but remains a fraction of the adult population."
              yLabel="Members (millions)"
              annotations={[
                { date: new Date(2012, 0, 1), label: '2012: Legislative Reform Order expands CU powers' },
                { date: new Date(2020, 2, 1), label: '2020: COVID-19 pandemic' },
              ]}
              source={{
                name: 'Bank of England / ABCUL',
                dataset: 'Credit Union Quarterly Statistics',
                frequency: 'quarterly',
                url: 'https://www.bankofengland.co.uk/prudential-regulation/credit-unions',
                date: 'Dec 2024',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Asset growth */}
        <ScrollReveal>
          <div id="sec-assets" className="mb-12">
            <LineChart
              series={assetSeries}
              title="Credit union total assets, Great Britain, 2010–2024"
              subtitle="Combined assets in £ billions. Growing steadily but still under 0.1% of UK banking sector assets."
              yLabel="Assets (£ billions)"
              annotations={[
                { date: new Date(2014, 0, 1), label: '2014: PRA new regulatory framework' },
                { date: new Date(2022, 0, 1), label: '2022: Cost-of-living crisis begins' },
              ]}
              source={{
                name: 'Bank of England / PRA',
                dataset: 'Credit Union Annual Report',
                frequency: 'annual',
                url: 'https://www.bankofengland.co.uk/prudential-regulation/publication/credit-union-annual-report',
                date: 'Dec 2024',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Loan purpose breakdown */}
        <ScrollReveal>
          <div id="sec-loans" className="mb-12">
            <LineChart
              series={loanPurposeSeries}
              title="Credit union loans by purpose, 2015–2024"
              subtitle="Share of new loans by category (%). Debt consolidation has risen as cost-of-living pressures mount."
              yLabel="Share of loans (%)"
              annotations={[
                { date: new Date(2022, 0, 1), label: '2022: Cost-of-living crisis' },
              ]}
              source={{
                name: 'ABCUL',
                dataset: 'Annual member survey — loan purpose breakdown',
                frequency: 'annual',
                url: 'https://www.abcul.org/media-and-research/facts-statistics',
                date: 'Nov 2024',
              }}
            />
          </div>
        </ScrollReveal>

        {/* International comparison bar chart */}
        <ScrollReveal>
          <div id="sec-international" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Credit union penetration rate by country (% of economically active population)
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                Great Britain is a dramatic outlier among comparable English-speaking nations.
              </p>
              <div className="mt-6 space-y-4">
                {data?.internationalComparison
                  .sort((a, b) => b.penetration - a.penetration)
                  .map((r) => {
                    const pct = (r.penetration / 80) * 100;
                    const isGB = r.country === 'Great Britain';
                    return (
                      <div key={r.country}>
                        <div className="flex justify-between items-center mb-1">
                          <span className={`text-sm font-medium ${isGB ? 'text-[#E63946]' : 'text-wiah-black'}`}>
                            {r.country}
                          </span>
                          <span className={`font-mono text-sm font-bold ${isGB ? 'text-[#E63946]' : 'text-wiah-black'}`}>
                            {r.penetration}%
                          </span>
                        </div>
                        <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                          <div
                            className="h-full rounded-sm transition-all"
                            style={{
                              width: `${pct}%`,
                              backgroundColor: isGB ? '#E63946' : '#2A9D8F',
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">
                Source: World Council of Credit Unions — Statistical Report 2024
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Payroll partnerships driving membership growth"
            value="+133%"
            unit="membership growth since 2010"
            description="Payroll deduction schemes — where employers deduct credit union savings and loan repayments directly from wages — have been the single most effective driver of membership growth. The NHS, several major local authorities, and a growing number of private employers now offer credit union access as a workplace benefit. These schemes reduce default rates to below 2%, making it viable for credit unions to lend to people who would otherwise turn to high-cost credit. The Fair4All Finance initiative has invested over £30 million since 2019 to help credit unions modernise their technology and reach underserved communities."
            source="Source: ABCUL Annual Statistics 2024. Fair4All Finance — Impact Report 2024."
          />
        </ScrollReveal>

        {/* Sources & Methodology */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p>
              <a href="https://www.bankofengland.co.uk/prudential-regulation/credit-unions" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                Bank of England — Credit Union Quarterly Statistics
              </a> — regulatory returns covering membership and asset data. Retrieved Dec 2024.
            </p>
            <p>
              <a href="https://www.abcul.org/media-and-research/facts-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                ABCUL — Annual Statistics and Trends
              </a> — voluntary reporting from member credit unions, including loan purpose surveys. Retrieved Nov 2024.
            </p>
            <p>
              <a href="https://www.bankofengland.co.uk/prudential-regulation/publication/credit-union-annual-report" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                PRA — Credit Union Annual Report
              </a> — regulatory overview and sector-level financial data. Retrieved Dec 2024.
            </p>
            <p>
              <a href="https://www.woccu.org/documents/2024_Statistical_Report" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                World Council of Credit Unions — 2024 Statistical Report
              </a> — international penetration rates using economically active population as denominator. Retrieved Oct 2025.
            </p>
            <p className="mt-4">
              All figures are for Great Britain (England, Scotland, Wales) unless otherwise stated. Northern Ireland credit unions (~27% penetration) report separately and are excluded. Pre-2012 data uses earlier reporting standards and may not be directly comparable.
            </p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
