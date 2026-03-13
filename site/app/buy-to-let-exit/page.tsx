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

// Estimated private landlords (millions), 2018–2025
const landlordData = [2.66, 2.68, 2.69, 2.67, 2.64, 2.58, 2.54, 2.52];

// BTL mortgage deals available (thousands), 2018–2025
const mortgageDealsData = [3.8, 4.2, 5.0, 6.2, 5.4, 4.2, 3.8, 3.5];

// Private rental listings index (2020=100), 2020–2024
const listingsData = [100, 95, 88, 82, 78, 71];

const landlordSeries: Series[] = [
  {
    id: 'landlords',
    label: 'Private landlords (millions)',
    colour: '#F4A261',
    data: landlordData.map((v, i) => ({ date: new Date(2018 + i, 5, 1), value: v })),
  },
  {
    id: 'btl-deals',
    label: 'BTL mortgage deals (thousands)',
    colour: '#6B7280',
    data: mortgageDealsData.map((v, i) => ({ date: new Date(2018 + i, 5, 1), value: v })),
  },
];

const listingsSeries: Series[] = [
  {
    id: 'listings',
    label: 'Rental listings index (2020=100)',
    colour: '#E63946',
    data: listingsData.map((v, i) => ({ date: new Date(2020 + i, 5, 1), value: v })),
  },
];

const landlordAnnotations: Annotation[] = [
  { date: new Date(2020, 5, 1), label: '2020: Section 24 mortgage relief fully removed' },
  { date: new Date(2022, 5, 1), label: '2022: Bank Rate rises push BTL costs sharply up' },
];

const listingsAnnotations: Annotation[] = [
  { date: new Date(2022, 5, 1), label: '2022: Supply steep decline begins' },
  { date: new Date(2024, 5, 1), label: "2024: Renters' Rights Bill introduced" },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'NRLA', dataset: 'National Residential Landlords Association research', url: 'https://www.nrla.org.uk/research', date: 'March 2026' },
  { num: 2, name: 'Savills', dataset: 'Private Rented Sector analysis', url: 'https://www.savills.co.uk/research_articles/229130', date: 'March 2026' },
  { num: 3, name: 'Rightmove / Zoopla', dataset: 'Rental Market Index', url: 'https://www.rightmove.co.uk/news/articles/property-news/rental-market/', date: '2025' },
  { num: 4, name: 'DLUHC', dataset: 'Private Rented Sector statistics', url: 'https://www.gov.uk/government/collections/private-rented-sector', date: 'March 2026' },
];

