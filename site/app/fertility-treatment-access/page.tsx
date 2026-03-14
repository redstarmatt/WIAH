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
  { num: 1, name: 'HFEA', dataset: 'Fertility Treatment: Trends and Figures', url: 'https://www.hfea.gov.uk/about-us/publications/research-and-data/', date: '2024' },
  { num: 2, name: 'Fertility Network UK', dataset: 'IVF Postcode Lottery Survey', url: 'https://fertilitynetworkuk.org/about-us/policy/', date: '2023' },
  { num: 3, name: 'NHS England', dataset: 'Clinical Commissioning Policies: IVF', url: 'https://www.england.nhs.uk/commissioning/spec-services/npc-crg/blood-and-infection-group-f/f04/', date: '2023' },
];

interface DataPoint {
  year: number;
  ivfCycles: number;
  nhsFundedShare: number;
  successRate: number;
  avgAgeTreatment: number;
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

export default function FertilityTreatmentAccessPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/fertility-treatment-access/fertility_treatment_access.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'ivfCycles', label: 'Total IVF cycles (thousands/yr)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.ivfCycles })) },
        { id: 'nhsFundedShare', label: 'NHS-funded IVF cycles (%)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.nhsFundedShare })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'successRate', label: 'Live birth rate per IVF cycle (%)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.successRate })) },
        { id: 'avgAgeTreatment', label: 'Average age at IVF treatment (years)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.avgAgeTreatment })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2013, 5, 1), label: 'NICE: 3 NHS cycles recommended' },
    { date: new Date(2020, 5, 1), label: 'Covid-19: IVF services suspended' },
  ];

  return (
    <>
      <TopicNav topic="Health" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health"
          question="Is NHS Fertility Treatment Available Equally?"
          finding={<>NHS funding for IVF varies dramatically by postcode: some ICBs offer three full cycles as recommended by NICE, while others offer none at all, creating a stark fertility postcode lottery that affects tens of thousands of people each year.<Cite nums={1} /> Only around 38% of IVF cycles in the UK are now NHS-funded, down from over 50% a decade ago.<Cite nums={[2, 3]} /></>}
          colour="#E63946"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Around 68,000 IVF cycles are performed in the UK each year, with the Human Fertilisation and Embryology Authority reporting steady growth in treatment numbers.<Cite nums={1} /> NICE guidelines have recommended since 2013 that eligible women under 40 should receive three full cycles of IVF on the NHS. However, commissioning decisions are made locally, and Fertility Network UK surveys consistently find that fewer than half of ICBs fully comply with this guidance. Some areas have restricted funding to one cycle, applied stricter eligibility criteria based on BMI or relationship status, or suspended NHS IVF funding altogether during budget pressures.</p>
            <p>The share of IVF cycles that are NHS-funded has declined from around 52% in 2012 to approximately 38% in 2023, meaning most patients now self-fund treatment that can cost £3,000–£5,000 per cycle.<Cite nums={2} /> This concentrates fertility treatment among those who can afford it, with analysis suggesting IVF uptake is significantly lower in areas of socioeconomic deprivation. The average age of women undergoing IVF has also risen — partly reflecting women seeking treatment later, and partly the difficulty of accessing NHS-funded cycles within optimal fertility windows.<Cite nums={3} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-funding', label: 'NHS funding' },
          { id: 'sec-outcomes', label: 'Outcomes' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="NHS-funded IVF share" value="38" unit="%" direction="down" polarity="down-is-bad" changeText={<>Down from 52% in 2012<Cite nums={1} /></>} sparklineData={[52, 51, 50, 48, 46, 44, 43, 42, 40, 39, 38]} href="#sec-funding" />
          <MetricCard label="ICBs offering full 3 NHS cycles" value="~30" unit="%" direction="down" polarity="down-is-bad" changeText={<>Majority do not meet NICE guidance<Cite nums={2} /></>} sparklineData={[55, 52, 48, 44, 42, 40, 38, 35, 33, 31, 30]} href="#sec-funding" />
          <MetricCard label="IVF live birth rate" value="23" unit="% per cycle" direction="flat" polarity="up-is-good" changeText={<>Little change since 2015<Cite nums={1} /></>} sparklineData={[21, 21, 22, 22, 23, 22, 23, 23, 23, 23, 23]} href="#sec-outcomes" />
        </div>

        <ScrollReveal>
          <section id="sec-funding" className="mb-12">
            <LineChart title="IVF cycles and NHS funding share, 2010–2024" subtitle="Total IVF cycles (thousands) and NHS-funded share (%), UK." series={chart1Series} annotations={annotations} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-outcomes" className="mb-12">
            <LineChart title="IVF success rates and average treatment age, 2010–2024" subtitle="Live birth rate per cycle (%) and average age at treatment, UK." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="NICE recommendation" value="3 cycles" unit="for eligible women" description={<>NICE recommends three full cycles of IVF for eligible women under 40. Full compliance across all NHS commissioners would bring tens of thousands more people within reach of funded fertility treatment each year.<Cite nums={3} /></>} source="Source: NICE, Fertility Problems Guideline CG156, updated 2023." />
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
