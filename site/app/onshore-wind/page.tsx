'use client';

import { useState, useEffect } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

interface OnshoreWindData {
  national: {
    timeSeries: Array<{ date: string; ukCapacityGW: number; englandCapacityGW: number; scotlandWalesGW: number }>;
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

export default function OnshoreWindPage() {
  const [data, setData] = useState<OnshoreWindData | null>(null);

  useEffect(() => {
    fetch('/data/onshore-wind/onshore_wind.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const capacitySeries: Series[] = data
    ? [
        {
          id: 'uk-total',
          label: 'UK total onshore wind',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({ date: yearToDate(d.date), value: d.ukCapacityGW })),
        },
        {
          id: 'england',
          label: 'England only',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({ date: yearToDate(d.date), value: d.englandCapacityGW })),
        },
        {
          id: 'scotland-wales',
          label: 'Scotland &amp; Wales',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({ date: yearToDate(d.date), value: d.scotlandWalesGW })),
        },
      ]
    : [];

  const englandSeries: Series[] = data
    ? [{
        id: 'england-capacity',
        label: 'England onshore wind capacity',
        colour: '#E63946',
        data: data.national.timeSeries.map(d => ({ date: yearToDate(d.date), value: d.englandCapacityGW })),
      }]
    : [];

  return (
    <>
      <TopicNav topic="Onshore Wind" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Onshore Wind"
          question="Why Did Britain Stop Building the World&apos;s Cheapest Energy?"
          finding="A de facto ban on onshore wind in England between 2015 and 2023 cost an estimated &pound;13bn in higher energy bills over 8 years. England&apos;s capacity flatlined while Scotland and Wales continued to build. The ban was lifted in 2023 but the planning pipeline remains slow to translate into turbines."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Onshore wind is the UK&apos;s cheapest form of electricity generation at under &pound;50 per megawatt-hour, yet between 2015 and 2023 England effectively banned it. A June 2015 Written Ministerial Statement gave local communities effective veto over any proposal; planning inspectors treated this as an outright ban and barely a single turbine was consented in England for eight years. Aurora Energy Research estimated in 2023 that UK households paid &pound;13bn more for energy over that period than they would have if deployment had continued at pre-ban rates &mdash; the National Audit Office called it one of the costliest energy policy decisions of the decade. Scotland, unaffected by England&apos;s planning rules, continued building throughout and now accounts for 8.5 GW of the UK&apos;s 15.9 GW total &mdash; nearly 55&percnt; from a nation with 8&percnt; of the population. The ban was formally lifted in September 2023; planning consents jumped to 38 in 2023, the CfD mechanism was reopened to English projects, and the government set a 35 GW by 2030 target.</p>
            <p>The energy security cost became clear when the 2022 gas price shock more than doubled UK household energy bills and the Energy Price Guarantee cost the Treasury &pound;25bn in 2022&ndash;23 alone. Had England built onshore wind at Scotland&apos;s rate, gas dependence would have been meaningfully lower. Recovery from the ban now faces grid connection bottlenecks and a three-to-four-year consent-to-generation lag, meaning 2023&ndash;24 consents will not generate electricity until 2026 at the earliest. England&apos;s 2.4 GW is spread across Yorkshire, Cumbria, and Lancashire; the South, Midlands, and East Anglia have almost none, reflecting the geographic pattern of planning opposition that drove the original ban.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-capacity', label: 'UK vs England' },
          { id: 'sec-england', label: 'England Detail' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="England onshore wind capacity"
              value="2.4"
              unit="GW"
              direction="flat"
              polarity="up-is-good"
              changeText="Flatlined since 2015 &mdash; Scotland has 8.5 GW by comparison"
              sparklineData={[2.1, 2.2, 2.3, 2.3, 2.3, 2.4, 2.4, 2.4]}
              source="DESNZ &mdash; Renewable electricity capacity statistics"
              onExpand={() => {}}
            />
            <MetricCard
              label="UK total onshore wind"
              value="15.9"
              unit="GW"
              direction="up"
              polarity="up-is-good"
              changeText="Growth driven almost entirely by Scotland &mdash; target: 35 GW by 2030"
              sparklineData={[8.7, 10.3, 11.8, 13.0, 14.1, 14.9, 15.4, 15.9]}
              source="DESNZ &mdash; Renewable electricity capacity statistics"
              onExpand={() => {}}
            />
            <MetricCard
              label="England planning consents (2023)"
              value="38"
              direction="up"
              polarity="up-is-good"
              changeText="Recovering from near-zero during 2015&ndash;2022 ban &mdash; was 180 in 2012"
              sparklineData={[180, 50, 12, 4, 6, 8, 15, 38]}
              source="DESNZ &mdash; Renewable energy planning database"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-capacity" className="mb-12">
            <LineChart
              title="UK onshore wind capacity: England vs Scotland &amp; Wales, 2010&ndash;2024"
              subtitle="Gigawatts of installed onshore wind. England flatlined under planning ban 2015&ndash;2023. DESNZ."
              series={capacitySeries}
              yLabel="GW installed"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-england" className="mb-12">
            <LineChart
              title="England onshore wind capacity, 2010&ndash;2024"
              subtitle="England capacity only, showing the eight-year freeze under the de facto planning ban. DESNZ."
              series={englandSeries}
              yLabel="GW installed"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Under &pound;50/MWh"
            value="Cheapest"
            unit="electricity source in the UK"
            description="Onshore wind is now the cheapest form of electricity in the UK, at under &pound;50 per megawatt-hour without subsidy &mdash; below new gas, offshore wind, and nuclear. With the planning ban lifted, Scotland has 10 GW in the pipeline &mdash; enough to power every Scottish home twice over. England saw 38 planning consents in 2023, up from near-zero during the ban years. Contracts for Difference have reopened to English projects for the first time in a decade."
            source="Source: Aurora Energy Research 2023; DESNZ renewable energy planning database 2024."
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
