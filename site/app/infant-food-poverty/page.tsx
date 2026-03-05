'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

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
            <p>Food poverty in infancy is qualitatively different from food poverty at other life stages. The nutritional requirements of infants are highly specific: breast milk or formula is the only appropriate food for the first six months of life, and adequate nutrition in infancy has long-term consequences for cognitive development, immune function, and physical growth. When families cannot afford adequate infant nutrition, the harm is not simply hunger in the present &mdash; it is developmental disadvantage that persists for years.</p>
            <p>Baby banks &mdash; voluntary sector organisations that provide essentials including formula, nappies, and weaning food to families in crisis &mdash; have expanded dramatically since 2018. The National Baby Bank Network reports that affiliated organisations served over 200,000 families in 2023, up from around 45,000 in 2018. The acceleration since 2021 reflects both the cost of living crisis and the growth of the baby bank sector itself, as public awareness increased and donations rose. Infant formula prices rose significantly between 2021 and 2023, with standard first-stage formula increasing from around &pound;8 to over &pound;12 per 800g tin &mdash; a cost that can amount to over &pound;50 per month for a formula-fed infant.</p>
            <p>The affordability problem with formula is distinctive because formula is not discretionary. Parents who formula-feed cannot substitute another product for it without potentially harming their baby. Unlike adult food poverty, where families can reduce portion sizes or substitute cheaper options, formula quantity cannot safely be reduced. Research by First Steps Nutrition Trust found evidence of parents diluting formula to make it last longer &mdash; a practice that is nutritionally dangerous and that no charitable network can fully prevent by distributing donated formula, because need exceeds supply.</p>
            <p>The breastfeeding picture complicates the narrative. The UK has one of the lowest breastfeeding continuation rates in Europe: while around 80% of babies are breastfed immediately after birth, only 48% are still receiving any breast milk at six weeks and fewer than 1% are exclusively breastfed at six months (against the WHO recommendation of six months exclusive breastfeeding). Low breastfeeding rates increase dependence on formula, and therefore on the ability to afford it. Support for breastfeeding in the UK &mdash; from health visitor contact, peer support, and employer policies &mdash; has been cut alongside other public health services, and the relationship between those cuts and breastfeeding rates is contested but plausible.</p>
            <p>The policy responses available include: expanding Healthy Start vouchers (which provide &pound;4.25 per week to eligible pregnant women and parents, widely considered insufficient); creating a national formula price cap; increasing free childcare provision to reduce the economic pressure on parents; and investing in infant feeding support services that were cut in the austerity period. The National Food Strategy recommended extending the Healthy Start scheme. The government has increased Healthy Start voucher values incrementally, but the pace of increase has not kept up with formula price inflation. In a country with a statutory minimum wage and a comprehensive welfare state, the persistence of infant food poverty is a choice about priorities as much as a failure of resources.</p>
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
              changeText="+344% since 2018 &middot; cost of living crisis"
              sparklineData={[45, 62, 88, 120, 165, 200]}
              onExpand={() => {}}
              source="National Baby Bank Network &middot; 2023"
            />
            <MetricCard
              label="Formula unaffordable"
              value="33%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="1 in 3 low-income parents &middot; infant health impact"
              sparklineData={[18, 18, 20, 22, 28, 33]}
              onExpand={() => {}}
              source="First Steps Nutrition Trust &middot; 2023"
            />
            <MetricCard
              label="Breastfeeding at 6 weeks"
              value="48%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="UK one of lowest in Europe &middot; support gap"
              sparklineData={[49, 49, 48, 48, 48, 48]}
              onExpand={() => {}}
              source="OHID &middot; Infant Feeding Statistics 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Families served by baby banks, 2018&ndash;2023"
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
            <p>National Baby Bank Network &mdash; Annual Impact Report 2023. littlevillagehq.org and affiliated networks</p>
            <p>First Steps Nutrition Trust &mdash; Infant feeding in England (2023). firststepsnutrition.org</p>
            <p>OHID (Office for Health Inequalities and Disparities) &mdash; Infant Feeding Statistics. gov.uk</p>
            <p>National Food Strategy &mdash; Independent Review (2021). nationalfoodstrategy.org</p>
            <p>Baby bank family figures drawn from National Baby Bank Network affiliated organisation reporting. Formula affordability data from First Steps Nutrition Trust survey of low-income parents (n=1,200+). Breastfeeding rates from NHS Digital/OHID annual collection. UK breastfeeding rates are among the lowest in Europe according to WHO/UNICEF tracking data.</p>
          </div>
        </section>
      </main>
    </>
  )
}
