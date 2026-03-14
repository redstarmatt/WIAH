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
  { num: 1, name: 'DfE', dataset: 'Apprenticeships and Traineeships', url: 'https://www.gov.uk/government/collections/statistics-apprenticeships', date: '2024' },
  { num: 2, name: 'BEIS', dataset: 'Business Population Estimates', url: 'https://www.gov.uk/government/statistics/business-population-estimates', date: '2024' }
];

export default function ApprenticeshipLevyUsePage() {
  return (
    <>
      <TopicNav topic="Apprenticeship Levy" colour="#264653" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Apprenticeship Levy"
          question="Is the apprenticeship levy working?"
          finding="£3.3 billion of the £4.3 billion apprenticeship levy collected annually goes unspent. Small businesses have seen their share of apprenticeship starts fall from 47% to 29%."
          colour="#264653"
          preposition="with the"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The apprenticeship levy was introduced in 2017 with a clear purpose: large employers would pay 0.5% of their payroll into a ring-fenced fund, then draw it down to train apprentices. The idea was to reverse a long decline in employer investment in training. Instead, the levy has become one of the most striking examples of policy design failing to match policy intent. Of the 4.3 billion pounds collected annually, approximately 3.3 billion goes unspent, returned to the Treasury by default when employers fail to use their allocation within 24 months.<Cite nums={1} /> Total apprenticeship starts have recovered from their post-levy collapse, but the composition has shifted dramatically: large employers increasingly use the levy to fund management degrees and MBA-equivalent programmes for existing senior staff, rather than the Level 2 and Level 3 vocational training the policy was designed to support.</p>
            <p>The impact on small and medium-sized enterprises has been particularly damaging. Before the levy, SMEs accounted for 47% of all apprenticeship starts. That share has fallen to 29%, because the co-funding model that replaced direct grants is more complex to navigate and less generous.<Cite nums={2} /> A hairdresser in Bradford or a plumber in Barnsley trying to take on an apprentice now faces more bureaucracy and less financial support than before the levy existed. Meanwhile, the skills shortages that the levy was supposed to address, in construction, engineering, social care, and digital, have worsened. The government has announced a review and signalled a shift toward a broader Growth and Skills Levy, but the fundamental tension remains: a system designed to fund training that employers would not otherwise provide has been captured by employers who use it to subsidise training they would have paid for anyway.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="Levy funds unspent (annual)"
          value="£3.3B"
          unit=""
          direction="up"
          polarity="up-is-bad"
          changeText="2024 · DfE · Of £4.3B collected · 77% unspent"
          sparklineData={[1.4, 1.6, 1.8, 2.0, 2.3, 2.6, 2.9, 3.1, 3.3]}
          source="DfE — Apprenticeships and Traineeships 2024"
        />
        <MetricCard
          label="Apprenticeship starts (annual)"
          value="688,000"
          unit=""
          direction="up"
          polarity="up-is-good"
          changeText="2024 · DfE · Up but quality uneven"
          sparklineData={[509000, 491000, 375000, 423000, 380000, 321000, 349000, 688000]}
          source="DfE 2024"
        />
        <MetricCard
          label="SME apprenticeship starts (% of total)"
          value="29%"
          unit=""
          direction="down"
          polarity="up-is-good"
          changeText="2024 · DfE · Down from 47% pre-levy"
          sparklineData={[47, 45, 40, 36, 33, 31, 30, 29]}
          source="DfE 2024"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="apprenticeship-levy-use" />
      </main>
    </>
  );
}
