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
  { num: 1, name: 'MBRRACE-UK', dataset: 'Saving Lives, Improving Mothers\u2019 Care', url: 'https://www.npeu.ox.ac.uk/mbrrace-uk', date: '2021', note: 'Black women 3.7 times more likely to die in childbirth than white women; disparity documented for over two decades' },
  { num: 2, name: 'NHS England', dataset: 'Mental Health Act Statistics, Annual Figures', url: 'https://www.england.nhs.uk/mental-health/data', date: '2022/23', note: 'Black people detained at approximately 4 times the rate of white people per million of population' },
  { num: 3, name: 'Diabetes UK / NHS Digital', dataset: 'Diabetes and Ethnicity', url: 'https://www.diabetes.org.uk', date: '2024', note: 'Pakistani-heritage 3.5x, Bangladeshi-heritage 3.8x higher risk of Type 2 diabetes vs white British' },
  { num: 4, name: 'NHS Race and Health Observatory', dataset: 'Ethnic Inequalities in Healthcare', url: 'https://www.nhsrho.org', date: '2020', note: 'Recommended mandatory ethnicity data collection; implementation slow and patchy' },
];

// -- Types ------------------------------------------------------------------

interface RacialHealthGapData {
  maternalMortalityRatio: Array<{ group: string; riskRatio: number }>
  diabetesRisk: Array<{ group: string; riskMultiplier: number }>
  mentalHealthActDetentions: Array<{
    year: number
    blackRatePerMillion: number
    whiteRatePerMillion: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1)
}

// -- Page -------------------------------------------------------------------

