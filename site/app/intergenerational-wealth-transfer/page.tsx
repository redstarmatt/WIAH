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
  { num: 1, name: 'Resolution Foundation', dataset: 'Intergenerational Commission — wealth transfer', url: 'https://www.resolutionfoundation.org/advanced/intergenerational-commission/', date: '2024' },
  { num: 2, name: 'HMRC', dataset: 'Inheritance Tax statistics', url: 'https://www.gov.uk/government/collections/inheritance-tax-statistics', date: '2024' },
  { num: 3, name: 'ONS', dataset: 'Wealth and Assets Survey', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/personalandhouseholdfinances/incomeandwealth/bulletins/wealthingreatbritainwave7/2018to2020', date: '2024' },
];

interface DataPoint {
  year: number;
  inheritanceTaxReceipts: number;
  estatesTaxed: number;
  medianInheritanceAmount: number;
  wealthGiniCoefficient: number;
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

export default function IntergenerationalWealthTransferPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/intergenerational-wealth-transfer/intergenerational_wealth_transfer.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'inheritanceTaxReceipts', label: 'IHT receipts (£bn)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.inheritanceTaxReceipts })) },
        { id: 'estatesTaxed', label: 'Estates paying IHT (thousands)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.estatesTaxed })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'medianInheritanceAmount', label: 'Median inheritance (£000s)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.medianInheritanceAmount })) },
        { id: 'wealthGiniCoefficient', label: 'Wealth Gini coefficient', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.wealthGiniCoefficient })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: 'IHT threshold frozen; more estates enter scope' },
  ];

  return (
    <>
      <TopicNav topic="Society & Economy" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Society & Economy"
          question="How Much Wealth Are Older Generations Passing Down?"
          finding={<>Inheritance Tax receipts reached a record £7.5 billion in 2023–24 as house prices pushed more estates above the threshold, yet most wealth transfers occur below the taxable limit — concentrating inherited wealth among those who already have assets.<Cite nums={1} /> The median inheritance received is around £63,000, but the distribution is highly skewed.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The &quot;Bank of Mum and Dad&quot; has become a structural feature of British housing market — parents and grandparents providing deposits, gifts, and loans that make homeownership possible for millions who could not otherwise afford it. But this transfer of wealth is deeply unequal: it flows predominantly to children whose parents already own property, which is itself correlated with income, education, and geography. The Resolution Foundation estimates that intergenerational wealth transfers now account for over £100 billion per year in total — larger than the NHS budget.<Cite nums={1} /></p>
            <p>Inheritance is becoming more important to lifetime wealth outcomes as house price growth outpaces earnings growth, and as defined benefit pension wealth accumulated by older generations reaches the estate stage. Those who stand to inherit substantial assets are already likely to be better-off; those who will inherit little or nothing are disproportionately renters and lower earners. HMRC data shows that IHT receipts have doubled in a decade, driven by property value appreciation rather than any increase in the rate of large estates — the freeze on thresholds has brought more mid-wealth estates into scope.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'IHT revenues' },
          { id: 'sec-chart2', label: 'Wealth inequality' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="IHT receipts (2023–24)" value="£7.5bn" unit="" direction="up" polarity="flat" changeText={<>Record high; doubled since 2014<Cite nums={2} /></>} sparklineData={[3.4, 3.8, 4.2, 4.7, 5.1, 5.3, 5.9, 6.1, 6.9, 7.1, 7.5]} href="#sec-chart1" />
          <MetricCard label="Estates paying IHT" value="27k" unit="" direction="up" polarity="flat" changeText={<>4% of UK deaths now attract IHT<Cite nums={2} /></>} sparklineData={[17000, 18000, 19000, 20000, 21000, 22000, 23000, 24000, 25000, 26000, 27000]} href="#sec-chart1" />
          <MetricCard label="Wealth Gini coefficient" value="0.63" unit="" direction="up" polarity="up-is-bad" changeText={<>Wealth inequality higher than income inequality<Cite nums={3} /></>} sparklineData={[0.60, 0.60, 0.61, 0.61, 0.62, 0.62, 0.62, 0.63, 0.63, 0.63, 0.63]} href="#sec-chart2" />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart title="Inheritance Tax receipts and estates taxed, 2010–2024" subtitle="Annual IHT receipts (£bn) and number of estates paying IHT (thousands), UK" series={chart1Series} annotations={annotations} yLabel="£bn / thousands" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart title="Median inheritance and wealth Gini coefficient, 2010–2024" subtitle="Median value of inheritances received (£000s) and Gini coefficient for wealth distribution" series={chart2Series} annotations={[]} yLabel="£000s / Gini" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Gifts while living" value="£37bn" unit="per year" description={<>Around £37 billion is estimated to be transferred between generations as gifts during the donor&apos;s lifetime each year — much of it going toward house deposits and falling largely outside the tax net.<Cite nums={1} /></>} source="Source: Resolution Foundation, Intergenerational Commission." />
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
