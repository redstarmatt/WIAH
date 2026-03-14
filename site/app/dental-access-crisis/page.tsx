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

// Patients seen by NHS dentist (24-month, %), 2012–2024
const patientsSeenValues = [59.2, 58.8, 58.4, 57.9, 57.3, 56.8, 56.1, 55.4, 35.8, 43.1, 47.2, 49.1, 49.1];

// NHS dentists performing NHS work (thousands), 2012–2024
const nhsDentistValues = [24.2, 24.1, 24.0, 23.8, 23.7, 23.4, 23.0, 22.5, 21.8, 21.2, 21.0, 21.5, 22.1];

// Child tooth extractions under GA (thousands), 2012–2024
const childExtractionValues = [34.5, 35.1, 35.8, 36.4, 36.7, 37.2, 37.8, 38.1, 17.2, 31.4, 34.9, 35.2, 35.2];

const series1: Series[] = [
  {
    id: 'patients-seen',
    label: 'Adults seen by NHS dentist (%)',
    colour: '#E63946',
    data: patientsSeenValues.map((v, i) => ({ date: new Date(2012 + i, 3, 1), value: v })),
  },
  {
    id: 'nhs-dentists',
    label: 'NHS dentists (thousands, ÷0.5 scaled)',
    colour: '#264653',
    data: nhsDentistValues.map((v, i) => ({ date: new Date(2012 + i, 3, 1), value: v / 0.5 })),
  },
];

const series2: Series[] = [
  {
    id: 'child-extractions',
    label: 'Child tooth extractions under GA (thousands)',
    colour: '#F4A261',
    data: childExtractionValues.map((v, i) => ({ date: new Date(2012 + i, 3, 1), value: v })),
  },
];

const annotations1: Annotation[] = [
  { date: new Date(2020, 2, 1), label: '2020: COVID — dental services suspended' },
  { date: new Date(2024, 3, 1), label: '2024: Dental Recovery Plan' },
];

