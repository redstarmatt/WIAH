'use client'

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface SportData {
  activeLives: Array<{ year: number; activePct: number }>;
  inactivityRate: Array<{ year: number; inactivePct: number }>;
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

export default function SportParticipationPage() {
  const [data, setData] = useState<SportData | null>(null);

  useEffect(() => {
    fetch('/data/sport-participation/sport_participation.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const activeSeries: Series[] = data
    ? [{
        id: 'active-adults',
        label: 'Active adults (150+ min/week)',
        colour: '#2A9D8F',
        data: data.activeLives.map(d => ({
          date: yearToDate(d.year),
          value: d.activePct,
        })),
      }]
    : [];

  const inactiveSeries: Series[] = data
    ? [{
        id: 'inactive-adults',
        label: 'Inactive adults (<30 min/week)',
        colour: '#E63946',
        data: data.inactivityRate.map(d => ({
          date: yearToDate(d.year),
          value: d.inactivePct,
        })),
      }]
    : [];

  return (
    <>
      <TopicNav topic="Sport Participation" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Sport Participation"
          question="Is Britain Getting Off the Sofa?"
          finding="One in four adults in England does fewer than 30 minutes of physical activity per week &mdash; classified as &ldquo;inactive&rdquo; by the Chief Medical Officer&apos;s guidelines. Activity levels have barely shifted since Sport England began measuring them in 2016, and the gap between the most and least deprived areas is widening."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Physical inactivity costs the NHS an estimated &pound;1.2 billion per year and is linked to one in six deaths in the UK, making it a public health issue of comparable scale to smoking. Sport England&apos;s Active Lives Adult Survey &mdash; the most comprehensive measure of activity in England &mdash; shows that 63.5% of adults meet the Chief Medical Officer&apos;s guideline of 150 minutes of moderate-intensity activity per week. But 25.4% of adults are classified as &ldquo;inactive,&rdquo; doing fewer than 30 minutes per week &mdash; a figure that has barely moved since the survey began in 2016. The pandemic caused a sharp dip, with inactivity peaking at 27.5% in 2020/21, but the recovery to pre-pandemic levels has stalled rather than improved.
            </p>
            <p>
              The government&apos;s Sporting Future strategy (2015) and its successor, Get Active (2023), both set ambitions to reduce inactivity by 500,000 people. Progress has been marginal. Sport England has invested &pound;2.3 billion of National Lottery and government funding since 2017 through its strategy Uniting the Movement, with a deliberate shift from funding elite and traditional sport toward community programmes targeting underactive populations. Early evidence suggests some success in reaching older adults and women through programmes like This Girl Can, which generated measurable increases in awareness but more modest changes in sustained behaviour. Swimming pool and leisure centre closures &mdash; 400 public pools have closed since 2010 &mdash; have eroded the infrastructure on which many activity programmes depend, particularly in deprived areas.
            </p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-active', label: 'Active Adults' },
          { id: 'sec-inactive', label: 'Inactivity' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Adults meeting activity guidelines"
              value="63.5%"
              direction="flat"
              polarity="up-is-good"
              changeText="150+ min/week &middot; Barely changed since 2016 (61.8%)"
              sparklineData={[61.8, 62.3, 62.6, 63.3, 61.4, 60.9, 63.1, 63.7, 63.5]}
              source="Sport England &middot; Active Lives 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Inactive adults"
              value="25.4%"
              direction="flat"
              polarity="up-is-bad"
              changeText="Fewer than 30 min/week &middot; Peaked at 27.5% in 2021"
              sparklineData={[25.7, 25.2, 25.0, 24.6, 27.1, 27.5, 25.6, 25.0, 25.4]}
              source="Sport England &middot; Active Lives 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Public swimming pools closed"
              value="400"
              direction="up"
              polarity="up-is-bad"
              changeText="Since 2010 &middot; Disproportionately in deprived areas"
              sparklineData={[180, 220, 260, 290, 320, 350, 375, 390, 400]}
              source="Swim England &middot; Facilities Report 2023"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-active" className="mb-12">
            {activeSeries.length > 0 ? (
              <LineChart
                title="Active adults in England, 2016&ndash;2024"
                subtitle="Percentage of adults (16+) achieving 150+ minutes of moderate-intensity activity per week."
                series={activeSeries}
                yLabel="Percentage (%)"
                source={{
                  name: 'Sport England',
                  dataset: 'Active Lives Adult Survey',
                  frequency: 'biannual',
                  url: 'https://www.sportengland.org/research-and-data/data/active-lives',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-inactive" className="mb-12">
            {inactiveSeries.length > 0 ? (
              <LineChart
                title="Inactive adults in England, 2016&ndash;2024"
                subtitle="Percentage of adults doing fewer than 30 minutes of physical activity per week. The pandemic caused a sharp rise."
                series={inactiveSeries}
                yLabel="Percentage (%)"
                source={{
                  name: 'Sport England',
                  dataset: 'Active Lives Adult Survey',
                  frequency: 'biannual',
                  url: 'https://www.sportengland.org/research-and-data/data/active-lives',
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
