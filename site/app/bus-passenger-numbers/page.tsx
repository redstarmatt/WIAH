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
  { num: 1, name: 'DfT', dataset: 'Bus Statistics', url: 'https://www.gov.uk/government/collections/bus-statistics', date: '2024' },
  { num: 2, name: 'Campaign for Better Transport', dataset: 'Bus Report', url: 'https://bettertransport.org.uk/', date: '2024' }
];

export default function BusPassengerNumbersPage() {
  return (
    <>
      <TopicNav topic="Bus Passenger Numbers" colour="#F4A261" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Bus Passenger Numbers"
          question="Are people giving up on the bus?"
          finding="Bus passengers in England outside London have fallen by 45% since 2004 — from 2.9 billion to 1.6 billion journeys per year. Bus route mileage has been cut by 28% since 2010."
          colour="#F4A261"
          preposition="in"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The collapse of bus ridership outside London is one of the starkest indicators of how public transport policy has failed provincial England. Since 2004, passenger numbers have fallen by 45% — from 2.9 billion journeys to 1.6 billion — a decline that predates the pandemic and has only been partially reversed since. The mechanism is self-reinforcing: local authorities, facing sustained austerity-era budget cuts, reduced subsidies for commercially marginal routes; operators responded by cutting 28% of total route mileage since 2010, eliminating evening, weekend, and rural services first; passengers who could drive switched to cars, further eroding the revenue base. Outside London, where Transport for London controls routes, fares, and frequencies through a regulated franchise model, no comparable authority exists. The result is a deregulated market that works tolerably in dense urban corridors and fails almost everywhere else.<Cite nums={1} /></p>
            <p>The government&apos;s response has combined short-term fare interventions — the &pound;2 bus fare cap, introduced in January 2023 — with longer-term ambitions around Bus Service Improvement Plans. Early evidence suggests the fare cap has stabilised, and in some areas modestly increased, passenger numbers, but without accompanying frequency improvements it cannot reverse the structural decline. Meanwhile, the fleet is undergoing a quiet transformation: zero-emission buses now account for 7.2% of the national fleet, up from 0.5% in 2019, driven by the ZEBRA funding scheme. But green buses on shrinking networks solve an emissions problem without addressing the mobility crisis. For the millions of people who depend on buses — disproportionately the young, the elderly, and those on low incomes — the question is not what fuel the bus uses but whether one turns up at all.<Cite nums={2} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="Bus journeys (England, outside London)"
          value="1.60B/yr"
          unit=""
          direction="down"
          polarity="up-is-good"
          changeText="2024 · DfT · Down 45% from 2.9B in 2004"
          sparklineData={[2.9, 2.7, 2.5, 2.4, 2.2, 2.1, 2.0, 1.5, 1.7, 1.7, 1.6]}
          source="DfT — Bus Statistics 2024"
        />
        <MetricCard
          label="Bus route mileage cuts (2010-24)"
          value="-28%"
          unit=""
          direction="down"
          polarity="up-is-good"
          changeText="2024 · CBT · 140M fewer miles operated"
          sparklineData={[100, 97, 94, 90, 87, 84, 82, 80, 78, 76, 72]}
          source="Campaign for Better Transport 2024"
        />
        <MetricCard
          label="Zero-emission buses in fleet"
          value="7.2%"
          unit=""
          direction="up"
          polarity="up-is-good"
          changeText="2024 · DfT · Up from 0.5% in 2019"
          sparklineData={[0.5, 1.0, 1.8, 3.0, 4.5, 5.8, 7.2]}
          source="DfT 2024"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="bus-passenger-numbers" />
      </main>
    </>
  );
}
