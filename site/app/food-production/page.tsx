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

const editorialRefs: Reference[] = [
  { num: 1, name: 'Defra', dataset: 'Agriculture in the United Kingdom', url: 'https://www.gov.uk/government/statistics/agriculture-in-the-united-kingdom', date: '2024' },
  { num: 2, name: 'Defra', dataset: 'Horticulture Statistics', url: 'https://www.gov.uk/government/collections/defra-statistical-releases', date: '2024' },
  { num: 3, name: 'Natural England', dataset: 'ELMS monitoring report', date: '2025' },
];

// UK food self-sufficiency (%), 2015–2024
const selfSufficiency = [61.2, 60.8, 60.5, 61.0, 60.7, 60.2, 59.6, 58.8, 58.2, 57.8];
// Farm workforce (thousands), 2015–2024
const farmWorkforce = [430, 420, 410, 405, 400, 398, 395, 390, 385, 380];
// Total agricultural output (£bn real terms), 2015–2024
const agriculturalOutput = [26.2, 25.8, 26.5, 27.1, 26.8, 25.9, 26.4, 28.9, 27.1, 27.4];
// UK-grown fruit (% of consumption), 2015–2024
const ukGrownFruit = [20, 19, 19, 18, 18, 18, 17, 17, 16, 16];

const sufficiencySeries: Series[] = [
  {
    id: 'self-sufficiency',
    label: 'UK food self-sufficiency (%)',
    colour: '#2A9D8F',
    data: selfSufficiency.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
  {
    id: 'uk-fruit',
    label: 'UK-grown fruit (% of consumption)',
    colour: '#F4A261',
    data: ukGrownFruit.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const outputSeries: Series[] = [
  {
    id: 'agricultural-output',
    label: 'Total agricultural output (£bn, real terms)',
    colour: '#264653',
    data: agriculturalOutput.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
  {
    id: 'farm-workforce',
    label: 'Farm workforce (thousands)',
    colour: '#6B7280',
    data: farmWorkforce.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const sufficiencyAnnotations: Annotation[] = [
  { date: new Date(2020, 5, 1), label: '2020: Brexit transition — trade disruption' },
  { date: new Date(2022, 5, 1), label: '2022: Ukraine war raises commodity prices' },
];

const outputAnnotations: Annotation[] = [
  { date: new Date(2021, 5, 1), label: '2021: ELMS replaces Basic Payment Scheme' },
];

export default function FoodProductionPage() {
  return (
    <>
      <TopicNav topic="Food Production" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Food Production"
          question="Can Britain Feed Itself?"
          finding="The UK produces just 57.8% of its own food, down from 78% in 1984 and the lowest level since records began. Import dependency is rising as global supply chains face growing disruption."
          colour="#2A9D8F"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK is one of the least food self-sufficient countries in Western Europe. Defra's annual Agriculture in the United Kingdom report shows that the ratio of domestic production to total food supply has fallen from around 78% in the mid-1980s to 57.8% in 2024.<Cite nums={[1]} /> For indigenous-type food — products that can be grown or raised in the UK climate — self-sufficiency is higher at around 73%, but this still means that more than a quarter of food the UK could theoretically produce for itself is instead imported.<Cite nums={[1]} /> The UK imports approximately 46% of its food by value, with the EU supplying around 42% of total food imports.<Cite nums={[1]} /></p>
            <p>Agricultural output has been broadly flat in real terms for a decade, with year-to-year volatility driven primarily by weather and commodity prices.<Cite nums={[1]} /> The farming workforce has shrunk by 30% since 2000, from 540,000 to 380,000, and the average age of a farm holder is 60.<Cite nums={[1]} /> Post-Brexit agricultural policy has shifted from the EU's area-based Basic Payment Scheme to the Environmental Land Management scheme, which pays farmers for environmental outcomes. The transition has been difficult: BPS payments are being phased out by 2028, but ELMS uptake has been slower than expected, with only 35% of eligible farmland enrolled by 2024, creating a funding gap for many smaller farms.<Cite nums={[3]} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-sufficiency', label: 'Self-Sufficiency' },
          { id: 'sec-output', label: 'Agricultural Output' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="UK food self-sufficiency"
              value="57.8%"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="Down from 78% in 1984 · lowest since records began"
              sparklineData={selfSufficiency.slice(-8)}
              source="Defra · Agriculture in the UK 2024"
              href="#sec-sufficiency"
            />
            <MetricCard
              label="Farm workforce"
              value="380K"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="Down 30% since 2000 · average farmer age 60"
              sparklineData={farmWorkforce.slice(-8)}
              source="Defra · Agriculture in the UK 2024"
              href="#sec-output"
            />
            <MetricCard
              label="UK-grown fruit (% of consumption)"
              value="16%"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="Down from 35% in 1990 · labour shortages hit horticulture"
              sparklineData={ukGrownFruit.slice(-8)}
              source="Defra · Horticulture Statistics 2024"
              href="#sec-sufficiency"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-sufficiency" className="mb-12">
            <LineChart
              title="UK food self-sufficiency and UK-grown fruit, 2015–2024"
              subtitle="Ratio of domestic food production value to total food supply value. Indigenous-type food only. UK-grown fruit share of total consumption shown separately."
              series={sufficiencySeries}
              annotations={sufficiencyAnnotations}
              yLabel="Percentage (%)"
              source={{ name: 'Defra', dataset: 'Agriculture in the United Kingdom', url: 'https://www.gov.uk/government/statistics/agriculture-in-the-united-kingdom', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-output" className="mb-12">
            <LineChart
              title="UK agricultural output and farm workforce, 2015–2024"
              subtitle="Gross output of UK agriculture in real terms (2023 prices) alongside total farm workforce. Weather and commodity price volatility drive year-to-year output variation."
              series={outputSeries}
              annotations={outputAnnotations}
              yLabel="Output (£bn) / Workforce (000s)"
              source={{ name: 'Defra', dataset: 'Agriculture in the United Kingdom', url: 'https://www.gov.uk/government/statistics/agriculture-in-the-united-kingdom', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Environmental Land Management showing early promise"
            value="35%"
            unit="of eligible farmland enrolled in ELMS by 2024"
            description="The Environmental Land Management scheme, which pays farmers for environmental outcomes rather than land area, is building momentum. Early data shows enrolled farms reducing chemical inputs, restoring hedgerows, and improving soil health. The scheme's Sustainable Farming Incentive has simplified access for smaller holdings. Nature Recovery Networks funded through ELMS could restore 250,000 hectares of habitat while keeping farmland productive — a genuine opportunity to improve both food security and ecological resilience."
            source="Source: Defra — Agriculture in the United Kingdom 2024; Natural England — ELMS monitoring report 2025."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/statistics/agriculture-in-the-united-kingdom" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Defra — Agriculture in the United Kingdom</a> — Annual report covering self-sufficiency, output, workforce, and land use. Retrieved 2025.</p>
            <p><a href="https://www.gov.uk/government/collections/defra-statistical-releases" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Defra — Horticulture Statistics</a> — UK-grown fruit and vegetable production data. Retrieved 2025.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
