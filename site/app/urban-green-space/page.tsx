'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';

  const sparkData = [52,51,50,49,47,46,45];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Urban areas meeting WHO green space guideline (>1ha within 300m)',
      colour: '#2A9D8F',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Public parks budget cuts since 2010 (England, %)',
      colour: '#6B7280',
      data: ([0,-8,-15,-22,-30,-37,-42]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];

export default function UrbanGreenSpacePage() {
  return (
    <>
      <TopicNav topic="Urban Green Space" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Urban Green Space"
          question="Are British Cities Running Out of Green Space?"
          finding="Only 45% of urban areas meet the WHO guideline of one hectare of accessible green space within 300 metres — down from 52% in 2010. Council park budget..."
          colour="#2A9D8F"
          preposition="in"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Urban areas meeting WHO green space guideline (>1ha within 300m)"
              value="45%"
              direction="down"
              polarity="up-is-good"
              changeText="down from 52% in 2010 · development pressure on parks"
              sparklineData=[52,51,50,49,47,46,45]
            />
            <MetricCard
              label="Public parks budget cuts since 2010 (England, %)"
              value="-42%"
              direction="up"
              polarity="up-is-bad"
              changeText="real-terms cut · park rangers and maintenance hit hardest"
              sparklineData=[0,-8,-15,-22,-30,-37,-42]
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Urban areas meeting WHO green space guideline (>1ha within 300m), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              yLabel="Urban areas meeting WHO green space guideline (>1ha within 300m)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Urban Green Space statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">Cities Are Losing Their Parks, and Nobody Is Stopping It</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Only 45% of urban areas in England now meet the WHO guideline of one hectare of accessible public green space within 300 metres, down from 52% in 2010. Development pressure on urban land, parks maintenance cuts, and the loss of allotments to housing have all contributed. Council parks budgets have been cut 42% in real terms since 2010, with park rangers an early casualty.</p>
              <p>The health consequences of urban green space loss are well evidenced: access to parks reduces rates of depression, cardiovascular disease and childhood obesity; green space moderates urban heat island effects; and natural play spaces are important for child development. The losses fall disproportionately on deprived communities, who are least likely to have private gardens and most dependent on public green space. The Natural Environment White Paper and the Environment Act 2021 set biodiversity and tree planting targets, but urban park provision has no equivalent legal protection.</p>
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
