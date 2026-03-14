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

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK&apos;s public EV charging network has grown at remarkable speed — from 5,000 charge points in 2016 to 64,000 today — but the headline figure conceals two problems that risk undermining the electric vehicle transition. The first is reliability. At any given time, 22% of public charge points are out of service, a rate that would be considered unacceptable for any other piece of critical infrastructure. Broken screens, failed payment systems, and software faults leave drivers stranded at chargers that appear available on apps but refuse to function on arrival. The Public Charge Point Regulations introduced in 2023 require a 99% reliability rate for rapid chargers, but enforcement remains weak and the target applies only to new installations, leaving thousands of older units outside its scope.<Cite nums={1} /></p>
            <p>The second problem is geography. London has 89 public charge points per 100,000 residents; the East Midlands has 28. This threefold disparity reflects the economics of charger deployment: private operators install where utilisation rates justify the investment, which means affluent urban areas with high EV ownership, not the rural and post-industrial communities where public charging would matter most — precisely because residents there are less likely to have off-street parking and home chargers. The government&apos;s Local Electric Vehicle Infrastructure fund is designed to address this, channelling &pound;381 million to local authorities for on-street and community charging. But rollout has been slow, hampered by grid connection delays, planning constraints, and the sheer complexity of installing electrical infrastructure in streets designed for gas lamps. Without a step change in both reliability and regional equity, the charging network risks becoming another example of infrastructure that serves those who need it least.<Cite nums={2} /></p>
          </div>
        </section>

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
