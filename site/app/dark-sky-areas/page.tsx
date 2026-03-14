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
  { num: 1, name: 'CPRE', dataset: 'Night Blight Report', url: 'https://www.cpre.org.uk/resources/night-blight/', date: '2024' },
  { num: 2, name: 'IDA', dataset: 'International Dark-Sky Association', url: 'https://www.darksky.org/', date: '2024' }
];

export default function DarkSkyAreasPage() {
  return (
    <>
      <TopicNav topic="Dark Skies & Light Pollution" colour="#0D1117" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Dark Skies & Light Pollution"
          question="Can you still see stars in the UK?"
          finding="Light pollution in the UK is increasing 6% per decade. While 22 dark sky areas are now certified — up from 5 in 2010 — scientists estimate 30% of species are adversely affected by artificial light at night."
          colour="#0D1117"
          preposition="in"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The night sky over Britain is disappearing at a measurable rate. Satellite data and ground-level monitoring show that artificial sky brightness is increasing by roughly 6% per decade across the UK, driven by the proliferation of LED lighting — which, despite being more energy-efficient per unit, has been deployed so liberally that total light output has actually risen. CPRE&apos;s Night Blight mapping reveals that only 22% of England now experiences truly dark skies, down from around 30% two decades ago. The shift to LEDs with higher blue-spectrum content has compounded the problem: blue light scatters more efficiently in the atmosphere, amplifying skyglow well beyond the boundaries of built-up areas.<Cite nums={1} /></p>
            <p>The ecological consequences are increasingly well documented. An estimated 30% of vertebrate species and over 60% of invertebrate species are nocturnal, and artificial light at night disrupts breeding, migration, and predator-prey dynamics across these populations. Moth numbers in Britain have declined by a third since the 1960s, and light pollution is identified as a significant contributing factor alongside habitat loss and pesticide use. Against this backdrop, the expansion of formally designated dark sky areas — from 5 in 2010 to 22 today — represents a genuine conservation success, with sites like Northumberland International Dark Sky Park and the Brecon Beacons attracting astro-tourism that delivers real economic value to rural communities. But designation protects pockets; the underlying trend remains one of steady, measurable loss.<Cite nums={2} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="Sky brightness increase (per decade)"
          value="+6%"
          unit=""
          direction="up"
          polarity="up-is-bad"
          changeText="2024 · Globe at Night · Skyglow growing"
          sparklineData={[0, 1, 2, 3, 4, 5, 5.5, 6]}
          source="Globe at Night / CPRE 2024"
        />
        <MetricCard
          label="Dark Sky certified areas (UK)"
          value="22"
          unit=""
          direction="up"
          polarity="up-is-good"
          changeText="2024 · IDA/DarkSky Int · Up from 5 in 2010"
          sparklineData={[5, 7, 9, 11, 13, 15, 17, 19, 21, 22]}
          source="IDA 2024"
        />
        <MetricCard
          label="Species affected by artificial night light"
          value="30%"
          unit=""
          direction="up"
          polarity="up-is-bad"
          changeText="2024 · British Ecological Society"
          sparklineData={[18, 20, 22, 24, 25, 27, 28, 29, 30]}
          source="British Ecological Society 2024"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="dark-sky-areas" />
      </main>
    </>
  );
}
