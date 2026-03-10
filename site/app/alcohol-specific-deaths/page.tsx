'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function AlcoholSpecificDeathsPage() {

  const sparkData = [7300,7500,7700,8100,8600,9100,9641];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Alcohol-specific deaths (England, annual)',
      colour: '#E63946',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Alcohol-related hospital admissions (millions)',
      colour: '#6B7280',
      data: ([0.93,0.96,0.99,1.01,1.03,1.05,1.07]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];
  const chartAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: Lockdown drinking surge' },
  ];

  return (
    <>
      <TopicNav topic="Alcohol-Specific Deaths" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Alcohol-Specific Deaths"
          question="Are Alcohol Deaths Still Rising?"
          finding="Alcohol-specific deaths in England hit 9,641 in 2023 — a record high and up 32% since 2019. Alcohol-related hospital admissions now exceed one million per year."
          colour="#E63946"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Alcohol-specific deaths (England, annual)"
              value="9,641"
              direction="up"
              polarity="up-is-bad"
              changeText="record high · up 32% since 2019"
              sparklineData={[7300,7500,7700,8100,8600,9100,9641]}
              source="ONS — Jan 2024"
            />
            <MetricCard
              label="Alcohol-related hospital admissions (millions)"
              value="1.07"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 0.93M in 2015"
              sparklineData={[0.93,0.96,0.99,1.01,1.03,1.05,1.07]}
              source="ONS — Jan 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Alcohol-specific deaths (England, annual), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              annotations={chartAnnotations}
              yLabel="Alcohol-specific deaths (England, annual)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Alcohol-Specific Deaths statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Alcohol-related hospital admissions (millions), UK"
              subtitle="UK data. Source: official government statistics."
              series={[{
                id: 'sec',
                label: 'Alcohol-related hospital admissions (millions)',
                colour: '#6B7280',
                data: ([0.93,0.96,0.99,1.01,1.03,1.05,1.07]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
              }]}
              yLabel="Alcohol-related hospital admissions (millions)"
              source={{
                name: 'ONS',
                dataset: 'Alcohol-related hospital admissions (millions)',
                frequency: 'annual',
                url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/causesofdeath/bulletins/alcoholspecificdeathsintheuk',
                date: 'Jan 2024',
              }}
            />
          </section>
        </ScrollReveal>


        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">Alcohol Deaths Are at a Record High. Why Isn't More Being Done?</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Alcohol-specific deaths in England hit 9,641 in 2023 — a record, up 32% since 2019. The pandemic drove a sharp increase as people drank more heavily in lockdown, and the trajectory has not reversed. Alcohol-related hospital admissions now exceed one million per year. The costs fall disproportionately on the NHS, emergency services and children in affected households.</p>
              <p>England has long had weaker alcohol policy than Scotland, which introduced minimum unit pricing in 2018. Evidence from Scotland shows a 13% reduction in alcohol deaths in the years following its introduction. England's 2013 plans for minimum unit pricing were shelved following industry lobbying. The case for action is as strong now as it was then, but political will has been absent. NICE and public health bodies have repeatedly set out what works; the challenge is one of political economy, not evidence.</p>
            </div>
          </section>
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <div className="space-y-2"><p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/causesofdeath/bulletins/alcoholspecificdeathsintheuk" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS</a> — primary data source. Retrieved Jan 2024.</p><p>All figures are for England unless otherwise stated. Trend data uses the most recent available release at time of publication.</p></div>
          </div>
        </section>
      </main>
    </>
  );
}
