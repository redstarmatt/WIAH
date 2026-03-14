'use client';

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

// Ancient woodland sites under planning threat, England, 2010–2024 — Woodland Trust
const planningThreatsValues = [206, 248, 290, 340, 390, 442, 498, 560, 620, 680, 710, 730, 728, 738, 742];

// Area of ancient woodland lost (hectares), 2010–2024 — Natural England
const areaLostValues = [42, 48, 52, 58, 64, 71, 78, 88, 92, 85, 74, 70, 68, 67, 67];

// New woodland planting — target vs actual (hectares), 2015–2024 — Forestry Commission
const plantingTargetValues = [5000, 7000, 9000, 11000, 13000, 15000, 16000, 16500, 16500, 16500];
const plantingActualValues = [4200, 5100, 5800, 6400, 6900, 7100, 7200, 7350, 7400, 7420];

const series1: Series[] = [
  {
    id: 'planning-threats',
    label: 'Sites under planning threat',
    colour: '#E63946',
    data: planningThreatsValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'planting-target',
    label: 'Government planting target (ha)',
    colour: '#2A9D8F',
    data: plantingTargetValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'planting-actual',
    label: 'Actual new planting (ha)',
    colour: '#264653',
    data: plantingActualValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2017, 0, 1), label: '2017: HS2 Phase 1 construction begins' },
  { date: new Date(2023, 0, 1), label: '2023: Revised NPPF strengthens ancient woodland protection' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'Woodland Trust', dataset: 'Planning Threats Register', url: 'https://www.woodlandtrust.org.uk/protecting-trees-and-woods/campaign-with-us/ancient-woodland-protection/', date: '2024' },
  { num: 2, name: 'Natural England', dataset: 'Ancient Woodland Inventory', url: 'https://www.gov.uk/government/organisations/natural-england/about/statistics', date: '2024' },
  { num: 3, name: 'Forestry Commission', dataset: 'Forestry Statistics — Woodland Area and Planting', url: 'https://www.forestresearch.gov.uk/tools-and-resources/statistics/forestry-statistics/', date: '2024' },
];

