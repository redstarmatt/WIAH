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

// Adult obesity prevalence (%) and severe obesity (BMI 40+), 2005–2023 — Health Survey for England
const obesityValues = [22.1, 22.8, 23.5, 24.1, 24.8, 25.5, 26.1, 26.4, 26.9, 27.2, 27.5, 28.0, 28.5, 28.7, 28.0, 29.0, 29.3, 29.5, 29.5];
const severeObesityValues = [1.4, 1.6, 1.8, 2.0, 2.2, 2.4, 2.6, 2.7, 2.8, 2.9, 3.0, 3.2, 3.5, 3.7, 3.6, 3.8, 4.0, 4.1, 4.1];

// Deprivation gap: most vs least deprived quintile obesity (%), 2010–2023
const mostDeprivedValues = [31.5, 32.0, 32.5, 33.0, 33.5, 34.0, 35.0, 35.5, 36.0, 37.0, 37.0, 38.0, 38.5, 39.0];
const leastDeprivedValues = [17.1, 17.3, 17.4, 17.6, 17.8, 18.0, 18.5, 19.0, 19.5, 20.5, 21.0, 21.5, 22.0, 22.2];

const series1: Series[] = [
  {
    id: 'prevalence',
    label: 'Adult obesity prevalence (%)',
    colour: '#E63946',
    data: obesityValues.map((v, i) => ({ date: new Date(2005 + i, 0, 1), value: v })),
  },
  {
    id: 'severe',
    label: 'Severe obesity (BMI 40+) (%)',
    colour: '#6B7280',
    data: severeObesityValues.map((v, i) => ({ date: new Date(2005 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'most-deprived',
    label: 'Most deprived quintile',
    colour: '#E63946',
    data: mostDeprivedValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
  {
    id: 'least-deprived',
    label: 'Least deprived quintile',
    colour: '#2A9D8F',
    data: leastDeprivedValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2018, 0, 1), label: '2018: Soft Drinks Industry Levy introduced' },
  { date: new Date(2020, 0, 1), label: '2020: COVID-19 pandemic' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'NHS Digital', dataset: 'Health Survey for England', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/health-survey-for-england', date: '2023' },
  { num: 2, name: 'NHS England', dataset: 'Obesity-related NHS cost estimates', url: 'https://www.england.nhs.uk/', date: '2023' },
];

export default function AdultObesityPage() {
  return (
    <>
      <TopicNav topic="Adult Obesity" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Adult Obesity"
          question="Is adult obesity still getting worse?"
          finding="29.5% of adults in England are now obese — the highest rate on record. Severe obesity has nearly tripled since 2005, the deprivation gap is widening, and the annual NHS cost has passed £7 billion."
          colour="#E63946"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The proportion of English adults classified as obese has risen steadily for two decades, reaching 29.5% in 2023 according to the Health Survey for England — the highest rate ever recorded.<Cite nums={1} /> Severe obesity, defined as a BMI of 40 or above, has nearly tripled from 1.4% in 2005 to 4.1% today.<Cite nums={1} /> The health consequences are not distributed equally: obesity prevalence in the most deprived quintile of neighbourhoods stands at 39.0%, compared with 22.2% in the least deprived.<Cite nums={1} /> That gap of almost 17 percentage points has widened from 14.4 points in 2010. Geography follows the same gradient, with the North East recording the highest regional rate at 32.8% and London the lowest at 24.2%.<Cite nums={1} /></p>
            <p>The economic burden is equally stark. NHS England estimates the direct healthcare cost of obesity-related conditions at approximately £7.2 billion per year, up from £5.1 billion in 2015.<Cite nums={2} /> Policy responses have been piecemeal. The Soft Drinks Industry Levy, introduced in 2018, successfully reduced sugar content in drinks but did not bend the prevalence curve. Restrictions on high fat, sugar and salt food advertising and promotions were repeatedly delayed. GLP-1 receptor agonist drugs — semaglutide and tirzepatide — offer clinically significant weight loss for individuals, but NHS specialist obesity services face waiting times of two years or more. The fundamental structural drivers — the ubiquity of ultra-processed food, built environments that discourage walking and cycling, food poverty, and long working hours — remain largely unaddressed.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Prevalence trend' },
          { id: 'sec-chart2', label: 'Deprivation gap' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Adult obesity prevalence (England)"
              value="29.5%"
              unit="2023"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 22.1% in 2005 · highest rate on record"
              sparklineData={obesityValues.slice(-8)}
              source="NHS Digital — Health Survey for England 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Severe obesity (BMI 40+)"
              value="4.1%"
              unit="2023"
              direction="up"
              polarity="up-is-bad"
              changeText="nearly tripled since 2005 · most deprived areas twice as affected"
              sparklineData={severeObesityValues.slice(-8)}
              source="NHS Digital — Health Survey for England 2023"
              href="#sec-chart2"
            />
            <MetricCard
              label="Estimated annual NHS cost"
              value="£7.2bn"
              unit="2023"
              direction="up"
              polarity="up-is-bad"
              changeText="up from £5.1bn in 2015 · excludes productivity losses"
              sparklineData={[5.1, 5.4, 5.6, 5.9, 6.1, 5.8, 6.5, 6.8, 7.2]}
              source="NHS England — Obesity cost estimates 2023"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Adult obesity prevalence, England, 2005–2023"
              subtitle="Percentage of adults (16+) classified as obese (BMI 30+) and severely obese (BMI 40+). Health Survey for England measured height and weight."
              series={series1}
              annotations={annotations}
              yLabel="Prevalence (%)"
              source={{ name: 'NHS Digital', dataset: 'Health Survey for England', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/health-survey-for-england', frequency: 'annual', date: 'Dec 2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Obesity prevalence by deprivation quintile, England, 2010–2023"
              subtitle="Gap between most (red) and least (green) deprived neighbourhoods has widened from 14.4 to 16.8 percentage points since 2010."
              series={series2}
              annotations={[{ date: new Date(2020, 0, 1), label: '2020: Pandemic widens inequality' }]}
              yLabel="Prevalence (%)"
              source={{ name: 'NHS Digital', dataset: 'Health Survey for England — Deprivation Analysis', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/health-survey-for-england', frequency: 'annual', date: 'Dec 2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Soft Drinks Industry Levy: fiscal policy that changed behaviour"
            value="46%"
            unit="reduction in sugar per drink"
            description="The Soft Drinks Industry Levy, introduced in April 2018, led to a 46% reduction in the average sugar content of soft drinks sold in the UK. Manufacturers reformulated products before the levy even took effect, demonstrating that well-designed fiscal measures can shift industry behaviour at scale. While the levy alone has not reversed obesity trends, it provides the strongest UK evidence that upstream policy interventions work. The success has informed proposals for extending similar measures to other high-sugar product categories."
            source="Source: HM Revenue & Customs — SDIL receipts data 2024. University of Cambridge evaluation, The Lancet Public Health."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://digital.nhs.uk/data-and-information/publications/statistical/health-survey-for-england" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS Digital — Health Survey for England</a> — primary source for prevalence and deprivation data. Annual survey of approximately 8,000 adults with measured height and weight.</p>
            <p><a href="https://www.england.nhs.uk/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England</a> — estimated obesity-related NHS costs. Based on attributable fractions for type 2 diabetes, cardiovascular disease, musculoskeletal conditions, and certain cancers.</p>
            <p>All figures are for England unless otherwise stated. Obesity is defined as BMI 30 or above; severe obesity as BMI 40 or above. The 2020 Health Survey for England used a smaller sample due to COVID-19 restrictions, which may affect comparability with adjacent years.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
