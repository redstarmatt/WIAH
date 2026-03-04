'use client'

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface WaitingListsData {
  waitingListSize: Array<{ year: number; waiting: number }>;
  longWaiters: Array<{ year: number; over52wk: number }>;
  bySpecialty: Array<{ specialty: string; waiting: number }>;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Component ────────────────────────────────────────────────────────────────

export default function NHSWaitingListsPage() {
  const [data, setData] = useState<WaitingListsData | null>(null);

  useEffect(() => {
    fetch('/data/nhs-waiting-lists/nhs_waiting_lists.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const waitingListSeries: Series[] = data
    ? [{
        id: 'list',
        label: 'People on NHS elective waiting list',
        colour: '#E63946',
        data: data.waitingListSize.map(d => ({
          date: yearToDate(d.year),
          value: d.waiting,
        })),
      }]
    : [];

  const longWaitersSeries: Series[] = data
    ? [{
        id: 'longwait',
        label: 'Patients waiting over 52 weeks',
        colour: '#E63946',
        data: data.longWaiters.map(d => ({
          date: yearToDate(d.year),
          value: d.over52wk,
        })),
      }]
    : [];

  return (
    <>
      <TopicNav topic="NHS Waiting Lists" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="NHS Waiting Lists"
          question="How long are NHS waiting lists?"
          finding="Over 7.5 million people are waiting for elective NHS treatment in England &mdash; equivalent to one in eight of the population &mdash; with over 300,000 waiting more than a year."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The NHS waiting list in England peaked at 7.6 million people in late 2023 &mdash; a number that would have been unimaginable a decade ago. The 18-week referral-to-treatment standard, which requires patients to begin treatment within 18 weeks of referral, was met for virtually all patients as recently as 2012. It has been breached consistently since 2014 and has never recovered. Behind that aggregate figure are real clinical categories: orthopaedics, ophthalmology, and gastroenterology carry the longest queues, but almost no specialty is meeting its access targets. The list has begun to fall slowly from its peak, but the pace of improvement is modest.</p>
            <p>The pandemic caused an enormous one-time shock &mdash; elective procedures were suspended for months, and referral backlogs accumulated rapidly. But the waiting list problem predates Covid-19. NHS capacity in beds, theatre time, and diagnostic equipment was already under strain before 2020, and staff-to-population ratios had been eroding for years. NHS productivity fell by an estimated 20% during and after the pandemic and has not fully recovered. Two-year waits peaked at around 23,000 patients in 2022 and have since fallen close to zero &mdash; a genuine, specific improvement. But it was achieved partly by prioritising the longest waiters, not by expanding total throughput.</p>
            <p>Waiting has clinical consequences that are not captured in the headline numbers. Conditions deteriorate while patients wait: a hip that was manageable at referral may have worsened substantially by the time surgery is offered; a cancer detected early may have progressed. Mental health patients who cannot access timely support often reach crisis point, generating acute admissions that are more expensive and more disruptive than earlier intervention would have been. The economic cost of sickness absence from people waiting for treatment runs into billions annually &mdash; a cost borne partly by employers and partly by the benefit system, and rarely attributed to waiting times in public accounting.</p>
            <p>One underappreciated driver of waiting list length is the difficulty of discharging patients who are medically fit to leave hospital. An estimated 13,000&ndash;14,000 hospital beds are occupied on any given day by people who no longer need acute care but cannot be discharged safely, often because social care provision &mdash; home care packages, care home places &mdash; is unavailable or delayed. This &ldquo;bed blocking&rdquo; reduces the effective capacity of the NHS to treat new patients, including those on elective waiting lists. The social care system, chronically underfunded and understaffed, is in this sense directly constraining NHS throughput.</p>
            <p>The waiting list of 7.6 million, large as it is, understates the true access problem. It counts only those who have been formally referred and accepted onto a pathway. It does not count the people who could not get a GP appointment in the first place; the 1.9 million in contact with NHS mental health services, for whom access targets are routinely missed and whose waits are tracked differently; those who have given up and disengaged from care entirely; or the roughly half of adults who have not seen an NHS dentist in two years. The data tells us about demand the system is processing &mdash; not about the demand it is failing to reach.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-list-size', label: 'Waiting List Size' },
          { id: 'sec-long-waiters', label: 'Long Waiters' },
          { id: 'sec-specialty', label: 'By Specialty' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Total on elective waiting list"
              value="7.54M"
              direction="up"
              polarity="up-is-bad"
              changeText="Record high; 4.4M pre-pandemic"
              sparklineData={[3.68, 3.9, 4.14, 4.38, 4.08, 5.45, 6.86, 7.54]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Waiting more than 52 weeks"
              value="312K"
              direction="down"
              polarity="up-is-bad"
              changeText="Was under 1,000 before COVID"
              sparklineData={[1.4, 2.8, 387, 400, 312]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Median wait for elective treatment"
              value="14.5"
              unit="weeks"
              direction="up"
              polarity="up-is-bad"
              changeText="Was 8.4 weeks in 2019"
              sparklineData={[8.4, 9.2, 10.1, 11.5, 13.2, 14.5]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-list-size" className="mb-12">
            <LineChart
              title="People on NHS elective waiting list, England"
              subtitle="Monthly snapshot of people waiting for consultant-led elective treatment. NHS England Referral to Treatment data."
              series={waitingListSeries}
              yLabel="Waiting list size (millions)"
              source={{
                name: 'NHS England',
                dataset: 'Referral to Treatment (RTT) Statistics',
                frequency: 'monthly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-long-waiters" className="mb-12">
            <LineChart
              title="Patients waiting over 52 weeks for treatment, England"
              subtitle="Waiting over one year for elective treatment. Near-zero before the pandemic."
              series={longWaitersSeries}
              yLabel="Patients over 52 weeks (thousands)"
              source={{
                name: 'NHS England',
                dataset: 'Referral to Treatment (RTT) Statistics',
                frequency: 'monthly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-specialty" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">Waiting list by clinical specialty (thousands)</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">People waiting for treatment in each specialty.</p>
            {data && (
              <div className="space-y-3">
                {data.bySpecialty.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-40 text-sm text-wiah-black flex-shrink-0">{item.specialty}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{ width: `${(item.waiting / 700000) * 100}%`, backgroundColor: '#E63946' }}
                      />
                    </div>
                    <div className="w-16 text-right text-sm font-mono text-wiah-black">{Math.round(item.waiting/1000)}K</div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: NHS England &mdash; Referral to Treatment Statistics 2023</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Elective Recovery Fund delivering results"
            value="Two-year"
            unit="waiters eliminated by early 2023"
            description="NHS England&apos;s Elective Recovery Plan set a target to eliminate waits of over two years by July 2022, then one year by March 2025. Two-year waiters were effectively eliminated by early 2023. Progress on 52-week waiters has been slower &mdash; but the total list has begun to fall in some months for the first time since 2021."
            source="Source: NHS England &mdash; Elective Recovery Plan 2023–2025"
          />
        </ScrollReveal>
      </main>
    </>
  );
}
