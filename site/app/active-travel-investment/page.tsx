'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Government active travel spend £m, 2015–2024 — DfT Walking and Cycling Statistics
const investmentValues = [148, 162, 175, 210, 541, 310, 238, 205, 198, 202];

// Annual cycling trips millions, 2015–2024
const cyclingTripsValues = [820, 845, 870, 890, 1100, 980, 990, 1010, 1020, 1040];

// Cyclist KSI: total and killed, 2015–2024
const ksiTotalValues = [4550, 4380, 4270, 4190, 3960, 4020, 3980, 3940, 3900, 3860];
const ksiKilledValues = [100, 102, 101, 99, 78, 84, 81, 79, 78, 76];

const series1: Series[] = [
  {
    id: 'investment',
    label: 'Government spend (£m)',
    colour: '#2A9D8F',
    data: investmentValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'ksi-total',
    label: 'Total KSI casualties',
    colour: '#E63946',
    data: ksiTotalValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'ksi-killed',
    label: 'Cyclists killed',
    colour: '#1A1A1A',
    data: ksiKilledValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: Emergency Active Travel Fund' },
  { date: new Date(2022, 0, 1), label: '2022: Active Travel England established' },
];

export default function ActiveTravelInvestmentPage() {
  return (
    <>
      <TopicNav topic="Infrastructure & Services" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Infrastructure & Services"
          question="Is Britain actually investing in cycling and walking?"
          finding="Active Travel England's budget sits at around £200m per year — a fraction of the £4bn Gear Change target. Cycling trips have grown 27% since 2015, largely because of the pandemic, not infrastructure. Cyclist deaths are falling, but serious injuries remain stubbornly high."
          colour="#2A9D8F"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>In July 2020, the UK government published Gear Change, its bold vision for cycling and walking. The ambition was transformative: half of all journeys in towns and cities to be walked or cycled by 2030, protected cycle lanes on every main road in city centres, and a new inspectorate — Active Travel England — to ensure local authorities built infrastructure to proper standards. The document explicitly cited the Netherlands and Denmark, where per-capita spending on cycling infrastructure runs at roughly ten times UK levels. The promise was to close that gap. Four years on, the gap has barely narrowed. At around £200m per year, total government spending amounts to roughly £3.50 per person — compared to £30–36 per person in the Netherlands.</p>
            <p>Cyclist safety remains a critical concern. While the number of cyclists killed on British roads has fallen from around 100 per year in the mid-2010s to 76 in 2024, serious injuries remain elevated, driven by increased cycling volumes on roads that remain fundamentally designed for motor vehicles. Protected cycle lanes, the proven solution, cover fewer than 200 km nationally. E-bike sales are the brightest spot, growing roughly 30% year-on-year since 2020 and extending the practical range and demographic reach of cycling — but without safe infrastructure, new riders face the same hostile road environment. Walking trips have quietly declined: the National Travel Survey shows a sustained drop from 252 stages per person per year in 2015 to 224 in 2024.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Investment' },
          { id: 'sec-chart2', label: 'Safety' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Active travel spend"
              value="£202m"
              unit="2024"
              direction="down"
              polarity="up-is-good"
              changeText="Down from £541m peak in 2020 · Target: £4bn cumulative"
              sparklineData={investmentValues}
              source="DfT · Walking and Cycling Statistics 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Cycling trips per year"
              value="1.04bn"
              unit="2024"
              direction="up"
              polarity="up-is-good"
              changeText="+27% since 2015 · pandemic spike in 2020 not fully sustained"
              sparklineData={cyclingTripsValues}
              source="DfT · National Travel Survey 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Cyclist KSI casualties"
              value="3,860"
              unit="2024"
              direction="down"
              polarity="up-is-bad"
              changeText="76 killed · serious injuries still elevated · falling slowly"
              sparklineData={ksiTotalValues}
              source="DfT · Reported Road Casualties STATS19 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Government active travel investment, England, 2015–2024"
              subtitle="Total central government capital and revenue spend on walking and cycling infrastructure (£m). Peak in 2020 reflects Emergency Active Travel Fund."
              series={series1}
              annotations={annotations}
              yLabel="£ millions"
              source={{ name: 'Department for Transport', dataset: 'Walking and Cycling Statistics', url: 'https://www.gov.uk/government/collections/walking-and-cycling-statistics', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Cyclist killed or seriously injured (KSI), Great Britain, 2015–2024"
              subtitle="Total KSI casualties (red) and cyclists killed (black). Deaths are falling; total serious injuries remain elevated as cycling volumes increase."
              series={series2}
              annotations={[]}
              yLabel="Casualties"
              source={{ name: 'Department for Transport', dataset: 'Reported Road Casualties Great Britain (STATS19)', url: 'https://www.gov.uk/government/collections/road-accidents-and-safety-statistics', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Active Travel England inspections driving better design"
            value="30%"
            unit="of schemes redesigned to higher standard"
            description="Active Travel England's scheme rating system is working. Since its establishment in 2022, ATE has reviewed over 200 local authority active travel schemes and required redesigns on roughly 30% — ensuring protected cycle lanes meet Dutch-standard design principles rather than painted gutters. E-bike sales have grown approximately 30% year-on-year since 2020, now accounting for 1 in 6 bikes sold in the UK, making cycling viable for older riders, those with disabilities, and people in hillier areas."
            source="Source: Active Travel England — Annual Report 2023/24. Bicycle Association — UK E-Bike Market Data 2024."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/walking-and-cycling-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Department for Transport — Walking and Cycling Statistics</a> — annual investment and trip volume data.</p>
            <p><a href="https://www.gov.uk/government/collections/road-accidents-and-safety-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Department for Transport — STATS19</a> — reported road casualties, killed or seriously injured (KSI) data.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
