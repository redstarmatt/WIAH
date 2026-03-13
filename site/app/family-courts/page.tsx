'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Private law children cases waiting over 26 weeks (thousands), 2015–2024 — MOJ
const privateLawWaitValues = [25, 27, 30, 33, 36, 38, 32, 45, 55, 62];

// Public law children cases waiting over 26 weeks (%), 2015–2024 — MOJ / Cafcass
const publicLawWaitPctValues = [18, 22, 26, 28, 30, 28, 32, 40, 45, 48];

// Average time (weeks) to dispose of a private law children case, 2015–2024 — MOJ
const avgTimeValues = [28, 30, 32, 34, 36, 38, 34, 43, 48, 51];

const privateLawSeries: Series[] = [
  {
    id: 'private-law',
    label: 'Private law cases waiting over 26 weeks (thousands)',
    colour: '#E63946',
    data: privateLawWaitValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const timeSeries: Series[] = [
  {
    id: 'avg-time',
    label: 'Average case length (weeks)',
    colour: '#264653',
    data: avgTimeValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'public-law-pct',
    label: 'Public law cases >26 weeks (%)',
    colour: '#F4A261',
    data: publicLawWaitPctValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const courtAnnotations: Annotation[] = [
  { date: new Date(2020, 2, 1), label: '2020: COVID — hearings suspended' },
  { date: new Date(2022, 0, 1), label: '2022: Family court reform announced' },
];

export default function FamilyCourtsPage() {
  return (
    <>
      <TopicNav topic="Family Courts" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Family Courts"
          question="How Long Are Families Waiting in the Courts?"
          finding="Private law children cases — covering divorce, custody, and contact arrangements — now take an average of 51 weeks, more than double the 26-week target. 62,000 cases are waiting over 26 weeks. Children's futures are being decided years after separation."
          colour="#6B7280"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The family courts system — which deals with children's arrangements following separation, domestic abuse injunctions, and local authority care proceedings — has been in a state of sustained crisis for over a decade. Private law children cases, which cover parenting disputes between separating couples, now take an average of 51 weeks from first application to disposal — almost double the government's 26-week target. This means children spend, on average, nearly a year in legal limbo while their living arrangements and relationships with both parents are unresolved. The number of cases waiting over 26 weeks has grown from 25,000 in 2015 to 62,000 in 2024, representing a 150% increase.</p>
            <p>Public law cases — where local authorities apply for care orders, emergency protection orders, or placement orders — are subject to a statutory 26-week time limit introduced by the Children and Families Act 2014. This limit has been consistently breached: 48% of public law cases exceeded 26 weeks in 2024. For children in these cases — typically at risk of abuse or neglect — each additional week in uncertainty has measurable developmental impact. A shortage of Cafcass (Children and Family Court Advisory and Support Service) officers, a chronic shortage of judges and courtrooms in the family jurisdiction, and the rise in lay litigants following legal aid cuts are the primary structural causes. The 2022 private law reform programme introduced 'Pathfinder' courts piloting early investigation and out-of-court resolution, but these cover only a small fraction of cases.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Wait times' },
          { id: 'sec-chart2', label: 'Case length' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Private law cases over 26 weeks"
              value="62,000"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 25,000 in 2015 · 150% increase in 9 years"
              sparklineData={[25, 27, 30, 33, 36, 38, 32, 45, 55, 62]}
              source="MOJ · Family court statistics 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Average private law case length"
              value="51 weeks"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Target: 26 weeks · almost double target · longest on record"
              sparklineData={[28, 30, 32, 34, 36, 38, 34, 43, 48, 51]}
              source="MOJ · Family court statistics 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Public law cases over 26 weeks"
              value="48%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 18% in 2015 · statutory 26-week limit consistently breached"
              sparklineData={[18, 22, 26, 28, 30, 28, 32, 40, 45, 48]}
              source="MOJ · Family court statistics 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Private law children cases waiting over 26 weeks, England and Wales, 2015–2024"
              subtitle="Number of private law children cases (parenting arrangements, custody) outstanding beyond the 26-week target. Pandemic caused initial drop then sharp rise."
              series={privateLawSeries}
              annotations={courtAnnotations}
              yLabel="Cases (thousands)"
              source={{ name: 'MOJ', dataset: 'Family court statistics quarterly', url: 'https://www.gov.uk/government/collections/family-court-statistics-quarterly', frequency: 'quarterly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Family court case length and public law wait rates, 2015–2024"
              subtitle="Average time in weeks to dispose of a private law children case and percentage of public law cases exceeding the 26-week statutory limit."
              series={timeSeries}
              annotations={[{ date: new Date(2020, 2, 1), label: '2020: COVID hearings suspended' }]}
              yLabel="Weeks / %"
              source={{ name: 'MOJ', dataset: 'Family court statistics quarterly', url: 'https://www.gov.uk/government/collections/family-court-statistics-quarterly', frequency: 'quarterly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Pathfinder courts reducing contested hearings by 40%"
            value="40%"
            description="The Pathfinder pilot courts — operating in Dorset and North Wales since 2022 — use a 'no court door without welfare support' model, providing early safeguarding assessments and supported dispute resolution before cases escalate to contested hearings. Early evaluation showed a 40% reduction in contested hearings and significantly shorter case durations. The government has committed to expanding Pathfinder to more areas. If applied nationally, this model could resolve a significant portion of private law cases without lengthy court proceedings, freeing capacity for cases genuinely requiring judicial determination."
            source="Source: MOJ — Pathfinder pilot evaluation 2023. Cafcass — Annual report 2023/24."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/family-court-statistics-quarterly" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">MOJ — Family court statistics quarterly</a> — quarterly data on case volumes, waiting times, and disposals by case type.</p>
            <p><a href="https://www.cafcass.gov.uk/about-cafcass/research-and-data/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Cafcass — Research and data</a> — workload data for Children and Family Court Advisory and Support Service officers.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
