'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';
import RelatedTopics from '@/components/RelatedTopics';

const editorialRefs: Reference[] = [
  { num: 1, name: 'NHS England', dataset: 'NHS Staff Survey', url: 'https://www.england.nhs.uk/statistics/', date: '2023', note: '34% of staff report burnout (up from 28% in 2019); 57% would recommend NHS as workplace (down from 67%)' },
  { num: 2, name: 'NHS Digital', dataset: 'NHS Vacancy Statistics', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/nhs-vacancies-survey', date: '2024', note: '~112,000 unfilled posts (8% vacancy rate); peaked at 133,000 (9.7%) in 2022' },
  { num: 3, name: 'NHS England', dataset: 'Financial Accounts — Agency Spending', url: 'https://www.england.nhs.uk/statistics/', date: '2024', note: '£3bn spent on agency staff in 2023/24' },
  { num: 4, name: 'NHS England', dataset: 'NHS Long Term Workforce Plan', url: 'https://www.england.nhs.uk/publication/nhs-long-term-workforce-plan/', date: '2023', note: 'Commits to doubling medical school places and 50% increase in GP training places' },
];

// ── Types ──────────────────────────────────────────────────────────────────────

interface BurnoutPoint {
  year: number;
  pct: number;
}

interface VacancyPoint {
  year: number;
  ratePct: number;
  unfilled: number;
}

interface RecommendPoint {
  year: number;
  pct: number;
}

interface AgencySpendPoint {
  year: number;
  billionGBP: number;
}

interface NHSStaffBurnoutData {
  national: {
    burnout: { timeSeries: BurnoutPoint[] };
    vacancies: { timeSeries: VacancyPoint[] };
    recommend: { timeSeries: RecommendPoint[] };
    agencySpend: { timeSeries: AgencySpendPoint[] };
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function NHSStaffBurnoutPage() {
  const [data, setData] = useState<NHSStaffBurnoutData | null>(null);

  useEffect(() => {
    fetch('/data/nhs-staff-burnout/nhs_staff_burnout.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // 1. Burnout rate series
  const burnoutSeries: Series[] = data
    ? [{
        id: 'burnout',
        label: 'Staff reporting burnout (%)',
        colour: '#E63946',
        data: data.national.burnout.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.pct,
        })),
      }]
    : [];

  const burnoutAnnotations: Annotation[] = [
    { date: new Date(2020, 2, 1), label: '2020: COVID-19 pandemic' },
    { date: new Date(2023, 5, 1), label: '2023: Junior doctor strikes' },
  ];

  // 2. Vacancy rate series
  const vacancySeries: Series[] = data
    ? [{
        id: 'vacancies',
        label: 'NHS vacancy rate (%)',
        colour: '#F4A261',
        data: data.national.vacancies.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.ratePct,
        })),
      }]
    : [];

  const vacancyAnnotations: Annotation[] = [
    { date: new Date(2022, 5, 1), label: '2022: Peak vacancies (133,000)' },
  ];

  // 3. Recommend as workplace series
  const recommendSeries: Series[] = data
    ? [{
        id: 'recommend',
        label: 'Staff recommending NHS as workplace (%)',
        colour: '#264653',
        data: data.national.recommend.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.pct,
        })),
      }]
    : [];

  const recommendAnnotations: Annotation[] = [
    { date: new Date(2020, 2, 1), label: '2020: Pandemic morale surge' },
  ];

  return (
    <>
      <TopicNav topic="NHS Staff Burnout" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="NHS Staff Burnout"
          question="Who's Looking After the People Looking After You?"
          finding="One in three NHS staff report feeling burnt out, vacancy rates sit at 8%, and the service spends £3 billion a year on agency staff to fill the gaps."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The NHS Staff Survey — the largest workforce survey in the world, covering approximately 600,000 respondents annually — reveals a service under profound strain. In 2023, 34% of staff reported feeling burnt out, up from 28% in 2019. The proportion of staff who would recommend the NHS as a place to work fell from 67% to 57% over the same period, with morale lowest among ambulance staff and mental health nurses.<Cite nums={1} /> Behind these figures sits a workforce crisis that predates the pandemic but was dramatically accelerated by it: the NHS in England carries roughly 112,000 unfilled posts — a vacancy rate of approximately 8% — and spent £3 billion on agency staff in 2023/24 to cover the shortfall.<Cite nums={[2, 3]} /> Sickness absence runs at 5.2%, double the private sector average of 2.6%, with 44% of staff reporting work-related stress and 30% experiencing musculoskeletal problems. The junior doctor strikes of 2023 and 2024, driven by a 35% real-terms pay erosion since 2008, reflected a workforce that increasingly feels undervalued, overworked, and unable to deliver the standard of care it trained for.
            </p>
            <p>
              The structural causes are well-documented but slow to address. The NHS Long Term Workforce Plan, published in July 2023, promised a doubling of medical school places and a 50% increase in GP training places — but the funding to deliver these commitments remains unfirmed.<Cite nums={4} /> In the meantime, international recruitment accounts for approximately 25% of new nurse registrations, creating a dependency risk that workforce planners acknowledge but have not resolved. Nursing turnover has eased since the worst of the post-pandemic exodus, falling from 12.5% to 10.8% between 2022 and 2024 following improved pay settlements, but it remains above pre-pandemic levels. The danger is circular: burnt-out staff leave, vacancies rise, remaining staff carry heavier workloads, burnout deepens, and the cycle repeats. Agency spending — at £3 billion annually — is both a symptom and a cost: every pound spent on temporary cover is a pound not spent on the permanent workforce, training, or the infrastructure that might ease the pressure in the first place.<Cite nums={3} />
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-burnout', label: 'Burnout' },
          { id: 'sec-vacancies', label: 'Vacancies' },
          { id: 'sec-recommend', label: 'Workplace Morale' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Staff reporting burnout"
              value="34"
              unit="%"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 · Up from 28% in 2019 · Worst among ambulance and mental health staff"
              sparklineData={[24.1, 25.3, 26.7, 28.0, 30.4, 33.8, 34.6, 34.0]}
              source="NHS England — NHS Staff Survey 2023"
              href="#sec-burnout"
            />
            <MetricCard
              label="NHS vacancy rate"
              value="8.0"
              unit="%"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 · ~107,000 unfilled posts · Peaked at 9.7% (133,000) in 2022"
              sparklineData={[5.8, 6.2, 6.9, 7.4, 7.0, 8.4, 9.7, 8.4, 8.0]}
              source="NHS Digital — NHS Vacancy Statistics 2024"
              href="#sec-vacancies"
            />
            <MetricCard
              label="Agency staff spending"
              value="£3.0"
              unit="bn"
              direction="up"
              polarity="up-is-bad"
              changeText="2023/24 · Up from £1.8bn in 2016 · Peaked at £3.2bn in 2022"
              sparklineData={[1.8, 2.2, 2.4, 2.4, 2.6, 2.9, 3.2, 3.0]}
              source="NHS England — Financial Accounts 2023/24"
              href="#sec-burnout"
            />
          </div>
        </ScrollReveal>

        {/* Burnout rate chart */}
        <ScrollReveal>
          <div id="sec-burnout" className="mb-12">
            {burnoutSeries.length > 0 ? (
              <LineChart
                title="NHS staff reporting burnout, England, 2016–2023"
                subtitle="Percentage of NHS Staff Survey respondents reporting feeling burnt out because of their work. Survey covers ~600,000 staff annually."
                series={burnoutSeries}
                annotations={burnoutAnnotations}
                yLabel="Staff reporting burnout (%)"
                source={{
                  name: 'NHS England',
                  dataset: 'NHS Staff Survey',
                  frequency: 'annual',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </div>
        </ScrollReveal>

        {/* Vacancy rate chart */}
        <ScrollReveal>
          <div id="sec-vacancies" className="mb-12">
            {vacancySeries.length > 0 ? (
              <LineChart
                title="NHS vacancy rate, England, 2016–2024"
                subtitle="Unfilled posts as a percentage of total establishment. Peaked at 9.7% in 2022 with 133,000 vacancies."
                series={vacancySeries}
                annotations={vacancyAnnotations}
                yLabel="Vacancy rate (%)"
                source={{
                  name: 'NHS Digital',
                  dataset: 'NHS Vacancy Statistics',
                  frequency: 'quarterly',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </div>
        </ScrollReveal>

        {/* Staff recommending NHS chart */}
        <ScrollReveal>
          <div id="sec-recommend" className="mb-12">
            {recommendSeries.length > 0 ? (
              <LineChart
                title="Staff recommending NHS as a place to work, England, 2016–2023"
                subtitle="Percentage of NHS Staff Survey respondents who would recommend the NHS as a good place to work. Brief pandemic-era uplift reversed sharply."
                series={recommendSeries}
                annotations={recommendAnnotations}
                yLabel="Staff recommending (%)"
                source={{
                  name: 'NHS England',
                  dataset: 'NHS Staff Survey',
                  frequency: 'annual',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Signs of progress"
            value="2x"
            unit="medical school places promised by 2031"
            description="The 2023 NHS Long Term Workforce Plan committed to doubling medical school places and a 50% increase in GP training places. Nursing turnover fell from 12.5% to 10.8% between 2022 and 2024 after improved pay settlements. The junior doctor pay deal in early 2024 brought the largest single-year uplift in a decade. While these measures will take years to feed through into staffing levels, they represent the first serious attempt at long-term workforce planning the NHS has seen."
            source="Source: NHS England — Long Term Workforce Plan 2023; NHS Digital — Workforce Statistics 2024."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        {/* Sources & methodology */}
        <section id="sec-sources" className="border-t border-wiah-border pt-8 mt-12">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; methodology</h2>
          <ul className="space-y-2 font-mono text-xs text-wiah-mid">
            {data?.metadata.sources.map((src, i) => (
              <li key={i}>
                <a
                  href={src.url}
                  className="underline hover:text-wiah-blue"
                  target="_blank"
                  rel="noreferrer"
                >
                  {src.name} — {src.dataset} ({src.frequency})
                </a>
              </li>
            ))}
          </ul>
          {data && (
            <>
              <h3 className="text-base font-bold text-wiah-black mt-6 mb-2">Methodology</h3>
              <p className="font-mono text-xs text-wiah-mid leading-relaxed max-w-3xl mb-4">
                {data.metadata.methodology}
              </p>
              {data.metadata.knownIssues.length > 0 && (
                <>
                  <h3 className="text-base font-bold text-wiah-black mt-6 mb-2">Known issues</h3>
                  <ul className="font-mono text-xs text-wiah-mid leading-relaxed max-w-3xl space-y-1">
                    {data.metadata.knownIssues.map((issue, i) => (
                      <li key={i}>• {issue}</li>
                    ))}
                  </ul>
                </>
              )}
            </>
          )}
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
