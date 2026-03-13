'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'NHS England', dataset: 'Workforce Statistics', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/nhs-vacancies-survey', date: '2023' },
  { num: 2, name: 'Nursing and Midwifery Council', dataset: 'Annual Registration Report', url: 'https://www.nmc.org.uk/about-us/reports-and-accounts/registration-statistics/', date: '2023' },
  { num: 3, name: 'NHS England', dataset: 'NHS Staff Survey', url: 'https://www.nhsstaffsurveys.com/', date: '2023' },
  { num: 4, name: 'NHS England', dataset: 'Long Term Workforce Plan', url: 'https://www.england.nhs.uk/publication/nhs-long-term-workforce-plan/', date: '2023' },
];

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

      <div className="max-w-5xl mx-auto px-6 pt-12">
        <TopicHeader
          topic="NHS Workforce"
          colour="#E63946"
          question="Does the NHS have enough staff?"
          finding="The NHS in England has over 112,000 vacancies — a vacancy rate of 8.4% — with nursing and mental health the most acute shortfalls, underpinned by a decade of underinvestment in training and poor workforce retention."
        />
      </div>

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
            href="#sec-chart"
          />
          <MetricCard
            label="Nursing vacancies"
            value="47.5K"
            unit="posts"
            polarity="up-is-bad"
            direction="up"
            changeText="1 in 9 nursing posts unfilled"
            href="#sec-chart"
          />
          <MetricCard
            label="Staff leaving NHS each year"
            value="65K"
            unit="people"
            polarity="up-is-bad"
            direction="up"
            changeText="1 in 12; burnout key factor"
            href="#sec-chart"
          />
        </div>
      </section>

      {/* Chart 1: Total vacancies */}
      {data && (
        <ScrollReveal>
          <section id="sec-chart" className="max-w-5xl mx-auto px-6 py-16">
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
              subtitle="Headcount of registered nurses on NHS payroll. More nurses than ever — but demand has grown faster."
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
          <p>The NHS in England carried more than 112,000 vacancies in 2023 — an 8.4% vacancy rate, up from around 64,000 unfilled posts in 2015.<Cite nums={1} /> Nursing accounts for the largest single shortfall: 47,500 vacancies, meaning roughly one in nine nursing posts is empty.<Cite nums={1} /> The departure of EU workers after Brexit removed a ready source of trained staff, and the NHS now recruits heavily from India, Nigeria, and the Philippines. Around one in three new nursing registrants trained abroad — a dependency that raises ethical questions about drawing healthcare workers from countries with their own acute shortages.<Cite nums={2} /></p>
          <p>The vacancy problem is as much about retention as recruitment. Around 65,000 NHS staff leave every year; the NHS Staff Survey consistently identifies burnout, weak line management, and pay as the primary reasons.<Cite nums={3} /> Nurse pay fell roughly 12% in real terms between 2010 and 2023. Junior doctors took industrial action in 2022–23 — the first such strikes in NHS history — citing pay erosion of over 26% since 2008. The disputes were settled with rises of 5–8%, restoring some ground but leaving total remuneration well below the levels that attracted staff a decade ago.<Cite nums={4} /></p>
            </div>
      </section>

      {/* Positive callout */}
      <ScrollReveal>
        <section className="max-w-5xl mx-auto px-6 py-12">
          <PositiveCallout
            title="What's improving"
            value="Long Term Workforce Plan"
            unit="committed to doubling medical school places, +92% nursing training over 15 years"
            description="The NHS Long Term Workforce Plan (June 2023) committed to doubling medical school places and increasing nursing training by 92% over 15 years, at a cost of £2.4bn. Independent analysts cautiously welcomed the ambition but noted that domestic training alone cannot fill near-term gaps — international recruitment remains essential for the next decade."
            source="Source: NHS England — Long Term Workforce Plan 2023."
          />
        </section>
      </ScrollReveal>

      <div className="mt-6">
        <section className="max-w-2xl mx-auto px-6">
          <References items={editorialRefs} />
        </section>
      </div>

      {/* Section nav */}
      <SectionNav sections={[
        { id: 'sec-context', label: 'Context' },
      ]} />
            <RelatedTopics />
      </main>
  );
}
