'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface ZeroHoursData {
  national: {
    workers: {
      timeSeries: Array<{ date: string; workersThousands: number }>;
    };
    bySector: {
      timeSeries: Array<{
        date: string;
        hospitality: number;
        retail: number;
        healthSocialCare: number;
        education: number;
      }>;
    };
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: string): Date {
  return new Date(parseInt(y), 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ZeroHoursContractsPage() {
  const [data, setData] = useState<ZeroHoursData | null>(null);

  useEffect(() => {
    fetch('/data/zero-hours-contracts/zero_hours_contracts.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const workersSeries: Series[] = data
    ? [{
        id: 'zhc-workers',
        label: 'Workers on zero-hours contracts (thousands)',
        colour: '#E63946',
        data: data.national.workers.timeSeries.map(d => ({
          date: yearToDate(d.date),
          value: d.workersThousands,
        })),
      }]
    : [];

  const sectorSeries: Series[] = data
    ? [
        {
          id: 'hospitality',
          label: 'Hospitality',
          colour: '#E63946',
          data: data.national.bySector.timeSeries.map(d => ({
            date: yearToDate(d.date),
            value: d.hospitality,
          })),
        },
        {
          id: 'retail',
          label: 'Retail',
          colour: '#F4A261',
          data: data.national.bySector.timeSeries.map(d => ({
            date: yearToDate(d.date),
            value: d.retail,
          })),
        },
        {
          id: 'health-social-care',
          label: 'Health &amp; social care',
          colour: '#264653',
          data: data.national.bySector.timeSeries.map(d => ({
            date: yearToDate(d.date),
            value: d.healthSocialCare,
          })),
        },
        {
          id: 'education',
          label: 'Education',
          colour: '#2A9D8F',
          data: data.national.bySector.timeSeries.map(d => ({
            date: yearToDate(d.date),
            value: d.education,
          })),
        },
      ]
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Zero-Hours Contracts" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Zero-Hours Contracts"
          question="How Many Workers Have No Guaranteed Hours?"
          finding="Over 1.1 million workers in the UK are on zero-hours contracts &mdash; a figure that has nearly trebled since 2013 &mdash; leaving them without sick pay entitlement, pension auto-enrolment, or predictable income."
          colour="#E63946"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Zero-hours contracts have become one of the defining features of the modern UK labour market. The ONS Labour Force Survey recorded approximately 1.1 million workers on zero-hours contracts in late 2024 &mdash; nearly three times the 400,000 estimated in 2013 when consistent measurement began. These contracts guarantee no minimum hours, meaning employers can offer shifts as needed while workers have no certainty about their weekly income. Accommodation and food services, retail, and health and social care together account for over 60% of all zero-hours contract workers. The Resolution Foundation estimates that zero-hours workers earn on average &pound;6,200 less per year than comparable employees on standard contracts. Legal protections have evolved slowly: the 2015 ban on exclusivity clauses went largely unenforced, the Taylor Review&apos;s &ldquo;dependent contractor&rdquo; recommendation was never implemented, and the Good Work Plan&apos;s 2018 right to request a predictable contract after 26 weeks has seen negligible take-up. The fundamental asymmetry remains: employers retain full flexibility while workers bear all the income risk.</p>
            <p>The distribution of zero-hours contracts is heavily skewed by age, ethnicity, and region. Workers aged 16&ndash;24 are four times more likely to be on these contracts than those aged 35&ndash;49; Black and minority ethnic workers are 50% more likely than white workers, according to TUC analysis; and women make up 54% of zero-hours workers, reflecting the dominance of care work and part-time retail. Geographically, concentrations are highest in coastal and rural tourism-dependent economies. The intersection with Universal Credit creates particular hardship: variable earnings trigger constant reassessment, payment delays, and the risk of overpayments that must be repaid. The Employment Rights Bill (2024) will give zero-hours workers the right to request a guaranteed-hours contract after 12 weeks of regular work &mdash; the most significant proposed reform to this area in a generation, though secondary legislation has yet to be laid.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-workers', label: 'Workers' },
          { id: 'sec-sectors', label: 'By Sector' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Workers on zero-hours contracts"
              value="1.1M"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 &middot; Nearly trebled since 2013 &middot; No guaranteed hours, sick pay, or pension"
              sparklineData={[400, 624, 744, 801, 883, 780, 896, 1004, 982, 1028, 1030, 1100]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Zero-hours workers in hospitality"
              value="35%"
              direction="up"
              polarity="up-is-bad"
              changeText="Highest sector share &middot; Tourism and food services dominate"
              sparklineData={[27, 29, 30, 31, 32, 31, 33, 34, 34, 35]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Average weekly hours (zero-hours)"
              value="25.3"
              direction="flat"
              polarity="up-is-good"
              changeText="Hours vary widely week to week &middot; 25% want more hours but cannot get them"
              sparklineData={[24.8, 25.1, 24.9, 25.0, 25.2, 25.4, 25.1, 25.0, 25.2, 25.3]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-workers" className="mb-12">
            <LineChart
              title="Workers on zero-hours contracts, UK, 2013&ndash;2024"
              subtitle="Number of workers reporting a zero-hours contract as their main employment, thousands."
              series={workersSeries}
              yLabel="Thousands"
              source={{
                name: 'ONS',
                dataset: 'Labour Force Survey &mdash; EMP17',
                frequency: 'quarterly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-sectors" className="mb-12">
            <LineChart
              title="Zero-hours workers by sector, UK, 2016&ndash;2024"
              subtitle="Workers on zero-hours contracts by major industry sector, thousands."
              series={sectorSeries}
              yLabel="Thousands"
              source={{
                name: 'ONS',
                dataset: 'Labour Force Survey &mdash; Industry Breakdown',
                frequency: 'quarterly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s changing"
            value="Employment Rights Bill"
            unit="(2024)"
            description="The Employment Rights Bill (2024) will give zero-hours workers the right to request a guaranteed-hours contract after 12 weeks of regular work &mdash; the biggest reform to employment rights in a generation. The Bill also proposes ending &ldquo;fire and rehire&rdquo; practices and strengthening day-one rights to unfair dismissal protection. If fully implemented, an estimated 900,000 workers could gain the right to a predictable contract."
            source="Source: ONS &mdash; Labour Force Survey EMP17 2024; CIPD &mdash; Zero-Hours Contracts Survey 2024; TUC &mdash; Insecure Work Report 2024."
          />
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                  {src.name} &mdash; {src.dataset}
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
              {data?.metadata.knownIssues.map((issue, i) => (
                <li key={i}>{issue}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
