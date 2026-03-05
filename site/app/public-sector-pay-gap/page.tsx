'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface PublicSectorPayGapData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    publicPrivatePayGapPct: number
    strikesDaysM: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function PublicSectorPayGapPage() {
  const [data, setData] = useState<PublicSectorPayGapData | null>(null)

  useEffect(() => {
    fetch('/data/public-sector-pay-gap/public_sector_pay_gap.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'paygap',
          label: 'Public vs private pay differential (%)',
          colour: '#F4A261',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.publicPrivatePayGapPct })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Public Sector Pay Gap" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Public Sector Pay Gap"
          question="Are Public Servants Being Paid Fairly?"
          finding="Public sector pay fell 3.2% below private sector in 2022 in real terms — the widest gap since 2010 — though recent settlements have partially closed the shortfall."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The relationship between public and private sector pay in the UK has oscillated significantly since the 2008 financial crisis. Before 2010, public sector workers typically earned slightly more than private sector counterparts when adjusted for qualifications, experience, and occupational distribution — reflecting the higher average qualification levels of the public sector workforce and relatively secure employment conditions. From 2010, a combination of public sector pay freezes, public sector pay caps (limiting rises to 1% from 2012 to 2017, then 2% from 2017), and relatively stronger private sector growth under the economic recovery shifted the balance. By 2022, using ONS ASHE data, public sector pay stood 3.2% below equivalent private sector pay in real terms — the largest gap since comparable data begins.</p>
            <p>The headline figure obscures significant variation. Teachers, nurses, and junior doctors experienced particularly sharp real-terms pay deterioration: a teacher&apos;s starting salary fell by approximately 12% in real terms between 2010 and 2022. NHS clinical staff faced similar erosion, contributing to the recruitment and retention problems that have affected workforce numbers in both professions. Senior civil servants and NHS consultants fared somewhat better, partly because their pay is reviewed by independent pay review bodies that apply different criteria. The public-private gap is largest at junior and mid-career levels — precisely where recruitment competition with the private sector is most intense.</p>
            <p>The 2022-23 wave of public sector industrial action — involving nurses, paramedics, teachers, junior doctors, Border Force, and civil servants — was directly driven by the real-terms pay gap. Strike days lost in 2022-23 reached approximately 4.2 million, the highest level since the 1980s. The strikes disrupted services significantly, with NHS elective care delays accumulating during periods of industrial action. The resolution of the disputes — primarily through one-off payments and improved pay review body recommendations in 2023 — reduced the gap but did not eliminate it. HMRC and government modelling suggested the total cost of the settlements was approximately £6 billion, less than the original BMA and RCN demands but significantly more than the government had initially offered.</p>
            <p>Pay review bodies — the independent bodies that recommend pay for NHS staff, teachers, police, prison officers, and others — have increasingly found themselves in conflict with Treasury spending constraints. Review bodies are non-statutory and their recommendations are advisory, meaning the government can reject them. In multiple years during the 2010s and early 2020s, pay review body recommendations were either rejected outright or implemented only in part. This pattern undermined confidence in the process. The 2023 cycle saw review body recommendations accepted in full for the first time in several years, as the political cost of continued strikes outweighed the fiscal cost of implementation.</p>
            <p>The longer-term trajectory of public sector pay will be shaped by the tension between fiscal sustainability and workforce retention. NHS workforce plans project significant expansions in staffing levels over the next decade — more nurses, more doctors, more allied health professionals — that cannot be delivered if public sector pay remains significantly below private sector equivalents for people with the same qualifications. The government&apos;s independent review of NHS pay — focused particularly on junior doctors and specialty training — and the Education Secretary&apos;s commitment to reaching a £30,000 starting teacher salary by 2025 are attempts to address the most acute retention challenges. Whether they are sufficient to prevent a long-term drift of skilled workers from public to private employment will become clearer only as the next few years of labour market data accumulate.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Pay Differential' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Public vs private pay gap"
              value="-0.8%"
              unit=""
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="Narrowed from -3.2% in 2022 · still negative"
              sparklineData={[0.5, 0.2, -0.3, -0.8, -1.2, -2.0, -3.2, -1.8, -0.8]}
              onExpand={() => {}}
              source="ONS · Annual Survey of Hours and Earnings 2024"
            />
            <MetricCard
              label="Teacher real pay change since 2010"
              value="-4.1%"
              unit=""
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="Improving from -12% low · still below 2010"
              sparklineData={[-2, -4, -6, -8, -10, -11, -12, -8, -4.1]}
              onExpand={() => {}}
              source="IFS / DfE · School Workforce Census 2024"
            />
            <MetricCard
              label="Strike days lost 2022-23"
              value="4.2m"
              unit=""
              direction={'down' as const}
              polarity={'up-is-bad' as const}
              changeText="Down sharply after 2023 settlements"
              sparklineData={[0.1, 0.1, 0.1, 0.1, 0.2, 0.1, 0.3, 4.2, 0.4]}
              onExpand={() => {}}
              source="ONS · Labour Disputes Statistics 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Public vs private sector pay differential, 2016–2024"
              subtitle="Public sector pay as percentage above/below equivalent private sector pay."
              series={series}
              yLabel="Pay differential (%)"
              source={{
                name: 'ONS',
                dataset: 'Annual Survey of Hours and Earnings',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>ONS — Annual Survey of Hours and Earnings (ASHE) 2024. Published annually. ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/bulletins/annualsurveyofhoursandearnings</p>
            <p>IFS / DfE — School Workforce Census 2024. Published annually. gov.uk/government/collections/statistics-school-workforce</p>
            <p>ONS — Labour Disputes Statistics 2024. ons.gov.uk/employmentandlabourmarket/peopleinwork/workplacedisputesandworkingconditions/datasets/labourdisputesbysectorandcause</p>
            <p>Public-private pay differential is estimated using regression analysis controlling for occupation, qualification level, experience, and region. Positive values indicate public sector premium; negative values indicate public sector discount. Teacher pay change uses ASHE median weekly earnings for primary and secondary teachers deflated by CPI. Strike days are working days lost to labour disputes, annual total.</p>
          </div>
        </section>
      </main>
    </>
  )
}
