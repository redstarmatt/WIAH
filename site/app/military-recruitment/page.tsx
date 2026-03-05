'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series, Annotation } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface MilitaryRecruitmentData {
  armyStrength: Array<{ year: number; trained: number }>
  allServicesTarget: Array<{ service: string; target: number; actual: number }>
  recruitmentApplications: Array<{ year: number; applications: number; joiners: number }>
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1)
}

export default function MilitaryRecruitmentPage() {
  const [data, setData] = useState<MilitaryRecruitmentData | null>(null)

  useEffect(() => {
    fetch('/data/military-recruitment/military_recruitment.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const armyStrengthSeries: Series[] = data
    ? [{
        id: 'army-strength',
        label: 'British Army trained strength',
        colour: '#6B7280',
        data: data.armyStrength.map(d => ({
          date: yearToDate(d.year),
          value: d.trained,
        })),
      }]
    : []

  const armyAnnotations: Annotation[] = [
    { date: yearToDate(1991), label: '1991: Cold War ends — drawdown begins' },
    { date: yearToDate(2010), label: '2010: SDSR — further cuts' },
  ]

  return (
    <>
      <TopicNav topic="Armed Forces Recruitment" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Armed Forces Recruitment"
          question="Can Britain fill its armed forces?"
          finding="The British Army has 72,520 trained personnel &mdash; below its 73,000 target and less than half its Cold War strength of 152,000. All three services are below establishment. Applications are rising but retention and conversion rates are falling."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The British Army&apos;s trained strength of 72,520 in 2023 is the lowest since the Napoleonic era in relative terms. The post-Cold War drawdown reduced the Army from 152,000 in 1990 to approximately 100,000 by the early 2000s. The 2010 Strategic Defence and Security Review made further cuts, reducing the target to 82,000. Subsequent reviews have reduced it further still. The current target of 73,000 is itself contested: the House of Commons Defence Committee has argued it is insufficient to meet NATO commitments and the demands of concurrent operations. The gap between current strength and even this reduced target represents a structural problem.</p>
            <p>All three services are below their establishment strength. The Army is approximately 480 below its 73,000 target. The Royal Navy has 32,910 trained personnel against a target of 33,450. The Royal Air Force has 31,380 against a target of 31,750. These figures understate the problem because they count all trained personnel, including those in support, administrative, and non-deployable roles. The effective fighting strength &mdash; those available for operational deployment &mdash; is significantly lower. Defence analysts have estimated that the UK could not currently sustain a brigade-level deployment for an extended period without drawing down from other commitments.</p>
            <p>Applications to join the armed forces are actually rising: 94,000 applications were received in 2023, a record. But only 9,200 people actually joined. The conversion rate from application to enlistment has fallen sharply, driven by a combination of medical rejection, fitness failures, background check delays, and a lengthy recruitment process that loses candidates to private sector employers. The MOD&apos;s own analysis has identified the Capita-managed recruitment contract, which ran from 2012 to 2022, as a significant contributor to this attrition: the National Audit Office found the contract had failed to deliver the number of recruits required in every year of its operation.</p>
            <p>Retention is the other side of the equation. Competition from the private sector &mdash; particularly from defence and technology companies that value military experience &mdash; draws experienced personnel out after their initial engagements. Military pay has fallen behind private sector equivalents in comparable roles. Housing provision for service families, long regarded as part of the implicit compact between the armed forces and the state, deteriorated significantly under the SFA (Service Family Accommodation) estate, with thousands of properties in poor condition. The armed forces covenant has committed successive governments to improve this, but progress has been uneven.</p>
            <p>The geopolitical context makes this situation more urgent. Russia&apos;s full-scale invasion of Ukraine in 2022 has prompted NATO allies to reassess defence spending and readiness. The UK&apos;s commitment to spend 2.5% of GDP on defence, announced in the 2024 Integrated Review Refresh, implies significant expansion. RUSI analysts have argued that headcount needs to grow alongside equipment investment, and that the current below-establishment position undermines credibility with allies and adversaries alike. The fundamental challenge &mdash; how to attract and retain enough people in an era of full employment and competitive private sector alternatives &mdash; has no simple answer, but adequate pay, improved housing, and a faster recruitment process are the starting points that evidence supports.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-strength', label: 'Army Strength Trend' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="British Army trained strength"
              value="72,520"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="Below 73,000 target &middot; less than half Cold War peak of 152,000"
              sparklineData={[152000, 111000, 102000, 98000, 82000, 78000, 76000, 72520]}
              source="MOD Armed Forces Statistics &middot; 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="Below establishment strength"
              value="&minus;3,500"
              unit="across all 3 services"
              direction="flat"
              polarity="up-is-good"
              changeText="Army, Navy and RAF all below target headcount"
              sparklineData={[1000, 2000, 2500, 3000, 3200, 3500]}
              source="MOD Quarterly Manning Report &middot; 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="Recruiter applications (2023)"
              value="94,000"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Record applications but only 9,200 actually join &middot; 10:1 attrition"
              sparklineData={[76000, 82000, 68000, 78000, 91000, 94000]}
              source="MOD UK Armed Forces Biannual Diversity Statistics &middot; 2023"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-strength" className="mb-12">
            <LineChart
              title="British Army trained strength, 1990&ndash;2023"
              subtitle="Total trained UK Regular Army strength. Excludes reserves and untrained recruits."
              series={armyStrengthSeries}
              annotations={armyAnnotations}
              yLabel="Trained personnel"
              source={{
                name: 'MOD',
                dataset: 'UK Armed Forces Statistics — Quarterly Manning Report',
                frequency: 'quarterly',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>MOD &mdash; UK Armed Forces Statistics. Quarterly Manning Report provides trained strength by service and component. Available at gov.uk/government/collections/uk-armed-forces-statistics.</p>
            <p>House of Commons Defence Committee &mdash; Recruitment and Retention in the Armed Forces. Reports on personnel shortfalls and recruitment system performance. Available at committees.parliament.uk.</p>
            <p>RUSI &mdash; Royal United Services Institute. Defence analysis and commentary on NATO commitments and UK force structure. Available at rusi.org.</p>
            <p>Trained strength excludes untrained recruits, officers in initial training, and those on long-term sick or absent. Establishment targets are set by the MOD and revised periodically. The 73,000 Army target applies from FY2023.</p>
          </div>
        </section>
      </main>
    </>
  )
}
