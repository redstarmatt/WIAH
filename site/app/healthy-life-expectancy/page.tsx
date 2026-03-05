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

interface LEPoint {
  period: string;
  maleLE: number;
  femaleLE: number;
  maleHLE: number;
  femaleHLE: number;
}

interface DeprivationItem {
  decile: string;
  maleHLE: number;
  femaleHLE: number;
}

interface HealthyLifeExpectancyData {
  national: {
    lifeExpectancy: {
      timeSeries: LEPoint[];
      latestPeriod: string;
      latestMaleHLE: number;
      latestFemaleHLE: number;
    };
    deprivationGap: {
      latestPeriod: string;
      data: DeprivationItem[];
      gapYears: number;
    };
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function periodToDate(period: string): Date {
  const startYear = parseInt(period.split('-')[0]);
  return new Date(startYear, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function HealthyLifeExpectancyPage() {
  const [data, setData] = useState<HealthyLifeExpectancyData | null>(null);

  useEffect(() => {
    fetch('/data/healthy-life-expectancy/healthy_life_expectancy.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const maleLESeriesData: Series[] = data
    ? [
        {
          id: 'le',
          label: 'Life expectancy (total)',
          colour: '#264653',
          data: data.national.lifeExpectancy.timeSeries.map(d => ({
            date: periodToDate(d.period),
            value: d.maleLE,
          })),
        },
        {
          id: 'hle',
          label: 'Healthy life expectancy',
          colour: '#2A9D8F',
          data: data.national.lifeExpectancy.timeSeries.map(d => ({
            date: periodToDate(d.period),
            value: d.maleHLE,
          })),
        },
      ]
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Healthy Life Expectancy" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Healthy Life Expectancy"
          question="How Many of Those Years Are Actually Healthy?"
          finding="Men can expect 62.9 healthy years; women 63.4. Both have barely moved in 15 years. Men spend 16 years in poor health, women 19.5 years. The gap between the most and least deprived is 19 years of healthy life."
          colour="#2A9D8F"
          preposition="for"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Life expectancy in England stands at 79.0 years for men and 82.9 for women (2021&ndash;23), but healthy life expectancy &mdash; years lived without disability or chronic illness &mdash; is just 62.9 and 63.4 respectively. Men spend their final 16.1 years in poor health; women 19.5 years. The critical trend is stagnation: male HLE was 63.3 years in 2009&ndash;11 and has barely shifted since, even as total life expectancy grew modestly before COVID reversed it. The result is morbidity expansion &mdash; a growing share of each life spent managing illness rather than living without it.
            </p>
            <p>
              Deprivation produces the starkest gradient. In England&apos;s most deprived decile, male healthy life expectancy is 52.3 years; female 52.2 years. In the least deprived decile it reaches 71.4 years for men &mdash; a 19.1-year gap. This mortality gradient is driven primarily by material conditions: housing quality, income insecurity, environmental exposures, and occupational hazards, not principally by behavioural differences. The NHS Core20PLUS5 programme now targets the most deprived 20% across five clinical areas, but the gap has shown no meaningful narrowing over the decade for which data exist.
            </p>
            <p>
              Regional disparities track the same pattern. London records the highest male HLE at 66.0 years (women: 67.2), while the North East manages just 59.6 &mdash; a 6.4-year gap. Yorkshire sits at 60.5 years, the North West at 60.9. These differences have persisted for decades with no sign of convergence. The implication for health services is severe: a growing elderly population will spend an increasing proportion of its later years in morbidity rather than health, compounding demand on primary care, social care, and hospital services simultaneously.
            </p>
            <p>The distribution of healthy life expectancy is not primarily a story about healthcare access&mdash;it is a story about the conditions in which people are born, grow, work, and age. The Marmot Review in 2010 and its follow-up in 2020 established that income, housing, education, employment conditions, and early childhood environment determine health outcomes far more powerfully than NHS treatment ever can. The mechanisms are specific and well-documented: living in a cold, damp home increases cardiovascular and respiratory disease risk; food insecurity drives diabetes and obesity; job insecurity and precarious work erode mental health, which cascades into physical decline. Manual workers have roughly three times the disability rate of professionals by their early fifties&mdash;their bodies absorb decades of physical strain that no amount of GP access can reverse. The most consequential window is the earliest: adverse childhood experiences&mdash;poverty, neglect, household dysfunction&mdash;predict adult health outcomes with striking consistency, and deprivation in the first thousand days of life leaves physiological marks that persist for decades. Yet UK policy continues to default to a lifestyle framing that attributes poor health to individual choices about smoking, diet, and exercise, rather than confronting the environmental and commercial determinants that make those choices rational or unavoidable. Prevention spending fell 24% in real terms between 2015 and 2023, while the NHS continued to spend the overwhelming majority of its resources treating the consequences.</p>
            <p>Healthy life expectancy is not directly observed&mdash;it is a statistical construct combining two imperfect inputs. Mortality data from death registrations is robust, but the health component relies on the Annual Population Survey question asking respondents whether their health is &ldquo;very good, good, fair, bad, or very bad.&rdquo; This self-assessment is sensitive to question wording, cultural expectations, and survey mode, meaning that shifts in how people describe their health can move the headline figure independently of any real change in morbidity. Life expectancy data carries a two-year publication lag, so the most recent figures reflect conditions that have already passed. The deprivation analysis uses the English Index of Multiple Deprivation, updated every four to five years; because it measures relative rather than absolute deprivation, areas can shift between deciles without any change in actual conditions, complicating trend comparisons across editions. Healthy life expectancy estimates for local authorities and smaller geographies carry wide confidence intervals due to small sample sizes, meaning apparent differences between similar areas may not be statistically meaningful. The Global Burden of Disease study produces an alternative measure&mdash;years lived with disability&mdash;using different methodology and producing different results, which can cause confusion when the two are cited interchangeably. International comparisons of prevention spending are further complicated by inconsistent definitions: what counts as &ldquo;prevention&rdquo; varies by accounting convention, making claims about the UK&apos;s relative underinvestment harder to substantiate precisely than they appear.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-trends', label: 'Trends' },
          { id: 'sec-deprivation', label: 'Deprivation' },
          { id: 'sec-regions', label: 'Regions' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Male healthy life expectancy"
            value="62.9"
            unit="yrs"
            direction="flat"
            polarity="up-is-good"
            changeText="2021-23 · Life expectancy 79.0 · 16.1 years in poor health · Stalled since 2009"
            sparklineData={[63.3, 63.7, 63.7, 63.4, 63.1, 62.5, 62.2, 62.9]}
            onExpand={() => {}}
          />
          <MetricCard
            label="Female healthy life expectancy"
            value="63.4"
            unit="yrs"
            direction="flat"
            polarity="up-is-good"
            changeText="2021-23 · Life expectancy 82.9 · 19.5 years in poor health"
            sparklineData={[64.1, 64.5, 64.0, 63.7, 63.9, 63.3, 62.7, 63.4]}
            onExpand={() => {}}
          />
          <MetricCard
            label="Deprivation gap in healthy LE"
            value="19.1"
            unit="yrs"
            direction="flat"
            polarity="up-is-bad"
            changeText="Most vs least deprived · 52.3 yrs vs 71.4 yrs · Not narrowing"
            sparklineData={[19.1, 19.1]}
            onExpand={() => {}}
          />
        </div>
        </ScrollReveal>

        {/* Chart */}
        <ScrollReveal>
        <section id="sec-trends" className="mb-12">
          <LineChart
            title="Life expectancy vs healthy life expectancy, England (men), 2009–2023"
            subtitle="Total life expectancy (top line) vs healthy life expectancy (bottom line) at birth for males. The gap between the lines — 16.1 years in 2021–23 — is years spent in poor health."
            series={maleLESeriesData}
            yLabel="Years"
          />
        </section>
        </ScrollReveal>

        {/* Deprivation bar chart */}
        <ScrollReveal>
        <section id="sec-deprivation" className="max-w-2xl mt-4 mb-12">
          <h2 className="text-xl font-bold text-wiah-black mb-2">Male healthy life expectancy by deprivation decile, 2018–20</h2>
          <p className="text-sm text-wiah-mid font-mono mb-6">A 19.1-year gap separates the most and least deprived. Source: ONS</p>
          {data && (
            <div className="space-y-3">
              {data.national.deprivationGap.data.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-36 text-sm text-wiah-black flex-shrink-0">{item.decile}</div>
                  <div className="flex-1 bg-wiah-border rounded h-5 overflow-hidden">
                    <div className="h-full rounded" style={{ width: `${(item.maleHLE / 75) * 100}%`, backgroundColor: '#2A9D8F' }} />
                  </div>
                  <div className="w-16 text-right text-sm font-mono text-wiah-black">{item.maleHLE} yrs</div>
                </div>
              ))}
            </div>
          )}
          <p className="font-mono text-xs text-wiah-mid mt-4">Source: ONS &mdash; Health state life expectancies by deprivation 2018–20.</p>
        </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
        <section id="sec-regions" className="mb-12">
          <PositiveCallout
            title="What&apos;s improving"
            value="63.4"
            unit="female healthy life expectancy — recovering after COVID-era dip"
            description="Healthy life expectancy for both men and women has partially recovered from the COVID-era dip. Prevention programmes — NHS Health Checks, cancer screening, cardiovascular disease ambitions — aim to extend healthy years. The NHS&apos;s Core20PLUS5 programme targets the most deprived 20% for five clinical areas. GLP-1 weight-loss drugs approved by NICE in 2024 may reduce obesity-related morbidity."
            source="Source: ONS &mdash; Health state life expectancies, England, 2021 to 2023."
          />
        </section>
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
