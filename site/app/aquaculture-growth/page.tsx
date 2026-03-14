'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'MMO', dataset: 'Aquaculture Statistics', url: 'https://www.gov.uk/government/statistics/aquaculture-statistics', date: '2022' },
  { num: 2, name: 'Salmon Scotland', dataset: 'Salmon Production Data', url: 'https://www.salmonscotland.co.uk/', date: '2022' }
];

export default function AquacultureGrowthPage() {
  return (
    <>
      <TopicNav topic="Aquaculture" colour="#264653" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Aquaculture"
          question="Is UK fish farming in trouble?"
          finding="UK aquaculture output has declined to 205,000 tonnes — down from 212,000 in 2018 — largely due to sea lice and disease hitting Scottish salmon. The industry faces growing animal welfare scrutiny."
          colour="#264653"
          preposition="in UK"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="UK aquaculture output"
          value="205,000 t"
          unit=""
          direction="down"
          polarity="up-is-good"
          changeText="2022 · MMO · Disease pressures"
          sparklineData={[185000, 192000, 198000, 205000, 210000, 212000, 208000, 205000]}
          source="MMO — Aquaculture Statistics 2022"
        />
        <MetricCard
          label="Scottish salmon production"
          value="170,000 t"
          unit=""
          direction="down"
          polarity="up-is-good"
          changeText="2022 · Salmon Scotland · Disease losses 25%"
          sparklineData={[145000, 155000, 162000, 168000, 172000, 177000, 175000, 170000]}
          source="Salmon Scotland 2022"
        />
        <MetricCard
          label="Aquaculture sector employment"
          value="24,500"
          unit=""
          direction="flat"
          polarity="up-is-good"
          changeText="2022 · MMO · Stable"
          sparklineData={[22000, 23000, 24000, 24800, 25000, 24800, 24600, 24500]}
          source="MMO 2022"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="aquaculture-growth" />
      </main>
    </>
  );
}
