'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'EA', dataset: 'Water Framework Directive Assessment', url: 'https://www.gov.uk/government/collections/water-framework-directive', date: '2023' },
  { num: 2, name: 'Defra', dataset: 'Agriculture in the UK', url: 'https://www.gov.uk/government/statistical-data-sets/agriculture-in-the-united-kingdom', date: '2023' }
];

export default function NitrogenPollutionPage() {
  return (
    <>
      <TopicNav topic="Nitrogen Pollution" colour="#E63946" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Nitrogen Pollution"
          question="Is nitrogen pollution poisoning UK rivers?"
          finding="59% of English rivers are failing water quality standards partly due to excess nitrogen — most from agricultural runoff. The annual cost to the UK economy from nitrogen pollution is estimated at £10 billion."
          colour="#E63946"
          preposition="from"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="Rivers failing due to nitrogen"
          value="59%"
          unit=""
          direction="up"
          polarity="up-is-bad"
          changeText="2023 · EA · Up from 48% in 2010"
          sparklineData={[48, 49, 50, 51, 52, 53, 54, 56, 57, 58, 59]}
          source="EA — Water Framework Directive Assessment 2023"
        />
        <MetricCard
          label="Agricultural nitrogen surplus"
          value="68 kg N/ha"
          unit=""
          direction="up"
          polarity="up-is-bad"
          changeText="2023 · Defra"
          sparklineData={[58, 60, 61, 62, 63, 64, 65, 66, 67, 68]}
          source="Defra — Agriculture Statistics 2023"
        />
        <MetricCard
          label="Cost of nitrogen pollution (est.)"
          value="£10B/yr"
          unit=""
          direction="up"
          polarity="up-is-bad"
          changeText="2023 · Cambridge University estimate"
          sparklineData={[7.5, 7.8, 8.0, 8.3, 8.6, 8.9, 9.2, 9.5, 9.8, 10.0]}
          source="Cambridge University 2023"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="nitrogen-pollution" />
      </main>
    </>
  );
}
