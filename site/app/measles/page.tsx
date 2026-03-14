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

const editorialRefs: Reference[] = [
  { num: 1, name: 'UKHSA', dataset: 'Confirmed cases of measles in England', date: '2024' },
  { num: 2, name: 'NHS Digital', dataset: 'Childhood Vaccination Coverage Statistics (COVER)', date: '2024' },
  { num: 3, name: 'The Lancet', dataset: 'Retraction — Ileal-lymphoid-nodular hyperplasia (Wakefield et al.)', date: '2010' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface MeaslesCasePoint {
  year: number;
  cases: number;
}

interface MMRCoveragePoint {
  year: number;
  coverage: number;
}

interface RegionData {
  region: string;
  cases2024: number;
  mmrDose2: number;
}

interface MeaslesData {
  measlesCases: MeaslesCasePoint[];
  mmrDose1: MMRCoveragePoint[];
  mmrDose2: MMRCoveragePoint[];
  byRegion: RegionData[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function MeaslesPage() {
  const [data, setData] = useState<MeaslesData | null>(null);

  useEffect(() => {
    fetch('/data/measles/measles.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const casesSeries: Series[] = data
    ? [{
        id: 'measles-cases',
        label: 'Confirmed cases',
        colour: '#E63946',
        data: data.measlesCases.map(d => ({
          date: yearToDate(d.year),
          value: d.cases,
        })),
      }]
    : [];

  const mmrCoverageSeries: Series[] = data
    ? [
        {
          id: 'mmr-dose1',
          label: 'MMR dose 1 (by age 2)',
          colour: '#264653',
          data: data.mmrDose1.map(d => ({
            date: yearToDate(d.year),
            value: d.coverage,
          })),
        },
        {
          id: 'mmr-dose2',
          label: 'MMR dose 2 (by age 5)',
          colour: '#E63946',
          data: data.mmrDose2.map(d => ({
            date: yearToDate(d.year),
            value: d.coverage,
          })),
        },
      ]
    : [];

  const dose2Series: Series[] = data
    ? [{
        id: 'mmr-dose2-solo',
        label: 'MMR dose 2 coverage (%)',
        colour: '#E63946',
        data: data.mmrDose2.map(d => ({
          date: yearToDate(d.year),
          value: d.coverage,
        })),
      }]
    : [];

  const latestCases = data?.measlesCases[data.measlesCases.length - 1];
  const latestDose2 = data?.mmrDose2[data.mmrDose2.length - 1];
  const latestDose1 = data?.mmrDose1[data.mmrDose1.length - 1];
  const peakCases = data?.measlesCases.reduce((a, b) => a.cases > b.cases ? a : b);

  const dose2Gap = latestDose2 ? (95 - latestDose2.coverage).toFixed(0) : '9';

  return (
    <>
      <TopicNav topic="NHS & Healthcare" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="NHS & Healthcare"
          question="Is measles actually coming back?"
          finding="England recorded 2,089 confirmed measles cases in 2024 — the highest since 2013. MMR dose 2 coverage has fallen to 86%, well below the 95% threshold needed for herd immunity. The West Midlands outbreak accounted for nearly a third of all cases."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Measles was effectively eliminated in England by 2016, with cases falling to fewer than 100 per year. That achievement is now unravelling. In 2024, confirmed cases surged to 2,089 — a tenfold increase on 2022 and the highest annual total since the Swansea outbreak of 2012-13.<Cite nums={1} /> The epicentre was Birmingham and the wider West Midlands, where 612 cases were concentrated in communities with historically low MMR uptake. London, with the lowest dose 2 coverage of any region at 80.3%, recorded 489 cases. These are not abstract numbers: measles hospitalises roughly one in five infected children, causes encephalitis in approximately one in 1,000 cases, and remains fatal in around one in 5,000 cases in developed countries.</p>
            <p>The roots of this resurgence stretch back more than two decades. Andrew Wakefield's fraudulent 1998 paper linking MMR to autism — retracted by The Lancet in 2010<Cite nums={3} /> and comprehensively debunked by studies involving millions of children — triggered a collapse in MMR uptake that created a cohort of unvaccinated young people now in their twenties. While first-dose coverage partially recovered, second-dose uptake has declined steadily from a peak of 92.7% in 2015 to 86.0% in 2024.<Cite nums={2} /> The COVID-19 pandemic accelerated this decline: routine childhood vaccination appointments were disrupted during lockdowns, and catch-up efforts have not fully compensated. Social media misinformation about vaccines, amplified during the pandemic, has further eroded confidence in some communities.</p>
            <p>The 95% coverage threshold for herd immunity against measles is not arbitrary — it reflects the virus's extraordinary infectiousness. Measles has a basic reproduction number (R0) of 12-18, meaning each infected person will infect 12 to 18 others in an unvaccinated population. At 86% dose 2 coverage, England has a 9 percentage point gap to close.<Cite nums={2} /> Every percentage point below 95% represents roughly 12,000 five-year-olds entering school without full protection each year. The geographic concentration of under-vaccination — particularly in urban areas with high population density and mobility — means outbreaks can spread rapidly once a case is introduced, as the 2024 West Midlands experience demonstrated.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-cases', label: 'Cases' },
          { id: 'sec-coverage', label: 'MMR coverage' },
          { id: 'sec-dose2', label: 'Dose 2 decline' },
          { id: 'sec-regional', label: 'Regional' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Measles cases (2024)"
            value={latestCases ? latestCases.cases.toLocaleString() : '2,089'}
            unit="confirmed"
            direction="up"
            polarity="up-is-bad"
            changeText="highest since 2013 · West Midlands outbreak"
            sparklineData={
              data ? sparkFrom(data.measlesCases.map(d => d.cases)) : []
            }
            source="UKHSA · Confirmed cases of measles, 2024"
            href="#sec-cases"
          />
          <MetricCard
            label="MMR dose 2 coverage"
            value={latestDose2 ? `${latestDose2.coverage}%` : '86.0%'}
            unit="by age 5"
            direction="down"
            polarity="up-is-good"
            changeText={`${dose2Gap}pp below 95% herd immunity threshold`}
            sparklineData={
              data ? sparkFrom(data.mmrDose2.map(d => d.coverage)) : []
            }
            source="NHS Digital · Childhood Vaccination Coverage, 2024"
            href="#sec-coverage"
          />
          <MetricCard
            label="MMR dose 1 coverage"
            value={latestDose1 ? `${latestDose1.coverage}%` : '91.8%'}
            unit="by age 2"
            direction="down"
            polarity="up-is-good"
            changeText="down from 94.4% in 2015 · 3.2pp below target"
            sparklineData={
              data ? sparkFrom(data.mmrDose1.map(d => d.coverage)) : []
            }
            source="NHS Digital · Childhood Vaccination Coverage, 2024"
            href="#sec-dose2"
          />
        </div>

        {/* Chart 1: Measles cases */}
        <ScrollReveal>
          <div id="sec-cases" className="mb-12">
            <LineChart
              series={casesSeries}
              title="Confirmed measles cases in England, 2010–2024"
              subtitle="Laboratory-confirmed cases. 2024 saw the highest total since the 2012-13 outbreak."
              yLabel="Cases"
              annotations={[
                { date: new Date(2010, 0, 1), label: 'Wakefield paper retracted' },
                { date: new Date(2020, 2, 1), label: 'COVID-19 pandemic' },
              ]}
              source={{
                name: 'UK Health Security Agency',
                dataset: 'Confirmed cases of measles in England',
                frequency: 'quarterly',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: MMR coverage — dose 1 and dose 2 */}
        <ScrollReveal>
          <div id="sec-coverage" className="mb-12">
            <LineChart
              series={mmrCoverageSeries}
              title="MMR vaccination coverage, England, 2010–2024"
              subtitle="Dose 1 (by age 2) and dose 2 (by age 5). WHO recommends 95% for herd immunity."
              yLabel="Coverage (%)"
              targetLine={{ value: 95, label: '95% herd immunity threshold' }}
              source={{
                name: 'NHS Digital',
                dataset: 'Childhood Vaccination Coverage Statistics (COVER)',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Dose 2 decline */}
        <ScrollReveal>
          <div id="sec-dose2" className="mb-12">
            <LineChart
              series={dose2Series}
              title="MMR dose 2 coverage decline, England, 2010–2024"
              subtitle="Steady decline from 92.7% peak in 2015. Now 9 percentage points below herd immunity threshold."
              yLabel="Coverage (%)"
              targetLine={{ value: 95, label: '95% target' }}
              annotations={[
                { date: new Date(2020, 2, 1), label: 'COVID disrupts routine vaccination' },
              ]}
              source={{
                name: 'UK Health Security Agency',
                dataset: 'COVER programme — vaccine uptake',
                frequency: 'quarterly',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 4: Regional variation */}
        <ScrollReveal>
          <div id="sec-regional" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Measles cases and MMR dose 2 coverage by region, 2024
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                Regions with lowest MMR uptake saw the most cases. West Midlands and London — both below 83% dose 2 coverage — accounted for over half of all cases.
              </p>
              <div className="mt-6 space-y-4">
                {data?.byRegion.map((r) => {
                  const maxCases = 650;
                  const pct = (r.cases2024 / maxCases) * 100;
                  return (
                    <div key={r.region}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{r.region}</span>
                        <span className="font-mono text-sm text-wiah-black">
                          <span className="font-bold">{r.cases2024}</span> cases · <span className="text-wiah-mid">{r.mmrDose2}% dose 2</span>
                        </span>
                      </div>
                      <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{ width: `${pct}%`, backgroundColor: '#E63946' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">Source: UKHSA — Confirmed measles cases by region, 2024. NHS Digital — COVER programme, 2024.</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="NHS catch-up campaigns are closing the gap"
            value="2.3 million"
            description="NHS England launched targeted MMR catch-up campaigns in early 2024, focusing on areas with the lowest uptake. Over 2.3 million additional vaccination invitations were sent to unvaccinated and partially vaccinated children and young adults aged 6 to 25. Pop-up vaccination clinics in schools, community centres, and mosques in Birmingham reached families who had not engaged with routine GP-based invitations. Early data from the West Midlands shows a 4 percentage point increase in MMR dose 1 uptake among targeted communities. The national programme is being expanded through 2025-26, with a goal of returning dose 2 coverage above 90% by 2027."
            source="Source: NHS England — MMR catch-up campaign progress report, 2024. UKHSA — COVER programme quarterly data."
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
