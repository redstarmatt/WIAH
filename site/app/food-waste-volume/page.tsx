'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Food waste by weight (million tonnes), 2015–2025
const wasteMillionTonnes = [7.3, 7.2, 7.1, 7.0, 6.9, 6.8, 6.7, 6.6, 6.5, 6.4, 6.4];
// Value wasted (£bn), 2015–2025
const wasteBn = [18.5, 18.2, 18.0, 17.8, 17.5, 17.2, 17.0, 17.0, 17.0, 17.0, 17.0];
// Avoidable waste (%), 2015–2025
const avoidablePct = [75, 74, 74, 74, 73, 73, 73, 73, 73, 73, 73];
// Unavoidable waste (%), 2015–2025
const unavoidablePct = [25, 26, 26, 26, 27, 27, 27, 27, 27, 27, 27];

const wasteSeries: Series[] = [
  {
    id: 'waste-tonnes',
    label: 'Food waste (million tonnes)',
    colour: '#E63946',
    data: wasteMillionTonnes.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
  {
    id: 'waste-value',
    label: 'Value wasted (£bn)',
    colour: '#F4A261',
    data: wasteBn.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const avoidableSeries: Series[] = [
  {
    id: 'avoidable',
    label: 'Avoidable waste (%)',
    colour: '#E63946',
    data: avoidablePct.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
  {
    id: 'unavoidable',
    label: 'Unavoidable waste (%)',
    colour: '#2A9D8F',
    data: unavoidablePct.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const wasteAnnotations: Annotation[] = [
  { date: new Date(2015, 5, 1), label: '2015: WRAP Courtauld Commitment 2025 launched' },
  { date: new Date(2021, 5, 1), label: '2021: WRAP targets — 50% reduction by 2030' },
];

const avoidableAnnotations: Annotation[] = [
  { date: new Date(2019, 5, 1), label: "2019: 'Fresher for Longer' campaign launched" },
];

export default function TopicPage() {
  return (
    <>
      <TopicNav topic="Food Waste" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment & Climate"
          question="How Much Food Are We Throwing Away?"
          finding="UK households waste 6.4 million tonnes of food per year — worth £17 billion. 73% of food waste is avoidable, and the average family wastes £700 per year on food thrown away uneaten."
          colour="#2A9D8F"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>UK households waste 6.4 million tonnes of food every year, worth approximately £17 billion. That is roughly £640 per person or £1,000 for a family of four. Around 73% of this food was still edible when it was thrown away — not past its use-by date, not inedible, simply not used. Bread, salad leaves, and fruit are the most commonly wasted foods. The environmental cost compounds the economic one: the production, transportation, and decomposition of wasted food generates around 25 million tonnes of CO2-equivalent emissions annually.</p>
            <p>Progress has been modest. Household food waste has fallen from 7.3 million tonnes in 2015 to 6.4 million tonnes in 2024 — a reduction of around 12% over a decade. The WRAP-led Courtauld Commitment has engaged major retailers in waste reduction targets, but voluntary action has inherent limits. The UN Sustainable Development Goal requires a 50% per-capita reduction at retail and consumer level by 2030 — an ambition that would require cutting household waste roughly in half from today's levels in just six years. At current rates, the UK will fall substantially short. Mandatory food waste reporting for large businesses, enacted in Wales in 2024, has not yet been extended to England.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Waste Trends' },
          { id: 'sec-chart2', label: 'Avoidable Waste' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Household food waste"
              value="6.4m tonnes"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="Down from 7.3m in 2015 · progress slowing — SDG target: 50% by 2030"
              sparklineData={wasteMillionTonnes.slice(-8)}
              source="WRAP · UK food waste estimates 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Financial value wasted"
              value="£17bn"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="£640/person/year · £1,000/family of four"
              sparklineData={wasteBn.slice(-8)}
              source="WRAP · Household food waste in the UK 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Avoidable food waste share"
              value="73%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="Still edible when thrown away · bread, salad, fruit top the list"
              sparklineData={avoidablePct.slice(-8)}
              source="WRAP · Household food waste measurement 2023"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK household food waste: weight and value, 2015–2025"
              subtitle="Total household food waste by weight (million tonnes) and value (£bn). Both are declining slowly but are on track to miss 2030 targets."
              series={wasteSeries}
              annotations={wasteAnnotations}
              yLabel="Weight (Mt) / Value (£bn)"
              source={{ name: 'WRAP', dataset: 'Household food waste in the UK', url: 'https://wrap.org.uk/resources/report/food-surplus-and-waste-uk-key-facts', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Avoidable vs unavoidable food waste, UK, 2015–2025"
              subtitle="Percentage of food waste that was avoidable (could have been eaten) vs unavoidable (peel, bones, coffee grounds). Avoidable share stable at 73%."
              series={avoidableSeries}
              annotations={avoidableAnnotations}
              yLabel="Share (%)"
              source={{ name: 'WRAP', dataset: 'Household food waste in the UK', url: 'https://wrap.org.uk/resources/report/food-surplus-and-waste-uk-key-facts', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Food waste falling steadily since 2007 peak"
            value="-23%"
            unit="reduction since 2007 peak"
            description="UK household food waste has fallen 23% since the 2007 peak of 8.3 million tonnes, largely through the WRAP-led Courtauld Commitment and retailer food waste reduction schemes. The Love Food Hate Waste campaign has reached 40 million households. Surplus food redistribution via Too Good To Go, OLIO, and FareShare grew 30% in 2024, rescuing 250,000 tonnes for food banks and community groups. Mandatory food waste reporting for large businesses would accelerate progress further."
            source="Source: WRAP — Household food waste statistics, 2025; Courtauld Commitment 2030 progress report."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://wrap.org.uk/resources/report/food-surplus-and-waste-uk-key-facts" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">WRAP — UK food surplus and waste estimates</a> — Annual estimates covering household and supply chain waste. Retrieved 2025.</p>
            <p>WRAP revised its measurement approach in 2018. Figures from before and after this revision are not directly comparable. All figures shown use the consistent post-2018 methodology.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
