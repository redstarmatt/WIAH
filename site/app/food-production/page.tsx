'use client'

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface FoodProductionData {
  selfSufficiency: Array<{ year: number; pct: number }>;
  agriculturalOutput: Array<{ year: number; realTermsBillions: number }>;
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function FoodProductionPage() {
  const [data, setData] = useState<FoodProductionData | null>(null);

  useEffect(() => {
    fetch('/data/food-production/food_production.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const sufficiencySeries: Series[] = data
    ? [{
        id: 'self-sufficiency',
        label: 'UK food self-sufficiency',
        colour: '#2A9D8F',
        data: data.selfSufficiency.map(d => ({
          date: yearToDate(d.year),
          value: d.pct,
        })),
      }]
    : [];

  const outputSeries: Series[] = data
    ? [{
        id: 'agricultural-output',
        label: 'Total agricultural output (real terms)',
        colour: '#264653',
        data: data.agriculturalOutput.map(d => ({
          date: yearToDate(d.year),
          value: d.realTermsBillions,
        })),
      }]
    : [];

  return (
    <>
      <TopicNav topic="Food Production" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Food Production"
          question="Can Britain Feed Itself?"
          finding="The UK produces just 57.8&percnt; of its own food, down from 78&percnt; in 1984 and the lowest level since records began. Import dependency is rising at the same time as global food supply chains face growing disruption from climate change, geopolitical instability, and trade friction."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The UK is one of the least food self-sufficient countries in Western Europe. Defra&apos;s annual Agriculture in the United Kingdom report shows the ratio of domestic production to total food supply has fallen from around 78&percnt; in the mid-1980s to 57.8&percnt; in 2024, with indigenous-type food self-sufficiency at around 73&percnt;. Agricultural output has been broadly flat in real terms for a decade, at &pound;27.4 billion in 2024 (2023 prices), and the farming workforce has shrunk 30&percnt; since 2000 to 380,000. Post-Brexit policy has shifted from the area-based Basic Payment Scheme to Environmental Land Management, but uptake has been slower than expected &mdash; only 35&percnt; of eligible farmland enrolled by 2024 &mdash; creating a funding gap for smaller farms. The Ukraine crisis demonstrated the UK&apos;s exposure: wheat prices doubled in early 2022, fertiliser costs tripled, and food inflation peaked at 19.2&percnt; in March 2023, the highest in over 40 years.
            </p>
            <p>
              The decline in production capacity is uneven. Horticulture has contracted most sharply: the UK grows only 54&percnt; of its vegetables and 16&percnt; of its fruit, down from 78&percnt; and 35&percnt; respectively in 1990. Post-Brexit labour shortages have been acute, with the Seasonal Worker Visa scheme providing 45,000 visas against industry demand of 70,000+. Dairy farming has consolidated from 14,000 to 7,000 farms since 2005 while milk production has remained stable. Upland farmers in Wales, Northern England, and Scotland face the steepest income decline as Basic Payment Scheme payments &mdash; which could constitute 80&percnt; of income on hill farms &mdash; are withdrawn. The NFU argues food security should be treated as a strategic priority comparable to energy security; as of 2026 the government had not legislated for a statutory self-sufficiency target.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-sufficiency', label: 'Self-Sufficiency' },
          { id: 'sec-output', label: 'Agricultural Output' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="UK food self-sufficiency"
              value="57.8%"
              direction="down"
              polarity="up-is-good"
              changeText="Down from 78&percnt; in 1984 &middot; Lowest since records began"
              sparklineData={[61.2, 60.8, 60.5, 61.0, 60.7, 60.2, 59.6, 58.8, 58.2, 57.8]}
              source="Defra &middot; Agriculture in the UK 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Farm workforce"
              value="380K"
              direction="down"
              polarity="up-is-bad"
              changeText="Down 30&percnt; since 2000 &middot; Average farmer age: 60"
              sparklineData={[480, 460, 440, 420, 410, 400, 395, 390, 385, 380]}
              source="Defra &middot; Agriculture in the UK 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="UK-grown fruit"
              value="16%"
              direction="down"
              polarity="up-is-good"
              changeText="Down from 35&percnt; in 1990 &middot; Labour shortages hit horticulture hardest"
              sparklineData={[22, 21, 20, 19, 18, 18, 17, 17, 16]}
              source="Defra &middot; Horticulture Statistics 2024"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-sufficiency" className="mb-12">
            {sufficiencySeries.length > 0 ? (
              <LineChart
                title="UK food self-sufficiency, 2015&ndash;2024"
                subtitle="Ratio of domestic food production value to total food supply value. Indigenous-type food only."
                series={sufficiencySeries}
                yLabel="Percentage (%)"
                source={{
                  name: 'Defra',
                  dataset: 'Agriculture in the United Kingdom',
                  frequency: 'annual',
                  url: 'https://www.gov.uk/government/statistics/agriculture-in-the-united-kingdom',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-output" className="mb-12">
            {outputSeries.length > 0 ? (
              <LineChart
                title="UK total agricultural output, 2015&ndash;2024 (real terms)"
                subtitle="Gross output of UK agriculture, adjusted to 2023 prices. Weather and commodity price volatility drive year-to-year variation."
                series={outputSeries}
                yLabel="Output (&pound; billions)"
                source={{
                  name: 'Defra',
                  dataset: 'Agriculture in the United Kingdom',
                  frequency: 'annual',
                  url: 'https://www.gov.uk/government/statistics/agriculture-in-the-united-kingdom',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        {/* Sources */}
        <section className="border-t border-wiah-border pt-8 mt-12">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; methodology</h2>
          <div className="text-sm text-wiah-mid space-y-2">
            {data?.metadata.sources.map((src, i) => (
              <p key={i}>
                <strong>{src.name}.</strong> <em>{src.dataset}</em>. {src.frequency} &mdash;&nbsp;
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="underline text-wiah-blue hover:no-underline">
                  {src.url}
                </a>
              </p>
            ))}
          </div>
          <p className="text-sm text-wiah-mid mt-6">{data?.metadata.methodology}</p>
          {data?.metadata.knownIssues && data.metadata.knownIssues.length > 0 && (
            <div className="mt-6 p-4 bg-wiah-light rounded">
              <p className="font-bold text-wiah-black mb-2">Known issues:</p>
              <ul className="text-sm text-wiah-mid space-y-1 list-disc list-inside">
                {data.metadata.knownIssues.map((issue, i) => (
                  <li key={i}>{issue}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
