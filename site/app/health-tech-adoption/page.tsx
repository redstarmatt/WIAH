'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// ── Types ────────────────────────────────────────────────────────────────────

interface EprPoint {
  year: number;
  pct: number;
}

interface GpOnlinePoint {
  year: number;
  pct: number;
}

interface AiToolPoint {
  year: number;
  trustsUsing: number;
}

interface NhsAppPoint {
  year: number;
  millionUsers: number;
}

interface RegionData {
  region: string;
  pct: number;
}

interface HealthTechData {
  eprAdoption: EprPoint[];
  gpOnlineConsultations: GpOnlinePoint[];
  aiDiagnosticTools: AiToolPoint[];
  nhsAppRegistrations: NhsAppPoint[];
  eprByRegion: RegionData[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function HealthTechAdoptionPage() {
  const [data, setData] = useState<HealthTechData | null>(null);

  useEffect(() => {
    fetch('/data/health-tech-adoption/health_tech_adoption.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const eprSeries: Series[] = data
    ? [{
        id: 'epr',
        label: 'Trusts with full EPR (%)',
        colour: '#264653',
        data: data.eprAdoption.map(d => ({
          date: yearToDate(d.year),
          value: d.pct,
        })),
      }]
    : [];

  const gpOnlineSeries: Series[] = data
    ? [{
        id: 'gp-online',
        label: 'GP consultations online (%)',
        colour: '#2A9D8F',
        data: data.gpOnlineConsultations.map(d => ({
          date: yearToDate(d.year),
          value: d.pct,
        })),
      }]
    : [];

  const aiSeries: Series[] = data
    ? [{
        id: 'ai-tools',
        label: 'Trusts using AI diagnostic tools',
        colour: '#264653',
        data: data.aiDiagnosticTools.map(d => ({
          date: yearToDate(d.year),
          value: d.trustsUsing,
        })),
      }]
    : [];

  // ── Derived values ────────────────────────────────────────────────────

  const latestEpr = data?.eprAdoption[data.eprAdoption.length - 1];
  const earliestEpr = data?.eprAdoption[0];
  const latestGpOnline = data?.gpOnlineConsultations[data.gpOnlineConsultations.length - 1];
  const latestAi = data?.aiDiagnosticTools[data.aiDiagnosticTools.length - 1];
  const earliestAi = data?.aiDiagnosticTools[0];

  return (
    <>
      <TopicNav topic="Health Tech Adoption" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health Tech Adoption"
          question="Is the NHS Embracing Digital Health?"
          finding="NHS digital transformation is accelerating but remains deeply uneven. 68% of acute trusts now have full electronic patient records, up from 18% in 2015, and 112 trusts are using AI diagnostic tools in clinical practice. But a 28-percentage-point gap in EPR adoption between London and the North East reveals a digital divide that risks widening existing health inequalities."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The NHS has undergone a quiet revolution in how it handles patient information, clinical decisions, and access to care. A decade ago, most trusts relied on paper records, fax machines, and fragmented IT systems that could not talk to each other. Today, 68% of acute trusts have fully implemented electronic patient records that meet NHS England minimum standards, and the NHS App has reached 40 million registered users. The COVID-19 pandemic compressed what might have been a decade of change into 18 months: GP online consultations surged from 1% to over 30% of all appointments between 2019 and 2021, though that figure has since settled to around 28% as in-person care resumed.
            </p>
            <p>
              AI-powered diagnostic tools represent the next frontier. From radiology image analysis to sepsis early warning systems, 112 NHS trusts now have at least one NICE-approved or MHRA-registered AI tool in clinical use, up from just 3 in 2018. Early evidence suggests these tools can reduce diagnostic errors in breast screening by up to 20% and cut reporting times for chest X-rays from hours to minutes. However, adoption is concentrated in larger, better-funded trusts. Smaller district general hospitals, particularly in rural areas, often lack the infrastructure, data governance frameworks, and specialist staff needed to deploy and maintain these systems.
            </p>
            <p>
              The risk is clear: without deliberate investment in lagging regions, digital health will become another axis of the inverse care law, where the areas with the greatest health needs have the least access to modern tools. The 2025 Watt Review of NHS Digital Infrastructure recommended ring-fenced capital funding for EPR completion in the remaining 32% of trusts, a national AI deployment support service, and mandatory interoperability standards to ensure systems can share data across trust boundaries.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-epr', label: 'Electronic records' },
          { id: 'sec-gp-online', label: 'Online consultations' },
          { id: 'sec-ai', label: 'AI diagnostics' },
          { id: 'sec-regional', label: 'Regional' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Trusts with full EPR"
            value={latestEpr ? `${latestEpr.pct}%` : '68%'}
            unit="2025"
            direction="up"
            polarity="up-is-good"
            changeText={
              latestEpr && earliestEpr
                ? `up from ${earliestEpr.pct}% in ${earliestEpr.year} · target: 100% by 2030`
                : 'up from 18% in 2015'
            }
            sparklineData={
              data ? sparkFrom(data.eprAdoption.map(d => d.pct)) : []
            }
            source="NHS England · Digital Maturity Assessment, 2025"
            href="#sec-epr"
          />
          <MetricCard
            label="GP online consultation rate"
            value={latestGpOnline ? `${latestGpOnline.pct}%` : '28%'}
            unit="2025"
            direction="up"
            polarity="up-is-good"
            changeText="up from 1% pre-pandemic · peaked at 32.5% in 2022"
            sparklineData={
              data ? sparkFrom(data.gpOnlineConsultations.map(d => d.pct)) : []
            }
            source="NHS Digital · Appointments in General Practice, 2025"
            href="#sec-gp-online"
          />
          <MetricCard
            label="Trusts using AI diagnostics"
            value={latestAi ? latestAi.trustsUsing.toLocaleString() : '112'}
            unit="2025"
            direction="up"
            polarity="up-is-good"
            changeText={
              latestAi && earliestAi
                ? `up from ${earliestAi.trustsUsing} in ${earliestAi.year} · 37-fold increase`
                : 'up from 3 in 2018'
            }
            sparklineData={
              data ? sparkFrom(data.aiDiagnosticTools.map(d => d.trustsUsing)) : []
            }
            source="NHSX / NHS AI Lab · AI Programme Dashboard, 2025"
            href="#sec-ai"
          />
        </div>

        {/* Chart 1: EPR adoption */}
        <ScrollReveal>
          <div id="sec-epr" className="mb-12">
            <LineChart
              series={eprSeries}
              title="Acute NHS trusts with full electronic patient records, 2015–2025"
              subtitle="Percentage of trusts meeting NHS England minimum EPR standards. Target: 100% by 2030."
              yLabel="% of trusts"
              targetLine={{ value: 100, label: 'Target (2030)' }}
              source={{
                name: 'NHS England',
                dataset: 'Digital Maturity Assessment',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: GP online consultations */}
        <ScrollReveal>
          <div id="sec-gp-online" className="mb-12">
            <LineChart
              series={gpOnlineSeries}
              title="GP appointments conducted online or by video, 2015–2025"
              subtitle="Share of all GP consultations via digital channels. COVID-19 drove rapid adoption; usage has since stabilised."
              yLabel="% of appointments"
              annotations={[
                { date: new Date(2020, 2, 1), label: 'COVID-19 pandemic begins' },
              ]}
              source={{
                name: 'NHS Digital',
                dataset: 'Appointments in General Practice',
                frequency: 'monthly',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: AI diagnostic tools */}
        <ScrollReveal>
          <div id="sec-ai" className="mb-12">
            <LineChart
              series={aiSeries}
              title="NHS trusts using AI-powered diagnostic tools, 2018–2025"
              subtitle="Count of trusts with at least one NICE-approved or MHRA-registered AI tool in clinical use."
              yLabel="Trusts"
              source={{
                name: 'NHSX / NHS AI Lab',
                dataset: 'AI Programme Dashboard',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Regional variation */}
        <ScrollReveal>
          <div id="sec-regional" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-2">
                Electronic patient record adoption by NHS region (% of trusts)
              </h2>
              <p className="text-sm text-wiah-mid mb-6">
                London leads at 82%; the North East lags at 54% — a 28-percentage-point gap.
              </p>
              <div className="mt-6 space-y-4">
                {data?.eprByRegion.map((r) => {
                  const pct = (r.pct / 100) * 100;
                  return (
                    <div key={r.region}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{r.region}</span>
                        <span className="font-mono text-sm font-bold text-wiah-black">{r.pct}%</span>
                      </div>
                      <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{ width: `${pct}%`, backgroundColor: '#264653' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">Source: NHS England — Digital Maturity Assessment by region, 2025</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="AI diagnostics cutting breast screening errors"
            value="20%"
            unit="reduction in missed cancers"
            description="Early evidence from NHS trusts using AI-assisted mammography reading shows a reduction of up to 20% in missed cancers compared to standard double-reading by radiologists alone. The Mia platform, deployed across several NHS breast screening programmes, analyses mammograms in under 30 seconds and flags areas of concern for human review. In trusts using the technology, interval cancer rates — cancers detected between routine screenings — have fallen measurably. The NHS AI Lab has prioritised breast screening AI for national rollout, with 42 of 80 screening programmes expected to have access by 2027."
            source="Source: NHS AI Lab — AI in Breast Screening Evaluation, 2025. Lancet Digital Health meta-analysis, 2024."
          />
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p><strong>NHS England — Digital Maturity Assessment.</strong> Annual survey of acute NHS trusts measuring EPR implementation against minimum standards. Definition expanded in 2020 to include cloud-based systems; pre/post figures not directly comparable.</p>
            <p><strong>NHS Digital — Appointments in General Practice.</strong> Monthly publication of GP appointment volumes by consultation mode (face-to-face, telephone, online/video). Online consultation rate calculated as share of total booked appointments.</p>
            <p><strong>NHSX / NHS AI Lab — AI Programme Dashboard.</strong> Count of trusts with at least one NICE-approved or MHRA-registered AI tool deployed in clinical use. Includes both pilot and full rollout deployments; maturity varies significantly across trusts.</p>
            <p>Updated periodically as new data is published. Regional EPR figures reflect latest available assessment year.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
