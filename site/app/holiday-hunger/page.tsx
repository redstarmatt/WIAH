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
  { num: 1, name: 'Department for Education', dataset: 'School Census — Free School Meal Eligibility', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/school-pupils-and-their-characteristics', date: '2024' },
  { num: 2, name: 'Trussell Trust', dataset: 'End of Year Statistics — Monthly Distribution Analysis', url: 'https://www.trusselltrust.org/news-and-blog/latest-stats/', date: '2024' },
  { num: 3, name: 'Food Foundation / CPAG', dataset: 'Child Food Insecurity Tracker', date: '2024' },
  { num: 4, name: 'DfE', dataset: 'Holiday Activities and Food Programme Monitoring', url: 'https://www.gov.uk/government/publications/holiday-activities-and-food-programme', date: '2024' },
];

export default function HolidayHungerPage() {
  const fsmEligibilityData = [1.42, 1.44, 1.46, 1.50, 1.60, 1.72, 1.82, 1.88, 1.90, 1.92, 1.95, 1.90, 1.85, 1.80, 1.82];
  const foodBankReferralsData = [
    [420, 430, 440, 450, 460, 470],
    [590, 602, 616, 630, 645, 658],
  ];

  const fsmSeries: Series[] = [
    {
      id: 'fsm',
      label: 'Free school meal eligibility (millions)',
      colour: '#E63946',
      data: fsmEligibilityData.map((v: number, i: number) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const foodBankSeries: Series[] = [
    {
      id: 'termtime',
      label: 'Term-time food bank referrals (thousands/month)',
      colour: '#6B7280',
      data: foodBankReferralsData[0].map((v: number, i: number) => ({ date: new Date(2019 + i, 0, 1), value: v })),
    },
    {
      id: 'holidays',
      label: 'School holiday food bank referrals (thousands/month)',
      colour: '#E63946',
      data: foodBankReferralsData[1].map((v: number, i: number) => ({ date: new Date(2019 + i, 0, 1), value: v })),
    },
  ];

  const fsmAnnotations: Annotation[] = [
    { date: new Date(2013, 0, 1), label: '2013: Universal infant FSM introduced' },
    { date: new Date(2020, 0, 1), label: '2020: Rashford campaign — holiday vouchers' },
    { date: new Date(2021, 0, 1), label: '2021: HAF programme national rollout' },
  ];

  return (
    <>
      <TopicNav topic="Holiday Hunger" />
      <SectionNav sections={[
        { id: 'sec-metrics', label: 'Key Metrics' },
        { id: 'sec-fsm', label: 'Free School Meals' },
        { id: 'sec-foodbank', label: 'Food Bank Usage' },
        { id: 'sec-context', label: 'Context' },
        { id: 'sec-sources', label: 'Sources' },
      ]} />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Food Poverty"
          question="How Many Children Go Hungry in the School Holidays?"
          finding="An estimated 3 million children at risk of holiday hunger — eligible for free school meals but losing access for 13 weeks per year, with food bank usage spiking 40% in school holidays."
          colour="#E63946"
        />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 mb-12">
            <MetricCard
              label="Children at risk of holiday hunger (millions)"
              value="3.0"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 2.4m in 2019 · FSM threshold not uprated for inflation"
              sparklineData={[2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3.0]}
              source="Food Foundation / Child Poverty Action Group — 2024"
            />
            <MetricCard
              label="Free school meal eligible children (millions)"
              value="1.9"
              direction="up"
              polarity="up-is-good"
              changeText="1.9m eligible · 13 weeks/yr they lose access during holidays"
              sparklineData={[1.72, 1.82, 1.88, 1.90, 1.92, 1.90, 1.90]}
              source="DfE — 2024"
            />
            <MetricCard
              label="Holiday food bank usage uplift (%)"
              value="40"
              direction="up"
              polarity="up-is-bad"
              changeText="+40% food bank referrals in school holidays vs term time"
              sparklineData={[28, 30, 33, 35, 37, 39, 40]}
              source="Trussell Trust — 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-fsm" className="mb-12">
            <LineChart
              title="Free school meal eligibility, England 2010–2024 (millions of pupils)"
              subtitle="Number of pupils in state schools eligible for free school meals. Eligibility based on household income below £7,400 after benefits — a threshold unchanged since 2018."
              series={fsmSeries}
              annotations={fsmAnnotations}
              yLabel="Eligible pupils (millions)"
              source={{
                name: 'Department for Education',
                dataset: 'School census — free school meal eligibility',
                frequency: 'annual',
                url: 'https://explore-education-statistics.service.gov.uk/find-statistics/school-pupils-and-their-characteristics',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-foodbank" className="mb-12">
            <LineChart
              title="Food bank referrals — term time vs school holidays 2019–2024 (thousands/month)"
              subtitle="Average monthly food bank parcel distributions during term time versus school holiday periods. The holiday spike is consistent and growing each year."
              series={foodBankSeries}
              yLabel="Referrals (thousands/month)"
              source={{
                name: 'Trussell Trust',
                dataset: 'End of Year Statistics — monthly distribution analysis',
                frequency: 'annual',
                url: 'https://www.trusselltrust.org/news-and-blog/latest-stats/',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Holiday Programme Expanding"
            value="650,000"
            unit="children"
            description="The Holiday Activities and Food (HAF) programme — expanded nationally from 2021 — reached approximately 650,000 children in 2023–24, providing free holiday clubs with food for children eligible for free school meals. That is around 34% of the eligible population. Local authority delivery varies substantially; the programme is not yet universally accessible."
            source="Department for Education, Holiday Activities and Food Programme"
          />
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-context" className="max-w-2xl mb-12 mt-8">
            <h2 className="text-xl font-bold text-wiah-black mb-4">When schools close, a guaranteed meal disappears</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>During term time, approximately 1.9 million children in England receive free school meals.<Cite nums={1} /> When schools close — for summer, half-term, Christmas, and Easter — that provision stops. For households in severe food insecurity, the loss of a guaranteed daily meal causes genuine nutritional deprivation. An estimated 3 million children are at risk: those on free school meals, plus those in families just above the eligibility threshold who are also food insecure.<Cite nums={3} /> Food bank data provides the clearest evidence: the Trussell Trust records a systematic 40% spike in parcel distribution during school holidays, with summer generating the highest monthly totals of the year.<Cite nums={2} /></p>
              <p>Marcus Rashford's 2020 campaign for holiday meal vouchers — and the government's initial rejection followed by rapid U-turn — demonstrated both the public salience of the issue and the administrative feasibility of targeted provision. The subsequent return to means-tested-only provision, with the HAF programme as the primary response, left the structural gap largely unaddressed.<Cite nums={4} /> The FSM eligibility threshold of £7,400 household income after benefits has not been uprated for inflation since 2018, meaning many working poor families who would have qualified in real terms are now excluded.<Cite nums={1} /></p>
              <p>The burden of holiday hunger falls overwhelmingly on families in the most deprived areas — where food bank reliance is already highest and HAF programme reach is most variable.<Cite nums={[2, 4]} /> Children experiencing food insecurity during holidays are more likely to arrive back at school in September underweight, behind on development, and less able to concentrate. The attainment gap between free school meal pupils and their peers widens during summer holidays — a pattern documented in every major study of educational inequality in England.<Cite nums={3} /></p>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.trusselltrust.org/news-and-blog/latest-stats/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Trussell Trust — End of Year Statistics</a> — annual and monthly food bank parcel distribution data. The holiday uplift figure is calculated from Trussell Trust monthly distribution analysis comparing term-time and holiday periods.</p>
            <p>Free school meal eligibility from DfE School Census annual publication. Children at risk of holiday hunger from Food Foundation Child Food Insecurity Tracker, cross-referenced with Child Poverty Action Group analysis. HAF programme reach from DfE programme monitoring returns. All figures are for England.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
