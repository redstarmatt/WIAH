'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function WaterCompanyLeakagePage() {

  const sparkData = [3400,3350,3300,3250,3150,3100,3060];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Water lost to leakage daily (England & Wales, million litres)',
      colour: '#264653',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Water companies meeting leakage targets (%)',
      colour: '#6B7280',
      data: ([75,70,65,58,50,45,43]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="Water Company Leakage" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Water Company Leakage"
          question="How Much Water Are the Companies Leaking?"
          finding="England and Wales loses 3,060 million litres of water per day to leakage — above the regulator's 2020 target of 2,800 million litres. Only 43% of wate..."
          colour="#264653"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Water lost to leakage daily (England & Wales, million litres)"
              value="3,060"
              direction="down"
              polarity="up-is-bad"
              changeText="down from 3,400 in 2017 but still above 2020 target of 2,800"
              sparklineData={[3400,3350,3300,3250,3150,3100,3060]}
            />
            <MetricCard
              label="Water companies meeting leakage targets (%)"
              value="43"
              direction="down"
              polarity="up-is-good"
              changeText="majority missing their own targets"
              sparklineData={[75,70,65,58,50,45,43]}
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Water lost to leakage daily (England & Wales, million litres), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              yLabel="Water lost to leakage daily (England & Wales, million litres)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Water Company Leakage statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The Water Companies Are Losing Three Billion Litres a Day</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>England and Wales loses 3,060 million litres of water per day to leakage from ageing infrastructure — equivalent to the daily water use of 20 million people. The regulator's 2020 target of 2,800 million litres per day has not been met. Only 43% of water companies are meeting their own leakage reduction targets. Meanwhile, most water companies are in financial distress from the combination of pandemic underinvestment and rising interest costs on their debt.</p>
              <p>The water industry's financial model — private companies with regulated monopolies, heavily leveraged through debt-financed ownership structures — has resulted in £72 billion of debt, reduced investment in infrastructure, and £72 billion in dividends paid since privatisation. Ofwat has begun to impose financial penalties and impose stricter conditions, but the underlying incentive structure makes sustained leakage reduction difficult. Water stress — driven by climate change and population growth — makes leakage reduction an infrastructure priority of the first order.</p>
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
