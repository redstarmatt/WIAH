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
  { num: 1, name: 'HM Passport Office', dataset: 'Passport application processing times', url: 'https://www.gov.uk/government/organisations/hm-passport-office', date: '2025' },
  { num: 2, name: 'National Audit Office', dataset: 'HM Passport Office: responding to the surge in demand', url: 'https://www.nao.org.uk/reports/hm-passport-office', date: '2023' },
  { num: 3, name: 'Home Office', dataset: 'Immigration and passport statistics', url: 'https://www.gov.uk/government/collections/migration-statistics', date: '2024' },
  { num: 4, name: 'HMPO', dataset: 'Passport fees schedule', date: '2023' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface ProcessingTimePoint {
  year: number;
  avgWeeks: number;
}

interface ApplicationsPoint {
  year: number;
  applicationsM: number;
}

interface FastTrackPoint {
  year: number;
  availabilityPct: number;
}

interface PassportWaitsData {
  national: {
    processingTime: {
      timeSeries: ProcessingTimePoint[];
      latestWeeks: number;
      targetWeeks: number;
      fastTrackWeeks: number;
      peakWeeks2022: number;
    };
    applications: {
      timeSeries: ApplicationsPoint[];
      latestM: number;
      peak2022M: number;
      prePandemicAvgM: number;
    };
    fastTrack: {
      timeSeries: FastTrackPoint[];
      latestPct: number;
      prePandemicPct: number;
    };
    cost: {
      standardAdult: number;
      fastTrack: number;
      premium: number;
      prePandemic: number;
    };
    backlog: {
      peak2022: number;
      latest: number;
    };
    staffing: {
      prePandemic: number;
      current: number;
    };
    digitalPct: {
      prePandemic: number;
      current: number;
    };
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function PassportWaitsPage() {
  const [data, setData] = useState<PassportWaitsData | null>(null);

  useEffect(() => {
    fetch('/data/passport-waits/passport_waits.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const processingTimeSeries: Series[] = data
    ? [{
        id: 'processing-time',
        label: 'Average processing time (weeks)',
        colour: '#F4A261',
        data: data.national.processingTime.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.avgWeeks,
        })),
      }]
    : [];

  const targetSeries: Series[] = data
    ? [{
        id: 'target',
        label: 'Standard target (3 weeks)',
        colour: '#2A9D8F',
        data: data.national.processingTime.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: data.national.processingTime.targetWeeks,
        })),
      }]
    : [];

  const applicationsSeries: Series[] = data
    ? [{
        id: 'applications',
        label: 'Applications (millions)',
        colour: '#264653',
        data: data.national.applications.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.applicationsM,
        })),
      }]
    : [];

  const fastTrackSeries: Series[] = data
    ? [{
        id: 'fast-track',
        label: 'Fast-track availability (%)',
        colour: '#F4A261',
        data: data.national.fastTrack.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.availabilityPct,
        })),
      }]
    : [];

  const processingAnnotations: Annotation[] = [
    { date: new Date(2020, 2, 1), label: '2020: Passport Office closed (COVID)' },
    { date: new Date(2022, 5, 1), label: '2022: Backlog peaks at 550,000' },
    { date: new Date(2023, 3, 1), label: '2023: PCS union strikes' },
  ];

  const applicationsAnnotations: Annotation[] = [
    { date: new Date(2020, 2, 1), label: '2020: Pandemic — travel halted' },
    { date: new Date(2022, 0, 1), label: '2022: 7m applications — post-COVID surge' },
  ];

  const processingSparkline = data
    ? sparkFrom(data.national.processingTime.timeSeries.map(d => d.avgWeeks))
    : [];

  const applicationsSparkline = data
    ? sparkFrom(data.national.applications.timeSeries.map(d => d.applicationsM))
    : [];

  return (
    <>
      <TopicNav topic="Transport" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Transport"
          question="Can You Actually Leave the Country?"
          finding="Passport processing collapsed to 15 weeks post-COVID against a 3-week target. It has recovered to 6-7 weeks but remains double the pre-pandemic norm, with fast-track services regularly unavailable in summer."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Before the pandemic, getting a British passport was unremarkable: you applied online or by post, waited roughly three weeks, and it arrived. That system broke in 2021-22 when millions of people whose passports had expired during lockdown — alongside the normal renewal cycle — applied simultaneously. HM Passport Office received 7 million applications in 2022, around 2 million above the normal annual volume.<Cite nums={2} /> The backlog peaked at 550,000 unprocessed applications in summer 2022, with average processing times reaching 15 weeks.<Cite nums={[1, 2]} /> People missed holidays, business trips, and family emergencies abroad. The government responded by hiring: staff numbers rose from 4,000 to 5,800<Cite nums={2} />, and the Passport Office shifted to seven-day working. But many of the new staff were agency workers on short contracts, and turnover was high — training takes months, and experienced caseworkers cannot easily be replaced. PCS union strikes in spring and summer 2023, over pay and conditions, compounded delays further. The cost of a standard adult passport rose from £72.50 to £88.50 in February 2023, a 22% increase<Cite nums={4} /> that drew criticism given the service failures. Fast-track (one week, £177) and premium (same day, £212) services — designed as a pressure valve — were themselves regularly suspended during peak months because the Passport Office lacked the capacity to deliver them.</p>
            <p>The system has improved but not recovered. Average processing times in 2025 sit at around 6-7 weeks — better than the crisis peak but still double the pre-pandemic norm of three weeks.<Cite nums={1} /> Children's passports, which require additional checks, routinely take 10 weeks or more. Digital applications now account for 75% of all submissions, up from 20% before the pandemic<Cite nums={3} />, but the online system has crashed under peak demand on multiple occasions, forcing applicants back to paper forms. The fast-track service remains unreliable in summer months: in 2022, it was available for only 35% of summer weeks.<Cite nums={1} /> International comparisons are unflattering — many EU countries process standard applications in 2-3 weeks, and several have fully digital end-to-end systems that the UK has not yet matched. The fundamental problem is structural: HMPO's capacity was sized for a steady-state world of 5 million applications per year, and it has not yet been permanently rebuilt for the volatility and volume spikes that post-pandemic travel patterns produce. For the roughly 50 million British passport holders, the question is not whether the crisis is over — it is whether the system can cope the next time demand surges.</p>
          </div>

          <div className="mt-6">
            <References items={editorialRefs} />
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-processing', label: 'Processing time' },
          { id: 'sec-applications', label: 'Applications' },
          { id: 'sec-fast-track', label: 'Fast-track' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Average processing time"
              value={data ? `${data.national.processingTime.latestWeeks}` : '6.4'}
              unit="weeks"
              direction="up"
              polarity="up-is-bad"
              changeText={`Target: ${data?.national.processingTime.targetWeeks ?? 3} weeks · was 3 weeks pre-pandemic · peaked at 15 weeks in 2022`}
              sparklineData={processingSparkline}
              source="HMPO · Passport processing times, 2025"
              href="#sec-processing"
            />
            <MetricCard
              label="Applications per year"
              value={data ? `${data.national.applications.latestM}m` : '5.1m'}
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText={`Normal: ~5m/year · peaked at 7m in 2022`}
              sparklineData={applicationsSparkline}
              source="HMPO · Annual Report 2024/25"
              href="#sec-applications"
            />
            <MetricCard
              label="Cost of adult passport"
              value={data ? `£${data.national.cost.standardAdult}` : '£88.50'}
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from £72.50 pre-2023 · +22% increase"
              sparklineData={[72.5, 72.5, 72.5, 72.5, 72.5, 75.5, 75.5, 82.5, 85, 88.5]}
              source="HMPO · Passport fees schedule 2023"
              href="#sec-processing"
            />
          </div>
        </ScrollReveal>

        {/* Chart 1: Processing time */}
        <ScrollReveal>
          <div id="sec-processing" className="mb-12">
            <LineChart
              series={[...processingTimeSeries, ...targetSeries]}
              title="Average passport processing time, 2015-2025"
              subtitle="Weeks from receipt of complete application to dispatch. Standard adult applications, United Kingdom. Target is 3 weeks."
              yLabel="Weeks"
              annotations={processingAnnotations}
              source={{
                name: 'HM Passport Office',
                dataset: 'Passport application processing times',
                frequency: 'monthly',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Applications volume */}
        <ScrollReveal>
          <div id="sec-applications" className="mb-12">
            <LineChart
              series={applicationsSeries}
              title="Passport applications per year, 2015-2025"
              subtitle="Total applications received by HMPO (millions). The post-COVID surge in 2022 was 40% above normal volume."
              yLabel="Applications (millions)"
              annotations={applicationsAnnotations}
              source={{
                name: 'HM Passport Office',
                dataset: 'Annual Report — Application volumes',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Fast-track availability */}
        <ScrollReveal>
          <div id="sec-fast-track" className="mb-12">
            <LineChart
              series={fastTrackSeries}
              title="Fast-track service availability in summer months, 2019-2025"
              subtitle="Percentage of weeks in June-September when the 1-week fast-track service (£177) was accepting new bookings."
              yLabel="Availability (%)"
              source={{
                name: 'HM Passport Office',
                dataset: 'Fast-track service availability',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Digital-first approach transforming straightforward renewals"
            value="75%"
            description="Digital-first applications now account for 75% of all submissions, up from 20% pre-COVID. HMPO's new online renewal system processes straightforward renewals in under 3 weeks — the fastest since 2019. The shift to digital has reduced data-entry errors and allowed caseworkers to focus on complex applications, including first-time applicants and children's passports that require additional verification."
            source="Source: HM Passport Office — Annual Report 2024/25. Digital transformation programme update."
          />
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>HM Passport Office — Passport application processing times. Published monthly. gov.uk/government/organisations/hm-passport-office</p>
            <p>Home Office — Immigration and passport statistics. Published quarterly. gov.uk/government/collections/migration-statistics</p>
            <p>National Audit Office — HM Passport Office: responding to the surge in demand (2023). nao.org.uk/reports/hm-passport-office</p>
            <p>Processing time is the average number of weeks from receipt of a complete application to dispatch, for standard adult applications. Applications volume is total applications received in the calendar year. Fast-track availability is the percentage of summer weeks (June-September) in which the 1-week fast-track service was accepting new bookings. 2020-21 data reflects pandemic disruption. Children's passports and first-time applications take materially longer than the reported averages. PCS industrial action in 2023 affected processing capacity for several months.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
