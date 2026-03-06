'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series, Annotation } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface NhsProductivityData {
  national: {
    productivityIndex: {
      timeSeries: Array<{ year: number; index: number }>
    }
    staffGrowth: {
      timeSeries: Array<{ year: number; ftePer1000: number }>
    }
    outputPerWorker: {
      timeSeries: Array<{ year: number; index: number }>
    }
  }
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1)
}

// -- Page -------------------------------------------------------------------

export default function NhsProductivityPage() {
  const [data, setData] = useState<NhsProductivityData | null>(null)

  useEffect(() => {
    fetch('/data/nhs-productivity/nhs_productivity.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const productivitySeries: Series[] = data
    ? [{
        id: 'productivity',
        label: 'Total NHS productivity (index)',
        colour: '#F4A261',
        data: data.national.productivityIndex.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.index,
        })),
      }]
    : []

  const outputPerWorkerSeries: Series[] = data
    ? [{
        id: 'output-per-worker',
        label: 'Output per FTE worker (index)',
        colour: '#E63946',
        data: data.national.outputPerWorker.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.index,
        })),
      }]
    : []

  const staffSeries: Series[] = data
    ? [{
        id: 'staff',
        label: 'NHS FTE per 1,000 population',
        colour: '#264653',
        data: data.national.staffGrowth.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.ftePer1000,
        })),
      }]
    : []

  const productivityAnnotations: Annotation[] = [
    { date: yearToDate(2020), label: '2020: COVID structural drop' },
  ]

  return (
    <>
      <TopicNav topic="NHS Productivity" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="NHS Productivity"
          question="Why Is the NHS Treating Fewer Patients With More Staff?"
          finding="NHS productivity remains 3–4% below its pre-COVID level despite a 17% increase in staff numbers since 2019. Output per worker has fallen by nearly 10% since 2014, creating an efficiency gap that costs the equivalent of tens of thousands of lost operations each year."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>NHS England employed 1.3 million FTE staff in 2024 — up 17% from 1.1 million in 2019 — yet the total productivity index (set at 100 for 2014) stood at just 96.8, and output per worker had fallen to 90.3 on the same index, nearly 10% below 2014 levels. COVID caused a genuine structural break, reducing NHS activity by nearly 20% in 2020 through cancelled elective care, infection control constraints, and staff absence. Four years on, the recovery is incomplete. The Lord Darzi review (2024) identified productivity as the central challenge and estimated that closing the productivity gap to pre-COVID levels would be equivalent to treating 1.5 million additional patients annually without additional spending — a figure against which the 7.5-million waiting list must be measured.</p>
            <p>The productivity gap is a system-level phenomenon, not an individual failing. Ageing IT systems, estate constraints, and clinical pathways designed decades ago all contribute; a surgeon whose theatre list is cut from six to four cases by post-COVID cleaning protocols is not personally less productive, but system output falls. Germany, France, and the Netherlands recovered faster from equivalent COVID-era drops, in part because they had higher baseline capital investment in digital infrastructure — the UK spends significantly less per capita on health capital than the OECD average. Without sustained investment in buildings, technology, and reformed clinical pathways, the arithmetic of the waiting list does not balance.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-productivity', label: 'Productivity Index' },
          { id: 'sec-output', label: 'Output per Worker' },
          { id: 'sec-staff', label: 'Staff Numbers' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="NHS productivity vs 2019"
              value="&minus;3.2"
              unit="%"
              direction="down"
              polarity="up-is-good"
              changeText="2024 · Still below pre-COVID level · Despite 17% more staff"
              sparklineData={[100, 101.2, 101.8, 102.1, 102.6, 103.1, 81.4, 88.7, 93.2, 95.1, 96.8]}
              href="#sec-productivity"/>
            <MetricCard
              label="Output per FTE worker"
              value="90.3"
              unit="index"
              direction="down"
              polarity="up-is-good"
              changeText="2024 · 2014 = 100 · Nearly 10% below baseline"
              sparklineData={[100, 100.8, 100.4, 100.1, 99.8, 99.4, 78.2, 85.1, 88.6, 89.8, 90.3]}
              href="#sec-output"/>
            <MetricCard
              label="NHS FTE per 1,000 population"
              value="41.2"
              direction="up"
              polarity="up-is-good"
              changeText="2024 · Up from 35.2 in 2014 · 17% rise since 2019"
              sparklineData={[35.2, 35.5, 35.8, 36.1, 36.4, 36.8, 38.2, 39.4, 40.1, 40.8, 41.2]}
              href="#sec-staff"/>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-productivity" className="mb-12">
            <LineChart
              title="NHS total productivity index, England, 2014–2024"
              subtitle="Weighted output per unit of input (staff, intermediate consumption, capital). 2014 = 100."
              series={productivitySeries}
              annotations={productivityAnnotations}
              yLabel="Index (2014 = 100)"
              source={{
                name: 'ONS',
                dataset: 'Public Service Productivity: Healthcare',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-output" className="mb-12">
            <LineChart
              title="NHS output per FTE worker, England, 2014–2024"
              subtitle="Total NHS output divided by full-time equivalent staff. Index: 2014 = 100."
              series={outputPerWorkerSeries}
              annotations={productivityAnnotations}
              yLabel="Index (2014 = 100)"
              source={{
                name: 'ONS / NHS Digital',
                dataset: 'Productivity and workforce statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-staff" className="mb-12">
            <LineChart
              title="NHS staff per 1,000 population, England, 2014–2024"
              subtitle="Full-time equivalent staff in NHS England per 1,000 population."
              series={staffSeries}
              yLabel="FTE per 1,000"
              source={{
                name: 'NHS Digital',
                dataset: 'NHS Workforce Statistics',
                frequency: 'monthly',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>ONS — Public Service Productivity: Healthcare. Measures total output (quality-adjusted weighted activity) per unit of total input. Published annually with considerable lag.</p>
            <p>NHS Digital — NHS Workforce Statistics. Monthly FTE headcount data for NHS England trusts and CCGs/ICBs.</p>
            <p>NHS England — Activity and performance data, including elective, emergency, outpatient, and community care weighted output.</p>
            <p>Productivity index set to 2014 = 100 for consistency. Output per worker calculated by dividing total output index by FTE headcount index. Quality adjustment partially captures improved survival and patient experience but is imperfect. The COVID drop reflects genuine reduction in activity, not merely a measurement artefact. Some post-COVID recovery may reflect coding and counting changes rather than real efficiency gains.</p>
          </div>
        </section>
      </main>
    </>
  )
}
