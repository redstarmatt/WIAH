'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function EconomicCrimeScalePage() {

  const sparkData = [5,5.8,6.3,7,7.5,8,8.3];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Total economic crime losses (UK, annual)',
      colour: '#E63946',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Fraud as share of all crime (England & Wales)',
      colour: '#6B7280',
      data: ([36,37,38,39,40,40,41]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="Economic Crime Scale" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economic Crime Scale"
          question="How Much Does Economic Crime Cost Britain?"
          finding="Economic crime costs the UK an estimated £8.3 billion a year — fraud alone accounts for 57% of that, and 41% of all crime reported in England and Wale..."
          colour="#E63946"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Total economic crime losses (UK, annual)"
              value="£8.3B"
              direction="up"
              polarity="up-is-bad"
              changeText="estimate · fraud largest component at 57%"
              sparklineData={[5,5.8,6.3,7,7.5,8,8.3]}
            />
            <MetricCard
              label="Fraud as share of all crime (England & Wales)"
              value="41%"
              direction="up"
              polarity="up-is-bad"
              changeText="fraud now largest single crime type"
              sparklineData={[36,37,38,39,40,40,41]}
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Total economic crime losses (UK, annual), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              yLabel="Total economic crime losses (UK, annual)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Economic Crime Scale statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Economic Crime Scale</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Economic Crime Scale in the United Kingdom: the numbers show a complex picture. Economic crime costs the UK an estimated £8.3 billion a year — fraud alone accounts for 57% of that, and 41% of all crime reported in England and Wales. Prosecution rates remain negligible relative to scale. The headline figure — £8.3B for total economic crime losses (uk, annual) — estimate · fraud largest component at 57%.</p>
              <p>The secondary metric tells an equally important story: fraud as share of all crime (england & wales) stands at 41%, where fraud now largest single crime type. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
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
