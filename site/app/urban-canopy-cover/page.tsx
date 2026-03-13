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

const editorialRefs: Reference[] = [
  { num: 1, name: 'Greater London Authority', dataset: 'London Urban Forest Report 2023', url: 'https://www.london.gov.uk/urban-forest', date: '2023' },
  { num: 2, name: 'Natural England', dataset: 'Monitor of Engagement with the Natural Environment (MENE)', url: 'https://www.gov.uk/government/collections/monitor-of-engagement-with-the-natural-environment-survey', date: '2023' },
  { num: 3, name: 'Trees and Design Action Group', dataset: 'National Street Tree Survey', url: 'https://www.tdag.org.uk', date: '2023' },
  { num: 4, name: 'Forestry Commission', dataset: 'Urban Tree Challenge Fund', url: 'https://www.gov.uk/guidance/urban-tree-challenge-fund', date: '2023' },
];

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
            <p>London&rsquo;s urban tree canopy covers around 21% of the city&rsquo;s surface area — above the European average but distributed extremely unequally.<Cite nums={1} /> In the wealthiest boroughs, residents have an average of 40 square metres of accessible green space per person; in the most deprived areas, that falls to 19 square metres.<Cite nums={2} /> Approximately 7,000 street trees are lost across the UK each year to development, utilities work, and disease.<Cite nums={3} /> The ash dieback epidemic is expected to kill up to 80% of the UK's ash trees, a significant component of urban canopy. Areas with low tree cover can be 5–7&deg;C warmer on hot days than nearby green spaces, a disparity that will intensify as climate change increases heatwave frequency and severity. Mature trees provide an estimated £1,000 per year in ecosystem services through cooling, air filtration, and stormwater management.</p>
            <p>The public health consequences of the canopy deficit fall predictably on the most deprived communities. People least likely to have air conditioning are also least likely to live near cooling green space; heat mortality in cities falls most heavily on older people, those with cardiovascular conditions, and those in fuel poverty. The Trees and Design Action Group estimates urban areas would need to double canopy cover over the next two decades to adequately buffer against climate and health risks.<Cite nums={3} /> Urban tree planting programmes exist in many councils but are consistently deprioritised in budget cuts; the Urban Tree Challenge Fund has planted approximately 200,000 trees since 2019 against an estimated need of 5 million across English towns and cities.<Cite nums={4} /></p>
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
              changeText="Above European avg · but inequitably distributed"
              sparklineData={[20.8, 21.0, 21.2, 21.3, 21.3, 21.4]}
              href="#sec-chart"source="Greater London Authority · Urban Forest 2023"
            />
            <MetricCard
              label="Deprivation gap"
              value="2.1&times;"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Affluent areas 40m&sup2; vs deprived 19m&sup2; per person"
              sparklineData={[1.9, 2.0, 2.0, 2.1, 2.1, 2.1]}
              href="#sec-chart"source="Natural England · MENE Survey 2023"
            />
            <MetricCard
              label="Street trees lost/year"
              value="7,000"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Development and disease · urban heat impact"
              sparklineData={[5200, 5800, 6800, 6900, 7000, 7000]}
              href="#sec-chart"source="Trees and Design Action Group · 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="London urban canopy cover, 2015–2023"
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

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Greater London Authority — London Urban Forest. Canopy cover estimated via aerial LiDAR and satellite imagery analysis. london.gov.uk/urban-forest</p>
            <p>Natural England — Monitor of Engagement with the Natural Environment (MENE). Green space access measured as accessible natural greenspace within 300m. gov.uk/government/collections/monitor-of-engagement-with-the-natural-environment-survey</p>
            <p>Trees and Design Action Group — National street tree survey data. tdag.org.uk</p>
            <p>Canopy cover figures are for Greater London only. Deprivation gap compares top and bottom quintile of Index of Multiple Deprivation. Street tree loss is estimated from council survey responses and Forestry Commission data; figures include removals due to disease, development, and storm damage.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
