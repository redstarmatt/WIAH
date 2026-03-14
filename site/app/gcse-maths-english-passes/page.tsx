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
  { num: 1, name: 'DfE', dataset: 'GCSE and Equivalent Results in England', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/gcse-and-equivalent-results', date: '2024' },
  { num: 2, name: 'Ofqual', dataset: 'GCSE Results Statistics', url: 'https://www.gov.uk/government/organisations/ofqual/about/statistics', date: '2024' },
  { num: 3, name: 'Education Endowment Foundation', dataset: 'Attainment Gap Report', url: 'https://educationendowmentfoundation.org.uk/', date: '2024' },
];

const grade4PassValues = [55.2, 56.4, 57.2, 59.1, 61.4, 64.2, 76.3, 74.8, 65.4, 66.2, 67.1];
const grade5StrongPassValues = [38.4, 39.2, 40.1, 41.3, 43.2, 44.8, 60.1, 58.2, 49.8, 51.2, 52.4];
const fsmGapValues = [27.4, 27.1, 26.8, 26.4, 26.1, 26.0, 23.8, 22.4, 23.1, 23.8, 24.2];
const mathsEnglishBothValues = [53.2, 54.1, 55.0, 56.8, 58.9, 60.4, 73.1, 71.4, 62.8, 63.7, 64.5];

const series1: Series[] = [
  { id: 'grade4', label: 'Grade 4+ in English and Maths (%)', colour: '#2A9D8F', data: grade4PassValues.map((v, i) => ({ date: new Date(2013 + i, 7, 1), value: v })) },
  { id: 'grade5', label: 'Grade 5+ strong pass (%)', colour: '#264653', data: grade5StrongPassValues.map((v, i) => ({ date: new Date(2013 + i, 7, 1), value: v })) },
];

const series2: Series[] = [
  { id: 'fsmgap', label: 'FSM vs non-FSM attainment gap (pp)', colour: '#E63946', data: fsmGapValues.map((v, i) => ({ date: new Date(2013 + i, 7, 1), value: v })) },
  { id: 'both', label: 'Grade 4+ in both English AND Maths (%)', colour: '#F4A261', data: mathsEnglishBothValues.map((v, i) => ({ date: new Date(2013 + i, 7, 1), value: v })) },
];

const annotations1: Annotation[] = [
  { date: new Date(2017, 7, 1), label: '2017: New 9–1 grading introduced' },
  { date: new Date(2020, 7, 1), label: '2020: CAGs replace exams' },
  { date: new Date(2022, 7, 1), label: '2022: Return to exams' },
];

