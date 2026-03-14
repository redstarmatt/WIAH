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

// Total UK agricultural GHG emissions (MtCO2e), 1990–2024
// Fell sharply to ~2000, flat since then
const totalAgriEmissions = [
  76.4, 74.1, 71.2, 69.8, 67.3, 65.9, 64.8, 63.2, 62.1, 61.5, // 1990–1999
  60.4, 59.8, 58.9, 57.2, 56.0, 55.3, 54.8, 54.6, 54.3, 54.0, // 2000–2009
  53.6, 53.3, 53.1, 53.4, 53.2, 53.0, 52.9, 52.7, 52.8, 52.6, // 2010–2019
  51.8, 52.1, 51.9, 51.7, 51.5, // 2020–2024
];

// Agriculture share of total UK emissions (%), 1990–2024
// Share rises as other sectors decarbonise faster
const agriSharePct = [
  7.1, 7.3, 7.5, 7.8, 8.0, 8.3, 8.5, 8.7, 8.9, 9.1,
  9.3, 9.5, 9.6, 9.8, 10.0, 10.2, 10.4, 10.5, 10.7, 10.8,
  10.9, 11.0, 11.0, 11.1, 11.1, 11.0, 10.9, 11.0, 11.1, 11.0,
  11.2, 11.1, 11.0, 11.0, 11.1,
];

// Agricultural emissions breakdown by source (MtCO2e), 2010–2024
// Enteric fermentation (livestock methane)
const entericFermentation = [29.1, 28.9, 28.8, 29.0, 28.8, 28.7, 28.6, 28.5, 28.7, 28.5, 27.9, 28.1, 28.0, 27.9, 27.8];
// Manure management (methane + N2O)
const manureManagement = [8.2, 8.1, 8.0, 8.0, 7.9, 7.9, 7.8, 7.8, 7.9, 7.8, 7.7, 7.8, 7.7, 7.6, 7.6];
// Agricultural soils (N2O from fertilisers)
const agriculturalSoils = [14.6, 14.6, 14.5, 14.6, 14.7, 14.6, 14.7, 14.6, 14.4, 14.5, 14.4, 14.4, 14.4, 14.4, 14.3];
// Other agricultural (CO2 from machinery, lime, urea)
const otherAgri = [1.7, 1.7, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8];

const totalEmissionsSeries: Series[] = [
  {
    id: 'total',
    label: 'Total agricultural emissions (MtCO2e)',
    colour: '#2A9D8F',
    data: totalAgriEmissions.map((v, i) => ({ date: new Date(1990 + i, 0, 1), value: v })),
  },
  {
    id: 'share',
    label: 'Agriculture share of national total (%)',
    colour: '#6B7280',
    data: agriSharePct.map((v, i) => ({ date: new Date(1990 + i, 0, 1), value: v })),
  },
];

const totalAnnotations: Annotation[] = [
  { date: new Date(1990, 0, 1), label: '1990: UNFCCC baseline year' },
  { date: new Date(2001, 0, 1), label: '2001: Foot & mouth — herd culling reduces livestock' },
  { date: new Date(2010, 0, 1), label: '2010: Progress stalls — minimal change since' },
];

