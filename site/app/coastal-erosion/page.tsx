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

// Coastal erosion rates — average recession (metres/year) across monitored English coastline, 2005–2024
const erosionRateValues = [0.23, 0.26, 0.24, 0.28, 0.31, 0.29, 0.33, 0.35, 0.32, 0.37, 0.39, 0.41, 0.38, 0.44, 0.46, 0.43, 0.49, 0.52, 0.55, 0.58];
// East Anglian coast — higher rates
const eastCoastValues = [0.82, 0.88, 0.85, 0.95, 1.02, 0.98, 1.10, 1.15, 1.08, 1.22, 1.30, 1.35, 1.28, 1.45, 1.52, 1.48, 1.62, 1.75, 1.85, 1.98];

// EA coastal defence spending (£M, real terms 2023 prices), 2010–2024
const spendingValues = [320, 335, 310, 295, 280, 270, 265, 290, 310, 335, 350, 380, 395, 410, 420];

const series1: Series[] = [
  {
    id: 'national-avg',
    label: 'England average (m/yr)',
    colour: '#F4A261',
    data: erosionRateValues.map((v, i) => ({ date: new Date(2005 + i, 0, 1), value: v })),
  },
  {
    id: 'east-coast',
    label: 'East Anglian coast (m/yr)',
    colour: '#E63946',
    data: eastCoastValues.map((v, i) => ({ date: new Date(2005 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'spending',
    label: 'EA coastal defence spending (£M)',
    colour: '#264653',
    data: spendingValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2013, 11, 1), label: '2013: East coast storm surge' },
  { date: new Date(2020, 0, 1), label: '2020: Revised Shoreline Management Plans' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'Environment Agency', dataset: 'National Coastal Erosion Risk Mapping', url: 'https://www.gov.uk/government/publications/national-coastal-erosion-risk-mapping', date: '2024' },
  { num: 2, name: 'Committee on Climate Change', dataset: 'Managing the coast in a changing climate', url: 'https://www.theccc.org.uk/publication/managing-the-coast-in-a-changing-climate/', date: '2023' },
  { num: 3, name: 'British Geological Survey', dataset: 'National Landslide Database — coastal recession', url: 'https://www.bgs.ac.uk/geology-projects/national-landslide-database/', date: '2024' },
];

export default function CoastalErosionPage() {
  return (
    <>
      <TopicNav topic="Coastal Erosion" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Coastal Erosion"
          question="Is Britain Actually Falling Into the Sea?"
          finding="Over 2,000 properties are at risk of coastal erosion by 2055. The East Anglian coast is losing up to 2 metres per year, and climate change is accelerating the rate. Managed retreat is increasingly necessary but remains politically toxic."
          colour="#F4A261"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England has approximately 3,700 km of coastline, and the Environment Agency estimates that around 28% of it is subject to erosion.<Cite nums={1} /> The problem is not uniform: while some sections are protected by hard defences or naturally resistant geology, the soft clay and sand cliffs of East Anglia, Holderness, and parts of the North East are retreating at rates of 1 to 2 metres per year.<Cite nums={3} /> The village of Happisburgh in Norfolk has become emblematic — over 35 homes have been lost since 1995, and the cliff edge now stands where back gardens were a decade ago. Nationally, the EA identifies more than 2,000 properties at risk of loss to erosion by 2055, and over 7,000 by 2105 under current trajectories.<Cite nums={1} /></p>
            <p>Climate change is compounding the problem. The Committee on Climate Change projects that sea level rise of 0.5 to 1.0 metres by 2100, combined with more frequent and intense storms, will accelerate erosion rates by 20–50% on vulnerable coastlines.<Cite nums={2} /> Shoreline Management Plans designate some stretches for "managed realignment" or "no active intervention" — effectively acknowledging that holding the line is neither affordable nor sustainable. Yet communities facing this reality receive little support: there is no statutory right to compensation for properties lost to erosion, and relocation assistance remains discretionary and limited. The EA has increased coastal defence spending in recent years, but the gap between what is needed and what is funded continues to widen, particularly for smaller communities that lack the economic case for major infrastructure.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Erosion rates' },
          { id: 'sec-chart2', label: 'Defence spending' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Properties at risk by 2055"
              value="2,000+"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="over 7,000 at risk by 2105 under current projections"
              sparklineData={[1200, 1350, 1500, 1650, 1800, 1900, 2000, 2100]}
              source="Environment Agency — NCERM 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Coastline eroding >1m/yr"
              value="113 km"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="up from 85 km in 2010 · concentrated on east coast"
              sparklineData={[85, 88, 91, 95, 98, 102, 106, 113]}
              source="BGS — Coastal erosion monitoring 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Annual EA coastal spending"
              value="£420M"
              unit="2024"
              direction="up"
              polarity="up-is-good"
              changeText="up from £270M in 2015 · but gap to need still widening"
              sparklineData={spendingValues.slice(-8)}
              source="Environment Agency — Annual report 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Coastal erosion rates, England, 2005–2024"
              subtitle="Average annual recession in metres. East Anglian coast (red) eroding at nearly four times the national average. Rates accelerating since 2015."
              series={series1}
              annotations={annotations}
              yLabel="Recession (m/yr)"
              source={{ name: 'Environment Agency / BGS', dataset: 'National Coastal Erosion Risk Mapping', url: 'https://www.gov.uk/government/publications/national-coastal-erosion-risk-mapping', frequency: 'annual', date: 'Sep 2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="EA coastal defence spending, England, 2010–2024"
              subtitle="Real-terms spending (2023 prices, £M). Spending has increased but the gap between need and funding continues to widen as erosion accelerates."
              series={series2}
              annotations={[{ date: new Date(2015, 0, 1), label: '2015: Spending lowest point' }]}
              yLabel="Spending (£M, real terms)"
              source={{ name: 'Environment Agency', dataset: 'Flood and coastal erosion risk management report', url: 'https://www.gov.uk/government/publications/flood-and-coastal-risk-management-national-report', frequency: 'annual', date: 'Jul 2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Medmerry managed realignment: a model for adaptation"
            value="183 ha"
            unit="of new intertidal habitat created"
            description="The Medmerry managed realignment scheme in West Sussex, completed in 2013, deliberately breached the old shingle bank to create 183 hectares of new intertidal habitat while providing improved flood and erosion protection for 348 properties. The scheme cost £28 million — less than maintaining the deteriorating defences would have over 25 years. It has since become a nationally important nature reserve and demonstrates that working with natural processes, rather than against them, can deliver better outcomes for both communities and ecosystems."
            source="Source: Environment Agency — Medmerry coastal scheme evaluation 2023."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/publications/national-coastal-erosion-risk-mapping" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Environment Agency — NCERM</a> — primary source for properties at risk and erosion rate projections. National-scale assessment updated periodically using LiDAR surveys and cliff recession monitoring.</p>
            <p><a href="https://www.theccc.org.uk/publication/managing-the-coast-in-a-changing-climate/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Committee on Climate Change</a> — projections for sea level rise impact on coastal erosion under various emissions scenarios.</p>
            <p><a href="https://www.bgs.ac.uk/geology-projects/national-landslide-database/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">British Geological Survey</a> — coastal recession monitoring data, including site-specific measurements from the National Landslide Database.</p>
            <p>All figures are for England unless otherwise stated. Erosion rates are averages across monitored sites and vary significantly by geology, exposure, and defence status.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
