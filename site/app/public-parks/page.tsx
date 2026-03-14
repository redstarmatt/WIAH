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
  { num: 1, name: 'Heritage Lottery Fund', dataset: 'State of UK Public Parks', url: 'https://www.heritagefund.org.uk/', date: '2024' },
  { num: 2, name: 'Natural England', dataset: 'MENE Survey', url: 'https://www.gov.uk/government/collections/monitor-of-engagement-with-the-natural-environment-survey', date: '2024' }
];

export default function PublicParksPage() {
  return (
    <>
      <TopicNav topic="Public Parks" colour="#2A9D8F" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Public Parks"
          question="Are public parks being abandoned?"
          finding="Local authority parks budgets have fallen 68% in real terms since 2010. Over a third of parks are now in poor or fair condition, yet they remain one of the most-used public assets in the country."
          colour="#2A9D8F"
          preposition="in"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Public parks are one of the few remaining truly universal services in Britain. They are free at the point of use, open to everyone, and visited by nearly 60% of adults on a weekly basis. They are also, unlike most public assets, not protected by any statutory duty of maintenance. That combination — high use, no legal protection — has made them uniquely vulnerable to austerity. Since 2010, local authority spending on parks and open spaces has fallen by 68% in real terms, a deeper cut than almost any other area of council provision.<Cite nums={1} /> The Heritage Lottery Fund, which spent over a billion pounds restoring parks from 1996 to 2017, has largely moved on. The result is a slow, visible decline: broken benches, overgrown borders, shuttered park buildings, and the gradual loss of skilled horticultural staff who cannot be easily replaced.</p>
            <p>The paradox is that parks have never been more valued. The pandemic confirmed what public health researchers had long argued: access to green space is a measurable determinant of physical and mental health, and its benefits fall disproportionately on those with the fewest alternatives.<Cite nums={2} /> Yet the people who most need parks — residents of dense urban areas, those without private gardens, communities with higher rates of obesity and mental illness — are often those whose parks are in the worst condition. Over a third of UK parks now rate as fair or poor. Some councils have begun exploring commercial income, trust models, and community ownership to fill the gap, but these are sticking-plaster solutions to what is fundamentally a failure to treat public green space as essential infrastructure.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="Parks budget cuts (2010-2024)"
          value="-68%"
          unit=""
          direction="down"
          polarity="up-is-good"
          changeText="2024 · Heritage Lottery Fund · Real-terms"
          sparklineData={[100, 88, 76, 65, 55, 48, 42, 38, 35, 33, 32]}
          source="Heritage Lottery Fund — State of UK Public Parks 2024"
        />
        <MetricCard
          label="Parks with good condition rating"
          value="55%"
          unit=""
          direction="down"
          polarity="up-is-good"
          changeText="2024 · Green Flag data · Down from 66% in 2015"
          sparklineData={[66, 65, 63, 61, 60, 58, 57, 56, 55]}
          source="Green Flag Award 2024"
        />
        <MetricCard
          label="Adults visiting parks weekly"
          value="59%"
          unit=""
          direction="flat"
          polarity="up-is-good"
          changeText="2024 · MENE survey · Stable but inequality growing"
          sparklineData={[58, 59, 60, 62, 68, 65, 61, 59]}
          source="Natural England — MENE Survey 2024"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="public-parks" />
      </main>
    </>
  );
}
