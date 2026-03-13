'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Total incidents (thousands), 2013–2024
const totalIncidents = [710, 810, 900, 930, 950, 990, 1000, 980, 1010, 1050, 1030, 1080];
// Fixed penalty notices, 2013–2024
const fixedPenalties = [26300, 32000, 40000, 51000, 62000, 68000, 72000, 78000, 78500, 80000, 78000, 78500];
// Prosecutions, 2013–2024
const prosecutions = [2171, 2100, 2050, 1900, 1800, 1700, 1600, 1500, 1300, 1200, 1100, 1085];
// Clearance costs (£m), 2013–2021 (methodology changed 2021/22)
const clearanceCosts = [42, 45, 48, 52, 55, 58, 61, 63, 15, 16, 16, 17];

const incidentSeries: Series[] = [
  {
    id: 'incidents',
    label: 'Total incidents (thousands)',
    colour: '#6B7280',
    data: totalIncidents.map((v, i) => ({ date: new Date(2013 + i, 0, 1), value: v })),
  },
];

const enforcementSeries: Series[] = [
  {
    id: 'fixed-penalties',
    label: 'Fixed penalty notices',
    colour: '#264653',
    data: fixedPenalties.map((v, i) => ({ date: new Date(2013 + i, 0, 1), value: v })),
  },
  {
    id: 'prosecutions',
    label: 'Prosecutions',
    colour: '#E63946',
    data: prosecutions.map((v, i) => ({ date: new Date(2013 + i, 0, 1), value: v })),
  },
];

const incidentAnnotations: Annotation[] = [
  { date: new Date(2016, 0, 1), label: '2016: Councils introduce bulky waste charges' },
  { date: new Date(2020, 0, 1), label: '2020: Tips closed in lockdown' },
];

const enforcementAnnotations: Annotation[] = [
  { date: new Date(2016, 0, 1), label: '2016: FPN powers expanded to local authorities' },
  { date: new Date(2020, 0, 1), label: '2020: Courts suspended during COVID' },
];

export default function FlyTippingEnglandPage() {
  return (
    <>
      <TopicNav topic="Fly-Tipping" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Fly-Tipping"
          question="Is Fly-Tipping Getting Worse?"
          finding="Fly-tipping incidents in England exceeded one million for the sixth consecutive year in 2023–24. Household waste accounts for 59% of incidents, and prosecutions have halved while fixed penalty notices tripled."
          colour="#6B7280"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>In 2023–24, local authorities dealt with an estimated 1.08 million fly-tipping incidents — a 52% increase on a decade earlier. The single biggest category is household waste, which accounts for 59% of all incidents. The connection to bulky waste charging policies is well established: as more councils introduced fees for bulky waste collection, illegal dumping rose in parallel. When Oldham Council scrapped its charges in a 2019 trial, fly-tipping fell by 48% in the affected area. Despite this evidence, fewer than a quarter of English councils currently offer free bulky waste collection.</p>
            <p>The enforcement picture reveals a quiet transformation. Local authorities have shifted decisively from prosecutions to fixed penalty notices. In 2013–14, councils issued 26,300 FPNs and brought 2,171 prosecutions. By 2023–24, fixed penalties had tripled to 78,500, while prosecutions had halved to 1,085. This reflects both pragmatism — FPNs are cheaper and faster to administer — and the erosion of local authority legal capacity after a decade of funding cuts. DEFRA changed its clearance cost methodology in 2021–22 to measure direct clearance expenditure only, causing the headline figure to drop from around £63 million to £15 million. The reduction is statistical, not real.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-incidents', label: 'Incidents' },
          { id: 'sec-enforcement', label: 'Enforcement' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Fly-tipping incidents (annual)"
              value="1.08M"
              unit="2023–24"
              direction="up"
              polarity="up-is-bad"
              changeText="+52% since 2013 · 59% household waste"
              sparklineData={totalIncidents.slice(-8)}
              source="DEFRA — Fly-tipping statistics 2023–24"
              href="#sec-incidents"
            />
            <MetricCard
              label="Fixed penalty notices issued"
              value="78,500"
              unit="2023–24"
              direction="up"
              polarity="up-is-good"
              changeText="+198% since 2013 · prosecutions down 50%"
              sparklineData={fixedPenalties.slice(-8).map(v => v / 1000)}
              source="DEFRA — Fly-tipping statistics 2023–24"
              href="#sec-enforcement"
            />
            <MetricCard
              label="Prosecutions (annual)"
              value="1,085"
              unit="2023–24"
              direction="down"
              polarity="up-is-good"
              changeText="Down from 2,171 in 2013 · councils shifting to FPNs"
              sparklineData={prosecutions.slice(-8).map(v => v / 100)}
              source="DEFRA — Fly-tipping statistics 2023–24"
              href="#sec-enforcement"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-incidents" className="mb-12">
            <LineChart
              title="Fly-tipping incidents in England, 2013–14 to 2023–24"
              subtitle="Annual local-authority-reported incidents. Exceeded one million in six of the last seven years."
              series={incidentSeries}
              annotations={incidentAnnotations}
              yLabel="Incidents (thousands)"
              source={{ name: 'DEFRA', dataset: 'Fly-tipping incidents and actions taken in England', url: 'https://www.gov.uk/government/statistics/fly-tipping-in-england', frequency: 'annual', date: 'Oct 2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-enforcement" className="mb-12">
            <LineChart
              title="Enforcement actions: fixed penalties vs prosecutions, 2013–2024"
              subtitle="Fixed penalty notices have tripled while prosecutions have halved. Councils favour speed and cost over criminal proceedings."
              series={enforcementSeries}
              annotations={enforcementAnnotations}
              yLabel="Actions"
              source={{ name: 'DEFRA', dataset: 'Fly-tipping incidents and actions taken in England', url: 'https://www.gov.uk/government/statistics/fly-tipping-in-england', frequency: 'annual', date: 'Oct 2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Free bulky waste collection reduces fly-tipping"
            value="48%"
            unit="reduction in pilot areas"
            description="When Oldham Council scrapped its bulky waste collection charges in a 2019 pilot, fly-tipping in the area fell by 48%. Similar trials in Newham and Bexley produced comparable results. The evidence is consistent: making legal disposal free and convenient is the single most effective intervention against household fly-tipping. Councils that have adopted free collection report lower clearance costs, reduced enforcement spend, and cleaner neighbourhoods — a net saving despite the upfront cost."
            source="Source: DEFRA — Fly-tipping statistics. Oldham Council pilot evaluation, 2020."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/statistics/fly-tipping-in-england" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DEFRA — Fly-tipping incidents and actions taken in England</a> — Annual local-authority-reported fly-tipping statistics. Retrieved February 2026.</p>
            <p>Clearance cost methodology changed in 2021–22 to measure direct clearance costs only, excluding investigation and enforcement overheads. Figures before and after this change are not directly comparable. Private land fly-tipping is excluded from all figures shown.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
