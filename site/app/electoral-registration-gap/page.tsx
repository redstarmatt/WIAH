'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface ElectoralRegistrationRow {
  year: number
  missingFromRollM: number
  under25UnregisteredPct: number
}

interface ElectoralRegistrationData {
  topic: string
  lastUpdated: string
  timeSeries: ElectoralRegistrationRow[]
  ethnicMinorityRegistrationGap: number
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function ElectoralRegistrationGapPage() {
  const [data, setData] = useState<ElectoralRegistrationData | null>(null)

  useEffect(() => {
    fetch('/data/electoral-registration-gap/electoral_registration_gap.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const registrationSeries: Series[] = data
    ? [
        {
          id: 'missingFromRollM',
          label: 'Missing from roll (millions)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.missingFromRollM,
          })),
        },
        {
          id: 'under25UnregisteredPct',
          label: 'Under-25s unregistered (%)',
          colour: '#6B7280',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.under25UnregisteredPct,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Electoral Registration Gap" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Electoral Registration Gap"
          question="How Many People Can't Vote?"
          finding="An estimated 8 million people are missing from the electoral roll — disproportionately young people, private renters and those from ethnic minority backgrounds."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Around 8 million people in the UK are eligible to vote but are not registered &mdash; a figure that has remained stubbornly high for over a decade despite the Individual Voter Registration system introduced in 2014. Voter ID requirements brought in for the 2023 local elections and 2024 general election added a further barrier: an estimated 2 million registered voters lack the required photographic ID. Scotland and Wales have moved toward more proactive registration models; England has not, and the Electoral Commission has repeatedly called for reform and more resources for local Electoral Registration Officers.</p>
            <p>The gap falls hardest on already-marginalised groups. Young people aged 18&ndash;24 are most likely to be unregistered (around 34%), private renters underregister because each move requires a new application, and people from ethnic minority backgrounds are around 11 percentage points less likely to be on the roll than white British voters. Unregistered citizens are also excluded from jury service and some credit checks; campaign resources follow registered voter data, meaning unregistered communities receive less political attention and fewer resources, compounding their disengagement.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Registration Gap' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Missing from roll"
              value="8m people"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="unchanged for decade &middot; IVR system not working"
              sparklineData={[7.5, 7.8, 8.0, 8.1, 8.0]}
              href="#sec-chart"source="Electoral Commission &middot; Annual Report 2023"
            />
            <MetricCard
              label="Under-25 unregistered"
              value="34%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="1 in 3 young people not on register"
              sparklineData={[34, 35, 34, 35, 34]}
              href="#sec-chart"source="Electoral Commission &middot; 2023"
            />
            <MetricCard
              label="Ethnic minority gap"
              value="11pp"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="lower registration among minority communities &middot; BAME 11pp below White"
              sparklineData={[11, 11, 11, 11, 11]}
              href="#sec-chart"source="Electoral Commission &middot; Diversity Report 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Electoral registration gap, 2015&ndash;2023"
              subtitle="Estimated millions missing from the electoral roll and percentage of under-25s unregistered."
              series={registrationSeries}
              yLabel="Value"
              source={{
                name: 'Electoral Commission',
                dataset: 'UK Electoral Registers',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Electoral Commission &mdash; UK Electoral Registers. Annual publication of registration statistics. electoralcommission.org.uk/research-and-reports/electoral-data</p>
            <p>Electoral Commission &mdash; Diversity and Representation. Research into barriers to registration by demographic group. electoralcommission.org.uk</p>
            <p>Missing from roll estimates are derived from Electoral Commission modelling comparing registered voters against ONS population estimates for eligible citizens. The methodology is subject to revision as census data updates. Under-25 unregistered figure is from Electoral Commission survey research and attitudinal studies.</p>
          </div>
        </section>
      </main>
    </>
  )
}
