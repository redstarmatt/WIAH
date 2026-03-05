'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface CmsEntry {
  year: number
  cmsCasesK: number
  nonCompliancePct: number
  arrearsM?: number
}

interface CmsData {
  timeSeries: CmsEntry[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function ChildMaintenanceEnforcementPage() {
  const [data, setData] = useState<CmsData | null>(null)

  useEffect(() => {
    fetch('/data/child-maintenance-enforcement/child_maintenance_enforcement.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'cmsCasesK',
          label: 'CMS cases (thousands)',
          colour: '#264653',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.cmsCasesK,
          })),
        },
        {
          id: 'arrearsM',
          label: 'Arrears (£ millions)',
          colour: '#E63946',
          data: data.timeSeries
            .filter(d => d.arrearsM !== undefined)
            .map(d => ({
              date: yearToDate(d.year),
              value: d.arrearsM as number,
            })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Child Maintenance Enforcement" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Child Maintenance Enforcement"
          question="Are Non-Resident Parents Paying Child Support?"
          finding="975,000 child maintenance cases are managed by the Child Maintenance Service &mdash; but &pound;394 million in arrears has accumulated, with 31% of paying parents non-compliant."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The Child Maintenance Service (CMS) managed 975,000 cases in 2023 &mdash; up from 620,000 in 2015, reflecting rising demand and the migration from the old Child Support Agency. Around 31% of paying parents are non-compliant: behind on payments, underpaying, or not paying at all. This proportion has barely moved in eight years. The result is &pound;394 million in accumulated arrears, up 64% since 2015. The fees structure introduced in 2014 &mdash; where receiving parents pay 4% of maintenance collected and paying parents pay 20% on top &mdash; has been widely criticised as a further disincentive for families already failed by private arrangements, including those affected by domestic abuse.</p>
            <p>Lone-parent families &mdash; more than 90% headed by women &mdash; are the family type most likely to be in poverty, and reliable maintenance payments can materially affect nutrition, housing stability, and educational outcomes for children. Enforcement powers including earnings deductions, bank account deductions, and driving disqualification are deployed inconsistently and slowly, while self-employed paying parents can structure income to minimise assessable earnings. A system non-compliant in nearly a third of cases, with &pound;394 million in outstanding arrears and fees charged to the very parents seeking enforcement, is failing the children it exists to protect.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Cases and Arrears' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="CMS cases"
              value="975k"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="rising demand &middot; private arrangements breaking down"
              sparklineData={[620, 680, 740, 800, 860, 900, 930, 960, 975]}
              href="#sec-chart"source="DWP &middot; Child Maintenance Service Statistics 2023"
            />
            <MetricCard
              label="Non-compliance rate"
              value="31%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="unchanged for years &middot; enforcement weak"
              sparklineData={[29, 29, 30, 30, 30, 31, 31, 31, 31]}
              href="#sec-chart"source="DWP &middot; Child Maintenance Service Statistics 2023"
            />
            <MetricCard
              label="Total arrears"
              value="&pound;394m"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+64% since 2015 &middot; real harm to single-parent families"
              sparklineData={[240, 270, 290, 310, 330, 350, 365, 380, 394]}
              href="#sec-chart"source="DWP &middot; Child Maintenance Service Statistics 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Child Maintenance Service cases and arrears, 2015&ndash;2023"
              subtitle="CMS cases (thousands, blue) and total accumulated arrears (&pound; millions, red). Both have grown substantially, reflecting rising demand and persistent non-compliance."
              series={series}
              yLabel="Number"
              source={{
                name: 'Department for Work and Pensions',
                dataset: 'Child Maintenance Service Statistics',
                frequency: 'quarterly',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Department for Work and Pensions &mdash; Child Maintenance Service Statistics. Quarterly statistical release. gov.uk/government/collections/child-maintenance-service-statistics</p>
            <p>Gingerbread &mdash; Analysis of CMS enforcement and outcomes for single-parent families. gingerbread.org.uk/policy-campaigns/</p>
            <p>CMS cases include all cases on the Direct Pay and Collect and Pay services at the end of each quarter. Annual figures represent end-Q4 (March) snapshots. Non-compliance rate is percentage of paying parents not fully compliant with payment schedule. Arrears are total outstanding debt accumulated across all open and closed cases. Arrears data are only available for selected years as full series is not published.</p>
          </div>
        </section>
      </main>
    </>
  )
}
