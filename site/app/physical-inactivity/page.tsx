'use client'

import { useEffect, useState } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series, Annotation } from '@/components/charts/LineChart'
import PositiveCallout from '@/components/PositiveCallout'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// ── Types ────────────────────────────────────────────────────────────────────

interface ActivityYear {
  year: number
  pctMeetingGuidelines: number
}

interface ChildActivityYear {
  year: number
  pctActive: number
}

interface ActivityGroup {
  group: string
  pctActive: number
}

interface PhysicalInactivityData {
  activityLevels: ActivityYear[]
  childActivity: ChildActivityYear[]
  byGroup: ActivityGroup[]
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1)
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function PhysicalInactivityPage() {
  const [data, setData] = useState<PhysicalInactivityData | null>(null)

  useEffect(() => {
    fetch('/data/physical-inactivity/physical_inactivity.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  // ── Derived series ──────────────────────────────────────────────────────

  const adultActivitySeries: Series[] = data
    ? [{
        id: 'adult-activity',
        label: 'Adults meeting activity guidelines',
        colour: '#2A9D8F',
        data: data.activityLevels.map(d => ({
          date: yearToDate(d.year),
          value: d.pctMeetingGuidelines,
        })),
      }]
    : []

  const adultActivityAnnotations: Annotation[] = [
    { date: yearToDate(2020), label: 'COVID-19 lockdowns' },
  ]

  const childActivitySeries: Series[] = data
    ? [{
        id: 'child-activity',
        label: 'Children meeting activity guidelines',
        colour: '#264653',
        data: data.childActivity.map(d => ({
          date: yearToDate(d.year),
          value: d.pctActive,
        })),
      }]
    : []

  const childActivityAnnotations: Annotation[] = [
    { date: yearToDate(2020), label: 'COVID-19 lockdowns' },
  ]

  // ── Metric values ────────────────────────────────────────────────────────

  const latestAdult = data?.activityLevels[data.activityLevels.length - 1]

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Physical Inactivity" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Physical Inactivity"
          question="Are We Getting Enough Exercise?"
          finding="Less than two thirds of adults in England meet the recommended 150 minutes of moderate physical activity per week, and physical inactivity costs the NHS &pound;7.4 billion a year."
          colour="#2A9D8F"
          preposition="with"
        />

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-context', label: 'Context' },
          { id: 'sec-charts', label: 'Charts' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Adults meeting 150&ndash;min activity guidelines"
              value={latestAdult ? latestAdult.pctMeetingGuidelines.toString() : '—'}
              unit="%"
              direction="down"
              polarity="up-is-good"
              changeText="2022 &middot; Was 66% pre-pandemic; recovered slowly"
              sparklineData={[66, 67, 67, 67, 59, 61, 62]}
              source="Sport England &mdash; Active Lives Survey"
              onExpand={() => {}}
            />
            <MetricCard
              label="Physically inactive adults (under 30 min/week)"
              value="11.5"
              unit="M"
              direction="up"
              polarity="up-is-bad"
              changeText="24% of adults; highest in most deprived areas"
              sparklineData={[10.2, 10.5, 10.8, 11.2, 11.5]}
              source="Sport England &mdash; Active Lives Survey"
              onExpand={() => {}}
            />
            <MetricCard
              label="NHS cost of physical inactivity (annual)"
              value="7.4"
              unit="&pound;bn"
              direction="up"
              polarity="up-is-bad"
              changeText="+&pound;5.5bn in wider economy costs"
              sparklineData={[5.2, 5.8, 6.4, 6.9, 7.4]}
              source="Sport England &mdash; Sport England Insight"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        {/* Context section */}
        <section id="sec-context" className="py-12 border-t border-wiah-border">
          <h2 className="text-xl font-bold text-wiah-black mb-6">Context</h2>
          <div className="max-w-2xl text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Physical inactivity is one of the most consequential and least visible public health problems in the UK. Around 38% of adults &mdash; approximately 20 million people &mdash; do not meet the Chief Medical Officers&apos; guidelines of 150 minutes of moderate activity per week. The NHS estimates the direct cost at &pound;7.4 billion annually, and inactivity is now attributed to roughly 1 in 6 UK deaths, a burden comparable to smoking. Unlike smoking, which has a clear declining trend, physical activity levels have remained stubbornly flat for most of the past decade, with a sharp COVID-related dip in 2020 from which recovery has been only partial.</p>
            <p>The aggregate figure conceals a pronounced social gradient. Adults in the least deprived quintile meet activity guidelines at a rate of 67%; in the most deprived, that falls to 56%. The gap partly reflects built environment: access to parks, safe walking and cycling routes, and affordable sport facilities is unevenly distributed by neighbourhood. Men are more likely to meet guidelines than women (67% vs 57%), a gap that persists across age groups. By ethnicity, Black and South Asian adults are less likely to be sufficiently active (52% and 54% respectively, versus 63% for white adults), reflecting a combination of structural factors including access, cultural programming in sport provision, and income. These are not individual choices made in a vacuum; they are choices shaped by what the local environment makes easy or hard.</p>
            <p>Children&apos;s activity is a particular concern. Only 47% of children and young people currently meet the guideline of 60 minutes of daily activity &mdash; down from higher rates recorded in the early 2010s. The decline between 2012 and 2019 predates COVID, suggesting structural causes: reduced physical education time in schools, the shift to screen-based leisure, and the contraction of free, unsupervised outdoor play in many communities. The pandemic sharply worsened the picture, and evidence from Sport England&apos;s Active Lives Children survey suggests activity among secondary school-aged children in particular has not fully recovered. Inactive children are more likely to become inactive adults; the compounding effect on long-term NHS demand is significant.</p>
            <p>There are genuine positive signals. Sport England&apos;s This Girl Can campaign, launched in 2015, contributed to 3.7 million previously inactive women becoming more active over its first phase &mdash; a rare example of a public health communications campaign with measurable population-level effect. Parkrun, the free weekly 5K programme, now has 2.3 million regular UK participants and peer-reviewed evidence suggests it reduces inequalities in physical activity by reaching lower-income communities more effectively than gym-based provision. Walking remains the most common physical activity, with 48% of adults walking for at least 30 minutes weekly &mdash; an accessible, low-cost behaviour that public health infrastructure can support through street design and safety investment rather than individual exhortation.</p>
            <p>The data has important structural gaps. The 150-minute weekly guideline measures a threshold, not intensity distribution; someone doing 151 minutes and someone doing 400 minutes are counted identically. Surveys rely on self-reported activity, which is known to be overstated &mdash; accelerometer-based studies suggest true inactivity rates may be higher than headline figures indicate. For older adults (65 and over), where 42% are insufficiently active, the guidelines also include strength and balance activity for falls prevention &mdash; a dimension rarely captured in population surveys. And the data cannot tell us what combination of infrastructure investment, policy change, and community-level intervention would move the numbers. The mechanisms are understood; the political will and resource allocation needed to act on them remain the open question.</p>
          </div>
        </section>

        {/* Charts section */}
        <section id="sec-charts" className="py-12 border-t border-wiah-border space-y-12">
          {adultActivitySeries.length > 0 ? (
            <LineChart
              title="Adults meeting physical activity guidelines, England"
              subtitle="Percentage achieving 150 minutes of moderate activity per week. Sport England Active Lives Survey."
              series={adultActivitySeries}
              annotations={adultActivityAnnotations}
              yLabel="Percentage (%)"
              source={{
                name: 'Sport England',
                dataset: 'Active Lives Survey',
                frequency: 'annual',
              }}
            />
          ) : (
            <div className="h-64 bg-wiah-light rounded animate-pulse" />
          )}

          {childActivitySeries.length > 0 ? (
            <LineChart
              title="Children meeting physical activity guidelines, England"
              subtitle="Percentage of 5&ndash;16 year olds achieving 60 minutes of activity per day. Sport England."
              series={childActivitySeries}
              annotations={childActivityAnnotations}
              yLabel="Percentage (%)"
              source={{
                name: 'Sport England',
                dataset: 'Active Lives Survey',
                frequency: 'annual',
              }}
            />
          ) : (
            <div className="h-64 bg-wiah-light rounded animate-pulse" />
          )}

          {data && data.byGroup.length > 0 && (
            <div className="mb-12">
              <h3 className="text-lg font-bold text-wiah-black mb-1">Meeting activity guidelines by demographic group</h3>
              <p className="text-sm text-wiah-mid mb-4">
                Percentage meeting recommended activity levels. Sport England Active Lives Survey, 2022.
              </p>
              <div className="space-y-3 border-t border-b border-wiah-border py-4">
                {data.byGroup.map(group => {
                  const maxWidth = 80
                  const barWidth = (group.pctActive / maxWidth) * 100
                  return (
                    <div key={group.group} className="flex items-center gap-3">
                      <span className="text-sm text-wiah-black w-40 flex-shrink-0">{group.group}</span>
                      <div className="flex-grow bg-wiah-light rounded h-6 relative">
                        <div
                          className="bg-wiah-green h-6 rounded transition-all"
                          style={{ width: `${barWidth}%` }}
                        />
                      </div>
                      <span className="font-mono text-sm font-bold text-wiah-dark w-12 text-right flex-shrink-0">
                        {group.pctActive}%
                      </span>
                    </div>
                  )
                })}
              </div>
              <p className="font-mono text-[11px] text-wiah-mid mt-3">
                Source: Sport England &mdash; Active Lives Survey, 2022.
              </p>
            </div>
          )}
        </section>

        {/* Positive story */}
        <ScrollReveal>
          <PositiveCallout
            title="Parkrun: free, weekly, community exercise works"
            value="1,200+"
            unit="UK Parkrun events"
            description="Parkrun &mdash; free, weekly, timed 5km runs in parks &mdash; now has over 1,200 events in the UK attracting 100,000+ participants each Saturday. Research published in the British Journal of Sports Medicine found that Parkrun participants substantially increased their physical activity, with the largest gains among those who were previously inactive. Participants report improved mental health, sense of community, and social connection. The model is cost-effective, scalable, and accessible across socioeconomic groups, demonstrating that removing barriers (cost, intimidation, structure) enables participation."
            source="Source: Sport England &mdash; Active Lives Survey; Parkrun &mdash; Research Evidence."
          />
        </ScrollReveal>

        {/* Sources */}
        <section id="sec-sources" className="border-t border-wiah-border pt-8">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; methodology</h2>
          <ul className="space-y-2 font-mono text-xs text-wiah-mid">
            <li>
              <a
                href="https://www.sportengland.org/research-and-data/data/active-lives"
                className="underline hover:text-wiah-blue"
                target="_blank"
                rel="noreferrer"
              >
                Sport England &mdash; Active Lives Survey (annual)
              </a>
            </li>
            <li>
              <a
                href="https://www.nhs.uk"
                className="underline hover:text-wiah-blue"
                target="_blank"
                rel="noreferrer"
              >
                NHS &mdash; Physical Inactivity and Health Costs
              </a>
            </li>
            <li>
              <a
                href="https://www.parkrun.com"
                className="underline hover:text-wiah-blue"
                target="_blank"
                rel="noreferrer"
              >
                Parkrun &mdash; Weekly 5K Running Events
              </a>
            </li>
          </ul>
          <p className="font-mono text-xs text-wiah-mid mt-4">
            Data is sourced from Sport England&apos;s Active Lives Survey, an annual survey of physical activity participation among adults and children in England. The survey uses a representative sample of approximately 168,000 respondents aged 5+. NHS cost estimates derive from analysis of healthcare spending related to physical inactivity. All figures are for England; UK-wide data may differ.
          </p>
          <div className="mt-4">
            <p className="font-mono text-xs text-wiah-mid font-bold mb-1">Known issues:</p>
            <ul className="list-disc list-inside space-y-1 font-mono text-xs text-wiah-mid">
              <li>Survey self-reported activity; overestimation of activity levels common in surveys</li>
              <li>COVID-19 lockdowns disrupted 2020 data; recovery patterns influenced by local restrictions</li>
              <li>Deprivation categories based on Index of Multiple Deprivation quintiles; neighbourhood-level proxy for individual circumstance</li>
            </ul>
          </div>
        </section>
      </main>
    </>
  )
}
