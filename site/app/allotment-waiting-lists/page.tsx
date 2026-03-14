'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'NAS', dataset: 'National Allotment Survey', url: 'https://www.nsalg.org.uk/', date: '2024' },
  { num: 2, name: 'DLUHC', dataset: 'Planning Policy Guidance', url: 'https://www.gov.uk/guidance/open-space-sports-and-recreation-facilities-public-rights-of-way-and-local-greenspace', date: '2024' }
];

export default function AllotmentWaitingListsPage() {
  return (
    <>
      <TopicNav topic="Allotment Waiting Lists" colour="#2A9D8F" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Allotment Waiting Lists"
          question="How long does it take to get an allotment?"
          finding="Over 150,000 people are on allotment waiting lists in England — up from 90,000 in 2019 — with average waits of 5.4 years in cities. The statutory duty for councils to provide allotments remains largely unenforced."
          colour="#2A9D8F"
          preposition="with"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="People on allotment waiting lists"
          value="150K+"
          unit=""
          direction="up"
          polarity="up-is-bad"
          changeText="2024 · NAS · Up from 90K in 2019"
          sparklineData={[60, 65, 70, 78, 85, 90, 100, 115, 130, 145, 150]}
          source="National Allotment Society 2024"
        />
        <MetricCard
          label="Average wait for allotment"
          value="5.4 yrs"
          unit=""
          direction="up"
          polarity="up-is-bad"
          changeText="2024 · Urban areas up to 10+ years"
          sparklineData={[2.5, 2.8, 3.1, 3.5, 3.9, 4.2, 4.6, 5.0, 5.4]}
          source="NAS 2024"
        />
        <MetricCard
          label="New allotment plots created (2020-24)"
          value="8,200"
          unit=""
          direction="down"
          polarity="up-is-good"
          changeText="2024 · NAS · Far below demand"
          sparklineData={[12000, 10000, 9000, 8500, 8200]}
          source="NAS 2024"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="allotment-waiting-lists" />
      </main>
    </>
  );
}
