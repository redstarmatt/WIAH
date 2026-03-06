'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ─────────────────────────────────────────────────────────────────────

interface TfrPoint {
  year: number;
  tfr: number;
}

interface NationTfr {
  nation: string;
  tfr: number;
}

interface CountryTfr {
  country: string;
  tfr: number;
}

interface BirthRateData {
  totalFertilityRate: TfrPoint[];
  byNation2023: NationTfr[];
  internationalComparison: CountryTfr[];
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function BirthRatePage() {
  const [data, setData] = useState<BirthRateData | null>(null);

  useEffect(() => {
    fetch('/data/birth-rate/birth_rate.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const tfrSeries: Series[] = data
    ? [
        {
          id: 'uk-tfr',
          label: 'UK total fertility rate',
          colour: '#F4A261',
          data: data.totalFertilityRate.map(d => ({
            date: new Date(d.year, 0, 1),
            value: d.tfr,
          })),
        },
        {
          id: 'replacement-level',
          label: 'Replacement level (2.1)',
          colour: '#E5E7EB',
          data: data.totalFertilityRate.map(d => ({
            date: new Date(d.year, 0, 1),
            value: 2.1,
          })),
        },
      ]
    : [];

  return (
    <>
      <TopicNav topic="Birth Rate" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Birth Rate"
          question="Why are fewer babies being born in Britain?"
          finding="The UK's total fertility rate fell to 1.44 in 2023 — the lowest since records began in 1938, and well below the 2.1 replacement level. Scotland's rate is just 1.33. Childcare costs, housing unaffordability, and economic insecurity are cited as key drivers."
          colour="#F4A261"
        />

        <section className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The UK total fertility rate (TFR) — the average number of children a woman
              would have if she experienced the current age-specific fertility rates throughout
              her reproductive life — fell to 1.44 in 2023, a record low since ONS began
              reliable records in 1938. The replacement-level TFR is 2.1, the rate at which
              each generation replaces itself without net migration. The UK has been below
              replacement level every year since 1975. The current level is the furthest
              below replacement in recorded history.
            </p>
            <p>
              This matters because of what it means for the age structure of the population.
              A falling birth rate, combined with rising life expectancy, produces an older
              population with a higher ratio of retired people to working-age people. The
              OBR's long-term fiscal projections show that without either rising birth rates
              or sustained immigration, the working-age population supporting each retiree
              will fall significantly over the next half-century, creating structural pressures
              on pension, NHS, and care funding.
            </p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-trend', label: 'Long-term Trend' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="UK total fertility rate (2023)"
              value="1.44"
              unit="births per woman"
              direction="down"
              polarity="up-is-bad"
              changeText="Record low since 1938 · replacement level is 2.1"
              sparklineData={[1.98, 1.94, 1.82, 1.70, 1.58, 1.49, 1.44]}
              source="ONS Births Statistics · 2023"
            />
            <MetricCard
              label="Scotland fertility rate (2023)"
              value="1.33"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="Lowest in UK · projections show Scottish population falling mid-century"
              sparklineData={[1.80, 1.75, 1.65, 1.55, 1.45, 1.38, 1.33]}
              source="NRS Scotland · 2023"
            />
            <MetricCard
              label="Replacement rate"
              value="2.1"
              unit="needed"
              direction="flat"
              polarity="up-is-good"
              changeText="UK has been below replacement level every year since 1975"
              sparklineData={[2.1, 2.1, 2.1, 2.1, 2.1, 2.1, 2.1]}
              source="ONS / demographic standard"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div id="sec-trend" className="mb-12">
            <LineChart
              series={tfrSeries}
              title="UK total fertility rate, 1975–2023"
              subtitle="Average number of children per woman. Replacement level is 2.1."
              yLabel="Total fertility rate (births per woman)"

              annotations={[
                { date: new Date(1975, 0), label: '1975: falls below replacement' },
                { date: new Date(2010, 0), label: '2010: post-migration peak' },
                { date: new Date(2023, 0), label: '2023: record low' },
              ]}
            />
            <p className="font-mono text-[11px] text-wiah-mid mt-2">
              Source:{' '}
              <a
                href="https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/livebirths"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-wiah-black"
              >
                ONS — Births in England and Wales
              </a>{' '}
              · Annual
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div id="sec-sources" className="border-t border-wiah-border pt-8 mt-8">
            <h2 className="text-base font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
            <ul className="font-mono text-[11px] text-wiah-mid space-y-2">
              <li>
                <a
                  href="https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/livebirths"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-wiah-black"
                >
                  ONS — Births in England and Wales
                </a>{' '}
                · Annual
              </li>
              <li>
                <a
                  href="https://www.nrscotland.gov.uk/statistics-and-data/statistics/statistics-by-theme/vital-events/births"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-wiah-black"
                >
                  NRS Scotland — Vital Events: Births
                </a>{' '}
                · Annual
              </li>
              <li>
                <a
                  href="https://ec.europa.eu/eurostat/statistics-explained/index.php/Fertility_statistics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-wiah-black"
                >
                  Eurostat — Fertility Statistics
                </a>
              </li>
            </ul>
          </div>
        </ScrollReveal>
      </main>
    </>
  );
}
