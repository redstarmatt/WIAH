'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function CervicalScreeningPage() {

  const sparkData = [80.4,79.1,77.5,75,72.9,71.4,69.9];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Cervical screening coverage (England, 5-year)',
      colour: '#E63946',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'HPV detected needing treatment',
      colour: '#6B7280',
      data: ([3.6,3.5,3.4,3.4,3.4,3.4,3.4]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];
  const chartAnnotations: Annotation[] = [
    { date: new Date(2018, 0, 1), label: '2018: Jade Goody effect reverses' },
    { date: new Date(2020, 0, 1), label: '2020: COVID pause' },
  ];
  const chartTargetLine = { value: 75.0, label: 'NHS 75% coverage target' };

  return (
    <>
      <TopicNav topic="Cervical Screening" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Cervical Screening"
          question="Why Has Cervical Screening Fallen to a 25-Year Low?"
          finding="Cervical screening coverage is at its lowest since records began — 69.9% against a 75% target. Stigma, access barriers and appointment shortages are driving the decline."
          colour="#E63946"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Cervical screening coverage (England, 5-year)"
              value="69.9%"
              direction="down"
              polarity="up-is-good"
              changeText="25-year low · down from 80.4% in 2012"
              sparklineData={[80.4,79.1,77.5,75,72.9,71.4,69.9]}
              source="NHS Digital — Aug 2023"
            />
            <MetricCard
              label="HPV detected needing treatment"
              value="3.4%"
              direction="flat"
              polarity="up-is-bad"
              changeText="stable · younger cohorts better protected by vaccination"
              sparklineData={[3.6,3.5,3.4,3.4,3.4,3.4,3.4]}
              source="NHS Digital — Aug 2023"
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Cervical screening coverage (England, 5-year), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              targetLine={chartTargetLine}
              annotations={chartAnnotations}
              yLabel="Cervical screening coverage (England, 5-year)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Cervical Screening statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="HPV detected needing treatment, UK"
              subtitle="UK data. Source: official government statistics."
              series={[{
                id: 'sec',
                label: 'HPV detected needing treatment',
                colour: '#6B7280',
                data: ([3.6,3.5,3.4,3.4,3.4,3.4,3.4]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
              }]}
              yLabel="HPV detected needing treatment"
              source={{
                name: 'NHS Digital',
                dataset: 'HPV detected needing treatment',
                frequency: 'annual',
                url: 'https://digital.nhs.uk/data-and-information/publications/statistical/cervical-screening-programme',
                date: 'Aug 2023',
              }}
            />
          </section>
        </ScrollReveal>


        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Cervical Screening</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Cervical Screening in the United Kingdom: the numbers show a complex picture. Cervical screening coverage is at its lowest since records began — 69.9% against a 75% target. Stigma, access barriers and appointment shortages are driving the decline. The headline figure — 69.9% for cervical screening coverage (england, 5-year) — 25-year low · down from 80.4% in 2012.</p>
              <p>The secondary metric tells an equally important story: hpv detected needing treatment stands at 3.4%, where stable · younger cohorts better protected by vaccination. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
            </div>
          </section>
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <div className="space-y-2"><p><a href="https://digital.nhs.uk/data-and-information/publications/statistical/cervical-screening-programme" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS Digital</a> — primary data source. Retrieved Aug 2023.</p><p>All figures are for England unless otherwise stated. Trend data uses the most recent available release at time of publication.</p></div>
          </div>
        </section>
      </main>
    </>
  );
}
