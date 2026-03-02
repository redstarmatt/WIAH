'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import SiteName from '@/components/SiteName';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import MetricDetailModal from '@/components/MetricDetailModal';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';

// ── Types ────────────────────────────────────────────────────────────────────

interface AbsencePoint {
  year: string;
  overallAbsencePct: number;
  persistentAbsencePct: number;
}

interface GapIndexPoint {
  year: string;
  index: number;
}

interface Attainment8Point {
  year: string;
  disadvantagedAtt8: number;
  otherAtt8: number;
  disadvantagedGrade5Pct: number;
  otherGrade5Pct: number;
  disadvantagedGrade4Pct: number;
  otherGrade4Pct: number;
}

interface EhcpCaseloadPoint {
  year: number;
  total: number;
}

interface EhcpTimeliness {
  year: number;
  withinWeeks20Pct: number;
  newEhcps?: number;
}

interface EducationData {
  national: {
    absence: { timeSeries: AbsencePoint[] };
    send: {
      ehcpCaseload: EhcpCaseloadPoint[];
      timeliness: EhcpTimeliness[];
    };
    attainment: {
      gapIndex: GapIndexPoint[];
      attainment8: Attainment8Point[];
    };
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function academicYearToDate(s: string): Date {
  // "2018-19" → Jan 2019 (end of academic year)
  const parts = s.split('-');
  if (parts.length === 2 && parts[1].length === 2) {
    const century = parseInt(parts[0].slice(0, 2));
    const endYear = century * 100 + parseInt(parts[1]);
    return new Date(endYear, 0, 1);
  }
  return new Date(parseInt(parts[0]), 0, 1);
}

function calendarYearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 12) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function EducationPage() {
  const [data, setData] = useState<EducationData | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data/education/education.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  // 1. Persistent absence
  const absenceSeries: Series[] = data
    ? [{
        id: 'persistent-absence',
        label: 'Persistent absence (%)',
        data: data.national.absence.timeSeries.map(d => ({
          date: academicYearToDate(d.year),
          value: d.persistentAbsencePct,
        })),
      }]
    : [];

  const absenceAnnotations: Annotation[] = [
    { date: new Date(2016, 0), label: '2015-16: 10% threshold' },
    { date: new Date(2020, 2), label: '2020: COVID-19' },
  ];

  // 2. EHCP caseload
  const ehcpCaseloadSeries: Series[] = data
    ? [{
        id: 'ehcp-caseload',
        label: 'EHCPs maintained',
        data: data.national.send.ehcpCaseload.map(d => ({
          date: calendarYearToDate(d.year),
          value: d.total,
        })),
      }]
    : [];

  // 3. EHCP timeliness
  const ehcpTimelinessSeries: Series[] = data
    ? [{
        id: 'ehcp-timeliness',
        label: '% issued within 20 weeks',
        data: data.national.send.timeliness.map(d => ({
          date: calendarYearToDate(d.year),
          value: d.withinWeeks20Pct,
        })),
      }]
    : [];

  // 4. Disadvantage gap index
  const gapIndexSeries: Series[] = data
    ? [{
        id: 'gap-index',
        label: 'Disadvantage gap index',
        data: data.national.attainment.gapIndex.map(d => ({
          date: academicYearToDate(d.year),
          value: d.index,
        })),
      }]
    : [];

  const gapAnnotations: Annotation[] = [
    { date: new Date(2020, 0), label: '2020: COVID-19' },
  ];

  // 5. Attainment 8 gap (dual series)
  const att8Series: Series[] = data
    ? [
        {
          id: 'att8-other',
          label: 'All other pupils',
          colour: '#0D1117',
          data: data.national.attainment.attainment8.map(d => ({
            date: academicYearToDate(d.year),
            value: d.otherAtt8,
          })),
        },
        {
          id: 'att8-disadvantaged',
          label: 'Disadvantaged pupils',
          colour: '#E63946',
          data: data.national.attainment.attainment8.map(d => ({
            date: academicYearToDate(d.year),
            value: d.disadvantagedAtt8,
          })),
        },
      ]
    : [];

  // ── Metric values ────────────────────────────────────────────────────────

  const latestAbsence = data?.national.absence.timeSeries.at(-1);
  const preCovidAbsence = data?.national.absence.timeSeries.find(
    d => d.year === '2018-19'
  );

  const latestGap = data?.national.attainment.gapIndex.at(-1);
  const preCovidGap = data?.national.attainment.gapIndex.find(
    d => d.year === '2019-20'
  );

  const latestEhcp = data?.national.send.ehcpCaseload.at(-1);
  const firstEhcp = data?.national.send.ehcpCaseload[0];


  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      {/* Sticky nav */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-wiah-border px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/"><SiteName size="nav" /></Link>
          <span className="text-wiah-mid text-sm font-mono">Education</span>
          <Link href="/" className="text-sm text-wiah-blue hover:underline">&larr; All topics</Link>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Education"
          question="What's Actually Happening in Schools?"
          finding={
            latestAbsence
              ? `1 in 5 pupils is persistently absent. The SEND system is overwhelmed — EHCPs have nearly tripled in a decade. The attainment gap between disadvantaged pupils and their peers has widened since the pandemic.`
              : 'Persistent absence has doubled since before the pandemic.'
          }
          colour="#2A9D8F"
        />

        {/* Metric cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Persistent absence"
            value={latestAbsence ? latestAbsence.persistentAbsencePct.toFixed(1) : '—'}
            unit="%"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestAbsence && preCovidAbsence
                ? `Up from ${preCovidAbsence.persistentAbsencePct}% in 2018-19`
                : 'Loading…'
            }
            sparklineData={
              data
                ? sparkFrom(data.national.absence.timeSeries.map(d => d.persistentAbsencePct))
                : []
            }
            source="DfE · Pupil absence 2023/24"
            onExpand={absenceSeries.length > 0 ? () => setExpanded('absence') : undefined}
          />
          <MetricCard
            label="EHCPs maintained"
            value={latestEhcp ? `${(latestEhcp.total / 1000).toFixed(0)}K` : '—'}
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestEhcp && firstEhcp
                ? `+${Math.round(((latestEhcp.total - firstEhcp.total) / firstEhcp.total) * 100)}% since ${firstEhcp.year}`
                : 'Loading…'
            }
            sparklineData={
              data
                ? sparkFrom(data.national.send.ehcpCaseload.map(d => d.total))
                : []
            }
            source="DfE · SEN2 return, Jan 2025"
            onExpand={ehcpCaseloadSeries.length > 0 ? () => setExpanded('ehcp') : undefined}
          />
          <MetricCard
            label="Disadvantage gap index"
            value={latestGap ? latestGap.index.toFixed(2) : '—'}
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestGap && preCovidGap
                ? `Up from ${preCovidGap.index} in 2019-20 · Higher = wider gap`
                : 'Higher = wider attainment gap'
            }
            sparklineData={
              data
                ? sparkFrom(data.national.attainment.gapIndex.map(d => d.index))
                : []
            }
            source="DfE · KS4 performance 2024/25"
            onExpand={gapIndexSeries.length > 0 ? () => setExpanded('gap') : undefined}
          />
        </div>

        {/* Chart 1: Persistent absence */}
        {absenceSeries.length > 0 ? (
          <LineChart
            title="Persistent absence, 2006–2024"
            subtitle="Percentage of pupils missing 10% or more of possible school sessions, England."
            series={absenceSeries}
            annotations={absenceAnnotations}
            yLabel="Percent"
            source={{
              name: 'Department for Education',
              dataset: 'Pupil absence in schools in England, 2023/24',
              frequency: 'annual',
              url: 'https://explore-education-statistics.service.gov.uk/find-statistics/pupil-absence-in-schools-in-england',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Chart 2: EHCP caseload growth */}
        {ehcpCaseloadSeries.length > 0 ? (
          <LineChart
            title="Education, health and care plans, 2015–2025"
            subtitle="Total EHCPs maintained by local authorities in England, January census."
            series={ehcpCaseloadSeries}
            yLabel="Plans"
            source={{
              name: 'Department for Education',
              dataset: 'Education, health and care plans, SEN2 return',
              frequency: 'annual',
              url: 'https://explore-education-statistics.service.gov.uk/find-statistics/education-health-and-care-plans',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Chart 3: EHCP timeliness */}
        {ehcpTimelinessSeries.length > 0 ? (
          <LineChart
            title="EHCP 20-week timeliness, 2014–2023"
            subtitle="Percentage of new EHCPs issued within the 20-week statutory deadline."
            series={ehcpTimelinessSeries}
            yLabel="Percent"
            source={{
              name: 'Department for Education',
              dataset: 'Education, health and care plans, 2025',
              frequency: 'annual',
              url: 'https://explore-education-statistics.service.gov.uk/find-statistics/education-health-and-care-plans',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Chart 4: Disadvantage gap index */}
        {gapIndexSeries.length > 0 ? (
          <LineChart
            title="Disadvantage gap index, 2010–2025"
            subtitle="Composite measure of the GCSE attainment gap between disadvantaged pupils and all others. Lower = smaller gap."
            series={gapIndexSeries}
            annotations={gapAnnotations}
            yLabel="Index"
            source={{
              name: 'Department for Education',
              dataset: 'Key stage 4 performance, 2024/25',
              frequency: 'annual',
              url: 'https://explore-education-statistics.service.gov.uk/find-statistics/key-stage-4-performance',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Chart 5: Attainment 8 gap */}
        {att8Series.length > 0 ? (
          <LineChart
            title="Attainment 8 score by disadvantage, 2018–2023"
            subtitle="Average Attainment 8 score for disadvantaged vs all other pupils, England."
            series={att8Series}
            yLabel="Score"
            source={{
              name: 'Department for Education',
              dataset: 'Key stage 4 performance: national characteristics',
              frequency: 'annual',
              url: 'https://explore-education-statistics.service.gov.uk/find-statistics/key-stage-4-performance',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Inline table: Grade 5+ pass rates by FSM */}
        {data && data.national.attainment.attainment8.length > 0 && (
          <section className="mb-12">
            <h3 className="text-lg font-bold text-wiah-black mb-1">
              Grade 5+ in English and maths by disadvantage
            </h3>
            <p className="text-sm text-wiah-mid font-mono mb-6">
              Percentage achieving grade 5 or above in English and maths GCSE.
            </p>
            <div className="divide-y divide-wiah-border">
              {data.national.attainment.attainment8.map(row => (
                <div key={row.year} className="py-3">
                  <div className="font-mono text-sm text-wiah-black mb-2">{row.year}</div>
                  <div className="flex items-center gap-4 mb-1">
                    <span className="text-xs text-wiah-mid w-36 shrink-0">All other pupils</span>
                    <div className="flex-1 bg-wiah-light rounded h-2">
                      <div
                        className="h-2 rounded"
                        style={{ width: `${row.otherGrade5Pct}%`, backgroundColor: '#0D1117' }}
                      />
                    </div>
                    <span className="font-mono text-sm font-bold w-14 text-right">
                      {row.otherGrade5Pct}%
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-wiah-mid w-36 shrink-0">Disadvantaged</span>
                    <div className="flex-1 bg-wiah-light rounded h-2">
                      <div
                        className="h-2 rounded"
                        style={{ width: `${row.disadvantagedGrade5Pct}%`, backgroundColor: '#E63946' }}
                      />
                    </div>
                    <span className="font-mono text-sm font-bold w-14 text-right" style={{ color: '#E63946' }}>
                      {row.disadvantagedGrade5Pct}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <p className="font-mono text-[11px] text-wiah-mid mt-3">
              <a
                href="https://explore-education-statistics.service.gov.uk/find-statistics/key-stage-4-performance"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Source: Department for Education, Key stage 4 performance: national characteristics
              </a>
            </p>
          </section>
        )}

        {/* Context */}
        <section className="max-w-2xl mt-8 mb-12">
          <h2 className="text-xl font-bold text-wiah-black mb-4">What&apos;s driving this</h2>
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Persistent absence has roughly doubled since before the pandemic. Before COVID-19,
              about 1 in 9 pupils missed 10% or more of school. By 2023-24, it was 1 in 5.
              The causes are complex: anxiety, long COVID, disengagement, and a shift in social
              norms around attendance. Absence is highest among disadvantaged pupils, widening
              the attainment gap further.
            </p>
            <p>
              The SEND system is under extraordinary pressure. The number of children with
              Education, Health and Care Plans has nearly tripled in a decade, from 240,000
              in 2015 to over 630,000 in 2025. Local authorities cannot keep up: fewer than
              half of new EHCPs are issued within the 20-week statutory deadline. SEND
              tribunal appeals have surged, and families win in almost every case — suggesting
              that initial decisions to refuse support are routinely wrong.
            </p>
            <p>
              The attainment gap between disadvantaged pupils and their peers narrowed
              steadily through the 2010s. COVID-19 reversed that progress. The disadvantage
              gap index has risen every year since 2020, and in 2024-25 stands at its highest
              level in over a decade. In concrete terms: just 25% of disadvantaged pupils
              achieve grade 5+ in English and maths, compared with 52% of all other pupils.
            </p>
            <p>
              These three crises are interconnected. Children who are persistently absent
              fall behind. Children with unmet SEND needs disengage from school. Disadvantaged
              children are disproportionately affected by both.
            </p>
          </div>
        </section>

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
                  {src.name} &mdash; {src.dataset} ({src.frequency})
                </a>
              </li>
            ))}
          </ul>
          <p className="font-mono text-xs text-wiah-mid mt-4">
            Persistent absence defined as missing 10%+ of possible sessions (threshold changed
            from 15% in 2015/16). Disadvantage gap index is a composite KS4 measure where lower
            values indicate a smaller gap. Attainment 8 averages across 8 GCSE-level qualifications.
            2019/20 and 2020/21 results based on centre/teacher assessed grades. EHCP caseload from
            annual SEN2 returns (January census); 2023 collection changed from aggregate to person-level.
          </p>
          <p className="font-mono text-xs text-wiah-mid mt-4">
            Data updated automatically via GitHub Actions. Last pipeline run:{' '}
            {new Date().toISOString().slice(0, 10)}.
          </p>
        </section>
      </main>

      {/* Expanded metric modals */}
      {expanded === 'absence' && (
        <MetricDetailModal
          title="Persistent absence, 2006–2024"
          subtitle="Percentage of pupils missing 10% or more of possible school sessions, England."
          series={absenceSeries}
          annotations={absenceAnnotations}
          yLabel="Percent"
          source={{
            name: 'Department for Education',
            dataset: 'Pupil absence in schools in England, 2023/24',
            frequency: 'annual',
            url: 'https://explore-education-statistics.service.gov.uk/find-statistics/pupil-absence-in-schools-in-england',
          }}
          onClose={() => setExpanded(null)}
        />
      )}
      {expanded === 'ehcp' && (
        <MetricDetailModal
          title="Education, health and care plans, 2015–2025"
          subtitle="Total EHCPs maintained by local authorities in England."
          series={ehcpCaseloadSeries}
          yLabel="Plans"
          source={{
            name: 'Department for Education',
            dataset: 'Education, health and care plans, SEN2 return',
            frequency: 'annual',
            url: 'https://explore-education-statistics.service.gov.uk/find-statistics/education-health-and-care-plans',
          }}
          onClose={() => setExpanded(null)}
        />
      )}
      {expanded === 'gap' && (
        <MetricDetailModal
          title="Disadvantage gap index, 2010–2025"
          subtitle="Composite measure of the GCSE attainment gap between disadvantaged pupils and all others."
          series={gapIndexSeries}
          annotations={gapAnnotations}
          yLabel="Index"
          source={{
            name: 'Department for Education',
            dataset: 'Key stage 4 performance, 2024/25',
            frequency: 'annual',
            url: 'https://explore-education-statistics.service.gov.uk/find-statistics/key-stage-4-performance',
          }}
          onClose={() => setExpanded(null)}
        />
      )}
    </>
  );
}
