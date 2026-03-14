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

// Police-recorded DA crimes (thousands), 2013–2023 — Home Office
const crimeValues = [430, 470, 520, 600, 680, 750, 820, 880, 840, 920, 945];

// Charge rate (%), 2013–2023 — CPS / Home Office
const chargeValues = [14, 13, 12, 11, 10, 9, 8, 7, 6.5, 6.2, 6.0];

const crimesSeries: Series[] = [
  {
    id: 'crimes',
    label: 'Recorded DA crimes (thousands)',
    colour: '#E63946',
    data: crimeValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })),
  },
];

const chargeSeries: Series[] = [
  {
    id: 'charge-rate',
    label: 'Charge rate (%)',
    colour: '#6B7280',
    data: chargeValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })),
  },
];

const crimeAnnotations: Annotation[] = [
  { date: new Date(2015, 5, 1), label: '2015: Coercive control criminalised' },
  { date: new Date(2021, 5, 1), label: '2021: Domestic Abuse Act' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'ONS', dataset: 'Crime Survey for England and Wales — Domestic Abuse', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/bulletins/domesticabuseinenglandandwalesoverview/latest', date: '2023' },
  { num: 2, name: 'Home Office', dataset: 'Crime outcomes in England and Wales', url: 'https://www.gov.uk/government/collections/crime-outcomes-in-england-and-wales-statistics', date: '2023' },
  { num: 3, name: 'Femicide Census', dataset: 'Annual data on killings of women by men', url: 'https://www.femicidecensus.org/', date: '2022' },
  { num: 4, name: "Women's Aid", dataset: 'Annual Audit of Domestic Abuse Services', url: 'https://www.womensaid.org.uk/what-we-do/research-and-publications/annual-audit/', date: '2022/23' },
];

export default function DomesticViolencePage() {
  return (
    <>
      <TopicNav topic="Justice" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Justice"
          question="How Many People Experience Domestic Abuse in Britain?"
          finding="2.4 million adults experienced domestic abuse in England and Wales in the year to March 2023. 76 women were killed by a partner or ex-partner in 2022. Only 6% of domestic abuse crimes result in a charge."
          colour="#E63946"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The Crime Survey for England and Wales found 2.4 million adults experienced domestic abuse in the year to March 2023 — yet only 18% of incidents are reported to police.<Cite nums={1} /> The Femicide Census recorded 76 women killed by a male partner or ex-partner in 2022, with an average of 12 prior police contacts before the fatal incident.<Cite nums={3} /> Of over 900,000 domestic abuse crimes recorded in 2022/23, only 6% resulted in a charge — down from 14% in 2015.<Cite nums={2} /> Victim withdrawal accounts for 48% of discontinued cases.<Cite nums={2} /></p>
            <p>The Domestic Abuse Act 2021 introduced new protections, but infrastructure lags far behind. England has roughly 3,700 refuge beds — half the 7,400 the Istanbul Convention requires. Women&apos;s Aid reports 18,000 refuge requests were declined in 2022/23.<Cite nums={4} /> Multi-Agency Risk Assessment Conferences (MARACs) handled 88,000 high-risk referrals, 70% involving repeat victims — evidence that intervention is coming too late.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Recorded crimes' },
          { id: 'sec-chart2', label: 'Charge rate' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Domestic abuse victims per year"
              value="2.4M"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="2022/23 · 1.4M women, 750K men · only 18% report to police"
              sparklineData={[2.3, 2.4, 2.2, 2.3, 2.5, 2.4, 2.3, 2.4]}
              source="ONS · Crime Survey for England and Wales, 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Domestic abuse crimes charged"
              value="6%"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="2022/23 · Down from 14% in 2015 · evidence gap and victim withdrawal"
              sparklineData={[14, 13, 11, 10, 9, 8, 7, 6]}
              source="Home Office · Crime Outcomes 2022/23"
              href="#sec-chart2"
            />
            <MetricCard
              label="Women killed by partners/ex-partners"
              value="76"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="2022 · Femicide Census · 2 per week · 95% male perpetrators"
              sparklineData={[82, 79, 80, 76, 85, 79, 77, 76]}
              source="Femicide Census 2022"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Domestic abuse recorded by police, England & Wales, 2013–2023"
              subtitle="Police recorded crime with a domestic abuse flag. Rising trend partly reflects improved recording practices."
              series={crimesSeries}
              annotations={crimeAnnotations}
              yLabel="Crimes recorded (thousands)"
              source={{ name: 'Home Office', dataset: 'Crime outcomes in England and Wales', url: 'https://www.gov.uk/government/collections/crime-outcomes-in-england-and-wales-statistics', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Domestic abuse charge rate, England & Wales, 2013–2023"
              subtitle="Percentage of police-recorded DA offences resulting in a charge. Halved over a decade."
              series={chargeSeries}
              annotations={[]}
              yLabel="Charge rate (%)"
              source={{ name: 'CPS / Home Office', dataset: 'Crime Outcomes in England and Wales', url: 'https://www.gov.uk/government/collections/crime-outcomes-in-england-and-wales-statistics', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Domestic Abuse Act 2021 — landmark legislation"
            value="2021"
            unit="first statutory definition of domestic abuse"
            description="The Domestic Abuse Act 2021 created a statutory definition of domestic abuse for the first time, including economic abuse and post-separation abuse. It established the Domestic Abuse Commissioner role, created new Domestic Abuse Protection Orders, extended stalking protection, and placed local authorities under a duty to provide accommodation-based support. The Act also made it illegal for perpetrators to cross-examine victims directly in court."
            source="Source: ONS — Domestic abuse in England and Wales overview, 2023; Home Office — Crime outcomes 2022/23."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/bulletins/domesticabuseinenglandandwalesoverview/latest" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Domestic abuse in England and Wales overview</a> — annual CSEW estimates of prevalence.</p>
            <p><a href="https://www.gov.uk/government/collections/crime-outcomes-in-england-and-wales-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Home Office — Crime outcomes in England and Wales</a> — police-recorded crime with DA flag and charge rates.</p>
            <p><a href="https://www.femicidecensus.org/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Femicide Census</a> — annual data on killings of women by men in the UK.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
