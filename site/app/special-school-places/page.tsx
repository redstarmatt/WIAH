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
  { num: 1, name: 'DfE', dataset: 'Special Educational Needs in England', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/special-educational-needs-in-england', date: '2024' },
  { num: 2, name: 'DfE', dataset: 'Education, Health and Care Plans', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/education-health-and-care-plans', date: '2024' },
  { num: 3, name: 'NAO', dataset: 'Support for Children with Special Educational Needs', url: 'https://www.nao.org.uk/reports/support-for-children-with-special-educational-needs/', date: '2023' },
];

const ehcpValues = [237000, 254000, 271000, 295000, 318000, 344000, 381000, 429000, 475000, 517000, 576000];
const specialSchoolPlacesValues = [98400, 99200, 100800, 103100, 106400, 110200, 115800, 122400, 129600, 136200, 143800];
const waitingTimeValues = [14.2, 15.1, 16.4, 17.8, 19.2, 20.6, 22.4, 24.8, 26.1, 27.4, 28.9];
const independentProviderValues = [22.4, 23.1, 24.2, 25.4, 26.8, 28.1, 29.6, 31.2, 33.4, 35.1, 37.2];

const series1: Series[] = [
  { id: 'ehcp', label: 'Children with EHC plans (thousands)', colour: '#E63946', data: ehcpValues.map((v, i) => ({ date: new Date(2013 + i, 0, 1), value: v / 1000 })) },
  { id: 'places', label: 'Special school places available (thousands)', colour: '#2A9D8F', data: specialSchoolPlacesValues.map((v, i) => ({ date: new Date(2013 + i, 0, 1), value: v / 1000 })) },
];

const series2: Series[] = [
  { id: 'wait', label: 'Average weeks to EHC plan assessment', colour: '#E63946', data: waitingTimeValues.map((v, i) => ({ date: new Date(2013 + i, 0, 1), value: v })) },
  { id: 'independent', label: 'Children in independent special schools (%)', colour: '#F4A261', data: independentProviderValues.map((v, i) => ({ date: new Date(2013 + i, 0, 1), value: v })) },
];

const annotations1: Annotation[] = [
  { date: new Date(2014, 8, 1), label: '2014: Children and Families Act — EHC plans replace statements' },
];

export default function SpecialSchoolPlacesPage() {
  return (
    <>
      <TopicNav topic="Special School Places" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Education"
          question="Are There Enough Special School Places?"
          finding={<>The number of children with Education, Health and Care plans has grown from 237,000 in 2013 to 576,000 in 2024 — a 143% increase — while special school places have grown by just 46%, creating a chronic shortage of specialist provision.<Cite nums={[1, 2]} /> The average time to complete an EHC plan assessment has risen to 28.9 weeks, nearly double the 20-week legal limit, and 37% of SEND children are now placed in costly independent schools because no maintained provision exists locally.<Cite nums={[2, 3]} /></>}
          colour="#2A9D8F"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The Education, Health and Care plan system — introduced by the Children and Families Act 2014 to replace the older statements of special educational need — was designed to provide a more holistic, child-centred approach to SEND support. Instead, it has coincided with a dramatic expansion in the numbers of children identified as having complex needs and a corresponding crisis in the availability of specialist provision. EHC plans now number 576,000, representing around 4.3% of all school-age children in England, and the figure has increased every year without exception. Local authorities are legally obligated to secure the provision specified in each plan, but the supply of maintained special school places has simply not kept pace with demand — leaving thousands of families in prolonged battles to secure appropriate placements.<Cite nums={[1, 2]} /></p>
            <p>The consequences of the supply shortage are severe and expensive. When maintained special schools are full, local authorities must place children in independent special schools, which typically cost £50,000–£100,000 per pupil per year, compared to around £25,000 in a maintained special school. This is driving SEND high-needs funding deficits across England — collectively local authorities carry deficits of over £2 billion on their SEND high-needs blocks, which are predicted to reach £4.9 billion by 2026 without intervention. The NAO has described the system as financially unsustainable, with councils caught between legal duties they cannot afford to meet and a national shortage of provision that no single local authority can solve alone.<Cite nums={3} /> The government&apos;s SEND Improvement Plan, published in 2023, has committed to a new generation of special free schools, but progress is slow and demand continues to outstrip supply.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-chart1', label: 'Plans & Places' },
          { id: 'sec-chart2', label: 'Waiting Times' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="Children with EHC plans" value="576,000" unit="in England" direction="up" polarity="flat" changeText="was 237,000 in 2013 · 143% increase in a decade" sparklineData={[237, 254, 271, 295, 318, 344, 381, 429, 475, 517, 576]} source="DfE — EHC Plans 2024" href="#sec-chart1" />
            <MetricCard label="EHC plan assessment wait" value="28.9 wks" unit="average" direction="up" polarity="up-is-bad" changeText="legal limit is 20 weeks · routinely breached" sparklineData={[14.2, 15.1, 16.4, 17.8, 19.2, 20.6, 22.4, 24.8, 26.1, 27.4, 28.9]} source="DfE — EHC Plans 2024" href="#sec-chart2" />
            <MetricCard label="Children in independent special schools" value="37.2%" unit="of SEND placements" direction="up" polarity="up-is-bad" changeText="was 22.4% in 2013 · costly shortage workaround" sparklineData={[22.4, 23.1, 24.2, 25.4, 26.8, 28.1, 29.6, 31.2, 33.4, 35.1, 37.2]} source="NAO — SEND Support 2023" href="#sec-chart2" />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="EHC plans and special school places, England, 2013–2024"
              subtitle="Number of children with Education, Health and Care plans (thousands) and maintained special school places available (thousands). The widening gap drives children into expensive independent provision."
              series={series1}
              annotations={annotations1}
              yLabel="Thousands"
              source={{ name: 'DfE', dataset: 'Special Educational Needs in England', url: 'https://explore-education-statistics.service.gov.uk/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="EHC plan assessment waiting times and independent school placements, 2013–2024"
              subtitle="Average weeks to complete EHC plan assessment (20-week legal limit) and % of SEND children placed in independent special schools. Both indicate a system under severe strain."
              series={series2}
              annotations={[]}
              yLabel="Weeks / Percentage"
              source={{ name: 'DfE', dataset: 'Education, Health and Care Plans', url: 'https://explore-education-statistics.service.gov.uk/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="New special free schools accelerating"
            value="60"
            unit="new special free schools approved since 2022 SEND Review"
            description="The government's SEND and Alternative Provision Improvement Plan, published in 2023, approved 60 new special free schools to be built by 2025, with a further wave planned. Each school will provide 100–200 specialist places for children with autism, learning disabilities, and complex communication needs. Where new schools have opened in areas of high need, the proportion of children placed out of their home area has fallen, travel times to school have reduced, and costs to local authorities have decreased significantly. The challenge is that approved schools take 3–5 years from approval to opening, so the capacity crisis will deepen before it improves."
            source="Source: DfE — SEND and AP Improvement Plan 2023. NAO 2023."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://explore-education-statistics.service.gov.uk/find-statistics/special-educational-needs-in-england" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfE — Special Educational Needs in England</a> — EHC plan numbers, school type, placement. Annual.</p>
            <p><a href="https://explore-education-statistics.service.gov.uk/find-statistics/education-health-and-care-plans" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfE — Education, Health and Care Plans</a> — timeliness, outcomes, assessment compliance. Annual.</p>
            <p>EHC plan counts are at January each year. Special school places are maintained sector only. Independent school proportions from tribunal and placement data. Assessment timeliness from LA returns.</p>
          </div>
        </section>
      </main>
    </>
  );
}
