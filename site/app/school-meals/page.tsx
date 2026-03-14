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
const fsmEligibleValues = [1.04, 1.09, 1.14, 1.17, 1.16, 1.14, 1.13, 1.15, 1.22, 1.34, 1.42, 1.52, 1.74, 1.90, 2.01];

// FSM eligibility rate (%), 2010–2024
const fsmRateValues = [15.4, 15.9, 16.3, 16.0, 15.6, 14.5, 14.1, 14.4, 15.8, 17.3, 19.7, 20.8, 22.5, 23.0, 23.8];

// Regional eligibility rate (%) 2024 — North East vs South East
const northEastValues = [18.2, 18.8, 19.5, 20.1, 19.8, 19.4, 19.2, 19.5, 21.0, 22.8, 25.1, 26.8, 28.5, 29.5, 30.2];
const southEastValues = [11.2, 11.5, 11.8, 11.6, 11.3, 10.8, 10.5, 10.7, 11.4, 12.5, 14.2, 15.1, 16.3, 17.0, 17.8];

const series1: Series[] = [
  {
    id: 'fsm-eligible',
    label: 'FSM-eligible pupils (millions)',
    colour: '#F4A261',
    data: fsmEligibleValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
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
  { date: new Date(2020, 2, 1), label: '2020: Rashford campaign / COVID vouchers' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'DfE', dataset: 'Schools, Pupils and their Characteristics', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/school-pupils-and-their-characteristics', date: '2024' },
  { num: 2, name: 'DfE', dataset: 'Free School Meals: Autumn Term', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/free-school-meals-autumn-term', date: '2024' },
  { num: 3, name: 'Food Foundation', dataset: 'Holiday Hunger Research', url: 'https://foodfoundation.org.uk/', date: '2023' },
];

export default function SchoolMealsPage() {
  return (
    <>
      <TopicNav topic="School Meals" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="School Meals"
          question="Are Children Actually Getting Fed at School?"
          finding="Nearly 2 million children in England are now eligible for free school meals — 23.8% of all pupils. That is the highest proportion in over a decade, and it continues to rise."
          colour="#F4A261"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The number of pupils eligible for free school meals in England has risen from 1.04 million in 2010 to 2.01 million in 2024, an increase of 93%.<Cite nums={1} /> The eligibility rate has climbed from 15.4% to 23.8% over the same period, driven by stagnating wages, benefit changes, and the lasting effects of the cost-of-living crisis.<Cite nums={2} /> The introduction of Universal Credit, which automatically passports more families through the eligibility criteria, has also contributed to rising numbers. Regional disparities remain stark: 30.2% of pupils in the North East are eligible compared with 17.8% in the South East.<Cite nums={1} /></p>
            <p>Universal infant free school meals, introduced in September 2014, guaranteed a hot meal for all children in Reception, Year 1 and Year 2 regardless of family income. While this was a significant step, it does not extend to older primary or secondary pupils, where eligibility is means-tested. Marcus Rashford's 2020 campaign forced the government to extend food vouchers during school holidays, highlighting the gap in provision known as holiday hunger.<Cite nums={3} /> The Food Foundation estimates that around 800,000 children in poverty are not eligible for free school meals because their household income sits just above the threshold of approximately £7,400 per year. Meal quality also varies considerably: per-pupil funding for ingredients has not kept pace with food inflation, and some schools report spending as little as 70p per meal.</p>
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
              value="2.01M"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 1.04M in 2010 · highest number on record"
              sparklineData={fsmEligibleValues.slice(-8)}
              source="DfE — Schools, Pupils and their Characteristics 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Eligibility rate"
              value="23.8%"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 15.4% in 2010 · nearly 1 in 4 pupils"
              sparklineData={fsmRateValues.slice(-8)}
              source="DfE — Free School Meals statistics 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Holiday food schemes (England)"
              value="2,800"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="Holiday Activities and Food programme · covers ~600k children"
              sparklineData={[1200, 1500, 1800, 2100, 2300, 2500, 2650, 2800]}
              source="DfE — Holiday Activities and Food programme 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Children eligible for free school meals, England, 2010–2024"
              subtitle="Total number of FSM-eligible pupils (millions). Includes all state-funded schools. Driven by rising poverty and Universal Credit passporting."
              series={series1}
              annotations={annotations}
              yLabel="Eligible pupils (millions)"
              source={{ name: 'DfE', dataset: 'Schools, Pupils and their Characteristics', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/school-pupils-and-their-characteristics', frequency: 'annual', date: 'Jun 2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="FSM eligibility rate by region, England, 2010–2024"
              subtitle="North East (red) consistently records the highest eligibility rates. The gap with the South East (green) has widened from 7 to over 12 percentage points."
              series={series2}
              annotations={[{ date: new Date(2020, 2, 1), label: '2020: COVID-19 / cost-of-living crisis begins' }]}
              yLabel="Eligibility rate (%)"
              source={{ name: 'DfE', dataset: 'Free School Meals — Regional Breakdown', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/free-school-meals-autumn-term', frequency: 'annual', date: 'Jun 2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Universal infant free school meals: a proven intervention"
            value="1.3M"
            unit="infant pupils receiving free meals"
            description="Since September 2014, every child in Reception, Year 1 and Year 2 has been entitled to a free school lunch regardless of family income. The policy covers approximately 1.3 million infants and has been linked to improved attainment, reduced stigma around free meals, and better nutrition in early years. Research from the Education Policy Institute found that the policy narrowed the attainment gap for disadvantaged pupils by around 2 months of learning by the end of Key Stage 1."
            source="Source: DfE — Universal Infant Free School Meals evaluation 2023. Education Policy Institute."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://explore-education-statistics.service.gov.uk/find-statistics/school-pupils-and-their-characteristics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfE — Schools, Pupils and their Characteristics</a> — primary source for FSM eligibility numbers and rates. Based on the annual school census, covering all state-funded schools in England.</p>
            <p><a href="https://explore-education-statistics.service.gov.uk/find-statistics/free-school-meals-autumn-term" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfE — Free School Meals statistics</a> — regional and demographic breakdowns of FSM eligibility and take-up.</p>
            <p>All figures are for England only. FSM eligibility is based on benefit-related criteria. Under Universal Credit, the income threshold is approximately £7,400 per year (net, excluding benefits). The introduction of transitional protections means some pupils retain eligibility even if family circumstances change.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
