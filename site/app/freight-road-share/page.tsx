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

const editorialRefs: Reference[] = [
  { num: 1, name: 'DfT', dataset: 'Transport Statistics Great Britain', url: 'https://www.gov.uk/government/statistics/transport-statistics-great-britain-2024', date: '2024' },
  { num: 2, name: 'ORR', dataset: 'Freight rail usage statistics', url: 'https://www.orr.gov.uk/monitoring-regulation/rail/freight', date: '2024' },
  { num: 3, name: 'Eurostat', dataset: 'Freight transport statistics', url: 'https://ec.europa.eu/eurostat/statistics-explained/index.php/Freight_transport_statistics_-_modal_split', date: '2024' },
];

// Road freight share (%), 2015–2025
const roadSharePct = [77, 77, 77, 77, 77, 78, 79, 76, 78, 78, 78];
// Rail freight share (%), 2015–2025
const railSharePct = [10, 10, 9, 9, 9, 9, 8, 8, 9, 9, 9];
// Lorry vehicle miles (billions), 2015–2025
const lorryVmtBn = [21, 22, 22, 23, 24, 24, 22, 22, 23, 23, 24];
// Road freight (billion tonne-km), 2015–2025
const roadFreightBtKm = [163, 165, 167, 170, 172, 174, 162, 165, 168, 170, 172];

const modalSeries: Series[] = [
  {
    id: 'road-share',
    label: 'Road freight share (%)',
    colour: '#E63946',
    data: roadSharePct.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
  {
    id: 'rail-share',
    label: 'Rail freight share (%)',
    colour: '#264653',
    data: railSharePct.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const volumeSeries: Series[] = [
  {
    id: 'lorry-vmt',
    label: 'Lorry vehicle miles (billions)',
    colour: '#264653',
    data: lorryVmtBn.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
  {
    id: 'road-freight',
    label: 'Road freight (bn tonne-km)',
    colour: '#F4A261',
    data: roadFreightBtKm.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const modalAnnotations: Annotation[] = [
  { date: new Date(2020, 5, 1), label: '2020: COVID disrupts freight patterns' },
  { date: new Date(2022, 5, 1), label: '2022: HGV driver shortage peaks' },
];

const volumeAnnotations: Annotation[] = [
  { date: new Date(2021, 5, 1), label: '2021: HGV driver shortage — 100,000 vacancy shortfall' },
];

export default function FreightRoadSharePage() {
  return (
    <>
      <TopicNav topic="Transport & Infrastructure" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Transport & Infrastructure"
          question="How Much of Britain's Freight Goes by Road?"
          finding="78% of UK domestic freight moves by road, compared to 63% in Germany. Rail handles just 9% of goods. The imbalance contributes to congestion, carbon emissions, and excessive road wear."
          colour="#264653"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Britain's freight system is unusually road-dependent by European standards. Around 78% of domestic freight by tonne-kilometre travels by road — compared to 63% in Germany, 62% in France, and an EU average of around 74%.<Cite nums={[1, 3]} /> Rail freight in the UK carries only 9% of goods, roughly half the European average, despite a dense rail network.<Cite nums={[2]} /> The imbalance matters for several reasons: road freight generates three to four times as much carbon per tonne-kilometre as rail; HGVs inflict disproportionate road wear (a 40-tonne lorry causes approximately 100,000 times the pavement damage of a car); and the UK's motorway network is already at capacity on key corridors.<Cite nums={[1]} /> Lorry vehicle miles have plateaued at around 24 billion annually, but the overall growth in freight demand means road congestion continues to worsen.<Cite nums={[1]} /></p>
            <p>The HGV driver shortage that peaked at an estimated 100,000 vacancies in 2021 exposed the vulnerability of road-dominated supply chains.<Cite nums={[1]} /> Brexit reduced access to the European driver pool — around 14,000 EU drivers left the UK in 2020–21 — and an ageing domestic workforce created a structural gap that had been building for a decade. Short-term emergency licences partially addressed the acute crisis, but driver demographics remain challenging: the average UK HGV driver is 55 years old. Rail freight grew 8% between 2022 and 2025, driven by intermodal container traffic, but from a very low base.<Cite nums={[2]} /> The government's freight strategy aims to increase rail freight's modal share, but without specific investment commitments the structural dependence on road is likely to persist.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Modal Share' },
          { id: 'sec-chart2', label: 'Volume' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Road freight modal share"
              value="78%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="vs Germany 63% · EU average 74% · broadly unchanged since 2015"
              sparklineData={roadSharePct.slice(-8)}
              source="DfT · Transport Statistics Great Britain 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Rail freight modal share"
              value="9%"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="vs Germany 18% · half the European average · constrained by capacity"
              sparklineData={railSharePct.slice(-8)}
              source="ORR · Freight rail usage statistics 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Lorry vehicle miles per year"
              value="24bn"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="Broadly flat post-pandemic · average HGV driver aged 55"
              sparklineData={lorryVmtBn.slice(-8)}
              source="DfT · Road traffic statistics 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK domestic freight modal share, 2015–2025"
              subtitle="Road freight share (red) and rail freight share (blue) as percentage of total domestic freight by tonne-kilometre. Road dominance has barely shifted."
              series={modalSeries}
              annotations={modalAnnotations}
              yLabel="Modal share (%)"
              source={{ name: 'DfT', dataset: 'Transport Statistics Great Britain', url: 'https://www.gov.uk/government/statistics/transport-statistics-great-britain-2024', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="HGV vehicle miles and road freight volume, UK, 2015–2025"
              subtitle="Annual lorry vehicle miles (billions, blue) and total goods moved by road (billion tonne-km, amber). Pandemic dip followed by recovery to pre-COVID levels."
              series={volumeSeries}
              annotations={volumeAnnotations}
              yLabel="Bn VMT / Bn tonne-km"
              source={{ name: 'DfT / ORR', dataset: 'Road traffic statistics / Rail freight statistics', url: 'https://www.gov.uk/government/statistics/transport-statistics-great-britain-2024', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Rail freight growing and West Coast Main Line capacity releasing"
            value="+8%"
            unit="rail freight growth 2022–2025"
            description="Rail freight grew 8% between 2022 and 2025, driven by intermodal container traffic and new automotive sector contracts. HS2 Phase 1, when complete, will release significant capacity on the West Coast Main Line for freight services between London and the North. Network Rail's freight growth strategy targets a doubling of rail freight by 2050. The Port of Felixstowe has invested in rail-connected inland freight terminals, reducing the first and last mile road dependency that has historically limited rail's appeal for container traffic."
            source="Source: ORR — Freight rail usage statistics 2025. Network Rail — Freight growth strategy 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/statistics/transport-statistics-great-britain-2024" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfT — Transport Statistics Great Britain</a> — Annual statistical compendium including freight modal shares and vehicle miles. Retrieved 2025.</p>
            <p><a href="https://www.orr.gov.uk/monitoring-regulation/rail/freight" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ORR — Freight rail usage statistics</a> — Annual rail freight tonne-kilometres and train kilometres. Retrieved 2025.</p>
            <p>Modal share is measured in tonne-kilometres (goods weight × distance moved). Road share includes all vehicles over 3.5 tonnes gross weight. Rail share excludes pipeline and coastal shipping. International comparisons use Eurostat freight transport statistics.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
