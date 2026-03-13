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

// Children in care (thousands) and annual entrants to care, 2015–2024
const childrenInCareData = [69.5, 70.4, 72.7, 75.4, 78.1, 80.0, 82.2, 83.8, 83.0, 84.5];
const annualLeaversData = [10.9, 11.0, 11.3, 11.5, 11.8, 12.0, 12.4, 13.1, 13.6, 13.9];

// NEET % of care leavers (aged 17–21) vs all young people, 2015–2024
const careLeaverNEETData = [38.0, 38.2, 38.5, 38.0, 37.5, 37.0, 36.5, 37.1, 37.0, 37.2];
const allYouthNEETData = [13.1, 12.4, 12.0, 11.8, 11.5, 12.0, 11.8, 11.5, 11.2, 11.0];

const childrenInCareSeries: Series[] = [
  {
    id: 'childrenInCare',
    label: 'Children in care (thousands)',
    colour: '#E63946',
    data: childrenInCareData.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
  {
    id: 'annualLeavers',
    label: 'Young people leaving care annually (thousands)',
    colour: '#F4A261',
    data: annualLeaversData.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const neetSeries: Series[] = [
  {
    id: 'careLeaverNEET',
    label: 'Care leavers NEET (%)',
    colour: '#E63946',
    data: careLeaverNEETData.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
  {
    id: 'allYouthNEET',
    label: 'All 16–24 year olds NEET (%)',
    colour: '#6B7280',
    data: allYouthNEETData.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const careAnnotations: Annotation[] = [
  { date: new Date(2019, 5, 1), label: '2019: Children in care pass 78,000 milestone' },
  { date: new Date(2022, 5, 1), label: '2022: Independent Review of Children\'s Social Care published' },
];

const neetAnnotations: Annotation[] = [
  { date: new Date(2020, 5, 1), label: '2020: Pandemic raises NEET rate for all young people' },
  { date: new Date(2023, 5, 1), label: '2023: Staying Close support extended to 25' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'Department for Education', dataset: 'Children Looked After in England', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/children-looked-after-in-england-including-adoptions', date: '2024' },
  { num: 2, name: 'Department for Education', dataset: 'Care Leavers in England', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/care-leavers-in-england', date: '2024' },
  { num: 3, name: 'DHSC', dataset: 'Independent Review of Children\'s Social Care (MacAlister Review)', url: 'https://www.gov.uk/government/publications/independent-review-of-childrens-social-care-final-report', date: '2022' },
];

export default function CareLeaversPage() {
  return (
    <>
      <TopicNav topic="Care Leavers" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Children & Families"
          question="What Happens When You Leave the Care System?"
          finding="84,500 children are in care in England — a record high. Each year around 13,900 young people leave the system, facing outcomes that are dramatically worse than their peers: 37% are NEET, 25% are homeless within two years, only 13% go to university compared to 43% of all young people. The care-leaving cliff edge at 18 remains the defining policy failure."
          colour="#E63946"
          preposition="for"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England had 84,500 children in local authority care in 2024 — a record high and an 18% increase since 2015 — reflecting rising rates of domestic abuse, parental substance misuse, and mental health crises, alongside a family support system that has been cut by nearly 50% in real terms since 2010.<Cite nums={1} /> Around 13,900 young people leave care each year, transitioning abruptly at age 18 from a supported environment into independent living.<Cite nums={1} /> The outcomes for care leavers are among the starkest in social policy: 37% are not in education, employment, or training (NEET) at age 17–21, compared to 11% of all young people.<Cite nums={2} /> Around 25% experience homelessness within two years of leaving care. Only 13% go to university, compared to 43% of their peers.<Cite nums={2} /></p>
            <p>The 2022 Independent Review of Children's Social Care — led by Josh MacAlister — found that the system is under severe strain at every stage: not enough family support to prevent children entering care, insufficient foster carers and residential placements causing children to be placed far from home, and an inadequate transition to adulthood.<Cite nums={3} /> Local authorities are legally required to provide leaving care support until age 25, but the quality and intensity of support varies dramatically.<Cite nums={2} /> The Staying Close programme — which provides floating support for care leavers moving into independent accommodation — has been extended, and the government has committed to a "care experience" protected characteristic under the Equality Act to address discrimination in employment and housing that care leavers frequently face.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Children in Care' },
          { id: 'sec-chart2', label: 'NEET Gap' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Children in care in England"
              value="84,500"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="Record high · up 18% since 2015 · 13,900 leave each year"
              sparklineData={[69.5, 70.4, 72.7, 75.4, 78.1, 80.0, 82.2, 83.8, 83.0, 84.5]}
              source="DfE · Children Looked After in England 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Care leavers who are NEET"
              value="37%"
              unit="aged 17–21"
              direction="flat"
              polarity="up-is-bad"
              changeText="vs 11% for all young people · gap barely narrowed in a decade"
              sparklineData={[38.0, 38.2, 38.5, 38.0, 37.5, 37.0, 36.5, 37.1, 37.0, 37.2]}
              source="DfE · Care Leavers in England 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Care leavers going to university"
              value="13%"
              unit="vs 43% nationally"
              direction="up"
              polarity="up-is-good"
              changeText="Up from 8% in 2015 · bursary scheme partly responsible"
              sparklineData={[8, 9, 9, 10, 10, 11, 11, 12, 13, 13]}
              source="DfE · Care Leavers in England 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Children in care and annual care leavers, England, 2015–2024"
              subtitle="Total children in local authority care (thousands, red) and young people leaving care annually (thousands, amber). Both rising as pressures on families and the care system intensify."
              series={childrenInCareSeries}
              annotations={careAnnotations}
              yLabel="Thousands"
              source={{ name: 'Department for Education', dataset: 'Children Looked After in England', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/children-looked-after-in-england-including-adoptions', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="NEET rate: care leavers vs all young people, England, 2015–2024"
              subtitle="Percentage not in education, employment or training (NEET) for care leavers aged 17–21 (red) versus all 16–24 year olds (grey). The gap of approximately 26 percentage points has barely narrowed in a decade."
              series={neetSeries}
              annotations={neetAnnotations}
              yLabel="% NEET"
              source={{ name: 'Department for Education', dataset: 'Care Leavers in England Statistical Release', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/care-leavers-in-england', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Care leaver university bursary: £2,000 minimum support"
            value="£2,000"
            unit="minimum bursary for care leavers at university"
            description="All universities and higher education providers in England are now required to publish their financial support package for care leavers. UCAS data shows the proportion of care leavers entering higher education has risen from 8% in 2015 to 13% in 2024 — still far below the general population rate of 43%, but showing meaningful progress driven by dedicated bursaries, guaranteed university accommodation, and outreach programmes. The Staying Put scheme — which allows young people to remain with their foster carers until age 21 — is now used by 42% of eligible young people, providing the kind of gradual transition into independence that all young adults benefit from."
            source="Source: DfE — Care Leavers in England 2024. UCAS — Undergraduate widening participation data 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://explore-education-statistics.service.gov.uk/find-statistics/children-looked-after-in-england-including-adoptions" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfE — Children Looked After in England</a> — annual census of children in care, placements, and leaving care. Retrieved March 2026.</p>
            <p><a href="https://explore-education-statistics.service.gov.uk/find-statistics/care-leavers-in-england" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfE — Care Leavers in England</a> — outcome data for care leavers aged 17–21 including NEET, education, and housing. Retrieved March 2026.</p>
            <p><a href="https://www.gov.uk/government/publications/independent-review-of-childrens-social-care-final-report" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DHSC — Independent Review of Children's Social Care (MacAlister Review)</a> — systemic analysis and recommendations. Retrieved March 2026.</p>
            <p className="mt-2">NEET data for care leavers covers young people aged 17–21 in contact with local authority leaving care services. Homeless figures from Centrepoint/DfE matched administrative data. University participation from UCAS matched to DfE care leaver records. All figures are for England.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
