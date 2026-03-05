'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface UrbanCanopyCoverData {
  timeSeries: Array<{
    year: number
    londonCanopyPct: number
    streetTreesLostPerYear?: number
  }>
  deprivationGap: {
    mostAffluent: { greenSpaceM2: number }
    mostDeprived: { greenSpaceM2: number }
  }
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function UrbanCanopyCoverPage() {
  const [data, setData] = useState<UrbanCanopyCoverData | null>(null)

  useEffect(() => {
    fetch('/data/urban-canopy-cover/urban_canopy_cover.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const canopySeries: Series[] = data
    ? [{
        id: 'canopy',
        label: 'London canopy cover (%)',
        colour: '#2A9D8F',
        data: data.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.londonCanopyPct,
        })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Urban Canopy Cover" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Urban Canopy Cover"
          question="How Much Tree Cover Is There in Your City?"
          finding="London has more tree canopy than most European capitals, but the most deprived urban areas have half the green space of wealthy neighbourhoods."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>London&rsquo;s urban tree canopy covers around 21% of the city&rsquo;s surface area &mdash; a figure that sounds impressive until you look at what lies beneath it. That headline percentage masks extreme inequality. In the wealthiest boroughs, residents enjoy an average of 40 square metres of accessible green space per person. In the most deprived areas, that figure falls to 19 square metres. Trees are not evenly distributed across the city; they follow income, property values, and historical patterns of investment.</p>
            <p>The street tree loss figures reveal a troubling trend. Approximately 7,000 street trees are lost in the UK each year, removed by developers, damaged by utilities work, or felled because of disease. The ash dieback epidemic &mdash; caused by the fungus Hymenoscyphus fraxineus &mdash; has been particularly destructive: ash makes up around 12% of the UK&rsquo;s woodland and a significant proportion of urban street trees. The long-term ecological and amenity impact of this loss will take decades to become fully apparent.</p>
            <p>The urban heat island effect links directly to canopy cover. Areas with low tree cover in cities can be 5&ndash;7&deg;C warmer on hot days than nearby green spaces. As climate change increases the frequency and intensity of heatwaves, this disparity becomes a public health issue. The people least likely to have air conditioning &mdash; those in deprived neighbourhoods &mdash; are also least likely to live near cooling green space. Heat mortality in cities falls most heavily on older people, those with cardiovascular and respiratory conditions, and those in fuel poverty.</p>
            <p>National government has set tree planting targets &mdash; 30,000 hectares of new woodland per year by 2025 &mdash; but most of this is rural. Urban tree planting programmes exist in many councils, but they are under-resourced and frequently deprioritised when budgets are cut. The Trees and Design Action Group estimates that urban areas would need to double their canopy cover over the next two decades to adequately buffer against climate and health risks. At current rates of planting and loss, that target is not achievable.</p>
            <p>There is growing evidence that urban green space delivers measurable health, mental wellbeing, and air quality benefits beyond temperature reduction. Studies consistently show associations between access to green space and lower rates of depression, anxiety, and childhood obesity. The economic case for urban trees is strong: one mature tree provides an estimated &pound;1,000 of ecosystem services per year in cooling, air filtration, and stormwater management. But these benefits are being distributed unequally, and the political will to redress that through targeted planting in deprived areas has not yet materialised at the scale required.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Canopy Cover' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="London canopy cover"
              value="21.4%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Above European avg &middot; but inequitably distributed"
              sparklineData={[20.8, 21.0, 21.2, 21.3, 21.3, 21.4]}
              onExpand={() => {}}
              source="Greater London Authority &middot; Urban Forest 2023"
            />
            <MetricCard
              label="Deprivation gap"
              value="2.1&times;"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Affluent areas 40m&sup2; vs deprived 19m&sup2; per person"
              sparklineData={[1.9, 2.0, 2.0, 2.1, 2.1, 2.1]}
              onExpand={() => {}}
              source="Natural England &middot; MENE Survey 2023"
            />
            <MetricCard
              label="Street trees lost/year"
              value="7,000"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Development and disease &middot; urban heat impact"
              sparklineData={[5200, 5800, 6800, 6900, 7000, 7000]}
              onExpand={() => {}}
              source="Trees and Design Action Group &middot; 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="London urban canopy cover, 2015&ndash;2023"
              subtitle="Percentage of London&rsquo;s surface area covered by tree canopy. Measured by aerial survey and satellite analysis."
              series={canopySeries}
              yLabel="Canopy cover (%)"
              source={{
                name: 'Greater London Authority',
                dataset: 'Urban Forest Report',
                frequency: 'biennial',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Greater London Authority &mdash; London Urban Forest. Canopy cover estimated via aerial LiDAR and satellite imagery analysis. london.gov.uk/urban-forest</p>
            <p>Natural England &mdash; Monitor of Engagement with the Natural Environment (MENE). Green space access measured as accessible natural greenspace within 300m. gov.uk/government/collections/monitor-of-engagement-with-the-natural-environment-survey</p>
            <p>Trees and Design Action Group &mdash; National street tree survey data. tdag.org.uk</p>
            <p>Canopy cover figures are for Greater London only. Deprivation gap compares top and bottom quintile of Index of Multiple Deprivation. Street tree loss is estimated from council survey responses and Forestry Commission data; figures include removals due to disease, development, and storm damage.</p>
          </div>
        </section>
      </main>
    </>
  )
}
