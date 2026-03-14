'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'DfT', dataset: 'Road Safety Statistics', url: 'https://www.gov.uk/government/collections/road-accidents-and-safety-statistics', date: '2023' },
  { num: 2, name: 'NPCC', dataset: 'Roads Policing Annual Data', url: 'https://www.npcc.police.uk/', date: '2024' }
];

export default function DrinkDriveEnforcementPage() {
  return (
    <>
      <TopicNav topic="Drink Drive Enforcement" colour="#E63946" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Drink Drive Enforcement"
          question="Are drink drive deaths stuck?"
          finding="Drink drive deaths have stalled at around 250 per year for over a decade. Roadside breath tests have been cut nearly in half since 2009, and the fail rate is rising as fewer tests are conducted."
          colour="#E63946"
          preposition="with"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="Breath tests (England & Wales)"
          value="450,000/yr"
          unit=""
          direction="down"
          polarity="up-is-good"
          changeText="2024 · NPCC · Down from 800K in 2009"
          sparklineData={[800000, 760000, 720000, 680000, 640000, 600000, 560000, 520000, 480000, 460000, 450000]}
          source="NPCC — Roads Policing Statistics 2024"
        />
        <MetricCard
          label="Drink drive deaths (annual)"
          value="250"
          unit=""
          direction="flat"
          polarity="up-is-bad"
          changeText="2023 · DfT · Stalled at 250 for a decade"
          sparklineData={[620, 560, 500, 440, 380, 320, 280, 260, 250, 250, 250]}
          source="DfT — Road Safety Statistics 2023"
        />
        <MetricCard
          label="Roadside breath test fail rate"
          value="7.5%"
          unit=""
          direction="up"
          polarity="up-is-bad"
          changeText="2024 · NPCC · Up from 5.8% in 2019"
          sparklineData={[5.0, 5.2, 5.5, 5.8, 6.0, 6.3, 6.8, 7.2, 7.5]}
          source="NPCC 2024"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="drink-drive-enforcement" />
      </main>
    </>
  );
}
