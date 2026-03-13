'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Audiology waiting list (thousands), 2015–2025 — NHS England RTT
const waitingListValues = [420, 480, 550, 620, 690, 760, 540, 980, 1340, 1520, 1600];

// Average wait from referral (weeks), 2015–2025 — NHS England
const avgWaitValues = [8.2, 9.5, 11.2, 13.8, 16.4, 18.9, 15.2, 24.3, 28.6, 30.8, 32.0];

// People with hearing loss (millions), 2015–2025 — RNID
const hearingLossValues = [10.0, 10.2, 10.4, 10.7, 10.9, 11.1, 11.3, 11.5, 11.7, 11.9, 12.0];

const series1: Series[] = [
  {
    id: 'waiting-list',
    label: 'Patients waiting for audiology assessment (thousands)',
    colour: '#E63946',
    data: waitingListValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v * 1000 })),
  },
];

const series2: Series[] = [
  {
    id: 'avg-wait',
    label: 'Average wait (weeks)',
    colour: '#E63946',
    data: avgWaitValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'hearing-loss',
    label: 'People with hearing loss (millions)',
    colour: '#264653',
    data: hearingLossValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v * 1000000 })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2018, 0, 1), label: '2018: 6-week access standard effectively abandoned' },
  { date: new Date(2020, 0, 1), label: '2020: COVID suspends routine audiology referrals' },
];

export default function AudiologyWaitsPage() {
  return (
    <>
      <TopicNav topic="Audiology Waits" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health"
          question="Why are 1.6 million people waiting for a hearing assessment?"
          finding="Audiology has one of the longest waiting lists relative to capacity in the NHS. 1.6 million people are waiting for assessment, average waits have nearly quadrupled from 8 to 32 weeks since 2015, and the six-week access standard has been quietly abandoned. Untreated hearing loss is the single largest modifiable risk factor for dementia."
          colour="#E63946"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Hearing is one of those things most people do not think about until it fails. But 12 million people in England now live with some degree of hearing loss, and for the 1.6 million stuck on NHS audiology waiting lists, the consequences are not abstract. Untreated hearing loss is linked to social isolation, depression, cognitive decline, and a significantly elevated risk of dementia. The Lancet Commission on Dementia identified hearing loss as the single largest modifiable risk factor for the disease, accounting for more attributable cases than smoking, physical inactivity, or hypertension. Yet audiology remains one of the most under-resourced specialties in the NHS, with waits that would be considered scandalous in almost any other clinical area. In 2015, the average wait from GP referral to first audiology appointment was 8.2 weeks. By 2025 that figure has reached 32 weeks — nearly quadrupling in a decade.</p>
            <p>COVID accelerated an existing trajectory rather than creating it: routine referrals were suspended in early 2020, and the backlog that built up during the pandemic was layered on top of a system already struggling with chronic underinvestment in audiology workforce and equipment. The old six-week access standard, once the benchmark for diagnostic audiology, has not been formally revoked but is met by almost no trust in England. The South West has average waits of 42 weeks; even London — the best-performing region — averages 26 weeks, which would have been considered a crisis a decade ago. There is one genuinely positive story: the Newborn Hearing Screening Programme, which screens babies within weeks of birth for congenital hearing loss, has maintained coverage above 98%. Early identification transforms outcomes — but the contrast is telling: the system that finds hearing problems works well; the system that is supposed to treat them does not.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Waiting list' },
          { id: 'sec-chart2', label: 'Wait times & prevalence' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Patients waiting for audiology assessment"
              value="1.6M"
              unit="2025"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 420k in 2015 · one of the longest backlogs in NHS"
              sparklineData={waitingListValues}
              source="NHS England — RTT Waiting Times, Feb 2025"
              href="#sec-chart1"
            />
            <MetricCard
              label="Average wait for hearing assessment"
              value="32 weeks"
              unit="2025"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 8 weeks in 2015 · 6-week standard long abandoned"
              sparklineData={avgWaitValues}
              source="NHS England — Diagnostic Waiting Times, Feb 2025"
              href="#sec-chart2"
            />
            <MetricCard
              label="People with hearing loss"
              value="12M"
              unit="2025"
              direction="up"
              polarity="up-is-bad"
              changeText="Rising with ageing population · projected 14.2M by 2035 · leading dementia risk factor"
              sparklineData={hearingLossValues}
              source="RNID — Hearing Matters Report 2025"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Patients waiting for NHS audiology assessment, England, 2015–2025"
              subtitle="Total patients on audiology RTT waiting list. COVID suspended routine referrals in 2020; the backlog surged as services resumed and has not recovered."
              series={series1}
              annotations={annotations}
              yLabel="Patients"
              source={{ name: 'NHS England', dataset: 'Referral to Treatment Waiting Times — Audiology', url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/referral-to-treatment-waiting-times/', frequency: 'monthly', date: 'Feb 2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Average audiology wait (weeks) and hearing loss prevalence (millions), 2015–2025"
              subtitle="Average weeks from GP referral to first assessment (red, left axis) and people with hearing loss in millions (blue, right axis). Demand rising while wait times quadruple."
              series={series2}
              annotations={[{ date: new Date(2022, 0, 1), label: '2022: Lancet Commission confirms hearing loss is top dementia risk factor' }]}
              yLabel="Weeks / Millions"
              source={{ name: 'NHS England / RNID', dataset: 'Diagnostic Waiting Times; Hearing Matters Report', url: 'https://rnid.org.uk/about-us/research-and-policy/hearing-loss-statistics/', frequency: 'annual', date: '2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Newborn hearing screening maintains 98.4% coverage"
            value="98.4%"
            unit="of newborns screened for hearing loss — near-universal coverage"
            description="The NHS Newborn Hearing Screening Programme screens babies within weeks of birth for congenital hearing loss. Despite the pandemic and wider NHS pressures, coverage has remained above 96% throughout and stands at 98.4% in the latest data. Early identification transforms outcomes for children born with hearing loss, enabling timely cochlear implantation or hearing aid fitting during the critical window for language development. The programme is internationally regarded as a model for population-level screening. The contrast with adult audiology is stark: early intervention for children works; the adult pathway is broken by underinvestment and insufficient workforce capacity."
            source="Source: NHS England — Newborn Hearing Screening Programme Annual Report 2024/25. RNID — Hearing Matters 2025."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.england.nhs.uk/statistics/statistical-work-areas/referral-to-treatment-waiting-times/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — Referral to Treatment Waiting Times</a> — monthly publication. Audiology waiting list and pathway data. RTT clock-start methodology changed in April 2021, making pre- and post-2021 figures not directly comparable.</p>
            <p><a href="https://rnid.org.uk/about-us/research-and-policy/hearing-loss-statistics/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">RNID — Hearing Matters</a> — hearing loss prevalence estimates for England, based on age-structured population modelling. Updated biennially.</p>
            <p>All figures are for England unless otherwise stated. Private audiology providers are not captured in NHS waiting list data, so true waiting times for patients who can afford private care are shorter. The 6-week access standard was set in NHS planning guidance; it has not been formally withdrawn but is not included in current NHS waiting time standards.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
