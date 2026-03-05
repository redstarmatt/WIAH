'use client'

import { useEffect, useState } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// ── Types ────────────────────────────────────────────────────────────────────

interface SocialRentData {
  newSocialRentBuilt: { year: number; homes: number }[]
  rentLevels2023: { type: string; weeklyRent: number }[]
  waitingList: { year: number; households: number }[]
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 6, 1)
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function SocialRentPage() {
  const [data, setData] = useState<SocialRentData | null>(null)

  useEffect(() => {
    fetch('/data/social-rent/social_rent.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const socialBuildSeries: Series[] = data
    ? [{
        id: 'social',
        label: 'New social rented homes built',
        colour: '#E63946',
        data: data.newSocialRentBuilt.map(d => ({
          date: yearToDate(d.year),
          value: d.homes,
        })),
      }]
    : []

  const waitingListSeries: Series[] = data
    ? [{
        id: 'waitingList',
        label: 'Households on waiting list',
        colour: '#264653',
        data: data.waitingList.map(d => ({
          date: yearToDate(d.year),
          value: d.households,
        })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Social Housing" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Social Housing"
          question="How many social homes are being built?"
          finding="Just 6,400 social rented homes were built in England in 2021/22 &mdash; compared to 152,000 in 1975. Average social rent is £100 per week vs £230 for market rent. 1.2 million households are on the waiting list."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>In 1975, England built 152,000 social rented homes. In 2021/22, it built 6,400. The collapse is one of the most consequential policy reversals in modern British history. Social rented housing &mdash; homes let at rents set to income levels rather than market rates, typically managed by councils or housing associations &mdash; formed the backbone of post-war housing provision for working families who could not afford to buy or pay market rents. The programme was built through public investment, council borrowing, and a planning system that required developers to provide social housing as a condition of consent. It reached its zenith in the mid-1970s before being systematically dismantled.</p>
            <p>The Right to Buy was introduced in 1980, giving council tenants the statutory right to purchase their homes at discounts of up to 60%. Between 1980 and 2023, approximately 2 million council homes were sold. Receipts were initially prohibited from being used for replacement building. The replacements that were built were often constructed as &ldquo;affordable rent&rdquo; (up to 80% of market rate) rather than social rent (linked to a formula based on income), which costs tenants significantly more. The average weekly social rent in England in 2023 was approximately £100; the average &ldquo;affordable rent&rdquo; was £155; the average market rent was £230. The difference &mdash; £130 per week between social and market &mdash; represents a substantial income subsidy to tenants in genuine social housing, and it is available to a shrinking number.</p>
            <p>The waiting list for social housing stood at 1.2 million households in 2022, having peaked at 1.85 million in 2012 before the methodology for counting was changed to exclude applicants deemed to have low housing need. The 2022 figure is likely a significant undercount: local authorities have wide discretion in who they allow to register, and many people with genuine housing need are discouraged from applying or told they are unlikely to be allocated. Average waits in London and other high-pressure areas routinely exceed five years; some London boroughs report average waits of over a decade for larger family homes.</p>
            <p>The distinction between &ldquo;social rent&rdquo; and &ldquo;affordable rent&rdquo; is critical and frequently elided in policy discussions. When government ministers or housing bodies announce a target for &ldquo;affordable homes,&rdquo; the figure typically includes homes for market sale, shared ownership, and affordable rent at 80% of market rate &mdash; alongside a relatively small proportion of true social rented homes. The Affordable Homes Programme 2021&ndash;2026 allocated £11.5 billion for new affordable housing, but the proportion earmarked for social rent was a small fraction of the total commitment. Without a specific, funded commitment to social rent homes as a distinct category, new building will continue to be dominated by tenure types that are unaffordable to those in greatest need.</p>
            <p>Rebuilding a meaningful social housing programme requires both capital funding and the political will to use it for genuine social rent rather than more profitable tenure types. Estimates vary, but delivering 90,000&ndash;100,000 genuinely affordable social rented homes per year &mdash; roughly the scale needed to address both new household formation and reduce the backlog &mdash; would require additional public investment of around £10&ndash;15 billion per year above current commitments. This is a strategic fiscal choice of similar magnitude to the NHS pay settlement or the defence spending commitment. The economic case for social rent is strong: preventing homelessness and its downstream costs (temporary accommodation, social care, healthcare, criminal justice) saves public money over time. The barrier is not primarily technical or economic; it is political will to prioritise the needs of people who cannot buy their way into the market.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-build', label: 'New Builds' },
          { id: 'sec-rents', label: 'Rent Levels' },
          { id: 'sec-waiting', label: 'Waiting List' },
        ]} />

        <ScrollReveal>
        <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="New social rent homes built (2022)"
            value="6,400"
            unit="/yr"
            direction="flat"
            polarity="up-is-good"
            changeText="Was 152,000/yr in 1975 &mdash; a 96% collapse in supply"
            sparklineData={[152000, 88000, 28000, 17000, 9800, 7600, 8200, 7400, 5900, 6400]}
            source="DLUHC Housing Supply Statistics &middot; 2022"
            onExpand={() => {}}
          />
          <MetricCard
            label="Average social rent vs market rent"
            value="£100"
            unit="vs £230/wk market"
            direction="flat"
            polarity="up-is-good"
            changeText="Social rent saves tenants £130/wk vs private renting"
            sparklineData={[60, 65, 70, 75, 80, 85, 90, 95, 100]}
            source="DLUHC / VOA Rent Statistics &middot; 2023"
            onExpand={() => {}}
          />
          <MetricCard
            label="Households on social housing waiting list"
            value="1.2m"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Average wait: 2.7 years &middot; some local authorities: 10+ years"
            sparklineData={[1850000, 1260000, 1151000, 1162000, 1208000]}
            source="DLUHC Live Tables &middot; 2022"
            onExpand={() => {}}
          />
        </div>
        </ScrollReveal>

        <ScrollReveal>
        <section id="sec-build" className="mb-12">
          <LineChart
            title="New social rented homes built in England, 1975&ndash;2022"
            subtitle="Annual completions of social rented homes. DLUHC Housing Supply Statistics."
            series={socialBuildSeries}
            annotations={[
              { date: new Date(1980, 6, 1), label: 'Right to Buy introduced' },
            ]}
            yLabel="Homes built"
          />
        </section>
        </ScrollReveal>

        <ScrollReveal>
        <section id="sec-rents" className="mb-12">
          <h3 className="text-xl font-bold text-wiah-black mb-2">Average weekly rent by tenure type, 2023</h3>
          <p className="text-sm text-wiah-mid mb-6">Average weekly rent in England by tenure type. DLUHC / VOA.</p>
          <div className="space-y-3">
            {data?.rentLevels2023
              .sort((a, b) => b.weeklyRent - a.weeklyRent)
              .map(item => (
              <div key={item.type} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-48 text-sm text-wiah-black">{item.type}</div>
                <div className="flex-grow flex items-center gap-2">
                  <div
                    className="h-6 rounded"
                    style={{
                      width: `${(item.weeklyRent / 240) * 100}%`,
                      backgroundColor: item.type.includes('Social') ? '#2A9D8F' : item.type.includes('Affordable') ? '#F4A261' : '#E63946',
                    }}
                  />
                </div>
                <div className="flex-shrink-0 w-24 text-right font-mono text-sm text-wiah-black">
                  £{item.weeklyRent}/wk
                </div>
              </div>
            ))}
          </div>
        </section>
        </ScrollReveal>

        <ScrollReveal>
        <section id="sec-waiting" className="mb-12">
          <LineChart
            title="Households on social housing waiting list, England, 2012&ndash;2022"
            subtitle="Total households registered on local authority housing waiting lists. DLUHC Live Tables."
            series={waitingListSeries}
            annotations={[
              { date: new Date(2012, 6, 1), label: 'Peak: 1.85m households' },
              { date: new Date(2013, 6, 1), label: 'Methodology tightened — lower-need removed' },
            ]}
            yLabel="Households"
          />
          <p className="text-xs font-mono text-wiah-mid mt-4">
            Source:{' '}
            <a href="https://www.gov.uk/government/statistical-data-sets/live-tables-on-rents-lettings-and-tenancies" className="underline" target="_blank" rel="noopener noreferrer">
              DLUHC Housing Supply Statistics (gov.uk)
            </a>
            {' '}&middot;{' '}
            <a href="https://www.insidehousing.co.uk" className="underline" target="_blank" rel="noopener noreferrer">
              Inside Housing
            </a>
            {' '}&middot; National Housing Federation
          </p>
        </section>
        </ScrollReveal>
      </main>
    </>
  )
}
