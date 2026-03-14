'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Ministry of Defence', dataset: 'UK Defence Statistics', url: 'https://www.gov.uk/government/collections/uk-defence-statistics-compendium', date: '2024' },
  { num: 2, name: 'National Audit Office', dataset: 'Defence Equipment Plan', url: 'https://www.nao.org.uk/reports/ministry-of-defence-equipment-plan/', date: '2024' },
  { num: 3, name: 'House of Commons Defence Committee', dataset: 'Defence Capabilities Report', url: 'https://committees.parliament.uk/committee/24/defence-committee/publications/', date: '2024' },
];

interface DataPoint {
  year: number;
  defenceSpendingGdpPct: number;
  armedForcesPersonnel: number;
  equipmentReadiness: number;
  recruitmentShortfall: number;
}

interface TopicData {
  national: { timeSeries: DataPoint[] };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

export default function DefenceReadinessPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/defence-readiness/defence_readiness.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'defenceSpendingGdpPct', label: 'Defence spending (% GDP)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.defenceSpendingGdpPct })) },
        { id: 'armedForcesPersonnel', label: 'Serving personnel (thousands)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.armedForcesPersonnel })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'equipmentReadiness', label: 'Equipment at full readiness (%)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.equipmentReadiness })) },
        { id: 'recruitmentShortfall', label: 'Recruitment shortfall (%)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.recruitmentShortfall })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2022, 5, 1), label: 'Ukraine invasion; spending review' },
    { date: new Date(2024, 5, 1), label: '2.5% GDP target pledged' },
  ];

  return (
    <>
      <TopicNav topic="Public Services" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Public Services"
          question="Is the UK Military Ready for Modern Threats?"
          finding={<>UK defence spending has risen from 2.1% to around 2.3% of GDP since Russia&apos;s invasion of Ukraine, but the armed forces are smaller than at any point in modern history and face a recruitment shortfall of around 10%.<Cite nums={1} /> The National Audit Office has repeatedly found the equipment plan to be unaffordable.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK is a NATO member and the alliance&apos;s 2% of GDP spending target has been met — just — for most of the past decade, though how spending is counted has shifted over time. Since Russia&apos;s full-scale invasion of Ukraine in 2022, the government has committed to raising defence spending to 2.5% of GDP, a significant uplift that will take several years to materialise. But the starting point is a military that has shrunk considerably: the British Army now numbers around 74,000 regular personnel, down from over 100,000 in the early 2000s.<Cite nums={1} /></p>
            <p>Equipment readiness — the proportion of platforms available and at full capability — has been a persistent concern. The Defence Committee has raised questions about the readiness of armoured vehicles, submarine availability, and the pace of cyber and space capability development. Recruitment and retention present a different challenge: competition from the private sector, housing costs near bases, and concerns about service life quality have contributed to a shortfall of around 7,500 regular personnel.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Spending and size' },
          { id: 'sec-chart2', label: 'Readiness' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Defence spending (% GDP)" value="2.33" unit="%" direction="up" polarity="up-is-good" changeText={<>Target: 2.5% by 2030<Cite nums={1} /></>} sparklineData={[2.2, 2.1, 2.1, 2.0, 2.0, 2.1, 2.1, 2.2, 2.3, 2.33, 2.33]} href="#sec-chart1" />
          <MetricCard label="Regular personnel" value="148k" unit="" direction="down" polarity="up-is-good" changeText={<>Down from 195k in 2010<Cite nums={1} /></>} sparklineData={[195, 190, 182, 175, 168, 160, 155, 152, 150, 149, 148]} href="#sec-chart1" />
          <MetricCard label="Recruitment shortfall" value="10" unit="%" direction="up" polarity="up-is-bad" changeText={<>Army worst affected; Navy improving<Cite nums={3} /></>} sparklineData={[4, 5, 6, 7, 8, 9, 10, 11, 10, 10, 10]} href="#sec-chart2" />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart title="UK defence spending and armed forces size, 2010–2024" subtitle="Defence spending as % of GDP and regular serving personnel (thousands)" series={chart1Series} annotations={annotations} yLabel="% / thousands" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart title="Equipment readiness and recruitment shortfall, 2015–2024" subtitle="Platforms at full readiness (%) and recruitment shortfall (%)" series={chart2Series} annotations={[]} yLabel="%" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="AUKUS partnership" value="£3bn" unit="submarines" description={<>The AUKUS partnership commits the UK to co-developing nuclear-powered attack submarines with Australia and the US, with UK investment of around £3 billion in the SSN-AUKUS programme — though delivery extends to the 2040s.<Cite nums={3} /></>} source="Source: House of Commons Defence Committee, AUKUS report." />
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">{src.name} — {src.dataset}</a>
                <div className="text-xs text-wiah-mid">Updated {src.frequency}</div>
              </div>
            ))}
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Methodology</h3>
            <p>{data?.metadata.methodology}</p>
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Known issues</h3>
            <ul className="list-disc list-inside space-y-1">
              {data?.metadata.knownIssues.map((issue, i) => <li key={i}>{issue}</li>)}
            </ul>
          </div>
        </section>
        <References items={editorialRefs} />
      </main>
    </>
  );
}
