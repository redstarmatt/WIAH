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
  { num: 1, name: 'ONS', dataset: 'Families and households in the UK', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/families/bulletins/familiesandhouseholds/latest', date: '2024' },
  { num: 2, name: 'ONS', dataset: 'Marriage statistics', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/marriagecohabitationandcivilpartnerships', date: '2024' },
  { num: 3, name: 'Resolution Foundation', dataset: 'Changing family structures', url: 'https://www.resolutionfoundation.org/research/', date: '2024' },
];

interface DataPoint {
  year: number;
  cohabitingFamilies: number;
  marriedFamilies: number;
  singleParentFamilies: number;
  marriageRate: number;
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

export default function CohabitationTrendsPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/cohabitation-trends/cohabitation_trends.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'cohabitingFamilies', label: 'Cohabiting couple families (millions)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.cohabitingFamilies })) },
        { id: 'marriedFamilies', label: 'Married couple families (millions)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.marriedFamilies })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'marriageRate', label: 'Marriage rate (per 1,000 unmarried adults)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.marriageRate })) },
        { id: 'singleParentFamilies', label: 'Single parent families (millions)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.singleParentFamilies })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'Covid — marriages postponed' },
  ];

  return (
    <>
      <TopicNav topic="Society" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Society"
          question="How Has Cohabitation Changed in the UK?"
          finding={<>Cohabiting couple families have doubled since 1996 to over 3.7 million — the fastest-growing family type in the UK — while the marriage rate has fallen to its lowest recorded level.<Cite nums={1} /> Despite this, cohabiting partners have significantly fewer legal rights than married couples, creating financial vulnerability on relationship breakdown.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Family formation in Britain has changed fundamentally over the past three decades. Cohabitation — couples living together outside marriage — has shifted from a transitional phase before marriage to, for many, a permanent arrangement. The number of cohabiting families has grown steadily from 1.5 million in 1996 to nearly 3.7 million today, while the number of marriages per 1,000 unmarried adults continues to fall. One in five families with dependent children is now headed by a cohabiting (rather than married) couple.<Cite nums={1} /></p>
            <p>The legal consequences of this change are significant and largely invisible to the couples affected. There is no such thing as a &quot;common-law marriage&quot; in English law: cohabiting partners have no automatic right to each other&apos;s property, pensions, or income on relationship breakdown, and no right to bereavement benefits. Research consistently shows that a majority of cohabiting couples incorrectly believe they have equivalent rights to married couples. The Law Commission has recommended reform, but cohabitation law has not been updated.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Family types' },
          { id: 'sec-chart2', label: 'Marriage and lone parents' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Cohabiting families" value="3.7m" unit="" direction="up" polarity="flat" changeText={<>More than doubled since 1996<Cite nums={1} /></>} sparklineData={[1.5, 1.8, 2.1, 2.4, 2.7, 2.9, 3.1, 3.3, 3.5, 3.6, 3.7]} href="#sec-chart1" />
          <MetricCard label="Marriage rate" value="20.5" unit="per 1,000" direction="down" polarity="flat" changeText={<>Near record low; was 46 in 1972<Cite nums={2} /></>} sparklineData={[34, 31, 28, 26, 25, 24, 23, 22, 21, 20.8, 20.5]} href="#sec-chart2" />
          <MetricCard label="Single parent families" value="2.9m" unit="" direction="flat" polarity="flat" changeText={<>Broadly stable for a decade<Cite nums={3} /></>} sparklineData={[2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 2.9, 2.9, 2.9, 2.9, 2.9]} href="#sec-chart2" />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart title="Family types in the UK, 1996–2024" subtitle="Cohabiting couple families and married couple families (millions), UK" series={chart1Series} annotations={annotations} yLabel="Millions" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart title="Marriage rate and single parent families, 1996–2024" subtitle="Marriages per 1,000 unmarried adults and single parent families (millions)" series={chart2Series} annotations={[]} yLabel="Per 1,000 / millions" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Civil partnerships" value="6,900" unit="formed (2023)" description={<>Civil partnerships — which give full legal rights equivalent to marriage — were opened to opposite-sex couples in 2019 and around 6,900 were formed in 2023, though take-up remains far below marriage rates.<Cite nums={2} /></>} source="Source: ONS, Civil partnerships statistics." />
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
