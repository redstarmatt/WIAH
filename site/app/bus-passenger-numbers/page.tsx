'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'DfT', dataset: 'Bus Statistics', url: 'https://www.gov.uk/government/collections/bus-statistics', date: '2024' },
  { num: 2, name: 'Campaign for Better Transport', dataset: 'Bus Report', url: 'https://bettertransport.org.uk/', date: '2024' }
];

export default function BusPassengerNumbersPage() {
  return (
    <>
      <TopicNav topic="Bus Passenger Numbers" colour="#F4A261" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Bus Passenger Numbers"
          question="Are people giving up on the bus?"
          finding="Bus passengers in England outside London have fallen by 45% since 2004 — from 2.9 billion to 1.6 billion journeys per year. Bus route mileage has been cut by 28% since 2010."
          colour="#F4A261"
          preposition="in"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="Bus journeys (England, outside London)"
          value="1.60B/yr"
          unit=""
          direction="down"
          polarity="up-is-good"
          changeText="2024 · DfT · Down 45% from 2.9B in 2004"
          sparklineData={[2.9, 2.7, 2.5, 2.4, 2.2, 2.1, 2.0, 1.5, 1.7, 1.7, 1.6]}
          source="DfT — Bus Statistics 2024"
        />
        <MetricCard
          label="Bus route mileage cuts (2010-24)"
          value="-28%"
          unit=""
          direction="down"
          polarity="up-is-good"
          changeText="2024 · CBT · 140M fewer miles operated"
          sparklineData={[100, 97, 94, 90, 87, 84, 82, 80, 78, 76, 72]}
          source="Campaign for Better Transport 2024"
        />
        <MetricCard
          label="Zero-emission buses in fleet"
          value="7.2%"
          unit=""
          direction="up"
          polarity="up-is-good"
          changeText="2024 · DfT · Up from 0.5% in 2019"
          sparklineData={[0.5, 1.0, 1.8, 3.0, 4.5, 5.8, 7.2]}
          source="DfT 2024"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="bus-passenger-numbers" />
      </main>
    </>
  );
}
