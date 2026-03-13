'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Bathing waters at Excellent rating (%), England, 2013–2024 — Environment Agency
const excellentValues = [72, 70, 68, 67, 66, 65, 63, 62, 61, 60, 60, 60];

// Bathing waters at Poor or Sufficient rating (%), 2013–2024 — EA
const poorSufficientValues = [5, 5, 6, 6, 7, 7, 8, 9, 10, 11, 11, 11];

// Sewage discharge hours (millions), England, 2016–2024 — EA Event Duration Monitoring
const dischargeHoursValues = [0.10, 0.17, 0.90, 2.5, 3.1, 2.7, 1.8, 3.6, 3.6];

// CSOs with continuous monitoring (%), 2016–2024 — EA / Ofwat
const monitoredCSOsValues = [5, 8, 14, 22, 38, 55, 72, 88, 94];

const series1: Series[] = [
  {
    id: 'excellent',
    label: 'Bathing waters rated Excellent (%)',
    colour: '#2A9D8F',
    data: excellentValues.map((v, i) => ({ date: new Date(2013 + i, 0, 1), value: v })),
  },
  {
    id: 'poor-sufficient',
    label: 'Bathing waters rated Poor or Sufficient (%)',
    colour: '#E63946',
    data: poorSufficientValues.map((v, i) => ({ date: new Date(2013 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'discharge-hours',
    label: 'Sewage discharge hours (millions)',
    colour: '#E63946',
    data: dischargeHoursValues.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
  },
  {
    id: 'monitored-csos',
    label: 'CSOs with continuous monitoring (%)',
    colour: '#264653',
    data: monitoredCSOsValues.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
  },
];

const annotations1: Annotation[] = [
  { date: new Date(2021, 0, 1), label: '2021: High rainfall year — quality falls' },
  { date: new Date(2023, 0, 1), label: '2023: Southern Water fined record £90m' },
];

const annotations2: Annotation[] = [
  { date: new Date(2021, 0, 1), label: '2021: EA begins requiring universal EDM monitoring' },
  { date: new Date(2023, 0, 1), label: '2023: Real-time data reveals full scale of discharges' },
];

export default function BathingWaterPage() {
  return (
    <>
      <TopicNav topic="Bathing Water Quality" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment & Climate"
          question="Are Britain's beaches and rivers safe to swim in?"
          finding="Just 60% of England's designated bathing waters achieved Excellent status in 2024, down from 72% in 2013. Sewage discharges — 3.6 million hours in 2023 — are the leading cause of failure. 94% of storm overflows are now monitored continuously, but monitoring has exposed the scale of pollution rather than solved it."
          colour="#2A9D8F"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England has 424 designated bathing waters — stretches of coast, rivers, and lakes where the Environment Agency monitors water quality against bacterial standards set by the EU Bathing Water Directive (retained in UK law). The proportion rated Excellent has fallen steadily from 72% in 2013 to 60% in 2024, while the proportion rated Poor or Sufficient — signalling bacterial contamination that poses a health risk — has risen from 5% to 11%. Sewage discharged from combined sewer overflows (CSOs) during heavy rainfall is the primary cause of failures. In 2023, the Environment Agency recorded 3.6 million hours of sewage discharges from CSOs across England — equivalent to over 400 years of continuous flow. The true figure was unknown until mandatory continuous monitoring was introduced, because water companies were simply not required to measure what they were discharging.</p>
            <p>The political response has been significant but delayed. The Environment Act 2021 placed new duties on water companies to progressively reduce the adverse impact of sewage discharges, and required continuous electronic monitoring of every storm overflow by the end of 2025. Ofwat's 2024 price review requires water companies to invest £56 billion between 2025 and 2030, with a target of reducing sewage spill hours by 40% by 2035 and eliminating harmful overflows entirely by 2050. Several water companies face substantial fines for historical failures: Southern Water was fined £90 million in 2021, and Thames Water faces enforcement action over billions of litres of unlawful discharges. But critics note that the targets are set over decades, investment plans rely on bill increases, and no individual executives have faced criminal prosecution despite evidence of systematic under-reporting.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Bathing water quality' },
          { id: 'sec-chart2', label: 'Sewage discharges' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Bathing waters at Excellent status"
              value="60%"
              unit="2024"
              direction="down"
              polarity="up-is-good"
              changeText="Down from 72% in 2013 · sewage the leading cause of failure"
              sparklineData={excellentValues.slice(-8)}
              source="Environment Agency — Bathing Water Quality 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Bathing waters rated Poor or Sufficient"
              value="11%"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 5% in 2013 · failures concentrated after rainfall"
              sparklineData={poorSufficientValues.slice(-8)}
              source="Environment Agency — Bathing Water Quality 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Sewage discharge hours"
              value="3.6M"
              unit="hours in 2023"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 100,000 hours in 2016 · 36-fold increase in recorded hours"
              sparklineData={dischargeHoursValues}
              source="Environment Agency — Event Duration Monitoring 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Bathing water quality ratings, England, 2013–2024"
              subtitle="Percentage of designated bathing waters rated Excellent (teal) and Poor or Sufficient (red). Quality has declined steadily as sewage discharges have grown."
              series={series1}
              annotations={annotations1}
              yLabel="%"
              source={{ name: 'Environment Agency', dataset: 'Annual Bathing Water Quality Classifications', url: 'https://environment.data.gov.uk/bwq/profiles/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Sewage discharge hours and monitoring coverage, England, 2016–2024"
              subtitle="Total discharge hours from combined sewer overflows (red, millions) and percentage of CSOs with continuous monitoring (blue). Monitoring expansion reveals the true scale of the problem."
              series={series2}
              annotations={annotations2}
              yLabel="Hours (M) / % monitored"
              source={{ name: 'Environment Agency', dataset: 'Event Duration Monitoring; Storm Overflow Annual Returns', url: 'https://www.gov.uk/government/collections/storm-overflows-data', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="£56bn storm overflow investment plan — the largest ever water infrastructure programme"
            value="£56bn"
            unit="water company investment required 2025–2030 under Ofwat's price review"
            description="Ofwat's 2024 price review settlement requires water companies to invest £56 billion between 2025 and 2030 — the largest water infrastructure investment programme in England's history. The target is to reduce sewage spill hours by 40% by 2035, eliminate all harmful storm overflows by 2050, and achieve 100% continuous monitoring of all storm overflows by end of 2025. 94% of CSOs already have continuous electronic monitors installed, meaning the full picture of sewage dumping is now visible for the first time. The Environment Agency has strengthened enforcement, with fines totalling over £150 million since 2021. The Storm Overflows Discharge Reduction Plan, published in 2022, sets legally binding targets for the first time."
            source="Source: Ofwat — Final Determinations 2024. Environment Agency — Storm Overflow Annual Returns 2024. DEFRA — Storm Overflows Discharge Reduction Plan 2022."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://environment.data.gov.uk/bwq/profiles/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Environment Agency — Bathing Water Quality Classifications</a> — annual. Bacterial water quality ratings (Excellent, Good, Sufficient, Poor) for all 424 designated bathing waters in England, based on E. coli and intestinal enterococci sampling throughout the bathing season (May–September).</p>
            <p><a href="https://www.gov.uk/government/collections/storm-overflows-data" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Environment Agency — Event Duration Monitoring and Storm Overflow Annual Returns</a> — annual. Total hours of sewage discharge from combined sewer overflows, number of discharge events, and percentage of overflows with continuous electronic monitoring. Data from water company EDM submissions.</p>
            <p>Bathing water classifications are based on the four-year rolling geometric mean of bacterial concentrations. A site rated Excellent typically has very low contamination throughout the season. Poor-rated sites are subject to a permanent bathing advisory, advising against swimming. Discharge hours data prior to 2021 should be treated with caution as monitoring coverage was partial.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
