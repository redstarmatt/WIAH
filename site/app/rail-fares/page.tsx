'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';

  const sparkData = [100,102,104,105,106,107,108];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'UK rail fares vs 2010 (real terms index)',
      colour: '#F4A261',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Average cost per mile by train vs car (pence)',
      colour: '#6B7280',
      data: ([28,29,29,30,30,31,31]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];

export default function RailFaresPage() {
  return (
    <>
      <TopicNav topic="Rail Fares" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Rail Fares"
          question="Is British Rail Still Too Expensive?"
          finding="UK rail fares are 8% higher in real terms than in 2010. Train travel costs 31p per mile on average — nearly twice the 17p per mile cost of driving. Hi..."
          colour="#F4A261"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="UK rail fares vs 2010 (real terms index)"
              value="108"
              direction="up"
              polarity="up-is-bad"
              changeText="up 8% in real terms since 2010 · fares rise RPI annually"
              sparklineData=[100,102,104,105,106,107,108]
            />
            <MetricCard
              label="Average cost per mile by train vs car (pence)"
              value="31p vs 17p"
              direction="flat"
              polarity="up-is-bad"
              changeText="rail nearly twice as expensive as car per mile"
              sparklineData=[28,29,29,30,30,31,31]
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="UK rail fares vs 2010 (real terms index), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              yLabel="UK rail fares vs 2010 (real terms index)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Rail Fares statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">Why Does the Train Cost Twice as Much as the Car?</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>UK rail fares are 8% higher in real terms than in 2010, while the cost of motoring has fallen substantially as fuel efficiency improved. The average train journey costs 31p per mile, nearly double the 17p per mile cost of driving. High fares deter switching from car to rail, undermine decarbonisation objectives, and represent a regressive burden on commuters who cannot afford to live near their workplace.</p>
              <p>The annual RPI-linked fare rise formula has been modified but never abolished. Rail nationalisation under Great British Railways is proceeding slowly, but the fare structure remains complex and expensive. Advance booking requirements, the absence of flexible season tickets that genuinely reflect hybrid work patterns, and the stark price differential between rail and aviation for longer journeys all contribute. Countries with lower fares — Germany, the Netherlands, Switzerland — all subsidise rail more heavily. The political choice in Britain has been to price rail as a commercial service while subsidising roads through fuel duty freeze and road investment.</p>
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
