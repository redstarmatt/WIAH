'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Adults seen by NHS dentist (%), 2017/18–2024/25
const adultAccessValues = [57.3, 56.8, 56.1, 55.4, 35.8, 43.1, 47.2, 49.1];

// Children seen by NHS dentist (%), 2017/18–2024/25
const childAccessValues = [70.1, 69.8, 69.2, 68.5, 42.0, 55.3, 61.4, 65.2];

// Courses of treatment (millions), 2017/18–2024/25
const coursesValues = [37.3, 36.8, 36.2, 35.8, 20.4, 28.3, 31.2, 33.6];

// NHS dentists (thousands), 2017/18–2024/25
const dentistValues = [23.7, 23.4, 23.0, 22.5, 21.8, 21.2, 21.0, 22.1];

const series1: Series[] = [
  {
    id: 'adult-access',
    label: 'Adults seen by NHS dentist (%)',
    colour: '#E63946',
    data: adultAccessValues.map((v, i) => ({ date: new Date(2017 + i, 3, 1), value: v })),
  },
  {
    id: 'child-access',
    label: 'Children seen by NHS dentist (%)',
    colour: '#2A9D8F',
    data: childAccessValues.map((v, i) => ({ date: new Date(2017 + i, 3, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'courses',
    label: 'Courses of treatment (millions)',
    colour: '#264653',
    data: coursesValues.map((v, i) => ({ date: new Date(2017 + i, 3, 1), value: v })),
  },
  {
    id: 'nhs-dentists',
    label: 'NHS dentists (thousands)',
    colour: '#F4A261',
    data: dentistValues.map((v, i) => ({ date: new Date(2017 + i, 3, 1), value: v })),
  },
];

const annotations1: Annotation[] = [
  { date: new Date(2020, 2, 1), label: '2020: COVID — services suspended' },
];

const annotations2: Annotation[] = [
  { date: new Date(2020, 2, 1), label: '2020: COVID — treatment collapse' },
  { date: new Date(2024, 3, 1), label: '2024: Dental Recovery Plan launched' },
];

export default function DentalPage() {
  return (
    <>
      <TopicNav topic="Dental" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Dental"
          question="Can You Actually Get an NHS Dentist?"
          finding="Only 49% of adults in England saw an NHS dentist in the two years to March 2025 — down from 57% before the pandemic. NHS dental practices are not accepting new patients in most areas. 35,156 children required tooth extractions under general anaesthetic in 2022/23, the leading cause of child hospitalisation."
          colour="#E63946"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>NHS dentistry has effectively collapsed for millions. The structural cause is the 2006 NHS dental contract, which replaced fee-per-item payments with Units of Dental Activity (UDAs) that pay a fixed price regardless of treatment complexity — a check-up and a root canal earn a practice almost the same amount. The result was predictable: dentists began limiting NHS work, cherry-picking simpler cases, and leaving the NHS altogether. Between 2015 and 2024, the number of dentists performing NHS work fell by around 1,600 while the number working exclusively privately nearly doubled. The exodus accelerated after COVID-19, when infection control requirements made NHS work even less financially viable.</p>
            <p>The consequences fall hardest on those who can least afford private care. Coastal towns, rural areas, and deprived communities have become dental deserts — places where no NHS dentist is accepting new patients within a 25-mile radius. The human cost is visible in hospital data: around 35,000–40,000 children a year are admitted for tooth extractions under general anaesthetic — the single most common reason for a child to be hospitalised in England. These are overwhelmingly preventable extractions caused by tooth decay, compounded by the inability to access routine check-ups. A 2024 Dental Recovery Plan has been launched, but the BDA has described the measures as insufficient to reverse structural failure two decades in the making.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Access' },
          { id: 'sec-chart2', label: 'Workforce & Treatments' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Adults seen by NHS dentist (24 months)"
              value="49.1%"
              unit="2024/25"
              direction="down"
              polarity="up-is-good"
              changeText="was 57.3% pre-pandemic · down 8pp · ~8M fewer adults"
              sparklineData={[57.3, 56.8, 56.1, 55.4, 35.8, 43.1, 47.2, 49.1]}
              source="NHS England — NHS Dental Statistics 2024/25"
              href="#sec-chart1"
            />
            <MetricCard
              label="Courses of treatment"
              value="33.6M"
              unit="per year"
              direction="down"
              polarity="up-is-good"
              changeText="was 37.3M in 2017/18 · 4M fewer treatments per year"
              sparklineData={[37.3, 36.8, 36.2, 35.8, 20.4, 28.3, 31.2, 33.6]}
              source="NHS England — NHS Dental Statistics 2024/25"
              href="#sec-chart2"
            />
            <MetricCard
              label="NHS dentists"
              value="22,100"
              unit="2024/25"
              direction="down"
              polarity="up-is-good"
              changeText="down 1,600 since 2018 · contract makes private pay more attractive"
              sparklineData={[23700, 23400, 23000, 22500, 21800, 21200, 21000, 22100]}
              source="NHS England — NHS Dental Statistics 2024/25"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Adults and children seen by NHS dentist, 2017/18–2024/25"
              subtitle="Percentage of population seen in relevant period (adults: 24 months; children: 12 months). Both collapsed during the pandemic and have not recovered to pre-2020 levels. Children's access has recovered faster than adults'."
              series={series1}
              annotations={annotations1}
              yLabel="Percentage (%)"
              source={{ name: 'NHS England', dataset: 'NHS Dental Statistics for England', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/nhs-dental-statistics', frequency: 'annual', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="NHS dental courses of treatment and dentist numbers, 2017/18–2024/25"
              subtitle="Courses of treatment (millions) and NHS dentists (thousands). Both have fallen since 2018 as practitioners shift to private practice under the UDA contract model."
              series={series2}
              annotations={annotations2}
              yLabel="Millions / Thousands"
              source={{ name: 'NHS England', dataset: 'NHS Dental Statistics for England', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/nhs-dental-statistics', frequency: 'annual', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Children's access recovering: 65% now seen"
            value="65.2%"
            unit="of children seen by NHS dentist — up from 42% pandemic low"
            description="Children's NHS dental access has recovered faster than adults — from a pandemic low of 42% in 2020/21 to 65.2% in 2024/25. Community dental vans visiting underserved areas reached over 120,000 patients in 2023/24. Supervised tooth-brushing programmes, now running in over 1,800 primary schools in the most deprived areas, reduce tooth decay by up to 28% among participating children. These preventive programmes cost less than 50p per child per week and prevent hospital admissions costing the NHS over £1,000 per extraction under general anaesthetic."
            source="Source: NHS England — NHS Dental Statistics 2024/25. OHID — Supervised Tooth Brushing Programme 2024."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://digital.nhs.uk/data-and-information/publications/statistical/nhs-dental-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — NHS Dental Statistics for England</a> — access rates, courses of treatment, workforce data. Annual. 2024/25.</p>
            <p><a href="https://www.nhsbsa.nhs.uk/statistical-collections/dental-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS BSA — Dental Statistics</a> — UDA performance and payment data. Quarterly. 2025.</p>
            <p>Adult access is patients seen in any 24-month rolling period; children in any 12-month period. Courses of treatment are unique courses (not individual appointments). Dentist counts are headcount performing NHS activity. Financial year runs April to March.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
