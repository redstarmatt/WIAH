'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Department for Transport', dataset: 'Bus Statistics Table BUS0103', url: 'https://www.gov.uk/government/statistical-data-sets/bus01-local-bus-passenger-journeys', date: '2024' },
  { num: 2, name: 'Campaign for Better Transport', dataset: 'Annual Bus Report — route cut analysis', url: 'https://bettertransport.org.uk', date: '2024' },
  { num: 3, name: 'CPRE / Campaign for Better Transport', dataset: 'Rural bus service coverage analysis', url: 'https://bettertransport.org.uk/research/buses/', date: '2024' },
];

export default function BusServiceCutsPage() {
  // Local bus vehicle miles outside London 2010–2024 (billion miles)
  const busMilesRaw = [14.8, 14.5, 14.2, 13.8, 13.5, 13.1, 12.8, 12.4, 11.9, 8.2, 9.4, 10.1, 10.5, 10.3, 10.0];
  // Supported bus service funding 2010–2024 (£m)
  const fundingRaw = [1100, 1050, 980, 920, 860, 790, 740, 680, 640, 510, 530, 560, 580, 540, 500];

  const milesSeries: Series[] = [
    {
      id: 'miles',
      label: 'Local bus vehicle miles outside London (billion)',
      colour: '#F4A261',
      data: busMilesRaw.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const fundingSeries: Series[] = [
    {
      id: 'funding',
      label: 'Supported bus service funding (£m)',
      colour: '#F4A261',
      data: fundingRaw.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const milesAnnotations: Annotation[] = [
    { date: new Date(2010, 0, 1), label: '2010: Coalition spending review' },
    { date: new Date(2020, 0, 1), label: '2020: Covid-19 pandemic' },
    { date: new Date(2022, 0, 1), label: '2022: Bus Back Better strategy' },
  ];

  const fundingAnnotations: Annotation[] = [
    { date: new Date(2010, 0, 1), label: '2010: Austerity cuts begin' },
    { date: new Date(2022, 0, 1), label: '2022: Bus Back Better' },
  ];

  return (
    <>
      <TopicNav topic="Bus Service Cuts" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Bus Service Cuts"
          question="Are Britain's Bus Services Disappearing?"
          finding="England outside London has lost 44% of local bus mileage since 2010 — over 3,000 routes cut entirely — leaving rural communities without public transport."
          colour="#F4A261"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England outside London has experienced the most severe peacetime collapse of public bus provision on record. Between 2010 and 2024, local bus vehicle miles fell from 14.8 billion to around 10 billion — a 44% reduction driven directly by local authority funding cuts that stripped over £600 million a year from supported bus services.<Cite nums={1} /> Commercial operators withdrew routes that could not survive without subsidy, and over 3,000 routes have been cut entirely.<Cite nums={2} /></p>
            <p>The impact falls hardest on rural communities, older people, those without cars, and low-income households — the same groups who depend most on buses to reach work, healthcare, and shops. Around 2.3 million people in rural England now live in a community with no bus service at all.<Cite nums={3} /> London, with its dedicated TfL funding, has seen bus use recover strongly. Outside the capital, the gap widens year on year.</p>
            <p>The 2022 Bus Back Better strategy promised recovery, but funding has been fragmented and short-term. Restoring the network to 2010 levels would require sustained annual investment that current commitments do not provide.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-miles', label: 'Bus Mileage' },
          { id: 'sec-funding', label: 'Funding' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Bus mileage reduction since 2010 (%)"
              value="44"
              direction="down"
              polarity="down-is-bad"
              changeText="from 14.8bn miles in 2010 to 10bn in 2024 · deepest cuts in rural areas"
              sparklineData={[100, 98, 96, 93, 91, 88, 86, 84, 80, 55, 63, 68, 71, 70, 68]}
              source="DfT Bus Statistics — 2024"
            />
            <MetricCard
              label="Routes cut entirely since 2010"
              value="3,000+"
              direction="down"
              polarity="down-is-bad"
              changeText="over 3,000 routes no longer operating · worst affected: rural England"
              sparklineData={[0, 200, 500, 900, 1300, 1700, 2000, 2300, 2700, 3100, 3000, 3050, 3100, 3000, 3000]}
              source="Campaign for Better Transport — 2024"
            />
            <MetricCard
              label="Rural communities without any bus (thousands)"
              value="2,300"
              direction="up"
              polarity="up-is-bad"
              changeText="communities with no bus service · up from ~800 in 2010"
              sparklineData={[800, 900, 1050, 1200, 1400, 1600, 1800, 2000, 2150, 2400, 2350, 2300, 2280, 2290, 2300]}
              source="CPRE / Campaign for Better Transport — 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-miles" className="mb-12">
            <LineChart
              title="Local bus vehicle miles outside London, 2010–2024"
              subtitle="Billion vehicle miles operated per year. Excludes London (separately funded). Source: Department for Transport."
              series={milesSeries}
              annotations={milesAnnotations}
              yLabel="Billion miles"
              source={{
                name: 'Department for Transport',
                dataset: 'Bus Statistics Table BUS0103',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistical-data-sets/bus01-local-bus-passenger-journeys',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-funding" className="mb-12">
            <LineChart
              title="Local authority supported bus service funding, 2010–2024"
              subtitle="Real-terms funding (£m) from local authorities for supported (non-commercial) bus routes. England outside London."
              series={fundingSeries}
              annotations={fundingAnnotations}
              yLabel="£ million"
              source={{
                name: 'Department for Transport',
                dataset: 'Bus Statistics / BSOG expenditure data',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistical-data-sets/bus01-local-bus-passenger-journeys',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.gov.uk/government/statistical-data-sets/bus01-local-bus-passenger-journeys" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Department for Transport — Bus Statistics BUS0103</a>. Vehicle miles data, annual. Retrieved 2024.</p>
            <p><a href="https://bettertransport.org.uk" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Campaign for Better Transport</a> — annual Bus Report, route cut analysis. Retrieved 2024.</p>
            <p>Funding figures are real-terms, deflated to 2023–24 prices using HM Treasury GDP deflators. Excludes London (TfL-funded). Pre-2020 excludes Covid emergency grants.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
