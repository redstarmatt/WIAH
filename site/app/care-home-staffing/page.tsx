'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface VacanciesPoint {
  year: number;
  vacanciesThousands: number;
}

interface VisasPoint {
  year: number;
  visasThousands: number;
}

interface PayPoint {
  year: number;
  payGBP: number;
}

interface CareStaffingData {
  national: {
    vacancies: {
      timeSeries: VacanciesPoint[];
      latestYear: number;
      latestThousands: number;
      note: string;
    };
    internationalVisas: {
      timeSeries: VisasPoint[];
      latestYear: number;
      latestThousands: number;
      note: string;
    };
    hourlyPay: {
      timeSeries: PayPoint[];
      latestYear: number;
      latestPayGBP: number;
      note: string;
    };
  };
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

export default function CareHomeStaffingPage() {
  const [data, setData] = useState<CareStaffingData | null>(null);

  useEffect(() => {
    fetch('/data/care-home-staffing/care_staffing.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const vacanciesSeries: Series[] = data
    ? [{
        id: 'vacancies',
        label: 'Care sector vacancies (thousands)',
        colour: '#F4A261',
        data: data.national.vacancies.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.vacanciesThousands,
        })),
      }]
    : [];

  const visasAndPaySeries: Series[] = data
    ? [
        {
          id: 'visas',
          label: 'International care worker visas (thousands)',
          colour: '#264653',
          data: data.national.internationalVisas.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.visasThousands,
          })),
        },
        {
          id: 'pay',
          label: 'Average hourly pay (£)',
          colour: '#2A9D8F',
          data: data.national.hourlyPay.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.payGBP,
          })),
        },
      ]
    : [];

  const vacanciesAnnotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: Post-COVID workforce crisis — vacancies surge' },
    { date: new Date(2022, 5, 1), label: '2022: Health & Care Worker visa extended to care workers' },
    { date: new Date(2024, 5, 1), label: '2024: Visa abuse crackdown — new licencing requirements' },
  ];

  const visasAnnotations: Annotation[] = [
    { date: new Date(2022, 5, 1), label: '2022: Overseas recruitment opens up' },
    { date: new Date(2024, 5, 1), label: '2024: Visa route tightened — 3,000 abuse cases found' },
  ];

  // ── Sparkline helpers ────────────────────────────────────────────────────

  const vacanciesSparkline = data
    ? data.national.vacancies.timeSeries.map(d => d.vacanciesThousands)
    : [];
  const visasSparkline = data
    ? data.national.internationalVisas.timeSeries.map(d => d.visasThousands)
    : [];
  const paySparkline = data
    ? data.national.hourlyPay.timeSeries.map(d => d.payGBP)
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Care Home Staffing" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Care Home Staffing"
          question="Who Looks After Our Elders?"
          finding="Care homes face a structural staffing crisis: 165,000 vacancies, a 30% annual turnover rate, and average pay of £11 per hour. International recruitment has plugged gaps but at regulatory cost: 3,000 visa abuses reported in 2024."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The adult social care workforce in England numbers 1.7 million, making it larger than the NHS workforce. It is also among the lowest-paid: average care worker pay of £11.20 per hour sits below the Living Wage Foundation's real living wage, below NHS healthcare support worker rates, and comparable with retail and hospitality roles that carry far less responsibility. Annual turnover of approximately 30% — meaning one in three care workers leaves their job each year — creates perpetual recruitment costs, disrupts continuity of care, and makes quality improvement extremely difficult.
            </p>
            <p>
              The 2022 extension of the Health and Care Worker visa to social care workers opened international recruitment as a partial solution. Visas granted peaked at 101,000 in 2024 before falling to 82,000 as Home Office crackdowns on visa abuse reduced approvals. The Home Office found 3,000 cases of exploitation — workers recruited from overseas who had their visas sponsored but were not given the hours promised, or faced illegal deductions from wages. Structural reform requires government decisions on long-term funding. The Andrew Dilnot proposals for a care cost cap were legislated in 2021 but implementation deferred until 2025, then further delayed. Without sustainable funding for providers, wage increases cannot be sustained without fee increases that many local authorities cannot afford.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-vacancies', label: 'Vacancies' },
          { id: 'sec-visas', label: 'International Recruitment' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Care home vacancies"
              value="165,000"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="30% annual turnover · 1 in 8 posts unfilled · Residents affected"
              sparklineData={vacanciesSparkline}
              href="#sec-vacancies"
            />
            <MetricCard
              label="International care workers (visas)"
              value="82,000"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="Down from 101k peak · Visa abuse crackdown · Dependency risk"
              sparklineData={visasSparkline}
              href="#sec-vacancies"
            />
            <MetricCard
              label="Average care worker hourly pay"
              value="£11.20"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="+27% since 2019 but below NHS equivalents · Retention crisis persists"
              sparklineData={paySparkline}
              href="#sec-vacancies"
            />
          </div>
        

        {/* Chart 1: Vacancies */}
        <ScrollReveal>
          <section id="sec-vacancies" className="mb-12">
            <LineChart
              title="Adult social care vacancies, England, 2019–2025"
              subtitle="Total vacancies in the adult social care sector, England (thousands). Fell during COVID-19 as furlough reduced reported vacancies, then surged to 165,000 in 2022 as pandemic staffing pressures peaked. Partially relieved by international recruitment but structurally high."
              series={vacanciesSeries}
              annotations={vacanciesAnnotations}
              yLabel="Thousands"
            />
          </section>
        </ScrollReveal>

        {/* Chart 2: Visas and pay */}
        <ScrollReveal>
          <section id="sec-visas" className="mb-12">
            <LineChart
              title="International care worker visas and average hourly pay, 2021–2025"
              subtitle="Health and Care Worker visas granted for social care roles (thousands, blue) alongside average hourly pay for care workers (£, green). Visa route expanded rapidly from 2022, peaked in 2024, then fell as abuse crackdowns tightened approvals."
              series={visasAndPaySeries}
              annotations={visasAnnotations}
              yLabel="Thousands / £ per hour"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="Care Workforce Pathway"
            unit="Career progression launched 2023"
            description="The Care Workforce Pathway 2023 introduces named career levels for care workers for the first time, providing a progression route from care assistant to senior practitioner. The government is consulting on a National Care Service to professionalise the sector and standardise pay. Fair Pay Agreements, piloted in adult social care, aim to set sector-wide minimum pay floors above the National Living Wage. The Dilnot care cost cap — delayed multiple times — remains government policy, and if implemented, would stabilise local authority commissioning and enable more sustainable provider contracts."
            source="Source: DHSC — Care Workforce Pathway 2023. Skills for Care — State of the adult social care sector 2024."
          />
        </ScrollReveal>

        {/* Sources */}
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
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
      </main>
    </>
  );
}
