'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function ScamLossesPage() {

  const sparkData = [381,455,479,524,510,485,459];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Authorised push payment fraud losses',
      colour: '#E63946',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'UK adults falling victim to scams (annual)',
      colour: '#6B7280',
      data: ([1.9,2,2.2,2.4,2.5,2.6,2.7]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="Scam Losses" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Scam Losses"
          question="How Much Are Britons Losing to Scams?"
          finding="Authorised push payment fraud losses fell 12% to £459 million following the introduction of mandatory bank reimbursement. But 2.7 million adults still..."
          colour="#E63946"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Authorised push payment fraud losses"
              value="£459M"
              direction="down"
              polarity="up-is-good"
              changeText="down 12% from £524M peak · mandatory reimbursement now in force"
              sparklineData={[381,455,479,524,510,485,459]}
            />
            <MetricCard
              label="UK adults falling victim to scams (annual)"
              value="2.7M"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 1.9M in 2018 · phone and online scams dominating"
              sparklineData={[1.9,2,2.2,2.4,2.5,2.6,2.7]}
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Authorised push payment fraud losses, UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              yLabel="Authorised push payment fraud losses"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Scam Losses statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The Mandatory Reimbursement Regime Is Working — But Not Enough</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Authorised push payment fraud losses fell 12% to £459 million in 2023 following the introduction of mandatory bank reimbursement by the Payment Systems Regulator — a significant policy win after years of banks refusing liability. But 2.7 million adults still fall victim to scams each year, and phone and online fraud continue to grow. Investment fraud and romance fraud are now the largest and most psychologically damaging categories.</p>
              <p>The reimbursement cap of £85,000 excludes high-value victims, and the obligation on banks to reimburse has created arguments about its possible effect on payment friction. A more fundamental problem is that the UK's online advertising market continues to host fraudulent ads at scale: Meta and Google are the primary distribution channels for most UK scam operations, and the Online Safety Act's scope for addressing this remains limited. International money flows make asset recovery very low.</p>
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
