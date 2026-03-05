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
            <p>The majority of people, when asked, say they would prefer to die at home or in a hospice. Yet 45.8% of deaths in England still occur in hospital &mdash; many of them in acute wards where dying patients are surrounded by medical equipment, regular observations, and the noise and disruption of a busy hospital environment. The proportion dying in hospital has fallen since 2010, when it stood at 53%, and more people are now dying at home (28.1%) than at any point in recent decades. But the gap between preference and reality remains large, and closing it further requires sustained investment in community and palliative care capacity that is currently uncertain.</p>
            <p>The structural funding crisis in hospice care is one of the least-discussed failures of NHS financing. Hospices provide the gold standard of palliative care &mdash; specialist symptom management, psychological support, family-centred care, and the expertise to help people die well &mdash; yet they receive, on average, only 34% of their funding from the NHS. The remaining 66% comes from charitable fundraising: charity shops, sponsored events, legacies, donations. This means that the quality and accessibility of specialist palliative care depends substantially on how affluent and philanthropically inclined the local community is &mdash; a profoundly unfair basis for a public service.</p>
            <p>Geographic inequalities in palliative care access are significant. Rural and deprived areas have lower hospice provision, less community palliative care nursing, and higher rates of hospital death. The Nuffield Trust and Health Foundation have consistently found that social deprivation is associated with worse quality end-of-life care and lower rates of dying in a preferred setting. People in social housing, people without family support, and people from some ethnic minority communities are all less likely to receive specialist palliative care.</p>
            <p>The Assisted Dying debate has re-entered mainstream political discourse in England and Wales following the passage of the Terminally Ill Adults (End of Life) Bill in 2024. Proponents argue that people should have the right to choose the timing and manner of their death when terminally ill; opponents, including many palliative care professionals, argue that better investment in palliative care would address most of the suffering that drives demand for assisted dying. This debate sits alongside, not instead of, the question of whether the current system of end-of-life care is adequately funded and equitably distributed.</p>
            <p>Advance care planning &mdash; conversations between patients, families, and clinicians about preferences for end-of-life care &mdash; is one of the most cost-effective interventions in healthcare, yet it remains poorly embedded in NHS practice. Studies show that documented advance care plans significantly increase the likelihood of dying in a preferred setting and reduce unwanted acute hospital admissions at the end of life. Training clinicians to have these conversations, and creating the time and systems for them to happen, requires investment that sits outside most NHS performance targets but delivers measurable improvements in both patient experience and NHS efficiency.</p>
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
              onExpand={() => {}}
              source="ONS mortality statistics &middot; 2022"
            />
            <MetricCard
              label="Dying in hospital"
              value="45.8"
              unit="%"
              direction="down"
              polarity="up-is-bad"
              changeText="Down from 53% in 2010 but still high &middot; many are avoidable"
              sparklineData={[53, 51.2, 48, 46.3, 45.8]}
              onExpand={() => {}}
              source="ONS &middot; 2022"
            />
            <MetricCard
              label="Hospice NHS funding share"
              value="34"
              unit="%"
              direction="flat"
              polarity="up-is-good"
              changeText="66% from charitable donations &middot; structural underfunding"
              sparklineData={[30, 31, 32, 33, 30, 34, 34]}
              onExpand={() => {}}
              source="Hospice UK &middot; 2023"
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
