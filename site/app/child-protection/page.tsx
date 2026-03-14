'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

// Child protection referrals (thousands) and children in care (thousands), 2012–2024
const referralsData = [521, 545, 570, 590, 604, 630, 640, 655, 670, 690, 714, 720, 730];
const childrenInCareData = [65.5, 66.5, 68.1, 69.5, 72.7, 75.0, 78.2, 80.1, 82.2, 83.8, 84.5, 85.0, 85.5];

// Social worker vacancy rate (%) and average caseload, 2012–2024
const swVacancyData = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 21, 20, 19];
const caseloadData = [13, 13, 14, 14, 15, 16, 17, 17, 18, 19, 19, 18, 18];

const referralsSeries: Series[] = [
  {
    id: 'referrals',
    label: 'Child protection referrals (thousands)',
    colour: '#E63946',
    data: referralsData.map((v, i) => ({ date: new Date(2012 + i, 5, 1), value: v })),
  },
  {
    id: 'childrenInCare',
    label: 'Children in care (thousands)',
    colour: '#F4A261',
    data: childrenInCareData.map((v, i) => ({ date: new Date(2012 + i, 5, 1), value: v })),
  },
];

const workforceSeries: Series[] = [
  {
    id: 'swVacancy',
    label: 'Social worker vacancy rate (%)',
    colour: '#E63946',
    data: swVacancyData.map((v, i) => ({ date: new Date(2012 + i, 5, 1), value: v })),
  },
  {
    id: 'caseload',
    label: 'Average caseload per social worker',
    colour: '#264653',
    data: caseloadData.map((v, i) => ({ date: new Date(2012 + i, 5, 1), value: v })),
  },
];

const referralsAnnotations: Annotation[] = [
  { date: new Date(2020, 5, 1), label: '2020: Pandemic disrupts identification and referral' },
  { date: new Date(2022, 5, 1), label: '2022: MacAlister Review publishes children\'s social care reform' },
];

const workforceAnnotations: Annotation[] = [
  { date: new Date(2017, 5, 1), label: '2017: Social Work England replaces HCPC registration' },
  { date: new Date(2023, 5, 1), label: '2023: Workforce crisis leads to mandatory agency cost caps' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'DfE', dataset: 'Children in Need Census', url: 'https://www.gov.uk/government/collections/statistics-children-in-need', date: '2024' },
  { num: 2, name: 'DfE', dataset: 'Looked After Children Statistics', url: 'https://www.gov.uk/government/collections/statistics-looked-after-children', date: '2024' },
  { num: 3, name: 'DfE', dataset: "Children's Social Care Workforce Survey", url: 'https://www.gov.uk/government/collections/statistics-childrens-social-care-workforce', date: '2024' },
  { num: 4, name: 'Independent Review of Children\'s Social Care', dataset: 'MacAlister Review Final Report', date: '2022' },
];

