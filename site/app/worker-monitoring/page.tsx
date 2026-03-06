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

interface MonitoringAdoptionPoint {
  year: number;
  employersMonitoringPct: number;
}

interface IcoInvestigationsPoint {
  year: number;
  investigations: number;
}

interface WellbeingImpactPoint {
  year: number;
  reportHarmPct: number;
}

interface WorkerMonitoringData {
  national: {
    employerMonitoringAdoption: {
      timeSeries: MonitoringAdoptionPoint[];
      latestYear: number;
      latestPct: number;
      note: string;
    };
    icoInvestigations: {
      timeSeries: IcoInvestigationsPoint[];
      latestYear: number;
      latestCount: number;
      note: string;
    };
    workerWellbeingImpact: {
      timeSeries: WellbeingImpactPoint[];
      latestYear: number;
      latestPct: number;
      note: string;
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

// ── Page ─────────────────────────────────────────────────────────────────────

export default function WorkerMonitoringPage() {
  const [data, setData] = useState<WorkerMonitoringData | null>(null);

  useEffect(() => {
    fetch('/data/worker-monitoring/worker_monitoring.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const adoptionSeries: Series[] = data
    ? [{
        id: 'adoption',
        label: 'Employers using monitoring software (%)',
        colour: '#6B7280',
        data: data.national.employerMonitoringAdoption.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.employersMonitoringPct,
        })),
      }]
    : [];

  const icoSeries: Series[] = data
    ? [{
        id: 'icoInvestigations',
        label: 'ICO monitoring investigations',
        colour: '#E63946',
        data: data.national.icoInvestigations.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.investigations,
        })),
      }]
    : [];

  const adoptionAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Pandemic forces mass homeworking' },
    { date: new Date(2023, 5, 1), label: '2023: ICO Employment Practices Code updated' },
  ];

  const icoAnnotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: First wave of post-pandemic monitoring complaints' },
    { date: new Date(2024, 5, 1), label: '2024: Employment Rights Bill monitoring disclosure clause' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Worker Monitoring" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Worker Monitoring &amp; Surveillance"
          question="Is Your Employer Watching Your Every Move?"
          finding="Employee monitoring software use increased 380% during the pandemic and has not declined. 7 in 10 employers now use some form of productivity monitoring. ICO investigations into unlawful monitoring have doubled since 2021."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              When workforces moved home in 2020, a significant proportion of employers responded by deploying digital monitoring software. Keystroke logging, screen capture at timed intervals, website tracking, email scanning, GPS tracking of delivery workers — the market for employee surveillance technology grew by an estimated 380% between 2019 and 2020 alone. By 2024, seven in ten UK employers were using at least one form of productivity monitoring, a level that has not declined as workers returned to offices.
            </p>
            <p>
              The legal framework is clear but widely flouted. The ICO's Employment Practices Code requires that monitoring be necessary, proportionate, transparent, and lawful under GDPR and the Data Protection Act 2018. Covert monitoring — of which workers are unaware — is unlawful except in very limited circumstances. Yet ICO investigations into unlawful monitoring have risen from 8 in 2019 to 35 in 2024, suggesting a significant and growing compliance deficit. The psychological consequences are also measurable: 45% of workers in surveyed companies with monitoring programmes report that it damages their wellbeing, trust, or ability to concentrate, according to TUC/YouGov data.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-adoption', label: 'Adoption Rate' },
          { id: 'sec-ico', label: 'ICO Investigations' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Employers using productivity monitoring"
              value="72%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 22% in 2019 · Keystroke logging, screen capture, GPS"
              sparklineData={[22, 62, 65, 68, 70, 72]}
              onExpand={() => {}}
            />
            <MetricCard
              label="ICO monitoring investigations"
              value="35"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+338% since 2019 · Unlawful covert monitoring main issue"
              sparklineData={[8, 12, 18, 22, 28, 35]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Workers citing monitoring harm to wellbeing"
              value="45%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="TUC/YouGov 2024 · Anxiety, distrust, chilling effect on work"
              sparklineData={[38, 42, 45]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-adoption" className="mb-12">
            <LineChart
              title="Employers using productivity monitoring software, UK, 2019–2024"
              subtitle="Percentage of UK employers with at least one digital productivity monitoring tool deployed. Jumped from 22% to 62% during the 2020 pandemic and has continued rising since."
              series={adoptionSeries}
              annotations={adoptionAnnotations}
              yLabel="% of employers"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-ico" className="mb-12">
            <LineChart
              title="ICO investigations into employee monitoring, 2019–2024"
              subtitle="Formal ICO investigations and regulatory enquiries relating to unlawful or disproportionate workplace surveillance. More than fourfold increase since 2019."
              series={icoSeries}
              annotations={icoAnnotations}
              yLabel="Number of investigations"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="ICO Employment Practices Code 2023"
            unit=""
            description="ICO's 2023 Employment Practices Code sets out lawful monitoring requirements clearly for employers. The Employment Rights Bill includes new obligations on employers to disclose monitoring practices to workers before deployment. Trade unions are increasingly negotiating &lsquo;monitoring charters&rsquo; as part of collective agreements. The TUC has published model workplace agreements on technological monitoring that provide a template for negotiation."
            source="Source: ICO — Employment Practices Code 2023; TUC — Worker surveillance: your rights 2024."
          />
        </ScrollReveal>

        {/* Sources */}
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
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
