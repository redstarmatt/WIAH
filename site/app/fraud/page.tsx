'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface FraudTimeSeries {
  year: number;
  offences: number;
}

interface ConvictionTimeSeries {
  year: number;
  rate: number;
}

interface FraudData {
  national: {
    timeSeries: FraudTimeSeries[];
    convictionRate: ConvictionTimeSeries[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function FraudPage() {
  const [data, setData] = useState<FraudData | null>(null);

  useEffect(() => {
    fetch('/data/fraud/fraud.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const offencesSeries: Series[] = data
    ? [{
        id: 'fraud-offences',
        label: 'Fraud offences (CSEW estimate)',
        colour: '#E63946',
        data: data.national.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.offences,
        })),
      }]
    : [];

  const convictionSeries: Series[] = data
    ? [{
        id: 'conviction-rate',
        label: 'Conviction rate (%)',
        colour: '#6B7280',
        data: data.national.convictionRate.map(d => ({
          date: yearToDate(d.year),
          value: d.rate,
        })),
      }]
    : [];

  return (
    <>
      <TopicNav topic="Fraud" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Fraud"
          question="Why Does Almost No Fraud Get Prosecuted?"
          finding="Fraud accounts for 41% of all crime in England and Wales &mdash; an estimated 3.8 million offences per year &mdash; yet fewer than 1% of reported cases result in a conviction. Action Fraud, the national reporting centre, has been described by its own assessors as not fit for purpose."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The Crime Survey estimates 3.8 million fraud and computer misuse offences annually &mdash; more than burglary, robbery, vehicle crime, and violent crime combined. Yet fraud remains the least-policed crime in the country: of 900,000 cases reported to Action Fraud each year, around 80,000 are referred to police and fewer than 8,000 result in charges, giving a conviction rate of approximately 1%. An HMICFRS inspection in 2019 found Action Fraud &ldquo;not fit for purpose,&rdquo; and a replacement system has been repeatedly delayed. Authorised push payment scams cost UK consumers &pound;485 million in 2023; mandatory bank reimbursement rules were introduced in 2024 capping liability at &pound;85,000 per claim. An estimated 85% of fraud goes unreported entirely.</p>
            <p>The burden falls disproportionately on older people and the digitally excluded: over-65s lose an average of &pound;3,800 per incident compared with &pound;1,200 for those aged 25&ndash;34, and fraud targeting pension savings has risen sharply since the 2015 pension freedoms. Ethnic minority communities are more frequently targeted by immigration-related scams and bogus visa services. The emotional impact of fraud is consistently underestimated &mdash; studies report depression, anxiety, and shame at rates comparable to victims of violent crime.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-offences', label: 'Offences' },
          { id: 'sec-convictions', label: 'Convictions' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Estimated fraud offences"
              value="3.8M"
              unit="/year"
              direction="up"
              polarity="up-is-bad"
              changeText="41% of all crime &middot; CSEW 2024 estimate"
              sparklineData={[2.5, 3.2, 3.4, 3.6, 3.8, 4.1, 4.5, 3.7, 3.5, 3.8]}
              source="ONS &middot; Crime Survey for England and Wales, 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Fraud conviction rate"
              value="~1%"
              direction="down"
              polarity="up-is-good"
              changeText="Of reported cases &middot; down from 3% in 2015"
              sparklineData={[3.1, 2.8, 2.5, 2.2, 1.9, 1.5, 1.2, 1.0, 0.8, 1.0]}
              source="Home Office &middot; Crime Outcomes, 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="APP scam losses"
              value="&pound;485M"
              unit="/year"
              direction="up"
              polarity="up-is-bad"
              changeText="Authorised push payment fraud &middot; 2023"
              sparklineData={[236, 354, 355, 479, 485]}
              source="UK Finance &middot; Fraud Report, 2024"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-offences" className="mb-12">
            <LineChart
              title="Estimated fraud offences, England &amp; Wales"
              subtitle="Crime Survey for England and Wales estimates. Includes fraud and computer misuse."
              series={offencesSeries}
              yLabel="Offences"
              source={{ name: 'ONS', dataset: 'Crime Survey for England and Wales', frequency: 'annual' }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-convictions" className="mb-12">
            <LineChart
              title="Fraud conviction rate, 2015&ndash;2024"
              subtitle="Convictions as a percentage of reported fraud cases. England and Wales."
              series={convictionSeries}
              yLabel="Conviction rate (%)"
              source={{ name: 'Home Office', dataset: 'Crime Outcomes in England and Wales', frequency: 'annual' }}
            />
          </section>
        </ScrollReveal>
      </main>
    </>
  );
}
