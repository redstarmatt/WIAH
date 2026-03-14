'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'DESNZ', dataset: 'Greenhouse Gas Statistics', url: 'https://www.gov.uk/government/collections/uk-greenhouse-gas-emissions-statistics', date: '2023' },
  { num: 2, name: 'MCA', dataset: 'Maritime Administration', url: 'https://www.gov.uk/government/organisations/maritime-and-coastguard-agency', date: '2024' }
];

export default function ShippingEmissionsPage() {
  return (
    <>
      <TopicNav topic="Shipping Emissions" colour="#264653" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Shipping Emissions"
          question="Is shipping being left out of net zero?"
          finding="UK domestic shipping emits 9.2 million tonnes of CO2e annually. Progress has been slow as other transport sectors decarbonise faster. Only 12 zero-emission vessels are currently registered in the UK."
          colour="#264653"
          preposition="from"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="UK domestic shipping CO2e"
          value="9.2 MtCO2e"
          unit=""
          direction="down"
          polarity="up-is-bad"
          changeText="2023 · DESNZ · Down 18% since 2010"
          sparklineData={[11.2, 10.8, 10.5, 10.1, 9.8, 9.5, 9.3, 9.2]}
          source="DESNZ — Greenhouse Gas Statistics 2023"
        />
        <MetricCard
          label="Shipping % of UK transport emissions"
          value="4.1%"
          unit=""
          direction="flat"
          polarity="up-is-bad"
          changeText="2023 · Share stable as other modes decarbonise"
          sparklineData={[4.0, 4.1, 4.0, 4.0, 4.1, 4.1, 4.1]}
          source="DESNZ 2023"
        />
        <MetricCard
          label="Zero-emission vessels in UK registry"
          value="12"
          unit=""
          direction="up"
          polarity="up-is-good"
          changeText="2024 · MCA · Up from 0 in 2020"
          sparklineData={[0, 1, 2, 4, 7, 9, 12]}
          source="MCA 2024"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="shipping-emissions" />
      </main>
    </>
  );
}
