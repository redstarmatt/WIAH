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

// Male life expectancy at birth — most vs least deprived decile, 2001–2023 (England)
const maleMostDeprived = [72.3, 72.5, 72.7, 72.9, 73.2, 73.5, 73.8, 74.0, 74.1, 74.2, 74.1, 74.0, 73.8, 73.5, 73.2, 73.0, 72.6, 73.1, 72.8, 73.4, 71.8, 73.0, 73.2];
const maleLeastDeprived = [79.5, 79.7, 79.9, 80.2, 80.5, 80.8, 81.1, 81.4, 81.6, 81.8, 82.0, 82.2, 82.4, 82.5, 82.7, 82.8, 83.0, 83.1, 83.2, 83.3, 82.6, 83.1, 83.1];

// Female life expectancy at birth — most vs least deprived decile, 2001–2023 (England)
const femaleMostDeprived = [77.5, 77.6, 77.8, 77.9, 78.1, 78.3, 78.5, 78.6, 78.7, 78.6, 78.5, 78.3, 78.2, 78.0, 77.8, 77.7, 77.5, 77.8, 77.6, 78.0, 76.8, 77.6, 77.8];
const femaleLeastDeprived = [83.4, 83.5, 83.7, 83.9, 84.1, 84.3, 84.5, 84.7, 84.9, 85.1, 85.3, 85.5, 85.7, 85.8, 85.9, 86.0, 86.1, 86.2, 86.3, 86.3, 85.5, 86.1, 86.2];

