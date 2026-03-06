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

interface UsersPoint {
  year: number;
  usersMillions: number;
}

interface BookingsPoint {
  year: number;
  percentDigital: number;
}

interface ExclusionPoint {
  year: number;
  percentExcluded: number;
}

interface NHSAppData {
  national: {
    registeredUsers: {
      timeSeries: UsersPoint[];
      latestYear: number;
      latestMillions: number;
      note: string;
    };
    digitalBookings: {
      timeSeries: BookingsPoint[];
      latestYear: number;
      latestPercent: number;
      note: string;
    };
    digitalExclusion: {
      timeSeries: ExclusionPoint[];
      latestYear: number;
      latestPercent: number;
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

export default function NHSAppPage() {
  const [data, setData] = useState<NHSAppData | null>(null);

  useEffect(() => {
    fetch('/data/nhs-app-usage/nhs_app.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const usersSeries: Series[] = data
    ? [{
        id: 'users',
        label: 'NHS App registered users (millions)',
        colour: '#264653',
        data: data.national.registeredUsers.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.usersMillions,
        })),
      }]
    : [];

  const adoptionSeries: Series[] = data
    ? [
        {
          id: 'bookings',
          label: 'GP appointments booked digitally (%)',
          colour: '#264653',
          data: data.national.digitalBookings.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.percentDigital,
          })),
        },
        {
          id: 'exclusion',
          label: 'Unable to access online services (%)',
          colour: '#E63946',
          data: data.national.digitalExclusion.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.percentExcluded,
          })),
        },
      ]
    : [];

  const usersAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: COVID-19 drives rapid NHS digital adoption' },
    { date: new Date(2021, 5, 1), label: '2021: COVID Pass — major growth event' },
    { date: new Date(2023, 5, 1), label: '2023: GP online access mandated for all practices' },
  ];

  const adoptionAnnotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: NHS mandates online appointment booking' },
    { date: new Date(2023, 5, 1), label: '2023: Digital inclusion strategy published' },
  ];

  // ── Sparkline helpers ────────────────────────────────────────────────────

  const usersSparkline = data
    ? data.national.registeredUsers.timeSeries.map(d => d.usersMillions)
    : [];
  const bookingsSparkline = data
    ? data.national.digitalBookings.timeSeries.map(d => d.percentDigital)
    : [];
  const exclusionSparkline = data
    ? data.national.digitalExclusion.timeSeries.map(d => d.percentExcluded)
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="NHS App Adoption" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="NHS App Adoption"
          question="Is Digital Healthcare Reaching Everyone?"
          finding="The NHS App has 35 million registered users &mdash; more than any other European health app. But 24% of GP appointments are not bookable digitally and digital exclusion means 8.5 million people cannot use online health services."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The NHS App has grown from 3.2 million users in 2020 to 35.1 million by 2025 &mdash; a tenfold increase driven initially by the COVID Pass and subsequently by NHS England&apos;s mandate for GP practices to offer online appointment booking, prescription ordering, and access to health records. By 2025, 54% of GP appointments are booked digitally, with the NHS targeting 75% by 2027. The app now also supports patient-initiated follow-up appointments, hospital referral tracking, and health screening invitations.
            </p>
            <p>
              The 14% of people unable to access online health services &mdash; around 8.5 million adults &mdash; represents a persistent structural challenge. Digital exclusion correlates strongly with age (those over 75), disability, low income, and limited English proficiency. NHS Digital&apos;s 2023 analysis found that practices in the most deprived decile have the lowest rates of digital booking, meaning those with the highest health needs are least likely to benefit from digital convenience. Forcing digital access for appointment booking without adequate telephone capacity effectively creates a two-tier system. NHSX&apos;s digital inclusion strategy acknowledges these risks but implementation has been patchy, with variation between ICBs in how actively digital inclusion is funded and supported.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-users', label: 'App Growth' },
          { id: 'sec-adoption', label: 'Booking & Exclusion' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="NHS App registered users"
              value="35.1M"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="+997% since 2020 &middot; Largest health app in Europe"
              sparklineData={usersSparkline}
              onExpand={() => {}}
            />
            <MetricCard
              label="GP appointments booked digitally"
              value="54%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Up from 14% in 2020 &middot; Still 46% booked by phone or in person"
              sparklineData={bookingsSparkline}
              onExpand={() => {}}
            />
            <MetricCard
              label="People unable to access online services"
              value="8.5M"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="14% of population &middot; Elderly, disabled, and low-income hardest hit"
              sparklineData={exclusionSparkline}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        {/* Chart 1: User growth */}
        <ScrollReveal>
          <section id="sec-users" className="mb-12">
            <LineChart
              title="NHS App registered users, England, 2020&ndash;2025"
              subtitle="Cumulative registered users of the NHS App (millions), England. Growth accelerated sharply with COVID Pass in 2021 and again after NHS England&apos;s mandate for practices to enable online access."
              series={usersSeries}
              annotations={usersAnnotations}
              yLabel="Millions"
            />
          </section>
        </ScrollReveal>

        {/* Chart 2: Booking and exclusion */}
        <ScrollReveal>
          <section id="sec-adoption" className="mb-12">
            <LineChart
              title="Digital GP appointment booking and digital exclusion, 2020&ndash;2025"
              subtitle="Percentage of GP appointments booked digitally (green) against percentage of population unable to access online health services (red). Digital booking is rising but digital exclusion persists at 14%."
              series={adoptionSeries}
              annotations={adoptionAnnotations}
              yLabel="Percent (%)"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s improving"
            value="Libraries"
            unit="Digital support hubs"
            description="NHSX&apos;s digital inclusion strategy includes public libraries as digital support hubs, with over 3,000 libraries offering free internet access and digital assistance. NHS Volunteer Responders digital befriending connects isolated patients with support. All NHS digital products are required to meet WCAG 2.1 AA accessibility standards. The NHS App&apos;s Proxy Access feature now allows carers and family members to manage health needs on behalf of those who cannot manage digital services themselves."
            source="Source: NHSX &mdash; Digital inclusion: wider determinants of health and the role of digital 2021. NHS Digital &mdash; NHS App performance dashboard."
          />
        </ScrollReveal>

        {/* Sources */}
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                  {src.name} &mdash; {src.dataset}
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
