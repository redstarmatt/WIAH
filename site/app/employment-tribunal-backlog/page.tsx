'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

const pendingCasesData = [385, 370, 320, 290, 280, 260, 270, 310, 390, 470, 500, 480, 460, 445];
const pendingCasesAnnotations: Annotation[] = [
  { date: new Date(2013, 0, 1), label: '2013: Fees introduced — cases collapse' },
  { date: new Date(2017, 0, 1), label: '2017: Supreme Court: fees unlawful' },
  { date: new Date(2020, 0, 1), label: '2020: COVID backlog begins' },
];

const pendingSeries: Series[] = [
  {
    id: 'pending',
    label: 'Employment tribunal pending cases (thousands)',
    colour: '#6B7280',
    data: pendingCasesData.map((v, i) => ({ date: new Date(2013 + i, 0, 1), value: v })),
  },
];

const disposalTimeData = [26, 24, 22, 20, 22, 24, 25, 27, 35, 42, 47, 48, 46, 45];
const disposalAnnotations: Annotation[] = [
  { date: new Date(2013, 0, 1), label: '2013: Fees reduce demand' },
  { date: new Date(2020, 0, 1), label: '2020: Pandemic disruption' },
  { date: new Date(2021, 0, 1), label: '2021: Peak backlog' },
];

const disposalSeries: Series[] = [
  {
    id: 'disposal-time',
    label: 'Average disposal time (weeks)',
    colour: '#6B7280',
    data: disposalTimeData.map((v, i) => ({ date: new Date(2013 + i, 0, 1), value: v })),
  },
];

export default function EmploymentTribunalBacklogPage() {
  return (
    <>
      <TopicNav topic="Employment Tribunals" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Employment Tribunals"
          question="Can Workers Get Justice at an Employment Tribunal?"
          finding="Employment tribunal cases take an average of 47 weeks to resolve — backlogs hit 500,000 at peak — and the introduction of fees in 2013 (later ruled unlawful) decimated access to justice."
          colour="#6B7280"
          preposition="on"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key numbers' },
          { id: 'sec-backlog', label: 'Pending cases' },
          { id: 'sec-time', label: 'Disposal time' },
        ]} />

        <section id="sec-metrics" className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Average case duration (weeks)"
              value="47"
              direction="up"
              polarity="up-is-bad"
              changeText="2023/24 · Up from 26 weeks in 2013 · Nearly a year to resolve a claim · Workers losing income throughout"
              sparklineData={[24, 22, 22, 25, 35, 47, 45]}
              source="MoJ — Tribunal statistics quarterly, 2024"
            />
            <MetricCard
              label="Pending cases (thousands)"
              value="445"
              direction="down"
              polarity="up-is-bad"
              changeText="2023/24 · Down from 500K peak · Still 60% above pre-pandemic · Unfair dismissal, discrimination, wage claims"
              sparklineData={[310, 390, 470, 500, 480, 460, 445]}
              source="MoJ — Tribunal statistics quarterly, 2024"
            />
            <MetricCard
              label="Cases accepted per year (thousands)"
              value="42"
              direction="up"
              polarity="neutral"
              changeText="2023/24 · Recovering since 2017 fees abolition · Was 100K+ before 2013 fees · Fees reduced claims by 70% at peak"
              sparklineData={[38, 34, 28, 22, 32, 40, 42]}
              source="MoJ — Tribunal statistics quarterly, 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-backlog" className="mb-12">
            <LineChart
              title="Employment tribunal pending cases, 2013–2024 (thousands)"
              subtitle="Number of outstanding employment tribunal claims awaiting hearing or disposal, England, Scotland and Wales. The 2013 fees regime collapsed claims; their abolition in 2017 and COVID combined to create a massive backlog."
              series={pendingSeries}
              annotations={pendingCasesAnnotations}
              yLabel="Pending cases (thousands)"
              source={{
                name: 'MoJ',
                dataset: 'Tribunal statistics quarterly',
                url: 'https://www.gov.uk/government/collections/tribunals-statistics',
                frequency: 'quarterly',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-time" className="mb-12">
            <LineChart
              title="Employment tribunal average disposal time, 2013–2024 (weeks)"
              subtitle="Average time from claim receipt to final disposal (hearing, settlement, or withdrawal) for employment tribunal cases. Wait times have nearly doubled since 2013."
              series={disposalSeries}
              annotations={disposalAnnotations}
              yLabel="Average disposal time (weeks)"
              source={{
                name: 'MoJ',
                dataset: 'Tribunal statistics quarterly — disposal times',
                url: 'https://www.gov.uk/government/collections/tribunals-statistics',
                frequency: 'quarterly',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on employment tribunals</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Employment tribunal cases take an average of 47 weeks to resolve — nearly a year. This wait, during which a claimant may be out of work and unable to secure a reference, represents a substantial barrier to justice. The backlog of pending cases peaked at around 500,000 during the COVID-19 pandemic and has reduced to 445,000, but remains 60% above pre-pandemic levels. Unfair dismissal, unpaid wages, and discrimination are the most common claim types.</p>
              <p>The history of employment tribunal fees is a case study in access to justice. In 2013 the coalition government introduced fees of up to £1,200 per claim, with the stated intention of reducing vexatious claims and encouraging earlier settlement. Claims fell by 70% in the first year — a fall so extreme that the Supreme Court ruled in R (Unison) v Lord Chancellor [2017] that the fees regime was unlawful as it effectively prevented workers from exercising their statutory rights. Fees were abolished and partial refunds issued, but the tribunal system never fully recovered its pre-2013 capacity, and the backlog that built up post-2017 was then dramatically worsened by the pandemic.</p>
              <p>The practical effect of lengthy waits is that many valid claims are never brought or are settled at a discount because claimants cannot sustain the financial and emotional cost of waiting. Legal aid for employment tribunal claims was removed in 2013 and has not been restored. Citizens Advice and trade unions provide some representation, but the majority of claimants are unrepresented, at a disadvantage against employers with legal teams.</p>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What has been tried"
            value="70%"
            unit="fall in employment tribunal claims after fees were introduced in 2013 — demonstrating how cost blocks access to justice"
            description="ACAS (the Advisory, Conciliation and Arbitration Service) provides a free early conciliation service that must be attempted before lodging a tribunal claim. Around 50% of cases are resolved through ACAS without reaching tribunal, saving both parties time and cost. The government has committed to increasing the number of employment tribunal judges and digitalising case management. But the fundamental problems — insufficient judicial capacity, no legal aid for representation, and multi-year waits — have not been structurally addressed."
            source="Source: MoJ — Tribunal statistics quarterly 2023/24; R (Unison) v Lord Chancellor [2017] UKSC 51."
          />
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.gov.uk/government/collections/tribunals-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">MoJ — Tribunal statistics quarterly</a> — primary employment tribunal data. Updated quarterly.</p>
            <p>Pending cases = outstanding receipts at end of quarter. Disposal time = mean time from receipt to final disposal. Data covers Employment Tribunals in England, Scotland and Wales.</p>
            <p>Pre-2013 comparators use Historical Employment Tribunal statistics; 2013 onwards uses quarterly bulletin series. Minor methodological differences apply at the break point.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
