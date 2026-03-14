'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Arts Council England', dataset: 'Annual Report', url: 'https://www.artscouncil.org.uk/', date: '2024' },
  { num: 2, name: 'DCMS', dataset: 'Culture White Paper', url: 'https://www.gov.uk/dcms', date: '2024' }
];

export default function ArtsCouncilFundingPage() {
  return (
    <>
      <TopicNav topic="Arts Council Funding" colour="#264653" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Arts Council Funding"
          question="Is arts funding being cut to the bone?"
          finding="Arts Council England's budget has fallen 30% in real terms since 2010, to £677 million per year. In its 2023 portfolio review, 225 organisations lost their National Portfolio Organisation status."
          colour="#264653"
          preposition="from"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="ACE budget (real terms)"
          value="£677M/yr"
          unit=""
          direction="down"
          polarity="up-is-good"
          changeText="2024/25 · ACE · Down 30% since 2010"
          sparklineData={[968, 920, 870, 820, 780, 750, 730, 710, 690, 680, 677]}
          source="Arts Council England — Annual Report 2024"
        />
        <MetricCard
          label="Organisations losing NPO status (2023)"
          value="225"
          unit=""
          direction="up"
          polarity="up-is-bad"
          changeText="2023 · ACE · 14% of National Portfolio defunded"
          sparklineData={[0, 0, 30, 60, 120, 180, 225]}
          source="ACE 2023"
        />
        <MetricCard
          label="Arts organisations reporting deficit"
          value="48%"
          unit=""
          direction="up"
          polarity="up-is-bad"
          changeText="2024 · ACE · Up from 28% in 2019"
          sparklineData={[28, 30, 32, 35, 38, 42, 45, 48]}
          source="ACE — Annual Report 2024"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="arts-council-funding" />
      </main>
    </>
  );
}
