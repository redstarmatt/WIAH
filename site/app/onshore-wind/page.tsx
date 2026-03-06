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
            <p>Onshore wind is the UK&apos;s cheapest form of electricity generation at under &pound;50 per megawatt-hour &mdash; cheaper than new gas, nuclear, and offshore wind. Yet between 2015 and 2023, England effectively banned it. A Written Ministerial Statement in June 2015 changed the planning rules so that local communities could veto any onshore wind proposal, and planning inspectors interpreted this as an outright ban. In the eight years that followed, barely a single new turbine was consented in England. The consequences were measurable: Aurora Energy Research estimated in 2023 that UK households paid &pound;13bn more for energy over those eight years than they would have if the cheapest available technology had been permitted to build at the same rate as before the ban. Scotland and Wales, where planning devolution meant different rules applied, continued building throughout &mdash; Scotland now accounts for around 8.5 GW of the UK&apos;s 15.9 GW total onshore wind capacity, nearly 55% of the total from a nation with 8% of the UK&apos;s population. The disparity is stark: parts of northern Scotland have more wind capacity per head than Denmark.</p>
            <p>The ban was formally lifted in September 2023, when the government revised the National Planning Policy Framework to allow onshore wind proposals on the same basis as other infrastructure. Planning consents in England jumped from a handful per year to 38 in 2023, and the early signs from 2024 are that the pipeline is beginning to recover. The government set a target of 35 GW of onshore wind by 2030, up from under 16 GW in 2024, requiring roughly 3 GW of new capacity per year &mdash; roughly double the current deployment rate. The Contracts for Difference mechanism has been reopened to onshore wind in England, with the first CfD-supported English projects beginning construction in 2024. However, the time from planning consent to grid connection averages three to four years for onshore wind, meaning projects consented in 2023 and 2024 will not generate electricity until 2026 at the earliest. National Grid&apos;s grid connection queue bottleneck affects onshore wind as it does solar.</p>
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
