'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';
import RelatedTopics from '@/components/RelatedTopics';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Home Office', dataset: 'Immigration Statistics — Detention', url: 'https://www.gov.uk/government/statistics/immigration-statistics-year-ending-december-2023', date: '2024', note: '23,900 people entered detention in 2023; median stay 28 days' },
  { num: 2, name: 'Home Office', dataset: 'Immigration Statistics — Detention Outcomes', url: 'https://www.gov.uk/government/statistics/immigration-statistics-year-ending-december-2023', date: '2024', note: '60% of detainees released without removal' },
  { num: 3, name: 'Home Office', dataset: 'Windrush Lessons Learned Review', date: '2020', note: 'Systematic failures in assessing lawful status' },
  { num: 4, name: 'Home Office', dataset: 'Shaw Review of Immigration Detention', date: '2016', note: 'Detention causes significant psychological harm' },
];

export default function ImmigrationDetentionPage() {
  // Detention entries per year 2010–2023 (thousands)
  const detentionEntries = [24.6, 27.3, 28.2, 30.4, 30.7, 32.4, 30.4, 30.0, 27.6, 24.1, 9.3, 17.4, 21.2, 23.9];

  // Removed vs released 2015–2023 (% of those detained)
  const removedPct  = [49, 46, 44, 43, 41, 40, 38, 40, 40];
  const releasedPct = [51, 54, 56, 57, 59, 60, 62, 60, 60];

  // Median detention length 2015–2023 (days)
  const medianDays = [18, 20, 22, 23, 25, 24, 26, 28, 28];

  const series1: Series[] = [
    {
      id: 'entries',
      label: 'Detention entries per year (thousands)',
      colour: '#6B7280',
      data: detentionEntries.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const series2: Series[] = [
    {
      id: 'removed',
      label: 'Removed / deported (%)',
      colour: '#E63946',
      data: removedPct.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'released',
      label: 'Released without removal (%)',
      colour: '#6B7280',
      data: releasedPct.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const annotations1: Annotation[] = [
    { date: new Date(2018, 0, 1), label: '2018: Windrush scandal' },
    { date: new Date(2020, 0, 1), label: '2020: COVID — sharp fall' },
    { date: new Date(2022, 0, 1), label: '2022: Nationality and Borders Act' },
  ];

  const annotations2: Annotation[] = [
    { date: new Date(2018, 0, 1), label: '2018: Windrush review' },
  ];

  return (
    <>
      <TopicNav topic="Immigration Detention" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Immigration Detention"
          question="Who Is Held in Immigration Detention?"
          finding="Around 24,000 people were detained under immigration powers in 2023 — with no statutory time limit on detention — and 60% of those detained are ultimately released rather than removed."
          colour="#6B7280"
          preposition="on"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK is one of very few countries in the world with no statutory time limit on immigration detention. People can be — and are — held for months or years without charge or trial while the Home Office decides whether to remove them. Around 23,900 people entered detention in 2023, recovering towards pre-pandemic levels. The majority are held in Immigration Removal Centres (IRCs), with the remainder in prisons under immigration powers. Men vastly outnumber women in detention; the largest nationalities detained include Albanian, Indian, Bangladeshi and Vietnamese nationals.</p>
            <p>The most striking — and least-discussed — figure is the outcome: approximately 60% of people detained are ultimately released back into the community rather than removed. They are detained, in many cases for extended periods, and then let go. This reflects both the complexity of cases (many have strong human rights claims or lack valid travel documents) and the operational failures of the removal system. The Windrush scandal of 2018 — in which British citizens with rights of abode were wrongly detained and in some cases deported — exposed systematic failures in how the Home Office assesses lawful status.</p>
            <p>The median length of detention was around 28 days in 2023, but averages mask extreme cases: several hundred people each year are held for more than a year. The Shaw Review (2016) and subsequent inspectorate reports have repeatedly found that detention causes significant psychological harm, particularly for people who have experienced trauma or torture. The UK's position — that indefinite detention is legally permissible subject to Hardial Singh principles — is at odds with international human rights standards and with the practice of most comparable countries.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-volume', label: 'Detention volume' },
          { id: 'sec-outcomes', label: 'Outcomes' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="People detained per year (thousands)"
            value="23.9"
            direction="up"
            polarity="up-is-bad"
            changeText="2023 · Recovering after COVID · No statutory time limit · Windrush abuses"
            sparklineData={[24.6, 27.3, 28.2, 30.4, 30.7, 32.4, 30.4, 30.0, 27.6, 24.1, 9.3, 17.4, 21.2, 23.9]}
            source="Home Office — Immigration Statistics 2023"
          />
          <MetricCard
            label="Median detention length (days)"
            value="28"
            direction="up"
            polarity="up-is-bad"
            changeText="2023 · Up from 18 days in 2015 · Some held for 1+ year · Indefinite in law"
            sparklineData={[18, 20, 22, 23, 25, 24, 26, 28, 28]}
            source="Home Office — Immigration Statistics 2023"
          />
          <MetricCard
            label="Released without removal (%)"
            value="60%"
            direction="up"
            polarity="up-is-bad"
            changeText="2023 · Up from 51% in 2015 · Detained then released, not removed · System failure"
            sparklineData={[51, 54, 56, 57, 59, 60, 62, 60, 60]}
            source="Home Office — Immigration Statistics 2023"
          />
        </div>

        <ScrollReveal>
          <section id="sec-volume" className="mb-12">
            <LineChart
              title="Immigration detention entries, 2010–2023 (thousands)"
              subtitle="Total people entering immigration detention per year. Sharp drop in 2020 reflects COVID-19 restrictions on flights and removal operations. Recovering towards 2018 levels by 2023."
              series={series1}
              annotations={annotations1}
              yLabel="Entries (thousands)"
              source={{
                name: 'Home Office',
                dataset: 'Immigration Statistics — Detention',
                frequency: 'quarterly',
                url: 'https://www.gov.uk/government/statistics/immigration-statistics-year-ending-december-2023',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-outcomes" className="mb-12">
            <LineChart
              title="Detention outcomes — removed vs released, 2015–2023 (%)"
              subtitle="Of those who leave detention, the share who are removed or deported (red) vs released back into the community (grey). Most people detained are ultimately released, not removed."
              series={series2}
              annotations={annotations2}
              yLabel="Share of outcomes (%)"
              source={{
                name: 'Home Office',
                dataset: 'Immigration Statistics — Detention outcomes',
                frequency: 'quarterly',
                url: 'https://www.gov.uk/government/statistics/immigration-statistics-year-ending-december-2023',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="£4,000"
            unit="wasted per person detained then released"
            description="The cost of detaining someone in an IRC is around £130–£170 per day. When 60% of detainees are ultimately released rather than removed, that represents hundreds of millions of pounds in detaining people unnecessarily. Independent inspections have driven some improvements in IRC conditions, and the number of women in detention has fallen significantly following the Shaw Review's recommendations. The Home Office has committed to faster decisions to reduce the number of long-term detentions."
            source="Source: Home Office — Immigration Enforcement data 2023; HMIP — IRC Inspections 2022–23."
          />
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.gov.uk/government/statistics/immigration-statistics-year-ending-december-2023" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Home Office — Immigration Statistics</a> — detention volumes and outcomes. Quarterly.</p>
            <p>Detention entries = total people entering detention in the calendar year; individuals detained more than once are counted each time. Outcomes percentages are of all departures from detention in the period. Median days is calculated from published quartile data.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
