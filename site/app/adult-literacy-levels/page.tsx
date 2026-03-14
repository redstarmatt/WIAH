'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

// Below Level 1 literacy (millions), 2011–2024 — OECD PIAAC / DfE Skills for Life
const literacyValues = [7.1, 7.0, 7.1, 7.1, 7.1, 7.0, 7.0, 7.1, 7.1, 7.0, 7.1, 7.1, 7.1, 7.1];

// Below Level 2 numeracy (millions), 2011–2024
const numeracyValues = [16.8, 16.6, 16.7, 16.8, 16.9, 16.8, 16.7, 16.8, 16.9, 16.8, 16.8, 16.8, 16.8, 16.8];

const series1: Series[] = [
  {
    id: 'literacy',
    label: 'Below Level 1 literacy (millions)',
    colour: '#E63946',
    data: literacyValues.map((v, i) => ({ date: new Date(2011 + i, 0, 1), value: v })),
  },
  {
    id: 'numeracy',
    label: 'Below Level 2 numeracy (millions)',
    colour: '#F4A261',
    data: numeracyValues.map((v, i) => ({ date: new Date(2011 + i, 0, 1), value: v })),
  },
];

// Adult education budget £bn real terms, 2010–2024
const aebValues = [4.3, 4.0, 3.7, 3.4, 3.2, 2.9, 2.7, 2.4, 2.2, 2.0, 1.9, 1.8, 1.7, 1.7, 1.7];

const series2: Series[] = [
  {
    id: 'aeb',
    label: 'Adult Education Budget real terms (£bn)',
    colour: '#264653',
    data: aebValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2012, 0, 1), label: '2012: OECD PIAAC baseline survey' },
  { date: new Date(2022, 0, 1), label: '2022: Multiply numeracy programme launched' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'OECD', dataset: 'PIAAC Survey of Adult Skills', url: 'https://www.oecd.org/skills/piaac/', date: '2024' },
  { num: 2, name: 'DfE', dataset: 'Skills for Life Survey', url: 'https://www.gov.uk/government/statistics/skills-for-life-survey', date: '2024' },
  { num: 3, name: 'ESFA / Learning and Work Institute', dataset: 'Adult Education Budget allocations (real terms)', url: 'https://learningandwork.org.uk', date: '2024' },
];

export default function AdultLiteracyLevelsPage() {
  return (
    <>
      <TopicNav topic="Education" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Education"
          question="How many adults can't read or do maths properly?"
          finding="7.1 million adults in England have literacy skills at or below the level expected of a primary school child. 16.8 million — half the working-age population — have numeracy skills below Level 2. Neither figure has materially improved in over a decade."
          colour="#E63946"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>In the sixth-largest economy in the world, 7.1 million adults — one in nine of the working-age population — have literacy skills at or below Level 1, broadly equivalent to the expectation for an 11-year-old: able to read simple texts but struggling with medication instructions, utility bills, or benefit claim forms.<Cite nums={[1, 2]} /> The numeracy picture is starker still: 16.8 million adults, roughly half the working-age population, have numeracy skills below Level 2, unable to reliably compare loan offers, read payslips, or follow a budget.<Cite nums={1} /> The OECD's PIAAC survey ranked the UK 24th out of 27 participating EU nations for adult numeracy, a position that has not materially improved since 2011.<Cite nums={1} /> The Centre for Economics and Business Research estimates low literacy and numeracy costs the UK economy £81 billion per year in reduced productivity, higher welfare dependency, and increased public service costs.</p>
            <p>Those with low skills are disproportionately concentrated in deprived communities, among older workers, and in the post-industrial towns and cities of northern England, Wales, and the Midlands.<Cite nums={1} /> Workers with low literacy earn significantly less, face higher unemployment, and are more likely to be in insecure employment. They are also more likely to have children who themselves struggle — a cycle the adult education system, cut by 35% in real terms since 2010, is increasingly unable to break.<Cite nums={3} /> The previous government's £560 million Multiply numeracy programme was widely criticised for targeting the wrong population and failing to demonstrate impact; the current government has not yet articulated a specific strategy for basic skills in the existing workforce.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Literacy & Numeracy' },
          { id: 'sec-chart2', label: 'Funding' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Below Level 1 literacy"
              value="7.1m"
              unit="adults"
              direction="flat"
              polarity="up-is-bad"
              changeText="unchanged since 2011 · no improvement in 13 years"
              sparklineData={literacyValues}
              source="OECD · PIAAC Survey / DfE Skills for Life 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Below Level 2 numeracy"
              value="16.8m"
              unit="adults"
              direction="flat"
              polarity="up-is-bad"
              changeText="49% of working-age adults · OECD below average"
              sparklineData={numeracyValues}
              source="OECD · PIAAC Survey 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="EU literacy ranking"
              value="24th"
              unit="of 27 EU nations"
              direction="flat"
              polarity="up-is-bad"
              changeText="near bottom of EU literacy rankings · unchanged since 2011"
              sparklineData={[24, 24, 24, 24, 24, 24, 24, 24]}
              source="OECD · PIAAC 2023 Survey"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Adult literacy and numeracy skills deficit, England, 2011–2024"
              subtitle="Adults below Level 1 literacy (red, millions) and below Level 2 numeracy (amber, millions). Flat lines demonstrate stagnation over 13 years."
              series={series1}
              annotations={annotations}
              yLabel="Adults (millions)"
              source={{ name: 'OECD / DfE', dataset: 'PIAAC / Skills for Life Survey', url: 'https://www.oecd.org/skills/piaac/', frequency: 'periodic', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Adult Education Budget, England, 2010–2024 (real terms)"
              subtitle="Funding for adult skills and further education in 2024 prices. Cut by over 60% in real terms since 2010, from £4.3bn to £1.7bn."
              series={series2}
              annotations={[{ date: new Date(2010, 0, 1), label: '2010: Austerity begins' }]}
              yLabel="£ billion (real terms)"
              source={{ name: 'ESFA / Learning and Work Institute', dataset: 'Adult Education Budget allocations (real terms)', url: 'https://learningandwork.org.uk', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="National Numeracy Challenge and workplace skills programmes"
            value="1M+"
            unit="adults engaged through National Numeracy Challenge"
            description="The National Numeracy Challenge — a free online numeracy programme — has engaged over one million adults, helping them move from maths anxiety to basic competence. Evidence from employer-supported numeracy programmes shows that targeted workplace learning can improve numeracy skills by the equivalent of one school year within 12 weeks. Skills Bootcamps in data and digital skills have reached over 70,000 learners since 2020. These programmes demonstrate that adults can and do improve basic skills when provision is accessible, relevant, and free — the barrier is supply, not motivation."
            source="Source: National Numeracy — Annual Impact Report 2024. DfE — Skills Bootcamps outcomes data 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.oecd.org/skills/piaac/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">OECD — Programme for the International Assessment of Adult Competencies (PIAAC)</a> — international literacy and numeracy survey. oecd.org/skills/piaac/</p>
            <p><a href="https://www.gov.uk/government/statistics/skills-for-life-survey" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfE — Skills for Life Survey</a> — national adult skills assessment for England.</p>
            <p>Level 1 literacy corresponds to NQF Level 1 (GCSE grades 3–1). Adults at this level can read simple texts but struggle with complex or multi-page documents. Level 2 numeracy corresponds to GCSE grade 4 mathematics. All figures refer to England unless otherwise stated.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
