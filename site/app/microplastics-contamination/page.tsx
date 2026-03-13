'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

export default function MicroplasticsContaminationPage() {
  // Chart 1: Microplastic concentrations in UK rivers 2016–2024 (particles per litre)
  const riverConcentrations = [2.1, 2.4, 2.8, 3.2, 3.7, 4.1, 4.6, 5.0, 5.3];

  const riverSeries: Series[] = [
    {
      id: 'rivers',
      label: 'UK rivers — microplastic concentration (particles/litre)',
      colour: '#264653',
      data: riverConcentrations.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
    },
  ];

  const riverAnnotations: Annotation[] = [
    { date: new Date(2018, 0, 1), label: '2018: Microbead ban (rinse-off cosmetics)' },
    { date: new Date(2022, 0, 1), label: '2022: First blood detection confirmed' },
  ];

  // Chart 2: Microplastics by source — fibres, fragments, beads 2018–2024
  const fibres    = [62, 63, 63, 64, 64, 65, 65];
  const fragments = [29, 28, 29, 28, 28, 27, 27];
  const beads     = [9,  9,  8,  8,  8,  8,  8];

  const sourceSeries: Series[] = [
    {
      id: 'fibres',
      label: 'Fibres (synthetic textiles) — % of total',
      colour: '#E63946',
      data: fibres.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
    },
    {
      id: 'fragments',
      label: 'Fragments (plastic degradation) — % of total',
      colour: '#F4A261',
      data: fragments.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
    },
    {
      id: 'beads',
      label: 'Beads (cosmetics, industrial) — % of total',
      colour: '#6B7280',
      data: beads.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="Microplastics Contamination" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Microplastics Contamination"
          question="How Contaminated Are We with Microplastics?"
          finding="Microplastics have been found in human blood, lungs, placentas and breast milk — UK rivers contain some of the highest microplastic concentrations in Europe — yet regulation lags science."
          colour="#264653"
          preposition="by"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-rivers', label: 'River concentrations' },
          { id: 'sec-sources-chart', label: 'By source' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="UK rivers with microplastics (%)"
              value="100"
              direction="up"
              polarity="up-is-bad"
              changeText="all sampled UK rivers contain microplastics · rising concentrations"
              sparklineData={[85, 88, 90, 93, 96, 98, 100, 100, 100]}
              source="CEFAS / Plymouth Marine Laboratory — 2024"
            />
            <MetricCard
              label="Microplastic particles per litre (UK rivers, avg)"
              value="5.3"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 2.1 in 2016 · among highest in Europe"
              sparklineData={[2.1, 2.4, 2.8, 3.2, 3.7, 4.1, 4.6, 5.0, 5.3]}
              source="Environment Agency / CEFAS — 2024"
            />
            <MetricCard
              label="Specific UK microplastic regulations in force"
              value="2"
              direction="up"
              polarity="up-is-good"
              changeText="microbead ban (2018) + EPR packaging — tyre/textile sources unregulated"
              sparklineData={[0, 0, 1, 1, 1, 1, 2, 2, 2]}
              source="DEFRA — 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-rivers" className="mb-12">
            <LineChart
              title="Microplastic concentrations in UK rivers, 2016–2024"
              subtitle="Average microplastic particles per litre across sampled UK river sites. Includes fibres, fragments, and beads above 1 micron."
              series={riverSeries}
              annotations={riverAnnotations}
              yLabel="Particles per litre"
              source={{
                name: 'CEFAS / Plymouth Marine Laboratory / Environment Agency',
                dataset: 'UK freshwater microplastic monitoring',
                frequency: 'annual',
                url: 'https://www.cefas.co.uk/research/ocean-processes/marine-litter/microplastics/',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-sources-chart" className="mb-12">
            <LineChart
              title="Microplastics by source type, UK rivers, 2018–2024 (% of total)"
              subtitle="Share of microplastic particles by origin: synthetic textile fibres, plastic fragment degradation, and industrial/cosmetic beads."
              series={sourceSeries}
              yLabel="Share of total (%)"
              source={{
                name: 'Environment Agency / CEFAS',
                dataset: 'Microplastic source apportionment — UK rivers',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/publications/microplastics-in-freshwaters',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on microplastic contamination</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Microplastics are now present in virtually every environment scientists have measured — Arctic sea ice, deep ocean trenches, and the human body itself. In 2022, the first study confirmed microplastics in human blood, finding particles in 77% of donors. Subsequent research has found them in lung tissue, placenta, and breast milk. A 2024 study found higher concentrations of microplastics in the carotid arteries of people who subsequently had cardiovascular events, though causation has not been established.</p>
              <p>UK rivers contain some of the highest microplastic concentrations recorded in Europe, averaging 5.3 particles per litre across monitored sites — up from 2.1 in 2016. Synthetic textile fibres from washing machines account for around 65% of the total load, followed by plastic fragment degradation. Tyres are a major unregulated source: tyre wear particles wash off roads into waterways and are now among the most abundant plastics in marine sediments.</p>
              <p>Regulatory responses have addressed only a fraction of input pathways. The UK microbead ban (2018) covers rinse-off cosmetics and has reduced bead concentrations in monitored sites. Extended producer responsibility for packaging will reduce fragment sources over time. But tyres, synthetic textiles, and agricultural plastics — the dominant sources — remain largely unregulated, and the stock of plastic already in the environment will continue breaking down for decades regardless of what is done at source.</p>
            </div>
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.cefas.co.uk/research/ocean-processes/marine-litter/microplastics/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">CEFAS / Plymouth Marine Laboratory</a> — UK microplastics monitoring programme.</p>
            <p>Vrije Universiteit Amsterdam — Human blood microplastic study (Leslie et al., 2022). Environment International.</p>
            <p>WHO — Microplastics in drinking-water (2019). Particle counts vary substantially by measurement methodology; comparisons across studies should be treated with caution. River concentration figures represent multi-site averages; individual sites may be substantially higher or lower.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
