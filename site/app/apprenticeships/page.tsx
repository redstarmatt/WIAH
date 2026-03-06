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

interface ApprenticeshipStartPoint {
  fy: string;
  starts: number;
}

interface ByLevelItem {
  level: string;
  pct: number;
}

interface ByAgeItem {
  age: string;
  starts2023: number;
}

interface ApprenticeshipData {
  apprenticeshipStarts: ApprenticeshipStartPoint[];
  byLevel: ByLevelItem[];
  byAge: ByAgeItem[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function fyToDate(fy: string): Date {
  const start = parseInt(fy.split('/')[0]);
  return new Date(start, 3, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ApprenticeshipsPage() {
  const [data, setData] = useState<ApprenticeshipData | null>(null);

  useEffect(() => {
    fetch('/data/apprenticeships/apprenticeships.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const startsSeries: Series[] = data
    ? [{
        id: 'starts',
        label: 'Apprenticeship starts',
        data: data.apprenticeshipStarts.map(d => ({
          date: fyToDate(d.fy),
          value: d.starts,
        })),
        colour: '#264653',
      }]
    : [];

  const startsAnnotations: Annotation[] = [
    { date: fyToDate('2017/18'), label: 'Apprenticeship levy introduced' },
  ];

  // Sparkline data for metrics
  const startsSparkline = data
    ? data.apprenticeshipStarts.map(d => d.starts / 100000)
    : [];

  const under19Sparkline = [0.12, 0.115, 0.11, 0.105, 0.10, 0.095, 0.13, 0.125, 0.125];

  const degreeSparkline = [0.10, 0.11, 0.12, 0.15, 0.18, 0.22, 0.26, 0.28];

  return (
    <main>
      <TopicNav topic="Apprenticeships" />
      <SectionNav sections={[
        { id: 'sec-overview', label: 'Overview' },
        { id: 'sec-context', label: 'Context' },

        { id: 'sec-charts', label: 'Charts' },
        { id: 'sec-sources', label: 'Sources' },
      ]} />

      {/* Hero section */}
      <section className="bg-white px-6 pt-6 pb-12 md:pb-16">
        <div className="max-w-3xl mx-auto">
          <TopicHeader
            topic="Apprenticeships"
            colour="#264653"
            question="Are apprenticeships actually working?"
            finding="Apprenticeship starts have fallen 35% since the apprenticeship levy was introduced in 2017, with higher-level qualifications for existing employees replacing the entry-level training for young people the system was designed to support."
          />
        </div>
      </section>

      {/* Metrics row */}
      <section id="sec-overview" className="bg-wiah-light px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard
              label="Apprenticeship starts (2022/23)"
              value="700,000"
              unit=""
              changeText="Down from 509K in 2015/16 after levy"
              direction="down"
              polarity="up-is-good"
              sparklineData={startsSparkline}
              href="#sec-overview"/>
            <MetricCard
              label="Under-19 apprenticeship starts"
              value="125,000"
              unit=""
              changeText="Down 47% since 2015/16"
              direction="down"
              polarity="up-is-good"
              sparklineData={under19Sparkline}
              href="#sec-charts"/>
            <MetricCard
              label="Degree apprenticeships (Level 6-7)"
              value="28"
              unit="%"
              changeText="Was 10% pre-levy; levy misuse concern"
              direction="up"
              polarity="up-is-bad"
              sparklineData={degreeSparkline}
              href="#sec-charts"/>
          </div>
        </div>
      </section>

      {/* Charts section */}
      <section id="sec-context" className="bg-wiah-light px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-wiah-black mb-6">The Context</h2>
          <div className="max-w-2xl mt-4 mb-12">
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The apprenticeship levy, introduced in April 2017, requires employers with a payroll above £3 million to contribute 0.5% of their wage bill into a digital training account. It was designed to generate 3 million starts by 2020; instead total annual starts fell from 509,000 in 2015/16 to 375,000 in 2017/18 and have not recovered. An estimated £1.3 billion in unspent levy funds was returned to the Treasury in 2021/22. Smaller employers, who historically provided the majority of craft and technical apprenticeships, were deterred by increased bureaucracy and the loss of a training subsidy. Large levy-paying employers used accumulated funds to subsidise existing senior employees: Level 6 and 7 degree apprenticeships grew from 10% of starts in 2017/18 to 28% in 2022/23, with many programmes effectively funding MBA-level training for mid-career managers. The Public Accounts Committee concluded the levy had &ldquo;not delivered value for taxpayers.&rdquo; Overall completion rates stand at 53%, meaning nearly half of starters do not finish.</p>
            <p>The impact on young people is the most acute dimension. Under-19 starts fell from 264,000 in 2015/16 to 125,000 in 2022/23, a 53% reduction. Remaining young apprenticeships concentrate in social care, hospitality, and retail — industries with wages clustered around the £6.40 apprenticeship minimum and limited progression prospects. Completion rates for apprentices from the most deprived quintile are around 10 percentage points below those from the least deprived; rates are also substantially lower for Black, Asian, and minority ethnic apprentices. The social mobility function the programme was designed to perform — bringing young people without professional family networks into skilled employment — has been progressively displaced by its function as a large-employer training subsidy.</p>
          </div>
          </div>

          {/* Positive callout */}
          <PositiveCallout
            title="Levy reforms proposed in 2024"
            value="50%"
            unit="non-apprenticeship spend"
            description="The Labour government's 2024 Skills England initiative proposed replacing the apprenticeship levy with a broader &ldquo;Growth and Skills Levy&rdquo; allowing employers to spend up to 50% on non-apprenticeship training. Supporters argue this would unlock short-course retraining; critics warn it could further reduce traditional apprenticeship numbers for young people."
            source="Department for Education, Skills England. Retrieved 2025-03-04."
          />
        </div>
      </section>

      {/* Sources section */}
      <section id="sec-charts" className="bg-white px-6 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Chart 1: Apprenticeship starts */}
          <ScrollReveal>
            <div className="h-72 mb-12">
              {startsSeries.length > 0 ? (
                <LineChart
                  title="Apprenticeship starts, England"
                  subtitle="Annual starts by financial year. Includes all levels. DfE Further Education data."
                  series={startsSeries}
                  annotations={startsAnnotations}
                  yLabel="Starts"
                  source={{
                    name: 'Department for Education',
                    dataset: 'Apprenticeship and Traineeships Activity',
                    frequency: 'annual',
                    url: 'https://explore-education-statistics.service.gov.uk/find-statistics/apprenticeships-and-traineeships',
                  }}
                />
              ) : (
                <div className="h-full bg-wiah-light rounded animate-pulse" />
              )}
            </div>
          </ScrollReveal>

          {/* Chart 2: By age group */}
          {data && data.byAge.length > 0 && (
            <ScrollReveal>
              <div className="mb-12">
                <h3 className="text-lg font-bold text-wiah-black mb-1">
                  Apprenticeship starts by age group (2022/23)
                </h3>
                <p className="text-sm text-wiah-mid font-mono mb-6">
                  Distribution of apprenticeship starts across age groups in the latest year.
                </p>
                <div className="space-y-4">
                  {data.byAge.map((item) => {
                    const barWidth = (item.starts2023 / 400000) * 100;
                    const display = `${Math.round(item.starts2023 / 1000)}K`;
                    return (
                      <div key={item.age}>
                        <div className="flex justify-between items-baseline mb-1">
                          <span className="text-sm text-wiah-black font-medium">{item.age}</span>
                          <span className="text-sm font-mono text-wiah-mid">{display}</span>
                        </div>
                        <div className="h-2 bg-wiah-light rounded overflow-hidden">
                          <div
                            className="h-full rounded"
                            style={{
                              width: `${barWidth}%`,
                              backgroundColor: '#264653',
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="font-mono text-[11px] text-wiah-mid mt-6">
                  Source: Department for Education, Apprenticeship and Traineeships Activity. Retrieved 2025-03-04.
                </p>
              </div>
            </ScrollReveal>
          )}

          {/* Chart 3: By level */}
          {data && data.byLevel.length > 0 && (
            <ScrollReveal>
              <div className="mb-12">
                <h3 className="text-lg font-bold text-wiah-black mb-1">
                  Apprenticeship starts by level
                </h3>
                <p className="text-sm text-wiah-mid font-mono mb-6">
                  Percentage of apprenticeship starts by qualification level, 2022/23.
                </p>
                <div className="space-y-4">
                  {data.byLevel.map((item) => {
                    const barWidth = (item.pct / 50) * 100;
                    return (
                      <div key={item.level}>
                        <div className="flex justify-between items-baseline mb-1">
                          <span className="text-sm text-wiah-black font-medium">{item.level}</span>
                          <span className="text-sm font-mono text-wiah-mid">{item.pct}%</span>
                        </div>
                        <div className="h-2 bg-wiah-light rounded overflow-hidden">
                          <div
                            className="h-full rounded"
                            style={{
                              width: `${barWidth}%`,
                              backgroundColor: '#264653',
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="font-mono text-[11px] text-wiah-mid mt-6">
                  Source: Department for Education, Apprenticeship and Traineeships Activity. Retrieved 2025-03-04.
                </p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* Context section */}
      <section id="sec-sources" className="bg-white px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-wiah-black mb-6">Sources &amp; Methodology</h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-bold text-wiah-black mb-1">Apprenticeship and Traineeships Activity</h3>
              <p className="text-wiah-mid font-mono text-xs mb-2">
                Department for Education, Annual data, Retrieved 2025-03-04
              </p>
              <p className="text-wiah-black">
                Count of apprenticeship starts in England by financial year, level, and age group. Includes all apprenticeship standards at Levels 2–7. The apprenticeship levy was introduced in April 2017.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-wiah-black mb-1">Data Quality Notes</h3>
              <p className="text-wiah-black">
                Financial year data runs from April to March. The 2022/23 spike reflects data collection methodology changes and revised definitions of apprenticeship completion. Level classification changed in recent years; historical comparability affected.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
