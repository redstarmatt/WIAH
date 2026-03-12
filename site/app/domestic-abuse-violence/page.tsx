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

interface PrevalencePoint {
  year: number;
  estimatedVictims: number;
  prevalencePercent: number;
  note?: string;
}

interface PoliceRecordedPoint {
  year: number;
  offences: number;
  note?: string;
}

interface ProsecutionRatePoint {
  year: number;
  chargeRate: number;
  convictionRate: number;
  note?: string;
}

interface DomesticAbuseData {
  prevalence: PrevalencePoint[];
  policeRecorded: PoliceRecordedPoint[];
  prosecutionRate: ProsecutionRatePoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function DomesticAbuseViolencePage() {
  const [data, setData] = useState<DomesticAbuseData | null>(null);

  useEffect(() => {
    fetch('/data/domestic-abuse-violence/domestic_abuse_violence.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const prevalenceSeries: Series[] = data
    ? [{
        id: 'prevalence',
        label: 'Estimated victims (millions)',
        colour: '#E63946',
        data: data.prevalence.map(d => ({
          date: yearToDate(d.year),
          value: d.estimatedVictims / 1000000,
        })),
      }]
    : [];

  const policeRecordedSeries: Series[] = data
    ? [{
        id: 'police-recorded',
        label: 'Police-recorded DA offences',
        colour: '#6B7280',
        data: data.policeRecorded.map(d => ({
          date: yearToDate(d.year),
          value: d.offences / 1000,
        })),
      }]
    : [];

  const prosecutionSeries: Series[] = data
    ? [{
        id: 'charge-rate',
        label: 'Charge rate (%)',
        colour: '#E63946',
        data: data.prosecutionRate.map(d => ({
          date: yearToDate(d.year),
          value: d.chargeRate,
        })),
      }]
    : [];

  const latestPrevalence = data?.prevalence[data.prevalence.length - 1];
  const covidPeak = data?.prevalence.find(d => d.year === 2021);
  const latestPolice = data?.policeRecorded[data.policeRecorded.length - 1];
  const earliestPolice = data?.policeRecorded[0];
  const latestProsecution = data?.prosecutionRate[data.prosecutionRate.length - 1];
  const earliestProsecution = data?.prosecutionRate[0];

  return (
    <>
      <TopicNav topic="Justice" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Justice"
          question="How much domestic abuse happens behind closed doors?"
          finding="An estimated 3.8 million people experience domestic abuse each year in England and Wales. Around 81% of incidents are never reported to police. Of those that are, fewer than 5% result in a charge. Refuge services turn away 64% of referrals due to lack of space."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Domestic abuse is the most widespread violent crime in England and Wales, yet it remains the least visible. The Crime Survey for England and Wales estimates that 3.8 million adults experienced some form of domestic abuse in the year to March 2024 — around 7.8% of the adult population. The true number is almost certainly higher: the survey excludes people living in refuges, hostels, and other institutions, and underreporting is endemic. An estimated 81% of victims never contact the police. Among those who do, the journey from report to justice is vanishingly narrow: just 4.9% of police-recorded domestic abuse offences resulted in a charge in 2023/24, down from 12.2% a decade earlier. The collapse in charge rates reflects systemic failures — overwhelmed police domestic abuse units, delays in digital evidence processing, and high victim withdrawal rates driven by fear, coercion, and loss of confidence in the system.</p>
            <p>The Domestic Abuse Act 2021 was a landmark piece of legislation. For the first time, it created a statutory definition of domestic abuse that includes coercive and controlling behaviour, economic abuse, and psychological manipulation — not just physical violence. It also established the office of the Domestic Abuse Commissioner, placed a duty on local authorities to provide support in safe accommodation, and banned the cross-examination of victims by their abusers in family courts. The recognition of coercive control, in particular, marked a fundamental shift in how the law understands abuse: not as isolated incidents, but as a sustained pattern of domination. However, implementation has been uneven. Many local authorities have struggled to meet their new duties without adequate ring-fenced funding, and refuge provision remains in crisis. Women's Aid reports that 64% of referrals to refuges are turned away, primarily due to a shortage of bed spaces. Specialist services for Black and minoritised women, disabled women, and LGBT+ survivors are especially scarce.</p>
            <p>The COVID-19 pandemic laid bare the scale of the crisis. Calls to the National Domestic Abuse Helpline surged 65% during the first lockdown. Killings of women and girls by men rose sharply. The enforced proximity of lockdown trapped victims with their abusers, with nowhere to go and reduced access to support. Children, too, are victims: an estimated 1 in 5 children in England have been exposed to domestic abuse. The long-term effects on child development, mental health, and educational attainment are well documented. The Ask for ANI scheme, launched in January 2021, allows victims to discreetly signal for help at participating pharmacies using a codeword — a practical innovation, but one that underscores how few safe exit routes exist. The fundamental challenge remains: domestic abuse is a crime of epidemic proportions that is met with a response designed for rare events. Until funding, policing, and court capacity match the scale of the problem, the gap between the abuse that happens and the justice that follows will continue to widen.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-prevalence', label: 'Prevalence' },
          { id: 'sec-police', label: 'Police-recorded' },
          { id: 'sec-prosecution', label: 'Prosecution rate' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="People experiencing domestic abuse"
            value={latestPrevalence ? `${(latestPrevalence.estimatedVictims / 1000000).toFixed(1)}M` : '3.8M'}
            unit="/yr"
            direction="flat"
            polarity="up-is-bad"
            changeText="7.8% of adult population · flat trend · survey likely undercounts"
            sparklineData={
              data ? sparkFrom(data.prevalence.map(d => d.estimatedVictims)) : []
            }
            source="ONS · Crime Survey for England and Wales, year to Mar 2024"
            href="#sec-prevalence"
          />
          <MetricCard
            label="Incidents never reported to police"
            value="81%"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText="Underreporting rate · consistent across survey years"
            sparklineData={[81, 82, 83, 82, 81, 80, 81, 82, 81, 81]}
            source="ONS · Crime Survey for England and Wales, 2024"
            href="#sec-police"
          />
          <MetricCard
            label="Refuge referrals turned away"
            value="64%"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Primarily due to lack of bed spaces · rising from 58% in 2020"
            sparklineData={[55, 56, 58, 59, 60, 58, 60, 62, 63, 64]}
            source="Women's Aid · Annual Audit, 2023/24"
            href="#sec-prosecution"
          />
        </div>

        {/* Chart 1: Prevalence */}
        <ScrollReveal>
          <div id="sec-prevalence" className="mb-12">
            <LineChart
              series={prevalenceSeries}
              title="Estimated adults experiencing domestic abuse, England & Wales, 2012–2024"
              subtitle="Millions of adults reporting domestic abuse in the preceding 12 months. COVID-19 lockdowns drove a sharp surge in 2020–21."
              yLabel="Victims (millions)"
              source={{
                name: 'ONS',
                dataset: 'Crime Survey for England and Wales — Domestic Abuse',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Police-recorded DA */}
        <ScrollReveal>
          <div id="sec-police" className="mb-12">
            <LineChart
              series={policeRecordedSeries}
              title="Police-recorded domestic abuse-related offences, England & Wales, 2012–2024"
              subtitle="Thousands of offences. Rising trend reflects improved recording practices, not necessarily more abuse."
              yLabel="Offences (thousands)"
              source={{
                name: 'ONS / Home Office',
                dataset: 'Police Recorded Crime — Domestic Abuse',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Prosecution rate */}
        <ScrollReveal>
          <div id="sec-prosecution" className="mb-12">
            <LineChart
              series={prosecutionSeries}
              title="Domestic abuse charge rate, England & Wales, 2012–2024"
              subtitle="Percentage of police-recorded DA offences resulting in a charge. Halved over a decade."
              yLabel="Charge rate (%)"
              source={{
                name: 'CPS / Home Office',
                dataset: 'Crime Outcomes in England and Wales',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Domestic Abuse Act 2021 and Ask for ANI"
            value="Landmark reform"
            description="The Domestic Abuse Act 2021 created the first statutory definition of domestic abuse, recognising coercive control, economic abuse, and psychological manipulation alongside physical violence. It established the Domestic Abuse Commissioner, placed duties on local authorities to fund safe accommodation, and banned perpetrators from cross-examining victims in family courts. The Ask for ANI (Action Needed Immediately) scheme, launched in January 2021, enables victims to use a codeword at over 6,000 participating pharmacies to discreetly access support and contact police. These reforms represent the most significant legislative advance in domestic abuse protection in a generation — though implementation and funding remain critical challenges."
            source="Source: Home Office — Domestic Abuse Act 2021. Ask for ANI — Home Office / Hestia, 2021–present."
          />
        </ScrollReveal>
        <RelatedTopics />
      </main>
    </>
  );
}
