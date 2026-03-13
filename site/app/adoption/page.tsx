'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Adoption orders granted, England, 2010–2024 — DfE SSDA903
const adoptionOrdersValues = [3200, 3450, 3900, 4800, 5360, 5100, 4690, 4350, 4020, 3680, 3210, 2980, 2900, 2920, 2950];

// Average days from entering care to adoption placement, 2010–2024
const waitDaysValues = [440, 452, 465, 478, 495, 505, 510, 515, 520, 524, 528, 532, 535, 537, 538];

// Children waiting vs approved adopters, 2014–2024
const childrenWaiting = [2850, 2980, 3050, 3100, 3120, 3180, 3220, 3260, 3290, 3310, 3310];
const approvedAdopters = [4450, 4200, 3850, 3600, 3300, 3000, 2780, 2620, 2480, 2380, 2340];

const series1: Series[] = [
  {
    id: 'adoption-orders',
    label: 'Adoption orders (England)',
    colour: '#2A9D8F',
    data: adoptionOrdersValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'children-waiting',
    label: 'Children waiting for adoption',
    colour: '#E63946',
    data: childrenWaiting.map((v, i) => ({ date: new Date(2014 + i, 0, 1), value: v })),
  },
  {
    id: 'approved-adopters',
    label: 'Approved adopters',
    colour: '#2A9D8F',
    data: approvedAdopters.map((v, i) => ({ date: new Date(2014 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2013, 0, 1), label: '2013: Re B-S ruling — adoption only when "nothing else will do"' },
  { date: new Date(2015, 0, 1), label: '2015: Peak 5,360 adoption orders' },
  { date: new Date(2021, 0, 1), label: '2021: Regional Adoption Agencies fully operational' },
];

export default function AdoptionPage() {
  return (
    <>
      <TopicNav topic="Care & Support" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Care & Support"
          question="Are children actually being adopted?"
          finding="Adoption orders in England have fallen 45% from their 2015 peak of 5,360 to just 2,950 in 2024. Children wait an average of 538 days from entering care to being placed with an adoptive family — well above the 426-day target. The gap between children waiting and approved adopters continues to widen."
          colour="#2A9D8F"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The story of adoption in England is fundamentally shaped by a single court ruling. In September 2013, the Court of Appeal handed down Re B-S (Children), which required courts to consider adoption only when "nothing else will do" and to carry out a proper analysis of all realistic options for a child's future. The ruling was a necessary corrective, but its effect on the system was seismic. Local authorities became markedly more cautious about applying for placement orders. The number granted fell from over 6,200 in 2013/14 to under 3,300 by 2017/18. By 2024, annual adoption orders had dropped to 2,950 — less than half the 2015 peak of 5,360.</p>
            <p>The adopter pipeline has contracted in parallel. The number of approved adopters fell from over 4,400 in 2014 to around 2,340 in 2024, while the number of children with a placement order waiting for a match has risen past 3,300. The hardest-to-place children wait longest: sibling groups of three or more, children over five, those with foetal alcohol spectrum disorder or attachment trauma, and children from minority ethnic backgrounds. Special guardianship orders have grown significantly as an alternative permanence route, rising from around 2,000 per year in 2010 to over 4,500 by 2024, often with far less post-order support. The Adoption Support Fund, introduced in 2015, has provided therapeutic interventions for over 50,000 adopted children, but faces annual funding uncertainty that makes long-term planning difficult.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Adoption orders' },
          { id: 'sec-chart2', label: 'Supply gap' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Adoption orders (England)"
              value="2,950"
              unit="2023/24"
              direction="down"
              polarity="up-is-good"
              changeText="Down 45% from 5,360 peak in 2015"
              sparklineData={adoptionOrdersValues.slice(-8)}
              source="DfE · SSDA903 Children Looked After Statistics 2023/24"
              href="#sec-chart1"
            />
            <MetricCard
              label="Average wait (care to adoption)"
              value="538"
              unit="days · 2023/24"
              direction="up"
              polarity="up-is-bad"
              changeText="Target: 426 days · 112 days above target"
              sparklineData={waitDaysValues.slice(-8)}
              source="DfE · SSDA903 Children Looked After Statistics 2023/24"
              href="#sec-chart1"
            />
            <MetricCard
              label="Children waiting vs adopters approved"
              value="3,310 vs 2,340"
              unit="2023/24"
              direction="up"
              polarity="up-is-bad"
              changeText="970 more children waiting than adopters approved"
              sparklineData={childrenWaiting.map((c, i) => c - approvedAdopters[i])}
              source="Adoption & Special Guardianship Leadership Board 2023/24"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Adoption orders granted, England, 2010–2024"
              subtitle="Annual adoption orders. Rose sharply under coalition government reforms, peaked at 5,360 in 2015, then fell after the Re B-S ruling took effect in courts."
              series={series1}
              annotations={annotations}
              yLabel="Orders"
              source={{ name: 'DfE', dataset: 'SSDA903 Children Looked After in England', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/children-looked-after-in-england-including-adoptions', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Children waiting for adoption vs approved adopters, 2014–2024"
              subtitle="The lines crossed around 2018: more children now wait than there are approved families available. The gap has widened each year since."
              series={series2}
              annotations={[]}
              yLabel="Count"
              source={{ name: 'Adoption & Special Guardianship Leadership Board', dataset: 'Annual Report — Adopter Recruitment and Matching', url: 'https://www.gov.uk/government/collections/adoption-data-and-reports', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Regional Adoption Agencies improving recruitment and matching"
            value="30 RAAs"
            unit="covering all of England by 2021"
            description="The regionalisation of adoption services — consolidating around 150 local authority adoption teams into 30 Regional Adoption Agencies by 2021 — has improved adopter recruitment, reduced duplication, and enabled better matching across local authority boundaries. Early evidence suggests RAAs are reducing the time children wait for a match, particularly for those with straightforward profiles. The Adoption Support Fund, launched in 2015, has funded therapeutic support for over 50,000 adopted children and their families, addressing attachment difficulties, trauma, and developmental delay."
            source="Source: DfE — Regional Adoption Agency Programme Evaluation 2023. Adoption Support Fund Annual Report, CoramBAAF."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://explore-education-statistics.service.gov.uk/find-statistics/children-looked-after-in-england-including-adoptions" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfE — Children Looked After in England (SSDA903)</a> — annual statistics on adoption orders, waiting times, and placement data.</p>
            <p><a href="https://www.gov.uk/government/collections/adoption-data-and-reports" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Adoption & Special Guardianship Leadership Board</a> — annual data on adopter recruitment, matching, and the Adoption Support Fund.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
