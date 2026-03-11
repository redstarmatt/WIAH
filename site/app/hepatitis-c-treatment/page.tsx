'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function HepatitisCTreatmentPage() {

  const sparkData = [21800,19000,14000,10000,10500,11000,11200];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'People starting HCV treatment (annual)',
      colour: '#2A9D8F',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Estimated undiagnosed HCV cases',
      colour: '#6B7280',
      data: ([160000,140000,120000,105000,93000,86000,82000]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];
  const chartAnnotations: Annotation[] = [
    { date: new Date(2015, 0, 1), label: '2015: DAA drugs available' },
    { date: new Date(2020, 0, 1), label: '2020: Testing disrupted' },
  ];

  return (
    <>
      <TopicNav topic="Hepatitis C Treatment" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Hepatitis C Treatment"
          question="Has the NHS Eliminated Hepatitis C?"
          finding="82,000 people in the UK are estimated to be living with undiagnosed hepatitis C — down from 160,000 in 2015. Direct-acting antivirals have transformed the disease from chronic to curable, but the testing pathway needs rebuilding after COVID."
          colour="#2A9D8F"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="People starting HCV treatment (annual)"
              value="11,200"
              direction="down"
              polarity="up-is-bad"
              changeText="down from 21,800 in 2019 · pandemic disrupted testing pathways"
              sparklineData={[21800,19000,14000,10000,10500,11000,11200]}
              source="NHS England / UKHSA — Aug 2023"
            />
            <MetricCard
              label="Estimated undiagnosed HCV cases"
              value="82,000"
              direction="down"
              polarity="up-is-good"
              changeText="down from 160,000 in 2015 · direct-acting antivirals transformative"
              sparklineData={[160000,140000,120000,105000,93000,86000,82000]}
              source="NHS England / UKHSA — Aug 2023"
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="People starting HCV treatment (annual), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              annotations={chartAnnotations}
              yLabel="People starting HCV treatment (annual)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Hepatitis C Treatment statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Estimated undiagnosed HCV cases, UK"
              subtitle="UK data. Source: official government statistics."
              series={[{
                id: 'sec',
                label: 'Estimated undiagnosed HCV cases',
                colour: '#6B7280',
                data: ([160000,140000,120000,105000,93000,86000,82000]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
              }]}
              yLabel="Estimated undiagnosed HCV cases"
              source={{
                name: 'NHS England / UKHSA',
                dataset: 'Estimated undiagnosed HCV cases',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/publications/hepatitis-c-in-the-uk',
                date: 'Aug 2023',
              }}
            />
          </section>
        </ScrollReveal>


        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Hepatitis C Treatment</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Hepatitis C Treatment in the United Kingdom: the numbers show a complex picture. 82,000 people in the UK are estimated to be living with undiagnosed hepatitis C — down from 160,000 in 2015. Direct-acting antivirals have transformed the disease from chronic to curable, but the testing pathway needs rebuilding after COVID. The headline figure — 11,200 for people starting hcv treatment (annual) — down from 21,800 in 2019 · pandemic disrupted testing pathways.</p>
              <p>The secondary metric tells an equally important story: estimated undiagnosed hcv cases stands at 82,000, where down from 160,000 in 2015 · direct-acting antivirals transformative. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
            </div>
          </section>
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <div className="space-y-2"><p><a href="https://www.gov.uk/government/publications/hepatitis-c-in-the-uk" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England / UKHSA</a> — primary data source. Retrieved Aug 2023.</p><p>All figures are for England unless otherwise stated. Trend data uses the most recent available release at time of publication.</p></div>
          </div>
        </section>
      </main>
    </>
  );
}
