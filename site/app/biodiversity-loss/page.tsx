'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// ── Types ────────────────────────────────────────────────────────────────────

interface SpeciesPoint {
  year: number;
  farmlandIndex: number;
  woodlandIndex: number;
  allSpeciesIndex: number;
}

interface ProtectedSitePoint {
  year: number;
  sssiFavourablePct: number;
  sssiUnfavourablePct: number;
  sssiDamagedPct: number;
}

interface RiverHealthPoint {
  year: number;
  goodEcologicalStatusPct: number;
}

interface PollinatorPoint {
  year: number;
  wildBeeSpeciesIndex: number;
  butterflyAbundanceIndex: number;
}

interface BiodiversityData {
  speciesAbundance: SpeciesPoint[];
  protectedSites: ProtectedSitePoint[];
  riverHealth: RiverHealthPoint[];
  pollinators: PollinatorPoint[];
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function BiodiversityLossPage() {
  const [data, setData] = useState<BiodiversityData | null>(null);

  useEffect(() => {
    fetch('/data/biodiversity-loss/biodiversity_loss.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const speciesSeries: Series[] = data
    ? [
        {
          id: 'farmland',
          label: 'Farmland species',
          colour: '#E63946',
          data: data.speciesAbundance.map(d => ({
            date: yearToDate(d.year),
            value: d.farmlandIndex,
          })),
        },
        {
          id: 'woodland',
          label: 'Woodland species',
          colour: '#264653',
          data: data.speciesAbundance.map(d => ({
            date: yearToDate(d.year),
            value: d.woodlandIndex,
          })),
        },
        {
          id: 'all-species',
          label: 'All species (aggregate)',
          colour: '#6B7280',
          data: data.speciesAbundance.map(d => ({
            date: yearToDate(d.year),
            value: d.allSpeciesIndex,
          })),
        },
      ]
    : [];

  const protectedSiteSeries: Series[] = data
    ? [
        {
          id: 'sssi-favourable',
          label: 'Favourable condition (%)',
          colour: '#2A9D8F',
          data: data.protectedSites.map(d => ({
            date: yearToDate(d.year),
            value: d.sssiFavourablePct,
          })),
        },
        {
          id: 'sssi-damaged',
          label: 'Damaged/destroyed (%)',
          colour: '#E63946',
          data: data.protectedSites.map(d => ({
            date: yearToDate(d.year),
            value: d.sssiDamagedPct,
          })),
        },
      ]
    : [];

  const pollinatorSeries: Series[] = data
    ? [
        {
          id: 'wild-bees',
          label: 'Wild bee species index',
          colour: '#F4A261',
          data: data.pollinators.map(d => ({
            date: yearToDate(d.year),
            value: d.wildBeeSpeciesIndex,
          })),
        },
        {
          id: 'butterflies',
          label: 'Butterfly abundance index',
          colour: '#264653',
          data: data.pollinators.map(d => ({
            date: yearToDate(d.year),
            value: d.butterflyAbundanceIndex,
          })),
        },
      ]
    : [];

  // ── Annotations ─────────────────────────────────────────────────────────

  const speciesAnnotations: Annotation[] = [
    { date: new Date(1992, 0, 1), label: '1992: Rio Earth Summit' },
    { date: new Date(2010, 0, 1), label: '2010: Aichi biodiversity targets set' },
    { date: new Date(2022, 0, 1), label: '2022: Kunming-Montreal framework' },
  ];

  const protectedAnnotations: Annotation[] = [
    { date: new Date(2019, 0, 1), label: '2019: 30x30 target proposed' },
    { date: new Date(2024, 0, 1), label: '2024: BNG mandatory' },
  ];

  const pollinatorAnnotations: Annotation[] = [
    { date: new Date(2013, 0, 1), label: '2013: EU neonicotinoid restrictions' },
    { date: new Date(2018, 0, 1), label: '2018: Full neonicotinoid ban' },
  ];

  // ── Derived values ────────────────────────────────────────────────────────

  const latestSpecies = data?.speciesAbundance[data.speciesAbundance.length - 1];
  const latestRiver = data?.riverHealth[data.riverHealth.length - 1];
  const latestPollinator = data?.pollinators[data.pollinators.length - 1];

  return (
    <>
      <TopicNav topic="Biodiversity Loss" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment & Climate"
          question="Are Britain's Species Recovering?"
          finding="The UK has lost nearly half its wildlife abundance since 1970. Farmland species have fallen 59%, rivers are in their worst recorded condition, and pollinator populations continue a four-decade decline. Despite new legal protections, recovery remains a promise rather than a trend."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The UK is one of the most nature-depleted countries on Earth, ranked in the bottom 10% globally for
              biodiversity intactness. Since systematic monitoring began in 1970, aggregate species abundance has
              fallen 42%. The decline is not uniform: farmland birds and insects have been devastated by
              agricultural intensification, hedgerow removal, and pesticide use, while woodland species have fared
              somewhat better but still show persistent erosion. One in six UK species is now classified as
              threatened with extinction.
            </p>
            <p>
              Protected sites tell a similar story. Only 36% of England's Sites of Special Scientific Interest are
              in favourable condition, against a government target of 95% that was supposed to be met by 2010.
              Rivers are in their worst state since monitoring began under the Water Framework Directive: just 14%
              of English rivers meet good ecological status, driven by agricultural runoff, sewage discharges, and
              chronic underinvestment in water infrastructure.
            </p>
            <p>
              There are grounds for cautious optimism. Biodiversity Net Gain became mandatory for new developments
              in 2024, requiring a 10% measurable improvement. Environmental Land Management schemes are paying
              farmers for nature recovery rather than just production. But reversing half a century of decline
              requires sustained funding and enforcement at a scale the UK has not yet demonstrated.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-species', label: 'Species decline' },
          { id: 'sec-protected', label: 'Protected sites' },
          { id: 'sec-pollinators', label: 'Pollinators' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Species abundance since 1970"
            value={latestSpecies ? `${100 - latestSpecies.allSpeciesIndex}% lost` : '42% lost'}
            unit=""
            direction="down"
            polarity="up-is-good"
            changeText="All-species index at 58 (baseline 100 in 1970) · farmland species worst affected"
            sparklineData={
              data ? sparkFrom(data.speciesAbundance.map(d => d.allSpeciesIndex)) : []
            }
            source="JNCC / DEFRA · UK Biodiversity Indicators, 2024"
            href="#sec-species"
          />
          <MetricCard
            label="Rivers in good ecological status"
            value={latestRiver ? `${latestRiver.goodEcologicalStatusPct}%` : '14%'}
            unit=""
            direction="down"
            polarity="up-is-good"
            changeText="Down from 27% in 2012 · worst on record · target is 100% by 2027"
            sparklineData={
              data ? data.riverHealth.map(d => d.goodEcologicalStatusPct) : []
            }
            source="Environment Agency · WFD Classification, 2024"
            href="#sec-protected"
          />
          <MetricCard
            label="Butterfly abundance since 1980"
            value={latestPollinator ? `${100 - latestPollinator.butterflyAbundanceIndex}% lost` : '54% lost'}
            unit=""
            direction="down"
            polarity="up-is-good"
            changeText="Index at 46 (baseline 100 in 1980) · widespread habitat loss and pesticide impacts"
            sparklineData={
              data ? sparkFrom(data.pollinators.map(d => d.butterflyAbundanceIndex)) : []
            }
            source="UK Centre for Ecology & Hydrology · PoMS, 2024"
            href="#sec-pollinators"
          />
        </div>

        {/* Chart 1: Species abundance */}
        <ScrollReveal>
          <div id="sec-species" className="mb-12">
            <LineChart
              series={speciesSeries}
              title="UK species abundance index, 1970-2024"
              subtitle="Aggregated abundance index for monitored species, set to 100 in 1970. Farmland species have declined 59%, driven by agricultural intensification and habitat loss."
              yLabel="Index (1970 = 100)"
              annotations={speciesAnnotations}
              source={{
                name: 'JNCC / DEFRA',
                dataset: 'UK Biodiversity Indicators — C4a',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Protected site condition */}
        <ScrollReveal>
          <div id="sec-protected" className="mb-12">
            <LineChart
              series={protectedSiteSeries}
              title="SSSI condition, England, 2010-2025"
              subtitle="Percentage of Sites of Special Scientific Interest rated favourable vs damaged/destroyed by Natural England. The 95% favourable target set for 2010 has never been approached."
              yLabel="Percentage (%)"
              annotations={protectedAnnotations}
              source={{
                name: 'Natural England',
                dataset: 'SSSI Condition Summary',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Pollinator decline */}
        <ScrollReveal>
          <div id="sec-pollinators" className="mb-12">
            <LineChart
              series={pollinatorSeries}
              title="Pollinator abundance indices, UK, 1980-2024"
              subtitle="Wild bee species richness and butterfly abundance, indexed to 100 in 1980. Despite neonicotinoid bans, decline has continued across both groups."
              yLabel="Index (1980 = 100)"
              annotations={pollinatorAnnotations}
              source={{
                name: 'UK Centre for Ecology & Hydrology',
                dataset: 'Pollinator Monitoring Scheme',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Biodiversity Net Gain and farmer payments for nature"
            value="10%"
            unit="mandatory biodiversity gain for new developments"
            description="Biodiversity Net Gain became mandatory for most new developments in England from February 2024, requiring a 10% measurable improvement in biodiversity value compared to the pre-development baseline. Early monitoring shows 85% of planning applications now include a BNG assessment. Alongside this, Environmental Land Management schemes (SFI, Countryside Stewardship, Landscape Recovery) are now paying over 30,000 farmers to deliver nature recovery on farmland, covering hedgerow restoration, wildflower margins, and reduced pesticide use. The Kunming-Montreal Global Biodiversity Framework, agreed in December 2022, commits the UK to protecting 30% of land and sea by 2030."
            source="Source: Natural England — Biodiversity Net Gain monitoring, 2025. DEFRA — Environmental Land Management statistics, 2025. CBD — Kunming-Montreal Framework, 2022."
          />
        </ScrollReveal>

        {/* Sources & Methodology */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-wiah-blue hover:underline"
                >
                  {src.name} — {src.dataset}
                </a>
                <div className="text-xs text-wiah-mid">Updated {src.frequency}</div>
              </div>
            ))}
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Methodology</h3>
            <p>{data?.metadata.methodology}</p>
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Known issues</h3>
            <ul className="list-disc list-inside space-y-1">
              {data?.metadata.knownIssues.map((x, i) => <li key={i}>{x}</li>)}
            </ul>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