export default function RacialHealthGapPage() {
  const [data, setData] = useState<RacialHealthGapData | null>(null)

  useEffect(() => {
    fetch('/data/racial-health-gap/racial_health_gap.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const detentionSeries: Series[] = data
    ? [
        {
          id: 'black',
          label: 'Black (detentions per million)',
          colour: '#E63946',
          data: data.mentalHealthActDetentions.map(d => ({
            date: yearToDate(d.year),
            value: d.blackRatePerMillion,
          })),
        },
        {
          id: 'white',
          label: 'White (detentions per million)',
          colour: '#6B7280',
          data: data.mentalHealthActDetentions.map(d => ({
            date: yearToDate(d.year),
            value: d.whiteRatePerMillion,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Racial Health Inequalities" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Racial Health Inequalities"
          question="Are health outcomes fair across ethnic groups?"
          finding="Black women are 3.7 times more likely to die in childbirth than white women. Black people are 4 times more likely to be detained under the Mental Health Act. South Asian people are up to 3.8 times more likely to develop Type 2 diabetes."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Black women are 3.7 times more likely to die in childbirth than white women — a disparity documented in MBRRACE-UK reports for over two decades that has not narrowed.<Cite nums={1} /> The gap is not explained by socioeconomic factors alone: Black women at all income levels face elevated risk, and the evidence increasingly points to differential treatment within healthcare settings. Black people are detained under the Mental Health Act at approximately four times the rate of white people per million of population, a gap that has been growing;<Cite nums={2} /> they are more likely to be detained via police or courts rather than clinical pathways and less likely to receive talking therapies. Pakistani-heritage people are 3.5 times, and Bangladeshi-heritage people 3.8 times, more likely to develop Type 2 diabetes than white British people.<Cite nums={3} /> COVID-19 mortality in the first wave fell disproportionately on Black, Asian, and minority ethnic people even after adjusting for age, reflecting higher occupational exposure, worse housing, higher rates of underlying conditions, and worse outcomes when hospitalised.</p>
            <p>These disparities are not explained by genetics or individual behaviour; they reflect structural differences in housing quality, employment, income, and access to care. The NHS Race and Health Observatory, established in 2020, has recommended mandatory ethnicity data collection at all healthcare touchpoints and culturally competent service redesign, but implementation has been slow and patchy.<Cite nums={4} /> The populations most affected — Black, South Asian, and mixed-heritage communities — are also more likely to live in deprived areas with fewer GP surgeries per head, longer waits for specialist referrals, and less access to preventive services.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-detentions', label: 'Mental Health Detentions' },
          { id: 'sec-maternal', label: 'Maternal Mortality' },
          { id: 'sec-diabetes', label: 'Diabetes Risk' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Black maternal mortality vs white"
              value="3.7"
              unit="&times;"
              direction="flat"
              polarity="up-is-bad"
              changeText="Unchanged for 20 years · 2019–21 MBRRACE data"
              sparklineData={[3.5, 3.6, 3.7, 3.7, 3.8, 3.7, 3.7, 3.7]}
              href="#sec-detentions"source="MBRRACE-UK · 2021"
            />
            <MetricCard
              label="Mental Health Act: Black vs white detention rate"
              value="4.0"
              unit="&times;"
              direction="up"
              polarity="up-is-bad"
              changeText="Black people detained at 4&times; rate per million vs white · rising"
              sparklineData={[3.5, 3.7, 3.8, 3.9, 4.0, 4.0]}
              href="#sec-maternal"source="NHS Mental Health Act Stats · 2022/23"
            />
            <MetricCard
              label="South Asian T2 diabetes risk vs white"
              value="3.5"
              unit="&times;"
              direction="flat"
              polarity="up-is-bad"
              changeText="Pakistani-heritage 3.5&times;, Bangladeshi 3.8&times; higher risk"
              sparklineData={[3.2, 3.3, 3.4, 3.5, 3.5, 3.5]}
              href="#sec-diabetes"source="Diabetes UK / NHS Digital"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-detentions" className="mb-12">
            <LineChart
              title="Compulsory Mental Health Act detentions by ethnicity, 2016–2022"
              subtitle="Detentions per million population. Black people are detained at roughly four times the rate of white people — a gap that has been widening."
              series={detentionSeries}
              yLabel="Detentions per million population"
              source={{
                name: 'NHS England',
                dataset: 'Mental Health Act Statistics, Annual Figures',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-maternal" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">Maternal mortality risk ratio by ethnicity</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Relative risk of maternal death compared to white women. England &amp; Wales, 2019–21.</p>
            {data && (
              <div className="space-y-3">
                {[...data.maternalMortalityRatio].sort((a, b) => b.riskRatio - a.riskRatio).map((item, idx) => (
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
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: MBRRACE-UK — Saving Lives, Improving Mothers&rsquo; Care, 2021</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-diabetes" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">Type 2 diabetes risk by ethnicity</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Relative risk compared to white British population. South Asian heritage populations face substantially elevated risk.</p>
            {data && (
              <div className="space-y-3">
                {[...data.diabetesRisk].sort((a, b) => b.riskMultiplier - a.riskMultiplier).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-32 text-sm text-wiah-black flex-shrink-0">{item.group}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{
                          width: `${(item.riskMultiplier / 4.5) * 100}%`,
                          backgroundColor: item.riskMultiplier > 3 ? '#E63946' : item.riskMultiplier > 1.5 ? '#F4A261' : '#6B7280',
                        }}
                      />
                    </div>
                    <div className="w-16 text-right text-sm font-mono text-wiah-black">{item.riskMultiplier.toFixed(1)}&times;</div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: Diabetes UK — Diabetes and ethnicity; NHS Digital QOF ethnicity data</p>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>MBRRACE-UK — Saving Lives, Improving Mothers&rsquo; Care. Maternal mortality risk ratios by ethnicity. npeu.ox.ac.uk/mbrrace-uk</p>
            <p>NHS Race and Health Observatory — Ethnic inequalities in healthcare. nhsrho.org</p>
            <p>NHS England — Mental Health Act Statistics, Annual Figures. england.nhs.uk/mental-health/data</p>
            <p>Diabetes UK — Diabetes and ethnicity overview. diabetes.org.uk</p>
            <p>Ethnic group comparisons are age-standardised where data permits. Maternal mortality risk ratios are adjusted for age. Mental Health Act detention rates are per million population by ethnic group. Diabetes risk multipliers are from population-based studies and may not reflect current clinical population characteristics.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