export default function ChildProtectionPage() {
  return (
    <>
      <TopicNav topic="Child Protection" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Children & Families"
          question="Are Children Being Protected?"
          finding="Child protection referrals have reached record levels — 730,000 per year — while 85,500 children are in local authority care, also a record. Social worker vacancy rates of 19% and average caseloads of 18 per worker mean the system is structurally under-resourced. Serious case reviews into preventable child deaths have found the same warning signs missed repeatedly."
          colour="#E63946"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England's child protection system is carrying a load it was not designed for. In 2024, local authorities received around 730,000 referrals to children's social care — up 40% since 2012.<Cite nums={1} /> At the same moment, 85,500 children were in local authority care, a record high and 30% more than a decade ago; a further 52,000 were on child protection plans.<Cite nums={2} /> These numbers have risen in almost every year since 2008. They do not describe a system in crisis at the margins — they describe structural overload at the centre, driven by rising domestic abuse, parental substance misuse, mental health crises, and a family support system cut by nearly 50% in real terms since 2010.</p>
            <p>The workforce cannot absorb this demand. Social worker vacancy rates stand at around 19%, with average caseloads of 18 cases per worker — well above what professional bodies consider safe for complex child protection work.<Cite nums={3} /> The gap is filled by agency staff at significantly higher cost to already stretched council budgets. Turnover runs at 16% per year, eroding the continuity of relationship that effective child protection depends on.<Cite nums={3} /> The consequences are visible in the record of serious case reviews: Arthur Labinjo-Hughes and Star Hobson, both murdered in 2020 by family members, had multiple prior contacts with social services. The Child Safeguarding Practice Review Panel reviewed 256 serious incidents in 2022–23 alone. The 2022 MacAlister Review found children's social care requires transformative reform rather than incremental adjustment.<Cite nums={4} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Referrals & Care' },
          { id: 'sec-chart2', label: 'Workforce' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Child protection referrals per year"
              value="730,000"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="Up 40% since 2012 · record high · system under severe pressure"
              sparklineData={[521, 545, 570, 590, 604, 630, 640, 655, 670, 690, 714, 720, 730]}
              source="DfE · Children in Need Census 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Children in local authority care"
              value="85,500"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="Record high · up 30% since 2012 · 52,000 on protection plans"
              sparklineData={[65.5, 66.5, 68.1, 69.5, 72.7, 75.0, 78.2, 80.1, 82.2, 83.8, 84.5, 85.0, 85.5]}
              source="DfE · Children Looked After in England 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Social worker vacancy rate"
              value="19%"
              unit="children's services"
              direction="down"
              polarity="up-is-bad"
              changeText="Slightly improved from 21% peak · average caseload 18 per worker"
              sparklineData={[12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 21, 20, 19]}
              source="DfE · Children's Social Care Workforce Survey 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Child protection referrals and children in care, England, 2012–2024"
              subtitle="Annual referrals to children's social care (thousands, red) and children in local authority care at year end (thousands, amber). Both at record highs, driven by rising adverse childhood experiences and reduced family support."
              series={referralsSeries}
              annotations={referralsAnnotations}
              yLabel="Thousands"
              source={{ name: 'Department for Education', dataset: 'Children in Need Census / Looked After Children Statistics', url: 'https://www.gov.uk/government/collections/statistics-children-in-need', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Children's social work vacancies and average caseloads, England, 2012–2024"
              subtitle="Social worker vacancy rate % (red) and average number of open cases per social worker (dark). Both measures reflect a workforce stretched beyond professional safety guidance."
              series={workforceSeries}
              annotations={workforceAnnotations}
              yLabel="Vacancy rate (%) / Average caseload"
              source={{ name: 'DfE', dataset: "Children's Social Care Workforce Survey", url: 'https://www.gov.uk/government/collections/statistics-childrens-social-care-workforce', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Family Hubs: multi-agency early support in 75 local authorities"
            value="75"
            unit="local authorities with Family Hubs by 2025"
            description="The government's Family Hubs programme — funded from 2022 — is establishing multi-agency support centres in 75 local authorities, modelled on the original Sure Start children's centres of the early 2000s. Evidence from Sure Start showed reductions in abuse and neglect, improved school readiness, and lower juvenile offending in areas with centres. The MacAlister Review also recommended a reform of the child protection threshold, moving toward a higher-support, lower-crisis model that provides intensive family support before children enter care — the 'Family Group Decision Making' model, now being piloted nationally."
            source="Source: DfE — Family Hubs programme 2024. Independent Review of Children's Social Care (MacAlister) — Final Report 2022."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/statistics-children-in-need" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfE — Children in Need Census</a> — annual referrals, assessments, and child protection plan data. Retrieved March 2026.</p>
            <p><a href="https://www.gov.uk/government/collections/statistics-looked-after-children" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfE — Looked After Children Statistics</a> — children in care, placements, and outcomes. Retrieved March 2026.</p>
            <p><a href="https://www.gov.uk/government/collections/statistics-childrens-social-care-workforce" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DfE — Children's Social Care Workforce Survey</a> — vacancy rates, caseloads, and agency staff usage. Retrieved March 2026.</p>
            <p className="mt-2">Referrals are contacts to children's social care that meet the threshold for a children and families assessment. Children in care figure is an end-of-year snapshot. Social worker vacancy and caseload data from annual DfE survey of local authorities. Serious case review data from Child Safeguarding Practice Review Panel. All data is for England.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
