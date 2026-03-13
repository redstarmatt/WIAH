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
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'MHCLG', dataset: 'Live Tables on Social Housing Sales', url: 'https://www.gov.uk/government/statistical-data-sets/live-tables-on-social-housing-sales', date: '2024' },
  { num: 2, name: 'DLUHC', dataset: 'Local Authority Housing Statistics — Dwelling Stock', url: 'https://www.gov.uk/government/statistical-data-sets/live-tables-on-dwelling-stock-including-vacants', date: '2024' },
  { num: 3, name: 'MHCLG', dataset: 'Right to Buy Replacement Data', url: 'https://www.gov.uk/government/statistical-data-sets/live-tables-on-social-housing-sales', date: '2024', note: 'Replacement ratio 0.29 — one in three replaced' },
  { num: 4, name: 'DLUHC', dataset: 'Local Authority Housing Statistics — Waiting Lists', url: 'https://www.gov.uk/government/statistical-data-sets/live-tables-on-rents-lettings-and-tenancies', date: '2024' },
  { num: 5, name: 'Inside Housing / Savills', dataset: 'Former RTB properties in PRS analysis', url: 'https://www.insidehousing.co.uk/', date: '2024', note: '40% of former RTB homes now in private rented sector' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface SalesPoint {
  year: number;
  sales: number;
}

interface ReplacementPoint {
  year: number;
  ratio: number;
}

interface StockPoint {
  year: number;
  stock: number;
}

interface WaitingListPoint {
  year: number;
  households: number;
}

interface DiscountPoint {
  year: number;
  averageDiscount: number;
}

interface RegionData {
  region: string;
  salesPer10k: number;
}

interface RightToBuyData {
  annualSales: SalesPoint[];
  replacementRatio: ReplacementPoint[];
  socialHousingStock: StockPoint[];
  waitingList: WaitingListPoint[];
  discountValue: DiscountPoint[];
  byRegion: RegionData[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

function fmtK(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "m";
  if (n >= 1000) return (n / 1000).toFixed(0) + "k";
  return n.toLocaleString();
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function RightToBuyPage() {
  const [data, setData] = useState<RightToBuyData | null>(null);

  useEffect(() => {
    fetch('/data/right-to-buy/right_to_buy.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const salesSeries: Series[] = data
    ? [{
        id: 'sales',
        label: 'Annual Right to Buy sales (England)',
        colour: '#F4A261',
        data: data.annualSales.map(d => ({
          date: yearToDate(d.year),
          value: d.sales,
        })),
      }]
    : [];

  const salesAnnotations: Annotation[] = [
    { date: new Date(1980, 5, 1), label: "1980: RTB introduced" },
    { date: new Date(2003, 5, 1), label: "2003: Discounts reduced" },
    { date: new Date(2012, 3, 1), label: "2012: Discount cap raised" },
  ];

  const stockSeries: Series[] = data
    ? [{
        id: 'stock',
        label: 'Total social housing stock (England)',
        colour: '#264653',
        data: data.socialHousingStock.map(d => ({
          date: yearToDate(d.year),
          value: d.stock,
        })),
      }]
    : [];

  const stockAnnotations: Annotation[] = [
    { date: new Date(1988, 5, 1), label: "1988: Housing Act transfers" },
    { date: new Date(2012, 3, 1), label: "2012: Reinvigorated RTB" },
  ];

  const waitingListSeries: Series[] = data
    ? [{
        id: 'waiting',
        label: 'Households on waiting lists',
        colour: '#E63946',
        data: data.waitingList.map(d => ({
          date: yearToDate(d.year),
          value: d.households,
        })),
      }]
    : [];

  const waitingAnnotations: Annotation[] = [
    { date: new Date(2012, 5, 1), label: "2012: Allocation rules tightened" },
    { date: new Date(2020, 2, 1), label: "2020: COVID-19 pandemic" },
  ];

  // ── Derived values ──────────────────────────────────────────────────────

  const latestSales = data?.annualSales[data.annualSales.length - 1];
  const peakSales = data?.annualSales.reduce((a, b) => a.sales > b.sales ? a : b);
  const totalSold = data?.annualSales.reduce((sum, d) => sum + d.sales, 0);

  const latestRatio = data?.replacementRatio[data.replacementRatio.length - 1];

  const latestWaiting = data?.waitingList[data.waitingList.length - 1];
  const lowestWaiting = data?.waitingList.reduce((a, b) => a.households < b.households ? a : b);

  const latestStock = data?.socialHousingStock[data.socialHousingStock.length - 1];
  const peakStock = data?.socialHousingStock[0];
  const stockLoss = peakStock && latestStock ? peakStock.stock - latestStock.stock : 2_320_000;

  return (
    <>
      <TopicNav topic="Housing" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Right to Buy"
          question="Has Right to Buy Depleted the Social Housing Stock?"
          finding="Since 1980, over two million council homes have been sold under Right to Buy. For every home sold in recent years, fewer than one in three has been replaced. The social housing waiting list is climbing again, with 1.31 million households now queuing for a home that may never be built."
          colour="#F4A261"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Right to Buy was introduced in the Housing Act 1980 as the flagship housing policy of
              the Thatcher government. The idea was simple and politically potent: give council
              tenants the right to purchase their home at a substantial discount, creating a
              "property-owning democracy." In its first decade, it was transformative. Over 1.5
              million homes were sold between 1980 and 1990, and home ownership in England rose from
              55% to 67%.<Cite nums={1} /> For millions of families, it was a genuine path to security and wealth
              accumulation that had previously been closed to them. But the policy contained a
              structural flaw that would take decades to become fully visible: there was no
              obligation to replace what was sold. The receipts were not ringfenced for new social
              housing. Councils were actively restricted from building. The stock shrank, and nothing
              grew back.
            </p>
            <p>
              The numbers are stark. England had 5.48 million social homes in 1980. Today it has
              3.16 million, a net loss of 2.32 million units, even accounting for housing association
              development and stock transfers.<Cite nums={2} /> The 2012 reinvigoration of the scheme, which raised
              maximum discounts to 70% of property value (up to {"\u00A3"}87,200 in London), led to a
              brief surge in sales but did not solve the replacement problem. The government pledged
              "one-for-one replacement" but defined this on a national, not local, basis and counted
              affordable rent homes (at up to 80% of market rent) as replacements. By 2024, the
              actual replacement ratio had fallen to 0.29: for every home sold, fewer than one in
              three was rebuilt.<Cite nums={3} /> The gap between the rhetoric of replacement and the reality of
              depletion has been consistent and measurable.
            </p>
            <p>
              The consequences are now visible across multiple datasets. Social housing waiting lists,
              which fell after 2012 partly due to tightened eligibility rules, have risen in every
              year since 2018 and now stand at 1.31 million households.<Cite nums={4} /> Temporary accommodation
              placements have reached record levels. The average wait for a social home in London
              exceeds ten years. Meanwhile, an estimated 40% of former Right to Buy properties are
              now in the private rented sector, often let at market rents to tenants receiving housing
              benefit, meaning the state effectively pays more for housing it once owned.<Cite nums={5} /> The policy
              created genuine individual opportunity, but at a collective cost that is still
              compounding.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-sales', label: 'Annual sales' },
          { id: 'sec-stock', label: 'Housing stock' },
          { id: 'sec-waiting', label: 'Waiting lists' },
          { id: 'sec-regional', label: 'Regional' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Right to Buy sales (2024)"
            value={latestSales ? latestSales.sales.toLocaleString() : "8,900"}
            unit="homes sold"
            direction="down"
            polarity="up-is-bad"
            changeText={
              latestSales && peakSales
                ? `Down from ${peakSales.sales.toLocaleString()} peak in ${peakSales.year} · ${totalSold ? fmtK(totalSold) : "2m+"} total sold since 1980`
                : "Down from 174,697 peak in 1982"
            }
            sparklineData={
              data ? sparkFrom(data.annualSales.map(d => d.sales)) : []
            }
            source="MHCLG Live Tables on Social Housing Sales, 2024"
            href="#sec-sales"
          />
          <MetricCard
            label="Replacement ratio"
            value={latestRatio ? latestRatio.ratio.toFixed(2) : "0.29"}
            unit="homes built per sale"
            direction="down"
            polarity="down-is-bad"
            changeText="Target: 1.0 (one-for-one) · actual ratio has never exceeded 0.43"
            sparklineData={
              data ? data.replacementRatio.map(d => d.ratio) : []
            }
            source="MHCLG Right to Buy Replacement Data, 2024"
            href="#sec-stock"
          />
          <MetricCard
            label="Waiting list households"
            value={latestWaiting ? (latestWaiting.households / 1_000_000).toFixed(2) + "m" : "1.31m"}
            unit="2024"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestWaiting && lowestWaiting
                ? `Up from ${fmtK(lowestWaiting.households)} low in ${lowestWaiting.year} · rising since 2018`
                : "Rising since 2018"
            }
            sparklineData={
              data ? sparkFrom(data.waitingList.map(d => d.households)) : []
            }
            source="DLUHC Local Authority Housing Statistics, 2024"
            href="#sec-waiting"
          />
        </div>

        {/* Chart 1: Annual RTB sales */}
        <ScrollReveal>
          <div id="sec-sales" className="mb-12">
            <LineChart
              series={salesSeries}
              annotations={salesAnnotations}
              title="Right to Buy sales, England, 1980-2024"
              subtitle="Annual council and housing association sales under RTB. Peak sales occurred 1982-1989 before declining sharply."
              yLabel="Homes sold"
              source={{
                name: 'MHCLG',
                dataset: 'Live Tables on Social Housing Sales',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistical-data-sets/live-tables-on-social-housing-sales',
                date: 'Jan 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Social housing stock */}
        <ScrollReveal>
          <div id="sec-stock" className="mb-12">
            <LineChart
              series={stockSeries}
              annotations={stockAnnotations}
              title="Total social housing stock, England, 1980-2024"
              subtitle={`Net loss of ${fmtK(stockLoss)} social homes since 1980. Stock transfers to housing associations partially offset council losses but total continues to fall.`}
              yLabel="Total homes"
              source={{
                name: 'DLUHC',
                dataset: 'Local Authority Housing Statistics',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistical-data-sets/live-tables-on-dwelling-stock-including-vacants',
                date: 'Jan 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Waiting list */}
        <ScrollReveal>
          <div id="sec-waiting" className="mb-12">
            <LineChart
              series={waitingListSeries}
              annotations={waitingAnnotations}
              title="Households on social housing waiting lists, England, 2010-2024"
              subtitle="Waiting lists fell after 2012 eligibility tightening but have risen consistently since 2018."
              yLabel="Households"
              source={{
                name: 'DLUHC',
                dataset: 'Local Authority Housing Statistics — Waiting Lists',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistical-data-sets/live-tables-on-rents-lettings-and-tenancies',
                date: 'Jan 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Regional variation */}
        <ScrollReveal>
          <div id="sec-regional" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Right to Buy sales rate by region (sales per 10,000 social homes, 2023/24)
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                Sales rates are highest in northern regions where discounts represent a larger share of property value.
              </p>
              <div className="mt-6 space-y-4">
                {data?.byRegion.map((r) => {
                  const pct = (r.salesPer10k / 20) * 100;
                  return (
                    <div key={r.region}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{r.region}</span>
                        <span className="font-mono text-sm font-bold text-wiah-black">{r.salesPer10k}</span>
                      </div>
                      <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: '#F4A261' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">
                Source: MHCLG — Live Tables on Social Housing Sales by Region, 2023/24
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Some councils now retaining full receipts"
            value="100%"
            unit="retention"
            description="Since 2022, local authorities in England have been permitted to retain 100% of Right to Buy receipts for replacement social housing, up from the previous 25-30%. The Treasury also extended the spending deadline from three to five years. Early evidence from councils like Birmingham and Manchester suggests this has modestly increased the pipeline of replacement homes, though the gap between sales and completions remains large. Several councils have used the flexibility to fund shared ownership and affordable rent units, keeping new homes within the social housing ecosystem rather than losing them entirely to the open market."
            source="Source: DLUHC — Right to Buy Receipts Retention Policy, 2022. Local authority housing returns 2024."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <RelatedTopics />
      </main>
    </>
  );
}
