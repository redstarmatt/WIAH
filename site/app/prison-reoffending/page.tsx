'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';

interface ReoffendingRatePoint {
  year: number;
  pct: number;
}

interface SentenceLengthData {
  sentence: string;
  reoffendPct: number;
}

interface RehabilitationData {
  activity: string;
  reoffendPct: number;
}

interface PrisonReoffendingData {
  reoffendingRate: ReoffendingRatePoint[];
  bySentenceLength: SentenceLengthData[];
  byRehabilitation: RehabilitationData[];
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

export default function PrisonReoffendingPage() {
  const [data, setData] = useState<PrisonReoffendingData | null>(null);

  useEffect(() => {
    fetch('/data/prison-reoffending/prison_reoffending.json')
      .then((res) => res.json())
      .then((d: PrisonReoffendingData) => setData(d))
      .catch((err) => console.error('Failed to load prison reoffending data:', err));
  }, []);

  if (!data) return <div className="p-8">Loading...</div>;

  // ── Series ────────────────────────────────────────────────────────────────

  const reoffendingRateSeries: Series[] = [
    {
      id: 'reoffending-rate',
      label: 'Reoffending rate (%)',
      colour: '#6B7280',
      data: data.reoffendingRate.map((p) => ({
        date: yearToDate(p.year),
        value: p.pct,
      })),
    },
  ];

  // For horizontal bar charts
  const maxSentenceRate = Math.max(...data.bySentenceLength.map((a) => a.reoffendPct));
  const maxRehabRate = Math.max(...data.byRehabilitation.map((a) => a.reoffendPct));

  return (
    <main>
      <TopicNav topic="Prison Reoffending" />

      <TopicHeader
        topic="Prison Reoffending"
        colour="#6B7280"
        question="What happens after prison?"
        finding="Over half of adults released from prison reoffend within a year, and the reoffending rate for short-sentence prisoners is 64% &mdash; yet the courses, treatment, and post-release support that cut reoffending are chronically underfunded."
      />

      {/* ── MetricCards ────────────────────────────────────────────────────── */}
      <section className="bg-wiah-light px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScrollReveal delay={0}>
              <MetricCard
                label="Reoffending rate within 1 year (adults)"
                value="53%"
                direction="flat"
                polarity="up-is-bad"
                changeText="Has barely changed since 2010"
                sparklineData={[55, 54, 55, 54, 53, 53, 53, 53, 54, 53, 50, 52, 53]}
                onExpand={() => {}}
              />
            </ScrollReveal>

            <ScrollReveal delay={1}>
              <MetricCard
                label="Cost of reoffending to society"
                value="&pound;18bn"
                unit="per year"
                direction="up"
                polarity="up-is-bad"
                changeText="MOJ estimate; includes crime costs"
                sparklineData={[14, 15, 16, 17, 18]}
                onExpand={() => {}}
              />
            </ScrollReveal>

            <ScrollReveal delay={2}>
              <MetricCard
                label="Prisoners with no job/accommodation on release"
                value="48%"
                direction="up"
                polarity="up-is-bad"
                changeText="Homelessness on release is primary reoffending driver"
                sparklineData={[45, 46, 47, 48]}
                onExpand={() => {}}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Reoffending Rate Over Time Chart ────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <ScrollReveal>
          <div>
            <h2 className="text-2xl font-bold text-wiah-black mb-2">
              Adult reoffending rate within one year of release, England &amp; Wales
            </h2>
            <p className="text-wiah-mid text-sm mb-6 font-mono">
              Percentage of adult offenders who commit another proven offence within 12 months of release. MOJ Proven Reoffending Statistics.
            </p>
            <LineChart
              title="Adult reoffending rate within one year of release, England &amp; Wales"
              subtitle="Percentage of adult offenders who commit another proven offence within 12 months of release. MOJ Proven Reoffending Statistics."
              series={reoffendingRateSeries}
              source={{
                name: 'Ministry of Justice',
                dataset: 'Proven Reoffending Statistics',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>
      </section>

      {/* ── Reoffending by Sentence Length ────────────────────────────────────── */}
      <section className="bg-wiah-light px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div>
              <h2 className="text-2xl font-bold text-wiah-black mb-2">
                Reoffending rate by sentence length served
              </h2>
              <div className="space-y-4 mt-8">
                {data.bySentenceLength.map((item, idx) => {
                  const widthPct = (item.reoffendPct / maxSentenceRate) * 100;
                  return (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="w-48 text-sm font-semibold text-wiah-black truncate">
                        {item.sentence}
                      </div>
                      <div className="flex-1">
                        <div className="bg-wiah-border rounded h-6 overflow-hidden">
                          <div
                            className="h-full bg-wiah-mid transition-all"
                            style={{ width: `${widthPct}%` }}
                          />
                        </div>
                      </div>
                      <div className="w-12 text-right font-mono text-sm font-semibold text-wiah-black">
                        {item.reoffendPct}%
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-wiah-mid text-xs mt-6 font-mono">
                Source: Ministry of Justice, Proven Reoffending Statistics, 2022
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Impact of Rehabilitation Activities ────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <ScrollReveal>
          <div>
            <h2 className="text-2xl font-bold text-wiah-black mb-2">
              Reoffending rate by post-release circumstances
            </h2>
            <div className="space-y-4 mt-8">
              {data.byRehabilitation.map((item, idx) => {
                const widthPct = (item.reoffendPct / maxRehabRate) * 100;
                // Use green for lower rates (employment, accommodation), red for worse
                const barColour = item.reoffendPct <= 31 ? '#2A9D8F' : '#6B7280';
                return (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-48 text-sm font-semibold text-wiah-black truncate">
                      {item.activity}
                    </div>
                    <div className="flex-1">
                      <div className="bg-wiah-border rounded h-6 overflow-hidden">
                        <div
                          className="h-full transition-all"
                          style={{ width: `${widthPct}%`, backgroundColor: barColour }}
                        />
                      </div>
                    </div>
                    <div className="w-12 text-right font-mono text-sm font-semibold text-wiah-black">
                      {item.reoffendPct}%
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-wiah-mid text-xs mt-6 font-mono">
              Source: Ministry of Justice, Reoffending Analysis, 2022
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Context Section ────────────────────────────────────────────────── */}
      <section id="sec-context" className="bg-wiah-light px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>More than half of adults released from prison in England and Wales &mdash; 53% &mdash; commit another proven offence within twelve months. That figure has barely moved since 2010, when it stood at 55%. The most acute problem is concentrated among short-sentence prisoners: those serving under twelve months reoffend at a rate of 64%. These are also the prisoners least likely to receive any structured help. They are released with &pound;46 in gate money, no compulsory supervision, and &mdash; in nearly half of all cases &mdash; nowhere confirmed to live and no job to go to.</p>
              <p>The data on what actually reduces reoffending is unambiguous. Prisoners who leave custody with employment reoffend at a rate of 23%; those with stable accommodation, 27%. Those with neither: 73%. This is not correlational noise &mdash; randomised controlled trials confirm employment and housing as the primary protective factors. Yet rehabilitation budgets have been cut repeatedly since 2010. Substance misuse treatment, relevant to around 60% of the prison population, was absorbed into general prison budgets and lost visibility. The Transforming Rehabilitation reforms of 2014 privatised probation through Community Rehabilitation Companies; they failed to deliver on reoffending targets, and probation was renationalised into His Majesty&apos;s Probation Service in 2021.</p>
              <p>The Ministry of Justice estimates the total economic cost of reoffending &mdash; including criminal justice processing, victim costs, and social services &mdash; at &pound;18bn per year. Against that, the cost of comprehensive employment support, stable housing on release, and addiction treatment is modest. The DWP&apos;s New Futures Network and the prison employment advisory function introduced in 2021 point in the right direction, but reach only a fraction of those released each year. The evidence has been settled for decades. What changes is the political will to fund the answer at scale.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Positive Callout ────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <ScrollReveal>
          <PositiveCallout
            title="Employment on release cuts reoffending in half"
            value="23%"
            unit="reoffending rate (with work)"
            description="The evidence is clear: prisoners who leave custody with a job are half as likely to reoffend as those without work. The DWP&apos;s New Futures Network connects prisons with employers, and the prison employment advisory function was introduced in 2021 to support every prison leaver into work. Take-up remains limited by employer confidence and the practical barriers of disclosure."
            source="Source: Ministry of Justice, Reoffending Analysis by Post-Release Circumstances, 2022"
          />
        </ScrollReveal>
      </section>
    </main>
  );
}
