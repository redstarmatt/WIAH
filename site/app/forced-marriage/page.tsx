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

interface FmuCasePoint {
  year: number;
  cases: number;
}

interface Under18Point {
  year: number;
  percent: number;
}

interface ProtectionOrderPoint {
  year: number;
  orders: number;
}

interface FocusCountry {
  country: string;
  percent: number;
}

interface ForcedMarriageData {
  fmuCases: FmuCasePoint[];
  under18Proportion: Under18Point[];
  protectionOrders: ProtectionOrderPoint[];
  focusCountries: FocusCountry[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ForcedMarriagePage() {
  const [data, setData] = useState<ForcedMarriageData | null>(null);

  useEffect(() => {
    fetch('/data/forced-marriage/forced_marriage.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const fmuCaseSeries: Series[] = data
    ? [{
        id: 'fmu-cases',
        label: 'FMU cases (annual)',
        colour: '#6B7280',
        data: data.fmuCases.map(d => ({
          date: yearToDate(d.year),
          value: d.cases,
        })),
      }]
    : [];

  const under18Series: Series[] = data
    ? [{
        id: 'under-18',
        label: 'Under-18s (% of cases)',
        colour: '#E63946',
        data: data.under18Proportion.map(d => ({
          date: yearToDate(d.year),
          value: d.percent,
        })),
      }]
    : [];

  const protectionOrderSeries: Series[] = data
    ? [{
        id: 'fmpos',
        label: 'Forced Marriage Protection Orders granted',
        colour: '#264653',
        data: data.protectionOrders.map(d => ({
          date: yearToDate(d.year),
          value: d.orders,
        })),
      }]
    : [];

  const caseAnnotations: Annotation[] = [
    { date: new Date(2014, 6, 1), label: '2014: Forced marriage criminalised' },
    { date: new Date(2020, 3, 1), label: '2020: COVID lockdowns' },
  ];

  const under18Annotations: Annotation[] = [
    { date: new Date(2014, 6, 1), label: '2014: Criminalised' },
  ];

  const fmpoAnnotations: Annotation[] = [
    { date: new Date(2014, 0, 1), label: '2014: FMPOs strengthened' },
    { date: new Date(2020, 3, 1), label: '2020: COVID' },
  ];

  // ── Derived values ────────────────────────────────────────────────────

  const latestCases = data?.fmuCases[data.fmuCases.length - 1];
  const prePandemicCases = data?.fmuCases.find(d => d.year === 2019);
  const latestUnder18 = data?.under18Proportion[data.under18Proportion.length - 1];
  const peakUnder18 = data?.under18Proportion.reduce((a, b) => a.percent > b.percent ? a : b);
  const latestFmpo = data?.protectionOrders[data.protectionOrders.length - 1];
  const prevFmpo = data?.protectionOrders[data.protectionOrders.length - 2];

  const fmpoChange = latestFmpo && prevFmpo
    ? Math.round(((latestFmpo.orders - prevFmpo.orders) / prevFmpo.orders) * 100)
    : 28;

  return (
    <>
      <TopicNav topic="Forced Marriage" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Forced Marriage"
          question="How Many People Are Forced Into Marriage in Britain?"
          finding="The Forced Marriage Unit handled 2,068 cases in 2023 — a record high. One in four involved children under 18. Experts believe the true figure is many times higher, as most cases go unreported."
          colour="#6B7280"
          preposition="with"
        />

        {/* Editorial context */}
        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Forced marriage was criminalised in England and Wales in 2014, carrying a maximum sentence of seven years. A decade on, the Forced Marriage Unit — jointly run by the Home Office and FCDO — handled 2,068 cases in 2023, the highest number since records began. That figure rose 113% from the post-lockdown low of 971 in 2022 and surpassed the previous peak of 1,764 in 2018. The sharp dip during 2020 and 2021 does not indicate that fewer forced marriages took place: lockdowns removed victims from schools, GPs, and other professionals who might have noticed warning signs and made referrals. Many in the sector believe the pandemic created a hidden backlog of cases that are only now surfacing.
            </p>
            <p>
              Pakistan remains the most frequently reported focus country, linked to 44% of cases, followed by Bangladesh (9%), Somalia (5%), and India (4%). However, 16% of cases are now classed as entirely domestic — involving no overseas element — a proportion that has grown steadily, suggesting improved awareness that forced marriage is not exclusively a transnational issue. Victims are overwhelmingly female (around 80%), but male victims are increasingly represented, accounting for roughly one in five cases. The proportion of under-18s has gradually declined from 35% in 2011 to 25% in 2023, partly reflecting better safeguarding in schools and new statutory guidance. Eleven reported cases in 2023 involved children under 16.
            </p>
            <p>
              The courts granted 203 Forced Marriage Protection Orders in 2023 — also a record, and up from just 62 in 2014 when the legal framework was introduced. FMPOs give victims a civil route to protection without requiring a criminal prosecution, which many victims are reluctant to pursue against family members. The rise in both FMU referrals and protection orders likely reflects growing awareness and improved pathways for disclosure, not necessarily an increase in the underlying behaviour. Charities such as Karma Nirvana, which operates the national forced marriage helpline, report that calls have risen consistently year-on-year. What remains unknown — and perhaps unknowable — is the true scale: academic estimates have suggested 5,000 to 8,000 cases per year in the UK, meaning the FMU data captures perhaps only a quarter of the real picture.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-cases', label: 'FMU cases' },
          { id: 'sec-under18', label: 'Under-18s' },
          { id: 'sec-fmpos', label: 'Protection orders' },
          { id: 'sec-countries', label: 'Focus countries' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="FMU cases handled (annual)"
            value={latestCases ? latestCases.cases.toLocaleString() : '2,068'}
            unit="2023"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestCases && prePandemicCases
                ? `Record high · +${Math.round(((latestCases.cases - prePandemicCases.cases) / prePandemicCases.cases) * 100)}% vs 2019 · COVID dip then surge`
                : 'Record high · +53% vs 2019 · COVID dip then surge'
            }
            sparklineData={
              data ? sparkFrom(data.fmuCases.map(d => d.cases)) : []
            }
            source="FCDO Forced Marriage Unit, 2023"
            href="#sec-cases"
          />
          <MetricCard
            label="Under-18s (% of cases)"
            value={latestUnder18 ? `${latestUnder18.percent}%` : '25%'}
            unit="2023"
            direction="down"
            polarity="up-is-bad"
            changeText={
              latestUnder18 && peakUnder18
                ? `Down from ${peakUnder18.percent}% in ${peakUnder18.year} · 11 cases involved under-16s`
                : 'Down from 35% in 2011 · 11 cases involved under-16s'
            }
            sparklineData={
              data ? data.under18Proportion.map(d => d.percent) : []
            }
            source="FCDO Forced Marriage Unit, 2023"
            href="#sec-under18"
          />
          <MetricCard
            label="Forced Marriage Protection Orders"
            value={latestFmpo ? latestFmpo.orders.toLocaleString() : '203'}
            unit="2023"
            direction="up"
            polarity="up-is-good"
            changeText={
              `+${fmpoChange}% year-on-year · record high · up from 62 in 2014`
            }
            sparklineData={
              data ? data.protectionOrders.map(d => d.orders) : []
            }
            source="Ministry of Justice, Family Court Statistics, 2023"
            href="#sec-fmpos"
          />
        </div>

        {/* Chart 1: FMU cases over time */}
        <ScrollReveal>
          <div id="sec-cases" className="mb-12">
            <LineChart
              series={fmuCaseSeries}
              annotations={caseAnnotations}
              title="Forced Marriage Unit cases handled, UK, 2011-2023"
              subtitle="Annual cases where the FMU provided advice or support. COVID lockdowns suppressed reporting in 2020-21."
              yLabel="Cases"
              source={{
                name: 'FCDO Forced Marriage Unit',
                dataset: 'Forced Marriage Unit Statistics',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/collections/forced-marriage-unit-statistics',
                date: 'Nov 2024',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Under-18 proportion */}
        <ScrollReveal>
          <div id="sec-under18" className="mb-12">
            <LineChart
              series={under18Series}
              annotations={under18Annotations}
              title="Under-18s as a proportion of FMU cases, 2011-2023"
              subtitle="Gradual decline from 35% to 25%, reflecting improved school safeguarding and statutory guidance."
              yLabel="% of cases"
              source={{
                name: 'FCDO Forced Marriage Unit',
                dataset: 'Forced Marriage Unit Statistics — age breakdown',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/collections/forced-marriage-unit-statistics',
                date: 'Nov 2024',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Forced Marriage Protection Orders */}
        <ScrollReveal>
          <div id="sec-fmpos" className="mb-12">
            <LineChart
              series={protectionOrderSeries}
              annotations={fmpoAnnotations}
              title="Forced Marriage Protection Orders granted, England & Wales, 2014-2023"
              subtitle="Civil protection orders giving victims a non-criminal route to safety. Record 203 granted in 2023."
              yLabel="Orders"
              source={{
                name: 'Ministry of Justice',
                dataset: 'Family Court Statistics Quarterly',
                frequency: 'quarterly',
                url: 'https://www.gov.uk/government/collections/family-court-statistics-quarterly',
                date: 'Nov 2024',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Focus countries bar chart */}
        <ScrollReveal>
          <div id="sec-countries" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Focus countries in FMU cases, 2023 (% of total)
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                The country where the forced marriage was due to take place, or where the victim was taken. 16% of cases are now entirely domestic.
              </p>
              <div className="mt-6 space-y-4">
                {data?.focusCountries.map((c) => {
                  const pct = (c.percent / 50) * 100;
                  return (
                    <div key={c.country}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{c.country}</span>
                        <span className="font-mono text-sm font-bold text-wiah-black">{c.percent}%</span>
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
                Source: FCDO Forced Marriage Unit Statistics, 2023
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Protection orders reaching record levels"
            value="203"
            unit="FMPOs in 2023"
            description="Forced Marriage Protection Orders — introduced in 2008 and strengthened in 2014 when breach became a criminal offence — provide victims with a civil route to safety without requiring them to support a criminal prosecution against their own family. The record 203 orders granted in 2023 represent a threefold increase since the legal framework was introduced. Charities report that growing awareness of FMPOs among schools, social workers, and GPs is driving the increase. The Karma Nirvana helpline, which supports victims of forced marriage and honour-based abuse, received over 10,000 calls in 2023. While the true scale of forced marriage remains far larger than any official figure captures, the rising use of legal protections suggests that more victims are finding pathways to help."
            source="Source: Ministry of Justice — Family Court Statistics Quarterly, 2023. Karma Nirvana annual report, 2023."
          />
        </ScrollReveal>

        {/* Sources & Methodology */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p>
              <a href="https://www.gov.uk/government/collections/forced-marriage-unit-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                FCDO Forced Marriage Unit Statistics
              </a> — primary data source for FMU cases and demographic breakdowns. Retrieved November 2024.
            </p>
            <p>
              <a href="https://www.gov.uk/government/collections/family-court-statistics-quarterly" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                Ministry of Justice, Family Court Statistics Quarterly
              </a> — Forced Marriage Protection Order data. Retrieved November 2024.
            </p>
            <p>
              FMU figures capture only cases where victims or professionals contacted the unit. True prevalence is estimated at 5,000-8,000 cases per year (Kazimirski et al., 2009). COVID-19 lockdowns suppressed reporting in 2020-21, creating an artificial dip that does not reflect actual incidence. Methodology for counting cases changed slightly in 2018 — minor discontinuity. All figures are for the UK unless otherwise stated.
            </p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
