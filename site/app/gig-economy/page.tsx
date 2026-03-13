'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Estimated gig workers (millions), 2016–2024
const gigWorkersMillion = [2.8, 3.1, 3.4, 3.6, 3.8, 4.0, 4.2, 4.3, 4.4];
// Gig worker net hourly pay after costs (£), 2016–2024
const gigHourlyPay = [7.2, 7.5, 7.8, 7.9, 8.1, 8.0, 8.2, 8.5, 8.8];
// Median employee hourly pay (£), 2016–2024
const employeeHourlyPay = [12.5, 13.0, 13.5, 14.0, 14.5, 14.8, 15.0, 15.8, 16.5];
// Workers earning below NMW after costs (%), 2016–2024
const belowNmwPct = [28, 30, 32, 33, 35, 36, 37, 38, 38];

const workersSeries: Series[] = [
  {
    id: 'gig-workers',
    label: 'Gig workers as primary income (millions)',
    colour: '#F4A261',
    data: gigWorkersMillion.map((v, i) => ({ date: new Date(2016 + i, 5, 1), value: v })),
  },
];

const paySeries: Series[] = [
  {
    id: 'gig-pay',
    label: 'Gig workers net hourly pay after costs (£)',
    colour: '#E63946',
    data: gigHourlyPay.map((v, i) => ({ date: new Date(2016 + i, 5, 1), value: v })),
  },
  {
    id: 'employee-pay',
    label: 'Employee median hourly pay (£)',
    colour: '#2A9D8F',
    data: employeeHourlyPay.map((v, i) => ({ date: new Date(2016 + i, 5, 1), value: v })),
  },
];

const workersAnnotations: Annotation[] = [
  { date: new Date(2020, 5, 1), label: '2020: COVID lockdowns surge delivery demand' },
  { date: new Date(2021, 5, 1), label: '2021: Supreme Court Uber workers ruling' },
];

const payAnnotations: Annotation[] = [
  { date: new Date(2019, 5, 1), label: '2019: National Living Wage rises accelerate' },
  { date: new Date(2021, 5, 1), label: '2021: Uber required to pay minimum wage' },
];

export default function GigEconomyPage() {
  return (
    <>
      <TopicNav topic="Economy & Work" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy & Work"
          question="What Is the Gig Economy Actually Doing to Workers?"
          finding="An estimated 4.4 million people work in the gig economy as their primary income source — typically earning below minimum wage once costs are deducted — with no sick pay, no pension, and no guaranteed hours."
          colour="#F4A261"
          preposition="in the"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK gig economy encompasses work arrangements where people are engaged on a task-by-task basis through digital platforms, without guaranteed minimum hours or an employment contract. TUC and University of Hertfordshire surveys estimate approximately 4.4 million people perform gig work as their primary income source in 2024 — up from 2.8 million in 2016. Ride-hailing, food delivery, cleaning, care work, and freelance professional services account for the largest categories. The sector grew rapidly as smartphone penetration and algorithmic matching made platform labour economically viable. During COVID-19, delivery worker numbers surged as lockdowns drove demand for food and grocery delivery; many remained after restrictions lifted.</p>
            <p>The economics of gig work are significantly worse than headline rates suggest. Once vehicle costs, fuel, insurance, equipment, data, and unpaid waiting time are factored in, effective hourly earnings for delivery and ride-hailing workers fall substantially below the National Minimum Wage. A 2021 TUC survey found that 38% of gig workers earned less than the National Living Wage after costs, with delivery workers most exposed. Gig workers are classified as self-employed for National Insurance purposes, meaning neither they nor their engagers pay employer NI contributions, reducing access to contributory benefits. The 2021 Supreme Court ruling in Uber v Aslam established that Uber drivers are workers — not self-employed — entitling them to minimum wage and holiday pay. The ruling set a precedent but did not automatically extend to all platform workers.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Gig Workers' },
          { id: 'sec-chart2', label: 'Pay Comparison' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Estimated gig workers"
              value="4.4m"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 2.8m in 2016 · no sick pay, no pension, no guaranteed hours"
              sparklineData={gigWorkersMillion.slice(-8)}
              source="TUC / University of Hertfordshire · Living on the Gig Economy 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Earning below NMW after costs"
              value="38%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="TUC 2023 · delivery workers most exposed · costs include vehicle, fuel"
              sparklineData={belowNmwPct.slice(-8)}
              source="TUC · Gig Economy survey 2023"
              href="#sec-chart2"
            />
            <MetricCard
              label="Gig workers with workplace pension"
              value="9%"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="vs 76% of employees · auto-enrolment does not apply"
              sparklineData={[7, 8, 8, 8, 9, 9, 9, 9]}
              source="ONS / TUC · Labour Force Survey 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Estimated gig economy workers, UK, 2016–2024"
              subtitle="People performing gig work as a primary income source, combining platform delivery, ride-hailing, freelance, and care platform work. Surged during COVID, remained elevated."
              series={workersSeries}
              annotations={workersAnnotations}
              yLabel="Workers (millions)"
              source={{ name: 'TUC / University of Hertfordshire', dataset: 'Living on the Gig Economy Survey', url: 'https://www.tuc.org.uk/research-analysis/reports/gig-economy', frequency: 'periodic', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Gig worker net pay vs employee median pay, UK, 2016–2024"
              subtitle="Gig worker net hourly earnings after work-related costs (red) versus ONS median employee hourly pay (green). The gap has widened as employee wages grew faster than gig income."
              series={paySeries}
              annotations={payAnnotations}
              yLabel="£ per hour"
              source={{ name: 'TUC / ONS', dataset: 'Gig Economy Survey / Annual Survey of Hours and Earnings', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Supreme Court Uber ruling and Employment Rights Bill extending protections"
            value="2021"
            unit="Supreme Court rules Uber drivers are workers"
            description="The Supreme Court's unanimous ruling in Uber BV v Aslam (2021) established that app-based drivers are workers — not self-employed — entitling them to minimum wage and holiday pay. Uber subsequently settled with thousands of drivers for back-pay and implemented minimum earnings guarantees. The Employment Rights Bill (2024) proposes to simplify the worker/employee/self-employed distinction, potentially extending rights to an estimated further 1.5 million people. If passed, it would require platforms to offer predictable hours contracts and guarantee minimum earnings regardless of task assignment fluctuations."
            source="Source: TUC — Living on the Gig Economy 2024. ONS — Labour Force Survey 2024. Supreme Court — Uber BV v Aslam [2021] UKSC 5."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.tuc.org.uk/research-analysis/reports/gig-economy" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">TUC / University of Hertfordshire — Living on the Gig Economy</a> — Survey of gig workers covering pay, rights, and working conditions. Retrieved 2025.</p>
            <p><a href="https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Annual Survey of Hours and Earnings</a> — Median hourly earnings for employees. Retrieved 2025.</p>
            <p>Gig worker estimates are based on TUC/University of Hertfordshire survey methodology. Net hourly pay deducts vehicle, fuel, equipment, insurance, data costs, and time spent waiting unpaid for tasks. Estimates of workers earning below NMW are based on survey self-reporting and should be treated as indicative.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
