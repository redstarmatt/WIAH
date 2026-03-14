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
  { num: 1, name: 'DfE', dataset: 'Children Missing Education', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/children-missing-education', date: '2024' },
  { num: 2, name: 'DfE', dataset: 'Pupil Absence Statistics', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/pupil-absence-in-schools-in-england', date: '2024' },
  { num: 3, name: 'Local Government Association', dataset: 'Children Missing Education Survey', url: 'https://www.local.gov.uk/', date: '2024' },
];

const missingChildrenValues = [27000, 29000, 31000, 32000, 34000, 36000, 42000, 74000, 89000, 92000, 94000];
const persistentAbsenceValues = [10.4, 10.8, 11.2, 11.5, 12.0, 12.8, 22.5, 24.2, 22.1, 20.8, 19.4];
const homeEdRegisteredValues = [22000, 25000, 29000, 32000, 37000, 42000, 56000, 78000, 92000, 101000, 109000];
const exclusionRateValues = [0.04, 0.05, 0.07, 0.08, 0.10, 0.11, 0.07, 0.06, 0.07, 0.08, 0.09];

const series1: Series[] = [
  { id: 'missing', label: 'Children missing education (England)', colour: '#E63946', data: missingChildrenValues.map((v, i) => ({ date: new Date(2013 + i, 9, 1), value: v })) },
  { id: 'homeed', label: 'Registered home-educated children', colour: '#264653', data: homeEdRegisteredValues.map((v, i) => ({ date: new Date(2013 + i, 9, 1), value: v })) },
];

const series2: Series[] = [
  { id: 'persistent', label: 'Persistent absence rate (%)', colour: '#E63946', data: persistentAbsenceValues.map((v, i) => ({ date: new Date(2013 + i, 9, 1), value: v })) },
  { id: 'exclusion', label: 'Permanent exclusion rate (per 100 pupils)', colour: '#F4A261', data: exclusionRateValues.map((v, i) => ({ date: new Date(2013 + i, 9, 1), value: v })) },
];

const annotations1: Annotation[] = [
  { date: new Date(2020, 2, 1), label: '2020: COVID — school closures' },
];

export default function ChildrenMissingEducationPage() {
  return (
    <>
      <TopicNav topic="Children Missing Education" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Education"
          question="How Many Children Are Missing From School?"
          finding={<>Around 94,000 children in England are &quot;missing education&quot; — not on any school roll, not registered for home education, and not in any other known provision — a figure that has more than tripled since 2013 and includes some of the UK&apos;s most vulnerable children.<Cite nums={1} /> Separately, 19.4% of all pupils are &quot;persistently absent&quot; — missing 10% or more of their sessions — still far above pre-pandemic levels.<Cite nums={2} /></>}
          colour="#2A9D8F"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Children missing education represent one of the most serious blind spots in the English education system. The 94,000 children identified as missing from education by local authorities are those who have fallen off all known registers — not attending school, not registered for home education, and not in college or alternative provision. They include children who have been excluded and not found alternative placements, children who have returned from abroad and not been re-enrolled, children in unstable housing, and children being withheld by families for safeguarding reasons that may themselves be concerning. For many, the consequence of missing education is also missing the safeguarding protections that schools provide — the teachers, counsellors, and pastoral staff who identify abuse and neglect.<Cite nums={[1, 3]} /></p>
            <p>The persistent absence crisis — the proportion of pupils missing 10% or more of school sessions — is a separate but related challenge. Pre-pandemic, the persistent absence rate was around 12%. It surged to 24% during COVID and has fallen back only slowly to 19.4% in 2023/24. This means nearly 1 in 5 of all English school pupils is significantly disengaged from education. The causes are multiple: mental health difficulties (particularly anxiety), chronic physical illness, a perception among some families that school is not safe post-pandemic, and inadequate SEND support leading to avoidant behaviour in children who are not getting the help they need. The government&apos;s attendance improvement strategy — including daily registers, automated referrals for poor attendance, and penalty notices — has had limited effect because most persistent absence has underlying causes that fines do not address.<Cite nums={[1, 2]} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-chart1', label: 'Missing Children' },
          { id: 'sec-chart2', label: 'Persistent Absence' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="Children missing education" value="94,000" unit="England" direction="up" polarity="up-is-bad" changeText="was 27,000 in 2013 · tripled in a decade" sparklineData={[27000, 29000, 31000, 32000, 34000, 36000, 42000, 74000, 89000, 92000, 94000]} source="DfE — Children Missing Education 2024" href="#sec-chart1" />
            <MetricCard label="Persistent absence rate" value="19.4%" unit="of all pupils" direction="up" polarity="up-is-bad" changeText="was 10.4% pre-pandemic · still nearly double" sparklineData={[10.4, 10.8, 11.2, 11.5, 12.0, 12.8, 22.5, 24.2, 22.1, 20.8, 19.4]} source="DfE — Pupil Absence Statistics 2024" href="#sec-chart2" />
            <MetricCard label="Registered home-educated" value="109,000" unit="children" direction="up" polarity="flat" changeText="was 22,000 in 2013 · COVID accelerated growth" sparklineData={[22000, 25000, 29000, 32000, 37000, 42000, 56000, 78000, 92000, 101000, 109000]} source="DfE — Children Missing Education 2024" href="#sec-chart1" />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Children missing education and home-educated children, England, 2013–2024"
              subtitle="Children identified as missing education (no known provision) and children registered for home education. Both growing rapidly; COVID caused step-changes in both. Home education is legal and growing; CME is a safeguarding concern."
              series={series1}
              annotations={annotations1}
              yLabel="Number of children"
              source={{ name: 'DfE', dataset: 'Children Missing Education', url: 'https://explore-education-statistics.service.gov.uk/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Persistent absence rate and permanent exclusions, 2013–2024"
              subtitle="Proportion of pupils with 10%+ absence (persistently absent, %) and permanent exclusion rate per 100 pupils. Persistent absence surged during COVID and is only slowly recovering."
              series={series2}
              annotations={[]}
              yLabel="% / Per 100 pupils"
              source={{ name: 'DfE', dataset: 'Pupil Absence Statistics', url: 'https://explore-education-statistics.service.gov.uk/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Attendance hubs showing results in worst-affected schools"
            value="8pp"
            unit="attendance improvement in schools that joined the attendance hub network"
            description="The government's Attendance Hub network — which pairs schools with strong attendance records with schools facing the most severe challenges — has shown early evidence of effectiveness. Schools that joined the network in 2022/23 improved average attendance by around 8 percentage points over two years. The hubs focus on practical interventions: pastoral outreach to families, breakfast clubs, dedicated attendance officers, and mental health support. DfE has committed to expanding the network to 600 schools by 2025."
            source="Source: DfE — Attendance Hub Evaluation 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://explore-education-statistics.service.gov.uk/find-statistics/children-missing-education" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfE — Children Missing Education</a> — CME numbers, home education registrations. Annual.</p>
            <p><a href="https://explore-education-statistics.service.gov.uk/find-statistics/pupil-absence-in-schools-in-england" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfE — Pupil Absence Statistics</a> — overall absence, persistent absence, authorised vs unauthorised. Annual.</p>
            <p>CME is children not on any school register, not in registered home education, and not accounted for by the local authority. Persistent absence is defined as missing 10% or more of possible sessions in an academic year. Academic year runs September to July.</p>
          </div>
        </section>
      </main>
    </>
  );
}
