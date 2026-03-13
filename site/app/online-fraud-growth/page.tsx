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
  { num: 1, name: 'ONS', dataset: 'Crime Survey for England and Wales — fraud and computer misuse', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice', date: '2024' },
  { num: 2, name: 'Action Fraud / NFIB', dataset: 'Annual Report', url: 'https://www.actionfraud.police.uk/', date: '2025' },
  { num: 3, name: 'PSR', dataset: 'Authorised Push Payment Fraud Statistics', url: 'https://www.psr.org.uk/our-work/app-scams/', date: '2024' },
];

interface DataPoint {
  year: number;
    fraudM: number;
    computerMisuseM: number;
    prosecutionRatePct: number;
    actionFraudReportsPct: number;
}

interface TopicData {
  national: {
    timeSeries: DataPoint[];
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

export default function OnlineFraudGrowthPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/online-fraud-growth/online_fraud_growth.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const series1: Series[] = data ? [
    {
      id: 'fraudM',
      label: "Fraud incidents (millions)",
      colour: "#E63946",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.fraudM })),
    },
    {
      id: 'computerMisuseM',
      label: "Computer misuse incidents (millions)",
      colour: "#264653",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.computerMisuseM })),
    },
  ] : [];

  const series2: Series[] = data ? [
    {
      id: 'prosecutionRatePct',
      label: "Cases resulting in prosecution (%)",
      colour: "#E63946",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.prosecutionRatePct })),
    },
    {
      id: 'actionFraudReportsPct',
      label: "Cases reported to Action Fraud (%)",
      colour: "#6B7280",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.actionFraudReportsPct })),
    },
  ] : [];

  const annotations1: Annotation[] = [
    { date: new Date(2020, 0, 1), label: "2020: COVID drives surge in online scams" },
    { date: new Date(2023, 0, 1), label: "2023: Authorised push payment fraud peaks" },
  ];

  const annotations2: Annotation[] = [
    { date: new Date(2022, 0, 1), label: "2022: Action Fraud reform announced" },
  ];

  return (
    <>
      <TopicNav topic="Online Fraud" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Digital & Connectivity"
          question="Has Fraud Become Britain's Biggest Crime?"
          finding="Fraud now accounts for 40% of all crime in England and Wales with 3.7 million incidents in 2024; only 5% of reported fraud cases result in a prosecution."
          colour="#264653"
        />

        <section className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Fraud now accounts for 40% of all crime in England and Wales with 3.7 million incidents in 2024; only 5% of reported fraud cases result in a prosecution. The data below draws on official sources to show how this has changed over the past decade and where the pressures are most acute.
            </p>
            <p>
              The figures reflect a structural pattern rather than a short-term fluctuation. Understanding the scale of the issue is the first step toward holding policymakers to account for the decisions that shape these outcomes.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: "Fraud incidents" },
          { id: 'sec-chart2', label: "Cases resulting in p" },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Fraud incidents 2024"
            value="3.7m"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText="40% of all crime \u00b7 most unreported"
            sparklineData={[2.9,3.1,3.3,3.5,3.6,3.8,4.2,4.5,3.9,3.8,3.7]}
            href="#sec-chart1"
          />
          <MetricCard
            label="Share of all crime"
            value="40%"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Up from 20% in 2014 \u00b7 now largest crime category"
            sparklineData={[20,22,24,28,32,36,38,42,40,40,40]}
            href="#sec-chart2"
          />
          <MetricCard
            label="Cases resulting in prosecution"
            value="5%"
            unit=""
            direction="flat"
            polarity="up-is-good"
            changeText="Chronically under-resourced \u00b7 victims rarely see justice"
            sparklineData={[7,6,6,6,5,5,5,5,5,5,5]}
            href="#sec-chart1"
          />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Fraud and computer misuse incidents, England & Wales, 2015\u20132025"
              subtitle="Number of fraud and computer misuse offences from the Crime Survey for England and Wales. Fraud now accounts for a larger share of crime than any other category."
              series={series1}
              annotations={annotations1}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Fraud prosecution and detection rates, 2015\u20132025"
              subtitle="Percentage of fraud incidents that result in a charge/summons. The detection rate remains persistently low despite the growth in cybercrime policing capacity."
              series={series2}
              annotations={annotations2}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Authorised Push Payment reimbursement mandatory"
            value="\u00a3415m"
            unit="reimbursed to APP fraud victims in 2024"
            description="From October 2023, UK banks are required to reimburse victims of authorised push payment fraud up to \u00a3415,000 per claim. This mandatory reimbursement scheme reversed the previous situation where victims bore losses unless they could prove bank negligence. In the first year, \u00a3415 million was returned to 150,000 victims \u2014 more than double the previous voluntary scheme."
            source="Source: PSR \u2014 Authorised push payment fraud statistics, 2024. Action Fraud \u2014 Annual report 2025."
          />
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                  {src.name} — {src.dataset}
                </a>
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
              {data?.metadata.knownIssues.map((issue, i) => (
                <li key={i}>{issue}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
