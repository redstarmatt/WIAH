'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// SSSIs in favourable or recovering condition (%), 2003–2023
const sssiFavourablePct = [58.2, 56.4, 54.8, 53.0, 52.4, 51.1, 52.6, 53.0, 53.2, 53.2, 53.4, 53.4, 53.5, 53.6, 53.6, 53.6, 53.6, 53.6, 53.6, 53.6, 53.6];
// Government 70% target line
const sssiTargetPct = Array(21).fill(70);
// Hedgerow length (thousand km), 1950–2020 (decade points mapped to years)
const hedgerowLengthK = [800, 720, 620, 530, 460, 410, 390];
// ELM scheme uptake (% farms enrolled), 2021–2024
const elmUptakePct = [1.2, 3.0, 5.5, 8.1];

const sssitSeries: Series[] = [
  {
    id: 'sssi',
    label: 'SSSIs in favourable condition (%)',
    colour: '#E63946',
    data: sssiFavourablePct.map((v, i) => ({ date: new Date(2003 + i, 6, 1), value: v })),
  },
  {
    id: 'target',
    label: 'Government 70% target',
    colour: '#2A9D8F',
    data: sssiTargetPct.map((v, i) => ({ date: new Date(2003 + i, 6, 1), value: v })),
  },
];

const hedgerowSeries: Series[] = [
  {
    id: 'hedgerow',
    label: 'Hedgerow length (thousand km)',
    colour: '#264653',
    data: hedgerowLengthK.map((v, i) => ({ date: new Date(1950 + i * 10, 6, 1), value: v })),
  },
  {
    id: 'elm',
    label: 'ELM scheme farm uptake (%)',
    colour: '#2A9D8F',
    data: elmUptakePct.map((v, i) => ({ date: new Date(2021 + i, 6, 1), value: v })),
  },
];

const sssiAnnotations: Annotation[] = [
  { date: new Date(2010, 6, 1), label: '2010: 70% target set by government' },
  { date: new Date(2021, 6, 1), label: '2021: Environment Act — halt species decline by 2030' },
];

const hedgerowAnnotations: Annotation[] = [
  { date: new Date(1950, 6, 1), label: '1950: 800,000 km of hedgerow' },
  { date: new Date(2020, 6, 1), label: '2020: 390,000 km — roughly half remaining' },
];

