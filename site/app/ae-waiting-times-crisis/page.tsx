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

// ── Types ────────────────────────────────────────────────────────────────────

interface FourHourPoint {
  year: number;
  pctWithin4Hours: number;
  note?: string;
}

interface TwelvePlusPoint {
  year: number;
  waitsPerMonth: number;
  note?: string;
}

interface AttendancePoint {
  year: number;
  attendancesMillions: number;
  note?: string;
}

interface AEData {
  fourHourPerformance: FourHourPoint[];
  twelvePlusHourWaits: TwelvePlusPoint[];
  totalAttendances: AttendancePoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AEWaitingTimesCrisisPage() {
  const [data, setData] = useState<AEData | null>(null);

  useEffect(() => {
    fetch('/data/ae-waiting-times-crisis/ae_waiting_times_crisis.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const fourHourSeries: Series[] = data
    ? [{
        id: 'four-hour',
        label: '% seen within 4 hours',
        colour: '#E63946',
        data: data.fourHourPerformance.map(d => ({
          date: yearToDate(d.year),
          value: d.pctWithin4Hours,
        })),
      }]
    : [];

  const twelvePlusSeries: Series[] = data
    ? [{
        id: 'twelve-plus',
        label: '12+ hour waits per month',
        colour: '#E63946',
        data: data.twelvePlusHourWaits.map(d => ({
          date: yearToDate(d.year),
          value: d.waitsPerMonth,
        })),
      }]
    : [];

  const attendanceSeries: Series[] = data
    ? [{
        id: 'attendances',
        label: 'Total attendances (millions)',
        colour: '#6B7280',
        data: data.totalAttendances.map(d => ({
          date: yearToDate(d.year),
          value: d.attendancesMillions,
        })),
      }]
    : [];

  const latestFourHour = data?.fourHourPerformance[data.fourHourPerformance.length - 1];
  const earliest = data?.fourHourPerformance[0];
  const latestTwelvePlus = data?.twelvePlusHourWaits[data.twelvePlusHourWaits.length - 1];
  const prevTwelvePlus = data?.twelvePlusHourWaits[data.twelvePlusHourWaits.length - 2];

  const twelvePlusChange = latestTwelvePlus && prevTwelvePlus
    ? Math.round(((latestTwelvePlus.waitsPerMonth - prevTwelvePlus.waitsPerMonth) / prevTwelvePlus.waitsPerMonth) * 100)
    : 32;

  return (
    <>
      <TopicNav topic="NHS & Healthcare" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="NHS & Healthcare"
          question="How long will you wait in A&E?"
          finding="The NHS 4-hour A&E target has collapsed. Just 40.4% of emergency patients are now seen within 4 hours against a 95% standard. Over 71,000 patients a month wait more than 12 hours. Emergency departments designed for acute care have become holding wards for a system with nowhere to discharge patients to."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The 4-hour A&E standard was introduced in 2004 and rapidly became the defining metric of NHS emergency performance. For a decade it worked: the target of seeing, treating, admitting, or discharging 95% of patients within four hours was routinely met, and the UK was internationally recognised for its emergency care. That standard has not been met nationally since July 2015. By 2024, performance had fallen to 40.4% — meaning the majority of patients attending a Type 1 emergency department now wait longer than four hours. The decline is not a blip or a pandemic hangover. It is structural, and it reflects a system under pressure at every link in the chain.</p>
            <p>The proximate cause is exit block: patients cannot leave A&E because there are no beds on the wards, and patients cannot leave the wards because there is nowhere safe to discharge them. Social care capacity in England has contracted by an estimated 120,000 beds since 2010. Community intermediate care, rehabilitation services, and domiciliary care packages are chronically underfunded, meaning medically fit patients remain in hospital beds for days or weeks — a phenomenon known as bed blocking. In 2023/24, an estimated 13,000 acute beds per day were occupied by patients who no longer needed to be there. This cascades backwards: wards are full, so A&E patients on trolleys cannot be admitted, so ambulances queue outside unable to offload, so 999 response times lengthen. Corridor care — treating patients on trolleys in corridors because there is no cubicle space — has become normalised. The Royal College of Emergency Medicine has described this as "the most dangerous situation in the NHS" because patients awaiting assessment in crowded corridors are at measurably higher risk of harm and death.</p>
            <p>Winter pressures compound the crisis each year, but the underlying trajectory has been deteriorating through every season since 2015. Ambulance handover delays — the time paramedics spend waiting to hand patients over to A&E staff — exceeded 30 minutes in over 25% of cases during 2023/24, effectively removing ambulances from the road. International comparisons are stark: Canada, Australia, and most European systems use similar four-hour benchmarks and routinely achieve 75-85% compliance. England's 40% is an outlier among developed nations. The government quietly replaced the 95% standard with a lower 76% target in 2023, but even this reduced ambition has not been met. The 12-hour wait figure — once so rare it was a never-event — reached 71,517 in a single month in late 2024, an 87-fold increase from 2015. These are not abstract statistics; each number represents a person in pain, on a trolley, in a corridor, waiting.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-four-hour', label: '4-hour target' },
          { id: 'sec-twelve-plus', label: '12+ hour waits' },
          { id: 'sec-attendances', label: 'Attendances' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="4-hour target met"
            value={latestFourHour ? `${latestFourHour.pctWithin4Hours}%` : '40.4%'}
            unit="2024"
            direction="down"
            polarity="up-is-good"
            changeText={
              latestFourHour && earliest
                ? `Down from ${earliest.pctWithin4Hours}% in ${earliest.year} · target: 95%`
                : 'Down from 97.5% in 2010 · target: 95%'
            }
            sparklineData={
              data ? sparkFrom(data.fourHourPerformance.map(d => d.pctWithin4Hours)) : []
            }
            source="NHS England · A&E Attendances and Emergency Admissions, 2024"
            href="#sec-four-hour"
          />
          <MetricCard
            label="12+ hour waits"
            value={latestTwelvePlus ? latestTwelvePlus.waitsPerMonth.toLocaleString() : '71,517'}
            unit="/month, 2024"
            direction="up"
            polarity="up-is-bad"
            changeText={`+${twelvePlusChange}% year-on-year · 87x higher than 2015`}
            sparklineData={
              data ? sparkFrom(data.twelvePlusHourWaits.map(d => d.waitsPerMonth)) : []
            }
            source="NHS England · A&E Attendances and Emergency Admissions, 2024"
            href="#sec-twelve-plus"
          />
          <MetricCard
            label="Trolley waits"
            value="Rising"
            unit="2024"
            direction="up"
            polarity="up-is-bad"
            changeText="Corridor care normalised · 25%+ ambulance handovers >30 min"
            sparklineData={
              data ? sparkFrom(data.twelvePlusHourWaits.map(d => d.waitsPerMonth)) : []
            }
            source="NHS England · Urgent and Emergency Care Daily SitRep, 2024"
            href="#sec-twelve-plus"
          />
        </div>

        {/* Chart 1: 4-hour performance */}
        <ScrollReveal>
          <div id="sec-four-hour" className="mb-12">
            <LineChart
              series={fourHourSeries}
              title="A&E 4-hour performance, England, 2010–2024"
              subtitle="Percentage of Type 1 A&E patients seen within 4 hours. 95% target not met nationally since 2015."
              yLabel="% within 4 hours"
              source={{
                name: 'NHS England',
                dataset: 'A&E Attendances and Emergency Admissions',
                frequency: 'monthly',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: 12+ hour waits */}
        <ScrollReveal>
          <div id="sec-twelve-plus" className="mb-12">
            <LineChart
              series={twelvePlusSeries}
              title="Patients waiting 12+ hours in A&E per month, England, 2015–2024"
              subtitle="Once a never-event, now over 71,000 patients a month. An 87-fold increase in a decade."
              yLabel="Waits per month"
              source={{
                name: 'NHS England',
                dataset: 'A&E Attendances and Emergency Admissions',
                frequency: 'monthly',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Total attendances */}
        <ScrollReveal>
          <div id="sec-attendances" className="mb-12">
            <LineChart
              series={attendanceSeries}
              title="Total A&E attendances, England, 2010–2024"
              subtitle="Annual attendances at all A&E departments. Demand has grown steadily aside from the 2020 COVID-19 dip."
              yLabel="Attendances (millions)"
              source={{
                name: 'NHS England',
                dataset: 'A&E Attendances and Emergency Admissions',
                frequency: 'monthly',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Same Day Emergency Care and virtual wards are easing pressure"
            value="SDEC & virtual wards"
            description="Same Day Emergency Care (SDEC) units allow patients who would previously have been admitted overnight to be assessed, treated, and sent home the same day — avoiding A&E entirely for conditions like pulmonary embolism, cellulitis, and deep vein thrombosis. By March 2024, SDEC was available in 97% of acute trusts and handled over 1.5 million patients annually. Virtual wards — where patients are monitored at home using pulse oximeters, blood pressure cuffs, and remote clinical oversight — have expanded to over 10,000 beds equivalent nationally. Early evidence shows they reduce hospital admissions by 20-30% for eligible patients and free acute bed capacity. Together, these models represent the most promising structural response to exit block: treating patients in the right place at the right time, rather than defaulting to admission into an overwhelmed system."
            source="Source: NHS England — Same Day Emergency Care data, 2024. NHS England — Virtual Ward programme dashboard, 2024."
          />
        </ScrollReveal>
        <RelatedTopics />
      </main>
    </>
  );
}
