'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'DfT', dataset: 'EV Charging Infrastructure Statistics', url: 'https://www.gov.uk/government/collections/electric-vehicle-charging-infrastructure-statistics', date: '2024' },
  { num: 2, name: 'Which?', dataset: 'EV Charging Investigation', url: 'https://www.which.co.uk/', date: '2024' }
];

export default function EvChargingPublicPage() {
  return (
    <>
      <TopicNav topic="Public EV Charging" colour="#2A9D8F" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Public EV Charging"
          question="Can you actually charge an electric car in the UK?"
          finding="The UK now has 64,000 public charge points — up from just 5,000 in 2016 — but 22% are out of service at any given time. Distribution remains deeply unequal across regions."
          colour="#2A9D8F"
          preposition="with"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="Public EV charge points (UK)"
          value="64,000"
          unit=""
          direction="up"
          polarity="up-is-good"
          changeText="2024 · Zap-Map · Up from 35K in 2022"
          sparklineData={[5000, 10000, 17000, 25000, 35000, 46000, 56000, 64000]}
          source="Zap-Map — Chargepoint Data 2024"
        />
        <MetricCard
          label="Charge points per 100K pop (worst region)"
          value="28"
          unit=""
          direction="up"
          polarity="up-is-good"
          changeText="2024 · DfT · East Midlands worst · London: 89 per 100K"
          sparklineData={[5, 8, 12, 16, 20, 24, 26, 28]}
          source="DfT — EV Charging Infrastructure Statistics 2024"
        />
        <MetricCard
          label="Public charger out-of-service rate"
          value="22%"
          unit=""
          direction="down"
          polarity="up-is-bad"
          changeText="2024 · Which? · Down from 26%"
          sparklineData={[26, 26, 25, 24, 23, 22]}
          source="Which? — EV Charging Investigation 2024"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="ev-charging-public" />
      </main>
    </>
  );
}
