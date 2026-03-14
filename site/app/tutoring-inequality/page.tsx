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
  { num: 1, name: 'Sutton Trust', dataset: 'Private Tuition and the Pandemic', url: 'https://www.suttontrust.com/our-research/private-tuition-pandemic/', date: '2024' },
  { num: 2, name: 'DfE', dataset: 'National Tutoring Programme Evaluation', url: 'https://www.gov.uk/government/publications/national-tutoring-programme-ntp-evaluation', date: '2024' },
  { num: 3, name: 'Education Endowment Foundation', dataset: 'Tutor Impact and Equity', url: 'https://educationendowmentfoundation.org.uk/', date: '2023' },
];

const privateTutoringRateValues = [24.1, 25.2, 26.4, 27.8, 29.1, 30.4, 27.2, 33.8, 36.4, 38.1, 40.2];
const fsmTutoringRateValues = [4.2, 4.4, 4.8, 5.1, 5.4, 5.8, 6.2, 8.4, 9.1, 9.8, 10.4];
const ntpParticipationValues = [0, 0, 0, 0, 0, 0, 0, 490000, 780000, 620000, 510000];
const tutoringCostValues = [28.4, 29.8, 31.2, 33.1, 35.4, 37.8, 36.2, 42.8, 48.4, 52.1, 56.8];

const series1: Series[] = [
  { id: 'private', label: 'All pupils receiving private tutoring (%)', colour: '#264653', data: privateTutoringRateValues.map((v, i) => ({ date: new Date(2013 + i, 8, 1), value: v })) },
  { id: 'fsm', label: 'FSM pupils receiving private tutoring (%)', colour: '#E63946', data: fsmTutoringRateValues.map((v, i) => ({ date: new Date(2013 + i, 8, 1), value: v })) },
];

const series2: Series[] = [
  { id: 'ntp', label: 'National Tutoring Programme pupils (thousands)', colour: '#2A9D8F', data: ntpParticipationValues.map((v, i) => ({ date: new Date(2013 + i, 8, 1), value: v / 1000 })) },
  { id: 'cost', label: 'Average hourly private tutoring cost (£)', colour: '#F4A261', data: tutoringCostValues.map((v, i) => ({ date: new Date(2013 + i, 8, 1), value: v })) },
];

const annotations1: Annotation[] = [
  { date: new Date(2020, 2, 1), label: '2020: COVID lockdowns boost tutoring demand' },
  { date: new Date(2021, 8, 1), label: '2021: National Tutoring Programme launched' },
];

