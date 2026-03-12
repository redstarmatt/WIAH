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

interface FailureTimeSeries {
  year: number;
  complaints: number;
}

interface QuarterlyTimeSeries {
  quarter: string;
  count: number;
}

interface NRPSITimeSeries {
  year: number;
  members: number;
}

interface CostTimeSeries {
  year: number;
  costMillions: number;
}

interface CourtInterpretersData {
  national: {
    interpreterFailures: {
      timeSeries: FailureTimeSeries[];
      latestYear: number;
      latestComplaints: number;
    };
    noShowsCancellations: {
      timeSeries: QuarterlyTimeSeries[];
      latestQuarter: string;
      latestCount: number;
    };
    trialsAdjourned: {
      timeSeries: QuarterlyTimeSeries[];
      latestQuarter: string;
      latestCount: number;
    };
    nrpsiMembership: {
      timeSeries: NRPSITimeSeries[];
      latestYear: number;
      latestMembers: number;
      peakYear: number;
      peakMembers: number;
    };
    estimatedCost: {
      timeSeries: CostTimeSeries[];
      latestYear: number;
      latestCostMillions: number;
    };
    wrongLanguageBookings: {
      latestYear: number;
      latestCount: number;
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

function quarterToDate(q: string): Date {
  const [yearStr, qStr] = q.split('-');
  const year = parseInt(yearStr);
  const quarter = parseInt(qStr.replace('Q', ''));
  return new Date(year, (quarter - 1) * 3 + 1, 1);
}

function sparkFrom(arr: number[], n = 12) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function CourtInterpretersPage() {
  const [data, setData] = useState<CourtInterpretersData | null>(null);
  const colour = '#E63946';

  useEffect(() => {
    fetch('/data/court-interpreters/court_interpreters.json')
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <div className="p-8">Loading...</div>;

  const failuresSeries: Series = {
    id: 'failures',
    label: 'Interpreter complaints/failures',
    colour,
    data: data.national.interpreterFailures.timeSeries.map(d => ({
      date: yearToDate(d.year),
      value: d.complaints,
    })),
  };

  const nrpsiSeries: Series = {
    id: 'nrpsi',
    label: 'NRPSI registered interpreters',
    colour: '#264653',
    data: data.national.nrpsiMembership.timeSeries.map(d => ({
      date: yearToDate(d.year),
      value: d.members,
    })),
  };

  const costSeries: Series = {
    id: 'cost',
    label: 'Estimated cost (£M)',
    colour: '#F4A261',
    data: data.national.estimatedCost.timeSeries.map(d => ({
      date: yearToDate(d.year),
      value: d.costMillions,
    })),
  };

  const failuresAnnotations: Annotation[] = [
    { date: new Date(2012, 5, 1), label: '2012: MOJ outsources interpreting' },
    { date: new Date(2016, 5, 1), label: '2016: Contract transfers to thebigword' },
    { date: new Date(2020, 2, 1), label: '2020: COVID — remote interpreting expands' },
  ];

  const nrpsiAnnotations: Annotation[] = [
    { date: new Date(2012, 5, 1), label: '2012: Outsourcing begins — pay cut 40%' },
  ];

  return (
    <>
      <TopicNav topic="Court Interpreters" />

      <main className="bg-white max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Court Interpreters"
          question="Can You Understand Your Own Trial?"
          finding="Interpreter no-shows and cancellations have doubled since 2018. Wrong-language bookings affect over 400 hearings a year. Qualified interpreters are leaving the profession after pay rates were cut 40% under outsourcing. Trials adjourned or collapsed due to interpreter failures cost the court system an estimated £18 million a year."
          colour={colour}
        />

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-failures', label: 'Failures' },
          { id: 'sec-nrpsi', label: 'Interpreter Supply' },
          { id: 'sec-cost', label: 'Cost of Delays' },
        ]} />

        {/* Metric cards */}
        <section id="sec-overview" className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <ScrollReveal>
              <MetricCard
                label="Interpreter no-shows/cancellations per quarter"
                value={data.national.noShowsCancellations.latestCount.toLocaleString()}
                direction="up"
                polarity="up-is-bad"
                changeText="Q3 2024 · Doubled since 2018 · 430+ wrong-language bookings/year"
                sparklineData={sparkFrom(data.national.noShowsCancellations.timeSeries.map(d => d.count))}
                href="#sec-failures"
              />
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <MetricCard
                label="Trials adjourned due to interpreter failure"
                value={data.national.trialsAdjourned.latestCount.toLocaleString()}
                direction="up"
                polarity="up-is-bad"
                changeText="Q3 2024 · Up from 85/quarter in 2018 · Costing courts an estimated £18M/year"
                sparklineData={sparkFrom(data.national.trialsAdjourned.timeSeries.map(d => d.count))}
                href="#sec-cost"
              />
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <MetricCard
                label="Registered interpreters on NRPSI"
                value={data.national.nrpsiMembership.latestMembers.toLocaleString()}
                direction="down"
                polarity="down-is-bad"
                changeText="2024 · Down 30% from 2,800 in 2012 · Pay rates cut 40% under outsourcing"
                sparklineData={sparkFrom(data.national.nrpsiMembership.timeSeries.map(d => d.members))}
                href="#sec-nrpsi"
              />
            </ScrollReveal>
          </div>
        </section>

        {/* Chart 1: Interpreter complaints/failures */}
        <section id="sec-failures" className="py-12">
          <ScrollReveal>
            <LineChart
              title="Interpreter complaints and failures, 2014–2024"
              subtitle="Total recorded interpreter-related complaints, no-shows, wrong-language bookings and quality failures in courts across England and Wales."
              series={[failuresSeries]}
              yLabel="Complaints / failures"
              annotations={failuresAnnotations}
              source={{ name: 'Ministry of Justice', dataset: 'Court Interpreting Services Statistics', frequency: 'quarterly' }}
            />
          </ScrollReveal>
        </section>

        {/* Chart 2: NRPSI membership */}
        <section id="sec-nrpsi" className="py-12">
          <ScrollReveal>
            <LineChart
              title="NRPSI registered interpreters, 2012–2024"
              subtitle="Membership of the National Register of Public Service Interpreters. Outsourcing in 2012 cut pay rates by 40% and stopped reimbursing travel — driving qualified interpreters out of the profession."
              series={[nrpsiSeries]}
              yLabel="Registered interpreters"
              annotations={nrpsiAnnotations}
              source={{ name: 'NRPSI', dataset: 'Annual Report — Membership Statistics', frequency: 'annual' }}
            />
          </ScrollReveal>
        </section>

        {/* Chart 3: Estimated cost */}
        <section id="sec-cost" className="py-12">
          <ScrollReveal>
            <LineChart
              title="Estimated cost of interpreter-related court delays, 2016–2024"
              subtitle="Modelled cost of adjournments, collapsed trials, and rescheduled hearings attributed to interpreter failures. Based on HMCTS average adjournment cost multiplied by interpreter-attributed delays."
              series={[costSeries]}
              yLabel="Estimated cost (£ millions)"
              source={{ name: 'HMCTS', dataset: 'Court Listing and Adjournment Data (modelled)', frequency: 'quarterly' }}
            />
          </ScrollReveal>
        </section>

        {/* Positive callout */}
        <section className="py-12">
          <ScrollReveal>
            <PositiveCallout
              title="What's working"
              value="60%"
              unit="of non-complex hearings now use video remote interpreting"
              description="Video remote interpreting, expanded during COVID, now covers 60% of non-complex hearings — reducing travel costs and improving availability for rare languages. A 2024 MOJ pilot paying interpreters at higher rates saw no-show rates fall by 40% in participating courts."
              source="Source: Ministry of Justice — Court Interpreting Services Statistics 2024; HMCTS Remote Hearing Pilot Evaluation 2024."
            />
          </ScrollReveal>
        </section>

        {/* Context section */}
        <section className="py-12 bg-wiah-light">
          <div className="prose prose-sm">
            <ScrollReveal>
              <div className="mb-6">
                <h2 className="text-2xl font-black text-wiah-black mb-4">Why court interpreting is failing</h2>
                <p className="text-base leading-relaxed text-wiah-black">
                  In 2012, the Ministry of Justice outsourced court interpreting to private contractors — first Capita, then thebigword from 2016 — replacing a system where courts booked qualified interpreters directly from the National Register of Public Service Interpreters. The National Audit Office found &ldquo;significant deterioration&rdquo; in quality under the new arrangements. Pay rates for interpreters were cut by roughly 40%, and travel expenses were no longer reimbursed. The result was predictable: qualified interpreters left the profession in large numbers. NRPSI membership fell 30%, from 2,800 in 2012 to under 2,000 today. The interpreters who remain are increasingly stretched across more than 300 languages spoken in the UK. Demand for rare languages — Tigrinya, Pashto, and the languages spoken by modern slavery victims — frequently goes unmet. Wrong-language bookings, where a court receives an interpreter who speaks the wrong dialect or an entirely different language, now affect more than 400 hearings a year.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="mb-6">
                <p className="text-base leading-relaxed text-wiah-black">
                  The consequences go beyond administrative inconvenience. When an interpreter fails to appear, or is incompetent, trials must be adjourned. That means witnesses travel home and return weeks later, juries are dismissed and re-empanelled, defendants on remand spend additional weeks in custody, and victims wait even longer for resolution. The estimated cost to the court system is £18 million a year. More fundamentally, Article 6 of the European Convention on Human Rights guarantees the right to a fair trial, which includes the right to an interpreter if you cannot understand the proceedings. The European Framework Directive on the right to interpretation in criminal proceedings has never been fully implemented in UK domestic law. Remote video interpreting expanded rapidly during COVID and now handles 60% of non-complex hearings, reducing some pressure on rare-language availability. But quality concerns persist: nonverbal cues are lost on screen, audio lag causes confusion, and confidentiality is harder to guarantee when the interpreter is in a shared workspace rather than a private court booth. Defendants and witnesses are, in practice, unable to fully participate in their own cases — a quiet failure of justice that generates no headlines but undermines the system's most basic promise: that you can understand what is being done to you in a courtroom.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Methodology */}
        <section className="py-12">
          <ScrollReveal>
            <h2 className="text-2xl font-black text-wiah-black mb-6">Sources &amp; Methodology</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-mono text-sm font-bold text-wiah-black mb-2">Methodology</h3>
                <p className="text-sm text-wiah-mid">{data.metadata.methodology}</p>
              </div>
              <div>
                <h3 className="font-mono text-sm font-bold text-wiah-black mb-3">Sources</h3>
                <ul className="space-y-2">
                  {data.metadata.sources.map((source, idx) => (
                    <li key={idx} className="text-sm text-wiah-mid">
                      <a href={source.url} className="text-wiah-blue hover:underline">
                        {source.name}
                      </a>
                      {' — '}{source.dataset} ({source.frequency})
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-mono text-sm font-bold text-wiah-black mb-2">Known issues</h3>
                <ul className="space-y-1">
                  {data.metadata.knownIssues.map((issue, idx) => (
                    <li key={idx} className="text-sm text-wiah-mid flex gap-3">
                      <span className="flex-shrink-0">•</span>
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
