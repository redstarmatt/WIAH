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

// ── Types ─────────────────────────────────────────────────────────────────────

interface PopulationPoint { year: number; totalMillions: number; under16Pct: number; over65Pct: number; }
interface FertilityPoint { year: number; tfr: number; }
interface NetMigrationPoint { year: number; netMigrationK: number; }
interface LifeExpectancyPoint { year: number; maleLe: number; femaleLe: number; }

interface DemographicsData {
  national: {
    population: { timeSeries: PopulationPoint[]; latest: { year: number; totalMillions: number } };
    fertilityRate: { timeSeries: FertilityPoint[]; latest: { year: number; tfr: number }; replacementLevel: number };
    netMigration: { timeSeries: NetMigrationPoint[]; latest: { year: number; netMigrationK: number } };
    lifeExpectancy: { timeSeries: LifeExpectancyPoint[]; latest: { year: number; maleLe: number; femaleLe: number } };
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

function yearToDate(y: number): Date { return new Date(y, 0, 1); }

export default function DemographicsPage() {
  const [data, setData] = useState<DemographicsData | null>(null);

  useEffect(() => {
    fetch('/data/demographics/demographics_summary.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // 1. Total fertility rate
  const fertilityRateSeries: Series[] = data
    ? [{
        id: 'tfr',
        label: 'Total fertility rate',
        colour: '#E63946',
        data: data.national.fertilityRate.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.tfr,
        })),
      }]
    : [];

  const fertilityAnnotations: Annotation[] = [
    { date: new Date(2010, 0), label: '2010: Peak in boom' },
    { date: new Date(2024, 0), label: '2024: Record low 1.41' },
  ];

  // 2. Life expectancy (male and female)
  const lifeExpectancySeries: Series[] = data
    ? [
        {
          id: 'male',
          label: 'Male life expectancy',
          colour: '#264653',
          data: data.national.lifeExpectancy.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.maleLe,
          })),
        },
        {
          id: 'female',
          label: 'Female life expectancy',
          colour: '#2A9D8F',
          data: data.national.lifeExpectancy.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.femaleLe,
          })),
        },
      ]
    : [];

  const lifeExpectancyAnnotations: Annotation[] = [
    { date: new Date(2020, 0), label: '2020: COVID stall' },
  ];

  // 3. Net migration
  const netMigrationSeries: Series[] = data
    ? [{
        id: 'migration',
        label: 'Net migration (thousands)',
        colour: '#264653',
        data: data.national.netMigration.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.netMigrationK,
        })),
      }]
    : [];

  const migrationAnnotations: Annotation[] = [
    { date: new Date(2023, 0), label: '2023: Record high 906K' },
    { date: new Date(2024, 0), label: '2024: Falls to 204K' },
  ];

  // 4. Over-65s share
  const over65Series: Series[] = data
    ? [{
        id: 'over65',
        label: 'Over-65s (% of population)',
        colour: '#F4A261',
        data: data.national.population.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.over65Pct,
        })),
      }]
    : [];

  const latestPopulation = data?.national.population.latest;
  const latestFertility = data?.national.fertilityRate.latest;

  const latestOver65 = data?.national.population.timeSeries[data.national.population.timeSeries.length - 1];

  return (
    <>
      <TopicNav topic="Demographics" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Demographics"
          question="What's Actually Happening to Britain's Population?"
          finding={
            data
              ? `Britain's population is 68.9 million in 2024, but the fertility rate has fallen to a record low of 1.41 — far below the 2.1 replacement level. Population growth now depends almost entirely on immigration.`
              : "Britain's population is 68.9 million in 2024, but the fertility rate has fallen to a record low of 1.41 — far below the 2.1 replacement level. Population growth now depends almost entirely on immigration."
          }
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Britain's 68.9 million population rests on a demographic model that has fundamentally
              changed. Since 2001, the country added 9.8 million people—but natural increase
              (births minus deaths) contributed just 1.3 million. Migration delivered the other
              8.5 million. The total fertility rate has fallen to 1.41 children per woman, a record
              low and far below the 2.1 replacement threshold. Without net inward migration, the
              population would now be shrinking. One in five residents is over 65, up from one in
              six in 2001. The UK no longer grows itself; it imports growth, and even that lever
              has proved volatile.
            </p>
            <p>
              The fertility collapse is structural, not cyclical. Average house prices exceed eight
              times median earnings. Full-time childcare costs £14,000–£15,000 a
              year per child. Women delay first births into their thirties, compressing the window
              for larger families. These forces push the TFR further below replacement with each
              cohort. Migration filled the gap—net arrivals hit a record 906,000 in 2023,
              driven by post-Brexit visa schemes and humanitarian routes—but the political
              backlash was swift. By 2024, tighter rules cut net migration to 204,000, a 78% drop
              in a single year. That whiplash exposes the tension at the core of UK demography:
              the economy needs working-age migrants, but policy treats migration as a tap to be
              turned on and off.
            </p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-fertility', label: 'Fertility' },
          { id: 'sec-life-expectancy', label: 'Life Expectancy' },
          { id: 'sec-migration', label: 'Migration' },
          { id: 'sec-ageing', label: 'Ageing' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="UK population"
            value={latestPopulation ? `${latestPopulation.totalMillions}M` : '—'}
            unit="people"
            direction="up"
            polarity="up-is-good"
            changeText={
              latestPopulation
                ? `Up 9.8M since 2001 · Mostly from migration, not births`
                : 'Loading…'
            }
            sparklineData={
              data
                ? data.national.population.timeSeries.slice(-9).map(d => d.totalMillions)
                : []
            }
            source="ONS · Mid-year estimates 2024"
            baseline="Population growth now depends almost entirely on net migration"
          />
          <MetricCard
            label="Fertility rate"
            value={latestFertility ? `${latestFertility.tfr}` : '—'}
            unit="TFR"
            direction="down"
            polarity="up-is-good"
            changeText={
              latestFertility
                ? `Record low · was 1.94 in 2010 · Replacement: 2.1`
                : 'Loading…'
            }
            sparklineData={
              data
                ? data.national.fertilityRate.timeSeries.slice(-10).map(d => d.tfr)
                : []
            }
            source="ONS · Vital statistics 2024"
            baseline="Below replacement level — each woman has fewer children than needed to sustain population"
          />
          <MetricCard
            label="Over-65s"
            value={latestOver65 ? `${latestOver65.over65Pct}%` : '—'}
            unit="of population"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestOver65
                ? `1 in 5 people · was 15.9% in 2001 · ~13.2M people`
                : 'Loading…'
            }
            sparklineData={
              data
                ? data.national.population.timeSeries.slice(-9).map(d => d.over65Pct)
                : []
            }
            source="ONS · Mid-year estimates 2024"
            baseline="Rising share of retirees strains pensions, health, and social care"
          />
        </div>
        

        {/* Chart 1: Fertility rate */}
        <div id="sec-fertility">
        {fertilityRateSeries.length > 0 ? (
          <LineChart
            title="Total fertility rate, England and Wales, 2000–2024"
            subtitle="Children per woman. The replacement level (2.1) is marked. Below this, population declines without migration."
            series={fertilityRateSeries}
            annotations={fertilityAnnotations}
            targetLine={{ value: 2.1, label: 'Replacement level' }}
            yLabel="Children per woman"
            source={{
              name: 'ONS',
              dataset: 'Vital statistics: births — live births by age of mother',
              frequency: 'annual',
              url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/livebirths/datasets/birthsummarytables',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}
        </div>

        {/* Chart 2: Life expectancy */}
        <div id="sec-life-expectancy">
        {lifeExpectancySeries.length > 0 ? (
          <LineChart
            title="Life expectancy at birth, 2001–2023"
            subtitle="Males and females. England and Wales. Has stalled since 2020 due to excess deaths and health challenges."
            series={lifeExpectancySeries}
            annotations={lifeExpectancyAnnotations}
            yLabel="Years"
            source={{
              name: 'ONS',
              dataset: 'National life tables — life expectancy in the UK',
              frequency: 'annual',
              url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/lifeexpectancies',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}
        </div>

        {/* Chart 3: Net migration */}
        <div id="sec-migration">
        {netMigrationSeries.length > 0 ? (
          <LineChart
            title="Long-term net migration, UK, 2012–2024"
            subtitle="Thousands of people. Peaked at 906K in 2023 before falling sharply. Primary driver of recent population growth."
            series={netMigrationSeries}
            annotations={migrationAnnotations}
            yLabel="Thousands"
            source={{
              name: 'ONS',
              dataset: 'Long-term international migration',
              frequency: 'annual',
              url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/internationalmigration/bulletins/longterninternationalmigration',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}
        </div>

        {/* Chart 4: Over-65s share */}
        <div id="sec-ageing">
        {over65Series.length > 0 ? (
          <LineChart
            title="Population over 65, UK, 2001–2024"
            subtitle="Share of total population (%). Drives pensions, health, and social care costs. Expected to exceed 25% by 2050."
            series={over65Series}
            yLabel="Percent of population"
            source={{
              name: 'ONS',
              dataset: 'Mid-year population estimates by age',
              frequency: 'annual',
              url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/populationestimates/datasets/populationestimatesformidyearbyadminarea',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Positive callout */}
        <ScrollReveal>
        <PositiveCallout
          title="What's improving"
          value="3.1 years"
          unit="higher life expectancy since 2001"
          description="Life expectancy has risen from 75.9 years (male) and 80.4 years (female) in 2001 to 79.0 and 82.9 in 2023 — an increase of 3.1 and 2.5 years respectively. This reflects decades of health and living standard improvements. However, progress has stalled since 2020 due to excess deaths, long-term health conditions, and mental health crises."
          source="Source: ONS — National life tables. Based on mortality rates and population estimates."
        />
        </ScrollReveal>

        </div>

        {/* Sources */}
        <section className="border-t border-wiah-border pt-8">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; methodology</h2>
          <ul className="space-y-2 font-mono text-xs text-wiah-mid">
            {data?.metadata.sources.map((src, i) => (
              <li key={i}>
                <a href={src.url} className="underline hover:text-wiah-blue" target="_blank" rel="noreferrer">
                  {src.name} — {src.dataset} ({src.frequency})
                </a>
              </li>
            ))}
          </ul>
          <p className="font-mono text-xs text-wiah-mid mt-4">{data?.metadata.methodology}</p>
          {data?.metadata.knownIssues && data.metadata.knownIssues.length > 0 && (
            <div className="mt-4">
              <p className="font-mono text-xs text-wiah-mid font-bold mb-1">Known issues:</p>
              <ul className="list-disc list-inside space-y-1 font-mono text-xs text-wiah-mid">
                {data.metadata.knownIssues.map((issue, i) => <li key={i}>{issue}</li>)}
              </ul>
            </div>
          )}
        </section>
              <RelatedTopics />
      </main>
    </>
  );
}
