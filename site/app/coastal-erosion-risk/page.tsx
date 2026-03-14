'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

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

// -- References -------------------------------------------------------------

const editorialRefs: Reference[] = [
  { num: 1, name: 'Environment Agency', dataset: 'National Flood and Coastal Erosion Risk Management Strategy', url: 'https://www.gov.uk/government/publications/national-flood-and-coastal-erosion-risk-management-strategy-for-england--2', date: '2024' },
  { num: 2, name: 'Environment Agency', dataset: 'Shoreline Management Plans', url: 'https://flood.data.gov.uk', date: '2024' },
  { num: 3, name: 'Defra', dataset: 'Coastal Erosion Risk Management Guidance', url: 'https://www.gov.uk/guidance/coastal-erosion-risk-management', date: '2024' },
];

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
          finding="100,000 homes face significant coastal erosion risk by 2050 — and managed retreat means some communities will be allowed to flood permanently."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Coastal erosion is happening now, not in the future. The Holderness coast of East Yorkshire retreats at an average of 1.7 metres per year — among the fastest rates in Europe — and entire streets have been lost within living memory.<Cite nums={2} /> The Environment Agency identifies around 100,000 properties at significant risk from erosion over the next 50 years, a figure projected to rise to 156,000 by 2050 as sea levels rise and storm frequency increases.<Cite nums={1} /> Shoreline Management Plans classify some stretches of coast as &ldquo;no active intervention&rdquo;, meaning public funds will not be spent to defend them — a deliberate managed retreat from communities where people live.<Cite nums={2} /> There is no compensation scheme for properties lost to coastal erosion, and homeowners in at-risk areas increasingly cannot obtain affordable building insurance or sell their properties as banks factor erosion risk into mortgage lending decisions.<Cite nums={3} /></p>
            <p>The consequences fall on individuals rather than the state: trapped owners cannot recoup investment in their homes, cannot insure them adequately, and often cannot sell. Eighteen major managed realignment projects in England have deliberately breached sea walls to allow farmland to become saltmarsh, creating coastal habitat and reducing storm surge pressure — a genuine success where the affected land is agricultural.<Cite nums={3} /> Extending the same logic to inhabited communities is politically and morally far harder, and the absence of a compensation framework means that homeowners in declining coastal areas bear costs that are, in effect, a public policy choice.<Cite nums={[1, 3]} /></p>
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
              changeText="25% more than 2010 · no compensation scheme"
              sparklineData={[78000, 84000, 91000, 100000, 116000]}
              href="#sec-chart"source="Environment Agency · NFCERMS 2024"
            />
            <MetricCard
              label="Properties already lost"
              value="1,200+"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Irreversible · sea has claimed entire streets"
              sparklineData={[820, 980, 1100, 1200, 1200]}
              href="#sec-chart"source="Environment Agency · 2024"
            />
            <MetricCard
              label="Managed retreat sites"
              value="18"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Deliberate flooding of farmland for coastal defence"
              sparklineData={[4, 7, 10, 14, 18]}
              href="#sec-chart"source="Environment Agency · 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Homes at significant coastal erosion risk, 2010–2050"
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

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Environment Agency — National Flood and Coastal Erosion Risk Management Strategy. gov.uk/government/publications/national-flood-and-coastal-erosion-risk-management-strategy-for-england--2</p>
            <p>Environment Agency — Shoreline Management Plans. Published by coastal operating authorities. Check your Flood Risk: flood.data.gov.uk</p>
            <p>DEFRA — Coastal erosion and managed realignment. gov.uk/guidance/coastal-erosion-risk-management</p>
            <p>Properties at risk figures are drawn from Shoreline Management Plan assessments of properties within coastal erosion risk zones over 20–50 year horizons. Properties lost figures are estimates from local authority coastal monitoring programmes. Projections incorporate UKCP18 sea level rise scenarios under intermediate emissions pathways.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
