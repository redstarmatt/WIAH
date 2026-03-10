'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';

  const sparkData = [280,295,300,275,330,370,398];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'UK services exports (£ billions, annual)',
      colour: '#264653',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Services trade surplus (£ billions)',
      colour: '#6B7280',
      data: ([94,98,102,90,110,125,136]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];

export default function ServicesExportsUkPage() {
  return (
    <>
      <TopicNav topic="Services Exports" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Services Exports"
          question="Is Britain Good at Exporting Services?"
          finding="UK services exports reached a record £398 billion in 2023. The £136 billion services trade surplus partially offsets the large goods trade deficit. Fi..."
          colour="#264653"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="UK services exports (£ billions, annual)"
              value="398"
              direction="up"
              polarity="up-is-good"
              changeText="record high · financial services largest component"
              sparklineData=[280,295,300,275,330,370,398]
            />
            <MetricCard
              label="Services trade surplus (£ billions)"
              value="136"
              direction="up"
              polarity="up-is-good"
              changeText="up from £94B in 2016 · offset goods trade deficit"
              sparklineData=[94,98,102,90,110,125,136]
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="UK services exports (£ billions, annual), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              yLabel="UK services exports (£ billions, annual)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Services Exports statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Services Exports</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Services Exports in the United Kingdom: the numbers show a complex picture. UK services exports reached a record £398 billion in 2023. The £136 billion services trade surplus partially offsets the large goods trade deficit. Financial, professional and creative services are the UK's most globally competitive sectors. The headline figure — 398 for uk services exports (£ billions, annual) — record high · financial services largest component.</p>
              <p>The secondary metric tells an equally important story: services trade surplus (£ billions) stands at 136, where up from £94B in 2016 · offset goods trade deficit. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
            </div>
          </section>
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p>Data is sourced from official UK government statistics including ONS, NHS England, Home Office, DfE and devolved equivalents. All figures are for England unless otherwise stated. Trend data uses the most recent available release at time of publication. See individual metric sources for full methodology notes.</p>
          </div>
        </section>
      </main>
    </>
  );
}
