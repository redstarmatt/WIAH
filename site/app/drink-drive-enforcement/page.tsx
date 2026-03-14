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
  { num: 1, name: 'DfT', dataset: 'Road Safety Statistics', url: 'https://www.gov.uk/government/collections/road-accidents-and-safety-statistics', date: '2023' },
  { num: 2, name: 'NPCC', dataset: 'Roads Policing Annual Data', url: 'https://www.npcc.police.uk/', date: '2024' }
];

export default function DrinkDriveEnforcementPage() {
  return (
    <>
      <TopicNav topic="Drink Drive Enforcement" colour="#E63946" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Drink Drive Enforcement"
          question="Are drink drive deaths stuck?"
          finding="Drink drive deaths have stalled at around 250 per year for over a decade. Roadside breath tests have been cut nearly in half since 2009, and the fail rate is rising as fewer tests are conducted."
          colour="#E63946"
          preposition="with"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Drink driving was once the most successful road safety campaign in British history. Deaths fell from over 1,600 a year in 1979 to 250 by the early 2010s, driven by a combination of social stigma, enforcement, and the 1967 breathalyser law. But that progress has stalled completely. Around 250 people have died annually in drink-drive collisions for over a decade, a plateau that coincides with a sharp decline in enforcement.<Cite nums={1} /> Police conducted approximately 800,000 roadside breath tests per year in the late 2000s; by 2024, that figure had fallen to around 450,000, a reduction of more than 40%. The decline reflects the broader erosion of roads policing capacity: dedicated traffic officers in England and Wales have been cut by over 40% since 2010, and drink-drive enforcement has been deprioritised relative to other demands on shrinking police resources.</p>
            <p>The rising fail rate among those who are tested suggests that the deterrent effect is weakening. When fewer tests are conducted, they are increasingly targeted at drivers already suspected of impairment, which pushes the fail rate up. But it also means that the random, visible deterrence that characterised the campaign's most effective years has largely disappeared.<Cite nums={2} /> The UK's drink-drive limit remains at 80mg of alcohol per 100ml of blood, the joint highest in Europe alongside Malta. Scotland lowered its limit to 50mg in 2014, aligning with most European countries. The evidence from Scotland and from international comparisons suggests that a lower limit, combined with restored enforcement capacity, could reduce deaths further. But neither measure has been adopted in England and Wales, leaving the country reliant on a social norm that, while still powerful, is no longer being actively reinforced by the state.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="Breath tests (England & Wales)"
          value="450,000/yr"
          unit=""
          direction="down"
          polarity="up-is-good"
          changeText="2024 · NPCC · Down from 800K in 2009"
          sparklineData={[800000, 760000, 720000, 680000, 640000, 600000, 560000, 520000, 480000, 460000, 450000]}
          source="NPCC — Roads Policing Statistics 2024"
        />
        <MetricCard
          label="Drink drive deaths (annual)"
          value="250"
          unit=""
          direction="flat"
          polarity="up-is-bad"
          changeText="2023 · DfT · Stalled at 250 for a decade"
          sparklineData={[620, 560, 500, 440, 380, 320, 280, 260, 250, 250, 250]}
          source="DfT — Road Safety Statistics 2023"
        />
        <MetricCard
          label="Roadside breath test fail rate"
          value="7.5%"
          unit=""
          direction="up"
          polarity="up-is-bad"
          changeText="2024 · NPCC · Up from 5.8% in 2019"
          sparklineData={[5.0, 5.2, 5.5, 5.8, 6.0, 6.3, 6.8, 7.2, 7.5]}
          source="NPCC 2024"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="drink-drive-enforcement" />
      </main>
    </>
  );
}
