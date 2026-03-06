'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface PoliceRecordedYear {
  year: string;
  crimesThousands: number;
}

interface CSEWPrevalenceYear {
  year: number;
  adultsMillions: number;
}

interface SupportService {
  service: string;
  capacity: number;
}

interface DomesticAbuseData {
  national: {
    policeRecordedCrimes: {
      timeSeries: PoliceRecordedYear[];
      latestYear: string;
      latestThousands: number;
      chargeRatePct: number;
    };
    csewPrevalence: {
      timeSeries: CSEWPrevalenceYear[];
      latestYear: number;
      latestMillions: number;
      womenMillions: number;
      menMillions: number;
    };
    femicides: {
      latestAnnualCount: number;
      avgPerWeek: number;
    };
    supportServices: SupportService[];
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function fyToDate(fy: string): Date {
  const start = parseInt(fy.split('/')[0]);
  return new Date(start, 5, 1);
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function DomesticAbusePage() {
  const [data, setData] = useState<DomesticAbuseData | null>(null);

  useEffect(() => {
    fetch('/data/domestic-abuse/domestic_abuse.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const recordedCrimesSeries: Series[] = data
    ? [{
        id: 'recorded-crimes',
        label: 'Domestic abuse crimes recorded',
        colour: '#E63946',
        data: data.national.policeRecordedCrimes.timeSeries.map(d => ({
          date: fyToDate(d.year),
          value: d.crimesThousands,
        })),
      }]
    : [];

  const recordedAnnotations = [
    { date: fyToDate('2016/17'), label: '2016/17: Improved recording standards' },
  ];

  const prevalenceSeries: Series[] = data
    ? [{
        id: 'prevalence',
        label: 'Adults experiencing domestic abuse',
        colour: '#F4A261',
        data: data.national.csewPrevalence.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.adultsMillions,
        })),
      }]
    : [];

  // ── Metric values ────────────────────────────────────────────────────────

  const latestRecorded = data?.national.policeRecordedCrimes;
  const latestPrevalence = data?.national.csewPrevalence;
  const femicides = data?.national.femicides;

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Domestic Abuse" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Domestic Abuse"
          question="How Many People Experience Domestic Abuse in Britain?"
          finding="2.1 million adults experienced domestic abuse in England and Wales in 2022/23 — 1.4 million women and 700,000 men. Police recorded 906,535 domestic abuse-related crimes. Conviction rates for domestic abuse are just 7.1%. Around 2 women are killed by a partner or ex-partner each week."
          colour="#E63946"
          preposition="with"
        />

        <section className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              An estimated 2.1 million adults experienced domestic abuse in England and Wales in 2022/23 — 1.4 million women and 700,000 men — yet the Crime Survey for England and Wales is itself an undercount. SafeLives estimates that only one in five incidents is ever reported to police, falling to one in six for the most serious forms. Police recorded 906,535 domestic abuse-related crimes in 2022/23, the fourth consecutive annual rise and up from 596,000 in 2014/15, though improved recording under the 2015 NPCC definition accounts for part of the increase. Domestic abuse now constitutes 38% of all violent crime. Roughly two women are killed by a current or former partner each week — about 103 per year. Coercive control, criminalised under the Serious Crime Act 2015, produces just a 4.9% conviction rate despite 24,000 offences recorded annually.
            </p>
            <p>
              The criminal justice response remains strikingly weak. The charge rate for domestic abuse offences stands at 7.1%, below the 8.5% rate for all recorded crime. Victims withdrawing support for prosecution accounts for 40% of no-further-action decisions; evidence-gathering in cases of non-physical abuse and CPS resource constraints compound the problem. Domestic homicide reviews, mandatory since 2011, repeatedly identify missed intervention opportunities across police, social services and healthcare. SafeLives' MARAC risk-assessment tool is now used by over 60% of police forces, routing high-risk cases to Multi-Agency Risk Assessment Conferences. But perpetrator programmes expose a 33-to-1 shortfall: roughly 6,000 places exist nationally against an estimated 200,000 or more high-risk perpetrators.
            </p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-recorded', label: 'Recorded Crime' },
          { id: 'sec-prevalence', label: 'Prevalence' },
          { id: 'sec-services', label: 'Support Services' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Adults experiencing domestic abuse (annual)"
              value={latestPrevalence ? latestPrevalence.latestMillions.toFixed(1) : '—'}
              unit="M"
              direction="flat"
              polarity="up-is-bad"
              changeText="2022/23 · 1.4M women, 700K men · Down from 2.4M peak (2016/17) · Under-reporting endemic"
              sparklineData={[2.4, 2.3, 2.2, 2.1, 2.1, 2.0, 2.0, 2.1]}
              source="ONS — Crime Survey for England and Wales"
              href="#sec-overview"/>
            <MetricCard
              label="Domestic abuse-related crimes recorded by police"
              value={latestRecorded ? latestRecorded.latestThousands.toLocaleString('en-GB') : '—'}
              unit="K"
              direction="up"
              polarity="up-is-bad"
              changeText="2022/23 · Up from 596K in 2014/15 · Better recording, not just rising incidents · Charge rate only 7.1%"
              sparklineData={[596, 663, 730, 800, 858, 880, 862, 870, 906]}
              source="ONS — Crime in England and Wales"
              href="#sec-recorded"/>
            <MetricCard
              label="Women killed by partner or ex-partner (annual)"
              value={femicides ? femicides.latestAnnualCount.toString() : '—'}
              direction="flat"
              polarity="up-is-bad"
              changeText="2022 · 2 per week · 60% of femicides · Often preceded by coercive control · DA = 38% of all homicides"
              sparklineData={[110, 105, 98, 102, 112, 100, 105, 103]}
              source="ONS — Homicide Index; Femicide Census"
              href="#sec-prevalence"/>
          </div>
        </ScrollReveal>

        {/* Recorded crime section */}
        <div id="sec-recorded">
          {recordedCrimesSeries.length > 0 ? (
            <LineChart
              title="Domestic abuse crimes recorded by police, 2014–2023"
              subtitle="Police-recorded domestic abuse-related crimes, England &amp; Wales. Rise partly reflects better recording, not only rising incidents."
              series={recordedCrimesSeries}
              annotations={recordedAnnotations}
              yLabel="Crimes recorded (thousands)"
              source={{
                name: 'ONS',
                dataset: 'Crime in England and Wales',
                frequency: 'annual',
              }}
            />
          ) : (
            <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
          )}
        </div>

        {/* Prevalence section */}
        <div id="sec-prevalence">
          {prevalenceSeries.length > 0 ? (
            <LineChart
              title="Adults experiencing domestic abuse (survey estimate), 2016–2023"
              subtitle="Crime Survey for England and Wales estimate of adults experiencing any domestic abuse in the past year."
              series={prevalenceSeries}
              yLabel="Adults (millions)"
              source={{
                name: 'ONS',
                dataset: 'Crime Survey for England and Wales',
                frequency: 'annual',
              }}
            />
          ) : (
            <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
          )}
        </div>

        {/* Support services section */}
        <div id="sec-services">
          {data && data.national.supportServices.length > 0 && (
            <div className="mb-12">
              <h3 className="text-lg font-bold text-wiah-black mb-1">Domestic abuse support capacity, England</h3>
              <p className="text-sm text-wiah-mid mb-4">
                Key support services available to victims in England (approximate capacity, 2023).
              </p>
              <div className="space-y-2 border-t border-b border-wiah-border">
                {data.national.supportServices.map(service => (
                  <div key={service.service} className="flex justify-between items-center py-2 px-0">
                    <span className="text-sm text-wiah-black">{service.service}</span>
                    <span className="font-mono text-sm font-bold text-wiah-dark">{service.capacity.toLocaleString('en-GB')}</span>
                  </div>
                ))}
              </div>
              <p className="font-mono text-[11px] text-wiah-mid mt-3">
                Source: ONS — Domestic Abuse in England and Wales; Refuge; National Domestic Abuse Helpline.
              </p>
            </div>
          )}
        </div>

        {/* Positive story */}
        <ScrollReveal>
          <PositiveCallout
            title="Legal protections"
            value="2021"
            unit="Domestic Abuse Act — the most significant reform in a generation"
            description="The Domestic Abuse Act 2021 created, for the first time, a statutory definition of domestic abuse encompassing physical, emotional, coercive, and economic abuse. It established a new domestic abuse commissioner role (Nicole Jacobs), made non-fatal strangulation a specific offence, and extended legal protections to children who witness abuse. The Domestic Abuse Protection Order (DAPO), piloted since 2021, combines an immediate prohibition with longer-term positive requirements on perpetrators. The Tackling Domestic Abuse Plan (2022) committed £230 million over three years. NICE guidance now recommends routine domestic abuse enquiry in health settings, recognising the NHS as a key point of disclosure."
            source="Source: ONS — Domestic Abuse in England and Wales 2023; Home Office — Tackling Domestic Abuse Plan 2022."
          />
        </ScrollReveal>

        {/* Sources */}
        <section className="border-t border-wiah-border pt-8">
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
          <p className="font-mono text-xs text-wiah-mid mt-4">
            {data?.metadata.methodology}
          </p>
          {data?.metadata.knownIssues && data.metadata.knownIssues.length > 0 && (
            <div className="mt-4">
              <p className="font-mono text-xs text-wiah-mid font-bold mb-1">Known issues:</p>
              <ul className="list-disc list-inside space-y-1 font-mono text-xs text-wiah-mid">
                {data.metadata.knownIssues.map((issue, i) => (
                  <li key={i}>{issue}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
