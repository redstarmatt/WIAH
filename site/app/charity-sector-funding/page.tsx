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
  { num: 2, name: 'Charity Finance Group', dataset: 'Benchmarking Report', url: 'https://cfg.org.uk/', date: '2024' }
];

export default function CharitySectorFundingPage() {
  return (
    <>
      <TopicNav topic="Charity Sector Funding" colour="#6B7280" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Charity Sector Funding"
          question="Can charities keep the UK's safety net together?"
          finding="Government grants to charities have fallen 25% in real terms since 2010, while 29% of charities now have less than three months of reserves. Total sector income is flat in real terms despite surging demand."
          colour="#6B7280"
          preposition="in"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="Total UK charity income"
          value="£58.7B/yr"
          unit=""
          direction="flat"
          polarity="up-is-good"
          changeText="2024 · NCVO · Flat in real terms since 2018"
          sparklineData={[47, 50, 53, 56, 57, 55, 56, 57, 58, 58.7]}
          source="NCVO — UK Civil Society Almanac 2024"
        />
        <MetricCard
          label="Government grants to charities (real)"
          value="-25%"
          unit=""
          direction="down"
          polarity="up-is-good"
          changeText="2010-2024 · NCVO"
          sparklineData={[100, 92, 84, 78, 76, 75, 75, 75, 76, 75]}
          source="NCVO 2024"
        />
        <MetricCard
          label="Charities with less than 3 months reserves"
          value="29%"
          unit=""
          direction="up"
          polarity="up-is-bad"
          changeText="2024 · Charity Finance Group"
          sparklineData={[20, 22, 24, 25, 26, 27, 28, 29]}
          source="Charity Finance Group 2024"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="charity-sector-funding" />
      </main>
    </>
  );
}
