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
  { num: 1, name: 'Transport Scotland', dataset: 'Ferry Services Performance Reports', url: 'https://www.transport.gov.scot/', date: '2024' },
  { num: 2, name: 'Passenger Shipping Association', dataset: 'Annual Report', url: 'https://www.psa-psara.org/', date: '2024' }
];

export default function FerryRoutesPage() {
  return (
    <>
      <TopicNav topic="Ferry Routes" colour="#264653" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Ferry Routes"
          question="Are UK ferry services being cut?"
          finding="The UK has lost 14 domestic ferry routes since 2010 — from 72 to 58 active routes. Scottish island ferry reliability has fallen from 88% to 78%, threatening connectivity for remote communities."
          colour="#264653"
          preposition="on"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>For dozens of communities across the British Isles, ferry services are not a leisure amenity but the only link to hospitals, schools, and shops on the mainland. Yet the UK&apos;s domestic ferry network has contracted steadily over the past fifteen years, shrinking from 72 active routes in 2010 to just 58 today. The losses span the country: cross-Solent services have been reduced, Clyde routes consolidated, and smaller island connections in the Hebrides and Northern Isles cut back or mothballed entirely. The drivers are familiar — ageing vessels, rising fuel costs, thin passenger volumes outside summer months — but the consequences are uniquely severe for island populations who have no alternative mode of transport.<Cite nums={1} /></p>
            <p>Scotland&apos;s island ferry crisis has become a defining infrastructure failure. CalMac&apos;s reliability rate has fallen from 88% to 78% over the past decade, meaning more than one in five scheduled sailings are now cancelled or significantly delayed. The root cause is an ageing fleet that successive governments failed to replace on schedule: the two vessels under construction at Ferguson Marine, originally due in 2018, remain years behind schedule and hundreds of millions over budget. For communities on islands like Arran, Mull, and the Uists, unreliable ferries translate directly into business closures, population decline, and an inability to access time-critical healthcare. The Scottish Government has pledged a fleet renewal programme, but with four operators now in financial distress across the UK and construction capacity constrained, the timeline for recovery stretches well into the next decade.<Cite nums={2} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="UK domestic ferry routes"
          value="58"
          unit=""
          direction="down"
          polarity="up-is-good"
          changeText="2024 · PSA · Down from 72 in 2010"
          sparklineData={[72, 70, 68, 66, 64, 63, 62, 61, 60, 59, 58]}
          source="Passenger Shipping Association 2024"
        />
        <MetricCard
          label="Scottish island ferry reliability"
          value="78%"
          unit=""
          direction="down"
          polarity="up-is-good"
          changeText="2024 · Transport Scotland · Services run on time"
          sparklineData={[88, 86, 84, 83, 82, 81, 80, 80, 79, 78]}
          source="Transport Scotland 2024"
        />
        <MetricCard
          label="Ferry operators in financial distress"
          value="4"
          unit=""
          direction="up"
          polarity="up-is-bad"
          changeText="2024 · Reporting losses or restructuring"
          sparklineData={[0, 0, 1, 1, 2, 2, 3, 4]}
          source="PSA / annual reports 2024"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="ferry-routes" />
      </main>
    </>
  );
}
