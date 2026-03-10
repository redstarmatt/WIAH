'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function SameDayEmergencyCarePage() {

  const sparkData = [1.2,1.4,1.8,2.2,2.6,2.9,3.1];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'SDEC attendances (England, annual, millions)',
      colour: '#2A9D8F',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'A&E 4-hour performance',
      colour: '#6B7280',
      data: ([91.3,88,83.5,78,76,74,73]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];
  const chartAnnotations: Annotation[] = [
    { date: new Date(2019, 0, 1), label: '2019: NHS Long Term Plan · SDEC expansion' },
  ];

  return (
    <>
      <TopicNav topic="Same-Day Emergency Care" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Same-Day Emergency Care"
          question="Is Same-Day Emergency Care Reducing A&E Pressure?"
          finding="Same-day emergency care attendances have grown to 3.1 million per year — diverting significant demand from emergency departments. A&E four-hour performance remains stuck at 73%, well below the 95% standard not met since 2013."
          colour="#2A9D8F"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="SDEC attendances (England, annual, millions)"
              value="3.1"
              direction="up"
              polarity="up-is-good"
              changeText="up from 1.2M in 2019 · diverts A&E pressure"
              sparklineData={[1.2,1.4,1.8,2.2,2.6,2.9,3.1]}
              source="NHS England — Feb 2024"
            />
            <MetricCard
              label="A&E 4-hour performance"
              value="73.0%"
              direction="down"
              polarity="up-is-good"
              changeText="down from 91.3% in 2015 · 95% target not met since 2013"
              sparklineData={[91.3,88,83.5,78,76,74,73]}
              source="NHS England — Feb 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="SDEC attendances (England, annual, millions), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              annotations={chartAnnotations}
              yLabel="SDEC attendances (England, annual, millions)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Same-Day Emergency Care statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="A&E 4-hour performance, UK"
              subtitle="UK data. Source: official government statistics."
              series={[{
                id: 'sec',
                label: 'A&E 4-hour performance',
                colour: '#6B7280',
                data: ([91.3,88,83.5,78,76,74,73]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
              }]}
              yLabel="A&E 4-hour performance"
              source={{
                name: 'NHS England',
                dataset: 'A&E 4-hour performance',
                frequency: 'annual',
                url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/ae-waiting-times-and-activity/',
                date: 'Feb 2024',
              }}
            />
          </section>
        </ScrollReveal>


        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Same-Day Emergency Care</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Same-Day Emergency Care in the United Kingdom: the numbers show a complex picture. Same-day emergency care attendances have grown to 3.1 million per year — diverting significant demand from emergency departments. A&E four-hour performance remains stuck at 73%, well below the 95% standard not met since 2013. The headline figure — 3.1 for sdec attendances (england, annual, millions) — up from 1.2M in 2019 · diverts A&E pressure.</p>
              <p>The secondary metric tells an equally important story: a&e 4-hour performance stands at 73.0%, where down from 91.3% in 2015 · 95% target not met since 2013. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
            </div>
          </section>
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <div className="space-y-2"><p><a href="https://www.england.nhs.uk/statistics/statistical-work-areas/ae-waiting-times-and-activity/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England</a> — primary data source. Retrieved Feb 2024.</p><p>All figures are for England unless otherwise stated. Trend data uses the most recent available release at time of publication.</p></div>
          </div>
        </section>
      </main>
    </>
  );
}
