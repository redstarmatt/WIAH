'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface OTCMedicineData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    otcPriceIndexVs2021: number
    prescriptionCharge: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function OverTheCounterMedicineCostsPage() {
  const [data, setData] = useState<OTCMedicineData | null>(null)

  useEffect(() => {
    fetch('/data/over-the-counter-medicine-costs/over_the_counter_medicine_costs.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'otcPriceIndexVs2021',
          label: 'OTC price change vs 2021 (%)',
          colour: '#F4A261',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.otcPriceIndexVs2021 })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Medicine Costs" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Medicines Access"
          question="Can People Afford Basic Medicines?"
          finding="Common over-the-counter medicines have risen 40-70% in price since 2021, with ibuprofen now costing more than an NHS prescription charge for many — pushing low-income households to go untreated."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Over-the-counter (OTC) medicines — drugs available without a prescription from pharmacies, supermarkets, and other retailers — form a critical first line of self-care for minor illness, pain, and common conditions. The UK's NHS encourages OTC self-management for minor conditions such as headaches, mild infections, hay fever, and musculoskeletal pain, and the 2019 'Conditions for which over-the-counter items should not be routinely prescribed' guidance was intended to reduce GP prescribing costs by shifting management of these conditions to self-care. But the significant inflation in OTC medicine prices since 2021 has undermined this strategy: if people cannot afford OTC treatment, they will either go untreated or seek NHS prescriptions, increasing system costs rather than reducing them.</p>
            <p>The price rise in OTC medicines has been substantial. Analysis by the Proprietary Association of Great Britain (PAGB) and independent pharmacoepidemiology researchers found average OTC medicine price increases of 40-70% between January 2021 and January 2024. The largest rises were in paracetamol and ibuprofen — the most commonly used OTC analgesics — which saw price increases of 60-80% in some retail channels. A box of 16 ibuprofen tablets that cost approximately 25p in 2021 cost 45-50p in 2024. While the absolute costs remain low for most households, for those on very tight budgets — people in the bottom income quintile spending over 90% of income on necessities — even small additional costs can be insurmountable.</p>
            <p>The comparison with NHS prescription costs is illustrative. The NHS prescription charge in England is £9.90 per item (2024), but approximately 90% of prescriptions are dispensed free of charge — the vast majority of people are exempt either because they are on a low income (qualifying for HC2 certificate), are under 16, are over 60, are pregnant or recently post-natal, or have certain chronic conditions that attract lifetime exemption. For those who do pay the prescription charge, the NHS prescription is often cheaper than buying OTC: ibuprofen 400mg tablets are available on prescription at £9.90 per item, but a prescription for 84 tablets costs the same as a box of 28.</p>
            <p>The 'Pharmacy First' scheme, launched in January 2024, allows community pharmacies to treat seven minor conditions — including sinusitis, sore throat, earache, infected insect bites, impetigo, shingles, and urinary tract infections in women — and to supply prescription-only medicines without a GP referral. This represents a significant expansion of the pharmacist's clinical role and is intended to reduce GP appointment demand. Early data suggests uptake has been strong in areas with good pharmacy capacity but limited in areas with fewer pharmacies. The scheme does not address OTC cost affordability directly — it covers conditions requiring clinical assessment and prescription treatment, not routine self-care with OTC products.</p>
            <p>Medicines access inequality — the differential in ability to manage health conditions through self-care based on income — is not new but has become more acute during the cost of living crisis. Research by Healthwatch and the Health Foundation consistently finds that people in lower socioeconomic groups are less likely to self-medicate with OTC treatments and more likely to leave conditions untreated, with subsequent consequences for health outcomes and NHS burden. The Treasury's approach — maintaining NHS prescription charge exemptions and the NHS Low Income Scheme (HC1/HC2 certificates) — provides a partial safety net, but many people who are eligible for exemptions do not know about them or find the application process difficult.</p>
          </div>
        </section>

        <SectionNav
          sections={[
            { id: 'sec-metrics', label: 'Metrics' },
            { id: 'sec-chart', label: 'Chart' },
            { id: 'sec-sources', label: 'Sources' },
          ]}
        />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="OTC medicine price rise since 2021"
              value="+55%"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+55% avg across common OTC products"
              sparklineData={[0, 2, 4, 5, 8, 30, 45, 50, 55]}
              source="PAGB / ONS · Consumer Price Index 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="NHS prescription charge 2024"
              value="£9.90"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="£9.90 per item · 90% exempt via exemptions"
              sparklineData={[8.60, 8.80, 8.80, 9.15, 9.35, 9.35, 9.35, 9.65, 9.90]}
              source="NHS Business Services Authority 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Patients avoiding OTC treatment"
              value="4.2m"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="4.2m unable to afford OTC treatment"
              sparklineData={[2.0, 2.1, 2.2, 2.3, 2.5, 3.2, 3.8, 4.0, 4.2]}
              source="Healthwatch England / PAGB 2024"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Over-the-counter medicine price inflation, 2016–2024"
              subtitle="Average price increase of common OTC medicines relative to January 2021 baseline (%)."
              series={series}
              yLabel="Price change vs 2021 (%)"
              source={{ name: 'PAGB', dataset: 'OTC Medicine Price Tracker', frequency: 'annual' }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>OTC medicine price data from PAGB (Proprietary Association of Great Britain) price monitoring and ONS Consumer Price Index health sub-components. NHS prescription charge history from NHS Business Services Authority. Patients forgoing treatment estimated from Healthwatch England survey data and Health Foundation analysis of medicines access inequality. Pharmacy First scheme data from NHS England primary care statistics.</p>
          </div>
        </section>
      </main>
    </>
  )
}
