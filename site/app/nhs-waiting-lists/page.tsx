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
            <p>The NHS elective waiting list peaked at 7.6 million in late 2023, from 4.4 million before the pandemic &mdash; equivalent to one in eight of the population. The 18-week referral-to-treatment standard was met for virtually all patients in 2012; it has been breached consistently since 2014 and never recovered. The pandemic caused an acute shock &mdash; elective procedures were suspended for months &mdash; but the problem predates COVID-19: capacity in beds, theatre time, and diagnostic equipment was already under strain. NHS productivity fell an estimated 20% during and after the pandemic and has not fully recovered. Orthopaedics, ophthalmology, and gastroenterology carry the longest queues; almost no specialty meets its targets. The list has begun to fall slowly from its peak, but median wait has risen from 8.4 weeks in 2019 to 14.5 weeks.</p>
            <p>Waiting has real clinical consequences. Conditions deteriorate between referral and treatment: a hip that was manageable may worsen; a cancer caught early may progress. Mental health patients unable to access timely support often reach crisis point, generating acute admissions more expensive than earlier intervention. The economic cost of sickness absence from people on waiting lists runs into billions annually, rarely attributed to waiting times in public accounts. An estimated 13,000&ndash;14,000 beds occupied daily by discharge-delayed patients directly reduces capacity to treat new admissions. The headline of 7.6 million understates true unmet need: it counts only those formally referred &mdash; not those who could not get a GP appointment, those who disengaged, or the 1.9 million in mental health services whose waits are tracked separately.</p>
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