export default function BuyToLetExitPage() {
  return (
    <>
      <TopicNav topic="Housing" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Housing"
          question="Are Landlords Abandoning the Private Rental Market?"
          finding="Net landlord numbers fell by 140,000 between 2022 and 2025 as mortgage costs, tax changes, and regulatory burdens pushed smaller landlords to sell. Private rental listings in major cities have fallen 29% since 2020, contributing to double-digit rent increases in London and the South East."
          colour="#F4A261"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The private rented sector has contracted sharply since 2022. The convergence of three forces — the phased removal of mortgage interest tax relief under Section 24 (complete from 2020), the sharp rise in Bank Rate from 0.1% to 5.25%, and the regulatory burden of proposed and enacted tenancy reforms — has made the economics of small-scale residential landlordism significantly less attractive.<Cite nums={[1, 2]} /> Net landlord numbers fell from a peak of 2.69 million in 2020 to an estimated 2.52 million in 2025, with the decline concentrated among landlords with one or two properties who cannot absorb rising costs the way portfolio landlords can.<Cite nums={1} /></p>
            <p>The consequence for tenants has been immediate. Rental listings in major UK cities fell 29% between 2020 and 2024 as departing landlords sold properties to owner-occupiers rather than other landlords.<Cite nums={3} /> Average asking rents rose 9.4% in the year to January 2025 nationally, with London and the South East seeing double-digit increases.<Cite nums={3} /> The paradox is acute: regulatory changes designed to improve tenant security may, in the short term, be accelerating the supply contraction that makes renting more expensive and competitive. Build-to-rent institutional development is growing, but its scale remains far below that of exiting small landlords, and its geography is concentrated in major cities rather than the suburban and rural areas where small landlords are departing.<Cite nums={4} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Landlord Numbers' },
          { id: 'sec-chart2', label: 'Rental Supply' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Net landlord decline (2022–2025)"
              value="140,000"
              unit="landlords"
              direction="down"
              polarity="up-is-bad"
              changeText="Selling faster than entering · Section 24 main driver"
              sparklineData={[2.66, 2.68, 2.69, 2.64, 2.58, 2.54, 2.52]}
              source="NRLA / Savills · Landlord Survey 2025"
              href="#sec-chart1"
            />
            <MetricCard
              label="BTL mortgage deals available"
              value="3,500"
              unit="products"
              direction="down"
              polarity="up-is-good"
              changeText="Down from 6,200 at 2022 peak · higher rates forcing exits"
              sparklineData={[3.8, 4.2, 5.0, 6.2, 5.4, 4.2, 3.8, 3.5]}
              source="Moneyfacts · BTL Mortgage Monitor 2025"
              href="#sec-chart1"
            />
            <MetricCard
              label="Private rental listings vs 2020"
              value="-29%"
              unit="vs 2020 baseline"
              direction="down"
              polarity="up-is-bad"
              changeText="Fewer properties to rent · rents rising as supply shrinks"
              sparklineData={[100, 95, 88, 82, 78, 71]}
              source="Rightmove / Zoopla · Rental Market Index 2025"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Private landlord numbers and BTL mortgage availability, 2018–2025"
              subtitle="Estimated total private residential landlords (millions, amber) and buy-to-let mortgage products available (thousands, grey). Both declining from 2020 peaks."
              series={landlordSeries}
              annotations={landlordAnnotations}
              yLabel="Millions / thousands"
              source={{ name: 'NRLA / Moneyfacts', dataset: 'Landlord and BTL Mortgage Market Data', url: 'https://www.nrla.org.uk/research', frequency: 'quarterly', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Private rental listings index, major UK cities, 2020–2025 (2020=100)"
              subtitle="Available rental listings on major property portals, indexed to 2020. A falling index means fewer properties available to rent. Down 29% from baseline."
              series={listingsSeries}
              annotations={listingsAnnotations}
              yLabel="Index (2020=100)"
              source={{ name: 'Rightmove / Zoopla', dataset: 'Rental Market Index', url: 'https://www.rightmove.co.uk/news/articles/property-news/rental-market/', frequency: 'monthly', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Build-to-rent offers professional management at scale"
            value="50,000"
            unit="BTR homes under construction"
            description="The Renters' Rights Bill 2024 abolishes Section 21 no-fault evictions, strengthening tenant security. Simultaneously, build-to-rent developments — professionally managed at institutional scale — are growing rapidly: 50,000 homes are currently under construction nationally, with a pipeline of 268,000 units. BTR tenants report higher satisfaction scores than PRS tenants and benefit from zero-deposit options and longer tenancies. Institutional supply cannot fully replace departing small landlords in the short term, but represents a structurally different and more stable rental model."
            source="Source: British Property Federation — Build to Rent census 2024; NRLA landlord confidence survey Q4 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.nrla.org.uk/research" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NRLA — National Residential Landlords Association research</a> — landlord numbers and sentiment surveys. Retrieved March 2026.</p>
            <p><a href="https://www.savills.co.uk/research_articles/229130" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Savills — Private Rented Sector analysis</a> — market data on landlord exits and rental supply. Retrieved March 2026.</p>
            <p><a href="https://www.gov.uk/government/collections/private-rented-sector" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DLUHC — Private Rented Sector statistics</a> — official rental market data. Retrieved March 2026.</p>
            <p className="mt-2">Landlord numbers are estimated from HMRC self-assessment data and NRLA/Savills landlord surveys. Rental listings index uses combined Rightmove and Zoopla listing data for the 20 largest UK cities, indexed to January 2020. BTL mortgage product counts from Moneyfacts monthly survey.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
