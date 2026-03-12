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

interface PlanningThreatPoint {
  year: number;
  sites: number;
}

interface AreaLostPoint {
  year: number;
  hectares: number;
}

interface PlantingPoint {
  year: number;
  target: number;
  actual: number;
}

interface AncientWoodlandData {
  planningThreats: PlanningThreatPoint[];
  areaLost: AreaLostPoint[];
  plantingTargetVsActual: PlantingPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AncientWoodlandLossPage() {
  const [data, setData] = useState<AncientWoodlandData | null>(null);

  useEffect(() => {
    fetch('/data/ancient-woodland-loss/ancient_woodland_loss.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const threatsSeries: Series[] = data
    ? [{
        id: 'planning-threats',
        label: 'Sites under planning threat',
        colour: '#E63946',
        data: data.planningThreats.map(d => ({
          date: yearToDate(d.year),
          value: d.sites,
        })),
      }]
    : [];

  const areaLostSeries: Series[] = data
    ? [{
        id: 'area-lost',
        label: 'Hectares lost',
        colour: '#E63946',
        data: data.areaLost.map(d => ({
          date: yearToDate(d.year),
          value: d.hectares,
        })),
      }]
    : [];

  const plantingSeries: Series[] = data
    ? [
        {
          id: 'planting-target',
          label: 'Government target (ha)',
          colour: '#2A9D8F',
          data: data.plantingTargetVsActual.map(d => ({
            date: yearToDate(d.year),
            value: d.target,
          })),
        },
        {
          id: 'planting-actual',
          label: 'Actual new planting (ha)',
          colour: '#264653',
          data: data.plantingTargetVsActual.map(d => ({
            date: yearToDate(d.year),
            value: d.actual,
          })),
        },
      ]
    : [];

  const latestThreats = data?.planningThreats[data.planningThreats.length - 1];
  const earliestThreats = data?.planningThreats[0];
  const latestAreaLost = data?.areaLost[data.areaLost.length - 1];
  const peakAreaLost = data?.areaLost.reduce((a, b) => a.hectares > b.hectares ? a : b);
  const latestPlanting = data?.plantingTargetVsActual[data.plantingTargetVsActual.length - 1];

  const threatsChange = latestThreats && earliestThreats
    ? Math.round(((latestThreats.sites - earliestThreats.sites) / earliestThreats.sites) * 100)
    : 260;

  const plantingGapPct = latestPlanting
    ? Math.round(((latestPlanting.target - latestPlanting.actual) / latestPlanting.target) * 100)
    : 55;

  return (
    <>
      <TopicNav topic="Environment & Climate" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment & Climate"
          question="Are we losing England's ancient woodlands?"
          finding="Ancient woodland covers just 2.5% of England's land area. These irreplaceable habitats, many over 400 years old, face mounting pressure from housing development and infrastructure projects. 742 ancient woodland sites are currently under threat from planning applications, a figure that has more than tripled since 2010."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Ancient woodland is defined as land that has been continuously wooded since at least 1600 AD, though many sites are far older — some date to the last ice age, making them among the most ecologically complex habitats in the British Isles. These woodlands cannot be recreated. Unlike a plantation, which can be grown in decades, the soil biology, fungal networks, invertebrate communities, and plant assemblages of an ancient woodland take centuries to develop. The presence of bluebell carpets, a signature indicator species, signals centuries of unbroken canopy cover and undisturbed soil. When an ancient woodland is destroyed, that biological continuity is severed permanently. The Woodland Trust's Ancient Woodland Inventory identifies approximately 52,000 sites in England, covering around 340,000 hectares — just 2.5% of the country's land area. Of these, roughly half are classified as Plantations on Ancient Woodland Sites (PAWS), where the original woodland was cleared and replanted with non-native conifers but the ancient soil and seed bank remain, offering restoration potential.</p>
            <p>HS2 has become the most prominent single threat to ancient woodland in modern British history. The rail project's Phase 1 route alone affects 108 ancient woodlands between London and Birmingham. The developer's mitigation strategy — translocation, in which ancient woodland soil is excavated and moved to a new location — has been widely criticised by ecologists as scientifically unsupported. Monitoring of translocated woodland from earlier infrastructure projects shows that most fail to establish functioning ecosystems, with dramatic losses of specialist species within the first decade. The National Planning Policy Framework (NPPF) states that development resulting in the loss of ancient woodland should be refused unless there are "wholly exceptional reasons," but planning authorities have interpreted this inconsistently. Between 2010 and 2024, the Woodland Trust recorded over 1,200 planning cases threatening ancient woodland sites, and the approval rate on contested applications remains above 70%. Local authorities, under intense pressure to meet housing targets, frequently treat the NPPF's protection as a factor to weigh rather than a firm prohibition.</p>
            <p>Meanwhile, new woodland creation is falling far short of government ambitions. England's target of planting 16,500 hectares of new woodland per year by the mid-2020s remains unmet — actual planting in 2024 reached 7,420 hectares, less than half the target. Even this figure flatters the picture: the vast majority of new planting is commercial conifer or fast-growing broadleaf, not the native species mix that characterises ancient woodland. The Woodland Trust's campaign for stronger legal protection — moving from policy guidance to statutory protection equivalent to that afforded to listed buildings — has gained cross-party support but has not yet been legislated. The UK's commitment to the 30x30 target, protecting 30% of land for nature by 2030, creates a political framework in which the continued loss of ancient woodland is increasingly difficult to justify. Urban development pressure, particularly in southern England, remains the primary driver of loss. Every hectare of ancient woodland destroyed represents a habitat that predates the Industrial Revolution, the Tudor monarchy, and in many cases the Norman Conquest — and that no amount of compensatory planting can replace.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-threats', label: 'Planning threats' },
          { id: 'sec-area-lost', label: 'Area lost' },
          { id: 'sec-planting', label: 'Planting gap' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Ancient woodland remaining"
            value="2.5%"
            unit="of England"
            direction="flat"
            polarity="up-is-good"
            changeText="~340,000 hectares · unchanged since records began · irreplaceable habitat"
            sparklineData={[2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5]}
            source="Natural England · Ancient Woodland Inventory, 2024"
            href="#sec-threats"
          />
          <MetricCard
            label="Sites under planning threat"
            value={latestThreats ? latestThreats.sites.toLocaleString() : '742'}
            unit="2024"
            direction="up"
            polarity="up-is-bad"
            changeText={`+${threatsChange}% since 2010 · driven by housing and infrastructure`}
            sparklineData={
              data ? sparkFrom(data.planningThreats.map(d => d.sites)) : []
            }
            source="Woodland Trust · Planning Threats Register, 2024"
            href="#sec-area-lost"
          />
          <MetricCard
            label="Area lost annually"
            value={latestAreaLost ? latestAreaLost.hectares.toLocaleString() : '67'}
            unit="hectares · 2024"
            direction="down"
            polarity="up-is-bad"
            changeText={
              peakAreaLost
                ? `Down from ${peakAreaLost.hectares}ha peak in ${peakAreaLost.year} · still above 2010 baseline`
                : 'Down from 92ha peak in 2018 · still above 2010 baseline'
            }
            sparklineData={
              data ? sparkFrom(data.areaLost.map(d => d.hectares)) : []
            }
            source="Natural England · Ancient Woodland Inventory, 2024"
            href="#sec-planting"
          />
        </div>

        {/* Chart 1: Planning threats */}
        <ScrollReveal>
          <div id="sec-threats" className="mb-12">
            <LineChart
              series={threatsSeries}
              title="Ancient woodland sites under planning threat, England, 2010–2024"
              subtitle="Number of ancient woodland sites with active planning applications within 500m. More than tripled since 2010."
              yLabel="Sites"
              source={{
                name: 'Woodland Trust',
                dataset: 'Planning Threats Register',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Area of ancient woodland lost */}
        <ScrollReveal>
          <div id="sec-area-lost" className="mb-12">
            <LineChart
              series={areaLostSeries}
              title="Area of ancient woodland lost annually, England, 2010–2024"
              subtitle="Hectares of ancient woodland destroyed or degraded each year. Peaked during HS2 Phase 1 construction."
              yLabel="Hectares"
              source={{
                name: 'Natural England',
                dataset: 'Ancient Woodland Inventory',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Planting targets vs actual */}
        <ScrollReveal>
          <div id="sec-planting" className="mb-12">
            <LineChart
              series={plantingSeries}
              title="New woodland planting: government targets vs actual, England, 2015–2024"
              subtitle={`England consistently misses its own planting targets. In 2024, actual planting was ${plantingGapPct}% below target.`}
              yLabel="Hectares"
              source={{
                name: 'Forestry Commission',
                dataset: 'Forestry Statistics — Woodland Area and Planting',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Strengthened protection and the 30x30 commitment"
            value="30% by 2030"
            description="The UK's commitment to the Global Biodiversity Framework target of protecting 30% of land and sea for nature by 2030 creates a stronger political framework for ancient woodland protection. The 2023 revision of the National Planning Policy Framework strengthened the language around ancient woodland, making it harder for local authorities to approve damaging developments. The Woodland Trust's campaign for statutory protection — equivalent to that afforded to scheduled monuments — has gained cross-party parliamentary support. Several local authorities have adopted Ancient Woodland Protection Zones in their local plans, and Natural England has begun a comprehensive update of the Ancient Woodland Inventory to include sites under 2 hectares for the first time, which will extend formal recognition to thousands of small but ecologically vital fragments."
            source="Source: NPPF 2023 revision, DEFRA — Environmental Improvement Plan 2023, Woodland Trust — State of the UK's Woods and Trees 2024."
          />
        </ScrollReveal>

        <RelatedTopics />
      </main>
    </>
  );
}