export default function AncientWoodlandLossPage() {
  return (
    <>
      <TopicNav topic="Environment & Climate" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment & Climate"
          question="Are we losing England's ancient woodlands?"
          finding="742 ancient woodland sites are currently under planning threat — a figure that has more than tripled since 2010. Ancient woodland covers just 2.5% of England and cannot be recreated: these habitats, many over 400 years old, are being destroyed by housing development and infrastructure projects faster than they can be protected."
          colour="#2A9D8F"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Ancient woodland is defined as land that has been continuously wooded since at least 1600 AD, though many sites are far older — some date to the last ice age, making them among the most ecologically complex habitats in Britain. These woodlands cannot be recreated. Unlike a plantation, which can be grown in decades, the soil biology, fungal networks, invertebrate communities, and plant assemblages of an ancient woodland take centuries to develop. When an ancient woodland is destroyed, that biological continuity is severed permanently. The Woodland Trust's Ancient Woodland Inventory identifies approximately 52,000 sites in England, covering around 340,000 hectares — just 2.5% of the country's land area.<Cite nums={2} /> HS2 alone affects 108 ancient woodlands along its Phase 1 route. The developer's mitigation strategy — translocation of ancient woodland soil — has been widely criticised by ecologists as scientifically unsupported; monitoring of translocated material shows most fails to establish functioning ecosystems within the first decade.</p>
            <p>Meanwhile, new woodland creation is falling far short of government ambitions. England's target of planting 16,500 hectares of new woodland per year remains unmet — actual planting in 2024 reached 7,420 hectares, less than half the target.<Cite nums={3} /> Even this figure flatters the picture: the vast majority of new planting is commercial conifer or fast-growing broadleaf, not the native species mix that characterises ancient woodland. The National Planning Policy Framework states that development resulting in the loss of ancient woodland should be refused unless there are "wholly exceptional reasons," but planning authorities have interpreted this inconsistently. Between 2010 and 2024, the Woodland Trust recorded over 1,200 planning cases threatening ancient woodland sites, and the approval rate on contested applications remains above 70%.<Cite nums={1} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Planning threats' },
          { id: 'sec-chart2', label: 'Planting gap' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Ancient woodland remaining"
              value="2.5%"
              unit="of England's land"
              direction="flat"
              polarity="up-is-good"
              changeText="~340,000 ha · irreplaceable · cannot be recreated once lost"
              sparklineData={[2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5]}
              source="Natural England — Ancient Woodland Inventory 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Sites under planning threat"
              value="742"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="+260% since 2010 · housing and infrastructure the primary drivers"
              sparklineData={planningThreatsValues.slice(-8)}
              source="Woodland Trust — Planning Threats Register 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="New woodland planting vs target"
              value="45%"
              unit="of target achieved · 2024"
              direction="down"
              polarity="up-is-good"
              changeText="7,420 ha planted · 16,500 ha target · gap persists since 2015"
              sparklineData={plantingActualValues}
              source="Forestry Commission — Forestry Statistics 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Ancient woodland sites under planning threat, England, 2010–2024"
              subtitle="Number of ancient woodland sites with active planning applications within 500m. More than tripled since 2010, driven by housing development and infrastructure projects including HS2."
              series={series1}
              annotations={annotations}
              yLabel="Sites"
              source={{ name: 'Woodland Trust', dataset: 'Planning Threats Register', url: 'https://www.woodlandtrust.org.uk/protecting-trees-and-woods/campaign-with-us/ancient-woodland-protection/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="New woodland planting: government target vs actual, England, 2015–2024"
              subtitle="England consistently misses its own planting targets. In 2024, actual planting was 55% below the 16,500 ha target. New planting cannot replace lost ancient woodland, but is critical for nature recovery."
              series={series2}
              annotations={[{ date: new Date(2020, 0, 1), label: '2020: England Trees Action Plan published' }]}
              yLabel="Hectares"
              source={{ name: 'Forestry Commission', dataset: 'Forestry Statistics — Woodland Area and Planting', url: 'https://www.forestresearch.gov.uk/tools-and-resources/statistics/forestry-statistics/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Strengthened planning protection and 30x30 commitment"
            value="30% by 2030"
            unit="UK land protected for nature under the Global Biodiversity Framework target"
            description="The 2023 revision of the National Planning Policy Framework strengthened language around ancient woodland, making it harder for local authorities to approve damaging developments. The Woodland Trust's campaign for statutory protection — equivalent to that afforded to scheduled monuments — has gained cross-party parliamentary support. Several local authorities have adopted Ancient Woodland Protection Zones in their local plans. Natural England has begun a comprehensive update of the Ancient Woodland Inventory to include sites under 2 hectares for the first time, extending formal recognition to thousands of small but ecologically vital fragments. The UK's 30x30 commitment creates a political framework in which continued ancient woodland loss is increasingly difficult to justify."
            source="Source: NPPF 2023 revision. DEFRA — Environmental Improvement Plan 2023. Woodland Trust — State of the UK's Woods and Trees 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.woodlandtrust.org.uk/protecting-trees-and-woods/campaign-with-us/ancient-woodland-protection/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Woodland Trust — Planning Threats Register</a> — annual tracking of planning applications within 500m of ancient woodland sites registered in the Ancient Woodland Inventory.</p>
            <p><a href="https://www.forestresearch.gov.uk/tools-and-resources/statistics/forestry-statistics/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Forestry Commission — Forestry Statistics</a> — annual publication covering woodland area, new planting, and restocking in England, Scotland, and Wales.</p>
            <p>Ancient woodland is defined as land continuously wooded since 1600 AD per the Natural England Ancient Woodland Inventory. Area lost figures reflect confirmed irreversible losses; degradation of PAWS sites is tracked separately. New planting figures include all new woodland creation through government grant schemes; restocking of existing woodland is excluded.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
