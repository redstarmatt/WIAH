'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface GpListSizeDataPoint {
  year: number
  avgListSize: number
  pctOver3000: number
  consultationsPerDay?: number
}

interface GpListSizeData {
  topic: string
  lastUpdated: string
  timeSeries: GpListSizeDataPoint[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function GpListSizePage() {
  const [data, setData] = useState<GpListSizeData | null>(null)

  useEffect(() => {
    fetch('/data/gp-list-size/gp_list_size.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const listSizeSeries: Series[] = data
    ? [{
        id: 'avg-list-size',
        label: 'Average list size (patients per GP FTE)',
        colour: '#E63946',
        data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.avgListSize })),
      }]
    : []

  return (
    <>
      <TopicNav topic="GP List Size" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="GP List Size"
          question="Are GPs Overwhelmed by Patient Numbers?"
          finding="The average GP now looks after 2,271 patients &mdash; and in some practices, a single doctor covers over 4,000."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The average number of registered patients per GP full-time equivalent has risen from 1,891 in 2015 to 2,290 in 2024 &mdash; a 21% increase in nine years. This figure represents the average, meaning that half of all GPs work in practices where the list size is higher. Almost one in five GP partners (18.8%) work in practices where each GP FTE has more than 3,000 registered patients; in some individual practices, a single doctor may be responsible for over 4,000. The BMA and RCGP have recommended a maximum list size of 1,500 patients per GP &mdash; a standard that is now met by a minority of practices.</p>
            <p>List size is not synonymous with workload, but the correlation is strong. A registered patient generates a certain expected volume of consultations, prescriptions, referrals, test results, and administrative tasks per year. As list sizes grow, so does the volume of work flowing to each GP. Surveys by the BMA consistently find that GPs report working well beyond safe consultation volumes: the General Medical Council has suggested that 25 contacts per day represents a reasonable safety threshold for a GP, while surveys suggest the actual average is closer to 38. Some GPs report seeing over 50 patients in a single working day.</p>
            <p>The consequences are documented in patient safety literature. As consultation numbers rise, consultation quality falls: GPs have less time per patient, less cognitive bandwidth for complex problem-solving, and less opportunity for the careful listening that catches the diagnosis that does not fit the obvious pattern. Research published in the BMJ found that GPs working with list sizes above 2,000 patients had significantly higher rates of missed diagnoses and unplanned hospital admissions for their registered patients compared to those with smaller lists.</p>
            <p>Workforce numbers explain much of the trend. The NHS committed in 2019 to recruit 6,000 additional GPs by 2024 &mdash; a target that was not met. GP numbers have fallen in some regions despite international recruitment. The GP workforce is ageing: around 40% of GPs are over 50, and the retirement cohort exiting the profession is not being fully replaced by new entrants. Younger GPs are also more likely to work part-time, reducing the effective FTE available relative to headcount. The workforce is moving in the wrong direction relative to population growth.</p>
            <p>Large list sizes and high workloads are primary drivers of GP burnout, early retirement, and career exit. The irony is circular: high workloads cause GPs to leave, leaving list sizes for remaining colleagues larger still. Breaking this cycle requires both expanding training numbers, which takes time, and making GP careers sustainable in the medium term through genuine workload management, administrative burden reduction, and working condition improvement. Without that, list sizes will continue to grow, consultation quality will continue to deteriorate, and the primary care foundation of the NHS will become increasingly fragile.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'List Size Trend' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Average GP list size"
              value="2,290"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+21% since 2015 &middot; recommended max: 1,500"
              sparklineData={[1891, 1943, 1987, 2031, 2078, 2134, 2224, 2290]}
              onExpand={() => {}}
              source="NHS Digital &middot; GP Workforce Statistics 2024"
            />
            <MetricCard
              label="GPs with 3,000+ patients"
              value="18.8%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="nearly 1 in 5 GPs over threshold"
              sparklineData={[7.2, 8.1, 9.3, 10.4, 11.8, 13.2, 16.6, 18.8]}
              onExpand={() => {}}
              source="NHS Digital &middot; GP Workforce Statistics 2024"
            />
            <MetricCard
              label="Daily consultations (avg)"
              value="38"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+7 since 2019 &middot; safety threshold: 25 per GMC"
              sparklineData={[31, 32, 33, 34, 35, 36, 37, 38]}
              onExpand={() => {}}
              source="BMA &middot; GP Workload Survey 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Average GP list size, England, 2015&ndash;2024"
              subtitle="Registered patients per GP full-time equivalent. BMA recommended maximum: 1,500. Figures cover all GP FTEs including salaried and locum doctors."
              series={listSizeSeries}
              yLabel="Patients per GP FTE"
              source={{
                name: 'NHS Digital',
                dataset: 'GP Workforce Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>NHS Digital &mdash; General Practice Workforce Statistics. Published monthly. digital.nhs.uk/data-and-information/publications/statistical/general-and-personal-medical-services</p>
            <p>NHS Digital &mdash; Patients Registered at a GP Practice. Published quarterly. digital.nhs.uk/data-and-information/publications/statistical/patients-registered-at-a-gp-practice</p>
            <p>BMA &mdash; GP Workload Survey. bma.org.uk/advice-and-support/nhs-delivery-and-workforce/pressures/pressures-in-general-practice-data-analysis</p>
            <p>List size figures are calculated by dividing total registered patients (from the Patients Registered at a GP Practice dataset, October snapshot) by total GP FTE (from General Practice Workforce Statistics, same month). GP FTE includes all GP partners, salaried GPs, and GP locums in regular positions. The 1,500 recommended maximum is the BMA General Practitioners Committee guidance. The 25-contact safety threshold is referenced in GMC and RCGP workload guidance. Daily consultation average from BMA GP workload survey 2024.</p>
          </div>
        </section>
      </main>
    </>
  )
}
