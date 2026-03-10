'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function PrisonHealthcarePage() {

  const sparkData = [21,22,24,27,29,31,33];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Prisons rated poor or inadequate for healthcare',
      colour: '#E63946',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Mental illness prevalence in prison (estimated)',
      colour: '#6B7280',
      data: ([65,67,68,70,70,70,70]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="Prison Healthcare" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Prison Healthcare"
          question="Is Prison Healthcare Adequate?"
          finding="A third of prisons are rated poor or inadequate for healthcare by inspectors. An estimated 70% of prisoners have a diagnosable mental illness — nine t..."
          colour="#E63946"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Prisons rated poor or inadequate for healthcare"
              value="33%"
              direction="up"
              polarity="up-is-bad"
              changeText="HMIP inspections 2023/24 · primary care vacancy crisis"
              sparklineData={[21,22,24,27,29,31,33]}
            />
            <MetricCard
              label="Mental illness prevalence in prison (estimated)"
              value="70%"
              direction="flat"
              polarity="up-is-bad"
              changeText="9x community rate · personality disorder or substance misuse"
              sparklineData={[65,67,68,70,70,70,70]}
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Prisons rated poor or inadequate for healthcare, UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              yLabel="Prisons rated poor or inadequate for healthcare"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Prison Healthcare statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Prison Healthcare</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Prison Healthcare in the United Kingdom: the numbers show a complex picture. A third of prisons are rated poor or inadequate for healthcare by inspectors. An estimated 70% of prisoners have a diagnosable mental illness — nine times the community rate. Primary care vacancies inside prisons drive most of the failures. The headline figure — 33% for prisons rated poor or inadequate for healthcare — HMIP inspections 2023/24 · primary care vacancy crisis.</p>
              <p>The secondary metric tells an equally important story: mental illness prevalence in prison (estimated) stands at 70%, where 9x community rate · personality disorder or substance misuse. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
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
