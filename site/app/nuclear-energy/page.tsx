'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'DESNZ', dataset: 'Energy Trends', url: 'https://www.gov.uk/government/collections/energy-trends', date: '2024' },
  { num: 2, name: 'EDF', dataset: 'Hinkley Point C Project Update', url: 'https://www.edfenergy.com/energy/nuclear-new-build-projects/hinkley-point-c', date: '2024' },
  { num: 3, name: 'NAO', dataset: 'Nuclear Power in the UK', url: 'https://www.nao.org.uk/', date: '2024' }
];

export default function NuclearEnergyPage() {
  return (
    <>
      <TopicNav topic="Nuclear Energy" colour="#264653" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Nuclear Energy"
          question="Is the UK running out of nuclear power?"
          finding="Nuclear's share of UK electricity has fallen from 26% in 1998 to 13.4% in 2024 as ageing reactors close, while Hinkley Point C has doubled in cost to £35 billion and been delayed to 2031."
          colour="#264653"
          preposition="in"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="Nuclear share of UK electricity"
          value="13.4%"
          unit=""
          direction="down"
          polarity="up-is-good"
          changeText="2024 · DESNZ · Down from 26% in 1998"
          sparklineData={[26, 24, 22, 20, 19, 18, 16, 15, 14.5, 13.8, 13.4]}
          source="DESNZ — Energy Trends 2024"
        />
        <MetricCard
          label="Nuclear capacity online"
          value="5.6 GW"
          unit=""
          direction="down"
          polarity="up-is-good"
          changeText="2024 · Down from 12GW in 1997 · Old plant closures"
          sparklineData={[12.0, 10.8, 9.5, 8.9, 8.2, 7.6, 7.0, 6.5, 6.1, 5.8, 5.6]}
          source="DESNZ 2024"
        />
        <MetricCard
          label="Hinkley Point C expected cost"
          value="£35B"
          unit=""
          direction="up"
          polarity="up-is-bad"
          changeText="2024 · Up from £18B in 2016 estimate · Delayed to 2031"
          sparklineData={[18, 20, 22, 24, 25, 27, 29, 31, 33, 35]}
          source="EDF / NNB GenCo 2024"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="nuclear-energy" />
      </main>
    </>
  );
}
