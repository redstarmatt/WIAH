'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface TimeSeriesPoint {
  year: number
  highRiskJobs: number
}

interface AutomationDisplacementData {
  timeSeries: TimeSeriesPoint[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function AutomationDisplacementPage() {
  const [data, setData] = useState<AutomationDisplacementData | null>(null)

  useEffect(() => {
    fetch('/data/automation-displacement/automation_displacement.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const highRiskSeries: Series[] = data
    ? [{
        id: 'high-risk',
        label: 'Jobs at high automation risk',
        colour: '#6B7280',
        data: data.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.highRiskJobs,
        })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Automation & Displacement" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Automation &amp; Displacement"
          question="How Many Jobs Will Automation Replace?"
          finding="7.4 million UK jobs are at high risk of automation — but history suggests new jobs are created faster than old ones disappear."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>By 2024, IPPR and ONS analysis put 7.6 million UK jobs &mdash; approximately 21% of the workforce &mdash; at high risk of substantial automation within the next decade, up from around 4.2 million in 2017. Successive technology waves have driven the rise: robotics in logistics and manufacturing, machine learning in financial services, and generative AI across a far wider range of cognitive tasks. ONS analysis finds that 37% of all UK jobs now have significant AI exposure, including many professional and graduate-level roles in law, finance, and media that previously appeared safe. Historical precedent offers cautious grounds for optimism: each previous wave of automation &mdash; from mechanised weaving to computerised clerical work &mdash; has been followed by net job creation, even as specific occupations were substantially reduced.</p>
            <p>The distributional challenge is more acute than the aggregate one. Transport and logistics face the highest exposure, with 72% of sector jobs technically automatable; administrative, clerical, and retail roles are also heavily exposed. These are disproportionately lower-paid, lower-skilled occupations, concentrating displacement risk on workers least able to fund a career transition. The UK&rsquo;s adult education and retraining infrastructure is not currently scaled to absorb a transition in which millions of displaced workers would need to move into emerging roles in green energy, healthcare, or technology.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'High-risk Jobs' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Jobs at high automation risk"
              value="7.6m"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="21% of workforce &middot; transport and admin most exposed"
              sparklineData={[4200000, 4800000, 5400000, 5900000, 6200000, 6800000, 7400000, 7600000]}
              href="#sec-chart"source="IPPR / ONS &middot; 2024"
            />
            <MetricCard
              label="AI-exposed occupations"
              value="37%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="of all jobs have significant AI exposure"
              sparklineData={[22, 25, 27, 29, 31, 33, 35, 37]}
              href="#sec-chart"source="ONS &middot; Generative AI and UK Employment 2023"
            />
            <MetricCard
              label="New green jobs forecast"
              value="2m"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="net-zero transition offsetting some displacement"
              sparklineData={[200000, 400000, 600000, 900000, 1200000, 1500000, 1800000, 2000000]}
              href="#sec-chart"source="CCC / Green Jobs Taskforce &middot; 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="UK jobs at high risk of automation, 2017&ndash;2024"
              subtitle="Number of jobs where the majority of tasks are technically automatable using current or near-term technology."
              series={highRiskSeries}
              yLabel="Number of jobs"
              source={{
                name: 'IPPR / ONS',
                dataset: 'Automation Risk in UK Employment',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>IPPR &mdash; Technology and the Future of Work. ippr.org</p>
            <p>ONS &mdash; Which Occupations Are at Highest Risk of Being Automated? ons.gov.uk</p>
            <p>ONS &mdash; Generative AI and the UK Labour Market. ons.gov.uk</p>
            <p>Green Jobs Taskforce &mdash; Report to Government. gov.uk/government/publications/green-jobs-taskforce-report</p>
            <p>Automation risk is assessed by matching occupation-level task descriptions (SOC 2020) to a taxonomy of automatable tasks, based on the methodology developed by Frey and Osborne (2013) and extended by ONS to reflect current AI capabilities. High risk is defined as &gt;70% of tasks being technically automatable. Green jobs forecast is a central scenario from Climate Change Committee modelling. Actual outcomes will depend on policy, investment, and pace of net-zero transition.</p>
          </div>
        </section>
      </main>
    </>
  )
}