const series1: Series[] = [
  {
    id: 'male-most-deprived',
    label: 'Most deprived decile',
    colour: '#E63946',
    data: maleMostDeprived.map((v, i) => ({ date: new Date(2001 + i, 0, 1), value: v })),
  },
  {
    id: 'male-least-deprived',
    label: 'Least deprived decile',
    colour: '#2A9D8F',
    data: maleLeastDeprived.map((v, i) => ({ date: new Date(2001 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'female-most-deprived',
    label: 'Most deprived decile',
    colour: '#E63946',
    data: femaleMostDeprived.map((v, i) => ({ date: new Date(2001 + i, 0, 1), value: v })),
  },
  {
    id: 'female-least-deprived',
    label: 'Least deprived decile',
    colour: '#2A9D8F',
    data: femaleLeastDeprived.map((v, i) => ({ date: new Date(2001 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2011, 0, 1), label: '2011: Life expectancy gains stall' },
  { date: new Date(2020, 0, 1), label: '2020: COVID-19 pandemic' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'ONS', dataset: 'Life Expectancy by Local Area and Deprivation', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/healthandlifeexpectancies', date: '2024' },
  { num: 2, name: 'OHID', dataset: 'Health Disparities and Inequalities', url: 'https://www.gov.uk/government/collections/health-profile-for-england', date: '2023' },
  { num: 3, name: 'Institute of Health Equity', dataset: 'Marmot Review 10 Years On', url: 'https://www.instituteofhealthequity.org/resources-reports/marmot-review-10-years-on', date: '2020' },
];

export default function LifeExpectancyGapPage() {
  return (
    <>
      <TopicNav topic="Life Expectancy Gap" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Life Expectancy Gap"
          question="Does Where You Live Decide How Long You Live?"
          finding="Life expectancy in England has stalled since 2011 — the first sustained halt in over a century. The gap between the richest and poorest areas is 9.7 years for men and 7.9 years for women, and it is widening."
          colour="#E63946"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>For the first time in over a century, life expectancy improvements in England have stalled. Between 2001 and 2011, life expectancy at birth rose by roughly one year every four years across all groups. Since 2011, that progress has flatlined for the population as a whole and gone into reverse for the most deprived communities.<Cite nums={1} /> A boy born today in the most deprived tenth of neighbourhoods can expect to live to 73.2 — nearly a decade less than one born in the least deprived tenth, where male life expectancy stands at 83.1 years.<Cite nums={1} /> For healthy life expectancy — the years lived in good health — the gap is even starker at 18.6 years, meaning people in poorer areas not only die younger but spend far more of their shorter lives in ill health.<Cite nums={2} /></p>
            <p>The Marmot Review 10 Years On, published in February 2020 just before the pandemic, described the stalling of life expectancy as a national scandal and directly linked it to a decade of austerity that had reduced funding for public health, social care, housing and the social safety net.<Cite nums={3} /> COVID-19 then deepened every existing inequality: age-standardised mortality rates in the most deprived areas were more than double those in the least deprived during the first wave. The geographic pattern is stark — life expectancy in Blackpool, Middlesbrough and parts of Greater Manchester lags a decade behind Richmond-upon-Thames and Hart in Hampshire. These are not random variations; they follow a social gradient that tracks deprivation, housing quality, employment security and access to healthcare with mathematical precision.<Cite nums={1} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Male life expectancy' },
          { id: 'sec-chart2', label: 'Female life expectancy' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Male life expectancy gap (richest vs poorest)"
              value="9.7 yrs"
              unit="2023"
              direction="up"
              polarity="up-is-bad"
              changeText="widened from 7.2 years in 2001"
              sparklineData={[7.2, 7.3, 7.5, 7.8, 8.0, 8.3, 8.5, 8.8, 9.0, 9.3, 9.5, 9.7]}
              source="ONS — Life Expectancy by Deprivation 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Healthy life expectancy gap"
              value="18.6 yrs"
              unit="2023"
              direction="up"
              polarity="up-is-bad"
              changeText="most deprived: 52 yrs in good health · least: 71 yrs"
              sparklineData={[15.8, 16.0, 16.5, 17.0, 17.2, 17.5, 17.8, 18.0, 18.3, 18.6]}
              source="OHID — Health Disparities 2023"
              href="#sec-chart2"
            />
            <MetricCard
              label="Years since progress stalled"
              value="13"
              unit="since 2011"
              direction="up"
              polarity="up-is-bad"
              changeText="first sustained halt in 100+ years · worst in G7"
              sparklineData={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]}
              source="ONS — National Life Tables 2024"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Male life expectancy by deprivation, England, 2001–2023"
              subtitle="Life expectancy at birth for men in the most (red) and least (green) deprived decile of neighbourhoods. The gap has widened from 7.2 to 9.7 years."
              series={series1}
              annotations={annotations}
              yLabel="Life expectancy (years)"
              source={{ name: 'ONS', dataset: 'Life Expectancy by Local Area and Deprivation', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/healthandlifeexpectancies', frequency: 'annual', date: 'Mar 2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Female life expectancy by deprivation, England, 2001–2023"
              subtitle="Women in the most deprived areas (red) have seen life expectancy fall since 2011, while the least deprived (green) continue to gain."
              series={series2}
              annotations={annotations}
              yLabel="Life expectancy (years)"
              source={{ name: 'ONS', dataset: 'Life Expectancy by Local Area and Deprivation', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/healthandlifeexpectancies', frequency: 'annual', date: 'Mar 2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Tobacco control: proof that policy can close the gap"
            value="62%"
            unit="decline in smoking prevalence since 2000"
            description="Sustained tobacco control policy — advertising bans, plain packaging, indoor smoking bans, and cessation services — has reduced adult smoking prevalence from 27% in 2000 to around 10.3% in 2023, with the steepest declines in the most deprived groups. Smoking remains the single largest contributor to the life expectancy gap, accounting for roughly a third of the difference between the most and least deprived. The success of tobacco control demonstrates that upstream, regulatory approaches to public health can reduce inequality — but only when they are sustained over decades and properly funded."
            source="Source: ONS — Adult Smoking Habits 2023. Action on Smoking and Health (ASH) analysis."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/healthandlifeexpectancies" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Life Expectancy by Local Area and Deprivation</a> — primary source for life expectancy estimates by Index of Multiple Deprivation decile. Based on death registrations and mid-year population estimates.</p>
            <p><a href="https://www.gov.uk/government/collections/health-profile-for-england" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">OHID — Health Disparities and Inequalities</a> — healthy life expectancy estimates combining mortality data with self-reported health from the Annual Population Survey.</p>
            <p><a href="https://www.instituteofhealthequity.org/resources-reports/marmot-review-10-years-on" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Institute of Health Equity — Marmot Review 10 Years On</a> — comprehensive analysis of the social determinants of health inequalities in England, published February 2020.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
