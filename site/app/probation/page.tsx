'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import PositiveCallout from '@/components/PositiveCallout';

// ── Types ────────────────────────────────────────────────────────────────────

interface ProbationData {
  timeSeries: Array<{ date: string; seriousFurtherOffences: number; vacancyRatePct: number }>;
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: string): Date {
  return new Date(parseInt(y), 6, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ProbationPage() {
  const [data, setData] = useState<ProbationData | null>(null);

  useEffect(() => {
    fetch('/data/probation/probation.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const sfoSeries: Series[] = data
    ? [
        {
          id: 'sfo',
          label: 'Serious Further Offences per year',
          colour: '#6B7280',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.date),
            value: d.seriousFurtherOffences,
          })),
        },
      ]
    : [];

  const vacancySeries: Series[] = data
    ? [
        {
          id: 'vacancy-rate',
          label: 'Probation officer vacancy rate (%)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.date),
            value: d.vacancyRatePct,
          })),
        },
      ]
    : [];

  return (
    <>
      <TopicNav topic="Probation" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Probation"
          preposition="in"
          question="Is the Probation Service Keeping the Public Safe?"
          finding="The Probation Service supervises 232,000 offenders in the community, but a botched part-privatisation in 2014 — widely regarded as one of the worst public service reforms in a generation — left the service understaffed, fragmented, and overwhelmed. Serious Further Offences by people on probation rose from 530 in 2015 to 820 in 2023, while officer vacancy rates reached 16% against a recommended maximum caseload of 35 offenders per officer."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The 2014 Transforming Rehabilitation reforms split the probation service into a National Probation Service (NPS) handling high-risk offenders and 21 Community Rehabilitation Companies (CRCs) handling low and medium-risk offenders. The CRCs were contracted to private and third-sector providers including Sodexo, Interserve, and Working Links. By 2018, every major inspection of the CRCs had found them to be failing: caseloads were too high, staff lacked experience, supervision was inadequate, and rehabilitation programmes were inconsistently delivered. Three CRCs went into administration. The promised rehabilitation revolution — in which private providers would reduce reoffending and be paid by results — did not materialise; reoffending rates remained stubbornly around 53%. The government terminated the CRC contracts early and reunified probation under public control in 2021.
            </p>
            <p>
              The human cost of the privatisation experiment is most visible in the Serious Further Offence statistics. An SFO occurs when a person under probation supervision commits a specified serious crime — typically murder, rape, serious assault, or robbery — resulting in conviction. The MoJ publishes annual statistics: in 2014/15, before the CRC contracts came into force, there were approximately 470 SFOs. By 2022/23, the figure had risen to 820 — a 74% increase. HM Inspectorate of Probation reviews of individual SFOs have repeatedly found that the preceding supervision was inadequate: missed appointments not followed up, risk assessments not updated, warning signs not escalated. Inspectors have noted cases where officers carried caseloads of 80 or more, more than double the recommended maximum of 35, making meaningful supervision impossible.
            </p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-sfo', label: 'Serious Further Offences' },
          { id: 'sec-vacancy', label: 'Officer Vacancies' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Serious Further Offences per year"
              value="820"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 530 in 2015 · +74% · Linked to privatisation-era staffing collapse"
              sparklineData={[530, 560, 590, 620, 680, 730, 790, 820]}
              source="Ministry of Justice · SFO Statistics 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="Probation officer vacancy rate"
              value="16%"
              direction="up"
              polarity="up-is-bad"
              changeText="1 in 6 posts unfilled · Recommended max caseload: 35 · Actual: 60&plus;"
              sparklineData={[8, 9, 10, 12, 14, 15, 16, 16]}
              source="HMPPS · Workforce Statistics 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="Average caseload per officer"
              value="60+"
              direction="up"
              polarity="up-is-bad"
              changeText="Recommended maximum: 35 · Some officers carrying 80&plus;"
              sparklineData={[38, 40, 42, 45, 50, 55, 58, 60]}
              source="HM Inspectorate of Probation · Annual Report 2023"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What is getting better"
            value="+15%"
            unit="new recruits (2023)"
            description="Reunification of probation under public control in 2021 ended the failed privatisation experiment and allowed focused workforce investment. Probation officer recruits rose 15% in 2023 — the first sustained increase since Transforming Rehabilitation — and vacancy rates showed a marginal improvement in 2024, suggesting the workforce rebuilding programme is beginning to take effect."
            source="HMPPS · Probation Workforce Strategy 2025–2030"
          />
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-sfo" className="mb-12">
            {sfoSeries.length > 0 ? (
              <LineChart
                title="Serious Further Offences by people on probation, 2015–2024"
                subtitle="Annual convictions for specified serious offences committed by people under probation supervision. Rises track staffing deterioration."
                series={sfoSeries}
                yLabel="Number of SFOs"
                source={{
                  name: 'Ministry of Justice',
                  dataset: 'Serious Further Offence Review Statistics',
                  frequency: 'annual',
                  url: 'https://www.gov.uk/government/statistics/serious-further-offence-review-statistics',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-vacancy" className="mb-12">
            {vacancySeries.length > 0 ? (
              <LineChart
                title="Probation officer vacancy rate, 2015–2024"
                subtitle="Percentage of probation officer posts unfilled. Peaked during CRC era; small improvement following 2021 reunification."
                series={vacancySeries}
                yLabel="Vacancy rate (%)"
                source={{
                  name: 'HMPPS',
                  dataset: 'Workforce Statistics',
                  frequency: 'quarterly',
                  url: 'https://www.gov.uk/government/statistics/her-majestys-prison-and-probation-service-workforce-statistics',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        <section className="border-t border-wiah-border pt-8 mt-12">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; methodology</h2>
          <div className="text-sm text-wiah-mid space-y-2">
            {data?.metadata.sources.map((src, i) => (
              <p key={i}>
                <strong>{src.name}.</strong> <em>{src.dataset}</em>. {src.frequency} — 
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="underline text-wiah-blue hover:no-underline">
                  {src.url}
                </a>
              </p>
            ))}
          </div>
          <p className="text-sm text-wiah-mid mt-6">{data?.metadata.methodology}</p>
          {data?.metadata.knownIssues && data.metadata.knownIssues.length > 0 && (
            <div className="mt-6 p-4 bg-wiah-light rounded">
              <p className="font-bold text-wiah-black mb-2">Known issues:</p>
              <ul className="text-sm text-wiah-mid space-y-1 list-disc list-inside">
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
