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

interface InvestmentSharePoint {
  year: number;
  pctGdp: number;
}

interface AnnualGrowthPoint {
  year: number;
  growthPct: number;
}

interface RdSpendingPoint {
  year: number;
  pctGdp: number;
}

interface G7Point {
  country: string;
  pctGdp: number;
}

interface SectorPoint {
  sector: string;
  pctTotal: number;
}

interface BusinessInvestmentData {
  investmentShare: InvestmentSharePoint[];
  annualGrowth: AnnualGrowthPoint[];
  rdSpending: RdSpendingPoint[];
  g7Comparison: G7Point[];
  bySector: SectorPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function BusinessInvestmentRatePage() {
  const [data, setData] = useState<BusinessInvestmentData | null>(null);

  useEffect(() => {
    fetch('/data/business-investment-rate/business_investment_rate.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const investmentShareSeries: Series[] = data
    ? [{
        id: 'uk-investment',
        label: 'UK business investment (% GDP)',
        colour: '#6B7280',
        data: data.investmentShare.map(d => ({
          date: yearToDate(d.year),
          value: d.pctGdp,
        })),
      }]
    : [];

  const growthSeries: Series[] = data
    ? [{
        id: 'annual-growth',
        label: 'Annual investment growth (%)',
        colour: '#264653',
        data: data.annualGrowth.map(d => ({
          date: yearToDate(d.year),
          value: d.growthPct,
        })),
      }]
    : [];

  const rdSeries: Series[] = data
    ? [{
        id: 'rd-spending',
        label: 'R&D spending (% GDP)',
        colour: '#2A9D8F',
        data: data.rdSpending.map(d => ({
          date: yearToDate(d.year),
          value: d.pctGdp,
        })),
      }]
    : [];

  const latestShare = data?.investmentShare[data.investmentShare.length - 1];
  const preBrexitShare = data?.investmentShare.find(d => d.year === 2015);
  const latestGrowth = data?.annualGrowth[data.annualGrowth.length - 1];
  const latestRd = data?.rdSpending[data.rdSpending.length - 1];
  const ukG7 = data?.g7Comparison.find(d => d.country === 'United Kingdom');
  const g7Average = data?.g7Comparison
    ? (data.g7Comparison.reduce((sum, d) => sum + d.pctGdp, 0) / data.g7Comparison.length)
    : 13.0;

  const shareGap = latestShare && preBrexitShare
    ? (latestShare.pctGdp - preBrexitShare.pctGdp).toFixed(1)
    : '+0.4';

  return (
    <>
      <TopicNav topic="Economy" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy"
          question="Are UK Businesses Investing Enough?"
          finding="UK business investment as a share of GDP remains the lowest in the G7 at 10.2%, roughly three percentage points below the group average. A decade of uncertainty — from the Brexit referendum through the pandemic — suppressed capital spending, though 2024-25 shows tentative recovery."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Business investment measures what the private sector spends on buildings, machinery, vehicles, software, and intellectual property. It is the most direct indicator of whether companies believe the economy is worth betting on. When firms invest, they create capacity for future growth — new factories, better technology, more efficient processes. When they hold back, productivity stagnates and the economy runs on inertia. The UK has had a business investment problem for decades, but the post-2016 period made it materially worse.</p>
            <p>Between the 2016 referendum and the onset of COVID-19, business investment flatlined while comparable economies continued to grow theirs. The Office for Budget Responsibility estimated the UK lost roughly 25% of potential business investment due to Brexit-related uncertainty alone. The pandemic then caused a historic 12.5% collapse in 2020. Recovery has been real but uneven: spending on IT and intangibles bounced back quickly, while investment in structures and machinery — the physical infrastructure of a productive economy — remains subdued. The full expensing capital allowance introduced in 2023 offers permanent tax incentives for plant and machinery, the most generous in the G7.</p>
            <p>R&D spending tells a related but slightly more encouraging story. The UK now spends 1.83% of GDP on research and development, up from 1.56% in 2010 and approaching the OECD average of 2.7%. Private sector R&D has been the main driver of this increase, concentrated in pharmaceuticals, aerospace, and the technology sector. Whether this translates into broader productivity gains depends on commercialisation — turning ideas into products — which remains a persistent UK weakness.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-share', label: 'Investment share' },
          { id: 'sec-growth', label: 'Annual growth' },
          { id: 'sec-rd', label: 'R&D spending' },
          { id: 'sec-g7', label: 'G7 comparison' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Business investment (% GDP)"
            value={latestShare ? `${latestShare.pctGdp}%` : '10.2%'}
            unit="2025"
            direction="flat"
            polarity="up-is-good"
            changeText={`${shareGap} pp since 2015 · G7 average: ${g7Average.toFixed(1)}%`}
            sparklineData={
              data ? sparkFrom(data.investmentShare.map(d => d.pctGdp)) : []
            }
            source="ONS · Business Investment, Q4 2025"
            href="#sec-share"
          />
          <MetricCard
            label="Annual investment growth"
            value={latestGrowth ? `${latestGrowth.growthPct}%` : '1.2%'}
            unit="2025"
            direction="down"
            polarity="up-is-good"
            changeText="Well below pre-2016 trend of 4-5%"
            sparklineData={
              data ? sparkFrom(data.annualGrowth.map(d => d.growthPct)) : []
            }
            source="ONS · Business Investment, Q4 2025"
            href="#sec-growth"
          />
          <MetricCard
            label="R&D spending (% GDP)"
            value={latestRd ? `${latestRd.pctGdp}%` : '1.83%'}
            unit="2025"
            direction="up"
            polarity="up-is-good"
            changeText="Up from 1.56% in 2010 · OECD avg: 2.7%"
            sparklineData={
              data ? sparkFrom(data.rdSpending.map(d => d.pctGdp)) : []
            }
            source="ONS · Gross Expenditure on R&D, 2025"
            href="#sec-rd"
          />
        </div>

        {/* Chart 1: Investment share of GDP */}
        <ScrollReveal>
          <div id="sec-share" className="mb-12">
            <LineChart
              series={investmentShareSeries}
              title="UK business investment as a share of GDP, 2000–2025"
              subtitle="Collapsed during the financial crisis, flatlined after the EU referendum, and fell again in the pandemic. Now recovering but still below G7 peers."
              yLabel="% of GDP"
              source={{
                name: 'ONS',
                dataset: 'Business Investment — Quarterly National Accounts',
                frequency: 'quarterly',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Annual growth rate */}
        <ScrollReveal>
          <div id="sec-growth" className="mb-12">
            <LineChart
              series={growthSeries}
              title="Annual business investment growth, 2010–2025"
              subtitle="Strong pre-referendum growth gave way to near-stagnation. The 2020 collapse was the sharpest on record. Recovery has moderated."
              yLabel="Annual growth (%)"
              source={{
                name: 'ONS',
                dataset: 'Business Investment — Quarterly National Accounts',
                frequency: 'quarterly',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: R&D spending */}
        <ScrollReveal>
          <div id="sec-rd" className="mb-12">
            <LineChart
              series={rdSeries}
              title="UK gross expenditure on R&D as % of GDP, 2010–2025"
              subtitle="Steady upward trend driven by the private sector, but still well below the OECD average of 2.7%."
              yLabel="% of GDP"
              source={{
                name: 'ONS',
                dataset: 'Gross Domestic Expenditure on R&D',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* G7 comparison bar chart */}
        <ScrollReveal>
          <div id="sec-g7" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Business investment as % of GDP — G7 comparison
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                The UK consistently ranks last among G7 economies for business investment intensity.
              </p>
              <div className="mt-6 space-y-4">
                {data?.g7Comparison
                  .sort((a, b) => b.pctGdp - a.pctGdp)
                  .map((d) => {
                    const pct = (d.pctGdp / 18) * 100;
                    const isUk = d.country === 'United Kingdom';
                    return (
                      <div key={d.country}>
                        <div className="flex justify-between items-center mb-1">
                          <span className={`text-sm ${isUk ? 'font-bold' : 'font-medium'} text-wiah-black`}>
                            {d.country}
                          </span>
                          <span className={`font-mono text-sm ${isUk ? 'font-bold text-wiah-red' : 'font-bold text-wiah-black'}`}>
                            {d.pctGdp}%
                          </span>
                        </div>
                        <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                          <div
                            className="h-full rounded-sm transition-all"
                            style={{
                              width: `${pct}%`,
                              backgroundColor: isUk ? '#E63946' : '#6B7280',
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">
                Source: OECD — National Accounts, latest available year (2024/25)
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Full expensing: the most generous capital allowance in the G7"
            value="100%"
            description="Since April 2023, UK businesses can deduct the full cost of qualifying plant and machinery investment from their taxable profits in the year of purchase — a permanent 100% first-year allowance. The policy was made permanent in Autumn Statement 2023, removing a long-standing source of uncertainty. Early data from HMRC shows claims under the scheme rose 14% in the first full year. The OBR estimates full expensing will raise the level of business investment by around 4% in the long run, equivalent to roughly £3 billion per year in additional capital spending."
            source="Source: HMRC — Capital Allowances Statistics, 2025. OBR — Economic and Fiscal Outlook, March 2025."
          />
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p><strong>Business investment data:</strong> ONS Quarterly National Accounts (NPEL series). Business investment is measured in chained volume terms (2019 prices) and expressed as a share of nominal GDP. Covers private sector gross fixed capital formation excluding dwellings and transfer costs.</p>
            <p><strong>G7 comparison:</strong> OECD National Accounts database, using gross fixed capital formation by the business sector as % of GDP. Latest available year varies by country (2024 or 2025). Definitions are broadly comparable but not identical across national statistical offices.</p>
            <p><strong>R&amp;D spending:</strong> ONS Gross Domestic Expenditure on Research and Development (GERD). Includes government, higher education, and business enterprise R&amp;D. The OECD average of 2.7% is from the Main Science and Technology Indicators database.</p>
            <p><strong>Full expensing:</strong> HMRC Capital Allowances statistics. OBR long-run impact estimate from the March 2025 Economic and Fiscal Outlook.</p>
            <p>Updated quarterly as new ONS data is published.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
