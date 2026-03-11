'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

interface DataPoint {
  year: number;
    govtTrust: number;
    nhsTrust: number;
    parliamentTrust: number;
    mediaTrust: number;
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

export default function TrustInGovernmentPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/trust-in-government/trust_in_government.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const series1: Series[] = data ? [
    {
      id: 'govtTrust',
      label: "Government trust (%)",
      colour: "#E63946",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.govtTrust })),
    },
    {
      id: 'nhsTrust',
      label: "NHS trust (%)",
      colour: "#264653",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.nhsTrust })),
    },
  ] : [];

  const series2: Series[] = data ? [
    {
      id: 'parliamentTrust',
      label: "Parliament trust (%)",
      colour: "#6B7280",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.parliamentTrust })),
    },
    {
      id: 'mediaTrust',
      label: "Media trust (%)",
      colour: "#F4A261",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.mediaTrust })),
    },
  ] : [];

  const annotations1: Annotation[] = [
    { date: new Date(2019, 0, 1), label: "2019: Boris Johnson administration" },
    { date: new Date(2022, 0, 1), label: "2022: Partygate revelations" },
  ];

  const annotations2: Annotation[] = [
    { date: new Date(2016, 0, 1), label: "2016: Brexit referendum" },
    { date: new Date(2022, 0, 1), label: "2022: Trust reaches nadir" },
  ];

  return (
    <>
      <TopicNav topic="Trust in Government" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Democracy & Governance"
          question="Do People Still Trust British Institutions?"
          finding="Trust in government fell to 24% in 2024 \u2014 among the lowest in 40 years of measurement. Trust in the NHS remains higher at 65% but has also fallen sharply from pre-pandemic levels."
          colour="#6B7280"
        />

        <section className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Trust in government fell to 24% in 2024 — among the lowest in 40 years of measurement. Trust in the NHS remains higher at 65% but has also fallen sharply from pre-pandemic levels. The data below draws on official sources to show how this has changed over the past decade and where the pressures are most acute.
            </p>
            <p>
              The figures reflect a structural pattern rather than a short-term fluctuation. Understanding the scale of the issue is the first step toward holding policymakers to account for the decisions that shape these outcomes.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: "Government trust" },
          { id: 'sec-chart2', label: "Parliament trust" },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Trust in government"
            value="24%"
            unit=""
            direction="down"
            polarity="up-is-good"
            changeText="Down from 44% in 2019 \u00b7 near historic low"
            sparklineData={[42,44,40,38,46,38,30,26,24,24,24]}
            href="#sec-chart1"
          />
          <MetricCard
            label="Trust in NHS"
            value="65%"
            unit=""
            direction="down"
            polarity="up-is-good"
            changeText="Down from 78% in 2020 \u00b7 still highest institution"
            sparklineData={[72,74,73,71,78,76,70,67,65,65,65]}
            href="#sec-chart2"
          />
          <MetricCard
            label="Trust in media"
            value="24%"
            unit=""
            direction="down"
            polarity="up-is-good"
            changeText="Near lowest in Europe \u00b7 social media distrust rising"
            sparklineData={[34,33,30,28,29,27,27,25,24,24,24]}
            href="#sec-chart1"
          />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Trust in key UK institutions, 2015\u20132025"
              subtitle="Percentage of UK adults who trust each institution to act in the public interest. Measured annually by NatCen British Social Attitudes Survey."
              series={series1}
              annotations={annotations1}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Trust in parliament and media, 2015\u20132025"
              subtitle="Trust in UK Parliament and news media. Both have declined over the decade, with media trust particularly low by European standards."
              series={series2}
              annotations={annotations2}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Ethical standards reform underway"
            value="2024"
            unit="revised ministerial code published"
            description="The government published a revised Ministerial Code in 2024 with stronger enforcement mechanisms and an expanded role for the Independent Adviser on Ministers' Interests. The House of Lords Appointments Commission was strengthened and a new statutory lobbying register expanded coverage from 984 to over 2,400 organisations in its first year."
            source="Source: Cabinet Office \u2014 Ministerial Code 2024. Committee on Standards in Public Life \u2014 annual report."
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
