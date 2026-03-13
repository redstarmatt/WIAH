'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// FMU cases, 2011–2023
const fmuCases = [1468, 1485, 1302, 1267, 1196, 1428, 1196, 1764, 1355, 971, 1080, 1416, 2068];
// Under-18s (% of cases), 2011–2023
const under18Pct = [35, 34, 33, 33, 32, 31, 30, 29, 28, 27, 26, 26, 25];
// Forced Marriage Protection Orders, 2014–2023
const fmpoOrders = [62, 74, 90, 108, 122, 140, 158, 175, 160, 203];

const fmuCaseSeries: Series[] = [
  {
    id: 'fmu-cases',
    label: 'FMU cases (annual)',
    colour: '#6B7280',
    data: fmuCases.map((v, i) => ({ date: new Date(2011 + i, 0, 1), value: v })),
  },
];

const under18Series: Series[] = [
  {
    id: 'under-18',
    label: 'Under-18s (% of cases)',
    colour: '#E63946',
    data: under18Pct.map((v, i) => ({ date: new Date(2011 + i, 0, 1), value: v })),
  },
];

const caseAnnotations: Annotation[] = [
  { date: new Date(2014, 6, 1), label: '2014: Forced marriage criminalised' },
  { date: new Date(2020, 3, 1), label: '2020: COVID lockdowns suppress reporting' },
];

const under18Annotations: Annotation[] = [
  { date: new Date(2014, 6, 1), label: '2014: Criminalised — improved safeguarding focus' },
];

export default function ForcedMarriagePage() {
  return (
    <>
      <TopicNav topic="Forced Marriage" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Forced Marriage"
          question="How Many People Are Forced Into Marriage in Britain?"
          finding="The Forced Marriage Unit handled 2,068 cases in 2023 — a record high. One in four involved children under 18. Experts believe the true figure is many times higher, as most cases go unreported."
          colour="#6B7280"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Forced marriage was criminalised in England and Wales in 2014, carrying a maximum sentence of seven years. A decade on, the Forced Marriage Unit — jointly run by the Home Office and FCDO — handled 2,068 cases in 2023, the highest number since records began. That figure rose 113% from the post-lockdown low of 971 in 2022 and surpassed the previous peak of 1,764 in 2018. The sharp dip during 2020 and 2021 does not indicate that fewer forced marriages took place: lockdowns removed victims from schools, GPs, and other professionals who might have noticed warning signs. Many in the sector believe the pandemic created a hidden backlog of cases now surfacing.</p>
            <p>Pakistan remains the most frequently reported focus country, linked to 44% of cases, followed by Bangladesh (9%), Somalia (5%), and India (4%). However, 16% of cases are now classed as entirely domestic — involving no overseas element — a proportion that has grown steadily. Victims are overwhelmingly female (around 80%), but male victims account for roughly one in five cases. The proportion of under-18s has gradually declined from 35% in 2011 to 25% in 2023, partly reflecting better safeguarding in schools. Charities such as Karma Nirvana estimate the true scale of forced marriage at 5,000–8,000 cases per year — meaning the FMU data captures perhaps only a quarter of the real picture.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-cases', label: 'FMU Cases' },
          { id: 'sec-under18', label: 'Under-18s' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="FMU cases handled (annual)"
              value="2,068"
              unit="2023"
              direction="up"
              polarity="up-is-bad"
              changeText="Record high · +113% from 2022 COVID dip · pandemic backlog"
              sparklineData={fmuCases.slice(-8)}
              source="FCDO Forced Marriage Unit 2023"
              href="#sec-cases"
            />
            <MetricCard
              label="Under-18s (% of cases)"
              value="25%"
              unit="2023"
              direction="down"
              polarity="up-is-bad"
              changeText="Down from 35% in 2011 · 11 cases involved under-16s"
              sparklineData={under18Pct.slice(-8)}
              source="FCDO Forced Marriage Unit 2023"
              href="#sec-under18"
            />
            <MetricCard
              label="Forced Marriage Protection Orders"
              value="203"
              unit="2023"
              direction="up"
              polarity="up-is-good"
              changeText="Record high · up from 62 in 2014 · civil route to protection"
              sparklineData={fmpoOrders}
              source="Ministry of Justice · Family Court Statistics 2023"
              href="#sec-cases"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-cases" className="mb-12">
            <LineChart
              title="Forced Marriage Unit cases handled, UK, 2011–2023"
              subtitle="Annual cases where the FMU provided advice or support. COVID lockdowns suppressed reporting in 2020–21. Record high in 2023."
              series={fmuCaseSeries}
              annotations={caseAnnotations}
              yLabel="Cases"
              source={{ name: 'FCDO Forced Marriage Unit', dataset: 'Forced Marriage Unit Statistics', url: 'https://www.gov.uk/government/collections/forced-marriage-unit-statistics', frequency: 'annual', date: 'Nov 2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-under18" className="mb-12">
            <LineChart
              title="Under-18s as a proportion of FMU cases, 2011–2023"
              subtitle="Gradual decline from 35% to 25%, reflecting improved school safeguarding, statutory guidance, and better awareness among professionals who work with young people."
              series={under18Series}
              annotations={under18Annotations}
              yLabel="% of cases"
              source={{ name: 'FCDO Forced Marriage Unit', dataset: 'Forced Marriage Unit Statistics — age breakdown', url: 'https://www.gov.uk/government/collections/forced-marriage-unit-statistics', frequency: 'annual', date: 'Nov 2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Protection orders reaching record levels"
            value="203"
            unit="FMPOs in 2023"
            description="Forced Marriage Protection Orders — introduced in 2008 and strengthened in 2014 when breach became a criminal offence — provide victims with a civil route to safety without requiring them to support a criminal prosecution against their own family. The record 203 orders granted in 2023 represent a threefold increase since the legal framework was introduced. Growing awareness of FMPOs among schools, social workers, and GPs is driving the increase. The Karma Nirvana helpline received over 10,000 calls in 2023. While the true scale of forced marriage remains far larger than any official figure captures, the rising use of legal protections suggests more victims are finding pathways to help."
            source="Source: Ministry of Justice — Family Court Statistics Quarterly, 2023. Karma Nirvana annual report, 2023."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/forced-marriage-unit-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">FCDO Forced Marriage Unit Statistics</a> — Primary data source for FMU cases and demographic breakdowns. Retrieved November 2024.</p>
            <p><a href="https://www.gov.uk/government/collections/family-court-statistics-quarterly" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Ministry of Justice — Family Court Statistics Quarterly</a> — Forced Marriage Protection Order data. Retrieved November 2024.</p>
            <p>FMU figures capture only cases where victims or professionals contacted the unit. True prevalence is estimated at 5,000–8,000 cases per year. COVID-19 lockdowns suppressed reporting in 2020–21.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
