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
  { num: 1, name: 'OHID', dataset: 'Adult substance misuse treatment statistics', url: 'https://www.gov.uk/government/collections/adult-substance-misuse-statistics', date: '2024' },
  { num: 2, name: 'Office for National Statistics', dataset: 'Deaths related to drug poisoning in England and Wales', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/deaths/bulletins/deathsrelatedtodrugpoisoninginenglandandwales/latest', date: '2024' },
  { num: 3, name: 'ACMD', dataset: 'Commissioning impact on drug treatment', url: 'https://www.gov.uk/government/publications/commissioning-impact-on-drug-treatment', date: '2023' },
];

interface DataPoint {
  year: number;
  waitingOver3WeeksThousands: number;
  totalInTreatmentThousands: number;
  drugDeathsEnglandWales: number;
  treatmentSpendBn: number;
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

export default function DrugTreatmentWaitingTimesPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/drug-treatment-waiting-times/drug_treatment_waiting_times.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'totalInTreatmentThousands', label: 'Adults in drug and alcohol treatment (000s)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.totalInTreatmentThousands })) },
        { id: 'waitingOver3WeeksThousands', label: 'Waiting over 3 weeks for structured treatment (000s)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.waitingOver3WeeksThousands })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'drugDeathsEnglandWales', label: 'Drug poisoning deaths in England and Wales', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.drugDeathsEnglandWales })) },
        { id: 'treatmentSpendBn', label: 'Adult drug treatment spending (£bn, real terms)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.treatmentSpendBn })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2013, 5, 1), label: 'Treatment funding cut' },
    { date: new Date(2022, 5, 1), label: '10-Year Drug Strategy investment' },
  ];

  return (
    <>
      <TopicNav topic="Health & Justice" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health & Justice"
          question="How Long Do People Wait for Drug Treatment?"
          finding={<>Drug poisoning deaths in England and Wales reached a record 4,907 in 2022 — up 60% in a decade — while drug treatment capacity was cut by 30% in real terms between 2013 and 2020, creating a system where demand far outstrips supply.<Cite nums={[1, 2]} /> A 10-Year Drug Strategy investment has begun to reverse the cuts, but waiting times remain concerning.<Cite nums={3} /></>}
          colour="#E63946"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England's drug treatment system — funded through local authority public health grants and commissioned by councils — was significantly cut from 2013 after central government reduced public health funding. The Office for Health Inequalities and Disparities' adult substance misuse statistics show that the number of adults in structured drug treatment fell from around 200,000 in 2013 to around 160,000 by 2020, while the number with heroin and crack cocaine dependency who were not in treatment remained high. The ACMD's 2022 report found that by some measures England had become the most difficult country in Europe to access drug treatment on demand.<Cite nums={[1, 3]} /></p>
            <p>The 2021 Dame Carol Black Review of Drugs and the subsequent 10-Year Drug Strategy committed £780 million over three years to rebuild treatment capacity. OHID data shows numbers in treatment have begun to recover, reaching around 280,000 in 2022/23. But drug deaths continued to rise even as investment increased — reflecting the long lag between entering treatment and sustained recovery, and the increasing toxicity of the illicit drug supply with fentanyl and other synthetic opioids becoming more prevalent. Scotland, where drug deaths are proportionally even higher, has led the way in piloting drug consumption rooms and naloxone distribution.<Cite nums={2} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-treatment', label: 'Treatment capacity' },
          { id: 'sec-deaths', label: 'Drug deaths & investment' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Drug poisoning deaths (2022)" value="4,907" unit="" direction="up" polarity="up-is-bad" changeText={<>Record high — up 60% in a decade<Cite nums={2} /></>} sparklineData={[3000, 3100, 3200, 3300, 3400, 3500, 3700, 3900, 4100, 4500, 4907]} href="#sec-deaths" />
          <MetricCard label="Adults in drug treatment (2022/23)" value="280,000" unit="" direction="up" polarity="up-is-good" changeText={<>Recovering after decade of cuts<Cite nums={1} /></>} sparklineData={[200, 195, 185, 175, 168, 162, 158, 160, 165, 245, 280]} href="#sec-treatment" />
          <MetricCard label="Treatment funding cut (2013–2020)" value="-30%" unit="real terms" direction="down" polarity="up-is-good" changeText={<>Since reversed by new investment<Cite nums={3} /></>} sparklineData={[100, 95, 90, 85, 82, 80, 78, 76, 75, 80, 90]} href="#sec-deaths" />
        </div>

        <ScrollReveal>
          <section id="sec-treatment" className="mb-12">
            <LineChart title="Adults in drug treatment and those waiting over 3 weeks, England, 2010–2023" subtitle="Total in structured treatment (000s); those waiting over 3 weeks for treatment (000s)." series={chart1Series} annotations={annotations} yLabel="Thousands" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-deaths" className="mb-12">
            <LineChart title="Drug poisoning deaths and treatment investment, England & Wales, 2010–2022" subtitle="Annual drug poisoning deaths; adult drug treatment spending in £bn (real terms)." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Naloxone availability" value="2024" unit="expanded" description={<>From 2024, naloxone (which reverses opioid overdose) can be supplied by anyone in England who believes a person may be at risk — removing the previous prescription requirement and allowing friends, family and rough sleeping services to carry it.<Cite nums={1} /></>} source="Source: OHID / DHSC naloxone regulations 2024." />
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
