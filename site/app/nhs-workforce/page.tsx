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

interface VacancyPoint {
  year: number;
  total: number;
}

interface NursingPoint {
  year: number;
  registeredNurses: number;
}

interface WorkforceGroupPoint {
  role: string;
  vacancies: number;
}

interface NHSWorkforceData {
  vacancies: VacancyPoint[];
  nursingNumbers: NursingPoint[];
  byWorkforce: WorkforceGroupPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function NHSWorkforcePage() {
  const [data, setData] = useState<NHSWorkforceData | null>(null);

  useEffect(() => {
    fetch('/data/nhs-workforce/nhs_workforce.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  // 1. Vacancies
  const vacanciesSeries: Series[] = data
    ? [{
        id: 'vacancies',
        label: 'Total NHS vacancies',
        colour: '#E63946',
        data: data.vacancies.map(d => ({
          date: yearToDate(d.year),
          value: d.total,
        })),
      }]
    : [];

  // 2. Nursing numbers
  const nursingSeries: Series[] = data
    ? [{
        id: 'nurses',
        label: 'Registered nurses',
        colour: '#2A9D8F',
        data: data.nursingNumbers.map(d => ({
          date: yearToDate(d.year),
          value: d.registeredNurses,
        })),
      }]
    : [];

  return (
    <main>
      <TopicNav topic="NHS Workforce" />

      <TopicHeader
        topic="NHS Workforce"
        colour="#E63946"
        question="Does the NHS have enough staff?"
        finding="The NHS in England has over 112,000 vacancies &mdash; a vacancy rate of 8.4% &mdash; with nursing and mental health the most acute shortfalls, underpinned by a decade of underinvestment in training and poor workforce retention."
      />

      {/* Metric cards */}
      <section className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-6">
          <MetricCard
            label="NHS vacancies (England)"
            value="112K"
            unit="posts"
            polarity="up-is-bad"
            direction="up"
            changeText="8.4% vacancy rate"
            onExpand={() => {}}
          />
          <MetricCard
            label="Nursing vacancies"
            value="47.5K"
            unit="posts"
            polarity="up-is-bad"
            direction="up"
            changeText="1 in 9 nursing posts unfilled"
            onExpand={() => {}}
          />
          <MetricCard
            label="Staff leaving NHS each year"
            value="65K"
            unit="people"
            polarity="up-is-bad"
            direction="up"
            changeText="1 in 12; burnout key factor"
            onExpand={() => {}}
          />
        </div>
      </section>

      {/* Chart 1: Total vacancies */}
      {data && (
        <ScrollReveal>
          <section className="max-w-5xl mx-auto px-6 py-16">
            <LineChart
              title="Total NHS vacancies, England"
              subtitle="Quarterly snapshot of advertised vacancies. NHS England workforce statistics."
              series={vacanciesSeries}
              annotations={[
                { date: new Date(2020, 5, 1), label: 'COVID: temporary fall as recruitment paused' },
              ]}
              yLabel="Vacancies"
              source={{
                name: 'NHS England',
                dataset: 'Workforce statistics',
                date: 'March 2026',
                frequency: 'Quarterly'
              }}
            />
          </section>
        </ScrollReveal>
      )}

      {/* Chart 2: Nursing numbers */}
      {data && (
        <ScrollReveal>
          <section className="max-w-5xl mx-auto px-6 py-16">
            <LineChart
              title="Registered nurses working in NHS, England"
              subtitle="Headcount of registered nurses on NHS payroll. More nurses than ever &mdash; but demand has grown faster."
              series={nursingSeries}
              yLabel="Registered nurses"
              source={{
                name: 'NHS England',
                dataset: 'Workforce statistics',
                date: 'March 2026',
                frequency: 'Annual'
              }}
            />
          </section>
        </ScrollReveal>
      )}

      {/* Chart 3: By workforce group */}
      {data && (
        <ScrollReveal>
          <section className="max-w-5xl mx-auto px-6 py-16">
            <h2 className="text-2xl font-bold text-wiah-black mb-2">NHS vacancies by staff group</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">NHS England; latest figures</p>
            
            <div className="space-y-3">
              {data.byWorkforce.map((item) => (
                <div key={item.role} className="flex items-center gap-4">
                  <div className="w-48 text-sm font-mono text-wiah-black">{item.role}</div>
                  <div className="flex-1 flex items-center gap-3">
                    <div
                      className="h-6 bg-wiah-grey rounded"
                      style={{
                        width: `${(item.vacancies / 50000) * 100}%`,
                        backgroundColor: '#E63946',
                      }}
                    />
                    <div className="w-16 text-right font-mono text-sm font-bold text-wiah-black">
                      {(item.vacancies / 1000).toFixed(1)}K
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>
      )}

      {/* Context section */}
      <section id="sec-context" className="max-w-2xl mx-auto px-6 py-16">
        <div className="text-base text-wiah-black leading-[1.7] space-y-4">
          <p>The NHS in England carried more than 112,000 vacancies in 2023 &mdash; an 8.4% rate, up from 64,000 in 2015 &mdash; with nursing the largest single shortfall at 47,500 posts, roughly one in nine. Between 2010 and 2018 funded nursing training places were cut by approximately 25%, and the 2017 replacement of NHS bursaries with student loans drove a 32% drop in nursing degree applications. Medical school places were capped below projected demand throughout the 2010s. The domestic training deficit has been papered over by international recruitment: 34% of new NMC registrants in 2023 trained overseas, predominantly in the Philippines, India, and Nigeria &mdash; WHO red-list countries. Agency and bank cover to fill the gap cost &pound;3 billion in 2022/23, roughly equal to the entire 15-year budget of the 2023 Long Term Workforce Plan. Junior doctors took the first such strikes in NHS history in 2022&ndash;23, citing 26% real-terms pay erosion since 2008.</p>
          <p>Retention is as acute a problem as recruitment. Around 65,000 NHS staff leave every year; the Staff Survey consistently identifies burnout, weak management, and pay as primary reasons. Nurse pay fell roughly 12% in real terms between 2010 and 2023. The 2023 Long Term Workforce Plan commits to doubling medical school places and increasing nursing training by 92% over 15 years, but a doubled cohort will not be fully qualified until the mid-2030s. For this decade the NHS remains dependent on international recruitment and agency cover. Agency spending is highest in the trusts with the most vacancies, creating a cycle in which the areas most in need have the fewest resources for permanent hiring.</p>
        </div>
      </section>

      {/* Positive callout */}
      <ScrollReveal>
        <section className="max-w-5xl mx-auto px-6 py-12">
          <PositiveCallout
            title="What&apos;s improving"
            value="Long Term Workforce Plan"
            unit="committed to doubling medical school places, +92% nursing training over 15 years"
            description="The NHS Long Term Workforce Plan (June 2023) committed to doubling medical school places and increasing nursing training by 92% over 15 years, at a cost of &pound;2.4bn. Independent analysts cautiously welcomed the ambition but noted that domestic training alone cannot fill near-term gaps &mdash; international recruitment remains essential for the next decade."
            source="Source: NHS England &mdash; Long Term Workforce Plan 2023."
          />
        </section>
      </ScrollReveal>

      {/* Section nav */}
      <SectionNav sections={[
        { id: 'sec-context', label: 'Context' },
      ]} />
    </main>
  );
}
