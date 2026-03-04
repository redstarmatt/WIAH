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
            <p>The NHS estate in England comprises over 1,300 properties with a total floor area of 26 million square metres &mdash; making it one of the largest property portfolios in Europe. Much of it is old: over 40% of the hospital estate predates 1978, and some buildings still in clinical use date from the Victorian era. The condition of these buildings has been deteriorating for years, and the data now shows a system in which the physical infrastructure is failing faster than it is being repaired. The maintenance backlog &mdash; the estimated cost of returning NHS buildings to an acceptable standard &mdash; reached &pound;13.8 billion in 2024, more than three times the &pound;4.3 billion recorded in 2014.</p>
            <p>Capital spending on the NHS has been systematically deprioritised in favour of day-to-day revenue spending. In real terms, annual NHS capital expenditure fell from &pound;5.8 billion in 2014 to a low of &pound;5.0 billion in 2017 before recovering during the COVID emergency (Nightingale hospitals, ventilator procurement). By 2024 it had settled back to &pound;5.9 billion &mdash; roughly flat in real terms over a decade, while the backlog tripled. Trusts have repeatedly been required to surrender capital budgets mid-year to cover revenue deficits, a practice known as capital-to-revenue transfers that plugs immediate operational gaps at the cost of long-term infrastructure decay.</p>
            <p>The RAAC concrete crisis brought the issue into sharp public focus. Reinforced autoclaved aerated concrete, a lightweight building material widely used in the 1960s to 1980s, has been found to be structurally unsound in buildings across the public sector. In the NHS, 42 trusts have confirmed RAAC in their buildings as of 2024 &mdash; though the survey is acknowledged to be incomplete, with some trusts having not yet fully assessed all structures. Remediation ranges from propping and monitoring to full rebuilding. Several hospital wards and departments have been closed or relocated at short notice after structural assessments identified imminent collapse risk.</p>
            <p>The consequences of the capital deficit extend beyond buildings. NHS IT infrastructure is equally antiquated: many trusts still operate legacy clinical systems, and interoperability between trusts is limited. Diagnostic equipment &mdash; MRI scanners, CT scanners, linear accelerators for radiotherapy &mdash; ages beyond optimal replacement cycles, increasing downtime and reducing scan quality. The Lord Darzi review estimated that the combined capital deficit across buildings, equipment, and digital infrastructure is significantly higher than the headline ERIC maintenance backlog figure, because ERIC captures only the building fabric element.</p>
            <p>The ERIC (Estates Returns Information Collection) data used here is itself imperfect. Trusts self-report their maintenance backlog through a six-facet survey, and there are known incentives to underreport: acknowledging a large backlog implies a financial liability that affects trust accounts. The NAO has flagged concerns about data quality repeatedly. The true scale of infrastructure decay is very likely larger than the &pound;13.8 billion headline. International comparisons show that the UK spends less per capita on health capital than the OECD average &mdash; a gap that has widened, not narrowed, over the past decade. Building new hospitals is essential, but maintaining existing ones is the more immediate and less politically attractive challenge.</p>
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
              onExpand={() => {}}
            />
            <MetricCard
              label="High-risk infrastructure"
              value="25.1"
              unit="%"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 &middot; 1 in 4 buildings at risk of failure &middot; Up from 12% in 2014"
              sparklineData={[12.4, 14.1, 16.8, 19.2, 22.6, 25.1]}
              onExpand={() => {}}
            />
            <MetricCard
              label="RAAC-affected trusts"
              value="42"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 &middot; Up from 27 in 2022 &middot; Survey incomplete &mdash; true number likely higher"
              sparklineData={[27, 39, 42]}
              onExpand={() => {}}
            />
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
