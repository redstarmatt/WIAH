'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'DESNZ', dataset: 'EPC Database', url: 'https://www.gov.uk/government/statistical-data-sets/live-tables-on-energy-performance-of-buildings-certificates', date: '2024' },
  { num: 2, name: 'Ofgem', dataset: 'Typical Domestic Consumption Values', url: 'https://www.ofgem.gov.uk/information-for-household-consumers/energy-bill', date: '2024' }
];

export default function EnergyEfficiencyHomesPage() {
  return (
    <>
      <TopicNav topic="Home Energy Efficiency" colour="#2A9D8F" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Home Energy Efficiency"
          question="How efficient are UK homes?"
          finding="Just 5.8% of homes have an A or B EPC rating — up from 0.8% in 2012 but still tiny. Average household energy bills have fallen from the £2,500 peak to £1,680, but 47% of homes still fall below the government's target."
          colour="#2A9D8F"
          preposition="in"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="Homes at EPC A or B"
          value="5.8%"
          unit=""
          direction="up"
          polarity="up-is-good"
          changeText="2024 · DESNZ · Up from 0.8% in 2012"
          sparklineData={[0.8, 1.2, 1.8, 2.5, 3.2, 4.0, 4.8, 5.8]}
          source="DESNZ — EPC Data 2024"
        />
        <MetricCard
          label="Homes with EPC below C"
          value="47%"
          unit=""
          direction="down"
          polarity="up-is-bad"
          changeText="2024 · DESNZ · Target: C or above by 2035"
          sparklineData={[61, 58, 55, 52, 50, 49, 48, 47]}
          source="DESNZ 2024"
        />
        <MetricCard
          label="Household energy spend (avg)"
          value="£1,680/yr"
          unit=""
          direction="down"
          polarity="up-is-bad"
          changeText="2024 · Ofgem · Down from £2,500 peak in 2023"
          sparklineData={[1200, 1100, 1050, 1100, 1150, 2500, 2100, 1800, 1680]}
          source="Ofgem 2024"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="energy-efficiency-homes" />
      </main>
    </>
  );
}
