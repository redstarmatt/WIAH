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

// Hospital admissions (thousands), 2010–2023 — NHS Digital
const admissionsValues = [839, 865, 884, 904, 916, 925, 930, 940, 950, 955, 890, 960, 975, 980];

// Alcohol-specific deaths, England & Wales, 2010–2023 — ONS
const deathsValues = [6669, 6880, 6490, 6592, 6831, 7366, 7327, 7697, 7551, 7565, 8974, 9641, 8209, 8274];

// Adults drinking above guidelines (%), 2010–2023
const aboveGuidelinesValues = [26, 25, 24, 23, 23, 22, 22, 21, 21, 21, 19, 20, 21, 21];

const series1: Series[] = [
  {
    id: 'hospital-admissions',
    label: 'Hospital admissions (thousands)',
    colour: '#F4A261',
    data: admissionsValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v * 1000 })),
  },
];

const series2: Series[] = [
  {
    id: 'alcohol-deaths',
    label: 'Alcohol-specific deaths',
    colour: '#E63946',
    data: deathsValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
  {
    id: 'above-guidelines',
    label: 'Adults drinking above guidelines (%)',
    colour: '#6B7280',
    data: aboveGuidelinesValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v * 1000 })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2018, 0, 1), label: '2018: Scotland introduces minimum unit pricing' },
  { date: new Date(2020, 0, 1), label: '2020: COVID-19 — off-trade surge' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'ONS', dataset: 'Alcohol-specific deaths in the UK', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/causesofdeath/bulletins/alcoholspecificdeathsintheuk', date: '2023' },
  { num: 2, name: 'NHS Digital', dataset: 'Statistics on Alcohol, England', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/statistics-on-alcohol', date: '2023' },
  { num: 3, name: 'Public Health Scotland', dataset: 'Evaluating the impact of minimum unit pricing', date: '2023' },
];

export default function AlcoholPage() {
  return (
    <>
      <TopicNav topic="Alcohol" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Alcohol"
          question="Is Britain actually drinking less?"
          finding="Alcohol-related hospital admissions have risen to 980,000 a year — up 17% since 2010. Over 8,000 people die from alcohol-specific causes each year. Per-capita consumption has fallen since the 2004 peak but remains one of the highest in Europe. Alcohol costs the NHS £3.5 billion annually."
          colour="#F4A261"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Britain is consuming less alcohol than it did in 2004, when per-capita consumption peaked, yet the health toll keeps rising. Alcohol-specific deaths in England and Wales reached 8,274 in 2023 — up 24% since 2010 — driven by alcoholic liver disease, which has a long latency: the drinkers dying today were drinking heavily in the 2000s.<Cite nums={1} /> Hospital admissions where alcohol was the primary or secondary diagnosis reached 980,000 in 2022/23, up 17% from 839,000 in 2010, and now cost the NHS an estimated £3.5 billion a year.<Cite nums={2} /> The heaviest 10% of drinkers consume more than 60% of all alcohol sold; it is their ill-health that dominates the statistics even as moderate drinkers cut back.<Cite nums={2} /></p>
            <p>The COVID-19 pandemic produced a sharp spike in alcohol mortality: deaths peaked at 9,641 in 2021 as off-licence sales surged, hospital services were constrained, and previously dependent drinkers went without clinical support.<Cite nums={1} /> Deaths have since fallen back to 8,274 but remain well above pre-pandemic levels.<Cite nums={1} /> There are marked socioeconomic gradients: alcohol-specific death rates in the most deprived areas of England are more than twice those in the least deprived, a disparity that has widened since 2010.<Cite nums={1} /> Scotland's introduction of minimum unit pricing (MUP) at 50p per unit in 2018 — raised to 65p in 2024 — provides the clearest evidence that price-based interventions reduce harm. Public Health Scotland's evaluation found a 13% reduction in alcohol-specific deaths in the first three years.<Cite nums={3} /> England has not introduced equivalent measures.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Admissions' },
          { id: 'sec-chart2', label: 'Deaths' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Alcohol-specific deaths (England & Wales)"
              value="8,274"
              unit="2023"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 6,669 in 2010 · peaked at 9,641 in 2021 · COVID drove sharp spike"
              sparklineData={deathsValues}
              source="ONS · Alcohol-specific deaths in the UK 2023"
              href="#sec-chart2"
            />
            <MetricCard
              label="Alcohol-related hospital admissions"
              value="980K"
              unit="2022/23"
              direction="up"
              polarity="up-is-bad"
              changeText="Up 17% since 2010 · alcoholic liver disease the primary cause · NHS cost £3.5bn/year"
              sparklineData={admissionsValues}
              source="NHS Digital · Statistics on Alcohol, England 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Adults drinking above guidelines"
              value="21%"
              unit="2023"
              direction="flat"
              polarity="up-is-bad"
              changeText="14 units/week guideline · men 24%, women 18% · heaviest 10% drink 60%+ of all alcohol"
              sparklineData={aboveGuidelinesValues}
              source="NHS Digital · Health Survey for England 2023"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Alcohol-related hospital admissions, England, 2010–2023"
              subtitle="All admissions where alcohol was the primary or secondary diagnosis. Rising steadily with a dip in 2020 during COVID-19 when many delayed or avoided hospital care."
              series={series1}
              annotations={[{ date: new Date(2020, 0, 1), label: '2020: COVID-19 suppresses admissions' }]}
              yLabel="Admissions"
              source={{ name: 'NHS Digital', dataset: 'Statistics on Alcohol, England', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/statistics-on-alcohol', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Alcohol-specific deaths, England & Wales, 2010–2023"
              subtitle="Deaths from conditions wholly attributable to alcohol (ICD-10 codes). Pandemic surge has partially retreated but remains above pre-2020 levels."
              series={[{
                id: 'alcohol-deaths',
                label: 'Alcohol-specific deaths',
                colour: '#E63946',
                data: deathsValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
              }]}
              annotations={annotations}
              yLabel="Deaths per year"
              source={{ name: 'ONS', dataset: 'Alcohol-specific deaths in the UK', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/causesofdeath/bulletins/alcoholspecificdeathsintheuk', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Per-capita consumption falling, young people leading the way"
            value="-18%"
            unit="fall in per-capita alcohol consumption since 2004 peak"
            description="Alcohol consumption per capita has fallen 18% since the 2004 peak, driven by falling drinking among young people — 26% of 16–24 year olds now report not drinking at all, up from 18% in 2005. Minimum unit pricing (MUP) was introduced in Scotland at 50p per unit in 2018 and in Wales in 2020; Public Health Scotland's evaluation found a 13% reduction in alcohol-specific deaths in year one. England has not yet adopted MUP. The alcohol duty reform of 2023 simplified the tax structure and introduced a new lower rate for drinks below 3.5% ABV, incentivising lower-strength products."
            source="Source: ONS — Alcohol-specific deaths in the UK 2023. NHS Digital — Statistics on Alcohol 2023."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/causesofdeath/bulletins/alcoholspecificdeathsintheuk" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Alcohol-specific deaths in the UK</a> — annual publication. Deaths from conditions wholly attributable to alcohol using ICD-10 codes.</p>
            <p><a href="https://digital.nhs.uk/data-and-information/publications/statistical/statistics-on-alcohol" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS Digital — Statistics on Alcohol, England</a> — annual publication covering hospital admissions, prescriptions, and treatment statistics.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
