'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import References, { Reference } from '@/components/References';

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
