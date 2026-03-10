'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

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
          finding="Fraud accounts for 41% of all crime in England and Wales — an estimated 3.8 million offences per year — yet fewer than 1% of reported cases result in a conviction. Action Fraud, the national reporting centre, has been described by its own assessors as not fit for purpose."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The Crime Survey for England and Wales estimates 3.8 million fraud and computer misuse offences annually — more than burglary, robbery, vehicle crime, and violent crime combined. Yet fraud remains the least-policed crime in the country. Of the roughly 900,000 cases reported to Action Fraud each year, around 80,000 are referred to police forces for investigation. Fewer than 8,000 result in charges. The conviction rate, measured against reported cases, hovers at approximately 1%. For most victims, reporting fraud is an exercise in documentation rather than an entry point to justice.</p>
            <p>Action Fraud, run by the City of London Police on behalf of all 43 forces in England and Wales, was established in 2009 to centralise fraud reporting. In practice it operates as a call centre and data repository, not an investigative body. An HMICFRS inspection in 2019 found the system &ldquo;not fit for purpose,&rdquo; with victims receiving little or no follow-up. A replacement system, originally promised for 2024, has been repeatedly delayed. Meanwhile the Serious Fraud Office, responsible for the most complex cases, has seen its budget cut by a third in real terms since 2012 and has faced a string of high-profile case collapses.</p>
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
              changeText="41% of all crime · CSEW 2024 estimate"
              sparklineData={[2.5, 3.2, 3.4, 3.6, 3.8, 4.1, 4.5, 3.7, 3.5, 3.8]}
              source="ONS · Crime Survey for England and Wales, 2024"
              href="#sec-offences"
            />
            <MetricCard
              label="Fraud conviction rate"
              value="~1%"
              direction="down"
              polarity="up-is-good"
              changeText="Of reported cases · down from 3% in 2015"
              sparklineData={[3.1, 2.8, 2.5, 2.2, 1.9, 1.5, 1.2, 1.0, 0.8, 1.0]}
              source="Home Office · Crime Outcomes, 2024"
              href="#sec-offences"
            />
            <MetricCard
              label="APP scam losses"
              value="£485M"
              unit="/year"
              direction="up"
              polarity="up-is-bad"
              changeText="Authorised push payment fraud · 2023"
              sparklineData={[236, 354, 355, 479, 485]}
              source="UK Finance · Fraud Report, 2024"
              href="#sec-offences"
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
              title="Fraud conviction rate, 2015–2024"
              subtitle="Convictions as a percentage of reported fraud cases. England and Wales."
              series={convictionSeries}
              yLabel="Conviction rate (%)"
              source={{ name: 'Home Office', dataset: 'Crime Outcomes in England and Wales', frequency: 'annual' }}
            />
          </section>
        </ScrollReveal>
              <RelatedTopics />
      </main>
    </>
  );
}
