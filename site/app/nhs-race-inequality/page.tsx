'use client'

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';
import RelatedTopics from '@/components/RelatedTopics';

const editorialRefs: Reference[] = [
  { num: 1, name: 'MBRRACE-UK', dataset: "Saving Lives, Improving Mothers' Care", url: 'https://www.npeu.ox.ac.uk/mbrrace-uk/reports', date: '2023', note: 'Black women 3.4x more likely to die in pregnancy/childbirth than white women; down from 4.3x peak' },
  { num: 2, name: 'NHS England', dataset: 'Workforce Race Equality Standard (WRES) Report', url: 'https://www.england.nhs.uk/about/equality/equality-hub/workforce-race-equality-standard/', date: '2023', note: '24.8% ethnic minority staff but only 10.5% in senior roles' },
  { num: 3, name: 'NHS England', dataset: 'NHS Staff Survey — Bullying and Harassment by Ethnicity', date: '2023', note: '31% of ethnic minority staff report bullying/harassment vs 24% for white staff' },
  { num: 4, name: 'NHS Race and Health Observatory', dataset: 'Ethnic Inequalities in Healthcare Review', date: '2022', note: 'COVID-19 mortality 1.5–2x higher among Black, Pakistani and Bangladeshi groups after adjustment' },
];

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
              Ethnic disparities in NHS care and outcomes are extensive, well-documented, and persistent. The most stark example is maternal mortality: MBRRACE-UK's confidential enquiry consistently shows that Black women are 3–4 times more likely to die during pregnancy or within 42 days of giving birth than white women, and Asian women are approximately 1.6 times more likely. These ratios have not meaningfully improved in over a decade of monitoring. In 2023, the disparity ratio for Black women was 3.4 — down from a peak of 4.3 in 2017, but the level of excess risk remains among the worst in Europe.<Cite nums={1} /> The NHS Race and Health Observatory, established in 2020, identified systemic factors including later booking for antenatal care, implicit bias in clinical decision-making, and lower rates of appropriate escalation when complications arise.
            </p>
            <p>
              Beyond maternity, ethnic disparities permeate the system. People from South Asian backgrounds are 2–4 times more likely to develop type 2 diabetes than the white British population, yet diabetes prevention programmes have lower take-up in South Asian communities. Black African and Black Caribbean men have a 3&times; higher rate of detention under the Mental Health Act compared with white men, reflecting decades of documented over-pathologisation. COVID-19 mortality was 1.5–2&times; higher among people from Black, Pakistani, and Bangladeshi backgrounds, even after adjusting for age, geography, and deprivation — a fact that prompted the NHS to commission reviews into its approach to health inequalities.<Cite nums={4} /> The Sewell Commission (2021) contested the framing of institutional racism but acknowledged that ethnic disparities in health outcomes were real and required action.
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
              changeText="Relative to white women · Down from 4.3&times; peak but still extreme"
              sparklineData={[4.1, 4.2, 4.3, 3.9, 3.7, 4.0, 3.7, 3.5, 3.4]}
              source="MBRRACE-UK · Saving Lives Report 2023"
              href="#sec-maternal"
            />
            <MetricCard
              label="Ethnic minority senior NHS leaders"
              value="10.5%"
              direction="up"
              polarity="up-is-good"
              changeText="vs 24.8% of all staff · Target: proportional by 2028"
              sparklineData={[7.4, 7.8, 8.1, 8.6, 9.0, 9.3, 9.7, 10.1, 10.5]}
              source="NHS England · WRES Report 2023"
              href="#sec-maternal"
            />
            <MetricCard
              label="Ethnic minority staff bullied/harassed"
              value="31%"
              direction="flat"
              polarity="up-is-bad"
              changeText="vs 24% for white staff · Barely changed since 2015"
              sparklineData={[30, 30, 31, 31, 30, 31, 31, 31]}
              source="NHS Staff Survey 2023"
              href="#sec-maternal"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-maternal" className="mb-12">
            {maternalSeries.length > 0 ? (
              <LineChart
                title="Maternal mortality disparity ratios, UK, 2015–2023"
                subtitle="Risk of maternal death relative to white women (set at 1.0). Black women face a persistent 3–4 fold excess risk."
                series={maternalSeries}
                yLabel="Risk ratio (vs White = 1.0)"
                source={{
                  name: 'MBRRACE-UK',
                  dataset: "Saving Lives, Improving Mothers' Care",
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
                title="Ethnic minority representation in the NHS workforce, 2015–2023"
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

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        {/* Sources */}
        <section className="border-t border-wiah-border pt-8 mt-12">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; methodology</h2>
          <div className="text-sm text-wiah-mid space-y-2">
            {data?.metadata.sources.map((src, i) => (
              <p key={i}>
                <strong>{src.name}.</strong> <em>{src.dataset}</em>. {src.frequency} — 
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
              <RelatedTopics />
      </main>
    </>
  );
}
