'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function StopAndSearchPage() {

  const sparkData = [380000,420000,530000,680000,780000,940000,1060000];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Stop and searches per year (England & Wales)',
      colour: '#6B7280',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Black people stopped vs white (ratio)',
      colour: '#6B7280',
      data: ([4,4.5,5,5.5,6,6.5,7]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];
  const chartAnnotations: Annotation[] = [
    { date: new Date(2016, 0, 1), label: '2016: Best Use of S&S guidance relaxed' },
    { date: new Date(2019, 0, 1), label: '2019: Knife crime response · surge' },
  ];

  return (
    <>
      <TopicNav topic="Stop and Search" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Stop and Search"
          question="Is Stop and Search Being Used Fairly?"
          finding="1.06 million stop and searches took place in England and Wales in 2023 — up 72% since 2016. Black people are stopped at a rate seven times higher than white people, up from five times in 2018."
          colour="#6B7280"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Stop and searches per year (England & Wales)"
              value="1.06M"
              direction="up"
              polarity="up-is-bad"
              changeText="up 72% since 2016 · knife crime response"
              sparklineData={[380000,420000,530000,680000,780000,940000,1060000]}
              source="Home Office — Oct 2023"
            />
            <MetricCard
              label="Black people stopped vs white (ratio)"
              value="7:1"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 5:1 in 2018 · disproportionality highest in London"
              sparklineData={[4,4.5,5,5.5,6,6.5,7]}
              source="Home Office — Oct 2023"
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Stop and searches per year (England & Wales), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              annotations={chartAnnotations}
              yLabel="Stop and searches per year (England & Wales)"
              source={{
                name: 'Home Office',
                dataset: 'Stop and Search statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Black people stopped vs white (ratio), UK"
              subtitle="UK data. Source: official government statistics."
              series={[{
                id: 'sec',
                label: 'Black people stopped vs white (ratio)',
                colour: '#6B7280',
                data: ([4,4.5,5,5.5,6,6.5,7]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
              }]}
              yLabel="Black people stopped vs white (ratio)"
              source={{
                name: 'Home Office',
                dataset: 'Black people stopped vs white (ratio)',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/police-powers-and-procedures-stop-and-search-and-arrests-england-and-wales-year-ending-march-2023',
                date: 'Oct 2023',
              }}
            />
          </section>
        </ScrollReveal>


        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">Stop and Search: More Frequent, More Disproportionate</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>One million stop and searches took place in England and Wales in 2023 — up 72% since 2016, driven by the government's response to knife crime. The disproportionality figures are stark: Black people are searched at seven times the rate of white people, a ratio that has worsened since 2018. Community trust in policing in areas most affected is significantly damaged.</p>
              <p>The evidence on whether stop and search deters knife crime is contested. Studies have found modest short-term effects when targeted and intelligence-led, but broad deployments show little crime-reduction benefit while generating substantial harm to community relations. Section 60 orders — which allow blanket searches in an area without reasonable suspicion — account for a growing share of all stop and searches. Reformers argue that the resources expended on searches could more effectively be redirected to early intervention and violence reduction units.</p>
            </div>
          </section>
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <div className="space-y-2"><p><a href="https://www.gov.uk/government/statistics/police-powers-and-procedures-stop-and-search-and-arrests-england-and-wales-year-ending-march-2023" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Home Office</a> — primary data source. Retrieved Oct 2023.</p><p>All figures are for England unless otherwise stated. Trend data uses the most recent available release at time of publication.</p></div>
          </div>
        </section>
      </main>
    </>
  );
}
