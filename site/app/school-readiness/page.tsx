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
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'DfE', dataset: 'Early Years Foundation Stage Profile results', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/early-years-foundation-stage-profile-results', date: 'November 2024' },
  { num: 2, name: 'DfE', dataset: 'EYFSP additional tables — disadvantage gap', url: 'https://www.gov.uk/government/statistics/early-years-foundation-stage-profile-results-2023-to-2024', date: 'November 2024' },
  { num: 3, name: 'Education Policy Institute', dataset: 'Annual Report — London effect and early years', url: 'https://epi.org.uk', date: '2024' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface GLDPoint {
  year: number;
  percent: number;
  note?: string;
}

interface GapPoint {
  year: number;
  gapPP: number;
  note?: string;
}

interface CommLangPoint {
  year: number;
  percent: number;
  note?: string;
}

interface RegionData {
  region: string;
  gldPercent: number;
}

interface SchoolReadinessData {
  gldAchievement: GLDPoint[];
  disadvantageGap: GapPoint[];
  communicationLanguage: CommLangPoint[];
  byRegion: RegionData[];
  metadata: {
    topic: string;
    lastUpdated: string;
    sources: { name: string; dataset: string; url: string; retrieved: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function SchoolReadinessPage() {
  const [data, setData] = useState<SchoolReadinessData | null>(null);

  useEffect(() => {
    fetch('/data/school-readiness/school_readiness.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const gldSeries: Series[] = data
    ? [{
        id: 'gld',
        label: 'Children achieving GLD (%)',
        colour: '#E63946',
        data: data.gldAchievement.map(d => ({
          date: yearToDate(d.year),
          value: d.percent,
        })),
      }]
    : [];

  const gapSeries: Series[] = data
    ? [{
        id: 'gap',
        label: 'Disadvantage gap (percentage points)',
        colour: '#6B7280',
        data: data.disadvantageGap.map(d => ({
          date: yearToDate(d.year),
          value: d.gapPP,
        })),
      }]
    : [];

  const commLangSeries: Series[] = data
    ? [{
        id: 'commlang',
        label: 'At expected level in communication & language (%)',
        colour: '#264653',
        data: data.communicationLanguage.map(d => ({
          date: yearToDate(d.year),
          value: d.percent,
        })),
      }]
    : [];

  const gldAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020–21: No assessments (COVID)' },
    { date: new Date(2022, 0, 1), label: '2022: Revised EYFSP framework' },
  ];

  const gapAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020–21: COVID school closures' },
  ];

  const commLangAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020–21: No data (COVID)' },
    { date: new Date(2017, 0, 1), label: '2017: 30 hours free childcare introduced' },
  ];

  // ── Latest values ─────────────────────────────────────────────────────

  const latestGLD = data?.gldAchievement[data.gldAchievement.length - 1];
  const preCovidGLD = data?.gldAchievement.find(d => d.year === 2019);
  const latestGap = data?.disadvantageGap[data.disadvantageGap.length - 1];
  const preCovidGap = data?.disadvantageGap.find(d => d.year === 2019);
  const latestCommLang = data?.communicationLanguage[data.communicationLanguage.length - 1];
  const preCovidCommLang = data?.communicationLanguage.find(d => d.year === 2019);

  const gldChange = latestGLD && preCovidGLD
    ? (latestGLD.percent - preCovidGLD.percent).toFixed(1)
    : '-4.1';

  const commLangChange = latestCommLang && preCovidCommLang
    ? (latestCommLang.percent - preCovidCommLang.percent).toFixed(1)
    : '-3.2';

  return (
    <>
      <TopicNav topic="School Readiness" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="School Readiness"
          question="How Many Children Start School Not Ready to Learn?"
          finding="67.7% of five-year-olds in England achieve a good level of development — but the gap between disadvantaged children and their peers has widened to nearly 19 percentage points since the pandemic erased a decade of slow progress."
          colour="#E63946"
          preposition="with"
        />

        {/* Editorial context */}
        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Every September, around 650,000 children in England start Reception class. By the following summer, their teachers assess whether each child has reached a &quot;good level of development&quot; across communication, physical skills, personal development, literacy, and maths. That single measure — the EYFSP — is the closest thing we have to a national answer on school readiness. Before the pandemic, the trend was encouraging: the proportion of children meeting the standard rose from 52% in 2013 to nearly 72% in 2019, driven by expanded free childcare entitlements, the Troubled Families programme, and sustained investment in early years settings.<Cite nums={1} /> Then school closures wiped out almost all of that progress overnight.
            </p>
            <p>
              The 2021/22 results, the first since COVID, showed GLD achievement had fallen to 65.2% — roughly where it had been in 2015. Two years on, the figure has recovered to 67.7%, but it remains four percentage points below the pre-pandemic peak and the pace of recovery is slowing. More troubling is what the headline number conceals. Children from disadvantaged backgrounds — measured by free school meal eligibility — saw a sharper drop and a slower recovery. The gap between FSM-eligible children and their peers widened from 17 percentage points in 2019 to over 19 points in 2022 and has barely narrowed since.<Cite nums={2} /> Communication and language skills were hit hardest: children who spent their formative years in lockdown missed the incidental social interaction that underpins spoken language development, and speech and language therapy services were already stretched thin before the pandemic doubled demand.
            </p>
            <p>
              The regional picture adds another dimension. London consistently outperforms every other region, with 71.2% of children achieving GLD, while the North East lags at 64.2%.<Cite nums={[1, 3]} /> This gap is not new — it tracks closely with child poverty rates and per-pupil early years funding — but it has widened since 2022. The government&apos;s expansion of funded childcare hours to younger age groups may help over time, but the immediate challenge is workforce: early years settings report record vacancy rates, and practitioner pay remains well below primary school teacher salaries. The children who started school in September 2025 were born during the pandemic. Their outcomes will test whether the system has truly adapted or merely returned to a trajectory that was already too slow.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-gld', label: 'GLD achievement' },
          { id: 'sec-gap', label: 'Disadvantage gap' },
          { id: 'sec-commlang', label: 'Communication & language' },
          { id: 'sec-regional', label: 'Regional' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Children achieving GLD at age 5"
            value={latestGLD ? `${latestGLD.percent}%` : '67.7%'}
            unit={latestGLD ? `${latestGLD.year}` : '2024'}
            direction="down"
            polarity="up-is-good"
            changeText={`${gldChange}pp vs 2019 pre-COVID peak of 71.8%`}
            sparklineData={
              data ? sparkFrom(data.gldAchievement.map(d => d.percent)) : [51.7,60.4,66.3,69.3,70.7,71.5,71.8,65.2,67.2,67.7]
            }
            source="DfE — EYFSP results, 2023/24"
            href="#sec-gld"
          />
          <MetricCard
            label="Disadvantage gap (FSM vs peers)"
            value={latestGap ? `${latestGap.gapPP}pp` : '18.8pp'}
            unit={latestGap ? `${latestGap.year}` : '2024'}
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestGap && preCovidGap
                ? `+${(latestGap.gapPP - preCovidGap.gapPP).toFixed(1)}pp since 2019 · pandemic erased a decade of narrowing`
                : '+1.8pp since 2019 · pandemic erased a decade of narrowing'
            }
            sparklineData={
              data ? sparkFrom(data.disadvantageGap.map(d => d.gapPP)) : [18.9,17.7,17.0,16.8,17.0,16.8,17.0,19.2,19.0,18.8]
            }
            source="DfE — EYFSP additional tables, 2023/24"
            href="#sec-gap"
          />
          <MetricCard
            label="Communication & language at expected level"
            value={latestCommLang ? `${latestCommLang.percent}%` : '70.8%'}
            unit={latestCommLang ? `${latestCommLang.year}` : '2024'}
            direction="down"
            polarity="up-is-good"
            changeText={`${commLangChange}pp vs 2019 · hardest-hit domain post-COVID`}
            sparklineData={
              data ? sparkFrom(data.communicationLanguage.map(d => d.percent)) : [55.4,64.2,69.7,72.1,73.3,73.8,74.0,68.3,70.1,70.8]
            }
            source="DfE — EYFSP results, 2023/24"
            href="#sec-commlang"
          />
        </div>

        {/* Chart 1: GLD achievement */}
        <ScrollReveal>
          <div id="sec-gld" className="mb-12">
            <LineChart
              series={gldSeries}
              title="Children achieving a Good Level of Development at age 5, England, 2013–2024"
              subtitle="Percentage reaching expected level across all 17 Early Learning Goals. No data 2020–21 (COVID)."
              yLabel="% achieving GLD"
              annotations={gldAnnotations}
              source={{
                name: 'Department for Education',
                dataset: 'Early Years Foundation Stage Profile results',
                frequency: 'annual',
                url: 'https://explore-education-statistics.service.gov.uk/find-statistics/early-years-foundation-stage-profile-results',
                date: 'November 2024',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Disadvantage gap */}
        <ScrollReveal>
          <div id="sec-gap" className="mb-12">
            <LineChart
              series={gapSeries}
              title="Disadvantage gap in school readiness, England, 2013–2024"
              subtitle="Percentage point gap between FSM-eligible children and their peers achieving GLD."
              yLabel="Gap (percentage points)"
              annotations={gapAnnotations}
              source={{
                name: 'Department for Education',
                dataset: 'EYFSP additional tables — disadvantage gap',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/early-years-foundation-stage-profile-results-2023-to-2024',
                date: 'November 2024',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Communication & language */}
        <ScrollReveal>
          <div id="sec-commlang" className="mb-12">
            <LineChart
              series={commLangSeries}
              title="Children at expected level in communication and language, England, 2013–2024"
              subtitle="The domain most affected by pandemic school closures. Recovery has been slow."
              yLabel="% at expected level"
              annotations={commLangAnnotations}
              source={{
                name: 'Department for Education',
                dataset: 'Early Years Foundation Stage Profile results',
                frequency: 'annual',
                url: 'https://explore-education-statistics.service.gov.uk/find-statistics/early-years-foundation-stage-profile-results',
                date: 'November 2024',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Regional variation */}
        <ScrollReveal>
          <div id="sec-regional" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Good Level of Development by region, England, 2023/24
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                Percentage of children achieving GLD. London consistently leads; northern regions lag.
              </p>
              <div className="mt-6 space-y-4">
                {data?.byRegion.map((r) => {
                  const pct = ((r.gldPercent - 55) / (75 - 55)) * 100;
                  return (
                    <div key={r.region}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{r.region}</span>
                        <span className="font-mono text-sm font-bold text-wiah-black">{r.gldPercent}%</span>
                      </div>
                      <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{ width: `${Math.max(pct, 5)}%`, backgroundColor: r.gldPercent >= 68 ? '#2A9D8F' : r.gldPercent >= 66 ? '#F4A261' : '#E63946' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">
                Source: DfE — Early Years Foundation Stage Profile results by region, 2023/24
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="London effect: sustained outperformance in early years"
            value="71.2%"
            unit="GLD in London"
            description="London has led the country on school readiness for over a decade, with 71.2% of children achieving a good level of development in 2024 — seven percentage points above the North East. Researchers attribute this to higher early years funding per child, greater ethnic diversity driving multilingual advantage in the revised framework, denser provision of children's centres, and the long tail of the London Challenge investment in school improvement. The London effect demonstrates that sustained, targeted investment in early years can produce lasting results at scale, even in areas of high deprivation."
            source="Source: DfE — EYFSP regional tables, 2023/24. Education Policy Institute — Annual Report 2024."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        {/* Sources & Methodology */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            {data?.metadata.sources.map((s, i) => (
              <p key={i}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-wiah-blue hover:underline"
                >
                  {s.name} — {s.dataset}
                </a>{' '}
                · Retrieved {s.retrieved}. Updated {s.frequency}.
              </p>
            ))}
            {!data && (
              <>
                <p>
                  <a href="https://explore-education-statistics.service.gov.uk/find-statistics/early-years-foundation-stage-profile-results" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                    DfE — Early Years Foundation Stage Profile results
                  </a> · Retrieved November 2024. Updated annually.
                </p>
                <p>
                  <a href="https://www.gov.uk/government/statistics/early-years-foundation-stage-profile-results-2023-to-2024" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                    DfE — EYFSP additional tables (disadvantage gap)
                  </a> · Retrieved November 2024. Updated annually.
                </p>
              </>
            )}
            <p className="mt-4">
              Good Level of Development (GLD) is assessed via the Early Years Foundation Stage Profile at the end of Reception year. A child achieves GLD by reaching at least the expected level in all 17 Early Learning Goals. No assessments took place in 2020 or 2021 due to COVID-19. The EYFSP framework was revised for 2021/22, so pre- and post-2022 figures are not directly comparable. The disadvantage gap uses free school meal eligibility as the deprivation indicator.
            </p>
            {data?.metadata.knownIssues && (
              <div className="mt-3">
                <p className="font-bold text-wiah-black text-xs mb-1">Known issues:</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  {data.metadata.knownIssues.map((issue, i) => (
                    <li key={i}>{issue}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
