'use client'

import { useEffect, useState } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// ── Types ────────────────────────────────────────────────────────────────────

interface HolidayLetsData {
  shortTermLetCount: { year: number; listings: number }[]
  localImpact: { area: string; stlAsPercentHousing: number }[]
  housingAffordabilityCorrelation: { year: number; cornwallHPE: number }[]
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 6, 1)
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function HolidayLetsPage() {
  const [data, setData] = useState<HolidayLetsData | null>(null)

  useEffect(() => {
    fetch('/data/holiday-lets/holiday_lets.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const listingsSeries: Series[] = data
    ? [{
        id: 'listings',
        label: 'Short-term let listings',
        colour: '#F4A261',
        data: data.shortTermLetCount.map(d => ({
          date: yearToDate(d.year),
          value: d.listings,
        })),
      }]
    : []

  const affordabilitySeries: Series[] = data
    ? [{
        id: 'cornwallHPE',
        label: 'Cornwall house price:earnings ratio',
        colour: '#E63946',
        data: data.housingAffordabilityCorrelation.map(d => ({
          date: yearToDate(d.year),
          value: d.cornwallHPE,
        })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Short-Term Holiday Lets" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Short-Term Holiday Lets"
          question="How many homes have been turned into Airbnbs?"
          finding="257,000 properties in England are listed as short-term lets &mdash; a near-fourfold increase since 2015. In Cornwall, 36% of housing stock is let short-term. Teachers, nurses and local workers are being priced out of the communities they serve."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Short-term letting platforms &mdash; principally Airbnb, Vrbo and Booking.com &mdash; have transformed the rental market in England&apos;s tourist destinations. Between 2015 and 2022, the number of short-term let listings in England grew from approximately 70,000 to 257,000. The growth is not evenly distributed. Coastal and rural areas with high visitor demand have experienced the largest proportional shifts: in Cornwall, an estimated 36% of all housing stock is now listed on short-term let platforms at any point in the year. The Lake District, North Devon, the Peak District, and the Isle of Wight show similar patterns at 18&ndash;29%.</p>
            <p>The consequences for local housing markets are direct and measurable. When a landlord converts a long-term tenancy to a short-term holiday let, they typically earn two to three times more per year &mdash; without the regulatory protections, deposit requirements, or maintenance obligations of a private assured shorthold tenancy. In areas with high tourist demand, the returns calculation is overwhelming. Properties that would previously have housed a local family year-round now house holidaymakers for 20&ndash;40 weeks per year. The net effect is a significant reduction in available housing stock for local residents at a time when private rented supply is already constrained.</p>
            <p>The impact on key worker recruitment is documented and severe. NHS trusts in Cornwall report ongoing difficulty recruiting nurses and allied health professionals specifically because of housing unavailability and cost. The county&apos;s house price-to-earnings ratio rose from 9.1 in 2015 to 15.1 in 2022 &mdash; making Cornwall one of the least affordable places in England relative to local incomes. Primary schools in popular tourist areas report difficulty recruiting and retaining teachers, because the staff accommodation budget allocations designed for national salary expectations cannot compete with tourist rental returns. This creates a systemic problem: areas that attract visitors generate the tourist economy partly through the quality of their public services, which are then undermined by the housing effect of tourism itself.</p>
            <p>The government&apos;s response has been cautious. A mandatory registration scheme for short-term lets was consulted upon in 2022 and included in the Levelling Up and Regeneration Act 2023, giving local authorities powers to require registration &mdash; but not to cap numbers. Some councils have used existing planning powers to designate their areas as requiring change-of-use planning permission to convert a dwelling from C3 (residential) to C5 (short-term let), a use class created in the Act. The Lake District National Park was an early adopter. The council tax system has also been reformed: properties used as short-term lets for fewer than 70 days per year are now subject to council tax rather than business rates, removing the previous financial incentive of a 100% business rates relief.</p>
            <p>The question of whether regulation should go further &mdash; to cap short-term let numbers in designated areas, as Barcelona and Amsterdam have done &mdash; remains politically contested. Industry organisations representing platform operators argue that short-term lets support rural tourism economies and that many hosts are individual homeowners supplementing income, not institutional investors. Housing campaigners and local authorities in tourist areas argue that without numerical limits, registration alone will not meaningfully reduce the displacement of long-term residents. The evidence from cities that have introduced hard caps &mdash; Amsterdam reduced Airbnb listings from 22,000 to 7,800 after introducing a 30-night annual cap &mdash; suggests that strong regulation does change behaviour. Whether English policy will move in that direction depends on political will that has so far been absent.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-listings', label: 'Listings Growth' },
          { id: 'sec-local', label: 'Local Impact' },
          { id: 'sec-affordability', label: 'Affordability' },
        ]} />

        <ScrollReveal>
        <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Short-term let listings in England"
            value="257,000"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Up from 70,000 in 2015 &middot; concentrated in tourist areas"
            sparklineData={[70000, 110000, 180000, 235000, 257000]}
            source="ONS / Inside Airbnb &middot; 2022"
            onExpand={() => {}}
          />
          <MetricCard
            label="Cornwall housing as short-term lets"
            value="36"
            unit="%"
            direction="up"
            polarity="up-is-bad"
            changeText="Lake District 29%, North Devon 24% &middot; communities hollowed out"
            sparklineData={[20, 24, 28, 32, 36]}
            source="Affordable Housing Commission &middot; 2022"
            onExpand={() => {}}
          />
          <MetricCard
            label="Cornwall house price:earnings ratio"
            value="15.1"
            unit="&times;"
            direction="up"
            polarity="up-is-bad"
            changeText="Up from 9.1&times; in 2015 &middot; STLs contributing to unaffordability"
            sparklineData={[9.1, 10.3, 11.2, 14.4, 15.1]}
            source="ONS House Price Statistics &middot; 2022"
            onExpand={() => {}}
          />
        </div>
        </ScrollReveal>

        <ScrollReveal>
        <section id="sec-listings" className="mb-12">
          <LineChart
            title="Short-term rental listings in England, 2015&ndash;2022"
            subtitle="Estimated number of active short-term let listings. ONS / Inside Airbnb."
            series={listingsSeries}
            annotations={[
              { date: new Date(2020, 6, 1), label: 'COVID-19 pause; listings resumed 2021' },
            ]}
            yLabel="Number of listings"
          />
        </section>
        </ScrollReveal>

        <ScrollReveal>
        <section id="sec-local" className="mb-12">
          <h3 className="text-xl font-bold text-wiah-black mb-2">Short-term lets as % of housing stock, by area</h3>
          <p className="text-sm text-wiah-mid mb-6">Estimated short-term let listings as a percentage of total housing stock. Affordable Housing Commission, 2022.</p>
          <div className="space-y-3">
            {data?.localImpact
              .sort((a, b) => b.stlAsPercentHousing - a.stlAsPercentHousing)
              .map(item => (
              <div key={item.area} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-36 text-sm text-wiah-black">{item.area}</div>
                <div className="flex-grow flex items-center gap-2">
                  <div
                    className="h-6 bg-[#F4A261] rounded"
                    style={{ width: `${item.stlAsPercentHousing * 2.5}%` }}
                  />
                </div>
                <div className="flex-shrink-0 w-12 text-right font-mono text-sm text-wiah-black">
                  {item.stlAsPercentHousing}%
                </div>
              </div>
            ))}
          </div>
        </section>
        </ScrollReveal>

        <ScrollReveal>
        <section id="sec-affordability" className="mb-12">
          <LineChart
            title="Cornwall house price:earnings ratio, 2015&ndash;2022"
            subtitle="Median house price divided by median annual earnings, Cornwall. ONS House Price Statistics."
            series={affordabilitySeries}
            yLabel="House price:earnings ratio"
          />
          <p className="text-xs font-mono text-wiah-mid mt-4">
            Source:{' '}
            <a href="https://www.ons.gov.uk/peoplepopulationandcommunity/housing/bulletins/housingaffordabilityinenglandandwales/previousReleases" className="underline" target="_blank" rel="noopener noreferrer">
              ONS Short-Term Lets Statistics
            </a>
            {' '}&middot; Affordable Housing Commission &middot; DLUHC
          </p>
        </section>
        </ScrollReveal>
      </main>
    </>
  )
}
