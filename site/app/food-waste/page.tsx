'use client';

import { useState, useEffect } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

interface FoodWasteData {
  national: {
    timeSeries: Array<{ date: string; totalWasteMt: number; householdWasteMt: number }>;
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

function yearToDate(y: string): Date {
  return new Date(parseInt(y), 6, 1);
}

export default function FoodWastePage() {
  const [data, setData] = useState<FoodWasteData | null>(null);

  useEffect(() => {
    fetch('/data/food-waste/food_waste.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const totalSeries: Series[] = data
    ? [
        {
          id: 'total-waste',
          label: 'Total food waste',
          colour: '#F4A261',
          data: data.national.timeSeries.map(d => ({ date: yearToDate(d.date), value: d.totalWasteMt })),
        },
        {
          id: 'household-waste',
          label: 'Household food waste',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({ date: yearToDate(d.date), value: d.householdWasteMt })),
        },
      ]
    : [];

  return (
    <>
      <TopicNav topic="Food Waste" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Food Waste"
          question="How Much Food Does Britain Throw Away?"
          finding="The UK wastes 9.5 million tonnes of food annually &mdash; worth &pound;19bn &mdash; with households responsible for around 70% by weight. Simultaneously, 7 million people struggle to afford adequate food. The waste is declining slowly but is on track to miss the UN Sustainable Development Goal of halving food waste by 2030."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK wastes approximately 9.5 million tonnes of food annually across the whole supply chain &mdash; households account for around 6.4 million tonnes (70% by weight). WRAP estimates the household food waste bill at &pound;19bn per year, or around &pound;700 per household. Around 50% of household food waste is food that was still edible when discarded &mdash; bread, salad, and fruit. Environmental impact compounds the economic cost: embedded carbon in wasted food amounts to around 25 million tonnes of CO2-equivalent per year. Total food waste has fallen from an estimated 11.5 million tonnes in 2007 to 9.5 million tonnes in 2023 &mdash; an 18% reduction &mdash; but over the period 2015&ndash;2023 progress has stalled. The UN SDG 12.3 target requires a 50% per capita reduction by 2030; at current rates the UK will fall far short. A mandatory food waste reporting requirement for large food businesses was consulted on in 2022 but had not been enacted as of early 2026.</p>
            <p>This waste coexists with acute food insecurity: around 7 million UK adults lived in food-insecure households in 2023. Higher-income households waste more in absolute terms; lower-income households waste a higher proportion of their budget. Community fridges, OLIO, Too Good To Go, and FareShare redistribute food that would otherwise be wasted while also addressing insecurity &mdash; but these remain fragmented charitable interventions rather than a systematic response. The Courtauld Commitment 2030, signed by retailers accounting for over 80% of UK grocery sales, targets a further 50% reduction in food waste; whether voluntary action alone can achieve it, against the backdrop of stalled progress, remains doubtful.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-waste', label: 'Waste Trends' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Total food waste per year"
              value="9.5M"
              unit="tonnes"
              direction="down"
              polarity="up-is-bad"
              changeText="Down 18% since 2007 but progress has stalled &mdash; SDG target: 50% by 2030"
              sparklineData={[10.2, 10.0, 9.8, 9.6, 9.4, 9.5, 9.5, 9.5]}
              source="WRAP &mdash; UK food waste estimates 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Cost of household food waste"
              value="&pound;19bn"
              direction="down"
              polarity="up-is-bad"
              changeText="Around &pound;700 per household per year &mdash; 50% of wasted food was still edible"
              sparklineData={[21, 20, 20, 19, 19, 19, 19, 19]}
              source="WRAP &mdash; Household food waste in the UK 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="Food waste per household per year"
              value="&pound;700"
              direction="down"
              polarity="up-is-bad"
              changeText="Equivalent to 20 meals per month per household thrown in the bin"
              sparklineData={[760, 740, 720, 710, 700, 700, 700, 700]}
              source="WRAP &mdash; Household food waste measurement 2023"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-waste" className="mb-12">
            <LineChart
              title="UK food waste by source, 2015&ndash;2023"
              subtitle="Total and household food waste in million tonnes. WRAP food surplus and waste estimates."
              series={totalSeries}
              yLabel="Million tonnes"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="18% Reduction Since 2007"
            value="9.5Mt"
            unit="down from 11.5Mt in 2007"
            description="UK food waste has fallen 18% since 2007, among the better OECD performances. Too Good To Go, OLIO, and community fridges are redistributing food at scale. The Courtauld Commitment 2030 &mdash; signed by retailers accounting for over 80% of UK grocery sales &mdash; targets a further 50% reduction in food waste by 2030. Mandatory food waste reporting for large businesses, if enacted, would drive faster progress through transparency and accountability."
            source="Source: WRAP &mdash; UK food waste estimates; Courtauld Commitment 2030 progress report."
          />
        </ScrollReveal>

        <ScrollReveal>
          <section className="mt-8 pt-12 border-t border-wiah-border">
            <h2 className="font-sans text-2xl font-bold text-wiah-black mb-6">Sources &amp; Methodology</h2>
            {data && (
              <div className="font-sans text-sm space-y-6">
                <div>
                  <h3 className="font-bold text-wiah-black mb-2">Data sources</h3>
                  <ul className="space-y-2">
                    {data.metadata.sources.map((src, idx) => (
                      <li key={idx} className="text-wiah-mid">
                        <strong className="text-wiah-black">{src.name}:</strong>&nbsp;
                        <a href={src.url} target="_blank" rel="noopener noreferrer" className="underline text-wiah-blue">
                          {src.dataset}
                        </a>
                        &nbsp;({src.frequency})
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-wiah-black mb-2">Methodology</h3>
                  <p className="text-wiah-mid">{data.metadata.methodology}</p>
                </div>
                <div>
                  <h3 className="font-bold text-wiah-black mb-2">Known issues</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {data.metadata.knownIssues.map((issue, idx) => (
                      <li key={idx} className="text-wiah-mid">{issue}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </section>
        </ScrollReveal>
      </main>
    </>
  );
}
