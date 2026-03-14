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
  { num: 1, name: 'DfT', dataset: 'Road Safety Data', url: 'https://www.gov.uk/government/collections/road-accidents-and-safety-statistics', date: '2024' },
  { num: 2, name: 'NPCC', dataset: 'Roads Policing', url: 'https://www.npcc.police.uk/', date: '2024' }
];

export default function SpeedCameraCoveragePage() {
  return (
    <>
      <TopicNav topic="Speed Camera Coverage" colour="#6B7280" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Speed Camera Coverage"
          question="Are speed cameras disappearing?"
          finding="England and Wales has fewer than half the fixed speed cameras it had in 2007. Meanwhile, 4.3 million speeding penalties were issued in 2024 — up 22% since 2019 — as average-speed cameras expanded."
          colour="#6B7280"
          preposition="in"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Britain's approach to speed enforcement is undergoing a structural shift that has received remarkably little public scrutiny. The number of fixed speed cameras — the yellow Gatso boxes that became a defining feature of British roads from the late 1990s — has more than halved, from over 4,500 at their 2007 peak to approximately 1,850 today.<Cite nums={1} /> The decline began when the coalition government cut ring-fenced funding for camera partnerships in 2010, leaving local authorities to fund maintenance and replacement from their own budgets. Many simply switched cameras off or removed them. Yet the total number of speeding penalties has risen sharply, reaching 4.3 million in 2024, up 22% since 2019, driven overwhelmingly by the expansion of average-speed camera systems on motorways and major A-roads and by mobile camera vans that can be deployed flexibly.</p>
            <p>The most significant change in speed policy is happening at street level. The proportion of roads subject to 20mph limits has risen from 8% in 2015 to 38% in 2024, accelerated by Wales making 20mph the national default on restricted roads in September 2023.<Cite nums={2} /> The evidence from cities that have adopted widespread 20mph zones — notably Edinburgh, Bristol, and the whole of Wales — shows measurable reductions in pedestrian casualties and serious injuries, though the Welsh rollout has faced public backlash over perceived blanket application to roads where higher speeds are appropriate. Enforcement of 20mph limits remains minimal in most areas, relying on compliance rather than cameras. The question is whether a speed management system increasingly dependent on voluntary adherence can sustain the casualty reductions that decades of camera enforcement helped deliver.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="Fixed speed cameras (England & Wales)"
          value="1,850"
          unit=""
          direction="down"
          polarity="up-is-bad"
          changeText="2024 · DfT · Down from 4,500+ in 2007"
          sparklineData={[4500, 4200, 3800, 3400, 3000, 2700, 2400, 2200, 2000, 1900, 1850]}
          source="DfT — Road Safety Data 2024"
        />
        <MetricCard
          label="Speeding fixed penalties issued"
          value="4.3M/yr"
          unit=""
          direction="up"
          polarity="up-is-bad"
          changeText="2024 · DVLA · Up 22% since 2019"
          sparklineData={[2.8, 2.9, 3.0, 3.2, 3.5, 3.7, 3.9, 4.1, 4.3]}
          source="DVLA / NPCC 2024"
        />
        <MetricCard
          label="Roads with 20mph limit"
          value="38%"
          unit=""
          direction="up"
          polarity="up-is-good"
          changeText="2024 · DfT · Up from 8% in 2015"
          sparklineData={[8, 11, 14, 18, 22, 26, 30, 33, 35, 38]}
          source="DfT 2024"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="speed-camera-coverage" />
      </main>
    </>
  );
}
