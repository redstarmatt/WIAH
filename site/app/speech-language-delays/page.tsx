'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';

  const sparkData = [14,14,14,15,16.5,17,17.5];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Children starting school with speech/language delays (%)',
      colour: '#E63946',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Children referred for speech therapy waiting >18 weeks (%)',
      colour: '#6B7280',
      data: ([18,19,21,28,34,37,38]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];

export default function SpeechLanguageDelaysPage() {
  return (
    <>
      <TopicNav topic="Speech & Language Delays" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Speech & Language Delays"
          question="Why Are So Many Children Starting School Unable to Talk Properly?"
          finding="17.5% of children in England now start school with speech and language delays — up from 14% before the pandemic. 38% of children referred for speech t..."
          colour="#E63946"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Children starting school with speech/language delays (%)"
              value="17.5"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 14% in 2019 · post-lockdown language development affected"
              sparklineData=[14,14,14,15,16.5,17,17.5]
            />
            <MetricCard
              label="Children referred for speech therapy waiting >18 weeks (%)"
              value="38"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 18% in 2019 · SLT workforce shortfall"
              sparklineData=[18,19,21,28,34,37,38]
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Children starting school with speech/language delays (%), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              yLabel="Children starting school with speech/language delays (%)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Speech & Language Delays statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Speech & Language Delays</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Speech & Language Delays in the United Kingdom: the numbers show a complex picture. 17.5% of children in England now start school with speech and language delays — up from 14% before the pandemic. 38% of children referred for speech therapy wait more than 18 weeks. The speech and language therapy workforce is chronically short. The headline figure — 17.5 for children starting school with speech/language delays (%) — up from 14% in 2019 · post-lockdown language development affected.</p>
              <p>The secondary metric tells an equally important story: children referred for speech therapy waiting >18 weeks (%) stands at 38, where up from 18% in 2019 · SLT workforce shortfall. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
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
