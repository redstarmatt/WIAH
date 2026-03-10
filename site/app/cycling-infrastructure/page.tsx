'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import PositiveCallout from '@/components/PositiveCallout';
import RelatedTopics from '@/components/RelatedTopics';

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
          label: 'Cycling modal share (% of all trips)',
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
          finding="Just 2.2% of all journeys in England are made by bike — compared with 27% in the Netherlands — and the figure has barely moved in a decade despite successive government cycling strategies. England has only 680 miles of protected cycle lanes. There are over 17,000 cyclist casualties every year, and the active travel budget was cut from £3 billion to £1.5 billion in 2024 before the mission was even halfway complete."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The United Kingdom has cycled through (and abandoned) cycling strategies at regular intervals since the 1990s without achieving the step-change in modal shift that has transformed transport in comparable European countries. The government's Cycling and Walking Investment Strategy, published in 2017, set a target for cycling to account for 10% of all journeys by 2025 — a target that is now, in 2026, clearly missed, with the modal share stubbornly at 2.2%. The strategy was backed by a promise of £3 billion in active travel investment through to 2025. In the 2024 Autumn Budget, the active travel budget was halved to approximately £1.5 billion — a decision that Active Travel England described as likely to cost more in NHS expenditure than it saves in infrastructure spending, given the proven health benefits of walking and cycling.
            </p>
            <p>
              The infrastructure gap between England and the cycling nations of northern Europe is vast and structural. The Netherlands has 35,000 kilometres of protected cycling infrastructure, built over 50 years of consistent investment. Denmark's Copenhagen has 390 kilometres of protected lanes within the city alone. England has approximately 680 miles (1,100 kilometres) of protected cycle lanes — nationally. The distinction between protected and unprotected infrastructure is critical: paint alone does not protect cyclists from vehicle collisions. Studies consistently show that cycling rates on streets with physical segregation are 4–6 times higher than on equivalent streets with only painted lanes. The Cycling UK charity's 2024 infrastructure audit found that more than 60% of English cycling infrastructure consists of shared footways, advisory cycle lanes, or painted lanes without physical barriers — facilities that many experienced cyclists regard as worse than usable because they encourage close passes from motorists.
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
              changeText="Barely moved since 2015 · Netherlands: 27% · 2030 target: 10%"
              sparklineData={[1.8, 1.9, 2.0, 2.1, 2.2, 2.5, 2.3, 2.2]}
              source="DfT · National Travel Survey 2024"
              href="#sec-modal"
            />
            <MetricCard
              label="Protected cycle lane miles (England)"
              value="680"
              direction="up"
              polarity="up-is-good"
              changeText="Up from 300 miles in 2015 · Netherlands equivalent: 21,000 miles"
              sparklineData={[300, 350, 400, 460, 520, 600, 650, 680]}
              source="Active Travel England · Infrastructure Audit 2024"
              href="#sec-modal"
            />
            <MetricCard
              label="Cyclist casualties per year"
              value="17,200"
              direction="flat"
              polarity="up-is-bad"
              changeText="880 killed or seriously injured · True figure estimated 2–3&times; higher"
              sparklineData={[17500, 17200, 16800, 17100, 9800, 15200, 17000, 17200]}
              source="DfT · Reported Road Casualties Great Britain 2023"
              href="#sec-modal"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What is getting better"
            value="4–5%"
            unit="London modal share"
            description="London's cycling modal share has risen to 4–5% — double the national average — with inner-borough hotspots reaching 20%. Cycling to work across all settings generates £2.1 billion in NHS savings annually through improved cardiovascular and mental health. Mini-Holland schemes in Waltham Forest and Enfield show it is possible to achieve Dutch-style cycling rates in English urban neighbourhoods with the right investment."
            source="TfL · Cycling Data 2024 · Cycling UK NHS Savings Analysis"
          />
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-modal" className="mb-12">
            {modalShareSeries.length > 0 ? (
              <LineChart
                title="Cycling modal share in England, 2015–2024"
                subtitle="Percentage of all trips made by bicycle. 2020 spike reflects COVID lockdowns; subsequent return to baseline confirms structural not behavioural shift."
                series={modalShareSeries}
                targetLine={targetLine}
                yLabel="% of all trips"
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
                title="Protected cycle lane miles in England, 2015–2024"
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
                <strong>{src.name}.</strong> <em>{src.dataset}</em>. {src.frequency} — 
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
              <RelatedTopics />
      </main>
    </>
  );
}
