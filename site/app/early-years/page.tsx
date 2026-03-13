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
  { num: 1, name: 'Coram Family & Childcare', dataset: 'UK Childcare Survey', url: 'https://www.coramfcc.org.uk/research-publications/uk-childcare-survey', date: '2023' },
  { num: 2, name: 'Ofsted', dataset: 'Childcare Places Survey', url: 'https://www.gov.uk/government/collections/ofsted-annual-report', date: '2023' },
  { num: 3, name: 'TUC', dataset: 'Childcare and Work Survey', date: '2023' },
  { num: 4, name: 'DfE', dataset: 'Childcare and Early Years Survey', url: 'https://www.gov.uk/government/collections/statistics-childcare-and-early-years', date: '2023' },
];

// Average annual cost of full-time nursery under-2 (£), 2013–2023 — Coram
const childcareCostValues = [9300, 9800, 10200, 10700, 11200, 11700, 12100, 12500, 13000, 13800, 14800];

// Registered childcare places (thousands), 2013–2023 — Ofsted
const nurseryPlacesValues = [1350, 1330, 1310, 1290, 1270, 1260, 1250, 1240, 1200, 1190, 1180];

const costSeries: Series[] = [
  {
    id: 'childcare-cost',
    label: 'Annual cost of full-time nursery (£)',
    colour: '#2A9D8F',
    data: childcareCostValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })),
  },
];

const placesSeries: Series[] = [
  {
    id: 'nursery-places',
    label: 'Registered childcare places (thousands)',
    colour: '#E63946',
    data: nurseryPlacesValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })),
  },
];

const costAnnotations: Annotation[] = [
  { date: new Date(2022, 5, 1), label: '2022: Cost exceeds university tuition' },
];

const placesAnnotations: Annotation[] = [
  { date: new Date(2020, 5, 1), label: '2020: COVID closures reduced capacity' },
];

export default function EarlyYearsPage() {
  return (
    <>
      <TopicNav topic="Early Years & Childcare" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Early Years & Childcare"
          question="Can Families Afford Childcare?"
          finding="A full-time nursery place for a child under two costs an average of £14,800 a year in England — more than university tuition fees. 28% of parents have reduced work hours due to childcare costs."
          colour="#2A9D8F"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK has some of the highest childcare costs in the developed world relative to wages. Full-time care for a child under two averaged around £14,800 a year in 2023 — more than the median full-time salary after tax in many parts of the country.<Cite nums={[1]} /> The government's 30-hour free childcare entitlement was extended in 2024 to cover children from nine months in a staged rollout, but hourly rates paid to providers have consistently been below delivery cost: over 40% of nurseries reported operating at a loss on funded places in 2023, and more than 4,000 childcare providers closed between 2021 and 2023.<Cite nums={[1, 2]} /> The registered supply of childcare places has been falling since 2010, creating acute shortages in rural, coastal, and deprived urban areas.<Cite nums={[2]} /></p>
            <p>The childcare access gap and the early development gap reinforce each other along the same fault lines. The families least able to afford market-rate childcare are the same families whose children stand to gain most from quality early years provision, yet they are least served by a funding model that depends on cross-subsidy from fee-paying parents. The sector workforce compounds the problem: with around 40,000 vacancies and average pay close to the national living wage floor, turnover is high and the continuity of care that underpins secure attachment in young children is difficult to maintain.<Cite nums={[1]} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Costs' },
          { id: 'sec-chart2', label: 'Places' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Full-time nursery cost (under 2)"
              value="£14,800"
              unit="/yr"
              direction="up"
              polarity="up-is-bad"
              changeText="Up 59% since 2013 · more than university fees"
              sparklineData={[9300, 9800, 10700, 11200, 12100, 12500, 13000, 14800]}
              source="Coram Family & Childcare · UK Childcare Survey 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Parents who reduced work due to childcare"
              value="28%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Women disproportionately affected"
              sparklineData={[20, 21, 22, 23, 24, 25, 26, 28]}
              source="TUC · Childcare and Work Survey 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Take-up of 15-hr free entitlement (3-4 yr olds)"
              value="93%"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="But only 60% use the full 15 hours"
              sparklineData={[88, 89, 90, 91, 92, 92, 93, 93]}
              source="DfE · Childcare and Early Years Survey 2023"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Average annual cost of full-time nursery place (under 2), England, 2013–2023"
              subtitle="Pounds per year, 50 hours per week. Up 59% since 2013. Now exceeds university tuition fees."
              series={costSeries}
              annotations={costAnnotations}
              yLabel="Cost (£)"
              source={{ name: 'Coram Family & Childcare', dataset: 'UK Childcare Survey', url: 'https://www.coramfcc.org.uk/research-publications/uk-childcare-survey', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Registered childcare places, England, 2013–2023"
              subtitle="Ofsted-registered places in day nurseries and childminders. Declining since 2010. COVID accelerated closures."
              series={placesSeries}
              annotations={placesAnnotations}
              yLabel="Places (thousands)"
              source={{ name: 'Ofsted', dataset: 'Childcare Places Survey', url: 'https://www.gov.uk/government/organisations/ofsted', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="30-hour expansion rolling out from April 2024"
            value="September 2025"
            description="From April 2024, the government began extending free childcare to children from 9 months old. The full rollout — 30 hours for all under-5s of working parents — reaches completion in September 2025. Providers warn the government funding rate of £5.97/hour is below actual delivery costs, threatening supply at the very point of expanded demand."
            source="Source: Department for Education — Childcare expansion policy, 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.coramfcc.org.uk/research-publications/uk-childcare-survey" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Coram Family & Childcare — UK Childcare Survey</a> — annual survey of childcare costs and availability by local authority.</p>
            <p><a href="https://www.gov.uk/government/collections/ofsted-annual-report" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Ofsted — Childcare Places Survey</a> — registered childcare provider and place data.</p>
            <p><a href="https://www.gov.uk/government/collections/statistics-childcare-and-early-years" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfE — Childcare and early years survey of parents and carers</a> — take-up and usage of funded entitlements.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
