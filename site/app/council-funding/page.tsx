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

interface SpendingPoint {
  year: number;
  spendingPowerPerHead: number;
  adultSocialCareSpend: number;
  childrensSocialCareSpend: number;
}

interface S114Point {
  year: number;
  cumulative: number;
  newNotices: number;
}

interface CouncilTaxPoint {
  year: number;
  average: number;
}

interface RegionData {
  region: string;
  spendingCutPct: number;
}

interface CouncilFundingData {
  national: { timeSeries: SpendingPoint[] };
  s114Notices: S114Point[];
  councilTaxBandD: CouncilTaxPoint[];
  byRegion: RegionData[];
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function CouncilFundingPage() {
  const [data, setData] = useState<CouncilFundingData | null>(null);

  useEffect(() => {
    fetch('/data/council-funding/council_funding.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const spendingSeries: Series[] = data
    ? [
        {
          id: 'spending-power',
          label: 'Spending power per head (£, real terms)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.spendingPowerPerHead,
          })),
        },
      ]
    : [];

  const socialCareSeries: Series[] = data
    ? [
        {
          id: 'adult-social-care',
          label: 'Adult social care (£bn)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.adultSocialCareSpend,
          })),
        },
        {
          id: 'childrens-social-care',
          label: "Children's social care (£bn)",
          colour: '#F4A261',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.childrensSocialCareSpend,
          })),
        },
      ]
    : [];

  const s114Series: Series[] = data
    ? [
        {
          id: 's114-cumulative',
          label: 'Cumulative s114 notices',
          colour: '#E63946',
          data: data.s114Notices.map(d => ({
            date: yearToDate(d.year),
            value: d.cumulative,
          })),
        },
      ]
    : [];

  // ── Derived values ────────────────────────────────────────────────────

  const latestSpending = data?.national.timeSeries[data.national.timeSeries.length - 1];
  const firstSpending = data?.national.timeSeries[0];
  const spendingCutPct = latestSpending && firstSpending
    ? Math.round(((latestSpending.spendingPowerPerHead - firstSpending.spendingPowerPerHead) / firstSpending.spendingPowerPerHead) * 100)
    : -24;

  const latestS114 = data?.s114Notices[data.s114Notices.length - 1];

  const latestTax = data?.councilTaxBandD[data.councilTaxBandD.length - 1];
  const firstTax = data?.councilTaxBandD[0];
  const taxRisePct = latestTax && firstTax
    ? Math.round(((latestTax.average - firstTax.average) / firstTax.average) * 100)
    : 54;

  return (
    <>
      <TopicNav topic="Economy & Work" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy & Work"
          question="Are Councils Going Broke?"
          finding="Local authority spending power has fallen 24% per head in real terms since 2010, while demand-led costs in adult and children's social care have surged. Fourteen English councils have issued Section 114 insolvency notices since 2018, with more expected."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              English councils have lost nearly a quarter of their spending power per head since 2010 in real terms. The central government grant was cut faster and deeper than almost any other area of public spending during the austerity years, and the gap has never been restored. Councils were expected to replace lost grant income with council tax and business rates, but these revenues are capped by referendum limits and unevenly distributed. The result is a system where the councils serving the most deprived populations received the deepest cuts.
            </p>
            <p>
              At the same time, demand for the two largest council services has escalated relentlessly. Adult social care now absorbs over £18 billion annually, driven by an ageing population and rising provider costs. Children's social care spending has risen 62% in real terms since 2010, fuelled by a crisis in child protection referrals and a dysfunctional residential care market where private providers charge councils up to £10,000 per week per child. Together, these two services consume around 60% of upper-tier council budgets, crowding out spending on parks, libraries, roads, planning and everything else councils do.
            </p>
            <p>
              When a council can no longer balance its budget, the chief finance officer issues a Section 114 notice — the local government equivalent of a bankruptcy filing. Before 2018, only one council had issued a s114 notice in two decades. Since then, fourteen have done so, including Birmingham, the largest local authority in Europe. The National Audit Office has warned that the sector's financial position is unsustainable, and the LGA estimates the funding gap will reach £6.2 billion by 2026. Council tax has risen 54% since 2010 while services have contracted.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-spending', label: 'Spending power' },
          { id: 'sec-social-care', label: 'Social care costs' },
          { id: 'sec-s114', label: 'Section 114 notices' },
          { id: 'sec-regional', label: 'Regional' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Real-terms spending cut since 2010"
            value={`${spendingCutPct}%`}
            unit="per head"
            direction="down"
            polarity="up-is-bad"
            changeText={
              latestSpending && firstSpending
                ? `£${firstSpending.spendingPowerPerHead.toLocaleString()} → £${latestSpending.spendingPowerPerHead.toLocaleString()} per head (2024 prices)`
                : '£3,120 → £2,360 per head (2024 prices)'
            }
            sparklineData={
              data ? sparkFrom(data.national.timeSeries.map(d => d.spendingPowerPerHead)) : []
            }
            source="DLUHC · Local authority revenue expenditure, 2025"
            href="#sec-spending"
          />
          <MetricCard
            label="Councils issuing s114 notices"
            value={latestS114 ? latestS114.cumulative.toString() : '14'}
            unit="since 2018"
            direction="up"
            polarity="up-is-bad"
            changeText="Including Birmingham (2023) · more expected by 2026"
            sparklineData={
              data ? data.s114Notices.map(d => d.cumulative) : []
            }
            source="DLUHC / NAO · Section 114 tracking, 2025"
            href="#sec-s114"
          />
          <MetricCard
            label="Average council tax (Band D)"
            value={latestTax ? `£${latestTax.average.toLocaleString()}` : '£1,838'}
            unit="2025/26"
            direction="up"
            polarity="up-is-bad"
            changeText={`+${taxRisePct}% since 2010 · rising to fill the funding gap`}
            sparklineData={
              data ? sparkFrom(data.councilTaxBandD.map(d => d.average)) : []
            }
            source="DLUHC · Council tax levels set by local authorities, 2025"
            href="#sec-spending"
          />
        </div>

        {/* Chart 1: Spending power */}
        <ScrollReveal>
          <div id="sec-spending" className="mb-12">
            <LineChart
              series={spendingSeries}
              title="Local authority spending power per head, England, 2010–2025"
              subtitle="Real-terms spending power per head (2024 prices). Includes formula grant, council tax, business rates retention and specific grants."
              yLabel="£ per head"
              annotations={[
                { date: new Date(2010, 0, 1), label: '2010: Austerity begins' },
                { date: new Date(2020, 0, 1), label: '2020: Covid grants (temporary)' },
              ]}
              source={{
                name: 'DLUHC',
                dataset: 'Local authority revenue expenditure and financing',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Social care cost pressures */}
        <ScrollReveal>
          <div id="sec-social-care" className="mb-12">
            <LineChart
              series={socialCareSeries}
              title="Social care spending by English councils, 2010–2025"
              subtitle="Net current expenditure on adult and children's social care (£bn, real terms). Together these consume ~60% of upper-tier council budgets."
              yLabel="£ billion"
              annotations={[
                { date: new Date(2014, 0, 1), label: '2014: Care Act enacted' },
                { date: new Date(2022, 0, 1), label: '2022: Residential care cost spike' },
              ]}
              source={{
                name: 'DLUHC',
                dataset: 'RA/RO returns — social care expenditure',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Section 114 notices */}
        <ScrollReveal>
          <div id="sec-s114" className="mb-12">
            <LineChart
              series={s114Series}
              title="Section 114 notices issued by English councils, cumulative, 2018–2025"
              subtitle="Cumulative number of s114 insolvency notices. Before 2018, only one council had issued one in 20 years."
              yLabel="Notices (cumulative)"
              annotations={[
                { date: new Date(2018, 0, 1), label: '2018: Northamptonshire — first s114 in 20 years' },
                { date: new Date(2023, 0, 1), label: '2023: Birmingham — largest ever' },
              ]}
              source={{
                name: 'DLUHC / NAO',
                dataset: 'Section 114 notices tracker',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Regional variation */}
        <ScrollReveal>
          <div id="sec-regional" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Real-terms spending power cut since 2010 by region
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                Percentage change in spending power per head (real terms). The most deprived areas — which were most reliant on central government grant — were cut the deepest.
              </p>
              <div className="mt-6 space-y-4">
                {data?.byRegion.map((r) => {
                  const pct = (Math.abs(r.spendingCutPct) / 35) * 100;
                  return (
                    <div key={r.region}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{r.region}</span>
                        <span className="font-mono text-sm font-bold text-wiah-black">{r.spendingCutPct}%</span>
                      </div>
                      <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{ width: `${pct}%`, backgroundColor: '#E63946' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">
                Source: DLUHC — Local authority revenue expenditure and financing. NAO — Financial sustainability of local authorities, 2025.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Multi-year settlement restores some planning certainty"
            value="3-year"
            unit="settlement agreed from 2025/26"
            description="The 2024 Spending Review provided English councils with their first multi-year financial settlement since 2015, covering 2025/26 to 2027/28. The settlement includes a £600 million Social Care Support Grant, a one-off £500 million Recovery Fund for the most financially distressed authorities, and a new Extended Producer Responsibility income stream worth an estimated £1.2 billion by 2027/28. The LGA estimates the package still leaves a £2 billion+ annual gap, but multi-year certainty allows better planning and should reduce emergency budget decisions."
            source="Source: DLUHC — Local government finance settlement 2025-26. LGA — Funding gap analysis, 2025. NAO — Financial sustainability of local authorities."
          />
        </ScrollReveal>

        <RelatedTopics />

        {/* Sources & Methodology */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-wiah-blue hover:underline"
                >
                  {src.name} — {src.dataset}
                </a>
                <div className="text-xs text-wiah-mid">Updated {src.frequency}</div>
              </div>
            ))}
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Methodology</h3>
            <p>{data?.metadata.methodology}</p>
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Known issues</h3>
            <ul className="list-disc list-inside space-y-1">
              {data?.metadata.knownIssues.map((x, i) => <li key={i}>{x}</li>)}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
