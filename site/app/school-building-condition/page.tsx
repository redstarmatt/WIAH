'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'DfE', dataset: 'Condition of School Buildings Survey', url: 'https://www.gov.uk/government/publications/condition-of-school-buildings-survey', date: '2024' },
  { num: 2, name: 'National Audit Office', dataset: 'Condition of School Buildings', url: 'https://www.nao.org.uk/reports/condition-of-school-buildings/', date: '2023' },
  { num: 3, name: 'DfE', dataset: 'RAAC in Schools Update', url: 'https://www.gov.uk/government/publications/reinforced-autoclaved-aerated-concrete-raac', date: '2024' },
];

const conditionFundingValues = [1.1, 1.2, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 4.0, 4.2, 4.4];
const maintenanceBacklogValues = [6.9, 7.1, 8.4, 9.2, 11.0, 12.6, 13.4, 14.8, 17.2, 18.4, 19.1];
const raacSchoolValues = [0, 0, 0, 0, 0, 0, 0, 104, 214, 183, 156];
const poorConditionValues = [38.4, 39.1, 40.2, 41.4, 43.1, 44.8, 46.2, 48.1, 50.4, 51.8, 52.4];

const series1: Series[] = [
  { id: 'backlog', label: 'School maintenance backlog (£ billion)', colour: '#E63946', data: maintenanceBacklogValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'funding', label: 'Annual condition funding (£ billion)', colour: '#2A9D8F', data: conditionFundingValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const series2: Series[] = [
  { id: 'raac', label: 'Schools with confirmed RAAC', colour: '#E63946', data: raacSchoolValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'poor', label: 'Schools with buildings rated C or D (poor condition, %)', colour: '#F4A261', data: poorConditionValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const annotations1: Annotation[] = [
  { date: new Date(2023, 7, 1), label: '2023: RAAC crisis — 104 schools closed overnight' },
];

export default function SchoolBuildingConditionPage() {
  return (
    <>
      <TopicNav topic="School Building Condition" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Education"
          question="How Many Schools Are in a Dangerous Condition?"
          finding={<>The school maintenance backlog in England has grown to £19.1 billion — the accumulated cost of repairs needed to bring school buildings up to a satisfactory condition — while 52% of schools have at least some buildings rated in poor condition (C or D).<Cite nums={[1, 2]} /> The 2023 RAAC (reinforced autoclaved aerated concrete) crisis forced 104 schools to close or partially close overnight, affecting thousands of pupils.<Cite nums={3} /></>}
          colour="#2A9D8F"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England&apos;s school buildings are among the oldest in Europe, with a large proportion built during the post-war school building boom of the 1950s and 1960s. Many of these buildings were designed with a lifespan of 30–40 years and are now 60–70 years old, with accumulated maintenance deficits that represent a serious and growing risk to safe learning environments. The DfE&apos;s own condition surveys estimate the total maintenance backlog at £19.1 billion — the sum needed to bring all school buildings up to a satisfactory condition. This figure has nearly tripled since 2013 as annual condition funding (around £4.4 billion) has persistently fallen short of the rate at which buildings are deteriorating.<Cite nums={[1, 2]} /></p>
            <p>The RAAC (reinforced autoclaved aerated concrete) crisis of August 2023 brought the issue to national attention. RAAC — a lightweight concrete used in flat roofs, floors, and walls in public buildings from the 1950s to 1980s — degrades over time and can fail suddenly without warning. When the government published guidance in August 2023 requiring schools to check for and report RAAC, 104 schools were found to have structural RAAC that required immediate action before the new school year — forcing closures, relocations to portacabins, and in some cases full temporary closures.<Cite nums={3} /> The episode was described by school leaders as the inevitable consequence of decades of deferred maintenance and underinvestment. The government&apos;s response — a one-off capital allocation and accelerated School Rebuilding Programme — has been welcomed but is operating at a pace far below what would be needed to address the full backlog within a generation.<Cite nums={[1, 2]} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-chart1', label: 'Backlog & Funding' },
          { id: 'sec-chart2', label: 'RAAC & Poor Condition' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="School maintenance backlog" value="£19.1bn" unit="England" direction="up" polarity="up-is-bad" changeText="was £6.9bn in 2013 · tripled in a decade" sparklineData={[6.9, 7.1, 8.4, 9.2, 11.0, 12.6, 13.4, 14.8, 17.2, 18.4, 19.1]} source="DfE — Condition of School Buildings 2024" href="#sec-chart1" />
            <MetricCard label="Annual condition funding" value="£4.4bn" unit="per year" direction="up" polarity="up-is-good" changeText="increased after RAAC crisis · but still below backlog growth" sparklineData={[1.1, 1.2, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 4.0, 4.2, 4.4]} source="DfE — Condition of School Buildings 2024" href="#sec-chart1" />
            <MetricCard label="Schools with RAAC" value="156" unit="confirmed cases" direction="down" polarity="up-is-bad" changeText="peaked at 214 · remediation ongoing" sparklineData={[0, 0, 0, 0, 0, 0, 0, 104, 214, 183, 156]} source="DfE — RAAC in Schools Update 2024" href="#sec-chart2" />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="School maintenance backlog and annual condition funding, England, 2013–2024"
              subtitle="Accumulated school maintenance backlog (£ billion) and annual condition improvement funding (£ billion). Funding increased sharply after the RAAC crisis but still falls short of closing the gap."
              series={series1}
              annotations={annotations1}
              yLabel="£ billion"
              source={{ name: 'DfE', dataset: 'Condition of School Buildings Survey', url: 'https://www.gov.uk/government/publications/condition-of-school-buildings-survey', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Schools with RAAC and buildings in poor condition, 2013–2024"
              subtitle="Schools confirmed to have RAAC requiring action and % of all schools with at least some buildings rated condition C (poor) or D (bad). Both indicate the scale of the deferred maintenance problem."
              series={series2}
              annotations={[]}
              yLabel="Count / Percentage"
              source={{ name: 'DfE', dataset: 'Condition of School Buildings Survey', url: 'https://www.gov.uk/government/publications/condition-of-school-buildings-survey', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="School Rebuilding Programme accelerating"
            value="500"
            unit="schools prioritised for rebuilding or major refurbishment under School Rebuilding Programme"
            description="The School Rebuilding Programme — announced in 2020 and accelerated following the RAAC crisis — has prioritised 500 schools for full rebuilding or major refurbishment over 10 years. Schools are selected based on condition need, pupil numbers, and deprivation. Early completions show that new buildings improve attendance, staff wellbeing, and community pride. The programme represents the largest school building investment since BSF (Building Schools for the Future) was cancelled in 2010 — though at 500 schools over 10 years, it will take several decades to address the full 3,500 schools estimated to need replacement or major works."
            source="Source: DfE — School Rebuilding Programme 2024. NAO 2023."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/publications/condition-of-school-buildings-survey" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfE — Condition of School Buildings Survey</a> — condition ratings, backlog estimates, building area. Periodic.</p>
            <p><a href="https://www.nao.org.uk/reports/condition-of-school-buildings/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NAO — Condition of School Buildings</a> — system analysis, funding, programme effectiveness. 2023.</p>
            <p>Condition ratings follow a A–D scale (A=excellent, D=bad/failing). Backlog is cost to bring all building elements to condition B or above. Funding is total capital allocated for condition improvement (not new builds).</p>
          </div>
        </section>
      </main>
    </>
  );
}
