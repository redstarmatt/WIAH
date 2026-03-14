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
  { num: 1, name: 'Campaign for Better Transport', dataset: 'Bus Report', url: 'https://bettertransport.org.uk/', date: '2024' },
  { num: 2, name: 'DfT', dataset: 'Rural Transport Statistics', url: 'https://www.gov.uk/government/statistics/transport-statistics-great-britain', date: '2024' }
];

export default function RuralTransportPage() {
  return (
    <>
      <TopicNav topic="Rural Transport" colour="#F4A261" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Rural Transport"
          question="How do people get around in rural Britain?"
          finding="38% of rural areas in England now have no regular bus service — up from 29% in 2010. For the 19% of rural households without a car, this means genuine transport poverty."
          colour="#F4A261"
          preposition="with"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Rural Britain is quietly being severed from the transport network. Since 2010, the proportion of rural areas in England with no regular bus service has risen from 29% to 38%, a steady erosion that has accelerated since the pandemic as operators withdrew commercially unviable routes and local authority subsidies were cut. The consequences fall hardest on the 19% of rural households — around 1.9 million people — who do not have access to a car. For these residents, the loss of a bus route is not an inconvenience; it is a barrier to employment, healthcare, education, and social participation. Campaign for Better Transport analysis shows that over 4,000 bus routes have been reduced or eliminated across England since 2010, with the deepest cuts in counties like Devon, Lincolnshire, and North Yorkshire.<Cite nums={1} /></p>
            <p>Community transport was supposed to fill the gap, but the sector is itself in retreat. Total mileage delivered by community transport operators in England has fallen 25% since 2019, driven by volunteer shortages, rising fuel and insurance costs, and the loss of local authority contracts. Demand-responsive transport and ride-sharing apps have emerged in some areas, but coverage remains thin and the digital literacy required to use them excludes many of the elderly and disabled passengers who most need the service. The fundamental problem is structural: rural bus services cannot operate profitably at the frequencies needed to be useful, yet public subsidy per rural passenger journey has been falling in real terms for over a decade. Without a step change in funding models, rural transport poverty will continue to deepen.<Cite nums={2} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="Rural areas with no bus service"
          value="38%"
          unit=""
          direction="up"
          polarity="up-is-bad"
          changeText="2024 · Campaign for Better Transport · Up from 29% in 2010"
          sparklineData={[29, 31, 32, 33, 34, 35, 36, 37, 37, 38]}
          source="Campaign for Better Transport — Bus Report 2024"
        />
        <MetricCard
          label="Rural households without a car"
          value="19%"
          unit=""
          direction="flat"
          polarity="up-is-bad"
          changeText="2024 · ONS"
          sparklineData={[21, 21, 20, 20, 19, 19, 19, 19]}
          source="ONS — National Travel Survey 2024"
        />
        <MetricCard
          label="Community transport mileage (England)"
          value="145M miles/yr"
          unit=""
          direction="down"
          polarity="up-is-good"
          changeText="2024 · CPT · Down 25% from 2019"
          sparklineData={[195, 190, 185, 180, 175, 145, 138, 142, 145]}
          source="Community Transport Association 2024"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="rural-transport" />
      </main>
    </>
  );
}
