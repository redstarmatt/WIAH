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
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'ONS', dataset: 'International comparisons of productivity — output per hour worked', url: 'https://www.ons.gov.uk/economy/economicoutputandproductivity/productivitymeasures', date: '2024' },
  { num: 2, name: 'OECD', dataset: 'Investment (GFCF) as % of GDP and R&D spending', url: 'https://data.oecd.org/gdp/investment-gfcf.htm', date: '2024' },
  { num: 3, name: 'ONS', dataset: 'Subregional productivity: labour productivity indices by NUTS1 region', url: 'https://www.ons.gov.uk/economy/economicoutputandproductivity/productivitymeasures/datasets/subregionalproductivitylabourproductivitygvaperhourworkedandgvaperfilledjobindicesbyuknuts2andnuts3subregions', date: '2024' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface OutputPerHourPoint {
  year: number;
  uk: number;
  g7Avg: number;
  germany: number;
  france: number;
  usa: number;
}

interface InvestmentSharePoint {
  year: number;
  uk: number;
  g7Avg: number;
  oecd: number;
}

interface RdSpendingPoint {
  year: number;
  uk: number;
  g7Avg: number;
  germany: number;
  usa: number;
}

interface RegionData {
  region: string;
  outputPerHourIndex: number;
}

interface ProductivityData {
  outputPerHour: OutputPerHourPoint[];
  investmentShare: InvestmentSharePoint[];
  rdSpending: RdSpendingPoint[];
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

export default function UkProductivityGapPage() {
  const [data, setData] = useState<ProductivityData | null>(null);

  useEffect(() => {
    fetch('/data/uk-productivity-gap/uk_productivity_gap.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const outputSeries: Series[] = data
    ? [
        {
          id: 'uk',
          label: 'United Kingdom',
          colour: '#E63946',
          data: data.outputPerHour.map(d => ({ date: yearToDate(d.year), value: d.uk })),
        },
        {
          id: 'g7-avg',
          label: 'G7 average',
          colour: '#6B7280',
          data: data.outputPerHour.map(d => ({ date: yearToDate(d.year), value: d.g7Avg })),
        },
        {
          id: 'usa',
          label: 'United States',
          colour: '#264653',
          data: data.outputPerHour.map(d => ({ date: yearToDate(d.year), value: d.usa })),
        },
        {
          id: 'france',
          label: 'France',
          colour: '#F4A261',
          data: data.outputPerHour.map(d => ({ date: yearToDate(d.year), value: d.france })),
        },
      ]
    : [];

  const investmentSeries: Series[] = data
    ? [
        {
          id: 'uk-inv',
          label: 'United Kingdom',
          colour: '#E63946',
          data: data.investmentShare.map(d => ({ date: yearToDate(d.year), value: d.uk })),
        },
        {
          id: 'g7-inv',
          label: 'G7 average',
          colour: '#6B7280',
          data: data.investmentShare.map(d => ({ date: yearToDate(d.year), value: d.g7Avg })),
        },
        {
          id: 'oecd-inv',
          label: 'OECD average',
          colour: '#264653',
          data: data.investmentShare.map(d => ({ date: yearToDate(d.year), value: d.oecd })),
        },
      ]
    : [];

  const rdSeries: Series[] = data
    ? [
        {
          id: 'uk-rd',
          label: 'United Kingdom',
          colour: '#E63946',
          data: data.rdSpending.map(d => ({ date: yearToDate(d.year), value: d.uk })),
        },
        {
          id: 'g7-rd',
          label: 'G7 average',
          colour: '#6B7280',
          data: data.rdSpending.map(d => ({ date: yearToDate(d.year), value: d.g7Avg })),
        },
        {
          id: 'germany-rd',
          label: 'Germany',
          colour: '#F4A261',
          data: data.rdSpending.map(d => ({ date: yearToDate(d.year), value: d.germany })),
        },
        {
          id: 'usa-rd',
          label: 'United States',
          colour: '#264653',
          data: data.rdSpending.map(d => ({ date: yearToDate(d.year), value: d.usa })),
        },
      ]
    : [];

  // ── Derived metrics ───────────────────────────────────────────────────────

  const latestOutput = data?.outputPerHour[data.outputPerHour.length - 1];
  const gapVsG7 = latestOutput
    ? Math.round(((latestOutput.g7Avg - latestOutput.uk) / latestOutput.g7Avg) * 100)
    : 16;
  const gapVsUSA = latestOutput
    ? Math.round(((latestOutput.usa - latestOutput.uk) / latestOutput.usa) * 100)
    : 25;

  const latestInvestment = data?.investmentShare[data.investmentShare.length - 1];
  const investGap = latestInvestment
    ? (latestInvestment.g7Avg - latestInvestment.uk).toFixed(1)
    : '5.0';

  const latestRd = data?.rdSpending[data.rdSpending.length - 1];
  const rdGap = latestRd
    ? (latestRd.g7Avg - latestRd.uk).toFixed(2)
    : '1.04';

  return (
    <>
      <TopicNav topic="UK Productivity Gap" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="UK Productivity Gap"
          question="Why Is UK Productivity Lagging?"
          finding="UK output per hour is 16% below the G7 average and 25% below the United States, a gap that has widened since the 2008 financial crisis. Chronic underinvestment in capital, infrastructure, and R&D explains most of it."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Before 2008, UK productivity growth tracked other advanced economies reasonably well, averaging around 2% per year. Then it stopped. While every G7 country saw a post-crisis slowdown, Britain's was uniquely severe: average annual growth fell to 0.4% per year between 2010 and 2024, less than a quarter of the pre-crisis rate. The result is a cumulative shortfall worth roughly GBP 5,000 per worker per year in lost output -- the single largest driver of stagnant living standards over the past fifteen years.<Cite nums={1} /></p>
            <p>The causes are structural and well-documented. Business investment as a share of GDP has been the lowest in the G7 for most of the past two decades, running 5 percentage points below the OECD average. R&D spending, at 1.78% of GDP, sits far below Germany (3.18%) and the United States (3.56%). Public infrastructure spending has been cut repeatedly, planning constraints limit commercial development, and the UK's unusually centralised fiscal system starves regional economies of the investment autonomy that drives growth in federal countries like Germany and the US.<Cite nums={2} /></p>
            <p>There is also a regional dimension. London's output per hour is 62% higher than Northern Ireland's and 56% higher than Wales.<Cite nums={3} /> This is not merely a London success story; it reflects decades of infrastructure, skills, and institutional investment concentrated in the South East while other regions received far less. Closing the productivity gap requires closing the geography gap.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-output', label: 'Output per hour' },
          { id: 'sec-investment', label: 'Investment' },
          { id: 'sec-rd', label: 'R&D spending' },
          { id: 'sec-regional', label: 'Regional' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Productivity gap vs G7 average"
            value={`${gapVsG7}%`}
            unit="below G7"
            direction="up"
            polarity="up-is-bad"
            changeText="widened from 10% in 2008 · equivalent to ~GBP 5,000 per worker per year"
            sparklineData={
              data ? sparkFrom(data.outputPerHour.map(d => d.g7Avg - d.uk)) : [10, 11, 12, 13, 13, 14, 14, 15, 16]
            }
            source="ONS · International comparisons of productivity, 2024"
            href="#sec-output"
          />
          <MetricCard
            label="Business investment gap vs OECD"
            value={`${investGap}pp`}
            unit="below OECD"
            direction="up"
            polarity="up-is-bad"
            changeText="UK at 17.2% of GDP vs OECD 22.6% · lowest in G7 most years since 2005"
            sparklineData={
              data ? sparkFrom(data.investmentShare.map(d => d.oecd - d.uk)) : [5.0, 5.0, 4.8, 5.0, 4.9, 5.1, 5.1, 5.2, 5.4]
            }
            source="OECD · Investment (GFCF) as % of GDP, 2024"
            href="#sec-investment"
          />
          <MetricCard
            label="R&D spending as % of GDP"
            value={latestRd ? `${latestRd.uk}%` : '1.78%'}
            unit="of GDP"
            direction="down"
            polarity="up-is-good"
            changeText={`${rdGap}pp below G7 average · half the rate of Germany`}
            sparklineData={
              data ? sparkFrom(data.rdSpending.map(d => d.uk)) : [1.63, 1.65, 1.69, 1.71, 1.67, 1.72, 1.73, 1.75, 1.78]
            }
            source="OECD · Gross domestic spending on R&D, 2024"
            href="#sec-rd"
          />
        </div>

        {/* Chart 1: Output per hour */}
        <ScrollReveal>
          <div id="sec-output" className="mb-12">
            <LineChart
              series={outputSeries}
              title="Output per hour (GDP per hour worked), 2005-2024"
              subtitle="Indexed: USA 2005 = 100. UK has flatlined since 2008 while competitors continued to grow."
              yLabel="Index (USA 2005 = 100)"
              source={{
                name: 'ONS',
                dataset: 'International comparisons of productivity',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Business investment */}
        <ScrollReveal>
          <div id="sec-investment" className="mb-12">
            <LineChart
              series={investmentSeries}
              title="Business investment (GFCF) as share of GDP, 2005-2024"
              subtitle="UK consistently below G7 and OECD averages. The investment gap is the productivity gap."
              yLabel="% of GDP"
              source={{
                name: 'OECD',
                dataset: 'Investment (GFCF) as % of GDP',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: R&D spending */}
        <ScrollReveal>
          <div id="sec-rd" className="mb-12">
            <LineChart
              series={rdSeries}
              title="Gross domestic spending on R&D as % of GDP, 2005-2024"
              subtitle="UK spends roughly half what Germany and the US spend on R&D relative to GDP."
              yLabel="% of GDP"
              source={{
                name: 'OECD',
                dataset: 'Gross domestic spending on R&D',
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
                Output per hour by region (UK = 100)
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                London&apos;s productivity is 62% higher than Northern Ireland&apos;s. The UK&apos;s regional inequality is the widest in any G7 country.
              </p>
              <div className="mt-6 space-y-4">
                {data?.byRegion.map((r) => {
                  const pct = (r.outputPerHourIndex / 140) * 100;
                  const isAboveAvg = r.outputPerHourIndex >= 100;
                  return (
                    <div key={r.region}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{r.region}</span>
                        <span className="font-mono text-sm font-bold text-wiah-black">{r.outputPerHourIndex}</span>
                      </div>
                      <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{
                            width: `${pct}%`,
                            backgroundColor: isAboveAvg ? '#264653' : '#6B7280',
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">Source: ONS -- Subregional productivity: labour productivity indices, 2024</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Services sector remains a global strength"
            value="78%"
            unit="of GDP"
            description="The UK's services sector -- particularly financial services, professional services, and the creative industries -- is among the most productive in the world. London ranks as the most productive major city in Europe. The challenge is not that the UK lacks high-productivity sectors, but that the gains are geographically concentrated and have not been matched by equivalent investment in the regions, in manufacturing, or in the foundational infrastructure that enables broad-based productivity growth."
            source="Source: ONS -- International comparisons of productivity, 2024. OECD -- Economic Survey of the United Kingdom, 2024."
          />
        </ScrollReveal>

        {/* Sources & Methodology */}
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p><strong>ONS:</strong> International comparisons of productivity (output per hour worked). Annual. Retrieved March 2026.</p>
            <p><strong>ONS:</strong> Subregional productivity: labour productivity indices by UK NUTS1 region. Annual. Retrieved March 2026.</p>
            <p><strong>OECD:</strong> Gross domestic spending on R&D (% of GDP). Annual. Retrieved March 2026.</p>
            <p><strong>OECD:</strong> Investment (GFCF) as percentage of GDP. Annual. Retrieved March 2026.</p>
            <p>Output per hour is indexed with USA 2005 = 100 for cross-country comparability. Investment share is gross fixed capital formation as a percentage of GDP. R&D spending is gross domestic expenditure on research and development as a percentage of GDP. 2020 data should be treated with caution due to COVID-19 compositional effects on measured productivity. Regional data uses NUTS1 regions, which mask significant within-region variation.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
