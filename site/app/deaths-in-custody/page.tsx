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

interface PrisonDeathPoint {
  year: number;
  deaths: number;
}

interface SelfInflictedPoint {
  year: number;
  deaths: number;
}

interface PoliceContactDeathPoint {
  year: number;
  deaths: number;
}

interface SelfHarmPoint {
  year: number;
  incidents: number;
}

interface DeathsInCustodyData {
  prisonDeaths: PrisonDeathPoint[];
  selfInflicted: SelfInflictedPoint[];
  policeContactDeaths: PoliceContactDeathPoint[];
  selfHarmIncidents: SelfHarmPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function DeathsInCustodyPage() {
  const [data, setData] = useState<DeathsInCustodyData | null>(null);

  useEffect(() => {
    fetch('/data/deaths-in-custody/deaths_in_custody.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const prisonDeathsSeries: Series[] = data
    ? [
        {
          id: 'prison-deaths',
          label: 'Total deaths in prison custody',
          colour: '#6B7280',
          data: data.prisonDeaths.map(d => ({
            date: yearToDate(d.year),
            value: d.deaths,
          })),
        },
        {
          id: 'self-inflicted',
          label: 'Self-inflicted deaths',
          colour: '#E63946',
          data: data.selfInflicted.map(d => ({
            date: yearToDate(d.year),
            value: d.deaths,
          })),
        },
      ]
    : [];

  const policeContactSeries: Series[] = data
    ? [{
        id: 'police-contact',
        label: 'Deaths following police contact',
        colour: '#6B7280',
        data: data.policeContactDeaths.map(d => ({
          date: yearToDate(d.year),
          value: d.deaths,
        })),
      }]
    : [];

  const selfHarmSeries: Series[] = data
    ? [{
        id: 'self-harm',
        label: 'Self-harm incidents in prison',
        colour: '#E63946',
        data: data.selfHarmIncidents.map(d => ({
          date: yearToDate(d.year),
          value: d.incidents,
        })),
      }]
    : [];

  // ── Derived metrics ─────────────────────────────────────────────────────

  const latestPrison = data?.prisonDeaths[data.prisonDeaths.length - 1];
  const prevPrison = data?.prisonDeaths[data.prisonDeaths.length - 2];
  const earliestPrison = data?.prisonDeaths[0];

  const latestPolice = data?.policeContactDeaths[data.policeContactDeaths.length - 1];
  const prevPolice = data?.policeContactDeaths[data.policeContactDeaths.length - 2];
  const earliestPolice = data?.policeContactDeaths[0];

  const latestSelfHarm = data?.selfHarmIncidents[data.selfHarmIncidents.length - 1];
  const prevSelfHarm = data?.selfHarmIncidents[data.selfHarmIncidents.length - 2];
  const earliestSelfHarm = data?.selfHarmIncidents[0];

  const prisonChange = latestPrison && prevPrison
    ? Math.round(((latestPrison.deaths - prevPrison.deaths) / prevPrison.deaths) * 100)
    : 3;

  const selfHarmChange = latestSelfHarm && earliestSelfHarm
    ? Math.round(((latestSelfHarm.incidents - earliestSelfHarm.incidents) / earliestSelfHarm.incidents) * 100)
    : 156;

  // ── Annotations ─────────────────────────────────────────────────────────

  const prisonAnnotations: Annotation[] = [
    { date: new Date(2016, 0, 1), label: '2016: record 354 deaths' },
    { date: new Date(2020, 0, 1), label: '2020: COVID regime restrictions' },
  ];

  const policeAnnotations: Annotation[] = [
    { date: new Date(2017, 0, 1), label: '2017: IOPC methodology revised' },
  ];

  const selfHarmAnnotations: Annotation[] = [
    { date: new Date(2015, 0, 1), label: '2015: prison population pressures intensify' },
    { date: new Date(2020, 0, 1), label: '2020: COVID lockdown in prisons' },
  ];

  return (
    <>
      <TopicNav topic="Deaths in Custody" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Deaths in Custody"
          question="How Many People Die in State Custody?"
          finding="321 people died in prison custody in England and Wales in 2024 — near the record. Self-harm incidents have risen 156% since 2010. Deaths following police contact reached 65. Behind every number is a person who died while the state was responsible for their safety."
          colour="#6B7280"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              When someone is held in custody -- whether in a prison cell or a police station -- the
              state has an absolute duty to keep them alive. That duty is being failed at scale. In
              2024, 321 people died in prison custody in England and Wales, the second-highest
              annual total ever recorded, just below the 354 who died in 2016. Self-inflicted deaths
              accounted for 84 of those, though the true toll of despair is better measured by the
              self-harm figures: 69,012 recorded incidents in 2024, a 156% increase from 2010. That
              means roughly 190 acts of self-harm every single day across the prison estate. Deaths
              following police contact -- recorded by the Independent Office for Police Conduct --
              reached 65, continuing a steady upward trend from 40 in 2010.
            </p>
            <p>
              The drivers are structural and well documented. Prison overcrowding has pushed the
              population past 87,000, against a certified capacity designed for far fewer. Staff
              shortages mean fewer experienced officers are available to recognise vulnerability,
              intervene during mental health crises, or maintain the basic human contact that
              prevents isolation from becoming lethal. The Prisons and Probation Ombudsman has
              repeatedly found the same failures in fatal incident investigations: missed ACCT
              (Assessment, Care in Custody and Teamwork) reviews, inadequate mental health
              screening on reception, and cell-sharing risk assessments that exist on paper but not
              in practice. The introduction of psychoactive substances, particularly synthetic
              cannabinoids, has created acute medical emergencies that prison healthcare is not
              resourced to manage.
            </p>
            <p>
              There are interventions that work. The Samaritans&apos; Listener scheme, which trains
              prisoners to provide peer support, operates in most prisons and has been credited
              with preventing deaths. The introduction of in-cell telephony has reduced isolation.
              Where prisons have implemented trauma-informed approaches -- treating the underlying
              causes of distress rather than simply managing behaviour -- self-harm rates have
              fallen. But these successes are localised and depend on leadership that is constantly
              rotating. Until the systemic pressures of overcrowding, understaffing, and
              inadequate mental health provision are addressed, individual initiatives cannot
              overcome the conditions that make custody dangerous. Every death in state custody is
              investigated, but the pattern they reveal has not yet produced the systemic response
              it demands.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-prison-deaths', label: 'Prison deaths' },
          { id: 'sec-police-contact', label: 'Police contact' },
          { id: 'sec-self-harm', label: 'Self-harm' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Deaths in prison custody"
            value={latestPrison ? latestPrison.deaths.toLocaleString() : '321'}
            unit="2024"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestPrison && earliestPrison
                ? `+${prisonChange}% year-on-year · up ${Math.round(((latestPrison.deaths - earliestPrison.deaths) / earliestPrison.deaths) * 100)}% since ${earliestPrison.year}`
                : '+3% year-on-year · up 62% since 2010'
            }
            sparklineData={
              data ? sparkFrom(data.prisonDeaths.map(d => d.deaths)) : []
            }
            source="MoJ — Safety in Custody Statistics, 2024"
            href="#sec-prison-deaths"
          />
          <MetricCard
            label="Deaths following police contact"
            value={latestPolice ? latestPolice.deaths.toLocaleString() : '65'}
            unit="2024"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestPolice && earliestPolice
                ? `Up from ${earliestPolice.deaths} in ${earliestPolice.year} · +${Math.round(((latestPolice.deaths - earliestPolice.deaths) / earliestPolice.deaths) * 100)}% over period`
                : 'Up from 40 in 2010 · +63% over period'
            }
            sparklineData={
              data ? sparkFrom(data.policeContactDeaths.map(d => d.deaths)) : []
            }
            source="IOPC — Annual Deaths Statistics, 2024"
            href="#sec-police-contact"
          />
          <MetricCard
            label="Self-harm incidents in prison"
            value={latestSelfHarm ? latestSelfHarm.incidents.toLocaleString() : '69,012'}
            unit="2024"
            direction="up"
            polarity="up-is-bad"
            changeText={`+${selfHarmChange}% since 2010 · ~190 incidents per day`}
            sparklineData={
              data ? sparkFrom(data.selfHarmIncidents.map(d => d.incidents)) : []
            }
            source="MoJ — Safety in Custody Statistics, 2024"
            href="#sec-self-harm"
          />
        </div>

        {/* Chart 1: Deaths in prison custody */}
        <ScrollReveal>
          <div id="sec-prison-deaths" className="mb-12">
            <LineChart
              series={prisonDeathsSeries}
              annotations={prisonAnnotations}
              title="Deaths in prison custody, England & Wales, 2010–2024"
              subtitle="Total deaths and self-inflicted deaths. Includes natural causes, self-inflicted, and homicide."
              yLabel="Deaths"
              source={{
                name: 'Ministry of Justice',
                dataset: 'Safety in Custody quarterly statistics',
                frequency: 'quarterly',
                url: 'https://www.gov.uk/government/collections/safety-in-custody-statistics',
                date: 'Nov 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Deaths following police contact */}
        <ScrollReveal>
          <div id="sec-police-contact" className="mb-12">
            <LineChart
              series={policeContactSeries}
              annotations={policeAnnotations}
              title="Deaths following police contact, England & Wales, 2010–2024"
              subtitle="Includes deaths in or following police custody, pursuit-related deaths, and other contact deaths."
              yLabel="Deaths"
              source={{
                name: 'Independent Office for Police Conduct (IOPC)',
                dataset: 'Deaths during or following police contact',
                frequency: 'annual',
                url: 'https://www.policeconduct.gov.uk/research-and-learning/statistics/annual-deaths-during-or-following-police-contact-statistics',
                date: 'Nov 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Self-harm incidents */}
        <ScrollReveal>
          <div id="sec-self-harm" className="mb-12">
            <LineChart
              series={selfHarmSeries}
              annotations={selfHarmAnnotations}
              title="Recorded self-harm incidents in prison, England & Wales, 2010–2024"
              subtitle="Individual incidents, not individuals. One person may account for multiple episodes."
              yLabel="Incidents"
              source={{
                name: 'Ministry of Justice',
                dataset: 'Safety in Custody quarterly statistics',
                frequency: 'quarterly',
                url: 'https://www.gov.uk/government/collections/safety-in-custody-statistics',
                date: 'Nov 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Peer support and trauma-informed approaches reduce self-harm"
            value="Listener scheme"
            description="The Samaritans' Listener scheme trains serving prisoners to provide confidential emotional support to fellow inmates. Operating in the majority of prisons across England and Wales, the scheme provides a critical safety net during nights and weekends when professional support is unavailable. Prisons that have implemented trauma-informed approaches — addressing the underlying causes of distress rather than simply managing behaviour — have seen measurable reductions in self-harm. The introduction of in-cell telephony has also reduced isolation, a key driver of self-harm and suicidal ideation. These interventions demonstrate that deaths and self-harm in custody are not inevitable; they are outcomes of conditions that can be changed."
            source="Source: Samaritans — Listener scheme evaluation. PPO — Annual Report 2023/24. MoJ — Safety in Custody Statistics."
          />
        </ScrollReveal>

        <RelatedTopics />

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p>
              <a href="https://www.gov.uk/government/collections/safety-in-custody-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                Ministry of Justice — Safety in Custody quarterly statistics
              </a>{' '}
              — prison deaths, self-inflicted deaths, and self-harm incidents. Retrieved Nov 2025.
            </p>
            <p>
              <a href="https://www.ppo.gov.uk/research/annual-reports/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                Prisons and Probation Ombudsman — Annual Report
              </a>{' '}
              — fatal incident investigations and thematic reviews. Retrieved Nov 2025.
            </p>
            <p>
              <a href="https://www.policeconduct.gov.uk/research-and-learning/statistics/annual-deaths-during-or-following-police-contact-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                IOPC — Deaths during or following police contact
              </a>{' '}
              — deaths in police custody and following other police contact. Retrieved Nov 2025.
            </p>
            <p>
              All figures are for England and Wales unless otherwise stated. Self-harm figures count individual
              incidents, not individuals. Classification of cause of death may be revised following coroner inquest.
              IOPC methodology was revised in 2016/17; pre-2016 figures are not directly comparable.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
