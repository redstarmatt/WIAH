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
  { num: 1, name: 'Soil Association', dataset: 'Organic Market Report', url: 'https://www.soilassociation.org/organic-living/market-report/', date: '2024' },
  { num: 2, name: 'Defra', dataset: 'Agriculture in the UK', url: 'https://www.gov.uk/government/statistical-data-sets/agriculture-in-the-united-kingdom', date: '2024' }
];

export default function OrganicFarmingPage() {
  return (
    <>
      <TopicNav topic="Organic Farming" colour="#2A9D8F" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Organic Farming"
          question="Is organic farming growing fast enough?"
          finding="UK organic farmland covers just 3.1% of agricultural land — compared to the EU average of 9.6%. The organic market has grown to a record £3.4 billion, but production lags demand."
          colour="#2A9D8F"
          preposition="in"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Britain's organic sector presents a striking paradox: consumer demand has never been higher, yet domestic production remains stubbornly low. The organic market hit a record £3.4 billion in 2024, with double-digit growth in dairy, fresh produce, and home delivery boxes.<Cite nums={1} /> But only 3.1% of UK farmland is certified organic, compared to 9.6% across the EU, 26% in Austria, and 20% in Estonia. The gap is widening, not closing. While the EU's Farm to Fork strategy targets 25% organic land by 2030, the UK has no equivalent national target. The result is rising import dependency: roughly half of all organic food sold in British supermarkets is now sourced from abroad, undermining both the environmental rationale and the food security case for organic production.</p>
            <p>The barriers to conversion are well understood but poorly addressed. Transitioning a conventional farm to organic certification takes two to three years, during which yields typically fall 20-30% while the farmer cannot yet command organic premiums.<Cite nums={2} /> Under the old Common Agricultural Policy, conversion subsidies partially bridged this gap. Post-Brexit, England's Environmental Land Management schemes offer payments for organic management, but at rates that farmers' unions argue are insufficient to offset the income risk. Scotland and Wales have maintained more generous support, and their organic land shares are correspondingly higher. The 6,200 certified organic producers in the UK represent a 12% increase over three years — genuine growth, but from a base so low that it will take decades at this pace to match European peers. Without a step-change in policy ambition, Britain's organic sector will remain a premium consumer niche rather than the agricultural transformation its advocates envision.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="UK organic farmland"
          value="3.1%"
          unit=""
          direction="up"
          polarity="up-is-good"
          changeText="2024 · Soil Association · EU avg: 9.6%"
          sparklineData={[3.4, 3.1, 2.8, 2.6, 2.4, 2.3, 2.4, 2.6, 2.8, 3.0, 3.1]}
          source="Soil Association — Organic Market Report 2024"
        />
        <MetricCard
          label="Certified organic producers"
          value="6,200"
          unit=""
          direction="up"
          polarity="up-is-good"
          changeText="2024 · Soil Association · +12% in 3 years"
          sparklineData={[5300, 5400, 5500, 5600, 5700, 5800, 5900, 6000, 6100, 6200]}
          source="Soil Association 2024"
        />
        <MetricCard
          label="UK organic market value"
          value="£3.4B/yr"
          unit=""
          direction="up"
          polarity="up-is-good"
          changeText="2024 · Soil Association · Record high"
          sparklineData={[1.8, 1.9, 2.1, 2.2, 2.4, 2.6, 2.8, 3.0, 3.2, 3.4]}
          source="Soil Association 2024"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="organic-farming" />
      </main>
    </>
  );
}
