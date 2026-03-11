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
    parcelsThousands: number;
    childParcelsThousands: number;
    benefitDelayPct: number;
    lowIncomePct: number;
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

export default function FoodBankGrowthPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/food-bank-growth/food_bank_growth.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const series1: Series[] = data ? [
    {
      id: 'parcelsThousands',
      label: "Total parcels (thousands)",
      colour: "#F4A261",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.parcelsThousands })),
    },
    {
      id: 'childParcelsThousands',
      label: "Parcels to children (thousands)",
      colour: "#E63946",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.childParcelsThousands })),
    },
  ] : [];

  const series2: Series[] = data ? [
    {
      id: 'benefitDelayPct',
      label: "Benefit delay/change referrals (%)",
      colour: "#E63946",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.benefitDelayPct })),
    },
    {
      id: 'lowIncomePct',
      label: "Low income referrals (%)",
      colour: "#F4A261",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.lowIncomePct })),
    },
  ] : [];

  const annotations1: Annotation[] = [
    { date: new Date(2020, 0, 1), label: "2020: COVID food bank surge" },
    { date: new Date(2022, 0, 1), label: "2022: Cost of living crisis" },
  ];

  const annotations2: Annotation[] = [
    { date: new Date(2019, 0, 1), label: "2019: Universal Credit national rollout" },
    { date: new Date(2022, 0, 1), label: "2022: 5-week wait unchanged" },
  ];

  return (
    <>
      <TopicNav topic="Food Bank Growth" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Poverty & Cost of Living"
          question="How Many People Are Using Food Banks?"
          finding="The Trussell Trust alone distributed 2.9 million food parcels in 2024-25 \u2014 a 48\u00d7 increase since 2010-11. One million parcels went to children."
          colour="#F4A261"
        />

        <section className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The Trussell Trust alone distributed 2.9 million food parcels in 2024-25 — a 48× increase since 2010-11. One million parcels went to children. The data below draws on official sources to show how this has changed over the past decade and where the pressures are most acute.
            </p>
            <p>
              The figures reflect a structural pattern rather than a short-term fluctuation. Understanding the scale of the issue is the first step toward holding policymakers to account for the decisions that shape these outcomes.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: "Total parcels" },
          { id: 'sec-chart2', label: "Benefit delay/change" },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Trussell Trust parcels 2024-25"
            value="2.9m"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="48\u00d7 increase since 2010 \u00b7 1m to children"
            sparklineData={[913.1,1084.6,1109.0,1182.9,1332.9,1596.8,2034.7,2499.0,2985.0,2920.0,2900.0]}
            href="#sec-chart1"
          />
          <MetricCard
            label="Parcels to children"
            value="1.0m"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="34% of all parcels \u00b7 rising each year"
            sparklineData={[330,390,400,426,479,574,732,899,1074,1010,1000]}
            href="#sec-chart2"
          />
          <MetricCard
            label="Independent food banks (est.)"
            value="1,500+"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Not counted in Trussell figures"
            sparklineData={[600,700,800,900,1000,1100,1200,1300,1400,1450,1500]}
            href="#sec-chart1"
          />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Trussell Trust food bank parcels, 2015\u20132025"
              subtitle="Annual food parcel distributions from Trussell Trust food banks (thousands). Each parcel provides 3 days of nutritionally balanced emergency food."
              series={series1}
              annotations={annotations1}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Reasons for food bank referrals, 2015\u20132025"
              subtitle="Proportion of food bank referrals citing benefit delays or low income as primary reason. Tracking the welfare system's role in food poverty."
              series={series2}
              annotations={annotations2}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Household Support Fund extended"
            value="\u00a31bn+"
            unit="Household Support Fund 2024-26"
            description="The government extended the Household Support Fund with \u00a31 billion in 2024-26, allowing councils to provide emergency food and energy vouchers to struggling households. An estimated 2.2 million households received support. In areas with well-designed schemes, food bank referrals fell by up to 15% compared to neighbouring authorities."
            source="Source: DLUHC \u2014 Household Support Fund evaluation, 2025. Trussell Trust \u2014 End of year statistics 2024-25."
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
