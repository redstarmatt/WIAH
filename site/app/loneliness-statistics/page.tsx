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
    youngAdultPct: number;
    over65Pct: number;
    chronicallyLonelyM: number;
    socialPrescribingReferrals: number;
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

export default function LonelinessStatisticsPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/loneliness-statistics/loneliness_statistics.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const series1: Series[] = data ? [
    {
      id: 'youngAdultPct',
      label: "16-24 year olds often/always lonely (%)",
      colour: "#E63946",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.youngAdultPct })),
    },
    {
      id: 'over65Pct',
      label: "Over-65s often/always lonely (%)",
      colour: "#264653",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.over65Pct })),
    },
  ] : [];

  const series2: Series[] = data ? [
    {
      id: 'chronicallyLonelyM',
      label: "Chronically lonely adults (millions)",
      colour: "#E63946",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.chronicallyLonelyM })),
    },
    {
      id: 'socialPrescribingReferrals',
      label: "Social prescribing referrals (thousands)",
      colour: "#2A9D8F",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.socialPrescribingReferrals })),
    },
  ] : [];

  const annotations1: Annotation[] = [
    { date: new Date(2020, 0, 1), label: "2020: Pandemic lockdowns isolate all ages" },
    { date: new Date(2021, 0, 1), label: "2021: Young adults loneliness remains elevated post-pandemic" },
  ];

  const annotations2: Annotation[] = [
    { date: new Date(2018, 0, 1), label: "2018: First Minister for Loneliness appointed" },
    { date: new Date(2023, 0, 1), label: "2023: Loneliness strategy refresh" },
  ];

  return (
    <>
      <TopicNav topic="Loneliness" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Wellbeing & Society"
          question="How Many People Are Chronically Lonely?"
          finding="3.83 million adults in England are chronically lonely \u2014 7.1% of the population. Young adults (16-24) now report the highest rates, overtaking the elderly as the loneliest age group."
          colour="#2A9D8F"
        />

        <section className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              3.83 million adults in England are chronically lonely — 7.1% of the population. Young adults (16-24) now report the highest rates, overtaking the elderly as the loneliest age group. The data below draws on official sources to show how this has changed over the past decade and where the pressures are most acute.
            </p>
            <p>
              The figures reflect a structural pattern rather than a short-term fluctuation. Understanding the scale of the issue is the first step toward holding policymakers to account for the decisions that shape these outcomes.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: "16-24 year olds ofte" },
          { id: 'sec-chart2', label: "Chronically lonely a" },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Chronically lonely adults (England)"
            value="3.83m"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Up from 2.6m in 2019 \u00b7 47% increase"
            sparklineData={[2.6,2.6,2.7,2.8,2.9,3.7,3.6,3.5,3.7,3.8,3.83]}
            href="#sec-chart1"
          />
          <MetricCard
            label="16-24s reporting high loneliness"
            value="10.5%"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Highest of any age group \u00b7 unexpected finding"
            sparklineData={[6.8,7.0,7.4,7.8,8.2,11.2,10.8,10.1,10.3,10.4,10.5]}
            href="#sec-chart2"
          />
          <MetricCard
            label="Over-65s reporting high loneliness"
            value="7.4%"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText="Still high but below young adults now"
            sparklineData={[7.2,7.1,7.3,7.4,7.5,9.1,8.6,8.0,7.6,7.4,7.4]}
            href="#sec-chart1"
          />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Chronic loneliness by age group, England, 2015\u20132025"
              subtitle="Percentage of adults who say they feel lonely often or always. Young adults have overtaken the elderly as the loneliest age group \u2014 a striking reversal."
              series={series1}
              annotations={annotations1}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Total chronically lonely adults, England, 2015\u20132025"
              subtitle="Estimated total number of adults in England who are chronically lonely (often or always lonely). Based on ONS and Community Life Survey data."
              series={series2}
              annotations={annotations2}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Social prescribing reaching scale"
            value="900,000+"
            unit="social prescribing referrals per year"
            description="Social prescribing \u2014 connecting people to community activities, befriending services and peer support \u2014 is now embedded in almost all GP practices in England. Over 900,000 referrals per year are made. Evaluation by NESTA shows a significant reduction in GP appointments and improvements in wellbeing scores at 3-month follow-up."
            source="Source: NHS England \u2014 Social Prescribing Network census, 2025. ONS \u2014 Loneliness indicators, 2024."
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
