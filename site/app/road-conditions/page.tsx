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
  { num: 1, name: 'ADEPT / AIA', dataset: 'Annual Local Authority Road Maintenance Survey (ALARM)', url: 'https://www.asphaltuk.org/alarm-survey/', date: '2025', note: 'Maintenance backlog totals £16.3bn' },
  { num: 2, name: 'DfT', dataset: 'Local Road Maintenance Statistics', url: 'https://www.gov.uk/government/statistics/road-conditions-in-england', date: '2025' },
  { num: 3, name: 'DfT', dataset: 'Pothole Fund and Highways Maintenance Block Grant', url: 'https://www.gov.uk/government/publications', date: '2025', note: '£500m dedicated pothole funding 2025-26' },
];

interface DataPoint {
  year: number;
    backlogBn: number;
    annualSpendingBn: number;
    potholeReportsM: number;
    potholeRepairsM: number;
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

export default function RoadConditionsPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/road-conditions/road_conditions.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const series1: Series[] = data ? [
    {
      id: 'backlogBn',
      label: "Maintenance backlog (\u00a3bn)",
      colour: "#E63946",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.backlogBn })),
    },
    {
      id: 'annualSpendingBn',
      label: "Annual LA road spending (\u00a3bn)",
      colour: "#264653",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.annualSpendingBn })),
    },
  ] : [];

  const series2: Series[] = data ? [
    {
      id: 'potholeReportsM',
      label: "Potholes reported (millions)",
      colour: "#E63946",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.potholeReportsM })),
    },
    {
      id: 'potholeRepairsM',
      label: "Potholes repaired (millions)",
      colour: "#264653",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.potholeRepairsM })),
    },
  ] : [];

  const annotations1: Annotation[] = [
    { date: new Date(2020, 0, 1), label: "2020: Pandemic reduces road use \u2014 damage slows" },
    { date: new Date(2023, 0, 1), label: "2023: Hard winter accelerates deterioration" },
  ];

  const annotations2: Annotation[] = [
    { date: new Date(2023, 0, 1), label: "2023: \u00a3200m pothole fund announced" },
  ];

  return (
    <>
      <TopicNav topic="Road Conditions" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Transport & Infrastructure"
          question="How Bad Are Britain's Potholes?"
          finding="The local road maintenance backlog across England totals \u00a316.3 billion; at current funding levels it would take 14 years to clear. 13 councils received the worst possible rating in 2025-26."
          colour="#264653"
        />

        <section className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The local road maintenance backlog across England totals £16.3 billion; at current funding levels it would take 14 years to clear.<Cite nums={1} /> 13 councils received the worst possible rating in 2025-26.<Cite nums={2} /> The data below draws on official sources to show how this has changed over the past decade and where the pressures are most acute.
            </p>
            <p>
              The figures reflect a structural pattern rather than a short-term fluctuation. Understanding the scale of the issue is the first step toward holding policymakers to account for the decisions that shape these outcomes.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: "Maintenance backlog" },
          { id: 'sec-chart2', label: "Potholes reported" },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="England road maintenance backlog"
            value="\u00a316.3bn"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Up from \u00a39.8bn in 2019 \u00b7 66% increase"
            sparklineData={[9.8,10.1,10.6,11.2,11.8,12.4,13.1,14.2,15.1,15.7,16.3]}
            href="#sec-chart1"
          />
          <MetricCard
            label="Councils with worst road rating"
            value="13"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Red rating 2025-26 DfT assessment"
            sparklineData={[2,3,3,4,5,6,7,8,10,12,13]}
            href="#sec-chart2"
          />
          <MetricCard
            label="Potholes reported annually"
            value="2.0m+"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Rising as roads deteriorate faster"
            sparklineData={[1.3,1.4,1.5,1.6,1.7,1.7,1.8,1.9,1.9,2.0,2.0]}
            href="#sec-chart1"
          />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Local road maintenance backlog, England, 2015\u20132025"
              subtitle="Estimated cost to bring all local authority roads up to a satisfactory standard (\u00a3billions, 2024 prices). The backlog has grown despite additional government funding."
              series={series1}
              annotations={annotations1}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Pothole repairs and reports, England, 2015\u20132025"
              subtitle="Annual pothole repairs carried out by local authorities versus reports received. The repair backlog grows each year as more potholes form than are fixed."
              series={series2}
              annotations={annotations2}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Pothole Fund delivering results"
            value="\u00a3500m"
            unit="dedicated pothole funding 2025-26"
            description="The government announced a dedicated Pothole Fund of \u00a3500 million for 2025-26, on top of the existing Highways Maintenance Block Grant. Early data from 2024 shows the additional funding enabled councils to repair an extra 1.2 million potholes compared to 2023. A further \u00a31.6 billion was announced for road maintenance as part of the Infrastructure Investment Plan."
            source="Source: DfT \u2014 Local road maintenance statistics, 2025. ADEPT \u2014 State of the nation road survey, 2025."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

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
