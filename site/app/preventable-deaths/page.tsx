'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import PositiveCallout from '@/components/PositiveCallout'

// -- Types ------------------------------------------------------------------

interface PreventableDeathsData {
  avoidableMortality: Array<{ year: number; ratePer100k: number }>
  byRegion: Array<{ region: string; ratePer100k: number }>
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1)
}

// -- Page -------------------------------------------------------------------

export default function PreventableDeathsPage() {
  const [data, setData] = useState<PreventableDeathsData | null>(null)

  useEffect(() => {
    fetch('/data/preventable-deaths/preventable_deaths.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const mortalitySeries: Series[] = data
    ? [{
        id: 'avoidable',
        label: 'Avoidable mortality rate per 100,000',
        colour: '#2A9D8F',
        data: data.avoidableMortality.map(d => ({
          date: yearToDate(d.year),
          value: d.ratePer100k,
        })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Preventable Deaths" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Preventable Deaths"
          question="How many people die of preventable causes?"
          finding="Avoidable mortality has fallen 27% since 2010 to 218 per 100,000 &mdash; one of the NHS&rsquo;s quiet success stories. But the gap between London (166) and the North East (276) means preventable deaths are 66% more common in the poorest regions."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Avoidable mortality &mdash; deaths preventable through timely healthcare or public health action &mdash; has fallen 27% in England since 2010, from 293 to 218 per 100,000, one of the NHS&rsquo;s most sustained improvements. The primary driver has been cardiovascular disease: sharply lower deaths from ischaemic heart disease and stroke, driven by better statin prescribing, improved hypertension management, the smoking ban, and advances in acute cardiac treatment. Cancer survival improvements, particularly for breast, bowel, and prostate cancer, contributed further. COVID-19 interrupted the trend &mdash; avoidable mortality rose to 243 in 2020 before falling to 218 in 2021 &mdash; and whether the pre-pandemic trajectory resumes remains uncertain. Smoking still kills 74,600 people a year, drug misuse deaths have more than doubled since 2012, and obesity-related conditions are growing as cardiovascular gains plateau.</p>
            <p>The regional picture is troubling and has not improved. Avoidable mortality in the North East (276 per 100,000) is 66% higher than in London (166) &mdash; a gap reflecting accumulated disadvantage in deprivation, industrial legacy, healthcare access, and smoking and obesity rates. The North East, Yorkshire, and North West all sit substantially above the England average. These are not primarily NHS failures: they require coordinated action across housing, employment, welfare, and public health infrastructure &mdash; areas where investment has been cut most sharply in the regions where health need is greatest.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Mortality Trend' },
          { id: 'sec-regions', label: 'Regional Variation' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Avoidable mortality rate"
              value="218"
              unit="/100k"
              direction="down"
              polarity="up-is-bad"
              changeText="Down 27% from 293 in 2010 &middot; progress accelerated 2012&ndash;2019"
              sparklineData={[293, 275, 258, 242, 231, 243, 218]}
              href="#sec-chart"source="ONS Avoidable Mortality &middot; 2021"
            />
            <MetricCard
              label="North East rate"
              value="276"
              unit="/100k"
              direction="flat"
              polarity="up-is-bad"
              changeText="60% higher than London (166) &middot; gap not narrowing"
              sparklineData={[310, 298, 285, 270, 260, 268, 276]}
              href="#sec-regions"source="ONS &middot; 2021"
            />
            <MetricCard
              label="Fall since 2010"
              value="&minus;27"
              unit="%"
              direction="down"
              polarity="up-is-bad"
              changeText="293 &rarr; 218 per 100,000 &middot; biggest driver: cardiovascular improvements"
              sparklineData={[293, 275, 258, 242, 231, 243, 218]}
              href="#sec-regions"source="ONS &middot; 2021"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="27% fewer preventable deaths since 2010"
            value="&minus;27%"
            unit=""
            description="Avoidable mortality has fallen significantly since 2010, driven by better treatment of cardiovascular disease, improved cancer survival, and reduced smoking rates. This represents one of the NHS&rsquo;s most sustained improvements &mdash; thousands of people alive today who would not have survived under 2010 care standards."
            source="ONS Avoidable Mortality in the UK, 2021"
          />
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Avoidable mortality rate, England, 2010&ndash;2021"
              subtitle="Deaths considered avoidable given timely healthcare and public health interventions. Age-standardised rate per 100,000 population."
              series={mortalitySeries}
              yLabel="Deaths per 100,000 population"
              source={{
                name: 'ONS',
                dataset: 'Avoidable Mortality in the UK',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-regions" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">Avoidable mortality by region, 2021</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Age-standardised avoidable mortality rate per 100,000. North-South gradient clearly visible.</p>
            {data && (
              <div className="space-y-3">
                {[...data.byRegion].sort((a, b) => b.ratePer100k - a.ratePer100k).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-40 text-sm text-wiah-black flex-shrink-0 truncate">{item.region}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{
                          width: `${(item.ratePer100k / 300) * 100}%`,
                          backgroundColor: item.ratePer100k > 250 ? '#E63946' : item.ratePer100k < 190 ? '#2A9D8F' : '#6B7280',
                        }}
                      />
                    </div>
                    <div className="w-16 text-right text-sm font-mono text-wiah-black">{item.ratePer100k}</div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: ONS &mdash; Avoidable Mortality in the UK, 2021 release</p>
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>ONS &mdash; Avoidable mortality in the UK. Published annually. ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/causesofdeath/bulletins/avoidablemortalityinenglandandwales</p>
            <p>Avoidable mortality is defined using the ONS/Eurostat list of avoidable causes of death. It comprises &ldquo;preventable&rdquo; mortality (deaths amenable to primary prevention, such as lung cancer or road injuries) and &ldquo;amenable&rdquo; mortality (deaths amenable to healthcare, such as appendicitis or certain cancers). Rates are directly age-standardised to the European Standard Population 2013. Regional breakdown uses the nine Government Office Regions of England.</p>
          </div>
        </section>
      </main>
    </>
  )
}
