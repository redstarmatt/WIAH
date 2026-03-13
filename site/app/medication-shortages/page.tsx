'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

export default function MedicationShortagesPage() {
  // Chart 1: Medicine shortage notifications 2019-2024 (per month)
  const shortageData = [61, 63, 68, 74, 98, 126];
  const shortageSeries: Series[] = [
    {
      id: 'shortages',
      label: 'Shortage notifications per month',
      colour: '#E63946',
      data: shortageData.map((v, i) => ({ date: new Date(2019 + i, 0, 1), value: v })),
    },
  ];
  const shortageAnnotations: Annotation[] = [
    { date: new Date(2022, 0, 1), label: '2022: HRT and ADHD shortages peak' },
    { date: new Date(2023, 0, 1), label: '2023: Antibiotic supply disruptions' },
  ];

  // Chart 2: Shortage notifications by drug category 2022-2024
  const hrtData = [18, 14, 11];
  const adhdData = [22, 24, 19];
  const antibioticData = [12, 18, 21];
  const diabetesData = [8, 14, 16];
  const categorySeries: Series[] = [
    {
      id: 'adhd',
      label: 'ADHD medication shortages',
      colour: '#E63946',
      data: adhdData.map((v, i) => ({ date: new Date(2022 + i, 0, 1), value: v })),
    },
    {
      id: 'antibiotic',
      label: 'Antibiotic shortages',
      colour: '#F4A261',
      data: antibioticData.map((v, i) => ({ date: new Date(2022 + i, 0, 1), value: v })),
    },
    {
      id: 'diabetes',
      label: 'Diabetes medication shortages',
      colour: '#264653',
      data: diabetesData.map((v, i) => ({ date: new Date(2022 + i, 0, 1), value: v })),
    },
    {
      id: 'hrt',
      label: 'HRT shortages',
      colour: '#6B7280',
      data: hrtData.map((v, i) => ({ date: new Date(2022 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="Medication Shortages" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Medication Shortages"
          question="Why Are Medicines Running Out?"
          finding="Medicine shortages notifications reached 126 per month in 2024 — double the 2019 level — affecting common drugs including HRT, ADHD medication and antibiotics."
          colour="#E63946"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key figures' },
          { id: 'sec-trend', label: 'Shortage trend' },
          { id: 'sec-categories', label: 'By category' },
          { id: 'sec-context', label: 'Context' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Monthly shortage notifications"
              value="126"
              direction="up"
              polarity="up-is-bad"
              changeText="double the 2019 level of 61 per month"
              sparklineData={[61, 63, 68, 74, 98, 126]}
              source="DHSC — Medicine Supply Notifications, 2024"
            />
            <MetricCard
              label="HRT shortage months (2022-23)"
              value="14"
              direction="up"
              polarity="up-is-bad"
              changeText="most common HRT products affected for over a year"
              sparklineData={[0, 0, 2, 8, 14, 11]}
              source="DHSC / Menopause charities — 2023"
            />
            <MetricCard
              label="ADHD medication supply gaps"
              value="24"
              direction="up"
              polarity="up-is-bad"
              changeText="months affected 2022-24 · worst in two decades"
              sparklineData={[0, 1, 4, 12, 22, 24]}
              source="ADHD UK / DHSC — Supply data, 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-trend" className="mb-12">
            <LineChart
              title="Medicine shortage notifications, England, 2019–2024 (per month)"
              subtitle="Formal shortage notifications issued by DHSC to community pharmacies and healthcare providers. Covers prescription medicines in short supply. Annual averages shown."
              series={shortageSeries}
              annotations={shortageAnnotations}
              yLabel="Notifications per month"
              source={{
                name: 'Department of Health and Social Care',
                dataset: 'Medicine Supply Notifications',
                frequency: 'monthly',
                url: 'https://www.gov.uk/government/publications/medicine-supply-tool',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-categories" className="mb-12">
            <LineChart
              title="Shortage notifications by drug category, 2022–2024"
              subtitle="ADHD medication and antibiotics have driven the fastest growth in shortage notifications. HRT shortage peaked in 2022-23 and has partially resolved."
              series={categorySeries}
              yLabel="Shortage notifications"
              source={{
                name: 'Department of Health and Social Care',
                dataset: 'Medicine Supply Notifications by Category',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/publications/medicine-supply-tool',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout>
            The DHSC&rsquo;s Medicine Supply Taskforce, established in 2022, has improved early warning systems and manufacturer engagement. The UK Medicines Verification Organisation system provides real-time pack-level tracking that helps identify shortages earlier. Parallel export controls have been strengthened for the most critical medicines.
          </PositiveCallout>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-context" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on medication shortages</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Medicine shortage notifications from the DHSC to community pharmacies doubled between 2019 and 2024, reaching 126 per month. The notifications cover a wide range of medicines but the most publicised shortages — HRT, ADHD medication, antibiotics, GLP-1 diabetes drugs — share a common feature: demand has grown substantially faster than manufacturers have been able to scale production. The pharmaceutical supply chain is long, concentrated, and fragile: many active pharmaceutical ingredients are manufactured by a small number of plants, often in India or China, and supply disruption at any point can take months to resolve.</p>
              <p>The HRT shortage of 2022-23 affected the most widely prescribed oestrogen and progesterone preparations for up to 14 months. Women were advised to switch brands, split patches or go without — with significant consequences for symptoms and quality of life for hundreds of thousands of menopausal women. The ADHD medication shortage, affecting methylphenidate and lisdexamfetamine, has been more prolonged: the rapid growth in adult ADHD diagnoses was not anticipated by manufacturers, and some supply disruptions continued into 2024. Children and adults dependent on these medications faced gaps that their prescribers could not reliably fill.</p>
              <p>Brexit has added a layer of complexity without being the primary cause. The UK is now outside EU medicines supply chain frameworks, which affects how shortages are managed, and the additional regulatory burden has deterred some parallel importers who might otherwise have sourced shortfall quantities from European markets. The DHSC&rsquo;s early-warning systems have improved since 2022 but the underlying concentration of global pharmaceutical manufacturing — and the UK&rsquo;s relatively small share of global demand — means shortages are likely to recur.</p>
            </div>
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.gov.uk/government/publications/medicine-supply-tool" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Department of Health and Social Care</a> — Medicine Supply Notifications. Published on GOV.UK. Notifications are issued when a licensed medicine is in short supply or temporarily unavailable.</p>
            <p>HRT shortage duration and ADHD supply gap figures are derived from DHSC shortage notifications and corroborated by Menopause Charity and ADHD UK stakeholder data. Category breakdowns are approximate, based on publicly reported notifications.</p>
            <p>Monthly figures shown are annual averages (total notifications divided by 12). Individual monthly figures vary significantly. The 2019 baseline represents pre-pandemic supply chain conditions.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
