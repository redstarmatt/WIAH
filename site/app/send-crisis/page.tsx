'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Department for Education', dataset: 'Special Educational Needs in England', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/special-educational-needs-in-england', date: '2024', note: 'EHCP requests rose from 60,000 (2015) to 167,000 (2024) — 178% increase; only 37% issued within 20-week statutory limit' },
  { num: 2, name: 'HMCTS', dataset: 'SEND Tribunal Statistics', url: 'https://www.gov.uk/government/collections/tribunals-statistics', date: '2024', note: '9,800 tribunal appeals per year (+292% since 2015); families win 96% of contested hearings' },
  { num: 3, name: 'National Audit Office', dataset: 'Support for Pupils with SEND', url: 'https://www.nao.org.uk/', date: '2024', note: 'Total SEND provision costs exceed £10bn/year; DSG deficit growing; poor outcomes despite high spending' },
];

export default function SendCrisisPage() {
  const ehcpRequests    = [60, 68, 76, 86, 98, 112, 124, 139, 152, 167];
  const ehcpIssued      = [54, 61, 68, 77, 88, 100, 110, 122, 133, 145];
  const withinTarget    = [60, 55, 52, 49, 46, 43, 41, 39, 37];
  const tribunalAppeals = [2.5, 3.1, 3.8, 4.5, 5.3, 6.2, 7.0, 8.1, 9.0, 9.8];

  const chart1Series: Series[] = [
    {
      id: 'requests',
      label: 'EHCP requests (thousands)',
      colour: '#E63946',
      data: ehcpRequests.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'issued',
      label: 'EHCPs issued (thousands)',
      colour: '#6B7280',
      data: ehcpIssued.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2014, 0, 1), label: '2014: Children & Families Act' },
    { date: new Date(2020, 0, 1), label: '2020: COVID pressures mount' },
  ];

  const chart2Series: Series[] = [
    {
      id: 'within20',
      label: '% EHCPs issued within 20-week limit',
      colour: '#E63946',
      data: withinTarget.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
    },
  ];

  const chart2TargetLine = { value: 100, label: 'Statutory target: 100%' };

  return (
    <>
      <TopicNav topic="SEND Crisis" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="SEND Crisis"
          question="Is the SEND System Failing Children?"
          finding="Children waiting for an Education, Health and Care Plan (EHCP) assessment has surged — 1 in 5 children with SEND wait over 20 weeks, and the system costs councils £10bn/year with outcomes still poor."
          colour="#E63946"
          preposition="in the"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="EHCP requests (thousands/year)"
              value="167"
              direction="up"
              polarity="up-is-bad"
              changeText="+178% since 2015 · system overwhelmed"
              sparklineData={ehcpRequests}
              source="DfE — SEND statistics, 2024"
            />
            <MetricCard
              label="EHCPs decided within 20 weeks (%)"
              value="37"
              direction="down"
              polarity="down-is-bad"
              changeText="down from 60% in 2016 · statutory target missed"
              sparklineData={withinTarget}
              source="DfE — SEND statistics, 2024"
            />
            <MetricCard
              label="Tribunal appeals (thousands/year)"
              value="9.8"
              direction="up"
              polarity="up-is-bad"
              changeText="+292% since 2015 · families forced to fight"
              sparklineData={tribunalAppeals}
              source="HMCTS — SEND tribunal statistics, 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="EHCP requests and plans issued, England, 2015–2024"
              subtitle="Thousands. The gap between requests and issued plans reflects growing unmet need."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Thousands"
              source={{
                name: 'Department for Education',
                dataset: 'Special educational needs in England',
                frequency: 'annual',
                url: 'https://explore-education-statistics.service.gov.uk/find-statistics/special-educational-needs-in-england',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="% of EHCPs issued within 20-week statutory limit, 2016–2024"
              subtitle="England. Councils are legally required to complete assessments within 20 weeks."
              series={chart2Series}
              targetLine={chart2TargetLine}
              yLabel="% within 20 weeks"
              source={{
                name: 'Department for Education',
                dataset: 'Special educational needs in England',
                frequency: 'annual',
                url: 'https://explore-education-statistics.service.gov.uk/find-statistics/special-educational-needs-in-england',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The SEND system under strain</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>The number of children in England with Education, Health and Care Plans has more than doubled since the 2014 Children and Families Act introduced the current framework. Demand for EHCPs rose from 60,000 requests in 2015 to 167,000 in 2024 — a 178% increase — while local authority capacity has not kept pace.<Cite nums={1} /></p>
              <p>The statutory 20-week deadline for completing an EHCP assessment is being missed for nearly two thirds of children. Only 37% of EHCPs are now issued within the legal limit, down from 60% in 2016.<Cite nums={1} /> Families who challenge delays through the Special Educational Needs Tribunal win their cases in over 96% of contested hearings — suggesting decisions are often wrong, not just slow.<Cite nums={2} /></p>
              <p>The total cost of SEND provision to local councils exceeds £10 billion per year, with a growing share absorbed by legal challenges and expensive independent school placements when mainstream settings cannot meet need.<Cite nums={3} /> Despite this spending, inspection evidence consistently finds poor outcomes for children with SEND compared to their peers.</p>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://explore-education-statistics.service.gov.uk/find-statistics/special-educational-needs-in-england" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Department for Education — Special educational needs in England</a>. Annual. Retrieved 2024.</p>
            <p><a href="https://www.gov.uk/government/collections/tribunals-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">HMCTS — Tribunal statistics</a>. SEND tribunal appeals data. Retrieved 2024.</p>
            <p>All figures are for England unless otherwise stated. EHCP data covers calendar years.</p>
          </div>
        </section>
      </main>
    </>
  );
}
