'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'ONS', dataset: 'Health State Life Expectancies', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/healthandlifeexpectancies', date: '2024' },
  { num: 2, name: 'OHID', dataset: 'Public Health Outcomes Framework', url: 'https://fingertips.phe.org.uk/profile/public-health-outcomes-framework', date: '2024' },
];

export default function HealthyLifeExpectancyPage() {
  const lifeExpectancy    = [80.2, 80.4, 80.5, 80.7, 80.9, 81.1, 81.2, 81.3, 81.3, 81.0, 80.8, 80.9, 81.0, 81.0];
  const healthyLE         = [63.8, 63.9, 64.1, 64.0, 64.2, 63.9, 63.7, 63.8, 63.4, 62.9, 62.8, 63.0, 63.2, 63.3];
  const deprivedHLE       = [52.3, 52.5, 52.6, 52.4, 52.5, 52.3, 52.1, 52.0, 51.8, 51.5, 51.4, 51.5, 51.6, 51.7];
  const affluentHLE       = [71.2, 71.4, 71.5, 71.6, 71.7, 71.8, 71.9, 72.0, 72.0, 71.7, 71.5, 71.6, 71.7, 71.8];

  const chart1Series: Series[] = [
    {
      id: 'life-expectancy',
      label: 'Life expectancy at birth (years)',
      colour: '#6B7280',
      data: lifeExpectancy.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
    {
      id: 'healthy-le',
      label: 'Healthy life expectancy at birth (years)',
      colour: '#E63946',
      data: healthyLE.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const chart2Series: Series[] = [
    {
      id: 'deprived-hle',
      label: 'Most deprived decile — HLE (years)',
      colour: '#E63946',
      data: deprivedHLE.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
    {
      id: 'affluent-hle',
      label: 'Least deprived decile — HLE (years)',
      colour: '#2A9D8F',
      data: affluentHLE.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2017, 0, 1), label: '2017: Life expectancy gains slow to near zero' },
    { date: new Date(2020, 0, 1), label: '2020: Covid — LE drops sharply' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: Deprivation gap widens during Covid' },
  ];

  return (
    <>
      <TopicNav topic="Healthy Life Expectancy" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Healthy Life Expectancy"
          question="Are People Living Longer but Sicker?"
          finding="Life expectancy has stalled and healthy life expectancy is falling — the average person now spends 16 years in poor health before death, with a 19-year gap between richest and poorest areas."
          colour="#E63946"
          preposition="in"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-chart1', label: 'LE vs HLE' },
          { id: 'sec-chart2', label: 'Deprivation gap' },
        ]} />

        <section id="sec-metrics" className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Healthy life expectancy at birth (years)"
              value="63.3"
              direction="down"
              polarity="down-is-bad"
              changeText="down from 63.8 in 2010 · life expectancy has risen but healthy years flat"
              sparklineData={[63.8, 64.1, 64.2, 64.0, 63.7, 63.4, 62.9, 63.0, 63.3]}
              source="ONS — Health State Life Expectancies 2024"
            />
            <MetricCard
              label="Years spent in poor health (years)"
              value="16.7"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 16.4 in 2010 · the 'morbidity expansion' is real"
              sparklineData={[16.4, 16.4, 16.5, 16.7, 16.6, 16.9, 17.1, 17.0, 16.7]}
              source="ONS — Health State Life Expectancies 2024"
            />
            <MetricCard
              label="Deprivation gap in HLE (years)"
              value="19.1"
              direction="up"
              polarity="up-is-bad"
              changeText="19 years between most and least deprived · gap not narrowing"
              sparklineData={[18.9, 19.0, 19.1, 19.2, 19.4, 19.8, 20.2, 20.1, 19.1]}
              source="ONS — Health State Life Expectancies by deprivation 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Life expectancy vs healthy life expectancy at birth, England 2010–2024 (years)"
              subtitle="Life expectancy measures total years survived. Healthy life expectancy measures years in good health. The widening gap represents years in poor health, disability, or chronic disease."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Years"
              source={{
                name: 'ONS',
                dataset: 'Health State Life Expectancies, UK — 2020 to 2022',
                frequency: 'annual (3-year rolling)',
                url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/healthandlifeexpectancies',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Healthy life expectancy by deprivation decile, England 2010–2024 (years)"
              subtitle="Healthy life expectancy at birth for people in the most and least deprived areas. The gap has remained around 19 years for over a decade."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Healthy life expectancy (years)"
              source={{
                name: 'ONS / OHID',
                dataset: 'Health state life expectancies by national deprivation deciles',
                frequency: 'annual (3-year rolling)',
                url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/healthandlifeexpectancies/bulletins/healthstatelifeexpectanciesuk/2018to2020',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Where progress is being made"
            value="Cardiovascular disease prevention"
            unit="NHS Health Checks programme"
            description="NHS Health Checks — offered to all adults aged 40–74 every 5 years — have delivered over 1.5 million checks per year when operating at full capacity. The programme identifies cardiovascular risk, hypertension, and pre-diabetes at a stage where lifestyle interventions can make a meaningful difference. Studies show NHS Health Checks reduce major cardiovascular events by around 10–20% in completers. Combined with statin prescribing and blood pressure management, cardiovascular mortality in England has fallen significantly since 2000 — one of the genuine success stories in preventable disease. The challenge is extending that success into wider health inequalities."
            source="Source: PHE — NHS Health Check programme impact 2023; ONS Health State Life Expectancies 2024."
          />
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on healthy life expectancy</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Life expectancy in England is around 81 years for men and 83 for women. But healthy life expectancy — the years lived in good health — is only around 63.<Cite nums={1} /> The average person spends the last 17–18 years of life in poor health or with a limiting condition. This is not a biological inevitability: it is a product of living conditions, diet, housing quality, employment conditions, social connection, and access to healthcare. Countries at similar overall wealth levels do better on healthy life expectancy, including Spain, Italy, and the Netherlands.</p>
              <p>The most striking feature of the data is not the average but the gap. People in the most deprived tenth of areas have a healthy life expectancy of around 52 years — nearly 20 years less than those in the least deprived tenth.<Cite nums={2} /> This is not a small difference: it means people in the poorest communities effectively age out of good health in their early 50s, decades before their better-off peers. The gap has not narrowed in over a decade. It actually widened during and after the Covid pandemic, as chronic disease burden fell disproportionately on deprived communities.<Cite nums={2} /></p>
              <p>Progress on life expectancy itself has stalled. After decades of improvement, gains in life expectancy slowed sharply after 2011, particularly in the most deprived areas.<Cite nums={1} /> Some analysts link this to austerity — cuts to local government services, social care, public health budgets, and welfare — though the causal pathway is disputed. What is not disputed is that the UK fell behind comparable countries in life expectancy improvement during the 2010s, and that the Covid pandemic reversed gains that had taken years to achieve.</p>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/healthandlifeexpectancies" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Health State Life Expectancies</a> — life expectancy and healthy life expectancy at birth. 3-year rolling average. Retrieved 2024.</p>
            <p><a href="https://fingertips.phe.org.uk/profile/public-health-outcomes-framework" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">OHID — Public Health Outcomes Framework</a> — healthy life expectancy by deprivation decile. Annual. Retrieved 2024.</p>
            <p>Healthy life expectancy is defined using self-reported general health from the Annual Population Survey. Years in poor health is calculated as life expectancy minus healthy life expectancy. Deprivation deciles use the Index of Multiple Deprivation (IMD) for England. Figures are for England unless otherwise stated.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
