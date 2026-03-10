'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function MeatConsumptionTrendPage() {

  const sparkData = [93,92,90,88,87,85,84];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'UK per capita meat consumption (kg/year)',
      colour: '#6B7280',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Plant-based product sales (£ billions, annual)',
      colour: '#6B7280',
      data: ([0.4,0.6,0.8,1,1.3,1.4,1.4]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];
  const chartAnnotations: Annotation[] = [
    { date: new Date(2019, 0, 1), label: '2019: Plant-based boom' },
  ];

  return (
    <>
      <TopicNav topic="Meat Consumption Trend" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Meat Consumption Trend"
          question="Is Britain Eating Less Meat?"
          finding="UK per capita meat consumption has fallen from 93kg per year in 2010 to 84kg, driven by flexitarianism and rising meat prices. Plant-based product sales have reached £1.4 billion per year, though growth is now slowing."
          colour="#6B7280"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="UK per capita meat consumption (kg/year)"
              value="84"
              direction="down"
              polarity="up-is-good"
              changeText="down from 93kg in 2010 · flexitarianism growing"
              sparklineData={[93,92,90,88,87,85,84]}
              source="DEFRA — Nov 2023"
            />
            <MetricCard
              label="Plant-based product sales (£ billions, annual)"
              value="1.4"
              direction="up"
              polarity="up-is-good"
              changeText="up from £0.4B in 2018 · market growth slowing from peak"
              sparklineData={[0.4,0.6,0.8,1,1.3,1.4,1.4]}
              source="DEFRA — Nov 2023"
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="UK per capita meat consumption (kg/year), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              annotations={chartAnnotations}
              yLabel="UK per capita meat consumption (kg/year)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Meat Consumption Trend statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Plant-based product sales (£ billions, annual), UK"
              subtitle="UK data. Source: official government statistics."
              series={[{
                id: 'sec',
                label: 'Plant-based product sales (£ billions, annual)',
                colour: '#6B7280',
                data: ([0.4,0.6,0.8,1,1.3,1.4,1.4]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
              }]}
              yLabel="Plant-based product sales (£ billions, annual)"
              source={{
                name: 'DEFRA',
                dataset: 'Plant-based product sales (£ billions, annual)',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/food-statistics-pocketbook',
                date: 'Nov 2023',
              }}
            />
          </section>
        </ScrollReveal>


        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Meat Consumption Trend</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Meat Consumption Trend in the United Kingdom: the numbers show a complex picture. UK per capita meat consumption has fallen from 93kg per year in 2010 to 84kg, driven by flexitarianism and rising meat prices. Plant-based product sales have reached £1.4 billion per year, though growth is now slowing. The headline figure — 84 for uk per capita meat consumption (kg/year) — down from 93kg in 2010 · flexitarianism growing.</p>
              <p>The secondary metric tells an equally important story: plant-based product sales (£ billions, annual) stands at 1.4, where up from £0.4B in 2018 · market growth slowing from peak. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
            </div>
          </section>
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <div className="space-y-2"><p><a href="https://www.gov.uk/government/statistics/food-statistics-pocketbook" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DEFRA</a> — primary data source. Retrieved Nov 2023.</p><p>All figures are for England unless otherwise stated. Trend data uses the most recent available release at time of publication.</p></div>
          </div>
        </section>
      </main>
    </>
  );
}
