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
            <p>The Child Maintenance Service (CMS) manages nearly a million cases involving payments from non-resident parents &mdash; overwhelmingly fathers &mdash; to the parent with primary care of their children. In 2023, 975,000 cases were registered with the CMS, up from 620,000 in 2015, reflecting both growing demand and the migration of cases from the old Child Support Agency. The service is intended to be a backstop for families where private arrangements between parents have broken down or never existed. It is, for many lone parents, a lifeline.</p>
            <p>The system&rsquo;s fundamental problem is enforcement. Around 31% of paying parents &mdash; those required to make payments through the CMS Direct Pay or Collect and Pay services &mdash; are non-compliant: they are behind on payments, making underpayments, or not paying at all. This proportion has barely moved in eight years. The result is &pound;394 million in accumulated arrears &mdash; money owed to single-parent families that they will, in many cases, never see. The real harm to children in these households is difficult to quantify but is substantial.</p>
            <p>The CMS has a range of enforcement powers available to it, including deductions from earnings, deductions from bank accounts, disqualification from driving, and in extreme cases imprisonment. But these powers are deployed inconsistently and often slowly. Cases can take months or years to move through the enforcement process while arrears accumulate. Non-resident parents who are self-employed or who structure their income to minimise assessable earnings face particular difficulties to enforce against: the CMS&rsquo;s assessment methodology has well-documented weaknesses in capturing income that is deliberately disguised.</p>
            <p>The fees structure introduced in 2014 &mdash; where receiving parents pay 4% of maintenance collected, and paying parents pay 20% on top of their maintenance &mdash; has been widely criticised as a disincentive to use the system. Many single parents, particularly those with intermittent payments and uncertain amounts, choose not to use Collect and Pay because the fees reduce what they receive. The fees were intended to incentivise private arrangements, but for families where private arrangements have failed or where there is domestic abuse, they represent an additional financial penalty on an already disadvantaged household.</p>
            <p>Child maintenance is not a niche issue. Lone-parent families &mdash; more than 90% of which are headed by women &mdash; are the family type most likely to be in poverty. Reliable child maintenance payments can make a material difference to family income, child nutrition, housing security, and educational outcomes. A system that fails to enforce obligations in 31% of cases, that has allowed &pound;394 million to accumulate in arrears, and that charges receiving parents a fee for accessing enforcement is not adequately protecting children&rsquo;s interests. It is protecting non-compliant parents from the consequences of failing to meet their legal obligations.</p>
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
              onExpand={() => {}}
              source="DWP &middot; Child Maintenance Service Statistics 2023"
            />
            <MetricCard
              label="Non-compliance rate"
              value="31%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="unchanged for years &middot; enforcement weak"
              sparklineData={[29, 29, 30, 30, 30, 31, 31, 31, 31]}
              onExpand={() => {}}
              source="DWP &middot; Child Maintenance Service Statistics 2023"
            />
            <MetricCard
              label="Total arrears"
              value="&pound;394m"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+64% since 2015 &middot; real harm to single-parent families"
              sparklineData={[240, 270, 290, 310, 330, 350, 365, 380, 394]}
              onExpand={() => {}}
              source="DWP &middot; Child Maintenance Service Statistics 2023"
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
