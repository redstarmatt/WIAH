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
  { num: 1, name: 'ONS', dataset: 'Births in England and Wales', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/livebirths/bulletins/birthsummarytablesenglandandwales/latest', date: '2024' },
  { num: 2, name: 'ONS', dataset: 'Total Fertility Rate', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/conceptionandfertilityrates/bulletins/totalfertilityratefortheukanditsconstituents/latest', date: '2024' },
  { num: 3, name: 'Resolution Foundation', dataset: 'Baby Bust — why is the birth rate falling?', url: 'https://www.resolutionfoundation.org/publications/baby-bust/', date: '2024' },
];

interface DataPoint {
  year: number;
  totalFertilityRate: number;
  liveBirths: number;
  meanAgeAtChildbirth: number;
  childlessnessRate: number;
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

export default function BirthRateTrendsPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/birth-rate-trends/birth_rate_trends.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'totalFertilityRate', label: 'Total fertility rate', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.totalFertilityRate })) },
        { id: 'liveBirths', label: 'Live births (thousands)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.liveBirths })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'meanAgeAtChildbirth', label: 'Mean age at childbirth', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.meanAgeAtChildbirth })) },
        { id: 'childlessnessRate', label: 'Childlessness at 30 (%)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.childlessnessRate })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2012, 5, 1), label: 'Post-recession baby boom ends' },
    { date: new Date(2020, 5, 1), label: 'Covid accelerates decline' },
  ];

  return (
    <>
      <TopicNav topic="Society" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Society"
          question="Is the UK Birth Rate in Long-Term Decline?"
          finding={<>The UK&apos;s total fertility rate fell to a record low of 1.49 in 2023 — well below the 2.1 replacement rate and down from a post-recession high of 1.94 in 2012.<Cite nums={1} /> The decline is structural, driven by rising housing costs, childcare costs, and changing attitudes to parenthood, not just demographic shifts.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Britain&apos;s birth rate has been falling since 2012 and the pace of decline has accelerated. The total fertility rate — the average number of children a woman would have over her lifetime at current rates — is now the lowest since records began. England and Wales recorded 591,000 live births in 2023, down from a peak of 723,000 in 2012. The gap between the number of children people say they want to have and the number they actually have has widened substantially: surveys consistently find that women&apos;s &quot;ideal&quot; family size remains around 2, but the actual rate falls well short.<Cite nums={1} /></p>
            <p>The drivers are multiple and interacting. Housing unaffordability — particularly in London and the South East — is associated with delayed family formation. The cost and availability of childcare constrains family size. Longer periods of education, a rising mean age at first birth (now 31), and greater career participation by women all compress the window for having children. The Resolution Foundation&apos;s research suggests economic anxiety, rather than preference change, explains much of the shortfall.<Cite nums={[2, 3]} /> The long-run implications for pensions, healthcare, and economic growth are significant.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Fertility and births' },
          { id: 'sec-chart2', label: 'Timing and childlessness' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Total fertility rate (2023)" value="1.49" unit="" direction="down" polarity="up-is-good" changeText={<>Record low; replacement rate is 2.1<Cite nums={1} /></>} sparklineData={[1.94, 1.91, 1.88, 1.82, 1.76, 1.70, 1.65, 1.60, 1.56, 1.52, 1.49]} href="#sec-chart1" />
          <MetricCard label="Live births" value="591k" unit="" direction="down" polarity="up-is-good" changeText={<>Down from 723k in 2012<Cite nums={2} /></>} sparklineData={[723, 710, 695, 679, 662, 640, 624, 613, 605, 596, 591]} href="#sec-chart1" />
          <MetricCard label="Mean age at first birth" value="31.0" unit="yrs" direction="up" polarity="flat" changeText={<>Up from 27.9 in 2000<Cite nums={3} /></>} sparklineData={[27.9, 28.3, 28.7, 29.1, 29.4, 29.7, 30.0, 30.3, 30.6, 30.8, 31.0]} href="#sec-chart2" />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart title="UK total fertility rate and live births, 2000–2023" subtitle="TFR (children per woman) and annual live births in England and Wales (thousands)" series={chart1Series} annotations={annotations} yLabel="TFR / thousands" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart title="Mean age at childbirth and childlessness at 30, 2000–2023" subtitle="Mean age at first birth and percentage of women childless at age 30, England and Wales" series={chart2Series} annotations={[]} yLabel="Years / %" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Desired family size" value="2.1" unit="children (survey)" description={<>UK women&apos;s ideal family size, measured in surveys, has remained around 2.1 children for decades — suggesting the fertility decline reflects unmet demand, not preference change.<Cite nums={3} /></>} source="Source: Resolution Foundation, Baby Bust report." />
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
