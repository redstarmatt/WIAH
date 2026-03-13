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

// % population with limited food access, 2012–2024
const limitedAccessPct = [7.1, 7.2, 7.3, 7.5, 7.6, 7.7, 7.8, 7.9, 7.8, 7.9, 8.0, 8.0, 8.0];
// Supermarkets per 100,000 population (national average), 2012–2024
const supermarketDensity = [5.2, 5.1, 5.0, 4.9, 4.8, 4.7, 4.6, 4.5, 4.4, 4.3, 4.3, 4.3, 4.2];

const accessSeries: Series[] = [
  {
    id: 'limited-access',
    label: '% population with limited food access',
    colour: '#E63946',
    data: limitedAccessPct.map((v, i) => ({ date: new Date(2012 + i, 5, 1), value: v })),
  },
];

const densitySeries: Series[] = [
  {
    id: 'supermarket-density',
    label: 'Supermarkets per 100,000 population',
    colour: '#264653',
    data: supermarketDensity.map((v, i) => ({ date: new Date(2012 + i, 5, 1), value: v })),
  },
];

const accessAnnotations: Annotation[] = [
  { date: new Date(2018, 5, 1), label: '2018: Major retailers accelerate store closure programme' },
  { date: new Date(2022, 5, 1), label: '2022: Food inflation peaks at 19%' },
];

const densityAnnotations: Annotation[] = [
  { date: new Date(2016, 5, 1), label: '2016: Discount retailer expansion begins' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'Consumer Data Research Centre', dataset: 'Food access analysis', url: 'https://cdrc.ac.uk', date: '2024' },
  { num: 2, name: 'Which?', dataset: 'Consumer research on convenience store pricing', url: 'https://www.which.co.uk', date: '2024' },
  { num: 3, name: 'ONS / Consumer Data Research Centre', dataset: 'Retail food access data', url: 'https://cdrc.ac.uk', date: '2024' },
];

export default function FoodDesertsPage() {
  return (
    <>
      <TopicNav topic="Food Deserts" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Food Deserts"
          question="Do You Live in a Food Desert?"
          finding="Around 8 million people in the UK live more than a mile from a supermarket without access to a car. Deprived areas have five times fewer supermarkets per person than affluent ones."
          colour="#E63946"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Around 8 million people in the UK live more than a mile from a supermarket without access to a car — a figure that maps almost exactly onto deprivation<Cite nums={1} />. Deprived areas have roughly five times fewer supermarkets per head than affluent ones<Cite nums={3} />, and the gap is widening. Major retailers have quietly closed stores in lower-income neighbourhoods over the past decade while opening larger formats in more prosperous suburbs. Aldi and Lidl have grown fast, but their new stores have largely followed car-owning customers into retail parks rather than high streets in high-poverty areas. Convenience stores charge a 10–20% premium on equivalent goods, with fresh produce running 39% more expensive than in supermarkets. When food inflation peaked at 19% in 2022–23, this structural penalty fell hardest on those already stretched.</p>
            <p>Government policy has not kept pace with the scale of the problem. The National Food Strategy, published in 2021, set out a detailed case for reform including a sugar and salt reformulation tax, but the government declined to implement its central recommendations. The Healthy Start voucher scheme remains underused, covering only a narrow slice of those affected. Scotland's Good Food Nation Act 2022 creates a statutory framework for food inequality that has no equivalent in England. Community food hubs, FareShare, and food sharing apps like OLIO and Too Good To Go are expanding, but remain patchwork — dependent on charitable funding and local authority capacity rather than structural reform.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Food Access' },
          { id: 'sec-chart2', label: 'Supermarket Density' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="People with limited food access"
              value="8m"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="Live more than 1 mile from supermarket · no car access"
              sparklineData={limitedAccessPct.slice(-8)}
              source="Consumer Data Research Centre 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Supermarkets per 100k in deprived areas"
              value="2.8"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="vs 6.1 in least deprived · 5x gap richest vs poorest"
              sparklineData={[3.5, 3.4, 3.3, 3.2, 3.1, 3.0, 2.9, 2.8]}
              source="ONS & Consumer Data Research Centre"
              href="#sec-chart2"
            />
            <MetricCard
              label="Convenience store premium vs supermarket"
              value="15%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Average markup on equivalent groceries · higher for fresh produce"
              sparklineData={[10, 11, 11, 12, 13, 13, 14, 15]}
              source="Which? Consumer Research 2024"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Population with limited food access, UK, 2012–2024"
              subtitle="Percentage of UK population living more than 1 mile from a supermarket without car access. Maps closely onto deprivation."
              series={accessSeries}
              annotations={accessAnnotations}
              yLabel="Population (%)"
              source={{ name: 'Consumer Data Research Centre', dataset: 'Food access analysis', url: 'https://cdrc.ac.uk', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Supermarket density, UK national average, 2012–2024"
              subtitle="Average number of supermarkets per 100,000 population. Declining as major retailers consolidate into larger formats and close urban high street stores."
              series={densitySeries}
              annotations={densityAnnotations}
              yLabel="Supermarkets per 100k"
              source={{ name: 'ONS / Consumer Data Research Centre', dataset: 'Retail food access data', url: 'https://cdrc.ac.uk', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Scotland's Good Food Nation Act sets a new standard"
            value="2022"
            unit="Good Food Nation (Scotland) Act"
            description="Scotland's Good Food Nation Act 2022 is the first statutory framework in the UK requiring government to address food inequality systematically. It mandates a national food plan with measurable targets for reducing food insecurity. Wales has followed with a similar food system review. The evidence from countries with statutory food system frameworks — including Finland and Denmark — shows that legal obligations produce measurably better outcomes than voluntary approaches."
            source="Source: Scottish Government — Good Food Nation Act 2022. Food Standards Scotland — Food security report 2024."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://cdrc.ac.uk" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Consumer Data Research Centre — Food access analysis</a> — Distance-based food access analysis using retail location data. Retrieved 2025.</p>
            <p><a href="https://www.which.co.uk" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Which? — Consumer research on convenience store pricing</a> — Price comparison of supermarkets vs convenience stores. Retrieved 2024.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
