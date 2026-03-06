'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface CasesPoint {
  year: number;
  cases: number;
}

interface WeeksPoint {
  year: number;
  weeks: number;
}

interface FamilyCourtsData {
  national: {
    outstandingCases: CasesPoint[];
    avgWeeksToDisposal: WeeksPoint[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function FamilyCourtsPage() {
  const [data, setData] = useState<FamilyCourtsData | null>(null);

  useEffect(() => {
    fetch('/data/family-courts/family_courts.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const casesSeries: Series[] = data
    ? [{
        id: 'outstanding-cases',
        label: 'Outstanding cases',
        colour: '#6B7280',
        data: data.national.outstandingCases.map(d => ({
          date: yearToDate(d.year),
          value: d.cases,
        })),
      }]
    : [];

  const weeksSeries: Series[] = data
    ? [{
        id: 'avg-weeks',
        label: 'Average weeks to disposal',
        colour: '#E63946',
        data: data.national.avgWeeksToDisposal.map(d => ({
          date: yearToDate(d.year),
          value: d.weeks,
        })),
      }]
    : [];

  return (
    <>
      <TopicNav topic="Family Courts" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Family Courts"
          question="How Long Are Families Waiting for Court Decisions?"
          finding="62,400 cases are outstanding in England's family courts — up 64% from pre-pandemic levels. The average private law case now takes 50 weeks to resolve, double the 2015 figure. Children caught in disputed proceedings wait nearly a year for a decision about where and with whom they will live."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England's family courts handle two broad categories of work. Public law cases involve local authorities seeking to protect children from harm — care proceedings, supervision orders, emergency protection. Private law cases involve disputes between individuals, overwhelmingly about child arrangements following separation: where a child will live, how much time they spend with each parent, and whether there are concerns about domestic abuse or welfare. Both categories are in crisis. Outstanding cases across the family court system reached 62,400 in 2024, up from 38,000 in 2015. The average private law case now takes 50 weeks from application to final order.</p>
            <p>The 26-week statutory limit for care proceedings, introduced in 2014, was designed to prevent children languishing in temporary placements while courts deliberated. It worked initially, reducing average disposal times from 47 weeks to 27 weeks. But the gains have been eroded: by 2024, only 43% of care cases concluded within 26 weeks. Court closures during COVID-19 created a backlog that has never been fully cleared, and rising demand — driven partly by increased referrals from domestic abuse services and children's social care — has overwhelmed a system that was already operating at or beyond capacity.</p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-backlog', label: 'Backlog' },
          { id: 'sec-weeks', label: 'Waiting Time' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Outstanding family court cases"
              value="62,400"
              direction="up"
              polarity="up-is-bad"
              changeText="Up 64% from 38,000 in 2015"
              sparklineData={[38000, 37200, 36800, 37500, 39100, 48200, 54300, 56800, 60200, 62400]}
              source="MoJ · Family Court Statistics Quarterly, 2024"
              href="#sec-backlog"
            />
            <MetricCard
              label="Average weeks to disposal"
              value="50"
              unit="weeks"
              direction="up"
              polarity="up-is-bad"
              changeText="Private law cases · up from 24 weeks in 2015"
              sparklineData={[24, 25, 27, 30, 32, 41, 45, 46, 48, 50]}
              source="MoJ · Family Court Statistics Quarterly, 2024"
              href="#sec-backlog"
            />
            <MetricCard
              label="Litigants in person"
              value="80%"
              direction="up"
              polarity="up-is-bad"
              changeText="At least one unrepresented party · post-LASPO impact"
              sparklineData={[58, 62, 66, 70, 73, 75, 77, 78, 79, 80]}
              source="Cafcass · Annual Report, 2024"
              href="#sec-backlog"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-backlog" className="mb-12">
            <LineChart
              title="Outstanding family court cases, England &amp; Wales"
              subtitle="Total cases outstanding at end of quarter. Includes public and private law."
              series={casesSeries}
              yLabel="Outstanding cases"
              source={{ name: 'Ministry of Justice', dataset: 'Family Court Statistics Quarterly', frequency: 'quarterly' }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-weeks" className="mb-12">
            <LineChart
              title="Average weeks from application to disposal, private law cases"
              subtitle="Mean time from application to final order in private law children cases. England and Wales."
              series={weeksSeries}
              yLabel="Weeks"
              source={{ name: 'Ministry of Justice', dataset: 'Family Court Statistics Quarterly', frequency: 'quarterly' }}
            />
          </section>
        </ScrollReveal>
      </main>
    </>
  );
}
