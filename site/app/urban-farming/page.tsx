'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'RHS', dataset: 'Campaign for School Gardening', url: 'https://schoolgardening.rhs.org.uk/', date: '2024' },
  { num: 2, name: 'AHDB', dataset: 'UK Horticulture Market Overview', url: 'https://ahdb.org.uk/horticulture', date: '2024' }
];

export default function UrbanFarmingPage() {
  return (
    <>
      <TopicNav topic="Urban Farming" colour="#2A9D8F" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Urban Farming"
          question="Is urban farming taking off in the UK?"
          finding="The UK's urban farming sector has grown 240% since 2015, reaching 1,450 enterprises. Vertical farm investment has surged to £380 million cumulative, driven by food security concerns."
          colour="#2A9D8F"
          preposition="in"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="Urban farming enterprises (UK)"
          value="1,450"
          unit=""
          direction="up"
          polarity="up-is-good"
          changeText="2024 · Estimated · Up 240% since 2015"
          sparklineData={[430, 490, 570, 680, 820, 960, 1080, 1200, 1340, 1450]}
          source="Agri-TechE / Vertical Farm Industry estimates 2024"
        />
        <MetricCard
          label="Vertical farm investment (UK, cumulative)"
          value="£380M"
          unit=""
          direction="up"
          polarity="up-is-good"
          changeText="2024 · Up from near-zero in 2018"
          sparklineData={[5, 15, 40, 85, 140, 210, 290, 380]}
          source="AHDB / industry estimates 2024"
        />
        <MetricCard
          label="School growing programmes"
          value="11,200"
          unit=""
          direction="up"
          polarity="up-is-good"
          changeText="2024 · RHS · Up 18% since 2019"
          sparklineData={[8500, 9000, 9400, 9800, 10200, 10600, 10900, 11200]}
          source="RHS Campaign for School Gardening 2024"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="urban-farming" />
      </main>
    </>
  );
}
