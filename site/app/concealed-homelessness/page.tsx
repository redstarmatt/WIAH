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

// Rough sleepers, 2015–2023 (MHCLG snapshot)
const roughSleeperValues = [3569, 4134, 4751, 4677, 4266, 2688, 2597, 3069, 3898];

// Households in temporary accommodation (thousands), 2015–2023
const tempAccValues = [72.3, 76.4, 79.0, 82.5, 88.0, 97.0, 97.1, 104.0, 112.0];

const series1: Series[] = [
  {
    id: 'rough-sleepers',
    label: 'Rough sleepers (annual snapshot)',
    colour: '#E63946',
    data: roughSleeperValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'temp-accommodation',
    label: 'Temp accommodation households (thousands)',
    colour: '#F4A261',
    data: tempAccValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

// Hidden homelessness estimate (thousands), 2015–2023
const hiddenValues = [320, 340, 360, 370, 380, 350, 360, 390, 400];

const series2: Series[] = [
  {
    id: 'hidden',
    label: 'Hidden homeless estimate (thousands)',
    colour: '#6B7280',
    data: hiddenValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'temp-acc2',
    label: 'Households in temp accommodation (thousands)',
    colour: '#F4A261',
    data: tempAccValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const annotations1: Annotation[] = [
  { date: new Date(2018, 0, 1), label: '2018: Record rough sleeping 4,751' },
  { date: new Date(2020, 2, 1), label: '2020: Everyone In — temporary fall' },
];

const annotations2: Annotation[] = [
  { date: new Date(2020, 2, 1), label: '2020: COVID — eviction ban lifts hidden pressure' },
  { date: new Date(2022, 0, 1), label: '2022: Cost-of-living crisis' },
];

export default function ConcealedHomelessnessPage() {
  return (
    <>
      <TopicNav topic="Concealed Homelessness" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Housing"
          question="How Many People Are Secretly Homeless?"
          finding="Rough sleeping counts capture only the most visible homeless — an estimated 400,000 people are sofa-surfing or in hidden homelessness, while 112,000 households are in temporary accommodation including 150,000 children."
          colour="#F4A261"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The official rough sleeping count — a single autumn night snapshot — recorded 3,898 people sleeping rough in England in 2023, a 35% rise since the pandemic low of 2020. But rough sleeping measures only the most visible fraction of homelessness. Organisations working with homeless people estimate that for every rough sleeper there are around 100 people in hidden homelessness — sofa-surfing, staying in overcrowded or unsuitable accommodation — producing an estimate of around 400,000 people. The formal figure that tracks more precisely is temporary accommodation: 112,000 households, including over 150,000 children, were in local authority temporary accommodation in 2023, a record high and a 55% rise since 2015. Families with children are increasingly placed in bed-and-breakfast accommodation that is legally meant to house them for no more than six weeks but routinely does so for months or years.</p>
            <p>The structural causes are well-documented. Social housing stock has declined by hundreds of thousands of units since Right to Buy began, and replacement construction has not come close to making up the losses. The Local Housing Allowance, which covers private rent for low-income tenants, has been repeatedly frozen in nominal terms while rents rose, creating an ever-widening gap. Housing waiting lists exceed one million households. Ending rough sleeping addresses only the most visible fraction of a homelessness system under sustained pressure that will continue without substantial expansion of social housing supply.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Rough Sleeping & Temp Accommodation' },
          { id: 'sec-chart2', label: 'Hidden Homelessness' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Hidden homeless estimate"
              value="400,000"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="100x rough sleeper count · sofa-surfers + overcrowded"
              sparklineData={[320, 340, 360, 370, 380, 350, 360, 390, 400]}
              source="Crisis — Homelessness Monitor England 2023"
              href="#sec-chart2"
            />
            <MetricCard
              label="Households in temporary accommodation"
              value="112,000"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="record high · 150,000+ children affected"
              sparklineData={[72, 76, 79, 82, 88, 97, 97, 104, 112]}
              source="MHCLG — Homelessness Statistics 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Rough sleepers"
              value="3,898"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+35% since 2020 pandemic low"
              sparklineData={[3569, 4134, 4751, 4677, 4266, 2688, 2597, 3069, 3898]}
              source="MHCLG — Rough Sleeping Snapshot 2023"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Rough sleepers and households in temporary accommodation, 2015–2023"
              subtitle="Annual rough sleeping snapshot (single autumn night, England) and households in local authority temporary accommodation (thousands). Both rising after pandemic-period falls."
              series={series1}
              annotations={annotations1}
              yLabel="Count / thousands"
              source={{ name: 'MHCLG', dataset: 'Rough Sleeping Snapshot / Homelessness Statistics', url: 'https://www.gov.uk/government/collections/homelessness-statistics', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Hidden homelessness and temporary accommodation, 2015–2023"
              subtitle="Estimated total hidden homeless (sofa-surfers, concealed households) alongside temporary accommodation caseload. Hidden homelessness is a modelled estimate with significant uncertainty."
              series={series2}
              annotations={annotations2}
              yLabel="Thousands of people/households"
              source={{ name: 'Crisis / MHCLG', dataset: 'Homelessness Monitor and Homelessness Statistics', url: 'https://crisis.org.uk/ending-homelessness/homelessness-knowledge-hub/homelessness-monitor/', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Everyone In: proof that rough sleeping can be reduced rapidly"
            value="37%"
            unit="fall in rough sleeping 2019–2021"
            description="The Everyone In programme in 2020 placed almost all rough sleepers in hotel and hostel accommodation within weeks, achieving a 37% reduction in rough sleeping between 2019 and 2021. It demonstrated that rough sleeping is not an intractable problem: with political will and emergency resources, it can be eliminated rapidly. The programme's lessons — assertive outreach, immediate accommodation, wrap-around support — provide a blueprint for sustained action rather than annual autumn counts."
            source="Source: MHCLG — Rough Sleeping Snapshot 2021. Crisis — Everyone In evaluation, 2021."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/homelessness-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">MHCLG — Rough Sleeping Snapshot in England</a> — annual autumn count. Known to undercount; estimates of actual rough sleeping populations are typically 1.5–3x the snapshot count.</p>
            <p><a href="https://www.gov.uk/government/collections/homelessness-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">MHCLG — Statutory Homelessness Statistics</a> — quarterly data on households in temporary accommodation.</p>
            <p><a href="https://crisis.org.uk/ending-homelessness/homelessness-knowledge-hub/homelessness-monitor/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Crisis — Homelessness Monitor: England</a> — annual research report including hidden homelessness estimates.</p>
            <p>Hidden homeless estimates are modelled from household surveys and carry significant uncertainty. Temporary accommodation figures are from statutory returns by local authorities and exclude households managed by housing associations or the private sector.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
