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

interface DebtAsGDPSeries {
  year: string;
  pctGDP: number;
}

interface InterestPaymentsSeries {
  year: string;
  billionGBP: number;
}

interface DebtByType {
  type: string;
  pctOfTotal: number;
}

interface PublicDebtData {
  national: {
    debtAsGDP: {
      timeSeries: DebtAsGDPSeries[];
      latestYear: string;
      latestPct: number;
      nominalBillionGBP: number;
    };
    interestPayments: {
      timeSeries: InterestPaymentsSeries[];
      latestYear: string;
      latestBillionGBP: number;
    };
    debtByType: DebtByType[];
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function fyToDate(fy: string): Date {
  const start = parseInt(fy.split('/')[0]);
  return new Date(start, 3, 1);
}

function sparkFrom(arr: number[], n = 12): number[] {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function PublicDebtPage() {
  const [data, setData] = useState<PublicDebtData | null>(null);

  useEffect(() => {
    fetch('/data/public-debt/public_debt.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const debtAsGDPSeries: Series[] = data
    ? [
        {
          id: 'debt-as-gdp',
          label: 'Debt as % of GDP',
          colour: '#6B7280',
          data: data.national.debtAsGDP.timeSeries.map(d => ({
            date: fyToDate(d.year),
            value: d.pctGDP,
          })),
        },
      ]
    : [];

  const interestPaymentsSeries: Series[] = data
    ? [
        {
          id: 'interest-payments',
          label: 'Interest payments',
          colour: '#E63946',
          data: data.national.interestPayments.timeSeries.map(d => ({
            date: fyToDate(d.year),
            value: d.billionGBP,
          })),
        },
      ]
    : [];

  const debtAnnotations: Annotation[] = [
    { date: fyToDate('2008/09'), label: '2008/09: Financial crisis' },
    { date: fyToDate('2020/21'), label: '2020/21: COVID-19' },
  ];

  const interestAnnotations: Annotation[] = [
    { date: fyToDate('2022/23'), label: '2022/23: Interest rate surge' },
  ];

  return (
    <>
      <TopicNav topic="Public Debt" />
      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <TopicHeader
          topic="Public Debt"
          question="Can Britain Actually Afford Its National Debt?"
          finding="UK public sector net debt reached £2.65 trillion — 97.1% of GDP — in 2023/24, the highest since the early 1960s. Annual interest payments hit £111 billion — more than the defence budget. Debt has trebled since 2008. The OBR projects debt will still be above 90% of GDP in 2028/29."
          colour="#6B7280"
          preposition="with"
        />

        {/* Section Nav */}
        <SectionNav
          sections={[
            { id: 'sec-overview', label: 'Overview' },
            { id: 'sec-debt', label: 'Debt Level' },
            { id: 'sec-interest', label: 'Interest Costs' },
            { id: 'sec-type', label: 'Debt Composition' },
          ]}
        />

        {/* Metric Cards */}
        <div id="sec-overview" className="mb-12 scroll-mt-20">
          <ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <MetricCard
                label="Public sector net debt (% of GDP)"
                value="97.1%"
                direction="up"
                polarity="up-is-bad"
                changeText="2023/24 · Up from 35% in 2007/08 · Highest since early 1960s · £2.65 trillion nominal"
                sparklineData={sparkFrom([35, 43, 52, 62, 69, 74, 79, 82, 83, 84, 86, 96, 97])}
                href="#sec-debt"/>
              <MetricCard
                label="Annual debt interest payments"
                value="£111bn"
                direction="up"
                polarity="up-is-bad"
                changeText="2022/23 · More than defence budget · Peaked at £116bn in 2022/23 · Highest since records began"
                sparklineData={sparkFrom([43, 45, 49, 53, 52, 51, 50, 50, 48, 47, 60, 116, 111])}
                href="#sec-interest"/>
              <MetricCard
                label="Structural deficit (cyclically adjusted borrowing)"
                value="3.1%"
                direction="down"
                polarity="up-is-bad"
                changeText="2023/24 (% GDP) · Down from 10.2% in 2009/10 · Fiscal rules require below 3% by 2028/29"
                sparklineData={sparkFrom([10.2, 8.4, 6.8, 5.5, 4.4, 3.5, 2.9, 2.6, 3.0, 4.1, 5.4, 4.2, 3.1])}
                href="#sec-type"/>
            </div>
          </ScrollReveal>
        </div>

        {/* Context */}
        <div className="mb-12 text-wiah-black leading-relaxed space-y-4">
          <ScrollReveal>
            <p>UK public sector net debt hit £2.65 trillion in 2023/24 — 97.1% of GDP — the highest ratio since the early 1960s. In 2007/08 debt stood at just 35% of GDP; it has nearly trebled in sixteen years. The trajectory reflects three distinct shocks: the 2008–09 financial crisis, during which deficit spending and bank bailouts added roughly 30 percentage points; a decade of austerity that reduced annual borrowing but never reversed the accumulated stock; and COVID-19, which added another 13 percentage points as the government borrowed £300 billion in a single year. Unlike most peer economies, UK debt is not predominantly held domestically: the Bank of England (via quantitative easing) and overseas investors hold roughly half between them. The average maturity of the gilt stock — around 15 years — is longer than most EU peers, providing some insulation from short-term rate rises.</p>
          </ScrollReveal>
          <ScrollReveal>
            <p>Annual debt interest payments reached £116 billion in 2022/23 — the highest in the post-war era — before falling slightly to £111 billion in 2023/24 as inflation retreated. That represents 4.2% of GDP: more than the defence budget, more than total transport investment, and more than the entire overseas aid budget. The culprit is a structural vulnerability unique among developed economies: 25% of UK gilt debt is index-linked to RPI inflation, so the inflationary surge of 2021–23 was extraordinarily costly. The Bank of England's quantitative tightening programme — selling gilts back into the market at a loss — imposes additional costs borne directly by HM Treasury. Debt service now absorbs approximately 12% of total tax revenues, historically high but not yet at crisis levels.</p>
          </ScrollReveal>
          <ScrollReveal>
            <p>Labour's fiscal rules, set at the Autumn Budget 2024, require public sector net financial liabilities to be falling as a share of GDP by the fifth year of the forecast and current spending to be covered by taxation within three years. The OBR's March 2024 projection has debt peaking at 98.8% of GDP in 2025/26 before stabilising — leaving almost no fiscal headroom. In the narrow sense the debt is sustainable: it is rollable, markets continue to lend, and gilt yields have not repriced in a repeat of the September 2022 mini-budget episode, which added 150 basis points to ten-year yields in days. The case for concern centres on composition (heavily inflation-linked), the interest bill, and demographics — the OBR estimates age-related spending will add 10% of GDP by 2070 without reform. The case for less concern: at over 200% of GDP in 1946, the UK reduced debt through growth without a crisis. The central projection requires no additional fiscal action, provided the economy grows as expected.</p>
          </ScrollReveal>
        </div>

        {/* Chart 1: Debt as % of GDP */}
        <div id="sec-debt" className="mb-12 scroll-mt-20">
          <ScrollReveal>
            {debtAsGDPSeries.length > 0 && (
              <LineChart
                title="UK public sector net debt as % of GDP, 2007/08–2023/24"
                subtitle="Public sector net debt excluding Bank of England. Trebled from 35% to 97% in 16 years."
                series={debtAsGDPSeries}
                yLabel="% of GDP"
                annotations={debtAnnotations}
                source={{ name: 'ONS', dataset: 'Public Sector Finances', frequency: 'monthly' }}
              />
            )}
          </ScrollReveal>
        </div>

        {/* Chart 2: Interest payments */}
        <div id="sec-interest" className="mb-12 scroll-mt-20">
          <ScrollReveal>
            {interestPaymentsSeries.length > 0 && (
              <LineChart
                title="Annual debt interest payments, 2010/11–2023/24"
                subtitle="Central government debt interest costs (£ billions). Spiked in 2022/23 as interest rates rose and index-linked gilts were revalued."
                series={interestPaymentsSeries}
                yLabel="£ billions"
                annotations={interestAnnotations}
                source={{ name: 'ONS', dataset: 'Public Sector Finances', frequency: 'monthly' }}
              />
            )}
          </ScrollReveal>
        </div>

        {/* Bar chart: Debt by type */}
        <div id="sec-type" className="mb-12 scroll-mt-20">
          <ScrollReveal>
            <div>
              <h2 className="text-xl font-bold text-wiah-black mb-2">Public sector debt by instrument type</h2>
              <p className="text-sm text-wiah-mid mb-6">UK national debt composition, 2023/24.</p>
              <div className="space-y-2">
                {data?.national.debtByType.map(item => (
                  <div key={item.type} className="flex items-center gap-3">
                    <div className="w-32 text-sm text-wiah-black font-mono">{item.type}</div>
                    <div className="flex-1 h-8 rounded relative" style={{ width: `${(item.pctOfTotal / 62) * 100}%`, backgroundColor: '#6B7280' }}>
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 font-mono text-xs font-bold text-white">
                        {item.pctOfTotal}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Positive Callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Context"
            value="97%"
            unit="of GDP — not exceptional by historic or international standards, but the interest bill is"
            description="UK public debt at 97% of GDP is not unprecedented — it was above 200% after the Second World War and was not fully paid down until 2006. What is historically unusual is the size of the annual interest bill: £111 billion in 2023/24 represents 4.2% of GDP, higher than at any point since the 1980s. This is primarily because 25% of UK debt is index-linked to RPI inflation, making the UK unusually vulnerable to inflationary episodes. The OBR projects debt will peak at 98.8% of GDP in 2025/26 before stabilising, on the assumption that the government meets its fiscal rules. The fiscal rules — requiring debt to be falling as a share of GDP after five years — leave little room for unexpected shocks."
            source="Source: ONS — Public Sector Finances 2023/24; OBR — Economic and Fiscal Outlook March 2024."
          />
        </ScrollReveal>

        {/* Sources */}
        <ScrollReveal>
          <div className="border-t border-wiah-border pt-8">
            <h3 className="text-sm font-bold text-wiah-black mb-4">Sources &amp; Methodology</h3>
            <div className="space-y-2 text-xs text-wiah-mid font-mono">
              {data?.metadata.sources.map((src, idx) => (
                <p key={idx}>
                  <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                    {src.name} — {src.dataset}
                  </a>
                  {' '} ({src.frequency})
                </p>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </main>
    </>
  );
}
