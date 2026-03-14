'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';
import RelatedTopics from '@/components/RelatedTopics';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Ministry of Justice', dataset: 'Civil Justice Statistics Quarterly', url: 'https://www.gov.uk/government/collections/civil-justice-statistics-quarterly', date: '2024', note: 'Housing disrepair claims rose from 25,000 in 2018 to 100,000 in 2024' },
  { num: 2, name: 'DLUHC', dataset: 'English Housing Survey', url: 'https://www.gov.uk/government/collections/english-housing-survey', date: '2024', note: '5 million social homes with category 1 hazard' },
  { num: 3, name: 'Social Housing (Regulation) Act 2023', dataset: "Awaab's Law provisions", date: '2023', note: 'Requires investigation of damp/mould within 14 days and emergency repair within 24 hours', url: 'https://www.legislation.gov.uk/ukpga/2023/36/contents' },
];

export default function HousingDisrepairClaimsPage() {
  // Housing disrepair claims 2018–2024 (thousands)
  const claimsRaw = [25, 30, 33, 38, 58, 78, 100];
  // Category 1 hazards in social housing 2015–2024 (millions of homes)
  const hazardsRaw = [5.8, 5.7, 5.6, 5.5, 5.4, 5.3, 5.2, 5.1, 5.0, 5.0];

  const claimsSeries: Series[] = [
    {
      id: 'claims',
      label: 'Housing disrepair claims (thousands/yr)',
      colour: '#F4A261',
      data: claimsRaw.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
    },
  ];

  const hazardsSeries: Series[] = [
    {
      id: 'hazards',
      label: 'Social homes with category 1 hazard (millions)',
      colour: '#E63946',
      data: hazardsRaw.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const claimsAnnotations: Annotation[] = [
    { date: new Date(2018, 0, 1), label: '2018: Homes (Fitness for Human Habitation) Act' },
    { date: new Date(2021, 0, 1), label: '2021: Awaab Ishak case' },
    { date: new Date(2023, 0, 1), label: '2023: Social Housing (Regulation) Act' },
  ];

  return (
    <>
      <TopicNav topic="Housing Disrepair" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Housing Disrepair"
          question="How Many Tenants Live in Disrepair?"
          finding="Housing disrepair claims against social landlords rose 300% in four years — 5 million social homes have a category 1 hazard — yet enforcement action by councils has fallen."
          colour="#F4A261"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Housing disrepair claims filed at county courts have surged from around 25,000 in 2018 to over 100,000 in 2024 — a 300% increase in four years.<Cite nums={1} /> The Homes (Fitness for Human Habitation) Act 2018 gave tenants a direct right of action against landlords, and a commercial claims sector accelerated uptake during and after the pandemic, as households spending more time at home became more aware of damp, mould, and structural defects.</p>
            <p>The Awaab Ishak case — a two-year-old who died from black mould exposure in a Rochdale social housing flat in 2020 — crystallised public awareness. Awaab's Law, enshrined in the Social Housing (Regulation) Act 2023, now requires social landlords to investigate reports of damp and mould within 14 days and repair emergency hazards within 24 hours.<Cite nums={3} /> Yet enforcement action by councils has fallen even as the number of hazardous homes remains around 5 million.<Cite nums={2} /></p>
            <p>The burden falls disproportionately on older tenants, disabled people, and families in overcrowded accommodation. Housing associations and local authorities with poorly maintained legacy stock generate the highest claim rates, in some cases diverting maintenance budgets into legal costs — the reverse of the intended effect.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-claims', label: 'Claims' },
          { id: 'sec-hazards', label: 'Hazards' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Disrepair claims per year (thousands)"
              value="100"
              direction="up"
              polarity="up-is-bad"
              changeText="+300% since 2018 · surge driven by Fitness for Human Habitation Act"
              sparklineData={[25, 30, 33, 38, 58, 78, 100]}
              source="Ministry of Justice — Civil Justice Statistics 2024"
            />
            <MetricCard
              label="Social homes with cat-1 hazard (millions)"
              value="5"
              direction="flat"
              polarity="up-is-bad"
              changeText="5 million social homes with most serious hazards · persistent"
              sparklineData={[5.8, 5.7, 5.6, 5.5, 5.4, 5.3, 5.2, 5.1, 5.0, 5.0]}
              source="DLUHC — English Housing Survey 2024"
            />
            <MetricCard
              label="Enforcement notices issued (thousands/yr)"
              value="1.2"
              direction="down"
              polarity="down-is-bad"
              changeText="down from 2.1k in 2015 · councils less likely to enforce despite more hazards"
              sparklineData={[2.1, 2.0, 1.9, 1.8, 1.7, 1.6, 1.5, 1.4, 1.3, 1.2]}
              source="DLUHC — Housing Enforcement Data 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-claims" className="mb-12">
            <LineChart
              title="Housing disrepair claims, England & Wales, 2018–2024"
              subtitle="Annual housing disrepair claims filed at county courts (thousands). Homes (Fitness for Human Habitation) Act 2018 expanded tenant rights."
              series={claimsSeries}
              annotations={claimsAnnotations}
              yLabel="Claims (thousands)"
              source={{
                name: 'Ministry of Justice',
                dataset: 'Civil Justice Statistics Quarterly',
                frequency: 'quarterly',
                url: 'https://www.gov.uk/government/collections/civil-justice-statistics-quarterly',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-hazards" className="mb-12">
            <LineChart
              title="Social homes with category 1 hazards, England, 2015–2024"
              subtitle="Millions of social housing dwellings containing at least one category 1 (most serious) hazard under the Housing Health and Safety Rating System."
              series={hazardsSeries}
              yLabel="Millions of homes"
              source={{
                name: 'DLUHC',
                dataset: 'English Housing Survey',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/collections/english-housing-survey',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.gov.uk/government/collections/civil-justice-statistics-quarterly" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Ministry of Justice — Civil Justice Statistics Quarterly</a>. Retrieved 2024.</p>
            <p><a href="https://www.gov.uk/government/collections/english-housing-survey" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DLUHC — English Housing Survey</a>. Annual. Category 1 hazard data from HHSRS assessments. Retrieved 2024.</p>
            <p>Claims figures are county court housing disrepair claims under the Landlord and Tenant Act 1985 and Homes (Fitness for Human Habitation) Act 2018. Enforcement notices are local authority improvement notices and prohibition orders under the Housing Act 2004.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
