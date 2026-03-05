'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface ErosionRow {
  year: number
  homesAtRisk50yr: number
  propertiesLost?: number
}

interface CoastalErosionData {
  topic: string
  lastUpdated: string
  timeSeries: ErosionRow[]
  hotspots: string[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function CoastalErosionRiskPage() {
  const [data, setData] = useState<CoastalErosionData | null>(null)

  useEffect(() => {
    fetch('/data/coastal-erosion-risk/coastal_erosion_risk.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const erosionSeries: Series[] = data
    ? [
        {
          id: 'atRisk',
          label: 'Homes at risk in next 50 years',
          colour: '#F4A261',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.homesAtRisk50yr,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Coastal Erosion Risk" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Coastal Erosion Risk"
          question="Is Your Home About to Fall Into the Sea?"
          finding="100,000 homes face significant coastal erosion risk by 2050 &mdash; and managed retreat means some communities will be allowed to flood permanently."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Britain&apos;s coastline is eroding. Not as a future risk but as a present reality: entire streets have been lost along the Holderness coast of East Yorkshire, where cliffs retreat at an average of 1.7 metres per year &mdash; among the fastest erosion rates in Europe. The village of Skipsea has lost houses to the sea within living memory. Homes that once had sea views now have no ground beneath their gardens. This is not a natural disaster in the conventional sense: it is a slow, predictable, well-documented process that policymakers have chosen not to fully address.</p>
            <p>The Environment Agency&apos;s National Flood and Coastal Erosion Risk Management Strategy identifies approximately 100,000 properties currently at significant risk from coastal erosion over the next 50 years. Projections to 2050 suggest this could rise to 156,000 as sea levels rise and storm frequency and severity increase under climate change. These figures may understate the true exposure, because property values are assessed at replacement cost rather than market value, and because the psychological and community costs of living under threat of erosion are not captured in standard risk assessments.</p>
            <p>The government&apos;s coastal defence strategy is built around the concept of &ldquo;managed retreat&rdquo; &mdash; a euphemism for the deliberate, planned withdrawal from some coastal areas where defence is judged not to be economically viable. Shoreline Management Plans, prepared by coastal operating authorities, classify stretches of coast into four policy options: hold the line, advance the line, managed realignment, or no active intervention. For communities in the &ldquo;no active intervention&rdquo; category, this means that the sea will eventually claim their homes and no public funds will be spent to prevent it.</p>
            <p>There is no compensation scheme for properties lost to coastal erosion. Homeowners in at-risk areas increasingly find it impossible to obtain building insurance at affordable rates, and banks are beginning to factor coastal erosion risk into mortgage lending decisions. The result is a market failure in which properties lose value rapidly once they enter the high-risk zone, homeowners cannot sell, cannot insure, and cannot recoup the investment they have made in their homes. This is a policy choice: the UK could introduce a coastal erosion compensation scheme, as some European countries have, but has chosen not to.</p>
            <p>The one area of genuine progress is managed realignment of agricultural land for coastal flood defence. Eighteen major managed realignment projects have been completed in England since 2000, deliberately breaching sea walls to allow formerly protected farmland to flood and become saltmarsh. This creates new coastal habitat with significant carbon sequestration potential, reduces pressure on remaining hard defences, and provides natural attenuation for storm surges. The challenge is that the same logic of managed retreat that works for farmland is politically and morally far more difficult to apply to communities where people live, work and maintain their family histories.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Homes at Risk' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Homes at risk by 2050"
              value="100,000"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="25% more than 2010 &middot; no compensation scheme"
              sparklineData={[78000, 84000, 91000, 100000, 116000]}
              onExpand={() => {}}
              source="Environment Agency &middot; NFCERMS 2024"
            />
            <MetricCard
              label="Properties already lost"
              value="1,200+"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Irreversible &middot; sea has claimed entire streets"
              sparklineData={[820, 980, 1100, 1200, 1200]}
              onExpand={() => {}}
              source="Environment Agency &middot; 2024"
            />
            <MetricCard
              label="Managed retreat sites"
              value="18"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Deliberate flooding of farmland for coastal defence"
              sparklineData={[4, 7, 10, 14, 18]}
              onExpand={() => {}}
              source="Environment Agency &middot; 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Homes at significant coastal erosion risk, 2010&ndash;2050"
              subtitle="Properties identified in Environment Agency Shoreline Management Plans as being at risk of loss to coastal erosion within 50 years. Figures beyond 2025 are projections."
              series={erosionSeries}
              yLabel="Properties at risk"
              source={{
                name: 'Environment Agency',
                dataset: 'National Flood and Coastal Erosion Risk Management Strategy',
                frequency: 'periodic',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Environment Agency &mdash; National Flood and Coastal Erosion Risk Management Strategy. gov.uk/government/publications/national-flood-and-coastal-erosion-risk-management-strategy-for-england--2</p>
            <p>Environment Agency &mdash; Shoreline Management Plans. Published by coastal operating authorities. Check your Flood Risk: flood.data.gov.uk</p>
            <p>DEFRA &mdash; Coastal erosion and managed realignment. gov.uk/guidance/coastal-erosion-risk-management</p>
            <p>Properties at risk figures are drawn from Shoreline Management Plan assessments of properties within coastal erosion risk zones over 20&ndash;50 year horizons. Properties lost figures are estimates from local authority coastal monitoring programmes. Projections incorporate UKCP18 sea level rise scenarios under intermediate emissions pathways.</p>
          </div>
        </section>
      </main>
    </>
  )
}
