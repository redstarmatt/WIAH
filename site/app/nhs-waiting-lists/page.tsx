'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'NHS England', dataset: 'Referral to Treatment (RTT) Waiting Times Statistics', url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/rtt-waiting-times/', date: '2024' },
  { num: 2, name: 'NHS England', dataset: 'Elective Recovery Plan', url: 'https://www.england.nhs.uk/coronavirus/publication/delivery-plan-for-tackling-the-covid-19-backlog-of-elective-care/', date: '2022' },
  { num: 3, name: 'NHS Confederation', dataset: 'Hidden waiting list analysis', url: 'https://www.nhsconfed.org/', date: '2023' },
];

export default function NhsWaitingListsPage() {
  // NHS elective waiting list (millions) 2015–2024
  const waitingList = [2.9, 3.1, 3.3, 3.6, 4.0, 4.2, 4.4, 5.8, 6.7, 7.6];
  // Patients waiting >52 weeks (thousands) 2015–2024
  const over52wks = [3.2, 3.5, 4.1, 4.8, 5.5, 6.2, 1.6, 310, 400, 330];
  // Average wait (weeks) 2015–2024
  const avgWait = [7.5, 7.7, 7.8, 8.0, 8.5, 8.8, 8.9, 13.2, 15.1, 14.6];

  const chart1Series: Series[] = [
    {
      id: 'waitlist',
      label: 'Total elective waiting list (millions)',
      colour: '#E63946',
      data: waitingList.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: COVID — elective care suspended' },
    { date: new Date(2022, 0, 1), label: '2022: Elective recovery plan' },
  ];

  const chart1TargetLine = { value: 18 / 52 * 7.6, label: '18-week target' };

  const chart2Series: Series[] = [
    {
      id: 'over52',
      label: 'Patients waiting >52 weeks (thousands)',
      colour: '#E63946',
      data: over52wks.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: COVID disruption' },
    { date: new Date(2021, 0, 1), label: '2021: Backlog surges' },
  ];

  return (
    <>
      <TopicNav topic="NHS Waiting Lists" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="NHS Waiting Lists"
          question="How Long Is the NHS Waiting List?"
          finding="The NHS waiting list reached 7.6 million — a record — with 330,000 patients waiting over a year; the average wait is now 14.6 weeks, double the pre-pandemic level."
          colour="#E63946"
          preposition="on"
        />

        <section className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Total NHS elective waiting list (millions)"
              value="7.6"
              direction="up"
              polarity="up-is-bad"
              changeText="+162% since 2015 · record high"
              sparklineData={waitingList}
              source="NHS England — Referral to treatment statistics, 2024"
            />
            <MetricCard
              label="Waiting over 52 weeks (thousands)"
              value="330"
              direction="down"
              polarity="up-is-bad"
              changeText="down from 400k peak · still 100x pre-pandemic level"
              sparklineData={[3.2, 3.5, 4.1, 4.8, 5.5, 6.2, 1.6, 310, 400, 330]}
              source="NHS England — Referral to treatment statistics, 2024"
            />
            <MetricCard
              label="Average wait (weeks)"
              value="14.6"
              direction="up"
              polarity="up-is-bad"
              changeText="double pre-pandemic level of ~7.5 weeks"
              sparklineData={avgWait}
              source="NHS England — Referral to treatment statistics, 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="NHS elective waiting list, England, 2015–2024"
              subtitle="Millions of people waiting for consultant-led elective treatment. Statutory target is 18 weeks."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Millions waiting"
              source={{
                name: 'NHS England',
                dataset: 'Referral to treatment (RTT) waiting times statistics',
                frequency: 'monthly',
                url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/rtt-waiting-times/',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="mb-12">
            <LineChart
              title="Patients waiting over 52 weeks, England, 2015–2024"
              subtitle="Thousands. Waiting more than a year for treatment was effectively eliminated pre-pandemic. It is now chronic."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Thousands waiting >52 weeks"
              source={{
                name: 'NHS England',
                dataset: 'Referral to treatment (RTT) waiting times statistics',
                frequency: 'monthly',
                url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/rtt-waiting-times/',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">How the backlog built up</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>The NHS elective waiting list was growing before COVID-19 — rising from 2.9 million in 2015 to 4.4 million in early 2020 as demand outpaced capacity.<Cite nums={1} /> Then the pandemic suspended most elective care for extended periods, and the list surged to a peak of 7.8 million. By 2024 it had edged down slightly to 7.6 million, but remains at a record level relative to population.<Cite nums={1} /></p>
              <p>The statutory target — that 92% of patients should wait no more than 18 weeks from referral to treatment — has not been met nationally since 2016.<Cite nums={1} /> Waits of over a year, which had been virtually eliminated, are now routine: 330,000 people have been waiting more than 52 weeks.<Cite nums={1} /> The longest waits are concentrated in orthopaedics, ophthalmology, and gastroenterology.</p>
              <p>The NHS Elective Recovery Plan has targeted the longest waits and used independent sector capacity to boost throughput.<Cite nums={2} /> Progress has been made on the extreme tail — waits of more than two years have been largely eliminated — but the overall list size has proved stubbornly resistant to reduction as new referrals continue to outpace completions.<Cite nums={[1, 3]} /></p>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.england.nhs.uk/statistics/statistical-work-areas/rtt-waiting-times/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — Referral to treatment (RTT) waiting times statistics</a>. Monthly. Retrieved 2024.</p>
            <p>RTT statistics count the number of incomplete pathways — patients who have been referred and not yet started treatment. Figures are for England. The 18-week target requires 92% of patients to start treatment within 18 weeks of referral.</p>
          </div>
        </section>
      </main>
    </>
  );
}
