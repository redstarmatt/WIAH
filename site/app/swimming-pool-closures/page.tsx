'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Swim England', dataset: 'State of the Nation Report', url: 'https://www.swimming.org/swimengland/', date: '2024' },
  { num: 2, name: 'DCMS', dataset: 'Strategy for an Active Nation', url: 'https://www.gov.uk/dcms', date: '2024' }
];

export default function SwimmingPoolClosuresPage() {
  return (
    <>
      <TopicNav topic="Swimming Pool Closures" colour="#264653" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Swimming Pool Closures"
          question="Are public swimming pools disappearing?"
          finding="England has lost 14% of its public swimming pools since 2010, with 1,500 now at risk of closure due to energy costs. Meanwhile, 46% of children cannot swim 25 metres — up from 39% in 2019."
          colour="#264653"
          preposition="with"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="Public pools (England)"
          value="3,180"
          unit=""
          direction="down"
          polarity="up-is-good"
          changeText="2024 · Swim England · Down from 3,700 in 2010 · -14%"
          sparklineData={[3700, 3620, 3540, 3470, 3400, 3350, 3300, 3260, 3230, 3200, 3180]}
          source="Swim England — State of the Nation 2024"
        />
        <MetricCard
          label="Pools at risk of closure"
          value="1,500"
          unit=""
          direction="up"
          polarity="up-is-bad"
          changeText="2024 · Swim England · Energy costs chief cause"
          sparklineData={[200, 350, 500, 700, 900, 1100, 1300, 1500]}
          source="Swim England 2024"
        />
        <MetricCard
          label="Children unable to swim 25m"
          value="46%"
          unit=""
          direction="up"
          polarity="up-is-bad"
          changeText="2024 · Swim England · Up from 39% in 2019"
          sparklineData={[39, 41, 44, 46]}
          source="Swim England 2024"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="swimming-pool-closures" />
      </main>
    </>
  );
}
