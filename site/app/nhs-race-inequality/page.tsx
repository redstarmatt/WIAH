'use client'

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface NhsRaceData {
  maternalMortalityRatio: Array<{ year: number; blackRatio: number; asianRatio: number; whiteRatio: number }>;
  workforceProgression: Array<{ year: number; bameStaffPct: number; bameSeniorPct: number }>;
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function NhsRaceInequalityPage() {
  const [data, setData] = useState<NhsRaceData | null>(null);

  useEffect(() => {
    fetch('/data/nhs-race-inequality/nhs_race_inequality.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const maternalSeries: Series[] = data
    ? [
        {
          id: 'black-maternal',
          label: 'Black women (ratio vs White)',
          colour: '#E63946',
          data: data.maternalMortalityRatio.map(d => ({
            date: yearToDate(d.year),
            value: d.blackRatio,
          })),
        },
        {
          id: 'asian-maternal',
          label: 'Asian women (ratio vs White)',
          colour: '#F4A261',
          data: data.maternalMortalityRatio.map(d => ({
            date: yearToDate(d.year),
            value: d.asianRatio,
          })),
        },
      ]
    : [];

  const workforceSeries: Series[] = data
    ? [
        {
          id: 'bame-staff',
          label: 'Ethnic minority staff (all roles)',
          colour: '#264653',
          data: data.workforceProgression.map(d => ({
            date: yearToDate(d.year),
            value: d.bameStaffPct,
          })),
        },
        {
          id: 'bame-senior',
          label: 'Ethnic minority staff (senior roles)',
          colour: '#E63946',
          data: data.workforceProgression.map(d => ({
            date: yearToDate(d.year),
            value: d.bameSeniorPct,
          })),
        },
      ]
    : [];

  return (
    <>
      <TopicNav topic="NHS Race Inequality" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="NHS Race Inequality"
          question="Does the NHS Treat Everyone Equally?"
          finding="Black women in the UK are 3.4 times more likely to die in pregnancy or childbirth than white women. Ethnic minority staff make up 24.8% of the NHS workforce but just 10.5% of senior leaders. Despite a decade of the Workforce Race Equality Standard, the gap between staff experience and representation at senior level has barely narrowed."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Ethnic disparities in NHS care are extensive, well-documented, and persistent. The starkest is maternal mortality: Black women are 3.4 times more likely to die in pregnancy or within 42 days of childbirth than white women (down from a peak ratio of 4.3 in 2017), and Asian women are approximately 1.6 times more likely &mdash; ratios that have not meaningfully improved in over a decade. Beyond maternity, South Asian people are 2&ndash;4 times more likely to develop type 2 diabetes; Black African and Black Caribbean men are detained under the Mental Health Act at 3 times the rate of white men; and COVID-19 mortality was 1.5&ndash;2 times higher among Black, Pakistani, and Bangladeshi populations after adjusting for age and deprivation. After nine years of mandatory Workforce Race Equality Standard (WRES) reporting, ethnic minority staff make up 24.8% of the NHS workforce but only 10.5% of senior leaders &mdash; the &ldquo;snowy white peaks&rdquo; pattern that has barely shifted since monitoring began.
            </p>
            <p>
              The burden of inequality is concentrated in specific communities. Pakistani and Bangladeshi women have the lowest breast and cervical screening attendance, contributing to later-stage cancer diagnoses. Gypsy, Roma, and Traveller communities have life expectancy 10&ndash;25 years below the national average and are systematically under-counted in NHS data. Internationally educated nurses &mdash; predominantly Black African &mdash; report the highest rates of bullying and harassment at 31% versus 24% for white British staff, and face disciplinary proceedings at 1.1 times the rate of white colleagues even after controlling for role and grade. The NHS EDI Improvement Plan (2023) commits to proportional senior representation by 2028, but trajectory analysis suggests that target will take at least another decade to reach.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-maternal', label: 'Maternal Mortality' },
          { id: 'sec-workforce', label: 'Workforce' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Black maternal mortality disparity"
              value="3.4&times;"
              direction="down"
              polarity="up-is-bad"
              changeText="Relative to white women &middot; Down from 4.3&times; peak but still extreme"
              sparklineData={[4.1, 4.2, 4.3, 3.9, 3.7, 4.0, 3.7, 3.5, 3.4]}
              source="MBRRACE-UK &middot; Saving Lives Report 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="Ethnic minority senior NHS leaders"
              value="10.5%"
              direction="up"
              polarity="up-is-good"
              changeText="vs 24.8% of all staff &middot; Target: proportional by 2028"
              sparklineData={[7.4, 7.8, 8.1, 8.6, 9.0, 9.3, 9.7, 10.1, 10.5]}
              source="NHS England &middot; WRES Report 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="Ethnic minority staff bullied/harassed"
              value="31%"
              direction="flat"
              polarity="up-is-bad"
              changeText="vs 24% for white staff &middot; Barely changed since 2015"
              sparklineData={[30, 30, 31, 31, 30, 31, 31, 31]}
              source="NHS Staff Survey 2023"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-maternal" className="mb-12">
            {maternalSeries.length > 0 ? (
              <LineChart
                title="Maternal mortality disparity ratios, UK, 2015&ndash;2023"
                subtitle="Risk of maternal death relative to white women (set at 1.0). Black women face a persistent 3&ndash;4 fold excess risk."
                series={maternalSeries}
                yLabel="Risk ratio (vs White = 1.0)"
                source={{
                  name: 'MBRRACE-UK',
                  dataset: 'Saving Lives, Improving Mothers&apos; Care',
                  frequency: 'annual',
                  url: 'https://www.npeu.ox.ac.uk/mbrrace-uk/reports',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-workforce" className="mb-12">
            {workforceSeries.length > 0 ? (
              <LineChart
                title="Ethnic minority representation in the NHS workforce, 2015&ndash;2023"
                subtitle="Share of all staff vs senior roles (band 8a+). The gap illustrates the &ldquo;snowy white peaks&rdquo; of NHS leadership."
                series={workforceSeries}
                yLabel="Percentage (%)"
                source={{
                  name: 'NHS England',
                  dataset: 'Workforce Race Equality Standard',
                  frequency: 'annual',
                  url: 'https://www.england.nhs.uk/about/equality/equality-hub/workforce-race-equality-standard/',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        {/* Sources */}
        <section className="border-t border-wiah-border pt-8 mt-12">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; methodology</h2>
          <div className="text-sm text-wiah-mid space-y-2">
            {data?.metadata.sources.map((src, i) => (
              <p key={i}>
                <strong>{src.name}.</strong> <em>{src.dataset}</em>. {src.frequency} &mdash;&nbsp;
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="underline text-wiah-blue hover:no-underline">
                  {src.url}
                </a>
              </p>
            ))}
          </div>
          <p className="text-sm text-wiah-mid mt-6">{data?.metadata.methodology}</p>
          {data?.metadata.knownIssues && data.metadata.knownIssues.length > 0 && (
            <div className="mt-6 p-4 bg-wiah-light rounded">
              <p className="font-bold text-wiah-black mb-2">Known issues:</p>
              <ul className="text-sm text-wiah-mid space-y-1 list-disc list-inside">
                {data.metadata.knownIssues.map((issue, i) => (
                  <li key={i}>{issue}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