const annotations2: Annotation[] = [
  { date: new Date(2020, 2, 1), label: '2020: COVID — GA procedures halted' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'NHS England', dataset: 'NHS Dental Statistics for England', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/nhs-dental-statistics', date: '2024' },
  { num: 2, name: 'NHS England', dataset: 'Hospital Episode Statistics — Admitted Patient Care', url: 'https://digital.nhs.uk/data-and-information/data-tools-and-services/data-services/hospital-episode-statistics', date: '2024' },
  { num: 3, name: 'British Dental Association', dataset: 'NHS Vacancies Survey', url: 'https://www.bda.org', date: '2024' },
  { num: 4, name: 'Healthwatch England', dataset: 'Dental Access Survey', url: 'https://www.healthwatch.co.uk', date: '2024' },
  { num: 5, name: 'Which?', dataset: 'NHS Dentist Availability Survey', url: 'https://www.which.co.uk/reviews/dentists/', date: '2024' },
];

export default function DentalAccessCrisisPage() {
  return (
    <>
      <TopicNav topic="Dental Access Crisis" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Dental Access Crisis"
          question="Why Can't Millions Get an NHS Dentist?"
          finding="97% of NHS dental practices in England are not accepting new adult patients. An estimated 13 million people have unmet dental need. Over 35,000 children a year are admitted to hospital for tooth extractions under general anaesthetic — the single most common cause of child hospitalisation — almost entirely due to preventable decay."
          colour="#E63946"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The structural cause of the NHS dental access crisis is the 2006 contract, which replaced item-of-service fees with Units of Dental Activity (UDAs). Under the UDA system, a routine check-up and a complex root canal treatment generate almost the same income for a practice. The financial incentive to perform simple, quick treatments — and to avoid complex, time-consuming NHS work — is baked into the contract. The consequence has been a steady drift of dentists away from NHS work and into private practice. Between 2018 and 2023, the number of dentists performing NHS activity fell by over 1,600, while the number working exclusively privately nearly doubled.<Cite nums={1} /> COVID-19 accelerated the exodus: infection control requirements made already marginal NHS work financially unviable, and many practices used the opportunity to convert permanently to private list-only or mixed models.</p>
            <p>The result is dental deserts — entire towns, coastal communities, and rural areas where no NHS dentist is accepting new patients within a 25-mile radius.<Cite nums={5} /> A 2024 Dental Recovery Plan introduced new patient premiums and adjusted UDA values, but the British Dental Association described the measures as insufficient to reverse structural failure two decades in the making.<Cite nums={3} /> The human cost is most visible in hospital data: around 35,000–40,000 children are admitted each year for tooth extractions under general anaesthetic.<Cite nums={2} /> These are overwhelmingly preventable, caused by decay compounded by lack of access to routine check-ups. Hospital extraction costs the NHS over £1,000 per child — compared with less than £30 for a routine NHS check-up and filling that might have prevented it.<Cite nums={2} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Access & Workforce' },
          { id: 'sec-chart2', label: 'Child Extractions' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="NHS practices not accepting new adults"
              value="97%"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="near-total access closure · dental deserts across England"
              sparklineData={[45, 52, 58, 63, 69, 74, 80, 86, 91, 97]}
              source="Which? — NHS Dentist Availability Survey 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="NHS dentist vacancies"
              value="3,000+"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="UDA contract makes NHS work unviable vs private rates"
              sparklineData={[800, 950, 1100, 1400, 1700, 2100, 2400, 2700, 2900, 3100]}
              source="British Dental Association — NHS Vacancies Survey 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="People with unmet dental need"
              value="13M"
              unit="est. 2024"
              direction="up"
              polarity="up-is-bad"
              changeText="unable to access NHS dentist when needed · rising post-COVID"
              sparklineData={[6.2, 6.8, 7.4, 8.1, 8.9, 9.8, 10.8, 11.5, 12.2, 13.0]}
              source="Healthwatch England — Dental Access Survey 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="NHS dental access and workforce, England, 2012–2024"
              subtitle="Adults seen by NHS dentist in 24-month period (%) and NHS dentists performing NHS work (thousands, scaled ÷0.5 for display). Both collapsed during COVID and have not recovered to pre-pandemic levels. Workforce loss is structural, not just pandemic-related."
              series={series1}
              annotations={annotations1}
              yLabel="Percentage / Scaled dentist count"
              source={{ name: 'NHS England', dataset: 'NHS Dental Statistics for England', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/nhs-dental-statistics', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Child tooth extractions under general anaesthetic, England, 2012–2024"
              subtitle="Thousands of children admitted to hospital for tooth extractions under general anaesthetic — the single most common reason for a child to be hospitalised in England. These extractions are overwhelmingly caused by preventable decay."
              series={series2}
              annotations={annotations2}
              yLabel="Thousands"
              source={{ name: 'NHS England', dataset: 'Hospital Episode Statistics — Admitted Patient Care', url: 'https://digital.nhs.uk/data-and-information/data-tools-and-services/data-services/hospital-episode-statistics', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Community dental vans and school brushing programmes reach 120,000+"
            value="1,800+"
            unit="primary schools running supervised tooth-brushing programmes"
            description="Community dental vans visiting underserved areas reached over 120,000 patients in 2023/24, providing check-ups and basic treatment to people unable to access a high street NHS dentist. Supervised tooth-brushing programmes, now running in over 1,800 primary schools in the most deprived areas, reduce tooth decay by up to 28% among participating children. These preventive programmes cost less than 50p per child per week and prevent hospital admissions that cost the NHS over £1,000 per extraction under general anaesthetic. The Office for Health Inequalities and Disparities (OHID) has identified supervised brushing as one of the most cost-effective public health interventions available, with clear evidence of impact in areas with the highest rates of child tooth decay."
            source="Source: NHS England — Community Dental Services Data 2024. OHID — Supervised Tooth Brushing Programme 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://digital.nhs.uk/data-and-information/publications/statistical/nhs-dental-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — NHS Dental Statistics for England</a> — access rates and workforce data. Annual. 2024.</p>
            <p><a href="https://digital.nhs.uk/data-and-information/data-tools-and-services/data-services/hospital-episode-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — Hospital Episode Statistics</a> — child tooth extractions under general anaesthetic. Annual. 2024.</p>
            <p><a href="https://www.bda.org" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">British Dental Association — NHS Vacancies Survey</a> — NHS dentist vacancy data. 2024.</p>
            <p><a href="https://www.healthwatch.co.uk" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Healthwatch England — Dental Access Survey</a> — unmet dental need estimates. 2024.</p>
            <p>Adult access figures are patients seen in any 24-month rolling period as a share of the adult population. NHS dentist counts are headcount of practitioners performing at least some NHS activity. Child extraction figures include all ICD-10 coded tooth extractions under general anaesthetic in admitted patient care. Financial year runs April to March.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
