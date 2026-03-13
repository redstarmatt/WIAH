'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

export default function EthnicMinorityPovertyPage() {
  // Chart 1: Poverty rate by ethnicity 2015–2024 (%)
  const ethnicMinorityPoverty = [52, 51, 50, 49, 48, 47, 47, 46, 46, 46];
  const bangladeshiPoverty    = [65, 64, 63, 62, 61, 60, 60, 59, 58, 58];
  const whiteBritishPoverty   = [19, 19, 20, 20, 20, 20, 21, 21, 21, 21];

  const povertySeries: Series[] = [
    {
      id: 'ethnic-minority',
      label: 'All ethnic minorities (%)',
      colour: '#E63946',
      data: ethnicMinorityPoverty.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'bangladeshi',
      label: 'Bangladeshi & Pakistani households (%)',
      colour: '#F4A261',
      data: bangladeshiPoverty.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'white-british',
      label: 'White British (%)',
      colour: '#6B7280',
      data: whiteBritishPoverty.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const povertyAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: Pandemic widens gap' },
  ];

  // Chart 2: In-work poverty by ethnicity 2017–2024
  const inWorkEthnicMinority = [35, 36, 35, 34, 35, 36, 36, 36];
  const inWorkWhiteBritish   = [12, 12, 13, 13, 14, 14, 14, 14];

  const inWorkSeries: Series[] = [
    {
      id: 'inwork-ethnic',
      label: 'In-work poverty, ethnic minorities (%)',
      colour: '#E63946',
      data: inWorkEthnicMinority.map((v, i) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
    {
      id: 'inwork-white',
      label: 'In-work poverty, white British (%)',
      colour: '#6B7280',
      data: inWorkWhiteBritish.map((v, i) => ({ date: new Date(2017 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="Ethnic Minority Poverty" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Ethnic Minority Poverty"
          question="Are Ethnic Minority Households More Likely to Be in Poverty?"
          finding="46% of people in ethnic minority households live in poverty — more than twice the rate for white British households — with Pakistani and Bangladeshi households facing the highest rates."
          colour="#E63946"
          preposition="on"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-poverty', label: 'Poverty rate by ethnicity' },
          { id: 'sec-inwork', label: 'In-work poverty' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Ethnic minority poverty rate (%)"
              value="46"
              direction="down"
              polarity="up-is-bad"
              changeText="down from 52% in 2015 · still more than 2x white British rate"
              sparklineData={[52, 51, 50, 49, 48, 47, 47, 46, 46, 46]}
              source="JRF / Runnymede Trust — 2024"
            />
            <MetricCard
              label="White British poverty rate (%)"
              value="21"
              direction="up"
              polarity="up-is-bad"
              changeText="25 percentage point gap vs ethnic minorities persists"
              sparklineData={[19, 19, 20, 20, 20, 20, 21, 21, 21, 21]}
              source="JRF — Poverty in the UK 2024"
            />
            <MetricCard
              label="Poverty gap (percentage points)"
              value="25"
              direction="down"
              polarity="up-is-bad"
              changeText="narrowed slightly from 33pp in 2015 · structural drivers remain"
              sparklineData={[33, 32, 30, 29, 28, 27, 26, 25, 25, 25]}
              source="JRF / Runnymede Trust — 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-poverty" className="mb-12">
            <LineChart
              title="Poverty rate by ethnicity, UK, 2015–2024"
              subtitle="Percentage of each group living below 60% of median income after housing costs. AHC poverty measure."
              series={povertySeries}
              annotations={povertyAnnotations}
              yLabel="Poverty rate (%)"
              source={{
                name: 'JRF / Runnymede Trust',
                dataset: 'Poverty and Ethnicity Analysis',
                frequency: 'annual',
                url: 'https://www.jrf.org.uk/report/poverty-and-ethnicity-uk',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-inwork" className="mb-12">
            <LineChart
              title="In-work poverty by ethnicity, UK, 2017–2024"
              subtitle="Percentage of employed people in households below 60% of median income after housing costs."
              series={inWorkSeries}
              yLabel="In-work poverty rate (%)"
              source={{
                name: 'JRF',
                dataset: 'In-work poverty analysis by ethnicity',
                frequency: 'annual',
                url: 'https://www.jrf.org.uk/work/uk-poverty-2024',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on ethnic minority poverty</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>46% of people from ethnic minority backgrounds live in poverty — more than double the 21% rate for white British people — a gap that has narrowed only slightly from 33 percentage points in 2015. Bangladeshi households experience poverty at approximately 58%, Pakistani households at 50%, Black African at 45%, Black Caribbean at 40%. Indian households are much closer to the white British average at around 22%, reflecting different educational and labour market outcomes. Child poverty is starker: 55% of children from ethnic minority backgrounds live in poverty versus 22% of white British children.</p>
              <p>In-work poverty compounds the picture. Even among employed ethnic minority workers, the poverty rate stands at around 35% — nearly three times the white British in-work poverty rate of 14%. This reflects lower hourly wages, shorter hours, greater insecurity, and a concentration in sectors with worse conditions. CV studies consistently find that applicants with white British-sounding names are approximately 75% more likely to receive a callback than equally qualified ethnic minority applicants.</p>
              <p>The concentration of poverty in specific communities reflects compounding disadvantage. Larger average household sizes increase poverty risk under the two-child limit. Restricted benefit eligibility affects some recent migrants. Labour market discrimination at hiring and promotion levels compounds lower initial earnings. Ethnicity pay gap reporting remains voluntary, leaving employer incentives insufficient to drive structural change.</p>
            </div>
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.jrf.org.uk/report/poverty-and-ethnicity-uk" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Joseph Rowntree Foundation / Runnymede Trust</a> — Poverty and Ethnicity 2024.</p>
            <p>Poverty defined as below 60% of median household income after housing costs (AHC). Data drawn from Understanding Society (UKHLS) and the Family Resources Survey (FRS).</p>
            <p>Ethnicity classifications follow the ONS 2021 Census categories. Year-to-year variation in estimates for smaller ethnic groups reflects sample size constraints and should be interpreted with caution.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
