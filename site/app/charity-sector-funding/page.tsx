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

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Britain's charity sector is being asked to do more with less, and the arithmetic is becoming unsustainable. Total voluntary sector income reached £58.7 billion in 2024, a figure that sounds robust until adjusted for inflation: in real terms, it has been flat since 2018, even as demand for charitable services has surged.<Cite nums={1} /> The structural shift is stark. Government grants to charities have fallen 25% in real terms since 2010, as local authorities facing their own funding crises have cut commissioning budgets and shifted to competitive contracts that favour larger organisations. The result is a hollowing out of the sector's middle tier: small and medium charities, those with annual incomes between £100,000 and £1 million, have seen the steepest decline in government funding, yet these are precisely the organisations embedded in communities and responsive to local need. Meanwhile, individual giving has not filled the gap. The proportion of adults donating to charity has fallen from 73% to 63% over the past decade, with younger cohorts giving less frequently and in smaller amounts than their predecessors did at the same age.</p>
            <p>The financial fragility is now acute. Twenty-nine percent of charities report holding less than three months of reserves, up from 20% in 2016, meaning that a single funding setback or unexpected cost can push an organisation to the brink.<Cite nums={2} /> Staff retention has become a crisis in its own right: charity sector median pay lags the private sector by roughly 7%, and the gap has widened since 2020 as inflation eroded real wages. Organisations providing frontline services — food banks, debt advice, domestic abuse refuges, mental health support — face a particularly vicious cycle: rising demand drives up costs, funders resist increasing grants proportionally, and experienced staff leave for better-paid public or private sector roles. The sector is not collapsing, but it is being slowly depleted. When the state retreats and civil society cannot expand to fill the space, the people who fall through the gaps are invariably those with the least capacity to advocate for themselves.</p>
          </div>
        </section>

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
