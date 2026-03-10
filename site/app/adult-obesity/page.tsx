'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function AdultObesityPage() {

  const sparkData = [26.9,27.2,27.5,28,28.5,29,29.5];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Adult obesity prevalence (England)',
      colour: '#E63946',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Severe obesity (BMI 40+)',
      colour: '#6B7280',
      data: ([2.4,2.6,2.8,3.2,3.6,3.9,4.1]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];
  const chartAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: Pandemic · stress eating surge' },
  ];
  const chartTargetLine = { value: 27.0, label: 'CMO healthy weight target' };

  return (
    <>
      <TopicNav topic="Adult Obesity" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Adult Obesity"
          question="Is Adult Obesity Still Getting Worse?"
          finding="29.5% of adults in England are now obese — the highest rate on record. Severe obesity has risen from 2.4% in 2010 to 4.1% today, with the sharpest increases in the most deprived areas."
          colour="#E63946"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Adult obesity prevalence (England)"
              value="29.5%"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 26.9% in 2015 · highest rate on record"
              sparklineData={[26.9,27.2,27.5,28,28.5,29,29.5]}
              source="NHS Digital — Nov 2023"
            />
            <MetricCard
              label="Severe obesity (BMI 40+)"
              value="4.1%"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 2.4% in 2010 · highest deprivation quintile twice more affected"
              sparklineData={[2.4,2.6,2.8,3.2,3.6,3.9,4.1]}
              source="NHS Digital — Nov 2023"
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Adult obesity prevalence (England), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              targetLine={chartTargetLine}
              annotations={chartAnnotations}
              yLabel="Adult obesity prevalence (England)"
              source={{
                name: 'NHS Digital',
                dataset: 'Adult Obesity statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Severe obesity (BMI 40+), UK"
              subtitle="UK data. Source: official government statistics."
              series={[{
                id: 'sec',
                label: 'Severe obesity (BMI 40+)',
                colour: '#6B7280',
                data: ([2.4,2.6,2.8,3.2,3.6,3.9,4.1]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
              }]}
              yLabel="Severe obesity (BMI 40+)"
              source={{
                name: 'NHS Digital',
                dataset: 'Severe obesity (BMI 40+)',
                frequency: 'annual',
                url: 'https://digital.nhs.uk/data-and-information/publications/statistical/health-survey-for-england',
                date: 'Nov 2023',
              }}
            />
          </section>
        </ScrollReveal>


        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">Obesity in England: Why the Crisis Keeps Getting Worse</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>The proportion of English adults classified as obese reached 29.5% in 2023 — the highest rate on record, and up from 26.9% a decade ago. Severe obesity (BMI 40 and above) has risen even faster, from 2.4% in 2010 to 4.1% today. The health burden is not evenly distributed: rates in the most deprived quintile are nearly double those in the most affluent, a gradient that reflects not just dietary choices but differential access to exercise, affordable food and time.</p>
              <p>Policy responses have so far lagged the scale of the problem. The Soft Drinks Industry Levy was a genuine success in reducing sugar in drinks, but childhood obesity rates have continued to rise. The HFSS advertising watershed and junk food promotions ban were delayed repeatedly before partial implementation. GLP-1 receptor agonist drugs (semaglutide and tirzepatide) offer clinically significant weight loss, but NHS tier 3 obesity services have two-year waits. The fundamental drivers — ultra-processed food ubiquity, built environments hostile to walking and cycling, poverty, and long working hours — remain largely unaddressed.</p>
            </div>
          </section>
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <div className="space-y-2"><p><a href="https://digital.nhs.uk/data-and-information/publications/statistical/health-survey-for-england" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS Digital</a> — primary data source. Retrieved Nov 2023.</p><p>All figures are for England unless otherwise stated. Trend data uses the most recent available release at time of publication.</p></div>
          </div>
        </section>
      </main>
    </>
  );
}
