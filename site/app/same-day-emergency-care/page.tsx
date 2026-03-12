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

interface SDECAttendancePoint {
  year: number;
  attendances: number;
  note?: string;
}

interface AEPerformancePoint {
  year: number;
  percent: number;
  note?: string;
}

interface SDECConversionPoint {
  year: number;
  percent: number;
  note?: string;
}

interface LengthOfStayPoint {
  year: number;
  hours: number;
}

interface SDECData {
  sdecAttendances: SDECAttendancePoint[];
  aeFourHourPerformance: AEPerformancePoint[];
  sdecConversionRate: SDECConversionPoint[];
  averageLengthOfStay: LengthOfStayPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

function millions(n: number): string {
  return (n / 1_000_000).toFixed(1) + 'M';
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function SameDayEmergencyCarePage() {
  const [data, setData] = useState<SDECData | null>(null);

  useEffect(() => {
    fetch('/data/same-day-emergency-care/same_day_emergency_care.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const attendanceSeries: Series[] = data
    ? [{
        id: 'sdec-attendances',
        label: 'SDEC attendances',
        colour: '#2A9D8F',
        data: data.sdecAttendances.map(d => ({
          date: yearToDate(d.year),
          value: d.attendances / 1_000_000,
        })),
      }]
    : [];

  const aeSeries: Series[] = data
    ? [{
        id: 'ae-performance',
        label: 'A&E 4-hour performance (%)',
        colour: '#E63946',
        data: data.aeFourHourPerformance.map(d => ({
          date: yearToDate(d.year),
          value: d.percent,
        })),
      }]
    : [];

  const conversionSeries: Series[] = data
    ? [{
        id: 'conversion-rate',
        label: 'Emergency attendances handled via SDEC (%)',
        colour: '#264653',
        data: data.sdecConversionRate.map(d => ({
          date: yearToDate(d.year),
          value: d.percent,
        })),
      }]
    : [];

  const attendanceAnnotations: Annotation[] = [
    { date: new Date(2019, 0, 1), label: '2019: NHS Long Term Plan mandates SDEC expansion' },
    { date: new Date(2020, 0, 1), label: '2020: COVID-19 accelerates adoption' },
  ];

  const aeAnnotations: Annotation[] = [
    { date: new Date(2023, 0, 1), label: '2023: Intermediate target introduced (76%)' },
  ];

  const conversionAnnotations: Annotation[] = [
    { date: new Date(2019, 0, 1), label: '2019: SDEC pathways standardised nationally' },
  ];

  // ── Derived values ────────────────────────────────────────────────────────

  const latestAttendances = data?.sdecAttendances[data.sdecAttendances.length - 1];
  const earliestAttendances = data?.sdecAttendances[0];
  const latestAE = data?.aeFourHourPerformance[data.aeFourHourPerformance.length - 1];
  const peakAE = data?.aeFourHourPerformance[0];
  const latestConversion = data?.sdecConversionRate[data.sdecConversionRate.length - 1];
  const earliestConversion = data?.sdecConversionRate[0];

  const attendanceGrowth = latestAttendances && earliestAttendances
    ? Math.round(((latestAttendances.attendances - earliestAttendances.attendances) / earliestAttendances.attendances) * 100)
    : 183;

  const aeDrop = latestAE && peakAE
    ? (peakAE.percent - latestAE.percent).toFixed(1)
    : '17.0';

  return (
    <>
      <TopicNav topic="Health" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health"
          question="Is Same-Day Emergency Care Reducing A&E Pressure?"
          finding="Same-day emergency care has expanded rapidly since 2019, reaching 3.3 million attendances in 2025 and handling nearly 39% of emergency cases without overnight admission. Yet A&E four-hour performance remains stuck around 74%, well below the 95% standard not met since 2013 — raising the question of what emergency care would look like without SDEC."
          colour="#2A9D8F"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Same-day emergency care represents one of the most significant structural changes to NHS emergency medicine in the past decade. The model is straightforward: patients who arrive at hospital as emergencies but do not need overnight admission are assessed, treated, and sent home the same day through dedicated ambulatory pathways. Before SDEC expansion, many of these patients would have been admitted to acute wards, occupying beds for 24-48 hours for conditions that could be managed in a few hours — cellulitis, deep vein thrombosis, pulmonary embolism, low-risk chest pain. The NHS Long Term Plan in 2019 mandated that every acute hospital establish SDEC services, and COVID-19 unexpectedly accelerated adoption as trusts sought to reduce overnight bed occupancy and infection risk.</p>
            <p>The growth has been substantial. SDEC attendances have risen from 1.2 million in 2017 to 3.3 million in 2025, a 183% increase. The conversion rate — the proportion of emergency attendances handled through SDEC rather than traditional overnight admission — has climbed from 18% to nearly 39%. Average length of stay for SDEC patients has fallen from 6.8 hours to 4.7 hours, reflecting maturation of clinical pathways and better patient streaming at the front door. Without SDEC, the NHS bed crisis would be measurably worse: an estimated 1.3 million additional overnight bed-days would have been required in 2024/25 alone.</p>
            <p>Yet the broader emergency care picture remains deeply strained. A&E four-hour performance — the percentage of patients seen within four hours of arrival — has not met the 95% standard since 2013. It bottomed out at 73% in 2024 and has improved only marginally to 74.3% in 2025. The system faces compounding pressures: an ageing population generating more complex presentations, social care delays blocking hospital discharge, a primary care access crisis pushing patients toward emergency departments, and workforce gaps across emergency medicine, acute medicine, and nursing. SDEC is absorbing demand that would otherwise overwhelm an already overwhelmed system, but it cannot solve problems rooted in insufficient capacity and upstream failures. The data shows a service that is working — quietly, effectively — within a system that is not.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-attendances', label: 'SDEC growth' },
          { id: 'sec-ae-performance', label: 'A&E performance' },
          { id: 'sec-conversion', label: 'Conversion rate' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="SDEC attendances (annual)"
            value={latestAttendances ? millions(latestAttendances.attendances) : '3.3M'}
            unit="2024/25"
            direction="up"
            polarity="up-is-good"
            changeText={`+${attendanceGrowth}% since 2017 · diverts pressure from overnight beds`}
            sparklineData={
              data ? sparkFrom(data.sdecAttendances.map(d => d.attendances / 1_000_000)) : []
            }
            source="NHS England — SDEC Dashboard, Feb 2026"
            href="#sec-attendances"
          />
          <MetricCard
            label="A&E 4-hour performance"
            value={latestAE ? latestAE.percent.toFixed(1) + '%' : '74.3%'}
            unit="2024/25"
            direction="down"
            polarity="up-is-good"
            changeText={`Down ${aeDrop}pp from 91.3% in 2015 · 95% target not met since 2013`}
            sparklineData={
              data ? sparkFrom(data.aeFourHourPerformance.map(d => d.percent)) : []
            }
            source="NHS England — A&E Statistics, Feb 2026"
            href="#sec-ae-performance"
          />
          <MetricCard
            label="Emergency cases via SDEC"
            value={latestConversion ? latestConversion.percent.toFixed(1) + '%' : '38.6%'}
            unit="2024/25"
            direction="up"
            polarity="up-is-good"
            changeText={
              latestConversion && earliestConversion
                ? `Up from ${earliestConversion.percent}% in ${earliestConversion.year} · more patients treated same day`
                : 'Up from 18.2% in 2017'
            }
            sparklineData={
              data ? sparkFrom(data.sdecConversionRate.map(d => d.percent)) : []
            }
            source="NHS England — SDEC Dashboard, Feb 2026"
            href="#sec-conversion"
          />
        </div>

        {/* Chart 1: SDEC attendances */}
        <ScrollReveal>
          <div id="sec-attendances" className="mb-12">
            <LineChart
              series={attendanceSeries}
              annotations={attendanceAnnotations}
              title="Same-day emergency care attendances, England, 2017-2025"
              subtitle="Annual attendances in millions. Mandated nationally in 2019, accelerated by COVID-19."
              yLabel="Attendances (millions)"
              source={{
                name: 'NHS England',
                dataset: 'Same Day Emergency Care Dashboard',
                frequency: 'quarterly',
                url: 'https://www.england.nhs.uk/same-day-emergency-care/',
                date: 'Feb 2026',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: A&E four-hour performance */}
        <ScrollReveal>
          <div id="sec-ae-performance" className="mb-12">
            <LineChart
              series={aeSeries}
              annotations={aeAnnotations}
              title="A&E four-hour performance, England, 2015-2025"
              subtitle="Percentage of patients spending four hours or less in A&E. 95% target not met since 2013."
              yLabel="Patients seen within 4 hours (%)"
              targetLine={{ value: 95, label: '95% target' }}
              source={{
                name: 'NHS England',
                dataset: 'A&E Attendances and Emergency Admissions',
                frequency: 'monthly',
                url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/ae-waiting-times-and-activity/',
                date: 'Feb 2026',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: SDEC conversion rate */}
        <ScrollReveal>
          <div id="sec-conversion" className="mb-12">
            <LineChart
              series={conversionSeries}
              annotations={conversionAnnotations}
              title="SDEC conversion rate, England, 2017-2025"
              subtitle="Proportion of emergency attendances handled via same-day pathways rather than overnight admission."
              yLabel="Conversion rate (%)"
              source={{
                name: 'NHS England',
                dataset: 'Same Day Emergency Care Dashboard',
                frequency: 'quarterly',
                url: 'https://www.england.nhs.uk/same-day-emergency-care/',
                date: 'Feb 2026',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="SDEC is quietly preventing a bed crisis"
            value="1.3M bed-days saved"
            description="Without SDEC pathways, an estimated 1.3 million additional overnight bed-days would have been needed in 2024/25 alone. Average SDEC patient length of stay has fallen from 6.8 hours in 2017 to 4.7 hours in 2025, as clinical pathways have matured and front-door streaming has improved. The model works best for conditions like cellulitis, DVT, pulmonary embolism, and low-risk chest pain — conditions that previously required 24-48 hour admissions but can be safely managed in ambulatory settings. SDEC cannot fix the structural pressures on emergency care, but without it, the system would be measurably worse."
            source="Source: NHS England — SDEC Dashboard, Feb 2026. The King's Fund — NHS Key Statistics, 2025."
          />
        </ScrollReveal>

        {/* Sources & Methodology */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p>
              <a href="https://www.england.nhs.uk/statistics/statistical-work-areas/ae-waiting-times-and-activity/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — A&E Attendances and Emergency Admissions</a> — primary source for A&E four-hour performance. Retrieved Feb 2026. Updated monthly.
            </p>
            <p>
              <a href="https://www.england.nhs.uk/same-day-emergency-care/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — Same Day Emergency Care Dashboard</a> — primary source for SDEC attendances and conversion rates. Retrieved Feb 2026. Updated quarterly.
            </p>
            <p>
              <a href="https://www.kingsfund.org.uk/insight-and-analysis/data-and-charts/key-facts-figures-nhs" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">The King&apos;s Fund — NHS Key Statistics</a> — contextual analysis and bed-day estimates. Retrieved Feb 2026.
            </p>
            <p>All figures are for England unless otherwise stated. SDEC definitions were standardised nationally in 2019; pre-2019 figures may undercount due to varied local definitions. The 2020 data point reflects COVID-19 disruption, which reduced overall emergency attendances but accelerated SDEC adoption. The A&E four-hour standard was de facto relaxed in 2023 with the introduction of an intermediate 76% target.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
