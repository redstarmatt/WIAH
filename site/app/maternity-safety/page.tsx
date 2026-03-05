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

interface MaternitySafetyData {
  stillbirthRate: Array<{ year: number; ratePer1000: number }>
  maternalMortality: Array<{ period: string; ratePer100k: number }>
  ethnicDisparities: Array<{ group: string; riskRatio: number }>
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1)
}

// -- Page -------------------------------------------------------------------

export default function MaternitySafetyPage() {
  const [data, setData] = useState<MaternitySafetyData | null>(null)

  useEffect(() => {
    fetch('/data/maternity-safety/maternity_safety.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const stillbirthSeries: Series[] = data
    ? [{
        id: 'stillbirth',
        label: 'Stillbirth rate per 1,000 births',
        colour: '#2A9D8F',
        data: data.stillbirthRate.map(d => ({
          date: yearToDate(d.year),
          value: d.ratePer1000,
        })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Maternity Safety" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Maternity Safety"
          question="Is it safe to give birth in England?"
          finding="The stillbirth rate has halved since 2010 to a record low of 3.53 per 1,000 births. But Black women are 3.7 times more likely to die in childbirth than white women &mdash; a disparity that has not improved in 20 years."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The stillbirth rate in England has fallen from 5.1 per 1,000 births in 2010 to 3.53 in 2022 &mdash; a 31% reduction driven by the Saving Babies&rsquo; Lives Care Bundle, introduced in 2016, which standardised foetal movement monitoring, growth surveillance, smoking cessation support, and term induction policies. The picture on maternal mortality is far more troubling: the UK rate of 9.7 deaths per 100,000 maternities has barely moved in a decade, and the Ockenden Review (2022) found that hundreds of babies and multiple mothers died or were seriously harmed over 20 years at Shrewsbury and Telford NHS Trust due to understaffing, failure to escalate, and systemic reluctance to listen to women. NHS England&apos;s 2025 ambition &mdash; to halve stillbirth, neonatal death, maternal death, and brain injury rates from a 2010 baseline &mdash; has been partially met only for stillbirths.</p>
            <p>The starkest failure is the persistent racial disparity in maternal mortality: Black women in the UK are 3.7 times more likely to die during or shortly after pregnancy than white women, Asian women 1.8 times more likely &mdash; gaps documented in MBRRACE-UK reports for over 20 years without meaningful narrowing. Unconscious bias in clinical decision-making, higher rates of underlying conditions linked to socioeconomic deprivation, and barriers to antenatal education compound one another. Around 1 in 5 women experience birth as traumatic, with an estimated 30,000 developing PTSD annually &mdash; a burden concentrated among those who already faced the greatest clinical risk.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-stillbirth', label: 'Stillbirth Rate' },
          { id: 'sec-ethnicity', label: 'Ethnic Disparities' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Stillbirth rate"
              value="3.53"
              unit="/1,000 births"
              direction="down"
              polarity="up-is-bad"
              changeText="Record low &middot; down from 5.1 in 2010 &middot; target 1.6 by 2025"
              sparklineData={[5.1, 4.9, 4.7, 4.4, 4.2, 4.0, 3.8, 3.7, 3.53]}
              onExpand={() => {}}
              source="MBRRACE-UK &middot; 2022"
            />
            <MetricCard
              label="Maternal mortality rate"
              value="9.7"
              unit="/100,000"
              direction="flat"
              polarity="up-is-bad"
              changeText="Stubbornly high &middot; slight uptick in 2019&ndash;21 period"
              sparklineData={[10.1, 9.6, 9.7, 8.79, 9.7]}
              onExpand={() => {}}
              source="MBRRACE-UK &middot; 2019&ndash;21"
            />
            <MetricCard
              label="Black vs white maternal mortality risk"
              value="3.7"
              unit="&times;"
              direction="flat"
              polarity="up-is-bad"
              changeText="Unchanged for 20 years &middot; BAME maternal mortality gap persistent"
              sparklineData={[3.5, 3.7, 3.8, 3.7, 3.7, 3.8, 3.7, 3.7, 3.7]}
              onExpand={() => {}}
              source="MBRRACE-UK &middot; 2021"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-stillbirth" className="mb-12">
            <LineChart
              title="Stillbirth rate, England &amp; Wales, 2010&ndash;2022"
              subtitle="Stillbirths per 1,000 total births. A falling rate represents genuine improvement in perinatal safety."
              series={stillbirthSeries}
              yLabel="Stillbirths per 1,000 total births"
              source={{
                name: 'MBRRACE-UK',
                dataset: 'Perinatal Mortality Surveillance Report',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Progress on stillbirths"
            value="&minus;31%"
            unit=""
            description="The stillbirth rate has fallen by 31% since 2010 &mdash; driven by better monitoring, earlier induction policies, and the Saving Babies&rsquo; Lives Care Bundle introduced in 2016. This represents one of the most significant improvements in perinatal safety in a generation."
            source="MBRRACE-UK, Perinatal Mortality Surveillance Report, 2022"
          />
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-ethnicity" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">Maternal mortality risk ratio by ethnicity</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Relative risk of maternal death compared to white women. Black women are 3.7 times more likely to die.</p>
            {data && (
              <div className="space-y-3">
                {data.ethnicDisparities.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-20 text-sm text-wiah-black flex-shrink-0">{item.group}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{
                          width: `${(item.riskRatio / 4) * 100}%`,
                          backgroundColor: item.group === 'Black' ? '#E63946' : item.group === 'White' ? '#6B7280' : '#F4A261',
                        }}
                      />
                    </div>
                    <div className="w-16 text-right text-sm font-mono text-wiah-black">{item.riskRatio.toFixed(1)}&times;</div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: MBRRACE-UK &mdash; Saving Lives, Improving Mothers&rsquo; Care, 2021</p>
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>MBRRACE-UK &mdash; Mothers and Babies: Reducing Risk through Audits and Confidential Enquiries across the UK. Perinatal Mortality Surveillance Report and Saving Lives, Improving Mothers&rsquo; Care. npeu.ox.ac.uk/mbrrace-uk</p>
            <p>NHS England &mdash; Saving Babies&rsquo; Lives Care Bundle. Version 2 published 2019. england.nhs.uk/mat-transformation/saving-babies</p>
            <p>Maternal mortality is defined as the death of a woman while pregnant or within 42 days of the end of pregnancy (direct and indirect causes). The UK maternal mortality rate is expressed per 100,000 maternities and reported as a rolling three-year average to ensure statistical reliability.</p>
            <p>Ethnic disparity risk ratios are age-standardised and drawn from MBRRACE-UK confidential enquiry data covering 2019&ndash;21. The three-year rolling average methodology is used to ensure sufficient case numbers for meaningful analysis.</p>
          </div>
        </section>
      </main>
    </>
  )
}
