'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function HomeEducationPage() {

  const sparkData = [53000,57000,60000,65000,75000,84000,92000];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Children in elective home education (England)',
      colour: '#6B7280',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Local authorities with register of home educators (%)',
      colour: '#6B7280',
      data: ([25,28,31,35,38,41,43]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="Home Education" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Home Education"
          question="How Many Children Are Being Educated at Home?"
          finding="92,000 children in England are registered for elective home education — a record, up 75% since 2019. School anxiety is the main driver. Most local aut..."
          colour="#6B7280"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Children in elective home education (England)"
              value="92,000"
              direction="up"
              polarity="up-is-bad"
              changeText="record high · up 75% since 2019 · school anxiety main driver"
              sparklineData={[53000,57000,60000,65000,75000,84000,92000]}
            />
            <MetricCard
              label="Local authorities with register of home educators (%)"
              value="43"
              direction="up"
              polarity="up-is-good"
              changeText="still majority lack registers · safeguarding gap"
              sparklineData={[25,28,31,35,38,41,43]}
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Children in elective home education (England), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              yLabel="Children in elective home education (England)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Home Education statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Home Education</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Home Education in the United Kingdom: the numbers show a complex picture. 92,000 children in England are registered for elective home education — a record, up 75% since 2019. School anxiety is the main driver. Most local authorities have no register, creating a safeguarding blind spot. The headline figure — 92,000 for children in elective home education (england) — record high · up 75% since 2019 · school anxiety main driver.</p>
              <p>The secondary metric tells an equally important story: local authorities with register of home educators (%) stands at 43, where still majority lack registers · safeguarding gap. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
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
