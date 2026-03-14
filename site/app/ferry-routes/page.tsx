'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Transport Scotland', dataset: 'Ferry Services Performance Reports', url: 'https://www.transport.gov.scot/', date: '2024' },
  { num: 2, name: 'Passenger Shipping Association', dataset: 'Annual Report', url: 'https://www.psa-psara.org/', date: '2024' }
];

export default function FerryRoutesPage() {
  return (
    <>
      <TopicNav topic="Ferry Routes" colour="#264653" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Ferry Routes"
          question="Are UK ferry services being cut?"
          finding="The UK has lost 14 domestic ferry routes since 2010 — from 72 to 58 active routes. Scottish island ferry reliability has fallen from 88% to 78%, threatening connectivity for remote communities."
          colour="#264653"
          preposition="on"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="UK domestic ferry routes"
          value="58"
          unit=""
          direction="down"
          polarity="up-is-good"
          changeText="2024 · PSA · Down from 72 in 2010"
          sparklineData={[72, 70, 68, 66, 64, 63, 62, 61, 60, 59, 58]}
          source="Passenger Shipping Association 2024"
        />
        <MetricCard
          label="Scottish island ferry reliability"
          value="78%"
          unit=""
          direction="down"
          polarity="up-is-good"
          changeText="2024 · Transport Scotland · Services run on time"
          sparklineData={[88, 86, 84, 83, 82, 81, 80, 80, 79, 78]}
          source="Transport Scotland 2024"
        />
        <MetricCard
          label="Ferry operators in financial distress"
          value="4"
          unit=""
          direction="up"
          polarity="up-is-bad"
          changeText="2024 · Reporting losses or restructuring"
          sparklineData={[0, 0, 1, 1, 2, 2, 3, 4]}
          source="PSA / annual reports 2024"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="ferry-routes" />
      </main>
    </>
  );
}
