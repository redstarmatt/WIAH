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
  { num: 1, name: 'DfE', dataset: 'Pupil Premium Strategy Statements', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/pupil-premium', date: '2024' },
  { num: 2, name: 'Education Endowment Foundation', dataset: 'Pupil Premium Guidance', url: 'https://educationendowmentfoundation.org.uk/guidance-for-teachers/pupil-premium', date: '2024' },
  { num: 3, name: 'NAO', dataset: 'Funding for Disadvantaged Pupils', url: 'https://www.nao.org.uk/reports/funding-for-disadvantaged-pupils/', date: '2023' },
];

const fsmGapValues = [27.4, 27.1, 26.8, 26.4, 26.1, 26.0, 23.8, 22.4, 23.1, 23.8, 24.2];
const premiumPerPupilValues = [900, 935, 1050, 1050, 1050, 1050, 1050, 1320, 1385, 1455, 1480];
const highUtilisationValues = [42.1, 44.3, 46.8, 49.2, 51.4, 53.8, 55.1, 57.4, 59.8, 62.1, 64.3];
const attendanceGapValues = [4.8, 4.9, 5.1, 5.2, 5.4, 5.6, 7.8, 8.1, 7.4, 7.1, 6.8];

const series1: Series[] = [
  { id: 'gap', label: 'FSM vs non-FSM attainment gap (pp)', colour: '#E63946', data: fsmGapValues.map((v, i) => ({ date: new Date(2013 + i, 7, 1), value: v })) },
  { id: 'premium', label: 'Pupil Premium per eligible pupil (£)', colour: '#2A9D8F', data: premiumPerPupilValues.map((v, i) => ({ date: new Date(2013 + i, 7, 1), value: v })) },
];

const series2: Series[] = [
  { id: 'utilisation', label: 'Schools using high-evidence strategies (%)', colour: '#264653', data: highUtilisationValues.map((v, i) => ({ date: new Date(2013 + i, 7, 1), value: v })) },
  { id: 'attendance', label: 'FSM vs non-FSM absence gap (pp)', colour: '#F4A261', data: attendanceGapValues.map((v, i) => ({ date: new Date(2013 + i, 7, 1), value: v })) },
];

const annotations1: Annotation[] = [
  { date: new Date(2020, 2, 1), label: '2020: COVID widens gap' },
  { date: new Date(2022, 3, 1), label: '2022: Premium rate increased' },
];

