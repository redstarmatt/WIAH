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
  { num: 1, name: 'VisitEngland', dataset: 'Great British Tourism Survey', url: 'https://www.visitbritain.org/', date: '2024' },
  { num: 2, name: 'EA', dataset: 'Bathing Water Quality', url: 'https://environment.data.gov.uk/bwq/profiles/', date: '2024' }
];

export default function CoastalTourismPage() {
  return (
    <>
      <TopicNav topic="Coastal Tourism" colour="#264653" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Coastal Tourism"
          question="What's happening to Britain's seaside?"
          finding="Domestic coastal trips have bounced back to 76 million annually — 12% above pre-pandemic levels — but sewage pollution is undermining beach quality, with only 69% of coastal bathing waters rated Good or Excellent."
          colour="#264653"
          preposition="in"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The British seaside is experiencing a paradox: more popular than ever, yet increasingly undermined by the very infrastructure failures that should have been resolved decades ago. Domestic coastal trips have surged to 76 million per year — 12% above pre-pandemic levels — as the staycation boom, driven initially by Covid travel restrictions, has become a lasting shift in holiday behaviour. Coastal towns from Whitby to Tenby report record footfall. But beneath the surface, literally, the picture is far less rosy. Sewage discharges into coastal waters have become a defining environmental scandal, and the consequences are now showing up in the data: the proportion of bathing waters rated Good or Excellent has fallen from 75% to 69% since 2019, reversing years of gradual improvement.<Cite nums={1} /></p>
            <p>The economic toll is mounting on both sides of the equation. Some 3,200 seaside accommodation businesses have closed since 2019, squeezed between rising energy costs, seasonal staffing shortages exacerbated by post-Brexit labour market changes, and the reputational damage that follows publicised sewage spills. For communities where tourism accounts for 20-30% of local employment, this is not an abstract environmental concern — it is an existential economic threat. The Environment Agency&apos;s own monitoring shows that storm overflow discharges at coastal outfalls have increased in both frequency and duration, yet water company investment in coastal infrastructure remains a fraction of what is spent on inland sewerage. The seaside economy is being asked to absorb the costs of decades of underinvestment in water treatment.<Cite nums={2} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="UK coastal domestic trips"
          value="76M/yr"
          unit=""
          direction="up"
          polarity="up-is-good"
          changeText="2024 · VisitEngland · Up 12% from pre-pandemic"
          sparklineData={[68, 70, 72, 65, 40, 58, 67, 71, 74, 76]}
          source="VisitEngland — Great British Tourism Survey 2024"
        />
        <MetricCard
          label="Coastal Good-rated bathing waters"
          value="69%"
          unit=""
          direction="down"
          polarity="up-is-good"
          changeText="2024 · EA · Down from 75% in 2019"
          sparklineData={[75, 75, 75, 76, 77, 76, 74, 72, 70, 69]}
          source="EA — Bathing Water Quality 2024"
        />
        <MetricCard
          label="Seaside accommodation closed (2019-24)"
          value="3,200"
          unit=""
          direction="up"
          polarity="up-is-bad"
          changeText="2024 · ONS"
          sparklineData={[0, 400, 900, 1600, 2400, 3200]}
          source="ONS Business Demography 2024"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="coastal-tourism" />
      </main>
    </>
  );
}
