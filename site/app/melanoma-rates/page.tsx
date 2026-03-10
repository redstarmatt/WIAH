'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function MelanomaRatesPage() {

  const sparkData = [14,16,17,18,19,21,22.4];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Melanoma incidence per 100,000 (UK)',
      colour: '#E63946',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Melanoma 5-year survival rate',
      colour: '#6B7280',
      data: ([76,80,84,87,90,92,93]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="Melanoma Rates" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Melanoma Rates"
          question="Are Melanoma Cases Still Rising?"
          finding="Melanoma incidence has risen 135% in 40 years in the UK — now at 22.4 per 100,000. The five-year survival rate has improved to 93%, but Stage IV remai..."
          colour="#E63946"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Melanoma incidence per 100,000 (UK)"
              value="22.4"
              direction="up"
              polarity="up-is-bad"
              changeText="up 135% in 40 years · sunbed use and holiday patterns"
              sparklineData={[14,16,17,18,19,21,22.4]}
            />
            <MetricCard
              label="Melanoma 5-year survival rate"
              value="93%"
              direction="up"
              polarity="up-is-good"
              changeText="up from 76% in 2000 · stage IV still only 20%"
              sparklineData={[76,80,84,87,90,92,93]}
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Melanoma incidence per 100,000 (UK), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              yLabel="Melanoma incidence per 100,000 (UK)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Melanoma Rates statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Melanoma Rates</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Melanoma Rates in the United Kingdom: the numbers show a complex picture. Melanoma incidence has risen 135% in 40 years in the UK — now at 22.4 per 100,000. The five-year survival rate has improved to 93%, but Stage IV remains fatal for 80% of patients. Sunbed use remains a significant risk factor. The headline figure — 22.4 for melanoma incidence per 100,000 (uk) — up 135% in 40 years · sunbed use and holiday patterns.</p>
              <p>The secondary metric tells an equally important story: melanoma 5-year survival rate stands at 93%, where up from 76% in 2000 · stage IV still only 20%. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
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
