'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Gender identity clinic waiting list (total), 2016–2023
const waitingList = [3500, 5000, 7500, 10000, 14000, 18000, 22000, 26000];
// Average wait for first appointment (months), 2016–2023
const avgWaitMonths = [18, 24, 30, 36, 42, 48, 60, 66];
// Young people (under 18) on waiting list, 2016–2023
const youngPeopleWaiting = [300, 500, 800, 1500, 2500, 4000, 5000, 4800];
// New referrals per year (thousands), 2016–2023
const referralsK = [3.2, 3.8, 4.5, 5.0, 5.2, 4.8, 3.5, 3.2];

const waitingListSeries: Series[] = [
  {
    id: 'waiting-list',
    label: 'Gender identity clinic waiting list',
    colour: '#E63946',
    data: waitingList.map((v, i) => ({ date: new Date(2016 + i, 5, 1), value: v })),
  },
  {
    id: 'young-people',
    label: 'Under-18s waiting',
    colour: '#F4A261',
    data: youngPeopleWaiting.map((v, i) => ({ date: new Date(2016 + i, 5, 1), value: v })),
  },
];

const waitTimeSeries: Series[] = [
  {
    id: 'avg-wait',
    label: 'Average wait for first appointment (months)',
    colour: '#E63946',
    data: avgWaitMonths.map((v, i) => ({ date: new Date(2016 + i, 5, 1), value: v })),
  },
  {
    id: 'referrals',
    label: 'New referrals (thousands)',
    colour: '#264653',
    data: referralsK.map((v, i) => ({ date: new Date(2016 + i, 5, 1), value: v })),
  },
];

const waitingListAnnotations: Annotation[] = [
  { date: new Date(2019, 5, 1), label: '2019: GIDS single provider model under pressure' },
  { date: new Date(2022, 5, 1), label: '2022: NHS commissions 7 new regional clinics' },
];

const waitTimeAnnotations: Annotation[] = [
  { date: new Date(2022, 5, 1), label: '2022: Cass Review interim report' },
  { date: new Date(2023, 5, 1), label: '2023: GIDS closed, regional model begins' },
];

export default function GenderClinicPage() {
  return (
    <>
      <TopicNav topic="Health" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health"
          question="How Long Are People Waiting for Gender Care?"
          finding="The average wait for a gender identity clinic first appointment reached over 5 years in 2023, with over 26,000 people on waiting lists — a sevenfold increase in eight years, driven by surging demand against static NHS capacity."
          colour="#E63946"
          preposition="at"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The NHS has provided specialist gender dysphoria services since the 1960s, but never built capacity in proportion to demand. For most of that period, the Gender Identity Development Service (GIDS) at the Tavistock and Portman NHS Foundation Trust was the sole referral point for young people under 18 in England. Referral numbers were broadly stable through the 1990s and 2000s but rose rapidly from around 2012, accelerating further after 2016. By 2022, GIDS was receiving over 5,000 new referrals annually — more than tenfold the 2012 figure. NHS capacity did not remotely keep pace, producing a waiting list that grew from around 3,500 people in 2016 to over 26,000 by 2023.</p>
            <p>The consequences of waiting five to seven years for a first appointment are severe. Untreated gender dysphoria is associated with significantly elevated rates of depression, anxiety, self-harm, and suicidal ideation. Many patients on NHS waiting lists pursue private care in parallel, at costs of £200–£500 per consultation, creating a two-tier system where those with financial resources can access timely care while those without cannot. The Cass Review's 2024 final report acknowledged the clinical harm caused by these delays and recommended a fundamental redesign of services. NHS England commissioned seven new regional gender clinics in 2022 to replace the centralised model, with services beginning to operate from 2023–24.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Waiting List' },
          { id: 'sec-chart2', label: 'Wait Times' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Gender clinic waiting list"
              value="26,000"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 3,500 in 2016 · sevenfold increase in 8 years"
              sparklineData={waitingList.slice(-8).map(v => v / 1000)}
              source="NHS England · Gender Dysphoria Clinic Waiting Times 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Average wait for first appointment"
              value="5.5 yrs"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 1.5 years in 2016 · far beyond the 18-week standard"
              sparklineData={avgWaitMonths.slice(-8)}
              source="NHS England · Gender Dysphoria Programme 2023"
              href="#sec-chart2"
            />
            <MetricCard
              label="Young people (under 18) waiting"
              value="5,000"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Peak figure before GIDS closure · many waiting years"
              sparklineData={youngPeopleWaiting.slice(-8).map(v => v / 1000)}
              source="NHS England / GIDS · Annual statistics 2023"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Gender identity clinic waiting list, England, 2016–2023"
              subtitle="Total patients waiting (red) and under-18s waiting (amber). Waiting list grew sevenfold in eight years as demand surged and NHS capacity remained static."
              series={waitingListSeries}
              annotations={waitingListAnnotations}
              yLabel="Patients waiting"
              source={{ name: 'NHS England', dataset: 'Gender Dysphoria Clinic Waiting Times', url: 'https://www.england.nhs.uk/mental-health/gender-dysphoria/', frequency: 'quarterly', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Average gender clinic wait (months) and new referrals, England, 2016–2023"
              subtitle="Median months from referral to first clinical appointment (red) and new referrals per year in thousands (blue). Wait times continued rising even as referrals began to stabilise."
              series={waitTimeSeries}
              annotations={waitTimeAnnotations}
              yLabel="Months / Thousands"
              source={{ name: 'NHS England', dataset: 'Gender Dysphoria Clinic Waiting Times / GIDS Annual Report', url: 'https://www.england.nhs.uk/mental-health/gender-dysphoria/', frequency: 'quarterly', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Seven new regional gender clinics commissioned to replace centralised model"
            value="7"
            unit="new regional NHS gender clinics from 2023"
            description="NHS England commissioned seven new regional gender clinics in 2022 to replace the single-site GIDS model, aiming to provide more localised, holistic, multidisciplinary care closer to where patients live. The Cass Review's 2024 final report endorsed the regional model and recommended integrating mental health, endocrinology, and social support into each service. GIDS was formally closed in 2023. The new services began accepting referrals from 2023–24. If fully staffed and funded, the regional model could substantially reduce waiting times, though existing patients already in the queue face continued waits while the new services establish capacity."
            source="Source: NHS England — Gender Dysphoria Programme, Service Specification 2023. Cass Review — Final Report, April 2024."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.england.nhs.uk/mental-health/gender-dysphoria/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — Gender Dysphoria Clinic Waiting Times</a> — Quarterly data from all commissioned gender identity clinics in England. Retrieved 2024.</p>
            <p><a href="https://cass.independent-review.uk/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">The Cass Review</a> — Independent Review of Gender Identity Services for Children and Young People. Final report April 2024. Commissioned by NHS England.</p>
            <p>Waiting list size from NHS England quarterly returns. Average wait data from NHS England programme communications. Under-18 figures from former GIDS annual reports. Data covers England unless stated.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
