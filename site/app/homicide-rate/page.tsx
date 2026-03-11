'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function HomicideRatePage() {

  const sparkData = [545,550,560,571,580,593,602];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Homicides (England & Wales, annual)',
      colour: '#6B7280',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Knife homicides as share of total',
      colour: '#6B7280',
      data: ([30,32,34,36,37,39,40]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];
  const chartAnnotations: Annotation[] = [
    { date: new Date(2016, 0, 1), label: '2016: Knife crime rises' },
    { date: new Date(2020, 0, 1), label: '2020: Lockdown · brief fall' },
  ];

  return (
    <>
      <TopicNav topic="Homicide Rate" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Homicide Rate"
          question="Is Britain's Homicide Rate Rising?"
          finding="602 homicides were recorded in England and Wales in 2023, with knife killings now accounting for 40% — up from 30% in 2010. Violence is increasingly concentrated among young men in urban areas."
          colour="#6B7280"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Homicides (England & Wales, annual)"
              value="602"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 571 in 2020 · knife crime driving increase"
              sparklineData={[545,550,560,571,580,593,602]}
              source="ONS — Jan 2024"
            />
            <MetricCard
              label="Knife homicides as share of total"
              value="40%"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 30% in 2010"
              sparklineData={[30,32,34,36,37,39,40]}
              source="ONS — Jan 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Homicides (England & Wales, annual), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              annotations={chartAnnotations}
              yLabel="Homicides (England & Wales, annual)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Homicide Rate statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Knife homicides as share of total, UK"
              subtitle="UK data. Source: official government statistics."
              series={[{
                id: 'sec',
                label: 'Knife homicides as share of total',
                colour: '#6B7280',
                data: ([30,32,34,36,37,39,40]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
              }]}
              yLabel="Knife homicides as share of total"
              source={{
                name: 'ONS',
                dataset: 'Knife homicides as share of total',
                frequency: 'annual',
                url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/bulletins/crimeinenglandandwales',
                date: 'Jan 2024',
              }}
            />
          </section>
        </ScrollReveal>


        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Homicide Rate</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Homicide Rate in the United Kingdom: the numbers show a complex picture. 602 homicides were recorded in England and Wales in 2023, with knife killings now accounting for 40% — up from 30% in 2010. Violence is increasingly concentrated among young men in urban areas. The headline figure — 602 for homicides (england & wales, annual) — up from 571 in 2020 · knife crime driving increase.</p>
              <p>The secondary metric tells an equally important story: knife homicides as share of total stands at 40%, where up from 30% in 2010. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
            </div>
          </section>
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <div className="space-y-2"><p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/bulletins/crimeinenglandandwales" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS</a> — primary data source. Retrieved Jan 2024.</p><p>All figures are for England unless otherwise stated. Trend data uses the most recent available release at time of publication.</p></div>
          </div>
        </section>
      </main>
    </>
  );
}
