'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series, Annotation } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import PositiveCallout from '@/components/PositiveCallout'

// -- Types ------------------------------------------------------------------

interface SexualHealthData {
  national: {
    stiDiagnoses: {
      timeSeries: Array<{ year: number; thousands: number }>
    }
    clinicClosures: {
      timeSeries: Array<{ year: number; clinics: number }>
    }
    gonorrhoeaRate: {
      timeSeries: Array<{ year: number; ratePer100k: number }>
    }
  }
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1)
}

// -- Page -------------------------------------------------------------------

export default function SexualHealthPage() {
  const [data, setData] = useState<SexualHealthData | null>(null)

  useEffect(() => {
    fetch('/data/sexual-health/sexual_health.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const stiSeries: Series[] = data
    ? [{
        id: 'sti-diagnoses',
        label: 'STI diagnoses (thousands)',
        colour: '#264653',
        data: data.national.stiDiagnoses.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.thousands,
        })),
      }]
    : []

  const clinicSeries: Series[] = data
    ? [{
        id: 'clinics',
        label: 'Sexual health clinics',
        colour: '#E63946',
        data: data.national.clinicClosures.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.clinics,
        })),
      }]
    : []

  const gonorrhoeaSeries: Series[] = data
    ? [{
        id: 'gonorrhoea',
        label: 'Gonorrhoea rate per 100,000',
        colour: '#E63946',
        data: data.national.gonorrhoeaRate.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.ratePer100k,
        })),
      }]
    : []

  const stiAnnotations: Annotation[] = [
    { date: yearToDate(2020), label: '2020: COVID clinic closures' },
  ]

  return (
    <>
      <TopicNav topic="Sexual Health" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Sexual Health"
          question="Is England&rsquo;s Sexual Health System Coping?"
          finding="STI diagnoses have returned to pre-pandemic levels at 432,000 per year, while 40% of sexual health clinics have closed since 2014. Gonorrhoea rates have nearly doubled in a decade, with growing antibiotic resistance."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England diagnoses over 430,000 new STIs each year, with gonorrhoea and syphilis surging to levels not seen since the 1970s while chlamydia diagnoses have fallen. The infrastructure for managing sexual health has been systematically reduced: since commissioning transferred to local authorities in 2013, specialist clinics fell from 297 to 176 &mdash; a 41&percnt; reduction &mdash; and the public health grant funding them has been cut over 25&percnt; in real terms since 2015. Online testing grew from fewer than 200,000 orders in 2016 to over 3.5 million in 2024, partially compensating for clinic closures for asymptomatic cases but not for those needing physical examination or complex care. New HIV diagnoses have fallen 35&percnt; since 2014, driven by PrEP, treatment as prevention, and expanded testing &mdash; a genuine success &mdash; though late diagnosis still accounts for 42&percnt; of new cases. The under-18 conception rate fell from 42 per 1,000 in 2007 to 14 per 1,000 in 2022 &mdash; the lowest on record and one of the longest-running positive trends in UK public health.</p>
            <p>The burden is not evenly distributed. Young people aged 15&ndash;24 account for nearly half of all STI diagnoses despite representing 12&percnt; of the population; Black ethnic groups have chlamydia and gonorrhoea rates two to three times the national average; men who have sex with men face disproportionate rates of syphilis and gonorrhoea. These disparities reflect both structural barriers to access and the consequences of targeted screening programmes that have been scaled back. Rural populations face clinic waits significantly longer than urban areas, and the growing antibiotic resistance in gonorrhoea poses a risk that falls most heavily on those with the fewest alternative testing or treatment options.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-sti', label: 'STI Diagnoses' },
          { id: 'sec-clinics', label: 'Clinic Closures' },
          { id: 'sec-gonorrhoea', label: 'Gonorrhoea' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="STI diagnoses per year"
              value="432K"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 &middot; Returned to pre-COVID levels &middot; Gonorrhoea &amp; syphilis surging"
              sparklineData={[436, 435, 420, 423, 449, 468, 318, 389, 401, 416, 432]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Sexual health clinics remaining"
              value="176"
              direction="down"
              polarity="up-is-good"
              changeText="2024 &middot; Down from 297 in 2014 &middot; 41% reduction in a decade"
              sparklineData={[297, 285, 264, 241, 228, 218, 209, 198, 189, 182, 176]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Gonorrhoea rate"
              value="124"
              unit="per 100K"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 &middot; Nearly doubled since 2014 &middot; Antibiotic resistance growing"
              sparklineData={[67, 73, 65, 78, 99, 110, 73, 96, 113, 118, 124]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-sti" className="mb-12">
            <LineChart
              title="STI diagnoses, England, 2014&ndash;2024"
              subtitle="Total new STI diagnoses per year (thousands). All infections combined."
              series={stiSeries}
              annotations={stiAnnotations}
              yLabel="Diagnoses (thousands)"
              source={{
                name: 'UK Health Security Agency',
                dataset: 'STI annual data tables',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-clinics" className="mb-12">
            <LineChart
              title="Sexual health clinics in England, 2014&ndash;2024"
              subtitle="Number of specialist sexual health clinics. 41% have closed in a decade."
              series={clinicSeries}
              yLabel="Clinics"
              source={{
                name: 'BASHH / UKHSA',
                dataset: 'Clinic survey and GUMCAD',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-gonorrhoea" className="mb-12">
            <LineChart
              title="Gonorrhoea diagnosis rate, England, 2014&ndash;2024"
              subtitle="New gonorrhoea diagnoses per 100,000 population. Antibiotic resistance is an emerging concern."
              series={gonorrhoeaSeries}
              yLabel="Rate per 100,000"
              source={{
                name: 'UKHSA',
                dataset: 'Sexually transmitted infections surveillance',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Teenage pregnancy: 72% fall since 1999"
            value="−72%"
            unit="under-18 conceptions since 1999"
            description="The under-18 conception rate fell from 42 per 1,000 women aged 15–17 in 1999 — when the UK had one of the highest rates in Western Europe — to 14 per 1,000 in 2022. That is 14,233 conceptions, down from around 40,000 at the peak. The 2022 figure is the lowest since ONS records began. The 23-year decline is the result of sustained investment in sex education, improved access to long-acting reversible contraception, and — most significantly — a generational shift in attitudes among young people. The UK has gone from an outlier to a comparative success story on this measure."
            source="Source: ONS — Conceptions in England and Wales 2022, published 2024. Nuffield Trust — Teenage Pregnancy indicator."
          />
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>UK Health Security Agency &mdash; Sexually transmitted infections and screening for chlamydia in England. Data from GUMCAD STI Surveillance System. Published annually. Retrieved March 2026.</p>
            <p>British Association for Sexual Health and HIV &mdash; Clinic survey data on service provision and capacity. Retrieved March 2026.</p>
            <p>STI diagnoses cover all infections reported through sexual health clinics in England. Online testing services increasingly captured in GUMCAD from 2020 onwards. Clinic counts reflect specialist sexual health services (GUM clinics and integrated services); some GP-based testing not included. The 2020 dip reflects COVID-related clinic closures and reduced testing, not a genuine decline in STI incidence.</p>
          </div>
        </section>
      </main>
    </>
  )
}
