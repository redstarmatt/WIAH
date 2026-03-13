'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Homes built on green belt (thousands), 2018–2023
const homesOnGreenBeltK = [10.6, 11.2, 10.8, 12.4, 13.1, 14.9];
// Green belt area (million ha), 2013–2023
const greenBeltAreaMHa = [1.64, 1.63, 1.63, 1.62, 1.62, 1.61, 1.61, 1.60, 1.60, 1.60, 1.59];
// Green belt applications refused (%), 2019–2024
const refusalRatePct = [77, 75, 73, 71, 68, 65];
// Housing completions in green belt LAs (thousands), 2018–2023
const completionsK = [42, 45, 43, 48, 51, 55];

const homesSeries: Series[] = [
  {
    id: 'homes-green-belt',
    label: 'Homes built on green belt (thousands)',
    colour: '#E63946',
    data: homesOnGreenBeltK.map((v, i) => ({ date: new Date(2018 + i, 5, 1), value: v })),
  },
];

const areaRefusalSeries: Series[] = [
  {
    id: 'green-belt-area',
    label: 'Green belt area (million ha)',
    colour: '#2A9D8F',
    data: greenBeltAreaMHa.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v * 100 })),
  },
  {
    id: 'refusal-rate',
    label: 'Green belt applications refused (%)',
    colour: '#E63946',
    data: refusalRatePct.map((v, i) => ({ date: new Date(2019 + i, 5, 1), value: v })),
  },
];

const homesAnnotations: Annotation[] = [
  { date: new Date(2019, 5, 1), label: '2019: NPPF requires exceptional circumstances for release' },
  { date: new Date(2024, 5, 1), label: '2024: Labour grey belt policy' },
];

const areaAnnotations: Annotation[] = [
  { date: new Date(2013, 5, 1), label: '2013: 1.64M ha designated' },
  { date: new Date(2023, 5, 1), label: '2023: 1.59M ha — 130,000 ha lost over decade' },
];

export default function GreenBeltPressurePage() {
  return (
    <>
      <TopicNav topic="Housing & Planning" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Housing & Planning"
          question="Is the Green Belt Being Built On?"
          finding="14,860 homes were built on green belt land in 2023, up 40% since 2018. The total green belt area has shrunk from 1.64 to 1.59 million hectares since 2013. Labour's 'grey belt' policy targets lower-value land."
          colour="#2A9D8F"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The green belt is both a planning policy tool and a cultural flashpoint. Designated to prevent urban sprawl around major cities, it covers 12.4% of England's land area. The number of homes built on green belt land has risen 40% since 2018, driven by planning appeals and exceptional circumstances releases where local plans are out of date. Meanwhile, the total designated area has shrunk from 1.64 million hectares in 2013 to 1.59 million — a loss of 130,000 hectares over a decade, mostly through local plan boundary reviews that release land to meet housing targets. The refusal rate for green belt planning applications has fallen from 77% in 2019 to 65% in 2024, reflecting increased pressure from housing targets on local planning authorities.</p>
            <p>The relationship between green belt and housing delivery is contested. The Campaign to Protect Rural England argues that most green belt serves important environmental and recreational functions and that brownfield land could accommodate significantly more housing. Shelter, the CPRE's critics, and the Housing Studies Association argue the green belt artificially restricts housing supply in areas of highest demand, forcing house prices up and driving young people out of cities. Labour's 2024 NPPF reforms introduced grey belt — previously developed land within the green belt, and lower-quality green belt that does not fulfil the five core purposes — as a priority release zone, requiring 50% affordable housing on grey belt sites. Critics argue the definition is unclear and will generate litigation; supporters argue it allows necessary housing without touching high-quality land.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Green Belt Development' },
          { id: 'sec-chart2', label: 'Area & Refusals' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Homes built on green belt (England)"
              value="14,860"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up 40% since 2018 · driven by appeal decisions and boundary reviews"
              sparklineData={homesOnGreenBeltK.slice(-8)}
              source="MHCLG · Green Belt Statistics England 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Green belt area"
              value="1.59M ha"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="Down from 1.64M ha in 2013 · 130,000 ha lost"
              sparklineData={greenBeltAreaMHa.slice(-8).map(v => v * 100)}
              source="MHCLG · Green Belt Statistics England 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Green belt applications refused"
              value="65%"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="Down from 77% in 2019 · housing target pressure on LPAs"
              sparklineData={refusalRatePct.slice(-8)}
              source="MHCLG · Development Management Statistics 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Homes completed on green belt land, England, 2018–2023"
              subtitle="Number of homes completed on designated green belt land (thousands). Rise reflects planning appeal decisions and LPA-initiated boundary reviews to meet housing targets."
              series={homesSeries}
              annotations={homesAnnotations}
              yLabel="Homes (thousands)"
              source={{ name: 'MHCLG', dataset: 'Green Belt Statistics England', url: 'https://www.gov.uk/government/statistics/green-belt-statistics-england', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Green belt area (×100 for scale) and refusal rate, England, 2013–2024"
              subtitle="Total designated green belt area in million ha multiplied by 100 for scale (green) and percentage of applications refused (red). Both declining as housing pressure intensifies."
              series={areaRefusalSeries}
              annotations={areaAnnotations}
              yLabel="Area (Mha ×100) / Refusal rate (%)"
              source={{ name: 'MHCLG', dataset: 'Green Belt Statistics / Development Management', url: 'https://www.gov.uk/government/statistics/green-belt-statistics-england', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Labour's grey belt policy targets lower-value land with 50% affordable housing"
            value="2024"
            unit="NPPF grey belt provisions in force"
            description="Labour's National Planning Policy Framework 2024 introduces grey belt — previously developed or lower-value green belt land — as a priority release zone. Councils must identify grey belt in their local plans and give it priority over greenfield releases. New development on grey belt must include at least 50% affordable housing, significantly above the typical 25–30% requirement. The policy also reinstated mandatory housing targets, making it harder for councils to refuse development where targets are not being met. This represents the most significant reform to green belt policy since the concept's designation under the Town and Country Planning Act 1947."
            source="Source: MHCLG — National Planning Policy Framework December 2024. MHCLG — Green Belt Statistics England 2024."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/statistics/green-belt-statistics-england" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">MHCLG — Green Belt Statistics England</a> — Annual data on green belt area by local authority and homes built on green belt. Retrieved 2025.</p>
            <p><a href="https://www.gov.uk/government/statistics/planning-development-management-statistics-england" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">MHCLG — Development Management Statistics</a> — Planning application decisions by type and location. Retrieved 2025.</p>
            <p>Green belt area from local authority returns to MHCLG. Homes built on green belt from planning records cross-referenced with green belt boundary data. Refusal rate covers applications within designated green belt areas.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
