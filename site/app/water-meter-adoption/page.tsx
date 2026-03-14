'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Ofwat', dataset: 'Water Company Performance', url: 'https://www.ofwat.gov.uk/', date: '2024' },
  { num: 2, name: 'Water UK', dataset: 'Water Efficiency Report', url: 'https://www.water.org.uk/', date: '2024' }
];

export default function WaterMeterAdoptionPage() {
  return (
    <>
      <TopicNav topic="Water Meter Adoption" colour="#264653" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Water Meter Adoption"
          question="Why isn't every home water-metered?"
          finding="59% of households in England and Wales are now metered — up from 30% in 2000 — but some water companies in high-stress areas have rolled out metering slowly. Metering consistently reduces household use by 12%."
          colour="#264653"
          preposition="with"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="Metered households (England & Wales)"
          value="59%"
          unit=""
          direction="up"
          polarity="up-is-good"
          changeText="2024 · Ofwat · Up from 30% in 2000"
          sparklineData={[30, 35, 40, 44, 48, 51, 53, 55, 57, 59]}
          source="Ofwat — Water Company Performance 2024"
        />
        <MetricCard
          label="Water saved per household by metering"
          value="12%"
          unit=""
          direction="flat"
          polarity="up-is-good"
          changeText="2024 · Water UK · Consistent reduction"
          sparklineData={[10, 11, 11, 12, 12, 12, 12]}
          source="Water UK 2024"
        />
        <MetricCard
          label="Water stress areas without universal metering"
          value="4"
          unit=""
          direction="down"
          polarity="up-is-bad"
          changeText="2024 · Ofwat · SE England lagging"
          sparklineData={[9, 8, 7, 7, 6, 5, 5, 4]}
          source="Ofwat 2024"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="water-meter-adoption" />
      </main>
    </>
  );
}
