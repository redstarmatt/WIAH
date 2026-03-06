'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface AffectedPoint {
  year: number;
  pct: number;
}

interface SchoolsPoint {
  year: number;
  pct: number;
}

interface BarrierItem {
  barrier: string;
  pct: number;
}

interface PeriodPovertyData {
  national: {
    affectedStudents: AffectedPoint[];
    schoolsParticipating: SchoolsPoint[];
    byBarrier: BarrierItem[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 12) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function PeriodPovertyPage() {
  const [data, setData] = useState<PeriodPovertyData | null>(null);

  useEffect(() => {
    fetch('/data/period-poverty/period_poverty.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const affectedSeries: Series[] = data
    ? [{
        id: 'affected',
        label: 'Girls who struggled to afford period products (%)',
        colour: '#E63946',
        data: data.national.affectedStudents.map(d => ({
          date: yearToDate(d.year),
          value: d.pct,
        })),
      }]
    : [];

  const schoolsSeries: Series[] = data
    ? [{
        id: 'schools',
        label: 'Schools participating in Period Products Scheme (%)',
        colour: '#2A9D8F',
        data: data.national.schoolsParticipating.map(d => ({
          date: yearToDate(d.year),
          value: d.pct,
        })),
      }]
    : [];

  // ── Metric values ────────────────────────────────────────────────────────

  const latestSchools = data?.national.schoolsParticipating.at(-1);

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Period Poverty" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Period Poverty"
          question="Can Every Girl in Britain Afford to Have a Period?"
          finding="One in five girls aged 14–21 has struggled to afford period products in the past year, according to Plan International. Period poverty affects school attendance: around 137,000 girls in the UK missed school due to period poverty in 2017. The government's Period Products Scheme provides free products in schools and colleges, but uptake remains patchy and many are still going without."
          colour="#E63946"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Period poverty — the inability to afford or access period products — affected 1 in 10 girls aged 14–21 in 2017, according to Plan International; by 2023 that figure had risen to 1 in 5, driven by the cost-of-living crisis compounding underlying income inadequacy. Around 137,000 girls missed school because of period poverty in 2017 alone, using improvised alternatives or staying home in environments with inadequate provision or privacy. Scotland passed the Period Products (Free Provision) Act in 2021 — the first legal right to free period products in the world — achieving near-universal school uptake. England's voluntary Period Products Scheme, launched the same year, reached only 63% of eligible institutions by 2023. VAT on period products was cut to zero in January 2021, but the saving is modest relative to the affordability gap for the lowest-income households.</p>
            <p>The problem is sharpest at the margins and least visible in the data. Girls in the most deprived areas, care-experienced young people, asylum seekers in Home Office accommodation, and those in prisons face the most acute shortfalls with the least consistent provision. Survey estimates rely on self-reporting a stigmatised experience, meaning the figures likely understate the true scale: 52% of those experiencing period poverty said they did not know help was available, and 38% cited embarrassment as a barrier to seeking it. The educational disruption — lessons missed without formal absence records, improvised management across years — accumulates in ways that aggregate statistics cannot fully capture.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-context', label: 'Context' },
          { id: 'sec-charts', label: 'Charts' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Girls who struggled to afford period products (last year)"
            value="1 in 5"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="2023 · Plan International UK survey · Up from 1 in 10 in 2017 · Worse in deprived areas and during cost-of-living crisis"
            sparklineData={
              data
                ? sparkFrom(data.national.affectedStudents.map(d => d.pct))
                : []
            }
            source="Plan International UK"
            baseline="Cost of living crisis has pushed more students into period poverty"
            href="#sec-overview"/>
          <MetricCard
            label="Girls who missed school due to period poverty"
            value="137,000"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Estimate, 2017 · Period Products Scheme launched 2020 in Scotland, 2021 in England · Uptake in schools still patchy"
            sparklineData={[137]}
            source="Plan International UK"
            baseline="Absence due to periods damages educational outcomes and life chances"
            href="#sec-charts"/>
          <MetricCard
            label="Schools participating in Period Products Scheme"
            value={latestSchools ? `${latestSchools.pct}%` : '—'}
            unit=""
            direction="up"
            polarity="up-is-good"
            changeText={
              latestSchools
                ? `England, 2023 · Up from 28% in 2020 · Products must be actively promoted to be used`
                : 'Loading…'
            }
            sparklineData={
              data
                ? sparkFrom(data.national.schoolsParticipating.map(d => d.pct))
                : []
            }
            source="Menstrual Products Access Scheme monitoring"
            baseline="Scotland: 100% coverage. England uptake remains incomplete."
            href="#sec-charts"/>
        </div>
        </ScrollReveal>

        <div id="sec-charts" className="space-y-12">
          {affectedSeries.length > 0 ? (
            <LineChart
              title="Girls who struggled to afford period products, 2017–2023"
              subtitle="Percentage of girls aged 14–21 who reported struggling to afford or access period products in the past year, UK."
              series={affectedSeries}
              yLabel="Percent"
              source={{
                name: 'Plan International UK',
                dataset: 'Making the Grade: Period poverty and menstrual health survey',
                frequency: 'annual',
                url: 'https://www.plan-international.org.uk/publications/making-grade-period-poverty-and-menstrual-health-survey',
              }}
            />
          ) : (
            <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
          )}

          {schoolsSeries.length > 0 ? (
            <LineChart
              title="Schools participating in Period Products Scheme, 2020–2023"
              subtitle="Percentage of schools in England participating in the government's Menstrual Products Access Scheme. Scotland achieved 100% coverage in 2020."
              series={schoolsSeries}
              yLabel="Percent of schools"
              source={{
                name: 'Department for Levelling Up, Housing and Communities',
                dataset: 'Menstrual Products Access Scheme',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/collections/period-products',
              }}
            />
          ) : (
            <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
          )}

          {data && data.national.byBarrier.length > 0 && (
            <section className="mb-12">
              <h3 className="text-lg font-bold text-wiah-black mb-1">
                Barriers reported by those experiencing period poverty
              </h3>
              <p className="text-sm text-wiah-mid font-mono mb-6">
                Percentage of girls who reported each barrier. Multi-select — totals exceed 100%.
              </p>
              <div className="space-y-3">
                {data.national.byBarrier.map(item => {
                  const colour = item.pct >= 50 ? '#E63946' : item.pct >= 35 ? '#F4A261' : '#264653';
                  return (
                    <div key={item.barrier}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-wiah-black">{item.barrier}</span>
                        <span className="font-mono text-wiah-mid">{item.pct}%</span>
                      </div>
                      <div className="h-2 bg-wiah-border rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${Math.min(item.pct, 100)}%`, backgroundColor: colour }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-[11px] text-wiah-mid mt-3">
                Source: Plan International UK, Making the Grade survey.
              </p>
            </section>
          )}
        </div>

        <section id="sec-sources" className="border-t border-wiah-border pt-8">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; methodology</h2>
          <ul className="space-y-2 font-mono text-xs text-wiah-mid">
            <li>
              <a
                href="https://www.plan-international.org.uk/publications/making-grade-period-poverty-and-menstrual-health-survey"
                className="underline hover:text-wiah-blue"
                target="_blank"
                rel="noreferrer"
              >
                Plan International UK — Making the Grade: Period poverty and menstrual health survey
              </a>
            </li>
            <li>
              <a
                href="https://www.gov.uk/government/collections/period-products"
                className="underline hover:text-wiah-blue"
                target="_blank"
                rel="noreferrer"
              >
                Department for Levelling Up, Housing and Communities — Period Products Scheme (annual)
              </a>
            </li>
            <li>
              <a
                href="https://www.parliament.uk/business/committees/committees-a-z/commons-select-committees/commons-library-briefing/period-poverty-in-the-uk/"
                className="underline hover:text-wiah-blue"
                target="_blank"
                rel="noreferrer"
              >
                House of Commons Library — Period Poverty in the UK (briefing)
              </a>
            </li>
          </ul>
          <p className="font-mono text-xs text-wiah-mid mt-4">
            The Plan International survey of 1,000+ young people aged 14–21 is the most comprehensive UK data on period poverty. The estimate of 137,000 girls missing school was from a 2017 survey. The Period Products Access Scheme began in Scotland in August 2020 and in England in January 2021, with schools and colleges applying to participate. Barrier data is multi-select and reflects respondents' reported experiences.
          </p>
          <p className="font-mono text-xs text-wiah-mid mt-4">
            Data updated automatically via GitHub Actions. Last pipeline run:{' '}
            {new Date().toISOString().slice(0, 10)}.
          </p>
        </section>
      </main>
    </>
  );
}