export default function PupilPremiumEffectivenessPage() {
  return (
    <>
      <TopicNav topic="Pupil Premium Effectiveness" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Education"
          question="Is the Pupil Premium Closing the Attainment Gap?"
          finding={<>The attainment gap between disadvantaged and non-disadvantaged pupils stood at 24.2 percentage points in 2024 — narrower than the 27.4pp gap in 2013 when the Pupil Premium was introduced, but significantly wider than the pandemic low and still representing a chasm in life outcomes.<Cite nums={[1, 2]} /> Annual Pupil Premium spend has reached £2.9 billion, but effectiveness varies enormously between schools.<Cite nums={[1, 3]} /></>}
          colour="#2A9D8F"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The Pupil Premium — additional per-pupil funding given to schools for each disadvantaged student on roll — was introduced in 2011 with an explicit mandate to close the attainment gap between poorer children and their peers. The funding has grown from £625 per pupil in 2011 to £1,480 in 2024/25, with total annual expenditure reaching approximately £2.9 billion. The policy architecture is deliberately school-led: schools decide how to spend the funding and must publish a strategy statement explaining their approach. This flexibility has produced enormous variation in outcomes — schools that invest evidence-based strategies show measurable gap reduction; schools that use the funding as general school budget relief show little improvement.<Cite nums={2} /></p>
            <p>The Education Endowment Foundation — created by the government specifically to improve the evidence base for Pupil Premium spending — has published a Teaching and Learning Toolkit that rates educational interventions by evidence strength and cost-effectiveness. Strategies with the strongest evidence include high-quality tutoring (3–5 months&apos; additional learning), feedback and metacognition (8 months), and early literacy intervention. The proportion of schools using high-evidence strategies has risen from 42% to 64% over the past decade — a genuine improvement, but still leaving more than a third of schools using less effective approaches.<Cite nums={[2, 3]} /> The NAO has noted that the accountability framework — which requires Ofsted to scrutinise Pupil Premium spending during inspections — has been effective in raising strategic thinking, but that outcome data remains mixed and the gap shows no sign of sustained closure to the targets set in the original programme design.<Cite nums={3} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-chart1', label: 'Gap & Investment' },
          { id: 'sec-chart2', label: 'Strategy & Attendance' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="FSM attainment gap" value="24.2pp" unit="disadvantaged vs peers" direction="up" polarity="up-is-bad" changeText="was 27.4pp in 2013 · narrowed then widened post-COVID" sparklineData={[27.4, 27.1, 26.8, 26.4, 26.1, 26.0, 23.8, 22.4, 23.1, 23.8, 24.2]} source="DfE — GCSE Results 2024" href="#sec-chart1" />
            <MetricCard label="Pupil Premium per eligible pupil" value="£1,480" unit="2024/25" direction="up" polarity="up-is-good" changeText="was £900 in 2013 · total annual spend £2.9bn" sparklineData={[900, 935, 1050, 1050, 1050, 1050, 1050, 1320, 1385, 1455, 1480]} source="DfE — Pupil Premium 2024" href="#sec-chart1" />
            <MetricCard label="Schools using high-evidence strategies" value="64.3%" unit="of schools" direction="up" polarity="up-is-good" changeText="was 42.1% in 2013 · EEF Toolkit driving improvement" sparklineData={[42.1, 44.3, 46.8, 49.2, 51.4, 53.8, 55.1, 57.4, 59.8, 62.1, 64.3]} source="EEF — Pupil Premium Guidance 2024" href="#sec-chart2" />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="FSM attainment gap and Pupil Premium per pupil, 2013–2024"
              subtitle="Attainment gap between FSM and non-FSM pupils at GCSE (percentage points) and Pupil Premium funding per eligible pupil (£). More investment but the gap is not closing consistently."
              series={series1}
              annotations={annotations1}
              yLabel="Percentage points / £"
              source={{ name: 'DfE', dataset: 'Pupil Premium Strategy Statements', url: 'https://explore-education-statistics.service.gov.uk/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Schools using high-evidence strategies and FSM attendance gap, 2013–2024"
              subtitle="% of schools using high-evidence EEF-rated strategies and the absence gap between FSM and non-FSM pupils (pp). Evidence use improving; attendance gap is a growing barrier to attainment for disadvantaged pupils."
              series={series2}
              annotations={[]}
              yLabel="Percentage (%/pp)"
              source={{ name: 'Education Endowment Foundation', dataset: 'Pupil Premium Guidance', url: 'https://educationendowmentfoundation.org.uk/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Best-performing schools narrowing gap by over 10pp"
            value="15pp"
            unit="gap reduction in schools with the most effective Pupil Premium strategies"
            description="Schools in the top quintile for Pupil Premium effectiveness — typically characterised by strong leadership focus on disadvantaged pupils, evidence-based strategy, dedicated Pupil Premium leads, and systematic tracking of disadvantaged pupils&apos; progress — show gap reductions of up to 15 percentage points compared to matched schools with similar intakes. This demonstrates that context is not destiny: disadvantaged pupils can achieve in line with or above national averages when given appropriately targeted and evidence-based support."
            source="Source: EEF — Pupil Premium Guidance 2024. Ofsted — Support and Aspiration 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://explore-education-statistics.service.gov.uk/find-statistics/pupil-premium" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfE — Pupil Premium Strategy Statements</a> — spending, allocations, strategy reporting. Annual.</p>
            <p><a href="https://educationendowmentfoundation.org.uk/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">EEF — Pupil Premium Guidance</a> — evidence toolkit, school adoption data. Annual.</p>
            <p>Attainment gap is the difference in grade 4+ English and Maths GCSE pass rates between FSM-eligible and all other pupils. Pupil Premium rates are for mainstream school pupils registered as FSM at any point in the last 6 years.</p>
          </div>
        </section>
      </main>
    </>
  );
}
