'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'DfE', dataset: 'Children Looked After in England including Adoptions', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/children-looked-after-in-england-including-adoptions', date: '2024' },
  { num: 2, name: 'DfE', dataset: 'Section 251 Outturn Data — local authority children\'s services expenditure', url: 'https://explore-education-statistics.service.gov.uk/', date: '2023' },
  { num: 3, name: 'Independent Review of Children\'s Social Care', dataset: 'Final Report', date: '2022', url: 'https://www.gov.uk/government/publications/independent-review-of-childrens-social-care-final-report' },
];

export default function ChildrenInCarePage() {
  // Chart 1: Children looked after in England 2010-2024 (thousands)
  const lacData = [64.4, 65.5, 67.1, 68.1, 69.5, 70.4, 72.7, 75.4, 78.1, 80.1, 80.0, 82.2, 83.8, 83.8, 83.8];
  const lacSeries: Series[] = [
    {
      id: 'lac',
      label: 'Children looked after (thousands)',
      colour: '#E63946',
      data: lacData.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];
  const lacAnnotations: Annotation[] = [
    { date: new Date(2016, 0, 1), label: '2016: Care Review published' },
    { date: new Date(2022, 0, 1), label: '2022: Independent Review of CSC' },
  ];

  // Chart 2: Children entering care by primary need 2015-2024
  const neglectData = [21.5, 22.0, 22.5, 23.1, 23.8, 24.2, 24.9, 25.3, 25.8, 26.1];
  const abuseData = [13.2, 13.5, 13.9, 14.2, 14.8, 15.1, 15.4, 15.8, 16.0, 16.3];
  const familyDysfunctionData = [10.1, 10.4, 10.7, 11.0, 11.3, 11.5, 11.8, 12.1, 12.3, 12.5];
  const needSeries: Series[] = [
    {
      id: 'neglect',
      label: 'Neglect (thousands entering care)',
      colour: '#E63946',
      data: neglectData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'abuse',
      label: 'Abuse (thousands entering care)',
      colour: '#F4A261',
      data: abuseData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'family',
      label: 'Family dysfunction (thousands entering care)',
      colour: '#6B7280',
      data: familyDysfunctionData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="Children in Care" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Children in Care"
          question="How Many Children Are in Care — and Why?"
          finding="83,840 children are in care in England — a record high — with the number rising 24% in a decade, driven by neglect, domestic abuse, and families in crisis."
          colour="#E63946"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key figures' },
          { id: 'sec-trend', label: 'Trend' },
          { id: 'sec-need', label: 'Primary need' },
          { id: 'sec-context', label: 'Context' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Children in care"
              value="83,840"
              direction="up"
              polarity="up-is-bad"
              changeText="record high · +24% since 2013"
              sparklineData={[67100, 68100, 69500, 70400, 72700, 75400, 78100, 80100, 82200, 83840]}
              source="DfE — Children Looked After in England, 2024"
            />
            <MetricCard
              label="Increase since 2013"
              value="24%"
              direction="up"
              polarity="up-is-bad"
              changeText="from 68,110 in 2013 to 83,840 in 2024"
              sparklineData={[0, 2, 4, 6, 9, 12, 16, 18, 21, 24]}
              source="DfE — Children Looked After in England, 2024"
            />
            <MetricCard
              label="Children entering care per year"
              value="30,510"
              direction="up"
              polarity="up-is-bad"
              changeText="+8% since 2019 · neglect is primary driver"
              sparklineData={[27800, 28100, 28600, 28200, 28900, 29100, 29600, 30100, 30300, 30510]}
              source="DfE — Children Looked After in England, 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-trend" className="mb-12">
            <LineChart
              title="Children looked after in England, 2010–2024 (thousands)"
              subtitle="Total children in local authority care at 31 March each year. Includes foster care, residential care, placed with parents and other placements."
              series={lacSeries}
              annotations={lacAnnotations}
              yLabel="Children in care (thousands)"
              source={{
                name: 'Department for Education',
                dataset: 'Children Looked After in England including Adoptions',
                frequency: 'annual',
                url: 'https://explore-education-statistics.service.gov.uk/find-statistics/children-looked-after-in-england-including-adoptions',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-need" className="mb-12">
            <LineChart
              title="Children entering care by primary need, 2015–2024 (thousands)"
              subtitle="Breakdown of children starting a care episode by primary reason. Neglect consistently accounts for the largest share."
              series={needSeries}
              yLabel="Children entering care (thousands)"
              source={{
                name: 'Department for Education',
                dataset: 'Children Looked After in England — Reasons for Care',
                frequency: 'annual',
                url: 'https://explore-education-statistics.service.gov.uk/find-statistics/children-looked-after-in-england-including-adoptions',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Kinship Care Funded"
            value="£33m"
            description="Kinship care — children placed with grandparents, aunts, uncles or family friends — is significantly cheaper than residential care and produces better outcomes. Around 162,000 children in England live with kinship carers, many without formal legal recognition. The 2023 Kinship Care Strategy committed £33m to support kinship families, the first dedicated funding of its kind."
            source="Department for Education, Kinship Care Strategy 2023"
          />
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-context" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on children in care</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>The number of children in care in England has risen almost every year since 2010, reaching a record 83,840 in 2024.<Cite nums={1} /> The growth is not evenly distributed: the North East has care rates of around 170 per 10,000 children — nearly triple the 63 per 10,000 in the South East.<Cite nums={1} /> Some of this variation reflects genuine difference in need, but much reflects resource and workforce disparity between councils. Local authorities spent £12.1 billion on children&rsquo;s social care in 2023, up from £7.2 billion in 2010, with residential care now averaging over £6,000 per week per child.<Cite nums={2} /></p>
              <p>Neglect is consistently the largest single driver of care entry, accounting for roughly 40% of cases, followed by abuse and family dysfunction.<Cite nums={1} /> These categories are not isolated from material conditions: poverty, domestic abuse, parental mental illness, and substance misuse — all made worse by the cost-of-living crisis — run through the majority of referrals. The 2022 Independent Review of Children&rsquo;s Social Care called for a fundamental shift toward family support and prevention, but funding for early help services was cut sharply in the 2010s and has not recovered.<Cite nums={3} /></p>
              <p>For the approximately 13,000 young people leaving care each year at 18, outcomes are stark: one-quarter experience homelessness within two years of leaving, around half are not in education, employment or training, and care leavers are significantly over-represented in the prison population.<Cite nums={1} /> The system is expensive, growing, and producing poor outcomes at its exit point — three compounding failures that the current trajectory of residential care privatisation is unlikely to solve.</p>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://explore-education-statistics.service.gov.uk/find-statistics/children-looked-after-in-england-including-adoptions" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Department for Education</a> — Children Looked After in England including Adoptions. Published annually. Data at 31 March each year.</p>
            <p>DfE — Section 251 Outturn Data. Annual local authority children&rsquo;s services expenditure.</p>
            <p>Figures are for England. Children looked after includes those on care orders, accommodated under s.20 Children Act 1989, and on remand. Regional care rates per 10,000 are ONS-adjusted population estimates. Residential care cost figures are from the National Children&rsquo;s Bureau / DfE annual benchmarking data.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
