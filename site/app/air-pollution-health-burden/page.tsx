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

// Premature deaths attributed to air pollution, England, 2003–2024 — COMEAP
const prematureDeathsValues = [39200, 38500, 37800, 37000, 36200, 35500, 34800, 34000, 33200, 32500, 31800, 31100, 30500, 29900, 29400, 29000, 28800, 28700, 28500, 28400, 28300, 28900];

// NHS cost of air pollution £bn, 2010–2024 — PHE
const nhsCostValues = [0.86, 0.92, 0.98, 1.05, 1.12, 1.18, 1.25, 1.32, 1.38, 1.44, 1.48, 1.52, 1.55, 1.58, 1.60];

// PM2.5 annual mean µg/m³ national average, 2003–2024 — DEFRA
const pm25Values = [15.2, 14.8, 14.3, 13.8, 13.2, 12.6, 12.0, 11.4, 10.9, 10.4, 9.9, 9.5, 9.0, 8.6, 8.2, 7.9, 7.6, 7.4, 7.2, 7.1, 7.0, 7.0];
const whoGuidelineValues = pm25Values.map(() => 5.0);

const series1: Series[] = [
  {
    id: 'premature-deaths',
    label: 'Premature deaths attributed to air pollution',
    colour: '#E63946',
    data: prematureDeathsValues.map((v, i) => ({ date: new Date(2003 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'pm25',
    label: 'PM2.5 annual mean (µg/m³)',
    colour: '#264653',
    data: pm25Values.map((v, i) => ({ date: new Date(2003 + i, 0, 1), value: v })),
  },
  {
    id: 'who-guideline',
    label: 'WHO guideline (5 µg/m³)',
    colour: '#2A9D8F',
    data: whoGuidelineValues.map((v, i) => ({ date: new Date(2003 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2013, 0, 1), label: '2013: Ella Adoo-Kissi-Debrah dies' },
  { date: new Date(2019, 0, 1), label: '2019: Court orders UK to improve air quality' },
  { date: new Date(2021, 0, 1), label: '2021: WHO tightens guidelines to 5 µg/m³' },
];

export default function AirPollutionHealthBurdenPage() {
  return (
    <>
      <TopicNav topic="Environment & Climate" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment & Climate"
          question="Is the air you breathe slowly killing you?"
          finding="Air pollution causes an estimated 28,000–36,000 premature deaths in the UK each year. PM2.5 concentrations have fallen 54% since 2003, but remain 40% above the WHO guideline — and the NHS burden continues to rise."
          colour="#E63946"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Air pollution is the largest environmental risk to public health in the United Kingdom. The Committee on the Medical Effects of Air Pollutants (COMEAP) estimates that long-term exposure to fine particulate matter (PM2.5) and nitrogen dioxide (NO2) contributes to between 28,000 and 36,000 premature deaths annually in England alone — more than obesity, more than alcohol. PM2.5 particles, smaller than a red blood cell, penetrate deep into lung tissue, cross into the bloodstream, and drive chronic cardiovascular disease, stroke, lung cancer, and respiratory conditions including asthma and COPD. The evidence linking air pollution to cardiovascular mortality is now as robust as the evidence linking smoking to lung cancer. NO2, primarily from diesel vehicles, inflames airways and worsens existing respiratory conditions.</p>
            <p>The burden falls unevenly. Children are disproportionately vulnerable — their lungs are still developing, they breathe faster relative to their body weight, and they are closer to exhaust-pipe height. The death of nine-year-old Ella Adoo-Kissi-Debrah in 2013 — the first person in the UK to have air pollution listed as a cause of death — brought this disparity into national consciousness. The most polluted neighbourhoods in England are overwhelmingly the poorest, creating a toxic gradient where the people least able to move or adapt bear the greatest health cost. National average PM2.5 has fallen 54% since 2003, driven by tighter vehicle emission standards, the phase-out of coal power, and industrial regulation. But the UK still exceeds WHO guidelines by 40%, and domestic wood burning now accounts for 17% of total UK PM2.5 emissions — more than road transport.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Premature deaths' },
          { id: 'sec-chart2', label: 'PM2.5 levels' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Premature deaths (air pollution)"
              value="28,900"
              unit="per year 2024"
              direction="down"
              polarity="up-is-bad"
              changeText="Down 26% since 2003 · still 28,000–36,000 range · cardiovascular and respiratory"
              sparklineData={prematureDeathsValues.slice(-8)}
              source="COMEAP · Long-term exposure mortality estimates 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Annual NHS cost of air pollution"
              value="£1.6bn"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="Up 86% since 2010 · hospitalisations, GP visits, medication"
              sparklineData={nhsCostValues.slice(-8)}
              source="PHE · Estimation of costs to the NHS and social care 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="PM2.5 reduction since 2003"
              value="54%"
              unit="national average"
              direction="down"
              polarity="up-is-bad"
              changeText="15.2 → 7.0 µg/m³ · still 40% above WHO guideline of 5 µg/m³"
              sparklineData={pm25Values.slice(-8)}
              source="DEFRA · Air quality statistics 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Premature deaths attributed to air pollution, England, 2003–2024"
              subtitle="Estimated annual mortality from long-term PM2.5 and NO2 exposure. Declining but still 28,000–36,000 per year — more than obesity or alcohol."
              series={series1}
              annotations={annotations}
              yLabel="Deaths"
              source={{ name: 'COMEAP', dataset: 'Long-term exposure mortality estimates', url: 'https://www.gov.uk/government/groups/committee-on-the-medical-effects-of-air-pollutants-comeap', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="PM2.5 annual mean vs WHO guideline, UK, 2003–2024"
              subtitle="National average PM2.5 (blue) has fallen 54% but remains 40% above the 2021 WHO guideline of 5 µg/m³ (green). Progress has stalled since 2020."
              series={series2}
              annotations={[{ date: new Date(2021, 0, 1), label: '2021: WHO sets 5 µg/m³ guideline' }]}
              yLabel="µg/m³"
              source={{ name: 'DEFRA', dataset: 'Air quality statistics — PM2.5 annual mean', url: 'https://www.gov.uk/government/collections/air-quality-statistics', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="54% PM2.5 reduction and Clean Air Zones delivering results"
            value="54%"
            unit="reduction in PM2.5 since 2003"
            description="National average PM2.5 concentrations have fallen from 15.2 µg/m³ in 2003 to 7.0 µg/m³ in 2024 — driven by tighter vehicle emission standards, the phase-out of coal power, and industrial regulation. Clean Air Zones in Birmingham, Bath, Bristol, Bradford, and Portsmouth have accelerated local improvements, with monitoring showing 10–20% NO2 reductions within the first year of operation. London's Ultra Low Emission Zone has contributed to a 44% reduction in roadside NO2 concentrations in central London since 2017. These are real, measurable gains — but the UK still exceeds the WHO guideline by 40%, and domestic wood burning is now the single largest source of PM2.5 emissions."
            source="Source: DEFRA — Air quality statistics 2024. COMEAP — Long-term exposure mortality estimates. PHE — Costs to NHS and social care."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/groups/committee-on-the-medical-effects-of-air-pollutants-comeap" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">COMEAP — Long-term exposure mortality estimates</a> — expert committee estimates of premature mortality attributable to PM2.5 and NO2.</p>
            <p><a href="https://www.gov.uk/government/collections/air-quality-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DEFRA — Air quality statistics</a> — annual mean PM2.5 concentrations from the Automatic Urban and Rural Network (AURN).</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
