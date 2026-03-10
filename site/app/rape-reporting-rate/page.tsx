'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function RapeReportingRatePage() {

  const sparkData = [35600,40000,52000,58000,63000,68000,70633];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Rapes reported to police (England & Wales, annual)',
      colour: '#6B7280',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Rape charge rate (%)',
      colour: '#6B7280',
      data: ([5.7,5.5,5,4.5,4.2,4.1,4]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];
  const chartAnnotations: Annotation[] = [
    { date: new Date(2017, 0, 1), label: '2017: MeToo · reporting rises' },
    { date: new Date(2020, 0, 1), label: '2020: COVID · reporting dips' },
  ];

  return (
    <>
      <TopicNav topic="Rape Reporting Rate" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Rape Reporting Rate"
          question="Why Is the Rape Charge Rate Only 4%?"
          finding="70,633 rapes were reported to police in England and Wales in 2023 — a record. But the charge rate is just 4%, and most cases are closed without action. Victims frequently withdraw due to the length and intrusiveness of the investigation process."
          colour="#6B7280"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Rapes reported to police (England & Wales, annual)"
              value="70,633"
              direction="up"
              polarity="up-is-bad"
              changeText="record high · charge rate still only 4%"
              sparklineData={[35600,40000,52000,58000,63000,68000,70633]}
              source="ONS / CPS — Jan 2024"
            />
            <MetricCard
              label="Rape charge rate (%)"
              value="4.0"
              direction="down"
              polarity="up-is-good"
              changeText="down from 5.7% in 2016 · most cases NFA'd"
              sparklineData={[5.7,5.5,5,4.5,4.2,4.1,4]}
              source="ONS / CPS — Jan 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Rapes reported to police (England & Wales, annual), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              annotations={chartAnnotations}
              yLabel="Rapes reported to police (England & Wales, annual)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Rape Reporting Rate statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Rape charge rate (%), UK"
              subtitle="UK data. Source: official government statistics."
              series={[{
                id: 'sec',
                label: 'Rape charge rate (%)',
                colour: '#6B7280',
                data: ([5.7,5.5,5,4.5,4.2,4.1,4]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
              }]}
              yLabel="Rape charge rate (%)"
              source={{
                name: 'ONS / CPS',
                dataset: 'Rape charge rate (%)',
                frequency: 'annual',
                url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/articles/rapeintheregionsofenglandandwales/2015to2021',
                date: 'Jan 2024',
              }}
            />
          </section>
        </ScrollReveal>


        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Rape Reporting Rate</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Rape Reporting Rate in the United Kingdom: the numbers show a complex picture. 70,633 rapes were reported to police in England and Wales in 2023 — a record. But the charge rate is just 4%, and most cases are closed without action. Victims frequently withdraw due to the length and intrusiveness of the investigation process. The headline figure — 70,633 for rapes reported to police (england & wales, annual) — record high · charge rate still only 4%.</p>
              <p>The secondary metric tells an equally important story: rape charge rate (%) stands at 4.0, where down from 5.7% in 2016 · most cases NFA'd. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
            </div>
          </section>
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <div className="space-y-2"><p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/articles/rapeintheregionsofenglandandwales/2015to2021" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS / CPS</a> — primary data source. Retrieved Jan 2024.</p><p>All figures are for England unless otherwise stated. Trend data uses the most recent available release at time of publication.</p></div>
          </div>
        </section>
      </main>
    </>
  );
}
