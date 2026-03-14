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
  { num: 1, name: 'NCVO', dataset: 'UK Civil Society Almanac', url: 'https://www.ncvo.org.uk/research-and-insight/uk-civil-society-almanac/', date: '2024' },
  { num: 2, name: 'DCMS', dataset: 'Community Life Survey', url: 'https://www.gov.uk/government/collections/community-life-survey--2', date: '2024' }
];

export default function VolunteeringDeclinePage() {
  return (
    <>
      <TopicNav topic="Volunteering Decline" colour="#6B7280" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Volunteering Decline"
          question="Are people giving up on volunteering?"
          finding="Formal volunteering has fallen from 44% to 40% of adults since 2012. The biggest decline is among under-35s, with cost of living pressures cited as the main barrier. The sector estimates 200 million volunteer hours have been lost since 2019."
          colour="#6B7280"
          preposition="in"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The decline in formal volunteering is one of those slow-moving trends that rarely makes headlines but steadily reshapes the fabric of communities. In 2012, 44% of UK adults volunteered formally at least once a year; by 2024, that figure had fallen to 40%, with regular monthly volunteering dropping from 29% to 25% over the same period.<Cite nums={1} /> The aggregate numbers understate the scale of loss: NCVO estimates that roughly 200 million volunteer hours have disappeared from the system since 2019 alone, equivalent to losing around 100,000 full-time workers from the charity and community sector. The decline is sharpest among adults under 35, where formal volunteering rates have fallen by nearly a third in a decade. Covid-19 initially prompted a surge of mutual aid and neighbourhood support, but this proved temporary — the informal networks that sprang up during lockdowns largely dissolved once restrictions lifted, and the formal volunteering infrastructure struggled to convert that goodwill into sustained commitment.</p>
            <p>The barriers are increasingly economic rather than attitudinal. The DCMS Community Life Survey found that cost of living pressures are now the single most cited reason for reducing or stopping volunteering, ahead of time constraints and health issues.<Cite nums={2} /> When people are working longer hours, taking second jobs, or cutting back on travel, unpaid commitments are among the first things to go. Transport costs matter particularly in rural areas, where volunteers may need to drive significant distances to reach the organisations they support. There is also a generational shift in how people engage: younger adults are more likely to volunteer episodically — for a specific event, campaign, or online task — rather than committing to regular weekly shifts at a charity shop or youth club. Organisations built around the assumption of a reliable corps of weekly volunteers are struggling to adapt. The implications ripple far beyond the voluntary sector itself: volunteer-run services — from lifeboat crews to hospital transport schemes to Scout groups — are the invisible infrastructure of British civic life, and their erosion leaves gaps that neither the state nor the market is positioned to fill.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="Formal volunteering at least once/year"
          value="40%"
          unit=""
          direction="down"
          polarity="up-is-good"
          changeText="2024 · NCVO · Down from 44% in 2012"
          sparklineData={[44, 43, 43, 42, 42, 41, 42, 42, 40, 40]}
          source="NCVO — UK Civil Society Almanac 2024"
        />
        <MetricCard
          label="Regular monthly volunteers"
          value="25%"
          unit=""
          direction="down"
          polarity="up-is-good"
          changeText="2024 · NCVO · Biggest drop among under-35s"
          sparklineData={[29, 28, 28, 27, 27, 26, 26, 26, 25, 25]}
          source="NCVO 2024"
        />
        <MetricCard
          label="Volunteer hours lost since 2019"
          value="200M hrs"
          unit=""
          direction="up"
          polarity="up-is-bad"
          changeText="2024 · NCVO estimate"
          sparklineData={[0, 20, 60, 110, 160, 190, 200]}
          source="NCVO 2024"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="volunteering-decline" />
      </main>
    </>
  );
}
