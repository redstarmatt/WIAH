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
  { num: 1, name: 'NPCA', dataset: 'National Parks Authorities', url: 'https://www.nationalparks.uk/', date: '2024' },
  { num: 2, name: 'Natural England', dataset: 'MENE Survey', url: 'https://www.gov.uk/government/collections/monitor-of-engagement-with-the-natural-environment-survey', date: '2024' }
];

export default function NationalParksAccessPage() {
  return (
    <>
      <TopicNav topic="National Parks Access" colour="#2A9D8F" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="National Parks Access"
          question="Who can actually access national parks?"
          finding="Only 6% of visitors to UK national parks come from BAME communities, despite being 14% of the population. Park authority budgets have been cut 31% in real terms since 2010, reducing ranger services."
          colour="#2A9D8F"
          preposition="to"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK's fifteen national parks cover 10% of England and Wales, yet they remain among the most socially stratified public spaces in the country. Just 6% of visitors identify as being from Black, Asian, or minority ethnic backgrounds, despite these communities making up 18% of the population of England and Wales. The disparity is not simply a matter of preference. National parks were designated in the 1950s in remote upland areas, far from the cities where most ethnic minority populations live, and the culture surrounding them — walking clubs, outdoor gear, country pubs — has historically been unwelcoming to those outside a narrow demographic.<Cite nums={1} /> Transport is a further barrier: fewer than a third of national park entry points are accessible by public transport, making car ownership effectively a prerequisite for a day trip.</p>
            <p>Budget cuts have compounded the access problem. Park authority funding has fallen 31% in real terms since 2010, leading to the loss of ranger posts, education officers, and outreach programmes — precisely the roles that connect underserved communities to the landscape.<Cite nums={1} /> Meanwhile, 44% of the UK population lives within 30 minutes of a national park boundary, a statistic that obscures the reality that proximity alone does not equal access.<Cite nums={2} /> Some park authorities have begun targeted work with urban communities, subsidised transport schemes, and diversified marketing, but these remain small-scale and grant-dependent. The fundamental question is whether national parks are genuinely national — open to and used by the whole population — or whether they function as a subsidised amenity for a predominantly white, middle-class, car-owning minority. The data, so far, points firmly toward the latter.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="BAME national park visitors"
          value="6%"
          unit=""
          direction="up"
          polarity="up-is-good"
          changeText="2024 · NPCA · Up from 1% in 2000 · Still underrepresented"
          sparklineData={[1, 2, 2, 3, 3, 4, 4, 5, 5, 6]}
          source="NPCA 2024"
        />
        <MetricCard
          label="Park authority budgets (real)"
          value="-31%"
          unit=""
          direction="down"
          polarity="up-is-good"
          changeText="2010-2024 · NPCA"
          sparklineData={[100, 93, 86, 80, 76, 74, 72, 71, 70, 69, 69]}
          source="NPCA 2024"
        />
        <MetricCard
          label="UK residents within 30min of park"
          value="44%"
          unit=""
          direction="flat"
          polarity="up-is-good"
          changeText="2024 · NPCA · Unchanged"
          sparklineData={[44, 44, 44, 44, 44, 44]}
          source="NPCA 2024"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="national-parks-access" />
      </main>
    </>
  );
}
