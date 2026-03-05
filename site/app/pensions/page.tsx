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

interface StatePensionPoint {
  year: number;
  weeklyGBP: number;
}

interface AutoEnrolmentPoint {
  year: number;
  enrolledMillions: number;
}

interface PensionerPovertyPoint {
  year: number;
  afterHousingCostsPct: number;
}

interface PensionData {
  national: {
    statePension: {
      timeSeries: StatePensionPoint[];
      latestYear: number;
      latestWeeklyGBP: number;
      tripleLock: boolean;
    };
    autoEnrolment: {
      timeSeries: AutoEnrolmentPoint[];
      latestYear: number;
      latestEnrolledMillions: number;
      eligibleWorkersPct: number;
    };
    pensionerPoverty: {
      timeSeries: PensionerPovertyPoint[];
      latestYear: number;
      latestPct: number;
      pensionersInPovertyMillions: number;
    };
    genderPensionGap: {
      timeSeries: Array<{ year: number; gapGBP: number }>;
      latestYear: number;
      latestGapGBP: number;
      note: string;
    };
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

export default function PensionsPage() {
  const [data, setData] = useState<PensionData | null>(null);

  useEffect(() => {
    fetch('/data/pensions/pensions.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  // 1. State pension over time
  const statePensionSeries: Series[] = data
    ? [{
        id: 'state-pension',
        label: 'Full new state pension (£/week)',
        colour: '#F4A261',
        data: data.national.statePension.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.weeklyGBP,
        })),
      }]
    : [];

  // 2. Auto-enrolment
  const autoEnrolmentSeries: Series[] = data
    ? [{
        id: 'auto-enrolment',
        label: 'Workers auto-enrolled (millions)',
        colour: '#2A9D8F',
        data: data.national.autoEnrolment.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.enrolledMillions,
        })),
      }]
    : [];

  // 3. Pensioner poverty
  const povertySeriesSeries: Series[] = data
    ? [{
        id: 'poverty',
        label: 'Pensioners in poverty (%)',
        colour: '#E63946',
        data: data.national.pensionerPoverty.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.afterHousingCostsPct,
        })),
      }]
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Pensions" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Pensions"
          question="Is the State Pension Actually Enough to Live On?"
          finding="The state pension has risen 127% since 2010 under the triple lock, reaching £221.20 a week. But 2.1 million pensioners &mdash; 19% &mdash; still live in poverty after housing costs, and auto-enrolment has left 12% of eligible workers without a workplace pension."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The triple lock has made the state pension one of the fastest-growing items in public spending. Weekly payments rose from &pound;97.65 in 2010 to &pound;221.20 in 2025/26 &mdash; a 127% cash increase &mdash; driven by a formula that uprates each year by the highest of earnings growth, CPI inflation, or 2.5%. The mechanism now costs the Exchequer &pound;124 billion annually, the single largest welfare line item. Its fiscal sustainability is increasingly contested: the share of the UK population aged 65 and over is projected to rise from 19% to 25% by 2050. Hunt and Sunak suspended the earnings component in 2021/22 when a COVID wages anomaly would have triggered an 8% rise, signalling the lock&apos;s political fragility.
            </p>
            <p>
              Automatic enrolment, launched in 2012, reversed decades of declining private pension coverage. Before the policy, just 47% of private-sector workers had any workplace pension. By 2023, 22.6 million workers &mdash; 88% of those eligible &mdash; were enrolled, up from 0.9 million at launch. Total contributions now run at &pound;133 billion a year, with a minimum 8% of qualifying earnings split between employer (3%) and employee (5%). The reform disproportionately benefited lower-paid and part-time workers, groups that previously had almost no pension saving.
            </p>
            <p>
              Despite the triple lock, 2.1 million pensioners &mdash; 19.1% &mdash; live below the poverty line after housing costs, the highest rate since 2011. The cost-of-living crisis reversed a decade of improvement that had driven the rate from 20% in 2010 to a low of 15.4% in 2016. Pension Credit, worth up to &pound;11,400 a year, has a 33% non-take-up rate: roughly 880,000 eligible pensioners do not claim it. The gender pension gap compounds the picture &mdash; women receive &pound;7,900 less per year in private pension income than men, with career gaps for childcare the primary driver.
            </p>
            <p>Pensioner poverty is not evenly distributed. Single female pensioners face the highest risk &mdash; 24% live below the poverty line after housing costs, compared with 13% of pensioner couples &mdash; a gap driven by lower lifetime earnings, part-time work, and career breaks for caring responsibilities. Private renters over 65, a small but growing group, spend 33% of their income on housing versus 10% for those who own outright, making them acutely sensitive to inflation in essentials. Ethnicity compounds the picture: pensioners from Pakistani and Bangladeshi backgrounds have poverty rates above 30%, reflecting historical patterns of lower-paid employment and limited access to occupational pensions. Geographically, the North East and Wales have the highest rates of pensioner poverty, while the South East has the lowest. Pension Credit&apos;s 33% non-take-up rate &mdash; worth an estimated &pound;2.1 billion in unclaimed entitlement &mdash; reflects a combination of stigma, complexity, and poor awareness, particularly among those without internet access.</p>
            <p>Pension adequacy is difficult to measure with precision. The Households Below Average Income survey, which produces the official poverty statistics, uses a relative threshold (60% of median income after housing costs) that shifts with the wider income distribution &mdash; meaning pensioner poverty can rise even if pensioner incomes are stable, simply because working-age incomes grow faster. The gender pension gap is estimated from survey data and tax records, but private pension wealth is unevenly reported: defined-benefit scheme values are particularly hard to compare with defined-contribution pots. Auto-enrolment participation figures count anyone who has not opted out, but do not capture contribution adequacy &mdash; the Pensions and Lifetime Savings Association estimates that the current 8% minimum contribution will deliver a retirement income well below its &ldquo;moderate&rdquo; standard for most workers. The triple lock&apos;s long-term fiscal cost depends on earnings growth, inflation, and demographic projections that carry wide confidence intervals. OBR projections to 2050 assume the lock remains in place, but any future suspension &mdash; as in 2021/22 &mdash; would materially alter the trajectory.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-state-pension', label: 'State Pension' },
          { id: 'sec-auto-enrolment', label: 'Auto-Enrolment' },
          { id: 'sec-poverty', label: 'Poverty' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="State pension (full new rate)"
            value="£221.20"
            unit=""
            direction="up"
            polarity="up-is-good"
            changeText="2025/26 · Up 127% since 2010 · Triple lock: highest of earnings, CPI, or 2.5%"
            sparklineData={[97.65, 102.15, 107.45, 110.15, 113.10, 115.95, 119.30, 122.30, 125.95, 129.20, 134.25, 137.60, 141.85, 156.20, 169.50, 221.20]}
            onExpand={() => {}}
          />
          <MetricCard
            label="Workers auto-enrolled in pension"
            value="22.6M"
            unit=""
            direction="up"
            polarity="up-is-good"
            changeText="2023 · 88% of eligible workers · Up from 0.9M in 2012 · Largest expansion of pension saving in UK history"
            sparklineData={[0.9, 2.1, 5.2, 8.4, 14.3, 18.7, 20.1, 21.1, 21.5, 22.0, 22.3, 22.6]}
            onExpand={() => {}}
          />
          <MetricCard
            label="Pensioners in poverty (AHC)"
            value="19.1%"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="2023 · 2.1 million pensioners · Rising since 2016 low of 15.4% · Cost-of-living crisis reversed progress"
            sparklineData={[20.0, 19.2, 18.1, 17.0, 16.2, 16.0, 15.4, 15.9, 15.8, 17.0, 17.6, 18.1, 18.7, 19.1]}
            onExpand={() => {}}
          />
        </div>
        </ScrollReveal>

        {/* Charts */}
        <ScrollReveal>
        <section id="sec-state-pension" className="mb-12">
          <LineChart
            title="Full new state pension, 2010&ndash;2025"
            subtitle="Weekly rate of the full new state pension (£). Has risen 127% since 2010 under the triple lock &mdash; faster than both earnings and inflation. The triple lock commits government to the highest of earnings growth, CPI inflation, or 2.5%."
            series={statePensionSeries}
            yLabel="£/week"
          />
        </section>
        </ScrollReveal>

        <ScrollReveal>
        <section id="sec-auto-enrolment" className="mb-12">
          <LineChart
            title="Workers auto-enrolled in workplace pension, 2012&ndash;2023"
            subtitle="Millions of workers auto-enrolled in a workplace pension since the policy began in 2012. 22.6 million workers &mdash; 88% of all eligible &mdash; now have a workplace pension, up from just 900,000."
            series={autoEnrolmentSeries}
            yLabel="Millions"
          />
        </section>
        </ScrollReveal>

        <ScrollReveal>
        <section id="sec-poverty" className="mb-12">
          <LineChart
            title="Pensioners in relative poverty (after housing costs), 2010&ndash;2023"
            subtitle="Percentage of pensioners with income below 60% of median, after housing costs. Fell steadily until 2016 but has since reversed &mdash; 2.1 million pensioners now in poverty."
            series={povertySeriesSeries}
            yLabel="%"
          />
        </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
        <PositiveCallout
          title="What&apos;s improving"
          value="22.6M"
          unit="workers auto-enrolled &mdash; the largest expansion of pension saving in UK history"
          description="Automatic enrolment has transformed workplace pension coverage since 2012. Before the policy, only 47% of private sector workers had a pension. By 2023, 88% of eligible workers are enrolled. Annual pension contributions through auto-enrolment are now &pound;133 billion. The minimum contribution rate has been raised to 8% of qualifying earnings. The policy has disproportionately benefited women, younger workers, and lower earners who previously had no pension provision."
          source="Source: DWP &mdash; Automatic enrolment statistics 2023."
        />
        </ScrollReveal>

        {/* Sources */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                  {src.name} &mdash; {src.dataset}
                </a>
                <div className="text-xs text-wiah-mid">Updated {src.frequency}</div>
              </div>
            ))}
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Methodology</h3>
            <p>{data?.metadata.methodology}</p>
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Known issues</h3>
            <ul className="list-disc list-inside space-y-1">
              {data?.metadata.knownIssues.map((issue, i) => (
                <li key={i}>{issue}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>

    </>
  );
}
