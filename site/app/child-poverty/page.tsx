'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'DWP', dataset: 'Households Below Average Income (HBAI)', url: 'https://www.gov.uk/government/collections/households-below-average-income-hbai--2', date: '2024' },
  { num: 2, name: 'Institute for Fiscal Studies', dataset: 'Two-child limit impact analysis', url: 'https://ifs.org.uk/publications/two-child-limit-welfare-cap', date: '2024' },
];

export default function ChildPovertyPage() {
  // Child poverty rate before housing costs (%) 2010–2024
  const rateBeforeHousing = [27, 27, 27, 28, 28, 28, 29, 29, 30, 30, 31, 31, 29, 30, 30];
  // Child poverty rate after housing costs (%) 2010–2024
  const rateAfterHousing  = [31, 30, 30, 31, 31, 30, 30, 31, 31, 31, 32, 33, 31, 32, 31];
  // In-work poverty (millions) 2015–2024
  const inWorkPoverty = [2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.5, 2.6];
  // Children in poverty total — sparkline
  const totalMillions = [3.6, 3.5, 3.5, 3.6, 3.7, 3.7, 3.8, 3.9, 4.0, 4.1, 4.2, 4.3, 4.0, 4.2, 4.3];

  const chart1Series: Series[] = [
    {
      id: 'afterHousing',
      label: 'After housing costs (%)',
      colour: '#E63946',
      data: rateAfterHousing.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
    {
      id: 'beforeHousing',
      label: 'Before housing costs (%)',
      colour: '#6B7280',
      data: rateBeforeHousing.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2013, 0, 1), label: '2013: Universal Credit rollout begins' },
    { date: new Date(2016, 0, 1), label: '2016: Two-child benefit limit' },
    { date: new Date(2020, 0, 1), label: '2020: £20 UC uplift' },
    { date: new Date(2021, 0, 1), label: '2021: Uplift removed' },
  ];

  const chart2Series: Series[] = [
    {
      id: 'inwork',
      label: 'Children in in-work poverty (millions)',
      colour: '#E63946',
      data: inWorkPoverty.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="Child Poverty" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Child Poverty"
          question="How Many Children Are Growing Up in Poverty?"
          finding="4.3 million children — 30% of all children — live in poverty in the UK, with the rate highest in London and the North, and rising among working households."
          colour="#E63946"
          preposition="on"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Children in poverty (millions)"
              value="4.3"
              direction="up"
              polarity="up-is-bad"
              changeText="+0.7m since 2010 · 30% of all children in UK"
              sparklineData={totalMillions}
              source="DWP — Households Below Average Income, 2024"
            />
            <MetricCard
              label="Child poverty rate, after housing costs (%)"
              value="31"
              direction="up"
              polarity="up-is-bad"
              changeText="broadly flat since 2010 · but impact of cost of living rising"
              sparklineData={rateAfterHousing}
              source="DWP — Households Below Average Income, 2024"
            />
            <MetricCard
              label="Children in in-work poverty (millions)"
              value="2.6"
              direction="up"
              polarity="up-is-bad"
              changeText="+30% since 2015 · majority of poor children in working families"
              sparklineData={inWorkPoverty}
              source="DWP — Households Below Average Income, 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Child poverty rate, UK, 2010–2024"
              subtitle="% of children in households below 60% of median income. Before and after housing costs."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="% of children in poverty"
              source={{
                name: 'Department for Work and Pensions',
                dataset: 'Households Below Average Income',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/collections/households-below-average-income-hbai--2',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Children in in-work poverty, UK, 2015–2024"
              subtitle="Millions. Children in households where at least one adult is in paid work but income is below poverty line."
              series={chart2Series}
              yLabel="Millions of children"
              source={{
                name: 'Department for Work and Pensions',
                dataset: 'Households Below Average Income',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/collections/households-below-average-income-hbai--2',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">What the data shows</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>The UK's child poverty rate — measured as households below 60% of median income — stands at 31% after housing costs. That is 4.3 million children.<Cite nums={1} /> The rate has not fallen significantly in over a decade, despite several policy interventions and a sustained period of employment growth.</p>
              <p>The most striking shift is within poverty: the majority of children in poverty now live in working families. In-work poverty has risen from 2 million children in 2015 to 2.6 million in 2024.<Cite nums={1} /> Wages at the bottom of the distribution have not kept pace with housing and childcare costs, meaning employment alone no longer insulates families from poverty.</p>
              <p>Geographic concentration is stark. London has the highest child poverty rate of any region — over 40% after housing costs in some boroughs — driven by high housing costs.<Cite nums={1} /> Rates are also elevated across the North of England and in former industrial communities. The two-child benefit limit, introduced in 2017, has had a measurable poverty impact on larger families, estimated by the IFS to affect over 1.5 million children.<Cite nums={2} /></p>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.gov.uk/government/collections/households-below-average-income-hbai--2" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DWP — Households Below Average Income (HBAI)</a>. Annual. Retrieved 2024.</p>
            <p>Poverty defined as household income below 60% of the median, equivalised for household size. Before housing costs (BHC) and after housing costs (AHC) measures both shown. UK figures. In-work poverty counts children in households where at least one adult is in employment.</p>
          </div>
        </section>
      </main>
    </>
  );
}
