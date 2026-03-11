'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
export default function BreastScreeningPage() {

  const sparkData = [76.8,75.9,74.8,73.2,72,71.5,71.1];
  const chartSeries: Series[] = [
    {
      id: 'main',
      label: 'Breast screening coverage (3-year rate)',
      colour: '#2A9D8F',
      data: sparkData.map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'secondary',
      label: 'Cancers detected per 1,000 screened',
      colour: '#6B7280',
      data: ([8,8.1,8.2,8.3,8.2,8.3,8.3]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];
  const chartAnnotations: Annotation[] = [
    { date: new Date(2018, 0, 1), label: '2018: IT failure · 450K women missed' },
    { date: new Date(2020, 0, 1), label: '2020: COVID pause' },
  ];
  const chartTargetLine = { value: 75.0, label: 'NHS 75% coverage target' };

  return (
    <>
      <TopicNav topic="Breast Cancer Screening" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Breast Cancer Screening"
          question="Has Breast Screening Coverage Recovered from the Pandemic?"
          finding="Breast screening coverage fell to a 25-year low during the pandemic and has not recovered. Coverage is now 71.1% against a 75% target."
          colour="#2A9D8F"
          preposition="with"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MetricCard
              label="Breast screening coverage (3-year rate)"
              value="71.1%"
              direction="down"
              polarity="up-is-good"
              changeText="down from 76.8% in 2012 · pandemic gap not recovered"
              sparklineData={[76.8,75.9,74.8,73.2,72,71.5,71.1]}
              source="NHS England — Sep 2023"
            />
            <MetricCard
              label="Cancers detected per 1,000 screened"
              value="8.3"
              direction="flat"
              polarity="up-is-good"
              changeText="stable · increasing sensitivity of mammography"
              sparklineData={[8,8.1,8.2,8.3,8.2,8.3,8.3]}
              source="NHS England — Sep 2023"
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Breast screening coverage (3-year rate), UK"
              subtitle="UK data. Annotations mark key policy changes."
              series={chartSeries}
              targetLine={chartTargetLine}
              annotations={chartAnnotations}
              yLabel="Breast screening coverage (3-year rate)"
              source={{
                name: 'ONS / NHS England / Government Statistical Service',
                dataset: 'Breast Cancer Screening statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Cancers detected per 1,000 screened, UK"
              subtitle="UK data. Source: official government statistics."
              series={[{
                id: 'sec',
                label: 'Cancers detected per 1,000 screened',
                colour: '#6B7280',
                data: ([8,8.1,8.2,8.3,8.2,8.3,8.3]).map((v: number, i: number) => ({ date: new Date(2017 + i, 0, 1), value: v })),
              }]}
              yLabel="Cancers detected per 1,000 screened"
              source={{
                name: 'NHS England',
                dataset: 'Cancers detected per 1,000 screened',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/breast-screening-programme-england',
                date: 'Sep 2023',
              }}
            />
          </section>
        </ScrollReveal>


        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Breast Cancer Screening</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Breast Cancer Screening in the United Kingdom: the numbers show a complex picture. Breast screening coverage fell to a 25-year low during the pandemic and has not recovered. Coverage is now 71.1% against a 75% target. The headline figure — 71.1% for breast screening coverage (3-year rate) — down from 76.8% in 2012 · pandemic gap not recovered.</p>
              <p>The secondary metric tells an equally important story: cancers detected per 1,000 screened stands at 8.3, where stable · increasing sensitivity of mammography. Policy responses have been mixed, and the structural drivers of these trends require sustained attention beyond short-term interventions.</p>
            </div>
          </section>
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <div className="space-y-2"><p><a href="https://www.gov.uk/government/statistics/breast-screening-programme-england" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England</a> — primary data source. Retrieved Sep 2023.</p><p>All figures are for England unless otherwise stated. Trend data uses the most recent available release at time of publication.</p></div>
          </div>
        </section>
      </main>
    </>
  );
}
