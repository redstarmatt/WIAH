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

// Firefighter numbers (thousands), 2010–2024 — NFCC / Home Office
const firefighterValues = [48.0, 47.5, 46.5, 45.5, 44.5, 43.8, 43.0, 42.5, 42.0, 41.8, 42.0, 41.5, 41.0, 40.8, 41.0];

// Dwelling fires (thousands), 2010–2024 — Home Office
const dwellingFireValues = [50, 48, 46, 44, 42, 41, 40, 39, 38, 37, 38, 36, 35, 34, 34];

// Average response time (minutes), 2010–2024 — Home Office
const responseTimeValues = [7.2, 7.3, 7.5, 7.6, 7.8, 7.9, 8.1, 8.2, 8.3, 8.4, 8.3, 8.5, 8.6, 8.7, 8.8];

const firefighterSeries: Series[] = [
  {
    id: 'firefighters',
    label: 'Firefighters (thousands)',
    colour: '#E63946',
    data: firefighterValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const fireOutcomesSeries: Series[] = [
  {
    id: 'dwelling-fires',
    label: 'Dwelling fires (thousands)',
    colour: '#F4A261',
    data: dwellingFireValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const responseSeries: Series[] = [
  {
    id: 'response-time',
    label: 'Average response time (minutes)',
    colour: '#264653',
    data: responseTimeValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const firefighterAnnotations: Annotation[] = [
  { date: new Date(2010, 0, 1), label: '2010: Austerity cuts begin' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'Home Office / NFCC', dataset: 'Fire statistics and workforce data', url: 'https://www.gov.uk/government/collections/fire-statistics', date: '2024' },
  { num: 2, name: 'Home Office', dataset: 'Fire statistics: response times', url: 'https://www.gov.uk/government/statistics/fire-statistics-monitor', date: '2024' },
  { num: 3, name: 'HMICFRS', dataset: 'Fire and rescue service inspections', date: '2024' },
];

export default function FireServicePage() {
  return (
    <>
      <TopicNav topic="Fire Service" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Fire Service"
          question="Is the Fire Service Actually Being Cut?"
          finding="Firefighter numbers have fallen from 48,000 in 2010 to 41,000 in 2024 — a 15% cut. Average response times have risen from 7.2 to 8.8 minutes. Dwelling fires have fallen due to safer appliances and smoke alarms, but budget pressures are reducing resilience."
          colour="#E63946"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The fire and rescue service in England has experienced significant reductions in staffing and funding since 2010 as part of austerity-era local government cuts. Firefighter numbers fell from approximately 48,000 in 2010 to around 41,000 in 2024 — a reduction of 15%.<Cite nums={[1]} /> Over the same period, fire stations have been closed and appliances decommissioned, contributing to a rise in average response times from 7.2 minutes in 2010 to 8.8 minutes in 2024.<Cite nums={[2]} /> Every additional minute of response time in a dwelling fire substantially increases the risk of the fire becoming uncontrolled and the probability of fire-related deaths.</p>
            <p>The paradox is that headline fire statistics have improved: dwelling fires fell from 50,000 in 2010 to around 34,000 in 2024, driven largely by the spread of smoke alarms, changes in household products (reduced flammability requirements), and changes in cooking patterns.<Cite nums={[1]} /> This has allowed fire service leaders and politicians to argue that capacity reductions are sustainable. But the fire service's core role has diversified significantly beyond fighting fires — road traffic collisions, flooding response, building decontamination, and mutual aid in civil emergencies now constitute a major and growing part of demand. His Majesty's Inspectorate of Constabulary and Fire and Rescue Services (HMICFRS) has repeatedly found fire services to be 'inadequate' or 'requiring improvement' in areas including culture, diversity, and response capability.<Cite nums={[3]} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Firefighter numbers' },
          { id: 'sec-chart2', label: 'Response times' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Firefighters in post"
              value="41,000"
              unit=""
              direction="down"
              polarity="down-is-bad"
              changeText="Down from 48,000 in 2010 · 15% reduction since austerity"
              sparklineData={[48.0, 47.5, 46.5, 45.5, 44.5, 43.8, 43.0, 42.5, 42.0, 41.0]}
              source="NFCC / Home Office · Fire and rescue workforce data 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Average response time"
              value="8.8 min"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 7.2 min in 2010 · station closures extending times"
              sparklineData={[7.2, 7.3, 7.5, 7.8, 7.9, 8.1, 8.2, 8.4, 8.6, 8.8]}
              source="Home Office · Fire statistics: response times 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Dwelling fires per year"
              value="34,000"
              unit=""
              direction="down"
              polarity="down-is-bad"
              changeText="Down from 50,000 in 2010 · smoke alarms and safer products"
              sparklineData={[50, 48, 46, 44, 42, 41, 40, 38, 36, 34]}
              source="Home Office · Fire statistics 2024"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Firefighter numbers and dwelling fires, England, 2010–2024"
              subtitle="Total firefighters (thousands) and annual dwelling fires (thousands). Firefighters have fallen 15%; dwelling fires have fallen due to prevention measures."
              series={[
                { id: 'firefighters', label: 'Firefighters (thousands)', colour: '#E63946', data: firefighterValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })) },
                { id: 'dwelling-fires', label: 'Dwelling fires (thousands)', colour: '#F4A261', data: dwellingFireValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })) },
              ]}
              annotations={firefighterAnnotations}
              yLabel="Value (thousands)"
              source={{ name: 'Home Office / NFCC', dataset: 'Fire statistics and workforce data', url: 'https://www.gov.uk/government/collections/fire-statistics', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Average fire service response time, England, 2010–2024"
              subtitle="Average time from call receipt to first appliance attendance at a dwelling fire. Rising as station closures extend coverage distances."
              series={responseSeries}
              annotations={[]}
              yLabel="Response time (minutes)"
              source={{ name: 'Home Office', dataset: 'Fire statistics: response times', url: 'https://www.gov.uk/government/statistics/fire-statistics-monitor', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Smoke alarms in 87% of UK homes — saving 35 lives per year"
            value="87%"
            description="Smoke alarm ownership rose from around 8% of UK homes in the late 1980s to 87% in 2023, driven by free distribution programmes, building regulations for new homes, and public awareness campaigns. The National Fire Chiefs Council estimates that smoke alarms save approximately 35 lives per year in England alone by providing early warning. The roll-out of interconnected, battery-operated alarms — which sound throughout a dwelling rather than only in the room where fitted — has been prioritised for high-risk groups including elderly people and those in social housing. Prevention activity by fire services has a strong evidence base and significantly higher cost-effectiveness than response capacity."
            source="Source: Home Office — Fire statistics: dwelling fires 2024. NFCC — Prevention activity data 2023."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/fire-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Home Office — Fire statistics</a> — annual statistics on fire incidents, fire-related fatalities, response times, and workforce.</p>
            <p><a href="https://www.nationalfirechiefs.org.uk/News/category/1057" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NFCC — National Fire Chiefs Council</a> — workforce, prevention, and protection statistics for England's 44 fire and rescue services.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
