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
  { num: 1, name: 'HMRC', dataset: 'Inheritance Tax Statistics', url: 'https://www.gov.uk/government/collections/inheritance-tax-statistics', date: '2024' },
  { num: 2, name: 'ONS', dataset: 'Wealth and Assets Survey', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/personalandhouseholdfinances/debt/bulletins/wealthingreatbritainwave', date: '2024' },
  { num: 3, name: 'Resolution Foundation', dataset: 'Intergenerational Audit', url: 'https://www.resolutionfoundation.org/research/intergenerational-audit', date: '2024' },
];

export default function InheritanceInequalityPage() {
  // Chart 1: Total inheritance flow in UK 2010–2024 (£bn)
  const inheritanceFlow = [69, 73, 77, 83, 88, 94, 101, 110, 119, 130, 142, 155, 164, 170, 175];

  const flowSeries: Series[] = [
    {
      id: 'flow',
      label: 'Annual inheritance flow (£bn)',
      colour: '#F4A261',
      data: inheritanceFlow.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const flowAnnotations: Annotation[] = [
    { date: new Date(2017, 0, 1), label: '2017: Property prices peak' },
    { date: new Date(2021, 0, 1), label: '2021: Pandemic deaths spike' },
  ];

  // Chart 2: Inheritance by wealth decile — share of total 2015–2024
  const top10Share  = [48, 49, 49, 50, 50, 50, 51, 51, 60, 60];
  const mid40Share  = [43, 42, 42, 41, 41, 41, 40, 40, 34, 34];
  const bottom50    = [9,  9,  9,  9,  9,  9,  9,  9,  6,  6];

  const decileSeries: Series[] = [
    {
      id: 'top10',
      label: 'Top 10% share of inherited wealth (%)',
      colour: '#E63946',
      data: top10Share.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'mid40',
      label: 'Middle 40% share (%)',
      colour: '#F4A261',
      data: mid40Share.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
    {
      id: 'bottom50',
      label: 'Bottom 50% share (%)',
      colour: '#6B7280',
      data: bottom50.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="Inheritance Inequality" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Inheritance Inequality"
          question="Is Inherited Wealth Widening Inequality?"
          finding="The value of inheritances passed each year has doubled to £100 billion — the top 10% inherit 60% of all inherited wealth — and inheritances now affect homeownership more than earnings."
          colour="#F4A261"
          preposition="on"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-flow', label: 'Inheritance flow' },
          { id: 'sec-decile', label: 'Who inherits' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Annual inheritance flow (£bn)"
              value="175"
              direction="up"
              polarity="up-is-bad"
              changeText="trebled since 2000 · UK's largest-ever wealth transfer"
              sparklineData={[69, 73, 77, 83, 88, 94, 101, 110, 119, 130, 142, 155, 164, 170, 175]}
              source="HMRC IHT Statistics / Resolution Foundation — 2024"
            />
            <MetricCard
              label="Top 10% share of inheritances (%)"
              value="60"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 48% in 2015 · concentration accelerating"
              sparklineData={[48, 49, 49, 50, 50, 50, 51, 51, 60, 60]}
              source="ONS Wealth and Assets Survey — 2024"
            />
            <MetricCard
              label="Median inheritance size (£)"
              value="11,000"
              direction="up"
              polarity="up-is-good"
              changeText="conditional median · half of adults receive nothing"
              sparklineData={[7000, 7500, 8000, 8500, 9000, 9500, 10000, 10500, 11000, 11000]}
              source="ONS Wealth and Assets Survey — 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-flow" className="mb-12">
            <LineChart
              title="Total inheritance flow in UK, 2010–2024 (£bn)"
              subtitle="Estimated annual value of inherited assets, including property, financial assets, and business assets transferred at death."
              series={flowSeries}
              annotations={flowAnnotations}
              yLabel="£ billions per year"
              source={{
                name: 'HMRC / Resolution Foundation',
                dataset: 'Inheritance Tax Statistics and Intergenerational Audit',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/collections/inheritance-tax-statistics',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-decile" className="mb-12">
            <LineChart
              title="Share of inherited wealth by wealth decile, UK, 2015–2024"
              subtitle="Percentage of total inherited wealth received by top 10%, middle 40%, and bottom 50% of the wealth distribution."
              series={decileSeries}
              yLabel="Share of total inherited wealth (%)"
              source={{
                name: 'ONS',
                dataset: 'Wealth and Assets Survey',
                frequency: 'biennial',
                url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/personalandhouseholdfinances/debt/bulletins/wealthingreatbritainwave',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on inherited wealth</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Britain is in the middle of the largest intergenerational wealth transfer in its history. Total inherited wealth has grown from approximately £55 billion per year in the mid-1990s to around £175 billion in 2024 — a more than threefold increase in real terms — with annual flows projected to exceed £250 billion by the mid-2030s.<Cite nums={[1, 3]} /> Property is the primary mechanism: house price inflation since the 1980s created substantial unearned wealth for owner-occupiers, particularly in London and the South East, which now passes to the next generation.</p>
              <p>The top 10% of estates account for approximately 60% of all inherited wealth transferred, while roughly half of all adults receive no meaningful inheritance.<Cite nums={2} /> Inheritance tax (IHT) is intended to moderate these transfers but only around 4% of estates pay any IHT at all, as the £325,000 threshold (frozen since 2009) and various reliefs reduce effective rates sharply.<Cite nums={1} /> The combination of a frozen threshold and rising asset prices means the IHT base has eroded in real terms even as flows have grown.</p>
              <p>Recipients of large inheritances are significantly more likely to move into owner-occupation, start a business, and exit paid employment — compressing opportunity for those who must build wealth from wages alone. Resolution Foundation research projects that by the 2040s, inheritance will account for a larger share of lifetime wealth inequality than it does today.<Cite nums={3} /></p>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.gov.uk/government/collections/inheritance-tax-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">HMRC</a> — Inheritance Tax Statistics. Published annually.</p>
            <p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/personalandhouseholdfinances/debt/bulletins/wealthingreatbritainwave" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS</a> — Wealth and Assets Survey. Published every two years.</p>
            <p><a href="https://www.resolutionfoundation.org/research/intergenerational-audit" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Resolution Foundation</a> — Intergenerational Audit.</p>
            <p>Total inherited wealth estimates combine HMRC administrative data on estates passing through probate with ONS Wealth and Assets Survey estimates of total household wealth transfers. Top decile share derived from ONS WAS wave 7 (2018–2020). Median inheritance figures reflect conditional median among those receiving any inheritance.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
