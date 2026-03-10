'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface GdpGrowthPoint {
  year: number;
  growth: number;
}

interface G7ComparisonPoint {
  country: string;
  avgGrowth2010_2023: number;
}

interface EconomicGrowthData {
  ukGdpGrowth: GdpGrowthPoint[];
  g7Comparison: G7ComparisonPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function EconomicGrowthPage() {
  const [data, setData] = useState<EconomicGrowthData | null>(null);

  useEffect(() => {
    fetch('/data/economic-growth/economic_growth.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const gdpSeries: Series[] = data
    ? [{
        id: 'gdp-growth',
        label: 'UK GDP growth (%)',
        colour: '#E63946',
        data: data.ukGdpGrowth.map(d => ({
          date: yearToDate(d.year),
          value: d.growth,
        })),
      }]
    : [];

  const latest = data?.ukGdpGrowth[data.ukGdpGrowth.length - 1];
  const ukG7 = data?.g7Comparison.find(c => c.country === 'UK');
  const sortedG7 = data?.g7Comparison.slice().sort((a, b) => b.avgGrowth2010_2023 - a.avgGrowth2010_2023);

  return (
    <>
      <TopicNav topic="Economy & Work" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economic Growth"
          question="Why has the UK economy barely grown since 2008?"
          finding="UK GDP growth averaged 1.1% per year since 2010 — near the bottom of the G7. Labour productivity is 20% below Germany. 2023 saw just 0.1% growth. The UK has underperformed its economic potential for 15 years."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>UK GDP grew by just 0.1% in 2023, the end of a 15-year sequence of underperformance. Averaging 2010 to 2023, the UK grew at 1.1% per year — sixth out of seven G7 nations, ahead only of Japan — compared to 2.3% for the United States and 2.1% for Canada. The 2020 contraction of 11%, the sharpest in three centuries, was followed by an incomplete rebound; the OBR estimates Brexit has reduced UK trade intensity by around 15%, compounding the structural drag from chronically low business investment. UK capital expenditure as a share of GDP has been below the OECD average for two decades, and output per worker grew more slowly through the 2010s than at almost any point since the Industrial Revolution.</p>
            <p>The costs of stagnation fall unevenly. London's GVA per head sits at 174% of the UK average; the North East manages 67% — a gap that has widened every decade since the 1990s and that no policy has reversed. High-productivity growth in the capital contributes to national GDP figures without generating broad-based income gains; regions with lower investment and weaker labour markets bear the burden of stagnation while seeing little of London's growth. The UK's lowest capital investment rate in the G7, combined with extreme regional concentration of economic activity, means growth that does occur remains structurally fragile.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-gdp-trend', label: 'GDP trend' },
          { id: 'sec-g7', label: 'G7 comparison' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="UK GDP growth 2023"
              value={latest ? latest.growth.toFixed(1) : '0.1'}
              unit="%"
              direction="down"
              polarity="up-is-good"
              changeText="Near-stagnation · only avoided technical recession"
              sparklineData={[1.9, 1.6, 2.1, 3.0, 2.4, 1.8, 1.9, 1.3, 1.6, -11.0, 8.7, 4.1, 0.1]}
              source="ONS GDP · 2023"
              href="#sec-gdp-trend"/>
            <MetricCard
              label="Average growth 2010–2023"
              value={ukG7 ? ukG7.avgGrowth2010_2023.toFixed(1) : '1.1'}
              unit="%/yr"
              direction="flat"
              polarity="up-is-good"
              changeText="vs G7 average 1.3% · underperformance accelerating post-Brexit"
              sparklineData={[1.9, 1.8, 1.5, 1.3, 1.2, 1.1, 1.1]}
              source="ONS / IMF"
              href="#sec-g7"/>
            <MetricCard
              label="UK productivity vs Germany"
              value="−20"
              unit="%"
              direction="flat"
              polarity="up-is-good"
              changeText="Output per hour worked · gap has barely narrowed since 2010"
              sparklineData={[80, 80, 80, 80, 80, 80, 80]}
              source="ONS International Productivity Comparisons"
              href="#sec-g7"/>
          </div>
        </ScrollReveal>

        {/* Chart: GDP growth over time */}
        <ScrollReveal>
          <div id="sec-gdp-trend" className="mb-12">
            <LineChart
              series={gdpSeries}
              title="UK GDP growth rate, 2010–2023"
              subtitle="Annual real GDP growth. 2020 saw the sharpest contraction in three centuries; 2023 returned to near-stagnation."
              yLabel="Annual GDP growth (%)"
              source={{
                name: 'ONS',
                dataset: 'GDP statistical bulletin',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* G7 comparison */}
        <ScrollReveal>
          <div id="sec-g7" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-1">
                Average annual GDP growth, G7 nations, 2010–2023
              </h2>
              <p className="text-sm text-wiah-mid mb-6">The UK ranks 6th out of 7. Only Italy performs worse over this period.</p>
              <div className="mt-4 space-y-4">
                {sortedG7?.map((c) => {
                  const pct = (c.avgGrowth2010_2023 / 2.5) * 100;
                  const isUK = c.country === 'UK';
                  const colour = c.avgGrowth2010_2023 > 1.3 ? '#2A9D8F' : c.avgGrowth2010_2023 > 0.6 ? '#F4A261' : '#6B7280';
                  return (
                    <div key={c.country}>
                      <div className="flex justify-between items-center mb-1">
                        <span className={`text-sm font-medium ${isUK ? 'font-bold' : ''} text-wiah-black`}>
                          {c.country}{isUK ? ' ◀' : ''}
                        </span>
                        <span
                          className="font-mono text-sm font-bold"
                          style={{ color: isUK ? '#E63946' : colour }}
                        >
                          {c.avgGrowth2010_2023}%/yr
                        </span>
                      </div>
                      <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{
                            width: `${Math.max(pct, 2)}%`,
                            backgroundColor: isUK ? '#E63946' : colour,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">Source: ONS · IMF World Economic Outlook · 2023</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Sources */}
        <ScrollReveal>
          <div className="border-t border-wiah-border pt-8 mt-8">
            <h2 className="text-base font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
            <ul className="space-y-2 font-mono text-xs text-wiah-mid">
              <li>
                <a href="https://www.ons.gov.uk/economy/grossdomesticproductgdp/bulletins/grossdomesticproductpreliminaryestimate/latest" className="underline hover:text-wiah-black" target="_blank" rel="noopener noreferrer">
                  ONS GDP statistical bulletin
                </a>
                {' '}— UK annual GDP growth, chained volume measure
              </li>
              <li>
                <a href="https://www.imf.org/en/Publications/WEO" className="underline hover:text-wiah-black" target="_blank" rel="noopener noreferrer">
                  IMF World Economic Outlook
                </a>
                {' '}— G7 GDP growth comparison
              </li>
            </ul>
          </div>
        </ScrollReveal>
      </main>
    </>
  );
}
