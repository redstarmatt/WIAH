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

// Interpreter booking failures, 2015–2023 (MOJ)
const bookingFailureValues = [14200, 13100, 12400, 11800, 11200, 8400, 9100, 9700, 10200];

// Cases delayed by interpreter issues %, 2015–2023
const delayedValues = [11, 10, 9, 9, 9, 7, 7, 8, 8];

// Average cost per failed hearing £, 2015–2023
const costValues = [980, 1000, 1020, 1050, 1080, 1100, 1130, 1180, 1250];

const series1: Series[] = [
  {
    id: 'bookingFailures',
    label: 'Interpreter booking failures',
    colour: '#E63946',
    data: bookingFailureValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'delayedCases',
    label: 'Cases delayed by interpreter issues (%)',
    colour: '#F4A261',
    data: delayedValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v * 800 })),
  },
];

const series2: Series[] = [
  {
    id: 'costPerFailure',
    label: 'Average cost per failed hearing (£)',
    colour: '#6B7280',
    data: costValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const annotations1: Annotation[] = [
  { date: new Date(2016, 0, 1), label: '2016: Contract transfers to thebigword' },
  { date: new Date(2020, 2, 1), label: '2020: COVID — remote interpreting expands' },
];

const annotations2: Annotation[] = [];

const editorialRefs: Reference[] = [
  { num: 1, name: 'Ministry of Justice', dataset: 'HMCTS Interpreter Services Data', url: 'https://www.gov.uk/government/organisations/hm-courts-and-tribunals-service', date: '2023' },
  { num: 2, name: 'National Audit Office', dataset: 'Language Services in the Justice System', url: 'https://www.nao.org.uk', date: '2023' },
  { num: 3, name: 'HMCTS', dataset: 'Court Statistics Quarterly', url: 'https://www.gov.uk/government/collections/court-statistics-quarterly', date: '2023' },
];

export default function CourtInterpreterServicesPage() {
  return (
    <>
      <TopicNav topic="Court Interpreter Services" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Justice"
          question="How Reliable Are Court Interpreter Services?"
          finding="There were 10,200 interpreter booking failures in Crown and magistrates courts in 2023, causing delays to justice. The average cost per failed hearing has risen to £1,250, costing the system an estimated £50 million annually."
          colour="#6B7280"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>In 2023 there were 10,200 recorded interpreter booking failures in Crown and magistrates courts in England and Wales, with 8% of hearings requiring an interpreter delayed or adjourned as a result. The Ministry of Justice outsourced interpretation to a single contractor in 2012; the NAO found 34% of bookings were not fulfilled on time in the first six months. The fragmented market of agencies and freelance interpreters has never fully recovered public confidence. Pay rates offered by framework contracts have deterred qualified interpreters, and supply in high-demand languages — Kurdish, Albanian, Arabic, Somali — is genuinely scarce. The NAO estimates interpreter failures cost the system over £50 million annually in direct and indirect costs.</p>
            <p>Each failed hearing delays justice for defendants, victims, and witnesses — some already in custody or in acute distress. A Crown Court day costs approximately £10,000; adjournments compound existing backlogs that built through the COVID-19 pandemic. Remote interpretation via video link has been partially adopted but raises quality concerns in complex criminal hearings. Reform of the procurement framework has been repeatedly deferred despite sustained criticism from the judiciary, practitioners, and Parliament. Wrong-language bookings — where a court receives an interpreter who speaks the wrong dialect or an entirely different language — now affect more than 400 hearings a year.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Interpreter Failures' },
          { id: 'sec-chart2', label: 'Cost per Failure' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Interpreter booking failures (2023)"
              value="10,200"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="rising after COVID-period lull · 8% of relevant hearings delayed"
              sparklineData={[13100, 12400, 11800, 11200, 8400, 9100, 9700, 10200]}
              source="Ministry of Justice — HMCTS interpreter services data 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Cases delayed by interpreter issues"
              value="8%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="of hearings requiring an interpreter · stable at high level"
              sparklineData={[10, 9, 9, 9, 7, 7, 8, 8]}
              source="Ministry of Justice — HMCTS interpreter services data 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Average cost per failed hearing"
              value="£1,250"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="up from £980 in 2015 · £50M+ annual system cost"
              sparklineData={[980, 1000, 1020, 1050, 1080, 1100, 1130, 1180, 1250]}
              source="National Audit Office — Language services in the justice system"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Court interpreter failures and delays, 2015–2023"
              subtitle="Annual interpreter booking failures (left scale) and proportion of hearings delayed by interpreter unavailability scaled for comparison. Booking failures fell during COVID then rose again."
              series={series1}
              annotations={annotations1}
              yLabel="Failures / delays (scaled)"
              source={{ name: 'Ministry of Justice', dataset: 'HMCTS Interpreter Services Data; NAO Reports', url: 'https://www.gov.uk/government/organisations/hm-courts-and-tribunals-service', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Average cost per failed hearing, England and Wales, 2015–2023"
              subtitle="NAO-derived estimate of the average cost of an interpreter-related hearing failure, including court time, legal representation, and rescheduling costs. Rising court costs mean each failure is increasingly expensive."
              series={series2}
              annotations={annotations2}
              yLabel="Cost per failure (£)"
              source={{ name: 'National Audit Office', dataset: 'Language Services in the Justice System', url: 'https://www.nao.org.uk', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Video remote interpreting: 60% of non-complex hearings"
            value="60%"
            unit="of non-complex hearings now use video remote interpreting"
            description="Video remote interpreting, expanded during COVID, now covers 60% of non-complex hearings — reducing travel costs and improving availability for rare languages. A 2024 MOJ pilot paying interpreters at higher rates saw no-show rates fall by 40% in participating courts. Remote interpreting does not fully substitute for in-person interpretation in complex criminal hearings, but provides a working solution for straightforward proceedings."
            source="Source: Ministry of Justice — Court Interpreting Services Statistics 2024. HMCTS Remote Hearing Pilot Evaluation 2024."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/organisations/hm-courts-and-tribunals-service" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Ministry of Justice — HMCTS Interpreter Services Data</a> — booking failure and delay statistics. Retrieved 2023.</p>
            <p><a href="https://www.nao.org.uk" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">National Audit Office — Language Services in the Justice System</a> — cost estimates and procurement analysis.</p>
            <p><a href="https://www.gov.uk/government/collections/court-statistics-quarterly" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Judiciary Statistics — Court Statistics Quarterly</a> — published quarterly.</p>
            <p>Booking failure is defined as a requested interpreter not provided at the time required. Delayed cases are hearings adjourned directly due to interpreter unavailability. Cost per failure is an NAO-derived estimate. 2020 figures reduced due to COVID-19 court closures.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
