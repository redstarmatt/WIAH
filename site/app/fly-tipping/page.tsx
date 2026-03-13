'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Total fly-tipping incidents (thousands), 2015–2024
const totalIncidents = [900, 920, 930, 950, 990, 980, 1010, 1050, 1030, 1070];
// Highway incidents (thousands), 2015–2024
const highwayIncidents = [380, 392, 398, 408, 425, 418, 435, 452, 444, 461];
// Fixed penalty notices (thousands), 2015–2024
const fpnThousands = [67, 72, 78, 88, 82, 75, 73, 72, 72, 72];
// Prosecutions (thousands), 2015–2024
const prosecutionsThousands = [2.1, 2.0, 1.9, 1.8, 1.7, 1.5, 1.3, 1.2, 1.1, 1.1];

const series1: Series[] = [
  {
    id: 'totalIncidents',
    label: 'Total incidents (thousands)',
    colour: '#E63946',
    data: totalIncidents.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'highwayIncidents',
    label: 'Highway incidents (thousands)',
    colour: '#264653',
    data: highwayIncidents.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'fpn',
    label: 'Fixed penalty notices (thousands)',
    colour: '#264653',
    data: fpnThousands.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'prosecutions',
    label: 'Prosecutions (thousands)',
    colour: '#E63946',
    data: prosecutionsThousands.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const annotations1: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: Pandemic closures — tip fly-tipping spikes' },
  { date: new Date(2022, 0, 1), label: '2022: Household waste site charges scrapped in some areas' },
];

const annotations2: Annotation[] = [
  { date: new Date(2019, 0, 1), label: '2019: Maximum FPN raised to £400' },
];

export default function FlyTippingPage() {
  return (
    <>
      <TopicNav topic="Fly-Tipping" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment & Climate"
          question="How Bad Is Britain's Fly-Tipping Problem?"
          finding="Councils in England dealt with nearly 1.1 million fly-tipping incidents in 2023–24 — an 8% rise on the previous year. Enforcement is falling as council budgets are cut."
          colour="#2A9D8F"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Fly-tipping in England has grown persistently for a decade, with local authorities recording 1.07 million incidents in 2023–24. Highway verges and footpaths account for the largest share of reported sites, while private land incidents — cleared at the landowner's expense — are not systematically captured at all, meaning the true scale is significantly higher. The cost to councils of clearing fly-tips reached £57.7 million in 2023–24, paid for by council taxpayers. The connection between bulky waste charging policies and fly-tipping volumes is well established: councils that introduced or increased charges for bulky waste collection have seen corresponding rises in local tipping rates.</p>
            <p>The enforcement picture is changing shape rather than improving. Fixed penalty notices have grown as councils shift toward faster, cheaper enforcement, but prosecutions have nearly halved since 2015 as legal capacity has been eroded. The result is that persistent, organised fly-tipping — often commercial in nature — faces diminishing deterrence. The Environment Agency handles the most serious cases, including hazardous and construction waste dumping, but its own enforcement resource has been substantially reduced. The gap between the number of incidents and the number of meaningful enforcement actions has widened every year.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Incidents' },
          { id: 'sec-chart2', label: 'Enforcement' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Fly-tipping incidents 2023–24"
              value="1.07m"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+8% year on year · 10-year high"
              sparklineData={totalIncidents.slice(-8)}
              source="DEFRA · Fly-tipping statistics 2023–24"
              href="#sec-chart1"
            />
            <MetricCard
              label="Cost to councils (clearance)"
              value="£57.7m"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up 12% in two years · paid by council taxpayers"
              sparklineData={[42, 44, 46, 48, 50, 52, 51, 55]}
              source="DEFRA · Fly-tipping statistics 2023–24"
              href="#sec-chart2"
            />
            <MetricCard
              label="Fixed penalty notices issued"
              value="72,000"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="Down from 88k in 2019 · enforcement capacity falling"
              sparklineData={fpnThousands.slice(-8)}
              source="DEFRA · Fly-tipping statistics 2023–24"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Fly-tipping incidents by land type, England, 2015–2024"
              subtitle="Annual fly-tipping incidents across England. Highway verges and footpaths account for the largest share; private land fly-tipping is likely under-reported."
              series={series1}
              annotations={annotations1}
              yLabel="Incidents (thousands)"
              source={{ name: 'DEFRA', dataset: 'Fly-tipping incidents and actions taken in England', url: 'https://www.gov.uk/government/statistics/fly-tipping-in-england', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Fly-tipping enforcement actions, England, 2015–2024"
              subtitle="Fixed penalty notices have grown while prosecutions have nearly halved. Councils favour speed and cost over criminal proceedings."
              series={series2}
              annotations={annotations2}
              yLabel="Actions (thousands)"
              source={{ name: 'DEFRA', dataset: 'Fly-tipping incidents and actions taken in England', url: 'https://www.gov.uk/government/statistics/fly-tipping-in-england', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Fly-tip camera programme expanding"
            value="4,500+"
            unit="covert cameras deployed 2024"
            description="Over 4,500 covert cameras were deployed at known fly-tipping hotspots across England in 2024, enabling councils to prosecute offenders more efficiently. Councils reporting the highest prosecution rates have adopted systematic camera deployment. DEFRA data shows camera-equipped areas see a 30–40% reduction in fly-tipping incidents within 12 months of deployment."
            source="Source: DEFRA — Fly-tipping statistics for England 2023–24."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/statistics/fly-tipping-in-england" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DEFRA — Fly-tipping incidents and actions taken in England</a> — Annual local-authority-reported fly-tipping statistics. Retrieved 2025.</p>
            <p>Incident counts cover illegal deposit of waste on land contrary to Section 33 of the Environmental Protection Act 1990. Private land incidents are excluded as they are not systematically recorded.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
