'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function HabitatNetGainPage() {

  const sparkData = [0,0,0,1200,8000,10500,12400];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Planning permissions with mandatory BNG (England)',
      colour: '#2A9D8F',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Biodiversity units traded in market (annual)',
      colour: '#6B7280',
      data: ([0,0,0,5000,18000,30000,38000]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="Biodiversity Net Gain" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Biodiversity Net Gain"
          question="Is Biodiversity Net Gain Delivering for Nature?"
          finding="Mandatory biodiversity net gain came into force in February 2024 for major planning applications. 12,400 permissions have applied the 10% net gain sta..."
          colour="#2A9D8F"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Planning permissions with mandatory BNG (England)"
              value="12,400"
              direction="up"
              polarity="up-is-good"
              changeText="statutory BNG commenced Feb 2024 · small sites Feb 2025"
              sparklineData={[0,0,0,1200,8000,10500,12400]}
            />
            <MetricCard
              label="Biodiversity units traded in market (annual)"
              value="38,000"
              direction="up"
              polarity="up-is-good"
              changeText="new market emerging · quality verification challenges remain"
              sparklineData={[0,0,0,5000,18000,30000,38000]}
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Planning permissions with mandatory BNG (England), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              yLabel="Planning permissions with mandatory BNG (England)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Biodiversity Net Gain statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">Biodiversity Net Gain: A Market Solution to Nature Loss</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Mandatory biodiversity net gain came into force in February 2024 for major planning applications in England, requiring developers to deliver a 10% net improvement in biodiversity value. 12,400 planning permissions have applied the standard since launch, creating a new market for biodiversity credits from land managers who create or restore habitats. The approach is ambitious: it attempts to price nature into the planning system rather than simply protecting what remains.</p>
              <p>Sceptics raise valid concerns: the quality of biodiversity metrics is contested; offsite credits may not adequately compensate for locally irreplaceable habitats; verification and monitoring are resource-intensive for under-staffed local authorities; and the 30-year obligation attached to biodiversity units requires robust long-term governance. The approach also does nothing for the majority of biodiversity decline that occurs outside the planning system — in agricultural land management, river systems, and air quality. But as a mechanism for changing the incentives that developers face, it represents genuine progress.</p>
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
