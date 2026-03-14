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

// Rivers in good ecological status (%), 2009–2022 — Environment Agency
const riverGoodValues = [27, 27, 27, 28, 28, 17, 17, 16, 16, 14, 14, 14, 16, 16];

// Greenhouse gas emissions (MtCO2e), 2010–2023 — DESNZ
const ghgValues = [590, 568, 556, 568, 527, 497, 466, 458, 446, 453, 411, 370, 417, 384];

// Biodiversity indicator (index 2000=100), 2010–2022 — JNCC
const biodiversityValues = [78, 77, 76, 75, 74, 73, 73, 72, 71, 71, 70, 70, 69];

const riverSeries: Series[] = [
  {
    id: 'rivers-good',
    label: 'Rivers in good ecological status (%)',
    colour: '#2A9D8F',
    data: riverGoodValues.map((v, i) => ({ date: new Date(2009 + i, 0, 1), value: v })),
  },
];

const ghgSeries: Series[] = [
  {
    id: 'ghg',
    label: 'Greenhouse gas emissions (MtCO2e)',
    colour: '#264653',
    data: ghgValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const riverAnnotations: Annotation[] = [
  { date: new Date(2015, 0, 1), label: '2015: Water Framework Directive reclassification' },
];

const ghgAnnotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: COVID — industrial slowdown' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'DESNZ', dataset: 'UK Greenhouse Gas Inventory', url: 'https://www.gov.uk/government/statistics/provisional-uk-greenhouse-gas-emissions-national-statistics', date: '2023' },
  { num: 2, name: 'Environment Agency', dataset: 'Water Framework Directive classification', url: 'https://environment.data.gov.uk/catchment-planning/', date: '2022' },
  { num: 3, name: 'JNCC', dataset: 'UK Biodiversity Indicators', url: 'https://jncc.gov.uk/our-work/ukbi/', date: '2022' },
  { num: 4, name: 'Climate Change Committee', dataset: 'Progress Report to Parliament', url: 'https://www.theccc.org.uk/publication/progress-in-reducing-emissions-2024-report-to-parliament/', date: '2024' },
];

export default function EnvironmentPage() {
  return (
    <>
      <TopicNav topic="Environment" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment"
          question="Is Britain Actually Getting Greener?"
          finding="UK greenhouse gas emissions have fallen 35% since 2010. But only 16% of rivers meet good ecological status — among the worst in Europe. Biodiversity indicators have declined for two decades. Progress on climate is real; the nature emergency is not improving."
          colour="#2A9D8F"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>UK greenhouse gas emissions have fallen by approximately 35% since 2010<Cite nums={1} />, driven primarily by the phase-out of coal from electricity generation and improved energy efficiency. This is one of the steepest decarbonisation trajectories of any large economy. But the progress masks an uneven picture: emissions from transport, buildings, and agriculture have barely moved. Per-capita UK emissions remain above the global average, and the UK's consumption-based footprint — which includes embedded carbon in imported goods — is significantly higher than the territorial measure. The Climate Change Committee has consistently found the UK off track for its legally binding carbon budgets without more ambitious action on heat and transport.<Cite nums={4} /></p>
            <p>The state of nature tells a more troubling story. Only 16% of English rivers meet good ecological status under the Water Framework Directive<Cite nums={2} /> — and this figure has barely changed in a decade, partly as a result of methodological reclassification in 2015 that lowered the proportion in good status overnight. Sewage discharge, agricultural runoff, and abstraction are the primary causes. UK biodiversity indicators show a continued long-term decline<Cite nums={3} />: the UK is among the most nature-depleted countries in the world, having lost around half its biodiversity over two centuries. The 30×30 target — to protect 30% of land and sea for nature by 2030 — is government policy, but only around 10% of land is currently in good enough condition to count toward it.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Rivers' },
          { id: 'sec-chart2', label: 'Emissions' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Rivers in good ecological status"
              value="16%"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="Barely changed since 2009 · among worst in Europe"
              sparklineData={[27, 27, 28, 28, 17, 17, 16, 14, 14, 16]}
              source="Environment Agency · Water Framework Directive classification 2022"
              href="#sec-chart1"
            />
            <MetricCard
              label="Greenhouse gas emissions"
              value="384 MtCO2e"
              unit=""
              direction="down"
              polarity="down-is-bad"
              changeText="Down 35% since 2010 · but off track for carbon budgets"
              sparklineData={[590, 568, 527, 497, 466, 446, 411, 370, 417, 384]}
              source="DESNZ · UK Greenhouse Gas Inventory 2023"
              href="#sec-chart2"
            />
            <MetricCard
              label="Biodiversity index"
              value="69"
              unit="(2000=100)"
              direction="down"
              polarity="up-is-good"
              changeText="Falling for 20+ years · UK among most nature-depleted nations"
              sparklineData={[78, 77, 76, 75, 74, 73, 72, 71, 70, 69]}
              source="JNCC · Biodiversity indicators 2022"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Rivers in good ecological status, England, 2009–2022"
              subtitle="Percentage of water bodies classified as good or high ecological status under the Water Framework Directive. Reclassification in 2015 lowered the measured proportion."
              series={riverSeries}
              annotations={riverAnnotations}
              yLabel="% in good status"
              source={{ name: 'Environment Agency', dataset: 'Water Framework Directive classification', url: 'https://environment.data.gov.uk/catchment-planning/', frequency: 'annual', date: '2022' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="UK greenhouse gas emissions, 2010–2023"
              subtitle="Total UK territorial greenhouse gas emissions in million tonnes CO2 equivalent. Significant progress driven by coal phase-out; transport and heating remain stubbornly high."
              series={ghgSeries}
              annotations={ghgAnnotations}
              yLabel="MtCO2e"
              source={{ name: 'DESNZ', dataset: 'UK Greenhouse Gas Inventory', url: 'https://www.gov.uk/government/statistics/provisional-uk-greenhouse-gas-emissions-national-statistics', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="UK emissions fell 35% while economy grew 27%"
            value="35%"
            description="Since 2010, UK territorial greenhouse gas emissions have fallen by around 35% while GDP grew by approximately 27% — demonstrating that economic growth and decarbonisation can be decoupled. The UK has met or overperformed on its first three carbon budgets. The fourth carbon budget period (2023–2027) requires more ambitious action on transport and buildings. The government's £22 billion Green Investment Plan and new Great British Energy public company represent the largest climate investments in UK history. If current offshore wind build rates continue, UK electricity will be effectively decarbonised by the mid-2030s."
            source="Source: DESNZ — UK Greenhouse Gas Inventory 2023. Climate Change Committee — Progress Report to Parliament 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/statistics/provisional-uk-greenhouse-gas-emissions-national-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DESNZ — UK Greenhouse Gas Inventory</a> — annual provisional and final estimates of territorial emissions by sector.</p>
            <p><a href="https://environment.data.gov.uk/catchment-planning/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Environment Agency — Water Framework Directive classification</a> — ecological status of rivers, lakes, and coastal waters.</p>
            <p><a href="https://jncc.gov.uk/our-work/ukbi/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">JNCC — UK Biodiversity Indicators</a> — annual composite indicators of species abundance, habitat condition, and protected areas.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