export default function HabitatConditionPage() {
  return (
    <>
      <TopicNav topic="Nature & Environment" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Nature & Environment"
          question="What Condition Is Britain's Protected Natural Environment In?"
          finding="Only 53.6% of England's Sites of Special Scientific Interest are in favourable condition — well below the 70% target. Lowland meadows have declined by 99.6% since 1940. Hedgerow length has roughly halved since 1950."
          colour="#2A9D8F"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England's 4,120 Sites of Special Scientific Interest cover 8% of the land area and represent the best-protected habitats in the country — yet only 53.6% are in favourable or recovering condition, well below the 70% government target, and the figure has barely moved since 2010. Lowland meadows have declined by 99.6% since 1940, from 3.7 million hectares to around 15,000 hectares, driven by fertiliser use, drainage, and conversion to intensive silage. Ancient woodland — woodland in continuous existence since 1600 — has fallen from around 2.5 million to 643,000 hectares, and cannot be recreated through new planting. Hedgerow length has roughly halved from 800,000 to around 390,000 kilometres since 1950, erasing the wildlife corridors on which species movement between fragmented habitats depends.</p>
            <p>The mechanisms of decline are well understood; the question is whether the policy response can match the scale required. The Environmental Land Management schemes (ELMs) are designed to pay farmers to restore habitats, but in 2024 only 8% of farms had joined. At current uptake, the Environment Act 2021 targets — halting species decline and 30×30 protected area coverage by 2030 — will not be met. The loss of lowland meadows is directly connected to the collapse of insect abundance documented since the 1970s, with cascading effects on pollination, bird populations, and the broader food web that no amount of SSSI management can reverse without also transforming the surrounding agricultural landscape.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'SSSI Condition' },
          { id: 'sec-chart2', label: 'Hedgerow Decline' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="SSSIs in favourable condition"
              value="53.6%"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="Target is 70% · barely moved from 52% since 2010"
              sparklineData={sssiFavourablePct.slice(-8)}
              source="Natural England · SSSI condition monitoring 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Ancient woodland remaining"
              value="643k ha"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="Down from 2.5m ha — a 74% loss · irreplaceable"
              sparklineData={[2500, 1900, 1400, 1000, 800, 700, 660, 643]}
              source="Woodland Trust · National Inventory 2023"
              href="#sec-chart2"
            />
            <MetricCard
              label="Lowland meadow remaining"
              value="15,000 ha"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="From 3.7 million ha in 1940 — 99.6% lost"
              sparklineData={[3700, 1200, 400, 100, 50, 30, 18, 15]}
              source="Wildlife Trusts / Natural England 2023"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="SSSIs in favourable or recovering condition, England, 2003–2023"
              subtitle="Percentage of total SSSI area assessed as favourable or recovering (red) against the 70% government target (green). The gap has barely closed in over a decade."
              series={sssitSeries}
              annotations={sssiAnnotations}
              yLabel="% in favourable condition"
              source={{ name: 'Natural England', dataset: 'SSSI Condition Monitoring', url: 'https://www.gov.uk/government/organisations/natural-england', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Hedgerow decline and ELM scheme uptake, England, 1950–2024"
              subtitle="Total hedgerow length in thousand km from 1950 to 2020 (blue, decadal points) against ELM scheme farm enrolment % from 2021 (green). Hedgerows halved; ELM uptake still low."
              series={hedgerowSeries}
              annotations={hedgerowAnnotations}
              yLabel="Thousand km (hedgerows) / % (ELM)"
              source={{ name: 'Natural England / DEFRA', dataset: 'Countryside Survey / ELM uptake statistics', url: 'https://www.gov.uk/government/statistical-data-sets/agricultural-land-use-in-england', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Environmental Land Management schemes creating new incentives for nature recovery"
            value="8%"
            unit="of farms enrolled in ELMs by 2024 — growing rapidly"
            description="The Environmental Land Management schemes — Sustainable Farming Incentive, Countryside Stewardship, and Landscape Recovery — are the most significant shift in agricultural policy since the 1970s. For the first time, farmers are paid for measurable nature outcomes rather than simply for land area. The Landscape Recovery scheme funds large-scale habitat restoration projects: rewilding projects in the uplands, beaver reintroductions, and reconnection of fragmented ancient woodlands. The 25 Year Environment Plan's target of 30×30 — protecting 30% of land and sea by 2030 — requires a threefold expansion of protected areas and will depend on landowner uptake of ELMs accelerating substantially from the current 8%."
            source="Source: DEFRA — ELM scheme statistics 2024. Natural England — SSSI condition monitoring 2023. Environment Act 2021 progress report."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/organisations/natural-england" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Natural England — SSSI Condition Monitoring</a> — Annual data on condition of Sites of Special Scientific Interest by land management objective. Retrieved 2025.</p>
            <p><a href="https://www.woodlandtrust.org.uk/trees-woods-and-wildlife/habitats/ancient-woodland/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Woodland Trust — National Inventory of Woodland and Trees</a> — Ancient woodland extent and condition. Retrieved 2025.</p>
            <p><a href="https://www.gov.uk/government/statistical-data-sets/agricultural-land-use-in-england" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DEFRA — Countryside Survey / Agricultural Land Use</a> — Hedgerow length and habitat condition data. Retrieved 2025.</p>
            <p>SSSI condition assessments are carried out by Natural England site managers. Favourable condition means all site objectives are met; recovering condition means on track to meet objectives. ELM uptake figures are from DEFRA administrative data. Hedgerow length from Countryside Survey conducted every decade since 1978.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
