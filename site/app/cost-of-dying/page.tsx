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
  { num: 1, name: 'SunLife', dataset: 'Cost of Dying Report', url: 'https://www.sunlife.co.uk/life-insurance/cost-of-dying/', date: '2024' },
  { num: 2, name: 'National Association of Funeral Directors', dataset: 'Funeral Costs Survey', url: 'https://nafd.org.uk/funeral-profession/facts-figures/', date: '2024' },
  { num: 3, name: 'Citizens Advice', dataset: 'Funeral Poverty and Bereavement Debt Research', url: 'https://www.citizensadvice.org.uk/consumer/funerals/', date: '2023' },
];

interface DataPoint {
  year: number;
  averageFuneralCost: number;
  funeralPovertyRate: number;
  socialFundGrants: number;
  probateCosts: number;
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

export default function CostOfDyingPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/cost-of-dying/cost_of_dying.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'averageFuneralCost', label: 'Average funeral cost (£)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.averageFuneralCost })) },
        { id: 'probateCosts', label: 'Average total cost of dying (funeral + probate + admin, £)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.probateCosts })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'funeralPovertyRate', label: 'Funerals families struggle to pay for (% of all)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.funeralPovertyRate })) },
        { id: 'socialFundGrants', label: 'Funeral Expenses Payments issued (thousands)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.socialFundGrants })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'Covid-19: restrictions limit funeral attendance' },
    { date: new Date(2022, 5, 1), label: 'Funeral market investigation: CMA' },
  ];

  return (
    <>
      <TopicNav topic="Society & Economy" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Society & Economy"
          question="How Much Does Dying Cost in Britain?"
          finding={<>The average funeral now costs around £4,100, and when probate, legal fees, and death administration are included the total average cost of dying in the UK exceeds £9,200 — rising faster than inflation for two decades and leaving growing numbers of bereaved families in debt.<Cite nums={1} /> Around 100,000 families a year struggle to pay funeral costs.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The cost of a funeral in the UK has increased by over 130% since 2004 — more than three times general inflation — creating a situation where growing numbers of bereaved families cannot afford to give their loved ones a dignified farewell.<Cite nums={1} /> SunLife's annual Cost of Dying report tracks the full picture: the average direct cost of a burial funeral is now around £4,100, with cremations slightly cheaper at around £3,600. When associated costs — flowers, death notices, catering, professional fees and probate — are included, the average total cost exceeds £9,200.</p>
            <p>Citizens Advice estimates that around 100,000 families a year struggle to afford funeral costs, and a significant proportion take on debt — on credit cards or personal loans — to cover expenses they feel compelled to incur in a period of acute grief.<Cite nums={3} /> The government's Funeral Expenses Payment — a Social Fund grant available to people on qualifying benefits — covers only a fraction of costs and is accessed by around 30,000 families annually. The Competition and Markets Authority conducted a market investigation into the funeral sector in 2021, finding that weak competition and lack of price transparency were contributing to higher prices, and recommended new price transparency rules which came into effect in 2022.<Cite nums={2} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-costs', label: 'Cost trends' },
          { id: 'sec-poverty', label: 'Funeral poverty' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Average funeral cost" value="4,100" unit="£" direction="up" polarity="up-is-bad" changeText={<>Up 130% since 2004; faster than inflation<Cite nums={1} /></>} sparklineData={[1800, 2100, 2500, 2800, 3100, 3400, 3650, 3800, 3900, 4000, 4100]} href="#sec-costs" />
          <MetricCard label="Average total cost of dying" value="9,200" unit="£" direction="up" polarity="up-is-bad" changeText={<>Including probate, admin and admin costs<Cite nums={1} /></>} sparklineData={[4200, 5000, 5900, 6800, 7400, 7800, 8200, 8600, 8900, 9100, 9200]} href="#sec-costs" />
          <MetricCard label="Families struggling to pay funeral costs" value="100" unit="thousand/yr" direction="up" polarity="up-is-bad" changeText={<>Growing with rising costs and inequality<Cite nums={3} /></>} sparklineData={[70, 74, 78, 82, 86, 88, 90, 93, 96, 98, 100]} href="#sec-poverty" />
        </div>

        <ScrollReveal>
          <section id="sec-costs" className="mb-12">
            <LineChart title="UK funeral costs, 2004–2024" subtitle="Average funeral cost (£) and total average cost of dying (£), UK." series={chart1Series} annotations={annotations} yLabel="£" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-poverty" className="mb-12">
            <LineChart title="Funeral poverty and government support, 2015–2024" subtitle="Families struggling to pay funeral costs (% of all funerals) and Funeral Expenses Payments issued (thousands), UK." series={chart2Series} annotations={[]} yLabel="Value" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Price transparency rules" value="2022" unit="enacted" description={<>Following the CMA's market investigation, funeral directors are now required to display prices clearly online and at premises, giving bereaved families better ability to compare costs at what is often one of the most emotionally difficult purchasing decisions of their lives.<Cite nums={2} /></>} source="Source: CMA, Funeral Market Investigation Final Report, 2021." />
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
