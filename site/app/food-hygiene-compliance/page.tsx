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

// Businesses rated 4 or 5 (%), 2015–2024
const highRatedPct = [71, 73, 74, 75, 76, 72, 68, 65, 65, 65];
// Food safety inspectors (thousands FTE), 2010–2024
const inspectorsFte = [4.8, 4.6, 4.4, 4.2, 4.0, 3.8, 3.6, 3.5, 3.4, 3.3, 3.2, 3.2, 3.1, 3.2, 3.2];
// Hospital admissions from foodborne illness (thousands), 2015–2024
const hospitalAdmissions = [22, 22, 21, 22, 23, 18, 21, 23, 24, 25];

const complianceSeries: Series[] = [
  {
    id: 'compliance',
    label: 'Businesses rated 4–5 (%)',
    colour: '#2A9D8F',
    data: highRatedPct.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const inspectorSeries: Series[] = [
  {
    id: 'inspectors',
    label: 'Food safety inspectors (thousands FTE)',
    colour: '#264653',
    data: inspectorsFte.map((v, i) => ({ date: new Date(2010 + i, 5, 1), value: v })),
  },
];

const complianceAnnotations: Annotation[] = [
  { date: new Date(2019, 5, 1), label: '2019: Pre-pandemic compliance peak' },
  { date: new Date(2020, 5, 1), label: '2020: Pandemic disrupts inspections' },
  { date: new Date(2022, 5, 1), label: '2022: Cost-of-living pressures hit margins' },
];

const inspectorAnnotations: Annotation[] = [
  { date: new Date(2010, 5, 1), label: '2010: Austerity cuts begin' },
  { date: new Date(2021, 5, 1), label: '2021: LA recruitment drive' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'Food Standards Agency', dataset: 'Annual report on foodborne illness', url: 'https://www.food.gov.uk/research/foodborne-disease', date: '2024' },
  { num: 2, name: 'Food Standards Agency', dataset: 'Food Hygiene Rating Scheme statistics', url: 'https://www.food.gov.uk/safety-hygiene/food-hygiene-rating-scheme', date: '2024' },
  { num: 3, name: 'Food Standards Agency', dataset: 'Local authority enforcement monitoring', url: 'https://www.food.gov.uk/business-guidance/local-authority-enforcement', date: '2024' },
];

export default function FoodHygieneCompliancePage() {
  return (
    <>
      <TopicNav topic="Food Hygiene Compliance" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Food Hygiene Compliance"
          question="How Clean Is the Food We're Buying?"
          finding="Only 65% of food businesses in England achieve a hygiene rating of 4 or 5 — down from 76% in 2019. Local authority food safety teams have been cut by 33% since 2010."
          colour="#6B7280"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The Food Standards Agency estimates 2.4 million cases of foodborne illness every year in England, causing approximately 180 deaths and 23,000 hospital admissions<Cite nums={1} />. Most of this burden is preventable: the primary vectors are Campylobacter (mainly in poultry), Listeria (chilled ready-to-eat foods), and Salmonella (eggs and meat). The hygiene rating system — the green sticker in takeaway windows and restaurant doors — is the public's main proxy for food safety standards. Since its 2019 peak, the proportion of businesses achieving the highest ratings has fallen from 76% to 65%<Cite nums={2} />.</p>
            <p>The structural cause is inspector capacity. Since 2010, local authority food safety officer numbers have fallen by a third — from 4,800 to around 3,200<Cite nums={3} /> — as councils absorbed successive funding reductions. Post-pandemic pressure — cost of living squeezing margins, high staff turnover, supply chain substitutions — has hit compliance precisely when regulatory oversight capacity is weakest. The FSA's risk-based inspection framework means that low-risk businesses may go uninspected for years, and even high-risk establishments such as care home kitchens are not always inspected on schedule due to officer shortfalls.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-compliance', label: 'Compliance Rates' },
          { id: 'sec-inspectors', label: 'Inspector Numbers' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Food businesses rated 4–5 (FSA)"
              value="65%"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="Down from 76% in 2019 · pandemic and cost pressures"
              sparklineData={highRatedPct.slice(-8)}
              source="FSA · Food hygiene rating scheme statistics 2024"
              href="#sec-compliance"
            />
            <MetricCard
              label="Food safety inspectors (FTE)"
              value="3,200"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="Down 33% from 4,800 in 2010 · inspection capacity stretched"
              sparklineData={inspectorsFte.slice(-8)}
              source="FSA · Local authority enforcement monitoring 2024"
              href="#sec-inspectors"
            />
            <MetricCard
              label="Annual foodborne illness hospitalisations"
              value="25,000"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 22,000 in 2018 · Campylobacter and Listeria main causes"
              sparklineData={hospitalAdmissions.slice(-8)}
              source="FSA · Annual report on foodborne illness 2024"
              href="#sec-compliance"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-compliance" className="mb-12">
            <LineChart
              title="Food businesses rated 4–5 by FSA, England, 2015–2024"
              subtitle="Percentage of food businesses achieving a Food Hygiene Rating Scheme score of 4 (good) or 5 (very good). A falling rate means a higher proportion of businesses have substandard hygiene."
              series={complianceSeries}
              annotations={complianceAnnotations}
              yLabel="% rated 4 or 5"
              source={{ name: 'Food Standards Agency', dataset: 'Food Hygiene Rating Scheme statistics', url: 'https://www.food.gov.uk/safety-hygiene/food-hygiene-rating-scheme', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-inspectors" className="mb-12">
            <LineChart
              title="Local authority food safety inspectors, England, 2010–2024"
              subtitle="Full-time equivalent food safety officers employed by local authorities. Down 33% from 4,800 to 3,200 since 2010. Recovery since 2022 has been partial."
              series={inspectorSeries}
              annotations={inspectorAnnotations}
              yLabel="Inspectors (thousands FTE)"
              source={{ name: 'Food Standards Agency', dataset: 'Local authority enforcement monitoring', url: 'https://www.food.gov.uk/business-guidance/local-authority-enforcement', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Campylobacter on retail chicken falling"
            value="56%"
            unit="surface contamination rate (down from 73%)"
            description="Campylobacter contamination on retail chicken — the biggest source of foodborne illness in the UK — has fallen from 73% to 56% surface contamination as a result of biosecurity controls on farms and improved slaughterhouse practices. The FSA's Regulating Our Future programme also moves toward risk-based inspection using business compliance data and real-time monitoring, allowing inspectors to focus on the highest-risk premises. Wales mandates FSA rating display; pressure is growing for mandatory display in England."
            source="Source: FSA — Food hygiene rating scheme statistics 2024; FSA Regulating Our Future programme update."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.food.gov.uk/safety-hygiene/food-hygiene-rating-scheme" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Food Standards Agency — Food Hygiene Rating Scheme statistics</a> — Annual compliance data for registered food businesses. Retrieved 2025.</p>
            <p><a href="https://www.food.gov.uk/business-guidance/local-authority-enforcement" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">FSA — Local authority enforcement monitoring</a> — Inspector numbers and inspection frequency data. Retrieved 2025.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
