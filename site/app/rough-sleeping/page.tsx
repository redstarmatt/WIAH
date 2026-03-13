'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'DLUHC', dataset: 'Rough Sleeping Snapshot in England', url: 'https://www.gov.uk/government/collections/homelessness-statistics', date: '2024' },
  { num: 2, name: 'DLUHC', dataset: 'Statutory Homelessness — Temporary Accommodation', url: 'https://www.gov.uk/government/collections/homelessness-statistics', date: '2024', note: '112,600 households including 145,000 children; £2bn+ annual cost' },
  { num: 3, name: 'National Audit Office', dataset: 'Homelessness Prevention Funding', url: 'https://www.nao.org.uk/', date: '2024', note: 'Prevention budgets cut ~50% in real terms since 2010' },
];

export default function RoughSleepingPage() {
  // Rough sleeping count (single night), England, 2010–2024
  const roughSleepCount = [1768, 2181, 2309, 2414, 2744, 3569, 4134, 4751, 4677, 5112, 2688, 2440, 3069, 3898, 4068];
  // Households in temporary accommodation (thousands), 2015–2024
  const tempAccom = [68.1, 71.9, 75.4, 79.9, 84.7, 87.4, 93.1, 98.3, 104.1, 112.6];

  const chart1Series: Series[] = [
    {
      id: 'rough',
      label: 'Rough sleepers (single night count)',
      colour: '#E63946',
      data: roughSleepCount.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2010, 0, 1), label: '2010: Austerity begins' },
    { date: new Date(2020, 0, 1), label: '2020: Everyone In emergency programme' },
    { date: new Date(2022, 0, 1), label: '2022: Cost of living crisis' },
  ];

  const chart2Series: Series[] = [
    {
      id: 'temp',
      label: 'Households in temporary accommodation (thousands)',
      colour: '#E63946',
      data: tempAccom.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="Rough Sleeping" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Rough Sleeping"
          question="How Many People Are Sleeping Rough?"
          finding="Rough sleeping in England rose 74% between 2010 and 2017, fell during COVID, then surged again to over 3,900 on any given night — with homelessness prevention funding cut 50% in real terms."
          colour="#E63946"
          preposition="on"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Rough sleepers (single night count, England)"
              value="4,068"
              direction="up"
              polarity="up-is-bad"
              changeText="+130% since 2010 · post-COVID surge resuming"
              sparklineData={roughSleepCount}
              source="DLUHC — Rough sleeping snapshot, 2024"
            />
            <MetricCard
              label="Change since 2010 (%)"
              value="+130%"
              direction="up"
              polarity="up-is-bad"
              changeText="from 1,768 in 2010 to 4,068 in 2024"
              sparklineData={roughSleepCount}
              source="DLUHC — Rough sleeping snapshot, 2024"
            />
            <MetricCard
              label="Households in temporary accommodation (thousands)"
              value="112.6"
              direction="up"
              polarity="up-is-bad"
              changeText="+65% since 2015 · record high"
              sparklineData={tempAccom}
              source="DLUHC — Homelessness statistics, 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Rough sleeping count in England, 2010–2024"
              subtitle="Single night snapshot count in autumn. Widely regarded as an undercount of true prevalence."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Number of rough sleepers"
              source={{
                name: 'Department for Levelling Up, Housing and Communities',
                dataset: 'Rough sleeping snapshot in England',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/collections/homelessness-statistics',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Households in temporary accommodation, England, 2015–2024"
              subtitle="Thousands. Includes B&Bs, hostels, and nightly-paid private sector accommodation."
              series={chart2Series}
              yLabel="Thousands of households"
              source={{
                name: 'Department for Levelling Up, Housing and Communities',
                dataset: 'Statutory homelessness in England',
                frequency: 'quarterly',
                url: 'https://www.gov.uk/government/collections/homelessness-statistics',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">Behind the numbers</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>The official rough sleeping count is a single night snapshot taken each autumn. Local authorities count or estimate the number of people sleeping rough in their area.<Cite nums={1} /> The true scale is much larger — people cycle in and out of rough sleeping, and many sleep in cars, tents, or other non-street locations that are excluded from the count.</p>
              <p>Rough sleeping rose steadily through the 2010s as local authority homelessness prevention budgets were cut by around 50% in real terms.<Cite nums={3} /> The 2020 "Everyone In" emergency programme — which housed almost all rough sleepers at the start of the COVID pandemic — demonstrated that rapid action can work when political will exists. Numbers fell sharply. But the structural causes were never addressed, and rough sleeping has since climbed back toward pre-pandemic peaks.<Cite nums={1} /></p>
              <p>Households in temporary accommodation tell a different story of a system under sustained pressure: 112,600 households — including 145,000 children — are currently placed in temporary accommodation by their council, at an annual cost to the public purse exceeding £2 billion.</p>
            </div>
          </section>
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.gov.uk/government/collections/homelessness-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DLUHC — Statutory homelessness and rough sleeping statistics, England</a>. Annual and quarterly. Retrieved 2024.</p>
            <p>Rough sleeping counts are point-in-time estimates. They exclude people in hostels or other temporary accommodation. Figures for temporary accommodation cover households accepted as homeless by councils under the main housing duty.</p>
          </div>
        </section>
      </main>
    </>
  );
}
