'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function NaloxoneProvisionPage() {

  const sparkData = [26000,35000,50000,65000,80000,95000,108000];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Naloxone packs distributed in England (annual)',
      colour: '#2A9D8F',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Drug overdose deaths (England & Wales)',
      colour: '#6B7280',
      data: ([3700,3800,4000,4200,4500,4700,4907]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];
  const chartAnnotations: Annotation[] = [
    { date: new Date(2015, 0, 1), label: '2015: Take-home naloxone expanded' },
  ];

  return (
    <>
      <TopicNav topic="Naloxone Provision" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Naloxone Provision"
          question="Is Naloxone Getting to People Who Need It?"
          finding="108,000 naloxone packs were distributed in England last year — up from 26,000 in 2016. Each dose can reverse an opioid overdose. But drug deaths hit a record 4,907 in 2022, showing provision has not yet matched need."
          colour="#2A9D8F"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Naloxone packs distributed in England (annual)"
              value="108,000"
              direction="up"
              polarity="up-is-good"
              changeText="up from 26,000 in 2016 · each dose can reverse an overdose"
              sparklineData={[26000,35000,50000,65000,80000,95000,108000]}
              source="OHID / ONS — Oct 2023"
            />
            <MetricCard
              label="Drug overdose deaths (England & Wales)"
              value="4,907"
              direction="up"
              polarity="up-is-bad"
              changeText="record high in 2022 · naloxone distribution still insufficient"
              sparklineData={[3700,3800,4000,4200,4500,4700,4907]}
              source="OHID / ONS — Oct 2023"
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Naloxone packs distributed in England (annual), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              annotations={chartAnnotations}
              yLabel="Naloxone packs distributed in England (annual)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Naloxone Provision statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Drug overdose deaths (England & Wales), UK"
              subtitle="UK data. Source: official government statistics."
              series={[{
                id: 'sec',
                label: 'Drug overdose deaths (England & Wales)',
                colour: '#6B7280',
                data: ([3700,3800,4000,4200,4500,4700,4907]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
              }]}
              yLabel="Drug overdose deaths (England & Wales)"
              source={{
                name: 'OHID / ONS',
                dataset: 'Drug overdose deaths (England & Wales)',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/naloxone-provision-in-england',
                date: 'Oct 2023',
              }}
            />
          </section>
        </ScrollReveal>


        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Naloxone Provision</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Naloxone Provision in the United Kingdom: the numbers show a complex picture. 108,000 naloxone packs were distributed in England last year — up from 26,000 in 2016. Each dose can reverse an opioid overdose. But drug deaths hit a record 4,907 in 2022, showing provision has not yet matched need. The headline figure — 108,000 for naloxone packs distributed in england (annual) — up from 26,000 in 2016 · each dose can reverse an overdose.</p>
              <p>The secondary metric tells an equally important story: drug overdose deaths (england & wales) stands at 4,907, where record high in 2022 · naloxone distribution still insufficient. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
            </div>
          </section>
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <div className="space-y-2"><p><a href="https://www.gov.uk/government/statistics/naloxone-provision-in-england" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">OHID / ONS</a> — primary data source. Retrieved Oct 2023.</p><p>All figures are for England unless otherwise stated. Trend data uses the most recent available release at time of publication.</p></div>
          </div>
        </section>
      </main>
    </>
  );
}
