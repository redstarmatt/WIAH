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

// Male life expectancy at birth — most deprived vs least deprived decile, England, 2001–2023
const maleMostDeprived = [72.5, 72.6, 72.8, 73.0, 73.2, 73.5, 73.7, 73.9, 74.0, 74.1, 74.1, 74.0, 74.1, 74.0, 73.9, 73.7, 73.5, 73.1, 73.5, 73.6, 73.7, 73.8, 73.8];
const maleLeastDeprived = [79.2, 79.4, 79.6, 79.8, 80.0, 80.3, 80.5, 80.7, 80.9, 81.1, 81.3, 81.4, 81.5, 81.6, 81.7, 81.8, 82.0, 81.5, 82.1, 82.3, 82.5, 82.8, 83.5];

// Female life expectancy at birth — most deprived vs least deprived decile, England, 2001–2023
const femaleMostDeprived = [77.8, 77.9, 78.0, 78.1, 78.2, 78.3, 78.4, 78.5, 78.5, 78.5, 78.4, 78.3, 78.3, 78.2, 78.1, 78.0, 77.9, 77.4, 77.8, 78.0, 78.0, 78.1, 78.1];
const femaleLeastDeprived = [83.0, 83.2, 83.4, 83.5, 83.7, 83.9, 84.0, 84.2, 84.3, 84.5, 84.6, 84.7, 84.8, 85.0, 85.1, 85.3, 85.4, 84.9, 85.5, 85.6, 85.7, 85.8, 86.0];

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
  { date: new Date(2011, 0, 1), label: '2011: Life expectancy gains begin to stall' },
  { date: new Date(2020, 0, 1), label: '2020: COVID-19 pandemic' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'ONS', dataset: 'Life expectancy estimates by deprivation decile', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/lifeexpectancies', date: '2024' },
  { num: 2, name: 'OHID', dataset: 'Public Health Profiles — Health Inequalities', url: 'https://fingertips.phe.org.uk/profile/health-profiles', date: '2024' },
  { num: 3, name: 'Institute of Health Equity', dataset: 'Marmot Review 10 Years On', url: 'https://www.health.org.uk/publications/reports/the-marmot-review-10-years-on', date: '2020' },
];

export default function LifeExpectancyGapPage() {
  return (
    <>
      <TopicNav topic="Life Expectancy Gap" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Life Expectancy Gap"
          question="Does where you live decide how long you live?"
          finding="The gap in male life expectancy between the most and least deprived areas of England is 9.7 years. For healthy life expectancy, the gap is 18.6 years. Life expectancy improvements have stalled since 2011 — the first time in over a century — and COVID widened existing divides."
          colour="#E63946"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Life expectancy in England has effectively stalled since 2011, making the UK an outlier among comparable nations. ONS data shows that male life expectancy in the most deprived decile of areas was 73.8 years in 2023, compared with 83.5 years in the least deprived — a gap of 9.7 years.<Cite nums={1} /> For women, the equivalent figures are 78.1 and 86.0 years — a gap of 7.9 years. But life expectancy tells only part of the story. Healthy life expectancy — the years lived in good health — shows a gap of 18.6 years between the most and least deprived communities.<Cite nums={2} /> This means people in the poorest areas not only die sooner but spend far more of their shorter lives in poor health.</p>
            <p>The Marmot Review 10 Years On, published in 2020, documented how a decade of austerity had damaged the social determinants of health — income, housing, education, employment — and that these structural factors were driving the stall in life expectancy improvements.<Cite nums={3} /> COVID-19 then struck hardest in the communities that were already most vulnerable: mortality rates in the most deprived decile were more than double those in the least deprived. Since the pandemic, recovery has been uneven. The least deprived areas have broadly returned to pre-pandemic trajectories, while the most deprived have not. The result is a widening gap that now represents the starkest measure of inequality in the country: your postcode is a stronger predictor of your lifespan than your genetics.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Male LE gap' },
          { id: 'sec-chart2', label: 'Female LE gap' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Male life expectancy gap"
              value="9.7 years"
              unit="2023"
              direction="up"
              polarity="up-is-bad"
              changeText="most vs least deprived decile · widened from 6.7 years in 2001"
              sparklineData={maleLeastDeprived.slice(-8).map((v, i) => v - maleMostDeprived.slice(-8)[i])}
              source="ONS — Life expectancy by deprivation 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Healthy life expectancy gap"
              value="18.6 years"
              unit="2023"
              direction="up"
              polarity="up-is-bad"
              changeText="most vs least deprived · women in poorest areas: 19.3 years fewer"
              sparklineData={[16.0, 16.5, 16.8, 17.2, 17.5, 17.8, 18.2, 18.6]}
              source="OHID — Public Health Profiles 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Years of stalled progress"
              value="13"
              unit="since 2011"
              direction="up"
              polarity="up-is-bad"
              changeText="first sustained stall in 100+ years · unique among G7 nations"
              sparklineData={[79.0, 79.2, 79.3, 79.3, 79.4, 79.4, 79.4, 79.5, 79.0, 79.4, 79.5, 79.5, 79.5]}
              source="ONS — National life tables 2024"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Male life expectancy by deprivation decile, England, 2001–2023"
              subtitle="Most deprived (red) vs least deprived (green). The gap widened from 6.7 to 9.7 years. Improvements in the most deprived areas stalled entirely after 2011."
              series={series1}
              annotations={annotations}
              yLabel="Life expectancy at birth (years)"
              source={{ name: 'ONS', dataset: 'Life expectancy by deprivation decile', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/lifeexpectancies', frequency: 'annual', date: 'Mar 2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Female life expectancy by deprivation decile, England, 2001–2023"
              subtitle="Women in the most deprived areas have seen no improvement in life expectancy since 2011. In the least deprived areas, gains continued at roughly 0.1 years annually."
              series={series2}
              annotations={annotations}
              yLabel="Life expectancy at birth (years)"
              source={{ name: 'ONS', dataset: 'Life expectancy by deprivation decile', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/lifeexpectancies', frequency: 'annual', date: 'Mar 2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Targeted smoking cessation: proof that intervention works"
            value="5 years"
            unit="of gap closed in deprived areas since 2000"
            description="Targeted smoking cessation programmes in the most deprived communities contributed to closing approximately 5 years of the life expectancy gap attributable to smoking-related diseases between 2000 and 2015. Smoking prevalence in routine and manual occupations fell from 33% to 23% during this period. This demonstrates that sustained, funded public health interventions can narrow health inequalities — and that the post-2015 stall coincided with cuts to local public health budgets of 24% in real terms."
            source="Source: OHID Health Inequalities Dashboard 2024. The Health Foundation analysis of public health spending."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/lifeexpectancies" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Life expectancy estimates</a> — primary source for period life expectancy at birth by Index of Multiple Deprivation decile. Based on mortality rates and mid-year population estimates.</p>
            <p><a href="https://fingertips.phe.org.uk/profile/health-profiles" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">OHID — Public Health Profiles</a> — healthy life expectancy estimates combining mortality data with self-reported health status from the Annual Population Survey.</p>
            <p><a href="https://www.health.org.uk/publications/reports/the-marmot-review-10-years-on" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Institute of Health Equity — Marmot Review 10 Years On</a> — comprehensive analysis of how social determinants drive health inequalities, published February 2020.</p>
            <p>All figures are for England. Deprivation is measured using the English Index of Multiple Deprivation. Life expectancy figures are period estimates and reflect mortality rates in a given year rather than projections of future improvement.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
