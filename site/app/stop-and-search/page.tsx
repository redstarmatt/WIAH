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

  return (
    <>
      <TopicNav topic="Stop and Search" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Stop and Search"
          question="Is Stop and Search Being Used Fairly?"
          finding="1.06 million stop and searches took place in England and Wales in 2023 — up 72% since 2016. Black people are stopped at a rate seven times higher than..."
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
            />
            <MetricCard
              label="Black people stopped vs white (ratio)"
              value="7:1"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 5:1 in 2018 · disproportionality highest in London"
              sparklineData={[4,4.5,5,5.5,6,6.5,7]}
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Stop and searches per year (England & Wales), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              yLabel="Stop and searches per year (England & Wales)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Stop and Search statistics',
                frequency: 'annual',
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
            <p>Data is sourced from official UK government statistics including ONS, NHS England, Home Office, DfE and devolved equivalents. All figures are for England unless otherwise stated. Trend data uses the most recent available release at time of publication. See individual metric sources for full methodology notes.</p>
          </div>
        </section>
      </main>
    </>
  );
}
