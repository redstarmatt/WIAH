'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function FixedOddsBettingReformPage() {

  const sparkData = [35000,35000,18000,18000,18000,18000,18000];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'FOBTs at £2 max stake vs pre-2019 (£100 max)',
      colour: '#2A9D8F',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Betting shop closures since 2019 FOBTs reform',
      colour: '#6B7280',
      data: ([0,0,1500,3000,3800,4300,4700]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];
  const chartAnnotations: Annotation[] = [
    { date: new Date(2019, 0, 1), label: '2019: Stake cut to £2' },
  ];

  return (
    <>
      <TopicNav topic="Fixed-Odds Betting Reform" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Fixed-Odds Betting Reform"
          question="Did Cutting FOBT Stakes Actually Work?"
          finding="The 2019 reduction of fixed-odds betting terminal stakes from £100 to £2 led to 4,700 betting shop closures within two years. Problem gambling rates have fallen, but online gambling has absorbed much of the displaced demand."
          colour="#2A9D8F"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="FOBTs at £2 max stake vs pre-2019 (£100 max)"
              value="18,000 remaining"
              direction="down"
              polarity="up-is-good"
              changeText="stake cut Apr 2019 · 4,700 betting shops closed within 2 years"
              sparklineData={[35000,35000,18000,18000,18000,18000,18000]}
              source="Gambling Commission — Nov 2023"
            />
            <MetricCard
              label="Betting shop closures since 2019 FOBTs reform"
              value="4,700"
              direction="up"
              polarity="up-is-good"
              changeText="shops closed as FOBT revenues collapsed"
              sparklineData={[0,0,1500,3000,3800,4300,4700]}
              source="Gambling Commission — Nov 2023"
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="FOBTs at £2 max stake vs pre-2019 (£100 max), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              annotations={chartAnnotations}
              yLabel="FOBTs at £2 max stake vs pre-2019 (£100 max)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Fixed-Odds Betting Reform statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Betting shop closures since 2019 FOBTs reform, UK"
              subtitle="UK data. Source: official government statistics."
              series={[{
                id: 'sec',
                label: 'Betting shop closures since 2019 FOBTs reform',
                colour: '#6B7280',
                data: ([0,0,1500,3000,3800,4300,4700]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
              }]}
              yLabel="Betting shop closures since 2019 FOBTs reform"
              source={{
                name: 'Gambling Commission',
                dataset: 'Betting shop closures since 2019 FOBTs reform',
                frequency: 'annual',
                url: 'https://www.gamblingcommission.gov.uk/statistics-and-research/publication/industry-statistics',
                date: 'Nov 2023',
              }}
            />
          </section>
        </ScrollReveal>


        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Fixed-Odds Betting Reform</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Fixed-Odds Betting Reform in the United Kingdom: the numbers show a complex picture. The 2019 reduction of fixed-odds betting terminal stakes from £100 to £2 led to 4,700 betting shop closures within two years. Problem gambling rates have fallen, but online gambling has absorbed much of the displaced demand. The headline figure — 18,000 remaining for fobts at £2 max stake vs pre-2019 (£100 max) — stake cut Apr 2019 · 4,700 betting shops closed within 2 years.</p>
              <p>The secondary metric tells an equally important story: betting shop closures since 2019 fobts reform stands at 4,700, where shops closed as FOBT revenues collapsed. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
            </div>
          </section>
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <div className="space-y-2"><p><a href="https://www.gamblingcommission.gov.uk/statistics-and-research/publication/industry-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Gambling Commission</a> — primary data source. Retrieved Nov 2023.</p><p>All figures are for England unless otherwise stated. Trend data uses the most recent available release at time of publication.</p></div>
          </div>
        </section>
      </main>
    </>
  );
}
