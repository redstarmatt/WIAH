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
  { num: 1, name: 'Cancer Research UK', dataset: 'Cancer Incidence and Mortality Statistics', url: 'https://www.cancerresearchuk.org/health-professional/cancer-statistics', date: '2024' },
  { num: 2, name: 'NHS England', dataset: 'Cancer Waiting Times Statistics', url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/cancer-waiting-times/', date: '2023' },
  { num: 3, name: 'NHS England', dataset: 'NHS Long-Term Plan — cancer early diagnosis', url: 'https://www.longtermplan.nhs.uk/', date: '2019' },
  { num: 4, name: 'OECD / Lancet Oncology', dataset: 'CONCORD-3 survival comparisons', url: 'https://www.thelancet.com/journals/lanonc/article/PIIS1470-2045(17)30909-9/fulltext', date: '2023' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface NHSCancerData {
  national: {
    waitingTimes: {
      timeSeries: Array<{ year: number; within62DaysPct: number }>;
      latestYear: number;
      latestPct: number;
      target: number;
      waitingOver104Days: number;
    };
    survivalRates: {
      timeSeries: Array<{ year: number; fiveYearSurvivalPct: number }>;
      latestYear: number;
      latestPct: number;
    };
    byCancerType: Array<{ cancerType: string; within62DaysPct: number }>;
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function NHSCancerPage() {
  const [data, setData] = useState<NHSCancerData | null>(null);

  useEffect(() => {
    fetch('/data/nhs-cancer/nhs_cancer.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const waitingTimesSeries: Series[] = data
    ? [{
        id: 'waits',
        label: '% within 62 days',
        colour: '#E63946',
        data: data.national.waitingTimes.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.within62DaysPct,
        })),
      }]
    : [];

  const waitingsAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: COVID-19 disruption' },
  ];

  const survivalSeries: Series[] = data
    ? [{
        id: 'survival',
        label: '5-year survival (%)',
        colour: '#2A9D8F',
        data: data.national.survivalRates.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.fiveYearSurvivalPct,
        })),
      }]
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="NHS Cancer" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="NHS Cancer"
          question="Are Cancer Patients Getting Treated in Time?"
          finding="376,000 new cancer cases are diagnosed in the UK each year. Only 67% of patients begin treatment within 62 days of urgent referral — against a 85% target not met since 2015. Over 16,000 people are waiting more than 104 days for cancer treatment. UK cancer survival rates lag behind comparator countries."
          colour="#E63946"
          preposition="for"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Cancer is the second most common cause of death in the UK. Some 376,000 new cases are diagnosed each year and 167,000 people die from the disease — one in two people born after 1960 will receive a cancer diagnosis in their lifetime. The NHS Long-Term Plan committed to diagnosing 75% of cancers at stage 1 or 2 by 2028, yet the current figure sits at around 54%, well behind Denmark and Sweden where 60–65% are caught early. Late-stage diagnosis is the primary driver of the UK's survival gap: five-year bowel cancer survival is 57% here against 67% in Australia; ovarian cancer survival is 35% compared with 45%. Deprivation is the strongest predictor of late presentation — patients in the least deprived quintile are 30% more likely to be diagnosed at stage 1.</p>
            <p>The 62-day urgent referral-to-treatment standard has not been met since 2015. By 2023 the compliance rate had fallen to 67.4% against an 85% target, while 16,200 patients were waiting more than 104 days for treatment to begin. COVID-19 inflicted catastrophic disruption: an estimated 350,000 fewer cancers were diagnosed in 2020, and the resulting diagnostic backlog has never fully cleared. GP referral rates vary threefold across practices, creating a postcode lottery at the point of entry, and one-year bowel cancer survival ranges from 89% to 93% across NHS regions — a gap that reflects systemic variation in access rather than biology.</p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-waits', label: 'Waiting Times' },
          { id: 'sec-survival', label: 'Survival Rates' },
          { id: 'sec-types', label: 'By Cancer Type' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Patients beginning cancer treatment within 62 days"
              value="67.4%"
              direction="down"
              polarity="up-is-good"
              changeText="2023 · Target: 85% · Not met since 2015 · 16,200 waiting over 104 days · Record low"
              sparklineData={[83.7, 82.3, 81.3, 80.4, 79.6, 73.4, 70.2, 68.1, 67.4]}
              href="#sec-waits"
            />
            <MetricCard
              label="Five-year cancer survival rate"
              value="56%"
              direction="up"
              polarity="up-is-good"
              changeText="2022 · Up from 50% in 2010 · Still below EU average (60%) · Late-stage diagnosis delays reducing outcomes"
              sparklineData={[50.1, 51.8, 53.0, 54.2, 55.1, 54.8, 56.0]}
              href="#sec-waits"
            />
            <MetricCard
              label="New cancer diagnoses per year (UK)"
              value="376K"
              direction="up"
              polarity="up-is-bad"
              changeText="Annual · 1 in 2 people will get cancer · Ageing population driving increase · 167K cancer deaths per year"
              sparklineData={[320, 330, 340, 348, 355, 360, 364, 369, 376]}
              href="#sec-waits"
            />
          </div>
        

        <ScrollReveal>
          <section id="sec-waits" className="mb-12">
            <LineChart
              title="Cancer patients starting treatment within 62 days of referral, England, 2015–2023"
              subtitle="Percentage of patients beginning first definitive treatment within 62 days of urgent GP referral."
              series={waitingTimesSeries}
              annotations={waitingsAnnotations}
              yLabel="% within 62 days"
              source={{
                name: 'NHS England',
                dataset: 'Cancer Waiting Times Statistics',
                frequency: 'monthly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-survival" className="mb-12">
            <LineChart
              title="Five-year cancer survival rate, England, 2010–2022"
              subtitle="Age-standardised net survival for all cancers combined, adults aged 15–99."
              series={survivalSeries}
              yLabel="5-year survival (%)"
              source={{
                name: 'Cancer Research UK',
                dataset: 'Cancer Incidence and Survival Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-types" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">Patients starting treatment within 62 days by cancer type, England, 2023</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Percentage of patients beginning treatment within 62 days by primary cancer type.</p>
            {data && (
              <div className="space-y-3">
                {data.national.byCancerType.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-40 text-sm text-wiah-black flex-shrink-0">{item.cancerType}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{ width: `${(item.within62DaysPct / 80) * 100}%`, backgroundColor: '#E63946' }}
                      />
                    </div>
                    <div className="w-16 text-right text-sm font-mono text-wiah-black">{item.within62DaysPct}%</div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: NHS England — Cancer Waiting Times Statistics 2023</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="56%"
            unit="five-year cancer survival rate — up from 50% in 2010 as screening and treatments improve"
            description="Five-year cancer survival has risen from 50% in 2010 to 56% in 2022 — driven by earlier detection through screening programmes and improved treatments. Breast cancer survival now exceeds 85% at five years. The NHS Long-Term Plan committed to diagnosing 75% of cancers at stage 1 or 2 by 2028, where survival rates are dramatically higher. Targeted lung cancer screening at 40 deprived areas (the Targeted Lung Health Check) detected 2,200 cancers in 2023, 75% at early stage. CAR-T cell therapy and immunotherapy are transforming outcomes for blood cancers. The Genomics England 100,000 Genomes Project is expanding precision oncology access."
            source="Source: NHS England — Cancer Waiting Times 2023; Cancer Research UK — Cancer Survival Statistics 2024."
          />
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
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
              {data?.metadata.knownIssues.map((issue, i) => (
                <li key={i}>{issue}</li>
              ))}
            </ul>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  );
}
