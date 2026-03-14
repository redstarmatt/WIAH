'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Ofcom', dataset: 'Media Nations Report', url: 'https://www.ofcom.org.uk/research-and-data/tv-radio-and-on-demand/media-nations-reports', date: '2024' },
  { num: 2, name: 'Press Gazette', dataset: 'Newspaper Closure Tracker', url: 'https://pressgazette.co.uk/', date: '2024' }
];

export default function MediaPluralityPage() {
  return (
    <>
      <TopicNav topic="Media Plurality" colour="#6B7280" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Media Plurality"
          question="Who owns the news you read?"
          finding="Three media groups own 71% of national newspaper circulation in the UK. Meanwhile, 255 communities now have no regular local news coverage, up from 80 in 2016."
          colour="#6B7280"
          preposition="in"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="National papers owned by top 3 groups"
          value="71%"
          unit=""
          direction="up"
          polarity="up-is-bad"
          changeText="2024 · Ofcom · Murdoch, DMG, Reach"
          sparklineData={[62, 65, 66, 67, 68, 69, 70, 70, 71]}
          source="Ofcom — Media Nations 2024"
        />
        <MetricCard
          label="Local news coverage gaps"
          value="255 areas"
          unit=""
          direction="up"
          polarity="up-is-bad"
          changeText="2024 · Ofcom · No regular local news"
          sparklineData={[80, 110, 145, 175, 195, 215, 235, 248, 255]}
          source="Ofcom 2024"
        />
        <MetricCard
          label="Local newspaper closures (2008-24)"
          value="320+"
          unit=""
          direction="up"
          polarity="up-is-bad"
          changeText="2024 · Press Gazette"
          sparklineData={[10, 30, 60, 95, 140, 185, 230, 275, 310, 320]}
          source="Press Gazette 2024"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="media-plurality" />
      </main>
    </>
  );
}
