'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Cefas', dataset: 'Stock Assessment Reports', url: 'https://www.cefas.co.uk/data-and-publications/fish-stock-assessments/', date: '2023' },
  { num: 2, name: 'MMO', dataset: 'UK Sea Fisheries Statistics', url: 'https://www.gov.uk/government/collections/uk-sea-fisheries-annual-statistics', date: '2023' }
];

export default function FishingStocksPage() {
  return (
    <>
      <TopicNav topic="Fishing Stocks" colour="#264653" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Fishing Stocks"
          question="Are UK fish stocks recovering?"
          finding="59% of UK fish stocks are at sustainable levels, up from 40% in 2010. But Brexit has complicated quota arrangements and commercial catch has fallen 18% since then."
          colour="#264653"
          preposition="in"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="UK fish stocks at sustainable levels"
          value="59%"
          unit=""
          direction="up"
          polarity="up-is-good"
          changeText="2023 · Cefas · Up from 40% in 2010"
          sparklineData={[40, 42, 44, 46, 48, 51, 54, 56, 58, 59]}
          source="Cefas — Stock Assessment Reports 2023"
        />
        <MetricCard
          label="UK commercial catch volume"
          value="535,000 t"
          unit=""
          direction="down"
          polarity="up-is-good"
          changeText="2023 · MMO · Down 18% since Brexit"
          sparklineData={[655000, 640000, 620000, 600000, 580000, 570000, 560000, 550000, 535000]}
          source="MMO — UK Sea Fisheries Statistics 2023"
        />
        <MetricCard
          label="Marine Protected Areas (UK waters)"
          value="38%"
          unit=""
          direction="up"
          polarity="up-is-good"
          changeText="2024 · JNCC · But enforcement weak"
          sparklineData={[24, 26, 28, 30, 32, 34, 36, 37, 38]}
          source="JNCC 2024"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="fishing-stocks" />
      </main>
    </>
  );
}
