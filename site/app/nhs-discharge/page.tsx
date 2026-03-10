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

interface NHSDischargeData {
  national: {
    delayedDischarges: {
      timeSeries: Array<{ year: number; dailyAverage: number }>;
      latestYear: number;
      latestDailyAverage: number;
      annualCostBillionGBP: number;
    };
    byReason: {
      timeSeries: Array<{ year: number; socialCareDelayPct: number }>;
      latestYear: number;
      latestSocialCarePct: number;
    };
    byDelayReason: Array<{ reason: string; pct: number }>;
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function NHSDischargePagePage() {
  const [data, setData] = useState<NHSDischargeData | null>(null);

  useEffect(() => {
    fetch('/data/nhs-discharge/nhs_discharge.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const delayedDischargeSeries: Series[] = data
    ? [{
        id: 'delays',
        label: 'Daily average patients (thousands)',
        colour: '#E63946',
        data: data.national.delayedDischarges.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.dailyAverage / 1000,
        })),
      }]
    : [];

  const delayedDischargeAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: COVID-19' },
    { date: new Date(2022, 0, 1), label: '2022: Record levels' },
  ];

  const socialCareDelaySeries: Series[] = data
    ? [{
        id: 'social-care',
        label: 'Social care delays (%)',
        colour: '#E63946',
        data: data.national.byReason.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.socialCareDelayPct,
        })),
      }]
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="NHS Discharge" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="NHS Discharge"
          question="Why Are 13,500 Hospital Patients Stuck in Beds Every Day?"
          finding="On average, 13,500 patients per day are medically fit for discharge but cannot leave hospital — occupying £1 billion worth of NHS bed days per year. Social care delays account for 42% of all delayed discharges. Delayed discharge is the single biggest driver of A&amp;E waits and ambulance handover times."
          colour="#E63946"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>On any given day in 2023, an average of 13,500 patients in English hospitals were medically fit for discharge but unable to leave — occupying beds that cost the NHS an estimated £1 billion per year. That figure has more than doubled since 2015, when the daily average stood at 5,200. Social care delays account for 42% of all delayed discharges, the largest single cause; awaiting care assessment adds a further 18%. Together, discharge-delayed patients occupy roughly one in eight of all acute hospital beds in England — a structural blockage embedded in the system long before the pandemic.</p>
            <p>The causes run upstream into social care, where 152,000 vacancies make it impossible to arrange home care packages quickly enough. Care home placements can take weeks to confirm. The two systems operate under different financial incentives: NHS trusts are penalised for keeping patients beyond their expected length of stay, but local authorities — responsible for commissioning social care packages — face no equivalent sanction for delays in arranging provision. The COVID-19 pandemic compounded pre-existing pressures: the 2021–22 surge created a post-acute wave of patients with complex needs, and a workforce already thinned by illness and burnout struggled to absorb them. In 2022, delayed discharge figures reached record levels unseen since collection began.</p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-delays', label: 'Discharge Delays' },
          { id: 'sec-social-care', label: 'Social Care' },
          { id: 'sec-reasons', label: 'By Reason' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Patients stranded in hospital daily (medically fit for discharge)"
              value="13,500"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 · Up from 5,200 in 2015 · Costs NHS £1bn per year in bed days · Worsening A&amp;E waits"
              sparklineData={[5.2, 5.8, 6.8, 7.2, 7.4, 3.8, 9.8, 12.5, 13.5]}
              href="#sec-delays"
            />
            <MetricCard
              label="Discharge delays caused by social care"
              value="42%"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 · Up from 35% in 2019 · Lack of home care packages · Care home shortages · Council funding cuts"
              sparklineData={[35, 28, 38, 41, 42]}
              href="#sec-delays"
            />
            <MetricCard
              label="Beds occupied by discharge-delayed patients"
              value="1 in 8"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 · 12.5% of all acute hospital beds · Direct cause of A&amp;E 12-hour waits · Ambulance handover delays"
              sparklineData={[3, 4, 5, 6, 6.5, 3.5, 8, 10, 12.5]}
              href="#sec-delays"
            />
          </div>
        

        <ScrollReveal>
          <section id="sec-delays" className="mb-12">
            <LineChart
              title="Patients medically fit for discharge but stuck in hospital, England, 2015–2023"
              subtitle="Daily average number of acute hospital patients who are medically fit for discharge but cannot leave."
              series={delayedDischargeSeries}
              annotations={delayedDischargeAnnotations}
              yLabel="Daily average patients (thousands)"
              source={{
                name: 'NHS England',
                dataset: 'Discharge Delays (Acute)',
                frequency: 'weekly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-social-care" className="mb-12">
            <LineChart
              title="Social care-related delays as share of total discharge delays, 2019–2023"
              subtitle="Percentage of discharge delays caused by lack of social care packages, care home places, or awaiting assessments."
              series={socialCareDelaySeries}
              yLabel="Social care delays (%)"
              source={{
                name: 'NHS England',
                dataset: 'Discharge Delays (Acute)',
                frequency: 'weekly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-reasons" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">Reasons for delayed discharge, England, 2023</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Primary reason why patients cannot be discharged despite being medically fit.</p>
            {data && (
              <div className="space-y-3">
                {data.national.byDelayReason.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-40 text-sm text-wiah-black flex-shrink-0">{item.reason}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{ width: `${(item.pct / 42) * 100}%`, backgroundColor: '#E63946' }}
                      />
                    </div>
                    <div className="w-16 text-right text-sm font-mono text-wiah-black">{item.pct}%</div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: NHS England — Discharge Delays Statistics 2023</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="15%"
            unit="reduction in discharge delays since the NHS Discharge Taskforce launched in 2022"
            description="The NHS Discharge Taskforce, established in autumn 2022, set a target to halve delayed discharges by April 2023 through improved co-ordination between NHS trusts and local authorities. £600 million was allocated to fund additional social care capacity, including domiciliary care and interim care home places. Hospital at Home services — providing acute-level care in patients' own homes — expanded to cover 10,000 virtual beds by 2023. The Discharge to Assess model, where patients are assessed for their long-term care needs after leaving hospital rather than before, has been rolled out nationally. NHS England 'Same Day Emergency Care' hubs are reducing unnecessary admissions."
            source="Source: NHS England — Discharge Delays Statistics 2023; NHSE — Urgent and Emergency Care Recovery Plan 2023."
          />
        </ScrollReveal>

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
