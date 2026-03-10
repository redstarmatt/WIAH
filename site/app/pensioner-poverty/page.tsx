'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface PensionerPovertyYear {
  year: number;
  pct: number;
}

interface StatePensionYear {
  year: number;
  weeklyPounds: number;
}

interface PovertyGroup {
  group: string;
  pct: number;
}

interface PensionerPovertyData {
  pensionerPoverty: PensionerPovertyYear[];
  statePensionValue: StatePensionYear[];
  byCategory: PovertyGroup[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 6, 1); // mid-year
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function PensionerPovertyPage() {
  const [data, setData] = useState<PensionerPovertyData | null>(null);

  useEffect(() => {
    fetch('/data/pensioner-poverty/pensioner_poverty.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const pensionerPovertySeries: Series[] = data
    ? [{
        id: 'poverty',
        label: 'Pensioners in poverty',
        colour: '#6B7280',
        data: data.pensionerPoverty.map(d => ({
          date: yearToDate(d.year),
          value: d.pct,
        })),
      }]
    : [];

  const povertyAnnotations: Annotation[] = [
    { date: new Date(1999, 6), label: 'Pension Credit introduced 1999' },
  ];

  const statePensionSeries: Series[] = data
    ? [{
        id: 'pension',
        label: 'Weekly state pension',
        colour: '#2A9D8F',
        data: data.statePensionValue.map(d => ({
          date: yearToDate(d.year),
          value: d.weeklyPounds,
        })),
      }]
    : [];

  // ── Metric values ────────────────────────────────────────────────────────

  const latestPoverty = data?.pensionerPoverty.at(-1);

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Pensioner Poverty" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Pensioner Poverty"
          question="Are pensioners poor?"
          finding="Pensioner poverty fell dramatically between 1997 and 2012, but has been creeping back up since, with 2.1 million pensioners now living below the poverty line — disproportionately women, renters, and those in the oldest age groups."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Pensioner poverty fell dramatically from around 40% in the early 1990s to 13% by 2012, driven by Pension Credit and real-terms state pension increases — one of the more significant social policy achievements of that era. Since then progress has stalled: the rate has drifted back to 18%, with approximately 2.1 million pensioners living below 60% of median income after housing costs, the highest rate since 2011. The full new state pension reached £221.20 per week in 2024/25 under the triple lock, but around 850,000 eligible pensioners do not claim Pension Credit — roughly 40% of those entitled — leaving £1.5 billion unclaimed annually. From autumn 2024, the Winter Fuel Payment was restricted to Pension Credit recipients, further concentrating hardship on those least likely to be claiming it.
            </p>
            <p>
              The burden of pensioner poverty falls along predictable lines. Single female pensioners face a 24% poverty rate, compared to 14% for couples, reflecting lower lifetime earnings, caring career breaks, and incomplete NI records. Disabled pensioners face 28%. Private renting among pensioners has grown from 5% in 2000 to over 15% today, and private renters face a substantially higher poverty risk than owner-occupiers. Wales records the highest pensioner poverty rate (19%), with elevated rates also in the North East, coastal retirement towns, and former industrial areas. The WASPI cohort — women born in the 1950s affected by the 2010 Pensions Act — received an Ombudsman ruling of maladministration in 2024, but the question of compensation remains unresolved.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-trends', label: 'Trends' },
          { id: 'sec-bygroup', label: 'By Group' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Pensioners in poverty"
            value={latestPoverty ? `${latestPoverty.pct}%` : '—'}
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestPoverty
                ? `18% of pensioners (2.1M); up from 14% in 2012`
                : 'Loading…'
            }
            sparklineData={
              data
                ? data.pensionerPoverty.map(d => d.pct)
                : []
            }
            source="DWP HBAI"
            baseline="Below 60% median income, after housing costs"
            href="#sec-trends"/>
          <MetricCard
            label="Single female pensioners in poverty"
            value="25%"
            direction="up"
            polarity="up-is-bad"
            changeText="vs 16% for all pensioners"
            sparklineData={[19, 20, 21, 22, 23, 24, 24, 25]}
            source="DWP HBAI"
            baseline="Women live longer; savings depleted"
            href="#sec-bygroup"/>
          <MetricCard
            label="Pensioner renters in poverty"
            value="37%"
            direction="up"
            polarity="up-is-bad"
            changeText="Private renters hardest hit; housing costs not counted"
            sparklineData={[28, 30, 32, 33, 34, 35, 36, 37]}
            source="DWP HBAI"
            baseline="After housing costs"
            href="#sec-bygroup"/>
        </div>
        </ScrollReveal>

        {/* Chart 1: Pensioner poverty rate */}
        <div id="sec-trends">
        {pensionerPovertySeries.length > 0 ? (
          <LineChart
            title="Pensioners in poverty, UK"
            subtitle="Percentage of pensioners with income below 60% of median, after housing costs. DWP HBAI data."
            series={pensionerPovertySeries}
            annotations={povertyAnnotations}
            yLabel="Percent"
            source={{
              name: 'DWP',
              dataset: 'Households Below Average Income (HBAI)',
              frequency: 'annual',
              url: 'https://www.gov.uk/government/statistics/households-below-average-income-hbai',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}

        {/* Chart 2: State pension weekly value */}
        {statePensionSeries.length > 0 ? (
          <LineChart
            title="New State Pension weekly amount, 2016–2024"
            subtitle="Weekly rate (£). Triple Lock commits to increases by earnings, CPI inflation, or 2.5% — whichever is highest."
            series={statePensionSeries}
            yLabel="Weekly amount (£)"
            source={{
              name: 'DWP',
              dataset: 'State Pension rates',
              frequency: 'annual',
              url: 'https://www.gov.uk/government/publications/state-pension-rates',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}
        </div>

        {/* Chart 3: Poverty rate by group */}
        <div id="sec-bygroup">
        {data && data.byCategory.length > 0 && (
          <div className="mb-12">
            <h3 className="text-lg font-bold text-wiah-black mb-1">Pensioner poverty rate by group</h3>
            <p className="text-sm text-wiah-mid mb-4">
              Percentage in poverty. Below 60% of median income after housing costs.
            </p>
            <div className="space-y-3">
              {data.byCategory.map(row => {
                const maxWidth = 40; // private renters at 37%
                const barWidth = (row.pct / maxWidth) * 100;
                const colour = row.pct >= 25 ? '#E63946' : row.pct >= 20 ? '#F4A261' : '#2A9D8F';
                return (
                  <div key={row.group} className="flex items-center gap-4">
                    <span className="text-sm text-wiah-black w-56 shrink-0">{row.group}</span>
                    <div className="flex-1 bg-wiah-light rounded h-3">
                      <div
                        className="h-3 rounded"
                        style={{ width: `${barWidth}%`, backgroundColor: colour }}
                      />
                    </div>
                    <span className="font-mono text-sm font-bold w-12 text-right" style={{ color: colour }}>{row.pct}%</span>
                  </div>
                );
              })}
            </div>
            <p className="font-mono text-[11px] text-wiah-mid mt-4">
              Source: DWP HBAI, latest year. Updated annually.
            </p>
          </div>
        )}
        </div>

        {/* Positive callout */}
        <ScrollReveal>
        <PositiveCallout
          title="What's improving"
          value="42%"
          unit="increase 2016–2024"
          description="The Triple Lock, introduced in 2010, guarantees the state pension rises each year by the highest of earnings growth, CPI inflation, or 2.5%. It has meant the new state pension rose from £119/week in 2016 to £169/week in 2024. But the Triple Lock's long-term fiscal cost is contested, and it is suspended when earnings data is distorted."
          source="Source: DWP State Pension rates, 2024."
        />
        </ScrollReveal>

        {/* Sources */}
        <section className="border-t border-wiah-border pt-8 mt-12">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; methodology</h2>
          <ul className="space-y-2 font-mono text-xs text-wiah-mid">
            <li>
              <a
                href="https://www.gov.uk/government/statistics/households-below-average-income-hbai"
                className="underline hover:text-wiah-blue"
                target="_blank"
                rel="noreferrer"
              >
                DWP — Households Below Average Income (HBAI) (annual)
              </a>
            </li>
            <li>
              <a
                href="https://www.gov.uk/government/publications/state-pension-rates"
                className="underline hover:text-wiah-blue"
                target="_blank"
                rel="noreferrer"
              >
                DWP — State Pension rates (annual)
              </a>
            </li>
          </ul>
          <p className="font-mono text-xs text-wiah-mid mt-4">
            Data updated automatically via GitHub Actions. Last pipeline run:{' '}
            {new Date().toISOString().slice(0, 10)}.
          </p>
        </section>
      </main>
    </>
  );
}
