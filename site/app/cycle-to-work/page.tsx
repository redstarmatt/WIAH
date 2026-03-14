'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'ONS', dataset: 'National Travel Survey', url: 'https://www.gov.uk/government/collections/national-travel-survey-statistics', date: '2024' },
  { num: 2, name: 'DfT', dataset: 'Active Travel Statistics', url: 'https://www.gov.uk/government/collections/walking-and-cycling-statistics', date: '2024' }
];

export default function CycleToWorkPage() {
  return (
    <>
      <TopicNav topic="Cycle to Work" colour="#2A9D8F" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Cycle to Work"
          question="Are more people cycling to work?"
          finding="3.4% of workers now cycle to work — up from 2.8% in 2011 — but this still lags Dutch (27%) and Danish (19%) levels. E-bike sales have tripled since 2019, suggesting cycling is becoming more accessible."
          colour="#2A9D8F"
          preposition="with"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="Employees cycling to work"
          value="3.4%"
          unit=""
          direction="up"
          polarity="up-is-good"
          changeText="2024 · ONS · London: 7.5%"
          sparklineData={[2.8, 2.9, 3.0, 3.0, 3.1, 3.1, 3.2, 3.3, 3.4]}
          source="ONS — National Travel Survey 2024"
        />
        <MetricCard
          label="Cycle to Work scheme participants"
          value="1.6M"
          unit=""
          direction="up"
          polarity="up-is-good"
          changeText="2024 · Cyclescheme · Up 60% since 2019"
          sparklineData={[0.8, 0.9, 0.9, 1.0, 1.0, 1.2, 1.4, 1.5, 1.6]}
          source="Cyclescheme / HMRC 2024"
        />
        <MetricCard
          label="E-bike sales (UK annual)"
          value="180,000"
          unit=""
          direction="up"
          polarity="up-is-good"
          changeText="2024 · CONEBI · Up from 60K in 2019"
          sparklineData={[60000, 75000, 90000, 110000, 130000, 150000, 165000, 180000]}
          source="CONEBI 2024"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="cycle-to-work" />
      </main>
    </>
  );
}
