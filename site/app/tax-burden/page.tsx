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

interface TaxGdpPoint {
  year: number;
  pct: number;
}

interface IncomeTaxPoint {
  year: number;
  billionGBP: number;
}

interface FiscalDragPoint {
  year: number;
  extraHigherRatePayers: number;
  personalAllowance: number;
  avgEarnings: number;
}

interface CouncilTaxPoint {
  year: number;
  avgBandD: number;
}

interface RegionData {
  region: string;
  taxGdpPct: number;
}

interface TaxBurdenData {
  taxToGdp: TaxGdpPoint[];
  incomeTaxReceipts: IncomeTaxPoint[];
  fiscalDrag: FiscalDragPoint[];
  councilTax: CouncilTaxPoint[];
  byRegion: RegionData[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function TaxBurdenPage() {
  const [data, setData] = useState<TaxBurdenData | null>(null);

  useEffect(() => {
    fetch('/data/tax-burden/tax_burden.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const taxGdpSeries: Series[] = data
    ? [{
        id: 'tax-gdp',
        label: 'Tax as % of GDP',
        colour: '#E63946',
        data: data.taxToGdp.map(d => ({
          date: yearToDate(d.year),
          value: d.pct,
        })),
      }]
    : [];

  const fiscalDragSeries: Series[] = data
    ? [
        {
          id: 'personal-allowance',
          label: 'Personal allowance (\u00a3)',
          colour: '#264653',
          data: data.fiscalDrag.map(d => ({
            date: yearToDate(d.year),
            value: d.personalAllowance,
          })),
        },
        {
          id: 'avg-earnings',
          label: 'Average earnings (\u00a3)',
          colour: '#2A9D8F',
          data: data.fiscalDrag.map(d => ({
            date: yearToDate(d.year),
            value: d.avgEarnings,
          })),
        },
      ]
    : [];

  const councilTaxSeries: Series[] = data
    ? [{
        id: 'council-tax',
        label: 'Average Band D council tax (\u00a3)',
        colour: '#6B7280',
        data: data.councilTax.map(d => ({
          date: yearToDate(d.year),
          value: d.avgBandD,
        })),
      }]
    : [];

  const taxGdpAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: COVID fiscal shock' },
    { date: new Date(2021, 0, 1), label: '2021: Threshold freeze begins' },
  ];

  const fiscalDragAnnotations: Annotation[] = [
    { date: new Date(2021, 0, 1), label: '2021: Thresholds frozen until 2028' },
  ];

  const councilTaxAnnotations: Annotation[] = [
    { date: new Date(2016, 0, 1), label: '2016: Social care precept introduced' },
    { date: new Date(2022, 0, 1), label: '2022: 5% annual rises permitted' },
  ];

  // ── Derived values ────────────────────────────────────────────────────

  const latestTaxGdp = data?.taxToGdp[data.taxToGdp.length - 1];
  const earliestTaxGdp = data?.taxToGdp[0];
  const latestDrag = data?.fiscalDrag[data.fiscalDrag.length - 1];
  const latestCouncil = data?.councilTax[data.councilTax.length - 1];
  const earliestCouncil = data?.councilTax[0];

  const councilTaxRise = latestCouncil && earliestCouncil
    ? Math.round(((latestCouncil.avgBandD - earliestCouncil.avgBandD) / earliestCouncil.avgBandD) * 100)
    : 58;

  return (
    <>
      <TopicNav topic="Tax Burden" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy & Work"
          question="Are Taxes at a 70-Year High?"
          finding="Tax as a share of GDP reached 37.1% in 2024-25 — the highest since 1948. The rise is driven by fiscal drag from frozen income tax thresholds, rising National Insurance receipts, and council tax increases that have outpaced inflation for over a decade."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The overall tax burden has risen steadily since 2019, accelerating sharply after the pandemic. The single largest driver is fiscal drag: the decision to freeze income tax thresholds at 2021 levels while earnings have risen by over 20%. This has pulled an estimated 3.8 million additional people into the higher rate of income tax by 2026-27 without any formal rate change. In practice, it functions as a stealth tax rise &mdash; no headline announcement, no parliamentary vote, but a growing share of ordinary pay packets taken by the Treasury.
            </p>
            <p>
              Council tax has compounded the squeeze at the local level. Average Band D bills have risen from &pound;1,187 in 2010 to &pound;1,874 in 2025 &mdash; a 58% increase. Since 2022, councils have been permitted 5% annual rises (3% general plus 2% adult social care precept) to offset central government funding cuts. The burden falls hardest on those in lower-value properties, where council tax represents a far larger share of household income than for wealthier homeowners.
            </p>
            <p>
              Total HMRC receipts crossed &pound;282 billion in 2024-25, up from &pound;149 billion in 2010. These figures reflect a structural shift in how the state is funded &mdash; through threshold manipulation rather than overt rate changes. Understanding the scale is the first step toward accountability.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-taxgdp', label: 'Tax/GDP ratio' },
          { id: 'sec-drag', label: 'Fiscal drag' },
          { id: 'sec-council', label: 'Council tax' },
          { id: 'sec-regional', label: 'Regional' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Tax/GDP ratio"
            value={latestTaxGdp ? `${latestTaxGdp.pct}%` : '37.1%'}
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestTaxGdp && earliestTaxGdp
                ? `+${(latestTaxGdp.pct - earliestTaxGdp.pct).toFixed(1)}pp since ${earliestTaxGdp.year} · highest since 1948`
                : '+4.8pp since 2010 · highest since 1948'
            }
            sparklineData={
              data ? sparkFrom(data.taxToGdp.map(d => d.pct)) : []
            }
            source="OBR · Economic and Fiscal Outlook, March 2025"
            href="#sec-taxgdp"
          />
          <MetricCard
            label="Extra higher-rate taxpayers (freeze)"
            value={latestDrag ? `${(latestDrag.extraHigherRatePayers / 1000000).toFixed(1)}m` : '3.8m'}
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Since 2021 threshold freeze · fiscal drag at scale"
            sparklineData={
              data ? data.fiscalDrag.map(d => d.extraHigherRatePayers / 1000000) : []
            }
            source="HMRC · Income tax liabilities statistics, 2025"
            href="#sec-drag"
          />
          <MetricCard
            label="Council tax rise since 2010"
            value={`+${councilTaxRise}%`}
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestCouncil
                ? `Band D avg now \u00a3${latestCouncil.avgBandD.toLocaleString()} · 5% annual rises since 2022`
                : 'Band D avg now \u00a31,874 · 5% annual rises since 2022'
            }
            sparklineData={
              data ? sparkFrom(data.councilTax.map(d => d.avgBandD)) : []
            }
            source="DLUHC · Council tax levels, 2024-25"
            href="#sec-council"
          />
        </div>

        {/* Chart 1: Tax as % of GDP */}
        <ScrollReveal>
          <div id="sec-taxgdp" className="mb-12">
            <LineChart
              series={taxGdpSeries}
              title="UK tax receipts as % of GDP, 2010–2025"
              subtitle="Total tax burden as a share of national income. Now at its highest level since the post-war Attlee government."
              yLabel="% of GDP"
              annotations={taxGdpAnnotations}
              source={{
                name: 'OBR',
                dataset: 'Economic and Fiscal Outlook',
                frequency: 'biannual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Fiscal drag — threshold vs earnings */}
        <ScrollReveal>
          <div id="sec-drag" className="mb-12">
            <LineChart
              series={fiscalDragSeries}
              title="Income tax threshold vs average earnings, 2021–2026"
              subtitle="The personal allowance has been frozen at \u00a312,570 since 2021 while average earnings have risen 28%. The widening gap represents fiscal drag."
              yLabel="£"
              annotations={fiscalDragAnnotations}
              source={{
                name: 'HMRC',
                dataset: 'Income tax thresholds & ASHE median earnings',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Council tax */}
        <ScrollReveal>
          <div id="sec-council" className="mb-12">
            <LineChart
              series={councilTaxSeries}
              title="Average Band D council tax, England, 2010–2025"
              subtitle="Includes social care precept. Councils permitted 5% annual rises since 2022 to offset central funding cuts."
              yLabel="£"
              annotations={councilTaxAnnotations}
              source={{
                name: 'DLUHC',
                dataset: 'Council tax levels set by local authorities',
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
                Effective tax burden by region (estimated tax/GDP %)
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                Higher earnings and property values in London and the South East drive a larger share of total tax relative to local output.
              </p>
              <div className="mt-6 space-y-4">
                {data?.byRegion.map((r) => {
                  const pct = (r.taxGdpPct / 42) * 100;
                  return (
                    <div key={r.region}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{r.region}</span>
                        <span className="font-mono text-sm font-bold text-wiah-black">{r.taxGdpPct}%</span>
                      </div>
                      <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{ width: `${pct}%`, backgroundColor: '#6B7280' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">
                Source: OBR regional fiscal model &middot; HMRC sub-national tax receipts, 2023-24
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Income tax thresholds to rise again from 2028"
            value="2028"
            unit="threshold unfreeze confirmed"
            description="The Chancellor confirmed the income tax personal allowance and higher-rate threshold will begin rising with inflation from 2028-29, ending the six-year freeze. OBR modelling suggests this will remove around 1.2 million people from the higher rate over the following three years. The basic rate threshold had been frozen at \u00a312,570 since 2021, dragging millions of ordinary earners into higher tax bands without any formal rate change."
            source="Source: HM Treasury — Autumn Budget 2024. OBR — Economic and Fiscal Outlook, March 2025."
          />
        </ScrollReveal>

        {/* Sources & Methodology */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <div>
              <a href="https://obr.uk/efo/economic-and-fiscal-outlook-march-2025/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">OBR — Economic and Fiscal Outlook</a>
              <div className="text-xs text-wiah-mid">Updated biannually</div>
            </div>
            <div>
              <a href="https://www.gov.uk/government/statistics/hmrc-tax-and-nics-receipts-for-the-uk" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">HMRC — Tax and NICs receipts</a>
              <div className="text-xs text-wiah-mid">Updated monthly</div>
            </div>
            <div>
              <a href="https://www.gov.uk/government/statistics/income-tax-liabilities-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">HMRC — Income tax liabilities statistics</a>
              <div className="text-xs text-wiah-mid">Updated annually</div>
            </div>
            <div>
              <a href="https://www.gov.uk/government/collections/council-tax-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DLUHC — Council tax levels set by local authorities</a>
              <div className="text-xs text-wiah-mid">Updated annually</div>
            </div>
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Methodology</h3>
            <p>Tax/GDP ratio from OBR Economic and Fiscal Outlook, using HM Treasury national accounts definitions. Fiscal drag estimates model the number of taxpayers pulled into higher bands by comparing earnings growth against frozen thresholds, using HMRC Survey of Personal Incomes microdata. Council tax figures are average Band D including adult social care precept, from DLUHC annual returns.</p>
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Known issues</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>GDP is subject to revision so the tax/GDP ratio changes retroactively</li>
              <li>Fiscal drag estimates depend on earnings distribution assumptions</li>
              <li>Regional effective tax rates are modelled estimates, not direct measurements</li>
              <li>Council tax averages mask significant variation within regions</li>
            </ul>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
