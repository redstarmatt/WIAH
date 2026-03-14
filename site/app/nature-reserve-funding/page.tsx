'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Natural England', dataset: 'SSSI Condition Monitoring', url: 'https://www.gov.uk/government/collections/sssi-condition-monitoring', date: '2024' },
  { num: 2, name: 'Wildlife Trusts', dataset: 'Living Landscapes', url: 'https://www.wildlifetrusts.org/', date: '2024' }
];

export default function NatureReserveFundingPage() {
  return (
    <>
      <TopicNav topic="Nature Reserve Funding" colour="#2A9D8F" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Nature Reserve Funding"
          question="Are nature reserves being abandoned?"
          finding="Natural England's budget has been cut by 56% in real terms since 2010, leaving just 68% of National Nature Reserves in good ecological condition — well below the 75% target."
          colour="#2A9D8F"
          preposition="for"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="Natural England budget cut (2010-24)"
          value="-56%"
          unit=""
          direction="down"
          polarity="up-is-good"
          changeText="2024 · HM Treasury"
          sparklineData={[100, 88, 75, 65, 56, 50, 46, 44, 44, 44, 44]}
          source="HM Treasury — PESA 2024"
        />
        <MetricCard
          label="NNRs in good condition"
          value="68%"
          unit=""
          direction="flat"
          polarity="up-is-good"
          changeText="2024 · Natural England · Below 75% target"
          sparklineData={[70, 71, 70, 70, 69, 68, 68, 68]}
          source="Natural England 2024"
        />
        <MetricCard
          label="Wildlife trust land managed"
          value="118,000 ha"
          unit=""
          direction="up"
          polarity="up-is-good"
          changeText="2024 · Wildlife Trusts · Up 22% since 2015"
          sparklineData={[97000, 100000, 103000, 106000, 108000, 111000, 114000, 116000, 118000]}
          source="Wildlife Trusts 2024"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="nature-reserve-funding" />
      </main>
    </>
  );
}
