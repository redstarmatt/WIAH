'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function PensionAutoEnrolmentPage() {

  const sparkData = [55,65,72,78,83,86,88];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Workers enrolled in workplace pension (%)',
      colour: '#2A9D8F',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Workers below adequate savings threshold (%)',
      colour: '#6B7280',
      data: ([52,50,46,43,41,39,37]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="Pension Auto-Enrolment" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Pension Auto-Enrolment"
          question="Has Pension Auto-Enrolment Worked?"
          finding="88% of eligible workers are now enrolled in a workplace pension — up from 55% in 2012. Auto-enrolment is one of the most successful British social pol..."
          colour="#2A9D8F"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Workers enrolled in workplace pension (%)"
              value="88"
              direction="up"
              polarity="up-is-good"
              changeText="up from 55% in 2012 · auto-enrolment transformative"
              sparklineData={[55,65,72,78,83,86,88]}
            />
            <MetricCard
              label="Workers below adequate savings threshold (%)"
              value="37"
              direction="down"
              polarity="up-is-bad"
              changeText="down from 52% in 2012 · but minimum contributions still too low"
              sparklineData={[52,50,46,43,41,39,37]}
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Workers enrolled in workplace pension (%), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              yLabel="Workers enrolled in workplace pension (%)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Pension Auto-Enrolment statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Pension Auto-Enrolment</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Pension Auto-Enrolment in the United Kingdom: the numbers show a complex picture. 88% of eligible workers are now enrolled in a workplace pension — up from 55% in 2012. Auto-enrolment is one of the most successful British social policy reforms of recent decades, though minimum contribution rates remain too low for most to retire comfortably. The headline figure — 88 for workers enrolled in workplace pension (%) — up from 55% in 2012 · auto-enrolment transformative.</p>
              <p>The secondary metric tells an equally important story: workers below adequate savings threshold (%) stands at 37, where down from 52% in 2012 · but minimum contributions still too low. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
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
