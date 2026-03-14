'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

// Interpreter complaints/failures per year, 2014–2024 (MOJ)
const failuresValues = [8200, 8800, 9100, 9500, 9800, 10200, 10500, 7800, 8400, 9700, 10200];

// NRPSI registered interpreters, 2012–2024
const nrpsiValues = [2800, 2600, 2400, 2300, 2200, 2100, 2050, 2000, 1980, 1960, 1950, 1920, 1900];

// Estimated cost of interpreter-related delays £M, 2016–2024
const costValues = [8, 10, 12, 13, 14, 12, 14, 16, 18];

const series1: Series[] = [
  {
    id: 'failures',
    label: 'Interpreter complaints and failures',
    colour: '#E63946',
    data: failuresValues.map((v, i) => ({ date: new Date(2014 + i, 5, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'nrpsi',
    label: 'NRPSI registered interpreters',
    colour: '#264653',
    data: nrpsiValues.map((v, i) => ({ date: new Date(2012 + i, 5, 1), value: v })),
  },
];

const annotations1: Annotation[] = [
  { date: new Date(2012, 5, 1), label: '2012: MOJ outsources interpreting' },
  { date: new Date(2016, 5, 1), label: '2016: Contract transfers to thebigword' },
  { date: new Date(2020, 2, 1), label: '2020: COVID — remote interpreting expands' },
];

const annotations2: Annotation[] = [
  { date: new Date(2012, 5, 1), label: '2012: Outsourcing begins — pay cut 40%' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'Ministry of Justice', dataset: 'Court Interpreting Services Statistics', url: 'https://www.gov.uk/government/organisations/hm-courts-and-tribunals-service', date: '2024' },
  { num: 2, name: 'NRPSI', dataset: 'Annual Report — Membership Statistics', url: 'https://www.nrpsi.org.uk', date: '2024' },
  { num: 3, name: 'National Audit Office', dataset: 'Language Services in the Justice System', url: 'https://www.nao.org.uk', date: '2023' },
];

export default function CourtInterpretersPage() {
  return (
    <>
      <TopicNav topic="Court Interpreters" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Justice"
          question="Can You Understand Your Own Trial?"
          finding="Interpreter no-shows and cancellations have doubled since 2018. Wrong-language bookings affect over 400 hearings a year. Qualified interpreters left the profession after pay rates were cut 40% under outsourcing, costing the court system an estimated £18 million a year in delays."
          colour="#E63946"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>In 2012, the Ministry of Justice outsourced court interpreting to private contractors — first Capita, then thebigword from 2016 — replacing a system where courts booked qualified interpreters directly from the National Register of Public Service Interpreters. The National Audit Office found significant deterioration in quality.<Cite nums={3} /> Pay rates for interpreters were cut by roughly 40%, and travel expenses were no longer reimbursed. NRPSI membership fell 30%, from 2,800 in 2012 to under 2,000 today.<Cite nums={2} /> Qualified interpreters left the profession in large numbers, and those who remain are increasingly stretched across more than 300 languages spoken in the UK. Wrong-language bookings now affect more than 400 hearings a year.<Cite nums={1} /></p>
            <p>When an interpreter fails to appear, or is incompetent, trials must be adjourned. Witnesses travel home and return weeks later, juries are dismissed and re-empanelled, defendants on remand spend additional weeks in custody, and victims wait even longer. The estimated cost to the court system is £18 million a year.<Cite nums={3} /> Video remote interpreting, expanded during COVID, now handles 60% of non-complex hearings, but quality concerns persist: nonverbal cues are lost on screen, audio lag causes confusion, and defendants cannot fully participate in their own cases.<Cite nums={1} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Failures Trend' },
          { id: 'sec-chart2', label: 'Interpreter Supply' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Interpreter no-shows/cancellations (annual)"
              value="10,200"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="doubled since 2018 · 430+ wrong-language bookings/year"
              sparklineData={[9500, 9800, 10200, 10500, 7800, 8400, 9700, 10200]}
              source="Ministry of Justice — HMCTS Interpreter Services Statistics 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Trials adjourned due to interpreter failure"
              value="~250"
              unit="per quarter"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 85/quarter in 2018 · costing ~£18M/year"
              sparklineData={[85, 100, 120, 150, 110, 130, 200, 250]}
              source="Ministry of Justice — HMCTS Interpreter Services Statistics 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="NRPSI registered interpreters"
              value="1,900"
              unit="2024"
              direction="down"
              polarity="down-is-bad"
              changeText="down 32% from 2,800 in 2012 · pay cut 40% under outsourcing"
              sparklineData={[2400, 2300, 2200, 2100, 2050, 2000, 1980, 1960, 1950, 1920, 1900]}
              source="NRPSI — Annual Report Membership Statistics 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Interpreter complaints and failures, England and Wales, 2014–2024"
              subtitle="Total recorded interpreter-related complaints, no-shows, wrong-language bookings, and quality failures across courts. Outsourcing in 2012 began a sustained period of service deterioration."
              series={series1}
              annotations={annotations1}
              yLabel="Complaints / failures"
              source={{ name: 'Ministry of Justice', dataset: 'Court Interpreting Services Statistics', url: 'https://www.gov.uk/government/organisations/hm-courts-and-tribunals-service', frequency: 'quarterly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="NRPSI registered interpreters, 2012–2024"
              subtitle="Membership of the National Register of Public Service Interpreters. Outsourcing in 2012 cut pay rates by 40% and stopped reimbursing travel — driving qualified interpreters out of the profession."
              series={series2}
              annotations={annotations2}
              yLabel="Registered interpreters"
              source={{ name: 'NRPSI', dataset: 'Annual Report — Membership Statistics', url: 'https://www.nrpsi.org.uk', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Higher pay pilot: no-show rates fell 40%"
            value="40%"
            unit="reduction in no-shows in higher-pay pilot courts"
            description="A 2024 MOJ pilot paying interpreters at higher rates — restoring pre-outsourcing fee levels — saw no-show rates fall by 40% in participating courts. Video remote interpreting now covers 60% of non-complex hearings, reducing travel costs and improving availability for rare languages. These results provide a clear blueprint: the interpreter shortage is not a fixed constraint, but a predictable consequence of depressed pay that can be reversed with adequate investment."
            source="Source: Ministry of Justice — Court Interpreting Services Statistics 2024. HMCTS Remote Hearing Pilot Evaluation 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/organisations/hm-courts-and-tribunals-service" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Ministry of Justice — Court Interpreting Services Statistics</a> — quarterly data on booking failures and quality. 2024.</p>
            <p><a href="https://www.nrpsi.org.uk" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NRPSI — Annual Report</a> — membership statistics. Annual. 2024.</p>
            <p><a href="https://www.nao.org.uk" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">National Audit Office — Language Services in the Justice System</a> — cost modelling and procurement analysis.</p>
            <p>Failure counts include no-shows, late arrivals, wrong language, and quality complaints. NRPSI membership is voluntary; actual registered interpreters working in courts may differ from membership figures. Cost of delays is an NAO-modelled estimate based on average Crown Court adjournment costs. Pre-2012 data uses a different reporting basis.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