export default function GcseMathsEnglishPassesPage() {
  return (
    <>
      <TopicNav topic="GCSE Maths & English Passes" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Education"
          question="How Many School Leavers Pass Maths and English?"
          finding={<>67.1% of GCSE students achieved grade 4 or above in English, and 64.5% achieved grade 4 in both English and Maths in 2024 — above pre-pandemic levels but still leaving around 1 in 3 school leavers without the standard threshold for most further education and employment.<Cite nums={[1, 2]} /> The attainment gap between disadvantaged pupils and their peers was 24.2 percentage points — slightly wider than the pre-pandemic figure.<Cite nums={[1, 3]} /></>}
          colour="#2A9D8F"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>English and Mathematics GCSEs are the gatekeeping qualifications of the British education system. Grade 4 (formerly a C grade) or above is the standard threshold for sixth-form college entry, most apprenticeships, and many employers&apos; recruitment processes. Grade 5 (a &quot;strong pass&quot;) is required for an increasing number of post-16 pathways and university courses. Since the introduction of the 9–1 grading system in 2017, tracking longitudinal trends requires careful translation, but the overall picture is one of gradual improvement with significant pandemic-related disruption.<Cite nums={1} /> The pandemic teacher-assessed grade years (2020 and 2021) produced dramatically inflated results, with grade 4+ rates reaching 76.3% in Maths in 2021 before falling sharply back to 65.4% in 2022 when exams resumed — causing significant disruption to school admissions and employer expectations.</p>
            <p>The disadvantaged attainment gap — the difference in outcomes between pupils eligible for free school meals and their more affluent peers — is 24.2 percentage points. This means that if 64.5% of all pupils achieve grade 4+ in both English and Maths, only around 40% of free-school-meal-eligible pupils do so. Despite a decade of Pupil Premium investment and policy focus, this gap has narrowed only marginally and has widened slightly since the pandemic disrupted targeted provision for disadvantaged pupils.<Cite nums={3} /> The Education Endowment Foundation&apos;s research consistently identifies high-quality teaching, structured literacy and numeracy intervention programmes, and good attendance as the most effective levers — but implementation quality varies enormously between schools and areas.<Cite nums={[1, 3]} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-chart1', label: 'Pass Rates' },
          { id: 'sec-chart2', label: 'Attainment Gap' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="Grade 4+ in English (all pupils)" value="67.1%" unit="of GCSE students" direction="up" polarity="up-is-good" changeText="was 55.2% in 2013 · peaked at 76.3% in 2021" sparklineData={[55.2, 56.4, 57.2, 59.1, 61.4, 64.2, 76.3, 74.8, 65.4, 66.2, 67.1]} source="DfE — GCSE and Equivalent Results 2024" href="#sec-chart1" />
            <MetricCard label="Grade 4+ in both English AND Maths" value="64.5%" unit="of GCSE students" direction="up" polarity="up-is-good" changeText="was 53.2% in 2013 · 1 in 3 still below standard" sparklineData={[53.2, 54.1, 55.0, 56.8, 58.9, 60.4, 73.1, 71.4, 62.8, 63.7, 64.5]} source="DfE — GCSE and Equivalent Results 2024" href="#sec-chart1" />
            <MetricCard label="FSM attainment gap" value="24.2pp" unit="vs non-FSM pupils" direction="up" polarity="up-is-bad" changeText="was 27.4pp in 2013 · narrowed then widened post-COVID" sparklineData={[27.4, 27.1, 26.8, 26.4, 26.1, 26.0, 23.8, 22.4, 23.1, 23.8, 24.2]} source="EEF — Attainment Gap Report 2024" href="#sec-chart2" />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="GCSE English and Maths grade 4+ pass rates, 2013–2024"
              subtitle="% achieving grade 4 (standard pass) or above in English, strong pass (grade 5+) and both English and Maths. Pandemic years show major grade inflation; 2022 return to exams shows the true picture."
              series={series1}
              annotations={annotations1}
              yLabel="Percentage (%)"
              source={{ name: 'DfE', dataset: 'GCSE and Equivalent Results in England', url: 'https://explore-education-statistics.service.gov.uk/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="FSM attainment gap and dual pass rate, 2013–2024"
              subtitle="Attainment gap between FSM and non-FSM pupils in grade 4+ English and Maths (percentage points) and overall dual pass rate. The gap narrowed pre-pandemic but has widened again since 2022."
              series={series2}
              annotations={[]}
              yLabel="Percentage points / %"
              source={{ name: 'Education Endowment Foundation', dataset: 'Attainment Gap Report', url: 'https://educationendowmentfoundation.org.uk/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="National Tutoring Programme: 2 million pupils reached"
            value="2M"
            unit="pupils from disadvantaged backgrounds supported through National Tutoring Programme"
            description="The National Tutoring Programme, launched in 2020 to address pandemic learning loss, has supported over 2 million pupils with subsidised tutoring in English and Maths. Evaluation evidence shows average gains of 2–3 months of learning in subjects where tutoring was provided. The programme prioritises pupils from disadvantaged backgrounds and schools in underperforming areas. School-led tutoring — where trained teachers or teaching assistants deliver intensive small-group sessions — has shown the strongest results and lowest cost."
            source="Source: DfE — National Tutoring Programme Evaluation 2024. Education Endowment Foundation 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://explore-education-statistics.service.gov.uk/find-statistics/gcse-and-equivalent-results" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfE — GCSE and Equivalent Results</a> — grade distributions, subject, demographics. Annual.</p>
            <p><a href="https://educationendowmentfoundation.org.uk/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">EEF — Attainment Gap Report</a> — FSM vs non-FSM gap, trends, interventions. Annual.</p>
            <p>Grade 4 = standard pass (equivalent to old grade C). Grade 5 = strong pass. FSM = eligible for free school meals (proxy for disadvantage). 2020 and 2021 used teacher-assessed grades. Pre-2017 data uses old A*–C equivalent.</p>
          </div>
        </section>
      </main>
    </>
  );
}
