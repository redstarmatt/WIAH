'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series, Annotation } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface NhsCapitalData {
  national: {
    capitalSpending: {
      timeSeries: Array<{ year: number; billionsReal: number }>
    }
    maintenanceBacklog: {
      timeSeries: Array<{ year: number; billions: number }>
    }
    criticalInfrastructureRisk: {
      timeSeries: Array<{ year: number; highRiskPct: number }>
    }
    raacAffectedTrusts: {
      timeSeries: Array<{ year: number; trusts: number }>
    }
  }
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1)
}

// -- Page -------------------------------------------------------------------

export default function NhsCapitalPage() {
  const [data, setData] = useState<NhsCapitalData | null>(null)

  useEffect(() => {
    fetch('/data/nhs-capital/nhs_capital.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const backlogSeries: Series[] = data
    ? [{
        id: 'backlog',
        label: 'Maintenance backlog (\u00A3bn)',
        colour: '#E63946',
        data: data.national.maintenanceBacklog.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.billions,
        })),
      }]
    : []

  const spendingSeries: Series[] = data
    ? [{
        id: 'spending',
        label: 'Capital spending, real terms (\u00A3bn)',
        colour: '#264653',
        data: data.national.capitalSpending.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.billionsReal,
        })),
      }]
    : []

  const riskSeries: Series[] = data
    ? [{
        id: 'high-risk',
        label: 'High-risk infrastructure (%)',
        colour: '#E63946',
        data: data.national.criticalInfrastructureRisk.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.highRiskPct,
        })),
      }]
    : []

  const backlogAnnotations: Annotation[] = [
    { date: yearToDate(2022), label: '2022: RAAC crisis identified' },
  ]

  return (
    <>
      <TopicNav topic="NHS Capital" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="NHS Capital"
          question="Are NHS Buildings Falling Apart?"
          finding="The NHS maintenance backlog has tripled from &pound;4.3 billion in 2014 to &pound;13.8 billion in 2024. One in four NHS buildings is rated high-risk for infrastructure failure. Forty-two trusts have buildings containing RAAC &mdash; the same crumbling concrete that closed schools."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The NHS maintenance backlog &mdash; the estimated cost of returning buildings to an acceptable standard &mdash; reached &pound;13.8 billion in 2024, more than three times the &pound;4.3 billion recorded in 2014. Over 40% of the hospital estate predates 1978. Annual NHS capital expenditure has been roughly flat in real terms over that same decade, at &pound;5.9 billion in 2024 versus &pound;5.8 billion in 2014, while the backlog tripled; trusts have repeatedly surrendered capital budgets mid-year to cover revenue deficits. The RAAC concrete crisis sharpened public focus: 42 trusts have confirmed the structurally unsound 1960s&ndash;80s building material in their estate, several wards have been closed at short notice, and one in four NHS buildings is now rated high-risk for infrastructure failure. NHS IT infrastructure is equally antiquated, and the Lord Darzi review estimated the true combined capital deficit across buildings, equipment, and digital systems significantly exceeds the headline ERIC figure.</p>
            <p>The consequences fall on patients and staff across the system. Aging diagnostic equipment increases downtime and scan wait times; crumbling wards force department relocations and reduce clinical capacity. The UK spends less per capita on health capital than the OECD average &mdash; a gap that has widened over the past decade &mdash; and the NAO has repeatedly flagged concerns about data quality, meaning the true scale of decay is likely larger than the &pound;13.8 billion headline. Building new hospitals attracts political attention; maintaining existing ones does not, and that asymmetry has compounded year after year.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-backlog', label: 'Maintenance Backlog' },
          { id: 'sec-spending', label: 'Capital Spending' },
          { id: 'sec-risk', label: 'Infrastructure Risk' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Maintenance backlog"
              value="&pound;13.8"
              unit="billion"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 &middot; Tripled from &pound;4.3bn in 2014 &middot; Growing &pound;1bn+ per year"
              sparklineData={[4.3, 4.7, 5.0, 5.5, 6.0, 6.5, 7.4, 8.3, 10.2, 11.6, 13.8]}
              href="#sec-backlog"/>
            <MetricCard
              label="High-risk infrastructure"
              value="25.1"
              unit="%"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 &middot; 1 in 4 buildings at risk of failure &middot; Up from 12% in 2014"
              sparklineData={[12.4, 14.1, 16.8, 19.2, 22.6, 25.1]}
              href="#sec-spending"/>
            <MetricCard
              label="RAAC-affected trusts"
              value="42"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 &middot; Up from 27 in 2022 &middot; Survey incomplete &mdash; true number likely higher"
              sparklineData={[27, 39, 42]}
              href="#sec-risk"/>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-backlog" className="mb-12">
            <LineChart
              title="NHS maintenance backlog, England, 2014&ndash;2024"
              subtitle="Estimated cost to restore NHS buildings to acceptable standard, in &pound; billions."
              series={backlogSeries}
              annotations={backlogAnnotations}
              yLabel="\u00A3 billions"
              source={{
                name: 'NHS Digital',
                dataset: 'ERIC (Estates Returns Information Collection)',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-spending" className="mb-12">
            <LineChart
              title="NHS capital spending (real terms), England, 2014&ndash;2024"
              subtitle="Total capital expenditure in 2024 prices, &pound; billions."
              series={spendingSeries}
              yLabel="\u00A3 billions (real)"
              source={{
                name: 'NHS England / NAO',
                dataset: 'Capital expenditure returns',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-risk" className="mb-12">
            <LineChart
              title="High-risk NHS infrastructure, England, 2014&ndash;2024"
              subtitle="% of NHS estate rated condition D or E (likely to fail or already failing)."
              series={riskSeries}
              yLabel="High-risk (%)"
              source={{
                name: 'NHS Digital',
                dataset: 'ERIC six-facet survey',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>NHS Digital &mdash; ERIC (Estates Returns Information Collection). Self-reported data from all NHS trusts in England covering building condition, maintenance backlog, energy consumption, and capital investment. Published annually.</p>
            <p>NHS England / NAO &mdash; Capital expenditure data. Real-terms figures adjusted to 2024 prices using GDP deflator.</p>
            <p>DHSC &mdash; RAAC survey programme. Confirmed RAAC presence in NHS trust buildings. Survey ongoing; figures represent confirmed cases only.</p>
            <p>Maintenance backlog represents the estimated cost of returning buildings to condition B (sound, operationally safe, exhibits minor deterioration). High-risk infrastructure rated condition D (serious risk of imminent breakdown) or E (already failed). ERIC data quality is variable; the NAO has noted that trusts may underreport backlog. Capital spending figures include Nightingale hospital construction in 2020&ndash;2021, which distorts the time series.</p>
          </div>
        </section>
      </main>
    </>
  )
}
