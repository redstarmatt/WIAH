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
  { num: 1, name: 'ONS', dataset: 'Average Weekly Earnings (EARN01) — real terms', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/datasets/averageweeklyearningsearn01', date: '2024' },
  { num: 2, name: 'ONS', dataset: 'Consumer Price Inflation — CPI peak 11.1%', url: 'https://www.ons.gov.uk/economy/inflationandpriceindices', date: '2023' },
  { num: 3, name: 'ONS', dataset: 'Labour Force Survey — Economic Inactivity due to long-term sickness', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peoplenotinwork/inactivity', date: '2024', note: '2.8 million working-age adults inactive due to sickness' },
];

// ── Types ─────────────────────────────────────────────────────────────────────

interface WagePoint { year: number; realWeeklyPay: number; }
interface UnemploymentPoint { year: number; ratePct: number; }
interface InactivityPoint { year: number; inactivePct: number; sicknessPct: number; }
interface PayGapPoint { year: number; gapPct: number; }
interface ZeroHoursPoint { year: number; thousands: number; }

interface WorkData {
  topic: string;
  lastUpdated: string;
  national: {
    realWages: {
      timeSeries: WagePoint[];
      latest: WagePoint;
      preFinancialCrisis: WagePoint;
    };
    unemployment: {
      timeSeries: UnemploymentPoint[];
      latest: UnemploymentPoint;
    };
    economicInactivity: {
      timeSeries: InactivityPoint[];
      latest: InactivityPoint;
    };
    genderPayGap: {
      timeSeries: PayGapPoint[];
      latest: PayGapPoint;
    };
    zeroHours: {
      timeSeries: ZeroHoursPoint[];
      latest: ZeroHoursPoint;
    };
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

export default function WorkPage() {
  const [data, setData] = useState<WorkData | null>(null);

  useEffect(() => {
    fetch('/data/work/work.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // 1. Real wages series
  const wagesSeries: Series[] = data
    ? [{
        id: 'realWages',
        label: 'Real average weekly pay (2024 prices)',
        colour: '#264653',
        data: data.national.realWages.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.realWeeklyPay,
        })),
      }]
    : [];

  const wagesAnnotations: Annotation[] = [
    { date: new Date(2008, 0), label: '2008: Financial crisis' },
    { date: new Date(2022, 0), label: '2022: Highest inflation since 1980s' },
  ];

  // 2. Unemployment series
  const unemploymentSeries: Series[] = data
    ? [{
        id: 'unemployment',
        label: 'Unemployment rate (%)',
        colour: '#E63946',
        data: data.national.unemployment.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.ratePct,
        })),
      }]
    : [];

  const unemploymentAnnotations: Annotation[] = [
    { date: new Date(2009, 0), label: '2009: Great Recession' },
    { date: new Date(2020, 0), label: '2020: COVID' },
  ];

  // 3. Gender pay gap series
  const payGapSeries: Series[] = data
    ? [{
        id: 'payGap',
        label: 'Gender pay gap (%)',
        colour: '#F4A261',
        data: data.national.genderPayGap.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.gapPct,
        })),
      }]
    : [];

  // 4. Zero-hours series
  const zeroHoursSeries: Series[] = data
    ? [{
        id: 'zeroHours',
        label: 'Workers on zero-hours contracts (thousands)',
        colour: '#E63946',
        data: data.national.zeroHours.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.thousands,
        })),
      }]
    : [];

  // 5. Economic inactivity series
  const inactivitySeries: Series[] = data
    ? [{
        id: 'sickness',
        label: 'Inactive due to long-term sickness (%)',
        colour: '#E63946',
        data: data.national.economicInactivity.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.sicknessPct,
        })),
      }]
    : [];

  const latestWages = data?.national.realWages.latest;
  const latestUnemployment = data?.national.unemployment.latest;
  const latestSickness = data?.national.economicInactivity.latest;

  return (
    <>
      <TopicNav topic="Work" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Work"
          question="Is Your Job Actually Getting Better?"
          finding={
            data
              ? `Real wages are finally back above their 2008 level — but only just, after a 15-year squeeze. Meanwhile 1 million workers are on zero-hours contracts and long-term sickness has pushed economic inactivity to record highs.`
              : 'Real wages are finally back above their 2008 level — but only just, after a 15-year squeeze. Meanwhile 1 million workers are on zero-hours contracts and long-term sickness has pushed economic inactivity to record highs.'
          }
          colour="#264653"
        />

        <SectionNav sections={[
          { label: 'Overview', id: 'overview' },
          { label: 'Real Wages', id: 'wages' },
          { label: 'Employment', id: 'employment' },
          { label: 'Gender Pay Gap', id: 'payGap' },
          { label: 'Zero-Hours', id: 'zeroHours' },
          { label: 'Long-Term Sickness', id: 'sickness' },
        ]} />

        {/* ── Section: Overview ──────────────────────────────────────────────── */}
        <div id="overview" className="max-w-2xl mt-4 mb-12">
          <div className="grid grid-cols-3 gap-4 mb-8">
            {data && (
              <>
                <MetricCard
                  label="Real weekly pay"
                  value={`£${latestWages?.realWeeklyPay ?? 527}`}
                  unit="per week"
                  direction="up"
                  polarity="up-is-good"
                  changeText={`${latestWages?.realWeeklyPay ?? 527} vs £${data.national.realWages.preFinancialCrisis.realWeeklyPay ?? 499} in 2008`}
                  sparklineData={data.national.realWages.timeSeries.slice(-12).map(d => d.realWeeklyPay)}
                  source="ONS EARN01"
                />
                <MetricCard
                  label="Unemployment rate"
                  value={`${latestUnemployment?.ratePct ?? 4.4}`}
                  unit="%"
                  direction="up"
                  polarity="up-is-bad"
                  changeText={`ILO definition, age 16+`}
                  sparklineData={data.national.unemployment.timeSeries.slice(-12).map(d => d.ratePct)}
                  source="ONS LFS"
                />
                <MetricCard
                  label="Long-term sick"
                  value={`${latestSickness?.sicknessPct ?? 8.4}`}
                  unit="% of 16-64"
                  direction="up"
                  polarity="up-is-bad"
                  changeText={`Record high since 2019`}
                  sparklineData={data.national.economicInactivity.timeSeries.map(d => d.sicknessPct)}
                  source="ONS LFS"
                />
              </>
            )}
          </div>

          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Real average weekly pay hit £527 in 2024 — finally overtaking the
              £499 recorded before the financial crisis in 2008.<Cite nums={1} /> That gap took 15 years
              to close, the longest wage stagnation in modern British history. Two inflation
              shocks explain why: the first in 2011–12 eroded the tentative post-crash
              recovery, and the second in 2022–23 — when CPI peaked at 11.1%,
              the worst since 1981 — wiped out nominal gains all over again.<Cite nums={2} /> For the
              median worker, the practical effect was a decade and a half in which pay rises
              never outran the cost of living.
            </p>
            <p>
              Unemployment at 4.4% looks reassuring, but the headline masks a composition
              problem. The share of working-age adults economically inactive due to long-term
              sickness reached 8.4% in 2024, up from 6.0% in 2019 — roughly 2.8 million
              people no longer in or seeking work. Mental health conditions, musculoskeletal
              disorders, and the lingering effects of long COVID all contribute, but the
              proximate cause is the NHS backlog: people who cannot get treated cannot return
              to work. Britain's health crisis and its labour-market crisis are, in
              practice, the same crisis.
            </p>
            </div>
        </div>

        {/* ── Section: Real Wages ──────────────────────────────────────────── */}
        <div id="wages" className="mb-16">
          {wagesSeries.length > 0 ? (
            <LineChart
              title="Real average weekly earnings, 2000–2024"
              subtitle="Inflation-adjusted weekly earnings in 2024 prices. The financial crisis in 2008 triggered a 15-year wage stagnation."
              series={wagesSeries}
              annotations={wagesAnnotations}
              yLabel="£ per week"
              source={{
                name: 'ONS',
                dataset: 'Average Weekly Earnings (EARN01) — real terms',
                frequency: 'annual',
                url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/datasets/averageweeklyearningsearn01',
              }}
            />
          ) : (
            <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
          )}
        </div>

        {/* ── Section: Employment ──────────────────────────────────────────── */}
        <div id="employment" className="mb-16">
          {unemploymentSeries.length > 0 ? (
            <LineChart
              title="Unemployment rate, 2000–2024"
              subtitle="ILO definition: aged 16+. The 2008 crisis and the Great Recession drove unemployment above 8% and kept it high for over a decade."
              series={unemploymentSeries}
              annotations={unemploymentAnnotations}
              yLabel="Percent"
              source={{
                name: 'ONS',
                dataset: 'Labour Force Survey — Unemployment',
                frequency: 'quarterly',
                url: 'https://www.ons.gov.uk/employmentandlabourmarket/peoplenotinwork/unemployment',
              }}
            />
          ) : (
            <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
          )}
        </div>

        {/* ── Section: Gender Pay Gap ──────────────────────────────────────── */}
        <div id="payGap" className="mb-16">
          {payGapSeries.length > 0 ? (
            <LineChart
              title="Gender pay gap, 2012–2024"
              subtitle="Median hourly earnings (excluding overtime) for full-time employees. The gap has narrowed from 19.6% to 13.1% — but women still earn £1 for every £1.13 men earn."
              series={payGapSeries}
              yLabel="Gap (%)"
              source={{
                name: 'ONS',
                dataset: 'Annual Survey of Hours and Earnings (ASHE) — Gender pay gap',
                frequency: 'annual',
                url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/bulletins/annualsurveyofhoursandearnings/2024',
              }}
            />
          ) : (
            <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
          )}

          <ScrollReveal>
            <PositiveCallout
              title="Progress on equal pay"
              value="19.6%"
              unit="→ 13.1%"
              description="Since 2012, the gender pay gap has narrowed by 6.5 percentage points — a 33% reduction. This reflects both policy (Equality Act 2010, public sector transparency from 2017) and changing workforce composition (more women in full-time work and higher-paying roles). However, the gap widens significantly for mothers and in female-dominated sectors like care and retail."
              source="Source: ONS ASHE 2024."
            />
          </ScrollReveal>
        </div>

        {/* ── Section: Zero-Hours Contracts ──────────────────────────────────────── */}
        <div id="zeroHours" className="mb-16">
          {zeroHoursSeries.length > 0 ? (
            <LineChart
              title="Zero-hours contracts, 2012–2024"
              subtitle="Workers with no guaranteed hours, estimated from the Labour Force Survey. The growth has been relentless despite employment being strong."
              series={zeroHoursSeries}
              yLabel="Thousands"
              source={{
                name: 'ONS',
                dataset: 'Zero-hours Contracts (EMP17)',
                frequency: 'quarterly',
                url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/datasets/emp17peopleinemploymentonzerohourscontracts',
              }}
            />
          ) : (
            <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
          )}
        </div>

        {/* ── Section: Long-Term Sickness ──────────────────────────────────────── */}
        <div id="sickness" className="mb-16">
          {inactivitySeries.length > 0 ? (
            <LineChart
              title="Economic inactivity due to long-term sickness, 2019–2024"
              subtitle="Share of working-age adults (16–64) not in employment due to illness or disability. Has reached a record high in 2024."
              series={inactivitySeries}
              yLabel="Percent of 16–64"
              source={{
                name: 'ONS',
                dataset: 'Labour Force Survey — Economic Inactivity',
                frequency: 'quarterly',
                url: 'https://www.ons.gov.uk/employmentandlabourmarket/peoplenotinwork/inactivity',
              }}
            />
          ) : (
            <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
          )}

          {data && (
            <section className="mb-12 bg-wiah-light rounded-lg p-6">
              <h3 className="text-lg font-bold text-wiah-black mb-1">Why is sickness-driven inactivity rising?</h3>
              <p className="text-sm text-wiah-mid font-mono mb-4">
                8.4% of working-age adults are now outside the labour force due to long-term illness — a historical high.
              </p>
              <p className="text-base text-wiah-black leading-[1.7] mb-4">
                The rise has multiple causes: persistent effects of long COVID (an estimated 1.9 million people have long COVID in the UK); increasing rates of mental health conditions (anxiety, depression); and a growing cohort with chronic physical conditions (back pain, arthritis, respiratory disease). Waiting lists for NHS mental health services remain long, and access to early intervention is patchy. For those with disabilities, rising housing costs and energy bills make it harder to afford the support care they need to remain in work. Universal Credit rules penalise those who cannot work full-time, and sickness can be a trigger for welfare sanctions if deemed &ldquo;not actively seeking work.&rdquo;
              </p>
            </section>
          )}
        </div>

        {/* Sources */}
        <section className="border-t border-wiah-border pt-8">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; methodology</h2>
          <ul className="space-y-2 font-mono text-xs text-wiah-mid">
            {data?.metadata.sources.map((src, i) => (
              <li key={i}>
                <a href={src.url} className="underline hover:text-wiah-blue" target="_blank" rel="noreferrer">
                  {src.name} — {src.dataset} ({src.frequency})
                </a>
              </li>
            ))}
          </ul>
          <p className="font-mono text-xs text-wiah-mid mt-4">{data?.metadata.methodology}</p>
          {data?.metadata.knownIssues && data.metadata.knownIssues.length > 0 && (
            <div className="mt-4">
              <p className="font-mono text-xs text-wiah-mid font-bold mb-1">Known issues:</p>
              <ul className="list-disc list-inside space-y-1 font-mono text-xs text-wiah-mid">
                {data.metadata.knownIssues.map((issue, i) => <li key={i}>{issue}</li>)}
              </ul>
            </div>
          )}
        </section>
              <RelatedTopics />
      </main>
    </>
  );
}
