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
  { num: 1, name: 'ONS', dataset: 'Long-term international migration, UK', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/internationalmigration', date: '2023' },
  { num: 2, name: 'Home Office', dataset: 'Immigration Statistics year ending December 2023', url: 'https://www.gov.uk/government/statistics/immigration-statistics-year-ending-december-2023', date: '2023' },
  { num: 3, name: 'ONS', dataset: 'Revised migration estimates methodology 2023', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/internationalmigration', date: '2023' },
];

export default function NetMigrationPage() {
  // UK net migration 2010–2023 (thousands)
  const netMigration = [242, 205, 163, 209, 243, 257, 282, 282, 273, 224, 184, 173, 606, 764];

  // Non-EU net migration 2010–2023 (thousands)
  const nonEuNet = [142, 125, 103, 143, 156, 171, 200, 195, 182, 147, 116, 109, 519, 672];

  // Student visas granted 2015–2023 (thousands)
  const studentVisas = [193, 200, 214, 228, 241, 177, 298, 426, 490];

  // Work visas by category 2015–2023 (thousands)
  const skilledWork = [76, 80, 85, 88, 92, 55, 142, 185, 204];
  const healthCare  = [12, 15, 18, 22, 28, 20, 71, 103, 114];

  const series1: Series[] = [
    {
      id: 'net-migration',
      label: 'UK net migration (thousands)',
      colour: '#6B7280',
      data: netMigration.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
    {
      id: 'non-eu',
      label: 'Non-EU net migration (thousands)',
      colour: '#E63946',
      data: nonEuNet.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const series2: Series[] = [
    {
      id: 'student',
      label: 'Student visas granted (thousands)',
      colour: '#264653',
      data: studentVisas.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'skilled',
      label: 'Skilled worker visas (thousands)',
      colour: '#2A9D8F',
      data: skilledWork.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'health',
      label: 'Health & care worker visas (thousands)',
      colour: '#F4A261',
      data: healthCare.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const annotations1: Annotation[] = [
    { date: new Date(2016, 0, 1), label: '2016: Brexit vote' },
    { date: new Date(2021, 0, 1), label: '2021: New points-based system' },
    { date: new Date(2022, 0, 1), label: '2022: Record 764k net migration' },
  ];

  const annotations2: Annotation[] = [
    { date: new Date(2021, 0, 1), label: '2021: Points-based system opens' },
    { date: new Date(2023, 0, 1), label: "2023: Gov't tightens student dependant rules" },
  ];

  return (
    <>
      <TopicNav topic="Net Migration" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Net Migration"
          question="What Is Actually Happening with Migration?"
          finding="Net migration reached 764,000 in 2022 — a record — driven by students, health and care workers; the government has repeatedly missed its 'tens of thousands' target over 15 years."
          colour="#6B7280"
          preposition="on"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>UK net migration — the difference between people arriving and people leaving — reached 764,000 in 2022, more than triple the level of most years during the 2010s.<Cite nums={1} /> The headline number has dominated political debate since the 1990s, when successive governments committed to reducing it to the "tens of thousands." No government has come close. Under the Conservative administrations of 2010–2024, net migration was below 200,000 for only two years (2020–21, during COVID).<Cite nums={1} /></p>
            <p>The composition has changed dramatically. Before 2016, EU citizens accounted for a large share of inflows; since Brexit and the end of free movement, non-EU migration has driven the increase. Three groups dominate: international students (and their dependants), skilled workers recruited to fill NHS and care sector gaps, and people arriving under humanitarian routes (Ukraine, Hong Kong, Afghanistan).<Cite nums={2} /> These are overwhelmingly legal, visa-based arrivals — not the irregular crossings that dominate news coverage. The small-boats crisis added around 45,000–50,000 people in 2022, a real challenge but a fraction of total net migration.<Cite nums={2} /></p>
            <p>Emigration — people leaving the UK — has also risen, but more slowly. Many of those arriving on study visas leave within five years; others settle permanently. The ONS revised its migration estimates upwards in 2023, acknowledging systematic undercounting.<Cite nums={3} /> The government's 2023 measures — restricting students from bringing dependants, raising salary thresholds for skilled workers — are expected to reduce annual inflows by 100,000–200,000 from 2024.<Cite nums={2} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-net', label: 'Net migration' },
          { id: 'sec-visas', label: 'By visa type' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Net migration (thousands/yr)"
            value="764"
            direction="up"
            polarity="neutral"
            changeText="2022 record · Down from 764k as restrictions bite · Tens of thousands target missed 15 yrs"
            sparklineData={[242, 205, 163, 209, 243, 257, 282, 282, 273, 224, 184, 173, 606, 764]}
            source="ONS — Long-term international migration 2023"
          />
          <MetricCard
            label="Non-EU net migration (thousands/yr)"
            value="672"
            direction="up"
            polarity="neutral"
            changeText="2022 · Up from ~142k in 2010 · Driven by students, health workers, humanitarian routes"
            sparklineData={[142, 125, 103, 143, 156, 171, 200, 195, 182, 147, 116, 109, 519, 672]}
            source="ONS — Long-term international migration 2023"
          />
          <MetricCard
            label="Student visas granted (thousands/yr)"
            value="490"
            direction="up"
            polarity="neutral"
            changeText="2023 · Up from 193k in 2015 · Dependant restrictions now biting · Universities revenue dependent"
            sparklineData={[193, 200, 214, 228, 241, 177, 298, 426, 490]}
            source="Home Office — Visa Statistics 2023"
          />
        </div>

        <ScrollReveal>
          <section id="sec-net" className="mb-12">
            <LineChart
              title="UK net migration, 2010–2023 (thousands)"
              subtitle="Total net migration (grey) and non-EU net migration (red). Post-Brexit shift: EU inflows replaced by non-EU inflows at much higher volumes. 2022 peak driven by Ukraine, Hong Kong and study routes."
              series={series1}
              annotations={annotations1}
              yLabel="Net migration (thousands)"
              source={{
                name: 'ONS',
                dataset: 'Long-term international migration, UK',
                frequency: 'quarterly',
                url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/internationalmigration',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-visas" className="mb-12">
            <LineChart
              title="Migration by visa category, 2015–2023 (thousands granted)"
              subtitle="Student visas (dark blue) account for the largest single category. Health and care worker visas (amber) surged after Brexit as NHS and social care plugged workforce gaps."
              series={series2}
              annotations={annotations2}
              yLabel="Visas granted (thousands)"
              source={{
                name: 'Home Office',
                dataset: 'Immigration Statistics — Work and Study visas',
                frequency: 'quarterly',
                url: 'https://www.gov.uk/government/statistics/immigration-statistics-year-ending-december-2023',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What the numbers show"
            value="79%"
            unit="of non-EU migrants arrive legally on visas"
            description="The overwhelming majority of net migration is legal, documented, and actively recruited or admitted by the government — NHS staff, care workers, students paying full tuition fees, and people on humanitarian routes. The irregular crossings in small boats across the Channel, while a real operational challenge, accounted for approximately 6% of non-EU arrivals in 2022. Understanding this distinction is essential for any honest conversation about migration policy."
            source="Source: ONS — Long-term international migration 2023; Home Office — Irregular arrivals data 2023."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/internationalmigration" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Long-term international migration</a> — net migration estimates. Quarterly.</p>
            <p><a href="https://www.gov.uk/government/statistics/immigration-statistics-year-ending-december-2023" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Home Office — Immigration Statistics</a> — visa grants by category. Quarterly.</p>
            <p>Net migration = long-term immigrants minus long-term emigrants (12+ months). ONS revised methodology in 2023 using improved administrative data; historical figures have been adjusted. Student visa figures include main applicants only; dependant visas tracked separately.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
