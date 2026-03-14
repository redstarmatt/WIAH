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

// Hours lost to handover delays (millions), 2018–2024 — NHS England AQI
const hoursLostValues = [0.42, 0.51, 0.63, 1.12, 1.82, 1.58, 1.64];

// Handovers taking 30+ and 60+ minutes (%), 2018–2024
const over30minValues = [8.4, 10.2, 13.5, 24.6, 36.8, 30.2, 31.5];
const over60minValues = [2.1, 3.4, 5.8, 11.2, 18.4, 14.7, 15.2];

// Cat 2 mean response time (minutes), 2018–2024
const cat2ResponseValues = [22, 24, 28, 39, 52, 41, 40.7];

const series1: Series[] = [
  {
    id: 'hours-lost',
    label: 'Handover delay hours lost (millions)',
    colour: '#E63946',
    data: hoursLostValues.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'over-30min',
    label: 'Handovers taking 30+ minutes (%)',
    colour: '#F4A261',
    data: over30minValues.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
  },
  {
    id: 'over-60min',
    label: 'Handovers taking 60+ minutes (%)',
    colour: '#E63946',
    data: over60minValues.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2021, 0, 1), label: '2021: COVID recovery — A&E pressure builds' },
  { date: new Date(2023, 0, 1), label: '2023: NHS ambulance recovery plan launched' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'NHS England', dataset: 'Ambulance Quality Indicators', url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/ambulance-quality-indicators/', date: '2024' },
  { num: 2, name: 'Association of Ambulance Chief Executives', dataset: 'Handover delay mortality estimates', date: '2023' },
  { num: 3, name: 'NHS England', dataset: 'Urgent and Emergency Care Recovery Plan', date: '2023' },
];

export default function AmbulanceHandoversPage() {
  return (
    <>
      <TopicNav topic="Ambulance Handovers" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Ambulance Handovers"
          question="Why are paramedics waiting hours outside hospitals?"
          finding="In 2022/23, ambulances lost 1.82 million hours to handover delays — more than quadruple the 2018 level. Every minute a crew spends queuing outside a hospital is a minute they cannot respond to new 999 calls. Category 2 response times peaked at 52 minutes in 2022, against an 18-minute target."
          colour="#E63946"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>When an ambulance arrives at a hospital emergency department, the crew should hand over their patient within 15 minutes and return to the road. This standard exists because every minute an ambulance spends queuing outside a hospital is a minute it cannot respond to the next 999 call. In 2022/23, this handover process consumed 1.82 million hours across England — more than quadruple the 420,000 hours lost in 2017/18.<Cite nums={1} /> The practical consequence is stark: ambulances that should be reaching heart attack and stroke patients within minutes are instead parked in hospital corridors. The Association of Ambulance Chief Executives estimates that handover delays directly contribute to between 300 and 500 avoidable deaths per year.<Cite nums={2} /> Category 2 calls — which include strokes, chest pain, and severe breathing difficulties — saw average response times reach 52 minutes in 2022/23, against a target of 18 minutes.<Cite nums={1} /></p>
            <p>The root cause lies not with ambulance services but with hospital capacity. When emergency departments are full — because admitted patients cannot be moved to wards, and ward patients cannot be discharged because social care placements are unavailable — the entire system backs up to the hospital front door. Ambulance crews cannot hand over because there are no cubicles, trolleys, or staff available to accept their patients. During the winter of 2022/23, some hospitals reported queues of 20 or more ambulances at peak times. NHS England's ambulance recovery plan, launched in January 2023, combined hospital discharge acceleration and cohorting areas at hospital front doors.<Cite nums={3} /> By late 2023, handover delays had fallen significantly from their peak — but remain far above pre-pandemic levels, and the underlying capacity constraints have not been resolved.<Cite nums={1} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Hours lost' },
          { id: 'sec-chart2', label: 'Delay rates' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Hours lost to handover delays"
              value="1.82M"
              unit="2022/23 peak"
              direction="up"
              polarity="up-is-bad"
              changeText="+333% since 2018 · equivalent to 75,000 ambulance shifts"
              sparklineData={hoursLostValues}
              source="NHS England — Ambulance Quality Indicators 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Handovers taking 60+ minutes"
              value="18.4%"
              unit="2022/23 peak"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 2.1% in 2018 · standard is 15 minutes"
              sparklineData={over60minValues}
              source="NHS England — Ambulance Quality Indicators 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Cat 2 mean response time"
              value="52 min"
              unit="2022/23 peak"
              direction="up"
              polarity="up-is-bad"
              changeText="Target: 18 minutes · improved to 40.7 min by 2024"
              sparklineData={cat2ResponseValues}
              source="NHS England — Ambulance Quality Indicators 2024"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Hours lost to ambulance handover delays, England, 2018–2024"
              subtitle="Estimated hours ambulance crews spent waiting outside hospitals to hand over patients. Surged during COVID recovery, partially reduced by 2023 recovery plan."
              series={series1}
              annotations={annotations}
              yLabel="Hours (millions)"
              source={{ name: 'NHS England', dataset: 'Ambulance Quality Indicators', url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/ambulance-quality-indicators/', frequency: 'monthly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Ambulance handover delays by duration, England, 2018–2024"
              subtitle="Percentage of hospital handovers exceeding 30 minutes (amber) and 60 minutes (red). Both surged from 2021 as A&E pressure built, with partial improvement from 2023."
              series={series2}
              annotations={[{ date: new Date(2023, 0, 1), label: '2023: NHS recovery plan — discharge acceleration' }]}
              yLabel="Handovers (%)"
              source={{ name: 'NHS England', dataset: 'Ambulance Quality Indicators', url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/ambulance-quality-indicators/', frequency: 'monthly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="NHS ambulance recovery plan drives improvement"
            value="20%"
            unit="reduction in handover delays after recovery plan launch"
            description="NHS England's ambulance recovery plan, launched in January 2023, combined hospital discharge acceleration, cohorting areas at hospital front doors to free up A&E capacity, and additional call-handling support. By late 2023, several regions reported handover delays falling by around 20% compared to the previous winter. Category 2 response times improved from a peak of 52 minutes to around 40 minutes nationally. The improvement demonstrates that targeted operational interventions can have measurable effects — but experts note that the underlying constraints (social care capacity, ward occupancy, A&E staffing) have not been structurally addressed, meaning the risk of deterioration in the next winter pressure period remains significant."
            source="Source: NHS England — Urgent and Emergency Care Recovery Plan 2023 progress report. AACE — Ambulance benchmarking data 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.england.nhs.uk/statistics/statistical-work-areas/ambulance-quality-indicators/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — Ambulance Quality Indicators</a> — monthly publication covering all ambulance trusts in England. Includes response times by category and handover delay data.</p>
            <p>Handover delay hours are estimated from ambulance trust returns measuring time from arrival at hospital to clinical handover. The 15-minute standard is set by NHS England. Category 2 response time is the mean time from 999 call to arrival at scene. Data covers England only.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
