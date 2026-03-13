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

interface ReportedRapesPoint {
  year: number;
  count: number;
}

interface ChargeRatePoint {
  year: number;
  rate: number;
}

interface VictimWithdrawalPoint {
  year: number;
  pct: number;
}

interface AverageDaysPoint {
  year: number;
  days: number;
}

interface ConvictionRatePoint {
  year: number;
  rate: number;
}

interface ForceData {
  force: string;
  reports: number;
  chargeRate: number;
}

interface RapeReportingData {
  reportedRapes: ReportedRapesPoint[];
  chargeRate: ChargeRatePoint[];
  victimWithdrawal: VictimWithdrawalPoint[];
  averageDaysToCharge: AverageDaysPoint[];
  convictionRate: ConvictionRatePoint[];
  byPoliceForce: ForceData[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

const editorialRefs: Reference[] = [
  { num: 1, name: 'ONS', dataset: 'Crime in England and Wales', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice', date: '2024' },
  { num: 2, name: 'CPS', dataset: 'Violence Against Women and Girls Report', url: 'https://www.cps.gov.uk/publication/violence-against-women-and-girls', date: '2023/24' },
  { num: 3, name: 'Home Office', dataset: 'Crime Outcomes in England and Wales', url: 'https://www.gov.uk/government/statistics/crime-outcomes-in-england-and-wales', date: '2023/24' },
  { num: 4, name: 'Home Office', dataset: 'Operation Soteria Evaluation', date: '2024' },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function RapeReportingRatePage() {
  const [data, setData] = useState<RapeReportingData | null>(null);

  useEffect(() => {
    fetch('/data/rape-reporting-rate/rape_reporting_rate.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const reportedSeries: Series[] = data
    ? [{
        id: 'reported',
        label: 'Rapes reported to police',
        colour: '#6B7280',
        data: data.reportedRapes.map(d => ({
          date: yearToDate(d.year),
          value: d.count,
        })),
      }]
    : [];

  const chargeRateSeries: Series[] = data
    ? [{
        id: 'charge-rate',
        label: 'Charge rate (%)',
        colour: '#E63946',
        data: data.chargeRate.map(d => ({
          date: yearToDate(d.year),
          value: d.rate,
        })),
      }]
    : [];

  const withdrawalSeries: Series[] = data
    ? [{
        id: 'withdrawal',
        label: 'Victim withdrawal rate (%)',
        colour: '#E63946',
        data: data.victimWithdrawal.map(d => ({
          date: yearToDate(d.year),
          value: d.pct,
        })),
      }]
    : [];

  const reportedAnnotations: Annotation[] = [
    { date: new Date(2017, 6, 1), label: "2017: #MeToo movement" },
    { date: new Date(2020, 2, 1), label: "2020: COVID-19 lockdown" },
  ];

  const chargeAnnotations: Annotation[] = [
    { date: new Date(2018, 0, 1), label: "2018: Disclosure review changes" },
    { date: new Date(2021, 5, 1), label: "2021: End-to-End Rape Review" },
  ];

  const withdrawalAnnotations: Annotation[] = [
    { date: new Date(2017, 0, 1), label: "2017: Digital device extraction begins" },
  ];

  // ── Derived metrics ───────────────────────────────────────────────────

  const latestReported = data?.reportedRapes[data.reportedRapes.length - 1];
  const earliestReported = data?.reportedRapes[0];
  const latestCharge = data?.chargeRate[data.chargeRate.length - 1];
  const peakCharge = data?.chargeRate[0];
  const latestWithdrawal = data?.victimWithdrawal[data.victimWithdrawal.length - 1];
  const earliestWithdrawal = data?.victimWithdrawal[0];

  const reportedChange = latestReported && earliestReported
    ? Math.round(((latestReported.count - earliestReported.count) / earliestReported.count) * 100)
    : 106;

  return (
    <>
      <TopicNav topic="Rape Reporting Rate" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Rape Reporting Rate"
          question="Why Is the Rape Charge Rate Only 4%?"
          finding="70,633 rapes were reported to police in England and Wales in 2023 — a record. But the charge rate is just 4%, and most cases are closed without action. Victims frequently withdraw due to the length and intrusiveness of the investigation process."
          colour="#6B7280"
          preposition="with"
        />

        {/* ── Editorial context ────────────────────────────────────────────── */}
        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The scale of the gap between reporting and justice in rape cases is difficult to overstate. In 2023, 70,633 rapes were reported to police in England and Wales — more than double the figure from just eight years earlier.<Cite nums={1} /> Some of that increase reflects genuine rises in offending, but the dominant driver is improved willingness to report, particularly following the #MeToo movement, high-profile prosecutions, and sustained campaigning by survivors. The Crime Survey for England and Wales suggests the underlying prevalence of sexual violence has not risen at the same rate as police-recorded figures.<Cite nums={1} /> What has changed is that more victims are coming forward. The system they encounter when they do is not equipped to meet them.</p>
            <p>The charge rate — the proportion of recorded rapes that result in a suspect being charged — collapsed from 7.5% in 2015 to just 1.4% in 2019, a period now widely recognised as a crisis.<Cite nums={2} /> Multiple inquiries identified the causes: police forces adopted an overly cautious approach to evidence-gathering after several high-profile disclosure failures, subjecting complainants to invasive digital device examinations and exhaustive credibility assessments. CPS prosecutors, under pressure from internal conviction rate targets, became reluctant to charge cases they considered difficult to win.<Cite nums={2} /> The result was that cases were dropped at every stage — not because evidence was absent, but because the system selected for certainty rather than justice. Victims, subjected to investigations lasting over a year on average, withdrew in growing numbers. By 2023, 57% of reported rapes were closed because the victim did not support further action.<Cite nums={3} /></p>
            <p>The government published its End-to-End Rape Review in 2021, and there has been measurable — if fragile — improvement since. The charge rate recovered from its 2019 nadir of 1.4% to 4.0% in 2023, and the conviction rate among those cases that do reach court rose to 68.2%, the highest on record.<Cite nums={2} /> Operation Soteria, a research-led programme that refocuses investigations on suspect behaviour rather than victim credibility, has been adopted by every police force in England and Wales.<Cite nums={4} /> Early results are promising: participating forces showed faster case progression and higher charge rates. But the structural deficit remains enormous. Even at 4%, fewer than 3,000 of the 70,633 reported rapes resulted in a charge.<Cite nums={[1, 2]} /> Average investigation times remain above 500 days. And independent estimates suggest that only around one in six rapes is reported to police at all — meaning the true charge rate per offence committed is closer to 0.7%.<Cite nums={1} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-reported', label: 'Reports' },
          { id: 'sec-charge', label: 'Charge rate' },
          { id: 'sec-withdrawal', label: 'Victim withdrawal' },
          { id: 'sec-regional', label: 'By force' },
        ]} />

        {/* ── Metric cards ─────────────────────────────────────────────────── */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Rapes reported to police"
            value={latestReported ? latestReported.count.toLocaleString() : "70,633"}
            unit="2023"
            direction="up"
            polarity="up-is-bad"
            changeText={`+${reportedChange}% since 2015 · record high`}
            sparklineData={
              data ? sparkFrom(data.reportedRapes.map(d => d.count)) : []
            }
            source="ONS — Crime in England and Wales, year ending Mar 2024"
            href="#sec-reported"
          />
          <MetricCard
            label="Charge rate"
            value={latestCharge ? `${latestCharge.rate}%` : "4.0%"}
            unit="2023"
            direction="down"
            polarity="down-is-bad"
            changeText={
              latestCharge && peakCharge
                ? `Down from ${peakCharge.rate}% in ${peakCharge.year} · recovering from 1.4% low`
                : "Down from 7.5% in 2015"
            }
            sparklineData={
              data ? sparkFrom(data.chargeRate.map(d => d.rate)) : []
            }
            source="CPS — Violence Against Women and Girls report, 2023/24"
            href="#sec-charge"
          />
          <MetricCard
            label="Victim withdrawal rate"
            value={latestWithdrawal ? `${latestWithdrawal.pct}%` : "57%"}
            unit="2023"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestWithdrawal && earliestWithdrawal
                ? `Up from ${earliestWithdrawal.pct}% in ${earliestWithdrawal.year} · most cases close this way`
                : "Up from 28% in 2015"
            }
            sparklineData={
              data ? sparkFrom(data.victimWithdrawal.map(d => d.pct)) : []
            }
            source="Home Office — Crime Outcomes in England and Wales, 2023/24"
            href="#sec-withdrawal"
          />
        </div>

        {/* ── Chart 1: Reported rapes ──────────────────────────────────────── */}
        <ScrollReveal>
          <div id="sec-reported" className="mb-12">
            <LineChart
              series={reportedSeries}
              annotations={reportedAnnotations}
              title="Police-recorded rapes, England &amp; Wales, 2015–2023"
              subtitle="Annual recorded offences. Reporting has more than doubled since 2015, driven largely by improved willingness to come forward."
              yLabel="Offences"
              source={{
                name: 'ONS',
                dataset: 'Crime in England and Wales',
                frequency: 'annual',
                url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice',
                date: 'Mar 2024',
              }}
            />
          </div>
        </ScrollReveal>

        {/* ── Chart 2: Charge rate ─────────────────────────────────────────── */}
        <ScrollReveal>
          <div id="sec-charge" className="mb-12">
            <LineChart
              series={chargeRateSeries}
              annotations={chargeAnnotations}
              title="Rape charge rate (%), England &amp; Wales, 2015–2023"
              subtitle="Share of recorded rapes resulting in a suspect being charged. Collapsed to 1.4% in 2019 before partial recovery."
              yLabel="Charge rate (%)"
              source={{
                name: 'CPS',
                dataset: 'Violence Against Women and Girls report',
                frequency: 'annual',
                url: 'https://www.cps.gov.uk/publication/violence-against-women-and-girls',
                date: '2023/24',
              }}
            />
          </div>
        </ScrollReveal>

        {/* ── Chart 3: Victim withdrawal ───────────────────────────────────── */}
        <ScrollReveal>
          <div id="sec-withdrawal" className="mb-12">
            <LineChart
              series={withdrawalSeries}
              annotations={withdrawalAnnotations}
              title="Victim withdrawal rate (%), England &amp; Wales, 2015–2023"
              subtitle="Share of reported rapes closed because the victim did not support further action. Now the single largest reason cases end."
              yLabel="Withdrawal rate (%)"
              source={{
                name: 'Home Office',
                dataset: 'Crime Outcomes in England and Wales',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/crime-outcomes-in-england-and-wales',
                date: '2023/24',
              }}
            />
          </div>
        </ScrollReveal>

        {/* ── Regional bar chart ───────────────────────────────────────────── */}
        <ScrollReveal>
          <div id="sec-regional" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Rape charge rate by police force area (%)
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                Significant variation exists between forces. Smaller forces tend to achieve higher charge rates, partly reflecting lower caseloads.
              </p>
              <div className="mt-6 space-y-4">
                {data?.byPoliceForce.map((f) => {
                  const pct = (f.chargeRate / 8) * 100;
                  return (
                    <div key={f.force}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{f.force}</span>
                        <span className="font-mono text-sm font-bold text-wiah-black">{f.chargeRate}%</span>
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
              <p className="font-mono text-xs text-wiah-mid mt-4">Source: Home Office — Crime Outcomes in England and Wales by Police Force Area, 2023/24</p>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Positive callout ─────────────────────────────────────────────── */}
        <ScrollReveal>
          <PositiveCallout
            title="Operation Soteria changing how rape is investigated"
            value="68.2%"
            unit="conviction rate at court"
            description="Operation Soteria, launched in 2021 and now adopted by all 43 police forces in England and Wales, represents a fundamental shift in how rape is investigated. Instead of scrutinising the victim, investigations focus on suspect behaviour, patterns of offending, and third-party evidence. Early evaluations show participating forces achieved faster case progression and higher charge rates. The conviction rate for rape cases that reach court rose to 68.2% in 2023 — the highest on record — demonstrating that when cases are properly built, juries do convict. The challenge remains getting cases to court at all."
            source="Source: CPS — VAWG Report 2023/24. Home Office — Operation Soteria evaluation, 2024."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        {/* ── Sources & Methodology ────────────────────────────────────────── */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Crime in England and Wales</a> — police-recorded rape figures. Year ending March 2024.</p>
            <p><a href="https://www.cps.gov.uk/publication/violence-against-women-and-girls" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">CPS — Violence Against Women and Girls report</a> — charge and conviction data. 2023/24.</p>
            <p><a href="https://www.gov.uk/government/statistics/crime-outcomes-in-england-and-wales" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Home Office — Crime Outcomes in England and Wales</a> — outcome breakdowns including victim withdrawal. 2023/24.</p>
            <p>All figures are for England and Wales unless otherwise stated. "Charge rate" refers to the proportion of police-recorded rapes resulting in a charge or summons in the same reporting year. Victim withdrawal includes cases recorded as "evidential difficulties — victim does not support action." Trend data uses the most recent available release at time of publication.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
