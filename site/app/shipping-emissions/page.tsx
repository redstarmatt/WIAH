'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import References, { Reference } from '@/components/References';
import Cite from '@/components/Cite';

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

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>While road transport and aviation have dominated the UK's decarbonisation debate, shipping has been allowed to drift. Domestic shipping still emits 9.2 million tonnes of CO2 equivalent annually — an 18% reduction since 2010, but far slower progress than road vehicles or rail.<Cite nums={1} /> The sector's share of total transport emissions has actually risen, from 3.5% to 4.1%, as cars and buses have cleaned up faster. This is partly a technology problem: ships are expensive, long-lived assets with 25-to-40-year lifespans, and the zero-emission propulsion systems needed to replace marine diesel — hydrogen, ammonia, battery-electric — are still in early-stage deployment. Just 12 zero-emission vessels are currently registered in the UK, most of them small ferries on short coastal routes.</p>
            <p>It is also a governance problem. International shipping emissions fall under the International Maritime Organization, not national climate legislation, creating a convenient gap in accountability. The UK's domestic fleet — ferries, coastal freight, offshore support vessels — does fall under national targets, but there is no dedicated sectoral strategy with binding milestones.<Cite nums={2} /> The Maritime and Coastguard Agency oversees safety, not decarbonisation. The contrast with Norway, which has mandated zero-emission fjord ferries and invested heavily in shore power infrastructure, is striking. Britain is an island nation whose economy depends on maritime trade. The failure to lead on clean shipping is not just an emissions problem — it is a missed industrial opportunity in a sector where early movers will set the global standard for propulsion, fuelling, and port infrastructure.</p>
          </div>
        </section>

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
