'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Cataract waiting list (thousands) and median wait (weeks), 2016–2025
const waitingListData = [110, 118, 122, 128, 134, 95, 330, 480, 580, 650];
const medianWaitData = [8, 8, 9, 9, 9, 8, 28, 36, 39, 41];

// Annual cataract operations (thousands) and high-volume hub operations (thousands), 2016–2025
const operationsData = [410, 420, 430, 438, 443, 198, 320, 390, 420, 438];
const hubOperationsData = [0, 0, 0, 0, 0, 0, 0, 20, 60, 110];

const waitingSeries: Series[] = [
  {
    id: 'waitingList',
    label: 'Patients on waiting list (thousands)',
    colour: '#E63946',
    data: waitingListData.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
  },
  {
    id: 'medianWait',
    label: 'Median wait (weeks)',
    colour: '#F4A261',
    data: medianWaitData.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
  },
];

const throughputSeries: Series[] = [
  {
    id: 'operations',
    label: 'Total cataract operations (thousands/year)',
    colour: '#2A9D8F',
    data: operationsData.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
  },
  {
    id: 'hubOperations',
    label: 'High-volume hub operations (thousands/year)',
    colour: '#264653',
    data: hubOperationsData.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
  },
];

const waitingAnnotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: COVID suspends elective surgery' },
  { date: new Date(2022, 0, 1), label: '2022: Elective recovery programme launched' },
];

const throughputAnnotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: Operations drop to 198k (55% of normal)' },
  { date: new Date(2023, 0, 1), label: '2023: High-volume surgical hubs open at scale' },
];

export default function CataractWaitsPage() {
  return (
    <>
      <TopicNav topic="Cataract Waits" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health"
          question="Why Are 650,000 People Waiting for Cataract Surgery?"
          finding="The cataract waiting list has grown from 122,000 in 2019 to 650,000 in 2025 — a fivefold increase. The median wait is now 41 weeks, compared to 9 weeks before the pandemic. Cataract surgery takes 30 minutes, has a 99% success rate, and is the NHS's most common planned operation. The backlog is not a clinical problem — it is a capacity and throughput problem."
          colour="#E63946"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Cataract surgery is the highest-volume planned operation in the NHS. Before the pandemic, around 443,000 procedures were performed per year in England, with a median wait of roughly 9 weeks from referral to treatment. The operation takes less than 30 minutes, is performed under local anaesthetic, and has a success rate above 99%. When COVID-19 suspended elective surgery in March 2020, cataract operations dropped to around 198,000 for the year — fewer than half the usual volume. Demand, however, did not pause. Cataracts are age-related and progressive: an ageing population means referral volumes were already climbing before the pandemic, and the backlog that accumulated in 2020 has never been fully cleared.</p>
            <p>By 2025, 650,000 people are waiting — a fivefold increase on 2019 — with a median wait of 41 weeks, more than double the NHS 18-week constitutional standard. The consequences are not trivial: patients waiting more than six months face measurable deterioration in visual acuity, increased falls risk (hip fractures among elderly patients with untreated cataracts cost the NHS far more than the surgery itself), loss of driving licences, social isolation, and depression. The elective recovery programme launched in 2022 has pushed surgical volumes back to around 438,000 per year — broadly back to pre-pandemic throughput — but this is barely enough to stabilise the backlog, let alone reduce it. High-volume surgical hubs — dedicated cataract centres capable of 30 or more operations per day — offer the most promising route to clearance, with 12 operational and 8 more planned by 2026.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Waiting List' },
          { id: 'sec-chart2', label: 'Throughput' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Patients on cataract waiting list"
              value="650,000"
              unit="2025"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 122,000 in 2019 · fivefold increase · most common elective op"
              sparklineData={[110, 118, 122, 128, 134, 95, 330, 480, 580, 650]}
              source="NHS England · Referral to Treatment 2025"
              href="#sec-chart1"
            />
            <MetricCard
              label="Median cataract wait"
              value="41 weeks"
              unit="2025"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 9 weeks in 2019 · 18-week standard badly breached"
              sparklineData={[8, 8, 9, 9, 9, 8, 28, 36, 39, 41]}
              source="NHS England · Referral to Treatment 2025"
              href="#sec-chart1"
            />
            <MetricCard
              label="Cataract operations per year"
              value="438,000"
              unit="2025"
              direction="up"
              polarity="up-is-good"
              changeText="Back to pre-pandemic level but insufficient to clear backlog"
              sparklineData={[410, 420, 430, 438, 443, 198, 320, 390, 420, 438]}
              source="NHS England · Hospital Episode Statistics 2025"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Cataract surgery waiting list and median wait, England, 2016–2025"
              subtitle="Patients waiting for cataract extraction (thousands, red) and median wait in weeks (amber). Both multiplied roughly fivefold after COVID-19 suspended elective surgery in 2020."
              series={waitingSeries}
              annotations={waitingAnnotations}
              yLabel="Patients (000s) / Weeks"
              targetLine={{ value: 18, label: '18-week standard' }}
              source={{ name: 'NHS England', dataset: 'Referral to Treatment Waiting Times', url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/referral-to-treatment-waiting-times/', frequency: 'monthly', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Cataract operations performed: total and high-volume hubs, England, 2016–2025"
              subtitle="Total annual cataract operations (thousands, green) and operations through high-volume surgical hubs (dark). Hub model scaled rapidly from 2023 to boost throughput without proportionate increase in theatre costs."
              series={throughputSeries}
              annotations={throughputAnnotations}
              yLabel="Operations (thousands)"
              source={{ name: 'NHS England / GIRFT', dataset: 'Hospital Episode Statistics / Ophthalmology National Report', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/hospital-admitted-patient-care-activity', frequency: 'annual', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="High-volume surgical hubs: 30 operations a day per theatre"
            value="30+"
            unit="cataract operations per hub per day"
            description="Dedicated high-volume cataract surgical hubs, piloted from 2022, have demonstrated that a single facility can perform 30 or more cataract operations per day with outcomes matching or exceeding conventional theatre lists. The hub model — inspired by Moorfields Eye Hospital — streamlines patient flow, uses standardised procedure lists, and deploys staff at maximum efficiency. NHS England is scaling this nationally, with 12 hubs operational in 2024 and 8 more planned by 2026. If fully deployed, these hubs could add 150,000 additional procedures per year — enough to begin reducing the backlog for the first time since 2019."
            source="Source: NHS England — Elective Recovery Programme 2024. GIRFT — Ophthalmology National Report 2023."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.england.nhs.uk/statistics/statistical-work-areas/referral-to-treatment-waiting-times/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — Referral to Treatment Waiting Times</a> — waiting list size and median wait duration. Monthly publication. Retrieved March 2026.</p>
            <p><a href="https://digital.nhs.uk/data-and-information/publications/statistical/hospital-admitted-patient-care-activity" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS Digital — Hospital Episode Statistics</a> — cataract surgery volumes by year and provider. Annual publication. Retrieved March 2026.</p>
            <p><a href="https://gettingitrightfirsttime.co.uk/surgical_specialties/ophthalmology/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">GIRFT — Ophthalmology National Report</a> — hub performance data and surgical pathway benchmarks. Retrieved March 2026.</p>
            <p className="mt-2">Cataract surgery defined as OPCS-4 code C71 (extracapsular extraction of lens). Waiting list covers incomplete RTT pathways where treatment function is ophthalmology and procedure is cataract extraction. Hub operation data from GIRFT and NHS England elective recovery programme reports.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
