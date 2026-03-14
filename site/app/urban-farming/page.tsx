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
  { num: 1, name: 'RHS', dataset: 'Campaign for School Gardening', url: 'https://schoolgardening.rhs.org.uk/', date: '2024' },
  { num: 2, name: 'AHDB', dataset: 'UK Horticulture Market Overview', url: 'https://ahdb.org.uk/horticulture', date: '2024' }
];

export default function UrbanFarmingPage() {
  return (
    <>
      <TopicNav topic="Urban Farming" colour="#2A9D8F" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Urban Farming"
          question="Is urban farming taking off in the UK?"
          finding="The UK's urban farming sector has grown 240% since 2015, reaching 1,450 enterprises. Vertical farm investment has surged to £380 million cumulative, driven by food security concerns."
          colour="#2A9D8F"
          preposition="in"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Something remarkable is happening in the margins of British cities. Since 2015, the number of urban farming enterprises in the UK has grown 240% to roughly 1,450, spanning community allotments, rooftop gardens, hydroponic shipping containers, and high-tech vertical farms. Cumulative investment in vertical farming alone has reached £380 million, with major facilities in Gloucestershire, Kent, and Aberdeenshire growing leafy greens and herbs year-round under LED lighting.<Cite nums={1} /> The drivers are practical rather than ideological. The UK imports roughly 84% of its fresh fruit and 46% of its vegetables, supply chains that proved fragile during Covid lockdowns and were further strained by post-Brexit border checks and the energy price spike of 2022. Urban farming cannot replace broadacre agriculture, but it can shorten supply chains for perishable crops: a vertical farm in east London can deliver salad leaves to a supermarket distribution centre within hours of harvest, eliminating the five-to-seven-day cold chain from southern Spain.</p>
            <p>The sector's growth is unevenly distributed and not without setbacks. Several high-profile vertical farm ventures have entered administration, unable to reconcile energy-intensive growing systems with volatile electricity prices. The economics remain challenging: producing a kilogram of vertically farmed lettuce costs roughly three times what a conventional grower spends, a gap that narrows only at scale or with renewable energy contracts.<Cite nums={2} /> Community-level urban farming tells a different story. There are now over 11,200 school growing programmes in England, up 18% since 2019, and waiting lists for council allotments have lengthened to an average of three years in major cities. These grassroots operations produce relatively little food in aggregate, but they build skills, improve mental health, and reconnect urban populations with food production in ways that have measurable social value. The question is whether urban farming can move beyond its current status as a patchwork of well-intentioned projects and venture-backed experiments to become a meaningful component of UK food security.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="Urban farming enterprises (UK)"
          value="1,450"
          unit=""
          direction="up"
          polarity="up-is-good"
          changeText="2024 · Estimated · Up 240% since 2015"
          sparklineData={[430, 490, 570, 680, 820, 960, 1080, 1200, 1340, 1450]}
          source="Agri-TechE / Vertical Farm Industry estimates 2024"
        />
        <MetricCard
          label="Vertical farm investment (UK, cumulative)"
          value="£380M"
          unit=""
          direction="up"
          polarity="up-is-good"
          changeText="2024 · Up from near-zero in 2018"
          sparklineData={[5, 15, 40, 85, 140, 210, 290, 380]}
          source="AHDB / industry estimates 2024"
        />
        <MetricCard
          label="School growing programmes"
          value="11,200"
          unit=""
          direction="up"
          polarity="up-is-good"
          changeText="2024 · RHS · Up 18% since 2019"
          sparklineData={[8500, 9000, 9400, 9800, 10200, 10600, 10900, 11200]}
          source="RHS Campaign for School Gardening 2024"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="urban-farming" />
      </main>
    </>
  );
}
