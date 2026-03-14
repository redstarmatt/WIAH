'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Electoral Commission', dataset: 'UK Parliamentary General Election Results', url: 'https://www.electoralcommission.org.uk/', date: '2024' },
  { num: 2, name: 'Hansard Society', dataset: 'Audit of Political Engagement', url: 'https://www.hansardsociety.org.uk/research/audit-of-political-engagement', date: '2024' }
];

export default function CivicEngagementPage() {
  return (
    <>
      <TopicNav topic="Civic Engagement" colour="#6B7280" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Civic Engagement"
          question="Are people giving up on democracy?"
          finding="The 2024 general election recorded just 59.7% turnout — the lowest since 2001. Yet 28 petitions reached 100,000 signatures in 2024, up from just 3 in 2016, suggesting shifting engagement rather than disengagement."
          colour="#6B7280"
          preposition="in"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="General election turnout"
          value="59.7%"
          unit=""
          direction="down"
          polarity="up-is-good"
          changeText="2024 · Electoral Commission · Lowest since 2001"
          sparklineData={[71.4, 61.4, 65.1, 66.1, 68.7, 67.3, 59.7]}
          source="Electoral Commission — UK General Election Results 2024"
        />
        <MetricCard
          label="Petitions reaching 100K signatures"
          value="28/yr"
          unit=""
          direction="up"
          polarity="up-is-good"
          changeText="2024 · Parliament · Up from 3 in 2016"
          sparklineData={[3, 5, 8, 12, 18, 24, 28]}
          source="UK Parliament Petitions Committee 2024"
        />
        <MetricCard
          label="Adults contacting MP in past year"
          value="11%"
          unit=""
          direction="up"
          polarity="up-is-good"
          changeText="2024 · Hansard Society"
          sparklineData={[7, 7, 8, 9, 10, 11, 11]}
          source="Hansard Society — Audit of Political Engagement 2024"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="civic-engagement" />
      </main>
    </>
  );
}
