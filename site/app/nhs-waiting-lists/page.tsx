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
            <p>The NHS elective waiting list in England reached 7.54 million people in 2023 &mdash; equivalent to roughly one in eight of the entire population. Before COVID-19, the list stood at 4.38 million; the pandemic prevented around two million procedures from going ahead, and the backlog has never been fully cleared. The collapse in long-wait figures was the starkest measure of the disruption: before 2020, fewer than 1,400 people waited more than 52 weeks for treatment. By January 2022 that figure had reached 400,000; as of 2023 around 312,000 patients still wait over a year.</p>
            <p>The backlog is not evenly distributed. Trauma and orthopaedics &mdash; joint replacements, fracture repairs &mdash; carries the largest single queue at around 690,000 patients. Ophthalmology, covering cataracts and other eye conditions, accounts for roughly 490,000. These are often characterised as non-urgent, but many patients experience severe pain, loss of mobility, and inability to work for years while waiting. A structural problem compounds the backlog: most NHS hospitals do not separate elective and emergency pathways. When emergency demand rises &mdash; as it does every winter &mdash; elective procedures are cancelled to free beds, resetting recovery progress each year.</p>
            <p>NHS England&apos;s Elective Recovery Plan, backed by the Elective Recovery Fund, set staged targets: eliminate two-year waits (largely achieved by early 2023), then 18-month waits, then reduce 52-week waits. NHS Surgical Hubs &mdash; facilities ring-fenced for elective work and insulated from emergency pressures &mdash; are being expanded, alongside greater use of independent sector treatment centres. Yet the list was already growing before the pandemic: it rose from 3.68 million in 2016 to 4.38 million by the end of 2019. COVID accelerated a structural constraint rather than creating an entirely new one.</p>
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
