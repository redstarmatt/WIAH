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

interface PtsdPoint {
  year: number;
  estimatedCasesThousands: number;
}

interface ClinicPoint {
  year: number;
  trustsWithClinicPct: number;
}

interface ReferralPoint {
  year: number;
  referralsThousands: number;
}

interface BirthTraumaData {
  national: {
    ptsdEstimates: {
      timeSeries: PtsdPoint[];
      latestYear: number;
      latestThousands: number;
    };
    birthTraumaClinics: {
      timeSeries: ClinicPoint[];
      latestYear: number;
      latestPct: number;
    };
    perinatalMhReferrals: {
      timeSeries: ReferralPoint[];
      latestYear: number;
      latestThousands: number;
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

export default function BirthTraumaPage() {
  const [data, setData] = useState<BirthTraumaData | null>(null);

  useEffect(() => {
    fetch('/data/birth-trauma/birth_trauma.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const ptsdSeries: Series[] = data
    ? [
        {
          id: 'ptsd',
          label: 'Estimated annual birth trauma PTSD cases',
          colour: '#E63946',
          data: data.national.ptsdEstimates.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.estimatedCasesThousands,
          })),
        },
      ]
    : [];

  const clinicSeries: Series[] = data
    ? [
        {
          id: 'clinics',
          label: '% trusts with birth trauma clinic',
          colour: '#2A9D8F',
          data: data.national.birthTraumaClinics.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.trustsWithClinicPct,
          })),
        },
        {
          id: 'referrals',
          label: 'Perinatal MH referrals (thousands)',
          colour: '#264653',
          data: data.national.perinatalMhReferrals.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.referralsThousands,
          })),
        },
      ]
    : [];

  const ptsdAnnotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: NICE NG201 recommends routine screening' },
    { date: new Date(2024, 5, 1), label: '2024: Birth Trauma Inquiry published' },
  ];

  const clinicAnnotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: NICE NG201 published' },
    { date: new Date(2023, 5, 1), label: '2023: NHS perinatal MH expansion' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Birth Trauma" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health"
          question="How Many Women Experience Birth Trauma?"
          finding="An estimated 30,000 women a year develop PTSD following birth. Only 22% of NHS trusts have a dedicated birth trauma service. Maternal mental health has worsened since 2019."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Birth trauma is a poorly-understood and significantly underdiagnosed condition. Around 3&ndash;4% of women who give birth develop post-traumatic stress disorder; many more experience significant distress that does not meet the diagnostic threshold. The causes include emergency procedures, pain that was inadequately managed, feeling out of control or not listened to, and experiencing the death or serious illness of a baby.
            </p>
            <p>
              Despite this scale, dedicated support is scarce. Only 22% of NHS maternity trusts have a birth trauma or birth reflections clinic. Many women who seek help are told to wait for generic IAPT (talking therapies) services, which often have no specialist perinatal training. The 2024 Birth Trauma Inquiry, commissioned by the All-Party Parliamentary Group, documented systemic failures and called for dedicated funding for birth trauma services in every trust.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-ptsd', label: 'PTSD estimates' },
          { id: 'sec-services', label: 'Service provision' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Women developing birth-related PTSD/year"
              value="30,000"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="~3-4% of births · Up from ~25,000 in 2018"
              sparklineData={[25, 26, 27, 28, 30, 31, 30]}
              href="#sec-ptsd"
            />
            <MetricCard
              label="Trusts with birth trauma service"
              value="22%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Up from 12% in 2020 · But 78% have no provision"
              sparklineData={[12, 15, 18, 20, 22]}
              href="#sec-ptsd"
            />
            <MetricCard
              label="Perinatal mental health referrals"
              value="42,000"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="+133% since 2019 · Growing awareness driving referrals"
              sparklineData={[18, 20, 25, 32, 38, 42]}
              href="#sec-ptsd"
            />
          </div>
        </ScrollReveal>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-ptsd" className="mb-12">
            <LineChart
              title="Estimated annual birth trauma PTSD cases, England, 2018&ndash;2024"
              subtitle="Estimated number of women developing PTSD following birth, based on birth counts and prevalence surveys. Actual rates may be higher due to underdiagnosis and women not presenting for help."
              series={ptsdSeries}
              annotations={ptsdAnnotations}
              yLabel="Thousands"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-services" className="mb-12">
            <LineChart
              title="Birth trauma clinic provision and perinatal MH referrals, 2019&ndash;2024"
              subtitle="Percentage of NHS trusts with a dedicated birth trauma clinic (left scale context) and total perinatal mental health referrals. The referral surge reflects service expansion but need exceeds capacity."
              series={clinicSeries}
              annotations={clinicAnnotations}
              yLabel="% trusts / thousands referrals"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s improving"
            value="NICE NG201"
            unit="routine birth trauma screening"
            description="The NICE guideline NG201 (2021) recommends routine screening for birth trauma at the six-week postnatal check. The Birth Trauma Inquiry 2024 has driven NHS commitments to expand specialist services. Perinatal mental health referrals have more than doubled since 2019 as new NHS Specialist Perinatal Mental Health Services reach more women. The Birth Trauma Association provides peer support and campaigning."
            source="Source: NHS England &mdash; Perinatal Mental Health MHMDS, 2024. Birth Trauma Association &mdash; Inquiry Evidence, 2024."
          />
        </ScrollReveal>

        {/* Sources */}
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
