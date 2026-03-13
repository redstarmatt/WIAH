'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

export default function RetrofitInsulationPage() {
  // Chart 1: Homes insulated under government schemes 2015–2024 (thousands)
  const homesInsulated = [380, 360, 340, 310, 290, 270, 250, 270, 250, 60];
  const targetLine = { value: 300, label: 'Target: 300,000 homes/year' };

  const insulatedSeries: Series[] = [
    {
      id: 'insulated',
      label: 'Homes insulated under government schemes (thousands)',
      colour: '#2A9D8F',
      data: homesInsulated.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const insulatedAnnotations: Annotation[] = [
    { date: new Date(2019, 0, 1), label: '2019: Green Homes Grant launched' },
    { date: new Date(2021, 0, 1), label: '2021: GHG cancelled after 6 months' },
    { date: new Date(2023, 0, 1), label: '2023: EPC C rental target dropped' },
  ];

  // Chart 2: UK insulation rate vs EU average 2015–2024
  const ukRate = [380, 360, 340, 310, 290, 270, 250, 270, 250, 60];
  const euAvg  = [900, 910, 920, 930, 940, 950, 960, 970, 980, 990];

  const comparisonSeries: Series[] = [
    {
      id: 'uk',
      label: 'UK homes insulated per year (thousands)',
      colour: '#E63946',
      data: ukRate.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'eu',
      label: 'EU comparable average (thousands, adjusted)',
      colour: '#2A9D8F',
      data: euAvg.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="Retrofit & Insulation" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Retrofit & Insulation"
          question="How Fast Is Britain Insulating Its Homes?"
          finding="Only 60,000 homes were insulated under government schemes in 2023 — against a target of 300,000 — and the UK insulates its homes at a quarter of the rate of comparable EU countries."
          colour="#2A9D8F"
          preposition="on"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-insulated', label: 'Homes insulated' },
          { id: 'sec-comparison', label: 'UK vs EU' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Homes insulated per year (thousands)"
              value="60"
              direction="down"
              polarity="down-is-bad"
              changeText="down from 380k in 2015 · Green Homes Grant cancellation"
              sparklineData={[380, 360, 340, 310, 290, 270, 250, 270, 250, 60]}
              source="DESNZ ECO / GBIS Statistics — 2024"
            />
            <MetricCard
              label="Target shortfall (%)"
              value="80"
              direction="up"
              polarity="up-is-bad"
              changeText="300k target · only 60k delivered · 80% below target"
              sparklineData={[0, 17, 26, 35, 42, 55, 67, 55, 67, 80]}
              source="National Infrastructure Commission — 2024"
            />
            <MetricCard
              label="Insulation jobs created (thousands)"
              value="18"
              direction="up"
              polarity="up-is-good"
              changeText="growing but need 500k to meet 2030 targets"
              sparklineData={[8, 9, 10, 11, 12, 14, 15, 16, 17, 18]}
              source="Insulation Industry Forum — 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-insulated" className="mb-12">
            <LineChart
              title="Homes insulated under government schemes, England, 2015–2024 (thousands)"
              subtitle="Annual number of homes receiving insulation measures through ECO, GBIS, and predecessor schemes. 2023 reflects first full year of Great British Insulation Scheme."
              series={insulatedSeries}
              annotations={insulatedAnnotations}
              targetLine={targetLine}
              yLabel="Homes insulated (thousands)"
              source={{
                name: 'DESNZ',
                dataset: 'Energy Company Obligation and Great British Insulation Scheme Statistics',
                frequency: 'quarterly',
                url: 'https://www.gov.uk/government/collections/energy-company-obligation',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-comparison" className="mb-12">
            <LineChart
              title="UK insulation rate vs EU comparable average, 2015–2024 (thousands of homes)"
              subtitle="UK homes insulated per year under government schemes compared with EU comparable-country average (adjusted for housing stock size). EU data from Buildings Performance Institute Europe."
              series={comparisonSeries}
              yLabel="Homes insulated (thousands)"
              source={{
                name: 'DESNZ / Buildings Performance Institute Europe (BPIE)',
                dataset: 'EU building renovation statistics',
                frequency: 'annual',
                url: 'https://www.bpie.eu/publications/',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on home insulation</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>The UK insulates its homes at a fraction of the rate needed for net zero — and at a fraction of comparable European countries. Only around 60,000 homes received insulation under government schemes in 2023, against a target of 300,000 and a net-zero requirement of around 2 million per year from the late 2020s. The UK rate is roughly a quarter of the European average for comparable housing stocks.</p>
              <p>The collapse from 380,000 insulations in 2015 to 60,000 in 2023 reflects a decade of policy instability. The Green Deal (2013) failed after low uptake. The Green Homes Grant launched in 2020 was cancelled after just six months following administrative chaos, wasting significant contractor investment. In 2023, the government dropped proposals to require landlords to bring rented properties to EPC C by 2028, removing the key market incentive for the private rented sector — the worst-performing part of the housing stock.</p>
              <p>The workforce challenge matches the financing gap. Meeting 2030 insulation targets would require around 500,000 trained retrofit workers — against a current trained workforce of under 50,000. The skills pipeline does not exist at scale, and without clear long-term policy commitment, contractors will not invest in training. An average whole-house retrofit costs £15,000–£25,000, which most households cannot fund from savings, and a national retrofit financing mechanism remains absent.</p>
            </div>
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.gov.uk/government/collections/energy-company-obligation" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DESNZ</a> — Energy Company Obligation and Great British Insulation Scheme statistics. Published quarterly.</p>
            <p><a href="https://www.gov.uk/government/collections/energy-performance-certificates" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DESNZ</a> — Energy Performance of Buildings Statistics. Published quarterly.</p>
            <p><a href="https://www.bpie.eu/publications/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Buildings Performance Institute Europe (BPIE)</a> — EU building renovation data. EU comparable average is adjusted for UK housing stock size. Retrofit rate estimates combine ECO scheme data, local authority returns, and energy efficiency survey data. The 2 million/year target is from Climate Change Committee Net Zero pathway modelling.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
