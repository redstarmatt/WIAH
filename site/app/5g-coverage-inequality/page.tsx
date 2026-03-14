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

// UK 5G population coverage (%), 2019–2025 — Ofcom Connected Nations
const populationCoverageValues = [1, 8, 21, 36, 44, 50, 57];

// Urban vs rural 5G coverage (%), 2020–2025
const urbanValues = [15, 34, 52, 62, 68, 73];
const ruralValues = [1, 3, 6, 9, 11, 14];

// Gigabit broadband premises (%), 2019–2025
const gigabitValues = [8, 18, 37, 55, 68, 76, 82];

const series1: Series[] = [
  {
    id: '5g-urban',
    label: 'Urban 5G coverage (%)',
    colour: '#264653',
    data: urbanValues.map((v, i) => ({ date: new Date(2020 + i, 0, 1), value: v })),
  },
  {
    id: '5g-rural',
    label: 'Rural 5G coverage (%)',
    colour: '#E63946',
    data: ruralValues.map((v, i) => ({ date: new Date(2020 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: '5g-population',
    label: 'UK population 5G coverage (%)',
    colour: '#264653',
    data: populationCoverageValues.map((v, i) => ({ date: new Date(2019 + i, 0, 1), value: v })),
  },
  {
    id: 'gigabit',
    label: 'Gigabit broadband premises (%)',
    colour: '#2A9D8F',
    data: gigabitValues.map((v, i) => ({ date: new Date(2019 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2019, 0, 1), label: '2019: Commercial 5G launch' },
  { date: new Date(2022, 0, 1), label: '2022: Shared Rural Network begins' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'Ofcom', dataset: 'Connected Nations Report', url: 'https://www.ofcom.org.uk/research-and-data/telecoms-research/connected-nations', date: '2025' },
  { num: 2, name: 'DSIT', dataset: 'UK Gigabit Programme Statistics', url: 'https://www.gov.uk/guidance/project-gigabit-programme', date: '2025' },
  { num: 3, name: 'DSIT', dataset: 'Shared Rural Network Progress Report', url: 'https://www.gov.uk/government/organisations/department-for-science-innovation-and-technology/about/statistics', date: '2025' },
];

export default function FiveGCoverageInequalityPage() {
  return (
    <>
      <TopicNav topic="Infrastructure & Services" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Infrastructure & Services"
          question="Who actually has 5G?"
          finding="Half the UK population now has 5G coverage, but in rural areas the figure is just 14%. The urban-rural gap has widened every year since commercial 5G launched in 2019, and the UK lags well behind international leaders like South Korea at 95%."
          colour="#264653"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK's 5G rollout has reached a headline figure of around 57% population coverage, but that number conceals a deepening geographic divide.<Cite nums={1} /> Coverage is overwhelmingly concentrated in urban centres, where all four major operators now provide service across most of central London, Manchester, Birmingham, and other large cities. Step outside these areas and the picture changes sharply. Rural 5G coverage stands at just 14%, compared with 73% in urban areas — a 59 percentage-point gap that has grown wider each year since commercial 5G launched in 2019.<Cite nums={1} /> This is not simply a matter of inconvenience: 5G-dependent applications in precision agriculture, remote healthcare, and industrial automation are being trialled in urban testbeds while the communities that could benefit most remain on 4G or patchy 3G.</p>
            <p>Several structural factors drive this inequality. Spectrum allocation decisions have favoured high-frequency bands that deliver fast speeds but have limited range — ideal for dense urban areas, less so for scattered rural settlements.<Cite nums={1} /> The economics of mast deployment are unfavourable in low-density areas, and planning objections have slowed rollout. The Shared Rural Network, a joint initiative between government and the four operators to extend 4G coverage to 95% of the UK landmass, has made genuine progress — but it addresses 4G, not 5G.<Cite nums={3} /> By contrast, fixed gigabit broadband has expanded rapidly, reaching 82% of premises in 2025, driven by full-fibre rollout.<Cite nums={2} /> The gap between wireless and fixed connectivity haves and have-nots maps almost perfectly onto the UK's existing economic geography.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Rural vs Urban' },
          { id: 'sec-chart2', label: 'Gigabit' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="UK population 5G coverage"
              value="57%"
              unit="2025"
              direction="up"
              polarity="up-is-good"
              changeText="+7pp since last year · up from 0% in 2019"
              sparklineData={populationCoverageValues}
              source="Ofcom · Connected Nations Report 2025"
              href="#sec-chart1"
            />
            <MetricCard
              label="Rural 5G coverage"
              value="14%"
              unit="2025"
              direction="up"
              polarity="up-is-good"
              changeText="vs 73% urban · 59pp gap · widening each year"
              sparklineData={ruralValues}
              source="Ofcom · Connected Nations Report 2025"
              href="#sec-chart1"
            />
            <MetricCard
              label="Premises with gigabit broadband"
              value="82%"
              unit="2025"
              direction="up"
              polarity="up-is-good"
              changeText="+6pp since last year · up from 8% in 2019"
              sparklineData={gigabitValues}
              source="DSIT · UK Gigabit Programme 2025"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="5G coverage: rural vs urban areas, UK, 2020–2025"
              subtitle="Percentage of premises with 5G signal from at least one operator. The urban-rural gap has grown wider every year since 5G launched."
              series={series1}
              annotations={[]}
              yLabel="Coverage (%)"
              source={{ name: 'Ofcom', dataset: 'Connected Nations Report — Rural Coverage Analysis', url: 'https://www.ofcom.org.uk/research-and-data/telecoms-research/connected-nations', frequency: 'annual', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="5G population coverage and gigabit broadband rollout, UK, 2019–2025"
              subtitle="Population 5G coverage (blue) vs premises with gigabit-capable fixed broadband (green). Fixed broadband has expanded far faster than wireless."
              series={series2}
              annotations={annotations}
              yLabel="Coverage / Premises (%)"
              source={{ name: 'Ofcom / DSIT', dataset: 'Connected Nations Report; UK Gigabit Programme Statistics', url: 'https://www.ofcom.org.uk/research-and-data/telecoms-research/connected-nations', frequency: 'annual', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Shared Rural Network and rural 5G testbeds driving progress"
            value="95% 4G target"
            unit="UK landmass coverage goal"
            description="The Shared Rural Network, backed by £500 million in government funding and £532 million from operators, is extending 4G geographic coverage to 95% of the UK landmass — closing not-spots that have persisted for over a decade. While it addresses 4G rather than 5G, it builds the backhaul and site infrastructure that makes future rural 5G commercially viable. DSIT-funded 5G testbeds in rural areas — including projects in precision agriculture in the Welsh Valleys and remote veterinary diagnostics in the Scottish Highlands — have shown measurable productivity gains, demonstrating that 5G is not just an urban technology."
            source="Source: DSIT — Shared Rural Network Progress Report 2025. Ofcom — Connected Nations 2025."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.ofcom.org.uk/research-and-data/telecoms-research/connected-nations" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Ofcom — Connected Nations Report</a> — annual publication on UK fixed and mobile network coverage by geography.</p>
            <p><a href="https://www.gov.uk/guidance/project-gigabit-programme" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DSIT — UK Gigabit Programme Statistics</a> — quarterly data on gigabit-capable broadband premises rollout.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
