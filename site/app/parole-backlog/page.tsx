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

// ── Types ────────────────────────────────────────────────────────────────────

interface CasePoint {
  year: number;
  cases: number;
}

interface WaitPoint {
  year: number;
  months: number;
}

interface HearingPoint {
  year: number;
  hearings: number;
}

interface TariffPoint {
  year: number;
  count: number;
}

interface ParoleBacklogData {
  casesAwaitingHearing: CasePoint[];
  averageWaitMonths: WaitPoint[];
  oralHearingsCompleted: HearingPoint[];
  prisonersHeldBeyondTariff: TariffPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ParoleBacklogPage() {
  const [data, setData] = useState<ParoleBacklogData | null>(null);

  useEffect(() => {
    fetch('/data/parole-backlog/parole_backlog.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const casesSeries: Series[] = data
    ? [{
        id: 'cases',
        label: 'Cases awaiting hearing',
        colour: '#6B7280',
        data: data.casesAwaitingHearing.map(d => ({
          date: yearToDate(d.year),
          value: d.cases,
        })),
      }]
    : [];

  const waitSeries: Series[] = data
    ? [{
        id: 'wait',
        label: 'Average wait (months)',
        colour: '#E63946',
        data: data.averageWaitMonths.map(d => ({
          date: yearToDate(d.year),
          value: d.months,
        })),
      }]
    : [];

  const hearingsSeries: Series[] = data
    ? [{
        id: 'hearings',
        label: 'Oral hearings completed',
        colour: '#264653',
        data: data.oralHearingsCompleted.map(d => ({
          date: yearToDate(d.year),
          value: d.hearings,
        })),
      },
      {
        id: 'beyond-tariff',
        label: 'Prisoners held beyond tariff',
        colour: '#E63946',
        data: data.prisonersHeldBeyondTariff.map(d => ({
          date: yearToDate(d.year),
          value: d.count,
        })),
      }]
    : [];

  const casesAnnotations: Annotation[] = [
    { date: new Date(2018, 6, 1), label: '2018: Worboys decision — release moratorium' },
    { date: new Date(2020, 2, 1), label: '2020: COVID — hearings suspended' },
    { date: new Date(2022, 0, 1), label: '2022: Recall policy changes' },
  ];

  const waitAnnotations: Annotation[] = [
    { date: new Date(2020, 2, 1), label: '2020: COVID — hearing cancellations' },
  ];

  const hearingsAnnotations: Annotation[] = [
    { date: new Date(2020, 2, 1), label: '2020: COVID — sharp drop in hearings' },
  ];

  // ── Derived values ────────────────────────────────────────────────────

  const latestCases = data?.casesAwaitingHearing[data.casesAwaitingHearing.length - 1];
  const baselineCases = data?.casesAwaitingHearing.find(d => d.year === 2019);
  const latestWait = data?.averageWaitMonths[data.averageWaitMonths.length - 1];
  const baselineWait = data?.averageWaitMonths.find(d => d.year === 2019);
  const latestBeyondTariff = data?.prisonersHeldBeyondTariff[data.prisonersHeldBeyondTariff.length - 1];
  const baselineBeyondTariff = data?.prisonersHeldBeyondTariff.find(d => d.year === 2019);

  const casesIncreasePct = latestCases && baselineCases
    ? Math.round(((latestCases.cases - baselineCases.cases) / baselineCases.cases) * 100)
    : 100;

  return (
    <>
      <TopicNav topic="Parole Backlog" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Parole Backlog"
          question="Why Are 12,400 Prisoners Waiting for a Parole Hearing?"
          finding="The Parole Board backlog has doubled since 2019. Over 12,000 prisoners are waiting for a hearing they are legally entitled to, with the average wait now exceeding 19 months. More than 7,000 are held in prison beyond their minimum tariff."
          colour="#6B7280"
          preposition="with"
        />

        {/* Editorial context */}
        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              When a prisoner reaches the end of their minimum tariff, they have a legal right to a Parole Board hearing to determine whether they can be safely released. That right is now routinely delayed by over a year. The backlog of cases awaiting a hearing has risen from around 6,200 in 2019 to over 12,400 in early 2025 — a doubling driven by a pandemic that froze hearings, a series of high-profile cases that triggered procedural reforms, and a prison system so overcrowded that moving prisoners to hearing-ready conditions has become logistically difficult.
            </p>
            <p>
              The human cost is significant. More than 7,200 prisoners are currently held beyond their minimum tariff — legally detained past the point their sentence required. For indeterminate-sentence prisoners (IPP prisoners), many of whom received short minimum terms years ago, the backlog compounds an already Kafkaesque situation: they cannot demonstrate rehabilitation without access to courses, and they cannot access courses without a hearing date. The European Court of Human Rights has found the UK in violation of Article 5 (right to liberty) in multiple IPP cases. Meanwhile, every prisoner held beyond tariff occupies a cell in a system running at 99% capacity, creating a cascading pressure that worsens conditions for everyone.
            </p>
            <p>
              The Parole Board has recruited additional members and accelerated the use of remote hearings since 2021, completing around 8,200 oral hearings in 2024/25 — up from a COVID low of 5,200 but still insufficient to clear the growing caseload. The introduction of a ministerial veto power over release decisions in certain cases has added legal complexity, with judicial reviews absorbing Board resources. Without a sustained increase in hearing capacity, the backlog will continue to grow, and thousands of prisoners will remain locked in a system that has already determined their minimum punishment is complete.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-backlog', label: 'Backlog' },
          { id: 'sec-wait-times', label: 'Wait times' },
          { id: 'sec-hearings', label: 'Hearings vs held' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Cases awaiting parole hearing"
            value={latestCases ? latestCases.cases.toLocaleString() : '12,400'}
            unit="2025"
            direction="up"
            polarity="up-is-bad"
            changeText={`+${casesIncreasePct}% since 2019 · doubled in 5 years`}
            sparklineData={
              data ? sparkFrom(data.casesAwaitingHearing.map(d => d.cases)) : [4800,5200,5600,6000,6200,7500,8900,9800,11000,11800,12400]
            }
            source="Parole Board Annual Report, 2024/25"
            href="#sec-backlog"
          />
          <MetricCard
            label="Average wait for hearing"
            value={latestWait ? latestWait.months.toFixed(1) : '19.4'}
            unit="months"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestWait && baselineWait
                ? `up from ${baselineWait.months} months in 2019 · +${(latestWait.months - baselineWait.months).toFixed(1)} months`
                : 'up from 11.4 months in 2019'
            }
            sparklineData={
              data ? sparkFrom(data.averageWaitMonths.map(d => d.months)) : [8.2,9.1,10.5,11.0,11.4,14.2,15.8,16.3,17.1,18.0,19.4]
            }
            source="Parole Board Annual Report, 2024/25"
            href="#sec-wait-times"
          />
          <MetricCard
            label="Prisoners held beyond minimum tariff"
            value={latestBeyondTariff ? latestBeyondTariff.count.toLocaleString() : '7,200'}
            unit="2025"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestBeyondTariff && baselineBeyondTariff
                ? `up from ${baselineBeyondTariff.count.toLocaleString()} in 2019 · +${Math.round(((latestBeyondTariff.count - baselineBeyondTariff.count) / baselineBeyondTariff.count) * 100)}%`
                : 'up from 3,200 in 2019'
            }
            sparklineData={
              data ? sparkFrom(data.prisonersHeldBeyondTariff.map(d => d.count)) : [2100,2400,2700,3000,3200,4100,4800,5400,6100,6700,7200]
            }
            source="MOJ Offender Management Statistics, Q4 2024"
            href="#sec-hearings"
          />
        </div>

        {/* Chart 1: Cases awaiting hearing */}
        <ScrollReveal>
          <div id="sec-backlog" className="mb-12">
            <LineChart
              series={casesSeries}
              annotations={casesAnnotations}
              title="Cases awaiting Parole Board hearing, England & Wales, 2015–2025"
              subtitle="Outstanding caseload at year end. The backlog doubled between 2019 and 2025."
              yLabel="Cases"
              source={{
                name: 'Parole Board for England and Wales',
                dataset: 'Annual Report and Accounts',
                url: 'https://www.gov.uk/government/organisations/parole-board/about/statistics',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Average wait time */}
        <ScrollReveal>
          <div id="sec-wait-times" className="mb-12">
            <LineChart
              series={waitSeries}
              annotations={waitAnnotations}
              title="Average wait from referral to oral hearing, 2015–2025"
              subtitle="Months from case referral to Parole Board oral hearing. Now exceeds 19 months."
              yLabel="Months"
              source={{
                name: 'Parole Board for England and Wales',
                dataset: 'Annual Report and Accounts',
                url: 'https://www.gov.uk/government/organisations/parole-board/about/statistics',
                date: 'Mar 2026',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Hearings completed vs prisoners held beyond tariff */}
        <ScrollReveal>
          <div id="sec-hearings" className="mb-12">
            <LineChart
              series={hearingsSeries}
              annotations={hearingsAnnotations}
              title="Oral hearings completed vs prisoners held beyond tariff, 2015–2025"
              subtitle="Hearing throughput has recovered from COVID but has not kept pace with growing demand."
              yLabel="Count"
              source={{
                name: 'Ministry of Justice',
                dataset: 'Offender Management Statistics',
                url: 'https://www.gov.uk/government/statistics/offender-management-statistics-quarterly',
                date: 'Mar 2026',
                frequency: 'quarterly',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Remote hearings improving throughput"
            value="8,200"
            unit="hearings in 2024/25"
            description="The Parole Board has expanded the use of video-link hearings since 2021, reducing the logistical burden of transporting prisoners and coordinating panel attendance. Oral hearings completed rose from a COVID low of 5,200 in 2020/21 to 8,200 in 2024/25 — the highest on record. The Board has also recruited over 100 new members since 2022. While these measures have not yet reversed the backlog, they represent a meaningful increase in capacity that, if sustained and expanded, could begin to reduce outstanding caseloads within two to three years."
            source="Source: Parole Board Annual Report 2024/25. Ministry of Justice — Offender Management Statistics, Q4 2024."
          />
        </ScrollReveal>

        {/* Sources & Methodology */}
        <ScrollReveal>
          <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
            <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
            <div className="text-sm text-wiah-mid font-mono space-y-2">
              <p>
                <a href="https://www.gov.uk/government/organisations/parole-board/about/statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Parole Board for England and Wales — Annual Report and Accounts</a> — cases awaiting hearing, hearing throughput, average wait times. Retrieved Mar 2026.
              </p>
              <p>
                <a href="https://www.gov.uk/government/statistics/offender-management-statistics-quarterly" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Ministry of Justice — Offender Management Statistics</a> — prisoners held beyond tariff, recall volumes. Retrieved Mar 2026. Updated quarterly.
              </p>
              <p>
                <a href="https://www.justiceinspectorates.gov.uk/hmiprisons/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">HM Inspectorate of Prisons — Annual Report</a> — conditions context and IPP prisoner data. Retrieved Mar 2026.
              </p>
              <p>All figures are for England and Wales unless otherwise stated. COVID-19 caused widespread hearing cancellations in 2020-21, inflating the backlog. The Worboys decision in 2018 led to additional procedural requirements. Changes to recall policy from 2022 increased the volume of cases referred to the Board. Pre-2017 data uses slightly different counting methodology and is not directly comparable.</p>
            </div>
          </section>
        </ScrollReveal>

        <RelatedTopics />
      </main>
    </>
  );
}
