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
  { num: 1, name: 'Home Office', dataset: 'Crime outcomes in England and Wales', url: 'https://www.gov.uk/government/collections/crime-outcomes-in-england-and-wales-statistics', date: '2024' },
  { num: 2, name: 'Crown Prosecution Service', dataset: 'Violence Against Women and Girls Report', url: 'https://www.cps.gov.uk/publication/vawg-data-report', date: '2024' },
  { num: 3, name: 'ONS', dataset: 'Crime Survey for England and Wales — sexual offences', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice/bulletins/sexualoffencesinenglandandwales/yearendingmarch2023', date: '2024' },
];

interface DataPoint {
  year: number;
  rapeReports: number;
  chargeRate: number;
  convictionRate: number;
  timeToTrial: number;
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

export default function RapeProsecutionRatesPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/rape-prosecution-rates/rape_prosecution_rates.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const chart1Series: Series[] = data
    ? [
        { id: 'rapeReports', label: 'Rape reports to police', colour: '#E63946', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.rapeReports })) },
        { id: 'chargeRate', label: 'Charge rate (%)', colour: '#F4A261', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.chargeRate })) },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        { id: 'convictionRate', label: 'Conviction rate (%)', colour: '#264653', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.convictionRate })) },
        { id: 'timeToTrial', label: 'Avg time to trial (months)', colour: '#6B7280', data: data.national.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.timeToTrial })) },
      ]
    : [];

  const annotations: Annotation[] = [
    { date: new Date(2017, 5, 1), label: 'Operation Soteria launched' },
    { date: new Date(2021, 5, 1), label: 'End-to-end rape review' },
  ];

  return (
    <>
      <TopicNav topic="Justice" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Justice"
          question="How Often Does Rape Lead to Conviction?"
          finding={<>Around 70,000 rapes are reported to police in England and Wales each year, yet fewer than 3% result in a charge.<Cite nums={1} /> Of those that reach court, conviction rates are high — but most cases never get there.<Cite nums={[2, 3]} /></>}
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Rape is among the most reported but least prosecuted serious crimes in England and Wales. The gap between reporting and charge has widened dramatically over the past decade: in 2015, around 7% of rape reports resulted in a charge; by 2019 that figure had fallen to under 2%. The primary drivers are police resourcing, the complexity and volume of digital evidence, and high attrition as complainants withdraw — often citing trauma, delays, and loss of faith in the system.<Cite nums={1} /></p>
            <p>The government&apos;s 2021 end-to-end rape review acknowledged the scale of the problem and set a target to double the number of adult rape cases reaching prosecution by 2024. Charge rates have recovered somewhat from their 2019 nadir, but the average time from report to trial now exceeds 2.5 years — a wait that itself contributes to complainant attrition. The CPS conviction rate of around 68% once cases reach court shows that, when the system does work, it generally delivers a verdict — the failure is earlier in the process.<Cite nums={[2, 3]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Reports and charges' },
          { id: 'sec-chart2', label: 'Convictions and delays' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard label="Rape reports annually" value="70k" unit="" direction="up" polarity="up-is-bad" changeText={<>Up from 36k in 2015; most go uncharged<Cite nums={1} /></>} sparklineData={[36000, 42000, 49000, 54000, 58000, 55000, 63000, 67000, 70000, 70000, 70000]} href="#sec-chart1" />
          <MetricCard label="Charge rate" value="2.9" unit="%" direction="up" polarity="up-is-good" changeText={<>Recovering from 1.6% in 2019<Cite nums={2} /></>} sparklineData={[7.0, 5.5, 4.2, 2.8, 1.6, 1.9, 2.2, 2.5, 2.7, 2.8, 2.9]} href="#sec-chart1" />
          <MetricCard label="Avg time to trial" value="31" unit="months" direction="up" polarity="up-is-bad" changeText={<>Was 18 months in 2019<Cite nums={3} /></>} sparklineData={[18, 20, 22, 26, 30, 36, 34, 33, 32, 31, 31]} href="#sec-chart2" />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart title="Rape reports and charge rate, 2015–2024" subtitle="Annual reports to police and percentage resulting in charge, England and Wales" series={chart1Series} annotations={annotations} yLabel="Reports / %" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart title="Conviction rate and time to trial, 2015–2024" subtitle="CPS conviction rate (%) and average months from report to trial" series={chart2Series} annotations={[]} yLabel="% / months" />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout title="Operation Soteria" value="14" unit="forces" description={<>Operation Soteria, a research-led programme that embeds academics in police teams to transform rape investigation practice, has now expanded to 14 police forces with evidence of improved charge rates in pilot areas.<Cite nums={2} /></>} source="Source: Home Office, Operation Soteria Bluestone evaluation." />
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
