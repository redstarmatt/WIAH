'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'DESNZ', dataset: 'Net Zero Hydrogen Fund', url: 'https://www.gov.uk/government/publications/net-zero-hydrogen-fund', date: '2024' },
  { num: 2, name: 'DESNZ', dataset: 'Hydrogen Production LDES', url: 'https://www.gov.uk/', date: '2024' }
];

export default function HydrogenProductionPage() {
  return (
    <>
      <TopicNav topic="Hydrogen Production" colour="#264653" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Hydrogen Production"
          question="Is UK green hydrogen actually happening?"
          finding="The UK has just 0.7 GW of low-carbon hydrogen capacity — far short of the 10 GW 2030 target. Green hydrogen costs have fallen from £12/kg in 2020 to £6.50/kg, but remain four times the cost of conventional hydrogen."
          colour="#264653"
          preposition="in UK"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="UK low-carbon hydrogen capacity"
          value="0.7 GW"
          unit=""
          direction="up"
          polarity="up-is-good"
          changeText="2024 · DESNZ · Target: 10GW by 2030"
          sparklineData={[0.05, 0.1, 0.15, 0.25, 0.4, 0.55, 0.7]}
          source="DESNZ — Hydrogen Production Statistics 2024"
        />
        <MetricCard
          label="Electrolytic hydrogen projects consented"
          value="14"
          unit=""
          direction="up"
          polarity="up-is-good"
          changeText="2024 · DESNZ HAR1 · First wave approved"
          sparklineData={[0, 0, 1, 3, 6, 10, 14]}
          source="DESNZ 2024"
        />
        <MetricCard
          label="Green hydrogen cost"
          value="£6.50/kg"
          unit=""
          direction="down"
          polarity="up-is-bad"
          changeText="2024 · Down from £12/kg in 2020"
          sparklineData={[12, 11, 10, 9, 8, 7.5, 7.0, 6.5]}
          source="DESNZ / Aurora Energy Research 2024"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="hydrogen-production" />
      </main>
    </>
  );
}
