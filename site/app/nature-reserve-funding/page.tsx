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
  { num: 1, name: 'Natural England', dataset: 'SSSI Condition Monitoring', url: 'https://www.gov.uk/government/collections/sssi-condition-monitoring', date: '2024' },
  { num: 2, name: 'Wildlife Trusts', dataset: 'Living Landscapes', url: 'https://www.wildlifetrusts.org/', date: '2024' }
];

export default function NatureReserveFundingPage() {
  return (
    <>
      <TopicNav topic="Nature Reserve Funding" colour="#2A9D8F" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Nature Reserve Funding"
          question="Are nature reserves being abandoned?"
          finding="Natural England's budget has been cut by 56% in real terms since 2010, leaving just 68% of National Nature Reserves in good ecological condition — well below the 75% target."
          colour="#2A9D8F"
          preposition="for"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England's National Nature Reserves were established to protect the country's most important habitats — ancient woodlands, chalk grasslands, coastal marshes, and upland peatlands that harbour species found nowhere else. Their stewardship falls primarily to Natural England, whose budget has been cut by 56% in real terms since 2010, one of the deepest reductions imposed on any public body. The consequences are measurable: just 68% of NNR land is currently assessed as being in favourable or recovering condition, well below the government's own 75% target.<Cite nums={1} /> Staff numbers have been halved, specialist ecological expertise has been lost, and routine management tasks — scrub clearance, grazing regimes, invasive species control — have been deferred or abandoned on sites that took decades to restore.</p>
            <p>The Wildlife Trusts and other voluntary conservation organisations have stepped in where they can, now managing over 118,000 hectares of land across the UK, a 22% increase since 2015.<Cite nums={2} /> But charitable effort, however dedicated, cannot substitute for the systematic, statutory-backed conservation that NNRs are supposed to provide. The government's commitment to protect 30% of land for nature by 2030 — the so-called "30 by 30" target — sits uneasily alongside a funding settlement that leaves the existing protected estate in decline. Designating new sites means little if the ones already designated are deteriorating for want of a few thousand pounds of annual management. The gap between ambition and resource is the defining feature of English nature conservation, and it is widening.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="Natural England budget cut (2010-24)"
          value="-56%"
          unit=""
          direction="down"
          polarity="up-is-good"
          changeText="2024 · HM Treasury"
          sparklineData={[100, 88, 75, 65, 56, 50, 46, 44, 44, 44, 44]}
          source="HM Treasury — PESA 2024"
        />
        <MetricCard
          label="NNRs in good condition"
          value="68%"
          unit=""
          direction="flat"
          polarity="up-is-good"
          changeText="2024 · Natural England · Below 75% target"
          sparklineData={[70, 71, 70, 70, 69, 68, 68, 68]}
          source="Natural England 2024"
        />
        <MetricCard
          label="Wildlife trust land managed"
          value="118,000 ha"
          unit=""
          direction="up"
          polarity="up-is-good"
          changeText="2024 · Wildlife Trusts · Up 22% since 2015"
          sparklineData={[97000, 100000, 103000, 106000, 108000, 111000, 114000, 116000, 118000]}
          source="Wildlife Trusts 2024"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="nature-reserve-funding" />
      </main>
    </>
  );
}
