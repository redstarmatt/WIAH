'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series, Annotation } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

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
            <p>England diagnoses over 430,000 new sexually transmitted infections each year. The headline figure masks a more complicated picture: chlamydia diagnoses have fallen, partly because the National Chlamydia Screening Programme narrowed its target age range, while gonorrhoea and syphilis have surged to levels not seen since the 1970s. The rise in gonorrhoea is particularly concerning because of growing antibiotic resistance &mdash; the UK Health Security Agency has identified cases resistant to first-line treatment, and the prospect of untreatable gonorrhoea is no longer theoretical.</p>
            <p>The infrastructure for managing sexual health has been systematically reduced. Since responsibility for commissioning sexual health services transferred from the NHS to local authorities in 2013, the number of specialist clinics has fallen from 297 to 176 &mdash; a 41% reduction. Public health grant funding, which pays for these services, has been cut by over 25% in real terms since 2015. Many remaining clinics operate on reduced hours, with waits of two weeks or more for non-urgent appointments in urban areas and significantly longer in rural regions.</p>
            <p>Online testing services have partially compensated for clinic closures, particularly for chlamydia and HIV. Over 3.5 million online STI tests were ordered in 2024, up from fewer than 200,000 in 2016. This shift has improved access for some groups but created gaps for others: people who need physical examination, treatment for symptomatic infections, or complex care such as post-exposure prophylaxis for HIV are still dependent on clinic capacity that is shrinking.</p>
            <p>The burden is not evenly distributed. Young people aged 15&ndash;24 account for nearly half of all STI diagnoses despite representing 12% of the population. Men who have sex with men face disproportionate rates of syphilis, gonorrhoea, and new HIV diagnoses. Black ethnic groups have chlamydia and gonorrhoea rates two to three times the national average. These disparities reflect both structural factors in access and the consequences of targeted screening programmes that have been scaled back.</p>
            <p>HIV remains the area of greatest progress. New HIV diagnoses have fallen by 35% since 2014, driven by PrEP availability, treatment as prevention, and expanded testing. England is close to meeting the UNAIDS 95-95-95 targets. But this success story coexists with a testing infrastructure under strain: late HIV diagnosis &mdash; where the virus has already damaged the immune system &mdash; still accounts for 42% of new diagnoses, predominantly among heterosexual men and women and communities with lower engagement with sexual health services.</p>
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
