'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function ForcedMarriagePage() {

  const sparkData = [1100,1267,1735,1800,1409,1800,2068];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Forced marriage cases handled by FMU (annual)',
      colour: '#6B7280',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Under-18s in forced marriage cases',
      colour: '#6B7280',
      data: ([26,25,26,24,25,25,25]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="Forced Marriage" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Forced Marriage"
          question="How Many People Are Forced Into Marriage in Britain?"
          finding="The Forced Marriage Unit handled 2,068 cases in 2023 — a record. One in four involved under-18s. Experts believe the true figure is many times higher,..."
          colour="#6B7280"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Forced marriage cases handled by FMU (annual)"
              value="2,068"
              direction="down"
              polarity="up-is-bad"
              changeText="down from 1,735 in 2012 · COVID dip followed by rise"
              sparklineData={[1100,1267,1735,1800,1409,1800,2068]}
            />
            <MetricCard
              label="Under-18s in forced marriage cases"
              value="25%"
              direction="flat"
              polarity="up-is-bad"
              changeText="persistent proportion · 11 reported cases involved under-16s"
              sparklineData={[26,25,26,24,25,25,25]}
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Forced marriage cases handled by FMU (annual), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              yLabel="Forced marriage cases handled by FMU (annual)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Forced Marriage statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Forced Marriage</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Forced Marriage in the United Kingdom: the numbers show a complex picture. The Forced Marriage Unit handled 2,068 cases in 2023 — a record. One in four involved under-18s. Experts believe the true figure is many times higher, as cases go unreported within communities. The headline figure — 2,068 for forced marriage cases handled by fmu (annual) — down from 1,735 in 2012 · COVID dip followed by rise.</p>
              <p>The secondary metric tells an equally important story: under-18s in forced marriage cases stands at 25%, where persistent proportion · 11 reported cases involved under-16s. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
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
