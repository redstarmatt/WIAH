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

// FSM-eligible pupils (millions), 2010–2024 — DfE School Census
const fsmEligibleValues = [1.04, 1.08, 1.14, 1.17, 1.15, 1.14, 1.16, 1.22, 1.31, 1.43, 1.52, 1.74, 1.90, 1.95, 2.02];

// FSM eligibility rate (% of all pupils), 2010–2024
const fsmRateValues = [15.4, 15.9, 16.3, 16.0, 15.6, 15.2, 15.4, 15.8, 17.0, 18.7, 20.8, 22.5, 23.0, 23.8, 24.3];

// Regional eligibility rate (%) 2010–2024 — selected regions
const northEastValues = [17.0, 17.5, 18.1, 18.6, 19.0, 19.8, 20.8, 22.0, 23.5, 25.2, 27.0, 28.8, 30.0, 30.5, 31.2];
const southEastValues = [11.8, 12.0, 12.3, 12.0, 11.6, 11.3, 11.5, 12.0, 13.0, 14.2, 15.8, 17.0, 17.8, 18.2, 18.8];

const series1: Series[] = [
  {
    id: 'fsm-eligible',
    label: 'FSM-eligible pupils (millions)',
    colour: '#F4A261',
    data: fsmEligibleValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
  {
    id: 'fsm-rate',
    label: 'Eligibility rate (%)',
    colour: '#E63946',
    data: fsmRateValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'north-east',
    label: 'North East',
    colour: '#E63946',
    data: northEastValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
  {
    id: 'south-east',
    label: 'South East',
    colour: '#2A9D8F',
    data: southEastValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2014, 8, 1), label: '2014: Universal infant FSM introduced' },
  { date: new Date(2020, 2, 1), label: '2020: Rashford campaign extends holiday FSM' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'Department for Education', dataset: 'Schools, pupils and their characteristics (School Census)', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/school-pupils-and-their-characteristics', date: '2024' },
  { num: 2, name: 'Department for Education', dataset: 'Free school meals statistics', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/free-school-meals-autumn-term', date: '2024' },
  { num: 3, name: 'Food Foundation', dataset: 'Holiday hunger and food insecurity surveys', url: 'https://foodfoundation.org.uk/', date: '2024' },
];

export default function SchoolMealsPage() {
  return (
    <>
      <TopicNav topic="School Meals" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="School Meals"
          question="Are Children Actually Getting Fed at School?"
          finding="Over 2 million children in England are now eligible for free school meals — 24.3% of all pupils, the highest rate in a decade. Eligibility has nearly doubled since 2010, driven by rising poverty and expanded criteria."
          colour="#F4A261"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The number of children eligible for free school meals in England has risen from 1.04 million in 2010 to over 2 million in 2024, an increase driven primarily by rising child poverty rather than expanded eligibility criteria.<Cite nums={1} /> The eligibility rate now stands at 24.3% of all state-funded pupils — roughly one in four children.<Cite nums={2} /> Regional variation is stark: in the North East, 31.2% of pupils qualify, compared with 18.8% in the South East. In some local authorities, more than 40% of pupils are FSM-eligible.<Cite nums={1} /> Universal infant free school meals, introduced in September 2014 for all Reception, Year 1 and Year 2 pupils regardless of income, ensured younger children eat at school but masked the rising need among older pupils.</p>
            <p>Beyond term-time provision, holiday hunger has become a growing concern. The Food Foundation estimates that 3.7 million children experienced food insecurity in 2023, with school holidays identified as peak periods of need.<Cite nums={3} /> Marcus Rashford's 2020 campaign forced the government to extend free school meal vouchers through holidays during the pandemic, but this provision was not made permanent. The quality of school meals also varies significantly: the School Food Standards set nutritional requirements but enforcement is patchy, and academy trusts are technically exempt from compliance. Per-pupil funding for free school meals has not kept pace with food inflation, forcing caterers to cut portion sizes or reduce the quality of ingredients.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Eligibility trend' },
          { id: 'sec-chart2', label: 'Regional gap' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="FSM-eligible pupils (England)"
              value="2.02M"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 1.04M in 2010 · nearly doubled in 14 years"
              sparklineData={fsmEligibleValues.slice(-8)}
              source="DfE — School Census 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Eligibility rate"
              value="24.3%"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 15.4% in 2010 · one in four pupils"
              sparklineData={fsmRateValues.slice(-8)}
              source="DfE — Free school meals statistics 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Holiday activity schemes"
              value="2,700"
              unit="2024"
              direction="up"
              polarity="up-is-good"
              changeText="HAF programme covers ~600k places · not all eligible families reached"
              sparklineData={[800, 1100, 1500, 1800, 2100, 2300, 2500, 2700]}
              source="DfE — Holiday Activities and Food programme 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Free school meal eligibility, England, 2010–2024"
              subtitle="Total FSM-eligible pupils (millions) and eligibility rate (% of all state-funded pupils). Driven by rising child poverty and benefit changes."
              series={series1}
              annotations={annotations}
              yLabel="Pupils (M) / Rate (%)"
              source={{ name: 'Department for Education', dataset: 'School Census — Pupils and their characteristics', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/school-pupils-and-their-characteristics', frequency: 'annual', date: 'Jun 2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="FSM eligibility rate by region, England, 2010–2024"
              subtitle="Gap between North East (highest) and South East (lowest) has widened from 5.2 to 12.4 percentage points."
              series={series2}
              annotations={[{ date: new Date(2020, 0, 1), label: '2020: COVID-19 drives sharp increase' }]}
              yLabel="Eligibility rate (%)"
              source={{ name: 'Department for Education', dataset: 'School Census — Regional breakdown', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/school-pupils-and-their-characteristics', frequency: 'annual', date: 'Jun 2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Universal infant free school meals: feeding every young child"
            value="1.4M"
            unit="infant pupils fed daily"
            description="Since September 2014, all children in Reception, Year 1 and Year 2 in state-funded schools in England have received a free school meal regardless of family income. The policy feeds approximately 1.4 million children daily, removing stigma and ensuring that the youngest pupils have access to a hot meal. Evaluations show improved attainment, better classroom behaviour, and savings of around £400 per year for eligible families. The National Food Strategy recommended extending universal provision to all primary pupils, but this has not been adopted."
            source="Source: DfE — Universal infant free school meals evaluation 2023. Education Endowment Foundation."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://explore-education-statistics.service.gov.uk/find-statistics/school-pupils-and-their-characteristics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfE — Schools, pupils and their characteristics</a> — primary source for FSM eligibility counts and rates. Published annually from the January School Census.</p>
            <p><a href="https://explore-education-statistics.service.gov.uk/find-statistics/free-school-meals-autumn-term" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfE — Free school meals statistics</a> — additional term-time data on take-up rates and auto-enrolment.</p>
            <p>All figures are for state-funded schools in England. FSM eligibility is based on household receipt of qualifying benefits including Universal Credit (with income threshold of £7,400). Regional breakdowns use government office regions.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
