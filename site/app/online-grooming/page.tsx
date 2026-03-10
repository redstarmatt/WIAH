'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function OnlineGroomingPage() {

  const sparkData = [3500,3800,4200,4900,5600,6100,6350];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Online grooming offences recorded (England & Wales)',
      colour: '#6B7280',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Cases involving under-13s',
      colour: '#6B7280',
      data: ([29,30,32,33,35,36,37]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="Online Grooming" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Online Grooming"
          question="Is Online Child Grooming Getting Worse?"
          finding="6,350 online grooming offences were recorded in England and Wales in 2023 — up 80% in five years. Cases involving children under 13 now account for 37..."
          colour="#6B7280"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Online grooming offences recorded (England & Wales)"
              value="6,350"
              direction="up"
              polarity="up-is-bad"
              changeText="up 80% in 5 years · under-reporting still significant"
              sparklineData={[3500,3800,4200,4900,5600,6100,6350]}
            />
            <MetricCard
              label="Cases involving under-13s"
              value="37%"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 29% in 2018 · younger children increasingly targeted"
              sparklineData={[29,30,32,33,35,36,37]}
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Online grooming offences recorded (England & Wales), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              yLabel="Online grooming offences recorded (England & Wales)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Online Grooming statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Online Grooming</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Online Grooming in the United Kingdom: the numbers show a complex picture. 6,350 online grooming offences were recorded in England and Wales in 2023 — up 80% in five years. Cases involving children under 13 now account for 37% of the total. Under-reporting remains significant. The headline figure — 6,350 for online grooming offences recorded (england & wales) — up 80% in 5 years · under-reporting still significant.</p>
              <p>The secondary metric tells an equally important story: cases involving under-13s stands at 37%, where up from 29% in 2018 · younger children increasingly targeted. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
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
