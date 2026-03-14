'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'RTPI', dataset: 'State of the Profession', url: 'https://www.rtpi.org.uk/research/', date: '2024' },
  { num: 2, name: 'DLUHC', dataset: 'Planning Statistics', url: 'https://www.gov.uk/government/collections/planning-statistics', date: '2024' }
];

export default function CouncilPlanningCapacityPage() {
  return (
    <>
      <TopicNav topic="Council Planning Capacity" colour="#F4A261" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Council Planning Capacity"
          question="Why does planning permission take so long?"
          finding="Just 18% of local planning departments say they are at full capacity — down from 45% in 2013 — and only 44% of major planning applications are decided within the 13-week statutory target."
          colour="#F4A261"
          preposition="in"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="Planning depts at full capacity"
          value="18%"
          unit=""
          direction="down"
          polarity="up-is-good"
          changeText="2024 · RTPI · Down from 34% in 2019"
          sparklineData={[45, 42, 40, 38, 36, 34, 30, 26, 22, 20, 18]}
          source="RTPI — State of the Profession 2024"
        />
        <MetricCard
          label="Planning officer vacancies"
          value="8,200"
          unit=""
          direction="up"
          polarity="up-is-bad"
          changeText="2024 · RTPI · Up 60% in 5 years"
          sparklineData={[4500, 5000, 5500, 6000, 6500, 7000, 7400, 7800, 8200]}
          source="RTPI 2024"
        />
        <MetricCard
          label="Major apps decided within 13 weeks"
          value="44%"
          unit=""
          direction="down"
          polarity="up-is-good"
          changeText="2024 · DLUHC · Down from 64% in 2014"
          sparklineData={[64, 61, 59, 57, 55, 52, 50, 48, 46, 44]}
          source="DLUHC — Planning Statistics 2024"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="council-planning-capacity" />
      </main>
    </>
  );
}
