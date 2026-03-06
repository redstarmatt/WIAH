'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import SiteName from '@/components/SiteName';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';

interface BirthPoint {
  year: number;
  births: number;
  birthRate: number | null;
  tfr: number | null;
}

interface DemographicsData {
  population: {
    england: { year: number; population: number }[];
    uk: { year: number; population: number }[];
  };
  births: BirthPoint[];
}

export default function AboutPage() {
  const [demog, setDemog] = useState<DemographicsData | null>(null);

  useEffect(() => {
    fetch('/data/demographics/demographics.json')
      .then(r => r.json())
      .then(setDemog)
      .catch(console.error);
  }, []);

  const populationSeries: Series[] = demog
    ? [{
        id: 'uk-pop',
        label: 'UK population',
        colour: '#0D1117',
        data: demog.population.uk.map(d => ({
          date: new Date(d.year, 0, 1),
          value: Math.round(d.population / 1_000_000 * 10) / 10,
        })),
      }]
    : [];

  const tfrSeries: Series[] = demog
    ? [{
        id: 'tfr',
        label: 'Total fertility rate',
        colour: '#E63946',
        data: demog.births
          .filter(d => d.tfr !== null && d.year >= 1960)
          .map(d => ({
            date: new Date(d.year, 0, 1),
            value: d.tfr!,
          })),
      }]
    : [];

  const tfrAnnotations: Annotation[] = [
    { date: new Date(1977, 0), label: '1977: First below replacement' },
    { date: new Date(2012, 0), label: '2012: Post-recession peak' },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-wiah-border px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/"><SiteName size="nav" /></Link>
          <Link href="/" className="text-sm text-wiah-blue hover:underline">← All topics</Link>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-extrabold text-wiah-black mb-6">About</h1>
        <div className="max-w-2xl text-base text-wiah-black leading-[1.7] space-y-4 mb-12">
          <p>
            <strong>What is <em>actually</em> happening?</strong> is a curated national data platform
            that makes the real state of the UK visible, understandable, and shareable.
          </p>
          <p>
            Each topic answers one question with 2–3 carefully chosen, data-driven visual stories.
            Every number has a dated, linked source. The methodology is transparent.
            There are no ads and no agenda.
          </p>
          <h2 className="text-xl font-bold pt-4">Principles</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Every number has a source — visible, linked, dated.</li>
            <li>Direct, not blunt. Specific, not vague.</li>
            <li>Contextual, not campaigning.</li>
            <li>Honest about uncertainty.</li>
          </ul>
          <h2 className="text-xl font-bold pt-4">Data sources</h2>
          <p>
            All data comes from official UK government and public body publications:
            NHS Digital, ONS, Environment Agency, Home Office, DfE, and others.
            Raw data is fetched, cleaned, and transformed by open-source pipelines.
          </p>
        </div>

        {/* Demographic context */}
        <div className="border-t border-wiah-border pt-10 mb-4">
          <h2 className="text-2xl font-bold text-wiah-black mb-2">The demographic backdrop</h2>
          <p className="text-base text-wiah-mid max-w-2xl mb-8">
            Many of the pressures documented across this site share a common context:
            a growing population whose birth rate has been below replacement level since the 1970s.
          </p>
        </div>

        {populationSeries.length > 0 ? (
          <LineChart
            title="UK population, 1971–2025"
            subtitle="Mid-year population estimates, millions. UK population has grown from 56 million in 1971 to over 68 million today."
            series={populationSeries}
            yLabel="Population (millions)"
            source={{
              name: 'ONS',
              dataset: 'Population estimates time series (UKPOP)',
              frequency: 'annual',
              url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/populationestimates/timeseries/ukpop/pop',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {tfrSeries.length > 0 ? (
          <LineChart
            title="Total fertility rate, England and Wales, 1960–2022"
            subtitle="Average number of children per woman. The UK birth rate has been below the 2.1 replacement level since 1973. The 2022 rate of 1.49 is near a record low."
            series={tfrSeries}
            annotations={tfrAnnotations}
            targetLine={{ value: 2.1, label: 'Replacement rate (2.1)' }}
            yLabel="Children per woman"
            source={{
              name: 'ONS',
              dataset: 'Births summary tables, England and Wales',
              frequency: 'annual',
              url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/livebirths/datasets/birthsummarytables',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}
      </main>
    </>
  );
}
