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
  { num: 1, name: 'ONS', dataset: 'Ethnicity pay gaps in Great Britain', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/articles/ethnicitypaygapsingreatbritain/2012to2022', date: '2024' },
  { num: 2, name: 'Runnymede Trust', dataset: 'Ethnic pay gap report', url: 'https://www.runnymedetrust.org/', date: '2024' },
  { num: 3, name: 'Cabinet Office', dataset: 'Race Disparity Audit — earnings', url: 'https://www.ethnicity-facts-figures.service.gov.uk/work-pay-and-benefits/pay-and-income/earnings-of-full-time-employees/latest', date: '2024' },
];

interface DataPoint {
  year: number;
  bangladeshiPayGap: number;
  pakistaniPayGap: number;
  blackAfricanPayGap: number;
  indianPayGap: number;
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

export default function EthnicPayGapDetailPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/ethnic-pay-gap-detail/ethnic_pay_gap_detail.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'bangladeshiPayGap', label: 'Bangladeshi pay gap (%)', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.bangladeshiPayGap })) },
        { id: 'pakistaniPayGap', label: 'Pakistani pay gap (%)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.pakistaniPayGap })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'blackAfricanPayGap', label: 'Black African pay gap (%)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.blackAfricanPayGap })) },
        { id: 'indianPayGap', label: 'Indian pay gap (%)', colour: '#2A9D8F', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.indianPayGap })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2017, 5, 1), label: 'Race Disparity Audit published' },
    { date: new Date(2021, 5, 1), label: 'Commission on Race and Ethnic Disparities' },
  ];

  return (
    <>
      <TopicNav topic="Society & Economy" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Society & Economy"
          question="How Does the Ethnicity Pay Gap Vary by Group?"
          finding={<>The ethnicity pay gap is not uniform: Bangladeshi and Pakistani workers face the largest gaps (earning 17–20% less than white British workers), while Indian workers now earn more than white British workers on average.<Cite nums={1} /> Aggregating into a single &quot;BAME&quot; figure conceals dramatic variation in experience across groups.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The ethnicity pay gap has received growing attention as a policy issue since the Race Disparity Audit in 2017, but the picture is more nuanced than a single headline figure suggests. ONS data on full-time employee earnings shows that the Bangladeshi and Pakistani pay gaps are the largest of any ethnic group, driven by a combination of occupational segregation, geographic concentration in lower-wage areas, and higher rates of self-employment in sectors with lower average earnings. Black Caribbean and Black African workers also face substantial gaps, though of different magnitudes.<Cite nums={1} /></p>
            <p>Indian workers, by contrast, are now the highest-earning ethnic group in Britain on average — a result of high educational attainment and concentration in professional sectors including medicine, law, and technology. Chinese workers are similarly positioned. This divergence means that policies aimed at a generalised &quot;ethnic minority pay gap&quot; will fail to address the specific disadvantages faced by the most-affected groups. Runnymede Trust research highlights that intersections with gender and geography further amplify existing disparities — particularly for Pakistani and Bangladeshi women.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Largest gaps' },
          { id: 'sec-chart2', label: 'Group variation' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Bangladeshi pay gap" value="–20" unit="%" direction="flat" polarity="up-is-good" changeText={<>Largest pay gap of any ethnic group<Cite nums={1} /></>} sparklineData={[-24, -23, -22, -21, -20, -20, -20, -20, -20, -20, -20]} href="#sec-chart1" />
          <MetricCard label="Pakistani pay gap" value="–17" unit="%" direction="flat" polarity="up-is-good" changeText={<>Second largest; concentrated in specific sectors<Cite nums={1} /></>} sparklineData={[-20, -19, -18, -18, -17, -17, -17, -17, -17, -17, -17]} href="#sec-chart1" />
          <MetricCard label="Indian pay premium" value="+9" unit="%" direction="up" polarity="up-is-good" changeText={<>Indian workers earn more than white British<Cite nums={3} /></>} sparklineData={[2, 3, 4, 5, 6, 7, 7.5, 8, 8.5, 9, 9]} href="#sec-chart2" />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart title="Bangladeshi and Pakistani pay gaps vs white British, 2012–2023" subtitle="Hourly earnings gap (%) for full-time employees, Great Britain" series={chart1Series} annotations={annotations} yLabel="% gap" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart title="Black African and Indian pay compared to white British, 2012–2023" subtitle="Hourly earnings gap (%) for full-time employees — note Indian workers earn a premium" series={chart2Series} annotations={[]} yLabel="% gap / premium" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Voluntary ethnicity pay gap reporting" value="8%" unit="of large employers" description={<>Only around 8% of large employers in the UK voluntarily report their ethnicity pay gap data — compared to near-universal gender pay gap reporting, which is mandatory. Mandatory reporting has been proposed but not yet legislated.<Cite nums={2} /></>} source="Source: Runnymede Trust, ethnicity pay gap reporting survey." />
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
