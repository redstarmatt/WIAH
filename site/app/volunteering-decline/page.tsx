'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'NCVO', dataset: 'UK Civil Society Almanac', url: 'https://www.ncvo.org.uk/research-and-insight/uk-civil-society-almanac/', date: '2024' },
  { num: 2, name: 'DCMS', dataset: 'Community Life Survey', url: 'https://www.gov.uk/government/collections/community-life-survey--2', date: '2024' }
];

export default function VolunteeringDeclinePage() {
  return (
    <>
      <TopicNav topic="Volunteering Decline" colour="#6B7280" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Volunteering Decline"
          question="Are people giving up on volunteering?"
          finding="Formal volunteering has fallen from 44% to 40% of adults since 2012. The biggest decline is among under-35s, with cost of living pressures cited as the main barrier. The sector estimates 200 million volunteer hours have been lost since 2019."
          colour="#6B7280"
          preposition="in"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="Formal volunteering at least once/year"
          value="40%"
          unit=""
          direction="down"
          polarity="up-is-good"
          changeText="2024 · NCVO · Down from 44% in 2012"
          sparklineData={[44, 43, 43, 42, 42, 41, 42, 42, 40, 40]}
          source="NCVO — UK Civil Society Almanac 2024"
        />
        <MetricCard
          label="Regular monthly volunteers"
          value="25%"
          unit=""
          direction="down"
          polarity="up-is-good"
          changeText="2024 · NCVO · Biggest drop among under-35s"
          sparklineData={[29, 28, 28, 27, 27, 26, 26, 26, 25, 25]}
          source="NCVO 2024"
        />
        <MetricCard
          label="Volunteer hours lost since 2019"
          value="200M hrs"
          unit=""
          direction="up"
          polarity="up-is-bad"
          changeText="2024 · NCVO estimate"
          sparklineData={[0, 20, 60, 110, 160, 190, 200]}
          source="NCVO 2024"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="volunteering-decline" />
      </main>
    </>
  );
}
