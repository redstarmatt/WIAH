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

interface WaitingListPoint {
  year: number;
  patients: number;
}

interface MedianWaitPoint {
  year: number;
  weeks: number;
}

interface SurgeryVolumePoint {
  year: number;
  operations: number;
}

interface RegionData {
  region: string;
  medianWaitWeeks: number;
}

interface CataractData {
  waitingList: WaitingListPoint[];
  medianWaitWeeks: MedianWaitPoint[];
  surgeryVolume: SurgeryVolumePoint[];
  byRegion: RegionData[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function CataractWaitsPage() {
  const [data, setData] = useState<CataractData | null>(null);

  useEffect(() => {
    fetch('/data/cataract-waits/cataract_waits.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const waitingListSeries: Series[] = data
    ? [{
        id: 'waiting-list',
        label: 'Patients on waiting list',
        colour: '#E63946',
        data: data.waitingList.map(d => ({
          date: yearToDate(d.year),
          value: d.patients,
        })),
      }]
    : [];

  const medianWaitSeries: Series[] = data
    ? [{
        id: 'median-wait',
        label: 'Median wait (weeks)',
        colour: '#E63946',
        data: data.medianWaitWeeks.map(d => ({
          date: yearToDate(d.year),
          value: d.weeks,
        })),
      }]
    : [];

  const surgeryVolumeSeries: Series[] = data
    ? [{
        id: 'surgery-volume',
        label: 'Cataract operations performed',
        colour: '#2A9D8F',
        data: data.surgeryVolume.map(d => ({
          date: yearToDate(d.year),
          value: d.operations,
        })),
      }]
    : [];

  const waitingListAnnotations: Annotation[] = [
    { date: new Date(2020, 2, 1), label: "2020: COVID halts elective surgery" },
    { date: new Date(2022, 0, 1), label: "2022: Recovery programme launched" },
  ];

  const medianWaitAnnotations: Annotation[] = [
    { date: new Date(2020, 2, 1), label: "2020: Pandemic cancellations" },
  ];

  const surgeryAnnotations: Annotation[] = [
    { date: new Date(2020, 2, 1), label: "2020: Elective surgery suspended" },
    { date: new Date(2023, 0, 1), label: "2023: High-volume cataract hubs open" },
  ];

  const latestWaiting = data?.waitingList[data.waitingList.length - 1];
  const preCovidWaiting = data?.waitingList.find(d => d.year === 2019);
  const latestWait = data?.medianWaitWeeks[data.medianWaitWeeks.length - 1];
  const preCovidWait = data?.medianWaitWeeks.find(d => d.year === 2019);
  const latestVolume = data?.surgeryVolume[data.surgeryVolume.length - 1];
  const peakVolume = data?.surgeryVolume.find(d => d.year === 2019);

  const waitingIncreasePct = latestWaiting && preCovidWaiting
    ? Math.round(((latestWaiting.patients - preCovidWaiting.patients) / preCovidWaiting.patients) * 100)
    : 433;

  return (
    <>
      <TopicNav topic="Cataract Waits" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Cataract Waits"
          question="Why Are 650,000 People Waiting for Cataract Surgery?"
          finding="The cataract backlog has grown more than fivefold since 2019, with 650,000 people now waiting. The median wait is 41 weeks — more than four times the pre-pandemic figure. Cataracts are the single most common elective surgery in England, and the condition is entirely treatable."
          colour="#E63946"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Cataract surgery is the highest-volume planned operation in the NHS. Before the pandemic, around 440,000 procedures were carried out each year in England, with a median wait of roughly nine weeks from referral to treatment. The operation itself takes less than thirty minutes, is performed under local anaesthetic, and has a success rate above 99%. It is, by any measure, one of modern medicine&apos;s most reliable interventions. And yet 650,000 people are now on the waiting list — more than five times the 122,000 waiting in early 2019.</p>
            <p>The immediate cause is COVID-19. When elective surgery was suspended in March 2020, cataract operations dropped to near zero overnight. Only 198,000 procedures were completed that year, fewer than half the usual volume. Demand, however, did not pause. Cataracts are age-related and progressive: roughly one in three people over 65 will develop them, and an ageing population means referral volumes were already climbing before the pandemic. By the time theatres reopened, the queue had more than doubled. NHS England&apos;s elective recovery programme, launched in 2022, has made progress — surgical volumes have climbed back to around 438,000 per year — but this is barely above pre-pandemic throughput, and the backlog continues to grow because the rate of new referrals now outpaces the rate of treatment.</p>
            <p>Behind the headline numbers are real consequences. Patients waiting more than six months for cataract surgery face measurable deterioration in visual acuity, increased falls risk (hip fractures among elderly patients with untreated cataracts cost the NHS far more than the surgery itself), loss of driving licences, social isolation, and depression. The regional picture makes matters worse: median waits in the South West exceed 52 weeks, while London trusts average 35 weeks. A patient&apos;s postcode now determines how long they spend unable to read, drive, or live independently. High-volume surgical hubs — dedicated cataract centres that can perform 30 or more operations per day — have shown that throughput can be dramatically increased without compromising quality. The challenge is scaling them fast enough to close the gap.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-backlog', label: 'Waiting list' },
          { id: 'sec-wait-times', label: 'Wait times' },
          { id: 'sec-throughput', label: 'Surgery volume' },
          { id: 'sec-regional', label: 'Regional' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="People waiting for cataract surgery"
            value={latestWaiting ? (latestWaiting.patients / 1000).toFixed(0) + 'K' : '650K'}
            unit="England, 2025"
            direction="up"
            polarity="up-is-bad"
            changeText={`+${waitingIncreasePct}% since 2019 · most common elective surgery`}
            sparklineData={
              data ? sparkFrom(data.waitingList.map(d => d.patients)) : []
            }
            source="NHS England — Referral to Treatment, Feb 2025"
            href="#sec-backlog"
          />
          <MetricCard
            label="Median wait (weeks)"
            value={latestWait ? latestWait.weeks.toFixed(0) : '41'}
            unit="weeks"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestWait && preCovidWait
                ? `up from ${preCovidWait.weeks} weeks in 2019 · 18-week standard breached`
                : 'up from 9 weeks in 2019'
            }
            sparklineData={
              data ? sparkFrom(data.medianWaitWeeks.map(d => d.weeks)) : []
            }
            source="NHS England — Referral to Treatment, Feb 2025"
            href="#sec-wait-times"
          />
          <MetricCard
            label="Cataract operations per year"
            value={latestVolume ? (latestVolume.operations / 1000).toFixed(0) + 'K' : '438K'}
            unit="2024/25"
            direction="up"
            polarity="up-is-good"
            changeText={
              latestVolume && peakVolume
                ? `recovering · ${Math.round(((peakVolume.operations - latestVolume.operations) / peakVolume.operations) * 100)}% below 2019 peak`
                : 'recovering but still below 2019 peak'
            }
            sparklineData={
              data ? sparkFrom(data.surgeryVolume.map(d => d.operations)) : []
            }
            source="NHS England — Hospital Episode Statistics, 2024/25"
            href="#sec-throughput"
          />
        </div>

        {/* Chart 1: Waiting list growth */}
        <ScrollReveal>
          <div id="sec-backlog" className="mb-12">
            <LineChart
              series={waitingListSeries}
              title="Patients on the cataract surgery waiting list, England, 2015-2025"
              subtitle="Total patients waiting for cataract extraction. Backlog grew fivefold after COVID-19 suspended elective surgery."
              yLabel="Patients"
              annotations={waitingListAnnotations}
              source={{
                name: 'NHS England',
                dataset: 'Referral to Treatment Waiting Times',
                frequency: 'monthly',
                url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/referral-to-treatment-waiting-times/',
                date: 'Feb 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Median wait weeks */}
        <ScrollReveal>
          <div id="sec-wait-times" className="mb-12">
            <LineChart
              series={medianWaitSeries}
              title="Median wait for cataract surgery (weeks), England, 2015-2025"
              subtitle="Weeks from GP referral to first eye operation. The 18-week RTT standard has been breached since 2020."
              yLabel="Weeks"
              annotations={medianWaitAnnotations}
              targetLine={{ value: 18, label: '18-week RTT standard' }}
              source={{
                name: 'NHS England',
                dataset: 'Referral to Treatment Waiting Times',
                frequency: 'monthly',
                url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/referral-to-treatment-waiting-times/',
                date: 'Feb 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Surgery volume */}
        <ScrollReveal>
          <div id="sec-throughput" className="mb-12">
            <LineChart
              series={surgeryVolumeSeries}
              title="Cataract operations performed per year, England, 2015-2025"
              subtitle="Annual surgical throughput. Volume collapsed in 2020 and has not yet returned to pre-pandemic levels."
              yLabel="Operations"
              annotations={surgeryAnnotations}
              source={{
                name: 'NHS England',
                dataset: 'Hospital Episode Statistics — Admitted Patient Care',
                frequency: 'annual',
                url: 'https://digital.nhs.uk/data-and-information/publications/statistical/hospital-admitted-patient-care-activity',
                date: 'Feb 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Regional variation */}
        <ScrollReveal>
          <div id="sec-regional" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Median cataract wait by NHS region (weeks)
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                Patients in the South West wait nearly 18 weeks longer than those in London. A 17-week gap determined by geography alone.
              </p>
              <div className="mt-6 space-y-4">
                {data?.byRegion.map((r) => {
                  const pct = (r.medianWaitWeeks / 55) * 100;
                  const isAboveTarget = r.medianWaitWeeks > 18;
                  return (
                    <div key={r.region}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{r.region}</span>
                        <span className="font-mono text-sm font-bold text-wiah-black">
                          {r.medianWaitWeeks} weeks
                        </span>
                      </div>
                      <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{
                            width: `${pct}%`,
                            backgroundColor: isAboveTarget ? '#E63946' : '#2A9D8F',
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">
                Source: NHS England — Referral to Treatment by Treatment Function, Feb 2025
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="High-volume surgical hubs accelerating recovery"
            value="30+ ops/day"
            description="Dedicated high-volume cataract surgical hubs, first piloted in 2022, have demonstrated that a single facility can perform 30 or more cataract operations per day with outcomes matching or exceeding conventional theatre lists. The Moorfields-model hub at St Ann&apos;s Hospital, London, completes a cataract extraction every 10 minutes. NHS England is now scaling this approach nationally, with 12 hubs operational and a further 8 planned by 2026. If fully deployed, these hubs alone could add 150,000 additional procedures per year — enough to begin reducing the backlog for the first time since 2019."
            source="Source: NHS England — Elective Recovery Programme, 2024. Getting It Right First Time (GIRFT) — Ophthalmology National Report, 2023."
          />
        </ScrollReveal>

        {/* Sources & Methodology */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p>
              <a href="https://www.england.nhs.uk/statistics/statistical-work-areas/referral-to-treatment-waiting-times/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — Referral to Treatment Waiting Times</a> — waiting list size and median wait duration. Monthly publication. Retrieved Feb 2025.
            </p>
            <p>
              <a href="https://digital.nhs.uk/data-and-information/publications/statistical/hospital-admitted-patient-care-activity" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS Digital — Hospital Episode Statistics</a> — cataract surgery volumes by year and region. Annual publication. Retrieved Feb 2025.
            </p>
            <p>
              <a href="https://gettingitrightfirsttime.co.uk/surgical_specialties/ophthalmology/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Getting It Right First Time (GIRFT) — Ophthalmology</a> — high-volume hub performance data and surgical pathway benchmarks. Retrieved Jan 2025.
            </p>
            <p>
              All figures are for England unless otherwise stated. Cataract surgery is defined as OPCS-4 code C71 (extracapsular extraction of lens). Waiting list data covers incomplete RTT pathways where the treatment function is ophthalmology and the procedure is cataract extraction. Regional medians are based on provider-level data aggregated to NHS region. Trend data uses the most recent available release at time of publication.
            </p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
