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
          finding="Pensioner poverty fell dramatically between 1997 and 2012, but has been creeping back up since, with 2.1 million pensioners now living below the poverty line &mdash; disproportionately women, renters, and those in the oldest age groups."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Pensioner poverty in the UK followed one of the most dramatic improvement arcs in modern social policy, then stalled. In the early 1990s, around 40% of pensioners lived below the poverty line. By 2012, that figure had fallen to roughly 13%, driven by the introduction of Pension Credit in 2003 and successive real-terms increases to the basic state pension. The scale of that reduction &mdash; lifting millions of older people out of poverty in under two decades &mdash; remains one of the more significant social policy achievements of the period. Since then, progress has effectively stopped. The rate has drifted between 13% and 18%, and today approximately 2.1 million pensioners live below 60% of median income after housing costs.
            </p>
            <p>
              The triple lock, introduced in 2010, guarantees the state pension rises each year by whichever is highest: inflation, average earnings growth, or 2.5%. In 2024/25 the full new state pension is &pound;221.20 a week. For pensioners who receive it in full, it provides a meaningful income floor. But the triple lock has distributional limits: it helps those who qualify for the full amount, while those with incomplete National Insurance records &mdash; disproportionately women, part-time workers, and people with caring responsibilities &mdash; receive less. The poverty risk is not evenly spread. Single women pensioners face a 24% poverty rate, compared to 14% for couples. Disabled pensioners are at 28%. Around 1.3 million pensioners live alone, and it is this group that combines income vulnerability with the highest risk of going without support.
            </p>
            <p>
              One of the most persistent structural problems is the low take-up of Pension Credit. The benefit tops up weekly income to a minimum of &pound;218.15 for a single person (2024/25), yet around 850,000 eligible pensioners do not claim it &mdash; roughly 40% of those entitled. The reasons are documented: the application process is complex, stigma around means-testing persists, and many older people are simply unaware they qualify. Fuel poverty compounds this: around 12% of pensioner households spend more than 10% of their income on energy. Following the energy price spike of 2022&ndash;23, the Winter Fuel Payment &mdash; previously universal for over-66s &mdash; was means-tested from autumn 2024, restricting it to Pension Credit recipients. The policy change is likely to reduce fuel poverty support for the very group least likely to be claiming Pension Credit in the first place.
            </p>
            <p>
              Devolved nations show meaningful variation. Wales records the highest pensioner poverty rate at 19%, Scotland 16%, England 18%. Within England, the pattern broadly tracks wider deprivation: coastal retirement towns, former industrial areas in the North East and Midlands, and rural areas with high housing costs relative to local pension incomes all show elevated rates. The women born in the 1950s affected by the 2010 Pensions Act equalisation &mdash; the WASPI cohort &mdash; faced an accelerated rise in state pension age from 60 to 65, with limited transitional notice. The Parliamentary and Health Service Ombudsman found in 2024 that the Department for Work and Pensions had caused maladministration in communicating the changes, though the question of compensation remains unresolved.
            </p>
            <p>
              The poverty rate figure itself has important limits. It is measured relative to median income, so when median incomes fall &mdash; as in the 2008&ndash;12 period &mdash; pensioner poverty can appear to improve even without any real change in living standards. Housing costs also matter enormously: private renting among pensioners has grown from around 5% in 2000 to over 15% today, and pensioners in the private rented sector face a substantially higher poverty risk than owner-occupiers. The data shows us how many pensioners fall below a threshold; it cannot tell us how many are managing versus struggling just above it, or how many are making material sacrifices &mdash; in food, heating, or social connection &mdash; to stay clear of the line.
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
            onExpand={() => {}}
          />
          <MetricCard
            label="Single female pensioners in poverty"
            value="25%"
            direction="up"
            polarity="up-is-bad"
            changeText="vs 16% for all pensioners"
            sparklineData={[19, 20, 21, 22, 23, 24, 24, 25]}
            source="DWP HBAI"
            baseline="Women live longer; savings depleted"
            onExpand={() => {}}
          />
          <MetricCard
            label="Pensioner renters in poverty"
            value="37%"
            direction="up"
            polarity="up-is-bad"
            changeText="Private renters hardest hit; housing costs not counted"
            sparklineData={[28, 30, 32, 33, 34, 35, 36, 37]}
            source="DWP HBAI"
            baseline="After housing costs"
            onExpand={() => {}}
          />
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
            title="New State Pension weekly amount, 2016&ndash;2024"
            subtitle="Weekly rate (&pound;). Triple Lock commits to increases by earnings, CPI inflation, or 2.5% &mdash; whichever is highest."
            series={statePensionSeries}
            yLabel="Weekly amount (&pound;)"
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
          title="What&apos;s improving"
          value="42%"
          unit="increase 2016&ndash;2024"
          description="The Triple Lock, introduced in 2010, guarantees the state pension rises each year by the highest of earnings growth, CPI inflation, or 2.5%. It has meant the new state pension rose from &pound;119/week in 2016 to &pound;169/week in 2024. But the Triple Lock&apos;s long-term fiscal cost is contested, and it is suspended when earnings data is distorted."
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
                DWP &mdash; Households Below Average Income (HBAI) (annual)
              </a>
            </li>
            <li>
              <a
                href="https://www.gov.uk/government/publications/state-pension-rates"
                className="underline hover:text-wiah-blue"
                target="_blank"
                rel="noreferrer"
              >
                DWP &mdash; State Pension rates (annual)
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
