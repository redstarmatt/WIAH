'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function BridgeMaintenanceBacklogPage() {

  const sparkData = [1.2,1.3,1.4,1.5,1.6,1.7,1.9];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Local road bridge maintenance backlog (England, £ billions)',
      colour: '#6B7280',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Bridges with weight restrictions (England)',
      colour: '#6B7280',
      data: ([1520,1600,1700,1800,1900,1980,2050]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];
  const chartAnnotations: Annotation[] = [
    { date: new Date(2010, 0, 1), label: '2010: Austerity cuts begin' },
  ];

  return (
    <>
      <TopicNav topic="Bridge Maintenance Backlog" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Bridge Maintenance Backlog"
          question="What is actually happening with Bridge Maintenance Backlog?"
          finding="Data on bridge maintenance backlog."
          colour="#6B7280"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Local road bridge maintenance backlog (England, £ billions)"
              value="1.9"
              direction="up"
              polarity="up-is-bad"
              changeText="up from £1.2B in 2018 · 28% of bridges need repair"
              sparklineData={[1.2,1.3,1.4,1.5,1.6,1.7,1.9]}
              source="DfT — Jul 2023"
            />
            <MetricCard
              label="Bridges with weight restrictions (England)"
              value="2,050"
              direction="up"
              polarity="up-is-bad"
              changeText="up 35% since 2015 · HGV diversions increasing"
              sparklineData={[1520,1600,1700,1800,1900,1980,2050]}
              source="DfT — Jul 2023"
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Local road bridge maintenance backlog (England, £ billions), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              annotations={chartAnnotations}
              yLabel="Local road bridge maintenance backlog (England, £ billions)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Bridge Maintenance Backlog statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Bridges with weight restrictions (England), UK"
              subtitle="UK data. Source: official government statistics."
              series={[{
                id: 'sec',
                label: 'Bridges with weight restrictions (England)',
                colour: '#6B7280',
                data: ([1520,1600,1700,1800,1900,1980,2050]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
              }]}
              yLabel="Bridges with weight restrictions (England)"
              source={{
                name: 'DfT',
                dataset: 'Bridges with weight restrictions (England)',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistical-data-sets/local-road-condition-in-england',
                date: 'Jul 2023',
              }}
            />
          </section>
        </ScrollReveal>


        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Bridge Maintenance Backlog</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Bridge Maintenance Backlog in the United Kingdom: the numbers show a complex picture. Data on bridge maintenance backlog. The headline figure — 1.9 for local road bridge maintenance backlog (england, £ billions) — up from £1.2B in 2018 · 28% of bridges need repair.</p>
              <p>The secondary metric tells an equally important story: bridges with weight restrictions (england) stands at 2,050, where up 35% since 2015 · HGV diversions increasing. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
            </div>
          </section>
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <div className="space-y-2"><p><a href="https://www.gov.uk/government/statistical-data-sets/local-road-condition-in-england" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfT</a> — primary data source. Retrieved Jul 2023.</p><p>All figures are for England unless otherwise stated. Trend data uses the most recent available release at time of publication.</p></div>
          </div>
        </section>
      </main>
    </>
  );
}
