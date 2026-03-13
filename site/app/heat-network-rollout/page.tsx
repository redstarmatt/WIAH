'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'DESNZ', dataset: 'Heat Networks in Great Britain', url: 'https://www.gov.uk/government/statistics/heat-networks-in-great-britain', date: 'Dec 2024' },
  { num: 2, name: 'CCC', dataset: 'Sixth Carbon Budget — Heat Networks', url: 'https://www.theccc.org.uk/publication/sixth-carbon-budget/', date: '2020' },
  { num: 3, name: 'DESNZ', dataset: 'Heat Network Efficiency Study', url: 'https://www.gov.uk/government/publications/heat-network-efficiency-scheme', date: '2024' },
  { num: 4, name: 'UK Parliament', dataset: 'Heat Network (Regulation) Act 2023', url: 'https://www.legislation.gov.uk/ukpga/2023/36', date: '2023' },
  { num: 5, name: 'DESNZ', dataset: 'Heat Network Zoning Consultation', url: 'https://www.gov.uk/government/consultations/heat-network-zoning', date: '2024' },
];

export default function HeatNetworkRolloutPage() {
  // Homes connected to heat networks 2012–2024 (thousands)
  const homesConnectedData = [140, 155, 175, 200, 225, 260, 300, 350, 380, 400, 430, 460, 480];
  // Target trajectory 2012–2024 (based on path to 2050 target of 20% market share ~5.5m homes)
  const targetData = [140, 160, 195, 230, 270, 320, 380, 440, 520, 600, 710, 840, 990];

  // Market share % (actual vs target) 2020–2030
  const actualShareData = [2.2, 2.3, 2.4, 2.6, 2.8];
  const targetShareData = [2.5, 3.5, 5.0, 7.0, 10.0];

  const chart1Series: Series[] = [
    {
      id: 'actual',
      label: 'Homes connected (thousands)',
      colour: '#F4A261',
      data: homesConnectedData.map((v, i) => ({ date: new Date(2012 + i, 0, 1), value: v })),
    },
    {
      id: 'target',
      label: 'Required trajectory to 2050 target',
      colour: '#6B7280',
      data: targetData.map((v, i) => ({ date: new Date(2012 + i, 0, 1), value: v })),
    },
  ];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2018, 0, 1), label: '2018: Heat Network Investment Project launched' },
    { date: new Date(2023, 0, 1), label: '2023: Heat Network (Regulation) Act' },
  ];

  const chart2Series: Series[] = [
    {
      id: 'actualShare',
      label: 'Actual market share (%)',
      colour: '#F4A261',
      data: actualShareData.map((v, i) => ({ date: new Date(2020 + i, 0, 1), value: v })),
    },
    {
      id: 'targetShare',
      label: 'Required trajectory to 20% by 2050',
      colour: '#6B7280',
      data: targetShareData.map((v, i) => ({ date: new Date(2020 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="Heat Network Rollout" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Heat Network Rollout"
          question="Is Britain Building a Heat Network?"
          finding="Heat networks currently supply only 2% of UK heat demand — the government target is 20% by 2050, requiring a 10-fold expansion that is severely behind schedule."
          colour="#F4A261"
          preposition="on"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-charts', label: 'Charts' },
          { id: 'sec-context', label: 'Context' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Heat network coverage (% of UK heat demand)"
              value="2.8%"
              direction="up"
              polarity="up-is-good"
              changeText="+1.1pp since 2012 · target 20% by 2050"
              sparklineData={[1.2, 1.3, 1.4, 1.7, 1.9, 2.0, 2.1, 2.2, 2.3, 2.5, 2.6, 2.7, 2.8]}
              source="DESNZ · Heat Networks in GB 2024"
              href="#sec-charts"
            />
            <MetricCard
              label="Homes connected (thousands)"
              value="480"
              direction="up"
              polarity="up-is-good"
              changeText="+280k since 2012 · but 990k needed by 2024 on trajectory"
              sparklineData={[140, 155, 175, 200, 225, 260, 300, 350, 380, 400, 430, 460, 480]}
              source="DESNZ · Heat Networks in GB 2024"
              href="#sec-charts"
            />
            <MetricCard
              label="Networks emitting more than gas boilers"
              value="35%"
              direction="down"
              polarity="up-is-bad"
              changeText="35% of networks dirtier than condensing boilers · improving slowly"
              sparklineData={[42, 41, 40, 39, 38, 37, 36, 35, 34]}
              source="DESNZ · Heat Network Efficiency Study 2024"
              href="#sec-charts"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-charts" className="mb-12">
            <LineChart
              title="UK heat network homes connected, 2012–2024 (thousands)"
              subtitle="Cumulative homes receiving heat from heat networks vs trajectory required to reach 2050 target."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Homes connected (thousands)"
              source={{
                name: 'DESNZ',
                dataset: 'Heat Networks in Great Britain',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/heat-networks-in-great-britain',
                date: 'Dec 2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Heat network market share vs required trajectory, 2020–2024 (%)"
              subtitle="Actual heat network share of UK heat demand vs the trajectory needed to reach 20% by 2050."
              series={chart2Series}
              targetLine={{ value: 20, label: 'Target: 20% by 2050' }}
              yLabel="Market share (%)"
              source={{
                name: 'DESNZ',
                dataset: 'Heat Networks in Great Britain',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/heat-networks-in-great-britain',
                date: 'Dec 2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-context" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on heat network rollout</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Heat networks — systems that distribute heat from a central source through insulated pipes to multiple buildings — currently supply 2.8% of UK heat demand across approximately 16,000 networks serving 480,000 homes.<Cite nums={1} /> The Climate Change Committee's Sixth Carbon Budget requires that share to grow to around 20% by 2050, prioritising dense urban areas where building density makes individual heat pumps less economical.<Cite nums={2} /> To reach even 10% by 2035 would require connecting several million additional homes. At the current rate of growth, the 2050 target is not reachable.<Cite nums={1} /></p>
              <p>The quality of the existing estate is highly variable: a DESNZ efficiency study found 35% of heat networks had a higher carbon intensity than modern condensing gas boilers, typically because they are connected to gas combined heat and power plant rather than low-carbon sources.<Cite nums={3} /> The Heat Network (Regulation) Act 2023 established a new Ofgem-overseen regime, requiring all networks to register and meet minimum performance standards — a significant consumer protection step, as heat network customers previously had fewer protections than gas or electricity customers.<Cite nums={4} /></p>
              <p>The economics of expansion remain challenging. Distribution infrastructure in urban settings costs £1–3 million per kilometre before any revenue, and the merchant risk of building ahead of connections deters private investment.<Cite nums={1} /> The government's Heat Network Zoning framework, advanced in 2024–25, would designate areas where heat networks are the preferred heating solution, creating market certainty for investors.<Cite nums={5} /> Until that framework is in place, local authorities — the critical enabling actors — face prohibitive uncertainty in committing to multi-decade infrastructure programmes.</p>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p><a href="https://www.gov.uk/government/statistics/heat-networks-in-great-britain" className="text-wiah-blue hover:underline" target="_blank" rel="noopener noreferrer">DESNZ — Heat Networks in Great Britain</a>. Annual statistics on heat network connections and market share. Data collected via industry survey; smaller networks may be under-represented.</p>
            <p><a href="https://www.gov.uk/government/publications/heat-network-efficiency-scheme" className="text-wiah-blue hover:underline" target="_blank" rel="noopener noreferrer">DESNZ — Heat Network Efficiency Study</a>. Carbon intensity figures based on periodic surveys of network operators, not continuous monitoring. 35% high-emission figure from 2021 survey.</p>
            <p>Heat Network (Regulation) Act 2023. Ofgem regulatory framework in force from 2024–25. Market share calculated as percentage of total final energy consumption for heating and hot water. Target trajectory from CCC Sixth Carbon Budget and Heat Network Zoning consultation.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
