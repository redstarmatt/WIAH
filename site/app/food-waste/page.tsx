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
            <p>The UK wastes approximately 9.5 million tonnes of food annually across the whole supply chain &mdash; from farm gate through manufacturing, retail, and hospitality, to the household bin. Of this, households account for around 6.4 million tonnes, or roughly 70% by weight. WRAP &mdash; the Waste and Resources Action Programme &mdash; estimates the household food waste bill at &pound;19bn per year, or around &pound;700 per household, making it among the most significant items in the average household budget after housing, transport, and energy. The food thrown away is not predominantly food past its use-by date: around 50% of household food waste is food that was still edible when discarded, including bread, salad, and fruit. Environmental impact compounds the economic cost: food waste is responsible for approximately 6% of global greenhouse gas emissions when production, transportation, and decomposition are all accounted for. In the UK, the embedded carbon in wasted food amounts to around 25 million tonnes of CO2-equivalent per year. Yet the scale of food waste coexists with acute food insecurity: the Food Foundation estimates that around 7 million UK adults live in households that experienced food insecurity in 2023 &mdash; sometimes going a whole day without eating.</p>
            <p>Progress on reducing food waste has been made but at a slow and insufficient rate. WRAP data shows total UK food waste fell from an estimated 11.5 million tonnes in 2007 to 9.5 million tonnes in 2023 &mdash; a reduction of around 18% over sixteen years. The headline improvement is partly methodological: WRAP revised its measurement approach in 2018, making the comparison imperfect. Over the more recent period 2015&ndash;2023, total waste has barely moved. The UN Sustainable Development Goal 12.3 requires a 50% reduction in food waste per capita at retail and consumer level by 2030 &mdash; an ambition that would require the UK to cut household waste from around 6.4 million tonnes to around 3.2 million tonnes in seven years. At current rates of progress, the UK will fall far short. The Courtauld Commitment &mdash; a voluntary industry agreement led by WRAP &mdash; has engaged major retailers and food manufacturers in waste reduction targets, but voluntary action has inherent limits and progress has been slower than hoped.</p>
            <p>Food waste has multiple causes that vary across the supply chain. At household level, the primary drivers identified by WRAP are: overbuying, poor meal planning, misunderstanding of date labels (particularly the difference between &ldquo;best before&rdquo; and &ldquo;use by&rdquo;), and packaging sizes that do not match household needs. At manufacturing level, process losses, quality grading rejections, and batch failures account for the majority of waste. At retail level, over-ordering to ensure full shelves, product promotions that encourage over-purchase, and aesthetic grading of fruit and vegetables contribute significantly. Agricultural or &ldquo;farm gate&rdquo; losses &mdash; vegetables left unharvested because of cosmetic imperfections or market price movements &mdash; are poorly measured but thought to be substantial. The UK government&apos;s waste prevention policy relies primarily on voluntary industry agreements and consumer education campaigns rather than regulation. A mandatory food waste reporting requirement for large food businesses was consulted on in 2022 but had not been enacted as of early 2026.</p>
            <p>The geography of food waste in the UK is somewhat less pronounced than other environmental issues, but patterns do emerge. Higher-income households waste more in absolute terms because they buy more food, but lower-income households waste a higher proportion of their food budget. Urban areas generate more hospitality and food service waste per capita than rural areas. Scotland introduced the Good Food Nation Act in 2022, creating a statutory framework for food policy including waste reduction, representing a more interventionist approach than England. Northern Ireland and Wales both have active food waste reduction programmes through their respective environment agencies. The Trussell Trust network of food banks distributed 3.1 million emergency food parcels in 2023&ndash;24, and community fridges, food sharing apps like OLIO and Too Good To Go, and social supermarkets have expanded rapidly in urban areas, redistributing food that would otherwise be wasted while also addressing food insecurity.</p>
            <p>Food waste statistics require careful handling. WRAP&apos;s estimates are derived from a combination of methods &mdash; bin compositional analysis, diary studies, and industry reporting &mdash; each with its own uncertainties. The total figure of 9.5 million tonnes is a &ldquo;best estimate&rdquo; within a range, and different organisations using different boundary definitions produce different numbers. The distinction between &ldquo;avoidable&rdquo; waste (food that was edible when thrown away) and &ldquo;unavoidable&rdquo; waste (peelings, bones) affects comparisons over time and across countries. The &pound;19bn cost figure uses average 2023 food prices applied to wasted quantities, and the per-household figure assumes even distribution across all households (in practice, high-income households waste significantly more in monetary terms). Farm gate waste is the least well-measured component: there is no mandatory reporting, and industry estimates vary widely. The methodology change in 2018 means WRAP explicitly cautions against comparing pre- and post-2018 figures as a measure of trend.</p>
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
