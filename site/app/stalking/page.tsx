'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface RecordedPoint {
  year: number;
  count: number;
}

interface ChargeRatePoint {
  year: number;
  rate: number;
}

interface StalkingData {
  national: {
    recordedOffences: RecordedPoint[];
    chargeRate: ChargeRatePoint[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function StalkingPage() {
  const [data, setData] = useState<StalkingData | null>(null);

  useEffect(() => {
    fetch('/data/stalking/stalking.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const recordedSeries: Series[] = data
    ? [{
        id: 'recorded-offences',
        label: 'Recorded offences',
        colour: '#E63946',
        data: data.national.recordedOffences.map(d => ({
          date: yearToDate(d.year),
          value: d.count,
        })),
      }]
    : [];

  const chargeRateSeries: Series[] = data
    ? [{
        id: 'charge-rate',
        label: 'Charge rate (%)',
        colour: '#6B7280',
        data: data.national.chargeRate.map(d => ({
          date: yearToDate(d.year),
          value: d.rate,
        })),
      }]
    : [];

  return (
    <>
      <TopicNav topic="Stalking" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Stalking"
          question="Why Is Stalking So Rarely Prosecuted?"
          finding="Police recorded 131,000 stalking offences in 2024 — a 33-fold increase from 2015 — but the charge rate has fallen to just 2.5%. Stalking remains one of the most under-enforced crimes in England and Wales, with victims routinely reporting that their cases are not taken seriously."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Stalking became a specific criminal offence in England and Wales in 2012. Before that, behaviour now classified as stalking was prosecuted — when it was prosecuted at all — under the broader offence of harassment. The introduction of dedicated stalking offences, combined with changes to police recording practices, has driven an extraordinary rise in recorded crime: from 3,900 offences in 2015 to 131,000 in 2024. This increase is overwhelmingly a measurement effect, reflecting better recognition and recording rather than a sudden epidemic of new behaviour. The Crime Survey for England and Wales estimates that 1.5 million adults experience stalking each year — a figure that has been broadly stable for a decade.</p>
            <p>Despite the surge in recording, the criminal justice response remains weak. The charge rate for stalking offences has fallen from 8.2% in 2015 to 2.5% in 2024. HMICFRS inspections have repeatedly found that police forces lack specialist knowledge of stalking behaviour, frequently miscategorise cases as lower-level harassment, and fail to conduct risk assessments designed to identify escalation patterns. The Suzy Lamplugh Trust, the leading stalking charity, reports that the average victim experiences 100 incidents before police take action. Stalking Protection Orders, introduced in 2020, were designed as a civil tool to provide immediate protection, but uptake has been slow: only 900 were issued in 2023, against an estimated need of tens of thousands.</p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-recorded', label: 'Recorded' },
          { id: 'sec-charge', label: 'Charge Rate' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Recorded stalking offences"
              value="131,000"
              unit="/year"
              direction="up"
              polarity="up-is-bad"
              changeText="33x increase since 2015 · mostly improved recording"
              sparklineData={[3900, 10200, 20600, 31800, 48800, 79000, 94000, 107000, 120000, 131000]}
              source="ONS · Police Recorded Crime, 2024"
              href="#sec-recorded"
            />
            <MetricCard
              label="Stalking charge rate"
              value="2.5%"
              direction="down"
              polarity="up-is-good"
              changeText="Down from 8.2% in 2015 · 94% of domestic homicides involved stalking"
              sparklineData={[8.2, 6.5, 5.1, 4.3, 3.8, 3.2, 2.9, 2.6, 2.4, 2.5]}
              source="Home Office · Crime Outcomes, 2024"
              href="#sec-recorded"
            />
            <MetricCard
              label="Stalking Protection Orders"
              value="900"
              unit="/year"
              direction="up"
              polarity="up-is-good"
              changeText="Issued in 2023 · far below estimated need"
              sparklineData={[0, 190, 410, 620, 900]}
              source="Ministry of Justice · Family Court Statistics, 2024"
              href="#sec-recorded"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-recorded" className="mb-12">
            <LineChart
              title="Police-recorded stalking offences, England &amp; Wales"
              subtitle="Annual recorded offences. The steep rise reflects changes in recording practice and awareness, not a proportional increase in underlying behaviour."
              series={recordedSeries}
              yLabel="Offences"
              source={{ name: 'ONS', dataset: 'Police Recorded Crime', frequency: 'annual' }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-charge" className="mb-12">
            <LineChart
              title="Stalking charge rate, 2015–2024"
              subtitle="Percentage of recorded stalking offences resulting in a charge. England and Wales."
              series={chargeRateSeries}
              yLabel="Charge rate (%)"
              source={{ name: 'Home Office', dataset: 'Crime Outcomes in England and Wales', frequency: 'annual' }}
            />
          </section>
        </ScrollReveal>
      </main>
    </>
  );
}
