'use client';

import { useState, useEffect } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

interface PeatlandsData {
  national: {
    timeSeries: Array<{ date: string; restoredHectares: number; co2EmittedMt: number }>;
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

function yearToDate(y: string): Date {
  return new Date(parseInt(y), 6, 1);
}

export default function PeatlandsPage() {
  const [data, setData] = useState<PeatlandsData | null>(null);

  useEffect(() => {
    fetch('/data/peatlands/peatlands.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const restoredSeries: Series[] = data
    ? [{
        id: 'restored',
        label: 'Cumulative peatland restored',
        colour: '#2A9D8F',
        data: data.national.timeSeries.map(d => ({ date: yearToDate(d.date), value: d.restoredHectares })),
      }]
    : [];

  const emissionsSeries: Series[] = data
    ? [{
        id: 'peat-emissions',
        label: 'CO\u2082 from degraded peatland',
        colour: '#E63946',
        data: data.national.timeSeries.map(d => ({ date: yearToDate(d.date), value: d.co2EmittedMt })),
      }]
    : [];

  return (
    <>
      <TopicNav topic="Peatlands" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Peatlands"
          question="Are Britain&apos;s Carbon Stores Being Protected?"
          finding="UK peatlands store 3.2 billion tonnes of carbon &mdash; more than all forests in the UK, France, and Germany combined. But 80% are degraded and currently emit 23 million tonnes of CO&#8322; per year, making damaged peat one of Britain&apos;s largest single sources of greenhouse gas emissions."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Peatlands are the UK&apos;s most important carbon store. Formed over thousands of years by the partial decomposition of sphagnum moss and other plants in waterlogged conditions, peat accumulates at roughly one millimetre per year and can be many metres deep. The UK holds approximately 3 million hectares of peatland, covering around 12% of the land area &mdash; found predominantly in the Scottish Highlands, Northern and Southern Uplands, the Pennines, Dartmoor, the Somerset Levels, and the Flow Country of Caithness and Sutherland. The IUCN UK Peatland Programme estimates that this peat stores 3.2 billion tonnes of carbon &mdash; more than all the forests in the UK, France, and Germany combined. Critically, a healthy, wet peatland is a carbon sink, absorbing CO2 from the atmosphere as new plant material forms. A damaged, drained, or burned peatland reverses this process and becomes a carbon source, releasing millennia of stored carbon into the atmosphere. The UK&apos;s 3.2 billion tonne carbon store represents over 230 years of current UK total greenhouse gas emissions &mdash; making its protection one of the most important single actions available for UK climate policy.</p>
            <p>The scale of peatland degradation in the UK is extraordinary. IUCN UK estimates that 80% of UK peatland is in a degraded condition, primarily because of drainage for agriculture, forestry planting from the 1950s to 1980s, atmospheric pollution deposition, and managed burning for grouse shooting. Drainage ditch networks &mdash; covering hundreds of thousands of kilometres &mdash; lower the water table, allowing the peat to dry out, oxidise, and release CO2. Agricultural conversion has affected significant areas, particularly in lowland England where the East Anglian Fens &mdash; once one of Europe&apos;s largest wetland complexes &mdash; were drained in the 17th century and are now intensively farmed. The Fens alone are estimated to emit 4&ndash;5 million tonnes of CO2 per year from peat oxidation. Managed burning on grouse moors &mdash; legal in England despite longstanding scientific calls for a ban &mdash; damages the sphagnum moss layer that holds peat together, accelerating erosion and carbon loss. The DESNZ national GHG inventory records peatland degradation as contributing approximately 23 million tonnes of CO2-equivalent per year, making it a larger source than the UK&apos;s entire aviation sector when measured by direct CO2 alone.</p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-restored', label: 'Restoration Progress' },
          { id: 'sec-emissions', label: 'Peat Emissions' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Peatlands in degraded state"
              value="80"
              unit="%"
              direction="flat"
              polarity="up-is-bad"
              changeText="2.4M of 3M hectares damaged by drainage, burning, or pollution"
              sparklineData={[83, 83, 82, 82, 81, 81, 80, 80]}
              source="IUCN UK Peatland Programme &mdash; UK peatland assessment"
              onExpand={() => {}}
            />
            <MetricCard
              label="CO\u2082 emitted by degraded peat annually"
              value="23M"
              unit="tonnes"
              direction="flat"
              polarity="up-is-bad"
              changeText="Larger than direct aviation emissions &mdash; barely declining despite restoration"
              sparklineData={[24, 23.8, 23.6, 23.4, 23.2, 23.0, 22.9, 22.7]}
              source="DESNZ &mdash; UK GHG national statistics (LULUCF)"
              onExpand={() => {}}
            />
            <MetricCard
              label="Peatland restored since 2020"
              value="35,000"
              unit="ha"
              direction="up"
              polarity="up-is-good"
              changeText="Target: 250,000 ha by 2030 &mdash; less than 15% of the way there"
              sparklineData={[0, 5000, 12000, 20000, 28000, 35000]}
              source="IUCN UK / NatureScot &mdash; Peatland ACTION monitoring"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-restored" className="mb-12">
            <LineChart
              title="Cumulative peatland restoration, UK, 2015&ndash;2024"
              subtitle="Hectares restored (drain blocked and rewetted). 250,000 ha target by 2030. IUCN UK / NatureScot."
              series={restoredSeries}
              yLabel="Hectares restored"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-emissions" className="mb-12">
            <LineChart
              title="CO\u2082 emissions from degraded UK peatland, 2015&ndash;2024"
              subtitle="Annual CO\u2082-equivalent from peat oxidation and drainage. DESNZ UK GHG national statistics."
              series={emissionsSeries}
              yLabel="MtCO\u2082e per year"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="UNESCO World Heritage"
            value="400,000 ha"
            unit="Flow Country now a UNESCO World Heritage Site"
            description="The Flow Country in Caithness and Sutherland &mdash; the world&apos;s largest blanket bog &mdash; achieved UNESCO World Heritage Site status in July 2023, providing the strongest available international protection for 400,000 hectares of pristine peatland. Scotland&apos;s Peatland ACTION programme has restored over 50,000 hectares since 2012, the largest such programme in Europe. Restored peatland supports rare wildlife including golden plover, greenshank, and dunlin &mdash; as well as absorbing carbon and purifying water."
            source="Source: UNESCO World Heritage Committee 2023; NatureScot &mdash; Peatland ACTION programme annual report."
          />
        </ScrollReveal>

        <ScrollReveal>
          <section className="mt-8 pt-12 border-t border-wiah-border">
            <h2 className="font-sans text-2xl font-bold text-wiah-black mb-6">Sources &amp; Methodology</h2>
            {data && (
              <div className="font-sans text-sm space-y-6">
                <div>
                  <h3 className="font-bold text-wiah-black mb-2">Data sources</h3>
                  <ul className="space-y-2">
                    {data.metadata.sources.map((src, idx) => (
                      <li key={idx} className="text-wiah-mid">
                        <strong className="text-wiah-black">{src.name}:</strong>&nbsp;
                        <a href={src.url} target="_blank" rel="noopener noreferrer" className="underline text-wiah-blue">
                          {src.dataset}
                        </a>
                        &nbsp;({src.frequency})
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-wiah-black mb-2">Methodology</h3>
                  <p className="text-wiah-mid">{data.metadata.methodology}</p>
                </div>
                <div>
                  <h3 className="font-bold text-wiah-black mb-2">Known issues</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {data.metadata.knownIssues.map((issue, idx) => (
                      <li key={idx} className="text-wiah-mid">{issue}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </section>
        </ScrollReveal>
      </main>
    </>
  );
}
