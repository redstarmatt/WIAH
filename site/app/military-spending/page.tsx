'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import PositiveCallout from '@/components/PositiveCallout';

// ── Types ────────────────────────────────────────────────────────────────────

interface MilitarySpendingData {
  timeSeries: Array<{ date: string; defencePctGdp: number; regularPersonnel: number }>;
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: string): Date {
  return new Date(parseInt(y), 6, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function MilitarySpendingPage() {
  const [data, setData] = useState<MilitarySpendingData | null>(null);

  useEffect(() => {
    fetch('/data/military-spending/military_spending.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const defenceGdpSeries: Series[] = data
    ? [
        {
          id: 'defence-pct-gdp',
          label: 'UK defence spend as &percnt; of GDP',
          colour: '#6B7280',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.date),
            value: d.defencePctGdp,
          })),
        },
      ]
    : [];

  const targetLine = { value: 2.0, label: 'NATO 2% target', colour: '#2A9D8F' };

  const personnelSeries: Series[] = data
    ? [
        {
          id: 'regular-personnel',
          label: 'UK regular armed forces personnel',
          colour: '#6B7280',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.date),
            value: d.regularPersonnel,
          })),
        },
      ]
    : [];

  return (
    <>
      <TopicNav topic="Military Spending" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Military Spending"
          preposition="on"
          question="Is Britain Spending Enough on Defence?"
          finding="UK defence spending is 2.3&percnt; of GDP &mdash; meeting NATO&apos;s 2&percnt; target &mdash; but the British Army is at its smallest since the Napoleonic Wars at 73,000 regular soldiers, total armed forces have fallen from 212,000 in 2000 to approximately 148,000, and senior defence figures warn that equipment stockpiles are at &ldquo;dangerously low&rdquo; levels in the context of rising threats from Russia and other state actors."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The UK has spent at or above NATO&apos;s 2&percnt; of GDP target continuously since 2014, with the current figure of 2.3&percnt; representing approximately &pound;55 billion annually. The 2024 Strategic Defence Review set a pathway to 2.5&percnt; by the early 2030s, prompted by Russia&apos;s full-scale invasion of Ukraine in 2022. The Army now stands at approximately 73,000 regular troops &mdash; the lowest on record and smaller than at any time since Waterloo in 1815 &mdash; after consecutive reviews cut the target from 82,000 in 2010 to 72,500 in 2021. The 2023 recruiting shortfall was the largest on record: 6,600 soldiers joined against a target of 9,000. The House of Commons Defence Select Committee found in 2023 that stockpiles of critical munitions had fallen to levels sufficient for only days of high-intensity conflict, and that British industry lacks the capacity to replenish them at wartime rates.
            </p>
            <p>
              The &pound;55 billion headline masks a constrained discretionary budget: large fixed commitments to nuclear deterrence, officer pensions, and legacy system maintenance reduce the proportion available for new platforms and ammunition. The geographic concentration of defence spending creates significant regional dependency &mdash; Scotland&apos;s defence industry employs around 50,000 people, the South West is heavily reliant on Devonport and Yeovilton, and the North East on BAE Systems shipbuilding &mdash; meaning procurement decisions carry substantial economic consequences for communities already exposed to deindustrialisation. UK defence exports reached &pound;14 billion in 2022, a record, supporting around 260,000 supply chain jobs.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-gdp', label: 'Defence &percnt; of GDP' },
          { id: 'sec-personnel', label: 'Armed Forces Size' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Defence spending as &percnt; of GDP"
              value="2.3%"
              direction="up"
              polarity="up-is-good"
              changeText="Above NATO 2&percnt; target &middot; Commitment to 2.5&percnt; by 2030s &middot; &pound;55bn/yr"
              sparklineData={[2.2, 2.1, 2.0, 2.0, 2.1, 2.2, 2.3, 2.3]}
              source="NATO &middot; Defence Expenditure Report 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Regular army headcount"
              value="73,000"
              direction="down"
              polarity="up-is-bad"
              changeText="Smallest since Napoleonic Wars &middot; Down from 212,000 in 2000 &middot; Recruiting shortfall: 27&percnt;"
              sparklineData={[178000, 165000, 150000, 140000, 132000, 130000, 127000, 73000]}
              source="Ministry of Defence &middot; Armed Forces Personnel Statistics 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Defence equipment budget"
              value="&pound;21bn"
              direction="flat"
              polarity="up-is-good"
              changeText="Ammunition stockpiles below multi-week conflict threshold &middot; Industrial base rebuilding"
              sparklineData={[16, 17, 18, 18, 19, 20, 21, 21]}
              source="MOD &middot; UK Defence in Numbers 2023"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What is getting better"
            value="&pound;14bn"
            unit="defence exports (2022 record)"
            description="The UK is a nuclear-armed permanent UN Security Council member with some of the world&apos;s most sophisticated intelligence, cyber, and special forces capabilities. Defence exports reached &pound;14 billion in 2022, a record high, supporting 260,000 jobs. Investment announcements following the Ukraine war are beginning to rebuild ammunition production capacity and industrial readiness."
            source="DSEI &middot; UK Defence Export Statistics 2022 &middot; MOD"
          />
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-gdp" className="mb-12">
            {defenceGdpSeries.length > 0 ? (
              <LineChart
                title="UK defence spending as &percnt; of GDP, 2000&ndash;2023"
                subtitle="NATO standardised methodology. Includes nuclear, pensions, and some civil costs. 2&percnt; is the Alliance-wide target."
                series={defenceGdpSeries}
                targetLine={targetLine}
                yLabel="&percnt; of GDP"
                source={{
                  name: 'NATO',
                  dataset: 'Defence Expenditure of NATO Countries',
                  frequency: 'annual',
                  url: 'https://www.nato.int/cps/en/natohq/news_197050.htm',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-personnel" className="mb-12">
            {personnelSeries.length > 0 ? (
              <LineChart
                title="UK regular armed forces personnel, 2000&ndash;2023"
                subtitle="Total regular service personnel across Army, Royal Navy, and Royal Air Force. Note: 2023 figure shown is Army only (73,000); total all-services is approx. 148,000."
                series={personnelSeries}
                yLabel="Regular personnel"
                source={{
                  name: 'Ministry of Defence',
                  dataset: 'UK Armed Forces Personnel Statistics',
                  frequency: 'quarterly',
                  url: 'https://www.gov.uk/government/statistics/uk-armed-forces-personnel-numbers',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

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
