'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function TextileWastePage() {

  const sparkData = [23,23.5,24,24.8,25.5,26.2,26.8];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Textile waste per person (UK, kg/year)',
      colour: '#6B7280',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Clothing recycled or donated (%)',
      colour: '#6B7280',
      data: ([42,42,41,39,37,36,35]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];
  const chartAnnotations: Annotation[] = [
    { date: new Date(2019, 0, 1), label: '2019: Fast fashion peak' },
  ];

  return (
    <>
      <TopicNav topic="Textile Waste" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Textile Waste"
          question="Is Britain's Throwaway Fashion Culture Getting Worse?"
          finding="The UK generates 26.8 kg of textile waste per person per year — the highest rate in Europe. Only 35% of clothing is recycled or donated, down from 42% in 2018, as fast fashion produces garments too poor quality to resell."
          colour="#6B7280"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Textile waste per person (UK, kg/year)"
              value="26.8"
              direction="up"
              polarity="up-is-bad"
              changeText="highest in Europe · fast fashion acceleration"
              sparklineData={[23,23.5,24,24.8,25.5,26.2,26.8]}
              source="WRAP — Jul 2023"
            />
            <MetricCard
              label="Clothing recycled or donated (%)"
              value="35"
              direction="down"
              polarity="up-is-good"
              changeText="down from 42% in 2018 · quality of clothing too poor to resell"
              sparklineData={[42,42,41,39,37,36,35]}
              source="WRAP — Jul 2023"
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Textile waste per person (UK, kg/year), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              annotations={chartAnnotations}
              yLabel="Textile waste per person (UK, kg/year)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Textile Waste statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Clothing recycled or donated (%), UK"
              subtitle="UK data. Source: official government statistics."
              series={[{
                id: 'sec',
                label: 'Clothing recycled or donated (%)',
                colour: '#6B7280',
                data: ([42,42,41,39,37,36,35]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
              }]}
              yLabel="Clothing recycled or donated (%)"
              source={{
                name: 'WRAP',
                dataset: 'Clothing recycled or donated (%)',
                frequency: 'annual',
                url: 'https://www.wrap.ngo/resources/report/valuing-our-clothes-true-cost-uk-fashion',
                date: 'Jul 2023',
              }}
            />
          </section>
        </ScrollReveal>


        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Textile Waste</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Textile Waste in the United Kingdom: the numbers show a complex picture. The UK generates 26.8 kg of textile waste per person per year — the highest rate in Europe. Only 35% of clothing is recycled or donated, down from 42% in 2018, as fast fashion produces garments too poor quality to resell. The headline figure — 26.8 for textile waste per person (uk, kg/year) — highest in Europe · fast fashion acceleration.</p>
              <p>The secondary metric tells an equally important story: clothing recycled or donated (%) stands at 35, where down from 42% in 2018 · quality of clothing too poor to resell. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
            </div>
          </section>
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <div className="space-y-2"><p><a href="https://www.wrap.ngo/resources/report/valuing-our-clothes-true-cost-uk-fashion" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">WRAP</a> — primary data source. Retrieved Jul 2023.</p><p>All figures are for England unless otherwise stated. Trend data uses the most recent available release at time of publication.</p></div>
          </div>
        </section>
      </main>
    </>
  );
}
