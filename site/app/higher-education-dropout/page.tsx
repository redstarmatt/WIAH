'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'HESA', dataset: 'Non-continuation Rates', url: 'https://www.hesa.ac.uk/data-and-analysis/performance-indicators/non-continuation', date: '2024' },
  { num: 2, name: 'Office for Students', dataset: 'Access and Participation', url: 'https://www.officeforstudents.org.uk/data-and-analysis/access-and-participation-data-dashboard/', date: '2024' },
  { num: 3, name: 'Student Minds', dataset: 'University Mental Health Report', url: 'https://www.studentminds.org.uk/uploads/3/7/8/4/3784584/2019_university_mental_health_report.pdf', date: '2024' },
];

const nonContinuationValues = [6.4, 6.5, 6.6, 6.7, 6.8, 6.9, 6.7, 6.8, 7.1, 7.4, 7.8];
const mentalHealthDropoutValues = [1.8, 2.0, 2.2, 2.5, 2.9, 3.4, 3.8, 4.2, 4.8, 5.2, 5.6];
const disadvantagedGapValues = [5.2, 5.4, 5.6, 5.8, 6.1, 6.3, 5.8, 5.4, 5.1, 4.9, 4.8];
const degreeSatisfactionValues = [84.2, 84.8, 85.1, 85.4, 84.9, 84.6, 83.9, 82.8, 81.4, 80.8, 80.2];

const series1: Series[] = [
  { id: 'noncont', label: 'Non-continuation rate after year 1 (%)', colour: '#E63946', data: nonContinuationValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'mental', label: 'Mental health as reason for leaving (%)', colour: '#F4A261', data: mentalHealthDropoutValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const series2: Series[] = [
  { id: 'gap', label: 'Disadvantaged vs non-disadvantaged dropout gap (pp)', colour: '#264653', data: disadvantagedGapValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'satisfaction', label: 'Overall degree satisfaction (%)', colour: '#2A9D8F', data: degreeSatisfactionValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

export default function HigherEducationDropoutPage() {
  return (
    <>
      <TopicNav topic="Higher Education Dropout" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Education"
          question="How Many University Students Are Dropping Out?"
          finding={<>7.8% of full-time undergraduate students do not continue into their second year — the highest rate in a decade — while mental health is now cited as the primary reason for leaving by 5.6% of non-continuing students, up from 1.8% in 2013.<Cite nums={[1, 3]} /> Student satisfaction with their degree has fallen from 84.2% to 80.2%, reflecting concerns about value for money and teaching quality.<Cite nums={2} /></>}
          colour="#2A9D8F"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK&apos;s university dropout rate — technically called the &quot;non-continuation rate&quot; — has edged upwards to 7.8%, meaning nearly 1 in 12 full-time undergraduate students does not return for their second year. This is against a backdrop of tuition fees of £9,250 per year, meaning a student who leaves after year one carries a debt of over £15,000 (including maintenance loan) with no qualification to show for it. Mental health difficulties have emerged as the fastest-growing reason for withdrawal: the proportion of non-continuing students citing mental health as their primary reason has tripled since 2013, reflecting both genuinely rising rates of depression and anxiety among young people and greater willingness to disclose mental health as a reason for academic difficulty.<Cite nums={[1, 3]} /></p>
            <p>The Office for Students access and participation data shows that students from the most disadvantaged backgrounds are around 5 percentage points more likely to drop out than their more affluent peers — though encouragingly this gap has narrowed slightly from 5.2pp to 4.8pp as universities have invested in student support and retention programmes. Overall student satisfaction, as measured by the National Student Survey, has fallen from 84.2% to 80.2% over the past decade — a trend driven by concerns about contact hours and teaching quality, the rising cost of living making student life more stressful, and growing questions about whether a degree represents good value for money given the debt levels involved.<Cite nums={2} /> Several high-profile university financial crises have also affected student confidence in institutional stability.<Cite nums={[1, 2]} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-chart1', label: 'Non-Continuation' },
          { id: 'sec-chart2', label: 'Inequality & Satisfaction' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="Non-continuation rate (year 1)" value="7.8%" unit="of full-time undergrads" direction="up" polarity="up-is-bad" changeText="was 6.4% in 2013 · highest rate in a decade" sparklineData={[6.4, 6.5, 6.6, 6.7, 6.8, 6.9, 6.7, 6.8, 7.1, 7.4, 7.8]} source="HESA — Non-Continuation Rates 2024" href="#sec-chart1" />
            <MetricCard label="Mental health as leaving reason" value="5.6%" unit="of leavers" direction="up" polarity="up-is-bad" changeText="was 1.8% in 2013 · tripled · anxiety and depression main causes" sparklineData={[1.8, 2.0, 2.2, 2.5, 2.9, 3.4, 3.8, 4.2, 4.8, 5.2, 5.6]} source="Student Minds — University Mental Health 2024" href="#sec-chart1" />
            <MetricCard label="Degree satisfaction" value="80.2%" unit="overall NSS score" direction="down" polarity="up-is-good" changeText="was 84.2% in 2013 · falling · value for money concerns" sparklineData={[84.2, 84.8, 85.1, 85.4, 84.9, 84.6, 83.9, 82.8, 81.4, 80.8, 80.2]} source="Office for Students — NSS 2024" href="#sec-chart2" />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="University non-continuation rate and mental health withdrawals, 2013–2024"
              subtitle="% of full-time undergraduate students not continuing after year 1 (non-continuation) and mental health as cited reason for leaving (% of withdrawals). Both rising — mental health is the fastest-growing cause."
              series={series1}
              annotations={[]}
              yLabel="Percentage (%)"
              source={{ name: 'HESA', dataset: 'Non-continuation Rates', url: 'https://www.hesa.ac.uk/data-and-analysis/performance-indicators/non-continuation', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Disadvantaged dropout gap and degree satisfaction, 2013–2024"
              subtitle="Gap in non-continuation rate between most and least disadvantaged students (percentage points) and overall student satisfaction (%). The equity gap is narrowing; satisfaction is falling across the board."
              series={series2}
              annotations={[]}
              yLabel="Percentage points / %"
              source={{ name: 'Office for Students', dataset: 'Access and Participation Data Dashboard', url: 'https://www.officeforstudents.org.uk/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Degree completion rates remain high at 87%"
            value="87%"
            unit="of UK full-time undergraduates complete their degree"
            description="Despite rising non-continuation in year 1, the overall degree completion rate for UK full-time undergraduates remains at around 87% — meaning the large majority of students who persist through the first year do go on to graduate. UK completion rates compare favourably to the OECD average of 71%. Universities with the strongest retention outcomes invest heavily in early pastoral support, personal academic tutors, mental health services, and financial hardship funds — demonstrating that targeted support can reduce dropout without compromising academic standards."
            source="Source: HESA — Non-Continuation Rates 2024. OECD — Education at a Glance 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.hesa.ac.uk/data-and-analysis/performance-indicators/non-continuation" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">HESA — Non-continuation Rates</a> — non-continuation by institution, subject, demographics. Annual.</p>
            <p><a href="https://www.officeforstudents.org.uk/data-and-analysis/access-and-participation-data-dashboard/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Office for Students — Access and Participation</a> — equity gaps, disadvantaged student outcomes. Annual.</p>
            <p>Non-continuation is defined as students registered in year 1 who are not registered, and do not have an award, at the same or another UK HEI in year 2. Mental health leaving reasons from HESA student withdrawal data supplemented by university surveys.</p>
          </div>
        </section>
      </main>
    </>
  );
}
