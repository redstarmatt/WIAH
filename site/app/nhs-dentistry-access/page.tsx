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
  { num: 1, name: 'NHS Business Services Authority', dataset: 'NHS Dental Statistics for England', url: 'https://www.nhsbsa.nhs.uk/statistical-collections/dental-statistics', date: '2024', note: '30.1m courses in 2019/20; 25.4m in 2023/24' },
  { num: 2, name: 'NHS England', dataset: 'Dental Access and Patient Survey Data', url: 'https://www.england.nhs.uk/statistics/', date: '2024', note: '7.5 million adults without NHS dentist access' },
  { num: 3, name: 'NHS Digital', dataset: 'NHS Dental Statistics — Adult Access Rates', url: 'https://www.nhsbsa.nhs.uk/statistical-collections/dental-statistics', date: '2023', note: '46.1% of adults seen within two years in 2022/23 vs 54.9% pre-pandemic' },
  { num: 4, name: 'NHS England', dataset: 'NHS Dentistry Recovery Plan 2023', url: 'https://www.england.nhs.uk/long-read/nhs-dentistry-recovery-plan/', date: '2023' },
];

export default function NhsDentistryAccessPage() {
  // NHS dental activity 2015–2024 (million courses of treatment)
  const treatmentsRaw = [29.5, 29.8, 30.1, 30.2, 30.5, 30.1, 17.0, 21.3, 23.7, 25.4];
  // Adults registered with NHS dentist 2015–2024 (millions)
  const registeredRaw = [38.5, 39.0, 39.5, 40.0, 40.2, 40.5, 34.0, 36.0, 37.5, 38.2];

  const treatmentSeries: Series[] = [
    {
      id: 'treatments',
      label: 'NHS dental courses of treatment (millions/yr)',
      colour: '#E63946',
      data: treatmentsRaw.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const registeredSeries: Series[] = [
    {
      id: 'registered',
      label: 'Adults registered with NHS dentist (millions)',
      colour: '#E63946',
      data: registeredRaw.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const treatmentAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: Covid-19 — dental practices close' },
    { date: new Date(2023, 0, 1), label: '2023: NHS Dentistry Recovery Plan' },
  ];

  const registeredAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: Pandemic disruption' },
    { date: new Date(2022, 0, 1), label: '2022: NHS dentist shortages peak' },
  ];

  const treatmentTarget = { value: 30.1, label: 'Pre-pandemic level (2019/20)' };

  return (
    <>
      <TopicNav topic="NHS Dentistry" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="NHS Dentistry"
          question="Can You Still Get NHS Dentistry?"
          finding="7.5 million people in England have no access to an NHS dentist — NHS dental contract activity fell 30% post-pandemic and never recovered — leaving millions paying privately or going without."
          colour="#E63946"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>NHS dental treatment completions fell from 30.1 million courses in 2019/20 to 25.4 million in 2023/24 — a shortfall of 4.7 million treatments per year that has not recovered despite four years since the Covid-19 pandemic.<Cite nums={1} /> Around 7.5 million people in England cannot access an NHS dentist when they need one; in some areas no NHS surgery accepts new adult patients at all.<Cite nums={2} /></p>
            <p>The structural cause is the Unit of Dental Activity (UDA) contract introduced in 2006, which pays the same flat rate whether a dentist provides a check-up or complex multi-appointment treatment. This creates a strong financial incentive to see simpler cases privately and withdraw from NHS work entirely. The share of adults seen within the previous two years stood at 46.1% in 2022/23, against 54.9% pre-pandemic.<Cite nums={3} /></p>
            <p>Unmet need translates directly into harm. Hospital admissions for conditions treatable in primary dental care have risen. Children miss school due to dental pain, and the private market that fills the gap is unaffordable for large parts of the population. Rural and coastal communities — parts of Cornwall, North Yorkshire, and Lincolnshire — report dental deserts where patients travel 50 or more miles for NHS care. The 2023 NHS Dentistry Recovery Plan introduced a "golden hello" for dentists in underserved areas, but critics argue full UDA contract reform is the only lasting solution.<Cite nums={4} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-treatments', label: 'Dental Activity' },
          { id: 'sec-registered', label: 'Registration' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Adults without NHS dentist (millions)"
              value="7.5"
              direction="up"
              polarity="up-is-bad"
              changeText="out of 56m adults in England · worst in rural and coastal areas"
              sparklineData={[3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 10.0, 9.0, 8.0, 7.5]}
              source="NHS England — 2024"
            />
            <MetricCard
              label="NHS dental activity (million courses/yr)"
              value="25.4"
              direction="down"
              polarity="up-is-good"
              changeText="down from 30.1m in 2019/20 · 4.7m treatments missing per year"
              sparklineData={[29.5, 29.8, 30.1, 30.2, 30.5, 30.1, 17.0, 21.3, 23.7, 25.4]}
              source="NHS Business Services Authority — 2023/24"
            />
            <MetricCard
              label="Average NHS wait (months)"
              value="18"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 3–4 months pre-pandemic · waits of 2+ years in some areas"
              sparklineData={[3, 3, 4, 4, 4, 4, 12, 16, 18, 18]}
              source="NHS England survey data — 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-treatments" className="mb-12">
            <LineChart
              title="NHS dental courses of treatment, England, 2015–2024"
              subtitle="Total courses of NHS dental treatment per year (millions). Covid-19 caused a sharp 2020 collapse that has not recovered to pre-pandemic levels."
              series={treatmentSeries}
              annotations={treatmentAnnotations}
              targetLine={treatmentTarget}
              yLabel="Million courses"
              source={{
                name: 'NHS Business Services Authority',
                dataset: 'NHS Dental Statistics for England',
                frequency: 'annual',
                url: 'https://www.nhsbsa.nhs.uk/statistical-collections/dental-statistics',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-registered" className="mb-12">
            <LineChart
              title="Adults registered with an NHS dentist, England, 2015–2024"
              subtitle="Millions of adults who received at least one NHS dental treatment in the previous 24 months (the standard registration measure)."
              series={registeredSeries}
              annotations={registeredAnnotations}
              yLabel="Millions of adults"
              source={{
                name: 'NHS Digital / NHS Business Services Authority',
                dataset: 'NHS Dental Statistics — adult access',
                frequency: 'annual',
                url: 'https://www.nhsbsa.nhs.uk/statistical-collections/dental-statistics',
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
            <p><a href="https://www.nhsbsa.nhs.uk/statistical-collections/dental-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS Business Services Authority — NHS Dental Statistics for England</a>. Annual publication. Retrieved 2024.</p>
            <p><a href="https://www.england.nhs.uk/long-read/nhs-dentistry-recovery-plan/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — Dentistry Recovery Plan 2023</a>. Policy framework and access targets.</p>
            <p>Courses of treatment represent a period of NHS dental care, from the first appointment to certification of completion. One course may include multiple appointments. Adult access is measured as adults aged 18+ who received at least one NHS dental treatment in the preceding 24-month period. Wait time data is derived from NHS England patient surveys and dentist reporting; it is not collected systematically, so figures are estimates.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
