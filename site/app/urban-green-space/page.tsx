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

interface GreenSpacePoint {
  year: number;
  pct: number;
}

interface ParksBudgetPoint {
  year: number;
  realTermsChangePct: number;
}

interface TreeCanopyPoint {
  year: number;
  pct: number;
}

interface RegionData {
  region: string;
  greenSpacePct: number;
  canopyPct: number;
}

interface UrbanGreenSpaceData {
  greenSpaceAccess: GreenSpacePoint[];
  parksBudget: ParksBudgetPoint[];
  treeCanopyCover: TreeCanopyPoint[];
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

export default function UrbanGreenSpacePage() {
  const [data, setData] = useState<UrbanGreenSpaceData | null>(null);

  useEffect(() => {
    fetch('/data/urban-green-space/urban_green_space.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const greenSpaceSeries: Series[] = data
    ? [{
        id: 'green-space-access',
        label: 'Urban areas meeting WHO guideline (%)',
        colour: '#2A9D8F',
        data: data.greenSpaceAccess.map(d => ({
          date: yearToDate(d.year),
          value: d.pct,
        })),
      }]
    : [];

  const budgetSeries: Series[] = data
    ? [{
        id: 'parks-budget',
        label: 'Real-terms change since 2010 (%)',
        colour: '#E63946',
        data: data.parksBudget.map(d => ({
          date: yearToDate(d.year),
          value: d.realTermsChangePct,
        })),
      }]
    : [];

  const canopySeries: Series[] = data
    ? [{
        id: 'tree-canopy',
        label: 'Urban tree canopy cover (%)',
        colour: '#264653',
        data: data.treeCanopyCover.map(d => ({
          date: yearToDate(d.year),
          value: d.pct,
        })),
      }]
    : [];

  const greenSpaceAnnotations: Annotation[] = [
    { date: new Date(2012, 0, 1), label: "2012: National Planning Policy Framework published" },
    { date: new Date(2020, 0, 1), label: "2020: COVID lockdowns highlight park dependency" },
  ];

  const budgetAnnotations: Annotation[] = [
    { date: new Date(2010, 6, 1), label: "2010: Austerity begins" },
    { date: new Date(2021, 0, 1), label: "2021: Environment Act passed" },
  ];

  const canopyAnnotations: Annotation[] = [
    { date: new Date(2018, 0, 1), label: "2018: 25 Year Environment Plan" },
    { date: new Date(2023, 0, 1), label: "2023: Tree planting targets missed again" },
  ];

  const latestAccess = data?.greenSpaceAccess[data.greenSpaceAccess.length - 1];
  const earliestAccess = data?.greenSpaceAccess[0];
  const latestBudget = data?.parksBudget[data.parksBudget.length - 1];
  const latestCanopy = data?.treeCanopyCover[data.treeCanopyCover.length - 1];
  const earliestCanopy = data?.treeCanopyCover[0];

  const accessDrop = earliestAccess && latestAccess
    ? (earliestAccess.pct - latestAccess.pct).toFixed(1)
    : '7.3';

  const canopyDrop = earliestCanopy && latestCanopy
    ? (earliestCanopy.pct - latestCanopy.pct).toFixed(1)
    : '2.1';

  return (
    <>
      <TopicNav topic="Urban Green Space" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Urban Green Space"
          question="Are British Cities Running Out of Green Space?"
          finding="Only 44.8% of urban areas in England meet the WHO guideline of one hectare of accessible green space within 300 metres, down from 52.1% in 2010. Council parks budgets have been cut 42% in real terms since austerity began, and urban tree canopy cover has fallen to 14.7%."
          colour="#2A9D8F"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The numbers describe a slow, quiet loss. Since 2010, the proportion of urban areas in England meeting the World Health Organization guideline for accessible green space has fallen by more than seven percentage points. That guideline is modest: at least one hectare of public green space within 300 metres of every home. A decade and a half ago, roughly half of urban England met it. Now fewer than 45% do. The decline is driven by three forces acting simultaneously: development pressure converting parks, allotments and playing fields into housing; sustained cuts to council parks budgets that have left maintenance, ranger services and community gardening programmes gutted; and a planning system that has consistently failed to require meaningful green space provision in new developments.</p>
            <p>The health case for urban green space is not speculative. A substantial body of evidence links access to parks and green areas with reduced rates of depression, cardiovascular disease, and childhood obesity. Green spaces moderate urban heat island effects, which are responsible for hundreds of excess deaths during summer heatwaves. Natural play environments support child development. And the benefits are not distributed equally. Communities in the most deprived 20% of neighbourhoods have access to 40% less green space per person than those in the least deprived 20%, and are least likely to have private gardens. When public parks are degraded or lost, the burden falls hardest on those with fewest alternatives.</p>
            <p>Urban tree canopy cover tells a related but distinct story. England currently manages around 14.7% urban canopy coverage, down from 16.8% in 2010. The government committed to planting 30,000 hectares of new woodland per year by 2025, but annual planting has never exceeded a third of that target. Ash dieback, now present across the entire country, is expected to kill 80% of the United Kingdom"s ash trees over the coming decades, further reducing urban canopy. The Environment Act 2021 introduced biodiversity net gain requirements for new developments, and some councils have adopted ambitious urban greening strategies. But without a statutory duty to maintain public parks at a minimum standard, the overall trajectory remains one of managed decline.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-access', label: 'Green space access' },
          { id: 'sec-budget', label: 'Parks funding' },
          { id: 'sec-canopy', label: 'Tree canopy' },
          { id: 'sec-regional', label: 'Regional' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Urban areas meeting WHO green space guideline"
            value={latestAccess ? `${latestAccess.pct}%` : '44.8%'}
            unit="2024"
            direction="down"
            polarity="down-is-bad"
            changeText={`down ${accessDrop} pp since 2010 · development pressure on parks`}
            sparklineData={
              data ? sparkFrom(data.greenSpaceAccess.map(d => d.pct)) : []
            }
            source="Natural England / MHCLG, 2024"
            href="#sec-access"
          />
          <MetricCard
            label="Public parks budget change since 2010"
            value={latestBudget ? `${latestBudget.realTermsChangePct}%` : '-42%'}
            unit="real terms, 2024"
            direction="down"
            polarity="up-is-bad"
            changeText="park rangers and maintenance hit hardest"
            sparklineData={
              data ? sparkFrom(data.parksBudget.map(d => d.realTermsChangePct)) : []
            }
            source="MHCLG Local Authority Revenue Expenditure, 2024"
            href="#sec-budget"
          />
          <MetricCard
            label="Urban tree canopy cover"
            value={latestCanopy ? `${latestCanopy.pct}%` : '14.7%'}
            unit="2024"
            direction="down"
            polarity="down-is-bad"
            changeText={`down ${canopyDrop} pp since 2010 · planting targets missed`}
            sparklineData={
              data ? sparkFrom(data.treeCanopyCover.map(d => d.pct)) : []
            }
            source="Forest Research / Forestry Commission, 2024"
            href="#sec-canopy"
          />
        </div>

        {/* Chart 1: Green space access */}
        <ScrollReveal>
          <div id="sec-access" className="mb-12">
            <LineChart
              series={greenSpaceSeries}
              annotations={greenSpaceAnnotations}
              title="Urban areas meeting WHO green space guideline, England, 2010-2024"
              subtitle="Percentage of urban areas with at least 1 hectare of accessible public green space within 300 metres."
              yLabel="% meeting guideline"
              source={{
                name: 'Natural England / MHCLG',
                dataset: 'Green Infrastructure Standards',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/green-infrastructure-standards',
                date: '2024',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Parks budget cuts */}
        <ScrollReveal>
          <div id="sec-budget" className="mb-12">
            <LineChart
              series={budgetSeries}
              annotations={budgetAnnotations}
              title="Council parks budget change since 2010, England (real terms)"
              subtitle="Cumulative real-terms change in local authority spending on open spaces and parks services."
              yLabel="% change since 2010"
              source={{
                name: 'MHCLG',
                dataset: 'Local Authority Revenue Expenditure and Financing',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/collections/local-authority-revenue-expenditure-and-financing',
                date: '2024',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Tree canopy cover */}
        <ScrollReveal>
          <div id="sec-canopy" className="mb-12">
            <LineChart
              series={canopySeries}
              annotations={canopyAnnotations}
              title="Urban tree canopy cover, England, 2010-2024"
              subtitle="Percentage of urban land area covered by tree canopy. Ash dieback accelerating losses since 2019."
              yLabel="% canopy cover"
              source={{
                name: 'Forest Research / Forestry Commission',
                dataset: 'National Forest Inventory',
                frequency: 'annual',
                url: 'https://www.forestresearch.gov.uk/tools-and-resources/national-forest-inventory/',
                date: '2024',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Regional variation */}
        <ScrollReveal>
          <div id="sec-regional" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Green space access by urban area (% meeting WHO guideline)
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                Major urban areas ranked by proportion of neighbourhoods with adequate green space provision.
              </p>
              <div className="mt-6 space-y-4">
                {data?.byRegion
                  .sort((a, b) => b.greenSpacePct - a.greenSpacePct)
                  .map((r) => {
                    const pct = (r.greenSpacePct / 55) * 100;
                    return (
                      <div key={r.region}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-wiah-black">{r.region}</span>
                          <span className="font-mono text-sm font-bold text-wiah-black">{r.greenSpacePct}%</span>
                        </div>
                        <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                          <div
                            className="h-full rounded-sm transition-all"
                            style={{ width: `${pct}%`, backgroundColor: r.greenSpacePct >= 45 ? '#2A9D8F' : '#E63946' }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">Source: Natural England / MHCLG — Green Infrastructure Standards, 2024</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Biodiversity net gain now mandatory for new developments"
            value="10% minimum"
            description="Since February 2024, all new developments in England must deliver at least 10% biodiversity net gain under the Environment Act 2021. This requires developers to leave habitats in a measurably better state than before construction, maintained for at least 30 years. Early evidence from local planning authorities suggests the requirement is driving integration of green infrastructure into urban schemes, including pocket parks, green roofs, and sustainable drainage. Several councils — including Sheffield, Bristol, and Manchester — have adopted urban greening factor policies that go further, requiring a minimum ratio of green surface area in all major developments."
            source="Source: DEFRA — Biodiversity Net Gain guidance, 2024. Town and Country Planning Association — Green Infrastructure Survey, 2024."
          />
        </ScrollReveal>

        <RelatedTopics />
      </main>
    </>
  );
}
