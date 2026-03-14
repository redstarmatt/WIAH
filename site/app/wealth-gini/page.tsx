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
  { num: 1, name: 'ONS', dataset: 'Wealth and Assets Survey', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/personalandhouseholdfinances/incomeandwealth/bulletins/totalwealthingreatbritain/latest', date: '2024', note: 'Top 10% own 57% of wealth; bottom 50% own 4%' },
  { num: 2, name: 'ONS', dataset: 'Financial wealth Gini coefficient', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/personalandhouseholdfinances/incomeandwealth', date: '2024', note: 'Gini 0.87 — among highest in OECD' },
  { num: 3, name: 'HMRC', dataset: 'Help to Save statistics', url: 'https://www.gov.uk/government/statistics/help-to-save-statistics', date: '2025' },
  { num: 4, name: 'DWP', dataset: 'Wealth distribution evaluation', url: 'https://www.gov.uk/government/publications', date: '2024' },
];

interface DataPoint {
  year: number;
    top10WealthShare: number;
    bottom50WealthShare: number;
    ownerOccupierWealth: number;
    privateRenterWealth: number;
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

export default function WealthGiniPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/wealth-gini/wealth_gini.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const series1: Series[] = data ? [
    {
      id: 'top10WealthShare',
      label: "Top 10% wealth share (%)",
      colour: "#E63946",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.top10WealthShare })),
    },
    {
      id: 'bottom50WealthShare',
      label: "Bottom 50% wealth share (%)",
      colour: "#2A9D8F",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.bottom50WealthShare })),
    },
  ] : [];

  const series2: Series[] = data ? [
    {
      id: 'ownerOccupierWealth',
      label: "Owner-occupier median wealth (\u00a3000s)",
      colour: "#264653",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.ownerOccupierWealth })),
    },
    {
      id: 'privateRenterWealth',
      label: "Private renter median wealth (\u00a3000s)",
      colour: "#E63946",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.privateRenterWealth })),
    },
  ] : [];

  const annotations1: Annotation[] = [
    { date: new Date(2016, 0, 1), label: "2016: House prices surge widens gap" },
    { date: new Date(2020, 0, 1), label: "2020: Pandemic increases asset wealth for owners" },
  ];

  const annotations2: Annotation[] = [
    { date: new Date(2019, 0, 1), label: "2019: Private rent hits record share of income" },
    { date: new Date(2022, 0, 1), label: "2022: Interest rates rise \u2014 wealth effect reverses briefly" },
  ];

  return (
    <>
      <TopicNav topic="Wealth Inequality" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Poverty & Cost of Living"
          question="How Unequal Is British Wealth?"
          finding={<>The wealthiest 10% of households own 57% of all UK wealth; the bottom 50% own just 4%.<Cite nums={1} /> The financial wealth Gini coefficient stands at 0.87 — one of the highest in Europe.<Cite nums={2} /></>}
          colour="#F4A261"
        />

        <section className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The wealthiest 10% of households own 57% of all UK wealth; the bottom 50% own just 4%.<Cite nums={1} /> The financial wealth Gini coefficient stands at 0.87 — one of the highest in Europe.<Cite nums={2} /> The data below draws on official sources to show how this has changed over the past decade and where the pressures are most acute.
            </p>
            <p>
              The figures reflect a structural pattern rather than a short-term fluctuation. Understanding the scale of the issue is the first step toward holding policymakers to account for the decisions that shape these outcomes.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: "Top 10% wealth share" },
          { id: 'sec-chart2', label: "Owner-occupier media" },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Top 10% wealth share"
            value="57%"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText={<>Up from 53% in 2006 · driven by property<Cite nums={1} /></>}
            sparklineData={[53,53,54,54,55,55,55,56,56,57,57]}
            href="#sec-chart1"
          />
          <MetricCard
            label="Bottom 50% wealth share"
            value="4%"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText="Barely changed in 20 years \u00b7 debt offsets assets"
            sparklineData={[4,4,4,4,4,4,4,4,4,4,4]}
            href="#sec-chart2"
          />
          <MetricCard
            label="Financial wealth Gini"
            value="0.87"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText={<>Near maximum · among highest in OECD<Cite nums={2} /></>}
            sparklineData={[0.84,0.84,0.85,0.85,0.85,0.86,0.86,0.86,0.87,0.87,0.87]}
            href="#sec-chart1"
          />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK wealth distribution by decile, 2006\u20132024"
              subtitle="Share of total household wealth held by the top 10% and bottom 50%. Wealth includes property, pension, financial and physical assets net of liabilities."
              series={series1}
              annotations={annotations1}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Median household wealth by tenure, 2006\u20132024"
              subtitle="Median total wealth by housing tenure (owner-occupied vs private renting). The homeownership wealth premium has grown dramatically."
              series={series2}
              annotations={annotations2}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Help to Save extended"
            value="120,000+"
            unit="low-income savers using Help to Save"
            description={<>The government extended the Help to Save scheme beyond its original end date, allowing low-income working people to save £1-£50 per month and receive a 50p government bonus for every £1 saved. Over 120,000 accounts are now active.<Cite nums={3} /> Evaluation shows participants are three times more likely to have emergency savings after two years compared to a control group.<Cite nums={4} /></>}
            source="Source: HMRC \u2014 Help to Save statistics, 2025. DWP \u2014 Wealth distribution evaluation, 2024."
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
        <References items={editorialRefs} />
      </main>
    </>
  );
}
