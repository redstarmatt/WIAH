'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Campaign for Better Transport', dataset: 'Bus Report', url: 'https://bettertransport.org.uk/', date: '2024' },
  { num: 2, name: 'DfT', dataset: 'Rural Transport Statistics', url: 'https://www.gov.uk/government/statistics/transport-statistics-great-britain', date: '2024' }
];

export default function RuralTransportPage() {
  return (
    <>
      <TopicNav topic="Rural Transport" colour="#F4A261" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Rural Transport"
          question="How do people get around in rural Britain?"
          finding="38% of rural areas in England now have no regular bus service — up from 29% in 2010. For the 19% of rural households without a car, this means genuine transport poverty."
          colour="#F4A261"
          preposition="with"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="Rural areas with no bus service"
          value="38%"
          unit=""
          direction="up"
          polarity="up-is-bad"
          changeText="2024 · Campaign for Better Transport · Up from 29% in 2010"
          sparklineData={[29, 31, 32, 33, 34, 35, 36, 37, 37, 38]}
          source="Campaign for Better Transport — Bus Report 2024"
        />
        <MetricCard
          label="Rural households without a car"
          value="19%"
          unit=""
          direction="flat"
          polarity="up-is-bad"
          changeText="2024 · ONS"
          sparklineData={[21, 21, 20, 20, 19, 19, 19, 19]}
          source="ONS — National Travel Survey 2024"
        />
        <MetricCard
          label="Community transport mileage (England)"
          value="145M miles/yr"
          unit=""
          direction="down"
          polarity="up-is-good"
          changeText="2024 · CPT · Down 25% from 2019"
          sparklineData={[195, 190, 185, 180, 175, 145, 138, 142, 145]}
          source="Community Transport Association 2024"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="rural-transport" />
      </main>
    </>
  );
}
