'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function CareHomeSupplyPage() {

  const sparkData = [0,3000,5000,7000,9000,12000,15000];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Care home beds lost since 2015 (England)',
      colour: '#E63946',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Care home vacancy rate',
      colour: '#6B7280',
      data: ([10,12,11,9,8,7.9,7.8]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="Care Home Supply" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Care Home Supply"
          question="Are We Running Out of Care Home Places?"
          finding="England has lost 15,000 care home beds since 2015 as providers close rather than operate at a loss under local authority fee rates. High occupancy mas..."
          colour="#E63946"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Care home beds lost since 2015 (England)"
              value="15,000"
              direction="up"
              polarity="up-is-bad"
              changeText="net loss · new beds not replacing closures"
              sparklineData={[0,3000,5000,7000,9000,12000,15000]}
            />
            <MetricCard
              label="Care home vacancy rate"
              value="7.8%"
              direction="down"
              polarity="up-is-bad"
              changeText="down from 12% in 2021 · high occupancy masks fragility"
              sparklineData={[10,12,11,9,8,7.9,7.8]}
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Care home beds lost since 2015 (England), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              yLabel="Care home beds lost since 2015 (England)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Care Home Supply statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Care Home Supply</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Care Home Supply in the United Kingdom: the numbers show a complex picture. England has lost 15,000 care home beds since 2015 as providers close rather than operate at a loss under local authority fee rates. High occupancy masks the fragility of remaining supply. The headline figure — 15,000 for care home beds lost since 2015 (england) — net loss · new beds not replacing closures.</p>
              <p>The secondary metric tells an equally important story: care home vacancy rate stands at 7.8%, where down from 12% in 2021 · high occupancy masks fragility. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
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
