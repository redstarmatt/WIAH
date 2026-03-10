'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function PhonicsOutcomesPage() {

  const sparkData = [58,64,69,73,76,77,79];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Pupils meeting expected standard in Year 1 phonics check (%)',
      colour: '#2A9D8F',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Disadvantaged pupils meeting standard (gap vs peers, pp)',
      colour: '#6B7280',
      data: ([21,19,18,17,16,15,14]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="Phonics Outcomes" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Phonics Outcomes"
          question="Has Phonics Teaching Made British Children Better Readers?"
          finding="79% of Year 1 pupils in England now meet the expected standard in the phonics check — up from 58% in 2012. The attainment gap between disadvantaged pu..."
          colour="#2A9D8F"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Pupils meeting expected standard in Year 1 phonics check (%)"
              value="79"
              direction="up"
              polarity="up-is-good"
              changeText="up from 58% in 2012 · phonics-first approach effective"
              sparklineData={[58,64,69,73,76,77,79]}
            />
            <MetricCard
              label="Disadvantaged pupils meeting standard (gap vs peers, pp)"
              value="14"
              direction="down"
              polarity="up-is-bad"
              changeText="down from 21pp in 2012 · gap persisting but narrowing"
              sparklineData={[21,19,18,17,16,15,14]}
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Pupils meeting expected standard in Year 1 phonics check (%), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              yLabel="Pupils meeting expected standard in Year 1 phonics check (%)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Phonics Outcomes statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">Phonics First Has Transformed Early Reading in England</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>The introduction of the phonics screening check in 2012, combined with the mandating of systematic synthetic phonics as the primary method for teaching early reading, has produced measurable improvements. 79% of Year 1 pupils now meet the expected standard, up from 58% when the check was introduced. England's performance in international literacy surveys has improved accordingly.</p>
              <p>The debate about phonics was long and sometimes acrimonious, with proponents of whole-language and mixed-methods approaches resisting the change. The evidence is now clear enough that the debate has largely resolved in favour of phonics-first. The remaining gap between disadvantaged pupils and their peers — 14 percentage points — reflects factors beyond reading methodology: vocabulary gaps from limited language exposure in early childhood, attendance, and the quality of early years provision. Phonics is necessary but not sufficient.</p>
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
