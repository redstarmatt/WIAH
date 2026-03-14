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
  { num: 1, name: 'WRAP', dataset: 'Household Food Waste Report', url: 'https://www.wrap.ngo/taking-action/food-drink/topics/food-waste/household-food-waste', date: '2021' },
  { num: 2, name: 'IGD', dataset: 'Retailer Food Waste Reporting', url: 'https://www.igd.com/', date: '2024' }
];

export default function FoodWasteReductionPage() {
  return (
    <>
      <TopicNav topic="Food Waste" colour="#F4A261" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Food Waste"
          question="How much food is the UK throwing away?"
          finding="UK households waste 6.4 million tonnes of food every year — worth £730 per household — despite a 20% reduction since 2007. Supermarkets generate 1.1 million tonnes surplus of which only 250,000 tonnes is redistributed."
          colour="#F4A261"
          preposition="with"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK throws away 6.4 million tonnes of household food each year — roughly one-third of all food purchased. That figure is actually an improvement: WRAP estimates a 20% reduction since 2007, driven by public awareness campaigns like Love Food Hate Waste and improvements in date labelling.<Cite nums={1} /> But progress has stalled. The easy gains — better portion guidance on rice and pasta packets, clearer use-by versus best-before distinctions — have been captured. What remains is harder: the bread that goes stale because single-person households cannot eat a whole loaf before it moulds, the vegetables that wilt at the back of fridges, the leftovers that never get eaten. Food price inflation has sharpened the financial sting. At £730 per household per year, food waste now represents a larger share of family budgets than at any point in the past decade, yet the cost-of-living crisis has not produced the reduction in waste that economists might expect — suggesting that waste is driven as much by habit, infrastructure, and retail practices as by price sensitivity.</p>
            <p>The supply chain picture is equally troubling. UK supermarkets generate an estimated 1.1 million tonnes of food surplus annually, of which only 250,000 tonnes — less than a quarter — is redistributed through food banks and charities.<Cite nums={2} /> The remainder is sent to anaerobic digestion, composting, or landfill. Redistribution networks like FareShare and the Trussell Trust have scaled rapidly, but they face a structural mismatch: surplus is concentrated in distribution centres in the Midlands and South East, while food poverty is most acute in post-industrial towns and rural areas with poor transport links. The government's target of halving food waste by 2030, aligned with the UN Sustainable Development Goal, would require annual reductions of roughly 7% — more than double the current trajectory. Mandatory food waste reporting for large businesses, introduced in 2024, may accelerate progress, but the deeper challenge is systemic: a food system optimised for abundance and choice inherently generates waste, and no amount of consumer nudging will change that without structural reform to retail practices, supply chain logistics, and packaging design.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="Household food waste (England)"
          value="6.4M t/yr"
          unit=""
          direction="down"
          polarity="up-is-bad"
          changeText="2021 · WRAP · Down 20% from 2007"
          sparklineData={[8.0, 7.8, 7.5, 7.3, 7.0, 6.8, 6.6, 6.5, 6.4]}
          source="WRAP — Household Food Waste 2021"
        />
        <MetricCard
          label="Food waste cost per household"
          value="£730/yr"
          unit=""
          direction="up"
          polarity="up-is-bad"
          changeText="2024 · WRAP · Up due to food inflation"
          sparklineData={[470, 490, 510, 530, 570, 620, 680, 720, 730]}
          source="WRAP 2024"
        />
        <MetricCard
          label="Supermarket food waste surplus"
          value="1.1M t/yr"
          unit=""
          direction="up"
          polarity="up-is-bad"
          changeText="2024 · IGD · Only 250K t redistributed"
          sparklineData={[0.85, 0.88, 0.9, 0.93, 0.96, 1.0, 1.04, 1.07, 1.1]}
          source="IGD 2024"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="food-waste-reduction" />
      </main>
    </>
  );
}
