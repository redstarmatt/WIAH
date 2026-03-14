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

// Cat 1 mean response time (minutes), 2017–2024 — NHS England AQI
const cat1Values = [7.0, 7.2, 7.3, 7.8, 8.7, 8.6, 8.4, 8.2];

// Cat 2 mean response time (minutes), 2017–2024
const cat2Values = [18.0, 21.4, 22.9, 29.1, 48.3, 41.3, 38.6, 38.6];

// Trust variation — best and worst Cat 1 (minutes), 2017–2024
const bestTrustValues = [6.8, 6.9, 7.0, 7.1, 7.3, 7.2, 7.1, 7.1];
const worstTrustValues = [7.4, 8.0, 8.5, 9.2, 13.1, 12.8, 12.5, 12.3];

const series1: Series[] = [
  {
    id: 'cat1',
    label: 'Cat 1 mean response (minutes)',
    colour: '#264653',
    data: cat1Values.map((v, i) => ({ date: new Date(2017 + i, 0, 1), value: v })),
  },
  {
    id: 'cat2',
    label: 'Cat 2 mean response (minutes)',
    colour: '#E63946',
    data: cat2Values.map((v, i) => ({ date: new Date(2017 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'best-trust',
    label: 'Best-performing trust (Cat 1 min)',
    colour: '#2A9D8F',
    data: bestTrustValues.map((v, i) => ({ date: new Date(2017 + i, 0, 1), value: v })),
  },
  {
    id: 'worst-trust',
    label: 'Worst-performing trust (Cat 1 min)',
    colour: '#E63946',
    data: worstTrustValues.map((v, i) => ({ date: new Date(2017 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: COVID-19 — demand and handover delays surge' },
  { date: new Date(2023, 0, 1), label: '2023: NHS ambulance recovery plan launched' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'NHS England', dataset: 'Ambulance Quality Indicators', url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/ambulance-quality-indicators/', date: '2024' },
  { num: 2, name: 'NHS England', dataset: 'Urgent and Emergency Care Recovery Plan', url: 'https://www.england.nhs.uk/statistics/', date: '2023' },
];

export default function AmbulanceResponseTimesPage() {
  return (
    <>
      <TopicNav topic="Ambulance Response Times" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Ambulance Response Times"
          question="Are ambulances getting there in time?"
          finding="Category 2 ambulance response times peaked at 48 minutes in 2021/22 — nearly three times the 18-minute target. In 2024 the national average stands at 38.6 minutes. For stroke patients, every additional minute without treatment causes permanent brain damage. The worst-performing trust takes 12.3 minutes for Cat 1 calls against a 7-minute target."
          colour="#E63946"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England's ambulance services operate under two key targets: Category 1 calls — immediately life-threatening emergencies including cardiac arrests — should receive a response within 7 minutes on average. Category 2 calls, covering strokes and heart attacks, carry an 18-minute target. Both are being missed.<Cite nums={1} /> Category 2 response times deteriorated from 18 minutes in 2017 to 48 minutes at their worst in 2022, before partial recovery to 38.6 minutes in 2024.<Cite nums={1} /> For a stroke patient, 1.9 million neurons are lost for each minute without treatment — a 38-minute average means many patients routinely wait an hour or more. The primary structural cause is ambulance handover delays: over 1.8 million crew-hours were lost to queuing outside A&E departments in 2022/23 alone.<Cite nums={1} /></p>
            <p>Performance variation between trusts is severe. The best-performing trust achieved a Category 1 average of 7.1 minutes in 2024; the worst reached 12.3 minutes — nearly double the target.<Cite nums={1} /> Rural ambulance services are disproportionately affected: geography means a crew trapped at a distant hospital for hours can leave hundreds of square miles without emergency cover. The national average conceals a postcode lottery in emergency care that is, by definition, life-or-death. NHS England's ambulance recovery plan, launched in 2023, combined hospital discharge acceleration with additional call-handling capacity.<Cite nums={2} /> Cat 2 times have improved but remain more than twice the target, and the underlying constraints — social care capacity, A&E crowding, workforce vacancies — have not been structurally resolved.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Response times' },
          { id: 'sec-chart2', label: 'Trust variation' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Cat 1 mean response time"
              value="8.2 min"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="Target: 7 minutes · +1.2 min above target · up from 7.0 min in 2017"
              sparklineData={cat1Values}
              source="NHS England — Ambulance Quality Indicators 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Cat 2 mean response time"
              value="38.6 min"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="Target: 18 minutes · peaked at 48 min in 2022 · +20 min above target"
              sparklineData={cat2Values}
              source="NHS England — Ambulance Quality Indicators 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Trust variation (Cat 1)"
              value="1.7x"
              unit="best to worst"
              direction="up"
              polarity="up-is-bad"
              changeText="Best trust: 7.1 min · worst trust: 12.3 min · gap has widened since 2017"
              sparklineData={worstTrustValues}
              source="NHS England — Trust-level AQI 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Ambulance response times, England, 2017–2024"
              subtitle="Average Category 1 (blue) and Category 2 (red) response times in minutes. Cat 1 target: 7 min. Cat 2 target: 18 min. Both targets missed throughout."
              series={series1}
              annotations={annotations}
              yLabel="Minutes"
              source={{ name: 'NHS England', dataset: 'Ambulance Quality Indicators', url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/ambulance-quality-indicators/', frequency: 'monthly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Cat 1 response time: best vs worst trust, England, 2017–2024"
              subtitle="The gap between the best (green) and worst (red) ambulance trust Cat 1 response times has widened from 0.6 minutes in 2017 to 5.2 minutes in 2024 — a postcode lottery in emergency care."
              series={series2}
              annotations={[{ date: new Date(2020, 0, 1), label: '2020: Pandemic pressure widens trust gap' }]}
              yLabel="Minutes"
              source={{ name: 'NHS England', dataset: 'Ambulance Quality Indicators — trust level', url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/ambulance-quality-indicators/', frequency: 'monthly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Recovery plan improves Cat 2 times — but targets still missed"
            value="9 min"
            unit="improvement in Cat 2 response time since 2022 peak"
            description="NHS England's ambulance recovery plan, launched in January 2023, delivered a 9-minute improvement in average Category 2 response times from the 2022 peak of 48 minutes to 38.6 minutes by 2024. The plan combined hospital discharge acceleration, cohorting areas in A&E to reduce handover delays, and investment in additional call-handling and hear-and-treat capacity. Some trusts have seen their Cat 2 performance return close to target. However, the 18-minute national target remains more than double the current average. Experts note that sustained improvement requires structural fixes to social care, hospital capacity, and workforce that go beyond operational measures within the ambulance sector itself."
            source="Source: NHS England — Urgent and Emergency Care Recovery Plan 2023 progress report. NHS England — Ambulance Quality Indicators 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.england.nhs.uk/statistics/statistical-work-areas/ambulance-quality-indicators/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — Ambulance Quality Indicators</a> — monthly publication covering all 10 NHS ambulance trusts in England.</p>
            <p>Response time targets set under the Ambulance Response Programme (ARP) 2017. Category 1: mean 7 minutes, 90th percentile 15 minutes. Category 2: mean 18 minutes, 90th percentile 40 minutes. Annual means are derived from monthly trust-level publications. Trust variation figures reflect the best and worst annual mean Cat 1 response time across the 10 trusts in 2024.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
