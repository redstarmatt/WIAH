'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface ChargeRatePoint {
  year: number;
  rate: number;
}

interface ReportedPoint {
  year: number;
  count: number;
}

interface RapeProsecutionData {
  national: {
    chargeRate: ChargeRatePoint[];
    reportedOffences: ReportedPoint[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function RapeProsecutionPage() {
  const [data, setData] = useState<RapeProsecutionData | null>(null);

  useEffect(() => {
    fetch('/data/rape-prosecution/rape_prosecution.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chargeRateSeries: Series[] = data
    ? [{
        id: 'charge-rate',
        label: 'Charge rate (%)',
        colour: '#E63946',
        data: data.national.chargeRate.map(d => ({
          date: yearToDate(d.year),
          value: d.rate,
        })),
      }]
    : [];

  const reportedSeries: Series[] = data
    ? [{
        id: 'reported-offences',
        label: 'Reported offences',
        colour: '#6B7280',
        data: data.national.reportedOffences.map(d => ({
          date: yearToDate(d.year),
          value: d.count,
        })),
      }]
    : [];

  return (
    <>
      <TopicNav topic="Rape Prosecution" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Rape Prosecution"
          question="Why Do So Few Rape Cases Reach Court?"
          finding="Fewer than 3% of reported rapes result in a charge. The average wait from report to trial now exceeds 1,000 days. Despite a doubling in reporting since 2015, the number of prosecutions has barely recovered from a historic collapse."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Police in England and Wales recorded 68,400 rape offences in the year to March 2024 — double the figure from a decade earlier. Yet the charge rate collapsed from 7.5% in 2015 to just 1.4% in 2020, before a partial recovery to 2.9% in 2024. The Crown Prosecution Service refers to this period as the &ldquo;rape review crisis.&rdquo; At its lowest point, just 843 suspects were charged with rape in a single year — meaning that for the vast majority of the roughly 68,000 complainants, the criminal justice system delivered no meaningful outcome.</p>
            <p>The causes are structural, not incidental. Between 2016 and 2020, a shift in CPS policy — sometimes described as a &ldquo;risk aversion culture&rdquo; — led prosecutors to decline cases they judged unlikely to secure conviction, rather than testing them before juries. Police disclosure failures, driven by under-resourced digital forensics teams unable to process complainants' phone data within statutory timeframes, compounded the problem. The 2021 government review acknowledged the system had failed victims and committed to restoring charge volumes to 2016 levels by the end of 2024 — a target that has not been met.</p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-charge-rate', label: 'Charge Rate' },
          { id: 'sec-reported', label: 'Reported' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Rape charge rate"
              value="2.9%"
              direction="down"
              polarity="up-is-good"
              changeText="Down from 7.5% in 2015 · partial recovery from 1.4% low"
              sparklineData={[7.5, 5.6, 4.2, 3.0, 1.6, 1.4, 1.3, 2.1, 2.5, 2.9]}
              source="CPS · Violence Against Women and Girls Report, 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Reported rape offences"
              value="68,400"
              unit="/year"
              direction="up"
              polarity="up-is-bad"
              changeText="Doubled since 2015 · most do not reach court"
              sparklineData={[34292, 41186, 53977, 58657, 58856, 55130, 63136, 70633, 67125, 68400]}
              source="ONS · Police Recorded Crime, 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Average days report to trial"
              value="1,033"
              unit="days"
              direction="up"
              polarity="up-is-bad"
              changeText="Nearly 3 years from report to Crown Court trial"
              sparklineData={[450, 520, 600, 700, 780, 850, 920, 980, 1033]}
              source="Ministry of Justice · Criminal Court Statistics, 2024"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-charge-rate" className="mb-12">
            <LineChart
              title="Rape charge rate, England &amp; Wales, 2015–2024"
              subtitle="Percentage of police-recorded rapes resulting in a suspect being charged."
              series={chargeRateSeries}
              yLabel="Charge rate (%)"
              source={{ name: 'CPS', dataset: 'VAWG Annual Report', frequency: 'annual' }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-reported" className="mb-12">
            <LineChart
              title="Police-recorded rape offences, England &amp; Wales"
              subtitle="Annual count of rape offences recorded by police. Includes historical reports."
              series={reportedSeries}
              yLabel="Offences"
              source={{ name: 'ONS', dataset: 'Police Recorded Crime', frequency: 'annual' }}
            />
          </section>
        </ScrollReveal>
      </main>
    </>
  );
}
