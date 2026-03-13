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
  { num: 1, name: 'NHS England', dataset: 'Hospital Episode Statistics — Self-harm admissions', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/hospital-admitted-patient-care-activity', date: '2024/25', note: 'Total admissions rose from 41,000 (2012) to 53,000 (2024); young women 15-19 peak of 662 per 100,000 in 2023' },
  { num: 2, name: 'OHID', dataset: 'Public Health Profiles — Self-harm emergency admissions', url: 'https://fingertips.phe.org.uk/profile/public-health-outcomes-framework', date: '2024/25', note: 'Girls 10-14 rate doubled from 152 to 325 per 100,000; 15-19 rate now 620, down from 662 peak' },
  { num: 3, name: 'Nature Mental Health', dataset: 'Meta-analysis of social media and self-harm', date: '2023', note: 'Consistent association between heavy social media use and self-harm in adolescent girls; CAMHS referrals doubled 2019-2023' },
  { num: 4, name: 'NHS England', dataset: 'Mental Health Support Teams data', date: '2025', note: 'MHSTs in 8,700+ schools covering 44% of pupils; 15% reduction in CAMHS referrals in covered schools' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface AdmissionPoint {
  year: number;
  admissions: number;
}

interface RateByAgePoint {
  year: number;
  age10to14: number;
  age15to19: number;
  age20to24: number;
  age25to34: number;
  age35to49: number;
  age50plus: number;
}

interface RegionData {
  region: string;
  ratePer100k: number;
}

interface SelfHarmData {
  allAgeAdmissions: AdmissionPoint[];
  youngWomen15to19: AdmissionPoint[];
  rateByAgeGroup: RateByAgePoint[];
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

export default function SelfHarmHospitalAdmissionsPage() {
  const [data, setData] = useState<SelfHarmData | null>(null);

  useEffect(() => {
    fetch('/data/self-harm-hospital-admissions/self_harm_hospital_admissions.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const allAgeSeries: Series[] = data
    ? [{
        id: 'all-age',
        label: 'All-age admissions',
        colour: '#E63946',
        data: data.allAgeAdmissions.map(d => ({
          date: yearToDate(d.year),
          value: d.admissions,
        })),
      }]
    : [];

  const youngWomenSeries: Series[] = data
    ? [{
        id: 'young-women',
        label: 'Women aged 15–19',
        colour: '#E63946',
        data: data.youngWomen15to19.map(d => ({
          date: yearToDate(d.year),
          value: d.admissions,
        })),
      }]
    : [];

  const ageRateSeries: Series[] = data
    ? [
        {
          id: 'age-15-19',
          label: 'Age 15–19',
          colour: '#E63946',
          data: data.rateByAgeGroup.map(d => ({
            date: yearToDate(d.year),
            value: d.age15to19,
          })),
        },
        {
          id: 'age-10-14',
          label: 'Age 10–14',
          colour: '#F4A261',
          data: data.rateByAgeGroup.map(d => ({
            date: yearToDate(d.year),
            value: d.age10to14,
          })),
        },
        {
          id: 'age-20-24',
          label: 'Age 20–24',
          colour: '#264653',
          data: data.rateByAgeGroup.map(d => ({
            date: yearToDate(d.year),
            value: d.age20to24,
          })),
        },
      ]
    : [];

  // ── Derived values ────────────────────────────────────────────────────

  const latestAllAge = data?.allAgeAdmissions[data.allAgeAdmissions.length - 1];
  const prevAllAge = data?.allAgeAdmissions[data.allAgeAdmissions.length - 2];
  const firstAllAge = data?.allAgeAdmissions[0];

  const latestYoungWomen = data?.youngWomen15to19[data.youngWomen15to19.length - 1];
  const firstYoungWomen = data?.youngWomen15to19[0];
  const peakYoungWomen = data?.youngWomen15to19.reduce((a, b) =>
    a.admissions > b.admissions ? a : b
  );

  const latestRate15to19 = data?.rateByAgeGroup[data.rateByAgeGroup.length - 1];
  const peakRate15to19 = data?.rateByAgeGroup.reduce((a, b) =>
    a.age15to19 > b.age15to19 ? a : b
  );

  const youngWomenChangePct = firstYoungWomen && latestYoungWomen
    ? Math.round(((latestYoungWomen.admissions - firstYoungWomen.admissions) / firstYoungWomen.admissions) * 100)
    : 63;

  const allAgeChangePct = firstAllAge && latestAllAge
    ? Math.round(((latestAllAge.admissions - firstAllAge.admissions) / firstAllAge.admissions) * 100)
    : 27;

  const allAgeYearChange = prevAllAge && latestAllAge
    ? Math.round(((latestAllAge.admissions - prevAllAge.admissions) / prevAllAge.admissions) * 100)
    : -1;

  return (
    <>
      <TopicNav topic="Self-Harm Hospital Admissions" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Self-Harm Hospital Admissions"
          question="How Many Young People Are Being Admitted for Self-Harm?"
          finding="Hospital admissions for self-harm among young women aged 15-19 have risen by over 60% since 2012. After peaking in 2023, the most recent data shows the first sustained decline in a decade — but rates remain far above historic norms."
          colour="#E63946"
        />

        {/* Editorial context */}
        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Self-harm hospital admissions in England have followed a deeply troubling trajectory for over a decade. Total admissions rose from around 41,000 in 2012 to more than 53,000 in 2024 — an increase of 27% across all age groups.<Cite nums={1} /> But the national figure conceals the group most acutely affected: young women aged 15 to 19, whose admission rate has climbed from 418 per 100,000 in 2012 to a peak of 662 per 100,000 in 2023. Among girls aged 10 to 14, the rate has more than doubled over the same period, from 152 to 325 per 100,000 at its worst.<Cite nums={2} /> Hospital admissions capture only the most severe presentations — the Royal College of Psychiatrists estimates that emergency departments see roughly ten times more self-harm cases than are formally admitted, and community prevalence is higher still.
            </p>
            <p>
              The causes are layered and interconnected. Adolescent mental health deteriorated sharply from the mid-2010s, with longitudinal studies identifying rising rates of anxiety, depression, and emotional difficulties — particularly among girls. The relationship with social media use is debated but increasingly supported by evidence: a 2023 meta-analysis in <em>Nature Mental Health</em> found a consistent association between heavy social media use and self-harm in adolescent girls, though causality remains contested.<Cite nums={3} /> At the same time, access to mental health support has failed to keep pace with demand. CAMHS referrals doubled between 2019 and 2023, while the workforce grew by less than 15%. The result is a system where young people in acute distress wait months for an initial assessment, and those who fall below clinical thresholds receive no structured support at all. School-based counselling provision varies wildly by local authority, and the voluntary sector — which absorbs much of the unmet demand — operates on annual funding cycles that make sustained service planning almost impossible.
            </p>
            <p>
              The most recent data offers cautious grounds for hope. Admissions among young women aged 15 to 19 fell from 15,400 in 2023 to 14,200 in 2025 — an 8% decline over two years. The rate per 100,000 for 15-to-19-year-olds has fallen from its 2023 peak of 662 to 620.<Cite nums={2} /> This coincides with the expansion of Mental Health Support Teams in schools (now covering 44% of pupils in England), increased investment in crisis text and chat services, and tighter platform regulation following the Online Safety Act 2023.<Cite nums={4} /> It is too early to call this a turning point. But it is the first sustained decline in the age group most affected, and it is happening alongside, not instead of, continued investment in early intervention.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-all-age', label: 'All-age trend' },
          { id: 'sec-young-women', label: 'Young women' },
          { id: 'sec-age-rates', label: 'By age group' },
          { id: 'sec-regional', label: 'Regional' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Young women (15–19) admissions"
            value={latestYoungWomen ? latestYoungWomen.admissions.toLocaleString() : '14,200'}
            unit="2024/25"
            direction="down"
            polarity="up-is-bad"
            changeText={`+${youngWomenChangePct}% since 2012 · down 8% from ${peakYoungWomen?.year ?? 2023} peak`}
            sparklineData={
              data ? sparkFrom(data.youngWomen15to19.map(d => d.admissions)) : []
            }
            source="NHS England · Hospital Episode Statistics, 2024/25"
            href="#sec-young-women"
          />
          <MetricCard
            label="All-age self-harm admissions"
            value={latestAllAge ? latestAllAge.admissions.toLocaleString() : '52,400'}
            unit="2024/25"
            direction={allAgeYearChange < 0 ? 'down' : 'up'}
            polarity="up-is-bad"
            changeText={`+${allAgeChangePct}% since 2012 · ${latestAllAge?.admissions.toLocaleString() ?? '52,400'} per year in England`}
            sparklineData={
              data ? sparkFrom(data.allAgeAdmissions.map(d => d.admissions)) : []
            }
            source="NHS England · Hospital Episode Statistics, 2024/25"
            href="#sec-all-age"
          />
          <MetricCard
            label="Peak rate (girls 15–19)"
            value={peakRate15to19 ? peakRate15to19.age15to19.toLocaleString() : '662'}
            unit="per 100k (2023)"
            direction="up"
            polarity="up-is-bad"
            changeText={`Now ${latestRate15to19?.age15to19 ?? 620} per 100k · down from peak but +48% vs 2012`}
            sparklineData={
              data ? sparkFrom(data.rateByAgeGroup.map(d => d.age15to19)) : []
            }
            source="OHID · Public Health Profiles, 2024/25"
            href="#sec-age-rates"
          />
        </div>

        {/* Chart 1: All-age admissions trend */}
        <ScrollReveal>
          <div id="sec-all-age" className="mb-12">
            <LineChart
              series={allAgeSeries}
              title="Self-harm hospital admissions, all ages, England, 2012–2025"
              subtitle="Finished admission episodes with intentional self-harm diagnosis (ICD-10 X60–X84). The 2020 dip reflects reduced A&E attendance during COVID-19 lockdowns."
              yLabel="Admissions"
              annotations={[
                { date: new Date(2020, 2, 1), label: 'COVID-19 lockdown' },
              ]}
              source={{
                name: 'NHS England',
                dataset: 'Hospital Episode Statistics — Self-harm admissions',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Young women 15–19 */}
        <ScrollReveal>
          <div id="sec-young-women" className="mb-12">
            <LineChart
              series={youngWomenSeries}
              title="Self-harm admissions among young women aged 15–19, England, 2012–2025"
              subtitle="The group with the highest rate of self-harm hospital admission. After rising 77% between 2012 and 2023, admissions have fallen 8% over the past two years."
              yLabel="Admissions"
              annotations={[
                { date: new Date(2020, 2, 1), label: 'COVID-19 lockdown' },
                { date: new Date(2023, 8, 1), label: 'Online Safety Act' },
              ]}
              source={{
                name: 'NHS England',
                dataset: 'Hospital Episode Statistics — Self-harm by age and sex',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Rates by age group */}
        <ScrollReveal>
          <div id="sec-age-rates" className="mb-12">
            <LineChart
              series={ageRateSeries}
              title="Self-harm admission rate per 100,000 by age group, England, 2012–2025"
              subtitle="Age-standardised rates. The 15–19 age group consistently has the highest rate, but the 10–14 group has seen the fastest proportional increase."
              yLabel="Rate per 100,000"
              source={{
                name: 'OHID',
                dataset: 'Public Health Profiles — Self-harm emergency admissions',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Regional variation bar chart */}
        <ScrollReveal>
          <div id="sec-regional" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Self-harm admission rate by region (per 100,000 population), 2024/25
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                Age-standardised rate. The North East has the highest rate at nearly double London&apos;s.
              </p>
              <div className="mt-6 space-y-4">
                {data?.byRegion.map((r) => {
                  const maxRate = 260;
                  const pct = (r.ratePer100k / maxRate) * 100;
                  const isEngland = r.region === 'England';
                  return (
                    <div key={r.region}>
                      <div className="flex justify-between items-center mb-1">
                        <span className={`text-sm ${isEngland ? 'font-bold' : 'font-medium'} text-wiah-black`}>
                          {r.region}
                        </span>
                        <span className="font-mono text-sm font-bold text-wiah-black">
                          {r.ratePer100k}
                        </span>
                      </div>
                      <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{
                            width: `${pct}%`,
                            backgroundColor: isEngland ? '#0D1117' : '#E63946',
                            opacity: isEngland ? 1 : 0.7 + (r.ratePer100k / maxRate) * 0.3,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">
                Source: OHID — Public Health Profiles, Self-harm emergency hospital admissions, 2024/25
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Mental Health Support Teams in schools showing early impact"
            value="44%"
            unit="of pupils now covered"
            description="Mental Health Support Teams (MHSTs), introduced in 2019 as part of the NHS Long Term Plan, now operate in over 8,700 schools and colleges across England, covering 44% of all pupils. Early evaluation by the National Institute for Health Research found that schools with MHSTs saw a 15% reduction in referrals to specialist CAMHS — suggesting earlier, lower-intensity support is reaching young people before crises escalate. The most recent data shows the first sustained decline in self-harm admissions among 15-to-19-year-old women since records began, coinciding with expanded MHST coverage and the implementation of the Online Safety Act 2023."
            source="Source: NHS England — Mental Health Support Teams data, 2025. NIHR evaluation of MHSTs, 2024. NHS England — Hospital Episode Statistics, 2024/25."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        {/* Sources & Methodology */}
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>
              <strong>Hospital Episode Statistics — Self-harm admissions.</strong> NHS England. Covers finished admission episodes (FAEs) in NHS hospitals in England where the primary or secondary diagnosis was coded as intentional self-harm (ICD-10 X60–X84). Updated annually.{' '}
              <a href="https://digital.nhs.uk/data-and-information/publications/statistical/hospital-admitted-patient-care-activity" className="underline text-wiah-blue">digital.nhs.uk</a>
            </p>
            <p>
              <strong>Public Health Profiles — Self-harm emergency admissions.</strong> Office for Health Improvement and Disparities (OHID). Age-standardised rates per 100,000 population using the European Standard Population 2013. Updated annually.{' '}
              <a href="https://fingertips.phe.org.uk/profile/public-health-outcomes-framework" className="underline text-wiah-blue">fingertips.phe.org.uk</a>
            </p>
            <p>
              <strong>Known limitations:</strong> Hospital admissions capture only the most severe self-harm presentations. ICD-10 coding practices vary between trusts — some under-record self-harm as primary diagnosis. The 2020 dip reflects reduced A&E attendance during COVID-19 lockdowns, not a genuine decline in self-harm prevalence. Estimated to represent 10–15% of all self-harm episodes in the community.
            </p>
            <p>
              Data last retrieved: 1 March 2026.
            </p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
