'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function LpaCapacityCrisisPage() {

  const sparkData = [16200,15000,13500,12500,11800,11200,10700];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Local planning authority staff (England, FTE)',
      colour: '#F4A261',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Major planning applications decided on time (%)',
      colour: '#6B7280',
      data: ([85,83,81,79,77,76,75]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];
  const chartAnnotations: Annotation[] = [
    { date: new Date(2010, 0, 1), label: '2010: Planning cuts begin' },
  ];
  const chartTargetLine = { value: 90.0, label: 'MHCLG 90% on-time target' };

  return (
    <>
      <TopicNav topic="Planning Authority Capacity" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Planning Authority Capacity"
          question="Are Local Planning Departments Overwhelmed?"
          finding="Local planning authority staffing in England has fallen 34% since 2010 — from 16,200 to 10,700. Only 75% of major planning applications are decided on time, frustrating housebuilding and economic development."
          colour="#F4A261"
          preposition="in"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Local planning authority staff (England, FTE)"
              value="10,700"
              direction="down"
              polarity="up-is-bad"
              changeText="down from 16,200 in 2010 · 34% cut in 15 years"
              sparklineData={[16200,15000,13500,12500,11800,11200,10700]}
              source="MHCLG — Dec 2023"
            />
            <MetricCard
              label="Major planning applications decided on time (%)"
              value="75"
              direction="down"
              polarity="up-is-good"
              changeText="down from 85% in 2016 · underfunded departments"
              sparklineData={[85,83,81,79,77,76,75]}
              source="MHCLG — Dec 2023"
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Local planning authority staff (England, FTE), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              targetLine={chartTargetLine}
              annotations={chartAnnotations}
              yLabel="Local planning authority staff (England, FTE)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Planning Authority Capacity statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Major planning applications decided on time (%), UK"
              subtitle="UK data. Source: official government statistics."
              series={[{
                id: 'sec',
                label: 'Major planning applications decided on time (%)',
                colour: '#6B7280',
                data: ([85,83,81,79,77,76,75]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
              }]}
              yLabel="Major planning applications decided on time (%)"
              source={{
                name: 'MHCLG',
                dataset: 'Major planning applications decided on time (%)',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/planning-applications-in-england',
                date: 'Dec 2023',
              }}
            />
          </section>
        </ScrollReveal>


        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Planning Authority Capacity</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Planning Authority Capacity in the United Kingdom: the numbers show a complex picture. Local planning authority staffing in England has fallen 34% since 2010 — from 16,200 to 10,700. Only 75% of major planning applications are decided on time, frustrating housebuilding and economic development. The headline figure — 10,700 for local planning authority staff (england, fte) — down from 16,200 in 2010 · 34% cut in 15 years.</p>
              <p>The secondary metric tells an equally important story: major planning applications decided on time (%) stands at 75, where down from 85% in 2016 · underfunded departments. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
            </div>
          </section>
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <div className="space-y-2"><p><a href="https://www.gov.uk/government/statistics/planning-applications-in-england" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">MHCLG</a> — primary data source. Retrieved Dec 2023.</p><p>All figures are for England unless otherwise stated. Trend data uses the most recent available release at time of publication.</p></div>
          </div>
        </section>
      </main>
    </>
  );
}
