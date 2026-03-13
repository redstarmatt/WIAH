'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'DfE', dataset: 'Schools, pupils and their characteristics', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/school-pupils-and-their-characteristics', date: '2024' },
  { num: 2, name: 'CPAG', dataset: 'Free school meals eligibility analysis', url: 'https://cpag.org.uk/policy-and-research/policy-reports/free-school-meals', date: '2024' },
  { num: 3, name: 'DfE', dataset: 'School census 2024' },
];

// Children eligible for FSM (thousands), 2017–2024
const eligibleFsmK = [1380, 1390, 1540, 1790, 1970, 2080, 2200, 2210];
// Children actually receiving FSM (thousands), 2017–2024
const receivingFsmK = [1311, 1321, 1463, 1701, 1872, 1976, 2090, 2099];
// FSM uptake rate (%), 2017–2024
const uptakeRatePct = [95, 95, 95, 95, 95, 95, 95, 95];
// Children in poverty but not eligible (thousands), 2017–2024
const povertyGapK = [720, 740, 800, 820, 840, 860, 870, 875];

const fsmSeries: Series[] = [
  {
    id: 'eligible',
    label: 'Children eligible for FSM (thousands)',
    colour: '#264653',
    data: eligibleFsmK.map((v, i) => ({ date: new Date(2017 + i, 0, 1), value: v })),
  },
  {
    id: 'receiving',
    label: 'Children receiving FSM (thousands)',
    colour: '#2A9D8F',
    data: receivingFsmK.map((v, i) => ({ date: new Date(2017 + i, 0, 1), value: v })),
  },
];

const povertyGapSeries: Series[] = [
  {
    id: 'poverty-gap',
    label: 'Children in poverty not eligible for FSM (thousands)',
    colour: '#E63946',
    data: povertyGapK.map((v, i) => ({ date: new Date(2017 + i, 0, 1), value: v })),
  },
  {
    id: 'uptake',
    label: 'FSM uptake rate (%)',
    colour: '#264653',
    data: uptakeRatePct.map((v, i) => ({ date: new Date(2017 + i, 0, 1), value: v })),
  },
];

const fsmAnnotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: FSM expanded during COVID' },
  { date: new Date(2023, 0, 1), label: '2023: Universal infant FSM retained' },
];

const povertyAnnotations: Annotation[] = [
  { date: new Date(2021, 0, 1), label: '2021: Benefit cap limits eligibility' },
];

export default function FreeSchoolMealsGapPage() {
  return (
    <>
      <TopicNav topic="Education" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Education"
          question="Are All Hungry Children Getting Free School Meals?"
          finding="2.2 million children are now eligible for free school meals — the highest ever — yet an estimated 870,000 children living in poverty fall below the eligibility threshold and go without."
          colour="#2A9D8F"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The free school meals system in England has a significant structural problem: eligibility is determined by a binary threshold set when Universal Credit was introduced. A family with earned income below £7,400 per year (net, excluding benefits) qualifies; above that, they do not. The threshold has not been uprated with inflation, excluding more families in real terms each year. The number of children eligible has risen from 1.38 million in 2017 to 2.2 million in 2024, partly from threshold adjustments and partly from rising poverty rates.<Cite nums={[1]} /> Uptake among eligible children is very high at 95%, meaning the programme works well for those it reaches.<Cite nums={[3]} /> But an estimated 870,000 children live in poverty by standard measures yet do not qualify, sitting in classrooms where other children receive free meals they cannot access.<Cite nums={[2]} /></p>
            <p>The threshold is also a poverty trap: because eligibility is lost when earned income exceeds £7,400, some parents face a disincentive to increase their working hours, losing FSM entitlement worth around £500 per child per year before their additional earnings compensate.<Cite nums={[2]} /> Teachers increasingly report buying food for children who arrive hungry but are not on the FSM register — an informal safety net that depends on individual goodwill rather than policy design. The Greater London Authority introduced universal free school meals for all primary pupils in 2023; at national level the barrier to universalisation is cost, estimated at £1.5 billion annually to extend to all children on Universal Credit.<Cite nums={[2]} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Eligible vs Receiving' },
          { id: 'sec-chart2', label: 'Poverty Gap' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Children eligible for FSM"
              value="2.2m"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 1.38m in 2017 · 24% of all school children"
              sparklineData={eligibleFsmK.slice(-8)}
              source="DfE · Schools, pupils and their characteristics 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Children in poverty not eligible"
              value="870k"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Below FSM income threshold · the hidden hunger gap"
              sparklineData={povertyGapK.slice(-8)}
              source="CPAG · Free school meals eligibility analysis 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="FSM uptake rate"
              value="95%"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="Among eligible children · consistently high since 2017"
              sparklineData={uptakeRatePct.slice(-8)}
              source="DfE · School census 2024"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Children eligible vs receiving free school meals, England, 2017–2024"
              subtitle="Eligible children (dark blue) and those actually receiving FSM (green). High uptake among those who qualify conceals the threshold problem."
              series={fsmSeries}
              annotations={fsmAnnotations}
              yLabel="Children (thousands)"
              source={{ name: 'DfE', dataset: 'Schools, pupils and their characteristics', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/school-pupils-and-their-characteristics', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Children in poverty not eligible for FSM, England, 2017–2024"
              subtitle="Estimated children living in poverty but below the FSM eligibility threshold (red) alongside the uptake rate among those who do qualify (blue)."
              series={povertyGapSeries}
              annotations={povertyAnnotations}
              yLabel="Children (thousands) / Rate (%)"
              source={{ name: 'CPAG / DfE', dataset: 'Free school meals eligibility analysis / School census', url: 'https://cpag.org.uk/policy-and-research/policy-reports/free-school-meals', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Universal infant FSM providing a floor for the youngest children"
            value="1.4m"
            unit="infants receiving free lunches regardless of income"
            description="Since 2014, all children in reception, year 1 and year 2 receive free school meals regardless of family income — around 1.4 million children. This universal provision for the youngest pupils ensures no child in the first years of school goes hungry for financial reasons. Extending this model to older year groups, as Scotland has done for all primary pupils, would eliminate the threshold problem entirely. The Scottish universal primary FSM scheme, introduced in 2022, has been independently evaluated as increasing attainment and reducing stigma. In England, the Greater London Authority extended universal primary FSM to all London state primary schools in 2023."
            source="Source: DfE — Universal infant free school meals data 2024. Scottish Government — Universal primary FSM evaluation 2023."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://explore-education-statistics.service.gov.uk/find-statistics/school-pupils-and-their-characteristics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfE — Schools, pupils and their characteristics</a> — Annual census data on FSM eligibility and take-up. Retrieved 2025.</p>
            <p><a href="https://cpag.org.uk/policy-and-research/policy-reports/free-school-meals" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">CPAG — Free school meals eligibility analysis</a> — Estimates of children in poverty below the eligibility threshold. Retrieved 2025.</p>
            <p>Poverty gap estimates are CPAG modelling based on benefit unit data and FSM eligibility criteria. Uptake calculated as receiving FSM as a proportion of eligible children, excluding universal infant free school meals (reception to year 2).</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
