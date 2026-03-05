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
            <p>Estimates of automation risk in UK employment have risen steadily since 2017, driven by successive waves of technology: robotics in logistics and manufacturing, machine learning in financial services and insurance, and generative AI across a far wider range of cognitive tasks. By 2024, IPPR and ONS analysis suggested that 7.6 million jobs &mdash; approximately 21% of the UK workforce &mdash; are at high risk of being substantially automated within the next decade. This figure has grown from around 4.2 million in 2017, though it is important to note that &ldquo;at risk&rdquo; does not mean &ldquo;will disappear&rdquo;: it means the tasks involved are technically automatable with existing or near-existing technology.</p>
            <p>The sectoral distribution of risk is highly uneven. Transport and logistics face the highest exposure &mdash; 72% of jobs in the sector involve tasks that are technically automatable, from HGV driving to warehouse picking and parcel sorting. Administrative and clerical occupations are also highly exposed, as are many retail jobs. At the other end of the spectrum, healthcare and education face the lowest automation risk: jobs involving complex human interaction, clinical judgment, and relational work are substantially harder to automate. This distribution means automation risk is unevenly distributed by income, geography, and educational attainment &mdash; concentrating most heavily on the lower-paid workers who have least ability to absorb a job transition.</p>
            <p>The historical evidence provides grounds for cautious optimism. Automation has disrupted labour markets repeatedly since the industrial revolution &mdash; from the mechanisation of weaving to the computerisation of clerical work &mdash; and in each case, aggregate employment has been maintained or grown, even as specific occupations have been substantially reduced. New technologies create new industries and new occupations: the internet destroyed thousands of travel agent jobs and created millions of software engineer, data analyst, and digital marketing jobs that did not previously exist. There is no strong economic reason to believe the current wave will be different in its long-run aggregate effects.</p>
            <p>The distributional challenge is more acute than the aggregate one. History also shows that the workers displaced by automation are often not the workers who benefit from the new jobs created. A redundant warehouse operative in Stoke faces different barriers to becoming a prompt engineer or a renewable energy installer than the aggregate employment statistics might suggest. The pace of transition matters: an economy that generates 2 million new jobs over a decade while displacing 7 million old ones has a significant transitional problem even if it is fine in the long run. The UK&rsquo;s adult education and retraining infrastructure is not currently scaled to absorb that transition efficiently.</p>
            <p>Generative AI has added a new dimension to the automation debate. Unlike earlier waves of automation, which primarily affected manual and routine cognitive tasks, large language models are capable of performing sophisticated analytical, writing, coding, and advisory tasks &mdash; work previously associated with graduate-level employment and relatively high pay. ONS analysis suggests that 37% of UK jobs have significant AI exposure, including many that previously appeared safe. This does not mean all those jobs will disappear, but it does mean the nature of work in professional services, finance, law, and media will change substantially &mdash; and that no sector can assume immunity from the transition.</p>
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
              onExpand={() => {}}
              source="IPPR / ONS &middot; 2024"
            />
            <MetricCard
              label="AI-exposed occupations"
              value="37%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="of all jobs have significant AI exposure"
              sparklineData={[22, 25, 27, 29, 31, 33, 35, 37]}
              onExpand={() => {}}
              source="ONS &middot; Generative AI and UK Employment 2023"
            />
            <MetricCard
              label="New green jobs forecast"
              value="2m"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="net-zero transition offsetting some displacement"
              sparklineData={[200000, 400000, 600000, 900000, 1200000, 1500000, 1800000, 2000000]}
              onExpand={() => {}}
              source="CCC / Green Jobs Taskforce &middot; 2024"
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
