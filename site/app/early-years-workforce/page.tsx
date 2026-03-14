'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'DfE', dataset: 'Childcare and Early Years Workforce', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/childcare-and-early-years-provider-survey', date: '2024' },
  { num: 2, name: 'Early Years Alliance', dataset: 'Costing Quality Report', url: 'https://www.eyalliance.org.uk/costing-quality', date: '2024' },
  { num: 3, name: 'PACEY', dataset: 'Early Years Workforce Survey', url: 'https://www.pacey.org.uk/', date: '2024' },
];

const workforceValues = [390, 385, 382, 378, 374, 360, 348, 342, 338, 335, 332];
const vacancyRateValues = [3.1, 3.4, 3.8, 4.2, 4.8, 5.2, 7.8, 9.4, 10.2, 9.8, 9.4];
const averageWageValues = [7.80, 7.90, 8.10, 8.30, 8.60, 8.80, 9.10, 9.50, 10.20, 10.80, 11.20];
const level3QualValues = [72.1, 72.8, 73.4, 74.1, 74.8, 75.2, 75.8, 76.4, 77.0, 77.6, 78.2];

const series1: Series[] = [
  { id: 'workforce', label: 'Early years workers (thousands)', colour: '#2A9D8F', data: workforceValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'vacancy', label: 'Vacancy rate (%)', colour: '#E63946', data: vacancyRateValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const series2: Series[] = [
  { id: 'wage', label: 'Average hourly wage (£)', colour: '#F4A261', data: averageWageValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'qual', label: 'Workers with Level 3+ qualification (%)', colour: '#264653', data: level3QualValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const annotations1: Annotation[] = [
  { date: new Date(2020, 2, 1), label: '2020: COVID — many settings closed' },
  { date: new Date(2024, 8, 1), label: '2024: Expanded entitlement — workforce demand rises' },
];

export default function EarlyYearsWorkforcePage() {
  return (
    <>
      <TopicNav topic="Early Years Workforce" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Education"
          question="Is the Early Years Workforce in Crisis?"
          finding={<>The early years workforce has shrunk from 390,000 to 332,000 workers since 2013 — an 15% reduction — while vacancy rates have risen to 9.4% as the sector struggles to recruit and retain staff on average wages of £11.20 per hour, well below comparably-qualified roles in primary education.<Cite nums={[1, 2]} /> The government&apos;s expanded free childcare entitlement depends on a workforce that is actively declining.<Cite nums={[1, 3]} /></>}
          colour="#2A9D8F"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The early years workforce — the practitioners who work in nurseries, pre-schools, childminders, and reception classes — is the backbone of childcare provision, yet it is chronically undervalued and underpaid relative to the responsibilities it carries. The evidence base on early childhood development is unambiguous: the quality of early years provision, and particularly the qualifications and responsiveness of practitioners, is the primary determinant of outcomes for children aged 0–5. Yet early years workers are paid a fraction of what primary school teachers earn, despite working with the youngest and most developmentally sensitive children.<Cite nums={2} /> Average wages of £11.20 per hour barely exceed the National Living Wage for many roles, making recruitment and retention deeply challenging.</p>
            <p>The sector has shed 58,000 workers since 2013, and the government&apos;s plan to deliver 30 hours of free childcare for all children from 9 months requires an estimated 35,000–40,000 additional workers to be recruited and trained — a number larger than the total workforce reduction of the past decade, and a target that appears very challenging to achieve given current pay and conditions.<Cite nums={[1, 3]} /> Early Years Alliance surveys show that over 60% of setting managers are finding it impossible to recruit qualified staff, and that many are planning to reduce hours or places rather than expand. The fundamental problem is funding: the hourly rates paid to providers under the free entitlement are too low to support wages that would attract and retain the workforce needed, creating a structural gap between policy ambition and operational delivery.<Cite nums={2} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-chart1', label: 'Workforce & Vacancies' },
          { id: 'sec-chart2', label: 'Pay & Qualifications' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="Early years workforce" value="332K" unit="workers" direction="down" polarity="up-is-good" changeText="down from 390K in 2013 · expanded entitlement needs +40K" sparklineData={[390, 385, 382, 378, 374, 360, 348, 342, 338, 335, 332]} source="DfE — Childcare and Early Years Workforce 2024" href="#sec-chart1" />
            <MetricCard label="Vacancy rate" value="9.4%" unit="of posts unfilled" direction="up" polarity="up-is-bad" changeText="was 3.1% in 2013 · tripled · pay the primary barrier" sparklineData={[3.1, 3.4, 3.8, 4.2, 4.8, 5.2, 7.8, 9.4, 10.2, 9.8, 9.4]} source="DfE — Childcare and Early Years Workforce 2024" href="#sec-chart1" />
            <MetricCard label="Average hourly wage" value="£11.20" unit="per hour" direction="up" polarity="up-is-good" changeText="rising but still £5+ below equivalent primary teaching" sparklineData={[7.80, 7.90, 8.10, 8.30, 8.60, 8.80, 9.10, 9.50, 10.20, 10.80, 11.20]} source="Early Years Alliance — Costing Quality 2024" href="#sec-chart2" />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Early years workforce size and vacancy rate, England, 2013–2024"
              subtitle="Total early years workers (thousands) and vacancy rate (%). Workforce shrinking while vacancies rise — the worst possible combination as the government plans major expansion of free childcare entitlement."
              series={series1}
              annotations={annotations1}
              yLabel="Thousands / Percentage"
              source={{ name: 'DfE', dataset: 'Childcare and Early Years Provider Survey', url: 'https://explore-education-statistics.service.gov.uk/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Average early years hourly wage and qualification levels, 2013–2024"
              subtitle="Average hourly wage for early years practitioners (£) and % with Level 3 or above qualification. Wages rising with minimum wage increases but still far below comparable education roles. Qualifications slowly improving."
              series={series2}
              annotations={[]}
              yLabel="£ / Percentage"
              source={{ name: 'Early Years Alliance', dataset: 'Costing Quality Report', url: 'https://www.eyalliance.org.uk/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Early years graduate workforce has trebled since 2003"
            value="27%"
            unit="of early years settings now have a graduate-level leader"
            description="The proportion of early years settings led by a graduate — a bachelor&apos;s degree holder with an Early Years Professional Status or Early Years Teacher Status qualification — has risen from under 10% in 2003 to 27% in 2024. Graduate-led settings consistently show better outcomes for children, particularly in language development and school readiness. Evidence suggests that a graduate practitioner in a room of 20 children improves developmental outcomes by the equivalent of 3–4 months of development. Expanding graduate leadership is constrained by the qualification cost and by the fact that graduates can earn substantially more in primary schools."
            source="Source: DfE — Childcare and Early Years Workforce Survey 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://explore-education-statistics.service.gov.uk/find-statistics/childcare-and-early-years-provider-survey" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfE — Childcare and Early Years Provider Survey</a> — workforce size, vacancies, qualifications. Annual.</p>
            <p><a href="https://www.eyalliance.org.uk/costing-quality" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Early Years Alliance — Costing Quality</a> — wages, funding rates, financial viability. Annual.</p>
            <p>Workforce counts include paid employees and self-employed childminders working with children under 5. Vacancy rate from provider survey. Wage data from provider surveys (not ASHE, which undercounts part-time early years workers). Level 3 qualification is NVQ Level 3 in Childcare or equivalent.</p>
          </div>
        </section>
      </main>
    </>
  );
}
