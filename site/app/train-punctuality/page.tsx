'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Office of Rail and Road', dataset: 'National Rail Trends — Punctuality data', url: 'https://dataportal.orr.gov.uk/statistics/performance/train-punctuality/', date: '2024' },
  { num: 2, name: 'Transport Focus', dataset: 'National Rail Passenger Survey', url: 'https://www.transportfocus.org.uk/research-publications/publications/national-rail-passenger-survey/', date: '2024' },
  { num: 3, name: 'UK Parliament', dataset: 'Passenger Railway Services (Public Ownership) Act 2024', url: 'https://www.legislation.gov.uk/ukpga/2024/30', date: '2024' },
];

export default function TrainPunctualityPage() {
  // Train punctuality (% on time) 2015–2024
  const onTimeRaw = [89.0, 88.5, 87.2, 79.8, 79.4, 72.3, 65.9, 68.1, 65.5, 62.0];
  // Train cancellation rate 2015–2024 (%)
  const cancellationRaw = [1.4, 1.5, 1.6, 1.7, 1.8, 2.1, 3.4, 3.1, 3.7, 3.9];
  // Passenger satisfaction (%) 2015–2024
  const satisfactionRaw = [80, 80, 81, 79, 80, 76, 67, 70, 68, 66];

  const onTimeSeries: Series[] = [
    {
      id: 'on-time',
      label: 'On-time arrival rate (%)',
      colour: '#F4A261',
      data: onTimeRaw.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const cancellationSeries: Series[] = [
    {
      id: 'cancellations',
      label: 'Cancellation rate (%)',
      colour: '#E63946',
      data: cancellationRaw.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'satisfaction',
      label: 'Passenger satisfaction (%)',
      colour: '#6B7280',
      data: satisfactionRaw.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const punctualityAnnotations: Annotation[] = [
    { date: new Date(2018, 0, 1), label: '2018: May timetable collapse' },
    { date: new Date(2022, 0, 1), label: '2022: Strike action begins' },
    { date: new Date(2024, 0, 1), label: '2024: Public ownership legislation' },
  ];

  const cancellationAnnotations: Annotation[] = [
    { date: new Date(2022, 0, 1), label: '2022: Rail strikes — record cancellations' },
  ];

  return (
    <>
      <TopicNav topic="Train Punctuality" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Train Punctuality"
          question="Are Britain's Trains Getting Worse?"
          finding={<>Only 62% of UK trains arrive on time — the worst performance in a decade — with cancellation rates at record highs and the government taking over multiple failed franchises.<Cite nums={1} /></>}
          colour="#F4A261"
          preposition="on"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Only 62% of UK trains arrived on time in 2024 by the Public Performance Measure — the worst performance in a decade, and among the worst punctuality rates in Western Europe.<Cite nums={1} /> Switzerland achieves 92–95%, Germany and France 75–85%. Cancellations reached 3.9% of all scheduled services in 2024, up from 1.8% in 2019.<Cite nums={1} /></p>
            <p>The causes are structural: a network largely built in the Victorian era, analogue signalling technology that creates cascading delay vulnerability, a £7 billion infrastructure maintenance backlog, and the fragmentation of accountability between Network Rail (infrastructure) and train operating companies (operations) that defined the privatisation model from 1994. The May 2018 timetable collapse — which stranded passengers for months — exposed how little slack existed in the system. Prolonged strike action from 2022 pushed cancellation rates to record highs.</p>
            <p>The Passenger Railway Services (Public Ownership) Act 2024 enables direct operation of franchises as they expire, aiming to reintegrate infrastructure and operations under Great British Railways.<Cite nums={3} /> Whether this translates into measurable punctuality improvement remains to be seen. In the meantime, passenger satisfaction stands at 66% — 14 points below the 2015 peak.<Cite nums={2} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-punctuality', label: 'Punctuality' },
          { id: 'sec-cancellations', label: 'Cancellations' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="On-time arrival rate (%)"
              value="62"
              direction="down"
              polarity="up-is-good"
              changeText={<>worst in a decade · down from 89% in 2015 · Europe average ~80%<Cite nums={1} /></>}
              sparklineData={[89.0, 88.5, 87.2, 79.8, 79.4, 72.3, 65.9, 68.1, 65.5, 62.0]}
              source="Office of Rail and Road — National Rail Trends 2024"
            />
            <MetricCard
              label="Cancellation rate (%)"
              value="3.9"
              direction="up"
              polarity="up-is-bad"
              changeText={<>up from 1.4% in 2015 · record highs during 2022 strikes<Cite nums={1} /></>}
              sparklineData={[1.4, 1.5, 1.6, 1.7, 1.8, 2.1, 3.4, 3.1, 3.7, 3.9]}
              source="Office of Rail and Road — National Rail Trends 2024"
            />
            <MetricCard
              label="Passenger satisfaction (%)"
              value="66"
              direction="down"
              polarity="up-is-good"
              changeText={<>down from 80% in 2015 · 14pp fall over a decade<Cite nums={2} /></>}
              sparklineData={[80, 80, 81, 79, 80, 76, 67, 70, 68, 66]}
              source="Transport Focus — National Rail Passenger Survey 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-punctuality" className="mb-12">
            <LineChart
              title="Train punctuality (% on time), UK, 2015–2024"
              subtitle="Percentage of trains arriving within 5 minutes of scheduled time (Public Performance Measure). Worst performance in a decade."
              series={onTimeSeries}
              annotations={punctualityAnnotations}
              yLabel="% on time"
              source={{
                name: 'Office of Rail and Road',
                dataset: 'National Rail Trends — Punctuality data',
                frequency: 'quarterly',
                url: 'https://dataportal.orr.gov.uk/statistics/performance/train-punctuality/',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-cancellations" className="mb-12">
            <LineChart
              title="Train cancellation rate and passenger satisfaction, UK, 2015–2024"
              subtitle="Cancellation rate (% of planned services that did not run) and overall passenger satisfaction (%). Both trending in the wrong direction."
              series={cancellationSeries}
              annotations={cancellationAnnotations}
              yLabel="% rate"
              source={{
                name: 'Office of Rail and Road / Transport Focus',
                dataset: 'National Rail Trends and National Rail Passenger Survey',
                frequency: 'annual',
                url: 'https://dataportal.orr.gov.uk/statistics/performance/train-punctuality/',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://dataportal.orr.gov.uk/statistics/performance/train-punctuality/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Office of Rail and Road — National Rail Trends</a>. Quarterly punctuality and cancellation data. Retrieved 2024.</p>
            <p><a href="https://www.transportfocus.org.uk/research-publications/publications/national-rail-passenger-survey/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Transport Focus — National Rail Passenger Survey</a>. Biannual satisfaction survey. Retrieved 2024.</p>
            <p>On-time arrival measured by Public Performance Measure (PPM): within 5 minutes for regional and commuter services, within 10 minutes for long-distance services. Cancellation rate is percentage of planned services that did not operate. Annual figures are averages of quarterly reporting periods.</p>
          </div>
        </section>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <RelatedTopics />
      </main>
    </>
  );
}
