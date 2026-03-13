'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Urban Cat 2 mean response time (minutes), 2019–2024 — NHS England AQI
const urbanResponseValues = [21, 22, 19, 34, 42, 37];

// Rural Cat 2 mean response time (minutes), 2019–2024
const ruralResponseValues = [36, 38, 34, 52, 60, 45];

// Rural Cat 1 target achievement (%), 2019–2024
const ruralTargetValues = [74, 71, 75, 62, 58, 63];

// South Western (worst rural trust) Cat 2 average (minutes), 2019–2024
const swasValues = [38, 40, 36, 56, 65, 48];

const series1: Series[] = [
  {
    id: 'urban',
    label: 'Urban Cat 2 mean response (mins)',
    colour: '#264653',
    data: urbanResponseValues.map((v, i) => ({ date: new Date(2019 + i, 0, 1), value: v })),
  },
  {
    id: 'rural',
    label: 'Rural Cat 2 mean response (mins)',
    colour: '#E63946',
    data: ruralResponseValues.map((v, i) => ({ date: new Date(2019 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'rural-target',
    label: 'Rural Cat 1 target achievement (%)',
    colour: '#E63946',
    data: ruralTargetValues.map((v, i) => ({ date: new Date(2019 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: COVID — reduced demand briefly improves times' },
  { date: new Date(2022, 0, 1), label: '2022: Winter crisis — rural gap widens sharply' },
];

export default function AmbulanceRuralPage() {
  return (
    <>
      <TopicNav topic="Health" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health"
          question="Does living in the countryside mean waiting longer for an ambulance?"
          finding="Rural Category 2 ambulance response times average 45 minutes — more than double the 18-minute target and more than double the urban average of 37 minutes. The gap widens dramatically in winter. Rural patients experiencing a stroke or heart attack face materially worse outcomes than those in cities."
          colour="#E63946"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Living in a rural area means waiting far longer for an ambulance. The Category 2 target — for emergencies including suspected stroke and heart attack — is an 18-minute mean response time. In rural areas of England, the actual 2024 mean is 45 minutes. The South Western Ambulance Service, covering Devon, Cornwall, and rural Somerset, averages 48 minutes for rural Category 2 calls. A heart attack patient waiting 48 minutes has a dramatically worse prognosis than one reached in 18: for every minute of delay, roughly 2 million additional heart muscle cells die. The rural-urban gap is not a minor statistical artifact — it is a structural inequality in the likelihood of surviving a medical emergency based on where you live.</p>
            <p>The drivers are structural: sparsely distributed ambulance stations, long road distances, and a disproportionate impact from hospital handover delays at small rural hospitals with limited surge capacity. When the nearest ambulance is tied up in a handover queue at a rural district general hospital, the next-nearest resource may be 30 or 40 miles away. Community First Responder schemes — trained volunteers who can reach cardiac arrest patients before an ambulance — provide valuable early intervention but cannot replace professional paramedic response. Air ambulances cover critical cases in the most remote locations but operate in very limited numbers and are weather-dependent. The 90th-percentile rural Cat 1 response time — the benchmark for the worst-served patients — routinely exceeds 25 minutes, against a target of 15 minutes.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Urban vs rural' },
          { id: 'sec-chart2', label: 'Target achievement' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Rural Cat 2 mean response time"
              value="45 min"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="Target: 18 minutes · urban average: 37 min · gap: 8 minutes"
              sparklineData={ruralResponseValues}
              source="NHS England — Ambulance Quality Indicators 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Rural Cat 1 target achievement"
              value="63%"
              unit="2024"
              direction="down"
              polarity="up-is-good"
              changeText="Target: 90% within 7 mins · down from 74% in 2019"
              sparklineData={ruralTargetValues}
              source="NHS England — Ambulance Quality Indicators 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Worst rural trust Cat 2 average"
              value="48 min"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="South Western Ambulance Service · Devon & Cornwall · peaked at 65 min in 2022"
              sparklineData={swasValues}
              source="NHS England — Ambulance Quality Indicators, trust level 2024"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Category 2 ambulance response time: urban vs rural, England, 2019–2024"
              subtitle="Mean response time in minutes for Category 2 (serious emergency) calls. Urban (blue) vs rural (red). 18-minute national target missed in both settings, but rural patients wait far longer."
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
              title="Rural Category 1 target achievement, England, 2019–2024"
              subtitle="Percentage of Category 1 (life-threatening) calls in rural areas reached within 7 minutes. National target: 90%. Rural achievement peaked at 74% in 2019 and has not recovered."
              series={series2}
              annotations={[{ date: new Date(2022, 0, 1), label: '2022: Winter crisis peak — rural performance collapses' }]}
              yLabel="% within 7 minutes"
              source={{ name: 'NHS England', dataset: 'Ambulance Quality Indicators — area type breakdown', url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/ambulance-quality-indicators/', frequency: 'monthly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Community First Responders fill some of the rural gap"
            value="10,000+"
            unit="Community First Responders trained across England"
            description="Community First Responder schemes have trained over 10,000 volunteers to respond to cardiac arrests and life-threatening emergencies in rural areas before an ambulance arrives. Early defibrillation by CFRs increases cardiac arrest survival rates by up to 40%. Air ambulances provide critical cover for the most remote cases. The Ambulance Response Programme introduced risk-based dispatch in 2017, improving Cat 1 cardiac arrest outcomes even where Cat 2 response times remain long. NHS England has committed to expanding CFR training and placing defibrillators in rural public spaces as part of the long-term workforce plan."
            source="Source: NHS England — Ambulance Quality Indicators 2024. Association of Ambulance Chief Executives — CFR programme data 2024."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.england.nhs.uk/statistics/statistical-work-areas/ambulance-quality-indicators/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — Ambulance Quality Indicators</a> — monthly publication. Urban/rural breakdown is published as part of the supplementary data tables.</p>
            <p>Rural/urban classification uses the ONS Rural-Urban Classification. Category 2 response times are mean times from call to arrival of first responding resource. Rural Cat 1 target achievement is the percentage of calls reached within 7 minutes. The 90th-percentile target for Cat 1 is 15 minutes. Trust-level data is published separately and is used for the South Western Ambulance Service comparison.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
