'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function HpvVaccinationPage() {

  const sparkData = [87,86,78,81,82,83,84];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Girls completing HPV vaccination course',
      colour: '#2A9D8F',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Boys completing HPV vaccination course',
      colour: '#6B7280',
      data: ([0,0,65,70,72,74,75]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];
  const chartAnnotations: Annotation[] = [
    { date: new Date(2019, 0, 1), label: '2019: Programme extended to boys' },
    { date: new Date(2020, 0, 1), label: '2020: COVID · catch-up needed' },
  ];

  return (
    <>
      <TopicNav topic="HPV Vaccination" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="HPV Vaccination"
          question="Is HPV Vaccination Protecting Britain's Young People?"
          finding="84% of girls and 75% of boys complete the HPV vaccination course in England. The programme, extended to boys in 2019, is expected to eliminate most cervical cancers in vaccinated cohorts by the 2040s."
          colour="#2A9D8F"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Girls completing HPV vaccination course"
              value="84%"
              direction="down"
              polarity="up-is-good"
              changeText="down from 87% in 2019 · pandemic catch-up ongoing"
              sparklineData={[87,86,78,81,82,83,84]}
              source="UKHSA — Nov 2023"
            />
            <MetricCard
              label="Boys completing HPV vaccination course"
              value="75%"
              direction="up"
              polarity="up-is-good"
              changeText="programme extended to boys in 2019 · uptake climbing"
              sparklineData={[0,0,65,70,72,74,75]}
              source="UKHSA — Nov 2023"
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Girls completing HPV vaccination course, UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              annotations={chartAnnotations}
              yLabel="Girls completing HPV vaccination course"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'HPV Vaccination statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Boys completing HPV vaccination course, UK"
              subtitle="UK data. Source: official government statistics."
              series={[{
                id: 'sec',
                label: 'Boys completing HPV vaccination course',
                colour: '#6B7280',
                data: ([0,0,65,70,72,74,75]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
              }]}
              yLabel="Boys completing HPV vaccination course"
              source={{
                name: 'UKHSA',
                dataset: 'Boys completing HPV vaccination course',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/publications/hpv-vaccine-coverage-in-england',
                date: 'Nov 2023',
              }}
            />
          </section>
        </ScrollReveal>


        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on HPV Vaccination</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>HPV Vaccination in the United Kingdom: the numbers show a complex picture. 84% of girls and 75% of boys complete the HPV vaccination course in England. The programme, extended to boys in 2019, is expected to eliminate most cervical cancers in vaccinated cohorts by the 2040s. The headline figure — 84% for girls completing hpv vaccination course — down from 87% in 2019 · pandemic catch-up ongoing.</p>
              <p>The secondary metric tells an equally important story: boys completing hpv vaccination course stands at 75%, where programme extended to boys in 2019 · uptake climbing. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
            </div>
          </section>
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <div className="space-y-2"><p><a href="https://www.gov.uk/government/publications/hpv-vaccine-coverage-in-england" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">UKHSA</a> — primary data source. Retrieved Nov 2023.</p><p>All figures are for England unless otherwise stated. Trend data uses the most recent available release at time of publication.</p></div>
          </div>
        </section>
      </main>
    </>
  );
}
