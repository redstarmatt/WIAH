'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'NPCA', dataset: 'National Parks Authorities', url: 'https://www.nationalparks.uk/', date: '2024' },
  { num: 2, name: 'Natural England', dataset: 'MENE Survey', url: 'https://www.gov.uk/government/collections/monitor-of-engagement-with-the-natural-environment-survey', date: '2024' }
];

export default function NationalParksAccessPage() {
  return (
    <>
      <TopicNav topic="National Parks Access" colour="#2A9D8F" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="National Parks Access"
          question="Who can actually access national parks?"
          finding="Only 6% of visitors to UK national parks come from BAME communities, despite being 14% of the population. Park authority budgets have been cut 31% in real terms since 2010, reducing ranger services."
          colour="#2A9D8F"
          preposition="to"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="BAME national park visitors"
          value="6%"
          unit=""
          direction="up"
          polarity="up-is-good"
          changeText="2024 · NPCA · Up from 1% in 2000 · Still underrepresented"
          sparklineData={[1, 2, 2, 3, 3, 4, 4, 5, 5, 6]}
          source="NPCA 2024"
        />
        <MetricCard
          label="Park authority budgets (real)"
          value="-31%"
          unit=""
          direction="down"
          polarity="up-is-good"
          changeText="2010-2024 · NPCA"
          sparklineData={[100, 93, 86, 80, 76, 74, 72, 71, 70, 69, 69]}
          source="NPCA 2024"
        />
        <MetricCard
          label="UK residents within 30min of park"
          value="44%"
          unit=""
          direction="flat"
          polarity="up-is-good"
          changeText="2024 · NPCA · Unchanged"
          sparklineData={[44, 44, 44, 44, 44, 44]}
          source="NPCA 2024"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="national-parks-access" />
      </main>
    </>
  );
}
