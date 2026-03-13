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

const editorialRefs: Reference[] = [
  { num: 1, name: 'NHS England', dataset: 'Referral to Treatment (RTT) Waiting Times Statistics', url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/rtt-waiting-times/', date: 'January 2024' },
  { num: 2, name: 'NHS Confederation', dataset: 'Missing patients analysis', url: 'https://www.nhsconfed.org/', date: '2023' },
  { num: 3, name: 'NHS England', dataset: 'Elective Recovery Plan', url: 'https://www.england.nhs.uk/coronavirus/publication/delivery-plan-for-tackling-the-covid-19-backlog-of-elective-care/', date: '2022' },
  { num: 4, name: 'CQC', dataset: 'State of Care Report', url: 'https://www.cqc.org.uk/publications/major-reports/state-care', date: '2023' },
  { num: 5, name: 'NHS Digital', dataset: 'NHS Vacancy Statistics', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/nhs-vacancies-survey', date: '2024' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface WaitingListPoint {
  year: number;
  waitingMillions: number;
}

interface CompliancePoint {
  year: number;
  within18wksPct: number;
}

interface SpecialtyItem {
  specialty: string;
  waitingThousands: number;
}

interface NhsWaitingTimesData {
  national: {
    waitingList: {
      timeSeries: WaitingListPoint[];
      latestYear: number;
      latestMillions: number;
      preCovidMillions: number;
    };
    standardCompliance: {
      timeSeries: CompliancePoint[];
      latestYear: number;
      latestPct: number;
      targetPct: number;
      lastMetYear: number;
    };
    longWaits: {
      over52WeeksCount: number;
      over78WeeksCount: number;
      over104WeeksCount: number;
    };
    bySpecialty: SpecialtyItem[];
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

// ── Page ─────────────────────────────────────────────────────────────────────

export default function NhsWaitingTimesPage() {
  const [data, setData] = useState<NhsWaitingTimesData | null>(null);

  useEffect(() => {
    fetch('/data/nhs-waiting-times/nhs_waiting_times.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  // 1. Waiting list size
  const waitingListSeries: Series[] = data
    ? [{
        id: 'waiting-list',
        label: 'Patients on NHS elective waiting list',
        colour: '#E63946',
        data: data.national.waitingList.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.waitingMillions,
        })),
      }]
    : [];

  const waitingListAnnotations: Annotation[] = [
    { date: new Date(2020, 2, 1), label: '2020: Elective care paused (COVID)' },
  ];

  // 2. 18-week standard compliance
  const standardComplianceSeries: Series[] = data
    ? [{
        id: 'standard-compliance',
        label: '% starting treatment within 18 weeks',
        colour: '#F4A261',
        data: data.national.standardCompliance.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.within18wksPct,
        })),
      }]
    : [];

  const complianceAnnotations: Annotation[] = [
    { date: new Date(2016, 5, 1), label: '2016: Last year standard met' },
  ];

  return (
    <>
      <TopicNav topic="NHS Waiting Times" />

      <main className="min-h-screen bg-white">
        <TopicHeader
          topic="NHS Waiting Times"
          question="How Long Are People Actually Waiting for NHS Treatment?"
          finding="7.54 million people are waiting for elective treatment — the highest on record. Over 300,000 have been waiting more than a year. The 18-week standard — the legal maximum from referral to treatment — is met for only 58% of patients. The government target is 92%."
          colour="#E63946"
          preposition="in"
        />

        <section className="max-w-4xl mx-auto px-4 py-8">
          <SectionNav sections={[
            { id: 'sec-overview', label: 'Overview' },
            { id: 'sec-list', label: 'Waiting List' },
            { id: 'sec-standard', label: '18-Week Standard' },
            { id: 'sec-specialty', label: 'By Specialty' },
          ]} />

          {/* Metric cards */}
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="People on NHS elective waiting list"
              value={data?.national.waitingList.latestMillions ? `${data.national.waitingList.latestMillions.toFixed(2)}M` : '—'}
              direction="up"
              polarity="up-is-bad"
              changeText="January 2024 · Up from 4.4M pre-COVID · Record high · Target: reduce significantly by March 2025"
              sparklineData={[4400, 4500, 4600, 4400, 4500, 7200, 7500, 7540]}
              source="NHS England · Referral to Treatment Statistics"
              href="#sec-list"/>
            <MetricCard
              label="Waiting over 18 weeks (% meeting standard)"
              value={data?.national.standardCompliance.latestPct ? `${data.national.standardCompliance.latestPct}%` : '—'}
              direction="down"
              polarity="up-is-good"
              changeText="January 2024 · Standard: 92% within 18 weeks · Last met: 2016 · 300K+ waiting over a year"
              sparklineData={[93, 92, 90, 88, 85, 61, 58, 58]}
              source="NHS England · Referral to Treatment Statistics"
              href="#sec-standard"/>
            <MetricCard
              label="Longest waits: over 2 years"
              value={data?.national.longWaits.over104WeeksCount === 0 ? '0' : data?.national.longWaits.over104WeeksCount.toLocaleString() || '—'}
              direction="down"
              polarity="up-is-bad"
              changeText="January 2024 · 2-year waits eliminated by target deadline · But 300K still over 1 year · 18-week standard remains far off"
              sparklineData={[0, 0, 0, 22000, 18000, 6000, 1000, 0]}
              source="NHS England · Referral to Treatment Statistics"
              href="#sec-specialty"/>
          </div>
          

          {/* Chart 1: Waiting list size */}
          <div id="sec-list">
          {waitingListSeries.length > 0 ? (
            <LineChart
              title="NHS elective care waiting list, 2016–2024"
              subtitle="Millions of patients with an incomplete referral to treatment pathway, England. Grew 70% since the pandemic."
              series={waitingListSeries}
              annotations={waitingListAnnotations}
              yLabel="Patients waiting (millions)"
              source={{
                name: 'NHS England',
                dataset: 'Referral to Treatment Statistics',
                frequency: 'monthly',
              }}
            />
          ) : (
            <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
          )}
          </div>

          {/* Chart 2: 18-week standard compliance */}
          <div id="sec-standard">
          {standardComplianceSeries.length > 0 ? (
            <LineChart
              title="% of patients starting treatment within 18 weeks, 2016–2024"
              subtitle="NHS Constitution standard: 92% of patients should start treatment within 18 weeks of referral. Last met in 2016."
              series={standardComplianceSeries}
              annotations={complianceAnnotations}
              yLabel="% within 18 weeks"
              source={{
                name: 'NHS England',
                dataset: 'Referral to Treatment Statistics',
                frequency: 'monthly',
              }}
            />
          ) : (
            <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
          )}
          </div>

          {/* Elective waiting list by specialty */}
          <div id="sec-specialty" className="mb-12">
            <h3 className="text-lg font-bold text-wiah-black mb-2">Elective waiting list by specialty</h3>
            <p className="font-mono text-xs text-wiah-mid mb-6">Patients waiting, by specialty, England (January 2024, thousands).</p>
            {data?.national.bySpecialty && data.national.bySpecialty.length > 0 ? (
              <div className="space-y-4">
                {data.national.bySpecialty.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="font-mono text-xs text-wiah-mid w-40">{item.specialty}</span>
                    <div className="flex-1 bg-wiah-light rounded h-5 overflow-hidden">
                      <div
                        className="h-full bg-wiah-red flex items-center justify-end pr-2"
                        style={{ width: `${(item.waitingThousands / 830) * 100}%` }}
                      >
                        {item.waitingThousands >= 250 && (
                          <span className="font-mono text-xs text-white font-bold">{item.waitingThousands}K</span>
                        )}
                      </div>
                    </div>
                    {item.waitingThousands < 250 && (
                      <span className="font-mono text-xs text-wiah-mid">{item.waitingThousands}K</span>
                    )}
                  </div>
                ))}
              </div>
            ) : null}
            <p className="font-mono text-xs text-wiah-mid mt-6">Orthopaedics (hip and knee replacements, fracture surgery) accounts for nearly one-third of the elective waiting list. Ophthalmology (cataract surgery) and general surgery (hernia repair, gallbladder removal) follow.</p>
          </div>

          {/* Editorial context */}
          <section className="mb-12 bg-wiah-light p-6 rounded">
            <h2 className="text-lg font-bold text-wiah-black mb-4">What's happening</h2>
            <div className="space-y-4 text-base leading-relaxed text-wiah-black">
              <p>The NHS elective waiting list stands at 7.54 million patients as of January 2024 — the highest figure ever recorded and a 71% increase from the 4.4 million waiting in February 2020.<Cite nums={1} /> Those 7.54 million entries represent an estimated 7.2 million separate conditions, since some patients are on multiple pathways simultaneously. Of these, 302,000 have been waiting over 52 weeks and 124,000 over 78 weeks; two-year waits have been eliminated.<Cite nums={1} /> But the visible list understates the true scale of unmet demand. Analysts at the NHS Confederation estimate that between 7 million and 13 million additional people — the so-called &ldquo;missing patients&rdquo; who delayed seeking help during the pandemic — have yet to be formally referred.<Cite nums={2} /> The NHS spends £35 billion a year on elective care; managing the backlog alone costs an estimated £1 billion in additional administration.</p>
              <p>The 18-week referral-to-treatment standard is a legal right enshrined in the NHS Constitution since 2012: 92% of patients should begin treatment within 18 weeks of referral. That target was last met across all specialties in 2016, when compliance stood at 93%. By January 2024 only 58% of patients started treatment within the deadline — the lowest rate ever recorded outside the acute COVID disruption period.<Cite nums={1} /> The 34-percentage-point gap between the 92% target and the 58% reality means roughly 1.8 million patients are waiting longer than they are legally entitled to. Orthopaedics carries the heaviest burden at 830,000 patients waiting, followed by ophthalmology at 620,000 and general surgery at 510,000.<Cite nums={1} /> Orthopaedic waits are particularly damaging: patients awaiting joint replacements deteriorate while on the list, requiring more complex procedures and longer recovery times.</p>
              <p>The NHS Elective Recovery Plan, published in 2022, set a phased approach: eliminate two-year waits first (achieved), then 18-month waits (largely achieved), then restore the 18-week standard.<Cite nums={3} /> The government's target of 92% compliance by March 2025 is regarded as unachievable on current trajectory by both the CQC and NHS England.<Cite nums={4} /> Structural reforms are under way — more than 160 designated surgical hubs now run single-specialty lists at high volume, delivering 20–30% productivity gains over general hospitals. The NHS used private hospital capacity worth £2 billion in 2022/23, with some trusts outsourcing over 20% of elective work. Yet the binding constraint remains workforce: the NHS carries 112,000 vacancies, and the number of consultants able to perform elective procedures has not kept pace with list growth.<Cite nums={5} /></p>
            </div>
          </section>

          {/* Positive story */}
          <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="Zero"
            unit="patients waiting over 2 years — down from 22,000 at the peak in 2021"
            description="Two-year waits, once thought impossible to eliminate from the NHS backlog, have been reduced to zero. The government's Elective Recovery Taskforce set a target of eliminating 2-year waits by July 2022, achieved broadly on time. Over 10 million elective procedures were completed in 2022/23, more than any previous year. The NHS Elective Care Reform Programme is expanding patient choice, creating surgical hubs, and using independent sector capacity. NICE has approved a &lsquo;book and choose&rsquo; model allowing patients to self-refer for some services. Waiting list data is now published monthly, improving transparency."
            source="Source: NHS England — Referral to Treatment Waiting Times Statistics, January 2024."
          />
          </ScrollReveal>

          <div className="mt-6">
            <References items={editorialRefs} />
          </div>

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
            <p className="font-mono text-xs text-wiah-mid mt-4">
              Data updated automatically via GitHub Actions. Last pipeline run:{' '}
              {new Date().toISOString().slice(0, 10)}.
            </p>
          </section>
        </section>
              <RelatedTopics />
      </main>
    </>
  );
}
