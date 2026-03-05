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
              Ethnic disparities in NHS care and outcomes are extensive, well-documented, and persistent. The most stark example is maternal mortality: MBRRACE-UK&apos;s confidential enquiry consistently shows that Black women are 3&ndash;4 times more likely to die during pregnancy or within 42 days of giving birth than white women, and Asian women are approximately 1.6 times more likely. These ratios have not meaningfully improved in over a decade of monitoring. In 2023, the disparity ratio for Black women was 3.4 &mdash; down from a peak of 4.3 in 2017, but the level of excess risk remains among the worst in Europe. The NHS Race and Health Observatory, established in 2020, identified systemic factors including later booking for antenatal care, implicit bias in clinical decision-making, and lower rates of appropriate escalation when complications arise.
            </p>
            <p>
              Beyond maternity, ethnic disparities permeate the system. People from South Asian backgrounds are 2&ndash;4 times more likely to develop type 2 diabetes than the white British population, yet diabetes prevention programmes have lower take-up in South Asian communities. Black African and Black Caribbean men have a 3&times; higher rate of detention under the Mental Health Act compared with white men, reflecting decades of documented over-pathologisation. COVID-19 mortality was 1.5&ndash;2&times; higher among people from Black, Pakistani, and Bangladeshi backgrounds, even after adjusting for age, geography, and deprivation &mdash; a fact that prompted the NHS to commission reviews into its approach to health inequalities. The Sewell Commission (2021) contested the framing of institutional racism but acknowledged that ethnic disparities in health outcomes were real and required action.
            </p>
            <p>
              The Workforce Race Equality Standard (WRES), introduced in 2015, requires all NHS trusts to report annually on nine indicators of race equality, including the relative likelihood of ethnic minority staff being disciplined, accessing training, and being appointed from shortlisting. After nine years of mandatory reporting, progress is measurable but slow. Ethnic minority staff make up 24.8% of the total NHS workforce &mdash; reflecting heavy international recruitment, particularly of nurses and doctors from India, Nigeria, the Philippines, and the Caribbean &mdash; but only 10.5% of staff at Agenda for Change band 8a and above (the senior management threshold). The &ldquo;snowy white peaks&rdquo; metaphor coined by Roger Kline in 2014 remains apt: the higher you look in the NHS hierarchy, the whiter it becomes. The NHS People Plan (2020) and the NHS Equality, Diversity and Inclusion Improvement Plan (2023) both commit to proportional representation in senior roles by 2028, but current trajectory analysis suggests this target will not be met for at least another decade.
            </p>
            <p>
              The burden of inequality falls most heavily on specific communities and in specific settings. Pakistani and Bangladeshi women have the lowest rates of NHS breast and cervical screening attendance, reflecting language barriers, cultural factors, and lower awareness of screening programmes &mdash; contributing to later-stage cancer diagnoses and poorer survival rates. Gypsy, Roma, and Traveller communities have life expectancy 10&ndash;25 years below the national average and are systematically under-counted in NHS data, meaning their health needs are largely invisible in planning. Within the workforce, internationally educated nurses (predominantly from Black African backgrounds) report the highest rates of bullying and harassment in the annual NHS Staff Survey, at 31% compared with 24% for white British staff. Disciplinary proceedings are 1.1&times; more likely to be initiated against ethnic minority staff, even after controlling for role, grade, and setting &mdash; a ratio that has barely shifted since WRES reporting began.
            </p>
            <p>
              Data quality is a fundamental barrier to addressing ethnic health inequalities. Around 10% of hospital episode records have ethnicity coded as &ldquo;not stated&rdquo; or &ldquo;not known,&rdquo; and in primary care the figure is significantly higher, with many GP systems still using outdated ethnicity categories. This means analyses of ethnic disparities in diagnosis, treatment, and outcomes are systematically underpowered. MBRRACE-UK&apos;s maternal mortality ratios use rolling three-year averages because annual death numbers are small, meaning the ratios respond slowly to real changes. WRES data relies on self-declaration in the Electronic Staff Record, with a non-declaration rate of approximately 15% &mdash; if non-declarers are disproportionately from one ethnic group, the published figures will be biased. Aggregating all ethnic minority groups into a single category (sometimes labelled &ldquo;BAME&rdquo;) obscures enormous variation: Chinese and Indian populations have health outcomes comparable to or better than white British on many measures, while Bangladeshi, Pakistani, and Black Caribbean groups face the steepest disadvantages.
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
