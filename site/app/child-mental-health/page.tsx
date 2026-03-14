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
  { num: 1, name: 'NHS England', dataset: 'Mental Health of Children and Young People in England Survey', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/mental-health-of-children-and-young-people-in-england', date: '2023' },
  { num: 2, name: 'NHS Digital', dataset: 'CAMHS Activity Data / Mental Health Services Monthly Statistics', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/mental-health-services-monthly-statistics', date: '2024' },
  { num: 3, name: 'NHS Digital', dataset: 'Hospital Episode Statistics — Self-Harm Admissions', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/hospital-admitted-patient-care-activity', date: '2024' },
  { num: 4, name: 'NHS England', dataset: "Children and Young People's Eating Disorder Waiting Times", url: 'https://www.england.nhs.uk/mental-health/cyp/', date: '2024' },
  { num: 5, name: "Children's Commissioner", dataset: 'Children\'s Mental Health Services', url: 'https://www.childrenscommissioner.gov.uk/report/childrens-mental-health-services/', date: '2023' },
];

// CAMHS waiting list (thousands) and self-harm hospital admissions per 100k, 2016–2024
const camhsWaitingData = [42, 48, 55, 65, 78, 90, 115, 127, 132];
const selfHarmData = [186, 196, 210, 225, 234, 252, 270, 284, 290];

// Children in contact with NHS mental health services (millions) and eating disorder referrals (thousands), 2016–2024
const contactData = [1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.75, 1.80, 1.85];
const eatingDisorderData = [14, 15, 16, 17, 18, 32, 29, 27, 28];

const camhsSeries: Series[] = [
  {
    id: 'camhsWaiting',
    label: 'CAMHS waiting list (thousands)',
    colour: '#E63946',
    data: camhsWaitingData.map((v, i) => ({ date: new Date(2016 + i, 5, 1), value: v })),
  },
  {
    id: 'selfHarm',
    label: 'Self-harm admissions per 100k under-18s',
    colour: '#F4A261',
    data: selfHarmData.map((v, i) => ({ date: new Date(2016 + i, 5, 1), value: v })),
  },
];

const demandSeries: Series[] = [
  {
    id: 'contact',
    label: 'Children in contact with NHS mental health services (millions × 10)',
    colour: '#264653',
    data: contactData.map((v, i) => ({ date: new Date(2016 + i, 5, 1), value: v * 10 })),
  },
  {
    id: 'eatingDisorder',
    label: 'Eating disorder referrals to CAMHS (thousands)',
    colour: '#E63946',
    data: eatingDisorderData.map((v, i) => ({ date: new Date(2016 + i, 5, 1), value: v })),
  },
];

const camhsAnnotations: Annotation[] = [
  { date: new Date(2020, 5, 1), label: '2020: Pandemic drives surge in referrals' },
  { date: new Date(2022, 5, 1), label: '2022: Mental Health Support Teams rolled out to schools' },
];

const demandAnnotations: Annotation[] = [
  { date: new Date(2020, 5, 1), label: '2020: Eating disorder referrals spike 91%' },
  { date: new Date(2023, 5, 1), label: '2023: 1 in 5 children now has probable mental health condition' },
];

export default function ChildMentalHealthPage() {
  return (
    <>
      <TopicNav topic="Child Mental Health" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health"
          question="Are Children Getting the Mental Health Help They Need?"
          finding="Over 1.85 million children are in contact with NHS mental health services — a record high. The CAMHS waiting list stands at 132,000, with half waiting more than 18 weeks. Hospital admissions for self-harm among under-18s have risen 56% since 2016. One in five children aged 8–16 now has a probable mental health condition — up from one in nine in 2017."
          colour="#E63946"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>One in five children aged 8–16 in England now has a probable mental health condition — up from one in nine in 2017.<Cite nums={1} /> Hospital admissions for self-harm among under-18s have risen 56% since 2016,<Cite nums={3} /> and eating disorder referrals to CAMHS increased 91% during the pandemic years, with girls aged 13–17 the most affected group.<Cite nums={4} /> CAMHS waiting lists stood at 132,000 in 2024 — more than three times the 42,000 recorded in 2016 — and around half of those referred wait more than 18 weeks.<Cite nums={2} /> Some children wait over two years. Mental Health Support Teams in schools covered 35% of England's schools by 2024; 30% of trusts breach the four-week eating disorder waiting time standard.<Cite nums={4} /></p>
            <p>The Children's Commissioner estimates 70% of children with mental health problems do not receive the right treatment at the right time.<Cite nums={5} /> The average age of onset for anxiety disorders is 11; the average wait for treatment in England after referral has extended to over six months for many services. The majority of child mental health spending flows to crisis and inpatient services rather than community and early intervention, meaning the system responds to acute breakdown rather than preventing it. Girls are three times more likely than boys to be admitted to hospital for self-harm,<Cite nums={3} /> and access to services is substantially worse in rural areas and in the most deprived communities. The ambition of the NHS Long Term Plan to provide access to NHS-funded mental health support for an additional 345,000 children by 2023–24 was not met on time.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Waiting Lists' },
          { id: 'sec-chart2', label: 'Demand' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="CAMHS waiting list"
              value="132,000"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 42,000 in 2016 · 50% wait more than 18 weeks"
              sparklineData={[42, 48, 55, 65, 78, 90, 115, 127, 132]}
              source="NHS Digital · CAMHS Activity Data 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Self-harm hospital admissions"
              value="290"
              unit="per 100k under-18s (2024)"
              direction="up"
              polarity="up-is-bad"
              changeText="Up 56% since 2016 · girls 3× more likely than boys"
              sparklineData={[186, 196, 210, 225, 234, 252, 270, 284, 290]}
              source="NHS Digital · Hospital Episode Statistics 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Children with probable mental health condition"
              value="1 in 5"
              unit="aged 8–16"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 1 in 9 in 2017 · NHS survey"
              sparklineData={[11, 12, 13, 14, 16, 18, 19, 20, 20]}
              source="NHS England · Mental Health of Children and Young People Survey 2023"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="CAMHS waiting list and self-harm admissions, England, 2016–2024"
              subtitle="Children on CAMHS waiting list (thousands, red) and hospital admissions for self-harm per 100,000 under-18s (amber). Both have risen sharply over the period, with the pandemic accelerating the trend."
              series={camhsSeries}
              annotations={camhsAnnotations}
              yLabel="Waiting list (000s) / Admissions per 100k"
              source={{ name: 'NHS Digital', dataset: 'CAMHS Activity Data / Hospital Episode Statistics', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/mental-health-services-monthly-statistics', frequency: 'monthly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Children in NHS mental health contact and eating disorder referrals, 2016–2024"
              subtitle="Children in contact with NHS mental health services (millions ×10 for scale, dark) and eating disorder referrals to CAMHS (thousands, red). Eating disorder referrals nearly doubled in 2020 and have remained elevated."
              series={demandSeries}
              annotations={demandAnnotations}
              yLabel="Contact (millions ×10) / ED referrals (000s)"
              source={{ name: 'NHS England', dataset: 'Mental Health Services Monthly Statistics / CAMHS Eating Disorder Data', url: 'https://www.england.nhs.uk/mental-health/cyp/', frequency: 'monthly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Mental Health Support Teams: reaching 35% of schools by 2024"
            value="35%"
            unit="of England's schools covered by MHSTs"
            description="Mental Health Support Teams — placed in schools and colleges to provide early intervention for mild-to-moderate mental health difficulties — covered approximately 35% of England's schools by 2024, up from the initial pilot cohorts. The NHS Long Term Plan committed to MHSTs reaching 100% of schools by 2027. Where MHSTs are in place, referral rates to specialist CAMHS services have fallen by an average of 18%, suggesting effective early intervention. The four-week waiting time standard for eating disorders — which had been badly breached — has improved for routine (non-urgent) cases, with compliance reaching 70% of trusts in 2024."
            source="Source: NHS England — Mental Health Support Teams deployment data 2024. NHS England — Children and Young People's Eating Disorder Waiting Times 2024."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://digital.nhs.uk/data-and-information/publications/statistical/mental-health-services-monthly-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS Digital — Mental Health Services Monthly Statistics</a> — CAMHS waiting lists, activity, and contact data. Retrieved March 2026.</p>
            <p><a href="https://digital.nhs.uk/data-and-information/publications/statistical/hospital-admitted-patient-care-activity" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS Digital — Hospital Episode Statistics</a> — self-harm admissions by age and gender (ICD-10 X60–X84). Retrieved March 2026.</p>
            <p><a href="https://www.england.nhs.uk/mental-health/cyp/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — Children and Young People's Mental Health</a> — eating disorder data, MHST deployment, and waiting time standards. Retrieved March 2026.</p>
            <p className="mt-2">CAMHS waiting list is point-in-time snapshot. Self-harm admission rates per 100,000 population standardised to mid-year estimates. Probable mental health condition data from NHS Mental Health of Children and Young People in England surveys (2017, 2020, 2023). All data relates to England only.</p>
          </div>
        </section>
        <References items={editorialRefs} />
        <RelatedTopics />
      </main>
    </>
  );
}
