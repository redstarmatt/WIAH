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

// ── Types ────────────────────────────────────────────────────────────────────

interface RecordedCrimePoint {
  year: number;
  offences: number;
}

interface ProtectionOrderPoint {
  year: number;
  orders: number;
}

interface ProsecutionPoint {
  year: number;
  count: number;
}

interface ForcedMarriagePoint {
  year: number;
  referrals: number;
}

interface ForceData {
  force: string;
  offencesPerMillion: number;
}

interface HBAData {
  recordedCrimes: RecordedCrimePoint[];
  protectionOrders: ProtectionOrderPoint[];
  prosecutions: ProsecutionPoint[];
  forcedMarriageReferrals: ForcedMarriagePoint[];
  byPoliceForce: ForceData[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

const editorialRefs: Reference[] = [
  { num: 1, name: 'Home Office', dataset: 'Honour Based Abuse Statistics', url: 'https://www.gov.uk/government/collections/honour-based-abuse-and-forced-marriage-data', date: 'Feb 2026' },
  { num: 2, name: 'Crown Prosecution Service', dataset: 'Violence Against Women and Girls Report', url: 'https://www.cps.gov.uk/publication/violence-against-women-and-girls', date: 'Feb 2026' },
  { num: 3, name: 'Forced Marriage Unit', dataset: 'Referral Statistics', url: 'https://www.gov.uk/government/collections/forced-marriage-unit-statistics', date: 'Feb 2026' },
  { num: 4, name: 'Ministry of Justice', dataset: 'Family Court Statistics Quarterly — FMPO Data', url: 'https://www.gov.uk/government/collections/family-court-statistics-quarterly', date: 'Feb 2026' },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function HonourBasedAbusePage() {
  const [data, setData] = useState<HBAData | null>(null);

  useEffect(() => {
    fetch('/data/honour-based-abuse/honour_based_abuse.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const recordedCrimeSeries: Series[] = data
    ? [{
        id: 'recorded-crimes',
        label: 'HBA offences recorded',
        colour: '#6B7280',
        data: data.recordedCrimes.map(d => ({
          date: yearToDate(d.year),
          value: d.offences,
        })),
      }]
    : [];

  const prosecutionSeries: Series[] = data
    ? [{
        id: 'prosecutions',
        label: 'CPS prosecutions (HBA-flagged)',
        colour: '#E63946',
        data: data.prosecutions.map(d => ({
          date: yearToDate(d.year),
          value: d.count,
        })),
      }]
    : [];

  const protectionOrderSeries: Series[] = data
    ? [{
        id: 'protection-orders',
        label: 'Forced Marriage Protection Orders granted',
        colour: '#2A9D8F',
        data: data.protectionOrders.map(d => ({
          date: yearToDate(d.year),
          value: d.orders,
        })),
      }]
    : [];

  // ── Derived values ────────────────────────────────────────────────────

  const latestCrimes = data?.recordedCrimes[data.recordedCrimes.length - 1];
  const peakCrimes = data?.recordedCrimes.reduce((a, b) => a.offences > b.offences ? a : b);
  const firstCrimes = data?.recordedCrimes[0];
  const latestProsecutions = data?.prosecutions[data.prosecutions.length - 1];
  const latestOrders = data?.protectionOrders[data.protectionOrders.length - 1];
  const firstOrders = data?.protectionOrders[0];

  const crimeChangePercent = latestCrimes && firstCrimes
    ? Math.round(((latestCrimes.offences - firstCrimes.offences) / firstCrimes.offences) * 100)
    : 69;

  const ordersChangePercent = latestOrders && firstOrders
    ? Math.round(((latestOrders.orders - firstOrders.orders) / firstOrders.orders) * 100)
    : 178;

  const crimeAnnotations: Annotation[] = [
    { date: new Date(2019, 0, 1), label: '2019: HBA flagging standardised' },
    { date: new Date(2020, 2, 1), label: '2020: COVID-19 lockdowns' },
  ];

  const prosecutionAnnotations: Annotation[] = [
    { date: new Date(2020, 2, 1), label: '2020: Court closures' },
  ];

  const orderAnnotations: Annotation[] = [
    { date: new Date(2017, 5, 1), label: '2017: FMPO breach criminalised' },
  ];

  return (
    <>
      <TopicNav topic="Honour-Based Abuse" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Honour-Based Abuse"
          question="How Common Is Honour-Based Abuse in Britain?"
          finding="Recorded honour-based abuse offences have risen 69% since 2016, driven by better police identification alongside a real increase in reporting. Yet prosecutions remain stubbornly flat, and the gap between recorded crime and criminal justice outcomes is widening."
          colour="#6B7280"
          preposition="with"
        />

        {/* Editorial context */}
        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Honour-based abuse encompasses a range of behaviours including physical violence, coercive control, forced marriage, female genital mutilation, and murder committed to protect or restore perceived family or community honour. The Home Office began systematically collecting police-recorded data in 2016, and the upward trend since then reflects both improved awareness among police forces and a genuine increase in victims feeling able to come forward.<Cite nums={1} /> The Metropolitan Police alone accounts for roughly a third of all recorded offences, partly because of its dedicated Honour Based Abuse command, but also because London is home to large communities where these practices have historically been prevalent.<Cite nums={1} />
            </p>
            <p>
              The prosecution picture is far more troubling. Despite nearly 3,700 offences recorded in the most recent year, the Crown Prosecution Service secured just 72 prosecutions flagged as honour-based abuse in the same period.<Cite nums={2} /> That is a prosecution rate of under 2%. The reasons are structural: victims face intense family and community pressure to withdraw statements, cases often involve complex multi-perpetrator dynamics that are difficult to prosecute, and many offences are charged under general assault or coercive control statutes without the HBA flag, meaning the true prosecution figure is higher than headline numbers suggest but still wholly inadequate. The Forced Marriage Unit, a joint Home Office and Foreign Office operation, handled over 1,100 referrals in 2024, though this too is widely acknowledged to represent only a fraction of actual forced marriages.<Cite nums={3} />
            </p>
            <p>
              There are grounds for cautious optimism. Forced Marriage Protection Orders have risen sharply, from 68 in 2016 to 189 in 2024, reflecting both greater judicial willingness to intervene and better pathways for victims to access civil remedies.<Cite nums={4} /> Specialist organisations like Karma Nirvana, the Iranian and Kurdish Women's Rights Organisation, and Southall Black Sisters report growing demand for their services, which, while indicating the scale of the problem, also shows that more people know where to turn. The Domestic Abuse Act 2021 placed coercive control within a statutory framework that better captures the dynamics of honour-based abuse. But without sustained investment in specialist police units, culturally competent support services, and community-led prevention programmes, recording improvements alone will not translate into safety for victims.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-recorded', label: 'Recorded crimes' },
          { id: 'sec-prosecutions', label: 'Prosecutions' },
          { id: 'sec-orders', label: 'Protection orders' },
          { id: 'sec-regional', label: 'By force area' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="HBA offences recorded"
            value={latestCrimes ? latestCrimes.offences.toLocaleString() : '3,652'}
            unit="2024"
            direction="up"
            polarity="up-is-bad"
            changeText={`+${crimeChangePercent}% since 2016 · improved recording + real increase`}
            sparklineData={
              data ? sparkFrom(data.recordedCrimes.map(d => d.offences)) : []
            }
            source="Home Office — Honour Based Abuse Statistics, 2024"
            href="#sec-recorded"
          />
          <MetricCard
            label="CPS prosecutions (HBA-flagged)"
            value={latestProsecutions ? latestProsecutions.count.toLocaleString() : '72'}
            unit="2024"
            direction="flat"
            polarity="up-is-good"
            changeText="under 2% prosecution rate · structural barriers to justice"
            sparklineData={
              data ? sparkFrom(data.prosecutions.map(d => d.count)) : []
            }
            source="CPS — VAWG Report, 2024"
            href="#sec-prosecutions"
          />
          <MetricCard
            label="Forced Marriage Protection Orders"
            value={latestOrders ? latestOrders.orders.toLocaleString() : '189'}
            unit="2024"
            direction="up"
            polarity="up-is-good"
            changeText={`+${ordersChangePercent}% since 2016 · growing judicial intervention`}
            sparklineData={
              data ? sparkFrom(data.protectionOrders.map(d => d.orders)) : []
            }
            source="Ministry of Justice — Family Court Statistics, 2024"
            href="#sec-orders"
          />
        </div>

        {/* Chart 1: Recorded crimes */}
        <ScrollReveal>
          <div id="sec-recorded" className="mb-12">
            <LineChart
              series={recordedCrimeSeries}
              annotations={crimeAnnotations}
              title="Police-recorded honour-based abuse offences, England & Wales, 2016–2024"
              subtitle="Annual offences flagged as honour-based by police forces. Recording practices standardised from 2019."
              yLabel="Offences"
              source={{
                name: 'Home Office',
                dataset: 'Honour Based Abuse Statistics',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/collections/honour-based-abuse-and-forced-marriage-data',
                date: 'Feb 2026',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Prosecutions */}
        <ScrollReveal>
          <div id="sec-prosecutions" className="mb-12">
            <LineChart
              series={prosecutionSeries}
              annotations={prosecutionAnnotations}
              title="CPS prosecutions flagged as honour-based abuse, 2016–2024"
              subtitle="Prosecutions remain flat despite rising recorded crime. Many HBA cases are charged under general statutes without the flag."
              yLabel="Prosecutions"
              source={{
                name: 'Crown Prosecution Service',
                dataset: 'Violence Against Women and Girls Report',
                frequency: 'annual',
                url: 'https://www.cps.gov.uk/publication/violence-against-women-and-girls',
                date: 'Feb 2026',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Protection orders */}
        <ScrollReveal>
          <div id="sec-orders" className="mb-12">
            <LineChart
              series={protectionOrderSeries}
              annotations={orderAnnotations}
              title="Forced Marriage Protection Orders granted, England & Wales, 2016–2024"
              subtitle="Civil protection orders have risen sharply, reflecting improved access to judicial intervention."
              yLabel="Orders granted"
              source={{
                name: 'Ministry of Justice',
                dataset: 'Family Court Statistics Quarterly',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/collections/family-court-statistics-quarterly',
                date: 'Feb 2026',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Regional breakdown */}
        <ScrollReveal>
          <div id="sec-regional" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                HBA offence rate by police force area (offences per million people)
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                Variation reflects both true prevalence and differences in police identification and flagging practices.
              </p>
              <div className="mt-6 space-y-4">
                {data?.byPoliceForce.map((r) => {
                  const pct = (r.offencesPerMillion / 160) * 100;
                  return (
                    <div key={r.force}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{r.force}</span>
                        <span className="font-mono text-sm font-bold text-wiah-black">{r.offencesPerMillion}</span>
                      </div>
                      <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{ width: `${pct}%`, backgroundColor: '#6B7280' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">
                Source: Home Office — Honour Based Abuse Statistics by Police Force Area, 2024
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Protection orders are working"
            value="189"
            unit="FMPOs granted in 2024"
            description="Forced Marriage Protection Orders have nearly tripled since 2016, from 68 to 189 per year. These civil orders provide immediate protection for victims by prohibiting named individuals from facilitating a forced marriage or taking the victim abroad. Since 2017, breaching an FMPO has been a criminal offence carrying up to five years' imprisonment. Specialist organisations report that the availability of FMPOs has become a critical early intervention tool, often preventing harm before it escalates to criminal proceedings. Courts are granting orders more readily, and awareness among schools, health professionals, and social workers has improved referral pathways significantly."
            source="Source: Ministry of Justice — Family Court Statistics Quarterly, 2024. Home Office — Forced Marriage Unit Statistics, 2024."
          />
        </ScrollReveal>

        {/* Sources & Methodology */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p>
              <a href="https://www.gov.uk/government/collections/honour-based-abuse-and-forced-marriage-data" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Home Office</a> — Honour Based Abuse Statistics, police-recorded offences flagged as HBA. Retrieved Feb 2026.
            </p>
            <p>
              <a href="https://www.cps.gov.uk/publication/violence-against-women-and-girls" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Crown Prosecution Service</a> — Violence Against Women and Girls Report, HBA-flagged prosecutions. Retrieved Feb 2026.
            </p>
            <p>
              <a href="https://www.gov.uk/government/collections/forced-marriage-unit-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Forced Marriage Unit</a> — Joint Home Office/FCDO unit referral statistics. Retrieved Feb 2026.
            </p>
            <p>
              <a href="https://www.gov.uk/government/collections/family-court-statistics-quarterly" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Ministry of Justice</a> — Family Court Statistics Quarterly, FMPO data. Retrieved Feb 2026.
            </p>
            <p className="mt-4">
              All figures are for England and Wales unless otherwise stated. Recorded crime data depends on police flagging practices, which vary between forces and have improved over time. Under-reporting is significant; estimates suggest recorded figures represent 5-15% of actual prevalence. COVID-19 lockdowns in 2020 suppressed reporting. HBA flagging methodology was standardised in 2019, affecting pre/post comparability.
            </p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
