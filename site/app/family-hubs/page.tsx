'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function FamilyHubsPage() {

  const sparkData = [0,0,50,150,280,360,399];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Family hubs open across England',
      colour: '#2A9D8F',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: "Children\u2019s centres closed since 2010 (England)",
      colour: '#6B7280',
      data: ([0,200,500,800,1050,1200,1350]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];
  const chartAnnotations: Annotation[] = [
    { date: new Date(2021, 0, 1), label: '2021: Family Hubs programme announced' },
  ];

  return (
    <>
      <TopicNav topic="Family Hubs" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Family Hubs"
          question="Are Family Hubs Replacing Children's Centres?"
          finding="399 family hubs have opened across England since 2021, but 1,350 children's centres have closed since 2010. Family hubs are not replacing the full range of services that Sure Start provided."
          colour="#2A9D8F"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Family hubs open across England"
              value="399"
              direction="up"
              polarity="up-is-good"
              changeText="up from 0 in 2021 · government target 400 by end 2024"
              sparklineData={[0,0,50,150,280,360,399]}
              source="DfE — Dec 2023"
            />
            <MetricCard
              label="Children's centres closed since 2010 (England)"
              value="1,350"
              direction="up"
              polarity="up-is-bad"
              changeText="over half closed · family hubs not replacing all lost capacity"
              sparklineData={[0,200,500,800,1050,1200,1350]}
              source="DfE — Dec 2023"
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Family hubs open across England, UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              annotations={chartAnnotations}
              yLabel="Family hubs open across England"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Family Hubs statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Family Hubs</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Family Hubs in the United Kingdom: the numbers show a complex picture. 399 family hubs have opened across England since 2021, but 1,350 children's centres have closed since 2010. Family hubs are not replacing the full range of services that Sure Start provided. The headline figure — 399 for family hubs open across england — up from 0 in 2021 · government target 400 by end 2024.</p>
              <p>The secondary metric tells an equally important story: children's centres closed since 2010 (england) stands at 1,350, where over half closed · family hubs not replacing all lost capacity. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
            </div>
          </section>
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <div className="space-y-2"><p><a href="https://www.gov.uk/government/publications/family-hubs-and-start-for-life-programme" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfE</a> — primary data source. Retrieved Dec 2023.</p><p>All figures are for England unless otherwise stated. Trend data uses the most recent available release at time of publication.</p></div>
          </div>
        </section>
      </main>
    </>
  );
}
