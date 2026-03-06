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

interface RatePoint {
  year: number;
  ratePer1000: number;
}

interface ProvisionPoint {
  year: number;
  trustsWithProvisionPct: number;
}

interface BabyLossData {
  national: {
    stillbirthRate: {
      timeSeries: RatePoint[];
      latestYear: number;
      latestRate: number;
    };
    neonatalDeathRate: {
      timeSeries: RatePoint[];
      latestYear: number;
      latestRate: number;
    };
    bereavementMidwifeProvision: {
      timeSeries: ProvisionPoint[];
      latestYear: number;
      latestPct: number;
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

export default function BabyLossSupportPage() {
  const [data, setData] = useState<BabyLossData | null>(null);

  useEffect(() => {
    fetch('/data/baby-loss-support/baby_loss.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const mortalitySeries: Series[] = data
    ? [
        {
          id: 'stillbirths',
          label: 'Stillbirths per 1,000 births',
          colour: '#6B7280',
          data: data.national.stillbirthRate.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.ratePer1000,
          })),
        },
        {
          id: 'neonatal',
          label: 'Neonatal deaths per 1,000 live births',
          colour: '#E63946',
          data: data.national.neonatalDeathRate.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.ratePer1000,
          })),
        },
      ]
    : [];

  const provisionSeries: Series[] = data
    ? [
        {
          id: 'provision',
          label: '% trusts with bereavement midwife',
          colour: '#2A9D8F',
          data: data.national.bereavementMidwifeProvision.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.trustsWithProvisionPct,
          })),
        },
      ]
    : [];

  const mortalityAnnotations: Annotation[] = [
    { date: new Date(2015, 5, 1), label: "2015: Saving Babies' Lives Care Bundle launched" },
    { date: new Date(2019, 5, 1), label: '2019: NHS Long Term Plan 50% reduction target' },
  ];

  const provisionAnnotations: Annotation[] = [
    { date: new Date(2018, 5, 1), label: '2018: Bereavement Care Pathway published' },
    { date: new Date(2022, 5, 1), label: '2022: NHS England bereavement fund' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Baby Loss Support" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health"
          question="Are Bereaved Parents Getting the Support They Need?"
          finding="Around 1 in 4 pregnancies end in miscarriage. Over 3,000 stillbirths occur each year in England. Access to specialist bereavement support varies widely — only 55% of NHS trusts have dedicated bereavement midwives."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Approximately 250,000 pregnancy losses occur each year in the UK, the vast majority miscarriages. The stillbirth rate has fallen significantly since 2013 — from 4.2 to 3.3 per 1,000 births — driven by the NHS Saving Babies' Lives Care Bundle, which promotes better monitoring, reduced smoking in pregnancy, and earlier management of risk. The NHS Long Term Plan committed to halving the rates of stillbirth, neonatal death and maternal death by 2025, against 2010 baselines.
            </p>
            <p>
              But improvements in rates do not automatically translate to better support for bereaved parents. Only 55% of NHS trusts have a dedicated bereavement midwife — a role shown to reduce long-term psychological harm in parents. Miscarriage, which affects around one in four pregnancies, attracts minimal specialist support in most areas. The inequality in provision means that whether a bereaved parent receives compassionate specialist care depends largely on which trust they happen to deliver at.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-mortality', label: 'Stillbirths &amp; neonatal deaths' },
          { id: 'sec-support', label: 'Bereavement support' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Stillbirths per year (England)"
              value="3,300"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="Rate 3.3/1,000 births · Down from 4.2 in 2013"
              sparklineData={[4.2, 4.1, 4.1, 3.9, 3.8, 3.7, 3.6, 3.5, 3.4, 3.4, 3.3]}
              href="#sec-mortality"
            />
            <MetricCard
              label="Trusts with bereavement midwife"
              value="55%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Up from 28% in 2018 · But 45% still lack provision"
              sparklineData={[28, 33, 38, 42, 48, 52, 55]}
              href="#sec-mortality"
            />
            <MetricCard
              label="Annual pregnancy losses"
              value="250,000"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="~1 in 4 pregnancies · Majority receive no specialist support"
              sparklineData={[250, 252, 248, 251, 249, 250]}
              href="#sec-mortality"
            />
          </div>
        </ScrollReveal>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-mortality" className="mb-12">
            <LineChart
              title="Stillbirth and neonatal death rates, England and Wales, 2013–2023"
              subtitle="Stillbirths per 1,000 total births and neonatal deaths per 1,000 live births. Both have fallen consistently, but the NHS Long Term Plan's 50% reduction target by 2025 (against 2010 baseline) will not be fully met."
              series={mortalitySeries}
              annotations={mortalityAnnotations}
              yLabel="Rate per 1,000 births"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-support" className="mb-12">
            <LineChart
              title="NHS trusts with dedicated bereavement midwife, England, 2018–2024"
              subtitle="Percentage of maternity trusts with at least one dedicated bereavement midwife. Provision has nearly doubled since 2018 but 45% of trusts still have no dedicated role."
              series={provisionSeries}
              annotations={provisionAnnotations}
              yLabel="% of trusts"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="50%"
            unit="reduction target for stillbirths"
            description="The NHS Long Term Plan commits to reducing stillbirths and neonatal deaths by 50% by 2025, against a 2010 baseline. The Saving Babies' Lives Care Bundle, now in its second version, has driven significant improvement. Sands and Tommy's charities fund specialist bereavement support and advocate for national standards. The National Bereavement Care Pathway provides guidance for trusts on compassionate care following any pregnancy loss."
            source="Source: MBRRACE-UK — Perinatal Mortality Surveillance, 2024. Sands — Bereavement Care Survey, 2024."
          />
        </ScrollReveal>

        {/* Sources */}
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
