'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'WRAP', dataset: 'Household Food Waste Report', url: 'https://www.wrap.ngo/taking-action/food-drink/topics/food-waste/household-food-waste', date: '2021' },
  { num: 2, name: 'IGD', dataset: 'Retailer Food Waste Reporting', url: 'https://www.igd.com/', date: '2024' }
];

export default function FoodWasteReductionPage() {
  return (
    <>
      <TopicNav topic="Food Waste" colour="#F4A261" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Food Waste"
          question="How much food is the UK throwing away?"
          finding="UK households waste 6.4 million tonnes of food every year — worth £730 per household — despite a 20% reduction since 2007. Supermarkets generate 1.1 million tonnes surplus of which only 250,000 tonnes is redistributed."
          colour="#F4A261"
          preposition="with"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="Household food waste (England)"
          value="6.4M t/yr"
          unit=""
          direction="down"
          polarity="up-is-bad"
          changeText="2021 · WRAP · Down 20% from 2007"
          sparklineData={[8.0, 7.8, 7.5, 7.3, 7.0, 6.8, 6.6, 6.5, 6.4]}
          source="WRAP — Household Food Waste 2021"
        />
        <MetricCard
          label="Food waste cost per household"
          value="£730/yr"
          unit=""
          direction="up"
          polarity="up-is-bad"
          changeText="2024 · WRAP · Up due to food inflation"
          sparklineData={[470, 490, 510, 530, 570, 620, 680, 720, 730]}
          source="WRAP 2024"
        />
        <MetricCard
          label="Supermarket food waste surplus"
          value="1.1M t/yr"
          unit=""
          direction="up"
          polarity="up-is-bad"
          changeText="2024 · IGD · Only 250K t redistributed"
          sparklineData={[0.85, 0.88, 0.9, 0.93, 0.96, 1.0, 1.04, 1.07, 1.1]}
          source="IGD 2024"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="food-waste-reduction" />
      </main>
    </>
  );
}
