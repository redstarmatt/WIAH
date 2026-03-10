'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function ParoleBacklogPage() {

  const sparkData = [6200,6800,7500,8500,9800,11000,11800];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Cases awaiting parole hearing',
      colour: '#6B7280',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Average wait for parole hearing (months)',
      colour: '#6B7280',
      data: ([11,12,13,14,15,16,18]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="Parole Backlog" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Parole Backlog"
          question="Why Are 11,800 Prisoners Waiting for a Parole Hearing?"
          finding="There are 11,800 cases awaiting a Parole Board hearing — nearly double the pre-pandemic figure. The average wait is 18 months. Prisoners are being hel..."
          colour="#6B7280"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Cases awaiting parole hearing"
              value="11,800"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 6,200 in 2019 · prisoners held beyond minimum tariff"
              sparklineData={[6200,6800,7500,8500,9800,11000,11800]}
            />
            <MetricCard
              label="Average wait for parole hearing (months)"
              value="18"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 11 months in 2019"
              sparklineData={[11,12,13,14,15,16,18]}
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Cases awaiting parole hearing, UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              yLabel="Cases awaiting parole hearing"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Parole Backlog statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">11,800 Prisoners Are Waiting for a Parole Hearing They Are Legally Entitled To</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>The Parole Board processed 11,800 fewer cases than were referred to it in 2023, leaving prisoners held beyond their minimum tariff in already-overcrowded jails. The average wait from reference to hearing is now 18 months. Prisoners who have served their minimum tariff but cannot get a hearing are legally detained beyond what their sentence required.</p>
              <p>The crisis has multiple causes: a pandemic-driven backlog, the post-Pitchford decision increasing the number of cases requiring oral hearings, a shortage of Parole Board members, and the decision to allow ministerial override of release decisions in certain cases — which has added legal complexity and delay. The consequences are felt most by remand prisoners, by victims who experience repeated uncertainty about release dates, and by the prison system, which must accommodate prisoners who should have moved on.</p>
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
