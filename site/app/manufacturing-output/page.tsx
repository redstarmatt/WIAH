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
  { num: 1, name: 'ONS', dataset: 'Index of Production', url: 'https://www.ons.gov.uk/economy/economicoutputandproductivity/output/bulletins/indexofproduction/latestrelease', date: 'Feb 2026' },
  { num: 2, name: 'ONS', dataset: 'GDP output approach — low-level aggregates', url: 'https://www.ons.gov.uk/economy/grossdomesticproductgdp/datasets/ukgdpolowlevelaggregates', date: 'Feb 2026' },
  { num: 3, name: 'ONS', dataset: 'Workforce Jobs by Industry', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/datasets/workforcejobsbyindustryjobs02', date: 'Feb 2026' },
  { num: 4, name: 'HM Government', dataset: 'Advanced Manufacturing Plan', date: 'Oct 2024' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface OutputPoint {
  year: number;
  index: number;
}

interface GdpSharePoint {
  year: number;
  share: number;
}

interface EmploymentPoint {
  year: number;
  employment: number;
}

interface SubsectorPoint {
  subsector: string;
  indexChange2019to2025: number;
}

interface ManufacturingData {
  outputIndex: OutputPoint[];
  gdpShare: GdpSharePoint[];
  employmentThousands: EmploymentPoint[];
  bySubsector: SubsectorPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ManufacturingOutputPage() {
  const [data, setData] = useState<ManufacturingData | null>(null);

  useEffect(() => {
    fetch('/data/manufacturing-output/manufacturing_output.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const outputSeries: Series[] = data
    ? [{
        id: 'output-index',
        label: 'Manufacturing output index (2019=100)',
        colour: '#6B7280',
        data: data.outputIndex.map(d => ({
          date: yearToDate(d.year),
          value: d.index,
        })),
      }]
    : [];

  const gdpShareSeries: Series[] = data
    ? [{
        id: 'gdp-share',
        label: 'Manufacturing share of UK GDP (%)',
        colour: '#264653',
        data: data.gdpShare.map(d => ({
          date: yearToDate(d.year),
          value: d.share,
        })),
      }]
    : [];

  const employmentSeries: Series[] = data
    ? [{
        id: 'employment',
        label: 'Manufacturing employment (thousands)',
        colour: '#E63946',
        data: data.employmentThousands.map(d => ({
          date: yearToDate(d.year),
          value: d.employment,
        })),
      }]
    : [];

  const outputAnnotations: Annotation[] = [
    { date: new Date(2016, 5, 1), label: '2016: Brexit vote' },
    { date: new Date(2020, 2, 1), label: '2020: COVID shutdown' },
    { date: new Date(2022, 1, 1), label: '2022: Energy price spike' },
  ];

  const gdpAnnotations: Annotation[] = [
    { date: new Date(2010, 0, 1), label: '2010: Post-crisis recovery' },
    { date: new Date(2020, 2, 1), label: '2020: COVID distortion' },
  ];

  const employmentAnnotations: Annotation[] = [
    { date: new Date(2020, 2, 1), label: '2020: Furlough period' },
    { date: new Date(2023, 0, 1), label: '2023: Labour shortages' },
  ];

  // ── Derived metrics ──────────────────────────────────────────────────────

  const latestOutput = data?.outputIndex[data.outputIndex.length - 1];
  const peakOutput = data?.outputIndex.reduce((a, b) => a.index > b.index ? a : b);
  const latestGdp = data?.gdpShare[data.gdpShare.length - 1];
  const firstGdp = data?.gdpShare[0];
  const latestEmployment = data?.employmentThousands[data.employmentThousands.length - 1];
  const peakEmployment = data?.employmentThousands.reduce((a, b) => a.employment > b.employment ? a : b);

  const employmentDrop = latestEmployment && peakEmployment
    ? Math.round(((peakEmployment.employment - latestEmployment.employment) / peakEmployment.employment) * 100)
    : 8;

  return (
    <>
      <TopicNav topic="Manufacturing Output" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Manufacturing Output"
          question="Why Is British Manufacturing Still Below Pre-Pandemic Levels?"
          finding="UK manufacturing output remains stubbornly below its 2019 baseline. The sector's share of GDP continues a multi-decade decline, and employment has fallen to its lowest level since the pandemic — down 200,000 from its 2019 peak."
          colour="#6B7280"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              British manufacturing never fully recovered from the pandemic. The ONS Index of Production
              stood at 95.7 in late 2025, still 4.3% below its 2019 baseline and well below the 2017
              peak of 103.0.<Cite nums={1} /> This is not a story of sudden collapse but of slow erosion: the sector
              grew modestly through the mid-2010s, was knocked sideways by Brexit uncertainty from 2016
              onwards, then hit by the COVID supply-chain shock, and has since been weighed down by
              energy costs that remain roughly 40% above pre-crisis levels. UK industrial electricity
              prices are among the highest in the G7, a structural disadvantage that has pushed
              energy-intensive production — steel, glass, ceramics — offshore. The result is a sector
              that accounts for just 8.6% of GDP, down from 10.4% in 2010 and roughly 25% in the
              early 1970s.<Cite nums={2} />
            </p>
            <p>
              The picture beneath the headline is uneven. Pharmaceuticals output has grown 8.3% since
              2019, driven by vaccine production and the UK's strong life-sciences base. Aerospace and
              defence manufacturing is up 5.6%, buoyed by export orders and government procurement.
              But motor vehicle production has fallen 14.2% since 2019<Cite nums={1} />, hit by the global shift to
              electric vehicles — a transition in which UK gigafactory investment has lagged behind
              continental Europe. Textiles and clothing manufacturing has contracted 18.4%, a
              continuation of decades-long offshoring. The employment figures tell a parallel story:
              2.42 million people worked in manufacturing in 2025, down from 2.62 million in 2019.<Cite nums={3} />
              Many of these are skilled jobs in regions where alternatives are scarce — the West
              Midlands, North East, and South Wales are disproportionately affected.
            </p>
            <p>
              There are reasons for cautious optimism. The government's Advanced Manufacturing Plan,
              announced in late 2024, channels investment into clean energy supply chains, battery
              production, and semiconductor fabrication.<Cite nums={4} /> The UK retains genuine strengths in high-value
              manufacturing — jet engines, pharmaceuticals, specialty chemicals — where output per
              worker is among the highest in Europe. The question is whether targeted industrial
              policy can arrest a structural decline that has been running for half a century, and
              whether the UK can position itself competitively in the manufacturing sectors that will
              matter most over the next two decades: batteries, hydrogen electrolysers, heat pumps,
              and advanced materials.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-output', label: 'Output index' },
          { id: 'sec-gdp', label: 'GDP share' },
          { id: 'sec-employment', label: 'Employment' },
          { id: 'sec-subsectors', label: 'Subsectors' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Manufacturing output index (2019=100)"
            value={latestOutput ? latestOutput.index.toFixed(1) : '95.7'}
            unit="2025"
            direction="down"
            polarity="up-is-good"
            changeText={
              latestOutput && peakOutput
                ? `${((peakOutput.index - latestOutput.index) / peakOutput.index * 100).toFixed(0)}% below ${peakOutput.year} peak of ${peakOutput.index}`
                : 'below pre-pandemic level'
            }
            sparklineData={
              data ? sparkFrom(data.outputIndex.map(d => d.index)) : [103,101,100,88,93,95,96.2,95.7]
            }
            source="ONS — Index of Production, 2025"
            href="#sec-output"
          />
          <MetricCard
            label="Manufacturing share of UK GDP"
            value={latestGdp ? `${latestGdp.share}%` : '8.6%'}
            unit="2025"
            direction="down"
            polarity="up-is-good"
            changeText={
              latestGdp && firstGdp
                ? `Down from ${firstGdp.share}% in ${firstGdp.year} · long-run deindustrialisation`
                : 'down from 10.4% in 2010'
            }
            sparklineData={
              data ? sparkFrom(data.gdpShare.map(d => d.share)) : [10.4,10,9.5,9.2,9,8.9,8.8,8.6]
            }
            source="ONS — GDP output approach, 2025"
            href="#sec-gdp"
          />
          <MetricCard
            label="Manufacturing employment"
            value={latestEmployment ? latestEmployment.employment.toLocaleString() + 'k' : '2,420k'}
            unit="2025"
            direction="down"
            polarity="up-is-bad"
            changeText={
              latestEmployment && peakEmployment
                ? `Down ${employmentDrop}% · ${(peakEmployment.employment - latestEmployment.employment).toLocaleString()}k jobs lost since ${peakEmployment.year}`
                : 'down 200k from 2019 peak'
            }
            sparklineData={
              data ? sparkFrom(data.employmentThousands.map(d => d.employment)) : [2620,2430,2480,2530,2490,2460,2420]
            }
            source="ONS — Workforce Jobs by Industry, 2025"
            href="#sec-employment"
          />
        </div>

        {/* Chart 1: Output index */}
        <ScrollReveal>
          <div id="sec-output" className="mb-12">
            <LineChart
              series={outputSeries}
              annotations={outputAnnotations}
              title="UK manufacturing output index, 2010–2025 (2019=100)"
              subtitle="Index of Production for manufacturing. Peaked in 2017, never recovered from pandemic."
              yLabel="Index (2019 = 100)"
              source={{
                name: 'ONS',
                dataset: 'Index of Production',
                frequency: 'monthly',
                url: 'https://www.ons.gov.uk/economy/economicoutputandproductivity/output/bulletins/indexofproduction/latestrelease',
                date: 'Feb 2026',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: GDP share */}
        <ScrollReveal>
          <div id="sec-gdp" className="mb-12">
            <LineChart
              series={gdpShareSeries}
              annotations={gdpAnnotations}
              title="Manufacturing as a share of UK GDP, 2010–2025"
              subtitle="Gross value added in manufacturing as percentage of total GDP. Steady structural decline."
              yLabel="Share of GDP (%)"
              source={{
                name: 'ONS',
                dataset: 'GDP output approach — low-level aggregates',
                frequency: 'quarterly',
                url: 'https://www.ons.gov.uk/economy/grossdomesticproductgdp/datasets/ukgdpolowlevelaggregates',
                date: 'Feb 2026',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Employment */}
        <ScrollReveal>
          <div id="sec-employment" className="mb-12">
            <LineChart
              series={employmentSeries}
              annotations={employmentAnnotations}
              title="UK manufacturing employment, 2010–2025 (thousands)"
              subtitle="Workforce jobs in manufacturing. Pandemic losses never fully reversed."
              yLabel="Employment (thousands)"
              source={{
                name: 'ONS',
                dataset: 'Workforce Jobs by Industry',
                frequency: 'quarterly',
                url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/datasets/workforcejobsbyindustryjobs02',
                date: 'Feb 2026',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Subsector breakdown */}
        <ScrollReveal>
          <div id="sec-subsectors" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Manufacturing output change by subsector, 2019–2025
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                Percentage change in output index since 2019. Pharmaceuticals and aerospace growing; motor vehicles and textiles contracting sharply.
              </p>
              <div className="mt-6 space-y-4">
                {(data?.bySubsector ?? [])
                  .sort((a, b) => b.indexChange2019to2025 - a.indexChange2019to2025)
                  .map((s) => {
                    const isPositive = s.indexChange2019to2025 >= 0;
                    const barColour = isPositive ? '#2A9D8F' : '#E63946';
                    const maxAbs = 20;
                    const pct = (Math.abs(s.indexChange2019to2025) / maxAbs) * 50;
                    return (
                      <div key={s.subsector}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-wiah-black">{s.subsector}</span>
                          <span
                            className="font-mono text-sm font-bold"
                            style={{ color: barColour }}
                          >
                            {isPositive ? '+' : ''}{s.indexChange2019to2025.toFixed(1)}%
                          </span>
                        </div>
                        <div className="h-5 bg-wiah-light rounded-sm overflow-hidden relative">
                          <div
                            className="h-full rounded-sm absolute transition-all"
                            style={{
                              width: `${pct}%`,
                              backgroundColor: barColour,
                              left: isPositive ? '50%' : `${50 - pct}%`,
                            }}
                          />
                          <div
                            className="absolute top-0 bottom-0 w-px bg-wiah-mid"
                            style={{ left: '50%' }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">
                Source: ONS — Index of Production, disaggregated subsector indices, Feb 2026
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="High-value manufacturing remains a UK strength"
            value="+8.3%"
            unit="pharma output since 2019"
            description="While aggregate manufacturing has declined, the UK retains genuine competitive advantages in high-value subsectors. Pharmaceutical output has grown 8.3% since 2019, supported by COVID-era vaccine investment and a strong life-sciences ecosystem. Aerospace and defence manufacturing is up 5.6%, with Rolls-Royce, BAE Systems, and Airbus UK all expanding capacity. The government's Advanced Manufacturing Plan, announced in late 2024, targets clean energy supply chains — batteries, heat pumps, and hydrogen electrolysers — where the UK aims to build domestic production capacity rather than rely on imports. These sectors alone will not replace the broader employment losses, but they represent a credible path toward higher-productivity manufacturing."
            source="Source: ONS — Index of Production, subsector indices, Feb 2026. HM Government — Advanced Manufacturing Plan, Oct 2024."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <RelatedTopics />

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p>
              <a href="https://www.ons.gov.uk/economy/economicoutputandproductivity/output/bulletins/indexofproduction/latestrelease" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Index of Production</a> — manufacturing output index data, monthly. Retrieved Feb 2026.
            </p>
            <p>
              <a href="https://www.ons.gov.uk/economy/grossdomesticproductgdp/datasets/ukgdpolowlevelaggregates" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — GDP output approach</a> — manufacturing share of GDP, quarterly. Retrieved Feb 2026.
            </p>
            <p>
              <a href="https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/datasets/workforcejobsbyindustryjobs02" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Workforce Jobs by Industry</a> — manufacturing employment data, quarterly. Retrieved Feb 2026.
            </p>
            <p>All figures are for the United Kingdom. Output index is rebased to 2019=100. Employment figures are workforce jobs, not headcount. Subsector changes calculated from ONS disaggregated Index of Production series.</p>
          </div>
        </section>
      </main>
    </>
  );
}
