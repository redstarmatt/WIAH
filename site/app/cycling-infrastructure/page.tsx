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

interface CyclingInfrastructureData {
  timeSeries: Array<{ date: string; cyclingSharePct: number; protectedLanesMiles: number }>;
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

export default function CyclingInfrastructurePage() {
  const [data, setData] = useState<CyclingInfrastructureData | null>(null);

  useEffect(() => {
    fetch('/data/cycling-infrastructure/cycling_infrastructure.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const modalShareSeries: Series[] = data
    ? [
        {
          id: 'cycling-share',
          label: 'Cycling modal share (&percnt; of all trips)',
          colour: '#2A9D8F',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.date),
            value: d.cyclingSharePct,
          })),
        },
      ]
    : [];

  const targetLine = { value: 10, label: '2030 target: 10%', colour: '#2A9D8F' };

  const lanesSeries: Series[] = data
    ? [
        {
          id: 'protected-lanes',
          label: 'Protected cycle lane miles (England)',
          colour: '#2A9D8F',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.date),
            value: d.protectedLanesMiles,
          })),
        },
      ]
    : [];

  return (
    <>
      <TopicNav topic="Cycling Infrastructure" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Cycling Infrastructure"
          preposition="in"
          question="Why Is Britain Still So Dangerous for Cyclists?"
          finding="Just 2.2&percnt; of all journeys in England are made by bike &mdash; compared with 27&percnt; in the Netherlands &mdash; and the figure has barely moved in a decade despite successive government cycling strategies. England has only 680 miles of protected cycle lanes. There are over 17,000 cyclist casualties every year, and the active travel budget was cut from &pound;3 billion to &pound;1.5 billion in 2024 before the mission was even halfway complete."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Just 2.2&percnt; of all journeys in England are made by bike &mdash; against 27&percnt; in the Netherlands &mdash; and the figure has barely moved in a decade despite successive cycling strategies. The 2017 Cycling and Walking Investment Strategy promised &pound;3 billion and a 10&percnt; modal share target by 2025; neither has been met, and the 2024 Autumn Budget halved the active travel budget to &pound;1.5 billion. England has only 680 miles of physically protected cycle lanes nationally, compared with 35,000 kilometres in the Netherlands, and over 60&percnt; of English cycling infrastructure consists of painted lanes or shared footways that studies show generate cycling rates 4&ndash;6 times lower than physically segregated routes. Over 17,000 cyclist casualties occurred in England in 2023, of which approximately 880 were killed or seriously injured &mdash; a figure Cycling UK estimates is 2&ndash;3 times higher in reality due to under-reporting.
            </p>
            <p>
              The cycling gap is structured by geography and income. London&apos;s modal share has reached 4&ndash;5&percnt; &mdash; with Hackney exceeding 20&percnt; for commuting &mdash; while Northern cities remain in the low single figures. Cambridge and Oxford are outliers with flat topography and established cycling cultures. HGV lorries cause approximately 20&percnt; of cyclist fatalities despite making up 5&percnt; of traffic, with the highest risk at urban junctions lacking segregated infrastructure. Mini-Holland schemes in Waltham Forest and Enfield demonstrate that Dutch-style cycling rates are achievable in English urban neighbourhoods, but replication requires sustained investment that the 2024 budget cuts have made significantly less likely.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-modal', label: 'Modal Share' },
          { id: 'sec-lanes', label: 'Infrastructure' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Cycling share of all trips (England)"
              value="2.2%"
              direction="flat"
              polarity="up-is-good"
              changeText="Barely moved since 2015 &middot; Netherlands: 27&percnt; &middot; 2030 target: 10&percnt;"
              sparklineData={[1.8, 1.9, 2.0, 2.1, 2.2, 2.5, 2.3, 2.2]}
              source="DfT &middot; National Travel Survey 2024"
              href="#sec-modal"/>
            <MetricCard
              label="Protected cycle lane miles (England)"
              value="680"
              direction="up"
              polarity="up-is-good"
              changeText="Up from 300 miles in 2015 &middot; Netherlands equivalent: 21,000 miles"
              sparklineData={[300, 350, 400, 460, 520, 600, 650, 680]}
              source="Active Travel England &middot; Infrastructure Audit 2024"
              href="#sec-lanes"/>
            <MetricCard
              label="Cyclist casualties per year"
              value="17,200"
              direction="flat"
              polarity="up-is-bad"
              changeText="880 killed or seriously injured &middot; True figure estimated 2&ndash;3&times; higher"
              sparklineData={[17500, 17200, 16800, 17100, 9800, 15200, 17000, 17200]}
              source="DfT &middot; Reported Road Casualties Great Britain 2023"
              href="#sec-lanes"/>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What is getting better"
            value="4&ndash;5%"
            unit="London modal share"
            description="London&apos;s cycling modal share has risen to 4&ndash;5&percnt; &mdash; double the national average &mdash; with inner-borough hotspots reaching 20&percnt;. Cycling to work across all settings generates &pound;2.1 billion in NHS savings annually through improved cardiovascular and mental health. Mini-Holland schemes in Waltham Forest and Enfield show it is possible to achieve Dutch-style cycling rates in English urban neighbourhoods with the right investment."
            source="TfL &middot; Cycling Data 2024 &middot; Cycling UK NHS Savings Analysis"
          />
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-modal" className="mb-12">
            {modalShareSeries.length > 0 ? (
              <LineChart
                title="Cycling modal share in England, 2015&ndash;2024"
                subtitle="Percentage of all trips made by bicycle. 2020 spike reflects COVID lockdowns; subsequent return to baseline confirms structural not behavioural shift."
                series={modalShareSeries}
                targetLine={targetLine}
                yLabel="&percnt; of all trips"
                source={{
                  name: 'Department for Transport',
                  dataset: 'National Travel Survey: England',
                  frequency: 'annual',
                  url: 'https://www.gov.uk/government/collections/national-travel-survey-statistics',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-lanes" className="mb-12">
            {lanesSeries.length > 0 ? (
              <LineChart
                title="Protected cycle lane miles in England, 2015&ndash;2024"
                subtitle="Miles of physically segregated cycling infrastructure. Excludes painted lanes, shared footways, and advisory routes."
                series={lanesSeries}
                yLabel="Miles of protected lanes"
                source={{
                  name: 'Active Travel England',
                  dataset: 'Cycling and Walking Investment Strategy: Annual Report',
                  frequency: 'annual',
                  url: 'https://www.gov.uk/government/publications/cycling-and-walking-investment-strategy',
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
