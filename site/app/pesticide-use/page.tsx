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
  { num: 1, name: 'Defra', dataset: 'Pesticide Usage Survey', url: 'https://www.gov.uk/government/collections/pesticide-usage-survey', date: '2022' },
  { num: 2, name: 'EA', dataset: 'Chemical Investigation Programme', url: 'https://www.gov.uk/government/publications/chemicals-investigation-programme', date: '2022' }
];

export default function PesticideUsePage() {
  return (
    <>
      <TopicNav topic="Pesticide Use" colour="#F4A261" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Pesticide Use"
          question="Are UK farms still soaked in pesticides?"
          finding="Despite a 13% reduction in total pesticide use since 2010, 66% of river water quality tests now detect pesticide residues — up from 52% in 2016. Pesticides are increasingly reaching groundwater."
          colour="#F4A261"
          preposition="of"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The headline numbers on UK pesticide use tell a deceptively reassuring story. Total weight applied has fallen 13% since 2010, driven partly by the shift toward more potent formulations that work at lower doses and partly by integrated pest management schemes encouraged under agri-environment contracts.<Cite nums={1} /> But weight is a crude measure. The more telling indicator is what ends up in the water. The Environment Agency's Chemical Investigation Programme found pesticide residues in 66% of river water samples in 2022, up from 52% just six years earlier. Neonicotinoids, banned for outdoor use since 2018 but still permitted under emergency authorisations, continue to appear in watercourses across eastern England. Metaldehyde, the slug pellet chemical, was only fully withdrawn in 2022 after years of breaching drinking water standards. Meanwhile, groundwater contamination is growing: long-lived metabolites from pesticides applied decades ago are now migrating into aquifers that supply drinking water to millions.</p>
            <p>The regulatory picture is equally complex. The UK's post-Brexit pesticide approvals regime, operated by the Health and Safety Executive, has 48 active substances under health review — up from 28 in 2019.<Cite nums={2} /> Glyphosate, the world's most widely used herbicide, was reapproved in 2023 for a further five years despite ongoing scientific debate about its carcinogenicity. Britain now sets its own maximum residue levels, diverging from EU standards in ways that are difficult for consumers to track. The fundamental tension is between agricultural productivity and environmental protection: farmers face real economic pressure to control pests and diseases, while the cumulative ecological cost of chemical-intensive farming — declining insect populations, contaminated waterways, biodiversity loss — grows harder to ignore with each year's monitoring data.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="Pesticide use (England)"
          value="17,200 t/yr"
          unit=""
          direction="down"
          polarity="up-is-bad"
          changeText="2022 · Defra · Down 13% since 2010"
          sparklineData={[19800, 19200, 18500, 18200, 17900, 17600, 17800, 17400, 17200]}
          source="Defra — Pesticide Usage Survey 2022"
        />
        <MetricCard
          label="Rivers with pesticide detections"
          value="66%"
          unit=""
          direction="up"
          polarity="up-is-bad"
          changeText="2022 · EA · Up from 52% in 2016"
          sparklineData={[52, 54, 56, 58, 60, 62, 63, 65, 66]}
          source="EA 2022"
        />
        <MetricCard
          label="Pesticides under health review"
          value="48"
          unit=""
          direction="up"
          polarity="up-is-bad"
          changeText="2024 · HSE"
          sparklineData={[28, 31, 34, 36, 38, 41, 44, 46, 48]}
          source="HSE 2024"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="pesticide-use" />
      </main>
    </>
  );
}
