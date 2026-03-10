'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics';

// -- Types ------------------------------------------------------------------

interface TimeSeries {
  year: number
  babyBankFamiliesK?: number
  formulaUnaffordablePct?: number
}

interface InfantFoodPovertyData {
  timeSeries: TimeSeries[]
  breastfeedingRateAt6WeeksPct: number
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function InfantFoodPovertyPage() {
  const [data, setData] = useState<InfantFoodPovertyData | null>(null)

  useEffect(() => {
    fetch('/data/infant-food-poverty/infant_food_poverty.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const babyBankSeries: Series[] = data
    ? [{
        id: 'baby-bank-families',
        label: 'Baby bank families served (thousands)',
        colour: '#E63946',
        data: data.timeSeries
          .filter(d => d.babyBankFamiliesK !== undefined)
          .map(d => ({ date: yearToDate(d.year), value: d.babyBankFamiliesK as number })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Infant Food Poverty" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Infant Food Poverty"
          question="Are Babies and Toddlers Going Hungry?"
          finding="Baby banks served over 200,000 families in 2023, and 1 in 3 low-income parents says they have struggled to afford infant formula."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Food poverty in infancy causes developmental disadvantage that persists for years: breast milk or formula is the only appropriate food for the first six months of life, making adequate nutrition a non-discretionary necessity. Baby banks — voluntary organisations providing formula, nappies, and weaning food to families in crisis — served over 200,000 families in 2023, up from around 45,000 in 2018, a 344% rise driven by the cost-of-living crisis. Infant formula prices rose from around £8 to over £12 per 800g tin between 2021 and 2023 — more than £50 per month for a formula-fed infant. Research by First Steps Nutrition Trust found parents diluting formula to make it last longer, a practice that is nutritionally dangerous. Healthy Start vouchers provide £4.25 per week to eligible parents — widely considered insufficient and not keeping pace with formula price inflation.</p>
            <p>The UK has one of the lowest breastfeeding continuation rates in Europe: while around 80% of babies are breastfed at birth, only 48% receive any breast milk at six weeks and fewer than 1% are exclusively breastfed at six months against WHO guidance. Support for breastfeeding — health visitor contact, peer support — has been cut alongside other public health services. 1 in 3 low-income parents report struggling to afford formula. The burden falls disproportionately on lone-parent families, those on Universal Credit, and families in temporary accommodation where feeding routines are hardest to maintain. In a country with a statutory minimum wage and a comprehensive welfare state, the persistence of infant food poverty reflects a structural gap in nutrition policy for the youngest children.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Baby Banks' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Families served by baby banks"
              value="200k"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+344% since 2018 · cost of living crisis"
              sparklineData={[45, 62, 88, 120, 165, 200]}
              href="#sec-chart"source="National Baby Bank Network · 2023"
            />
            <MetricCard
              label="Formula unaffordable"
              value="33%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="1 in 3 low-income parents · infant health impact"
              sparklineData={[18, 18, 20, 22, 28, 33]}
              href="#sec-chart"source="First Steps Nutrition Trust · 2023"
            />
            <MetricCard
              label="Breastfeeding at 6 weeks"
              value="48%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="UK one of lowest in Europe · support gap"
              sparklineData={[49, 49, 48, 48, 48, 48]}
              href="#sec-chart"source="OHID · Infant Feeding Statistics 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Families served by baby banks, 2018–2023"
              subtitle="Total families receiving support from baby banks (thousands). Includes formula, nappies, weaning food, and other essentials."
              series={babyBankSeries}
              yLabel="Families (thousands)"
              source={{
                name: 'National Baby Bank Network',
                dataset: 'Annual Impact Report',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>National Baby Bank Network — Annual Impact Report 2023. littlevillagehq.org and affiliated networks</p>
            <p>First Steps Nutrition Trust — Infant feeding in England (2023). firststepsnutrition.org</p>
            <p>OHID (Office for Health Inequalities and Disparities) — Infant Feeding Statistics. gov.uk</p>
            <p>National Food Strategy — Independent Review (2021). nationalfoodstrategy.org</p>
            <p>Baby bank family figures drawn from National Baby Bank Network affiliated organisation reporting. Formula affordability data from First Steps Nutrition Trust survey of low-income parents (n=1,200+). Breastfeeding rates from NHS Digital/OHID annual collection. UK breastfeeding rates are among the lowest in Europe according to WHO/UNICEF tracking data.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
