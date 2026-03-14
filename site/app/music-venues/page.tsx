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
  { num: 1, name: 'Music Venue Trust', dataset: 'Annual Review', url: 'https://musicvenuetrust.com/', date: '2024' },
  { num: 2, name: 'UK Music', dataset: 'Counting the Music Industry', url: 'https://www.ukmusic.org/', date: '2024' }
];

export default function MusicVenuesPage() {
  return (
    <>
      <TopicNav topic="Music Venues" colour="#264653" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Music Venues"
          question="Are grassroots music venues dying?"
          finding="The UK has lost a third of its grassroots music venues since 2007, from 1,170 to 780. In 2023 alone, 125 venues closed — the highest single-year loss on record — driven by energy costs, licensing fees, and noise complaints."
          colour="#264653"
          preposition="for"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Britain&apos;s grassroots music venues are the seedbed of the country&apos;s most valuable cultural export. Adele played the Bluebird in Chelsea. Radiohead cut their teeth at the Jericho Tavern in Oxford. Yet the pipeline that produces globally successful artists is collapsing at source: the UK has lost a third of its grassroots venues since 2007, falling from 1,170 to just 780. The rate of closure is accelerating. In 2023, 125 venues shut their doors — more than two a week — driven by a toxic combination of soaring energy bills, rising business rates, tightening licensing conditions, and noise complaints from new residential developments built without adequate soundproofing. The Music Venue Trust estimates that the average grassroots venue now operates on margins of less than 2%, leaving no buffer against even modest cost increases.<Cite nums={1} /></p>
            <p>The economic consequences extend well beyond the venues themselves. UK Music calculates that the live music sector contributes over £4 billion to the UK economy annually, and grassroots venues are the entry point for the entire talent pipeline. When small venues close, emerging artists lose the only affordable spaces to develop their craft, build audiences, and attract industry attention. The sector&apos;s turnover has fallen 15% since 2019, to £2 billion, even as demand for live music from audiences has surged. Some local authorities have begun adopting the &quot;Agent of Change&quot; principle — requiring new housing developments near existing venues to bear the cost of soundproofing — but implementation remains patchy, and the broader funding model for small venues is still broken.<Cite nums={2} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="Grassroots music venues (UK)"
          value="780"
          unit=""
          direction="down"
          polarity="up-is-good"
          changeText="2024 · MVT · Down from 1,170 in 2007"
          sparklineData={[1170, 1100, 1020, 960, 910, 870, 840, 820, 800, 790, 780]}
          source="Music Venue Trust — Annual Review 2024"
        />
        <MetricCard
          label="Venues closed in 2023"
          value="125"
          unit=""
          direction="up"
          polarity="up-is-bad"
          changeText="2024 · MVT · Record single-year closure"
          sparklineData={[40, 45, 55, 60, 50, 40, 35, 80, 95, 125]}
          source="MVT 2024"
        />
        <MetricCard
          label="Grassroots music sector turnover"
          value="£2.0B"
          unit=""
          direction="down"
          polarity="up-is-good"
          changeText="2024 · UK Music · Down 15% from 2019"
          sparklineData={[2.35, 2.4, 0.8, 1.6, 1.9, 2.0]}
          source="UK Music 2024"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="music-venues" />
      </main>
    </>
  );
}
