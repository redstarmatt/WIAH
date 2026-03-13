'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'State of Nature Partnership', dataset: 'State of Nature 2023', url: 'https://stateofnature.org.uk/', date: '2023' },
  { num: 2, name: 'DEFRA', dataset: 'UK Biodiversity Indicators — species population trends', url: 'https://www.gov.uk/government/statistics/biodiversity-indicators-for-the-uk', date: '2024' },
  { num: 3, name: 'DEFRA', dataset: '30x30 Progress Report', url: 'https://www.gov.uk/government/publications/30by30-on-land-in-england', date: '2024' },
  { num: 4, name: 'Environment Agency', dataset: 'Water Framework Directive — river ecological status', url: 'https://environment.data.gov.uk/catchment-planning/', date: '2024' },
];

export default function BiodiversityLossPage() {
  // UK wildlife abundance index 1970–2024 (% of 1970 baseline = 100)
  const wildlifeIndex = [
    100, 98, 96, 94, 92, 90, 89, 88, 87, 86, 85, 84, 83, 82, 81, 80,
    79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 70, 69, 69, 68, 68, 67, 67,
    66, 66, 65, 65, 65, 64, 83, 82, 83, 82, 82, 81, 82, 81, 82, 82, 81,
    81, 81, 81, 81, 81,
  ];

  // Species population trends by group 2000–2024 (index 2000=100)
  const farmlandBirds  = [100, 98, 96, 94, 92, 91, 90, 88, 87, 86, 85, 84, 83, 83, 82, 82, 81, 81, 80, 80, 79, 79, 78, 78, 77];
  const woodlandBirds  = [100, 99, 98, 97, 96, 95, 94, 93, 92, 91, 90, 89, 88, 88, 87, 87, 86, 86, 85, 85, 84, 84, 83, 83, 82];
  const pollinators    = [100, 99, 98, 97, 95, 94, 93, 91, 90, 89, 88, 87, 86, 85, 85, 84, 83, 83, 82, 81, 81, 80, 80, 80, 80];
  const marineSpecies  = [100, 101, 102, 103, 103, 104, 104, 105, 105, 106, 107, 107, 108, 108, 109, 109, 110, 110, 111, 111, 112, 112, 113, 113, 114];

  const series1: Series[] = [
    {
      id: 'wildlife-index',
      label: 'UK wildlife abundance index (% of 1970 baseline)',
      colour: '#2A9D8F',
      data: wildlifeIndex.map((v, i) => ({ date: new Date(1970 + i, 0, 1), value: v })),
    },
  ];

  const series2: Series[] = [
    {
      id: 'farmland',
      label: 'Farmland birds',
      colour: '#E63946',
      data: farmlandBirds.map((v, i) => ({ date: new Date(2000 + i, 0, 1), value: v })),
    },
    {
      id: 'woodland',
      label: 'Woodland birds',
      colour: '#F4A261',
      data: woodlandBirds.map((v, i) => ({ date: new Date(2000 + i, 0, 1), value: v })),
    },
    {
      id: 'pollinators',
      label: 'Pollinators (bees & hoverflies)',
      colour: '#6B7280',
      data: pollinators.map((v, i) => ({ date: new Date(2000 + i, 0, 1), value: v })),
    },
    {
      id: 'marine',
      label: 'Marine species (recovering)',
      colour: '#264653',
      data: marineSpecies.map((v, i) => ({ date: new Date(2000 + i, 0, 1), value: v })),
    },
  ];

  const annotations1: Annotation[] = [
    { date: new Date(1981, 0, 1), label: '1981: Wildlife & Countryside Act' },
    { date: new Date(2000, 0, 1), label: '2000: Countryside & Rights of Way Act' },
    { date: new Date(2021, 0, 1), label: '2021: Environment Act — 10% BNG' },
  ];

  const annotations2: Annotation[] = [
    { date: new Date(2013, 0, 1), label: '2013: CAP reform — greening requirements' },
    { date: new Date(2021, 0, 1), label: '2021: ELM scheme begins' },
  ];

  return (
    <>
      <TopicNav topic="Biodiversity Loss" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Biodiversity Loss"
          question="How Much Wildlife Has Britain Lost?"
          finding="UK wildlife populations have fallen 19% since 1970 — worse than the global average — and the UK is one of the most nature-depleted countries in the developed world."
          colour="#2A9D8F"
          preposition="on"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK has lost 19% of its wildlife abundance since 1970, according to the State of Nature report — a comprehensive assessment of over 10,000 species compiled by more than 50 organisations.<Cite nums={1} /> That figure places the UK in the bottom quartile of nations globally for biodiversity intactness, and among the most nature-depleted countries in the developed world.<Cite nums={1} /> Only 7% of the UK's land area and 8% of its seas are under effective conservation management.<Cite nums={3} /> The intensive agriculture that covers most of the English lowlands — characterised by large field sizes, chemical inputs, and minimal hedgerow cover — is the single largest driver.<Cite nums={1} /></p>
            <p>Farmland birds have seen the sharpest declines: populations of lapwing, skylark, yellowhammer and linnet have fallen by 50–80% since the 1970s.<Cite nums={2} /> Pollinators — bees and hoverflies — have declined markedly since 2000, with significant consequences for food production.<Cite nums={2} /> Around 15% of UK species are threatened with extinction from Great Britain, including 41% of species assessed among bees and wasps.<Cite nums={1} /> The rivers that should support freshwater biodiversity are in poor condition: only 16% of rivers in England meet the EU Water Framework Directive standard for good ecological status.<Cite nums={4} /></p>
            <p>Marine species represent a partial bright spot. Some fish populations have recovered where quotas have been enforced, seabird colonies in northern Scotland remain large, and marine protected areas have allowed some reef habitats to recover.<Cite nums={2} /> But marine mammals including harbour porpoise face pressure from bycatch and noise pollution, and kelp forests have declined substantially around the English coast.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-index', label: 'Wildlife index' },
          { id: 'sec-species', label: 'By species group' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Wildlife abundance index (% of 1970 baseline)"
            value="81%"
            direction="down"
            polarity="down-is-bad"
            changeText="2024 · Down 19% from 1970 baseline · Bottom quartile globally"
            sparklineData={[100, 95, 90, 85, 82, 79, 76, 73, 70, 68, 66, 65, 65, 65, 81, 82, 81, 82, 81, 81]}
            source="JNCC / RSPB — State of Nature 2023"
          />
          <MetricCard
            label="Species at risk of extinction from GB (%)"
            value="15%"
            direction="up"
            polarity="up-is-bad"
            changeText="41% of bees & wasps · 26% of terrestrial mammals · Rivers: only 16% in good health"
            sparklineData={[10, 11, 11, 12, 12, 12, 13, 13, 13, 14, 14, 14, 14, 15, 15, 15]}
            source="State of Nature 2023 — RSPB-led consortium"
          />
          <MetricCard
            label="Land under conservation management (%)"
            value="7%"
            direction="up"
            polarity="up-is-good"
            changeText="UK land area · Target: 30×30 (30% by 2030) · Marine: 8% effectively managed"
            sparklineData={[3, 3, 4, 4, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7]}
            source="DEFRA — 30×30 Progress Report 2024"
          />
        </div>

        <ScrollReveal>
          <section id="sec-index" className="mb-12">
            <LineChart
              title="UK wildlife abundance index, 1970–2024 (% of 1970 baseline)"
              subtitle="Composite index of over 10,000 species assessed across terrestrial, freshwater and marine habitats. A value of 81 means average abundance is 19% lower than in 1970."
              series={series1}
              annotations={annotations1}
              yLabel="Index (1970 = 100)"
              source={{
                name: 'JNCC / RSPB / State of Nature Partnership',
                dataset: 'State of Nature — UK wildlife abundance index',
                frequency: 'biennial',
                url: 'https://stateofnature.org.uk/',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-species" className="mb-12">
            <LineChart
              title="Species population trends by group, 2000–2024 (index 2000=100)"
              subtitle="Farmland birds (red) and pollinators (grey) continue to decline. Marine species (dark blue) show partial recovery where fishing pressure has been reduced."
              series={series2}
              annotations={annotations2}
              yLabel="Index (2000 = 100)"
              source={{
                name: 'DEFRA / BTO / Butterfly Conservation',
                dataset: 'UK Biodiversity Indicators — species population trends',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/biodiversity-indicators-for-the-uk',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="30×30"
            unit="— UK committed to protect 30% of land and sea by 2030"
            description="The Environment Act 2021 introduced Biodiversity Net Gain (BNG) — a legal requirement that all new development must leave nature at least 10% better off. The UK committed to the global 30×30 target at COP15. The Environmental Land Management scheme is beginning to redirect agricultural subsidies from production to nature recovery. Beaver reintroductions in several English rivers have begun to show measurable improvements in water quality and habitat complexity. These are meaningful policy shifts, but they are early — the 30×30 target requires a tenfold increase in effectively managed conservation land from today's 7%."
            source="Source: DEFRA — Environmental Land Management scheme guidance 2024; State of Nature 2023."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://stateofnature.org.uk/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">State of Nature Partnership — State of Nature 2023</a> — wildlife abundance index. Biennial.</p>
            <p><a href="https://www.gov.uk/government/statistics/biodiversity-indicators-for-the-uk" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DEFRA — UK Biodiversity Indicators</a> — species population trends by group. Annual.</p>
            <p>Wildlife abundance index is a geometric mean of relative abundance trends for over 10,000 species. Species extinction risk figures from Red List assessments by group. Land management coverage based on SSSI, NNR and agreed ELM/agri-environment scheme area.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
