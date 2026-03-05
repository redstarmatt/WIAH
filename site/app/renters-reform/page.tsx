'use client'

import { useEffect, useState } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import PositiveCallout from '@/components/PositiveCallout'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// ── Types ────────────────────────────────────────────────────────────────────

interface RentersReformData {
  section21Notices: { year: number; notices: number }[]
  homelessnessViaSect21: { year: number; households: number }[]
  rentIncreases: { year: number; avgIncreasePercent: number }[]
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 6, 1)
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function RentersReformPage() {
  const [data, setData] = useState<RentersReformData | null>(null)

  useEffect(() => {
    fetch('/data/renters-reform/renters_reform.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const s21Series: Series[] = data
    ? [{
        id: 's21',
        label: 'Section 21 notices served',
        colour: '#E63946',
        data: data.section21Notices.map(d => ({
          date: yearToDate(d.year),
          value: d.notices,
        })),
      }]
    : []

  const rentSeries: Series[] = data
    ? [{
        id: 'rent',
        label: 'Average rent increase (%)',
        colour: '#F4A261',
        data: data.rentIncreases.map(d => ({
          date: yearToDate(d.year),
          value: d.avgIncreasePercent,
        })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Renters Reform" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Renters Reform"
          question="Are renters finally getting more protection?"
          finding="Section 21 &lsquo;no-fault&rsquo; evictions were used 26,000 times in 2022/23, making over 22,000 households homeless annually. The Renters Rights Act 2024 abolishes Section 21 &mdash; a landmark for England&apos;s 11 million private renters."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Section 21 of the Housing Act 1988 gave landlords the right to evict assured shorthold tenants without giving any reason, providing two months&apos; notice. The mechanism was designed to make landlords more willing to enter the market by guaranteeing a reliable exit route from tenancies. For three decades it was the dominant method of ending private rented sector tenancies. By 2022/23, over 26,000 Section 21 notices were being served annually. Because tenants had no right to challenge the basis of the eviction &mdash; only the procedure &mdash; and because legal aid for housing matters had been severely curtailed since 2013, most tenants served with a Section 21 notice had no realistic means of contesting it.</p>
            <p>The homelessness impact was substantial and directly measurable. Local authority homelessness statistics record the reason why households present as homeless. In 2022/23, the end of a private sector tenancy &mdash; predominantly via Section 21 &mdash; was the single largest cause of households presenting as homeless to local authorities, accounting for around 22,000 households annually. The link between no-fault eviction and homelessness was direct: tenants who had done nothing wrong could be legally removed from their homes in two months, with no right to know why, and no guarantee of alternative accommodation.</p>
            <p>The commitment to abolish Section 21 was made by Theresa May&apos;s Conservative government in April 2019. The Renters Reform Bill was introduced in May 2023 and passed under the new Labour government as the Renters Rights Act, receiving Royal Assent in spring 2025. The five-year gap between promise and delivery was driven by sustained lobbying from landlord groups and concern within the Conservative parliamentary party &mdash; many of whose members were landlords &mdash; about the impact on rental supply. The argument was that landlords would exit the sector if they could not access a quick no-fault eviction route, reducing supply and increasing rents. The counter-argument, supported by evidence from Scotland where notice requirements were strengthened without evidence of supply collapse, was that this was speculative and self-interested.</p>
            <p>The Renters Rights Act 2024 does more than abolish Section 21. It moves all assured shorthold tenancies to periodic (rolling month-by-month) rather than fixed-term, meaning tenants can leave with two months&apos; notice at any time. Landlords wishing to end tenancies must use specified grounds (Ground 1: landlord wishing to sell; Ground 6: landlord wishing to move in; various grounds for tenant fault). A Decent Homes Standard will be applied to the private rented sector for the first time, giving local authorities powers to enforce minimum standards. A new Ombudsman will provide a landlord redress scheme. A PRS Database will require all landlords to register their properties.</p>
            <p>The remaining gaps in renter protection are significant. The Act does not include in-tenancy rent control: landlords can increase rents once per year to the market rate, and while tenants can challenge increases to a Rent Tribunal, the Tribunal generally awards market rate. The rent increases of 8.9% recorded in 2023 &mdash; the largest annual increase on record &mdash; would be as permissible under the new Act as under the old. The Act&apos;s effectiveness on homelessness will depend on how courts interpret the new possession grounds and whether legal aid is adequately funded for tenants wishing to contest possession proceedings. Reform of Section 21 addresses the insecurity of tenure; it does not address the affordability of rent, which for many tenants is the more acute immediate problem.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-s21', label: 'Section 21 Notices' },
          { id: 'sec-rent', label: 'Rent Increases' },
        ]} />

        <ScrollReveal>
        <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Section 21 notices served (2022/23)"
            value="26,000"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Back to pre-COVID highs &middot; renters face no-fault eviction again"
            sparklineData={[20400, 22100, 23700, 24100, 7400, 13200, 24700, 26000]}
            source="MOJ Court Statistics &middot; 2023"
            onExpand={() => {}}
          />
          <MetricCard
            label="Households made homeless via S21/yr"
            value="22,000"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Largest single driver of homelessness presentations"
            sparklineData={[20000, 21000, 16000, 21000, 22000]}
            source="DLUHC Homelessness Statistics &middot; 2023"
            onExpand={() => {}}
          />
          <MetricCard
            label="Average private rent increase (2023)"
            value="8.9"
            unit="%"
            direction="up"
            polarity="up-is-bad"
            changeText="Largest annual increase on record &middot; tenants have no in-tenancy protection"
            sparklineData={[2.1, 1.4, 2.3, 4.1, 8.9]}
            source="ONS Private Rental Market Survey &middot; 2023"
            onExpand={() => {}}
          />
        </div>
        </ScrollReveal>

        <ScrollReveal>
        <PositiveCallout
          title="Section 21 abolished by Renters Rights Act 2024"
          value="Abolished"
          unit=""
          description="The Renters Rights Act 2024 ends no-fault evictions in England &mdash; a reform campaigned for since 2019. Landlords must give reasons for eviction. 11 million renters gain new security."
          source="Renters Rights Act 2024"
        />
        </ScrollReveal>

        <ScrollReveal>
        <section id="sec-s21" className="mb-12">
          <LineChart
            title="Section 21 &lsquo;no-fault&rsquo; eviction notices served, England, 2016&ndash;2023"
            subtitle="Number of Section 21 notices issued. Ministry of Justice Court Statistics."
            series={s21Series}
            annotations={[
              { date: new Date(2019, 3, 1), label: 'Govt promises S21 abolition' },
              { date: new Date(2020, 3, 1), label: 'COVID moratorium on evictions' },
            ]}
            yLabel="Notices served"
          />
        </section>
        </ScrollReveal>

        <ScrollReveal>
        <section id="sec-rent" className="mb-12">
          <LineChart
            title="Average private rent increase, England, 2019&ndash;2023"
            subtitle="Year-on-year percentage change in private rents. ONS Private Rental Market Survey."
            series={rentSeries}
            yLabel="% annual increase"
          />
          <p className="text-xs font-mono text-wiah-mid mt-4">
            Source:{' '}
            <a href="https://www.gov.uk/government/collections/court-statistics-quarterly" className="underline" target="_blank" rel="noopener noreferrer">
              Ministry of Justice Court Statistics
            </a>
            {' '}&middot;{' '}
            <a href="https://shelter.org.uk" className="underline" target="_blank" rel="noopener noreferrer">
              Shelter (shelter.org.uk)
            </a>
            {' '}&middot; DLUHC
          </p>
        </section>
        </ScrollReveal>
      </main>
    </>
  )
}
