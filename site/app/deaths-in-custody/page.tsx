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

// Prison deaths (total and self-inflicted), 2010–2024
const prisonDeathValues = [198, 211, 224, 232, 248, 257, 305, 354, 324, 295, 312, 290, 278, 310, 321];
const selfInflictedValues = [58, 57, 61, 69, 80, 89, 107, 119, 89, 86, 80, 78, 70, 81, 84];

// Deaths following police contact, 2010–2024
const policeContactValues = [40, 42, 45, 46, 50, 51, 54, 55, 56, 57, 59, 52, 58, 62, 65];

const series1: Series[] = [
  {
    id: 'prison-deaths',
    label: 'Total deaths in prison custody',
    colour: '#6B7280',
    data: prisonDeathValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
  {
    id: 'self-inflicted',
    label: 'Self-inflicted deaths',
    colour: '#E63946',
    data: selfInflictedValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'police-contact',
    label: 'Deaths following police contact',
    colour: '#6B7280',
    data: policeContactValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const annotations1: Annotation[] = [
  { date: new Date(2016, 0, 1), label: '2016: record 354 deaths' },
  { date: new Date(2020, 0, 1), label: '2020: COVID regime restrictions' },
];

const annotations2: Annotation[] = [
  { date: new Date(2017, 0, 1), label: '2017: IOPC methodology revised' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'Ministry of Justice', dataset: 'Safety in Custody quarterly statistics', url: 'https://www.gov.uk/government/collections/safety-in-custody-statistics', date: '2024' },
  { num: 2, name: 'IOPC', dataset: 'Deaths during or following police contact', url: 'https://www.policeconduct.gov.uk/research-and-learning/statistics/annual-deaths-during-or-following-police-contact-statistics', date: '2024' },
  { num: 3, name: 'Prisons and Probation Ombudsman', dataset: 'Annual Report', url: 'https://www.ppo.gov.uk/research/annual-reports/', date: '2024' },
];

export default function DeathsInCustodyPage() {
  return (
    <>
      <TopicNav topic="Deaths in Custody" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Deaths in Custody"
          question="How Many People Die in State Custody?"
          finding="321 people died in prison custody in England and Wales in 2024 — near the record high of 354 in 2016. Self-harm incidents have risen 156% since 2010 to 69,012 — roughly 190 acts every day. Deaths following police contact reached 65. Behind every number is a person who died while the state was responsible for their safety."
          colour="#6B7280"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>When someone is held in custody — whether in a prison cell or a police station — the state has an absolute duty to keep them alive. That duty is being failed at scale. In 2024, 321 people died in prison custody in England and Wales, the second-highest annual total ever recorded, just below the 354 who died in 2016.<Cite nums={1} /> Self-inflicted deaths accounted for 84 of those, though the true toll of despair is better measured by the self-harm figures: 69,012 recorded incidents in 2024, a 156% increase from 2010.<Cite nums={1} /> That means roughly 190 acts of self-harm every single day across the prison estate. Deaths following police contact — recorded by the Independent Office for Police Conduct — reached 65, continuing a steady upward trend from 40 in 2010.<Cite nums={2} /></p>
            <p>The drivers are structural and well documented. Prison overcrowding has pushed the population past 87,000, against a certified capacity designed for far fewer.<Cite nums={1} /> Staff shortages mean fewer experienced officers are available to recognise vulnerability, intervene during mental health crises, or maintain the basic human contact that prevents isolation from becoming lethal. The Prisons and Probation Ombudsman has repeatedly found the same failures in fatal incident investigations: missed ACCT reviews, inadequate mental health screening on reception, and cell-sharing risk assessments that exist on paper but not in practice.<Cite nums={3} /> The introduction of psychoactive substances, particularly synthetic cannabinoids, has created acute medical emergencies that prison healthcare is not resourced to manage.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Prison Deaths' },
          { id: 'sec-chart2', label: 'Police Contact' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Deaths in prison custody"
              value="321"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="+3% year-on-year · up 62% since 2010 · near-record"
              sparklineData={[295, 312, 290, 278, 310, 321]}
              source="MoJ — Safety in Custody Statistics 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Deaths following police contact"
              value="65"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 40 in 2010 · +63% over period"
              sparklineData={[51, 54, 55, 56, 57, 59, 52, 58, 62, 65]}
              source="IOPC — Annual Deaths Statistics 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Self-harm incidents in prison"
              value="69,012"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="+156% since 2010 · ~190 incidents per day"
              sparklineData={[35000, 40000, 45000, 52000, 57000, 62000, 55000, 58000, 65000, 69012]}
              source="MoJ — Safety in Custody Statistics 2024"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Deaths in prison custody, England and Wales, 2010–2024"
              subtitle="Total deaths and self-inflicted deaths. Includes natural causes, self-inflicted, and homicide. 2016 was the record year; 2024 is the second highest. Overcrowding and staff shortages are consistent factors in Ombudsman investigations."
              series={series1}
              annotations={annotations1}
              yLabel="Deaths"
              source={{ name: 'Ministry of Justice', dataset: 'Safety in Custody quarterly statistics', url: 'https://www.gov.uk/government/collections/safety-in-custody-statistics', frequency: 'quarterly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Deaths following police contact, England and Wales, 2010–2024"
              subtitle="Includes deaths in or following police custody, pursuit-related deaths, and other contact deaths recorded by the IOPC. 2017 methodology revision makes pre/post figures not directly comparable."
              series={series2}
              annotations={annotations2}
              yLabel="Deaths"
              source={{ name: 'IOPC', dataset: 'Deaths during or following police contact', url: 'https://www.policeconduct.gov.uk/research-and-learning/statistics/annual-deaths-during-or-following-police-contact-statistics', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Peer support and trauma-informed approaches reduce self-harm"
            value="Listener scheme"
            unit="operating in the majority of prisons"
            description="The Samaritans' Listener scheme trains serving prisoners to provide confidential emotional support to fellow inmates. Operating in the majority of prisons across England and Wales, the scheme provides a critical safety net during nights and weekends when professional support is unavailable. Prisons that have implemented trauma-informed approaches — addressing the underlying causes of distress rather than simply managing behaviour — have seen measurable reductions in self-harm. The introduction of in-cell telephony has reduced isolation, a key driver of self-harm. These interventions demonstrate that deaths in custody are not inevitable — they are outcomes of conditions that can be changed."
            source="Source: Samaritans — Listener scheme evaluation 2024. PPO — Annual Report 2023/24. MoJ — Safety in Custody Statistics."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/safety-in-custody-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Ministry of Justice — Safety in Custody quarterly statistics</a> — prison deaths, self-inflicted deaths, and self-harm incidents. Quarterly. 2024.</p>
            <p><a href="https://www.ppo.gov.uk/research/annual-reports/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Prisons and Probation Ombudsman — Annual Report</a> — fatal incident investigations and thematic reviews. Annual. 2024.</p>
            <p><a href="https://www.policeconduct.gov.uk/research-and-learning/statistics/annual-deaths-during-or-following-police-contact-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">IOPC — Deaths during or following police contact</a> — deaths in police custody and following other police contact. Annual. 2024.</p>
            <p>All figures are for England and Wales unless otherwise stated. Self-harm figures count individual incidents, not individuals — one person may account for multiple episodes. Classification of cause of death may be revised following coroner inquest. IOPC methodology was revised in 2016/17; pre-2016 figures are not directly comparable.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
