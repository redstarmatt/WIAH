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
  { num: 1, name: 'Cefas', dataset: 'Stock Assessment Reports', url: 'https://www.cefas.co.uk/data-and-publications/fish-stock-assessments/', date: '2023' },
  { num: 2, name: 'MMO', dataset: 'UK Sea Fisheries Statistics', url: 'https://www.gov.uk/government/collections/uk-sea-fisheries-annual-statistics', date: '2023' }
];

export default function FishingStocksPage() {
  return (
    <>
      <TopicNav topic="Fishing Stocks" colour="#264653" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Fishing Stocks"
          question="Are UK fish stocks recovering?"
          finding="59% of UK fish stocks are at sustainable levels, up from 40% in 2010. But Brexit has complicated quota arrangements and commercial catch has fallen 18% since then."
          colour="#264653"
          preposition="in"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The ecological story of UK fish stocks is genuinely encouraging. In 2010, only 40% of assessed stocks were being fished at or below sustainable levels; by 2023 that figure had risen to 59%, the result of two decades of quota discipline, improved stock science, and the gradual recovery of species like North Sea cod and herring.<Cite nums={1} /> Marine Protected Areas now cover 38% of UK waters, at least on paper. But the political and economic picture is far more turbulent. Brexit was sold partly on the promise of taking back control of British fishing grounds. In practice, the Trade and Cooperation Agreement preserved most EU vessels' access rights, while UK exporters lost frictionless access to their largest market. Shellfish producers in particular were devastated: a ban on live bivalve exports to the EU remains in place, and the administrative burden of health certificates and customs declarations has driven some small operators out of business entirely.</p>
            <p>The commercial consequences are stark. UK catch volumes fell 18% between 2019 and 2023, a decline driven not by conservation measures but by trade friction, crew shortages, and rising fuel costs.<Cite nums={2} /> The fishing fleet has contracted to around 4,300 vessels, down from over 6,000 in 2010, with the sharpest losses among the small inshore boats that form the backbone of coastal communities in Cornwall, the Scottish Highlands, and East Anglia. Meanwhile, the UK imports roughly 70% of the fish it consumes — primarily warm-water species like tuna and prawns that cannot be caught in British waters — while exporting much of what it does catch, particularly mackerel and langoustine. This structural mismatch means that the health of UK fish stocks, while genuinely improving, tells only part of the story of a fishing industry navigating profound structural change.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="UK fish stocks at sustainable levels"
          value="59%"
          unit=""
          direction="up"
          polarity="up-is-good"
          changeText="2023 · Cefas · Up from 40% in 2010"
          sparklineData={[40, 42, 44, 46, 48, 51, 54, 56, 58, 59]}
          source="Cefas — Stock Assessment Reports 2023"
        />
        <MetricCard
          label="UK commercial catch volume"
          value="535,000 t"
          unit=""
          direction="down"
          polarity="up-is-good"
          changeText="2023 · MMO · Down 18% since Brexit"
          sparklineData={[655000, 640000, 620000, 600000, 580000, 570000, 560000, 550000, 535000]}
          source="MMO — UK Sea Fisheries Statistics 2023"
        />
        <MetricCard
          label="Marine Protected Areas (UK waters)"
          value="38%"
          unit=""
          direction="up"
          polarity="up-is-good"
          changeText="2024 · JNCC · But enforcement weak"
          sparklineData={[24, 26, 28, 30, 32, 34, 36, 37, 38]}
          source="JNCC 2024"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="fishing-stocks" />
      </main>
    </>
  );
}
