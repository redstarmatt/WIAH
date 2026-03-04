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
              The United Kingdom has cycled through (and abandoned) cycling strategies at regular intervals since the 1990s without achieving the step-change in modal shift that has transformed transport in comparable European countries. The government&apos;s Cycling and Walking Investment Strategy, published in 2017, set a target for cycling to account for 10&percnt; of all journeys by 2025 &mdash; a target that is now, in 2026, clearly missed, with the modal share stubbornly at 2.2&percnt;. The strategy was backed by a promise of &pound;3 billion in active travel investment through to 2025. In the 2024 Autumn Budget, the active travel budget was halved to approximately &pound;1.5 billion &mdash; a decision that Active Travel England described as likely to cost more in NHS expenditure than it saves in infrastructure spending, given the proven health benefits of walking and cycling.
            </p>
            <p>
              The infrastructure gap between England and the cycling nations of northern Europe is vast and structural. The Netherlands has 35,000 kilometres of protected cycling infrastructure, built over 50 years of consistent investment. Denmark&apos;s Copenhagen has 390 kilometres of protected lanes within the city alone. England has approximately 680 miles (1,100 kilometres) of protected cycle lanes &mdash; nationally. The distinction between protected and unprotected infrastructure is critical: paint alone does not protect cyclists from vehicle collisions. Studies consistently show that cycling rates on streets with physical segregation are 4&ndash;6 times higher than on equivalent streets with only painted lanes. The Cycling UK charity&apos;s 2024 infrastructure audit found that more than 60&percnt; of English cycling infrastructure consists of shared footways, advisory cycle lanes, or painted lanes without physical barriers &mdash; facilities that many experienced cyclists regard as worse than usable because they encourage close passes from motorists.
            </p>
            <p>
              Cyclist casualties are consistently high and, unlike overall road casualty rates (which have fallen significantly since 2000), have not declined proportionately. The Department for Transport&apos;s Stats19 data shows over 17,000 cyclist casualties in England in 2023, of which approximately 880 were killed or seriously injured (KSI). This figure refers only to police-reported incidents; Cycling UK estimates that the true number of KSI casualties is 2&ndash;3 times higher due to systematic under-reporting, particularly of self-reported minor incidents. HGV lorries account for a disproportionate share of cyclist fatalities &mdash; approximately 20&percnt; of deaths despite making up 5&percnt; of traffic; the introduction of safer lorry cabs following EU legislation (later retained in UK law) has reduced but not eliminated this risk. The most dangerous locations are high-speed rural roads and urban junctions without segregated infrastructure.
            </p>
            <p>
              The patterns of who cycles and who does not cycle are highly structured by geography, income, and demographics. Cycling rates in rural areas are marginally higher than urban averages, but rural cycling is dominated by leisure rather than utility trips: most rural cyclists ride for recreation rather than to get to work or school. Urban cycling, where the potential for substituting car journeys is greatest, is concentrated in a small number of cities. London&apos;s cycling modal share has risen to approximately 4&ndash;5&percnt; and is substantially higher in inner London boroughs (Hackney reaches 20&percnt; for commuting); outside London, Cambridge (30&percnt; modal share) and Oxford (20&percnt;) are outliers with flat topography, compact centres, and long-established cycling cultures. Northern cities &mdash; Leeds, Manchester, Sheffield &mdash; have seen growth in cycling but from very low bases, and share the flat-city advantage only in specific corridors.
            </p>
            <p>
              Measuring the true benefits of cycling infrastructure is complicated by the time lags between investment and behaviour change. Studies of Cycle Superhighways in London, Mini-Hollands in Waltham Forest and Enfield, and the Transforming Cities Fund schemes in Birmingham and Sheffield consistently find that well-designed, physically protected routes generate sustained increases in cycling uptake &mdash; sometimes doubling or tripling flows within five years. But measuring the counterfactual &mdash; what cycling rates would have been without investment &mdash; is methodologically challenging. Benefit-cost ratios for cycling infrastructure range from 2:1 to 10:1 in the published literature, depending on what NHS, congestion, and air quality benefits are included. The active travel investment cuts in 2024 are therefore likely to generate costs that dwarf the immediate savings.
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
              onExpand={() => {}}
            />
            <MetricCard
              label="Protected cycle lane miles (England)"
              value="680"
              direction="up"
              polarity="up-is-good"
              changeText="Up from 300 miles in 2015 &middot; Netherlands equivalent: 21,000 miles"
              sparklineData={[300, 350, 400, 460, 520, 600, 650, 680]}
              source="Active Travel England &middot; Infrastructure Audit 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Cyclist casualties per year"
              value="17,200"
              direction="flat"
              polarity="up-is-bad"
              changeText="880 killed or seriously injured &middot; True figure estimated 2&ndash;3&times; higher"
              sparklineData={[17500, 17200, 16800, 17100, 9800, 15200, 17000, 17200]}
              source="DfT &middot; Reported Road Casualties Great Britain 2023"
              onExpand={() => {}}
            />
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
