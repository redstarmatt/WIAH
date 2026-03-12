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

interface DataPoint {
  year: number;
  daysLostM: number;
  avgDaysPerWorker: number;
  mentalHealthPct: number;
  mskPct: number;
  absenceRate: number;
}

interface SectorData {
  sector: string;
  avgDaysPerWorker: number;
  absenceRate: number;
}

interface TopicData {
  national: { timeSeries: DataPoint[] };
  bySector: SectorData[];
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function SicknessAbsencePage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/sickness-absence/sickness_absence.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const daysLostSeries: Series[] = data
    ? [{
        id: 'days-lost',
        label: 'Working days lost (millions)',
        colour: '#E63946',
        data: data.national.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.daysLostM,
        })),
      }]
    : [];

  const causeSeries: Series[] = data
    ? [
        {
          id: 'mental-health',
          label: 'Mental health (%)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.mentalHealthPct,
          })),
        },
        {
          id: 'msk',
          label: 'Musculoskeletal (%)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.mskPct,
          })),
        },
      ]
    : [];

  const rateSeries: Series[] = data
    ? [{
        id: 'absence-rate',
        label: 'Absence rate (%)',
        colour: '#6B7280',
        data: data.national.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.absenceRate,
        })),
      }]
    : [];

  const daysLostAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: COVID furlough distorts figures' },
    { date: new Date(2022, 0, 1), label: '2022: Post-pandemic surge to record levels' },
  ];

  const causeAnnotations: Annotation[] = [
    { date: new Date(2022, 0, 1), label: '2022: Mental health overtakes MSK' },
  ];

  const rateAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: Furlough suppresses recorded absence' },
  ];

  // ── Derived metric values ─────────────────────────────────────────────

  const latest = data?.national.timeSeries[data.national.timeSeries.length - 1];
  const pre2019 = data?.national.timeSeries.find(d => d.year === 2019);
  const daysChange = latest && pre2019
    ? Math.round(((latest.daysLostM - pre2019.daysLostM) / pre2019.daysLostM) * 100)
    : 29;

  return (
    <>
      <TopicNav topic="Sickness Absence" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy & Work"
          question="How Many Working Days Is Britain Losing to Illness?"
          finding="192 million working days were lost to sickness absence in 2025 — an all-time record. Mental health conditions are now the leading cause of long-term absence, overtaking musculoskeletal problems for the first time in 2022. The absence rate has reached 2.7%, the highest in over a decade."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Britain is losing more working days to illness than at any point since records began. The 192 million days lost in 2025 represents a 29% increase on 2019 levels, and the trend shows no sign of reversing. The average worker now loses 5.7 days per year to sickness, up from 4.4 days before the pandemic. This is not a temporary post-COVID hangover — it reflects a structural shift in the relationship between work and health that was accelerated, but not caused, by the pandemic.
            </p>
            <p>
              The composition of absence has changed as dramatically as the volume. Mental health conditions — stress, anxiety, depression and burnout — have risen from 13% of all sickness absence in 2015 to 24% in 2025, overtaking musculoskeletal problems as the single largest cause. The Health Foundation estimates the annual cost to the economy at over 43 billion pounds when reduced productivity is included alongside direct absence. The public sector is hit hardest: health and social care workers lose 8.2 days per year on average, more than double the rate in professional services.
            </p>
            <p>
              These figures matter because they sit at the intersection of three crises the site tracks — health, work, and public services. Rising absence in the NHS workforce compounds waiting list pressures. Rising absence in schools exacerbates the teacher shortage. And rising mental health absence reflects a system where demand for psychological support vastly outstrips supply. The data below draws on ONS Labour Force Survey figures, CIPD employer surveys, and Health Foundation analysis.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-days-lost', label: 'Days lost' },
          { id: 'sec-causes', label: 'By cause' },
          { id: 'sec-rate', label: 'Absence rate' },
          { id: 'sec-sector', label: 'By sector' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Working days lost (2025)"
            value="192m"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText={`Record high · up ${daysChange}% since 2019`}
            sparklineData={
              data ? sparkFrom(data.national.timeSeries.map(d => d.daysLostM)) : []
            }
            source="ONS · Sickness absence in the labour market, 2025"
            href="#sec-days-lost"
          />
          <MetricCard
            label="Mental health share of absence"
            value={latest ? `${latest.mentalHealthPct}%` : '24%'}
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Now top cause · overtook back pain in 2022"
            sparklineData={
              data ? sparkFrom(data.national.timeSeries.map(d => d.mentalHealthPct)) : []
            }
            source="CIPD · Health and wellbeing at work survey, 2025"
            href="#sec-causes"
          />
          <MetricCard
            label="Average days lost per worker"
            value={latest ? latest.avgDaysPerWorker.toFixed(1) : '5.7'}
            unit="days/year"
            direction="up"
            polarity="up-is-bad"
            changeText="Up from 4.4 days in 2019 · highest since 2004"
            sparklineData={
              data ? sparkFrom(data.national.timeSeries.map(d => d.avgDaysPerWorker)) : []
            }
            source="ONS · Labour Force Survey, 2025"
            href="#sec-rate"
          />
        </div>

        {/* Chart 1: Total days lost */}
        <ScrollReveal>
          <div id="sec-days-lost" className="mb-12">
            <LineChart
              series={daysLostSeries}
              title="Working days lost to sickness absence, UK, 2010–2025"
              subtitle="Estimated working days lost per year. 2020 is distorted by furlough — many sick workers were furloughed rather than recorded as absent."
              yLabel="Days lost (millions)"
              annotations={daysLostAnnotations}
              source={{
                name: 'ONS',
                dataset: 'Sickness absence in the labour market',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Cause breakdown */}
        <ScrollReveal>
          <div id="sec-causes" className="mb-12">
            <LineChart
              series={causeSeries}
              title="Sickness absence by cause, UK, 2010–2025"
              subtitle="Share of total sickness days attributable to mental health conditions versus musculoskeletal conditions. Mental health overtook MSK as the leading single cause in 2022."
              yLabel="Share of absence (%)"
              annotations={causeAnnotations}
              source={{
                name: 'CIPD',
                dataset: 'Health and wellbeing at work survey',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Absence rate */}
        <ScrollReveal>
          <div id="sec-rate" className="mb-12">
            <LineChart
              series={rateSeries}
              title="Sickness absence rate, UK, 2010–2025"
              subtitle="Percentage of working hours lost to sickness absence. Fell steadily pre-pandemic, then jumped to levels not seen since the early 2000s."
              yLabel="Absence rate (%)"
              annotations={rateAnnotations}
              source={{
                name: 'ONS',
                dataset: 'Labour Force Survey — sickness absence',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Sector breakdown */}
        <ScrollReveal>
          <div id="sec-sector" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Average days lost per worker by sector, 2024/25
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                Health and social care workers lose nearly three times as many days to sickness as those in professional services.
              </p>
              <div className="mt-6 space-y-4">
                {data?.bySector.map((s) => {
                  const pct = (s.avgDaysPerWorker / 9) * 100;
                  return (
                    <div key={s.sector}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{s.sector}</span>
                        <span className="font-mono text-sm font-bold text-wiah-black">{s.avgDaysPerWorker} days</span>
                      </div>
                      <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{ width: `${pct}%`, backgroundColor: s.avgDaysPerWorker >= 6 ? '#E63946' : '#6B7280' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">Source: ONS — Labour Force Survey, sickness absence by industry, 2024/25</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Fit Note reform — GPs can now recommend work adjustments"
            value="23%"
            unit="of Fit Notes now recommend adjustments"
            description="From 2022, Fit Notes can be issued by a range of healthcare professionals, not just GPs, and can recommend specific workplace adjustments rather than just 'not fit for work'. Early evaluation shows 23% of Fit Notes in 2024 recommended a phased return with adjustments, up from 8% in 2021. Evidence from the 'What Works Centre for Wellbeing' shows that workplace mental health interventions delivering an average return of 5 pounds for every 1 pound invested. The government's Disability Action Plan targets 1 million more disabled people in work by 2027, supported by expanded access to individual placement and support programmes."
            source="Source: DWP — Fit Note reform evaluation, 2024. What Works Centre for Wellbeing — Workplace interventions review, 2023. ONS — Sickness absence in the labour market, 2025."
          />
        </ScrollReveal>

        <RelatedTopics />

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                  {src.name} — {src.dataset}
                </a>
                <div className="text-xs text-wiah-mid">Updated {src.frequency}</div>
              </div>
            ))}
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Methodology</h3>
            <p>{data?.metadata.methodology}</p>
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Known issues</h3>
            <ul className="list-disc list-inside space-y-1">
              {data?.metadata.knownIssues.map((x, i) => <li key={i}>{x}</li>)}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
