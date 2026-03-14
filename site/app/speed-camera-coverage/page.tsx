'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'DfT', dataset: 'Road Safety Data', url: 'https://www.gov.uk/government/collections/road-accidents-and-safety-statistics', date: '2024' },
  { num: 2, name: 'NPCC', dataset: 'Roads Policing', url: 'https://www.npcc.police.uk/', date: '2024' }
];

export default function SpeedCameraCoveragePage() {
  return (
    <>
      <TopicNav topic="Speed Camera Coverage" colour="#6B7280" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Speed Camera Coverage"
          question="Are speed cameras disappearing?"
          finding="England and Wales has fewer than half the fixed speed cameras it had in 2007. Meanwhile, 4.3 million speeding penalties were issued in 2024 — up 22% since 2019 — as average-speed cameras expanded."
          colour="#6B7280"
          preposition="in"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="Fixed speed cameras (England & Wales)"
          value="1,850"
          unit=""
          direction="down"
          polarity="up-is-bad"
          changeText="2024 · DfT · Down from 4,500+ in 2007"
          sparklineData={[4500, 4200, 3800, 3400, 3000, 2700, 2400, 2200, 2000, 1900, 1850]}
          source="DfT — Road Safety Data 2024"
        />
        <MetricCard
          label="Speeding fixed penalties issued"
          value="4.3M/yr"
          unit=""
          direction="up"
          polarity="up-is-bad"
          changeText="2024 · DVLA · Up 22% since 2019"
          sparklineData={[2.8, 2.9, 3.0, 3.2, 3.5, 3.7, 3.9, 4.1, 4.3]}
          source="DVLA / NPCC 2024"
        />
        <MetricCard
          label="Roads with 20mph limit"
          value="38%"
          unit=""
          direction="up"
          polarity="up-is-good"
          changeText="2024 · DfT · Up from 8% in 2015"
          sparklineData={[8, 11, 14, 18, 22, 26, 30, 33, 35, 38]}
          source="DfT 2024"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="speed-camera-coverage" />
      </main>
    </>
  );
}