export default function TutoringInequalityPage() {
  return (
    <>
      <TopicNav topic="Tutoring Inequality" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Education"
          question="Is Private Tutoring Creating a Two-Tier Education System?"
          finding={<>40% of all school pupils now receive private tutoring, compared to just 10.4% of pupils eligible for free school meals — a fourfold gap that has widened sharply since the pandemic.<Cite nums={[1, 3]} /> The average hourly cost of a private tutor has risen to £56.80, making regular tutoring unaffordable for most families on lower incomes and systematically advantaging those who can pay.<Cite nums={1} /></>}
          colour="#2A9D8F"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Private tutoring has become a standard feature of middle-class educational life in England. The Sutton Trust has tracked the growth of the tutoring market for over a decade, and the trend is unambiguous: tutoring rates have roughly doubled since 2013, with pandemic school closures accelerating growth further as parents sought to compensate for lost learning. The market is now estimated to be worth over £2 billion annually. The inequality is stark: the gap between the tutoring participation rates of the most and least affluent children has widened to four-to-one, meaning that advantaged children are systematically receiving additional learning time — equivalent to hundreds of additional hours of education across a school career — that their disadvantaged peers simply do not receive.<Cite nums={[1, 3]} /></p>
            <p>The government&apos;s National Tutoring Programme (NTP), launched in 2020 to address pandemic learning loss, was specifically designed to bring subsidised tutoring to disadvantaged pupils. At its peak in 2021/22, it supported 780,000 pupils — a significant achievement. However, evaluations found that uptake was uneven, the quality of tutors provided through the programme was variable, and the subsidy has been reduced year on year as the programme winds down. The EEF&apos;s evidence synthesis finds that well-designed tutoring can add 3–5 months of additional learning progress, making it one of the most effective educational interventions available — which makes its concentration among wealthier families one of the most powerful engines of the attainment gap.<Cite nums={[2, 3]} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-chart1', label: 'Tutoring Gap' },
          { id: 'sec-chart2', label: 'NTP & Cost' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="Pupils receiving private tutoring" value="40.2%" unit="all pupils" direction="up" polarity="flat" changeText="was 24.1% in 2013 · pandemic accelerated growth" sparklineData={[24.1, 25.2, 26.4, 27.8, 29.1, 30.4, 27.2, 33.8, 36.4, 38.1, 40.2]} source="Sutton Trust — Private Tuition 2024" href="#sec-chart1" />
            <MetricCard label="FSM pupils receiving tutoring" value="10.4%" unit="disadvantaged pupils" direction="up" polarity="flat" changeText="was 4.2% in 2013 · fourfold gap vs all pupils" sparklineData={[4.2, 4.4, 4.8, 5.1, 5.4, 5.8, 6.2, 8.4, 9.1, 9.8, 10.4]} source="Sutton Trust — Private Tuition 2024" href="#sec-chart1" />
            <MetricCard label="Average hourly tutoring cost" value="£56.80" unit="per hour" direction="up" polarity="up-is-bad" changeText="was £28.40 in 2013 · doubled in real terms" sparklineData={[28.4, 29.8, 31.2, 33.1, 35.4, 37.8, 36.2, 42.8, 48.4, 52.1, 56.8]} source="Sutton Trust — Private Tuition 2024" href="#sec-chart2" />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Private tutoring participation by income group, 2013–2024"
              subtitle="% of all school pupils and % of FSM-eligible pupils receiving private tutoring. The gap between affluent and disadvantaged pupils has widened to a four-to-one ratio."
              series={series1}
              annotations={annotations1}
              yLabel="Percentage (%)"
              source={{ name: 'Sutton Trust', dataset: 'Private Tuition and the Pandemic', url: 'https://www.suttontrust.com/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="National Tutoring Programme participation and private tutoring costs, 2013–2024"
              subtitle="Pupils supported through the NTP (thousands) and average hourly cost of private tuition (£). Government programme peaked in 2022 and is declining; private market costs continue to rise."
              series={series2}
              annotations={[]}
              yLabel="Thousands / £"
              source={{ name: 'DfE', dataset: 'National Tutoring Programme Evaluation', url: 'https://www.gov.uk/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="School-led tutoring delivers strongest equity results"
            value="3–5"
            unit="months of additional learning progress from high-quality tutoring (EEF evidence)"
            description="The Education Endowment Foundation's evaluation of the National Tutoring Programme found that school-led tutoring — where trained teachers or teaching assistants deliver intensive small-group sessions during or after school — produced the strongest results and reached the most disadvantaged pupils. Schools with dedicated tutoring coordinators, explicit targeting of FSM and disadvantaged pupils, and integration with classroom teaching showed gains of 3–5 months of additional learning progress in English and Maths. This compares favourably to private tutoring, which is harder to align with the curriculum and often benefits pupils who are already doing well rather than those who need most support."
            source="Source: EEF — National Tutoring Programme Evaluation 2024. DfE 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.suttontrust.com/our-research/private-tuition-pandemic/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Sutton Trust — Private Tuition</a> — participation rates by income group, cost trends. Annual survey.</p>
            <p><a href="https://www.gov.uk/government/publications/national-tutoring-programme-ntp-evaluation" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfE — National Tutoring Programme Evaluation</a> — participation, effectiveness, equity. Annual.</p>
            <p>Tutoring participation from Sutton Trust polling of parents (1,000+ sample). FSM tutoring rate from school-level surveys. Average cost is for secondary-level one-to-one tutoring in England. NTP participation includes academic mentors, tutoring partners, and school-led tutoring arms.</p>
          </div>
        </section>
      </main>
    </>
  );
}
