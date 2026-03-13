'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Total food waste (million tonnes), 2015–2023
const totalWasteMt = [10.2, 10.0, 9.8, 9.7, 9.6, 9.5, 9.5, 9.5, 9.5];
// Household food waste (million tonnes), 2015–2023
const householdWasteMt = [7.3, 7.2, 7.1, 7.0, 6.9, 6.8, 6.6, 6.5, 6.4];
// Avoidable waste (%), 2015–2023
const avoidablePct = [75, 75, 74, 74, 74, 73, 73, 73, 73];
// Unavoidable waste (%), 2015–2023
const unavoidablePct = [25, 25, 26, 26, 26, 27, 27, 27, 27];

const totalSeries: Series[] = [
  {
    id: 'total-waste',
    label: 'Total food waste (million tonnes)',
    colour: '#F4A261',
    data: totalWasteMt.map((v, i) => ({ date: new Date(2015 + i, 6, 1), value: v })),
  },
  {
    id: 'household-waste',
    label: 'Household food waste (million tonnes)',
    colour: '#264653',
    data: householdWasteMt.map((v, i) => ({ date: new Date(2015 + i, 6, 1), value: v })),
  },
];

const avoidableSeries: Series[] = [
  {
    id: 'avoidable',
    label: 'Avoidable waste (%)',
    colour: '#E63946',
    data: avoidablePct.map((v, i) => ({ date: new Date(2015 + i, 6, 1), value: v })),
  },
  {
    id: 'unavoidable',
    label: 'Unavoidable waste (%)',
    colour: '#2A9D8F',
    data: unavoidablePct.map((v, i) => ({ date: new Date(2015 + i, 6, 1), value: v })),
  },
];

const wasteAnnotations: Annotation[] = [
  { date: new Date(2015, 6, 1), label: '2015: Courtauld Commitment 2025 launched' },
  { date: new Date(2021, 6, 1), label: '2021: WRAP targets — 50% reduction by 2030' },
];

const avoidableAnnotations: Annotation[] = [
  { date: new Date(2019, 6, 1), label: "2019: 'Fresher for Longer' campaign launched" },
];

export default function FoodWastePage() {
  return (
    <>
      <TopicNav topic="Food Waste" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Food Waste"
          question="How Much Food Does Britain Throw Away?"
          finding="The UK wastes 9.5 million tonnes of food annually — worth £19bn — with households responsible for around 70%. The waste is declining slowly but is on track to miss the UN goal of halving food waste by 2030."
          colour="#F4A261"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK wastes approximately 9.5 million tonnes of food annually across the whole supply chain — from farm gate through manufacturing, retail, and hospitality, to the household bin. Households account for around 6.4 million tonnes, or roughly 70% by weight. WRAP estimates the household food waste bill at £19 billion per year, or around £700 per household. Critically, around 50% of household food waste is food that was still edible when discarded, including bread, salad, and fruit. Environmental impact compounds the economic cost: the embedded carbon in wasted food amounts to around 25 million tonnes of CO2-equivalent per year. Yet the scale of food waste coexists with acute food insecurity: approximately 7 million UK adults experienced food insecurity in 2023.</p>
            <p>Progress on reducing food waste has been made but at a slow and insufficient rate. WRAP data shows total UK food waste fell from an estimated 11.5 million tonnes in 2007 to 9.5 million tonnes in 2023 — a reduction of around 18% over sixteen years. Over the more recent period 2015–2023, total waste has barely moved. The UN Sustainable Development Goal 12.3 requires a 50% reduction in food waste per capita at retail and consumer level by 2030 — an ambition that would require the UK to cut household waste from around 6.4 million tonnes to around 3.2 million tonnes in seven years. At current rates of progress, the UK will fall far short.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-waste', label: 'Waste Trends' },
          { id: 'sec-avoidable', label: 'Avoidable Waste' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Total food waste per year"
              value="9.5m"
              unit="tonnes"
              direction="down"
              polarity="up-is-bad"
              changeText="Down 18% since 2007 but progress has stalled — SDG target: 50% by 2030"
              sparklineData={totalWasteMt.slice(-8)}
              source="WRAP · UK food waste estimates 2024"
              href="#sec-waste"
            />
            <MetricCard
              label="Cost of household food waste"
              value="£19bn"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="Around £700 per household per year · 50% of wasted food was still edible"
              sparklineData={[21, 20, 20, 19, 19, 19, 19, 19]}
              source="WRAP · Household food waste in the UK 2023"
              href="#sec-waste"
            />
            <MetricCard
              label="Avoidable food waste share"
              value="73%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="Could have been eaten · not out-of-date or inedible"
              sparklineData={avoidablePct.slice(-8)}
              source="WRAP · Household food waste measurement 2023"
              href="#sec-avoidable"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-waste" className="mb-12">
            <LineChart
              title="UK food waste by source, 2015–2023"
              subtitle="Total and household food waste in million tonnes. Progress has been slow and the 2030 SDG target is likely to be missed at current rates."
              series={totalSeries}
              annotations={wasteAnnotations}
              yLabel="Million tonnes"
              source={{ name: 'WRAP', dataset: 'UK food surplus and waste estimates', url: 'https://wrap.org.uk/resources/report/food-surplus-and-waste-uk-key-facts', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-avoidable" className="mb-12">
            <LineChart
              title="Avoidable vs unavoidable food waste, UK, 2015–2023"
              subtitle="Percentage of food waste that was avoidable (could have been eaten) vs unavoidable (peel, bones, coffee grounds etc.)."
              series={avoidableSeries}
              annotations={avoidableAnnotations}
              yLabel="Share (%)"
              source={{ name: 'WRAP', dataset: 'Household food waste measurement methodology', url: 'https://wrap.org.uk/resources/report/food-surplus-and-waste-uk-key-facts', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="18% reduction since 2007 and food redistribution growing"
            value="9.5Mt"
            unit="down from 11.5Mt in 2007"
            description="UK food waste has fallen 18% since 2007, among the better OECD performances. Too Good To Go, OLIO, and community fridges are redistributing food at scale. The Courtauld Commitment 2030 — signed by retailers accounting for over 80% of UK grocery sales — targets a further 50% reduction. Surplus food redistribution grew 30% in 2024, rescuing 250,000 tonnes for food banks and community groups. Mandatory food waste reporting for large businesses, if enacted, would drive faster progress through transparency."
            source="Source: WRAP — UK food waste estimates; Courtauld Commitment 2030 progress report."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://wrap.org.uk/resources/report/food-surplus-and-waste-uk-key-facts" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">WRAP — UK food surplus and waste estimates</a> — Annual estimates covering all stages of the supply chain. Retrieved 2025.</p>
            <p>WRAP revised its measurement approach in 2018, making comparison with pre-2018 figures imperfect. All figures shown use the consistent post-2018 methodology.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
