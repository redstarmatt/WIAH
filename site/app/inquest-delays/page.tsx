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

interface DurationPoint {
  year: number;
  avgWeeks: number;
}

interface CaseloadPoint {
  year: number;
  opened: number;
  concluded: number;
}

interface OverOneYearPoint {
  year: number;
  pct: number;
}

interface InquestDelaysData {
  national: {
    duration: { timeSeries: DurationPoint[] };
    caseload: { timeSeries: CaseloadPoint[] };
    overOneYear: { timeSeries: OverOneYearPoint[] };
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

export default function InquestDelaysPage() {
  const [data, setData] = useState<InquestDelaysData | null>(null);

  useEffect(() => {
    fetch('/data/inquest-delays/inquest_delays.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const durationSeries: Series[] = data
    ? [{
        id: 'avg-duration',
        label: 'Average weeks to conclusion',
        colour: '#E63946',
        data: data.national.duration.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.avgWeeks,
        })),
      }]
    : [];

  const caseloadSeries: Series[] = data
    ? [
        {
          id: 'opened',
          label: 'Inquests opened',
          colour: '#E63946',
          data: data.national.caseload.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.opened,
          })),
        },
        {
          id: 'concluded',
          label: 'Inquests concluded',
          colour: '#2A9D8F',
          data: data.national.caseload.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.concluded,
          })),
        },
      ]
    : [];

  const overOneYearSeries: Series[] = data
    ? [{
        id: 'over-one-year',
        label: 'Taking over 52 weeks (%)',
        colour: '#E63946',
        data: data.national.overOneYear.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.pct,
        })),
      }]
    : [];

  const latestDuration = data?.national.duration.timeSeries[data.national.duration.timeSeries.length - 1];
  const earliestDuration = data?.national.duration.timeSeries[0];
  const latestCaseload = data?.national.caseload.timeSeries[data.national.caseload.timeSeries.length - 1];
  const latestOverOneYear = data?.national.overOneYear.timeSeries[data.national.overOneYear.timeSeries.length - 1];
  const earliestOverOneYear = data?.national.overOneYear.timeSeries[0];

  const durationAnnotations: Annotation[] = [
    { date: yearToDate(2020), label: 'COVID-19 pandemic' },
  ];

  return (
    <>
      <TopicNav topic="Justice" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Justice"
          question="What Happens When Someone Dies Unexpectedly?"
          finding="The average time from death to inquest conclusion has tripled from 20 weeks in 2014 to 57 weeks in 2024. Over 30,000 inquests are opened each year, but coroner capacity has not kept pace — leaving families in legal limbo for months or years."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>When someone dies unexpectedly, violently, or in state custody, the law requires a coroner to investigate. In England and Wales, more than 30,000 inquests are opened every year — each one representing a family waiting for answers about how and why their loved one died. In 2014, that wait averaged around 20 weeks. By 2024, it had tripled to 57 weeks. Behind that statistic are families who cannot obtain a death certificate, cannot settle an estate, and cannot begin to move forward. The system designed to provide answers has become a source of prolonged distress. The causes are structural and compounding. Many of the 98 coroner areas in England and Wales are served by part-time coroners who juggle inquests alongside other legal work. Post-mortem pathologist numbers have fallen sharply: some areas now have a single pathologist covering three or more jurisdictions, creating bottlenecks before an inquest can even be opened. Courtroom availability is limited, and complex inquests — particularly those involving deaths in custody, psychiatric settings, or hospitals — routinely take two years or more. Article 2 inquests, where the state may bear responsibility for a death, are especially delayed, with legal aid constraints making it harder for families to participate meaningfully.</p>
            <p>COVID-19 did not create this crisis, but it accelerated it dramatically. The pandemic caused a surge in deaths referred to coroners in 2020 — nearly 39,000 inquests were opened that year, while concluded cases fell to just 28,400 as courts closed and pathologists were redirected. That single year created a backlog that the system has never absorbed. By 2024, one in three inquests took over a year to conclude, up from fewer than one in twelve a decade earlier. Funding is a fundamental problem: coroner services are funded by local authorities, not central government, creating a postcode lottery in which well-resourced areas can process cases months faster than underfunded ones. The Chief Coroner has flagged the crisis repeatedly in annual reports, calling for national funding, mandatory full-time senior coroners, and investment in pathology services. The Medical Examiner system, fully rolled out across England in 2024, should reduce the number of unnecessary referrals to coroners by scrutinising all non-coronial deaths, but it addresses only the front door — not the growing queue inside. Until coroner capacity matches demand, families will continue to wait in a system that was never designed for the volume or complexity of cases it now faces.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-duration', label: 'Wait times' },
          { id: 'sec-caseload', label: 'Caseload' },
          { id: 'sec-over-one-year', label: 'Over 1 year' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Average weeks from death to inquest"
            value={latestDuration ? latestDuration.avgWeeks.toFixed(1) : '57.2'}
            unit="weeks"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestDuration && earliestDuration
                ? `Up from ${earliestDuration.avgWeeks} weeks in ${earliestDuration.year} · tripled in a decade`
                : 'Up from 20.1 weeks in 2014 · tripled in a decade'
            }
            sparklineData={
              data ? sparkFrom(data.national.duration.timeSeries.map(d => d.avgWeeks)) : []
            }
            source="MoJ · Coroners Statistics Annual, 2024"
            href="#sec-duration"
          />
          <MetricCard
            label="Inquests opened per year"
            value={latestCaseload ? latestCaseload.opened.toLocaleString() : '33,900'}
            unit="2024"
            direction="up"
            polarity="neutral"
            changeText={
              latestCaseload
                ? `${latestCaseload.concluded.toLocaleString()} concluded · gap of ${(latestCaseload.opened - latestCaseload.concluded).toLocaleString()}`
                : '31,800 concluded · gap of 2,100'
            }
            sparklineData={
              data ? sparkFrom(data.national.caseload.timeSeries.map(d => d.opened)) : []
            }
            source="MoJ · Coroners Statistics Annual, 2024"
            href="#sec-caseload"
          />
          <MetricCard
            label="Inquests taking over 1 year"
            value={latestOverOneYear ? `${latestOverOneYear.pct}%` : '33.2%'}
            unit="2024"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestOverOneYear && earliestOverOneYear
                ? `Up from ${earliestOverOneYear.pct}% in ${earliestOverOneYear.year} · 1 in 3 now exceeds a year`
                : 'Up from 8.2% in 2014 · 1 in 3 now exceeds a year'
            }
            sparklineData={
              data ? sparkFrom(data.national.overOneYear.timeSeries.map(d => d.pct)) : []
            }
            source="MoJ · Coroners Statistics Annual, 2024"
            href="#sec-over-one-year"
          />
        </div>

        {/* Chart 1: Average inquest duration */}
        <ScrollReveal>
          <div id="sec-duration" className="mb-12">
            <LineChart
              series={durationSeries}
              title="Average inquest duration, England & Wales, 2014–2024"
              subtitle="Average weeks from death to inquest conclusion. Has tripled in a decade."
              yLabel="Weeks"
              annotations={durationAnnotations}
              source={{
                name: 'Ministry of Justice',
                dataset: 'Coroners Statistics Annual',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Inquests opened vs concluded */}
        <ScrollReveal>
          <div id="sec-caseload" className="mb-12">
            <LineChart
              series={caseloadSeries}
              title="Inquests opened vs concluded, England & Wales, 2014–2024"
              subtitle="The persistent gap between cases opened and concluded drives the growing backlog."
              yLabel="Inquests"
              annotations={durationAnnotations}
              source={{
                name: 'Ministry of Justice',
                dataset: 'Coroners Statistics Annual',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Proportion taking over 52 weeks */}
        <ScrollReveal>
          <div id="sec-over-one-year" className="mb-12">
            <LineChart
              series={overOneYearSeries}
              title="Inquests taking over 52 weeks to conclude, 2014–2024"
              subtitle="One in three inquests now takes over a year — up from fewer than one in twelve in 2014."
              yLabel="% of inquests"
              annotations={durationAnnotations}
              source={{
                name: 'Ministry of Justice',
                dataset: 'Coroners Statistics Annual',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Digital systems and Medical Examiners reducing pressure"
            value="15% reduction"
            description="Digital case management systems introduced in 2023 reduced administrative delays in pilot areas by 15%. The Medical Examiner system, fully rolled out in 2024, should reduce unnecessary coroner referrals by scrutinising all non-coronial deaths before they enter the system — addressing the front door of a process that has been overwhelmed for a decade."
            source="Source: Chief Coroner — Annual Report 2024. NHS England — Medical Examiner Programme."
          />
        </ScrollReveal>

        <RelatedTopics />
      </main>
    </>
  );
}
