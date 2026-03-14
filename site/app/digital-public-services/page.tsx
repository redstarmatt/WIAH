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
  { num: 1, name: 'GDS', dataset: 'Government Digital Performance', url: 'https://www.gov.uk/performance', date: '2024' },
  { num: 2, name: 'ONS', dataset: 'Internet Access Survey', url: 'https://www.ons.gov.uk/businessindustryandtrade/itandinternetindustry/bulletins/internetusers/2024', date: '2024' }
];

export default function DigitalPublicServicesPage() {
  return (
    <>
      <TopicNav topic="Digital Public Services" colour="#264653" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Digital Public Services"
          question="Can you actually use government digital services?"
          finding="Government Digital Service satisfaction has improved to 74% in 2024. But 8.5 million adults still cannot use digital services, risking exclusion from benefits, healthcare and other essential support."
          colour="#264653"
          preposition="in"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The digitisation of government services is one of the quieter success stories of the past decade. Since the Government Digital Service was established in 2011, hundreds of transactions — from filing tax returns to renewing passports — have been moved online, and user satisfaction has climbed steadily to 74%, with completion rates now approaching 80%.<Cite nums={1} /> The savings have been substantial: digital transactions cost roughly 50 times less than face-to-face ones. For the majority of the population, interacting with the state is now faster, simpler, and more reliable than it has ever been. The design standards pioneered by GDS have been adopted by governments worldwide.</p>
            <p>But the efficiency gains come with a sharp equity problem. An estimated 8.5 million adults in the UK still lack the basic digital skills or internet access needed to use online services — down from 12.6 million in 2018, but still a substantial minority concentrated among the elderly, the disabled, those on low incomes, and people whose first language is not English.<Cite nums={2} /> As digital channels become the default, non-digital alternatives are being quietly withdrawn: fewer phone lines, shorter counter opening hours, closed local offices. The result is that those least equipped to navigate online systems are increasingly shut out of benefits claims, healthcare bookings, and housing applications. The challenge now is not whether digital services work — they do, for most people — but whether the drive toward efficiency has created a two-tier state in which the most vulnerable are the hardest to reach.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="Govt digital services satisfaction"
          value="74%"
          unit=""
          direction="up"
          polarity="up-is-good"
          changeText="2024 · GDS · Up from 64% in 2018"
          sparklineData={[64, 66, 68, 70, 72, 73, 74]}
          source="GDS — Performance Dashboard 2024"
        />
        <MetricCard
          label="Online service completion rate"
          value="79%"
          unit=""
          direction="up"
          polarity="up-is-good"
          changeText="2024 · GDS · Up from 58% in 2014"
          sparklineData={[58, 62, 66, 70, 73, 76, 78, 79]}
          source="GDS 2024"
        />
        <MetricCard
          label="Adults unable to use digital services"
          value="8.5M"
          unit=""
          direction="down"
          polarity="up-is-bad"
          changeText="2024 · ONS · Down from 12.6M in 2018"
          sparklineData={[12.6, 11.8, 11.0, 10.2, 9.5, 9.0, 8.7, 8.5]}
          source="ONS — Internet Access 2024"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="digital-public-services" />
      </main>
    </>
  );
}
