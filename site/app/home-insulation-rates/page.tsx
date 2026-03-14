'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'DESNZ', dataset: 'Energy Company Obligation Statistics', url: 'https://www.gov.uk/government/collections/energy-company-obligation', date: '2024' },
  { num: 2, name: 'DESNZ', dataset: 'English Housing Survey Energy Data', url: 'https://www.gov.uk/government/collections/english-housing-survey', date: '2024' }
];

export default function HomeInsulationRatesPage() {
  return (
    <>
      <TopicNav topic="Home Insulation" colour="#2A9D8F" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Home Insulation"
          question="Why are UK homes still so badly insulated?"
          finding="47% of homes in England still have an EPC rating below C, despite a decade of insulation schemes. Government programmes are installing 220,000 homes per year — but need to reach 2.3 million per year to meet 2030 targets."
          colour="#2A9D8F"
          preposition="with"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="Homes insulated under govt schemes/yr"
          value="220,000"
          unit=""
          direction="up"
          polarity="up-is-good"
          changeText="2024 · DESNZ · But far short of 2030 target"
          sparklineData={[1000000, 900000, 700000, 500000, 300000, 180000, 160000, 190000, 220000]}
          source="DESNZ — Energy Company Obligation 2024"
        />
        <MetricCard
          label="Homes with EPC below C"
          value="47%"
          unit=""
          direction="down"
          polarity="up-is-bad"
          changeText="2024 · DESNZ · Down from 61% in 2012"
          sparklineData={[61, 58, 55, 52, 50, 49, 48, 47]}
          source="DESNZ — English Housing Survey Energy Data 2024"
        />
        <MetricCard
          label="ECO4 scheme delivery"
          value="110,000 homes"
          unit=""
          direction="up"
          polarity="up-is-good"
          changeText="2024 · DESNZ · Targeting fuel-poor households"
          sparklineData={[80000, 90000, 95000, 100000, 105000, 110000]}
          source="DESNZ 2024"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="home-insulation-rates" />
      </main>
    </>
  );
}