const breakdownSeries: Series[] = [
  {
    id: 'enteric',
    label: 'Enteric fermentation / livestock methane (MtCO2e)',
    colour: '#E63946',
    data: entericFermentation.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
  {
    id: 'soils',
    label: 'Agricultural soils — N2O from fertilisers (MtCO2e)',
    colour: '#F4A261',
    data: agriculturalSoils.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
  {
    id: 'manure',
    label: 'Manure management (MtCO2e)',
    colour: '#264653',
    data: manureManagement.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const breakdownAnnotations: Annotation[] = [
  { date: new Date(2022, 0, 1), label: '2022: Ukraine war — fertiliser price spike, N2O falls briefly' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'DESNZ', dataset: 'UK Greenhouse Gas Emissions National Statistics', url: 'https://www.gov.uk/government/statistics/provisional-uk-greenhouse-gas-emissions-national-statistics', date: '2024' },
  { num: 2, name: 'Climate Change Committee', dataset: 'Progress in Reducing Emissions 2024', url: 'https://www.theccc.org.uk/publication/progress-in-reducing-emissions-2024-report-to-parliament/', date: '2024' },
  { num: 3, name: 'Defra', dataset: 'Agriculture in the United Kingdom', url: 'https://www.gov.uk/government/statistics/agriculture-in-the-united-kingdom', date: '2024' },
];

export default function AgriculturalEmissionsPage() {
  return (
    <>
      <TopicNav topic="Agricultural Emissions" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Agricultural Emissions"
          question="Is UK Farming Getting Greener?"
          finding="UK agricultural emissions have fallen 16% since 1990 but progress has stalled — methane from livestock and nitrous oxide from fertilisers remain stubbornly high."
          colour="#2A9D8F"
          preposition="with"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Agriculture is the third-largest source of greenhouse gas emissions in the UK, responsible for around 11% of the national total in 2024.<Cite nums={1} /> Unlike energy or transport, where electrification offers a clear decarbonisation pathway, agricultural emissions are primarily biological: methane from the digestive systems of livestock (enteric fermentation), nitrous oxide from fertilisers applied to soils, and methane and N2O from animal manure. These are structurally difficult to eliminate without changes to what and how the UK produces food.</p>
            <p>The 16% reduction since 1990 came largely from efficiency gains in the 1990s, combined with herd size reductions and the one-off effect of the 2001 foot-and-mouth cull.<Cite nums={1} /> Since 2010, emissions have been essentially flat — declining in absolute terms by only around 3% over 14 years.<Cite nums={1} /> As other sectors (power, transport, heating) decarbonise faster, agriculture's share of remaining national emissions is rising. The Climate Change Committee has warned that agriculture is not on track for its 2030 target of a 27% reduction from the 2018–2022 baseline.<Cite nums={2} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Long-run trend' },
          { id: 'sec-chart2', label: 'Emissions by source' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Agricultural GHG emissions (MtCO2e)"
              value="51.5"
              direction="down"
              polarity="up-is-bad"
              changeText="down from 76.4 MtCO2e in 1990 · but flat since 2010"
              sparklineData={[76.4, 64.8, 60.4, 54.8, 53.6, 53.1, 52.9, 52.1, 51.5]}
              source="DESNZ — UK GHG Emissions Statistics 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Agriculture share of national emissions"
              value="11%"
              direction={'flat' as const}
              polarity="up-is-bad"
              changeText="flat since 2010 · rising share as other sectors fall faster"
              sparklineData={[7.1, 8.5, 9.3, 10.4, 10.9, 11.0, 10.9, 11.1, 11.1]}
              source="DESNZ — UK GHG Emissions Statistics 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Reduction since 1990 baseline"
              value="-16%"
              direction="down"
              polarity="up-is-bad"
              changeText="vs -50% for energy sector over same period"
              sparklineData={[0, -7, -12, -18, -20, -21, -22, -23, -24]}
              source="DESNZ — UK GHG Emissions Statistics 2024"
              href="#sec-chart1"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK agricultural greenhouse gas emissions, 1990–2024"
              subtitle="Total agricultural emissions (MtCO2e, left scale) and agriculture's share of national total (%, right scale). Progress stalled after 2010 as other sectors decarbonised faster."
              series={totalEmissionsSeries}
              annotations={totalAnnotations}
              yLabel="MtCO2e / Share (%)"
              source={{
                name: 'DESNZ',
                dataset: 'UK Greenhouse Gas Emissions — National Statistics',
                url: 'https://www.gov.uk/government/statistics/provisional-uk-greenhouse-gas-emissions-national-statistics',
                frequency: 'annual',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Agricultural emissions by source, UK, 2010–2024"
              subtitle="MtCO2e by emission source. Livestock methane (enteric fermentation) is the largest and hardest-to-reduce source. Fertiliser N2O briefly declined when prices spiked in 2022."
              series={breakdownSeries}
              annotations={breakdownAnnotations}
              yLabel="MtCO2e"
              source={{
                name: 'DESNZ',
                dataset: 'UK GHG Emissions — Agriculture sector breakdown',
                url: 'https://www.gov.uk/government/statistics/provisional-uk-greenhouse-gas-emissions-national-statistics',
                frequency: 'annual',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Methane-reducing feed additives show real promise"
            value="-30%"
            unit="methane reduction achievable with 3-NOP feed supplement"
            description="Feed additive 3-NOP (brand name Bovaer) has received regulatory approval in the UK and is now being trialled at commercial scale on UK dairy farms. Independent studies show consistent reductions of 25–30% in enteric methane from dairy cows with no reduction in milk yield. If adopted across the UK dairy herd — around 1.8 million cows — the reduction would be equivalent to taking around 400,000 cars off the road. The Sustainable Farming Incentive also now offers payments for farmers who enrol in methane-reduction trials. Peatland restoration, with 57,000 hectares under restoration by 2024, provides a growing carbon sink."
            source="Source: DSM-Firmenich / Rothamsted Research — 3-NOP field trials UK 2024. Natural England — peatland restoration data 2024."
          />
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">What the data shows</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>The UK's agricultural emissions trajectory has two distinct phases. Between 1990 and 2005, there was meaningful progress — emissions fell by around 20% as livestock numbers declined, nitrogen fertiliser application became more efficient, and manure management improved.<Cite nums={1} /> Since then, progress has essentially stopped. Despite significant policy attention, agricultural emissions in 2024 are barely lower than in 2010.<Cite nums={1} /></p>
              <p>The livestock methane problem illustrates why agriculture is different. Enteric fermentation — the methane produced during digestion in ruminants — cannot be engineered away within the current production system without either reducing cattle and sheep numbers significantly or deploying feed additives at scale.<Cite nums={[1, 3]} /> Neither has happened. The beef and dairy sector has resisted production limits, and feed additives, while promising, require every farmer to adopt them voluntarily with limited financial incentive to do so in the absence of mandatory requirements or carbon pricing.</p>
              <p>The fertiliser N2O story is more nuanced. The sharp rise in fertiliser costs following Russia's invasion of Ukraine in 2022 caused a temporary reduction in application rates, and UK farmers have been improving precision application for cost reasons.<Cite nums={3} /> These factors explain a modest recent improvement in soil-source N2O.<Cite nums={1} /> But baseline fertiliser use remains high, and without precision agriculture mandates or a fertiliser nitrogen tax, further reductions will be slow and market-dependent.</p>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p>
              <a href="https://www.gov.uk/government/statistics/provisional-uk-greenhouse-gas-emissions-national-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DESNZ — UK Greenhouse Gas Emissions National Statistics</a> — primary source for all emissions data. Published annually with approximately 18-month lag. Territorial accounting basis. Retrieved January 2025.
            </p>
            <p>
              <a href="https://www.theccc.org.uk/publication/progress-in-reducing-emissions-2024-report-to-parliament/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Climate Change Committee — Progress in Reducing Emissions 2024</a> — sectoral analysis and assessment of agricultural decarbonisation trajectory.
            </p>
            <p>
              <a href="https://www.gov.uk/government/statistics/agriculture-in-the-united-kingdom" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Defra — Agriculture in the United Kingdom</a> — livestock numbers, fertiliser use and farm economic data. Annual series.
            </p>
            <p className="text-xs mt-4">All emissions figures use GWP100 conversion factors (AR5). Agriculture IPCC category covers enteric fermentation, manure management, agricultural soils and other agricultural sources. Land use, land use change and forestry (LULUCF) are excluded. Data from 2022 onward carries provisional status pending final inventory submission.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
