'use client'

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface NeetPoint {
  year: number;
  pct: number;
}

interface UnemploymentPoint {
  year: number;
  rate: number;
}

interface ReasonBreakdown {
  reason: string;
  pct: number;
}

interface YouthUnemploymentData {
  neetRate: NeetPoint[];
  youthUnemployment: UnemploymentPoint[];
  byReason: ReasonBreakdown[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 12) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function YouthUnemploymentPage() {
  const [data, setData] = useState<YouthUnemploymentData | null>(null);

  useEffect(() => {
    fetch('/data/youth-unemployment/youth_unemployment.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const neetSeries: Series[] = data
    ? [{
        id: 'neet-rate',
        label: 'NEET rate (16&ndash;24)',
        colour: '#F4A261',
        data: data.neetRate.map(d => ({
          date: yearToDate(d.year),
          value: d.pct,
        })),
      }]
    : [];

  const neetAnnotations: Annotation[] = [
    { date: yearToDate(2020), label: 'COVID-19 disruption' },
  ];

  const unemploymentSeries: Series[] = data
    ? [{
        id: 'youth-unemployment',
        label: 'Youth unemployment rate',
        colour: '#F4A261',
        data: data.youthUnemployment.map(d => ({
          date: yearToDate(d.year),
          value: d.rate,
        })),
      }]
    : [];

  // ── Latest values ──────────────────────────────────────────────────────

  const latestNeet = data && data.neetRate.length > 0
    ? data.neetRate[data.neetRate.length - 1]
    : null;

  const preCovidNeet = data && data.neetRate.length > 0
    ? data.neetRate.find(d => d.year === 2019)
    : null;

  const latestUnemployment = data && data.youthUnemployment.length > 0
    ? data.youthUnemployment[data.youthUnemployment.length - 1]
    : null;

  const neetPopulation = latestNeet
    ? Math.round(latestNeet.pct / 100 * 7100000) // ~7.1M aged 16-24
    : 0;

  return (
    <>
      <TopicNav topic="Youth Unemployment" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Youth Unemployment"
          question="What are young people doing instead of working?"
          finding="One in eight young people aged 16&ndash;24 is NEET &mdash; not in education, employment or training &mdash; with the figure rising since the pandemic and disproportionately affecting young people with disabilities, care leavers, and those without qualifications."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Around 870,000 young people aged 16&ndash;24 &mdash; 12.2% of the age group &mdash; were NEET in 2023, up from a historic low of 10.8% in 2019. That pre-pandemic figure represented the best outcome in a generation, achieved after years of steady economic growth, apprenticeship expansion, and rising minimum wages. The pandemic reversed much of that progress. Three years on, the rate has not returned to its 2019 level. The UK&apos;s youth NEET share is higher than in Germany, the Netherlands, and most Nordic countries, though comparable to France and below Southern European peaks.</p>
            <p>The fastest-growing reason for young people being economically inactive is long-term sickness. ONS Labour Force Survey data shows the number of 16&ndash;24 year olds inactive due to illness or disability rose from roughly 120,000 in 2019 to over 230,000 by 2023 &mdash; a near-doubling in four years. Mental health conditions are the primary driver, accounting for the majority of new cases. Geography compounds the problem: NEET rates range from around 7% in London and the South East to 16&ndash;18% in coastal towns and post-industrial areas of South Wales, the North East, and the Midlands. High NEET concentrations correlate with lower life expectancy, higher welfare dependency, and reduced civic participation across generations.</p>
            <p>Policy interventions have produced mixed results. The Kickstart scheme (2020&ndash;21), which subsidised six-month placements for 16&ndash;24 year olds on Universal Credit, created around 160,000 jobs but evaluations found limited lasting impact on employment prospects &mdash; many participants returned to unemployment once subsidies ended. A more structural problem is the funding gap in further education: per-pupil funding for 16&ndash;18 year olds in FE colleges is roughly half that available to pupils in sixth forms, constraining subject choice and qualified teaching staff. The 2024 Labour manifesto proposed a Youth Guarantee &mdash; an entitlement to education, training, or an apprenticeship for all 16&ndash;21 year olds &mdash; but lasting reduction in NEET rates requires both supply-side investment in provision and demand-side growth in quality jobs accessible without a degree.</p>
            <p>The economic cost of youth disengagement concentrates in specific communities and demographic groups with compounding disadvantages. Young people from Pakistani and Black Caribbean backgrounds face NEET rates roughly double the white British average, a gap that persists after controlling for qualification levels and reflects both employer discrimination documented in callback studies and geographic concentration in areas with fewer entry-level opportunities. Care leavers are among the most exposed: 39% of care leavers aged 19&ndash;21 were NEET in 2022&ndash;23, more than three times the general rate, reflecting the abrupt withdrawal of institutional support at age 18. Disabled young people face a 28 percentage point employment gap compared with non-disabled peers, and those with mental health conditions now account for over half of all 16&ndash;24 incapacity benefit claims &mdash; up from roughly a third in 2015. Apprenticeship starts among under-19s have fallen by 40% since 2015&ndash;16, with the levy system channelling funding toward older workers and higher-level management qualifications rather than Level 2 and 3 vocational routes that serve school leavers. The cumulative fiscal cost of youth NEET status is estimated at &pound;6.9 billion annually in lost productivity, welfare payments, and increased health service use.</p>
            <p>Youth labour market statistics are less straightforward than they appear, and several widely cited figures deserve scrutiny. The headline NEET rate of 12.2% is drawn from the Labour Force Survey, which has faced serious response-rate deterioration &mdash; falling below 15% in some quarters &mdash; leading the ONS to suspend and then redesign the survey in 2023&ndash;24, casting doubt on trend comparisons with earlier periods. The NEET category bundles together young people in very different circumstances: a 17-year-old with severe anxiety unable to leave the house and a 23-year-old taking a planned gap year before postgraduate study both count identically. Economic inactivity due to long-term sickness is self-reported and captures no clinical threshold, meaning the near-doubling since 2019 may partly reflect changing willingness to disclose mental health conditions rather than a proportionate increase in clinical severity. Regional NEET estimates below national level rely on the Annual Population Survey with sample sizes too small for reliable local authority breakdowns &mdash; the confidence intervals on a figure like &ldquo;16% in Blackpool&rdquo; can span 6&ndash;8 percentage points in either direction. International comparisons are complicated by differing definitions: some countries exclude those in part-time or informal education, and age bands vary between 15&ndash;24 and 16&ndash;24. The Kickstart evaluation tracked placement numbers but not sustained employment outcomes beyond six months, making its &ldquo;160,000 placements&rdquo; figure a measure of activity rather than impact.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-neet', label: 'NEET Rate' },
          { id: 'sec-unemployment', label: 'Unemployment' },
          { id: 'sec-reasons', label: 'By reason' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="NEET rate (16-24)"
            value={latestNeet ? latestNeet.pct.toFixed(1) : '—'}
            unit="%"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestNeet && preCovidNeet
                ? `Up from ${preCovidNeet.pct}% in 2019 · ${neetPopulation.toLocaleString()} young people`
                : 'Loading…'
            }
            sparklineData={
              data
                ? sparkFrom(data.neetRate.map(d => d.pct))
                : []
            }
            source="ONS · Labour Force Survey"
            baseline="16&ndash;24 year olds not in education, employment or training"
            onExpand={() => {}}
          />
          <MetricCard
            label="Youth unemployment rate"
            value={latestUnemployment ? latestUnemployment.rate.toFixed(1) : '—'}
            unit="%"
            direction="up"
            polarity="up-is-bad"
            changeText="2.5x the adult rate of 4.2%"
            sparklineData={
              data
                ? sparkFrom(data.youthUnemployment.map(d => d.rate))
                : []
            }
            source="ONS · Labour Force Survey"
            baseline="Percent of economically active 16&ndash;24 year olds"
            onExpand={() => {}}
          />
          <MetricCard
            label="Young people economically inactive"
            value={latestNeet ? (22.4).toFixed(1) : '—'}
            unit="%"
            direction="up"
            polarity="up-is-bad"
            changeText="Long-term sickness rising fast"
            sparklineData={[19.0, 19.5, 20.1, 20.8, 21.2, 21.8, 22.1, 22.4]}
            source="ONS · Labour Force Survey"
            baseline="Includes those in full-time education not seeking work"
            onExpand={() => {}}
          />
        </div>
        </ScrollReveal>

        {/* Chart 1: NEET rate */}
        <div id="sec-neet">
        {neetSeries.length > 0 ? (
          <LineChart
            title="Young people not in education, employment or training (NEET), UK"
            subtitle="Percentage of 16&ndash;24 year olds who are NEET. Labour Force Survey, ONS."
            series={neetSeries}
            annotations={neetAnnotations}
            yLabel="Percent"
            source={{
              name: 'Office for National Statistics',
              dataset: 'Young people not in education, employment or training (NEET)',
              frequency: 'annual',
              url: 'https://www.ons.gov.uk/employmentandlabourmarket/peoplenotinwork/neet',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}
        </div>

        {/* Chart 2: Youth unemployment rate */}
        <div id="sec-unemployment">
        {unemploymentSeries.length > 0 ? (
          <LineChart
            title="Youth unemployment rate (16&ndash;24), UK"
            subtitle="Percentage unemployed among economically active 16&ndash;24 year olds. Labour Force Survey, ONS."
            series={unemploymentSeries}
            yLabel="Percent"
            source={{
              name: 'Office for National Statistics',
              dataset: 'Labour Force Survey: Young people',
              frequency: 'annual',
              url: 'https://www.ons.gov.uk/employmentandlabourmarket/peoplenotinwork/unemployment/articles/youngpeoplenotinemploymenteducationortraining/latest',
            }}
          />
        ) : (
          <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
        )}
        </div>

        {/* Chart 3: By reason */}
        <div id="sec-reasons" className="mb-12">
          <h3 className="text-lg font-bold text-wiah-black mb-4">Why young people are economically inactive (16&ndash;24)</h3>
          {data && data.byReason.length > 0 ? (
            <div className="space-y-3">
              {data.byReason.map((item) => {
                const width = (item.pct / 35) * 100;
                return (
                  <div key={item.reason}>
                    <div className="text-sm text-wiah-mid mb-1">{item.reason}</div>
                    <div className="flex items-center gap-2">
                      <div
                        className="bg-wiah-mid h-6 rounded"
                        style={{ width: `${width}%` }}
                      />
                      <span className="text-sm font-mono text-wiah-mid">{item.pct}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="h-32 bg-wiah-light rounded animate-pulse" />
          )}
        </div>

        {/* Positive callout */}
        <PositiveCallout
          title="What&apos;s improving"
          value="11.2%"
          description="Before the pandemic, youth unemployment in the UK had fallen to an historic low of 11.2% in 2019 &mdash; the result of sustained economic growth, apprenticeship expansion, and minimum wage increases. The progress made between 2012 and 2019 demonstrates that youth unemployment is not inevitable."
          source="Source: ONS &mdash; Labour Force Survey, 2019."
        />
      </main>
    </>
  );
}
