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
            <p>Section 21 of the Housing Act 1988 gave landlords the right to evict assured shorthold tenants without stating any reason, with two months&apos; notice. By 2022/23, over 26,000 Section 21 notices were being served annually, and the end of a private sector tenancy was the single largest cause of homelessness presentations to local authorities &mdash; around 22,000 households per year. The commitment to abolish Section 21 was made in April 2019; six years later, the Renters Rights Act received Royal Assent in spring 2025, having been delayed by sustained landlord lobbying. The Act goes further than abolishing Section 21: it converts all assured shorthold tenancies to periodic (rolling monthly) agreements, introduces a Decent Homes Standard for the private rented sector, creates a mandatory landlord PRS Database, and establishes a new Ombudsman for redress.</p>
            <p>Significant gaps remain. The Act contains no in-tenancy rent control &mdash; landlords can raise rents annually to market rate, meaning the 8.9&percnt; increases recorded in 2023 remain fully permissible. Its effectiveness on homelessness will depend on how courts interpret the new possession grounds and whether legal aid is adequately funded for tenants contesting proceedings. The Act addresses security of tenure; it does not address affordability, which for many private renters is the more acute immediate problem given rents rising faster than wages since 2020.</p>
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
