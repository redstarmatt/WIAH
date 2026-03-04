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
          finding="62,400 cases are outstanding in England&apos;s family courts &mdash; up 64&percnt; from pre-pandemic levels. The average private law case now takes 50 weeks to resolve, double the 2015 figure. Children caught in disputed proceedings wait nearly a year for a decision about where and with whom they will live."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England&apos;s family courts handle two broad categories of work. Public law cases involve local authorities seeking to protect children from harm &mdash; care proceedings, supervision orders, emergency protection. Private law cases involve disputes between individuals, overwhelmingly about child arrangements following separation: where a child will live, how much time they spend with each parent, and whether there are concerns about domestic abuse or welfare. Both categories are in crisis. Outstanding cases across the family court system reached 62,400 in 2024, up from 38,000 in 2015. The average private law case now takes 50 weeks from application to final order.</p>
            <p>The 26-week statutory limit for care proceedings, introduced in 2014, was designed to prevent children languishing in temporary placements while courts deliberated. It worked initially, reducing average disposal times from 47 weeks to 27 weeks. But the gains have been eroded: by 2024, only 43&percnt; of care cases concluded within 26 weeks. Court closures during COVID-19 created a backlog that has never been fully cleared, and rising demand &mdash; driven partly by increased referrals from domestic abuse services and children&apos;s social care &mdash; has overwhelmed a system that was already operating at or beyond capacity.</p>
            <p>Private law cases, which constitute around 60&percnt; of the family court workload, have been particularly affected. The removal of legal aid for most private family law matters in 2013 (LASPO Act) has led to a surge in litigants in person &mdash; people representing themselves without a lawyer. In 2024, at least one party was unrepresented in 80&percnt; of private law cases. Judges report that hearings take longer because unrepresented parties require more procedural guidance. Cross-examination of former partners by alleged perpetrators of domestic abuse was banned by the 2021 Domestic Abuse Act, but the provision of court-appointed advocates for these hearings has been inconsistently funded.</p>
            <p>Children bear the greatest burden. Those caught in care proceedings may spend months in foster placements of uncertain duration. Those in private law disputes &mdash; often involving parental alienation allegations, domestic abuse concerns, or relocation applications &mdash; live with unresolved anxiety about their living arrangements for close to a year. Research consistently shows that prolonged court proceedings are associated with worse outcomes for children&apos;s emotional wellbeing. Black and ethnic minority families experience longer average waiting times, partly because of higher rates of unrepresented parties and the additional complexity that language and cultural factors introduce. Families in London and the South East face the longest waits; rural courts have shorter queues but fewer sitting days.</p>
            <p>Family court data is less transparent than criminal court statistics. Proceedings are held in private, and until recent reforms, almost no information about outcomes was published. Cafcass (the Children and Family Court Advisory and Support Service) publishes demand data but not outcome data. The Ministry of Justice publishes quarterly statistics on case volumes and disposal times, but these do not break down by case type or region in sufficient detail for rigorous analysis. The 26-week care target is measured from the date of issue, not from the date of the incident that triggered proceedings, which can understate actual elapsed time. Private law cases have no equivalent statutory target. Comparisons with other jurisdictions are complicated by different legal frameworks, thresholds for state intervention, and definitions of &ldquo;disposal.&rdquo;</p>
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
              source="MoJ &middot; Family Court Statistics Quarterly, 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Average weeks to disposal"
              value="50"
              unit="weeks"
              direction="up"
              polarity="up-is-bad"
              changeText="Private law cases &middot; up from 24 weeks in 2015"
              sparklineData={[24, 25, 27, 30, 32, 41, 45, 46, 48, 50]}
              source="MoJ &middot; Family Court Statistics Quarterly, 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Litigants in person"
              value="80%"
              direction="up"
              polarity="up-is-bad"
              changeText="At least one unrepresented party &middot; post-LASPO impact"
              sparklineData={[58, 62, 66, 70, 73, 75, 77, 78, 79, 80]}
              source="Cafcass &middot; Annual Report, 2024"
              onExpand={() => {}}
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
