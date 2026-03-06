'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface PrevalencePoint {
  year: number;
  pct: number;
  millionSmokers: number;
}

interface YoungAdultsPoint {
  year: number;
  pct18to24: number;
  pct25to34: number;
}

interface AgeGroupData {
  group: string;
  pct2011: number;
  pct2024: number;
  changePp: number;
}

interface QuitRatioData {
  latestYear: number;
  exSmokersPct: number;
  currentSmokersPct: number;
  neverSmokedPct: number;
  vapingMillions: number;
  smokingMillions: number;
}

interface SmokingData {
  national: {
    prevalence: {
      timeSeries: PrevalencePoint[];
      latestYear: number;
      latestPct: number;
      latestMillionSmokers: number;
      baselineYear: number;
      baselinePct: number;
    };
    byAgeGroup: {
      latestYear: number;
      groups: AgeGroupData[];
    };
    youngAdultsTimeSeries: YoungAdultsPoint[];
    quitRatio: QuitRatioData;
  };
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

export default function SmokingPage() {
  const [data, setData] = useState<SmokingData | null>(null);

  useEffect(() => {
    fetch('/data/smoking/smoking.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const prevalenceSeries: Series[] = data
    ? [{
        id: 'prevalence',
        label: 'Adult smoking prevalence',
        colour: '#2A9D8F',
        data: data.national.prevalence.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.pct,
        })),
      }]
    : [];

  const youngAdultsSeries: Series[] = data
    ? [
        {
          id: 'young-18-24',
          label: '18–24 year olds',
          colour: '#E63946',
          data: data.national.youngAdultsTimeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.pct18to24,
          })),
        },
        {
          id: 'all-adults',
          label: 'All adults',
          colour: '#264653',
          data: data.national.prevalence.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.pct,
          })),
        },
      ]
    : [];

  const latest = data?.national.prevalence;
  const quitRatio = data?.national.quitRatio;
  const byAgeGroup = data?.national.byAgeGroup;

  return (
    <>
      <TopicNav topic="NHS & Healthcare" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="NHS & Healthcare"
          question="Is smoking actually disappearing?"
          finding="Adult smoking rates have halved in 13 years — from 1 in 5 adults in 2011 to just 1 in 10 in 2024. Among 18–24 year olds, rates have collapsed from 1 in 4 to fewer than 1 in 12 in a single generation."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Adult smoking rates in the UK have halved in 13 years: from 20.2% in 2011 — around 9.6 million people — to 10.6% in 2024, or 5.3 million. Among 18–24 year olds, prevalence has collapsed from 25.7% to just 8.1% over the same period, the most dramatic generational shift on record. Multiple forces converged to produce this outcome: standardised plain packaging introduced in 2017, annual tobacco tax rises pushing a 20-pack above £14, the 2007 workplace ban that denormalised smoking as a social activity, and the rise of vaping from 2012 as a less harmful substitute. By 2024, more adults vape (5.4 million) than smoke cigarettes (4.9 million) in England — a remarkable inversion. The Tobacco and Vapes Bill will prohibit tobacco sales to anyone born after 2009, targeting the government's Smokefree 2030 goal of sub-5% adult prevalence.</p>
            <p>The health dividend of declining smoking is already visible and will compound for decades. Lung cancer mortality in men has roughly halved since the 1990s; cardiovascular disease deaths continue their long downward trend; COPD hospital admissions are falling. Because smoking-related diseases take 20–30 years to manifest, the full benefit of today's non-smoking young cohort will still be felt in 2050. The remaining burden falls disproportionately on the most deprived communities, where smoking rates remain two to three times higher than in affluent areas, and where the health consequences of past smoking are still playing out in life expectancy gaps that persist even as overall prevalence falls.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-prevalence', label: 'Prevalence' },
          { id: 'sec-young', label: 'Young Adults' },
          { id: 'sec-age', label: 'By Age Group' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Adults who smoke"
              value={latest ? latest.latestPct.toString() : '10.6'}
              unit="%"
              direction="down"
              polarity="up-is-bad"
              changeText={latest ? `Down from ${latest.baselinePct}% in ${latest.baselineYear} · Lowest ever recorded` : 'Lowest ever recorded'}
              sparklineData={data ? data.national.prevalence.timeSeries.map(d => d.pct) : [20.2, 19.5, 18.7, 17.2, 15.5, 14.9, 14.4, 13.9, 12.7, 13.3, 12.7, 11.6, 10.6]}
              source="ONS · Adult Smoking Habits in the UK: 2024"
              href="#sec-overview"/>
            <MetricCard
              label="18–24 year olds smoking"
              value="8.1"
              unit="%"
              direction="down"
              polarity="up-is-bad"
              changeText="Down from 25.7% in 2011 · −17.6 percentage points in 13 years"
              sparklineData={data ? data.national.youngAdultsTimeSeries.map(d => d.pct18to24) : [25.7, 24.8, 23.6, 20.5, 18.4, 17.1, 15.8, 14.4, 13.1, 12.7, 11.3, 10.2, 8.1]}
              source="ONS · Annual Population Survey, 2024"
              href="#sec-prevalence"/>
            <MetricCard
              label="Ex-smokers who have quit"
              value={quitRatio ? quitRatio.exSmokersPct.toString() : '74.2'}
              unit="%"
              direction="up"
              polarity="up-is-good"
              changeText={quitRatio ? `${quitRatio.vapingMillions}M adults now vape vs ${quitRatio.smokingMillions}M who smoke` : '5.4M adults now vape vs 4.9M who smoke'}
              sparklineData={[55, 58, 61, 64, 66, 68, 70, 71, 72, 73, 74, 74.2]}
              source="ONS · Adult Smoking Habits in the UK: 2024"
              href="#sec-young"/>
          </div>
        </ScrollReveal>

        {/* Chart 1: Overall prevalence */}
        <ScrollReveal>
          <div id="sec-prevalence" className="mb-12">
            <LineChart
              series={prevalenceSeries}
              title="Adult smoking prevalence, UK, 2011–2024"
              subtitle="Percentage of adults aged 18+ who currently smoke. ONS Annual Population Survey."
              yLabel="Prevalence (%)"
              source={{
                name: 'ONS',
                dataset: 'Adult Smoking Habits in the UK',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Young adults comparison */}
        <ScrollReveal>
          <div id="sec-young" className="mb-12">
            <LineChart
              series={youngAdultsSeries}
              title="Smoking prevalence: 18–24 year olds vs all adults, 2011–2024"
              subtitle="18–24 year olds (red) have seen a 17.6 percentage-point fall — far outpacing the all-adult decline."
              yLabel="Prevalence (%)"
              source={{
                name: 'ONS',
                dataset: 'Annual Population Survey',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Age group bar chart */}
        <ScrollReveal>
          <div id="sec-age" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-1">
                Smoking prevalence by age group: 2011 vs 2024
              </h2>
              <p className="text-sm text-wiah-mid font-mono mb-6">
                Every age group has seen large falls. Younger cohorts have changed most.
              </p>
              {byAgeGroup && (
                <div className="space-y-6">
                  {byAgeGroup.groups.map((g) => (
                    <div key={g.group}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-wiah-black w-16">{g.group}</span>
                        <span className="font-mono text-xs text-wiah-mid">
                          {g.changePp.toFixed(1)}pp fall
                        </span>
                      </div>
                      <div className="relative h-6 bg-wiah-light rounded overflow-hidden">
                        {/* 2011 bar */}
                        <div
                          className="absolute left-0 top-0 h-full rounded opacity-30"
                          style={{ width: `${(g.pct2011 / 30) * 100}%`, backgroundColor: '#E63946' }}
                        />
                        {/* 2024 bar */}
                        <div
                          className="absolute left-0 top-0 h-full rounded"
                          style={{ width: `${(g.pct2024 / 30) * 100}%`, backgroundColor: '#2A9D8F' }}
                        />
                        <span className="absolute right-2 top-1 font-mono text-xs text-wiah-black font-bold">
                          {g.pct2024}% (was {g.pct2011}%)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <p className="font-mono text-xs text-wiah-mid mt-6">
                Source: ONS — Annual Population Survey, 2011 and 2024. Green bar = 2024. Faded red = 2011 baseline.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Smokefree 2030 target within reach for young adults"
            value="8.1%"
            unit="18–24s now smoke"
            description="The government's Smokefree 2030 target defines smokefree as less than 5% of adults smoking. At current rates of decline, 18–24 year olds could reach that threshold by the late 2020s. The Tobacco and Vapes Bill — which will create a rolling age restriction, making England smokefree for everyone born after 2009 — builds on this momentum. If the trend holds, smoking in England could be functionally eliminated within a generation."
            source="Source: ONS — Adult Smoking Habits in the UK: 2024. DHSC — Smokefree 2030 target."
          />
        </ScrollReveal>

        {/* Sources */}
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <p key={i}>
                <strong className="text-wiah-black">{src.name}</strong> —{' '}
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="underline text-wiah-blue">
                  {src.dataset}
                </a>{' '}
                ({src.frequency})
              </p>
            ))}
            {data?.metadata.knownIssues.map((issue, i) => (
              <p key={i} className="text-wiah-mid">Note: {issue}</p>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
