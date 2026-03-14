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

// Section 21 possession claims (thousands), 2015–2024 — MOJ
const s21ClaimsValues = [38, 41, 44, 46, 48, 44, 12, 28, 38, 44];

// Total private rented sector possession orders (thousands), 2015–2024 — MOJ
const totalOrdersValues = [50, 54, 58, 60, 62, 56, 14, 32, 48, 58];

// Households in temporary accommodation after eviction (thousands), 2015–2024 — DLUHC
const tempAccomValues = [55, 58, 62, 65, 69, 70, 68, 72, 79, 84];

const possessionSeries: Series[] = [
  {
    id: 's21',
    label: 'Section 21 claims (thousands)',
    colour: '#E63946',
    data: s21ClaimsValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'total-orders',
    label: 'Total possession orders (thousands)',
    colour: '#264653',
    data: totalOrdersValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const tempAccomSeries: Series[] = [
  {
    id: 'temp-accom',
    label: 'Households in temporary accommodation (thousands)',
    colour: '#F4A261',
    data: tempAccomValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const evictionAnnotations: Annotation[] = [
  { date: new Date(2020, 2, 1), label: '2020: COVID eviction ban' },
  { date: new Date(2021, 5, 1), label: '2021: Ban lifted' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'MOJ', dataset: 'Mortgage and landlord possession statistics', url: 'https://www.gov.uk/government/collections/mortgage-and-landlord-possession-statistics', date: '2024' },
  { num: 2, name: 'DLUHC', dataset: 'Statutory homelessness in England', url: 'https://www.gov.uk/government/collections/homelessness-statistics', date: '2024' },
  { num: 3, name: 'LGA', dataset: 'Local government finance analysis', date: '2024' },
];

export default function EvictionsPage() {
  return (
    <>
      <TopicNav topic="Evictions" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Evictions"
          question="How Many Renters Are Being Forced Out?"
          finding="Section 21 'no-fault' eviction claims reached 44,000 in 2024, back to pre-pandemic levels. 84,000 households are in temporary accommodation after losing their homes. Despite the Renters Rights Bill, no-fault evictions continue until it becomes law."
          colour="#E63946"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Section 21 'no-fault' evictions — where landlords can repossess property without giving a reason, provided notice requirements are met — have been a central controversy in English housing law for a decade. Claims reached their pre-COVID peak of around 48,000 per year in 2019, fell sharply during the pandemic eviction ban, and then rebounded as the ban lifted in mid-2021. By 2024, Section 21 claims were running at approximately 44,000 per year, close to pre-pandemic levels.<Cite nums={1} /> The government announced plans to abolish Section 21 in 2019 under Theresa May, but legislation was repeatedly delayed; the Renters Rights Bill — which would abolish Section 21 and replace fixed-term tenancies with periodic ones — reached the House of Lords in 2024.</p>
            <p>The downstream effect of evictions on homelessness is substantial. The number of households in temporary accommodation — placed there by local authorities after becoming homeless, often following an eviction — has risen steadily to around 84,000 in 2024.<Cite nums={2} /> This includes approximately 130,000 children living in bed and breakfast hotels, hostels, and overcrowded temporary placements.<Cite nums={2} /> The cost to local authorities is enormous: temporary accommodation costs councils approximately £1.7 billion per year<Cite nums={3} />, contributing to the financial pressures that have driven multiple section 114 (effective bankruptcy) notices. Every 1,000 Section 21 evictions generates an estimated £50 million in downstream homelessness costs.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Possession claims' },
          { id: 'sec-chart2', label: 'Temporary accommodation' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Section 21 claims (2024)"
              value="44,000"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Back to near pre-pandemic levels · awaiting abolition"
              sparklineData={[38, 41, 44, 46, 48, 44, 12, 28, 38, 44]}
              source="MOJ · Mortgage and landlord possession statistics 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Households in temporary accommodation"
              value="84,000"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Record high · includes 130,000 children"
              sparklineData={[55, 58, 62, 65, 69, 70, 68, 72, 79, 84]}
              source="DLUHC · Statutory homelessness 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Temporary accommodation cost"
              value="£1.7bn"
              unit="/year"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from £1.0bn in 2018 · key driver of council financial stress"
              sparklineData={[900, 1000, 1100, 1200, 1300, 1300, 1300, 1400, 1600, 1700]}
              source="LGA · Local government finance analysis 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Private rented sector possession claims, England and Wales, 2015–2024"
              subtitle="Section 21 'no-fault' claims and total private rented sector possession orders. COVID eviction ban caused sharp fall in 2020; both rebounded to near pre-pandemic levels by 2024."
              series={possessionSeries}
              annotations={evictionAnnotations}
              yLabel="Claims / orders (thousands)"
              source={{ name: 'MOJ', dataset: 'Mortgage and landlord possession statistics', url: 'https://www.gov.uk/government/collections/mortgage-and-landlord-possession-statistics', frequency: 'quarterly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Households in temporary accommodation, England, 2015–2024"
              subtitle="Households placed in temporary accommodation by local authorities, predominantly following eviction from private rented sector. Steady rise to record levels."
              series={tempAccomSeries}
              annotations={[]}
              yLabel="Households (thousands)"
              source={{ name: 'DLUHC', dataset: 'Statutory homelessness in England', url: 'https://www.gov.uk/government/collections/homelessness-statistics', frequency: 'quarterly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Renters Rights Bill will abolish Section 21"
            value="2025"
            description="The Renters Rights Bill, introduced in September 2024, will abolish Section 21 'no-fault' evictions, replacing them with a system where landlords must cite specific grounds for possession. All tenancies will become periodic, removing the 'cliff-edge' of fixed-term expiry. Rent increase notices will require at least two months' notice, with rent increases limited to once per year. The Decent Homes Standard will be extended to the private rented sector for the first time. If enacted and enforced, these changes will significantly reduce the volume of evictions and the downstream pressure on temporary accommodation and homelessness services."
            source="Source: DLUHC — Renters Rights Bill impact assessment 2024. Generation Rent — Analysis of Section 21 eviction trends."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/mortgage-and-landlord-possession-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">MOJ — Mortgage and landlord possession statistics</a> — quarterly data on Section 21 and Section 8 claims, orders, and warrants.</p>
            <p><a href="https://www.gov.uk/government/collections/homelessness-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DLUHC — Statutory homelessness in England</a> — quarterly data on households owed a homelessness duty and in temporary accommodation.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
