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
  { num: 1, name: 'RTPI', dataset: 'State of the Profession', url: 'https://www.rtpi.org.uk/research/', date: '2024' },
  { num: 2, name: 'DLUHC', dataset: 'Planning Statistics', url: 'https://www.gov.uk/government/collections/planning-statistics', date: '2024' }
];

export default function CouncilPlanningCapacityPage() {
  return (
    <>
      <TopicNav topic="Council Planning Capacity" colour="#F4A261" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Council Planning Capacity"
          question="Why does planning permission take so long?"
          finding="Just 18% of local planning departments say they are at full capacity — down from 45% in 2013 — and only 44% of major planning applications are decided within the 13-week statutory target."
          colour="#F4A261"
          preposition="in"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England needs to build at least 300,000 homes a year to address its housing shortage, but the planning system through which every development must pass has been systematically depleted. The Royal Town Planning Institute estimates that 8,200 planning officer posts are vacant across local authorities, a 60% increase in five years, and just 18% of planning departments report operating at full capacity.<Cite nums={1} /> The consequences are measurable: only 44% of major planning applications are now decided within the statutory 13-week target, down from 64% a decade ago. For smaller applications, the picture is marginally better, but cumulative delays and backlogs mean that even straightforward proposals can take months longer than the system intends.</p>
            <p>The root cause is a familiar one: austerity-era budget cuts hollowed out planning teams, and the profession has struggled to recruit replacements. Planning officer salaries in local government average around 35,000 pounds, roughly half what equivalent professionals earn in the private sector, and university planning courses have seen enrolment fall by a third since 2010.<Cite nums={2} /> The government has acknowledged the problem, proposing increased planning fees and a new Planning Skills Delivery Fund, but these measures address symptoms rather than the structural underinvestment. Every housing target, every net-zero commitment, and every infrastructure project depends on planners to assess, negotiate, and approve it. A system running at less than a fifth of its intended capacity is not a bottleneck. It is a blockage.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="Planning depts at full capacity"
          value="18%"
          unit=""
          direction="down"
          polarity="up-is-good"
          changeText="2024 · RTPI · Down from 34% in 2019"
          sparklineData={[45, 42, 40, 38, 36, 34, 30, 26, 22, 20, 18]}
          source="RTPI — State of the Profession 2024"
        />
        <MetricCard
          label="Planning officer vacancies"
          value="8,200"
          unit=""
          direction="up"
          polarity="up-is-bad"
          changeText="2024 · RTPI · Up 60% in 5 years"
          sparklineData={[4500, 5000, 5500, 6000, 6500, 7000, 7400, 7800, 8200]}
          source="RTPI 2024"
        />
        <MetricCard
          label="Major apps decided within 13 weeks"
          value="44%"
          unit=""
          direction="down"
          polarity="up-is-good"
          changeText="2024 · DLUHC · Down from 64% in 2014"
          sparklineData={[64, 61, 59, 57, 55, 52, 50, 48, 46, 44]}
          source="DLUHC — Planning Statistics 2024"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="council-planning-capacity" />
      </main>
    </>
  );
}
