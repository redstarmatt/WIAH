'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

// ── Types ────────────────────────────────────────────────────────────────────

interface SpeciesAbundancePoint {
  year: number;
  index: number;
}

interface FarmlandBirdPoint {
  year: number;
  index: number;
}

interface BngCreditPoint {
  quarter: string;
  creditsRegistered: number;
  habitatHectares: number;
}

interface KeySpecies {
  hedgehogDeclineSince2000Pct: number;
  redKiteBreedingPairs: number;
  beaverColonies: number;
  speciesInDeclinePct: number;
  speciesAtRiskOfExtinctionPct: number;
}

interface BiodiversityData {
  speciesAbundance: SpeciesAbundancePoint[];
  farmlandBirdIndex: FarmlandBirdPoint[];
  bngCredits: BngCreditPoint[];
  keySpecies: KeySpecies;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function quarterToDate(q: string): Date {
  const [year, qtr] = q.split('-Q');
  const month = (parseInt(qtr) - 1) * 3;
  return new Date(parseInt(year), month, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── References ──────────────────────────────────────────────────────────────

const editorialRefs: Reference[] = [
  { num: 1, name: 'JNCC / State of Nature Partnership', dataset: 'State of Nature 2023', url: 'https://stateofnature.org.uk/', date: '2023' },
  { num: 2, name: 'DEFRA', dataset: 'UK Biodiversity Indicators — C5 Birds of the wider countryside and at sea', url: 'https://www.gov.uk/government/statistics/biodiversity-indicators-for-the-uk', date: '2024' },
  { num: 3, name: 'Natural England', dataset: 'Biodiversity Net Gain — Credit Sales and Habitat Register', url: 'https://www.gov.uk/government/collections/biodiversity-net-gain', date: '2025' },
  { num: 4, name: 'BTO', dataset: 'Breeding Bird Survey', url: 'https://www.bto.org/our-science/projects/breeding-bird-survey', date: '2024' },
  { num: 5, name: 'Environment Agency', dataset: 'Water Framework Directive — river ecological status', url: 'https://environment.data.gov.uk/catchment-planning/', date: '2024' },
  { num: 6, name: 'Beaver Trust', dataset: 'Colony Census', url: 'https://beavertrust.org/', date: '2025' },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function BiodiversityPage() {
  const [data, setData] = useState<BiodiversityData | null>(null);

  useEffect(() => {
    fetch('/data/biodiversity/biodiversity.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const speciesAbundanceSeries: Series[] = data
    ? [{
        id: 'species-abundance',
        label: 'UK species abundance index (1970 = 100)',
        colour: '#E63946',
        data: data.speciesAbundance.map(d => ({
          date: yearToDate(d.year),
          value: d.index,
        })),
      }]
    : [];

  const farmlandBirdSeries: Series[] = data
    ? [{
        id: 'farmland-birds',
        label: 'Farmland bird index (1970 = 100)',
        colour: '#E63946',
        data: data.farmlandBirdIndex.map(d => ({
          date: yearToDate(d.year),
          value: d.index,
        })),
      }]
    : [];

  const bngSeries: Series[] = data
    ? [
        {
          id: 'bng-credits',
          label: 'BNG credits registered',
          colour: '#2A9D8F',
          data: data.bngCredits.map(d => ({
            date: quarterToDate(d.quarter),
            value: d.creditsRegistered,
          })),
        },
        {
          id: 'bng-habitat',
          label: 'Habitat created (hectares)',
          colour: '#264653',
          data: data.bngCredits.map(d => ({
            date: quarterToDate(d.quarter),
            value: d.habitatHectares,
          })),
        },
      ]
    : [];

  const latestAbundance = data?.speciesAbundance[data.speciesAbundance.length - 1];
  const latestFarmland = data?.farmlandBirdIndex[data.farmlandBirdIndex.length - 1];
  const latestBng = data?.bngCredits[data.bngCredits.length - 1];

  return (
    <>
      <TopicNav topic="Environment & Climate" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment & Climate"
          question="What is actually happening to UK wildlife?"
          finding="The UK has lost 41% of its species abundance since 1970, making it one of the most nature-depleted countries on Earth. Farmland birds have been halved. But targeted interventions — from red kite reintroduction to mandatory biodiversity net gain — show that decline is not inevitable."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The State of Nature 2023 report, compiled by more than 60 conservation organisations, delivered a stark assessment: the UK is one of the most nature-depleted countries in the world, ranking in the bottom 10% globally for biodiversity intactness.<Cite nums={1} /> Since systematic monitoring began in 1970, average species abundance across the UK has fallen by 41%.<Cite nums={1} /> One in six species is now threatened with extinction from Britain.<Cite nums={1} /> The decline is not evenly distributed — farmland species have been hit hardest, with the farmland bird index collapsing to just 42% of its 1970 level.<Cite nums={2} /> Turtle doves, once common across southern England, have declined by 98%.<Cite nums={2} /> Corn buntings, yellowhammers, and grey partridges have all suffered losses exceeding 90% in some regions. The cause is not mysterious: the intensification of agriculture since the 1970s — the removal of hedgerows, the drainage of wet meadows, the shift to autumn-sown cereals, and the widespread use of neonicotinoid pesticides — has systematically dismantled the habitats these species depend on.<Cite nums={1} />
            </p>
            <p>
              Insect populations tell a parallel story. Though long-term UK data is patchier than for birds, the evidence points to serious decline. Studies of moth populations show a 33% reduction in abundance since 1968.<Cite nums={1} /> Flying insect biomass surveys in parts of Europe suggest losses of 75% or more over three decades. Hedgehog numbers have halved since 2000, driven by habitat fragmentation, road mortality, and the loss of connected garden and hedgerow networks.<Cite nums={1} /> River biodiversity has suffered from agricultural run-off, sewage discharges, and water abstraction — only 16% of English rivers achieve good ecological status, and invertebrate diversity in many lowland rivers has deteriorated markedly since 2010.<Cite nums={5} /> The overall picture is of a country whose natural systems are under sustained, multi-directional pressure.
            </p>
            <p>
              Yet the picture is not uniformly bleak, and some of the brightest spots demonstrate what is possible with political will and sustained effort. The red kite, reduced to a handful of breeding pairs in mid-Wales by the 1980s, now numbers around 10,000 birds across the UK following one of the world's most successful reintroduction programmes.<Cite nums={4} /> Beavers, extinct in Britain for 400 years, are now established in multiple river catchments after licensed reintroductions, delivering measurable benefits for flood management and wetland biodiversity.<Cite nums={6} /> The Knepp Estate in Sussex has become an internationally recognised example of rewilding, with turtle doves, nightingales, and purple emperor butterflies returning to land that was previously intensive farmland. In February 2024, biodiversity net gain (BNG) became mandatory for all major planning applications in England, requiring developers to deliver a minimum 10% increase in habitat value.<Cite nums={3} /> By end of 2025, over 2,300 BNG credits had been registered and nearly 1,500 hectares of new habitat created or enhanced.<Cite nums={3} /> The UK government's commitment to the 30x30 target — protecting 30% of land and sea for nature by 2030 — provides a framework, though delivery remains well behind the pace required.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-abundance', label: 'Species decline' },
          { id: 'sec-farmland', label: 'Farmland birds' },
          { id: 'sec-bng', label: 'BNG & habitat' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="UK species in decline since 1970"
            value="41%"
            unit="of species"
            direction="up"
            polarity="up-is-bad"
            changeText="1 in 6 species at risk of extinction · one of the most nature-depleted countries globally"
            sparklineData={
              data ? sparkFrom(data.speciesAbundance.map(d => 100 - d.index)) : []
            }
            source="JNCC — State of Nature 2023"
            href="#sec-abundance"
          />
          <MetricCard
            label="Farmland bird index"
            value={latestFarmland ? latestFarmland.index.toFixed(0) : '42'}
            unit="(1970 = 100)"
            direction="down"
            polarity="down-is-bad"
            changeText="Down 58% since 1970 · turtle dove down 98% · driven by agricultural intensification"
            sparklineData={
              data ? sparkFrom(data.farmlandBirdIndex.map(d => d.index)) : []
            }
            source="DEFRA — UK Biodiversity Indicators C5, 2024"
            href="#sec-farmland"
          />
          <MetricCard
            label="Red kites in UK"
            value="10,000"
            unit="breeding birds"
            direction="up"
            polarity="up-is-good"
            changeText="From near-extinction (single-digit pairs in 1980s) · one of world's greatest reintroduction successes"
            sparklineData={[2, 5, 18, 85, 320, 1200, 3400, 6000, 8200, 10000]}
            source="BTO — Breeding Bird Survey, 2024"
            href="#sec-bng"
          />
        </div>

        {/* Chart 1: Species abundance index */}
        <ScrollReveal>
          <div id="sec-abundance" className="mb-12">
            <LineChart
              series={speciesAbundanceSeries}
              title="UK species abundance index, 1970–2024"
              subtitle="Composite index tracking average abundance of UK species. 1970 = 100. A value of 59 means average species abundance has fallen 41%."
              yLabel="Index (1970 = 100)"
              source={{
                name: 'JNCC / State of Nature Partnership',
                dataset: 'State of Nature 2023 — Species Abundance Indicator',
                frequency: 'triennial',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Farmland bird index */}
        <ScrollReveal>
          <div id="sec-farmland" className="mb-12">
            <LineChart
              series={farmlandBirdSeries}
              title="Farmland bird index, England, 1970–2024"
              subtitle="Index of 19 farmland-specialist bird species. The steepest decline occurred 1975–1995 during peak agricultural intensification."
              yLabel="Index (1970 = 100)"
              source={{
                name: 'DEFRA',
                dataset: 'UK Biodiversity Indicators — C5 Birds of the wider countryside and at sea',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: BNG credits and habitat */}
        <ScrollReveal>
          <div id="sec-bng" className="mb-12">
            <LineChart
              series={bngSeries}
              title="Biodiversity net gain: credits registered and habitat created, 2024–2025"
              subtitle="Cumulative BNG credits and habitat hectares since mandatory BNG commenced in February 2024."
              yLabel="Cumulative total"
              source={{
                name: 'Natural England',
                dataset: 'Biodiversity Net Gain — Credit Sales and Habitat Register',
                frequency: 'quarterly',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Recovery is possible: BNG mandatory, red kite recovery, beaver reintroduction"
            value="3 breakthroughs"
            description="Biodiversity net gain became mandatory for all major developments in England from February 2024, requiring a minimum 10% uplift in habitat value — the first legal requirement of its kind. By end of 2025, over 2,300 credits had been registered and nearly 1,500 hectares of habitat created or enhanced. The red kite, reduced to just a handful of breeding pairs in the 1980s, now numbers around 10,000 birds following decades of careful reintroduction — one of the world's great conservation success stories. Beavers, absent from Britain for 400 years, are now established in over 450 colonies across multiple river catchments, delivering measurable improvements in water quality, flood attenuation, and wetland biodiversity. These examples show that with sustained commitment, species and habitat recovery is achievable at scale."
            source="Source: Natural England — BNG Register, 2025. BTO — Breeding Bird Survey, 2024. Beaver Trust — Colony Census, 2025."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <RelatedTopics />
      </main>
    </>
  );
}
