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
  { num: 1, name: 'Ofsted', dataset: 'Fostering in England', url: 'https://www.gov.uk/government/statistics/fostering-in-england', date: '2023' },
  { num: 2, name: 'DfE', dataset: 'Children Looked After in England', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/children-looked-after-in-england-including-adoptions', date: '2023' },
  { num: 3, name: 'Rees Centre, University of Oxford', dataset: 'Placement stability and educational outcomes research' , url: 'https://reescentre.education.ox.ac.uk/' },
];

// Approved foster carer households (thousands), 2015–2023
const fosterHouseholdsK = [45.5, 44.6, 44.2, 43.9, 43.5, 42.8, 42.1, 41.3, 40.5];
// Children with 3+ placements (%), 2015–2023
const placementBreakdownPct = [9.2, 9.8, 10.1, 10.5, 10.9, 11.3, 11.6, 12.0, 12.4];
// Agency placement spend (£bn), 2015–2023
const agencySpendBn = [1.05, 1.12, 1.18, 1.24, 1.32, 1.41, 1.50, 1.55, 1.60];

const householdSeries: Series[] = [
  {
    id: 'foster-households',
    label: 'Approved foster carer households (thousands)',
    colour: '#264653',
    data: fosterHouseholdsK.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const breakdownSeries: Series[] = [
  {
    id: 'placement-breakdowns',
    label: 'Children with 3+ placements in year (%)',
    colour: '#E63946',
    data: placementBreakdownPct.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
  {
    id: 'agency-spend',
    label: 'Agency placement spend (£bn)',
    colour: '#F4A261',
    data: agencySpendBn.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const householdAnnotations: Annotation[] = [
  { date: new Date(2019, 5, 1), label: '2019: Net carer loss accelerates' },
];

const breakdownAnnotations: Annotation[] = [
  { date: new Date(2020, 5, 1), label: '2020: COVID disrupts placements' },
];

export default function FosterCarePage() {
  return (
    <>
      <TopicNav topic="Foster Care" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Foster Care"
          question="Where Do the Children Go?"
          finding="England has lost over 5,000 foster carer households since 2015 — an 11% decline — while children needing placements have risen. One in eight looked-after children now experiences three or more placement moves in a single year."
          colour="#264653"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England's foster care system is caught in a structural crisis of supply and demand. Around 72,000 children are looked after by local authorities, the highest number since the Children Act 1989 — yet the number of approved fostering households has fallen from 45,500 in 2015 to 40,500 in 2023.<Cite nums={[1]} /> Ofsted reports that 9,200 new fostering households were approved in 2022–23 but 9,800 ceased fostering in the same year, meaning the system is losing carers faster than it recruits them.<Cite nums={[1]} /> On any given night, approximately 8,700 children are waiting for a suitable placement.</p>
            <p>The consequences of insufficient placements are measurable in placement instability. In 2023, 12.4% of looked-after children experienced three or more placement moves within the year, up from 9.2% in 2015.<Cite nums={[2]} /> Research from the Rees Centre at Oxford demonstrates that each additional placement move reduces a child's GCSE attainment by the equivalent of half a grade.<Cite nums={[3]} /> Councils are spending £1.6 billion annually on agency placements at two to three times the cost of in-house foster care, crowding out the preventive work that might reduce the number of children entering care in the first place.<Cite nums={[2]} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-households', label: 'Carer Supply' },
          { id: 'sec-stability', label: 'Placement Stability' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Foster carer households"
              value="40,500"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="Down 11% since 2015 · net loss of 600 households in 2022–23"
              sparklineData={fosterHouseholdsK.slice(-8)}
              source="Ofsted · Fostering in England 2023"
              href="#sec-households"
            />
            <MetricCard
              label="Children with 3+ placements/year"
              value="12.4%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 9.2% in 2015 · each move reduces GCSE attainment"
              sparklineData={placementBreakdownPct.slice(-8)}
              source="DfE · Children Looked After 2023"
              href="#sec-stability"
            />
            <MetricCard
              label="Spend on agency placements"
              value="£1.6bn"
              unit="/year"
              direction="up"
              polarity="up-is-bad"
              changeText="Up 35% in real terms since 2018 · 2–3× the cost of in-house care"
              sparklineData={agencySpendBn.slice(-8)}
              source="DfE · Section 251 Returns 2023"
              href="#sec-stability"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-households" className="mb-12">
            <LineChart
              title="Approved foster carer households, England, 2015–2023"
              subtitle="Households approved to foster at 31 March each year. The system is losing carers faster than it recruits them. More than half of carers are over 55."
              series={householdSeries}
              annotations={householdAnnotations}
              yLabel="Households (thousands)"
              source={{ name: 'Ofsted', dataset: 'Fostering in England', url: 'https://www.gov.uk/government/statistics/fostering-in-england', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-stability" className="mb-12">
            <LineChart
              title="Placement instability and agency spend, England, 2015–2023"
              subtitle="Children with 3+ placement moves in the year (red) and agency placement spend (amber). Both are rising as the system struggles with supply shortage."
              series={breakdownSeries}
              annotations={breakdownAnnotations}
              yLabel="% / £bn"
              source={{ name: 'DfE', dataset: 'Children Looked After in England / Section 251 Returns', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/children-looked-after-in-england-including-adoptions', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Mockingbird model showing strong early results"
            value="40 LAs"
            unit="piloting Mockingbird by 2024"
            description="The Mockingbird Family Model organises foster carers into supportive constellations around an experienced hub carer. Early evaluations across 40 local authorities in England show improved placement stability, reduced carer burnout, and better outcomes for children. Separately, the Staying Put policy now allows care leavers to remain with their foster families until age 25. Care leavers who stay put are significantly more likely to be in education, employment, or training at 21. These structural reforms demonstrate that better outcomes are achievable without simply increasing spending."
            source="Source: DfE — Mockingbird programme evaluation, 2023. DfE — Staying Put guidance and outcomes data, 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/statistics/fostering-in-england" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Ofsted — Fostering in England</a> — Annual statistical release on approved foster carers and households. Retrieved 2024.</p>
            <p><a href="https://explore-education-statistics.service.gov.uk/find-statistics/children-looked-after-in-england-including-adoptions" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfE — Children Looked After in England</a> — Annual data on placement types, stability, and outcomes. Retrieved 2024.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
