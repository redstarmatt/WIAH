'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function DementiaDiagnosisRatePage() {

  const sparkData = [60,63,67.4,66,65,63,62.2];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Dementia diagnosis rate (of estimated cases)',
      colour: '#E63946',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'People living with undiagnosed dementia (est.)',
      colour: '#6B7280',
      data: ([300000,310000,310000,325000,345000,360000,370000]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];
  const chartAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: COVID · GP access restricted' },
  ];
  const chartTargetLine = { value: 66.7, label: 'NHS 66.7% diagnosis target' };

  return (
    <>
      <TopicNav topic="Dementia Diagnosis Rate" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Dementia Diagnosis Rate"
          question="Why Are 370,000 People Living with Undiagnosed Dementia?"
          finding="The dementia diagnosis rate has fallen below the NHS 66.7% target to 62.2%. An estimated 370,000 people are living with undiagnosed dementia — missing out on treatment, support and legal planning."
          colour="#E63946"
          preposition="in"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Dementia diagnosis rate (of estimated cases)"
              value="62.2%"
              direction="down"
              polarity="up-is-good"
              changeText="down from 67.4% peak in 2016 · NHS target is 66.7%"
              sparklineData={[60,63,67.4,66,65,63,62.2]}
              source="NHS England — Jan 2024"
            />
            <MetricCard
              label="People living with undiagnosed dementia (est.)"
              value="370K"
              direction="up"
              polarity="up-is-bad"
              changeText="rising as population ages · London worst for diagnosis gap"
              sparklineData={[300000,310000,310000,325000,345000,360000,370000]}
              source="NHS England — Jan 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Dementia diagnosis rate (of estimated cases), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              targetLine={chartTargetLine}
              annotations={chartAnnotations}
              yLabel="Dementia diagnosis rate (of estimated cases)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Dementia Diagnosis Rate statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="People living with undiagnosed dementia (est.), UK"
              subtitle="UK data. Source: official government statistics."
              series={[{
                id: 'sec',
                label: 'People living with undiagnosed dementia (est.)',
                colour: '#6B7280',
                data: ([300000,310000,310000,325000,345000,360000,370000]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
              }]}
              yLabel="People living with undiagnosed dementia (est.)"
              source={{
                name: 'NHS England',
                dataset: 'People living with undiagnosed dementia (est.)',
                frequency: 'annual',
                url: 'https://www.england.nhs.uk/publication/dementia-diagnosis-rates-monthly-data/',
                date: 'Jan 2024',
              }}
            />
          </section>
        </ScrollReveal>


        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Dementia Diagnosis Rate</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Dementia Diagnosis Rate in the United Kingdom: the numbers show a complex picture. The dementia diagnosis rate has fallen below the NHS 66.7% target to 62.2%. An estimated 370,000 people are living with undiagnosed dementia — missing out on treatment, support and legal planning. The headline figure — 62.2% for dementia diagnosis rate (of estimated cases) — down from 67.4% peak in 2016 · NHS target is 66.7%.</p>
              <p>The secondary metric tells an equally important story: people living with undiagnosed dementia (est.) stands at 370K, where rising as population ages · London worst for diagnosis gap. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
            </div>
          </section>
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <div className="space-y-2"><p><a href="https://www.england.nhs.uk/publication/dementia-diagnosis-rates-monthly-data/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England</a> — primary data source. Retrieved Jan 2024.</p><p>All figures are for England unless otherwise stated. Trend data uses the most recent available release at time of publication.</p></div>
          </div>
        </section>
      </main>
    </>
  );
}
