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
            <p>The British Army&apos;s trained strength of 72,520 in 2023 is the lowest since the Napoleonic era in relative terms, below even the contested 73,000 target set in the 2021 Integrated Review &mdash; itself the lowest on record, down from 152,000 at the Cold War peak. All three services are below establishment: the Royal Navy has 32,910 against a target of 33,450; the Royal Air Force 31,380 against 31,750. A record 94,000 applications were received in 2023, but only 9,200 people joined &mdash; a conversion rate failure driven by medical rejections, fitness failures, background check delays, and a recruitment process so slow it loses candidates to private employers. The National Audit Office found the Capita-managed recruitment contract failed to deliver required numbers in every year of its 2012&ndash;2022 operation. Russia&apos;s full-scale invasion of Ukraine in 2022 sharpened the strategic stakes, prompting the UK&apos;s 2024 commitment to reach 2.5% of GDP on defence, but headcount needs to grow alongside equipment investment to be credible.</p>
            <p>Retention compounds recruitment failure. Military pay has fallen behind private sector equivalents in comparable roles, and the Service Family Accommodation estate has thousands of properties in poor condition, eroding the implicit compact with serving personnel. The effective deployable fighting strength &mdash; not the headline trained count &mdash; is significantly lower than official numbers suggest; defence analysts have questioned whether the UK could currently sustain a brigade-level deployment without drawing down from other commitments. The shortfalls fall disproportionately on combat arms and technical trades where competition from defence and technology companies is fiercest, creating structural hollowness in exactly the capabilities most needed.</p>
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
