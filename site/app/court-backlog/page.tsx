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

interface CourtBacklogTimeSeries {
  year: number;
  outstandingCases: number;
}

interface CompletionDaysTimeSeries {
  year: number;
  avgDays: number;
}

interface OffenceType {
  offence: string;
  outstandingCases: number;
}

interface CourtBacklogData {
  national: {
    crownCourtBacklog: {
      timeSeries: CourtBacklogTimeSeries[];
      latestYear: number;
      latestCases: number;
      targetCases: number;
    };
    completionDays: {
      timeSeries: CompletionDaysTimeSeries[];
      latestYear: number;
      latestDays: number;
    };
    remandPrisoners: {
      latestCount: number;
      pctOfPrisonPop: number;
    };
    magistratesBacklog: {
      latestCases: number;
    };
    byOffenceType: OffenceType[];
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

function sparkFrom(arr: number[], n = 12) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function CourtBacklogPage() {
  const [data, setData] = useState<CourtBacklogData | null>(null);
  const colour = '#6B7280';

  useEffect(() => {
    fetch('/data/court-backlog/court_backlog.json')
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <div className="p-8">Loading...</div>;

  const backlogSeries: Series = {
    id: 'backlog',
    label: 'Outstanding cases',
    colour,
    data: data.national.crownCourtBacklog.timeSeries.map(d => ({
      date: yearToDate(d.year),
      value: d.outstandingCases,
    })),
  };

  const completionSeries: Series = {
    id: 'completion',
    label: 'Average days',
    colour: '#E63946',
    data: data.national.completionDays.timeSeries.map(d => ({
      date: yearToDate(d.year),
      value: d.avgDays,
    })),
  };

  const backlogAnnotations: Annotation[] = [
    { date: new Date(2020, 2, 1), label: '2020: Courts closed (COVID)' },
    { date: new Date(2022, 7, 1), label: '2022: Bar strikes' },
  ];

  const maxOffenceCount = Math.max(...data.national.byOffenceType.map(o => o.outstandingCases));

  return (
    <>
      <TopicNav topic="Court Backlog" />

      <main className="bg-white max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Court Backlog"
          question="How Long Are People Waiting for Justice?"
          finding="67,573 cases are outstanding in England's Crown Courts — up from 41,000 before the pandemic. The 62,000-case target has not been met since 2020. Average time from offence to Crown Court completion exceeds 700 days. The magistrates' courts backlog stands at 371,000 cases. Criminal legal aid rates have fallen 40% in real terms since 1994."
          colour={colour}
        />

        {/* Metric cards */}
        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-backlog', label: 'Backlog Trend' },
          { id: 'sec-completion', label: 'Waiting Times' },
          { id: 'sec-offences', label: 'By Offence' },
        ]} />

        <section id="sec-overview" className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <ScrollReveal>
              <MetricCard
                label="Crown Court outstanding cases"
                value={data.national.crownCourtBacklog.latestCases.toLocaleString()}
                direction="up"
                polarity="up-is-bad"
                changeText="March 2024 · Up from 41K pre-COVID · Target: 62K · Never met since pandemic began"
                sparklineData={sparkFrom([35000, 37000, 39000, 41000, 40000, 38000, 56000, 58000, 60000, 61000, 65000, 67573])}
                href="#sec-backlog"/>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <MetricCard
                label="Average days offence to Crown Court completion"
                value={data.national.completionDays.latestDays.toString()}
                direction="up"
                polarity="up-is-bad"
                changeText="2023 · Up from 350 days in 2015 · Doubled since pre-COVID · Victims waiting 2+ years for trial"
                sparklineData={sparkFrom([350, 370, 390, 400, 410, 420, 560, 600, 650, 680, 700, 718])}
                href="#sec-completion"/>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <MetricCard
                label="Defendants held on remand"
                value={data.national.remandPrisoners.latestCount.toLocaleString()}
                direction="up"
                polarity="up-is-bad"
                changeText="2024 · 24% of prison population · Some held 2+ years pre-trial · Record remand numbers"
                sparklineData={sparkFrom([9000, 9500, 10000, 10500, 11000, 12000, 14000, 15000, 15500, 16000, 16200, 16400])}
                href="#sec-offences"/>
            </ScrollReveal>
          </div>
        </section>

        {/* Charts */}
        <section id="sec-backlog" className="py-12">
          <ScrollReveal>
            <LineChart
              title="Crown Court outstanding cases, 2012–2024"
              subtitle="Cases outstanding at end of quarter. COVID-19 drove a doubling of the backlog; the 62,000-case target has not been met since 2020."
              series={[backlogSeries]}
              yLabel="Outstanding cases"
              annotations={backlogAnnotations}
              source={{ name: 'Ministry of Justice', dataset: 'Criminal Court Statistics', frequency: 'quarterly' }}
            />
          </ScrollReveal>
        </section>

        <section id="sec-completion" className="py-12">
          <ScrollReveal>
            <LineChart
              title="Average days from offence to Crown Court completion, 2015–2023"
              subtitle="Average time from offence date to case completion in Crown Court, all defendants."
              series={[completionSeries]}
              yLabel="Days"
              source={{ name: 'Ministry of Justice', dataset: 'Criminal Justice Journey Statistics', frequency: 'annual' }}
            />
          </ScrollReveal>
        </section>

        <section id="sec-offences" className="py-12">
          <ScrollReveal>
            <div className="mb-8">
              <h2 className="text-2xl font-black mb-2 text-wiah-black">Crown Court outstanding cases by offence type</h2>
              <p className="text-sm text-wiah-mid mb-6">Outstanding cases as at March 2024, England and Wales.</p>
              <div className="space-y-4">
                {data.national.byOffenceType.map((item) => {
                  const pct = (item.outstandingCases / maxOffenceCount) * 100;
                  return (
                    <div key={item.offence} className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-40">
                        <p className="text-sm text-wiah-black font-medium">{item.offence}</p>
                      </div>
                      <div className="flex-grow h-8 bg-wiah-light rounded" style={{ width: pct + '%', backgroundColor: colour }} />
                      <div className="flex-shrink-0 w-20 text-right">
                        <p className="text-sm font-mono text-wiah-black">{item.outstandingCases.toLocaleString()}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Positive callout */}
        <section className="py-12">
          <ScrollReveal>
            <PositiveCallout
              title="Steps being taken"
              value="160K"
              unit="cases resolved through expanded court venues and sitting day increases"
              description="The government committed to increasing Crown Court sitting days to 106,000 in 2023/24 — the highest since 2014. Nightingale courts, temporary hearing venues in hotels, racecourses, and civic buildings, heard over 100,000 cases between 2020 and 2023. The Criminal Legal Aid Review delivered a 15% fee increase for defence solicitors in 2022, reducing the risk of firms exiting legal aid work. The Magistrates' Courts are processing record numbers of cases using new digital hearing systems. The Law Commission is reviewing the guilty plea discount system to encourage earlier resolution and free up Crown Court capacity."
              source="Source: Ministry of Justice — Criminal Court Statistics 2024; HMCTS — Annual Report 2023/24."
            />
          </ScrollReveal>
        </section>

        {/* Context section */}
        <section className="py-12 bg-wiah-light">
          <div className="prose prose-sm">
            <ScrollReveal>
              <div className="mb-6">
                <h2 className="text-2xl font-black text-wiah-black mb-4">What's driving the backlog</h2>
                <p className="text-base leading-relaxed text-wiah-black">
                  England's Crown Courts had 67,573 cases outstanding at the end of March 2024, up from 41,000 before the pandemic. The government's 62,000-case target has not been met since 2020. COVID-19 shuttered courts entirely in spring 2020 and kept them at reduced capacity for eighteen months, but recovery was then derailed by the criminal Bar strike of autumn 2022, when barristers walked out for more than thirty days over legal aid rates. Jury trial complexity is rising, sentencing guidelines have lengthened average hearings, and the magistrates' courts carry their own backlog of 371,000 cases. The average time from offence to Crown Court completion reached 718 days in 2023 — double the 350 days recorded in 2015.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="mb-6">
                <p className="text-base leading-relaxed text-wiah-black">
                  Criminal legal aid rates were last substantially raised in 1994; by 2023 their real-terms value had fallen roughly 40%, according to the Law Society. The 2021 Criminal Legal Aid Review recommended increases, but the 15% fee uplift delivered in 2022 was widely regarded as insufficient. In 2023 alone, 82 solicitor firms exited criminal legal aid work, creating advice deserts across swathes of England and Wales. Meanwhile, 107 court buildings were closed or sold between 2010 and 2019 under austerity. The consequences land on defendants: 16,400 people — 24% of the prison population — are held on remand awaiting trial, a record. Some have waited more than two years, testing the European Convention on Human Rights requirement that detention be of reasonable duration.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="mb-6">
                <p className="text-base leading-relaxed text-wiah-black">
                  Victims bear the heaviest cost. Surveys indicate that roughly 30% of victims of serious offences withdraw from proceedings citing unbearable delays; for sexual offences the average wait now exceeds 1,000 days from offence to completion, leaving complainants in legal limbo for years. Operation Nightingale — temporary courts in hotels, racecourses, and civic venues — heard more than 100,000 cases between 2020 and 2023 but has now wound down. Crown Court sitting days rose to 106,000 in 2023/24, the highest since 2014. Online guilty pleas for lower-level magistrates' court offences were introduced under the 2022 reforms but have had limited impact on Crown Court volumes. The 2024 Sentencing Bill proposes mandatory minimum sentences that, if enacted, would extend average disposal times further still.
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
      </main>

    </>
  );
}
