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

// Average wait time in weeks (quarterly data mapped to years), 2015–2025 — DVSA
const waitValues = [8, 8, 8, 7, 8, 8, 9, 9, 8, 22, 20, 19, 18, 17, 17];

// Pass rate (%), 2015–2025 — DVSA
const passRateValues = [47, 47, 46, 47, 47, 46, 46, 47, 47, 44, 44, 43, 43, 43, 43];

// Target line
const targetValues = waitValues.map(() => 9);

const waitSeries: Series[] = [
  {
    id: 'wait-time',
    label: 'Average wait (weeks)',
    colour: '#F4A261',
    data: waitValues.map((v, i) => ({ date: new Date(2015 + i * 0.7, 0, 1), value: v })),
  },
  {
    id: 'target',
    label: 'DVSA target (9 weeks)',
    colour: '#2A9D8F',
    data: targetValues.map((v, i) => ({ date: new Date(2015 + i * 0.7, 0, 1), value: v })),
  },
];

const passRateSeries: Series[] = [
  {
    id: 'pass-rate',
    label: 'Pass rate (%)',
    colour: '#6B7280',
    data: passRateValues.map((v, i) => ({ date: new Date(2015 + i * 0.7, 0, 1), value: v })),
  },
];

const waitAnnotations: Annotation[] = [
  { date: new Date(2020, 2, 1), label: '2020: Testing suspended (COVID)' },
  { date: new Date(2024, 0, 1), label: '2024: 300 new examiner posts opened' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'DVSA', dataset: 'Driving test waiting times', url: 'https://www.gov.uk/government/collections/driving-test-statistics', date: 'Q1 2025' },
  { num: 2, name: 'DVSA', dataset: 'Driving test pass rates', url: 'https://www.gov.uk/government/collections/driving-test-statistics', date: 'Q1 2025' },
  { num: 3, name: 'DVSA', dataset: 'Annual Report and Accounts', url: 'https://www.gov.uk/government/organisations/driver-and-vehicle-standards-agency', date: '2024/25' },
];

export default function DrivingTestBacklogPage() {
  return (
    <>
      <TopicNav topic="Transport" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Transport"
          question="Can You Actually Learn to Drive?"
          finding="The average wait for a practical driving test is 17 weeks — nearly double the DVSA's 9-week target. Around 1.5 million people are in the queue at any time, and pass rates have fallen from 47% to 43% since 2019."
          colour="#F4A261"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Before COVID, the average wait for a practical driving test in England was around 8 weeks. By early 2021 it had passed 22 weeks and it has never returned to normal: the current national average is 17 weeks, against a DVSA target of 9.<Cite nums={1} /> In parts of Wales, the South West, and rural Scotland, waits exceed 20 weeks. Around 1.5 million people are in the testing queue at any one time, up from roughly 820,000 before the pandemic.<Cite nums={1} /> The backlog was created when approximately 500,000 tests were cancelled during lockdowns, but it persists because DVSA has not been able to recruit and retain enough examiners.<Cite nums={3} /> Examiner pay starts at around £27,000 — below the median full-time salary — and the role requires weekend and evening work. Meanwhile, a cottage industry of test-date reselling has emerged, with third-party apps charging candidates £20-50 to grab a cancelled slot, creating a two-tier system.</p>
            <p>The consequences fall hardest on young people. In areas without reliable public transport, a driving licence is effectively a prerequisite for employment and apprenticeships. A 17-year-old who fails their test today faces a 17-week wait to retake it, and pass rates have declined from 47% in 2019 to 43% in 2025 — possibly reflecting reduced practice hours as lesson costs have risen.<Cite nums={2} /> Each failed attempt sends the candidate back to the end of the queue, compounding the delay. The problem is structural: insufficient examiner capacity meeting sustained high demand, with no mechanism to clear the accumulated backlog faster than new demand replaces it.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Wait times' },
          { id: 'sec-chart2', label: 'Pass rates' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Average wait for practical test"
              value="17"
              unit="weeks"
              direction="up"
              polarity="up-is-bad"
              changeText="Target: 9 weeks · was 8 weeks pre-pandemic"
              sparklineData={[8, 8, 8, 8, 22, 20, 19, 18, 17]}
              source="DVSA · Driving test waiting times, Q1 2025"
              href="#sec-chart1"
            />
            <MetricCard
              label="Tests in queue"
              value="1.5m"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 820k pre-pandemic"
              sparklineData={[820, 820, 820, 820, 1600, 1700, 1600, 1550, 1500]}
              source="DVSA · Driving test statistics, Q1 2025"
              href="#sec-chart1"
            />
            <MetricCard
              label="Pass rate"
              value="43.2"
              unit="%"
              direction="down"
              polarity="down-is-bad"
              changeText="Was 47% in 2019 · each fail means rejoining the queue"
              sparklineData={[47, 47, 47, 46, 44, 44, 43, 43, 43]}
              source="DVSA · Driving test pass rates, Q1 2025"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Average waiting time for practical driving test vs DVSA target, 2015–2025"
              subtitle="Weeks from booking to first available test date, Great Britain. DVSA target is 9 weeks. COVID suspension created a backlog that has never cleared."
              series={waitSeries}
              annotations={waitAnnotations}
              yLabel="Weeks"
              source={{ name: 'DVSA', dataset: 'Driving test waiting times', url: 'https://www.gov.uk/government/collections/driving-test-statistics', frequency: 'quarterly', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Practical driving test pass rate, 2015–2025"
              subtitle="Percentage of tests resulting in a pass. Declined from 47% to 43% since 2019, possibly reflecting higher costs of lessons and fewer practice hours."
              series={passRateSeries}
              annotations={[{ date: new Date(2020, 2, 1), label: '2020: Testing suspended' }]}
              yLabel="Pass rate (%)"
              source={{ name: 'DVSA', dataset: 'Driving test pass rates', url: 'https://www.gov.uk/government/collections/driving-test-statistics', frequency: 'quarterly', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="300 new examiner posts making a dent"
            value="300 posts"
            description="DVSA opened 300 additional examiner posts in 2024 and extended Saturday testing at high-demand centres. Some regions have seen waits fall from 24 weeks to 14 weeks as new examiners qualified. The recruitment drive is the largest in DVSA's history, though retention remains a challenge at current pay levels."
            source="Source: DVSA — Annual Report 2024/25. Driving test waiting times, Q1 2025."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/driving-test-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DVSA — Driving test statistics</a> — quarterly data on waiting times, test volumes, and pass rates by test centre and region.</p>
            <p><a href="https://www.gov.uk/government/organisations/driver-and-vehicle-standards-agency" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DVSA — Annual Report and Accounts</a> — examiner recruitment, capacity planning, and strategic objectives.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
