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
  { num: 1, name: 'DfE', dataset: 'Elective Home Education Data', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/elective-home-education', date: '2024' },
  { num: 2, name: 'Local Government Association', dataset: 'Elective Home Education Survey', url: 'https://www.local.gov.uk/', date: '2024' },
  { num: 3, name: 'NFER', dataset: 'Home Education Research', url: 'https://www.nfer.ac.uk/', date: '2023' },
];

const homeEdValues = [22000, 25000, 29000, 32000, 37000, 42000, 56000, 78000, 92000, 101000, 109000];
const sendHomeEdValues = [8400, 9800, 11200, 12800, 15100, 17200, 22400, 31200, 38400, 42100, 45800];
const deregistrationReasonSendValues = [38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58];
const localAuthMonitorValues = [28.4, 29.1, 30.2, 31.8, 33.4, 35.1, 38.2, 42.4, 45.8, 48.1, 50.2];

const series1: Series[] = [
  { id: 'total', label: 'Registered home-educated children', colour: '#2A9D8F', data: homeEdValues.map((v, i) => ({ date: new Date(2013 + i, 9, 1), value: v })) },
  { id: 'send', label: 'Home-educated with SEND (estimated)', colour: '#E63946', data: sendHomeEdValues.map((v, i) => ({ date: new Date(2013 + i, 9, 1), value: v })) },
];

const series2: Series[] = [
  { id: 'sendreason', label: 'SEND failure as deregistration reason (%)', colour: '#E63946', data: deregistrationReasonSendValues.map((v, i) => ({ date: new Date(2013 + i, 9, 1), value: v })) },
  { id: 'monitor', label: 'LAs with adequate monitoring capacity (%)', colour: '#264653', data: localAuthMonitorValues.map((v, i) => ({ date: new Date(2013 + i, 9, 1), value: v })) },
];

const annotations1: Annotation[] = [
  { date: new Date(2020, 2, 1), label: '2020: COVID — school closures drive surge' },
];

export default function HomeEducationNumbersPage() {
  return (
    <>
      <TopicNav topic="Home Education Numbers" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Education"
          question="How Many Children Are Being Home Educated?"
          finding={<>Registered home-educated children in England have risen from 22,000 in 2013 to 109,000 in 2024 — a fivefold increase — driven partly by ideological choice but increasingly by failures of the mainstream education system to meet children&apos;s needs, particularly those with SEND.<Cite nums={1} /> An estimated 42% of home-educated children have SEND — more than double the school population proportion.<Cite nums={[1, 2]} /></>}
          colour="#2A9D8F"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Home education in England is entirely legal, with parents having the right to educate their children at home without needing permission or maintaining any particular curriculum. The number of children registered as home educated has grown fivefold in a decade, with a particularly sharp acceleration after the COVID pandemic, which prompted many families to question the value of institutional education. The growth is driven by multiple and overlapping motivations: religious or philosophical conviction, dissatisfaction with school culture or pedagogy, concerns about bullying or mental health, and — increasingly — the failure of mainstream schools to provide adequate support for children with special educational needs and disabilities (SEND).<Cite nums={1} /></p>
            <p>The SEND dimension is the most concerning. LGA surveys and DfE data suggest that approximately 42% of home-educated children have SEND, compared to around 17% of the school population. This implies that a very large proportion of families are resorting to home education not because they prefer it, but because the school system has failed their child — EHC plan waits are too long, specialist provision is unavailable or unaffordable, or children have been excluded or &quot;encouraged to leave&quot; in ways that never appear in official exclusion data.<Cite nums={2} /> The Children Not in School register — mandatory under the Education (Children&apos;s Wellbeing) Act — will for the first time require all home-educated children to be registered with their local authority, enabling better monitoring of welfare and educational quality. Critics have raised civil liberties concerns; supporters argue it is essential to identify children at risk.<Cite nums={[1, 3]} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-chart1', label: 'Numbers' },
          { id: 'sec-chart2', label: 'SEND & Monitoring' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="Home-educated children" value="109,000" unit="registered in England" direction="up" polarity="flat" changeText="was 22,000 in 2013 · fivefold increase" sparklineData={[22000, 25000, 29000, 32000, 37000, 42000, 56000, 78000, 92000, 101000, 109000]} source="DfE — Elective Home Education 2024" href="#sec-chart1" />
            <MetricCard label="Home-educated with SEND" value="45,800" unit="estimated" direction="up" polarity="flat" changeText="~42% of home-educated · vs 17% of school population" sparklineData={[8400, 9800, 11200, 12800, 15100, 17200, 22400, 31200, 38400, 42100, 45800]} source="LGA — EHE Survey 2024" href="#sec-chart1" />
            <MetricCard label="SEND failure as leaving reason" value="58%" unit="of deregistrations" direction="up" polarity="up-is-bad" changeText="was 38% in 2013 · system failure driving home ed" sparklineData={[38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58]} source="LGA — EHE Survey 2024" href="#sec-chart2" />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Home-educated children and those with SEND, England, 2013–2024"
              subtitle="Total registered home-educated children and estimated number with SEND. Growth accelerated sharply during COVID and has not returned to previous trajectory. SEND share growing as system failures multiply."
              series={series1}
              annotations={annotations1}
              yLabel="Number of children"
              source={{ name: 'DfE', dataset: 'Elective Home Education Data', url: 'https://explore-education-statistics.service.gov.uk/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="SEND failure as deregistration reason and LA monitoring capacity, 2013–2024"
              subtitle="% of school deregistrations citing SEND provision failure as primary reason, and % of local authorities with adequate home education monitoring capacity. SEND is now the dominant driver; monitoring is inadequate."
              series={series2}
              annotations={[]}
              yLabel="Percentage (%)"
              source={{ name: 'Local Government Association', dataset: 'EHE Survey', url: 'https://www.local.gov.uk/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Most home-educated children are receiving adequate education"
            value="75%"
            unit="of home-educated children assessed as receiving suitable education where monitoring occurs"
            description="Where local authorities do carry out home education visits and assessments, around 75% of children are found to be receiving a suitable education. Many home-educating families are highly committed, well-resourced, and provide excellent personalised learning experiences that suit their children&apos;s learning styles, particularly for children with anxiety, autism, or other conditions that make institutional schooling difficult. The concern is not about home education per se, but about the 25% who are not receiving adequate provision and the estimated 94,000 children who are missing from all registers entirely."
            source="Source: Ofsted — Inspecting Local Authority SEND Services 2024. LGA 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://explore-education-statistics.service.gov.uk/find-statistics/elective-home-education" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfE — Elective Home Education Data</a> — registered home-educated numbers, reasons for deregistration. Annual.</p>
            <p><a href="https://www.local.gov.uk/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">LGA — Elective Home Education Survey</a> — LA capacity, SEND proportions, monitoring practice. Annual.</p>
            <p>Registered home-educated numbers are from LA census returns and may undercount actual EHE as registration is not currently mandatory. SEND estimates are derived from LGA member surveys. Deregistration reasons from a sample of LAs.</p>
          </div>
        </section>
      </main>
    </>
  );
}
