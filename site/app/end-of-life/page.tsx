'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface EndOfLifeData {
  placeOfDeath: Array<{
    year: number
    hospital: number
    home: number
    careHome: number
    hospice: number
  }>
  hospiceFunding: Array<{ year: number; nhsPercent: number }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function EndOfLifePage() {
  const [data, setData] = useState<EndOfLifeData | null>(null)

  useEffect(() => {
    fetch('/data/end-of-life/end_of_life.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const placeOfDeathSeries: Series[] = data
    ? [
        {
          id: 'hospital',
          label: 'Hospital',
          colour: '#E63946',
          data: data.placeOfDeath.map(d => ({
            date: yearToDate(d.year),
            value: d.hospital,
          })),
        },
        {
          id: 'home',
          label: 'Home',
          colour: '#2A9D8F',
          data: data.placeOfDeath.map(d => ({
            date: yearToDate(d.year),
            value: d.home,
          })),
        },
        {
          id: 'care-home',
          label: 'Care home',
          colour: '#6B7280',
          data: data.placeOfDeath.map(d => ({
            date: yearToDate(d.year),
            value: d.careHome,
          })),
        },
        {
          id: 'hospice',
          label: 'Hospice',
          colour: '#264653',
          data: data.placeOfDeath.map(d => ({
            date: yearToDate(d.year),
            value: d.hospice,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="End of Life Care" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="End of Life Care"
          question="Are people able to die in the place they choose?"
          finding="47% of people die in their preferred place &mdash; home or a hospice. 45.8% still die in hospital. Hospices receive just 34% of their funding from the NHS, leaving them reliant on charitable fundraising to provide a public service."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Most people say they would prefer to die at home or in a hospice, yet 45.8&percnt; of deaths in England still occur in hospital &mdash; down from 53&percnt; in 2010, but still well above the stated preference of the population. Home deaths have risen to 28.1&percnt;, the highest in recent decades. Hospices provide the gold standard of palliative care yet receive on average only 34&percnt; of their funding from the NHS; the remaining 66&percnt; comes from charitable fundraising, meaning the quality of specialist palliative care depends substantially on how affluent and philanthropically active the local community is. Advance care planning &mdash; documented conversations about end-of-life preferences &mdash; significantly increases the likelihood of dying in a preferred setting and reduces unwanted acute admissions, yet remains poorly embedded in NHS practice.</p>
            <p>The burden of inadequate palliative care falls unevenly. Rural and deprived areas have lower hospice provision, less community palliative care nursing, and higher rates of hospital death. The Nuffield Trust and Health Foundation consistently find that social deprivation is associated with worse end-of-life care quality and lower rates of dying in a preferred setting; people in social housing, those without family support, and some ethnic minority communities are all less likely to receive specialist palliative care. The passage of the Terminally Ill Adults (End of Life) Bill in 2024 has intensified debate about whether the answer lies in assisted dying or in closing the funding gap that leaves hospices &mdash; a public service in practice &mdash; dependent on charity shops and sponsored runs.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Place of Death' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Dying in preferred place (home/hospice)"
              value="47"
              unit="%"
              direction="up"
              polarity="up-is-good"
              changeText="Up from ~35% in 2010 &middot; home deaths rising slowly"
              sparklineData={[35, 38, 40, 43, 45, 47]}
              href="#sec-chart"source="ONS mortality statistics &middot; 2022"
            />
            <MetricCard
              label="Dying in hospital"
              value="45.8"
              unit="%"
              direction="down"
              polarity="up-is-bad"
              changeText="Down from 53% in 2010 but still high &middot; many are avoidable"
              sparklineData={[53, 51.2, 48, 46.3, 45.8]}
              href="#sec-chart"source="ONS &middot; 2022"
            />
            <MetricCard
              label="Hospice NHS funding share"
              value="34"
              unit="%"
              direction="flat"
              polarity="up-is-good"
              changeText="66% from charitable donations &middot; structural underfunding"
              sparklineData={[30, 31, 32, 33, 30, 34, 34]}
              href="#sec-chart"source="Hospice UK &middot; 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Place of death in England, 2010&ndash;2022"
              subtitle="Percentage of all deaths by place. Hospital deaths falling; home deaths rising. Hospice remains a small but important setting."
              series={placeOfDeathSeries}
              yLabel="% of deaths"
              source={{
                name: 'ONS',
                dataset: 'Death Registrations Summary Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>ONS &mdash; Death Registrations Summary Statistics, England and Wales. Annual. ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/deaths</p>
            <p>Hospice UK &mdash; Hospice Care in the UK. Annual report on hospice sector finances and activity. hospiceuk.org</p>
            <p>NHS England &mdash; Palliative and End of Life Care. england.nhs.uk/eolc</p>
            <p>Place of death is taken from death certificate data. The &lsquo;home&rsquo; category includes private residences. Hospice funding data is from the Hospice UK annual sector analysis, which surveys member hospices on income sources. The NHS funding percentage varies by region and hospice type; 34% is a national average.</p>
          </div>
        </section>
      </main>
    </>
  )
}
