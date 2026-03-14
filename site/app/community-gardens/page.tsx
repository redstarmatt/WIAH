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
  { num: 2, name: 'Sustain', dataset: 'Growing Communities', url: 'https://www.sustainweb.org/', date: '2024' }
];

export default function CommunityGardensPage() {
  return (
    <>
      <TopicNav topic="Community Gardens" colour="#2A9D8F" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Community Gardens"
          question="Are community gardens growing?"
          finding="The UK now has over 5,400 registered community gardens — up 45% since 2015. With 660,000 regular participants and over 11,000 school growing programmes, community growing is becoming mainstream."
          colour="#2A9D8F"
          preposition="in"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="Registered community gardens (UK)"
          value="5,400"
          unit=""
          direction="up"
          polarity="up-is-good"
          changeText="2024 · GrowCommunity · Up 45% since 2015"
          sparklineData={[3700, 3900, 4100, 4300, 4500, 4700, 4900, 5100, 5300, 5400]}
          source="GrowCommunity / Incredible Edible 2024"
        />
        <MetricCard
          label="Community growing participants"
          value="660,000"
          unit=""
          direction="up"
          polarity="up-is-good"
          changeText="2024 · Estimate · Up 30% since 2019"
          sparklineData={[420000, 450000, 480000, 500000, 520000, 600000, 630000, 660000]}
          source="Sustain / Growing Communities estimate 2024"
        />
        <MetricCard
          label="School food growing programmes (RHS)"
          value="11,200"
          unit=""
          direction="up"
          polarity="up-is-good"
          changeText="2024 · RHS Campaign for School Gardening"
          sparklineData={[8500, 9000, 9400, 9800, 10200, 10600, 10900, 11200]}
          source="RHS 2024"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="community-gardens" />
      </main>
    </>
  );
}
